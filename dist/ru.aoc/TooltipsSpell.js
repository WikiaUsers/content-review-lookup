/*
Derived from http://www.wowwiki.com/index.php?title=Help:Tooltips/itemtooltip.js&oldid=1295378
Molded for AoCWiki
<pre>
*/
var re_spell = new RegExp('<div[^>]*?class=".*?spelltable.*?".*?>.*?</table></div>');
var rlnk = new RegExp("<a.*?>(.+?)</a>","g");

function parseText_Spell(nArr) {
hideTipNonCache();
//Check to see if the XmlHttpRequests state is finished.
var tip = document.getElementById('tfb');
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.innerHTML = ttError("spell");
if (rawText) {
rawText = rawText.replace(cr, "").replace(lf, "").replace(ttfre, "").replace(rlnk,"$1");
if(skin!="monaco") rawText = rawText.replace("font-size:89%;", "font-size:1.15em;");
tooltip = re_spell.exec(rawText);
if (tooltip != null) {
noCache = false;
tip.innerHTML = tooltip;
} else if (rawText.indexOf("disambigpage") != -1 ) { // target is a disambig page
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>This spell is being linked to<br>through a disambiguation page.<br>You must link directly to the<br>spell page.</div>";
} else if (rawText.indexOf("redirectText") != -1) { // target is a redirect
noCache = false;
actualSpell = rawText.replace(reR, "$1");
if (actualSpell) {
getInfo(actualSpell, 3);
return false;
}
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>This spell is being linked to<br>through a redirect page.<br>You must link directly<br>to the spell page.</div>";
} else if (rawText.indexOf("noarticletext") != -1) { // target page does not exist
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Error</b><br>The target spell's page does not exist.<br>The page must be created in order<br>to display a tooltip.</div>";
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

function showSpellTip(i) {
var Span = document.getElementById( "tt" + i );
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
spellname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", spellname);
ttLink.appendChild(newSpan);
} else {
spellname = ttLink.lastChild.getAttribute("title");
}
getInfo(spellname, 3);
}
}

function ttMouseOver_Spell() {
var Spans = document.getElementsByTagName( "span" );
for (var i = 0; i < Spans.length; i++) {
if (hasClass(Spans[i], "spelllink")) {
if (Spans[i].innerHTML.toLowerCase().indexOf("<b>") == -1) { // don't show tooltip if on item page
Spans[i].setAttribute("id", "tt" + i);
Spans[i].onmouseover = showSpellTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}
}

ttMouseOver_Spell();


/*
</pre>
*/