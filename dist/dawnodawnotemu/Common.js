importArticles({
    type: "script",
    articles: [
	"MediaWiki:Quiz.js",
	"MediaWiki:OUAT.js",
	"MediaWiki:Chat.css",
    "u:dev:ReferencePopups/code.js"
    ]
});

/* Podpisy zamiast prefiksów */
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Dawno, dawno temu Wiki</h2>');
});

if (mw.config.get("wgPageName") == "Dawno,_dawno_temu_Wiki") {
    var currentSlide = 0;
    function setSlide(slide) {
    var elements = document.getElementsByClassName('slideshow-banner');
        for (i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "hidden";
            elements[i].style.opacity = 0;
        }
        elements[slide].style.opacity = 1;
        elements[slide].style.visibility = "visible";
    }
    function slideshow() {
        var elements = document.getElementsByClassName('slideshow-banner');
        if (currentSlide >= elements.length) currentSlide = 0;
        console.log(currentSlide);
        setSlide(currentSlide);
        currentSlide++;
        window.setTimeout(slideshow, 8000); // Alle 8 Sekunden wechseln
    }
    window.setTimeout(slideshow, 0);
}

function toggleObjectVisibility(objectId) {
  $("#"+    objectId).toggle();
}

/* Sliders using jquery
 * By: [[User:Tierrie]], with modifications by [[User:Thailog]] and [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
  if ( wgPageName == "Dawno,_dawno_temu_Wiki") {
    mw.loader.using( ['jquery.ui.tabs'], function() {
      var $tabs = $("#portal_slider").tabs({ fx: [{opacity:'toggle', duration:200},{height:'toggle', duration:'normal'}, ] } );
      $("[class^=portal_sliderlink]").click(function() { // bind click event to link
        var currentCl = $(this).prop('class');
        var workaround = $(this).children("a").prop('href');
        $(this).children("a").children("img").addClass("selectedImg");
        $(".selectedImg").animate( {height: "90%", width: "90%" }, { duration: 50, queue: true} );
        $(".selectedImg").animate( {height: "100%", width: "100%" }, { duration: 150, queue: true, complete: function(){
          $(".selectedImg").removeClass("selectedImg");
          if ( currentCl != "portal_sliderlink_28" ) {
            $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
          }
          else {
            window.location.replace(workaround);
          }
        } } );
        return false;
      });
    });
    }
});

// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
}
addOnloadHook(ToTop);

// LICZNIK by Nanaki
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime())/1000);
    if(amount < 0) return false;
 
    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);
 
    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    list.push('<span span="seconds">' + secs + ' s</span>');
 
    return list.join(' ');
}
function countBoxTick(box) {
    console.log(this)
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box)
        }, 1000);
    } else {
        box.html('Oczekuj!');
    }
}
$('.countbox').each(function() {
    if($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if(!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data')
        }
    }
});
 
// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0];
	if(newPageTitle == null) return;
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0];
	if(oldPageTitle == null) return;
	oldPageTitle.innerHTML = newPageTitle.innerHTML;
}
addOnloadHook(fixPageName);