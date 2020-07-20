// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt

 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var botTag = "<a href='http://es.naruto.wikia.com/wiki/Naruto_Wiki:Administración'><span style='color:white'>Kyubi</span></a>";
 var AsistenteTag = "<a href='http://es.naruto.wikia.com/wiki/Naruto_Wiki:Administración'><span style='color:white'>Sannin</span></a>";
 var ReversorTag = "<a href='http://es.naruto.wikia.com/wiki/Naruto_Wiki:Administración'><span style='color:white'>ANBU</span></a>";
 var chatMod = "<a href='http://es.naruto.wikia.com/wiki/Naruto_Wiki:Administración'><span style='color:white'>Tokubetsu Jōnin</span></a>";
 var BureaucratTag="<a href='http://es.naruto.wikia.com/wiki/Naruto_Wiki:Administración'><span style='color:white'>Sabio de los Seis Caminos</span></a>";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // BOTS
 rights["DarielBot"]				= [botTag];
 
  //Burócratas//
 rights["ObscureFlame"]             = [BureaucratTag];
 rights["Dariel Senju"]             = [BureaucratTag];
 
   //ASISTENTES
 rights["David Senju"]				= [AsistenteTag];
 rights["Leo Hatake"]				= [AsistenteTag, ReversorTag];
 
   //MODERADORES
 rights["Shar17"]				= [chatMod];			
 rights["Ryukazi Uchiha Inuzuka"]		= [chatMod];

   // REVERSORES
 rights["Gaara5746"]            = [ReversorTag];
 
 // END list of accounts given extra user rights icons
if (mw.config.get('wgCanonicalSpecialPageName', '') == "Contributions" && wgPageName.indexOf('/') != -1) {''
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});
// END rigths