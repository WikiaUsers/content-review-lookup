nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя активность", // Название в меню
    description: "Оформление для свежих правок, соц. активности, страницы истории" // Описание гаджета в меню при наведении
},{
    name: "MainStyle",
    title: "Стандартное оформление", // Название в меню
    description: "Вики по умолчанию оформлена в єтом стиле. Чтобы применить другой стиль, отключите этот и выберите ниже другой"
},{
    name: "SAOStyle",
    title: "Оформление SAO", // Название в меню
    description: "Позволяет сменить оформление вики на схожее с игровым дизайном SAO."
}
];

importArticles({
    type: "script",
    articles: [
        'u:ru.marvel:MediaWiki:Countdown.js',
   ]
});

// Временной фон
$(document).ready(function() {
    var d = new Date();
    if (d.getHours() < 8) {
        document.body.className += ' BG1';
    } else if (d.getHours() < 20) {
        document.body.className += ' BG2';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG1';
    }
});