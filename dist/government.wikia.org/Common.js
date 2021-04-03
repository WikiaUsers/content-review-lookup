/* Any JavaScript here will be loaded for all users on every page load. */
// ************************************************************
// category autopreload script
// ************************************************************
if(queryString('preload')) addOnloadHook(preloadcat)
function preloadcat() {
  if(queryString('preload')=='') return
  if(queryString('preload').indexOf('/autopreload')==-1) return
  var cat = queryString('preload').replace('/autopreload','');
  var text = document.getElementById('wpTextbox1');
  if(text.value.replace(/(\n|\t)/ig,'').length == 0) {
    text.value = '\n[[' + cat + ']]';
  }
}

function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}

// ************************************************************
// end category autopreload script
// ************************************************************

rmEditButtons=['all']
XEBOrder='A,B,C,D';
rmEditButtons=[0,1,2,3,4,5,6,7,8,9,10,B,D,C,D1,F,U,I1,I2,J1,E,Q,W,X,K,L,M,c,R1,P1];
myButtons=[];
{{subst:js|User:AnupamSaraph/extraeditbuttons.js}}

// The code here is from http://en.wikisource.org/wiki/Wikisource:Tools_and_scripts/More_editing_buttons

if (mwCustomEditButtons) {
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/83/Button_biocitas.png",
     "speedTip": "Author link",
     "tagOpen": '[[Author:',
     "tagClose": '|]]',
     "sampleText": "Insert link here"};
};


// Below this is an experimental copy from http://strategywiki.org/wiki/MediaWiki:Common.js

/* 

var isIE = (navigator.appName == "Microsoft Internet Explorer")
importedScripts = {}; function importScript( page ) { if( importedScripts[page] ) { return;}
importedScripts[page] = true; var url = wgScriptPath + '/index.php?title=' + encodeURIComponent( page.replace( / /g, '_' ) ) + '&action=raw&ctype=text/javascript'; var scriptElem = document.createElement( 'script' ); scriptElem.setAttribute( 'src' , url ); scriptElem.setAttribute( 'type' , 'text/javascript' ); document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );}
function importStylesheet( page ) { var sheet = '@import "' + wgScriptPath + '/index.php?title=' + encodeURIComponent( page.replace( / /g, '_' ) ) + '&action=raw&ctype=text/css";'
var styleElem = document.createElement( 'style' ); styleElem.setAttribute( 'type' , 'text/css' ); styleElem.appendChild( document.createTextNode( sheet ) ); document.getElementsByTagName( 'head' )[0].appendChild( styleElem );}
var hasClass = (function () { var reCache = {}; return function (element, className) { return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);};})(); if (isIE)
{ var oldWidth; var docEl = document.documentElement; function fixIEScroll()
{ if (!oldWidth || docEl.clientWidth > oldWidth)
doFixIEScroll(); else
setTimeout(doFixIEScroll, 1); oldWidth = docEl.clientWidth;}
function doFixIEScroll() { docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";}
document.attachEvent("onreadystatechange", fixIEScroll); attachEvent("onresize", fixIEScroll);}
var autoCollapse = 2; var collapseCaption = "hide"; var expandCaption = "show"; function collapseTable( tableIndex )
{ var Button = document.getElementById( "collapseButton" + tableIndex ); var Table = document.getElementById( "collapsibleTable" + tableIndex ); if ( !Table || !Button ) { return false;}
var Rows = Table.rows; if ( Button.firstChild.data == collapseCaption ) { for ( var i = 1; i < Rows.length; i++ ) { Rows[i].style.display = "none";}
Button.firstChild.data = expandCaption;} else { for ( var i = 1; i < Rows.length; i++ ) { Rows[i].style.display = Rows[0].style.display;}
Button.firstChild.data = collapseCaption;}
}
function createCollapseButtons()
{ var tableIndex = 0; var NavigationBoxes = new Object(); var Tables = document.getElementsByTagName( "table" ); for ( var i = 0; i < Tables.length; i++ ) { if ( hasClass( Tables[i], "collapsible" ) ) { var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0]; if (!HeaderRow) continue; var Header = HeaderRow.getElementsByTagName( "th" )[0]; if (!Header) continue; NavigationBoxes[ tableIndex ] = Tables[i]; Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex ); var Button = document.createElement( "span" ); var ButtonLink = document.createElement( "a" ); var ButtonText = document.createTextNode( collapseCaption ); Button.style.styleFloat = "right"; Button.style.cssFloat = "right"; Button.style.fontWeight = "normal"; Button.style.textAlign = "right"; Button.style.width = "6em"; ButtonLink.style.color = Header.style.color; ButtonLink.setAttribute( "id", "collapseButton" + tableIndex ); ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" ); ButtonLink.appendChild( ButtonText ); Button.appendChild( document.createTextNode( "[" ) ); Button.appendChild( ButtonLink ); Button.appendChild( document.createTextNode( "]" ) ); Header.insertBefore( Button, Header.childNodes[0] ); tableIndex++;}
}
for ( var i = 0; i < tableIndex; i++ ) { if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) { collapseTable( i );}
}
}
addOnloadHook( createCollapseButtons ); var NavigationBarHide = '[' + collapseCaption + ']'; var NavigationBarShow = '[' + expandCaption + ']'; function toggleNavigationBar(indexNavigationBar)
{ var NavToggle = document.getElementById("NavToggle" + indexNavigationBar); var NavFrame = document.getElementById("NavFrame" + indexNavigationBar); if (!NavFrame || !NavToggle) { return false;}
if (NavToggle.firstChild.data == NavigationBarHide) { for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) { if ( hasClass( NavChild, 'NavPic' ) ) { NavChild.style.display = 'none';}
if ( hasClass( NavChild, 'NavContent') ) { NavChild.style.display = 'none';}
}
NavToggle.firstChild.data = NavigationBarShow;} else if (NavToggle.firstChild.data == NavigationBarShow) { for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) { if (hasClass(NavChild, 'NavPic')) { NavChild.style.display = 'block';}
if (hasClass(NavChild, 'NavContent')) { NavChild.style.display = 'block';}
}
NavToggle.firstChild.data = NavigationBarHide;}
}
function createNavigationBarToggleButton()
{ var indexNavigationBar = 0; var divs = document.getElementsByTagName("div"); for(var i=0; NavFrame = divs[i]; i++) { if (hasClass(NavFrame, "NavFrame")) { indexNavigationBar++; var NavToggle = document.createElement("a"); NavToggle.className = 'NavToggle'; NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar); NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');'); var NavToggleText = document.createTextNode(NavigationBarHide); for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) { if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) { if (NavChild.style.display == 'none') { NavToggleText = document.createTextNode(NavigationBarShow); break;}
}
}
NavToggle.appendChild(NavToggleText); for(var j=0; j < NavFrame.childNodes.length; j++) { if (hasClass(NavFrame.childNodes[j], "NavHead")) { NavFrame.childNodes[j].appendChild(NavToggle);}
}
NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);}
}
}
addOnloadHook( createNavigationBarToggleButton ); function mainPageRenameNamespaceTab() { try { var Node = document.getElementById( 'ca-nstab-main' ).firstChild; if ( Node.textContent ) { Node.textContent = 'Main Page';} else if ( Node.innerText ) { Node.innerText = 'Main Page';} else { Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) );}
} catch(e) { }
}
if ( wgTitle == 'Main Page' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) { addOnloadHook( mainPageRenameNamespaceTab );}
if (mwCustomEditButtons) { mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png", "speedTip": "Redirect", "tagOpen": "#REDIRECT [[", "tagClose": "]]", "sampleText": "Insert text"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png", "speedTip": "Strike", "tagOpen": "<s>", "tagClose": "</s>", "sampleText": "Strike-through text"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png", "speedTip": "Line break", "tagOpen": "<br />", "tagClose": "", "sampleText": ""}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png", "speedTip": "Superscript", "tagOpen": "<sup>", "tagClose": "</sup>", "sampleText": "Superscript text"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png", "speedTip": "Subscript", "tagOpen": "<sub>", "tagClose": "</sub>", "sampleText": "Subscript text"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png", "speedTip": "Small", "tagOpen": "<small>", "tagClose": "</small>", "sampleText": "Small Text"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png", "speedTip": "Insert hidden Comment", "tagOpen": "<!-- ", "tagClose": " -->", "sampleText": "Comment"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png", "speedTip": "Insert a picture gallery", "tagOpen": "\n<gallery>\n", "tagClose": "\n</gallery>", "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png", "speedTip": "Insert block of quoted text", "tagOpen": "<blockquote>\n", "tagClose": "\n</blockquote>", "sampleText": "Block quote"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png", "speedTip": "Insert a table", "tagOpen": '{| class="wikitable"\n|-\n', "tagClose": "\n|}", "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png", "speedTip": "Insert a reference", "tagOpen": "<ref>", "tagClose": "</ref>", "sampleText": "Insert footnote text here"};}
var disableRealTitle = 0; if (wgIsArticle) { addOnloadHook(function() { try { var realTitleBanner = document.getElementById("RealTitleBanner"); if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle ) { var realTitle = document.getElementById("RealTitle"); if (realTitle) { var realTitleHTML = realTitle.innerHTML; if (realTitle.textContent) { realTitleText = realTitle.textContent
} else { realTitleText = realTitle.innerText;}
var isPasteable = 0; var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); var verifyTitle = realTitleText.replace(/^ +/, ""); verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length); if (wgNamespaceNumber != 0) { if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") { verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);} else { realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText; realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;}
}
verifyTitle = verifyTitle.replace(/[\s_]+/g, " "); verifyTitle = verifyTitle.replace(/^\s+/, "").replace(/\s+$/, ""); verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length); if ( (verifyTitle == wgTitle) || (verifyTitle == wgTitle.replace(/^(.+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+([12]?[0-9]|3[0123])([^\d].*)?$/g, "$1$3 $2$4") )) isPasteable = 1; var h1 = document.getElementsByTagName("h1")[0]; if (h1 && isPasteable) { h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML; if (!containsTooMuchHTML)
realTitleBanner.style.display = "none";}
document.title = realTitleText + " - Wikipedia, the free encyclopedia";}
}
} catch (e) { }
});}
addOnloadHook(function () { if (document.location.search.indexOf("undo=") != -1
&& document.getElementsByName('wpAutoSummary')[0]) { document.getElementsByName('wpAutoSummary')[0].value='1';}
})
function addDismissButton() { var watchlistMessage = document.getElementById("watchlist-message"); if ( watchlistMessage == null ) return; var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,''); if ( document.cookie.indexOf( "hidewatchlistmessage-" + watchlistCookieID + "=yes" ) != -1 ) { watchlistMessage.style.display = "none";}
var Button = document.createElement( "span" ); var ButtonLink = document.createElement( "a" ); var ButtonText = document.createTextNode( "dismiss" ); ButtonLink.setAttribute( "id", "dismissButton" ); ButtonLink.setAttribute( "href", "javascript:dismissWatchlistMessage();" ); ButtonLink.setAttribute( "title", "Hide this message for one week" ); ButtonLink.appendChild( ButtonText ); Button.appendChild( document.createTextNode( "[" ) ); Button.appendChild( ButtonLink ); Button.appendChild( document.createTextNode( "]" ) ); watchlistMessage.appendChild( Button );}
function dismissWatchlistMessage() { var e = new Date(); e.setTime( e.getTime() + (7*24*60*60*1000) ); var watchlistMessage = document.getElementById("watchlist-message"); var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,''); document.cookie = "hidewatchlistmessage-" + watchlistCookieID + "=yes; expires=" + e.toGMTString() + "; path=/"; watchlistMessage.style.display = "none";}
addOnloadHook( addDismissButton ); if (wgPageName == "Special:Search") { var searchEngines = []; addOnloadHook(SpecialSearchEnhanced);}
function SpecialSearchEnhanced() { var createOption = function(site, action, mainQ, addQ, addV) { var opt = document.createElement('option'); opt.appendChild(document.createTextNode(site)); searchEngines[searchEngines.length] = [action, mainQ, addQ, addV]; return opt;}
if (document.forms['powersearch'])
var searchForm = document.forms['powersearch']; if (document.forms['search'])
var searchForm = document.forms['search']; if (searchForm.lsearchbox) { var searchBox = searchForm.lsearchbox;} else { var searchBox = searchForm.search;}
var selectBox = document.createElement('select'); selectBox.id = 'searchEngine'; searchForm.onsubmit = function() { var optSelected = searchEngines[document.getElementById('searchEngine').selectedIndex]; searchForm.action = optSelected[0]; searchBox.name = optSelected[1]; searchForm.title.value = optSelected[3]; searchForm.title.name = optSelected[2];}
selectBox.appendChild(createOption('MediaWiki search', wgScriptPath + '/index.php', 'search', 'title', 'Special:Search')); selectBox.appendChild(createOption('Google', 'http://www.google.com/search', 'q', 'sitesearch', 'strategywiki.org')); selectBox.appendChild(createOption('Yahoo', 'http://search.yahoo.com/search', 'p', 'vs', 'strategywiki.org')); selectBox.appendChild(createOption('Windows Live', 'http://search.live.com/results.aspx', 'q', 'q1', 'site:http://strategywiki.org')); searchBox.style.marginLeft = '0px'; if (document.getElementById('loadStatus')) { var lStat = document.getElementById('loadStatus');} else { var lStat = searchForm.fulltext;}
lStat.parentNode.insertBefore(selectBox, lStat);}
function sysopFunctions() { if ( wgUserGroups && !window.disableSysopJS ) { for ( var g = 0; g < wgUserGroups.length; ++g ) { if ( wgUserGroups[g] == "sysop" ) { importScript( "MediaWiki:Sysop.js" ); break;}
}
}
}
addOnloadHook( sysopFunctions ); function PngFix()
{ try
{ if (!document.body.filters)
{ window.PngFixDisabled = true
}
}
catch (e)
{ window.PngFixDisabled = true
}
if (!window.PngFixDisabled)
{ var documentImages = document.images
var documentCreateElement = document.createElement
var funcEncodeURI = encodeURI
for (var i = 0; i < documentImages.length;)
{ var img = documentImages[i]
var imgSrc = img.src
if (imgSrc.substr(imgSrc.length - 3).toLowerCase() == "png" && !img.onclick)
{ if (img.useMap)
{ img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
i++ }
else
{ var outerSpan = documentCreateElement("span")
var innerSpan = documentCreateElement("span")
var outerSpanStyle = outerSpan.style
var innerSpanStyle = innerSpan.style
var imgCurrentStyle = img.currentStyle
outerSpan.id = img.id
outerSpan.className = img.className
outerSpanStyle.backgroundImage = imgCurrentStyle.backgroundImage
outerSpanStyle.borderWidth = imgCurrentStyle.borderWidth
outerSpanStyle.borderStyle = imgCurrentStyle.borderStyle
outerSpanStyle.borderColor = imgCurrentStyle.borderColor
outerSpanStyle.display = "inline-block"
outerSpanStyle.fontSize = "0"
outerSpanStyle.verticalAlign = "middle"
if (img.parentElement.href) outerSpanStyle.cursor = "hand"
innerSpanStyle.width = "1px"
innerSpanStyle.height = "1px"
innerSpanStyle.display = "inline-block"
innerSpanStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + funcEncodeURI(imgSrc) + "')"
outerSpan.appendChild(innerSpan)
img.parentNode.replaceChild(outerSpan, img)
}
}
else
{ i++ }
}
}
}
if (isIE && navigator.appVersion.substr(22, 1) == "6")
{ window.attachEvent("onload", PngFix)
}
if (isIE && document.createStyleSheet) { document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";');}
addOnloadHook(featured_template); function featured_template()
{ if(document.getElementById('featured_icon'))
{ var bodyContent=document.getElementById('bodyContent'); bodyContent.insertBefore(document.getElementById('featured_icon'),bodyContent.childNodes[0]);}
}
addOnloadHook(open_search_links); function open_search_links()
{ if((document.getElementById('open_search')) && (document.getElementById('open_search').nodeName=='SPAN'))
{ var link=document.getElementById('open_search').childNodes[0]; if(link.addEventListener) link.addEventListener('click',add_open_search,false); else if(link.attachEvent) link.attachEvent('click',add_open_search);}
}
function add_open_search(event)
{ if((typeof(window.external)=="object") && ((typeof(window.external.AddSearchProvider)=="unknown") || (typeof(window.external.AddSearchProvider)=="function"))) window.external.AddSearchProvider("http://strategywiki.org/w/opensearch_desc.php"); else window.alert("You will need a browser which supports OpenSearch to install this plugin, such as Mozilla Firefox."); event.preventDefault(); event.returnValue=false; return false;}
addOnloadHook(upload_categories); function upload_categories()
{ if((document.getElementById('upload')) && (document.getElementById('upload').nodeName=='FORM'))
{ var upload_form=document.getElementById('upload'); if(upload_form.addEventListener)
{ upload_form.addEventListener('submit',check_upload_categories,false);}
else if(upload_form.attachEvent)
{ upload_form.attachEvent('submit',check_upload_categories);}
}
}
function check_upload_categories(event)
{ var description=document.getElementById('wpUploadDescription').value; if((description.indexOf('[[Category')==-1) && (description.indexOf('[[category')==-1))
{ window.alert('Please add some categories to the "Summary" field. Our image categorisation policy can be found at http://strategywiki.org/wiki/StrategyWiki:Images.'); event.preventDefault(); event.returnValue=false; return false;}
}
addOnloadHook(edit_summary); function edit_summary()
{ if((document.getElementById('editform')) && (document.getElementById('editform').nodeName=='FORM'))
{ var edit_form=document.getElementById('wpSave'); if(edit_form.addEventListener)
{ edit_form.addEventListener('click',check_edit_summary,false);}
else if(upload_form.attachEvent)
{ upload_form.attachEvent('click',check_edit_summary);}
}
}
function check_edit_summary(event)
{ var summary=document.getElementById('wpSummary').value; if(summary.length<3)
{ if(document.getElementById('wpEditSummaryError'))
{ document.getElementById('wpEditSummaryError').parentNode.removeChild(document.getElementById('wpEditSummaryError'));}
var p=document.createElement('p'); p.appendChild(document.createTextNode('Please add a suitably descriptive edit summary, using the "Summary" field. It should summarise the changes you have made to the page.')); p.setAttribute('class','error'); p.setAttribute('id','wpEditSummaryError'); if(typeof(wikEdUseWikEd)=='undefined')
{ document.getElementById('editform').insertBefore(p,document.getElementById('wpSummaryLabel').nextSibling);}
else
{ document.getElementById('wikEdConsoleWrapper').insertBefore(p,document.getElementById('wikEdSummaryWrapper'));}
document.getElementById('wpSummary').focus(); event.preventDefault(); event.returnValue=false; return false;}
}
addOnloadHook(title_template); function title_template()
{ if(document.getElementById('title-override'))
{ var title_override=document.getElementById('title-override'); document.getElementsByTagName('h1')[0].textContent=title_override.textContent; document.getElementsByTagName('title')[0].textContent=title_override.textContent+' - StrategyWiki'; document.title=title_override.textContent+' - StrategyWiki'; title_override.parentNode.removeChild(title_override);}
}
function forcePreview() { if (wgUserName != null || wgAction != "edit") return; saveButton = document.getElementById("wpSave"); if (!saveButton) return; saveButton.disabled = true; saveButton.value = "Save page (use preview first)"; saveButton.style.fontWeight = "normal"; document.getElementById("wpPreview").style.fontWeight = "bold";}
addOnloadHook(forcePreview); function selectControlSet()
{ var spans = document.getElementsByTagName("span"); for (var i=0; ControlOpt = spans[i]; i++ ) { if (hasClass(ControlOpt, "controlOpt")) { if (hasClass(ControlOpt, 'control' + document.getElementById('control_selector_select').value)) ControlOpt.style.display = 'inline'
else ControlOpt.style.display = 'none'
}
}
}
function createControlSelector()
{ var controlDiv = document.getElementById("control_selector_inner"); if (!controlDiv) return false; var ControlSelector = document.createElement("select"); ControlSelector.className = 'ControlSet'; ControlSelector.id = 'control_selector_select'; if (ControlSelector.addEventListener) ControlSelector.addEventListener('change',selectControlSet,false); else if (ControlSelector.attachEvent) ControlSelector.attachEvent('onchange',selectControlSet); var sysText = controlDiv.textContent; if(!sysText) sysText = controlDiv.innerText; if(!sysText) return false; sysTexts = sysText.split(','); for (var i=0; i < Math.min(5, sysTexts.length); i++){ ControlSelector.options[i] = new Option(sysTexts[i].replace(/^\s+|\s+$/g, ''), i);}
if(controlDiv.textContent) controlDiv.textContent = ''; else if(controlDiv.innerText) controlDiv.innerText = ''; controlDiv.appendChild(ControlSelector); controlDiv.parentNode.style.display = 'block';}
addOnloadHook( createControlSelector ); function displayCalendar() { var cal = document.getElementById('google-calendar'); if(!cal) return; var calframe = document.createElement('iframe'); calframe.src = 'http://www.google.com/calendar/embed?src=qk4t1di1u3song0vqo39o0ribo%40group.calendar.google.com'; calframe.style.border = '0'; calframe.width = '800'; calframe.height = '600'; calframe.frameborder = '0'; calframe.scrolling = 'no'; cal.appendChild(calframe);}
addOnloadHook(displayCalendar); function fixToCLink(){ var mainPageLink = document.getElementById('ca-nstab-main')
var ToCLink = document.getElementById('editToC')
if (!mainPageLink || !ToCLink) { return false;}
mainPageLink = mainPageLink.getElementsByTagName('a')[0].href; ToCLink.getElementsByTagName('a')[0].href = mainPageLink.substring(mainPageLink.indexOf('/wiki/')) + '/Table_of_Contents?action=edit';}
addOnloadHook(fixToCLink); function addAlexaGraphs() { var wrapper = document.getElementById('alexa-graph'); if(!wrapper) return; var br = document.createElement('br'); br.style.clear = "both"; var img1 = document.createElement('img'); var img2 = document.createElement('img'); var img3 = document.createElement('img'); var time = wrapper.innerHTML; wrapper.innerHTML = ''; img1.src = "http://traffic.alexa.com/graph?c=1&f=555555&u=strategywiki.org&u=&u=&u=&u=&r="+time+"&y=r&z=3&h=300&w=610"
img2.src = "http://traffic.alexa.com/graph?c=1&f=555555&u=strategywiki.org&u=&u=&u=&u=&r="+time+"&y=n&z=3&h=300&w=610"
img3.src = "http://traffic.alexa.com/graph?c=1&f=555555&u=strategywiki.org&u=&u=&u=&u=&r="+time+"&y=p&z=3&h=300&w=610"
wrapper.appendChild(img1); wrapper.appendChild(br); wrapper.appendChild(img2); wrapper.appendChild(br); wrapper.appendChild(img3);}
addOnloadHook(addAlexaGraphs);