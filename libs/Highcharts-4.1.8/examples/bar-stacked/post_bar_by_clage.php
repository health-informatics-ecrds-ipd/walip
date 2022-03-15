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
								AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0) ,1,NULL)) AS en_cours, "
        . "     CASE
        			WHEN age_annees IS NULL THEN 'non renseigné'
   					WHEN age_annees >= 0  AND age_annees < 10 THEN '[0, 10['
					WHEN age_annees >= 10 AND age_annees < 20 THEN '[10, 20['
        			WHEN age_annees >= 20 AND age_annees < 30 THEN '[20, 30['
        			WHEN age_annees >= 30 AND age_annees < 40 THEN '[30, 40['
        			WHEN age_annees >= 40 THEN '[40, ->['
				END  AS day "
        . "FROM covid_patients_db_new "
        . "WHERE no_epid LIKE '". $investigation ."%' "
        . "GROUP BY day";

$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();