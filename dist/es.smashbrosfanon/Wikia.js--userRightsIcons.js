// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var ReversorTag = "Reversor";
 var ModeradorTag = "<div style=" background-color: Black; color: SkyBlue; border: 6px dashed SkyBlue; border-radius: 8px">Reversor</div>";
 var AdministradorTag = "<div style=" background-color: Black; color: Gold; border: 6px dashed Gold; border-radius: 8px">Administrador</div>";
 var BurócrataTag = "<div style=" background-color: Black; color: Green; border: 6px dashed Green; border-radius: 8px">Burócrata</div>";
 var FundadorTag = "<div style=" background-color: Black; color: Red; border: 6px dashed red; border-radius: 8px">Fundador</div>
";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
     //REVERSORES//
 
   rights["TimmyBurch2604"]                                    = [ ReversorTag];

 
    //ADMINISTRADORES
  rights["3DS999"]                                     = [ AdministradorTag];
 
  rights["DarkZoroarkNight"]                                     = [ AdministradorTag];
 
  rights["Glaceon020"]                                     = [ AdministradorTag];
 
   // BURÓCRATAS
  rights["Mordesonicspeed"]                                     = [ FundadorTag, BurócrataTag];

  rights["Seba 20 90"]                                     = [ BurócrataTag];
 
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