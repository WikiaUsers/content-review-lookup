// ============================================================
//                       Importe
// ============================================================
/* Importierung von JavaScript-Skripte & CSS-Sheets aus Wikia Developer Wiki */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js",                 // Spoiler Alert
        'u:dev:ExtendedNavigation/code.js'              // Extended Navigation
    ]
});


/*  Social Icons */
var SocialMediaButtons = { 
	position: 'bottom',
	colorScheme: 'color',
	buttonSize: '40px',
};
importScriptPage('SocialIcons/code.js','dev');


/* Zusätzliche Titel bei den Benutzerrechten */ 
$(function() {
    var rights = {
        'Suriyaa iSC' : ['Gründer', 'Ansprechpartner: Peanuts Wiki (de)'],
        'Simon Peter Hughes' : ['Chat-Moderator', 'Ansprechpartner: Peanuts Wiki (en)'],
        'Peanuts43' : ['YouTuber'],
    },
        newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $( '.UserProfileMasthead .masthead-info span.tag' ).remove();
 
        for ( var i in newrights ) {
            // add new rights
            $( '<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});

/* EditPageIntro - aus w:c:de.gokupedia */
if ($('body').hasClass('editor')) {
    $('.editpage-editarea').prepend('<div style="<div id="EditPageIntro" class="editpage-intro"><div class="editpage-intro-wrapper"><div class="mw-newarticletext"><p><b>Beachte bitte beim Erstellen eines Artikels <a href="/wiki/Peanuts Wiki (de):Leitlinien" title="Leitlinien">unsere Leitlinien</a>.</b></p><p><span style="font-size: 95%;">Achte bitte auf die Qualität deines Textes, insbesondere auf Rechtschreibung, Grammatik und Quellenangaben. Kopiere bitte aus urheberrechtlichen Gründen <b>keine</b> Texte von anderen Webseiten oder frage zumindest vorher einen <a href="/wiki/Spezial:Benutzer/sysop" title="Spezial:Benutzer/sysop">Administrator</a>, ob und wie eine Übernahme möglich ist.</span></p><p>Erfüllt der Artikel nicht unsere Qualitätsanforderungen oder enthält er Unsinn wird er wieder gelöscht.</p></div></div><a class="expand" style="display: inline;"><label>mehr</label><span>+</span></a></div>');
}

/* Willkommensbox für neue Benutzer - aus w:c:de.monsterhunter */
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Willkommen in der deutschsprachigen Peanuts Wiki!", '<form class="WikiaForm" method="" name=""><fieldset>Hallo und Willkommen in diesem Wiki!<br><br>Wir freuen uns, Dich hier in der deutschsprachigen Peanuts Wiki willkommen zu heißen und wünschen Dir viel Spaß beim Stöbern und Erstellen von neuen Inhalten. Bevor Du mit Lesen und Schreiben beginnst, bitten wir Dich, einen Blick auf unsere <a href="/wiki/Peanuts Wiki (de):Leitlinien">Regeln</a> und die <a href="/wiki/Peanuts Wiki (de):Wikiquette">Wikiquette</a> zu werfen, sie zu lesen und zu verinnerlichen.<br><br>Wenn du Fragen hast, zögere nicht und schreibe unsere erfahrenen Nutzern oder <a href="/wiki/Spezial:Benutzer/sysop" title="Spezial:Benutzer/sysop">Administratoren</a>.</fieldset></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Danke für den Hinweis. Los geht’s!",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}