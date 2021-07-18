/**
 * Displays the share of user's local edits in the global editcount in user's masthead
 * @docs [[EditsShare]]
 * @author Kofirs2634
 */
mw.loader.using('mediawiki.api', function() {
	if (window.EditsShare) return
	window.EditsShare = true

	const c = mw.config.get(['profileUserId']),
		api = new mw.Api()
	var i18n
	if (!c.profileUserId) return

	function init() {
		api.get({
			list: 'users',
			ususerids: c.profileUserId,
			usprop: 'editcount'
		}).done(function(r) {
			var share = parseInt($('.user-identity-stats li:first-child strong').text()) / r.query.users[0].editcount * 100
			$('.user-identity-stats li:first-child')
				.after($('<li>', { class: 'edits-share', text: i18n.msg('share').plain() + ': ' })
					.append($('<strong>', { text: share.toFixed(2) + '%' })))
		})
		.fail(function(e) { console.error('EditsShare caught an error:', e) })
	}

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' })
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('EditsShare').done(function(i18np) {
			i18n = i18np; i18n.useUserLang()
			var timer = setInterval(function() {
				if ($('#userProfileApp').length) { clearInterval(timer); init() }
			}, 1000)
		})
	})
});