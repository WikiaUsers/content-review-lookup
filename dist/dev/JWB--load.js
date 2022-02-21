/** This script contains the code required for loading [[User:Joeytje50/AWB.js]].
 *  All other code is located at that page.
 */
//Idea by [[User:Epicgenius]]
$('<li>', {
	append: $('<a>', {
		href: mw.config.get('wgArticlePath').replace('$1', 'Project:AutoWikiBrowser/Script'),
		text: 'JS Wiki Browser',
		title: 'Run Javascript Wiki Browser'
	}),
	prependTo: $('#WikiaBar .toolbar .tools')
});
if (mw.config.get('wgCanonicalNamespace')+':'+mw.config.get('wgTitle') === 'Project:AutoWikiBrowser/Script') {
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:JWB/code.js'
    });
}