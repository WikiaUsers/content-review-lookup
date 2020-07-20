if (wgUserGroups.indexOf("sysop") == "1" || wgUserName == autor1 || wgUserName == autor2 || wgUserName == autor3) {
if ($("body").hasClass("ns-112")) {
$("head")
.append("<style>.autorenWerkzeugkastenEdit { opacity: 0.5; } .autorenWerkzeugkastenEdit:hover { opacity: 1 !important; } .autorenWerkzeugkastenEdit img { width: 10px; height: 10px; margin-top: -1px; margin-left: 2px; cursor: help; }"
+ ".fww-modal { background: rgb(237, 231, 164); margin-top: -10px; padding: 10px; }"
+ ".fww-modal h1 { border-bottom: 1px solid rgba(0, 0, 0, 0.2); font-size: 16px; }"
+ ".fww-modal .button-row { border-top: 1px solid rgba(0, 0, 0, 0.2); padding-top: 5px; margin-top: 5px; }"
+ "</style>");


// variables
importScriptPage("MediaWiki:ApiKey.js", "translators");
var _aw = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};

var autoren_werkzeugkasten_loaded = 1;

if ( wgUserName == "MehrBot" ) {
var isBot = '&bot=1';
} else {
var isBot = '';
}

function noLogoSpecification() {
// post to wiki

	var url_logo = _api.server + '/api.php?action=edit&title=File:Logo-' + encodeURIComponent(wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '')) + '.png&text=' + encodeURIComponent("#redirect [[:File:AfW8-Nebencharakter_ohne_Bild.png]][[Kategorie:" + "Geschichten ohne Logo]]") + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Logo: Kein Logo' + isBot;
 
	$.post(url_logo, function () {
        setTimeout(function () {
        	window.location.reload();
        }, 1000);
    });

}

//needs to be up here for logo
var aw_geschichtenname = $("#geschichtenname").text();




$('.geschichtenbalken2015').append('<div style="display: none;" id="autorenwerkzeukastenmodal" class="fww-modal"><div><h1>...</h1><div class="fww-modal-intro" /><div class="button-row"><button onclick="$(this).parent().parent().fadeOut()" class="secondary">Abbrechen</button>&nbsp;<button class="fww-save-button" onclick="submitformThemaupdate()">Speichern</button></div></div></div>');

/* entferne -Fanfiction von >selbst ausgedacht< */
if ($("#geschichtenthema_wrapper").text() === "Selbst ausgedacht-Fanfiction") {
$('#geschichtenthema').parent().html('<span id="geschichtenthema" class="geschichtenthema">Selbst ausgedacht</span>');
}

$("#geschichtenthema_wrapper").after('<a title="Klicke hier, um das Thema der Geschichte zu ändern" class="autorenWerkzeugkastenEdit" onclick="aw_geschichtenthema_modal()"><img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png"></img></a>');

$("#geschichtenstatus").append('<a title="Klicke hier, um den Status der Geschichte zu ändern" class="autorenWerkzeugkastenEdit" onclick="aw_geschichtenstatus_modal()"><img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png"></img></a>');

// hinweis zum inaktiv-status
if ($('#geschichtenstatus').text() === "Inaktiv[Mehr Infos]" || $('#geschichtenstatus').text() === "Inaktiv") {

$("#geschichtenstatus").append('<span style="" title="Stimmt dieser Status nicht? Bearbeite die Geschichtenübersicht und setze den Status wieder auf &quot;aktiv&quot;, um zu verhindern, dass der Status in den nächsten 150 Tagen wieder zu inaktiv geändert wird."><a style="opacity: 0.5; margin-left: 3px; background: #FCF8C3; border-radius: 3px; padding: 0px 3px;" href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Hilfe/Status#Warum_steht_bei_meiner_Geschichte_.22inaktiv.22.3F">[Warum?]</a></span>');

} else {

$("#geschichtenstatus").append('<span style="" title="Stimmt dieser Status nicht? Bearbeite die Geschichtenübersicht und setze den Status wieder auf &quot;aktiv&quot;, um zu verhindern, dass der Status in den nächsten 150 Tagen wieder zu inaktiv geändert wird."><a style="opacity: 0.5; margin-left: 3px; background: #FCF8C3; border-radius: 3px; padding: 0px 3px;" href="/wiki/MeerUndMehr:Hilfe/Status">[Mehr Infos]</a></span>');

}

$("#geschichtenfsk-number").append('<a title="Klicke hier, um den FSK der Geschichte zu ändern" class="autorenWerkzeugkastenEdit" onclick="aw_geschichtenfsk_modal()"><img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png"></img></a>');

$(".loadthis-fskhinweise").after('<a title="Klicke hier, um die FSK-Hinweise der Geschichte zu ändern" class="autorenWerkzeugkastenEdit" onclick="aw_geschichtenfskhinweis_modal()"><img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png"></img></a>');

$("#category-entrypoint").append('<a title="Klicke hier, um die Kategorien der Geschichte anzupassen" class="autorenWerkzeugkastenEdit" onclick="aw_kategorien_modal()"><img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png"></img></a>');

setTimeout(function (){
aw_geschichtenbeschreibung_hold = $(".geschichte-beschreibungen").text();

$("div.geschichte-beschreibungen").before('<a class="autorenWerkzeugkastenEdit" onclick="aw_geschichtenbeschreibung_modal()" style="float: left; margin-right: 10px;">Beschreibung bearbeiten <img src="https://images.wikia.nocookie.net/meerundmehr/images/1/10/Pencil_hover.png" style="width: 10px; height: 10px; margin-top: -1px; margin-left: 2px; cursor: pointer; opacity: 0.5;"></img></a>' + '<div class="geschichte-beschreibungen">' + aw_geschichtenbeschreibung_hold + '</div>');
$(".geschichte-beschreibungen + .geschichte-beschreibungen").remove();
}, 1000);

//generelles
var aw_wholePage = $("body");
var aw_geschichtenname = $("#geschichtenname").text();
var aw_geschichtenthema = $("#geschichtenthema").text();
var aw_geschichtenstatus = $("#geschichtenstatus").text();
var aw_geschichtenfsk_raw = $("#geschichtenfsk a").attr("title");
if (aw_geschichtenfsk_raw === undefined) {
var aw_geschichtenfsk = "?";
} else {
var aw_geschichtenfsk = aw_geschichtenfsk_raw.slice("4");
}
var aw_geschichtenbeschreibung = $(".geschichte-beschreibungen").text();

// function filter
// filter letters
$("head").append("<style>.onlyThisLetter + .onlyThisLetter { display: none; } .onlyThisLetter { display: flex; }"
+ ".onlyThisLetter a {"
+ "background: #F3E07D;"
+ "border: 1px solid #F0CE21;"
+ "padding: 2px 8px;"
+ "line-height: 15px;"
+ "word-break: break-all;"
+ "margin-right: -1px;"
+ "float: left;"
+ "margin-bottom: 0;"
+ "margin-top: -1px;"
+ "cursor: pointer;"
+ "color: #111;"
+ "font-size: 12px;"
+ "width: 7px;"
+ "text-align: center;"
+ "text-decoration: none;"
+ "}"

+ ".onlyThisLetter a:hover {"
+ "background: #F0CE21;"
+ "}"

+ "</style>");
function filterOptions() {
$(".clickThema").before('<div style="margin-top: 15px; margin-bottom: -12px;" class="onlyThisLetter">'
+ '<div style="margin: 0;">'
+ '<a style="width: 55px;">Filtern: </a>' 
+ '<a>A</a>'
+ '<a>B</a>'
+ '<a>C</a>'
+ '<a>D</a>'
+ '<a>E</a>'
+ '<a>F</a>'
+ '<a>G</a>'
+ '<a>H</a>'
+ '<a>I</a>'
+ '<a>J</a>'
+ '<a>K</a>'
+ '<a>L</a>'
+ '<a>M</a>'
+ '<a>N</a>'
+ '<a>O</a>'
//+ '<br style="clear: both;"></div><div>'
+ '<a>P</a>'
+ '<a>Q</a>'
+ '<a>R</a>'
+ '<a>S</a>'
+ '<a>T</a>'
+ '<a>U</a>'
+ '<a>V</a>'
+ '<a>W</a>'
+ '<a>X</a>'
+ '<a>Y</a>'
+ '<a>Z</a>'
+ '<a>Ä</a>'
+ '<a>Ö</a>'
+ '<a>Ü</a>'
+ '<a style="width: 31px;">Alle</a><br style="clear: both;">'
+ '</div>'
+ '</div>');


//filter, 2
$(".onlyThisLetter a").click(function() {

letter = $(this).text();
console.log(letter);

$(".clickThema a").each(function () {
name = $(this).text();

if (letter === "Alle" || letter === "Filtern: " ) {
$(this).fadeIn();
} else {
checkForLetter = name.match(new RegExp("\\b" + letter));

if (checkForLetter) {

$(this).fadeIn();

} else {

$(this).fadeOut();

}

}

});

});

}


// Modal geschichtenthema
function ThemaMaintenance() {
}
function aw_geschichtenthema_modal() {

function showClickablesThema() { 
$(".showClickables").click(function() {
var clickThema = '<div style="margin-top: 10px; padding: 10px; border: 1px solid gold; display: block;" class="clickThema">Klicke auf eines der untenstehenden Themen, um es im Eingabefeld einzufügen. Sollte dein Thema nicht dabei sein, dann gib es im Eingabefeld an!<br>' + mum_themenliste_a +
'<br style="clear: both;"></div>';

$(clickThema).appendTo($(this).parent());

filterOptions();

jQuery(function() {
    jQuery('.clickThema a').click(function() {
        titleText = jQuery(this).text();
$(this).parent().parent().find("input").val(titleText);
    });
});
});
}

setTimeout(function (){

    $('#autorenwerkzeukastenmodal').fadeIn();
	$("#autorenwerkzeukastenmodal h1").text('Geschichtenthema ändern');
    $("#autorenwerkzeukastenmodal .fww-modal-intro").html('Momentan hast du das Thema <b>"' + aw_geschichtenthema + '"</b> angegeben, das im Eingabefeld steht. Wenn du es ändern möchtest, gib ein neues Thema an und klicke auf "Aktualisieren".' 
	+ '<div id="thema_form" style="margin-top: 0.25em;">' 
	+ 'Neues Thema: <input id="thema_name" style="width: 200px;"></input>&nbsp;<a class="showClickables button">Verfügbare Themen anzeigen</a>'
	+ '</div>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submitformThemaupdate()');


//pre-fill fields
setTimeout(function (){
showClickablesThema();

$("input#thema_name").val(aw_geschichtenthema);
		 }, 1);

		 }, 100);
// Modal geschichtenthema end
}
// Modal geschichtenthema end

function submitformThemaupdate() {
    var $form = $('#thema_form'),
        thema_neu = $form.find('#thema_name').val(),
thema_seite = "Vorlage:Thema/" + aw_geschichtenname;

// post to wiki

var url_thema = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(thema_seite) + '&text=' + encodeURIComponent(thema_neu) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Thema aktualisiert' + isBot;
 
$.post(url_thema, function () {
        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });


}










// ---------------------------------------------------











// Modal geschichtenstatus
function aw_geschichtenstatus_modal() {

$('.geschichtenbalken2015').append('<div id="geschichtenstatus_modal" class="fww-modal"></div>');

setTimeout(function (){

	$('#autorenwerkzeukastenmodal').fadeIn();
	$("#autorenwerkzeukastenmodal h1").text('Status der Geschichte ändern');
    $("#autorenwerkzeukastenmodal .fww-modal-intro").html('<div id="" style="margin-top: 0.25em;">' 
	+ 'Momentan ist der Status deiner Geschichte <b>"' + aw_geschichtenstatus.replace(/\[(.*)/g, '') + '"</b>. Um ihn zu ändern, wähle einen anderen Status aus und klicke anschließend auf "Aktualisieren".<form class="WikiaForm" method="" name="" id="statusForm"><fieldset><select name="status" id="status" value="?"><option value="" selected="" disabled="">Status wählen</option><option value="aktiv">Aktiv - du bearbeitest die Geschichte weiterhin aktiv</option><option value="pause">Pausierend - du machst noch weiter mit der Geschichte, aber erst später</option><option value="abgeschlossen">Abgeschlossen - deine Geschichte ist fertig und es kommt nichts neues mehr hinzu.</option></select></fieldset></form>'
	+ '</div>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submitformStatusupdate()');


if (wgUserGroups.indexOf("sysop") == "1") { 
$("select#status").append('<option value="inaktiv">Inaktiv - wurde seit über 15 Tagen nicht mehr aktualisiert</option><option value="inaktiv-30">Inaktiv - wurde seit über 15 Tagen nicht mehr aktualisiert (mit entsprechender Zusammenfassung)</option><option value="inaktiv-60">Inaktiv - wurde seit über 60 Tagen nicht mehr aktualisiert (mit entsprechender Zusammenfassung)</option><option value="neu">Neu - es gab in den letzten 15 Tagen ein neues Kapitel</option>'); 
}

//pre-fill fields
setTimeout(function (){
$("input#geschichtenstatus_name").val(aw_geschichtenstatus);
		 }, 1);

		 }, 100);
// Modal geschichtenstatus end
}
// Modal geschichtenstatus end

function submitformStatusupdate() {
    var $form = $('#statusForm'),
        status_neu = $form.find('#status').val(),
status_seite = "Vorlage:Status/" + aw_geschichtenname;
if (status_neu === "inaktiv-30") {
 status_neu = "inaktiv";
 summary = "Status aktualisiert (über 15 Tage nicht mehr bearbeitet)";
} else if (status_neu === "inaktiv-60") {
 status_neu = "inaktiv";
 summary = "Status aktualisiert (über 60 Tage nicht mehr bearbeitet)";
} else {
 summary = "Status aktualisiert";
}

// post to wiki

var url_status = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(status_seite) + '&text=' + encodeURIComponent(status_neu) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=' + summary + isBot;
 
$.post(url_status, function () {
        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });


}










// ---------------------------------------------------











// Modal #geschichtenfsk

function aw_geschichtenfsk_modal() {
if (wgUserName === "MehrBot") { 
fsk_dropdown = '<select name="fsk" id="fsk" value="?"><option value="" selected="" disabled="">FSK wählen</option><option value="0">0+</option><option value="6">6+</option><option value="8">8+</option><option value="12">12+</option><option value="16">16+</option><option value="18">18+</option><option value="?">Nichts angegeben - ? anzeigen</option></select>';
} else {
fsk_dropdown = '<select name="fsk" id="fsk" value="?"><option value="" selected="" disabled="">FSK wählen</option><option value="0">0+</option><option value="6">6+</option><option value="8">8+</option><option value="12">12+</option><option value="16">16+</option><option value="18">18+</option></select>';
}

setTimeout(function (){
 
	$('#autorenwerkzeukastenmodal').fadeIn();
	$('#autorenwerkzeukastenmodal h1').text('FSK der Geschichte ändern');
    $('#autorenwerkzeukastenmodal .fww-modal-intro').html('Momentan ist der FSK deiner Geschichte <b>"' + aw_geschichtenfsk + '"</b>. Um ihn zu ändern, wähle einen anderen FSK aus und klicke anschließend auf "Aktualisieren".<form class="WikiaForm" method="" name="" id="someForm"><fieldset>' + fsk_dropdown + '</fieldset></form>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submitformFSKupdate()');

//pre-fill fields
setTimeout(function (){
$("input#geschichtenfsk_name").val(aw_geschichtenfsk);
		 }, 1);

		 }, 100);
// Modal geschichtenfsk end
}
// Modal geschichtenfsk end

function submitformFSKupdate() {
    var $form = $('#someForm'),
        fsk_neu = $form.find('#fsk').val(),
fsk_seite = "Vorlage:Geschichten-FSK/" + aw_geschichtenname;

// post to wiki

var url_fsk = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(fsk_seite) + '&text=' + encodeURIComponent(fsk_neu) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=FSK aktualisiert' + isBot;
 
$.post(url_fsk, function () {
        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });
}









// ---------------------------------------------------











// Modal #geschichtenbeschreibung 
function aw_geschichtenbeschreibung_modal() {
setTimeout(function (){

	$('#autorenwerkzeukastenmodal').fadeIn();
	$('#autorenwerkzeukastenmodal h1').text('Beschreibung der Geschichte anpassen');
    $('#autorenwerkzeukastenmodal .fww-modal-intro').html('Unten steht die Beschreibung für deine Geschichte. Passe den Text an und klicke anschließend auf "Aktualisieren", wenn du fertig bist.<br><br><form class="WikiaForm" method="" name="" id="someForm"><fieldset><center><textarea tabindex="0" accesskey="," id="beschreibung_textbox" cols="80" rows="25" style="visibility: visible; height: 100px; width: 100%; margin: 0 auto; box-sizing: border-box; padding: 5px 7px;" lang="de" dir="ltr" name="beschreibung_textbox" class="ui-autocomplete-input" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">' + aw_geschichtenbeschreibung + '</textarea></center></fieldset></form>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submitformBeschreibungupdate()');

//pre-fill fields
setTimeout(function (){
$("input#geschichtenbeschreibung_name").val(aw_geschichtenbeschreibung);
		 }, 1);

		 }, 100);
// Modal geschichtenbeschreibung end
}
// Modal geschichtenbeschreibung end
function submitformBeschreibungupdate() {
    var $form = $('#someForm'),
        beschreibung_neu = $form.find('#beschreibung_textbox').val(),
beschreibung_seite = "Vorlage:Beschreibungen/" + aw_geschichtenname;

// post to wiki

var url_beschreibung = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(beschreibung_seite) + '&text=' + encodeURIComponent(beschreibung_neu) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Beschreibung aktualisiert' + isBot;
 
$.post(url_beschreibung, function () {
        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });


}
// //////

function renderFSKHinweiseToModal() {
setTimeout(function() {
	$("#fsk-hinweise-aktuell").load("http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichten-FSK-Hinweise/" + encodeURIComponent(aw_geschichtenname) + "?action=render", null, function() { 
	var box = $(this).find('.loadthis-fskhinweise')
    $("#fsk-hinweise-aktuell").replaceWith(box);
	});
	
	}, 100);
}

// Modal #geschichtenfskhinweis
function aw_geschichtenfskhinweis_modal() {
if (wgUserName === "MehrBot") {
fsk_checkboxes = '<div class="checkboxes"><br><label class="fsk-gewaltdarstellung"><input class="fsk-gewaltdarstellung" type="checkbox" tabindex="21" name="fsk-gewaltdarstellung" id="fsk-gewaltdarstellung">Gewaltdarstellungshinweis aktivieren</label><br><label class="fsk-mystik"><input class="fsk-mystik" type="checkbox" tabindex="21" name="fsk-mystik" id="fsk-mystik">Mystikhinweis aktivieren</label><br><label class="fsk-vulgaersprache"><input class="fsk-vulgaersprache" type="checkbox" tabindex="21" name="fsk-vulgaersprache" id="fsk-vulgaersprache">Vulgärsprachehinweis aktivieren</label><hr><label class="fsk-unbekannt"><input class="fsk-unbekannt" type="checkbox" tabindex="21" name="fsk-unbekannt" id="fsk-unbekannt">Maintenance: Hinweise sind unbekannt</label></div>';
} else {
fsk_checkboxes = '<div class="checkboxes"><br><label class="fsk-gewaltdarstellung"><input class="fsk-gewaltdarstellung" type="checkbox" tabindex="21" name="fsk-gewaltdarstellung" id="fsk-gewaltdarstellung">Gewaltdarstellungshinweis aktivieren</label><br><label class="fsk-mystik"><input class="fsk-mystik" type="checkbox" tabindex="21" name="fsk-mystik" id="fsk-mystik">Mystikhinweis aktivieren</label><br><label class="fsk-vulgaersprache"><input class="fsk-vulgaersprache" type="checkbox" tabindex="21" name="fsk-vulgaersprache" id="fsk-vulgaersprache">Vulgärsprachehinweis aktivieren</label></div>';
}

setTimeout(function (){

	$('#autorenwerkzeukastenmodal').fadeIn();
	$('#autorenwerkzeukastenmodal h1').text('FSK-Hinweise der Geschichte ändern');
    $('#autorenwerkzeukastenmodal .fww-modal-intro').html('Momentan hast du folgende ausgewählt: <span id="fsk-hinweise-aktuell" />'	
    + '<br>Wähle unten aus, welche zukünftig angezeigt werden sollen und klicke anschließend auf "Aktualisieren". Sollte keine der untenstehenden Optionen zutreffen, klicke direkt auf "Aktualisieren", ohne eine Option auszuwählen.<form class="WikiaForm" method="" name="" id="someForm"><fieldset>' + fsk_checkboxes + '</fieldset></form>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submitformFSKHinweiseUpdate()');

//pre-fill fields
setTimeout(function (){
$("input#geschichtenfsk_name").val(aw_geschichtenfsk);
		 }, 1);

		 }, 100);
renderFSKHinweiseToModal()
// Modal geschichtenfsk end
}
// Modal geschichtenfsk end


function submitformFSKHinweiseUpdate() {
//    var $form = $('#someForm'),
//        xfsk_hinweise_values = $form.find('#beschreibung_textbox').val(),
fsk_hinweise_seite = "Vorlage:Geschichten-FSK-Hinweise/" + aw_geschichtenname;

if ($("#fsk-gewaltdarstellung").is(":checked")) {
fsk_gewalt = "|Gewalt=1";
} else {
fsk_gewalt = "";
}
if ($("#fsk-mystik").is(":checked")) {
fsk_mystik = "|Mystik=1";
} else {
fsk_mystik = "";
}
if ($("#fsk-vulgaersprache").is(":checked")) {
fsk_vulgaersprache = "|Vulgaer=1";
} else {
fsk_vulgaersprache = "";
}

fsk_hinweise_values = fsk_gewalt + fsk_mystik + fsk_vulgaersprache;
if (fsk_vulgaersprache + fsk_mystik + fsk_gewalt == '') {
if ($("#fsk-unbekannt").is(":checked")) {
fsk_hinweise_seite_inhalt = "&nbsp;";
} else {
fsk_hinweise_seite_inhalt = "{{Geschichten-FSK-Hinweise|Keine=1}}";
}
} else {
fsk_hinweise_seite_inhalt = "{{Geschichten-FSK-Hinweise" + fsk_hinweise_values + "}}";
}

var url_fsk_hinweise = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(fsk_hinweise_seite) + '&text=' + encodeURIComponent(fsk_hinweise_seite_inhalt) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=FSK-Hinweise aktualisiert' + isBot;

$.post(url_fsk_hinweise, function () {
//        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    })
    .done(function() {
	window.location.reload();
  	})
  	.fail(function() {
	alert("Etwas ging bei der Übertragung schief. Bitte kontaktiere einen Administrator und gib folgenden Text an: \n\nSeite: " + aw_geschichtenname + "\n\nInhalt: " + fsk_gewalt + fsk_mystik);
  	});

// end 
}
//   /////



// Modal #kategorien
function aw_kategorien_modal() {

function showClickablesGenre() { 
$(".showClickables").click(function() {
var clickThema = '<div style="margin-top: 10px; padding: 10px; border: 1px solid gold; display: block;" class="clickThema">Klicke auf eine der untenstehenden Kategorien, um sie im Eingabefeld einzufügen. Sollte deine Kategorie nicht dabei sein, dann gib sie im Eingabefeld an!<br>' + mum_genreliste_a  + 
'<br style="clear: both;"></div>';

$(clickThema).appendTo($(this).parent());

filterOptions();

jQuery(function() {
    jQuery('.clickThema a').click(function() {
        titleText = jQuery(this).text();
$(this).parent().parent().find("input").val(titleText);
    });
});
});
}

setTimeout(function (){
 
$('#autorenwerkzeukastenmodal').fadeIn();
	$("#autorenwerkzeukastenmodal h1").text('Kategorien der Geschichte ändern');
    $("#autorenwerkzeukastenmodal .fww-modal-intro").html('<div class="katIntro">Klicke auf den Button neben dem Eingabefeld um alle bereits existierenden Kategorien anzuzeigen. Sollte keine dabei sein, die zu deiner Geschichte passt, gib eine neue im Eingabefeld an! Klicke anschließend auf "Aktualisieren", wenn du fertig bist.</div><div style="clear: both;"><hr style="margin: 0;"></hr></div>' 
	+ '<div id="katForm"><div id="kat1_form" style="margin-top: 0.25em;">'
	+ 'Neue erste Kategorie: <input id="kat1_name" style="width: 200px;"></input>&nbsp;<a class="showClickables button">Verfügbare Kategorien anzeigen</a></div><div style="clear: both;"></div><div id="kat2_form" style="margin-top: 0.25em;">'
	+ 'Neue zweite Kategorie: <input id="kat2_name" style="width: 200px;"></input>&nbsp;<a class="showClickables button">Verfügbare Kategorien anzeigen</a></div><div style="clear: both;"></div></div>');
	$('#autorenwerkzeukastenmodal .fww-save-button').attr('onclick', 'submit_aw_kategorien_modal()');


//pre-fill fields
setTimeout(function (){
showClickablesGenre();
$("input#kat1_name").val($(".kategorie1").text());
$("input#kat2_name").val($(".kategorie2").text());
		 }, 1);

		 }, 100);
// Modal genre/kategorie end
}
// Modal genre/kategorie end


/* ----------
ABOVE WORKS IF TESTED HERE: http://de.fanfictions.wikia.com/wiki/Geschichte:Test_%C3%A4%C3%B6%C3%BC%C3%9F
----------- */

function submit_aw_kategorien_modal() {
    var $form = $('#katForm'),
        aw_kategorie1 = $form.find('#kat1_name').val(),
aw_kategorie2 = $form.find('#kat2_name').val(),
aw_kategorie1_seite = "Vorlage:Kategorien/" + aw_geschichtenname + "/Kategorie/1",
aw_kategorie2_seite = "Vorlage:Kategorien/" + aw_geschichtenname + "/Kategorie/2";

var url_kategorie1 = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(aw_kategorie1_seite) + '&text=' + encodeURIComponent(aw_kategorie1) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Kategorie 1 aktualisiert' + isBot;

var url_kategorie2 = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent(aw_kategorie2_seite) + '&text=' + encodeURIComponent(aw_kategorie2) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Kategorie 2 aktualisiert' + isBot;

if (wgUserName === "MehrBot") { 
$.post(url_kategorie1, function () {
//        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });
$.post(url_kategorie2, function () {
        $('*').css('cursor', 'wait');
		setTimeout(function()  {
			window.location.reload();
		}, 2000);
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });
} else {
if (!aw_kategorie1 || !aw_kategorie2) {
alert("Bitte wähle ein zweites Genre.");
} else { 

$.post(url_kategorie1, function () {
//        window.location.reload();
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });
$.post(url_kategorie2, function () {
        $('*').css('cursor', 'wait');
		setTimeout(function()  {
			window.location.reload();
		}, 2000);
// window.location = _aw.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite);
    });
}
}
// end 
}

// ENDE KATEGORIE MODAL

//   /////

// geschichtenbalken bearbeiten test 
// if (wgArticleId === 13534) { --- test remove
gb_liste = '<a onclick="aw_geschichtenthema_modal()">Thema</a><br><a onclick="aw_geschichtenfsk_modal()">FSK</a><br><a onclick="aw_geschichtenfskhinweis_modal()">FSK-Hinweise</a><br><a onclick="aw_kategorien_modal()">Kategorien</a><br><a onclick="aw_geschichtenstatus_modal()">Status</a><br><a target="_blank" href="http://de.fanfictions.wikia.com/wiki/Spezial:Hochladen?wpDestFile=Logo-' + aw_geschichtenname + '.png&wpForReUpload=1">Logo</a><br><a onclick="aw_geschichtenbeschreibung_modal()">Beschreibung</a>';

function show_autoren_werkzeugkasten_box() {
$("section#WikiaRecentActivity").before('<div class="module"><div id="gb_liste" style="line-height: 24px;"><h2 style="margin-top: 0; line-height: 0; margin-bottom: 30px;">Geschichtenbalken bearbeiten</h2><div style="cursor: pointer">' + gb_liste + '</div></div></div>');
}

/* geschichtenbalken step by step */
$.when(autoren_werkzeugkasten_loaded === "1").done(function() {

	$("#geschichtenbalken_bearbeiten_info + #geschichtenbalken_bearbeiten_info").remove();

	$('.geschichtenbalken-wrapper').before('<div id="geschichtenbalken_bearbeiten_info" style="background-color: #F3E07D; border: 1px solid #F0CE21; padding: .5em .75em;"></div>');
	
	$('.geschichtenbalken-wrapper').prepend('<div style="background-color: #F3E07D; border: 1px solid #F0CE21; padding: 0.5em 0.75em;">Du kannst alle Angaben jederzeit über den Autoren-Werkzeugkasten nachbearbeiten: <a class="button" onclick="show_autoren_werkzeugkasten_box()">Angaben bearbeiten</a>');

	url_img_icon_info = "https://images.wikia.nocookie.net/__cb20141206163551/meerundmehr/images/2/21/Mum_icon_info.png";
	url_img_icon_success = "https://images.wikia.nocookie.net/__cb20141206193632/meerundmehr/images/5/59/Mum_icon_success.png";
	img_icon_style = "width: 50px; padding: 0 1.5em 0 1em;";

	geschichtenbalken_bearbeiten_info_generisch = 'Hallo ' + wgUserName + '! Wenn du die Informationen in deinem Geschichtenbalken vervollständigen oder nachbearbeiten möchtest, dann klicke <a onclick="show_autoren_werkzeugkasten_box()">hier</a> und wähle anschließend rechts neben dem Geschichtenbalken das aus, welches Element du bearbeiten möchtest. Solltest du einen Fehler entdecken, melde ihn bitte <a href="http://de.fanfictions.wikia.com/wiki/Diskussionsfaden:16289">hier</a>!';
	
	geschichtenbalken_bearbeiten_info_ende = 'Großartig, ' + wgUserName + '! Du hast es geschafft: Der Geschichtenbalken deiner Geschichte ist komplett fertig! Ab jetzt kannst du jederzeit alle Angaben nachbearbeiten oder noch weitere Funktionen freischalten! Viel Erfolg mit deiner Geschichte.<br><a onclick="show_autoren_werkzeugkasten_box()">Angaben des Geschichtenbalkens nachbearbeiten</a>';
	
	geschichtenbalken_step_beschreibungen = 'Super, ' + wgUserName + '! Deine Geschichte ist jetzt veröffentlicht. Als nächstes solltest du dem Leser mit deinem Beschreibungstext zeigen, worum es in deiner Geschichte geht. Schreibe kurz und bündig, worauf sich deine Leser freuen können! <a onclick="aw_geschichtenbeschreibung_modal()">Klicke hier, um eine Beschreibung für deine Geschichte einzufügen.</a>';
	
	geschichtenbalken_step_thema = 'Soweit, sogut ' + wgUserName + '! Nach der Beschreibung kommt als nächstes die Wahl deines Themas. Dein Thema ist, worüber du deine Geschichte oder Fanfiction schreibst - und bestimmt, in welchem Portal sie auftaucht. <a onclick="aw_geschichtenthema_modal()">Klicke hier, um ein Thema für deine Geschichte anzugeben.</a>';

	geschichtenbalken_step_kategorie = 'Schau an, deine Geschichte hat jetzt das Thema ' + $("#geschichtenthema").text() + ', ' + wgUserName + '! Als nächstes sind die Kategorien dran: Wähle zwei für deine Geschichte oder Fanfiction passende Kategorien aus! <a onclick="aw_kategorien_modal()">Klicke hier, um die Kategorien auszuwählen.</a>';
	
	geschichtenbalken_step_logo = 'Bereit für etwas Grafisches? Als nächstes kannst du, wenn du möchtest, ein Logo für deine Geschichte hochladen. <a href="http://de.fanfictions.wikia.com/wiki/Spezial:Hochladen?wpDestFile=Logo-' + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + '.png&wpForReUpload=1">Klicke hier, um ein Logo für deine Geschichte hochzuladen</a> oder alternativ, <a onclick="noLogoSpecification()">klicke hier, wenn du kein Logo nutzen möchtest.</a>';
	
	geschichtenbalken_step_fsk = 'Gute Wahl für dein Logo! Jetzt kommen wir zur Alterseinstufung: Welchen FSK hat deine Geschichte? <a onclick="aw_geschichtenfsk_modal()">Klicke hier, um einen FSK anzugeben.</a>';

	geschichtenbalken_step_fsk_hinweise = 'Schließen wir den FSK-Teil ab: Gibt es deutliche Warnhinweise für den Leser? Wähle aus, was für deine Geschichte oder Fanfiction zutrifft - wenn keins dabei ist, dann kann jeder deine Geschichte lesen! <a onclick="aw_geschichtenfskhinweis_modal()">Klicke hier, um die FSK-Hinweise zu bestimmen.</a>';
	
	newChapterNotice = 'Super, dein neues Kapitel ist jetzt online! Vergiss nicht, deinen Bekannten zu erzählen, dass du etwas Neues geschrieben hast. Sie lesen bestimmt gerne mal rein! Zusätzlich, wenn du magst, kannst du das auch <a href="http://de.fanfictions.wikia.com/wiki/Diskussionsfaden:17613">unserem Forum mitteilen.</a> Wenn du dort einen Twitter- oder Facebook-Link zu deiner geteilten Nachricht gibst, können wir sie auf unseren sozialen Medien-Seiten weiterteilen! (Sofern du die Nachricht öffentlich geteilt hast)';
	
	/* definiere ob etwas existiert */
	
	/* basis 
	$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 
			console.log("existiert");
			
		})
		.fail(function () {
		
			console.log("existiert nicht");
		
	});
	*/
	
	/* beschreibung */
	$.get( "http://de.fanfictions.wikia.com/wiki/Vorlage:Beschreibungen/" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_beschreibungen = "vorhanden";
			console.log("beschreibung existiert");
			
		})
		.fail(function () {
			awk_beschreibungen = "fehlt";
			console.log("awk beschreibungen existiert nicht");
		
	});

	/* thema */
	$.get( "http://de.fanfictions.wikia.com/wiki/Vorlage:Thema/" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_thema = "vorhanden";
			console.log("thema existiert");
			
		})
		.fail(function () {
			awk_thema = "fehlt";
			console.log("awk thema existiert nicht");
		
	});
	
	/* kategorie, genre */
	
	$.get( "http://de.fanfictions.wikia.com/wiki/Vorlage:Kategorien/" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "/Kategorie/1?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_kategorie = "vorhanden";
			console.log("kategorie existiert");
			
		})
		.fail(function () {
			awk_kategorie = "fehlt";
			console.log("awk kategorie existiert nicht");
		
	});
	
	/* logo */
	
	$.get( "http://de.fanfictions.wikia.com/wiki/File:Logo-" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + ".png?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_logo = "vorhanden";
			console.log("logo existiert");
			
		})
		.fail(function () {
			awk_logo = "fehlt";
			console.log("awk logo existiert nicht");
		
	});

	/* fsk */
	
	$.get( "http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichten-FSK/" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_fsk = "vorhanden";
			console.log("fsk existiert");
			
		})
		.fail(function () {
			awk_fsk = "fehlt";
			console.log("awk fsk existiert nicht");
		
	});

	$.get( "http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichten-FSK-Hinweise/" + wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '') + "?action=render" )
		.done(function() {
 
			// nothing
			console.log("fertig");
 
		})
		.success(function() {
 			awk_fsk_h = "vorhanden";
			console.log("fsk_h existiert");
			
		})
		.fail(function () {
			awk_fsk_h = "fehlt";
			console.log("awk fsk_h existiert nicht");
		
	});

	setTimeout(function () {
	
		if (awk_beschreibungen === "fehlt") {

			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_beschreibungen + '</td></tr></table>');

progressbar_width = "14%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);
	
		}

		else if (awk_thema === "fehlt") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_thema + '</td></tr></table>');

progressbar_width = "29%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);
		
		}

		else if (awk_kategorie === "fehlt") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_kategorie + '</td></tr></table>');

progressbar_width = "42%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);
		
		}

		else if (awk_logo === "fehlt") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_logo + '</td></tr></table>');

progressbar_width = "57%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);
		
		}

		else if (awk_fsk === "fehlt") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_fsk + '</td></tr></table>');
		
progressbar_width = "71%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);

		}
		
		else if (awk_fsk_h === "fehlt") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_info + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_step_fsk_hinweise + '</td></tr></table>');
		
progressbar_width = "85%";
progressbar_0 = '<div class="geschichte_progressbar" style="background: rgba(0,0,0,0.1);"><span style="position: relative; display: block; background: rgb(240, 206, 33); border-right: 0px solid darkgreen; width: ' + progressbar_width + '">&nbsp;&nbsp;' + progressbar_width + ' erledigt <img style="width: 17px;" src="' + url_img_icon_success + '" border="0"></span></div>';

$("#geschichtenbalken_bearbeiten_info").append(progressbar_0);

		}

		else if (awk_fsk_h === "vorhanden") {
		
			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td><img src="' + url_img_icon_success + '" style="' + img_icon_style + '"></img></td><td>' + geschichtenbalken_bearbeiten_info_ende + '</td></tr></table>');
		
		}

		else {

			$("#geschichtenbalken_bearbeiten_info").html('<table><tr><td>' + geschichtenbalken_bearbeiten_info_generisch + '</td></tr></table>');
	
		}
		
	}, 1000);


	$("#geschichtenbalken_bearbeiten_info + #geschichtenbalken_bearbeiten_info").remove();
	
});
/* end geschichtenbalken step by step */

/* "geschichtenbalken fehlt"-hinweis */
function geschichtenbalkenHinzufuegen() {

var url_geschichtenbalken_add = _api.server + '/api.php?action=edit&title=' + encodeURIComponent(wgPageName) + '&prependtext=' + encodeURIComponent("{{Geschichtenbalken}}\n\n") + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Geschichtenbalken eingefügt' + isBot;
 
	$.post(url_geschichtenbalken_add, function () {
        setTimeout(function () {
        	window.location.reload();
        }, 1000);
    });

}

$.when(autoren_werkzeugkasten_loaded === "1").done(function() {
setTimeout (function() {

if ($('body').hasClass('ns-112') && $('.geschichtenbalken-wrapper').text() <= 1) {

$('.WikiaArticle').prepend(''

+ '<div id="geschichtenbalken_bearbeiten_info" style="background-color: #F3E07D; border: 1px solid #F0CE21; padding: .5em .75em;"><table><tbody><tr><td><img src="https://images.wikia.nocookie.net/__cb20141206163551/meerundmehr/images/2/21/Mum_icon_info.png" style="width: 50px; padding: 0 1.5em 0 1em;"></td><td>Oh nein! Hier fehlt der Geschichtenbalken! Wenn der Geschichtenbalken nicht in der Geschichte ist, werden keine Kapitel deiner Geschichte gezählt, taucht deine Geschichte in keinem Portal auf (weder Genre noch Thema) und der Leser kann nicht wissen, welche Hinweise deine Geschichte hat!<br>Klicke diesen Button, um den Geschichtenbalken automatisch einzufügen: <a class="button"  onclick="geschichtenbalkenHinzufuegen()">Geschichtenbalken einfügen</a></td></tr></tbody></table></div>'

+ '');

}

}, 1000);
});

// } --- test remove

if ( wgUserName == "MehrBot" ) {
$(".WikiaHeader nav").prepend('<div id="mehrbot_org" style="opacity: 0.5;"><div style="font-size: 12px; max-width: 200px; float: left; margin-right: 10px; padding: 5px 0px 0px 5px; height: 28px; overflow: auto;" title="' + aw_geschichtenname + '">' + aw_geschichtenname + '</div> <div <span style="font-size: 12px">Vorgestellt-Portal:</span> <button style="background: #a0a000; box-shadow: 0 -10px 15px -5px rgba(0, 0, 0, 0.5) inset;" onclick="" id="FeaturedButton" title="Zu Vorgestellt-Portal hinzufügen">+-</button>&nbsp;&nbsp;<button onclick="aw_geschichtenstatus_modal()">Status</button>&nbsp;&nbsp;<button onclick="aw_kategorien_modal()">Kategorien</button>&nbsp;&nbsp;<button onclick="aw_geschichtenfskhinweis_modal()">Hinweisbilder</button></div>');

$("#mehrbot_org").clone().prependTo("#WikiaBarWrapper").wrap('<div style="background: darkgreen; padding: 5px; color: white;"></div>');
$("#WikiaBarWrapper").css("height", "55px");

if ($("*").hasClass("notexisting")) {
$(".geschichtenbalken2013").before('<div id="notexisting_box" style="border: 2px solid red; padding: 10px; margin-bottom: 10px;"></div>');

$("#notexisting_box").append('<button onclick="createMissingGeschichtenbalken()">Normaler Geschichten-Balken</button> -- <button onclick="createMissingKurzGeschichtenbalken()">Kurzgeschichtenbalken</button>');

function createMissingKurzGeschichtenbalken() {
var KGBalken = '{{Geschichten-Info\n<!-- unter dieser Linie nichts verändern -->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + aw_geschichtenname + '\n|Kurzgeschichte=1\n}}<noinclude>[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>';
var url_KGBalken = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent('Vorlage:Geschichtenbalken/' + aw_geschichtenname) + '&text=' + encodeURIComponent(KGBalken) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Geschichtenbalken angelegt: Kurzgeschichte' + isBot;
 
$.post(url_KGBalken, function () {
        window.location.reload();
    });
}

function createMissingGeschichtenbalken() {
var GBalken = '{{Geschichten-Info\n<!------------- - - ------------->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + aw_geschichtenname + '\n}}<noinclude>[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>';

var url_GBalken = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent('Vorlage:Geschichtenbalken/' + aw_geschichtenname) + '&text=' + encodeURIComponent(GBalken) + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Geschichtenbalken angelegt: Geschichte' + isBot;
 
$.post(url_GBalken, function () {
        window.location.reload();
    });
}

// END NOEXISTING 
}
// END NOEXISTING 





// feautre story

function featureStory() {
//aw_geschichtenname

var url_status_vorgestellt = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent('Vorlage:Status-Vorgestellt/' + aw_geschichtenname) + '&text=' + encodeURIComponent('<noinclude>__NOINDEX__Diese Seite wird automatisch erzeugt und ebenso aktualisiert. Bitte nicht löschen oder verändern.</noinclude>[[Kategorie:Vorgestellt-Portal]]') + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Geschichte in Vorgestellt-Portal eingefügt' + isBot;
 
$.post(url_status_vorgestellt, function () {
        window.location.reload();
    });
}
function unFeatureStory() {
var url_status_vorgestellt = _aw.server + '/api.php?action=edit&title=' + encodeURIComponent('Vorlage:Status-Vorgestellt/' + aw_geschichtenname) + '&text=' + encodeURIComponent('<noinclude>__NOINDEX__Diese Seite wird automatisch erzeugt und ebenso aktualisiert. Bitte nicht löschen oder verändern.</noinclude>') + '&token=' + encodeURIComponent(_aw.edittoken) + '&summary=Geschichte aus Vorgestellt-Portal entfernt' + isBot;
 
$.post(url_status_vorgestellt, function () {
        window.location.reload();
    });
}

}

/* check if new chapter */

$(window).ready(function () {
	setTimeout(function() {
		if (location.search.match(/\?newchapter\=1/g) !== null ) {
			$("#geschichtenbalken_bearbeiten_info td:last-child").html(newChapterNotice);
		} else {
			// do nothing
		}
	}, 1000);
});

/* box mit kapiteln */
function addStoryAutokat() {
// post to wiki
	var url_autokat = _api.server + '/api.php?action=edit&title=Kategorie:' + encodeURIComponent(wgPageName.replace('Geschichte:', '').replace(/\/(.*)/g, '')) + '_-_Geschichten&text=' + encodeURIComponent("{{Kategorie/Geschichten/preload}}") + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Auto-Kategorie der Geschichte angelegt' + isBot;
 
	$.post(url_autokat, function () {
        setTimeout(function () {
        	window.location.reload();
        }, 1000);
    });

}

$("#autokat_missing a").removeAttr("href").attr("onclick", "addStoryAutokat()");
/* closes everything */
}
 
} else { }