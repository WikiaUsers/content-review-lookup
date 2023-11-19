/**
 * Tags.js
 * This script is used to apply tags to usernames in the messages and comments
 * Created by Mario&LuigiBowser'sInsideStory (Discord: Tier3#8252)
*/

(function() {
	if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1) {
		return;
	}
	
	// First load the tags
	fetch('/api.php?action=query&format=json&meta=allmessages&ammessages=Custom-Tags.json').then(function(response) {
		response.json().then(function(obj) {
			var json = obj.query.allmessages[0]['*'];
			if (json) {
				var tags;
				try {
					tags = JSON.parse(json);
				} catch (e) {
					console.error('[TAGS] could not parse JSON:', e);
				}
				if (tags) {
					init(tags);
				}
			}
		});
	});
	
	// Call this function to add tags
	function addTags(tags) {
		var elements = document.querySelectorAll('[class^="EntityHeader_name"]');
		tags.forEach(function(i) {
			i.users.forEach(function(user) {
				elements.forEach(function(element) {
					if (element.innerText === user) {
						if (element.parentElement.querySelector('.user-tag')) {
							return;
						}
						var tag = document.createElement('span');
						tag.classList.add('user-tag');
						tag.innerText = '(' + i.text + ')';
						tag.style.marginLeft = '6px';
						element.insertAdjacentElement('afterend', tag);
					}
				});
			});
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
})();