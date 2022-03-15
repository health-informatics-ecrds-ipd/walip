function show_patient_info(no_ipd){
	$.post("post_get_patient_info.php", {"no_ipd":no_ipd}, function(data){
		data = $.parseJSON(data);
		$("#tbl_patient_info").empty();
		correspondance = ["N° TUBE  ", "CAS CONTACT  ", "CAS SUSPECT  ", "CONTROLE  " , "NATURE PRELEVEMENT  ", "REPRELEVEMNT  ", "NOM PATIENT  ", "AGE  ", "SEXE  ", "DISTRICT  ", "DATE PRELEVEMENT  ", "DEBUT SYMPTOME  ", "CEPHALEE  ", "FIEVRE  ", "TOUX  ", "AGUEUSIE  ", "ANOSMIE  ", "DIARRHEES  ", "DOULEURS MUSCULAIRES ", "DOULEURS ARTICULAIRES  ", "GORGE IRRITEE  "];
		$.each(data, function(k, v){
			v = v == null ? "" : v;
			if(v === '1'){
				v = 'OUI';
			} 
			else if(v === '2'){
				v = 'NON';
			}
			row = "<tr>" + "<td class='clsTd'>" + correspondance.shift() + "</td><td>" + v + "</td></tr>";
			$("#tbl_patient_info").append(row);
		});
		
		$.blockUI({
	        message: $('#div_patient_info'),
	        onOverlayClick: $.unblockUI,
	        css: {
	            top: '10%',
	            bottom: '10%',
	            left: '33%',
	            width: '34%',      
	            padding: 'auto',
	            'padding-bottom': '10px',
	            '-webkit-border-radius': '15px',
	            'border-radius': '15px',
	            '-moz-border-radius': '15px',
	            cursor: 'default',
	            display: 'block',
	            'text-align' : 'left',
	            'font-size'  : '50px',
	            overflow: 'auto'
	        }
	    });
	});
}

function please_wait(message){
        $.blockUI({
        	onOverlayClick: $.unblockUI,
		 	css: {
            border                 : 'none',
            padding                : '25px',
            backgroundColor        : '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius'   : '10px',
            opacity                : .7,
            color                  : 'white',
            'font-weight'          : 'bold',
            'font-size'            : '20px',
            'text-align'           : 'center',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"'
        },
        message: message
    });
} 

function sendSmsResultsReadiness(id){
	alertify.confirm("VOULEZ-VOUS ENVOYE UNE NOTIFICATION SMS AU CLIENT?", function (e) {
	    if (e) {   
	    	please_wait("VEUILLEZ PATIENTER...");
			$.post("post_sendSMStestReady.php", {'x' : id}, function(data){
				$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
				$.unblockUI();
			});
	    } 
	    else {
	        return true;
	    }
	});
}

function sendMailResultsReadiness(id){    
	$.post("post_sendMAILtestReady.php", {'x' : id}, function(data){
	});	    	    
}

// le patient est joignable au premier tentative (from red to green) ***green***
function prise_encharge_client(no_ipd){
	alertify.confirm("VOULEZ-VOUS CONFRIMER CETTE ACTION?", function (e) {
        if (e) {   
        	$.post("post_set_prise_en_charge.php", {'no_ipd':no_ipd},function(data){
        		$("#btnRefreshTable").click();
  		  	});
        } 
        else {
            return true;
        }
    });
}
//quand le patient est injoignable alors qu'on n'a jamais tenté de le joindre (from red to green) ***red***
function prise_encharge_client_injoignable(no_ipd){
	alertify.confirm("AVEZ-VOUS PU JOINDRE LE PATIENT ?", function (e) {
        if (e) { 
			$.post("post_set_prise_en_charge.php", {'no_ipd':no_ipd},function(data){
        		$("#btnRefreshTable").click();
  		  	});  
        } 
        else {
			$.post("post_set_prise_en_charge_injoignable.php", {'no_ipd':no_ipd},function(data){
        		$("#btnRefreshTable").click();
  		  	});
        }
    });
}

// quand le patient est enfin joignable après une ou plusieurs tentative   ***orange***
function prise_encharge_client_now_joignable(no_ipd){
	alertify.confirm("AVEZ-VOUS PU JOINDRE LE PATIENT ?", function (e) {
        if (e) { 
			console.log("ffd ");
			$.post("post_set_prise_en_charge__now_joignable.php", {'no_ipd':no_ipd},function(data){
        		$("#btnRefreshTable").click();
  		  	});  
        } 
        else {
			return true;
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
            top: '20%',
            bottom: '35%',
            left: '22%',
            right: '22%',
            width: '55%',      
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '15px',
            'border-radius': '15px',
            '-moz-border-radius': '15px',
            cursor: 'default',
            display: 'block',
            overflow: 'auto'
        }
    });
}


function generate_2019nCoVDistrict(id){
	alertify.alert("<b style='color:red'>FONCTIONNALITE MOMENTANEMENT INDISPONIBLE</b><BR>VOUS RECEVREZ UN E-MAIL D'INFORMATION POUR PLUS D'INFORMATION");
}

function generate_2019nCoV(id){
	
	//window.open('ResultatCOVID-19.php?x='+id, 'name');
	
		
	alertify.set({ labels: {
	    ok     : "FRANÇAIS",
	    cancel : "ENGLISH"
	}});
	
	
	alertify.confirm("CHOISISSEZ LA LANGUE", function (e) {
        if (e) {   
        	window.open('ResultatCOVID-19.php?x='+id, 'name');
        } 
        else {
        	window.open('ResultatCOVID-19_eng.php?x='+id, 'name');
        }
    });
	
	alertify.set({ labels: {
	    ok     : "Oui",
	    cancel : "Non"
	}});
}


function validation(no_ipd, id, result, sero){
	current_result = result;
	
	if(current_result == "" && sero == ""){   
		alertify.alert("<b style='color:red'>ERREUR : AUCUN RESULTAT A VALIDER</b>");
		return; 
	}
	   
	$.post("post_session_status.php", function(data){
		  if(data === 'expired' ){
			  $(location).attr('href', '../logout.php');
		  } 
		  else{
			  $.post("post_get_validation_info.php", {'id':id}, function(data){
					
					data = $.parseJSON(data);
					
					$("#lbl_no_ipd_for_validation").text(no_ipd);
					$("#identification").val(id);
					
					if(data['date_envoi_arn'] == null){
						$("#btn_validation_biomol").text("VALIDER BIOMOL" );
						$("#btn_validation_biomol").css("background", "rgba(196,47,43,1)");
					}
					else{
						$("#btn_validation_biomol").text("INVALIDER BIOMOL");
						$("#btn_validation_biomol").css("background", "rgba(102,148,53,1)");
					}
					
					if(data['date_envoi_igm'] == null){
						$("#btn_validation_serologie").text("VALIDER SEROLOGIE");
						$("#btn_validation_serologie").css("background", "rgba(196,47,43,1)");
					}
					else{
						$("#btn_validation_serologie").text("INVALIDER SEROLOGIE");
						$("#btn_validation_serologie").css("background", "rgba(102,148,53,1)");
					}
				}); 
				
				$.blockUI({
					  onOverlayClick: $.unblockUI,
				        message: $('#div_validation'),
				        css: {
				            top: '30%',
				            height: '370px', 
				            width: '30%',
				            margin: 'auto',
				            padding: 'auto',
				            padding: 'auto',
				            'border-radius': '15px',
				            cursor: 'default',
				            display: 'block',
				            overflow: 'auto'
				        }
				});
		  }
	}) ;
	
}


function validation_save(no_ipd, id){
	var action = $("#a_validation"+id).text();
	
	if(action === "VALIDER"){
		
		$.post('post_validate_result.php', {'no_ipd': no_ipd}, function(data){
			if(data === 'ok'){
				$("#a_validation"+id).text('INVALIDER');
				$( "#a_validation"+id ).removeClass( "cls_validation_valider" );
				$( "#a_validation"+id ).addClass( "cls_validation_invalider" );
				alertify.success("REUSSITE: RESULTAT VALIDE AVEC SUCCESSE");
			}
			
			else if(data == 'session_expire'){
				location.href = '../logout.php';
			}
			
			else{
				alertify.error("UNE ERREUR INTERNE EST SURVENUE");
			}
		});
	}
	else{
		$.post('post_unvalidate_result.php', {'no_ipd': no_ipd}, function(data){
			if(data === 'ok'){
				$("#a_validation"+id).text('VALIDER');
				$( "#a_validation"+id ).removeClass( "cls_validation_invalider" );
				$( "#a_validation"+id ).addClass( "cls_validation_valider" );
				alertify.success("REUSSITE: RESULTAT INVALIDE AVEC SUCCESSE");
			}
			
			else if(data == 'session_expire'){
				location.href = '../logout.php';
			}
		
			else{
				alertify.error("UNE ERREUR INTERNE EST SURVENUE");
			}
		});
	}
	
}



function init_form(objet){
     $.each(objet, function(key) {
          $("#" + key + '_pos').css('background', 'white');
          $("#" + key + '_neg').css('background', 'white');
          $("#" + key).val('');
          $("#" + key).text('');
     });
}

function show_sample_information(id_plvt) {
    $.post("post_get_sample_data.php", {'id': id_plvt}, function(data) {
        var objet = $.parseJSON(data);
        
        /***********************************
         *  Iinitialisation du formulaire  *
         ***********************************/
        init_form(objet);

        /********************************** 
         * parcourir les données chargées * 
         **********************************/ 
        $.each(objet, function(key, value) {
            if (value !== null) {
                if ((objet.date_envoi_sn !== null && key.indexOf('sn_') >= 0) 
                        || (objet.date_envoi_igm !== null && key.indexOf('igm_') >= 0) 
                        || (objet.date_envoi_arn !== null && key.indexOf('arn_') >= 0)
                        || (objet.date_envoi_igm !== null && key.indexOf('cdc_') >= 0)) {
                    
                    if (key.indexOf('val_1') >= 0) {
                        $("#" + key).val(value);                   
                    } else {
                        $("#" + key + '_pos').css('background', 'white');
                        $("#" + key + '_neg').css('background', 'white');
                        if (value === '1') {
                            $("#" + key + '_pos').css('background', 'black');
                        } else {
                            $("#" + key + '_neg').css('background', 'black');
                        }
                    }
                }else if(key === 'etat_prelevement'){
                    if(value === '1'){
                        $("#" + key).text('Adequat');
                    } else if(value === '2'){
                        $("#" + key).text('Inadequat');
                    }else{
                        $("#" + key).text('NA');
                    }
                } else if(key === 'type_prelevement'){
                    if(value === '1'){
                         $("#" + key).text('serum');
                    }else if(value === '2'){
                        $("#" + key).text('autre');
                    }else{
                        $("#" + key).text('NA');
                    }
                }
                else {
                    $("#" + key).val(value);
                    $("#" + key).text(value);
                }
                
            }
        });
        $('#img_before_load').hide();
        $('#d1').show();
    });

    $.blockUI({
        message: $('#div_resultats'),
        css: {
            top: '1%',
            bottom: '2%',
            left: '10%',
            right: '10%',
            width: '80%',
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '5px',
            'border-radius': '5px',
            '-moz-border-radius': '5px',           
            cursor: 'default',
            overflow: 'scroll'
        }
    });
}

$(document).ready(function() {
	current_result = null;
    /*... Activation des liens selectionnés ...*/
    var u = location.href;
    if (u.indexOf('menu') >= 0){
        if (u.indexOf('consulter') >= 0){
            $('#a_consulter').addClass('liens_actif');
        }
        if (u.indexOf('toolbox') >= 0){
            $('#a_toolbox').addClass('liens_actif');
        }
    } 
    else{
        $('#a_consulter').addClass('liens_actif');
    }
    
    /* fermer le blockui */
    $('#fermer').click(function() {
        $.unblockUI();
        $('#d1').hide();
        $('#img_before_load').show();
       
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
      
       $.post('post_enregistrer_commentaire.php', {'no_ipd':ipd, 'commentaire': commentaire}, function(data){
           console.log(data);
    	   $('#img_commentaire_loader').hide();
           
           $('#div_com').show();

           if(data === 'ok'){
               alertify.success("Commentaires bien sauvegardes!");
               $('#fermer_commentaires').click();
           } else {
                alertify.error("Une erreur est survenue, veuillez reessayer plutard!!!");
           }
       });
   });
   
   $('#slctComment').change(function(){
	   $('#manager_commentaire').val($(this).val());
	   $(this).val('');
	   $('#manager_commentaire').focus();
   });
   /*
   $('#col7_filter').change(function(){
	   //$(this).keyup();
	   console.log($(this).val());
   })
   */
   
   $('#aExport').click(function(){ 
	  $.blockUI({
		  onOverlayClick: $.unblockUI,
	        message: $('#div_export'),
	        
	        css: {
	            top: '30%',
	            height: '500px',
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
   });
   
   $('#btnExport, #btnExportLab').click(function(){
	  var filter = $('#filtre_').val();
	  var date_ = $('#date_').val();  
	  var ipd_max = $.trim($('#ipd_max').val());
	  var ipd_min = $.trim($('#ipd_min').val());
	  var lab = $.trim($('#lab').val());
	  var date_prelevement = $.trim($('#date_prelevement').val());
	  var date_plvt = $.trim($('#date_plvt').val());
	  var id = this.id;
	  
	  if(id === "btnExport"){
		  location.href='post_extraction.php?f=' + filter + '&d=' + date_ + '&ipd_max=' + ipd_max + '&ipd_min=' + ipd_min + '&lab=' + lab + '&date_plvt=' + date_plvt;
	  } else{
		  location.href='post_extraction_lab.php?f=' + filter + '&d=' + date_ + '&ipd_max=' + ipd_max + '&ipd_min=' + ipd_min + '&lab=' + lab + '&date_prelevement=' + date_prelevement;
	  }
	  
   });
   
   $('#ipd_min,#ipd_max').keyup(function(){
   	var val = $(this).val();
       if ($.trim(val) !== '' && $.isNumeric(val) === false){
       	$("#"+this.id).val(val.substr(0, val.length-1));
       } 
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
   
   $("#a_validate_all_yesterday").click(function(){
	   alertify.confirm("Voulez-vous vraiment VALIDER TOUT LES RESULTATS JUSQU'A LA DATE d'HIER SOIR?", function (e) {
	        if (e) {   
	        	
	        	$.blockUI({
	    	        message: $('#wait_for_validation')
	    	   
	    	    });
	    	    
	        	$.post("post_session_status.php", function(data){
	  			  if(data === 'expired' ){
	  				  $(location).attr('href', '../logout.php');
	  			  } else{
	  				  $.post("post_validate_all_to_yesterday.php", function(data){
	  					  if(data === 'ok' ){
	  						  alertify.success("REUSSITE: R\351sultats sont VALIDES!");
	  						  $("#btnRefreshTable").click();
	  					  }
	  					  else{
	  						  alertify.alert("RESULTATS NON VALIDES:<br>Une erreur interne est survenue.<br>Veuillez reessayer plutard!");
	  					  }
	  					$.unblockUI();
	  				  });
	  			  }
	  			
	  		  }) ;
	        } else {
	            return true;
	        }
	    });
		  
	   });
   
   $("#a_validate_all").click(function(){
	   alertify.confirm("Voulez-vous vraiment VALIDER TOUT LES RESULTATS?", function (e) {
	        if (e) {  
	        	  
	        	$.blockUI({
	    	        message: $('#wait_for_validation')
	    	   
	    	    });
	    	    
	        	$.post("post_session_status.php", function(data){
	  			  if(data === 'expired' ){
	  				  $(location).attr('href', '../logout.php');
	  			  } else{
	  				  $.post("post_validate_all.php", function(data){
	  					  if(data === 'ok' ){
	  						  alertify.success("REUSSITE: R\351sultats sont VALIDES!");
	  						  $("#btnRefreshTable").click();
	  					  }
	  					  else{
	  						  alertify.alert("RESULTATS NON VALIDES:<br>Une erreur interne est survenue.<br>Veuillez reessayer plutard!");
	  					  }
	  					$.unblockUI();
	  				  });
	  			  }
	  		  }) ;
	        } else {
	            return true;
	        }
	    });
		  
	   });
	   
   
   $("#btnResetSearch").click(function(){
	   $("#col3_filter").val("");
	   $("#col7_filter").val("");
	   $("#col5_filter").val("");
	   $("#col8_filter").val("");
	   $("#col1_filter").val("");
	   $("#col12_filter").val("");
	   $("#col13_filter").val("");
	   $("#col11_filter").val("");
	   
	   //$('#col13_filter').keyup();
	   //$('#table_fiche_prelevement').data.reload();
   });
   
   $('#btnSMS').click(function(){
	   var list = $('#sltMCD').val();
	   
	   if(list == null){ 
		   alertify.alert("Veullez selectionner des destinataires");
		   return;
	   }
	   
	   $.blockUI({
	        message: $('#send_SMS_wait')
	   
	    });
		
		$.post("post_sendSMS.php", {'list[]':list}, function(data){
			  $.unblockUI();
			  //console.log(data);
			  /*
			  if(data.indexOf('envoye') > 0){
				  alertify.success('Message(s) Envoy\351(s) avec SUCCES');
			  } 
			  else{
				  alertify.alert("Une ERREUR interne s'est produite lors de l'envoi des SMS<br>Veuillez r\351essayer plutard.");
			  }
			  */
		 });
   });
   
   $("#btn_validation_biomol").click(function(){
	  action = $(this).text();
	  
	  no_ipd = $("#lbl_no_ipd_for_validation").text();
	  id     = $("#identification").val();
		  
	  if(action === "VALIDER BIOMOL"){   
		  $.post("post_validate_result.php", {"no_ipd":no_ipd}, function(data){
			  if(data === 'ok'){
				  $("#btn_validation_biomol").css("background", "rgba(102,148,53,1)");
				  $("#btn_validation_biomol").text("INVALIDER BIOMOL");
				  sendSmsResultsReadiness(id); // NEW ...
				  // we will uncomment this when its time to send mail
				//   sendMailResultsReadiness(id); 
				  if(current_result !== 'POSITIF'){
					  //sendSmsResultsReadiness(id);
					  alertify.success("RESULTAT VALIDE AVEC SUCCESS");					  
				  }  else {
					  $.post('post_sendSMS_pec.php', {'no_ipd': no_ipd}, function(data){});
				  }
				  // update DHIS2 
				  validate = "yes";
				  $.post("post_send_to_dhis2.php", {"no_ipd":no_ipd, "validate":validate}, function(data){  });
			  }
			  else{
				  $("#btn_validation_biomol").css("background", "rgba(196,47,43,1)");
				  alertify.error("UN PROBLEME INTERNE EST SURVENU, VEUILLEZ REESSAYER PLUS TARD");
			  }
			  
			  $("#btnRefreshTable").click();
		  });
	  }
	   
	  else{
		  $.post("post_unvalidate_result.php", {"no_ipd":no_ipd}, function(data){
			  if(data === 'ok'){
				  $("#btn_validation_biomol").css("background", "rgba(196,47,43,1)");
				  $("#btn_validation_biomol").text("VALIDER BIOMOL");
				  alertify.success("RESULTAT INVALIDE AVEC SUCCESS");
			  }
			  else{
				  $("#btn_validation_biomol").css("background", "rgba(196,47,43,1)");
				  alertify.error("UN PROBLEME INTERNE EST SURVENU, VEUILLEZ REESSAYER PLUS TARD");
			  }
			  $("#btnRefreshTable").click();
		  });
	  }
	 
   });
   
   $("#btn_validation_serologie").click(function(){
		  action = $(this).text();
		  
		  no_ipd = $("#lbl_no_ipd_for_validation").text();
		  id     =             $("#identification").val();
		  
		  if(action === "VALIDER SEROLOGIE"){
			  $.post("post_validate_result_igm.php", {"no_ipd":no_ipd}, function(data){
				  if(data === 'ok'){
					  $("#btn_validation_serologie").css("background", "rgba(102,148,53,1)");
					  $("#btn_validation_serologie").text("INVALIDER SEROLOGIE");
					  if(current_result !== 'POSITIF'){
						  alertify.success("RESULTAT VALIDE AVEC SUCCESS");
						  //sendSmsResultsReadiness(id);
					  }
				  }
				  else{
					  $("#btn_validation_serologie").css("background", "rgba(196,47,43,1)");
					  alertify.error("UN PROBLEME INTERNE EST SURVENU, VEUILLEZ REESSAYER PLUS TARD");
				  }
				  $("#btnRefreshTable").click();
			  });
		  }
		  
		  else{
			  $.post("post_unvalidate_result_igm.php", {"no_ipd":no_ipd}, function(data){
				  if(data === 'ok'){
					  $("#btn_validation_serologie").css("background", "rgba(196,47,43,1)");
					  $("#btn_validation_serologie").text("VALIDER SEROLOGIE");
					  alertify.success("RESULTAT INVALIDE AVEC SUCCESS");
				  }
				  else{
					  $("#btn_validation_serologie").css("background", "rgba(196,47,43,1)");
					  alertify.error("UN PROBLEME INTERNE EST SURVENU, VEUILLEZ REESSAYER PLUS TARD");
				  }
				  
				  $("#btnRefreshTable").click();
			  });
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
  
	$("#dbresultsMin").attr('checked', true);
	$('input[type=radio][name=dbresults]').change(function() {
	    $.post("post_set_database.php", {"table":this.value}, function(data){
	    	$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	    });
	});
	
	
	$("#dbresultsDSMin").attr('checked', true);
	$('input[type=radio][name=dbresultsDS]').change(function() {
	    $.post("post_set_database.php", {"table":this.value}, function(data){
	    	$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	    });
	});
}); 
 













