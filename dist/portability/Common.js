/* Any JavaScript here will be loaded for all users on every page load. */
// Scripts stored in MediaWiki:Import.js 
/* JS extension configuration */ 
PurgeButtonText = 'Purge';
ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
AjaxRCRefreshText = 'Auto-refresh';

jQuery.ajax({
    url: "https://wikia-inc.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-mjy2a8/b/c/3d70dff4c40bd20e976d5936642e2171/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=ad445fd4",
    type: "get",
    cache: true,
    dataType: "script"
});