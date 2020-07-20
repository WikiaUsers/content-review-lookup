/***** ajax translations ********
 * Ajax translation of layout templates (licenses templates)
 * See talk page for documentation.
 *
 * Maintainers: [[User:ערן]], [[User:Ilmari Karonen]]
 * Last update: 2009-10-10
 */
if (typeof (loadSpecificTranslation) == 'undefined') {
    (function () {
	function initAjaxTranslation () {
	    // check if the user has disabled this feature
	    if (window.disableAjaxTranslation) return;

	    // find layout tables in document (licenses templates)
	    // this is so complicated because getElementsByClassName(document, '*', 'layouttemplate') is dead slow on IE
	    if (document.getElementsByClassName) {
		// we have a native getElementsByClassName() method, use it
		// for consistency with the code below, only process div and table tags
		var elements = document.getElementsByClassName("layouttemplate");
		for (var i = 0; i < elements.length; i++) {
		    if (/^(div|table)$/i.test(elements[i].tagName)) updateLangLinks(elements[i]);
		}
	    } else {
		// no native getElementsByClassName(), just loop over all divs and tables
		var elements = document.getElementsByTagName("div");
		for (var i = 0; i < elements.length; i++) {
		    if (/(^|\s)layouttemplate(\s|$)/.test(elements[i].className)) updateLangLinks(elements[i]);
		}
		elements = document.getElementsByTagName("table");
		for (var i = 0; i < elements.length; i++) {
		    if (/(^|\s)layouttemplate(\s|$)/.test(elements[i].className)) updateLangLinks(elements[i]);
		}
	    }
	}


	function updateLangLinks (layoutTemplate) {
	    var links = layoutTemplate.getElementsByTagName("a");
	    var langLinkRgx = new RegExp("^(" +
					 wgServer.replace(/([^a-z0-9])/ig, "\\$1") +
					 "|)" +
					 wgArticlePath.replace(/([^a-z0-9])/ig, "\\$1").
					 replace("\\$1","(Template:.*/[a-z]{2,3}(-[a-z]+)?)") +
					 "$");
	    for (var i = 0 ; i < links.length; i++) {
		var m = langLinkRgx.exec(links[i].href);
		if (!m) continue; // bahh it isn't translation link. skip it
		links[i].setAttribute('title', decodeURIComponent(m[2]).replace(/_/g, " ")); // ext. links have no title by default
		// links[i].removeAttribute('href');
		// links[i].style.cursor = 'pointer';
		addClickHandler(links[i], loadAjaxTranslation);
	    }
	}


	var lastLayoutTemplate;
	function loadAjaxTranslation (evt) {
	    // if the user has disabled this feature (and we didn't catch it in init), do nothing
	    if (window.disableAjaxTranslation) return true;

	    evt = evt || window.event; // for IE6 get the event form window
	    var linkElement = evt.srcElement || evt.target; // srcElement for IE, target for FF

	    var templateName = linkElement.title;
	    if (!templateName) return true;
	    templateName = templateName.replace(/[\s_]+/g, "_");
            var templateParts = /^Template:(.*)\/([a-z]{2,3}(-[a-z]+)?)$/.exec(templateName);
            if (!templateParts || !templateParts.length) return true;

	    lastLayoutTemplate = linkElement.parentNode;
	    // recursively find the parent layouttemplate of the element
	    while (lastLayoutTemplate != null && !/(^|\s)layouttemplate(\s|$)/.test(lastLayoutTemplate.className)) {
		lastLayoutTemplate = lastLayoutTemplate.parentNode;
	    }
	    if (lastLayoutTemplate == null) return; // error. can't find layoutTemplate parent

	    // try to find encoded template args, if supplied (EXPERIMENTAL)
	    var templateArgs = "";
	    var argsElements = getElementsByClassName(lastLayoutTemplate, "*", "layouttemplateargs");
	    for (var i = 0; i < argsElements.length; i++) {
		var m = /^template=(\S+)\s/.exec(argsElements[i].title);
		if (m && m.length && decodeURIComponent(m[1].replace(/\+/g, " ")).replace(/[\s_]+/g, "_") == templateParts[1]) break;
	    } 
	    if (i < argsElements.length) {
		// TODO: we should try to escape any wiki special chars here...
		// "|" can be replaced by "{{!}}", but what about braces themselves?
		var args = argsElements[i].title.split(/\s+/);
		for (var j = 1; j < args.length; j++) {
		    if (!/\S/.test(args[j])) continue;
		    templateArgs += "|" + decodeURIComponent(args[j].replace(/\+/g, " ")).replace(/\|/g, "{"+"{!}}");
		}
	    }
	    // {{urlencode:}} turns parser extension tags into garbage; we can't undo it, so we just give up if it's happened
	    if (/\x7FUNIQ/.test(templateArgs)) return true;

	    var currentDate = new Date();
	    var urlToLoad = wgServer + wgScriptPath + '/api.php' +
		'?action=parse&format=json&maxage=3600&smaxage=3600&prop=text' +
		'&text=' + encodeURIComponent('{'+'{' + templateName + templateArgs + '}}') +
		'&title=' + encodeURIComponent(wgPageName) +
		'&uselang=' + encodeURIComponent(templateParts[2]) +
		'&callback=loadSpecificTranslation';

	    // loading very long URLs will fail due to client or server limits
	    // usually the 4kb server limit is hit first, but IE's 2kb limit is lower
	    // TODO: revert to a POST request instead of just giving up?
	    var maxUrlLength = (/MSIE/.test(navigator.userAgent) ? 2048 : 4092 - wgServer.length);
	    if (urlToLoad.length > maxUrlLength - 100) return true;  // 100 byte safety margin

	    // using importScriptURI instead of sajax_init_object for supporting old browsers
	    importScriptURI(urlToLoad);
            delete loadedScripts[urlToLoad];  // we may want to reload the same URL later

	    // cancel the event, we've handled it
	    if (evt.preventDefault) evt.preventDefault();
	    return(evt.returnValue = false);
	}


	function loadSpecificTranslation (newTemplate) {
	    if (!newTemplate || !newTemplate.parse || !newTemplate.parse.text["*"])
		return; // some error... ;-(
	    var sourceForNewTemplate = newTemplate.parse.text["*"];
	    var prevTemplate = lastLayoutTemplate;

	    var newTemp = document.createElement("div");
	    newTemp.innerHTML = sourceForNewTemplate;
	    prevTemplate.parentNode.insertBefore(newTemp, prevTemplate);
	    prevTemplate.parentNode.removeChild(prevTemplate);

	    updateLangLinks(newTemp);
	    //initAjaxTranslation(); // reinit ajax translation
	}
	window.loadSpecificTranslation = loadSpecificTranslation;
	addOnloadHook(initAjaxTranslation);
    })();
}