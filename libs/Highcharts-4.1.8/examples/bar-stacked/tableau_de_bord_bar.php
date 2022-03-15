<script>
    $(document).ready(function(){
        $('#refresh_map').click(function(){
            var dateDeb = $('#dateDeb').val();
            var dateFin = $('#dateFin').val();
            var date_switch = $('#date_switch').val();
            
            //alert(date_switch);
            var source='../libs/Highcharts-4.1.8/examples/bar-stacked/index_labo_mobil.php?datedeb='+dateDeb
                +'&datefin='+dateFin
                +'&date_switch='+date_switch;
			
            $('#iframeByDay').attr('src', source);
        });
    });
</script>
<div id="tableau_de_bord" style="width:98%" >
    <div class="div_tableau_de_bord" >
        <table>
            <tr>
            	
            	<td>
            		<select id="date_switch" name="date_switch" class="select3" style="width: 260px; border:none; font-weight:normal">
            			<option value="date_prelevement">Date de prelevement</option>
            			<option value="date_disponibilte_arn" selected>Date de rendu PCR</option>
            			<!--  option value="date_disponibilte_igm">Date de rendu IgM</option-->
            			<!--  option value="date_deb_mal" >Date de d&eacute;but des sympt&ocirc;mes</option-->
            		</select> 
            	</td>
                <td> &nbsp;&nbsp;&nbsp;&nbsp;<label>Debut : </label> </td>
                <td>
                    <input id="dateDeb" name="dateDeb" class="inputs2" readonly="readonly" />
	                <script type = "text/javascript" >
	                    new JsDatePick({
	                        useMode: 2,
	                        target: "dateDeb",
	                        dateFormat: "%d-%M-%Y"
	                    });
	                </script>
	                <a href="javascript:void(0);" 
                   class="class_button_clear" onclick="$('#dateDeb').val('');">
                    <img src="../images/clear.png" class="class_clear_img" />
                </a>
                </td>
                
                <td> &nbsp;&nbsp;&nbsp;&nbsp;<label>Fin : </label> </td>
                <td>
                    <input id="dateFin" name="dateFin" class="inputs2" readonly="readonly" />
	                <script type = "text/javascript" >
	                    new JsDatePick({
	                        useMode: 2,
	                        target: "dateFin",
	                        dateFormat: "%d-%M-%Y"
	                    });
	                </script>
	                <a href="javascript:void(0);" 
                   class="class_button_clear" onclick="$('#dateFin').val('');">
                    <img src="../images/clear.png" class="class_clear_img" />
                </a>
                </td>
                
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="refresh_map"
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