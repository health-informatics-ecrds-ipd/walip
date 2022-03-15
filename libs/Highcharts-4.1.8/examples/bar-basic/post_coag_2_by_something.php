<?php
session_start();
/*
if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'data_entry_perf') === false) {
    exit();
}
*/

require '../../../../connect.php';

extract($_POST);

$query =   "select if( upper(".$group.") is not null, upper(".$group."), 'NA' ) as category, count(*) as n
            from
                den_coag_2
            group by ".$group."
            order by ".$group;

if($group === "no_grappe"){
    $query =   "select if( upper(".$group.") is not null, upper(".$group."), 'NA' ) as category, count(*) as n
            from
                den_coag_2
            group by ".$group."
            order by ".$group." * 1";
}

$res = mysqli_query($link, $query);

$response = array();
$n        = array();
$category = array();
while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    array_push($n, intval($data['n']));
    array_push($category, $data['category']);
    
    
}
$response['n']        = $n;
$response['category'] = $category;

echo json_encode($response);

mysqli_close();
exit();




