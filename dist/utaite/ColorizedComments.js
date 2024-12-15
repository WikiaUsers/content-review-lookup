(function (window, $, mw) {
    'use strict';

    function styleSpecialComments(elements) {
        elements.each(function (index, lineElement) {
            var $comments = $(lineElement).find('.cm-mw-comment');
            
            $comments.each(function (index, commentElement) {
                var $comment = $(commentElement);
                var commentText = $comment.text();
                
                // Remove any existing special classes
                $comment.removeClass('special-comment-important special-comment-tip special-comment-todo');
                
                // Check for comment start markers independently
                if (commentText.indexOf('<!--!') === 0) {
                    $comment.addClass('special-comment-important');
                } else if (commentText.indexOf('<!--?') === 0) {
                    $comment.addClass('special-comment-tip');
                } else if (commentText.indexOf('<!--TODO') === 0) {
                    $comment.addClass('special-comment-todo');
                }
            });
        });
    }

    function observeEditorChanges() {
        var cmContent = document.querySelector('.cm-content');
        if (!cmContent) {
            setTimeout(observeEditorChanges, 1000);
            return;
        }

        // Monitor focus events on the editor
        $(cmContent).on('focus blur click', function() {
            setTimeout(function() {
                styleSpecialComments($('.cm-line'));
            }, 0);
        });

        // Monitor key events for content changes
        $(cmContent).on('keyup', function() {
            styleSpecialComments($('.cm-line'));
        });

        // Regular check for style consistency
        var styleInterval = setInterval(function() {
            if ($('.cm-content').length) {
                styleSpecialComments($('.cm-line'));
            } else {
                clearInterval(styleInterval);
            }
        }, 500);

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    setTimeout(function() {
                        styleSpecialComments($('.cm-line'));
                    }, 0);
                }
            });
        });

        observer.observe(cmContent, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function initializeStyles() {
        var cmContent = $('.cm-content');
        if (cmContent.length) {
            styleSpecialComments(cmContent.find('.cm-line'));
            observeEditorChanges();
        } else {
            setTimeout(initializeStyles, 1000);
        }
    }

    // CSS styles with higher specificity
    var customCSS = 
        '.cm-content .cm-mw-comment { color: #c7c6ad !important; }' +  
        '.cm-content .cm-mw-comment.special-comment-important { color: #ff6b6b !important; font-weight: bold !important; }' +
        '.cm-content .cm-mw-comment.special-comment-tip { color: #4fc3f7 !important; font-style: italic !important; }' +
        '.cm-content .cm-mw-comment.special-comment-todo { color: #ffa726 !important; font-weight: bold !important; text-decoration: underline !important; }';

    $('<style>').text(customCSS).appendTo('head');

    // Multiple initialization points to ensure styles are applied
    mw.hook('wikipage.content').add(initializeStyles);
    $(document).ready(initializeStyles);
    
    // Additional initialization after a short delay
    setTimeout(initializeStyles, 2000);

})(this, jQuery, mediaWiki);