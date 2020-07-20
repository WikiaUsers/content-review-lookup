/* Any JavaScript here will be loaded for all users on every page load.  */

//Global Show/Hide
//Author: Princess Platinum
// http://community.wikia.com/wiki/Thread:542414
 
$(function() {
    $('#collapse-global').html('<a class="wikia-button" onclick="for (var i=0; i < 100; i++) { collapseTable([i]); }">Show/Hide All</a>');
});