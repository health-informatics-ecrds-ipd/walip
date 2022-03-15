<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
     header('location:../logout.php');
     exit();
 }
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = 'cnrfj_clients';
 
// Table's primary key
$primaryKey = 'id';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array( 
    array( 'db' => 'id', 'dt' => 0 ),
    array( 'db' => 'pays', 'dt' => 1 ),
    array( 'db' => 'district',  'dt' => 2 ),
    array( 'db' => 'laboratoire',   'dt' => 3 ),
    array( 'db' => 'nom',  'dt' => 4 ),  
    array( 'db' => 'adresse_mail', 'dt' => 5 ),
    array( 'db' => 'access',     'dt' => 6 ,
    'formatter' => function( $d, $row ) {
        return "<label id='label_change_access_status_".$row[0]."' >"
                . $d
                ."</label>  " . 
               "<a href='javascript:void(0)'  onclick='change_access_status(". $row[0] .")' id='a_change_access_status_".$row[0] ."' >"
                . "<img src='../images/Modify-icon.png' style='border:none;' />"
                ."</a>";
    }),
    array( 'db' => 'profile', 'dt' => 7 ),
    array( 'db' => 'nb_connections',  'dt' => 8 ),
    array( 'db' => 'date_time',  'dt' => 9 ),
    array( 'db' => 'access',     'dt' => 10 , 
    'formatter' => function( $d, $row ) { // modifier
        return "<a href='index.php?menu=modifier&id=".$row[0]."'"
                        . "class='mousemessagelink' onmouseover='DisplayMessage(this)' onmouseout='UndisplayMessage()'  >"
                        . "<img src='../images/Modify-icon_1.png' style='border:none;' />"
                        . "<!-- Modifier! -->"
                . "</a>";
    }),
            array( 'db' => 'id',     'dt' => 11 , 
    'formatter' => function( $d, $row ) { // modifier
        return "<a href='javascript:void(0)'  "
                    . "class='mousemessagelink' onmouseover='DisplayMessage(this)' onmouseout='UndisplayMessage()' "
                    . " onclick='reinitialiser(".$row[0].")'   >"
                            . "<img src='../images/repair.png' style='border:none;' />"
                            . "<!-- Reinitialiser le compte d'acces de ".$row[4]."! -->"
               . "</a>";
    }),
            array( 'db' => 'id',     'dt' => 12 , 
    'formatter' => function( $d, $row ) { // modifier
        return "<a href='javascript:void(0)'  "
                    . "class='mousemessagelink' onmouseover='DisplayMessage(this)' onmouseout='UndisplayMessage()' "
                    . " onclick='supprimer_compte_de(".$row[0].")'   >"
                            . "<img src='../images/trash.png' style='border:none;' />"
                            . "<!-- Supprimer le compte d'acces de ".$row[4]."! -->"
               . "</a>";
    }),
    array( 'db' => 'statut',     'dt' => 13 , 
    'formatter' => function( $d, $row ) { // statut
    	if($d == "1"){
    		return "<label style='color:green;'>connect&eacute;(e)</label>";
    	} else {
    		return "<label style='color:red;'>d&eacute;connect&eacute;(e)</label>";
    	}
    }),
    array( 'db' => 'nb_download',   'dt' => 14 ),
    array( 'db' => 'last_download',   'dt' => 15 )
);

// SQL server connection information
include '../sql_details.php';


 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( '../libs/DataTables/server_side/scripts/ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);
