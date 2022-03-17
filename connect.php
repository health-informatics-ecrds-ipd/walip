<?php


###
# Data Cleaning - Prevent SQL injections
$keys = array_keys($_POST);
foreach ($keys as $key){
    $_POST[$key] = mysqli_real_escape_string($link,trim($_POST[$key]));
}  

# Data Cleaning - Prevent SQL injections
$keys = array_keys($_GET);  
foreach ($keys as $key){
    $_GET[$key] = mysqli_real_escape_string($link,trim($_GET[$key]));
} 
###

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
