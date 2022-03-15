<?php
session_start();
require 'connect.php';
require 'functions.php';

extract($_POST);

$query =  "SELECT * "
		. "FROM cnrfj_clients "
		. "WHERE login LIKE BINARY '".$login."' "
		. "AND mdp LIKE BINARY '".md5($mdp)."'";
$res = mysqli_query($link, $query);

if(mysqli_num_rows($res)>0){
	if($data = mysqli_fetch_array($res)){
		if($data['email_notification'] =='oui'){
		    $message  = "[Mail automatique - Ne pas répondre]\n\n";
			$message .= "Cher(e) ".strtoupper($data['nom']).",\n\n".
			"Ce courriel a pour but de vous informer que vous avez accedé avec succés à la Plateforme TERANGA LIMS le ". date('Y-m-d') ." à ". date('H:i:s')."\n\n".
			"Si vous êtes à l'origine de cette connexion, alors aucune action n'est requise de votre part. Toutefois, dans le cas improbable ou vous n'êtes pas à l'origine de cette connexion, veuillez nous envoyer un courriel immédiatement à l'adresse mamadou.cisse@pasteur.sn pour vous apporter toute l'assistance requise.".
			"\n\n".
			"Merci.";
			$email =  email_notification($data["adresse_mail"], $data['nom'], $message);
		}
	}
}

mysqli_close();
exit();
