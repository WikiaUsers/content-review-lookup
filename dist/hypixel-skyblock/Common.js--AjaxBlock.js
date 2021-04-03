/** AjaxBlock.js
 * Originally created by Dorumin (https://dev.fandom.com/wiki/User:Dorumin)
 * Forked by Thundercraft5 (https://dev.fandom.com/wiki/User:Thundercraft5)
 * Allows for blocking of users without leaving the page.
 * 
 * @module			 AjaxBlock.js
 * @version 		 0.6
 * @description		 Allows for blocking of users without leaving the page
 * @author			 Thundercraft5
 * @author			 Dorumin
 * @external		 I18n.js (https://dev.fandom.com/wiki/MediaWiki:I18n-js/code.js)
 * @external		 QDModal (https://dev.fandom.com/wiki/MediaWiki:QDmodal.js)
 */
 
/* jshint
	esversion: 6, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, importArticle, BannerNotification */
 
$.when(
	mw.loader.using('mediawiki.api', 'mediawiki.notify'),
	$.Deferred(function(def) {
		mw.hook('dev.i18n').add(function(i18n) {
			def.resolve(i18n);
		});
	}),
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	}),
	$.Deferred(function(def) {
		if (mw.libs.QDmodal) {
			def.resolve();			
		} else {
			$.ajax({
				cache: true,
				dataType: "script",
				url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
			}).then(function() {
				def.resolve();
			});
		}
	})
).then(function(x, lib) {
	var ver = '0.6';
	
	function logWarn() {
		var args = Array.from(arguments);
		args.unshift('[AjaxBlock v' + ver + '] [WARN]:');
		console.warn.apply(console, args);
	}
	
	function logMsg() {
		var args = Array.from(arguments);
		args.unshift('[AjaxBlock v' + ver + '] [LOG]:');
		console.log.apply(console, args);
	}
	//Double-runs
	if (window.AjaxBlockInit) return logWarn('Script double loaded, exiting...');
	window.AjaxBlockInit = true;
 
	var rights = /^(sysop|staff|helper|global-discussions-moderator|wiki-manager|soap)$/m,
		wg = mw.config.get([
			'wgUserGroups',
			'wgNamespaceIds',
			'wgCanonicalSpecialPageName',
			'wgServer',
			'wgArticlePath',
			'wgVersion',
			'wgArticlePath',
			'wgPageName',
		]),
		isUCP = wg.wgVersion !== "1.19.24",
		pagePathname = wg.wgArticlePath.replace('$1', ''),
		pagename = wg.wgPageName;
 
	if (!rights.test(wg.wgUserGroups.join('\n'))) return logMsg('Right requirements not met, exiting...');
 
	// Import styles
	importArticle({
		type: 'style',
		article: 'MediaWiki:Common.js/AjaxBlock.css'
	});
 
	// Declare constants
	var Api = new mw.Api(),
		config = window.AjaxBlock || {},
		special_ns = Object.keys(wg.wgNamespaceIds).filter(function(key) {
			return wg.wgNamespaceIds[key] === -1;
		}),
		promises = [
			Api.get({ // For interlanguage block links
				action: 'query',
				meta: 'siteinfo',
				siprop: 'specialpagealiases'
			}),
			Api.get({ // Get default expiry times and block reasons
				action: 'query',
				meta: 'allmessages',
				ammessages: 'Ipboptions|Ipbreason-dropdown'
			}),
			lib.loadMessages('AjaxBlock'), // i18n, yeah!
			mw.loader.load('mediawiki.notify'),
		],
		modal = new mw.libs.QDmodal("AjaxBlockModal");
	config.check = config.check || {};
	config.extras = config.extras || {};
 
	// Declare methods
	function parse_default_reasons(wikitext) {
		wikitext = wikitext.replace(/\n\s*\n/g, '\n').trim(); // Remove the empty lines
		var split = wikitext.split('\n'),
		reasons = {},
		section = null;
		split.forEach(function(line) {
			if (line.charAt(0) !== '*') {
				if (section && section.label && Object.keys(section).length - 1) {
					reasons[section.label] = section;
					delete reasons[section.label].label;
					section = {label: ''};
				}
				reasons[line] = line;
			} else if (line.charAt(1) === '*') {
				if (section && section.label) {
					if (line.slice(2) === 'label') return;
					section[line.slice(2)] = line.slice(2);
				} else { // A ** list element without a * parent... what the hell mate
					reasons[line.slice(2)] = line.slice(2);
				}
			} else if (line.charAt(0) === '*') {
				if (section && section.label && Object.keys(section).length - 1) {
					reasons[section.label] = section;
					delete reasons[section.label].label;
				}
				section = {
					label: line.slice(1)
				};
			}
		});
		if (section && section.label && Object.keys(section).length - 1) {
			reasons[section.label] = section;
			delete reasons[section.label].label;
		}
		return reasons;
	}
 
	function parse_default_expiry_times(wikitext) {
		var split = wikitext.split(','),
		obj = {};
		split.forEach(function(item) {
			var s = item.split(':');
			obj[s[1]] = s[0];
		});
		return obj;
	}
 
	function build_select(obj, id, i18n) {
		var $sel = $('<select>').attr('id', id);
		$sel.append(
			$('<option>', {
				value: 'other',
				text: i18n.msg('other').escape()
			})
		);
		for (var i in obj) {
			var item = obj[i];
			if (typeof item === 'string') {
				$sel.append(
					$('<option>')
						.attr('value', i)
						.text(item)
				);
			} else {
				var $group = $('<optgroup>', {
					label: i
				});
				for (var j in item) {
					$group.append(
						$('<option>')
							.attr('value', j)
							.text(item[j])
					);
				}
				$sel.append($group);
			}
		}
		return $sel;
	}
 
	function build_checkbox(id, label, checked, doBreak) {
		var $wrapper = $(doBreak ? '<span>' : '<div>'),
			$check = $('<input>')
				.attr('type', 'checkbox')
				.attr('id', id)
				.prop('checked', checked),
				
			$label = $('<label>')
				.attr('for', id).text(label);
 
			$wrapper.append($check, $label);
			
		return $wrapper;
	}
 
	function show_modal(i18n, user, config, unblocking, expiry_times, block_reasons, unblock_reasons) {
		var isIPv6 = user.match(/^(?:([0-9A-F]{0,4}:){1,7}[0-9A-F]{0,4})(?:\/\d{2})?$/gi);
		var isIP = user.match(/^(?:(?:\d{1,3}\.){3}\d{1,3}|([0-9A-F]{0,4}:){1,7}[0-9A-F]{0,4})(?:\/\d{2})?$/gi);
		var $content = $('<div>').attr('id', unblocking ? 'ajaxUnblockModalContent' : 'AjaxBlockModalContent'),
			defaultUnblockReasons = {
				"Error": "Error",
				"Mistake": "Mistake",
				"Appealed": "Appealed",
				"Second Chance": "Second Chance",
				"Successful Unblock Request": "Successful Unblock Request",
				"Covered by a Bigger Range Block": "Covered by a Bigger Range Block",
			};
		if (unblocking) {
			$content.append(
				$('<div>', {
					class: 'AjaxBlockInlineInput',
					append: [
						i18n.msg('reason').escape(),
						build_select(unblock_reasons ? unblock_reasons : defaultUnblockReasons, 'AjaxBlockUnblockReasonsSelect', i18n),
						$('<input>', {
							id: 'AjaxUnblockReasonInput',
							placeholder: "Appealed",
						})
					]
				})
			);
		} else {
			$content.append(
				$('<div>', {
					class: 'AjaxBlockExpiryWrapper',
					append: [
						i18n.msg('expiry').escape(),
						build_select(expiry_times, 'AjaxBlockExpirySelect', i18n),
						$('<input>', {
							id: 'AjaxBlockExpiryInput',
							placeholder: "3 Weeks",
						})
					]
				}),
				$('<div>', {
					class: 'AjaxBlockReasonWrapper',
					append: [
						i18n.msg('reason').escape(),
						build_select(block_reasons, 'AjaxBlockReasonSelect', i18n),
						(config.extras.refAbuseLog || config.extras.refabuselog) && build_checkbox('AjaxBlockReferenceAbuseLog', 'Reference Abuse Log', config.check.refAbuseLog || config.check.refabuselog, true),
						'<br>',
						$('<input>', {
							id: 'AjaxBlockReasonInput',
							placeholder: "Spam/Vandalism"
						})
					]
				}),
				$('<div>', {
					class: 'AjaxBlockCheckers',
					append: [
						build_checkbox('AjaxBlockDisableWall', i18n.msg('label-disable-wall').escape(), config.check.talk),
						build_checkbox('AjaxBlockAutoBlock', i18n.msg('label-auto-block').escape(), config.check.autoblock || config.check.autoBlock),
						build_checkbox('AjaxBlockDisableAccount', "Prevent Account Creation", config.check.nocreate || config.check.noCreate),
						build_checkbox('AjaxBlockOverrideBlock', i18n.msg('label-override').escape(), config.check.override),
						isIP && (config.extras.rangeblock || config.extras.rangeBlock)
							? build_checkbox(
								'AjaxBlockRangeBlock', 
								'Block the user\'s IP range', 
								config.check.rangeblock || config.check.rangeBlock
							).append(
								$('<div>', {
									html: [
										"CIDR IP Range (",
										$('<a>', {
											href: "https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Range_blocks" 
												+ (isIPv6
													? "/IPv6"
													: ""
												),
											html: "more info",
											title: "Get more information on Range Blocks",
										}),
										"):&nbsp;",
										$('<input>', {
											max: isIPv6 ? 128 : 32,
											min: isIPv6 ? 19 : 16,
											type: "number",
											id: "AjaxBlockIPRange",
											placeholder: isIPv6 ? 64 : 16,
										}),
									]
								})
							)
							: ""
					]
				})
			);
		}
		var options = {};
 
		$content.append(
			$('<hr>'),
			$('<div>', {
				id: "AjaxBlockLinks",
				html: [
					'<b>User Links: </b>',
					$('<a>', {
						html: user,
						href: pagePathname + "User:" + user,
						title: "User:" + user,
					}),
					' (',
					$('<a>', {
						html: 'wall',
						href: pagePathname + "Message wall:" + user,
						title: "Message wall:" + user,
					}),
					' | ',
					$('<a>', {
						html: 'contribs',
						href: pagePathname + "Special:Contribs/" + user,
						title: "Special:Contribs/" + user,
					}),
					' | ',
					$('<a>', {
						html: 'Logs',
						href: pagePathname + "Special:Log/" + user,
						title: "Special:Log/" + user,
					}),
					' | ',
					$('<a>', {
						html: 'del. contribs',
						href: pagePathname + "Special:DeletedContributions/" + user,
						title: "Special:DeletedContributions/" + user,
					}),
					' | ',
					$('<a>', {
						html: 'block log',
						href: pagePathname + "Special:Log/block?page=" + user,
						title: "Special:Log/block",
					}),
					' | ',
					$('<a>', {
						html: 'abuse log',
						href: pagePathname + "Special:AbuseLog?wpSearchUser=" + user,
						title: "Abuse logs for " + user,
					}),
					' | ',
					window.NukeLoaded ? $('<a>', {
						html: 'Nuke',
						href: pagePathname + "Special:BlankPage?blankspecial=nuke&nukeuser=" + user,
						title: "Special:Nuke/" + user,
					}) : "",
					')',
				]
			})
		);
 
		if (unblocking) {
			options.buttons = [{
				text: i18n.msg('unblock-button').escape(),
				handler: function() {
					var config = {
						action: 'unblock',
						reason: $('#AjaxUnblockReasonInput').val() || '',
						token: mw.user.tokens.get('editToken')
					};
					if (user.charAt(0) === '#') {
						config.id = user.slice(1);
					} else {
						config.user = user;
					}
					Api.post(config).always(function(d) {
						modal.hide();
 
						if (d.unblock) {
							!isUCP
								? new BannerNotification(i18n.msg('success-unblock', user).escape(), 'confirm', $('.banner-notifications-placeholder')).show()
								: mw.notify(i18n.msg('success-unblock', user).escape(), { type: "success" });
							logMsg(i18n.msg('success-unblock', user).escape());
						} else {
							!isUCP
								? new BannerNotification(i18n.msg('error-unblock', user, d).escape(), 'warn', $('.banner-notifications-placeholder')).show()
								: mw.notify(i18n.msg('error-unblock', user, d).escape(), { type: "warn" });
							logWarn(i18n.msg('error-unblock', user, d).escape());
						}
					});
				}
			}, {
				text: i18n.msg('cancel-button').escape(),
				handler: function() {
					modal.hide();
				}
			}];
		} else {
			options.buttons = [{
				text: i18n.msg('block-button').escape(),
				handler: function() {
					var $ex_sel = $('#AjaxBlockExpirySelect'),
					$ex_input = $('#AjaxBlockExpiryInput'),
					$r_sel = $('#AjaxBlockReasonSelect'),
					$r_input = $('#AjaxBlockReasonInput'),
					expiry = ($ex_sel.val() === 'other' ? $ex_input.val() : $ex_sel.val()).toLowerCase(),
					range = $('#AjaxBlockIPRange').val() ? '/' + $('#AjaxBlockIPRange').val() : '/16',
					reason = 
						$r_sel.val() === 'other' ?
							$r_input.val() :
							$r_sel.val() + ($r_input.val().trim() ? ': ' + $r_input.val() : '') + ((config.extras.refAbuseLog || config.extras.refabuselog) && $('#AjaxBlockReferenceAbuseLog').prop('checked') ? ', see also abuse log' : "");
					var query = {
							anononly: !$('#AjaxBlockAutoBlock').prop('checked'),
							action: 'block',
							user: user,
							expiry: expiry || 'never', // Don't look at me like that, the API defaults to never too
							reason: reason || '',
							token: mw.user.tokens.get('editToken')
						},
						rangeBlockQuery = {
							action: 'block',
							user: user + range,
							expiry: expiry || 'never', // Don't look at me like that, the API defaults to never too
							reason: reason || '',
							token: mw.user.tokens.get('editToken')
						}, rangeBlock;
						
					if (!$('#AjaxBlockDisableWall').prop('checked')) {
						query.allowusertalk = true;
						rangeBlockQuery.allowusertalk = true;
					}
					if ($('#AjaxBlockAutoBlock').prop('checked')) {
						query.autoblock = true;
						rangeBlockQuery.autoblock = true;
					}
					if (!$('#AjaxBlockAutoBlock').prop('checked')) {
						query.anononly = true;
						rangeBlockQuery.anononly = true;
					}
					if ($('#AjaxBlockOverrideBlock').prop('checked')) {
						query.reblock = true;
						rangeBlockQuery.reblock = true;
					}
					if ($('#AjaxBlockDisableAccount').prop('checked')) {
						query.nocreate = true;
						rangeBlockQuery.nocreate = true;
					}
					if ($('#AjaxBlockRangeBlock').prop('checked')) {
						rangeBlock = true;
					}
					Api.post(query).always(function(d) {
						modal.hide();
						if (d.block) {
							!isUCP 
								? new BannerNotification(i18n.msg('success-block', user).escape(), 'confirm', $('.banner-notifications-placeholder')).show()
								: mw.notify(i18n.msg('success-block', user).escape(), { type: "success" });
							logMsg(i18n.msg('success-block', user).escape());
							 
							 console.log(rangeBlock, isIP, config.extras.rangeblock, config.extras.rangeBlock);
							 
							if (rangeBlock && isIP && (config.extras.rangeblock || config.extras.rangeBlock)) {
								Api.post(rangeBlockQuery)
									.done(function(d) {
										if (d.block) {
											!isUCP
												? new BannerNotification('The ' + range + ' CIDR range for "' + user + '" has been blocked sucessfully!', 'confirm', $('.banner-notifications-placeholder')).show()
												: mw.notify('The ' + range + ' CIDR range for "' + user + '" has been blocked sucessfully!', { type: "success" });
											logMsg('The ' + range + ' CIDR range for "' + user + '" has been blocked sucessfully!');
										} else {
											!isUCP
												? new BannerNotification('API error in blocking the ' + range + ' CIDR range for "' + user + '": ' + d + ' (API Error Code "' + d + '")', 'warn', $('.banner-notifications-placeholder')).show()
												: mw.notify('The ' + range + ' CIDR range for "' + user + '" has been blocked sucessfully!', { type: "warn" });
											logWarn('API error in blocking the', range, 'CIDR range for"', user, '":', d, '(API Error Code "' + d + '")');
										}
									});
							}
						} else {
							!isUCP
								? new BannerNotification(i18n.msg('error-block', user, d).escape(), 'warn', $('.banner-notifications-placeholder')).show()
								: mw.notify(i18n.msg('error-block', user, d).escape(), { type: "warn" });
							logWarn(i18n.msg('error-block', user, d).escape());
						}
					});
				}
			}, {
				text: i18n.msg('cancel-button').escape(),
				handler: function() {
					modal.hide();
				}
			}];
		}
		modal.show({ 
			title: 
				i18n.msg(unblocking 
					? 'unblock-title' 
					: 'block-title', user
				).escape() 
				+ (isIP
					? isIPv6
						? " (IPv6)"
						: " (IPv4)"
					: ""), 
			content: $content, 
			buttons: options.buttons 
		});
	}
 
	// Await for the API requests to finish without actually using await
	$.when.apply(this, promises).then(function(specials, mw_messages, i18n) {
		// i18n, yeah!
		i18n.useUserLang();
 
		// Parse mediawiki pages into usable stuff
		var block_special = specials[0].query.specialpagealiases.find(function(val) {
				return val.realname === 'Block';
			}).aliases.map(function(alias) {
				return alias.toLowerCase();
			}),
			unblock_special = specials[0].query.specialpagealiases.find(function(val) {
				return val.realname === 'Unblock';
			}).aliases.map(function(alias) {
				return alias.toLowerCase();
			}),
			messages = mw_messages[0].query.allmessages,
			expiry_times = config.expiryTimes || parse_default_expiry_times(messages[0]['*']),
			block_reasons = config.blockReasons || parse_default_reasons(messages[1]['*']),
			unblock_reasons = config.unblockReasons || null;
 
		// Bind to click events
		$(document).on('click', 'a[href]', function(e) {
			if (e.which !== 1 || e.ctrlKey || e.shiftKey) return; // Left click with no special keys only
			var $target = $(e.currentTarget),
			href = $target.attr('href')
				.replace(wg.wgServer, '')
				.replace(wg.wgArticlePath.replace('$1', ''), ''),
			is_special = special_ns.some(function(ns) { // Ever heard of Array.prototype.some? Me neither! Google it, it's been supported since IE9. Crazy, right?
				return href.slice(0, ns.length + 1).toLowerCase() === ns + ':';
			});
 
			if (!is_special) return;
 
			var title = href.replace(/^[^:]+:|[\/?].*/g, ''),
			blocking = block_special.indexOf(title.toLowerCase()) !== -1,
			unblocking = unblock_special.indexOf(title.toLowerCase()) !== -1;
 
			if (!blocking && !unblocking) return; // Another special page
 
			var uri = new mw.Uri('/wiki/' + href),
			match = href.match(/\/[^?]+/),
			target = uri.query.wpTarget || (match && match[0].slice(1));
 
			if (!target) return; // Just a regular Special:Block link with no target
 
			e.preventDefault(); // Block the default behavior
 
			target = decodeURIComponent(target).replace(/_/g, ' '); // Decode it
 
			show_modal(i18n, target, config, unblocking, expiry_times, block_reasons, unblock_reasons);
		});
	});
});