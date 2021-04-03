/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';

$(function() {
    var rights = {};
 
    //Бюрократы
    rights["Слим Шейди"]      = ["Темный Маг"];
    
    f (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});
 
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
 
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}