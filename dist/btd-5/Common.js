/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { days: 45 };

$(document).ready(function () {
    if ($('#info-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
 
            np = Widgets.newPages();
            np.selector = '#new-pages';
            Widgets.add(np);
 
            rc = Widgets.recentChanges();
            rc.selector = '#recent-changes';
 
            rc.params.rcnamespace = '0'
            Widgets.add(rc);
 
            Widgets.add({
                selector: '#new-files',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 6
                }
            });
         }
    }
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:FileUsageAuto-update/code.js'
    ]
});

$(document).ready(function () {
    $.ajax({
        url: 'http://bloons.wikia.com/api.php?action=parse&page=Daily_Challenge&format=json',
        dataType: 'jsonp'
    })
    .done(function (data) {
        // raw html stored in data.parse.text['*'];
        // put it in #mw-content-text or whatever container you want
 
        $('#daily-challenge').html(data.parse.text['*']);
    });
});