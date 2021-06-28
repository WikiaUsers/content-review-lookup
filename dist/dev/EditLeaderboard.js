/**
 * Name:		EditLeaderboard
 * Version:		v1.0
 * Author:		Caburum
 * Description:	Creates a leaderboard based on edit count at Special:Leaderboard
 *				Useful for wikis not using the achievements extension
**/

(function() {
	var wg = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgNamespaceNumber'
	]);

	if (wg.wgNamespaceNumber != -1 || wg.wgCanonicalSpecialPageName != 'Leaderboard' || window.EditLeaderboardLoaded) return;
	window.EditLeaderboardLoaded = true;

	mw.util.addCSS('\
		#EditLeaderboard {\
			border-collapse: collapse;\
			width: 100%;\
		}\
		#EditLeaderboard tr {\
			border-bottom: 1px solid var(--theme-border-color);\
		}\
		#EditLeaderboard th {\
			font-weight: 400;\
			padding: 5px;\
			text-align: left;\
		}\
		#EditLeaderboard td {\
			padding: 5px;\
		}\
	');

	$.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg']), mw.hook('wikipage.content').add(function() {return true}))
		.then(function() {
			return new mw.Api().loadMessagesIfMissing(['fandom-pagetitle', 'leaderboard-title', 'achievements-leaderboard-rank-label', 'listusers-username', 'listusersrev-cnt']);
		})
		.then(function() {
			var api = new mw.Api(),
				$contentContainer = $('#content'),
				$pageTitle = $('.page-header__title'),
				$table = $('<table id="EditLeaderboard">' +
					'<thead>' +
						'<tr>' +
							'<th>' + mw.msg('achievements-leaderboard-rank-label') + '</th>' +
							'<th>' + mw.msg('listusers-username') + '</th>' +
							'<th>' + mw.msg('listusersrev-cnt') + '</th>' +
						'</tr>' +
					'</thead>' +
				'</table>'),
				$tableBody = $('<tbody></tbody>');

			$contentContainer.empty(); // Remove already existing content

			api.get({
				action: 'listuserssearchuser',
				contributed: '1',
				limit: '30',
				order: 'edits',
				sort: 'desc',
				offset: '0'
			}).done(function(data) {
				var rank = 1;
				Object.values(data.listuserssearchuser).forEach(function (user) {
					if (/bot|bot-global/.test(user.groups) || user.blocked === '' || typeof user != 'object') return;
					$tableBody.append('<tr>' +
						'<td>' + (rank) + '</td>' +
						'<td><a href="' + mw.util.getUrl('User:' + user.username) + '">' + user.username + '</a></td>' +
						'<td><a href="' + mw.util.getUrl('Special:Contributions/' + user.username) + '">' + user.edit_count + '</a></td>' +
					'</tr>');
					rank++;
				});
			});

			$contentContainer.append($table.append($tableBody));
			$pageTitle.text(mw.msg('leaderboard-title'));
			$(document).prop('title', mw.msg('fandom-pagetitle', mw.msg('leaderboard-title')));
		});
})();