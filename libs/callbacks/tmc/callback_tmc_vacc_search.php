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

if($question_uid === "numero_identification_passeport" || $question_uid === "nom"  || $question_uid === "prenom"){
    $query =  " SELECT * "
        . " FROM vacc_patient "
        . " WHERE  numero_identification_passeport like '" . $input_query ."%' or prenom like '%".$input_query ."%' or nom like '%".$input_query ."%' limit 5" ;
            
            mysqli_set_charset($link, "utf8");
            
            $res = mysqli_query($link, $query);
            
            while($data = mysqli_fetch_array($res)){
                $result  = [
                    "key" => $data['numero_identification_passeport'],
                    "value" =>  $data['nom']
                    . " - " . $data['prenom']
                    . " - " . $data['sexe']
                    . " - " . $data['age']
                    . " an(s)",
                    
                    "defaults" => [
                        "age" => $data["age"],
                        "autres_maladies_chroniques" => $data["autres_maladies_chroniques"],
                        "commune" => $data["commune"],
                        "date_de_vaccination" => $data["date_de_vaccination"],
                        "date_de_vaccination_rappel" => $data["date_de_vaccination_rappel"],
                        "date_inscription" => $data["date_inscription"],
                        "date_naissance" => $data["date_naissance"],
                        "departement" => $data["departement"],
                        "email" => $data["email"],
                        "maladies_chroniques" => $data["maladies_chroniques"],
                        "nom" => $data["nom"],
                        "numero_identification_passeport" => $data["numero_identification_passeport"],
                        "numero_lot_vaccin" => $data["numero_lot_vaccin"],
                        "observations" => $data["observations"],
                        "prenom" => $data["prenom"],
                        "profession" => $data["profession"],
                        "quartier" => $data["quartier"],
                        "region" => $data["region"],
                        "sexe" => $data["sexe"],
                        "souffrez_vous_maladie_chronique" => $data["souffrez_vous_maladie_chronique"],
                        "telephone" => $data["telephone"],
                        "numero_lot_vaccin_2" => $data["numero_lot_vaccin_2"],
                        "date_de_vaccination_2" => $data["date_de_vaccination_2"],
                        "lieu_de_vaccination_2" => $data["lieu_de_vaccination_2"],
                        "lieu_de_vaccination" => $data["lieu_de_vaccination"],
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