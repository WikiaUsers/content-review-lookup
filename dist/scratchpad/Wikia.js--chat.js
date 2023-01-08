// 21:03, September 9, 2016 (UTC)
// <source lang="JavaScript">

// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7
// Revised by: Rappy_4187
// Function: Advertise Special:Chat
// ============================================================

$(function() {
  if(skin == "oasis") {
    $("<section class='WikiaPagesOnWikiModule module'><a class='wikia-button createpage' title='Create a new page on this wiki' href='/wiki/Special:CreatePage'><img width='0' height='0' class='sprite new' src='data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D'> Add a Page</a><div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <big><b><a href='http://scratchpad.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'>chat</a></b></big> with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://scratchpad.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'></a></td></tr></table></div>").insertBefore('.WikiaActivityModule');
$('#WikiaPageHeader .tally').insertAfter('.WikiaPagesOnWikiModule a.createpage').show();

    $('.ns-talk .WikiaPageHeader .wikia-menu-button').css('float','right');
  }


  // [[User:Ohmyn0]]'s addition
  $("#chatjs").click(function() {
    window.open('/wiki/Special:Chat?useskin=oasis', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');

    return false;

  });

});

// </source>