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

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		'w:c:dev:AjaxRC/code.js'
		// ...
	]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		capitanc: { u:'Capitán Comandante', f:'Capitana Comandante', m:'Capitán Comandante' },
		capitan: { m:'Capitán', f:'Capitana', u:'Capitán' },
		teniente: { u:'Teniente' },
		oficial: { u:'Oficial' },
	}
};
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.custom = {
	'SacredOwl': ['capitan'],
	'Itsuki Hanashine': ['capitan'],
	'Alphonse Schweinorg': ['capitan'],
	'Louis Marlon': ['capitan'],
	'Shirokoneko': ['capitanc'],
	'Kurai Mun': ['capitan'],
	'NeoGirl': ['capitan'],
	'RoyalShadow09': ['capitan'],
	'Majestic Paladin': ['capitan'],
	'LightRush': ['capitan'],
	'Tomoka Kudo': ['capitan'],
	'MidMoon Orchestra': ['capitan'],
	'ObscureFlame': ['capitan'],
	'DarkHopeless': ['teniente']
};

/* Auto Refresh */
AjaxRCRefreshText = 'Actualización automatica'; 
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente'; 
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];