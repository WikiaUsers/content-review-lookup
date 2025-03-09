/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 21;
window.lockOldComments.addNoteAbove = true;
window.BackToTopModern = true;

/* By: user:gronox CUSTOM Gallery uploading fish mutations button */
importScript('MediaWiki:UploadMutationsImage.js');

/* RailModule and custom button  */
importScript('MediaWiki:RailModuleMoreLink.js');

/* Load  Custom Collapse and Expand content | Wiki discuss page  */
importScript('MediaWiki:CustomCollapseExpand.js');

 /* Fishing Rods and all Fish page mutatiin galery */
importScript('MediaWiki:Collapsible.js');

  /* Rod Skins Page Custom collapse */
importScript('MediaWiki:RodSkinsCustomCollapse.js');

  /* Weekly Top Contributors */
importScript('MediaWiki:TopContributors.js');

  /* CircleAvatar Template Handler */
importScript('MediaWiki:CircleAvatar.js');

  /* Custom Navigation Icons */
importScript('MediaWiki:CustomNavigationIcons.js');

 /* Custom Comments block admindashboard */
importScript('MediaWiki:CommentsBlock.js');

  /* Enhanced Seasons Countdown Timer */
importScript('MediaWiki:Seasons.js');

  /* Load HourChange code*/
importScript('MediaWiki:HourChange.js');

  /* WDS Icons https://fandomdesignsystem.com */
importScript('MediaWiki:WDSIcon.js');

/* custom statistic - dont work 
importScript('MediaWiki:ViewStats.js'); 
*/

/* Main Page custom Discord button */
$(document).ready(function() {
    var currentPath = window.location.pathname;
    if (currentPath === '/wiki/Fisch_Wiki') {
        var discordButton = document.createElement('div');
        discordButton.className = 'page-header__discord-button';
        
        var discordIcon = document.createElement('div');
        discordIcon.className = 'discord-icon';
        
        var iconPath = 'Special:Redirect/file/Discord_Icon.png';
        var iconUrl = mw.config.get('wgArticlePath').replace('$1', iconPath);
        discordIcon.style.backgroundImage = 'url(' + iconUrl + ')';
        discordIcon.style.backgroundRepeat = 'no-repeat';
        discordIcon.style.backgroundPosition = 'center';
        discordIcon.style.backgroundSize = '80px 80px';
        
        discordButton.appendChild(discordIcon);
        
        var titleWrapper = document.getElementsByClassName('page-header__title-wrapper')[0];
        if (titleWrapper) {
            titleWrapper.appendChild(discordButton);
        }
        
        if (discordButton) {
            discordButton.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'https://discord.gg/7fFExCqCqC';
            };
        }
    }
});
/* Footer | Fandom Staff, please accept js code :C */