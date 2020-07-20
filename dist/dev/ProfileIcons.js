/* <nowiki>
 * 
 * @module                  ProfileIcons
 * @description             Prepends a WDS icon to each user page tab
 * @author                  Unai
 * @version                 1.21
 * @license                 CC-BY-SA 3.0
 * 
 */
(function ($, mw) {
	'use strict';
	if (!$('#WikiaUserPagesHeader').exists() || $('.profile-icons').exists()) {
		return;
	}
	mw.hook('dev.wds').add(function (wds) {
		$(".tabs li").each(function () {
			var _id = $(this).data('id'),
				_name;
			switch (_id) {
				case 'profile':
					_name = 'user';
					break;
				case 'talk':
				case 'wall':
					_name = 'comment';
					break;
				case 'blog':
					_name = 'quote';
					break;
				case 'contribs':
					_name = 'pencil';
					break;
				case 'following':
					_name = 'pages';
					break;
				case 'user-activity':
					_name = 'activity';
			}
			$('a', this).prepend(wds.icon(_name, {
				'class': 'profile-icons wds-icon-small'
			}));
		});
	});
	importArticle({ type: 'script', article: 'u:dev:WDSIcons/code.js' });
}(jQuery, mediaWiki));