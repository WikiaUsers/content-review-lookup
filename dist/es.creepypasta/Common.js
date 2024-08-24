/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
SpoilerAlert = {
    question: 'Esta p�gina contiene el contenido que es NRHT y no puede ser conveniente para todo el p�blico. �Desea usted seguir viendo esta p�gina?',
    yes: 'Si, lo har�.',
    no: 'No, no lo har�.',
    isSpoiler: function() {
        return -1 !== wgCategories.indexOf('NRHT');
    }
};


// WikiActivity & RecentChanges
AjaxRCRefreshText = 'Actualizaci�n Autom�tica';
AjaxRCRefreshHoverText = 'Refrescar la p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Etiqueta de Inactivo
InactiveUsers = {
    texto: 'Inactivo'
};
importScriptPage('InactiveUsers/code.js', 'dev');

/* End of the {{USERNAME}} replacement */