   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);
18:23, November 24, 2019