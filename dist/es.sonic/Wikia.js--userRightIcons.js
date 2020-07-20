// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var ReversorTag = "Reversor";
 var ModeradorTag = "Moderador del Chat";
 var AdministradorTag = "Administrador";
 var BurócrataTag = "Burócrata";
 var FundadorTag = "Fundador";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
     //REVERSORES//
 
   rights["SuperMario145"]                                    = [ ReversorTag];

    rights["Mordesonicspeed"]                                    = [ ReversorTag];
 
    //MODERADORES DEL CHAT
 
  rights["Mordesonicspeed"]                                     = [ ModeradorTag];
 
  rights["Kirby Sonic Fan"]                                      = [ ModeradorTag];

  rights["Speedmaster78"]                                      = [ ModeradorTag];
 
    //ADMINISTRADORES
  rights["JosexFavian"]                                     = [ AdministradorTag];
 
  rights["Alltails"]                                     = [ AdministradorTag];
 
  rights["OS X Yosemite"]                                     = [ AdministradorTag];

  rights["Ricardo2299"]                                     = [ AdministradorTag];

 rights["Master Dark Chaos"]                                     = [ AdministradorTag];
 
   // BURÓCRATAS
  rights["JosexFavian"]                                     = [ BurócrataTag];
 
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