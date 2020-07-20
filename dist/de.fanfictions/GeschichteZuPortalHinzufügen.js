/* -------------------------------------------------------------- */
// Variables for later on
// Keep these in an object for organization
var _gzph_tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    language: mw.config.get('wgUserLanguage')
};
 
$("#portal-sort").prepend('<div style="text-align: center;"><a class="wikia-button"  onclick="GeschichteZuPortalHinzufügen()">Deine Geschichte zu diesem Portal hinzufügen</a></div><br>');
$(".GeschichteZuPortalHinzufügen").attr('onclick', 'gzph_openFormTranslate()');
  
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    gzph_msg = gzph_messages = {
        get: function(name) {
    return (gzph_messages[_gzph_tr.language.toUpperCase()]||gzph_messages['DE'])[name];
        },
        languages: {
            DE: 'Deutsch',
        },
    };
 
// German
gzph_messages['DE'] = {
    gzph_button: "Neues Kapitel erstellen",
    "gzph_form-name": "Geschichte zu "+ wgPageName +" hinzufügen",
    "gzph_form-header": "Name des Kapitels: ",
    "gzph_form-header-placeholder": "Bennene dein Kapitel - 123, 049, 003, Der Beginn einer Reise",
    "gzph_form-kapitel-header": "Schreibe hier dein Kapitel!",
    "gzph_text_placeholder": "Füge hier deine Geschichte ein!",
}
 
var hasModalClass = '';
if('$("body").hasClass("ns-120")') {
 
    window.gzph_name_der_geschichte = '<input style="width: 100%;" id="gzph_name_der_geschichte" name="gzph_name_der_geschichte" placeholder="' + gzph_msg.get('gzph_text_placeholder') + '" tabindex="0"></textarea>'
 
// This opens the form for the users to fill out
 
function GeschichteZuPortalHinzufügen() {
 
gzph_pagenamePiped = wgPageName;
 
setTimeout(function (){
 
setTimeout(function (){
$("#adjustpagetitle").text(gzph_subPageName);
		 }, 1);
 
    $.showCustomModal(gzph_msg.get('gzph_form-name'), '<form class="WikiaForm" method="" name="" id="gzph_Form"><fieldset><span style="font-size:13pt"><span style="opacity: 0.50; font-style:italic; font-size: 10px;" title="">Gib den Namen der Geschichte an - Wenn bspw Geschichte:Reise eines Helden der Name ist, dann gib "Reise eines Helden" (ohne Anführungszeichen) an.</span></span><table cellspacing="0" cellpadding="0" style="width: 100%;" border="0" id="mw-translate-table"><tr><td class="mw-input">' + window.gzph_name_der_geschichte + '</td></tr></table></fieldset></form>', {
        id: "neuesKapitelModal",
        width: 900,
        buttons: [{
    id: "cancel",
    message: "Abbrechen",
    handler: function () {
        gzph_cancelformTranslate();
    }
        }, {
    id: "submit",
    defaultButton: true,
    message: "Zum Portal hinzufügen",
    handler: function () {
        gzph_submitformTranslate();
    }
        }]
    });
		 }, 100);
    }
}
 
// Closes the form
 
function gzph_cancelformTranslate() {
    $("#neuesKapitelModal").closeModal();
}
 
// Submits the form
 
function gzph_submitformTranslate() {
    var $form = $('#gzph_Form'),
        header = $form.find('#request-header').val(),
        gzph_geschichte = $form.find('#gzph_name_der_geschichte').val(); 
        page = 'test' + gzph_geschichte;

    // Making sure the header isn't blank, and a language has been filled in
/*    if (!header) {
        alert("Bitte gib einen Titel an");
        return;
    }
    if (!geschichtentext ) {
        alert('Bitte gib einen Kapiteltext an!');
        return;
    }
*/
 
    // Ajax URL
    var url = _gzph_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(gzph_pagenamePiped) + '&section=new&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_gzph_tr.edittoken) +'&bot=1';
 
//FIXME: get all text from page, and add new box within sort div instead of after end of sort div

    $.post(url, function () {
        window.location.reload();
    });
    setTimeout(gzph_cancelformTranslate(), 1000);
}
//}