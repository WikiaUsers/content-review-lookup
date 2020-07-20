/* Dynamic Navigation Bars */
// set up the words in your language
var NavigationBarHide = '[ukryj]';
var NavigationBarShow = '[pokaż]';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 0;


// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavBar)
{
	var NavToggle = document.getElementById("NavToggle" + indexNavBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavBar);
	
	if (!NavFrame || !NavToggle)
		return
	;
	
	// values to be set
	var currDisplay;
	var currTitle;
	
	// if shown now
	if (NavToggle.firstChild.data == NavigationBarHide)
	{
		currDisplay = 'none';
		currTitle = NavigationBarShow;
	}
	// if hidden now
	else if (NavToggle.firstChild.data == NavigationBarShow)
	{
		currDisplay = 'block';
		currTitle = NavigationBarHide;
	}
	
	for (var NavChild=NavFrame.firstChild; NavChild!=null; NavChild=NavChild.nextSibling)
	{
		if (NavChild.nodeType==1)	// only if this is an element node
		{
			if (NavChild.className=='NavPic' || NavChild.className=='NavContent')
				NavChild.style.display = currDisplay
			else if (NavChild.className == 'NavToggle')
				NavChild.firstChild.data = currTitle
			;
		}
	}
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
	var i;
	var indexNavBar = 0;
	var divs = document.getElementById('bodyContent').getElementsByTagName("div");
	// iterate over all < div >-elements
	for (i=0; i<divs.length; i++)
	{
		// if found a navigation bar
		if (divs[i].className == "NavFrame")
		{
			var NavFrame = divs[i];
			indexNavBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavBar + ');');
			
			var NavToggleText = document.createTextNode(NavigationBarHide);
			NavToggle.appendChild(NavToggleText);
			
			// add NavToggle-Button as first div-element 
			// in < div class="NavFrame" >
			NavFrame.insertBefore(NavToggle, NavFrame.firstChild);
			NavFrame.setAttribute('id', 'NavFrame' + indexNavBar);
		}
	}
	// if more Navigation Bars found than Default then hide all
	if (NavigationBarShowDefault < indexNavBar)
	{
		for(i=1; i<=indexNavBar; i++)
			toggleNavigationBar(i)
		;
	}

}

addOnloadHook(createNavigationBarToggleButton);