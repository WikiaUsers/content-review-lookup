/*
Derived from http://www.wowwiki.com/index.php?title=Help:Tooltips/itemtooltip.js&oldid=1295378
Molded for AoCWiki
<pre>
*/
var ttfre = new RegExp("float:right; ", "g");
var re_feat = new RegExp('<div[^>]*?class=".*spelltable.*?".*?>.*?</table></div>');
var rlnk = new RegExp("<a.*?>(.+?)</a>","g");
var reR = new RegExp('.*<a[^>]*?title="(.*?)".*');
var ttFeatHTMLStart = "<div style=\"width: 280px; height: 196px; max-width:280px; position: relative; top: -58px; left: 10px; background:transparent url('https://images.wikia.nocookie.net/aoc/images//1/1c/Feats-res-bg.png') no-repeat; border: 0px; margin: 0px; padding: 10px 10px 10px 25px;\">";

function parseText_Feat(nArr) {
hideTipNonCache();
//Check to see if the XmlHttpRequests state is finished.
var tip = document.getElementById('tfb');
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.innerHTML = ttError("feat");
if (rawText) {
rawText = rawText.replace(cr, "").replace(lf, "").replace(ttfre, "").replace(rlnk,"$1");
tooltip = re_feat.exec(rawText);
if (tooltip != null) {
noCache = false;
tip.innerHTML = ttFeatHTMLStart+tooltip+"</div>";
} else if (rawText.indexOf("disambigpage") != -1 ) { // target is a disambig page
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>This feat is being linked to<br>through a disambiguation page.<br>You must link directly to the<br>feat page.</div>";
} else if (rawText.indexOf("redirectText") != -1) { // target is a redirect
noCache = false;
actualFeat = rawText.replace(reR, "$1");
if (actualFeat) {
getInfo(actualFeat, 2);
return false;
}
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>This feat is being linked to<br>through a redirect page.<br>You must link directly<br>to the feat page.</div>";
} else if (rawText.indexOf("noarticletext") != -1) { // target page does not exist
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>The target feat's page does not exist.<br>The page must be created in order<br>to display a tooltip.</div>";
}
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
//loading
if (tip) {
tip.innerHTML = ttLoading;
displayTip();
}
}
}

function showFeatTip(i) {
var Span = document.getElementById( "tt" + i );
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
featname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", featname);
ttLink.appendChild(newSpan);
} else {
featname = ttLink.lastChild.getAttribute("title");
}
getInfo(featname, 2);
}
}

function ttMouseOver_Feat() {
var Spans = document.getElementsByTagName( "span" );
for (var i = 0; i < Spans.length; i++) {
if (hasClass(Spans[i], "featlink")) {
if (Spans[i].innerHTML.toLowerCase().indexOf("<b>") == -1) { // don't show tooltip if on item page
Spans[i].setAttribute("id", "tt" + i);
Spans[i].onmouseover = showFeatTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}
}

ttMouseOver_Feat();


/*
</pre>
*/