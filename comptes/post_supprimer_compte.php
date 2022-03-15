<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
require '../connect.php';

// extractions des variables postées ...
extract($_POST);

// voir le statut actuel du client ... 
$query = "DELETE FROM cnrfj_clients WHERE id  = ".$id;

// execution de la requete ...
$res = mysqli_query($link, $query);

if($res == 1) {     // succes ...
    echo 'ok';
} else {
    echo 'ko';
}

// fermetire de la base de données ...
mysqli_close();
// fermeture du script ...
exit(); 
