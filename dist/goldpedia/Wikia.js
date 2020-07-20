/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
/* <pre> */
$(document).ready(function() {
 $('.WikiHeader > nav > ul ').append('<li><a href="/wiki/' + encodeURIComponent( wgPageName ) + '?useskin=monobook">Zobacz na Nowoczesnej skórce</a></li>');
});

importScriptPage('User:Vuh/ChatHacks.js', 'vuh');

/* </pre> */

// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS  
     
    
    // Biurokraci             

  rights["BrunoTomek"]                = ["biurokrata"]


  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>