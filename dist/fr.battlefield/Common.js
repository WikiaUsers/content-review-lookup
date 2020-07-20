/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

//From open-source wiki
importScriptPage('CollapsibleInfobox/code.js', 'dev');

/* Gestion des navboxes avec le statut autocollapse */
var autoCollapse = 2; //nombre à partir duquel on réduit les navboxes sur la page

$(function() {
  var navboxes = $('table.navbox');

  navboxes.each(
    function(index) {
       if (index >= autoCollapse - 1) {
         var table = $(this).find('table');
         if ($(table).hasClass('autocollapse') && !$(table).hasClass('mw-collapsed')) {
            $(table).find('span.mw-collapsible-toggle').click();
         }
       }
    }
  );
});

/* Sound Mouse Hover Script from http://allwebco-templates.com/support/S_audio_onmouseover.htm  */

function playclip() {
  if (navigator.appName == "Microsoft Internet Explorer") {
    if (document.all)
    {
      document.all.sound.src = "click.wav";
    }
  } else {
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
  }
}