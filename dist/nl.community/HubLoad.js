function getWikiUrl(wikilink) {
    $.get(wikilink).done(function(data) {
        var directlink = $(data).find('.extiw').attr('href');
 
        // Another type of infobox %)
        if (typeof(directlink) == 'undefined') {
            directlink = $(data).find('a.free').attr('href');
        }
 
        if (directlink.indexOf('wiki/') > -1) {
           directlink = directlink.replace(/wiki\/.*/,'');
        }
 
        // Additional check if we missed / and the end
        if (directlink.replace(/.*(.)$/,'$1') != '/') {
            directlink += '/';
        }
 
        getWikiInfo(directlink);
    });
}
 
function getWikiInfo(dl) {
    var wikilinknew = dl;
 
    $.ajax({
        url: dl + 'api.php',
        crossDomain: true,
        data: {
            action: 'query',
            titles: 'File:Wiki-wordmark.png',
            prop: 'imageinfo',
            iiprop: 'url',
            meta: 'siteinfo',
            siprop: 'statistics|general|category',
            format: 'json'
        },
        dataType: 'jsonp',
        jsonp: 'callback',
        type: 'GET'
    }).done(function(data) {
        lang = data.query.general.lang;
        if (lang !== mw.config.get('wgContentLanguage')) return;
        
        stats = data.query.statistics.articles;
        wikiname = data.query.general.sitename;
        category = data.query.category.catname;
 
        $.each(data.query.pages, function(k,v) {
            wordmark = v.imageinfo[0].url;
        });
 
        if (wordmark.match('video151')) {
            wordmark = wikiname;
        }
 
        buildWikiInfobox(wikiname, stats, wordmark, wikilinknew, category);
    });
}
 
function buildWikiInfobox(wikiname, stats, wordmark, wiki, cat) {
    // Choosing category class
    switch(cat) {
        case 'Comics':
            catnum = 1;
            break;
        case 'TV':
            catnum = 2;
            break;
        case 'Movies':
            catnum = 3;
            break;
        case 'Music':
            catnum = 4;
            break;
        case 'Books':
            catnum = 5;
            break;
        case 'Gaming':
            catnum = 6;
            break;
        case 'Lifestyle':
        case 'Travel':
        case 'Creative':
        case 'Toys':
        case 'Education':
            catnum = 7;
            break;
        case 'Wikia':
            catnum = 8;
            break;
        default:
            catnum = 0;
            break;
    }
 
    // Checking wordmark's kind
    if (wordmark.match('/images/')) {
        var wordmarkres = '<a href="' + wordmark + '" class="image image-thumbnail"><img src="' + wordmark + '" alt="Wordmark ' + wikiname + ' png" width="125" height="33"></a>';
    } else {
        var wordmarkres = '<a href="' + wiki + '" style="line-height:32px;">' + wordmark + '</a>';
    }
 
    // Building table
    $('#wikilist-result').append(
        '<table data-wikiurl="' + wiki.replace(/http:\/\/(.+).wikia.com\//g,'$1') + '" class="hub-box hub-' + catnum + '" cellspacing="0" cellpadding="0" style="display: inline-table; width:155px; background: #F5FFFA&nbsp;; color: #222; margin: 5px; font-size: 90%; padding: 0 0 0 0;">' +
          '<tbody>' +
            '<tr>' +
              '<td colspan="2" style="text-align: center; padding: 4px; height: 50px; background: rgb(25, 24, 23);" class="img-wordmark">' +
                wordmarkres +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<th class="wikia-infobox-header" colspan="2" style="height: 30px; font-size:120%; text-align:center; color: #eee;">' +
                '<a href="' + wiki + '" class="extiw" title="w:c:' + wiki.replace(/http:\/\/(.+).wikia.com\//g,'$1') +'">' +
                  '<span style="color:#fff;">BEZOEK DE WIKI</span>' +
                '</a>' +
              '</th>' +
            '</tr>' +
            '<tr>' +
              '<td colspan="2" style="text-align: center; padding: 3px; height: 16px;">' +
                '<b>' + stats + ' artikels</b>' +
              '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>'
    );
}
 
$(function() {
    // For direct's links
    var wikilinks = [];
 
    // Getting all links
    $('#wikilist-dpl li a').each(function() {
        wikilinks.push($(this).attr('href'));
    });
 
    $('#wikilist-dpl').replaceWith('<div id="wikilist-result"></div>');
 
    $.each(wikilinks, function(k,v) {
        getWikiUrl(v);
    });
});