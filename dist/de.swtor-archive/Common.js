/* Any JavaScript here will be loaded for all users on every page load. */
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var activeHoverLink = null;
var tipCache = new Object();

// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
  activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
  $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $tfb.not(":empty").css("visibility","visible");
  moveTip(e);
}

// moves the tooltip
function moveTip(e) {
  $ct = $tfb.not(":empty");
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($ct.innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
  $ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
  var $t=$(this);
  activeHoverLink = $t;
  $p=$t.parent();
  if ($p.hasClass("selflink")==false) {
    $t.removeAttr("title");
    $p.removeAttr("title");
    var url = "/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render .tooltip-content";
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      tipCache[url] = $tfb.html();
      displayTip(e);
    });
  }
}

function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
  }
}

// check to see if it is active then do it
function ttMouseOver() {
  if (tooltipsOn) {
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
  }
}

$(ttMouseOver);

$(function() {
	$('.rolloverToggle').hover(
		function() {
			$('.rolloverItem', this).hide();
			$('.rolloverB', this).show();
		},
		function()  {
			$('.rolloverItem', this).hide();
			$('.rolloverA', this).show();
	});
});

$(function() {
	$('.tabdiv > div').hide();
	$('.tabdiv').each(function() {
		$(this).find('> ul li:first').addClass('active');
		$(this).find('> div:first').show();
	});

	$('.tabdiv > ul li a').each(function() {
		var target = $(this).attr('href');
		$(this).attr('href', ''); // Opera hates real hrefs
		$(this).parent().click(function() {
			$(this).parent().find('> li').removeClass('active');
			$(this).parent().parent().find('> div').hide();
			$(this).addClass('active');
			$(target).show();
			return false;
		});
	});
});

/* ---- Map tooltip code. See [[Template:Tooltip Coords]] ---- */

/*
Defines universal variables and handle mousemove, and window resize
*/

var ttHTMLStart = '<div style="font-size:1em; width: auto;>';
var crlf = new RegExp("\r\n", "g");
var mousePos = null;
var winSize =  {x:$(window).width(), y:$(window).height()};

//Document mousemove
$(document).mousemove(function(e){
	mousePos = {x:e.pageX , y:e.pageY};
});
//Document resize event
$(document).resize(function(e){
	winSize = {x:$(window).width(), y:$(window).height()}
});

mw.loader.load('/index.php?title=MediaWiki:Coordstooltip.js&action=raw&ctype=text/javascript');