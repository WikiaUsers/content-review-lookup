/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Affiche un modèle Information sur la page de téléchargement de fichiers [[Spécial:Téléchargement]]
 * Voir aussi [[MediaWiki:Onlyifuploading.js]]
 */
if( mw.config.get('wgCanonicalSpecialPageName') == "Upload" ) {
  importScript("MediaWiki:Onlyifuploading.js");
}

/* <pre><nowiki> */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditcountTag/code.js"
    ]
});
 
importScript( 'User:Emperor Jarjarkine/ajaxcloakrequest.js' );
// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles", "Special:Videos"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh
// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock

// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js');
// END For UserGroup-only messages
// For UserGroup-only messages
importScriptPage('Utilisateur:Think D. Solucer/Rollback.js');
// END For UserGroup-only messages

importArticles({
	type: "script",
	articles: [
		"u:dev:QuickModTools/code.js"
	]
});

// Add "Edit Intro" Button/Tab
//<syntaxhighlight lang="javascript">
/* Code crée par Grynny (http://www.wikia.com/wiki/User:Grunny)
 * Adds un bouton Modifier l'introduction après le bouton modifier
 * Utilise PurgeButton/code.js
 *
 */
if ( wgNamespaceNumber != -1 && !window.EditIntroButtonLoaded ) {
	addOnloadHook( addEditIntroButton );
}

var EditIntroButtonLoaded = true;

function addEditIntroButton () {
	var theText = 'Modifier l\'introduction';
	
	if ( typeof EditIntroButtonText == "string" ) {
		theText = EditIntroButtonText;
	}

	switch( skin ) {
		case 'answers':
		case 'awesome':
		case 'monaco_old':
		case 'monaco':
			$('#page_controls > #control_edit').after('<li><img src="/skins/common/blank.gif" class="sprite edit" /><a id="ca-edit-0" href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" rel="nofollow" title="Modifier l\'introduction">'+ theText + '</a></li>');
			break;


		case 'uncyclopedia':
		case 'wowwiki':
		case 'lostbook':
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-edit-0"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" title="Modifier l\'introduction">'+ theText + '</a></li>');
			break;

		case 'oasis':
		case 'wikia':
			$((( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader' ) + ' > .wikia-menu-button > ul').prepend('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=edit&section=0" title="Modifier l\'introduction">'+ theText + '</a></li>');
			break;

	}
}
 
//</syntaxhighlight>

// END Add "Edit Intro" Button/Tab
 

/* Archives */
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');


 if( document.getElementById('mp3-navlink') !== null ) { document.getElementById('mp3-navlink').onclick = onArticleNavClick; document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)'; } 
//=============================================================================================

/* ---------------------------------Adds edit links to WLH page -- *
 * ---------------------------------Final-Fantasy-wiki------------ */
function addEditLinksToWLH() {
  if(wgCanonicalSpecialPageName=='Whatlinkshere')
  {
    var links = document.getElementById("mw-whatlinkshere-list").getElementsByTagName('li');
    for(var i = 0; i<links.length; i++)
    {
      aLink = links[i].getElementsByTagName('a');
      var linkHref = aLink[0].href.replace("\?redirect=no","")+"?action=edit";
      var tools = getElementsByClassName(links[i], 'span', 'mw-whatlinkshere-tools');
      var editLinkSpan = document.createElement("span");
      editLinkSpan.className = "mw-whatlinkshere-edit";
      editLinkSpan.innerHTML = '<a title="Edit form" href="' + linkHref + '">(edit)</a> ';
      links[i].insertBefore(editLinkSpan,tools[0]);
    }
  }
}

addOnloadHook(addEditLinksToWLH);

/**
 * JavaScript below copied from http://starwars.wikia.com/wiki/MediaWiki:Common.js
 * Check there for updates if something breaks
 **/

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}

	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');

	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}

	// Upload form - need to run before adding hide buttons
	if ( wgCanonicalSpecialPageName === 'Upload' ) {
		setupUploadForm();
	}

	addHideButtons();

	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}

	if( window.storagePresent ) {
		initVisibility();
	}

	fillEditSummaries();
	fillPreloads();

	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	addAlternatingRowColors();
	// replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
	fixSearch();

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;

	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}

	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}

/**
 * jQuery version of fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {

	if( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	var	summaryOptionsHtml = '',
		$summaryOptionsList;

	$.get( wgScript, { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			summaryOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).html( summaryOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				if( skin === 'oasis' ) {
					$( '#wpSummary' ).text( value );
				} else {
					$( '#wpSummary' ).val( value );
				}
			}
		} );

		$( '#wpSummaryLabel' ).prepend( 'Standard summaries: ', $summaryOptionsList, '<br />' );
	} );

}

/**
 /**
 * jQuery version of Sikon's fillPreloads
 * @author Grunny
 */
function fillPreloads() {
 
	if( !$( '#lf-preload' ).length ) {
		return;
	}
 
	$( '#lf-preload' ).attr( 'style', 'display: block' );
 
	$.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );
 
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( wgScript, { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}
 
		$( '#lf-preload-cbox' ).html( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );
 
}
 
function doCustomPreload() {
	var value = $( '#lf-preload-pagename > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}

// ============================================================
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}

	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite

function initVisibility() {
	var storage = globalStorage[window.location.hostname];

	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);

	if( show == 'false' ) {
		infoboxToggle();
	}

	var hidables = getElementsByClass('hidable');

	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);

		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');

	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}

function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

	if( infoboxes.length == 0 )
		return;

	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];

		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;

		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;

			var ths = rows[i].getElementsByTagName('th');

			if( ths.length > 0 ) {
				continue;
			}

			if(changeColor)
				rows[i].style.backgroundColor = '#111111';
			changeColor = !changeColor;
		}
	}
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');

	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');

		if( button != null && button.length > 0 ) {
			button = button[0];

			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;

	if( content != null && content.length > 0 ) {
		content = content[0];

		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}

		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;

			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}

			if( item == -1 ) {
				return;
			}

			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	if ( wgUserName != null ) {
		$('.insertusername').html(wgUserName);
	}
}

function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');

	if( !userpage || !toc )
		return;

	var username = $('#pt-userpage').children(':first-child').html();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).html($(this).html().replace('<insert name here>', username));
	});
}

// Reskin parser script from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]]
skinjs = {
	"Logout": "Logout.js"
}

var re = RegExp("(.*) - Wookieepedia, the Star Wars Wiki");
var matches = re.exec(document.title);

var skinNamejs;

if (matches) {
	if (skinjs[matches[1]] != undefined) {
		skinNamejs = (skinjs[matches[1]].length > 0) ? skinjs[matches[1]] : matches[1] + '.js';
		document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Skin/' + skinNamejs + '&action=raw&ctype=text/javascript"></script>');
	}
}

function fixSearch() {
	var button = document.getElementById('searchSubmit');

	if( button )
		button.name = 'go';
}

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();

	if(node == null)
		node = document;

	if(tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

function getFirstHeading() {
	var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
	return (elements != null && elements.length > 0) ? elements[0] : null;
}

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;

	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;

		node = node.parentNode;
	}

	return null;
}

/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
	var gbl = document.getElementById("hover-global");

	if(gbl == null)
		return;

	var nodes = getElementsByClass("hoverable", gbl);

	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onmouseover = function() {
			this.className += " over";
		}
		nodes[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$( loadFunc );
/* Ajout réglage pour modèle SWITCH *******************************/
var togglers = new Array();
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            }
            else toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length) continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
        switch (op) {
        case "_reset":
            for (var j in toggles)
            toggles[j].style.display = toggles[j]._toggle_original_display;
            break;
        case "_show":
            for (var j in toggles)
            toggles[j].style.display = '';
            break;
        case "_hide":
            for (var j in toggles)
            toggles[j].style.display = 'none';
            break;
        case "":
        default:
            // Toggle
            for (var j in toggles)
            toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
            break;
        }
    }
}
 
function createTogglerLink(toggler, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit() {
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem.className) continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++) {
            var elemClass = elemClasses[j];
            if (!allClasses[elemClass]) allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;
 
            if (elemClass == "_togglegroup") toggleGroup = new Array();
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1) toBeToggled = elemClass.substring(hyphen + 1);
                else {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
    createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Episode/issue reference tag",
		"tagOpen": "<ref name=>{{Cite episode|2|2",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111185805/central/images/1/13/Button_delete.png",
		"speedTip": "Redlock",
		"tagOpen": "{{RedLock}} ",
		"tagClose": "",
		"sampleText": ""};;
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20140222171133/shingekinokyojin/fr/images/thumb/1/1c/Information_icon.png/50px-Information_icon.png",
		"speedTip": "Règles articles",
		"tagOpen": "{{Règles articles}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20090105213242/central/images/f/fe/C_Tool.PNG",
		"speedTip": "construction",
		"tagOpen": "{{Construction}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20071111120947/central/images/7/70/Button_disambig.png",
		"speedTip": "Disambiguation",
		"tagOpen": "{{disambiguation;}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20071125054009/central/images/8/8c/Button_RedX.png",
		"speedTip": "Supprimer rapidement",
		"tagOpen": "{{Speedy deletion}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20081020112924/central/images/b/bb/Seealso.png",
		"speedTip": "Relecture",
		"tagOpen": "{{Relecture}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080208025052/central/images/2/29/Button_user.png",
		"speedTip": "Mission",
		"tagOpen": "{{Mission}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20140222171133/shingekinokyojin/fr/images/thumb/1/1c/Information_icon.png/50px-Information_icon.png",
		"speedTip": "Règlement",
		"tagOpen": "{{Règlement}}         ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20140413225643/shingekinokyojin/fr/images/thumb/0/0e/%C3%89toile_fa.png/90px-%C3%89toile_fa.png",
		"speedTip": "AV",
		"tagOpen": "{{Étoile AV}} ",
		"tagClose": "",
		"sampleText": ""};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20140414004233/shingekinokyojin/fr/images/thumb/e/ec/Ok-icon.png/90px-Ok-icon.png",
		"speedTip": "AQ",
		"tagOpen": "{{AQ}} ",
		"tagClose": "",
		"sampleText": ""};
if (mwCustomEditButtons) {

 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130908155221/shingeki-no-kyojin/es/images/thumb/2/25/Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png/14px-Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png",
		"speedTip": "Ajouter:Bataillon d'Exploration Navibox",
		"tagOpen": "{{Bataillon d'Exploration Navibox}}",
		"tagClose": "}}",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130908155727/shingeki-no-kyojin/es/images/thumb/5/54/Emblema_de_las_Tropas_Estacionarias.png/20px-Emblema_de_las_Tropas_Estacionarias.png",
		"speedTip": "Ajouter:Garnison Navibox",
		"tagOpen": "{{Garnison Navibox}}",
		"tagClose": "}}",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130908155737/shingeki-no-kyojin/es/images/thumb/e/ee/Emblema_de_la_Polic%C3%ADa_Militar.png/16px-Emblema_de_la_Polic%C3%ADa_Militar.png",
		"speedTip": "Ajouter:Brigades spéciales Navibox",
		"tagOpen": "{{Brigades spéciales Navibox}}",
		"tagClose": "}}",
                "sampleText": ""};
}
	

//Advanced Tools
'u:dev:QuickTools/advanced.js'

/* Signature Reminder */
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
 
/* Reference Popups*/
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution
 * by [[User:Grunny|Grunny]] (for bug fixes)
 */
 
var ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
var ajaxPages = new Array("Special:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Automatically refresh the page';
var doRefresh = true;
var ajaxBC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';
 
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}
 
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
		return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return "";
}
 
function preloadAJAXRL() {
	var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
	var appTo = ($('#WikiaPageHeader' ).length) ? $('#WikiaPageHeader > h1') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading')); 
 
	appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="float: none; vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
 
	$('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
		if (location.href == settings.url) {
			$(this).show();
		}
	} ).ajaxComplete(function(event, xhr, settings) {
		if (location.href == settings.url) {
			$(this).hide();
 
			// Re-run certain functions
			if ($(ajaxBC + ' .mw-collapsible').length) {
				$(ajaxBC + ' .mw-collapsible').makeCollapsible();
			}
 
			if (mw.config.get("wgNamespaceNumber") == -1 
				&& mw.config.get("wgCanonicalSpecialPageName") == "Recentchanges") {
				mw.special.recentchanges.init();
			}
		}
	});
 
	$('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
	if (getCookie("ajaxload-" + wgPageName) == "on") {
		loadPageData();
	}
}
 
function toggleAjaxReload() {
	if ($('#ajaxToggle').prop('checked') === true) {
		setCookie("ajaxload-" + wgPageName, "on", 30);
		doRefresh = true;
		loadPageData();
	} else {
		setCookie("ajaxload-" + wgPageName, "off", 30);
		doRefresh = false;
		clearTimeout(ajaxTimer);
	}
}
 
function loadPageData() {
	$(ajaxBC).load(location.href + " " + ajaxBC + " > *", function (data) {
		if (doRefresh) {
			ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
		}
	});
}
 
$(function() {
	for (var x in ajaxPages) {
		if (wgPageName == ajaxPages[x] && $('#ajaxToggle').length===0) {
			preloadAJAXRL();
		}
	}
});
/* Liens vers le contact */
$('ul.tools li:first-child').after('<li><a href="Wiki_Shingekinokyojin:Contact">Nous Contacter</a></li>');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' ) {
		if( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) {
			$("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		} else {
			$("#WikiaPageHeader .wikia-menu-button a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
			$('span.editsection').remove();
			return;
		}
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
 
	if( skin == 'monaco' ) {
		editLink = document.getElementById('ca-edit');
	} else if( skin == 'monobook' ) {
		editLink = document.getElementById('ca-edit').firstChild;
	} else {
		return;
	}
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
	$('span.editsection').remove();
 
	appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
}
addOnloadHook( disableOldForumEdit );
 
//Removes the "Featured on:" line on File pages -- By Grunny
addOnloadHook( function (){
	if ( wgNamespaceNumber == 6 && $('#file').length != 0 ) {
		$('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
	}
} );
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
    function FairUseRationale() {
            if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                    document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = {{Image|}}\n| Portion           = {{Ch|}}\n| Purpose           = {{Image|}}\n| Resolution        = {{Image|}}\n| Replaceability    = {{Image|}}\n| Other Information = \n}}';
            }
    }
    addOnloadHook(FairUseRationale);
 
    // ****** END: JavaScript for [[Special:Upload]] ******