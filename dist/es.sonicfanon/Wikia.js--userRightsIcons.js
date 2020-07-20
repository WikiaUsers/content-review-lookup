// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var ReversorTag = "Reversor";
 var ModeradorTag = "Moderador del Chat";
 var AdministradorTag = "Administrador";
 var AdministadoraTag = "Administradora";
 var BurócrataTag = "Burócrata";
 var FundadorTag = "Fundador";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.

     //REVERSORES//
    
   rights["Dan Abnormal"]                                    = [ ReversorTag];

   rights["DeltaRockBloody12"]                                    = [ ReversorTag];

    //MODERADORES DEL CHAT

  rights["OS X Yosemite"]                                     = [ ModeradorTag];

  rights["Sparkfase4"]                                     = [ ModeradorTag];

  rights["Rocketmacload"]                                     = [ ModeradorTag];

    //ADMINISTRADORES
  rights["Metal Sonic21"]                                     = [ AdministradorTag];

  rights["Alltails"]                                     = [ AdministradoraTag];

  rights["Shadow160"]                                     = [ AdministradorTag];

  rights["Speedmaster78"]                                     = [ AdministradorTag];
 
   // BURÓCRATAS
  rights["Mordesonicspeed"]                                     = [ BurócrataTag];
 
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