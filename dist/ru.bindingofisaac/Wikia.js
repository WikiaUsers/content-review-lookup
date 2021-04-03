//Шаблон:RailModule
window.AddRailModule = [
    { page: 'Template:RailModule2', },
    'Template:RailModule',
];

//Стиль бек кнопки
window.BackToTopModern = true;

//Подключение для интерактивной таблицы
if (mw.config.get('wgPageName') === 'Интерактивная_таблица_артефактов') {
    importArticle({ type: 'script', article: 'MediaWiki:Items.js' });
}

//Подсветка кнопок сортировки
$(document).on('click', '.rentable_sort span', function(){
	  $(this).addClass('active_ita').siblings().removeClass('active_ita')
})

//Подсветка активной статьи
if ($('#blight').length) {
   $('#blight > .ibox .sn[data-title="' + mw.config.get('wgPageName') + '"]').addClass("snlight");
}


//Переключатель для инт. таблицы (и возможно для других элементов)
  $(function () {
        $('.switch-btn').click(function () {
            $(this).toggleClass('switch-on');
            if ($(this).hasClass('switch-on')) {
                $(this).trigger('on.switch');
            } else {
                $(this).trigger('off.switch');
            }
        });
        $('.switch-btn').on('on.switch', function () {
            $($(this).attr('data-id')).removeClass('bl-hide');
        });
        $('.switch-btn').on('off.switch', function () {
            $($(this).attr('data-id')).addClass('bl-hide');
        });
    });
    
//Переключатель для таблицы артефактов
  $(function () {
        $('.switch-btn2').click(function () {
            $(this).toggleClass('switch-on');
            if ($(this).hasClass('switch-on')) {
                $(this).trigger('on.switch');
            } else {
                $(this).trigger('off.switch');
            }
        });
        $('.switch-btn2').on('on.switch', function () {
            $($(this).attr('data-id')).removeClass('tb_light_bx');
        });
        $('.switch-btn2').on('off.switch', function () {
            $($(this).attr('data-id')).addClass('tb_light_bx');
        });
    });    
    
    
// Панель сортировки для таблицы    
mw.loader.using('mediawiki.api').then(function() {
    if (mw.config.get('wgPageName') !== 'Интерактивная_таблица_артефактов') {
        return;
    }

    var params = {
        action: "parse",
        page: "Шаблон:Ita/Sort",
        prop: "text",
        formatversion: "2",
        format: "json"
    };

    api = new mw.Api();
    api.get(params).done(function (data) {
        var res = data['parse']['text'];
        $('#WikiaRail').prepend('<div class="rail-module">' + res + '</div>');
    });
});
    
    



//Превью предметов через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-monster',
    parse: '{{#invoke:getdata|infobox|<#article#>|Монстр Rebirth}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет Rebirth}}'
},


{
    classname: 'tooltip-trinket',
    parse: '{{#invoke:getdata|infobox|<#article#>|Брелок}}'
},

{
    classname: 'tooltip-info',
    parse: '{{#invoke:getdata2|div|<#article#>|Инфо}}'
}


];


//Кнопочки для страницы Four Souls
$('.cardb1').click(function(){
    $('.card1').show();
    $('.card2').hide();
});

$('.cardb2').click(function(){
    $('.card1').hide();
    $('.card2').show();
});



//Запасные кнопки для карт 
$('.me-button-uups').click(function(e) {
    // открытие карт
    $('.WikiaMainContent').toggleClass('uups');
    $(this).toggleClass('wds-is-secondary');
});

//Нав. фан карта
$('.me-button-uups').click(function(e) {
    // открытие карт
    $('.trjmap1').toggleClass('trjmap2');
    $(this).toggleClass('wds-is-secondary');
});




//Подложка (используется в инт. таблице, большой таблице, постере)
if ($('#noMap').length) {
    $('body').append('<div style="display:none" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
    if (!$('#noMap').is('.hiddenMap')) { //Отображает её, если требуется
          $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
          $('#forMap').attr({"style":"display:block"});
     }
 
    $('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
        if(e.target.id == "forMap"){
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
            $('#forMap').attr({"style":"display:none"});
        }
    });
 
    $('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
        $('#forMap').attr({"style":"display:block"});
    });
}

/*Костыль музыки для полотна*/
switch ( mw.config.get('wgPageName') ) {
    case 'TBoI_Wiki_Discord_Сервер':
    	(function () {
	// Build the iframe
	const scPlayer = function (data) {
		const widget = document.createElement('iframe');

		widget.classList.add('soundcloud-player');

		widget.src =
			'https://w.soundcloud.com/player/?show_artwork=false&url=' +
			encodeURI(data.src);

		// If data-color is set add the value to the iframe
		if (data.color) widget.src += '&color=' + encodeURIComponent(data.color);
		// If data-width/height are set add that value to the iframe
		if (data.width) widget.width = data.width;
		if (data.height) widget.height = data.height;

		return widget;
	};

	const scParseTags = function ($content) {
		// Get all instances of the soundcloud class
		const scTags = $('.soundcloud');

		// For each instance of the soundcloud class run scPlayer
		for (var i = 0; i < scTags.length; i++) {
			scTags[i].replaceWith(scPlayer(scTags[i].dataset));
		}
	};

	mw.hook('wikipage.content').add(function ($content) {
		scParseTags($content);
	});
})();
        break;
}

//Slider for my DC wiki
mw.loader.load('https://dead-cells.fandom.com/ru/wiki/MediaWiki:HSlider.js?action=raw&ctype=text/javascript');

 
//Кликабельная деятельность (Димон)

function addLinkInActivityModule() {
    if ($("#WikiaRail section").length >= 2)
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/ru/wiki/Служебная:RecentChanges'>")
    else
        setTimeout(addLinkInActivityModule, 500)
}
addLinkInActivityModule()



//Выдача рандомных параметров (Димон)   (профиль и плеер на заглавной)
function randomize() {
    if ($('#randomValue').length === 0) return; //Если на странице нечего рандомизировать - выйти и функции
    if ($('#randomValue span.randItem').length === 0) return; //Если на странице нечего рандомизировать - выйти и функции
    window.randomValueM = []; //Глобальная переменная с вариантами для рандомизации
    for (i=0;i<$('#randomValue span.randItem').length;i++) //Заполняем переменную
        randomValueM[i] = $('#randomValue span.randItem')[i].innerHTML;
    $('#randomValue').html(randomValueM[Math.floor(Math.random() * randomValueM.length)]); //Записываем случайно выбранный вариант
}
randomize(); //Вызов функции для первичной рандомизации

function reRandomize() { //Функция реролла
    $('#randomValue').html(randomValueM[Math.floor(Math.random() * randomValueM.length)]); //Записываем случайно выбранный вариант
    if ($('#randomValue span.Others').length && $('#randomValue span.Others').attr('data-widget-id')) { //Если в элементе присутствует плеер 
        elem = $('#randomValue span.Others')[0]; //Запомнить его
        elem.innerHTML='<audio controls="" ' + encodeURIComponent(elem.getAttribute("data-widget-ap")) + ' class="naudio"><source src="' + elem.getAttribute("data-widget-id") + '" type="audio/mp3">Ваш браузер не поддерживает тэг audio.</audio>'; //И прогрузить в него музыку
    }
}

$('body').on('click', '#reRandomize', reRandomize); //Рероллить содержимое при нажатии на кнопку


//Скрипт плеера на заглавной и в профиле
$('.trjplay-icon').click(function (){
  $(this).addClass('trjplay-icon-active');
  setTimeout(function() {
    $('.trjplay-icon').removeClass('trjplay-icon-active');
  }, 900);
 
});

$(document).ready(function() {
  var obj = document.createElement("audio");
  obj.src = "https://bindingofisaac.fandom.com/ru/wiki/special:Filepath/Satan_charge_up.ogg";
  obj.volume = 0.5;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;
 
  $(".trjplay-icon").click(function() {
    obj.play();
    // obj.pause();
  });
});