<?php
require '../../../../connect.php';

$query =   "SELECT c.pays as pays, YEAR(c.date_reception_lab) as annee , COUNT(c.date_reception_lab) as nb , cp.code_pays 
            FROM view_cnrfj AS c, cnrfj_pays AS cp
            WHERE c.pays LIKE cp.nom and YEAR(c.date_reception_lab) is not null 
            GROUP BY c.pays, YEAR(c.date_reception_lab) 
            ORDER BY annee";

$res = mysql_query($query);

// fetch des resultats ...
$datas=array();
while($data = mysql_fetch_array($res, MYSQLI_ASSOC)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysql_close();
exit();