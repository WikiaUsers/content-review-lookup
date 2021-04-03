/*Подключение карты*/
if (mw.config.get('wgPageName') === 'Шаблон:Map') {
    importArticle({ type: 'script', article: 'MediaWiki:MapBL.js' });
}