(function($, mw) {
    'use strict';
    var nsNr = mw.config.get('wgNamespaceNumber');
    if (nsNr < 0 || window.PurgeButtonsLoaded || document.getElementById('control_purge')) {
        return;
    }
    window.PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
    $(addPurgeButton);
    function purgePage() {
        var page = encodeURIComponent(mw.config.get('wgPageName'));
        $.get('/index.php?title=' + page + '&action=purge', function() {
            location.reload(true);
        });
        $('html,body').css({
            display: 'block',
            overflow: 'hidden'
        });
        $('<div style="background: url(\'/skins/common/images/ajax.gif\')'
            + 'no-repeat fixed center center white;height: 100%;left: 0;'
            + 'opacity: 0.25;position: absolute;top: 0;width: 100%;'
            + 'z-index: 1000000000;"></div>').appendTo(document.body)
            .css('height', $(window).height());
    }
    function addOasisPurgeButton() {
        $('.WikiaPageHeader > .wikia-menu-button').after('<a id="purge" '
            + 'class="wikia-button" href="javascript:void(0)" title="Purge page">Purge</a>');
    }
    function addPurgeButton() {
        switch (mw.config.get('skin')) {
            case 'monobook':
                $('#p-cactions > .pBody > ul').append('<li id="ca-purge">'
                    + '<a id="purge" href="javascript:void(0)" title="Purge page">Purge</a></li>');
                break;
            case 'oasis':
            case 'wikia':
                addOasisPurgeButton();
                $('#purge').css('margin', '3px 0 0 13px');
                break;
        }
        $('#purge').click(purgePage);
    }
}(jQuery, mediaWiki));