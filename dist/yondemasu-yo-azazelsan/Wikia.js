/* Make Talk Button Appear */
if (mw.config.get("wgNamespaceNumber") == 0) {
        $(function(){
        var tpbutton = document.createElement("a");
        tpbutton.setAttribute("accesskey", "t");
        tpbutton.setAttribute("href", wgServer + "/wiki/Talk:" + wgPageName);
        tpbutton.setAttribute("class", "wikia-button secondary talk");
        tpbutton.setAttribute("rel", "nofollow");
        tpbutton.setAttribute("data-id", "comment");
        tpbutton.innerHTML = "Talk";
        $(tpbutton).insertAfter(".comments");
        });
}
 
/* Make Forum Talk Button Appear */
(function($, mw) {
    var title = mw.config.get('wgTitle'), numcomments = 0;
 
    if (mw.config.get('wgPageName').substring(0, 6) === 'Forum:') {
        $('#WikiaPageHeader .wikia-menu-button').after(
          '<a class="wikia-button comments secondary talk" href="/wiki/" ' + 
          'data-id="comment"> Talk<span class="commentsbubble"></span></a>'
        );
        $('a.talk').attr('href', '/wiki/Forum talk:' + title);
        $.getJSON('/api.php?action=query&prop=revisions&titles=Forum talk:' + 
          title + '&rvlimit=max&format=json', function(data) {
            for (var pageID in data.query.pages) break;
            if (data.query.pages[pageID].revisions) {
                numcomments = data.query.pages[pageID].revisions.length;
            }
            $('.talk .commentsbubble').text(numcomments);
        });
    }
}(jQuery, mediaWiki));