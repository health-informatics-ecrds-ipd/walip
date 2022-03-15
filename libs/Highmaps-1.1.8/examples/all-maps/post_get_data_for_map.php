<?php
require '../../../../connect.php';

$bd = ""; 
if(isset($_POST['bd']) && $_POST['bd'] != "" ){
	$bd .= " AND c.base_nat_reg = '".$_POST['bd']."' ";
}

$sexe = "";
if(isset($_POST['sexe']) && $_POST['sexe'] != "" ){
    $sexe .= " AND c.sexe = '".$_POST['sexe']."' ";
}

$yf = "";
if(isset($_POST['yf']) && $_POST['yf'] != "" ){
    $yf = " AND ( c.igm_yf = ".$_POST['yf']." OR c.cdc_yf = ".$_POST['yf']." ) ";
}

$annee = "";
if(isset($_POST['annee']) && $_POST['annee'] != "" ){
    $annee = " AND (YEAR(c.date_reception_lab) = ".$_POST['annee'].") " ;
}


$query = "  SELECT cp.acronyme as k, COUNT( c.pays ) as v  
            FROM view_cnrfj c, cnrfj_pays cp
            WHERE cp.nom LIKE c.pays  ". $sexe . $yf . $annee . $bd
          ." GROUP BY cp.acronyme ";

$res = mysql_query($query);

// fetch des resultats ...
$datas=array();
while($data = mysql_fetch_array($res, MYSQLI_ASSOC)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysql_close();
exit();