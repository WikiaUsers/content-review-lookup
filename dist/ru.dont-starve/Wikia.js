/* For Dmitry221060 */
// Достижения
if($('body.page-Участник_Dmitry221060').length || $('body.page-Служебная_Contributions_Dmitry221060').length || $('body.page-Блог_участника_Dmitry221060').length || $('body.page-Стена_обсуждения_Dmitry221060').length) {

$('#WikiaUserPagesHeader .tabs-container .tabs').append('<li><a href="/wiki/Участник:Dmitry221060/Achievements" title="Участник:Dmitry221060/Achievements">Достижения</a></li>');

}

//"Просто белый прямоугольник"
$(function () {
    $(".label").click(function() {
        if ($(".card").hasClass("card1"))
            $('.card').removeClass("card1");
        else
            $('.card').addClass("card1");
    });
});
/* End */

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
/*if($('#shovelcounter').length){
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
}*/