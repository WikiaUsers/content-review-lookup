users[".chromicsalt"] = ["Retired Staff"],
users["Clay Moorington"] = ["Retired Staff"],
users["CoinsCP"] = ["Retired Staff"],
users["CoolTeslo23"] = ["Retired Staff"],
users["CrystalWhiteTail"] = ["Retired Staff"],
users["D MixHel S"] = ["Retired Staff"],
users["Derek the Torchic"] = ["Retired Staff"],
users["Digipony"] = ["Retired Staff"],
users["Galadhanu"] = ["Retired Staff"],
users["Hyperealistic Gaben"] = ["Retired Staff"],
users["Lavaguy64"] = ["Retired Staff"],
users["MaeManuel1"] = ["Retired Staff"],
users["MasterofMixels"] = ["Retired Staff"],
users["MixedSerpent"] = ["Retired Staff"],
users["MixelsFloras"] = ["Retired Staff"],
users["Penguin-Pal"] = ["Retired Staff"],
users["SlushoSnack48"] = ["Retired Staff"],
users["Snoof is the best"] = ["Retired Staff"],
users["SpongebobAtnight"] = ["Retired Staff"],
users["The Golden Cubit"] = ["Retired Staff"],
users["ToaMatau2004"] = ["Retired Staff"],
users["Volectro"] = ["Retired Staff"];

// Startup
$(function () {
  var daysToInactive = 90;
 
  var user = wgTitle, userIndex = user.lastIndexOf('/'),
      namespace = wgNamespaceNumber, special = wgCanonicalSpecialPageName;

  if ([2, 3, 500, 501, 1200].indexOf(namespace) == -1 &&
      (['Contributions', 'Following'].indexOf(special) == -1 || userIndex == -1 ||
      (user = user.substring(userIndex + 1)).length === 0)) return;
 
  if (!Date.prototype.toISOString) Date.prototype.toISOString = function () {
    function p(s) { return (s += '').length < 2 ? '0' + s : s; }
    return this.getUTCFullYear() + '-' + p(this.getUTCMonth() + 1) + '-' + p(this.getUTCDate()) +
    'T' + p(this.getUTCHours()) + ':' + p(this.getUTCMinutes()) + ':' + p(this.getUTCSeconds()) +
    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).substr(-3) + 'Z';
  };
 
  var apiUrl = wgScriptPath + '/api' + wgScriptExtension +  // mw.util.wikiScript('api') is only available in MW 1.19
    '?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
    '&ucuser=' + encodeURIComponent(user) + '&ucstart=' + wgNow.toISOString() +
    '&ucend=' + new Date(wgNow - daysToInactive * 86400000).toISOString();
 
  $.getJSON(apiUrl, function (result) {
    var query = result.query;
    wwUserTags(user, query && query.usercontribs && !query.usercontribs.length);
  });
});