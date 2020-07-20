/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
SpoilerAlert = {
    question: 'Esta página contiene el contenido que es NRHT y no puede ser conveniente para todo el público. ¿Desea usted seguir viendo esta página?',
    yes: 'Si, lo haré.',
    no: 'No, no lo haré.',
    isSpoiler: function() {
        return -1 !== wgCategories.indexOf('NRHT');
    }
};


// WikiActivity & RecentChanges
AjaxRCRefreshText = 'Actualización Automática';
AjaxRCRefreshHoverText = 'Refrescar la página automáticamente';
ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Etiqueta de Inactivo
InactiveUsers = {
    texto: 'Inactivo'
};
importScriptPage('InactiveUsers/code.js', 'dev');

/* End of the {{USERNAME}} replacement */