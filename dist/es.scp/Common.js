// **************************************************
// A�ade nuevas etiquetas en los perfiles de los usuarios
// **************************************************
window.UserTagsJS = {
    modules: {
        custom: {
            'Dr.Forest': ['scientist'],
            'Dc._Yerko': ['researcher'],
        }
    },
    tags: {
        scientist: {
            u: 'Cient�fico',
            f: 'Cient�fica',
            link: 'project:Usuario_del_mes'
        },
        researcher: {
            u: 'Investigador',
            f: 'Investigadora',
            link: 'project:Usuario_del_a�o'
        }
    }
};

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
window.AjaxRCRefreshText = 'Act. autom�t.';
window.AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];