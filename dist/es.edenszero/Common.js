/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

//
$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");
 
        for (var i = 0; i < spans.length; i++) {
            spans[i].innerHTML = wgUserName;
        }
    }
});
 
// AutoRefreshing RecentChanges and WikiActivity
window.AjaxRCRefreshText = 'Act. autom�t.';
window.AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// Configuraci�n UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		deidad: { u:'Deidad', f:'Deidad', m:'Deidad' },
	}
};

UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.custom = {
	'Raakzeo': ['deidad']
};