/**
* UserTags
* Replacement for InactiveUsers and UserRightsIcons and
* general user name and tag code.
*
* Notes:
*  Subsumed here and rewritten for efficiency and because of avoidable JS errors
*  on pre-IE 10 clients. Works on Special:Contributions. 
*
* Credits:
* InactiveUsers documentation at: http://dev.wikia.com/wiki/InactiveUsers
*  (c) Peter Coester, 2012
* UserRightsIcons written by USER:RAPPY_4187
*  06:49, November 1, 2011 (UTC)
*/
/*jshint curly:false laxbreak:true es5:true jquery:true */

function wwUserTags(user, isInactive) {

  var tags = [];

  // ** InactiveUsers
  if (isInactive)
    tags.push("Inactive");

  // ** UserRightsIcons
  var users = {};

  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  // STAFF
  users["Kirkburn"] = ["Staff", "Bureaucrat Emeritus", "Administrator"],
  users["Raylan13"] = ["Staff", "Bureaucrat", "Sleepless"],

  // FOUNDERS

  users["WoWWiki-Rustak"] = ["Founder", "Bureaucrat Emeritus", "Administrator"],

  // BUREAUCRATS

  users["Fandyllic"]    = ["Bureaucrat", "Administrator", "Crazy Person", "Expert", "Templates"],
  // users[""]          = ["Bureaucrat","Administrator"],

  // BUREAUCRATS EMERITUS

  users["WoWWiki-Sancus"] = ["Bureaucrat Emeritus", "Administrator"],

  // ADMINISTRATORS

  users["Bubsy87"]      = ["Administrator"],
  users["Celess22"]     = ["Administrator", "Expert", "Javascript"],
  users["Frejya"]       = ["Administrator", "Patroller"],
  users["Sitb"]         = ["Administrator", "Expert", "Guild achiever"],

  // ADMINISTRATORS (Inactive)
  users["Macrophager"]  = ["Administrator (Inactive)", "Expert", "Mounts"],
  users["Pecoes"]       = ["Administrator (Inactive)", "Expert", "CSS"],
  users["Servian"]      = ["Administrator (Inactive)", "Wannabe Fixer of Worlds"],
  users["Tankingmage"]  = ["Administrator (Inactive)", "Expert", "Warcraft lore"],

  // ADMINISTRATORS EMERITUS

  users["AlexanderYoshi"] = ["Administrator Emeritus"],

  // MODERATORS (Old)

  users["Zmario"]       = ["Moderator", "Patroller"],

  // CHAT MODERATORS

  users["Sawpog46"] = ["Chat Moderator"],

  // CONTENT MODERATORS

  users["Cecijo"] = ["Content Moderator"],

  // PATROLLERS/MODERATORS

  users["Alex Weaver110352"] = ["Patroller"],
  users["ByzantiosAE"] = ["Patroller"],
  users["Icyveins"] = ["Patroller", "Expert", "External linker"],
  users["Jonrae"] = ["Patroller", "Timeless expert"],
  users["Corgi"] = ["Patroller"],
  users["Scout1534"] = ["Patroller"],
  users["Sasyn"] = ["Patroller"],
  users["TessaVarzi"] = ["Patroller"],
  users["THE GMoD"] = ["Patroller"],
  users["TheKaldorei"] = ["Patroller"],
  users["WoWRper"] = ["Patroller"],
  users["Xideta"] = ["Patroller"],
  users["RainingPain17"] = ["Patroller"],

  // ROLLBACK

  // users[""]    = ["Rollback"],

  // EXPERTS

  //users["Celess22"]       = ["Expert", "Javascript"],
  //users["Fandyllic"]      = ["Expert", "Templates"],
  //users["Icyveins"]       = ["Expert", "External links"],
  users["Lil' Miss Rarity"] = ["Expert", "Javascript"],     // was Icecreamcaekbot
  //users["Macrophager"]    = ["Expert", "Mounts and Riding"],
  //users["Pecoes"]         = ["Expert", "CSS"],
  users["RBoy"]             = ["Expert", "Battle pets"],
  //users["Tankingmage"]    = ["Expert", "Warcraft lore"],
  users["Vilnisr"]          = ["Expert", "Pollster"],
  users["PIESOFTHENORTH"]   = ["Expert", "RTS"],

  // MISCELLANEOUS

  // users[""]       = ["Misc","Stuff"],

  // TEST ACCTS, BOTS, & AWB

  users["WikiaBot"] = ["Wikia Bot"],
  users["Wikia"] = ["Wikia User Bot"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  // append per-user tags, if any
  if (typeof users[user] != "undefined")
    tags = tags.concat(users[user]);
  if (tags.length <= 0) return;

  // remove old tags and add new
  if (skin == 'uncyclopedia' || skin == 'wowwiki' || skin == 'lostbook' || skin == 'monobook') {
    var context = $('h1#firstHeading');
    context.find('.inactive-user').remove();
    for (var i = 0, len = tags.length; i < len; i++) {
      $('  <span class="tag ' + (tags[i] == 'Inactive' ? 'inactive-user' : '') + '">[' + tags[i].toLowerCase() + ']</span>').appendTo(context);
    }
  } else {      // 'oasis' engine
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for (var i = 0, len = tags.length; i < len; i++) {
      $('<span class="tag' + (tags[i] == 'Inactive' ? ' inactive-user' : '') + '">' + tags[i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
};

// Startup
$(function () {
  var daysToInactive = 90;

  var user = wgTitle, userIndex = user.lastIndexOf('/'),
      namespace = wgNamespaceNumber, special = wgCanonicalSpecialPageName;

  // check is correct page namespace (user type pages) and probable user name
  if ([2, 3, 500, 501, 1200].indexOf(namespace) == -1 &&
      (['Contributions', 'Following'].indexOf(special) == -1 || userIndex == -1 ||
      (user = user.substring(userIndex + 1)).length == 0)) return;

  // Polyfill for ECMAScript 5 function (so it works in older browsers)
  if (!Date.prototype.toISOString) Date.prototype.toISOString = function () {
    function p(s) { return (s += '').length < 2 ? '0' + s : s; }
    return this.getUTCFullYear() + '-' + p(this.getUTCMonth() + 1) + '-' + p(this.getUTCDate()) +
    'T' + p(this.getUTCHours()) + ':' + p(this.getUTCMinutes()) + ':' + p(this.getUTCSeconds()) +
    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).substr(-3) + 'Z';
  };

  // Query server if user is inactive, then call UserTags to update page
  var apiUrl = wgScriptPath + '/api' + wgScriptExtension +  // mw.util.wikiScript('api') is only available in MW 1.19
    '?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
    '&ucuser=' + encodeURIComponent(user) + '&ucstart=' + wgNow.toISOString() +
    '&ucend=' + new Date(wgNow - daysToInactive * 86400000).toISOString();

  $.getJSON(apiUrl, function (result) {
    var query = result.query;
    wwUserTags(user, query && query.usercontribs && !query.usercontribs.length);
  });
});