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

if ($('#t-me').length)
  return;

  var FormMNE = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Wprowadź nazwy stron, na których chcesz wykonać pustą edycję <b>rozdzielając je ENTERem</b>.<br/>Pamiętaj, aby dodać nazwę przestrzeni nazw, jeśli strona nie znajduje się w głównej przestrzeni nazw.</p> \
      <textarea style="height: 20em; width: 80%;" id="text-null-edit"/> \
      <div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Wszystkie błędy będą ukazane poniżej<br/></div> \
    </fieldset> \
  </form>',
  delay = window.nullEditDelay || 1000,
  userbtn = window.nullEditUserButton;

  //Support for Monobook
  if (mw.config.get('skin') === 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Masowe puste edycje', 't-mne');
  } else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mne">Masowe puste edycje</a></li>');
  }

  //Optional user drop-down button
  if (userbtn == true) {
    $('#AccountNavigation > li > .subnav > li:last-child').after(
      $('<li/>').append('<a style="cursor:pointer" id="user-mne">Masowe puste edycje</a>')
    );
  }

  $('#t-mne,#user-mne').click(function () {
    $.showCustomModal('Masowe puste edycje', FormMNE, {
      id: 'null-edit',
      width: 500,
      buttons: [{
          message: 'Anuluj',
          handler: function() {
            $('#null-edit').closeModal();
          }
      }, {
          message: 'Dodaj zawartość kategorii',
          defaultButton: true,
          handler: function() {
            addCategoryContents();
          }
      }, {
          id: 'startButton',
          message: 'Wykonaj',
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
        $.showCustomModal('Zrobione!', 'Całość usunięta lub następna linia jest pusta.', {
           id: 'null-edit-complete',
           width: 200,
           buttons: [{
              message: 'Zamknij',
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
      var category = prompt('Proszę wpisać nazwę kategorii (bez prefiksu kategoria):');
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
          $('#text-error-output').append('Błąd pobrania zawartości kategorii '+ category +' : '+ d.error.code +'<br/>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('Błąd pobrania zawartości kategorii '+ category +'!<br/>');
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
         console.log('Pusta edycja na stronie '+pageNullEdit+' wykonana!');
       } else {
         console.log('Błąd pustej edycji na stronie '+pageNullEdit+': '+ d.error.code);
	 $('#text-error-output').append('Błąd pustej edycji na stronie '+pageNullEdit+': '+d.error.code+'<br/>');
       }
     })
     .fail(function() {
       console.log('Błąd pustej edycji na stronie '+pageNullEdit+'!');
       $('#text-error-output').append('Błąd pustej edycji na stronie '+pageNullEdit+': Nieznany błąd<br/>');
     });
    setTimeout(init,delay);
  }
}) (this.jQuery, this.mediaWiki);
//</syntaxhighlight>