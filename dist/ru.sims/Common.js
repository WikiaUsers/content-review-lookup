// 19:44, Jule 16, 2018 (UTC)
// <source lang="JavaScript">
/* Any JavaScript here will be loaded for all users on every page load. */

/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution */

window.vklikeapiid = 7260051; /* apiID для виджета VK */
 
AjaxRCRefreshText = 'Автообновление';
AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

// *****************************************************
// * Экспериментальный JS скрипт таймера (Splarka)     *
// * Версия 0.0.3                                      *
// *****************************************************
//
// Пример использования:
//  <span class="countdown" style="display:none;">
//  Всего лишь <span class="countdowndate">January 01 2007 00:00:00 PST</span> до нового года.
//  </span>
//  <span class="nocountdown">JavaScript отключен.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
        ''
    } else {
        var tpm = '';
        ''
    }
 
    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - конец -  Экспериментальный JS код таймера     *
// **************************************************

/** Закрывающиеся таблицы *********************************************************
 *
 *  Описание: Позволяет закрывать таблицы, показывая только заголовок. Смотри
 *               [[Wikipedia:ru:NavFrame]].
 *  Взять с Common.js Википедии.
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
var autoCollapse = 2;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "5em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
 
addOnloadHook(createCollapseButtons);
  
/** Динамический навигационный бар (экспериментальный) *******************************
 *
 *  Описание: Смотри [[Wikipedia:ru:NavFrame]].
 *  Взято с Common.js Википедии.
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
 
 
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
        var NavChild = NavFrame.firstChild;
        NavChild != null;
        NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;
 
        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
        var NavChild = NavFrame.firstChild;
        NavChild != null;
        NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// добавляет показать/скрыть кнопку навигации
  
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    var divs = document.getElementsByTagName("div");
    for (
    var i = 0;
    NavFrame = divs[i];
    i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (
            var NavChild = NavFrame.firstChild;
            NavChild != null;
            NavChild = NavChild.nextSibling) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }
 
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for (
            var j = 0;
            j < NavFrame.childNodes.length;
            j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook(createNavigationBarToggleButton);
 
// **************************************************
// Скрытые пространства имен в категориях (Splarka)
// **************************************************
// Быстрый скрипт, скрывающий префиксы пространства имён в списке категорий. Просто добавьте
// <div id="catnoprefix" style="display:none;"></div>
// на страницу описания, что активировать его.
 
$(function catprefix() {
    if ($('#catnoprefix').length > 0) {
        var anchors = document.getElementById('mw-pages').getElementsByTagName('a');
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].firstChild.nodeValue.indexOf(':') != -1) {
                anchors[i].firstChild.nodeValue = anchors[i].firstChild.nodeValue.substring(anchors[i].firstChild.nodeValue.indexOf(':') + 1);
            }
        }
    }
});
 
// **************************************************
//  - конец -  Скрытые пространства имен в категориях
// **************************************************
/* Замена имени участника
 * Вставьте новое имя участника в <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}
 
/* Custom edit buttons
See http://help.wikia.com/wiki/Help:Custom_edit_buttons
 */
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sims/images/d/d2/Dash_button.png/revision/latest?cb=20180628191406&path-prefix=ru",
		"speedTip": "Тире",
		"tagOpen": "—",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sims/images/4/46/Redirect_button.png/revision/latest?cb=20180628191407&path-prefix=ru",
		"speedTip": "Перенаправление",
		"tagOpen": "#перенаправление [[",
		"tagClose": "]]",
		"sampleText": "Ведите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sims/images/e/e1/Commas_button.png/revision/latest?cb=20180628191405&path-prefix=ru",
                    "speedTip": "Кавычки",
                    "tagOpen": "«",
                    "tagClose": "»",
                    "sampleText": "Текст"
	};
}
/* Конец */
 
var $tfb;
 
// скрывает подсказки
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}
 
// отображает всплывающие подсказки
function displayTip(e) {
    $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $tfb.not(":empty").css("visibility", "visible");
}
 
// перемещает подсказки
function moveTip(e) {
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($tfb.not(".hidden").innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($tfb.not(".hidden").innerWidth() + 20) : 20);
    $tfb.not(".hidden").css({
        "position": "fixed",
            "top": newTop + "px",
            "left": newLeft + "px"
    });
}



 
// подсказки AJAX
function showTip(e) {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        $tfb.load("/" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "?action=render div.tooltip-content", function () {
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            displayTip(e);
        });
    }
}
 
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// проверь, чтобы он был активен
$(function () {
    $("#bodyContent").mouseover(hideTip);
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
});
 
/* Конец скрипта подсказок */
 
/* PCJ's dup finder start */
dil = new Array();
 
function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function (data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("Файл::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>Файл:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}
$(function () {
    if ($("#mw-dupimages").length) findDupImages();
}); /* PCJ's dup finder end */
 
// *************************************************
// изменяет надпись профиля на отдельных страницах
//
// Сейчас код нарушен /подстраницы - отключение
// *************************************************
/* if (wgCanonicalNamespace === "Стена_обсуждения" || wgCanonicalNamespace === "Участник") {
    if (document.getElementById('UserProfileMasthead').getElementsByClassName('group').length === 1) {
        if (document.getElementById('adm-changetitle') !== null) {
            document.getElementById('UserProfileMasthead').getElementsByClassName('group')[0].innerHTML = document.getElementById('adm-changetitle').innerHTML;
        }
    }
} */
 
$(function() {
    if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
        var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
        then = new String(then.match(/\d{8}/));
        var monthnames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        var year = then.match(/^\d{4}/);
        var month = then.substring(4, 6);
        month--;
        month = monthnames[month];
        var day = then.match(/\d{2}$/);
        then = new Date(month + '' + день + ', ' + год);
        var old = parseInt(now - then);
        old = Math.floor(old / (1000 * 60 * 60 * 24));
        if (old > 30) {
            $('#article-comm').attr('disabled', 'disabled').text('Это сообщение в блоге было прокомментировано более 30 дней назад. Там нет необходимости комментировать.');
            $('#article-comm-submit').attr('disabled', 'disabled');
            $('.article-comm-reply').remove();
        }
    }
});
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* Быстро добавление лицензии. Taken from w:c:sims:User:Lost_Labyrinth/general/quicklicense.js */
/* Quick image license - contains the most commonly used licensing criteria */
/* THIS SCRIPT IS CURRENTLY NOT WORKING IN OASIS - blame Wikia's file page layout adjustments. Still works in Monobook though. */
function QLicenseUI() {
	var options = {
		'== Лицензирование ==\n{{Copyright by EA|fanon}}': 'Fanon image',
		'== Лицензирование ==\n{{Copyright by EA|sim1}}': 'Sim from TS1',
                '== Licensing ==\n{{Copyright by EA|ss1}}': 'Screenshot from TS1',
                '== Licensing ==\n{{Copyright by EA|lot1}}': 'Lot from TS1',
                '== Licensing ==\n{{Copyright by EA|sim2}}': 'Sim from TS2',
                '== Licensing ==\n{{Copyright by EA|ss2}}': 'Screenshot from TS2',
                '== Licensing ==\n{{Copyright by EA|lot2}}': 'Lot from TS2',
		'== Licensing ==\n{{Copyright by EA|sim3}}': 'Sim from TS3',
                '== Licensing ==\n{{Copyright by EA|ss3}}': 'Screenshot from TS3',
                '== Licensing ==\n{{Copyright by EA|lot3}}': 'Lot from TS3',
        '== Licensing ==\n{{Copyright by EA|sim4}}': 'Sim from TS4',
                '== Licensing ==\n{{Copyright by EA|ss4}}': 'Screenshot from TS4',
                '== Licensing ==\n{{Copyright by EA|lot4}}': 'Lot from TS4',
                '== Licensing ==\n{{Copyright by EA|simls}}': 'Sim from Life Stories',
                '== Licensing ==\n{{Copyright by EA|lotls}}': 'Lot from Life Stories',
                '== Licensing ==\n{{Copyright by EA|ssls}}': 'Screenshot from Life Stories',
                '== Licensing ==\n{{Copyright by EA|simps}}': 'Sim from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|lotps}}': 'Lot from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|ssps}}': 'Screenshot from Pet Stories',
                '== Licensing ==\n{{Copyright by EA|lotcs}}': 'Lot from Castaway Stories',
                '== Licensing ==\n{{Copyright by EA|sscs}}': 'Screenshot from Castaway Stories',
                '== Licensing ==\n{{Copyright by EA|simcon}}': 'Sim from a console game',
                '== Licensing ==\n{{Copyright by EA|sscon}}': 'Screenshot from a console game',
                '== Licensing ==\n{{Copyright by EA|obj}}': 'An object',
                '== Licensing ==\n{{Copyright by EA|pet}}': 'A pet',
                '== Licensing ==\n{{Copyright by EA|box}}': 'Box art',
                '== Licensing ==\n{{Copyright by EA|obj}}': 'An object',
                '== Licensing ==\n{{Copyright by EA|mem}}': 'A memory',
                '== Licensing ==\n{{Copyright by EA|mood}}': 'A moodlet',
                '== Licensing ==\n{{Copyright by EA|moodnf}}': 'A moodlet with no frame',
                '== Licensing ==\n{{Copyright by EA|trait}}': 'A trait',
                '== Licensing ==\n{{Copyright by EA|zodiac}}': 'A zodiac sign',
                '== Licensing ==\n{{Copyright by EA|logo}}': 'A game logo or icon',
                '== Licensing ==\n{{Copyright by EA|waf}}': 'A want or fear',
                '== Licensing ==\n{{Copyright by EA|interface}}': 'Something from the game interface',
                '== Licensing ==\n{{Copyright by EA|promo}}': 'A promotional image',
                '== Licensing ==\n{{Copyright by EA}}': 'Something else from The Sims series/other EA-copyrighted image',
                '== Licensing ==\n{{Copyrighted by Wikia|obj}}': 'Something part of the Wikia interace',
		'== Licensing ==\n{{Fairuse}}': 'Fair use',
                '== Licensing ==\n{{cc-by-sa-3.0}}': 'This is licensed under Creative Commons Attribution 3.0 (free license)',
                '== Licensing ==\n{{GFDL}}': 'This is licensed under GFDL (free license)',
                '== Licensing ==\n{{PD}}': 'Public domain',
                '== Licensing ==\n{{No license}}': 'License unknown'
		};
	var optstr = '';
	for ( i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Добавить лицензию</a>';
	if($('#LicensedFile').length || $('#Лицензирование').length) {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">У этого файла проставлена лицензия.</span></p>';
	} else {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">У этого файла не проставлена лицензия.</span></p>';
	}
	$('#filetoc').append(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Лицензирование изображения."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}

var body = document.querySelector("body");

if (body.classList.contains('ns-6')) {
	addOnloadHook(QLicenseUI);
}

// Add 'Like' button at the top of the page
// Добавляет кнопку "Мне нравится" в начале страницы

if (body.classList.contains('ns-0') && !(body.classList.contains('page-Заглавная_страница'))) {
    $(".mw-content-text").prepend('<div id="vk_like" data-type="mini"></div>');
}

// Removes Slider from Home page if it loads in Monobook
// Удаляет слайдер на заглавной, если страница загружена в монобуке
var slider = document.getElementById("portal_slider");

if (body.classList.contains('page-Заглавная_страница') && body.classList.contains('skin-monobook')) {
      slider.parentNode.removeChild(slider);
}

//Настройки для pagePreview (by Borderlands Wiki)
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://vignette.wikia.nocookie.net/sims/images/4/47/Placeholder.png/revision/latest?cb=20181213163400&format=original&path-prefix=ru',
    RegExp: {
        iimages: [new RegExp('^([Ff]ile:|[Фф]айл:)?Indef\\.png$')],
        ipages: [new RegExp('.*?Дерево[_ ]навыков.*')],
        ilinks: [new RegExp('.*?Дерево[_ ]навыков.*')],
    },
});

/* UserTags */
window.UserTagsJS = {
	modules: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'vstf'];

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};