function generateSum(agregation, _date){
	$.post("post_summary.php", {"agregation": agregation, "_date" : _date}, function(data){
		$('#tbl_summary').find('tbody').empty();
		data = $.parseJSON(data);
		var tr = "";
		$.each(data, function(key,value){
			tr = "<tr>";
			$.each(value, function(k,v){
				var style = '';
				if(k.indexOf('POSITIFS') != -1){
					style = 'style="background:rgba(255,0,0,.3);font-weight:bold;font-size:20px;"';
					if(k !== 'POSITIFS'){
						style = 'style="background:rgba(255,0,0,.04);font-weight:bold;color:rgba(0,0,0,.4);"';
					}
				}
				if(k.indexOf('NEGATIFS') != -1){
					style = 'style="background:rgba(0,0,255,.3);font-weight:bold;font-size:20px;"';
					if(k !== 'NEGATIFS'){
						style = 'style="background:rgba(0,0,255,.04);font-weight:bold;color:rgba(0,0,0,.4);"';
					}
				}
				
				if(k.indexOf('AGREGATION') != -1){
					style = 'style="font-weight:bold;font-size:20px;color:rgba(0,0,0,.5);"';
				}
				
				val = v == null ? '' : v;
				tr = tr + "<td "+style+">" + val + "</td>" 
			});
			tr = tr + "</tr>";
			$('#tbl_summary').find('tbody').append(tr);
		});	
	});
}

$(document).ready(function() {
	var investigation = $("#investigation").val();
	
	if(investigation.indexOf("coro")>0){
		generateSum("semaine", "date_disponibilte_arn");
	}
	
	
	$("#slct_agregation, #slct_date").change(function(){
		var agregation = $("#slct_agregation").val();
		var _date = $("#slct_date").val();
		generateSum(agregation, _date);
	});	
});