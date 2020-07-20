/** window.atob & window.btoa polyfill
 * WTFPLv2 – https://github.com/davidchambers/Base64.js
 */
!function(){function t(t){this.message=t}var e=this,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var o,n,a=0,i=r,c="";e.charAt(0|a)||(i="=",a%1);c+=i.charAt(63&o>>8-a%1*8)){if(n=e.charCodeAt(a+=.75),n>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");o=o<<8|n}return c}),e.atob||(e.atob=function(e){if(e=e.replace(/=+$/,""),e.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,n,a=0,i=0,c="";n=e.charAt(i++);~n&&(o=a%4?64*o+n:n,a++%4)?c+=String.fromCharCode(255&o>>(-2*a&6)):0)n=r.indexOf(n);return c})}();

/**
 * GW2W Chat link search
 *
 * Decodes Guild Wars 2 chat links in the search panel, and tries to find the
 * corresponding article using the SMW property `Has game id`.
 *
 * by Patrick Westerhoff [User:Poke]
 */
(function chatLinkSearch (window, document, $) {
    var searchBar = document.querySelector('#searchText input');
    if (!searchBar) {
        return;
    }
    var mwApi;

    function smwAskArticle (type, id, callback) {
        var apiData = { action: 'ask', query: '?Has canonical name|?Has context|limit=1|' };
        var query = '[[Has game id::' + id + ']]';
        if (type == 'item') {
            query += '[[Has context::Item]]';
        }
        else if (type == 'location') {
            query += '[[Has context::Location]]';
        }
        else if (type == 'skill') {
            query = query + '[[Has context::Skill]] OR ' + query + '[[Has context::Effect]]';
        }
        else if (type == 'trait') {
            query += '[[Has context::Trait]]';
        }
        else if (type == 'recipe') {
            query = '[[Has recipe id::' + id + ']]';
        }
        else if (type == 'skin') {
            query += '[[Has context::Skin]]';
        }
        else if (type == 'outfit') {
            query += '[[Has context::Outfit]]';
        }
        apiData.query += query;
        mwApi.get(apiData)
        .done(function (data) {
            if (data.query.results.length === 0) {
                callback(null);
            }
            else {
                for (var title in data.query.results) {
                    var canonicalName = data.query.results[title].printouts['Has canonical name'][0];
                    var gameContexts = data.query.results[title].printouts['Has context']
                    callback(title, canonicalName, gameContexts.length ? gameContexts[0] : null);
                    return;
                }
            }
        })
        .fail(function (data) {
            callback(null);
        });
    }

    function decodeChatLink (code) {
        var binary = window.atob(code);
        var octets = new Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            octets[i] = binary.charCodeAt(i);
        }
        return octets;
    }

    function display (code, listItem) {
        var data = decodeChatLink(code);
        var id = data[2] << 8 | data[1];
        var type;
        if (data[0] == 2) {
            type = 'item';
            id = data[3] << 8 | data[2];
            id = (data.length > 4 ? data[4] << 16 : 0) | id;
        }
        else if (data[0] == 4) {
            type = 'location';
        }
        else if (data[0] == 6) {
            type = 'skill';
        }
        else if (data[0] == 7) {
            type = 'trait';
        }
        else if (data[0] == 9) {
            type = 'recipe';
        }
        else if (data[0] == 10) {
            type = 'skin';
        }
        else if (data[0] == 11) {
            type = 'outfit';
        }
        else {
            var span = document.createElement('span');
            span.innerHTML = 'This type of chat link is currently not supported.';
            console.log('Unsupported chatlink. (TYPE '+data[0]+' / ID #'+id+')');
            $(span).fadeIn(1000).appendTo(listItem);
            return;
        }
        smwAskArticle(type, id, function (title, canonicalName, gameContext) {
            var span = document.createElement('span');
            if (title) {
                // If a single chatlink returns a single result, redirect to that page
                //  but don't redirect if it contains anything except a chatlink, e.g. interwiki prefix
                if ($('.mw-search-nonefound').length == 1 && searchBar.value.match(/^\[&[A-Za-z0-9+/=]+\]$/)) {
                    // Redirect only once for the current browsing session for that precise result
                    var key = 'searchredirected-' + searchBar.value;
                    try {
                        if (!sessionStorage.getItem(key)) {
                            sessionStorage.setItem(key, 'true');
                            document.location = '/index.php?title=' + encodeURIComponent(title.replace(/ /g, '_'));
                        }
                    } catch(e) {
                        // This might throw if session storage is disabled or unsupported. Just don't redirect if so.
                    }
                }
                var link = document.createElement('a');
                link.href = '/wiki/' + encodeURIComponent(title.replace(/ /g, '_'));
                link.title = title;
                link.innerHTML = canonicalName || title;
                span.appendChild(link);
                if (type == 'skill' && gameContext == 'Effect') {
                    type = 'effect';
                    }
                span.appendChild(document.createTextNode(' (' + type + ' #' + id + ')'));
            }
            else {
                var msg = 'There is no article linked with this ID (' + id + ') yet.';
                msg += ' If you know what ' + type + ' this chat link links to, please add the ID to the article or create it if it does not exist yet.';
                span.innerHTML = msg;
            }
            $(span).fadeIn(1000).appendTo(listItem);
        });
    }

    window.mw.loader.using('mediawiki.api', function() {
        mwApi = new window.mw.Api();

        // find chat links
        var ul = document.createElement('ul');
        var expr = /\[&([A-Za-z0-9+/]+=*)\]/g;
        var match;
        while ((match = expr.exec(searchBar.value))) {
            var li = document.createElement('li');
            li.innerHTML = '<tt>' + match[0] + '</tt>';
            ul.appendChild(li);
            display(match[1], li);
        }

        // display results
        if (ul.children.length) {
            var div = document.createElement('div');
            div.className = 'gw2w-chat-link-search';
            div.innerHTML = 'The following <a href="/wiki/Chat_link" title="Chat link">chat links</a> were included in your search query:';
            div.appendChild(ul);

            var topTable = document.getElementById('mw-search-top-table');
            $(div).hide().insertAfter(topTable).show('fast');
        }
    });
})(window, document, $);