/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de página. */

function startTime() {
    var today=new Date();
    var h=today.getUTCHours();
    var m=today.getUTCMinutes();
    var sec=today.getUTCSeconds();
    var s1=(sec!=00)?60-sec:sec;
    var m1=(m!=00)?60-m:m;
    var h1=(h>=15)?((h * -1) + 38):((h * -1) + 14);
 
    var n = today.getUTCDay();
    var o = today.getUTCDay() + 1;
 
    h1=checkTime(h1);
    m1=checkTime(m1);
    s1=checkTime(s1);
    result = h1 + ":" + m1 + ":" + s1;
 
    var weekday = new Array(9);
    weekday [0] = "(Sun) Saber Items | QP | All Class EXP";
    weekday [1] = "(Mon) Archer Items | QP | Lancer, Asasssin, Berserker EXP";
    weekday [2] = "(Tue) Lancer Items | QP | Saber, Rider, Berserker EXP";
    weekday [3] = "(Wed) Berserker Items | QP | Archer, Caster, Berserker EXP";
    weekday [4] = "(Thu) Rider Items | QP | Lancer, Assassin, Berserker EXP";
    weekday [5] = "(Fri) Caster Items | QP | Saber, Rider, Berserker EXP";
    weekday [6] = "(Sat) Assassin Items | QP | Archer, Caster EXP";
    weekday [7] = "(Sun) Saber Items | QP | All Class EXP";
    weekday [8] = "(Mon) Archer Items | QP | Lancer, Asasssin, Berserker EXP";
 
    n = weekday[checkDay(n)]; 
    o = weekday[checkDay(o)];
 
    document.getElementById("countdown").innerHTML = "<br><b>Current Daily Quests:</b><br>" + n + "<br><br><b>Next Daily Quests:</b><br>" + o +"<br><br><em>" + result + "</em> &nbsp;&nbsp;Until New<br>&nbsp;&nbsp;Daily Quests" ;
    t=setTimeout('startTime()',500);
}
 
function checkDay(z) {
    var hour = new Date().getUTCHours(); 
    if (hour >= 15) {
        return z + 1;
        } else {
        return z;
    }
}
 
function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}
 
if(window.addEventListener){
    window.addEventListener('load',createClock,false); //W3C
}
else{
    window.attachEvent('onload',createClock); //IE
}
 
 
function createClock() {
    var mpsidebar = document.getElementById('clock');
    if ( mpsidebar !== null ) {
 
        //Create Div, set style, and append to code. 
        var countdownDisplay = document.createElement("div");
        countdownDisplay.id = "countdown";
        countdownDisplay.className = "tally";
        countdownDisplay.style.right = "110px"; 
        countdownDisplay.style.top = "8px";
 
        document.getElementById('clock').appendChild(countdownDisplay);
 
        startTime();
    }
}
 
 
 
 
var tooltips_list = [
   {
        classname: 'servant-tooltip',
        parse: '{'+'{CharactersNew|<#ServantInfoClass#>|<#ServantInfoName#>|<#ServantInfoClass#>}}', 
    }
    ];
 
// Archive Tool
 
var ArchiveToolConfig = { 
   'en': {
      buttonArchiveTool: "Archive",
      buttonArchiveToolTooltip: "Archive this page",
      buttonSelectAll: "Select all",
      buttonDeselectAll: "Deselect all",
      buttonSaveArchive: "Save archive",
      buttonAbort: "Abort",
      labelLines: "Lines",
      labelSections: "Sections",
      summaryArchiveFrom: "ArchiveTool: Archiving from",
      summaryArchiveTo: "ArchiveTool: Archiving to"
   }
};
importScriptPage('MediaWiki:ArchiveTool/code.js', 'dev');
 
 
gridContainer = '#servant-grid';
gridFilters = {
	'servant': 'search',
	'class': [ '- Class -',
		['Saber','Saber'],
		['Archer','Archer'],
		['Lancer','Lancer'],
		['Rider','Rider'],
		['Caster','Caster'],
		['Assassin','Assassin'],
		['Berserker','Berserker'],
		['Shielder','Shielder'],
		['Ruler','Ruler'],
		['Avenger','Avenger'],
		['Moon Cancer','Moon Cancer'],
		['Alter-Ego','Alter-Ego'],
		['Beast','Beast'],
	],
	'attribute': [ '- Attribute -',
		['Man','Man'],
		['Sky','Sky'],
		['Earth','Earth'],
		['Star','Star'],
		['Beast','Beast'],
	],
	'alignmentright': [ '- Alignment (Right) -',
		['Good','Good'],
		['Neutral (Right)','Neutral (Right)'],
		['Evil','Evil'],
	],
	'alignmentleft': [ '- Alignment (Left) -',
		['Lawful','Lawful'],
		['Neutral (Left)','Neutral (Left)'],
		['Chaotic','Chaotic'],
	],
};
 
 
 
var elementsToFilter = {};
$(document).ready(function() {
    elementsToFilter = document.getElementsByClassName("servant-filter-element");
    createDropdownSelects();
});
 
function createDropdownSelects() {
    var selectRowElement = document.getElementById("selectRow");
    if (!selectRowElement) {
        return;
    }
 
    var classSelect = document.getElementById('classSelectDiv')
    if (classSelect) {
        classSelect.innerHTML = "<!-- Class Filter -->"
            + "<select id=\"classSelect\" name=\"classSelect\" class=\"form-control\" onchange=\"filter()\">"
                + "<option selected=\"selected\" value=\"-\">Class Filter</option>"
                + "<option value=\"Saber\">Saber</option>"
                + "<option value=\"Archer\">Archer</option>"
                + "<option value=\"Lancer\">Lancer</option>"
                + "<option value=\"Rider\">Rider</option>"
                + "<option value=\"Caster\">Caster</option>"
                + "<option value=\"Assassin\">Assassin</option>"
                + "<option value=\"Berserker\">Berserker</option>"
                + "<option value=\"Ruler\">Ruler</option>"
                + "<option value=\"Shielder\">Shielder</option>"
                + "<option value=\"Avenger\">Avenger</option>"
                + "<option value=\"Mooncancer\">Mooncancer</option>"
                + "<option value=\"Alter-Ego\">Alter-Ego</option>"
            + "</select>";
    }
}
 
function filter() {
    var classFilter = document.getElementById("classSelect").value;
    if (classFilter == "-") {
        resetFiltersApplied();
    }
    else {
        for (var i = 0; i < elementsToFilter.length; i++) {
	        var classId = elementsToFilter[i].getAttribute("id");
	        if (classId == classFilter) {
	            elementsToFilter[i].style.display = "table-cell";
	        }
	        else {
	            elementsToFilter[i].style.display = "none";
	        }
	    }
    }
}
 
function resetFiltersApplied() {
	for (var i = 0; i < elementsToFilter.length; i++) {
        elementsToFilter[i].style.display = "table-cell";
    }
}
 
/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de página */
 
 
 
//Timeline JS
 
$(function(){
  $(window).scroll(function(){
    $('.year').each(function(){
      var year = $(this).find('h2').first().text();
      if($(this).offset().top < $(document).scrollTop() +100){
        $(this).find('.date').addClass('activeYear');
           $('#dataYear').html(year);
        }else{
          $(this).find('.date').removeClass('activeYear');
        }
    });
  });
});
$(document).ready(function(){
  var year = $('.year').find('h2').first().text();
    $('#dataYear').html(year); 
  $('.year').first().find('.date').addClass('activeYear');
});


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