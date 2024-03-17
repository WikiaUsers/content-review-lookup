/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* 3. Отображение никнейма в шаблоне */
(function($, mw) {
    if (!$('.insertusername').length) return;
    $('.insertusername').html( (wgUserName != 'null') ? wgUserName : 'Участник ФЭНДОМА' );
})(this.jQuery, this.mediaWiki);

window.SpoilerAlertJS = {
    question: 'Эта статья содержит спойлеры. Вы уверены, что хотите её прочесть?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};

nkch_gst_gadgets = [{
    name: "ModernProfile", // название гаджета с MediaWiki:Gadgets-definition; обязательно
    title: "Современный профиль", // Название в меню
    description: "Современный профиль" // Описание гаджета в меню при наведении
}, {
    name: "RCM",
    title: "Недавняя вики-деятельность",
    description: "Недавняя вики-деятельность"
}];