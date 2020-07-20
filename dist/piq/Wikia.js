if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Welcome to the PIQ Wiki!", '<form class="WikiaForm" method="" name=""><fieldset>Hello and welcome ' + wgUserName + '! We have noticed that you are a new user here and we would like welcome you to the wiki.<br /><br />Before you get started reading and editing we need you to take a look at our <a href="http://piq.wikia.com/wiki/Template:Wiki_Rules">Wiki Rules</a></a>.<br /><br />If you have any questions you can come and ask us in the <a href="http://piq.wikia.com/wiki/Special:Chat">chat</a>.</feildset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
  }
            }]
        });
    }
}