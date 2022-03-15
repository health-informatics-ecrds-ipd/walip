<?php
session_start();
require '../../../../connect_slave.php';

/*************************************
 *  extraction des variables POSTEES *
 *************************************/
extract($_POST);
extract($_SESSION);

$query = "SELECT count( if(". $diagnostique ." = 1 ,1,NULL)) AS positif ,"
        . "      count( if(". $diagnostique ." = 2 ,1,NULL)) AS negatif,"
        . "     CASE 
        		WHEN (adresse IS NULL OR adresse LIKE '') THEN 'non renseigné' ELSE adresse
        		END AS day "
        . "FROM cnrfj "
        . "WHERE no_epid LIKE '". $investigation ."%' "
        . "GROUP BY adresse";

$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();