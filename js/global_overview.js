$(document).ready(function() {
	
	var  onGoingChart = "div_courbe_epi";
	$("#investigation").change(function (){
		
		var investigation = $.trim($("#investigation").val().split("x")[0]);
		
		var diagnostique  = $.trim($("#investigation").val().split("x")[1]);
		
		if(diagnostique.indexOf("coro")>0){
			$("#div_sum").show("slow");
			$("#slct_agregation").change();
		} 
		
		else{
			$("#div_sum").hide();
		}
		
		$.post('post_set_outbreak.php',{'diagnostique':diagnostique, 'investigation':investigation}, function(data) {
			
			switch (onGoingChart) { 
    		case 'div_courbe_epi': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$("#refresh_map").click();
    			//$('#iframeByDay').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_labo_mobil.php');
    			break;
    		case 'div_courbe_epi_hebdo': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$("#refresh_map_week").click();
    			//$('#iframeByWeek').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_week.php');
    			break;
    		case 'div_courbe_epi_mois': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$("#refresh_map_month").click();
    			//$('#iframeByMonth').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_month.php');
    			break;		
    		case 'div_reparition_classe_age': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#iframeByClage').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_clage.php');
    			break;
    		case 'div_repartition_sexe_bar': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#iframeBySex').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_sex.php');
    			break;
    		case 'div_repartition_par_SS': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#iframeByDistrict').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_district.php');
    			break;
    		case 'div_repartition_sexe_pie': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#iframeBySexPie').attr('src', '../libs/Highcharts-4.1.8/examples/pie-drilldown/index_by_sexe.php');
    			break;
    		case 'div_repartition_par_signes': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#iframeBySyndrom').attr('src', '../libs/Highcharts-4.1.8/examples/bar-basic/index_cliniques.php');
    			break;
    		case 'div_map': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#all_map').attr('src', 'leaflet.php');
    			break;
    		case 'div_map2': 
    			$("#"+onGoingChart).fadeIn("slow");
    			$('#all_map2').attr('src', 'leaflet_entomologie.php');
    			break;
    		
    		default:
    			console.log('Nobody Wins!');
			}
        }); 
	});
	
	$("#a_div_courbe_epi, #a_div_courbe_epi_hebdo, " +
			" #a_div_courbe_epi_mois, #a_div_reparition_classe_age," +
			" #a_div_repartition_sexe_bar, #a_div_repartition_sexe_pie, " +
			" #a_div_repartition_par_SS, #a_div_repartition_par_signes, #a_div_map").click(function(){
		
				IDs = ["div_courbe_epi","div_courbe_epi_hebdo",
		    	       "div_courbe_epi_mois","div_reparition_classe_age","div_repartition_sexe_bar",
		    	       "div_repartition_sexe_pie","div_repartition_par_SS",
		    	       "div_repartition_par_signes","div_map"];
				
				$.each(IDs, function(k,v){
		    		$("#"+v).hide();
		    		$("#a_"+v).attr('class', 'liens');
		    	});
				
				$(this).attr('class', 'liens_actif');
				
				var div = (this.id).split("a_")[1];
				
				switch (div) { 
	    		case 'div_courbe_epi': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map").click();
	    			//$('#iframeByDay').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_labo_mobil.php');
	    			onGoingChart = "div_courbe_epi";
	    			break;
	    		case 'div_courbe_epi_hebdo': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map_week").click();
	    			//$('#iframeByWeek').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_week.php');
	    			onGoingChart = "div_courbe_epi_hebdo";
	    			break;
	    		case 'div_courbe_epi_mois': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map_month").click();
	    			//$('#iframeByMonth').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_month.php');
	    			onGoingChart = "div_courbe_epi_mois";
	    			break;		
	    		case 'div_reparition_classe_age': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeByClage').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_clage.php');
	    			onGoingChart = "div_reparition_classe_age";
	    			break;
	    		case 'div_repartition_sexe_bar': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySex').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_sex.php');
	    			onGoingChart = "div_repartition_sexe_bar";
	    			break;
	    		case 'div_repartition_par_SS': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeByDistrict').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_district.php');
	    			onGoingChart = "div_repartition_par_SS";
	    			break;
	    		case 'div_repartition_sexe_pie': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySexPie').attr('src', '../libs/Highcharts-4.1.8/examples/pie-drilldown/index_by_sexe.php');
	    			onGoingChart = "div_repartition_sexe_pie";
	    			break;
	    		case 'div_repartition_par_signes': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySyndrom').attr('src', '../libs/Highcharts-4.1.8/examples/bar-basic/index_cliniques.php');
	    			onGoingChart = "div_repartition_par_signes";
	    			break;
	    		case 'div_map': 
	    			$("#"+div).fadeIn("slow");
	    			$('#all_map').attr('src', 'leaflet.php');
	    			onGoingChart = "div_map";
	    			break;
	    		case 'div_map2': 
	    			$("#"+div).fadeIn("slow");
	    			$('#all_map2').attr('src', 'leaflet_entomologie.php');
	    			onGoingChart = "div_map2";
	    			break;
	    		default:
	    			console.log('Nobody Wins!');
	    	}
	});
	
	/*
	$("#slct_viz").change(function(){
	    	IDs = ["div_courbe_epi","div_courbe_epi_hebdo",
	    	       "div_courbe_epi_mois","div_reparition_classe_age","div_repartition_sexe_bar",
	    	       "div_repartition_sexe_pie","div_repartition_par_SS",
	    	       "div_repartition_par_signes","div_map"];
	    	
	    	$.each(IDs, function(k,v){
	    		$("#"+v).hide();
	    	});
	    	
	    	var div = $("#"+this.id).val();
	    	
	    	switch (div) { 
	    		case 'div_courbe_epi': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map").click();
	    			//$('#iframeByDay').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_labo_mobil.php');
	    			break;
	    		case 'div_courbe_epi_hebdo': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map_week").click();
	    			//$('#iframeByWeek').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_week.php');
	    			break;
	    		case 'div_courbe_epi_mois': 
	    			$("#"+div).fadeIn("slow");
	    			$("#refresh_map_month").click();
	    			//$('#iframeByMonth').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_month.php');
	    			break;		
	    		case 'div_reparition_classe_age': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeByClage').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_clage.php');
	    			break;
	    		case 'div_repartition_sexe_bar': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySex').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_sex.php');
	    			break;
	    		case 'div_repartition_par_SS': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeByDistrict').attr('src', '../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_district.php');
	    			break;
	    		case 'div_repartition_sexe_pie': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySexPie').attr('src', '../libs/Highcharts-4.1.8/examples/pie-drilldown/index_by_sexe.php');
	    			break;
	    		case 'div_repartition_par_signes': 
	    			$("#"+div).fadeIn("slow");
	    			$('#iframeBySyndrom').attr('src', '../libs/Highcharts-4.1.8/examples/bar-basic/index_cliniques.php');
	    			break;
	    		case 'div_map': 
	    			$("#"+div).fadeIn("slow");
	    			$('#all_map').attr('src', 'leaflet.php');
	    			break;
	    		default:
	    			console.log('Nobody Wins!');
	    	}
	});    
	*/
	
	$('select').change(function(){
		var id = this.id;
		if(id.indexOf("date_switch") >= 0){
			var suffix = id.indexOf("date_switch_") >= 0 ? ("_" + id.split("_")[2]) : "";
			$("#refresh_map" + suffix).click();
		}
	}); 
	
	$("#btn_prev_viz, #btn_next_viz").click(function(){
		var slct_viz_opts = [];
		$("#slct_viz option").each(function(){
			slct_viz_opts.push($(this).val());
		});
		
		var current_val = $("#slct_viz").val();
		
		if(this.id == "btn_prev_viz"){
			var current_val_index_move = slct_viz_opts.indexOf(current_val) - 1;
		} else {
			var current_val_index_move = slct_viz_opts.indexOf(current_val) + 1;
		}
		
		if(current_val_index_move >= 0 && current_val_index_move < slct_viz_opts.length){
			$("#slct_viz").val(slct_viz_opts[current_val_index_move]);
			$("#slct_viz").change();
		}
	});
	
});