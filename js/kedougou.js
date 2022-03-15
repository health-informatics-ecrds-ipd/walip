function selectCountry(val, id) {
    $("#" + id).val(val);
    $("#" + id).keyup();
    $("#" + id + "_sb").hide();
}

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}


function fill_ds(){
	$('#zone_sante').append('<option value=""></option>'); 
    $.post("post_get_disctricts.php", {'region':'NA'}, function(data) {
        var oData = $.parseJSON(data);
        $.each(oData, function(k, v) {
            var oV = $.parseJSON(v);
            $('#zone_sante').append('<option value="'+oV['code_district']+'">' + oV['code_district'] + '</option>');
        });
    });
}


function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

function billing(id, client_compte){
	$('#client_compte').val(client_compte);
	$("#slct_mode_payement").val("");
	$("#lbl_mode_payement").text("");
	
	$("#slct_ordonnance").val("");
	$("#lbl_ordonnance").text("");
	
	$("#lbl_prix1").text("");
	$("#lbl_prix2").text("");
	$("#lbl_prix3").text("");
	    
	$("#lbl_datetime").text(new Date().toLocaleString());
	$.post('post_get_billing_info.php', {'id':id}, function(data){
		data = $.parseJSON(data);
		$("#identifiant_lab").text(data['no_ipd']);
		$("#lbl_code_secret").text(data['qrcode']);
		for(i=0; i < 9; i++){
			$("#lbl_id"+i).text(data['no_ipd']);
			$("#lbl_nom_patient"+i).text(data['nom_patient']);
			$("#lbl_age"+i).text(data['age_annees']);
			$("#lbl_date"+i).text(data['date_prelevement']);
			$("#lbl_passeport"+i).text(data['no_passeport']);	
		}
		
		$.blockUI({
		  onOverlayClick: $.unblockUI,
	        message: $('#div_facturation'),
	        css: {
	            top: '5%',
	            height: '90%',
	            left: '25%',
	            right: '34%',
	            width: '50%',      
	            padding: 'auto',
	            'padding-bottom': '10px',
	            '-webkit-border-radius': '5px',
	            'border-radius': '30px',
	            '-moz-border-radius': '5px',
	            cursor: 'default',
	            display: 'block',
	            overflow: 'auto'
	        }
		});
	});
}         
      
function set_field_id(id, no_terrain){
	$('#lbl_no_ipd').text( id );
	$('#txt_new_no_terrain').val(no_terrain == '' ? '' : no_terrain);
	
	if(no_terrain !== '' && !(no_terrain.match(/SN\/[A-Z]{3}\/2[0-2]\/\d+(-C\d+)*/g) == no_terrain)){
		$('#txt_new_no_terrain').css('background','rgba(255,10,10,.4)');
		$('#btn_set_id').prop('disabled', true);
	}
	else if(no_terrain !== ''){
		$('#txt_new_no_terrain').css('background','white');
		$('#btn_set_id').prop('disabled', false);
	}
	else{
		$('#txt_new_no_terrain').css('background','white');
		$('#btn_set_id').prop('disabled', true);
	}
	
	$.blockUI({
	  onOverlayClick: $.unblockUI,
        message: $('#div_set_id'),
        css: {
            top: '30%',
            height: '200px',
            left: '37%',
            right: '37%',
            width: '400px',      
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

function generate_patient_ID(){
	var ds         =  $.trim($("#zone_sante").val());
	var sexe       =  $.trim($("#sexe").val());
	var nom        =  $("#nom_patient").val().split(" ");
	var age_annees =  $.trim($("#age_annees").val());
	var l1         = ($.trim(nom[0])[0]).toUpperCase();
	var l2         = ($.trim(nom.pop()[0])).toUpperCase();
	var code       = l1 + l2 + sexe + age_annees + ds;
	
	if(ds == "" || sexe == "" || nom == "" || age_annees == ""){
		return;
	}
	
	if($.trim($("#no_terrain").val()) == ""){
		$("#no_terrain").val(code);
	}
}

function resultats_bio( id ){
	// Vider la table...
    $("#div_resultats_boi label[id]").map(function() { 
    	$("#"+this.id).text("");
    });
    
    // Afficher la table ...
	$.blockUI({
        message: $('#div_resultats_boi'),
        css: {
            top: '10%',
            bottom: '1%',
            left: '13%',
            right: '13%',
            width: '70%',      
            height: '300px',      
            padding: 'auto',
            'padding-bottom': '10px',
            'border-radius': '0px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'            
        }
    });
    
	// Remplir la table ...
    $.post("post_get_resultats_bio.php", {'id': id}, function(data){
    	var data = $.parseJSON(data);
    	$.each(data, function(k,v){
    		var value = v;
    		v =  (v == 1)? " positif" : (v == 2)? " negatif" : "";
    		$("#" + k).text(v);
    		
    		if(value !== null && k == "iso_virus_isole"){
    			$("#" + k).text(value);
    		}
    		
    		$("#" + k).css('font-weight', 'bold');
    		$("#" + k).css('font-style', 'italic');
    		if(v == " positif"){
    			$("#" + k).css('color', 'red');
    		} else {
    			$("#" + k).css('color', 'black');
    		}
    		
    		
    	});
    	
    });
    
    
}

function telechargement(){
    $.blockUI({
        message: $('#div_extraction'),
        css: {
            top: '10%',
            bottom: '1%',
            left: '13%',
            right: '13%',
            width: '70%',      
            height: '75%',      
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '50px',
            'border-radius': '50px',
            '-moz-border-radius': '50px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'            
        }
    });
}

function publication(){
     $.blockUI({
        message: $('#div_publication'),
        css: {
            top: '10%',
            bottom: '1%',
            left: '24%',
            right: '24%',
            width: '50%',      
            height: '35%',      
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '50px',
            'border-radius': '50px',
            '-moz-border-radius': '50px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'            
        }
    });
}

function telecharger_resume(){
    alertify.confirm("Voulez-vous vraiment telecharger un resum\351 de la base de donn\351es?", function (e) {
        if (e) {       
            location='db_summary_new.php';
            return true;
        } else {
            return true;
        }
    });
}

function telecharger_indicateur(){
    alertify.confirm("Voulez-vous vraiment telecharger la base des indicateurs?", function (e) {
        if (e) {       
            location='download_indicateur.php';
            return true;
        } else {
            return true;
        }
    });
}

function telecharger1(){
    alertify.confirm("Voulez-vous vraiment telecharger la base de donnees?", function (e) {
        if (e) {       
        	var no_ipd = $.trim($("#col16_filter").val());
        	var no_ipd1 = $.trim($("#col4_filter").val());
        	var no_ipd2 = $.trim($("#col15_filter").val());
        	var no_epid = $.trim($("#col3_filter").val());
        	var nom_patient = $.trim($("#col5_filter").val());
        	var adresse = $.trim($("#col0_filter").val());
        	var sexe = $.trim($("#col6_filter").val());
        	var age_annees = $.trim($("#col7_filter").val());
        	var age_annees1 = $.trim($("#col12_filter").val());
        	var date_prelevement = $.trim($("#col2_filter").val());
        	var date_prelevement1 = $.trim($("#col14_filter").val());
        	
            location='download.php?no_ipd='+ no_ipd +
            			'&no_ipd1='+no_ipd1 +
            			'&no_ipd2='+no_ipd2 +
            			'&no_epid='+ no_epid +
            			'&nom_patient='+nom_patient +
            			'&adresse='+adresse +
            			'&sexe='+sexe +
            			'&age_annees='+age_annees +
            			'&date_prelevement='+date_prelevement +
            			'&date_prelevement1='+date_prelevement1 +
            			'&age_annees1='+age_annees1;
            
            return true;
        } 
        
        else {
            return true;
        }
    });
}
 
function supprimer_prelevement(id){
//	alertify.error("VOUS N'ETES PAS AUTORISE A SUPPRIMER DES ENREGISTREMENTS");
//	return;
//	if(nbResLab > 0){
//		alertify.error("Vous ne pouver pas supprimer cet enregistrement parce qu'il est lie a des resultats de laboratoire!");
//		return;
//	}
     alertify.confirm("Voulez-vous vraiment supprimer cet enregistrement?", function (e) {
        if (e) {
            blockui(); // bloquer l'interface ... 
            $.post('post_supprimer_prelevement.php', {'id':id}, function(data){
                $.unblockUI(); // debloquer l'interface ...
                if(data === 'ok'){   
                    alertify.success('Echantillon Supprime avec succes!');
                } else {
                    alertify.error('Reessayer plutard !!!');
                }
                $('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
            });  
        } else {
            return true;
        }
    });
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

function date_ok(date) {
    var array_date = date.split('-');
    var j = parseInt(array_date[2]);
    if (array_date[1] === '01' || array_date[1] === '03' || array_date[1] === '05'
            || array_date[1] === '07' || array_date[1] === '08' || array_date[1] === '10' || array_date[1] === '12') {
        if (j > 31 || j < 1) {
            return false;
        }
    } else if (array_date[1] === '02') {
        var annee = parseInt(array_date[0]);
        if (((annee - 1992) % 4 == 0)) {
            if (j > 29 || j < 1) { // annee bisextile ...
                return false;
            }
        } else if (j > 28 || j < 1) {
            return false;
        }
    } else if (j > 30 || j < 1) {
        return false;
    }
    return true;
}


function deduire_age_en_annees_mois() {
    var date_enquete = $.trim($('#date_enquete').val());
    var date_nais = $.trim($('#date_nais').val());
    var isDate = /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/;
    if ((date_enquete) !== '' && (date_nais) !== '' && isDate.test(date_nais)) {
        var date_enquete = date_format($('#date_enquete').val());
        var start = new Date(date_nais),
                end = new Date(date_enquete),
                diff = new Date(end - start),
                days = diff / 1000 / 60 / 60 / 24;
        $('#age_annees').val((days / 365.25).toFixed(2));
        $('#age_mois').val((days / 30.4375).toFixed(2));
    }
}


function date_format(date) {
    if ($.trim(date) === '') {
        return ('0000-00-00');
    }
    // Exemple : 01-AVR-2015
    var date_tab = date.split('-');
    var d = date_tab[2];
    // on cherche le mois ...
    if (date_tab[1] === 'JAN') {
        d = d + '-01-';
    }
    else if (date_tab[1] === 'FEV') {
        d = d + '-02-';
    }
    else if (date_tab[1] === 'MAR') {
        d = d + '-03-';
    }
    else if (date_tab[1] === 'AVR') {
        d = d + '-04-';
    }
    else if (date_tab[1] === 'MAI') {
        d = d + '-05-';
    }
    else if (date_tab[1] === 'JUN') {
        d = d + '-06-';
    }
    else if (date_tab[1] === 'JUI') {
        d = d + '-07-';
    }
    else if (date_tab[1] === 'AOU') {
        d = d + '-08-';
    }
    else if (date_tab[1] === 'SEP') {
        d = d + '-09-';
    }
    else if (date_tab[1] === 'OCT') {
        d = d + '-10-';
    }
    else if (date_tab[1] === 'NOV') {
        d = d + '-11-';
    }
    else if (date_tab[1] === 'DEC') {
        d = d + '-12-';
    }
    d = d + date_tab[0];
    return d;
}

function publish_resultats(id,ipd) {
    publication();
    $("#id_publication").val(id);
    $("#pub_no_ipd").text(ipd);
 
    $.post('post_publication_status.php', {'id':id}, function(data){
        data =  $.parseJSON(data);
        if(data.serologie === "serologie_ok"){
            $("#pub_igm").text("DEPUBLIER");
            $("#pub_igm").css("color","green");
        } else {
            $("#pub_igm").text("PUBLIER");
            $("#pub_igm").css("color","red");
        }
        if(data.seroneutralisation === "seroneutralisation_ok"){
            $("#pub_sn").text("DEPUBLIER");
            $("#pub_sn").css("color","green");
        } else {
            $("#pub_sn").text("PUBLIER");
            $("#pub_sn").css("color","red");
        }
        if(data.biomol === "biomol_ok"){
            $("#pub_arn").text("DEPUBLIER");
            $("#pub_arn").css("color","green");
        } else {
            $("#pub_arn").text("PUBLIER");
            $("#pub_arn").css("color","red");
        }
        $("#img_div_publication").hide();
        $("#div_publication_content").show();
    });
}

function publier_plateau_tech(elem){
    var id =  $("#id_publication").val();       
    $.post('post_publish_results.php', {'id': id, 'elem': elem}, function(data) {
        var lab_text = $.trim($('#' + elem).text());
        if(data === 'ko'){
            alertify.error("Votre requete n'a pas pu etre traite, veuillez reessayer plutard!");
            return;
        }
        if(data === "impossible"){
            alertify.error("IMPOSSIBLE de publier ces resultats, car ils ne sont pas valides!");
            return;
        }
        
        if (lab_text === 'PUBLIER') {
            $('#' + elem).text('DEPUBLIER');
            $('#' + elem).css('color', 'green');
        } else {
            $('#' + elem).text('PUBLIER');
            $('#' + elem).css('color', 'red');
        }      
    });
}

function submit_to_validation(id, no_ipd) { 
    var statut = ($('#td_validation_' + id).text() === 'SOUMIS' ? 'en cours' : $('#td_validation_' + id).text());
    if(statut === 'en cours'){
        alertify.confirm("Cette action va engendrer l'invalidation de tous les resultats de laboratoire !!!", function (e) {
            if(e){
                blockui();
                $.post('post_soumettre_pour_validation.php', {'id': id, 'statut': statut.toLowerCase()}, function(data) {
                    if (data === 'ok') {                       
                        $('#td_validation_' + id).text('SOUMETTRE');
                        $('#td_validation_' + id).css('color', 'red');
                        $('#href_' + no_ipd).css('background', 'rgba(230,0,0,0.6)');                     
                    } else {
                        alertify.alert("Cette action  ne peut etre effectuee actuellement \nVeuillez reessayer plutard!");
                    }
                    $.unblockUI();
                });
            } else {
                return false;
            }
        });
    } else {
        blockui();
        $.post('post_soumettre_pour_validation.php', {'id': id, 'statut': statut.toLowerCase()}, function(data) {
            if (data === 'ok') {           
                $('#td_validation_' + id).text('SOUMIS');
                $('#td_validation_' + id).css('color', 'blue');
            } else {
                alertify.alert("Cette action  ne peut etre effectuee actuellement \nVeuillez reessayer plutard!");
            }
            $.unblockUI();
        });
    }  
}

function modify_sample_general_information(id) {
    blockui();
    $('#sbt_info_mal').val('MODIFIER');
    $('#sbt_info_mal').css('color', 'rgba(255,0,0,0.7)');
    

    $.post('post_charger_fiche_prelevement.php', {'id1': id}, function(data){
        // pre-remplissage des champs ...
        var obj = $.parseJSON(data);
        $.each(obj[0], function(key, value){
            $('#' + key).val(value);    
        });
        $.unblockUI();    
        prefix = $.trim($('#no_epid').val());
        //console.log(prefix);
        //$("#no_epid").val('epi/20/SN/' + obj[0]["no_ipd"]);
        if($('#zone_sante').val() === "COV"){
        	$('#zone_sante').prop( "disabled", true );
        }
        $("#no_epid").val(prefix + obj[0]["no_ipd"]);      
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
        	top: '20%',
            bottom: '30%',
            left: '24%',
            right: '24%',
            width: '50%',      
            padding: 'auto',
            'padding-bottom': '10px',
            'border-radius': '55px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'
        }
    });
}

function historic(no_ipd) {
    $("#table_historic > tbody").empty();
    $('#label_no_ipd_1').text(no_ipd);
    $.post("post_get_historic.php", {'no_ipd': no_ipd}, function(data) {
        $('#img_historic_loader').hide();
        $('#table_historic').show();
        var objet = $.parseJSON(data);
        $.each(objet, function(key, value) {
            var tr = "<tr>"
                    + "<td>" + value[2] + "</td>"
                    + "<td>" + value[3] + "</td>"
                    + "<td>" + value[4] + "</td>"
                    + "</tr>";
            $('#table_historic').append(tr);
        });
    });

    $.blockUI({
        message: $('#div_historic'),
        css: {
            top: '10%',
            bottom: '1%',
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
                else if (key === 'type_prelevement'){
                    if(value === '1'){
                        $("#" + key).text('serum');
                    } else {
                        $("#" + key).text('autre');
                    }
                }
                else if (key === 'etat_prelevement'){
                    if(value === '1'){
                        $("#" + key).text('adequat');
                    } else {
                        $("#" + key).text('inadequat');
                    }
                }
                else if (key === 'formulaire_investigation'){
                    if(value === '1'){
                        $("#" + key).text('bien renseigne');
                    } 
                    else if(value === '2'){
                        $("#" + key).text('complet');
                    }
                    else if(value === '4'){
                        $("#" + key).text('incomplet');
                    }
                    else if(value === '3'){
                        $("#" + key).text('inexistant');
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
    
    //validation_status(id_plvt);

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
            overflow: 'scroll'
        }
    });
}

function get_districts(region){
	var oData;
    var districts = [];
   
    $.post("post_get_disctricts.php", {'region':region}, function(data) {
        oData = $.parseJSON(data);
        $.each(oData, function(k, v) {
            var oV = $.parseJSON(v);
           	districts.push(oV['code_district']);
        });
       
        
        $("#zone_sante").autocomplete({
            source: [districts]
        });  
    });
    
}

$(document).ready(function() {
    var id_prelevement;
    var u = location.href;
    
    fill_ds();
    
    //var no_ipd_old = "";
    
    if ((u.indexOf('menu') >= 0) === false){
         $('#a_consulter').addClass('liens_actif');
    } 
    
    else if (u.indexOf('ajouter_entete') >= 0){
        $('#a_ajouter_entete').addClass('liens_actif');
    }
    
    else if (u.indexOf('ajouter') >= 0){
        $('#a_ajouter').addClass('liens_actif');
    }
    
    
    else if (u.indexOf('stats') >= 0) {
        $('#a_stats').addClass('liens_actif');
    } 
    else if (u.indexOf('consulter') >= 0) {
        $('#a_consulter').addClass('liens_actif');
    }
    else if (u.indexOf('historique') >= 0) {
        $('#a_historique').addClass('liens_actif');
    }
    else if (u.indexOf('modifier') >= 0 && u.indexOf('id') < 0){
        var id;
        $('#div_nav_modif').show();
        $.post('post_get_results_by_id.php',{'id':id}, function(data) {
            if (data !== 'ko') {
                // remplir le formulaire des resultats ...
                var d = $.parseJSON(data);

                $.each(d, function(k, v) {
                    $('#' + k).val(v);
                });
                
                init_select_input_handler();
            }
        });
        
        $('#form_infos_malade').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#div_ajouter_modifier_2').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#sbt_info_mal').val('MODIFIER');
         $('#sbt_info_mal').css('color', 'rgba(255,0,0,0.7)');
        $('#a_modifier').addClass('liens_actif');
        
    }
    else if (u.indexOf('modifier') >= 0 && u.indexOf('id') >= 0){
        $('#div_nav_modif').hide();
        $('#form_infos_malade').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#a_modifier').addClass('liens_actif');
    }

    var districts_arr = [];
    $.post("post_get_districts_sanitaire.php", function(data){
    	data = $.parseJSON(data);
    	$.each(data, function(k,v){
    		districts_arr.push(v["code_district"]);
    	})
    });
    
    //console.log(districts_arr);
    
    var username = 'not defined';
    $.post('post_get_username.php', function(data){
    	username = data;
    	//console.log(data);
    });
    
    /* fermer le blockui */
    $('#fermer').click(function() {
        $.unblockUI();
        $('#img_wait_for_data1').show();
        $('#img_wait_for_data2').show();
        $('#table_data_lab_results').hide();
        $('#table_data_sample').hide();
        return false;
    });

    $("#fermer_div_publication").click(function(table){     
        $('#div_publication_content').hide();
        $('#img_div_publication').show();
        var p_igm = $("#pub_igm").text();
        var p_sn = $("#pub_sn").text();
        var p_arn = $("#pub_arn").text();
        if(p_igm === 'PUBLIER' && p_sn === 'PUBLIER' && p_arn === 'PUBLIER'){
            $('#href_'+$('#pub_no_ipd').text()).css('background','rgba(230,0,0,0.6)');
        } else if(p_igm === 'DEPUBLIER' && p_sn === 'DEPUBLIER' && p_arn === 'DEPUBLIER'){
            $('#href_'+$('#pub_no_ipd').text()).css('background','green');
        } else {
            $('#href_'+$('#pub_no_ipd').text()).css('background','orange');
        }
        $.unblockUI();
        return false;
    });
    
    /*     controle sur le numero IPD     */
    $('#no_ipd, #age_annee, #age_mois').keyup(function() {
        var val = $(this).val();

        if ($.trim(val) !== '' && $.isNumeric(val) === false) {
            $(this).css('background', 'rgba(255,0,0,0.5)');
        } else {
            $(this).css('background', 'white');
        }
    });

    $('#age_annees').keyup(function() {
        var val = $(this).val();
        if ($.trim(val) !== '' && $.isNumeric(val) === false){
            $(this).css('background', 'rgba(255,0,0,0.5)');
        } else  {
            $(this).css('background', 'white');
        }
    });

    /*  controle sur la date de naissance   */
    $('#date_nais').keyup(function() {
        var val = $.trim($(this).val());
        if (val === '') {
            $(this).css('background', 'white');
            return;
        }
        var isDate = /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/;
        if (isDate.test(val) && date_ok(val)) {
            $(this).css('background', 'white');
            //deduire_age_en_annees_mois();
        } else {
            $(this).css('background', 'rgba(255,0,0,0.5)');
        }
    });

    $('input, select').focus(function() {
        var id = this.id;
        $('#label_' + id).css('color', 'red');
    });

    $('input, select').focusout(function() {
        if((this.id).indexOf('filter') >= 0 && $("#" + this.id).val() !== ''  ){
            return;
        }
        var id = this.id;
        $('#label_' + id).css('color', 'black');
    });

    /*   enregister les modifications   */
    $('#sbt_info_mal').click(function() {
        var telphone = $.trim($('#telphone').val());
        var no_ipd = $.trim($('#no_ipd').val());
        var zone_sante = $.trim($('#zone_sante').val());
        var no_epid = $.trim($('#no_epid').val());
        var age_annees = $.trim($('#age_annees').val());
        var base_nat_reg = ($('#base_nat_reg').val());
        var date_prelevement_tmp = $.trim($('#date_prelevement').val());
        var date_prelevement = date_prelevement_tmp == '' ? '' : date_format($.trim($('#date_prelevement').val()));
        var date_deb_mal =  date_format($.trim($('#date_deb_mal').val()));
        
        //console.log(no_ipd);
        
        if (no_epid === '' ||  no_ipd === '' ) {
            alertify.alert("Veuillez remplir le(s) champ(s) obligatoire(s)!!!");
            return false;
        }
       
//        if (telphone === ''  ) {
//            alertify.alert("ERREUR : Veuillez remplir le t\351l\351phone!!!");
//            return false;
//        }
        
        if (zone_sante === ''  ) {
            alertify.alert("ERREUR : Veuillez remplir le DISTRICT SANITAIRE!!!");
            return false;
        }
        
        if(date_prelevement != "" & date_deb_mal!= "" &  date_prelevement < date_deb_mal){
        	alertify.alert("INCOHERENCE : Date de debut de maladie superieure a la date de prelevement!!!");
            return false;
        }
        
        
        if (telphone !== '' && $.isNumeric(telphone) == false) {
            alertify.alert("ERREUR :  veuillez corriger le numero de telephone!!!");
            return false;
        }
        
        if ((age_annees !== '' && $.isNumeric(age_annees) == false) ) {
            alertify.alert("ERREUR :  veuillez corriger l'age !");
            return false;
        }
        
        if(age_annees > 100){
        	alertify.alert("ERREUR :  veuillez corriger l'age !");
            return false;
        }
        // controle numero EPID
        /*
        var no_epid_arr = no_epid.split("/");
        var regx = /^[A-Za-z]+$/;
        if(no_epid_arr.length == 5 & no_epid_arr[0] == "epi"){
        	if(!($.isNumeric(no_epid_arr[1]) & no_epid_arr[1] >16 & no_epid_arr[1] < 99  
        			& (no_epid_arr[2]).length == 2 
        			& regx.test(no_epid_arr[2])
        			& $.isNumeric(no_epid_arr[3])
        			& $.isNumeric(no_epid_arr[4]))){
        		alertify.alert("ERREUR :  numero d'identifiant invalide!!!");
                return false;
        	}
        } 
        */
        // les differentes strutures de sante
        /*
        else if ($.isNumeric(no_epid.substr(1, 4)) == false 
        		|| $.isNumeric(no_epid.substr(6, 7)) == false 
        		|| no_epid.length != 8 
        		|| 		(no_epid.charAt(0).toLowerCase() !== "k" 
        				&& no_epid.charAt(0).toLowerCase() !== "b" 
        				&& no_epid.charAt(0).toLowerCase() !== "s" 
        				&& no_epid.charAt(0).toLowerCase() !== "c"
        				&& no_epid.charAt(0).toLowerCase() !== "h"
        				&& no_epid.charAt(0).toLowerCase() !== "n" 
        				&& no_epid.charAt(0).toLowerCase() !== "m")
        		|| (no_epid.charAt(5) !== "/")) {
            alertify.alert("ERREUR :  numero d'identifiant invalide!!!");
            return false;
        }
        */
        var temperature = $.trim($('#temperature').val());
        var age_annees = $.trim($('#age_annees').val());
        var isDate = /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/;
        
        if ((temperature !== '' && $.isNumeric(temperature) === false) || $.isNumeric(no_ipd) === false) {
            alertify.alert("Veuillez corriger le(s) erreur(s) de saisie!!!");
            return false;
        }
       
        $( "#fievre" ).prop( "disabled", false );
        // Submit du formulaire ...
        /*
        $.post('post_can_i_modify.php', {'no_ipd': no_ipd}, function(data) {
            if (data === "pas de resultats" || data.split("|")[4] === "" ) {
            	$('#form_infos_malade').submit();
            } else {
                 //$('#res_loader').hide();
                 //$('#sbt_resultats').show();
                 alertify.alert("<center><b style='color:red'>IMPOSSIBLE</b> d'editer cette d'editer cette fiche.<br/>"
                         + "Cause : Un ou l'ensemble des r\351sultats labo est deja valid\351s</center> ");
                 return false;
             }
         }); 
        */
        $('#form_infos_malade').submit();
    });
    
     /*     controle sur le numero IPD     */
    $('#temperature').keyup(function() {
        var val = $(this).val();
        if ($.trim(val) !== '' && $.isNumeric(val) === false) {
            $(this).css('background', 'rgba(255,0,0,0.5)');
        } else {
            $(this).css('background', 'white');
        }
    });
    
    // $('#temperature').focusout(function() {
    // 	var val = $.trim($(this).val());
    // 	if(val != ""){
    // 		if(parseFloat(val) >= 38){
    //     		$('#fievre').val('1');
    //     	} else {
    //     		$('#fievre').val('2');
    //     	}
    // 	}
    // });
    
    /* Ajouter un commentaire */
    $('#bt_ajouter_commentaire').click(function(){
        $('#div_com').hide();
        $('#img_commentaire_loader').show();
       
        var ipd = $('#no_ipd_com').val();
        var commentaire = $('#manager_commentaire').val();
       
        /* poster le commentaire */
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
    
    function init_select_input_handler() {
        var someForm = $('#form_infos_malade');
        $.each(someForm[0].elements, function(index, elem) {
            //select_input_handler(elem.id);
        });
    }
    
    var nb_records = parseInt($('#lab_nb_enregistrement').text());
    var encours = nb_records;
    $('#bt_moins, #bt_plus').click(function() {   
        var sens;
        if ((encours > 1 && this.id ==='bt_moins') || (encours < nb_records && this.id ==='bt_plus')) {
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
                    $.each(d, function(k, v){
                        $('#' + k).val(v);
                    });
                    //init_select_input_handler();
                    $.unblockUI();
                }
            });
        }
    });
    
    setInterval(function() {
        deduire_age_en_annees_mois();
    }, 1000);
    
    $( "#nbjmalade2dernsem" ).prop( "disabled", true );
    $( "#nbjnontravailecole" ).prop( "disabled", true );
    $( "#lieuvoyage" ).prop( "disabled", true );
    $( "#anneevaccination" ).prop( "disabled", true );
    $( "#mois_grossesse" ).prop( "disabled", true );
    $( "#espece_plasmodiale" ).prop( "disabled", true );
    
    $("#malade2dernsem").change(function(){
    	if($("#malade2dernsem").val()=== '1'){
    		$( "#nbjmalade2dernsem" ).prop( "disabled", false );
    	}
    	else{
    		$( "#nbjmalade2dernsem" ).prop( "disabled", true );
    		$( "#nbjmalade2dernsem" ).val( "");
    	}
    	
    });
    $("#nontravailecole").change(function(){
    	if($("#nontravailecole").val()=== '1'){
    		$( "#nbjnontravailecole" ).prop( "disabled", false );
    	}
    	else{
    		$( "#nbjnontravailecole" ).prop( "disabled", true );
    		$( "#nbjnontravailecole" ).val( "");
    	}
    	
    });
    $("#voyage2semprecedentesmaladie").change(function(){
    	if($("#voyage2semprecedentesmaladie").val()=== '1'){
    		$( "#lieuvoyage" ).prop( "disabled", false );
    	}
    	else{
    		$( "#lieuvoyage" ).prop( "disabled", true );
    		$( "#lieuvoyage" ).val( "");
    	}
    	
    });
    $("#vaccinationfj").change(function(){
    	if($("#vaccinationfj").val()=== '1'){
    		$( "#anneevaccination" ).prop( "disabled", false );
    	}
    	else{
    		$( "#anneevaccination" ).prop( "disabled", true );
    		$( "#anneevaccination" ).val( "");
    	}
    	
    });
    
    $("#enceinte").change(function(){
    	if($("#enceinte").val()=== '1'){
    		$( "#mois_grossesse" ).prop( "disabled", false );
    	}
    	else{
    		$( "#mois_grossesse" ).prop( "disabled", true );
    		$( "#mois_grossesse" ).val( "");
    	}
    	
    });
    
    $("#ge").change(function(){
    	if($("#ge").val()=== '1'){
    		$( "#espece_plasmodiale" ).prop( "disabled", false );
    	}
    	else{
    		$( "#espece_plasmodiale" ).prop( "disabled", true );
    		$( "#espece_plasmodiale" ).val( "");
    	}
    	
    });
    
    $('#age_annees').keyup(function() {
        var val = $(this).val();
        if ($.trim(val) !== '' && $.isNumeric(val) === false){
            $(this).css('background', 'rgba(255,0,0,0.5)');
        } else  {
            $(this).css('background', 'white');
        }
    });
    
    $('#latitude, #longitude').keyup(function(){
    	var val = $(this).val();
    	if(val == "-"){
    		return;
    	}
        if ($.trim(val) !== '' && $.isNumeric(val) === false){
        	$("#"+this.id).val(val.substr(0, val.length-1));
        } 
    });
    
    $('#no_ipd').change(function(){
    	var no_ipd = $.trim($(this).val()); 
    	
    	//if(no_ipd_old != no_ipd){
    		
    		$.post("post_check_if_no_ipd_exists.php", {'no_ipd': no_ipd}, function(data){
        		if(data != "this is a new IPD no"){
        			alertify.alert("<center><h2>AVERTISSEMENT:</h2>Ce numéro existe déjà!<br>Veuillez entrer un nouveau num\351ro<\center>");
        			$('#sbt_info_mal').prop('disabled', true);
        		} else {
        			$('#sbt_info_mal').prop('disabled', false);
        		}
        	});
        	
    	//}
    });
    
    /*
    $('#cas_contact').change(function(){
    	var cas_contact = $.trim($('#cas_contact').val());
    	if(cas_contact == '1'){
    		$('#lien_cas_contact').attr('readonly', false);
    	} else {
    		$('#lien_cas_contact').val('');
    		$('#lien_cas_contact').attr('readonly', true);
    	}
    });
    
    $('#lien_cas_contact').keyup(function(){
    	var val = $(this).val();
        if ($.trim(val) !== '' && $.isNumeric(val) === false){
        	$("#"+this.id).val(val.substr(0, val.length-1));
        } 
    });
    
    $('#lien_cas_contact').focusout(function(){
    	var lien_cas_contact = $.trim($('#lien_cas_contact').val());
    	if(lien_cas_contact != ''){
    		$.post('post_check_no_ipd.php', {'no_ipd':lien_cas_contact}, function(data){
        		var v = $.parseJSON(data);
        		if(v.length==0){
        			$('#lien_cas_contact').val('');
        			$('#lien_cas_contact').focus();
        			alertify.alert("ERREUR : ce num\351ro CAS CONTACT n'existe pas.");
        			
        		}
        	});
    	}
    });
      */
    /*
    $("#zone_sante, #nom_patient, #sexe, #age_annees").focusout(function(){
    	generate_patient_ID();
    });
    */
       
    $('#no_terrain').focusout(function(){
        if($("#no_epid").val() !== "epi/20/SN/1/"){
            return;
        }

    	var no_terrain = $.trim($(this).val()).split('/');
    	
    	if($.inArray(no_terrain[1], districts_arr) == -1){
    		alertify.alert("ERREUR : No-TERRAIN INVALIDE");
    		$(this).val('');
    		$('#lien_cas_contact').val('');
    		return false;
    	}
    	
    	var no_terrain_pattern = $.trim($(this).val());
    	if(!(no_terrain_pattern.match(/SN\/[A-Z]{3}\/2[0-2]\/\d+(-C\d+)*/g) == no_terrain_pattern)){
    		alertify.alert("ERREUR : No-TERRAIN INVALIDE");
    		$(this).val('');
    		$('#lien_cas_contact').val('');
    		return false;
    	 }
		
    	last = no_terrain.pop();
    	last = ''.concat('/', last);
    	last = last.replace('/00', '/');
    	last = last.replace('/0', '/'); 
    	
    	no_terrain_new = 		"".concat(no_terrain[0],  
			    				"/", no_terrain[1],
			    				"/", no_terrain[2],
			    				last);
    	$(this).val(no_terrain_new);
    	
    	no_terrain = $.trim($(this).val()).split('-');
    	no_terrain.pop();
    	no_terrain = no_terrain.join('-');
    	$('#lien_cas_contact').val(no_terrain);
    });
    
     
    $("#no_ipd").focusout(function(){
    	var no_epid  =$.trim($("#no_epid").val());
    	var no_ipd = $.trim($(this).val());
    	prefix = $.trim($('#no_epid').val());
    });
    
    
    $('#region').change(function(){
    	var zone_sante = $('#zone_sante').val();
    	if(zone_sante !== ""){
    		return;
    	}
        $('#zone_sante').children().remove();
        $('#zone_sante').append('<option value=""></option>');
        var region = $(this).val();
        if(region === ""){
        	region = "NA";
        }
        $.post("post_get_disctricts.php", {'region':region}, function(data) {
            var oData = $.parseJSON(data);
            $.each(oData, function(k, v) {
                var oV = $.parseJSON(v);
                $('#zone_sante').append('<option value="'+oV['code_district']+'">' + oV['code_district'] + '</option>');
            });
        });
    });
    
   // fill_ds()
    
    $('#txt_new_no_terrain').keyup(function(){
    	var v = $.trim($(this).val());
    	var ds = v.split('/')[1];
    	if(v == ''){
    		$(this).css('background','white');
    		$('#btn_set_id').prop('disabled', true);
    		return;
    	}
    	
    	if($.inArray(ds, districts_arr) == -1 || !(v.match(/SN\/[A-Z]{3}\/2[0-2]\/\d+(-C\d+)*/g) == v)){
    		$(this).css('background','rgba(255,10,10,.4)');
    		$('#btn_set_id').prop('disabled', true);
    		return;
    	}
    	$(this).css('background','white');
		$('#btn_set_id').prop('disabled', false);
    });
    
    $('#btn_set_id').click(function(){
    	var no_terrain = $.trim($('#txt_new_no_terrain').val());
    	var no_ipd = $.trim($('#lbl_no_ipd').text());
    	$.post('post_set_field_id.php', {'no_ipd':no_ipd, 'no_terrain':no_terrain, 'username':username}, function(data){
    		if(data === '1'){
    			alertify.success('N°EPID ENREGISTRE AVEC SUCCES');
    			$('#a_new_field_id_'+no_ipd).text(no_terrain); 
    		}
    		else{
    			alertify.alert('UNE ERREUR INTERNE EST SURVENUE<br><u>VEUILLEZ RESSAYER PLUTARD MERCI</u>');
    			//location.href = '../logout.php';
    		}
    		$.unblockUI();
    	})
    });
    
    
    $('#date_prelevement').focusout(function(data){
    	console.log('testthfgkezf');
    });
    
    $("#btnRefreshTable").click(function(){
  	  $.post("post_session_status.php", function(data){
  		  if(data === 'expired' ){
  			  $(location).attr('href', '../logout.php');
  		  } else{
  			  $('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
  		  }
  	  }) ;
     });
    
    $("#a_imprimer").click(function(){
    	mdp = $("#slct_mode_payement").val();
    	ordannance =  $("#slct_ordonnance").val();
    	slct_ordonnance = $("#slct_ordonnance").val();
        	
    	if(ordannance === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER L'ORDONNANCE");
    		return;
    	}
    	
    	if(mdp === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER LE MODE DE PAYEMENT");
    		return;
    	}
    	
    	$.post("post_session_status.php", function(data){
    		if(data === 'expired' ){
   			  $(location).attr('href', '../logout.php');
   		  } else{
   			var no_ipd  = $("#lbl_id1").text();
   			var mdp = $("#lbl_mode_payement").text();
   			var client_compte = $("#client_compte").val();
   	    	$.post("post_assign_to_operator.php",{'no_ipd':no_ipd, 'mdp':mdp, 'slct_ordonnance':slct_ordonnance, 'client_compte': client_compte} , function(data){
   	    		$('#div_billing').printElement({
  	 	               overrideElementCSS:[
  	 	           		'../css/etiquettes.css',
  	 	           		{ href:'../css/etiquettes.css',media:'print'}]
  	 	       	});
   	    	});
   		  }
    	});
    });
    
    $("#a_imprimer_client").click(function(){
    	mdp = $("#slct_mode_payement").val();
    	ordannance =  $("#slct_ordonnance").val();
    	slct_ordonnance = $("#slct_ordonnance").val();
    	
    	if(ordannance === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER L'ORDONNANCE");
    		return;
    	}
    	
    	if(mdp === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER UN MODE DE PAYEMENT");
    		return;
    	}
    		
    	$.post("post_session_status.php", function(data){
	  		  if(data === 'expired' ){
	  			  $(location).attr('href', '../logout.php');
	  		  } else{
	  			var no_ipd  = $("#lbl_id1").text();
	  			var mdp = $("#lbl_mode_payement").text();
	  			var client_compte = $("#client_compte").val();
	  	    	$.post("post_assign_to_operator.php",{'no_ipd':no_ipd, 'mdp':mdp, 'slct_ordonnance':slct_ordonnance , 'client_compte': client_compte} , function(data){
	  	    		$('#div_facture').printElement({
		  	            overrideElementCSS:[
		  	        		'../css/facture.css',
		  	        		{ href:'../css/facture.css',media:'print'}]
		  	    	});
	  	    	});
	  		  }
	  	});
    });
    
    $("#a_imprimer_client_duplicata").click(function(){
    	mdp = $("#slct_mode_payement").val();
    	ordannance =  $("#slct_ordonnance").val();
    	slct_ordonnance = $("#slct_ordonnance").val();
    	
    	if(ordannance === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER L'ORDONNANCE");
    		return;
    	}
    	
    	if(mdp === ""){
    		alertify.alert("VEUILLEZ SELECTIONNER UN MODE DE PAYEMENT");
    		return;
    	}
    		
    	$.post("post_session_status.php", function(data){
	  		  if(data === 'expired' ){
	  			  $(location).attr('href', '../logout.php');
	  		  } else{
	  			var no_ipd  = $("#lbl_id1").text();
	  			var mdp = $("#lbl_mode_payement").text();
	  			var client_compte = $("#client_compte").val();
	  			duplicata = true;
	  	    	$.post("post_assign_to_operator.php",{'no_ipd':no_ipd, 'mdp':mdp, 'slct_ordonnance':slct_ordonnance, 'duplicata': duplicata , 'client_compte': client_compte} , function(data){
	  	    		$('#div_facture').printElement({
		  	            overrideElementCSS:[
		  	        		'../css/facture.css',
		  	        		{ href:'../css/facture.css',media:'print'}]
		  	    	});
	  	    	});
	  		  }
	  	});
    });
    
    $("#slct_mode_payement").change(function(){
    	$("#lbl_mode_payement").text($("#slct_mode_payement").val());
    });
    
    $("#slct_ordonnance").change(function(){
    	$("#lbl_ordonnance").text($("#slct_ordonnance option:selected").text());
    	ordonnance = $("#slct_ordonnance option:selected").text();
    	if(ordonnance.indexOf('SERO') != -1 && ordonnance.indexOf('PCR') != -1){
    		$("#lbl_prix1").text("45.000 (FCFA)");
    		$("#lbl_prix2").text("45.000 (FCFA)");
    		$("#lbl_prix3").text("45.000 (FCFA)");
    	}
    	else if(ordonnance.indexOf('SERO') != -1){
    		$("#lbl_prix1").text("20.000 (FCFA)");
    		$("#lbl_prix2").text("20.000 (FCFA)");
    		$("#lbl_prix3").text("20.000 (FCFA)");
    	}
    	else if(ordonnance.indexOf('PCR') != -1){
    		$("#lbl_prix1").text("25.000 (FCFA)");
    		$("#lbl_prix2").text("25.000 (FCFA)");
    		$("#lbl_prix3").text("25.000 (FCFA)");
    	}
    	else{
    		$("#lbl_prix1").text("");
    		$("#lbl_prix2").text("");
    		$("#lbl_prix3").text("");
    	}
   });
    
   $("#btnInitialiser").click(function(){
	   for(i=0; i<30; i++){
		   v = $("#col" + i + "_filter").val();
		   if(v){
			   $("#col" + i + "_filter").val('');
			   $("#col" + i + "_filter").keyup();
		   }
	   }
   });

   $("#text_to_speech").click(function(){
	   var msg    = new SpeechSynthesisUtterance();
	   var voices = window.speechSynthesis.getVoices();
	   msg.volume = 1; 
	   msg.rate   = .7; 
	   msg.pitch  = 2; 
	   msg.text   = "Bientôt Disponible";
	   msg.lang   = 'fr';
	   speechSynthesis.speak(msg);
   });
   
   $(".search").keyup(function(){
		var id = this.id;
		$.ajax({
		type: "POST",
		url:  "post_search_by_name.php",
		data : { 'keyword' : $(this).val(), 'id' : id },
		beforeSend: function(){
			$(this).css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
		},
		success: function(data){
			$("#" + id + "_sb").show();
			$("#" + id + "_sb").html(data);
			$(this).css("background","#FFF");
		}
		});
	});
   
   	$("#dbresultsMin").attr('checked', true);
	$('input[type=radio][name=dbinvestigation]').change(function() {
	    $.post("post_set_database.php", {"table":this.value}, function(data){
	    	$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	    });
	});
});     

