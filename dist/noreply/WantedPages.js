//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/* 
 * Shows WhatLinksHere under each link in WantedPages, for cleanup purposes.
 * @author: Noreplyz
 */
/*global mediaWiki */
;(function($, mw) { 
    if (wgCanonicalSpecialPageName !== 'Wantedpages') {
        return;
    }
    $(".special li .new").each(function (index) { 
        var thisItem = this;
        $.getJSON("/api.php?action=query&format=json&list=backlinks&bltitle=" + encodeURI($( this ).text()), function (json) {
            var fulltext = '';
            fulltext = '<br/>';
            for (var j = 0; j < json["query"]["backlinks"].length; j++) {
                var backlink = encodeURI(json["query"]["backlinks"][j]["title"]);
                fulltext = fulltext + '<a href="/'+backlink+'">'+decodeURI(backlink)+'</a>' + '<br/>' ;
                console.log(fulltext);
            }
            $(thisItem).after(fulltext);
        });
    });
})(this.jQuery, this.mediaWiki);
//</syntaxhighlight>