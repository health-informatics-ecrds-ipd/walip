<?php
session_start();
require '../../../../connect.php';

/*************************************
 *  extraction des variables POSTEES *
 *************************************/
extract($_POST);

$query = "SELECT 
		
				count( if(cephalee = 1  ,1,NULL)) as cephalee, 
				count( if(temperature > 37  ,1,NULL)) as fievre, 
				count( if(douleurs_yeux = 1  ,1,NULL)) as douleurs_yeux, 
				count( if(douleurs_musculaires = 1  ,1,NULL)) as douleurs_musculaires , 
				count( if(douleurs_articulaires = 1  ,1,NULL)) as douleurs_articulaires , 
				count( if(eruptions_cutanees = 1  ,1,NULL)) as eruptions_cutanees, 
				count( if(nausees_vomissements = 1  ,1,NULL)) as nausees_vomissements, 
				count( if(toux = 1  ,1,NULL)) as toux , 
				count( if(petechies = 1  ,1,NULL)) as petechies , 
				count( if(selles_sang = 1  ,1,NULL)) as selles_sang, 
				count( if(saigne_gencive = 1  ,1,NULL)) as saigne_gencive ,
				count( if(congestions_nasales = 1  ,1,NULL)) as congestions_nasales ,
				count( if(icteres = 1  ,1,NULL)) as icteres,
				arn_den as statut
		
			FROM cnrfj 

			WHERE no_epid LIKE 'epi/17/LG%'
		
		    GROUP BY arn_den ";
			
$res = mysqli_query($link, $query);
$datas=array();

while($data=  mysqli_fetch_array($res,MYSQLI_ASSOC)){
    $datas[] = $data;
}

// retourner les resultats ...
echo json_encode($datas);

mysqli_close();
exit();