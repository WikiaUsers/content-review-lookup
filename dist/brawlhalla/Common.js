//Imported articles
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});

//User Tags
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops

    'sysop': ['bureaucrat'], 

};


UserTagsJS.modules.implode = {
		'Admin': ['chatmoderator', 'threadmoderator','content-moderator', 'discussions-moderator', 'rollback'], // Adds 'Admin' group but doesn't removes the mentioned groups
	
    	'Moderator': ['chatmoderator', 'threadmoderator','content-moderator', 'discussions-moderator', 'rollback']
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};


// AjaxRC Configuration
window.ajaxSpecialPages = [
    "Recentchanges", 
    "Recentchangeslinked", 
    "WikiActivity", 
    "Watchlist", 
    "Log", 
    "Contributions", 
    "NewPages", 
    "Images", 
    "Following", 
    "UncategorizedPages",
    "Categories",
    "BlockList",
    "ListFiles",
    "Withoutimages",
    "DoubleRedirects",
    "Whatlinkshere"];
window.ajaxPages = ["Blog:Recent posts"];
window.ajaxRefresh = 10000;
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';



/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}