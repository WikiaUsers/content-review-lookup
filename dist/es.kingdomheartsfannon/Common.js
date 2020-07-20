importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js',
        'w:dev:RevealAnonIP/code.js',
        'w:dev:AjaxRC/code.js',
        'u:dev:ResponsiveSlider/code.js'
    ]
});
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});