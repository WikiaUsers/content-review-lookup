// Color-code links to Terraria Wiki redirects, by Equazcion

var done = [];

$('a.mw-redirect, a.extiw').each(function(){
	var $link = $(this);
	var $title = $link.attr('href').substr(1);
	var title = decodeURIComponent($title.replace(/_/g, ' '));

	if ( $link.attr('title').substr(0,4) == 'tgc:' ){ 
		$link.attr('title', 'Terraria Wiki: ' + $link.attr('title').substr(4) + ' (this link is a redirect to the main Terraria Wiki)');
	} else {
	
		if ($.inArray(title, done) < 1) {
			done.push(title);
			
			var q = {
				action: 'query',
				format: 'json',
				titles: title,
				redirects: ''
			}

			$.getJSON('https://terrariamods.gamepedia.com/api.php?callback=?', q, function (data){
				var prefix = data.query.redirects[0].tointerwiki;

				if (prefix == 'tgc') {

					$('a.mw-redirect[href="/' + $title + '"]').addClass('extiw').attr('title', 'Terraria Wiki: ' + title + ' (this link is a redirect to the main Terraria Wiki)');
				}
			});
		}
	}		
});