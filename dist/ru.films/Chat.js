/* Смена темы чата в зависимости отвремени суток. Автор неизвестен */

(function() {
    TimeCheck();
    function TimeCheck() {
        var currentTime = new Date();
        if (currentTime.getHours() > 20 || currentTime.getHours() < 9) {
            switchChatTheme('night');
            setTimeout(TimeCheck, calculateTimeout(8));
        } else {
            switchChatTheme('day');
            setTimeout(TimeCheck, calculateTimeout(21));
        }
    }
    
    function switchChatTheme(time) {
        switch(time) {
            case 'night':
                $('#ChatDay').remove();
                $('head').append('<link id="ChatNight" rel="stylesheet" href="/load.php?lang=ru&mode=articles&articles=User:Сибирский_Смотритель/night.css&only=styles" />');
                break;
            case 'day':
                $('#ChatNight').remove();
                $('head').append('<link id="ChatDay" rel="stylesheet" href="/load.php?lang=ru&mode=articles&articles=User:Сибирский_Смотритель/day&only=styles" />');
                break;
        }
    }
    
    function calculateTimeout(finishTime) {
        var currentTime = new Date();
        currentTime.setFullYear(2012, 11, 20);
        var day = 20;
        if (currentTime.getHours() >= finishTime) {
            day = 21;
        }
        var timeoutTime = new Date(2012, 11, day, finishTime);
        return timeoutTime - currentTime;
    }
})();