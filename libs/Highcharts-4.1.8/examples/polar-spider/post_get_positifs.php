<?php
require '../../../../connect.php';

extract($_POST);
$where = "";
if($sexe !== ""){
    $where .= " AND sexe LIKE '$sexe' ";
}

if($annee !== ""){
    $where .= " AND YEAR(date_reception_lab) = $annee ";
}

if(($virus == "" && $tests == "") == false){
    $where .= " AND (";
    if($virus == ""  && $tests !== ""){
        $virus = array("yf", "chik","zika", "den", "wn", "cchf", "rvf");
        $tests = explode("_", $tests);
    } 
    elseif ($virus !== ""  && $tests == "") {
        $tests = array("igm", "sn","arn");
        $virus = explode("_", $virus);   
    }
    elseif ($virus !== ""  && $tests !== "") {
        $tests = explode("_", $tests);
        $virus = explode("_", $virus);   
    }
    foreach($tests as $test){
        foreach ($virus as $vir){
            $where .= "  ".$test."_".$vir." = 1 OR ";
        }
    } 
    $where = substr($where, 0, -3). ") ";
}
else {
    $where .= " AND igm_yf = 1 ";
}

//echo $where; exit();
//$where .= " AND igm_yf = 1 ";

// fetch des resultats ...
$datas=array();
foreach ($categories as $pays){
    $query = "  SELECT pays, count(*) as nb
                FROM view_cnrfj
                WHERE pays LIKE '".str_replace("'","''",$pays)."'  ".$where;
  
    $res = mysqli_query($link, $query);
    if($res && mysqli_num_rows($res)>0){
        while($data = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $datas[] = json_encode($data);
        }
    } else {
        $data = array();
        $data[$pays] = $pays;
        $data['nb'] = '0';
        $datas[] = json_encode($data);
    }
}

echo json_encode($datas);

mysqli_close();
exit();