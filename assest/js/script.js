// Extracted from index.php
document.documentElement.classList.add("page-loading");
      window.addEventListener("load", () => {
        document.documentElement.classList.remove("page-loading");
      }, { once: true });
      const pageNavigation = performance.getEntriesByType("navigation")[0];
      if (pageNavigation?.type === "reload") {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        window.addEventListener("DOMContentLoaded", () => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, { once: true });
      }

document.addEventListener("DOMContentLoaded", () => {
// Extracted from index.php
(() => {
        const section = document.querySelector(".sdDiffrenceSec");
        if (!section) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          section.classList.add("is-animated");
          return;
        }

        section.classList.add("is-reveal-ready");
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;
          section.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: [0, 0.2, 1] });
        observer.observe(section);
      })();

// Extracted from index.php
(() => {
        const collage = document.querySelector(".collage-hero");
        if (!collage) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          collage.classList.add("is-animated");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          collage.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: 0.45 });

        observer.observe(collage);
      })();

// Extracted from index.php
(() => {
        const hero = document.querySelector(".story-four-hero");
        if (!hero) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          hero.classList.add("is-animated");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          hero.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: 0.85 });

        observer.observe(hero);
      })();

// Extracted from index.php
(() => {
        const collage = document.querySelector(".story-three-top");
        if (!collage) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          collage.classList.add("is-revealing");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          collage.classList.add("is-revealing");
          observer.disconnect();
        }, { threshold: 0.2 });

        observer.observe(collage);
      })();

// Extracted from index.php
(() => {
        const message = document.querySelector(".story-three-message");
        if (!message || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
        message.classList.add("is-pending");

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          message.classList.remove("is-pending");
          message.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: 0.3 });

        observer.observe(message);
      })();

// Extracted from index.php
(() => {
        const sequence = document.querySelector(".story-three-cupboard-sequence");
        if (!sequence || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
        const frames = [...sequence.querySelectorAll("img")];
        if (frames.length < 2) return;
        let activeIndex = 0;
        let timer = null;

        const showFrame = (index) => {
          activeIndex = index;
          frames.forEach((frame, frameIndex) => {
            const active = frameIndex === activeIndex;
            frame.classList.toggle("is-active", active);
            frame.setAttribute("aria-hidden", String(!active));
          });
        };

        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !timer) {
            timer = window.setInterval(() => showFrame((activeIndex + 1) % frames.length), 1500);
          } else if (!entry.isIntersecting && timer) {
            window.clearInterval(timer);
            timer = null;
          }
        }, { threshold: 0.25 });

        observer.observe(sequence);
      })();

// Extracted from index.php
(() => {
        const image = document.querySelector(".scroll-fade-image");
        if (!image) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          image.classList.add("is-visible");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          image.classList.add("is-visible");
          observer.disconnect();
        }, { threshold: 0.15 });

        observer.observe(image);
      })();

// Extracted from index.php
(() => {
        const section = document.querySelector(".story-six-section");
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(([entry]) => {
          section.classList.toggle("is-gallery-active", entry.isIntersecting);
          if (entry.isIntersecting) section.classList.add("is-layout-animated");
        }, { threshold: 0.15 });

        observer.observe(section);
      })();

// Extracted from index.php
(() => {
        const section = document.querySelector(".home-moments-section");
        const articles = section ? [...section.querySelectorAll(".home-moment")] : [];
        if (!section || !articles.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

        articles.forEach((article, index) => {
          article.style.setProperty("--moment-reveal-delay", `${index * 140}ms`);
        });
        section.classList.add("is-reveal-ready");

        const observer = new IntersectionObserver((entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          });
        }, { threshold: 0.2 });

        articles.forEach((article) => observer.observe(article));
      })();

// Extracted from index.php
(() => {
        const section = document.querySelector(".story-seven-section");
        if (!section) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          section.classList.add("is-animated");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          section.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: 0.15 });

        observer.observe(section);
      })();

// Extracted from index.php
(() => {
        const section = document.querySelector(".story-seven-intro");
        if (!section) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          section.classList.add("is-animated");
          return;
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          section.classList.add("is-animated");
          observer.disconnect();
        }, { threshold: 0.15 });

        observer.observe(section);
      })();

// Extracted from index.php
(() => {
        const initializeBirdsong = () => {
        const section = document.querySelector(".secTwo");
        const birdsong = document.querySelector("#secTwo-birdsong");
        if (!section || !birdsong) return;
        let playAttemptPending = false;
        let autoplayBlocked = false;
        let hasUserInteracted = false;
        let targetVolume = 0;
        let fadeFrame = 0;
        let lastFrameTime = 0;
        const maxVolume = 0.45;

        birdsong.volume = 0;

        const animateVolume = (time) => {
          if (!lastFrameTime) lastFrameTime = time;
          const elapsed = time - lastFrameTime;
          lastFrameTime = time;
          // Fade over roughly half a second, regardless of display refresh rate.
          const step = elapsed / 550;
          const difference = targetVolume - birdsong.volume;
          if (Math.abs(difference) <= step) {
            birdsong.volume = targetVolume;
          } else {
            birdsong.volume += Math.sign(difference) * step;
          }

          if (targetVolume === 0 && birdsong.volume === 0) {
            birdsong.pause();
            fadeFrame = 0;
            lastFrameTime = 0;
            return;
          }
          if (Math.abs(targetVolume - birdsong.volume) > 0.001) {
            fadeFrame = requestAnimationFrame(animateVolume);
          } else {
            birdsong.volume = targetVolume;
            fadeFrame = 0;
            lastFrameTime = 0;
          }
        };

        const playBirdsong = (fromUserGesture = false) => {
          if (playAttemptPending || (!fromUserGesture && autoplayBlocked)) return;
          playAttemptPending = true;
          const playRequest = birdsong.play();
          if (playRequest && typeof playRequest.then === "function") {
            playRequest.then(() => {
              autoplayBlocked = false;
              playAttemptPending = false;
            }).catch(() => {
              // Browsers can block audible autoplay until a user gesture.
              autoplayBlocked = true;
              playAttemptPending = false;
            });
          } else {
            playAttemptPending = false;
          }
        };

        const syncBirdsong = () => {
          if (document.hidden) targetVolume = 0;
          if (targetVolume > 0 && birdsong.paused) {
            playBirdsong(hasUserInteracted);
          }
          if (!fadeFrame) fadeFrame = requestAnimationFrame(animateVolume);
        };

        const updateSectionVisibility = () => {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          const visibleRatio = rect.height ? visibleHeight / Math.min(rect.height, window.innerHeight) : 0;
          // Volume rises with the section's visible area, then falls as it leaves view.
          targetVolume = visibleHeight > 0 && !document.hidden
            ? Math.min(maxVolume, Math.max(0.04, visibleRatio * maxVolume))
            : 0;
          syncBirdsong();
        };

        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(updateSectionVisibility, { threshold: [0, 0.05, 0.2] });
          observer.observe(section);
        }

        window.addEventListener("scroll", updateSectionVisibility, { passive: true });
        window.addEventListener("resize", updateSectionVisibility);
        window.visualViewport?.addEventListener("scroll", updateSectionVisibility, { passive: true });
        window.visualViewport?.addEventListener("resize", updateSectionVisibility, { passive: true });

        // Remember a touch, click, or key gesture anywhere on the page.
        // Playback then starts as soon as the section becomes visible.
        const rememberUserGesture = () => {
          hasUserInteracted = true;
          autoplayBlocked = false;
          updateSectionVisibility();
        };
        document.addEventListener("touchstart", rememberUserGesture, { passive: true });
        document.addEventListener("pointerdown", rememberUserGesture, { passive: true });
        document.addEventListener("keydown", rememberUserGesture);

        window.addEventListener("load", updateSectionVisibility, { once: true });
        window.addEventListener("pageshow", updateSectionVisibility);
        requestAnimationFrame(updateSectionVisibility);
        document.addEventListener("visibilitychange", () => {
          updateSectionVisibility();
        });
        };

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initializeBirdsong, { once: true });
        } else {
          initializeBirdsong();
        }
      })();

// Extracted from index.php
(() => {
        const section = document.querySelector(".story-two-section");
        const layout = section?.querySelector(".story-two-layout");
        if (!section || !layout) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
          layout.classList.add("is-revealing");
          return;
        }

        layout.classList.add("is-reveal-ready");
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;
          layout.classList.add("is-revealing");
          observer.disconnect();
        }, { threshold: [0, 0.2, 1] });
        observer.observe(section);
      })();

// Extracted from index.php
(() => {
        if (!window.Swiper) return;
        document.querySelectorAll(".story-two-swiper, .story-three-swiper, .story-four-swiper").forEach((carousel) => {
          const swiper = new Swiper(carousel, {
            loop: true,
            speed: 700,
            effect: "fade",
            fadeEffect: { crossFade: true },
            autoplay: { delay: 1000 },
            keyboard: { enabled: true, onlyInViewport: true },
            navigation: {
              nextEl: carousel.querySelector(".swiper-button-next"),
              prevEl: carousel.querySelector(".swiper-button-prev")
            }
          });

        });
      })();

// Extracted from index.php
(() => {
        const logo = document.querySelector(".site-header .logo img");
        if (!logo) return;
        const openingScreen = document.querySelector(".openingScreen");
        const nextSection = openingScreen?.nextElementSibling;
        let openingRemoved = false;
        let previousScrollY = window.scrollY;
        const completeOpeningTransition = () => {
          if (openingRemoved || !openingScreen?.isConnected) return;
          if (document.readyState !== "complete") {
            window.addEventListener("load", completeOpeningTransition, { once: true });
            return;
          }
          openingRemoved = true;
          openingScreen.classList.add("is-exiting");
          document.querySelector(".secheader")?.classList.add("is-loaded");
          sectionObserver.disconnect();
          const exitDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100;
          window.setTimeout(() => {
            if (!openingScreen.isConnected) return;
            const anchorTopBeforeRemoval = nextSection?.getBoundingClientRect().top;
            openingScreen.remove();
            if (nextSection && Number.isFinite(anchorTopBeforeRemoval)) {
              const anchorTopAfterRemoval = nextSection.getBoundingClientRect().top;
              const correctedScrollY = Math.max(0, window.scrollY + anchorTopAfterRemoval - anchorTopBeforeRemoval);
              if (correctedScrollY !== window.scrollY) {
                window.scrollTo({ top: correctedScrollY, behavior: "instant" });
              }
            }
          }, exitDuration);
        };
        const sectionObserver = new IntersectionObserver((entries) => {
          const sectionReached = entries.some((entry) => entry.isIntersecting);
          const scrollingDown = window.scrollY > previousScrollY;
          previousScrollY = window.scrollY;
          if (!sectionReached || !scrollingDown || openingRemoved || !openingScreen?.isConnected) return;
          completeOpeningTransition();
        }, { threshold: 0 });
        if (nextSection) sectionObserver.observe(nextSection);
        let hasMovedToHeader = false;
        const setLogoStartPosition = () => {
          if (hasMovedToHeader) return;
          const openingHeight = openingScreen?.getBoundingClientRect().height || window.innerHeight;
          const logoLeft = window.innerWidth <= 700 ? 0 : 10;
          logo.style.left = `${logoLeft}px`;
          // Start the oversized opening logo near the bottom edge, matching the full-screen hero layout.
          logo.style.top = `${openingHeight * 0.82}px`;
          logo.style.filter = "brightness(0) invert(1)";
        };
        const moveLogoToHeader = (animate = true) => {
          if (hasMovedToHeader) return;
          hasMovedToHeader = true;
          logo.classList.add("logotop");
          const targetWidth = window.innerWidth < 600 ? 220 : window.innerWidth < 1025 ? 280 : 380;
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const rect = logo.getBoundingClientRect();
          const targetTop = window.scrollY + 40;
          const scale = targetWidth / rect.width;
          const targetLeft = window.innerWidth <= 700 ? 0 : 10;

          if (!animate || reduceMotion || !rect.width) {
            logo.classList.remove("opening-logo");
            logo.style.width = `${targetWidth}px`;
            logo.style.left = `${targetLeft}px`;
            logo.style.top = `${targetTop}px`;
            logo.style.filter = "none";
            return;
          }

          logo.style.transition = "none";
          logo.style.left = `${targetLeft}px`;
          logo.style.top = `${targetTop}px`;
          logo.style.transformOrigin = "top left";
          logo.style.transform = `translate(${rect.left - targetLeft}px, ${rect.top - 24}px) scale(1)`;
          void logo.offsetWidth;
          logo.style.transition = "";
          window.requestAnimationFrame(() => {
            logo.style.transform = `translate(0, 0) scale(${scale})`;
          });

          let finished = false;
          const finishLogoTransition = () => {
            if (finished) return;
            finished = true;
            const logoTransition = logo.style.transition;
            logo.style.transition = "none";
            logo.classList.remove("opening-logo", "is-swapping");
            logo.style.width = `${targetWidth}px`;
            logo.style.transform = "none";
            logo.style.filter = "none";
            void logo.offsetWidth;
            window.requestAnimationFrame(() => {
              logo.style.transition = logoTransition;
            });
          };
          logo.addEventListener("transitionend", (event) => {
            if (event.propertyName === "transform") finishLogoTransition();
          }, { once: true });
          window.setTimeout(finishLogoTransition, 1400);
        };

        setLogoStartPosition();
        const revealOpeningLogo = () => window.requestAnimationFrame(() => logo.classList.add("is-visible"));
        if (document.readyState === "complete") revealOpeningLogo();
        else window.addEventListener("load", revealOpeningLogo, { once: true });
        window.addEventListener("resize", setLogoStartPosition);
        window.addEventListener("scroll", () => {
          if (window.scrollY > 0) {
            moveLogoToHeader();
          }
        }, { passive: true });
        if (window.scrollY > 0) {
          moveLogoToHeader(false);
        }

        let openingStep = 0;
        const scrollToNextSection = () => {
          openingStep = 2;
          completeOpeningTransition();
        };

        let wheelGestureActive = false;
        let wheelGestureTimer;
        const handleOpeningWheel = (event) => {
          if (event.deltaY <= 0 || openingStep >= 2) return;
          event.preventDefault();
          if (!wheelGestureActive) {
            wheelGestureActive = true;
            if (openingStep === 0) {
              openingStep = 1;
              moveLogoToHeader();
            } else {
              scrollToNextSection();
            }
          }
          window.clearTimeout(wheelGestureTimer);
          wheelGestureTimer = window.setTimeout(() => {
            wheelGestureActive = false;
            if (openingStep >= 2) window.removeEventListener("wheel", handleOpeningWheel);
          }, 180);
        };
        window.addEventListener("wheel", handleOpeningWheel, { passive: false });

        const isDownKey = (event) => ["ArrowDown", "PageDown", " "].includes(event.key);
        const handleOpeningKeydown = (event) => {
          if (!isDownKey(event) || openingStep >= 2 || event.repeat) return;
          const target = event.target;
          if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName))) return;
          event.preventDefault();
          if (openingStep === 0) {
            openingStep = 1;
            moveLogoToHeader();
          } else {
            scrollToNextSection();
            document.removeEventListener("keydown", handleOpeningKeydown);
          }
        };
        document.addEventListener("keydown", handleOpeningKeydown);

        let touchStartY = 0;
        let touchHandled = false;
        const handleTouchStart = (event) => {
          touchStartY = event.touches[0]?.clientY ?? 0;
          touchHandled = false;
        };
        const handleTouchMove = (event) => {
          if (openingStep >= 2 || !event.touches.length) return;
          if (touchHandled) {
            return;
          }
          if (touchStartY - event.touches[0].clientY < 12) return;
          event.preventDefault();
          touchHandled = true;
          if (openingStep === 0) {
            openingStep = 1;
            moveLogoToHeader();
          } else {
            scrollToNextSection();
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
          }
        };
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
      })();

// Extracted from index.php
(() => {
        document.querySelectorAll(".craft-showcase").forEach((section) => {
          const cards = [...section.querySelectorAll(".craft-card")];
          const backdrops = [...section.querySelectorAll(".craft-showcase__backdrop")];
          const progress = section.querySelector(".craft-showcase__progress span");
          const storyFiveImages = [...section.querySelectorAll(".story-five-card__image")];
          const storyFiveCounter = section.querySelector(".story-five-counter");
          let ticking = false;

          if ((section.classList.contains("story-one-showcase") || section.classList.contains("story-five-showcase")) && backdrops.length > 1) {
            let wheelLocked = false;
            let wheelIdle = true;
            let wheelScrollComplete = true;
            let wheelIdleTimer;

            const finishWheelGesture = () => {
              if (wheelIdle && wheelScrollComplete) wheelLocked = false;
            };

            const handleShowcaseWheel = (event) => {
              if (Math.abs(event.deltaY) < 8) return;

              if (wheelLocked) {
                event.preventDefault();
                wheelIdle = false;
                window.clearTimeout(wheelIdleTimer);
                wheelIdleTimer = window.setTimeout(() => {
                  wheelIdle = true;
                  finishWheelGesture();
                }, 250);
                return;
              }

              const rect = section.getBoundingClientRect();
              const distance = section.offsetHeight - window.innerHeight;
              if (distance <= 0 || rect.top > 0 || rect.bottom < window.innerHeight) return;

              const travelled = Math.min(distance, Math.max(0, -rect.top));
              const amount = travelled / distance;
              const currentIndex = Math.round(amount * (backdrops.length - 1));
              const nextIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);
              if (nextIndex < 0 || nextIndex >= backdrops.length) return;

              event.preventDefault();
              wheelLocked = true;
              wheelIdle = false;
              wheelScrollComplete = false;
              wheelIdleTimer = window.setTimeout(() => {
                wheelIdle = true;
                finishWheelGesture();
              }, 250);
              window.setTimeout(() => {
                wheelScrollComplete = true;
                finishWheelGesture();
              }, 900);

              const sectionTop = rect.top + window.scrollY;
              window.scrollTo({
                top: sectionTop + distance * nextIndex / (backdrops.length - 1),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
              });
            };

            window.addEventListener("wheel", handleShowcaseWheel, { passive: false });
          }

          const update = () => {
            const distance = section.offsetHeight - window.innerHeight;
            const travelled = Math.min(distance, Math.max(0, -section.getBoundingClientRect().top));
            const amount = distance > 0 ? travelled / distance : 0;
            const cardIndex = Math.min(cards.length - 1, Math.round(amount * (cards.length - 1)));
            const backdropIndex = Math.min(backdrops.length - 1, Math.round(amount * (backdrops.length - 1)));
            cards.forEach((card, index) => {
              const active = index === cardIndex;
              card.classList.toggle("is-active", active);
              card.setAttribute("aria-hidden", String(!active));
            });
            backdrops.forEach((backdrop, index) => backdrop.classList.toggle("is-active", index === backdropIndex));
            storyFiveImages.forEach((image, index) => {
              const active = index === backdropIndex;
              image.classList.toggle("is-active", active);
              image.setAttribute("aria-hidden", String(!active));
            });
            if (storyFiveCounter) {
              storyFiveCounter.textContent = `${String(backdropIndex + 1).padStart(2, "0")} / ${String(backdrops.length).padStart(2, "0")}`;
            }
            progress.style.transform = `scaleX(${Math.min(1, amount)})`;
            ticking = false;
          };

          const requestUpdate = () => {
            if (!ticking) {
              window.requestAnimationFrame(update);
              ticking = true;
            }
          };

          window.addEventListener("scroll", requestUpdate, { passive: true });
          window.addEventListener("resize", requestUpdate);
          update();
        });
      })();

// Extracted from index.php
(() => {
        const contactButton = document.querySelector(".site-header .headerCTA");
        const contactSection = document.querySelector("#contact");
        contactButton?.addEventListener("click", () => {
          contactSection?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
          });
        });

        const form = document.querySelector("#contact-form");
        const status = document.querySelector("#contact-form-status");
        if (!form || !status) return;
        const initializeBotCheck = async () => {
          try {
            const response = await fetch("captcha.php", { headers: { Accept: "application/json" }, cache: "no-store" });
            if (!response.ok) throw new Error("Could not initialize form protection");
          } catch (error) {
            console.error("Could not initialize form protection.", error);
          }
        };
        initializeBotCheck();
        let statusTimer;
        const phoneField = form.elements.namedItem("phone");
        const validatePhone = () => {
          if (!phoneField.value.trim()) {
            phoneField.setCustomValidity("");
            return;
          }
          const phone = phoneField.value.replace(/[\s().-]+/g, "");
          const valid = /^\+?[0-9]{7,15}$/.test(phone)
            && (!phone.startsWith("+") || /^\+[1-9][0-9]{6,14}$/.test(phone));
          phoneField.setCustomValidity(valid ? "" : "Enter a valid phone number with 7 to 15 digits.");
        };
        phoneField.addEventListener("input", validatePhone);
        validatePhone();

        const showStatus = (message, isSuccess) => {
          window.clearTimeout(statusTimer);
          status.textContent = message;
          status.classList.toggle("is-success", isSuccess);
          status.classList.toggle("is-error", !isSuccess);
          status.hidden = false;
          statusTimer = window.setTimeout(() => { status.hidden = true; }, 5000);
        };

        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          if (!form.reportValidity()) return;

          const submitButton = form.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
          }

          try {
            const response = await fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" }
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.message || "Submission failed");
            form.reset();
            await initializeBotCheck();
            showStatus("Thank you. Your enquiry has been submitted.", true);
          } catch (error) {
            await initializeBotCheck();
            showStatus("We couldn't submit your enquiry. Please try again or contact us by phone.", false);
          } finally {
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = "Submit";
            }
          }
        });
      })();

});
