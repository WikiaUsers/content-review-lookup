// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js'
    ]
});


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

//Forum highlight 
window.MessageWallUserTags = {
    tagColor: 'black',
    glow: true,
    glowSize: '15px',
    glowColor: '#CB0000',
    users: {
        'username': 'usergroup',
        'TimeShade': 'Admin'
    }
};
 
window.importArticles( {
    type: 'script',
    articles: [
'u:dev:MessageWallUserTags/code.js'
]
} );

// FROM PL.CW-DC.WIKIA.COM
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaPageBackground').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute; margin-top:80px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/OutcastWiki"><img src="https://images.wikia.nocookie.net/arrow/pl/images/thumb/3/31/TwitterSocial.png/35px-TwitterSocial.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
                addOnloadHook(SocialIcons);
 
}

/**FROM SAINTS ROW WIKI**/
if ($('#WikiaRail').length) { 
    $('#WikiaRail').bind('DOMNodeInserted.modules', function(event) {
 
	if (!$('#RCLink').size()) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Recent Changes</a>');
    });  //end of DOMNodeInserted block
}

 $(function() {
  /* Transcript Button */
   if($('#showTranscriptbutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgPageName) + "/Transcript" +'" title="Transcript"> Transcript</a>');
  }
 
 });