<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php';

$title = $_GET['title'] ?? '';

if (!$title) {
    echo json_encode([
        'Response' => false,
        'Error' => "Title is required"
    ]);
    exit();
}

$url = "http://www.omdbapi.com/?apikey=" . API_KEY . "&s=" . urlencode($title);

$response = file_get_contents($url);

if ($response) {
    $responseData = json_decode($response, true);

    if ($responseData === null) {
        echo json_encode([
            'Response' => false,
            'Error' => 'Invalid response from OMDb API'
        ]);
        exit();
    }

    echo json_encode([
        'Response' => true,
        'Search' =>  $responseData['Search'] ?? []
    ]);
} else {
    echo json_encode([
        'Response' => false,
        'Error' => 'Unable to fetch data'
    ]);
}
