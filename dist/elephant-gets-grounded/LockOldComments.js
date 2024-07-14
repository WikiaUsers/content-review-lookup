(function lockOldComments(window, $, mw) {

	"use strict";

	window.lockOldComments = window.lockOldComments || {};
	if (window.lockOldComments.loaded) return;
	window.lockOldComments.loaded = true;

	var config = mw.config.get([
		'wgTitle',
		'wgNamespaceNumber'
		]);

	if ( [0, 500].indexOf(config.wgNamespaceNumber) < 0 ) return;

	// A careful selector instead of document.getElementById which can be
	// fooled with an id in the page content.
	// The element matching this selector is part of the original HTML,
	// so it should be safe to check for it just once.
	var commentSection = document.querySelector(
		'.page-footer > #mw-data-after-content > #articleComments');

	if (!commentSection) return;

	var apiURL, // = mw.util.wikiScript('wikia'), once mw.util is loaded
		apiParams = {
	        controller: 'ArticleCommentsController',
	        method: 'getComments',
	        title: config.wgTitle,
	        namespace: config.wgNamespaceNumber,
	        page: 0
	    },
		apiParamsOneThread = {
	        controller: 'ArticleCommentsController',
	        method: 'getThread',
	        title: config.wgTitle,
	        namespace: config.wgNamespaceNumber,
	    },
	    threads = {},
	    // Default is 20 days old
	    daysLimit = window.lockOldComments.limit || 20,
	    limit = (new Date()).valueOf() - (daysLimit * 86400000), // ms in a day
	    addNoteAbove = window.lockOldComments.addNoteAbove,
		observer,
		getComments,
		i18n,
		waitingMessages = [];

	function addMsg(e, msg, arg) {
		var $e = $(e);

		if (i18n) {
			$e.text(i18n.msg(msg, arg).parse());
		} else {
			waitingMessages.push( {e: e, msg: msg, arg: arg} );
		}

		return e; // returning the element to allow easier further actions
	}

	function init_i18n(ref) {
		var i, m;

		i18n = ref;

		for (i = 0; i < waitingMessages.length; i++) {
			m = waitingMessages[i];
			addMsg(m.e, m.msg, m.arg);
		}
	}

	// Gets a comment wrapper
	// Locks the reply box, adds a locking message and a class
	// On first call adds an above-note unless above-note is cancelled
	// Does not check the comment age - this have to be checked before calling
	function lockBox(target) {
		$(target)
		.addClass('LockOldComments-locked')
		.find('[class*="FormEntryPoint_form-entry-point__"]')
			.after(
				addMsg(
					$('<div>'),
					'locked-reply-box',
					[daysLimit])
				)
			.css("display", "none");

		if (addNoteAbove) {
			$(target).before(
				($('<div>')
					.addClass('LockOldComments-above')
					.css({
						padding: '12px',
						'text-align': 'center',
						color: 'var(--theme-alert-color)'
					})
					.append(addMsg(
						$('<strong>'),
						'above-first-locked-comment',
						daysLimit)
					)
				)
			);
			addNoteAbove = false;
		}
	}

	// Gets a collection of comment wrappers
	// Checks the comments' age and locks the old ones
	function lock(target) {

		$(target).each(function() {

			var $this = $(this), // Also used to preserve "this"
			    id = $this.attr('data-thread-id'),
			    time;

			if (!id) return;
			time = threads[id];
			if (time) {
				if ( time < limit ) {
					lockBox($this);
				}
			} else {
				apiParamsOneThread.threadId = id;
				$.getJSON(apiURL, apiParamsOneThread, function(data) {
					try {
						if (data.thread.creationDate.epochSecond * 1000 < limit) {
							lockBox($this);
						}
					} catch (e) {
						// Failed to check this thread, just continue
					}
				});
			}
		});
	}

	// A callback function for the mutations observer
	// Checks for new comment wrappers and send them to lock()
	function checkAddedNodes(mutations) {
		var i,
		    addedComments = [],
		    a, b, c, d;

		function findComments()  {

			// (No strict mode violation here, 'this' is passed by .each() )
			var $this = $(this);

            if (($this.attr('class') || '').indexOf('Comment_wrapper__') !== -1) {
                addedComments.push(this);
            } else if ($this.is(
            	'.article-comments-app, [class*="CommentList_comment-list__"]')) {
                addedComments = addedComments.concat(
                	$this.find('[class*="Comment_wrapper__"]').toArray());
            }
        }

        for (i = 0; i < mutations.length; i++) {
            $(mutations[i].addedNodes).each(findComments);
        }

        a = addedComments.length;

        if (a === 1) { // Probably a one-thread view
        	lock(addedComments);
        } else if (a) { // Retrive more comment threads if needed
        	b = Object.keys(threads).length;
        	c = b + a; // max amount of comment threads we need for now

        	getComments().done(function more() {
        		d = b;
        		b = Object.keys(threads).length;

        		// If new information has been successfully loaded, and it is
        		// still less than the number needed, get more.
        		if (b > d && b < c) {
        			getComments().done(more).fail(function() { lock(addedComments); });
        		} else {
        			lock(addedComments);
        		}
        	}).fail(function() { lock(addedComments); });
        }
	}

	function init() {

		apiURL = mw.util.wikiScript('wikia');

		// (No strict mode violation here because 'this' is only needed to make
		// the .bind() method happy)
		getComments = $.getJSON.bind(this, apiURL, apiParams, function(data) {
		    var i;

		    apiParams.page = apiParams.page + 1;

		    if (!data.threads) return NaN;
		    for (i = 0; i < data.threads.length; i++) {
		        try {
		            threads[data.threads[i].id] = data.threads[i].creationDate.epochSecond * 1000;
		        } catch(e) {
		            // Just continue
		        }
		    }
		});

		// Get one bunch of comments information - same as is supposed to load
		// on the page.
		// Then start observing for new comments and call lock() for any
		// comments that are already laoded.
		getComments().done(function() {
			observer = new MutationObserver(checkAddedNodes);
			observer.observe(commentSection, { childList: true, subtree: true });

			lock($(commentSection).find('[class*="Comment_wrapper__"]'));
		});

	}

	importArticle({type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js'});
	mw.hook('dev.i18n').add(function(ref) {
		ref.loadMessages('LockOldComments').done(init_i18n);
	});
	mw.loader.using('mediawiki.util').then(init);

})(window, jQuery, mediaWiki);