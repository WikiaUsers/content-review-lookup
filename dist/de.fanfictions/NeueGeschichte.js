/* to do 

fix annoyingness: after updating the script at 15:49, and removing the first post of {{Geschichtenbalken}}, it stopped posting the 2nd entry - which also uses {{}}. 

it is not about using these, it is about the first being ignored no matter what you enter.

proposed solution: add empty query with {{}} beforehand.

*/
/* -------------------------------------------------------------- */
/*

geschrieben für http://de.fanfictions.wikia.com
nutzung auf dritten seiten ausdrücklich NICHT erlaubt.

*/
/* -------------------------------------------------------------- */
KategorieListe = "Bisher vorhanden: Horror, Abenteuer, Humor, Fantasy, Hack and Slay, Science Fiction. Dein Genre noch nicht dabei? Dann gib es an!";

// Variables for later on
// Keep these in an object for organization
var _tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages[_tr.language.toUpperCase()]||messages['DE'])[name];
        },
        languages: {
            DE: 'Deutsch',
        },
    };
 
// German
messages['DE'] = {
 
}
 
var fskoptions = {
            0: '0+',
            6: '6+',
            8: '8+',
            12: '12+',
            16: '16+',
            18: '18+',
        }

var hasModalClass = '';
if('$("body").hasClass("ns-112")'|| '$("body.mainpage")' ) {
    var buttonappend = '<a class="wikia--button" id="wlb-submit" href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Neue_fortlaufende_Geschichte">Neue Geschichte erstellen</a>';
    $(".contribute .WikiaMenuElement").prepend("<li style='background: #ffb;'>" + buttonappend + "</li>");

// for mainpage
$("#GeschichteErstellenModal a").attr("href", "http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Neue_fortlaufende_Geschichte"); 
//

    window.geschichten_handlung_editarea = '<textarea style="width: 100%; height: 100px;" id="geschichten_handlung_editarea" name="geschichten_handlung_editarea" placeholder="Füge hier deine Handlung ein!"></textarea>'
 
    window.dropdown = '<select name="fsk" id="fsk" value="?">';
    dropdown += '<option value="" selected disabled>FSK wählen</option>';
    for (var i in fskoptions) {
        dropdown += '<option value="'+i+'">'+fskoptions[i]+'</option>';
    }
    dropdown += '</select>';
 
    window.dropdown2 = '<select name="language2" id="language2" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
    dropdown2 += '<option value="" selected disabled>' + msg.get('form-language-choose') + '</option>';
    for (var i in msg.languages) {
        dropdown2 += '<option value="'+i+'">'+msg.languages[i]+'</option>';
    }
    dropdown2 += '</select>';

/*  define some functions */
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
$(".clickThema").after('<div class="onlyThisLetter">'
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

function showClickablesThema() { 
$(".showClickablesThema").click(function() {
var clickThema = '<div style="margin-top: 10px; padding: 10px; border: 1px solid gold; display: block;" class="clickThema">Klicke auf eines der untenstehenden Themen, um es im Eingabefeld einzufügen. Sollte dein Thema nicht dabei sein, dann gib es im Eingabefeld an!<br><div style="overflow: auto; height: 130px;">' + mum_themenliste_a +
'<br style="clear: both;"></div></div>';

$(clickThema).appendTo($(this).parent());

filterOptions();

$(".clickThema").click(function (){
$(this).delay( 01000 ).fadeOut("slow");
});

jQuery(function() {
    jQuery('.clickThema > a').click(function() {
        titleText = jQuery(this).text();
$("#thema_name").val(titleText);
    });
});
});
}

function showClickablesGenre() { 
$(".showClickables").click(function() {
var clickGenre = '<div style="margin-top: 10px; padding: 10px; border: 1px solid gold; display: block;" class="clickThema">Klicke auf eine der untenstehenden Kategorien, um sie im Eingabefeld einzufügen. Sollte deine Kategorie nicht dabei sein, dann gib sie im Eingabefeld an!<br>' + mum_genreliste_a  + 
'<br style="clear: both;"></div>';

$(clickGenre).appendTo($(this).parent());

filterOptions();

$(".clickThema").click(function (){
$(this).delay( 01000 ).fadeOut("slow");
});

jQuery(function() {
    jQuery('.clickThema a').click(function() {
        titleText = jQuery(this).text();
$(this).parent().parent().find("input").val(titleText);
    });
});
});
}

setTimeout(function (){
 
$("#placeKatSectionHere").replaceWith('Klicke auf den Button neben dem Eingabefeld um alle bereits existierenden Kategorien anzuzeigen. Sollte keine dabei sein, die zu deiner Geschichte passt, gib eine neue im Eingabefeld an! Klicke anschließend auf "Aktualisieren", wenn du fertig bist.<hr>' +
'<div id="katForm"><div id="kat1_form" style="margin-top: 0.25em;">' +
'Neue erste Kategorie: <input id="kat1_name" style="width: 200px;"></input>&nbsp;<a class="showClickables button">Verfügbare Kategorien anzeigen</a></div><div style="clear: both;"></div><div id="kat2_form" style="margin-top: 0.25em;">' +
'Neue zweite Kategorie: <input id="kat2_name" style="width: 200px;"></input>&nbsp;<a class="showClickables button">Verfügbare Kategorien anzeigen</a></div><div style="clear: both;"></div></div>');

//pre-fill fields
setTimeout(function (){
showClickablesGenre();
showClickablesThema();
		 }, 1);

		 }, 1000);



/* page */
if (wgArticleId === 16435) {
$("body").append('<style>#fortlaufende_geschichte_form input, #fortlaufende_geschichte_form textarea { box-sizing: border-box; } .flex-label { order: 1; flex-grow: 0; margin-right: 6px; } .flex-input { order: 2; flex-grow: 1; }</style>');

if (wgUserName === null) {
window.location = "http://de.fanfictions.wikia.com/wiki/Spezial:Anmelden?returnto=" + wgPageName + "&type=login";
} else {

setTimeout(function (){
$("#mw-content-text").html('<form class="WikiaForm" method="" name="" id="fortlaufende_geschichte_form" style="width: 99%; margin: 0 auto;"><fieldset><strong><i>Diese Funktion ist neu. Solltest du Fehler entdecken, melde sie Bitte einem Administrator</i><h2>Name deiner Geschichte</h2><span style="opacity: 0.5; font-style: italic;">Nicht vergessen - in der Kürze liegt die Würze - insbesondere beim Geschichtennamen</strong><input id="geschichten_name" type="text" placeholder="Benenne deine Geschichte - Die Abenteuer des skurrilen Bleistiftes, Kunterbunt im Regenbogenland" style="width: 100%; font-size: 16px; height: 30px;"/><br/><br><h2>Handlung deiner Geschichte - Kurzzusammenfassung</h2>Schreibe hier über die Handlung - worum geht es in deiner Geschichte?' + window.geschichten_handlung_editarea + '<table cellspacing="0" cellpadding="0" style="width: 100%;" border="0" id=""><tr><td style="width: 49%; vertical-align: top;" class="mw-input">' +


// charaktere
'<div id="charaktere-container"><h2>Welche Charaktere kommen in der Geschichte vor?</h2><input id="charakter_1_name" type="text" placeholder="Hier Charakter eintragen" style="width: 100%;"/><br/><input id="charakter_2_name" type="text" placeholder="Hier Charakter eintragen" style="width: 100%;"/><br/><input id="charakter_3_name" type="text" placeholder="Hier Charakter eintragen" style="width: 100%;"/><br/><input id="charakter_4_name" type="text" placeholder="Hier Charakter eintragen" style="width: 100%;"/><br/></div>' +

// autoren
'<div id="autoren-container"><h2>Autor(en) angeben</h2>Jeden, den du als Autor angibst, hat später die Möglichkeit, Informationen über die Geschichte zu bearbeiten, Neuigkeiten zu veröffentlichen oder neue Kapitel hinzuzufügen. Stelle sicher, dass du den Namen des Benutzerkontos angibst.<hr><div style="display: flex;"><div class="flex-label">Autor 1:</div><div class="flex-input"><input id="autor_1_name" type="text" placeholder="Hier den Benutzernamen des Autoren eintragen" value="' + wgUserName + '" style="width:100%;"/></div><div class="flex-label" style="order: 3; opacity: 0.5; margin-right: 0; margin-left: 6px;">← Das bist du</div></div><div style="display: flex;"><div class="flex-label">Autor 2:</div><div class="flex-input"><input id="autor_2_name" type="text" placeholder="Optional: Benutzernamen des zweiten Autors eintragen" style="width:100%;"/></div></div><div style="display: flex;"><div class="flex-label">Autor 3:</div><div class="flex-input"><input id="autor_3_name" type="text" placeholder="Optional: Benutzernamen des dritten Autors eintragen" style="width:100%;"/></div></div></div>' +

// fsk
'<div id="fsk-container"><h2>Gib den FSK deiner Geschichte an</h2>' + window.dropdown + '</div>' +

// col 1 end
'</td>' + 

//margin col
'<td style="width: 2%;"></td>' +

//Thema
'<td style="width: 49%; vertical-align: top;"><div id="thema-container"><h2>Thema deiner Geschichte</h2>Zu welchem Thema schreibst du? Eine Fanfiction über One Piece? Eine Geschichte über einen Hasen und einen Igel?</span><br><input id="thema_name" type="text" placeholder="One Piece, Naruto, Mario, Selbst ausgedacht, ..." style="width:100%;"/><br><a class="showClickablesThema button">Verfügbare Themen anzeigen</a></div>' +

// Kategorien 
'<div id="kategorie_abschnitt"><h2>Kategorien deiner Geschichte</h2>Welchen Kategorien gehört deine Geschichte an? Ist sie gruselig, dann passt "Horror". Ist sie lustig, dann passt Humor. <div id="placeKatSectionHere"></div></div>' +

// table end
'</td></tr></table></fieldset></form><br><div style="float: right;" class="createbuttons"><a href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr?ref=Kurzgeschichte_erstellen_abbrechen"><button class="wikia-button secondary" id="cancel">Zurück zur Hauptseite</button></a>&nbsp;<button onclick="submit_longstory()">Geschichte starten</button></div>');
// Closes the form
}, 100);
// Closes the if user logged out
 
function cancelformTranslate() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
}
}
 }
 
function submit_longstory() {
        $form = $('#fortlaufende_geschichte_form');
        header = $form.find('#request-header').val();
        geschichten_handlung = $form.find('#geschichten_handlung_editarea').val();
        lang = $form.find('#language').val();
        lang2 = $form.find('#language2').val();
        wikiurl = $form.find('#wiki-url').val();
        items = $form.find('#items').val();
        extrainfo = $form.find('#extrainfo').val();
        signatureplace = $form.find('#signature-place').val();
        fsk = $form.find('#fsk').val();
        charakter_1 = $form.find('#charakter_1_name').val();
        charakter_2 = $form.find('#charakter_2_name').val();
        charakter_3 = $form.find('#charakter_3_name').val();
        charakter_4 = $form.find('#charakter_4_name').val();
        page = '{{Geschichtenbalken}}\n\n\{{Neuigkeitenmodul}}\n\n\=\=Handlung\=\=\n{{Beschreibungen/{{PAGENAME}}}}\n\n\=\=Kapitel\=\=\n*{{Kapitel|001}}\n*{{Kapitel|002}}\n*{{Kapitel|003}}\n*{{Kapitel|004}}\n*{{Kapitel|005}}\n\n\=\=Informationen über Charaktere\=\=\n*[[' + charakter_1 + ']]\n*[[' + charakter_2 + ']]\n*[[' + charakter_3 + ']]\n*[[' + charakter_4 + ']]\n\n{{Bearbeiter\|1=\n~~' + '~~\n}}';
// ****** custom to neue geschichte ******
var geschichtennameUncapitalized = $form.find('#geschichten_name').val();
 
var geschichtenname = geschichtennameUncapitalized.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
 
geschichtenübersicht_seite = "Geschichte:" + geschichtenname;
 
geschichtenbalken_description_url2 = geschichten_handlung;
beschreibung_seite = "Vorlage:Beschreibungen/" + geschichtenname;

fsk_seite = "Vorlage:Geschichten-FSK/" + geschichtenname;

neuigkeiten_seite = "Neuigkeiten:" + geschichtenname;
 
geschichtenbalken_seite = "Vorlage:Geschichtenbalken/" + geschichtenname;
geschichtenbalken_info = '{{Geschichten-Info 2013\n<!------------- - - ------------->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + geschichtenname + '\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten}}[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>';
 
thema = $form.find('#thema_name').val();
thema_seite = "Vorlage:Thema/" + geschichtenname;
 
status_seite = "Vorlage:Status/" + geschichtenname;
 
autor_1 = $form.find("#autor_1_name").val();
autor_2 = $form.find("#autor_2_name").val();
autor_3 = $form.find("#autor_3_name").val();
 
autor_url = "Vorlage:Autoren/" + geschichtenname + "/Autor/"

kategorie_1 = $form.find("#kat1_name").val();
kategorie_2 = $form.find("#kat2_name").val();
// fragment - stops working if removed
kategorie_3 = '';
 
kategorie_url = "Vorlage:Kategorien/" + geschichtenname + "/Kategorie/"
 
   var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            var d = today.getDate();
            var mo = today.getMonth()+1;
            var y = today.getFullYear();
             if(s<10){
                 s = "0"+s;
             } if(m<10){
                 m = "0"+m;
             } if(d<10){
                 d = "0"+d;
             } if(mo<10){
                 mo = "0"+mo;
             }
             posttime = y+mo+d+h+m+s;
    // Making sure the header isn't blank, and a language has been filled in
    if (!geschichtennameUncapitalized) {
        alert("Du musst deine Geschichte benennen!");
        return;
    }
/* 
    if (!geschichtentext ) {
        alert('Bitte gib einen Kapiteltext an!');
        return;
    }
*/ 
if (page.length > 2000) {
alert("Hoppla! Es scheint, als wäre deine Übersicht zu groß, um übermittelt zu werden - kopiere den Handlungsteil heraus und füge ihn nachdem die Seite erstellt wurde im Abschnitt „Handlung“ ein!"); 
} else {
$("*").css("cursor", "progress");
    // Ajax URL
    var url_uebersicht = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(geschichtenübersicht_seite) + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Geschichtenübersicht aktualisiert&bot=1';

    var url = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(geschichtenübersicht_seite) + '&text=' + encodeURIComponent("Seite erstellt") + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Geschichtenübersicht angelegt';
 
    var url2 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(beschreibung_seite) + '&text=' + encodeURIComponent(geschichtenbalken_description_url2) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Beschreibung angelegt';
 
    var url3 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(geschichtenbalken_seite) + '&text=' + encodeURIComponent(geschichtenbalken_info) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Geschichtenbalken angelegt';
 
    var url4 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(thema_seite) + '&text=' + encodeURIComponent(thema) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Thema angelegt';
 
    var url_status = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(status_seite) + '&text=' + encodeURIComponent("neu") + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Status aktualisiert';
 
 
    var url_autor_1 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(autor_url) + '1' + '&text=' + encodeURIComponent(autor_1) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Autor 1 angegeben';
    var url_autor_2 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(autor_url) + '2' + '&text=' + encodeURIComponent(autor_2) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Autor 2 angegeben';
    var url_autor_3 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(autor_url) + '3' + '&text=' + encodeURIComponent(autor_3) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Autor 3 angegeben';

    var url_kategorie_1 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(kategorie_url) + '1' + '&text=' + encodeURIComponent(kategorie_1) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Kategorie 1 angegeben';
    var url_kategorie_2 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(kategorie_url) + '2' + '&text=' + encodeURIComponent(kategorie_2) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Kategorie 2 angegeben';
    var url_kategorie_3 = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(kategorie_url) + '3' + '&text=' + encodeURIComponent(kategorie_3) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Kategorie 3 angegeben';

    var url_autokaturl = _tr.server + '/api.php?action=edit&title=Kategorie:' + encodeURIComponent(geschichtenname) + ' - Geschichten' + '&text={{Autokat}}&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Kategorie automatisch erstellt';
 
    var url_fsk = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(fsk_seite) + '&text=' + encodeURIComponent(fsk) + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=FSK aktualisiert';

    var url_neuigkeiten = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(neuigkeiten_seite) + '&text=' + encodeURIComponent("{{Geschichten-Neuigkeitenmodul/Neuigkeitenübersicht}}") + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Neuigkeitenseite erstellt';

var url_neuigkeiten_post = _tr.server + '/api.php?action=edit&title=' + encodeURIComponent(neuigkeiten_seite + "/" + posttime) + '&text=' + encodeURIComponent('{{Neuigkeiten-Nav}}<div class="neuigkeiten-nachricht">' + geschichtenname + ' wurde gestartet!') + '&token=' + encodeURIComponent(_tr.edittoken) + '&summary=Neuigkeit hinzugefügt';

$("#fortlaufende_geschichte_form").after('<div id="data-transfer-info" class="mainpage-box" style="padding: 10px; border: 1px solid green; background: #49c; font-size: 14px;"><div id="firstline">Übermittle Daten...</div><div id="secondline"></div></div>');

posturl1 = setTimeout(function() { 
$.post(url, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Geschichtenübersicht angelegt");
console.log("url done");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Übermitteln der Geschichtenübersicht");
});

// make buttons go - looks better
$(".createbuttons").fadeOut();
}, 1500);


posturl2 = setTimeout(function() { 
$.post(url2, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Beschreibung angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Übermitteln der Beschreibung");
});
}, 2000);


posturl3 = setTimeout(function() { 
$.post(url3, function () {
    })
.done(function() {
//$("#data-transfer-info #secondline").append("<br><br>Geschichtenbalken angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Übermitteln des Geschichtenbalkens");
});
}, 2500);
posturl4 = setTimeout(function() { 
$.post(url4, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Thema angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Übermitteln des Themas");
});
}, 3000);
post_url_neuigkeiten_post = setTimeout(function() { 
$.post(url_neuigkeiten_post, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Erste Neuigkeit hinzugefügt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Erstellen einer Neuigkeit");
});
}, 3500);
post_url_neuigkeiten = setTimeout(function() { 
$.post(url_neuigkeiten, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Neuigkeitenseite angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Erstellen Neuigkeitenseite");
});
}, 4000);
posturl_status = setTimeout(function() { 
$.post(url_status, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Status aktualisiert");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Aktualisieren des Statuses");
});
}, 4500);
posturl_autor1 = setTimeout(function() { 
$.post(url_autor_1, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Autor 1 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Autor 1");
});
}, 5000);
posturl_autor2 = setTimeout(function() { 
$.post(url_autor_2, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Autor 2 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Autor 2");
});
}, 5500);
posturl_autor3 = setTimeout(function() { 
$.post(url_autor_3, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Autor 3 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Autor 3");
});
}, 6000);
posturl_kategorie1 = setTimeout(function() { 
$.post(url_kategorie_1, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Kategorie 1 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Kategorie 1");
});
}, 6500);
posturl_kategorie2 = setTimeout(function() { 
$.post(url_kategorie_2, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Kategorie 2 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Kategorie 2");
});
}, 7000);
posturl_autokaturl = setTimeout(function() { 
$.post(url_autokaturl, function () {
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Kategorie 3 angelegt");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Anlegen von Kategorie 3");
});
}, 7500);
posturl_fsk = setTimeout(function() { 
$.post(url_fsk, function () {
//        window.location.reload();
//setTimeout(function() {
//}, 5000);
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>FSK angegeben");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Angeben des FSK");
});
}, 8000);

posturl_geschichtenuebersicht = setTimeout(function() { 
$.post(url_uebersicht, function () {
//        window.location.reload();
//setTimeout(function() {
//}, 5000);
    })
.done(function() {
$("#data-transfer-info #secondline").append("<br><br>Übersicht aktualisiert");
}).fail(function() {
$("#data-transfer-info #secondline").append("<br><br>Fehler beim Aktualisieren der Übersicht");
});
}, 9000);


$.when(posturl1, posturl2, posturl3, posturl4, posturl_status, posturl_autor1, posturl_autor2, posturl_autor3, post_url_neuigkeiten, post_url_neuigkeiten_post, posturl_kategorie1, posturl_kategorie2, posturl_autokaturl, posturl_geschichtenuebersicht, posturl_fsk).done(function() {
$("body").css("cursor", "progress");
setTimeout(function() {
window.location = window.location + "#finish-info";
$("#data-transfer-info").before('<div class="mainpage-box" id="geschichte-erstellen-bestaetigt" style="display: none; padding: 10px; margin-top: 1em; border: 1px solid green; background: lightgreen; font-size: 14px;"  id="finish-info">Hier kannst du deine neue Geschichtenübersicht besuchen: « <a href="' + _tr.server + '/wiki/' + encodeURIComponent(geschichtenübersicht_seite) + '">' + geschichtenübersicht_seite + '</a> ». Viel Spaß und Erfolg mit deiner Geschichte!</div>');
$("#geschichte-erstellen-bestaetigt").fadeIn();
$("#data-transfer-info").fadeOut();
// $("#data-transfer-info").before('<br><div class="accent" style="padding: 20px;"><pre>' + page + '</pre></div><br>');
$("body").css("cursor", "inherit");
}, 10000);

});
}
}