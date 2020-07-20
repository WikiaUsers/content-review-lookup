/* -------------------------------------------------------------- */
/*

geschrieben für http://de.fanfictions.wikia.com
nutzung auf dritten seiten ausdrücklich NICHT erlaubt.

*/
/* -------------------------------------------------------------- */
KategorieListe = "Bisher vorhanden: Horror, Abenteuer, Humor, Fantasy, Hack and Slay, Science Fiction. Dein Genre noch nicht dabei? Dann gib es an!";

// Variables for later on
// Keep these in an object for organization
var _nkg_tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    language: mw.config.get('wgUserLanguage')
};
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    nkg_msg = nkg_messages = {
        get: function(name) {
    return (nkg_messages[_nkg_tr.language.toUpperCase()]||nkg_messages['DE'])[name];
        },
        languages: {
            DE: 'Deutsch',
        },
    };
 
nkg_messages['DE'] = {
}

var nkg_fskoptions = {
            0: '0+',
            6: '6+',
            8: '8+',
            12: '12+',
            16: '16+',
            18: '18+',
        }

var hasModalClass = '';

// for mainpage
$("#KurzgeschichteErstellenModal a").attr("href", "http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Neue_Kurzgeschichte?ref=mainpage"); 

function count_textarea_kg() {
$('#geschichten_handlung_editarea').keyup(function() {
    characters_entered_kg = $(this).val().length;
    $('#textarea_characters span').text(characters_entered_kg);
});
}

setTimeout(function() {
if( wgArticleId === 14011 ) {
//
setTimeout(function() {
count_textarea_kg();
}, 1000);

    window.nkg_geschichten_handlung_editarea = '<div style="float: right;" id="textarea_characters"><span />/4500</div><textarea style="width: 100%; min-height: 360px;" id="geschichten_handlung_editarea" name="geschichten_handlung_editarea" placeholder="Füge hier deinen Text ein!"></textarea>'
 
    window.nkg_dropdown = '<select name="nkg_fsk" id="nkg_fsk" value="?">';
    nkg_dropdown += '<option value="" selected disabled>FSK wählen</option>';
    for (var i in nkg_fskoptions) {
        nkg_dropdown += '<option value="'+i+'">'+nkg_fskoptions[i]+'</option>';
    }
    nkg_dropdown += '</select>';
 
 
if (wgUserName === null) {
$("#mw-content-text").html('<br>Du kannst keine Geschichten erstellen, wenn du nicht angemeldet bist. <a href="http://de.fanfictions.wikia.com/wiki/Spezial:Anmelden?returnto=MeerUndMehr:Neue_Kurzgeschichte&type=login">Klicke hier</a>, um dich anzumelden.');
} else {
 setTimeout(function() {
$("#mw-content-text").html('<form class="WikiaForm" method="" name="" id="translationForm"><fieldset><strong><i>Diese Funktion ist neu. Solltest du Fehler entdecken, melde sie Bitte einem Administrator</i><h2 style="">Name deiner Kurzgeschichte</h2><span style="opacity: 0.5; font-style: italic;">Nicht vergessen - in der Kürze liegt die Würze - insbesondere beim Geschichtennamen</strong><input id="geschichten_name" type="text" placeholder="Benenne deine Geschichte - Die Abenteuer des skurrilen Bleistiftes, Kunterbunt im Regenbogenland" style="width: 100%;"/><br/><table cellspacing="0" cellpadding="0" style="width: 100%;" border="0" id="mw-translate-table"><tr><td style="width: auto; padding-right: 30px; vertical-align: top;" class="mw-input"><h2 style="">Text deiner Kurzgeschichte</h2>Schreibe hier deine Kurzgeschichte! Vergiss nicht, sie immerwieder auf deinem Computer zwischenzuspeichern, um eine Sicherungskopie zu haben.' + window.nkg_geschichten_handlung_editarea + '</td><td style="width: 330px; margin-left: 10px; vertical-align: top;"><h2>Thema deiner Kurzgeschichte</h2>Zu welchem Thema schreibst du? Eine Fanfiction über One Piece? Eine Geschichte über einen Hasen und einen Igel?</span><br><input id="thema_name" type="text" placeholder="One Piece, Naruto, Mario, Selbst ausgedacht, ..." style="width: 100%;"/><h2>Kategorien deiner Kurzgeschichte</h2>Welchen Kategorien gehört deine Geschichte an? Ist sie gruselig, dann passt "Horror". Ist sie lustig, dann passt Humor. <span style="border-bottom: 1px dotted rgba(0,0,0,0.25);" title="' + KategorieListe /* sollte im hauptdok definiert werden */ + '">Die volle Liste erscheint, wenn du die Maus über diesen Satz bewegst.</span><input id="kategorie_1_name" type="text" placeholder="Hier Kategorie eintragen" style="width: 100%;"/><br/><input id="kategorie_2_name" type="text" placeholder="Hier Kategorie eintragen" style="width: 100%;"/><h2>FSK deiner Kurzgeschichte</h2>Gib den FSK deiner Geschichte an.<br>' + window.nkg_dropdown + '</td></tr></table></fieldset></form><br><div style="float: right;"><a href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr?ref=Kurzgeschichte_erstellen_abbrechen"><button class="wikia-button secondary" id="cancel">Zurück zur Hauptseite</button></a>&nbsp;<button onclick="nkg_submitstory()">Kurzgeschichte erstellen</button></div>');
}, 100);
}
}
// Submits the form

},100);

function nkg_submitstory() {
    var $form = $('#translationForm'),
        header = $form.find('#request-header').val(),
        nkg_geschichtentext = $form.find('#geschichten_handlung_editarea').val(),
        nkg_fsk = $form.find('#nkg_fsk').val(),
        nkg_page = '{{Geschichtenbalken}}\n\n' + nkg_geschichtentext + '\n\n{{Bearbeiter\|1=\n~~' + '~~\n}}',
 whatever = "ohai";
// ****** custom to neue kurzgeschichte ******
var geschichtennameUncapitalized = $form.find('#geschichten_name').val();
 
var geschichtenname = geschichtennameUncapitalized.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
 
nkg_zielseite = "Geschichte:" + geschichtenname;
 
// beschreibung_seite = "Vorlage:Beschreibungen/" + geschichtenname;

nkg_fsk_seite = "Vorlage:Geschichten-FSK/" + geschichtenname;
 
nkg_geschichtenbalken_seite = "Vorlage:Geschichtenbalken/" + geschichtenname;
nkg_geschichtenbalken_info = '{{Geschichten-Info 2013/Kurzgeschichte\n<!------------- - - ------------->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + geschichtenname + '\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten|Kurzgeschichte=1}}[[Kategorie:Angepasste Kurzgeschichtenbalken]]</noinclude>';
 
nkg_thema = $form.find('#thema_name').val();
nkg_thema_seite = "Vorlage:Thema/" + geschichtenname;
 
nkg_status_seite = "Vorlage:Status/" + geschichtenname;
 
nkg_autor_1 = wgUserName;
//autor_2 = $form.find("#autor_2_name").val();
//autor_3 = $form.find("#autor_3_name").val();
 
nkg_autor_url = "Vorlage:Autoren/" + geschichtenname + "/Autor/"

nkg_kategorie_1 = $form.find("#kategorie_1_name").val();
nkg_kategorie_2 = $form.find("#kategorie_2_name").val();
//kategorie_3 = $form.find("#kategorie_3_name").val();
 
nkg_kategorie_url = "Vorlage:Kategorien/" + geschichtenname + "/Kategorie/"
 
    // Making sure the header isn't blank, and a language has been filled in
    if (!geschichtennameUncapitalized) {
        alert("Du musst deine Geschichte benennen!");
        return;
    }
    
    // Ajax URL
	
	var onlyCreate = '&createonly=1'
	
    var nkg_url_uebersicht = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_zielseite) + '&text=' + encodeURIComponent(nkg_page) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Geschichtenübersicht angelegt' + onlyCreate;
 
    var nkg_url_balken = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_geschichtenbalken_seite) + '&text=' + encodeURIComponent(nkg_geschichtenbalken_info) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Geschichtenbalken angelegt' + onlyCreate;
 
    var nkg_url_thema = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_thema_seite) + '&text=' + encodeURIComponent(nkg_thema) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Thema angelegt' + onlyCreate;
 
    var nkg_url_status = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_status_seite) + '&text=' + encodeURIComponent("neu") + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Status aktualisiert' + onlyCreate;
 
 
    var nkg_url_autor_1 = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_autor_url) + '1' + '&text=' + encodeURIComponent(nkg_autor_1) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Autor angegeben' + onlyCreate;


    var nkg_url_kategorie_1 = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_kategorie_url) + '1' + '&text=' + encodeURIComponent(nkg_kategorie_1) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Kategorie 1 angegeben' + onlyCreate;
    var nkg_url_kategorie_2 = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_kategorie_url) + '2' + '&text=' + encodeURIComponent(nkg_kategorie_2) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=Kategorie 2 angegeben' + onlyCreate;
 
    var nkg_url_fsk = _nkg_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(nkg_fsk_seite) + '&text=' + encodeURIComponent(nkg_fsk) + '&token=' + encodeURIComponent(_nkg_tr.edittoken) + '&summary=FSK aktualisiert' + onlyCreate;

if (nkg_url_uebersicht.length > 4500) {
alert("Du hast das Limit für die Geschichte überschritten. Kürze sie und füge den Rest ein, nachdem die Geschichte erstellt wurde!");
} else {
post_uebersicht =    $.post(nkg_url_uebersicht, function () {
    })
.success(function() {
console.log("post_uebersicht done");
});
post_balken =    $.post(nkg_url_balken, function () {
    })
.success(function() {
console.log("post_balken done");
});
post_thema =    $.post(nkg_url_thema, function () {
    })
.success(function() {
console.log("post_thema done");
});
post_status =     $.post(nkg_url_status, function () {
    })
.success(function() {
console.log("post_status done");
});
post_autor1 =    $.post(nkg_url_autor_1, function () {
    })
.success(function() {
console.log("post_autor1 done");
});
post_kategorie1 =     $.post(nkg_url_kategorie_1, function () {
    })
.success(function() {
console.log("post_kategorie1 done");
});
post_kategorie2 =    $.post(nkg_url_kategorie_2, function () {
    })
.success(function() {
console.log("post_kategorie2 done");
});

post_fsk =    $.post(nkg_url_fsk, function () {
//        window.location.reload();
    })
.success(function() {
console.log("post_fsk done");
});

$.when(post_uebersicht, post_balken, post_thema, post_status, post_autor1, post_kategorie1, post_kategorie2, post_fsk).done(function() {
$("#WikiaPageHeader").after('<div class="mainpage-box" style="padding: 10px; border: 1px solid green; background: lightgreen; font-size: 14px;">Deine Geschichte wurde erstellt! <a href="' + _nkg_tr.server + '/wiki/' + encodeURIComponent(nkg_zielseite) + '">Hier kannst du sie aufrufen.</a></div>');
});
}
}

   var buttonappend = '<a class="wikia--button" id="wlb-submit" width="200px" href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Neue_Kurzgeschichte?ref=Mitmachen_Button">' + nkg_msg.get('nkg_button') + '</a>';
$(".contribute .WikiaMenuElement").prepend("<li style='background: #ffb;'>" + buttonappend + "</li>");
$("ul.WikiaMenuElement").css("width", "172px");