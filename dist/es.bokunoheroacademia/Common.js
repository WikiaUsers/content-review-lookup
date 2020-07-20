importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/switch.js",
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
 
// AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Etiquetas para administradores */
var messageWallUserTags = {
    'username': 'usergroup',
    'Mei_Terumi_Senju': 'Directora',

};