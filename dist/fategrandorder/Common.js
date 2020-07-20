/* Any JavaScript here will be loaded for all users on every page load. */

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

/* Any JavaScript here will be loaded for all users on every page load. */



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


/* Custom Server Time for JP and NA */
$(document).ready(function() {
    var newSection = '<section id="timeZones"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{ClockJS}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#timeZones').append(code);
    });
});