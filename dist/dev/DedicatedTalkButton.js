/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

$(function () {
    'use strict';

    // search for talk link only within actions dropdown to avoid unexpected results if layout is not as we expect
    var $actionsDropdown = $('.page-header__actions .wds-list');
    var $talkLink = $actionsDropdown.find('#ca-talk');
    var editCountBrackets = /^(.+?)([(（].*?[\d ,.]+.*?[)）])$/;

    if (!$talkLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    // separate the talk edit count and hide it by default
    var labelParts = $talkLink.text().trim().match(editCountBrackets);
    var $editCount = $('<span class="dedicated-talk-button_edit-count">');
    mw.util.addCSS('.dedicated-talk-button_edit-count { display: none; padding-inline-start: 0.5ch; }');
    if (labelParts) {
        $talkLink.text(labelParts[1]);
        $editCount.text(labelParts[2]);
        $talkLink.append($editCount);
    }

    // add an icon for consistency with edit button and adjust classes for proper styling
    $talkLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-discussions-small"></use></svg>')
        .addClass('dedicated-talk-button wds-button wds-is-text page-header__action-button has-label');

    // add as first button so the edit button doesn’t shift positon
    $actionsDropdown.parents('.page-header__actions').prepend($talkLink);

    // support for editor views
    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $ourTalkLink =  $('.ve-fd-header__actions > .dedicated-talk-button');

        // no dropdown or talk link already added
        if (!$editorActionsDropdown.length || $ourTalkLink.length ) {
            return;
        }

        $editorActionsDropdown.find('#ca-talk').hide();
        $editorActionsDropdown.parents('.ve-fd-header__actions').prepend(
            $talkLink.clone(true).addClass('ve-header-action-item')
        );
    }
    initEditorView();
    mw.hook('wikiEditor.toolbarReady').add(initEditorView);
    mw.hook('ve.activationComplete').add(initEditorView);
});