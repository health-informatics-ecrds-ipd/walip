<?php
session_start();
require '../../../../connect_slave.php';

/*************************************
 *  extraction des variables POSTEES *
 *************************************/
extract($_POST);
extract($_SESSION);

//$diagnostique_arr = explode('_', $diagnostique);
$diagnostique  = str_replace("-", "", $diagnostique);
$diagnostique  = str_replace("pcrigm_", "", $diagnostique);

	$query = "SELECT count( if(arn_". $diagnostique ." = 1 ,1,NULL)) AS positif_pcr, "
			. "      
					 count( if(igm_". $diagnostique ." = 1 AND (arn_". $diagnostique ." <> 1 OR arn_". $diagnostique ." IS NULL)  ,1,NULL)) AS positif_serologie , "
			. "      
					 count( if(    (igm_". $diagnostique ." = 2 AND arn_". $diagnostique ." = 2 ) 
								OR (igm_". $diagnostique ." = 2 AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0))
								OR ((igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0) AND arn_". $diagnostique ." = 2) ,1,NULL) ) AS negatif, "
			. "      
					 count( if(     (igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0)
								AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0) ,1,NULL)) AS en_cours,
			CASE 
					WHEN sexe LIKE 'f' THEN 'Femme(s)' 
					WHEN sexe LIKE 'm' THEN 'Homme(s)' 
					WHEN sexe IS NULL OR (sexe NOT LIKE 'f' AND sexe NOT LIKE 'm') THEN 'non renseigné' 
			END AS day 
			
			FROM covid_patients_db_new 
			
			WHERE no_epid LIKE '". $investigation ."%' 
			
			GROUP BY day";

/*
$query = "SELECT count( if(arn_den = 1 ,1,NULL)) AS positif ,"
		. "      count( if(arn_den = 2 ,1,NULL)) AS negatif,"

		. "      sexe AS day  "
		. "FROM cnrfj "
				. "WHERE no_epid LIKE 'epi/17/LG%' "
						. "GROUP BY sexe";
*/

$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();