(function ($, mw) {
    'use strict';

    const config = mw.config.get([
        'profileUserName',
        'wgUserGroups',
        'isGamepedia',
        'wgNamespaceNumber',
        'wgRelevantUserName'
    ]);

    if (!/sysop|staff|helper|global-discussions-moderator|wiki-specialist|soap/.test(config.wgUserGroups)) { return; }
    if ((config.isGamepedia && config.wgNamespaceNumber != 202) || (!config.isGamepedia && !config.profileUserName)) { return; }

    var user = config.profileUserName;
    if (config.isGamepedia) { user = config.wgRelevantUserName; }
    
    function findContainer(identifier) {
        var promise = $.Deferred();
        var interval = setInterval(function() {
            var $element = $(identifier);
            if ($element.length) {
                clearInterval(interval);
                promise.resolve($element);
            }
        }, 300);
        return promise;
    }

    var AF = false;
    var DAF = false;

    $.ajax({
        type: "GET",
        url: mw.util.wikiScript('api'),
        async: false,
        data: {
            action: 'query',
            meta: 'siteinfo',
            siprop: 'extensions',
            format: 'json'
        },
        success: function(d) {
            AF = (d.query.extensions.filter(function(ext) {
                return ext.name == 'Abuse Filter';
            }).length > 0);
            DAF = (d.query.extensions.filter(function(ext) {
                return ext.name == 'DiscussionsAbuseFilter';
            }).length > 0);
        }
    });
    
    var platformContainer = '.user-identity-avatar';
    if (config.isGamepedia){ platformContainer = ".mainavatar"; }
    
    $.when(findContainer(platformContainer)).then(function(_container) {
        if (!config.isGamepedia) {
            var clear = 190;
            if (AF || DAF) { clear = 220; }
            if ($('#userProfileApp .user-identity-box').height() < clear ) {
                $('#userProfileApp .user-identity-box').css("height", clear + "px");
            }
        }

        var list = $("<ul>", {
            class: "user-admintools",
            id: "user-admintools",
            css: {
                "display": "flex",
                "justify-content": "center",
                "flex-wrap": "wrap",
                "margin-left": "0"
            }
        })[0];

        if (config.isGamepedia) { list.style.maxWidth = "96px"; }

        var item = document.createElement("a");
        item.classList.add("page-side-tool");
        item.style = "margin-right: 5px";

        // User rights
        item.href = mw.util.getUrl("Special:UserRights/") + user;
        item.title = "Change user rights for " + user; // Add title attribute
        item.innerHTML = '<div class="wds-icon-small" id="dev-wds-icons-pencil"></div>';
        list.appendChild(item.cloneNode(true));

        // Block
        item.href = mw.util.getUrl("Special:Block/") + user;
        item.title = "Block user " + user; // Add title attribute
        item.innerHTML = '<div class="wds-icon-small" id="dev-wds-icons-error"></div>';
        list.appendChild(item.cloneNode(true));

        // Block log
        item.href = mw.util.getUrl("Special:Log/block") + "?page=User:" + user;
        item.title = "View block log for " + user; // Add title attribute
        item.innerHTML = '<div class="wds-icon-small" id="dev-wds-icons-bullet-list"></div>';
        list.appendChild(item.cloneNode(true));

        if (AF || DAF) {
            var flexBreak = $("<div>", {
                id: "user-admintools-flexbreak",
                css: {
                    "width": "0",
                    "flex-basis": "100%"
                }
            })[0];
            list.appendChild(flexBreak);
        }

        // AF log
        if (AF) {
            item.href = mw.util.getUrl("Special:AbuseLog") + "?wpSearchUser=" + user;
            item.title = "View abuse log for " + user; // Add title attribute
            item.innerHTML = '<div class="wds-icon-small" id="dev-wds-icons-alert"></div>';
            list.appendChild(item.cloneNode(true));
        }

        // DAF log
        if (DAF) {
            $('<button>', {
                click: function click() { $("#DiscussionsAFLog").click(); },
                html: '<div class="wds-icon-small" id="dev-wds-icons-discussions"></div>',
                title: "View discussions abuse log for " + user, // Add title attribute
                css: { "margin-right": "5px" },
                class: "page-side-tool",
                appendTo: list
            });
        }

        _container[0].appendChild(list);

        mw.hook('dev.wds').add(function(wds) { wds.render('#user-admintools'); });

        importArticles({ 
            type: 'script',
            articles: [
                'u:dev:MediaWiki:WDSIcons/code.js',
                'u:dev:MediaWiki:DiscussionsAFLog.js',
            ]
        });
    });
}(window.jQuery, window.mediaWiki));