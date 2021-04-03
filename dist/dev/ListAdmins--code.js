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
    $.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        list: 'allusers|groupmembers',
        augroup: 'sysop',
        aulimit: 'max',
        gmgroups: 'sysop',
        gmlimit: 'max',
        format: 'json'
    }, function (data) {
        if (!data.error) {
            var el = $('<ul>');
            (data.users || data.query && data.query.allusers).forEach(function(u) {
                el.append(
                    $('<li>')
                        .append(
                            $('<a>', {
                                href: mw.util.getUrl('User:' + u.name)
                            })
                            .text(u.name)
                        )
                );
            });
            $adminList.html(el);
        }
    });
});