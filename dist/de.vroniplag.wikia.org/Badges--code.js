// 21:22, June 27, 2012 (UTC)
// WRITTEN BY User:Rappy_4187
// This code is meant to *supplement* current rights groups for users'
// mastheads on the wiki. It is not intended to replace Wikia's versions thereof.
// If you choose to use this code on your wiki, you must use it in the same manner.
// For example, it is not permissable to replace "admin" with "beat cop".
// Doing so, may be a breach of Wikia's Terms of Use.

$(function() {
  var rights = {};

  // BEGIN List of accounts given extra user rights icons
    // BOTS
    rights["Kybot"] = ["Bot"];

  // END

  // BEGIN Script to remove old rights icons & insert new

    if (wgTitle == "Contributions") {
      var user = fbReturnToTitle.substring(fbReturnToTitle.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }

    if (user == "Goalgetter") {
        $('.UserProfileMasthead .masthead-avatar').empty(); 
        $('<img src="https://images.wikia.nocookie.net/__cb3/messaging/images/thumb/1/19/Avatar.jpg/150px-Avatar.jpg" itemprop="image" class="avatar">').appendTo('.masthead-avatar');
    }
    if (typeof rights[user] != "undefined") {

      for( var i=0, len=rights[user].length; i < len; i++) {

        // add new rights
        $('<span class="group">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
     

      }
    }

  // END

});
// </source>