$(function() {
 var rights = {};
 
   //Chatmoderator
 rights["Kopcap94"]          = ["Hauptmann"];

   //Admin
 rights["Cyanide3"]          = ["H�uptling", "Wikia Star", "VSTF"];
 rights["Quenzhal"]          = ["H�uptling", "Wikia Star"];
 rights["Typhix"]            = ["H�uptling", "Hauptmann"];

   //Staff
 rights["Foppes"]            = ["Hand von Sauron"];
 rights["ElBosso"]           = ["Hand von Sauron"];
 rights["MarkvA"]            = ["Hand von Sauron"];
 rights["Peternouv"]         = ["Hand von Sauron"];
 rights["CuBaN VeRcEttI"]    = ["Hand von Sauron"];
 rights["Avatar"]            = ["Hand von Sauron"];
 
  if (typeof rights[wgTitle] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});