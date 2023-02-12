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

var MessageBlock = {
    title: 'Moderator Notice', // Title of Mesaage
    message: '<div style="border: 1px solid black; padding: 0.5em;">You have been warned/blocked for <u><b>$2</b></u> for the following reason:<div style="border: 1px solid black; padding: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em;">$1</div>Please read the [[Rules and Guidelines]] to have a better understanding of the expectations within [[Adopt Me! Wiki]].<br/><br/><u><b>Note:</b></u><br/><li><u>1 hour</u> = Warning</li><li><u>1 week, 2 weeks, 1 month, infinite</u> = Block</li><hr/><u><b>Appeal</b></u><br/>Appeal processes can be done at our appeal wiki: https://adoptme-appeals.fandom.com. <br/><i>See prerequisites and eligibilities there first.</i><div style="text-align: right;"><br/>[[User:Vastmine1029|Vastmine1029]] <sup>([[User_talk:Vastmine1029|Talk]] &bull; [[Special:Contributions/Vastmine1029|Contributions]])</sup> 06:49, 24 February 2021 (UTC)</div></div>', // Body of Message; $1 = reason, $2 = duration
    autocheck: false // Change to "true" when stated by Wiki Administration Team.
};