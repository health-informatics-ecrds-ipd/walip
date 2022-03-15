<script>
    $(document).ready(function(){
        $('#refresh_map_treemap').click(function(){
            var sexe = $('#sexe_treemap').val();          
            var annee = $('#annee_treemap').val();
            
            var source='../libs/Highcharts-4.1.8/examples/treemap-with-levels/index.php?sexe='+sexe+'&annee='+annee;
            $('#treemap').attr('src', source);
        });
    });
</script>
<div id="tableau_de_bord">
    <div style="background: rgba(0,0,0,0.5); 
         color: white; 
         font-weight: bold; 
         border-radius: 10px; 
         height:50px;
         padding-top: 7px;">
        <table>
            <tr>
                <td> <label>Sexe : </label> </td>
                <td>
                    <select id="sexe_treemap" name="sexe_treemap">
                        <option  value="">[Tout]</option>
                        <option  value="f">Feminin</option>
                        <option  value="m">Masculin</option>
                    </select>
                </td>
                
                
                <td>&nbsp;&nbsp;&nbsp;&nbsp; <label>Ann&eacute;e : </label> </td>
                <td>
                    <select id="annee_treemap" name="annee_treemap">
                        <option  value="">[Tout]</option>
                        <?php for($annee = 2009; $annee != 2050; $annee++){ ?>
                        <option  value="<?php echo $annee; ?>"><?php echo $annee; ?></option>
                        <?php } ?>
                    </select>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="refresh_map_treemap" style="background: rgba(0,0,0,0.01); 
                                                    color: whitesmoke; 
                                                    font-weight: bold; 
                                                    height: 40px;
                                                    border-radius: 10px; " 
                                                    onmouseover="$('#refresh_map').css('color','red');" 
                                                    onmouseout="$('#refresh_map').css('color','whitesmoke');">
                        Visualiser
                    </button>
                </td>
            </tr>
        </table>
    </div>
    
</div>