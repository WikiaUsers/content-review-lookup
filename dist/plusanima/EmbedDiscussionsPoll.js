/*
    Embeds a poll from Discussions using an iframe
    See Template:EmbedDiscussionsPoll
*/
(function() {
    Array.prototype.slice.call(document.querySelectorAll('div[data-embed-discussions-poll]')).forEach(function(pollContainer) {
        // Check that we have a poll ID
        var pollID = pollContainer.getAttribute('data-embed-discussions-poll');
        if(!pollID) {
            return;
        }
 
        // Create iFrame
        var frame = document.createElement('iframe');
        frame.setAttribute('border', 0);
        frame.setAttribute('frameborder', 0);
        frame.style.width = '100%';
        frame.setAttribute('src', wgServer + '/f/p/' + pollID);
        // Hide until we are finished
        frame.style.position = 'absolute';
        frame.style.opacity = 0;
        // Wait for iFrame to load
        frame.addEventListener('load', function() {
            // Ensure the poll has loaded in the iFrame
            var poll = frame.contentDocument.querySelector('.post-details-post .post-info');
            if(poll) {
                loadCallback(poll);    
            } else {
                var timeout = 5000;
                var start = Date.now();
                var interval = setInterval(function() {
                    poll = frame.contentDocument.querySelector('.post-details-post .post-info');
                    if(poll) {
                        clearInterval(interval);
                        loadCallback(poll);
                    }
 
                    // Stop from running forever if error
                    if((Date.now() - start) > timeout) {
                        clearInterval(interval);
                    }
                }, 200);
            }
        });
 
        var loadCallback = function(poll) {
            // Remove anything that is not the poll
            var frameBody = frame.contentDocument.querySelector('body');
            var wdsIconContainer = frame.contentDocument.getElementById('wds-icons-cross').closest('div'); // Needed for icons
            var removeSiblings = function(node) {
                var parent = node.parentNode;
                if(!parent
                || parent === frameBody
                || parent === frame) {
                    return;
                }

                Array.prototype.slice.call(parent.children).forEach(function(sibling) {
                	if(sibling !== node
                    && sibling !== wdsIconContainer) {
                        sibling.style.setProperty('display', 'none', 'important');
                    }
                });
 
                removeSiblings(parent);
            };
            removeSiblings(poll);
 
            // Show entire poll (no scrolling)
            frame.style.overflow = 'hidden';
            frame.contentDocument.querySelector('html').style.overflow = 'hidden';
            frameBody.style.overflow = 'hidden';
            frameBody.querySelector('.wds-fandom-content-well').style.margin = 0; // Remove gutters
            frameBody.querySelector('.post-details-desktop,.post-details-mobile').style.setProperty('margin-top', 0, 'important');
            frameBody.querySelector('.post-details-desktop,.post-details-mobile').style.setProperty('margin-bottom', 0, 'important');
            frame.setAttribute('height', frameBody.clientHeight + 'px');
 
            // Display the poll
            frame.style.position = '';
            frame.style.opacity = '';
 
            // Resize poll if window resizes
            window.addEventListener('resize', function() {
                frame.removeAttribute('height');
                frame.setAttribute('height', frameBody.clientHeight + 'px');
            });
            
			const observer = new MutationObserver(function(mutationsList, observer) {
				removeSiblings(poll);
				
				/*
					Some element nodes aren't removed by the function (even with the MutationObserver).
					Unsure why. Added later via AJAX? But JS .children still can't find them?
					Remove them manually.  (Fix later, maybe)
				*/
				[
					'.wds-community-bar',
					'.feed-back-link.is-accented-link',
					'header.post-attribution',
					'.edited-by',
					'.post-details__tags-wrapper',
					'footer.post-footer',
					'.post-details-desktop__main .reply',
					'.post-details__no-replies',
					'.mobile-reply-create-entry',
					'.aside-feed'
				].forEach(function(selector) {
					Array.prototype.slice.call(frameBody.querySelectorAll(selector)).forEach(function(node) {
						node.style.setProperty('display', 'none', 'important');
					});
				});
				
				// Remove gutters again (same issue as the missing JS .children?)
            	frameBody.querySelector('.post-details-desktop,.post-details-mobile').style.setProperty('margin-top', 0, 'important');
            	frameBody.querySelector('.post-details-desktop,.post-details-mobile').style.setProperty('margin-bottom', 0, 'important');
				
				// Trigger a poll resize
				window.dispatchEvent(new Event('resize'));
			});
			observer.observe(frameBody, { attributes: true, childList: true, subtree: true });
        };
 
        frame = pollContainer.appendChild(frame);
   });
})();