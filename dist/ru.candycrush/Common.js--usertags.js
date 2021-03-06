/* This script was created by user:452 for the Saints Row Wiki: http://saintsrow.wikia.com */

/* Any JavaScript here will be loaded for all users on every page load. */
function customusertags() {
  var usertags = {}, userstars = {}; userstars["Gold"] = {}; userstars["Trophy"] = {}; userstars["Medal"] = {}; userstars["Shame"] = {}; userstars["Negative"] = {}; userstars["APG"] = {}; //variables

/* Adding tags */
  usertags["Wildoneshelper"] = ["Any currency will do"];
  usertags["Lefty8899"] = ["W"];
  usertags["S256"] = ["Sulfur is my high. Jaesh."];
  usertags["EndermanR169"] = ['Best Brother Ever'];
  usertags["3primetime3"] = ['Time After Time'];
  usertags["Supermario3459"] = [':-)'];
  usertags["CC-8589934592"] = ['Let it go!'];
  usertags["Asew54321"] = ['Rawr'];
  usertags["EeveeLover1988"] = ['Eevee 4ever!'];
  usertags["Blackbird625"] = ["Never cussed before, never will"];
  usertags["Liquoritz"] = ["Vanished forever"];
  usertags["Olaf-Tiffi-Odus2711"] = ["I like trains"];
  usertags["3litecandycrusher"] = ["If you follow the river, you'll find your way home"];
  usertags["ChaneyTheSamurott"] = ["Samurott, the formidable Pokémon"];
  usertags["The Gatling Pea"] = ["Disturbed a nest of wasps for no good reason"];
  usertags["Flockky II"] = ["Flappy-Go-Lucky"];
  usertags["DaRKMaRoWaK"] = ["Shiba Inu!!!"];
  usertags["Blueeighthnote"] = ["~Singing a Musical Note~"];
  usertags["Roseturnip"] = ["Sven the Reindeer"];
  usertags["Not real name"] = ["SEMI-RETIRED"];
  usertags["Michael, The Lord Of Wikia"] = ["Lord Of Wikia"];
  usertags["--MULLIGANACEOUS--"] = ["ßſſ"];
  usertags["Арсений Иванов"] = ["Russian community founder"];
/* Adding stars */
  userstars["Gold"]["Lefty8899"] = ["This is a medal given to you. If not for you, the wiki would not be here, and every user would not be here too."];
  userstars["Gold"]["S256"] = ["Dear S256, Thanks for getting me hooked on disulfur. Yours sincerely, some deranged chemist."];
  userstars["Gold"]["3primetime3"] = ["I'm Queen Elsa. Congratulations you for being a bureaucrat! So, this is a medal I give you for the hard work you do on this wiki."];
  userstars["Gold"]["Wildoneshelper"] = ["Gold star for bureaucrat by DCG"];
  userstars["Medal"]["Jacob5664"] = ["Flockky here. You have followed and accomplished the task about the usage of Game Maker. A medal deserves for you. Take good care of it. :)"];
  userstars["Gold"]["Catinthedark"] = ["This is 3primetime3. You've worked diligently to make this wiki the best it can be. I want to give you this medal to show you my thanks!"];
  userstars["Gold"]["Marisa1980"] = ["Queen Elsa here. I give you a gold medal because you did many things that beyond imagination with us. Use it well! <3"];
  userstars["Gold"]["Flockky II"] = ["Blueeighthnote here! Thank you for your diligent contributions to the wiki! :)"];
  userstars["Gold"]["Akumaxx ws"] = ["A very working contributor especially on mobile feature. I think you deserve this star. - DoCheonGong"];
  userstars["Gold"]["Not real name"] = ["I give a star for you because you are filling the information about the levels with past versions on mobile version. - DoCheonGong"];
  userstars["Gold"]["Roseturnip"] = ["Flockky here. Thank you for your best suggestions, esp. the creation of Notes section. I really appreciate your hard work, especially that you have reached 40K!"];
  userstars["Trophy"]["Арсений Иванов"] = ["You are the first user who introduced interwiki on this community. Keep it up. -- DoCheonGong"];
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