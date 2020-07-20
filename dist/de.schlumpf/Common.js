// Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. 
 
 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

// Sliders using jquery

//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://de.schlumpf.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
//  $('#portal_next').click(function() {
//    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', //'selected') + 1 ); // switch to next tab
//    return false;
//  });
// $('#portal_prev').click(function() { // bind click event to link
//    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', //'selected') - 1 ); // switch to previous tab
//    return false;
//  });

  // Ablauf Button "Mitte" der Ansichten Vorder- & Rückseite 
  $('#portal_center').click(function() {
       switch($tabs.tabs('option', 'selected')) {
         case 0:
           $tabs.tabs('select', 2); // Rückseite anzeigen
         break;
         case 2:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
         default:
           $tabs.tabs('select', 0); // Vorderseite anzeigen 
         break;
        }
    return false;
  });

  // Ablauf Pfeil für Rotation der Ansichten nach oben
  $('#portal_top').click(function() {
       switch($tabs.tabs('option', 'selected')) {
         case 0:
           $tabs.tabs('select', 5); // Draufsicht anzeigen
         break;
         case 5:
           $tabs.tabs('select', 2); // Rückseite anzeigen
         break;
         case 2:
           $tabs.tabs('select', 4); // Unteransicht anzeigen
         break;
         case 4:
           $tabs.tabs('select', 0); // Vorderseite anzeigen 
         break;
         default:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
        }
    return false;
  });
  
  // Ablauf Pfeil für Rotation der Ansichten nach rechts
  $('#portal_next').click(function() {
       switch($tabs.tabs('option', 'selected')) {
         case 0:
           $tabs.tabs('select', 1); // rechte Seitenansicht anzeigen  
         break;
         case 1:
           $tabs.tabs('select', 2); // Rückseite anzeigen
         break;
         case 2:
           $tabs.tabs('select', 3); // linke Seitenansicht anzeigen
         break;
         case 3:
           $tabs.tabs('select', 0); // Vorderseite anzeigen 
         break;
         default:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
        }
    return false;
  });

  // Ablauf Pfeil für Rotation der Ansichten nach links
  $('#portal_prev').click(function() {
       switch($tabs.tabs('option', 'selected')) {
         case 0:
           $tabs.tabs('select', 3); // linke Seitenansicht anzeigen  
         break;
         case 3:
           $tabs.tabs('select', 2); // Rückseite anzeigen
         break;
         case 2:
           $tabs.tabs('select', 1); // rechte Seitenansicht anzeigen 
         break;
         case 1:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
         default:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
      }
    return false;
  });
 
  // Ablauf Pfeil für Rotation der Ansichten nach unten
  $('#portal_down').click(function() {
       switch($tabs.tabs('option', 'selected')) {
         case 0:
           $tabs.tabs('select', 4); // Unteransicht anzeigen 
         break;
         case 4:
           $tabs.tabs('select', 2); // Rückseite anzeigen
         break;
         case 2:
           $tabs.tabs('select', 5); // Draufsicht anzeigen
         break;
         case 5:
           $tabs.tabs('select', 0); // Vorderseite anzeigen 
         break;
         default:
           $tabs.tabs('select', 0); // Vorderseite anzeigen
         break;
        }
    return false;
  });

});
});

// END Sliders using jquery