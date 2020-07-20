// ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
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
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ){
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons(){
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data.substring(0,NavigationBarHide.length) == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow + ' ' + NavToggle.firstChild.data.substring(NavigationBarHide.length);
 
     // if hidden now
     } else if (NavToggle.firstChild.data.substring(0,NavigationBarShow.length) == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide + ' ' +NavToggle.firstChild.data.substring(NavigationBarShow.length);
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
             indexNavigationBar++;
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
             for(var j=0;j < NavFrame.childNodes.length;j++) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
               // This is a hack particular to help.wikia for having the title clickable, meh
               if (hasClass(NavFrame.childNodes[j], "NavHeadToggle")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggleTitle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide + ' ' + NavFrame.childNodes[j].firstChild.nodeValue);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
                 NavFrame.childNodes[j].firstChild.nodeValue='';
               }
 
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(var i=1;i<=indexNavigationBar;i++) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );










// NOTE! Everything below this is part of the experimental board-browser


$(document).ready(function(){
        
        /**
         * MENU OPTIONS (default values in parenthesis)
         * ------------
         * div:        Where the slide-menu will go. ("#menu-container")
         * controls:   Where are the controls for the menu. ("#menu-controls")
         * loader:     If you are using a loading graphic, the menu will hide it for you once loaded. If not,
         *               set it to 'false' or ''. (false)
         * x:          Total width of list item including margins and padding in px. (150)
         * y:          Total height of list item including margins and padding in px. (150)
         * start:      Index of <ul> to open first. (0)
         * speed:      Speed of all animations in ms . (300)
         * delay:      Delay between list item animations when transitioning in ms. (60)
         * easing:     Type of easing to use for list item animations, use '' for no easing effect. ('')
         *               FYI - "easeOutBackSmall" is a custom addition I made for this demo, it is not included in the
         *               standard set of easing animations.
         * easeIn:     Type of easing to use for initial drop-in animation, use '' for none. ('')
         *               This demo includes the jQuery easing plugin: http://gsgd.co.uk/sandbox/jquery/easing/
         *               Supported easing methods in the plugin are listed and demoed at the above url.
         * preloadAll: Wait for all menu images to load before animating in, or just the first set? (false)
         *               By default, with this set to false, the menu will wait until all images in the first menu set are
         *               loaded before the beginning animation is fired. If set to true, it will wait for all menu images to load.
         */

        var options = {
                div: "#menu-container",
                controls: "#menu-controls",
                loader: "#loading",
                x: 150,
                y: 200,
                easing: "easeOutBackSmall",
                easeIn: "easeOutBack",
                preloadAll: true
        };
        
        
        var menu = new slideMenu(options);
        
        /*
                The menu will wait until images are loaded before initializing, see "preloadAll" above.
                If you want to wait until EVERYTHING on the page is loaded, simply do this:
                
                $(window).load(function(){
                        var menu = new slideMenu(options);
                });
        */

        
        /*----------------------------------------------------------------------------------
         * Demo stuff, not required for menu to work
         *---------------------------------------------------------------------------------*/
        var auto = false, x, inc;
        
        // Toggle x-ray
        $("#xray a").click(function(){
                toggle_xray();
                return false;
        });
        
        // Toggle auto
        $("#auto a").click(function(){
                toggle_auto();
                return false;
        });

        // If xray enabled on load, make it so!
        if (window.location.hash.substring(1) == 'xray') toggle_xray();

        function toggle_xray(){
                $(options.div).toggleClass("xray");
                $("#xray span").text($(options.div).hasClass("xray") ? 'ON' : 'OFF');
                window.location.hash = $(options.div).hasClass("xray") ? 'xray' : '';
        }
        
        function toggle_auto(){
                if (auto === false){
                        x = $("#menu-controls span.active").data("target");
						// x equals the target number prewritten in the tabs
                        auto_advance();
                        inc = setInterval(auto_advance, 3000);
                        auto = true;
                }
                else{
                        clearInterval(inc);
                        auto = false;
                }
                $("#auto span").text(auto === true ? 'ON' : 'OFF');
        }
        
        function auto_advance(){
                // Max index is 3, so don't go over
                x = x < 3 ? x + 1 : 0;
                // Using the switchTo method, we can advance the menu to a desired index
                menu.switchTo(x);
        }
                
});



var slideMenu = function(options){

        // Default values
        var defaults = {
                div: "#menu-container",
				// menu-container is assigned as 
				// the only div element involved here
                controls: "#menu-controls",
				// The menu-controls div is 
				// assigned as the controls variable.
				// Note: the first link on the far left
				// has been predefined in html as active
                loader: false,
                x: 150,
                y: 150,
                start: 0,
                speed: 300,
				// three seconds per transition
                delay: 60,
				// .6 seconds delays across images
				// so they don't slide in sync
                easing: '',
                easeIn: '',
                preloadAll: false
        };
        
        var o = options || {};
		// "o" will always stand for one of the objects defined at the very top
        
        for (var opt in defaults) o[opt] = (opt in o) ? o[opt] : defaults[opt];

        // In case someone types in an easing name wrong
        if (! jQuery.easing.hasOwnProperty(o.easing) && o.easing != '') o.easing = "easeOutBounce";
        if (! jQuery.easing.hasOwnProperty(o.easeIn) && o.easeIn != '') o.easeIn = "easeOutBack";
        
        // In case easing plugin is missing
        if (! jQuery.easing.hasOwnProperty("easeOutBounce")) o.easing = o.easeIn = '';
        
        var v = {
                middle: jQuery(document).width() / 2,
				// the center of the page is defined as "middle"
                active: o.start,
                c_w: jQuery(o.div).width(),
				// c_w is assigned as the container's width
                c_o: jQuery(o.div).offset(),
				// will return the top, left coordinates from the container
				// to the corner of the page
                count: 0,
				// resetting internal counter
                x: 0,
                s_l: jQuery(o.div + " ul:eq(" + o.start + ") li").length,
                animating: false,
                loading: {},
                loop_started: false
        };
        
        this.switchTo = function(to){
                do_animate(to, v.active);
        }
        
        function do_animate(to, from){
				// you've clicked a switch, now something here has
				// to determine which direction the images flow
                if (from < to) out_left(from, to);
                if (from > to) out_right(from, to);
				// out_right and out_left are the complete animation functions 
				// that will be defined below
                v.active = to;
                highlight_active();
				// reassigns the bold tab
        }
        
        function in_left(id, go){
                if (go == false) return;
                v.count = jQuery(o.div + " ul:eq(" + id + ") li").length;
				// the tabs at the bottom are already assigned "data target" numbers. 
                if (v.count > 0){
                        if (jQuery(o.div + " ul:eq(" + id + ") li:eq(0)").offset().left > v.middle){
                                // Move to left side first if isn't there
                                jQuery(o.div + " ul:eq(" + id + ") li").css("left", "-" + (v.c_w + o.x) + "px");
                        }
                        jQuery(o.div + " ul:eq(" + id + ") li").each(function(index){
                                v.x = (v.c_w / 2) + ((v.count / 2) * o.x) - (o.x * index);
                                jQuery(o.div + " ul:eq(" + id + ") li:eq(" + (v.count - index - 1) + ")").delay((index + 2) * o.delay).animate({left: "+=" + v.x}, o.speed, o.easing, function(){
                                        if (index + 1 == v.count) v.animating = false;
                                });
                        });
                }
        }
  
        function in_right(id, go){
                if (go == false) return;
                v.count = jQuery(o.div + " ul:eq(" + id + ") li").length;
                if (v.count > 0){
                        if (jQuery(o.div + " ul:eq(" + id + ") li:eq(0)").offset().left < v.middle){
                                // Move to right side first if isn't there
                                jQuery(o.div + " ul:eq(" + id + ") li").css("left", "0");
                        }
                        jQuery(o.div + " ul:eq(" + id + ") li").each(function(index){
                                v.x = (v.c_w / 2) + ((v.count / 2) * o.x) - (o.x * index);
                                jQuery(this).delay((index + 1) * o.delay).animate({left: "-=" + v.x}, o.speed, o.easing, function(){
								//
                                        if (index + 1 == v.count) v.animating = false;
                                });
                        });
                }
        }
        
        function out_left(id, to){
                v.animating = true;
                v.count = jQuery(o.div + " ul:eq(" + id + ") li").length;
                if (v.count > 0){
                        jQuery(o.div + " ul:eq(" + id + ") li").each(function(index){
                                v.x = jQuery(this).offset().left - v.c_o.left + o.x;
                                var last = (index + 1 == v.count) ? true : false;
                                jQuery(this).delay((index + 1) * o.delay).animate({left: "-=" + v.x}, o.speed, function(){in_right(to, last);});
                        });
                }
                else{
                        in_right(to, true);
                }
        }
  
        function out_right(id, to){
                v.animating = true;
                v.count = jQuery(o.div + " ul:eq(" + id + ") li").length;
                if (v.count > 0){
                        jQuery(o.div + " ul:eq(" + id + ") li").each(function(index){
                                v.x = v.c_w - jQuery(this).offset().left + v.c_o.left;
                                var last = (index + 1 == v.count) ? true : false;
                                jQuery(this).delay((v.count - index) * o.delay).animate({left: "+=" + v.x}, o.speed, function(){in_left(to, last);});
                        });
                }
                else{
                        in_left(to, true);
                }
        }
        
        // Move first list to top center and add load handlers to first set of images
        jQuery(o.div + " ul:eq(" + o.start + ") li").animate({left: "-=" + ((v.c_w / 2) + (o.x / 2)) + "px", top: -o.y}, 0);
        
        // Image load check
        var img_load = o.preloadAll == false ? o.div + " ul:eq(" + o.start + ") img" : o.div + " img";
        jQuery(img_load).each(function(index){
                v.loading[index] = true;
                v.loop_started = true;
                jQuery(this).load(function(){
                        delete v.loading[index];
                });
                if (this.complete) jQuery(this).trigger("load");
                // http://stackoverflow.com/questions/2392410/jquery-loading-images-with-complete-callback/2392448#2392448
        });
        
        // If first set of images is loaded, animate it in
        function try_animate_in(index){
                var count = 0;
                for (e in v.loading){count++;}
                if( v.loop_started == true && count == 0){
                        clearInterval(try_start);
                        // Hide loader
                        if (o.loader != false && o.loader != '') jQuery(o.loader).hide();
                        // Animate in
                        jQuery(o.div + " ul:eq(" + o.start + ") li").each(function(index){
                                v.x = (o.x / 2) + ((v.s_l / 2) * o.x) - (o.x * (index + 1));
                                jQuery(this).delay(o.delay).animate({left: "-=" + v.x, top: 0}, o.speed, o.easeIn);
                        });
                }
        }
        
        
        // Highlight active menu button
        function highlight_active(){
                jQuery(o.controls + " span.active").removeClass("active");
				// finds anything with the bold tag named active and removes it
				// Doesn't matter which ones
                jQuery(o.controls + " span:eq(" + v.active + ")").addClass("active");
				// selects the tab you clicked and makes it bold
        }
        
        // Handle menu clicks
        jQuery(o.controls + " span").click(function(e){
				// everything happens here
                e.preventDefault();
                if (v.animating == false){
                        do_animate(jQuery(this).data("target"), v.active);
                }
        });
        
        // Update values in case of resize
        window.addEventListener("resize", function() {
                v.middle = jQuery(document).width() / 2,
				// finds the middle again
                v.c_o = jQuery(o.div).offset();
				// finds the position from the top left corner of the page again
        }, false);
        
        // Keep checking until first set of images is loaded
        var try_start = setInterval(try_animate_in, 50);
}