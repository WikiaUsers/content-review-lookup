/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

/*jslint browser */
/*global $, mw */

$(function () {
    "use strict";

    // "_actions" for fandomdesktop, "_contribution-buttons" for oasis
    var $editDropdown = $(".page-header__actions .wds-list, .page-header__contribution-buttons .wds-list");

    // search for talk link id only within edit dropdown to avoid unexpected results if layout is not as we expect
    var $talkLink = $editDropdown.find("#ca-talk");

    if (!$talkLink.length) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    $talkLink.removeClass("new").addClass("wds-button wds-is-text page-header__action-button has-label");

    if (mw.config.get("skin") === "oasis") {
        $talkLink.removeClass("wds-is-text").addClass("wds-is-secondary");

        // whitespace is added before talk button to give equal spacing between edit and talk button, and talk and share button
        $editDropdown.parents(".wds-button-group").after(" ", $talkLink);

        return;
    }

    $editDropdown.parents(".wds-dropdown").before($talkLink);
});