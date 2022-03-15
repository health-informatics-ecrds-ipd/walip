<?php
require '../../../../connect.php';

$sexe = "";
if(isset($_POST['sexe']) && $_POST['sexe'] != "" ){
    $sexe .= " AND c.sexe = '".$_POST['sexe']."' ";
}

$yf = "";
if(isset($_POST['yf']) && $_POST['yf'] != "" ){
    $yf = " AND (c.igm_yf = ".$_POST['yf']." OR c.cdc_yf = ".$_POST['yf'].") ";
}

$annee = "";
if(isset($_POST['annee']) && $_POST['annee'] != "" ){
    $annee = " AND (YEAR(c.date_reception_lab) = ".$_POST['annee'].") " ;
}


$query = "  SELECT cp.acronyme_province as k, COUNT( * ) as v
            FROM view_cnrfj AS c, cnrfj_provinces AS cp
            WHERE  SUBSTRING_INDEX( c.no_epid,  '-', 2 ) LIKE cp.code_pays_province ". $sexe . $yf . $annee
          ." GROUP BY cp.acronyme_province ";

$res = mysql_query($query);

// fetch des resultats ...
$datas=array();
while($data = mysql_fetch_array($res, MYSQLI_ASSOC)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysql_close();
exit();