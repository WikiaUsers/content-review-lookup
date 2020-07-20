/* Le JavaScript placé ici se chargera uniquement pour les administrateurs */
var d = new Date();
var n = d.getDay();
if(n == 5) {
     $('.wikia-menu-button > a#ca-edit').html('<img alt="" class="sprite edit-pencil" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="16" width="22"> SVQ ;)');
}
var nbmsg = $( '#Wall.Wall ul.replies .message' ).length;
$( '#Wall.Thread .comments > .message > .speech-bubble-message .msg-title' ).append(' (' + nbmsg + ' messages)');


//#####################################################################################################
//
//                                         INFOBOX IMAGES
//
//#####################################################################################################
$( document ).ready(function() {
    Acteurs = {};
    Acteurs.page = mw.config.get( 'wgPageName' );
    Acteurs.modal = function() {
        var desc = Acteurs.page.replace('Fichier:', '').replace(/_/g, ' ').replace(/.jpg|.gif|.png|.jepg/g, ''),
            infobox_form = '<b><big>Attention : Ceci remplace intégralement le contenu existant</big></b><div class="infoboxdivs"><table style="background: rgb(255, 255, 255); margin: 0px 0px 0.5em 1em; border: 1px solid rgb(19, 31, 38); border-image: none; width: 80%; line-height: 1.5; border-collapse: collapse;" border="0" cellspacing="0" cellpadding="4"><tbody><tr style="background: rgb(240, 240, 240); text-align: center;"></tr><tr style="background: rgb(19, 31, 38); color: rgb(255, 255, 255); font-size: larger;"><th colspan="2"><input type="text" size="40" id="description" value="[[' + desc + ']]"/><div id="error-desc" style="color: red; "></div></th></tr> <tr><th style="background: rgb(19, 31, 38); text-align: left; font-weight: normal;" colspan="2"><b>Informations générales</b></th></tr> <tr style="background: rgb(30, 50, 61); vertical-align: middle; spacing-top: 0px; spacing-bottom: 0px;"><td style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><b>Date</b></td><td class="infoboxcell" style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><input type="text" size="40" id="date" /></td></tr><tr style="background: rgb(30, 50, 61); vertical-align: middle; spacing-top: 0px; spacing-bottom: 0px;"><td style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><b>Auteur</b></td><td class="infoboxcell" style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><input type="text" size="40" id="auteur" /></td></tr> <tr style="background: rgb(30, 50, 61); vertical-align: middle; spacing-top: 0px; spacing-bottom: 0px;"><td style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><b>Source</b></td><td class="infoboxcell" style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><input type="text" size="40" id="source" /></td></tr> <tr style="background: rgb(30, 50, 61); vertical-align: middle; spacing-top: 0px; spacing-bottom: 0px;"><td style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><b>Licence</b></td><td class="infoboxcell" style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><select id="licence"><option value="aucune">Aucune licence</option><option value="jkr">J.K. Rowling</option><option value="ea">EA</option><option value="wb">Warner Bros</option><option value="tt">TT Games</option><option value="mgp">Mary GrandPré</option><option value="ss">Screenshot</option><option value="nc">Noble Collection</option><option value="dp">Domaine public</option><option value="cover">Couverture</option><option value="limite">Limitée</option><option value="inconnu-web">Inconnue (web)</option><option value="inconnu">Inconnue</option><option value="tomy">Tomy</option><option value="wotc">Wizards of the Coast</option></select></td></tr> <tr style="background: rgb(30, 50, 61); vertical-align: middle; spacing-top: 0px; spacing-bottom: 0px;"><td style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><b>Et plus</b></td><td class="infoboxcell" style="border-top-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;"><input type="text" size="40" id="etplus" /></td></tr> </tbody></table><div style="display: table-cell; vertical-align: middle;"><b>Choisir un modèle type :</b><br><input id="infoboxcbx" type="checkbox" />&nbsp;&nbsp;<select id="infoboxtype" disabled><option value="acteur">Acteur</option><option value="pottermore">Pottermore</option></select></div></div><br><table style="width: 100%"><tr><td><b><big>Galeries de l\'image</big></b></td><td><b><big>Autres pages</big></b></td><tr><td style="width: 50%"><textarea placeholder="Ex : Harry Potter" id="mytextarea" style="padding: 5px; height: 150px; width: 90%"></textarea></td><td><textarea placeholder="Attention : à utiliser UNIQUEMENT si les descriptions des images doivent être rigoureusement les mêmes." id="autres-aussi" style="padding: 5px; height: 150px; width: 90%"></textarea></td><br><hr><input type="button" value="Charger depuis une autre page" id="autre-page-btn"><table class="autres" style="width: 100%"><tr></tr></table>';
        mw.loader.using( ['jquery.ui.autocomplete', 'jquery.ui.datepicker'], function () {
            $.ajaxSetup({
                async: false
            });
            $.getJSON("/api.php?action=query&list=allpages&apfrom=har&aplimit=4000&format=json", function(pages) {
                var result = pages.query.allpages,
                    availableTags = [];
                for ( i = 0; i < result.length; i += 1 ) {
                    availableTags.push('[[' + result[ i ].title + ']]');
                }
                $( "#source" ).autocomplete({
                    source: availableTags
                });            
            });
            $( "#date" ).datepicker({
                changeMonth: true,
                changeYear: true,
                monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ]
            });
            $( "#date" ).datepicker( $.datepicker.regional[ "fr" ] );
            $( "#date" ).datepicker( "option", "dateFormat", "[[d MM]] [[yy]]" );
        });
        $.showCustomModal('Ajouter une description', infobox_form, {
            id: 'infobox-image-modal',
            width: 700,
            buttons: [{
                message: 'Annuler',
                handler: function() {
                    $('#infobox-image-modal').closeModal();
                }
              },{
                message: 'Publier',
                handler: function() {
                    Acteurs.save();
                }
              }]
        });
        var compteur = 0;
        Acteurs.AutrePage = function() {
            if(compteur === 0) {
                $.ajax({
                    url: mw.util.wikiScript( 'api' ),
                    data: {
                        format: 'json',
                        action: 'edit',
                        title: Acteurs.page,
                        text: $( '#autre-page-txt' ).val(),
                        token: mw.user.tokens.get("editToken")
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function( data ) {
                        if ( data && data.edit && data.edit.result == 'Success' ) {
                            if($( '#autres-aussi' ).val() === "") {
                                alert('Succès !');
                                window.location.reload();
                            } else {
                                console.log(Acteurs.page + ' : succès !');
                            }                        
                        } else if ( data && data.error ) {
                            console.log( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                        } else {
                            console.log( 'Error: Unknown result from API.' );
                        }
                    },
                    error: function( xhr ) {
                        alert( 'Error: Request failed.' );
                    }
                });
            }
            if($( '#autres-aussi' ).val() === "") {
                console.log('aire vide' + '\n');
                if(compteur === 0) return;
                console.log('SUCCÈS !!!');
                //window.location.reload();
                return false;
            } else {
                var lignes = $( '#autres-aussi' ).val().split('\n'),
                        page = lignes[0];
                if (page === null || typeof page === "undefined" || page == []) {
                    alert('Vous ne devez pas laisser de ligne blanche.');
                    return false;
                } else {
                    lignes = lignes.slice(1,lignes.length);
                    $('#autres-aussi').val(lignes.join('\n'));
                    console.log('aire : « ' + lignes.join('\n') + ' » \n');
                    compteur ++;
                    console.log('compteur : '+ compteur + '\n');
                    Acteurs.publicar('Fichier:' + page, $( '#autre-page-txt' ).val(), Acteurs.AutrePage);
                }
            }
        };
        Acteurs.lapage = function() {
            var autre_page = prompt('De quelle page voulez-vous charger le contenu ?', Acteurs.page.replace('Fichier:', '').replace(/_/g, ' '));
            $.getJSON("/api.php?action=query&format=json&prop=revisions&titles=Fichier:" + autre_page + "&rvprop=content&cb=" + new Date().getTime(), function(data) {
                if(data.query.pages[-1] === undefined) {
                    var page_Data = data.query.pages,
                        page_Content;
                    for (var page_id in page_Data) {
                        page_Content = page_Data[page_id].revisions[0]["*"]; // updated page content
                    }
                    if(!$( '#autre-page-txt' ).length) {
                        $( '.autres tr' ).append('<td><br><textarea id="autre-page-txt" style="width: 100%; height: 250px">' + page_Content + '</textarea><input id="autre-page-pbl" type="button" value="Publier ce contenu" style="float: right; position: relative; right: 70px;"></td>');
                    } else {
                        $( '#autre-page-txt' ).val(page_Content);
                    }
                } else {
                    alert('La page demandée n\'existe pas');
                }
            });
        };
        $( '#autre-page-btn' ).click(function() {
            Acteurs.lapage();
        });
        $( 'body' ).on('click', '#autre-page-pbl', function() {
            Acteurs.AutrePage();
        });
        $( '#infoboxcbx' ).change(function() {
            if($(this).is(':checked')){
                $( '#infoboxtype' ).removeAttr('disabled');
                defaultValues();
            } else {
                $( '#infoboxtype' ).attr('disabled', true);
            }
        });
        $( '#infoboxtype' ).change(function() {
            defaultValues();
        });
        function defaultValues() {
            if($( '#infoboxtype' ).val() === "acteur") {
                $( 'select#licence' ).val('ss');
                $( 'input#etplus' ).val('Interprète de ');
            } else {
                $( 'select#licence' ).val('jkr');
                $( 'input#etplus' ).val('');
                $( 'input#source' ).val('http://www.pottermore.com/');
                $('#mytextarea').append( '\nPottermore' );
            }
        }
        Acteurs.save = function() {
            if($('#autre-page-txt').length) {
                var conf = confirm( 'Vous avez chargé le contenu d\'une autre page. Voulez-vous publier avec les options d\'en haut tout de même ?' );
                if(conf === false) {
                    return;
                }
            }
            var erreurs = 0;
            $( '#error-desc' ).html('');
            if($( 'input#description' ).val() === "") {
                $( '#error-desc' ).html( '<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Achtung.svg/20px-Achtung.svg.png"> Vous devez remplir ce champ.' );
                ++erreurs;
            }
            if(erreurs !== 0) {
                return;
            }
            var licence = "",
                licenceFunc = function() {
                    alert(' 2 : Vous avez sélectionné la licence « Limitée ». Vous allez devoir renseigner plusieurs paramètres.');
                    var auteur = prompt('Auteur de l\'image'),
                        lcc = prompt('Licence (laissez vide si vous ne savez pas)'),
                        termes = prompt('Termes spécifiques de la licence', 'Utilisation limitée au Wiki Harry Potter');
                    licence = "{{" + "Licence limitée|" + auteur + "|" + lcc + "|" + termes + "}}";
                };
            switch($( 'select#licence' ).val()) {
                case "wb":
                case "jkr":
                case "ea":
                case "tt":
                case "mgp":
                case "nc":
                    licence = '{{Licence|' + $( 'select#licence' ).val().toUpperCase() + '}}';
                    break;
                case "ss":
                    licence = "{{" + "Screenshot" + "}}";
                    break;
                case "dp":
                    licence = "{{" + "Licence DP}}";
                    break;
                case "cover":
                    licence = "{{" + "Cover}}";
                    break;
                case "limite":
                    licenceFunc();
                    break;
                case "inconnu":
                    licence = "{{" + "Licence-Inconnue}}";
                    break;
                case "inconnu-web":
                    licence = "{{" + "Licence-Inconnue-Web}}";
                    break;
                case "tomy":
                    licence = "{{" + "Tomy}}";
                    break;
                case "wotc":
                    licence = "{{Licence|" + "WotC}}";
                    break;
                default:
                    console.log(".");
            }
            var lines = $('#mytextarea').val().split(/\n/);
            var texts = [];
            for (var i=0; i < lines.length; i++) {
                // only push this line if it contains a non whitespace character.
                if (/\S/.test(lines[i]) && $.inArray(lines[i], texts) === -1) {
                    texts.push($.trim(lines[i]));
                }
            }
            var cats = "";
            for ( i=0; i < texts.length; i++) {
                cats += "[[Catégorie:Galerie " + texts[i] + "]]\n";
            }
            var infobox = '==Description==\n\n' +
            '{{Fichier\n' +
            '|Description = ' + $( 'input#description' ).val() + '\n' +
            '|Date = ' + $( 'input#date' ).val() + '\n' +
            '|Auteur = ' + $( 'input#auteur' ).val() + '\n' +
            '|Source = ' + $( 'input#source' ).val() + '\n' +
            '|Licence = ' + licence + '\n' +
            '|Et plus = ' + $( 'input#etplus' ).val() + '\n' +
            '}}\n' +
            cats;
            if (compteur === 0) {
                $.ajax({
                    url: mw.util.wikiScript( 'api' ),
                    data: {
                        format: 'json',
                        action: 'edit',
                        title: Acteurs.page,
                        text: infobox,
                        token: mw.user.tokens.get("editToken")
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function( data ) {
                        if ( data && data.edit && data.edit.result == 'Success' ) {
                            if($( '#autres-aussi' ).val() === "") {
                                alert('Succès !');
                                window.location.reload();
                            } else {
                                console.log(Acteurs.page + ' : succès !');
                            }
                        } else if ( data && data.error ) {
                            alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                        } else {
                            alert( 'Error: Unknown result from API.' );
                        }
                    },
                    error: function( xhr ) {
                        alert( 'Error: Request failed.' );
                    }
                });
            }
            if($( '#autres-aussi' ).val() === "") {
                if(compteur === 0) return;
                alert('Succès !');
                window.location.reload();
                return false;
            } else {
                var lignes = $( '#autres-aussi' ).val().split('\n'),
                        page = lignes[0];
                if (page === null || typeof page === "undefined" || page == []) {
                        alert('Vous ne devez pas laisser de ligne blanche.');
                        return false;
                } else {
                        lignes = lignes.slice(1,lignes.length);
                        $('#autres-aussi').val(lignes.join('\n'));
                        Acteurs.publicar('Fichier:' + page, $( '#autre-page-txt' ).val(), Acteurs.AutrePage);
                        compteur ++;
                }
            }
        };
        Acteurs.publicar = function(page, contenu, fonction) {
            console.log(page + ' : succès.' + '\n');
            $.ajax({
                url: mw.util.wikiScript( 'api' ),
                data: {
                    format: 'json',
                    action: 'edit',
                    title: page,
                    text: contenu,
                    token: mw.user.tokens.get("editToken")
                },
                dataType: 'json',
                type: 'POST',
                success: function( data ) {
                    if ( data && data.edit && data.edit.result == 'Success' ) {
                    } else if ( data && data.error ) {
                        console.log( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                    } else {
                        console.log( 'Error: Unknown result from API.' );
                    }
                },
                error: function( xhr ) {
                    alert( 'Error: Request failed.' );
                }
            });
            setTimeout(fonction, 1000);
        };
    };
    if( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
        $( '#WikiaPageHeader' ).find('.wikia-menu-button').first().find('ul').append('<li><a id="infoboxadd" href="javascript:void(0)" title="Ajouter infobox">Infobox</a></li>');
        $( 'head' ).append( '<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">\n<style>#licence{width:312px;}.infoboxdivs{clear:none;display:table;float:left;padding:20px 0;width:100%}#infoboxtype{width:150px}</style>' );
    }
    $( '#infoboxadd' ).click(function() {
        Acteurs.modal();
    });
});