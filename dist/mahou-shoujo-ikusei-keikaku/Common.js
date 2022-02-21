/* Any JavaScript here will be loaded for all users on every page load. */
 
window.PurgeButtonText = 'Purge';

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
window.BackToTopModern = true; 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}


/****************************/
/* spoilers by User:Tierrie */
/****************************/
//Testing by Rockmosis
//Modify by Macho44    

$(function() {
    console.log("mahou-shoujo-ikusei-keikaku Wiki: Spoilers script loaded");

    $('.sp_banner').click(function() {
        var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];

        if ($('.sp_id_' + id + ' .sp_wrn').css('display') == 'none') {
            $('.sp_id_' + id + ' .sp_wrn').fadeIn(200, function() {
                $(this).show(200);
            });
            $('.sp_id_' + id + ' .sp_txt').hide(0);
        } else {
            $('.sp_id_' + id + ' .sp_wrn').fadeOut(200, function() {
                $(this).hide(200);
            });
            $('.sp_id_' + id + ' .sp_txt').delay(200).show(0);
        }
    });

    var sp_on_page = {};
    $('.sp').each(function() {
        var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
        sp_on_page[id] = undefined;
    });
    console.log(id);
    for (var id in sp_on_page) {
        //Starts hidden every time
        $('.sp_id_' + id + ' .sp_wrn').show(0);
        $('.sp_id_' + id + ' .sp_txt').hide(0);
    }
});


/****************************/
/* RailWAM */
/****************************/
window.railWAM = {
    logPage:"Project:WAM Log"
};



/****************************/
/* Lastedit */
/****************************/
window.lastEdited = {
	size: false,
	diff: false,
	position: {
		element: document.getElementById('mw-content-text'),
		method: 'prepend'
	},    

}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});