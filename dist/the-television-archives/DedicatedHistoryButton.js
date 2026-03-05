// Allows to create dedicated history button near to the edit dropdown menu
// credit for this script goes to BaRaN6161TURK and LordShaojiVIII

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