<?php
declare(strict_types=1);

function respondWithStatus(string $status, int $httpStatus = 200): void
{
    if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
        http_response_code($httpStatus);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => $status === 'success',
            'message' => $status === 'success' ? 'Enquiry submitted.' : 'Unable to submit enquiry.',
        ]);
        exit;
    }

    header('Location: index.html?contact=' . rawurlencode($status) . '#contact', true, 303);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Method not allowed.');
}

session_start();
$formStartedAt = (int) ($_SESSION['contact_form_started_at'] ?? 0);
$honeypot = trim((string) ($_POST['website_url'] ?? ''));
unset($_SESSION['contact_form_started_at']);

if ($honeypot !== '' || $formStartedAt === 0 || time() - $formStartedAt < 3 || time() - $formStartedAt > 1800) {
    respondWithStatus('error', 422);
}

$name = trim((string) ($_POST['full_name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$normalizedPhone = preg_replace('/[\s().-]+/u', '', $phone) ?? '';
$requirement = trim((string) ($_POST['requirement'] ?? ''));
$length = static fn (string $value): int => function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
$validPhone = preg_match('/^\+?[0-9]{7,15}$/', $normalizedPhone) === 1
    && ($normalizedPhone[0] !== '+' || preg_match('/^\+[1-9][0-9]{6,14}$/', $normalizedPhone) === 1);

if (
    $name === '' || $length($name) > 120 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    !$validPhone || $length($phone) > 30 ||
    $requirement === '' || $length($requirement) > 3000
) {
    respondWithStatus('error', 422);
}

$dbConfig = require __DIR__ . '/config.php';
$dbHost = $dbConfig['host'];
$dbName = $dbConfig['name'];
$dbUser = $dbConfig['user'];
$dbPassword = $dbConfig['password'];

if (!preg_match('/^[A-Za-z0-9_]+$/', $dbName)) {
    error_log('Contact form submission failed: invalid database name configuration.');
    respondWithStatus('error', 500);
}

try {
    $db = new PDO(
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        $dbUser,
        $dbPassword,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $db->exec(
        'CREATE TABLE IF NOT EXISTS contact_enquiries (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(120) NOT NULL,
            email VARCHAR(254) NOT NULL,
            phone VARCHAR(30) NOT NULL,
            requirement TEXT NOT NULL,
            submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $statement = $db->prepare(
        'INSERT INTO contact_enquiries (full_name, email, phone, requirement)
         VALUES (:full_name, :email, :phone, :requirement)'
    );
    $statement->execute([
        ':full_name' => $name,
        ':email' => $email,
        ':phone' => $normalizedPhone,
        ':requirement' => $requirement,
    ]);

    respondWithStatus('success');
} catch (Throwable $exception) {
    error_log('Contact form submission failed: ' . $exception->getMessage());
    respondWithStatus('error', 500);
}
