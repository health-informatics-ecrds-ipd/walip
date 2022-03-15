<?php
session_start();
require 'connect.php';

/*
 * Tester si on a une vrai première connexion 
 * 1) si le code client exite 
 * 2) si le login et le mot de passe sont deja configurés 
 */
if(isset($_GET['code']) == false)
{
    exit();
}

$query =  "SELECT * "
        . "FROM cnrfj_clients "
        . "WHERE code_client = '".$_GET['code']."'";
// execution de la requete ...
$res = mysqli_query($link, $query);

if(mysqli_num_rows($res)>0)// dans ce cas, le code_client existe dans la table des users 
{
    $query =  "SELECT * "
            . "FROM cnrfj_clients "
            . "WHERE code_client = '".$_GET['code']."' AND login IS NOT NULL AND mdp IS NOT NULL";
    // execution de la requete ...
    $res = mysqli_query($link, $query);
    
    if(mysqli_num_rows($res)==0) // Cas d'une première configuration ...
    {
        // redirection vers la page pour faire la coonfiguration 
        header('location:register.php?code='.$_GET['code']);
    }
    else 
    {
        header('location:index.php');
    }
}
else 
{
    header("location:error.php?cause=ERREUR : Veuillez contacter l'administrateur des comptes d'acces a la base de donnees!");
}
exit();
