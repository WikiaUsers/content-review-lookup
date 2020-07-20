                            //Для блока цитат

$(function () { 
  var $number = Math.round(Math.random()*10); //Рандомайзер
  $(".quote div").hide();
  if (($number == 10) || ($number == 9)) { 
    $(".quote #one").toggle();
  }
  else if (($number == 8) || ($number == 7)) { 
    $(".quote #two").toggle();
  }
  else if (($number == 6) || ($number == 5)) { 
    $(".quote #three").toggle();
  }
  else if (($number == 2) || ($number === 1)) { 
    $(".quote #four").toggle();
  }
  else {
    $(".quote #five").toggle();
  }
});

                            //Для галереи

$(function () {
  $(".itemGallery a").removeAttr("title"); //Удаляем подсказку у линков
  $(".itemGallery img").removeAttr("title"); //Удаляем подсказку у пикч
});

        /*Скрипт для работы <span class="insertusername"></span>*/

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

                            //Временной скрипт

$(function () {
    var date = new Date();			//Создаём объект Date
    var hours = date.getHours();	//Получаем время в часах
    $("head").append("<style type='text/css'></style>");//Создаём новую таблицу стилей
//Для изменения темы используем :root
    function addRoot(mainBackground, wdsBackground, railBackground, mainColor, mainColorDarkHue, wdsHeaderColor, wdsHeaderHoverColor) {
    	$("head style:last-child").html(":root { --main-background: url('https://imgur.com/" + mainBackground + ".jpg'); --wds-background: url('https://imgur.com/" + wdsBackground + ".png'); --rail-background:  url('https://imgur.com/" + railBackground + ".png'); --main-color: " + mainColor + "; --main-color-dark-hue: " + mainColorDarkHue + "; --wds-header-color: " + wdsHeaderColor + "; --wds-header-hover-color: " + wdsHeaderHoverColor + ";}");
    }
//Для часиков
    $(".WikiaPage").after("<div class='timeClock' title='Кликните, чтобы открыть подсказку'><div class='clock'><div class='clockHand'></div></div></div><div id='hintBlock'><div id='hint'></div><div id='machine'><div class='gear1'></div><div id='default'></div><div class='gear2'></div></div></div>");
    $(".clockHand").css("transform","rotate(" + hours*15 + "deg)");//Вращаем стрелку в соответствии с временем суток (24ч)
    //Подсказка
    $(".timeClock").click(function () {
        if ($("#hintBlock").hasClass("clicked") === false) {
    	    $("#hintBlock").addClass("clicked");
    	    $(".timeClock").attr("title","Кликните снова, чтобы скрыть");
    	}
    	else {
    	    $("#hintBlock").removeAttr("class");
    	    $(".timeClock").attr("title","Кликните, чтобы открыть панель");
    	}
    });
//Задаём временные изменения + сообщение/подсказка
    if ((hours === 0) || (hours < 6)) {
	    addRoot("Gc1fEr9", "eOeAAEE", "JD1lW1Q", "#252330", "#170e13", "rgba(51,45,69,0.2)", "rgba(51,45,69,0.4)");
		$("#hint").text("Вы ещё не спите? Такие участники нужны проекту!");
    }
    else if ((hours > 5) && (hours < 12)) {
    	addRoot("R3e0VKb", "c7LQEeg", "ECnFEDq", "#31210a", "#1b0e08", "rgba(49,33,10,0.2)", "rgba(49,33,10,0.4)");
		$("#hint").text("Доброго утра посетителям Deep Town Wiki!");
    }
    else if ((hours > 17) && (hours < 23) || (hours == 23)) {
    	addRoot("hyQAD5p", "RsKPLhz", "4MOvzuP", "#2c2c34", "#1a1a1f", "rgba(30,30,30,0.2)", "rgba(30,30,30,0.4)");
		$("#hint").text("Добрый вечер, вы посетили Вики по игре Deep Town.");
    }
    else {
    	addRoot("foD0Vw6", "3uLmIGr", "NVsQoFm", "#5d2223", "#1b0300", "rgba(93,34,35,0.2)", "rgba(93,34,35,0.4)");
		$("#hint").text("Добрый день, приветствуем на Deep Town Вики!");
    }
});
                        //Для шаблона "Астероиды"
$(function () {
    function asteroidInfo(letter, first, second, third) {
        $("#ast-panel #ast-info #ast-name").text(letter + first + second + third);
        $("#ast-panel #ast-info #ast-group").text(letter);
        $("#ast-panel #ast-info #ast-content").load("https://deep-town.fandom.com/ru/wiki/База_данных/Астероиды_" + letter + first + " div#" + second + third, function () {
            if ($("#ast-panel #ast-info #ast-content div").hasClass("epic") === true) {
                $("#ast-panel #ast-info #ast-rarity").html("<span style='color: #91b321;'>ЭПИЧЕСКИЙ</span>");
                $("#ast-panel #ast-info #ast-content").siblings().hide();
            }
            else if ($("#ast-panel #ast-info #ast-content div").hasClass("legendary") === true) {
                $("#ast-panel #ast-info #ast-rarity").html("<span style='color: #6600cc;'>ЛЕГЕНДАРНЫЙ</span>");
                $("#ast-panel #ast-info #ast-content").siblings().hide();
            }
            else {
                $("#ast-panel #ast-info #ast-rarity").html("ОБЫЧНЫЙ");
                $("#ast-panel #ast-info #ast-content").siblings().show();
            }
        });
    }
    $(".input-item div:first-child").addClass("current"); //Устанавливаем класс на первые знаки
    $("#ast-panel #ast-info table").first().addClass("show"); //Открываем первую таблицу
    $("#ast-panel #ast-buttons div").first().addClass("current"); //Добавляем класс первой кнопке групп
    $("#ast-panel #input-but #group-letter").text("A"); //Устанавливаем текущую букву группы
    asteroidInfo("A","A","0","0");//Подгружаем информацию о первом астероиде
    //Перемещение вверх по знакам (анимация)
    $("#input-but td img:first-child").click( function () {
        if ($(this).siblings(".input-item").children().last().hasClass("current") === false) {
            var $this = $(this).siblings(".input-item").children(".current");
            $this.next().addClass("current");
            $(this).siblings(".input-item").children().animate({
                bottom: "+=22px"
            }, 300, "linear", function() {
                $this.removeClass("current");
            });
        }
    });
    //Перемещение вниз по знакам (анимация)
    $("#input-but td img:last-of-type").click( function () {
        if ($(this).siblings(".input-item").children().first().hasClass("current") === false) {
            var $this = $(this).siblings(".input-item").children(".current");
            $this.prev().addClass("current");
            $(this).siblings(".input-item").children().animate({
                bottom: "-=22px"
            }, 300, "linear", function() {
                $this.removeClass("current");
            });
        }
    });
    //Группы астероидов
    function writeLetter(letter) {$("#ast-panel #input-but #group-letter").text(letter);}
    $("#ast-panel #ast-buttons div").eq(0).click( function () {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        writeLetter("A");
    });
    $("#ast-panel #ast-buttons div").eq(1).click( function () {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        writeLetter("B");
    });
    $("#ast-panel #ast-buttons div").eq(2).click( function () {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        writeLetter("C");
    });
    //Поиск астероидов
    $("#ast-panel #search").click( function () {
        var letter = $("#ast-panel #input-but #group-letter").text();     //Буква номера
        var first = $("#ast-panel #input-but .first .current").text();    //Буква номера
        var second = $("#ast-panel #input-but .second .current").text();  //Первая цифра
        var third = $("#ast-panel #input-but .third .current").text();    //Вторая цифра
        asteroidInfo(letter, first, second, third);
    });
});