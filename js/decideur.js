function show_sample_information(id_plvt) {
    $('#id').val(id_plvt);
    $.post("post_get_sample_data.php", {'id': id_plvt}, function(data) {
        var objet = $.parseJSON(data);
        
        /* parcourir les données chargées */
        $.each(objet, function(key, value) {
            $("#" + key).text('');
            if (value !== null) {
                if ((key.indexOf('iso_pool_')>=0 || key.indexOf('igm_') >= 0 || key.indexOf('cdc_') >= 0 || key.indexOf('arn_') >= 0 || key.indexOf('sn_') >= 0) && key.indexOf('passage') == -1 && key.indexOf('cellule') == -1 && key.indexOf('_val_1') == -1 && key.indexOf('_val_2') == -1) {
                    if (value === '1') {
                        $("#" + key).text('positif');
                        $("#" + key).css('font-style', 'italic');
                        $("#" + key).css('color', 'red');
                    } else if (value === '2') {
                        $("#" + key).text('negatif');
                        $("#" + key).css('font-style', 'italic');
                        $("#" + key).css('color', 'gray');
                    }
                    else {
                        $("#" + key).text('douteux');
                        $("#" + key).css('font-style', 'italic');
                        $("#" + key).css('color', 'gray');
                    }
                }
                else {
                    $("#" + key).text(value);
                }
            }
        });
        $('#img_wait_for_data1').hide();
        $('#table_data_sample').show();
    });
    /*********************************
     * Statut des validations
     */
    validation_status(id_plvt);
    
    $.blockUI({
        message: $('#div_resume'),
        css: {
            top: '1%',
            bottom: '2%',
            left: '10%',
            right: '10%',
            width: '75%',
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '5px',
            'border-radius': '5px',
            '-moz-border-radius': '5px',
            overflow: 'auto'        
        }
    });
}

function commentaire(no_ipd) {
    $('#no_ipd_com').val(no_ipd);
    $('#font_no_ipd').text(no_ipd);
    $.post("post_get_commentaire.php", {'no_ipd': no_ipd}, function(data) {
        $('#img_commentaire_loader').hide();   
        $('#div_com').show();   
        $('#manager_commentaire').val(data);
    });
    
    $.blockUI({
        message: $('#div_commentaire'),
        css: {
            top: '10%',
            bottom: '20%',
            left: '13%',
            right: '13%',
            width: '70%',      
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '5px',
            'border-radius': '5px',
            '-moz-border-radius': '5px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'
        }
    });
}

function validation_status(id_plvt) {
    /* ******************************************************
     *  Connaitre le statut de l'echantillon: valide ou pas   
     */   
    $.post('post_get_sample_status.php', {'id': id_plvt}, function(data) {
        
        if (data !== 'ko') {
            data = $.parseJSON(data); 
            if(data.sero_status === 'oui'){
                $('#a_validation_igm').text('INVALIDER CES RESULTATS');
                $('#a_validation_igm').css('background', 'green');//green
            } else {
                $('#a_validation_igm').text('VALIDER CES RESULTATS');
                $('#a_validation_igm').css('background', 'rgba(250,0,0,0.5)');
            }
            if(data.seroneu_status === 'oui'){
                $('#a_validation_sn').text('INVALIDER CES RESULTATS');
                $('#a_validation_sn').css('background', 'green');//green
            } else {
                $('#a_validation_sn').text('VALIDER CES RESULTATS');
                $('#a_validation_sn').css('background', 'rgba(250,0,0,0.5)');
            }
            if(data.biomol_status === 'oui'){
                $('#a_validation_arn').text('INVALIDER CES RESULTATS');
                $('#a_validation_arn').css('background', 'green');//green
            } else {
                $('#a_validation_arn').text('VALIDER CES RESULTATS');
                $('#a_validation_arn').css('background', 'rgba(250,0,0,0.5)');
            }
            
            $('#img_a_validation_igm').hide();
            $('#a_validation_igm').show();
            
            $('#img_a_validation_sn').hide();
            $('#a_validation_sn').show();
            
            $('#img_a_validation_arn').hide();
            $('#a_validation_arn').show();
        }
    });
}

function f_validation(plateau_tech) {
    var id = $('#id').val();
    $('#a_validation_' + plateau_tech).hide();
    $('#img_a_validation_' + plateau_tech).show();
    var v_text = $('#a_validation_' + plateau_tech).text();
    
    if (v_text === 'VALIDER CES RESULTATS') {
        $.post('post_valide_sample.php', {'id': id, 'plateau_tech' : plateau_tech}, function(data) {
            if (data === 'ok') {
                $('#a_validation_' + plateau_tech).text('INVALIDER CES RESULTATS');
                $('#a_validation_' + plateau_tech).css('background', 'green');
                $('#img_a_validation_' + plateau_tech).hide();
                $('#a_validation_' + plateau_tech).show();
            }
            else {
                $('#img_a_validation_' + plateau_tech).hide();
                $('#a_validation_' + plateau_tech).show();
            }
        });
    }
    else {
        $.post('post_unvalidate_sample.php', {'id': id,  'plateau_tech' : plateau_tech}, function(data) {
            if (data === 'ok') {
                $('#a_validation_' + plateau_tech).text('VALIDER CES RESULTATS');
                $('#a_validation_' + plateau_tech).css('background', 'red');
                $('#img_a_validation_' + plateau_tech).hide();
                $('#a_validation_' + plateau_tech).show();
            }
            else {
                $('#img_a_validation_' + plateau_tech).hide();
                $('#a_validation_' + plateau_tech).show();
            }
        });
    }

}


function blockui() {
    $.blockUI({css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: '<h4> En cours de traitement. Patientez.</h4>'
    });
}

$(document).ready(function() {
    /* ********************
     * fermer le blockui 
     * */
    $('#fermer').click(function() {
        $.unblockUI();
        $('#img_wait_for_data1').show();
        $('#img_wait_for_data2').show();
        $('#table_data_lab_results').hide();
        $('#table_data_sample').hide();
        
        $('#a_validation').hide();
        $('#img_a_validation').show();

        $('#table_fiche_prelevement').DataTable().ajax.reload();

        //$('#img_resume_loader').show();
        return false;
    });
    
    
    $('input, select').focus(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'red');
    });

    $('input, select').focusout(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'black');
    });
    
     /* **************************
      * Ajouter un commentaire
      * */
    $('#bt_ajouter_commentaire').click(function(){
        $('#div_com').hide();
        $('#img_commentaire_loader').show();
       
        var ipd = $('#no_ipd_com').val();
        var commentaire = $('#manager_commentaire').val();
       
        /* **************************
         * poster le commentaire 
         * */
        $.post('post_enregistrer_commentaire.php', {'no_ipd':ipd, 'commentaire': commentaire}, function(data){
            $('#img_commentaire_loader').hide();
            $('#div_com').show();

            if(data === 'ok'){
                alertify.success("Commentaires bien sauvegardes!");
            } else {
                 alertify.error("Une erreur est survenue, veuillez reessayer plutard!!!");
            }
        });
    });
});