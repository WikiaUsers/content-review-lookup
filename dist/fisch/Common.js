/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 21;
window.lockOldComments.addNoteAbove = true;

/* Load  Custom Collapse and Expand content | Wiki discuss page  */
importScript('MediaWiki:CustomCollapseExpand.js');

 /* Fishing Rods and all Fish page mutatiin galery */
importScript('MediaWiki:Collapsible.js');

  /* Weekly Top Contributors */
importScript('MediaWiki:TopContributors.js');

  /* CircleAvatar Template Handler */
importScript('MediaWiki:CircleAvatar.js');

  /* Custom Navigation Icons */
importScript('MediaWiki:CustomNavigationIcons.js');

  /* Enhanced Seasons Countdown Timer */
importScript('MediaWiki:Seasons.js');

  /* Load HourChange code*/
importScript('MediaWiki:HourChange.js');


  /* Main Page custom top right discrod button */
$(document).ready(function() {
    if (window.location.pathname === '/wiki/Fisch_Wiki') {
        $('#p-views').html('<div class="discord-icon"></div>').on('click', function() {
            window.location.href = 'https://discord.gg/7fFExCqCqC';
        });
    }
});