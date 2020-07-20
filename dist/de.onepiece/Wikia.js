

/* Willkommensbox für neue Benutzer - aus w:c:de.monsterhunter */

if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Willkommen in der OnePiecePedia!", '<form class="WikiaForm" method="" name=""><fieldset>Hallo und Willkommen in diese Wiki!<br><br>Wir freuen uns, Dich hier in der OnePiecePedia willkommen zu heißen und wünschen Dir viel Spaß beim Stöbern und Erstellen von neuen Inhalten. Bevor Du mit Lesen und Schreiben beginnst, bitten wir Dich, einen Blick auf unsere <a href="/wiki/OnePiecePedia:Leitlinien">Regeln</a> und die <a href="/wiki/OnePiecePedia:Wikiquette">Wikiquette</a> zu werfen, sie zu lesen und zu verinnerlichen.<br><br>Wenn du Fragen hast, zögere nicht und schreibe unsere erfahrenen Nutzern oder <a href="/wiki/Spezial:Benutzer/sysop" title="Spezial:Benutzer/sysop">Administratoren</a>.</fieldset></form>', {
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