// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

if (wgCanonicalNamespace == 'User' || wgCanonicalNamespace == 'User_talk') {
$('<span class="button" onclick="hideBar()">Hide</span>').insertAfter('.UserProfileActionButton');
$('<span class="button" onclick="showBar()">Show</span>').insertAfter('.UserProfileActionButton');
}
 
function hideBar() {
$('#UserProfileMasthead').hide();
}
 
function showBar() {
$('#UserProfileMasthead').show();
}
// END Additional UserRights Icons in profile mastheads

/*
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
*/

/* Replace all the default avatar icons with a different one.
 * By Lunarity, 2013.
 */
(function($, window, ac, wa) {
	"use strict";
	var r = /\/Avatar.jpg\/(\d+)px-Avatar.jpg$/;
	function morphAvatars() {
		$('img.avatar[src$="px-Avatar.jpg"]').each(function() {
			var size = r.exec(this.src);
			if (!size) { return; }
			this.src = 'https://images.wikia.nocookie.net/merlin1/images/thumb/9/9f/Lurker_in_the_Woods.png/' + size[1] + 'px-Lurker_in_the_Woods.png';
		});
	}
	function makeHook(real) {
		function hookPaginate() {
			/*jshint validthis:true */
			var r = hookPaginate.realFunc.apply(this, arguments);
			morphAvatars();
			return r;
		}
		hookPaginate.realFunc = real;
		return hookPaginate;
	}

	if (ac) {
		ac.addHover = makeHook(ac.addHover);
	}
	if (wa) {
		var WikiAjax = wa.ajax;
		wa.ajax = function(a, b, callback) {
			return WikiAjax.call(this, a, b, makeHook(callback));
		};
	}
	window.ajaxCallAgain = window.ajaxCallAgain || [];
	window.ajaxCallAgain.push(morphAvatars);
})(jQuery, window, window.ArticleComments, window.WikiActivity);

//
//
//
if(!window.WIDGETBOX){(function(){var D=false;var C=function(){WIDGETBOX.setPageLoaded();};var B=function(){WIDGETBOX.setPageUnloaded();};WIDGETBOX={libs:{},version:"65737",urls:{runtimeBaseUrl:"http://www.widgetserver.com/syndication",galleryBaseUrl:"http://www.widgetbox.com",cdnRuntimeBaseUrl:"http://cdn.widgetserver.com/syndication",cdnGalleryBaseUrl:"http://pub.widgetbox.com",metricsBaseUrl:"http://t.widgetserver.com/t",proxyBaseUrl:"http://p.widgetserver.com/p",linkbarBaseUrl:"http://www.widgetserver.com/syndication/l",shareBaseUrl:"http://data.widgetserver.com/data-api",imageProxyBaseUrl:"http://p.widgetserver.com/p",dataApiBaseUrl:"http://data.widgetserver.com"},globals:{token:"",tokenTime:0,widgets:[],widgetCount:0,pageLoaded:false,pageUnloaded:false,eventListeners:[],pageLoadListeners:[],pageUnloadListeners:[],panels:[],panelCount:0,showPanelMarks:true,suppressGetWidget:false,disableGetWidget:false,enableLogging:false,disableHitTracking:false,log:"",trustedPage:false,disableInstallerMenu:false,renderInstallerMenuInline:false,anchorEl:null,vid:null,startTime:0,flashBlacklist:[],nextZIndex:5001,isTopAccessible:true,trackingKeys:{i:"appId",aik:"appPK",ri:"regId",ark:"regPK",uid:"userPK",apk:"providerPK",pnk:"installPartnerNetworkPK",gk:"fromGalleryPK",pt:"widgetPrototypeOrdinal",rv:"regVersion",rpv:"regPubVersion",iv:"appVersion",udd:"isUseDefaultDomain",dd:"defaultDomain"},shareTrackingKeyRegex:"sik|sid|iv|rv|rpv|v.S+|sd.S+|ud.S+"},init:function(){if(!D){D=true;WIDGETBOX.globals.startTime=(new Date()).getTime();if(window&&window.location&&window.location.protocol==="https:"){for(var H in WIDGETBOX.urls){if(WIDGETBOX.urls.hasOwnProperty(H)){WIDGETBOX.urls[H]=WIDGETBOX.urls[H].replace("http://","https://");}}}if(window.WIDGETBOXLOADLISTENERS){for(H=0;H<WIDGETBOXLOADLISTENERS.length;H++){A.addPageLoadListener(WIDGETBOXLOADLISTENERS[H]);}}A.addEvent(window,"load",C);A.addEvent(window,"unload",B);if(window.WIDGETBOXINITLISTENERS){for(H=0;H<WIDGETBOXINITLISTENERS.length;H++){try{WIDGETBOXINITLISTENERS[H]();}catch(J){WIDGETBOX.logMessage(J);}}}try{var K=new RegExp("[A-Za-z]+:[/][/][A-Za-z0-9.-]+");var G=window.document.referrer;if(G){G=G.toLowerCase();}var I=window.location.href;if(I){I=I.toLowerCase();}var M=G.match(K);var F=(M&&M[0])||G;var L=I.match(K);var E=(L&&L[0])||I;WIDGETBOX.globals.isTopAccessible=A==top||!E||E=="about:blank"||F==E;}catch(J){WIDGETBOX.logMessage(J);}}},namespace:function(G){G=G.replace(".","/");if(G.indexOf("WIDGETBOX/")===0){G=G.substr(10);}if(G.indexOf("POSTAPP/")===0){G=G.substr(8);}var E=G.split("/");var I=WIDGETBOX;if(E){var H;for(var F=0;F<E.length;F++){H=E[F];if(!I[H]){I[H]={};}I=I[H];}}return G;},logMessage:function(E){if(A.globals.enableLogging){A.globals.log+=E+"\n";}},newLibInfo:function(G){G=G.replace(".","/");var J=G;var H="";var F=G.lastIndexOf("/");if(F>=0){H=G.substr(0,F);J=G.substr(F+1);}H=A.namespace(H);G=H+"/"+J;var I=G.replace("/","_").toLowerCase();var E={ns:H,name:J,path:G,id:I,status:null,callback:null};return E;},load:function(G,F,H){var E=A.newLibInfo(G);if(!WIDGETBOX.libs[E.id]){WIDGETBOX.libs[E.id]=E;E.status="loading";if(F){if(!E.listeners){E.listeners=[];}E.listeners.push(F);}A.appendScript(((!H)?WIDGETBOX.urls.runtimeBaseUrl:WIDGETBOX.urls.cdnRuntimeBaseUrl)+"/"+E.path+".js?"+WIDGETBOX.version,"widgetbox_lib_"+E.id,"true");}else{E=WIDGETBOX.libs[E.id];if(F){if(E.status=="ready"){try{F(E);}catch(I){WIDGETBOX.logMessage(I);}}else{if(!E.listeners){E.listeners=[];}E.listeners.push(F);}}}},ready:function(F){var E=A.newLibInfo(F);if(!WIDGETBOX.libs[E.id]){WIDGETBOX.libs[E.id]=E;}E=WIDGETBOX.libs[E.id];return E.status=="ready";},setReady:function(G){var F=A.newLibInfo(G);if(!WIDGETBOX.libs[F.id]){WIDGETBOX.libs[F.id]=F;}F=WIDGETBOX.libs[F.id];F.status="ready";if(F.listeners){var E=0;for(E=0;E<F.listeners.length;E++){var H=F.listeners[E];try{H(F);}catch(I){WIDGETBOX.logMessage(I);}}}},appendScript:function(G,J,I,E){var F=document.createElement("script");F.id=J;F.type="text/javascript";if(I&&I!="false"){F.setAttribute("async",I);}if(E){F.onreadystatechange=function(){if(this.readyState=="complete"){E();}};F.onload=E;}F.src=G;var H=document.documentElement.firstChild;if(!H||(H.nodeName&&(H.nodeName.toLowerCase().indexOf("comment")>-1||H.nodeName.toLowerCase().indexOf("script")>-1))){H=document.getElementsByTagName("head")[0];}H.appendChild(F);},addEvent:function(I,H,F,E){if(!I){return ;}if(I.addEventListener){I.addEventListener(H,F,E);return true;}else{if(I.attachEvent){var G=I.attachEvent("on"+H,F);return G;}}},removeEvent:function(H,G,F,E){if(!H){return ;}if(H.removeEventListener){H.removeEventListener(G,F,E);return true;}else{if(H.detachEvent){return H.detachEvent("on"+G,F);}}},addEventListener:function(E,G){if(G){if(!A.globals.eventListeners){A.globals.eventListeners={};}if(!A.globals.eventListeners[E]){A.globals.eventListeners[E]=[];}var F=A.globals.eventListeners[E];F[F.length]=G;}},notifyEventListeners:function(F){if(!A.globals.eventListeners){return ;}var G=A.globals.eventListeners[F];if(!G){return ;}for(var E=0;E<G.length;E++){var H=G[E];try{H(this);}catch(I){WIDGETBOX.logMessage(I);}}},addPageLoadListener:function(E){if(E){if(!A.globals.pageLoaded){A.globals.pageLoadListeners.push(E);}else{try{E();}catch(F){WIDGETBOX.logMessage(F);}}}},addPageUnloadListener:function(E){if(E){if(!A.globals.pageUnloaded){A.globals.pageUnloadListeners.push(E);}else{try{E();}catch(F){WIDGETBOX.logMessage(F);}}}},setPageLoaded:function(){if(A.globals.pageLoaded){return ;}A.globals.pageLoaded=true;A.removeEvent(window,"load",C);var F=A.globals.pageLoadListeners;var E;for(E=0;E<F.length;E++){try{F[E]();}catch(G){WIDGETBOX.logMessage(G);}}},setPageUnloaded:function(){if(A.globals.pageUnloaded){return ;}A.globals.pageUnloaded=true;A.removeEvent(window,"unload",B);var E=A.globals.pageUnloadListeners;for(i=0;i<E.length;i++){try{E[i]();}catch(F){WIDGETBOX.logMessage(F);}}},generateGUID:function(H,E){var I=(H)?H:Math.random;var K=(E)?36:32,M="0123456789abcdef".split(""),F,G=[];if(E){G[8]=G[13]=G[18]=G[23]="-";G[14]="4";}for(var J=0;J<K;J++){if(!G[J]){F=0|I()*16;G[J]=M[(J==19)?(F&3)|8:F];}}var L=G.join("");if(!WIDGETBOX.globals.vid){WIDGETBOX.globals.vid=L;}return L;},generateProxiedImageUrl:function(E,H,G,F){var I=E;I=this.urls.imageProxyBaseUrl+"/ip/origin=="+encodeURIComponent(I);if(H){I+="&&w=="+Math.round(H);}if(G){I+="&&h=="+Math.round(G);}if(F){I+="&&type=="+F;}I+="?token="+WIDGETBOX.globals.token;return I;},createElement:function(F,E){if(E){return E.ownerDocument.createElement(F);}else{return document.createElement(F);}},isType:function(E,F){var G=Object.prototype.toString.call(F).slice(8,-1);return F!==undefined&&F!==null&&G===E;},extend:function(F,E){for(var G in E){F[G]=E[G];}return F;}};POSTAPP=WIDGETBOX;var A=WIDGETBOX;A.init();})();}
//

//SOF: subscriber/InsertWidget.js
//
    //support rendering a widget in an element by supplying and id to the element
    WIDGETBOX.renderWidgetInElement = function(appId, parentNodeId) {
        return WIDGETBOX.renderWidget(appId, false, parentNodeId);
    },
    WIDGETBOX.renderWidget = function(appId, mode, parentNodeId) {
        if (!parentNodeId) {
            parentNodeId = "widgetbox_widget_parent_" + WIDGETBOX.globals.widgetCount++;
            document.write('<div id="' + parentNodeId + '" style="line-height:0"></div>');
        }
        function libReadyCallback() {
            var parentNode = document.getElementById(parentNodeId);
            if (!parentNode) {
                document.write('<div id="' + parentNodeId + '" style="line-height:0"><span style="visibility:hidden">-</span></div>');
                parentNode = document.getElementById(parentNodeId);
            }
            WIDGETBOX.subscriber.Main.insertWidget(appId, null, parentNode, mode, null, null);
        }
        WIDGETBOX.load("subscriber.Main", libReadyCallback, true);
    };
//
//EOF: subscriber/InsertWidget.js