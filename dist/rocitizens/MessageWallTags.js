/**
 * MessageWallTags
 * Adds custom tags to message wall users
 * @Author Mario&LuigiBowser'sInsideStory (Discord: Tier3#8252)
 * */
 
mw.loader.using('mediawiki.api').then(function() {
    // Scoping + Double run protection
    if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1 || window.wallTagsLoaded) {
        return;
    }
    console.log('[MessageWallTags] We\'re up and running!');
    window.wallTagsLoaded = true;
    // Function to add the wall tags to the user
    function addWallTag(user, text, tagData) {
        $('.EntityHeader_name__2oRXg').each(function() {
            if ($(this).text() === user && !$(this).parent().find('.WallTag').text()) {
                $(this).after(
                   $('<span>', {
                       class: 'WallTag', 
                       style: 'margin: 5px; color: ' + (tagData.color || 'white') + '; font-size: ' + (tagData.size ? String(tagData.size) : '100') + '%;' + (tagData.glow === true ? 'text-shadow: ' + (tagData.glowColor ? tagData.glowColor +' 0px 0px ' + (tagData.glowSize ? String(tagData.glowSize) : '10') + 'px' : (tagData.color ? tagData.color : 'white') + ' 0px 0px 10px;') : ''),
                       text: '(' + mw.html.escape(text) + ')'
                   })
               );
            }
        });
    }
    // Function to load new wall tags
    function loadWallTags() {
        var api = new mw.Api();
        // Get MW message
        api.get({
            action: 'query',
            format: 'json',
            meta: 'allmessages',
            ammessages: 'Custom-MessageWallTags.json'
        }).done(function(response) {
            var data;
            try {
                data = JSON.parse(response.query.allmessages[0]['*']);
            } catch (e) {
                console.error('[MessageWallTags] Invalid JSON detected:', e);
            }
            if (data) {
                var tags = data.tags;
                tags.forEach(function(i) {
                    i.users.forEach(function(j) {
                        addWallTag(j, i.text, data);
                    });
                });
            }
       });
    }
    function init() {
        loadWallTags(); // Call when the init is called
        var observer = new MutationObserver(function(event) {
		    var node = event[0].addedNodes[0];
	        if (node) {
		        if (node.classList.contains('WallTag')) { 
		            return;
		        }
	        }
		    loadWallTags();
		});
        if (document.querySelector('#articleComments')) {
		    observer.observe(document.querySelector('#articleComments'), {
			    childList: true,
			    subtree: true
	        });
        } else {
	        observer.observe(document.querySelector('#MessageWall'), {
                childList: true,
                subtree: true
            });
        }
    }
    $(init);
});
 
 // Small warning for others attempting to edit the JSON page
if (mw.config.get('wgPageName') === 'MediaWiki:Custom-MessageWallTags.json') {
    $('#mw-content-text').before(
         '<div class="json-warning">' +
             '<h1 style="text-align: center;">Warning!</h1>' +
             '<p>This page is written in <a target="_blank" href="https://en.wikipedia.org/wiki/JSON">JSON</a>. Unless you know what you\'re doing, please refrain from editing this page as an error in the JSON can cause the message wall tags to stop working!</p>' + 
         '</div>'
    );

}