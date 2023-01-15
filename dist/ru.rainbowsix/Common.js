/* Иконки социальных сетей */
$('.WikiaRail').append('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="//vk.com/splintercell5"><img src="//vignette.wikia.nocookie.net/splintercell/images/6/60/VKI.png/revision/latest?cb=20180318113844&path-prefix=ru"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="//www.youtube.com/user/S25SC5"><img src="//vignette.wikia.nocookie.net/battlefield/images/a/af/Youtube.png/revision/latest?cb=20180311171221&path-prefix=ru"></a></div></div>');

/* 1. Автообновление */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Contributions"];
var AjaxRCRefreshText = 'Автообновление';

/* 2. Неактивные участнки */
InactiveUsers = { 
    months: 2,
    text: 'Неактивен'};

/* 3. Отображение никнейма в шаблоне */
(function($, mw) {
    if (!$('.insertusername').length) return;
    $('.insertusername').html( (wgUserName != 'null') ? wgUserName : 'Участник ФЭНДОМА' );
})(this.jQuery, this.mediaWiki);