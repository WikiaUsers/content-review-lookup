// JavaScript here will be loaded for all users on every page load.
// For imported scripts, see [[MediaWiki:ImportJS]].

/* ############################################ */
/* ### Configurations for imported scripts  ### */
/* ############################################ */

// AjaxRC (dev.wikia.com/wiki/AjaxRC)
window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log","Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// ArchiveTool (dev.wikia.com/wiki/ArchiveTool)
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};

// LockForums (dev.wikia.com/wiki/LockForums)
window.LockForums = {
    banners: true,
    expiryBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been inactive for <b><actualDays> days</b> and is now archived.",
    disableOn: ["41374"]
};

// ReferencePopups (dev.wikia.com/wiki/ReferencePopups)
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

/* ###################### */
/* ### Local scripts  ### */
/* ###################### */

// Image upload text
window.onload=function() {
if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload' || mw.config.get('wgCanonicalSpecialPageName') == 'MultipleUpload')
{
        $(".mw-htmlform-field-Licenses").hide();
        $("#wpUploadDescription").html("{{Infobox File\n|description = \n|source      = \n|author      = \n}}\n\n[[Category:]]");
}
}

// Job infobox: move image tabber below images 
$('.portable-infobox.type-job .pi-image-collection-tabs').detach().appendTo('.portable-infobox.type-job .pi-image-collection');