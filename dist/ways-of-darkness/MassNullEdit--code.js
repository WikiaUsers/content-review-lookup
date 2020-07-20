//<syntaxhighlight lang="javascript">
/* 
* Mass Null Edit 
* @description Null edit listed multiple pages. Similar to Ajax Batch Delete.
* Scripts used to help create:
* http://dev.wikia.com/wiki/NullEditButton/code.js
* http://dev.wikia.com/wiki/AjaxBatchDelete/code.js
* http://dev.wikia.com/wiki/ChatBlockButton/code.js
* @author Ozuzanna
*/
 
;(function($, mw) {
 
if ($('#t-mne').length)
  return;
 
  var FormMNE = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Enter the name of each page you want to null edit on a <b>separate line</b>.<br/>Remember to include the namespace too if it is not in main.</p> \
      <textarea style="height: 20em; width: 100%; border: 1px solid #aaa; padding: 0;" id="text-null-edit"/> \
      <div id="text-error-output" style="height: 10em; width: 100%; margin-top: 5px; color: #000; background-color: #ffbfbf; border: 1px solid #aaa; font-weight: bold; overflow: scroll">Any errors encountered will appear below<br/></div> \
    </fieldset> \
  </form>',
  delay = window.nullEditDelay || 1000,
  userbtn = window.nullEditUserButton;
 
  //Support for Monobook
  if (mw.config.get('skin') === 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Mass Null Edit', 't-mne');
  } else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mne">Mass Null Edit</a></li>');
  }
 
  //Optional user drop-down button
  if (userbtn == true) {
    $('#AccountNavigation > li > .subnav > li:last-child').after(
      $('<li/>').append('<a style="cursor:pointer" id="user-mne">Mass Null Edit</a>')
    );
  }
 
  $('#t-mne,#user-mne').click(function () {
    $.showCustomModal('Mass Null Edit', FormMNE, {
      id: 'null-edit',
      width: 500,
      buttons: [{
          message: 'Cancel',
          handler: function() {
            $('#null-edit').closeModal();
          }
      }, {
          message: 'Add category contents',
          defaultButton: true,
          handler: function() {
            addCategoryContents();
          }
      }, {
          id: 'startButton',
          message: 'Initiate',
          defaultButton: true,
          handler: function () {
            init(); 
          }
      }]
    });
 
   //Autocomplete support for [[Special:WhatLinksHere]]
      if (mw.config.get('wgCanonicalSpecialPageName') === "Whatlinkshere") {
         $('#mw-whatlinkshere-list a').each(function (){ 
            link = $(this).prop("href"); 
            page = $(this).text(); 
            if (page == '← links' || page == 'edit' || link.indexOf("/Thread") != -1 || link.indexOf("/Message_Wall") != -1 ) return;
            $('#text-null-edit').append(page+"\n"); 
         });
      }
  });
 
   function init() {
      var txt = document.getElementById('text-null-edit'),
      pages = txt.value.split('\n'),	
      page = pages[0];
 
      document.getElementById('startButton').setAttribute('disabled','disabled');
 
      if (page === '' ) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
           id: 'null-edit-complete',
           width: 200,
           buttons: [{
              message: 'Close',
              defaultButton: true,
              handler: function() {
                $('#null-edit-complete').closeModal();
              }
           }]
        });
      } else {
              nullEdit(page);  
      }
      pages = pages.slice(1,pages.length);
      txt.value = pages.join('\n');
   }
 
    function addCategoryContents() {
      var category = prompt('Please enter the category name (no category prefix):');
      new mw.Api().get({
      action: 'query',
      list: 'categorymembers',
      cmtitle: "Category:"+category,
      cmlimit: 5000
      })
      .done(function(d) {
        if (!d.error) {
          var data = d.query;
 
	  for (var i in data.categorymembers) {
            $('#text-null-edit').append(data.categorymembers[i].title+'\n');
          }
        }
        else {
          $('#text-error-output').append('Failed to get contents of '+ category +' : '+ d.error.code +'<br/>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('Failed to get contents of '+ category +'!<br/>');
      });
    } 
 
   function nullEdit(pageNullEdit) {
     new mw.Api().post({
     format: 'json',
     action: 'edit',
     title: pageNullEdit,
     token: mw.user.tokens.get('editToken'),
     prependtext: ''
     })
     .done(function(d) { 
       if (!d.error) {
         console.log('Null edit of '+pageNullEdit+' successful!');
       } else {
         console.log('Failed to null edit '+pageNullEdit+': '+ d.error.code);
	 $('#text-error-output').append('Failed to null edit '+pageNullEdit+': '+d.error.code+'<br/>');
       }
     })
     .fail(function() {
       console.log('Failed to null edit '+pageNullEdit+'!');
       $('#text-error-output').append('Failed to null edit '+pageNullEdit+': unknownerror<br/>');
     });
    setTimeout(init,delay);
  }
}) (this.jQuery, this.mediaWiki);
//</syntaxhighlight>