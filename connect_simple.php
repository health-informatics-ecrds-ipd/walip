<?php


# test if the connection was made
if (!$link){
    header('location:error.php');
    exit();    
}  

mysqli_set_charset($link, "latin1");  

#SESSION TIMEOUT
$inactive = 3600;
if( !isset($_SESSION['timeout']) )
$_SESSION['timeout'] = time() + $inactive; 
$session_life = time() - $_SESSION['timeout'];
if($session_life > $inactive){  
    session_destroy(); header("location:../logout.php");     
}
$_SESSION['timeout']=time();
