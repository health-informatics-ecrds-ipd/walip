<?php 

function get_record_by_id($link, $id){
    $res  = null;
    $data = null;
    
    if(is_null($id)){
        #$res  = mysqli_query($link, "SELECT * FROM den_coag WHERE id = LAST_INSERT_ID()");
        $res  = mysqli_query($link, "SELECT * FROM den_coag_2 WHERE id = (select max(id) from den_coag_2)");
        
    }
    
    else{
        $res = mysqli_query($link, "SELECT * FROM den_coag_2 WHERE id = ".$id );
    }
    
    if($data = mysqli_fetch_array($res)){
        return $data;
    }
    
    return false;
}

function error_logs($link, $id){
    $data = get_record_by_id($link, $id); // get last record 
    $errors_logs = "";
    $n_logs = 0;
    
    if(is_null($data['id_participant'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". IDENTIFIANT DU PARTICIPANT NON SPECIFIE <BR>";
    }
    if(!is_null($data['id_participant']) &&  !is_numeric(trim($data['id_participant']))){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". IDENTIFIANT DU PARTICIPANT INVALIDE <BR>";
    }
    if(is_null($data['region'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". REGION NON RENSEIGNE <BR>";
    }
    if(is_null($data['district'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". DISTRICT NON RENSEIGNE <BR>";
    }
    if(is_null($data['no_ordre'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". NUMERO ORDRE NON RENSEIGNE <BR>";
    }
    if(is_null($data['date_nais']) && is_null($data['age_annees']) && is_null($data['age_mois'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". AGE NON RENSEIGNE <BR>";
    }
    if(is_null($data['no_grappe'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". NUMERO DE GRAPPE NON RENSEIGNE <BR>";
    }
    if(is_null($data['no_menage'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". NUMERO DE MENAGE NON RENSEIGNE <BR>";
    }
    if(is_null($data['sexe'])){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". SEXE NON RENSEIGNE <BR>";
    }
    if(!is_null($data['no_menage']) && $data['no_menage'] > 2000){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". NUMERO MENAGE > 2000 <BR>";
    }
    if(!is_null($data['no_ordre']) && $data['no_ordre'] > 5){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". NUMERO ORDRE > 5 <BR>";
    }
    if(!is_null($data['periode_fievre']) && (is_null($data['antecedant_fievre'])
        || (!is_null($data['antecedant_fievre']) && $data['antecedant_fievre'] != '1'))){
            $n_logs = $n_logs + 1;
            $errors_logs .= $n_logs . ". INCOHERENCE : ANTECEDANT FIEVRE - PERIODE DE SURVENUE <BR>";
    }
    if(!is_null($data['date_contact_personne_covid']) && (is_null($data['contact_personne_covid'])
        || (!is_null($data['contact_personne_covid']) && $data['contact_personne_covid'] != '1'))){
            $n_logs = $n_logs + 1;
            $errors_logs .= $n_logs . ". INCOHERENCE : PERSONNE COVID - DATE CONTACT <BR>";
    }
    if(!is_null($data['frequence_moustiquaire']) && (is_null($data['moustiquaire'])   
                      || (!is_null($data['moustiquaire']) && $data['moustiquaire'] != '1'))){
        $n_logs = $n_logs + 1;
        $errors_logs .= $n_logs . ". INCOHERENCE : MOUSTIQUAIRE - FREQUENCE MOUSTIQUAIRE <BR>";
    }
    
    if(!is_null($data['date_nais'])){
        $datetime1 = date_create($data['date_nais']);
        $datetime2 = date_create(date('Y-m-d'));
        $interval = date_diff($datetime1, $datetime2);
        if($interval->format('%R%a')<0){
            $n_logs = $n_logs + 1;
            $errors_logs .= $n_logs . ". DATE DE NAISSANCE SUPERIEURE A LA DATE COURANTE <BR>";
        }
        
       // handle date / age - problems
    }
   
    //if($n_logs == 0) return false;
    return array($errors_logs, $n_logs);
}
