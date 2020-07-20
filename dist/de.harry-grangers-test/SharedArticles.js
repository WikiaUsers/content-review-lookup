function getIWLink(wiki, callback) {
	$.getJSON('/api.php', {
        action: 'parse',
        text: '[[w:c:' + wiki + ']]',
        prop: 'text',
        format: 'json'
    }, function(res) {
        callback($($.parseHTML(res.parse.text['*'])).filter('p').find('> a').attr('href').replace('/wiki',''));
    });
}
function getIWArticle(wiki, article) {
	getIWLink(wiki, function(url) {
        url = 'https:' + url + 'api.php?' + $.param({
            action: 'parse',
            page: article,
            prop: 'text',
            format: 'json',
            disablepp: 1
        });
        $.getJSON('https://query.yahooapis.com/v1/public/yql', {
            q: 'select * from json where url="' + encodeURI(url) + '"',
            format: 'json'
        }, function(res) {
            if (res.query.count) {
                mw.util.$content.html(res.query.results.parse.text._);
            }
        });
    });
}
getIWArticle('de.stargate', 'Erick Avari');