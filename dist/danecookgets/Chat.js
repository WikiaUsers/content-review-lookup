// Chatango in the wiki. Adapted from Dead Island Wiki.
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
function getElementsByClass(elementName, tagname, tclass){
	var itemsfound = new Array();
	var elements = elementName.getElementsByTagName(tagname);
	for(var i=0;i<elements.length;i++){
		if(hasClass(elements[i], tclass)){
			itemsfound.push(elements[i]);
		}
	}
	return itemsfound;
}
 
function insertChatangoSection(){
	var chatSection = getElementsByClass(document, 'section', 'ChatModule');
	if(chatSection[0] != null) chatSection[0].parentNode.removeChild(chatSection[0]);
	var section = getElementsByClass(document, 'section', 'WikiaBlogListingBox')[0];
	if(section == null){
		section = getElementsByClass(document, 'section', 'LatestPhotosModule')[0];
		if(section == null){
			section = getElementsByClass(document, 'section', 'CommunityCornerModule')[0];
			if(section == null){
				section = getElementsByClass(document, 'div', 'AchievementsModule')[0];
				if(section == null){
					section = getElementsByClass(document, 'section', 'FollowedPagesModule')[0];
					if(section == null){
						section = getElementsByClass(document, 'section', 'WikiaLatestEarnedBadgesModule')[0];
						if(section == null){
							section = document.getElementById('WikiaSpotlightsModule');
							if(section == null) return;
						}
					}
				}
			}
		}
	}
	var newSection = document.createElement("section");
	newSection.innerHTML = '<div id="ChatangoContainer"><object width="280" height="400" id="obj_1334317971346"><param name="movie" value="http://dealantics.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334317971346&a=323232&b=100&c=D5D4B9&d=70B8FF&e=666666&g=D5D4B9&k=FFFFFF&l=012E59&m=012E59&n=FFFFFF&q=323232&r=100"/><embed id="emb_1334317971346" src="http://dealantics.chatango.com/group" width="280" height="400" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334317971346&a=323232&b=100&c=D5D4B9&d=70B8FF&e=666666&g=D5D4B9&k=FFFFFF&l=012E59&m=012E59&n=FFFFFF&q=323232&r=100"></embed></object><br>[ <a href="http://dealantics.chatango.com/clonegroup?ts=1334317971346">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334317971346">Start New</a> | <a href="http://dealantics.chatango.com">Full Size</a> ]</div>';
	newSection.setAttribute('class',"module ChatangoModule");
	if (section.parentNode.className=='WikiaRail') {
                section.parentNode.insertBefore(newSection,section); 
        }
}
addOnloadHook(insertChatangoSection);