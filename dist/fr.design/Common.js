/* N'importe quel JavaScript ici sera chargé pour n'importe quel utilisateur et pour chaque page accédée.

ATTENTION : Avant de modifier cette page, veuillez tester vos changements avec votre propre
monobook.js. Une erreur sur cette page peut faire bugger le site entier (et gêner l'ensemble des
visiteurs), même plusieurs heures après la modification !

NE PAS RETIRER CECI SINON : remplacement des signature, substitution des modèles, ... : 

IMPORT DE COMPATIBILITÉ WIKIPEDIA

<nowiki>

/*************************************************************/
/* Fonctions javascript : pallient les limites de javascript */
/* Surveiller : http://www.ecmascript.org/                   */
/*************************************************************/

/**
 * insertAfter : insérer un élément dans une page
 */
function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling); 
}

/**
 * getElementsByClass : rechercher les éléments de la page dont le paramètre "class" est celui recherché
 */
function getElementsByClass(searchClass, node, tag) {
  if (node == null) node = document;
  if (tag == null) tag = '*';
  return getElementsByClassName(node, tag, searchClass);
}

/**
 * Diverses fonctions manipulant les classes
 * Utilise des expressions régulières et un cache pour de meilleures perfs
 * isClass et whichClass depuis http://fr.wikibooks.org/w/index.php?title=MediaWiki:Common.js&oldid=140211
 * hasClass, addClass, removeClass et eregReplace depuis http://drupal.org.in/doc/misc/drupal.js.source.html
 */
function isClass(element, classe) {
    var s=" "+element.className+" ";
    return s.indexOf(" "+classe+" ")>=0;
}
 
function whichClass(element, classes) {
    var s=" "+element.className+" ";
    for(var i=0;i<classes.length;i++)
        if (s.indexOf(" "+classes[i]+" ")>=0) return i;
    return -1;
}
 
function hasClass(node, className) {
  if (node.className == className) {
    return true;
  }
  var reg = new RegExp('(^| )'+ className +'($| )')
  if (reg.test(node.className)) {
    return true;
  }
  return false;
}
 
function addClass(node, className) {
    if (hasClass(node, className)) {
        return false;
    }
    node.className += ' '+ className;
    return true;
}
 
function removeClass(node, className) {
  if (!hasClass(node, className)) {
    return false;
  }
  node.className = eregReplace('(^|\\s+)'+ className +'($|\\s+)', ' ', node.className);
  return true;
}

function eregReplace(search, replace, subject) {
    return subject.replace(new RegExp(search,'g'), replace);
}


/**
 * Récupère la valeur du cookie
 */
function getCookieVal(name) {
  var cookiePos = document.cookie.indexOf(name + "=");
  var cookieValue = false;
  if (cookiePos > -1) {
    cookiePos += name.length + 1;
    var endPos = document.cookie.indexOf(";", cookiePos);
    if (endPos > -1)
      cookieValue = document.cookie.substring(cookiePos, endPos);
    else
      cookieValue = document.cookie.substring(cookiePos);
  }
  return cookieValue;
}

/************************************************************************/
/* Fonctions générales mediawiki (pallient les limitations du logiciel) */
/* Surveiller : http://fr.wikipedia.org/skins-1.5/common/wikibits.js    */
/************************************************************************/

/*
 * Fonction générales de lancement de fonctions ou de script
 * DÉPRÉCIÉ : utiliser adOnloadHook simplement
 */
function addLoadEvent(func) {
  addOnloadHook(func);
}

/**
 * Insérer un JavaScript d'une page particulière, idée de Mickachu
 */
function loadJs(page) {
  document.write('<script type="text/javascript" src="' +
                 'http://fr.wikipedia.org/w/index.php?title=' + page +
                 '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/**
 * Projet JavaScript
 */
function obtenir(name) {
  if(name.indexOf('caractères/') != -1) loadJs('MediaWiki:JSScripts/' + name);
  else loadJs('MediaWiki:Gadget-' + name + '.js');
}


/**************************************/
/* Applications pour les lecteurs     */
/**************************************/

/* Devraient en principe se trouver côté serveur */

/*
 * Choix du mode d'affichage des références
 * @note L'ordre de cette liste doit correspondre a celui de Modèle:Édition !
 */

function addBibSubsetMenu() {
  var specialBib = document.getElementById('specialBib');
  if (!specialBib) return;

  specialBib.style.display = 'block';
  menu = '<select style="display:inline;" onChange="chooseBibSubset(selectedIndex)">'
   + '<option>Liste</option>'
   + '<option>WikiNorme</option>'
   + '<option>BibTeX</option>'
   + '<option>ISBD</option>'
   + '<option>ISO690</option>'
   + '</select>';
  specialBib.innerHTML = specialBib.innerHTML + menu;
  
  /* default subset - try to use a cookie some day */
  chooseBibSubset(0);
}

// select subsection of special characters
function chooseBibSubset(s) {
  var l = document.getElementsByTagName('div');
  for (var i = 0; i < l.length ; i++) {
    if(l[i].className == 'BibList')   l[i].style.display = s == 0 ? 'block' : 'none';
    else if(l[i].className == 'WikiNorme') l[i].style.display = s == 1 ? 'block' : 'none';
    else if(l[i].className == 'BibTeX')    l[i].style.display = s == 2 ? 'block' : 'none';
    else if(l[i].className == 'ISBD')      l[i].style.display = s == 3 ? 'block' : 'none';
    else if(l[i].className == 'ISO690')    l[i].style.display = s == 4 ? 'block' : 'none';
  }
}

addOnloadHook(addBibSubsetMenu);

/**
 * Modifie Special:Search pour pouvoir utiliser différents moteurs de recherche,
 * disponibles dans une boîte déroulante.
 * Auteurs : [[:en:User:Gracenotes]], importé de Wikipédia en anglais.
 * [[User:Zelda]] pour le stockage du moteur par cookie.
 */
 
if (wgPageName == "Special:Search") {
  var searchEngines = [];
  addOnloadHook(SpecialSearchEnhanced);
}
 
function SpecialSearchEnhanced() {
  var createOption = function(site, action, mainQ, addQ, addV) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(site));
    searchEngines[searchEngines.length] = [action, mainQ, addQ, addV];
    return opt;
  }
  var searchForm = document.forms['search'];
  var selectBox = document.createElement('select');
  selectBox.id = 'searchEngine';
  searchForm.onsubmit = function() {
    var optId = document.getElementById('searchEngine').selectedIndex;
    var optSelected = searchEngines[optId];
    searchForm.action = optSelected[0];
    searchForm.lsearchbox.name = optSelected[1];
    searchForm.title.value = optSelected[3];
    searchForm.title.name = optSelected[2];
    // stockage du moteur dans un cookie
    document.cookie = "searchEngineId=" + optId;
  }
  selectBox.appendChild(createOption('Recherche interne', wgScriptPath + '/index.php', 'search', 'title', 'Special:Search'));
  selectBox.appendChild(createOption('Exalead', 'http://www.exalead.com/wikipedia/results', 'q', 'language', 'fr'));
  selectBox.appendChild(createOption('Google', 'http://www.google.fr/search', 'q', 'sitesearch', 'fr.wikipedia.org'));
  selectBox.appendChild(createOption('Wikiwix', 'http://fr.wikiwix.com/', 'action', 'lang', 'fr'));
  selectBox.appendChild(createOption('Windows Live', 'http://search.live.com/results.aspx', 'q', 'q1', 'site:http://fr.wikipedia.org'));
  selectBox.appendChild(createOption('Yahoo', 'http://fr.search.yahoo.com/search', 'p', 'vs', 'fr.wikipedia.org'));
  // récupération du dernier moteur utilisé stocké dans un cookie
  var defaultId = getCookieVal("searchEngineId");
  if (defaultId) {
    selectBox.selectedIndex = defaultId;
  }
  searchForm.lsearchbox.style.marginLeft = '0px';
  var lStat = document.getElementById('loadStatus');
  lStat.parentNode.insertBefore(selectBox, lStat);
}

/**
 * Transformer les pages du Bistro en page de discussion
 */
function DiscussionBistro() {
  if(  (wgPageName.search('Wikipédia:Le_Bistro') != -1)
    || (wgPageName.search('Wikipédia:Bulletin_des_administrateurs') != -1))
    document.body.className = 'ns-1';
}

addOnloadHook(DiscussionBistro);

/**
 * Transformer certaines pages en page de discussion avec le modèle {{page de discussion}}
 */
function TransformeEnDiscussion() {
   var transformeEnPDD = document.getElementById("transformeEnPageDeDiscussion");
   if(transformeEnPDD) document.body.className = "ns-1";
}

addOnloadHook(TransformeEnDiscussion);

/**
 * Transformer certaines pages en pseudo-article
 * c'est raisonnable ? --Tavernier
 */
function TransformeEnArticle() {
   var transformeEnA = document.getElementById("transformeEnArticle");
   if(transformeEnA) document.body.className = "ns-0";
}

addOnloadHook(TransformeEnArticle);

/**
 * Afficher une explication au nombre de caractères dans la liste de suivi
 */
function toolTipPlusMinus() {
  var tt = "Nombre de caractères d'écart entre les deux dernières versions de la page";
  var elmts = document.getElementsByTagName("span");
  for(var cpt = 0; cpt < elmts.length; cpt++) {
    if (/mw-plusminus-(pos|neg|null)/.test(elmts[cpt].className) || /mw-plusminus-(pos|neg|null)/.test(elmts[cpt].getAttribute("class")))
      elmts[cpt].title = tt;
  }
}

addOnloadHook(toolTipPlusMinus);

/**
 * Utilisation du modèle Modèle:Images
 */
function toggleImage(group, remindex, shwindex) {
  document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}

function imageGroup(){
  if (document.URL.match(/printable/g)) return;
  var bc=document.getElementById("bodyContent");
  var divs=bc.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "ImageGroup") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "ImageGroupUnits") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="ImageGroupsGr"+i+"Im"+j;
      var imghead = document.createElement("div");
      var leftlink;
      var rightlink;
      if (j != 0) {
        leftlink = document.createElement("a");
        leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      } else {
        leftlink = document.createElement("span");
        leftlink.innerHTML="&nbsp;";
      }
      if (j != units.length - 1) {
        rightlink = document.createElement("a");
        rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
      } else {
        rightlink = document.createElement("span");
        rightlink.innerHTML="&nbsp;";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}

addOnloadHook(imageGroup);

/**
 * Ajout d'un style particulier aux liens interlangues vers un bon article ou
 * un article de qualité
 */
function lienAdQouBAouPdQ() {
  // links are only replaced in p-lang
  var pLang = document.getElementById("p-lang");
  if (!pLang) return;
  var lis = pLang.getElementsByTagName("li");
  for (var i=0; i<lis.length; i++) {
    var li = lis[i];
    // ADQ- est intentionnel pour correspondre au modèle Lien AdQ, on
    // ne doit pas le corriger.
    if (document.getElementById("ADQ-" + li.className)) {
      li.className += " AdQ";
      li.title = "Lien vers un article de qualité";
    } else if (document.getElementById("BA-" + li.className)) {
      li.className += " BA";
      li.title = "Lien vers un bon article";
    } else if (document.getElementById("PdQ-" + li.className)) {
      li.className += " AdQ";
      li.title = "Lien vers un portail de qualité";
    }
  }
}
addOnloadHook(lienAdQouBAouPdQ);

/**
 * Suppression du titre sur la page d'accueil, 
 * changement de l'onglet et lien vers la liste complète des Wikipédias depuis l'accueil
 */
function mainPageTransform(){
  if(wgPageName != 'Accueil' && wgPageName != 'Discuter:Accueil') return;
  try {
    document.getElementById('ca-nstab-main').firstChild.innerHTML = 'Accueil';
  } catch (e) { /* Erreur : l'apparence ne gère la pas les onglets */ }
  if(wgPageName == 'Accueil' && wgIsArticle) addPortletLink('p-lang', 'http://meta.wikimedia.org/wiki/Liste_des_Wikipédias', '+');
}

addOnloadHook(mainPageTransform);

/**
 * Liens d'aide des pages spéciales
 *
 * permet d'ajouter un petit lien (par exemple d'aide) à la fin du titre d'une page.
 * known bug : conflit avec le changement de titre classique.
 * Pour les commentaires, merci de contacter [[user:Plyd|Plyd]].
 */
function rewritePageH1bis() {
  try {
    var helpPage = document.getElementById("helpPage");
    if (helpPage) {
      var helpPageURL = document.getElementById("helpPageURL");
      var h1 = document.getElementsByTagName("h1")[0];
      if (helpPageURL && h1) {
        h1.innerHTML = h1.innerHTML + '<span id="h1-helpPage">' + helpPageURL.innerHTML + '</span>';
        helpPage.style.display = "none";
      }
    }
  } catch (e) {
    /* Something went wrong. */
  }
}

addOnloadHook(rewritePageH1bis);

/**
 * Redirect vers wikibooks etc.
 *
 */
var redirectedFromArticleDatas = new Array(
   new Array('Wikipédia:Redirect_vers_Wikibooks', 'wikibooks'),
   new Array('Wikipédia:Redirect_vers_Wikisource', 'wikisource'),
   new Array('Wikipédia:Redirect_vers_Wikiversité', 'wikiversity'),
   new Array('Wikipédia:Redirect_vers_Wikiquote', 'wikiquote'),
   new Array('Wikipédia:Redirect_vers_Wikinews', 'wikinews'),
   new Array('Wikipédia:Redirect_vers_Wiktionnaire', 'wiktionary')
);

function redirectedFromArticle() {
   if (wgIsArticle == false)
       return;
   for (var i = 0; i < redirectedFromArticleDatas.length; ++i) {
     var page_match = redirectedFromArticleDatas[i];
     var index = wgPageName.indexOf(page_match[0]);
     if (index == 0) {
        var div = document.getElementById('contentSub');
        var span = document.getElementById('redirected_from');
        // real target is always encoded in the anchor.
        target = window.location.hash;
        if (!div || !span || target == '')
            break;

        target = target.slice(1);
        // Konqueror 3.5 work around
        if (target.indexOf('#') == 0)
            target = target.slice(1);
        target = target.split('.23');
        target[0] = target[0].replace(/\.([0-9A-Z][0-9A-Z])/g, '%$1');
        var quoted = target[0]
        if (target[1].length)
            quoted += '#' + target[1]
        quoted = quoted.replace(/%2F/g, '/');
        var display = target[2]
        display = display.replace(/\.([0-9A-Z][0-9A-Z])/g, '%$1');
        display = decodeURI(display);
        display = display.replace(/_/g, ' ');

        var e = document.createElement('A');
        e.href = 'http://fr.' + page_match[1] + '.org/wiki/' + quoted;
        e.innerHTML = display;
        span.replaceChild(e, span.firstChild);
        break;
     }
   }
}

addOnloadHook(redirectedFromArticle);

/* En phase de test */
/* DÉBUT DU CODE JAVASCRIPT DE "CADRE À ONGLETS"
    Fonctionnement du [[Modèle:Cadre à onglets]]
    Modèle implanté par User:Peleguer de http://ca.wikipedia.org
    Actualisé par User:Joanjoc de http://ca.wikipedia.org
    Traduction et adaptation User:Antaya de http://fr.wikipedia.org
*/
function CadreOngletInit(){
  //alert("CadreOngletInit");
 
  var i=0       
  for (i=0;i<=9;i++){
     var vMb = document.getElementById("mb"+i);
     if (!vMb) break;
 
     var j=1    
     var vOgIni = 0  
     for (j=1;j<=9;j++){
        var vBt = document.getElementById("mb"+i+"bt"+j);
        if (!vBt) break;
        vBt.onclick = CadreOngletVoirOnglet;          
        if (vBt.className=="mbBoutonSel") vOgIni=j;  
     }

     if (vOgIni == 0) { 
         vOgIni = 1+Math.floor((j-1)*Math.random()) ;
         document.getElementById("mb"+i+"og"+vOgIni).style.display = "block";
         document.getElementById("mb"+i+"og"+vOgIni).style.visibility = "visible";
         document.getElementById("mb"+i+"bt"+vOgIni).className="mbBoutonSel";
     } 
  }
 }
 
 function CadreOngletVoirOnglet(){
  var vMbNom = this.id.substr(0,3); 
  var vIndex = this.id.substr(5,1); 
 
  var i=1
  for (i=1;i<=9;i++){        
        var vOgElem = document.getElementById(vMbNom+"og"+i);
        if (!vOgElem) break;
        if (vIndex==i){ 
                vOgElem.style.display = "block";
                vOgElem.style.visibility = "visible";
                document.getElementById(vMbNom+"bt"+i).className="mbBoutonSel";
        } else {             
                vOgElem.style.display = "none";
                vOgElem.style.visibility = "hidden";
                document.getElementById(vMbNom+"bt"+i).className="mbBouton";
        }
  }
  return false; 
 }
 
 addOnloadHook(CadreOngletInit);
 
/*FIN DU CODE JAVASCRIPT DE "CADRE À ONGLETS"*/

/** 
 * Boîtes déroulantes
 *
 * Pour [[Modèle:Méta palette de navigation]]
 */

var autoCollapse = 2;
var collapseCaption = '[ Enrouler ]';
var expandCaption = '[ Dérouler ]';

function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );
  if ( !Table || !Button ) return false;

  var Rows = Table.getElementsByTagName( "tr" ); 

  if ( Button.firstChild.data == collapseCaption ) {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = "none";
    }
    Button.firstChild.data = expandCaption;
  } else {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = Rows[0].style.display;
    }
    Button.firstChild.data = collapseCaption;
  }
}

function createCollapseButtons() {
  var tableIndex = 0;
  var NavigationBoxes = new Object();
  var Tables = document.getElementsByTagName( "table" );

  for ( var i = 0; i < Tables.length; i++ ) {
    if ( hasClass( Tables[i], "collapsible" ) ) {
      NavigationBoxes[ tableIndex ] = Tables[i];
      Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

      var Button     = document.createElement( "span" );
      var ButtonLink = document.createElement( "a" );
      var ButtonText = document.createTextNode( collapseCaption );

      Button.style.styleFloat = "right";
      Button.style.cssFloat = "right";
      Button.style.fontWeight = "normal";
      Button.style.textAlign = "right";
      Button.style.width = "6em";

      ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
      ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
      ButtonLink.appendChild( ButtonText );

      Button.appendChild( ButtonLink );

      var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
      /* only add button and increment count if there is a header row to work with */
      if (Header) {
        Header.insertBefore( Button, Header.childNodes[0] );
        tableIndex++;
      }
    }
  }

  for (var i = 0; i < tableIndex; i++) {
    if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) collapseTable( i );
  }
}

addOnloadHook(createCollapseButtons);

/**
 * Pour [[Modèle:Boîte déroulante]] 
 */
var NavigationBarShowDefault = 0;

function toggleNavigationBar(indexNavigationBar) {
  var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
  var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

  if (!NavFrame || !NavToggle) return;

  // ajout par Dake - permet de créer un titre en lieu et place du "Dérouler" grâce
  // à l'attribut "title" du tag.
  var ShowText;

  if (NavFrame.title == undefined || NavFrame.title.length == 0 ) {
    ShowText = expandCaption;
  } else {
    ShowText = NavFrame.title;
  }

  // if shown now
  if (NavToggle.firstChild.data == collapseCaption) {
    for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
      if (hasClass(NavChild, 'NavPic')) NavChild.style.display = 'none';
      if (hasClass(NavChild, 'NavContent')) NavChild.style.display = 'none';
      if (hasClass(NavChild, 'NavToggle')) NavChild.firstChild.data = ShowText;
    }

  // if hidden now
  } else if (NavToggle.firstChild.data == ShowText) {
    for ( var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
      if (hasClass(NavChild, 'NavPic')) NavChild.style.display = 'block';
      if (hasClass(NavChild, 'NavContent')) NavChild.style.display = 'block';
      if (hasClass(NavChild, 'NavToggle')) NavChild.firstChild.data = collapseCaption;
    }
  }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
  var indexNavigationBar = 0;
  var NavFrame;
  // iterate over all < div >-elements
  for( var i=0; NavFrame = document.getElementsByTagName("div")[i]; i++ ) {
    // if found a navigation bar
    if (hasClass(NavFrame, "NavFrame")) {
      indexNavigationBar++;
      var NavToggle = document.createElement("a");
      NavToggle.className = 'NavToggle';
      NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
      NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

      var NavToggleText = document.createTextNode(collapseCaption);
      NavToggle.appendChild(NavToggleText);

      // add NavToggle-Button as first div-element 
      // in <div class="NavFrame">
      NavFrame.insertBefore( NavToggle, NavFrame.firstChild );
      NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
    }
  }
  // if more Navigation Bars found than Default: hide all
  if (NavigationBarShowDefault < indexNavigationBar) {
    for( var i=1; i<=indexNavigationBar; i++ ) {
      toggleNavigationBar(i);
    }
  }
}

addOnloadHook(createNavigationBarToggleButton);

/**
 * Compteur de consultation d'articles
 *
 * Please talk to User:LeonWeber before changing anything or 
 * if there are any issues with that.
 * this should be adjusted to a good value.
 * BE CAREFULL, you will break zedler if it's too low!
 * And then DaB. will kill Leon :-( 
 */

var disable_counter = 0;
var counter_factor = 900; 

function pgcounterSetup() {
  if(disable_counter == 0) {
    var url = window.location.href;
    if(Math.floor(Math.random()*counter_factor)==42) { // the probability thing
      if(wgIsArticle==true) { // do not count history pages etc.
        var pgcountNs = wgCanonicalNamespace;
        if(wgCanonicalNamespace=="") pgcountNs = "0";
        var cnt_url = "http://pgcount.wikimedia.de/index.png?ns=" + pgcountNs + "&title=" + encodeURI(wgTitle) + "&factor=" + counter_factor + "&wiki=frwiki";
        var img = new Image(); 
        img.src = cnt_url;
      }
    }
  }
}

addOnloadHook(pgcounterSetup);

/**
 * Réécriture des titres
 *
 * Fonction utilisée par [[Modèle:Titre incorrect]]
 * 
 * La fonction cherche un bandeau de la forme
 * <div id="RealTitleBanner">
 *   <span id="RealTitle">titre</span>
 * </div>
 *
 * Un élément comportant id="DisableRealTitle" désactive la fonction
 */
function rewritePageH1() {
  var realTitleBanner = document.getElementById('RealTitleBanner');
  if (realTitleBanner) {
    if (!document.getElementById('DisableRealTitle')) {
      var realTitle = document.getElementById('RealTitle');
      var h1 = document.getElementsByTagName('h1')[0];
      if (realTitle && h1) {
        var titleText = realTitle.innerHTML;
        if (titleText == '') h1.style.display = 'none';
        else h1.innerHTML = titleText;
        realTitleBanner.style.display = 'none';
      }
    }
  }
}

addOnloadHook(rewritePageH1);

/**
 * WikiMiniAtlas
 *
 * voir WP:WMA 
 */
document.write('<script type="text/javascript" src="' 
     + 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
     + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');

var wma_settings = { 
  buttonImage: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Geographylogo.svg/18px-Geographylogo.svg.png'
}

/**
 * Icônes de titre
 * 
 * Cherche les icônes de titre (class="icone de titre") et les
 * déplace à droite du titre de la page.
 * Doit être exécuté après une éventuelle correction de titre.
 */
function IconesDeTitre() {
  var h1 = document.getElementsByTagName("h1")[0];
  var icones = document.getElementsByTagName("div");
  var icones2 = new Array();
  var j = 0;
  for (var i = 0; i < icones.length; ++i) {
    if (icones[i].className == "icone de titre") {
      icones2[j++] = icones[i];
    }
  }
  for (; j > 0; --j) {
    icones2[j-1].style.display = "block"; /* annule display:none par défaut */
    icones2[j-1].style.borderWidth = "1px";
    icones2[j-1].style.borderStyle = "solid";
    icones2[j-1].style.borderColor = "white";
    h1.insertBefore(icones2[j-1], h1.firstChild); /* déplacement de l'élément */
  }
}

addOnloadHook(IconesDeTitre);

/**
 * Déplacement de coordonnées qui apparaissent en haut de la page 
 */
function moveCoord() {
  var h1 = document.getElementsByTagName("h1")[0];
  var coord = document.getElementById('coordinates');
  if ( !coord || !h1 ) return;
  coord.id = "coordinates-title";
  h1.insertBefore(coord, h1.firstChild);
}

addOnloadHook(moveCoord);

/**
 * Déplacement des [modifier]
 *
 * Correction des titres qui s'affichent mal en raison de limitations dues à MediaWiki.
 *
 * Copyright 2006, Marc Mongenet. Licence GPL et GFDL.
 *
 * The function looks for <span class="editsection">, and move them
 * at the end of their parent and display them inline in small font.
 * var oldEditsectionLinks=true disables the function.
 */
function setModifySectionStyle() {
  try {
    if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
    var spans = document.getElementsByTagName("span");
    for (var s = 0; s < spans.length; ++s) {
      var span = spans[s];
      if (span.className == "editsection") {
        span.style.fontSize = "xx-small";
        span.style.fontWeight = "normal";
        span.style.cssFloat = span.style.styleFloat = "none";
        span.parentNode.appendChild(document.createTextNode(" "));
        span.parentNode.appendChild(span);
      }
    }
  } catch (e) { /* something went wrong */ }
}

addOnloadHook(setModifySectionStyle);

/**
 * Cache cadres de l'accueil
 *
 * Ajoute un lien sur la page d'accueil pour cacher facilement les cadres
 * Mémorisé par cookie.
 * Copyright 2007, fr:user:Plyd et fr:User:IAlex. Licence GFDL et GPL.
 */
var cookieCacheCadresName = "cacheCadresAccueil";
var CacheCadresVal = {};
var totalCadresAccueil = 0;

function affCadreAccueil(id) {
  visible = CacheCadresVal[id] = (!CacheCadresVal[id]);
  getElementsByClass('accueil_contenu',null,'div')[id].style.display = visible ? 'block' : 'none';
  document.getElementById('CacheCadreAccueil' + id).innerHTML = visible ? 'masquer' : 'afficher';
  sauverCookieAccueil();
}

function sauverCookieAccueil() {
  var date = new Date();
  date.setTime(date.getTime() + 30*86400*1000);
  var val = 0;
  for ( var i=0; i< totalCadresAccueil ; i++ ) {
    if (!CacheCadresVal[i]) val = val | Math.pow(2,i);
  }
  document.cookie = cookieCacheCadresName + "=" + val + "; expires="+date.toGMTString() + "; path=/";
}

function LiensCadresAccueil() {
  if (wgPageName != "Accueil") return;
  cookieCadresAccueil = getCookieVal(cookieCacheCadresName);
  for ( var i=0; i<5; i++) { 
    var titre = getElementsByClass('headergris',document,'h2')[i];
    if (!titre) break;
    titre.innerHTML += " <span style='font-size: xx-small; font-weight: normal; float: none; margin-right:100px' class='editsection'>[<a id='CacheCadreAccueil" + i + "' href='javascript:affCadreAccueil(" + i + ");'>masquer</a>]</span>";
    CacheCadresVal[i] = true;
    totalCadresAccueil++;
  }
  cookieCadresAccueil = getCookieVal(cookieCacheCadresName);
  for ( var i=0; i< totalCadresAccueil ; i++ ) {
    n =Math.pow(2,i);
    aff = !(cookieCadresAccueil & n);
    if (!aff) affCadreAccueil(i);
  }
}
addOnloadHook(LiensCadresAccueil);

/**
 * Déplace les liens portails vers la boite de catégorie
 * 
 * Copyright 2007, fr:user:Aoineko. Licence GFDL et GPL.
 */
var gUseMovePortalToCategoryBox = 1;

function movePortalToCategoryBox() {
   if(!gUseMovePortalToCategoryBox)
      return;

   // search for portails
   var div_portal = document.getElementById('portallinks');
   if(div_portal && (div_portal.className == 'movable')) {
      div_portal.style.display = 'none'; // hide the portail div
      var div_cat = document.getElementById('catlinks'); // get cat div
      if(!div_cat) { // no category box ? then create it
         var div_foot;
         var divs = document.getElementsByTagName('div');
         for(var i = 0; i < divs.length ; i++)
            if(divs[i].className == 'printfooter')
               div_foot = divs[i];
         div_cat = document.createElement("div");
         div_cat.setAttribute('id', 'catlinks');
         div_foot.parentNode.insertBefore(div_cat, div_foot); 
      }
      div_cat.innerHTML = div_portal.innerHTML + '<hr/>' + div_cat.innerHTML;
   }
}

addOnloadHook(movePortalToCategoryBox);


/*************************************/
/* Applications pour les rédacteurs  */
/*************************************/

/* todo : migrer celles qui ne sont pas vitales dans les gadgets */

/**
 * Fonctions de remplissage automatique
 */
function InitPaS(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Initialiser PàS|" + page_name + "|~~~~|jour={{subst:CURRENTDAY}}|mois={{subst:CURRENTMONTH}}}}\n" +
         "<!-- N'oubliez pas d'ajouter le lien vers cette page dans la page principale des Pages à supprimer -->";
}

function InitLANN(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Initialiser LANN|" + page_name + "|~~~~}}\n" +
         "<!-- N'oubliez pas d'ajouter le lien vers cette page dans la page principale des articles non neutres -->";
}

function InitIaS(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Préchargement Image à Supprimer|" + page_name + "|~~~~|jour={{subst:CURRENTDAY}}|mois={{subst:CURRENTMONTH}}}}\n" +
         "<!-- N'oubliez pas d'ajouter le lien vers cette page dans la page principale des Images à supprimer -->";
}

function InitPAdQ(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n\n" +
         "{{subst:Initialiser PAdQ|" + page_name + "|~~~~|jour={{subst:CURRENTDAY}}|mois={{subst:CURRENTMONTH}}}}";
}

function InitIaA(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Amélioration image}}";
}

function InitPCP(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Initialiser PCP|" + page_name + "|~~~~}}\n" +
         "<!-- N'oubliez pas d'ajouter le lien vers cette page dans la page principale des\n" +
         "     articles soupçonnées de violation de copyright -->";
}

function InitArbReq(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "{{subst:Wikipédia:Comité d'arbitrage/Arbitrage/Modèle}}\n" +
         "<!-- N'oubliez pas d'ajouter un lien vers cette page sur [[Wikipédia:Comité d'arbitrage/Arbitrage]] -->";
}

function InitDiscArbReq(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser -->\n" +
         "{{subst:Discussion Wikipédia:Comité d'arbitrage/Arbitrage/Modèle}}";
}

function InitCdl(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n" +
         "<!-- N'oubliez pas d'ajouter le lien vers cette page dans la page principale du comité de lecture -->\n\n" +
         "<noinclude>{{subst:Initialiser Comité de lecture2}}</noinclude>\n" +
         "{{subst:Initialiser Comité de lecture|" + page_name + "|~~~~}}";
}

function InitProjetTraduction(page_name) {
  var mustSkip=wgPageName.indexOf('Projet:Traduction/*/');
  if (mustSkip == -1) {
    return "{{subst:Initialiser la page de traduction|{{subst:SUBPAGENAME}}|~~~~|\n" +
           "<!--  À la création de la page, suivez les consignes ci-dessous pour proposer l'article.    \n" +
           "      ATTENTION : Veuillez ne rien effacer !                                             -->\n" +
           "1. Indiquez ci-dessous la langue de l'article à traduire (ex: en de es it pt...)\n" +
           "|en|\n" +
           "2. Indiquez ci-dessous le nom de l'article original (ex: Frankreich)\n" +
           "|Nom original ici| \n" +
           "3. Indiquez ci-dessous en une phrase l'intérêt de la traduction\n" +
           "|article très bien|\n" +
           "4. Ajoutez éventuellement un court commentaire \n" +
           "|commentaire très intéressant ici|\n" +
           "| 5. C'est fini, vous pouvez désormais sauvegarder cette page.\n" +
           "}}"; 
  } else {
    return "";
  }
}

function InitPBA(page_name) {
  return "<!-- Sauvegarder la page pour l'initialiser puis suivre les instructions -->\n\n" +
         "{{subst:Initialiser PBA|" + page_name + "|~~~~|jour={{subst:CURRENTDAY}}|mois={{subst:CURRENTMONTH}}}}";
}

var init_if_empty = new Array(
   new Array('Wikipédia:Pages_à_supprimer/', InitPaS),
   new Array('Wikipédia:Liste_des_articles_non_neutres/', InitLANN),
   new Array('Wikipédia:Images_à_supprimer/', InitIaS),
   new Array('Wikipédia:Proposition_articles_de_qualité/', InitPAdQ),
   new Array('Wikipédia:Pages_soupçonnées_de_violation_de_copyright/', InitPCP),
   new Array('Discussion_Wikipédia:Comité_d\'arbitrage/Arbitrage/', InitDiscArbReq),
   new Array('Wikipédia:Comité_d\'arbitrage/Arbitrage/', InitArbReq),
   new Array('Wikipédia:Comité_de_lecture/', InitCdl),
   new Array('Projet:Traduction/', InitProjetTraduction),
   new Array('Wikipédia:Proposition_bons_articles/', InitPBA)
);

/**
 * Remplit la zone d'édition si elle est vide avec le texte retourné par
 * un pointeur de fonction sélectionné par le nom de la page.
 */
function InitPage() {
  // Tester si editform et wpTextbox1 existe sinon il y a une erreur lorsqu'on
  // ouvre l'historique d'une page qui match un des noms de init_if_empty[],
  // tester seulement le nom de la page n'est pas suffisant.
  if (document.editform == undefined || document.editform.wpTextbox1 == undefined) return;
  var text_area = document.editform.wpTextbox1;
  if (text_area.value.length != 0) return;
  for (var i = 0; i < init_if_empty.length; ++i) {
    var page_match = init_if_empty[i][0];
    var index = wgPageName.indexOf(page_match);
    if (index != -1) {
      page_name = wgPageName.slice(page_match.length);
      page_name = page_name.replace(/_/g, ' ');
      text_area.value = init_if_empty[i][1](page_name);
      break;
    }
  }
}

addOnloadHook(InitPage);

/**
 * Caractères spéciaux
 *
 * Ajouter un menu pour choisir des sous-ensembles de caractères spéciaux.
 * Ecrit par Zelda, voir sur [[Utilisateur:Zelda/Edittools.js]].
 * Remplace l'ancienne fonction par une variante plus rapide.
 */

/**
 * Ajoute un menu déroulant permettant de choisir un jeu de caractères spéciaux
 * Les caractères spéciaux sont définis dans Mediawiki:Edittools
 */
function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialcharsets');
  if (!specialchars) return;

  // Construction du menu de selection
  var charSubsetSelect = document.createElement("select");
  charSubsetSelect.setAttribute("style", "display:inline");
  charSubsetSelect.onchange = function () { chooseCharSubset(this.selectedIndex); };

  // Ajout des options au menu
  var p = document.getElementById('specialcharsets').getElementsByTagName('p');
  for (var i = 0; i < p.length ; i++) {
    var opt = document.createElement("option");
    var txt = document.createTextNode(p[i].title);
    opt.appendChild(txt);
    charSubsetSelect.appendChild(opt);
  }

  specialchars.insertBefore(charSubsetSelect, specialchars.childNodes[0]);

  /* default subset - try to use a cookie some day */
  chooseCharSubset(0);
}

/**
 * Affichage du jeu de caractères sélectionné
 */
function chooseCharSubset(index) {
  var p = document.getElementById('specialcharsets').getElementsByTagName('p');
  for (var i = 0; i < p.length ; i++) {
    // Initialisation du jeu de caractères sélectionné
    if (i == index) {
    	initializeCharSubset(p[i]);
    }
    // Affichage du jeu sélectionné, masquage des autres
    p[i].style.display = i == index ? 'inline' : 'none';
    p[i].style.visibility = i == index ? 'visible' : 'hidden';
  }
}

/**
 * Initialisation du jeu de caractères sélectionné
 * Paramètre : paragraphe contenant le jeu à initialiser. Initialise tous les
 * caractères contenus dans les sous-spans du paragraphe
 */
function initializeCharSubset(p) {
  // recherche des sous-elements de type span à traiter
  var spans = p.getElementsByTagName("span");
  if (!spans) return;

  // regexp pour echapper les caractères JS spéciaux : \ et '
  var re = new RegExp("(\\\\|')", "g");
  // gestion du caractère d'échappement '\'
  var escapeRe = new RegExp("[^\\\\](\\\\\\\\)*\\\\$", "g");
  var unescapeRe = new RegExp("\\\\\\\\", "g");

  // traitement des spans du paragraphe
  for (var j = 0; j < spans.length; j++) {
    // span deja traité
    if (spans[j].childNodes.length == 0 || spans[j].childNodes[0].nodeType != 3) continue;

    // On parse le contenu du span
    var chars = spans[j].childNodes[0].nodeValue.split(" ");
    for (var k = 0; k < chars.length; k++) {
      var a = document.createElement("a");
      var tags = chars[k];

      // regroupement des mots se terminant par un espace protégé par un \
      while (k < chars.length && chars[k].match(escapeRe)) {
      	k++;
	tags = tags.substr(0, tags.length - 1) + " " + chars[k];
      }

      // création du lien insertTag(tagBegin, tagEnd, defaultValue) en protegeant les caractères JS \ et '
      tags = (tags.replace(unescapeRe, "\\")).split("+");
      var tagBegin = tags[0].replace(re, "\\$1");
      var tagEnd = tags.length > 1 ? tags[1].replace(re, "\\$1") : "";
      var defaultValue = tags.length > 2 ? tags[2].replace(re, "\\$1") : "";
      a.href = "javascript:insertTags('" + tagBegin + "','" + tagEnd + "', '" + defaultValue + "')";
      //a.href="#";
      //eval("a.onclick = function() { insertTags('" + tagBegin + "','" + tagEnd + "', '" + defaultValue + "'); return false; }");

      a.appendChild(document.createTextNode((tagBegin + tagEnd).replace(unescapeRe, "\\")));
      spans[j].appendChild(a);
      spans[j].appendChild(document.createTextNode(" "));
    }
    // suppression de l'ancien contenu
    spans[j].removeChild(spans[j].firstChild);
  }
}

addOnloadHook(addCharSubsetMenu);

/**
 * Permet d'ajouter d'un jeu de caractères spéciaux dans le menu déroulant
 * paramètres :
 * - nom du jeu de caractères
 * - contenu HTML. Les caractères spéciaux doivent être dans des spans
 *   exemple : "caractères : <span>â ê î ô û</span>"
 */
function addSpecialCharsetHTML(title, charsHTML) {
  var specialchars = document.getElementById('specialcharsets');
  if (!specialchars) return;

  // Ajout des caractères spéciaux. Les liens seront initialisé par initializeCharSubset()
  // lors de la sélection
  var specialcharsets = document.getElementById('specialcharsets');
  var p = document.createElement("p");
  p.style.display = "none";
  p.title = title;
  p.innerHTML = charsHTML;
  specialcharsets.appendChild(p);
}

/**
 * Permet d'ajouter d'un jeu de caractères spéciaux dans le menu déroulant
 * paramètres :
 * - nom du jeu de caractères
 * - caractères spéciaux
 * exemple d'utilisation : addSpecialCharset("Français", "â ê î ô û");
 */
function addSpecialCharset(title, chars) {
  addSpecialCharsetHTML(title, "<span>" + chars + "</span>");
}

/**
 * Générateur de tableaux
 * English: Generate an array using Mediawiki syntax
 *
 * @author: fr:user:dake
 * @version: 0.2
 */

function generateTableau(nbCol, nbRow, styleHeader, styleLine) {
  var code = "\n{| " +
    ((styleHeader==1) ? 'class="wikitable"' : '')+
    '\n|+ Titre du tableau\n';
     
  for (var i=0; i<nbCol; i++) code += '! en-tête ' + i + '\n';
     
  for (var j=0; j<nbRow; j++) {
    if ((j+1)%2==0 && styleLine==1) {
      code += '|-{'+'{ligne grise}'+'}\n';
    } else {             
      code += '|-----\n';
    }
           
    for (var i=0; i<nbCol; i++) code += '| élément\n';
  }
     
  code += '|}';
  insertTags('','', code);
}

/**
 * English: Open a popup with parameters to generate an array. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */

function popupTableau() {
  var popup = window.open('','name','height=400,width=500');
  
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); ';
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); ';
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; ';
  javaCode += 'var styleLine = document.paramForm.inputLine.checked; ';
  javaCode += 'window.opener.generateTableau(col,row,styleHeader,styleLine); ';
  javaCode += '}<\/script>';
  
  popup.document.write('<html><head><title>Paramètres du tableau</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Veuillez entrer les paramètres du tableau : </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Nombre de lignes : <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Nombre de colonnes : <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('Mise en forme (wikitable) : <input type="checkbox" name="inputHeader" checked="1" ><p>');
  popup.document.write('Lignes grises alternées : <input type="checkbox" name="inputLine" checked="0" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()"> Insérer le code dans la fenêtre d\'édition</a></p>');
  popup.document.write('<p><a href="javascript:self.close()"> Fermer</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

/**
 * Insertion de nouveaux boutons dans la barre d'outil
 */

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
  mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
}

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png',
                'Tableau',
                '{|\n|-\n|\n|\n|}',
                '',
                '',
                'mw-editbutton-array');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
                'Rayer',
                '<s>',
                '</s>',
                '',
                'mw-editbutton-strike');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png',
                'Énumération',
                '\n# élément 1\n# élément 2\n# élément 3',
                '',
                '',
                'mw-editbutton-enum');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png',
                'Liste',
                '\n* élément A\n* élément B\n* élément C',
                '',
                '',
                'mw-editbutton-liste');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png',
                'Galerie d\'images',
                '\n<gallery>\nImage:Exemple.jpg|[[Tournesol]]\nImage:Exemple1.jpg|[[La Joconde]]\nImage:Exemple2.jpg|Un [[hamster]]\n</gallery>',
                '',
                '',
                'mw-editbutton-gallery');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/37/Btn_toolbar_commentaire.png',
                'Commentaire',
                '<!--',
                '-->',
                '',
                'mw-editbutton-comment');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
                'Redirection',
                '#REDIRECT [[',
                ']]',
                'nom de la destination',
                'mw-editbutton-redir');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
                'Catégorie',
                '[[Catégorie:',
                ']]',
                'nom de la catégorie',
                'mw-editbutton-category');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png',
                'Modèle',
                '{{',
                '}}',
                'modèle ou page à inclure',
                'mw-editbutton-template');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png',
                'Référence',
                '<ref>',
                '</ref>',
                'référence, citation ou lien',
                'mw-editbutton-ref');

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/6/64/Buttonrefvs8.png',
                'Index des références',
                '== Notes et références ==\n<references /> <!-- aide : http://fr.wikipedia.org/wiki/Aide:Notes et références -->',
                '',
                '',
                'mw-editbutton-references');

var voirAussi = '<!-- Suggestion de présentation des annexes. Aide : http://fr.wikipedia.org/wiki/Aide:Notes et références -->\n'
 + '== Notes et références de l\'article ==\n'
 + '<references/>\n'
 + '== Voir aussi ==\n'
 + '=== Articles connexes ===\n'
 + '* [[À remplacer]]\n'
 + '*\n'
 + '=== Liens et documents externes ===\n'
 + '*\n';
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/bb/Seealso.png',
                'Section Voir aussi',
                voirAussi,
                '',
                '',
                'mw-editbutton-voiraussi');

/**
 * Changer le lien du bouton de création de tableau et supprime le bouton signature sur les articles
 */
function changButtons() {
  toolbarArray = document.getElementById('mw-editbutton-array');
  if (toolbarArray) {
    toolbarArray.onclick = function() {
      popupTableau();
      return false;
    }
  }

  var btnSigImg = document.getElementById('mw-editbutton-signature');
  if (btnSigImg && wgNamespaceNumber == 0) btnSigImg.style.display = "none";
}
addOnloadHook(changButtons);


/**
 * Désactiver le bouton Sauvegarder à la première édition
 * English : Force IP to preview before saving changes.
 * Copyright Marc Mongenet, 2006
 * Plyd 05/2007: add "after preview" in the button to prevent misunderstanding from beginners
 */
function forcePreview() {
  if (wgUserName != null || wgAction != "edit") return;
  saveButton = document.getElementById("wpSave");
  if (!saveButton) return;
  saveButton.disabled = true;
  saveButton.value = "Sauvegarder (après prévisualisation)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}

addOnloadHook(forcePreview);

//</nowiki>