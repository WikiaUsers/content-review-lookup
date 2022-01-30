// STARTFILE : main.js 
// ******************************************* ******************************** 
// ** ** 
// ** les modifications apportées à ce fichier affectent de nombreux utilisateurs. ** 
// ** s'il vous plaît discuter sur la page de discussion avant d'éditer ** 
// ** ** 
// ************************** ******************************************** 
// ** ** 
// ** si vous modifiez ce fichier, assurez-vous que votre éditeur le reconnaît ** 
// ** comme utf8, ou les caractères étranges et merveilleux dans les espaces de noms **
// ** ci-dessous sera complètement cassé. Vous pouvez vérifier avec le 
bouton show ** // ** changes avant de soumettre la modification. ** 
// ** test : مدیا מיוחד Мэдыя ** 
// ** ** 
// ***************************** ******************************************* 
/* navigateur eslint-env */ 
/ * global $, jQuery, mw, window */ 

// Correction ultérieure 
/* global log, errlog, popupStrings, wikEdUseWikEd, WikEdUpdateFrame */ 
/* eslint no-mixed-spaces-and-tabs: 0, no-empty: 0 * / 

$(function () { 
///////////////////////////////////////// /////// 
// Globales 
//

// Essayer d'en insérer autant que possible dans l'objet pg (popup globals) 
var pg = { 
	re: {}, // regexps 
	ns: {}, // namespaces 
	string: {}, // strings traduisibles 
	wiki: {}, // 
	utilisateur d' informations sur le site local : {}, // informations sur l'utilisateur actuel 
	misc : {}, // 
	option YUCK PHOOEY : {}, // options, voir newOption etc. 
	optionDefault : {}, // 
	indicateur de valeurs d'option par défaut : {}, // divers drapeaux 
	cache : {}, // 
	structures de cache de page et d'image : {}, // navlink structures 
	timer : {}, // toutes sortes de minuteries (trop)
	compteur : {}, // .. et toutes sortes de compteurs 
	actuels : {}, // info d'état 
	fn : {}, // fonctions 
	endoflist : null 
} ; 
/* Bail si le gadget/script est chargé deux fois */ 
if( window.pg ) { 
	return; 
} 
/* Exporter vers le contexte global */ 
window.pg = pg; 

/// Variables locales : /// 
/// mode:c /// 
/// End : /// 
// ENDFILE : main.js 
// STARTFILE : actions.js 
fonction setupTooltips(container, remove, force, popData ) { 
	log('setupTooltips, container='+container+', remove='+remove); 
	if (!container) { 
//<NOLITE> 
		// l'appel initial principal
		if (getValueOf('popupOnEditSelection') && document && document.editform && document.editform.wpTextbox1) { 
			document.editform.wpTextbox1.onmouseup=doSelectionPopup; 
		} 
//</NOLITE> 
		// l'article/contenu est un objet dépendant de la structure 
		container = defaultPopupsContainer(); 
	} 

	if (!remove && !force && container.ranSetupTooltipsAlready) { return; } 
	container.ranSetupTooltipsAlready = !remove; 

	ancres var; 
	anchors=container.getElementsByTagName('A'); 
	setupTooltipsLoop(ancres, 0, 250, 100, supprimer, popData); 
} 

function defaultPopupsContainer() { 
	if (getValueOf('popupOnlyArticleLinks'
			document.getElementById('content') || 
			document.getElementById('article') || document; 
	} 
	document de retour ; 
} 

function setupTooltipsLoop(anchors,begin,howmany,sleep, remove, popData) {
	log(simplePrintf('setupTooltipsLoop(%s,%s,%s,%s,%s)', arguments)); 
	var finish=begin+combien; 
	var loopend = Math.min(finish, anchors.length); 
	var j=loopend - commencer ; 
	log ('setupTooltips: anchors.length=' + anchors.length + ', begin=' + begin + 
		 ', howmany=' + howmany + ', loopend=' + loopend + ', remove=' + remove); 
	var doTooltip= supprimer ? removeTooltip : addTooltip; 
	// essaie une construction de boucle plus rapide (?) 
	if (j > 0) { 
		do { 
			var a=anchors[loopend - j];
				log(' got null anchor at index ' + loopend - j); 
				Continuez; 
			} 
			doTooltip(a, popData); 
		} tandis que (--j); 
	} 
	if (finish < ancres.length) { 
		setTimeout(function() { 
				setupTooltipsLoop(ancres,finish,howmany,sleep,remove,popData);}, 
			sleep); 
	} else { 
		if ( !remove && ! getValueOf('popupTocLinks')) { rmTocTooltips(); } 
		pg.flag.finishedLoading=true ; 
	} 
} 

// élimine les popups de la table des matières 
// Cela tue également tout ce qui se passait auparavant dans la 
fonction toc rmTocTooltips() { 
	var toc=document.getElementById('toc'); 
	si (toc) {
		var tocLinks=toc.getElementsByTagName('A'); 
		var tocLen = tocLinks.length; 
		for (var j=0; j<tocLen; ++j) { 
			removeTooltip(tocLinks[j], true); 
		} 
	} 
} 

function addTooltip(a, popData) { 
	if ( !isPopupLink(a) ) { return; } 
	a.onmouseover=mouseOverWikiLink; 
	a.onmouseout= mouseOutWikiLink; 
	a.onmousedown = killPopup; 
	a.hasPopup = vrai; 
	a.popData = popData; 
} 

function removeTooltip(a) { 
	if ( !a.hasPopup ) { return; } 
	a.onmouseover = null; 
	a.onmouseout = null; 
	if (a.originalTitle) { a.title = a.originalTitle; } 
	a.hasPopup=false ; 
}

function removeTitle(a) { 
	if (!a.originalTitle) { 
		a.originalTitle=a.title; 
	} 
		a.title=''; 
} 

function restoreTitle(a) { 
	if ( a.title || !a.originalTitle ) { return; } 
	a.title = a.originalTitle; 
} 

fonction registerHooks(np) { 
	var popupMaxWidth=getValueOf('popupMaxWidth'); 

	if (typeof popupMaxWidth === 'number') { 
		var setMaxWidth = function () { 
			np.mainDiv.style.maxWidth = popupMaxWidth + 'px'; 
			np.maxWidth = popupMaxWidth; 
		} ; 
		np.addHook(setMaxWidth, 'afficher', 'avant'); 
	} 
//<NOLITE> 
	np.addHook(addPopupShortcuts, 'unhide', '
	np.addHook(rmPopupRaccourcis, 'masquer', 'avant'); 
//</NOLITE> 
} 

function removeModifierKeyHandler(a) { 
	//supprime les écouteurs pour la touche de modification s'il y en a qui ont été ajoutés dans mouseOverWikiLink 
	document.removeEventListener('keydown', a.modifierKeyHandler, false); 
	document.removeEventListener('keyup', a.modifierKeyHandler, false); 
} 

function mouseOverWikiLink(evt) { 
	if (!evt && window.event) {evt=window.event;} 
	
	// si le modificateur est nécessaire, écoutez-le, 
	// nous supprimerons l'écouteur lorsque nous sortirons de ce lien ou tuer la fenêtre contextuelle. 
	if (getValueOf('popupModifier')) { 
		// si popupModifierAction = activer,
		// si popupModifierAction = disable, nous devrions popup à moins que le modificateur soit pressé 
    	var action = getValueOf('popupModifierAction'); 
    	clé var = action=='désactiver' ? 'keyup' : 'keydown'; 
    	var a = ceci; 
    	a.modifierKeyHandler = function(evt) { 
			mouseOverWikiLink2(a, evt); 
		} ; 
    	document.addEventListener(clé, a.modifierKeyHandler, false); 
	} 

	return mouseOverWikiLink2(this, evt); 
} 

/** 
 * Obtient l'élément de liste de références ciblé par le lien de note de bas de page fourni. Ce 
 * est généralement un élément li dans l'élément ol.references à l'intérieur de la reflist. 
 * @param {Element} a - Un lien de note de bas de page.
 * @returns {Element|boolean} L'élément ciblé, ou false s'il est introuvable. 
 */ 
function footnoteTarget(a) { 
	var aTitle=Title.fromAnchor(a); 
	// Nous voulons ".3A" plutôt que "%3A" ou "?" ici, utilisez donc la propriété anchor directement 
	var anch = aTitle.anchor; 
	if ( ! /^(cite_note-|_note-|endnote)/.test(anch) ) { return false; } 

	var lTitle=Titre.fromURL(location.href); 
	if ( lTitle.toString(true) !== aTitle.toString(true) ) { return false; } 

	var el=document.getElementById(anch); 
	while ( el && typeof el.nodeName === 'string') { 
		var nt = el.nodeName.toLowerCase(); 
		if ( nt === 'li' ) { return el; } 
		else if ( nt === 'corps' ) { renvoie faux ; }
		else if ( el.parentNode ) { el=el.parentNode; } 
		else { return false; } 
	} 
	renvoie faux ; 
} 

function footnotePreview(x, navpop) { 
	setPopupHTML('<hr />' + x.innerHTML, 'popupPreview', navpop.idNumber); 
} 

function modifierPressed(evt) { 
		var mod=getValueOf('popupModifier'); 
		if (!mod) { return false; } 

		if (!evt && window.event) {evt=window.event;} 

		return ( evt && mod && evt[mod.toLowerCase() + 'Key'] ); 
} 

// Vérifie si le modificateur correct enfoncé/non enfoncé si nécessaire 
function isCorrectModifier(a,evt) { 
	if (!getValueOf('popupModifier')) { return true; }
	// si popupModifierAction = enable, nous devrions popup lorsque le modificateur est pressé 
	// si popupModifierAction = disable, nous devrions popup à moins que le modificateur soit pressé 
	var action = getValueOf('popupModifierAction'); 
	return ( action == 'activer' && modifierPressed(evt) || 
	         action == 'disable' && !modifierPressed(evt) ); 
} 

function mouseOverWikiLink2(a, evt) { 
	if (!isCorrectModifier(a,evt)) { return; } 
	if ( getValueOf('removeTitles') ) { removeTitle(a); } 
	if ( a==pg.current.link && a.navpopup && a.navpopup.isVisible() ) { return; } 
	pg.current.link=a; 

	if (getValueOf('simplePopups') && !pg.option.
		setDefault('popupStructure', 'original'); 
	} 

	var article=(nouveau Titre()).fromAnchor(a); 
	// définit la variable globale (ugh) pour contenir l'article (wikipage) 
	pg.current.article = article; 

	if (!a.navpopup) { 
		a.navpopup=newNavpopup(a, article); 
		pg.current.linksHash[a.href] = a.navpopup; 
		pg.current.links.push(a); 
	} 
	if (a.navpopup.pending === null || a.navpopup.pending !== 0) { 
		// les nouvelles fenêtres contextuelles ou celles dont les affaires sont inachevées sont refaites à partir de zéro 
		simplePopupContent(a, article); 
	} 
	a.navpopup.showSoonIfStable(a.navpopup.delay); 

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
				d.style.display = "aucun"; 
				nonsimplePopupContent(un,article); 
			} ; 
			s.innerHTML=popupString('afficher l'aperçu'); 
			setPopupHTML(d, 'popupPreview', a. navpopup.idNumber); 
		} 
	}

	if (a.navpopup.pending !== 0 ) { 
		nonsimplePopupContent(a, article); 
	} 
} 

// simplePopupContent : le contenu qui ne nécessite pas de téléchargement supplémentaire 
// (il est affiché même lorsque simplePopups est vrai) 
function simplePopupContent(a, article) { 
	/* FIXME hack */ a.navpopup.hasPopupMenu=false ; 
	a.navpopup.setInnerHTML(popupHTML(a)); 
	fillEmptySpans({navpopup:a.navpopup}); 

	if (getValueOf('popupDraggable')) 
	{ 
		var dragHandle = getValueOf('popupDragHandle') || nul; 
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
				 ' popupError', navpopup.idNumber); 
	} 
} 

function newNavpopup(a, article) { 
	var navpopup = new Navpopup(); 
	navpopup.fuzz=5; 
	navpopup.delay=getValueOf('popupDelay')*1000 ;
	navpopup.parentAnchor = a; 
	navpopup.parentPopup = (a.popData && a.popData.owner); 
	navpopup.article = article; 
	enregistrerHooks(navpopup); 
	retour navpopup; 
} 

// Doit-on montrer un contexte non simple ? 
// Si simplePopups est défini sur true, alors nous n'affichons pas le contexte non simple, 
// mais si un "afficher l'aperçu" inférieur a été cliqué, nous 
affichons la fonction de contexte non simple shouldShowNonSimple(a) { 
   return !getValueOf('simplePopups') || a.simpleNoMore; 
} 

// Devrions-nous montrer un contexte non simple régi par l'option (par exemple popupUserInfo) ? 
// Si l'utilisateur a explicitement demandé un contexte non simple en définissant l'option sur true, 
// alors nous l'affichons même en mode non simple.
function shouldShow(a,option) { 
	if (shouldShowNonSimple(a)) { 
		return getValueOf(option); 
	} else { 
		return (typeof window[option] != 'undefined' ) && window[option]; 
	} 
} 

function nonsimplePopupContent(a, article) { 
	var diff=null, history=null; 
	var params=parseParams(a.href); 
	var oldid=(typeof params.oldid=='undefined' ? null : params.oldid); 
//<NOLITE> 
	if(shouldShow(a,'popupPreviewDiffs')) { 
		diff=params.diff; 
	} 
	if(shouldShow(a,'popupPreviewHistory')) { 
		history=(params.action=='history'); 
	} 
//</NOLITE> 
	a.navpopup.pending=0;
	var referenceElement = footnoteTarget(a); 
	if (referenceElement) { 
		footnotePreview(referenceElement, a.navpopup); 
//<NOLITE> 
	} else if ( diff || diff === 0 ) { 
		loadDiff(article, oldid, diff, a.navpopup); 
	} else if ( history ) { 
		loadAPIPreview('history', article, a.navpopup); 
	} else if ( shouldShowNonSimple(a) && pg.re.contribs.test(a.href) ) { 
		loadAPIPreview('contribs', article, a.navpopup); 
	} else if ( shouldShowNonSimple(a) && pg.re.backlinks.test(a.href) ) { 
		loadAPIPreview('backlinks', article, a.navpopup); 
	} else if ( // FIXME devrait pouvoir obtenir toutes les combinaisons d'aperçu avec les options 
		article.namespaceId()==pg.nsImageId &
		( shouldShow(a,'imagePopupsForImages') || ! anchorContainsImage(a) ) 
		) { 
		loadAPIPreview('imagepagepreview', article, a.navpopup); 
		loadImage(article, a.navpopup); 
//</NOLITE> 
	} else { 
		if (article.namespaceId() == pg.nsCategoryId && 
				shouldShow(a,'popupCategoryMembers')) { 
			loadAPIPreview('category', article, a.navpopup); 
		} else if ((article.namespaceId() == pg.nsUserId || article.namespaceId() == pg.nsUsertalkId) && 
				shouldShow(a,'popupUserInfo')) { 
			loadAPIPreview('userinfo', article, a.navpopup ); 
		} 
		if (shouldShowNonSimple(a)) startArticlePreview(article, oldid, a.navpopup);

function pendingNavpopTask(navpop) { 
	if (navpop && navpop.pending === null) { navpop.pending=0; } 
	++navpop.pending; 
	debugData(navpop); 
} 

fonction terminéeNavpopTask(navpop) { 
	if (navpop && navpop.pending) { --navpop.pending; } 
	debugData(navpop); 
} 

fonction startArticlePreview(article, oldid, navpop) { 
	navpop.redir=0;
	loadPreview(article, oldid, navpop); 
} 

fonction loadPreview(article, oldid, navpop) { 
	if (!navpop.redir) { navpop.originalArticle=article; } 
	article.oldid = oldid; 
	loadAPIPreview('révision', article, navpop); 
} 

function loadPreviewFromRedir(redirMatch, navpop) { 
	// redirMatch est une correspondance regex
	var cible = new Title().fromWikiText(redirMatch[2]); 
	// écrase (ou ajoute) l'ancre de la cible d'origine 
	// mediawiki écrase ; par exemple [[User:Lupin/foo3#Done]] 
	if ( navpop.article.anchor ) { target.anchor = navpop.article.anchor; } 
	navpop.redir++; 
	navpop.redirTarget=cible; 
//<NOLITE> 
	var warnRedir = redirLink(cible, navpop.article); 
	setPopupHTML(warnRedir, 'popupWarnRedir', navpop.idNumber); 
//</NOLITE> 
	navpop.article=target; 
	fillEmptySpans({redir: true, redirTarget: target, navpopup:navpop}); 
	return loadPreview(target, null, navpop); 
} 

function insertPreview(téléchargement) { 
	if (!download.owner) { return; }

	var redirMatch = pg.re.redirect.exec(download.data); 
	if (download.owner.redir === 0 && redirMatch) { 
		loadPreviewFromRedir(redirMatch, download.owner); 
		revenir; 
	} 

	if (download.owner.visible || !getValueOf('popupLazyPreviews')) { 
		insertPreviewNow(téléchargement); 
	} else { 
		var id=(download.owner.redir) ? 'PREVIEW_REDIR_HOOK' : 'PREVIEW_HOOK' ; 
		download.owner.addHook( function(){insertPreviewNow(téléchargement); return true;}, 
					'unhide', 'after', id ); 
	} 
} 

function insertPreviewNow(téléchargement) { 
	if (!download.owner) { return; } 
	var wikiText=download.data; 
	var navpop=download.owner;
	var art=navpop.redirTarget || navpop.originalArticle; 

//<NOLITE> 
	makeFixDabs(wikiText, navpop, download.pageprops); 
	if (getValueOf('popupSummaryData')) { 
		getPageInfo(wikiText, download); 
		setPopupTrailer (getPageInfo (wikiText, téléchargement), navpop.idNumber); 
	} 

	var ImagePage=''; 
	if (art.namespaceId()==pg.nsImageId) { imagePage=art.toString(); } 
	else { imagePage=getValidImageFromWikiText(wikiText); } 
	if(pagePage) { loadImage(Title.fromWikiText(imagePage), navpop); } 
//</NOLITE> 

	if (getValueOf('popupPreviews')) { insertArticlePreview(téléchargement, art, navpop); } 

} 

fonction insertArticlePreview(téléchargement, art, navpop) {
	if (télécharger && typeof download.data == typeof ''){ 
		if (art.namespaceId()==pg.nsTemplateId && getValueOf('popupPreviewRawTemplates')) { 
			// FIXME comparer/consolider avec diff échapper le code pour wikitext 
			var h ='<hr /><span style="font-family: monospace;">' + download.data.entify().split('\\n').join('<br />\\n') + '</span>'; 
			setPopupHTML(h, 'popupPreview', navpop.idNumber); 
		} 
		else { 
			var p=prepPreviewmaker(download.data, art, navpop); 
			p.showPreview(); 
		} 
	} 
} 

function prepPreviewmaker(data, article, navpop) { 
	// traiter les ancres délicates 
	var d=anchorize(data,
	var urlBase=joinPath([pg.wiki.articlebase, article.urlString()]); 
	var p=new Previewmaker(d, urlBase, navpop); 
	retour p; 
} 


// Essayez d'imiter la façon dont mediawiki génère des ancres HTML à partir des titres de section 
function anchorize(d, anch) { 
	if (!anch) { return d; } 
	var anchRe=RegExp('(?:=+\\s*' + literalizeRegex(anch).replace(/[_ ]/g, '[_ ]') + '\\s*=+|\\{ \\{\\s*'+getValueOf('popupAnchorRegexp')+'\\s*(?:\\|[^|}]*)*?\\s*'+literalizeRegex(anch)+'\\ s*(?:\\|[^}]*)?}})'); 
	var match=d.match(anchRe); 
	if(match && match.length > 0 && match[0]) { return d.substring(d.indexOf(match[0])); } 

	// maintenant essayer de gérer == foo [[bar|baz]] boom == ->
	for (var i=0; i<lines.length; ++i) { 
		lines[i]=lines[i].replace(RegExp('[[]{2}([^|\\]]*?[ |])?(.*?)[\\]]{2}', 'g'), '$2') 
			.replace(/'''([^'])/g, '$1').replace (RegExp("''([^'])", 'g'), '$1'); 
		if (lines[i].match(anchRe)) { 
			return d.split('\n').slice(i).join('\n').replace(RegExp('^[^=]*') , ''); 
		} 
	} 
	renvoie d; 
} 

fonction killPopup() { 
	removeModifierKeyHandler(this); 
	if (getValueOf('popupShortcutKeys')) { rmPopupShortcuts(); } 
	if (!pg) { return; } 
	if (pg.current.link && pg.current.link.navpopup) { pg.current.link.navpopup.banish(); } 
	p. current.link=null ; 
	abandonnerTousTéléchargements(); 
	if (pg.timer.checkPopupPosition) {
		clearInterval(pg.timer.checkPopupPosition); 
		pg.timer.checkPopupPosition=null ; 
	} 
	renvoie vrai ; // préserve l'action par défaut 
} 
// ENDFILE : actions.js 
// STARTFILE : domdrag.js 
/** 
   @fileoverview 
   L'objet {@link Drag}, qui permet de faire glisser les objets. 

   <pré> 
   ************************************************* ** 
   dom-drag.js 
   25/09/2001 
   www.youngpup.net 
   ************************************* *************** 
   28.10.2001 - correction d'un bug mineur où les événements 
   se déclenchaient parfois sur le handle, pas sur la racine. 
   *******************************************************
   Réduit, quelques crochets ajoutés par [[User:Lupin]] 

   Copyright Aaron Boodman. 
   Dire des bêtises quotidiennement depuis mars 2001. 
   </pre> 
*/ 

/** 
   Crée un nouvel objet Drag. Ceci est utilisé pour rendre divers éléments DOM déplaçables. 
   @constructor 
*/ 
function Drag () { 
	/** 
	   Condition pour déterminer s'il faut ou non faire glisser. Cette fonction doit prendre un paramètre, un événement. 
	   Pour le désactiver, définissez-le sur <code>null</code>. 
	   @type Fonction 
	*/ 
	this.startCondition = null; 
	/** 
	   Hook à exécuter à la fin du glisser. Ceci est passé les coordonnées finales de
	   l'objet déplacé (deux entiers, x et y). Pour désactiver cela, définissez-le sur <code>null</code>. 
	   @type Function 
	*/ 
	this.endHook = null; 
} 

/** 
   Obtient un événement d'une manière multi-navigateur. 
   @param {Event} e 
   @private 
*/ 
Drag.prototype.fixE = function(e) { 
	if (typeof e == 'undefined') { e = window.event; } 
	if (typeof e.layerX == 'undefined') { e.layerX = e.offsetX; } 
	if (typeof e.layerY == 'undefined') { e.layerY = e.offsetY; } 
	renvoie e; 
} ; 
/** 
   Initialise l'instance de Drag en lui indiquant quel objet vous voulez faire glisser et par quoi vous voulez le faire glisser.
   @param {DOMElement} o Le "handle" par lequel <code>oRoot</code> est glissé. 
   @param {DOMElement} oRoot L'objet qui se déplace lorsque <code>o</code> est déplacé, ou <code>o</code> s'il est omis. 
*/ 
Drag.prototype.init = function(o, oRoot) { 
	var dragObj = this; 
	this.obj = o; 
	o.onmousedown = function(e) { dragObj.start.apply( dragObj, [e]); } ; 
	o.glissement = faux; 
	o.popups_draggable = vrai ; 
	o.hmode = vrai; 
	o.vmode = vrai; 

	o.root = oRoot ? oRacine : o ; 

	if (isNaN(parseInt(o.root.style.left, 10))) { o.root.style.left = "0px"; } 
	if (isNaN(parseInt(o.root.style.top, 10))) { o.root.style.top = "0px"; } 

	o.
	o.root.onthisEnd = function(){}; 
	o.root.onthis = function(){}; 
} ; 

/** 
   Démarre le glissement. 
   @private 
   @param {Événement} e 
*/ 
Drag.prototype.start = function(e) { 
	var o = this.obj; // = ceci; 
	e = this.fixE(e); 
	if (this.startCondition && !this.startCondition(e)) { return; } 
	var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom, 10); 
	var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right, 10); 
	o.root.onthisStart(x, y); 

	o.lastMouseX = e.clientX; 
	o.lastMouseY = e.clientY; 

	var dragObj = ceci; 
	o.onmousemoveDefault = document.onmousemove;
	o.dragging = vrai; 
	document.onmousemove = function(e) { dragObj.drag.apply( dragObj, [e] ); } ; 
	document.onmouseup = function(e) { dragObj.end.apply( dragObj, [e] ); } ; 
	renvoie faux ; 
} ; 
/** 
   Est-ce que la traînée. 
   @param {Événement} e 
   @private 
*/ 
Drag.prototype.drag = function(e) { 
	e = this.fixE(e); 
	var o = this.obj; 

	var ey	= e.clientY;
	var ex = e.clientX; 
	var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom, 10); 
	var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right, 10 ); 
	var nx, ny ; 

	nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
	ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1)); 

	this.obj.root.style[o.hmode ? "gauche" : "droite"] = nx + "px" ; 
	this.obj.root.style[o.vmode ? "haut" : "bas"] = ny + "px"; 
	this.obj.lastMouseX = ex; 
	this.obj.lastMouseY = ey; 

	this.obj.root.onthis(nx, ny); 
	renvoie faux ; 
} ; 

/** 
   Termine le glissement. 
   @private 
*/ 
Drag.prototype.end = function() { 
	document.onmousemove=this.obj.onmousemoveDefault; 
	document.onmouseup = null; 
	this.obj.dragging = false; 
	if (this.endHook) { 
		this.endHook( parseInt(this.obj.root.style[this.obj.hmode ? "left" : "right"], 10),
				  parseInt(this.obj.root.style[this.obj.vmode ? "top" : "bottom"], 10)); 
	} 
} ; 
// ENDFILE : domdrag.js 
// STARTFILE : structures.js 
//<NOLITE> 
pg.structures.original={}; 
pg.structures.original.popupLayout=function () { 
	return ['popupError', 'popupImage', 'popupTopLinks', 'popupTitle', 
		'popupUserData', 'popupData', 'popupOtherLinks', 
		'popupRedir', ['popup'WarnRed , 'popupRedirTopLinks', 
				   'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'], 
		'popupMiscTools', ['popupRedlink'], 
		'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview', 'popupFixDab'] ; 
} ;
pg.structures.original.popupRedirSpans=function () { 
	return ['popupRedir', 'popupWarnRedir', 'popupRedirTopLinks', 
		'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'] ; 
} ; 
pg.structures.original.popupTitle=function (x) { 
	log ('defaultstructure.popupTitle'); 
	if (!getValueOf('popupNavLinks')) { 
		return navlinkStringToHTML('<b><<mainlink>></b>',x.article,x.params); 
	} 
	return ''; 
} ; 
pg.structures.original.popupTopLinks=function (x) { 
	log ('defaultstructure.popupTopLinks'); 
	if (getValueOf('popupNavLinks')) { return navLinksHTML(x.article, x.hint, x.params); 
	} return ''; 
} ;
pg.structures.original.popupImage=function(x) { 
	log ('original.popupImage, x.article='+x.article+', x.navpop.idNumber='+x.navpop.idNumber); 
	return imageHTML(x.article, x.navpop.idNumber); 
} ; 
pg.structures.original.popupRedirTitle=pg.structures.original.popupTitle; 
pg.structures.original.popupRedirTopLinks=pg.structures.original.popupTopLinks ; 


function copyStructure(oldStructure, newStructure) { 
	pg.structures[newStructure]={}; 
	for (var prop dans pg.structures[oldStructure]) { 
		pg.structures[newStructure][prop]=pg.structures[oldStructure][prop] ; 
	} 
} 

copyStructure('original', 'nostalgie'); 
pg.structures.nostalgie.
	str += '<b></mainlink|shortcut= >></b>'; 

	// liens utilisateur 
	// contributions - log - count - email - block 
	// count only if applicable; bloquer uniquement si popupAdminLinks 
	str += 'if(user){<br><<contribs|shortcut=c>>'; 
	str+='if(wikimedia){*<<count|shortcut=#>>}'; 
	str+='if(ipuser){}else{*<<email|shortcut=E>>}if(admin){*<<block|shortcut=b>>}}'; 

	// édition des liens 
	// page de discussion -> edit|new - history - un|watch - article|edit 
	// other page -> edit - history - un|watch - talk|edit|new 
	var editstr='<<edit|shortcut =e>>'; 
	var editOldidStr='if(oldid){<<editOld|shortcut=e>>|<< 
		revert|shortcut=v|rv>>|<<edit|cur>>}else{' + editstr + '}' ; 
	var historystr='<<history|shortcut=h>>';
	var watchstr='<<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>>'; 

	str += '<br>if(talk){' + 
		editOldidStr+'|<<new|shortcut=+>>' + '*' + historystr+'*'+watchstr + '*' + 
		'<b><<article |shortcut=a>></b>|<<editArticle|edit>>' + 
		'}else{' + // pas une page de discussion 
		editOldidStr + '*' + historystr + '*' + watchstr + '*' + 
		'<b><<talk|shortcut=t>></b>|<<editTalk|edit>>|<<newTalk|shortcut=+|new>>}' ; 

	// liens divers 
	str += '<br><<whatLinksHere|shortcut=l>>*<<relatedChanges|shortcut=r>>'; 
	str += 'if(admin){<br>}else{*}<<move|shortcut=m>>'; 

	// liens admin 
	str += 'if(admin){*<<unprotect|unprotectShort>>|<<protect|shortcut=p>>*' +
	'<<undelete|undeleteShort>>|<<delete|shortcut=d>>}' ; 
	return navlinkStringToHTML(str, x.article, x.params); 
} ; 
pg.structures.nostalgia.popupRedirTopLinks=pg.structures.nostalgia.popupTopLinks ; 

/** -- fantaisie -- **/ 
copyStructure('original', 'fancy'); 
pg.structures.fancy.popupTitle=function (x) { 
	return navlinkStringToHTML('<font size=+0><<mainlink>></font>',x.article,x.params); 
} ; 
pg.structures.fancy.popupTopLinks=function(x) { 
	var hist='<<history|shortcut=h|hist>>|<<lastEdit|shortcut=/|last>>|<<editors|shortcut=E|eds >>'; 
	var watch='<<unwatch|unwatchShort>>|<< watch|shortcut=w|watchThingy>>'; 
	var move='<<move|shortcut=m|move>>';
	return navlinkStringToHTML('if(talk){' + 
				   '<<edit|shortcut=e>>|<<new|shortcut=+|+>>*' + hist + '*' + 
				   '<<article|shortcut=a >>|<<editArticle|edit>>' + '*' + watch + '*' + move + 
				   '}else{<<edit|shortcut=e>>*' + hist + 
				   '*<<talk|shortcut= t|>>|<<editTalk|edit>>|<<newTalk|shortcut=+|new>>' + 
				   '*' + watch + '*' + move+'}<br>', x.article, x. paramètres); 
} ; 
pg.structures.fancy.popupOtherLinks=function(x) { 
	var admin='<<unprotect|unprotectShort>>|<<protect|shortcut=p>>*<<undelete|undeleteShort>>|<< delete|shortcut=d|del>>'; 
	var user='<<contribs|shortcut=c>>if(wikimedia){|<<count|shortcut=#|#>>}'; 
	user+='if(ipuser){|<<arin>>}else{*<<email|shortcut=E|'+
	popupString('email')+'>>}if(admin){*<<block|shortcut=b>>}'; 

	var normal='<<whatLinksHere|shortcut=l|liens ici>>*<<relatedChanges|shortcut=r|related>>'; 
	return navlinkStringToHTML('<br>if(user){' + user + '*}if(admin){'+admin+'if(user){<br>}else{*}}' + normal, 
				   x.article, x.params); 
} ; 
pg.structures.fancy.popupRedirTitle=pg.structures.fancy.popupTitle; 
pg.structures.fancy.popupRedirTopLinks=pg.structures.fancy.popupTopLinks ; 
pg.structures.fancy.popupRedirOtherLinks=pg.structures.fancy.popupOtherLinks ; 


/** -- fancy2 -- **/ 
// hack pour [[User:MacGyverMagic]] 
copyStructure('fancy', 'fancy2');
pg.structures.fancy2.popupTopLinks=function(x) { // pirater le <br> à la fin et en mettre un au début 
	return '<br>'+pg.structures.fancy.popupTopLinks(x).replace( RegExp('<br>$','i'),''); 
} ; 
pg.structures.fancy2.popupLayout=function () { // déplacer les toplinks après le titre 
	return ['popupError', 'popupImage', 'popupTitle', 'popupUserData', 'popupData', 'popupTopLinks', 'popupOtherLinks', 
		'popupRedir', ['popupWarnRedir', 'popupRedirTopLinks', 'popupRedirTitle', 'popupRedirData', 'popupRedirOtherLinks'], 
		'popupMiscTools', ['popupRedlink'], 
		'popup'Preview'Sélectionner popupPreview', 'popupSecondPreview', 'popupPreviewMore', 'popupPostPreview', 'popupFixDab'] ; 
} ; 

/** -- menus -- **/
copyStructure('original', 'menus'); 
pg.structures.menus.popupLayout=function () { 
	return ['popupError', 'popupImage', 'popupTopLinks', 'popupTitle', 'popupOtherLinks', 
		'popupRedir', ['popupWarnRedir', 'popupRedirTopupRedir' , 'popupRedirData', 'popupRedirOtherLinks'], 
		'popupUserData', 'popupData', 'popupMiscTools', ['popupRedlink'], 
		'popupPrePreviewSep', 'popupPreview', 'popupSecondPreview',popupDabPlus''Aperçu ']; 
} ; 

pg.structures.menus.popupTopLinks = fonction (x, 
	plus court) { // FIXME peut-être que ce truc devrait être mis en cache 
	var s=[]; 
	var dropdiv='<div class="popup_drop">'; 
	var enddiv="</div>' ; 
	var hist='<<historique|shortcut=h>>';
	if (!shorter) { hist = '<menurow>' + hist + 
			'|<<historyfeed|rss>>|<<editors|shortcut=E>></menurow>'; } 
	var lastedit='<<lastEdit|shortcut=/|afficher la dernière édition>>'; 
	var merci='if(diff){<<merci|envoyer des remerciements>>}'; 
	var jsHistory='<<lastContrib|dernier ensemble de modifications>><<sinceMe|changes since mine>>'; 
	var linkshere='<<whatLinksHere|shortcut=l|quels liens ici>>'; 
	var related='<<relatedChanges|shortcut=r|related changes>>'; 
	var search='<menurow><<search|shortcut=s>>if(wikimedia){|<<globalsearch|shortcut=g|global>>}' + 
	'|<<google|shortcut=G|web>>< /menurow>'; 
	var watch='<menurow><<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>></menurow>'; 
	var protect='<menurow><<unprotect|unprotectShort>>|' +
	'<<protect|shortcut=p>>|<<protectlog|log>></menurow>'; 
	var del='<menurow><<undelete|undeleteShort>>|<<delete|shortcut=d>>|' + 
	'<<deletelog|log>></menurow>' ; 
	var move='<<move|shortcut=m|déplacer la page>>'; 
	var nullPurge='<menurow><<nullEdit|shortcut=n|null edit>>|<<purge|shortcut=P>></menurow>'; 
	var viewOptions='<menurow><<view|shortcut=v>>|<<render|shortcut=S>>|<<raw>></menurow>'; 
	var editRow='if(oldid){' + 
	'<menurow><<edit|shortcut=e>>|<<editOld|shortcut=e|this revision>></menurow>' 
	+ '<menurow><<revert|shortcut=v>>|<<undo>></menurow>' + '}else{<<edit|shortcut=e>>}' ; 
	var markPatrolled='if(rcid){<<markpatrolled|mark patrouillé>>}'; 
	var newTopic='if(talk){<<new|shortcut=+|new topic>>}';
	var protectDelete='if(admin){' + protect + del + '}'; 

	if (getValueOf('popupActionsMenu')) { 
		s.push( '<<mainlink>>*' + dropdiv + menuTitle('actions')); 
	} else { 
		s.push( dropdiv + '<<mainlink>>'); 
	} 
	s.push( '<menu>'); 
	s.push( editRow + markPatrolled + newTopic + hist + lastedit + thanks ); 
	if (!shorter) { s.push(jsHistory); } 
	s.push( déplacer + liensici + lié); 
	if (!shorter) { s.push(nullPurge + recherche); } 
	if (!shorter) { s.push(viewOptions); } 
	s.push('<hr />' + watch + protectDelete); 
	s.push('<hr />' + 
		   'if(talk){<<
		   'else{<<talk|shortcut=t|page de discussion>><<editTalk|edit talk>>' + 
		   '<<newTalk|shortcut=+|nouveau sujet>>}</menu>' + enddiv); 

	// le menu utilisateur commence ici 
	var email='<<email|shortcut=E|email user>>'; 
	var contribs= 'if(wikimedia){<menurow>}<<contribs|shortcut=c|contributions>>if(wikimedia){</menurow>}' + 
	'if(admin){<menurow><<deletedContribs>> </menurow>}'; 


	s.push('if(user){*' + dropdiv + menuTitle('user'));
	s.push('<menu>'); 
	s.push('<menurow><<userPage|shortcut=u|user page>>|<<userSpace|space>></menurow>'); 
	s.push('<<userTalk|shortcut=t|user talk>><< 
		   editUserTalk|edit user talk>>' + '<<newUserTalk|shortcut=+|laisser un commentaire>>'); 
	if(!shorter) { s.push( 'if(ipuser){<<arin>>}else{' + email + '}' ); }
	else { s.push( 'if(ipuser){}else{' + email + '}' ); } 
	s.push('<hr />' + contribs + '<<userlog|shortcut=L|user log>>'); 
	s.push('if(wikimedia){<<count|shortcut=#|éditer le compteur>>}'); 
	s.push('if(admin){<menurow><<unblock|unblockShort>>|<<block|shortcut=b|block user>></menurow>}'); 
	s.push('<<blocklog|shortcut=B|block log>>'); 
	s.push('</menu>' + enddiv + '}'); 

	// le menu contextuel commence ici 
	if (getValueOf('popupSetupMenu') && !x.navpop.hasPopupMenu /* FIXME: hack */) { 
		x.navpop.hasPopupMenu=true; 
		s.push('*' + dropdiv + menuTitle('popupsMenu') + '< menu>'); 
		s.push('<<togglePreviews|basculer les aperçus>>'); 
		s.push('<<purgePopups|reset>>'); 
		s.push('<<disablePopups|disable>>');
		s.push('</menu>'+enddiv); 
	} 
	return navlinkStringToHTML(s.join(''), x.article, x.params); 
} ; 

function menuTitle(s) { 
	return '<a href="#" noPopup=1>' + popupString(s) + '</a>'; 
} 

pg.structures.menus.popupRedirTitle=pg.structures.menus.popupTitle; 
pg.structures.menus.popupRedirTopLinks=pg.structures.menus.popupTopLinks ; 

copyStructure('menus', 'shortmenus'); 
pg.structures.shortmenus.popupTopLinks=function(x) { 
	return pg.structures.menus.popupTopLinks(x,true); 
} ; 
pg.structures.shortmenus.popupRedirTopLinks=pg.structures.shortmenus.popupTopLinks ; 

//</NOLITE> 
pg.structures.lite={};
	return ['popupTitle', 'popupPreview' ] ; 
} ; 
pg.structures.lite.popupTitle=function (x) { 
	log (x.article + ': structures.lite.popupTitle'); 
	//return navlinkStringToHTML('<b><<mainlink>></b>',x.article,x.params); 
	return '<div><span class="popup_mainlink"><b>' + x.article.toString() + '</b></span></div>' ; 
} ; 
// ENDFILE: structures.js 
// STARTFILE: autoedit.js 
//<NOLITE> 
function substitut(data,cmdBody) { 
	// alert('sub\nfrom: '+cmdBody.from+'\nto: '+cmdBody.to+ '\nflags: '+cmdBody.flags); 
	var fromRe=RegExp(cmdBody.from, cmdBody.flags); 
	renvoyer des données. replace(fromRe, cmdBody.to); 
} 

fonction execCmds(données, cmdList) {
	for (var i=0; i<cmdList.length; ++i) { 
		data=cmdList[i].action(data, cmdList[i]); 
	} 
	renvoie les données ; 
} 

function parseCmd(str) { 
	// renvoie une liste de commandes 
	if (!str.length) { return []; } 
	var p=faux ; 
	switch (str.charAt(0)) { 
	case 's': 
		p=parseSubstitute(str); 
		Pause; 
	par défaut : 
		renvoie faux ; 
	} 
	if (p) { return [p].concat(parseCmd(p.remainder)); } 
	renvoie faux ; 
} 

fonction unEscape(str, sep) { 
	return str.split('\\\\').join('\\').split('\\'+sep).join(sep).split('\\ n').join('\n'); 
} 


fonction parseSubstitute(str) {
	// prend une chaîne comme s/a/b/flags;othercmds et l'analyse 

	var from,to,flags,tmp; 

	if (str.length<4) { return false; } 
	var sep=str.charAt(1); 
	str=str.substring(2) ; 

	tmp=skipOver(str,sep); 
	if (tmp) { from=tmp.segment; str=tmp.reste; } 
	else { return false; } 

	tmp=skipOver(str,sep); 
	if (tmp) { to=tmp.segment; str=tmp.reste; } 
	else { return false; } 

	drapeaux=''; 
	if (str.length) { 
		tmp=skipOver(str,';') || skipToEnd(str, ';'); 
		if (tmp) {drapeaux=tmp.segment ; str=tmp.reste; } 
	} 

	return {action : substituer, de : de, à : à, drapeaux : drapeaux, reste : str} ; 

} 

fonction skipOver(str,sep) {
	var endSegment=findNext(str,sep); 
	if (endSegment<0) { return false; } 
	var segment=unEscape(str.substring(0,endSegment), sep); 
	return {segment : segment, reste : str.substring(endSegment+1)} ; 
} 

/*eslint-disable*/ 
function skipToEnd(str,sep) { 
	return {segment : str, reste : ''} ; 
} 
/*eslint-enable */ 

function findNext(str, ch) { 
	for (var i=0; i<str.length; ++i) { 
		if (str.charAt(i)=='\\') { i+=2 ; } 
		if (str.charAt(i)==ch) { return i; } 
	} 
	return -1; 
} 

fonction setCheckbox(param, box) { 
	var val=mw.util.getParamValue(param); 
	if (val) { 
		switch (val) {
		case '1' : case 'yes' : case 'true' : 
			box.checked=true ; 
			Pause; 
		case '0' : case 'no' : case 'false' : 
			box.checked=false ; 
		} 
	} 
} 

function autoEdit() { 
	setupPopups( function () { 
		if (mw.util.getParamValue('autoimpl') !== popupString('autoedit_version') ) { return false; } 
		if (mw.util.getParamValue(' autowatchlist') && mw.util.getParamValue('actoken')===autoClickToken()) { 
			pg.fn.modifyWatchlist(mw.util.getParamValue('title'), mw.util.getParamValue('action')) ; 
		} 
		if (!document.editform) { return false; } 
		if (autoEdit.alreadyRan) { return false;
		var cmdString=mw.util.getParamValue('autoedit'); 
		if (cmdString) { 
			essayez { 
				var editbox=document.editform.wpTextbox1; 
				var cmdList=parseCmd(cmdString); 
				var input=editbox.value; 
				var sortie=execCmds(entrée, cmdList); 
				editbox.value=sortie ; 
			} catch (dang) { return; } 
			// Compatibilité du script utilisateur wikEd 
			if (typeof(wikEdUseWikEd) != 'undefined') { 
				if (wikEdUseWikEd === true) { 
					WikEdUpdateFrame(); 
				} 
			} 
		} 
		setCheckbox('autominor', document.editform.wpMinoredit); 
		setCheckbox('autowatch', document.editform.wpWatchthis); 
	
		var rvid = mw.util.getParamValue('
		if (rvid) { 
			var url=pg.wiki.apiwikibase + '?action=query&format=json&formatversion=2&prop=revisions&revids='+rvid; 
			startDownload(url, null, autoEdit2) ; 
		} else { autoEdit2(); } 
	} ); 
} 

function autoEdit2(d) { 
	var summary=mw.util.getParamValue('autosummary'); 
	var summaryprompt=mw.util.getParamValue('autosummaryprompt'); 
	var summarynotice=''; 
	if (d && d.data && mw.util.getParamValue('autorv')) { 
		var s = getRvSummary(summary, d.data); 
		if (s === false) { 
			summaryprompt=true; 
			summarynotice=popupString('Impossible d'obtenir les informations de révision, veuillez les modifier manuellement.\n\n');
			résumé = simplePrintf(résumé, [mw.util.getParamValue('autorv'), '(inconnu)', '(inconnu)']); 
		} else { résumé = s; } 
	} 
	if (summaryprompt) { 
		var txt= summarynotice + 
			popupString('Entrez un résumé d'édition non vide ou appuyez sur annuler pour abandonner'); 
		var réponse=invite(txt, résumé); 
		if (réponse) { résumé=réponse ; } 
		else { retour; } 
	} 
	if (résumé) { document.editform.wpSummary.value=summary; } 
	// Tentative d'éviter un éventuel clic prématuré sur le bouton de sauvegarde 
	// (peut-être que des retards dans les mises à jour du DOM sont à blâmer ?? ou un 
	faux-fuyant ) setTimeout(autoEdit3, 100); 
} 

function autoClickToken() { 
	return mw.user.sessionId();
} 

function autoEdit3() { 
	if( mw.util.getParamValue('actoken') != autoClickToken()) { return; } 

	var btn=mw.util.getParamValue('autoclick');
	if (btn) { 
		if (document.editform && document.editform[btn]) { 
			var button=document.editform[btn]; 
			var msg=tprintf('Le bouton %s a été cliqué automatiquement. Veuillez attendre le chargement de la page suivante.', 
					[ button.value ]); 
			bannerMessage(msg); 
			document.title='('+document.title+')'; 
			bouton.click(); 
		} else { 
			alert(tprintf('Impossible de trouver le bouton %s. Veuillez vérifier les paramètres dans votre fichier javascript.', 
					  [ btn ])); 
		} 
	} 
} 

fonction bannerMessage(s) {
	var headers=document.getElementsByTagName('h1'); 
	if (titres) { 
		var div=document.createElement('div'); 
		div.innerHTML='<font size=+1><b>' + s + '</b></font>'; 
		titres[0].parentNode.insertBefore(div, titres[0]); 
	} 
} 

function getRvSummary(template, json) { 
	try { 
		var o=getJsObj(json); 
		var edit = anyChild(o.query.pages).revisions[0]; 
		var timestamp = edit.timestamp.split(/[AZ]/g).join(' ').replace(/^ *| *$/g, ''); 
		return simplePrintf(template, [edit.revid, timestamp, edit.userhidden ? '(hidden)' : edit.user ]); 
	} catch (mal) { 
		return false;

// STARTFILE : downloader.js 
/** 
   @fileoverview 
   {@link Downloader}, wrapper ax mlhttprequest et fonctions d'assistance. 
*/ 

/** 
   Crée un nouveau Downloader 
   @constructor 
   @class La classe Downloader. Créez une nouvelle instance de cette classe pour télécharger des éléments. 
   @param {String} url L'url à télécharger. Cela peut être omis et fourni plus tard. 
*/ 
function Downloader(url) { 
	if (typeof XMLHttpRequest!='undefined') { this.http = new XMLHttpRequest(); } 
	/** 
		L'url à télécharger 
		@type String 
	*/ 
	this.url = url; 
	/** 
		Un numéro d'identification universellement unique 
		@type entier
	*/ 
	this.id=null; 
	/** 
		Date de modification, à 
		extraire des en- têtes entrants @type Date 
		@private 
	*/ 
	this.lastModified = null; 
	/** 
		Que faire lorsque le téléchargement se termine avec succès 
		@type Function 
		@private 
	*/ 
	this.callbackFunction = null; 
	/** 
		Que faire en cas d'échec 
		@type Function 
		@private 
	*/ 
	this.onFailure = null; 
	/** 
		Indicateur défini sur <code>abort</code> 
		@type boolean 
	*/ 
	this.aborted = false; 
	/**
	   Méthode HTTP. Voir https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html pour les possibilités. 
	   @type String 
	*/ 
	this.method='GET'; 
	/** 
		Indicateur asynchrone. 
		@type booléen 
	*/ 
	this.async=true; 
} 

nouveau téléchargeur(); 

/** Soumet la requête http. */ 
Downloader.prototype.send = function (x) { 
	if (!this.http) { return null; } 
	renvoie this.http.send(x); 
} ; 
/** Abandonne le téléchargement, en définissant le champ <code>aborted</code> sur true. */ 
Downloader.prototype.abort = function () { 
	if (!this.http) { return null; } 
	this.aborted=true; 
	renvoie this.http.abort(); 
} ;
/** Renvoie les données téléchargées. */ 
Downloader.prototype.getData = function () {if (!this.http) { return null; } return this.http.responseText;}; 
/** Prépare le téléchargement. */ 
Downloader.prototype.setTarget = function () { 
	if (!this.http) { return null; } 
	this.http.open(this.method, this.url, this.async); 
	this.http.setRequestHeader( 'Api-User-Agent', pg.misc.userAgent ); 
} ; 
/** Obtient l'état du téléchargement. */ 
Downloader.prototype.getReadyState=function () {if (!this.http) { return null; } renvoie this.http.readyState;}; 

pg.misc.downloadsInProgress = { }; 

/** Démarre le téléchargement. 
	Notez que setTarget {@link Downloader#setTarget} doit être exécuté en premier 
*/
Downloader.prototype.start=function () { 
	if (!this.http) { return; } 
	pg.misc.downloadsInProgress[this.id] = ceci ; 
	this.http.send(null); 
} ; 

/** Obtient la date de "Dernière modification" à partir des en-têtes de téléchargement. 
	Doit être exécuté une fois le téléchargement terminé. 
	Renvoie <code>null</code> en cas d'échec. 
	@return {Date} 
*/ 
Downloader.prototype.getLastModifiedDate=function () { 
	if(!this.http) { return null; } 
	var lastmod=null; 
	essayez { 
		lastmod=this.http.getResponseHeader('Last-Modified'); 
	} catch (err) {} 
	if (lastmod) { return new Date(lastmod); } 
	renvoie null ; 
} ; 

/** Définit la fonction de rappel.
	@param {Function} f fonction de rappel, appelée <code>f(this)</code> en cas de succès 
*/ 
Downloader.prototype.setCallback = function (f) { 
	if(!this.http) { return; } 
	this.http.onreadystatechange = f; 
} ; 

Downloader.prototype.getStatus = function() { if (!this.http) { return null; } renvoie this.http.status; } ; 

////////////////////////////////////////////////////////////// 
// Fonctions d'assistance 

/** Crée un nouveau {@link Downloader} et le prépare pour l'action. 
	@param {String} url L'url à télécharger 
	@param {integer} id L'ID de l'objet {@link Downloader} 
	@param {Function} callback La fonction de rappel invoquée en cas de succès
	@return {String/Downloader} l'objet {@link Downloader} créé, ou 'ohdear' si un navigateur non pris en charge 
*/ 
function newDownload(url, id, callback, onfailure) { 
	var d=new Downloader(url); 
	if (!d.http) { return 'ohdear'; } 
	d.id=id; 
	d.setCible(); 
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
					rappel(d); 
				} else if (typeof onfailure == typeof 1) { 
					if (onfailure > 0) {
						// réessayez 
						newDownload (url, id, callback, onfailure - 1); 
					} 
				} else if ($.isFunction(onfailure)) { 
					onfailure(d,url,id,callback); 
				} 
			} catch (somerr) { /* l'ignore */ } 
		} 
	}; 
	d.setCallback(f); 
	retour d; 
} 
/** Simule un téléchargement à partir de données mises en cache. 
	Les données fournies sont placées dans un {@link Downloader} comme s'il les avait téléchargées. 
	@param {String} url L'url. 
	@param {integer} id L'identifiant. 
	@param {Function} callback Le rappel, qui est appelé immédiatement en tant que <code>callback(d)</code>, 
	où <code>d</code> est le nouveau {@link Downloader}.
	@param {String} data Les données (mises en cache). 
	@param {Date} lastModified La date (mise en cache) de la dernière modification. 
*/ 
function fakeDownload(url, id, callback, data, lastModified, owner) { 
	var d=newDownload(url,callback); 
	d.propriétaire=propriétaire ; 
	d.id=id; d.données=données ; 
	d.lastModified=lastModified ; 
	retour de rappel(d); 
} 

/** 
   Démarre un téléchargement. 
   @param {String} url L'url à télécharger 
   @param {integer} id L'ID de l'objet {@link Downloader} 
   @param {Function} callback La fonction de rappel invoquée en cas de succès 
   @return {String/Downloader} le {@link Downloader } objet créé, ou 'ohdear' si navigateur non pris en charge 
*/
function startDownload(url, id, callback) { 
	var d=newDownload(url, id, callback); 
	if (typeof d == typeof '' ) { return d; } 
	d.start(); 
	retour d; 
} 

/** 
   Abandonne tous les téléchargements qui ont été lancés. 
*/ 
function abortAllDownloads() { 
	for ( var x in pg.misc.downloadsInProgress ) { 
		try { 
			pg.misc.downloadsInProgress[x].aborted=true; 
			pg.misc.downloadsInProgress[x].abort(); 
			supprimer pg.misc.downloadsInProgress[x] ; 
		} catch (e) {} 
	} 
} 
// ENDFILE : downloader.js 
// STARTFILE : livepreview.js 
// TODO : l'emplacement n'est souvent pas correct (par exemple, les liens relatifs dans les aperçus)
// REMARQUE : suppression de md5 et de l'analyse d'images et de mathématiques. était cassé, beaucoup d'octets. 
/** 
 * InstaView - un convertisseur Mediawiki vers HTML en JavaScript 
 * Version 0.6.1 
 * Copyright (C) Pedro Fayolle 2005-2006 
 * https://en.wikipedia.org/wiki/User:Pilaf 
 * Distribué sous licence BSD 
 * 
 * 
 Journal des modifications : 
 * * 0.6.1 
 * - Correction d'un problème causé par les caractères \r 
 * - Analyseur de mise en forme en ligne amélioré 
 * 
 * 0.6 
 * - Nom modifié en InstaView 
 * - Certaines réorganisations majeures du code et factorisé certaines fonctions communes 
 * - Conversion gérée de liens relatifs (c'est-à-dire [[/foo]])
 * - Correction d'un rendu incorrect des éléments de liste de définition adjacents 
 * - Correction d'un bug dans la gestion des en-têtes de tableau * - Modification du 
 format de date dans les signatures pour refléter celle de Mediawiki 
 * - Correction de la gestion de [[:Image:...]] 
 * - Fonction MD5 mise à jour (espérons-le fonctionnera avec UTF-8) 
 * - Correction d'un bug dans la gestion des liens à l'intérieur des images 
 * 
 * À faire : 
 * - Meilleure prise en charge des balises mathématiques 
 * - Prise en charge complète de <nowiki> 
 * - Basé sur l'analyseur (par opposition à RegExp) gestion du wikicode en ligne (en un seul passage et à l'épreuve des balles) 
 * - Prise en charge des modèles (via AJAX) 
 * - Prise en charge des liens colorés (AJAX) 
 */ 


var Insta = {}; 

fonction setupLivePreview() {

	// options 
	Insta.conf = 
	{ 
		baseUrl : '', 

		utilisateur : {}, 

		wiki : { 
		lang : pg.wiki.lang, 
		interwiki : pg.wiki.interwiki, 
		default_thumb_width : 180 
		}, 

		chemins : { 
		articles : pg.wiki .articlePath + '/', 
		// Uniquement utilisé pour les aperçus Insta avec des images. (pas dans les popups) 
		math : '/math/', 
		images : '//upload.wikimedia.org/wikipedia/en/', // FIXME getImageUrlStart(pg.wiki.hostname), 
		images_fallback : '//upload.wikimedia .org/wikipedia/commons/', 
		}, 

		locale : { 
		utilisateur : mw.config.get('wgFormattedNamespaces')[pg.nsUserId], 
		image : mw.config.get('wgFormattedNamespaces')[pg.
		catégorie : mw.config.get('wgFormattedNamespaces')[pg.nsCategoryId], 
		// ne devrait pas être utilisé dans les aperçus contextuels, je pense que les 
		mois : ['Jan','Feb','Mar','Apr', 'Mai','Juin','Jul','Août','Sep','Oct','Nov','Déc'] 
		} 
	} ; 

	// options avec des valeurs par défaut ou des références 
	arrière Insta.conf.user.name = Insta.conf.user.name || « Wikipédien » ; 
	Insta.conf.user.signature = '[['+Insta.conf.locale.user+':'+Insta.conf.user.name+'|'+Insta.conf.user.name+']]'; 
	//Insta.conf.paths.images = '//upload.wikimedia.org/wikipedia/' + Insta.conf.wiki.lang + '/'; 

	// définit les constantes 
	Insta.
        '):.*?\\|.*?(?:frame|thumbnail|thumb|aucun|right|left|center)', 'i'); 

} 


Insta.dump = function(from, to) 
{ 
	if (typeof from == 'string') { from = document.getElementById(from); } 
	if (typeof to == 'string') { to = document.getElementById(to); } 
	to.innerHTML = this.convert(from.value); 
} ; 

Insta.convert = function(wiki) 
{ 
	var ll = (typeof wiki == 'string') ? wiki.replace(/\r/g,'').split(/\n/): wiki, // lignes de wikicode 
		o = '', // sortie 
		p = 0, // para flag 
		$r; // résultat de la transmission d'une expression rationnelle à $() 

	// quelques raccourcis 
	function restent() { return ll.length; } 
	fonction sh() { renvoie ll. décalage(); } // décalage
	fonction ps(s) { o += s; } // push 

	// similaire à printf de C, utilise ? comme espaces réservés, ?? pour échapper aux points d'interrogation 
	function f() 
	{ 
		var i=1, a=arguments, f=a[0], o='', c, p; 
		for (; i<a.length; i++) { 
			if ((p=f.indexOf('?'))+1) { 
				// autorise l'échappement des caractères 
				i -= c = f.charAt(p+1)== '?' ? dix; 
				o += f.substring(0,p) + (c ? '?' : a[i]); 
				f = f.substr(p+1+c); 
			} else { pause; } 
		} 
		renvoie o+f; 
	} 

	function html_entities(s) { 
		return s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">");
	
	// Les fonctions ci-dessous n'échappent délibérément pas à l'esperluette car cela rendrait les choses plus difficiles, 
	// et nous n'en avons pas absolument besoin pour savoir comment nous en avons besoin. 
	// Cela signifie que toute esperluette sans échappement dans le texte wiki restera sans échappement et peut provoquer un code HTML invalide. 
	// Les navigateurs devraient tous être capables de le gérer. 
	// Nous échappons également les caractères wikimarkup significatifs pour empêcher une correspondance supplémentaire sur le texte traité 
	function htmlescape_text(s) { 
		return s.replace(/</g,"<").replace(/>/g,">") .replace(/:/g,":").replace(/\[/g,"[").replace(/]/g,"]"); 
	} 
	function htmlescape_attr(s) { 
		return htmlescape_text(s).replace(/'/g,"& #39;").replace(/"/g,"""); 
	}

	// renvoie la première position de caractère non correspondante entre deux chaînes 
	function str_imatch(a, b) 
	{ 
		for (var i=0, l=Math.min(a.length, b.length); i<l; i++) { 
			if (a.charAt(i)!=b.charAt(i)) { pause ; } 
		} 
		renvoie i; 
	} 

	// comparer la ligne actuelle à une chaîne ou à une expression rationnelle 
	// si une chaîne est passée, elle comparera uniquement les premiers caractères de chaîne.longueur 
	// si une expression rationnelle est passée, le résultat est stocké dans $r 
	function $(c) { return (typeof c == 'chaîne') ? (ll[0].substr(0,c.length)==c) : ($r = ll[0].match(c)); } 

	fonction $$(c) { return ll[0]==c; } // comparer la ligne actuelle à une chaîne 
	function _(p) { return ll[0].charAt(p); } // renvoie le caractère à la position p

	fonction endl(s) { ps(s); sh(); } 

	fonction parse_list() 
	{ 
		var prev=''; 

		while (remain() && $(/^([*#:;]+)(.*)$/)) { 

			var l_match = $r; 

			sh(); 

			var ipos = str_imatch(prev, l_match[1]); 

			// ferme les listes non continues 
			pour (var prevPos=prev.length-1; prevPos >= ipos; prevPos--) { 

				var pi = prev.charAt(prevPos); 

				if (pi=='*') { ps('</ul>'); } 
				else if (pi=='#') { ps('</ol>'); } 
				// ferme un dl uniquement si le nouvel élément n'est pas un élément dl (:, ; ou vide) 
				else if($.inArray(l_match[1].charAt(prevPos), ['','*','# '])) { ps('</dl>');

			for (var matchPos=ipos; matchPos<l_match[1].length; matchPos++) { 

				var li = l_match[1].charAt(matchPos); 

				if (li=='*') { ps('<ul>'); } 
				else if (li=='#') { ps('<ol>'); } 
				// ouvre un nouveau dl uniquement si l'élément précédent n'est pas un élément dl (:, ; ou vide) 
				sinon si ($.inArray(prev.charAt(matchPos), ['','*','#'] )) { ps('<dl>'); } 
			} 

			switch (l_match[1].charAt(l_match[1].length-1)) { 

				case '*': case '#': 
					ps('<li>' + parse_inline_nowiki(l_match[2])); 
					Pause; 

				case ';': 
					ps('<dt>'); 

					var dt_match = l_match[2].match(/(.*?)(:.*?)$/);

						ps(parse_inline_nowiki(dt_match[1])); 
						ll.unshift(dt_match[2]); 

					} else ps(parse_inline_nowiki(l_match[2])); 
					Pause; 

				case ':': 
					ps('<dd>' + parse_inline_nowiki(l_match[2])); 
			} 

			prev=l_match[1]; 
		} 

		// ferme les listes restantes 
		pour (var i=prev.length-1; i>=0; i--) { 
			ps(f('</?>', (prev.charAt(i)=='*' )? 'ul': ((prev.charAt(i)=='#')? 'ol': 'dl'))); 
		} 
	} 

	function parse_table() 
	{ 
		endl(f('<table>', $(/^\{\|( .*)$/)? $r[1]: '')); 

		for (;remain ();) if ($('|')) switch (_(1)) { 
			case '}' : 
				endl('</table>'); 
				revenir; 
			Cas '-':
				endl(f('<tr>', $(/\|-*(.*)/)[1])); 
				Pause; 
			par défaut : 
				parse_table_data(); 
		} 
		else if ($('!')) { parse_table_data(); } 
		else { sh(); } 
	} 

	fonction parse_table_data() 
	{ 
		var td_line, match_i; 

		// 1: "|+", '|' ou '+' 
		// 2: ?? 
		// 3: attributs ?? 
		// A FAIRE : terminer de commenter cette expression rationnelle 
		var td_match = sh().match(/^(\|\+|\||!)((?:([^[|]*?)\|(?!\| ))?(.*))$/); 

		if (td_match[1] == '|+') ps('<légende'); 
		else ps('<t' + ((td_match[1]=='|')?'d':'h')); 

		if (typeof td_match[3] != 'undefined'


		} sinon match_i = 2; 

		ps('>'); 

		if (td_match[1] != '|+') { 

			// use || or !! as a cell separator depending on context
			// REMARQUE : lorsque split() est passé une expression rationnelle, assurez-vous d'utiliser des crochets non capturants 
			td_line = td_match[match_i].split((td_match[1] == '|')? '||': /(?:\|\||!!)/); 

			ps(parse_inline_nowiki(td_line.shift())); 

			while (td_line.length) ll.unshift(td_match[1] + td_line.pop()); 

		} else ps(td_match[match_i]); 

		var tc = 0, td = [] ; 

		while (reste()) { 
			td.push(sh()); 
			if ($('|')) { 
				if (!tc) break; // nous sommes au niveau le plus externe (pas de tables imbriquées), passez à td parse 
				else if (_(1)=='}') tc--; 
			} 
			else if (!tc && $('!')) break;
		} 

		if (td.length) ps(Insta.convert(td)); 
	} 

	function parse_pre() 
	{ 
		ps('<pre>'); 
		do { 
			endl(parse_inline_nowiki(ll[0].substring(1)) + "\n"); 
		} while (reste() && $(' ')); 
		ps('</pre>'); 
	} 

	fonction parse_block_image() 
	{ 
		ps(parse_image(sh())); 
	} 

	function parse_image(str) 
	{ 
//<NOLITE> 
		// obtenir ce qui se trouve entre "[[Image:" et "]]" 
		var tag = str.substring(str.indexOf(':') + 1, str.length - 2) ; 
		/* eslint-disable no-unused-vars */ 
		var width; 
		var attr = [], nom de fichier, légende = ''; 
		var thumb=0, frame=0, center=0;
		var align=''; 
		/* eslint-enable no-unused-vars */ 

		if (tag.match(/\|/)) { 
			// gérer les liens imbriqués 
			var nesting = 0; 
			var last_attr; 
			for (var i = tag.length-1; i > 0; i--) { 
				if (tag.charAt(i) == '|' && !nesting) { 
					last_attr = tag.substr(i+1); 
					tag = tag.substring(0, i); 
					Pause; 
				} else switch (tag.substr(i-1, 2)) { 
					case ']]': 
						nesting++; 
						je--; 
						Pause; 
					case '[[': 
						imbrication--; 
						je--; 
				} 
			} 

			attr = tag.split(/\s*\|\s*/); 
			attr.push(last_attr); 
			nom de fichier = attr.

			var w_match ; 

			for (;attr.length; attr.shift()) { 
				w_match = attr[0].match(/^(\d*)(?:[px]*\d*)?px$/); 
				if (w_match) largeur = w_match[1] ; 
				else switch(attr[0]) { 
					case 'thumb': 
					case 'thumbnail': 
						thumb=true; 
						frame=true ; 
						Pause; 
					cas 'frame' : 
						frame=true ; 
						Pause; 
					case 'aucun' : 
					case 'right' : 
					case 'left' : 
						center=false ; 
						aligner=attr[0]; 
						Pause; 
					cas « centre » :
						centre=vrai ; 
						align='aucun'; 
						Pause; 
					défaut:
						if (attr.length == 1) caption = attr[0]; 
			} 
		} 

		} else filename = tag; 

		revenir ''; 
//</NOLITE> 
	} 

	function parse_inline_nowiki(str) 
	{ 
		var start, lastend=0; 
		var substart=0, nestlev=0, ouvrir, fermer, sous-boucle ; 
		var html=''; 

		while (-1 != (start = str.indexOf('<nowiki>', substart))) { 
			html += parse_inline_wiki(str.substring(lastend, start)); 
			début += 8 ; 
			sous-départ = début ; 
			sous-boucle = vrai ; 
			do { 
				open = str.indexOf('<nowiki>', substart); 
				close = str.indexOf('</nowiki>', substart); 
				si (fermer< =ouvrir || 
					ouvrir==-1) { si (fermer==-1) {
						return html + html_entities(str.substr(start)); 
					} sous- 
					début = fermer+9; 
					if (nestlev) { 
						nestlev--; 
					} else { 
						lastend = substart; 
						html += html_entities(str.substring(start, lastend-9)); 
						sous-boucle = faux ; 
					} 
				} else { 
					substart = open+8; 
					nestlev++; 
				} 
			} while (sous-boucle); 
		} 

		return html + parse_inline_wiki(str.substr(lastend)); 
	} 

	function parse_inline_images(str) 
	{ 
//<NOLITE> 
		var start, substart=0, nestlev=0; 
		boucle var, fermer, ouvrir, wiki, html;

		while (-1 != (start=str.indexOf('[[', substart))) { 
			if(str.substr(start+2).match(RegExp('^(Image|File|' + Insta.conf .locale.image + '):','i'))) { 
				loop=true; 
				sous-départ=début ; 
				do { 
					substart+=2; 
					close=str.indexOf(']]',substart);
					open=str.indexOf('[[',substart);
					if (close<=open||open==-1) { 
						if (close==-1) return str; 
						sous-départ=fermer ; 
						if (nestlev) { 
							nestlev--; 
						} else { 
							wiki=str.substring(start,close+2); 
							html=parse_image(wiki); 
							str=str.replace(wiki,html); 
							sous-départ=début+html.longueur ; 
							boucle=faux ; 
						} 
					} else { 
						substart=open; 
						nestlev++;
					} 
				} while (boucle); 

			} sinon pause ; 
		} 

//</NOLITE> 
		return str; 
	} 

	// la sortie de cette fonction ne respecte pas la structure FILO de HTML 
	// mais comme la plupart des navigateurs peuvent la gérer, je 
	m'épargnerai les tracas de la fonction parse_inline_formatting(str) 
	{ 
		var em,st,i,li,o= ''; 
		while ((i=str.indexOf("''",li))+1) { 
			o += str.substring(li,i); 
			li=i+2; 
			if (str.charAt(i+2)=="'") { 
				li++; 
				st=!st; 
				o+=st?'<strong>':'</strong>'; 
			} else { 
				em=!em; 
				o+=em?'<em>':'</em> '; 
			} 
		}
		renvoie o+str.substr(li); 
	} 

	fonction parse_inline_wiki(str) 
	{ 
		str = parse_inline_images(str); 
		str = parse_inline_formatting(str); 

		// math 
		str = str.replace(/<(?:)math>(.*?)<\/math>/ig, ''); 

		// Construire une chaîne de date au format Mediawiki 
		var date = new Date(); 
		var minutes = date.getUTCMinutes(); 
		si (minutes < 10) minutes = '0' + minutes ; 
		date = f("?:?, ? ? ? (UTC)", date.getUTCHours(), minutes, date.getUTCDate(), Insta.conf.locale.months[date.getUTCMonth()], date.getUTCFullYear( )); 

		// le formatage du texte 
		renvoie str. 
			// les signatures 
			remplacent(/~{5}(?!~)/g, date).
			replace(/~{4}(?!~)/g, Insta.conf.user.name+' '+date). 
			replace(/~{3}(?!~)/g, Insta.conf.user.name). 

			// [[:Category:...]], [[:Image:...]], etc... 
			replace(RegExp('\\[\\[:((?:'+Insta.conf. locale.category+'|Image|Fichier|'+Insta.conf.locale.image+'|'+Insta.conf.wiki.interwiki+'):[^|]*?)\\]\\](\\w* )','gi'), function($0,$1,$2){return f("<a href='?'>?</a>", Insta.conf.paths.articles + htmlescape_attr($1), htmlescape_text ($1) + htmlescape_text($2));}). 
			// supprime la catégorie directe et les balises interwiki 
			replace(RegExp('\\[\\[(?:'+Insta.conf.locale.category+'|'+Insta.conf.wiki.interwiki+'):.*?\\ ]\\]','gi'),''). 

			// [[:Catégorie:...|Liens]], [[:Image:...
			replace(RegExp('\\[\\[:((?:'+Insta.conf.locale.category+'|Image|Fichier|'+Insta.conf.locale.image+'|'+Insta.conf.wiki. interwiki+'):.*?)\\|([^\\]]+?)\\]\\](\\w*)','gi'), fonction($0,$1,$2,$3) {return f("<a href='?'>?</a>", Insta.conf.paths.articles + htmlescape_attr($1), htmlescape_text($2) + htmlescape_text($3));}). 

			// [[/Liens relatifs]] 
			replace(/\[\[(\/[^|]*?)\]\]/g, function($0,$1){return f("<a href='? '>?</a>", Insta.conf.baseUrl + htmlescape_attr($1), htmlescape_text($1)); }). 

			// [[/Remplacé|Liens relatifs]] 
			replace(/\[\[(\/.*?)\|(.+?)\]\]/g, function($0,$1,$2){return f ("<a href='?'>?</a>", Insta.conf.baseUrl + htmlescape_attr($1), htmlescape_text($2)); }). 

			// [[Liens communs]]
			replace(/\[\[([^[|]*?)\]\](\w*)/g, function($0,$1,$2){return f("<a href='?'>? </a>", Insta.conf.paths.articles + htmlescape_attr($1), htmlescape_text($1) + htmlescape_text($2)); }). 

			// [[Remplacé|Liens]] 
			remplace(/\[\[([^[]*?)\|([^\]]+?)\]\](\w*)/g, fonction($0 ,$1,$2,$3){return f("<a href='?'>?</a>", Insta.conf.paths.articles + htmlescape_attr($1), htmlescape_text($2) + htmlescape_text($3)) ; }). 

			// [[Stripped:Namespace|Namespace]] 
			replace(/\[\[([^\]]*?:)?(.*?)( *\(.*?\))?\|\]\ ]/g, function($0,$1,$2,$3){return f("<a href='?'>?</a>", Insta.conf.paths.articles + htmlescape_attr($1) + htmlescape_attr($2 ) + htmlescape_attr($3), htmlescape_text($2)); }). 

			// Liens externes
			remplacer(/\[(https?|news|ftp|mailto|gopher|irc):(\/*)([^\]]*?) (.*?)\]/g, fonction($0,$1, $2,$3,$4){return f("<a class='external' href='?:?'>?</a>", htmlescape_attr($1), htmlescape_attr($2) + htmlescape_attr($3), htmlescape_text( 4 $) ); }). 
			replace(/\[http:\/\/(.*?)\]/g, function($0,$1){return f("<a class='external' href='http://?'>[ #]</a>", htmlescape_attr($1)); }). 
			replace(/\[(news|ftp|mailto|gopher|irc):(\/*)(.*?)\]/g, function($0,$1,$2,$3){return f("<une classe ='external' href='?:?'>?:?</a>", htmlescape_attr($1), htmlescape_attr($2) + htmlescape_attr($3), htmlescape_text($1), htmlescape_text($2) + htmlescape_text($3) ); }).
			replace(/(^| )(https?|news|ftp|mailto|gopher|irc):(\/*)([^ $]*[^.,!?;: $])/g, function($0 ,$1,$2,$3,$4){return f("?<a class='external' href='?:?'>?:?</a>", htmlescape_text($1), htmlescape_attr($2), htmlescape_attr (3$) + htmlescape_attr($4), htmlescape_text($2), htmlescape_text($3) + htmlescape_text($4)); }). 

			replace('__NOTOC__',''). 
			replace('__NOEDSECTION__',''); 
	} 

	// commencer l'analyse 
	pour (;remain();) if ($(/^(={1,6})(.*)\1(.*)$/)) { 
		p=0; 
		endl(f('<h?>?</h?>?', $r[1].length, parse_inline_nowiki($r[2]), $r[1].length, $r[3])) ; 

	} else if ($(/^[*#:;]/)) { 
		p=0; 
		parse_list(); 

	} else if ($(' ' 
		)) { p=0; 
		parse_pre(); 

	} else if ($('{|')) {
		p=0 ; 
		parse_table(); 

	} else if ($(/^----+$/)) { 
		p=0; 
		endl('<hr />'); 

	} else if ($(Insta.BLOCK_IMAGE)) { 
		p=0; 
		parse_block_image(); 

	} else { 

		// gère les paragraphes 
		if ($$('')) { 
			p = (remain()>1 && ll[1]===('')); 
			if (p) endl('<p><br>'); 
		} else { 
			if(!p) { 
				ps('<p>'); 
				p=1 ; 
			} 
			ps(parse_inline_nowiki(ll[0]) + ' '); 
		} 

		sh(); 
	} 

	retour o; 
} ; 

fonction wiki2html(txt,baseurl) { 
	Insta.conf.baseUrl=baseurl; 
	retourner Insta. convertir(txt); 
}
// ENDFILE: livepreview.js 
// STARTFILE: pageinfo.js 
//<NOLITE> 
function popupFilterPageSize(data) { 
	return formatBytes(data.length); 
} 

function popupFilterCountLinks(data) { 
	var num=countLinks(data); 
	return String(num) + ' ' + ((num!=1)?popupString('wikiLinks'):popupString('wikiLink')); 
} 

function popupFilterCountImages(data) { 
	var num=countImages(data); 
	return String(num) + ' ' + ((num!=1)?popupString('images'):popupString('image')); 
} 

function popupFilterCountCategories(data) { 
	var num=countCategories(data); 
	return String(num) + ' ' + ((num!=1)?popupString('
} 


function popupFilterLastModified(data,download) { 
	var lastmod=download.lastModified; 
	var maintenant=nouvelle date(); 
	var age=now-lastmod; 
	if (lastmod && getValueOf('popupLastModified')) { 
		return (tprintf('%s old', [formatAge(age)])).replace(RegExp(' ','g'), ' '); 
	} 
	return ''; 
} 

function formatAge(age) { 
	// forcer en un nombre 
	var a=0+age, aa=a; 

	var seclen = 1000 ; 
	var minlen = 60*seclen; 
	var hourlen = 60*minlen; 
	var daylen = 24*hourlen; 
	var weeklen = 7*daylen; 

	var numweeks = (aa%weeklen)/weeklen ; a = a-numweeks*weeklen; var sweeks = addunit(numweeks, '
	var numdays = (aa%daylen)/daylen ; a = a-nombre de jours*jourlen ; var sdays = addunit(nombre de jours, 'jour'); 
	var numhours = (aa%hourlen)/hourlen ; a = a-nombre d'heures*heurelen ; var shours = addunit(nombre d'heures,'heure'); 
	var nummins = (aa%minlen)/minlen; a = a-nummins*minlen; var smins = addunit(nummins, 'minute'); 
	var numsecs = (aa%seclen)/seclen; a = a-numsecs*seclen; var ssecs = addunit(numsecs, 'second'); 

	if (aa > 4*weeklen) { return sweeks; } 
	if (aa > weeklen) { return sweeks + ' ' + sdays; } 
	if (aa > daylen) { return sdays + ' ' + shours; } 
	if (aa > 6*hourlen) { return shours; } 
	if (aa > hourlen) { return shours + ' ' + smins; } 
	si (aa > 10*minlen) { retourne smins; }
	if (aa > minlen) { return smins + ' ' + ssecs; } 
	renvoie les ssecs ; 
} 

function addunit(num,str) { return '' + num + ' ' + ((num!=1) ? popupString(str+'s') : popupString(str)) ;} 

function runPopupFilters(list, data, download) { 
	var ret=[]; 
	for (var i=0; i<list.length; ++i) { 
		if (list[i] && typeof list[i] == 'function') { 
			var s=list[i](data, download, download .propriétaire.article); 
			if (s) { ret.push(s); } 
		} 
	} 
	retourne ret; 
} 

function getPageInfo(data, download) { 
	if (!data || data.length === 0) { return popupString('Page vide'); } 

	var popupFilters=getValueOf('popupFilters') || [] ;
	var extraPopupFilters = getValueOf('extraPopupFilters') || [] ; 
	var pageInfoArray = runPopupFilters(popupFilters.concat(extraPopupFilters), données, téléchargement); 

	var pageInfo=pageInfoArray.join(', '); 
	if (pageInfo !== '' ) { pageInfo = upcaseFirst(pageInfo); } 
	return pageInfo; 
} 


// cela pourrait être amélioré ! 
function countLinks(wikiText) { return wikiText.split('[[').length - 1; } 

// si N = # correspond, n = # parenthèses, alors 
// String.parenSplit(regex) entremêle les N+1 éléments fractionnés 
// avec Nn autres éléments. La longueur totale est donc 
// L= N+1 + Nn = N(n+1)+1. Donc N=(L-1)/(n+1). 

fonction countImages(wikiText) {
	return (wikiText.parenSplit(pg.re.image).length - 1) / (pg.re.imageBracketCount + 1); 
} 

function countCategories(wikiText) { 
	return (wikiText.parenSplit(pg.re.category).length - 1) / (pg.re.categoryBracketCount + 1); 
} 

function popupFilterStubDetect(data, download, article) { 
	var counts=stubCount(data, article); 
	if (counts.real) { return popupString('stub'); } 
	if (counts.sect) { return popupString('section stub'); } 
	return ''; 
} 

function popupFilterDisambigDetect(data, download, article) { 
	if (!getValueOf('popupAllDabsStubs') && article.namespace()) { return ''; } 
	return (isDisambig(data, article, download.pageprops)) ? popupString('
} 

fonction formatBytes(num) { 
	return (num > 949) ? (Math.round(num/100)/10+popupString('kB')) : (num +' ' + popupString('bytes')) ; 
} 
//</NOLITE> 
// ENDFILE : pageinfo.js 
// STARTFILE : titles.js 
/** 
   @fileoverview Définit la classe {@link Title} et les fonctions grossières associées. 

   <code>Title</code> traite des titres d'articles et de leurs différentes 
   formes. {@link Stringwrapper} est la classe parent de 
   <code>Title</code>, qui existe simplement pour rendre les choses un peu 
   plus propres. 

*/ 

/** 
   Crée un nouveau Stringwrapper. 
   @constructor 

   @class la classe Stringwrapper.
   utile en soi ; il enveloppe simplement diverses opérations de chaîne courantes. 
*/ 
function Stringwrapper() { 
	/** 
	   Wrapper pour this.toString().indexOf() 
	   @param {String} x 
	   @type integer 
	*/ 
	this.indexOf=function(x){return this.toString().indexOf( X);}; 
	/** 
	   Renvoie this.value. 
	   @type String 
	*/ 
	this.toString=function(){return this.value;}; 
	/** 
	   Wrapper pour {@link String#parenSplit} appliqué à this.toString() 
	   @param {RegExp} x 
	   @type Array 
	*/ 
	this.parenSplit=function(x){return this.toString().parenSplit(x) ;}; 
	/**
	   Wrapper pour this.toString().substring() 
	   @param {String} x 
	   @param {String} y (facultatif) 
	   @type String 
	*/ 
	this.substring=function(x,y){ 
		if (typeof y=='undefined ') { return this.toString().substring(x); } 
		return this.toString().substring(x,y); 
	} ; 
	/** 
	   Wrapper pour this.toString().split() 
	   @param {String} x 
	   @type Array 
	*/ 
	this.split=function(x){return this.toString().split(x);}; 
	/** 
	   Wrapper pour this.toString().replace() 
	   @param {String} x 
	   @param {String} y 
	   @type String 
	*/
	this.replace=function(x,y){ return this.toString().replace(x,y); } ; 
} 


/** 
   Crée un nouveau <code>Titre</code>. 
   @constructor 

   @class La classe Titre. Contient les titres des articles et les convertit sous 
   diverses formes. Traite également des ancres, par lesquelles nous entendons les bits 
   de l'URL de l'article après un caractère #, représentant des emplacements 
   dans un article. 

   @param {String} value La valeur initiale à attribuer à l' 
   article. Ce doit être le titre canonique (voir {@link 
   Title#value}. Omettez ceci dans le constructeur et utilisez une autre fonction 
   pour définir le titre s'il n'est pas disponible. 
*/ 
function Title(val) { 
	/**
	   Le titre canonique de l'article. Cela doit être en UTF-8 sans 
	   entité, sans fuite ou méchant. De plus, les traits de soulignement doivent être 
	   remplacés par des espaces. 
	   @type Chaîne 
	   @private 
	*/ 
	this.value=null; 
	/** 
	   La forme canonique de l'ancre. Cela devrait être exactement tel 
	   qu'il apparaît dans l'URL, c'est-à-dire avec les bits 
	   .C3.0A . @type String 
	*/ 
	this.anchor=''; 

	this.setUtf(val); 
} 
Title.prototype=new Stringwrapper(); 
/** 
   Renvoie la représentation canonique du titre de l'article, éventuellement sans ancre. 
   @param {boolean} omitAnchor 
   @fixme Décider des spécifications pour l'ancre
   @return String Le titre de l'article et l'ancre. 
*/ 
Title.prototype.toString=function(omitAnchor) { 
	return this.value + ( (!omitAnchor && this.anchor) ? '#' + this.anchorString() : '' ); 
} ; 
Title.prototype.anchorString=function() { 
	if (!this.anchor) { return ''; } 
	var split=this.anchor.parenSplit(/((?:[.][0-9A-F]{2})+)/); 
	var longueur=split.length; 
	for (var j=1; j<len; j+=2) { 
		// FIXME s/decodeURI/decodeURIComponent/g ? 
		split[j]=decodeURIComponent(split[j].split('.').join('%')).split('_').join(' '); 
	} 
	return split.join(''); 
} ; 
Titre.prototype.urlAnchor=function() {
	var split=this.anchor.parenSplit('/((?:[%][0-9A-F]{2})+)/'); 
	var longueur=split.length; 
	for (var j=1; j<len; j+=2) { 
		split[j]=split[j].split('%').join('.'); 
	} 
	return split.join(''); 
} ; 
Title.prototype.anchorFromUtf=function(str) { 
	this.anchor=encodeURIComponent(str.split(' ').join('_')) 
	.split('%3A').join(':').split( "'").join('%27').split('%').join('.'); 
} ; 
Title.fromURL=function(h) { 
	return new Title().fromURL(h); 
} ; 
Title.prototype.fromURL=function(h) { 
	if (typeof h != 'string') { 
		this.value=null; 
		retournez ceci;

	// nous semblons être en mesure de reproduire l'encodage IE borked 

	// IE ne fait pas cette nouvelle technologie utf-8. 
	// et c'est pire que ça. 
	// IE semble traiter la chaîne de requête différemment du reste de l'url 
	// la requête est traitée comme un véritable utf8, mais le premier bit de l'url est bourré de 

	// nous réparons & pour tous les navigateurs, juste au cas où. 
	var splitted=h.split('?'); 
	splitted[0]=splitd[0].split('&').join('%26'); 

	h=split.join('?'); 

	var contribs=pg.re.contribs.exec(h); 
	if (contribs) { 
		if (contribs[1]=='title=') { contribs[3]=contribs[3].split('+').join(' '); } 
		var u=nouveau Titre(contribs[3]);
		this.setUtf(this.decodeNasties(mw.config.get('wgFormattedNamespaces')[pg.nsUserId] + ':' + u.stripNamespace())); 
		retournez ceci; 
	} 

	var email=pg.re.email.exec(h); 
	if (email) { 
		this.setUtf(this.decodeNasties(mw.config.get('wgFormattedNamespaces')[pg.nsUserId] + ':' + new Title(email[3]).stripNamespace())); 
		retournez ceci; 
	} 

	var backlinks=pg.re.backlinks.exec(h); 
	if (backlinks) { 
		this.setUtf(this.decodeNasties(new Title(backlinks[3]))); 
		retournez ceci; 
	} 

	//Un objet titre factice pour un lien Special:Diff. 
	var specialdiff=pg.re.specialdiff.exec(h); 
	si (diff spécial) {
		this.setUtf(this.decodeNasties(new Title(mw.config.get('wgFormattedNamespaces')[pg.nsSpecialId] + ':Diff'))); 
		retournez ceci; 
	} 

	// plus de cas particuliers à vérifier -- 
	// espérons que ce n'est pas une page spéciale déguisée liée à l'utilisateur ou spécialement traitée 
	var m=pg.re.main.exec(h); 
	if(m === null) { this.value=null; } 
	else { 
		var fromBotInterface = /[?](.+[&])?title=/.test(h); 
		if (fromBotInterface) { 
			m[2]=m[2].split('+').join('_'); 
		} 
		var extrait = m[2] + (m[3] ? '#' + m[3] : ''); 
		if (pg.flag.isSafari && /%25[0-9A-Fa-f]{2}/.test(extrait)) { 
			// Résout le problème de Safari
			// Safari encode parfois % comme %25 dans des chaînes encodées UTF-8 comme %E5%A3 -> %25E5%25A3. 
			this.setUtf(decodeURIComponent(unescape(extrait))); 
		} else { 
			this.setUtf(this.decodeNasties(extrait)); 
		} 
	} 
	renvoie ceci ; 
} ; 
Title.prototype.decodeNasties=function(txt) { 
	var ret= this.decodeEscapes(decodeURI(txt)); 
	ret = ret.replace(/[_ ]*$/, ''); 
	retour ret ; 
} ; 
Title.prototype.decodeEscapes=function(txt) { 
	var split=txt.parenSplit(/((?:[%][0-9A-Fa-f]{2})+)/); 
	var longueur=split.length; 
	for (var i=1; i<len; i=i+2) { 
		// FIXME est-il meilleur decodeURIComponent ? 
		split[i]=unescape(split[i]);
	} 
	return split.join(''); 
} ; 
Title.fromAnchor=function(a) { 
	return new Title().fromAnchor(a); 
} ; 
Title.prototype.fromAnchor=function(a) { 
	if (!a) { this.value=null; retournez ceci; } 
	renvoie this.fromURL(a.href); 
} ; 
Title.fromWikiText=function(txt) { 
	return new Title().fromWikiText(txt); 
} ; 
Title.prototype.fromWikiText=function(txt) { 
	// FIXME - tests nécessaires 
	txt=myDecodeURI(txt); 
	this.setUtf(txt); 
	retournez ceci; 
} ; 
Title.prototype.hintValue=function(){ 
	if(!this.value) { return ''; } 
	return safeDecodeURI(this.value); 
} ; 
//<NOLITE>
Title.prototype.toUserName=function(withNs) { 
	if (this.namespaceId() != pg.nsUserId && this.namespaceId() != pg.nsUsertalkId) { 
		this.value=null; 
		revenir; 
	} 
	this.value = (withNs ? mw.config.get('wgFormattedNamespaces')[pg.nsUserId] + ':' : '') + this.stripNamespace().split('/')[0]; 
} ; 
Title.prototype.userName=function(withNs) {
	var t=(nouveau Titre(this.value)); 
	t.toUserName(withNs); 
	if (t.value) { retourne t; } 
	renvoie null ; 
} ; 
Title.prototype.toTalkPage=function() { 
	// convertit l'article en page de discussion, ou si nous ne pouvons pas, renvoie null 
	// En d'autres termes : renvoie null si cela EST DÉJÀ une page de discussion 
	// et renvoie la discussion correspondante page sinon 
	//
	// Par https://www.mediawiki.org/wiki/Manual:Namespace#Subject_and_talk_namespaces 
	// * Tous les espaces de noms de discussion ont des indices entiers impairs 
	// * L'index d'espace de noms de discussion pour un espace de noms spécifique avec l'index n est n + 1 
	si (this.value === null) { return null; } 
	
	var namespaceId = this.namespaceId(); 
	if (namespaceId>=0 && namespaceId % 2 === 0) //espace de noms non spécial et sujet 
	{ 
		var localizedNamespace = mw.config.get('wgFormattedNamespaces')[namespaceId+1]; 
		if (typeof localizedNamespace!=='undefined') 
		{ 
			if (localizedNamespace === '') { 
				this.value = this.stripNamespace(); 
			} autre {
				this.value = localizedNamespace.split(' ').join('_') + ':' + this.stripNamespace(); 
			} 
			renvoie this.value; 
		} 
	} 

	this.value=null; 
	renvoie null ; 
} ; 
//</NOLITE> 
// Renvoie l'espace de noms canonique et localisé 
Title.prototype.namespace=function() { 
	return mw.config.get('wgFormattedNamespaces')[this.namespaceId()] ; 
} ; 
Title.prototype.namespaceId=function() { 
	var n=this.value.indexOf(':'); 
	si (n<0) { renvoie 0 ; } //mainspace 
	var namespaceId = mw.config.get('wgNamespaceIds')[this.value.substring(0,n).split(' ').join('_').toLowerCase()] ; 
	if (typeof namespaceId==' non défini') renvoie 0 ; //espace principal
	renvoyer namespaceId ; 
} ; 
//<NOLITE> 
Title.prototype.talkPage=function() { 
	var t=new Title(this.value); 
	t.toTalkPage(); 
	if (t.value) { retourne t; } 
	renvoie null ; 
} ; 
Title.prototype.isTalkPage=function() { 
	if (this.talkPage()===null) { return true; } 
	renvoie faux ; 
} ; 
Title.prototype.toArticleFromTalkPage=function() { 
	// copie/colle en grande partie de toTalkPage ci-dessus. 
	if (this.value === null) { return null; } 
	
	var namespaceId = this.namespaceId(); 
	if (namespaceId >= 0 && namespaceId % 2 == 1) // espace de noms non spécial et talk 
	{
		var localizedNamespace = mw.config.get('wgFormattedNamespaces')[namespaceId-1]; 
		if (typeof localizedNamespace!=='undefined') 
		{ 
			if (localizedNamespace === '') { 
				this.value = this.stripNamespace(); 
			} else { 
				this.value = localizedNamespace.split(' ').join('_') + ':' + this.stripNamespace(); 
			} 
			renvoie this.value; 
		} 
	} 

	this.value=null; 
	renvoie null ; 
} ; 
Title.prototype.articleFromTalkPage=function() { 
	var t=new Title(this.value); 
	t.toArticleFromTalkPage(); 
	if (t.value) { retourne t; } 
	renvoie null ; 
} ; 
Titre.prototype.
	var t=nouveau Titre(this.value); 
	if ( t.toArticleFromTalkPage() ) { return t; } 
	renvoie ceci ; 
} ; 
Title.prototype.isIpUser=function() { 
	return pg.re.ipUser.test(this.userName()); 
} ; 
//</NOLITE> 
Title.prototype.stripNamespace=function(){ // renvoie une chaîne, pas un Title 
	var n=this.value.indexOf(':'); 
	if (n<0) { renvoie this.value; } 
	var namespaceId = this.namespaceId(); 
	if (namespaceId === pg.nsMainspaceId) renvoie this.value ; 
	renvoie this.value.substring(n+1); 
} ; 
Titre.prototype.setUtf=function(value){ 
	if (!value) { this.value=''; revenir; } 
	var anch=valeur.indexOf('#');
	if(anch < 0) { this.value=value.split('_').join(' '); this.anchor=''; revenir; } 
	this.value=value.substring(0,anch).split('_').join(' '); 
	this.anchor=value.substring(anch+1); 
	this.ns=null ; // attend jusqu'à ce que namespace() soit appelé 
} ; 
Title.prototype.setUrl=function(urlfrag) { 
	var anch=urlfrag.indexOf('#'); 
	this.value=safeDecodeURI(urlfrag.substring(0,anch)); 
	this.anchor=this.value.substring(anch+1); 
} ; 
Title.prototype.append=function(x){ 
	this.setUtf(this.value + x); 
} ; 
Titre.prototype.urlString=function(x) { 
	if(!x) { x={}; } 
	var v=this.toString(true); 
	if (!x.omitAnchor && this.anchor) { v+= ' #' + this.urlAnchor(); }
	if (!x.keepSpaces) { v=v.split(' ').join('_'); } 
	return encodeURI(v).split('&').join('%26').split('?').join('%3F').split('+').join('%2B' ); 
} ; 
Title.prototype.removeAnchor=function() { 
	return new Title(this.toString(true)); 
} ; 
Title.prototype.toUrl=function() { 
	return pg.wiki.titlebase + this.urlString(); 
} ; 

function parseParams(url) { 
	var specialDiff = pg.re.specialdiff.exec(url); 
	if (specialDiff) 
	{ 
		var split= specialDiff[1].split('/'); 
		if (split.length==1) return {oldid:split[0], diff: 'prev'} ; 
		else if (split.length==2) return {oldid: split[0], diff: split[1]} ;

	if (url.indexOf('?')==-1) { return ret; } 
	url = url.split('#')[0]; 
	var s=url.split('?').slice(1).join(); 
	var t=s.split('&'); 
	for (var i=0; i<t.length; ++i) { 
		var z=t[i].split('='); 
		z.push(null); 
		ret[z[0]]=z[1]; 
	} 
	// La révision Diff sans oldid est interprétée comme un diff de la révision précédente par MediaWiki 
	if (ret.diff && typeof(ret.oldid)==='undefined') 
	{ 
		ret.oldid = "prev"; 
	} 
	//La documentation semble dire quelque chose de différent, mais oldid peut également accepter prev/next, et Echo émet de telles URL. Correction simple lors du décodage des paramètres : 
	if (ret.oldid && (ret.oldid===' précédent || ret.oldid==='suivant' || ret.oldid==='cur'))
	{ 
		var helper = ret.diff; 
		ret.diff = ret.oldid; 
		ret.oldid = assistant; 
	} 
	retourne ret; 
} 

// (a) myDecodeURI (premier decodeURI standard, puis pg.re.urlNoPopup) 
// (b) remplacez les espaces par des 
traits de soulignement // (c) encodeURI (juste le droit, pas de pg.re.urlNoPopup) 

fonction myDecodeURI ( str) { 
	var ret; 
	// FIXME decodeURIComponent ?? 
	essayez { ret=decodeURI(str.toString()); } 
	catch (sommet) { return str; } 
	pour (var i=0; i<pg.misc.decodeExtras.length; ++i) { 
		var from=pg.misc.decodeExtras[i].from; 
		var to=pg.misc.decodeExtras[i].to; 
		ret=ret.split(from).join(to); 
	} 
	retourne ret;
} 

function safeDecodeURI(str) { var ret=myDecodeURI(str); retour ret || str; } 

/////////// 
// TESTS // 
/////////// 

//<NOLITE> 
function isDisambig(data, article, props) { 
	if (!getValueOf('popupAllDabsStubs ') && article.namespace()) { return false; } 
	retour ! article.isTalkPage() && props.hasOwnProperty('homonymie'); 
} 

function stubCount(data, article) { 
	if (!getValueOf('popupAllDabsStubs') && article.namespace()) { return false; } 
	var sectStub=0; 
	var realStub=0; 
	if (pg.re.stub.test(data)) { 
		var s=data.parenSplit(pg.re.stub); 
		pour (var i=1; i<s.length; 
			i=i+2) { if (s[i]) { ++sectStub; }
			else { ++realStub; } 
		} 
	} 
	return { réel : realStub, sect : sectStub } ; 
} 

function isValidImageName(str){ // étendre au besoin... 
	return ( str.indexOf('{') == -1 ); 
} 

function isInStrippableNamespace(article) { 
	// L'espace de noms autorise-t-il les sous-pages 
	// Remarque, ce serait mieux si nous avions accès à wgNamespacesWithSubpages 
	try { 
		return ( article.namespaceId() !== 0 ); 
	} catch (e) { 
		return false; 
	} 
} 

function isInMainNamespace(article) { return article.namespaceId() === 0; } 

function anchorContainsImage(a) { 
	// itérer sur les enfants de l'ancre a 
	// voir s'il y en a des images
	if (a === null) { return false; } 
	var kids=a.childNodes; 
	for (var i=0; i<kids.length; ++i) { if (kids[i].nodeName=='IMG') { return true; } } 
	renvoie faux ; 
} 
//</NOLITE> 
function isPopupLink(a) { 
	// NB pour des raisons de performances, les liens TOC retournent généralement true 
	// ils doivent être supprimés plus tard 

	if (!markNopopupSpanLinks.done) { markNopopupSpanLinks(); } 
	if (a.inNopopupSpan) { return false; } 

	// FIXME est-ce plus rapide en ligne ? 
	if (a.onmousedown || a.getAttribute('nopopup')) { return false; } 
	var h=a.href; 
	if (h === document.location.href+'#') { return false; } 
	if (!pg.re.basenames.test(h)) { return false; }
	if (!pg.re.urlNoPopup.test(h)) { return true; } 
	return ( 
		(pg.re.email.test(h) || pg.re.contribs.test(h) || pg.re.backlinks.test(h) || pg.re.specialdiff.test(h) ) && 
		h.indexOf('&limit=') == -1 ); 
} 

function markNopopupSpanLinks() { 
	if( !getValueOf('popupOnlyArticleLinks')) 
		fixVectorMenuPopups(); 

	var s = $('.nopopups').toArray(); 
	for (var i=0; i<s.length; ++i) { 
		var as=s[i].getElementsByTagName('a'); 
		for (var j=0; j<as.length; ++j) { 
			as[j].inNopopupSpan=true; 
		} 
	} 
	
	markNopopupSpanLinks.done=true ; 
} 

fonction fixVectorMenuPopups() {
	$('div.vectorMenu h3:first a:first').prop('inNopopupSpan', true); 
} 
// ENDFILE : titles.js 
// STARTFILE : getpage.js 
////////////////////////////////// /////////////// 
// Téléchargement spécifique à Wiki 
// 

// Schéma d'un appel getWiki 
// 
// getPageWithCaching 
// | 
// faux | true 
// getPage<-[findPictureInCache]->-onComplete (un faux téléchargement) 
// \. 
// (async)->addPageToCache(téléchargement)->-onComplete(téléchargement) 

//vérifie le cache pour voir si la page existe 

function getPageWithCaching(url, onComplete, owner) { 
	log('getPageWithCaching, url='+url); 
	var i=findInPageCache(url); 
	var d;
	if (i > -1) { 
		d=fakeDownload(url, owner.idNumber, onComplete, 
			pg.cache.pages[i].data, pg.cache.pages[i].lastModified, 
			owner); 
	} else { 
		d=getPage(url, onComplete, owner); 
		if (d && propriétaire && propriétaire.addDownload) { 
			propriétaire.addDownload(d); 
			d.propriétaire=propriétaire ; 
		} 
	} 
} 

function getPage(url, onComplete, owner) { 
	log('getPage'); 
	var callback= function (d) { if (!d.aborted) {addPageToCache(d); onComplete(d);} }; 
	return startDownload(url, owner.idNumber, callback); 
} 

fonction findInPageCache(url) { 
	pour (var i=0; i<pg.cache.pages.length; ++i) {
		if (url==pg.cache.pages[i].url) { return i; } 
	} 
	return -1; 
} 

fonction addPageToCache(télécharger) { 
	log('addPageToCache '+download.url); 
	var page = {url : download.url, data : download.data, lastModified : download.lastModified} ; 
	return pg.cache.pages.push(page); 
} 
// ENDFILE : getpage.js 
// STARTFILE : parensplit.js 
///////////////////////////////// ////////////// 
// parenSplit 

// String.prototype.parenSplit devrait faire ce que ECMAscript dit que String.prototype.split fait, 
// entremêlant des correspondances de paren (regex capturant des groupes) entre le split éléments. 
// ie 'abc'.split(/(b)/)) devrait renvoyer ['a','b','c'], pas ['a','

if (String('abc'.split(/(b)/))!='a,b,c') { 
	// String.split cassé, par exemple konq, IE < 10 
	String.prototype.parenSplit=function (re ) { 
		re=nonGlobalRegex(re); 
		var s=ceci; 
		var m=re.exec(s);
		var ret=[]; 
		while (m && s) { 
			// sans la boucle suivante, nous avons 
			// 'ab'.parenSplit(/a|(b)/) != 'ab'.split(/a|(b)/) 
			for( var i=0; i<m.length; ++i) { 
				if (typeof m[i]=='undefined') m[i]=''; 
			} 
			ret.push(s.substring(0,m.index)); 
			ret = ret.concat(m.slice(1)); 
			s=s.substring(m.index + m[0].length); 
			m=re.exec(s); 
		} 
		ret.push(s); 
		retour ret ; 
	} ;
	String.prototype.parenSplit=function (re) { return this.split(re); } ; 
	String.prototype.parenSplit.isNative=true ; 
} 

function nonGlobalRegex(re) { 
	var s=re.toString(); 
	var indicateurs=''; 
	for (var j=s.length; s.charAt(j) != '/'; --j) { 
		if (s.charAt(j) != 'g') { flags += s.charAt(j) ; } 
	} 
	var t=s.substring(1,j); 
	return RegExp(t,flags); 
} 
// ENDFILE : parensplit.js 
// STARTFILE : tools.js 
// folie IE avec encodage 
// ======================== 
// 
/ / supposons tout au long que la page est en utf8, comme wikipedia 
// 
// si a est un élément DOM d'ancrage et a.href doit consister en 
//
// http://host.name.here/wiki/foo?bar=baz 
// 
// alors IE donne foo comme "latin1-encoded" utf8; nous avons foo = decode_utf8(decodeURI(foo_ie)) 
// mais IE donne bar=baz correctement comme plain utf8 
// 
// ----------------------- ---------- 
// 
// Le xmlhttp d'IE ne comprend pas les URL utf8. Je dois utiliser encodeURI ici. 
// 
// --------------------------------- 
// 
// summat else 

// Source : http:/ /aktuell.de.selfhtml.org/artikel/javascript/utf8b64/utf8.htm 

//<NOLITE> 


function getJsObj(json) { 
	try { 
		var json_ret = JSON.parse(json); 
		if( json_ret.warnings ) { 
			for( var w=0; w < json_ret.warnings.length; w++ ) {
				if( json_ret.warnings[w]['*'] ) { 
					log( json_ret.warnings[w]['*'] ); 
				} else { 
					log( json_ret.warnings[w]['warnings'] ); 
				} 
			} 
		} else if ( json_ret.error ) { 
			errlog( json_ret.error.code + ': ' + json_ret.error.info ); 
		} 
		renvoie json_ret; 
	} catch (someError) { 
		errlog('Quelque chose s'est mal passé avec getJsObj, json='+json); 
		retour 1 ; 
	} 
} 

function anyChild(obj) { 
	for (var p in obj) { 
		return obj[p]; 
	} 
	renvoie null ; 
} 

//</NOLITE> 

function upcaseFirst(str) { 
	if (typeof str != typeof '' || str === '') return '';
	return str.charAt(0).toUpperCase() + str.substring(1) ; 
} 


function findInArray(arr, foo) { 
	if (!arr || !arr.length) { return -1; } 
	var len=arr.length; 
	for (var i=0; i<len; ++i) { if (arr[i]==foo) { return i; } } 
	return -1; 
} 

/* eslint-disable no-unused-vars */ 
function nextOne (array, value) { 
	// NB si le tableau a deux entrées consécutives égales 
	// alors cela bouclera sur les appels successifs 
	var i=findInArray(array, value) ; 
	if (i<0) { return null; } 
	renvoie tableau[i+1] ; 
} 
/* eslint-enable no-unused-vars */ 

function literalizeRegex(str){ 
	return mw.util.escapeRegExp(str); 
}

String.prototype.entify=function() { 
	//var shy='­'; 
	return this.split('&').join('&').split('<').join('<').split('>').join('>'/*+timide */).split('"').join('"'); 
}; 

// Filtre de tableau fonction 
function removeNulls(val) { return val !== null; } 

function joinPath(list) { 
	return list.filter (removeNulls).join('/'); 
} 


function simplePrintf(str, subs) { 
	if (!str || !subs) { return str; } 
	var ret=[]; 
	var s=str.parenSplit(/(% s|\$[0-9]+)/); 
	var i=0; 
	do { 
		ret.push(s.shift()); 
		if ( !s.length ) { break; } 
		var cmd=s.shift( );
			if ( i < subs.length ) { ret.push(subs[i]); } else { ret.push(cmd); } 
			++i; 
		} else { 
			var j=parseInt( cmd.replace('$', ''), 10 ) - 1; 
			if ( j > -1 && j < subs.length ) { ret.push(subs[j]); } else { ret.push(cmd); } 
		} 
	} while (s.length > 0); 
	return ret.join(''); 
} 
/* eslint-disable no-unused-vars */ 
function isString(x) { return (typeof x === 'string' || x instanceof String); } 
function isNumber(x) { return (typeof x === 'number' || x instanceof Number); } 
function isRegExp(x) { return x instanceof RegExp; } 
function isArray (x) { return x instanceof Array; } 
function isObject(x) { return x instanceof Object;
function isFunction(x) { 
	return !isRegExp(x) && ($.isFunction(x) || x instanceof Function); 
} 
/* eslint-enable no-unused-vars */ 

function repeatString(s,mult) { 
	var ret=''; 
	for (var i=0; i<mult; ++i) { ret += s; } 
	retourne ret; 
} 

fonction zeroFill(s, min) { 
	min = min || 2 ; 
	var t=s.toString(); 
	return repeatString('0', min - t.length) + t; 
} 

function map(f, o) { 
	if (isArray(o)) { return map_array(f,o); } 
	return map_object(f,o); 
} 
fonction map_array(f,o) { 
	var ret=[]; 
	for (var i=0; i<o.length; ++i) { 
		ret.push(f(o[i])); 
	}
	retour ret ; 
} 
fonction map_object(f,o) { 
	var ret={}; 
	for (var i in o) { ret[o]=f(o[i]); } 
	retourne ret; 
} 

pg.escapeQuotesHTML = function ( text ) { 
	return text 
		.replace(/&/g, "&") 
		.replace(/"/g, """) 
		.replace(/</g, "<" ) 
		.replace(/>/g, ">"); 
}; 

// ENDFILE: tools.js 
// STARTFILE: dab.js 
//<NOLITE> 
////////////// ////////////////////////////////// 
// Dab-fixing code 
// 


fonction retargetDab(newTarget, oldTarget , friendlyCurrentArticleName, titleToEdit) { 
	log('retargetDab: newTarget='
	return changeLinkTargetLink( 
	{newTarget : newTarget, 
			texte : newTarget.split(' ').join(' '), 
			indice : tprintf('disambigHint', [newTarget]), 
			résumé : simplePrintf( 
					getValueOf('popupFixDabsSummary'), [friendlyCurrentArticleName, newTarget ]), 
			clickButton : getValueOf('popupDabsAutoClick'), minor : true, oldTarget : oldTarget, 
			watch : getValueOf('popupWatchDisambiggedPages'), 
			title : titleToEdit}); 
} 

function listLinks(wikitext, oldTarget, titleToEdit) { 
	// mediawiki supprime les espaces de fin, donc nous faisons la même 
	// testcase : https://en.wikipedia.org/w/index.php?title=Radial&oldid=97365633 
	var reg =RegExp('
	var ret=[]; 
	var splitted=wikitext.parenSplit(reg); 
	// ^[az]+ devrait correspondre aux liens interwiki, espérons-le (insensible à la casse) 
	// et ^[az]* devraient correspondre à ceux-ci et aux liens de style [[:Category...]] aussi 
	var omitRegex=RegExp('^[ az]*:|^[Ss]pecial:|^[Ii]mage|^[Cc]atégorie'); 
	var friendlyCurrentArticleName= oldTarget.toString(); 
	var wikPos = getValueOf('popupDabWiktionary'); 

	for (var i=1; i<splitted.length; i=i+3) { 
		if (typeof splitted[i] == typeof 'string' && splitted[i].length>0 && !omitRegex.test(splitted[ i])) { 
			ret.push( retargetDab(splitted[i], oldTarget, friendlyCurrentArticleName, titleToEdit) );


	if (wikPos) { 
		var wikTarget='wiktionary:' + 
			friendlyCurrentArticleName.replace( RegExp('^(.+)\\s+[(][^)]+[)]\\s*$'), '$1' ); 

		var méthamphétamine; 
		if (wikPos.toLowerCase() == 'first') { meth = 'unshift'; } 
		else { meth = 'pousser'; } 

		ret[meth]( retargetDab(wikTarget, oldTarget, friendlyCurrentArticleName, titleToEdit) ); 
	} 

	ret.push(changeLinkTargetLink( 
	{ newTarget : null, 
			text : popupString('remove this link').split(' ').join(' '), 
			indice : popupString("supprimer tous les liens vers cette page de désambiguïsation de cet article"), 
			clickButton : getValueOf('popupDabsAutoClick'), oldTarget : oldTarget,
			résumé : simplePrintf(getValueOf('popupRmDabLinkSummary'), [friendlyCurrentArticleName]), 
			watch : getValueOf('popupWatchDisambiggedPages'), 
			title : titleToEdit 
			})); 
	retour ret ; 
} 

fonction rmDupesFromSortedList(list) { 
	var ret=[]; 
	for (var i=0; i<list.length; ++i) { 
		if (ret.length === 0 || list[i]!=ret[ret.length-1]) { ret.push(list [je]); } 
	} 
	retourne ret; 
} 

function makeFixDab(data, navpop) { 
	// récupère le titre de la fenêtre contextuelle parent s'il y en a une ; la valeur par défaut existe dans changeLinkTargetLink 
	var titleToEdit=(navpop.parentPopup && navpop.parentPopup.article.toString());
	var list=listLinks(data, navpop.originalArticle, titleToEdit); 
	if (list.length === 0) { log('listLinks a renvoyé une liste vide'); renvoie null ; } 
	var html='<hr />' + popupString('Cliquez pour lever l'ambiguïté sur ce lien :') + '<br>'; 
	html+=list.join(', '); 
	retour html; 
} 


function makeFixDabs(wikiText, navpop, props) { 
	if (getValueOf('popupFixDabs') && isDisambig(wikiText, navpop.article, props) && 
		Title.fromURL(location.href).namespaceId() != pg.nsSpecialId && 
		navpop .article.talkPage() ) { 
		setPopupHTML(makeFixDab(wikiText, navpop, props), 'popupFixDab', navpop.idNumber);

		{ newTarget : null, texte : popupString('supprimer ce lien').split(' ').join(' '), 
			indice : popupString("supprimer tous les liens vers cette page de cet article"), 
			clickButton : getValueOf ('popupRedlinkAutoClick'), 
			oldTarget : article.toString(), 
			résumé : simplePrintf(getValueOf('popupRedlinkSummary'), [article.toString()])}); 
} 
//</NOLITE> 
// ENDFILE: dab.js 
// STARTFILE: htmloutput.js 

// cela doit utiliser une boucle de minuterie car nous ne savons pas si l'élément DOM existe lorsque nous voulons définir la 
fonction de texte setPopupHTML (str, elementId, popupId, onSuccess, append) { 
	if (typeof popupId === 'undefined') {
		//console.error('popupId n'est pas défini dans setPopupHTML, html='+str.substring(0,100)); 
		popupId = pg.idNumber; 
	} 

	var popupElement=document.getElementById(elementId+popupId); 
	if (popupElement) { 
		if (!append) { popupElement.innerHTML=''; } 
		if (isString(str)) { 
			popupElement.innerHTML+=str; 
		} else { 
			popupElement.appendChild(str); 
		} 
		if (onSuccess) { onSuccess(); } 
		setTimeout(checkPopupPosition, 100); 
		renvoie vrai ; 
	} else { 
		// appelle à nouveau cette fonction dans quelques 
		instants ... setTimeout(function(){ 
				setPopupHTML(str,elementId,popupId,onSuccess); 
			}, 600); 
	}
	renvoie null ; 
} 

//<NOLITE> 
function setPopupTrailer(str,id) {return setPopupHTML(str, 'popupData', id);} 
//</NOLITE> 

// args.navpopup est obligatoire 
// facultatif : args.redir, args. redirTarget 
// FIXME: Dieux, c'est un truc moche 
function fillEmptySpans(args) { 
	// si redir est présent et vrai alors redirTarget est obligatoire 
	var redir=true; 
	var rcid; 
	if (typeof args != 'object' || typeof args.redir == 'undefined' || !args.redir) { redir=false; } 
	var a=args.navpopup.parentAnchor; 

	article var, hint=null, oldid=null, params={} ; 
	if (redir && typeof args.redirTarget == typeof {}) { 
		article=args.redirTarget;
		//indice=article.hintValue(); 
	} else { 
		article=(nouveau Titre()).fromAnchor(a); 
		hint=a.originalTitle || article.hintValue(); 
		params=parseParams(a.href); 
		oldid=(getValueOf('popupHistoricalLinks')) ? params.oldid : null; 
		rcid=params.rcid; 
	} 
	var x={ article:article, indice: indice, oldid: oldid, rcid: rcid, navpop:args.navpopup, params:params } ; 

	var structure=pg.structures[getValueOf('popupStructure')] ; 
	if (typeof structure != 'object') { 
		setPopupHTML('popupError', 'Structure inconnue (cela ne devrait jamais arriver): '+ 
				 pg.option.popupStructure, args.navpopup.idNumber); 
		revenir; 
	} 
	var spans=flatten(pg.misc.layout);
	var numspans = spans.length;
	var redirs=pg.misc.redirSpans; 

	for (var i=0; i<numspans; ++i) { 
		var found = redirs && (redirs.indexOf( spans[i] ) !== -1); 
		//log('redir='+redir+', found="+found+', spans[i]='+spans[i]); 
		if ( (trouvé && !redir) || (!trouvé && redir) ) { 
			//log('sauter cet ensemble de la boucle'); 
			Continuez; 
		} 
		var structurefn=structure[spans[i]] ; 
		var setfn = setPopupHTML; 
		if (getValueOf('popupActiveNavlinks') && 
			(spans[i].indexOf('popupTopLinks')===0 || spans[i].indexOf('popupRedirTopLinks')===0) 
				) { 
			setfn = setPopupTipsAndHTML;
			log('running '+spans[i]+'({article:'+x.article+', hint:'+x.hint+', oldid: '+x.oldid+'})'); 
			setfn(structurefn(x), spans[i], args.navpopup.idNumber); 
			Pause; 
		case 'string' : 
			setfn(structurefn, spans[i], args.navpopup.idNumber); 
			Pause; 
		par défaut : 
			errlog('chose inconnue avec l'étiquette '+spans[i] + ' (l'index d'envergure était ' + i + ')'); 
			Pause; 
		} 
	} 
} 

// aplatit une 
fonction de tableau flatten(list, start) { 
	var ret=[]; 
	if (typeof start == 'undefined') { start=0; } 
	for (var i=start; i<list.length; ++i) { 
		if (typeof list[i] == typeof []) {
			return ret.concat(flatten(list[i])).concat(flatten(list, i+1)); 
		} 
		else { ret.push(list[i]); } 
	} 
	retourne ret; 
} 

// Générer du html pour toute la 
fonction contextuelle popupHTML (a) { 
	getValueOf('popupStructure'); 
	var structure=pg.structures[pg.option.popupStructure] ; 
	if (typeof structure != 'object') { 
		//retourne 'Structure inconnue : '+pg.option.popupStructure; 
		// remplace le choix de l'utilisateur 
		pg.option.popupStructure=pg.optionDefault.popupStructure; 
		renvoie popupHTML(a); 
	} 
	if (typeof structure.popupLayout != 'function') { return 'Mauvaise mise en page'; } 
	pg.misc.layout=structure.popupLayout();
	if ($.isFunction(structure.popupRedirSpans)) { pg.misc.redirSpans=structure.popupRedirSpans(); } 
	else { pg.misc.redirSpans=[]; } 
	return makeEmptySpans(pg.misc.layout, a.navpopup); 
} 

fonction makeEmptySpans (liste, navpop) { 
	var ret=''; 
	for (var i=0; i<list.length; ++i) { 
		if (typeof list[i] == typeof '') { 
			ret += emptySpanHTML(list[i], navpop.idNumber, 'div') ; 
		} else if (typeof list[i] == typeof [] && list[i].length > 0 ) { 
			ret = ret.parenSplit(RegExp('(</[^>]*?>$)')). join(makeEmptySpans(list[i], navpop)); 
		} else if (typeof list[i] == typeof {} && list[i].nodeType ) { 
			ret += emptySpanHTML(list[i].name, navpop.idNumber, list[i]. nodeType); 
		}
	} 
	retourne ret; 
} 


fonction emptySpanHTML(nom, identifiant, balise, nom de classe) { 
	balise = balise || 'envergure'; 
	if (!classname) { classname = emptySpanHTML.classAliases[name]; } 
	nom de classe = nom de classe || Nom; 
	if (name == getValueOf('popupDragHandle')) { classname += ' popupDragHandle'; } 
	return simplePrintf('<%s id="%s" class="%s"></%s>', [tag, name + id, classname, tag]); 
} 
emptySpanHTML.classAliases={ 'popupSecondPreview': 'popupPreview' }; 

// générer du html pour l'image contextuelle 
// <a id="popupImageLinkn"><img id="popupImagen"> 
// où n=idNumber 
fonction imageHTML(article,
				'<img align="right" valign="top" id="popupImg$1" style="display: none;"></img>' + 
				'</a>', [ idNumber ]); 
} 

function popTipsSoonFn(id, when, popData) { 
	if (!when) { when=250; } 
	var popTips=function(){ setupTooltips(document.getElementById(id), false, true, popData); } ; 
	return function() { setTimeout( popTips, when, popData ); } ; 
} 

function setPopupTipsAndHTML(html, divname, idnumber, popData) { 
	setPopupHTML(html, divname, idnumber, 
			 getValueOf('popupSubpopups') ? 
			 popTipsSoonFn(divname + idnumber, null, popData) : 
			 null); 
} 
// ENDFILE : htmloutput.js 
// STARTFILE :
////////////////////////////////////////////////////////////// 
// vérifications floues 

function fuzzyCursorOffMenus(x,y, fuzz, parent) { 
	if (!parent) { return null; } 
	var uls=parent.getElementsByTagName('ul'); 
	for (var i=0; i<uls.length; ++i) { 
		if (uls[i].className=='popup_menu') { 
			if (uls[i].offsetWidth > 0) return false; 
		} // else {document.title+='.';} 
	} 
	return true; 
} 

function checkPopupPosition () { // arrête la fenêtre contextuelle à droite de l'écran 
	// FIXME évite pg.current.link 
	if (pg.current.link && pg.current.link.navpopup) 
		pg.current.link.navpopup .limitPositionHorizontale();

	//console ('mouseOutWikiLink'); 
	var a=ceci ; 
	
	removeModifierKeyHandler(a); 
	
	if (a.navpopup === null || typeof a.navpopup === 'undefined') return ; 
	if ( ! a.navpopup.isVisible() ) { 
		a.navpopup.banish(); 
		revenir; 
	} 
	restaurerTitre(a); 
	Navpopup.tracker.addHook(posCheckerHook(a.navpopup)); 
} 

fonction posCheckerHook(navpop) { 
	return function() { 
		if (!navpop.isVisible()) { return true; /* supprimer ce hook */ } 
		if (Navpopup.tracker.dirty) { 
			return false; 
		} 
		var x=Navpopup.tracker.x, y=Navpopup.tracker.y ; 
		var mouseOverNavpop = navpop.isWithin(x,y,navpop.fuzz, navpop.mainDiv) ||
			!fuzzyCursorOffMenus(x,y,navpop.fuzz, navpop.mainDiv); 

		// FIXME ce serait plus joli de faire cela en interne aux objets Navpopup 
		var t=getValueOf('popupHideDelay'); 
		si (t) { t = t * 1000 ; } 
		if (!t) { 
			if(!mouseOverNavpop) { 
				if(navpop.parentAnchor) { 
					restoreTitle( navpop.parentAnchor ); 
				} 
				navpop.banish(); 
				renvoie vrai ; /* supprimer ce hook */ 
			} 
			return false; 
		} 
		// nous avons un délai de masquage défini 
		var d=+(new Date()); 
		if ( !navpop.mouseLeavingTime ) { 
			navpop.mouseLeavingTime = d; 
			renvoie faux ; 
		} 
		if ( mouseOverNavpop ) {
			navpop.mouseLeavingTime=null ; 
			renvoie faux ; 
		} 
		if (d - navpop.mouseLeavingTime > t) { 
			navpop.mouseLeavingTime=null ; 
			navpop.banish(); renvoie vrai ; /* supprimer ce hook */ 
		} 
		return false; 
	} ; 
} 

function runStopPopupTimer(navpop) { 
	// à ce stade, nous aurions dû quitter le lien mais rester dans le popup 
	// donc nous appelons à nouveau cette fonction jusqu'à ce que nous quittions le popup. 
	if (!navpop.stopPopupTimer) { 
		navpop.stopPopupTimer=setInterval(posCheckerHook(navpop), 500); 
		navpop.addHook(function(){clearInterval(navpop.stopPopupTimer);}, 
				   'cacher', 'avant'); 
	} 
}
// ENDFILE : mouseout.js 
// STARTFILE : previewmaker.js 
/** 
   @fileoverview 
   Définit l'objet {@link Previewmaker}, qui génère de courts aperçus à partir du balisage wiki. 
*/ 

/** 
   Crée un nouveau Previewmaker 
   @constructor 
   @class La classe Previewmaker. Utilisez une instance de ceci pour générer de courts aperçus à partir de Wikitext. 
   @param {String} wikiText La source Wikitext de la page que nous souhaitons prévisualiser. 
   @param {String} baseUrl L'url que nous devons ajouter lors de la création d'urls relatifs. 
   @param {Navpopup} propriétaire Le navpop associé à ce générateur de prévisualisation 
*/ 
function Previewmaker(wikiText, baseUrl, owner) {
	/** Le wikitexte qui est manipulé pour générer l'aperçu. */ 
	this.originalData=wikiText; 
	this.baseUrl=baseUrl; 
	this.owner=propriétaire ; 

	this.maxCharacters=getValueOf('popupMaxPreviewCharacters'); 
	this.maxSentences=getValueOf('popupMaxPreviewSentences'); 

	this.setData(); 
} 
Previewmaker.prototype.setData=function() { 
	var maxSize=Math.max(10000, 2*this.maxCharacters); 
	this.data=this.originalData.substring(0,maxSize); 
} ; 
/** Supprimer les commentaires HTML 
	@private 
*/ 
Previewmaker.prototype.killComments = function () { 
	// cela supprime également une nouvelle ligne de fin, par exemple [[diamyo]]
	this.data=this.data.replace(RegExp('^<!--[^$]*?-->\\n|\\n<!--[^$]*?-->(?= \\n)|<!--[^$]*?-->', 'g'), ''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killDivs = function () { 
	// dire au revoir, divs (peut être imbriqué, donc utilisez * pas *?) 
	this.data=this.data.replace(RegExp('< * div[^>]* *>[\\s\\S]*?< */ *div *>', 
					   'gi'), ''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killGalleries = function () { 
	this.data=this.data.replace(RegExp('< *gallery[^>]* *>[\\s\\S]*? < */ *galerie *>', 
					   'gi'), ''); 
} ;
Previewmaker.prototype.kill = function(ouverture, fermeture, sous-ouverture, sous-fermeture, repl) { 
	var oldk=this.data; 
	var k=this.killStuff(this.data, ouverture, fermeture, sous-ouverture, sous-fermeture, repl); 
	while (k.length < oldk.length) { 
		oldk=k; 
		k=this.killStuff(k, ouverture, fermeture, sous-ouverture, sous-fermeture, repl); 
	} 
	this.data=k; 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killStuff = function (txt, ouverture, fermeture, sous-ouverture, sous-fermeture, repl) { 
	var op=this.makeRegexp(opening); 
	var cl=this.makeRegexp(fermeture, '^'); 
	var sb=sous-ouverture ? this.makeRegexp(subopening, '^') : null;
	var sc=sous-fermeture ? this.makeRegexp(sous-fermeture, '^') : cl; 
	if (!op || !cl) { 
		alert('Erreur des fenêtres contextuelles de navigation : op ou cl est nul ! Quelque chose ne va pas.'); 
		revenir; 
	} 
	if (!op.test(txt)) { return txt; } 
	var ret=''; 
	var opResult = op.exec(txt); 
	ret = txt.substring(0,opResult.index); 
	txt=txt.substring(opResult.index+opResult[0].length); 
	var profondeur = 1 ; 
	while (txt.length > 0) { 
		var suppression=0; 
		if (profondeur==1 && cl.test(txt)) { 
			profondeur--; 
			remove=cl.exec(txt)[0].length; 
		} else if (profondeur > 1 && sc.test(txt)) { 
			profondeur--; 
			remove=sc.exec(txt)[0].length;
		} else if (sb && sb.test(txt)) { 
			depth++; 
			remove=sb.exec(txt)[0].length; 
		} 
		if ( !removal ) { remove = 1; } 
		txt=txt.substring(suppression); 
		if (profondeur === 0) { break; } 
	} 
	return ret + (repl || '') + txt; 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.makeRegexp = function (x, prefix, suffix) { 
	prefix = prefix || ''; 
	suffixe = suffixe || ''; 
	var reStr=''; 
	var indicateurs=''; 
	if (isString(x)) { 
		reStr=préfixe + literalizeRegex(x) + suffixe ; 
	} else if (isRegExp(x)) { 
		var s=x.toString().substring(1); 
		var sp=s.split('/');
		drapeaux=sp[sp.length-1] ; 
		sp[sp.length-1]=''; 
		s=sp.join('/'); 
		s=s.substring(0,s.length-1); 
		reStr= préfixe + s + suffixe ; 
	} else { 
		log ('échec de makeRegexp'); 
	} 

	log ('makeRegexp: got reStr=' + reStr + ', flags=' + flags); 
	return RegExp(reStr, indicateurs); 
} ; 
/ ** 
   @private 
* / 
Previewmaker.prototype.killBoxTemplates = function () { 

	// suppression de taxobox ... en fait, il y a un saudiprincebox_begin, donc nous allons être plus général 
	// aussi, ont float_begin, ... float_end 
	this.kill (RegExp('[{][{][^{}\\s|]*?(float|box)[_ ](begin|start)', 'i'), /[}][}]\s */, '{{');

	// de [[User:Zyxw/popups.js]] : tuez aussi les cadres 
	this.kill(RegExp('[{][{][^{}\\s|]*?(infobox|elementbox|frame)[ _ ]', 'est*/, '{{'); 

} ; 
/** 
   @private 
   <nowiki> 
*/ 
Previewmaker.prototype.killTemplates = function () { 
	this.kill('{{', '}}', '{', '}', ' '); 
} ; 
/** 
   </nowiki> 
   @private 
*/ 
Previewmaker.prototype.killTables = function () { 
	// les tables sont également mauvaises 
	// cela peut être lent, mais c'est une amélioration par rapport à un blocage du navigateur 
	// test de torture : [[ Comparison_of_Intel_Central_Processing_Units]] 
	this.kill('{|', /[|]}\s*/, '{|');
	this.kill(/<table.*?>/i, /<\/table.*?>/i, /<table.*?>/i); 
	// supprime les lignes commençant par un tube pour le plaisir (?) 
	th is.data=this.data.replace(RegExp('^[|].*$', 'mg'), ''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killImages = function () { 
	var interditNamespaceAliases = []; 
	jQuery.each(mw.config.get('wgNamespaceIds'), function(_localizedNamespaceLc, _namespaceId) { 
		if (_namespaceId!=pg.nsImageId && _namespaceId!=pg.nsCategoryId) return; 
		interditNamespaceAliases.push(_localizedNamespace'Lc ).join('[ _]')); //à faire : échapper aux fragments d'expression régulière ! 
	}); 
	
	// les images et les catégories sont un nono
	this.kill(RegExp('[[][[]\\s*(' + interditNamespaceAliases.join('|') + ')\\s*:', 'i'), 
		  /\]\]\s */, '[', ']'); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killHTML = function () { 
	// kill <ref ...>...</ref> 
	this.kill(/<ref\b[^/>]*?> /i, /<\/ref>/i); 

	// supprimons également des lignes entières commençant par <. ça vaut la peine d'essayer. 
	this.data=this.data.replace(RegExp('(^|\\n) *<.*', 'g'), '\n'); 

	// et ces balises html embêtantes, mais pas <nowiki> ou <blockquote> 
	var splitted=this.data.parenSplit(/(<[\w\W]*?(?:>|$|(?=<)) )/); 
	var len=splitted.length; 
	pour (var i=1; i<len ; 
		i=i+2) { switch (splitted[i]) { 
		case '<nowiki>' :
		cas '</nowiki>': 
		cas '<blockquote>': 
		cas '</blockquote>': 
			pause ; 
		par défaut :
			divisé[i]='' ; 
		} 
	} 
	this.data=splitted.join(''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killChunks = function() { // alerte heuristique 
	// morceaux de texte en italique ? t'es fou, mec ? 
	var italicChunkRegex=new RegExp 
	("((^|\\n)\\s*:*\\s*''[^']([^']|'''|'[^']){20} (.|\\n[^\\n])*''[.!?\\s]*\\n)+", 'g'); 
	// gardez les choses séparées, cependant, alors restez dans \n (corrige [[Union Jack]]? 
	this.data=this.data.replace(italicChunkRegex, ' \n'); 
} ; 
/** 
   @privé 
*/
Previewmaker.prototype.mopup = function () { 
	// nous ne pouvons tout simplement *pas* faire avec des règles horizontales pour le moment 
	this.data=this.data.replace(RegExp('^-{4,}','mg' ),''); 

	// pas de lignes indentées 
	this.data=this.data.replace(RegExp('(^|\\n) *:[^\\n]*','g'), ''); 

	// remplace __TOC__, __NOTOC__ et tout ce qu'il y a 
	// cela fera probablement 
	this.data=this.data.replace(RegExp('^__[A-Z_]*__ *$', 'gmi'),' '); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.firstBit = function () { 
	// ne me donne pas de paragraphes suivants, tu m'entends ? 
	/// on "normalise" d'abord les en-têtes de section,

	if (getValueOf('popupPreviewCutHeadings')) { 
		this.data=this.data.replace(RegExp('\\s*(==+[^=]*==+)\\s*', 'g') , '\n\n$1 '); 
		/// alors nous voulons nous débarrasser des sauts de paragraphe dont le texte se termine mal 
		this.data=this.data.replace(RegExp('([:;]) *\\n{2,}', 'g'), '$1\n'); 

		this.data=this.data.replace(RegExp('^[\\s\\n]*'), ''); 
		var stuff=(RegExp('^([^\\n]|\\n[^\\n\\s])*')).exec(this.data); 
		if (truc) { d = truc[0]; } 
		if (!getValueOf('popupPreviewFirstParOnly')) { d = this.data; } 

		/// mettez maintenant \n\n après les sections pour que les puces et les listes numérotées fonctionnent 
		d=d.replace(RegExp('(==+[^=]*==+)\\s*', 'g' ), '$1\n\n'); 
	} 


	// Séparer les phrases. Les phrases superflues sont RIGHT OUT.
	// remarque : exactement 1 jeu de parenthèses ici nécessaire pour que la tranche fonctionne 
	d = d.parenSplit(RegExp('([!?.]+["'+"'"+']*\\s)',' g')); 
	// l'espace de début est mauvais, mmkay? 
	d[0]=d[0].replace(RegExp('^\\s*'), ''); 

	var notSentenceEnds=RegExp('([^ .][az][.] *[az]|etc|sic|Dr|Mr|Mrs|Ms|St|no|op|cit|\\[[^\\]]*|\\s[A- Zvclm])$', 'i'); 
	d = this.fixSentenceEnds(d, notSentenceEnds); 

	this.fullLength=d.join('').length; 
	var n=this.maxSentences; 
	var dd=this.firstSentences( d,n); 

	do { 
		dd=this.firstSentences(d,n); --n; 
	} while ( dd.length > this.maxCharacters && n !== 0 ); 

	this.data = dd; 
};
/** 
   @privé 
*/
Previewmaker.prototype.fixSentenceEnds = function(strs, reg) { 
	// prend un tableau de chaînes, strs 
	// joint strs[i] à strs[i+1] & strs[i+2] si strs[i] correspond à regex reg 

	pour (var i=0; i<strs.length-2; ++i) { 
		if (reg.test(strs[i])) { 
			var a=[]; 
			for (var j=0; j<strs.length; ++j) { 
				if (j<i) a[j]=strs[j]; 
				si (j==i) a[i]=strs[i]+strs[i+1]+strs[i+2] ; 
				si (j>i+2) a[j-2]=strs[j] ; 
			} 
			renvoie this.fixSentenceEnds(a,reg); 
		} 
	} 
	renvoie des chaînes ; 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.firstSentences = function(strs, howmany) { 
	var t=strs.slice(0, 2*howmany);
	return t.join(''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killBadWhitespace = function() { 
	// nettoie également les '''' isolés, par exemple [[Suntory Sungoliath]] 
	this.data=this.data.replace(RegExp('^ * \'+ *$', 'gm'), ''); 
} ; 
/** 
   Exécute les différentes méthodes pour générer l'aperçu. 
   L'aperçu est stocké dans le champ <code>html</html>. 
   @private 
*/ 
Previewmaker.prototype.makePreview = function() { 
	if (this.owner.article.namespaceId()!=pg.nsTemplateId && 
				this.owner.article.namespaceId()!=pg.nsImageId ) { 
		this.killComments (); 
		this.killDivs();
		this.killBoxTemplates(); 

		if (getValueOf('popupPreviewKillTemplates')) { 
			this.killTemplates(); 
		} else { 
			this.killMultilineTemplates(); 
		} 
		this.killTables(); 
		this.killImages(); 
		this.killHTML(); 
		this.killChunks(); 
		this.mopup(); 

		this.firstBit(); 
		this.killBadWhitespace(); 
	} 
	else 
	{ 
		this.killHTML(); 
	} 
	this.html=wiki2html(this.data, this.baseUrl); // a besoin d'un 
	aperçu en direct this.fixHTML(); 
	this.stripLongTemplates(); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.esWiki2HtmlPart = function(data) {
  var reLinks = /(?:\[\[([^|\]]*)(?:\|([^|\]]*))*]]([az]*))/gi; // correspond à un lien wiki 
  reLinks.lastIndex = 0; //réinitialiser la correspondance des variables d'expression régulière

  ; 
  var résultat = "" ; 
  var postfixIndex = 0; 
  while ((match = reLinks.exec(data))) //match all wikilinks 
  { 
	//FIXME : la façon dont ce lien est construit ici n'est pas parfaite. Il est cliquable, mais l'aperçu des popups ne le reconnaîtra pas dans certains cas. 
	result += pg.escapeQuotesHTML(data.substring(postfixIndex, match.index)) + 
			  '<a href="'+Insta.conf.paths.articles+pg.escapeQuotesHTML(match[1])+'">'+ pg.escapeQuotesHTML((match[2]?match[2]:match[1])+match[3])+"</a>" ; 
	postfixIndex = reLinks.lastIndex;
  result += pg.escapeQuotesHTML(data.substring(postfixIndex)); 
  
  renvoyer le résultat ; 
} ; 
Previewmaker.prototype.editSummaryPreview=function() { 
	var reAes = /\/\* *(.*?) *\*\//g; // correspond au premier marqueur de section 
	reAes.lastIndex = 0; //réinitialiser la correspondance des variables d'expression régulière
	
	; 
	
	match = reAes.exec(this.data); 
	if (match) 
	{ 
		//nous avons un lien de section. Divisez-le, traitez-le, combinez-le. 
		var prefix = this.data.substring(0,match.index-1); 
		var section = match[1] ; 
		var postfix = this.data.substring(reAes.lastIndex); 
		
		var start = "<span class='autocomment'>" ; 
		var end = "</span>";
		if (prefix.length>0) start = this.esWiki2HtmlPart(prefix) + " " + start + "- " ; 
		if (postfix.length>0) end = " : " + end + this.esWiki2HtmlPart(postfix); 
		

		var t=nouveau Titre().fromURL(this.baseUrl); 
		t.anchorFromUtf(section); 
		var sectionLink = Insta.conf.paths.articles + pg.escapeQuotesHTML(t.toString(true)) + '#' + pg.escapeQuotesHTML(t.anchor); 
		return start + '<a href="'+sectionLink+'">→</a> '+pg.escapeQuotesHTML(section) + end; 
	} 
	
	// sinon il n'y a pas de lien de section, htmlifier le tout. 
	retourne this.esWiki2HtmlPart(this.data); 
} ; 

//<NOLITE> 
/** Fonction de test pour déboguer les problèmes de prévisualisation une étape à la fois.
function previewSteps(txt) { 
	try { 
		txt=txt || document.editform.wpTextbox1.value; 
	} catch (err) { 
		if (pg.cache.pages.length > 0) { 
			txt=pg.cache.pages[pg.cache.pages.length-1].data; 
		} else { 
			alert('fournir du texte ou utiliser une page d'édition'); 
		} 
	} 
	txt=txt.substring(0,10000); 
	var base=pg.wiki.articlebase + Title.fromURL(document.location.href).urlString(); 
	var p=new Previewmaker(txt, base, pg.current.link.navpopup); 
	if (this.owner.article.namespaceId() != pg.nsTemplateId) { 
		p.killComments(); if (!confirm('done killComments(). Continuer?\n---\n' + p.data)) { return; }
		p.killDivs(); if (!confirm('done killDivs(). Continuer?\n---\n' + p.data)) { return; } 
		p.killGalleries(); if (!confirm('done killGalleries(). Continuer?\n---\n' + p.data)) { return; } 
		p.killBoxTemplates(); if (!confirm('done killBoxTemplates(). Continuer?\n---\n' + p.data)) { return; } 

		if (getValueOf('popupPreviewKillTemplates')) { 
			p.killTemplates(); if (!confirm('done killTemplates(). Continuer?\n---\n' + p.data)) { return; } 
		} else { 
			p.killMultilineTemplates(); if (!confirm('done killMultilineTemplates(). Continuer?\n---\n' + p.data)) { return; } 
		} 

		p.killTables(); if (!confirm('done killTables(). Continuer?\n---\n' + p.data)) { return; }
		p.killImages(); if (!confirm('done killImages(). Continuer?\n---\n' + p.data)) { return; } 
		p.killHTML(); if (!confirm('done killHTML(). Continuer?\n---\n' + p.data)) { return; } 
		p.killChunks(); if (!confirm('done killChunks(). Continuer?\n---\n' + p.data)) { return; } 
		p.mopup(); if (!confirm('done mopup(). Continuer?\n---\n' + p.data)) { return; } 

		p.premierBit(); if (!confirm('done firstBit(). Continuer?\n---\n' + p.data)) { return; } 
		p.killBadWhitespace(); if (!confirm('done killBadWhitespace(). Continuer?\n---\n' + p.data)) { return; } 
	} 

	p.html=wiki2html(p.data, base); // nécessite un 
	aperçu en direct p.fixHTML(); if (!confirm('done fixHTML(). Continuer?\n---\n' + p.html)) { return; }
	p.stripLongTemplates(); if (!confirm('done stripLongTemplates(). Continuer?\n---\n' + p.html)) { return; } 
	alert('aperçu terminé - le résultat final suit.\n---\n' + p.html); 
} 
/*eslint-enable */ 
//</NOLITE> 

/** 
   Contourne les bogues de l'aperçu en direct. 
   @private 
*/ 
Previewmaker.prototype.fixHTML = function() { 
	if(!this.html) return; 

  var ret = this.html; 

	// corrige les points d'interrogation dans les liens wiki 
	// peut-être que cela va casser certaines choses :-( 
	ret=ret.replace(RegExp('(<a href="' + pg.wiki.articlePath + '/[^"]* )[?](.*?")', 'g'), '$1%3F$2'); 
	ret=ret.replace(RegExp('(<a href=\'' + pg.wiki.
	// FIXME corrige aussi % 
	
	
	this.html=ret; 
} ; 
/** 
   Génère l'aperçu et l'affiche dans la fenêtre contextuelle en cours. 

   Ne fait rien si l'aperçu généré n'est pas valide ou se compose uniquement d'espaces. 
   Active également les liens wiki dans l'aperçu pour les sous-fenêtres si l'option popupSubpopups est vraie. 
*/ 
Previewmaker.prototype.showPreview = function () { 
	this.makePreview(); 
	if (typeof this.html != typeof '') return; 
	if (RegExp('^\\s*$').test(this.html)) return ; 
	setPopupHTML('<hr />', 'popupPrePreviewSep', this.owner.idNumber); 
	setPopupTipsAndHTML(this.html, 'popupPreview', this.owner.idNumber, { owner: this.owner });
	var more = (this.fullLength > this.data.length) ? this.moreLink() : ''; 
	setPopupHTML(more, 'popupPreviewMore', this.owner.idNumber); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.moreLink=function() { 
	var a=document.createElement('a'); 
	a.className='popupMoreLink'; 
	a.innerHTML=popupString('plus...'); 
	var saveThis=this; 
	a.onclick=function() { 
		saveThis.maxCharacters+=2000; 
		enregistréThis.maxSentences+=20; 
		saveThis.setData(); 
		enregistréThis.showPreview(); 
	} ; 
	retourner un; 
} ; 

/** 
   @private 
*/ 
Previewmaker.prototype.
	// fonctionne sur le HTML ! 
	this.html=this.html.replace(RegExp('^.{0.1000}[{][{][^}]*?(<(p|br)( /)?>\\s*){ 2,}([^{}]*?[}][}]) ?', 'gi'), ''); 
	this.html=this.html.split('\n').join(' '); // solution de contournement pour les modèles <pre> 
	this.html=this.html.replace(RegExp('[{][{][^}]*<pre>[^}]*[}][}]','gi '), ''); 
} ; 
/** 
   @private 
*/ 
Previewmaker.prototype.killMultilineTemplates = function() { 
	this.kill('{{{', '}}}'); 
	this.kill(RegExp('\\s*[{][{][^{}]*\\n'), '}}', '{{'); 
} ; 
// ENDFILE : previewmaker.js 
// STARTFILE : querypreview.js 
fonction loadAPIPreview(queryType, article,
	var url=pg.wiki.apiwikibase + '?format=json&formatversion=2&action=query&'; 
	var htmlGenerator=function(/*a, d*/){alert('invalid html generator');}; 
	var usernameart = ''; 
	switch (queryType) { 
	case 'history': 
		url += 'titles=' + art + '&prop=revisions&rvlimit=' + 
			getValueOf('popupHistoryPreviewLimit'); 
		htmlGenerator=APIhistoryPreviewHTML; 
		Pause; 
	case 'category': 
		url += 'list=categorymembers&cmtitle=' + art; 
		htmlGenerator=APIcategoryAperçuHTML; 
		Pause; 
	case 'userinfo' : 
		var username = new Title( article ).userName(); 
		usernameart = encodeURIComponent( nom d'utilisateur ); 
		if (pg.re.ipUser.test(nom d'utilisateur)) {
			url += 'list=blocks&bkprop=range&bkip=' + usernameart; 
		} else { 
			url += 'list=users|usercontribs&usprop=blockinfo|groups|editcount|registration|gender&ususers=' + usernameart + "&meta=globaluserinfo&guiprop=groups|unattached&guiuser="+ usernameart + "&uclimit=1&ucprop=timestamp&ucuser=" + usernameart ; 
		} 
		htmlGenerator=APIuserInfoPreviewHTML; 
		Pause; 
	case 'contribs': 
		usernameart = encodeURIComponent( new Title( article ).userName() ); 
		url += 'list=usercontribs&ucuser=' + usernameart + 
			'&uclimit=' + getValueOf('popupContribsPreviewLimit'); 
		htmlGenerator=APIcontribsPreviewHTML; 
		Pause;
		if (getValueOf('popupImageLinks')) { trail = '&list=imageusage&iutitle=' + art; } 
		url += 'titles=' + art + '&prop=revisions|imageinfo&rvprop=content&rvslots=main' + trail; 
		htmlGenerator=APIimagepagePreviewHTML; 
		Pause; 
	cas 'backlinks' : 
		url += 'list=backlinks&bltitle=' + art ; 
		htmlGenerator=APIbacklinksPreviewHTML; 
		Pause; 
	case 'révision' : 
		if (article.oldid) { 
			url += 'revids=' + article.oldid; 
		} else { 
			url += 'titles=' + article.removeAnchor().urlString(); 
		} 
		url += '&prop=revisions|pageprops|info|images|catégories&
		htmlGenerator=APIrevisionPreviewHTML; 
		Pause; 
	} en 
	attenteNavpopTask(navpop); 
	var callback=function(d){ 
		log( "le rappel des fonctions API a été atteint" ); 
		showAPIPreview(queryType, htmlGenerator(article,d,navpop), navpop.idNumber, navpop,d); 
	} ; 
	var go = function(){ 
		getPageWithCaching(url, callback, navpop); 
		renvoie vrai ; 
	} ; 

	if (navpop.visible || !getValueOf('popupLazyDownloads')) { go(); } 
	else { navpop.addHook(aller, 'afficher', 'avant', 'DOWNLOAD_'+queryType+'_QUERY_DATA'); } 
} 

function linkList(list) { 
	list.sort(function(x,y) { return (x==y ? 0 : (x<y ? -1 : 1)); }); 
	var buf=[];
	for (var i=0; i<list.length; ++i) { 
		buf.push(wikiLink({article: new Title(list[i]), 
				   text: list[i].split(' ').join (' '), 
				   action : 'vue'})); 
	} 
	return buf.join(', '); 
} 

function getTimeOffset() { 
	var tz = mw.user.options.get('timecorrection'); 

	if(tz) { 
		if( tz.indexOf('|') > -1 ) { 
			// Nouveau format 
			return parseInt(tz.split('|')[1],10) ; 
		} else if ( tz.indexOf(':') > -1 ) { 
			// Ancien format 
			return( parseInt(tz,10)*60 + parseInt(tz.split(':')[1],10) ); 
		} 
	} 
	renvoie 0 ; 
} 

/*
 * Crée un tableau HTML qui s'affiche dans les fenêtres contextuelles de l'historique et des contributions des utilisateurs. 
 * @param {Object[]} h - une liste de révisions, renvoyée par l'API 
 * @param {boolean} reallyContribs - vrai uniquement si nous affichons les contributions des utilisateurs 
 */ 
function editPreviewTable(article, h, reallyContribs, timeOffset) { 
	var html=['<table>']; 
	var jour=null ; 
	var curart=article; 
	var page=null ; 

	var makeFirstColumnLinks; 
	if(reallyContribs) { 

		// Nous montrons les contributions des utilisateurs, alors faites des liens (diff | hist) 
		makeFirstColumnLinks = function(currentRevision) { 
			var result = '('; 
			result += '<a href="' + pg.wiki .titlebase +
				new Title(currentRevision.title).urlString() + '&diff=prev' + 
				'&oldid=' + currentRevision.revid + '">' + popupString('diff') + '</a>'; 
			result += '  | '; 
			résultat += '<a href="' + pg.wiki.titlebase + 
				nouveau titre(currentRevision.title).urlString() + '&action=history">' + 
				popupString('hist') + '</a>'; 
			result += ')'; 
			return result; 
		}; 
	} else { 

		// C'est une page d'historique normale, donc make (cur | last) links 
		var firstRevid = h[0].revid; 
		makeFirstColumnLinks = function(currentRevision) { 
			var result = '(';
			résultat += '<a href="' + pg.wiki.titlebase + nouveau Titre(curart).urlString() +
		var editDate = AdjustDate(getDateFromTimestamp(h[i].timestamp), timeOffset); 
		var thisDay = dayFormat(editDate);

		var thisTime = timeFormat(editDate); 
		if (thisDay == day) { 
			thisDay = ''; 
		} else { 
			jour = ce jour; 
		} 
		if (thisDay) { 
			html.push( '<tr><td colspan=3><span class="popup_history_date">' + 
				  thisDay+'</span></td></tr>' ); 
		} 
		html.push('<tr class="popup_history_row_' + ( (i%2) ? 'impair' : 'pair') + '">'); 
		html.push('<td>' + makeFirstColumnLinks(h[i]) + '</td>'); 
		html.push('<td>' + 
			'<a href="' + pg.wiki.titlebase + new Title(curart).urlString() + 
			'&oldid=' + h[i].revid + '
			if( !h[i].userhidden ) { 
				if( pg.re.ipUser.test(user) ) { 
					col3url=pg.wiki.titlebase + mw.config.get('wgFormattedNamespaces')[pg.nsSpecialId] + ' :Contributions&target=' + nouveau Titre(utilisateur).urlString(); 
				} else { 
					col3url=pg.wiki.titlebase + mw.config.get('wgFormattedNamespaces')[pg.nsUserId] + ':' + new Title(user).urlString(); 
				} 
				col3txt=pg.escapeQuotesHTML(utilisateur); 
			} else { 
				col3url=getValueOf('popupRevDelUrl'); 
				col3txt=pg.escapeQuotesHTML( popupString('revdel')); 
			} 
		} else { 
			col3url=pg.wiki.titlebase + curart.urlString(); 
			col3txt=pg.escapeQuotesHTML(page); 
		}
		html.push('<td>' + (reallyContribs ? minor : '') + 
			'<a href="' + col3url + '">' + col3txt + '</a></td>'); 
		var comment=''; 
		var c=h[i].commentaire || h[i].contenu ; 
		if (c) { 
			comment=new Previewmaker(c, new Title(curart).toUrl()).editSummaryPreview(); 
		} else if ( h[i].commenthidden ) { 
			comment=popupString('revdel'); 
		} 
		html.push('<td>' + (!reallyContribs ? minor : '') + comment + '</td>'); 
		html.push('</tr>'); 
		html=[html.join('')] ; 
	} 
	html.push('</table>'); 
	return html.join(''); 
} 

fonction getDateFromTimestamp(t) { 
	var s=t.split(/[^0-9]/); 
	commutateur(s.longueur) {
	cas 0 : renvoie null ; 
	cas 1 : retourner une nouvelle date(s[0]); 
	cas 2 : retourner une nouvelle date(s[0], s[1]-1); 
	cas 3 : retourner une nouvelle date(s[0], s[1]-1, s[2]); 
	cas 4: retourner une nouvelle date(s[0], s[1]-1, s[2], s[3]); 
	cas 5 : retourner une nouvelle date(s[0], s[1]-1, s[2], s[3], s[4]); 
	cas 6 : retourner une nouvelle date(s[0], s[1]-1, s[2], s[3], s[4], s[5] ); 
	par défaut : renvoie une nouvelle date(s[0], s[1]-1, s[2], s[3], s[4], s[5], s[6] ); 
	} 
} 

function AdjustDate(d, offset) { 
	// l'offset est en minutes 
	var o=offset * 60 * 1000; 
	renvoie une nouvelle date( +d + o); 
} 

fonction dayFormat(editDate, utc) {
	if (utc) { return map(zeroFill, [editDate.getUTCFullYear(), editDate.getUTCMonth()+1, editDate.getUTCDate()]).join('-'); } 
	return map(zeroFill, [editDate.getFullYear(), editDate.getMonth()+1, editDate.getDate()]).join('-'); 
} 

function timeFormat(editDate, utc) { 
	if (utc) { return map(zeroFill, [editDate.getUTCHours(), editDate.getUTCMinutes(), editDate.getUTCSeconds()]).join(':'); } 
	return map(zeroFill, [editDate.getHours(), editDate.getMinutes(), editDate.getSeconds()]).join(':'); 
} 

function showAPIPreview(queryType, html, id, navpop, download) { 
	// DJ: done 
	var target='popupPreview'; 
	terminéNavpopTask(navpop); 

	switch (queryType) { 
		case '
		case 'category': 
			target='popupPostPreview'; Pause; 
		case 'userinfo' : 
			target='popupUserData' ; Pause; 
		cas 'révision' : 
			insertPreview (téléchargement) ; 
			revenir; 
	} 
	setPopupTipsAndHTML(html, cible, id); 
} 

function ContentHandler(slot) 
{ 
var preview_content = null; 
	switch(slot.contentmodel) 
	{ 
		case 'wikitext': 
			preview_content = slot.content; 
		Pause; 
		case 'flow-board': 
			preview_content = 'Flux de travail : '+getJsObj(slot.content)["flow-workflow"] ; //espace réservé 
		break; 
		cas 'javascript' :
			preview_content = '['+slot.contentmodel+' code]'; 
		Pause; 
		case 'NewsletterContent' : 
			preview_content = "<b>Newsletter</b> \n"+getJsObj(slot.content)["description"] ; 
		Pause; 
	} 
return preview_content; 
} 

function APIrevisionPreviewHTML(article, télécharger) { 
	try{ 
		var jsObj=getJsObj(download.data); 
		var page=anyChild(jsObj.query.pages); 
		if( page.missing ) { 
			// TODO nous devons corriger cela plus tard sur 
			download.owner = null; 
			revenir; 
		} 
		var content = ( 
			page && 
			page.révisions 
		) ? ContentHandler(page.revisions[0].slots.main) :
		
		if( typeof content === 'string' ) 
		{ 
			download.data = content; 
			download.lastModified = new Date(page.revisions[0].timestamp); 
			download.pageprops = (page.hasOwnProperty('pageprops')) ? page.pageprops : {}; 
		} 
	} catch(someError) { 
		return 'L'aperçu de la révision a échoué :('; 
	} 
} 

function APIbacklinksPreviewHTML(article, download/*, navpop*/ ) { 
	try { 
		var jsObj=getJsObj(download.data); 
		var list=jsObj.query .backlinks; 

		var html=[]; 
		if (!list) { return popupString('Aucun backlink trouvé'); } 
		for ( var i=0; i < list.length; i++ ) { 
			var t=new Title(list[ i].titre);
			html.push('<a href="' + pg.wiki.titlebase + t.urlString() + '">' + t + '</a>'); 
		} 
		html=html.join(', '); 
		if (jsObj['continue'] && jsObj['continue'].blcontinue) { 
			html += popupString(' et plus'); 
		} 
		renvoie html; 
	} catch (someError) { 
		return 'backlinksPreviewHTML est devenu bancal'; 
	} 
} 

pg.fn.APIsharedImagePagePreviewHTML = function APIsharedImagePagePreviewHTML(obj) { 
	log( "APIsharedImagePagePreviewHTML" ); 
	var popupid = obj.requestid; 
	if( obj.query && obj.query.pages ) 
	{ 
		var page=anyChild(obj.query.pages );
			page.revisions[0].slots.main.contentmodel === 'wikitext' 
		) ? page.revisions[0].slots.main.content : null; 
		if( typeof content === 'string' && pg.current && pg.current.link ) 
		{ 
			/* Pas tout à fait sûr, mais le mieux que nous puissions faire */ 
			var p=new Previewmaker(content, pg.current.link. navpopup.article, pg.current.link.navpopup); 
			p.makePreview(); 
			setPopupHTML( p.html, "popupSecondPreview", popupid ); 
		} 
	} 
} ; 

function APIimagepagePreviewHTML(article, download, navpop) { 
	try { 
		var jsObj=getJsObj(download.data); 
		var page=anyChild(jsObj.query.pages); 
		var content= ( 
			page && 
			page.
			page.revisions[0].slots.main.contentmodel === 'wikitext' 
		) ? page.revisions[0].slots.main.content : null; 
		var ret=''; 
		var alt=''; 
		try{alt=navpop.parentAnchor.childNodes[0].alt;} catch(e){} 
		if (alt) { 
			ret = ret + '<hr /><b>' + popupString('Alt text:') + '</b> ' + pg.escapeQuotesHTML(alt); 
		} 
		if (typeof content === 'string') { 
			var p=prepPreviewmaker(content, article, navpop); 
			p.makePreview(); 
			if (p.html) { ret += '<hr />' + p.html; } 
			if (getValueOf('popupSummaryData')) { 
				var info=getPageInfo(content, download); 
				log(infos); 
				setPopupTrailer(info, navpop.idNumber); 
			} 
		}
		if (page && page.imagerepository == "shared" ) { 
			var art=new Title(article); 
			var encart = encodeURIComponent( "Fichier :" + art.stripNamespace() ); 
			var shared_url = pg.wiki.apicommonsbase + '?format=json&formatversion=2' + 
								'&callback=pg.fn.APIsharedImagePagePreviewHTML' + 
								'&requestid=' + navpop.idNumber + 
								'&action=query&prop=revisions&rvprop=content &&rvslot=s=main encart; 

			ret = ret +'<hr />' + popupString( 'Image de Commons') + 
					': <a href="' + pg.wiki.commonsbase + '?title=' + encart + '">' + 
					popupString( 'Page de description' ) + '</a>'; 
			mw.loader.load( url_partagée ); 
		}
		showAPIPreview('imagelinks', APIimagelinksPreviewHTML(article,télécharger), navpop.idNumber,télécharger); 
		retour ret ; 
	} catch (someError) { 
		return 'API imagepage preview failed :('; 
	} 
} 

function APIimagelinksPreviewHTML(article, download) { 
	try { 
		var jsobj=getJsObj(download.data); 
		var list=jsobj.query.imageusage; 
		if (list ) { 
			var ret=[]; 
			for (var i=0; i < list.length; i++) { 
				ret.push(list[i].title); 
			} 
			if (ret.length === 0) { return popupString ('Aucun lien d'image trouvé'); } 
			return '<h2>' + popupString('File links') + '</h2>' + linkList(ret); 
		} else {
			return popupString('Aucun lien d'image trouvé'); 
		} 
	} catch(someError) { 
		return 'La génération de l'aperçu des liens d'image a échoué :('; 
	} 
} 

function APIcategoryPreviewHTML(article, download) { 
	try{ 
		var jsobj=getJsObj(download.data); 
		var list=jsobj.query.categorymembers; 
		var ret=[]; 
		for (var p=0; p < list.length; p++) { 
		   ret.push(list[p].title); 
		} 
		if (ret.length === 0) { return popupString('Empty catégorie'); } 
		ret = '<h2>' + tprintf('Membres de catégorie (%s affichés)', [ret.longueur]) + '</h2>' +linkList(ret); 
		if (jsobj['continue '] && jsobj['continuer'].
		} 
		retourne ret; 
	} catch(someError) { 
		return 'Category preview failed :('; 
	} 
} 

function APIuserInfoPreviewHTML(article, download) { 
	var ret=[]; 
	var queryobj = {}; 
	try{ 
		queryobj=getJsObj(download.data).query; 
	} catch(someError) { return 'L'aperçu des informations utilisateur a échoué :('; } 

	var user=anyChild(queryobj.users); 
	if (user) { 
		var globaluserinfo=queryobj.globaluserinfo; 
		if (user.invalid === '') { 
			ret.push( popupString( 'Utilisateur invalide') ); 
		} else if (user.missing === '') { 
			ret.push( popupString( 'Pas un nom d'utilisateur enregistré') ); 
		} 
		if( user.blockedby )
			ret.push('<b>' + popupString('BLOCKED') + '</b>'); 
		if( globaluserinfo && ( 'verrouillé' dans globaluserinfo || 'caché' dans globaluserinfo ) ) { 
			var LockSulAccountIsAttachedToThis = true; 
			for( var i=0; globaluserinfo.unattached && i < globaluserinfo.unattached.length; i++) { 
				if ( globaluserinfo.unattached[i].wiki === mw.config.get('wgDBname') ) { 
					lockSulAccountIsAttachedToThis=false ; 
					Pause; 
				} 
			} 
			if (lockedSulAccountIsAttachedToThis) { 
				if ( 'locked' in globaluserinfo ) ret.push('<b><i>' + popupString('LOCKED') + '</i></b>'); 
				si ('caché' dans globaluserinfo ) ret.push('<b><i>' + popupString('HIDDEN') + '</i></b>'); 
			} 
		}
		if( getValueOf('popupShowGender') && user.gender ) { 
			switch( user.gender ) { 
				case "male": ret.push( popupString( "\u2642" ) ); Pause; 
				case "femelle": ret.push( popupString( "\u2640" ) ); Pause; 
			} 
		} 
		if( user.groups ) { 
			for( var j=0; j < user.groups.length; j++) { 
				var currentGroup = user.groups[j]; 
				if( ["*", "user", "autoconfirmed", "extendedconfirmed"].indexOf( currentGroup ) === -1 ) { 
					ret.push( pg.escapeQuotesHTML(user.groups[j]) ); 
				} 
			} 
		} 
		if( globaluserinfo && globaluserinfo.groups ) { 
			for( var k=0; k < globaluserinfo.groups.length; k++) {
				ret.push( '<i>'+pg.escapeQuotesHTML(globaluserinfo.groups[k])+'</i>' ); 
			} 
		} 
		
		regdate = user.registration ? enregistrement.utilisateur : globaluserinfo.registration; 
		ret.push( pg.escapeQuotesHTML((user.editcount ? user.editcount + popupString(' édite depuis : '): '0') + (regdate ? dayFormat(getDateFromTimestamp(regdate)) : '?')) ); 
	} 

	if (queryobj.usercontribs && queryobj.usercontribs.length) { 
		ret.push( popupString('last edit on ') + dayFormat(getDateFromTimestamp(queryobj.usercontribs[0].timestamp)) ); 
	} 
	
	if (queryobj.blocks) { 
		ret.push( popupString( 'IP user') ); //nous ne demandons que list=blocks pour les IP 
		pour (var l=0; l<queryobj. blocs.longueur; l++) {
			ret.push('<b>' + popupString(queryobj.blocks[l].rangestart === queryobj.blocks[l].rangeend ? 'BLOCKED' : 'RANGEBLOCKED') + '</b>' ); 
		} 
	} 
	
	ret = '<hr />' + ret.join( ', ' ); 
	retour ret ; 
} 

function APIcontribsPreviewHTML(article, download, navpop) { 
	return APIhistoryPreviewHTML(article, download, navpop, true); 
} 

function APIhistoryPreviewHTML(article, download, navpop, reallyContribs) { 
	try { 
		var jsobj=getJsObj(download.data); 
		var modifications = []; 
		if( vraimentContribs ) { 
			edits=jsobj.query.usercontribs; 
		} else { 
			edits=anyChild(jsobj.query.pages).revisions; 
		}

		var ret=editPreviewTable(article, edits, reallyContribs, getTimeOffset()); 
		retour ret ; 
	} catch (someError) { 
		return 'L'aperçu de l'historique a échoué :-('; 
	} 
} 


//</NOLITE> 
// ENDFILE : querypreview.js 
// STARTFILE : debug.js 
//////////// ////////////////////////////////////////////////////////////// ////// 
// Fonctions de débogage 
////////////////////////////////////// /////////////////////////// 

function setupDebugging() { 
//<NOLITE> 
	if (window.popupDebug) { // popupDebug est défini de .version 
		window.log=function(x) { //if(gMsg!='')gMsg += '\n'; gMsg+=time() + ' ' + x; }; 
			window.console.log(x ); 
		};
		window.errlog=function(x) { 
			window.console.error(x); 
		} ; 
		log('Initialisation de l'enregistreur'); 
	} else { 
//</NOLITE> 
		window.log = function() {}; 
		window.errlog = function() {}; 
//<NOLITE> 
	} 
//</NOLITE> 
} 
// ENDFILE : debug.js 
// STARTFILE : images.js 

// charge une image de type Title. 
function loadImage(image, navpop) { 
	if (typeof image.stripNamespace != 'function') { alert('loadImages bad'); } 
	// Appel d'API pour récupérer les informations sur l'image. 

	if ( !getValueOf('popupImages') ) return ; 
	if ( !isValidImageName(image) ) return false; 
	
	var art=image.urlString();

	var url=pg.wiki.apiwikibase + '?format=json&formatversion=2&action=query'; 
	url += '&prop=imageinfo&iiprop=url|mime&iiurlwidth=' + getValueOf('popupImageSizeLarge'); 
	url += '&titles=' + art; 

	en attenteNavpopTask(navpop); 
	var callback=function(d){ 
		popupsInsertImage(navpop.idNumber, navpop, d); 
	} ; 
	var go = function(){ 
		getPageWithCaching(url, callback, navpop); 
		renvoie vrai ; 
	} ; 
	if (navpop.visible || !getValueOf('popupLazyDownloads')) { go(); } 
	else { navpop.addHook(aller, 'afficher', 'après', 'DOWNLOAD_IMAGE_QUERY_DATA'); } 

} 

fonction popupsInsertImage(id, navpop, 
	télécharger) { log( "popupsInsertImage"); 
	var infoimage;
	essayez { 
		var jsObj=getJsObj(download.data); 
		var imagepage=anyChild(jsObj.query.pages); 
		if (typeof imagepage.imageinfo === 'undefined') return ; 
		infoimage = pageimage.infoimage[0]; 
	} catch (someError) { 
		log( "popupsInsertImage failed :(" ); 
		return; 
	} 

	var popupImage = document.getElementById("popupImg"+id); 
	if (!popupImage) { 
		log( " Impossible de trouver le point d'insertion pour l'image" ); 
		return; 
	} 

	popupImage.width=getValueOf('popupImageSize'); 
	popupImage.style.display='inline'; 

	// Définit la source de l'image. 
	if( imageinfo.thumburl ) 
		popupImage.src=imageinfo.thumburl;
	else if( imageinfo.mime.indexOf("image") === 0 ){ 
		popupImage.src=imageinfo.url; 
		log( "un pouce n'a pas pu être trouvé, en utilisant l'image originale" ); 
	} else log( "pouce d'image pleine taille, mais je ne sais pas si c'est une image"); 


	var a=document.getElementById("popupImageLink"+id); 
	if (a === null) { return null; } 

	// Détermine l'action du lien image environnant. 
	switch (getValueOf('popupThumbAction')) { 
	case 'imagepage': 
		if (pg.current.article.namespaceId()!=pg.nsImageId) { 
			a.href=imageinfo.descriptionurl; 
			// FIXME : non fiable pg.idNumber 
			popTipsSoonFn('popupImage' + id)(); 
			Pause;
		a.onclick=toggleSize ; 
		a.title=popupString('Basculer la taille de l'image'); 
		revenir; 
	cas 'linkfull' : 
		a.href = imageinfo.url ; 
		a.title=popupString('Ouvrir l'image en taille réelle'); 
		revenir; 
	} 

} 

// Bascule l'image entre inline small et navpop fullwidth. 
// C'est la même image, aucun changement de taille ne se produit, seulement la largeur d'affichage. 
function toggleSize() { 
	var imgContainer=this; 
	if (!imgContainer) { 
		alert('imgContainer is null :/'); 
		revenir; 
	} 
	var img=imgContainer.firstChild; 
	if (!img) { 
		alert('img est nul :/'); 
		revenir; 
	}

	if (!img.style.width || img.style.width==='') { 
		img.style.width='100%'; 
	} else { 
		img.style.width=''; 
	} 
} 

// Renvoie un titre d'une image de wikiText. 
function getValidImageFromWikiText(wikiText) { 
	// nb dans pg.re.image nous sommes intéressés par la deuxième expression entre crochets 
	// cela peut changer si l'expression régulière change :-( 
	//var match=pg.re.image.exec(wikiText ); 
	var matched=null; 
	var match; 
	// supprime les commentaires html, utilisé par les robots maléfiques :-( 
	var t = removeMatchesUnless(wikiText, RegExp('(<!--[\\s\\S]*?-- >)'), 1, 
					RegExp('^<!--[^[]*popup', 'i')); 

	while ( ( match = pg.re.image.exec(t) ) ) {
		// maintenant trouver un nom d'image sensé - exclure les modèles en cherchant { 
		var m = match[2] || correspondance[6]; 
		if ( isValidImageName(m) ) { 
			correspond=m; 
			Pause; 
		} 
	} 
	pg.re.image.lastIndex=0; 
	if (!matched) { return null; } 
	return mw.config.get('wgFormattedNamespaces')[pg.nsImageId]+':'+upcaseFirst(matched); 
} 

fonction removeMatchesUnless(str, re1, parencount, re2) { 
	var split=str.parenSplit(re1) ; 
	var c=compteparent + 1 ; 
	for (var i=0; i<split.length; ++i) { 
	if ( i%c === 0 || re2.test(split[i]) ) { continue; } 
	split[i]=''; 
	} 
	return split.join(''); 
} 

//</NOLITE>
// ENDFILE: images.js 
// STARTFILE: namespaces.js 
// Configurer les espaces de noms et d'autres localisations non strings.js 
// (actuellement, cela signifie également redirs) 

function setNamespaces() { 
	pg.nsSpecialId = -1; 
	pg.nsMainspaceId = 0; 
	pg.nsImageId = 6 ; 
	pg.nsUserId = 2 ; 
	pg.nsUsertalkId = 3 ; 
	pg.nsCategoryId = 14 ; 
	pg.nsTemplateId = 10 ; 
} 


function setRedirs() { 
	var r='redirect'; 
	var R='REDIRECTION'; 
	var redirLists={ 
//<NOLITE> 
		'ar': [ R, 'تحويل' ], 
		'be': [ r, 'перанакіраваньне' ], 
		'bg': [ r, 'пренасочване', 'виж' ],
		'bs': [ r, 'Preusmjeri', 'preusmjeri', 'PREUSMJERI' ], 
		'cs': [ R, 'PŘESMĚRUJ' ], 
		'cy': [ r, 'ail-cyfeirio' ], 
		'de': [ R, 'WEITERLEITUNG' ], 
		'el': [ R, 'ΑΝΑΚΑΤΕΥΘΥΝΣΗ'], 
		'eo': [ R, 'ALIDIREKTU', 'ALIDIREKTI' ], 
		'es': [ R, 'REDIRECCIÓN' ], 
		'et ': [ r, 'suuna' ], 
		'ga': [ r, 'athsheoladh' ], 
		'gl': [ r, 'REDIRECCIÓN', 'REDIRECIONAMENTO'], 
		'he': [ R, 'הפניה' ], 
		'hu': [ R, 'ÁTIRÁNYÍTÁS' ], 
		'est': [ r, 'tilvísun', 'TILVÍSUN' ],
		'it' : [ R, 'RINVIA', 'Rinvia'], 
		'ja' : [ R, '転送' ], 
		'mk' : [ r, 'пренасочување', 'види' ], 
		'nds' : [ r , 'wiederleiden' ], 
		'nl': [ R, 'DOORVERWIJZING' ],
	var redirList=redirLists[ pg.wiki.lang ] || [r, R] ; 
	// Mediawiki est très tolérant sur ce qui vient après la #redirection au début
	pg.re.redirect=RegExp('^\\s*[#](' + redirList.join('|') + ').*?\\[{2}([^\\|\\]] *)(|[^\\]]*)?\\]{2}\\s*(.*)', 'i'); 
} 

function setInterwiki() { 
	if (pg.wiki.wikimedia) { 
		// De https://meta.wikimedia.org/wiki/List_of_Wikipedias
		pg.wiki.interwiki='aa|ab|ace|af|ak|als|am|an|ang|ar|arc|arz|as|ast|av|ay|az|ba|bar|bat-smg|bcl|be|be-x- vieux|bg|bh|bi|bjn|bm|bn|bo|bpy|br|bs|bug|bxr|ca|cbk-zam|cdo|ce|ceb|ch|cho|chr|chy|ckb|co| cr|crh|cs|csb|cu|cv|cy|da|de|diq|dsb|dv|dz|ee|el|eml|en|eo|es|et|eu|ext|fa|ff|fi| fiu-vro|fj|fo|fr|frp|frr|fur|fy|ga|gag|gan|gd|gl|glk|gn|got|gu|gv|ha|hak|haw|he|salut|hif| ho|hr|hsb|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|ilo|io|is|it|iu|ja|jbo|jv|ka|kaa|kab|kbd| kg|ki|kj|kk|kl|km|kn|ko|koi|kr|krc|ks|ksh|ku|kv|kw|ky|la|lad|lb|lbe|lg|li|lij|lmo| ln|lo|lt|ltg|lv|map-bms|mdf|mg|mh|mhr|mi|mk|ml|mn|mo|mr|mrj|ms|mt|mus|mwl|my|myv|mzn| na|nah|nap|nds|nds-nl|ne|new|ng|nl|nn|no|nov|nrm|nv|ny|oc|om|or|os|pa|pag|pam|pap|pcd| pdc|pfl|pi|pih|pl|pms|pnb|pnt|ps|pt|qu|rm|rmy|rn|ro|roa-rup|roa-tara|ru|rue|rw|sa|sah|sc| scn|sco|sd|se|sg|sh|si|simple|sk|sl|sm|sn|so|sq|sr|srn|ss|st|stq|su|sv|sw|szl|ta|te| tet|tg|th|ti|tk|tl|tn|à|tpi|tr|ts|tt|tum|tw|ty|udm|ug|uk|ur|uz|ve|vec|vi|vls|vo|wa|war|wo|wuu| xal|xh|yi|yo|za|zea|zh|zh-classical|zh-min-nan|zh-yue|zu';
		pg.re.interwiki=RegExp('^'+pg.wiki.interwiki+':'); 
	} else { 
		pg.wiki.interwiki=null; 
		pg.re.interwiki=RegExp('^$'); 
	} 
} 

// renvoie un modèle d'expression régulière correspondant à toutes les variantes pour écrire l'espace de noms donné 
function nsRe(namespaceId) { 
	var imageNamespaceVariants = []; 
	jQuery.each(mw.config.get('wgNamespaceIds'), function(_localizedNamespaceLc, _namespaceId) { 
		if (_namespaceId!=namespaceId) return ; 
		_localizedNamespaceLc = upcaseFirst(_localizedNamespaceLc); 
		imageNamespaceVariants.push(mw.util.escapeRegExpExp .split(' ').join('[ _]')); 
		imageNamespaceVariants.push(mw.util.escapeRegExp(encodeURI(_localizedNamespaceLc)));

	return '(?:' + imageNamespaceVariants.join('|') + ')'; 
} 

function nsReImage() { 
	return nsRe(pg.nsImageId); 
} 
// ENDFILE : namespaces.js 
// STARTFILE : selpop.js 
//<NOLITE> 
function getEditboxSelection() { 
	// voir http://www.webgurusforum.com/8/12/0 
	var editbox ; 
	essayez { 
		editbox=document.editform.wpTextbox1; 
	} catch (dang) { return; } 
	// IE, Opera 
	if (document.selection) { return document.selection.createRange().text; } 
	// Mozilla 
	var selStart = editbox.selectionStart; 
	var selEnd = editbox.selectionEnd; 
	return (editbox.value).substring(selStart, selEnd); 
}

function doSelectionPopup() { 
	// popup si la sélection ressemble à [[foo|n'importe quoi après 
	// ou [[foo|bar]]text without ']]' 
	// ou [[foo|bar]] 
	var sel= getEditboxSelection(); 
	var open=sel.indexOf('[['); 
	var pipe=sel.indexOf('|'); 
	var close=sel.indexOf(']]'); 
	if (open == -1 || ( pipe == -1 && close == -1) ) { return; } 
	if (pipe != -1 && open > pipe || close != -1 && open > close) { return; } 
	if (getValueOf('popupOnEditSelection')=='boxpreview') { 
		return doSeparateSelectionPopup(sel); 
	} 
	var article=new Title(sel.substring(open+2, (pipe < 0) ? close : pipe)).urlString();
		revenir; 
	} 
	var a=document.createElement('a'); 
	a.href=pg.wiki.titlebase + article ; 
	mouseOverWikiLink2(a); 
	if (a.navpopup) { 
		a.navpopup.addHook(function(){runStopPopupTimer(a.navpopup);}, 'unhide', 'after'); 
	} 
} 

function doSeparateSelectionPopup(str) { 
	var div=document.getElementById('selectionPreview'); 
	if (!div) { 
		div = document.createElement('div'); 
		div.id='selectionPreview'; 
		essayez { 
			var box=document.editform.wpTextbox1; 
			box.parentNode.insertBefore(div, box); 
		} catch (erreur) { 
			return; 
		} 
	} 
	div.innerHTML=wiki2html(str);
	div.ranSetupTooltipsAlready = false; 
	popTipsSoonFn('selectionPreview')(); 
} 
//</NOLITE> 
// ENDFILE : selpop.js 
// STARTFILE : navpopup.js 
/** 
   @fileoverview Définit deux classes : {@link Navpopup} et {@link Mousetracker}. 

   <code>Navpopup</code> décrit les popups : quand ils apparaissent, où, à quoi 
   ils ressemblent et ainsi de suite. 

   <code>Mousetracker</code> "capture" la souris en utilisant 
   <code>document.onmousemove</code>. 
*/ 


/** 
   Crée un nouveau Mousetracker. 
   @constructor 
   @class La classe Mousetracker. Celui-ci surveille les mouvements de la souris et gère les crochets associés.
	/** 
	   Intervalle pour exécuter régulièrement les hooks de toute façon, en millisecondes. 
	   @type Entier 
	*/ 
	this.loopDelay=400; 

	/** 
	   Minuteur pour la boucle. 
	   @type Timer 
	*/ 
	this.timer=null; 

	/** 
	   Drapeau - sommes-nous allumés ? 
	   @type Booléen 
	*/ 
	this.active=false; 
	/** 
	   Drapeau - sommes-nous probablement inexacts, c'est-à-dire ne reflétant pas la position réelle de la souris ? 
	*/ 
	this.dirty=true; 
	/** 
	   Tableau de fonctions hook. 
	   @private 
	   @type Array 
	*/ 
	this.hooks=[]; 
} 

/**
   Ajoute un crochet, à appeler lorsque nous obtenons des événements. 
   @param {Fonction} f Une fonction appelée 
   <code>f(x,y)</code>. Il doit retourner <code>true</code> lorsqu'il 
   veut être supprimé, et <code>false</code> sinon. 
*/ 
Mousetracker.prototype.addHook = function (f) { 
	this.hooks.push(f); 
} ; 

/** 
   Exécute les hooks en leur passant les coordonnées x 
   et y de la souris. Les fonctions de hook qui renvoient true sont 
   transmises à {@link Mousetracker#removeHooks} pour suppression. 
   @private 
*/ 
Mousetracker.prototype.runHooks = function () { 
	if (!this.hooks || !this.hooks.length) { return; }
	//log('Mousetracker.runHooks; nous avons quelques crochets à exécuter'); 
	var remove=false ; 
	var removeObj={} ; 
	// cette méthode est appelée LOT - 
	// pré-cache certaines variables 
	var x=this.x, y=this.y, len = this.hooks.length; 

	for (var i=0; i<len; ++i) { 
		//~ exécuter la fonction hook et la supprimer si elle renvoie true 
		if (this.hooks[i](x, y)===true) { 
			supprimer=vrai ; 
			removeObj[i]=true ; 
		} 
	} 
	if (supprimer) { this.removeHooks(removeObj); } 
} ; 

/** 
   Supprime les crochets. 
   @private 
   @param {Object} removeObj Un objet dont les clés sont l'index
   nombre de fonctions à supprimer, avec des valeurs évaluées à true 
*/ 
Mousetracker.prototype.removeHooks = function(removeObj) { 
	var newHooks=[]; 
	var len = this.hooks.length; 
	for (var i=0; i<len; ++i) { 
		if (! removeObj[i]) { newHooks.push(this.hooks[i]); } 
	} 
	this.hooks=nouveauHooks; 
} ; 


/** 
   Gestionnaire d'événements pour les mouvements de la souris. 
   Nous saisissons simplement l'événement, définissons x et y et exécutons les crochets. 
   Cela rend le processeur tout chaud et gêné :-( 
   @private 
   @param {Event} e événement Mousemove 
*/ 
Mousetracker.prototype.track=function (e) { 
	//~ Apparemment, cela est nécessaire dans IE. 
	e = e || window .un événement;
	var x, y; 
	if (e) { 
		if (e.pageX) { x=e.pageX; y=e.pageY; } 
		else if (typeof e.clientX!='undefined') { 
			var left, top, docElt = document.documentElement; 

			if (docElt) { left=docElt.scrollLeft; } 
			gauche = gauche || document.body.scrollLeft || document.scrollLeft || 0 ; 

			if (docElt) { top=docElt.scrollTop; } 
			haut = haut || document.body.scrollTop || document.scrollTop || 0 ; 

			x=e.clientX + gauche ; 
			y=e.clientY + haut ; 
		} else { retour; } 
		this.setPosition(x,y); 
	} 
} ; 

/** 
   Définit les coordonnées x et y stockées et prend les mesures appropriées, en 
   exécutant les hooks le cas échéant.
   @param {Integer} x, y Coordonnées d'écran à définir 
*/ 

Mousetracker.prototype.setPosition=function(x,y) { 
	this.x = x; 
	this.y = y; 
	if (this.dirty || this.hooks.length === 0) { this.dirty=false; revenir; } 
	if (typeof this.lastHook_x != 'number') { this.lastHook_x = -100; this.lastHook_y=-100 ; } 
	var diff = (this.lastHook_x - x)*(this.lastHook_y - y); 
	diff = (diff >= 0) ? diff : -diff; 
	if ( diff > 1 ) { 
		this.lastHook_x=x; 
		this.lastHook_y=y; 
		if (this.dirty) { this.dirty = false; } 
		else { this.runHooks(); } 
	} 
} ; 

/**
   Met les choses en mouvement, à moins qu'elles ne le soient déjà, en enregistrant un gestionnaire d'événements sur <code>document.onmousemove</code>. 
   Une tentative timide est faite pour préserver l'ancien gestionnaire d'événements s'il y en a un. 
*/ 
Mousetracker.prototype.enable = function () { 
	if (this.active) { return; } 
	this.active=true; 
	//~ Enregistre le gestionnaire actuel pour les événements mousemove. Ce n'est pas trop 
	//~ robuste, bien sûr. 
	this.savedHandler=document.onmousemove; 
	//~ Je dois à nouveau enregistrer @tt{this} pour la fermeture et utiliser apply pour 
	//~ la fonction membre. 
	var saveThis=this; 
	document.onmousemove=function (e) {savedThis.track.apply(savedThis, [e]);} ;
	if (this.loopDelay) { this.timer = setInterval(function() { //log('le délai de boucle dans le mousetracker fonctionne'); 
									saveThis.runHooks();}, this.loopDelay); } 
} ; 

/** 
   Désactive le tracker, en supprimant le gestionnaire d'événements. 
*/ 
Mousetracker.prototype.disable = function () { 
	if (!this.active) { return; } 
	if ($.isFunction(this.savedHandler)) { 
		document.onmousemove=this.savedHandler; 
	} else { supprimer document.onmousemove; } 
	if (this.timer) { clearInterval(this.timer); } 
	this.active=false ; 
} ; 

/** 
   Crée un nouveau Navpopup. 
   Obtient un UID pour le popup et
   @param init Objet Constructeur. Si <code>init.draggable</code> est vrai ou absent, le popup devient déplaçable. 
   @constructor 
   @class La classe Navpopup. Cela génère des astuces contextuelles et en fait une certaine gestion. 
*/ 
function Navpopup(/*init*/) { 
	//alert('new Navpopup(init)'); 
	/** UID pour chaque instance Navpopup. 
		Lecture seulement. 
		@type entier 
	*/ 
	this.uid=Navpopup.uid++; 
	/** 
	   Indicateur en lecture seule pour la visibilité actuelle de la fenêtre contextuelle. 
	   @type booléen 
	   @private 
	*/ 
	this.visible=false; 
	/** Drapeau à définir lorsque nous voulons annuler une demande précédente pour 
		afficher le popup dans un petit moment.
		@private 
		@type booléen 
	*/ 
	this.noshow=false; 
	/** Liste catégorisée de crochets. 
		@see #runHooks 
		@see #addHook 
		@private 
		@type Object 
	*/ 
	this.hooks={ 
		'create': [], 
		'unhide': [], 
		'hide': [] 
	}; 
	/** liste des identifiants uniques des fonctions de crochet, pour éviter les doublons 
		@private 
	*/ 
	this.hookIds={}; 
	/** Liste des téléchargements associés à la popup. 
		@private 
		@type Array 
	*/ 
	this.downloads=[]; 
	/** Nombre de téléchargements inachevés. 
		@type entier 
	*/ 
	this.pending=null;
	/** Tolérance en pixels lors de la détection si la souris a quitté le popup. 
		@type entier 
	*/ 
	this.fuzz=5; 
	/** Indicateur pour basculer l'exécution de {@link #limitHorizontalPosition} pour réguler la position de la fenêtre contextuelle. 
		@type booléen 
	*/ 
	this.constrained=true; 
	/** La largeur de la fenêtre contextuelle en pixels. 
		@private 
		@type entier 
	*/ 
	this.width=0; 
	/** La largeur de la fenêtre contextuelle en pixels. 
		@private 
		@type entier 
	*/ 
	this.height=0; 
	/** L'élément DIV de contenu principal. 
		@type HTMLDivElement 
	*/ 
	this.mainDiv=null; 
	this.createMainDiv();

// if (!init || typeof init.popups_draggable=='undefined' || init.popups_draggable) { 
// this.makeDraggable(true); 
// } 
} 

/** 
   Un UID pour chaque Navpopup. Cette propriété de constructeur n'est qu'un compteur. 
   @type entier 
   @private 
*/ 
Navpopup.uid=0; 

/** 
   Récupère l'attribut {@link #visible}, indiquant si le popup est actuellement visible. 
   @type booléen 
*/ 
Navpopup.prototype.isVisible=function() { 
	return this.visible; 
} ; 

/** 
   Repositionne la fenêtre contextuelle en utilisant le style CSS. 
   @private 
   @param {entier} x coordonnée x (px) 
   @param {integer} y coordonnée y (px)
   @param {boolean} noLimitHor Ne pas appeler {@link #limitHorizontalPosition} 
*/ 
Navpopup.prototype.reposition= function (x,y, noLimitHor) { 
	log ('reposition('+x+','+y+','+ noLimitHor+')'); 
	if (typeof x != 'undefined' && x !== null) { this.left=x; } 
	if (typeof y != 'undefined' && y !== null) { this.top=y; } 
	if (typeof this.left != 'undefined' && typeof this.top != 'undefined') { 
		this.mainDiv.style.left=this.left + 'px'; 
		this.mainDiv.style.top=this.top + 'px'; 
	} 
	if (!noLimitHor) { this.limitHorizontalPosition(); } 
	//console.log('navpop'+this.uid+' - (left,top)=(' + this.left + ','
} ; 

/** 
   Empêche les popups d'être dans des endroits idiots. Avec un peu de chance. 
   Ne doit pas être exécuté si {@link #constrained} est vrai. 
   @private 
*/ 
Navpopup.prototype.limitHorizontalPosition=function() { 
	if (!this.constrained || this.tooWide) { return; } 
	this.updateDimensions(); 
	var x=ce.gauche ; 
	var w=this.width; 
	var cWidth=document.body.clientWidth; 


// log('limitHorizontalPosition: x='+x+ 
// ', this.left=' + this.left + 
// ', this.width=' + this.width + 
// ', cWidth=' + cWidth) ; 


	if ( (x+w) >= cWidth || 
		 ( x > 0 && 
		 	this.maxWidth && 
		 	this.width < this.
		 	this.height > this.width && 
		 	x > cWidth - this.maxWidth ) ) { 
		// C'est un hack très méchant. Il doit y avoir une meilleure façon! 
		// Nous trouvons la largeur "naturelle" du div en le positionnant à l'extrême gauche 
		// puis le réinitialisons pour qu'il soit aligné à droite (enfin, presque) 
		this.mainDiv.style.left='-10000px'; 
		this.mainDiv.style.width = this.maxWidth + 'px'; 
		var naturalWidth=parseInt(this.mainDiv.offsetWidth, 10); 
		var newLeft=cWidth - naturalWidth - 1 ; 
		if (newLeft < 0) { newLeft = 0; this.tooWide=true ; } // toujours instable pour les popups très larges ? 
		log ('limitHorizontalPosition : déplacement vers ('+newLeft + ','+ this.top+');' + 'naturalWidth='
		this.reposition(newLeft, null, true); 
	} 
} ; 

/** 
   Compteur indiquant l'ordre z du popup "le plus élevé". 
   Nous commençons le z-index à 1000 afin que les popups soient au-dessus de tout le 
   reste à l'écran. 
   @private 
   @type entier 
*/ 
Navpopup.highest=1000; 

/** 
   Amène une fenêtre contextuelle en haut de l'ordre z. 
   Nous incrémentons ici la propriété {@link #highest} du constructeur. 
   @private 
*/ 
Navpopup.prototype.raise = function () { 
	this.mainDiv.style.zIndex=Navpopup.highest + 1; 
	++Navpopup.highest; 
} ; 

/** 
   Affiche le popup fourni {@link #noshow} n'est pas vrai.
   Met à jour la position, place la fenêtre contextuelle en haut de l'ordre z et l'affiche. 
*/ 
Navpopup.prototype.show = function () { 
	//document.title+='s'; 
	if (this.noshow) { return; } 
	//document.title+='t'; 
	this.reposition(); 
	this.raise(); 
	this.unhide(); 
} ; 

/** 
   Vérifie si le pointeur de la souris s'est 
   stabilisé (en vérifiant chaque <code>temps</code>/2 millisecondes) et exécute la 
   méthode {@link #show} si c'est le cas. 
   @param {integer} time Le temps minimum (ms) avant que la fenêtre contextuelle ne s'affiche. 
*/ 
Navpopup.prototype.showSoonIfStable = function (time) { 
	log ('showSoonIfStable, time='+time);
	if (this.visible) { return; } 
	this.noshow = false; 

	//~ initialiser ces variables afin que nous n'exécutions jamais @tt{show} après 
	//~ juste la moitié du temps 
	this.stable_x = -10000; this.stable_y = -10000; 

	var stableShow = function() { 
		log('stableShow appelé'); 
		var new_x = Navpopup.tracker.x, new_y = Navpopup.tracker.y; 
		var dx = saveThis.stable_x - new_x, dy = saveThis.stable_y - new_y ; 
		var fuzz2 = 0 ; // enregistréCeci.fuzz * enregistréCe.fuzz; 
		//document.title += '[' + [savedThis.stable_x,new_x, saveThis.stable_y,new_y, dx, dy, fuzz2].join(',') + '] '; 
		if ( dx * dx <= fuzz2 && dy * dy <= fuzz2 ) { 
			log ('la souris est stable');
			clearInterval(savedThis.showSoonStableTimer); 
			savedThis.reposition.apply(savedThis, [new_x + 2, new_y + 2]); 
			savedThis.show.apply(savedThis, []); 
			savedThis.limitHorizontalPosition.apply(savedThis, []); 
			revenir; 
		} 
		saveThis.stable_x = new_x; saveThis.stable_y = new_y; 
	} ; 
	var saveThis = ceci; 
	this.showSoonStableTimer = setInterval(stableShow, time/2); 
} ; 

/** 
   Définit le drapeau {@link #noshow} et masque la fenêtre contextuelle. Cela devrait être appelé 
   lorsque la souris quitte le lien avant 
   (ou après) qu'il ne soit réellement affiché. 
*/ 
Navpopup.prototype.banish = function () { 
	log ('bannir appelé');
	// masquer et empêcher l'affichage avec showSoon à l'avenir 
	this.noshow=true; 
	if (this.showSoonStableTimer) { 
		log('effacer showSoonStableTimer'); 
		clearInterval(this.showSoonStableTimer); 
	} 
	this.hide(); 
} ; 

/** 
   Exécute les hooks ajoutés avec {@link #addHook}. 
   @private 
   @param {String} key Nom de clé du tableau {@link #hooks} - l'un de 'create', 'unhide', 'hide' 
   @param {String} when Contrôle exactement quand le hook est exécuté : soit 'avant ' ou 'après' 
*/ 
Navpopup.prototype.runHooks = function (key, when) { 
	if (!this.hooks[key]) { return; } 
	var keyHooks=this.hooks[clé] ; 
	var len=keyHooks.length;
	for (var i=0; i< len; ++i) { 
		if (keyHooks[i] && keyHooks[i].when == quand) { 
			if (keyHooks[i].hook.apply(this, []) ) { 
				// supprimer le crochet 
				if (keyHooks[i].hookId) { 
					supprimer this.hookIds[keyHooks[i].hookId] ; 
				} 
				keyHooks[i]=null; 
			} 
		} 
	} 
} ; 

/** 
   Ajoute un crochet au popup. Les fonctions de hook sont exécutées avec <code>this</code> défini pour faire référence à l'instance Navpopup, et sans arguments. 
   @param {Function} hook La fonction hook. Les fonctions qui renvoient true sont supprimées. 
   @param {String} key Nom de clé du tableau {@link #hooks} - l'un de 'create', 'unhide', 'hide'
   @param {String} when Contrôle exactement quand le hook est exécuté : soit 'before' soit 'after' 
   @param {String} uid Une chaîne véridique identifiant la fonction de hook ; s'il correspond à un autre crochet dans cette position, il ne sera plus ajouté. 
*/ 
Navpopup.prototype.addHook = function ( hook, key, when, uid ) { 
	when = when || 'après'; 
	if (!this.hooks[key]) { return; } 
	// si uid est spécifié, n'ajoute pas de doublons 
	var hookId=null; 
	if (uid) { 
		hookId=[clé, quand, uid].join('|'); 
		if (this.hookIds[hookId]) { 
			return; 
		} 
		this.hookIds[hookId]=true ; 
	} 
	this.hooks[key].push( {hook: hook, when: when, hookId: hookId} ); 
} ;

   Crée l'élément DIV principal, qui contient tout le contenu contextuel réel. 
   Exécute les hooks avec la clé 'create'. 
   @private 
*/ 
Navpopup.prototype.createMainDiv = function () { 
	if (this.mainDiv) { return; } 
	this.runHooks('créer', 'avant'); 
	var mainDiv=document.createElement('div'); 

	var saveThis=this; 
	mainDiv.onclick=function(e) {savedThis.onclickHandler(e);} ; 
	mainDiv.className=(this.className) ? this.className : 'navpopup_maindiv'; 
	mainDiv.id=mainDiv.className + this.uid ; 

	mainDiv.style.position='absolue'; 
	mainDiv.style.minWidth = '350px'; 
	mainDiv.style.display='none'; 
	mainDiv.className='

	// accès facile à l'objet javascript via les fonctions DOM 
	mainDiv.navpopup=this; 

	this.mainDiv=mainDiv; 
	document.body.appendChild(mainDiv); 
	this.runHooks('créer', 'après'); 
} ; 
/** 
   Appelle la méthode {@link #raise}. 
   @private 
*/ 
Navpopup.prototype.onclickHandler=function(/*e*/) { 
	this.raise(); 
} ; 
/** 
   Rend le popup déplaçable, en utilisant un objet {@link Drag}. 
   @private 
*/ 
Navpopup.prototype.makeDraggable=function(handleName) { 
	if (!this.mainDiv) { this.createMainDiv(); } 
	var drag=new Drag(); 
	if (!handleName) { 
		drag.startCondition=function(e) {
		try { if (!e.shiftKey) { return false; } } catch (err) { return false; } 
		renvoie vrai ; 
		} ; 
	} 
	var dragHandle; 
	if (handleName) dragHandle = document.getElementById(handleName); 
	if (!dragHandle) dragHandle = this.mainDiv; 
	var np=ceci ; 
	drag.endHook=function(x,y) { 
		Navpopup.tracker.dirty=true ; 
		np.reposition(x,y); 
	} ; 
	drag.init(dragHandle, this.mainDiv); 
} ; 

/** Cache la popup en utilisant CSS. Exécute les crochets avec la clé « masquer ». 
	Définit {@link #visible} de manière appropriée. {@link #banish} doit être appelé en externe au lieu de cette méthode. 

	@private 
*/ 
Navpopup.prototype.hide = function () {
	this.runHooks('cacher', 'avant'); 
	this.abortDownloads(); 
	if (typeof this.visible != 'undefined' && this.visible) { 
		this.mainDiv.style.display='none'; 
		this.visible=false ; 
	} 
	this.runHooks('cacher', 'après'); 
} ; 

/** Affiche le popup en utilisant CSS. Exécute les crochets avec la touche « unhide ». 
	Définit {@link #visible} de manière appropriée. {@link #show} doit être appelé en externe au lieu de cette méthode. 
	@private 
*/ 
Navpopup.prototype.unhide = function () { 
	this.runHooks('unhide', 'before'); 
	if (typeof this.visible != 'undefined' && !this.visible) { 
		this.mainDiv.style.display='inline'; 
		this.visible=true ; 
	}
	this.runHooks('afficher', 'après'); 
} ; 

/** 
   Définit l'attribut <code>innerHTML</code> du div principal contenant le contenu contextuel. 
   @param {String} html Le code HTML à définir. 
*/ 
Navpopup.prototype.setInnerHTML = function (html) { 
	this.mainDiv.innerHTML = html; 
} ; 

/** 
   Met à jour les attributs {@link #width} et {@link #height} avec les propriétés CSS. 
   @private 
*/ 
Navpopup.prototype.updateDimensions = function () { 
	this.width=parseInt(this.mainDiv.offsetWidth, 10); 
	this.height=parseInt(this.mainDiv.offsetHeight, 10); 
} ; 

/** 
   Vérifie si le point (x,y) est à {@link #fuzz} du
   {@link #mainDiv}. 
   @param {integer} x x-coordinate (px) 
   @param {integer} y-coordinate (px) 
   @type boolean 
*/ 
Navpopup.prototype.isWithin = function(x,y) { 
	//~ Si nous ne le sommes pas même visible, aucun point ne doit être considéré comme 
	//~ étant dans le popup. 
	if (!this.visible) { return false; } 
	this.updateDimensions(); 
	var fuzz=ce.fuzz || 0 ; 
	//~ Utilisez une simple métrique de boîte ici. 
	return (x+fuzz >= this.left && x-fuzz <= this.left + this.width && 
		y+fuzz >= this.top && y-fuzz <= this.top + this.height); 
} ; 

/** 
   Ajoute un téléchargement à {@link #downloads}. 
   @param {Téléchargeur} télécharger 
*/
Navpopup.prototype.addDownload=function(télécharger) { 
	si (!télécharger) { return ; } 
	this.téléchargements.push(téléchargement); 
} ; 
/** 
   Abandonne les téléchargements répertoriés dans {@link #downloads}. 
   @see Downloader#abort 
*/ 
Navpopup.prototype.abortDownloads=function() { 
	for(var i=0; i<this.downloads.length; ++i) { 
		var d=this.downloads[i]; 
		if (d && d.avorter) { d.avorter(); } 
	} 
	this.downloads=[]; 
} ; 


/** 
   Une instance {@link Mousetracker} qui est une propriété du constructeur (pseudo-global). 
*/ 
Navpopup.tracker=nouveau Mousetracker(); 
// ENDFILE : navpopup.js 
// STARTFILE : diff.js 
//<NOLITE>
/* 
 * Algorithme Javascript Diff 
 * Par John Resig (http://ejohn.org/) et [[:en:User:Lupin]] 
 * 
 * Plus d'informations : 
 * http://ejohn.org/projects/javascript-diff -algorithm/ 
 */ 

function delFmt(x) { 
	if (!x.length) { return ''; } 
	return "<del class='popupDiff'>" + x.join('') +"</del>" ; 
} 
function insFmt(x) { 
	if (!x.length) { return ''; } 
	return "<ins class='popupDiff'>" + x.join('') +"</ins>" ; 
} 

function countCrossings(a, b, i, eject) { 
	// compte les croisements sur le bord à partir de b[i] 
	if (!b[i].row && b[i].row !== 0) { return -1; 
	} var nombre=0; 
	pour (var j=0; j<a.length; ++j) {
		if (!a[j].row && a[j].row !== 0) { continue; } 
		if ( (jb[i].row)*(ia[j].row) > 0) { 
			if(eject) { return true; } 
			compter++; 
		} 
	} 
	renvoie le nombre ; 
} 

function shortenDiffString(str, context) { 
	var re=RegExp('(<del[\\s\\S]*?</del>|<ins[\\s\\S]*?</ins>) '); 
	var splitted=str.parenSplit(re); 
	var ret=['']; 
	for (var i=0; i<splitted.length; i+=2) { 
		if (splitted[i].length < 2*context) { 
			ret[ret.length-1] += splitted[i]; 
			if (i+1<splitted.length) { ret[ret.length-1] += splitted[i+1]; } 
			continuer ; 
		} 
		else { 
			if (i > 0) { ret[ret.length-1] += splitted[i]. sous-chaîne(0,contexte); }
			if (i+1 < 
				splitted.length ) { ret.push(splitted[i].substring(splitted[i].length-context) + 
					 splitted[i+1]); 
			} 
		} 
	} 
	while (ret.length > 0 && !ret[0]) { ret = ret.slice(1); } 
	retourne ret; 
} 


function diffString( o, n, simpleSplit ) { 
	var splitRe=RegExp('([[]{2}|[\\]]{2}|[{]{2,3}|[}]{2,3 }|[|]|=|<|>|[*:]+|\\s|\\b)'); 

	// Nous devons d'abord séparer les chaînes o et n, et entify() les parties 
	// individuellement, afin que les entités HTML ne soient jamais séparées. (AxelBoldt) 
	var out, i, oSplitted, nSplitted ; 
	if (simpleSplit) { 
		oSplitted=o.split(/\b/); 
		nSplitted=n.split(/\b/); 
	} autre {
		oSplitted=o.parenSplit(splitRe); 
		nSplitted=n.parenSplit(splitRe); 
	} 
	pour (i=0; i<oSplitted.length; ++i) {oSplitted[i]=oSplitted[i].entify();} 
	pour (i=0; i<nSplitted.length; ++i) { nSplitted[i]=nSplitted[i].entify();} 
		
	out = diff (oSplitted, nSplitted); 
	var str = "" ; 
	var acc=[]; // accumulateur pour une sortie plus jolie 

	// croisement d'appariements -- par exemple 'AB' vs 'BA' -- cause des problèmes, alors réglons-les 
	// cela ne fait pas toujours les choses de manière optimale mais cela devrait être assez rapide 
	var maxOutputPair=0 ; 
	for (i=0; i<out.n.length; ++i) { 
		if ( out.n[i].paired ) { 
		if( maxOutputPair > out.n[i].row ) { 
			// enchevêtrement - supprimer appariement
			out.o[ out.n[i].row ]=out.o[ out.n[i].row ].text; 
			out.n[i]=out.n[i].text; 
		} 
		if (maxOutputPair < ​​out.n[i].row) { maxOutputPair = out.n[i].row; } 
		} 
	} 

	// 
	affiche le contenu précédant la première ancienne ligne appariée pour (i=0; i<out.o.length && !out.o[i].paired; ++i) { acc.push( out.o [je] ); } 
	str += delFmt(acc); acc=[]; 

	// boucle principale 
	pour ( i = 0; i < out.n.length; ++i ) { 
		// affiche de nouvelles "lignes" non appariées 
		tandis que ( i < out.n.length && !out.n[i].paired ) { acc.push( out.n[i++] ); } 
		str += insFmt(acc); acc=[]; 
		if ( i < out.n.length ) { // cette nouvelle "ligne" est associée à la (out.n[i].row)ième ancienne "ligne"
			// affiche les anciennes lignes non appariées commençant après le partenaire de cette nouvelle ligne 
			var m = out.n[i].row + 1; 
			while ( m < out.o.length && !out.o[m].paired ) { acc.push ( out.o[m++] ); } 
			str += delFmt(acc); acc=[]; 
		} 
	} 
	return str; 
} 

// voir http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Object 
// FIXME : utilisez obj.hasOwnProperty au lieu de ce kludge ! 
var jsReservedProperties=RegExp('^(constructor|prototype|__((define|lookup)[GS]etter)__' + 
				   '|eval|hasOwnProperty|propertyIsEnumerable' + 
				   '|to(Source|String|LocaleString)|(un) ?watch|valueOf)$'); 
function diffBugAlert(mot) { 
	if (!diffBugAlert.
		diffBugAlert.list[mot]=1 ; 
		alert('Mauvais mot : '+mot+'\n\nVeuillez signaler ce bogue.'); 
	} 
} 
diffBugAlert.list={}; 

fonction makeDiffHashtable(src) { 
	var ret={}; 
	for ( var i = 0; i < src.length; i++ ) { 
		if ( jsReservedProperties.test(src[i]) ) { src[i] += '<!-- -->'; } 
		if ( !ret[ src[i] ] ) { ret[ src[i] ] = []; } 
		essayez { ret[ src[i] ].push( i ); } catch (err) { diffBugAlert(src[i]); } 
	} 
	retourne ret; 
} 

function diff( o, n ) { 

	// passe 1 : créer une table de hachage ns avec de nouvelles lignes comme clés 
	var ns = makeDiffHashtable(n); 

	// pass 2: make hashtable os avec les anciennes lignes comme clés 
	var os = makeDiffHashtable(o);

	// passe 3 : paire de nouvelles lignes uniques et d'anciennes lignes uniques correspondantes 
	var i; 
	for ( i in ns ) { 
		if ( ns[i].length == 1 && os[i] && os[i].length == 1 ) { 
			n[ ns[i][0] ] = { text: n [ ns[i][0] ], ligne : os[i][0], apparié : true } ; 
			o[ os[i][0] ] = { texte : o[ os[i][0] ], ligne : ns[i][0], jumelé : true } ; 
		} 
	} 

	// passe 4 : paire les lignes correspondantes immédiatement après les lignes appariées (pas nécessairement uniques) 
	pour ( i = 0; i < n.length - 1; i++ ) { 
		if ( n[i].paired && ! n[i+ 1].paired && n[i].row + 1 < o.length && ! o[ n[i].row + 1 ].paired && 
			 n[i+1] == o[ n[i].row + 1 ] ) { 
			n[i+1] = { texte : n[i+1], ligne : n[i].ligne + 1, apparié : vrai } ;
			o[n[i].row+1] = { texte : o[n[i].row+1], ligne : i + 1, apparié : true } ; 
		} 
	} 

	// passe 5 : paire les lignes correspondantes précédant immédiatement les lignes appariées (pas nécessairement uniques) 
	pour ( i = n.length - 1; i > 0; i-- ) { 
		if ( n[i].paired && ! n[ i-1].paired && n[i].row > 0 && ! o[ n[i].row - 1 ].paired && 
			 n[i-1] == o[ n[i].row - 1 ] ) { 
			n[i-1] = { texte : n[i-1], rangée : n[i].row - 1, apparié : vrai } ; 
			o[n[i].row-1] = { texte : o[n[i].row-1], ligne : i - 1, apparié : true } ; 
		} 
	} 

	return { o: o, n: n }; 
} 
//</NOLITE> 
// ENDFILE : diff.js 
// STARTFILE : init.js 
function setSiteInfo() { 
	if (window.popupLocalDebug) {
		pg.wiki.hostname = 'en.wikipedia.org'; 
	} else { 
		pg.wiki.hostname = location.hostname; // utiliser de préférence à location.hostname pour plus de flexibilité (?) 
	} 
	pg.wiki.wikimedia=RegExp('(wiki([pm]edia|source|books|news|quote|versity)|wiktionary|mediawiki)[.] org').test(pg.wiki.hostname); 
	pg.wiki.wikia=RegExp('[.]wikia[.]com$', 'i').test(pg.wiki.hostname); 
	pg.wiki.isLocal=RegExp('^localhost').test(pg.wiki.hostname); 
	pg.wiki.commons=( pg.wiki.wikimedia && pg.wiki.hostname != 'commons.wikimedia.org') ? 'commons.wikimedia.org' : null; 
	pg.wiki.lang = mw.config.get('wgContentLanguage'); 
	var port = emplacement.port ? ':' + emplacement.port : ''; 
	pg.wiki. sitebase = pg.wiki.hostname + port ; 
}

function setUserInfo() { 
	var api = new mw.Api( { 
		    ajax : { en- 
		        têtes : { 'Api-User-Agent' : pg.misc.userAgent } 
		    } 
		} ); 
	var params = { 
			action : 'query', 
			liste : 'users', 
			ususers : mw.config.get('wgUserName'), 
			usprop : 'rights' 
		}; 
    
 	pg.user.canReview = false; 
    if (getValueOf('popupReview')) { 
		api.get(params).done(function(data){ 
			var rights = data.query.users[0].rights; 
			pg.user.canReview = rights.indexOf('review ') !== -1; // A FAIRE : Doit-il s'agir d'un getValueOf('ReviewRight') ? 
		});

	var protocol = ( window.popupLocalDebug ? 'http:' : location.protocol ); 
	pg.wiki.articlePath = mw.config.get('wgArticlePath').replace(/\/\$1/, ""); // comme dans http://some.thing.com/wiki/Article 
	pg.wiki.botInterfacePath = mw.config.get('wgScript'); 
	pg.wiki.APIPath = mw.config.get('wgScriptPath') +"/api.php" ; 
	// le paramètre par défaut de mediawiki est des chemins comme http://some.thing.com/articlePath/index.php?title=foo 

	var titletail = pg.wiki.botInterfacePath + '?title='; 
	//var titletail2 = joinPath([pg.wiki.botInterfacePath, 'wiki.phtml?title=']); 

	// d'autres sites peuvent avoir besoin d'ajouter du code ici pour définir titletail en fonction de la façon dont leurs URL fonctionnent 

	pg.wiki.titlebase = protocol + '//' + pg.wiki.
	//pg.wiki.titlebase2 = protocole + '//' + joinPath([pg.wiki.sitebase, titletail2]); 
	pg.wiki.wikibase = protocole + '//' + pg.wiki.sitebase + pg.wiki.botInterfacePath ; 
	pg.wiki.apiwikibase = protocole + '//' + pg.wiki.sitebase + pg.wiki.APIPath ; 
	pg.wiki.articlebase = protocole + '//' + pg.wiki.sitebase + pg.wiki.articlePath ; 
	pg.wiki.commonsbase = protocole + '//' + pg.wiki.commons + pg.wiki.botInterfacePath ; 
	pg.wiki.apicommonsbase = protocole + '//' + pg.wiki.commons + pg.wiki.APIPath ; 
	pg.re.basenames = RegExp( '^(' + 
				  map( literalizeRegex, [ pg.wiki.titlebase, //pg.wiki.titlebase2, 
							  pg.wiki.articlebase ]).join('|') + ')' );


// 

Fonction d'expressions régulières globales setMainRegex () { 
	var reStart='[^:]*://'; 
	var preTitles = literalizeRegex( mw.config.get('wgScriptPath') ) + '/(?:index[.]php|wiki[.]phtml)[?]title='; 
	preTitres += '|' + literalizeRegex( pg.wiki.articlePath + '/' ); 

	var reEnd='(' + preTitres + ')([^ &?#]*)[^#]*(?:#(.+))?'; 
	pg.re.main = RegExp(reStart + literalizeRegex(pg.wiki.sitebase) + reEnd); 
} 

function setRegexps() { 
	// À FAIRE : nous devrions utiliser un appel api pour obtenir les alias des pages spéciales, maintenant cela ne fonctionne pas pour les wikipédias non anglais : 
	// Par exemple, https://ru.wikipedia.org/w /api.php?action=query&meta=siteinfo&siprop=specialpagealiases&
	var sp=nsRe(pg.nsSpecialId); 
	pg.re.urlNoPopup=RegExp('((title=|/)' + sp + '(?:%3A|:)|section=[0-9]|^#$)') ; 
	pg.re.contribs =RegExp('(title=|/)' + sp + '(?:%3A|:)(?:Contributions' + getValueOf('popupSPAliasesContribs') + ')(&target=|/|/ ' + nsRe(pg.nsUserId)+':)(.*)') ; 
	pg.re.email =RegExp('(title=|/)' + sp + '(?:%3A|:)(?:EmailUser' + getValueOf('popupSPAliasesEmail') + ')(&target=|/|/ (?:' + nsRe(pg.nsUserId)+':)?)(.*)') ; 
	pg.re.backlinks =RegExp('(title=|/)' + sp + '(?:%3A|:)(?:WhatLinksHere' + getValueOf('popupSPAliasesBacklinks') + ')(&target=|/)( [^&]*)'); 
	pg.re.specialdiff=RegExp('/' + sp + '(?:%3A|: )Diff/([^?#]*)'); 

//<NOLITE> 
	var im=nsReImage();
	// remarque : essaie également d'obtenir des images dans les modèles d'infobox, par exemple des pages de films, des pages d'albums, etc. 
	// (^|\[\[)image : *([^|\]]*[^|\] ]) * 
	/ / (^|\[\[)image : *([^|\]]*[^|\] ])([^0-9\]]*([0-9]+) *px) ? 
	// $4 = 120 comme dans 120px 
	pg.re.image = RegExp('(^|\\[\\[)' + im + ': *([^|\\]]*[^|\\] ] )' + 
				 '([^0-9\\]]*([0-9]+) *px)?|(?:\\n *[|]?|[|]) *' + 
				 '(' + getValueOf('popupImageVarsRegexp') + ')' + 
				 ' *= *(?:\\[\\[ *)?(?:' + im + ':)?' + 
				 '([^|]*?) (?:\\]\\])? *[|]? *\\n', 'img') ; 
	pg.re.imageBracketCount = 6 ; 

	pg.re.category = RegExp('\\[\\[' +nsRe(pg.nsCategoryId) + 
				': *([^|\\]]*[^|\\] ]) *', 'je'); 
	pg.re.categoryBracketCount = 1 ;

	pg.re.ipUser=RegExp('^' + 
				// IPv6 
				'(?::(?::|(?::[0-9A-Fa-f]{1,4}){1,7}) |[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4}){0,6}::|[0-9A-Fa-f ]{1,4}(?::[0-9A-Fa-f]{1,4}){7})' + 
				// IPv4 
				'|(((25[0-5]|2[0- 4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}' + 
				'(25[ 0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]))$') ; 

	pg.re.stub= RegExp(getValueOf('popupStubRegexp'), 'im'); 
	pg.re.disambig=RegExp(getValueOf('popupDabRegexp'), 'im'); 

//</NOLITE> 
	// FIXME remplace par la fonction d'analyse des paramètres généraux, c'est daft 
	pg.re.oldid=RegExp('[?&]oldid=([^&]*)'); 
	pg.re.diff=RegExp('[?&]diff=([^&]*)');



function setupCache() { 
	// mise en cache des pages 
	pg.cache.pages = []; 
} 

function setMisc() { 
	pg.current.link=null; 
	pg.current.links=[]; 
	pg.current.linksHash={}; 

	setupCache(); 

	pg.timer.checkPopupPosition=null ; 
	pg.counter.loop=0; 

	// les identifiants changent à chaque popup : popupImage0, popupImage1 etc 
	pg.idNumber=0; 

	// pour myDecodeURI 
	pg.misc.decodeExtras = [ 
		{de : '%2C', à : ',' }, 
		{de : '_', à : ' ' }, 
		{de : '%24', à : ' $'}, 
		{de : '%26', à : '&' } // non , 
		]; 

	pg.misc.userAgent = 'Navigation popups/1.0 (' + mw.config.get( ' wgNomServeur' ) +')'; 
}

// Nous avons besoin d'un rappel car cela peut finir par être asynchrone à cause 
// de l'appel mw.loader.using(). 
function setupPopups( callback ) { 
	if ( setupPopups.completed ) { 
		if ( $.isFunction( callback ) ) { 
			callback(); 
		} 
		retour ; 
	} 
	// Ces dépendances sont également appliquées à partir du gadget, 
	// mais tout le monde ne les charge pas en tant que gadget, alors vérifiez bien 
	mw.loader.using( ['mediawiki.util', 'mediawiki.user', 'user.options' ] ).then( function() { 
		// NB les chaînes traduisibles doivent être configurées en premier (strings.js) 
		// les bases 
		setupDebugging(); 
		setSiteInfo(); 
		setTitleBase(); 
		setOptions(); // voir options.js
		setUserInfo(); 

		// espaces de noms, etc. 
		setNamespaces(); 
		setInterwiki(); 

		// expressions régulières 
		setRegexps(); 
		setRedirs(); 

		// autre truc 
		setMisc(); 
		setupLivePreview(); 

		// affaire principale ici 
		setupTooltips(); 
		log('Dans setupPopups(), juste appelé setupTooltips()'); 
		Navpopup.tracker.enable(); 

		setupPopups.completed = true; 
		if ( $.isFunction( callback ) ) { 
			callback(); 
		} 
	}); 
} 
// ENDFILE : init.js 
// STARTFILE : navlinks.js 
//<NOLITE> 
///////////////////////////// /////////////////// 
// liens de navigation... que le plaisir commence
// 

function defaultNavlinkSpec() { 
	var str=''; 
	str += '<b></mainlink|shortcut= >></b>'; 
	if (getValueOf('popupLastEditLink')) { 
		str += '*<<lastEdit|shortcut=/>>|<<lastContrib>>|<<sinceMe>>if(oldid){|<<oldEdit>>|<< diffCur>>}'; 
	} 

	// liens utilisateur 
	// contributions - log - count - email - block 
	// count only if applicable; bloquer uniquement si popupAdminLinks 
	str += 'if(user){<br><<contribs|shortcut=c>>*<<userlog|shortcut=L|log>>'; 
	str+='if(ipuser){*<<arin>>}if(wikimedia){*<<count|shortcut=#>>}'; 
	str+='if(ipuser){}else{*<< email|shortcut=E>>}if(admin){*<<block|shortcut=b>>|<<blocklog|log>>}}' ; 

	// édition des liens
	// page de discussion -> edit|new - history - un|watch - article|edit 
	// autre page -> edit - history - un|watch - talk|edit|new 
	var editstr='<<edit|shortcut=e>> '; 
	var editOldidStr='if(oldid){<<editOld|shortcut=e>>|<<revert|shortcut=v|rv>>|<<edit|cur>>}else{' + editstr + '}' ; 
	var historystr='<<history|shortcut=h>>|<<editors|shortcut=E|>>'; 
	var watchstr='<<unwatch|unwatchShort>>|<<watch|shortcut=w|watchThingy>>'; 

	str+='<br>if(talk){' + 
		editOldidStr+'|<<new|shortcut=+>>' + '*' + historystr+'*'+watchstr + '*' + 
		'<b><<article| raccourci=a>
		'<b><<talk|shortcut=t>></b>|<<editTalk|edit>>|<<newTalk|shortcut=+|new>>}' ; 

	// liens divers 
	str += '<br><<whatLinksHere|shortcut=l>>*<<relatedChanges|shortcut=r>>*<<move|shortcut=m>>'; 

	// admin links 
	str += 'if(admin){<br><<unprotect|unprotectShort>>|<<protect|shortcut=p>>|<<protectlog|log>>*' + 
		'<<undelete|undeleteShort >>|<<delete|shortcut=d>>|<<deletelog|log>>}'; 
	retour str; 
} 

function navLinksHTML (article, hint, params) { //oldid, rcid) { 
	var str = '<span class="popupNavLinks">' + defaultNavlinkSpec() + ' </span>'; 
	// BAM 
	renvoie navlinkStringToHTML(str, article, params); 
} 

fonction expandConditionalNavlinkString(s,article,z,recursionCount) {
	var oldid=z.oldid, rcid=z.rcid, diff=z.diff; 
	// les conditions imbriquées (jusqu'à 10 de profondeur) sont ok, espérons-le ! (travail de l'intérieur vers l'extérieur) 
	if (typeof recursionCount!=typeof 0) { recursionCount=0; } 
	var conditionalSplitRegex=RegExp( 
		//(1 if \\( (2 2) \\) {(3 3)} (4 else {(5 5)} 4)1) 
		'(;?\\s*if\ \s*\\(\\s*([\\w]*)\\s*\\)\\s*\\{([^{}]*)\\}(\\s*else\ \s*\\{([^{}]*?)\\}|))', 'i'); 
	var splitted=s.parenSplit(conditionalSplitRegex); 
	// $1 : conditionnel entier 
	// $2 : condition de test 
	// $3 : développement vrai 
	// $4 : clause else (éventuellement vide) 
	// $5 : développement faux (éventuellement null) 
	var numParens=5; 
	var ret = splitted[0];
	for (var i=1; i<splitted.length; i=i+numParens+1) { 

		var testString=splitted[i+2-1]; 
		var trueString=splitted[i+3-1] ; 
		var falseString=splitted[i+5-1] ; 
		if (typeof falseString=='undefined' || !falseString) { falseString=''; } 
		var testResult=null; 

		switch (testString) { 
		case 'user': 
			testResult=(article.userName())?true:false; 
			Pause; 
		case 'talk' : 
			testResult=(article.talkPage())?false:true ; // talkPage convertit _articles_ en 
			pause talkPages ; 
		case 'admin' : 
			testResult=getValueOf('popupAdminLinks')?true:false; 
			Pause; 
		cas 'oldid' :
			testResult=(typeof oldid != 'undefined' && oldid)?true:false; 
			Pause; 
		case 'rcid': 
			testResult=(typeof rcid != 'undefined' && rcid)?true:false; 
			Pause; 
		case 'ipuser' : 
			testResult=(article.isIpUser())?true:false ; 
			Pause; 
		case 'mainspace_en': 
			testResult=isInMainNamespace(article) && 
				pg.wiki.hostname=='en.wikipedia.org'; 
			Pause; 
		cas 'wikimedia': 
			testResult=(pg.wiki.wikimedia) ? vrai faux; 
			Pause; 
		case 'diff': 
			testResult=(typeof diff != 'undefined' && diff)?true:false; 
			Pause;

		cas nul : ret+=splitd[i] ; Pause; 
		cas vrai : ret+=trueString ; Pause; 
		cas faux : ret+=falseString ; Pause; 
		} 

		// ajoute une chaîne non conditionnelle 
		ret += splitted[i+numParens]; 
	} 
	if (conditionalSplitRegex.test(ret) && recursionCount < 10) { 
		return expandConditionalNavlinkString(ret,article,z,recursionCount+1); 
	} 
	retourne ret; 
} 

function navlinkStringToArray(s, article, params) { 
	s=expandConditionalNavlinkString(s,article,params); 
	var splitted=s.parenSplit(RegExp('<<(.*?)>>')); 
	var ret=[]; 
	for (var i=0; i<splitted.length; ++i) { 
		if (i%2) { // i impair, donc s est une balise
			var t=nouveau navlinkTag(); 
			var ss=splitted[i].split('|'); 
			t.id=ss[0] ; 
			for (var j=1; j<ss.length; ++j) { 
				var sss=ss[j].split('='); 
				if (sss.length>1) { 
					t[sss[0]]=sss[1]; 
				} 
				else { // pas d'affectation (pas de "="), alors traitez-le comme un titre (en écrasant le dernier) 
					t.text=popupString(sss[0]); 
				} 
			} 
			t.article=article; 
			var oldid=params.oldid, rcid=params.rcid, diff=params.diff; 
			if (typeof oldid !== 'undefined' && oldid !== null) { t.oldid=oldid; } 
			if (typeof rcid !== 'undefined' && rcid !== null) { t.rcid=rcid; } 
			if (typeof diff !== 'undefined' && diff !== null) { t.diff=diff; }
			if (!t.text && t.id !== 'mainlink') { t.text=popupString(t.id); } 
			ret.push(t); 
		} 
		else { // HTML brut 
			ret.push(splitted[i]); 
		} 
	} 
	retourne ret; 
} 


function navlinkSubstituteHTML(s) { 
	return s.split('*').join(getValueOf('popupNavLinkSeparator')) 
		.split('<menurow>').join('<li class="popup_menu_row">') 
		. split('</menurow>').join('</li>') 
		.split('<menu>').join('<ul class="popup_menu">') 
		.split('</menu> ').join('</ul>'); 

} 

function navlinkDepth(magic,s) { 
	return s. split('<' + magie + '>').length - s.split('</' + magie + '>').length; 
} 


// navlinkString : * devient le séparateur
// <<foo|bar=baz|fubar>> devient un foo-link avec l'attribut bar='baz' 
// et le texte visible 'fubar' 
// if(test){...} et if(test){ ...}else{...} fonctionne aussi (imbriqué ok) 

function navlinkStringToHTML(s,article,params) { 
	//limitAlert(navlinkStringToHTML, 5, 'navlinkStringToHTML\n' + article + '\n' + (typed'article )); 
	var p=navlinkStringToArray(s,article,params); 
	var html=''; 
	var menudepth = 0; // les menus imbriqués ne sont actuellement pas autorisés, mais ne nuisent pas au code 
	var menurowdepth = 0; 
	for (var i=0; i<p.length; ++i) { 
		if (typeof p[i] == typeof '') { 
			html+=navlinkSubstituteHTML(p[i]); 
			menudepth += navlinkDepth('
			menurowdepth += navlinkDepth('menurow', p[i]); 
// if (menudepth === 0) { 
// tagType='span'; 
// } else if (menurowdepth === 0) { 
// tagType='li'; 
// } else { 
// tagType = null; 
// } 
		} else if (typeof p[i].type != 'undefined' && p[i].type=='navlinkTag') { 
			if (menudepth > 0 && menurowdepth === 0) { 
				html += ' <li class="popup_menu_item">' + p[i].html() + '</li>' ; 
			} else { 
				html+=p[i].html(); 
			} 
		} 
	} 
	renvoie html; 
} 

function navlinkTag() { 
	this.type='navlinkTag';

	this.getNewWin(); 
	this.getPrintFunction(); 
	var html=''; 
	var ouverture, fermeture; 
	var tagType='span'; 
	if (!tagType) { 
		ouverture = ''; fermeture = ''; 
	} else { 
		ouverture = '<' + tagType + ' class="popup_' + this.id + '">'; 
		fermeture = '</' + tagType + '>'; 
	} 
	if (typeof this.print!='function') { 
		errlog ('Oh mon Dieu - fonction d'impression invalide pour un navlinkTag, id='+this.id); 
	} else { 
		html=this.print(this); 
		if (typeof html != typeof '') {html='';} 
		else if (typeof this.shortcut!='undefined') html=addPopupShortcut(html, this. raccourci); 
	} 
	retour ouverture + html + fermeture; 
} ;

navlinkTag.prototype.getNewWin=function() { 
	getValueOf('popupLinksNewWindow'); 
	if (typeof pg.option.popupLinksNewWindow[this.id] === 'undefined') { this.newWin=null; } 
	this.newWin=pg.option.popupLinksNewWindow[this.id] ; 
} ; 

navlinkTag.prototype.getPrintFunction=function() { // réfléchissez un peu plus à cela 
	// this.id et this.article devraient déjà être définis 
	si (typeof this.id!=typeof '' || typeof this.article!=typeof {} ) { revenir; } 

	this.noPopup=1; 
	switch (this.id) { 
	case 'contribs': case 'history': case 'whatLinksHere': 
	case 'userPage': case 'monobook': case 'userTalk': 
	case 'talk': case 'article': case ' 
		lastEdit' : this.noPopup=null ; 
	}
	switch (this.id) { 
	case 'email': case 'contribs': case 'block': case 'unblock': 
	case 'userlog': case 'userSpace': case 'deletedContribs': 
		this.article=this.article. Nom d'utilisateur(); 
	} 

	switch (this.id) { 
	case 'userTalk': case 'newUserTalk': case 'editUserTalk': 
	case 'userPage': case 'monobook': case 'editMonobook': case 'blocklog': 
		this.article=this.article .userName(true); 
		/* 
	échouer */ case 'pagelog': case 'deletelog': case 'protectlog': 
	delete this.oldid; 
	} 

	if (this.id=='editMonobook' || this.id=='monobook') { this.article. append('/monobook.js'); 

	} if (this.id != 'mainlink') {
		// La gestion des ancres FIXME doit être effectuée différemment avec l'objet Title 
		this.article=this.article.removeAnchor(); 
		// if (typeof this.text=='undefined') this.text=popupString(this.id); 
	} 

	switch (this.id) { 
	case 'undelete': this.print=specialLink; this.specialpage='Annuler la suppression'; this.sep='/'; Pause; 
	cas « whatLinksHere » : this.print=specialLink ; this.specialpage='Whatlinkhere'; Pause; 
	cas 'relatedChanges' : this.print=specialLink ; this.specialpage='Recentchangeslinked'; Pause; 
	cas 'move' : this.print=specialLink ; this.specialpage='Movepage'; Pause; 
	cas « contribs » : this.print=specialLink ; this.specialpage='Contributions' ; Pause;
	case 'deletedContribs':this.print=specialLink; this.specialpage='Contributions supprimées'; Pause; 
	cas « e-mail » : this.print=specialLink ; this.specialpage='EmailUser'; this.sep='/'; Pause; 
	cas « bloc » : this.print=specialLink ; this.specialpage='Blockip'; this.sep='&ip='; Pause; 
	cas 'débloquer' : this.print=specialLink ; this.specialpage='Ipblocklist'; this.sep='&action=unblock&ip='; Pause; 
	cas 'userlog' : this.print=specialLink ; this.specialpage='Journal'; this.sep='&user='; Pause; 
	cas 'blocklog' : this.print=specialLink ; this.specialpage='Journal'; this.sep='&type=block&page='; Pause; 
	cas 'pagelog' : this.print=specialLink ; this.specialpage='Journal'; this.sep='&page='; Pause;
	cas 'protectlog' : this.print=specialLink ; this.specialpage='Journal'; this.sep='&type=protect&page='; Pause; 
	cas 'deletelog' : this.print=specialLink ; this.specialpage='Journal'; this.sep='&type=delete&page='; Pause; 
	cas 'userSpace' : this.print=specialLink ; this.specialpage='PrefixIndex'; this.sep='&namespace=2&prefix='; Pause; 
	cas « recherche » : this.print=specialLink ; this.specialpage='Rechercher'; this.sep='&fulltext=Recherche&search='; Pause; 
	cas « merci » : this.print=specialLink ; this.specialpage='Merci'; this.sep='/'; this.article.value = this.diff; Pause; 
	cas 'unwatch': cas 'watch':
		this.print=magicWatchLink; this.action=this.id+'&autowatchlist=1&autoimpl=' + popupString('autoedit_version') + '&actoken='+autoClickToken(); Pause; 
	case 'history' : case 'historyfeed' : 
	case 'unprotect' : case 'protect' : 
		this.print=wikiLink; this.action=this.id; Pause; 

	cas 'supprimer' : 
		this.print=wikiLink ; this.action='delete'; 
		if (this.article.namespaceId()==pg.nsImageId) { 
			var img=this.article.stripNamespace(); 
			this.action+='&image='+img; 
		} 
	pause ; 

	case 'markpatrolled' : 
	case 'edit' : // editOld doit conserver l'ancien, mais pas edit. 
		supprimer this.oldid ;
		this.print=wikiLink; 
		this.action=this.id; Pause; 
	cas « brut » : 
		this.print=wikiLink ; this.action='brut'; Pause; 
	cas « nouveau » : 
		this.print=wikiLink ; this.action='edit§ion=new'; Pause; 
	case 'mainlink': 
		if (typeof this.text=='undefined') { this.text=this.article.toString().entify(); } 
		if (getValueOf('popupSimplifyMainLink') && isInStrippableNamespace(this.article)) { 
			// n'affiche que la partie /sous-page du texte du titre 
			var s=this.text.split('/'); this.text=s[s.length-1] ; 
			if (this.text==='' && s.length > 1) { this.text=s[s.length-2]; } 
		} 
		this.print=titledWikiLink;
		if (typeof this.title==='undefined' && pg.current.link && typeof pg.current.link.href !== 'undefined') { 
			this.title=safeDecodeURI((pg.current.link.originalTitle) ?pg.current.link.originalTitle:this.article); 
			if (typeof this.oldid !== 'undefined' && this.oldid) { 
			this.title=tprintf('Révision %s de %s', [this.oldid, this.title]); 
			} 
		} 
		this.action='vue'; Pause; 
	case 'userPage' : 
	case 'article' : 
	case 'monobook' : 
	case 'editMonobook' : 
	case 'editArticle' : 
		supprimer this.oldid ; 
		//alerte(this.id+'\n'+this.article + '\n'+ typeof this.article); 
			cette.
		//alerte(this.id+'\n'+this.article + '\n'+ typeof this.article); 
		this.print=wikiLink; 
		if (this.id.indexOf('edit')===0) { 
			this.action='edit'; 
		} else { this.action='view';} 
		break; 
	case 'userTalk' : 
	case 'talk' : 
		this.article=this.article.talkPage(); 
		supprimer this.oldid ; 
		this.print=wikiLink; 
		this.action='vue'; Pause; 
	cas 'arin' : 
		this.print=arinLink ; Pause; 
	case 'count' : 
		this.print=editCounterLink ; Pause; 
	cas 'google' : 
		this.print=googleLink ; Pause; 
	cas « éditeurs » : 
		this.print=editorListLink ; Pause;
		this.print=globalSearchLink; Pause; 
	cas 'lastEdit' : 
		this.print=titledDiffLink ; 
		this.title=popupString('Afficher la dernière modification'); 
		this.from='prev'; this.to='cur'; Pause; 
	cas 'oldEdit' : 
		this.print=titledDiffLink ; 
		this.title=popupString('Afficher la modification apportée pour obtenir la révision') + ' ' + this.oldid; 
		this.from='prev'; this.to=this.oldid; Pause; 
	cas 'editOld' : 
		this.print=wikiLink ; this.action='edit'; Pause; 
	cas 'annuler' : 
		this.print=wikiLink ; this.action='edit&undo='; Pause; 
	cas « revenir » : 
		this.print=wikiLink ; this.action='revert'; Pause; 
	cas 'nullEdit' : 
		this.print=wikiLink ; this.action='nullEdit'; Pause;
	cas 'diffCur' : 
		this.print=titledDiffLink ; 
		this.title=tprintf('Afficher les modifications depuis la révision %s', [this.oldid]); 
		this.from=this.oldid; this.to='cur'; Pause; 
	cas 'editUserTalk' : 
	cas 'editTalk' : 
	supprimer this.oldid ; 
		this.article=this.article.talkPage(); 
		this.action='edit'; this.print=wikiLink; Pause; 
	cas 'newUserTalk' : 
	cas 'newTalk' : 
		this.article=this.article.talkPage(); 
		this.action='edit§ion=new'; this.print=wikiLink; Pause; 
	cas 'lastContrib' : 
	cas 'sinceMe' : 
		this.print=magicHistoryLink ; 
	Pause; 
	cas 'togglePreviews' :
		this.text=popupString(pg.option.simplePopups ? 'activer les aperçus' : 'désactiver les aperçus'); 
	/* 
	échouer */ case 'disablePopups': case 'purgePopups': 
		this.print=popupMenuLink; 
	Pause; 
	par défaut : 
		this.print=function () {return 'Type de lien de navigation inconnu : '+this.id+'';} ; 
	} 
} ; 
// 
// fin des liens de navigation 
///////////////////////////////////////// ////// 
//</NOLITE> 
// ENDFILE: navlinks.js 
// STARTFILE: shortkeys.js 
//<NOLITE> 
function popupHandleKeypress(evt) { 
	var keyCode = window.event ? window.event.keyCode : ( evt.keyCode ? evt.keyCode : evt.which);
	if (!keyCode || !pg.current.link || !pg.current.link.navpopup) { return; } 
	if (keyCode==27) { // échappe 
		killPopup(); 
		renvoie faux ; // avaler une touche 
	} 

	var letter=String.fromCharCode(keyCode); 
	var links=pg.current.link.navpopup.mainDiv.getElementsByTagName('A'); 
	var startLink=0; 
	var i,j ; 

	if (popupHandleKeypress.lastPopupLinkSelected) { 
		for (i=0; i<links.length; ++i) { 
			if (links[i]==popupHandleKeypress.lastPopupLinkSelected) { startLink=i; } 
		} 
	} 
	pour (j=0; j<links.length; ++j) { 
		i=(startLink + j + 1) % links.length; 
		if (links[i].getAttribute('popupkey')==letter) {
			if (evt && evt.preventDefault) evt.preventDefault(); 
			liens[i].focus(); 
			popupHandleKeypress.lastPopupLinkSelected=liens[i] ; 
			renvoie faux ; // avaler la pression sur la touche 
		} 
	} 

	// passer la pression sur la touche 
	if (document.oldPopupOnkeypress) { return document.oldPopupOnkeypress(evt); } 
	renvoie vrai ; 
} 

function addPopupShortcuts() { 
	if (document.onkeypress!=popupHandleKeypress) { 
		document.oldPopupOnkeypress=document.onkeypress; 
	} 
	document.onkeypress=popupHandleKeypress; 
} 

fonction rmPopupShortcuts() { 
	popupHandleKeypress.lastPopupLinkSelected=null ; 
	essayer {
		if (document.oldPopupOnkeypress && document.oldPopupOnkeypress==popupHandleKeypress) { 
			// panique 
			document.onkeypress=null; //fonction () {}; 
			revenir; 
		} 
		document.onkeypress=document.oldPopupOnkeypress; 
	} catch (méchants) { /* IE va ici */ } 
} 


function addLinkProperty(html, property) { 
	// prend "<a href=...>...</a> et ajoute une propriété 
	// pas sophistiqué du tout, facilement cassé 
	var i=html.indexOf('>'); 
	if (i<0) { return html; } 
	return html.substring(0,i) + ' ' + property + html.substring(i); 
} 

function addPopupShortcut(html, key) { 
	if (!getValueOf('popupShortcutKeys')) { return html; }
	var ret= addLinkProperty(html, 'popupkey="'+key+'"'); 
	if (key==' ') { key=popupString('spacebar'); } 
	return ret.replace(RegExp('^(.*?)(title=")(.*?)(".*)$', 'i'),'$1$2$3 ['+key+']$4' ); 
} 
//</NOLITE> 
// ENDFILE : raccourcis 
clavier.js // STARTFILE : diffpreview.js 
//<NOLITE> 
// permet de sauter à travers les cerceaux pour trouver les rev ids dont nous avons besoin pour récupérer la 
fonction loadDiff(article, oldid, diff, navpop) { 
	navpop.diffData={ oldRev : {}, newRev : {} } ; 
	mw.loader.using( 'mediawiki.api' ).then( function() { 
		var api = new mw.Api( { 
		    ajax: { 
		        headers: { 'Api-User-Agent': pg.misc. 
		    userAgent } } 
		} ); 
		paramètres var = {
			action : 'comparer', 
			prop : 'ids|title' 
		} ; 
		if(article.title){ 
			params.fromtitle = article.title; 
		} 
		
		switch (diff) { 
			case 'cur': 
				switch ( oldid ) { 
				case null: 
				case '': 
				case 'prev': 
					// cela ne peut fonctionner que si nous avons le titre 
					// cur -> prev 
					params.torelative = ' préc'; 
					Pause; 
				par défaut : 
					params.fromrev = oldid ; 
					params.torelative = 'cur'; 
					Pause; 
				} 
				pause ; 
			case 'prev': 
				if( oldid ) { 
					params.fromrev = oldid;
					params.fromtitle; 
				} 
				params.torelative = 'préc'; 
				Pause; 
			cas 'suivant' : 
				params.fromrev = oldid || 0 ; 
				params.torelative = 'suivant'; 
				Pause; 
			par défaut : 
				params.fromrev = oldid || 0 ; 
				params.torev = diff || 0 ; 
				Pause; 
			} 
		
		api.get( params ).then( function( data ) { 
			navpop.diffData.oldRev.revid = data.compare.fromrevid; 
			navpop.diffData.newRev.revid = data.compare.torevid; 
			
			addReviewLink(navpop, 'popupMiscTools' ); 

			var go = function() { 
				pendingNavpopTask(navpop); 
				var url=pg.wiki.apiwikibase + '?format=json&formatversion=2&
	
				url += 'revids=' + navpop.diffData.oldRev.revid + '|' + navpop.diffData.newRev.revid ; 
				url += '&prop=revisions&rvprop=ids|timestamp|content'; 
			
				getPageWithCaching(url, doneDiff, navpop); 
		
				renvoie vrai ; // supprime le crochet une fois exécuté 
			}; 
			if (navpop.visible || !getValueOf('popupLazyDownloads')) { go(); } 
			else { navpop.addHook(aller, 'afficher', 'avant', 'DOWNLOAD_DIFFS'); } 
		} ); 
	} ); 
} 

// Mettre un lien "mark patrouillé" vers un élément cible 
// A FAIRE : Autoriser une révision à patrouiller, ainsi qu'une 
fonction diff addReviewLink (navpop, target) { 
	if (! pg.user.canReview) return;
	// Si 'newRev' est plus ancien que 'oldRev', cela peut prêter à confusion, nous n'affichons donc pas le lien de révision. 
	if (navpop.diffData.newRev.revid <= navpop.diffData.oldRev.revid) return ; 
	var api = new mw.Api( { 
		    ajax : { en- 
		        têtes : { 'Api-User-Agent' : pg.misc.userAgent } 
		    } 
		} ); 
	var params = { 
		action : 'query', 
		prop : 'info| 
		flaged ', revids : navpop.diffData.oldRev.revid, 
		formatversion : 2 
	} ; 
	api.get (params).then(function(data){ 
		var stable_revid = data.query.pages[0].flagged && data.query.pages[0].flagged.stable_revid || 0;
		// A FAIRE : Autres conditions possibles que l'on peut vouloir implémenter à la place de celle-ci : 
		// * l'ancienne version est patrouillée et la nouvelle version n'est pas patrouillée 
		// * l'ancienne version est patrouillée et la nouvelle version est plus récente que la dernière revue version 
		if (stable_revid == navpop.diffData.oldRev.revid) { 
			var a = document.createElement('a'); 
			a.innerHTML = popupString('marque patrouillé'); 
			a.title=popupString('markpatrolledHint'); 
			a.onclick = function() { 
				var params = { 
					action : 'review', 
					revid : navpop.diffData.newRev.revid, 
					commentaire : tprintf('defaultpopupReviewedSummary', [navpop.diffData.oldRev.revid, navpop.diffData.newRev .revid]) 
				} ;
				api.postWithToken('csrf',params).done(function(){ 
					a.style.display = "none" ; 
					// TODO : mettre à jour la page actuelle et d'autres popups déjà construits 
				} ).fail(function(){ 
					alert( popupString('Impossible de marquer cette modification comme patrouillée')); 
				}); 
			} ; 
			setPopupHTML(a, cible, navpop.idNumber,null,true); 
		} 
	}); 
} 

function doneDiff(download) { 
	if (!download.owner || !download.owner.diffData) { return; } 
	var navpop=download.owner; 
	terminéNavpopTask(navpop); 
	
	pages var, révisions=[]; 
	try{ 
		// Traiter les 
		pages de téléchargement = getJsObj(download.data).query.pages;
		for(var i=0; i < pages.length; i++ ) { 
			revisions = revisions.concat(pages[i].revisions); 
		} 
		for(i=0; i< revisions.length; i++){ 
			if(revisions[i].revid == navpop.diffData.oldRev.revid) { 
				navpop.diffData.oldRev.revision = revisions[i]; 
			} else if (revisions[i].revid == navpop.diffData.newRev.revid) { 
				navpop.diffData.newRev.revision = revisions[i]; 
			} 
		} 
	} catch(someError) { 
		errlog( 'Impossible d'obtenir diff' ); 
	} 
	
	insertDiff(navpop); 
} 

function rmBoringLines(a,b,context) { 

	if (typeof context == 'undefined') { context=2; }
	// c'est assez lent... je pense que c'est plus rapide que de faire un diff basé sur des mots, bien que 
	var aa=[], aaa=[]; 
	var bb=[], bbb=[]; 
	var je, j ; 

	// d'abord, rassemble tous les nœuds déconnectés dans a et tous les nœuds croisés dans a et b 
	pour (i=0; i<a.length; ++i ) { 
		if(!a[i].paired) { aa[i] =1 ; } 
		else if (countCrossings(b,a,i, true)) { 
			aa[i]=1; 
			bb[ a[i].row ] = 1; 
		} 
	} 

	// récupère les nœuds déconnectés restants dans b 
	pour (i=0; i<b.length; ++i ) { 
		if (bb[i]==1) { continue; } 
		if(!b[i].paired) { bb[i]=1; } 
	} 

	// une autre passe pour rassembler le contexte : nous voulons les voisins des nœuds inclus qui ne sont pas encore inclus
	// nous devons ajouter des partenaires de ces nœuds, mais nous ne voulons pas ajouter de contexte pour *ces* nœuds lors de la prochaine passe 
	pour (i=0; i<b.length; ++i) { 
		if ( bb [i] == 1 ) { 
			pour (j=Math.max(0,i-context); j < Math.min(b.length, i+context); ++j) { 
				if ( !bb[j] ) { bb[j] = 1; aa[ b[j].ligne ] = 0,5 ; } 
			} 
		} 
	} 

	for (i=0; i<a.length; ++i) { 
		if ( aa[i] == 1 ) { 
			for (j=Math.max(0,i-context); j < Math .min(a.length, i+context); ++j) { 
				si ( !aa[j] ) { aa[j] = 1; bb[ a[j].row ] = 0.5 ; } 
			} 
		} 
	} 

	for (i=0; i<bb.length; ++i) { 
		if (bb[i] > 0) { // c'est une ligne dont nous avons besoin
			if (b[i].paired) { bbb.push(b[i].text); } // rejoint; le partenaire doit être dans aa 
			else { 
				bbb.push(b[i]); 
			} 
		} 
	} 
	for (i=0; i<aa.length; ++i) { 
		if (aa[i] > 0) { // c'est une ligne dont nous avons besoin 
			if (a[i].paired) { aaa.push (a[i].texte) ; } // rejoint; le partenaire doit être dans aa 
			else { 
				aaa.push(a[i]); 
			} 
		} 
	} 

	return { a: aaa, b: bbb} ; 
} 

function stripOuterCommonLines(a,b,context) { 
	var i=0; 
	while (i<a.length && i < b.length && a[i]==b[i]) { ++i; } 
	var j=a.longueur-1; var k=b.longueur-1 ; 
	while ( j>=0 && k>=0 && a[j]==b[k] ) { --j; --k; }

	return { a: a.slice(Math.max(0,i - 1 - context), Math.min(a.length+1, j + context+1)), 
				b: b.slice(Math.max(0 ,i - 1 - contexte), Math.min(b.longueur+1, k + contexte+1)) } ; 
} 

function insertDiff(navpop) { 
	// pour des raisons de vitesse, nous faisons d'abord un diff basé sur des lignes, écartons les choses qui semblent ennuyeuses, puis faisons un diff basé sur des mots 
	// FIXME : cela donne parfois des différences trompeuses car des morceaux distants sont écrasés ensemble 
	var oldlines = navpop.diffData.oldRev.revision.content.split('\n'); 
	var newlines = navpop.diffData.newRev.revision.content.split('\n'); 
	var inner=stripOuterCommonLines(oldlines,newlines,getValueOf('popupDiffContextLines')); 
	oldlines=interne.a; newlines=interne.b; 
	var tronqué=false ;
	getValueOf('popupDiffMaxLines'); 
	if (oldlines.length > pg.option.popupDiffMaxLines || newlines.length > pg.option.popupDiffMaxLines) { 
		// tronquer 
		tronqué=true; 
		inner=stripOuterCommonLines(oldlines.slice(0,pg.option.popupDiffMaxLines), 
						newlines.slice(0,pg.option.popupDiffMaxLines), 
						pg.option.popupDiffContextLines); 
		oldlines=interne.a; newlines=interne.b; 
	} 

	var lineDiff=diff(anciennes lignes, nouvelles lignes); 
	var lines2=rmBoringLines(lineDiff.o, lineDiff.n); 
	var oldlines2=lines2.a; var newlines2=lines2.b; 

	var simpleSplit = !String.prototype.parenSplit.isNative; 
	var html='<hr />'; 
	if (getValueOf('popupDiffDates')) {
		html += diffDatesTable(navpop); 
		html += '<hr />'; 
	} 
	html += shortenDiffString( 
		diffString(oldlines2.join('\n'), newlines2.join('\n'), simpleSplit), 
		getValueOf('popupDiffContextCharacters') ).join('<hr />'); 
	setPopupTipsAndHTML(html.split('\n').join('<br>') + 
			 (tronqué ? '<hr /><b>'+popupString('Diff tronqué pour des raisons de performances')+'</b> ' : '') , 
				'popupPreview', navpop.idNumber); 
} 

function diffDatesTable( navpop ) { 
	var html='<table class="popup_diff_dates">'; 
	html += diffDatesTableRow( navpop.diffData.newRev.revision, tprintf('Nouvelle révision')); 
	html += diffDatesTableRow( navpop.diffData.oldRev.revision, tprintf('Ancienne révision'));
	html += '</table>'; 
	retour html; 
} 
function diffDatesTableRow( revision, label ) { 
	var txt=''; 
	var lastModifiedDate = new Date(revision.timestamp); 
	var datePrint=getValueOf('popupDiffDatePrinter'); 
	if (typeof lastModifiedDate[datePrint] == ​​'function') { 
		var d2 = AdjustDate(lastModifiedDate, getTimeOffset()); 
		txt = dayFormat(d2, true) + ' ' + timeFormat(d2, true); 
	} else { 
		txt = tprintf('Invalid %s %s', ['popupDiffDatePrinter', datePrint]); 
	} 
	var revlink = generalLink({url: mw.config.get('wgScript') + '?oldid='+revision.revid, 
				   text: label, title: label});
	return simplePrintf('<tr><td>%s</td><td>%s</td></tr>', [ revlink, txt ]); 
} 
//</NOLITE> 
// ENDFILE : diffpreview.js 
// STARTFILE : links.js 
//<NOLITE> 
//////////////////// 
// LINK GENERATION // 
///////////////////// 

// titledDiffLink --> titledWikiLink --> 
generalLink // wikiLink --> titledWikiLink --> 
generalLink // editCounterLink - -> generalLink 

// TODO Faire en sorte que ces fonctions renvoient des objets Element, pas seulement des chaînes HTML brutes. 

function titledDiffLink(l) { // article, texte, titre, de, à) { 
	return titledWikiLink({article : l.article, action : l.to + '&oldid=' + l.from, 
				newWin : l.
				text : l.text, title : l.title, 
				/* hack : no oldid here */ 
				actionName : 'diff'}); 
} 


function wikiLink(l) { 
	//{article:article, action:action, text:text, oldid, newid}) { 
	if (! (typeof l.article == typeof {} && 
		typeof l.action == typeof ' ' && 
		typeof l.text==typeof '')) return null; 
	if (typeof l.oldid == 'undefined') { l.oldid=null; } 
	var saveOldid = l.oldid; 
	if (!/^(edit|view|revert|render)$|^raw/.test(l.action)) { l.oldid=null; } 
	var hint=popupString(l.action + 'Hint'); // revertHint etc etc etc 
	var oldidData=[l.oldid, safeDecodeURI(l.article)]; 
	var revisionString = tprintf('révision %s de %s',
	log('revisionString='+revisionString); 
	switch (l.action) { 
	case 'edit§ion=new': hint = popupString('newSectionHint'); Pause; 
	case 'edit&undo=': 
		if (l.diff && l.diff != 'prev' && saveOldid ) { 
		  l.action += l.diff + '&undoafter=' + saveOldid; 
		} else if (savedOldid) { 
		  l.action += savedOldid; 
		} 
		conseil = popupString('undoHint'); 
		Pause; 
	case 'raw&ctype=text/css' : hint=popupString('rawHint'); Pause; 
	case 'revert' : 
		var p=parseParams(pg.current.link.href); 
		l.action='edit&autoclick=wpSave&actoken=' + autoClickToken() + '&
		if (p.diff=='prev') { 
			l.action += '&direction=prev'; 
			révisionString = tprintf('la révision avant la révision %s de %s', oldidData); 
		} 
		if (getValueOf('popupRevertSummaryPrompt')) { l.action += '&autosummaryprompt=true'; } 
		if (getValueOf('popupMinorReverts')) { l.action += '&autominor=true'; } 
		log('revisionString est maintenant '+revisionString); 
		Pause; 
	case 'nullEdit' : 
		l.action='edit&autoclick=wpSave&actoken=' + autoClickToken() + '&autoimpl=' + popupString('autoedit_version') + '&autosummary=null'; 
		Pause; 
	cas 'historyfeed' : 
		l.action='history& feed=rss'; 
		Pause; 
	cas 'markpatrolled' : 
		l.action='markpatrolled&rcid='+l.rcid;
	} 

	if (hint) { 
		if (l.oldid) { 
			hint = simplePrintf(hint, [revisionString]); 
		} 
		else { 
			hint = simplePrintf(hint, [safeDecodeURI(l.article)]); 
		} 
	} 
	else { 
		hint = safeDecodeURI(l.article + '&action=' + l.action) + (l.oldid) ? '&oldid='+l.oldid : ''; 
	} 

	return titledWikiLink({article : l.article, action : l.action, text : l.text, newWin :l.newWin, 
				title : hint, oldid : l.oldid, noPopup : l.noPopup, onclick : l.onclick }); 
} 

fonction revertSummary(oldid, diff) { 
	var ret=''; 
	if (diff == 'prev') { 
		ret=getValueOf('popupQueriedRevertToPreviousSummary');
	} else { ret = getValueOf('popupQueriedRevertSummary'); } 
	return ret + '&autorv=' + oldid; 
} 

function titledWikiLink(l) { 
	// propriétés possibles de l'argument : 
	// article, action, text, title, oldid, actionName, className, noPopup 
	// oldid = null is fine here 

	// article et action sont des 

	arguments obligatoires if (typeof l.article == 'undefined' || typeof l.action=='undefined') { 
		errlog('got undefined article ou action in titledWikiLink'); 
		renvoie null ; 
	} 

	var base = pg.wiki.titlebase + l.article.urlString(); 
	var URL=base; 

	if (typeof l.actionName=='undefined' || !l.actionName) { l.actionName='action'; }

	// pas besoin d'ajouter &action=view, et cela confond les ancres 
	if (l.action != 'view') { url = base + '&' + l.actionName + '=' + l.action; } 

	if (typeof l.oldid!='undefined' && l.oldid) { url+='&oldid='+l.oldid; } 

	var cssClass=pg.misc.defaultNavlinkClassname ; 
	if (typeof l.className!='undefined' && l.className) { cssClass=l.className; } 

	return generalNavLink({url: url, newWin: l.newWin, 
				title: (typeof l.title != 'undefined') ? l.title : null, 
				text: (typeof l.text!='undefined')?l .text:null, 
				className: cssClass, noPopup:l.noPopup, onclick:l.onclick}); 
} 

pg.fn.getLastContrib = fonction getLastContrib(page wiki,
		processLastContribInfo(x, {page : page wiki, newWin : newWin}); 
	}); 
} ; 

function processLastContribInfo(info, stuff) { 
	if(!info.edits || !info.edits.length) { alert('Popups : une chose étrange s'est produite. Veuillez réessayer.'); revenir; } 
	if(!info.firstNewEditor) { 
		alert(tprintf('Un seul éditeur trouvé : %s a effectué %s modifications', [info.edits[0].editor,info.edits.length])); 
		revenir; 
	} 
	var newUrl=pg.wiki.titlebase + nouveau titre(truc.page).urlString() + '&diff=cur&oldid='+info.firstNewEditor.oldid; 
	displayUrl(newUrl, stuff.newWin); 
} 

pg.fn.getDiffSinceMyEdit = fonction getDiffSinceMyEdit(wikipage, newWin) { 
	getHistoryInfo(wikipage, function(x){
		processDiffSinceMyEdit(x, {page : wikipage, newWin : newWin}); 
	}); 
} ; 

function processDiffSinceMyEdit(info, stuff) { 
	if(!info.edits || !info.edits.length) { alert('Popups : quelque chose de louche s'est produit. Veuillez réessayer.'); revenir; } 
	var friendlyName=truc.page.split('_').join(' '); 
	if(!info.myLastEdit) { 
		alert(tprintf('Impossible de trouver une modification de %s\nin les dernières modifications de %s à\n%s', 
				  [info.userName, getValueOf('popupHistoryLimit'), friendlyName ])); 
		revenir; 
	} 
	if(info.myLastEdit.index === 0) { 
		alert(tprintf("%s semble être le dernier éditeur de la page %s", [info.userName, friendlyName])); 
		revenir; 
	}
	var newUrl=pg.wiki.titlebase + nouveau titre(truc.page).urlString() + '&diff=cur&oldid='+ info.myLastEdit.oldid; 
	displayUrl(newUrl, stuff.newWin); 
} 

function displayUrl(url, newWin){ 
	if(newWin) { window.open(url); } 
	else { document.location=url; } 
} 

pg.fn.purgePopups = function purgePopups() { 
	processAllPopups(true); 
	setupCache(); // supprime tous les éléments mis en cache (pas mis en cache par le navigateur, cependant...) 
	pg.option={}; 
	abandonnerTousTéléchargements(); 
} ; 

function processAllPopups(nullify, banish) { 
	pour (var i=0; pg.current.links && i<pg.current.links.length; ++i) { 
		if (!pg.current.links[i].navpopup) { Continuez; }
		if (annuler || bannir) pg.current.links[i].navpopup.banish(); 
		pg.current.links[i].simpleNoMore=false ; 
		if (annuler) pg.current.links[i].navpopup=null ; 
	} 
} 

pg.fn.disablePopups = function disablePopups(){ 
	processAllPopups(false, true); 
	setupTooltips(null, true); 
} ; 

pg.fn.togglePreviews = function togglePreviews() { 
	processAllPopups(true, true); 
	pg.option.simplePopups=!pg.option.simplePopups; 
	abandonnerTousTéléchargements(); 
} ; 

function magicWatchLink(l) { 
	//Beurk !! Cela nécessiterait une refonte en profondeur pour ajouter cela en tant qu'événement de clic cependant ...
	l.onclick = simplePrintf( 'pg.fn.modifyWatchlist(\'%s\',\'%s\');return false;', [l.article.toString(true).split("\\") .join("\\\\").split("'").join("\\'"), this.id] ); 
	renvoie wikiLink(l); 
} 

pg.fn.modifyWatchlist = function modifyWatchlist(title, action) { 
	var reqData = { 
		'action': 'watch', 
		'formatversion': 2, 
		'titles': title, 
		'uselang': mw.config.get(' wgLangueUtilisateur') 
	} ; 
	if ( action === 'unwatch' ) reqData.unwatch = true; 

	var api = new mw.Api( { 
	    ajax : { en- 
	        têtes : { 'Api-User-Agent' : pg.misc. 
	    userAgent } } 
	} ); 
	// Charge le message Addedwatchtext ou Removedwatchtext et l'affiche
	var mwTitle = mw.Title.newFromText( title ); 
	var nom_message; 
	if ( mwTitle && mwTitle.getNamespaceId() > 0 && mwTitle.getNamespaceId() % 2 === 1 ) { 
		messageName = action === 'watch' ? 'addwatchtext-talk' : 'removedwatchtext-talk'; 
	} else { 
		messageName = action === 'regarder' ? 'addwatchtext' : 'removedwatchtext'; 
	} 
	$ 
		.when ( api.postWithToken( 'watch', reqData ), 
		mw.loader.using( [ 'mediawiki.api.messages', 'mediawiki.jqueryMsg' ] ).then( function () { 
			return api.loadMessagesIfMissing( [ messageName ] ); 
		} ) 
	).done( function () { 
		mw.notify( mw.message( messageName, title ).parseDom() ); 
	} ); 
} ;

function magicHistoryLink(l) { 
	// FIXME utilise l'astuce onclick change href pour trier cela au lieu de window.open 

	var jsUrl='', title='', onClick=''; 
	switch(l.id) { 
	case 'lastContrib': 
		onClick=simplePrintf('pg.fn.getLastContrib(\'%s\',%s)', 
			[l.article.toString(true).split("\\ ").join("\\\\").split("'").join("\\'"), l.newWin]); 
		title=popupString('lastContribHint'); 
		Pause; 
	case 'sinceMe' : 
		onClick=simplePrintf('pg.fn.getDiffSinceMyEdit(\'%s\',%s)', 
			[l.article.toString(true).split("\\").join("\ \\\").split("'").join("\\'"), l.newWin]); 
		title=popupString('depuisMeHint'); 
		Pause; 
	}
	jsUrl = 'javascript:' + onClick ; // jshint ignore:line 
	onClick += ';return false;'; 

	return generalNavLink({url: jsUrl, newWin: false, // ne peut pas avoir de nouvelles fenêtres avec des liens JS, je pense 
				title: title, text: l.text, noPopup: l.noPopup, onclick: onClick }); 
} 

function popupMenuLink(l) { 
	var jsUrl=simplePrintf('javascript:pg.fn.%s()', [l.id]); // jshint ignore:line 
	var title=popupString(simplePrintf('%sHint', [l.id])); 
	var onClick=simplePrintf('pg.fn.%s();return false;', [l.id]); 
	return generalNavLink({url: jsUrl, newWin:false, title:title, text:l.text, noPopup:l.noPopup, onclick: onClick}); 
} 

function specialLink(l) { 
	// propriétés : article, page spéciale,
	if (typeof l.specialpage=='undefined'||!l.specialpage) renvoie null ; 
	var base = pg.wiki.titlebase + mw.config.get('wgFormattedNamespaces')[pg.nsSpecialId]+':'+l.specialpage; 
	if (typeof l.sep == 'undefined' || l.sep === null) l.sep='&target='; 
	var article=l.article.urlString({keepSpaces: l.specialpage=='Search'}); 
	var hint=popupString(l.specialpage+'Hint'); 
	switch (l.specialpage) { 
	case 'Log': 
		switch (l.sep) { 
		case '&user=': hint=popupString('userLogHint'); Pause; 
		case '&type=block&page=': hint=popupString('blockLogHint'); Pause; 
		case '&page=': hint=popupString('pageLogHint'); Pause; 
		case '&type=protect&page=': hint=popupString('protectLogHint'); Pause;
		case '&type=delete&page=': hint=popupString('deleteLogHint'); Pause; 
		par défaut : log('Type de journal inconnu, sep=' + l.sep); hint='Indice manquant (FIXME)'; 
		} 
		pause ; 
	case 'PrefixIndex' : article += '/'; Pause; 
	} 
	if (indice) indice = simplePrintf(indice, [safeDecodeURI(l.article)]); 
	else indice = safeDecodeURI(l.specialpage+':'+l.article) ; 

	var url = base + l.sep + article ; 
	return generalNavLink({url : url, titre : conseil, texte : l.text, newWin:l.newWin, noPopup:l.noPopup}); 
} 

function generalLink(l) { 
	// l.url, l.text, l.title, l.newWin, l.className, l.noPopup, l.onclick 
	if (typeof l.url=='undefined') return null ;
; 
	} if (typeof l.className!='undefined'&&l.className) { ret+=' class="'+l.className+'"'; } 
	ret += '>';

	if (typeof l.text==typeof '') { ret+= l.text; } 
	ret +='</a>'; 
	retour ret ; 
} 

function appendParamsToLink(linkstr, params) { 
	var sp=linkstr.parenSplit(RegExp('(href="[^"]+?)"', 'i')); 
	if (sp.length<2) return null; 
	var ret=sp.shift() + sp.shift(); 
	ret += '&' + params + '"'; 
	ret += sp.join(''); 
	retour ret ; 
} 

function changeLinkTargetLink(x) { // newTarget, text, hint, summary, clickButton, minor, title (facultatif) { 
	if (x.newTarget) { 
		log ('changeLinkTargetLink: newTarget=' + x.newTarget); 
	} 
	if (x.oldTarget !== decodeURIComponent( x.
	} 

	// FIXME : le premier caractère du titre de la page ainsi que l'espace de noms doivent être insensibles à la casse 
	// par exemple [[category:X1]] et [[Category:X1]] sont équivalents 
	// cela se brisera si charAt(0) est méchant 
	var cA=literalizeRegex(x.oldTarget); 
	var chs=cA.charAt(0).toUpperCase(); 
	chs='['+chs + chs.toLowerCase()+']'; 
	var currentArticleRegexBit=chs+cA.substring(1) ; 
	currentArticleRegexBit=currentArticleRegexBit 
		.split(RegExp('(?:[_ ]+|%20)', 'g')).join('(?:[_ ]+|%20)') 
		.split('\\ (').join('(?:%28|\\()') 
		.split('\\)').join('(?:%29|\\))'); // pourquoi cela doit-il correspondre aux chaînes encodées ? liens dans le document ? 
	// les espaces de début et de fin doivent être ignorés et les bits d'ancrage facultatifs :
	currentArticleRegexBit = '\\s*(' + currentArticleRegexBit + '(?:#[^\\[\\|]*)?)\\s*'; 
	// par exemple Ordinateur (archaïque) -> \s*([Cc]ordinateur[_ ](?:%2528|\()archaic(?:%2528|\)))\s* 

	// autoedit=s~\ [\[([Cc]ad)\]\]~[[conception assistée par ordinateur%20|$1]]~g;s~\[\[([Cc]AD)[|]~[[% assisté par ordinateur 20design|~g 

	var title=x.title || mw.config.get('wgPageName').split('_').join(' '); 
	var lk=titledWikiLink({article : nouveau titre(titre), nouvelleWin :x.newWin, 
						action : 'edit', 
						texte : x.text, 
						titre : x.hint, 
						className : 'popup_change_title_link' 
						}); 
	var cmd=''; 
	if (x.newTarget) { 
		// échappe '&' et autres méchants 
		var t=x.
		var s=literalizeRegex(x.newTarget); 
		cmd += 's~\\[\\['+currentArticleRegexBit+'\\]\\]~[['+t+'|$1]]~g;'; 
		cmd += 's~\\[\\['+currentArticleRegexBit+'[|]~[['+t+'|~g;'; 
		cmd += 's~\\[\\['+s + '\\|' + s + '\\]\\]~[[' + t + ']]~g'; 
	} else { 
		cmd += 's~\\[\\['+currentArticleRegexBit+'\\]\\]~$1~g;'; 
		cmd += 's~\\[\\['+currentArticleRegexBit+'[|](.*?)\\]\\]~$2~g'; 
	} 
	// Construire la requête 
	cmd = 'autoedit=' + encodeURIComponent ( cmd ); 
	cmd += '&autoclick='+ encodeURIComponent( x.clickButton ) + '&actoken=' + encodeURIComponent( autoClickToken() ); 
	cmd += ( x.minor === null ) ? '
	cmd += ( x.watch === null ) ? '' : '&autowatch='+ encodeURIComponent( x.watch ); 
	cmd += '&autosummary='+encodeURIComponent(x.summary); 
	cmd += '&autoimpl='+encodeURIComponent( popupString('autoedit_version') ); 
	return appendParamsToLink(lk, cmd); 
} 


function redirLink(redirMatch, article) { 
	// NB redirMatch est dans wikiText 
	var ret=''; 

	if (getValueOf('popupAppendRedirNavLinks') && getValueOf('popupNavLinks')) { 
		ret += '<hr />'; 
		if (getValueOf('popupFixRedirs') && typeof autoEdit != 'undefined' && autoEdit) { 
			log('redirLink: newTarget=' + redirMatch);
				texte : popupString('Redirects'), 
				indice : popupString('Corriger cette redirection'), 
				résumé : simplePrintf(getValueOf('popupFixRedirsSummary'),[article.toString(), redirMatch]), 
				oldTarget : article.toString(), 
				clickButton : getValueOf('popupRedirAutoClick'), 
				minor : true, 
				watch : getValueOf('popupWatchRedirredPages') 
			}), 'R'); 
			ret += popupString(' à '); 
		} 
		else ret += popupString('Redirects') + popupString(' to '); 
		retour ret ; 
	} 

	else return '<br> ' + popupString('Redirects') + popupString(' to ') + 
			 titledWikiLink({article: new Title().
							  texte : safeDecodeURI(redirMatch), titre : popupString('Contourner la redirection')}); 
} 

function arinLink(l) { 
	if (!saneLinkCheck(l)) { return null; } 
	si ( ! l.article.isIpUser() || ! pg.wiki.wikimedia) renvoie null ; 

	var uN=l.article.userName(); 

	return generalNavLink({url:'http://ws.arin.net/cgi-bin/whois.pl?queryinput=' + encodeURIComponent(uN), newWin:l.newWin, 
				titre: tprintf('Recherchez %s dans ARIN whois database', [uN]), 
				text : l.text, noPopup:1}); 
} 

function toolDbName(cookieStyle) { 
	var ret = mw.config.get('wgDBname'); 
	if (!cookieStyle) { ret+= '_p'; } 
	retourne ret; 
} 

fonction saneLinkCheck(l) {
	if (typeof l.article != typeof {} || typeof l.text != typeof '') { return false; } 
	renvoie vrai ; 
} 
fonction editCounterLink(l) { 
	if(!saneLinkCheck(l)) return null; 
	si (! pg.wiki.wikimedia) renvoie null ; 
	var uN=l.article.userName(); 
	var tool=getValueOf('popupEditCounterTool'); 
	URL de la variable ; 
	var defaultToolUrl='//tools.wmflabs.org/supercount/index.php?user=$1&project=$2.$3'; 

	switch(tool) { 
	case 'custom': 
		url=simplePrintf(getValueOf('popupEditCounterUrl'), [ encodeURIComponent(uN), toolDbName() ]); 
		Pause; 
	case 'soxred' : // n'est plus disponible 
	case 'kate' : // n'est plus disponible 
	case '
		/* 
		échouer */ 
	case 'supercount' : 
	par défaut : var theWiki=pg.wiki.hostname.split('.'); 
		url=simplePrintf(defaultToolUrl, [ encodeURIComponent(uN), theWiki[0], theWiki[1] ]); 
	} 
	return generalNavLink({url:url, title: tprintf('editCounterLinkHint', [uN]), 
				newWin:l.newWin, text: l.text, noPopup:1}); 
} 


function globalSearchLink(l) { 
	if(!saneLinkCheck(l)) return null; 

	var base='http://vs.aka-online.de/cgi-bin/globalwpsearch.pl?timeout=120&search='; 
	var article=l.article.urlString({keepSpaces:true}); 

	return generalNavLink({url:base + article, newWin:l.newWin, 
				titre: tprintf('globalSearchHint', [safeDecodeURI(l.article)]),
				text : l.text, noPopup:1}); 
} 

function googleLink(l) { 
	if(!saneLinkCheck(l)) return null; 

	var base='https://www.google.com/search?q='; 
	var article=l.article.urlString({keepSpaces:true}); 

	return generalNavLink({url:base + '%22' + article + '%22', newWin:l.newWin, 
				titre: tprintf('googleSearchHint', [safeDecodeURI(l.article)]), 
				text: l.text, noPopup:1}); 
} 

fonction editorListLink(l) { 
	if(!saneLinkCheck(l)) return null; 
	var article= l.article.articleFromTalkPage() || l.article; 
	var url='https://xtools.wmflabs.org/articleinfo/' + 
		encodeURI( pg.wiki.hostname ) + '/' + 
		article.urlString() +
		'?uselang=' + mw.config.get('wgUserLanguage'); 
	return generalNavLink({url:url, 
				title: tprintf('editorListHint', [article]), 
				newWin:l.newWin, text: l.text, noPopup:1}); 
} 

function generalNavLink(l) { 
	l.className = (l.className === null) ? 'popupNavLink' : l.className; 
	return generalLink(l); 
} 

////////////////////////////////////////////////////////////// / 
// liens d'histoire magique 
// 

fonction getHistoryInfo (wikipage, WhatNext) { 
	log ( 'getHistoryInfo'); 
	getHistory (wikipage, whatNext ? function(d){whatNext(processHistory(d));} : processHistory); 
} 

// FIXME élimine pg.idNumber ... comment ? :-(

function getHistory(wikipage, onComplete) { 
	log('getHistory'); 
	var url = pg.wiki.apiwikibase + '?format=json&formatversion=2&action=query&prop=revisions&titles=' + 
			new Title(wikipage).urlString() + '&rvlimit=' + getValueOf('popupHistoryLimit'); 
	log('getHistory: url='+url); 
	return startDownload(url, pg.idNumber+'history', onComplete); 
} 

fonction processHistory (télécharger) { 
	var jsobj = getJsObj (télécharger.data); 
	try { 
		var revisions = anyChild(jsobj.query.pages).revisions; 
		var modifications=[]; 
		for (var i=0; i<revisions.length; ++i) { 
			edits.push({ oldid: revisions[i].revid, editor: revisions[i].user }); 
		}
		log('traité ' + edits.length + ' edits'); 
		return finishProcessHistory( edits, mw.config.get('wgUserName') ); 
	} catch (someError) { 
		log('Quelque chose s'est mal passé avec l'entreprise JSON'); 
		return finishProcessHistory([]); 
	} 
} 


function finishProcessHistory(edits, userName) { 
	var histInfo={}; 

	histInfo.edits=édites ; 
	histInfo.userName=userName; 

	for (var i=0; i<edits.length; ++i) { 
		if (typeof histInfo.myLastEdit === 'undefined' && userName && edits[i].editor==userName) { 
			histInfo.myLastEdit={index : i, oldid : edits[i].oldid, previd : (i === 0 ? null : edits[i-1].oldid)} ; 
		}
		if (typeof histInfo.firstNewEditor === 'undefined' && edits[i].editor != edits[0].editor) { 
			histInfo.firstNewEditor={index:i, ​​oldid:edits[i].oldid, previd: ( i === 0 ? null : edits[i-1].oldid)} ; 
		} 
	} 
	//pg.misc.historyInfo=histInfo; 
	retourner histInfo ; 
} 
//</NOLITE> 
// ENDFILE : links.js 
// STARTFILE : options.js 
//////////////////////////// //////////////////// 
// options 

// vérifier la valeur existante, sinon utiliser la 
fonction par défaut defaultize(x) { 
	if (pg.option[x]== =null || typeof pg.option[x]=='undefined') { 
		if (typeof window[x] != 'undefined' ) pg.option[x]=window[x]; 
		else pg.option[x]=pg.optionDefault[x] ;
} 

fonction newOption(x, def) { 
	pg.optionDefault[x]=def; 
} 

fonction setDefault(x, def) { 
	return newOption(x, def); 
} 

fonction getValueOf(varName) { 
	defaultize(varName); 
	return pg.option[varName] ; 
} 

/*eslint-disable */ 
function useDefaultOptions() { // pour tester 
	(var p dans pg.optionDefault) { 
		pg.option[p]=pg.optionDefault[p]; 
		if (typeof window[p]!='undefined') { delete window[p]; } 
	} 
} 
/*eslint-enable */ 

function setOptions() { 
	// Paramètres et valeurs par défaut 
	définissables par l'utilisateur var userIsSysop = false; 
	if ( mw.config.get('wgUserGroups') ) {
		for ( var g = 0; g < mw.config.get('wgUserGroups').length; ++g ) { 
			if ( mw.config.get('wgUserGroups')[g] == "sysop" ) 
				userIsSysop = vrai; 
		} 
	} 

	// Options de base 
	newOption('popupDelay', 0.5); 
	newOption('popupHideDelay', 0.5); 
	newOption('simplePopups', false); 
	newOption('popupStructure', 'shortmenus'); // voir plus tard - la valeur par défaut pour popupStructure est 'original' si simplePopups est true 
	newOption('popupActionsMenu', true); 
	newOption('popupSetupMenu', true); 
	newOption('popupAdminLinks', userIsSysop);
	newOption('popupHistoricalLinks', true); 
	newOption('popupOnlyArticleLinks', true); 
	newOption('removeTitles', true); 
	newOption('popupMaxWidth', 350); 
	newOption('popupSimplifyMainLink', true); 
	newOption('popupAppendRedirNavLinks', true); 
	newOption('popupTocLinks', false); 
	newOption('popupSubpopups', true); 
	newOption('popupDragHandle', false /* 'popupTopLinks'*/); 
	newOption('popupLazyPreviews', true); 
	newOption('popupLazyDownloads', true); 
	newOption('popupAllDabsStubs', false); 
	newOption('popupDebugging', faux); 
	newOption('popupActiveNavlinks', true);
	newOption('popupModifier', false); // ctrl, shift, alt ou meta 
	newOption('popupModifierAction', 'enable'); // ou 'désactiver' 
	newOption('popupDraggable', true); 
	newOption('popupReview', false); 

//<NOLITE> 
	// images 
	newOption('popupImages', true); 
	newOption('imagePopupsForImages', true); 
	newOption('popupNeverGetThumbs', false); 
	//newOption('popupImagesToggleSize', true); 
	newOption('popupThumbAction', 'imagepage'); //'sizetoggle'); 
	newOption('popupImageSize', 60); 
	nouvelleOption(' popupImageSizeLarge', 200); 

	// redirs, dabs, reversion
	newOption('popupFixRedirs', false); 
	newOption('popupRedirAutoClick', 'wpDiff'); 
	newOption('popupFixDabs', false); 
	newOption('popupDabsAutoClick', 'wpDiff'); 
	newOption('popupRevertSummaryPrompt', false); 
	newOption('popupMinorReverts', false); 
	newOption('popupRedlinkRemoval', false); 
	newOption('popupRedlinkAutoClick', 'wpDiff'); 
	newOption('popupWatchDisambiggedPages', null); 
	newOption('popupWatchRedirredPages', null); 
	newOption('popupDabWiktionary', 'last'); 

	// navlinks 
	newOption('popupNavLinks', vrai); 
	newOption('popupNavLinkSeparator', ' ⋅ ');
	newOption('popupLastEditLink', true); 
	newOption('popupEditCounterTool', 'supercount'); 
	newOption('popupEditCounterUrl', ''); 
//</NOLITE> 

	// aperçus etc 
	newOption('popupPreviews', true); 
	newOption('popupSummaryData', true); 
	newOption('popupMaxPreviewSentences', 5); 
	newOption('popupMaxPreviewCharacters', 600); 
	newOption('popupLastModified', true); 
	newOption('popupPreviewKillTemplates', true); 
	newOption('popupPreviewRawTemplates', true); 
	newOption('popupPreviewFirstParOnly', true); 
	newOption('popupPreviewCutHeadings', true);
	newOption('popupPreviewButtonEvent', 'click'); 

//<NOLITE> 
	// diffs 
	newOption('popupPreviewDiffs', true); 
	newOption('popupDiffMaxLines', 100); 
	newOption('popupDiffContextLines', 2); 
	newOption('popupDiffContextCharacters', 40); 
	newOption('popupDiffDates', true); 
	newOption('popupDiffDatePrinter', 'toLocaleString'); 

	// modifier les résumés. Dieu, ils sont laids. 
	newOption('popupReviewedSummary', popupString('defaultpopupReviewedSummary') ); 
	newOption('popupFixDabsSummary', popupString('defaultpopupFixDabsSummary') ); 
	nouvelleOption('
	newOption('popupRevertSummary', popupString('defaultpopupRevertSummary') ); 
	newOption('popupRevertToPreviousSummary', popupString('defaultpopupRevertToPreviousSummary') ); 
	newOption('popupQueriedRevertSummary', popupString('defaultpopupQueriedRevertSummary') ); 
	newOption('popupQueriedRevertToPreviousSummary', popupString('defaultpopupQueriedRevertToPreviousSummary') ); 
	newOption('popupFixRedirsSummary', popupString('defaultpopupFixRedirsSummary') ); 
	newOption('popupRedlinkSummary', popupString('defaultpopupRedlinkSummary') ); 
	newOption('popupRmDabLinkSummary', popupString('defaultpopupRmDabLinkSummary') );
	newOption('popupHistoryLimit', 50); 
//<NOLITE> 
	newOption('popupFilters', [popupFilterStubDetect, popupFilterDisambigDetect, 
					       popupFilterPageSize, popupFilterCountLinks, 
					       popupFilterCountImages, popupFilterCountCategories, 
					       popupFilterLastModified]); 
	newOption('extraPopupFilters', []); 
	newOption('popupOnEditSelection', 'cursor'); 
	newOption('popupPreviewHistory', true); 
	newOption('popupImageLinks', true); 
	newOption('popupCategoryMembers', true); 
	newOption('popupUserInfo', true); 
	newOption('popupHistoryPreviewLimit',
	newOption('popupContribsPreviewLimit',25); 
	newOption('popupRevDelUrl', '//en.wikipedia.org/wiki/Wikipedia:Revision_deletion'); 
	newOption('popupShowGender', true); 
//</NOLITE> 

	// nouvelles fenêtres 
	newOption('popupNewWindows', false); 
	newOption('popupLinksNewWindow', {'lastContrib': true, 'depuisMe': true}); 

	// regexps 
	newOption('popupDabRegexp', '(\\{\\{\\s*disambig(?! uation required)|disambig(uation|)\\s*\\}\\}|disamb\\s* \\}\\}|dab\\s*\\}\\})|\\{\\{\\s*(((geo|hn|road?|school|number)dis)|[234] [lc][acw]|(road|ship)index)(\\s*[|][^}]*) ?\\s*[}][}]|est une .*homonymie.*page') ; 
	newOption('popupAnchorRegexp', 'ancres?');
	newOption('popupStubRegexp', '(sect)?stub[}][}]|Cet article lié au .* est un .*stub'); 
	newOption('popupImageVarsRegexp', 'image|image_(?:file|skyline|name|flag|seal)|cover|badge|logo'); 
} 
// ENDFILE : options.js 
// STARTFILE : strings.js 
//<NOLITE> 
///////////////////////////// /////////////////// 
// Chaînes traduisibles 
///////////////////////// /////////////////////// 
// 
// Voir les instructions sur 
// https://en.wikipedia.org/wiki/Wikipedia:Tools/Navigation_popups /Translation 

pg.string = { 
	/////////////////////////////////// 
	// données récapitulatives, recherche etc. 
	////////////////////////////////// 
	'article': '
	'category': 'category', 
	'categories': 'categories', 
	'image': 'image', 
	'images': 'images', 
	'stub': 'stub', 
	'section stub': 'section stub', 
	'Page vide' : 'Page vide', 
	'ko' : 'ko', 
	'octets' : 'octets', 
	'jour' : 'jour', 
	'jours' : 'jours', 
	'heure' : 'heure', 
	'heures' : 'heures', 
	'minute' : 'minute', 
	'minutes' : 'minutes', 
	'seconde' : 'seconde', 
	'secondes' : 'secondes', 
	'semaine' : 'week', 
	'weeks' : 'weeks', 
	'search' : 'search', 
	'SearchHint' : 'Trouver des articles Wikipédia en anglais contenant %s', 
	'web' : 'web', 
	'global' : 'global',
	'globalSearchHint' : 'Recherche sur Wikipedias dans différentes langues pour %s', 
	'googleSearchHint' : 'Google pour %s', 
	/////////////////////// ///////////// 
	// actions et informations relatives à l'article 
	// (certaines actions s'appliquent également aux pages utilisateur) 
	//////////////// /////////////////// 
	'actions' : 'actions', ///// afficher les articles et afficher la discussion 
	'popupsMenu' : 'popups', 
	'togglePreviewsHint' : « Activer la génération d'aperçus dans les fenêtres contextuelles de cette page », 
	« activer les aperçus » : « activer les aperçus », 
	« désactiver les aperçus » : « désactiver les aperçus », 
	« activer les aperçus » : « activer les aperçus », 
	« afficher l'aperçu » : »show preview', 
	'reset' : 'reset', 
	'more...' : 'more...',
	'disable' : 'désactiver les popups', 
	'disablePopupsHint' : 'désactiver les popups sur cette page. Recharger la page pour la réactiver.', 
	'historyfeedHint': 'Flux RSS des modifications récentes apportées à cette page', 
	'purgePopupsHint': 'Réinitialiser les popups, effacer toutes les données contextuelles mises en cache.', 
	'PopupsHint': 'Réinitialiser les popups, effacer tout données contextuelles mises en cache.', 
	'barre d'espace': 'espace', 
	'view': 'view', 
	'view article': 'view article', 
	'viewHint': 'Go to %s', 
	'talk': 'talk' , 
	'page de discussion' : 'page de discussion', 
	'cette révision' : 'cette révision', 
	'
	'Basculer la taille de l'image' : 'Cliquer pour changer la taille de l'image', 
	'del' : 'del', ///// supprimer, protéger, déplacer 
	'delete' : 'delete', 
	'deleteHint' : 'Delete %s', 
	'undeleteShort': 'un', 
	'UndeleteHint': 'Afficher l'historique des suppressions pour %s', 
	'protect': 'protect', 
	'protectHint': 'Restreindre les droits d'édition à %s', 
	'unprotectShort': 'un' , 
	'unprotectHint': 'Autoriser %s à être modifié par n'importe qui à nouveau', 
	'envoyer des remerciements': 'envoyer des remerciements', 
	'ThanksHint': 'Envoyer une notification de remerciement à cet utilisateur', 
	'move': 'move', 
	'move page' : 'move page', 
	'MovepageHint' : 'Change the title of %s', 
	'edit' : 'edit', ///// edit articles and talk
	'edit article' : 'edit article', 
	'editHint' : 'Modifier le contenu de %s', 
	'edit talk' : 'edit talk', 
	'new' : 'new', 
	'new topic' : 'new topic' , 
	'newSectionHint': 'Démarrer une nouvelle section sur %s', 
	'null edit': 'null edit', 
	'nullEditHint': 'Soumettre une modification à %s, sans apporter de modifications', 
	'hist': 'hist', ///// history, diffs, editors, related 
	'history': 'history', 
	'historyHint': 'Liste les modifications apportées à %s', 
	'last': 'prev', // Pour étiqueter la révision précédente dans pages d'histoire; la clé est "dernière"
	« Impossible de marquer cette modification comme patrouillée » : « Impossible de marquer cette modification comme patrouillée », 
	« afficher la dernière modification » : « la modification la plus récente », 
	« Afficher la dernière modification » : « Afficher les effets de la modification la plus récente », 
	'lastContrib' : 'lastContrib', 
	'dernier ensemble de modifications' : 'dernières modifications', 
	'lastContribHint' : 'Afficher l'effet net des modifications apportées par le dernier éditeur', 
	'cur' : 'cur', 
	'diffCur' : 'diffCur', 
	'Afficher les modifications depuis la révision %s' : 'Afficher les modifications depuis la révision %s', 
	'%s old' : '%s old', // comme dans 4 semaines 
	'oldEdit' : 'oldEdit', 
	' purge': 'purge',
	'purgeHint' : 'Demander une nouvelle copie de %s', 
	'raw' : 'source', 
	'rawHint' : 'Télécharger la source de %s',
	'render' : 'simple', 
	'renderHint' : 'Afficher une version HTML simple de %s', 
	'Afficher la modification effectuée pour obtenir la révision' : 'Afficher la modification effectuée pour obtenir la révision', 
	'sinceMe' : 'sinceMe' , 
	'changes since mine': 'diff my edit', 
	'inceMeHint': 'Afficher les modifications depuis ma dernière modification', 
	'Impossible de trouver une modification par %s\nin les dernières %s modifications à\n%s' : 'Impossible de trouver une modification de %s\nin les dernières modifications de %s à\n%s', 
	'eds': 'eds', 
	'editors': 'editors', 
	'editorListHint': 'Liste les utilisateurs qui ont modifié %s', 
	'related' : 'related', 
	'relatedChanges' : 'relatedChanges', 
	'related changes' : 'related changes', 
	'RecentchangeslinkedHint' : 'Afficher les changements dans les articles liés à %s',
	'editOld' : 'editOld', ///// édite l'ancienne version, ou rétablit 
	'rv' : 'rv', 
	'revert' : 'revert', 
	'revertHint' : 'Revert to %s', 
	'defaultpopupReviewedSummary' : 'Accepté en examinant la [[Special:diff/%s/%s|difference]] entre cette version et la version précédemment acceptée en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupRedlinkSummary' : 'Suppression lien vers une page vide [[%s]] à l'aide de [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupFixDabsSummary' : 'Lever l'ambiguïté de [[%s]] à [[%s]] à l'aide de [[ : fr:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupFixRedirsSummary': 'Rediriger le contournement de [[%s]] vers [[%s]] en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]',
	'defaultpopupExtendedRevertSummary': 'Revenir à la révision datée du %s par %s, oldid %s en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupRevertToPreviousSummary': 'Revenir à la révision antérieure à la révision %s en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupRevertSummary': 'Revenir à la révision %s en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupQueriedRevertToPreviousSummary': ' la révision antérieure à la révision $1 datée de $2 sur $3 en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'defaultpopupQueriedRevertSummary': 'Revenir à la révision $1 datée de $2 sur $3 en utilisant [[:en:Wikipedia:Tools/ Navigation_popups|popups]]',
	'defaultpopupRmDabLinkSummary': 'Supprimer le lien vers la page dab [[%s]] en utilisant [[:en:Wikipedia:Tools/Navigation_popups|popups]]', 
	'Redirects': 'Redirects', // comme dans Redirects to ... 
	' à ' : ' à ', // comme dans Redirections vers ... 
	'Contourner la redirection' : 'Contourner la redirection', 
	'Réparer cette redirection' : 'Réparer cette redirection', 
	'désambig' : 'désambig', /// // ajouter ou supprimer dab etc. 
	'disambigHint': 'Lever ce lien vers [[%s]]', 
	'Cliquer pour lever l'ambiguïté de ce lien vers :': 'Cliquer pour 
	lever l' ambiguïté ce lien vers :', 'supprimer ce lien' : 'supprimer ce lien', 
	'supprimer tous les liens vers cette page de cet article' : 'supprimer tous les liens vers cette page de cet article',
	'supprimer tous les liens vers cette page de désambig de cet article': 'supprimer tous les liens vers cette page de désambig de cet article', 
	'mainlink': 'mainlink', ///// links, watch, unwatch 
	'wikiLink': 'wikiLink ', 
	'wikiLinks' : 'wikiLinks', 
	'links here' : 'links here', 
	'whatLinksHere' : 'whatLinksHere', 
	'what links here' : 'quels liens ici', 
	'WhatlinkshereHint' : 'Liste les pages qui sont hyperlié à %s', 
	'unwatchShort' : 'un', 
	'watchThingy' : 'watch', // appelé watchThingy car {}.watch est une fonction 
	'watchHint' : 'Ajouter %s à ma liste de surveillance', 
	'unwatchHint': 'Supprimer %s de ma liste de surveillance', 
	'Un seul éditeur trouvé : %s a effectué %s modifications' : 'Un seul éditeur trouvé : %s a effectué %s modifications',
	'%s semble être le dernier éditeur de la page %s' : '%s semble être le dernier éditeur de la page %s', 
	'rss' : 'rss', 
	////////// ///////////////////////// 
	// aperçus diff 
	////////////////// ///////////////// 
	'Diff tronqué pour des raisons de performances' : 'Diff tronqué pour des raisons de performances', 
	'Ancienne révision ' : 'Ancienne révision', 
	'Nouvelle révision' : 'Nouvelle révision', 
	'Quelque chose s'est mal passé :-(': 'Quelque chose s'est mal passé :-(', 
	'Révision vide, peut-être inexistante': 'Révision vide, peut-être inexistante', 
	'Date inconnue' : 'Inconnu Date',
	///////////////////////////////////// 
	// autres aperçus spéciaux 
	//////// ////////////////////////////
	'Catégorie vide' : 'Catégorie vide', 
	'Membres de catégorie (%s affichés)' : 'Membres de catégorie (%s affichés)', 
	'Aucun lien d'image trouvé' : 'Aucun lien d'image trouvé', 
	'Liens de fichier' : ' Liens de fichiers', 
	'Aucune image trouvée' : 'Aucune image trouvée', 
	'Image de Commons' : 'Image de Commons', 
	'Page de description' : 'Page de description', 
	'Texte alternatif :' : 'Texte alternatif :', 
	'revdel':'Révision cachée', 
	/////////////////////////////////// 
	// utilisateur- actions et informations associées 
	/////////////////////////////////// 
	'user': 'user', / //// page utilisateur, discussion, e-mail, espace 
	'utilisateur&nbsp;page': 'user page', 
	'user talk': 'user talk', 
	'edit user talk': 'edit user talk',
	'laisser un commentaire' : 'laisser un commentaire', 
	'email' : 'email', 
	'email user' : 'email user', 
	'EmailuserHint' : 'Envoyer un e-mail à %s', 
	'space' : 'space', / / forme courte pour le lien userSpace 
	'PrefixIndexHint': 'Afficher les pages dans l'espace utilisateur de %s', 
	'count': 'count', ///// contributions, log 
	'edit counter': 'edit counter', 
	'editCounterLinkHint' : 'Compter les contributions faites par %s', 
	'contribs': 'contribs', 
	'contributions': 'contributions', 
	'deletedContribs': 'contributions supprimées', 
	'DeletedcontributionsHint': 'Liste des modifications supprimées apportées par %s', 
	'ContributionsHint' : 'Liste des contributions apportées par %s', 
	'log' : 'log', 
	'user log' : 'user log',
	'userLogHint' : 'Afficher le journal utilisateur de %s\', 
	'arin' : 
	'Recherche ARIN', ///// Recherche ARIN, bloquer l'utilisateur ou l'IP 'Rechercher %s dans la base de données whois ARIN' : 'Rechercher %s dans la base de données whois ARIN', 
	'unblockShort' : 'un', 
	'block' : 'block', 
	'block user' : 'block user', 
	'IpblocklistHint' : 'Unblock %s', 
	'BlockipHint' : ' Empêcher %s d'éditer', 
	'block log' : 'block log', 
	'blockLogHint' : 'Afficher le journal de blocage pour %s', 
	'protectLogHint' : 'Afficher le journal de protection pour %s', 
	'pageLogHint' : ' Afficher le journal des pages pour %s', 
	'deleteLogHint' : 'Afficher le journal de suppression pour %s', 
	'Invalid %s %s' : 'L'option %s est invalide : %s', 
	'Aucun backlink trouvé' : 'Aucun backlink trouvé',
	' et plus' : ' et plus', 
	'undo' : 'undo', 
	'undoHint' : 'undo this edit', 
	'Télécharger les données d'aperçu' : 'Télécharger les données d'aperçu', 
	'Invalid or IP user' : 'Invalid or Utilisateur IP', 
	'Pas un nom d'utilisateur enregistré' : 'Pas un nom d'utilisateur enregistré', 
	'BLOQUÉ' : 'BLOQUÉ', 
	' éditions depuis : ' : ' éditions depuis : ', 
	'dernière modification le ' : 'dernière modification le ', 
	////////////////////////////////// 
	// Édition automatique 
	////////// ////////////////////////// 
	'Entrez un résumé d'édition non vide ou appuyez sur annuler pour abandonner': 'Entrez un résumé d'édition non vide ou appuyez sur annuler pour annuler', 
	'Échec de l'obtention des informations de révision, veuillez les modifier manuellement.\n\n' : 'Échec de l'obtention des informations de révision, veuillez les modifier manuellement.\n\n',
	'Le bouton %s a été automatiquement cliqué. Veuillez attendre le chargement de la page suivante.': 'Le bouton %s a été automatiquement cliqué. Veuillez attendre le chargement de la page suivante.', 
	'Impossible de trouver le bouton %s. Veuillez vérifier les paramètres dans votre fichier javascript.': 'Impossible de trouver le bouton %s. Veuillez vérifier les paramètres dans votre fichier javascript.', 
	/////////////////////////////////// 
	// Configuration des popups 
	/////////////////////////////////// 
	'Ouvrir l'image en taille réelle': 'Ouvrir en entier -size image', 
	'zxy' : 'zxy', 
	'autoedit_version' : 'np20140416' 
} ; 


function popupString(str) { 
	if (typeof popupStrings != 'undefined' && popupStrings && popupStrings[str]) { return popupStrings[str]; }
	if (pg.string[str]) { return pg.string[str]; } 
	return str; 
} 


function tprintf(str,subs) { 
	if (typeof subs != typeof []) { subs = [subs]; } 
	return simplePrintf(popupString(str), subs); 
} 

//</NOLITE> 
// ENDFILE : strings.js 
// STARTFILE : run.js 
//////////////////////////// //////////////////////////////////// 
// Exécuter les choses 
/////// ////////////////////////////////////////////////////////////// /////////// 


// Pour une raison quelconque, les popups nécessitent une page entièrement chargée jQuery.ready(...) cause des problèmes pour certains. 
// L'ancien addOnloadHook faisait quelque chose de similaire à ce qui suit 
if (document.readyState=="complete") 
	autoEdit(); // va configurer les popups
else 
	$( window ).on( 'load', autoEdit ); 


// Prise en charge de l'aperçu en direct de MediaWiki, des sauvegardes de l'Éditeur visuel et du menu volant d'Echo. 
( function () { 
	var once = true; 
	function dynamicContentHandler( $content ) { 
		// Essayez de détecter le crochet déclenché lors du chargement initial de la page 
		// et ignorez- le, nous nous accrochons déjà au chargement (éventuellement à différentes parties 
		// de la page - c'est configurable) et exécuter deux fois peut être mauvais. Moche… 
		if ( $content.attr( 'id' ) == 'mw-content-text' ) { 
			if ( une fois ) { 
				une fois = false; 
				return; 
			} 
		} 
				
		function registerHooksForVisibleNavpops ( ) { 
			pour (var i=0; pg.current.links && i<pg.current. liens.longueur; ++i) {
				var navpop = pg.current.links[i].navpopup; 
				if (!navpop || !navpop.isVisible()) { continue; } 
				
				Navpopup.tracker.addHook(posCheckerHook(navpop)); 
			} 
		} 
		
		function doIt () { 
			registerHooksForVisibleNavpops(); 
			$content.each( function () { 
				this.ranSetupTooltipsAlready = false; 
				setupTooltips( this ); 
			} ); 
		} 

		setupPopups( doIt ); 
	} 

	// Ce hook est également déclenché après le chargement de la page. 
	mw.hook( 'wikipage.content' ).add( dynamicContentHandler ); 

	mw.hook( 'ext.echo.overlay.beforeShowingOverlay' ).add( function($overlay){ 
		dynamicContentHandler( $overlay.find(".mw-echo-state") ); 
	});
} )(); 

}); 
// ENDFILE : run.js