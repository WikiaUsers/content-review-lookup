importScriptPage('DupImageList/code.js', 'dev'); 
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special;Statistics","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Any JavaScript here will be loaded for all users on every page load. */
 
/**** class CollapsibleTables.js
 * © 2008 by Patrick Westerhoff [poke]
 *
 * This class allows to make tables collapsible and adds a show/hide button to
 * affected tables. Tables which class attribute contains 'collapsible' or
 * 'expandable' are affected by this class and can be collapsed; the latter
 * automatically hides the content of all sections.
 * Header rows are used to divide the table into sections which can be collapsed
 * separately. By default the first row of the table is interpreted as a header
 * row, however this can be overwritten by adding 'collapsible' to the class
 * attribute of header rows. You can also hide a section individually by default
 * when in 'collapsible' mode by using 'expandable' as the row's class name
 * instead.
 */
 
 /* Исскуственные статусы */
 $(function() {
 var rights = {};
 var image = {};
 var ImgStart = '';
 var ImgEnd = '';
 rights["Harbinger007"]                        = ["OVERLORD"];
 image["Harbinger007"]                         = [ImgStart + '' + ImgEnd];

 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {

   if (typeof image[wgTitle] != "undefined") {  

        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] + '</span><span style="position:relative; left:60px;">' + image[wgTitle] + '</span>').appendTo('.masthead-info hgroup');
      }
     else {
       // add new rights
        $('<span class="tag">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
      }
     }
    }
   
});
 
function CollapsibleTables() {
	var classCollapsible = 'collapsible';
	var classExpandable  = 'expandable';
	var linkTextShow     = '[открыть]';
	var linkTextHide     = '[скрыть]';
 
	var reCollapsible    = new RegExp( '(?:\\s|^)' + classCollapsible + '(?:\\s|$)' );
	var reExpandable     = new RegExp( '(?:\\s|^)' + classExpandable  + '(?:\\s|$)' );
	var sections         = new Array();
 
	// link element
	var linkElement               = document.createElement( 'a' );
	linkElement.style.fontSize    = '85%';
	linkElement.style.fontWeight  = 'normal';
	linkElement.style.width       = '3em';
	linkElement.style.cssFloat    = 'right';
	linkElement.style.styleFloat  = 'right';
	linkElement.style.textAlign   = 'center';
	linkElement.style.marginLeft  = '1em';
	linkElement.style.padding     = '0px 3px';
	linkElement.href              = 'javascript:void(0);';
 
	initialize();
 
	/** private void initialize () :: initializes CollapsibleTables class **/
	function initialize() {
		if ( wgIsArticle == false && window.location.href.indexOf( 'action=submit' ) < 0 ) {
			return;
		}
 
		var docContent    = document.getElementById( 'bodyContent' ) || document.getElementById( 'article' ) || document.getElementById( 'mw_contentholder' );
		var tables        = docContent.getElementsByTagName( 'table' );
		var sectionId     = -1;
		var defaultStatus;
 
		for ( var i = 0, n = tables.length; i < n; i++ ) {
			if ( reCollapsible.test( tables[i].className ) ) {
				defaultStatus = true;
			} else if ( reExpandable.test( tables[i].className ) ) {
				defaultStatus = false;
			} else {
				continue;
			}
 
			var tableRows    = tables[i].rows;
			var sectionFound = false;
			var status       = false;
 
			for ( var j = 0, m = tableRows.length; j < m; j++ ) {
				if ( reCollapsible.test( tableRows[j].className ) ) {
					status = true;
				} else if ( reExpandable.test( tableRows[j].className ) ) {
					status = false;
				} else {
					if ( sectionFound ) {
						sections[sectionId].content.push( tableRows[j] );
						tableRows[j].style.display = sections[sectionId].status ? '' : 'none';
					}
 
					continue;
				}
 
				var section     = new Object();
				section.header  = tableRows[j];
				section.content = new Array();
				section.status  = defaultStatus ? status : false;
 
				sections[++sectionId] = section;
				sectionFound            = true;
 
				initHeaderRow( tableRows[j], sectionId, section.status );
			}
 
			if ( sectionFound == false ) {
				var section       = new Object();
				section.header    = tableRows[0];
				section.content   = new Array();
				section.status    = defaultStatus;
 
				for ( var j = 1; j < tableRows.length; j++ ) {
					section.content.push( tableRows[j] );
					tableRows[j].style.display = section.status ? '' : 'none';
				}
 
				sections[++sectionId] = section;
 
				initHeaderRow( tableRows[0], sectionId, defaultStatus );
			}
		}
	}
 
	/** private void initHeaderRow ( headerRow, sectionId, sectionStatus ) :: adds show/hide button **/
	function initHeaderRow( headerRow, sectionId, sectionStatus ) {
		var lastCell, link;
 
		headerRow.id = 'collapsible-section_' + sectionId;
		lastCell     = headerRow.cells[headerRow.cells.length - 1];
		link         = linkElement.cloneNode( false );
		link.onclick = toggleSection;
		link.appendChild( document.createTextNode( sectionStatus ? linkTextHide : linkTextShow ) );
 
		lastCell.insertBefore( link, lastCell.firstChild );
	}
 
	/** private void toggleSection () :: onclick event handler **/
	function toggleSection() {
		var trHead  = this.parentNode.parentNode;
		var section = sections[trHead.id.substr( 20 )];
		var content = section.content;
		var display = section.status ? 'none' : '';
 
		for ( var i = 0, n = content.length; i < n; i++ ) {
			content[i].style.display = display;
		}
 
		section.status       = !section.status;
		this.firstChild.data = section.status ? linkTextHide : linkTextShow;
	}
}
 
// ================================================================
// JavaScript here will be loaded for all users on every page load.
// ================================================================
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	initFunctionsJS();
 
	// Upload form - need to run before adding hide buttons
	setupUploadForm();
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') != null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}
 
	if( window.storagePresent )
		initVisibility();
 
	rewriteSearchFormLink();
	fillEditSummaries();
	onStdSummaryChange();
 
	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	fixSearch();
 
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
 
	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
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
 
function fillEditSummaries() {
	var label = document.getElementById("wpSummaryLabel");
 
	if( label == null )
		return;
 
	var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
	comboString += "</select><br />";
	label.innerHTML = comboString + label.innerHTML;
 
	requestComboFill('stdSummaries', 'Template:Stdsummaries');
}
 
function onStdSummaryChange() {
	var value = $('#stdSummaries').val();
 
	if( value != "" ) {
		if( skin == 'oasis' ) {
			$("#wpSummaryEnhanced").val(value);
		} else {
			$("#wpSummary").val(value);
		}
	}
}
 
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}
 
function substUsernameTOC() {
	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');
 
	if( !userpage || !toc )
		return;
 
	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');
 
	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}
 
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

importScriptPage('DupImageList/code.js', 'dev'); 
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special;Statistics","Special:WikiActivity","Special:Contributions","Blog:Recent posts","Blog:News","Blog:Featured blog posts","Blog:Popular blog posts"];
importScriptPage('AjaxRC/code.js', 'dev');
 
// ==UserScript==
// @name           Javascript Slider
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Creates animated slider with editable width and height.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
//Grab image URLs and set to variables
var slider1url = $('#slider1url').text();
var slider2url = $('#slider2url').text();
var slider3url = $('#slider3url').text();
var slider4url = $('#slider4url').text();
$('#slider1').addClass('linked');
 
//When panals are clickable, links to designated URL.
$('#slider1img').click(function(){
	if ($('#slider1').hasClass('linked')) {
		window.location.href = slider1url;
	}
});
 
$('#slider2img').click(function(){
	if ($('#slider2').hasClass('linked')) {
		window.location.href = slider2url;
	}
});
 
$('#slider3img').click(function(){
	if ($('#slider3').hasClass('linked')) {
		window.location.href = slider3url;
	}
});
 
$('#slider4img').click(function(){
	if ($('#slider4').hasClass('linked')) {
		window.location.href = slider4url;
	}
});
 
//Opens and closes panels when clicked.
 
$('#slider1').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked'); b
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider2').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider3').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	}
});
 
$('#slider4').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
		});
	}
});
 
//Scrolls through slider every 6 seconds
var scrolltimer = window.setInterval(autoScroll, 6000);
 
function autoScroll() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
			$('#slider1').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
			$('#slider2').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
			$('#slider3').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4').removeClass('opened').addClass('animated').animate({ width: "698px" }, "normal", "linear", function() {
			$('#slider4').removeClass('linked').removeClass('animated').dequeue();
			$('#slider1').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened');
		});
	}
}
 
//Turns off autoscroll on hover
$('#sliderframe').on("mouseenter",function(){
	scrolltimer = window.clearInterval(scrolltimer)
}).on("mouseleave",function(){
	scrolltimer = window.setInterval(autoScroll, 6000);
});
 
 
//Grabs element id on hover and animates cyan and magenta layers with queue stop
$('.flickerAnimation').hover(function(){
	hoverID = $(this).attr('id');
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop();
		cyanAnimate();
		magentaAnimate();
	}
}, function() {
    $(this).addClass('animated').animate({ background: "none" }, "normal", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});
 
//Scrolls Games left and right
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});

//Sets function to animate magenta layer
function magentaAnimate() {
	$( "#" + hoverID + "magenta" ).animate({
		left: 5
	}, {
		duration: 0,
	});
	$( "#" + hoverID + "magenta" ).animate({	
		left: -2
	}, {
		duration: 300,
	});
	$( "#" + hoverID + "magenta" ).animate({
		left: 0
	}, {
		duration: 50,
	});
}
 
//Sets function to animate cyan layer
function cyanAnimate() {
	$( "#" + hoverID + "cyan" ).animate({
		left: -5
	}, {
		duration: 0,
	});
	$( "#" + hoverID + "cyan" ).animate({
		left: 2
	}, {
		duration: 300,
	});
	$( "#" + hoverID + "cyan" ).animate({
		left: 0
	}, {
		duration: 50,
	});
}
 
//Grabs element id on hover and animates cyan and magenta layers with queue stop
$('.flickerAnimation').hover(function(){
	hoverID = $(this).attr('id');
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop();
		cyanAnimate();
		magentaAnimate();
	}
}, function() {
    $(this).addClass('animated').animate({ background: "none" }, "normal", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});
 
// ================================================================
// BEGIN - Sliders using JQuery by User:Tierrie
// ================================================================
 
//wsl.loadCSS.call(wsl, "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css");
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );
 
// ================================================================
// END - Sliders/JQuery
// ================================================================
importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };

//Opens and closes community links
$('#communitytitle').click(function(){
	if (timerTime > 0) {
		jQuery.noop();
	} else {
		if ($('#communitylinks').hasClass('closed')) {
			$('#communitylinks').removeClass('closed').addClass('opened').animate({ height: "285px" }, 1000).css('padding-top','5px');
			$('#communitytitle').text('Свернуть список сообществ');
			timerTime = 500
		} else if ($('#communitylinks').hasClass('opened')) {
			$('#communitylinks').removeClass('opened').addClass('closed').animate({ height: "0px" }, 1000).css('padding-top','0px');
			$('#communitytitle').text('Развернуть список сообществ');
			timerTime = 500
		}
	}
});
 
// ================================================================
// BEGIN - Username replace function ([[template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
 
// ================================================================
// END - Username replace function ([[template:USERNAME]])
// ================================================================

importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/inputUserInformation.js",
        "MediaWiki:Wikia.js/MainPage.js",
        "MediaWiki:Wikia.js/Slider.js"
    ]
});

//Nav button hover animation
jQuery(document).ready(function($) {
	$(".NavButton").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
 
//App button hover animation
jQuery(document).ready(function($) {
	$(".AppButton").mouseleave(function(){
		$(this).find('#amove').animate({ top: '115px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#amove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});