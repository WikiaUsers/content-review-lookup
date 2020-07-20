$('#WikiaArticle').prepend('<div class="wiki-notice" id="mp-footer">The wiki\'s theme change is finally afloat! Visit this thread for more details. Thanks! <b><a href="http://fancreations.wikia.com/wiki/Thread:3754">Link to thread</a></b></div>');

window.InactiveUsers = { 
    months: 1,
    text: '<a href="http://fancreations.wikia.com/wiki/Fan_Creations:Inactive_Users" target="_blank"><span style="color:white">Inactive</span></a>'
};


$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});

/* AJAX */
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:NewPages"];

// remove links to base page(s) from a sub page for Oasis skin. See Template:Subpagelinkremove
if ($('#WikiaArticle span.base-page-links-remove').length) {
	$("header#WikiaPageHeader h2:last-child").remove();
	$("#WikiaArticle span.base-page-links-remove").remove();
}

// minor edits button help link (discluding wide mode)
$(function() {
	if ($("body.editor #EditPage .module_content .checkboxes label.wpMinoredit").length > 0) { // check whether a an older revision exists
		$("body.editor #EditPage .module_content .checkboxes").append('<a id="minor-edit-help" href="/wiki/Help:Minor_edits" title="What is this?" target="_blank" style="font-size: 11px;">(help)</a>');
		$("body.editor #EditPage .module_content .checkboxes .wpMinoredit").css("display","inline-block");
	}
});

/* add [[Template:TalkMessage]] when creating a new edit section */
 
if ( mw.config.get("wgNamespaceNumber") == 3 && mw.config.get("wgPageName") != "User_talk:"+mw.config.get("wgUserName") ) {
	$('#WikiaMainContent nav.wikia-menu-button > a').attr("href",$('#WikiaMainContent nav.wikia-menu-button > a').attr("href")+"&preload=Template:TalkMessage");
} else {
	$('body.ns-talk #WikiaPageHeader nav.wikia-menu-button > a[data-id="addtopic"]').attr("href",$('nav.wikia-menu-button > a[data-id="addtopic"]').attr("href")+"&preload=Template:TalkMessage");
}

/* replace message wall links to talk page links in wiki activity feeds */ 
$(".activity-ns-2001 a.real-name").each(function() { 
    $(this).attr("href", $(this).attr("href").replace("/Message_Wall:", "/User_talk:") ); 
});

/* importArticles */
console.info("MediaWiki:Wikia.js - starts importArticles");

importArticles({
	type: "style",
	articles: [
		"u:rs:MediaWiki:Gadget-Preload.css"
	]
});

/* Switchtabs */
$(function() {
    if (!document.getElementById("switchtabs")) {
        return;
    }
    var page = wgTitle.replace(/&/g, "%26");
    var inv = "<a id='inv' href='http://fancreations.wikia.com/wiki/Sandbox:" + page + "'>Sandbox</a>";
    var rev = "<a id='rev' href='http://fancreations.wikia.com/wiki/Talk:" + page + "'>Reviews</a>";
    var wiki = "<a id='wiki' href='http://fancreations.wikia.com/wiki/" + page + "'>Encyclopedia</a>";
    var string = wiki + inv + rev;
    document.getElementById("switchtabs").innerHTML = string;

    var ns = wgNamespaceNumber;
    switch (ns) {
    case 0:
        document.getElementById("wiki").className = "selected";
        break;
    case 114:
        document.getElementById("inv").className = "selected";
        break;
    case 118:
        document.getElementById("rev").className = "selected";
        break;
    }
});

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://fancreations.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

$(function addLikeButton() {
     if (wgPageName == "Fan_Creations_Wiki") {
          $('.WikiaPageHeader').append('<a href="https://www.facebook.com/pages/Fan-Creations-Wiki/306271922903927"><img title="Like us on Facebook" src="https://images.wikia.nocookie.net/__cb20150114192838/fancreations/images/9/9b/Facebook2.png" width="54" height="24" data-image-name="Facebook2.png" data-image-key="Facebook2.png"></a>');
   }
});

// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$(function eraIconsOasis() {
	$('.WikiaPageHeader').append($('#title-eraicons'));
	$('#title-eraicons').css({'position':'absolute', 'right':'0', 'bottom':'-2em'}).show();
});

/**
 * Adds link to image criteria on Wikia rail chat module
 */
$(function modalUploadImageMessage() {
    var seeMore = $('.NewFilesModule').find('a.more');
    $(seeMore).wrap('<span />');
    $('<a href=\"http://fancreations.wikia.com/wiki/Fan Creations:Policies\#File Policy\" title=\"Fan Creations:Policies\#File Policy\" class=\"more\" style=\"margin-right: 5px\">File policy ></a>').insertAfter(seeMore);
});
 
$(function removeTouchScreenScssOverride() {
    var element = $('link[rel="stylesheet"][href*="skins/oasis/css/touchScreen.scss"]');
    element.remove();
});

// Template:ButtonHover - function of the parameter value "|hidebottom= true"
 
$(".fadeout-container.fadeout-hide-bottom .fadeout").mouseover(function() {
	$(this).parent().find(".fadein").css("visibility","visible");
});
$(".fadeout-container.fadeout-hide-bottom .fadeout").mouseout(function() {
	$(this).parent().find(".fadein").css("visibility","hidden");
});

/*Notepad module - no longer active
if (["view", "submit"].indexOf(mw.config.get("wgAction")) > -1 && mw.config.get("skin") == "oasis" && $("#WikiaRail").length > 0) {
        // view action in oasis, where the rail exists
        function onRailLoad() {
                var section = $('<section class="UserScribbleModule module" id="UserScribbleModule"><h1 class="activity-heading">Notepad</h1></section>');
                if ($("#scribble-pad").length == 1) {
                        // pad exists somewhere in this page
                        $("#scribble-pad").after('<div style="padding: 2px; background: #bfb; border: 1px solid black; font-weigh: bold; color: purple;">Please note: <a href="/wiki/Template:Notepad">Template:Notepad</a> appears in this page and has been moved to the wiki rail.</div>');
                        $("#scribble-pad").prev().appendTo(section);
                        $("#scribble-pad").appendTo(section);
                } else {
                        window.storeUserScribble = function(id) {
                                var scribble = document.getElementById('scribble').innerHTML;
                                localStorage.setItem('userScribble',scribble);
                        }
                        window.getUserScribble = function() {
                                if ( localStorage.getItem('userScribble')) {
                                        var scribble = localStorage.getItem('userScribble');
                                } else {
                                        var scribble = '';
                                }
                                document.getElementById('scribble').innerHTML = scribble;
                        }
                        window.clearLocal = function () { 
                          localStorage.removeItem("userScribble"); 
                          $("#scribble").html(""); 
                        }
                        $(section).append('<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Gnome-edit-delete.svg/16px-Gnome-edit-delete.svg.png" style="float: right; margin-right: -14px; cursor: pointer;" title="Clear local storage" onclick="javascript:clearLocal();" /><div id="scribble-pad"><pre id="scribble" contenteditable="true" onkeyup="storeUserScribble(this.id);"></pre></div>');
                }
                $(section).appendTo("#WikiaRail");
                $("#scribble").css({
                        width: "115px",
                        padding: "120px 75px 100px 75px"
                });
                $("#scribble-pad").css({
                        width: "auto",
                        height: "auto"
                });
                getUserScribble();
        }
        function timeOut() {
                setTimeout(function() {
                        if ($("#WikiaRail > section").length > 0) {
                                onRailLoad();
                        } else {
                                timeOut();
                        }
                }, 500);
        }
        timeOut();
}
*/

// Opens chat in new tab instead of new window
$("div.chat-join button").remove();
$("div.chat-join").append('<a href="http://fancreations.wikia.com/wiki/Special:Chat" target="_blank"><button type="button">Join the Chat</button></a>');

/*Template:Sidebar on the rail - no longer active
$(document).ready(function() {
    var newSection = '<section id="Sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#Sidebar').append(code);
    });
});
*/

/**
 * UserInfo - Displays a small table of information about that user
 *
 * @author Shining-Armor: thanks Shining!
 */

var SA = window.SA || {};

SA.widget = SA.widget || {};
SA.widget.info = {};

SA.widget.info.data = {};

SA.widget.info.fn = {};
SA.widget.info.fn.ui = {};
SA.widget.info.fn.ui.loader = {};
SA.widget.info.fn.ui.table = {};
SA.widget.info.fn.data = {};

SA.widget.info.fn.ui.loader.updateLoadingIcon = function( m ) {
    var saUserInfo = document.getElementById( 'sa-user-info' );
    if (saUserInfo) {
        saUserInfo.innerText = m;
    }
};

SA.widget.info.fn.ui.loader.loggedIn = function() {
  var message;
  
  if ( typeof SA.widget.info.data.userName === 'string' ) {
    message = 'Loading your data ' + SA.widget.info.data.userName + '! One moment...';
    SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SA.widget.info.data.status = true;
  } else {
    message = 'Please login to use this widget!';
    SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SA.widget.info.data.status = false;
  }
};

SA.widget.info.fn.ui.table.init = function() {
  SA.widget.info.data.table = document.createElement( 'table' );
  SA.widget.info.data.tableHeading = document.createElement( 'tr' );
  SA.widget.info.data.tableBody = document.createElement( 'tr' );
  
  SA.widget.info.data.table.setAttribute( 'class', 'wikitable' );
};

SA.widget.info.fn.ui.table.addEntry = function( k, v ) {
  var col, row;

  if ( k === 'registration' ) {
    v = SA.widget.info.fn.data.parseTimeStamp( v );
  }

  row = document.createElement( 'td' );
  row.innerText = k;

  col = document.createElement( 'td' );
  col.innerText = v;

  SA.widget.info.data.tableHeading.appendChild( row );
  SA.widget.info.data.tableBody.appendChild( col );
};

SA.widget.info.fn.ui.table.print = function() {
  SA.widget.info.data.table.appendChild( SA.widget.info.data.tableHeading );
  SA.widget.info.data.table.appendChild( SA.widget.info.data.tableBody );
  if (document.getElementById( 'sa-user-info' )) {
    document.getElementById( 'sa-user-info' ).innerText = '';
    document.getElementById( 'sa-user-info' ).appendChild( SA.widget.info.data.table );
  }
};

SA.widget.info.fn.data.parseTimeStamp = function( ts ) {
  var endings = [
    'st',
    'nd',
    'rd',
    'th'
  ];
  var months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };

  var stamps = ts.split( 'T' );

  stamps[1] = stamps[1].replace( 'Z', '' );
  stamps[0] = stamps[0].split( '-' );

  if ( parseInt( stamps[0][2] ) < 10 ) {
    stamps[0][2] = stamps[0][2].replace( '0', '' );
  }

  if ( stamps[0][2] === '1' ) {
    stamps[0][2] += endings[0];
  } else if (  stamps[0][2] === '2' ) {
    stamps[0][2] += endings[1];
  } else if (  stamps[0][2] === '3' ) {
    stamps[0][2] += endings[2];
  } else {
    stamps[0][2] += endings[3];
  }

  return months[stamps[0][1]] + ' ' + stamps[0][2] + ', ' + stamps[0][0] + ' at ' + stamps[1] + ' (UTC)';
};

SA.widget.info.fn.data.fetchUserInfo = function() {
  $.ajax({
    crossDomain: true,
    url: 'http://community.wikia.com/api.php',
    type: 'POST',
    data: {
      action: 'query',
      list: 'users',
      ususers: SA.widget.info.data.userName,
      usprop: 'registration|gender',
      format: 'json'
    },
    dataType: 'JSONP',
    success: function( data ) {
      data = $(data['query']['users']);
      data = data[0];

      console.log( data );

      SA.widget.info.fn.ui.table.init();

      for (var key in data) {
        SA.widget.info.fn.ui.table.addEntry( key, data[key] );
      }

      SA.widget.info.fn.ui.table.print();
    },
    error: function() {
      var message = 'An error occured while fetching your information!';
      SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    },
  });
};

SA.widget.info.fn.init = function() {
  SA.widget.info.data.userName = mw.config.get( 'wgUserName' );
  SA.widget.info.fn.ui.loader.loggedIn();
  if ( SA.widget.info.data.status === false ) return;
  SA.widget.info.fn.data.fetchUserInfo();
};

SA.widget.info.fn.init();


//User Page Tabs
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = {
        'Sandbox': '/Sandbox',
};
    var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
    if (!name.length) return;
    name = name.text();
    var tabs = document.createDocumentFragment(), li, a;
    for (var tab in newTabs) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.title = 'User:' + name + newTabs[tab];
        a.href = mw.util.wikiGetlink(a.title);
        a.appendChild(document.createTextNode(tab));
        li.appendChild(a);
        tabs.appendChild(li);
    }
    $tabs.append(tabs);
});
});

 
//Scrolls Games left and right
$('.ArrowLeft').click(function () {
    scroll = $('#PortalCarousel').scrollLeft();
    $('#PortalCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.ArrowRight').click(function () {
    scroll = $('#PortalCarousel').scrollLeft();
    $('#PortalCarousel').animate({'scrollLeft': scroll+540},1000);
});
 
/* Custom "NewFilesModule" by 452 - displays [[Special:NewFiles]] in the right rail
   There are three ways to use this, by setting the NewFilesModuleCompact variable
   0 - Normal, width is 212, hovering over each displays the uploader info.
   1 - Compact, width is 106, hovering does nothing.
   2 - Random, if you're not sure which version you like best.
 
   NewFilesModuleCount can be used to specify the number of displayed images.
*/
var NewFilesModuleCompact = 0; //must be 0, 1, or 2.
var NewFilesModuleCount = 13; //any integer
 
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h2>New Files<a class='wikia-button' href='/Special:Upload'>Upload</a></h2>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 0) NewFilesModuleCompact = Math.floor(Math.random()*0);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
    $('head').append('<style type="text/css">\n#gallery- { overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em; height:150px; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; padding: 5px; margin-top: 0;}\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
} 

/* End of custom "NewFilesModule " */

// Footer - credit to Wikitubia (youtube.wikia.com)
$(document).ready(function() {
    var newSection = '<div id="footer">' + '</div>';
    $('.WikiaFooter section').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Footer}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('div#footer').append(code);
    });
});

// END

/* DiscordBanner */
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'rYnNnC2',
    prependToRail: false
};