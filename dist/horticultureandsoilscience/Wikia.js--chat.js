// 22:30, March 2, 2012 (UTC)
// <source lang="JavaScript">

// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7
// Revised by Rappy 4187
// Function: Advertise [[Special:Chat]]
// ============================================================ 

$(function() {
	$('.WikiaPagesOnWikiModule:first').append('<div style="margin-top:5px; align:center"><table style="width:100%"><td>You can now <a href="/wiki/Special:Chat?useskin=oasis" id="chatjs">chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style="text-align:right; padding-left:5px;"><a href="/wiki/Special:Chat?useskin=oasis" id="chatjs"><img src="https://images.wikia.nocookie.net/__cb20120212072008/horticultureandsoilscience/images/a/a4/Hydrangeas.jpg" alt="Chat" border="0" height="34" width="47" /></a></td></tr></table></div>');
 
        // [[User:Ohmyn0]]'s addition
        $('#chatjs').click(function() {
                window.open('/wiki/Special:Chat?useskin=oasis', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
 
                return false;
 
        });
 
});

// </source>