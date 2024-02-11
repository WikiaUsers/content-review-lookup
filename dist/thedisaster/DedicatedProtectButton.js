// Allows to create dedicated protect button near to the edit dropdown menu

$(function () {
    "use strict";

    // search for the protect link only within actions dropdown to avoid unexpected results if layout is not as we expect
    var $actionsDropdown = $(".page-header__actions .wds-list");
    var $protectLink = $actionsDropdown.find("#ca-protect");

    if (!$protectLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $protectLink.parent().remove();

    // add an icon for consistency with edit button and adjust classes for proper styling
    $protectLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-lock-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $actionsDropdown.parents(".wds-dropdown").before($protectLink);

    // support for editor views
    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $currentProtectLink =  $('.ve-fd-header__actions > #ca-protect');

        // no dropdown or protect link already exists
        if (!$editorActionsDropdown.length || $currentProtectLink.length ) {
            return;
        }

        $editorActionsDropdown.find('#ca-protect').hide();
        $editorActionsDropdown.before($protectLink.clone(true));
    }
    initEditorView();
    mw.hook('wikiEditor.toolbarReady').add(initEditorView);
    mw.hook('ve.activationComplete').add(initEditorView);
});