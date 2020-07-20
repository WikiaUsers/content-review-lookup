/* Any JavaScript here will be loaded for all users on every page load. */

// The Mapping Wiki
// Common.js

// == Dev Wiki Script Configurations ==

// === AjaxRC ===

window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh dynamically via AJAX';
AjaxRCRefreshHoverText = 'Automatically dynamically refreshes/updates the page';

// === ProfileTags ===

// Enables default tags (Admin, Bot, Blocked, etc.)
window.dev = (window.dev || {});
window.dev.profileTags = { noHideTags: true };

// === AbuseLogRC ===
abuseLogRC_position = 'after';