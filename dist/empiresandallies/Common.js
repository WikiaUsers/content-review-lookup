// Syncronize tabs by Jan1 //
importScript('MediaWiki:Common.js/SyncronizeTabs.js');
// END  //

// Adds CountDownClock Template //
importScript('MediaWiki:Common.js/CountDownClock.js');
// END  //

// Adds admin tools to easily clean up vandalism //
importScript('MediaWiki:Common.js/wham.js');
// END  //

// Adds Archive to user page edit drop down //
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');
// END  //

//  DisableArchiveEdit script discourages/disables the editing of talk page archives.  //
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: false,
   textColor: '#D9D9D9',
   userLang: true
};
importScriptPage('DisableArchiveEdit/code.js', 'dev');
// END  //

// lists all of the admins in the wiki.  //
//Use: <pre><div id="admin-list"></div></pre> //
importScriptPage('ListAdmins/code.js', 'dev');
// END  //

// Lists all duplicate images on your wiki //
//Use: <pre><div id="mw-dupimages"></div></pre> //
importScriptPage('DupImageList/code.js', 'dev');
// END  //

// Damage Calculator by Jan1 //
function installDamageCalculator() {
  var damageCalculatorDiv =  xpath("//div[@class='damagecalculator']");
  if (damageCalculatorDiv.snapshotLength > 0){
    console.log('Installing Damage Calculator');
    importScript('MediaWiki:DamageCalculator.js');
  }
}

addOnloadHook(installDamageCalculator);
// END  //