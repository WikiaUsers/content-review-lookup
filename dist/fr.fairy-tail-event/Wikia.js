/* Fen�tre de bienvenue - code du w:c:de.fairytail */
/*if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Actualit�s sur Fairy Tail Event' !", '<form class="WikiaForm" method="" name=""><center><fieldset>NOUVEAU ! Un JLD a commenc� ! Participez-y <a href="/wiki/JLD (Festivit�s Estivales)" title="JLD (Festivit�s Estivales)">ici</a> !<br><small>(du 1<sup>er</sup> ao�t au 31 ao�t)</small></fieldset></center></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Compris, merci !",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}*/

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/Sidebar.js'
    ]
});