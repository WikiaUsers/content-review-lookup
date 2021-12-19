/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

$(function () {
    "use strict";

    // Search for talk link id only within edit dropdown to avoid unexpected results if layout is not as we expect
    var $editDropdown = $(".page-header__actions .wds-list");
    var $talkLink = $editDropdown.find("#ca-talk");

    if (!$talkLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    // remove the talk edit count from button text and add it as a tooltip instead
    var oldLabel = $talkLink.text().trim();
    var newLabel = oldLabel.replace(/[(（].*?[\d ,.]+.*?[)）]/, '');
    $talkLink.text(newLabel);
    $talkLink.attr("title", oldLabel);

    // add an icon for consistency with edit button and adjust classes for proper styling
    $talkLink
        .prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-bubble-small"></use></svg>')
        .addClass("wds-button wds-is-text page-header__action-button has-label");

    $editDropdown.parents(".wds-dropdown").before($talkLink);
});