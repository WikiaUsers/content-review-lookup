/* [[DedicatedTalkButton]] - move talk page link from dropdown to beside edit button */

/*jslint browser */
/*global $, mw */

$(function () {
    "use strict";

    var $editDropdown = $(".page-header__contribution-buttons .wds-list");

    // search for talk link id only within edit dropdown to avoid unexpected results if layout is not as we expect
    var $talkLink = $editDropdown.find("#ca-talk");

    // there's not much need for prominent talk link when you're already on the talk page, so don't bother moving it
    // using a remainder check as all talk namespaces will be odd-numbered, see:
    // https://github.com/Wikia/app/blob/1e4ea22/includes/Namespace.php#L78-L87
    if (!$talkLink.length || mw.config.get("wgNamespaceNumber") % 2) {
        return;
    }

    // link is extracted from a list, so remove its parent <li> element
    $talkLink.parent().remove();

    $talkLink.addClass("wds-button wds-is-secondary");

    // whitespace is added before talk button to give equal spacing between edit and talk button, and talk and share button
    $editDropdown.parents(".wds-button-group").after(" ", $talkLink);
});