/** Dynamic Navigation Bars *************************************
 *
 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
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
//	 indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
	var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
	if (!NavFrame || !NavToggle) {
		return false;
	}
 
	if (NavToggle.firstChild.data == NavigationBarHide) {// if shown now
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent') ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;
	} else if (NavToggle.firstChild.data == NavigationBarShow) {// if hidden now
		var TagRelations = {
			'table': 'table',
			'span':  'inline',
			'label': 'inline'
		};
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent') ) {
				var disp = TagRelations[NavChild.tagName.toLowerCase()];
				NavChild.style.display = ( disp ? disp : 'block' );
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
	var indexNavigationBar = 0;
	// iterate over all < div >-elements, < span >-elements, and <fieldset>-elements
	var blocks = document.getElementsByTagName("div");
	var spans = document.getElementsByTagName("span");
	var fieldsets = document.getElementsByTagName("fieldset");
	for(
			var i=0;
			i < spans.length;
			i++
		) blocks[blocks.length+i] = spans[i];
	for(
			var i=0;
			i < fieldsets.length;
			i++
		) blocks[blocks.length+spans.length+i] = fieldsets[i];
	for(
			var i=0; 
			NavFrame = blocks[i]; 
			i++
		) {
		// if found a navigation bar
		if (hasClass(NavFrame, "NavFrame")) {
 
			indexNavigationBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
			var NavToggleText = document.createTextNode(NavigationBarHide);
			NavToggle.appendChild(NavToggleText);
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for(
			  var j=0; 
			  j < NavFrame.childNodes.length; 
			  j++
			) {
			  if (hasClass(NavFrame.childNodes[j], "NavHead")) {
				if( NavFrame.childNodes[j].tagName.toLowerCase() == 'legend' )
					NavFrame.childNodes[j].appendChild(document.createTextNode(' - '));
				NavFrame.childNodes[j].appendChild(NavToggle);
			  }
			}
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
	// if more Navigation Bars found than Default: hide all
	if (indexNavigationBar >= NavigationBarShowDefault) {
		for(
				var i=1; 
				i<=indexNavigationBar; 
				i++
		) {
			toggleNavigationBar(i);
		}
	}
 
}
 
addOnloadHook( createNavigationBarToggleButton );
 
/*<pre>*/
 
/*<pre>*/