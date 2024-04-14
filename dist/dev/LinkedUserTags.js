/**
 * @Name           LinkedUserTags
 * @Version        1.0.0
 * @Author         Ursuul <https://dev.fandom.com/wiki/User:Ursuul>
 * @Description    Preconfigured UserTags installation w/ links & ordering
 * @See also       <https://dev.fandom.com/wiki/UserTags>
 *                 <https://dev.fandom.com/wiki/PrettyUserTags>
 */

;(function(mw) {
	'use strict';

	if (!mw.config.values.profileUserName) return;

	var preloads = 2;
	var msg;

	/* Modules */
	var modules = {
		autoconfirmed: false,
		stopblocked:   false,
		inactive:      false,
		newuser:       false,
		mwGroups: [
			//Local Groups
			'blocked',
			'bot',
			'bureaucrat',
			'content-moderator',
			'sysop',
			'threadmoderator'
		],

		/* MetaFilter */
		metafilter: {
			'bot': 'bot-global',
			'bureaucrat': [
				'bot',
				'founder'
			],
			'content-moderator': [
				'blocked',
				'bot',
				'bureaucrat',
				'sysop'
			],
			'founder': 'bot',
			'sysop': [
				'bot',
				'bureaucrat',
			],
			'threadmoderator': [
				'blocked',
				'bot',
				'bureaucrat',
				'sysop'
			]
		}
	};

	function init() {
		if (--preloads > 0) return;

		/* Tag Definitions */
		window.UserTagsJS = {
			modules: modules,
			tags: {
				//Global Fandom Groups
				'global-discussions-moderator': {
					link:  msg('user-tag-global-discussions-moderator-link').plain(),
					title: msg('user-tag-global-discussions-moderator-tooltip').plain()
				},
				'soap': {
					link:  msg('user-tag-soap-link').plain(),
					title: msg('user-tag-soap-tooltip').plain()
				},
				'staff': {
					link:  msg('user-tag-staff-link').plain(),
					title: msg('user-tag-staff-tooltip').plain()
				},
				'voldev': {
					link:  msg('user-tag-voldev-link').plain(),
					title: msg('user-tag-voldev-tooltip').plain()
				},
				'wiki-specialist': {
					link:  msg('user-tag-wiki-specialist-link').plain(),
					title: msg('user-tag-wiki-specialist-tooltip').plain()
				},
		
				//Local Groups
				'blocked': {
					link:  msg('user-tag-blocked-link').plain(),
					title: msg('user-tag-blocked-tooltip').plain(),
					order: 500
				},
				'bot': {
					link:  msg('user-tag-bot-link').plain(),
					title: msg('user-tag-bot-tooltip').plain(),
					order: 200
				},
				'bureaucrat': {
					link:  msg('user-tag-bureaucrat-link').plain(),
					title: msg('user-tag-bureaucrat-tooltip').plain(),
					order: 300
				},
				'content-moderator': {
					link:  msg('user-tag-content-moderator-link').plain(),
					title: msg('user-tag-content-moderator-tooltip').plain(),
					order: 700
				},
				'sysop': {
					link:  msg('user-tag-sysop-link').plain(),
					title: msg('user-tag-sysop-tooltip').plain(),
					order: 400
				},
				'threadmoderator': {
					link:  msg('user-tag-threadmoderator-link').plain(),
					title: msg('user-tag-threadmoderator-tooltip').plain(),
					order: 800
				}
			}
		};

		/* Custom */
		if (window.LinkedUserTagsFounder) {
			window.UserTagsJS.modules.custom = window.UserTagsJS.modules.custom || {};
			window.UserTagsJS.modules.custom[window.LinkedUserTagsFounder] = 'founder';
		}
	
		/* UserTags Installation */
		mw.util.addCSS(
			'.tag-container a.tag {' +
				'color: inherit;' +
			'}'
		);
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:UserTags/code.js'
		});
	}

	function preload() {
		window.dev.i18n.loadMessages('LinkedUserTags').done(function (i18no) {
			msg = i18no.msg;
			init();
		});
	}

	mw.hook('dev.i18n').add(preload);
	mw.loader.using('mediawiki.util').then(preload);

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.mediaWiki);