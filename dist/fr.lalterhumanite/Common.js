mw.loader.using('mediawiki.util', function()
{
	$(function() {
		var user =
mw.config.get('wgUserName');
        $('.insertusername').text(user ? user: 'invité');
	});
});