/* AjaxRC */
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображает название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображает подсказку

/* Быстрая вставка иконки в ИК */
mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/speedit/images/6/6f/Template.svg",
        "speedTip": "Иконка",
        "tagOpen": "{{I|",
        "tagClose": "}}",
        "sampleText": "Название"
    };