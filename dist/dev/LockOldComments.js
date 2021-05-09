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

	var config = mw.config.get([
		'wgTitle',
		'wgNamespaceNumber'
		]);
		
	if ( [0, 500].indexOf(config.wgNamespaceNumber) < 0 ) { return; }

	// A careful selector instead of document.getElementById which can be
	// fooled with an id in the page content. 
	// The element matching this selector is part of the original HTML,
	// so it should be safe to check for it just once.
	var commentSection = document.querySelector(
			'#WikiaMainContentContainer > #mw-data-after-content > #articleComments');

	if (!commentSection) { return; }

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
	    // Default is 60 days old
	    daysLimit = window.lockOldComments.limit || 60,
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

	function lockBox(target) {
		$(target)
		.addClass('LockOldComments-locked')
		.find('.FormEntryPoint_form-entry-point__1Ohw9')
			.after(
				addMsg(
					$('<div>'),
					'locked-reply-box',
					[daysLimit])
				)
			.remove();
			
		if (addNoteAbove) {
			$(target).before(
				($('<div>')
					.addClass('LockOldComments-above')
					.css({
						padding: '12px',
						'text-align': 'center',
						color: 'var(--theme-warning-color)'
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
	
	function lock(target) {

		$(target).each(function() {

			var $this = $(this), // Also used to preserve "this"
			    id = $this.attr('data-thread-id'),
			    time;
			
			if (!id) { return; }
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

	function checkAddedNodes(mutations) {
		var i,
		    addedComments = [],
		    a, b, c, d;
		    
		function findComments()  {
			
			var $this = $(this);

            if ($this.hasClass('Comment_wrapper__2mxBn')) {
                addedComments.push(this);
            } else if (
            	['article-comments-app', 'CommentList_comment-list__2eFaY']
            	.indexOf($this.attr('class')) >= 0) {
                addedComments = addedComments.concat(
                	$this.find('.Comment_wrapper__2mxBn').toArray());
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

        	do {
        		d = b;
        		apiParams.page = apiParams.page + 1;
        		getComments();
        		b = Object.keys(threads).length;
        	} while (b > d && b < c);

            lock(addedComments);
        }
	}
	
	function init() {
		
		apiURL = mw.util.wikiScript('wikia');
		getComments = $.getJSON.bind(this, apiURL, apiParams, function(data) {
		    var i;
		
		    if (!data.threads) { return NaN; }
		    for (i = 0; i < data.threads.length; i++) {
		        try {
		            threads[data.threads[i].id] = data.threads[i].creationDate.epochSecond * 1000;
		        } catch(e) {
		            // Just continue
		        }
		    }
		});
		getComments(); // get one bunch anyway

		observer = new MutationObserver(checkAddedNodes);
		observer.observe(commentSection, { childList: true, subtree: true });
	
		lock($(commentSection).find('.Comment_wrapper__2mxBn'));
			
	}
	
	importArticle({type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js'});
	mw.hook('dev.i18n').add(function(ref) {
		ref.loadMessages('LockOldComments').done(init_i18n);
	});
	mw.loader.using('mediawiki.util').then(init);

})(window, jQuery, mediaWiki);