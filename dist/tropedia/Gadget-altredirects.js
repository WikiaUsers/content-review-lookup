if (mw.config.get('wgNamespaceNumber') === 0 && mw.config.get('wgArticleId') !== 0) {
(function() {
    var pagename = mw.config.get('wgPageName'), target = '';
    switch (mw.config.get('skin')) {
        case 'monobook':
            target = 'div#mw-normal-catlinks.mw-normal-catlinks'; break;
        case 'vector':
            target = 'div#mw-normal-catlinks.mw-normal-catlinks'; break;
        case 'monaco':
            target = 'div#mw-normal-catlinks.mw-normal-catlinks'; break;
    }
 
    $(target).after('<div id="jsredirect" style="text-align:center;' + 
      ' font-size:small; font-weight:bold;">Also Known As: </div>');
 
    $.getJSON('https://allthetropes.orain.org/w/api.php?action=query&list=backlinks&bltitle=' + pagename + '&blfilterredir=redirects&format=json', function(data) {
        var redirects = data.query.backlinks, rtext = '';
        for (var r in redirects) {
            if (rtext) { rtext += ', '; }
            rtext += redirects[r].title;
        }
        $('#jsredirect').append(rtext);
    });
}());
}