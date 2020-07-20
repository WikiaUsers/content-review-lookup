// <pre> ============================================================
/* 12 May 2012 -- adapted for ResourceLoader & jQuery by Edward_Chernenko */
 
window.dynavbar  = {
 
  // set up the words in your language
  Hide: '[−]',
  Show: '[+]',
 
 
  // Максимальное число развёрнутых шаблонов
  // (если их будет больше, чем dynavbar.Max,
  // то они все будут свёрнуты автоматически)
  // Пример:
  // Max: 0, // сворачивать всегда
  // Max: 1, // сворачивать, если на странице более одного шаблона
 
  Max: 0,
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     idx: the index of navigation bar to be toggled
  toggle: function(idx) {
     var NavToggle = $("#NavToggle" + idx)[0];
     var NavFrame = $("#NavFrame" + idx)[0];
 
     if(!NavFrame || !NavToggle)
       return false;
 
     if(NavToggle.firstChild.data == dynavbar.Hide)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').hide();
         NavToggle.firstChild.data = dynavbar.Show;
     }
     else if(NavToggle.firstChild.data == dynavbar.Show)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').show();
         NavToggle.firstChild.data = dynavbar.Hide;
     }
  },
 
  collapseTable: function( tableIndex )
  {
     var Button = $("#collapseButton" + tableIndex)[0];
     var Table = $("#collapsibleTable" + tableIndex)[0];
 
     if(!Table || !Button)
       return false;
 
     var Rows = $($(Table).find('tr').toArray().splice(1));
 
     if ( Button.firstChild.data == dynavbar.Hide ) {
         Rows.hide();
         Button.firstChild.data = dynavbar.Show;
     }
     else
     {
         Rows.show();
         Button.firstChild.data = dynavbar.Hide;
     }
  }
};
 
/* Добавить ссылки [показать]/[скрыть] */
$(function() {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = $("div.NavFrame");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {  
             indexNavigationBar++;
 
            /* Автоматическое сворачивание */
            var isCollapsed = $(NavFrame).hasClass("collapsed");
            if(isCollapsed)
                $(NavFrame).children().filter('.NavContent, .NavPic').hide();
 
            var NavToggle = $('<a/>')
                 .attr('class', 'NavToggle')
                 .attr('id', 'NavToggle' + indexNavigationBar)
                 .attr('href', 'javascript:dynavbar.toggle(' + indexNavigationBar + ')')
                 .append(isCollapsed ? dynavbar.Show : dynavbar.Hide);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if ($(NavFrame.childNodes[j]).hasClass("NavHead"))
                 NavFrame.childNodes[j].appendChild(NavToggle[0]);
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
 
     // if more Navigation Bars found than Default: hide all
     if (dynavbar.Max < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) dynavbar.toggle(i);
     }
});
 
$(function(){
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = $("table.collapsible");
 
     for ( var i = 0; i < Tables.length; i++ ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button = $('<span/>')
                 .attr('style', 'float: right; font-weight: normal; text-align: right; width: 6em;')
                 .append($('<a/>')
                     .attr('id', 'collapseButton' + tableIndex)
                     .attr('href', 'javascript:dynavbar.collapseTable(' + tableIndex + ');')
                     .append(dynavbar.Hide)
                 )[0];
 
             var Header = $($(Tables[i]).find('tr')[0]).find('th')[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
     }
 
     for(var i = 0;  i < tableIndex; i++ )
     {
         if ( $(NavigationBoxes[i]).hasClass("collapsed") || ( tableIndex >= dynavbar.Max && $(NavigationBoxes[i]).hasClass( "autocollapse" ) ) )
             dynavbar.collapseTable( i );
     }
});
 
/*  Свич спёртый с openwetware.org */

// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}

addOnloadHook(toggleInit);

/* Счётчик персонажей */
function addCharN(){
  var charN = document.getElementById('Char');
  if (!charN) return;
  var raceN = document.getElementById('Race');
  var chars = document.getElementsByTagName('div');
  var N = 0;
  var NN = 0;
  for(var i=chars.length-1; i>=0; i--) {
    if (chars[i].className == 'Char') N++;
    if (chars[i].className == 'Race') NN++;
    }
  charN.innerHTML = 'Всего персонажей: <span>' + N + '</span>';
  raceN.innerHTML = 'Всего групп: <span>' + NN + '</span>';
  }
addOnloadHook(addCharN);

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
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
} );

//*****************************************************************************//
//* Скрипт, стыренный с  [[http://ru.wow.wikia.com/wiki/MediaWiki:Common.js]] *//
//*****************************************************************************//

// default setting to turn tooltips on
var tooltipsOn = true;
 
var $tfb;
var $ttfb;
var $htt;
 
// hides the tooltip
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}
 
// displays the tooltip
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility","visible");
	moveTip(e);
}
 
// moves the tooltip
function moveTip(e) {
	$ct = $htt.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(0, Math.min(wh - eh, newTop));
 
	$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Ошибка</b><br />Подсказки не существует<br />или её не должно существовать.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
 
// quick tooltips
function hideTemplateTip() {
$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}
 
function showTemplateTip(e) {
$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
displayTip(e);
}
 
// add the tooltip calls to the page
function eLink(db,nm) {
	dbs = new Array("http://us.battle.net/wow/en/search?f=wowitem&q=","http://ru.wowhead.com/?search=");
	dbTs = new Array("Armory","Wowhead");
	dbHs = new Array("&real; ","&omega; ");
	el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">'+ dbHs[db] + '</a>';
	return el;
}
 
function bindTT() {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
		if ($p.hasClass("new")) {
			els = '<sup><span class="plainlinks">';
			y = ($t.hasClass("itemlink")) ? 0 : 1;
			z = ($t.hasClass("charlink")) ? 2 : 2;
			for (x=y;x<z;x++) els += eLink(x,$t.data("tt").replace("Задание:",""));
			$p.after(els+'</span></sup>');
		} else {
			$t.removeAttr("title");
			$p.removeAttr("title");
		}
	}
}
 
function tooltipsInit(root) {
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").trim();
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}

/* </pre> */