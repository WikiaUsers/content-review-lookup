/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/** == Содержание == **/
/** 1. Автообновление **/
/** 2. Неактивные участники **/
/** 3. Отображение никнейма в шаблоне **/




/* 1. Автообновление */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Contributions"];
var AjaxRCRefreshText = 'Автообновление';

/* 2. Неактивные участнки */
InactiveUsers = { 
    months: 3,
    text: 'Неактивен'
};

/* 3. Отображение никнейма в шаблоне */
(function($, mw) {
    if (!$('.insertusername').length) return;
    $('.insertusername').html( (wgUserName != 'null') ? wgUserName : 'Участник ФЭНДОМА' );
})(this.jQuery, this.mediaWiki);