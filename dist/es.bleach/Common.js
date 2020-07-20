importArticles({
    type: "script",
    articles: [
        "u:dev:WikiaNotification/code.js",
        "MediaWiki:Chat.js",
        "u:dev:ShowHide/code.js",
        "MediaWiki:Common.js/switch.js",
        "u:dev:ShowHide/code.js",
        "u:dev:TwittWidget/code.js",
        "u:dev:ReferencePopups/code.js"
    ]
});


/* Code for custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {
 
    /*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
            "speedTip": "borrar",
            "tagOpen": "{{borrar|",
            "tagClose": "}}",
            "sampleText": "motivo"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
            "speedTip": "Añadir ō",
            "tagOpen": "ō",
            "tagClose": "",
            "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
            "speedTip": "Añadir ū",
            "tagOpen": "ū",
            "tagClose": "",
            "sampleText": ""
    };
}

/* Facebook */
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>