$(function() {
    if (window.DateBasedSiteLogos) return;
    window.DateBasedSiteLogos = true;
    
    var start_date = '2024-09-16T00:00:00Z',
        logos = [
            'Wiki-wordmark-sakura.png',
            'Wiki-wordmark-kiryu.png',
            'Wiki-wordmark-ulala.png',
            'Wiki-wordmark-sonic.png',
            'Wiki-wordmark-akira.png',
            'Wiki-wordmark-opaopa.png',
            'Wiki-wordmark-alexkidd.png'
        ],
        api;
    
    mw.loader.using([
        'mediawiki.api'
    ]).then(function() {
        api = new mw.Api();
        return api.get({
            action: 'query',
            meta: 'siteinfo',
            siprop: 'general'
        });
    }).then(function(data) {
        var now_date = data.query.general.time,
            days = (new Date(now_date) - new Date(start_date)) / (1000 * 60 *
                60 * 24),
            index = Math.floor(days) % logos.length,
            image = logos[index];
        return api.get({
            action: 'query',
            titles: 'File:' + image,
            prop: 'imageinfo',
            iiprop: 'url|size',
            indexpageids: true
        });
    }).then(function(data) {
        var info = data.query.pages[data.query.pageids[0]].imageinfo[0];
        Array.prototype.slice.call(document.querySelectorAll(
            'a.fandom-community-header__image > img,' +
            'a.fandom-sticky-header__logo > img'
        )).forEach(function(val) {
            val.setAttribute('src', info.url);
            val.setAttribute('width', info.width);
            val.setAttribute('height', info.height);
        });
    });
});