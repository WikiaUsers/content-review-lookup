// **************************************************
// Añade nuevas etiquetas en los perfiles de los usuarios
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
            u: 'Científico',
            f: 'Científica',
            link: 'project:Usuario_del_mes'
        },
        researcher: {
            u: 'Investigador',
            f: 'Investigadora',
            link: 'project:Usuario_del_año'
        }
    }
};

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];