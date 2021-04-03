//<syntaxhighlight lang="javascript">
// <nowiki>
(function (window, $, mw) {
 
    'use strict';
 
    function updateRC() {
        $.getJSON(mw.config.get('wgServer') + '/api.php?action=query&list=recentchanges&rcexcludeuser=' + encodeURIComponent(wgUserName) + '&rclimit=10&rctype=edit&rcprop=user|timestamp|title|ids&format=json', function (data) {
            var rc = data.query.recentchanges;
            $('#rc-list li').each(function (i) {
                $(this).html('Page: <a href="/wiki/' + encodeURIComponent((rc[i].title).replace(/ /g, '_')) + '">' + rc[i].title + '</a><small><sup> (<a href="/wiki/' + encodeURIComponent((rc[i].title).replace(/ /g, '_')) +'?curid=' + encodeURIComponent(rc[i].pageid) + '&diff=' + encodeURIComponent(rc[i].revid) + '&oldid=' + encodeURIComponent(rc[i].old_revid) + '">Diff</a>)</sup></small><br />User: <a href="/wiki/Special:Contributions/' + encodeURIComponent((rc[i].user).replace(/ /g, '_')) + '">' + rc[i].user + '</a>');
            });
        });
    }
 
    $(function () {
 
        var rcModule = '<h1>Recent Changes</h1><div id="rc-module"><ul id="rc-list"><li id="ch1"></li><br /><li id="ch2"></li><br /><li id="ch3"></li><br /><li id="ch4"></li><br /><li id="ch5"></li><br /><li id="ch6"></li><br /><li id="ch7"></li><br /><li id="ch8"></li><br /><li id="ch9"></li><br /><li id="ch10"></li></ul></div>',
            refresh = 30000;
 
        if (typeof window.rcmRefresh === 'number') {
            refresh = window.rcmRefresh;
        }
 
        $('#wikia-recent-activity').html(rcModule);

        updateRC();
 
        window.setInterval(function () {
            updateRC();
        }, refresh);
 
    });
 
}(this, this.jQuery, this.mediaWiki));
// </nowiki>
//</syntaxhighlight>