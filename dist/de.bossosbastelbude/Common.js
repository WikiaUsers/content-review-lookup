/* Any JavaScript here will be loaded for all users on every page load. */
/* Main page */
if( wgPageName === "Civilization_Games_Wiki") {
	$(document).ready(function() {
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
 
// <syntax type="javascript">
 
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
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>

/* Adventskalendar */
if (mediaWiki.config.get('wgPageName') === "Adventskalender") {
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	} 
 
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	} 
 
	$(document).ready(function() {
		var date = new Date();
		var currentmonth = date.getMonth(); // 0-11: January is 0, December is 11
		var currentday = date.getDate(); 
		var currentyear = date.getYear();
		var cookie = jQuery.parseJSON(getCookie("advent"));
 
		$('.advent .item').each(function(index) {
			var opened = $(this).data('opened');
			var day = $(this).data('day');
			var image = $(this).data('image');
			var link = $(this).data('link');
 
			if(cookie) {
				var thisopened = cookie[day];
				if(thisopened === 1) {
					$(this).removeClass('canopen');
					$('img',this).attr('src',image);
					$('img',this).wrap('<a href="' + link + '">');
					$(this).data('opened','1');
				}
			}
			if(currentmonth == 11 && currentday >= day && opened == 0 || currentmonth == 10 && currentday >= day && opened == 0 || currentyear > 2014 && opened == 0) {
				$(this).addClass('canopen');
				$(this).attr('style','cursor: pointer;');
			}
		});
 
		$('.advent .canopen').hover(function() {	
			var opened = $(this).data('opened');
			if(!opened) {
				var originalimage = $('img',this).attr('src');
				$(this).data('original',originalimage);
				var hoverimage = $(this).data('hover');
				$('img',this).attr('src',hoverimage);
			}
		}, function() {
			var opened = $(this).data('opened');
			if(!opened) {
				var originalimage = $(this).data('original');
				$('img',this).attr('src',originalimage);
			}
		});
		$('.advent .item').on('click',function() {
			var opened = $(this).data('opened');
			var day = $(this).data('day');
			var image = $(this).data('image');
			var link = $(this).data('link');
			if(!cookie) {
				cookie = {};
			}
			if(currentmonth == 11 && currentday >= day || currentmonth == 10 && currentday >= day || currentyear > 2014) {
				$('img',this).attr('src',image);
				$('img',this).wrap('<a href="' + link + '">');
				$(this).data('opened','1');
				cookie[day] = 1;
				setCookie("advent",JSON.stringify(cookie),365);
			}
		});
	});
}