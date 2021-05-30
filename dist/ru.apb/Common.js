/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// Загрузить js для расчета оружия
if(document.getElementById('weaponCalc')){
    importScript('MediaWiki:WeaponStats.js');
}
 
function addMastheadTags() {
  var rights = {};
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    } 
};