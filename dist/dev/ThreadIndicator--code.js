/**
 * Script Name: ThreadIndicator
 * Author: SuperSajuuk, slyst (code provider)
 * Last Modified: 17:21, June 9, 2016 (UTC)
 *
 * Places an indicator next to threads that
 * have been closed or highlighted in a forum
 * board.
 *
 * See the documentation page for update info
 *
 * Version: 1.0.0
 */

/* global mediaWiki */

// Main Script
(function ($, mw) {
    // Don't fire outside of namespace 2000
    // or fire more than once.
    if (mw.config.get('wgNamespaceNumber') !== 2000 || window.threadIndicatorLoaded) { return; }
 
    // Configuration options.
    window.ThreadIndicator = window.ThreadIndicator || {};
    var ThreadIndicator = $.extend({
         usepics: true,
         padlockImage: 'https://images.wikia.nocookie.net/sajuuk-sandbox/images/c/c1/Padlock.png/revision/latest/scale-to-width-down/20',
         padlockTitle: 'This thread is closed to new posts',
         padlockText: '(Locked)',
         highlightImage: 'https://images.wikia.nocookie.net/sajuuk-sandbox/images/c/ca/Highlighted.png/revision/latest/scale-to-width-down/20',
         highlightTitle: 'This thread was highlighted',
         highlightText: '(Highlighted)'
    }, window.ThreadIndicator);

    // Are we using pics or not?
    if(ThreadIndicator.usepics === true) {
           var padlock = '<img src="'+mw.html.escape(ThreadIndicator.padlockImage)+'" alt="'+mw.html.escape(ThreadIndicator.padlockText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.padlockTitle)+'" style="cursor:help;">&nbsp;';
           var highlight = '<img src="'+mw.html.escape(ThreadIndicator.highlightImage)+'" alt="'+mw.html.escape(ThreadIndicator.highlightText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.highlightTitle)+'" style="cursor:help;">&nbsp;';
    } else {
           var padlock = '<strong>'+mw.html.escape(ThreadIndicator.padlockText)+'</strong>';
           var highlight = '<strong>'+mw.html.escape(ThreadIndicator.highlightText)+'</strong>';
    }

    // Add the indicators
    function update() {
        $('.ThreadList .thread').each(function() {
            var $this = $(this);
 
            // Formatting fixes
            $this.find('a').css({ 
                display: "inline",
                whiteSpace: "pre-line"
            });
 
            // With many thanks to [[w:User:Cqm]]!
            $.get(mw.util.wikiScript('wikia'), {
                controller: 'Forum',
                method: 'brickHeader',
                id: $this.data('id'),
                format: 'json'
            }, function(data) {
                if (data.isClosed) {
                    $this.find('h4 > a').before(padlock);
                }
                if (data.isNotifyeveryone) {
                    $this.find('h4 > a').before(highlight);
                }
            });
        });
    }
 
    // Run it!
    update();
 
    // I am a mutation.
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutations.removedNodes.length) {
                update();
            }
        });
    });
    observer.observe($('.ThreadList')[0], {
        childList: true
    });

    // Doesn't need to load multiple times.
    window.threadIndicatorLoaded = true;
}(jQuery, mediaWiki));