/* 此處的JavaScript將在所有用戶載入每個頁面時使用。 */
$(function () { $("[data-toggle='tooltip']").tooltip(); });
// Pages need to import script
wgPageName === '數值篩選器' && importScript('MediaWiki:CardSort.js');
wgPageName === '活動篩選器' && importScript('MediaWiki:EventFilter.js');
wgPageName === '簡易篩選器' && importScript('MediaWiki:LiteFilter.js');