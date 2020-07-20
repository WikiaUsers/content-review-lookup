/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');

   if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
      return;
   }

   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var articleDiv = $('#WikiaArticle');

         if (articleDiv.length > 0) {
            iconBar.css('display', 'block').prependTo(articleDiv);
         }
      } else if (skin == 'monobook') {
         var firstHeading = $('#firstHeading').css('position', 'relative');

         if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
         }
      }

      $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');

      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}

/* ######################################################################## */
/* ### SHOW/HIDE                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Collapsible tables using jQuery. Allows tables to   ### */
/* ###              be collapsed, showing only the header.              ### */
/* ### Credit:      User:Dantman                                        ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ShowHide/code.js      ### */
/* ######################################################################## */

function showHide() {
   // Configuration
   var config = window.ShowHideConfig = $.extend(true, {
      autoCollapse: 1,
      userLang: false,
      brackets: '[]',
      linkBefore: false,
      // English
      en: {
         show: 'show',
         hide: 'hide',
         showAll: 'show all',
         hideAll: 'hide all'
      }
   }, window.ShowHideConfig || {});

   // Function for multi-language support
   function msg(name) {
      if (config.userLang && wgUserLanguage in config && name in config[wgUserLanguage]) {
         return config[wgUserLanguage][name];
      }
      if (wgContentLanguage in config && name in config[wgContentLanguage]) {
         return config[wgContentLanguage][name];
      }
      return config.en[name];
   }
   
   // common
   $.fn.onLink = function(fn) {
      return this.bind('click keypress', function(e) {
         if (e.type === 'click' || (e.type === 'keypress' && (e.keyCode === 13 || e.charCode === 32))) {
            fn.call(this, e);
         }
      });
   };

   function collapseTable(node, state) {
      var   $table = $(node),
         $button = $table.find('tr:first > th:first .collapseLink');
   
      if (!$table.length || !$button.length) {
         return false;
      }
      
      if (typeof state === 'boolean') {
         $table.toggleClass('collapsed', !state);
      } else {
         $table.toggleClass('collapsed');
      }
      var hidden = $table.hasClass('collapsed');
      $table.find('> * > tr:not(:first):not(.nocollapse)')[hidden?"hide":"show"]();
      $button.text(msg(hidden ? "show" : "hide"));
      return true;
   }

   function createCollapseButtons() {
      var NavigationBoxes = [];
      $('table.collapsible').each(function () {
         NavigationBoxes.push(this);
         var   $buttonLink = $('<span class="collapseLink" />').text(msg('hide')).css({ 'cursor': 'pointer' }).onLink(function(e) { collapseTable($(this).closest('table')); }),
            $button = $('<span class="collapseButton" />').css({
            'float': 'right',
            'text-align': 'right',
            'font-weight': 'normal',
            'width': '40px'
         });
         $button.append(document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2));

         var $header = $(this).find('tr:first > th:first').prepend($button);
      });
   
      // if more Navigation Bars found than Default: hide all
      if ($(NavigationBoxes).filter('.autocollapse').length >= config.autoCollapse) {
         $(NavigationBoxes).filter('.autocollapse').each(function () { collapseTable(this, false); });
      } else {
         $(NavigationBoxes).filter('.collapsed').each(function () { collapseTable(this, false); });
      }
   }

   $(createCollapseButtons);
}

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (original)                                 ### */
/* ###              User:Grunny (bug fixes)                             ### */
/* ######################################################################## */

var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "The_Vault:WikiActivity");
var ajaxCallAgain = [];
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Enable auto-refreshing page loads';
var doRefresh = true;

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
   var exdate = new Date();
   exdate.setDate(exdate.getDate() + expiredays);
   document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
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

/**
 * Main function to start the Auto-refresh process
 */
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
         for(var i in ajaxCallAgain) {
            ajaxCallAgain[i]();
         }
      }
   } );

   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);

   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
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

/**
 * Does the actual refresh
 */
function loadPageData() {
   var cC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';
   $(cC).load(location.href + " " + cC + " > *", function (data) {
      if (doRefresh) {
         ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
      }
   });
}

/* ######################################################################## */
/* ### DISABLE ARCHIVE EDIT                                             ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Remove section edit links and gray out main edit    ### */
/* ###              button on archived talk pages                       ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function disableArchiveEdit () {
   // Configuration
   var userconfig = (window.DisableArchiveEditConfig) ? window.DisableArchiveEditConfig : {};
   var config = $.extend(true, {
      archiveSubpage: 'Archive',
      disableCompletely: false,
      textColor: '#D9D9D9',
      userLang: false,
      // English
      en: {
         archived: "Archived",
         archivedTooltip: "This page is an archive and should not be edited."
      }
   }, userconfig);
 
   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
   }
 
   // Check whether page is an archive
   if ((new RegExp('\\/\[' + config.archiveSubpage.substr(0,1).toUpperCase()
      + config.archiveSubpage.substr(0,1).toLowerCase() + '\]' + config.archiveSubpage.substr(1)
      + '\\s\*\\d\*')).test(wgTitle)) {
      // Remove "add new section" links and prepare altering "edit" page control
      switch (skin) {
         case 'monaco':
            $('#control_addsection').remove();
            $('#fe_newsection').remove();
 
            editlink = $('#ca-edit');
            break;
         case 'monobook':
            $('#ca-addsection').remove();
 
            editlink = $('#ca-edit > a');
            break;
         case 'oasis':
         case 'wikia':
            var oasisButton = $(($('#WikiaUserPagesHeader').length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button');
 
            oasisButton.children("a:first").prependTo($('ul:first', oasisButton)).wrap('<li />').children('img').remove();
            oasisButton.prepend('<a />');
            $('a[data-id="addtopic"]', oasisButton).parent().remove();
 
            editlink = $('a:first', oasisButton);
            break;
      }
 
      // Remove "edit section" links
      $('span.editsection').remove();
 
      // Alter "edit" page control
      if (config.disableCompletely) {
         editlink.remove();
      } else {
         editlink.attr('title', msg('archivedTooltip')).css('color', config.textColor).text(msg('archived'));
      }
   }
}
 
/* ######################################################################## */
/* ### COUNTDOWN                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Adds countdown to specific date to a page.          ### */
/* ###              (jQuery version of http://dev.wikia.com/Countdown)  ### */
/* ### Credit:      User:Splarka (original)                             ### */
/* ###              User:Porter21 (jQuery version)                      ### */
/* ######################################################################## */

// Usage example:
// <span class="countdown" style="display:none;">January 01 2020 00:00:00 PST</span>

function updateCountdowns(targets, countdowns) {
   var now = new Date();

   now = now.getTime();

   countdowns.each(function(i) {
      var diff = Math.floor((targets[i]-now)/1000);

      // determine plus/minus
      if (diff < 0) {
         diff = -diff;
      }

      // convert the difference into readable formatting
      var left = (diff%60) + ' seconds';

      diff = Math.floor(diff/60);
      if (diff > 0) {
         left = (diff%60) + ' minute' + ((diff%60 == 1) ? ' ' : 's ') + left;
      }
      diff = Math.floor(diff/60);
      if (diff > 0) {
         left = (diff%24) + ' hour' + ((diff%24 == 1) ? ' ' : 's ') + left;
      }
      diff = Math.floor(diff/24);
      if (diff > 0) {
         left = diff + ' day' + (diff == 1 ? ' ' : 's ') + left;
      }

      $(this).text(left);
   });

   setTimeout(function() { updateCountdowns(targets, countdowns); }, 1000);
}

function addCountdowns() {
   var targets = [];
   var countdowns = $('span.countdown').filter(function() {
      var content = $(this).text();
      var converted = new Date(content);

      if (content == "" || isNaN(converted)) {
         return false;
      } else {
         $(this).css("display", "inline");
         targets[targets.length] = converted.getTime();
         return true;
      }
   });

   if (targets.length <= 0) {
      return;
   }

   updateCountdowns(targets, countdowns);
}

/* ######################################################################## */
/* ### DUPLICATE FILE LIST                                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Finds duplicate files on the wiki.                  ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ######################################################################## */

function findDupFiles(gf) {
   var fileDiv = $('#mw-dupfiles');

   if (fileDiv.length) {
      dil = new Array();
      ajaxIndicator = stylepath + '/common/progress-wheel.gif';
      output = '';
      url = '/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json';

      if (!($('#dupFilesProgress').length)) {
         fileDiv.prepend('<span style="float: right;" id="dupFilesProgress" title="In progress..."><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="In progress..." /></span>');
      }

      if (gf) {
         url += "&gaifrom=" + gf;
      }

      $.getJSON( url, function (data) {
         if ( data.query ) {
            pages = data.query.pages;

            for (pageID in pages) {
               dils = "," + dil.join();

               if ( dils.indexOf("," + pages[pageID].title) == -1 
                  && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
                  output += "<h3><a href='/wiki/" + encodeURIComponent(pages[pageID].title).replace(/'/g, "%27") + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";

                  for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
                     output += "<li><a href='/wiki/File:" + encodeURIComponent(pages[pageID].duplicatefiles[x].name).replace(/'/g, "%27") + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                     dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                  }
                  output += "</ul>\n\n"
               }
            }

            fileDiv.append(output);

            if (data["query-continue"]) {
               setTimeout("findDupFiles('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
            } else {
               $('#dupFilesProgress').hide();
            }
         }
      } );
   }
}

/* ######################################################################## */
/* ### CHAT IMPROVEMENTS                                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Improvements for Special:Chat                       ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function openChatWindow() {
   vaultChatWindow = window.open('/wiki/Special:Chat', 'wikiachat', 'width=600, height=600, location=no, menubar=no, resizable=yes, scrollbars=no, status=no, toolbar=no');
   return vaultChatWindow;
}

function rewriteChatLink() {
   $('#WikiHeader > nav > ul > li > ul.subnav > li > a[href="/wiki/Special:Chat"]').click(function(e){
      e.preventDefault();
      openChatWindow();
      return false;
   });
}

/* ######################################################################## */
/* ### JQUERY AJAX PATROL LINKS                                         ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Mark pages as patrolled via AJAX                    ### */
/* ### Credit:      User:Grunny (http://dev.wikia.com)                  ### */
/* ######################################################################## */

function ajaxPatrolLinks() {
   var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
   var patrolLinks = $('.patrollink');

   if(!patrolLinks.length) {
      return;
   }

   patrolLinks.click(function (e) {
      var curLink = $(this);
      var curURL = curLink.children('a').attr('href');

      e.preventDefault();
      curLink.html('<img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Marking as patrolled..." />');
      $.get(curURL, function (data) {
         curLink.css('color', 'grey').text('[Marked as patrolled]');
      });
   });
}

/* ######################################################################## */
/* ### SCRIPT LOADER                                                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Loads all the other scripts                         ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function vaultScriptLoader () {
   // Always loaded
   addCountdowns();
   showHide();
   rewriteChatLink();
   ajaxPatrolLinks();

   // Only loaded for specific namespaces
   if ((wgNamespaceNumber == 0 || wgNamespaceNumber == 4 || wgNamespaceNumber == 110 || wgNamespaceNumber == 502) &&
      !window.wgIsMainpage) {
      addTitleIcons();
   }

   // Only loaded for specific pages
   if (wgPageName == 'The_Vault:Duplicate_files') {
      findDupFiles();
   }

   for (var x in ajaxPages) {
      if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) {
         preloadAJAXRL();
      }
   }
}

jQuery(function($) {
   vaultScriptLoader();
});

/* </nowiki> */

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
 
 
// END JavaScript title rewrite
 
addOnloadHook(rewriteTitle);