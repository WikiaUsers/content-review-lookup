/* Any JavaScript here will be loaded for all users on every page load. */

/* importArticles */
importArticles({
    type: 'style',
    articles: [
        'u:dev:FontAwesome/code.css',

        'u:zh:MediaWiki:CountDown.css'
    ]
}, {
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Common.js/standardeditsummaries.js',

        'u:zh.pad.wikia.com:MediaWiki:CountDown.js',
    ]
});



/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ) {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) { return false; }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }

//////////////////////////////////////////////////////////////////////////////
// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.
//////////////////////////////////////////////////////////////////////////////

// Oasis-only scripts
if (mw.config.get('skin') === 'oasis') {
	// Detach the AJAX feature from Page/Image Creation/Upload
	// because the pop-up form does not obey the preloads and such.
	$('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
 
	// Idea from avatar wiki
	// Add link to About to Wiki-Nav
	$($('.WikiHeader nav ul li.marked ul')).append('<li class="subnav-2-item">' +
        '<a class="subnav-2a" href="/wiki/Project:About">About</a></li>');
	
	// Add link to Policies to Wiki-Nav
	$($('.WikiHeader nav ul li.marked ul')).append('<li class="subnav-2-item">' +
        '<a class="subnav-2a" href="/wiki/Project:Policies">Policies</a></li>');

	// Internationalization notice 
	importScriptPage('LWN/code.js', 'dev');
}



// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
	window.storagePresent = (typeof(localStorage) != 'undefined');
 
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
	hideContentSub();
 
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
		localStorage.setItem('infoboxshow-' + page, nowShown);
	}
}

/* FlipContent */
$( ".container" ).click(function() {
  $div = $(this).find("div");
  $( $div ).toggleClass( "active" );
});

// Template:Tab
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
    }
};
Tabs.init();

/* ====================================================================== *\
	# hoverimage
\* ====================================================================== */
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});

//Custom edit buttons
if (mwCustomEditButtons.length) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/1/11/Button_category.png/revision/latest?cb=20120909085943",
	"speedTip": "Add a category",
	"tagOpen": "[[Category:",
	"tagClose": "]]",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/1/12/Button_gallery.png/revision/latest?cb=20070329064959",
	"speedTip": "Add a gallery",
	"tagOpen": "<gallery>",
	"tagClose": "</gallery>",
	"sampleText": "Insert file name(s) here"
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/0/03/Button_em_dash.png/revision/latest?cb=20150118172631",
	"speedTip": "Insert an em dash",
	"tagOpen": "&mdash;",
	"tagClose": "",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
	"speedTip": "Strike",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png", 
        "speedTip": "Insert a table", 
        "tagOpen": "{| class=\"wikitable\"",
        "sampleText": "Insert text here" 
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"
};
}

/* add upload photo button to main page */
$(function UploadOnMainPage() {
	$('.mainpage #WikiaPageHeader div:first').append('<div style="float: right; padding-left: 15px; padding-top: 15px;"><a class="uploadimage" title="Upload a new image to this wiki" href="/wiki/Special:Upload"><img height="0" width="0" class="sprite photo" src="' + wgBlankImgUrl + '"></a><a class="uploadimage" title="Special:Upload" href="/wiki/Special:Upload"></a></div>');
});

/* hiding the TOC for [[template:hidetoc]] */
if ($(".hidetoc").length > 0) {
	$(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}

/* Change chat name */
if ($('.chat-name').length) {
    $('.chat-name').html('Please consult the <a href="Fan_Creations:Policies#Chat_Policy">guidelines</a> before joining.');
}

/*******************************************************************************
** "Articletype positioning" script; by [[User:Bp]]
*******************************************************************************/
 
function moveArticletypeDiv() {
  var fooel = document.getElementById('fc-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticletypeDiv);

//Explicit alert config
SpoilerAlert = {
    question: 'This page is explicit, meaning that its content is likely inappropriate for younger readers.<br />Do you wish to continue anyway?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Explicit');
    }
};

/* Template:Header */
$('#container #id1').on('click',function(){$('#container #id2').style.display="none";})

/* Template:Main Page create */
$(function() {
	$('.clickable-box').hover(function() {
		$(this).css('text-decoration', 'underline');
	}, function() {
		$(this).css('text-decoration', 'none');
	});
	$('.clickable-box').click(function(e) {
		location.href = '/wiki/' + encodeURIComponent($(e.target).data('link'));
	});
});