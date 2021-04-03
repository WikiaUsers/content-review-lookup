/*** MessageBlock Config ***/
var MessageBlock = {
	title : 'Block Notice',
	message : 'You have been blocked for $2 for the following reason: <br /><br /> <div style="border: 1px solid; padding: 0.5em"> Violation of [[Rules and Guidelines]]: $1'
}


/*** Adding a user account age tag ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});