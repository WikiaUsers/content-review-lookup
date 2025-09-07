/**
 * Script: UserProfilePopup
 * Author: Marisa1980
 * Description: Display user information through popup when hovering user link
 * Other: The script is heavily relied on API request. This script can not run on mobile site
**/

// IMPORT CSS
importArticle({
	type: 'style',
	article: 'u:dev:MediaWiki:UserProfilePopup.css',
});

/**** FUNCTION FOR REGULAR USER PAGE *****/
(function() {
	// DO NOT RUN FOR ANONYMOUS
	if (!mw.config.get('wgUserName')) {
		return;
	}
	
	// IGNORE USER LINK IF IT IS INSIDE GLOBAL NAVIGATION AND 2010 SOURCE EDITOR
	function isInsideExcludedContainer($element) {
		return $element.closest('.global-action__item, .global-explore-navigation, .editButtons').length > 0;
	}
	
	// CHECK USER NAMESPACE PAGE
	var userNamespaces = {};
	var nsIds = mw.config.get("wgNamespaceIds");
	for (var nsName in nsIds) {
		if (nsIds[nsName] === 2) {
			userNamespaces[nsName.replace(/ /g, '_').toLowerCase()] = true;
		}
	}
	
	// CHECK IF IT IS USER LINK, REGARDLESS OF LANGUAGE
	function isUserLink(href) {
		var match = href.match(/^\/(?:[a-z]{2}\/)?wiki\/([^:]+):(.+)$/);
		if (!match) return false;
		var nsPart = decodeURIComponent(match[1]).replace(/ /g, '_').toLowerCase();
		return !!userNamespaces[nsPart];
	}
	
	// CHECK IF THERE IS SVG ICON, OR USE FALLBACK SVG
	function getSocialIconSvg(type) {
		var symbolExists = document.querySelector('#wds-icons-' + type);
		if (symbolExists) {
			return '<svg class="wds-icon"><use xlink:href="#wds-icons-' + type + '"></use></svg>';
		}
		var inlineSvgs = {
			link: '<svg viewBox="0 0 60 60" class="wds-icon" width="20" height="20"><path fill="currentColor" d="M35.521,41.288c-3.422,0-6.64-1.333-9.06-3.753c-1.106-1.106-1.106-2.9,0-4.006    c1.106-1.106,2.9-1.106,4.006,0c1.35,1.35,3.145,2.093,5.054,2.093c1.909,0,3.704-0.743,5.054-2.094l7.538-7.538    c2.787-2.787,2.787-7.321,0-10.108c-2.787-2.787-7.321-2.787-10.108,0l-3.227,3.227c-1.106,1.106-2.9,1.106-4.006,0    c-1.106-1.106-1.106-2.9,0-4.006L34,11.877c4.996-4.996,13.124-4.995,18.12,0c4.996,4.996,4.996,13.124,0,18.12l-7.538,7.538    C42.161,39.955,38.944,41.288,35.521,41.288z"/><path fill="currentColor" d="M20.94,55.869c-3.422,0-6.64-1.333-9.06-3.753c-4.996-4.996-4.996-13.124,0-18.12l7.538-7.538    c4.996-4.995,13.124-4.995,18.12,0c1.106,1.106,1.106,2.9,0,4.006c-1.106,1.106-2.9,1.106-4.006,0    c-2.787-2.787-7.321-2.787-10.108,0l-7.538,7.538c-2.787,2.787-2.787,7.321,0,10.108c1.35,1.35,3.145,2.094,5.054,2.094    c1.909,0,3.704-0.743,5.054-2.093l3.227-3.227c1.106-1.106,2.9-1.106,4.006,0c1.106,1.106,1.106,2.9,0,4.006L30,52.117    C27.58,54.536,24.363,55.869,20.94,55.869z"/></svg>',
			twitter: '<svg viewBox="0 0 24 24" class="wds-icon" width="20" height="20"><path fill="currentColor" d="M22.5,5.9c-0.8,0.4-1.7,0.7-2.6,0.8c0.9-0.5,1.6-1.4,1.9-2.4c-0.8,0.5-1.8,0.9-2.8,1.1 c-0.8-0.8-2-1.4-3.2-1.4c-2.5,0-4.5,2-4.5,4.5c0,0.4,0,0.7,0.1,1.1C7.7,9.5,5.1,8.1,3.4,5.9C3,6.7,2.8,7.5,2.8,8.4 c0,1.6,0.8,3,2.1,3.8c-0.7,0-1.5-0.2-2.1-0.6c0,0,0,0,0,0.1c0,2.2,1.6,4,3.7,4.4c-0.4,0.1-0.9,0.2-1.3,0.2 c-0.3,0-0.6,0-0.9-0.1c0.6,1.8,2.3,3.1,4.3,3.1c-1.6,1.3-3.6,2-5.8,2c-0.4,0-0.8,0-1.1-0.1c2.1,1.4,4.5,2.2,7.1,2.2 c8.5,0,13.2-7,13.2-13.2c0-0.2,0-0.5,0-0.7C21.2,7.6,21.9,6.8,22.5,5.9z"/></svg>',
			facebook: '<svg viewBox="0 0 24 24" class="wds-icon" width="20" height="20"><path fill="currentColor" d="M22,12c0-5.5-4.5-10-10-10S2,6.5,2,12c0,5,3.7,9.1,8.5,9.9v-7H8v-3h2.5V9.5c0-2.5,1.5-3.9,3.8-3.9c1.1,0,2.2,0.2,2.2,0.2v2.4h-1.2c-1.2,0-1.5,0.8-1.5,1.5V12h2.6l-0.4,3H14v7C18.3,21,22,16.9,22,12z"/></svg>',
			discord: '<svg viewBox="0 0 120 120" class="wds-icon" width="20" height="20"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>'
		};
		return inlineSvgs[type] || '';
	}
	
	// CHECK USER ID AND GROUP VIA API
	function getUserIdAndGroups(username, callback) {
		$.getJSON(mw.util.wikiScript('api'), {
			action: 'query',
			list: 'users',
			ususers: username,
			usprop: 'groups',
			format: 'json',
			origin: '*'
		}, function(data) {
			if (data.query && data.query.users && data.query.users[0]) {
				var user = data.query.users[0];
				callback({ userId: user.userid, groups: user.groups });
			} else {
				callback(null);
			}
		}).fail(function() {
			console.error('❌ Failed to get user ID & groups');
			callback(null);
		});
	}
	
	// CHECK USER PROFILE DATA VIA API
	function getUserProfileData(userId, callback) {
		$.getJSON(mw.util.wikiScript('wikia'), {
			controller: 'UserProfile',
			method: 'getUserData',
			format: 'json',
			userId: userId
		}, function(data) {
			if (data.userData) {
				callback(data.userData);
			} else {
				callback(null);
			}
		}).fail(function() {
			console.error('❌ Failed to get user profile data');
			callback(null);
		});
	}
	
	// START BUILDING USER PROFILE POPUP STRUCTURE
	function buildUserProfilePopup(link, namespace, rawUsername) {
		var $link = $(link);
		var username = decodeURIComponent(rawUsername).replace(/_/g, ' ');
		
		getUserIdAndGroups(username, function(userMeta) {
			if (!userMeta || !userMeta.userId) return;
			
			getUserProfileData(userMeta.userId, function(userData) {
				if (!userData) return;
				
				var avatarUrl = userData.avatar || 'https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
				var edits = userData.localEdits || "0";
				var posts = userData.posts || "0";
				var realName = userData.name ? userData.name : "";
				var bio = userData.bio ? userData.bio : "";
				
				var rolesHtml = "";
				var groups = userMeta.groups || [];
				for (var i = 0; i < groups.length; i++) {
					var g = groups[i];
					if (["*", "user", "autoconfirmed", "emailconfirmed"].indexOf(g) === -1) {
						rolesHtml += '<div class="UserProfilePopup__role">' + g + '</div>';
					}
				}
				
				var socialLinks = [];
				if (userData.website) socialLinks.push('<a href="' + userData.website + '" target="_blank" class="UserProfilePopup__socialLink">' + getSocialIconSvg('link') + '</a>');
				if (userData.twitter) {
					var twitterUrl = userData.twitter.startsWith('http') ? userData.twitter : 'https://twitter.com/' + userData.twitter;
					socialLinks.push('<a href="' + twitterUrl + '" target="_blank" class="UserProfilePopup__socialLink">' + getSocialIconSvg('twitter') + '</a>');
				}
				if (userData.fbPage) socialLinks.push('<a href="' + userData.fbPage + '" target="_blank" class="UserProfilePopup__socialLink">' + getSocialIconSvg('facebook') + '</a>');
				if (userData.discordHandle) socialLinks.push('<div class="UserProfilePopup__socialLink">' + getSocialIconSvg('discord') + '<span class="UserProfilePopup__socialLink-discord">' + userData.discordHandle + '</span></div>');

				var socialButtonHtml = socialLinks.length ? '<div class="UserProfilePopup__socialWrapper"><div class="UserProfilePopup__button UserProfilePopup__dots" tabindex="0"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="2.5"></circle><circle cx="19.5" cy="12" r="2.5"></circle><circle cx="4.5" cy="12" r="2.5"></circle></svg></div><div class="UserProfilePopup__socialPanel">' + socialLinks.join('') + '</div></div>' : '';
				
				var popupClasses = 'UserProfilePopup__popup';
				if (Array.isArray(userData.tags) && userData.tags.includes("Blocked")) {
					popupClasses += ' UserProfilePopup__block';
				}
				
				var popup = $('<div>', { class: popupClasses }).html(
					'<div class="UserProfilePopup__header">' +
						'<img class="UserProfilePopup__avatar" src="' + avatarUrl + '" alt="' + username + '">' +
						'<div>' +
							'<div class="UserProfilePopup__name">' + username + '</div>' +
							(realName ? '<div class="UserProfilePopup__aka">aka <strong>' + realName + '</strong></div>' : '') +
							'<div class="UserProfilePopup__stats"> <strong>' + edits + '</strong> EDITS • <strong>' + posts + '</strong> POSTS</div>' +
							'<div class="UserProfilePopup__roles">' + rolesHtml + '</div>' +
							(bio ? '<div class="UserProfilePopup__bio">' + bio + '</div>' : '') +
						'</div>' +
					'</div>' +
					'<div class="UserProfilePopup__buttons">' +
						'<a href="' + userData.userPage + '" class="UserProfilePopup__button">View</a>' +
						'<a href="/wiki/User_talk:' + encodeURIComponent(username.replace(/ /g, '_')) + '" class="UserProfilePopup__button">Talk</a>' +
						'<a href="' + userData.contributionsUrl + '" class="UserProfilePopup__button">Contribs</a>' +
						'<a href="' + userData.userProfileActivityUrl + '" class="UserProfilePopup__button">Posts</a>' +
						socialButtonHtml +
					'</div>'
				).appendTo('body').hide();
				
				function showPopup() {
					var offset = $link.offset();
					popup.css({
						opacity: 1,
						position: 'absolute',
						top: offset.top + $link.outerHeight() - 7,
						left: offset.left,
						pointerEvents: 'all',
						zIndex: 9999,
					}).stop(true, true).fadeIn(300);
				}
				
				function hidePopup() {
					setTimeout(function() {
						if (!popup.is(':hover')) popup.fadeOut(300);
					}, 100);
				}

				$link.off('mouseenter mouseleave').on('mouseenter', showPopup).on('mouseleave', hidePopup);
				popup.on('mouseenter', function() { popup.stop(true, true).show(); }).on('mouseleave', hidePopup);

				if ($link.is(':hover')) showPopup();
			});
		});
	}
	
	// IF THE MOUSE HOVER THE NEWLY USER LINK, A NEW CLASS WILL BE APPENDED
	$(function() {
		$(document).on('pointerenter', 'a[href^="/"]', function() {
			var link = $(this);
			if (link.hasClass('UserProfilePopup__processed')) return;
			if (isInsideExcludedContainer(link)) return;
			
			var href = link.attr('href');
			var match = href.match(/^\/(?:[a-z]{2}\/)?wiki\/([^:]+):(.+)$/);
			if (!match) return;
			
			var namespace = match[1];
			var rawUsername = match[2];
			if (!isUserLink(href)) return;
			
			link.addClass('UserProfilePopup__processed');
			buildUserProfilePopup(link[0], namespace, rawUsername);
		});
	});
})();


/**** FUNCTION FOR IP ADDRESS PAGE *****/
(function() {
	// DO NOT RUN FOR ANONYMOUS
	if (!mw.config.get('wgUserName')) {
		return;
	}
	
	// CHECK IP ADDRESS
	function isIpAddress(text) {
		if (/^\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?$/.test(text)) return true;
		if (/^[0-9a-f:]+$/i.test(text) && text.includes(':')) return true;
		return false;
	}
	
	// CHECK IP PROFILE DATA VIA API
	function getUserProfileDataForIp(ip, callback) {
		$.getJSON(mw.util.wikiScript('wikia'), {
			controller: 'UserProfile',
			method: 'getUserData',
			format: 'json',
			userId: ip
		}, function(data) {
			callback(data.userData || null);
		}).fail(function() {
			console.error('❌ Failed to get user profile data for IP');
			callback(null);
		});
	}
	
	// START BUILDING USER PROFILE POPUP STRUCTURE
	function buildIpProfilePopup(link, ip) {
		var $link = $(link);
		
		getUserProfileDataForIp(ip, function(userData) {
			if (!userData) return;
			
			var avatarUrl = userData.avatar || 'https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
			var edits = (typeof userData.edits === "number" && userData.edits >= 0) ? userData.edits : 0;
			var posts = userData.posts || 0;
			var bio = userData.bio || "";
			var realName = userData.name || "";
			
			var popup = $('<div class="UserProfilePopup__popup">' +
				'<div class="UserProfilePopup__header">' +
					'<img class="UserProfilePopup__avatar" src="' + avatarUrl + '" alt="' + ip + '">' +
					'<div>' +
						'<div class="UserProfilePopup__name">' + ip + '</div>' +
						(realName ? '<div class="UserProfilePopup__aka">aka <strong>' + realName + '</strong></div>' : '') +
						'<div class="UserProfilePopup__stats"><strong>' + edits + '</strong> EDITS • <strong>' + posts + '</strong> POSTS</div>' +
						(bio ? '<div class="UserProfilePopup__bio">' + bio + '</div>' : '') +
					'</div>' +
				'</div>' +
				'<div class="UserProfilePopup__buttons">' +
					'<a href="' + userData.contributionsUrl + '" class="UserProfilePopup__button">Contribs</a>' +
					'<a href="' + userData.userProfileActivityUrl + '" class="UserProfilePopup__button">Posts</a>' +
				'</div>' +
			'</div>').appendTo('body').hide();
			
			function showPopup() {
				var offset = $link.offset();
				popup.css({
					opacity: 1,
					position: 'absolute',
					top: offset.top + $link.outerHeight() - 7,
					left: offset.left,
					pointerEvents: 'all',
					zIndex: 9999,
				}).stop(true, true).fadeIn(300);
			}
			
			function hidePopup() {
				setTimeout(function() {
					if (!popup.is(':hover')) popup.fadeOut(300);
				}, 100);
			}
			
			$link.off('mouseenter mouseleave').on('mouseenter', showPopup).on('mouseleave', hidePopup);
			popup.on('mouseenter', function() { popup.stop(true, true).show(); }).on('mouseleave', hidePopup);
			
			if ($link.is(':hover')) showPopup();
		});
	}
	
	var specialNs = mw.config.get("wgFormattedNamespaces")["-1"].replace(/ /g, '_').toLowerCase();
	
	// IF THE MOUSE HOVER THE NEWLY USER LINK, A NEW CLASS WILL BE APPENDED
	$(document).on('pointerenter', 'a[href^="/"]', function() {
		var link = $(this);
		if (link.hasClass('UserProfilePopup__processed')) return;
		if (link.closest('.UserProfilePopup__popup').length) return;
		
		var href = link.attr('href');
		var specialLinkRegex = new RegExp('^/(?:[a-z]{2}/)?wiki/([^:]+):([^/]+)/(.+)$', 'i');
		var specialMatch = href.match(specialLinkRegex);
		
		if (specialMatch) {
			var ns = decodeURIComponent(specialMatch[1]).replace(/ /g, '_').toLowerCase();
			var pageName = decodeURIComponent(specialMatch[2]).toLowerCase();
			var ip = decodeURIComponent(specialMatch[3]);
			
			if (ns === specialNs && isIpAddress(ip)) {
				link.addClass('UserProfilePopup__processed');
				buildIpProfilePopup(link[0], ip);
			}
		}
	});
})();