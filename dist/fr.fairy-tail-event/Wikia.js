/* Fenêtre de bienvenue - code du w:c:de.fairytail */
/*if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Actualités sur Fairy Tail Event' !", '<form class="WikiaForm" method="" name=""><center><fieldset>NOUVEAU ! Un JLD a commencé ! Participez-y <a href="/wiki/JLD (Festivités Estivales)" title="JLD (Festivités Estivales)">ici</a> !<br><small>(du 1<sup>er</sup> août au 31 août)</small></fieldset></center></form>', {
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