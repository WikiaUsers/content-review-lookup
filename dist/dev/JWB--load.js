/** This script contains the code required for loading [[User:Joeytje50/AWB.js]].
 *  All other code is located at that page.
 */
//Idea by [[User:Epicgenius]]
mw.loader.using('mediawiki.util').then(function() {
	mw.util.addPortletLink("p-tb", mw.config.get('wgArticlePath').replace('$1', "Project:AutoWikiBrowser/Script"), "JS Wiki Browser", "tb-awbscript", "Run Javascript Wiki Browser");
});
if (mw.config.get('wgCanonicalNamespace')+':'+mw.config.get('wgTitle') === 'Project:AutoWikiBrowser/Script') {
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:JWB/code.js'
    });
}