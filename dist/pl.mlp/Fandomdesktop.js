/* Rail module for custom user achievements, ported from Wikia.js with minor changes */
$(document).ready(function () {
    var badgesTpl = document.getElementById('badges');
    if ((typeof badgesTpl !== "undefined") && (badgesTpl !== null)) {
        $("#badges").addClass("module rail-module");
        $('#WikiaRail').append(badgesTpl);
    }
});