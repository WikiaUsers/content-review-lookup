;(function($, mw, window, location, importArticle) {
    "use strict";
    $(function() {
        var load = function(s) {
            window.lng = {
                es: {
                        changes: 'Cambios',
                        characters: 'car�teres',
                        editing: 'Editando',
                        goToLine: 'Ir a la l�nea',
                        load: 'Cargar',
                        minorEdit: 'Edici�n menor',
                        newVersion: 'Hay una nueva versi�n de este c�digo. �Desea reemplazar el c�digo existente con el nuevo?',
                        no: 'No',
                        paste: 'Pegar al editor',
                        publish: 'Publicar',
                        publishAs: 'Publicar como',
                        replace: 'Reemplazar',
                        save: 'Guardar',
                        search: 'En este wiki',
                        selectAll: 'Seleccionar todo',
                        shortcut: 'Acceso directo',
                        showChanges: 'Mostrar cambios',
                        summary: 'Resumen',
                        unpublished: 'Has hecho algunos cambios no publicados. �Est�s seguro de no publicarlos?',
                        view: 'Ver c�digo',
                        yes: 'S�'
                }
            };
            window.lng = $.extend(window.lng.es, window.lng[mw.config.get('wgUserLanguage')]);
            importArticle({
                type: 'script',
                article: 'MediaWiki:WikCode.js/' + s + '.js'
            });
        };
        if (mw.config.get('skin') === 'oasis' && [0, 2, 8].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 && mw.config.get('wgAction') === 'view' && !/oldid\=|diff\=/.test(location.href) && !$('.noarticletext, .CodeMirror').length) {
            if (/\.js$/.test(mw.config.get('wgPageName'))) {
                load('javascript');
            } else if (/\.css$/.test(mw.config.get('wgPageName'))) {
                load('css');
            }
        }
    });
}(this.jQuery, this.mediaWiki, this, this.location, this.importArticle));