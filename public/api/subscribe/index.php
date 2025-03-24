
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid email is required']);
    exit();
}

$email = $data['email'];

// Store subscriber in the database
// Connect to the database (assuming PostgreSQL using environment variables)
// In a production environment, these would be retrieved from environment variables
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'postgres';
$db_user = getenv('DB_USER') ?: 'postgres';
$db_password = getenv('DB_PASSWORD') ?: 'postgres';

try {
    // Create PDO connection
    $dsn = "pgsql:host=$db_host;dbname=$db_name;";
    $pdo = new PDO($dsn, $db_user, $db_password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
    // Check if subscriber already exists
    $stmt = $pdo->prepare("SELECT * FROM subscribers WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existing) {
        // Insert new subscriber
        $stmt = $pdo->prepare("INSERT INTO subscribers (email, confirmed) VALUES (:email, true)");
        $stmt->execute(['email' => $email]);
    }
    
    // Log the subscription action
    error_log("Newsletter subscription: $email");
} catch (PDOException $e) {
    // Log the error but continue with email sending
    error_log("Database error in subscription process: " . $e->getMessage());
    // We won't exit here, as we still want to try sending the email
}

// Set up email to subscriber
$to = $email;
$subject = 'Welcome to the Eksejabula Community!';

$headers = "From: Eksejabula <info@eksejabula.co.za>\r\n";
$headers .= "Reply-To: info@eksejabula.co.za\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$message = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333; font-size: 24px;">Welcome to Eksejabula!</h1>
    <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Thank you for subscribing to our newsletter. You\'ll now receive updates about our latest products, 
        exclusive offers, and creative inspiration.
    </p>
    <p style="font-size: 16px; line-height: 1.5; color: #555;">
        We\'re excited to have you join our community!
    </p>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 14px; color: #888;">
            Follow us on social media:
            <br>
            <a href="https://www.instagram.com/eksejabula?igsh=cndqOW8zczNwdTM4&utm_source=qr" style="color: #555; text-decoration: none;">Instagram</a> | 
            <a href="https://www.facebook.com/share/1AGxyQ2obK/?mibextid=wwXIfr" style="color: #555; text-decoration: none;">Facebook</a> | 
            <a href="https://x.com/eksejabula?s=21" style="color: #555; text-decoration: none;">Twitter</a> |
            <a href="https://www.tiktok.com/@ekse.jabula?_t=ZM-8u6y2cuyzi9&_r=1" style="color: #555; text-decoration: none;">TikTok</a>
        </p>
    </div>
</div>';

// Attempt to send email
$mail_sent = mail($to, $subject, $message, $headers);

// Set up admin notification
$admin_to = 'info@eksejabula.co.za';
$admin_subject = 'New Newsletter Subscriber';

$admin_message = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">New Newsletter Subscriber</h2>
    <p style="font-size: 16px; color: #555;">
        A new user has subscribed to the newsletter:
    </p>
    <p style="font-size: 16px; color: #333; font-weight: bold;">
        ' . $email . '
    </p>
</div>';

$admin_mail_sent = mail($admin_to, $admin_subject, $admin_message, $headers);

// Log email sending result
if ($mail_sent) {
    error_log("Welcome email sent to: $email");
} else {
    error_log("Failed to send welcome email to: $email");
}

if ($mail_sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
