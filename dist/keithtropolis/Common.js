/* Any JavaScript here will be loaded for all users on every page load. */

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});