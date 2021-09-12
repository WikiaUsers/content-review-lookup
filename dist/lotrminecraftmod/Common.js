/* Any JavaScript here will be loaded for all users on every page load. */

// OTHER CODE //

/* Makes all quotes collapsible by default, excluding the first line.
*/

(function(window, $, mw) {
	if (mw.config.get('wgNamespaceNumber') != 1200 || window.quotesCollapsed) {
		return;
	}
	window.quotesCollapsed = true;
	
	// Select the node that will be observed for mutations
	var target = document.querySelector('#MessageWall');
	
	// Callback function to execute when mutations are observed
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
		    var quote = $('.quote:not(.customquote, .mw-collapsible)');
		    if(quote.length !== 0) {
		    	quote.each(function() {
		    		$(this).addClass("mw-collapsible mw-collapsed");
					$(this).html(
					    $(this).html().replace(
					        /^(.* wrote:(?:\n|<br>))([\s\S]*)$/m,
					        // [\s\S] = whitespace or non-whitespace = match all ~= [.\n]
					        '$1<span class="mw-collapsible-content">$2</span>'
					    )
					);
				});
				mw.hook("wikipage.content").fire($('#MessageWall'));
		    }
		});
	});
	
	// Options for the observer (which mutations to observe)
	var config = {childList: true, subtree: true};
	
	// Start observing the target node for configured mutations
	observer.observe(target, config);
})(this, jQuery, mediaWiki);

// Backwards compatibility - fix username insert in pre-UCP message walls and comments
(function(window, $, mw) {
	var username = mw.config.get("wgUserName");
	
	if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1 || window.nameInserted || !username || mw.config.get("wgIsMainPage")) {
		return;
	}
	window.nameInserted = true;
	
	// Select the node that will be observed for mutations
	var target = document.querySelector('#MessageWall, #articleComments');
	
	// Callback function to execute when mutations are observed
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
		    var replaceText = $(".insertusername");
		    if(replaceText.length !== 0) {
		    	replaceText.each(function() {
		    		if ($(this).text() !== username) {
						$(this).text(username);
					}
		    	});
		    }
		});
	});
	
	// Options for the observer (which mutations to observe)
	var config = {childList: true, subtree: true};
	
	// Start observing the target node for configured mutations
	observer.observe(target, config);
})(this, jQuery, mediaWiki);

// Get rid of semicolons in ActivityFeed on main page
$(".page-The_Lord_of_the_Rings_Minecraft_Mod_Wiki .mw-changeslist-line-inner").each(function(){
	$(this).html($(this).html().replace("‎; ",""));
});

/* Rayn -> Noloite (user request) */
$("[href$='Rayn_Turammarth'], [href$='Rayn%20Turammarth'], [href$='Rayn Turammarth']").each(function(){
    $(this).html($(this).html().replace("Rayn Turammarth", "Noloite"));
});

(function(window, $) {
	if (window.nameReplaced) {
		return;
	}
	window.nameReplaced = true;
	
	// Select the node that will be observed for mutations
	var target1 = document.querySelector('#MessageWall, #articleComments');
	var target2 = document.querySelector('.page-content');
	
	// Callback function to execute when mutations are observed
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
		    var replaceText = $("[href$='Rayn_Turammarth'], [href$='Rayn%20Turammarth'], .FormEntryPoint_text__7JAhS, .Message__edited-by, .EditedBy_edited-by__1ZEJN");
		    if (replaceText.length !== 0) {
		    	replaceText.each(function() {
		    		if ($(this).html().includes("Rayn Turammarth")) {
						$(this).html($(this).html().replace("Rayn Turammarth", "Noloite"));
		    		}
		    	});
		    }
		});
	});
	
	// Options for the observer (which mutations to observe)
	var config = {childList: true, subtree: true};
	
	// Start observing the target node for configured mutations
	if ([0, 500, 1200].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 && !mw.config.get("wgIsMainPage")) {
		observer.observe(target1, config);
	}
	if (mw.config.get('wgNamespaceNumber') === -1) {
		observer.observe(target2, config);
	}
})(this, jQuery);

/* Ajax-refresh button config options */
window.ajaxSpecialPages = ["Contributions","Log","WikiActivity","AbuseLog"];
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
   'ajaxrc-refresh-text': 'Auto-refresh',
   'ajaxrc-refresh-hover': 'Automatically refresh the page',
}}}}});

// Pre-sorted tables
// Any sortable table with the class "sorted" will be presorted by
// its first column, descending
$(function() {
	if(mw.config.get('wgPageName') != 'Servers') {
		setTimeout(function() {
	        $("table.article-table.sortable.sorted .headerSort:first-child").click();
	    }, 0);
	}
});

// Shuffle servers
if(mw.config.get('wgPageName') == 'Servers'){
    var $servers = $("#lotr-serverlist > tbody > tr");
    var count = $servers.length;
    var rows = [];
    for(var i = 1; i <= count; i++){
        $servers.eq(i).attr("id", i);
        rows.push(i);
    }
    var randrows = rows;
    randrows.sort(function() { return 0.5 - Math.random(); });
    for(var i = 1; i <= count; i++){
        if(randrows[i] != i){
            $("#"+i).insertBefore($("#"+randrows[i]));
        }
    }
}

  //********************************************\\
//** Worldmap (Template:MiddleEarthMap) [WIP] **\\
//************************************************\\

var maps = document.getElementsByClassName("worldmap");
for (var i = 0; i < maps.length; i++) {
    var map = maps[i];

/* Doesn't work due to missing CORS for image server :-(

getPixel = function(x, y) {
    var p = canvas.context.getImageData(x, y, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6); 
    return hex;
}

rgbToHex = function(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

    var img = document.createElement("img");
    img.src = 'https://vignette.wikia.nocookie.net/lotrminecraftmod/images/7/70/MiddleEarth.png/revision/latest?cb=20150605200727';
    img.style.visibility = "hidden";
//    document.body.appendChild(img);

    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style.border = "2px solid red";
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.style.visibility = "hidden";
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    document.body.appendChild(canvas);

alert("debug:" + GetPixel(10, 10));
alert("sucess");
*/

    // The current background-position; usually negative
    map.offX = -500;
    map.offY = -500;
    // The position where the dragging was started
    map.dragX = 0;
    map.dragY = 0;
    // The position to which the background will be moved
    map.newX = 0;
    map.newY = 0;
    // The current zoom level. Higher zoom level means bigger map
    map.zoom = 1.0;

    var MAX_ZOOM = 4.0;
    var MIN_ZOOM = 0.2;
    var ZOOM_SPEED = 0.1;

    // Called when the mouse cursor is pressed down inside the map
    var dragStart = function(e) {
        e.preventDefault();
        map.dragX = e.clientX;
        map.dragY = e.clientY;
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", update);
        return false;
    };
    // Called when the cursor is released anywhere on the screen.
    // This event is only triggered after a call of dragStart. It stops the listeners for this event and the update event.
    var dragEnd = function(e) {
        e.preventDefault();
        // If the mouse has not moved, it's no drag but a simple click action
        if (map.dragX == e.clientX && map.dragY == e.clientY) {
            var x = Math.floor(e.clientX * map.zoom - map.offX);
            var y = Math.floor(e.clientY * map.zoom - map.offY);
            //alert("Single click at position "+x+"|"+y);
            // TODO: Link to biome page
            document.removeEventListener("mousemove", update);
            document.removeEventListener("mouseup", dragEnd);
            return false;
        }
        map.offX = map.newX;
        map.offY = map.newY;
        document.removeEventListener("mousemove", update);
        document.removeEventListener("mouseup", dragEnd);
        return false;
    };
    // Called whenever the mouse moves while it is dragging the map
    var update = function(e) {
        map.newX = map.offX + e.clientX - map.dragX;
        map.newY = map.offY + e.clientY - map.dragY;
        var newpos = map.newX.toString() + "px " + map.newY.toString() + "px";
        map.style.backgroundPosition = newpos;
    };
    // Called whenever the mousewheel is scrolled while the cursor is inside the map
    var zoom = function(e) {
        e.preventDefault();
        // Delta always is a multiple of 3
        var delta = e.deltaY / 3;
        var old_zoom = map.zoom;
        map.zoom -= delta * (map.zoom / 15);
        // Apply zoom limits
        if (map.zoom < MIN_ZOOM) {
            map.zoom = MIN_ZOOM;
            return false;
        }
        if (map.zoom > MAX_ZOOM) {
            map.zoom = MAX_ZOOM;
            return false;
        }
        var sizeX = 3200 * map.zoom;
        var sizeY = 4000 * map.zoom;
        var newsize = "" + sizeX + "px " + sizeY + "px";
        map.style.backgroundSize = newsize;
        map.offX *= map.zoom / old_zoom;
        map.offY *= map.zoom / old_zoom;
        map.offX += ZOOM_SPEED * map.zoom * delta * (e.clientX - (map.clientWidth / 2));
        map.offY += ZOOM_SPEED * map.zoom * delta * (e.clientY - (map.clientHeight / 2));
        var newpos = "" + map.offX + "px " + map.offY + "px";
        map.style.backgroundPosition = newpos;
        return false;
    }
    // Start the initial event listeners
    map.addEventListener("mousedown", dragStart);
    map.addEventListener("wheel", zoom);
}