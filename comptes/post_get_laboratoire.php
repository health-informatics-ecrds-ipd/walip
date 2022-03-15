<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
require "../connect.php";

$query = "SELECT * FROM pt_laboratories";

$res = mysqli_query($link, $query);

$datas = array();

while($data = mysqli_fetch_array($res)){
    $datas[] = json_encode($data);
}

echo json_encode($datas);

mysqli_close();
exit();
