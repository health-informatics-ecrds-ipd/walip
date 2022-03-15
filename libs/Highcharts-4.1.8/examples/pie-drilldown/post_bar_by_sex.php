<?php
session_start();
require '../../../../connect.php';

/*************************************
 *  extraction des variables POSTEES *
 *************************************/
extract($_POST);
extract($_SESSION);

//$diagnostique_arr = explode('_', $diagnostique);
$diagnostique  = str_replace("-", "", $diagnostique);
$diagnostique  = str_replace("pcrigm_", "", $diagnostique);


$query = "SELECT count( if(sexe = 'f' ,1,NULL)) AS Femme ,"
		. "      count( if(sexe = 'f' and (igm_". $diagnostique ." = 1 OR arn_". $diagnostique ." = 1) ,1,NULL)) AS femme_pos, "
		. "      count( if(sexe = 'f' and ( (igm_". $diagnostique ." = 2 AND arn_". $diagnostique ." = 2 ) 
								OR (igm_". $diagnostique ." = 2 AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0))
								OR ((igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0) AND arn_". $diagnostique ." = 2)),1,NULL)) AS femme_neg, "
		. "      count( if(sexe = 'f' and ( (igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0)
								AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0)) ,1,NULL)) AS femme_nan, "
				
        . "      count( if(sexe = 'm' ,1,NULL)) AS Homme, "
        . "      count( if(sexe = 'm' and (igm_". $diagnostique ." = 1 OR arn_". $diagnostique ." = 1) ,1,NULL)) AS homme_pos, "
		. "      count( if(sexe = 'm' and ( (igm_". $diagnostique ." = 2 AND arn_". $diagnostique ." = 2 ) 
								OR (igm_". $diagnostique ." = 2 AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0))
								OR ((igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0) AND arn_". $diagnostique ." = 2)) ,1,NULL)) AS homme_neg, "
		. "      count( if(sexe = 'm' and ( (igm_". $diagnostique ." IS NULL OR igm_". $diagnostique ." = 0)
								AND (arn_". $diagnostique ." IS NULL OR arn_". $diagnostique ." = 0)) ,1,NULL)) AS homme_nan "
        
        . "FROM cnrfj "
        . "WHERE no_epid LIKE '". $investigation ."%' ";
        
    

$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();