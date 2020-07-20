 var markadmins = true;           // Admins u.ä. besonders hervorheben?
 var marksubpages = false;        // auch Links auf Admin-Unterseiten markieren?
 var mawatchlist = true;          // auch auf der Beobachtungsliste?
 var macontribs = true;           // auch auf den Benutzerbeiträgen?

 var markatxt = "A";              // Markierung für Admins
 var markrenatxt = "A-Ren";       // Markierung für umbenannte Admins

 var markbureautxt = "B";         // Markierung für Bürokraten
 var markstewtxt = "S";           // Markierung für Stewards

 var markarbcom = true;           // zusätzlich: Schiedsgericht besonders hervorheben?
 var markarbcomtxt = "SG";        // Markierung für Schiedsgerichtler
 
 var markcheckuser = true;        // zusätzlich: CheckUser besonders hervorheben?
 var markcheckusertxt = "CU";     // Markierung für Checkuser-Berechtigte
 var markombudsmantxt = "Omb";    // Markierung für Ombudspersonen

 var markoversight = true;        // zusätzlich: Oversights besonders hervorheben?
 var markoversighttxt = "OS";     // Markierung für Oversight-Berechtigte
 
 // get URL parameters (used for page type variables)
 var UrlParameters = new Array ();
 readparams();
 
 function readparams() {
  var asReadInUrlParameters;
  var asReadInUrlParameter;
 
  // Get URL parameters
  asReadInUrlParameters = location.search.substring(1, location.search.length).split("&");
  for (i = 0; i < asReadInUrlParameters.length; i++) {
    asReadInUrlParameter = asReadInUrlParameters[i].split("=");
    UrlParameters[decodeURIComponent(asReadInUrlParameter[0])] = decodeURIComponent(asReadInUrlParameter[1]);
  }
 }
 
 // page type variables: namespace == -1
 var isSpecial   = (wgCanonicalNamespace == "Special");
 var isContrib   = (isSpecial && (wgTitle == "Contributions"));
 var isWatchlist = (isSpecial && (wgTitle == "Watchlist"));

 importScript("Benutzer:PDD/markAdmins.js"); // [[Benutzer:PDD/markAdmins.js]]