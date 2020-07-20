// Original script by 452 (http://community.wikia.com/wiki/User:452)

//Usertag script
/* Any JavaScript here will be loaded for all users on every page load. */
function customusertags() {
  var usertags = {}, userstars = {}; userstars["Gold"] = {}; userstars["Trophy"] = {}; userstars["Medal"] = {}; userstars["Shame"] = {}; userstars["Negative"] = {}; userstars["APG"] = {}; //variables
 
/* Adding tags */
  usertags["Imamadmad"] = ["Awesome Person"];
 
/* Adding stars */
 
/* Star definitions */
  var stars = {};
  stars = ["Gold", "Trophy", "Medal", "Shame", "Negative", "APG"];  //Defining available stars, for later.
 
  var starname = {};   //Set display name for each star
  starname["Gold"] = "Gold Star";
  starname["Trophy"] = "Trophy Award";
  starname["Medal"] = "Medal Award";
  starname["Shame"] = "Star of Shame";
  starname["Negative"] = "Negative Star";
  starname["APG"] = "Anti-Playdom Group";
 
  var starfile = {};   //Set filename for each star
  starfile["Gold"] = "https://images.wikia.nocookie.net/wildonesgame/images/7/7b/Star_gold1.png";
  starfile["Trophy"] = "https://images.wikia.nocookie.net/wildonesgame/images/4/44/Trophy_Award.png";
  starfile["Medal"] = "https://images.wikia.nocookie.net/wildonesgame/images/b/b4/Medal_Award.png";
  starfile["Shame"] = "https://images.wikia.nocookie.net/wildonesgame/images/a/a3/Star_shame.png";
  starfile["Negative"] = "https://images.wikia.nocookie.net/wildonesgame/images/3/34/Star_negative.png";
  starfile["APG"] = "https://images.wikia.nocookie.net/wildonesgame/images/0/0f/Usergroup01.png";
 
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