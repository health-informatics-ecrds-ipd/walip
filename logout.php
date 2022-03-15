<?php
session_start();
require 'connect.php';
/*
if(file_exists("clients/".session_id().".png"))
{
    unlink("clients/".session_id().".png");
}
*/ 


mysqli_query($link, "UPDATE cnrfj_clients
        	SET  statut = 0
        	WHERE login LIKE BINARY '".$_SESSION["login"]."' AND mdp LIKE BINARY '".$_SESSION["mdp"]."'");

/*
mysqli_query($link, " INSERT INTO cnrfj_historique_edition    ( editeur, profile,  date_heure )
								 VALUES ('" . $_SESSION ['username']
								 . " - " . $_SESSION ['code_client']
								 . "', 'Deconnexion', '"
								 		. date ( "Y-m-d H:i:s" ) . "')");
*/
mysqli_close();

session_destroy();

header('location:index.php');

exit();
