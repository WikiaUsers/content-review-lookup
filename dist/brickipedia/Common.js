/* Any JavaScript here will be loaded for all users on every page load. */

/*** Glitch fix by User:Pcj ***/
function fixBlogLinks() {
    if (wgPageName == "Special:RecentChanges") $("#bodyContent ul.special li:contains('article-comments-rc-blog-comment')").each(function(i) {
        oldHTML = $(this).html();
        lnk = $(this).find("a:contains('hist')").attr("href");
        if (typeof(lnk) != "undefined") {
            rawID = lnk.replace(/.*curid=(.*?)&.*/, "$1");
            bLink = "/wiki/User_blog:" + lnk.replace(/.*User_blog_comment:(.*?\/.*?)\/.*/, "$1") + "?showall=1#comm-" + rawID;
            newHTML = oldHTML.replace("&lt;article-comments-rc-blog-comment&gt;", "(<a href='" + bLink + "'>Blog comment</a>) ");
            $(this).html(newHTML);
        }
   });
}

function fbl() {
    fixBlogLinks();
    $("#bodyContent").bind("ajaxPageLoad", fixBlogLinks);
}
addOnloadHook(fbl);

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
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
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
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
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );

/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').html(wgUserName); }
 addOnloadHook(UserNameReplace);

//Attempt at loading top icons
function showRating()
{
    var titleDiv = document.getElementById("title-rating");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

addOnloadHook( showRating );

$(function() {
	var nick = (wgUserName == null) ? ('BP-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=brickipedia&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="650" height="400" style="border:0;"></iframe>');
});

// Edit Menu
 // From http://www.sourcewatch.org/index.php?title=MediaWiki:Monobook.js#Edit_summary_stuff
 // Modify by [[User:Cizagna]]
 
 // The original value of the edit summary field is stored here
 var editsummOriginalSummary = new String();
 
 // A global ref to the dropdown with canned edit summaries
 var editsummDropdown = null;
 
 function editsummInitialize() {
    var label = document.getElementById('wpSummaryLabel');
    if(label == null) return;
    label.firstChild.style.cssText = 'display:none';
    
    // Save the original value of the edit summary field
    editsummOriginalSummary = document.forms.editform.wpSummary.value;
    
    // For convenience, add a dropdown box with some canned edit
    // summaries to the form.
    
    var dropdown = document.createElement('select');
    dropdown.setAttribute('title', 'Standard Summaries')
    dropdown.style.cssText = 'margin-top:3px;';
    dropdown.onchange = new Function('editsummOnCannedSummarySelected()');
    
    addDropdownOption(dropdown,'','(Summary)');
    addDropdownOption(dropdown,'','Refactoring:');
    addDropdownOption(dropdown,'Cleanup','— Cleanup');
    addDropdownOption(dropdown,'Formating','— Formatting');
    addDropdownOption(dropdown,'HTML tidying','— HTML tidying');
    addDropdownOption(dropdown,'Wikification','— Wikification');
    addDropdownOption(dropdown,'','Content:');
    addDropdownOption(dropdown,'Page created','— Page created');
    addDropdownOption(dropdown,'Update with new info.','— Update with new info.');
    addDropdownOption(dropdown,'Expansion','— Expansion');
    addDropdownOption(dropdown,'Rewrite','— Rewrite');
    addDropdownOption(dropdown,'Fix spelling/grammar','— Corrected spelling/grammar');
    addDropdownOption(dropdown,'','Remove/Revert:');
    addDropdownOption(dropdown,'Revert Vandalism','— Revert Vandalism');
    addDropdownOption(dropdown,'-unverified info','— Remove unverified info');
    addDropdownOption(dropdown,'','Templates:');
    addDropdownOption(dropdown,'+Infobox','— Added Infobox');
    addDropdownOption(dropdown,'Corrected template usage','— Corrected template usage');
    addDropdownOption(dropdown,'','Categories:');
    addDropdownOption(dropdown,'+Cat','— Added Category');
    addDropdownOption(dropdown,'-Cat','— Remove Category');
    addDropdownOption(dropdown,'Alphabetized ""','— Alphabetized ');
    /*addDropdownOption(dropdown,'','');
    addDropdownOption(dropdown,'','');*/
    
    label.appendChild(dropdown);
    
    // Store a global ref to it
    editsummDropdown = dropdown;
    
    var onMonaco = skin == 'monaco' ? true : false;
    if(onMonaco) {
        // even thougth this can be configure by MediaWiki pages its better this way so it only affects monaco pages
        document.getElementById('wpMinoredit').nextSibling.nextSibling.innerHTML = 'Minor';
        document.getElementById('wpWatchthis').nextSibling.nextSibling.innerHTML = 'Watch';
    }else {
        var wpSumamaryCssSize  = document.getElementById('wpSummary');
        wpSumamaryCssSize.style.cssText = 'width:70%'; //FF
        wpSumamaryCssSize.size = '60'; //IE
    }
 }
 // Adds options to the drop down menu on "editsummInitialize()"
 function addDropdownOption(dropdown,optionValue,optionText) {
    var option = document.createElement('option');
    option.setAttribute('value', optionValue)
    option.appendChild(document.createTextNode(optionText));
    dropdown.appendChild(option);
 }
 // There's a cross-browser issue when accessing the selected text:
 // *In Firefox you can use: selectObj.value
 // *In IE, you have to use: selectObj.options[selectObj.selectedIndex].text
 // *The latter method also works in Firefox
 function editsummOnCannedSummarySelected() {
    var newSummary = editsummOriginalSummary;
    if(newSummary.length!=0) newSummary += " - ";
    
    var idx = editsummDropdown.selectedIndex;
    var canned = editsummDropdown.options[idx].value;
    newSummary += canned;
    document.forms.editform.wpSummary.value = newSummary;
 }
  addOnloadHook(editsummInitialize);

/* MOS Box */
importScript('MediaWiki:Common.js/mosbox.js');

// JS for Template:CSS
importScript('MediaWiki:Common.js/userCSS.js');
// END JS for Template:CSS

//Countdown from LUWiki
importScriptPage('MediaWiki:Common.js/Countdown.js', 'legouniverse');

//From Admin tools Wiki
// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
// END Redesign of ProfileMastheads

function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r| Licensing = \r}}"));
 
}
addOnloadHook (preloadUploadDesc);

/* Add timer to nav bar */
importScriptPage('MediaWiki:Common.js/displayTimer.js'); 

/* Something Mythrun wanted added. */
importScriptPage('MediaWiki:Common.js/Other2.js', 'legouniverse');

/****************************************/
/* Add Popup Script by User:Jgjake2     */
/****************************************/
importScriptPage('User:Jgjake2/js/ElderScrolls/Popups.js', 'deadisland');


/* Other slidey stuff */
$(function () {
    $(".clicker-show").parent().siblings("p").css("margin","0em");
    $(".clicker-show").click(function(){
      $(this).parent().next().slideDown();
      $(this).fadeOut();
      $(this).prev().fadeIn();
    });
});
 
$(function () {
    $(".clicker-hide").click(function(){
      $(this).parent().next().slideUp();
      $(this).fadeOut();
      $(this).next().fadeIn();
    });
});

/* Advent cal */
$(function() {
    $(".advent-cal img").attr({
        width: "",
        height: ""
    });
});

/* stolen from rswiki */
 
if(wgCanonicalSpecialPageName == 'Chat' && skin != 'oasis')
{
	window.location.search = window.location.search + (window.location.search? '&': '?') + 'useskin=oasis';
}

/* hideable infobox JS */
$('#hideinfobox').click(function(){
    $('#hideinfobox').animate({opacity: '0'}, 1000, function(){
        $('#hideableinfobox').animate({opacity: '0'}, 1000, function(){
            $('#hideableinfobox, #hideinfobox').hide().animate({display: 'none'}, function(){
                $('#showinfobox').stop().show().animate({opacity: '1'}, 800 );
            });
        });
    });   
});
 
$('#showinfobox').stop().click(function(){
    $('#showinfobox').animate({opacity: '0'}, 1000, function(){
        $('#showinfobox').hide().animate({top: '+=0px'}, function(){
            $('#hideableinfobox').show().animate({opacity: '1', display: 'inline-table'}, 1000, function(){
                $('#hideinfobox').show().animate({opacity: '1'}, 1000 );
            });
        });
    });   
});

/* Slidey stuff */
$(function() {
    $(".slide-link").addClass("link");
    var hidelink = "[hide]";
    var showlink = "[show]";
 
    $(".slide-content").each(function() {
        if ($(this).hasClass("noshown")) {
            var fid = $(this).attr("title");
            var flink = $(".slide-link[title=" + fid + "]");
            flink.html(showlink);
        } else {
            var tid = $(this).attr("title");
            var tlink = $(".slide-link[title=" + tid + "]");
            tlink.html(hidelink);
        }
    });
 
    $(".slide-link").click(function() {
        var tid = $(this).attr("title");
        var content = $(".slide-content[title=" + tid + "]");
 
        if (content.hasClass("noshown")) {
            content.slideDown(500);
            $(this).fadeOut(250, function() {
                $(this).html(hidelink);
            });
            $(this).fadeIn(250);
            content.removeClass("noshown");
            content.addClass("shown");
        } else {
            content.slideUp(500);
            $(this).fadeOut(250, function() {
                $(this).html(showlink);
            });
            $(this).fadeIn(250);
            content.removeClass("shown");
            content.addClass("noshown");
        }
    });
});


/* table scrolling - [[User:UltrasonicNXT]] */
$(window).scroll(function(){
  placeDetection($(window).scrollTop());
});
 
function placeDetection(scroll){
  $(".ttbutton").each(function(index){
     var it = $(this).nextAll(".themetable").first();
     var top = it.offset().top;
     var bottom = it.outerHeight() + it.offset().top;
     var browser = $(window).height();
     if(it.outerHeight() > browser * 1.5){
        if(scroll >= top && scroll <= bottom && $(this).is(":hidden")){
           $(this).fadeIn();
        }
        if(scroll <= top || scroll >= bottom && $(this).is(":visible")){
           $(this).fadeOut();
        }
     } else {
        $(this).hide();
     }
  });
}
 
$(".ttbutton > .bottom").click(function(){
  var it = $(this).parent().nextAll(".themetable").first();
  var where = it.outerHeight() + it.offset().top - 100;
  $("html,body").animate({
     scrollTop: where
  }, 1500);
});
 
$(".ttbutton > .top").click(function(){
  var it = $(this).parent().nextAll(".themetable").first();
  var where = it.offset().top - 100;
  $("html,body").animate({
     scrollTop: where
  }, 1500);
});


// Title Rewrite
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
 
addOnloadHook(rewriteTitle);

$('#user-MeikoBot').remove();