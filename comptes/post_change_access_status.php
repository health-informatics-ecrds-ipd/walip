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
$query = "SELECT access FROM cnrfj_clients WHERE id =".$id;
$res = mysqli_query($link, $query);
$statut = '';
if ($data = mysqli_fetch_array($res)) {
    $statut = trim($data['access']);
}

if ($statut === 'oui') 
{
    $query = "UPDATE cnrfj_clients SET access = 'non' WHERE id =".$id;
}
else 
{
    $query = "UPDATE cnrfj_clients SET access = 'oui' WHERE id =".$id;
}

// changement de statut du client ...
$res = mysqli_query($link, $query);

if ($res) {// changement effectif ...
    echo 'ok';
    exit();
}

else 
{
    echo 'ko';
    exit();
}

