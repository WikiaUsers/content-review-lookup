// Ajax auto-refresh
/* Options */
ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles'];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refresh the page';
/* Script */
importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
     type: 'script',
     articles: [
         'u:dev:MediaWiki:WikiActivity.js',
     ] 
    });
// END of Ajax auto-refresh

// ** Local scripts **
Common.js/cookie.js
Common.js/customButtons.js
Common.js/elementClass.js
Common.js/forumArchiveDisable.js‎
Common.js/navFrame.js
Common.js/slider2.js
Common.js/togglers.js
Common.js/upload.js
// ** Imports **
dev:AbuseLogRC.js
dev:AddRailModule/code.js
dev:AjaxRC/code.js
dev:ArchiveTool/code.js
dev:DiscussionsLink/code.js
dev:DisplayClock/code.js
dev:DupImageList/code.js
dev:ExternalImageLoader/code.js
dev:FileUsageAuto-update/code.js
dev:LockOldBlogs/code.js
dev:PreloadTemplates.js
dev:ProfileTags.js
dev:QuickDelete/multiCats.js
dev:ReferencePopups/code.js
dev:SignatureCheck/code.js
dev:DiscordIntegrator/code.js
dev:YouTubeAudio/code.js
dev:MassCategorization/code.js
dev:AjaxBatchDelete.js
dev:WikiActivity.js