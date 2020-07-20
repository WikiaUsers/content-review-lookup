/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], originally adapted to new header by [[User:Thailog]], adapted to look like old style by [[User:Wingstrike]]
 */
 
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 340px; bottom: -26px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em', 'z-index' : '100'} ).show();
}
});

/* Autorefresh */
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Blog:Recent_posts"];
 
var AjaxRCRefreshText = 'Auto-refresh';
 
highlight = {
    selectAll: true,
    users: {
        CoreyBot: '#A400A4',
    }
};

/* MessageWallUserTags */
window.MessageWallUserTags = {
    tagColor: '#7E3D3D',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#ffffff',
    users: {
        'Wingstrike': 'Bureaucrat',
        'Hydrocarbon1997': 'Bureaucrat',
        'Gigitygig': 'Administrator',
        'Torrun the Neko': 'Moderator',
    }
};

/* Refresh every 60 seconds */
window.chatReloadTime = 60000;

/* Article Import */
importArticles({
	type:'script',
	articles: [
    'MediaWiki:Common.js/usertags.js', /*  */     
	'u:dev:DisableBotMessageWalls/code.js',
	'u:dev:HighlightUsers/code.js',
	'u:dev:AjaxRC/code.js',
    'u:dev:DupImageList/code.js',
    'u:dev:User Rights Reasons Dropdown/code.js',
    'MediaWiki:Common.js/FairUseUpload.js',
    'u:dev:MessageWallUserTags/code.js',
    'u:dev:ChatReload/code.js',
    'u:dev:MediaWiki:DiscordIntegrator/code.js',
	]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */