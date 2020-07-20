if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
  var ug = wgUserGroups.join(' ');
  if(ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('vstf') + ug.indexOf('sysop') > -4) {
      $('#WikiaMainContent,#bodyContent').append('<a title="Block '+ wgUserName +'" class="wikia-button" href="/wiki/Special:Block/'+ wgUserName +'">Block</a>');
}