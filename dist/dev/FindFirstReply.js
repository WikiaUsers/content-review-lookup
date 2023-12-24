(function findFirstReply(window, $, mw) {

    "use strict";

    window.findFirstReply = window.findFirstReply || {};
    if (window.findFirstReply.loaded) return;
    window.findFirstReply.loaded = true;
    
    var $widget = $('#first-reply-finder');
    if (!$widget.length) return;

    function getFirstReplyId(postId, wikiUrl) {
        const apiUrl = wikiUrl + '/wikia.php?controller=DiscussionThread&method=getThread&threadId=' + postId + '&responseGroup=full&sortDirection=ascending&viewableOnly=false&limit=1';

        return fetch(apiUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(function(responseJson) {
                if (responseJson && responseJson._embedded && responseJson._embedded['doc:posts'] && responseJson._embedded['doc:posts'].length > 0) {
                    const replyId = responseJson._embedded['doc:posts'][0].id;

                    return replyId;
                }

                return null;
            })
            .catch(function(error) {
                return null;
            });
    }

    function extractPostIdFromUrl(url) {
        const postIdRegex = /\/f\/p\/(\d+)/;
        const match = url.match(postIdRegex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    const $inputField = $('<input>')
        .attr('type', 'text')
        .attr('id', 'postLinkInput')
        .attr('placeholder', 'Insert post link')
        .on('keyup', function(e) {
        	if (e.key === 'Enter') {
        		$submitButton.click();
        	};
        });
    
    const $submitButton = $('<button>')
        .text('Submit')
        .on('click', function() {
        	
            const postUrl = $inputField.val();
            const postUrlPattern = /^https:\/\/([a-zA-Z0-9\-]+\.)?fandom\.com\/f\/p\/\d+(\/.*)?/;

            if (postUrlPattern.test(postUrl)) {
	            
                const postId = extractPostIdFromUrl(postUrl);
	            const wikiUrl = (new URL(postUrl)).origin;

                getFirstReplyId(postId, wikiUrl)
                    .then(function(replyId) {
                        if (replyId === null) {
                            return;
                        }

                        const href = wikiUrl + '/f/p/' + postId + '/r/' + replyId;
                        $widget.append(
                        	$('<p>').append(
	                            $('<a>')
	                            .attr('href', href)
	                            .attr('target', '_blank')
	                            .text(href)
                        	)
                        );
                    });
            } else {
                $widget.append(
                    $('<p>')
                    .text('Error: Please enter a valid post link from the fandom.com network.')
                    .css('color', 'red')
                );
            }
        });

    $widget.append($inputField, $submitButton);

})(window, jQuery, mediaWiki);