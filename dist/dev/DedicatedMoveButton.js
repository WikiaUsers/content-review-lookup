$(function () {
    "use strict";

    var $actionsDropdown = $(".page-header__actions .wds-list");
    var $moveLink = $actionsDropdown.find("#ca-move");

    if (!$moveLink.length) {
        return;
    }

    $moveLink.parent().remove();

    $moveLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-arrow-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $actionsDropdown.parents(".wds-dropdown").before($moveLink);

    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $currentMoveLink =  $('.ve-fd-header__actions > #ca-move');

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