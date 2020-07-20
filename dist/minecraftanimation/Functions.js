//-------------------------------------------------------------------------------
/** This page serves as a storage of custom JavaScript code that would clutter
    MediaWiki:Common.js and MediaWiki:Wikia.js with their quantity. More of
    these scripts dedicated to certain subjects can be found on their own
    dedicated MediaWiki pages.                                                **/
//-------------------------------------------------------------------------------

//==============================================================================
// Allows text to be hidden in other text and revealed with a click
// Requires copying of Template:FlipText, Template:FlipContent and some CSS
//==============================================================================
 
$(".FlipContainer").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

//============================================================
// Sorts content on Special:WhatLinksHere alphabetically
//============================================================

!function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove(); $list.append(sorted_list);
}(jQuery);

/****
 ===========================================================
 # Start codes taken from OneTwoThreeFall's Global JS
 ===========================================================
**/

//====================================================================
// Adds links to Special:WhatLinksHere to edit pages linked on it.
//====================================================================

if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

//=====================================================================
// Adds separate list of uncreated categories on Special:Categories.
//=====================================================================

window.ajaxCallAgain = window.ajaxCallAgain || Array();
window.ajaxCallAgain.push(function() {
    if (wgPageName === "Special:Categories") {
    var $newCats =  $('<div>')
            .css('float', 'right')
            .text('Uncreated categories:')
            .attr('id', 'EmptyCats');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li')
        .has('.newcategory')
        .clone()
        .appendTo($newCatsList);}
});

//============================================
// Adds a button to clear Deletion reasons
//============================================

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason')
        .after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function() {$('#wpReason').val('').focus();});
}

//====================================================================
// Expand collapsed information on Recent Changes and Watchlist
//====================================================================

if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), 
['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
    $(window).on("load", function() {
        $('.mw-collapsible-toggle-collapsed').click();
});}

/****
 ===========================================================
 # End codes taken from OneTwoThreeFall's Global JS
 ===========================================================
**/

/** Highlight changed whitespace characters in diffs.
    By UltimateSupreme, taken from their Global JS **/

if ($.getUrlVar('diff')) {
    $('.diffchange-inline').each(function() {
        if (!(new RegExp('\\S+').test($(this).text()))) {
            $(this).css('background-color', 'red')}
    });
}

//==========================================================
// Class testing scripts
//==========================================================

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
};

function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;
    while (node !== null && node !== document) {
        if (tester.isMatch(node)) {return node}
        node = node.parentNode;
    }return null;
}

//=========================================
// Internet Explorer 6 :hover bugfixing
//=========================================

function rewriteHover() {
  var gbl = document.getElementById("hover-global");
 
  if (gbl === null)
      return;
 
  var nodes = getElementsByClass("hoverable", gbl);
 
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].onmouseover = function() {
      this.className += " over";
    };
    nodes[i].onmouseout = function() {
      this.className = this.className.replace(RegExp(" over\\b"), "");
    };
  }
}

var TridentCSS = String(".hoverable .hoverable-inner {\
	display: none;\
	position: absolute;\
	top: auto;\
	text-align: left;\
}\
 \
.hoverable:hover .hoverable-inner, .hoverable.over .hoverable-inner { display:\
inline; }");

if 
   // Trident 4, the engine IE6 uses that has flunky hover logic 
   (Browser.Engine.trident4) {
      rewriteHover();
      mw.util.addCSS(TridentCSS);
}

//=========================================
// Tabber extension by Fngplg
// Sets active tab by hash and encodes it
//=========================================

(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    
    // Convert wiki-utf 2 ansi
    
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100); //settimeout
    }); //doc.rdy    
})(jQuery);

//===========================================
// Allows more in-depth resizing of images
//===========================================

$(".image-resize").each(function() {
    var a = $(this).children(".image-resize-new").text().split("_");
        img = $(this).find("img");
    if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
        img.attr({
            width: a[0],
            height: a[1]
        });
    }
});

//===========================================
// Special tag text for permabanned users
//===========================================

window.addEventListener('load', function() {

    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it 
    // finished loading.
    
    setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Permabanned';
			}
		});
	}, 250);
});