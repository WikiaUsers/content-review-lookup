/* Часы */
$(function() {
	$(".WikiaPage").after('<div class="clock"><a href="?action=purge" title="Нажмите здесь, чтобы очистить кэш и обновить страницу."><div class="hours-container"><div class="hours"></div></div><div class="minutes-container"><div class="minutes"></div></div><div class="seconds-container"><div class="seconds"></div></div></a></div>');
});

$(function() {
    //Узнаём время и создаём объект, хранящий стрелки и их углы
    var date = new Date(), seconds = date.getSeconds(), minutes = date.getMinutes(), hours = date.getHours(), hands = [ {hand: 'hours', angle: (hours * 30) + (minutes / 2)}, {hand: 'minutes', angle: (minutes * 6)}, {hand: 'seconds', angle: (seconds * 6)} ];
    
    //С помощью цикла устанавливаем углы для стрелок
    for (var j = 0; j < hands.length; j++) {
        var elements = $("." + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
    
    function setUpMinuteHands() {
        // Вычисляем, сколько секунд прошло с начала этой минуты
        var containers = document.querySelectorAll('.minutes-container');
        var secondAngle = containers[0].getAttribute("data-second-angle");
        if (secondAngle > 0) {
            // Устанавливаем таймаут до конца текущей минуты, чтобы передвинуть стрелку
            var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
            setTimeout(function() {
                moveMinuteHands(containers);
            }, delay);
        }
    }
    
    //Выполняем первый поворот минутной стрелки
    function moveMinuteHands(containers) {
        for (var i = 0; i < containers.length; i++) {
            containers[i].style.webkitTransform = 'rotateZ(6deg)';
            containers[i].style.transform = 'rotateZ(6deg)';
        }
        // После этого продолжаем с интервалом в 60 секунд
        setInterval(function() {
            for (var i = 0; i < containers.length; i++) {
                if (containers[i].angle === undefined) {
                    containers[i].angle = 12;
                } 
            else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
            }
        }, 60000);
    }
});

/*Для шаблона находок*/
 $(function() {
    $( '#subject a' ).wrap( '<li></li>' );
});