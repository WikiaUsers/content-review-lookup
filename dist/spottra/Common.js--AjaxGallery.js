function timeStamp_AjaxGallery_js() {
   return "2015.03.04 08:08 (UTC-8)";
}

// Pop up media in selected category using Ajax.
// Borrowed heavily from http://dev.wikia.com/wiki/AjaxDiff/code.js
(function ($, mw, AjaxGallery) {
   'use strict';

   var lng = {
      // Deutsch
      de: {
         title: 'Afbeeldingengalerij',
         link: 'Galerij',
         loading: 'Wird geladen, bitte warten...',
         errorapi: 'Fehler: die API gab einen Fehlercode zurück',
         cancelbutton: 'Abbrechen',
      },
      // English
      en: {
         title: 'Image Gallery',
         link: 'Gallery',
         loading: 'Loading, please wait...',
         errorapi: 'Error: API returned error code',
         cancelbutton: 'Cancel',
      },
      // Français
      fr: {
         title: 'Galerie d\'Images',
         link: 'Galerie',
         loading: 'Chargement, merci de patienter...',
         errorapi: 'Erreur: l\'API a retourné le code d\'erreur',
         cancelbutton: 'Annuler',
      },
      // Polish
      pl: {
         title: 'Galeria Zdjęć',
         link: 'Galeria',
         loading: 'Ładowanie, proszę czekać...',
         errorapi: 'Błąd: API zwróciło błąd',
         cancelbutton: 'Anuluj',
      }
   };

   lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
   
   function getPreviewContent(url) {
      PreviewPageAjax('<img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif"> ' + lng.loading);

      $.ajax({
         type: "GET",
         url: url + '?display=page&sort=mostvisited',
         success: function(content) {
            var content = $(content).find('#mw-category-media').html();
            PreviewPageAjax(content);
         },
         error: function(data) {
            alert(lng.errorapi + ' : ' + data.error.info);
         }
      });
   }

   function PreviewPageAjax(content) {
      if ($('#GalleryView').length === 0) {
         var ajaxform = '\
            <form method="" name="" class="WikiaForm"> \
               <div id="GalleryView" style="width:975px; border:3px solid black; word-wrap: break-word;"/> \
            </form>';

         $.showCustomModal(lng.title + ': ' + $('.gallery-anchor').attr('data-link'), ajaxform, {
            id: 'page-viewer',
            width: 1000,
            buttons: [{
               message: lng.cancelbutton,
               handler: function() {
                  $('#page-viewer').closeModal();
               }
            }]
         });

         $('#GalleryView').html(content);
      } else
         $('#GalleryView').html(content);

      $('#GalleryView h2, #GalleryView p').html('');
      $('#GalleryView').css({'overflow': 'auto', 'max-height': $(window).height() * 0.8});
   }

   $('.gallery-anchor').html('\
      <a class="ajax-gallery-link" href="/wiki/Category:' + $('.gallery-anchor').attr('data-link') + '">' + lng.link + '</a>\
   ');

   $('.WikiaArticle').on('click', '.ajax-gallery-link', function(event) {
      event.preventDefault();
      var url = wgServer + $(this).attr("href");
      getPreviewContent(url);
   });
})(this.jQuery, this.mediaWiki, window.AjaxGallery);