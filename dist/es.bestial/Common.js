var WikiaNotificationMessage = "<font color='black'>¡<a href='http://es.bestial.wikia.com/wiki/Peri%C3%B3dico_de_WB'>Visita el Pergamino Mensual de Wiki Bestial  y participa en nuestro concurso<a href='http://es.bestial.wikia.com/wiki/Hilo:263'> y participa en nuestro concurso</a> </a>!</font>" http://es.bestial.wikia.com/wiki/Hilo:263 </a>!</font>"; var WikiaNotificationexpiry = 10; importScriptPage('WikiaNotification/code.js', 'dev');

 /**
     *Obtenido de [[w:c:runescape:MediaWiki:Common.js]]
     */

;( function ( $, mw, rs ) {
 
    'use strict';

    /**
     * Cache mw.config values
     */
    var conf = mw.config.get( [
        'skin',
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle',
        'wgUserName'
    ] );
 
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
        addCommas: function ( num ) {
            num += '';
 
            var x = num.split( '.' ),
                x1 = x[0],
                x2 = x.length > 1 ? '.' + x[1] : '',
                rgx = /(\d+)(\d{3})/;
 
            while ( rgx.test( x1 ) ) {
                x1 = x1.replace( rgx, '$1,$2' );
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
        callAPI: function ( data, _, callback ) {
            console.warn( 'Use of "callAPI" is deprecated. Use "mw.Api" instead.' );
 
            var api = new mw.Api(),
                call = ( ['purge', 'query', 'help'].indexOf( data.action ) > -1 ) ?
                    api.get : api.post;
 
            call( data ).done( callback );
        }
    };
 
    /**
     * Settings of each script run/imported
     * Based on <http://dev.wikia.com/wiki/DemoScripts.js>
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
            conditional: ( conf.skin === 'oasis' && conf.wgNamespaceNumber === 0 && conf.wgAction === 'view' ),
            scripts: 'MediaWiki:Wikia.js/ratings.js'
        },
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
    function checkKeys( obj, key ) {
        var inclKeys = Object.keys( obj ),
            allowKeys = ['conditional', 'scripts', 'styles', 'expose', 'exec'];
 
        allowKeys.forEach( function ( elem ) {
            var index = inclKeys.indexOf( elem );
 
            if ( index > -1 ) {
                inclKeys.splice( index, 1 );
            }
        } );
 
        if ( inclKeys.length ) {
            console.warn( 'Error in MediaWiki:Common.js: `includes.' + key + '` contains unknown key(s): ' + inclKeys.toString() );
        }
    }
 
    function init() {
        $.each( includes, function ( k, v ) {
 
            var check = $.isFunction( v.conditional ) ? v.conditional() : v.conditional;
 
            if ( check ) {
 
                // used for tracking which includes are loading
                loaded.push( 'common.' + k );
 
                if ( v.scripts ) {
                    scripts = scripts.concat( v.scripts );
                }
 
                if ( v.styles ) {
                    styles = styles.concat( v.styles );
                }
 
                if ( v.exec ) {
                    v.exec();
 
                    if ( v.expose ) {
                        expose[k] = v.exec;
                    }
                }
 
            }
 
            checkKeys( v, k );
        } );
 
        $.extend( rs, util, expose );
        rs.loaded = ( rs.loaded || [] ).concat( loaded );
 
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
        importArticles( {
            type: 'style',
            articles: styles
        }, {
            type: 'script',
            articles: scripts
        } );
 
    }
 
    $( init );
 
}( this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );

importArticles({
    type: "script",
    articles: [
        "w:c:dev:YouTubeAudio.js"
    ]
});

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            playertype = esc('' + $this.data('playertype')),
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay')),
            args = esc('' + $this.data('args'));
 
        if ( id === '' ) {
            return;
        }
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>');
    });
});
$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});
$(function () {
    $('.video').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<video width="' + width + '" height="' + height + '" ' + options + '><source src="' + src + '" type="'+ type + '"</video>');
    });
});
setTimeout(function(parseYTVideos){
ytvideo = document.querySelectorAll("video");
for (var i = 0, l = ytvideo.length; i < l; i++) {
    var video = ytvideo[i];
    var src = video.src || (function () {
        var sources = video.querySelectorAll("source");
        for (var j = 0, sl = sources.length; j < sl; j++) {
            var source = sources[j];
            var type = source.type;
            var isMp4 = type.indexOf("mp4") != -1;
            if (isMp4) return source.src;
        }
        return null;
    })();
    if (src) {
        var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (isYoutube) {
            var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
            id = (id.length > 1) ? id.splice(1) : id;
            id = id.toString();
            var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
            video.src = mp4url + id;
        }
    }
}}, 3600);
$('.norc').bind('contextmenu', function(e) {
    return false;
});
require(['jquery', 'mw', 'wikia.ui.factory', 'wikia.window'], function ($, mw, uiFactory, context) {
    'use strict';
    if (context.DiffModalLoaded) {
        return;
    }
    context.DiffModalLoaded = true;
    var lang = mw.config.get('wgUserLanguage');
    var msg = {
        en: {
            error: 'Something went wrong while getting the page at “%url”.',
            loading: 'Loading…',
            title: 'Changes: %pagename'
        },
        be: {
            error: 'Што-то пайшло не так падчас загрузкі старонкі «%url».',
            loading: 'Загрузка…',
            title: 'Змены: %pagename'
        },
        es: {
            error: 'Un error ha occurido mientras se extraia la página en “%url”.',
            loading: 'Cargando…',
            title: 'Diferencia entre revisiones: %pagename'
        },
        it: {
            error: 'Qualcosa è andato storto mentre si caricava la pagina da “%url”.',
            loading: 'Caricamento…',
            title: 'Modifiche: %pagename'
        },
        nl: {
            error: 'Er ging iets verkeerd bij het ophalen van de pagina op “%url”.',
            loading: 'Laden…',
            title: 'Wijzigingen: %pagename'
        },
        pl: {
            error: 'Coś się zepsuło podczas ładowania strony „%url”.',
            loading: 'Ładowanie…',
            title: 'Zmiany: %pagename'
        },
        ru: {
            error: 'Что-то пошло не так во время загрузки страницы «%url».',
            loading: 'Загрузка…',
            title: 'Изменения: %pagename'
        },
        uk: {
            error: 'Щось пішло не так під час завантаження сторінки «%url».',
            loading: 'Завантаження…',
            title: 'Зміни: %pagename'
        },
        vi: {
            error: 'Đã có sự cố xảy ra khi tải trang tại đường dẫn “%url”.',
            loading: 'Đang tải…',
            title: 'Thay đổi: %pagename'
        }
    };
    msg = msg[lang] || msg[lang.split('-')['0']] || msg.en;
    var specialDiff = {
        en: 'Diff'
    };
    specialDiff = mw.config.get('wgFormattedNamespaces')['-1'] + ':' +
            (specialDiff[mw.config.get('wgContentLanguage')] || specialDiff.en);
    var currentModal = null;
    var pendingModal = null;
    var uiModalFactory = null;
    function updateModal(modal) {
        if (!currentModal) {
            currentModal = modal;
            modal.$buttons = modal.$element.find('> footer > .buttons');
            modal.$content.addClass('WikiaArticle');
            pendingModal['1'] = pendingModal['1'] || msg.loading;
        }
        var shouldFire = pendingModal['2'];
        if (pendingModal['1']) {
            modal.setTitle(msg.title.replace('%pagename', pendingModal['1']));
        }
        modal.setContent(pendingModal['0']);
        pendingModal = null;
        modal.$buttons.empty();
        if (shouldFire) {
            mw.hook('DiffModal.ready').fire(modal);
        }
        modal.show();
    }
    function loadModal() {
        if (uiModalFactory) {
            uiModalFactory.createComponent({
                vars: {
                    content: '',
                    id: 'diff-modal',
                    size: 'large'
                },
                confirmCloseModal: function () {
                    currentModal = null;
                    return true;
                }
            }, updateModal);
        } else {
            uiFactory.init(['modal']).then(function (uiModal) {
                uiModalFactory = uiModal;
                loadModal();
            });
        }
    }
    function showModal(content, title, shouldFire) {
        if (pendingModal) {
            pendingModal = [content, title, shouldFire];
            return;
        }
        pendingModal = [content, title, shouldFire];
        if (currentModal) {
            updateModal(currentModal);
        } else {
            loadModal();
        }
    }
    function loadDiff(url) {
        showModal('<img class="loader" src="https://cdn.rawgit.com/ElNobDeTfm/suwiki/acb13435c9ecd13ab6e6b8a4770a9291b822adb2/resources/loader2.svg">');
        url.extend({
            action: 'render',
            diffonly: '1'
        });
        var urlString = url.toString();
        $.get(urlString).always(function (content) {
            var $content = null;
            var valid = false;
            if (typeof content === 'string') {
                $content = $(content);
            }
            if ($content && $content.hasClass('diff')) {
                valid = true;
            }
            if (!valid && $content) {
                var $contentDiff = $content.find('table.diff');
                if ($contentDiff.length) {
                    $content = $contentDiff;
                    content = $contentDiff.prop('outerHTML');
                    valid = true;
                }
            }
            if (valid) {
                var title = $content.find('#mw-diff-ntitle1 > strong > a').attr('title');
                mw.loader.using('mediawiki.action.history.diff', function () {
                    showModal(content, title, true);
                });
            } else {
                showModal(msg.error.replace('%url', urlString));
            }
        });
    }
    function init() {
        mw.util.addCSS(
            '#diff-modal > section {' +
                'box-sizing: border-box;' +
                'font-size: 13px;' +
                'line-height: 21px;' +
                'overflow: auto;' +
                'position: relative;' +
            '}' +
            '#blackout_diff-modal ~ .modalWrapper {' +
                'position: fixed;' +
            '}'
        );
        $(document.body).on('click.DiffModal', 'a', function (event) {
            var url = new mw.Uri(event.currentTarget.href);
            if (url.host !== location.hostname) {
                return;
            }
            var hasDiffParam = url.query.diff && !url.fragment;
            var isSpecialDiffLink = event.currentTarget.title.indexOf(specialDiff + '/') === 0;
            if (hasDiffParam || isSpecialDiffLink) {
                event.preventDefault();
                loadDiff(url);
            }
        });
    }
    $(init);
    mw.hook('DiffModal.ready').add(function (modal) {
        var $buttons = modal.$content.find('.diff-ntitle')
            .find('.mw-rev-head-action, .mw-rollback-link, .patrollink').clone();
        $buttons.contents().filter(function (ignore, element) {
            return element.nodeType === 3;
        }).remove();
        $buttons.find('a').addClass('button');
        modal.$buttons.append($buttons);
    });
});
$('a[href*="youtu.be"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('.be/')[1].split('?')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});
$('a[href*="youtube.com/watch"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('?v=')[1].split('&')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});