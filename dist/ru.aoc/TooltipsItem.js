/*
Derived from http://www.wowwiki.com/index.php?title=Help:Tooltips/itemtooltip.js&oldid=1295378
Molded for AoCWiki
<pre>
*/
var ttfre = new RegExp("float:right; ", "g");
var re = new RegExp('<div[^>]*?class=".*?itemtable.*?".*?>.*?</table></div>');
var reR = new RegExp('.*<a[^>]*?title="(.*?)".*');

function parseText(nArr) {
hideTipNonCache();
//Check to see if the XmlHttpRequests state is finished.
var tip = document.getElementById('tfb');
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.innerHTML = ttError("item");
if (rawText) {
rawText = rawText.replace(cr, "").replace(lf, "").replace(ttfre, "");
if(skin!="monaco") rawText = rawText.replace("font-size:89%;", "font-size:1.15em;");
tooltip = re.exec(rawText);
if (tooltip != null) {
noCache = false;
tip.innerHTML = tooltip;
} else if (rawText.indexOf("disambigpage") != -1 ) { // target is a disambig page
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Ошибка</b><br>This item is being linked to<br>through a disambiguation page.<br>You must link directly to the<br>item page.</div>";
} else if (rawText.indexOf("redirectText") != -1) { // target is a redirect
noCache = false;
actualItem = rawText.replace(reR, "$1");
if (actualItem) {
getInfo(actualItem, 1);
return false;
}
tip.innerHTML = ttHTMLStart + "<b>Ошибка</b><br>Ссылка ведёт<br>на страницу-перенаправление.<br>Вы должны ссылаться прямо<br>на страницу предмета.</div>";
} else if (rawText.indexOf("noarticletext") != -1) { // target page does not exist
noCache = false;
tip.innerHTML = ttHTMLStart + "<b>Ошибка</b><br>Страница описания предмета не существует. Её следует создать,<br>чтобы появилась подсказка.</div>";
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

function showItemTip(i) {
var Span = document.getElementById( "tt" + i );
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
itemname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", itemname);
ttLink.appendChild(newSpan);
} else {
itemname = ttLink.lastChild.getAttribute("title");
}
getInfo(itemname, 1);
}
}

function ttMouseOver() {
var Spans = document.getElementsByTagName( "span" );
for (var i = 0; i < Spans.length; i++) {
if (hasClass(Spans[i], "itemlink")) {
if (Spans[i].innerHTML.toLowerCase().indexOf("<b>") == -1) { // don't show tooltip if on item page
Spans[i].setAttribute("id", "tt" + i);
Spans[i].onmouseover = showItemTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}
}

ttMouseOver();


/*
</pre>
*/