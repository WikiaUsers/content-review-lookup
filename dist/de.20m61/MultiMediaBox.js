/* Versionskontrolle */
var Version = "MultiMediaBox Version 0.010";
var ChatBot_Version  = document.createElement("div");
    ChatBot_Version.appendChild(document.createTextNode("Version: "+Version)); 
document.getElementById("WikiaPageHeader").insertBefore(ChatBot_Version, document.getElementById("WikiaPageHeader").firstChild);

/* Hilfsfunktion:MMB_GetHeader - Header-Div auslesen oder erstellen, falls nicht vorhanden */
function MMB_GetHeader(MultiMediaBox) {
    var AnzahlTabs = 0;
    var AnzahlHeaderPositionen = 0;
    var MMB_Header = false; 
    for (var i=0; i<MultiMediaBox.childNodes.length; i++){
        if(MultiMediaBox.childNodes[i].nodeName == 'UL' 
        || MultiMediaBox.childNodes[i].nodeName == 'DIV'){
            if(MultiMediaBox.childNodes[i].classList.contains('MMB_Header')) {
                MMB_Header = MultiMediaBox.childNodes[i];
                for (j=0; j<MMB_Header.childNodes.length; j++) {
                    if(MMB_Header.childNodes[j].nodeName == 'LI'){
                        AnzahlHeaderPositionen ++;
                    }
                }
            }        
            if(MultiMediaBox.childNodes[i].classList.contains('MMB_Tab')){
                AnzahlTabs ++;
            }
        }
    }
    if(!MMB_Header){
        MMB_Header = document.createElement("ul");
        MMB_Header.className = "MMB_Header";
    }
    MultiMediaBox.insertBefore(MMB_Header, MultiMediaBox.childNodes[0]); //Navi an erste Stelle
    return {
        HeaderUL:           MMB_Header,
        AnzahlTabsInHeader: AnzahlHeaderPositionen,
        AnzahlTabs:         AnzahlTabs
    };  
}    

function ChangeTab(TabNummer, MultiMediaBoxObjekt) {
    var SuchTabNr = 0;
    for (var i=0; i < MultiMediaBoxObjekt.childNodes.length; i++) {
        if(MultiMediaBoxObjekt.childNodes[i].nodeName == 'UL' 
        || MultiMediaBoxObjekt.childNodes[i].nodeName == 'DIV'){
            if(MultiMediaBoxObjekt.childNodes[i].classList.contains('MMB_Header')){
                var SuchTabHeaderNr = 0;
                // Navigation zurücksetzen und nur bei SuchTabHeaderNr "aktiv" schreiben
                for (var n=0; n < MultiMediaBoxObjekt.childNodes[i].childNodes.length; n++) {
                    if(MultiMediaBoxObjekt.childNodes[i].childNodes[n].nodeName == "LI"){
                        MultiMediaBoxObjekt.childNodes[i].childNodes[n].classList.remove("aktiv");
                        if (SuchTabHeaderNr == TabNummer) {
                            MultiMediaBoxObjekt.childNodes[i].childNodes[n].classList.add("aktiv");
                        }
                        SuchTabHeaderNr ++;
                    }
                }
            }
            if(MultiMediaBoxObjekt.childNodes[i].classList.contains('MMB_Tab')){
                MultiMediaBoxObjekt.childNodes[i].classList.remove("aktiv");
                if (SuchTabNr == TabNummer) {
                    MultiMediaBoxObjekt.childNodes[i].classList.add('aktiv');
                }
                SuchTabNr ++;
            }
        }
    }
    return true;
}

MultiMediaBox = document.getElementById('mw-content-text').getElementsByTagName('div');
for (var k=0; k<MultiMediaBox.length; k++){
    if(MultiMediaBox[k].classList.contains('MultiMediaBox')){
        TabEigenschaft = MMB_GetHeader(MultiMediaBox[k]);
        for (h = TabEigenschaft.AnzahlTabsInHeader+1; h <= TabEigenschaft.AnzahlTabs; h++) {
            MMB_Header_LI = document.createElement("li");
            MMB_Header_LI.appendChild(document.createTextNode("Tab "+ h));
            TabEigenschaft.HeaderUL.appendChild(MMB_Header_LI);
        }
        VoreingestelltesTab = MultiMediaBox[k].getAttribute("data-Voreingestelltes-Tab");
        if(!VoreingestelltesTab) VoreingestelltesTab = 1;
        VoreingestelltesTab --;
        ChangeTab(VoreingestelltesTab, MultiMediaBox[k]);
        var NavigationsLI = TabEigenschaft.HeaderUL.getElementsByTagName('li');
        for (h=0; h < NavigationsLI.length; h++){
            NavigationsLI[h].onclick = (function(TNummer) {
                                        return function() {
                                                ChangeTab(TNummer, this.parentNode.parentNode);
                                               };
                                       })(h);
        }
    }
}

// INFO
/*
        //location.hash  // gibt bei http://de.20M61.wikia.com/wiki/Test?action=edit#Testsubjekt  "#Testsubjekt" aus
        //location.search // gibt bei  http://de.20M61.wikia.com/wiki/Test?action=edit#Testsubjekt  "?action=edit" aus

//Diese Funktion liest alle übergebenen Variablen aus und gibt diese in einem Objekt wieder
function Werteliste (querystring) {
  if (querystring == '') return;
  var wertestring = querystring.slice(1); // Übergeben wird eine URL als Array. Der Link wir abgeschnitten
  var paare = wertestring.split('&');
  var paar, name, wert;
  for (var i = 0; i < paare.length; i++) {
    paar = paare[i].split('=');
    name = paar[0];
    wert = paar[1];
    name = unescape(name).replace('+', ' ');
    wert = unescape(wert).replace('+', ' ');
    this[name] = wert;
  }
  var HTML_link = window.location + '';
  this['PageName'] = HTML_link.split('=')[0].split('/')[4].replace(/_/g, ' ').split('?')[0];
}
var HTMLAgument = new Werteliste(location.search); //Objekt HTMLArgument enthält alle übergebenen Variablen
*/