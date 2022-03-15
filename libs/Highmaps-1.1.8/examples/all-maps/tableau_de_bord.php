<script>
    $(document).ready(function(){
        $('#refresh_map').click(function(){
            var sexe = $('#sexe').val();
            var yf = $('#yf').val();
            var annee = $('#annee').val();
            var bd = $('#bd').val();
            var source='../libs/Highmaps-1.1.8/examples/all-maps/index.php?sexe='+sexe+'&yf='+yf+'&annee='+annee+'&bd='+bd;
            $('#all_map').attr('src', source);
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
            	<td> <label>Basse de donn&eacute;es : </label> </td>
                <td>
                    <select id="bd" name="bd">
                        <option  value="">Toutes</option>
                        <option  value="2">Nationale</option>
                        <option  value="1">Regionale</option>
                    </select>
                </td>
            	
                <td> <label>Sexe : </label> </td>
                <td>
                    <select id="sexe" name="sexe">
                        <option  value="">[Tout]</option>
                        <option  value="f">Feminin</option>
                        <option  value="m">Masculin</option>
                    </select>
                </td>
                
                <td> &nbsp;&nbsp;&nbsp;&nbsp;<label>Fievre jaune : </label> </td>
                <td>
                    <select id="yf" name="yf">
                        <option  value="">[Tout]</option>
                        <option  value="1">Positif</option>
                        <option  value="2">Negatif</option>
                        <!--option  value="3">Autre</option-->
                    </select>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp; <label>Ann&eacute;e : </label> </td>
                <td>
                    <select id="annee" name="annee">
                        <option  value="">[Tout]</option>
                        <?php for($annee = 2009; $annee != 2050; $annee++){ ?>
                        <option  value="<?php echo $annee; ?>"><?php echo $annee; ?></option>
                        <?php } ?>
                    </select>
                </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="refresh_map" style="background: rgba(0,0,0,0.01); 
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