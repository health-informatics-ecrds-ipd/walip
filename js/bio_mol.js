function get_biomol(results, motif){
	var res = [];
	$.each(results, function(k,v){
		if(k.indexOf(motif) >= 0  && v == 1){
			res.push(k);
		}
	})
	return res;
}

function blockui()
{
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

function correct_form() {
    var someForm = $('#form_resultats');
    var return_val = true;
    $.each(someForm[0].elements, function(index, elem) {
        if ((elem.id).indexOf("_val") >= 0) {
            var v = $.trim($(elem).val());
            var v1_id = (elem.id).substr(0, (elem.id).length - 6);
            var v1 = $.trim($('#' + v1_id).val());

            if ((v !== '' && v1 === '') || (v !== '' && $.isNumeric(v) === false)) {
                return_val = false;
            }
        }
    });
    return return_val;
}


function init_select_input_handler() {
    var someForm = $('#form_resultats');

    $.each(someForm[0].elements, function(index, elem) {
        select_input_handler(elem.id);
    });
}

function select_input_handler(id) {
    if (id === 'no_ipd') {
        return;
    }

    if ((id.indexOf("igm_") >= 0 || id.indexOf("arn_") >= 0 || id.indexOf("sn_") >= 0) === false) {
        return;
    }

    var id1;
    var id2;
    var id3;

    if (id.indexOf("_val") >= 0) {
        id1 = id.substr(0, id.length - 6);
        id2 = id1 + '_val_1';
        id3 = id1 + '_val_2';
    } else {
        id1 = id;
        id2 = id1 + '_val_1';
        id3 = id1 + '_val_2';
    }

    var v1 = $.trim($('#' + id1).val());
    var v2 = $.trim($('#' + id2).val());
    var v3 = $.trim($('#' + id3).val());


    if (v1 === '' && (v2 !== '' || v3 !== '')) {
        $('#' + id1).css('background', 'rgba(255,255,0,0.3)');
    } else {
        $('#' + id1).css('background', 'url(../images/arrow_down.png) no-repeat right white');
        $('#' + id1).css('background-position', '97.5%');
    }

    if (v2 !== '' && $.isNumeric(v2) === false) {
        $('#' + id2).css('background', 'rgba(220,0,0,0.3)');
    } else {
        $('#' + id2).css('background', 'url(../images/arrow_down.png) no-repeat right white');
        $('#' + id1).css('background-position', '97.5%');
    }

    if (v3 !== '' && $.isNumeric(v3) === false) {
        $('#' + id3).css('background', 'rgba(220,0,0,0.3)');
    } else {
        $('#' + id3).css('background', 'url(../images/arrow_down.png) no-repeat right white');
        $('#' + id1).css('background-position', '97.5%');
    }
}



$(document).ready(function() {
    /*-------------------------------------
     Activation des liens selectionnés ...
     ------------------------------------- */

    var u = location.href;
    if ((u.indexOf('menu') >= 0) === false)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('ajouter') >= 0)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('consulter') >= 0)
    {
        $('#a_consulter').addClass('liens_actif');
    }
    else if (u.indexOf('modifier') >= 0)
    {
        $('#a_modifier').addClass('liens_actif');
        $('#div_ajouter_modifier_2').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#sbt_resultats').val('Enregistrer les modifications');
        var id;
        if ((u.indexOf('id=') >= 0) === false)
        {
            $('#div_nav_modif').show();
        }
        else
        {
            id = $.trim(u.split('=')[2]);
        }
        $.post('post_get_results_by_id.php', {'id': id}, function(data)
        {
            if (data !== 'ko')
            {
                // remplir le formulaire des resultats ...
                var d = $.parseJSON(data);
                //console.log(data);

                $.each(d, function(k, v)
                {
                    $('#' + k).val(v);
                });
                //****4S****
                $('#select_influenza_a').multiSelect('select', get_biomol(d,'arn_inf_a'));
                $('#select_influenza_b').multiSelect('select', get_biomol(d,'arn_inf_b'));
                //$('#autre_virus_respiratoire').multiSelect('select', get_biomol(d,'arn_aut_v'));
                $('#groupe_bacteries').multiSelect('select', get_biomol(d,'arn_bact_'));
                //***********
                init_select_input_handler();
            }
        });
    }

    var nb_records = parseInt($('#lab_nb_enregistrement').text());
    var encours = nb_records;

    $('#bt_moins, #bt_plus').click(function(){
        var sens;
        if ((encours > 1 && this.id === 'bt_moins') || (encours < nb_records && this.id === 'bt_plus')){
            blockui();
            if (this.id === 'bt_plus'){
                encours++;
                sens = 'plus';
            } else {
                encours--;
                sens = 'moins';
            }

            $.post('post_get_results_by_id.php', {'sens': sens}, function(data) {
                if (data !== 'ko') {
                    $('#lab_enregistrement_en_cours').text(encours);
                    // remplir le formulaire des resultats ...
                    var d = $.parseJSON(data);
                    $.each(d, function(k, v) {
                        $('#' + k).val(v);
                    });
                    
                    //****4S****
                    $('#select_influenza_a').multiSelect('select', get_biomol(d,'arn_inf_a'));
                    $('#select_influenza_b').multiSelect('select', get_biomol(d,'arn_inf_b'));
                    $('#autre_virus_respiratoire').multiSelect('select', get_biomol(d,'arn_aut_v'));
                    $('#groupe_bacteries').multiSelect('select', get_biomol(d,'arn_bact_'));
                    //***********
                    
                    init_select_input_handler();
                    $.unblockUI();
                }
            });
        }
    });
    
    $('#pcr_tr_tous').change(function(){
    	var val =  $('#pcr_tr_tous').val();
    	var virus = ['yf', 'wn', 'den', 'rvf', 'chik', 'cchf', 'zika', 'ebolav'];
    	/*
    	if(val !== ""){ 
	    	$.each(virus, function(k,v){
	    		$('#arn_' + v).attr('disabled', true);
	    	});
    	} else {
    		$.each(virus, function(k,v){
	    		$('#arn_' + v).attr('disabled', false);
	    	});
    	}
    	*/
    	$.each(virus, function(k,v){
    		$('#arn_' + v).val(val);
    	});
    });
    
    $('#pcr_classic_tous').change(function(){
    	var val =  $('#pcr_classic_tous').val();
    	var virus = ['yf', 'wn', 'den', 'rvf', 'chik', 'cchf', 'zika', 'ebolav'];
    	/*
    	if(val !== ""){ 
	    	$.each(virus, function(k,v){
	    		$('#arnc_' + v).attr('disabled', true);
	    	});
    	} else {
    		$.each(virus, function(k,v){
	    		$('#arnc_' + v).attr('disabled', false);
	    	});
    	}
    	*/
    	$.each(virus, function(k,v){
    		$('#arnc_' + v).val(val);
    	});
    });
    
    $('#sbt_resultats').click(function() {
    	//var virus = ['yf', 'wn', 'den', 'rvf', 'chik', 'cchf', 'zika'];
    	
        $('#sbt_resultats').hide();
        $('#res_loader').show();
        var no_ipd = $.trim($('#no_ipd').val());
        var arn_influenza_a = $.trim($('#arn_influenza_a').val());
        var select_influenza_a = $.trim($('#select_influenza_a').val());
        var arn_influenza_b = $.trim($('#arn_influenza_b').val());
        var select_influenza_b = $.trim($('#select_influenza_b').val());

        if (arn_influenza_a === '1' && (select_influenza_a == '')) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez selectionner un sous-type INFLUENZA A!');
            return false;
        }
        if (arn_influenza_b === '1' && (select_influenza_b == '')) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez selectionner un sous-type INFLUENZA B!');
            return false;
        }
        
        if (no_ipd === '') {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez remplir le(s) champ(s) obligatoire(s)!');
            return false;
        }
        if ($.isNumeric(no_ipd) === false) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : veuillez corriger le numero IPD!');
            return false;
        }

        if (correct_form() === false) {
            $('#res_loader').hide();
            $('#sbt_resultats').show();
            alertify.alert('ERREUR : presence de quelques erreurs!');
            return false;
        }
        /*
        $.each(virus, function(k,v){
    		$('#arnc_' + v).attr('disabled', false);
    		$('#arn_' + v).attr('disabled', false);
    	});
        */
        $.post('post_can_i_modify.php', {'no_ipd': no_ipd}, function(data) {
           if (data === "pas de resultats" || data.split("|")[4] === "" ) {
                $('#form_resultats').submit();
           } else {
                $('#res_loader').hide();
                $('#sbt_resultats').show();
                alertify.alert("IMPOSSIBLE d'editer pour cet echantillon.<br/>"
                        + "Cause : les resultats de BIOMOL sont deja valid\351s ");
                return false;
            }
        }); 
    });

    // colorier les champs en cas d'erreurs ...
    $('select').change(function() {
        select_input_handler(this.id);
    });
    $('input').keyup(function() {
        select_input_handler(this.id);
    });
    $('#no_ipd').keyup(function() {
        var val = $(this).val();
        if (val !== '' && $.isNumeric(val) === false) {
            $(this).css('background', 'rgba(220,0,0,0.3)');
        } else {
            $(this).css('background', 'white');
        }
    });
    
    $('input, select').focus(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'red');
    });

    $('input, select').focusout(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'black');
    });
    
    $('#a_uploader').click(function(){
    	
    	$("#tblLog tr").remove(); 
    	
    	$.blockUI({
    		onOverlayClick: $.unblockUI,
    	    message: $('#div_uploader'),
    	    css: {
    	      top: '30%',
    	      bottom: '1%',
    	      left: '30%',
    	      right: '30%',
    	      width: '38%',    
    	      height: '345px',    
    	      padding: 'auto',
    	      'padding-bottom': '10px',
    	      'border-radius': '0px',
    	      cursor: 'default',
    	      display: 'block',
    	      overflow: 'auto'       
    	    }
    	});
    }); 
    
    
    $('#btn_uploaded_file').click(function(){
    	
    	Dropzone.forElement('#form_dropzone').removeAllFiles(true);
    	
    	$("#tblLog tr").remove(); 
    	
    	$.post('post_insert_upload_records.php', function(data){
    		
    		if(data === "Error: incorrect date format!"){
    			alertify.alert("ERREUR: VEUILLEZ RENOMMER LE FICHIER CORRECTEMENT");
    		}
    		
    		else if(data === "Error : file format!"){
    			alertify.success("ERREUR : CE SYSTEME N'EST PAS PRISE EN CHARGE");
    		}
    		 
    		else{ 
    			var d = $.parseJSON(data);
    			$.each(d, function(k,v){
    				$('#tblLog').append(
    					      '<tr>' + '<td>' + v + '</td>' + '</tr>'
    				);
    			});
    		}
    		
    	});
    	
    });
    
});