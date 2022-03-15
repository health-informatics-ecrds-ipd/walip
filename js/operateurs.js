function blockui()
{
    $.blockUI({css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: '<h4> En cours de traitement. Patientez.</h4>'
    });
}

function show_sample_information(id_plvt)
{
    $.post("../data-manager/post_get_sample_data.php", {'id': id_plvt}, function(data)
    {
        var objet = $.parseJSON(data);
        // parcourir les données chargées 
        $.each(objet, function(key, value)
        {
            if (value !== null)
            {
                 if(key.indexOf('sn_')>=0 || key.indexOf('igm_')>=0 || key.indexOf('arn_')>=0)
                {
                    if(key.indexOf('val')>=0)
                    {
                         $("#" + key).val(value);
                    }
                    else
                    {
                        $("#" + key + '_pos').css('background', 'white');
                        $("#" + key + '_neg').css('background', 'white');
                        if(value === '1')
                        {
                            $("#" + key + '_pos').css('background', 'rgba(0,0,0,0.4)');
                        }
                        else 
                        {
                            $("#" + key+ '_neg').css('background', 'rgba(0,0,0,0.4)');
                        }
                    }
                }
                else
                {
                    $("#" + key).val(value);
                    $("#" + key).text(value);
                } 
            }
           
        });
        $('#img_wait_for_data1').hide();
        $('#table_data_sample').show();
    });

    $.blockUI({
        message: $('#div_resultats'),
        css: {
            top: '1%',
            bottom: '1%',
            left: '10%',
            right: '10%',
            width: '80%',
            padding: 'auto',
            'padding-bottom': '10px',
            '-webkit-border-radius': '5px',
            'border-radius': '5px',
            '-moz-border-radius': '5px',
            height: '1250px',
            position:'absolute'
        }
    });
}

$(document).ready(function() {
    $('#a_operateurs').removeClass('class_a_menu_haut');
    $('#a_operateurs').addClass('class_menu_haut_active');

    /*-------------------------------------
      Activation des liens selectionnés ...
      -------------------------------------*/
    var u = location.href;
    if ((u.indexOf('menu') >= 0) === false)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('ajouter') >= 0)
    {
        $('#a_ajouter').addClass('liens_actif');
    }
    else if (u.indexOf('consulter') >= 0)
    {
        $('#a_consulter').addClass('liens_actif');
    }
    else if (u.indexOf('modifier') >= 0)
    {
        $('#a_modifier').addClass('liens_actif');
        $('#div_ajouter_modifier_2').css('box-shadow', '0px 0px 7px rgba(200,0,0,0.8)');
        $('#sbt_resultats').val('Enregistrer les modifications');
        var id;
        if ((u.indexOf('id=') >= 0)=== false)
        {
            $('#div_nav_modif').show();
        }
        else 
        {
            id = $.trim(u.split('=')[2]);
        }
        $.post('post_get_results_by_id.php',{'id':id}, function(data)
        {
            if (data !== 'ko')
            {
                // remplir le formulaire des resultats ...
                var d = $.parseJSON(data);

                $.each(d, function(k, v)
                {
                    $('#' + k).val(v);
                });
                init_select_input_handler();
            }
        });
    }

    var pathname = window.location;
    if ((pathname.href).indexOf('cdc') >= 0)
    {
        $('#methode_cdc').attr('checked', true);
        $('#inclure_blanc').attr('checked', true);
        $('#ne_pas_inclure_blanc').hide();
        $('#labbel_ne_pas_inclure_blanc').hide();
    }
    else if ((pathname.href).indexOf('ipd') >= 0)
    {
        $('#methode_ipd').attr('checked', true);
        $('#ne_pas_inclure_blanc').show();
        $('#labbel_ne_pas_inclure_blanc').show();
    }

    /*
     * controles sur le plan plaque
     */
    $('input').keyup(function()
    {
        var id = this.id;
        if (id.indexOf('ipd') >= 0)
        {
            var ipd_deb = id.replace('fin', 'deb');
            var ipd_fin = id.replace('deb', 'fin');
            var val = $(this).val();
            if ($.trim(val) === '')
            {
                if (($.trim($('#' + ipd_deb).val()) !== '' && $.isNumeric($.trim($('#' + ipd_deb).val())) && $.trim($('#' + ipd_fin).val()) === '')
                        || ($.trim($('#' + ipd_fin).val()) !== '' && $.isNumeric($.trim($('#' + ipd_fin).val())) && $.trim($('#' + ipd_deb).val()) === ''))
                {
                    $('#' + ipd_deb).css('background', 'rgba(255,255,255,1)');
                    $('#' + ipd_fin).css('background', 'rgba(255,255,255,1)');
                }
                else
                {
                    $(this).css('background', 'rgba(255,255,255,1');
                }
                return;
            }
            if ($.isNumeric(val) === false)
            {
                $(this).css('background', 'rgba(200,0,0,0.2)');
            }
            else
            {
                if ($.trim($('#' + ipd_deb).val()) !== '' && $.trim($('#' + ipd_fin).val()) !== '')
                {
                    var v1 = parseInt($.trim($('#' + ipd_deb).val()));
                    var v2 = parseInt($.trim($('#' + ipd_fin).val()));

                    if (v1 > v2)
                    {
                        $('#' + ipd_deb).css('background', 'rgba(200,0,0,0.2)');
                        $('#' + ipd_fin).css('background', 'rgba(200,0,0,0.2)');
                    }
                    else
                    {
                        if ($.isNumeric($.trim($('#' + ipd_deb).val())))
                        {
                            $('#' + ipd_deb).css('background', 'rgba(255,255,255,1)');
                        }
                        if ($.isNumeric($.trim($('#' + ipd_fin).val())))
                        {
                            $('#' + ipd_fin).css('background', 'rgba(255,255,255,1)');
                        }
                    }
                }
                else
                {
                    //$(this).css('background', 'rgba(255,255,255,1)');
                    $('#' + ipd_deb).css('background', 'rgba(255,255,255,1)');
                    $('#' + ipd_fin).css('background', 'rgba(255,255,255,1)');
                }
            }
        }
    });

    /*
     * Incrementer les lettres
     */
    function nextChar(c)
    {
        if (c === 'H')
        {
            return 'A';
        }
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    /*
     * Meme chose que la fonction nextChar
     * @param {type} c
     * @returns {String}
     */
    function nextChar_bis(c)
    {
        if (c === 'I')
        {
            return 'A';
        }
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    /*
     * Reinitialise la plaque
     * @returns {undefined}
     */
    function reinitialiser_plaque()
    {
        for (var i = 1; i < 13; i++)
        {
            for (var lettre = 'A'; lettre !== 'I'; lettre = nextChar_bis(lettre))
            {
                $('#' + lettre + i).val('');
                $('#' + lettre + i).css('background', 'white');
            }
        }
    }

    /*
     * BOUTON POUR REMPLIR LA PLAQUE ELISA
     */
    $('#bt_remplir_plan_plaque').click(function()
    {
        var inclure_blanc = $('#inclure_blanc').prop('checked');

        var plan = {};
        var vide = true;

        for (var i = 0; i < 5; i++)
        {
            var color1 = $('#ipd_deb_' + i).css('backgroundColor');
            var color2 = $('#ipd_fin_' + i).css('backgroundColor');
            if (($.trim($('#ipd_deb_' + i).val()) !== '' && $.trim($('#ipd_fin_' + i).val()) === '')
                    || ($.trim($('#ipd_deb_' + i).val()) === '' && $.trim($('#ipd_fin_' + i).val()) !== '')
                    || $.trim(color1) === 'rgba(200, 0, 0, 0.2)' || $.trim(color2) === 'rgba(200, 0, 0, 0.2)')
            {
                alertify.alert('ERREUR : il y a de(s) erreur(s) dans votre plaque!');
                return;
            }
            if ($.trim($('#ipd_deb_' + i).val()) !== '' && $.trim($('#ipd_fin_' + i).val()) !== '')
            {
                if ($.trim($('#virus_' + i).val()) === '')
                {
                    alertify.alert('ERREUR :  veuillez preciser le(s) virus cible(s)!');
                    return;
                }
                vide = false;
                plan[i] = i;
            }
        }

        if (vide)
        {
            alertify.alert('ERREUR : veuillez donner le plan de plaque!');
            return;
        }
        var nb_cells = 0;

        // la methode en cours ....
        var methode_cdc = $('#methode_cdc').prop('checked');


        $.each(plan, function(k, v)
        {
            var v1 = parseInt($.trim($('#ipd_deb_' + v).val()));
            var v2 = parseInt($.trim($('#ipd_fin_' + v).val()));
            if (methode_cdc)
            {
                nb_cells = nb_cells + (v2 - v1) + 4;
            }
            else
            {
                if (inclure_blanc)
                {
                    nb_cells = nb_cells + (v2 - v1) + 4;
                }
                else
                {
                    nb_cells = nb_cells + (v2 - v1) + 3;
                }
            }

        });

        if ((nb_cells > 48 && !methode_cdc) || (nb_cells > 16 && methode_cdc))
        {
            alertify.alert('ERREUR : les valeurs definies ne peuvent pas tenir dans la plaque!');
            return;
        }


        reinitialiser_plaque();

        var methode_ipd = $('#methode_ipd').prop('checked');
        if (methode_ipd)
        {
            plan_plaque_IPD(plan);
        }
        else
        {
            plan_plaque_CDC(plan);
        }
    });

    function plan_plaque_IPD(plan)
    {
        var lettre = 'A';
        var i = 1;
        var j = 0;
        var inclure_blanc = $('#inclure_blanc').prop('checked');
        $.each(plan, function(k, v)
        {
            var deb = parseInt($.trim($('#ipd_deb_' + v).val()));
            var fin = parseInt($.trim($('#ipd_fin_' + v).val()));
            var fin_sup = fin + 2;
            if (inclure_blanc)
            {
                fin_sup = fin + 3;
            }

            for (; deb <= fin_sup; i = i + 2)
            {
                for (; j < 8 && deb <= fin_sup; j++)
                {
                    if (deb > fin)
                    {
                        if (inclure_blanc === false) // Ne pas inclure le blanc 
                        {
                            if (deb === fin + 1)
                            {
                                $('#' + (lettre) + i).css('background', 'rgba(0,0,250,0.3)');
                                $('#' + (lettre) + (i + 1)).css('background', 'rgba(0,0,250,0.3)');
                            }
                            else
                            {
                                $('#' + (lettre) + i).css('background', 'rgba(200,0,0,0.3)');
                                $('#' + (lettre) + (i + 1)).css('background', 'rgba(200,0,0,0.3)');
                            }
                            $('#' + (lettre) + i).val('ctrl');
                            $('#' + (lettre) + (i + 1)).val('ctrl');
                        }
                        else // inclure le blanc
                        {
                            if (deb === fin + 1)
                            {
                                $('#' + (lettre) + i).css('background', 'rgba(0,0,0,0.1)');
                                $('#' + (lettre) + (i + 1)).css('background', 'rgba(0,0,0,0.1)');
                                $('#' + (lettre) + i).val('blanc');
                                $('#' + (lettre) + (i + 1)).val('blanc');
                            }
                            else if (deb === fin + 2)
                            {
                                $('#' + (lettre) + i).css('background', 'rgba(0,0,250,0.3)');
                                $('#' + (lettre) + (i + 1)).css('background', 'rgba(0,0,250,0.3)');
                                $('#' + (lettre) + i).val('ctrl');
                                $('#' + (lettre) + (i + 1)).val('ctrl');
                            }
                            else
                            {
                                $('#' + (lettre) + i).css('background', 'rgba(200,0,0,0.3)');
                                $('#' + (lettre) + (i + 1)).css('background', 'rgba(200,0,0,0.3)');
                                $('#' + (lettre) + i).val('ctrl');
                                $('#' + (lettre) + (i + 1)).val('ctrl');
                            }
                        }

                        deb++;
                        lettre = nextChar(lettre);
                    }
                    else
                    {
                        $('#' + (lettre) + i).val(deb);
                        $('#' + (lettre) + (i + 1)).val(deb++);
                        lettre = nextChar(lettre);
                    }
                }
                if (j === 8)
                {
                    j = 0;
                }
            }
            if (j !== 0)
            {
                i = i - 2;
            }
        });
    }

    function plan_plaque_CDC(plan)
    {
        var lettre = 'A';
        var i = 1;
        var j = 0;
        $.each(plan, function(k, v)
        {
            var deb = parseInt($.trim($('#ipd_deb_' + v).val()));
            var fin = parseInt($.trim($('#ipd_fin_' + v).val()));
            var fin_sup = fin + 3;

            for (; deb <= fin_sup; i = i + 6)
            {
                for (; j < 8 && deb <= fin_sup; j++)
                {
                    if (deb > fin)
                    {
                        if (deb === fin + 2)
                        {
                            $('#' + (lettre) + i).css('background', 'rgba(0,0,250,0.3)');
                            $('#' + (lettre) + (i + 1)).css('background', 'rgba(0,0,250,0.3)');
                            $('#' + (lettre) + (i + 2)).css('background', 'rgba(0,0,250,0.3)');
                            $('#' + (lettre) + (i + 3)).css('background', 'rgba(0,0,250,0.3)');
                            $('#' + (lettre) + (i + 4)).css('background', 'rgba(0,0,250,0.3)');
                            $('#' + (lettre) + (i + 5)).css('background', 'rgba(0,0,250,0.3)');

                            $('#' + (lettre) + i).val('ctrl');
                            $('#' + (lettre) + (i + 1)).val('ctrl');
                            $('#' + (lettre) + (i + 2)).val('ctrl');
                            $('#' + (lettre) + (i + 3)).val('ctrl');
                            $('#' + (lettre) + (i + 4)).val('ctrl');
                            $('#' + (lettre) + (i + 5)).val('ctrl');
                        }
                        else if (deb === fin + 3)
                        {
                            $('#' + (lettre) + i).css('background', 'rgba(200,0,0,0.3)');
                            $('#' + (lettre) + (i + 1)).css('background', 'rgba(200,0,0,0.3)');
                            $('#' + (lettre) + (i + 2)).css('background', 'rgba(200,0,0,0.3)');
                            $('#' + (lettre) + (i + 3)).css('background', 'rgba(200,0,0,0.3)');
                            $('#' + (lettre) + (i + 4)).css('background', 'rgba(200,0,0,0.3)');
                            $('#' + (lettre) + (i + 5)).css('background', 'rgba(200,0,0,0.3)');

                            $('#' + (lettre) + i).val('ctrl');
                            $('#' + (lettre) + (i + 1)).val('ctrl');
                            $('#' + (lettre) + (i + 2)).val('ctrl');
                            $('#' + (lettre) + (i + 3)).val('ctrl');
                            $('#' + (lettre) + (i + 4)).val('ctrl');
                            $('#' + (lettre) + (i + 5)).val('ctrl');
                        }
                        else
                        {
                            $('#' + (lettre) + i).css('background', 'rgba(0,0,0,0.04)');
                            $('#' + (lettre) + (i + 1)).css('background', 'rgba(0,0,0,0.04)');
                            $('#' + (lettre) + (i + 2)).css('background', 'rgba(0,0,0,0.04)');
                            $('#' + (lettre) + (i + 3)).css('background', 'rgba(0,0,0,0.04)');
                            $('#' + (lettre) + (i + 4)).css('background', 'rgba(0,0,0,0.04)');
                            $('#' + (lettre) + (i + 5)).css('background', 'rgba(0,0,0,0.04)');

                            $('#' + (lettre) + i).val('blanc');
                            $('#' + (lettre) + (i + 1)).val('blanc');
                            $('#' + (lettre) + (i + 2)).val('blanc');
                            $('#' + (lettre) + (i + 3)).val('blanc');
                            $('#' + (lettre) + (i + 4)).val('blanc');
                            $('#' + (lettre) + (i + 5)).val('blanc');
                        }

                        deb++;
                        lettre = nextChar(lettre);
                    }
                    else
                    {
                        $('#' + (lettre) + i).val(deb);
                        $('#' + (lettre) + (i + 1)).val(deb);
                        $('#' + (lettre) + (i + 2)).val(deb);
                        $('#' + (lettre) + (i + 3)).val(deb);
                        $('#' + (lettre) + (i + 4)).val(deb);
                        $('#' + (lettre) + (i + 5)).val(deb++);
                        lettre = nextChar(lettre);
                    }
                }
                if (j === 8)
                {
                    j = 0;
                }
            }
            if (j !== 0)
            {
                i = i - 6;
            }
        });
    }

    $('#sub_file').submit(function()
    {
        var methode_cdc = $('#methode_cdc').prop('checked');
        var methode_ipd = $('#methode_ipd').prop('checked');
        if (!methode_cdc && !methode_ipd)
        {
            alertify.alert("Veulliez preciser la methode utilisee!");
            return false;
        }
        else if (methode_cdc)
        {
            $(this).attr('action', 'index.php?methode=cdc');
        }
        else
        {
            $(this).attr('action', 'index.php?methode=ipd');
        }
        var val = $.trim($('#upfile').val());
        if (val === '')
        {
            alertify.alert("Veulliez charger un fichier!");
            return false;
        }
        return true;
    });

    $('#methode_cdc').change(function()
    {
        var methode_cdc = $(this).prop('checked');
        if (methode_cdc)
        {
            $('#loader_gif').show();
            location.href = 'index.php?methode=cdc';
        }
    });
    $('#methode_ipd').change(function()
    {
        var methode_ipd = $(this).prop('checked');
        if (methode_ipd)
        {
            $('#loader_gif').show();
            location.href = 'index.php?methode=ipd';
        }
    });

    $('#methode_cdc, #methode_ipd, #inclure_blanc, #ne_pas_inclure_blanc, #saisie_manuelle, #saisie_automatique').change(function()
    {
        var methode_cdc = $('#methode_cdc').prop('checked');
        var methode_ipd = $('#methode_ipd').prop('checked');
        var saisie_manuelle = $('#saisie_manuelle').prop('checked');
        var saisie_automatique = $('#saisie_automatique').prop('checked');

        if (saisie_manuelle)
        {
            $('#ne_pas_inclure_blanc').hide();
            $('#inclure_blanc').hide();
            $('#labbel_ne_pas_inclure_blanc').hide();
            $('#labbel_inclure_blanc').hide();
        }
        if (saisie_automatique)
        {
            $('#inclure_blanc').show();
            $('#labbel_inclure_blanc').show();
            if (!methode_cdc)
            {
                $('#ne_pas_inclure_blanc').show();
                $('#labbel_ne_pas_inclure_blanc').show();
            }
            else
            {
                $('#ne_pas_inclure_blanc').hide();
                $('#labbel_ne_pas_inclure_blanc').hide();
            }
        }
        if ((methode_cdc || methode_ipd) && (saisie_manuelle || saisie_automatique))
        {
            $('#div_plan_plaque_2').show("slow");
            if (saisie_automatique)
            {
                $('#div_plan_plaque_1').show("slow");
            }
            else
            {
                $('#div_plan_plaque_1').hide("slow");
            }
        }
    });


    var nb_records = parseInt($('#lab_nb_enregistrement').text());
    var encours = nb_records;

    $('#bt_moins, #bt_plus').click(function()
    {   
        var sens;
        if ((encours > 1 && this.id ==='bt_moins') || (encours < nb_records && this.id ==='bt_plus'))
        {
            blockui();
            if (this.id === 'bt_plus')
            {
                encours++;
                sens = 'plus';
            }
            else
            {
                encours--;
                sens = 'moins';
            }
            
            $.post('post_get_results_by_id.php', {'sens': sens}, function(data)
            {
                if (data !== 'ko')
                {
                    $('#lab_enregistrement_en_cours').text(encours);
                    // remplir le formulaire des resultats ...
                    var d = $.parseJSON(data);
                    $.each(d, function(k, v)
                    {
                        $('#' + k).val(v);
                    });
                    init_select_input_handler();
                    $.unblockUI();
                }
            });
        }

    });
    
    /*
     * fermer le blockui
     */
    $('#fermer').click(function() {
        $.unblockUI();
        $('#img_wait_for_data1').show();
        $('#img_wait_for_data2').show();
        $('#table_data_lab_results').hide();
        $('#table_data_sample').hide();
        return false;
    });
});