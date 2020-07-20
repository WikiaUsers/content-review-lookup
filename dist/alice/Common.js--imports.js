/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		bot: { link:'Help:Bots' }
	}
};
UserTagsJS.modules.inactive = 72;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bot',
    'bot-global'
];
UserTagsJS.modules.metafilter = {
    bot: ['bot-global']
};

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Alice_Wiki:WikiActivity"];

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries',
    css: '#stdSummaries { ... }'
};

/* Imagebox */
/* destfile checker from http://starwars.wikia.com/wiki/MediaWiki:Common.js 
   modified by Lia */

$("#mw-upload-form").submit(function (event) {
    var wpDestFile = $("#wpDestFile").val();

    if ( wpDestFile.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
        alert('Please do not use capitalized or duplicated file extensions in the filename.');
        return false;
    }
});
	
window.uploadText = "{{Imagebox\n"
	+ "| description = \n"
	+ "| series      = \n"
	+ "| source      = \n"
	+ "| author      = \n"
	+ "| origin      = \n"
	+ "| cats        = \n"
	+ "| license     = \n"
	+ "}}";
	
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:RevealAnonIP/code.js',
        'u:dev:MediaWiki:Standard_Edit_Summary/code.js',
        'u:dev:MediaWiki:UserTags/code.js', 
        'u:nephilim:MediaWiki:Imagebox.js'
    ]
});