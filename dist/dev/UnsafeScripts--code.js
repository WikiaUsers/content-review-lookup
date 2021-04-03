/* <nowiki>
 * 
 * @module                  UnsafeScripts
 * @description             Safety bypass that enables customisation
                            on site and user script pages.
 * @author                  Lunarity
 * @author                  UltimateSupreme
 * @author                  Speedit
 * @license                 CC-BY-SA 3.0
 * @notes                   PLEASE BE CAREFUL AND READ THE DOCUMENTATION!
 * 
 */
/* global mediaWiki */
/* jshint jquery:true, browser:true, smarttabs:true */
(function() {
	'use strict';
 
    // Scope limiting and double-run protection
    if (
        window.unsafeScriptsLoaded ||
        [2, 8].indexOf(mw.config.get('wgNamespaceNumber')) === -1 ||
        mw.config.get('wgAction') === 'edit' ||
        // JS only
        !(
            mw.config.get('wgPageContentModel') === 'javascript' ||
            new mw.Title(wgPageName).getExtension() === 'js'
        )
    ) {
        return;
    }
    window.unsafeScriptsLoaded = true;
 
    // Resource loader map
    var resources = {
        'sitecss': {
            'modules': 'site',
            'only': 'styles'
        },
        'usercss': {
            'modules': 'user',
            'only': 'styles'        
        },
        'sitejs': {
            'modules': 'site',
            'only': 'scripts'
        },
        'userjs': {
            'modules': 'user',
            'only': 'scripts'
        }
    };

    // Script configuration
    var config = $.extend(
        // Default configuration
        {
            'usesitejs': true,
            'useuserjs': true,
            'usesitecss': true,
            'useusercss': true,
            'dropdown': false
        },
        // User configuration
        (window.unsafeScriptsConfig || {}),
        // MediaWiki variables
        mw.config.get(['debug'])
    );
 
    // Window cache variable.
    var w = {};
 
    // Unsafe scripting logic
    var unsafeScripts = {
        // Script initializer
        init: function(i18no) {
            if (config.dropdown) {
                i18no.loadMessages('UnsafeScripts')
                    .then(unsafeScripts.ui);
            } else {
                unsafeScripts.ui({});
            }
        },
        // JS editing button
        ui: function(i18n) {
            var $link;
            if (config.dropdown) {
                $link = $('<a>', {
                    'id': 'edit-js',
                    'href': $('#ca-edit, #ca-viewsource').attr('href'),
                    text: i18n.msg('editSafe').plain()
                });
                $('.page-header__contribution-buttons .wds-list').append(
                    $('<li>').append($link)
                );
            } else {
                $link = $('#ca-edit, #ca-viewsource');
            }
            $link.click(unsafeScripts.handler);
        },
        // Script loading handler
        handler: function(e) {
            e.preventDefault();
            if (!this.getAttribute('href')) {
                return;
            }
            try {
                var url = new mw.Uri(this.getAttribute('href'));
                if (config.debug) {
                    url.extend({ debug: 1 });
                }
                url = url.toString();
                w = unsafeScripts.w = window.open(url);
                unsafeScripts.s = setInterval(unsafeScripts.call, 20);
            } catch (err) {
                // The clicked link does not have a valid URL in href
                console.warn('[UnsafeScripts]', err);
            }
        },
        // Wait for target availability
        call: function() {
            if (
                (w.mw || {}).config &&
                w.mw.config.get('wgSassLoadedScss') &&
                !w.unsafeScriptsLoaded
            ) {
                w.unsafeScriptsLoaded = true;
                clearInterval(unsafeScripts.s);
                w.mw.config.set('debug', config.debug);
                unsafeScripts.modules
                    .forEach(unsafeScripts.load);
            }
        },
        // Modules to load
        modules: Object.keys(resources).filter(function(r) {
            return config['use' + r];
        }),
        load: function(r, i) {
            if (/js$/.test(r) && !w.$.isReady) {
                w.$(unsafeScripts.load.bind(r, i));
                return;
            }
            var p = resources[r];
            // ResourceLoader query
            var n = {
                    'scripts': 'script',
                    'styles':  'link'
                },
                a = {
                    'scripts': 'src',
                    'styles':  'href'
                },
                sel = n[p.only] + '[' + a[p.only] + '*="modules=' + p.modules + '"]';
            // URI fetching. This uses the DOM for better caching & stability.
            var url = $(sel).attr(a[p.only]);
            // Import module if present in DOM.
            if (url && p.only === 'scripts') {
                w.importScriptURI(url);
            } else if (url && p.only === 'styles') {
                w.importStylesheetURI(url);
            }
            // Conditional tab closure.
            if (
                i === unsafeScripts.modules.length &&
                config.close
            ) {
               window.close();
            }
        }
    };

    mw.hook('dev.i18n').add(unsafeScripts.init);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

})();