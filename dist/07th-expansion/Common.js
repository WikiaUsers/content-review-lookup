/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
 
/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');
 
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
  

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.getElementsByTagName("tr");
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
$(function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if ($(Tables[i]).hasClass("collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if ($(NavigationBoxes[i]).hasClass("collapsed") || (tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass("autocollapse"))) {
            collapseTable(i);
        }
    }
});
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = autoCollapse;
 
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'none';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;
 
        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'block';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
$(function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for ( var i = 0; NavFrame = divs[i]; i++ ) {
        // if found a navigation bar
        if ($(NavFrame).hasClass("NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for ( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ($(NavFrame.childNodes[j]).hasClass("NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for ( var i = 1; i <= indexNavigationBar; i++ ) {
            toggleNavigationBar(i);
        }
    }
});
 
// Adds ocode to photo uploads
$(function preloadUploadDesc() {
	if (wgPageName.toLowerCase() != 'special:upload') {
		return;
}
 
	document.getElementById('wpUploadDescription').appendChild(document.createTextNode("== Source ==\r\n\r\n== Licensing ==\r{{Fairuse}}"));
	
});

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'AutoRefresh';

//********************************************************************
// Added Multiple Upload Functionality, credit to Gamepedia wiki
//********************************************************************

mw.loader.load('https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-multiupload.js&action=raw&ctype=text/javascript');

//**************************************************************************
// Script by Frietjes to help get rid of the Duplicate Arguments categories
//**************************************************************************
mw.loader.load('//en.wikipedia.org/w/index.php?title=User:Frietjes/findargdups.js&action=raw&ctype=text/javascript');

/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Allows intergration with Discord [https://discord.com]
 */
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'wgContentLanguage',
        'wgUserLanguage',
        'wgUserName'
    ]);
    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;
    /**
     * Main object
     * @static
     */
    var DiscordIntegrator = {
        /**
         * Configuration for the plugin
         * @property config
         * @type {Object}
         */
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        /**
         * Preloads translations.
         */
        imported: function(i18n) {
            $.when(
                window.dev.i18n.loadMessages('DiscordIntegrator', {
                    cacheVersion: 3
                }),
                mw.loader.using('mediawiki.api')
            ).then($.proxy(this.preload, this));
        },
        /**
         * Preload resources
         */
        preload: function(i18n) {
            this.i18n = i18n;
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: [
                    'id',
                    'title',
                    'moduleHeight',
                    'theme',
                    'width',
                    'height',
                    'text',
                    'logged-in',
                    'footer',
                    'username'
                ].map(function(el) {
                    return 'Custom-DiscordIntegrator-config-' + el;
                }).join('|'),
                amlang: mconfig.wgUserLanguage === 'qqx' ?
                    mconfig.wgContentLanguage :
                    mconfig.wgUserLanguage,
                uselang: 'content', // T97096
                smaxage: 300,
                maxage: 300
            }).done($.proxy(function(d) {
                if (!d.error) {
                    d.query.allmessages.forEach(function(el) {
                        if(el['*']) {
                            this.config[el.name.substring(32)] = el['*'];
                        }
                    }, this);
                    this._loading = 0;
                    ['text', 'title', 'footer'].forEach(this.parse, this);
                    if (this._loading === 0) {
                        this.init();
                    }
                }
            }, this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg],
                    // Also cache the individual parser outputs of messages for anonymous users.
                    // This can be a bit more aggressive as the cache varies on the
                    // actual message text, which often contains no wikitext at all.
                    smaxage: 86400,
                    maxage: 86400
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }
        },
        /**
         * Initializing
         */
        init: function() {
            if (this.config.id && $('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas) {
                    var classSplit = clas.split(/\s+/);
                    if (classSplit.indexOf('loaded') === -1 && classSplit.indexOf('is-ready') === -1) {
                        $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                    } else {
                        this.insertToSiderail();
                    }
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            // TODO: Insert some user configuration here
            var el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title.trim()
                    })
                );
            }
            if (this.config.text) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleText',
                        html: this.config.text
                    })
                );
            }
            el.append(this.generateContent(this.config));
            if (this.config.footer) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleFooter',
                        html: this.config.footer
                    })
                );
            }
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            if (this.config.moduleHeight) {
                mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight) + 'px; }');
            }
            mw.hook('DiscordIntegrator.added').fire(el);
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each($.proxy(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * Determines the theme of the widget.
         * @param {string} config Configured theme
         * @return {string} 'light' or 'dark' depending on the wiki theme and configuration
         */
        determineTheme: function(config) {
            // If explicitly configured to light or dark.
            if (config === 'dark') {
                return 'dark';
            }
            if (config === 'light') {
                return 'light';
            }
            // If not configured, and the current FandomDesktop theme is set.
            if ($('body').hasClass('theme-fandomdesktop-light')) {
                return 'light';
            }
            if ($('body').hasClass('theme-fandomdesktop-dark')) {
                return 'dark';
            }
            // Otherwise, default to dark.
            return 'dark';
        },
        /**
         * Generating widget content from an object
         * @return {string} Content of the widget
         */
        generateContent: function(config) {
            if (!config.id || !String(config.id).match(/\d{17,19}/)) {
                return this.i18n.msg('error').parse();
            }
            if (
                (
                    config.loggedIn === true ||
                    Boolean(config['logged-in']) === true &&
                    config['logged-in'] !== 'false' &&
                    config['logged-in'] !== '{{{loggedIn}}}'
                ) && !mconfig.wgUserName
            ) {
                return this.i18n.msg('login').parse();
            }
            var username = config.username === '@disabled' ?
                 '' :
                 config.username === '@function' &&
                 typeof window.DiscordIntegratorGetUsername === 'function' ?
                     window.DiscordIntegratorGetUsername() :
                     config.username || mconfig.wgUserName;
            return mw.html.element('iframe', {
                src: 'https://discord.com/widget?id=' + config.id +
                     '&theme=' + this.determineTheme(config.theme) +
                     '&username=' + encodeURIComponent(username),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0',
                title: this.i18n.msg('title').plain()
            });
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }).then($.proxy(DiscordIntegrator.imported, DiscordIntegrator));
})();