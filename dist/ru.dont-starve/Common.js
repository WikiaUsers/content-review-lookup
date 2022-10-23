window.DiscussionTemplates = {
    templates: {
        'Некропостинг': {
            name: 'Шаблон:Некропостинг',
            title: 'Некропостинг'
        },
    },
    allowedGroups: ['sysop', 'content-moderator', 'threadmoderator']
};

var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();

/* Для шаблона - "Твоёимя" */
$(function UserNameReplace() {    
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.values.wgUserName === null) return;    $("span.yourname").text(mw.config.values.wgUserName); 
});
/* Отступы в title */
function replaceTitle() {
    if ($('#replaceMe').length !== 0) {
        var n = $('#replaceMe').attr("title").replace(/&#10/g,"\n"); //Заменяем &#10 на отступ
        $('#replaceMe').attr("title", n); //Присваеваем новый title
        $('#replaceMe').attr('id', ''); //Удаляем id дабы передти к следующему элементу
        setTimeout(replaceTitle,300); //Небольшая задержка, чтобы таблица успела прогрузиться
    }
}
replaceTitle();

window.BackToTopModern = true;

/* Приход циклопа */
var cyclopeIsGone = null;
window.cyclopeGone = function(){
  cyclopeIsGone = true;
  $("#gone").removeClass("buttona");
  $("#gone").addClass("buttonb");
  $("#ngone").removeClass("buttonb");
  $("#ngone").addClass("buttona");
};
 
window.cyclopeNotGone = function(){
  cyclopeIsGone = false;
  $("#ngone").removeClass("buttona");
  $("#ngone").addClass("buttonb");
  $("#gone").removeClass("buttonb");
  $("#gone").addClass("buttona");
};
 
window.cyclopecalculater = function(){
if(cyclopeIsGone !== null){
var userDayscyclope = $("#dayscyclope").val();
if(!isNaN(userDayscyclope)){
if(userDayscyclope === "" || userDayscyclope < 31){
  userDayscyclope = 31;
}
var cyclopeArrive1;
var differencecyc;
var minWinter = 21;
var maxWinter = 35;
var daymultiplier = Math.floor((userDayscyclope - minWinter)/70);
var minWinteruser = minWinter + 70*daymultiplier;
var maxWinteruser = maxWinter + 70*daymultiplier;
if(cyclopeIsGone === true){
  cyclopeArrive1 = Math.floor(maxWinteruser + 57.8);
}else if(cyclopeIsGone === false){
  differencecyc = userDayscyclope - minWinteruser + 1;
  if((differencecyc + 16.8) < 30){
  cyclopeArrive1 = Math.floor(differencecyc + 56.8 + maxWinteruser);
  }else if(differencecyc > 14 && differencecyc <=15){
  cyclopeArrive1 = Math.floor(maxWinteruser + 127.8);
  }else if(differencecyc > 15){
    cyclopeArrive1 = Math.floor(maxWinteruser + 57.8);
  }
}
if((cyclopeIsGone === false) && (differencecyc == 14 )){
  cyclopeArrive1 = Math.floor(differencecyc + 56.8 + maxWinteruser);
  cyclopeArrive2 = Math.floor(maxWinteruser + 126.8);
  $("#resultcyclope").html("<p>Циклоп придёт на: " + cyclopeArrive1 + " либо на " + cyclopeArrive2 + " день. </p>");
}else{
$("#resultcyclope").html("<p>Циклоп придёт на: " + cyclopeArrive1 + " день. </p>");
}
}else{
$("#resultcyclope").html("<p>Привет. Я съел булочку.</p>");
}
}else{
$("#resultcyclope").html("<p>Выберите условие!</p>");
}
};
$('<input id="gone" class="wds-button buttona" onclick="cyclopeGone()" type="button" value="Ушёл">').appendTo( "#cyclopecalc" );
$('<input id="ngone" class="wds-button buttona" onclick="cyclopeNotGone()" type="button" value="Убит">').appendTo( "#cyclopecalc" );
$('<p><input type="text" placeholder="31" size="5" maxlength="8" required id="dayscyclope" value=""> день</input> ').appendTo( "#cyclopecalc" );
$('<input id="cyclopecalculate" class="wds-button buttona" onclick="cyclopecalculater()" type="button" name="button" value="Рассчитать">').appendTo( "#cyclopecalc" );

/*Изменяет цвет у рамок в ответаx администраторов*/
/*I'm not sure if it's possible not to clear the interval*/
setInterval(function () {
	$('.wds-avatar a[href$="Arhhhat"]').closest('.Reply, .Reply_body__PM9kM').addClass('Arhhhat');
	$('.wds-avatar a[href$="FruitShakeSB"]').closest('.Reply, .Reply_body__PM9kM').addClass('FruitShakeSB');
}, 500 );

/*Страница администрации*/
$(function(){
$('.dsadmin, .dsmoder').click(function(){
	$(this).css({"display": "none"});
	$(this).css({"animation": "flipInY 0.3s"});
	$(this).siblings('.dsadmindescr, .dsmoderdescr').css({"display": "inline-block"});
	$(this).siblings('.dsadmindescr, .dsmoderdescr').css({"animation": "flipInY 0.3s"});
	$('.dsadmindescr, .dsmoderdescr').not($(this).siblings('.dsadmindescr, .dsmoderdescr')).css({"display": "none"});
	$('.dsadmin, .dsmoder').not($(this)).css({"display": "inline-block"});
	$('.dsadmin, .dsmoder').not($(this)).css({"animation": "flipInY 0.3s"});
});

$('.dsadmindescr, .dsmoderdescr').click(function(){
	$(this).css({"display": "none"});
	$(this).css({"animation": "flipInY 0.3s"});
	$(this).siblings('.dsadmin, .dsmoder').css({"display": "inline-block"});
	$(this).siblings('.dsadmin, .dsmoder').css({"animation": "flipInY 0.3s"});
});
});

/*Описание к стене аккаунта корректировок перевода*/
$(function(){
	function translatedescription(){
	    switch ( mw.config.get('wgPageName') ) {
        case 'Стена_обсуждения:Корректировка_перевода':
                    $('<div id="translate"></div>').prependTo("#MessageWall");
                    $('#translate').load('https://dont-starve.fandom.com/ru/wiki/Шаблон:Корректировка_перевода .translatedescrip');
        break;
	    }
	}
$(translatedescription);
});

/*Настройки ImprovedTabbers*/
window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        HumanReadableAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: true,
};

/*Поваренная книга в окне*/
$(function(){
switch ( mw.config.get('wgPageName') ) {
case 'Поваренная_книга':
var modal;

mw.hook('dev.modal').add(function(modal) {
var modal = new window.dev.modal.Modal({
	buttons: [
        {
            classes: ['cookbook_edit'],
            event: 'cbedit',
            id: 'cookbook_edit',
            primary: true,
            text: 'Править'
        },
        {
            classes: ['cookbook_sup'],
            event: 'cbsup',
            id: 'cookbook_sup',
            primary: true,
            text: 'Сообщить об ошибке'
        },
        {
            classes: ['cookbook_cookpot'],
            event: 'cbcookpot',
            id: 'cookbook_cookpot',
            primary: true,
            text: 'Протестировать рецепты'
        }
    ],
	title: 'Поваренная книга',
    content: '<div id="cbook_content"></div>',
    events: {
        cbedit: function() {
            var href = 'https://dont-starve.fandom.com/ru/wiki/Шаблон:CBcontent?action=edit';
            window.open(href, '_blank');
        },
        cbsup: function() {
            var href = 'https://dont-starve.fandom.com/ru/wiki/Стена_обсуждения:Arhhhat';
            window.open(href, '_blank');
        },
        cbcookpot: function() {
            var href = 'https://dont-starve.fandom.com/ru/wiki/Интерактивный_казан';
            window.open(href, '_blank');
        }
    },
    id: 'cbook',
    size: 'content-size',
    closeTitle: 'Закрыть'
});
modal.create();

$('#cbook_show').click(function() {
modal.show();
});
$('#cbook_content').load('https://dont-starve.fandom.com/ru/wiki/Шаблон:CBcontent .cookbook', function() {
importScriptPage( 'MediaWiki:Cookbook.js');
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Selector.js'
});
});
});
break;
}
});

/*Профиль Фяна*/
$('#phyanselect .cc-1').click(function() {
    $('#phyanprofile #footer').css({"background-image": "url('https://static.wikia.nocookie.net/dont-starve/images/3/3d/%D0%9F%D0%BB%D0%B0%D0%BD_%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B9_%D0%B4%D0%BB%D1%8F_Don%27t_Starve_Together_%D0%BD%D0%B0_2021_%D0%B3%D0%BE%D0%B4.jpg/revision/latest?cb=20210204185306&path-prefix=ru')"});
});
$('#phyanselect .cc-2').click(function() {
    $('#phyanprofile #footer').css({"background-image": "url('https://static.wikia.nocookie.net/dont-starve/images/a/a3/New_Horizons_загрузочный_экран.png/revision/latest?cb=20200321071926&path-prefix=ru')"});
});
$('#phyanselect .cc-3').click(function() {
    $('#phyanprofile #footer').css({"background-image": "url('https://static.wikia.nocookie.net/dont-starve/images/d/de/Nightfall_загрузочный_экран.png/revision/latest?cb=20200321072004&path-prefix=ru')"});
});
$('#phyanselect .cc-4').click(function() {
    $('#phyanprofile #footer').css({"background-image": "url('https://static.wikia.nocookie.net/dont-starve/images/1/1b/Critters_загрузочный_экран.png/revision/latest?cb=20190607221438&path-prefix=ru')"});
});

/*Для дискорда*/
$(function(){
    intervalName = setInterval(userlink,500);
        function userlink(){
            if ($('a[href="#showDiscordUsers"').length){
            	clearInterval(userlink);
                $('a[href="#showDiscordUsers"]').click(function() {
                    $('#show-discord-users .oo-ui-panelLayout span').each(function(){
                    var username = ($(this).text()).trim();
                    var config = mw.config.get(['wgScriptPath']);
    
                    $(this).wrap('<a href="' + config.wgScriptPath + '/Участник:' + username + '"></a>');
                    });
                });
            };
        }
});

/*Для виджета вк в темной теме*/
$(function(){
if ($('body').hasClass('theme-fandomdesktop-dark')) {
     $('.vk-widget').attr('data-color-bg', 'bdaea5');
     $('.vk-widget').attr('data-color-button', '2f2d2b')
}
});

/*Шаблон:Меню создания*/
$(function(){
    $('.craft-menu, .craft-menu2').find('img[alt="Фильтр ' +mw.config.get('wgPageName').split("/")[1].replaceAll("_"," ") + '.png"]').css({"box-shadow": "1px 1px 2px 1px var(--theme-accent-color) inset"});
});