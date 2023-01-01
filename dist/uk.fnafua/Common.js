/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

/** Настройки скриптов **/
/**** AJAX RC ****/
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Доступ к комментариям закрыт, так как блог не комментировали <expiryDays> дней"
};

/** ИМПОРТЫ **/
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Fantom.js',
    ]
});
/** КОНЕЦ ИМПОРТОВ **/

// Создадим иллюзию голосований только для зарегистрированных участников!
// Всячески НЕ рекомендуется к использованию нигде
(function ($, mw) {
    $('.no-anon-poll .ajax-poll').show();
    if (mw.config.get('wgUserName') === null) {
        $('.no-anon-poll .ajax-poll').each(function () {
            $(this).find('.header').append('<span style="color:gray;font-size:13px">Вы не можете участвовать в этом голосовании.</span>');
            $(this).find('.pollAnswerName input').remove();
        });
    }
})(this.jQuery, this.mediaWiki);

// Добавление имени участника в шаблон.
(function($, mw) {
    if (!$('.insertusername').length) return;
    $('.insertusername').html( (wgUserName != 'null') ? wgUserName : 'Анонимный участник' );
})(this.jQuery, this.mediaWiki);

/*Викификатор*/
function addWikifButton() { 
    var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ); // Monobook+Modern 

    if (!toolbar) return;

    var i = document.createElement('img');
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'викификатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
} 

if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
    addOnloadHook(addWikifButton);
}

/* Запрещает писать в Архиве */

$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">В архиве писать запрещено.</blockquote>');
    }
});