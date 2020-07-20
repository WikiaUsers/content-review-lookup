/* Any JavaScript here will be loaded for all users on every page load. */

$("a.external, a.external.free.exitstitial").each(function() {
    $(this).attr('target', '_blank')
});