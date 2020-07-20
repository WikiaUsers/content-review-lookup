if ($('body').hasClass('editor')) {
    $('.editpage-editarea').prepend('<div style="<div id="EditPageIntro" class="editpage-intro"><div class="editpage-intro-wrapper"><div class="mw-newarticletext"><p><b>Beachte bitte beim Erstellen eines Artikels <a href="/wiki/TorikoPedia:Leitlinien" title="TorikoPedia:Leitlinien">unsere Leitlinien</a>.</b></p><p><span style="font-size: 95%;">Achte bitte auf die Qualität deines Textes, insbesondere auf Rechtschreibung, Grammatik und Quellenangaben. Kopiere bitte aus urheberrechtlichen Gründen <b>keine</b> Texte von anderen Webseiten oder frage zumindest vorher einen <a href="/wiki/Spezial:Benutzer/sysop" title="Spezial:Benutzer/sysop">Administrator</a>, ob und wie eine Übernahme möglich ist.</span></p><p>Erfüllt der Artikel nicht unsere Qualitätsanforderungen oder enthält er Unsinn wird er wieder gelöscht.</p></div></div><a class="expand" style="display: inline;"><label>mehr</label><span>+</span></a></div>');
};

/* Willkommensbox für neue Benutzer - aus w:c:de.monsterhunter */

if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Willkommen in der TorikoPedia!", '<form class="WikiaForm" method="" name=""><fieldset>Hallo und Willkommen, ' + wgUserName + '!<br><br>Wir freuen uns, Dich hier in der TorikoPedia willkommen zu heißen und wünschen Dir viel Spaß beim Stöbern und Erstellen von neuen Inhalten. Bevor Du mit Lesen und Schreiben beginnst, bitten wir Dich, einen Blick auf unsere <a href="/wiki/TorikoPedia:Leitlinien">Regeln</a> und die <a href="/wiki/TorikoPedia:Wikiquette">Wikiquette</a> zu werfen, sie zu lesen und zu verinnerlichen.<br><br>Wenn du Fragen hast, zögere nicht und schreibe unsere erfahrenen Nutzern oder <a href="/wiki/Spezial:Benutzer/sysop" title="Spezial:Benutzer/sysop">Administratoren</a>.</fieldset></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, los geht’s!",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}