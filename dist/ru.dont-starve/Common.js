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
$(function(){
    importArticles({
        type: "script",
        articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
    });
});
/* костыль для отображения иконки в цитатах  */
$(function() {
    $(".DSWHoverTabContainer img.lzy").each(function() {
        var dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', dataSrc);
        }
    });
});

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
$('<input id="gone" class="buttona" onclick="cyclopeGone()" type="button" value="Ушёл">').appendTo( "#cyclopecalc" );
$('<input id="ngone" class="buttona" onclick="cyclopeNotGone()" type="button" value="Убит">').appendTo( "#cyclopecalc" );
$('<p><input type="text" placeholder="31" size="5" maxlength="8" required id="dayscyclope" value=""> день</input> ').appendTo( "#cyclopecalc" );
$('<input id="cyclopecalculate" class="buttona" onclick="cyclopecalculater()" type="button" name="button" value="Рассчитать">').appendTo( "#cyclopecalc" );
/* Cookbook */
window.sortveggie = function(){
  $(".cbmeat").addClass("recipearrow");
  $(".cbother").addClass("recipearrow");
  $(".cbveggie").removeClass("recipearrow");
  $("#buttonveggie2").removeClass("button");
  $("#buttonveggie2").addClass("buttoncb");
  $("#buttonmeat2, #buttonall2, #buttonother2").removeClass("buttoncb");
  $("#buttonmeat2, #buttonall2, #buttonother2").addClass("button");
};
window.sortmeat = function(){
  $(".cbmeat").removeClass("recipearrow");
  $(".cbveggie").addClass("recipearrow");
  $(".cbother").addClass("recipearrow");
  $("#buttonmeat2").removeClass("button");
  $("#buttonmeat2").addClass("buttoncb");
  $("#buttonveggie2, #buttonall2, #buttonother2").removeClass("buttoncb");
  $("#buttonveggie2, #buttonall2, #buttonother2").addClass("button");
};
window.sortall = function(){
  $(".cbmeat").removeClass("recipearrow");
  $(".cbveggie").removeClass("recipearrow");
  $(".cbother").removeClass("recipearrow");
  $("#buttonall2").removeClass("button");
  $("#buttonall2").addClass("buttoncb");
  $("#buttonveggie2, #buttonmeat2, #buttonother2").removeClass("buttoncb");
  $("#buttonveggie2, #buttonmeat2, #buttonother2").addClass("button");
};
 
window.sortother = function(){
  $(".cbmeat").addClass("recipearrow");
  $(".cbveggie").addClass("recipearrow");
  $(".cbother").removeClass("recipearrow");
  $("#buttonother2").removeClass("button");
  $("#buttonother2").addClass("buttoncb");
  $("#buttonall2, #buttonveggie2, #buttonmeat2").removeClass("buttoncb");
  $("#buttonall2, #buttonveggie2, #buttonmeat2").addClass("button");
  };
 
  $('#buttonmeat, #buttonveggie, #buttonother, #buttonall').click(function() {
       $(function() {
    $(".cookbook .sn img.lzy").each(function() {
        var dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', dataSrc);
        }
    });
  });
 
    $(function() {
    $(".cookbook .sy img.lzy").each(function() {
        var dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', dataSrc);
        }
    });
  });
});
 
$('<input id="buttonmeat2" class="button" onclick="sortmeat()" type="button" value="Мясное">').appendTo( "#buttonmeat" );
$('<input id="buttonveggie2" class="button" onclick="sortveggie()" type="button" value="Растительное">').appendTo( "#buttonveggie" );
$('<input id="buttonother2" class="button" onclick="sortother()" type="button" value="Другое">').appendTo( "#buttonother" );
$('<input id="buttonall2" class="button" onclick="sortall()" type="button" value="Всё">').appendTo( "#buttonall" );

/*Изменяет цвет у рамок в ответаx администраторов*/
/*I'm not sure if it's possible not to clear the interval*/
setInterval(function () {
	$('.wds-avatar a[href$="Arhhhat"]').closest('.Reply, .Reply_body__3woA9').addClass('Arhhhat');
	$('.wds-avatar a[href$="FruitShakeSB"]').closest('.Reply, .Reply_body__3woA9').addClass('FruitShakeSB');
	$('.wds-avatar a[href$="TheZhab"]').closest('.Reply, .Reply_body__3woA9').addClass('TheZhab');
}, 500 );

/*Окончание в слове страницы до фикса на UCP*/

$(function changePageCounterEndingRus(){
	if($('.wds-community-header__counter-label').length !== 0){
	var pageCount = (($('.wds-community-header__counter-value').text())%100);
	if(((pageCount >= 0) && (pageCount <= 10)) || ((pageCount >= 20) && (pageCount <= 99))){
	 if((pageCount%10 === 0) || ((pageCount%10 >= 5) && (pageCount%10 <= 9))){
	 	$('.wds-community-header__counter-label').text('Страниц');
	 }else if((pageCount%10 >= 2) && (pageCount%10 <=4)){
	 	$('.wds-community-header__counter-label').text('Страницы');
	 }else if(pageCount%10 == 1){
	 	$('.wds-community-header__counter-label').text('Страница');
	 }
	}else{
		$('.wds-community-header__counter-label').text('Страниц');
	}
	}
});

/*Связывание табберов и вкладок инфобокса*/

window.tabberLinkInfobox = function(title){
var childrenLi = $('.pi-section-label a[data-title='+title+']').parent();
childrenLi.parent().addClass('pi-section-active');
childrenLi.parent().siblings('.pi-section-tab').removeClass('pi-section-active');
var divContent = $('.pi-section-content[data-title='+title+']');
divContent.addClass('pi-section-active');
divContent.siblings('.pi-section-content').removeClass('pi-section-active');
}

$(function(){

if ($('ul').is('.pi-section-navigation')){
if(($('.pi-section-navigation').length) === 1){
$('.pi-section-label').each(function(){
var title = ($(this).html()).trim();
$(this).text('');

$('<a/>', 
{
href : ('#' + title),
text: title,
}
).appendTo(this);

$('.pi-section-content[data-ref='+ $(this).parent().attr('data-ref') +']').attr('data-title',title);
$(this).children('a').attr('data-title',title);
});

tabberInfoboxInterval = setInterval(tabberInfobox,50);
}
}
});
function tabberInfobox(){
if(($('.tabbernav > li > a[data-title]').length)!== 0){
$('.tabbernav > li > a').each(function(){
var title = $(this).attr('data-title');
$(this).attr('onclick', 'tabberLinkInfobox("'+title+'")');
});
clearInterval(tabberInfoboxInterval);
}
}

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