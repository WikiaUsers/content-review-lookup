/**
 * experimental style switcher by User:Pecoes
 */

(function ($, window) {

   'use strict';
    
    function modifySassParams (params, noBlackOut) {
        
        var p = [], sass, $blackOut;
        
        params = $.extend(window.sassParams, params);
        for (var i in window.sassParams) {
            if (window.sassParams.hasOwnProperty(i)) {
                p.push(i + '=' + encodeURIComponent(params[i]));
            }
        }
        sass = encodeURIComponent(p.join('&'));
        
        if (!noBlackOut) {
            $blackOut = $('<div/>')
            .css({
                backgroundColor: window.sassParams['color-page'],
                position: 'absolute',
                left: 0, top: 0,
                width: $(window.document).width() + 'px',
                height: $(window.document).height() + 'px',
                zIndex: 1000000000000
            })
            .appendTo(window.document.body)
            .delay(50)
            .fadeOut(100, function () {
                $blackOut.remove();
            });
        }
        
        $('link[rel="stylesheet"]')
        .each(function () {
            var $this = $(this),
                m, href = $this.attr('href');
            if (!/\.scss$/.test(href)) return;
            $this.attr('href',
                href.replace(/\/sass\/[^\/]+/, '/sass/' + sass)
            );
        });
    }
    
    $(function () {
        
        var styles = {
            defaultStyle: function () {
                window.localStorage.setItem('style', 'defaultStyle');
                modifySassParams({
                    'color-buttons': 'black',
                    'color-links':   '#6c93b1',
                    'color-header':  'black',
                    'color-page':    '#474646'
                }, true);
            },
            
            altStyle1: function () {
                window.localStorage.setItem('style', 'altStyle1');
                modifySassParams({
                    'color-buttons': '#481b68',
                    'color-links':   '#fec356',
                    'color-header':  '#d06700',
                    'color-page':    '#3a1e29'
                });
            },
            
            altStyle2: function () {
                window.localStorage.setItem('style', 'altStyle2');
                modifySassParams({
                    'color-buttons': '#003816',
                    'color-links':   '#F8E9AE',
                    'color-header':  '#A1774F',
                    'color-page':    '#2d2c18'
                });
            }
        };
        
        styles[window.localStorage.getItem('style') || 'defaultStyle']();
        
        var $defaultStyle = $('<li><a href="">Default Style</a></li>')
        .insertAfter(
            $('#AccountNavigation')
            .find('.WikiaMenuElement > li')
            .has('[data-id="preferences"]')
        )
        .click(styles.defaultStyle);
        
        var $altStyle1 = $('<li><a href="">Alt Style 1</a></li>')
        .insertAfter($defaultStyle)
        .click(styles.altStyle1);
        
        var $altStyle2 = $('<li><a href="">Alt Style 2</a></li>')
        .insertAfter($altStyle1)
        .click(styles.altStyle2);
        
        $defaultStyle
        .add($altStyle1)
        .add($altStyle2)
        .click(function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    });
    
}(jQuery, window));


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

var ShowHideConfig = { autoCollapse: 1, userLang: false };
importScriptPage( 'ShowHide/code.js', 'dev' );

/* ######################################################################## */
/* ### ARCHIVE TOOL                                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: AJAX-archiving of talk pages via GUI                ### */
/* ### Credit:      User:Dantman (original)                             ### */
/* ###              User:Porter21 (Oasis & Monobook support)            ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ArchiveTool/code.js   ### */
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

/* --- Imports and dependencies --- */
@import '/load.php?articles=MediaWiki:Navboxes.css|only=styles&mode=articles';
@import url('//dev.wikia.com/load.php?mode=articles&articles=MediaWiki:Global_Lua_Modules/NavboxBuilder.css&only=styles');

/* --- Web fonts --- */

@import 'https://fonts.googleapis.com/css?family=Cinzel|Roboto|Monsterrat|Open+Sans|Source+Code+Pro';

@font-face {
    font-family: 'Optima';
    src: url('https://vignette.wikia.nocookie.net/finalfantasy/images/8/81/Optima.woff/revision/latest') format('woff');
    font-weight: normal;
    font-style: normal;
}

/* --- Global variables --- */

:root {
    /* main theme colors */
    /* (primary aesthetic, used across dark/light theme variably) */
    --theme-color: rgba(5,37,78,.5);
    --theme-gradient: rgba(5,37,78,.5) 0,rgba(5,37,78,.5) 75%,rgba(5,37,78,0);
    --theme-text-color: #aff8ff;
    --theme-font: 'Optima';
    --theme-secondary-font: 'Open Sans',Arial,sans-serif;
    
    /* light theme colors */
    --light-template-background: transparent;
    --light-template-background-gradient: var(--theme-gradient);
    --light-template-label-color: rgba(129,168,206,0.3);
    --light-template-label-gradient: rgba(129,168,206,0.3) 0,rgba(129,168,206,0.3) 100%,rgba(129,168,206,0.3);
    --light-template-header-text-color: #0b3460;
    --light-template-label-text-color: #0b5279;
    --light-template-border-color: #81a8ce;
    --light-template-secondary-border-color: #81a8ce;
    --light-infobox-header-gradient: linear-gradient(90deg, rgba(129,168,206,0) 0,rgba(129,168,206,1) 50%,rgba(129,168,206,0));
    --light-navbox-title-bg: rgba(129,168,206,.8);
    --light-table-header: rgba(129,168,206,.6);
    --light-table-odd-row: rgb(0,153,230,.1);
    
    /* dark theme colors */
    --dark-template-background: var(--theme-color);
    --dark-template-background-gradient: var(--theme-gradient);
    --dark-template-label-color: rgba(11,52,96,1);
    --dark-template-label-gradient: rgba(11,52,96,0) 0,rgba(11,52,96,0.7) 75%,rgba(11,52,96,1);
    --dark-template-header-text-color: var(--theme-text-color);
    --dark-template-label-text-color: #12bfff;
    --dark-template-border-color: #2b515e;
    --dark-template-secondary-border-color: #072341;
    --dark-infobox-header-gradient: linear-gradient(90deg, rgba(11,82,121,0) 0,rgba(11,82,121,1) 50%,rgba(11,82,121,0));
    --dark-navbox-title-bg: transparent;
    --dark-table-header: var(--dark-template-label-color);
    --dark-table-odd-row: rgba(5,37,78,.6);
    
    /* theme settings */

    /*  light theme settings 
    --template-background: var(--light-template-background);
    --template-background-gradient: var(--light-template-background-gradient);
    --template-label-color: var(--light-template-label-color);
    --template-label-gradient: var(--light-template-label-gradient);
    --template-header-text-color: var(--light-template-header-text-color);
    --infobox-header-gradient: var(--light-infobox-header-gradient);
    --template-label-text-color: var(--light-template-label-text-color);
    --template-border-color: var(--light-template-border-color);
    --template-secondary-border-color: var(--light-template-secondary-border-color);
    --infobox-header-gradient: var(--light-infobox-header-gradient);
    --navbox-title-bg: var(--light-navbox-title-bg);
    --table-header: var(--light-table-header);
    --table-odd-row: var(--light-table-odd-row);
    */

	/*dark theme*/
    --template-background: var(--dark-template-background);
    --template-background-gradient: var(--dark-template-background-gradient);
    --template-label-color: var(--dark-template-label-color);
    --template-label-gradient: var(--dark-template-label-gradient);
    --template-header-text-color: var(--dark-template-header-text-color);
    --infobox-header-gradient: var(--dark-infobox-header-gradient);
    --template-label-text-color: var(--dark-template-label-text-color);
    --template-border-color: var(--dark-template-border-color);
    --template-secondary-border-color: var(--dark-template-secondary-border-color);
    --infobox-header-gradient: var(--dark-infobox-header-gradient);
    --navbox-title-bg: var(--dark-navbox-title-bg);
    --table-header: var(--dark-table-header);
    --table-odd-row: var(--dark-table-odd-row);


    /*font and link colors */
    /* dark colors (corresponds with light theme) */
    --darktext: black;
    --darklink: #002BB8;
    --darklink-v: #4560BA;
    --darklink-e: #3366BB;
    --darklink-n: #8B0000;
    --darkwhitefilter: brightness(0);/*filter for white images to match text color*/
    
    /*light colors (corresponds with dark theme)*/
    --lighttext: #CCC; /*corresponds with dark theme*/
    --lightlink: #B0E0E6;
    --lightlink-v: #8fb7bc;
    --lightlink-e: #99CCEE;
    --lightlink-n: #CC2200;
    --lightwhitefilter: brightness(0.8125);/*filter for white images to match text color*/
    
    /*image settings*/
    --lightgradient: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.5));
    --darkgradient: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25));

    /* selecting dark/light theme colors*/
     /*light theme
    --themetext: var(--darktext)
    --themelink: var(--darklink);
    --themelink-v: var(--darklink-v);
    --themelink-e: var(--darklink-e);
    --themelink-n: var(--darklink-n);
    --themewhitefilter: var(--darkwhitefilter);
    --negcolor: #8B0000;
    --poscolor: #006500;
    --forumheader-a: #F9F9F9;
    --forumheader-b: #EEEEEE;
    --darkimagebg: transparent;
    --lightimagebg: var(--darkgradient);
    --infoboxtabs: var(--hue-black);
	*/

	/*dark theme coloration*/
    --whiteimagefilter: var();
    --themelink: var(--lightlink);
    --themelink-v: var(--lightlink-v);
    --themelink-e: var(--lightlink-e);
    --themelink-n: var(--lightlink-n);
    --themewhitefilter: var(--lightwhitefilter);
    --negcolor: #FF8B8B;
    --poscolor: #65BB65;
    --forumheader-a: #202020;
    --forumheader-b: #404040;
    --darkimagebg: var(--lightgradient);
    --lightimagebg: transparent;
    --infoboxtabs: var(--hue-white);

    /* added font styling */
    --white-text-shadow: 0 0 2px white,0 0 2px white,0 0 2px white,0 0 2px white,0 0 2px white,0 0 2px white;
    --black-text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    
    /* common colors */
    --hue-white: rgba(255, 255, 255, 0.7);
    --hue-black: rgba(20, 20, 20, 0.7);
    --medium-gray: #d6d6d6;
    --soft-black: #404040;
    --soft-white: #f2f2f2;
    --shaded: rgba(0, 0, 0, 0.1);
    
    /* image filters */
    --fade: opacity: 0.3;
    --grayscale: grayscale(100%);
    --invert: invert(100%);
    --mirror: scaleX(-1);
}

/* Overriding variables for dark themes */
body.skin-oasis {
    background-size: 100%; /* fallback */
    background-size: cover;
}

/* --- Button modifications --- */
.sprite.edit-pencil {
    background: none transparent\9 !important;
}

.sprite.edit-pencil {
    background:url('https://vignette.wikia.nocookie.net/finalfantasy/images/9/9b/FFXV_Cursor_Editbutton.png/revision/latest?cb=20160907180418') no-repeat !important;
}

@media only screen and (min-width: 1596px) {
    .WikiaPage .WikiaArticle {
        font-size: 14px;
        line-height: 22px;
    }   
}

/* --- Header sizes --- */
.WikiaArticle h2 {
    font-size:28px;
    line-height:30px;
}
.WikiaArticle h3 {
    font-size:24px;
    line-height:26px;
}
.WikiaArticle h4 {
    font-size:18px;
    line-height:22px;
}

/* --- Sitewide links --- */

.WikiaMainContent a:visited { 
    color: var(--themelink-v);
}

.WikiaMainContent a.external, .WikiaMainContent a.external:visited, .WikiaMainContent a.extiw, .WikiaMainContent a.extiw:visited { 
    color: var(--themelink-e);
}

.WikiaMainContent a.new, .WikiaMainContent a.new:visited, a.newcategory, a.newcategory:visited { 
    color: var(--themelink-n);
}

.media-gallery-wrapper .media-gallery-caption a,
.media-gallery-wrapper .media-gallery-caption a:visited { 
    color: #b3b3b3;
}

/* --- Common styling --- */

.portable-infobox,
.ooui-theme-fandom table.article-table,
.navbox {
    font-family: var(--theme-secondary-font);
    background-color: var(--template-background);
    border: 1px solid var(--template-border-color);
    border-radius: 2px;
    padding: 0.4em;
}

.mbox,
.portal {
    border-top: 3px solid #1e9de3;
    color: white;
    background: linear-gradient(180deg,var(--theme-gradient));
}

.portable-infobox .pi-title,
.navbox .navbox-title,
.portal__header {
    font-family: var(--theme-font);
    position: relative;
    display: inline-block;
    overflow: visible;
}

.portable-infobox .pi-title,
.navbox .navbox-title {
    color: var(--template-header-text-color);
    border-bottom: .05em solid var(--template-header-text-color);
    align-items: center;
    justify-content: center;
    text-align: center;
}

.portable-infobox .pi-title::before,
.portable-infobox .pi-title::after,
.portal__header::before,
.portal__header::after {
    content: "";
    display: block;
    width: .2em;
    height: .2em;
    background: #12bfff;
    transform: rotate(45deg);
    position: absolute; 
    bottom: -.125em;
}

.portable-infobox .pi-title::before,
.portal__header::before {
    left: 0;
}

.portable-infobox .pi-title::after,
.portal__header::after {
    right: 0;
}

.portable-infobox .pi-data-label,
.navbox .navbox-group,
.ooui-theme-fandom table.article-table tr th {
    font-weight: bold;
    color: var(--template-label-text-color);
}

.portable-infobox .pi-data-label,
.navbox .navbox-group {
    text-align: right;
    background: linear-gradient(90deg, var(--template-label-gradient));
}

/* --- Tables and layouts --- */

.ooui-theme-fandom table.article-table {
    font-size: 12px;
    border-collapse: collapse;
}

.ooui-theme-fandom table.article-table tr:nth-child(odd) {
    background-color: var(--table-odd-row);
}

.ooui-theme-fandom table.article-table tr th {
    text-align: center;
    background-color: var(--table-header);
}

.ooui-theme-fandom table.article-table tr td, table.article-table tr th {
    padding: .4em;
    border: none;
}

.ooui-theme-fandom table.article-table ul, table.article-table ol { 
    margin: 0 0 0 1.5em;
}

.ooui-theme-fandom table.article-table.align-right {
    width: 50%;
    float: right;
    margin: 0 0 1rem 1rem;
}

/* Scrollable tables */
table.scrollable-active thead { 
    display: block; 
    overflow: auto;
}
table.scrollable-active tbody { 
    display: block; 
    max-height: 400px; 
    overflow: auto; 
}

/*Translations*/
.translations { 
    text-align: center;
    font-size: smaller;
}

/*Flowchart*/
.flowchart a { 
    font-family: sans-serif; 
}
.flowchart pre {
    border: none; 
    background: transparent; 
}

/*Boards*/
table.board { 
    border: 1px solid black;
    text-align: center;
    vertical-align: middle; 
}
table.board td, table.board th { 
    padding: 0px; 
}
table.board td { 
    background-color: #DDDDDD; 
}
table.board tr:first-child th:first-child { 
    background: transparent; 
}

/*collaspbile rows*/
tr.collapsibletr {
    float: none;
    cursor: pointer;
    display: table-row;
}

tr.collapsibletr.uncollapsed {
    display: hidden;
}
.collapsibletr::after {
    display: inline-block;
    content: '';
    top: 50%;
    right: .6em;
    margin-top: -2px;
    border-color: #000;
    border-color: currentColor;
    border-style: solid;
    border-width: 2px 2px 0 0;
    height: 4px;
    width: 4px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

.collapsibletr.collapsed::after {
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    transform: rotate(135deg);
    margin-top: -4px;
}

/*Handle table and div widths*/
.full-width { 
    width: 100%;
    min-width: 660px;
    max-width: 990px;
}

.half-width { 
    width: 50%;
    min-width: 330px;
    max-width: 445px;
}

/* Handle multiple columns */
.multicolumn { 
     display: flex;
     justify-content: space-around;
     flex-wrap: wrap; width: 100%; align-items: flex-start;
}
 
.multicolumn > * { 
    max-width: 445px;
    min-width: 130px;
    display: inline-block;
    vertical-align: top;
    margin-right: auto;
    flex-basis: auto;
}

/*Content box for projectspace*/
.contentbox { 
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid var(--medium-gray);
    font-size: 14px;
    margin-bottom: 5px;
}

.contentbox .header {
    color: black;
    background-color: var(--theme-color);
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    padding: 7px 0 5px;
}

.contentbox p {
    padding: 5px;
}

/* --- Main page --- */

/*Styling all portal templates*/
.portal {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-size: cover;
    font-weight: 300;
    position: relative;
    margin-bottom: 15px;
}

.portal__header {
    color: var(--theme-text-color);
    border-bottom: .05em solid var(--theme-text-color);
    margin-bottom: 20px;
    padding: 0.3em .2em;
}
 
.portal:before,
.portal:after {
    content: '';
    height: 85px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 0;
}
 
.portal.welcome {
    background-size: 100%;
    background-position: center;
    font-weight: normal;
    padding: 0px;
}
 
.portal.welcome a {
    color: rgba(255, 255, 255, 0.8);
}

.portal.welcome .portal__content {
    padding: 60px 0 40px 0;
    max-width: 650px;
    text-align: center;
    margin: auto;
}

.portal__welcome__text {
    margin-top: 1.7em;
    margin-bottom: -1em;
}

.portal__overlay {
    background: linear-gradient(180deg, var(--theme-gradient));
    /*background-color: rgba(0, 0, 0, 0.5);*/
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(2px)
}
 
.portal a, .portal a.visited {
    color: #fff !important;
    font-weight: bold;
}
 
.portal.navigation a {
    font-weight: 300;
}

.portal__content {
    text-shadow: 1px 1px black;
}

.portal__content .preloader {
    background-repeat: no-repeat;
    background-position: 1px 1px;
}
 
.portal__wrapper {
    position: relative;
    z-index: 1;
}
 
.portal__wrapper span {
    display: block;
    text-align: center;
}
 
.portal__header {
    font-size: 25px;
}

.portal__header a {
    color: #12bfff;
}
 
.portal__content__aux {
    display: inline-block;
    position: relative;
    width: 150px;
    height: auto;
    margin: 5px 0;
}
 
.portal__content__aux:hover img {
    filter: drop-shadow(1px 1px 5px #fff);
}
 
.portal__content__aux a {
    cursor: pointer;
}
 
/*Portal template styling and backgrounds*/
.portal.welcome.bg--1 {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/0/0b/Final_Fantasy_VII_Remake_key_art_Midgar_Highway.png/revision/latest/scale-to-width-down/400');
}
.portal.welcome.bg--2 {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/e/e8/Cloud_on_Hardy-Daytona_promo_art_for_Final_Fantasy_VII_Remake.jpg/revision/latest/scale-to-width-down/400');
}
.portal.welcome.bg--3 {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/3/33/Cloud-Strife-FFVII-Remake.png/revision/latest/scale-to-width-down/400');
}

.portal.navigation #hub .portal__overlay {
    background: transparent;
}

.portal__categories {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}

.portal__categories .category {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
    width: 100px;
    height: 100px;
    margin: 15px auto;
    position: relative;
}

.portal__categories .category .icon {
    width: 100px;
    height: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 90%;
    transition: all .15s ease-in;
    margin: auto;
    position: relative;
    filter: grayscale(100%);
}
 
.portal__categories .category .icon:hover {
    filter: drop-shadow(1px 1px 5px #fff);    
}

.portal__categories .category .link-text {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    border-top-right-radius: 5px;
    padding: 0 5px 0 5px;
    font-family: Roboto,arial;
    font-size: 1em;
    font-weight:800;
}

.portal__categories .category .link-text a, .portal__categories .category .link-text a:visited {
    color: white;
}

.portal__categories .category .icon.Games {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/e/e0/Portal_Games.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Characters {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/7/7e/Portal_Characters.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Enemies {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/b/b7/Portal_Creatures.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Locations {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/c/c1/Portal_Locations.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Items {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/0/0d/Portal_Items.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Equipment {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/1/1d/Portal_Equipment.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Abilities {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/8/88/Portal_Abilities.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Jobs {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/7/7b/Portal_Jobs.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Organizations {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/3/34/Portal_Organizations.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Events {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/9/92/Portal_Events.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Personnel {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/b/b0/Portal_Personnel.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Music {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/b/b6/Portal_Music.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Recurring {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/3/31/Portal_Recurring_Elements.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.Walkthroughs {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/8/86/Portal_Walkthroughs.png/revision/latest/scale-to-width-down/100');
}
 
.portal__categories .category .icon.More {
    background-image: url('//vignette.wikia.nocookie.net/finalfantasy/images/8/8f/Portal_More.png/revision/latest/scale-to-width-down/100');
}

/* --- Design templates --- */

/* Template:J */
.jTemplate { 
    font-weight: normal;
    font-style: normal;
}
.jTemplate .romaji { 
    font-style: italic;
}
.jTemplate .lit:before { 
    content: '“';
}
.jTemplate .lit:after {
    content: '”';
}
.jTemplate .help { 
    font-size: 9px;
    font-weight: bold;
    line-height: 0;
    vertical-align: super;
}

/* Template:PRK */
.PRK { 
    font-style: italic;
}
.PRK .stressed { 
    font-variant: small-caps;
    font-weight: bold;
}

/* Small navigation in templates */
.snav {
    float: right;
    text-align:right;
    font-size:70%;
    padding-left: 6px;
}

/* Checkmark templates */
.checkmark, .xmark {
    background-position: center center;
    background-repeat: no-repeat;
    display: inline-block;
    height: 17px;
    vertical-align: middle;
    width: 15px;
}
.checkmark {
    background-image: url('https://vignette.wikia.nocookie.net/finalfantasy/images/6/69/Yes_check.png/revision/latest/scale-to-width-down/15?format=png');          
    filter: brightness(150%); /*dark theme*/
}
.xmark {
    background-image: url('https://vignette.wikia.nocookie.net/finalfantasy/images/6/60/X_mark.png/revision/latest/scale-to-width-down/15?format=png');
}

/* Spoiler notices */
.spoilernotice {
    border-top: solid 2px var(--medium-gray);
    border-bottom: solid 2px var(--medium-gray);
    overflow: auto;
    padding: 0.2em;
}

/*Small notice templates*/
.page-notice {
   font-size: smaller;
   font-style: italic;
   margin: 1em 0 1em 24px;
}

/*Archive*/
.archive { 
    border: 2px dotted var(--negcolor);
    margin: -4px;
    margin-top: 0;
    padding: 4px;
    padding-top: 0;
    width: 100%;
}
.archive .header, .archive.header { 
    border-bottom: 2px dotted var(--negcolor);
    color: var(--negcolor);
    font-style: italic;
    font-weight: bold;
    margin: 0 -5px;
    padding-bottom: 0;
    text-align: center;
}

/* --- Documentation template --- */
 
.documentation {
    overflow: hidden;
}
 
.documentation__header,
.documentation__footer {
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 40px;
    background-color: var(--medium-gray);
    color: var(--soft-black);
}
 
.documentation__header {
    border-bottom: 1px solid var(--medium-gray);
}
 
.documentation__footer {
    border-top: 1px solid var(--medium-gray);
    font-size: 85%;
    text-align: right;
    clear: both;
}
 
.documentation__header__headline {
    font-weight: bold;
}
 
.documentation__header__action-links {
    float: right;
    font-size: 85%;
}
 
.documentation__content {
    padding: 10px 20px;
    box-sizing: border-box;
}
 
.documentation__content #toc {
    margin-top: 0 !important;
    margin-bottom: 6px !important;
}
 
/* Documentation parameters (Template:Docparam) */
 
.docparam {
    overflow: hidden;
    margin-bottom: 10px;
}
 
.docparam__header {
    border-bottom: 1px solid var(--medium-gray);
    background-color: var(--medium-gray);
    padding: 0 5px;
    box-sizing: border-box;
    color: var(--soft-black);
}
 
.docparam__header__icon {
    display: inline-block;
}
 
.docparam__header__name {
    display: inline-block;
    position: relative;
    top: 2px;
}
 
.docparam__header__default {
    float: right;
    line-height: 34px;
    font-size: 12px;
    color: var(--soft-black);
}
 
.docparam__description {
    padding: 10px;
    box-sizing: border-box;
}

/* --- Infoboxes --- */
.portable-infobox {
    overflow: hidden;
}

.portable-infobox .pi-secondary-background {
    background: none;
}

.portable-infobox .pi-item,
.portable-infobox .pi-item-spacing {
    padding: 0;
}

.portable-infobox .pi-navigation {
    text-align: center;
    font-size: 10pt;
    padding: 0.3em 0;
    border-radius: 2px;
}
 
.portable-infobox .pi-title {
    font-size: 15pt;
    line-height: 20px;
    padding: 0.2em 0.4em 0.2em 0.8em;
}

.portable-infobox .pi-image {
    margin-top: 0.4em;
}
 
.portable-infobox .pi-caption {
    padding: 3px 0;
    text-align: center;
}
 
.pi-collapse .pi-header:nth-child(n+2) {
    font-size: 9pt;
}
 
.portable-infobox .pi-header {
    color: var(--template-header-text-color);
    text-align: center;
    font-family: var(--theme-font);
    font-size: 12pt;
    margin: 0.1em;
    padding: 0.4em 0;
    background: var(--infobox-header-gradient);
}

.portable-infobox .pi-data-label,
.portable-infobox .pi-data-value {
    padding: .5em;
    word-break: normal;
    overflow-wrap: normal;
    hyphens: none;
}
 
.portable-infobox .pi-border-color,
.pi-smart-data-value:not(:first-child),
.pi-smart-data-label:not(:first-child) {
    border-bottom-style: none;
    border-bottom-width: 0;
    border-bottom-color: transparent;
    border-color: transparent;
}

.portable-infobox .pi-horizontal-group {
    border-collapse: collapse;
}

.portable-infobox .pi-horizontal-group .pi-data-label,
.portable-infobox .pi-smart-data-label {
    border-right: none;
    text-align: center;
    background: linear-gradient(180deg, var(--template-label-gradient));
}
 
.portable-infobox .pi-horizontal-group .pi-data-value,
.portable-infobox .pi-smart-data-value {
    text-align: center;
}
 
.portable-infobox.type-align-left .pi-horizontal-group .pi-data-value,
.portable-infobox.type-align-left .pi-smart-data-value {
    text-align: left;
}
 
.portable-infobox .pi-section-navigation {
    display: flex;
    padding: 0.3em 0;
    justify-content: space-evenly;
    flex-flow: row wrap;
}

.portable-infobox .pi-section-tab {
    cursor: pointer;
    margin: 0 !important;
}

.portable-infobox .pi-section-tab.pi-section-active {
    box-shadow: 0 !important;
}

.portable-infobox .pi-section-label {
    font-weight: normal;
    height: 1.5em;
    text-transform: unset !important;
    color: var(--infoboxtabs);
}

.portable-infobox .pi-section-active .pi-section-label {
    font-weight: bold;
    color: var(--themelink);
}

.pi-theme-smallhorizontalcells .pi-horizontal-group-item.pi-data-value.pi-font.pi-border-color.pi-item-spacing:first-child {
    text-align: left;
}

.pi-theme-smallhorizontalcells .pi-item.pi-group .pi-horizontal-group tr > td:first-child {
    width: 120px;
}

.pi-theme-smallhorizontalcells .pi-item.pi-group.pi-border-color .pi-horizontal-group thead > tr:first-child > th:first-child {
    width: 108px;
}

.pi-image-collection-tab-content {
    background: transparent;
}

ul.pi-image-collection-tabs {
    display: flex;
    flex-wrap: wrap;
    line-height: 2;
    width: calc(100% + 3px);
    margin-left: -1px;
}

ul.pi-image-collection-tabs li {
    flex-grow: 1;
    border: 1px solid #AAA;
    border-top: none;
    min-width: calc((100% / 4) + 1px);
}

.max-2 ul.pi-image-collection-tabs li {
    min-width: calc((100% / 2) + 1px);
}

.max-3 ul.pi-image-collection-tabs li {
    min-width: calc((100% / 3) + 1px);
}

.max-4 ul.pi-image-collection-tabs li {
    min-width: calc((100% / 4) + 1px);
}

.max-5 ul.pi-image-collection-tabs li {
    min-width: calc((100% / 5) + 1px);
}

.max-6 ul.pi-image-collection-tabs li {
    min-width: calc((100% / 6) + 1px);
}

.max-all ul.pi-image-collection-tabs li {
    flex-grow: 1;
}

/* Portable Infobox multi types */
.portable-infobox.type-multi {
    width: 100%;
    float: none;
    clear: none;
    margin: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    align-content: space-around;
}

.type-multi .pi-panel {
    /*max-width: 350px;
    min-width: 250px;*/
    width: 300px;
    padding: 5px;
    border: 1px solid var(--template-border-color);
}

/* --- Navboxes --- */

.navbox {
    font-size: .83em;
    line-height: 23px;
    overflow: hidden;
}
 
.navbox .navbox-title {
    background-color: var(--navbox-title-bg);
    display: flex;
    padding: 0.1em;
}
 
.navbox .navbox-title-text {
    line-height: 26px;
    font-family: var(--theme-font);
    font-weight: 700;
}
 
.navbox-title-text a {
    color: inherit !important;
}

.navbox-template-links a {
    color: black !important;
}
 
.navbox:not(.left):not(.right) .navbox-title-text {
    font-size: 16pt;
}
 
.navbox .navbox-template-links {
    top: 4px;
}
 
.navbox-table-layout .navbox-group { 
    width: 15%;
    border: 1px solid var(--template-secondary-border-color);
}
 
.navbox .navbox-subgroup {
    width: 15%;
    white-space: normal;
    vertical-align: middle;
    text-align: center;
    font-weight: bold;
    background-color: var(--template-label-color);
    color: var(--template-label-text-color);
}
 
.navbox-table {
    border-collapse: collapse;
}
 
.navbox-table .navbox-padding {
    padding: 10px;
}
 
.navbox-table .navbox-list {
    vertical-align: middle;
}
 
.navbox.left {
    clear: left;
    float: left;
    margin: 0 1.5em 0.5em 0;
}
 
.navbox.right {
    clear: right;
    float: right;
    margin: 0 0 0.5em 1.5em;
}
 
.navbox-image {
    border: 1px solid transparent;
}
 
.navbox-content {
    padding: 0 2px 3px 2px !important;
}
 
.navbox-above,
.navbox-base {
    padding: 4px !important;
}
 
.navbox-above {
    position: relative; /* double-border bug-fix */
}
 
.navbox > .navbox-table-wrapper:first-child, .navbox-section > .navbox-table-wrapper:first-child {
    margin-top: -6px;
}
 
.navbox-content ul {
    list-style: none !important;
    margin: 0;
    padding: 0;
}
 
.navbox-list.\32-columns ul,
.navbox-list.\33-columns ul,
.navbox-list.\34-columns ul,
.navbox-list.\35-columns ul {
    column-rule: 4px double #aaa;
    list-style-type: none;
    margin: 0;
}
 
.navbox-list.\32-columns ul {
    column-count: 2;
}
 
.navbox-list.\33-columns ul {
    column-count: 3;
}
 
.navbox-list.\34-columns ul {
    column-count: 4;
}
 
.navbox-list.\35-columns ul {
    column-count: 5;
}
 
.navbox-list.\32-columns ul li,
.navbox-list.\33-columns ul li,
.navbox-list.\34-columns ul li,
.navbox-list.\35-columns ul li {
    margin: 0;
}

/* --- Message boxes --- */

/* Design */
.mbox {
    display: flex;
    position: relative;
}
 
.mbox__content {
    display: table;
    box-sizing: border-box;
    width: 100%;
    padding: 8px 15px;
}
 
.mbox__content__image {
    display: table-cell;
    width: 40px;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    padding-right: 15px;
}
 
.mbox__content__wrapper {
    display: table-cell;
    vertical-align: middle;
}
 
.mbox__content__header {
    display: block;
    font-weight: bold;
    font-size: 120%;
}
 
.mbox__content__header a, .mbox__content__header a:visited {
    color: white;
}
 
.mbox__content__text {
    display: block;
}
 
.mbox__content__text a, .mbox__content__text a:visited {
    color: yellow;
}

.lbox .mbox__content__text a, .lbox .mbox__content__text a:visited {
    color: #002BB8;
}
 
.mbox__content__text__comment {
    font-size: small;
}
 
.mbox__content__aside {
    display: table-cell;
    width: 100px;
    vertical-align: middle;
    text-align: center;
    padding-left: 15px;
    border-left: 1px solid #d6d6d6;
}
 
.mbox__close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 2px 7px;
    font-weight: bold;
    font-size: 16px;
    color: #bbb;
    cursor: pointer;
    transition: all .15s ease-in;
}
 
.mbox__close:hover {
    color: #777;
}
 
.mbox__close:after {
    content: '×';
}
 
.mw-collapsed + .mbox__close {
    transform: rotate(45deg);
    padding: 4px 7px 5px 2px;
}
	

.mbox.delete {
    border: 4px ridge #999999;
    font-size: 13px;
    text-align: center;
    background: black;
}

.mbox.lbox {
    background: azure;
    border: 4px ridge blue;
    border-radius: 10px;
    color: black;
    margin: auto;
    width: 80%;
}

@media print { .mbox { display: none; } }
/* no mbox when printing */

/* --- Context-link --- */

.context-link {
   padding-left: 2em;
   font-style: italic;
   margin-bottom: 5px;
}

/* --- Quotes --- */
.quote:before, q:before { 
    content: '“';
}
 
.quote:after, q:after {
    content: '”';
}

:root {
    --pull-quote-max-width: 80%;
    --pull-quote-text-color: rgba(255, 255, 255, .8);
    --pull-quote-mark-color: rgba(255, 255, 255, .15);
    --pull-quote-mark-font: "Times New Roman", serif;
    --pull-quote-hyphens: auto;
    --pull-quote-frame-color: #bbb;
}
 
.WikiaPage .pull-quote {
    display: flex;
    flex-wrap: wrap;
    max-width: var(--pull-quote-max-width);
    margin: 1em auto;
    font-size: 1em;
    line-height: 1.8;
}
 
.WikiaPage .pull-quote__text {
    flex-basis: 100%;
    position: relative;
    padding: 0 2em;
    hyphens: var(--pull-quote-hyphens);
    color: var(--pull-quote-text-color);
}
 
.WikiaPage .pull-quote__text::before, .WikiaPage .pull-quote__text::after {
    position: absolute;
    font-size: 3em;
    font-family: var(--pull-quote-mark-font);
    font-weight: 700;
    color: var(--pull-quote-mark-color);
}
 
.WikiaPage .pull-quote__text::before {
    content: "“";
    top: 0;
    left: 0;
    line-height: 1;
}
 
.WikiaPage .pull-quote__text::after {
    content: "”";
    bottom: 0;
    right: 0;
    line-height: 0.2;
}
 
.WikiaPage .pull-quote__source {
    margin-left: auto;
}
 
.WikiaPage .pull-quote__source::before {
    content: "—"; 
}
 
.WikiaPage .pull-quote--right, .WikiaPage .pull-quote--left {
    border: 1px solid var(--pull-quote-frame-color);
    border-left: 0;
    border-right: 0;
    padding: 1em 0;
    text-align: justify;
}
 
.WikiaPage .pull-quote--right {
    float: right;
    margin: 1em 0 1em 2em;
}
 
.WikiaPage .pull-quote--left {
    float: left;
    margin: 1em 2em 1em 0;
}

/* --- Audio player --- */

.audio-player {
    display: block;
    width:300px;
    border: 1px solid var(--medium-gray);
    border-radius:7px;
    font-size:90%;
    margin: 5px;
    text-align:center;
    float: right;
}

.audio-player .title {
    border:1px black solid;
    border-radius:3.5px;
    font-weight: bold;
}

.audio-player .contents {
    display:flex;
    clear:both;
}

.audio-player .type-image {
    width:40px;
    margin-top: 10px;
    margin-bottom: 10px;
    float:left;
}

.audio-player .audio-file {
    width:calc(100% - 40px);
    float:right;
}

.audio-player .dialog {
    font-style: italic;
    border: 1px solid var(--medium-gray);
    border-radius:7px;
}

/* --- Side icon rail (Template:Sideicon) --- */
 
section#sideiconrail {
    text-align: center;
}
 
#sideiconrail h2 {
    text-align: left;
}

/* --- Section needed templates --- */

.section-needed { 
    font-style: italic;
    clear: left;
    overflow: hidden;
    margin: 2em 0;
    white-space: nowrap;
}

.section-needed .image { 
    display: inline-block;
    width: 40px;
    vertical-align: middle;
}

.section-needed .text { 
    display: inline-block;
    position: relative;
    vertical-align: middle;
    white-space: normal;
}

/* --- Tooltips --- */

.main-tooltip {
    border: 1px solid var(--medium-gray);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    margin-bottom: 5px;
    padding: 2px 5px;
    background: transparent;
}

#tooltip-wrapper {
    padding: 3px 7px 2px 3px;
    z-index: 6000000;
}

.has-redlinks, .tooltip-loading, .advanced-tooltip .tooltip-contents {
    display: none;
}

.tooltips-init-complete, abbr {
    background: black; /*dark theme*/
    border-bottom: 1px dotted var(--themetext);
    cursor: help;
}


/* --- Disambig --- */

.disambig { 
    width:100%;
    clear: both;
    position: relative; margin: 0 auto;
    border-top: 1px solid var(--medium-gray);
    border-bottom: 1px solid var(--medium-gray);
    min-height: 44px;
    font-style: italic;
}

.disambig .leftimage { 
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -20px;
}

.disambig .rightimage { 
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -20px;
}

.disambig .content { 
    text-align:center;
    padding: 0 40px;
    max-width: 44em;
    margin: auto;
}

/* --- References --- */

.refpopups-box { 
    background: linear-gradient(white, #FAFAFA);
    background-color: white;
    border: 1px solid var(--medium-gray);
    border-radius: 2px;
    color: black;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-style: normal;
    font-weight: normal;
    line-height: 150%;
    padding: 6px 12px;
    position: absolute;
    text-align: left;
    text-decoration: none;
    z-index: 1;
}

.reflist.columns {
    float: none !important;
}

ol.references li:target, sup.reference:target {    background: none; }

/* --- AI formatting --- */

pre.ai { 
    background: transparent;
    border: none;
    white-space: pre-wrap;
}

div.ai span.ability { 
    color: red;
}

.ai p { 
    padding-left: 20px;
    margin: 2px 0 !important;
    text-indent: -20px;
}

/* --- License board template --- */

.licenseboard {
    --augment: #666600;
    --quickening: #FF9933;
    --summon: #00FFFF;
    --accessory: #CC3333;
    --armor: #33CC33;
    --weapon1: #6666CC;
    --weapon2: #993399;
    --weapon3: #6600CC;
    --technick: #CC9900;
    --gambit: #CCCC00;
    --magick: #CC99CC;
    --essentials: #333333;
    --secondboard: #666666;
}

.licenseboard .license { 
    background-image: linear-gradient(350deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    border: 1px outset #999999;
}

.licenseboard .license:hover { 
    border-style: inset;
}

/* --- FFT location battlemap --- */

.BI {
    border: 1px solid;
    margin: auto;
    --allied: 3px solid #f4a460;
    --enemy: 3px solid #b01200;
    --stone: #A9A9A9;
    --water: #ADD8E6;
    --marsh: #b2c95c;
    --wood: #CD853F;
    --grass: #7CFC00;
    --soil: #843910;
    --roof: #654321;
    --bridge: #D3D3D3;
    --outcrop: #556B2F;
}

.BI tr { 
    height: 70px;
    text-align: center;
}

.BI .firstrow { 
    height: 20px;
}

.BI .firstrow td { 
    width:20px;
}

.BI td { 
    width: 50px;
    background: transparent;
}

/* --- FFXIV quests --- */

.quest {
    clear: right;
}
 
/* --- Hide unneeded defaults --- */

/*hide subpages from non-subpages*/
body.page-Choco_Mog article header h2, body.page-Choco_Mog .subpages,
body.page-Marcus_Eiko_Stat_Bug article header h2, body.page-Marcus_Eiko_Stat_Bug .subpages, 
body.page-Real_Emotion_1000_no_Kotoba article header h2, body.page-Real_Emotion_1000_no_Kotoba .subpages, 
body.page-Final_Fantasy_X_X-2_HD_Remaster article header h2, body.page-Final_Fantasy_X_X-2_HD_Remaster .subpages { 
    display: none;
}

/*Branch connectors*/
.branch-icon {
    -webkit-filter: invert(100%);
    filter: invert(100%);
}

/*  Walkthrough content - does not work on dark themes */
/*body.ns-112 table { 
    color: black !important;
}*/

/* --- Forums --- */

/* Fixes sidebar oddity -- prevent sidebar elements from becoming unclickable on short pages */
footer.row { 
    clear: both;
}

/* Forum formatting -Algorithm & -Splaka */
.forumheader { 
    border: 1px solid #aaa;
    margin-top: 1em;
    padding: 12px;
}

.forumheader, .forum_colheader, .forum_tablefooterrow {
    background-color: var(--forumheader-b);
}

.forum_tableheader {
    background-color: var(--forumheader-a);
}


.forumlist td.forum_edited a { 
    color: inherit;
    text-decoration: none;
}

.forumlist td.forum_title a.forum_new { 
    font-weight: bold;
}

.forumlist td.forum_title a.forum_new:visited { 
    background: none;
    font-weight: normal;
}
th.forum_title, td.forum_title a { 
    padding-left: 20px;
}

.forum_colheader { 
    text-align: left;
}
.forum_prevpage { 
    text-align: left;
}
.forum_nextpage { 
    text-align: right;
}

/* --- Talk template --- */

/*Forces show of readable "pre"s (black text, no stretch)*/
/*used for talkboxes and on archives*/
table.talk td.text pre, .archive pre { 
    white-space: pre-wrap;
    color: black;
}

/* Other talk bubble CSS */
table.talk { 
    margin-left: 64px !important;
}

table.talk .text pre { 
    white-space: pre-wrap;
    color: black;
}

table.talk .filler { 
    width: 6px;
    height: 6px;
}

table.talk .filler2 { 
    width: 5px;
    height: 4px;
}

table.talk .corner { 
    font-size: 0px;
    line-height: 0%;
    width: 0px;
}

table.talk .padded { 
    padding: 0 4px;
    margin: 0 -5px;
}

div.image-section { 
    width: 64px;
    max-width: 69px;
    float: left;
}

/* --- Additional formatting --- */

/*KHwiki link*/
.khwiki a.external:after, a[href~='://kingdomhearts.fandom.com']:after { 
    background-image: url('//vignette.wikia.nocookie.net/kingdomhearts/images/6/64/Favicon.ico/revision/latest');
    background-position: 0 0;
    margin-left: 1px;
    vertical-align: middle;
    width: 16px;
}

/* toclimit template */
.toclimit-2 .toclevel-2, .toclimit-3 .toclevel-3, .toclimit-4 .toclevel-4, .toclimit-5 .toclevel-5, .toclimit-6 .toclevel-6, .toclimit-7 .toclevel-7 { 
    display: none;
}

/*flip image*/
.horizontal.flip img, .horizontal-flip img {
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: 'FlipH';
}
.vertical.flip img, .vertical-flip img {
    transform: scaleY(-1);
    filter: FlipV;
    -ms-filter: 'FlipV';
}
.vertical.horizontal.flip img, .vertical-flip.horizontal-flip img {
    transform: rotate(180deg);
}

/* --- Classes to invoke variable colors --- */

.theme-color { background-color: var(--theme-color); }

.darktext {
    color: var(--darktext);
    --themewhitefilter: var(--darkwhitefilter);
}
.darktext a, .darklinks a { color: var(--darklink); }
.darktext a:visited, .darklinks a:visited { color: var(--darklink-v); }
.darktext a.external, .darklinks a.external { color: var(--darklink-e); }
.darktext a.new, .darktext a.newcategory, .darklinks a.new, .darklinks a.newcategory { color: var(--darklink-e); }

.lighttext { 
    color: var(--lighttext);
    --themewhitefilter: var(--lightwhitefilter);

}
.lighttext a, .lightlinks a { color: var(--lightlink); }
.lighttext a:visited, .lightlinks a:visited { color: var(--lightlink-v); }
.lighttext a.external, .lightlinks a.external { color: var(--lightlink-e); }
.lighttext a.new, .lighttext a.newcategory, .lightlinks a.new, .lightlinks a.newcategory { color: var(--lightlink-e); }

.hue-white { background-color: var(--hue-white); }
.hue-black { background-color: var(--hue-black); }
.medium-gray { background-color: var(--medium-gray); }
.soft-black { background-color: var(--soft-black); }
.soft-white { background-color: var(--soft-white); }

.white-text-shadow { text-shadow: var(--white-text-shadow); }
.black-text-shadow { text-shadow: var(--black-text-shadow); }

.fade img { opacity: var(--fade); }
.grayscale img { filter: var(--grayscale); }
.invert img { filter: var(--invert) }
.mirror img { transform: var(--mirror); }

.darkimage img, img.darkimage {
    background: var(--darkimagebg);
}

.lightimage img, img.lightimage {
    background: var(--lightimagebg);
}

.darkimagebackground img, img.darkimagebackground {
    background: var(--darkgradient);
}

.lightimagebackground img, img.lightimagebackground {
    background: var(--lightgradient);
}

.clicktoshow img, img.clicktoshow {
    width: 1.15em;
    height: 1em;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2018%2013%22%20enable-background%3D%22new%200%200%2018%2013%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22%202%2C24%2012%2C24%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M9%2011c2.2%200%204-1.8%204-4c0-2.2-1.6-4-3.8-4C7%203%205%204.8%205%207C5%209.2%206.8%2011%209%2011z%20M14%201.8%20c0.5%200%202.2%200%203%200c0.8%200%201%200.6%201%201.2c0%202%200%207%200%208.8c0%200.6-0.7%201.2-1.2%201.2c-4.2%200-11.4%200-15.6%200c-0.3%200-1.2-0.3-1.2-1.2%20c0-1.7%200-7.1%200-8.8c0-0.7%200.2-1.2%201-1.2c0.8%200%202.5%200%203%200l2-1.6h6L14%201.8z%22%2F%3E%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%229%22%20cy%3D%227%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    background-origin: border-box;
    box-sizing: border-box;
    filter: var(--themewhitefilter);
    border-style: solid;
    border-color: transparent;
    border-width: .5em .575em;
    margin: 0 .2em;
}

.clicktoshow img:hover {
    filter: invert(.4);
}

/* When image set to align center, cannot exceed 100% width */
.WikiaArticle .center img {
    max-width: 100%;
    height: auto;
}

.theme-font { font-family: var(--theme-font); }