importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Wikimarks/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PatrolPanel.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UCX.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewImages.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewCategoriesLocalizedFilter.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RandomPageShortcut/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewVideos.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Community-corner.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CatNav/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CacheCheck/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ToDoList.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ModernLeaderboard.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddButtonsPhoto/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BulkVideoUpload.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UTCClock/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WHAM/code.2.js',
    ]
});

//===================================
// Новый блок "Новые статьи" с [[Шаблон:NewPagesModule]] внутри.
// Стили записаны в MediaWiki:Boxes.css
// Скрипт by ДжоДжо Вики
// 

$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});