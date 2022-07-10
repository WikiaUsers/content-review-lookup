/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

$(function () {
    "use strict";

    // search for talk link only within actions dropdown to avoid unexpected results if layout is not as we expect
    var $actionsDropdown = $(".page-header__actions .wds-list");
    var $talkLink = $actionsDropdown.find("#ca-talk");
    var editCountBrackets = /[(（].*?[\d ,.]+.*?[)）]/;

    if (!$talkLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    // remove the talk edit count from button text and add it as a tooltip instead
    var oldLabel = $talkLink.text().trim();
    var newLabel = oldLabel.replace(editCountBrackets, '');
    $talkLink.text(newLabel);
    $talkLink.attr("title", oldLabel);

    // add an icon for consistency with edit button and adjust classes for proper styling
    $talkLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-bubble-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $actionsDropdown.parents(".wds-dropdown").before($talkLink);

    // support for editor views
    function initEditorView() {
        var $editorActionsDropdown = $('.ve-fd-header__actions > .ve-ui-pageActionsPopupButtonWidget');
        var $currentTalkLink =  $('.ve-fd-header__actions > #ca-talk');

        // no dropdown or talk link already exists
        if (!$editorActionsDropdown.length || $currentTalkLink.length ) {
            return;
        }

        $editorActionsDropdown.find('#ca-talk').hide();
        $editorActionsDropdown.before($talkLink.clone(true));
    }
    initEditorView();
    mw.hook('wikiEditor.toolbarReady').add(initEditorView);
    mw.hook('ve.activationComplete').add(initEditorView);
});