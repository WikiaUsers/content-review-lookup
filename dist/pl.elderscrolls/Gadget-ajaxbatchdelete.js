/* 
* Ajax Batch Delete V2
* @description Delete listed multiple pages 
* Based on and faster than the original
* http://dev.wikia.com/wiki/AjaxBatchDelete
* Does not need to go to Special:BlankPage to use
* Includes the option to protect after deleting
* @author Ozuzanna
* @translation Vuh
*/

;(function($, mw) {
  var ug = mw.config.get("wgUserGroups").join(' ');
  if (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4) {

   var FormHTML = '\
   <form method="" name="" class="WikiaForm "> \
       <fieldset> \
           <p>Powód usunięcia: \
               <input type="text" id="delete-reason" value="" /> \
           <br/> \
           <label for="protect-check">Zabezpieczyć tylko dla administratorów? <input type="checkbox" id="protect-check" /></label> \
           </p> \
           <p>Wprowadź nazwy stron, które chcesz usunąć <b>rozdzielając je ENTERem</b>. \
               <textarea style="height: 20em; width: 80%;" id="text-mass-delete"/> \
       </fieldset> \
   </form>',
   token = mw.user.tokens.get('editToken');

//Support for Monobook
   if (mw.config.get('skin') === 'monobook') {
      mw.util.addPortletLink('p-tb', '#', 'Masowe usuwanie', 't-bd');
   } else {
         $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-bd">Masowe usuwanie</a></li>');
   }

   $('#t-bd').click(function () {
       $.showCustomModal('Masowe usuwanie', FormHTML, {
           id: 'form-mass-delete',
           width: 500,
           buttons: [{
               id: 'startButton',
               message: 'Wykonaj',
               defaultButton: true,
               handler: function () {
                   initBD();    
               }
           }, {
               message: 'Anuluj',
               handler: function() {
                   $('#form-mass-delete').closeModal();
               }
           }]
       });
 
      //Autocomplete support for categories
      if (mw.config.get('wgCanonicalNamespace') === "Category") {
        $('#mw-pages a').each(function (){ 
          link = $(this).prop("href"); 
          page = $(this).text(); 
          if (page == '← links' || link.indexOf("/Thread") != -1 || link.indexOf("/Message_Wall") != -1 || page == 'next 200' || page == 'previous 200') return;
          $('#text-mass-delete').append(page+"\n"); 
        });
 
         $('div.gallerytext a').each(function (){
           page = $(this).attr("title"); 
           $('#text-mass-delete').append(page+"\n"); 
         });
 
         $('#mw-subcategories a').each(function (){
           page = 'Category:' + $(this).text(); 
           $('#text-mass-delete').append(page+"\n"); 
         });
      }
   });

   function initBD() {
      var txt = document.getElementById('text-mass-delete'),
      deleteReason = document.getElementById('delete-reason').value,
      pages = txt.value.split('\n'),	
      currentPage = pages[0];

      if (!deleteReason) {
         alert('Podaj powód!');
         return;
      }

      document.getElementById('startButton').setAttribute('disabled','disabled');

      if (!currentPage) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Zrobione!', 'Całość usunięta lub następna linia jest pusta.', {
           id: 'mass-delete-complete',
           width: 200,
           buttons: [{
              message: 'Zamknij',
              defaultButton: true,
              handler: function() {
                 $('#mass-delete-complete').closeModal();
              }
           }]
        });
      } else {
              process(currentPage,deleteReason);  
      }
      pages = pages.slice(1,pages.length);
      txt.value = pages.join('\n');
   }

   function process(page,reason) {
      new mw.Api().post({
      format: 'json',
      action: 'delete',
      title: page,
      reason: reason,
      token: token
      })
      .done(function(d) { 
         if (!d.error) {
            console.log('Usuwanie '+page+' zakończone!');
            if (document.getElementById('protect-check').checked) {
               new mw.Api().post({
               format: 'json',
               action: 'protect',
               expiry: 'infinite',
               protections: 'create=sysop', 
               title: page,
               token: token,
               reason: reason
               })
               .done(function(d) { 
                  if (!d.error) {
                     console.log('Zabezpieczanie '+page+' zakonczone!');
                  } else {
                     alert('Błąd zabezpieczenia strony '+page+': '+ d.error.code);
                  }
               })
               .fail(function() {
                     alert('Błąd zabezpieczenia strony '+page+': unknownerror');
               });
            }
         } else {
            alert('Błąd usuwania strony '+page+': '+ d.error.code);
         }
      })
      .fail(function() {
            alert('Błąd usuwania strony '+page+': unknownerror');
      });
       setTimeout(initBD,200);
   }
  }
}) (this.jQuery, this.mediaWiki);