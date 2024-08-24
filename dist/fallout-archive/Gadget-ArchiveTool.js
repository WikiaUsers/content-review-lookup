/* <nowiki> */

/**
 * Script for AJAX-archiving of talk pages via GUI
 * Script by User:Dantman (http://dev.wikia.com);
 * Monobook & Vector support by User:Porter21 (http://www.falloutwiki.com)
 * Source: http://dev.wikia.com/wiki/ArchiveTool
 */

/*
 * Copyright © 2009, Daniel Friesen
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the script nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function archiveTool() {
   // Configuration
   var userconfig = (window.ArchiveToolConfig) ? window.ArchiveToolConfig : {};
   var config = $.extend(true, {
      archiveListTemplate: 'Archives',
      archivePageTemplate: 'Archivepage',
      archiveSubpage: 'Archive',
      userLang: false,
      // English
      'en': {
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

   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if (config.userLang && mw.config.get('wgUserLanguage') in config
         && name in config[mw.config.get('wgUserLanguage')]) {
         return config[mw.config.get('wgUserLanguage')][name];
      }
      if (mw.config.get('wgContentLanguage') in config 
         && name in config[mw.config.get('wgContentLanguage')]) {
         return config[mw.config.get('wgContentLanguage')][name];
      }
      return config.en[name];
   }

   if (mw.config.get('skin') != 'monobook' && mw.config.get('skin') != 'vector') {
      return;
   }

   if ((mw.config.get('wgNamespaceNumber') % 2 != 0 && mw.config.get('wgNamespaceNumber') >= 0)
      && (mw.config.get('wgAction') == "view" || mw.config.get('wgAction') == "purge")) {
      var skinConfig = {
         textCont: '', pageControls: '', controlsMarkup: '',
         buttonOpenPri: '', buttonOpenSec: '', buttonClose: ''
      };

      switch (mw.config.get('skin')) {
         case 'monobook':
         case 'vector':
            skinConfig.textCont = '#bodyContent';
            skinConfig.pageControls = '#p-cactions > div > ul';
            skinConfig.controlsMarkup = '<li id="control_archive"><a id="ca-archive" title="' + msg('buttonArchiveToolTooltip') + '" href="#" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<input type="submit" style="font-weight: bold;" value="';
            skinConfig.buttonOpenSec = '<input type="submit" value="';
            skinConfig.buttonClose = '" />';
            break;
      }

      $(function() {
         function api(q, fn) {
            q.format = 'json';
            return $.post(mw.config.get('wgScriptPath') + '/api.php', q, fn, "json");
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

            $(vaultConfig.loadIndicator).appendTo(bc);
            api({
               action: 'query',
               prop: 'revisions',
               titles: mw.config.get('wgPageName'),
               rvprop: 'timestamp|content'
            }, function(q) {
               bc.empty();
               var rev = q.query.pages[mw.config.get('wgArticleId')].revisions[0];
               var time = rev.timestamp;
               var talkToken, tokenTime;
               var content = rev['*'];
               token(mw.config.get('wgPageName'), function(p) {
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
                     location = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(mw.config.get('wgPageName')) + '&action=purge';
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
                  $(vaultConfig.loadIndicator).appendTo(bc);
                  
                  runArchive(talkLines.join('\n'), archiveLines.join('\n'));
               }
               
               var archiveTitle;
               function runArchive(talkContent, archiveContent) {
                  var archiveNo = 1;
                  function findArchives() {
                     var m = $('<p>Finding archive id: </p>').appendTo(bc);
                     api({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: mw.config.get('wgNamespaceNumber'),
                        apprefix: mw.config.get('wgTitle') + '/' + config.archiveSubpage,
                        aplimit: 'max',
                        apdir: 'ascending'
                     }, function(q) {
                        $.each(q.query.allpages, function(index, value) {
                           qt = parseInt(q.query.allpages[index].title.substr(mw.config.get('wgPageName').length+("/"+config.archiveSubpage).length), 10);
                           if (qt >= archiveNo) {
                              archiveNo = qt+1;
                           }
                        });
                        archiveTitle = mw.config.get('wgPageName')+ '/' + config.archiveSubpage + ' ' + archiveNo;
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
                           summary: msg('summaryArchiveFrom') + " [[" + mw.config.get('wgPageName') + "]].",
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
                     var m = $('<p>Finding token for '+ mw.config.get('wgPageName') +': </p>').appendTo(bc);
                     m.append('done...');
                     m = $('<p>Updating talk page: </p>').appendTo(bc);
                     api({
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
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
                           location = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(mw.config.get('wgPageName')) + '&action=purge';
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
                        .append( $('<a>refresh</a>').attr({href: mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace('$1', mw.util.wikiUrlencode(mw.config.get('wgPageName')))}) )
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

jQuery(function($) {
   archiveTool();
});

/* </nowiki> */