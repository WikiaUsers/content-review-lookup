/*Fenêtre de bienvenue - code du w:c:de.fairytail */
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Joyeux 14 juillet ! ", '<form class="WikiaForm" method="" name=""><center><fieldset>Bonne fête du 14 juillet à tous !<br><img src="http://pa1.narvii.com/5784/b6fc682d6c56b2dafc64608db166d626d5c6f5eb_hq.gif" /></fieldset></center></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Merci !",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}