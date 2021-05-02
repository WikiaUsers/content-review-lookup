(function lockOldComments(window, $, mw) {

	if (window.lockOldComments) {
		if (window.lockOldComments.loaded) {
			return;
		} else {
			lockOldComments.loaded = true;
		}
	} else {
		window.lockOldComments = { loaded: true };
	}

	if ( [0, 500].indexOf(mw.config.get('wgNamespaceNumber')) < 0 ) { return; }

	// A careful selector instead of document.getElementById which can be
	// fooled with an id in the page content. 
	// The element matching this selector is part of the original HTML,
	// so it should be safe to check for it just once.
	var commentSectionSelector =
	        '#WikiaMainContentContainer > #mw-data-after-content > #articleComments',
		commentSection = document.querySelector(commentSectionSelector);
	if (!commentSection) { return; }

	// Default is 60 days old
	var limit = (new Date()).valueOf() - 
	        ((window.lockOldComments.limit || 60) * 86400000),
		observer;

	function lock(target) {

		$(target).each(function() {

			var time = $(this).find('.Comment_comment__sASOd time')
				.attr('datetime')
				.split(',')[0]
				.split('.');

			if ( (new Date(time[2], time[1] - 1, time[0])).valueOf() < limit ) {
				$(this).find('.ReplyCreate_reply-create___qNuJ').remove();
			}
		});		
	}

	function checkAddedNodes(mutations) {
		var i, comments = [];

        for (i = 0; i < mutations.length; i++) {
            $(mutations[i].addedNodes).each(function() {
                var $this = $(this);
                if ($this.hasClass('Comment_wrapper__2mxBn')) {
                    comments.push(this);
                } else if (
                	['article-comments-app', 'CommentList_comment-list__2eFaY']
                	.indexOf($this.attr('class')) >= 0) {
                    comments = comments.concat(
                    	$this.find('.Comment_wrapper__2mxBn').toArray());
                }
            });
        }
        if (comments.length) {
            lock(comments);
        }
	}

	observer = new MutationObserver(checkAddedNodes);
	observer.observe(commentSection, { childList: true, subtree: true });

	lock($(commentSection).find('.Comment_wrapper__2mxBn'));

})(window, jQuery, mediaWiki);