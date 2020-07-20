/**
 * Any JavaScript here will be loaded for all users on every page load.
 */
'use strict';

/**
 * UserTags
 * Setup for UserTags imported module.
 */
window.UserTagsJS = {
    modules: {},
    tags: {
        'bureaucrat': {
            u: 'Old Hunter'
        },
        'sysop': {
            u: 'Old Hunter'
        },
        'threadmoderator': {
            u: 'Blood Minister'
        },
        'chatmoderator': {
            u: 'Blood Minister'
        },
        'content-moderator': {
            u: 'Hunter'
        },
        'autoconfirmed': {
            u: 'Paleblood'
        },
        'bot': { 
            u: 'Little One' 
        },
        'bot-global': { 
            u: 'Little One' 
        },
        'inactive': { 
            u: 'Blood Drunk' 
        }
    }
};
/**
 * Tooltips
 * Tooltip setup for own tooltip module.
 */
window.tagList = {
    'Old Hunter': 'Wiki Administration',
    'Blood Minister': 'Wiki Moderator',
    'Hunter': 'Wiki Content Moderator',
    'Paleblood': 'Auto-confirmed User',
    'Little One': 'Bot',
    'Blood Drunk': 'Inactive User',
    'Staff': 'Fandom Staff'
};
/**
 * Auto Refresh
 * Setup for auto-refresh imported module.
 */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity', 
    'Special:AllPages', 
    'Special:UncategorizedPages'
];
/**
 * RevealAnonIP
 * Setup for the RevealAnonIP module
 * - Changes "A Fandom Contributor" to their IP address.
 */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
};
/**
 * AddRailModule
 * Setup for AddRailModule
 * - Allows easy custom additions to the siderail.
 */
window.AddRailModule = [
    {
        page: 'Template:DiscussionsRailModule',
        prepend: true,
        maxAge: 86400
    }
];
/** 
 * PageEditInfo
 * Setup for PageEditInfo submodules.
 */
/**
 * PageCreator
 * Setup for PageCreator imported module.
 */
window.pageCreatorConfig = {
    namespaces: 'all',
    useAvatar: false,
    useTimestamp: true,
    useUTC: true,
    useTimeago: true
};
/**
 * LastEdited
 * Setup for LastEdited imported module.
 */
window.lastEdited = {
    avatar: false,
    avatarsize: 20,
    size: false,
    diff: true,
    comment: false,
    newpage: false,
    time: 'timeago',
    timezone: 'UTC',
    lang: 'en-us',
    namespaces: {
        exclude: []
    },
    pages: []
};
/**
 * Avoids polluting the global scope, only runs when everything is ready.
 */
window.addOnloadHook(function () {
    var mw = window.mw;
    var $ = window.jQuery;
    
    mw.hook('DOMTools').add(function (DOMTools) {
        /**
         * Script for collapsible tables.
         */
        ;(function () {
            var tables = DOMTools.queryAll('table.collapsible'),
                len = tables.length, i;
            /**
             * Setup functions
             */
            function appendCollapseLink (table) {
                if (!table) return;
                
                var th = DOMTools.query('th', table);
                
                if (!th) return;
                
                var hs = collapseText(table),
                    link = DOMTools.parseHTML('<a href="#">' + hs + '</a>'),
                    fn = handleTable.bind(null, link, table);

                DOMTools.on(link, 'click.collapseLink', fn);
                
                var el = DOMTools.parseHTML('<span class="collapseLink"></span>');
                DOMTools.appendAll(el, [
                    document.createTextNode('['),
                    link,
                    document.createTextNode(']')
                ]);
                    
                DOMTools.appendTo(th, el);
                
                if (DOMTools.hasClass(table, 'collapsed')) {
                    DOMTools.css(DOMTools.query('td', table).parentElement, 'display', 'none');
                }
            }
            
            function collapseText (table) {
                return DOMTools.hasClass(table, 'collapsed') ? 'show' : 'hide';
            }
            
            function handleTable (link, table, event) {
                event.preventDefault();
                collapseTable(link, table);
            }
             
            function collapseTable (e, t) {
                var $elems = $(t.querySelector('td').parentElement);
                if (t.classList.contains('collapsed')) {
                    $elems.show('fast');
                    DOMTools.removeClass(t, 'collapsed');
                    DOMTools.text(e, collapseText(t));
                } else {
                    $elems.hide('fast');
                    DOMTools.addClass(t, 'collapsed');
                    DOMTools.text(e, collapseText(t));
                }
            }
            /**
             * Run
             */
            tables.forEach(appendCollapseLink);
        })();
        /**
         * Add account creation dates to the global edit count on user profiles.
         */
        ;(function () {
            var base = DOMTools.query('#UserProfileMasthead');
            if (!base) return;
            
            function getData (user) {
                var url = mw.util.wikiScript('api');
                url += '?action=query&list=users&usprop=registration';
                url += '&ususers=' + user + '&format=json';
                
                function cb (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    
                    function load () {
                        var parsed = JSON.parse(xhr.responseText);
                        resolve(parsed);
                    }
                    
                    function error (e) {
                        reject(e, xhr);
                    }
                    
                    xhr.addEventListener('load', load);
                    xhr.addEventListener('error', error);
                    
                    xhr.open('GET', url, true);
                    xhr.send();
                }
                
                return new Promise(cb);
            }
            
            function appendToGlobalCount (data) {
                var d = DOMTools.getProp(data, 'query.users.0.registration'),
                    date = new Date(d).toLocaleDateString('en-us', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }),
                    target = DOMTools.query('.globaledit-label', base),
                    clone;
                
                if (!target) return Promise.reject(new Error('Unable to find label.'));
                
                clone = target.cloneNode(true);
                DOMTools.text(clone, 'global edits since account creation');
                DOMTools.appendAll(clone, [
                    document.createElement('br'),
                    document.createTextNode(date)
                ]);
                target.replaceWith(clone);
                return Promise.resolve(clone);
            }
            
            function removeLinkedCSS () {
                function filter (l) {
                    var ref = l.href;
                    return ref && ref.includes('GlobalEditcount');
                }
                
                var links = DOMTools.queryAll('link[type="text/css"][rel="stylesheet"]'),
                    link = links.find(filter);
                
                try {
                    link.parentElement.removeChild(link);
                    return Promise.resolve(true);
                } catch(e) {
                    return Promise.reject(e);
                }
            }
            
            function init (GlobalEditcount) {
                getData(GlobalEditcount.user)
                    .then(appendToGlobalCount, console.error)
                    .then(removeLinkedCSS, console.error);
            }
            
            mw.hook('GlobalEditcount.loaded').add(init);
        })();
        /**
         * Fix avatars in Thread History pages.
         */
        ;(function () {
            var fixDimensions, avatars;
            
            if (!document.getElementById('WallThreadHistory')) return;
            
            fixDimensions = function (avatar) {
                var src = avatar.getAttribute('src');
                avatar.setAttribute('height', '50');
                avatar.setAttribute('width', '50');
                avatar.setAttribute('src', src.slice(0, -2) + 50);
            };
            
            avatars = DOMTools.queryAll('.WallHistory #WallThreadHistory .avatar');
            avatars.forEach(fixDimensions);
        })();
        /**
         * Add Discord widget.
         * 
         * WidgetBot source: https://github.com/widgetbot-io/widgetbot
         * Crate: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
         */
        ;(function () {
            var regex = /"(\w+)":/g;
            
            var crateOptions = {
                channel: '259951634652725248',
                server: '259951634652725248',
                shard: 'https://e.widgetbot.io',
                color: '#3e4a4c',
                location: ['bottom', 'right']
            };
            
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
            
            var popupData = {
                content: 'Interested in Bloodborne? Come chat, or join our Discord server!',
                timeout: 10000,
                avatar: 'https://vignette.wikia.nocookie.net/bloodborne/images/3/3d/Bb_doll_art.jpg/revision/latest?cb=20190627220142'
            };
            
            var popup = JSON.stringify(popupData, null, 4);
            popup = popup.replace(regex, '$1:');
            
            var script = document.createElement('script');
            script.setAttribute('id', 'WidgetCrate');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            script.textContent = 'var crate = new Crate(' + options + ');\n\n';
            script.textContent += 'crate.notify(' + popup + ')';
            
            DOMTools.appendTo(document.head, script);
        })();
        /**
         * Highlight-js
         */
        ;(function () {
            var operations = {
                addLines: function (ln) {
                    ln.process();
                },
                initHighlights: function (hljs) {
                    hljs.initHighlighting();
                    mw.hook('dev.CodeblockLineNumbers').add(operations.addLines);
                    return hljs;
                },
                init: function (hljs) {
                    hljs.useTheme('atom-one-dark');
                    hljs.loadAllLanguages()
                        .then(operations.initHighlights, console.error)
                        .then(operations.addButtonListeners, console.error)
                        .fail(console.error);
                },
                addButtonListeners: function (hljs) {
                    var buttons = DOMTools.queryAll('.codeblock-theme-button'),
                        bound;
                    if (!buttons.length) return;
                    buttons.forEach(function (button) {
                        bound = operations.buttonListener.bind(button, hljs);
                        DOMTools.on(button, 'click.CodeBtnTheme', bound);
                    });
                },
                buttonListener: function (hljs, e) {
                    var theme = this.getAttribute('data-theme');
                    if (!theme) return;
                    hljs.useTheme(theme);
                }
            };
            
            mw.hook('dev.highlight').add(operations.init);
        })();
    });
});

/*@end@*/