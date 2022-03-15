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

if($question_uid === "telephone" || $question_uid === "telephone_patient" ){
    
    $question_uid = "telphone"; 
    
    $query =  " SELECT id, nom_patient, age_annees, sexe, no_terrain, date_nais, adresse "
            . " FROM cnrfj "
            . " WHERE  " .  $question_uid . " LIKE '" . $input_query ."'";
        
        $res = mysqli_query($link, $query);
        
        while($data = mysqli_fetch_array($res)){
            $result  = [
                "key" => $data['no_terrain'],
                "value" =>  $data['nom_patient'] 
                            . " - " . $data['sexe'] 
                            . " - " . $data['age_annees'] 
                            . " an(s)",
                
                "defaults" => [
                    "id" => $data['no_terrain'],
                    "prenom" => $data['nom_patient'],
                    "nom" => "",
                    "date_naissance" => $data['date_nais'],
                    "age" => $data['age_annees'],
                    "sexe" => $data['sexe'],
                    "nationalite" => "",
                    "lieu_residence_senegal" => $data['adresse'],
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