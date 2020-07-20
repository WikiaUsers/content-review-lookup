/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Projektanci
 
  rights["Tysia123"]                   = ["Smocza Jeźdźczyni"];
  rights["Καρδιά του Δράκου"]                   = ["czituch"];
  rights["Trollka21"]                   = ["Opiekun fanonu"];
  rights["xAngel4x"]                   = ["opiekun fanonu"];

   // Filmowe konta
  rights["Nieustraszona Astrid Hofferson"]                   = ["Oficjalne konto"];
  rights["Sączysmark Jorgenson"]                   = ["Oficjalne konto"];
  rights["Śledzik Ingerman"]                   = ["Oficjalne konto"];
  rights["Szczerbatek Alfa"]                   = ["Oficjalne konto"];
  rights["Mieczyk Thorston"]                   = ["Oficjalne konto"];
  rights["Szpadka Thorston"]                   = ["Oficjalne konto"];
  rights["Pyskacz Gbur"]                   = ["Oficjalne konto"];
  rights["Stoick Ważki"]                   = ["Oficjalne konto"];
  rights["Koszmar Ponocnik Hakokieł"]                   = ["Oficjalne konto"];
  rights["Śmiertnik Zębacz Wichura "]                   = ["Oficjalne konto"];
  rights["Gronkiel Sztukamięs"]                   = ["Oficjalne konto"];
  rights["Zębiróg Zamkogłowy Jot i Wym"]                   = ["Oficjalne konto"];
  rights["Czkawka Haddock"]                   = ["Oficjalne konto"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// </source>