<?php
session_start();
require 'connect.php';
require 'functions.php';

// Nettoyage 
$keys = array_keys($_POST);

foreach ($keys as $key){
    $_POST[$key] = str_replace("'","''",trim($_POST[$key]));
    $_POST[$key] = strtostr($_POST[$key]);
}

// Extraction des variables postées 
extract($_POST);

$query = "SELECT * FROM cnrfj_clients WHERE login LIKE '".$login."'";

// Execution de la requete 
$res = mysqli_query($link, $query);

if(mysqli_num_rows($res)>0){
    echo 'ko';
    exit();
} else {
    echo 'ok';
    exit();
}
