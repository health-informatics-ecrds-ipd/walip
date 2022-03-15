<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
require '../connect.php';
require 'functions.php';

/// Recuperation et néttoyage des données 
$post_array_key = array_keys($_POST);
foreach ($post_array_key as $key) {
    $_POST[$key] = str_replace("'", "''", trim($_POST[$key]));
    $_POST[$key] = strtostr($_POST[$key]);
}

/// Preparation de la requete d'insertion 
$code_client = gen_pw();
$query = "INSERT INTO cnrfj_clients "
        . "(nom, "
        . "pays, "
        . "client_compte, "
        . "district, "
        . "laboratoire, "
        . "adresse_mail, "
        . "code_client, "
        . "profile, "
		. "telephone, "
        . "email_notification, "
        . "date_creation)"
        . ""
        . "VALUES"
        . ""
        . "('" . $_POST['nom'] . "',"
        . "'"  . $_POST['pays'] . "',"
        . "'"  . $_POST['client_compte'] . "',"
        . "'" . $_POST['district'] . "',"
        . "'" . $_POST['laboratoire'] . "',"
        . "'" . $_POST['adresse_mail'] . "',"
        . "'" . $code_client . "',"
        . "'" . $_POST['profile'] . "',"
		. "'" . $_POST['telephone'] . "',"
        . "'" . $_POST['email_notification'] . "',"
        . "'" . date('Y-m-d H:i:s') . "')";


/// Execution de la requete
$res = mysqli_query($link, $query);
if ($res == 1) {
    header('location:index.php');
    $_SESSION['status'] = 1;
} else {
    header('location:index.php');
    $_SESSION['status'] = 2;
}

// FERMETURE DE LA BASE 
mysqli_close();

/// ENVOI EMAIL DE NOTIFICATION ...
$to    = trim($_POST['adresse_mail']);
$email =  envoyer_mail($code_client, $to, $_POST['nom'], $_POST['profile']);

if ($email) {
    echo "all_ok";
} else {
    echo "ko";
}

/// FIN DU SCRIPT
exit();
