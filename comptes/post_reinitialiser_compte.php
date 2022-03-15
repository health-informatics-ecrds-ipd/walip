<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
require '../connect.php';
include 'functions.php';

//ini_set('smtp', '10.1.7.20'); 
//ini_set('smtp_port', 25); 

// extractions des variables postees ...
extract($_POST);

// voir le statut actuel du client ... 
$query = "UPDATE cnrfj_clients SET login = NULL, mdp = NULL, configuration = NULL WHERE id  = ".$id;

// execution de la requete ...
$res = mysqli_query($link, $query);

if($res) {     // succes ...
    $query = "SELECT  code_client, adresse_mail, nom, profile FROM cnrfj_clients WHERE id = ".$id; // voir le statut actuel du client ...
    $res = mysqli_query($link, $query); // execution de la requete ...
   
    if($data = mysqli_fetch_array($res)){
       $to  = trim($data[1]);  
       $userCode = trim($data[0]);
       $from  = "mdiop@pasteur.sn" ;  
       
       // envoi du mail de notification 
       $email =  envoyer_mail($data[0], $to, $data['nom'], $data['profile']);
       
       if ($email) {
          	echo "all_ok";
       } 
       else {
           echo "ok";
       }
    }
    else{
        echo "ok";
    }
   // echo $email;
} 
else {
    echo 'ko';
}

//fermetire de la base de données ...
mysqli_close();

// fermeture du script ...
exit(); 
