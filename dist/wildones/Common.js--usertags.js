/* This script was created by user:452 for the Saints Row Wiki: http://saintsrow.wikia.com */

/* Any JavaScript here will be loaded for all users on every page load. */
function customusertags() {
  var usertags = {}, userstars = {}; userstars["Gold"] = {}; userstars["Trophy"] = {}; userstars["Medal"] = {}; userstars["Shame"] = {}; userstars["Negative"] = {}; //variables

/* Adding tags */
  usertags["WildBrick142"] = ["Annoying Admin :)"];
  usertags["Wildoneshelper"] = ["Any currency will do"];
  usertags["HMCC10"] = ["Co-Rollback"];
  usertags["Yuentszhim97"] = ["Co-Rollback"];
  usertags["Kim kid34"] = ["Rollback"];
  usertags["Junkmaniac"] = ["Rollback"];
  usertags["212.253.97.93"] = ["Clown"];

/* Adding stars */
  userstars["Gold"]["Funkey100"] = ["You founded the wiki. If not you, the community would never have been here. Too bad you can't be here with us."];
  userstars["Gold"]["Wildoneshelper"] = ["You help out a lot of people here with games, English and other stuff. Here is a star for everything."];
  userstars["Gold"]["WildWarren"] = ["One of the best admins here - you are very helpful and you made very good comics."];
  userstars["Medal"]["Aznjohn15"] = ["Sorry that I've argued with you in Gas Gun page. Here is a medal of forgiveness."];
  userstars["Medal"]["HMCC10"] = ["Great user in the wiki, kudos!"];
  userstars["Medal"]["Holacomostai"] = ["Please come back! You have been one of the most informative users in this wiki!"]
  userstars["Medal"]["Junkmaniac"] = ["English is vital on Earth. Have a medal of being an English ambassador in this wiki!"]
  userstars["Medal"]["Kim kid34"] = ["You've been with us for years. Here is a medal of experienceness."]
  userstars["Trophy"]["Junkmaniac"] = ["Winner of Wild Ones Wiki Competition 2011"];
  userstars["Trophy"]["WildWarren"] = ["Winner of Wild Ones Wiki Community Challenge 2013"];
  userstars["Trophy"]["PeachNuts"] = ["Winner of WildWarren's Wild Ones Challenge 2011"];
  userstars["Trophy"]["JCRVHELPER"] = ["Winner of Wild Ones Wiki Caption Contest 2011"];
  userstars["Shame"]["212.253.97.93"] = ["You vandalized too much that you deserve a permanent Star of Shame and a Clown title."];
  userstars["Negative"]["Wildonespronohack:)"] = ["You provoked a fight between Wild Ones fans and Worms fans, not to mention that you vandalised the Worms and Crazy Penguin Wars wiki. Take this as a warning."];
  userstars["Negative"]["176.41.19.29"] = ["I understand that you have been provoked but vandalising is not the option.", "I understand that you have been provoked but vandalising is not the option.", "I understand that you have been provoked but vandalising is not the option."];

/* Star definitions */
  var stars = {};
  stars = ["Gold", "Trophy", "Medal", "Shame", "Negative"];  //Defining available stars, for later.

  var starname = {};   //Set display name for each star
  starname["Gold"] = "Gold Star";
  starname["Trophy"] = "Trophy Award";
  starname["Medal"] = "Medal Award";
  starname["Shame"] = "Star of Shame";
  starname["Negative"] = "Negative Star";

  var starfile = {};   //Set filename for each star
  starfile["Gold"] = "https://images.wikia.nocookie.net/wildonesgame/images/7/7b/Star_gold1.png";
  starfile["Trophy"] = "https://images.wikia.nocookie.net/wildonesgame/images/4/44/Trophy_Award.png";
  starfile["Medal"] = "https://images.wikia.nocookie.net/wildonesgame/images/b/b4/Medal_Award.png";
  starfile["Shame"] = "https://images.wikia.nocookie.net/wildonesgame/images/a/a3/Star_shame.png";
  starfile["Negative"] = "https://images.wikia.nocookie.net/wildonesgame/images/3/34/Star_negative.png";

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