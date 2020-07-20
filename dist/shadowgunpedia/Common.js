/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
/** 
*chat mod: red
*admin/sysop: blue
*bureaucrat: gold
*/
//<nowiki>

highlight = {
    selectAll: false,
    rollback: '#EE0000',
    chatmoderator: '#FF6600',
    sysop: '#00FFFF',
    bureaucrat: '#00ff00',
    bot: '#7F00FF',    
}

importArticles({
	type: 'script',
	articles: [
                /**
                 * -- Instructions --
                 * Add scripts to be imported here
                 * Scripts must be a string (enclosed in quotemarks)
                 * @example 'this is a string'
                 * if importing from outside this wiki prefix the page with u:<wikiname>
                 * @example 'u:dev:Countdown/code.js'
                 * Every string must be followed with a comma, except the last
                 * @example [ 'script1', script2', 'script3' ]
                 */
                'u:dev:DisableArchiveEdit/code.js',
                'u:dev:Countdown/code.js',
                'MediaWiki:Common.js/displayClock.js',
                'MediaWiki:Common.js/userName.js',
    

	]
});


// </nowiki>