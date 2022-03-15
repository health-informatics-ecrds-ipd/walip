<script>
    $(document).ready(function(){
        $('#refresh_map_polar').click(function(){
            var sexe = $('#sexe_polar').val();          
            var annee = $('#annee_polar').val();
            
            var virus_polar = ($('#virus_polar').val() !== null)? $('#virus_polar').val().join("_") : "";
            var tests_polar = ($('#tests_polar').val() !== null)? $('#tests_polar').val().join("_") : "";
            
            var source='../libs/Highcharts-4.1.8/examples/polar-spider/index.php?sexe='
                    +sexe+'&annee='
                    +annee+'&virus='+virus_polar+'&tests='+tests_polar;
            
            $('#polar').attr('src', source);
        });
    });
</script>
<div id="tableau_de_bord">
    <div style="background: rgba(0,0,0,0.5); 
         color: white; 
         font-weight: bold; 
         border-radius: 10px; 
         height:135px;
         width:880px;
         padding-top: 7px;">
        <table>
            <tr>
                <td> <label>Sexe : </label> </td>
                <td>
                    <select id="sexe_polar" name="sexe_polar">
                        <option  value="">[Tout]</option>
                        <option  value="f">Feminin</option>
                        <option  value="m">Masculin</option>
                    </select>
                </td>
                
                
                <td>&nbsp;&nbsp;&nbsp;&nbsp; <label>Ann&eacute;e : </label> </td>
                <td>
                    <select id="annee_polar" name="annee_polar">
                        <option  value="">[Tout]</option>
                        <?php for($annee = 2009; $annee != 2050; $annee++){ ?>
                        <option  value="<?php echo $annee; ?>"><?php echo $annee; ?></option>
                        <?php } ?>
                    </select>
                </td>
                
                
                
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                </td>
            </tr>
            
            <tr>
                <td><label>Virus : </label> </td>
                <td>
                    <select id="virus_polar" name="virus_polar" multiple="multiple" style="width:300px" >
                        <option  value="yf">YF</option>
                        <option  value="zika">ZIKA</option>
                        <option  value="chik">CHIK</option>
                        <option  value="cchf">CCHF</option>
                        <option  value="den">DEN</option>
                        <option  value="wn">WN</option>
                        <option  value="rvf">RVF</option>
                    </select><br/>
                    <label style="color:red; font-style: italic;font-size: 10px;">"YF", si aucun VIRUS n'est specifi&eacute;</label>
                    <script> $("#virus_polar").multipleSelect();</script>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>tests : </label></td>
                <td>
                    <select id="tests_polar" name="tests_polar" multiple="multiple" style="width:150px" >
                        <option  value="igm">IgM</option>
                        <option  value="sn">SN</option>
                        <option  value="arn">PCR</option>
                    </select><br/>
                    <label style="color:red; font-style: italic; font-size: 10px;">"IgM", si aucun TEST n'est specifi&eacute;</label>
                    <script> $("#tests_polar").multipleSelect();</script>
                </td>
                <td></td>              
            </tr>
            
        </table>
        <br/>
        <button id="refresh_map_polar" style="background: rgba(0,0,0,0.01); 
                                        color: whitesmoke; 
                                        font-weight: bold; 
                                        height: 40px;
                                        border-radius: 10px; " 
                                        onmouseover="$('#refresh_map_polar').css('color','red');" 
                                        onmouseout="$('#refresh_map_polar').css('color','whitesmoke');">
            Visualiser
        </button>
    </div>
    
</div>