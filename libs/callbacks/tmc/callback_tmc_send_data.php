<?php

require '../../../connect.php';
require '../../functions.php';
require_once('../../teranga-mobile-php-client-master/vendor/autoload.php');

use TerangaMobile\Client;

$terangaMobileClient = new Client([
    "application_id" => "teranga-web",
    "application_secret" => "c57a6a1dabc57a090d8b7432aee83ca74b6e6dc7b1c89a863ecf0260d23657cf"
]);

$callbackData = $terangaMobileClient->getCallbackData();

$myfile = fopen("../../../superviseur/pilote_dko.txt", "w") or die("Unable to open file!");

fwrite($myfile, json_encode($callbackData));