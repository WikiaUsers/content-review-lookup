/* This script was created by user:452 for the Saints Row Wiki: http://saintsrow.wikia.com */

/* Any JavaScript here will be loaded for all users on every page load. */


function customusertags() {
  var   usertags = {}, 
        userstars = {};

  userstars["Iron"] = {};
  userstars["Gold"] = {};
  userstars["Diamond"] = {}; //variables

/* Adding tags */
  usertags["Sasquatch101"] = ["Founder"];
  usertags["LS11sVaultBoy"] = ["Bureaucrat"];
  usertags["Boomer8"] = ["Bureaucrat"]; 
  usertags["AwesomeBoy"] = ["Admin"];
  usertags["MythHunter 007"] = ["Admin"];
  usertags["Matthew103"] = ["Admin"];
  usertags["Xalbador Gliese 581C"] = ["Admin"];
  usertags["Death002"] = ["Admin"];
 

/* Adding stars */
  userstars["Iron"]["WildBrick142"] = ["test"];
  userstars["Gold"]["WildBrick142"] = ["test"];
  userstars["Diamond"]["WildBrick142"] = ["test"];

/* Star definitions */
  var stars = {};
  stars = ["Iron", "Gold", "Diamond"];  //Defining available stars, for later.

  var starname = {};   //Set display name for each star
  starname["Iron"] = "Iron Award";
  starname["Gold"] = "Gold Award";
  starname["Diamond"] = "Diamond Award";

  var starfile = {};   //Set filename for each star
  starfile["Iron"] = "https://images.wikia.nocookie.net/minecraft360/images/4/4c/IronAward.png";
  starfile["Gold"] = "https://images.wikia.nocookie.net/minecraft360/images/7/7d/GoldAward.png";
  starfile["Diamond"] = "https://images.wikia.nocookie.net/minecraft360/images/5/59/DiamondAward.png";

  var currentuser = $('.UserProfileMasthead .masthead-info h1').html();
  if (typeof currentuser != "undefined") { //Only proceed if it's a user page

    if (typeof usertags[currentuser] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();  // remove old tags
      for( var i=0, len=usertags[currentuser].length; i < len; i++)
        $('<span class="tag">' + usertags[currentuser][i] + '</span>').appendTo('.masthead-info hgroup');
    }

    for( var i=0, lena=stars.length; i < lena; i++)
      if (typeof userstars[stars[i]][currentuser] != "undefined")
        for( var j=0, lenb=userstars[stars[i]][currentuser].length; j < lenb; j++)
          $('<img src="'+starfile[stars[i]]+'" title="' + userstars[stars[i]][currentuser][j] + '" class="userstar '+stars[i]+'">').appendTo('.masthead-info hgroup');

  }
}
addOnloadHook(customusertags);