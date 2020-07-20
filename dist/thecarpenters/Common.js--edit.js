/**
 * Applications spécifiques à la page d'édition
 * <nowiki>
 */
/* todo : migrer celles qui ne sont pas vitales dans les gadgets */
 
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
  saveButton.value = "Publier (après prévisualisation)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
addOnloadHook(forcePreview);
 
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
 
function InitPL(page_name) {
  return "<!-- Remplir les paramètres mois et année à la sous page correspondante, et créer les liens rouges -->\n" +
         "{{Portail:Littérature/Invitation à la lecture/Sélection/Modèle \n" +
         "| mois = \n" +
         "| année = \n" +
         "}} \n" +
         "<noinclude>{{Portail:Littérature/Invitation à la lecture/Sélection/Modèle inclusion \n" +
         "| mois = \n" +
         "| année = \n" +
         "}} \n" +
         "</noinclude>";
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
  new Array('Wikipédia:Proposition_bons_articles/', InitPBA),
  new Array('Portail:Littérature/Invitation_à_la_lecture/Sélection/', InitPL)
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
                '\n<gallery>\nImage:Exemple.jpg|[[Tournesol]]\nImage:Exemple1.jpg|[[La Joconde]]\nImage:Exemple2.jpg|Un [[hamster]]\n</gallery>\n{{message galerie}}',
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
                '== Notes et références ==\n<references />',
                '',
                '',
                'mw-editbutton-references');
 
var voirAussi = '== Notes et références ==\n'
 + '{{Références}}\n\n'
 + '== Voir aussi ==\n'
 + '=== Articles connexes ===\n'
 + '* [[À remplacer]]\n\n'
 + '=== Liens externes===\n'
 + '*\n\n'
 + '=== Bibliographie ===\n'
 + '* [[À remplacer]]\n\n'
 
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
 
//</nowiki>