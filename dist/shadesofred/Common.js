//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/**
 * User Badges Script.
 *
 * This script adds extra badges to the user "masthead" on user pages. It
 * allows you to add badges for Bureaucrats, Chat Moderators, etc in addition
 * to the default "Founder", "Admin" and "Blocked" badges. There are also
 * several pseudo group badges for users who aren't autoconfirmed (haven't
 * been registered for 3 days, less than 5 edits) and global Wikia accounts
 * that have not contributed to your particular Wiki. The script also
 * replicates the functionality of InactiveUsers so you don't need that.
 *
 * You can also make up your own badges if you want.
 *
 * Architectural TODO: The current design is linear with branching paths,
 *	it could be better structured instead of just being a cluster of
 *	interlocking functions.
 */
if (window.UserBadgesJS !== true) // Requested, allow global.js (prevent double run)
(function($, document, mwconf, settings) {
	"use strict";

	mwconf = (mwconf && mwconf.config) || { get: function(p) { return window[p]; } };

	//
	// Logger
	//
	var logger = {
		_console: window.console || { log: $.noop, error: $.noop, warn: $.noop },
		_log: function(fn, args) {
			args = [].slice.call(args);
			args.unshift('USERBADGE:');
			return fn.apply(this._console, args);
		},
		log: function() { return this._log(this._console.log, arguments); },
		err: function() { return this._log(this._console.error, arguments); },
		warn: function() { return this._log(this._console.warn, arguments); }
	};

	var groups_class = '', badge_prefix = '', badge_postfix = ''
	  , username = mwconf.get('wgTitle')
	  ;

	//
	// Different skins require different setups.
	//
	switch (mwconf.get('skin')) {
	case 'oasis':
		// Pain in the ass. We need to figure out if we're on a user page or not
		// without DOM query (we want to launch the AJAX *NOW*) but Oasis doesn't
		// have any 'wgIsUserpage' or anything that would be very useful like that.
		groups_class = mwconf.get('wgNamespaceNumber'); // Lack of block scope SUCKS.
		if (({'-1':1,2:1,3:1,500:1,1200:1})[groups_class] !== 1) return;
		
		/*jshint eqeqeq:false */
		// MediaWiki disallows names from containing forward slashes which is very
		// useful here since Wikia has blog lists AND blog posts in NS500 (WTF? The
		// list should be a Special Page). So we need to check for that.
		// NOTE: Double equals is intentional.
		if (groups_class == 500 && username.indexOf('/') !== -1) return;
		
		// And special pages...
		if (groups_class == -1) {
		/*jshint eqeqeq:true */
			groups_class = mwconf.get('wgCanonicalSpecialPageName');
			if (groups_class === 'Contributions') {
				// Why be simple when you can be obtuse?
				// wgPageName/wgTitle does not include the username, we need to pull
				// it directly from the window location.
				username = window.decodeURIComponent(window.location.pathname);
				username = username.substr(username.lastIndexOf('/') + 1);
				if (username === '' || username === mwconf.get('wgPageName')) {
					username = mwconf.get('wgUserName'); // No user name, it displays self
				}
			} else if (groups_class === 'Following') { // Self only
				username = mwconf.get('wgUserName');
			} else {
				return; // Some other special page.
			}
		}
		
		// MW1.16 and 1.19 disagree on what CSS class to use.
		groups_class = mwconf.get('wgVersion') === '1.16.5' ? 'group ' : 'tag ';
		break;
	case 'monobook':
		// User, User Talk, Message Wall
		if (({2:1,3:1,1200:1})[mwconf.get('wgNamespaceNumber')] !== 1) return;

		badge_prefix  = '[';
		badge_postfix = ']';
		break;
	default:
		return logger.err('Unsupported skin:', mwconf.get('skin'));
	}

	//
	// Clean up settings.
	//
	settings = $.extend({ // Defaults
		inactive: 30, // Inactive if no edits in this many days, 0=disabled
		gone: {},
		groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
		stopBlocked: true, // Don't display any non-custom badges for blocked users
		newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
		nonusers: true, // Tag global Wikia accounts that have never edited anything
		custom: {
                          DatRegularShow: ['Overlord']
                         }, // Map of user names to arrays of strings
		names: {
                        Founder: 'DA MASTAHH!'
                        }, // Badge display names
		debug: false
	}, settings);
	settings.groups = $.extend(settings.groups, {}); // Convert string/num/bool/null/undefined
	settings.gone   = $.extend(settings.gone,   {}); // to empty object.
	settings.custom = $.extend(settings.custom, {});
	settings.names  = $.extend(settings.names,  {});
	// Anti-stupid defense
	if ($.isArray(settings.groups)) logger.warn('groups should NOT be an array');
	if ($.isArray(settings.custom)) logger.warn('custom should NOT be an array');
	if ($.isArray(settings.gone)) logger.warn('gone should NOT be an array');
	settings.inactive = Math.max(settings.inactive, 0) || 0; // >=0, NaN = zero
	settings.names = $.extend({ // Defaults, user can override to translate.
		// These groups are real but there are no server translations for them
		patroller: 'Patroller',
		rollback: 'Rollback',
		// These are fake groups that the server won't answer
		newuser: 'New Editor',
		inactive: 'Inactive',
		nonuser: 'Never Edited'
	}, settings.names);
	// Clean the garbage out of the global object
	if (!settings.debug) window.UserBadgesJS = true; // Flag to prevent double-run
	else window.UserBadgesJS = settings; // Expose end state for inspection

	logger.log('Executing');

	//
	// Construct a list of messages that we need from the server.
	// We only send for ones we weren't given in the configuration.
	//
	var message_list = (function() { // Block scope
		var names = settings.names, group, list = '';
		for (group in settings.groups) {
			if (names[group] === void 0) {
				list += '|group-' + group + '-member';
			}
		}
		return list.substr(1); // Peel off leading pipe
	})();

	//
	// Begin AJAX Storm
	// TODO: It's possible to roll all these up into a single huge request which
	//	might shave a few milliseconds off. Also reduces amount of bandwidth needed.
	//	(Corresponding logic is obviously simplified by this change)
	//
	var apiUrl = mwconf.get('wgScriptPath') + '/api' + mwconf.get('wgScriptExtension');
	// Issue an AJAX to get translations for group names
	message_list = message_list && $.ajax(apiUrl, {
			data: {
				format: 'json',
				maxage: 86400, // 24hr cache, hopefully
				smaxage: 86400,
				action: 'query',
				meta: 'allmessages',
				amargs: username, // For gender
				amenableparser: 1,
				ammessages: message_list
			},
			cache: true,
			dataType: 'json'
		})
		.fail(function(o,s,m) { return logger.err('Could not download translations:', o.status, s, m); });
	// Issue an AJAX to get the user's group memberships
	var groups_ajax = $.getJSON(apiUrl, {
			format: 'json',
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'groups|blockinfo'
		})
		.fail(function(o,s,m) { logger.err('Could not download user information:', o.status, s, m); })
	;
	// And another to get their contributions list
	var contribs_ajax = settings.inactive !== 0 && !settings.gone[username]
		&& $.getJSON(apiUrl, {
			format: 'json',
			action: 'query',
			list: 'usercontribs',
			uclimit: 1,
			ucuser: username,
			ucdir: 'older', // Newest edit
			ucprop: 'timestamp'
		})
		.fail(function(o,s,m) { logger.err('Could not download user contributions:', o.status, s, m); })
	;
	if (settings.debug) logger.log('AJAX away:', message_list, groups_ajax, contribs_ajax);

	//
	// All AJAX is in-flight, now we just need to wait for the responses (and the DOM)
	//
	var $masthead;
	$(function() {
		switch(mwconf.get('skin')) { // Initialise step 2, Get mastheads
		case 'oasis':
			// Only run if the page has a user masthead.
			$masthead = document.getElementById('WikiaUserPagesHeader');
			if (!$masthead) { // Should never happen
				return logger.err('Internal Error. No WikiaUserPagesHeader.');
			}
			$masthead = $('#UserProfileMasthead > .masthead-info > hgroup', $masthead);
			if (!$masthead.length) { // Should never happen
				return logger.err('Internal Error. No Masthead');
			}
			break;
		case 'monobook':
			$masthead = $('#firstHeading');
			if (!$masthead.length) { // This shouldn't happen
				return logger.err('Monobook page with no heading?');
			}
		}
		
		// BUGFIX: Trailing whitespace turns into a visible space which screws with
		//	margins, unnecessary pain in the ass so fix it.
		$masthead[0].normalize();
		var whitespace = $masthead[0].lastChild;
		if (whitespace.nodeType === 3) {	// TextNode
			if ((/^\s*$/).test(whitespace.data)) {
				// Text is 100% whitespace, just delete it.
				whitespace.parentNode.removeChild(whitespace);
			} else {
				// Text is not 100% whitespace, just remove the whitespace part (if any)
				whitespace.data = whitespace.data.replace(/\s+$/, '');
			}
		}
	
		if (message_list) {
			return message_list
				.done(processTranslations)
				.always(function() { return groups_ajax.done(processUserGroups); })
			;
		}
		groups_ajax
			.done(processUserGroups)
			.fail(function() { // Custom only, maybe inactive
				return processUserGroups( // Fake minimal response
					{ query: { users: [ { name: username, invalid: '' } ] } }
				);
			})
		;
	});


	function processTranslations(json) {
		if (settings.debug) logger.log('Received response to meta allmessages', json);
		json = json.query.allmessages;
		var i = json.length, text = settings.names, regex = /^group-(.+?)-member$/;
		while (i--) {
			if (json[i].missing !== void 0) continue;
			text[regex.exec(json[i].name)[1]] = json[i]['*'];
		}
		if (settings.debug) logger.log('Translations processed:', json.length, json, text);
	}
	function addBadge(group, text) {
		var badge = document.createElement('span');
		badge.className = groups_class + group + '-user';
		if (text) badge.setAttribute('data-text', text);
		if (settings.debug) logger.log('Badge created:', badge, text);

		$masthead.append(
			$(badge).text(badge_prefix + (text || settings.names[group]) + badge_postfix)
		);
	}
	function processInactive(json) {
		if (settings.debug) logger.log('Received response to user contributions', json);
		json = json.query.usercontribs[0];
		if (!json) { // 0 contributions
			return settings.nonusers ? addBadge('nonuser') : null;
		}

		// Decode ISO8601 date and convert it to milliseconds
		// This regex only supports basic dates that MediaWiki produces, it isn't comprehensive.
		// It also doesn't support non UTC Timezones, I'm pretty sure MW never curveballs us
		// like that though so it should be fine.
		var when = (/^(\d{4})-?(\d\d)-?(\d\d)[T\s](\d\d):?(\d\d):?(\d\d)(?:\.?(\d+))?(?:Z|\+00(?::?00)?)$/).exec(json.timestamp);
		if (!when) { // Shouldn't happen, ever
			return logger.err('Unparsable ISO8601 Strict Timestamp:', json.timestamp);
		}
		when = +new Date(when[1], when[2] - 1, when[3], when[4], when[5], when[6]);
		// Figure out the window of time the user must have made at least 1
		// contribution during.
		var lim = new Date();
		lim = +lim + lim.getTimezoneOffset() * 6e4; // To UTC
		lim -= settings.inactive * 864e5;

		// Has the user been inactive for beyond the limit?
		if (when < lim) addBadge('inactive');
	}
	function processUserGroups(json) {
		if (settings.debug) logger.log('Received response to list users', json);
		var blocked = false, autoconfirmed = false, i, l;
		json = json.query.users[0];

		// Invalid user name, probably an anonymous editor
		if (json.invalid === void 0) {
			// Blocked users (blockedby, blockreason, blockexpiry)
			blocked = json.blockexpiry !== void 0;
			if (blocked && settings.debug) logger.log('User is blocked');

			// MW1.16 doesn't include implict groups so we can end up with no groups array
			// Global accounts that haven't edited the local wiki have no groups [MW1.19]
			if ((!blocked || !settings.stopBlocked) && json.groups !== void 0) {
				json = json.groups;

				// Iterate all groups and add badges for any groups in the list
				for (i = 0, l = json.length ; i < l ; ++i) {
					if (settings.groups[json[i]]) addBadge(json[i]);
					autoconfirmed = autoconfirmed || json[i] === 'autoconfirmed';
				}

				// No implicit groups in MW1.16, can't check for autoconfirmed.
				if (settings.newusers && !autoconfirmed && mwconf.get('wgVersion') !== '1.16.5') {
					addBadge('newuser');
				}
			}
		} else if (settings.debug) {
			logger.log('MediaWiki says this user is invalid (i.e. Anonymous)');
		}

		// Custom badges
		json = settings.custom[username];
		if ($.isArray(json)) {
			for (i = 0, l = json.length ; i < l ; ++i) addBadge('custom', json[i]);
		}

		// Inactive "group", static list check first then AJAX check
		if (!blocked || !settings.stopBlocked) {
			if (settings.gone[username]) {
				addBadge('inactive');
			} else if (contribs_ajax) {
				contribs_ajax.done(processInactive);
			}
		}
	}
})(jQuery, document, window.mediaWiki, window.UserBadgesJS);
//</syntaxhighlight>