/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */



// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE
 
$(function() {
  $('<span class="group">Fundador</span>').insertAfter('.page-Utilizador_Ludgero1 .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Fundador</span>').insertAfter('.page-Message_Wall_Ludgero1 .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Fundador</span>').insertAfter('.page-User_blog_Ludgero1 .masthead-info hgroup h1');
});
 
$(function() {
  $('<span class="group">Fundador</span>').insertAfter('.page-Contribuições/Ludgero1 .masthead-info hgroup h1');
});






window.UserTagsJS = { 
modules: {}, 
tags: { 
bureaucrat: { u: 'Burócrata', order: 1 } 
} 
}; 
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop']; 
 
importArticles({ 
type: "script", 
articles: [ 
"w:c:dev:UserTags/code.js" 
] 
});









/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/thefakegees/images/0/0d/Button_Weegee.png",
		"speedTip": "Weegify!",
		"tagOpen": "<fool> ",
		"tagClose": " </fool>",
		"sampleText": "Weegee Text"
	};
// <source lang="JavaScript">
 
// Adapted by Rappy 4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 
    // BUREAUCRAT
  rights["Ludgero1"]			= ["Fundador"];
  rights["ChristopherAraujo"]			= ["Fundador2"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>