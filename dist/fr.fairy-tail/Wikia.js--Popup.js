/*Fenêtre de bienvenue - code du w:c:de.fairytail */
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Psst ! Viens un peu par ici !", '<form class="WikiaForm" method="" name=""><center><fieldset>Des oeufs ont été cachés un peu partout sur le site. Il y en a de toutes sortes ! Au chocolat, à la vanille, en terre, multicolores, à pois, à éclairs, et même en or ! Si tu veux les trouver, va vite voir sur la page des indices !<br><small>(du 2 avril au 15 avril)</small></fieldset></center></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "J'y cours !",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
    }
}