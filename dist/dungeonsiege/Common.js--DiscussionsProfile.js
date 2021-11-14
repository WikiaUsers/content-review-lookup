/* DiscussionsProfile: a replacement for LinkToDiscussionsProfileIfTheyDontHaveLivePosts
* https://dev.fandom.com/wiki/LinkToDiscussionsProfileIfTheyDontHaveLivePosts
* Written by TyA, used with permission: https://elderscrolls.fandom.com/wiki/User:TyA
*/

(function () {
	var user = mw.config.get('wgTitle').split("/");
	if(
		window.LTDPOUPAP ||
		user.length < 2 //ensure we have a user 
	) {
		return;
	}
	window.LTDPOUPAP = true;
	user = user[1];
	$.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        list: 'users',
        ususers: user,
        format: 'json'
	}).done(function (data) {
		$(".UserProfileActivityModeration__links").append('<span><a href="/f/u/' + data.query.users[0].userid + '">/f profile</a></span>');
	});
})();