/* 此 JavaScript 會用於使用者載入的每一個頁面。 */
switch (mw.config.get('wgPageName')){
// only processing in that page
	case '配點模擬器':
		//mapping skill simulator
		importArticles(
	    {
	        type: 'style',
	        article: 'MediaWiki:SkillSimulator.css'
	    });
	    importArticles(
	    {
	        type: 'style',
	        article: 'MediaWiki:SkillSimulator-image.css'
	    });
	    importArticles(
	    {
	       	type: 'script',
	       	article: 'MediaWiki:SkillSimulator.js'
	    });
		break;
	
}