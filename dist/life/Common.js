/*<pre>*/
/* Any JavaScript here will be loaded for all users on every page load. */


// This script is to be used only for a specific page: 
if (wgPageName == "User:Jeiara/YUI") {
//alert('you are on the test page');
/* 1st Attempt
document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Carousel.js&action=raw&ctype=text/javascript"></script>');

    var myCarousel = new CarouselJs('go');

    YAHOO.util.Event.onDOMReady(myCarousel);
*/

/* 2nd Attempt
alert('attempt2');
    importScript('MediaWiki:Carousel.js');
function loadFunc() {
alert('doing load func');
    new CarouselJs('go');
alert('after creating new');
}
    addOnloadHook(loadFunc);
*/



/* 3rd Attempt
init = function() {
      importScript('MediaWiki:Carousel.js');
      new CarouselJs('go');
}

YAHOO.util.Event.onDOMReady(init);
*/




/* 4th Attempt */

function include(filename)
{
	var head = document.getElementsByTagName('head')[0];
	
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	
	head.appendChild(script)
}

function addEventHandler(target, eventType, handler) 
{
    if (target.addEventListener) {
        target.addEventListener(eventType, handler, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + eventType, handler);
    } else {
        target["on" + eventType] = handler;
    }
}


function includeFiles()
{
    include('/index.php?title=MediaWiki:Carousel.js&action=raw&ctype=text/javascript'); 
}

addEventHandler(window, "load", includeFiles);


} // end if wgPageName
 
/*</pre>*/