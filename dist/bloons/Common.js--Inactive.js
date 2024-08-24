/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds an "inactive" tag to the user pages, user talk pages, message walls and blog pages of users who haven't made an edit of any sort for some time
 * See w:c:dev:InactiveUsers for info and attribution
 * © Peter Coester, 2012
 */

InactiveUsers = { 
	months: 2
};

window.InactiveUsers = function (my) {
    
    function restart () {
        $(function () {
            $('.inactive-user', '#UserProfileMasthead')
            .add('.inactive-user', 'h1#firstHeading')
            .remove();
        });
    }    
    
    function getSkinType () {
        switch (skin) {
            case 'uncyclopedia': case 'wowwiki': case 'lostbook': case 'monobook':
                return 'monobook';
            case 'oasis': case 'wikia':
                return 'oasis';
            default:
                return false;
        }
    }
    
    function getUserName () {
        switch (my.skinType) {
            case 'monobook':
                if (2 !== wgNamespaceNumber || -1 !== wgTitle.indexOf('/')) return false;
                return wgTitle;
            case 'oasis':
                if (-1 < [2,3,500,501,1200].indexOf(wgNamespaceNumber) && -1 === wgTitle.indexOf('/')) {
                    return wgTitle;
                } else if (-1 === wgNamespaceNumber && -1 < ['Contributions','Following'].indexOf(wgCanonicalSpecialPageName)) {
                    if ('/index.php' == location.pathname) {
                        return $.getUrlVar('target') || false;
                    }
                    var lastPart = location.pathname.split('/').pop();
                    if (lastPart.length && lastPart != wgPageName) {
                        return decodeURIComponent(lastPart.replace(/_/g, ' '));
                    }
                    return wgUserName;
                }
                return false;
            default:
                return false;
        }
    }
    
    function getApiUrl () {
        
        function ISODateNDaysAgo (days) {
            function pad (n) { return n < 10 ? '0' + n : n; }  
            function ISODateString (d) {  
                return    d.getUTCFullYear() + '-' +
                      pad(d.getUTCMonth()+1) + '-' +
                      pad(d.getUTCDate())    + 'T' +
                      pad(d.getUTCHours())   + ':' +
                      pad(d.getUTCMinutes()) + ':' +
                      pad(d.getUTCSeconds()) + 'Z' ;
            }
            return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
        }

        return '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
               '&ucuser='  + encodeURIComponent(my.userName) +
               '&ucstart=' + ISODateNDaysAgo(0) +
               '&ucend='   + ISODateNDaysAgo(30 * Math.max(1, parseInt(my.months, 10)));
    }
    
    function labelAsInactive () {
        switch (my.skinType) {
            case 'oasis':
                $(function () {
                    $('hgroup', '#UserProfileMasthead').append(
                        '<span class="group inactive-user">' + my.text +  '</span>'
                    );
                });
                break;
            case 'monobook':
                $(function () {
                    $('h1#firstHeading').append(
                        ' <span class="inactive-user">[' + my.text +  ']</span>'
                    );
                })
                break;
        }
    }
    
    my = $.extend({
        text: 'inactive', gone: [], months: 3, debug: false
    }, my);
    
    if (my.debug) restart();
    
    my.skinType = getSkinType();
    my.userName = getUserName();
 
    if (!my.skinType || !my.userName) {
        if (my.debug) console.log('InactiveUsers(abort): ', my);
        return;
    }
    
    if (-1 < my.gone.indexOf(my.userName)) {
        if (my.debug) console.log('InactiveUsers(gone): ', my);
        labelAsInactive();
    } else {
        my.apiUrl = getApiUrl ();
        $.getJSON(my.apiUrl, function (result) {
            my.reply = result;
            if (result.query && result.query.usercontribs && !result.query.usercontribs.length) {
                if (my.debug) console.log('InactiveUsers(query): ', my);
                labelAsInactive();
            }
            if (my.debug) console.log('InactiveUsers(abort): ', my);
        });
    }
    
    return my;

} (window.InactiveUsers = window.InactiveUsers || {});