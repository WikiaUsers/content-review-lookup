/* Credits to joritochip */
mw.hook("wikipage.content").add(function($content) {
	var links = $('#mw-content-text a.new');
	links.each(function(index, element){
		 if (!$(element).attr('href')) {
			var title = $(element).attr('title');
			if (title.startsWith('User:') && title.endsWith('(page does not exist)')) {
				title = title.slice(0, -22);
				var decodedURL = mw.util.getUrl(title);
				$(element).removeAttr('data-uncrawlable-url');
				$(element).attr('href', decodedURL);
			}
		}
	});
});

/* Restores the post button to redirect to user's Discussions posts on MediaWiki 1.33.3 as it did on MediaWiki 1.19.24 */
mw.loader.using('mediawiki.api', function() {
	'use strict';
	
	var user = mw.config.get('wgRelevantUserName');
	
	if (
		window.DiscussionPLReady ||
		!user
	) return;
	window.DiscussionPLReady = true;
	
	var api = new mw.Api(),
		data, id;
		
	api.get({
		action: 'query',
		list: 'users',
		ususers: user
	}).then(function(d) {
		data = d.query.users;
		if (!data.length) return;
		id = data[0].userid;
		
		var interval = setInterval(function() {
			if ($('#userProfileApp .user-profile-navigation').length) {
				clearInterval(interval);
				
				var identity = $('.user-identity-stats a[href^="/wiki/Special:UserProfileActivity/'+user+'"]');
				if (identity.length) {
					identity.each(function() {
						$(this).attr('href', '/f/u/'+id);
					});
				}
			}
		}, 1000);
	});
});