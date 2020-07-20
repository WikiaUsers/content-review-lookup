/* Any JavaScript here will be loaded for all users on every page load. */
function customusertags() {
  var usertags = {}, userstars = {}; userstars["Gold"] = {}; userstars["Silver"] = {}; userstars["Bronze"] = {}; //variables

/* Adding tags */
  usertags["Wildoneshelper"] = ["Any currency will do"];
 /* Adding stars */  
  userstars["Gold"]["Top Agent PGG jr."] = ["message gold"];
  userstars["Silver"]["Top Agent PGG jr."] = ["message silver"];
  userstars["Bronze"]["Top Agent PGG jr."] = ["message bronze"];

/* Star definitions */
  var stars = {};
  stars = ["Gold", "Silver", "Bronze"];  //Defining available stars, for later.
 
  var starname = {};   //Set display name for each star
  starname["Gold"] = "Gold Star";
  starname["Silver"] = "Silver Star";
  starname["Bronze"] = "Bronze Star";

  var starfile = {};   //Set filename for each star
  starfile["Gold"] = "https://images.wikia.nocookie.net/wildonesgame/images/7/7b/Star_gold1.png";
  starfile["Silver"] = "https://images.wikia.nocookie.net/wildonesgame/images/7/7b/Star_gold1.png";
  starfile["Bronze"] = "https://images.wikia.nocookie.net/wildonesgame/images/7/7b/Star_gold1.png";

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