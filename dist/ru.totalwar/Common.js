/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/****************************************/
/* Import Code                          */
/****************************************/

importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
        'w:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/standardeditsummaries.js',
        'MediaWiki:Common.js/BackToTopButton.js',
        'w:dev:DupImageList/code.js',
        'MediaWiki:Common.js/masthead.js',
        'w:dev:AjaxPatrol/code.js',
        'w:dev:TopEditors/code.js'
    ]
});

/****************************************/
/* Misc                                 */
/****************************************/
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';


/** Сприт отмечает неактивных участников параметр 3 месяцев */
// Inactive users неактивные пользователи
InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};

/** Вставка шаблона при загрузке изображения **/
// выполнение при готовности страницы
$(document).ready(function()
{      
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Описание \n| Описание  = \n| Пояснение = \n| Источник  = \n| Дата      = \n| Автор     = \n| Лицензия  = \n}}\n');
	}
});