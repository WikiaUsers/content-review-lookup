if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Welcome to Creepypasta Wiki.", '<form class="WikiaForm" method="" name=""><fieldset>Hello and welcome, ' + wgUserName + '. We have detected that you are new to the site.<br /><br />Please be sure to check out the <a href="http://creepypasta.wikia.com/wiki/Project:Site_Rules">Site Rules</a> before contributing. Use <a href="http://creepypasta.wikia.com/wiki/Special:CreatePage">this form</a> to submit pastas. <a href="http://creepypasta.wikia.com/wiki/Special:UserSignup">Click here</a> to register an account, if you haven\'t already (this is required for submitting or editing pastas).<br /><br />Otherwise, browse stories by genre at the <a href="http://creepypasta.wikia.com/wiki/Project:Genre_Listing">Genre Listing</a> page or by title at <a href="http://creepypasta.wikia.com/wiki/Special:AllPages">Special:AllPages</a>. If you are new to creepypasta, the <a href="http://creepypasta.wikia.com/wiki/Category:Suggested_Reading">Suggested Reading category</a> is a good place to start.<br /><br /><h6>NOTE: You may not be a new user. This window relies on <a href="http://diveintohtml5.info/storage.html">localStorage</a> to detect if you have visited this site before.</h6></feildset ></form>', {
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