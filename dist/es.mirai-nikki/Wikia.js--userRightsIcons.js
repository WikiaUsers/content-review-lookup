// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var AdministradorTag = "<a href='http://es.mirai-nikki.wikia.com/wiki/Dueño_del_diario'><span style='color:white'>Dueño de Diario</span></a>";
 var BurócrataTag = "<a href='http://es.mirai-nikki.wikia.com/wiki/Deus_Ex_Machina'><span style='color:white'>Diós</span></a>";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // BURÓCRATAS
  rights["Usui Uzumaki"]                                     = [ AdministradorTag, BurócrataTag];    
  rights["Freeshh"]                                     = [ AdministradorTag, BurócrataTag];

 
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