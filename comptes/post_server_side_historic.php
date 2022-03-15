<?php
 session_start();
 if (isset($_SESSION['username']) === false || strpos($_SESSION['profile'], 'comptes') === false) {
	 header('location:../logout.php');
	 exit();
 }
// DB table to use
$table = 'cnrfj_historique_edition';

// Table's primary key
$primaryKey = 'id';

$columns = array (
		array (
				'db' => 'editeur',
				'dt' => 0 
		),
		array (
				'db' => 'no_ipd',
				'dt' => 1 
		),
		array (
				'db' => 'date_heure',
				'dt' => 2 
		),
		array (
				'db' => 'profile',
				'dt' => 3 
		)
);

// SQL server connection information
include '../sql_details.php';

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * If you just want to use the basic configuration for DataTables with PHP server-side, there is no need to edit below this line.
 */

require ('../libs/DataTables/server_side/scripts/ssp.class.data_manager_comptes_historic.php');

echo json_encode ( SSP::simple ( $_GET, $sql_details, $table, $primaryKey, $columns ));
