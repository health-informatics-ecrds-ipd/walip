var iStock = 1;
function addTr(){
    $.post('post/post_get_fournisseurs.php', function(data){
    	data = $.parseJSON(data);
    	iStock = iStock + 1;
    	select = '<select id="nomFournisseur_'+iStock+'" class="form-control input-sm">' + '<option value=""></option>';
    	$.each(data['data'], function(k, v){
    		select = select + '<option value="'+ v['nom'] +'">' + v['nom'] + '</option>';
    	});
    	select = select + '</select>';
    	
    	var newtr = document.createElement('tbody');
        newtr.innerHTML = ('<tbody><tr id="detailsLot"><td>' + select + '</td><td><input type="text" class="form-control input-sm" placeholder="nombre de doses" id="quantite_'+iStock+'" onkeypress="validate(event)" /></td><td><select  class="cls_input_vacc" id="numeroLot_'+iStock+'"></select></td><td><input type="date" id="daterecept_'+iStock+'"  /></td><td><a href="javascript:void(0);" class="cls_delete remCF">Supprimer</a></td></tr></tbody>');
        document.getElementById("lot").appendChild(newtr);
    });
}

function rDate(id){
	addDate = '<script type = "text/javascript" >g_calendarObject = new JsDatePick({ useMode: 2, target: "'+id+'", dateFormat: "%Y-%m-%d", autoclose: true }); g_calendarObject.addOnSelectedDelegate(function(){ $("#'+id+'").keyup(); }); </script><a href="javascript:void(0);" onclick="$("#'+id+'").val("");$("#'+id+'").keyup();"> <img src="../images/clear.png" class="class_clear_img_1" /></a>';
	console.log(addDate);
	return addDate;
}

function rendezvous_individuel(id, nom, prenom)
{
	$('#date_rdv').val("");
	$('#heure_rdv').val("");
	$('#min_rdv').val("");
		
	$.post("post/post_get_rendez_vous.php", {"id":id}, function(data)
	{
		data  = $.parseJSON(data);
		data  = data['data'][0]['date_rdv']; 
		if(data != null){
			date  = data.split(' ')[0];
			heure = data.split(' ')[1].split(':')[0];
			mins  = data.split(' ')[1].split(':')[1];
			
			$('#date_rdv').val(date);
	   		$('#heure_rdv').val(heure);
	   		$('#min_rdv').val(mins);
		}
		
		$('#lbl_id').text(id.toUpperCase() + " | ");
		$('#lbl_nom_patient').text(nom.toUpperCase() + ' ' + prenom.toUpperCase());
		
		$.blockUI({
	        message: $('#div_rendez_individuel'),
	        onOverlayClick: $.unblockUI,
	        css: {
	            top: '10%',
	            bottom: '10%',
	            left: '33%',
	            width: '34%', 
	            height: '440px', 
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

// function for take a new dose
function new_dose(id, nom, prenom)
{
	$('#dose_choice').val("");
		// info first dose
	$('#numero_lot_vaccinD').val("");
	$('#lieu_de_vaccinationD').val("");
	$('#date_de_vaccinationD').val("");
		// info second dose
	$('#numero_lot_vaccinD_2').val("");
	$('#lieu_de_vaccinationD_2').val("");
	$('#date_de_vaccinationD_2').val("");
		// info third dose
	$('#numero_lot_vaccinD_3').val("");
	$('#lieu_de_vaccinationD_3').val("");
	$('#date_de_vaccinationD_3').val("");
		
	$.post("post/post_take_new_dose.php", {"id":id}, function(data)
	{
		data  = $.parseJSON(data);
		// data  = data['data'][0]['date_rdv'];
		// console.log(data);
		
		$('#lbl_id_new_dose').text(id.toUpperCase() + " | ");
		$('#lbl_nom_patient_new_dose').text(nom.toUpperCase() + ' ' + prenom.toUpperCase());
		
		$.blockUI({
	        message: $('#div_new_dose'),
	        onOverlayClick: $.unblockUI,
	        css: {
	            top: '10%',
	            bottom: '10%',
	            left: '33%',
	            width: '34%', 
	            height: '700px', 
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


function show_patient_info(id){
	$.post("post_get_patient_info.php", {"id":id}, function(data){
		data = $.parseJSON(data);
		$("#tbl_patient_info").empty();
		correspondance = ["NOM", "PRENOM", "AGE", "DATE NAISSANCE", "SEXE", "IDENTIFICATION", "REGION", "DEPARTEMENT", "COMMUNE", "QUARTIER", "MALADIE CHRONIQUE", "AUTRES MALADIES CHRON.", "DATE VACCINATION (1)", "DATE VACCINATION (2)", "DATE VACCINATION (3)", "DATE INSCRIPTION", "E-MAIL", "LOT (1)", "LOT (2)", "LOT (2)", "PROFESSION", "TELEPHONE", "OBSERVATION"];
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

function addProvider_CloseHandler(){
	$("#pays_origine").val("");
	$("#nom").val("");
	$("#nb_dose").val("");
	$("#intervalle_dose").val("");
	$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	$.unblockUI();
}

function addDoses_CloseHandler(){
	var table = document.getElementById("lot");
	while (table.rows.length > 2) {
	  table.deleteRow(1);
	}
	$("#nomFournisseur_1").val("");
	$("#quantite_1").val("");
	$("#numeroLot_1").empty();
	$("#daterecept_1").val("");
	$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
	$.unblockUI();
}

var currentLabId = "none";
function addProvider(divID, providerId){
	if (typeof providerId !== 'undefined') {
		currentLabId = providerId; 
		loadLabForm(providerId);
	} 
	
	else {
		$('#sbt_modifer_fournisseur').hide();
		$('#sbt_nouveau_fournisseur').show();
	}
	
	$.blockUI({
	 	onOverlayClick: addProvider_CloseHandler,
	 	css: {
            'border-color'         : 'rgba(10, 10, 10, .4)',
            'padding'              : '50px',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
            'border-radius'        : '30px',
            'border-width'         : '5px',
	        'top'                  : '10%',
	        'width'                : '40%',
	        'left'                 : '30%',
	        'text-align'           : 'center'
        },
        message: $("#" + divID)
    });
}

var currentdoseID = "none";
function addDoses(divID, doseID){
	if (typeof doseID !== 'undefined') {
		currentdoseID = doseID; 
		loadLabDoseForm(doseID);
	} 
	
	else {
		$('#sbt_modifer_fournisseur').hide();
		$('#sbt_nouveau_fournisseur').show();
	}
	
	$.blockUI({
	 	onOverlayClick: addDoses_CloseHandler,
	 	css: {
            'border-color'         : 'rgba(10, 10, 10, .4)',
            'padding'              : '50px',
            'font-family'          : '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans","Tahoma,sans-serif"',
            'border-radius'        : '30px',
            'border-width'         : '5px',
	        'top'                  : '10%',
	        'width'                : '70%',
	        'left'                 : '15%',
	        'text-align'           : 'center'
        },
        message: $("#" + divID)
    });
}

function loadLabForm(providerId){
	$.post("post/post_get_fournisseur_by_id.php", {'id':providerId}, function(data){
		data = $.parseJSON(data);
		$.each(data['data'][0], function(k, v){
			$('#' + k).val(v);
		});
		$('#sbt_nouveau_fournisseur').hide();
		$('#sbt_modifer_fournisseur').show();
	}); 
} 

$(document).ready(function(){

	/* hiding information nombre de dose  */
	$('#tab_first_dose').hide();
	$('#tab_second_dose').hide();
	$('#tab_third_dose').hide();
	$("#dose_choice").change(function(){
		if (this.value == "1") {
			$('#tab_first_dose').show();	
			$('#tab_second_dose').hide();	
			$('#tab_third_dose').hide();	
		} else if(this.value == "2") {
			$('#tab_first_dose').hide();
			$('#tab_second_dose').show();	
			$('#tab_third_dose').hide();	
		} else if(this.value == "3"){
			$('#tab_first_dose').hide();
			$('#tab_second_dose').hide();	
			$('#tab_third_dose').show();
		}
	});

	//update doses when filled 
	$('#btn_ajout_new_dose').click(function(){
		dose_choice = $('#dose_choice').val();
		// info first dose
		numero_lot_vaccin = $('#numero_lot_vaccinD').val();
		lieu_de_vaccination = $('#lieu_de_vaccinationD').val();
		date_de_vaccination = $('#date_de_vaccinationD').val();
		// info second dose
		numero_lot_vaccin_2 = $('#numero_lot_vaccinD_2').val();
		lieu_de_vaccination_2 = $('#lieu_de_vaccinationD_2').val();
		date_de_vaccination_2 = $('#date_de_vaccinationD_2').val();
		// info third dose
		numero_lot_vaccin_3 = $('#numero_lot_vaccinD_3').val();
		lieu_de_vaccination_3 = $('#lieu_de_vaccinationD_3').val();
		date_de_vaccination_3 = $('#date_de_vaccinationD_3').val();

		id = $('#lbl_id_new_dose').text().replace(" | ", "");
		
		if(dose_choice === "" )
	 	{
			alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b>VEUIILEZ RENSEIGNER LES CHAMPS OBLIGATOIRES</b>");
			return;
	 	}
		
		$.post("post/post_set_new_dose.php", {"id":id, "dose_choice":dose_choice, "numero_lot_vaccin":numero_lot_vaccin, "lieu_de_vaccination":lieu_de_vaccination, "date_de_vaccination":date_de_vaccination, "numero_lot_vaccin_2":numero_lot_vaccin_2, "lieu_de_vaccination_2":lieu_de_vaccination_2, "date_de_vaccination_2":date_de_vaccination_2, "numero_lot_vaccin_3":numero_lot_vaccin_3, "lieu_de_vaccination_3":lieu_de_vaccination_3, "date_de_vaccination_3":date_de_vaccination_3 }, function(data)
		{
			if(data === "ok")
		{
				alertify.success("Programm\351 avec succ\350s");
				$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
		 }
			else
		 {
				alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red'>UNE ERREUR EST SURVENUE<br>VEUILLEZ REESSAYER PLUS TARD.</b>");
		 }
			$.unblockUI();
		});
	});


   	$('#sbt_nouveau_fournisseur, #sbt_modifer_fournisseur').click(function(){
		data = {
			"pays_origine"       : $.trim($("#pays_origine").val()),
			"nom"                : $.trim($("#nom").val()),
			"nb_dose"            : $.trim($("#nb_dose").val()),
			"intervalle_dose"    : $.trim($("#intervalle_dose").val()),
			"id"                 : currentLabId
		};
		
		/* Looking for empty fields */
		if(Object.values(data).indexOf("") != -1){
			alertify.alert("<b class='clsErrorAlert'>VEUILLEZ REMPLIR LES CHAMPS OBLIGATOIRES</b>");
			return false;
		}
		
		post_path  = "post/post_nouveau_fournisseur.php";
		msgSuccess = "FOURNISSEUR AJOUTE AVEC SUCCES";
		if(this.id === 'sbt_modifer_fournisseur'){
			post_path = "post/post_update_fournisseur.php";
			msgSuccess = "MISE A JOUR AVEC SUCCES";
		}
		
		$.post(post_path, data, function(data){ 
			data = $.parseJSON(data);
			if(data['status']){ 
				addProvider_CloseHandler();
				alertify.alert(msgSuccess); 
			} 
			else{
				alertify.alert("<b class='clsErrorAlert'>SOMETHING WENT WRONG, PLEASE TRY AGAIN LATER</b>");
			}
		});
	});
   	
   	$("#lot").on('click','.remCF',function(){
        $(this).parent().parent().parent().remove();
   	});
   	
   	$('#btn_submit_reception').click(function(){
	   	 var dataset1 = [];
	   	 var dataset2 = [];
	     var table = document.getElementById( 'lot' ); 
	     var input = table.getElementsByTagName( 'input' ); 
	     for ( var z = 0; z < input.length; z++ ) { 
	    	 dataset1.push( input[z].value );
	     }
	     var select = table.getElementsByTagName( 'select' ); 
	     for ( var z = 0; z < select.length; z++ ) { 
	    	 dataset2.push( select[z].value ); 
	     }
	     
	     //console.log(dataset1);
	     //console.log(dataset2);
	     
	     for(i=0; i < dataset1.length; i++){
	    	 if(dataset1[i] === "" || dataset2[i] === "" ){
	    		 alertify.alert("<b class='clsErrorAlert'>VEUILLEZ REMPLIR LES CHAMPS OBLIGATOIRES</b>");
	    		 return;
	    	 }
	     }
	     
	     $.post('post/post_enregistrer_lot.php', {"dataset1[]":dataset1, "dataset2[]":dataset2}, function(data){
	    	addDoses_CloseHandler();
	    	if(data === "ok"){
	    		alertify.alert("DOSES RECEPTIONNEES AVEC SUCCES");
	    	}
	    	else{
	    		alertify.alert("<b class='clsErrorAlert'>SOMETHING WENT WRONG, PLEASE TRY AGAIN LATER</b>");
	    	}
	     });
   	});
   	
   	$('select').live('change', function(){
   		id = (this.id).split('_')[0];
   		lot_id = 'numeroLot_' + (this.id).split('_')[1];
   		fournisseur = $(this).val();
   		
   		if(id.indexOf('nomFournisseur')>=0){
   			$.post('post/post_get_numeros_lot.php', {"fournisseur":fournisseur}, function(data){
   				data = $.parseJSON(data);
   				$('#'+ lot_id).empty();
   				$('#'+ lot_id).append('<option value=""></option>');
   				$.each(data['data'], function(k, v){	
   					$('#'+ lot_id).append('<option value="'+ v['id'] +'">' + v['lot_id'] + '</option>');
   				});
   			});
   		}
   	});
   	
   	$('#btn_programmer').click(function(){
   		date        = $('#date_rdv').val();
   		heure_rdv   = $('#heure_rdv').val();
   		min_rdv     = $('#min_rdv').val();
   		//numero_dose = $('#numero_dose').val();
   		id          = $('#lbl_id').text().replace(" | ", "");
   		nom_patient = $('#lbl_nom_patient').text().toUpperCase();
   		
   		if(date === "" || heure_rdv === "" || min_rdv === "")
		{
   			alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b>VEUIILEZ RENSEIGNER LES CHAMPS OBLIGATOIRES</b>");
   			return;
		}
   		
   		$.post("post/post_set_rendez_vous.php", {"id":id, "date":date, "heure_rdv":heure_rdv, "min_rdv":min_rdv, "nom_patient":nom_patient }, function(data)
   		{
   			if(data === "ok")
			{
   				alertify.success("Programm\351 avec succ\350s");
   				$('#table_fiche_prelevement').DataTable().ajax.reload(null, false);
			}
   			else
			{
   				alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red'>UNE ERREUR EST SURVENUE<br>VEUILLEZ REESSAYER PLUS TARD.</b>");
			}
   			$.unblockUI();
   		});
   	});
   	
	   $('#btn_programmer_2').click(function()
	   {
			date_dose_1        = $('#date_dose_1').val();
			nom_fournisseur_2  = $('#nom_fournisseur_2').val();
			date_dose_2        = $('#date_dose_2').val();
		
			if(date_dose_1 === "" || nom_fournisseur_2 === "" || date_dose_2 === "")
	 		{
				alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b>VEUIILEZ RENSEIGNER LES CHAMPS OBLIGATOIRES</b>");
				return;
	 		}
		
			$.post("post/post_rdv_setup.php", {"date_dose_1":date_dose_1, "nom_fournisseur_2":nom_fournisseur_2, "date_dose_2":date_dose_2}, function(data){
				///console.log(data);
				if(data !== "ko")
				{
						alertify.success("Programm\351 avec succ\350s");
						$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
				}
				else
				{
						alertify.alert("<img src='../images/dakar.PNG' style='width:30px;height:30px;' /><br/><b style='color:red'>UNE ERREUR EST SURVENUE<br>VEUILLEZ REESSAYER PLUS TARD.</b>");
				}
				$.unblockUI();
			});
	});

	$("#btn_programmer_set").click(function(){
		$('#date_dose_1').val("");
		$('#nom_fournisseur_2').val("");
		$('#date_dose_2').val("");

		$.blockUI({
	        message: $('#div_rdv_setup'),
	        onOverlayClick: $.unblockUI,
	        css: {
				'text-align':'left',
	            top: '10%',
	            bottom: '10%',
	            left: '37%',
	            width: '25%', 
	            height: '400px', 
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

	$("#btnRefreshTable").click(function(){
		$.post("post_session_status.php", function(data){
			if(data === 'expired' ){
				$(location).attr('href', '../logout.php');
			} else{
				$('#table_fiche_prelevement').DataTable().ajax.reload(null, false );
			}
		}) ;
	 });
});