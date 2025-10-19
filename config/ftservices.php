<?php

return [
    'bulk_sms' => [
        'url' => env('BULK_SMS_URL', ''),
        'api_key' => env('BULK_SMS_API_KEY', ''),
        'sender_id' => env('BULK_SMS_SENDER_ID')
    ],

    'frontend' => [
        'frontend_url' => env('FRONTEND_URL', 'https://stage.fahadstutorial.com')
    ],
    'core' => [
        'auth' => [
            'registration' => env('CORE_REGISTRATION_URL', 'https://default.example.com/register'),
        ],
    ],
];
