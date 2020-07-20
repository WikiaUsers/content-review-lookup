/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'Неактивный участник' 
};

importScriptPage('InactiveUsers/code.js', 'dev');
 
/** Автообновление страниц и очистка кэша **/
 
window.ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
window.AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
window.PurgeButtonText = 'Обновить'; //Отображаемое название
 
function addWikifButton() {
        var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ) // Monobook+Modern
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

//Снег
importScript('MediaWiki:Snow.js');


/**
 * VK like button widget
 */
//Loding script for a button
importScriptURI("http://vk.com/js/api/openapi.js?115");
window.onload = function() {
    //Initializing VK
    VK.init({apiId: 4446418, onlyWidgets: true});
    //Adding the button
    $('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "mini"});</script>').insertAfter('#WikiaPageHeader > .talk');
}


/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});


// Импорт http://dev.wikia.com
importArticles({
    type: 'script',
    articles: [        
		'u:dev:ReferencePopups/code.js',          // Всплывающие подсказки
    ]
});

//

/* Заглавная страница/Слайдер — начало*/
 
// ==UserScript==
// @name           Javascript Slider
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Creates animated slider with editable width and height.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
//Grab image URLs and set to variables
var slider1url = $('#slider1url').text();
var slider2url = $('#slider2url').text();
var slider3url = $('#slider3url').text();
var slider4url = $('#slider4url').text();
$('#slider1').addClass('linked');
 
//When panals are clickable, links to designated URL.
$('#slider1img').click(function(){
	if ($('#slider1').hasClass('linked')) {
		window.location.href = slider1url;
	}
});
 
$('#slider2img').click(function(){
	if ($('#slider2').hasClass('linked')) {
		window.location.href = slider2url;
	}
});
 
$('#slider3img').click(function(){
	if ($('#slider3').hasClass('linked')) {
		window.location.href = slider3url;
	}
});
 
$('#slider4img').click(function(){
	if ($('#slider4').hasClass('linked')) {
		window.location.href = slider4url;
	}
});
 
//Opens and closes panels when clicked.
 
$('#slider1').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked'); b
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider2').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider3').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	}
});
 
$('#slider4').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
		});
	}
});
 
//Scrolls through slider every 6 seconds
var scrolltimer = window.setInterval(autoScroll, 6000);
 
function autoScroll() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4').removeClass('opened').addClass('animated').animate({ width: "698px" }, "normal", "linear", function() {
			$('#slider4').removeClass('linked').removeClass('animated').dequeue();
			$('#slider1').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened');
		});
	}
}
 
//Turns off autoscroll on hover
$('#sliderframe').on("mouseenter",function(){
	scrolltimer = window.clearInterval(scrolltimer)
}).on("mouseleave",function(){
	scrolltimer = window.setInterval(autoScroll, 6000);
});
 
/* Заглавная страница/Слайдер — конец*/