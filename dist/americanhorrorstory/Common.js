
/* JS extension configuration */
AddTalkButtonText = 'Talk';
ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Standard_Edit_Summary.js configuration */
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};

/* SocialMediaButtons configuration */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	userLang: "true"
};

// Theme customization from 9pm to 6am
$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' night';
 } 
 else if (d.getHours() > 21) {
  document.body.className += ' night';
 }
});

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'SQFWNZw',
    prependToRail: false
};