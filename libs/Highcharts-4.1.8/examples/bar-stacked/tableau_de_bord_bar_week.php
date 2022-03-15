<script>
    $(document).ready(function(){
        $('#refresh_map_week').click(function(){
            var dateDeb = $('#dateDeb_week').val();
            var dateFin = $('#dateFin_week').val();
            var date_switch = $('#date_switch_week').val();
            
            //alert(date_switch);
            var source='../libs/Highcharts-4.1.8/examples/bar-stacked/index_by_week.php?datedeb='+dateDeb
                +'&datefin='+dateFin
                +'&date_switch='+date_switch;
			
            $('#iframeByWeek').attr('src', source);
        });
    });
</script>
<div id="tableau_de_bord" style="width:98%" >
    <div class="div_tableau_de_bord" >
        <table>
            <tr>
            	
            	<td>
            		<select id="date_switch_week" name="date_switch_week" class="select3" style="width: 260px; border:none; font-weight:normal">
            			<!-- option value="date_prelevement">Date de prelevement</option-->
            			<option value="date_disponibilte_arn" selected>Date de rendu PCR</option>
            			<!-- option value="date_disponibilte_igm">Date de rendu IgM</option>
            			<option value="date_deb_mal" >Date de d&eacute;but des sympt&ocirc;mes</option-->
            		</select> 
            	</td>
                <td> &nbsp;&nbsp;&nbsp;&nbsp;<label>Debut : </label> </td>
                <td>
                    <input id="dateDeb_week" name="dateDeb_week" class="inputs2" readonly="readonly" />
	                <script type = "text/javascript" >
	                    new JsDatePick({
	                        useMode: 2,
	                        target: "dateDeb_week",
	                        dateFormat: "%d-%M-%Y"
	                    });
	                </script>
	                <a href="javascript:void(0);" 
                   class="class_button_clear" onclick="$('#dateDeb_week').val('');">
                    <img src="../images/clear.png" class="class_clear_img" />
                </a>
                </td>
                
                <td> &nbsp;&nbsp;&nbsp;&nbsp;<label>Fin : </label> </td>
                <td>
                    <input id="dateFin_week" name="dateFin_week" class="inputs2" readonly="readonly" />
	                <script type = "text/javascript" >
	                    new JsDatePick({
	                        useMode: 2,
	                        target: "dateFin_week",
	                        dateFormat: "%d-%M-%Y"
	                    });
	                </script>
	                <a href="javascript:void(0);" 
                   class="class_button_clear" onclick="$('#dateFin_week').val('');">
                    <img src="../images/clear.png" class="class_clear_img" />
                </a>
                </td>
                
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="refresh_map_week"
                    style="background: rgba(0,0,0,0.01); 
                                                    color:  rgba(66,81,105,1); 
                                                    font-weight: bold; 
                                                    height: 40px;
                                                    border-radius: 2px; " 
                                                    onmouseover="$('#refresh_map').css('color','red');" 
                                                    onmouseout="$('#refresh_map').css('color','rgba(66,81,105,1)');">
                        Visualiser
                    </button>
                </td>
            </tr>
        </table>
    </div>
    
</div>