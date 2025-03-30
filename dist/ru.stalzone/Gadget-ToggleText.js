;(function($, mw) {
    'use strict';

    if (window.customToggleTextInitialized) {
        return;
    }
    window.customToggleTextInitialized = true;

    var prefixOpen = 'Свернуть таблицу';
    var prefixClosed = 'Развернуть таблицу';

    function updateToggleButtonText($toggleButton, $collapsibleElement, baseText) {
        var currentPrefix = $collapsibleElement.hasClass('mw-collapsed') ? prefixClosed : prefixOpen;
        var newText = currentPrefix + ' ' + baseText.replace(prefixOpen + ' ', '').replace(prefixClosed + ' ', '');
        $toggleButton.text(newText);
    }

    function initToggleText() {
        $('[class*="mw-customtoggle-"]').each(function() {
            var $toggleButton = $(this);
            var toggleIdMatch = this.className.match(/mw-customtoggle-([\w-]+)/);

            if (toggleIdMatch && toggleIdMatch[1]) {
                var collapsibleId = 'mw-customcollapsible-' + toggleIdMatch[1];
                var $collapsibleElement = $('#' + collapsibleId);

                if ($collapsibleElement.length > 0) {
                    var baseText = $toggleButton.data('base-text');
                    if (baseText === undefined) {
                         baseText = $toggleButton.text().trim();
                         $toggleButton.data('base-text', baseText);
                    }

                    updateToggleButtonText($toggleButton, $collapsibleElement, baseText);

                    $toggleButton.off('click.toggleText').on('click.toggleText', function() {
                        var currentBaseText = $toggleButton.data('base-text');
                        setTimeout(function() {
                            updateToggleButtonText($toggleButton, $collapsibleElement, currentBaseText);
                        }, 0);
                    });
                }
            }
        });
    }

    mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util']).then(function() {
        $(initToggleText);
        mw.hook('wikipage.content').add(initToggleText);
    });

}(jQuery, mediaWiki));