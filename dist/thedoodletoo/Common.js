/* Import other scripts */
 
importArticles({
    type: "script",
    articles: [
	"MediaWiki:Common.js/accountNavigation.js",	// Add Contribs
	"MediaWiki:Common.js/ajaxrefresh.js",		// Auto Refresh
	"MediaWiki:Common.js/pagetitle.js",		// Title Rewrite
	"MediaWiki:Common.js/mastheadBoxes.js",         // Masthead Boxes
	"MediaWiki:Common.js/highlightTable.js",        // Hilight table
    ]
});
var DynboxHide = '[Hide]';
var DynboxShow = '[Show]';
var DynboxLoad = '[Load]';
 
function toggleDynbox(index) {
	var toggleButton = document.getElementById("DynboxToggle" + index);
	var frame = document.getElementById("DynboxFrame" + index);
	if(!toggleButton || !frame)
		return false;
	if(toggleButton.firstChild.data == DynboxHide) {
		for(var child=frame.firstChild; child!=null; child=child.nextSibling) {
			if(child.className == 'DynboxContent')
				child.style.display = 'none';
			else if(child.className == 'DynboxPreview')
				child.style.display = 'block';
		}
		toggleButton.firstChild.data = DynboxShow;
	} else if (toggleButton.firstChild.data == DynboxShow || toggleButton.firstChild.data == DynboxLoad) {
		for(var child=frame.firstChild; child!=null; child=child.nextSibling) {
			if(child.className == 'DynboxContent')
				child.style.display = 'block';
			else if(child.className == 'DynboxPreview')
				child.style.display = 'none';
			else if(child.className == 'DynboxLoad') { 
				var req = false;
				if(window.XMLHttpRequest)
					req = new XMLHttpRequest();
				else
					req = new ActiveXObject("Msxml2.XMLHTTP");
				req.open("GET", wgServer + wgScript + "?title=" + encodeURI(child.id) + "&action=render", false);
				req.send(null);
				child.innerHTML = req.responseText;
				child.style.display = 'block';
				child.setAttribute('class', 'DynboxContent');
				child.setAttribute('className', 'DynboxContent');
			}
		}
		toggleButton.firstChild.data = DynboxHide;
	}
}
function registerDynboxes() {
	var index = 0;
	var frames = document.getElementsByTagName("div");
	for (var i=0; frame=frames[i]; i++) {
		if (frame.className == "DynboxFrame") {
			index++;
			var toggleButton = document.createElement("a");
			toggleButton.className = 'DynboxToggle';
			toggleButton.setAttribute('id', 'DynboxToggle' + index);
			toggleButton.setAttribute('href', 'javascript:toggleDynbox(' + index + ');');
			toggleButton.appendChild(document.createTextNode(DynboxShow));
			for(var j=0; j<frame.childNodes.length; j++) {
				if(frame.childNodes[j].className == "DynboxHead")
					frame.childNodes[j].appendChild(toggleButton);
				else if(frame.childNodes[j].className == "DynboxLoad")
					toggleButton.firstChild.data = DynboxLoad;
			}
			frame.setAttribute('id', 'DynboxFrame' + index);
		}
	}
}
hookEvent("load", registerDynboxes);