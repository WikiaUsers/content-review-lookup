/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

/***********************************/
/*** Незареєстровані користувачі ***/
/***********************************/
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВНИЙ КОРИСТУВАЧ '
};
/***********************************/ 
/***********************************/ 

/***********************************/
/*** Спойлери ***/
/***********************************/

SpoilerAlert = {
  categories: "Спойлери",
};
/***********************************/ 
/***********************************/ 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',            // FloatingToc adds a button to the table of contents that will turn it into a floating panel when clicked
        'u:dev:InactiveUsers/code.js',          // Додає "НЕАКТИВНИЙ КОРИСТУВАЧ"
        'u:dev:SearchSuggest/code.js',          // Додаткові варіанти пошуку
        "u:dev:DupImageList/code.js",           // http://dev.wikia.com/wiki
        "u:dev:ReferencePopups/code.js",        // Посилання у спливаючому гаджеті
     /*   "u:dev:MediaWiki:AddRailModule/code.js",*/// Додає призначений для користувача модуль до Wiki - Rail*
        'u:dev:AjaxRC/code.js',                 // Автооновлення сторінок
        'u:dev:TopEditors/code.js',             // ТОП сторінок
        'u:dev:CollapsibleInfobox/code.js',     // Для Інфобоксів
        'u:dev:HeaderLinks/code.js',            // Додає на сторінках іконку, при натискані на яку копіюється посилання на певний заголовок (іконка у вигляді замка, відображається лиши при наведенні на заголовок <h2>, <h3>, <h4>)

        'MediaWiki:SpoilerAlert.js',            // Для спойлерів       
        "MediaWiki:BackToTopButton.js",         // Кнопка вгору
        "MediaWiki:Chat.js",                    // Фільтр слів
        "MediaWiki:Slider.js",                  // Слайдер
        "MediaWiki:Countdown.js",               // Звороній відлік
        "MediaWiki:BlankPageSandbox.js",       // для сторінки "Пісочниця"    
    ]
});

/*******************************/
/**** Поворот зображень ****/
/*******************************/

var targetCard,
    cardX,
    cardY,
    cardBg;
 
$(".cardWrapper").on("mouseover", function(){
  targetCard = $(this).children();
  cardX = $(this).offset().left;
  cardY = $(this).offset().top;
 
}).on("mousemove", function(event) {
  var rotateValX = ((event.clientX - cardX) - $(this).width()/2) * 0.08; /*наклон по оси X */
  var rotateValY = -((event.clientY - cardY) - $(this).height()/2) * 0.04; /*наклон по оси Y*/
 
  targetCard.css({
    "transform":"rotateY("+  rotateValX +"deg) rotateX("+  rotateValY +"deg)"});  $(".card").not(targetCard).addClass("fade");
 
}).on("mouseleave", function(event) {
  targetCard.css({"transform":"rotateY(0deg) rotateX(0deg)"});
});
 
$(".card").each(function() {
 $(this).css({"background":"url"});
});
/*******************************/
/*******************************/

/*******************************/
/*** Іконки соціальних мереж ***/
/******************************/
 $('.WikiaRail').prepend('<div style="right:-1px; top:160px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/PlayWarframe"><img src="https://vignette.wikia.nocookie.net/warframe/images/3/31/CBfacebook.png/revision/latest?cb=20160102232716&path-prefix=uk"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/PlayWarframe"><img src="https://vignette.wikia.nocookie.net/warframe/images/6/6c/CBtwitter.png/revision/latest?cb=20160102232644&path-prefix=uk"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://www.youtube.com/channel/UCBIdHvSAyoud-CNZOVKW2-w"><img src="https://vignette.wikia.nocookie.net/warframe/images/5/55/CByoutube.png/revision/latest?cb=20160102232553&path-prefix=uk"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="http://www.reddit.com/r/warframe"><img src="https://vignette.wikia.nocookie.net/warframe/images/2/23/CBreddit.png/revision/latest?cb=20160102232359&path-prefix=uk"></a></div></div><div style="position: absolute; margin-top:168px" class="SocialIcon"><div style="float:right;"><a href="http://www.twitch.tv/warframe"><img src="https://vignette.wikia.nocookie.net/warframe/images/3/3d/CBtwitch.png/revision/latest?cb=20160102232708&path-prefix=uk"></a></div></div>');

/*******************************/
/*******************************/


/************************************/
/*** Автооновлення (Налаштування) ***/
/************************************/
 var ajaxPages =["Спеціальна:Watchlist","Спеціальна:Contributions","Спеціальна:WikiActivity","Спеціальна:RecentChanges","Спеціальна:NewFiles"];
var AjaxRCRefreshText = 'Автооновлення сторінки';
/************************************/
/************************************/


/*************************/
/*** Привітання форуму ***/
/*************************/
$(function() {
  $('.boards').prepend("<div class=forumwelcome style='text-align:center; color:black; text-shadow: #555 1px 1px 3px; padding:2px;'>Ласкаво просимо на форум Вікі Warframe<br>Це ідеальне місце, щоб почати обговорення, задати питання та поспілкуватись з спільнотою вікі.<br>Якщо це ваш перший візит на форум Вікі Warframe, будь ласка, натисніть на кнопку «Правила Форуму і Довідка» вище, щоб ознайомитися з роботою цього форуму і його правилами.</div>");
});
/*************************/
/*************************/


/***************************************/
/*** Закриття блогу для коментування ***/
/***************************************/
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Цей блог був неактивний протягом <expiryDays> днів. Прохання не редагувати його.",
    nonexpiryCategory: "Архівні блоги"
};
/***************************************/

/***********************/
/** * Випадковий фон ***/
 /***** by Kopcap94 *****/
 /********************/
/*$(function() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/warframe/images/6/69/Background-Ember-Wiki_uk.jpg/revision/latest?cb=20151230100220&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/6/63/Background-Excalibur-Wiki_uk.jpg/revision/latest?cb=20151230100223&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/c/cd/Background-Ex-Wiki_uk.jpg/revision/latest?cb=20151230100226&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/5/57/Background-Ivara-Wiki_uk.jpg/revision/latest?cb=20151230100229&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/2/26/Background-Mag-Wiki_uk.jpg/revision/latest?cb=20151230100231&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/b/b4/Background-Mesa-Wiki_uk.jpg/revision/latest?cb=20151230100234&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/5/5c/Background-Oberon-Wiki_uk.jpg/revision/latest?cb=20151230100236&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/6/6e/Background-Rhino-Wiki_uk.jpg/revision/latest?cb=20151230100239&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/e/ee/Background-Trinity-Wiki_uk.jpg/revision/latest?cb=20151230100241&path-prefix=uk',
        'https://vignette.wikia.nocookie.net/warframe/images/a/ae/Background-Zephyr-Wiki_uk.jpg/revision/latest?cb=20151230100243&path-prefix=uk' 
    ];
 
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});*/
 
/********************/