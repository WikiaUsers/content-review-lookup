/**
 * Recherche avancée
 * 
 * Remplace la boîte de recherche par une avec beaucoup plus de possibilités
 * (raccourcis, recherche dans toutes les langues et projets, et quelques autres sites)
 * 
 * Auteur : Seb35
 * Version 3.5
 * Date de dernière révision : 2 janvier 2011
 * 
 * Documentation de la fonction Recherche avancée : voir [[:w:fr:Utilisateur:Seb35/Scripts]]
 * {{:Projet:JavaScript/Script|AdvancedResearch}}
 */

////////////////////// ZONE PERSONNALISABLE //////////////////////
// Voir aussi [[:w:fr:Utilisateur:Seb35/Scripts]]

var adSearchProject;        // Projet par défaut, ex : wikipedia.org, meta.wikimedia.org | défaut : projet courant

var adSearchLang;           // Tableau des projets wiki contenant des tableaux de 3 cases :
                            // * langue du projet, vide sinon (exemple : fr, zh-classical)
                            // * adresse du projet            (exemple : wikipedia.org, meta.wikimedia.org)
                            // * affichage                    (exemple : fr)
                            // * (optionel) dossier du script (exemple : /wiki/)

var adSearchDefaultLang;    // Langue et projet utilisés par défaut | Array(adSearchLang0,adSearchLang0project)
var adSearchInstantTitle;   // Afficher automatiquement le titre de la page en marquant '_' | activé
var adSearchSametab;        // Ouvrir dans le même onglet | désactivé
var adSearchShowtab;        // Ouvrir l'onglet supplémentaire en avant-plan | activé
var adSearchButtons;        // Boutons de recherche, voir le tableau adresses dans le code | Array('l','w','g','reset','c')
var adSearchDefault;        // Recherche par défaut lorsqu'on appuie sur Entrée | 'l'
var adSearchClear;          // Effacer après x 1/10e secondes (x >= 0), -1 pour ne pas effacer | -1
var adSearchHistoryLength;  // Nombre d'entrées à conserver dans l'historique >= 0 | 5
var adSearchAdresses;       // Ajouter des adresses, voir le tableau adresses dans le code
var adSearchOpenOptions;    // Options passées lors de l'ouverture d'une fenêtre | voir code
var adSearchShortcuts;      // Remplacer les raccourcis | rien
var adSearchPanelView;      // Tableau permettant l'affichage de : langues - retour à la ligne - autres langues -
                            //  case même fenêtre - case arrière-plan - retour à la ligne - boutons | 1,1,1,1,1,1,1
var adSearchCSS;            // CSS régissant la présentation de la boîte de recherche | voir code
var adSearchDisplayOnFocus; // Dans Vector, afficher la boîte de recherche seulement lors du focus de la zone de texte | false

// Raccourcis sur les titres

// Espaces de noms
// une ligne = numéro_de_l'espace_de_nom, tableau_des_raccourcis, objet_contenant_l'espace_de_noms_en_fonction_de_la_langue
var adSearchNamespaces = [
  -1, ['sp'],        { 'mul': 'Special:$1',        'fr': 'Spécial:$1'                },
   2, ['u'],         { 'mul': 'User:$1',           'fr': 'Utilisateur:$1'            },
   4, ['w'],         { 'mul': 'Project:$1',        'fr': 'Wikipédia:$1'              },
   6, ['f','i'],     { 'mul': 'File:$1',           'fr': 'Fichier:$1'                },
   8, ['mw'],        { 'mul': 'MediaWiki:$1',      'fr': 'MediaWiki:$1'              },
  10, ['m'],         { 'mul': 'Template:$1',       'fr': 'Modèle:$1'                 },
  12, ['a'],         { 'mul': 'Help:$1',           'fr': 'Aide:$1'                   },
  14, ['c','cat'],   { 'mul': 'Category:$1',       'fr': 'Catégorie:$1'              },
   1, ['d'],         { 'mul': 'Talk:$1',           'fr': 'Discussion:$1'             },
   3, ['du'],        { 'mul': 'User talk:$1',      'fr': 'Discussion utilisateur:$1' },
   5, ['dw'],        { 'mul': 'Project talk:$1',   'fr': 'Discussion Wikipédia:$1'   },
   7, ['df','di'],   { 'mul': 'File talk:$1',      'fr': 'Discussion fichier:$1'     },
   9, ['dmw'],       { 'mul': 'MediaWiki talk:$1', 'fr': 'Discussion MediaWiki:$1'   },
  11, ['dm'],        { 'mul': 'Template talk:$1',  'fr': 'Discussion modèle:$1'      },
  13, ['da'],        { 'mul': 'Help talk:$1',      'fr': 'Discussion aide:$1'        },
  15, ['dc','dcat'], { 'mul': 'Category talk:$1',  'fr': 'Discussion catégorie:$1'   },
 
 NaN, ['p'],         {                             'fr': 'Portail:$1',               'en': 'Portal:$1'      },
 NaN, ['pj'],        {                             'fr': 'Projet:$1'                                        },
 NaN, ['r'],         {                             'fr': 'Référence:$1'                                     },
 NaN, ['dp'],        {                             'fr': 'Discussion Portail:$1',    'en': 'Portal talk:$1' },
 NaN, ['dpj'],       {                             'fr': 'Discussion Projet:$1'                             },
 NaN, ['dr'],        {                             'fr': 'Discussion Référence:$1'                          },
];

var adSearchLocalNamespaces = {
 'frwiki': [ 100,['p'],  102,['pj'],  104,['r'],  101,['dp'],  103,['dpj'],  105,['dr'] ]
};

// Raccourcis portant sur autre chose que l'espace de noms
// une ligne = regex, objet_contenant_le_nom_complet_en_fonction_de_la_langue
var adSearchDefaultShortcuts = [
 /^#\/redirect$/i,   { 'mul': 'Special:Randomredirect'         },
 /^#(\/.*)?/,        { 'mul': 'Special:Random$1'               },
 /(.*)--$/i,         { 'mul': 'Special:Recentchangeslinked/$1' },
 /(.*)-$/i,          { 'mul': 'Special:Whatlinkshere/$1'       },
 /(.*)\/c$/i,        { 'mul': 'Special:Contributions/$1'       },
 /(.*)\/u$/i,        { 'mul': 'Special:Undelete/$1'            },
 /(.*)\/(css|js)$/i, { 'mul': 'User:$1/monobook.$2'            },
 /(.*)\/i[aà]s$/i,   { 'en': 'Wikipedia:Images and media for deletion', 'fr': 'Wikipédia:Images à supprimer/$1' },
 /(.*)\/lann$/i,     {                                                  'fr': '$1/Neutralité'                   },
 /(.*)\/p[aà]s$/i,   { 'en': 'Wikipedia:Articles for deletion/$1',      'fr': '$1/Suppression'                  },
 /(.*)\/p[aà]v$/i,   {                                                  'fr': 'Wikipédia:Pages à vérifier/$1'   },
 /(.*)\/pcp$/i,      { 'en': 'Wikipedia:Copyright problems',            'fr': '$1/Droit d\'auteur'              },
];

// Wikis dans lesquels chercher
var adSearchServeurs = [
 /^c(ommons)?$/i,     '',   'commons.wikimedia.org',   '/wiki/', 'commonswiki',
 /^f(ou?ndation)?$/i, '',   'wikimediafoundation.org', '/wiki/', 'foundationwiki',
 /^i(ncubator)?$/i,   '',   'incubator.wikimedia.org', '/wiki/', 'incubatorwiki',
 /^m(eta)?$/i,        '',   'meta.wikimedia.org',      '/wiki/', 'metawiki',
 /^(mw|mediawiki)$/i, '',   'www.mediawiki.org',       '/wiki/', 'mediawikiwiki',
 /^s(pecies)?$/i,     '',   'species.wikipedia.org',   '/wiki/', 'specieswiki',
 /^(wz|wiktionaryz|ow|omegawiki)$/i,'','www.omegawiki.org', '/', '', // non-Wikimédia
 /^(.*)\.b$/i,        '$1', 'wikibooks.org',           '/wiki/', '$1wikibooks',
 /^(.*)\.n$/i,        '$1', 'wikinews.org',            '/wiki/', '$1wikinews',
 /^(.*)\.q$/i,        '$1', 'wikiquote.org',           '/wiki/', '$1wikiquote', 
 /^(.*)\.s$/i,        '$1', 'wikisource.org',          '/wiki/', '$1wikisource',
 /^(.*)\.v$/i,        '$1', 'wikiversity.org',         '/wiki/', '$1wikiversity',
 /^(.*)\.w(ikt)?$/i,  '$1', 'wiktionary.org',          '/wiki/', '$1wiktionary',
 /^(.*)\.wp$/i,       '$1', 'wikipedia.org',           '/wiki/', '$1wiki'
];

var adSearchDefaultAdresses = [
 'l',   'http://*prefix**script*$1',
 'w',   'http://*prefix**script*Special:Search?fulltext=search&search=$1',
 'e',   'http://*prefix**script*$1?action=edit',
 'h',   'http://*prefix**script*$1?action=history',
 'lp',  'http://*prefix**script*Special:Log?page=$1',
 'lu',  'http://*prefix**script*Special:Log?user=$1',
 'pi',  'http://*prefix**script*Special:Prefixindex/$1',
 'g',   'http://www.google.com/search?num=100&q=$1+site:*prefix*',
 'c',   'http://www.google.com/search?num=100&q=%22$1%22',
 'gg',  'http://www.google.com/search?num=100&q=$1',
 'imdb','http://french.imdb.com/find?s=all&q=$1',
 'allo','http://www.allocine.fr/recherche/?motcle=$1',
 'lum', 'http://wiki.lumrix.net/*language*/search.php?f=lumrix-search&k=$1',
];

var adSearchDefaultCSS = '#adotherlang { font-size:95%; }';
if( skin == 'vector' )
{
 adSearchDefaultCSS = 'div#simpleSearch input#searchInput { width:24em; } #adsearchbuttons { position:relative; top:-3.1em; border:solid 1px #AAAAAA; background-color:white; text-align:center; vertical-align:middle; } #adsearchbuttons input { vertical-align:middle; padding-top:0; padding-bottom:0; margin-top:0; margin-bottom:0; font-size:0.8em; }';
}

// DÉPRÉCIÉ : remplacé par le tableau adSearchLang
var adSearchLang0;
var adSearchLang0project;
var adSearchLang0name;
var adSearchLang1;
var adSearchLang1project;
var adSearchLang1name;
var adSearchLang2;
var adSearchLang2project;
var adSearchLang2name;

///////////////// FIN DE LA ZONE PERSONNALISABLE /////////////////

/*********************************/
/* Recherche avancée multilingue */
/* Auteur : Seb35                */
/*********************************/
function adSearchIsset(va, dv) { if(va != undefined) return va; else return dv; }

var adSearchCompteur, adSearchDelete, adSearchDash = 0, adSearchHistory = Array(), adSearchIndexH, adSearchDefLang = 0, adSearch_os_query_simple = '', wgDBname;

function adSearch()
{
 adSearchProject = adSearchIsset(adSearchProject, wgServer.replace(/.*\/\/(?:((?:commons|incubator|meta|species|www|wikimania\d{4})\.|wikimediafoundation)|\w*\.)(\w*\.org)/i, '$1$2'));
 
 adSearchLang0 = adSearchIsset(adSearchLang0, wgServer.indexOf('wikimedia') != -1 ? '' : wgContentLanguage);
 adSearchLang0project = adSearchIsset(adSearchLang0project, adSearchProject);
 adSearchLang0name = adSearchIsset(adSearchLang0name, (adSearchLang0 ? adSearchLang0 : adSearchLang0project.charAt(0)));
 adSearchLang1 = adSearchIsset(adSearchLang1, (adSearchLang0 != 'fr' ? 'fr' : 'en'));
 adSearchLang1project = adSearchIsset(adSearchLang1project, adSearchProject);
 adSearchLang1name = adSearchIsset(adSearchLang1name, (adSearchLang1 ? adSearchLang1 : adSearchLang1project.charAt(0)));
 adSearchLang2 = adSearchIsset(adSearchLang2, (adSearchLang0 != 'en' && adSearchLang0 != 'fr' ? 'en' : 'de'));
 adSearchLang2project = adSearchIsset(adSearchLang2project, adSearchProject);
 adSearchLang2name = adSearchIsset(adSearchLang2name, (adSearchLang2 ? adSearchLang2 : adSearchLang2project.charAt(0)));
 
 adSearchLang = adSearchIsset(adSearchLang, Array(
  Array( '',            adSearchProject,      'all',             '/wiki/' ),
  Array( adSearchLang0, adSearchLang0project, adSearchLang0name, '/wiki/' ),
  Array( adSearchLang1, adSearchLang1project, adSearchLang1name, '/wiki/' ),
  Array( adSearchLang2, adSearchLang2project, adSearchLang2name, '/wiki/' )
 ));
 
 adSearchDefaultLang = adSearchIsset(adSearchDefaultLang, Array(adSearchLang0,adSearchLang0project));
 adSearchInstantTitle = adSearchIsset(adSearchInstantTitle, true);
 adSearchSametab = adSearchIsset(adSearchSametab, true);
 adSearchShowtab = adSearchIsset(adSearchShowtab, true);
 adSearchButtons = adSearchIsset(adSearchButtons, Array('l', 'w', 'g', 'reset', 'c'));
 adSearchDefault = adSearchIsset(adSearchDefault, adSearchButtons[0]);
 adSearchClear = adSearchIsset(adSearchClear, -1);
 adSearchHistoryLength = adSearchIsset(adSearchHistoryLength, 5);
 adSearchAdresses = adSearchIsset(adSearchAdresses, Array());
 adSearchAdresses = adSearchAdresses.concat(adSearchDefaultAdresses);
 adSearchOpenOptions = adSearchIsset(adSearchOpenOptions, 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes');
 adSearchShortcuts = adSearchIsset(adSearchShortcuts, adSearchDefaultShortcuts);
 if( skin == "vector" ) adSearchPanelView = adSearchIsset(adSearchPanelView, Array(1, 0, 1, 1, 1, 0, 1));
 else adSearchPanelView = adSearchIsset(adSearchPanelView, Array(1, 1, 1, 1, 1, 1, 1));
 adSearchCSS = adSearchIsset(adSearchCSS, adSearchDefaultCSS);
 adSearchDisplayOnFocus = adSearchIsset(adSearchDisplayOnFocus, false);
 
 var a, lab, el, i;
 if(adSearchCSS) appendCSS( adSearchCSS );
 a = document.getElementById('searchform');
 if(adSearchLang.length == 0 || adSearchButtons.length == 0) { document.getElementById('searchInput').value = 'erreur de config:aucune langue ou aucun bouton définis'; return false; }
 
 // Zone de texte
 addHandler( document.getElementById('searchInput'), 'focus', function(event){clearTimeout(adSearchDelete);} );
 addHandler( document.getElementById('searchInput'), 'keypress', adSearchCheck );
 if(adSearchInstantTitle)
 {
  addHandler( document.getElementById('searchInput'), 'mouseup', adSearchReplaceUnder );
  addHandler( document.getElementById('searchInput'), 'keyup', adSearchReplaceUnder );
 }
 
 // Insertion dans la boîte de recherche
 if( skin != 'vector' )
 {
  document.getElementById('searchform').removeAttribute('action');
  if( a.getElementsByTagName('div').length != 0 ) a = a.getElementsByTagName('div')[0];
  for(i=0; i<5; i++) a.removeChild(a.lastChild);
 }
 else addHandler( document.getElementById('searchform'), 'submit', adSearchGo );
 //document.getElementById('searchform').removeAttribute('action');
 if( !adSearchPanelView[0] && !adSearchPanelView[1] && !adSearchPanelView[2] && !adSearchPanelView[2] && !adSearchPanelView[4] && !adSearchPanelView[5] && !adSearchPanelView[6] ) return;
 if( skin == 'vector' ) {
  el = document.createElement('div');
  el.id = 'adsearchbuttons';
  if( adSearchDisplayOnFocus )
  {
   el.style.display = 'none';
   addHandler( document.getElementById('searchInput'), 'focus', function(event){document.getElementById('adsearchbuttons').style.display = 'block';} );
  }
  a = a.appendChild(el);
 }
 
 // Langues rapidement accessibles
 if(adSearchPanelView[0])
 {
  for(i=0; i<adSearchLang.length; i++)
  {
   lab = document.createElement('label');
   el = document.createElement('input');
   el.setAttribute('type','radio');
   el.setAttribute('id','adlang'+(i+1));
   el.setAttribute('name','langselect');
   if(adSearchDefaultLang[0] == adSearchLang[i][0] && adSearchDefaultLang[1] == adSearchLang[i][1])
   {
    el.setAttribute('checked','checked');
    adSearchDefLang = 'adlang'+(i+1);
   }
   lab.appendChild(el);
   lab.appendChild(document.createTextNode(adSearchLang[i][2]));
   if(window.addEventListener) a.appendChild(lab);
   else
   {
    a.innerHTML += '<label><input type="radio" name="langselect" id="adlang'+(i+1)+'"'+(adSearchDefaultLang[0] == adSearchLang[i][0] && adSearchDefaultLang[1] == adSearchLang[i][1]?' checked="checked"':'')+' />'+adSearchLang[i][2]+'</label>';
    if(adSearchDefaultLang[0] == adSearchLang[i][0] && adSearchDefaultLang[1] == adSearchLang[i][1]) adSearchDefLang = 'adlang'+(i+1);
   }
  }
  if(adSearchDefLang == 0)
  {
   document.getElementById('adlang1').setAttribute('checked','checked');
   adSearchDefLang = 'adlang1';
  }
 }
 
 // Retour à la ligne
 if(adSearchPanelView[1])
 {
  el = document.createElement('br');
  el.id = 'adbr1';
  a.appendChild(el);
 }
 
 // Langues supplémentaires
 if(adSearchPanelView[2])
 {
  el = document.createElement('input');
  el.setAttribute('type','radio');
  el.name = 'langselect';
  el.id = 'adlangplus';
  if(window.addEventListener) a.appendChild(el);
  else a.innerHTML += '<input type="radio" name="langselect" id="adlangplus" />';
  addHandler( document.getElementById('adlangplus'), 'focus', function(event){if(!document.getElementById('adotherlang').value) document.getElementById('adotherlang').focus();} );
  
  el = document.createElement('input');
  el.setAttribute('type','text');
  el.size = 2;
  el.maxLength = 12;
  el.id = 'adotherlang';
  a.appendChild(el);
  addHandler( document.getElementById('adotherlang'), 'blur', function(event){if(document.getElementById('adlangplus').checked && !document.getElementById('adotherlang').value) document.getElementById(adSearchDefLang).checked = true;} );
  addHandler( document.getElementById('adotherlang'), 'keypress', adSearchCheck );
 }
 
 // Case à cocher pour ouvrir dans la même fenêtre
 if(adSearchPanelView[3])
 {
  el = document.createElement('input');
  el.setAttribute('type','checkbox');
  el.id = 'adsametab';
  if(adSearchSametab) el.setAttribute('checked','checked');
  a.appendChild(el);
  addHandler( document.getElementById('adsametab'), 'click', function(event){if(document.getElementById('adsametab').checked) document.getElementById('adshowtab').style.visibility = 'hidden'; else document.getElementById('adshowtab').style.visibility = 'visible';} );
 }
 
 // Case à cocher pour ouvrir en arrière-plan
 if(adSearchPanelView[4])
 {
  el = document.createElement('input');
  el.setAttribute('type','checkbox');
  el.id = 'adshowtab';
  if(adSearchShowtab) el.setAttribute('checked','checked');
  if(adSearchSametab) el.style.visibility = 'hidden';
  a.appendChild(el);
 }
 
 // Retour à la ligne
 if(adSearchPanelView[5])
 {
  el = document.createElement('br');
  el.id = 'adbr2';
  a.appendChild(el);
 }
 
 // Boutons de recherche
 if(adSearchPanelView[6])
 {
  for(i=0; i<adSearchButtons.length; i++)
  {
   el = document.createElement('input');
   if(adSearchButtons[i]==adSearchDefault && !is_gecko && skin!='vector') el.setAttribute('type','submit');
   else el.setAttribute('type','button');
   el.setAttribute('class','searchButton');
   el.id = adSearchButtons[i]+'-adSearchButton';
   if(adSearchButtons[i]=='reset') el.setAttribute('value','.');
   else el.setAttribute('value',adSearchButtons[i].charAt(0));
   a.appendChild(el);
   
   if(adSearchButtons[i]=='reset') addHandler( document.getElementById('reset-adSearchButton'), 'click', function(event){if(document.getElementById('searchInput').value) document.getElementById('searchInput').value = ''; else document.getElementById('searchform').reset(); document.getElementById('searchInput').focus(); adSearchDash = 0;} );
   else addHandler( document.getElementById(adSearchButtons[i]+'-adSearchButton'), 'click', adSearchGo );
  }
 }
}
addOnloadHook(adSearch);

/*************************/
/* Fonctions auxiliaires */
/* Auteur : Seb35        */
/*************************/
function adSearchCheck(e)
{
 if(e.keyCode == 13) { if(document.getElementById('adlangplus').checked && !document.getElementById('adotherlang').value) document.getElementById(adSearchDefLang).checked = true; if(is_gecko) {adSearchGo(e); e.returnValue = false;} }
 else if(e.target.id == 'adotherlang' && !document.getElementById('adlangplus').checked && e.keyCode != 9) document.getElementById('adlangplus').checked = true;
 else if(e.target.id == 'searchInput' && (e.keyCode == 35 || e.keyCode == 36) && adSearchHistory.length)
 {
  if(!document.getElementById('searchInput').value && e.keyCode == 36) { adSearchIndexH = 0; document.getElementById('searchInput').value = adSearchHistory[0]; }
  else if(document.getElementById('searchInput').value == adSearchHistory[adSearchIndexH] && e.keyCode == 36 && adSearchIndexH < adSearchHistory.length-1) { adSearchIndexH++; ; document.getElementById('searchInput').value = adSearchHistory[adSearchIndexH]; }
  else if(document.getElementById('searchInput').value == adSearchHistory[adSearchIndexH] && e.keyCode == 35 && adSearchIndexH > 0) { adSearchIndexH--; ; document.getElementById('searchInput').value = adSearchHistory[adSearchIndexH]; }
 }
}

function adSearchReplaceUnder()
{
 clearTimeout(adSearchCompteur);
 var entree = document.getElementById('searchInput').value;
 document.getElementById('searchInput').value = entree.replace(/__/, adSearchTheTitle(false));
 if(entree.length - adSearchDash > 1) document.getElementById('searchInput').value = entree.replace(/_/g, ' ');
 else if(/_/.test(entree))
 {
  if(!wgNamespaceNumber) document.getElementById('searchInput').value = entree.replace(/_/, adSearchTheTitle(true));
  else adSearchCompteur = setTimeout("document.getElementById('searchInput').value = document.getElementById('searchInput').value.replace(/_/, adSearchTheTitle(true)); adSearchDash = document.getElementById('searchInput').value.length;", 350);
 }
 adSearchDash = entree.length;
}

function adSearchTheTitle( withnamespace ) {
 
 if( withnamespace ) {
  var i;
  for( i=0; i<adSearchNamespaces.length/3; i++ ) {
   if( wgNamespaceNumber == adSearchNamespaces[3*i] ) return adSearchNamespaces[3*i+1][0]+':'+wgTitle;
  }
  if( wgDBname != undefined && adSearchLocalNamespaces[wgDBname] != undefined ) {
   for( i=0; i<adSearchLocalNamespaces[wgDBname].length/2; i++ ) {
    if( wgNamespaceNumber == adSearchLocalNamespaces[wgDBname][2*i] ) return adSearchLocalNamespaces[wgDBname][2*i+1][0]+':'+wgTitle;
  }}
  return wgPageName.replace(/_/g, ' ');
 }
 else return wgTitle;
}

function adSearchGetDB(langue, projet) {
 var i;
 for( i=0; i<adSearchServeurs.length/5; i++ ) {
  if( projet == adSearchServeurs[5*i+2] ) {
   return langue.replace(/(.*)/, adSearchServeurs[5*i+4]);
 }}
 return '';
}

function adSearchStoreHistory(mot)
{
 for(var i=0;i<adSearchHistory.length;i++) if(mot == adSearchHistory[i])
 {
  for(;i>0;i--) adSearchHistory[i]=adSearchHistory[i-1];
  adSearchHistory[0] = mot;
  return;
 }
 var max = (adSearchHistory.length < adSearchHistoryLength-1 ? adSearchHistory.length : adSearchHistoryLength-1);
 for(var i=max;i>0;i--) adSearchHistory[i] = adSearchHistory[i-1];
 adSearchHistory[0] = mot;
}

function adSearchExpand(mot, langue, projet, db)
{
 var i, tmp;
 
 // Première étape : remplacer les tirets bas s'il y en a
 mot = mot.replace(/__/, adSearchTheTitle(false));
 mot = mot.replace(/_/, adSearchTheTitle(true));
 
 // Deuxième étape : remplacer l'espace de nom
 for( i=0; i<adSearchNamespaces.length/3; i++ ) {
  tmp = new RegExp('^(?:'+adSearchNamespaces[3*i+1].join('|')+'):(.*)', 'i');
  if( tmp.test(mot) ) {
   if( wgDBname != undefined && db == wgDBname ) {
    if( !isNaN(adSearchNamespaces[3*i]) ) mot = mot.replace( tmp, wgFormattedNamespaces[adSearchNamespaces[3*i]]+':$1' );
    else if( adSearchLocalNamespaces[wgDBname] != undefined ) {
     for( i=0; i<adSearchLocalNamespaces[wgDBname].length/2; i++ ) {
      if( RegExp('^(?:'+adSearchLocalNamespaces[wgDBname][2*i+1].join('|')+'):(.*)', 'i').test(mot) ) mot = mot.replace( tmp, wgFormattedNamespaces[adSearchLocalNamespaces[wgDBname][2*i]]+':$1' );
    }}
    else if( adSearchNamespaces[3*i+2][langue] != undefined ) mot = mot.replace( tmp, adSearchNamespaces[3*i+2][langue] );
    else mot = mot.replace(tmp, '$1' );
   }
   else if( adSearchNamespaces[3*i+2][langue] != undefined ) mot = mot.replace( tmp, adSearchNamespaces[3*i+2][langue] );
   else if( adSearchNamespaces[3*i+2]['mul'] != undefined ) mot = mot.replace( tmp, adSearchNamespaces[3*i+2]['mul'] );
   else mot = mot.replace(tmp, '$1' );
   break;
 }}
 
 // Troisième étape : remplacer les postfixes
 for(i = 0; i<adSearchShortcuts.length/2; i++) {
  if(adSearchShortcuts[2*i].test(mot)) {
   if(adSearchShortcuts[2*i+1][langue] != undefined) mot = mot.replace(adSearchShortcuts[2*i], adSearchShortcuts[2*i+1][langue]);
   else if(adSearchShortcuts[2*i+1]['mul'] != undefined) mot = mot.replace(adSearchShortcuts[2*i], adSearchShortcuts[2*i+1]['mul']);
   else mot = mot.replace(adSearchShortcuts[2*i], '$1');
 }}
 
 return mot;
}

// Surcharge de la recherche OpenSearch pour prendre en compte les raccourcis
if( os_eventKeyup && os_updateIfRelevant ) {

function os_eventKeyup(e){
	var targ = os_getTarget(e);
	var r = os_map[targ.id];
	if(r == null)
		return; // not our event

	// some browsers won't generate keypressed for arrow keys, catch it
	if(os_keypressed_count == 0){
		os_processKey(r,os_cur_keypressed,targ);
	}
	var query = targ.value;
	adSearch_os_query_simple = query; // ajouté
	query = adSearchExpand(query, wgContentLanguage, '', wgDBname); // ajouté
	os_fetchResults(r,query,os_search_timeout);
}

function os_updateIfRelevant(r, query, text, cacheKey){
	var t = document.getElementById(r.searchbox);
	if(t != null && adSearchExpand(t.value,wgContentLanguage,'',wgDBname) == query){ // check if response is still relevant
		os_updateResults(r, query, text, cacheKey);
	}
	r.query = query;
	r.original = adSearch_os_query_simple; // ajouté
}
}

function adSearchGo(event)
{
 //Langue
 var urllanguage = '';
 var urlserver = adSearchProject;
 var scripte = '/wiki/';
 var dbname = '';
 var urlmotor = '';
 var motor, i, sortie;
 if(document.getElementById('adlangplus') && document.getElementById('adlangplus').checked)
 {
  urllanguage = document.getElementById('adotherlang').value;
  if(!urllanguage) urlmotor = 'http://www.wikimedia.org/';
  if(urllanguage == '639') urlmotor = 'http://fr.aigles-et-lys.wikia.com/wiki/Liste_des_codes_ISO_639-1';
  if(urllanguage == '639-2') urlmotor = 'http://fr.aigles-et-lys.wikia.com/wiki/Liste_des_codes_ISO_639-2';
  if(urllanguage == '639-3') urlmotor = 'http://www.sil.org/iso639-3/codes.asp';
  if(urllanguage == 'liste') urlmotor = 'http://wikimediafoundation.org/wiki/Special:SiteMatrix';
  for(i = 0; i<(adSearchServeurs.length)/5; i++)
  {
   if(adSearchServeurs[5*i].test(urllanguage))
   {
    dbname = urllanguage.replace(adSearchServeurs[5*i], adSearchServeurs[5*i+4]);
    urllanguage = urllanguage.replace(adSearchServeurs[5*i], adSearchServeurs[5*i+1]);
    if(urllanguage == '*') urllanguage = '';
    urlserver = adSearchServeurs[5*i+2];
    scripte = adSearchServeurs[5*i+3];
    break;
   }
  }
 }
 else if(document.getElementById('adlang1'))
 {
  for(i=0; i<adSearchLang.length;i++)
  {
   if(document.getElementById('adlang'+(i+1)).checked)
   {
    urllanguage = adSearchLang[i][0];
    urlserver = adSearchLang[i][1];
    scripte = adSearchLang[i][3];
    dbname = adSearchGetDB( urllanguage, urlserver );
    break;
   }
  }
 }
 else
 {
  urllanguage = adSearchDefaultLang[0];
  urlserver = adSearchDefaultLang[1];
  for(i=0; i<adSearchLang.length;i++)
  {
   if(urllanguage == adSearchLang[i][0] && urlserver == adSearchLang[i][1])
   {
    scripte = adSearchLang[i][3];
    dbname = adSearchGetDB( urllanguage, urlserver );
   }
  }
 }
 
 //Serveur
 motor = event.target.id.replace(/^(.*)-adSearchButton$/,'$1');
 if( adSearchButtons.indexOf(motor) == -1 ) motor = adSearchDefault;
 var urlnom = document.getElementById('searchInput').value;
 for(i = 0; i<(adSearchAdresses.length)/2; i++)
 {
  if(adSearchAdresses[2*i] == motor) motor = i;
  var tmp = new RegExp('^'+adSearchAdresses[2*i]+';(.*)');
  if(tmp.test(urlnom))
  {
   urlnom = urlnom.replace(tmp, '$1');
   motor = i;
   break;
  }
 }
 if(isNaN(motor)) { document.getElementById('searchInput').value = 'erreur de config:motor='+motor; return false; }
 var urlprefix = urlserver;
 if(urllanguage) urlprefix = urllanguage + '.' + urlserver;
 if(!urlnom && !urlmotor) urlmotor = 'http://' + urlprefix;
 
 // Préparation du moteur
 if(!urlmotor) urlmotor = adSearchAdresses[2*motor+1].replace(/\*prefix\*/gi, urlprefix).replace(/\*language\*/gi, urllanguage).replace(/\*server\*/gi, urlserver).replace(/\*script\*/gi, scripte);
 
 //Requête
 var mots = urlnom.split('|');
 for(u = 0; u < mots.length; u++)
 {
  mots[u] = mots[u].replace(/^ */, '').replace(/ *$/, '').replace(/\?/, '%3F');
  adSearchStoreHistory(mots[u]);
  mots[u] = adSearchExpand( mots[u], urllanguage, urlserver, dbname );
  
  //Préparation de l'URL
  sortie = urlmotor.replace(/\$1/gi, mots[u]);
  
  //Sortie
  if(document.getElementById('adsametab') && document.getElementById('adsametab').checked) { window.location.assign(sortie); break; }
  else
  {
   dat = new Date();
   fenetre = window.open(sortie, 'f'+u+dat.getTime(), adSearchOpenOptions);
   if(document.getElementById('adshowtab') && !document.getElementById('adshowtab').checked) fenetre.blur();
  }
 }
 
 //Effacement du mot
 if(adSearchClear != -1)
 {
  if(adSearchClear == 0) document.getElementById('searchInput').value = '';
  else adSearchDelete = setTimeout("document.getElementById('searchInput').value = ''; adSearchDash = 0;", adSearchClear*100);
 }
 
 //Retrait des suggestions
 try
 {
  os_hideResults(os_map['searchInput']);
 }
 catch(e) {}
 
 event.returnValue = false;
 event.preventDefault();
 return false;
}