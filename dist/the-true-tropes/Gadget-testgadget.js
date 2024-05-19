if (mw.config.get('wgNamespaceNumber') === 0 && mw.config.get('wgArticleId') !== 0) {
(function() {
    // Do we have a place to insert this
    var target = '';
    switch (mw.config.get('skin')) {
        case 'monobook':
        case 'vector':
        case 'monaco':
            target = $('div#mw-normal-catlinks.mw-normal-catlinks'); break;
    }
	if (target.length === 0) {
		return false;
	}

    var jsredirect = $('<div id="jsredirect">Also Known As: </div>');
    var pagename = mw.config.get('wgPageName');

	// fetch redirects via API
    $.getJSON('/w/api.php?action=query&list=backlinks&bltitle=' + pagename + '&blfilterredir=redirects&format=json')
      .done( function(data) {
        var redirects = data.query.backlinks;
        for (var r in redirects) {
            if (+r) { jsredirect.append(', '); }
            jsredirect.append( 
            	$('<a>').attr({
            		'href': mw.util.getUrl(redirects[r].title),
            		'class': 'mw-redirect'
            	}).html(redirects[r].title)
            );
        }
        if (redirects.length === 0) {
        	jsredirect.append('none');
        }
      });

	// Finally, add it to the DOM
    $(target).after(jsredirect);
}());
}