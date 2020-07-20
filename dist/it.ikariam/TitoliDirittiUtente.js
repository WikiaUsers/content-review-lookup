// SCRITTO DA UTENTE:RAPPY_4187 da WoWWiki
// WRITTEN BY USER:RAPPY_4187 from WoWWiki
 
$(function() { var rights = {};
 
// L'INIZIO DELLA LISTA utilizzando questo formato:
// rights["Nome Utente"] = ["Etichetta1","Etichetta2","Etichetta3","etc ..."],
 

     // Fondatore

rights["Minerva Titani"] = ["Fondatore","Burocrati","Amministratori"],

     // Bureaucrats



     // Amministratori

rights["Jrooksjr"] = ["Amministratori","Ikariam Wiki (en) - Amministratori","Ikapedia Wiki (pt-br) - Amministratori"],

     // Solo Rollback



     // Moderatori Solo



     // Solo altri wiki



     // Wikia Staff (tutte le varianti)

rights["Avatar"]         = ["Wikia Staff","Wikia Utilities"],
rights["Dopp"]           = ["Wikia Staff","Wikia Utilities"],
rights["Eulalia459678"]  = ["Volunteer Spam Task Force (VSTF)"],
rights["Jimbo Wales"]    = ["Wikia Staff"],
rights["Kirkburn"]       = ["Wikia Staff","Wikia Utilities"],
rights["KyleH"]          = ["Wikia Staff","Wikia Utilities"],
rights["MerryStar"]      = ["Wikia Staff","Wikia Utilities"],
rights["Moli.wikia"]     = ["Wikia Staff","Wikia Utilities"],
rights["Randomtime"]     = ["Volunteer Spam Task Force (VSTF)"],
rights["Sannse"]         = ["Wikia Staff","Wikia Utilities"],
rights["Sarah Manley"]   = ["Wikia Staff","Wikia Utilities"],
rights["Sulfur"]         = ["Volunteer Spam Task Force (VSTF)"],
rights["Toughpigs"]      = ["Wikia Staff","Wikia Utilities"],

     // Wikia bots

rights["Default"]           = ["Wikia Setup Bot"],
rights["MediaWiki default"] = ["Wikia MediaWiki bot"],
rights["QATestsBot"]        = ["Wikia Quality Assurance Test Bot"], 
rights["WikiaBot"]          = ["Wikia Bot"], 
rights["Wikia"]             = ["Wikia User Bot"];


// FINE DELLA LISTA
 
  if (typeof rights[wgTitle] != "undefined") {
     // rimuovere i vecchi diritti - remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
     // aggiungere nuovi diritti - add new rights
      $('<span class="tag">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});