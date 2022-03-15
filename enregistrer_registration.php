<?php
session_start();
require 'connect.php';
    
#Extration des varibales 
extract($_POST);

/*
 * 
 * Preparation de la requete de mise a jour... 
 */
$query  = "UPDATE cnrfj_clients "
        . "SET login = '".$login."', "
        . "mdp = '".md5($mdp1)."' "
        . "WHERE code_client = '".$code_client."'";

// execution de la requete ...
$res = mysqli_query($link, $query);

if($res)
{
    header('location:index.php');
}
else
{
    header('location:error.php'); 
}
 exit();


