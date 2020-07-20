/* Any JavaScript here will be loaded for all users on every page load. */
//<nowiki>
 
var PurgeButtonText = 'Refresh',
    ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity", "Blog:Recent_posts"],
    AjaxRCRefreshText = 'Auto-refresh';
 
//preload line to add user category for special:upload and special:multipleupload
function preloadUploadDesc() {
    // check wgCanonicalSpecialPageName for upload page
    if ( [ 'MultipleUpload', 'Upload' ].indexOf( mw.config.get( 'wgCanonicalSpecialPageName' ) ) > -1 ) {
        // append Category:USERNAME to upload desc textarea
        $( '#wpUploadDescription').val( $( '#wpUploadDescription').val() + '[[Category:' + mw.config.get( 'wgUserName' ) + ']]' );
    }
}
 
$( preloadUploadDesc );
 
//edit buttons
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert page"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
            "speedTip": "Strike",
            "tagOpen": "<s>",
            "tagClose": "</s>",
            "sampleText": "Strike-through text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
            "speedTip": "Comment visible only for editors",
            "tagOpen": "<!-- ",
            "tagClose": " -->",
            "sampleText": "Insert comment here"
    };
}
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// </nowiki>
 
// Imports
EditIntroButtonText = 'Intro';
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:DupImageList/code.js',
        'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js']
});


/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'wgusername' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=WritaRoleplayGuildwiki&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});

/* Admin Team and brigades */

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bureaucrat', order: 1 },
		admin: { u: 'Admin', order: 2 },
		rb: { u: 'Rollback', order: 3 },
		cm: { u: 'Chat Moderator', order: 104 },
                writing: { u: 'Writing Brigadier', order: 105 },
                roleplay: { u: 'Roleplay Brigadier', order: 106 },
                ft: { u: 'Full Time', order: 107 },
                pt: { u: 'Part Time', order: 107 },
                i: { i: 'Inactive', order: 107 },
	}
};
UserTagsJS.modules.custom = {
'BachLynn23': ['bureaucrat', 'admin', 'writing', 'roleplay', 'ft'],
'Brocky292': ['bureaucrat', 'writing', 'roleplay', 'pt'],
'Avingnon': ['bureaucrat', 'writing', 'roleplay', 'ft'],
'TheWondefulMaskedMadame': ['bureaucrat', 'writing', 'roleplay', 'pt'],
/* Admins */
'Defrether': ['roleplay', 'i'],
'LeGruff': ['pt'],
'Rid3r98': ['i'],
'Royaldoggie': ['pt'],
/* Rollbacks */
'Flamefang': ['rb', 'pt'],
'FloatingInDarkness': ['rb', 'pt'],
'Hydrocarbon1997': ['rb', 'pt'],
'Meloney': ['rb', 'pt'],
'Waves of Wisdom': ['rb', 'pt'],
'Zer0TheNinja': ['rb', 'pt'],
'Rawr27': ['rb', 'ft'],
/* Chat Moderators */
'NickiWilliams': ['cm', 'ft'],

};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


var chatTopic = 'Please follow the <a href="/wiki/Writing_and_Roleplaying_Guild_Wiki:Policies_Overview/Chat" target="_blank" title="Chat_Rules">Chat Policies</a> so<br />that we all have a great time!<br>We would also like to ask that you check our <a href="/wiki/IRC" target="_blank" title="IRC_Channel">IRC channel</a> for other wiki members.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:1;font-size:12px;line-height:1.6;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();