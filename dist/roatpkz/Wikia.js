/* Scripts added here will run for all users on all page views */
$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});


importScriptPage('MediaWiki:Snow.js','community');