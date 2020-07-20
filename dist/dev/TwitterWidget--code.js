//<syntaxhighlight lang=javascript>
/**
 * Twitter Widget - A small utility for adding Twitter widgets
 *
 * @Author(s): [[User:Shining-Armor]] [[User:Deadcoder]]
 */

/**
 * <div class="twitter-embed-widget">
 *     <span style="display:none;" class="twitter-name">{{{1|}}}</span>
 *     <span style="display:none;" class="twitter-code">{{{2|}}}</span>
 *     <div class="twitter-widget-container">Loading...</div>
 * </div>
 */

$(function () {
    var widgets = $('.twitter-embed-widget');
    
    $(widgets).each(function() {
        var name = $(this).find('.twitter-name')[0].textContent,
            code = $(this).find('.twitter-code')[0].textContent;
        
        var node = document.createElement('a');
            node.setAttribute('class', 'twitter-timeline');
            node.setAttribute('href', 'https://twitter.com/' + mw.html.escape(name));
            node.setAttribute('data-widget-id', mw.html.escape(code));
            node.textContent = 'Tweets by @' + mw.html.escape(name);
        
        $(this).find('.twitter-widget-container')[0].textContent = '';
        $(this).find('.twitter-widget-container')[0].appendChild(node);
    });
    
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
});
//</syntaxhighlight>