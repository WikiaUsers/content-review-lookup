window.UserTagsJS = {
	modules: {},
	tags: {
		rollbackers: { m: 'Defensor', f: 'Defensora', u: 'Defensor', order: 2 },
		bureaucrat: { u: 'Burócrata', order: 1 },
		templatecreator: { m: 'Creador de plantillas', f: 'Creadora de plantillas', u: 'Creador de plantillas', order: 3 },
		csseditor: { m: 'Editor CSS', f: 'Editora CSS', u: 'Editor CSS', order: 4 },
		montheditor: { m: 'Editor del mes', f: 'Editora del mes', u: 'Editor del mes', order: 5},
		featureduser: { u: 'Usuario destacado', order: 6}
	}
};
 
UserTagsJS.modules.custom = {
	'TheStupidSableye': ['Guerrero Galáctico', 'csseditor'],
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
 
UserTagsJS.modules.inactive = 30; // 30 días
 
UserTagsJS.modules.autoconfirmed = true; // Switch on
 
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Seguimiento",
    "Especial:Registro",
    "Especial:Contribuciones"
];
window.AjaxRCRefreshText = 'Actualizar automáticamente';
window.AjaxRCRefreshHoverText = 'Actualiza la página automáticamente';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/ssbtemp-fanon-hispano/images/3/35/SSB_Super_Smash_Bros._Series.png/revision/latest?cb=20190805220151&path-prefix=es';
window.ajaxRefresh = 10000;
 
];

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
 
/* Recargar chat */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatReload/code.js'
    ]
});
 
/* Categorizar imágenes */
 
if(wgPageName == 'Especial:SubirArchivo' || wgPageName == 'Especial:SubirMúltiplesArchivos') {
    $('#wpUploadDescription').val('[[Categoría:Imágenes]]');
}
 
/**
     *Obtenido de [[w:c:runescape:MediaWiki:Common.js]]
     */
 
(function($, mw, rs) {
 
    'use strict';
 
    /**
     * Cache mw.config values
     */
    var conf = mw.config.get([
        'skin',
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle',
        'wgUserName'
    ]);
 
    /**
     * Reusable functions
     *
     * Deprecated functions have been mapped to modern counterparts where applicable
     * @todo Use mw.log.deprecate when we get access to it
     *       In the mean time find a way to add a stacktrace
     */
    var util = {
        /**
         * Adds commas to a number string
         *
         * @example 123456.78 -> 123,456.78
         *
         * @param num {number|string} A number to add commas to
         *
         * @returns {string} The number with commas
         */
        addCommas: function(num) {
            num += '';
 
            var x = num.split('.'),
                x1 = x[0],
                x2 = x.length > 1 ? '.' + x[1] : '',
                rgx = /(\d+)(\d{3})/;
 
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1,$2');
            }
 
            return x1 + x2;
        },
 
 
        /**
         * Calls the mediawiki api with supplied parameters
         *
         * @deprecated Use mediawiki.api instead
         *
         * @param data {object}
         * @param _ no longer used
         * @param callback {function} Function to execute if the request is successful
         */
        callAPI: function(data, _, callback) {
            console.warn('Use of "callAPI" is deprecated. Use "mw.Api" instead.');
 
            var api = new mw.Api(),
                call = (['purge', 'query', 'help'].indexOf(data.action) > -1) ?
                api.get : api.post;
 
            call(data).done(callback);
        }
    };
 
    /**
     * Settings of each script run/imported
     * Based on <https://dev.wikia.com/wiki/DemoScripts.js>
     */
    var includes = {
        /*
        example: {
            // {function|boolean} Conditional to pass for the scripts/styles
            // to be imported or exec to run
            // Can be something that evaluates to a boolean if required
            // if it should always load, set to true
            conditional: true,
 
            // {array|string} Scripts to import
            // Remove if unused
            scripts: [],
 
            // {array|string} Styles to import
            // Remove if unused
            styles: [],
 
            // {boolean} Whether to expose exec under the rswiki global
            // Defaults to false
            expose: true,
 
            // {function} Function to run
            // Typically used for small scripts that aren't imported
            // or for minor things that need to run before importing another script
            // Will execute before any scripts are imported
            exec: function () {
                console.log( 'loaded' );
            }
        }
        */
 
        /**
         * Ratings sidebar module (oasis)
         */
        ratings: {
            conditional: (conf.skin === 'oasis' && conf.wgNamespaceNumber === 0 && conf.wgAction === 'view'),
            scripts: 'MediaWiki:Wikia.js/ratings.js'
        },
    };
    
    var MessageBlock = {
  title : 'Bloqueo',
  message : 'Debido a que sigues vandalizando paginas, haciendo spam/flood y poner comentarios que ofende a la gente, hemos decidio bloquearte por un tiempo hasta que puedas corregir esos errores. Tambien si leiste las reglas pero eres menor de edad o no haces caso a lo que le diga, te vamos a bloquear.'
};

    var scripts = [],
        styles = [],
        loaded = [],
        expose = {};
 
    /**
     * Used to detect incorrectly spelt keys for each include
     *
     * @param obj {object}
     * @param key {string}
     */
    function checkKeys(obj, key) {
        var inclKeys = Object.keys(obj),
            allowKeys = ['conditional', 'scripts', 'styles', 'expose', 'exec'];
 
        allowKeys.forEach(function(elem) {
            var index = inclKeys.indexOf(elem);
 
            if (index > -1) {
                inclKeys.splice(index, 1);
            }
        });
 
        if (inclKeys.length) {
            console.warn('Error in MediaWiki:Common.js: `includes.' + key + '` contains unknown key(s): ' + inclKeys.toString());
        }
    }
 
    function init() {
        $.each(includes, function(k, v) {
 
            var check = $.isFunction(v.conditional) ? v.conditional() : v.conditional;
 
            if (check) {
 
                // used for tracking which includes are loading
                loaded.push('common.' + k);
 
                if (v.scripts) {
                    scripts = scripts.concat(v.scripts);
                }
 
                if (v.styles) {
                    styles = styles.concat(v.styles);
                }
 
                if (v.exec) {
                    v.exec();
 
                    if (v.expose) {
                        expose[k] = v.exec;
                    }
                }
 
            }
 
            checkKeys(v, k);
        });
 
        $.extend(rs, util, expose);
        rs.loaded = (rs.loaded || []).concat(loaded);
 
        // map globals from previous versions to new methods
        // @todo remove these at some point
        rs.common = {};
        rs.reusable = {};
        rs.common.autosort = rs.autosort;
        window.addCommas = rs.reusable.addCommas = util.addCommas;
        // everything below here is deprecated
        // keep these until everything sitewide has been moved over to new methods
        window.getCookie = rs.reusable.getCookie = util.getCookie;
        window.setCookie = rs.reusable.setCookie = util.setCookie;
        window.callAPI = rs.reusable.callAPI = util.callAPI;
 
        // load stylesheets before scripts
        importArticles({
            type: 'style',
            articles: styles
        }, {
            type: 'script',
            articles: scripts
        });
 
    }
 
    $(init);
 
}(this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {}));