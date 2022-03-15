<?php
session_start();
if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'data_entry_perf') === false) {
    //header('location:../logout.php');
    exit();
}

require '../../../../connect.php';

extract($_POST);


$query =   "SELECT * FROM " . $recordGroup;


$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();