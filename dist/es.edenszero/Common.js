/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

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
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// Configuración UserTags
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