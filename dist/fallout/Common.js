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

/* Games template fix to remove Lazy load by User:Sakaratte                 */
function rmvLzyLoad(lazyIcon) {
    var lazyIconCleanse = lazyIcon.getElementsByTagName("img");
    for (i = 0; i < lazyIconCleanse.length; i++)
        {
            var iconSrc = lazyIconCleanse[i].getAttribute("data-src");
            if (iconSrc !== null) /*Does nothing if there is no data-src */ { 
            lazyIconCleanse[i].setAttribute("src", iconSrc);
        }
            lazyIconCleanse[i].className="";
    }
}

var gamesCheck = document.getElementById("va-titleicons");

if (gamesCheck !== null)
{
    var lazyIconSmall = document.getElementById("va-titleicons-preview");
    var lazyIconLarge = document.getElementById("va-titleicons-fullsize");
    rmvLzyLoad(lazyIconSmall);
    rmvLzyLoad(lazyIconLarge);
}

var lzyHelip = document.getElementById("np-collapsed");
    if (lzyHelip !== null) {
        rmvLzyLoad(lzyHelip);
    }


jQuery(function($) { /* Fallout 4 map generation */
	var mapImageSize = 2048;
	var topLeft = [-143810, 110476];
	var bottomRight = [123810, -157143];
	var fullWidth = bottomRight[0] - topLeft[0];
	var fullHeight = topLeft[1] - bottomRight[1];
	var upp = fullWidth / mapImageSize;
	var generateMap = function() {
		var $e = $(this);
		if ($e == null) return;
		var width = $e.width();
		var height = $e.height();
		if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) return;
		var data = $e.data();
		var mapTopLeft = topLeft;
		var mapBottomRight = bottomRight;
		var mapUpp = upp;
		if (data.zoom && data.zoom === true) {
			var minX = bottomRight[0];
			var maxX = topLeft[0];
			var minY = topLeft[1];
			var maxY = bottomRight[1];
			$('div[data-coords]', this).each(function() {
				var $m = $(this);
				var marker = $m.data();
				if (marker.coords) {
					var coords = marker.coords.split(',');
					if (coords.length < 2) return;
					var x = +coords[0];
					var y = +coords[1];
					if (isNaN(x) || isNaN(y)) return;
					if (minX > x) minX = x;
					if (maxX < x) maxX = x;
					if (minY > y) minY = y;
					if (maxY < y) maxY = y;
				}
			});
			var center = [(minX + maxX) / 2, (minY + maxY) / 2];
			minX = center[0] + ((minX - center[0]) * 1.2);
			maxX = center[0] + ((maxX - center[0]) * 1.2);
			minY = center[1] + ((minY - center[1]) * 1.2);
			maxY = center[1] + ((maxY - center[1]) * 1.2);
			var dX = maxX - minX;
			var dY = maxY - minY;
			// The following assumes a square map div:
			var maxDist = dX > dY ? dX : dY;
			if (maxDist / width < upp) {
				maxDist = upp * width;
			}
			mapUpp = maxDist / width;
			var delta = maxDist / 2;
			mapTopLeft = [center[0] - delta, center[1] + delta];
			mapBottomRight = [center[0] + delta, center[1] - delta];
		}
		var sizeX = mapBottomRight[0] - mapTopLeft[0];
		var sizeY = mapTopLeft[1] - mapBottomRight[1];
		var lX = 1 / sizeX;
		var lY = 1 / sizeY;
		var xScale = fullWidth * lX;
		$e.css('background-size', (xScale * 100) + '%');
		if (xScale > 1) {
			// the position of our centroid within the original map area,
			// clipped by the margin of our extent:
			var originDX = mapTopLeft[0] - topLeft[0];
			var originDY = topLeft[1] - mapTopLeft[1];
			var bgpX = originDX / (fullWidth - sizeX);
			var bgpY = originDY / (fullHeight - sizeY);
			$e.css('background-position',
				(bgpX * 100) + '% ' + (bgpY * 100) + '%');
		}
		$('div[data-coords]', this).each(function() {
			var $m = $(this);
			var marker = $m.data();
			if (marker.coords) {
				var coords = marker.coords.split(',');
				var x = (coords[0] - mapTopLeft[0]) * lX;
				var y = (mapTopLeft[1] - coords[1]) * lY;
				$m.css('left', (x * 100) + '%');
				$m.css('top', (y * 100) + '%');
			}
			if (marker.rotation) {
				$m.css('transform', 'rotate(' + marker.rotation + 'deg)');
			}
		});
	};
	$('.fallout4-map').each(generateMap);
}); /* End Fallout 4 map generation */

/* ######################################################################## */
/* ### ARCHIVE TOOL                                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: AJAX-archiving of talk pages via GUI                ### */
/* ### Credit:      User:Dantman (original)                             ### */
/* ###              User:Porter21 (Oasis & Monobook support)            ### */
/* ### Disclaimer:  See https://dev.wikia.com/wiki/ArchiveTool/code.js  ### */
/* ######################################################################## */

function archiveTool() {
   // Configuration
   var userconfig = (window.ArchiveToolConfig) ? window.ArchiveToolConfig : {};
   var config = $.extend(true, {
      archiveListTemplate: 'Archives',
      archivePageTemplate: 'Archivepage',
      archiveSubpage: 'Archive',
      userLang: false,
      // English
      en: {
         buttonArchiveTool: "Archive",
         buttonArchiveToolTooltip: "Archive this page",
         buttonSelectAll: "Select all",
         buttonDeselectAll: "Deselect all",
         buttonSaveArchive: "Save archive",
         buttonAbort: "Abort",
         labelLines: "Lines",
         labelSections: "Sections",
         summaryArchiveFrom: "ArchiveTool: Archiving from",
         summaryArchiveTo: "ArchiveTool: Archiving to"
      }
   }, userconfig);

   // Function for multi-language support
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
   }
   
   if (skin != "monaco" && skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
      return;
   }

   if ((wgNamespaceNumber%2 != 0 && wgNamespaceNumber != 501) && (wgAction == "view" || wgAction == "purge")) {
      var skinConfig = {
         textCont: '', pageControls: '', controlsMarkup: '',
         buttonOpenPri: '', buttonOpenSec: '', buttonClose: ''
      };

      switch(skin) {
         case 'monaco':
            skinConfig.textCont = '#bodyContent';
            skinConfig.pageControls = '#page_controls';
            skinConfig.controlsMarkup = '<li id="control_archive"><img src="/skins/common/blank.gif" class="sprite move" /><a id="ca-archive" title="' + msg('buttonArchiveToolTooltip') + '" href="#" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<a class="wikia-button">';
            skinConfig.buttonOpenSec = '<a class="wikia-button secondary">';
            skinConfig.buttonClose = '</a>';
            break;
         case 'monobook':
            skinConfig.textCont = '#bodyContent';
            skinConfig.pageControls = '#p-cactions > div > ul';
            skinConfig.controlsMarkup = '<li id="control_archive"><a id="ca-archive" title="' + msg('buttonArchiveToolTooltip') + '" href="#" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<input type="submit" style="font-weight: bold;" value="';
            skinConfig.buttonOpenSec = '<input type="submit" value="';
            skinConfig.buttonClose = '" />';
            break;
         case 'oasis':
         case 'wikia':
            skinConfig.textCont = '#WikiaArticle';
            skinConfig.pageControls = ($('#WikiaUserPagesHeader').length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul';
            skinConfig.controlsMarkup = '<li id="control_archive"><a id="ca-archive" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<a class="wikia-button">';
            skinConfig.buttonOpenSec = '<a class="wikia-button secondary">';
            skinConfig.buttonClose = '</a>';
            break;
      }

      $(function() {
         function api(q, fn) {
            q.format = 'json';
            return $.post(wgScriptPath + '/api.php', q, fn, "json");
         }
         function token(page, fn) {
            api({
               action: 'query',
               query: 'prop',
               prop: 'info',
               titles: page,
               intoken: 'edit'
            }, function(q) {
               for ( var k in q.query.pages )
                  return fn(q.query.pages[k]);
            });
         }
         
         function startArchiving() {
            var c = config.archiveListTemplate.substr(0,1);
            var archiveListRegex = '['+c.toUpperCase()+c.toLowerCase()+']'+config.archiveListTemplate.substr(1);
            var bc = $(skinConfig.textCont).addClass('va-archiving').empty();

            $('<img class="ajax" alt="Loading..." />')
               .attr({src: stylepath+'/common/progress-wheel.gif'}).appendTo(bc);
            api({
               action: 'query',
               prop: 'revisions',
               titles: wgPageName,
               rvprop: 'timestamp|content'
            }, function(q) {
               bc.empty();
               var rev = q.query.pages[wgArticleId].revisions[0];
               var time = rev.timestamp;
               var talkToken, tokenTime;
               var content = rev['*'];
               token(wgPageName, function(p) {
                  talkToken = p.edittoken;
                  tokenTime = p.starttimestamp;
               });
               
               var lines = content.split('\n');
               
               var table = $('<table style="margin: 10px 0;"><thead><tr><th>' + msg('labelLines') + '</th><th title="' + msg('labelSections') + '">{&hellip;}</th></tr></thead></table>').appendTo(bc);
               var ul = $('<tbody/>').appendTo(table);
               
               for ( var l = 0; l < lines.length; l++ ) {
                  var line = lines[l];
                  $('<tr/>').toggleClass('noarchive', (new RegExp('^\\{\\{'+archiveListRegex+'\}\}')).test(line))
                     .attr({line:line})
                     .append( $('<td class=line />').text(line).append('&nbsp;') ).appendTo(ul);
               }
               
               var sections = [];
               var sectionEnd = lines.length-1;
               for ( var l = lines.length-1; l >= 0; l-- ) {
                  var line = lines[l];
                  
                  if ( /^=.+?=/.test(line) || l === 0 ) {
                     var section = { start: l, end: sectionEnd };
                     section.length = section.end - section.start + 1;
                     sections.unshift(section);
                     
                     sectionEnd = l-1;
                  }
               }
               
               var section;
               while( section = sections.shift() ) {
                  var tr = ul.children().eq(section.start);
                  $('<td class=section />').attr({rowspan: section.length}).appendTo(tr);
               }
               
               $('<div class="buttons" style="text-align: right;" />').append(
                  $(skinConfig.buttonOpenSec + msg('buttonSelectAll') + skinConfig.buttonClose).click(function(e) {
                     e.preventDefault();
                     ul.children('tr').addClass('archive');
                  }), ' ',
                  $(skinConfig.buttonOpenSec + msg('buttonDeselectAll') + skinConfig.buttonClose).click(function(e) {
                     e.preventDefault();
                     ul.children('tr').removeClass('archive');
                  }), ' ',
                  $(skinConfig.buttonOpenPri + msg('buttonSaveArchive') + skinConfig.buttonClose).click(function(e) {
                     archive();
                  }), ' ',
                  $(skinConfig.buttonOpenPri + msg('buttonAbort') + skinConfig.buttonClose).click(function(e) {
                     bc.find('.ajax').remove();
                     location = wgServer+wgScript+'?title='+encodeURI(wgPageName)+'&action=purge';
                  })
               ).prependTo(bc).clone(true).appendTo(bc);
               
               var click = false;
               var add;
               table.mousedown(function(e) {
                  e.preventDefault();
                  var $li = $(e.target).closest('tr');
                  if(!$li.length) return;
                  var $section = $(e.target).closest('.section');
                  if ( $section.length ) {
                     var slist = $li.nextAll(':lt('+(parseInt($section.attr('rowspan'),10)-1)+')').andSelf();
                     var sadd = slist.filter(function() { return !$(this).hasClass('archive') }).length;
                     slist.toggleClass('archive', !!sadd);
                     return;
                  }
                  click = true;
                  add = !$li.hasClass('archive');
                  
                  $li.toggleClass('archive', !!add);
               });
               table.mouseover(function(e) {
                  if (!click) return;
                  var $li = $(e.target).closest('tr');
                  if(!$li.length) return;
                  
                  $li.toggleClass('archive', !!add);
               });
               $('body').mouseup(function(e) {
                  click = false;
               });
               
               function archive() {
                  var talkLines = [];
                  var archiveLines = [];
                  ul.children().each(function() {
                     var arr = $(this).hasClass('noarchive') || !$(this).hasClass('archive')
                        ? talkLines : archiveLines;
                     
                     arr.push( $(this).attr('line') );
                  });
                  
                  if ( !(new RegExp('^\\{\\{'+archiveListRegex+'\}\}')).test(talkLines[0]) )
                     talkLines = ['{{'+config.archiveListTemplate+'}}', ''].concat(talkLines);
                  archiveLines = ['{{'+config.archivePageTemplate+'}}', ''].concat(archiveLines);
                  
                  bc.empty();
                  $('<img class="ajax" alt="Loading..." />')
                     .attr({src: stylepath+'/common/progress-wheel.gif'}).appendTo(bc);
                  
                  runArchive(talkLines.join('\n'), archiveLines.join('\n'));
               }
               
               var archiveTitle;
               function runArchive(talkContent, archiveContent) {
                  var archiveNo;
                  function findArchives() {
                     var m = $('<p>Finding archive id: </p>').appendTo(bc);
                     api({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: wgNamespaceNumber,
                        apprefix: wgTitle+'/'+config.archiveSubpage,
                        aplimit: 1,
                        apdir: 'descending'
                     }, function(q) {
                        archiveNo = q.query.allpages.length ?
                           parseInt(q.query.allpages[0].title.substr(wgPageName.length+("/"+config.archiveSubpage).length),10)+1 :
                           1;
                        archiveTitle = wgPageName+'/'+config.archiveSubpage+' '+archiveNo;
                        m.append('done... (using '+archiveNo+')');
                        
                        saveArchive();
                     });
                  }
                  
                  function saveArchive() {
                     var m = $('<p>Finding token for '+archiveTitle+': </p>').appendTo(bc);
                     token(archiveTitle, function(p) {
                        m.append('done...');
                        m = $('<p>Saving archive page: </p>').appendTo(bc);
                        api({
                           action: 'edit',
                           title: archiveTitle,
                           text: archiveContent,
                           token: p.edittoken,
                           summary: msg('summaryArchiveFrom') + " [[" + wgPageName + "]].",
                           minor: true,
                           createonly: true
                        }, function(q) {
                           if ( q.error && q.error.code === "articleexists" ) {
                              m.append('failed...');
                              bc.append("<p>The archive page we tried to create already exists.</p>");
                              return abort();
                           }
                           m.append('done...');
                           
                           saveTalk();
                        });
                     });
                  }
                  
                  function saveTalk() {
                     var m = $('<p>Finding token for '+wgPageName+': </p>').appendTo(bc);
                     m.append('done...');
                     m = $('<p>Updating talk page: </p>').appendTo(bc);
                     api({
                        action: 'edit',
                        title: wgPageName,
                        text: talkContent,
                        token: talkToken,
                        summary: msg('summaryArchiveTo') + " [[" + archiveTitle + "]].",
                        minor: true,
                        basetimestamp: time,
                        starttimestamp: tokenTime
                     }, function(q) {
                        if ( q.edit.result === "Success" ) {
                           m.append('done...');
                           bc.find('.ajax').remove();
                           location = wgServer+wgScript+'?title='+encodeURI(wgPageName)+'&action=purge';
                        } else {
                           m.append('failed...');
                           bc.append("<p>Failed to update talkpage, you may wish to have the archive subpage we just created deleted.</p>");
                           return abort();
                        }
                     });
                  }
                  
                  function abort() {
                     bc.find('.ajax').remove();
                     bc.append("<p>Aborting...</p>");
                     
                     $("<p>You may want to </p>")
                        .append( $('<a>refresh</a>').attr({href: wgServer+wgArticlePath.replace('$1', encodeURI(wgPageName))}) )
                        .append(' and try again.')
                        .appendTo(bc);
                  }
                  
                  // start
                  findArchives();
               }
            });
         }
         
         $(skinConfig.controlsMarkup)
            .click(startArchiving)
            .appendTo(skinConfig.pageControls);
      });
   }
}

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (original)                                 ### */
/* ###              User:Grunny (bug fixes)                             ### */
/* ######################################################################## */

var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "Fallout_Wiki:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Enable auto-refreshing page loads';
var doRefresh = true;
var ajaxBC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';

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

         // Re-run certain functions
         if ($(ajaxBC + ' .mw-collapsible').length) {
            $(ajaxBC + ' .mw-collapsible').makeCollapsible();
         }
 
         if (mw.config.get("wgNamespaceNumber") == -1 
            && mw.config.get("wgCanonicalSpecialPageName") == "Recentchanges") {
            mw.special.recentchanges.init();
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
   $(ajaxBC).load(location.href + " " + ajaxBC + " > *", function (data) {
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
/* ###              (jQuery version of https://dev.wikia.com/Countdown) ### */
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
/* ### Credit:      User:pcj (https://www.wowpedia.org)                 ### */
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
/* ### Credit:      User:Grunny (https://dev.wikia.com)                 ### */
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
   rewriteChatLink();
   ajaxPatrolLinks();

   // Only loaded for specific namespaces
   if ((wgNamespaceNumber == 0 || wgNamespaceNumber == 4 || wgNamespaceNumber == 110 || wgNamespaceNumber == 502) &&
      !window.wgIsMainpage) {
      addTitleIcons();
   }

   if (wgNamespaceNumber%2 != 0 && wgNamespaceNumber != 501) {
      archiveTool();
      disableArchiveEdit();
   }

   // Only loaded for specific pages
   if (wgPageName == 'Fallout_Wiki:Duplicate_files') {
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

/* ######################################################################## */
/* ### IMAGE TOGGLER                                                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Allows toggling of several images in infoboxes      ### */
/* ### Credit:      User:MarkvA                                         ### */
/* ######################################################################## */
$(document).ready(function() {
var infoboxHasImageToggler = $('table.va-infobox').hasClass('imagetoggler-enabled');

if(infoboxHasImageToggler == true) {
	var ImageToggler = {};
	ImageToggler.count = 0;
	ImageToggler.images = [];
	function setupToggler() {
		$('tr.va-infobox-row-mainimage').each(function(i) {
			$(this).attr("id",'imagetoggler-'+i);
			$(this).addClass("imagetoggler");
			var currentToggler = $(this).closest("tr.va-infobox-row-mainimage").attr("id");
		});
		$('tr.va-infobox-row-mainimage .va-infobox-mainimage-image a').each(function(i) {
			var currentToggler = $(this).closest("tr.va-infobox-row-mainimage").attr("id");
			$(this).addClass('imagetoggler-image imagetoggler-image-'+i);
		
			ImageToggler.images.push(currentToggler+'^'+$(this).attr('href'));
			ImageToggler.count = ImageToggler.count + 1;
		});

	}
	setupToggler();
		
	if(ImageToggler.count > 0) {
		
		$('.va-infobox-mainimage').prepend('<div class="imagetoggler-thumbs"></div>');
		
		$('.imagetoggler').each(function(i) {
		var currentToggler = $(this).attr("id");
			$('#'+currentToggler + ' .imagetoggler-image').each(function(i) {
				if(i == 0) {
					$(this).css('display','inline');
				}
				else {
					$(this).css('display','none');
				}
			});
		});
		
		$(ImageToggler.images).each(function(i) {
			var splitHref = ImageToggler.images[i].split('^');
			var currentToggler = splitHref[0];
			var currentHref = splitHref[1];

			$('#' + currentToggler + ' .imagetoggler-thumbs').append('<img class="imagetoggler-thumb" src="'+currentHref+'" />');
			$('#' + currentToggler + ' .imagetoggler-thumb-0').addClass('imagetoggler-active-thumb');
			$('#' + currentToggler + ' .imagetoggler-thumb').css('width','auto');
			$('#' + currentToggler + ' .imagetoggler-thumb').css('height','50px');
		});
		$('tr.va-infobox-row-mainimage').each(function(i) {
			$('.imagetoggler-thumb').each(function(i) {
				$(this).addClass('imagetoggler-thumb-'+i);
			});
		});		
		
		
		$('.imagetoggler-thumb').on('click',function() {
			var currentToggler = $(this).closest("tr").attr("id");
			$('#' + currentToggler + ' .imagetoggler-thumb').removeClass('imagetoggler-active-thumb');
			$(this).addClass('imagetoggler-active-thumb');
			ImageToggler.activeclass = $(this).attr('class').split(' ');
			ImageToggler.activenumber = ImageToggler.activeclass[1].split('-');

			$('#' + currentToggler + ' .imagetoggler-image').css('display','none');
			$('#' + currentToggler + ' .imagetoggler-image-'+ImageToggler.activenumber[2]).css('display','inline');
		});
	}
}
});

/* ######################################################################## */
/* ### COUNTDOWN TIMER                                                  ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Adds a modifiable countdown timer to any page       ### */
/* ### Credit:      User:Sammylau                                       ### */
/* ######################################################################## */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ReferencePopups/code.js"
    ]
});

/* </nowiki> */

/* ############################################################################# */
/* ### EDITHELP                                                              ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Description: Displays documentation about templates within the        ### */
/* ###              classic editor                                           ### */
/* ### Credit:      User:Mazn                                                ### */
/* ### Disclaimer:  See https://fallout.wikia.com/wiki/MediaWiki:EditHelp.js ### */
/* ############################################################################# */
if ( /[?&]action=edit/.test( window.location.search ) ) {
    $.getScript('/load.php?mode=articles&only=scripts&articles=MediaWiki:EditHelp.js');
}

/* ############################################################################ */
/* ### Replaces {{USERNAME}} with the name of the user browsing the page.   ### */
/* ### Requires copying Template:USERNAME.                                  ### */
/* ### Copied from templates.wikia.com                                      ### */
/* ############################################################################ */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Ticker */
var $ticker = $('#ticker'),
    $ticker_div = $('#tickerdiv'),
    $ticker_text = $('#tickertxt'),
    ticker_text_outer_width,
    ticker_interval;

function createTicker() {
	if ($ticker.length && $ticker_div.length && $ticker_text.length) {
		$ticker.css('display', 'block');
		ticker_text_outer_width = $ticker_text.outerWidth();
		$ticker_div.css('left', parseInt($ticker.width()) + 10 + 'px');
		ticker_interval = setInterval("processTicker()", 200);
	}
}

function processTicker() {
	var left_width = (parseInt($ticker_div.position().left) > (-10 - ticker_text_outer_width)) ? parseInt($ticker_div.position().left) - 10 + 'px' : parseInt($ticker.width()) + 10 + 'px';
	$ticker_div.css('left', left_width);
} 

createTicker();

/* ###################################################################################### */
/* ### Staff Images                                                                   ### */
/* ### --------------------------------------------------------------------           ### */
/* ### Description: Loads all of the latest staff images on the staff page.           ### */
/* ### URL: https://fallout.wikia.com/wiki/Fallout_Wiki:Administrators_and_moderators ### */
/* ### Credit:      User:TwoBearsHigh-Fiving                                          ### */
/* ###################################################################################### */
function loadStaffImages() {
    // Container surrounding the user boxes
    var $staffBox = $('#staff-container');
 
    // Return if the container doesn't exist
    if (!$staffBox.length) { return; }
 
    // Grab all the placeholders
    var $placeholders = $('.img-placeholder');
 
    // Build an array of user names
    var users = [];
    $placeholders.each(function() {
        users.push($(this).attr('data-user'));
    });
 
    // Create a query string from user names
    var queryString = users.join(',');
 
    // Call to API to fetch images
    $.ajax({
        url: "https://fallout.fandom.com/api/v1/User/Details",
        data: { "ids": queryString },
        success: function(response) {
            var userItems = response.items;
            for (var i = 0; i < userItems.length; i++) {
                var $placeholder = $(".img-placeholder[data-user='" + userItems[i].name + "']");
                $placeholder.html("<img style='width: 100px; height: 100px;' src='" + userItems[i].avatar + "'/>");
            }
        }, 
        dataType: "json"
    });
}
addOnloadHook(loadStaffImages);

/* ##################################################################################### */
/* ### Notable content                                                               ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description: Create a collapsible template where mw-collapsable is not        ### */
/* ###              suitable to use.                                                 ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Notable_content/draft       ### */
/* ### Credit:      User:Sakaratte                                                   ### */
/* ##################################################################################### */
 
/*Initialise variables */
var helipInitialise = document.getElementsByClassName('np-helip');
 
/* Remove duplicate id's from article */
for (i=0; i < helipInitialise.length; ++i)
    {
        var newHelip = "np-helip" + i;
        var newCollapse = "np-Collapsed" + i;
    document.getElementById("np-helip").setAttribute("onclick", 'npCollapsible("' + newHelip + '", "' + newCollapse + '")');
    document.getElementById("np-helip").innerHTML = "More";
    document.getElementById("np-collapsed").id = newCollapse;
    document.getElementById("np-helip").id = newHelip;
    }
 
/* Switches collapsible content between hidden and visible */
function npCollapsible (helipName, collapseName) {
    var collapseCaption = "Less";
    var expandCaption = "More";
 
    navState = document.getElementById(helipName).innerHTML;
    navClass = document.getElementById(collapseName).classList;
    if (navState == expandCaption) {
        navClass.add("np-visible");
        navClass.remove("np-hidden");
        document.getElementById(helipName).innerHTML = collapseCaption;
    } else {
        navClass.remove("np-visible");
        navClass.add("np-hidden");
        document.getElementById(helipName).innerHTML = expandCaption;
    }
}