/* Any JavaScript here will be loaded for all users on every page load. */
/** Tooltips *********************************************************
  *
  *  Description: Allows popups tooltips.
  */
 
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
    include('/index.php?title=User:Anthoron/tooltip.js&action=raw&ctype=text/javascript');
}

addEventHandler(window, "load", includeFiles);