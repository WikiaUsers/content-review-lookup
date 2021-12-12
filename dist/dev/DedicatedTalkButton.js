/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

/* jslint browser */
/* global $, mw */

$(function () {
    "use strict";
    
    // Add a variable to prevent redundant checking for the optional look
    var settings = window.dedicatedTalkButton || {};
    
    // "_actions" for fandomdesktop
    var $editDropdown = $(".page-header__actions .wds-list");

    // Search for talk link id only within edit dropdown to avoid unexpected results if layout is not as we expect
    var $talkLink = $editDropdown.find("#ca-talk");

    if (!$talkLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    $talkLink.removeClass("new").addClass("wds-button wds-is-text page-header__action-button has-label");

    if (settings.hideCount) {
        var oldLabel = $talkLink.text();
        var newLabel = oldLabel.replace(/[(（].*?[\d ,.]+.*?[)）]/, '').trim();
        $talkLink.text(newLabel);
    }

    if (settings.showIcon) {
        $talkLink.prepend('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-bubble-small"></use></svg>');
    }

    $editDropdown.parents(".wds-dropdown").before($talkLink);
});