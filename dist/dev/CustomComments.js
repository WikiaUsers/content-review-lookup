/**
 * CustomComments
 * A versatile script that allows administrators to customize the comments for users
 * Author: Mario&LuigiBowser'sInsideStory (Discord: Tier3#8252)
*/

mw.loader.using('mediawiki.api').then(function() {
	if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1 || window.customCommentsLoaded) {
		return;
	}
	window.customCommentsLoaded = true;
	
	function setGroup(name, group) {
		var type = mw.config.get('wgNamespaceNumber') === 1200 ? 'message' : 'comment';
		var all = Array.from(document.querySelectorAll('.Comment_comment__sASOd, .Reply_body__3woA9, .Message, .Reply'));
		all.forEach(function(i) {
			if (i.querySelector('.EntityHeader_name__2oRXg').innerText === name) {
				if (!i.classList.contains(type + '-' + group)) {
					i.classList.add(type + '-' + group);
				}
			}
		});
	}
	
	function loadComments() {
		if (window.customCommentGroups) {
			mw.hook('comments.data.loaded').fire(window.customCommentGroups);
		} 
		else {
			// Get JSON data
			new mw.Api().get({
				action: 'query',
				format: 'json',
				meta: 'allmessages',
				ammessages: 'Custom-comment-groups.json'
			}).done(function(response) {
				if (!response.error) {
					var json = response.query.allmessages[0]['*'];
					if (json) {
						try {
							mw.hook('comments.data.loaded').fire(JSON.parse(json));
						} catch (e) {
							console.error('[CUSTOM COMMENTS] Invalid JSON detected:', e);
						}
					} else {
						console.error('[CUSTOM COMMENTS] No media found for comment groups.');
					}
				} else {
					console.error('[CUSTOM COMMENTS] Error while trying to load JSON page:', response.error.info);
				}
			});
		}
	}
	mw.hook('comments.data.loaded').add(function(data) {
		if (Array.isArray(data)) {
			data.forEach(function(i) {
				i.users.forEach(function(j) {
					setGroup(j, i.group);
				});
			});
			new MutationObserver(function() {
				data.forEach(function(i) {
					i.users.forEach(function(j) {
						setGroup(j, i.group);
					});
				});
			}).observe(document.querySelector('#articleComments, #MessageWall'), {
				childList: true,
				subtree: true
		    });
	    }
	});
	loadComments();
});