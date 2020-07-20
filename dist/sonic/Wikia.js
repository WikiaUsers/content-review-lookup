/* Featured video message */
//By User:Fngplg
$(function(){
    if ($('.featured-video__wrapper').length === 0) return;
    var banner = new BannerNotification();
    banner.setContent('The video you see at the top of this article is provided by the host, not by the editors of this site. Its content may not accurately represent the article.');
    banner.show();
});

/**** Custom user tags ****/
window.UserTagsJS = {
    modules: {},
    tags: {
        rollback: 'Rollback',
        discordadmin: { u:'Discord Administrator' },
		twitteradmin: { u:'Twitter Administrator' },
		designadmin: { u:'Interface Designer' },
		supervisor: { u:'Editing Supervisor' }
    }
};

// Add custom groups to several users
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['rollback'];
UserTagsJS.modules.custom = {
    'DeCool99': ['discordadmin', 'twitteradmin', 'supervisor'],
	'Luma.dash': ['designadmin'],
	'Myself_123': ['supervisor'],
	'Veralann': ['twitteradmin']
};
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};

/**** Ends here ****/
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

window.archiveListTemplate = 'Archive';

//Comment Preview's throbble
window.fng = $.extend(true, window.fng, {cp: (window.fng || {}).cp || {} });
window.fng.cp.throbber = 'https://vignette.wikia.nocookie.net/sonic/images/7/7c/AjaxRC.gif/revision/latest?cb=20170917141821';

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Taken from Wikipedia's Common.js.
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//Signature check
var el ='~~' + '~~';
window.SignatureCheckJS = {
    noSignature: '1. It looks like you forgot to sign your reply. Use ' + el + ' to sign.\n',
    epilogue: '2. If you are just correcting your already signed post or fixing an issue in the talkpage, do not bother with this message.'
};

    
// *********************************************
// Fixing static GIF thumbnails
// *********************************************
window.DynamicImages = {
    gifGaleryImages: true,
    gifImages: false,
    svgGaleryImages: true
};

/**
 * Floating TOC script from Wowwiki
 */
 importArticles({
    type: 'script',
    articles: [
        'u:wowwiki:FloatingToc/code.js'
    ]
});

/**** Category buttons ****/
if ($("#CategorySelectAdd").hasClass("wikia-button secondary add")) {
    $("#CategorySelectAdd").addClass("wds-is-squished wds-button");
    $("#CategorySelectCancel").addClass("wds-is-squished wds-button");
    $("#CategorySelectSave").addClass("wds-is-squished wds-button");
}
if ($('.categories').children('li').length >= 56) {
    document.getElementById('articleCategories').style.backgroundSize = "190%"; 
}

/**** Less ****/
/** Wikia.css **/
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    header: 'MediaWiki:Custom-Css-header/common'
} );

//DiscussionsRailModule
window.discussionsModuleLoaded = mw.config.get('wgCanonicalSpecialPageName') === 'WikiActivity';
//AddRailModule
window.AddRailModule = [{prepend: true}];

/*****Handling new navbox *****/
$(document).ready(function() {
    if (document.getElementById('navb')) {
    var main = document.getElementById('navb'); //Accessing navb id
    var bt  = document.querySelectorAll("#navb ul.tabbernav li"); //Make a node list of the argument
    var imgbox = document.querySelectorAll(".desc");
    for (var i = 0; i < bt.length; i++) {
    bt[i].style.setProperty("border-top", "6px solid " + main.style.borderLeftColor, "important"); // To apply the said property on every node
     bt[i].style.setProperty("border-radius", "10px", "");
    }
    for ( i = 0; i < imgbox.length; i++) 
        imgbox[i].style.setProperty("border-top", "4px solid " + main.style.borderLeftColor, "important");
}
    if (document.getElementById('contain')) {
        var  sel = document.querySelectorAll('#contain img');
        for (var j = 0; j < sel.length; j++) 
            sel[j].style.objectFit = "contain";
    }
    else
        return; 
});
//By fngplg
(function($) {
    // makes active tabber tab based on the pagename and tabber content    
    var $tabber = $('#navb .tabber');
    if (!$tabber.length) return;
    $(function(){
        setTimeout(function() {
            $tabber.find('.tabbertab').each(function() {
                var $this = $(this),
                    $selflink = $this.find('.selflink'),
                    target = $selflink.closest('.tabbertab').attr('title'),
                    $tab2activate = $this.closest('.tabber').find('.tabbernav>Li>a[title="' + target + '"]');
                $tab2activate.click();
            });// each .tabbertab
        }, 100);// settimeout
    });// doc.rdy    
})(jQuery);
/**** End of new navbox handling ****/