if (wgPageName == "대문") {
} else {
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
	newSection.innerHTML = '<object width="310" height="360" id="obj_1324551664093"><param name="movie" value="http://mabinogi-wikia.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1324551664093&b=100&c=666666&d=666666&g=333333&j=333333&k=FFFFFF&l=CCCCCC&m=FFFFFF&s=1"/><embed id="emb_1324551664093" src="http://mabinogi-wikia.chatango.com/group" width="250" height="360" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1324551664093&b=100&c=666666&d=666666&g=333333&j=333333&k=FFFFFF&l=CCCCCC&m=FFFFFF&s=1"></embed></object>';
	newSection.setAttribute('class',"module");
	section.parentNode.insertBefore(newSection,section);
     }
     addOnloadHook(insertChatangoSection);
}