/* -------------------------------------------------------------- */
// Variables for later on
// Keep these in an object for organization
var _neuesKapitel_tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};

// fallback: hole posttime falls beim posten nicht geholt wird 
importScriptPage('MediaWiki:Posttime.js', 'de.fanfictions');

neuesKapitel_pagename = wgPageName + '/' + $(".ns-112 a[title^='Geschichte:'].new").html();

$('a[title^="Geschichte"].new').click(function() {
   neuesKapitel_subPageName = $(this).html();
});
setTimeout(function (){
 
$("a[title^='Geschichte:'].new").removeAttr( "href" );
$("a[title^='Geschichte:'].new").attr( "style", "cursor: pointer");
$("a[title^='Geschichte:'].new").after( "&nbsp;<span style='opacity: 0.8; font-style: italic; font-size: 80%; cursor: help;' title='Klicke links auf den roten Link, um die Geschichte zu erstellen!'><img src='https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png' width='10px' height='10px'></img></span>");
 
		 }, 1000);
$(".ns-112 a[title^='Geschichte:'].new").attr('onclick', 'neuesKapitel_openFormTranslate()');
 
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    neuesKapitel_msg = neuesKapitel_messages = {
        get: function(name) {
    return (neuesKapitel_messages[_neuesKapitel_tr.language.toUpperCase()]||neuesKapitel_messages['DE'])[name];
        },
        languages: {
            DE: 'Deutsch',
        },
    };
 
// German
neuesKapitel_messages['DE'] = {
    neuesKapitel_button: "Neues Kapitel erstellen",
    "neuesKapitel_form-name": "Neues Kapitel anlegen" + " - <span id='adjustpagetitle'></span>",
    "neuesKapitel_form-header": "Name des Kapitels: ",
    "neuesKapitel_form-header-placeholder": "Bennene dein Kapitel - 123, 049, 003, Der Beginn einer Reise",
    "neuesKapitel_form-kapitel-header": "Schreibe hier dein Kapitel!",
    "neuesKapitel_text_placeholder": "Füge hier deine Geschichte ein!",
}
 
function count_textarea_nk() {
$('#kapitel_text_editarea').keyup(function() {
    characters_entered_nk = $(this).val().length;
    $('#neues_kapitel_characters span').text(characters_entered_nk);
});
}

var hasModalClass = '';

if('$("body").hasClass("ns-112")') {

    var buttonappend = '<a class="wikia-button" id="wlb-submit" onclick="neuesKapitel_openFormTranslate()">' + neuesKapitel_msg.get('neuesKapitel_button') + '</a>';
    $(".neueGeschichteModal").append(buttonappend);
 
    window.kapitel_text_editarea = '<div style="float: right;" id="neues_kapitel_characters"><span />/3000</div><textarea style="width: 100%; height: 200px;" id="kapitel_text_editarea" name="kapitel_text_editarea" placeholder="' + neuesKapitel_msg.get('neuesKapitel_text_placeholder') + '" tabindex="1"></textarea>'
 
// This opens the form for the users to fill out
 
function neuesKapitel_openFormTranslate() {
if (wgUserName === null) {
window.location = "http://de.fanfictions.wikia.com/wiki/Spezial:Anmelden?returnto=" + wgPageName + "&type=login";
} else {
setTimeout(function() {
count_textarea_nk();
}, 1000);

pagenamePiped = wgPageName + '/' + neuesKapitel_subPageName;
 
setTimeout(function (){

setTimeout(function (){
$("#adjustpagetitle").text(neuesKapitel_subPageName);
		 }, 1);
		 
    $.showCustomModal(neuesKapitel_msg.get('neuesKapitel_form-name'), '<form class="WikiaForm" method="" name="" id="neuesKapitel_Form"><fieldset><!--<strong>' + neuesKapitel_msg.get('neuesKapitel_form-header') + '</strong><input id="request-header" type="text" placeholder="' + neuesKapitel_msg.get('neuesKapitel_form-header-placeholder') + '" style="width: 450px"/><br/><strong><br>--><span style="font-size:13pt">Schreibe hier dein Kapitel!&nbsp;<span style="opacity: 0.50; font-style:italic; font-size: 10px;" title="">Dieses Textfeld wird als <a href="http://mum.wikia.com/wiki/Hilfe:Wikitext">Wikitext</a> gespeichert. Das wichtigste: Ein "normaler" Absatz entsteht durch zwei Mal Enter drücken.</span></span><!--<span title="' + neuesKapitel_msg.get('form-information-request') + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong>--><table cellspacing="0" cellpadding="0" style="width: 100%;" border="0" id="mw-translate-table"><tr><td class="mw-input">' + window.kapitel_text_editarea + '</td></tr></table></fieldset></form>', {
        id: "neuesKapitelModal",
        width: 900,
        buttons: [{
    id: "cancel",
    message: "Abbrechen",
    handler: function () {
        neuesKapitel_cancelformTranslate();
    }
        }, {
    id: "submit",
    defaultButton: true,
    message: "Kapitel erstellen",
    handler: function () {
        neuesKapitel_submitformTranslate();
    }
        }]
    });
		 }, 100);
    }
}
// Closes the form
}
// Closes the logged out function
 
function neuesKapitel_cancelformTranslate() {
    $("#neuesKapitelModal").closeModal();
}
 
// Submits the form
 
function neuesKapitel_submitformTranslate() {
    var $form = $('#neuesKapitel_Form'),
        header = $form.find('#request-header').val(),
        geschichtentext = $form.find('#kapitel_text_editarea').val(),
        page = '{{Geschichtenbalken}}\n\n' + geschichtentext + '\n\n{{Bearbeiter\|1=\n~~' + '~~\n}}';
 
    // Making sure the header isn't blank, and a language has been filled in
/*    if (!header) {
        alert("Bitte gib einen Titel an");
        return;
    }
*/
    if (!geschichtentext ) {
        alert('Bitte gib einen Kapiteltext an!');
        return;
    }
 
    // Ajax URL
    var url = _neuesKapitel_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(pagenamePiped) + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel angelegt';

// überschreibe ältere eingabe
importScriptPage('MediaWiki:Posttime.js', 'de.fanfictions');

storyName = wgPageName.replace("Geschichte:", "");
storyNameL = wgPageName.replace("Geschichte:", "").replace(/_/g, " ");
subpageL = neuesKapitel_subPageName.replace(/ /g, "_");

// setze status auf neu bei übermittlung
neuigkeit_inhalt = '{{Neuigkeiten-Nav}}\n\n<div class="neuigkeiten-nachricht">Ein neues Kapitel von der Geschichte "' + storyNameL + '" wurde veröffentlicht! [http://de.fanfictions.wikia.com/wiki/' + wgPageName + '/' + subpageL + ' Lies direkt das brandneue Kapitel "' + neuesKapitel_subPageName + '" »]<hr><div class="newsfrom">Neuigkeit von: [[Benutzer:' + wgUserName + '|' + wgUserName + ']]</div></div>';


setTimeout(function() {

vorlagenOrt = "Vorlage:Status/" + storyName;

neueNeuigkeitOrt = "Neuigkeiten:" + storyName + "/" + posttime;

setStatusUrl = _neuesKapitel_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(vorlagenOrt) + '&text=' + encodeURIComponent("neu") + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel hinzugefügt';

neueNeuigkeitUrl = _neuesKapitel_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(neueNeuigkeitOrt) + '&text=' + encodeURIComponent(neuigkeit_inhalt) + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel wurde hinzugefügt';

}, 500);
setTimeout(function() {

if (url.length > 4000) {
alert("Du hast das Limit für die Geschichte überschritten. Kürze sie und füge den Rest ein, nachdem die Geschichte erstellt wurde!");
} else { 
    setTimeout(function() {
	$.post(url, function () {
	
    });
	},1000);
	
	setTimeout(function() {
    $.post(setStatusUrl, function () {
	
    });
	},2000);
	
	setTimeout(function() {
    $.post(neueNeuigkeitUrl, function () {
	
    });
	},3000);
	
    setTimeout(neuesKapitel_cancelformTranslate(), 5000);
    setTimeout(function() { 
        window.location = "http://de.fanfictions.wikia.com/wiki/" + pagenamePiped + "?newchapter=1";
    }, 6000);	
	
}
}, 1000);
}

geschichtennameUncapitalized = "not used for kapitel";
if (geschichtennameUncapitalized === undefined) {
geschichtennameUncapitalized = "not used for kapitel";
}