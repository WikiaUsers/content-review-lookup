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
    $.getJSON('/api.php?action=query&amp;list=allusers&amp;augroup=sysop&amp;format=json', function (data) {
        if (data.query &amp;&amp; data.query.allusers) {
            var html = '';
            for (var i = 0; i &lt; data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '&lt;li>&lt;a href="/wiki/User:' + nURL + '">' + n + '&lt;/a>&amp;nbsp;&lt;small>(&lt;a href="/wiki/Message Wall:' + nURL + '">dyskusja&lt;/a>&amp;nbsp;&amp;middot;&amp;nbsp;&lt;a href="/wiki/Special:Contributions/' + nURL + '">wkład&lt;/a>)&lt;/small>&lt;/li>';
            }
            if (html.length) {
                $('#admin-list').html('&lt;ul>' + html + '&lt;/ul>');
            }
        }
    });
});

$(function ($) {
    "use strict";
    if (!$('#rollback-list').length) return;
    $.getJSON('/api.php?action=query&amp;list=allusers&amp;augroup=rollback&amp;format=json', function (data) {
        if (data.query &amp;&amp; data.query.allusers) {
            var html = '';
            for (var i = 0; i &lt; data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '&lt;li>&lt;a href="/wiki/User:' + nURL + '">' + n + '&lt;/a>&amp;nbsp;&lt;small>(&lt;a href="/wiki/Message Wall:' + nURL + '">dyskusja&lt;/a>&amp;nbsp;&amp;middot;&amp;nbsp;&lt;a href="/wiki/Special:Contributions/' + nURL + '">wkład&lt;/a>)&lt;/small>&lt;/li>';
            }
            if (html.length) {
                $('#rollback-list').html('&lt;ul>' + html + '&lt;/ul>');
            }
        }
    });
});

$(function ($) {
    "use strict";
    if (!$('#bureaucrat-list').length) return;
    $.getJSON('/api.php?action=query&amp;list=allusers&amp;augroup=bureaucrat&amp;format=json', function (data) {
        if (data.query &amp;&amp; data.query.allusers) {
            var html = '';
            for (var i = 0; i &lt; data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '&lt;li>&lt;a href="/wiki/User:' + nURL + '">' + n + '&lt;/a>&amp;nbsp;&lt;small>(&lt;a href="/wiki/Message Wall:' + nURL + '">dyskusja&lt;/a>&amp;nbsp;&amp;middot;&amp;nbsp;&lt;a href="/wiki/Special:Contributions/' + nURL + '">wkład&lt;/a>)&lt;/small>&lt;/li>';
            }
            if (html.length) {
                $('#bureaucrat-list').html('&lt;ul>' + html + '&lt;/ul>');
            }
        }
    });
});