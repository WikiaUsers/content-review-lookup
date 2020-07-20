var popupVersion="DJ Fork: Wed Oct 22 13:15:00 UTC 2008 en:MediaWiki:Gadget-popups.js";

// This is my fork of Lupins navigation popups. [[User:Lupin/popups.js]]
// It includes all fixes that are applied on the Gadget version
// It adds a new mode that uses api.php instead of query.php

// STARTFILE: main.js
// **********************************************************************
// **                                                                  **
// **             changes to this file affect many users.              **
// **           please discuss on the talk page before editing         **
// **                                                                  **
// **********************************************************************
// **                                                                  **
// ** if you do edit this file, be sure that your editor recognizes it **
// ** as utf8, or the weird and wonderful characters in the namespaces **
// **   below will be completely broken. You can check with the show   **
// **            changes button before submitting the edit.            **
// **                      test: مدیا מיוחד Мэдыя                      **
// **                                                                  **
// **********************************************************************

//////////////////////////////////////////////////
// Globals
//

// Trying to shove as many of these as possible into the pg (popup globals) object
function pg(){}; // dummy to stop errors
window.pg = {
re: {},               // regexps
ns: {},               // namespaces
string: {},           // translatable strings
wiki: {},             // local site info
misc: {},             // YUCK PHOOEY
option: {},           // options, see newOption etc
optionDefault: {},    // default option values
flag: {},             // misc flags
cache: {},            // page and image cache
structures: {},       // navlink structures
timer: {},            // all sorts of timers (too damn many)
counter: {},          // .. and all sorts of counters
current: {},          // state info
endoflist: null
};
window.pop = {          // wrap various functions in here
init: {},
util: {},
endoflist: null
};
function popupsReady() {
if (!window.pg) { return false; }
if (!pg.flag) { return false; }
if (!pg.flag.finishedLoading) { return false; }
return true;
}
////////////////////////////////////////////////////////////////////
// Run things
////////////////////////////////////////////////////////////////////

hookEvent('load', setupPopups);

/// Local Variables: ///
/// mode:c ///
/// End: ///
// ENDFILE: main.js
// STARTFILE: actions.js
function setupTooltips(container, remove, force, popData) {
log('setupTooltips, container='+container+', remove='+remove);
if (!container) {
//<NOLITE>
// the main initial call
if (getValueOf('popupOnEditSelection') && window.doSelectionPopup ) {
try {
document.editform.wpTextbox1.onmouseup=function() { doSelectionPopup(); };
} catch (neverMind) {}
}
//</NOLITE>
// article/content is a structure-dependent thing
container = defaultPopupsContainer();
}

if (!remove && !force && container.ranSetupTooltipsAlready) { return; }
container.ranSetupTooltipsAlready = !remove;

var anchors;
anchors=container.getElementsByTagName('A');
setupTooltipsLoop(anchors, 0, 250, 100, remove, popData);
}

function defaultPopupsContainer() {
    if (getValueOf('popupOnlyArticleLinks')) {
    return document.getElementById('article') ||
    document.getElementById('content') || 
    document.getElementById('mw_content') ||
    document.getElementById( 'WikiaArticle' ) || document;
    }
    return  document;
}

function setupTooltipsLoop(anchors,begin,howmany,sleep, remove, popData) {
log(simplePrintf('setupTooltipsLoop(%s,%s,%s,%s,%s)', arguments));
var finish=begin+howmany;
var loopend = min(finish, anchors.length);
var j=loopend - begin;
log ('setupTooltips: anchors.length=' + anchors.length + ', begin=' + begin +
     ', howmany=' + howmany + ', loopend=' + loopend + ', remove=' + remove);
var doTooltip= remove ? removeTooltip : addTooltip;
// try a faster (?) loop construct
if (j > 0) {
do {
var a=anchors[loopend - j];
if (!a || !a.href) {
log('got null anchor at index ' + loopend - j);
continue;
}
doTooltip(a, popData);
} while (--j);
}
if (finish < anchors.length) {
setTimeout(function() {
setupTooltipsLoop(anchors,finish,howmany,sleep,remove,popData);},
sleep);
} else {
if ( !remove && ! getValueOf('popupTocLinks')) { rmTocTooltips(); }
pg.flag.finishedLoading=true;
}
}

// eliminate popups from the TOC
// This also kills any onclick stuff that used to be going on in the toc
function rmTocTooltips() {
var toc=document.getElementById('toc');
if (toc) {
var tocLinks=toc.getElementsByTagName('A');
var tocLen = tocLinks.length;
for (j=0; j<tocLen; ++j) {
removeTooltip(tocLinks[j], true);
}
}
}

function addTooltip(a, popData) {
if ( !isPopupLink(a) ) { return; }
a.onmouseover=mouseOverWikiLink;
a.onmouseout= mouseOutWikiLink;
a.onmousedown = killPopup;
a.hasPopup = true;
a.popData = popData;
}

function removeTooltip(a) {
if ( !a.hasPopup ) { return; }
a.onmouseover = null;
a.onmouseout = null;
if (a.originalTitle) { a.title = a.originalTitle; }
a.hasPopup=false;
}

function removeTitle(a) {
if (a.originalTitle) { return; }
a.originalTitle=a.title;
a.title='';
}

function restoreTitle(a) {
if ( a.title || !a.originalTitle ) { return; }
a.title = a.originalTitle;
a.originalTitle='';
}

function registerHooks(np) {
var popupMaxWidth=getValueOf('popupMaxWidth');

if (typeof popupMaxWidth == 'number') {
var setMaxWidth = function () {
np.mainDiv.style.maxWidth = popupMaxWidth + 'px';
np.maxWidth = popupMaxWidth;

// hack for IE
// see http://www.svendtofte.com/code/max_width_in_ie/
// use setExpression as documented here on msdn: http://tinyurl dot com/dqljn

if (np.mainDiv.style.setExpression) {
np.mainDiv.style.setExpression(
'width', 'document.body.clientWidth > ' +
popupMaxWidth + ' ? "' +popupMaxWidth + 'px": "auto"');
}
};
np.addHook(setMaxWidth, 'unhide', 'before');
}
//<NOLITE>
if (window.addPopupShortcuts && window.rmPopupShortcuts) {
    np.addHook(addPopupShortcuts, 'unhide', 'after');
    np.addHook(rmPopupShortcuts, 'hide', 'before');
}
//</NOLITE>
}


function mouseOverWikiLink(evt) {
if (!window.popupsReady || !window.popupsReady()) { return; }
if (!evt && window.event) {evt=window.event};
return mouseOverWikiLink2(this, evt);
}

function footnoteTarget(a) {
var aTitle=Title.fromAnchor(a);
// We want ".3A" rather than "%3A" or "?" here, so use the anchor property directly
var anch = aTitle.anchor;
if ( ! /^(cite_note-|_note-|endnote)/.test(anch) ) { return false;}

var lTitle=Title.fromURL(location.href);
if ( lTitle.toString(true) != aTitle.toString(true) ) {return false; }

var el=document.getElementById(anch);
while ( el && typeof el.nodeName == 'string') {
var nt = el.nodeName.toLowerCase();
if ( nt == 'li' ) { return el; }
else if ( nt == 'body' ) { return false; }
else if ( el.parentNode ) { el=el.parentNode; }
else { return false; }
}
return false;
}

function footnotePreview(x, navpop) {
setPopupHTML('<hr>' + x.innerHTML, 'popupPreview',  navpop.idNumber,
     getValueOf('popupSubpopups') ? function() {
setupTooltips(document.getElementById('popupPreview' + navpop.idNumber));
} : null);
}

// var modid=0;
// if(!window.opera) { window.opera={postError: console.log}; }

function modifierKeyHandler(a) {
return function(evt) {
//opera.postError('modifierKeyHandler called' + (++modid));
//opera.postError(''+evt + modid);
//for (var i in evt) {
//opera.postError('' + modid + ' ' + i + ' ' + evt[i]);
//}
//opera.postError(''+evt.ctrlKey + modid);
var mod=getValueOf('popupModifier');
if (!mod) { return true; }

if (!evt && window.event) {evt=window.event};
//opera.postError('And now....'+modid);
//opera.postError(''+evt+modid);
//opera.postError(''+evt.ctrlKey+modid);

var modPressed = modifierPressed(evt);
var action = getValueOf('popupModifierAction');

// FIXME: probable bug - modifierPressed should be modPressed below?
if ( action == 'disable' && modifierPressed ) { return true; }
if ( action == 'enable' && !modifierPressed ) { return true; }

mouseOverWikiLink2(a, evt);
};
}

function modifierPressed(evt) {
var mod=getValueOf('popupModifier');
if (!mod) { return false; }

if (!evt && window.event) {evt=window.event};
//opera.postError('And now....'+modid);
//opera.postError(''+evt+modid);
//opera.postError(''+evt.ctrlKey+modid);

return ( evt && mod && evt[mod.toLowerCase() + 'Key'] );

}

function dealWithModifier(a,evt) {
if (!getValueOf('popupModifier')) { return false; }
var action = getValueOf('popupModifierAction');
if ( action == 'enable' && !modifierPressed(evt) ||
     action == 'disable' && modifierPressed(evt) ) {
// if the modifier is needed and not pressed, listen for it until
// we mouseout of this link.
restoreTitle(a);
var addHandler='addEventListener';
var rmHandler='removeEventListener';
var on='';
if (!document.addEventListener) {
addHandler='attachEvent';
rmHandler='detachEvent';
on='on';
}
if (!document[addHandler]) { // forget it
return;
}

a.modifierKeyHandler=modifierKeyHandler(a);

switch (action) {
case 'enable':
document[addHandler](on+'keydown', a.modifierKeyHandler, false);
a[addHandler](on+'mouseout', function() {
document[rmHandler](on+'keydown',
    a.modifierKeyHandler, false);
}, true);
break;
case 'disable':
document[addHandler](on+'keyup', a.modifierKeyHandler, false);
}

return true;
}
return false;
}

function mouseOverWikiLink2(a, evt) {
if (dealWithModifier(a,evt)) { return; }
if ( getValueOf('removeTitles') ) { removeTitle(a); }
if ( a==pg.current.link && a.navpopup && a.navpopup.isVisible() ) { return; }
pg.current.link=a;

if (getValueOf('simplePopups') && pg.option.popupStructure===null) {
// reset *default value* of popupStructure
setDefault('popupStructure', 'original');
}

var article=(new Title()).fromAnchor(a);
// set global variable (ugh) to hold article (wikipage)
pg.current.article = article;
if (pg.timer.image !== null) {
clearInterval(pg.timer.image);
pg.timer.image=null;
pg.counter.checkImages=0;
}

if (!a.navpopup) {
// FIXME: this doesn't behave well if you mouse out of a popup
// directly into a link with the same href
if (pg.current.linksHash[a.href] && false) {
a.navpopup = pg.current.linksHash[a.href];
}
else {
a.navpopup=newNavpopup(a, article);
pg.current.linksHash[a.href] = a.navpopup;
pg.current.links.push(a);
}
}
if (a.navpopup.pending===null || a.navpopup.pending!==0) {
// either fresh popups or those with unfinshed business are redone from scratch
simplePopupContent(a, article);
}
a.navpopup.showSoonIfStable(a.navpopup.delay);

getValueOf('popupInitialWidth');

clearInterval(pg.timer.checkPopupPosition);
pg.timer.checkPopupPosition=setInterval(checkPopupPosition, 600);

if(getValueOf('simplePopups')) {
if (getValueOf('popupPreviewButton') && !a.simpleNoMore) {
var d=document.createElement('div');
d.className='popupPreviewButtonDiv';
var s=document.createElement('span');
d.appendChild(s);
s.className='popupPreviewButton';
s['on' + getValueOf('popupPreviewButtonEvent')] = function() {
a.simpleNoMore=true;
nonsimplePopupContent(a,article);
}
s.innerHTML=popupString('show preview');
setPopupHTML(d, 'popupPreview', a.navpopup.idNumber);
}
return;
}

if (a.navpopup.pending!==0 ) {
    nonsimplePopupContent(a, article);
}
}

// simplePopupContent: the content that is shown even when simplePopups is true
function simplePopupContent(a, article) {
/* FIXME hack */ a.navpopup.hasPopupMenu=false;
a.navpopup.setInnerHTML(popupHTML(a));
fillEmptySpans({navpopup:a.navpopup});

var dragHandle = getValueOf('popupDragHandle') || null;
if (dragHandle && dragHandle != 'all') {
dragHandle += a.navpopup.idNumber;
}
setTimeout(function(){a.navpopup.makeDraggable(dragHandle);}, 150);

//<NOLITE>
if (getValueOf('popupRedlinkRemoval') && a.className=='new') {
setPopupHTML('<br>'+popupRedlinkHTML(article), 'popupRedlink', a.navpopup.idNumber);
}
//</NOLITE>
}

function debugData(navpopup) {
if(getValueOf('popupDebugging') && navpopup.idNumber) {
setPopupHTML('idNumber='+navpopup.idNumber + ', pending=' + navpopup.pending,
     'popupError', navpopup.idNumber);
}
}

function newNavpopup(a, article) {
var navpopup = new Navpopup();
navpopup.fuzz=5;
navpopup.delay=getValueOf('popupDelay')*1000;
// increment global counter now
navpopup.idNumber = ++pg.idNumber;
navpopup.parentAnchor = a;
navpopup.parentPopup = (a.popData && a.popData.owner);
navpopup.article = article;
registerHooks(navpopup);
return navpopup;
}


function nonsimplePopupContent(a, article) {
var diff=null, history=null;
var params=parseParams(a.href);
var oldid=(typeof params.oldid=='undefined' ? null : params.oldid);
//<NOLITE>
if(getValueOf('popupPreviewDiffs') && window.loadDiff) {
diff=params.diff;
}
if(getValueOf('popupPreviewHistory') && (getValueOf('popupUseQueryInterface') || getValueOf('popupUseAPI'))) {
history=(params.action=='history');
}
//</NOLITE>
a.navpopup.pending=0;
var previewImage=true;
var x;
pg.misc.gImage=null;
if (x=footnoteTarget(a)) {
footnotePreview(x, a.navpopup);
//<NOLITE>
} else if ( diff || diff === 0 ) {
//alert([article,oldid,diff]);
loadDiff(article, oldid, diff, a.navpopup);
} else if ( history && getValueOf('popupUseAPI') ) {
loadAPIPreview('history', article, a.navpopup);
} else if ( pg.re.contribs.test(a.href) && getValueOf('popupUseAPI')) {
loadAPIPreview('contribs', article, a.navpopup);
} else if ( pg.re.backlinks.test(a.href) && getValueOf('popupUseAPI')) {
loadAPIPreview('backlinks', article, a.navpopup);
    } else if ( history && getValueOf('popupUseQueryInterface') ) {
loadQueryPreview('history', article, a.navpopup);
} else if ( pg.re.contribs.test(a.href) && getValueOf('popupUseQueryInterface')) {
loadQueryPreview('contribs', article, a.navpopup);
} else if ( pg.re.backlinks.test(a.href) && getValueOf('popupUseQueryInterface')) {
loadQueryPreview('backlinks', article, a.navpopup);
} else if ( // FIXME should be able to get all preview combinations with options
article.namespace()==pg.ns.image &&
( getValueOf('imagePopupsForImages') || ! anchorContainsImage(a) )
) {
if (getValueOf('popupUseAPI')) {
loadAPIPreview('imagepagepreview', article, a.navpopup);
} else if (getValueOf('popupUseQueryInterface')) {
loadQueryPreview('imagepagepreview', article, a.navpopup);
} else { startArticlePreview(article, oldid, a.navpopup); }
loadImages(article);
//</NOLITE>
} else if (article.namespace() == pg.ns.category &&
   getValueOf('popupCategoryMembers')) {
if( getValueOf('popupUseAPI') ) {
    loadAPIPreview('category', article, a.navpopup);
} else if (getValueOf('popupUseQueryInterface') ) { 
loadQueryPreview('category', article, a.navpopup);
}
startArticlePreview(article, oldid, a.navpopup);
}
else if (!article.namespace()!=pg.ns.image && previewImage ) {
startArticlePreview(article, oldid, a.navpopup);
}
}

function pendingNavpopTask(navpop) {
if (navpop && navpop.pending===null) { navpop.pending=0; }
++navpop.pending;
debugData(navpop);
}

function completedNavpopTask(navpop) {
if (navpop && navpop.pending) { --navpop.pending; }
debugData(navpop);
}

function startArticlePreview(article, oldid, navpop) {
navpop.redir=0;
loadPreview(article, oldid, navpop);
}

function loadPreview(article, oldid, navpop) {
pendingNavpopTask(navpop);
if (!navpop.redir) { navpop.originalArticle=article; }
if (!navpop.visible && getValueOf('popupLazyDownloads')) {
var id=(navpop.redir) ? 'DOWNLOAD_PREVIEW_REDIR_HOOK' : 'DOWNLOAD_PREVIEW_HOOK';
navpop.addHook(function() {
getWiki(article, insertPreview, oldid, navpop);
return true; }, 'unhide', 'before', id);
} else {
getWiki(article, insertPreview, oldid, navpop);
}
}

function loadPreviewFromRedir(redirMatch, navpop) {
// redirMatch is a regex match
var target = new Title().fromWikiText(redirMatch[2]);
// overwrite (or add) anchor from original target
// mediawiki does overwrite; eg [[User:Lupin/foo3#Done]]
if ( navpop.article.anchor ) { target.anchor = navpop.article.anchor; }
var trailingRubbish=redirMatch[4];
navpop.redir++;
navpop.redirTarget=target;
//<NOLITE>
if (window.redirLink) {
var warnRedir = redirLink(target, navpop.article);
setPopupHTML(warnRedir, 'popupWarnRedir', navpop.idNumber);
}
//</NOLITE>
navpop.article=target;
fillEmptySpans({redir: true, redirTarget: target, navpopup:navpop});
return loadPreview(target, null,  navpop);
}

function insertPreview(download) {
if (!download.owner) { return; }

var redirMatch = pg.re.redirect.exec(download.data);
if (download.owner.redir===0 && redirMatch) {
completedNavpopTask(download.owner);
loadPreviewFromRedir(redirMatch, download.owner);
return;
}

if (download.owner.visible || !getValueOf('popupLazyPreviews')) {
    insertPreviewNow(download);
} else {
var id=(download.owner.redir) ? 'PREVIEW_REDIR_HOOK' : 'PREVIEW_HOOK';
download.owner.addHook( function(){insertPreviewNow(download); return true;},
'unhide', 'after', id );
}
}

function insertPreviewNow(download) {
if (!download.owner) { return; }
var wikiText=download.data;
var navpop=download.owner;
completedNavpopTask(navpop);
var art=navpop.redirTarget || navpop.originalArticle;

//<NOLITE>
makeFixDabs(wikiText, navpop);
if (getValueOf('popupSummaryData') && window.getPageInfo) {
var info=getPageInfo(wikiText, download);
setPopupTrailer(getPageInfo(wikiText, download), navpop.idNumber);
}

var imagePage='';
if (art.namespace()==pg.ns.image) { imagePage=art.toString(); }
else { imagePage=getValidImageFromWikiText(wikiText); }
if(imagePage) { loadImages(Title.fromWikiText(imagePage)); }
//</NOLITE>

if (getValueOf('popupPreviews')) { insertArticlePreview(download, art, navpop); }

}

function insertArticlePreview(download, art, navpop) {
if (download && typeof download.data == typeof ''){
if (art.namespace()==pg.ns.template && getValueOf('popupPreviewRawTemplates')) {
// FIXME compare/consolidate with diff escaping code for wikitext
var h='<hr><tt>' + download.data.entify().split('\\n').join('<br>\\n') + '</tt>';
setPopupHTML(h, 'popupPreview', navpop.idNumber);
}
else {
var p=prepPreviewmaker(download.data, art, navpop);
p.showPreview();
}
}
}

function prepPreviewmaker(data, article, navpop) {
// deal with tricksy anchors
var d=anchorize(data, article.anchorString());
var urlBase=joinPath([pg.wiki.articlebase, article.urlString()]);
var p=new Previewmaker(d, urlBase, navpop);
return p;
}


// Try to imitate the way mediawiki generates HTML anchors from section titles
function anchorize(d, anch) {
if (!anch) { return d; }
var anchRe=RegExp('=+\\s*' + literalizeRegex(anch).replace(/[_ ]/g, '[_ ]') + '\\s*=+');
var match=d.match(anchRe);
if(match && match.length > 0 && match[0]) { return d.substring(d.indexOf(match[0])); }

// now try to deal with == foo [[bar|baz]] boom == -> #foo_baz_boom
var lines=d.split('\n');
for (var i=0; i<lines.length; ++i) {
lines[i]=lines[i].replace(RegExp('[[]{2}([^|\\]]*?[|])?(.*?)[\\]]{2}', 'g'), '$2')
.replace(/'''([^'])/g, '$1').replace(RegExp("''([^'])", 'g'), '$1');
if (lines[i].match(anchRe)) {
return d.split('\n').slice(i).join('\n').replace(RegExp('^[^=]*'), '');
}
}
return d;
}

function killPopup() {
if (getValueOf('popupShortcutKeys') && window.rmPopupShortcuts) { rmPopupShortcuts(); }
if (!pg) { return; }
pg.current.link && pg.current.link.navpopup && pg.current.link.navpopup.banish();
pg.current.link=null;
abortAllDownloads();
window.stopImagesDownloading && stopImagesDownloading();
if (pg.timer.checkPopupPosition !== null) {
clearInterval(pg.timer.checkPopupPosition);
pg.timer.checkPopupPosition=null;
}
if (pg.timer.checkImages !== null) { clearInterval(pg.timer.checkImages); pg.timer.checkImages=null; }
if (pg.timer.image !== null) { clearInterval(pg.timer.image); pg.timer.image=null; }
return true; // preserve default action
}
// ENDFILE: actions.js
// STARTFILE: domdrag.js
/**
   @fileoverview
   The {@link Drag} object, which enables objects to be dragged around.

   <pre>
   *************************************************
   dom-drag.js
   09.25.2001
   www.youngpup.net
   **************************************************
   10.28.2001 - fixed minor bug where events
   sometimes fired off the handle, not the root.
   *************************************************
   Pared down, some hooks added by [[User:Lupin]]

   Copyright Aaron Boodman.
   Saying stupid things daily since March 2001.
   </pre>
*/

/**
   Creates a new Drag object. This is used to make various DOM elements draggable.
   @constructor
*/
function Drag () {
/**
   Condition to determine whether or not to drag. This function should take one parameter, an Event.
   To disable this, set it to <code>null</code>.
   @type Function
*/
this.startCondition = null;
/**
   Hook to be run when the drag finishes. This is passed the final coordinates of
   the dragged object (two integers, x and y). To disables this, set it to <code>null</code>.
   @type Function
*/
this.endHook = null;
}

/**
   Gets an event in a cross-browser manner.
   @param {Event} e
   @private
*/
Drag.prototype.fixE = function(e) {
if (typeof e == 'undefined') { e = window.event; }
if (typeof e.layerX == 'undefined') { e.layerX = e.offsetX; }
if (typeof e.layerY == 'undefined') { e.layerY = e.offsetY; }
return e;
};
/**
   Initialises the Drag instance by telling it which object you want to be draggable, and what you want to drag it by.
   @param {DOMElement} o The "handle" by which <code>oRoot</code> is dragged.
   @param {DOMElement} oRoot The object which moves when <code>o</code> is dragged, or <code>o</code> if omitted.
*/
Drag.prototype.init = function(o, oRoot) {
var dragObj      = this;
this.obj = o;
o.onmousedown    = function(e) { dragObj.start.apply( dragObj, [e]); };
o.dragging       = false;
o.draggable      = true;
o.hmode          = true;
o.vmode          = true;

o.root = oRoot && oRoot !== null ? oRoot : o ;

if (isNaN(parseInt(o.root.style.left, 10))) { o.root.style.left   = "0px"; }
if (isNaN(parseInt(o.root.style.top,  10))) { o.root.style.top    = "0px"; }

o.root.onthisStart  = function(){};
o.root.onthisEnd    = function(){};
o.root.onthis       = function(){};
};

/**
   Starts the drag.
   @private
   @param {Event} e
*/
Drag.prototype.start = function(e) {
var o = this.obj; // = this;
e = this.fixE(e);
if (this.startCondition && !this.startCondition(e)) { return; }
var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom, 10);
var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right,  10);
o.root.onthisStart(x, y);

o.lastMouseX    = e.clientX;
o.lastMouseY    = e.clientY;

var dragObj      = this;
o.onmousemoveDefault    = document.onmousemove;
o.dragging              = true;
document.onmousemove    = function(e) { dragObj.drag.apply( dragObj, [e] ); };
document.onmouseup      = function(e) { dragObj.end.apply( dragObj, [e] ); };
return false;
};
/**
   Does the drag.
   @param {Event} e
   @private
*/
Drag.prototype.drag = function(e) {
e = this.fixE(e);
var o = this.obj;

var ey    = e.clientY;
var ex    = e.clientX;
var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom, 10);
var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right,  10 );
var nx, ny;

nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

this.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
this.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
this.obj.lastMouseX    = ex;
this.obj.lastMouseY    = ey;

this.obj.root.onthis(nx, ny);
return false;
};

/**
   Ends the drag.
   @private
*/
Drag.prototype.end = function()  {
document.onmousemove=this.obj.onmousemoveDefault;
document.onmouseup   = null;
this.obj.dragging    = false;
if (this.endHook) {
this.endHook( parseInt(this.obj.root.style[this.obj.hmode ? "left" : "right"], 10),
      parseInt(this.obj.root.style[this.obj.vmode ? "top" : "bottom"], 10));
}
};
// ENDFILE: domdrag.js
// STARTFILE: structures.js
//<NOLITE>
pg.structures.original={};
pg.structures.original.popupLayout=function () {
return ['popupError', 'popupImage', 'popupTopLinks', 'popupTitle',
'popupData', 'popupOtherLinks',
'popupRedir', ['popupWarnRedir', 'popupRedirTopLinks',
       'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'],
'popupMiscTools', ['popupRedlink'],
'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview', 'popupFixDab'];
};
pg.structures.original.popupRedirSpans=function () {
return ['popupRedir', 'popupWarnRedir', 'popupRedirTopLinks',
'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'];
};
pg.structures.original.popupTitle=function (x) {
log ('defaultstructure.popupTitle');
if (!getValueOf('popupNavLinks')) {
return navlinkStringToHTML('<b><<mainlink>></b>',x.article,x.params);
}
return '';
};
pg.structures.original.popupTopLinks=function (x) {
log ('defaultstructure.popupTopLinks');
if (getValueOf('popupNavLinks')) { return navLinksHTML(x.article, x.hint, x.params); }
return '';
};
pg.structures.original.popupImage=function(x) {
log ('original.popupImage, x.article='+x.article+', x.navpop.idNumber='+x.navpop.idNumber);
return imageHTML(x.article, x.navpop.idNumber);
};
pg.structures.original.popupRedirTitle=pg.structures.original.popupTitle;
pg.structures.original.popupRedirTopLinks=pg.structures.original.popupTopLinks;


function copyStructure(oldStructure, newStructure) {
pg.structures[newStructure]={};
for (var prop in pg.structures[oldStructure]) {
pg.structures[newStructure][prop]=pg.structures[oldStructure][prop];
}
}

copyStructure('original', 'nostalgia');
pg.structures.nostalgia.popupTopLinks=function(x)  {
var str='';
str += '<b><<mainlink|shortcut= >></b>';

// user links
// contribs - log - count - email - block
// count only if applicable; block only if popupAdminLinks
str += 'if(user){<br><<contribs|shortcut=c>>';
str+='if(wikimedia){*<<count|shortcut=#>>}';
str+='if(ipuser){}else{*<<email|shortcut=E>>}if(admin){*<<block|shortcut=b>>}}';

// editing links
// talkpage   -> edit|new - history - un|watch - article|edit
// other page -> edit - history - un|watch - talk|edit|new
var editstr='<<edit|shortcut=e>>';
var editOldidStr='if(oldid){<<editOld|shortcut=e>>|<<revert|shortcut=v|rv>>|<<edit|cur>>}else{'
+ editstr + '}'
var historystr='<<history|shortcut=h>>';
var watchstr='<<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>>';

str+='<br>if(talk){' +
editOldidStr+'|<<new|shortcut=+>>' + '*' + historystr+'*'+watchstr + '*' +
'<b><<article|shortcut=a>></b>|<<editArticle|edit>>' +
'}else{' + // not a talk page
editOldidStr + '*' + historystr + '*' + watchstr + '*' +
'<b><<talk|shortcut=t>></b>|<<editTalk|edit>>|<<newTalk|shortcut=+|new>>'
+ '}';

// misc links
str += '<br><<whatLinksHere|shortcut=l>>*<<relatedChanges|shortcut=r>>';
str += 'if(admin){<br>}else{*}<<move|shortcut=m>>';

// admin links
str += 'if(admin){*<<unprotect|unprotectShort>>|<<protect|shortcut=p>>*' +
'<<undelete|undeleteShort>>|<<delete|shortcut=d>>}';
return navlinkStringToHTML(str, x.article, x.params);
};
pg.structures.nostalgia.popupRedirTopLinks=pg.structures.nostalgia.popupTopLinks;

/** -- fancy -- **/
copyStructure('original', 'fancy');
pg.structures.fancy.popupTitle=function (x) {
return navlinkStringToHTML('<font size=+0><<mainlink>></font>',x.article,x.params);
};
pg.structures.fancy.popupTopLinks=function(x) {
var hist='<<history|shortcut=h|hist>>|<<lastEdit|shortcut=/|last>>if(mainspace_en){|<<editors|shortcut=E|eds>>}';
var watch='<<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>>';
var move='<<move|shortcut=m|move>>';
return navlinkStringToHTML('if(talk){' +
   '<<edit|shortcut=e>>|<<new|shortcut=+|+>>*' + hist + '*' +
   '<<article|shortcut=a>>|<<editArticle|edit>>' + '*' + watch + '*' + move +
   '}else{<<edit|shortcut=e>>*' + hist +
   '*<<talk|shortcut=t|>>|<<editTalk|edit>>|<<newTalk|shortcut=+|new>>' +
   '*' + watch + '*' + move+'}<br>', x.article, x.params);
};
pg.structures.fancy.popupOtherLinks=function(x) {
var admin='<<unprotect|unprotectShort>>|<<protect|shortcut=p>>*<<undelete|undeleteShort>>|<<delete|shortcut=d|del>>';
var user='<<contribs|shortcut=c>>if(wikimedia){|<<count|shortcut=#|#>>}';
user+='if(ipuser){|<<arin>>}else{*<<email|shortcut=E|'+
popupString('email')+'>>}if(admin){*<<block|shortcut=b>>}';

var normal='<<whatLinksHere|shortcut=l|links here>>*<<relatedChanges|shortcut=r|related>>';
return navlinkStringToHTML('<br>if(user){' + user + '*}if(admin){'+admin+'if(user){<br>}else{*}}' + normal,
   x.article, x.params);
};
pg.structures.fancy.popupRedirTitle=pg.structures.fancy.popupTitle;
pg.structures.fancy.popupRedirTopLinks=pg.structures.fancy.popupTopLinks;
pg.structures.fancy.popupRedirOtherLinks=pg.structures.fancy.popupOtherLinks;


/** -- fancy2 -- **/
// hack for [[User:MacGyverMagic]]
copyStructure('fancy', 'fancy2');
pg.structures.fancy2.popupTopLinks=function(x) { // hack out the <br> at the end and put one at the beginning
return '<br>'+pg.structures.fancy.popupTopLinks(x).replace(RegExp('<br>$','i'),'');
};
pg.structures.fancy2.popupLayout=function () { // move toplinks to after the title
return ['popupError', 'popupImage', 'popupTitle', 'popupData', 'popupTopLinks', 'popupOtherLinks',
'popupRedir', ['popupWarnRedir', 'popupRedirTopLinks', 'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'],
'popupMiscTools', ['popupRedlink'],
'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview', 'popupFixDab'];
};

/** -- menus -- **/
copyStructure('original', 'menus');
pg.structures.menus.popupLayout=function () {
return ['popupError', 'popupImage', 'popupTopLinks', 'popupTitle', 'popupOtherLinks',
'popupRedir', ['popupWarnRedir', 'popupRedirTopLinks', 'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'],
'popupData', 'popupMiscTools', ['popupRedlink'],
'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview', 'popupFixDab'];
};
function toggleSticky(uid) {
var popDiv=document.getElementById('navpopup_maindiv'+uid);
if (!popDiv) { return; }
if (!popDiv.navpopup.sticky) { popDiv.navpopup.stick(); }
else {
popDiv.navpopup.unstick();
popDiv.navpopup.hide();
}
}
pg.structures.menus.popupTopLinks = function (x, shorter) {
// FIXME maybe this stuff should be cached
var s=[];
var dropdiv='<div class="popup_drop">';
var enddiv='</div>';
var endspan='</span>';
var hist='<<history|shortcut=h>>';
if (!shorter) { hist = '<menurow>' + hist +
'|<<historyfeed|rss>>if(mainspace_en){|<<editors|shortcut=E>>}</menurow>'; }
var lastedit='<<lastEdit|shortcut=/|show last edit>>';
var jsHistory='<<lastContrib|last set of edits>><<sinceMe|changes since mine>>';
var linkshere='<<whatLinksHere|shortcut=l|what links here>>';
var related='<<relatedChanges|shortcut=r|related changes>>';
var search='<menurow><<search|shortcut=s>>if(wikimedia){|<<globalsearch|shortcut=g|global>>}' +
'|<<google|shortcut=G|web>></menurow>';
var watch='<menurow><<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>></menurow>';
var protect='<menurow><<unprotect|unprotectShort>>|' +
'<<protect|shortcut=p>>|<<protectlog|log>></menurow>';
var del='<menurow><<undelete|undeleteShort>>|<<delete|shortcut=d>>|' +
'<<deletelog|log>></menurow>';
var move='<<move|shortcut=m|move page>>';
var nullPurge='<menurow><<nullEdit|shortcut=n|null edit>>|<<purge|shortcut=P>></menurow>';
var viewOptions='<menurow><<view|shortcut=v>>|<<render|shortcut=S>>|<<raw>></menurow>';
var editRow='if(oldid){' +
'<menurow><<edit|shortcut=e>>|<<editOld|shortcut=e|this&nbsp;revision>></menurow>' +
'<menurow><<revert|shortcut=v>>|<<undo>></menurow>' + '}else{<<edit|shortcut=e>>}';
var markPatrolled='if(rcid){<<markpatrolled|mark patrolled>>}';
var newTopic='if(talk){<<new|shortcut=+|new topic>>}';
var protectDelete='if(admin){' + protect + del + '}';

if (getValueOf('popupActionsMenu')) {
s.push( '<<mainlink>>*' + dropdiv + menuTitle('actions'));
} else {
s.push( dropdiv + '<<mainlink>>');
}
s.push( '<menu>')
s.push( editRow + markPatrolled + newTopic + hist + lastedit )
if (!shorter) { s.push(jsHistory); }
s.push( move + linkshere + related)
if (!shorter) { s.push(nullPurge + search); }
if (!shorter) { s.push(viewOptions); }
s.push('<hr>' + watch + protectDelete);
s.push('<hr>' +
       'if(talk){<<article|shortcut=a|view article>><<editArticle|edit article>>}' +
       'else{<<talk|shortcut=t|talk page>><<editTalk|edit talk>>' +
       '<<newTalk|shortcut=+|new topic>>}</menu>' + enddiv);

// user menu starts here
var email='<<email|shortcut=E|email user>>';
var contribs='if(wikimedia){<menurow>}<<contribs|shortcut=c|contributions>>' +
'if(wikimedia){|<<contribsTree|tree>></menurow>}' +
'if(admin){<menurow><<deletedContribs>></menurow>}';


s.push('if(user){*' + dropdiv + menuTitle('user'));
s.push('<menu>'); +
s.push('<menurow><<userPage|shortcut=u|user&nbsp;page>>|<<userSpace|space>></menurow>');
s.push('<<userTalk|shortcut=t|user talk>><<editUserTalk|edit user talk>>' +
       '<<newUserTalk|shortcut=+|leave comment>>');
if(!shorter) { s.push( 'if(ipuser){<<arin>>}else{' + email + '}') }
else { s.push( 'if(ipuser){}else{' + email + '}') }
s.push('<hr>' + contribs + '<<userlog|shortcut=L|user log>>');
s.push('if(wikimedia){<<count|shortcut=#|edit counter>>}');
s.push('if(admin){<menurow><<unblock|unblockShort>>|<<block|shortcut=b|block user>></menurow>}');
s.push('<<blocklog|shortcut=B|block log>>' + getValueOf('popupExtraUserMenu'));
s.push('</menu>'  + enddiv + '}');

// popups menu starts here
if (getValueOf('popupSetupMenu') && !x.navpop.hasPopupMenu /* FIXME: hack */) {
x.navpop.hasPopupMenu=true;
s.push('*' + dropdiv + menuTitle('popupsMenu') + '<menu>');
s.push('<<togglePreviews|toggle previews>>');
s.push('<<purgePopups|reset>>');
s.push('<<disablePopups|disable>>');
s.push('</menu>'+enddiv);
}
return navlinkStringToHTML(s.join(''), x.article, x.params);
};

function menuTitle(s) {
return '<a href="#" noPopup=1>' + popupString(s) + '</a>';
}

pg.structures.menus.popupRedirTitle=pg.structures.menus.popupTitle;
pg.structures.menus.popupRedirTopLinks=pg.structures.menus.popupTopLinks;

copyStructure('menus', 'shortmenus');
pg.structures.shortmenus.popupTopLinks=function(x) {
return pg.structures.menus.popupTopLinks(x,true);
};
pg.structures.shortmenus.popupRedirTopLinks=pg.structures.shortmenus.popupTopLinks;

copyStructure('shortmenus', 'dabshortmenus');
pg.structures.dabshortmenus.popupLayout=function () {
return ['popupError', 'popupImage', 'popupTopLinks', 'popupTitle', 'popupOtherLinks',
'popupRedir', ['popupWarnRedir', 'popupRedirTopLinks', 'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'],
'popupData', 'popupMiscTools', ['popupRedlink'], 'popupFixDab',
'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview'];
};

copyStructure('menus', 'dabmenus');
pg.structures.dabmenus.popupLayout=pg.structures.dabshortmenus.popupLayout;


//</NOLITE>
pg.structures.lite={};
pg.structures.lite.popupLayout=function () {
return ['popupTitle', 'popupPreview' ];
};
pg.structures.lite.popupTitle=function (x) {
log (x.article + ': structures.lite.popupTitle');
//return navlinkStringToHTML('<b><<mainlink>></b>',x.article,x.params);
return '<div><span class="popup_mainlink"><b>' + x.article.toString() + '</b></span></div>';
};
// ENDFILE: structures.js
// STARTFILE: autoedit.js
//<NOLITE>
function getParamValue(paramName, h) {
if (typeof h == 'undefined' ) { h = document.location.href; }
var cmdRe=RegExp('[&?]'+paramName+'=([^&]*)');
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}

function substitute(data,cmdBody) {
// alert('sub\nfrom: '+cmdBody.from+'\nto: '+cmdBody.to+'\nflags: '+cmdBody.flags);
var fromRe=RegExp(cmdBody.from, cmdBody.flags);
return data.replace(fromRe, cmdBody.to);
}

function execCmds(data, cmdList) {
for (var i=0; i<cmdList.length; ++i) {
data=cmdList[i].action(data, cmdList[i]);
}
return data;
}

function parseCmd(str) {
// returns a list of commands
if (!str.length) { return []; }
var p=false;
switch (str.charAt(0)) {
case 's':
p=parseSubstitute(str);
break;
default:
return false;
}
if (p) { return [p].concat(parseCmd(p.remainder)); }
return false;
}

function unEscape(str, sep) {
return str.split('\\\\').join('\\').split('\\'+sep).join(sep).split('\\n').join('\n');
}


function parseSubstitute(str) {
// takes a string like s/a/b/flags;othercmds and parses it

var from,to,flags,tmp;

if (str.length<4) { return false; }
var sep=str.charAt(1);
str=str.substring(2);

tmp=skipOver(str,sep);
if (tmp) { from=tmp.segment; str=tmp.remainder; }
else { return false; }

tmp=skipOver(str,sep);
if (tmp) { to=tmp.segment; str=tmp.remainder; }
else { return false; }

flags='';
if (str.length) {
tmp=skipOver(str,';') || skipToEnd(str, ';');
if (tmp) {flags=tmp.segment; str=tmp.remainder; }
}

return {action: substitute, from: from, to: to, flags: flags, remainder: str};

}

function skipOver(str,sep) {
var endSegment=findNext(str,sep);
if (endSegment<0) { return false; }
var segment=unEscape(str.substring(0,endSegment), sep);
return {segment: segment, remainder: str.substring(endSegment+1)};
}

function skipToEnd(str,sep) {
return {segment: str, remainder: ''};
}

function findNext(str, ch) {
for (var i=0; i<str.length; ++i) {
if (str.charAt(i)=='\\') { i+=2; }
if (str.charAt(i)==ch) { return i; }
}
return -1;
}

function setCheckbox(param, box) {
var val=getParamValue(param);
if (val!==null) {
switch (val) {
case '1': case 'yes': case 'true':
box.checked=true;
break;
case '0': case 'no':  case 'false':
box.checked=false;
}
}
}

function autoEdit() {
if (!setupPopups.completed) { setupPopups(); }
if (!document.editform) { return false; }
if (window.autoEdit.alreadyRan) { return false; }
window.autoEdit.alreadyRan=true;
var cmdString=getParamValue('autoedit');
if (cmdString) {
try {
var editbox=document.editform.wpTextbox1;
} catch (dang) { return; }
var cmdList=parseCmd(cmdString);
var input=editbox.value;
var output=execCmds(input, cmdList);
editbox.value=output;
}
setCheckbox('autominor', document.editform.wpMinoredit);
setCheckbox('autowatch', document.editform.wpWatchthis);

var rvid = getParamValue('autorv');
if (getValueOf('popupUseAPI') && getParamValue('autorv')) {
   var url=pg.wiki.wikibase + '/api.php?action=query&format=json&prop=revisions&revids='+rvid;
startDownload(url, null, autoEdit2);
} else if (getValueOf('popupUseQueryInterface') && getParamValue('autorv')) {
   var url=pg.wiki.wikibase + '/query.php?format=json&what=revisions&revids='+rvid;
   startDownload(url, null, autoEdit2);
} else { autoEdit2(); }
}

function autoEdit2(d) {
var summary=getParamValue('autosummary');
var summaryprompt=getParamValue('autosummaryprompt');
var summarynotice='';
if (d && d.data && getParamValue('autorv')) {
var s = getRvSummary(summary, d.data);
if (s===false) {
summaryprompt=true;
summarynotice=popupString('Failed to get revision information, please edit manually.\n\n');
summary = simplePrintf(summary, [getParamValue('autorv'), '(unknown)', '(unknown)']);
} else { summary = s; }
}
if (summaryprompt) {
var txt= summarynotice +
popupString('Enter a non-empty edit summary or press cancel to abort');
var response=prompt(txt, summary);
if (response) { summary=response; }
else { return; }
}
if (summary) { document.editform.wpSummary.value=summary; }
// Attempt to avoid possible premature clicking of the save button
// (maybe delays in updates to the DOM are to blame?? or a red herring)
setTimeout(autoEdit3, 100);
}

function autoClickToken() {
    return document.cookie.substr(document.cookie.indexOf("session=")+8,4);
}

function autoEdit3() {
    if( getParamValue('actoken') != autoClickToken()) return;

var btn=getParamValue('autoclick');
if (btn) {
if (document.editform && document.editform[btn]) {
var button=document.editform[btn];
var msg=tprintf('The %s button has been automatically clicked. Please wait for the next page to load.',
[ button.value ]);
bannerMessage(msg);
document.title='('+document.title+')';
button.click();
} else {
alert(tprintf('Could not find button %s. Please check the settings in your javascript file.',
      [ btn ]));
}
}
}

function bannerMessage(s) {
var headings=document.getElementsByTagName('h1');
if (headings) {
var div=document.createElement('div');
div.innerHTML='<font size=+1><b>' + s + '</b></font>';
headings[0].parentNode.insertBefore(div, headings[0]);
}
}

function getRvSummary(template, json) {
try {
    var o=getJsObj(json);
    if (getValueOf('popupUseAPI')) {
        var edit = anyChild(o.query.pages).revisions[0];
    } else {
    var edit = anyChild(o.pages).revisions[0];
    }
} catch (badness) {return false;}
var timestamp = edit.timestamp.split(/[A-Z]/g).join(' ').replace(/^ *| *$/g, '');
return simplePrintf(template, [edit.revid, timestamp, edit.user]);
}

hookEvent('load', autoEdit);

//</NOLITE>
// ENDFILE: autoedit.js
// STARTFILE: downloader.js
/**
   @fileoverview
   {@link Downloader}, a xmlhttprequest wrapper, and helper functions.
*/

/**
   Creates a new Downloader
   @constructor
   @class The Downloader class. Create a new instance of this class to download stuff.
   @param {String} url The url to download. This can be omitted and supplied later.
*/
function Downloader(url) {
// Source: http://jibbering.com/2002/4/httprequest.html
/** xmlhttprequest object which we're wrapping */
this.http = false;

/*@cc_on @*/
/*@if (@_jscript_version >= 5)
// JScript gives us Conditional compilation,
// we can cope with old IE versions.
// and security blocked creation of the objects.
try {
this.http = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
this.http = new ActiveXObject("Microsoft.XMLHTTP");
} catch (E) {
// this.http = false;
}
}
@end @*/

if (! this.http && typeof XMLHttpRequest!='undefined') { this.http = new XMLHttpRequest(); }
/**
    The url to download
    @type String
*/
this.url = url;
/**
    A universally unique ID number
    @type integer
*/
this.id=null;
/**
    Modification date, to be culled from the incoming headers
    @type Date
    @private
*/
this.lastModified = null;
/**
    What to do when the download completes successfully
    @type Function
    @private
*/
this.callbackFunction = null;
/**
    What to do on failure
    @type Function
    @private
*/
this.onFailure = null;
/**
    Flag set on <code>abort</code>
    @type boolean
*/
this.aborted = false;
/**
   HTTP method. See http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html for possibilities.
   @type String
*/
this.method='GET';
/**
    Async flag.
    @type boolean
*/
this.async=true;
}

new Downloader();

/** Submits the http request. */
Downloader.prototype.send = function (x) {
if (!this.http) { return null; }
return this.http.send(x);
};
/** Aborts the download, setting the <code>aborted</code> field to true.  */
Downloader.prototype.abort = function () {
if (!this.http) { return null; }
this.aborted=true;
return this.http.abort();
};
/** Returns the downloaded data. */
Downloader.prototype.getData = function () {if (!this.http) { return null; } return this.http.responseText;};
/** Prepares the download. */
Downloader.prototype.setTarget = function () {
if (!this.http) { return null; }
this.http.open(this.method, this.url, this.async);
};
/** Gets the state of the download. */
Downloader.prototype.getReadyState=function () {if (!this.http) { return null; } return this.http.readyState;};

pg.misc.downloadsInProgress = { };

/** Starts the download.
    Note that setTarget {@link Downloader#setTarget} must be run first
*/
Downloader.prototype.start=function () {
if (!this.http) { return; }
pg.misc.downloadsInProgress[this.id] = this;
this.http.send(null);
};

/** Gets the 'Last-Modified' date from the download headers.
    Should be run after the download completes.
    Returns <code>null</code> on failure.
    @return {Date}
*/
Downloader.prototype.getLastModifiedDate=function () {
if(!this.http) { return null; }
var lastmod=null;
try {
lastmod=this.http.getResponseHeader('Last-Modified');
} catch (err) {}
if (lastmod) { return new Date(lastmod); }
return null;
};

/** Sets the callback function.
    @param {Function} f callback function, called as <code>f(this)</code> on success
*/
Downloader.prototype.setCallback = function (f) {
if(!this.http) { return; }
this.http.onreadystatechange = f;
};

Downloader.prototype.getStatus = function() { if (!this.http) { return null; } return this.http.status; };

//////////////////////////////////////////////////
// helper functions

/** Creates a new {@link Downloader} and prepares it for action.
    @param {String} url The url to download
    @param {integer} id The ID of the {@link Downloader} object
    @param {Function} callback The callback function invoked on success
    @return {String/Downloader} the {@link Downloader} object created, or 'ohdear' if an unsupported browser
*/
function newDownload(url, id, callback, onfailure) {
var d=new Downloader(url);
if (!d.http) { return 'ohdear'; }
d.id=id;
d.setTarget();
if (!onfailure) {
onfailure=2;
}
var f = function () {
if (d.getReadyState() == 4) {
delete pg.misc.downloadsInProgress[this.id];
try {
if ( d.getStatus() == 200 ) {
d.data=d.getData();
d.lastModified=d.getLastModifiedDate();
callback(d);
} else if (typeof onfailure == typeof 1) {
if (onfailure > 0) {
// retry
newDownload(url, id, callback, onfailure - 1);
}
} else if (typeof onfailure == 'function') {
onfailure(d,url,id,callback);
}
} catch (somerr) { /* ignore it */ }
}
};
d.setCallback(f);
return d;
}
/** Simulates a download from cached data.
    The supplied data is put into a {@link Downloader} as if it had downloaded it.
    @param {String} url The url.
    @param {integer} id The ID.
    @param {Function} callback The callback, which is invoked immediately as <code>callback(d)</code>,
    where <code>d</code> is the new {@link Downloader}.
    @param {String} data The (cached) data.
    @param {Date} lastModified The (cached) last modified date.
*/
function fakeDownload(url, id, callback, data, lastModified, owner) {
var d=newDownload(url,callback);
d.owner=owner;
d.id=id; d.data=data;
d.lastModified=lastModified;
return callback(d);
}

/**
   Starts a download.
   @param {String} url The url to download
   @param {integer} id The ID of the {@link Downloader} object
   @param {Function} callback The callback function invoked on success
   @return {String/Downloader} the {@link Downloader} object created, or 'ohdear' if an unsupported browser
*/
function startDownload(url, id, callback) {
var d=newDownload(url, id, callback);
if (typeof d == typeof '' ) { return d; }
d.start();
return d;
}

/**
   Aborts all downloads which have been started.
*/
function abortAllDownloads() {
for ( var x in pg.misc.downloadsInProgress ) {
try {
pg.misc.downloadsInProgress[x].aborted=true;
pg.misc.downloadsInProgress[x].abort();
delete pg.misc.downloadsInProgress[x];
} catch (e) { }
}
}
// ENDFILE: downloader.js
// STARTFILE: livepreview.js
// TODO: location is often not correct (eg relative links in previews)

/**
 * InstaView - a Mediawiki to HTML converter in JavaScript
 * Version 0.6.1
 * Copyright (C) Pedro Fayolle 2005-2006
 * http://en.wikipedia.org/wiki/User:Pilaf
 * Distributed under the BSD license
 *
 * Changelog:
 *
 * 0.6.1
 * - Fixed problem caused by \r characters
 * - Improved inline formatting parser
 *
 * 0.6
 * - Changed name to InstaView
 * - Some major code reorganizations and factored out some common functions
 * - Handled conversion of relative links (i.e. [[/foo]])
 * - Fixed misrendering of adjacent definition list items
 * - Fixed bug in table headings handling
 * - Changed date format in signatures to reflect Mediawiki's
 * - Fixed handling of [[:Image:...]]
 * - Updated MD5 function (hopefully it will work with UTF-8)
 * - Fixed bug in handling of links inside images
 *
 * To do:
 * - Better support for <math>
 * - Full support for <nowiki>
 * - Parser-based (as opposed to RegExp-based) inline wikicode handling (make it one-pass and bullet-proof)
 * - Support for templates (through AJAX)
 * - Support for coloured links (AJAX)
 */


var Insta = {}

function setupLivePreview() {

    // options
    Insta.conf =
{
    baseUrl: '',

    user: {},

    wiki: {
lang: pg.wiki.lang,
interwiki: pg.wiki.interwiki,
default_thumb_width: 180
    },

    paths: {
articles: '/' + joinPath([pg.wiki.prePath, pg.wiki.articlePath]) + '/',
math: '/math/', // FIXME
images: ( window.getImageUrlStart ? getImageUrlStart(pg.wiki.hostname) : ''),
images_fallback: 'http://upload.wikimedia.org/wikipedia/commons/',
magnify_icon: 'skins/common/images/magnify-clip.png'
    },

    locale: {
user: pg.ns.user,
image: pg.ns.image,
category: pg.ns.category,
// shouldn't be used in popup previews, i think
months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    }
}

    // options with default values or backreferences
    with (Insta.conf) {
user.name = user.name || 'Wikipedian'
user.signature = '[['+locale.user+':'+user.name+'|'+user.name+']]'
//paths.images = 'http://upload.wikimedia.org/wikipedia/' + wiki.lang + '/'
    }

    // define constants
    Insta.BLOCK_IMAGE = new RegExp('^\\[\\[(?:Image|'+Insta.conf.locale.image+
       '):.*?\\|.*?(?:frame|thumbnail|thumb|none|right|left|center)', 'i');

}


Insta.dump = function(from, to)
{
if (typeof from == 'string') from = document.getElementById(from)
if (typeof to == 'string') to = document.getElementById(to)
to.innerHTML = this.convert(from.value)
}

Insta.convert = function(wiki)
{
varll = (typeof wiki == 'string')? wiki.replace(/\r/g,'').split(/\n/): wiki, // lines of wikicode
o='',// output
p=0,// para flag
$r// result of passing a regexp to $()

// some shorthands
function remain() { return ll.length }
function sh() { return ll.shift() } // shift
function ps(s) { o+=s } // push

function f() // similar to C's printf, uses ? as placeholders, ?? to escape question marks
{
var i=1,a=arguments,f=a[0],o='',c,p
for (;i<a.length; i++) if ((p=f.indexOf('?'))+1) {
// allow character escaping
i -= c=f.charAt(p+1)=='?'?1:0
o += f.substring(0,p)+(c?'?':a[i])
f=f.substr(p+1+c)
} else break;
return o+f
}

function html_entities(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") }

function max(a,b) { return (a>b)?a:b }
function min(a,b) { return (a<b)?a:b }

// return the first non matching character position between two strings
function str_imatch(a, b)
{
for (var i=0, l=min(a.length, b.length); i<l; i++) if (a.charAt(i)!=b.charAt(i)) break
return i
}

// compare current line against a string or regexp
// if passed a string it will compare only the first string.length characters
// if passed a regexp the result is stored in $r
function $(c) { return (typeof c == 'string') ? (ll[0].substr(0,c.length)==c) : ($r = ll[0].match(c)) }

function $$(c) { return ll[0]==c } // compare current line against a string
function _(p) { return ll[0].charAt(p) } // return char at pos p

function endl(s) { ps(s); sh() }

function parse_list()
{
var prev='';

while (remain() && $(/^([*#:;]+)(.*)$/)) {

var l_match = $r

sh()

var ipos = str_imatch(prev, l_match[1])

// close uncontinued lists
for (var i=prev.length-1; i >= ipos; i--) {

var pi = prev.charAt(i)

if (pi=='*') ps('</ul>')
else if (pi=='#') ps('</ol>')
// close a dl only if the new item is not a dl item (:, ; or empty)
else switch (l_match[1].charAt(i)) { case'':case'*':case'#': ps('</dl>') }
}

// open new lists
for (var i=ipos; i<l_match[1].length; i++) {

var li = l_match[1].charAt(i)

if (li=='*') ps('<ul>')
else if (li=='#') ps('<ol>')
// open a new dl only if the prev item is not a dl item (:, ; or empty)
else switch(prev.charAt(i)) { case'':case'*':case'#': ps('<dl>') }
}

switch (l_match[1].charAt(l_match[1].length-1)) {

case '*': case '#':
ps('<li>' + parse_inline_nowiki(l_match[2])); break

case ';':
ps('<dt>')

var dt_match

// handle ;dt :dd format
if (dt_match = l_match[2].match(/(.*?)(:.*?)$/)) {

ps(parse_inline_nowiki(dt_match[1]))
ll.unshift(dt_match[2])

} else ps(parse_inline_nowiki(l_match[2]))

break

case ':':
ps('<dd>' + parse_inline_nowiki(l_match[2]))
}

prev=l_match[1]
}

// close remaining lists
for (var i=prev.length-1; i>=0; i--)
ps(f('</?>', (prev.charAt(i)=='*')? 'ul': ((prev.charAt(i)=='#')? 'ol': 'dl')))
}

function parse_table()
{
endl(f('<table?>', $(/^\{\|( .*)$/)? $r[1]: ''))

for (;remain();) if ($('|')) switch (_(1)) {
case '}': endl('</table>'); return
case '-': endl(f('<tr ?>', $(/\|-*(.*)/)[1])); break
default: parse_table_data()
}
else if ($('!')) parse_table_data()
else sh()
}

function parse_table_data()
{
var td_line, match_i

// 1: "|+", '|' or '+'
// 2: ??
// 3: attributes ??
// TODO: finish commenting this regexp
var td_match = sh().match(/^(\|\+|\||!)((?:([^[|]*?)\|(?!\|))?(.*))$/)

if (td_match[1] == '|+') ps('<caption');
else ps('<t' + ((td_match[1]=='|')?'d':'h'))

if (typeof td_match[3] != 'undefined') {

ps(' ' + td_match[3])
match_i = 4

} else match_i = 2

ps('>')

if (td_match[1] != '|+') {

// use || or !! as a cell separator depending on context
// NOTE: when split() is passed a regexp make sure to use non-capturing brackets
td_line = td_match[match_i].split((td_match[1] == '|')? '||': /(?:\|\||!!)/)

ps(parse_inline_nowiki(td_line.shift()))

while (td_line.length) ll.unshift(td_match[1] + td_line.pop())

} else ps(td_match[match_i])

var tc = 0, td = []

for (;remain(); td.push(sh()))
if ($('|')) {
if (!tc) break // we're at the outer-most level (no nested tables), skip to td parse
else if (_(1)=='}') tc--
}
else if (!tc && $('!')) break
else if ($('{|')) tc++

if (td.length) ps(Insta.convert(td))
}

function parse_pre()
{
ps('<pre>')
do endl(parse_inline_nowiki(ll[0].substring(1)) + "\n"); while (remain() && $(' '))
ps('</pre>')
}

function parse_block_image()
{
ps(parse_image(sh()))
}

function parse_image(str)
{
//<NOLITE>
// get what's in between "[[Image:" and "]]"
var tag = str.substring(str.indexOf(':') + 1, str.length - 2);

var width;
var attr = [], filename, caption = '';
var thumb=0, frame=0, center=0;
var align='';

if (tag.match(/\|/)) {
// manage nested links
var nesting = 0;
var last_attr;
for (var i = tag.length-1; i > 0; i--) {
if (tag.charAt(i) == '|' && !nesting) {
last_attr = tag.substr(i+1);
tag = tag.substring(0, i);
break;
} else switch (tag.substr(i-1, 2)) {
case ']]':
nesting++;
i--;
break;
case '[[':
nesting--;
i--;
}
}

attr = tag.split(/\s*\|\s*/);
attr.push(last_attr);
filename = attr.shift();

var w_match;

for (;attr.length; attr.shift())
if (w_match = attr[0].match(/^(\d*)(?:[px]*\d*)?px$/)) width = w_match[1]
else switch(attr[0]) {
case 'thumb':
case 'thumbnail':
thumb=true;
case 'frame':
frame=true;
break;
case 'none':
case 'right':
case 'left':
center=false;
align=attr[0];
break;
case 'center':
center=true;
align='none';
break;
default:
if (attr.length == 1) caption = attr[0];
}

} else filename = tag;


var o='';

if (frame) {

if (align=='') align = 'right';

o += f("<div class='thumb t?'>", align);

if (thumb) {
if (!width) width = Insta.conf.wiki.default_thumb_width;

o += f("<div style='width:?px;'>?", 2+width*1, make_image(filename, caption, width)) +
f("<div class='thumbcaption'><div class='magnify' style='float:right'><a href='?' class='internal' title='Enlarge'><img src='?'></a></div>?</div>",
Insta.conf.paths.articles + Insta.conf.locale.image + ':' + filename,
Insta.conf.paths.magnify_icon,
parse_inline_nowiki(caption)
)
} else {
o += '<div>' + make_image(filename, caption) + f("<div class='thumbcaption'>?</div>", parse_inline_nowiki(caption))
}

o += '</div></div>';

} else if (align != '') {
o += f("<div class='float?'><span>?</span></div>", align, make_image(filename, caption, width));
} else {
return make_image(filename, caption, width);
}

return center? f("<div class='center'>?</div>", o): o;
//</NOLITE>
}

function parse_inline_nowiki(str)
{
var start, lastend=0
var substart=0, nestlev=0, open, close, subloop;
var html='';

while (-1 != (start = str.indexOf('<nowiki>', substart))) {
html += parse_inline_wiki(str.substring(lastend, start));
start += 8;
substart = start;
subloop = true;
do {
open = str.indexOf('<nowiki>', substart);
close = str.indexOf('</nowiki>', substart);
if (close<=open || open==-1) {
if (close==-1) {
return html + html_entities(str.substr(start));
}
substart = close+9;
if (nestlev) {
nestlev--;
} else {
lastend = substart;
html += html_entities(str.substring(start, lastend-9));
subloop = false;
}
} else {
substart = open+8;
nestlev++;
}
} while (subloop)
}

return html + parse_inline_wiki(str.substr(lastend));
}

function make_image(filename, caption, width)
{
//<NOLITE>
// uppercase first letter in file name
filename = filename.charAt(0).toUpperCase() + filename.substr(1);
// replace spaces with underscores
filename = filename.replace(/ /g, '_');

caption = strip_inline_wiki(caption);

var md5 = hex_md5(filename);

var source = md5.charAt(0) + '/' + md5.substr(0,2) + '/' + filename;

if (width) width = "width='" + width + "px'";

var img = f("<img onerror=\"this.onerror=null;this.src='?'\" src='?' ? ?>", Insta.conf.paths.images_fallback + source, Insta.conf.paths.images + source, (caption!='')? "alt='" + caption + "'" : '', width);

return f("<a class='image' ? href='?'>?</a>", (caption!='')? "title='" + caption + "'" : '', Insta.conf.paths.articles + Insta.conf.locale.image + ':' + filename, img);
//</NOLITE>
}

function parse_inline_images(str)
{
//<NOLITE>
var start, substart=0, nestlev=0;
var loop, close, open, wiki, html;

while (-1 != (start=str.indexOf('[[', substart))) {
if(str.substr(start+2).match(RegExp('^' + Insta.conf.locale.image + ':','i'))) {
loop=true;
substart=start;
do {
substart+=2;
close=str.indexOf(']]',substart);
open=str.indexOf('[[',substart);
if (close<=open||open==-1) {
if (close==-1) return str;
substart=close;
if (nestlev) {
nestlev--;
} else {
wiki=str.substring(start,close+2);
html=parse_image(wiki);
str=str.replace(wiki,html);
substart=start+html.length;
loop=false;
}
} else {
substart=open;
nestlev++;
}
} while (loop)

} else break;
}

//</NOLITE>
return str;
}

// the output of this function doesn't respect the FILO structure of HTML
// but since most browsers can handle it I'll save myself the hassle
function parse_inline_formatting(str)
{
var em,st,i,li,o='';
while ((i=str.indexOf("''",li))+1) {
o += str.substring(li,i);
li=i+2;
if (str.charAt(i+2)=="'") {
li++;
st=!st;
o+=st?'<strong>':'</strong>';
} else {
em=!em;
o+=em?'<em>':'</em>';
}
}
return o+str.substr(li);
}

function parse_inline_wiki(str)
{
var aux_match;

str = parse_inline_images(str);
str = parse_inline_formatting(str);

// math
while (aux_match = str.match(/<(?:)math>(.*?)<\/math>/i)) {
var math_md5 = hex_md5(aux_match[1]);
str = str.replace(aux_match[0], f("<img src='?.png'>", Insta.conf.paths.math+math_md5));
}

// Build a Mediawiki-formatted date string
var date = new Date;
var minutes = date.getUTCMinutes();
if (minutes < 10) minutes = '0' + minutes;
var date = f("?:?, ? ? ? (UTC)", date.getUTCHours(), minutes, date.getUTCDate(), Insta.conf.locale.months[date.getUTCMonth()], date.getUTCFullYear());

// text formatting
return str.
// signatures
replace(/~{5}(?!~)/g, date).
replace(/~{4}(?!~)/g, Insta.conf.user.name+' '+date).
replace(/~{3}(?!~)/g, Insta.conf.user.name).

// [[:Category:...]], [[:Image:...]], etc...
replace(RegExp('\\[\\[:((?:'+Insta.conf.locale.category+'|'+Insta.conf.locale.image+'|'+Insta.conf.wiki.interwiki+'):[^|]*?)\\]\\](\w*)','gi'), "<a href='"+Insta.conf.paths.articles+"$1'>$1$2</a>").
// remove straight category and interwiki tags
replace(RegExp('\\[\\[(?:'+Insta.conf.locale.category+'|'+Insta.conf.wiki.interwiki+'):.*?\\]\\]','gi'),'').

// [[:Category:...|Links]], [[:Image:...|Links]], etc...
replace(RegExp('\\[\\[:((?:'+Insta.conf.locale.category+'|'+Insta.conf.locale.image+'|'+Insta.conf.wiki.interwiki+'):.*?)\\|([^\\]]+?)\\]\\](\\w*)','gi'), "<a href='"+Insta.conf.paths.articles+"$1'>$2$3</a>").

// [[/Relative links]]
replace(/\[\[(\/[^|]*?)\]\]/g, f("<a href='?$1'>$1</a>", Insta.conf.baseUrl)).

// [[/Replaced|Relative links]]
replace(/\[\[(\/.*?)\|(.+?)\]\]/g, f("<a href='?$1'>$2</a>", Insta.conf.baseUrl)).

// [[Common links]]
replace(/\[\[([^|]*?)\]\](\w*)/g, f("<a href='?$1'>$1$2</a>", Insta.conf.paths.articles)).

// [[Replaced|Links]]
replace(/\[\[(.*?)\|([^\]]+?)\]\](\w*)/g, f("<a href='?$1'>$2$3</a>", Insta.conf.paths.articles)).

// [[Stripped:Namespace|Namespace]]
replace(/\[\[([^\]]*?:)?(.*?)( *\(.*?\))?\|\]\]/g, f("<a href='?$1$2$3'>$2</a>", Insta.conf.paths.articles)).

// External links
replace(/\[(https?|news|ftp|mailto|gopher|irc):(\/*)([^\]]*?) (.*?)\]/g, "<a class='external' href='$1:$2$3'>$4</a>").
replace(/\[http:\/\/(.*?)\]/g, "<a class='external' href='http://$1'>[#]</a>").
replace(/\[(news|ftp|mailto|gopher|irc):(\/*)(.*?)\]/g, "<a class='external' href='$1:$2$3'>$1:$2$3</a>").
replace(/(^| )(https?|news|ftp|mailto|gopher|irc):(\/*)([^ $]*[^.,!?;: $])/g, "$1<a class='external' href='$2:$3$4'>$2:$3$4</a>").

replace('__NOTOC__','').
replace('__NOEDITSECTION__','');
}
/*
*/
function strip_inline_wiki(str)
{
return str
.replace(/\[\[[^\]]*\|(.*?)\]\]/g,'$1')
.replace(/\[\[(.*?)\]\]/g,'$1')
.replace(/''(.*?)''/g,'$1');
}

// begin parsing
for (;remain();) if ($(/^(={1,6})(.*)\1(.*)$/)) {
p=0
endl(f('<h?>?</h?>?', $r[1].length, parse_inline_nowiki($r[2]), $r[1].length, $r[3]))

} else if ($(/^[*#:;]/)) {
p=0
parse_list()

} else if ($(' ')) {
p=0
parse_pre()

} else if ($('{|')) {
p=0
parse_table()

} else if ($(/^----+$/)) {
p=0
endl('<hr>')

} else if ($(Insta.BLOCK_IMAGE)) {
p=0
parse_block_image()

} else {

// handle paragraphs
if ($$('')) {
if (p = (remain()>1 && ll[1]==(''))) endl('<p><br>')
} else {
if(!p) {
ps('<p>')
p=1
}
ps(parse_inline_nowiki(ll[0]) + ' ')
}

sh();
}

return o
};

window.wiki2html=function(txt,baseurl) {
    Insta.conf.baseUrl=baseurl;
    return Insta.convert(txt);
};
// ENDFILE: livepreview.js
// STARTFILE: pageinfo.js
//<NOLITE>
function popupFilterPageSize(data) {
return formatBytes(data.length);
}

function popupFilterCountLinks(data) {
var num=countLinks(data);
return String(num) + '&nbsp;' + ((num!=1)?popupString('wikiLinks'):popupString('wikiLink'));
}

fun