/**
 * Name:        User Unused Files
 * Author:      Noreplyz
 * Description: Lists unused files for a user in Special:UserUnusedFiles.
 */
 ;(function(mw, $) {
   if (
      mw.config.get('wgTitle') !== 'UserUnusedFiles' ||
      mw.config.get('wgNamespaceNumber') !== -1
   ) return;

   if (!window.dev || !window.dev.i18n) {
      importArticle({
         type: "script",
         article: "u:dev:MediaWiki:I18n-js/code.js"
      });
   }
   
   var filemanage = {
      isUCP: mw.config.get('wgVersion') !== '1.19.24',
      init: function(i18n) { 
         $(document).prop('title', i18n.msg('heading').escape());
         $('#PageHeader h1').text(i18n.msg('heading').escape());
         $((mw.config.get('skin') === 'oasis') ? '#mw-content-text' : '#content').html('').append(
            '<div id="file-userusage">' +
            '<label for="fm-username">' + i18n.msg('username').escape() + '</label>&nbsp;' +
            '<input value="" id="fm-username">' +
            '<span id="fm-getUsages" class="button">' + i18n.msg('getList').escape() + '</span>' +
            '<div id="file-userusage-wrap"></div>' +
            '</div>'
            );
 
         $('#fm-getUsages').click(function() {
            $('#file-userusage-wrap').empty();
            filemanage.getFileList(filemanage.isUCP ? 'now' : 0, $('#fm-username').val());
         });
 
         $('#fm-username').keypress(function (e) {
            var key = e.which;
            if (key == 13) {
               $('#fm-getUsages').click();
               return false;  
            }
         });
      },
      generateBox: function(title) {
         $('#file-userusage-wrap').append(
            '<div class="file-userusage-box">' + 
               '<div class="fm-box-title">' + title + '</div>' + 
            '</div>'
            );
      },
      getFileList: function(time, user) {
         // grab list of latest images
         return $.ajax({
            url: mw.util.wikiScript('api'),
            type: 'GET',
            format: 'json',
            data: {
               action: 'query',
               list: 'logevents',
               leuser: user,
               leaction: 'upload/upload',
               lestart: time,
               lelimit: 100,
               format: 'json'
            }
         }).done(function(files) {
            var fileObs = files.query.logevents;
            var uniqueFileList = [];
            $.each(fileObs, function(i, item) {
               if ($.inArray(fileObs[i].title, uniqueFileList) == -1) {
                  uniqueFileList.push(fileObs[i].title);
                  $.ajax({
                     url: mw.util.wikiScript('api'),
                     type: 'GET',
                     format: 'json',
                     data: {
                        action: 'query',
                        list: 'imageusage',
                        iutitle: fileObs[i].title,
                        iulimit: 100,
                        format: 'json'
                     }
                  }).done(function(fileUsages) {
                     if (fileUsages.query.imageusage.length === 0) {
                        filemanage.generateBox(fileObs[i].title);
                     }
                  });
               }
            });
            var continueParam = filemanage.isUCP ? "rawcontinue" : "query-continue";
            if (typeof files[continueParam] !== "undefined") {
               filemanage.getFileList(files[continueParam].logevents.lestart, user);
            }
         });
      }
   };


   mw.hook("dev.i18n").add(function (i18n) {
      $.when(
         i18n.loadMessages("UserUnusedFiles"),
         mw.loader.using("mediawiki.util")
      ).done(function(i18n) {
         filemanage.init(i18n);
      });
   });
 
})(this.mediaWiki, this.jQuery);