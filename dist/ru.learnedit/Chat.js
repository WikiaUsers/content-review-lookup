(function() {
    function TimeCheck() {
        var currentTime = new Date();
        if (currentTime.getHours() > 20 || currentTime.getHours() < 9) {
            switchChatTheme('night');
            setTimeout(TimeCheck, calculateTimeout(9));
        } else {
            switchChatTheme('day');
            setTimeout(TimeCheck, calculateTimeout(20));
        }
    }
 
    function switchChatTheme(time) {
        //Сибирь1
        if (time == 'night') {
            $("body").css({
                "background": 'url("https://vignette.wikia.nocookie.net/films/images/5/56/%D0%9D%D0%BE%D1%87%D0%BD%D0%BE%D0%B9%D1%87%D0%B0%D1%82.jpg/revision/latest?cb=20150801123849&path-prefix=ru") repeat scroll',
                "background-position": "103% 0%",
                "color": "white"
            });
            $(".you, .WikiaPage, .ChatHeader").css({
                "background": "transparent",
                "color": "white"
            });
            $("a").css("color", "#47B3D0"); 
 
        } else if (time == 'day') {
            //Сибирь2
            $("body").css({
                "background": '#BACDD8 repeat scroll',
                "background-position": "0% 0%",
                "color": "#3A3A3A"
            });
            $(".you, .WikiaPage, .ChatHeader").css({
                "background": "#D4E6F7",
                "color": "#3A3A3A"
            });
            $("a").css("color", "#006CB0");
        }
 
    }
    function calculateTimeout(finishTime) {
        var currentTime = new Date();
        currentTime.setFullYear(2010, 9, 10);
        var day = 10;
        if (currentTime.getHours() >= finishTime) {
            day = 11;
        }
        var timeoutTime = new Date(2010, 9, day, finishTime);
        return timeoutTime - currentTime;
    }
})();