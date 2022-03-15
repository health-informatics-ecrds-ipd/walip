<?php 
require '../../../connect_simple.php';
require '../../functions.php';
require 'error_logs.php';

$data = file_get_contents('../../../superviseur/pilote_dko.txt', true);

$data_json = json_decode($data, true);

print_r($data_json);

$groups = ['traitement_en_cours'];

$cols = $values = array();

foreach($data_json['entries'] as $key => $val) {
    $key = trim($key);
    if(in_array($key, $groups) == false){
        array_push($cols, $key);
        array_push($values, mysqli_real_escape_string($link, trim($val)));
    }
    else{
        $v_tmp = explode("\n", $val);
        foreach($v_tmp as $key => $val){
            $val = explode(":", $val);
            if(count($val)>1){
                array_push($cols, trim($val[0]));
                array_push($values, mysqli_real_escape_string($link, trim($val[1])));
            }
            else{
                array_push($cols, trim($val[0]));
                array_push($values, "1");
            }
        }
    }
}

function date_standard_format($datetime1){
    try {
        $datetime1 = explode("/", $datetime1);
        $datetime = $datetime1[2] . "-" . $datetime1[1]  . "-" . $datetime1[0];
    } 
    catch (Exception $e) {
        return 'NULL';
    }
    
    return $datetime;
}

# Change date format
$dates = [
    'date_du_dernier_contact', 'date_detection', 
    'date_entree_pays', 'date_voyage_1', 'date_voyage_2', 
    'date_consultation_structure_sanitaire', 'date_debut_symptomes'
];

foreach ($dates as $key => $val){
    if(array_search($val, $cols,true) != null){
        $i_date = array_search($val, $cols,true);
        $values[$i_date] = date_standard_format($values[$i_date]);
    }
}



# Date heure d'envoi
# array_push($cols, 'date_envoi');
# array_push($values, $callbackData['create_date']['date']);

$query = "INSERT INTO cnrfj (". implode(', ', $cols ) . ") VALUES ('" . implode("', '", $values ) . "')";
$query = str_replace("'oui'", "'1'", $query);
$query = str_replace("'non'", "'2'", $query);
$query = str_replace("'nsp'", "'3'", $query);
$query = str_replace("'Toujours (tous les jours)'", "'1'", $query);
$query = str_replace("'Parfois'", "'2'", $query);
$query = str_replace("'Exceptionnellement'", "'3'", $query);


echo '<br><br>' . $query;


exit();
