(function ($, mw) {
    if (mw.config.get('wgNamespaceNumber') !== 2000 || window.threadIndicatorLoaded) { return; }
    window.ThreadIndicator = window.ThreadIndicator || {};
    var ThreadIndicator = $.extend({
         usepics: true,
         padlockImage: 'https://images.wikia.nocookie.net/sajuuk-sandbox/images/c/c1/Padlock.png/revision/latest/scale-to-width-down/20',
         padlockTitle: 'Este tema está cerrado',
         padlockText: '(Cerrado)',
         highlightImage: 'https://images.wikia.nocookie.net/sajuuk-sandbox/images/c/ca/Highlighted.png/revision/latest/scale-to-width-down/20',
         highlightTitle: 'Este tema está destacado.',
         highlightText: '(Destacado)'
    }, window.ThreadIndicator);
    if(ThreadIndicator.usepics === true) {
           var padlock = '<img src="'+mw.html.escape(ThreadIndicator.padlockImage)+'" alt="'+mw.html.escape(ThreadIndicator.padlockText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.padlockTitle)+'" style="cursor:help;">&nbsp;';
           var highlight = '<img src="'+mw.html.escape(ThreadIndicator.highlightImage)+'" alt="'+mw.html.escape(ThreadIndicator.highlightText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.highlightTitle)+'" style="cursor:help;">&nbsp;';
    } else {
           var padlock = '<strong>'+mw.html.escape(ThreadIndicator.padlockText)+'</strong>';
           var highlight = '<strong>'+mw.html.escape(ThreadIndicator.highlightText)+'</strong>';
    }
    function update() {
        $('.ThreadList .thread').each(function() {
            var $this = $(this);
            $this.find('a').css({ 
                display: "inline",
                whiteSpace: "pre-line"
            });
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
    update();
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
    window.threadIndicatorLoaded = true;
}(jQuery, mediaWiki));