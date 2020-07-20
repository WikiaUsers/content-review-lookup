var widgets;
var more = [
    '/wiki/Special:RecentChanges',
    '/wiki/Special:NewPages',
    '/wiki/Category:Article_stubs',
    '/wiki/Special:WantedPages',
    '/wiki/Special:Contributions',
    '/wiki/Special:Following',
    '/wiki/Special:AllPages'  /* there's no such page as "Active Talk Pages" on Wikia */
];

$(function() {
    if ($('#infowidgets-demo').length) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:InfoWidgets/code.js'
        });
        /* wiki code does not permit selects, so we have to insert them with JS: */
        var html = '<select id="widget-switch">';    
        html += '<option value="0">Recently Edited Pages</option>';
        html += '<option value="1">New Pages</option>';
        html += '<option value="2">Article Stubs</option>';
        html += '<option value="3">Wanted Pages</option>';
        html += '<option value="4">My Contributions</option>';
        html += '<option value="5">My Watchlist</option>';
        html += '<option value="6">Active Talk Pages</option>';
        html += '</select>';
        html += '<div id="widget-container"></div>';
        html += '<a id="more" href="' + more[0] + '">more...</a>';
        $('#infowidgets-demo').append(html);
        window.widgetsLoaded = function () {
            widgets = [
                Widgets.recentChanges(),
                Widgets.newPages(),
                Widgets.stubs(),
                Widgets.wantedPages(),
                Widgets.contribs(),
                Widgets.watchlist(),
                Widgets.activeTalks()
            ];
            for (var i = 0; i < widgets.length; i++) {
                widgets[i].active = 0 === i;
                widgets[i].selector = '#widget-container';
                widgets[i].preload = function () {
                    $('#more').css({ display: 'none' });
                    $('#widget-switch').css({ display: 'none' });
                    $('#infowidgets-demo').css({
                        backgroundImage: 'url(https://images.wikia.nocookie.net/dev/images/a/a0/Throbber.gif)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    });
                };
                widgets[i].postload = function () {
                    $('#more').css({ display: 'block' });
                    $('#widget-switch').css({ display: 'block' });
                    $('#infowidgets-demo').css({ backgroundImage: 'none', backgroundColor: 'rgb(249, 249, 249)' });
                };
                Widgets.add(widgets[i]);
            }
            $('#widget-switch').change(function () {
                var selected = $('#widget-switch').val();
                for (var i = 0; i < widgets.length; i++) {
                    widgets[i].active = i == selected;
                }
                $('#more').attr('href', more[selected]);
                Widgets.restart();
            });
        };
    }
});