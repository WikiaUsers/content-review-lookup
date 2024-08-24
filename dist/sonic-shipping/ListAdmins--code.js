/** 
 * lists all admins on the wiki
 * documentation at: https://dev.fandom.com/wiki/ListAdmins
 * © Peter Coester, 2012
 * 
 */
/*jshint curly:true, jquery:true */
/*global mw */

mw.hook('wikipage.content').add(function ($content) {
    'use strict';
    var $adminList = $content.find('#admin-list');
    if (!$adminList.length) {
        return;
    }
    $.getJSON(mw.config.get('wgScriptPath') + '/api.php', {
        action: 'query',
        list: 'allusers',
        meta: 'allmessages',
        formatversion: 2,
        augroup: 'sysop',
        ammessages: 'abusefilter-blocker',
        format: 'json',
    }, function (data) {
        if (!data.error) {
            var abusefilter = data.query.allmessages[0].content,
                allusers = data.query.allusers,
                el = $('<ul>');
            for (var i = 0; i < allusers.length; i++) {
                var name = allusers[i].name;
                if (name !== abusefilter) {
                    el.append(
                        $('<li>').append(
                            $('<a>', {
                                href: mw.config.get('wgArticlePath').replace('$1', 'User:' + name)
                            })
                            .text(name)
                        )
                    );
                }
            }
            $adminList.html(el);
        }
    });
});