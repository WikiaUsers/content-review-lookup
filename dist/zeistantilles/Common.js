var WikiaNotificationMessage = "¡Bienvenido/a a la wikia de pruebas de Zeist Antilles. Siéntete libre de hacer todas las pruebas que necesites!";
var WikiaNotificationexpiry = 30;
importScriptPage('WikiaNotification/code.js', 'dev');

 
// Tabber
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
    }
};
Tabs.init();
 
// Show username
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
// Add custom edit buttons
if (mw.config.get('mwCustomEditButtons')) {
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png',
        'speedTip': 'Request deletion',
        'tagOpen': '{{delete|reason=',
        'tagClose': '}}',
        'sampleText': 'your reason here'
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
        'speedTip': 'Add the ō character',
        'tagOpen': 'ō',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
        'speedTip': 'Add the ū character',
        'tagOpen': 'ū',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'speedTip': 'Add a reference',
        'tagOpen': '<ref>',
        'tagClose': '</ref>',
        'sampleText': ''
    };
}
 
$(function () {
    "use strict";
    // Change title
    var newTitle = $('#title-meta').html(),
        edits = $('#user_masthead_since').text();
 
    if (!newTitle) {
        return;
    }
 
    $('.firstHeading, #WikiaUserPagesHeader h1, #WikiaPageHeader h1').html(newTitle);
    $('.#user_masthead_head h2').html(newTitle + '<small id="user_masthead_since">' + edits + '</small>');
});
 
// Message wall icons
// By [[User:AnimatedCartoons]]
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/Skyleter|MegaSonicX4|Pikoaztlan/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/PhineasJoka2011/g)) {
            $(this).addClass('admin');
        }
    });
}, 1);
 
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: '#47fcf0',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '15px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: '#47fcf0', //Glow color
    users: {
        'Skyleter': 'Burócrata',
        'MegaSonicX4': 'Burócrata',
        'PhineasJoka2011': 'Administrador',
    }
};
 
// SocialIcons config
var SocialMediaButtons = {
	position: "top",
	colorScheme: "color"
};
 
// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:SocialIcons/code.js'
    ]
});
importScriptPage('AjaxRC/code.js', 'dev');

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