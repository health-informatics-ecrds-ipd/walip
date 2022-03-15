<?php
session_start();
require '../../../../connect.php';
require '../../../../functions.php';

/*************************************
 *  extraction des variables POSTEES *
 *************************************/
extract($_POST);
extract($_GET);
extract($_SESSION);



$query = "SELECT count(*) AS nb, IF(q_67 IS NULL OR TRIM(q_67) LIKE '', 'non-renseigne', q_67) as day, q_63 AS localite "
        . "FROM cap_response_database "
        . "WHERE q_63 LIKE '".$localite."' " 
        . "GROUP BY q_67";

//echo($query); exit();

$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();