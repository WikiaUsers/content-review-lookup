// Color-code links to Terraria Wiki redirects, by Equazcion

var done = [];

$('a.mw-redirect, a.extiw').each(function(){
	var $link = $(this);
	var $title = $link.attr('href').substr(1);
	
	// get plaintext, decoded link target
	var title = decodeURIComponent($title.replace(/_/g, ' '));
    if (title.search("wiki/") === 0) {
        title = title.substr(5);
    }
    
    var newHovertext = ['Terraria Wiki: ', title, ' (this link is a redirect to the main Terraria Wiki)'];

	// direct interwiki links: simply modify the title attribute
	if ($link.attr('title').substr(0, 4) == 'tgc:') { 
		newHovertext[1] = $link.attr('title').substr(4);
		$link.attr('title', newHovertext.join(''));
	
	// indirect interwiki links: find redirect target via API
	} else {
		if ($.inArray(title, done) < 1) {
			done.push(title); // don't handle a link target twice
			
			// parameters for API request
			var q = {
				action: 'query',
				format: 'json',
				titles: title,
				redirects: ''
			};
			
			// do API request: find interwiki prefix of the link's redirect target
			$.getJSON('https://terrariamods.fandom.com/api.php?callback=?', q, function (data) {
				var prefix = data.query.redirects[0].tointerwiki;
				if (prefix == 'tgc') {
					$('a.mw-redirect[href="/' + $title + '"]').addClass('extiw').attr('title', newHovertext.join(''));
				}
			});
		}
	}
});