/* Code to tag userpages with staff message boxes */
$('span#tag-user > a[href*="prepend="].text').click(function(e) { 
	"use strict";
	if (!/sysop|soap|staff|helper|wiki-manager|content-team-member|util/.test(mw.config.get('wgUserGroups').join('\n'))) {
		return;
	}
	e.preventDefault();
	var rank = prompt('Please enter a staff rank to tag the user with', 'rollback');
	var user = $(this).parent().attr('data-user');
	var rank2, oldRank, oldRank2;
	
	function getSection(rank) {
		var matches = {
			'bureaucrat': 4,
			'sysop': 5,
			'codeeditor': 6,
			'content-moderator': 8,
			'threadmoderator': 10,
			'rollback': 11,
		};

		return matches[rank] || null;
	}
	
	var aliases = {
		'bur': 'bureaucrat',
		'bcrat': 'bureaucrat',
		'bureau': 'bureaucrat',
		'bureaucrat': 'bureaucrat',
		'crat': 'bureaucrat',
		'b': 'bureaucrat',
		
		'admin': 'administrator',
		'adm': 'administrator',
		'ad': 'administrator',
		'administrator': 'administrator',
		'administr': 'administrator',
		'sysop': 'administrator',
		
		'ce': 'codeeditor',
		'codeeditor': 'codeeditor',
		'code editor': 'codeeditor',
		'code': 'codeeditor',
		'code edit': 'codeeditor',
		'c e': 'codeeditor',
		'cd edit': 'codeeditor',
		'cde edit': 'codeeditor',
		'codeedit': 'codeeditor',
		'cdeedit': 'codeeditor',
		'cde edtr': 'codeeditor',
		'cdeedtr': 'codeeditor',
		
		'content': 'content-moderator',
		'cont': 'content-moderator',
		'cont mod': 'content-moderator',
		'cont moderator': 'content-moderator',
		'content mod': 'content-moderator',
		'content moderator': 'content-moderator',
		'c moderator': 'content-moderator',
		'c mod': 'content-moderator',
		'cm': 'content-moderator',
		'content-moderator': 'content-moderator',
		
		
		'd mod': 'threadmoderator',
		'd moderator': 'threadmoderator',
		'disc mod': 'threadmoderator',
		'disc moderator': 'threadmoderator',
		'discuss m': 'threadmoderator',
		'discuss mod': 'threadmoderator',
		'discuss moderator': 'threadmoderator',
		'disc m': 'threadmoderator',
		'discussions m': 'threadmoderator',
		'discussions mod': 'threadmoderator',
		'threadmoderator': 'threadmoderator',
		'dm': 'threadmoderator',
		'thread-moderator': 'threadmoderator',
		'thread moderator': 'threadmoderator',
		'th': 'threadmoderator',
		'th m': 'threadmoderator',
		'thr mod': 'threadmoderator',
		'thread mod': 'threadmoderator',
		't mod': 'threadmoderator',
		
		'rollback': 'rollback',
		'roll': 'rollback',
		'rollb': 'rollback',
		'rb': 'rollback',
		'rollbacker': 'rollback',
		'rback': 'rollback',
		
		'bot': 'bot',
		'robot': 'bot',
		'bt': 'bot',
	};

	if (rank.match(/.+?\s*[\,\|\;]\s*.+/)) {
		rank = rank.split(/\s*[\,\|\;]\s*/);
		rank2 = aliases[rank[1]];
		rank = aliases[rank[0]];
	} else {
		rank2 = null;
		rank = aliases[rank];
	}
	
	new mw.Api().post({
		action: 'edit',
		minor: true,
		bot: true,
		watchlist: 'nochange',
		title: 'User:' + user,
		summary: 'Adding {{Staff}} message box to userpage',
		prependtext: '{{Staff|' + rank + (rank2 ? '|' + rank2 : "") +'}}',
		token: mw.user.tokens.values.editToken,
	}).always(function(data) {

		if (data.edit) {
			console.log("[StaffTagger]: Successfully tagged", user, 'With rank "' + rank + '"');

			new mw.Api().post({
				action: 'protect',
				bot: true,
				watchlist: 'nochange',
				title: 'User:' + user,
				protections: (
						rank2 
						? rank2 !== "threadmoderator" && rank2 !== "rollback" && rank2 !== "bot" 
						: rank !== "threadmoderator" && rank !== "rollback" && rank !== "bot"
					) 
					? 'edit=sysop|move=sysop' 
					: 'edit=autoconfirmed|move=autoconfirmed',
				expiry: 'infinite',
				reason: 'Protecting wiki staff userpage',
				token: mw.user.tokens.values.editToken,
			}).always(function(data) {

				if (data.protect) {

					console.log("[StaffTagger]: Successfully protected ", user + '\'s userpage');
						new mw.Api().get({
							action: 'query',
							list: 'users',
							ususers: user,
							ustoken: 'userrights',
						}).always(function(data) {
							var usToken = data.query.users[0].userrightstoken;
							
							if (data.query) {

								new mw.Api().post({
									"action": "userrights",
									"format": "json",
									"user": user,
									"add": rank + (rank2 ? "|" + rank2 : ""),
									"expiry": "infinite",
									"reason": "Per request to be staff: [[Hypixel_SkyBlock_Wiki_talk:Requests_to_be_staff#New request for user rights by " + user + "]]",
									"token": usToken,
								}).always(function(data) {

									if (data.userrights) {
										console.log('[StaffTagger]: Successfully added ranks!');
										
										if (rank2) {
											new mw.Api().post({
												"action": "userrights",
												"format": "json",
												"user": user,
												"add": rank + (rank2 ? "|" + rank2 : ""),
												"expiry": "infinite",
												"reason": "Per request to be staff: [[Hypixel_SkyBlock_Wiki_talk:Requests_to_be_staff#New request for user rights by " + user + "]]",
												"token": usToken,
											}).always(function(data) {
												if (data.userrights) {
													console.log('[StaffTagger]: Successfully added second rank!');
												} else {
													console.warn('[StaffTagger]: Failed to add ranks: ' + data);
												}
											});
											
											new mw.Api().post({
												action: "edit",
												section: getSection(rank),
												appendtext: '\n*{{/user|' + user + '|rank=' + rank + '}}',
												token: mw.user.tokens.values.editToken,
												title: 'Hypixel_SkyBlock_Wiki:Staff',
												summary: 'Adding ' + user + ' to the staff list per request to be staff: [[Hypixel_SkyBlock_Wiki_talk:Requests_to_be_staff#New request for user rights by ' + user + "]]",
												minor: 1,
												bot: 1,
												watchlist: 'nochange',
											}).always(function(data) {

												if (data.edit) {
													console.log('[StaffTagger]: Successfully added ' + user + ' to staff member list');

													new mw.Api().post({
														action: "edit",
														section: getSection(rank2),
														appendtext: '\n*{{/user|' + user + '|rank=' + rank2 + '}}',
														token: mw.user.tokens.values.editToken,
														title: 'Hypixel_SkyBlock_Wiki:Staff',
														summary: 'Adding ' + user + ' to the staff list per request to be staff: [[Hypixel_SkyBlock_Wiki_talk:Requests_to_be_staff#New request for user rights by ' + user + "]]",
														minor: 1,
														bot: 1,
														watchlist: 'nochange',
													}).always(function(data) {
														if (data.userrights) {
															console.log('[StaffTagger]: Successfully added ' + user + ' to staff member list');
															mw.hook('hsw.gadget.staffColorsUpdater').add(function(updater) {
																updater();
																console.log('[StaffTagger]: Updating Staff colors...');
															});
															mw.hook('hsw.gadget.staffColorsUpdater').add(console.log);
														} else {
															console.warn('[StaffTagger]: Failed to Add user to staff member list: ' + data);
														}
													});
												} else {
													console.warn('[StaffTagger]: Failed to Add user to staff member list: ' + data);
												}
											});
										} else {
											new mw.Api().post({
												action: "edit",
												section: getSection(rank),
												appendtext: '\n*{{/user|' + user + '|rank=' + rank + '}}',
												token: mw.user.tokens.values.editToken,
												title: 'Hypixel_SkyBlock_Wiki:Staff',
												summary: 'Adding ' + user + ' to the staff list per request to be staff: [[Hypixel_SkyBlock_Wiki_talk:Requests_to_be_staff#New request for user rights by ' + user + "]]",
												minor: 1,
												bot: 1,
												watchlist: 'nochange',
											}).always(function(data) {

												if (data.edit) {
													console.log('[StaffTagger]: Successfully added ' + user + ' to staff member list');
												} else {
													console.warn('[StaffTagger]: Failed to Add user to staff member list: ' + data);
												}
											});
										}
									} else {
										console.warn('[StaffTagger]: Failed to give ranks: ' + data);
									}
								});
							} else {
								console.warn("[StaffTagger]: API error in getting user rights token: " + data, '(API Error code \"' + data + '\")');
							}
						});
				} else {
					console.warn("[StaffTagger]: API error in protecting ", user + '\'s userpage:', data, '(API Error code \"' + data + '\")');
				}
			});
		} else {
			console.warn('[StaffTagger]: API Error in Tagging', user + ':', data, '(API Error code "' + data + '")');
		}
	});
});