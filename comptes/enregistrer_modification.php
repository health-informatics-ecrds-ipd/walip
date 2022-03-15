<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
require '../connect.php';
require 'functions.php';

//echo implode(", ", $_POST['coag_region']); exit();

/* Extraction des variables get */
extract($_GET);

/*  Recuperation et néttoyage des variables post  */ 
$post_array_key = array_keys($_POST);
foreach ($post_array_key as $key) {
    $_POST[$key] = str_replace("'", "''", trim($_POST[$key]));
    $_POST[$key] = strtostr($_POST[$key]);
}
// extratction des variables post ...
extract($_POST);

$query =  "UPDATE  cnrfj_clients "
        . "SET "
        . "nom = '".$nom."',"
        . "pays = '".$pays."',"
        . "district = '".$district."',"
        . "client_compte = '".$client_compte."',"
        . "laboratoire = '".$laboratoire."',"
        . "adresse_mail = '".$adresse_mail."',"
        . "profile = '".$profile."',"
        . "telephone = '".$telephone."',"
        . "email_notification = '".$email_notification."',"
        . "date_creation = '".$date_creation."' "
        . "WHERE id =".$id;


$query = str_replace("''","NULL",$query);
//echo $query; exit();

/*
 * 
 * Execution de la requete 
 */
$res = mysqli_query($link, $query);

if ($res == 1) 
{
    header('location:index.php?menu=consulter');
    $_SESSION['status'] = 1;
} 
else 
{
    header('location:index.php?menu=consulter');
    $_SESSION['status'] = 2;
}

mysqli_close();
exit();
