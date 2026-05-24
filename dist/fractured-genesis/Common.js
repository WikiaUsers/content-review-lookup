/* Any JavaScript here will be loaded for all users on every page load. */
// CREDITS TO FUNKPEDIA MODS WIKI FOR THIS JS CODE

$(function () {
    "use strict";

    // search for the history link only within actions dropdown to avoid unexpected results if layout is not as we expect
    var $actionsDropdown = $(".page-header__actions .wds-list");
    var $historyLink = $actionsDropdown.find("#ca-history");

    if (!$historyLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $historyLink.parent().remove();

    // add an icon for consistency with edit button and adjust classes for proper styling
    $historyLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-clock-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $actionsDropdown.parents(".wds-dropdown").before($historyLink);

    // support for editor views
    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $currentHistoryLink =  $('.ve-fd-header__actions > #ca-history');

        // no dropdown or history link already exists
        if (!$editorActionsDropdown.length || $currentHistoryLink.length ) {
            return;
        }

        $editorActionsDropdown.find('#ca-history').hide();
        $editorActionsDropdown.before($historyLink.clone(true));
    }
    initEditorView();
    mw.hook('wikiEditor.toolbarReady').add(initEditorView);
    mw.hook('ve.activationComplete').add(initEditorView);
});


(function() {
    'use strict';

    if (mw.config.get('wgPageName') !== 'User:SkibidiAvery') {
        return;
    }

    var videoUrl = "https://static.wikia.nocookie.net/continued-exe/images/6/6b/Actualgeniunefuckingbullshitbyavery.mp4/revision/latest?cb=20260520191207";

    var style = document.createElement('style');
    style.innerHTML = [
        '@keyframes wtfamidoing {',
        '    0% { bottom: 120%; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    25% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    43% { bottom: 490px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    60% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    72% { bottom: 240px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    82% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    90% { bottom: 95px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    95% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    98% { bottom: 35px; animation-timing-function: ease-in; }',
        '    100% { bottom: 0px; }',
        '}',
        '.fandom-infinite-bounce-video {',
        '    position: fixed !important;',
        '    z-index: 999999 !important;',
        '    width: 420px !important;',
        '    height: 236px !important;',
        '    background-color: #000000 !important;',
        '    border: none !important;',
        '    box-shadow: none !important;',
        '    overflow: hidden !important;',
        '    animation: wtfamidoing 2.5s forwards !important;',
        '    pointer-events: none !important;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    function spawnVideoInstance() {
        if (!document.body) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'fandom-infinite-bounce-video';
        
        var randomLeftPosition = Math.floor(Math.random() * 76); 
        wrapper.style.left = randomLeftPosition + '%';

        wrapper.innerHTML = '<video ' +
            'src="' + videoUrl + '" ' +
            'autoplay unmuted loop playsinline ' +
            'style="width:100% !important; height:100% !important; object-fit: contain;">' +
            '</video>';

        document.body.appendChild(wrapper);

        setTimeout(function() {
            if (wrapper && wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
        }, 202000);

        var randomDelay = Math.floor(Math.random() * 20000) + 1000;
        setTimeout(spawnVideoInstance, randomDelay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', spawnVideoInstance);
    } else {
        spawnVideoInstance();
    }
})();

(function() {
    'use strict';

    if (mw.config.get('wgPageName') !== 'User:FlorianHDFRB') {
        return;
    }

    var videoUrl = "https://static.wikia.nocookie.net/continued-exe/images/6/6b/Actualgeniunefuckingbullshitbyavery.mp4/revision/latest?cb=20260520191207";

    var style = document.createElement('style');
    style.innerHTML = [
        '@keyframes wtfamidoing {',
        '    0% { bottom: 120%; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    25% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    43% { bottom: 490px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    60% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    72% { bottom: 240px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    82% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    90% { bottom: 95px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    95% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    98% { bottom: 35px; animation-timing-function: ease-in; }',
        '    100% { bottom: 0px; }',
        '}',
        '.fandom-infinite-bounce-video {',
        '    position: fixed !important;',
        '    z-index: 999999 !important;',
        '    width: 420px !important;',
        '    height: 236px !important;',
        '    background-color: #000000 !important;',
        '    border: none !important;',
        '    box-shadow: none !important;',
        '    overflow: hidden !important;',
        '    animation: wtfamidoing 2.5s forwards !important;',
        '    pointer-events: none !important;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    function spawnVideoInstance() {
        if (!document.body) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'fandom-infinite-bounce-video';
        
        var randomLeftPosition = Math.floor(Math.random() * 76); 
        wrapper.style.left = randomLeftPosition + '%';

        wrapper.innerHTML = '<video ' +
            'src="' + videoUrl + '" ' +
            'autoplay unmuted loop playsinline ' +
            'style="width:100% !important; height:100% !important; object-fit: contain;">' +
            '</video>';

        document.body.appendChild(wrapper);

        setTimeout(function() {
            if (wrapper && wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
        }, 202000);

        var randomDelay = Math.floor(Math.random() * 20000) + 1000;
        setTimeout(spawnVideoInstance, randomDelay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', spawnVideoInstance);
    } else {
        spawnVideoInstance();
    }
})();