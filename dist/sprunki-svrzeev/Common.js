(function(window, $, mw) {
    // Prevent double execution
    if (window.HecerStylingLoaded) return;
    window.HecerStylingLoaded = true;

    var targetWord = "Hecer";
    var targetPageName = "Hecer";
    var gradientStyle = 'display: inline-block; background: linear-gradient(to right, #ff8c00, #ff0000, #00ff00, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;';
    var regex = new RegExp('\\b(' + targetWord + ')\\b', 'g');

    function forceHecerStyle() {
        var currentPage = (mw.config.get('wgPageName') || '').replace(/_/g, ' ');
        var isSelfPage = (currentPage.toLowerCase() === targetPageName.toLowerCase());

        // Target Fandom's main article bodies
        $('.mw-parser-output, #mw-content-text, .page-content').each(function() {
            
            // 1. Style any existing hard links
            $(this).find('a').each(function() {
                var $link = $(this);
                var text = $link.text();
                if (text.indexOf(targetWord) !== -1 && !$link.hasClass('hecer-styled')) {
                    $link.addClass('hecer-styled');
                    $link.html(text.replace(regex, '<span style="' + gradientStyle + '">$1</span>'));
                    if (isSelfPage) {
                        $link.css({'pointer-events': 'none', 'cursor': 'default', 'text-decoration': 'none'}).removeAttr('href');
                    }
                }
            });

            // 2. Scan every text-containing element
            $(this).find('p, li, span, td, th, h1, h2, h3, div').each(function() {
                if (/(script|style|textarea|a)/i.test(this.tagName)) return;
                
                var nodes = this.childNodes;
                for (var i = nodes.length - 1; i >= 0; i--) {
                    var node = nodes[i];
                    if (node.nodeType === 3 && node.data.indexOf(targetWord) !== -1) {
                        var span = document.createElement('span');
                        if (isSelfPage) {
                            span.innerHTML = node.data.replace(regex, '<span style="' + gradientStyle + '">$1</span>');
                        } else {
                            var targetUrl = mw.util.getUrl(targetPageName);
                            span.innerHTML = node.data.replace(regex, '<a href="' + targetUrl + '" style="text-decoration: none;"><span style="' + gradientStyle + '">$1</span></a>');
                        }
                        node.parentNode.replaceChild(span, node);
                    }
                }
            });

        });
    }

    // Run instantly
    $(document).ready(forceHecerStyle);
    
    // Run via Fandom layout change hooks
    mw.hook('wikipage.content').add(forceHecerStyle);

    // Continuous loop to override Fandom's aggressive cache/lazy loading
    setInterval(forceHecerStyle, 1000);

})(window, window.jQuery, window.mediaWiki);