<?php
require '../../../../connect.php';

// extraction des variables postées ...
extract($_POST);

// closes where eventuels...
$where = "";
if ($sexe !== ""){
    $where .= " AND sexe LIKE '".$sexe."' ";
} 
if($annee !== ""){
    $where .= " AND YEAR(date_reception_lab) = ".$annee. " ";
} 

$query = "  SELECT pays, COUNT( * ) AS nb
            FROM cnrfj
            WHERE pays IS NOT NULL AND igm_yf = 2 ".$where.
            " GROUP BY pays  ";


$res = mysqli_query($link, $query);

// fetch des resultats ...
$datas=array();
while($data = mysqli_fetch_array($res, MYSQLI_ASSOC)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysqli_close();
exit();