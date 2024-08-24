importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "MediaWiki:Island_Editor.js",
        "w:c:dev:FixWantedFiles/code.js",
        "w:c:dev:UserTags/code.js",
        "w:c:dev:SearchSuggest/code.js",
        "MediaWiki:Common.js/eggs-ttab.js"
    ]
});

/* Game News Forum Mainpage Controller */
$('div#game_news').load('http://dragoncity.wikia.com/wiki/Board:Game_News [class="thread-left"]');
$('div#community_news').load('http://dragoncity.wikia.com/wiki/Board:Dragon_City_Wiki [class="thread-left"]');

/* Hide Edite Text */
$('span.editsection a').contents(':not("img")').remove();

/* Block Language boards for ip users */
if ((mw.config.get("wgPageName") == 'Board:Español' || mw.config.get("wgPageName") == 'Board:Português' || mw.config.get("wgPageName") == 'Board:Deutsch') && !mw.config.get("wgUserName")) {
   $(".DiscussionBox, li.new-reply").hide();
}

/* Thumbs Switch Controller */
$('.dc-switcher').prepend($('.dc-thumb2'));
$('.dc-switcher').prepend($('.dc-thumb1'));
$('.dc-switcher').prepend($('.dc-thumb0'));

$('div#tab-overview-content').prepend($('div.dc-overview'));
$('div#tab-statistics-content').prepend($('div.dc-statistics'));
$('div#tab-earning-content').prepend($('div.dc-earning'));
$('div#tab-attacks-content').prepend($('div.dc-attacks'));
$('div#tab-damage_calculator-content').prepend($('div.dc-damage_calculator'));
$('div#tab-hitpoints-content').prepend($('div.dc-hitpoints'));
$('div#tab-breeding-content').prepend($('div.dc-breeding'));
$('div#tab-history-content').prepend($('div.dc-history'));

$('td.dc-switcher').mouseenter(function() {
$("td.dc-switcher div").removeClass("dc-active");
$("div.dc-thumb3").addClass("dc-active");
});

$('td#thumb2-activator').mouseenter(function() {
$("td.dc-switcher div").removeClass("dc-active");
$("div.dc-thumb2").addClass("dc-active");
});

$('td#thumb1-activator').mouseenter(function() {
$("td.dc-switcher div").removeClass("dc-active");
$("div.dc-thumb1").addClass("dc-active");
});

$('td#thumb0-activator').mouseenter(function() {
$("td.dc-switcher div").removeClass("dc-active");
$("div.dc-thumb0").addClass("dc-active");
});

$('TR#dc-navbox-header').mouseleave(function() {
$("td.dc-switcher div").removeClass("dc-active");
$("td.dc-switcher div.dc-thumb3").addClass("dc-active");
});

/* Eggs Pages */
$('div.eggs-filter').prepend($('div.bm_dragon_name'));
$( "div#but-type" ).click(function() {
$('div').removeClass('hide')
$('.elemental_dragons').prepend($('div.eggs-elemental_dragons'));
$('.hybrid_dragons').prepend($('div.eggs-hybrid_dragons'));
$('.rare_hybrid_dragons').prepend($('div.eggs-rare_hybrid_dragons'));
$('.light_dragons').prepend($('div.eggs-light_dragons'));
$('.war_dragons').prepend($('div.eggs-war_dragons'));
$('.light_dragons').prepend($('div.eggs-light_dragons'));
$('.pure_dragons').prepend($('div.eggs-pure_dragons'));
$('.legend_dragons').prepend($('div.eggs-legend_dragons'));
});

//eggs-terra
(function () {
  var countg = 0;
  $("div#but-terra").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-terra" ).css( "background-position", "top" );
      $( "div.e1_terra" ).toggleClass( "eggs-hide" );
      $( "div.e2_terra" ).toggleClass( "eggs-hide2" );
      $( "div.e3_terra" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-terra" ).css( "background-position", "bottom" );
      $( "div.e1_terra" ).toggleClass( "eggs-hide" );
      $( "div.e2_terra" ).toggleClass( "eggs-hide2" );
      $( "div.e3_terra" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-flame
(function () {
  var countg = 0;
  $("div#but-flame").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-flame" ).css( "background-position", "top" );
      $( "div.e1_flame" ).toggleClass( "eggs-hide" );
      $( "div.e2_flame" ).toggleClass( "eggs-hide2" );
      $( "div.e3_flame" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-flame" ).css( "background-position", "bottom" );
      $( "div.e1_flame" ).toggleClass( "eggs-hide" );
      $( "div.e2_flame" ).toggleClass( "eggs-hide2" );
      $( "div.e3_flame" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-sea
(function () {
  var countg = 0;
  $("div#but-sea").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-sea" ).css( "background-position", "top" );
      $( "div.e1_sea" ).toggleClass( "eggs-hide" );
      $( "div.e2_sea" ).toggleClass( "eggs-hide2" );
      $( "div.e3_sea" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-sea" ).css( "background-position", "bottom" );
      $( "div.e1_sea" ).toggleClass( "eggs-hide" );
      $( "div.e2_sea" ).toggleClass( "eggs-hide2" );
      $( "div.e3_sea" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-nature
(function () {
  var countg = 0;
  $("div#but-nature").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-nature" ).css( "background-position", "top" );
      $( "div.e1_nature" ).toggleClass( "eggs-hide" );
      $( "div.e2_nature" ).toggleClass( "eggs-hide2" );
      $( "div.e3_nature" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-nature" ).css( "background-position", "bottom" );
      $( "div.e1_nature" ).toggleClass( "eggs-hide" );
      $( "div.e2_nature" ).toggleClass( "eggs-hide2" );
      $( "div.e3_nature" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-electric
(function () {
  var countg = 0;
  $("div#but-electric").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-electric" ).css( "background-position", "top" );
      $( "div.e1_electric" ).toggleClass( "eggs-hide" );
      $( "div.e2_electric" ).toggleClass( "eggs-hide2" );
      $( "div.e3_electric" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-electric" ).css( "background-position", "bottom" );
      $( "div.e1_electric" ).toggleClass( "eggs-hide" );
      $( "div.e2_electric" ).toggleClass( "eggs-hide2" );
      $( "div.e3_electric" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-ice
(function () {
  var countg = 0;
  $("div#but-ice").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-ice" ).css( "background-position", "top" );
      $( "div.e1_ice" ).toggleClass( "eggs-hide" );
      $( "div.e2_ice" ).toggleClass( "eggs-hide2" );
      $( "div.e3_ice" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-ice" ).css( "background-position", "bottom" );
      $( "div.e1_ice" ).toggleClass( "eggs-hide" );
      $( "div.e2_ice" ).toggleClass( "eggs-hide2" );
      $( "div.e3_ice" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-metal
(function () {
  var countg = 0;
  $("div#but-metal").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-metal" ).css( "background-position", "top" );
      $( "div.e1_metal" ).toggleClass( "eggs-hide" );
      $( "div.e2_metal" ).toggleClass( "eggs-hide2" );
      $( "div.e3_metal" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-metal" ).css( "background-position", "bottom" );
      $( "div.e1_metal" ).toggleClass( "eggs-hide" );
      $( "div.e2_metal" ).toggleClass( "eggs-hide2" );
      $( "div.e3_metal" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-dark
(function () {
  var countg = 0;
  $("div#but-dark").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-dark" ).css( "background-position", "top" );
      $( "div.e1_dark" ).toggleClass( "eggs-hide" );
      $( "div.e2_dark" ).toggleClass( "eggs-hide2" );
      $( "div.e3_dark" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-dark" ).css( "background-position", "bottom" );
      $( "div.e1_dark" ).toggleClass( "eggs-hide" );
      $( "div.e2_dark" ).toggleClass( "eggs-hide2" );
      $( "div.e3_dark" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-light
(function () {
  var countg = 0;
  $("div#but-light").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-light" ).css( "background-position", "top" );
      $( "div.e1_light" ).toggleClass( "eggs-hide" );
      $( "div.e2_light" ).toggleClass( "eggs-hide2" );
      $( "div.e3_light" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-light" ).css( "background-position", "bottom" );
      $( "div.e1_light" ).toggleClass( "eggs-hide" );
      $( "div.e2_light" ).toggleClass( "eggs-hide2" );
      $( "div.e3_light" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-war
(function () {
  var countg = 0;
  $("div#but-war").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-war" ).css( "background-position", "top" );
      $( "div.e1_war" ).toggleClass( "eggs-hide" );
      $( "div.e2_war" ).toggleClass( "eggs-hide2" );
      $( "div.e3_war" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-war" ).css( "background-position", "bottom" );
      $( "div.e1_war" ).toggleClass( "eggs-hide" );
      $( "div.e2_war" ).toggleClass( "eggs-hide2" );
      $( "div.e3_war" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-pure
(function () {
  var countg = 0;
  $("div#but-pure").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-pure" ).css( "background-position", "top" );
      $( "div.e1_pure" ).toggleClass( "eggs-hide" );
      $( "div.e2_pure" ).toggleClass( "eggs-hide2" );
      $( "div.e3_pure" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-pure" ).css( "background-position", "bottom" );
      $( "div.e1_pure" ).toggleClass( "eggs-hide" );
      $( "div.e2_pure" ).toggleClass( "eggs-hide2" );
      $( "div.e3_pure" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

//eggs-legend
(function () {
  var countg = 0;
  $("div#but-legend").click(function () {
    countg += 1;
    if (countg == 1) {
      $( "div#but-legend" ).css( "background-position", "top" );
      $( "div.e1_legend" ).toggleClass( "eggs-hide" );
      $( "div.e2_legend" ).toggleClass( "eggs-hide2" );
      $( "div.e3_legend" ).toggleClass( "eggs-hide3" );
    }
    if (countg == 2) {
      $( "div#but-legend" ).css( "background-position", "bottom" );
      $( "div.e1_legend" ).toggleClass( "eggs-hide" );
      $( "div.e2_legend" ).toggleClass( "eggs-hide2" );
      $( "div.e3_legend" ).toggleClass( "eggs-hide3" );
      countg = 0
    }
  });
})();

/* EGGS PAGE MAIN */
$('th#h-new_eggs').append($( "span#This_Month_New_Eggs.mw-headline" ).parent());
$('th#h-elemental').append($( "span#Elemental_Dragons.mw-headline" ).parent());
$('th#h-hybrid').append($( "span#Hybrid_Dragons.mw-headline" ).parent());
$('th#h-rare_hybrid').append($( "span#Rare_Hybrid_Dragons.mw-headline" ).parent());
$('th#h-legend').append($( "span#Legend_Dragons.mw-headline" ).parent());
$('th#h-exclusive').append($( "span#Exclusive_Dragons.mw-headline" ).parent());
$('th#h-exclusive_elemental').append($( "span#Exclusive_Elemental_Dragons.mw-headline" ).parent());
$('th#h-exclusive_hybrid').append($( "span#Exclusive_Hybrid_Dragons.mw-headline" ).parent());
$('th#h-exclusive_rare_hybrid').append($( "span#Exclusive_Rare_Hybrid_Dragons.mw-headline" ).parent());
$('th#h-exclusive_legend').append($( "span#Exclusive_Legend_Dragons.mw-headline" ).parent());
$('th#h-unknown').append($( "span#Unknown_Dragons.mw-headline" ).parent());

/* Forum Description Controller */
$('.dc-switcher').prepend($('.dc-popup'));

/* Forum Design */
$('ul.boards').prepend('<p>Welcome to the Dragon City Wiki Forum.</p>');
$('li.board-145201').before('<h2 style="text-align:center;"><img src="https://images.wikia.nocookie.net/dragoncity/images/f/fd/Language_Board.png"> Other Languages <img src="https://images.wikia.nocookie.net/dragoncity/images/f/fd/Language_Board.png"></h2>');
$('[data-board-namespace="2000"]').prepend('<div><table><tr><td><img src="https://images.wikia.nocookie.net/dragoncity/images/d/d7/Navigation2.png" alt="heart"></img></td><td><i>The topic that you want to post can already exist. Please <a href="http://dragoncity.wikia.com/wiki/Special%3ASearch">navigate</a> arround before you post something.</i></td><td><img src="https://images.wikia.nocookie.net/dragoncity/images/d/d7/Navigation2.png" alt="heart"></img></td></tr></div>');

/* Replaces {{USERNAME}} with the username */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 $(UserNameReplace);

/* Infobox Tab Names */
$('span#tab-overview').append('Overview');
$('span#tab-statistics').append('Statistics');
$('span#tab-earning').append('Earning');
$('span#tab-attacks').append('Attacks');
$('span#tab-damage_calculator').append('Damage Calculator');
$('span#tab-hitpoints').append('Hitpoints');
$('span#tab-breeding').append('Breeding');
$('span#tab-history').append('History');
$('div.mw-customtoggle-myTable').append('Hide/Reveal Content');

//switch tabs links
tabName = window.location.hash;
$(document).ready(function(){
  if (tabName == '#tab-overview') { 
  $('#tab-overview').trigger('click');
  } 
  if (tabName == '#tab-statistics') { 
  $('#tab-statistics').trigger('click');
  } 
  if (tabName == '#tab-earning') { 
  $('#tab-earning').trigger('click');
  } 
  if (tabName == '#tab-attacks') { 
  $('#tab-attacks').trigger('click');
  } 
  if (tabName == '#tab-damage_calculator') { 
  $('#tab-damage_calculator').trigger('click');
  } 
  if (tabName == '#tab-hitpoints') { 
  $('#tab-hitpoints').trigger('click');
  } 
  if (tabName == '#tab-breeding') { 
  $('#tab-breeding').trigger('click');
  } 
  if (tabName == '#tab-history') { 
  $('#tab-history').trigger('click');
  } 
});

/* Texttip tab switch controller */
//toggle-name
$(".toggle-name").click(function() {
$('#tab-overview').trigger('click');
});

//toggle-habitat-lv
(function () {
  var counth = 0;
  $(".toggle-habitat-lv").click(function () {
    counth += 1;
    if (counth == 1) {
      $('#tab-earning').trigger('click');
    }
    if (counth == 2) {
      $('#tab-attacks').trigger('click');
    }
    if (counth == 3) {
      $('#tab-damage_calculator').trigger('click');
      counth = 0
    }
  });
})();

//toggle-habitat
(function () {
  var counthb = 0;
  $(".toggle-habitat").click(function () {
    counthb += 1;
    if (counthb == 1) {
      $('#tab-damage_calculator').trigger('click');
    }
    if (counthb == 2) {
      $('#tab-attacks').trigger('click');
    }
    if (counthb == 3) {
      $('#tab-earning').trigger('click');
      counthb = 0
    }
  });
})();

//toggle-shop
$(".toggle-shop").click(function() {
$('#tab-history').trigger('click');
});

//toggle-breeding&hatching time
(function () {
  var countt = 0;
  $(".toggle-time").click(function () {
    countt += 1;
    if (countt == 1) {
      $('#tab-statistics').trigger('click');
    }
    if (countt == 2) {
      $('#tab-breeding').trigger('click');
      countt = 0
    }
  });
})();

//toggle-category
(function () {
  var countc = 0;
  $(".toggle-category").click(function () {
    countc += 1;
    if (countc == 1) {
      $('#tab-attacks').trigger('click');
    }
    if (countc == 2) {
      $('#tab-damage_calculator').trigger('click');
    }
    if (countc == 3) {
      $('#tab-hitpoints').trigger('click');
      countc = 0
    }
  });
})();

//toggle-generation
(function () {
  var countg = 0;
  $(".toggle-generation").click(function () {
    countg += 1;
    if (countg == 1) {
      $('#tab-breeding').trigger('click');
    }
    if (countg == 2) {
      $('#tab-statistics').trigger('click');
      countg = 0
    }
  });
})();

/* Texttip tab switch controller - Lay-out */
$('span.toggle-generation, span.toggle-time').mouseenter(function() {
$("#tab-breeding, #tab-statistics").addClass("selected")
});
$('span.toggle-generation, span.toggle-time').mouseleave(function() {
$("#tab-breeding, #tab-statistics").removeClass("selected");
});
$('span.toggle-category').mouseenter(function() {
$("#tab-attacks, #tab-damage_calculator, #tab-hitpoints").addClass("selected");
});
$('span.toggle-category').mouseleave(function() {
$("#tab-attacks, #tab-damage_calculator, #tab-hitpoints").removeClass("selected");
});
$('span.toggle-name').mouseenter(function() {
$("#tab-overview").addClass("selected");
});
$('span.toggle-name').mouseleave(function() {
$("#tab-overview").removeClass("selected");
});
$('span.toggle-shop').mouseenter(function() {
$("#tab-history").addClass("selected");
});
$('span.toggle-shop').mouseleave(function() {
$("#tab-history").removeClass("selected");
});
$('span.toggle-habitat, span.toggle-habitat-lv').mouseenter(function() {
$("#tab-earning, #tab-attacks, #tab-damage_calculator").addClass("selected");
});
$('span.toggle-habitat, span.toggle-habitat-lv').mouseleave(function() {
$("#tab-earning, #tab-attacks, #tab-damage_calculator").removeClass("selected");
});

/*Alternate Tab Infobox*/
$('.tabBox').append('<style type="text/css">.tabTitle{display:inline-block;background:rgba(192,192,192,.1) !important;background:silver;padding:5px 5px 0;margin:-5px 5px 0;border-radius:100% 100% 0 0/10px 10px 0 0;-webkit-border-radius: 100% 100% 0 0/10px 10px 0 0;cursor:pointer;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-o-transition:background .5s}.tabTitle.active{background:rgba(192,192,192,.3) !important;font-weight:bold}.tabTitle:hover{background:rgba(192,192,192,.5) !important}</style>');
$('.tabTitle').click(function(){$('.tabTitle').removeClass('active');$(this).addClass('active');});
$('#tab-overview').click(function(){$('.tabContent').hide();$('#tab-overview-content').show();});
$('#tab-statistics').click(function(){$('.tabContent').hide();$('#tab-statistics-content').show();});
$('#tab-earning').click(function(){$('.tabContent').hide();$('#tab-earning-content').show();});
$('#tab-attacks').click(function(){$('.tabContent').hide();$('#tab-attacks-content').show();});
$('#tab-damage_calculator').click(function(){$('.tabContent').hide();$('#tab-damage_calculator-content').show();});
$('#tab-hitpoints').click(function(){$('.tabContent').hide();$('#tab-hitpoints-content').show();});
$('#tab-breeding').click(function(){$('.tabContent').hide();$('#tab-breeding-content').show();});
$('#tab-history').click(function(){$('.tabContent').hide();$('#tab-history-content').show();});

/*Alternate Tab Function - by ShermanTheMythran*/
//relies on Template:Tabs
$('.tabBox').append('<style type="text/css">.tabTitle{display:inline-block;background:rgba(192,192,192,.1) !important;background:silver;padding:5px 5px 0;margin:-5px 5px 0;border-radius:100% 100% 0 0/10px 10px 0 0;-webkit-border-radius: 100% 100% 0 0/10px 10px 0 0;cursor:pointer;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-o-transition:background .5s}.tabTitle.active{background:rgba(192,192,192,.3) !important;font-weight:bold}.tabTitle:hover{background:rgba(192,192,192,.5) !important}</style>');
$('.tabTitle').click(function(){$('.tabTitle').removeClass('active');$(this).addClass('active');});
$('#tab-1').click(function(){$('.tabContent').hide();$('#tab-1-content').show();});
$('#tab-2').click(function(){$('.tabContent').hide();$('#tab-2-content').show();});
$('#tab-3').click(function(){$('.tabContent').hide();$('#tab-3-content').show();});
$('#tab-4').click(function(){$('.tabContent').hide();$('#tab-4-content').show();});
$('#tab-5').click(function(){$('.tabContent').hide();$('#tab-5-content').show();});
$('#tab-6').click(function(){$('.tabContent').hide();$('#tab-6-content').show();});
$('#tab-7').click(function(){$('.tabContent').hide();$('#tab-7-content').show();});
$('#tab-8').click(function(){$('.tabContent').hide();$('#tab-8-content').show();});
$('#tab-9').click(function(){$('.tabContent').hide();$('#tab-9-content').show();});
$('#tab-10').click(function(){$('.tabContent').hide();$('#tab-10-content').show();});
 
/* HeaderTabs Link Color Fix*/
$('div').removeClass('jquery-large .ui-widget-content a')

// This tooltip code was written by Pcj
 
var $tfb;
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
  if(skin=='oasis') { var BC = '#WikiaArticle'; }
  else { var BC = '#bodyContent'; }
 
  $(BC).mouseover(hideTip);
  $(BC).append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $(BC + " span.ajaxttlink").each(bindTT);
});

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};