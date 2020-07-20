if (mediaWiki.config.get('wgNamespaceNumber') === 0 && mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') {
    $(function() {
        var tpbutton = document.createElement("a");
        tpbutton.setAttribute("accesskey", "t");
        tpbutton.setAttribute("href", wgServer + "/wiki/Talk:" + wgPageName);
        tpbutton.setAttribute("class", "wikia-button secondary talk");
        tpbutton.setAttribute("rel", "nofollow");
        tpbutton.setAttribute("data-id", "comment");
        tpbutton.innerHTML = "Thảo luận (có Spoil)";
        $(tpbutton).insertAfter(".comments");
    });
}