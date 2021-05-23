/**
 * Brings back the user's first edit date to their profile masthead
 * @docs [[FirstEditDate]]
 * @author Kofirs2634
 */
$(function() {
	if (window.FirstEditDate) return;
	window.FirstEditDate = true;
	
	const c = mw.config.get(['wgScriptPath', 'profileUserId']);
	var i18n;
	if (!c.profileUserId) return;

	function init() {
		$.ajax({
			method: 'get',
			url: c.wgScriptPath + '/wikia.php',
			data: {
				controller: 'UserProfile',
				method: 'getUserData',
				format: 'json',
				userId: c.profileUserId
			}
		}).done(function(r) {
			$('.user-identity-stats')
			.append($('<li>', { id: 'wr', text: i18n.msg('label').plain() + ' ' })
				.append($('<strong>', {
					text: r.userData.registration ? r.userData.registration : i18n.msg('noedit').plain()
				}))
			);
		}).fail(function(e) {
			console.error('FED says an exception:', e)
		})
	}
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js' })
	
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('FirstEditDate').done(function(i18np) {
			i18n = i18np;
			i18n.useUserLang();
			var timer = setInterval(function() {
				if ($('#userProfileApp').length) {
					clearInterval(timer);
					init()
				}
			}, 1000);
		})
	})
});