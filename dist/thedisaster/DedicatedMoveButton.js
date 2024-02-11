// Allows to create dedicated move button near to the edit dropdown menu

$(function () {
    "use strict";

    // search for the move link only within actions dropdown to avoid unexpected results if layout is not as we expect
    var $actionsDropdown = $(".page-header__actions .wds-list");
    var $moveLink = $actionsDropdown.find("#ca-move");

    if (!$moveLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $moveLink.parent().remove();

    // add an icon for consistency with edit button and adjust classes for proper styling
    $moveLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-arrow-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $actionsDropdown.parents(".wds-dropdown").before($moveLink);

    // support for editor views
    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $currentMoveLink =  $('.ve-fd-header__actions > #ca-move');

        // no dropdown or move link already exists
        if (!$editorActionsDropdown.length || $currentMoveLink.length ) {
            return;
        }

        $editorActionsDropdown.find('#ca-move').hide();
        $editorActionsDropdown.before($moveLink.clone(true));
    }
    initEditorView();
    mw.hook('wikiEditor.toolbarReady').add(initEditorView);
    mw.hook('ve.activationComplete').add(initEditorView);
});