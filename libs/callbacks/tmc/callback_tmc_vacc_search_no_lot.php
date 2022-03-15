<?php
require '../../../connect_simple.php';
require '../../functions.php';
require_once('../../teranga-mobile-php-client-master/vendor/autoload.php');

use TerangaMobile\Client;

$terangaMobileClient = new Client([
    "application_id" => "teranga-web",
    "application_secret" => "c57a6a1dabc57a090d8b7432aee83ca74b6e6dc7b1c89a863ecf0260d23657cf"
]);


$question_uid = $terangaMobileClient->getSearchFieldUid();

$input_query = $terangaMobileClient->getSearchFieldQuery();

$input_query = mysqli_real_escape_string($link, $input_query); // Data cleaning

$message = "OK"; // Default return message

$results = array();

// if($question_uid === "numero_lot_vaccin"){
if(1){
    $query =  "select * from vacc_lot where lot_actif = 1 AND lot_id like '%".$input_query ."%'" ;
    mysqli_set_charset($link, "utf8");
    $res = mysqli_query($link, $query);
    
    while($data = mysqli_fetch_array($res)){
        $result  = [
            "key"        =>  $data['lot_id'],
            "value"      =>  $data['lot_id'],
            "defaults"   => [
                "numero_lot_vaccin" => $data["lot_id"],
                "enregistrement_teranga" => "1"
            ]
        ];
        array_push($results, $result);
    }
}

else{
    $message = "NOT IN THE FIELD LIST";
}

$responseData = [
    "status" => "ok",       // Set to "ok" or "ko" depending on the outcome of the search
    "message" => $message,  // Custom message, ie. use it to notify user if something goes wrong
    "data" => $results      // Array containing the list of results
];

// Return the result back to the requesting device
die(json_encode($responseData));