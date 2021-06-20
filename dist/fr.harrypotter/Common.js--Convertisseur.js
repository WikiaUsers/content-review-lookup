/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
    if(wgPageName == "Argent_des_sorciers") {
        // Variables de contenu des deux tables de conversion
        var se = '<tr><td colspan="3" style="height: 0; padding: 0;"></td><td rowspan="4"><label style=""> <input type="radio" name="se" value="se" checked>&nbsp;Sorciers / € </label><br> <label> <input type="radio" name="se" value="es">€ / Sorciers </label></td></tr><tr id="se_nom_pieces"> <td>Gallions</td><td>Mornilles</td><td>Noises</td></tr><tr id="se_champs_pieces"> <td> <input id="gallions"/> </td><td> <input id="mornilles"/> </td><td> <input id="noises"/> </td></tr><tr id="se_euros"> <td>Euros (€) :</td><td> <input id="euros" disabled></input> </td><td id="va" style="text-align: center"></td></tr><tr style="color: orangered"><td id="erreurs" style="padding: 0 5px;" colspan="4"></td></tr>',
            ss = '<tr><tr id="ss_nom_pieces"> <td>Gallions</td><td>Mornilles</td><td>Noises</td></tr><tr id="ss_champs_pieces"> <td> <input id="ss_gallions"/> </td><td> <input id="ss_mornilles"/> </td><td> <input id="ss_noises"/> </td></tr><tr style="height: 85px; vertical-align: top;"> <td style="text-align: center; padding-top:5px; font-size: 110%" colspan="3">Convertir en&nbsp;&nbsp;<select style="font-size: 100%; width: 150px" id="dd"> <option value="493">Gallions</option> <option value="29">Mornilles</option> <option value="1">Noises</option> </select> </td></tr><tr> <td id="ss_res" style="text-align: center">Résultat :</td><td> <input id="resultat" disabled></input> </td><td id="ss_va" style="text-align: center"></td></tr><tr style="background-color: #aEaBaF;"><td colspan="3" style="text-align: center;">Optimisation de la répartition des pièces</td></tr><tr id="ss2_nom_pieces"> <td>Gallions</td><td>Mornilles</td><td>Noises</td></tr><tr id="ss2_champs_pieces"> <td> <input id="ss2_gallions" disabled/> </td><td> <input id="ss2_mornilles" disabled/> </td><td> <input id="ss2_noises" disabled/> </td></tr><tr style="color: orangered"><td id="erreurs" style="padding: 0 5px;" colspan="3"></td></tr>',
            re = /^(?![0-9\.\S]*$).*/g;
    
        // mise en place du HTML
        $( '#table_de_conversions' ).html( '<table id="tabledeconversions" style="width: 100%; font-weight: bold;background-color: white; border: 1px solid black; border-collapse: collapse; color: black;"> <thead style="background-color: #6E6B6F;"> <tr> <td colspan="4" style="height: 50px; text-align: center"> <label style="margin-right: 50px"> <input type="radio" name="mode" value="se" checked>&nbsp;Sorciers / Moldus </label> <label> <input type="radio" name="mode" value="ss">&nbsp;Sorciers / Sorciers </label> </td></tr></thead> <tbody>' + se + '</tbody></table>' );
        
        // Appel des différentes fonctions au changement de tables
        $('input[name="mode"]:radio').on('change', function () {
            if ($(this).val() == 'se') {
                // Ajout du HTML correspondant
                $('#tabledeconversions tbody').html(se);
                // Appel fonctions avant changement de sens
                $('input#gallions, input#mornilles, input#noises').on('change, keyup', function () {
                    sorciersMoldus();
                });
                // Changement de sens de conversion dans la table
                $('input[name="se"]:radio').on('change', function () {
                    if ($(this).val() == 'se') {
                        // Changement de disposition
                        $('#se_champs_pieces').after($('#se_euros'));
                        // Dégrisements de pieces et grisement de euros
                        $('input#euros').prop('disabled', true);
                        $('input#gallions, input#mornilles, input#noises').prop('disabled', false);
                        // Appel fonctions au changement de sens
                        $('input#gallions, input#mornilles, input#noises').on('change, keyup', function () {
                            sorciersMoldus();
                        });
                    } else {
                        // Changement de disposition
                        $('#se_nom_pieces').before($('#se_euros'));
                        // Grisements de pieces et dégrisement de euros
                        $('input#euros').prop('disabled', false);
                        $('input#gallions, input#mornilles, input#noises').prop('disabled', true);
                        // Appel fonctions au changement de sens
                        $('input#euros').on('change, keyup', function() {
                            moldusSorciers();
                        });
                    }
                });
            } else {
                // Pour le cas de Sorciers / Sorciers
                // Ajout du HTML correspondant
                $('#tabledeconversions tbody').html(ss);
                $('input#ss_gallions, input#ss_mornilles, input#ss_noises').on('change, keyup', function () {
                    Sorciers();
                });
        		// le onChange sur select et input à la fois ne fonctionne pas...
                $('select#dd').on('change, keypress, click', function () {
                    Sorciers();
                });
            }
        });
        
        // Déclancher un évènement de changement pour les radio principales
        $('input[name="mode"][value="se"]:radio').trigger('change');
        
        // fonctions
        function sorciersMoldus() {
            var gallions = $('input#gallions').val().replace(/\s/g, ''),
                mornilles = $('input#mornilles').val().replace(/\s/g, ''),
                noises = $('input#noises').val().replace(/\s/g, '');
            if (gallions.match(re) || mornilles.match(re) || noises.match(re)) {
                $('td#erreurs').html('Vous ne devez entrer que des valeurs numériques !');
                $('input#euros').prop('disabled', true).val('');
            } else {
                $('input#euros').prop('disabled', false);
                var total = Number(gallions) * 8.0753002016 + Number(mornilles) * 0.47501765891 + Number(noises) * 0.01637991926;
                $('input#euros').val((Math.round(total * 100) / 100));
                $('td#va').html('<small>(Valeur approximative)</small>');
                $('td#erreurs').html('');
            }
        }
        
        function moldusSorciers() {
            var input_euros = $('input#euros').val().replace(/\s/g, '');
            var gallions = mornilles = noises = 0;
            if (input_euros.match(re)) {
                $('td#erreurs').html('Vous ne devez entrer que des valeurs numériques !');
                $('input#gallions, input#mornilles, input#noises').prop('disabled', true).val('');
            } else {
                $('input#gallions, input#mornilles, input#noises').prop('disabled', false);
                var euros = Number(input_euros);
                while(euros >= 8.0753002016) {
                    gallions += 1;
                	euros -= 8.0753002016;
                }
                while(euros >= 0.47501765891) {
                    mornilles += 1;
                    euros -= 0.47501765891;
                }
                noises = euros / 0.01637991926;
                $('input#gallions').val(gallions);
                $('input#mornilles').val(mornilles);
                $('input#noises').val((Math.round(noises)));
                $('td#erreurs').html('');
            }
        }
    
        function Sorciers() {
            var dd = $('select#dd').find(':selected').val(),
                ddtxt = $('select#dd').find(':selected').text(),
                gallions = $('input#ss_gallions').val().replace(/\s/g, ''),
                mornilles = $('input#ss_mornilles').val().replace(/\s/g, ''),
                noises = $('input#ss_noises').val().replace(/\s/g, ''),
                resultat,
                total,
                total2,
                gallions2 = mornilles2 = noises2 = 0,
                depart = gallions + mornilles + noises;
            if (depart.match(re)) {
                $('input#resultat').prop('disabled', true).val('');
                $('td#erreurs').html('Vous ne devez entrer que des valeurs numériques !');
            } else {
                total = Number(gallions) * 493 + Number(mornilles) * 29 + Number(noises);
                resultat = Math.round((total / Number(dd)) * 1e15) / 1e15;
                $('input#resultat').prop('disabled', false);
                $('#ss_res').text(((resultat <= 1) ? ddtxt.replace(/s([^s]*)$/,'') : ddtxt) + ' :');
                $('input#resultat').val(resultat);
                $('td#ss_va').html('<small>(Valeur approximative)</small>');
                total2 = total;
                while(total2 >= 493) {
                    gallions2 += 1;
                	total2 -= 493;
                }
                while(total2 >= 29) {
                    mornilles2 += 1;
                    total2 -= 29;
                }
                noises2 = total2;
                $('input#ss2_gallions').val(gallions2);
                $('input#ss2_mornilles').val(mornilles2);
                $('input#ss2_noises').val(noises2);
                $('td#erreurs').html('');
            }
        }
        mw.util.addCSS(
        	'#table_de_conversions td label:first-child {\n' +
        		'\tpadding-bottom: 20px;\n' +
        	'}\n' +
         
        	'#table_de_conversions td {\n' +
        		'\tborder: 1px solid black;\n' +
        		'\tborder-collapse: collapse;\n' +
        		'\ttext-align: center;\n' +
        	'}\n' +
        	
        	'table#tabledeconversions input:not([type="radio"]) {\n' +
                '\twidth: 95%;\n' +
            '}'
        );
    }
});