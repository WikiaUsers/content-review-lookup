// 11:14, March 26, 2013 (UTC)
// Just a get it done version
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
} 

if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	jQuery(function ($) {
		'use strict';
		var $desc = $('#wpUploadDescription');
		if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
		$desc.val('{{Information Fichier\n' +
                  '|Description   = \n' +
                  '|Source   = \n' +
                  '|Personnages dans image   = \n' +
                  '|Jutsu dans image   = \n' +
                  '|Objet   = \n' +
                  '|Portion   = \n' +
                  '|Résolution   = \n' +
                  '|Remplaçabilité   = \n' +
                  '|Autre Information   = \n' + '}}'
        );
    });
}
 
/**
 * Start upload form customisations
 */
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
        // Check if cookie has been set for form style. Overrides URL parameter if set.
    var formstyle = getCookie("uploadform");
    $("#uploadBasicLinkJS").show();
    $("#uploadTemplateNoJS").hide();
    
    if (!$.getUrlVar('wpForReUpload')) {

        if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)) { // Add link to basic form
        $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://fr.naruto.wikia.com/index.php?title=Spécial:Téléverser&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Basculer vers le formulaire basique</a></div>'); // Stretch table to full width            
            
            jQuery(function ($) {
                'use strict';
                var $description = $('#wpUploadDescription'),
                    customRows = '',
                    $customRows;
     
                if ($description.val()) {
                    return; // error message confirm page
                }
     
                function fromTemplate(name, id, required, title, elem) {
                    elem = elem || '<textarea style="resize:none; overflow:auto;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                    return '<tr>\n'
                         + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + '&nbsp;:</label></td>\n'
                         + '<td class="mw-input">' + elem + '</td>\n'
                         + '</tr>\n';
                }
                customRows += fromTemplate('Description', 'descriptionBox', true, '[REQUIS] Décrire ce qu’il se passe ou ce que ça représente.');
                customRows += fromTemplate('Source', 'sourceBox', true, '[REQUIS] D’où ça provient, le chapitre ou le numéro d’épisode exact.');
                customRows += fromTemplate('Personnages dans l’image', 'characterBox', false, '[S’IL Y A] Liste des Personnages sous forme de liens internes séparés par des virgules.');
                customRows += fromTemplate('Jutsu dans l’image', 'jutsuBox', false, '[S’IL Y A] Liste des Jutsu sous forme de liens internes séparés par des virgules.');
                customRows += fromTemplate('Objet', 'purposeBox', false, '[OPTIONNEL] But de l’image, qu’illustre-t-elle.');
                customRows += fromTemplate('Portion Utilisée', 'portionBox', false, '[OPTIONNEL] Portion de la propriété intellectuelle (droit d’auteur) utilisée.');
                customRows += fromTemplate('Remplaçable&nbsp;?', 'replaceBox', false, '[OPTIONNEL] L’image est-elle remplaçable&nbsp;?');
                customRows += fromTemplate('Résolution', 'resolutionBox', false, '[OPTIONNEL] Résolution de l’image. (Basse, Moyenne, Haute, 720p, 1080p, 1440p)');
                customRows += fromTemplate('Autre Information', 'otherinfoBox', false, '[OPTIONNEL] Toute autre information concernant l’image.');
                customRows += fromTemplate('Nom Fichier Narutopedia', 'narutopediafileBox', false, '[OPTIONNEL] Nom de l’image sur Narutopedia (Wiki anglais). (Ne pas saisir «&nbsp;File:&nbsp;»)');
     
                // To real DOM
                $customRows = $(customRows);
                $description.closest('tr').hide().after($customRows);
                $customRows.find("textarea").tooltip({trigger: 'focus'});
     
                function verifySummary() {
                    if (!$('#wpLicense').val()) {
                        $.showModal('Licence Incomplète', 'Choisir la bonne licence depuis la liste.');
                        return false;
                    }
     
                    if (!$.trim($customRows.find('#descriptionBox').val())) {
                        $.showModal('Description Incomplète', 'Merci de renseigner une descriptioin correcte pour votre image. Décrire ce qu’il se produit et pourquoi est-elle importante.');
                        return false;
                    }
     
                    if (!$.trim($customRows.find('#sourceBox').val())) {
                        $.showModal('Source Incomplète', 'Merci de saisir la source de votre image (numéro exact de chapitre ou d’épisode).');
                        return false;
                    } else if (/google/i.test($customRows.find('#sourceBox').val())) {
                        $.showModal('Source Incorrecte', 'Google n’est pas une source valide pour les images. Merci de saisir le numéro exact de chapitre ou d’épisode d’où l’image provient.');
                        $customRows.find('#sourceBox').val('');
                        return false;
                    }
     
                    var template = '',
                        resolution = $.trim($customRows.find('#resolutionBox').val()) || $('.fileinfo').text().split(',')[0];
                    if (/1440/i.test(resolution)||/\d*K/i.test(resolution)) {
                        template = '{{Image UHD}}\n';
                    } else if (/1080/i.test(resolution)) {
                        template = '{{Image 1080p}}\n';
                    } else if (/720/i.test(resolution)) {
                        template = '{{Image 720p}}\n';
                    }
                    
                    //Ajout du lien interwiki
                    var enfilename = "",
                    narutopediafile = document.getElementById('narutopediafileBox').value;
    
                    if (narutopediafile !== "") {
                        enfilename = '\n[[en:File:' + narutopediafile + ']]';
                    }
     
                    var strBuilder = template;
                    strBuilder += '{{Information Fichier\n';
                    strBuilder += '|Description = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                    strBuilder += '|Source = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                    strBuilder += '|Objet = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                    strBuilder += '|Personnages dans image = ' + $.trim($customRows.find('#characterBox').val()).replace(/\set\s/g, ', ') + '\n';
                    strBuilder += '|Jutsu dans image = ' + $.trim($customRows.find('#jutsuBox').val()).replace(/\set\s/g, ', ') + '\n';
                    strBuilder += '|Portion = ' + $.trim($customRows.find('#portionBox').val()) + '\n';
                    strBuilder += '|Résolution = ' + resolution + '\n';
                    strBuilder += '|Remplaçabilité = ' + $.trim($customRows.find('#replaceBox').val()) + '\n'; 
                    strBuilder += '|Autre Information = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
                    strBuilder += '}}';
                    strBuilder += enfilename;
                    $description.val(strBuilder);
                    return true;
                }
     
                // Bind submit to verify function
                $description.closest('form').submit(verifySummary);
     
                // Autocomplete links
                $.getScript(
                    '/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts', function () {
                    dev.minicomplete.load(
                        $customRows.find('#descriptionBox'), $customRows.find('#sourceBox'),$customRows.find('#characterBox'), $customRows.find('#jutsuBox')
                    );
                });
            });
        } else { // Old style form just needs Information template in the summary box
            $('#wpUploadDescription').val('{{Information Fichier\n|Description= \n|Source= \n|Objet= \n|Personnages dans image= \n|Jutsu dans image= \n|Portion= \n|Résolution= \n|Remplaçabilité= \n|Autre Information= \n}}'); // Add link to guided form
            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://fr.naruto.wikia.com/index.php?title=Spécial:Téléverser" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Basculer vers le formulaire avancé</a></div>');
        }
    } 
}
// </source>