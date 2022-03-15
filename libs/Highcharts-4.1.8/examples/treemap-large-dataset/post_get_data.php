<?php
require '../../../../connect.php';



$query = "  SELECT pays, COUNT( * ) AS nb
            FROM cnrfj_serveur
            GROUP BY pays ";

$res = mysqli_query($link, $query);

// fetch des resultats ...
$datas=array();
while($data = mysqli_fetch_array($res, MYSQLI_ASSOC)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysqli_close();
exit();