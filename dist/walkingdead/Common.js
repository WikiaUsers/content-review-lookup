var a=new Date;if(18==a.getDate()&&0==a.getMonth()&&2012==a.getFullYear())window.location="http://en.wikipedia.org/wiki/Main_Page"; 

/** Import module **************************************************************
 *
 *  Description: Includes a raw wiki page as javascript or CSS, 
 *               used for including user made modules.
 *  Maintainers: [[User:AzaToth]]
 */
 
importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice

function importScript( page ) {
	if( importedScripts[page] ) {
		return;
	}
	importedScripts[page] = true;
	var url = wgScriptPath
			+ '/index.php?title='
			+ encodeURIComponent( page.replace( / /g, '_' ) )
			+ '&action=raw&ctype=text/javascript';
	var scriptElem = document.createElement( 'script' );
	scriptElem.setAttribute( 'src' , url );
	scriptElem.setAttribute( 'type' , 'text/javascript' );
	document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
}

function importStylesheet( page ) {
	var sheet = '@import "'
			+ wgScriptPath
			+ '/index.php?title='
			+ encodeURIComponent( page.replace( / /g, '_' ) )
			+ '&action=raw&ctype=text/css";'
	var styleElem = document.createElement( 'style' );
	styleElem.setAttribute( 'type' , 'text/css' );
	styleElem.appendChild( document.createTextNode( sheet ) );
	document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
}

/** Extra toolbar options ******************************************************
*
*  Description: UNDOCUMENTED
*  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
*/

//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
	"speedTip": "Redirect",
	"tagOpen": "#REDIRECT [[",
	"tagClose": "]]",
	"sampleText": "Insert text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
	"speedTip": "Strike",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
	"speedTip": "Superscript",
	"tagOpen": "<sup>",
	"tagClose": "</sup>",
	"sampleText": "Superscript text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
	"speedTip": "Subscript",
	"tagOpen": "<sub>",
	"tagClose": "</sub>",
	"sampleText": "Subscript text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
	"speedTip": "Small",
	"tagOpen": "<small>",
	"tagClose": "</small>",
	"sampleText": "Small Text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
	"speedTip": "Insert hidden Comment",
	"tagOpen": "<!-- ",
	"tagClose": " -->",
	"sampleText": "Comment"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
	"speedTip": "Insert a picture gallery",
	"tagOpen": "\n<gallery>\n",
	"tagClose": "\n</gallery>",
	"sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
	"speedTip": "Insert block of quoted text",
	"tagOpen": "<blockquote>\n",
	"tagClose": "\n</blockquote>",
	"sampleText": "Block quote"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
	"speedTip": "Insert a table",
	"tagOpen": '{| class="wikitable"\n|-\n',
	"tagClose": "\n|}",
	"sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
}

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

/************* Funzioni di utilità generale *************/
 
 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
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

// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
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
$(".portal_metro .portal_body > div").on("click", function() {
    window.scrollBy(0, 10);
});