/* Disable redirect to MyHome (code by Ciencia Al Poder) */
if( skin == 'monaco' && wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome' && window.location.toString().indexOf('redirect=no') == -1 ) {
	window.location = wgServer + wgArticlePath.replace('$1',(window.wgMainpage||window.wgMainPageTitle));
}

function alterMyHomeLink(link) {
   if (link != null && link != undefined)
   {
      if (link.href.indexOf('/wiki/Special:MyHome') > -1)
      {
         link.href = link.href + "?redirect=no";
      }
   }
}

function replaceMyHomeLinks() {
   var MyHomeButtons;
   var MyHomeTab;
   var MyHomeWidget = document.getElementById("community-widget-action-button");
   alterMyHomeLink(MyHomeWidget);

   var myHomeDiv = document.getElementById("header_myhome");
   if(typeof myHomeDiv!="undefined") {
      var MyHomeHeader = document.getElementById("header_myhome").getElementsByTagName("a")[0];
      
      alterMyHomeLink(MyHomeHeader);

      if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome') {
//         MyHomeButtons = document.getElementById("myhome-feed-switch").getElementsByTagName("a")[0];
//         alterMyHomeLink(MyHomeButtons);
      }
      if (wgNamespaceNumber == 2 || wgNamespaceNumber == 3 || wgNamespaceNumber == 500 || wgCanonicalSpecialPageName == 'Contributions') {
         MyHomeTab = document.getElementById("user_masthead_tabs").getElementsByTagName("li")[0].getElementsByTagName("a")[0];
         alterMyHomeLink(MyHomeTab);
      }
   }
}

if (skin == 'monaco' && wgUserName != null) {
  addOnloadHook (replaceMyHomeLinks);
}