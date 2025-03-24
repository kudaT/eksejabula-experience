
<?php
header('Content-Type: application/json');

$result = [
    'server' => [
        'software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'php_version' => phpversion(),
        'modules' => [
            'mod_rewrite' => in_array('mod_rewrite', apache_get_modules()),
            'mod_headers' => in_array('mod_headers', apache_get_modules()),
            'mod_expires' => in_array('mod_expires', apache_get_modules()),
        ]
    ],
    'checks' => [
        'htaccess_exists' => file_exists(__DIR__ . '/.htaccess'),
        'index_exists' => file_exists(__DIR__ . '/index.html'),
    ]
];

echo json_encode($result, JSON_PRETTY_PRINT);
?>
