/* Any JavaScript here will be loaded for all users on every page load. */

//========================================
// WikiActivity link in activity module
// By Wither
//========================================

!function() {
    var rwaLink = String("<a class='RWA_Link' href='/wiki/Special:WikiActivity'>More activity</a>");
    $(".WikiaRail .activity-module").append(rwaLink);
} ();