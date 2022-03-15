function draw_panel_participant(id, nrows, ncols, pathogens, results){ 
	$('#' + id).empty(); 
	/// Headers
	row = '<tr>';
	for(var i=1; i<= (ncols+2); i++){
		if(i == 1){
			row = row + '<td class="clslabel">Path.</td>';
		}
		else if(i == 2){
			row = row + '<td class="clslabel">Res.</td>';
		}
		else if(i == (ncols+3)){
			row = row + '<td class="clslabel">N Item(s)</td>';
		}
		else{
			idheader = 'header_' + i;
			row = row + '<td>' + '<input type="text" class="clscellsheader"  placeholder="T.['+(i-2)+']" id="'+ idheader +'" readonly  />' + '</td>';
		}
	}
	row = row + '</tr>'; 

	$('#'+id).append(row);
	
	for( var nrow = 1; nrow <= nrows; nrow++ ){
		tr_id = nrow + '_tr';
		row = '<tr id="' + tr_id + '">';
		
		for(var ncol = 1; ncol <= (ncols+2); ncol++){
			input_id = nrow + '_' + ncol + '_cell';
			
			if(ncol == 1){
				str_options = '';
				$.each(pathogens, function(k,v){
					str_options = str_options + '<option value="' + v + '">' + v + '</option>';
				});
				row = row + '<td>' + 'Tube ['+ nrow +']  <select class="clscellsheader" id="'+ input_id +'" >' + str_options + '</select>' + '</td>';
			} 
			
			else if(ncol == 2){
				str_options = '<option value=""></option>';
				$.each(results, function(k,v){
					str_options = str_options + '<option value="' + v + '">' + v + '</option>';
				});
				row = row + '<td>' + '<select class="clscellsheader" id="'+ input_id +'" >' + str_options + '</select>' + '</td>';
			} 
			
			else{
				row = row + '<td>' + '<input type="text" class="clscells" onkeypress="validate(event)" id="'+ input_id +'"   />' + '</td>';
			}
		}
		
		itemID = "nitems_"+ nrow;		
		row = row + '</tr>';
		$('#'+id).append(row);
	}
}

function load_panel_form_participants_inhouse(id, modifcationUnabled, labname, survey_name){	 
	/// waiting block UI
	wait(); 

	$("#sbt_resultats_participant").val('Edit Panel (InHouse)');
	$('#method').text("IN-HOUSE METHOD");
	$("#div_tubes_warehouse_2").hide();
	
	$.post("post/post_get_panel_by_id_participant_inhouse.php", {'id':id, "labname":labname, "survey_name":survey_name}, function(data){
		$("#div_create_form" ).removeClass( "div_table_style_class" ).addClass( "div_table_style_class_modify" );
		$('#sbt_resultats').hide();
		$('#sbt_resultats_update').show();
		$('#div_ajouter_modifier_2').show();
		
		data = $.parseJSON(data);
		
		if(data['status'] == "ok"){
			panel_id = data['data'][0]['panel_id'];
			reception_date = data['data'][0]['reception_date'];
			panel_id_prev = panel_id;
			nsamples = data['data'][0]['nsamples'];
			ntargets = data['data'][0]['ntargets'];
			ntubeperpanel = data['data'][0]['ntubeperpanel'];
			
			$('#ncols').val(ntargets);
			///$('#nrows').val(nsamples);
			$('#nrows').val(6);
			$('#panel_id').val(panel_id);
			$('#panel_id').val(panel_id);
			$('#survey_name').val(survey_name);
			$('#reception_date').val(reception_date);
			$('#ntubeperpanel').val(ntubeperpanel);
			$('#draw_participant').click();
			$('#bt_create_panel').click();
			
			$.each(data['data'], function(k,v){
				if(v['pathogen'] == "header" && v['result'] == "header"){
					headers = (v['results']).split(";");
					
					for(var i = 0; i < headers.length; i++){
						j = i + 3;
						$('#header_' + j).val(headers[i]);
					}
				}
				
				else{
					$('#' + k + '_1_cell').val(v['pathogen']);
					
					if(data['firstedit'] !== "yes"){
						$('#' + k + '_2_cell').val(v['result']);
					} 
					
					$('#nitems_' + k).val(v['current_stock']);
					vals = (v['results']).split(";");
					
					for(var i = 0; i < vals.length; i++){
						j = i + 3;
						if(data['firstedit'] !== "yes"){
							$('#' + k + '_'+ j + '_cell').val(vals[i]);
						} 
					}
				}
			});
		}
		
		if(!modifcationUnabled){
			$('#div_create_form *').prop('disabled', true);
			$('#sbt_resultats_update').hide();
		}
		else{
			$('#div_create_form *').prop('disabled', false);
			$('#sbt_resultats_update').show();
		}
		
		$.unblockUI();
	});
	$.unblockUI();
}


function load_panel_form_participants(id, modifcationUnabled, labname, survey_name){	 
	wait(); /// waiting block UI
	$('#method').text("REFERENCE METHOD");
	$("#div_tubes_warehouse_2").hide();
	$.post("post/post_get_panel_by_id_participant.php", {'id':id, "labname":labname, "survey_name":survey_name}, function(data){
		$("#div_create_form" ).removeClass( "div_table_style_class" ).addClass( "div_table_style_class_modify" );
		$('#sbt_resultats').hide();
		$('#sbt_resultats_update').show();
		$('#div_ajouter_modifier_2').show();
		
		data = $.parseJSON(data);
		
		if(data['status'] == "ok"){
			panel_id = data['data'][0]['panel_id'];
			reception_date = data['data'][0]['reception_date'];
			panel_id_prev = panel_id;
			nsamples = data['data'][0]['nsamples'];
			ntargets = data['data'][0]['ntargets'];
			ntubeperpanel = data['data'][0]['ntubeperpanel'];
			
			
			$('#ncols').val(ntargets);      
			///$('#nrows').val(ntubeperpanel);
			$('#nrows').val(6);
			$('#panel_id').val(panel_id);
			$('#panel_id').val(panel_id);
			$('#survey_name').val(survey_name); 
			$('#reception_date').val(reception_date);
			$('#ntubeperpanel').val(ntubeperpanel);
			$('#draw_participant').click();
			$('#bt_create_panel').click();
			
			$.each(data['data'], function(k,v){
				if(v['pathogen'] == "header" && v['result'] == "header"){
					headers = (v['results']).split(";");
					
					for(var i = 0; i < headers.length; i++){
						j = i + 3;
						$('#header_' + j).val(headers[i]);
					}
				}
				
				else
				{
					$('#' + k + '_1_cell').val(v['pathogen']);
					
					if(data['firstedit'] !== "yes")
					{
						$('#' + k + '_2_cell').val(v['result']);
					} 
					
					$('#nitems_' + k).val(v['current_stock']);
					vals = (v['results']).split(";");
					
					for(var i = 0; i < vals.length; i++)
					{
						j = i + 3;
						if(data['firstedit'] !== "yes"){
							$('#' + k + '_'+ j + '_cell').val(vals[i]);
						} 
					}
				}
			});
		}
		
		if(!modifcationUnabled){
			$('#div_create_form *').prop('disabled', true);
			$('#sbt_resultats_update').hide();
		}
		else{
			$('#div_create_form *').prop('disabled', false);
			$('#sbt_resultats_update').show();
		}
		
		$.unblockUI();
	});
	$.unblockUI();
}

$(document).ready(function() {
	/// Handler : submit panel creation form 
	$('#sbt_resultats_participant, #sbt_resultats_update_participant').click(function(){
		panel_id = $.trim($('#panel_id').val());
		
		if(!panel_id.trim()){
			error('FILL MANDATORY FIELDS!');
			return;
		}
		
		if(this.id === "sbt_resultats" && duplicated_panel_key === "yes"){
			error('DUPLICATED PANEL KEY.');
			return;
		}
		
		panel_id       = $.trim($('#panel_id').val());
		nsamples       = parseInt($('#nrows').val());
		ntargets       = parseInt($('#ncols').val());
		reception_date = $('#reception_date').val();
		ntubeperpanel  = $('#ntubeperpanel').val();
		results        = [];
		nItems         = [];
		survey_name    = $('#survey_name').val();
		
		/// Reference Panel Headers
		str = panel_id + ";" + String(nsamples) + ";" + String(ntargets)  + ";" + 'header' + ";" + 'header' + ";" ;
		for(var ncol = 3; ncol <= (ntargets+2); ncol++){
			cellid = 'header_' + ncol ;
			str = str + $('#'+ cellid).val() + ';';
		}
		results.push(str);
		nItems.push("0");
		
		/// Reference Panel results 
		for(var nrow=1; nrow<=nsamples; nrow++){
			str = panel_id + ";" + String(nsamples) + ";" + String(ntargets) + ";";
			for(var ncol = 1; ncol <= (ntargets+2); ncol++){
				cellid = nrow + '_' + ncol + '_cell';
				str = str + $('#'+ cellid).val() + ';';
			}
			results.push(str);
			nitem = $('#nitems_' + nrow).val();
			if(nitem === ""){
				nItems.push("0");
			}
			else{
				nItems.push(nitem);
			}
		}
		
		$('#sbt_resultats').hide();
		$('#res_loader').show();
		
		post = "post/post_update_panel_participant.php";
		if($("#sbt_resultats_participant").val() === "Edit Panel (InHouse)"){
			post = "post/post_update_panel_participant_inhouse.php";
		}
		
		$.post(post, {
							'data[]' : results, 'nItems[]' : nItems, 
							'ntubeperpanel' : ntubeperpanel,'panel_id' : panel_id_prev, 
							'reception_date' : reception_date, 'nsamples' : nsamples, 
							'current_panel_id' : panel_id, 'survey_name':survey_name
																				}, function(data){
			$('#res_loader').hide();
			$('#sbt_resultats').show();
			data = $.parseJSON(data);
			if(data['status'] == "ok"){
				$('#tbl_panel').empty(); 
				$('#panel_id').val("");
				$('#nrows').val("");
				$('#ncols').val("");
				$('#reception_date').val("");
				$('#bt_create_panel').click(); 
				alertify.alert("SUCCESSFULLY SAVED RESULTS!!!");
			}
			else{
				error("SOMTETHING WENT WRONG, TRY AGAIN LATER.");
			}   
			
			$("#div_tubes_warehouse_2").show("slow");
			$("#div_ajouter_modifier_2").hide();
		});
	});
	
	$('#draw_participant').click(function(){
		ncols = parseInt($('#ncols').val());
		nrows = parseInt($('#nrows').val());
		id = 'tbl_panel';
		pathogens = ['SARS-CoV-2'];
		results = ['Pos', 'Neg','Lim. D.', 'Und.'];
		draw_panel_participant(id, nrows, ncols, pathogens, results);
	});
});

