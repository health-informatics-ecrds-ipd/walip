function select_1(id, element_val){
	var element = '<select id="'+id+'" name="'+id+'[]" class="selectsTOP8 highlightLabel unHighlightLabel" >'
				 +'<option value=""></option>';
	if(element_val.indexOf("..") != -1){
		element_val = element_val.split("..");
		for(var v=parseInt(element_val[0]); v<=parseInt(element_val[1]); v++){
			element = element + '<option value="'+v+'">'+v+'</option>';
		}
	} else {
		element_val = element_val.split(","); 
		$.each(element_val, function(k,v){
			element = element + '<option value="'+v+'">'+v+'</option>';
		});
	}
	element = element + '</select>';
	
	return(element);
}

function input(id, type_element){
	var numbersOnly = type_element == "numeric" ? "number" : "text";
	var ifDate = '';
	var readonly = '';
	var width = '';
	if(type_element=='date'){
		ifDate = '<script type="text/javascript">'
			          	+'new JsDatePick({'
			          	+'useMode: 2,'
			          	+'target: "'+id+'",'
			          	+'dateFormat: "%Y-%m-%d"'
			        +'});'
			        +'</script> '
			        +'<a href="javascript:void(0);" '
						+'class="class_button_clear" '
						+'onclick=\'$("#'+id+'").val(\"\");\'> <img '
						+'src="../images/clear.png" class="class_clear_img" />'
					+'</a>';
		readonly = 'readonly';
		width = 'style="width:25%"'
	}
	return('<input type="'+numbersOnly+'" '+readonly+' id="'+id+'" name="'+id+'[]" class="inputsTOP7 highlightLabel unHighlightLabel" '+width+' />'
			+ ifDate);
}

function input_input(id, type_element, element_val){
	type_element = type_element.split(",");
	element_val = element_val.split(",");
	
	
	var numbersOnly1 = type_element[0] == "numeric" ? "number" : "text";
	var numbersOnly2 = type_element[1] == "numeric" ? "number" : "text";
	
	return('<input type="'+numbersOnly1+'" id="'+id+'" name="'+id+'[]" class="inputsTOP_7 highlightLabel unHighlightLabel" placeholder="'+element_val[0]+'" />'
		 + '&nbsp;&nbsp;&nbsp;'
		 + '<input type="'+numbersOnly2+'" id="'+id+'__" name="'+id+'[]" class="inputsTOP_7 highlightLabel unHighlightLabel"  placeholder="'+element_val[1]+'" />'
		 );
}

function input_input_input(id, type_element, element_val){
	type_element = type_element.split(",");
	element_val = element_val.split(",");
	
	
	var numbersOnly1 = type_element[0] == "numeric" ? "number" : "text";
	var numbersOnly2 = type_element[1] == "numeric" ? "number" : "text";
	var numbersOnly3 = type_element[2] == "numeric" ? "number" : "text";
	
	return('<input type="'+numbersOnly1+'" id="'+id+'" name="'+id+'[]" class="inputsTOP_8 highlightLabel unHighlightLabel" placeholder="'+element_val[0]+'" />'
		 + '&nbsp;&nbsp;&nbsp;'
		 + '<input type="'+numbersOnly2+'" id="'+id+'__" name="'+id+'[]" class="inputsTOP_8 highlightLabel unHighlightLabel"  placeholder="'+element_val[1]+'" />'
		 + '&nbsp;&nbsp;&nbsp;'
		 + '<input type="'+numbersOnly3+'" id="'+id+'___" name="'+id+'[]" class="inputsTOP_8 highlightLabel unHighlightLabel"  placeholder="'+element_val[2]+'" />'
		 );
}



function selectWithValues(id, element_val){
	var element = '<select id="'+id+'" name="'+id+'[]" class="selectsTOP8 highlightLabel unHighlightLabel"  multiple="multiple"  >';	
	element_val = element_val.split(",");
	$.each(element_val, function(k,v){
		element = element + '<option value="'+v+'">'+v+'</option>';
	});
	element = element + '</select>';
	return element;
}

function selectWithValues_aap(id, element_val){
	var element = selectWithValues(id, element_val) 
		+ '<script>$("#'+id+'").multipleSelect({width:"90%"});</script>'
		+ '<br/><input type="text" id="'+id+'__" name="'+id+'[]"   class="inputsTOP_7 highlightLabel unHighlightLabel" placeholder="Autres (preciser)"/>';
	return(element);
}

function fillTable(tableid, start, end, number){
	 var i = start;
	 
	 $.post("posts/post_get_questionnaire.php", {'start':start, 'end':end}, function(data){
		 var data = $.parseJSON(data);
		 $.each(data, function(k,v){
			 var label = number==true? (  v['question']) :  v['question'];
			 if(v['element_type'] == 'select_1'){
				 $('#'+tableid+' tr:last').after(
						 '<tr>'
							+'<td>'
								+'<label for="'+i+'" id="lab_'+i+'" class="myLabel">'+ label +'</label>'
								+'<br/>'
								+ select_1(v['id'], v['element_val'])
							+'</td>'
						+'</tr>'
				);
			 } 
			 
			 else if(v['element_type'] == 'input'){
				 $('#'+tableid+' tr:last').after(
						 '<tr>'
							+'<td>'
								+'<label for="'+i+'" id="lab_'+i+'" class="myLabel">'+ label +'</label>'
								+'<br/>'
								+ input(v['id'], v['type_element'])
							+'</td>'
						+'</tr>'
				);
			 }
			 
			 else if(v['element_type'] == 'select_n'){
				 $('#'+tableid+' tr:last').after(
						 '<tr>'
							+'<td>'
								+'<label for="'+i+'" id="lab_'+i+'" class="myLabel">'+ label +'</label>'
								+'<br/>'
								+ selectWithValues_aap(v['id'], v['element_val'])
							+'</td>'
						+'</tr>'
				);
			 } 
			 
			 else if(v['element_type'] == 'input,input'){
				 var placeholder1 = (v['element_val']).split(",")[0];
				 var placeholder2 = (v['element_val']).split(",")[1];
				 $('#'+tableid+' tr:last').after(
						 '<tr>'
							+'<td>'
								+'<label for="'+i+'" id="lab_'+i+'" class="myLabel">'+i+'.'+v['question']+'</label>'
								+'<br/>'
								+ input_input(v['id'],v['type_element'], v['element_val'])
							+'</td>'
						+'</tr>'
				);
			 }
			 
			 else if(v['element_type'] == 'input,input,input'){
				 var placeholder1 = (v['element_val']).split(",")[0];
				 var placeholder2 = (v['element_val']).split(",")[1];
				 var placeholder3 = (v['element_val']).split(",")[2];
				 $('#'+tableid+' tr:last').after(
						 '<tr>'
							+'<td>'
								+'<label for="'+i+'" id="lab_'+i+'" class="myLabel">'+i+'.'+v['question']+'</label>'
								+'<br/>'
								+ input_input_input(v['id'],v['type_element'], v['element_val'])
							+'</td>'
						+'</tr>'
				);
			 }
			 /* question number */
			 i = i + 1;
		 });
		 
	 });
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
            'border-radius': '10px',
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
    		
    		
    	})
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
            location='download.php';
            return true;
        } else {
            return true;
        }
    });
}

function supprimer_prelevement(id,nbResLab){
	if(nbResLab > 0){
		alertify.error("Vous ne pouver pas supprimer cet enregistrement parce qu'il est lie a des resultats de laboratoire!");
		return;
	}
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
                $('#table_fiche_prelevement').DataTable().ajax.reload();
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

/* Remplir formulaire pour modification */
function modify_sample_general_information(id) {
    blockui();
    $('#sbt_info_mal').val('MODIFIER');
    $('#sbt_info_mal').css('color', 'rgba(255,0,0,0.7)');

    $.post('post_get_select_n_element.php', function(data){
    	var obj = $.parseJSON(data);
    	var select_n_elements = [];
    	var i = 0;
        $.each(obj, function(key, value){
        	select_n_elements[i] = value[0];
        	i = i + 1;
        });
        
        
        $.post('post_charger_fiche_prelevement.php', {'id1': id}, function(data){
            // pre-remplissage des champs ...
            var obj = $.parseJSON(data);
            $.each(obj[0], function(key, value){
                $('#' + key).val(value.split(","));
                if($.inArray(key, select_n_elements)!= -1){
                	$('#'+key).multipleSelect('refresh');
                	$('#'+key+"__").val($(value.split(",")).not($('#'+key).multipleSelect('getSelects')).get());
                	
                }
                
                if(key == 35 || key == 36 || key == 37 || key == 42){
                	$('#'+key).val(value.split(",")[0]);
                	$('#'+key+'__').val(value.split(",")[1]);
                } 
                /*
                else if(key == 39){
                	$('#39').val(value.split(",")[0]);
                	$('#39__').val(value.split(",")[1]);
                }
                */
            });
        });
        $.unblockUI();
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

$(document).ready(function() {
	fillTable("cap_form0", 1, 6, true);
	fillTable("cap_form1", 7, 12, true);
	fillTable("cap_form2", 19, 14, true);
	fillTable("cap_form3", 33, 14, true);
	fillTable("cap_form4", 47, 50, true);
	
	/*****************************************************
	 * IN CASE OF MODIFICATION ***************************
	 *****************************************************/
	var url = location.href;
    if (url.indexOf("&id") >= 0){
        url = ((location.href).split("&")[1]).split("=");
        modify_sample_general_information($.trim(url[1]));
    }
    
	$('.highlightLabel').live( 'focus', function(){
		var id  = (this.id).split('__')[0];
		$('#lab_'+id).css("color", "red");
		$('#lab_'+id).css("font-weight", "bold");
	});
	
	$('.unHighlightLabel').live( 'focusout', function(){
		var id  = (this.id).split('__')[0];
		$('#lab_'+id).css("color", "black");
		$('#lab_'+id).css("font-weight", "normal");
	});
	
	 $('.numbersOnly').live( 'keyup', function(){
	        this.value = this.value.replace(/[^0-9\.]/g,'');
	 });
	 
	$('.fillInput').live( 'focusout', function(){
		var id  = this.id;
		if(id.indexOf("__") != -1){
			var id1 = (this.id).split('__')[0];
			var val = $('#'+id1).val();
			
			if($.isArray(val)){
				val[val.length] = $('#'+id).val();
			} else {
				val = val + ',' + $('#'+id).val();
			}
			
			$('#'+id1).val(val);
		}
	});
	 
	
	/*----------------------------------------------------------------------*/
	
    var id_prelevement;
    var u = location.href;
    //var no_ipd_old = "";
    
    if ((u.indexOf('menu') >= 0) === false){
         $('#a_consulter').addClass('liens_actif');
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
        $('#form_infos_malade').css('box-shadow', '0px 0px 8px rgba(200,0,0,8)');
        $('#a_modifier').addClass('liens_actif');
    }

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
   
    $('#div_forms').on('keyup','input',function(){
        if(this.id !== '42' && this.id !== '42__' 
        	&& this.id !== '35' && this.id !== '35__'
        		&& this.id !== '36' && this.id !== '36__'
        			&& this.id !== '37' && this.id !== '37__'){
        	return false; 
        }
        var val = $(this).val();
    	val = val.replace(",", "");
    	$(this).val(val);
    });
    
    /**  Enregister les modifications   */
    $('#sbt_info_mal').click(function() {
    	 var no_terrain = $("#7").val();
    	 
    	 if(no_terrain == ""){
    		 alertify.alert("ERREUR : Merci de renseigner l'identifiant unique du pays [Section 1: Information du patient]");
    		 return false;
    	 }
    	 
        /* Submit du formulaire */
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
    
    $('#a_modifier').click(function(){
    	$('#a_consulter').click();
    });
   
    
    $('h3').click(function(){
    	var id = this.id;
    	var number = parseInt(id.split('_')[1]);

    	for(var i = 0; i <= 7; i++){
    		
    		if(i != number){
    			$('#cap_form' + i).hide();
    		} 
    		else{
    			if($('#cap_form' + i).is(":visible")){
    				$('#cap_form' + i).hide();
    			}
    			else{
    				$('#cap_form' + i).show('slow');
    			}    			
    		}
    	}
    }); 
   
    $('#btn_email_notification').click(function(){
    	$.blockUI({ message: '<h1>Envoi Notification En Cours. Patienter...</h1>'});
    	$.post('post_send_email_notification.php', function(data){
    		$.unblockUI();
    		if(data === "ok"){
    			alertify.success("ENVOYE !");
    		} else {
    			alertify.error("Une Erreur est survenue.");
    		}
    	});
    });
});