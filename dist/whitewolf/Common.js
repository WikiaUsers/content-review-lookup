/* Any JavaScript here will be loaded for all users on every page load. */

function changeContentLastReleases()
{
  document.getElementById('infoBox').innerHTML="{{LastReleases}}";
}

/** Gameicons stuff *******************************
 * and other various JS bits 'n' pieces
 */

addOnloadHook(loadFunc);

function loadFunc()
{
	rewriteTitle();

	showGames('title-gameicons');
	showGames('title-shortcut');

	rewriteHover();
	//replaceSearchIcon();
}

function rewriteTitle()
{
	if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
		return;

	var titleDiv = document.getElementById("RealTitle");

	if(titleDiv == null)
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild(cloneNode, node);
	cloneNode.style.display = "inline";
        document.getElementById("RealTitleBanner").style.display = "none";
}

function getFirstHeading()
{
        if(skin=="quartz"){
          var elements = getElementsByClassName(document.getElementById('article'), 'h1', 'firstHeading');
        }
	else{ /*monobook, etc*/
          var elements = getElementsByClassName(document.getElementById('content'), 'h1', 'firstHeading');
        }
	return (elements != null && elements.length > 0) ? elements[0] : null;
}

function showGames(className)
{
	if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
		return;

	var titleDiv = document.getElementById(className);

	if(titleDiv == null || titleDiv == undefined)
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

function rewriteHover()
{
	var gbl = document.getElementById("hover-global");

	if(gbl == null)
		return;

	var nodes = getElementsByClassName(gbl,'*','hoverable')

	for (var i = 0; i < nodes.length; i++)
	{
		nodes[i].onmouseover = function()
		{
			this.className += " over";
				}

				nodes[i].onmouseout = function()
		{
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}