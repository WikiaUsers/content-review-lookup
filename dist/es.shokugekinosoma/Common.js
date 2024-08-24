/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");

        for (var i = 0; i < spans.length; i++) {
            spans[i].innerHTML = wgUserName;
        }
    }
});

window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data }
        primero: { u:'Primer Asiento', f:'Primer Asiento', m:'Primer Asiento' },
        segundo: { m:'Segundo Asiento', f:'Segundo Asiento', u:'Segundo Asiento' },
        tercero: { m:'Tercer Asiento', f:'Tercer Asiento', u:'Tercer Asiento' },
        cuarto: { m:'Cuarto Asiento', f:'Cuarto Asiento', u:'Cuarto Asiento' },
        quinto: { m:'Quinto Asiento', f:'Quinto Asiento', u:'Quinto Asiento' },
        sexto: { m:'Sexto Asiento', f:'Sexto Asiento', u:'Sexto Asiento' },
        septimo: { m:'Séptimo Asiento', f:'Séptimo Asiento', u:'Séptimo Asiento' },
        octavo: { m:'Octavo Asiento', f:'Octavo Asiento', u:'Octavo Asiento' },
        noveno: { m:'Noveno Asiento', f:'Noveno Asiento', u:'Noveno Asiento' },
        decimo: { m:'Décimo Asiento', f:'Décimo Asiento', u:'Décimo Asiento' },
    }
};

UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.custom = {
	'Dariel Senju': ['primero'],
	'Diabolic Commander': ['segundo'],
	'ObscureFlame': ['cuarto'],
	'Pablio Li': ['septimo'],
	'Raakzeo': ['octavo']
};

// AutoRefreshing RecentChanges and WikiActivity
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];