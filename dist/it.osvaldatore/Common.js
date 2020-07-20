/* 
This code is loaded on all skins.
*/
importArticle({
    type: "style",
    article:"MediaWiki:StaffHighlight.css"
});
importArticles({
    type: "script",
    articles: [
        "w:dev:ShowHide/code.js",
        "w:dev:LockOldBlogs/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:InactiveUsers/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:AutoEditDropdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditIntroButton/code.js"
    ]
});

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});
/* Sostituisce {{USERNAME}} col nome dell'utente che lo visualizza.
   Richiede il Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
/* End of the {{USERNAME}} replacement */

 /* Funzione copiata da http://nonciclopedia.wikia.com */
 var disablealertLoad = 0;
 function alertLoad() {
  if (disablealertLoad) return;
  for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
   if(Elem.getAttribute('id') == "alert-load") {
    var Testo = Elem.innerText || Elem.textContent;
    alert(Testo);
   }
  }
 }
 
 addOnloadHook(alertLoad)