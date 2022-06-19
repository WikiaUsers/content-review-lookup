/*
 * 18:12, September 18, 2014 (UTC)
 * https://dev.fandom.com/wiki/MessageWallUserTags
 * User tags for names on Message Walls + comments on articles and blogs
 * @author: RyaNayR (https://dev.fandom.com/wiki/User:RyaNayR)
 * @edited-by: SuperSajuuk (https://dev.fandom.com/wiki/User:SuperSajuuk)
 * @edited-by: Caburum (https://dev.fandom.com/wiki/User:Caburum)
 * @edited-by: Mario&LuigiBowser'sInsideStory (https://dev.fandom.com/wiki/User:Mario%26LuigiBowser%27sInsideStory) (Discord: Tier3#8252)
 *
 * This script is OpenSource —
 * It is completely free for anyone to use or modify in any way.
 * All modifications and improvements are welcome and appreciated.
 */
 
mw.loader.using('mediawiki.api').then(function() {
	// Limit to articles, blogs, and message walls
	if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1) {
		return;
	}
	// Check for variable
	if (window.MessageWallUserTags) {
		init(window.MessageWallUserTags);
	}
	// Use JSON page if the variable doesn't exist
	else {
		fetch(mw.util.wikiScript('api') + '?action=query&format=json&meta=allmessages&ammessages=Custom-Message-Wall-User-Tags.json').then(function(response) {
			response.json().then(function(obj) {
				var json = obj.query.allmessages[0]['*'];
				if (json) {
					var tags;
					try {
						tags = JSON.parse(json);
					} catch (e) {
						console.error('[MESSAGE WAll USER TAGS] Could not parse tags JSON data:', e);
					}
					if (tags) {
						init(tags);
					}
				} else {
					console.error('[MESSAGE WALL USER TAGS] Media for tags could not be loaded.');
				}
			}).catch(function(err) {
				console.error('[MESSAGE WALL USER TAGS] Could not convert fetch response from JSON to object:', err);
			});
		}).catch(function(err) {
			console.error('[MESSAGE WALL USER TAGS] Fetch failed to load user tags from API:', err);
		});
	}
	// Function to add tags
	function addTags(tags) {
		var elements = document.querySelectorAll('[class^="EntityHeader_name"]');
		elements.forEach(function(element) {
			for (var user in tags.users) {
				if (element.innerText === user) {
					if (element.parentElement.querySelector('.MessageWallUserTag')) {
						return;
					}
					var tag = document.createElement('span');
					tag.classList.add('MessageWallUserTag');
					tag.style.color = tags.tagColor || 'red';
					tag.style.fontSize = tags.txtSize || '10px';
					if (tags.glow) {
						tag.style.textShadow = '0 0 ' + (tags.glowSize || '15px') + ' ' + (tags.glowColor || '#f77');
					}
					tag.innerText = '(' + mw.html.escape(tags.users[user]) + ')';
					tag.style.marginLeft = '6px';
					element.insertAdjacentElement('afterend', tag);
				}
			}
		});
	}
	// Initialization
	function init(tags) {
		addTags(tags);
		new MutationObserver(function() {
			addTags(tags);
		}).observe(document.querySelector('#articleComments, #MessageWall'), {
			childList: true,
			subtree: true
		});
	}
});