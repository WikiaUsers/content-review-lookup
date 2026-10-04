// <nowiki>
/**
 * This script:
 * 1. Properly iterates through all the user groups a user has and displays them on their user page, and
 * 2. Adds CSS classes to allow wikis to style using role colors
 * Adapted from English Wikipedia with some changes for Fandom wikis (see https://en.wikipedia.org/wiki/User:Awesome_Aasim/usergroups.js)
 */
mw.loader.using([ 'mediawiki.api', 'mediawiki.jqueryMsg' ], function() {
	let isIP = mw.util.isIPAddress;
	const IS_GAMEPEDIA = $('.is-gamepedia').length > 0;
	/* Load CSS */
	$.get(mw.config.get("wgScriptPath") + "/api.php", {
		"action": "query",
		"format": "json",
		"titles": "MediaWiki:Usergroups.css",
		"formatversion": 2
	}).done(function(result) {
		if (result.query.pages[0].missing) {
			mw.loader.load(`https://dev.fandom.com/index.php?title=MediaWiki:Usergroups.css&action=raw&ctype=text/css`, "text/css");
		} else {
			mw.loader.load(`${window.location.origin + mw.config.get("wgScriptPath")}/index.php?title=MediaWiki:Usergroups.css&action=raw&ctype=text/css`, "text/css");
		}
	});
	if (!window.userGroupsLoaded) {
		window.userGroupsLoaded = true;
		// cache to prevent extraneous API calls
		window.userGroupsCache = window.userGroupsCache ? windowUserGroupsCache : {};
		$(document).ready(function() {
			let user;
			let userdata, blockdata, usergroups;
			if (mw.config.get("wgNamespaceNumber") == 2 || mw.config.get("wgNamespaceNumber") == 3
				// fandom specific checks
				|| mw.config.get("wgNamespaceNumber") == 500 || mw.config.get("wgNamespaceNumber") == 1200
				// gamepedia
				|| mw.config.get("wgNamespaceNumber") == 202) {
				user = mw.config.get("wgTitle").split("/")[0];
			} else if (mw.config.get("wgNamespaceNumber") == -1) {
				user = mw.config.get("wgTitle").split("/")[1] ? mw.config.get("wgTitle").split("/")[1] : null;
			} else {
				return;
			}
			user = decodeURIComponent(user);
			if (user) {
				$.get(mw.config.get('wgScriptPath') + '/api.php', {
					action: "query",
					list: "users|blocks",
					ususers: user,
					usprop: "groups|blockinfo",
					bkusers: isIP(user) ? undefined : user,
					bkip: isIP(user) ? user : undefined,
					format: "json"
				}).done(function(res) {
					console.log(res);
					if (!res.error) {
						userdata = res.query.users[0];
						blockdata = res.query.blocks.length > 0 ? res.query.blocks[0] : null;
						usergroups = "";
						var messagesArray = [];
						var linksArray = [];
						if (userdata.invalid === null || userdata.invalid === undefined) {
							for (let group of userdata.groups) {
								messagesArray.push(`group-${group}-member`);
								messagesArray.push(`grouppage-${group}`);
							}
						}
						messagesArray.push('blockedtitle');
						new mw.Api().loadMessagesIfMissing(messagesArray).then(function() {
							new mw.Api().loadMessagesIfMissing(linksArray, {amlang: mw.config.get("wgContentLanguage")}).then(function() {
								function placeTags() {
									// remove existing tags
									if (!IS_GAMEPEDIA) { // fandom
										$(".user-identity-header .user-identity-header__tag").remove();
										$(".user-identity-header .user-identity-header__attributes").append($('<span class="usergroups"></span>'));
										if (userdata.blockid || blockdata) {
											// readd block information
											$(".usergroups").prepend(`<span class="usergroup usergroupblocked user-identity-header__tag user-identity-header__tag-blocked_user"><a href="${mw.config.get("wgScriptPath")}/index.php?title=Special:BlockList&wpTarget=${user}">${mw.message(`blockedtitle`)}</b></span>`);
										}
									} else { // gamepedia
										$(".userinfo .grouptags li").remove();
										$(".userinfo .grouptags").addClass('usergroups');
										$(".curseprofile .blocked").remove();
										if (userdata.blockid || blockdata) {
											// readd block information
											$(".userinfo .profile-info .grouptags").prepend(`<li class="usergroup usergroupblocked"><a href="${mw.config.get("wgScriptPath")}/index.php?title=Special:BlockList&wpTarget=${user}">${mw.message(`blockedtitle`)}</a></li>`);
										}
									}
									if (userdata.invalid === null || userdata.invalid === undefined) {
										for (let group of userdata.groups) {
											if (group == "*" || group == "user") continue; // ignore groups that every user likely has
											// for safety only use parsed messages
											if (!IS_GAMEPEDIA) {
												$(".usergroups").append(`<span class="usergroup usergroup-${group} user-identity-header__tag user-identity-header__tag-${group}"><a href="${mw.config.get("wgArticlePath").replace(/\$1/g, mw.message(`grouppage-${group}`).exists() ? mw.message(`grouppage-${group}`).parse() : `Project:${group}`)}">${mw.message(`group-${group}-member`).parse()}</a></span>`);
											} else {
												$(".usergroups").append(`<li class="usergroup usergroup-${group}"><a href="${mw.config.get("wgArticlePath").replace(/\$1/g, mw.message(`grouppage-${group}`).exists() ? mw.message(`grouppage-${group}`).parse() : `Project:${group}`)}">${mw.message(`group-${group}-member`).parse()}</a></li>`);
											}
										}
									}
								}
								// data loaded, now we wait for profile box to be ready
								var __init = function() {
									if ($('.user-identity-box').length || (IS_GAMEPEDIA && $('.curseprofile').length)) {
										placeTags();
									} else {
										setTimeout(__init, 100);
									}
								};
								__init();
							});
						});
					} else {
						console.error(res.error);
					}
				});
			}
		});
		$(document).ready(function() {
			function getUserInfo(user) {
				if (typeof window.userGroupsCache[user] == "object") {
					return $.Deferred(function(def) {
						def.resolve(window.userGroupsCache[user]);
					});
				} else {
					return $.get(mw.config.get('wgScriptPath') + '/api.php', {
						action: "query",
						list: "users|blocks",
						ususers: user,
						usprop: "groups|blockinfo",
						bkusers: isIP(user) ? undefined : user,
						bkip: isIP(user) ? user : undefined,
						format: "json"
					});
				}
			}
			$(".mw-userlink").each(function() {
				var url = new URL($(this).attr("href"), location.origin);
				var user = url.searchParams.get("title") ? url.searchParams.get("title").replace(mw.config.get("wgFormattedNamespaces")[2] + ":", "") : url.pathname.replace(mw.config.get("wgArticlePath").replace("$1", mw.config.get("wgFormattedNamespaces")[2] + ":"), "").replaceAll("_", " ");
				user = decodeURIComponent(user);
				if (user.split("/").length > 1) return;
				if (window.userGroupsCache[user]) {
					return;
				} else {
					window.userGroupsCache[user] = true;
				}
				getUserInfo(user).done(function(res) {
					if (res.error) {
						console.error(res.error);
						delete window.userGroupsCache[user];
					} else {
						window.userGroupsCache[user] = res;
						var userdata = res.query.users.length > 0 ? res.query.users[0] : {};
						var blockdata = res.query.blocks.length > 0 ? res.query.blocks[0] : null;
						var classString = "";
						classString += 'usergroup ';
						if (userdata.blockid) {
							classString += "usergroup-blocked ";
							if (userdata.blockpartial !== null && userdata.blockpartial !== undefined) {
								classString += "usergroup-blockedpartial ";
							}
						} else if (blockdata) {
							classString += "usergroup-blocked ";
							if (blockdata.partial !== null && blockdata.partial !== undefined) {
								classString += "usergroup-blockedpartial ";
							}
						}
						if (userdata.invalid === null || userdata.invalid === undefined) {
							for (let group of userdata.groups) {
								if (group == "*" || group == "user") continue;
								classString += `usergroup-${group} `;
							}
						}
						$(`.mw-userlink`).each(function() {
							var url = new URL($(this).attr("href"), location.origin);
							var uuser = url.searchParams.get("title") ? url.searchParams.get("title").replace(mw.config.get("wgFormattedNamespaces")[2] + ":", "") : url.pathname.replace(mw.config.get("wgArticlePath").replace("$1", mw.config.get("wgFormattedNamespaces")[2] + ":"), "").replaceAll("_", " ");
							uuser = decodeURIComponent(uuser);
							if (uuser.split("/").length > 1) return;
							if (uuser != user) return;
							var $enclosure = $('<span></span>');
							$(this).before($enclosure);
							$enclosure.append($(this));
							$enclosure.addClass(classString);
						});
					}
				});
			});
		});
	}
});
// </nowiki>