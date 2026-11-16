window.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollPercent = document.createElement("div");
  scrollPercent.className = "scroll-percent";
  scrollPercent.setAttribute("aria-live", "polite");
  scrollPercent.setAttribute("aria-label", "Page scroll percentage");
  scrollPercent.setAttribute("role", "button");
  scrollPercent.setAttribute("tabindex", "0");
  scrollPercent.innerHTML = '<span class="scroll-percent-arrow" aria-hidden="true">↑</span>';
  document.body.appendChild(scrollPercent);

  const updateScrollPercent = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
      ? Math.round((window.scrollY / scrollableHeight) * 100)
      : 100;
    const clampedProgress = Math.min(100, Math.max(0, progress));

    scrollPercent.style.setProperty("--scroll-progress", `${clampedProgress}%`);
    scrollPercent.setAttribute("aria-label", `Page scroll percentage ${clampedProgress}%`);
  };

  updateScrollPercent();
  window.addEventListener("scroll", updateScrollPercent, { passive: true });
  window.addEventListener("resize", updateScrollPercent);
  scrollPercent.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  scrollPercent.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  const revealScrollControl = () => document.body.classList.add("has-started");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) revealScrollControl();
  }, { passive: true });
  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) revealScrollControl();
  }, { passive: true });
  document.addEventListener("keydown", (event) => {
    if (["ArrowDown", "PageDown", " "].includes(event.key)) revealScrollControl();
  });

  const oneScrollPanels = [...document.querySelectorAll(".one-scroll-img")];
  const oneScrollGroups = [...document.querySelectorAll(".story-section")]
    .map((section) => [...section.querySelectorAll(".one-scroll-img")])
    .filter((group) => group.length);

  if (oneScrollPanels.length && !reduceMotion) {
    let isSnapping = false;
    let touchStartY = 0;
    const snapTolerance = 6;

    const isPanelFullScreen = (panel) => {
      const rect = panel.getBoundingClientRect();

      return Math.abs(rect.top) <= snapTolerance
        && Math.abs(rect.height - window.innerHeight) <= snapTolerance;
    };

    const scrollPanelIntoView = (panel) => {
      isSnapping = true;
      panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      window.setTimeout(() => {
        isSnapping = false;
      }, 850);
    };

    const getActivePanel = () => {
      const viewportCenter = window.innerHeight / 2;
      let fallbackPanel = null;
      let fallbackDistance = Infinity;

      for (const group of oneScrollGroups) {
        for (let index = 0; index < group.length; index += 1) {
          const panel = group[index];
          const rect = panel.getBoundingClientRect();

          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            return { group, index, panel };
          }

          const distance = Math.min(Math.abs(rect.top), Math.abs(rect.bottom));
          if (rect.bottom > 0 && rect.top < window.innerHeight && distance < fallbackDistance) {
            fallbackDistance = distance;
            fallbackPanel = { group, index, panel };
          }
        }
      }

      return fallbackPanel;
    };

    const getDirectionalPanel = (direction) => {
      let targetPanel = null;
      let targetDistance = Infinity;
      const activationDistance = window.innerHeight * 0.55;

      for (const group of oneScrollGroups) {
        for (let index = 0; index < group.length; index += 1) {
          const panel = group[index];
          const rect = panel.getBoundingClientRect();
          const distance = direction > 0 ? rect.top : window.innerHeight - rect.bottom;

          if (distance >= -snapTolerance && distance <= activationDistance && distance < targetDistance) {
            targetDistance = distance;
            targetPanel = { group, index, panel };
          }
        }
      }

      return targetPanel;
    };

    const snapToPanel = (direction, event) => {
      if (direction === 0) {
        return;
      }

      const activePanel = getActivePanel() || getDirectionalPanel(direction);
      if (!activePanel) {
        return;
      }

      if (isSnapping) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      if (direction > 0 && activePanel.index === 0 && !isPanelFullScreen(activePanel.panel)) {
        if (event.cancelable) {
          event.preventDefault();
        }

        scrollPanelIntoView(activePanel.panel);
        return;
      }

      const nextIndex = activePanel.index + direction;
      if (nextIndex < 0 || nextIndex >= activePanel.group.length) {
        const directionalPanel = getDirectionalPanel(direction);

        if (directionalPanel && directionalPanel.panel !== activePanel.panel) {
          if (event.cancelable) {
            event.preventDefault();
          }

          scrollPanelIntoView(directionalPanel.panel);
        }

        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      scrollPanelIntoView(activePanel.group[nextIndex]);
    };

    window.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) < 8) {
        return;
      }

      snapToPanel(event.deltaY > 0 ? 1 : -1, event);
    }, { passive: false });

    window.addEventListener("touchstart", (event) => {
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (event) => {
      const deltaY = touchStartY - event.touches[0].clientY;

      if (Math.abs(deltaY) < 40) {
        return;
      }

      snapToPanel(deltaY > 0 ? 1 : -1, event);
      touchStartY = event.touches[0].clientY;
    }, { passive: false });
  }

  const grainHeadings = document.querySelectorAll(".videosecHeading");
  if (!reduceMotion && grainHeadings.length) {
    let grainTicking = false;
    const updateGrainFill = () => {
      grainHeadings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * 0.32 - rect.height;
        const scrollProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        const progress = Math.min(1, scrollProgress / 0.7);
        const lines = heading.querySelectorAll(".grain-line");
        lines.forEach((line, index) => {
          const lineProgress = Math.max(0, Math.min(1, progress * lines.length - index));
          line.style.setProperty("--text-fill", `${lineProgress * 100}%`);
        });
      });
      grainTicking = false;
    };
    const requestGrainFill = () => {
      if (grainTicking) return;
      window.requestAnimationFrame(updateGrainFill);
      grainTicking = true;
    };

    window.addEventListener("scroll", requestGrainFill, { passive: true });
    window.addEventListener("resize", requestGrainFill);
    requestGrainFill();
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
    document.querySelectorAll(".logo-print").forEach((logo) => {
      logo.style.opacity = "1";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true
  });

  document.querySelectorAll(".banner-hero").forEach((hero) => {
    const copyItems = hero.querySelectorAll(".banner-copy > *");
    const drawing = hero.querySelector(".banner-drawing");
    const centerImage = hero.querySelector(".banner-center");
    const firstImages = hero.querySelectorAll(".banner-scroll-one");
    const secondImages = hero.querySelectorAll(".banner-scroll-two");
    const stagedImages = [...firstImages, ...secondImages];
    const introImages = [drawing, centerImage].filter(Boolean);

    gsap.set(stagedImages, {
      autoAlpha: 0,
      y: 36,
      scale: 0.96
    });

    gsap.from(copyItems, {
      autoAlpha: 0,
      x: -28,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out"
    });

    gsap.from(introImages, {
      autoAlpha: 0,
      y: 24,
      scale: 0.98,
      duration: 1.1,
      stagger: 0.14,
      ease: "power3.out"
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=180%",
        scrub: 0.8,
        pin: true
      }
    })
      .to(firstImages, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out"
      })
      .to(secondImages, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out"
      }, "+=0.35");
  });

  const revealItems = [
    ".brand-mark",
    ".intro-copy",
    ".container-narrow > h2",
    ".lead-copy",
    ".micro-copy",
    ".body-copy",
    ".story-heading",
    ".section-intro",
    ".difference-list > div",
    ".closing-line"
  ];

  revealItems.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => {
      if (item.closest(".hero-section")) {
        return;
      }

      item.classList.add("gsap-reveal");

      gsap.from(item, {
        opacity: 0,
        y: 34,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 86%",
          once: true
        }
      });
    });
  });

  document.querySelectorAll(".quote-copy").forEach((quote) => {
    const nodes = [...quote.childNodes];
    const originalText = quote.innerText.trim();

    quote.setAttribute("aria-label", originalText);
    quote.textContent = "";

    nodes.forEach((node) => {
      if (node.nodeName === "BR") {
        quote.appendChild(document.createElement("br"));
        return;
      }

      [...node.textContent].forEach((character) => {
        const span = document.createElement("span");
        span.className = "quote-copy-char";
        span.setAttribute("aria-hidden", "true");
        span.innerHTML = character === " " ? "&nbsp;" : character;
        quote.appendChild(span);
      });
    });

    const chars = quote.querySelectorAll(".quote-copy-char");

    gsap.set(chars, {
      autoAlpha: 0,
      filter: "blur(6px)"
    });

    gsap.to(chars, {
      autoAlpha: 1,
      filter: "blur(0px)",
      stagger: 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: quote,
        start: "top 82%",
        end: "bottom 45%",
        scrub: true
      }
    });
  });

  const storySceneConfigs = [
    {
      scene: ".first-story-scene",
      imageOne: ".first-story-base",
      shelf: ".first-story-wall",
      floorPot: ".first-story-pendant",
      topLight: ".first-story-small-pendant",
      light: ".first-story-side-plant",
      girl: ".first-story-plant",
      sofa: ".first-story-sofa",
      sideTable: ".first-story-table",
      person: ".first-story-person",
      lamp: ".first-story-floor-lamp"
    },
    {
      scene: ".second-story-scene",
      imageOne: ".second-story-image-one",
      shelf: ".second-story-self",
      floorPot: ".second-story-floor-pot",
      topLight: ".second-story-top-light",
      light: ".second-story-light",
      girl: ".second-story-girl"
    },
    {
      scene: ".third-story-scene",
      imageOne: ".third-story-floor",
      shelf: ".third-story-backdrop",
      floorPot: ".third-story-wardrobe",
      topLight: ".third-story-art",
      light: ".third-story-pendant",
      girl: ".third-story-sofa",
      sofa: ".third-story-dining",
      sideTable: ".third-story-plant",
      person: ".third-story-person",
      lamp: ".third-story-lamp",
      counter: ".third-story-counter"
    },
    {
      scene: ".fourth-story-scene",
      imageOne: ".fourth-story-floor",
      shelf: ".fourth-story-backdrop",
      floorPot: ".fourth-story-wardrobe",
      topLight: ".fourth-story-art",
      light: ".fourth-story-pendant",
      girl: ".fourth-story-sofa",
      sofa: ".fourth-story-dining",
      person: ".fourth-story-person",
      counter: ".fourth-story-counter"
    },
    {
      scene: ".sixth-story-scene",
      imageOne: ".sixth-story-floor",
      shelf: ".sixth-story-shelf",
      floorPot: ".sixth-story-wardrobe",
      topLight: ".sixth-story-panel",
      light: ".sixth-story-light",
      girl: ".sixth-story-bed",
      sofa: ".sixth-story-console",
      sideTable: ".sixth-story-table",
      person: ".sixth-story-person",
      lamp: ".sixth-story-lamp",
      counter: ".sixth-story-chair",
      accent: ".sixth-story-accent"
    },
    {
      scene: ".fifth-story-scene",
      imageOne: ".fifth-story-floor",
      shelf: ".fifth-story-backdrop",
      floorPot: ".fifth-story-storage",
      topLight: ".fifth-story-panel",
      light: ".fifth-story-accent",
      girl: ".fifth-story-console",
      sofa: ".fifth-story-chair",
      sideTable: ".fifth-story-person",
      lamp: ".fifth-story-lamp"
    },
    {
      scene: ".seventh-story-scene",
      imageOne: ".seventh-story-image-one",
      shelf: ".seventh-story-self",
      floorPot: ".seventh-story-floor-pot",
      topLight: ".seventh-story-top-light",
      light: ".seventh-story-light",
      girl: ".seventh-story-girl",
      sofa: ".seventh-story-sofa"
    }
  ];

  storySceneConfigs.forEach((config) => {
    document.querySelectorAll(config.scene).forEach((scene) => {
      const layers = {
        imageOne: scene.querySelector(config.imageOne),
        shelf: scene.querySelector(config.shelf),
        floorPot: scene.querySelector(config.floorPot),
        topLight: scene.querySelector(config.topLight),
        light: scene.querySelector(config.light),
        girl: scene.querySelector(config.girl),
        sofa: scene.querySelector(config.sofa),
        sideTable: scene.querySelector(config.sideTable),
        person: scene.querySelector(config.person),
        lamp: scene.querySelector(config.lamp),
        counter: scene.querySelector(config.counter),
        accent: scene.querySelector(config.accent)
      };
      const allLayers = [
        layers.imageOne,
        layers.shelf,
        layers.floorPot,
        layers.topLight,
        layers.light,
        layers.girl,
        layers.sofa,
        layers.sideTable,
        layers.person,
        layers.lamp,
        layers.counter,
        layers.accent
      ].filter(Boolean);

      gsap.set(allLayers, {
        autoAlpha: 0,
        y: 28,
        filter: "blur(8px)"
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top 8%",
          end: "+=310%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      [
        [layers.imageOne, 1],
        [layers.shelf, 1],
        [layers.floorPot, 1],
        [layers.topLight, 1],
        [layers.light, 1],
        [layers.girl, 1],
        [layers.sofa, 1],
        [layers.sideTable, 1],
        [layers.person, 1],
        [layers.lamp, 1],
        [layers.counter, 1],
        [layers.accent, 1]
      ].forEach(([layer, duration]) => {
        if (!layer) {
          return;
        }

        timeline.to(layer, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          ease: "power3.out"
        });
      });

      timeline.to({}, { duration: 1.1 });
    });
  });

  document.querySelectorAll(".hero-product, .story-scene").forEach((image) => {
    if (image.closest(".hero-section")) {
      return;
    }

    image.classList.add("gsap-image");

    gsap.from(image, {
      opacity: 0,
      y: 42,
      scale: 0.97,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image,
        start: "top 88%",
        once: true
      }
    });
  });

  document.querySelectorAll(".one-scroll-img").forEach((panel) => {
    const images = panel.querySelectorAll("img");

    images.forEach((image) => {
      image.classList.add("gsap-image");
    });

    gsap.from(images, {
      autoAlpha: 0,
      scale: 0.72,
      duration: 1.15,
      stagger: 0.16,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: panel,
        start: "top 55%",
        once: true
      }
    });
  });

  document.querySelectorAll(".story-gallery img").forEach((image) => {
    if (image.closest(".one-scroll-img")) {
      return;
    }

    image.classList.add("gsap-image");

    gsap.from(image, {
      autoAlpha: 0,
      scale: 0.82,
      duration: 1.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image,
        start: "top 84%",
        once: true
      }
    });
  });

  document.querySelectorAll(".portrait-img, .landscape-img, .full-img, .feature-img").forEach((image) => {
    if (image.closest(".story-gallery")) {
      return;
    }

    image.classList.add("gsap-image");

    gsap.from(image, {
      opacity: 0,
      y: 70,
      scale: 0.985,
      duration: 1.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        start: "top 84%",
        once: true
      }
    });
  });

  document.querySelectorAll(".closing-logo").forEach((band) => {
    band.classList.add("gsap-band");

    gsap.fromTo(
      band,
      { scale: 1.08, yPercent: -4 },
      {
        scale: 1,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: band,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  document.querySelectorAll(".logo-band-lockup").forEach((logoLockup) => {
    const band = logoLockup.closest(".logo-band");
    const logoImages = logoLockup.querySelectorAll("img");

    if (!band) {
      return;
    }

    gsap.set(logoLockup, {
      autoAlpha: 1
    });

    gsap.set(logoImages, {
      autoAlpha: 0,
      scale: 0.92,
      y: 18
    });

    gsap.fromTo(
      band,
      { backgroundPosition: "50% 48%" },
      {
        backgroundPosition: "50% 54%",
        ease: "none",
        scrollTrigger: {
          trigger: band,
          start: "top 75%",
          end: "bottom bottom",
          scrub: 0.75
        }
      }
    );

    gsap.to(logoImages, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: band,
        start: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });
  });

  document.querySelectorAll(".logo-print").forEach((logo) => {
    const text = logo.dataset.printText || logo.textContent.trim();
    logo.setAttribute("aria-label", text);
    logo.textContent = "";

    [...text].forEach((character) => {
      const span = document.createElement("span");
      span.className = "logo-print-char";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = character === " " ? "&nbsp;" : character;
      logo.appendChild(span);
    });

    const chars = logo.querySelectorAll(".logo-print-char");

    gsap.set(logo, { opacity: 1 });
    gsap.set(chars, {
      opacity: 0,
      y: 26,
      filter: "blur(8px)"
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: logo.closest(".logo-band"),
        start: "top 35%",
        end: "+=95%",
        scrub: 0.8,
        pin: true
      }
    })
      .to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.18,
        ease: "power2.out"
      })
      .fromTo(
        ".logo-band",
        { backgroundPosition: "50% 46%" },
        { backgroundPosition: "50% 54%", ease: "none" },
        0
      );
  });

  document.querySelectorAll(".difference-print").forEach((heading) => {
    const text = heading.textContent.trim();
    heading.setAttribute("aria-label", text);
    heading.textContent = "";

    [...text].forEach((character) => {
      const span = document.createElement("span");
      span.className = "difference-print-char";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = character === " " ? "&nbsp;" : character;
      heading.appendChild(span);
    });

    const chars = heading.querySelectorAll(".difference-print-char");

    gsap.set(heading, { opacity: 1 });
    gsap.set(chars, {
      autoAlpha: 0,
      y: 24,
      filter: "blur(8px)"
    });

    gsap.to(chars, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 82%",
        end: "bottom 52%",
        scrub: 0.8
      }
    });
  });

  document.querySelectorAll(".difference-zoom").forEach((section) => {
    const content = section.querySelector(".py-5") || section;

    gsap.from(content, {
      autoAlpha: 0,
      scale: 0.9,
      y: 32,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        once: true
      }
    });
  });

  gsap.from(".hero-section .brand-mark", {
    opacity: 0,
    y: -18,
    duration: 0.9,
    ease: "power2.out"
  });

  gsap.from(".hero-section .hero-product", {
    opacity: 0,
    y: 26,
    scale: 0.96,
    duration: 1.2,
    delay: 0.15,
    ease: "power3.out"
  });

  gsap.from(".hero-section .intro-copy > *", {
    opacity: 0,
    y: 24,
    duration: 0.9,
    delay: 0.35,
    stagger: 0.12,
    ease: "power3.out"
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
});
