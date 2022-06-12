(function () {
    if (window.RevealAnonIPLoaded ||
        (
            !mw.config.get('profileIsMessageWallPage') &&
            !mw.config.get('articleHasCommentingEnabled')
        )
    ) {
        return;
    }
    window.RevealAnonIPLoaded = true;
    var parentId = mw.config.get('articleHasCommentingEnabled') ? 'articleComments' : 'MessageWall';

    function showIPs () {
    	//IP comments/messages have a `title` attribute, whereas user comments/messages don't, might be better to use `mw.util.isIPAddress` rather than rely on a quirk/bug/something of Fandom
        $('#' + parentId + ' a[class^="EntityHeader_name__"][title]').each(function () {
			$(this).text($(this).attr('title'));
            $(this).removeAttr('title');
        });
    }

    new MutationObserver(showIPs).observe(document.getElementById(parentId), {
        subtree: true,
        childList: true
    });

    showIPs();
})();