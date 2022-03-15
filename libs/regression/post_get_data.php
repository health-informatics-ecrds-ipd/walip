<?php
require '../../connect.php';

$query = "SELECT c.igm_yf , if(c.sexe = 'm',1,2) as sexe"
        . " FROM cnrfj c "
        . " WHERE igm_yf IS NOT NULL " ; 

//execution de la requete ...

$res = mysql_query($query);

$data = array();

while($d = mysql_fetch_array($res, MYSQLI_NUM)){
    $dd = array();
    $dd []= intval($d[0]);
    $dd []= intval($d[1]);
    $data[] = ($dd);
}

echo json_encode($data);

// fermeture de mysql ...
mysql_close();
// forcer l'arret du script...
exit();