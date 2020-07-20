/** <nowiki>
 * Used to import CSS and JS
 * To be used on private wikis as ResourceLoader does not work correctly on them.
 * Uses native js to avoid errors where the jQuery or mediaWiki objects are not loaded
 * Imported through [[MediaWiki:Oasis-mytools]]
 * @author Cqm
 */
(function (window, document) {

    'use strict';

    var importHack = {
        init: function () {
            importHack.importStyle('MediaWiki:Wikia.css');
            importHack.importScript('MediaWiki:Common.js');
            importHack.importScript('MediaWiki:Wikia.js');
        },
        check: function (a, b) {

            var scripts,
                styles,
                i;

            if (b === 'script') {
                scripts = document.getElementsByTagName('script');
                for (i = 0; i < scripts.length; i += 1) {
                    if (scripts[i].src.indexOf(a) > -1) {
                        console.log('Script: ' + a + ' detected. Aborting...');
                        return true;
                    }
                }
            }

            if (b === 'style') {
                styles = document.getElementsByTagName('link');
                for (i = 0; i < styles.length; i += 1) {
                    if (styles[i].href.indexOf(a) > -1) {
                        console.log('Style: ' + a + ' detected. Aborting...');
                        return true;
                    }
                }
            }
            return false;
        },
        importScript: function (a) {
            if (!importHack.check(a, 'script')) {
                var script = document.createElement('script'),
                    page = encodeURIComponent(a).replace(/%20/g, '_')
                                                .replace(/%3A/g, ':')
                                                .replace(/%2F/g, '/');
                script.type = 'text/javascript';
                script.src = '/index.php?title=' + page + '&action=raw&ctype=text/javascript';
                document.getElementsByTagName('body')[0].appendChild(script);
            }
        },
        importStyle: function (a) {
            if (!importHack.check(a, 'style')) {
                var link = document.createElement('link'),
                    page = encodeURIComponent(a).replace(/%20/g, '_')
                                                .replace(/%3A/g, ':')
                                                .replace(/%2F/g, '/');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = '/index.php?title=' + page + '&action=raw&ctype=text/css';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        }
    },
    /**
     * Loading functions, based on $('document')ready();
     * @source <https://github.com/jquery/jquery/blob/master/src/core/ready.js>
     */
    load = {
        init: function (func) {

            if (document.readyState === 'complete') {
                func();
            } else {
                document.addEventListener('DOMContentLoaded', function () {
                    load.ready(func);
                }, false);
                window.addEventListener('load', function () {
                    load.ready(func);
                }, false);
            }

        },
        ready: function (func) {
        
            document.removeEventListener('DOMContentLoaded', function () {
                load.ready(func);
            }, false);
            window.removeEventListener('load', function () {
                load.ready(func);
            }, false);
            
            func();
        },
    };

    load.init(importHack.init);

}(this, this.document));