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

/* 寵物工具：只在指定頁面載入。 */
if (["寵物進化挑選器", "寵物工具/REBORN資料庫"].indexOf(mw.config.get("wgPageName")) !== -1) {
    importArticles({type:"style", articles:["MediaWiki:PetEvolution.css"]});
    importArticles({type:"script", articles:["MediaWiki:PetEvolution.js"]});
}

/* 物品掉落搜尋：僅在搜尋器頁面載入。 */
if (mw.config.get("wgPageName") === "物品掉落搜尋器") {
 importArticles({type:"style", articles:["MediaWiki:ItemDropSearch.css"]});
 importArticles({type:"script", articles:["MediaWiki:ItemDropSearch.js"]});
}

/* 物品分頁查詢：只載入指定頁面。 */
if (mw.config.get("wgPageName") === "物品分頁查詢") {
 importArticles({type:"script", articles:["MediaWiki:ItemPagination.js"]});
}
/* 查詢工具：限定工具頁載入，所有操作僅讀取同站資料。 */
jQuery(function () {
if (["圖鑑搜尋", "物品取得查詢", "裝備與寵物比較", "養成素材計算器", "副本查詢"].indexOf(mw.config.get("wgPageName")) !== -1) {
    importArticles({type: "script", article: "MediaWiki:GuideTools.js"});
}

});