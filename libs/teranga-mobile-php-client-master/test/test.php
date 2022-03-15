<?php

require __DIR__."/../vendor/autoload.php";

use TerangaMobile\Client;

$terangaMobileClient = new Client([
    'application_id' => '0',
    'application_secret' => '0'
]);

$field_uid = $terangaMobileClient->getSearchFieldUid();
$query = $terangaMobileClient->getSearchFieldQuery();

$results = [
    [
        "key" => "opt1",
        "value" => "Query was $query (UID=$field_uid)"
    ]
];

$responseData = [
    'status' => "ok",
    'message' => "All right",
    'data' => $results
];

header('Content-type: application/json');
die(json_encode($responseData));