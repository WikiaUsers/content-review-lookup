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
        var list = $('#' + parentId + ' a[class^="EntityHeader_name__"][title]');

        list.each(function () {
            var title = $(this).attr('title');
            if (!title) {
                return;
            }

            $(this).removeAttr('title');
            $(this).text(title);
        });
    }

    new MutationObserver(showIPs).observe(document.getElementById(parentId), {
        subtree: true,
        childList: true
    });

    showIPs();
})();