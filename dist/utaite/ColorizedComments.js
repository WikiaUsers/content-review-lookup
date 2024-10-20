(function (window, $, mw) {
    'use strict';

    function styleSpecialComments(elements) {
	    var isInMultilineComment = false;
	    var currentCommentClass = '';
	
	    elements.each(function (index, lineElement) {
	        $(lineElement).find('.cm-mw-comment').each(function (index, commentElement) {
	            var commentText = $(commentElement).text();
	
	            if (!isInMultilineComment && 
	                !$(commentElement).hasClass('special-comment-important') &&
	                !$(commentElement).hasClass('special-comment-tip') &&
	                !$(commentElement).hasClass('special-comment-todo')) {
	                
	                if (commentText.indexOf('<!--!') === 0) {
	                    $(commentElement).addClass('special-comment-important');
	                    isInMultilineComment = true;
	                    currentCommentClass = 'special-comment-important';
	                } else if (commentText.indexOf('<!--?') === 0) {
	                    $(commentElement).addClass('special-comment-tip');
	                    isInMultilineComment = true;
	                    currentCommentClass = 'special-comment-tip';
	                } else if (commentText.indexOf('<!--TODO') === 0) {
	                    $(commentElement).addClass('special-comment-todo');
	                    isInMultilineComment = true;
	                    currentCommentClass = 'special-comment-todo';
	                }
	            } 
	
	            if (isInMultilineComment) {
	                if (commentText.indexOf('-->') !== -1) {
	                    $(commentElement).addClass(currentCommentClass);
	                    isInMultilineComment = false;
	                    currentCommentClass = '';
	                } else {
	                    $(commentElement).addClass(currentCommentClass);
	                }
	            }
	        });
	    });
	}


    function observeEditorChanges() {
        var cmContent = document.querySelector('.cm-content');
        if (!cmContent) {
            //console.log("Error: .cm-content element not found");
            return;
        }

        var observer = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    //console.log("New nodes detected in mutation: ", mutation);
                    var newLines = $(mutation.addedNodes).filter('.cm-line');
                    if (newLines.length) {
                        styleSpecialComments(newLines);
                    }
                }
            });
        });

        observer.observe(cmContent, { childList: true, subtree: true });
    	//console.log("MutationObserver attached to CodeMirror content.");
    }

    function reapplyStyles() {
        var allLines = $('.cm-content .cm-line');
        if (allLines.length) {
            styleSpecialComments(allLines);
        }
    }

    function hookIntoCodeMirror() {
        var cmContent = $('.cm-content');

        if (cmContent.length) {
            //console.log("CodeMirror content found, applying styles to comments");
			styleSpecialComments(cmContent.find('.cm-line'));
            observeEditorChanges();
            setInterval(reapplyStyles, 1000);
        } else {
            //console.log("CodeMirror content not found yet, retrying...");
            setTimeout(hookIntoCodeMirror, 1000);
        }
    }

    var customCSS = 
        'body[data-theme="dark"] .cm-mw-comment { color: #c7c6ad; }' +  
        'body[data-theme="dark"] .cm-mw-comment.special-comment-important { color: #ff6b6b; font-weight: bold; }' +
	    'body[data-theme="dark"] .cm-mw-comment.special-comment-tip { color: #4fc3f7; font-style: italic; }' +
	    'body[data-theme="dark"] .cm-mw-comment.special-comment-todo { color: #ffa726; font-weight: bold; text-decoration: underline; }';

    $('<style>').text(customCSS).appendTo('head');

    mw.hook('wikipage.content').add(function() {
		//console.log("wikipage.content hook triggered, waiting for CodeMirror content");
        hookIntoCodeMirror();
    });

})(this, jQuery, mediaWiki);