// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
  if ($('#UserProfileMasthead').length == 0) { return; }
 var rights = {};
 var AdministradorTag = "<a href='http://es.mirai-nikki.wikia.com/wiki/Due�o_del_diario'><span style='color:white'>Due�o de Diario</span></a>";
 var Bur�crataTag = "<a href='http://es.mirai-nikki.wikia.com/wiki/Deus_Ex_Machina'><span style='color:white'>Di�s</span></a>";
 // BEGIN list of accounts given extra user rights icons
 // Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // BUR�CRATAS
  rights["Usui Uzumaki"]                                     = [ AdministradorTag, Bur�crataTag];    
  rights["Freeshh"]                                     = [ AdministradorTag, Bur�crataTag];

 
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