/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/326326755822534656/embed.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома.' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/dont-starve/images/d/d8/DS_WIKI.png/revision/latest?cb=20190307125021&path-prefix=ru" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr>' +
                        '<h4>Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        if (v.id == "326476628152811520") {
            $member.append('<a href="http://ru.dont-starve.wikia.com/wiki/Участник:Dmitry221060">Dmitry221060</a>');
        } else if (v.id == "297241566500618240"){
            $member.append('<a href="http://ru.dont-starve.wikia.com/wiki/Участник:Agent Smit">Agent Smit</a>');
        } else if (v.nick) {
            $member.append('<a href="http://ru.dont-starve.wikia.com/wiki/Участник:' + v.nick + '">' + v.nick + (v.bot ? ' <span class="discord-bot">BOT</span>' : '') + '</a>');
        } else {
            v.username = v.username.replace(/<|>|\//g, '');
            $member.append('<a href="http://ru.dont-starve.wikia.com/wiki/Участник:' + v.username + '">' + v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : '') + '</a>');
        }
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();



/* For Dmitry221060 */
// Достижения
if($('body.page-Участник_Dmitry221060').length || $('body.page-Служебная_Contributions_Dmitry221060').length || $('body.page-Блог_участника_Dmitry221060').length || $('body.page-Стена_обсуждения_Dmitry221060').length) {

$('#WikiaUserPagesHeader .tabs-container .tabs').append('<li><a href="/wiki/Участник:Dmitry221060/Achievements" title="Участник:Dmitry221060/Achievements">Достижения</a></li>')

}

//"Просто белый прямоугольник"
$(function () {
    $(".label").click(function() {
        if ($(".card").hasClass("card1"))
            $('.card').removeClass("card1");
        else
            $('.card').addClass("card1");
    });
})
/* End */


/* Логи - выделение банов/киков, перенаправление на сегодняшние логи */
$(function () {
    if (window.location.href.indexOf("Don%27t_Starve_%D0%B2%D0%B8%D0%BA%D0%B8:Chat/Logs/Today") + 1 && !(window.location.href.indexOf('?redirect=no') + 1)) { //Если мы на странице-перенаправлении и нам НЕ нужно на ней остаться
        var d = new Date()
        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var date = d.getUTCDate() + '_' + monthNames[d.getUTCMonth()] + '_' + d.getUTCFullYear()
        location.href = 'http://ru.dont-starve.wikia.com/wiki/Don%27t_Starve_вики:Chat/Logs/'+date; //Отправить на сегодняшние логи
    } else if (window.location.pathname.indexOf("Don%27t_Starve_%D0%B2%D0%B8%D0%BA%D0%B8:Chat/Logs") + 1 || $('pre.ChatLog').length) { //Если мы в логах - выполнить скрипт
        var repLog = $('.ChatLog').text() //Получаем текст логов
        repLog = repLog.replace(/</g, '&#60') //Режем "<" во избежание конфликтов присваивания
        repLog = repLog.replace(/>/g, '&#62') //Режем ">" во избежание конфликтов присваивания
        repLog = repLog.replace(/{\/red}/g, '</span>') //Заменяем {/red} на </span>
        repLog = repLog.replace(/{red}/g, '<span style="color:red; font-weight:600;">') //Заменяем {red} на <span style="color:red; font-weight:600;">
        $('.ChatLog').html(repLog) //Сохраняем
    }
})

/* "Шаблон:Советы" - при нажатии на кнопку, если советы скрыты, появляется текст "Советы показаны!"; если советы открыты, появляется текст "Советы скрыты!" */
$('.specialcustomtipsbutton').click(function () {
	if($("#mw-customcollapsible-ShowSpoiler").css('display') === 'none') {
        $('.spoiler-success-showtext').text('Советы показаны!');
         setTimeout(function() {
    $('.spoiler-success-showtext').text(' ');
  }, 600);
	}
   else {
        $('.spoiler-success-hidetext').text('Советы скрыты!');
         setTimeout(function() {
    $('.spoiler-success-showtext').text(' ');
  }, 600);
}});

/* Мой профиль */
/** "Прогрузка" страницы **/
if($('#custom-dash').length){
var dashCount = 0;
var doneStatus = false;
var dashAfterCount = 0;

setInterval(function(){
	if(dashCount === 8)
		doneStatus = true;
	if(dashCount === 0 || dashCount === 4)
		$('#custom-dash').text('\\');
	else if(dashCount === 1 || dashCount === 5)
		$('#custom-dash').text('|');
	else if(dashCount === 2 || dashCount === 6)
		$('#custom-dash').text('/');
	else if(dashCount === 3 || dashCount === 7)
		$('#custom-dash').text('-');
	dashCount++;
	if(doneStatus){
		clearInterval(this);
		setInterval(function(){
			if(dashAfterCount <= 55){
				$('#custom-dash').append('-');
				dashAfterCount++;
			}
			else {
				clearInterval(this);
				$('#custom-dash').animate({
					marginTop: "+=5000"
				}, 5000, 'linear', function(){
					$('#custom-dash').remove();
				}
			);
			}
		}, 12);
		}
}, 110);
}

/** Мини-игра **/
if($('#shovelcounter').length){
function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
}

var randomX, randomY, timeoutShovel;
var shovelCount = 0;
var sanityCount = 100;
$('#shovelcount').text(shovelCount);
$('#sanitycounter').text(sanityCount);

function shovelRandom(){
$('div#shovelrng').remove();
clearTimeout(timeoutShovel);
var lucky = getRandomInt(0, 100);
if(lucky < 5){
	randomXX = getRandomInt(0, 400);
	randomYY = getRandomInt(0, 430);
	$('#boxshovel').prepend('<div id="shovelrng" style="display: inline-block; width: 64px; height: 64px"></div>');
	$('#shovelrng').css({
		'margin-left': randomXX+'px',
		'margin-top': randomYY+'px'
	});
	$('#shovelrng').click(function(){
	$('#shovelrng').remove();
	shovelCount += 100;
	if(sanityCount > 20){
		sanityCount -= 20;
		$('#shovel').css('opacity', '0.'+sanityCount);
		$('#boxshovel').css('box-shadow', 'inset 0 0 '+(82 - sanityCount)+'1px darkred');
		$('#sanitycounter').text(sanityCount);
	}
	$('#shovelcount').text(shovelCount);
	});
}

randomX = getRandomInt(0, 630);
randomY = getRandomInt(0, 430);
	
$('#shovel').css({
	'margin-left': randomX+'px',
	'margin-top': randomY+'px'
});

shovelCount++;
$('#shovelcount').text(shovelCount);
timeoutShovel = setTimeout(function(){
	$('#shovelrng').fadeOut();
	$('#shovel').fadeOut();
	$('#shovelcounter').html('Кролик убежал! Набранные очки: '+shovelCount+' <button onclick="document.location.reload(true);">Перезапустить</button>');
	}, 1000);
}

$('#shovel').click(function(){
	shovelRandom();
});
}