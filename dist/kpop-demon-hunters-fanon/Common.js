/* Any JavaScript here will be loaded for all users on every page load. */
// Blocked Users
window.mbPartialStyle = 'opacity: 0.5';
window.mbTempStyle = 'opacity: 0.7; text-decoration: line-through';
window.mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through';
window.mbTooltip = 'blocked ($1) by $2: $3 ($4 ago)';
window.mbTipBox = false;
window.mbTipBoxStyle = 'font-size:85%; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA';
window.mbLoadingOpacity = 0.85;
window.mbNoAutoStart = false;

// UTC Clock
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// Ripple
window.ripplesConfig = {
  'normalRipples': document.querySelectorAll('.elements-1, .elements-2'),
  'recenteredRipples': document.querySelectorAll('.foo .bar'),
  'unboundedRipples': document.querySelectorAll('.lorem .ipsum')
};

// Masthead Rights
window.MastheadRightsBadgeSettings = {
    iconSize: '45px',
};

//Link Preview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/kpop-demon-huntersfanon/images/5/51/NoImage.png/revision/latest?cb=20250821223624';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];

// MORE

window.pPreview.RegExp.iparents = ['.quote'];
window.pPreview.RegExp.iparents = ['user', '#myid', 'div[data-ignore-me=1]'];

/**
 * Script: UserProfilePopup
 * Author: Marisa1980
 * Description: Display user information through popup when hovering user link
 * Other: The script is heavily relied on API request. This script can not run on mobile site
**/

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

/// Medals
/* Medals script v1.0.5
*  @author: Kopcap94
*  @update for UCP: HumansCanWinElves
*  @support: Wildream
*  @testers: Fwy, White torch
* <nowiki>
*/

//Remove code and images on Project:Medals that are not needed to operate the script and confuse users — cleans the UI to just the edit modal.
mw.loader.using('mediawiki.util').then(function() {
    if (mw.config.get('wgNamespaceNumber') === 4 && mw.config.get('wgTitle') === "Medals") {
        mw.util.addCSS('.mw-content-ltr.mw-parser-output { display: none; }');
    }
});

;(function($,mw) {
	importArticle({
    	type: 'script',
    	article: 'u:dev:MediaWiki:ShowCustomModal.js'
	});
	var showCustomModal;
	
    var namespace = mw.config.get('wgNamespaceNumber');
    
    if (namespace !== 2 && namespace !== 1200 && namespace !== 500 && 
        (namespace !== 4 || mw.config.get('wgTitle') !== 'Medals' || mw.config.get('wgAction') !== 'view')) {
        return;
    }
    
    medalFunctions = {

// Forked from w:c:dev:MediaWiki:QuickPurge.js
    	quickPurge: function() {
	    	new mw.Api().post({
	    		action: 'purge',
	    		titles: mw.config.get('wgPageName'),
	    	}).always(function() {
	        	if (typeof(res) !== "object") {
	        		console.warn('API Error in purging the Medals page \"' + mw.config.get('wgPageName') + '\":', res);
	        	}
	        });
	        window.location.reload();
	    },

// Default settings
        medalDefaultSettings: function() {
            default_cfg = JSON.stringify({dataUser:{}, dataMedal: {}, module_title: 'User\'s reward', module_more: 'Show more', module_count_info: 'Amounts of this achievement', module_info: '', module_info_title: '', border: { top_left: 'https://images.wikia.nocookie.net/siegenax/ru/images/1/13/Medal_Border_corner.png', top_right: 'https://images.wikia.nocookie.net/siegenax/ru/images/d/de/Medal_Border_corner_right.png' }});
            
            $('#mw-content-text').prepend('<div style="width:100%; text-aling:center; padding:20px;">Settings not exist or broken.&nbsp;<button id="MedalResetSettings">Reset them?</button></div>');
            $('#MedalResetSettings').click(function() {
                medalFunctions.saveSettingFunction(default_cfg);
            });
        },
        
// Switch setting's tabs function
        switchSettings: function(class_name) {
            $('.MedalSetMenu').hide();
            $('.' + class_name).show();
        },
        
// Link's matcher
        medalMatcher: function(url) {
            /* 
            // Checking for wikia image's links
            // Can be used 4 serves: image, images, static or vignette
            // Those subdomains can have number after it - images2
            // Links SHOULD have wikia's server - .wikia.nocookie.net
            */
            if (url.match(/^https?:\/\/(images?|static|vignette)\d?\.wikia\.nocookie\.net\//)) {
                return true;
            }
            
            return false;
        },

// New medal form        
        addMedalForm: function() {
            $('.MedalList').append(
                '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                    '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                        '<img height="70" style="margin:0 5px -3px 0; cursor:pointer;"/>' +
                    '</div>' +
                    '<div style="display:inline-block; width:475px;">' +
                        '<div style="margin-top:5px;">' + 
                            '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;" title="Submit changes">✓</button>' +
                            '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                            'Medal name : ' + 
                            '<input class="MedalListName" style="float:right; width:324px; margin-right:5px;" data-prev="undefined"/>' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Title : ' +
                            '<input class="MedalListTitle" style="float:right; width:380px; margin-right:5px;" />' +
                        '</div>' +
                        '<div style="margin-top:5px;">' +
                            'Image link : ' +
                            '<input class="MedalListLinkImage" style="float:right; width:380px;  margin-right:5px;" />' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        },
        
// New user form
        addUserForm: function() {
            $('.MedalUser').append(
                '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                    '<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />' +
                    '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                    '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;">Medals</button>' +
                    '<br />' +
                    medalCollectForm +
                '</div>'
            );
        },
        
// Append medal settings (using in user form)
        appendMedalSettings: function($that) {
            var imgLink = $that.find('.MedalListLinkImage').val();
            var titleNew = $that.find('.MedalListTitle').val();
            var nameNew = $that.find('.MedalListName').val();
            var prevName = $that.find('.MedalListName').attr('data-prev');
            
            $that.find('.MedalImagePreview img')
                .attr('src', imgLink)
                .attr('title', titleNew)
                .attr('data-prev', nameNew);
            
            if ($(medalCollectForm).find('[data-section="' + nameNew + '"]').length) {
                // Name wasn't changed, nothing to do!
                return;
            }
            
            var to_add = '<div class="medalCollectBox" data-section="' + mw.html.escape(nameNew) + '" style="display:inline-block; margin:5px 0 0 10px;">' +
                            '<input type="checkbox">' + 
                                mw.html.escape(nameNew) + 
                            '&nbsp;<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                         '</div>';
            
            // Changing default cfg
            var medalCollectSaveForm = $(medalCollectForm).append(to_add);
            
            $('.medalCollectForm').each(function() {
                $(this).append(to_add);
            });
            
            if (prevName !== 'undefined') {
                // Removing old name
                $('[data-section="' + prevName + '"]').remove();
                medalCollectSaveForm.find('[data-section="' + prevName + '"]').remove();
            }
            
            // Saving cfg
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
        },
        
// Delete medal settings (using in user form)
        deleteMedalSettings: function($that) {
            var medal_name = $that.find('.MedalListName').val();
            // If someone decide to cheat
            var prev_name = $that.find('.MedalListName').attr('data-prev');
            
            // Changing default cfg
            var medalCollectSaveForm = $(medalCollectForm);
            medalCollectSaveForm.find('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
            medalCollectForm = medalCollectSaveForm.prop('outerHTML');
            
            // Doing things
            $that.remove();
            $('[data-section="' + medal_name + '"], [data-section="' + prev_name + '"]').remove();
        },
        
// Collect result function
        medalCollectFunction: function() {
            result = {};
            result.dataUser = {};
            result.dataMedal = {};
                
            // Main settings
            result.module_title = $('#MedalTitle').val();
            result.module_more = $('#MedalMore').val();
            result.module_count_info = $('#MedalCount').val();
            result.module_info = $('#MedalInfo').val();
            result.module_info_title = $('#MedalInfoTitle').val();
            
            result.border = {
                top_left: $('#MedalBorderLeft').val(),
                top_right: $('#MedalBorderRight').val()
            };
                        
            // Collecting users
            $('.UserForm').each(function() {
                var user = $(this).find('.MedalUserName').val();
                if (user === '') return;
                
                var medals = [];
                
                $(this).find('.medalCollectBox').each(function() {
                    if (!$(this).find('input[type="checkbox"]').prop('checked')) {
                        return;
                    }
                    
                    var medal_name = $(this).attr('data-section');
                    var medal_count = $(this).find('.MedalCollectAmount').val();
                    if (medal_count.match(/\d+/) && medal_count !== 1) {
                        medal_name += ':' + medal_count;
                    }
                    
                    medals.push(medal_name);
                });
                            
                result.dataUser[user] = medals;
            });
                    
            // Collectings medals
            $('.MedalForm').each(function() {
                var medal_name = $(this).find('.MedalListName').val();
                if (medal_name === '') return;
                
                var medal_image = $(this).find('.MedalListLinkImage').val();
                if (!medalFunctions.medalMatcher(medal_image)) return;
                            
                result.dataMedal[medal_name] = {
                    title: $(this).find('.MedalListTitle').val(),
                    image_url: medal_image
                };
            });
            
            return result;
        },
        
// Save config function
        saveSettingFunction: function(medalSet) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'Project:Medals',
                    summary: 'Settings changes',
                    text: medalSet,
                    bot: 1,
                    token: mw.user.tokens.get('csrfToken'),
                    format: 'json'
                },
                success: function(d) {
                	if (d.error && d.error.info) {
                		alert(d.error.info);
                	} else if (d.edit && d.edit.result == 'Success') {
                        medalFunctions.quickPurge();
                    }
                }
            });
        },
        
// Tooltip
        tooltip: function(that) {
            title = $(that).attr('data-title');
            badgename = $(that).attr('data-name');
            offSet = $(that).offset();
            setOffX = parseFloat(offSet.left) - 86 + $(that).width() / 2;
            setOffY = parseFloat(offSet.top) + $(that).height() + 5;
            
            $('body').append(
                '<div class="badgetooltip" style="position:absolute; z-index:6000000;">' +
                    '<div class="badgetooltiparrow" style="width:0; height:0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid #e0a419; margin: 0 auto;"></div>' +
                    '<div class="badgetooltipwindow" style="width: 160px; background-color:var(--theme-page-background-color); border:6px double #e0a419; border-radius:0px; text-align:center; padding:5px;">' +
                        $('<span style="font-weight:bold;font-family:Audiowide;color:var(--theme-page-text-color);">').text(badgename).prop('outerHTML') +
                        '<hr />' +
                        $('<span style="font-family:Quantico;color:var(--theme-page-text-color);">').text(title).prop('outerHTML') +
                    '</div>' +
                '</div>'
            );
            
            $('.badgetooltip').css({top: setOffY, left: setOffX});
            
            $(that).on('mouseout', function() {
                $('.badgetooltip').remove();
            });
        },
        
// Main function
        medalMainFunction: function() {
            if (typeof MedalSettings === 'undefined') {
                // Settings are broken or still not exists
                return;
            }
            
            user = mw.config.get('wgTitle');
            medalModal = false;
 
            if (typeof MedalSettings.dataUser[user] === 'undefined' || !MedalSettings.dataUser[user].length) {
                // Returning if user don't have medals (even if he pointed in config)
                return;
            }
            
            // Check for non wiki's images
            medalBorderRight = (medalFunctions.medalMatcher(MedalSettings.border.top_right)) ? $('<img width="40" />').attr('src', MedalSettings.border.top_right).prop('outerHTML') : '';
            medalBorderLeft = (medalFunctions.medalMatcher(MedalSettings.border.top_left)) ? $('<img width="40" />').attr('src', MedalSettings.border.top_left).prop('outerHTML') : '';
            
            $('#WikiaRail').prepend(
                '<section class="RewardModule rail-module">' +
                    '<div class="RewardContainer" style="position:relative; width:100%; padding: 0;">' +
                        // Borders: Top-Left; Top-Right; Bottom-Left; Bottom-Right;
                        '<div style="position:absolute; top:0; left:0;">' + 
                            medalBorderLeft + 
                        '</div>' +
                        '<div style="position:absolute; top:0; right:0;">' + 
                            medalBorderRight + 
                        '</div>' +
                        '<div style="position:absolute; bottom:0; left:0; transform:rotate(180deg); -ms-transform:rotate(180deg); -webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); -o-transform:rotate(180deg);">' + 
                            medalBorderRight + 
                        '</div>' +
                        '<div style="position:absolute; bottom:0; right:0; transform:rotate(180deg); -ms-transform:rotate(180deg); -webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); -o-transform:rotate(180deg);">' + 
                            medalBorderLeft +
                        '</div>' +
                        // Title
                        $('<h2 class="activity-heading">').text(MedalSettings.module_title).prop('outerHTML') +
                        // Medal's section
                        '<div class="RewardSection" style="margin:0 5px;">' + 
                            '<div class="in" style="text-align:center;"></div>' +
                        '</div>' +
                        // Additional section
                        '<div class="MedalAdditionalSection" style="width:100%; text-align:center;"></div>' +
                    '</div>' +
                '</section>'
            );

            if (MedalSettings.dataUser[user].length > 12) {
                medalModal = true;
                
                medalModalForm.append('<div class="ModalMedalCollection"><div class="in" style="text-align:center;"></div></div>');
            
                $('.MedalAdditionalSection').append(
                        $('<button type="button" class="MedalMore" style="cursor:pointer;">').text((MedalSettings.module_more === '' || typeof(MedalSettings.module_more) === 'undefined') ? 'Show more' : MedalSettings.module_more).prop('outerHTML')
                );
            }
            
            if (MedalSettings.module_info !== '' && typeof(MedalSettings.module_info) !== 'undefined') {
                $('.MedalAdditionalSection').append(
                    $('<a class="button" style="margin-left:1px; cursor:info;">')
                        .text(MedalSettings.module_info_title)
                        .attr('href', mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki/' + MedalSettings.module_info)
                        .prop('outerHTML')
                );
            }
            
            if (!$('.MedalAdditionalSection').is(':empty')) {
                $('.MedalAdditionalSection').css('margin', '5px 0 -20px 0');
            }
        
            $.each(MedalSettings.dataUser[user], function (i, v) {
                imgBody = '';
                
                // If user have more then 1 medal
                if (v.indexOf(':') > -1) {
                    count = v.replace(/.+:(.+)/g, '$1');
                    v = v.replace(/(.+):.+/g, '$1');
                    imgBody += $('<div class="RewardCount" style="position:absolute; bottom:0; right:0; padding:0 4px; background-color:var(--theme-page-background-color--secondary); font-family:Audiowide; font-size:10px; border-radius:50%; cursor:pointer; color:var(--theme-page-text-color);">').text('x' + count).attr('title', MedalSettings.module_count_info).prop('outerHTML');
                }
                
                // Additional protect (if file not from Wikia image hosting)
                if (typeof(MedalSettings.dataMedal[v]) === 'undefined' || typeof(MedalSettings.dataMedal[v].image_url) === 'undefined' ||  !medalFunctions.medalMatcher(MedalSettings.dataMedal[v].image_url)) {
                    return;
                }
                
                imgBody += $('<img style="cursor:pointer; vertical-align:middle;" width="50" onmouseover="medalFunctions.tooltip(this);" />').attr('src', MedalSettings.dataMedal[v].image_url).attr('data-title', MedalSettings.dataMedal[v].title).attr('data-name', v).prop('outerHTML');
     
                if (medalModal) {
                    medalModalForm.find('.ModalMedalCollection .in').append('<div class="RewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
 
                    if (i > 11) return;
                }
 
                $('.RewardSection .in').append('<div class="RewardImage" style="display:inline-block; position:relative; margin:2px 5px;">' + imgBody + '</div>');
            });
 
            $('.MedalMore').click(function() {
                showCustomModal( mw.html.escape(MedalSettings.module_title + ' ' + user), medalModalForm, {width: 400});
            });
        },
        
// Settings function
        medalSettingsFunction: function() {
            var group_list = mw.config.get('wgUserGroups');
            if (group_list.indexOf('sysop') == -1 &&
                group_list.indexOf('content-moderator') == -1 &&
                group_list.indexOf('staff') == -1 &&
                group_list.indexOf('soap') == -1) {
                // No rights - nothing to do here :P
                return;
            }
            
            // Variables for this function
            medalCollect = [];
            medalDeleteImg = '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite trash" />';
            medalCollectForm = $('<div class="medalCollectForm" style="display:none; text-align:left; margin-top:5px; border-top:1px solid black;">');
        
            if (typeof MedalSettings === "undefined") {
                // If settings not exists or broken: ask to create new!
                medalFunctions.medalDefaultSettings();

                return;
            }
        
            $('#mw-content-text').prepend('<div style="width:100%; text-align:center; padding:20px;"><button id="MedalSettings">Access settings</button></div>');
    
            // Creating form
            medalModalForm.append(
                '<div style="padding-bottom:5px; border-bottom:solid 1px #36759c; margin-top:-5px;">' +
                    '<div style="text-align:center;">' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalMainDialog\')">Main</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalUserDialog\')">Users</button>&nbsp;' +
                        '<button type="button" class="wikia-button medalSwitch" onclick="medalFunctions.switchSettings(\'MedalListDialog\')">Medals</button>' +
                    '</div>' +
                '</div>' +
                '<div style="height:270px;">' +
                    // Main settings menu
                    '<div class="MedalMainDialog MedalSetMenu">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px var(--theme-accent-color); margin-bottom:5px;">Main Settings</h2>' +
                        '<div>Module title: ' + $('<input id="MedalTitle" style="float:right; width:80%;" />').attr('value', MedalSettings.module_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Expand button: ' + $('<input id="MedalMore" style="float:right; width:80%;" />').attr('value', MedalSettings.module_more).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal count: ' + $('<input id="MedalCount" style="float:right; width:80%;" />').attr('value', MedalSettings.module_count_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal info page: ' + $('<input id="MedalInfo" style="float:right; width:80%;" />').attr('value', MedalSettings.module_info).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Medal info title: ' + $('<input id="MedalInfoTitle" style="float:right; width:80%;" />').attr('value', MedalSettings.module_info_title).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Border left: ' + $('<input id="MedalBorderLeft" style="float:right; width:80%;" />').attr('value', MedalSettings.border.top_left).prop('outerHTML') + '</div>' +
                        '<div style="margin-top:5px;">Border right: ' + $('<input id="MedalBorderRight" style="float:right; width:80%;" />').attr('value', MedalSettings.border.top_right).prop('outerHTML') + '</div>' +
                    '</div>' +
                    // User's settings menu
                    '<div class="MedalUserDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px var(--theme-accent-color);">' +
                            'Users' +
                            '<button onclick="medalFunctions.addUserForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add user form</button>' +
                        '</h2>' +
                        '<div class="MedalUser" style="height:240px; overflow-y:scroll; border-bottom:solid 1px var(--theme-accent-color);"></div>' +
                    '</div>' +
                    // Medal's settings menu
                    '<div class="MedalListDialog MedalSetMenu" style="display:none;">' +
                        '<h2 style="padding:5px 0 5px 5px; background-color:rgba(0,0,0,0.1); border-bottom:solid 1px var(--theme-accent-color);">' +
                            'Medals' +
                            '<button onclick="medalFunctions.addMedalForm()" style="padding:0 4px; margin:0 10px 0 0; float:right;">Add medal form</button>' +
                        '</h2>' +
                        '<div class="MedalList" style="height:240px; overflow-y:scroll; border-bottom:solid 1px var(--theme-accent-color);"></div>' +
                    '</div>' +
                '</div>'
            );
    
            // Filling up form for medals and users
            $.each(MedalSettings.dataMedal, function(k,v) {
                // Because we need to know all kinds of medals
                medalCollect.push(k);
                
                medalModalForm.find('.MedalList').append(
                    '<div class="MedalForm CustomForm" style="padding-bottom:5px; border-bottom:1px solid grey;">' +
                        '<div class="MedalImagePreview" style="display:inline-block; width:80px; text-align:center;">' +
                            $('<img height="70" style="margin:0 5px -3px 0; cursor:pointer;"/>').attr('src', v.image_url).attr('title', v.title).prop('outerHTML') +
                        '</div>' +
                        '<div style="display:inline-block; width:475px;">' +
                            '<div style="margin-top:5px;">' + 
                                '<button onclick="medalFunctions.appendMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 4px; margin:0 6px 0 0; float:right;">✓</button>' +
                                '<button onclick="medalFunctions.deleteMedalSettings($(this).parents(\'.MedalForm\'))" style="padding:0 0 0 3px; margin:0 5px 0 0; float:right;">' + medalDeleteImg + '</button>' +
                                'Medal name : ' + 
                                $('<input class="MedalListName" style="float:right; width:324px; margin-right:5px;" />').attr('value', k).attr('data-prev', k).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Title : ' +
                                $('<input class="MedalListTitle" style="float:right; width:380px; margin-right:5px;" />').attr('value', v.title).prop('outerHTML') +
                            '</div>' +
                            '<div style="margin-top:5px;">' +
                                'Image link : ' +
                                $('<input class="MedalListLinkImage" style="float:right; width:380px;  margin-right:5px;" />').attr('value', v.image_url).prop('outerHTML') +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            });
            
            // Preparing default 'module' for medals
            $.each(medalCollect, function(i,v) {
                medalCollectForm.append(
                    $('<div class="medalCollectBox" style="display:inline-block; margin:5px 0 0 10px;">' +
                        '<input type="checkbox">' + 
                        $('<span>').text(v + ' ').prop('outerHTML') + 
                        '<input class="MedalCollectAmount" style="width:30px; text-align:center;"/>' +
                    '</div>').attr('data-section', v).prop('outerHTML')
                );
            });
            
            // Saving it
            medalCollectForm = medalCollectForm.prop('outerHTML');
            
            // Creating form for users
            $.each(MedalSettings.dataUser, function(k,v) {
                var medalCollectFormNew = $(medalCollectForm);
                
                $.each(v, function(i,val) {
                    // If user have more then 1 medal
                    if (val.indexOf(':') > -1) {
                        var count = val.replace(/.+:(.+)/g, '$1');
                        val = val.replace(/(.+):.+/g, '$1');
                        
                        medalCollectFormNew.find('.medalCollectBox[data-section="' + val + '"] .MedalCollectAmount').attr('value', count);
                    }
                    
                    medalCollectFormNew.find('.medalCollectBox[data-section="' + val + '"] input[type="checkbox"]').attr('checked', 'checked');
                });
                
                medalModalForm.find('.MedalUser').append(
                    '<div class="UserForm CustomForm" style="text-align:center; margin-top:5px; border-bottom:1px solid black; padding-bottom:5px;">' +
                        $('<input class="MedalUserName" style="float:left; width:40%; margin-left:5px;" />').attr('value', k).prop('outerHTML') +
                        '<button onclick="$(this).parents(\'.CustomForm\').remove()" style="padding:0 0 0 3px; margin:0 5px; float:left;">' + medalDeleteImg + '</button>' +
                        '<button onclick="$(this).parents(\'.UserForm\').find(\'.medalCollectForm\').toggle()" style="padding:0 0 0 3px; margin:0 5px; width:100px;"> Medals</button>' +
                        '<br />' +
                        medalCollectFormNew.prop('outerHTML') +
                    '</div>'
                );
            });
            
            // For reset function
            medalModalFormCompleted = medalModalForm.prop('outerHTML');
        
            // Modal window
            $('#MedalSettings').click(function() {
                showCustomModal('Settings', medalModalFormCompleted, {
                    id: 'ModalSettingsWindow',
                    width: 600,
                    height: 450,
                    buttons: [{
                        message: 'Purge page',
                        handler: function() { 
                            location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
                        }
                    },{
                        message: 'Reset changes',
                        handler: function() {
                            $('#ModalSettingsWindow fieldset').replaceWith(medalModalFormCompleted);
                        }
                    },{
                        message: 'Save',
                        handler: function() {
                            result_data = JSON.stringify(medalFunctions.medalCollectFunction());
                            
                            // Save it!
                            medalFunctions.saveSettingFunction(result_data);
                        }
                    }]
                });
            });
        },
        
// Launch function
        init: function(modalScript) {
        	showCustomModal = modalScript;
        	
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: 'Project:Medals',
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
                    dataType:'text'
                },
                success: function(data) {
                    // Parsing result
                    try {
                        MedalSettings = JSON.parse(data);
                    } catch(err) {
                        if (namespace === 4) {
                            medalFunctions.medalDefaultSettings();
                        }
                        
                        return;
                    }
                    
                    medalModalForm = $('<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">');
                    
                    // Checking if we're on settings window or not
                    if (namespace != 4) {
                        medalFunctions.medalMainFunction();
                    } else {
                        medalFunctions.medalSettingsFunction();
                    }
                },
                error: function() {
                    if (namespace === 4) {
                        medalFunctions.medalDefaultSettings();
                    }
                }
            });
        }
    };
    
    // LAUNCH!
    mw.hook('dev.showCustomModal').add(medalFunctions.init);
    
})(this.jQuery,this.mediaWiki);
/* </nowiki> */

/*************
Title        :   BlockSummary
Description  :   Displaying a summary of user's block on the blocked user's "User" Namespace pages
Author       :   Vastmine1029
Version      :   1.4.1
*************/

mw.loader.using('mediawiki.api', function() {
	var config = mw.config.get([
		'wgNamespaceNumber',
		'wgRelevantUserName',
		'wgServer', // Wiki URL
		'wgSiteName', // Wiki Name
		'wgContentLanguage' // Wiki Language Code
	]);
	
	if (config.wgNamespaceNumber !== 2) {
		console.error("The page is not a \"User\" namespace page. BlockSummary.js aborted!");
		return; // Only run in "User" namespace.
	}
	
	if (config.wgRelevantUserName === null) {
		console.error("No relevant username attributed to the current viewed page. BlockSummary.js aborted!");
		return; // Only run in "User" namespace.
	}
	
	var wiki_name = config.wgSiteName;
	var wiki_url = config.wgServer;
	var wiki_lang = config.wgContentLanguage;
	var wiki_lang_for_url = "";
	
	if (wiki_lang !== "en") {
		wiki_lang_for_url = "/" + wiki_lang;
	}
	
	wiki_url = wiki_url + wiki_lang_for_url;
	
	// If the wiki is not English, add language code next to the site name.
	if (wiki_lang !== "en") {
		lang_for_wiki_name = " (" + wiki_lang + ")";
	}
	else {
		lang_for_wiki_name = "";
	}
	
	var user = config.wgRelevantUserName; // grabbing username of user blocked
	var url_user = user.replace(/ /g, "_");
	
	var api = new mw.Api(), data;
	var blockr, blockID, blockperformer, blocktime, expire, block_type; // declaring variables for api.get
	var partial_block_pages, partial_block_features, partial_block_namespaces;
	var partial_block_namespaces_titles = [];
	var parsedBlockReason; // parsed reason stored from parse API output
	var startDate, startTime, startHour, startMinute, startSecond, start_am_pm, blockStartDateTime, blockStartDateTimeHHMMSS; // start time variables
	var endDate, endTime, endHour, endMinute, endSecond, blockEndDateTime, blockEndDateTimeHHMMSS; // end time variables
	var temp; // declaring variable for formatting text
	var lang_for_wiki_name;

	api.get({
		action: 'query',
		list: 'blocks',
		bkusers: user,
		bkprop: "restrictions|by|expiry|id|reason|timestamp|user|userid|flags|byid",
	}).then(function(d) {
		data = d.query.blocks;
		
		// if the user is not blocked, terminate program
		if (data === undefined || data.length < 1) { 
			return;
		}
		
		blockr = data[0].reason; // fetching block reason
		blockID = data[0].id; // fetching block ID
		blockperformer = data[0].by; // fetching block performer
		blockperformer_url = blockperformer.replace(/ /g, "_");
		blocktime = data[0].timestamp; // fetching block start time
		expire = data[0].expiry; // fetching block expiration
		block_type = data[0].partial !== undefined ? "Partial" : "Sitewide"; // Determine if block is sitewide or partial.
		// If partial block applies, fetch what wiki features, pages, and namespaces user is blocked on.
		if (block_type === "Partial") {
			partial_block_pages = [];
			if (data[0].restrictions.pages !== undefined) {
				for (var i in data[0].restrictions.pages) {
					partial_block_pages.push(data[0].restrictions.pages[i]["title"]);
				}
			}
			else {
				partial_block_pages = "N/A";
			}
			partial_block_features = data[0].restrictions.actions;
			partial_block_namespaces = data[0].restrictions.namespaces;

			// API fetch for namespaces.
			// The purpose of this code section is to parse out which namespaces the user is blocked on for partial block.
			if (partial_block_namespaces !== undefined) {
				api.get({
					action: 'query',
					meta: 'siteinfo',
					siprop: 'namespaces',
				}).then(function(data_namespaces) {
					data_namespaces = data_namespaces.query.namespaces;
					
					for (var id in partial_block_namespaces) {
						for (var i in data_namespaces) {
							if (partial_block_namespaces[id] === data_namespaces[i]["id"]) {
								partial_block_namespaces_titles.push(data_namespaces[i]["canonical"]);
								break;
							}
						}
					}
				});
			}
			else {
				partial_block_namespaces_titles = "N/A";
			}
		}
		
		// Avoid double run
		if (window.BlockSummary || !user)
			return;
		window.BlockSummary = true;
		
		
		//----------- | Main Function for Block Report | -----------//
		function main(user, blockreason, blockID, blockperformer, blockperformer_url, blocktime, blockexpire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles) {			
			
			// Passing wikitext for parsing
			console.log("%c[RUNNING] Parsing block reason wikitext...", "background: #F9F983; color: black");
			api.parse(blockreason).done(function(parsedBlockReason) {
				console.log("%c[PASSED] Parsing block reason wikitext.", "background: limegreen; color: black");
				
				//----------- | Block Start Time | -----------//
				console.log("%c[RUNNING] Block (Start) Timestamp Process...", "background: #F9F983; color: black");
				
				temp = blocktime.split("T"); 
				startDate = temp[0];
				temp = temp[1].split("Z");
				startTime = temp[0];
				
				
				blockStartDateTimeHHMMSS = startTime.split(":"); // Splitting time into hours, minutes, seconds as array (blockEndDateTimeHHMMSS = {HH, MM, SS})
				startMinute = blockStartDateTimeHHMMSS[1]; // MM
				startSecond = blockStartDateTimeHHMMSS[2]; // SS
				
				if (parseInt(blockStartDateTimeHHMMSS[0]) == 0) {
					startHour = "12";
					start_am_pm = "AM";
				}
				else if (parseInt(blockStartDateTimeHHMMSS[0]) == 12) {
					startHour = "12";
					start_am_pm = "PM";
				}
				else if (parseInt(blockStartDateTimeHHMMSS[0]) > 12) {
					startHour = parseInt(blockStartDateTimeHHMMSS[0])-12;
					startHour = startHour.toString();
					start_am_pm = "PM";
				}
				else {
					startHour = blockStartDateTimeHHMMSS[0];
					startHour = startHour.toString();
					start_am_pm = "AM";
				}
				
				// Formatting Start Time
				startTime = startHour + ":" + startMinute + ":" + startSecond + " " + start_am_pm;
				blockStartDateTime = startDate + ", " + startTime + " (UTC)";
				
				console.log("%c[PASSED] Block (Start) Timestamp Process", "background: limegreen; color: black");
				
				//----------- | Time Formatting for Block End Time | -----------//
				console.log("%c[RUNNING] Block (End) Timestamp Process...", "background: #F9F983; color: black");
				
				if (blockexpire == "infinity") {
					blockEndDateTime = "infinity";
				}
				else {
					temp = blockexpire.split("T");
					endDate = temp[0];
					temp = temp[1].split("Z");
					endTime = temp[0];
					blockEndDateTime = endDate + ", " + endTime + " UTC";
					
					blockEndDateTimeHHMMSS = endTime.split(":"); // Splitting time into hours, minutes, seconds as array (blockEndDateTimeHHMMSS = {HH, MM, SS})
					endMinute = blockStartDateTimeHHMMSS[1];
					endSecond = blockStartDateTimeHHMMSS[2];
					
					temp = parseInt(blockEndDateTimeHHMMSS[0]) - 12;
					
					if (parseInt(blockEndDateTimeHHMMSS[0]) == 0) {
						endHour = "12";
						end_am_pm = "AM";
					}
					else if (parseInt(blockEndDateTimeHHMMSS[0]) == 12) {
						endHour = "12";
						end_am_pm = "PM";
					}
					else if (parseInt(blockEndDateTimeHHMMSS[0]) > 12) {
						endHour = parseInt(blockEndDateTimeHHMMSS[0])-12;
						endHour = endHour.toString();
						end_am_pm = "PM";
					}
					else {
						endHour = blockEndDateTimeHHMMSS[0];
						endHour = endHour.toString();
						end_am_pm = "AM";
					}
					
					// Formatting End Time
					endTime = endHour + ":" + endMinute + ":" + endSecond + " " + end_am_pm;
					blockEndDateTime = endDate + ", " + endTime + " (UTC)";
				}
				
				console.log("%c[PASSED] Block (End) Timestamp Process", "background: limegreen; color: black");
				
				
				//----------- | HTML Display of Block Report | -----------//
				console.log("%c[RUNNING] Creating HTML Display of Block Report...", "background: #F9F983; color: black");
				
				var Box = document.createElement("div"); // Box
				Box.style.marginTop = "1em"; // setting top-margin for Box
				Box.style.marginBottom = "1em"; // setting bottom-margin for Box
				Box.style.paddingTop = "1em"; // setting padding-top for Box
				Box.style.paddingLeft = "1em"; // setting padding-left for Box
				Box.style.paddingRight = "1em"; // setting padding-right for Box
				Box.style.paddingBottom = "1em"; // setting padding-bottom for Box
				
				
				// adding classes for Box -- these classes are made by Fandom
				Box.classList.add("warningbox");
				Box.classList.add("mw-warning-with-logexcerpt");
				Box.classList.add("mw-content-ltr");
				
				var textParagraph = document.createElement("p"); // create a text paragraph

				if (block_type === "Partial") {
					var partial_block_details = "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Features: </b></i>" + partial_block_features + "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Pages: </b></i>" + partial_block_pages + "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Namespaces: </b></i>" + partial_block_namespaces_titles;
				}
				else {
					var partial_block_details = "";
				}
				
				// HTML design
			textParagraph.innerHTML = "<center><div style=\"font-size: 15pt; padding:2px; font-family:Audiowide; line-height: 1em\"><a href=\"" + wiki_url + "/wiki/User:" + url_user +"\">" + user + "</a> is currently blocked on <a href=\"\">" + wiki_name + "<span style=\"font-size: 8pt;\">" + lang_for_wiki_name + "</a></span> </div></center><a href=\"" + wiki_url + "/wiki/User:" + user + "\"></a><hr style=\"border: 1px solid rgb(var(--theme-alert-color--rgb)); background-color: rgb(var(--theme-alert-color--rgb));\"><span style=\"position: relative; float: right; border: 0px solid; padding: 0 0.25em 0 0.25em\"><a href=\"" + wiki_url + "/wiki/Special:Log?type=block&page=User:" + url_user + "\">Block Log</a></span><div style =\"font-size: 15pt; font-family:Audiowide; text-decoration: underline;\">Block Information</div><b><i>Username: </i></b>" + user + "<br/><b><i>Block ID: </b></i>" + blockID + "<br/><b><i>Block Performer: </b></i><a href=\"" + wiki_url + "/wiki/User:" + blockperformer_url + "\">" + blockperformer + "</a><br/><b><i>Block Type: </b></i>" + block_type + partial_block_details + "<br/><b><i>Block Start: </b></i>" + blockStartDateTime + "<br/><b><i>Block Expiry: </b></i>" + blockEndDateTime + "<br/><b><i>Block Reason: </b></i><blockquote style=\"border-left: 5px solid rgba(var(--theme-alert-color--rgb), 0.5); padding-left: 0.5em;\">" + parsedBlockReason + "</blockquote>";
				
				Box.appendChild(textParagraph); // apply all text configurations into Box
				
				console.log("%c[DONE] HTML Display of Block Report", "background: limegreen; color: black");
				
				//----------- | Using setInterval to ensure prepending of Box to content page | -----------//
				var interval = setInterval(function() {
					if ($('.ns-2 #content').length) {
						clearInterval(interval);
						$(".ns-2 #content").eq(0).before(Box); // prepending Box to ".ns-2 #content"
					}
				}, 1000);	
			});
		}
		main(user, blockr, blockID, blockperformer, blockperformer_url, blocktime, expire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles); // executing function
	});
});