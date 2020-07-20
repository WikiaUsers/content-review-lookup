/**
 * Some tips when editing this page...
 *
 ** Make sure that your code has been tested in the latest version of Firefox AND Internet Explorer! (Nobody cares about older versions)
 ** No compressed JS. Ever. Compressed JS is fucking annoying for sausages to edit or debug.
 ** Make sure that your code follows some coding conventions, preferrably MediaWiki's (see http://www.mediawiki.org/wiki/Manual:Coding_conventions)
 *
 * Your friendly neighborhood MediaWiki developer,
 * --Jack Phoenix, 26 July 2009
 * <jack@countervandalism.net>
 */
// Tools: [http://uncyclopedia.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]
// <pre><nowiki>
 
 
/* search default text provided by Nachteule */
jQuery(document).ready(function() {
	jQuery("#searchInput").val("Search");
	jQuery("#searchInput").css("color", "#888");
	jQuery("#searchInput").bind("focus", function(event) {
		jQuery("#searchInput").val("");
		jQuery("#searchInput").css("color", "");
	});
	jQuery("#searchInput").bind("blur", function(event) {
		if (jQuery("#searchInput").val() === "") {
			jQuery("#searchInput").val("Search");
			jQuery("#searchInput").css("color", "#888");
		}
	});
})
 
//<nowiki>
/*ajaxwatch.js*/

if(typeof AjaxWatch==="undefined"||!AjaxWatch){
	var AjaxWatch={
		watchMsg:"Taco",
		unwatchMsg:"Detaco",
		watchingMsg:"Tacoing...",
		unwatchingMsg:"Detacoing...",
		'tooltip-ca-watchMsg':"Tilføj denne side til din overvågningsliste",
		'tooltip-ca-unwatchMsg':"Fjern denne side fea din overvågningsliste"
	};
}

AjaxWatch.supported=true;
AjaxWatch.watching=false;
AjaxWatch.inprogress=false;
AjaxWatch.timeoutID=null;
AjaxWatch.watchLinks=[];
AjaxWatch.imgBasePath="";

AjaxWatch.setLinkText=function(newText) {
	for(i=0; i<AjaxWatch.watchLinks.length; i++){
		changeText(AjaxWatch.watchLinks[i], '');

		// Because firefox keeps the old children
		if (!document.getElementById('watch-star') && !document.getElementById('unwatch-star')) 
			var innera = document.createElement("img");
		else if (document.getElementById('watch-star'))
			var innera = document.getElementById('watch-star');
		else var innera = document.getElementById('unwatch-star');
		innera.src = 'https://images.wikia.nocookie.net/__cb20060516011831/uncyclopedia/images/5/52/Spacer.gif';
		innera.id = 'watch-star';
		innera.setAttribute('width', '17px');
		innera.setAttribute('height', '17px');
		
		if(newText==AjaxWatch.unwatchingMsg || newText==AjaxWatch.unwatchMsg) {
			innera.id = 'unwatch-star';
		}
		if(newText==AjaxWatch.watchMsg||newText==AjaxWatch.unwatchMsg){
			var keyCommand=AjaxWatch.watchLinks[i].title.match(/\[.*?\]$/)?AjaxWatch.watchLinks[i].title.match(/\[.*?\]$/)[0]:"";
			AjaxWatch.watchLinks[i].title=(newText==AjaxWatch.watchMsg?AjaxWatch['tooltip-ca-watchMsg']:AjaxWatch['tooltip-ca-unwatchMsg'])+" "+keyCommand;
		}
		if (!(document.getElementById('watch-star') || document.getElementById('unwatch-star')) ) 
			AjaxWatch.watchLinks[i].appendChild(innera);
	}
};

AjaxWatch.setLinkID=function(newId){
	AjaxWatch.watchLinks[0].parentNode.setAttribute('id',newId);
};

AjaxWatch.setHref=function(string){
	for(i=0; i<AjaxWatch.watchLinks.length; i++) {
		if(string=='watch'){
			AjaxWatch.watchLinks[i].href=AjaxWatch.watchLinks[i].href.replace(/&action=unwatch/,'&action=watch');
		}else if(string=='unwatch'){
			AjaxWatch.watchLinks[i].href=AjaxWatch.watchLinks[i].href.replace(/&action=watch/,'&action=unwatch');
		}
	}
}

AjaxWatch.ajaxCall=function(){
	if(!AjaxWatch.supported){
		return true;
	}else if(AjaxWatch.inprogress){
		return false;
	}
	if(!wfSupportsAjax()){
		AjaxWatch.supported=false;
	return true;
}

AjaxWatch.inprogress=true;
AjaxWatch.setLinkText(AjaxWatch.watching?AjaxWatch.unwatchingMsg:AjaxWatch.watchingMsg);
var old_sajax_request_type=sajax_request_type;
sajax_request_type="POST";
sajax_do_call("wfAjaxWatch",[wgPageName,(AjaxWatch.watching?"u":"w")],AjaxWatch.processResult);
sajax_request_type=old_sajax_request_type;

AjaxWatch.timeoutID=window.setTimeout(function(){ 
	AjaxWatch.inprogress=false; },10000);
	return false;
};

AjaxWatch.processResult=function(request){
	if(!AjaxWatch.supported){
		return;
	}
	var response=request.responseText;
	if(response.match(/^<w#>/)){
		AjaxWatch.watching=true;
		AjaxWatch.setLinkText(AjaxWatch.unwatchMsg);
		AjaxWatch.setLinkID("ca-unwatch");
		AjaxWatch.setHref('unwatch');
	}else if(response.match(/^<u#>/)){
		AjaxWatch.watching=false;
		AjaxWatch.setLinkText(AjaxWatch.watchMsg);
		AjaxWatch.setLinkID("ca-watch");
		AjaxWatch.setHref('watch');
	}else{
		window.location.href=AjaxWatch.watchLinks[0].href;
		return;
	}
	if(typeof wgEnableWikiaFollowedPages==="undefined"||!wgEnableWikiaFollowedPages){
		jsMsg(response.substr(4),'watch');
	}
	AjaxWatch.inprogress=false;
	if(AjaxWatch.timeoutID){
		window.clearTimeout(AjaxWatch.timeoutID);
	}
	var watchthis=document.getElementById("wpWatchthis");
	if(watchthis&&response.match(/^<[uw]#>/)){
		watchthis.checked=response.match(/^<w#>/)?"checked":"";
	}
	return;
};

AjaxWatch.onLoad=function(){
	var el1=document.getElementById("ca-unwatch");
	var el2=null;
	if(!el1){
		el1=document.getElementById("mw-unwatch-link1");
		el2=document.getElementById("mw-unwatch-link2");
	}
	if(el1){
		AjaxWatch.watching=true;
	}else{
		AjaxWatch.watching=false;
		el1=document.getElementById("ca-watch");
		if(!el1){
			el1=document.getElementById("mw-watch-link1");
			el2=document.getElementById("mw-watch-link2");
		}
		if(!el1){
			AjaxWatch.supported=false;
			return;
		}
	}
	AjaxWatch.watchLinks.push(el1.tagName.toLowerCase()=="a"?el1:el1.firstChild);
	if(el2){
		AjaxWatch.watchLinks.push(el2);
	}
	for(i=0; i<AjaxWatch.watchLinks.length; i++){
		AjaxWatch.watchLinks[i].onclick=AjaxWatch.ajaxCall;
		if (AjaxWatch.watching == false) AjaxWatch.setLinkText(AjaxWatch.watchMsg);
		else AjaxWatch.setLinkText(AjaxWatch.unwatchMsg);
	}
	return;
};

// IE doesn't work and I don't know how/can't be arsed to fix it
if(typeof hookEvent!='undefined' && navigator.appName != 'Microsoft Internet Explorer') YAHOO.util.Event.onContentReady('p-cactions', AjaxWatch.onLoad );
if(typeof hookEvent!='undefined' && navigator.appName != 'Microsoft Internet Explorer') hookEvent("load",AjaxWatch.onLoad);

//</nowiki>
 
// </nowiki></pre>