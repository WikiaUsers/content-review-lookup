/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

// Sitnotice for oasis
// @author: UltimateSupreme
 
mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
 
	if (skin === 'oasis' && wgAction === 'view' && wgNamespaceNumber > -1) {
		api.get({
			action: 'parse',
			page: 'Mediawiki:Sitenotice',
			prop: 'text'
		}, {
			ok: function (json) {
				$('#WikiHeader').append(json.parse.text['*']);
			}
		});
	}
});


////////////////////////////////////////////////////////////////////////////////
 
// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
article = "";
 
var tooltipsOn = true;
 
var $tfb;
 
var $ttfb;
 
var $htt;
 
var activeHoverLink = null;
 
var tipCache = new Object;
 
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}
 
function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}
 
function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
    $ct.css({
        position: "fixed",
        top: newTop + "px",
        left: newLeft + "px"
    });
}
 
function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
        if (tipCache[url] != null) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content module" style="background:#000000 !important; color:#ffffff"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}
 
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
    displayTip(e);
}
 
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
    }
}
 
function ttMouseOver() {
    if (tooltipsOn) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        $(article + " span.ajaxttlink").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}
 
 
// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
        ttMouseOver();
});
// END OF TOOLTIP CODE
////////////////////////////////////////////////////////////////////////////////

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
	]
});


////////////////////////////////////////////////////////////////////////////////
// START OF TOOGLE CODE
/* Toggles the display of elements on a page  */
/* Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che */
/* See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation */
 
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
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
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
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
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
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);

/** Extra toolbar options ****************************************************** 
  *
  */
  // To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirecionar",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Texto riscado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Quebra de linha",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
     "speedTip": "Sobrescrito",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
     "speedTip": "Subscrito",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Texto pequeno",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Texto oculto",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Inserir galeria de imagens",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
     "speedTip": "Bloco de texto citado",
     "tagOpen": "<blockquote>\n",
     "tagClose": "\n</blockquote>",
     "sampleText": "Inserir texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Inserir tabela",
     "tagOpen": '{| class="wikitable" style="text-align:center;"\n|+ T�tulo\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! cabe�alho 1\n! cabe�alho 2\n! cabe�alho 3\n|-\n| c�lula 1\n| c�lula 2\n| c�lula 3\n|-\n| c�lula 1\n| c�lula 2\n| c�lula 3"};
 
 
 
 }