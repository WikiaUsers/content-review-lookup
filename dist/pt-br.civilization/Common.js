/* Any JavaScript here will be loaded for all users on every page load. */
/* Main page */
if( wgPageName === "Wiki_Civilization") {
	$(document).ready(function() {
		/** Hide tabbers until the entire system is ready - works with MediaWiki:Mainpage_Box_Content **/
		var tabberInterval = setInterval(waitForChange, 250);
		function waitForChange() {
			if ($('.mainpage-box-content .tabbernav').length > 0) {
				$('.mainpage-box-content .tabbertab').css('display','');
				clearInterval(tabberInterval);
			}
		}
		
		/** Ensure both news & blogs boxes are the same size **/
		var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts-container').height();
		var newsFeedHeight = parseInt(communityPostsHeight) + 'px';
		$('.mainpage-box-newsandblogs .newsfeed-container').css('height',newsFeedHeight);
	 
		$(window).on('resize',function() {
			var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts-container').height();
			var newsFeedHeight = parseInt(communityPostsHeight) + 'px';
			$('.mainpage-box-newsandblogs .newsfeed-container').css('height',newsFeedHeight);
		});
	});
}

/* CivBE Expedition highlighting */
$(document).ready(function() {
	function ApplyHoverFunctions(s) {
		
		$("." + s + "-icon").hover(function () {
			$(this).parent().parent().parent().siblings("." + s).find("td").css("background","linear-gradient(#1f2a35, #171d27)");
		}, function () {
			$(this).parent().parent().parent().siblings("." + s).find("td").css("background","#13161d");
		});
	}
	
	
	ApplyHoverFunctions("sponsor");
	ApplyHoverFunctions("colonist");
	ApplyHoverFunctions("spacecraft");
	ApplyHoverFunctions("cargo"); 
});
// Adds a refresh button to the edit dropbox
importScriptPage('PurgeButton/code.js', 'dev');

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = [];     
var allClasses = {}; // associative map of class names to page elements
 
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
    var togglerElems = [];
    var toggleGroup = [];
 
    // initialize/clear any old information
    togglers = [];     
    allClasses = [];
 
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
                allClasses[elemClass] = [];
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = [];
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
                    togglers[togglerID] = [];
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
        f.base.value+'++'+f.qfront.value;
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});