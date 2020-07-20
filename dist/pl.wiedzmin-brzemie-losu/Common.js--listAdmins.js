/* Any JavaScript here will be loaded for all users on every page load. */
/** 
 * __NOWYSIWYG__
 *
 * lists all admins on the wiki
 * documentation at: http://dev.wikia.com/wiki/ListAdmins
 * © Peter Coester, 2012
 * 
 */
/*jshint curly:false */
/*global mediaWiki */
$(function ($) {
    "use strict";
    if (!$('#admin-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/Użytkownik:' + nURL + '">' + n + '</a>&nbsp;<small>(<a href="/wiki/Dyskusja użytkownika:' + nURL + '">dyskusja</a>&nbsp;&middot;&nbsp;<a href="/wiki/Specjalna:Wkład/' + nURL + '">wkład</a>)</small></li>';
            }
            if (html.length) {
                $('#admin-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});
 
$(function ($) {
    "use strict";
    if (!$('#rollback-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=rollback&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/Użytkownik:' + nURL + '">' + n + '</a>&nbsp;<small>(<a href="/wiki/Dyskusja użytkownika:' + nURL + '">dyskusja</a>&nbsp;&middot;&nbsp;<a href="/wiki/Specjalna:Wkład/' + nURL + '">wkład</a>)</small></li>';
            }
            if (html.length) {
                $('#rollback-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});
 
$(function ($) {
    "use strict";
    if (!$('#bureaucrat-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=bureaucrat&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/Użytkownik:' + nURL + '">' + n + '</a>&nbsp;<small>(<a href="/wiki/Dyskusja użytkownika:' + nURL + '">dyskusja</a>&nbsp;&middot;&nbsp;<a href="/wiki/Specjalna:Wkład/' + nURL + '">wkład</a>)</small></li>';
            }
            if (html.length) {
                $('#bureaucrat-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});