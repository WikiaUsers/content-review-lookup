/* Adds a link on userpages to Special:UserRights */
addOnloadHook(function() {
  if (wgTitle.indexOf("/") != -1 || document.title.indexOf("- History -") != -1)  //no subpages or history
     return;
  if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk") {
     var username = encodeURIComponent( wgTitle );
     addPortletLink("p-cactions", wgServer + "/wiki/Special:UserRights/" + username, "права участника", "ca-contrib", "Изменить права этого участника");
  }
});