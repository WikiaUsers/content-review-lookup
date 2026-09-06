/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка

importArticles({
    type: "script",
    articles: [
        // ...
        //'u:dev:MediaWiki:DiscordIntegrator/code.js'
        'w:c:dev:TopEditors/code.js'        
        // ...
    ]
});

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 720;

/* Текстовые ссылки на изображения с открытием в Fandom Lightbox */
(function () {
    'use strict';

    function openTldLightbox(fileName) {
        var page = document.querySelector('.page');

        if (!page || !fileName) {
            return;
        }

        var link = document.createElement('a');
        link.className = 'image';

        var img = document.createElement('img');
        img.dataset.imageKey = fileName;

        link.appendChild(img);
        page.appendChild(link);

        link.click();

        page.removeChild(link);
    }

    $(function () {
        $(document).on('click', '.tld-image-link', function (event) {
            event.preventDefault();

            var fileName = this.getAttribute('data-image');

            if (fileName) {
                openTldLightbox(fileName);
            }
        });
    });

})();