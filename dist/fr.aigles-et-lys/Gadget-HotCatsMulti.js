/**
 * Ajoute des liens après les catégories pour rapidement
 * supprimer / modifier / ajouter une catégorie sur un article.
 * Utilise Ajax et l'api MediaWiki pour rechercher une catégorie.
 * Version adaptée pour WP:fr de [[:commons:MediaWiki:HotCat.js]]
 *
 * Auteur original : Magnus Manske
 * Adaptation pour WP:fr : Zelda
 * Adaptation édition multiple : Dr Brains
 *
 * {{Catégorisation JS|HotCatsMulti}}
 */

//<source lang=javascript><pre><nowiki>
///////////////////////// VARIABLES ////////////////////////////////////////////////////////

//// PARAMÈTRES PERSONNALISABLES ////

// Délai avant les suggestions, en ms
var hotcat_suggestion_delay = 200;

// Taille de la liste déroulante (en items)
var hotcat_list_size = 10;

// Nombre de catégories suggérées lors de la recherche (maximum autorisé : 4999 pour les sysop et les bots, 499 pour les autres utilisateurs)
var hotcat_list_items = 50;

// Permet d'afficher la liste de suggestion vers le bas
var hotcat_list_down = false;

// Permet de publier automatiquement la modification
var hotcat_autocommit = true;

// Modification mineure ( -1 = défaut ; 0 = jamais ; 1 = toujours )
var hotcat_Minoredit = 1;

// Suivre la page modifiée ( -1 = défaut ; 0 = jamais ; 1 = toujours )
var hotcat_Watchthis = -1;

// Activation automatique du mode "multi"
var hotcat_AutoMulti = false;

// Afficher de la légende
var hotcat_ShowLegend = true;

// Afficher sur une seule ligne
var hotcat_ShowInline = false;

// Ne pas confirmer la suppression
var hotcat_SkipConfirm = false;

// Ne pas afficher le récapitulatif
var hotcat_SkipRecap = false;

// Afficher le bouton pour suggérer les catégories-mères
var hotcat_ParentButton = true;

// Afficher le bouton pour suggérer les catégories-filles
var hotcat_DaughterButton = true;

// Icônes pour signifier l'existence ou non de la catégorie choisie
var hotcat_exists_size = 20;
var hotcat_exists_yes = "//upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png" ;
var hotcat_exists_no = "//upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png" ;

// Lien vers la documentation
var hotcat_docURL = "//fr.wikipedia.org/wiki/Projet:JavaScript/Notices/HotCatsMulti#Fonctionnement";

// ID du lien pour les catégories cachées
var hotcat_HiddenCatsLinkID = "mw-hidden-cats-link";

// Mode débuggage
var hotcat_DebugMode = false;

//// TEXTES ////

var hotcat_text_MultiLinkText = "(±)";
var hotcat_text_MultiLinkTitle = "Modifier plusieurs catégories";
var hotcat_text_MultiInputOK = "Valider";
var hotcat_text_MultiInputCancel = "Annuler";

var hotcat_text_Minoredit = "Édition mineure";
var hotcat_text_Watchthis = "Suivre cette page";
var hotcat_text_RadioDefault = "Défaut";
var hotcat_text_RadioYes = "Oui";
var hotcat_text_RadioNo = "Non";

var hotcat_text_LabelText = "Légende";
var hotcat_text_LabelTitle = "Voir la page d\'aide (nouvelle fenêtre)";

var hotcat_text_DefaultSortText = "(D)";
var hotcat_text_DefaultSortTitle = "Ajouter/modifier/supprimer la clef de tri principale";

var hotcat_text_RemoveLinkText = "(–)";
var hotcat_text_RemoveLinkTitle = "Supprimer la catégorie";
var hotcat_text_RemoveConfirm = "Voulez-vous vraiment supprimer la catégorie";
var hotcat_text_ModifyLinkText = "(±)";
var hotcat_text_ModifyLinkTitle = "Modifier la catégorie";
var hotcat_text_AddLinkText = "(+)";
var hotcat_text_AddLinkTitle = "Ajouter une catégorie";

var hotcat_text_Exists_YesTitle = "Cette catégorie existe.";
var hotcat_text_Exists_NoTitle = "Cette catégorie n'existe pas.";
var hotcat_text_ParentTitle = "Suggérer les catégories-mères";
var hotcat_text_ParentText = "↑";
var hotcat_text_DaughterTitle = "Suggérer les catégories-filles";
var hotcat_text_DaughterText = "↓";
var hotcat_text_InputOK = "OK";
var hotcat_text_InputCancel = "Annuler";

var hotcat_text_RecapTitle = 'Récapitulatif :';
var hotcat_text_RecapRemove = 'Catégories à supprimer';
var hotcat_text_RecapModify = 'Catégories à modifier';
var hotcat_text_RecapAdd = 'Catégories à ajouter';
var hotcat_text_RecapSort = 'Clef de tri globale';

var hotcat_text_ResumeScript = "[[Projet:JavaScript/Notices/HotCatsMulti|HotCatsMulti]] : ";

var hotcat_text_AlertProblem1 = "Impossible de trouver la catégorie « $1 » - elle est peut-être incluse via un modèle.";
var hotcat_text_AlertProblem2 = "La catégorie « $1 » est déjà présente.";
var hotcat_text_AlertProblem3 = "Plusieurs occurrences de la catégorie « $1 » trouvées.";

var hotcat_text_NoCatTemplate = "à catégoriser";

//// VARIABLES NON PERSONNALISABLES ////

var hotcat_text_SystemMessage = new Array();
hotcat_text_SystemMessage["red-link-title"] = false;
hotcat_text_SystemMessage["pagecategorieslink"] = false;
hotcat_text_SystemMessage["categories"] = false;
hotcat_text_SystemMessage["pagecategories"] = false;


var hotcat_Multi_Edit = false ;
var hotcat_suggest_running = 0 ;
var hotcat_running = 0 ;
var hotcat_last_v = "" ;
var hotcat_last_key = "";
var hotcat_OldDefaultSort = "";
var hotcat_OldPageContent = false;
var hotcat_Form_Index = 1000;
var hotcat_NewCatsIndex = 2000;
var hotcat_CatNamespace = wgFormattedNamespaces[14]+':';
var hotcat_DefaultsortAliases = new Array();
var hotcat_Multi_IsEditPage = ((wgAction=="edit")||(wgAction=="submit")) ;
var hotcat_Multi_IsSection = false ;

var hotcat_SpanMatrix = new Array();
var hotcat_CatLinkMatrix = new Array();
var hotcat_CatLinkIsRedMatrix = new Array();
var hotcat_RemoveLinkMatrix = new Array();
var hotcat_ModifyLinkMatrix = new Array();
var hotcat_FormMatrix = new Array();
var hotcat_TextMatrix = new Array();
var hotcat_ListMatrix = new Array();
var hotcat_ExistMatrix = new Array();
var hotcat_CatNameMatrix = new Array();
var hotcat_SortMatrix = new Array();

///////////////////////// LANCEMENT ////////////////////////////////////////////////////////

if(wgNamespaceNumber>-1&&wgNamespaceNumber%2==0&&document.URL.indexOf("printable=yes")==-1&&wgAction!="history"){
    var hotcat_CanEdit = true;
    if(typeof(wgRestrictionEdit)==='object'){
        if(wgRestrictionEdit[0]){
            hotcat_CanEdit = false;
            for(var NS in wgRestrictionEdit){
                if(wgUserGroups.indexOf(wgRestrictionEdit[NS])!=-1) hotcat_CanEdit = true;
            }
        }
    }
    if(hotcat_CanEdit){
        // Récupération contenu page
        hotcat_getOldPageContent(true);
        // Récupération aliases du {{DEFAULTSORT:}}
        hotcat_getDefaultsortAliases(true);
        // Récupération des messages système
        hotcat_GetMessages(true);
        // Importation styles CSS
        importStylesheetURI('//fr.wikipedia.org/w/index.php?title=MediaWiki:Gadget-HotCatsMulti.css&action=raw&ctype=text/css');
        // Importations traductions
        importScriptURI('//fr.wikipedia.org/w/index.php?title=Mediawiki:Gadget-HotCatsMultiLang.js&action=raw&ctype=text/javascript');
        // Importations fonctions spécifiques locale pour l'édition
        importScript('MediaWiki:Gadget-HotCatsMultiCustomEdit.js');
        // Lancement
        addOnloadHook(hotcat) ;
    }
}

///////////////////////// REQUÊTES PRÉLIMINAIRES ////////////////////////////////////////////////////////

// RÉCUPÉRATION DU CONTENU ACTUEL DE LA PAGE (asynchrone ou synchrone)

function hotcat_getOldPageContent(Mode){
    if(hotcat_OldPageContent === "") return "";
    var NouvelleRequete = sajax_init_object();
    var URL = wgServer + wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=raw&oldid=' + wgCurRevisionId;
    if(Mode){
        NouvelleRequete.open("GET", URL, true);
        NouvelleRequete.onreadystatechange = function() {
            if(NouvelleRequete.readyState != 4 ) return;
            hotcat_OldPageContent = NouvelleRequete.responseText;
            return hotcat_OldPageContent;
        };
        NouvelleRequete.send(null);
    }else{
        NouvelleRequete.open("GET", URL, false);
        NouvelleRequete.send(null);
        if (NouvelleRequete.readyState == 4 && NouvelleRequete.status == 200){
            hotcat_OldPageContent = NouvelleRequete.responseText;
            return hotcat_OldPageContent;
        }
    }
}


// RÉCUPÉRATION ALIAS DE LA CLEF DE TRI GLOBALE

function hotcat_getDefaultsortAliases(Mode){
    var NouvelleRequete = sajax_init_object();
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&meta=siteinfo&siprop=magicwords';
    if(Mode){
        NouvelleRequete.open("GET", URL, true);
        NouvelleRequete.onreadystatechange = function() {
            if(NouvelleRequete.readyState != 4 ) return;
            var Response = NouvelleRequete.responseXML;
            if(!Response) return new Array("DEFAULTSORT", "DEFAULTSORTKEY", "DEFAULTCATEGORYSORT");
            var MagicWords = Response.getElementsByTagName('magicword');
            for(var a=0;a<MagicWords.length;a++){
                var MagicWordName = MagicWords[a].getAttribute('name');
                if(MagicWordName=="defaultsort"){
                    var Aliases = MagicWords[a].getElementsByTagName('alias');
                    for(var b=0;b<Aliases.length;b++){
                        var ThisAlias = Aliases[b].firstChild.nodeValue;
                        ThisAlias = ThisAlias.replace(/:/g, "");
                        if(hotcat_DefaultsortAliases.indexOf(ThisAlias)==-1) hotcat_DefaultsortAliases.push(ThisAlias);
                    }
                }
            }
        };
        NouvelleRequete.send(null);
    }else{
        NouvelleRequete.open("GET", URL, false);
        NouvelleRequete.send(null);
        if (NouvelleRequete.readyState == 4){
            var Response = NouvelleRequete.responseXML;
            if(!Response) return new Array("DEFAULTSORT", "DEFAULTSORTKEY", "DEFAULTCATEGORYSORT");
            var MagicWords = Response.getElementsByTagName('magicword');
            for(var a=0;a<MagicWords.length;a++){
                var MagicWordName = MagicWords[a].getAttribute('name');
                if(MagicWordName=="defaultsort"){
                    var Aliases = MagicWords[a].getElementsByTagName('alias');
                    for(var b=0;b<Aliases.length;b++){
                        var ThisAlias = Aliases[b].firstChild.nodeValue;
                        ThisAlias = ThisAlias.replace(/:/g, "");
                        if(hotcat_DefaultsortAliases.indexOf(ThisAlias)==-1) hotcat_DefaultsortAliases.push(ThisAlias);
                    }
                }
            }
        }
    }
}

// RÉCUPÉRATION MESSAGES SYSTÈME [[MediaWiki:red-link-title]], [[MediaWiki:pagecategorieslink]], [[MediaWiki:pagecategories]] et [[MediaWiki:categories]]

function hotcat_GetMessages(Mode){
    var NouvelleRequete = sajax_init_object();
    var Titles = new Array();
    for(var Message in hotcat_text_SystemMessage){
        Titles.push(Message);
    }
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&meta=allmessages&ammessages=' + Titles.join("|");
    if(Mode){
        NouvelleRequete.open("GET", URL, true);
        NouvelleRequete.onreadystatechange = function() {
            if(NouvelleRequete.readyState != 4) return;
            var Response = NouvelleRequete.responseXML;
            if(!Response) return;
            var Messages = Response.getElementsByTagName('message');
            for(var a=0;a<Messages.length;a++){
                var MessageName = Messages[a].getAttribute('name');
                var MessageContent = (Messages[a].firstChild ? Messages[a].firstChild.nodeValue : "");
                for(var Message in hotcat_text_SystemMessage){
                    if(MessageName == Message) hotcat_text_SystemMessage[Message] = MessageContent;
                }
            }
        };
        NouvelleRequete.send(null);
    }else{
        NouvelleRequete.open("GET", URL, false);
        NouvelleRequete.send(null);
        if (NouvelleRequete.readyState == 4){
            var Response = NouvelleRequete.responseXML;
            var Messages = Response.getElementsByTagName('message');
            for(var a=0;a<Messages.length;a++){
                var MessageName = Messages[a].getAttribute('name');
                var MessageContent = (Messages[a].firstChild ? Messages[a].firstChild.nodeValue : "");
                for(var Message in hotcat_text_SystemMessage){
                    if(MessageName == Message) hotcat_text_SystemMessage[Message] = MessageContent;
                }
            }
        }
    }
}

// FONCTION DE TRANSFORMATION INITIALE

function hotcat() {
    if(hotcat_running!=0) return;
    hotcat_running = 1;
    var catlinks = document.getElementById("catlinks");
    var hotcatStop = hotcat_getSectionNumber();
    if(hotcatStop){
        if(catlinks) catlinks.parentNode.removeChild(catlinks);
        return;
    }
    if (! catlinks) {
        var bodyC = document.getElementById("bodyContent");             // Monobook, Chick, Simple, Myskin, Vector
        if(!bodyC) bodyC = document.getElementById("article");          // Cologneblue, Nostalgia, Standard
        if(!bodyC) bodyC = document.getElementById("mw_contentholder"); // Modern
        if(!bodyC) return;
        catlinks = document.createElement("div");
        catlinks.id = "catlinks";
        catlinks.className = "catlinks";
        catlinks = bodyC.appendChild(catlinks);
    }else{
        removeClass(catlinks, "catlinks-allhidden");
    }
    if(typeof(hotcat_LangCustom)=="function") hotcat_LangCustom();
    if(typeof(hotcat_SiteCustom)=="function") hotcat_SiteCustom();
    if(typeof(hotcat_UserCustom)=="function") hotcat_UserCustom();
    if(wgAction=="edit") hotcat_list_down = true;
    var catline = document.getElementById ('mw-normal-catlinks');
    if ( !catline || catline == null || typeof catline == 'undefined' ){
        catline = catlinks.insertBefore(document.createElement("div"), catlinks.firstChild);
        catline.id = "mw-normal-catlinks";
    }
    hotcat_append_firstlink(catline);
    hotcat_modify_existing(catline);
    hotcat_append_add_span(catline);
    hotcat_append_multiedit_span(catline);
    if(hotcat_Multi_IsEditPage){
        var CatLine = document.getElementById("catlinks");
        var PreviewWindow = document.getElementById("wikiPreview");
        if((CatLine)&&(PreviewWindow)){
            CatLine.parentNode.removeChild(CatLine);
            insertAfter(PreviewWindow.parentNode, CatLine, PreviewWindow);
            hotcat_update_existing();
        }
    }
}

// DÉTERMINATION DE LA SECTION ÉDITÉE  (si section et section != dernière ou section == new : arrêt hotCats)

function hotcat_getSectionNumber(){
    if(!hotcat_Multi_IsEditPage) return false;
    var SectionNumber = document.editform.wpSection.value;
    if(SectionNumber==="") return false;
    hotcat_Multi_IsSection = SectionNumber;
    if(SectionNumber==="new") return true
    SectionNumber = parseInt(SectionNumber);
    hotcat_Multi_IsSection = SectionNumber;
    if(hotcat_OldPageContent === false) hotcat_OldPageContent = hotcat_getOldPageContent(false);
    var SectionRegExp = new RegExp("[^=\\|\\{\n]*={1,6}[^=\n]+={1,6}\n", "ig");
    var Sections = hotcat_OldPageContent.match(SectionRegExp);
    if(Sections==null) return false;
    if(Sections.length === SectionNumber) return false;
    return true;
}

// CRÉATION DU LIEN "CATÉGORIES"

function hotcat_append_firstlink( catline, plural) {
    if(!hotcat_text_SystemMessage["pagecategorieslink"]||!hotcat_text_SystemMessage["categories"]||!hotcat_text_SystemMessage["pagecategories"]){
        hotcat_GetMessages(false);
    }
    if (!catline.firstChild ){
        var a = document.createElement('a');
        a.href = wgServer+wgArticlePath.split('$1').join(hotcat_text_SystemMessage["pagecategorieslink"]);
        a.title = hotcat_text_SystemMessage["categories"];
        a.appendChild(document.createTextNode(hotcat_PLURAL(hotcat_text_SystemMessage["pagecategories"], plural)));
        catline.appendChild(a);
        catline.appendChild(document.createTextNode(' : '));
    }else{
        catline.firstChild.title = hotcat_text_SystemMessage["categories"];
    }
}

// MODIFICATION DE LA BARRE DE CATÉGORIES

function hotcat_modify_existing( catline) {
    var ul = catline.getElementsByTagName ( "ul" )[0];
    if(!ul){ // ( Mediawiki < 1.18 )
        var spans = catline.getElementsByTagName ( "span" );
        for ( var i = 0, l= spans.length; i < l ; i++ ) {
            hotcat_modify_span ( spans[i], i ) ;
        }
        return;
    }
    var lis = ul.getElementsByTagName ( "li" ) ;
    for ( var i = 0, l= lis.length; i < l ; i++ ) {
        var li = lis[i];
        var cat_link = li.getElementsByTagName('a')[0];
        var span = document.createElement('span');
        li.appendChild(span);
        span.appendChild(cat_link);
        hotcat_modify_span ( span, i ) ;
    }
}

// AJOUT DES LIENS (–) ET (±)

function hotcat_modify_span ( span, i ) {
    if(!hotcat_text_SystemMessage["red-link-title"]) hotcat_GetMessages(false);
    var cat_link = span.getElementsByTagName('a')[0];
    if(!cat_link) return;
    cat_link.id = "CatLink_"+i;
    var cat_title = cat_link.title;
    if(!cat_title) return;
    cat_title = cat_title.split(hotcat_CatNamespace).join('');
    cat_title = cat_title.replace(hotcat_text_SystemMessage["red-link-title"].split('$1').join(''), "");
    var sep1 = document.createTextNode ( " " ) ;
    span.id = "hotcat_Span_" + i ;
    var a1 = document.createTextNode ( "(–)" ) ;
    var remove_link = document.createElement ( "a" ) ;
    var remove_id = "hotcat_remove_" + i ;
    remove_link.id = remove_id;
    remove_link.href = "javascript:hotcat_remove(\"" + cat_title + "\","+i+");" ;
    remove_link.title = hotcat_text_RemoveLinkTitle+" « "+cat_title+" »";
    remove_link.appendChild ( a1 ) ;
    span.appendChild ( sep1 ) ;
    span.appendChild ( remove_link ) ;
    var mod_id = "hotcat_modify_" + i ;
    var sep2 = document.createTextNode ( " " ) ;
    var a2 = document.createTextNode ( "(±)" ) ;
    var modify_link = document.createElement ( "a" ) ;
    modify_link.id = mod_id ;
    modify_link.href = "javascript:hotcat_modify(\""+cat_title+"\"," + i + ");" ;
    modify_link.title = hotcat_text_ModifyLinkTitle+" « "+cat_title+" »";
    modify_link.appendChild ( a2 ) ;
    span.appendChild ( sep2 ) ;
    span.appendChild ( modify_link ) ;
    hotcat_SpanMatrix[i] = span;
    hotcat_CatLinkMatrix[i] = cat_link;
    hotcat_CatLinkIsRedMatrix[i] = !!(hasClass(cat_link, "new"));
    hotcat_CatNameMatrix[i] = cat_title;
    hotcat_RemoveLinkMatrix[i] = remove_link;
    hotcat_ModifyLinkMatrix[i] = modify_link;
}

// AJOUT DU LIEN (+)

function hotcat_append_add_span(catline) {
    var Spans = catline.getElementsByTagName('span');
    var span_add = document.createElement('span');
    var a_add = document.createElement ( "a" ) ;
    var a_text = document.createTextNode ( hotcat_text_AddLinkText ) ;
    span_add.id = "hotcat_add" ;
    a_add.id = "hotcat_addlink" ;
    a_add.href = "javascript:hotcat_add_new("+hotcat_Form_Index+")" ;
    a_add.title = hotcat_text_AddLinkTitle ;
    a_add.appendChild( a_text ) ;
    span_add.appendChild( a_add ) ;
    if(Spans[0]) catline.appendChild(document.createTextNode(' | '));
    catline.appendChild(span_add);
    hotcat_SpanMatrix[hotcat_Form_Index] = span_add;
    hotcat_Form_Index++;
}

///////////////////////// ÉDITION SIMPLE ////////////////////////////////////////////////////////

// FONCTION DE RETRAIT D'UNE CATÉGORIE

function hotcat_remove ( cat_title, Index ) {
    if(!hotcat_Multi_Edit){
        var RemovedCategories = new Array();
        var ModifiedCategories_from = new Array();
        var ModifiedCategories_to = new Array();
        var AddedCategories = new Array();
        RemovedCategories.push(cat_title);
        if (hotcat_SkipConfirm || confirm(hotcat_text_RemoveConfirm+" « " + cat_title + " » ?")) {
            hotcat_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, hotcat_OldDefaultSort);
        }
    }else{
        var Span = hotcat_SpanMatrix[Index];
        if(hasClass(Span, "AddedCatSpan")){
            Span.parentNode.removeChild(Span);
        }else{
            var FirstLink = hotcat_CatLinkMatrix[Index];
            var OldCat = hotcat_CatNameMatrix[Index];
            FirstLink.innerHTML = OldCat;
            FirstLink.title = hotcat_CatNamespace+OldCat;
            FirstLink.href = wgServer+wgArticlePath.split('$1').join(hotcat_CatNamespace+OldCat);
            addClass(FirstLink, 'RemovedCategory');
            removeClass(FirstLink, "ModifiedCategory");
            if(hotcat_CatLinkIsRedMatrix[Index]){
                if(!hasClass(FirstLink, "new")) addClass(FirstLink, "new");
            }else{
                removeClass(FirstLink, "new");
            }
        }
        hotcat_Multi_CheckForChanges();
    }
}

// MODIFICATION D'UNE CATÉGORIE

function hotcat_modify ( catname, Index  ) {
    var link = hotcat_CatLinkMatrix[Index] ;
    var span = hotcat_SpanMatrix[Index] ;
    var Links = span.getElementsByTagName('a');
    for(a=0;a<Links.length;a++){
         Links[a].style.display = "none";
    }
    span.firstChild.style.display = "none" ;
    hotcat_create_new_span ( span , catname, Index ) ;
    hotcat_text_changed(Index);
}

// AJOUT D'UNE CATÉGORIE

function hotcat_add_new (Index) {
    var span_add = document.getElementById( "hotcat_add" ) ;
    span_add.getElementsByTagName('a')[0].style.display = "none";
    hotcat_create_new_span ( span_add , "", Index ) ;
}

// CRÉATION DU FORMULAIRE DE MODIFICATION OU D'AJOUT D'UNE CATÉGORIE

function hotcat_create_new_span ( thespan , init_text, Index ) {
    var DefaultSort = hotcat_defaultSort_getOneOld(init_text);
    if(hasClass(thespan, "AddedCatSpan" )) DefaultSort = hotcat_SortMatrix[Index];
    hotcat_CatNameMatrix[Index] = init_text;
    var form = document.createElement ( "form" ) ;
    form.id = "hotcat_form" + Index;
    form.method = "post" ;
    form.onsubmit = function () {
        var FormIndex = hotcat_getIndex(this);
        hotcat_ok(FormIndex);
        return false;
    } ;
    form.style.display = "inline" ;
    var text = document.createElement ( "input" ) ;
    text.size = 40 ;
    text.id = "hotcat_text" + Index ;
    text.type = "text" ;
    text.value = init_text + DefaultSort ;
    text.onkeyup = function () {
        var FormIndex = hotcat_getIndex(this);
        window.setTimeout("hotcat_text_changed("+FormIndex+");", hotcat_suggestion_delay );
    } ;
    var list = document.createElement ( "select" ) ;
    list.id = "hotcat_list" + Index ;
    list.style.display = "none" ;
    list.onclick = function () {
        var FormIndex = hotcat_getIndex(this);
        hotcat_text_replace(FormIndex);
    } ;
    var exists = document.createElement ( "img" ) ;
    exists.id = "hotcat_exists" + Index ;
    exists.height = hotcat_exists_size ;
    exists.width = hotcat_exists_size ;
    exists.title = hotcat_text_Exists_NoTitle;
    exists.src = hotcat_exists_no ;
    var ParentCats = document.createElement ( "input" ) ;
    ParentCats.id = "hotcat_parents" + Index ;
    ParentCats.type = "button" ;
    ParentCats.value = hotcat_text_ParentText ;
    ParentCats.title = hotcat_text_ParentTitle ;
    ParentCats.onclick = function(){
        var FormIndex = hotcat_getIndex(this);
        hotcat_text_changed(FormIndex, "UP");
    };
    var DaughterCats = document.createElement ( "input" ) ;
    DaughterCats.id = "hotcat_daughters" + Index ;
    DaughterCats.type = "button" ;
    DaughterCats.value = hotcat_text_DaughterText ;
    DaughterCats.title = hotcat_text_DaughterTitle ;
    DaughterCats.onclick = function(){
        var FormIndex = hotcat_getIndex(this);
        hotcat_text_changed(FormIndex, "DOWN");
    };
    var OK = document.createElement ( "input" ) ;
    OK.id = "hotcat_OK" + Index ;
    OK.type = "button" ;
    OK.value = hotcat_text_InputOK ;
    OK.onclick = function(){
        var FormIndex = hotcat_getIndex(this);
        hotcat_ok(FormIndex) ;
    };
    var cancel = document.createElement ( "input" ) ;
    cancel.id = "hotcat_cancel" + Index ;
    cancel.type = "button" ;
    cancel.value = hotcat_text_InputCancel ;
    cancel.onclick = function(){
        var FormIndex = hotcat_getIndex(this);
        hotcat_cancel(FormIndex) ;
    };
    form.appendChild ( text ) ;
    form.appendChild ( list ) ;
    form.appendChild ( exists ) ;
    if ( hotcat_ParentButton ) {
        form.appendChild ( ParentCats ) ;
    }
    if ( hotcat_DaughterButton ) {
        form.appendChild ( DaughterCats ) ;
    }
    form.appendChild ( OK ) ;
    form.appendChild ( cancel ) ;
    thespan.appendChild ( form ) ;
    text.focus () ;
    hotcat_upDate_FormPositions();
    hotcat_FormMatrix[Index] = form;
    hotcat_TextMatrix[Index] = text;
    hotcat_ListMatrix[Index] = list;
    hotcat_ExistMatrix[Index] = exists;
}

// VALIDATION DU FORMULAIRE

function hotcat_ok(Index) {
    var Form = hotcat_FormMatrix[Index];
    var Input = hotcat_TextMatrix[Index];
    var TheSpan = hotcat_SpanMatrix[Index] ;
    var CatLink = hotcat_CatLinkMatrix[Index];
    var IfExist = hotcat_ExistMatrix[Index];
    var OldCatName = hotcat_CatNameMatrix[Index];
    var OldDefaultSort = hotcat_defaultSort_getOneOld(OldCatName);
    var NewCatName = Input.value.ucFirst().replace(/\|.*/, "") ;
    var NewDefaultSort = Input.value.ucFirst().split(NewCatName).join("");
    hotcat_SortMatrix[Index] = NewDefaultSort;
    if ( NewCatName == "" ) {
        hotcat_cancel(Index) ;
        return ;
    }
    if(hotcat_Multi_Edit==false){
        if((OldCatName+OldDefaultSort)==(NewCatName+NewDefaultSort)) return;
        var RemovedCategories = new Array();
        var ModifiedCategories_from = new Array();
        var ModifiedCategories_to = new Array();
        var AddedCategories = new Array();
        if ( TheSpan.id != "hotcat_add" ) {
            ModifiedCategories_from.push(OldCatName+OldDefaultSort);
            ModifiedCategories_to.push(NewCatName+NewDefaultSort);
        }else{
            AddedCategories.push(NewCatName+NewDefaultSort);
        }
        hotcat_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, hotcat_OldDefaultSort);
    }else{
        var Exist = (IfExist.src==hotcat_exists_yes);
        if(TheSpan.id!="hotcat_add"){
            CatLink.innerHTML = NewCatName;
            CatLink.title = hotcat_CatNamespace+NewCatName;
            CatLink.href = wgServer + wgArticlePath.split('$1').join(hotcat_CatNamespace+NewCatName);
            if((!hasClass(CatLink, "AddedCategory"))&&(!hasClass(CatLink, "ModifiedCategory"))) addClass(CatLink,"ModifiedCategory");
            if((OldCatName+OldDefaultSort)==(NewCatName+NewDefaultSort)){
                removeClass(CatLink,"ModifiedCategory");
            }
            removeClass(CatLink,"RemovedCategory");
        }else{
            hotcat_NewCatsIndex++
            hotcat_CatNameMatrix[hotcat_NewCatsIndex] = NewCatName;
            hotcat_SortMatrix[hotcat_NewCatsIndex] = NewDefaultSort;
            var NewSpan = document.createElement('span');
            NewSpan.id = "hotcat_Span_"+hotcat_NewCatsIndex;
            NewSpan.className = "AddedCatSpan";
            CatLink = document.createElement('a');
            CatLink.id = "CatLink_"+hotcat_NewCatsIndex;
            CatLink.innerHTML = NewCatName;
            CatLink.title = hotcat_CatNamespace+NewCatName;
            CatLink.href = wgServer + wgArticlePath.split('$1').join(hotcat_CatNamespace+NewCatName);
            addClass(CatLink,"AddedCategory");
            var RemoveLink = document.createElement('a');
            RemoveLink.innerHTML = hotcat_text_RemoveLinkText;
            RemoveLink.id = "hotcat_remove_"+hotcat_NewCatsIndex;
            RemoveLink.title = hotcat_text_RemoveLinkTitle+" « "+NewCatName+" »";
            RemoveLink.href = "javascript:hotcat_remove(\"" + NewCatName+ "\","+hotcat_NewCatsIndex+");";
            var ModifyLink = document.createElement('a');
            ModifyLink.innerHTML = hotcat_text_ModifyLinkText;
            ModifyLink.id = "hotcat_modify_"+hotcat_NewCatsIndex;
            ModifyLink.title = hotcat_text_ModifyLinkTitle+" « "+NewCatName+" »";
            ModifyLink.href = "javascript:hotcat_modify(\""+NewCatName+"\","+hotcat_NewCatsIndex+ ")";
            NewSpan.appendChild(CatLink);
            NewSpan.appendChild(document.createTextNode(" "));
            NewSpan.appendChild(RemoveLink);
            NewSpan.appendChild(document.createTextNode(" "));
            NewSpan.appendChild(ModifyLink);
            NewSpan.appendChild(document.createTextNode(" | "));
            TheSpan.parentNode.insertBefore(NewSpan, TheSpan);
            hotcat_SpanMatrix[hotcat_NewCatsIndex] = NewSpan;
            hotcat_CatLinkMatrix[hotcat_NewCatsIndex] = CatLink;
            hotcat_RemoveLinkMatrix[hotcat_NewCatsIndex] = RemoveLink;
            hotcat_ModifyLinkMatrix.push[hotcat_NewCatsIndex] = ModifyLink;
        }
        if(!Exist){
            addClass(CatLink,"new");
        }else{
            removeClass(CatLink,"new");
        }
        var Links = TheSpan.getElementsByTagName('a');
        for(var a=0;a<Links.length;a++){
            Links[a].style.display = "";
        }
        TheSpan.removeChild(Form);
        hotcat_Multi_CheckForChanges();
        hotcat_upDate_FormPositions();
        if(TheSpan.id!="hotcat_add"){
            document.getElementById("hotcat_modify_"+Index).focus();
        }else{
            document.getElementById("hotcat_addlink").focus();
        }
    }
}

// ANNULATION DU FORMULAIRE

function hotcat_cancel (Index) {
    var Form = hotcat_FormMatrix[Index];
    var Input = hotcat_TextMatrix[Index];
    var TheSpan = hotcat_SpanMatrix[Index] ;
    var CatLink = hotcat_CatLinkMatrix[Index];
    var IfExist = hotcat_ExistMatrix[Index];
    var OldCatLink = hotcat_RemoveLinkMatrix[Index];
    TheSpan.removeChild ( Form ) ;
    var Links = TheSpan.getElementsByTagName('a');
    for(a=0;a<Links.length;a++){
        Links[a].style.display = "";
    }
    TheSpan.firstChild.style.display = "" ;
    hotcat_Multi_CheckForChanges();
    hotcat_upDate_FormPositions();
    if(TheSpan.id!="hotcat_add"){
        document.getElementById("hotcat_modify_"+Index).focus();
    }else{
        document.getElementById("hotcat_addlink").focus();
    }
}

///////////////////////// ÉDITION MULTIPLE ////////////////////////////////////////////////////////

// AJOUT DU LIEN (±)

function hotcat_append_multiedit_span( CatLine ){
    var FirstLink = CatLine.getElementsByTagName('a')[0];
    var Span = document.createElement('span');
    Span.id ='hotcat_modify_multi_span';
    var Link = document.createElement('a');
    Link.id = "hotcat_modify_multi_Link";
    Link.innerHTML = hotcat_text_MultiLinkText;
    Link.title = hotcat_text_MultiLinkTitle;
    Link.href = "javascript:hotcat_multiedit_createForm();";
    Span.appendChild(Link);
    FirstLink.parentNode.insertBefore(Span, FirstLink.nextSibling);
    FirstLink.parentNode.insertBefore(document.createTextNode(" "), FirstLink.nextSibling);
    var DefaultSortSpan = document.createElement('span');
    DefaultSortSpan.id ='hotcat_DefaultSort_span';
    var DefaultSortLink = document.createElement('a');
    DefaultSortLink.id = "hotcat_DefaultSort_Link";
    DefaultSortLink.innerHTML = hotcat_text_DefaultSortText;
    DefaultSortLink.title = hotcat_text_DefaultSortTitle;
    DefaultSortLink.href = "javascript:hotcat_defaultSort_createForm();";
    DefaultSortSpan.appendChild(DefaultSortLink);
    var OldDefaultSortSpan = document.createElement('span');
    OldDefaultSortSpan.style.display = "none";
    OldDefaultSortSpan.id = "OldDefaultSortSpan";
    DefaultSortSpan.appendChild(OldDefaultSortSpan);
    insertAfter(Span.parentNode, DefaultSortSpan, Span);
    insertAfter(Span.parentNode, document.createTextNode(" "), Span);
    if(hotcat_AutoMulti) hotcat_multiedit_createForm();
}

// CREATION DU FORMULAIRE "MULTI"

function hotcat_multiedit_createForm(){
    var OldForms = document.getElementById('mw-normal-catlinks').getElementsByTagName('form');
    while(OldForms[0]) OldForms[0].parentNode.removeChild(OldForms[0]);
    var OldLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    for(var a=0;a<OldLinks.length;a++){
        OldLinks[a].style.display="";
    }
    for(var a=0;a<hotcat_CatLinkMatrix.length;a++){
        if(!hotcat_CatLinkMatrix[a]) continue;
        if(hotcat_CatLinkIsRedMatrix[a]){
            if(!hasClass(hotcat_CatLinkMatrix[a], "new")) addClass(hotcat_CatLinkMatrix[a], "new");
        }else{
            removeClass(hotcat_CatLinkMatrix[a], "new");
        }
    }
    var OldSpans = document.getElementById('mw-normal-catlinks').getElementsByTagName('span');
    for(var a=0;a<OldSpans.length;a++){
        if(OldSpans[a].id != 'OldDefaultSortSpan') OldSpans[a].style.display="";
    }
    if(!document.getElementById("hotcat_addlink")) hotcat_add_new ( document.getElementById("hotcat_add") );
    var Legend = "";
    if(hotcat_ShowLegend){
        Legend = '<small>'
               + '<a href="'+hotcat_docURL+'" title="'+hotcat_text_LabelTitle+'" target="_blank" '
               + 'style="color:#002BB8;padding:0.2em;margin-left:'+(hotcat_ShowInline ? 5 :100 )+'px;">'
               + '&nbsp;<b>'+hotcat_text_LabelText+'</b>&nbsp;:'
               + '&nbsp;<span class="RemovedCategory">'+hotcat_text_RecapRemove+'</span>'
               + '&nbsp;<span class="ModifiedCategory">'+hotcat_text_RecapModify+'</span>'
               + '&nbsp;<span class="AddedCategory">'+hotcat_text_RecapAdd+'</span>'
               + '</a>'
               + '</small>';
    }
    var BR = "";
    if(!hotcat_ShowInline) BR = "<br />";

    var RadioBoxes = "";
    if(!hotcat_Multi_IsEditPage){
        var MinorOneChecked = ( (hotcat_Minoredit==-1) ? 'checked="checked" ' : '' );
        var MinorTwoChecked = ( (hotcat_Minoredit==0) ? 'checked="checked" ' : '' );
        var MinorThreeChecked = ( (hotcat_Minoredit==1) ? 'checked="checked" ' : '' );
        var WatchOneChecked = ( (hotcat_Watchthis==-1) ? 'checked="checked" ' : '' );
        var WatchTwoChecked = ( (hotcat_Watchthis==0) ? 'checked="checked" ' : '' );
        var WatchThreeChecked = ( (hotcat_Watchthis==1) ? 'checked="checked" ' : '' );
        RadioBoxes = '<span id="hotcat_RadioBoxes">'
                   + '&nbsp;&nbsp;<span style="border:1px dotted silver;padding:0.1em;">'
                   + '<input id="Minor" type="radio" name="Minor" '+MinorOneChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Minoredit+' : '+hotcat_text_RadioDefault+'" />'
                   + '<input id="Minor_0" type="radio" name="Minor" '+MinorTwoChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Minoredit+' : '+hotcat_text_RadioNo+'" />'
                   + '<input id="Minor-1" type="radio" name="Minor" '+MinorThreeChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Minoredit+' : '+hotcat_text_RadioYes+'" />'
                   + '</span>&nbsp;&nbsp;<span style="border:1px dotted silver;padding:0.1em;">'
                   + '<input id="Watch" type="radio" name="Watch" '+WatchOneChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Watchthis+' : '+hotcat_text_RadioDefault+'" />'
                   + '<input id="Watch0" type="radio" name="Watch" '+WatchTwoChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Watchthis+' : '+hotcat_text_RadioNo+'" />'
                   + '<input id="Watch1" type="radio" name="Watch" '+WatchThreeChecked+' style="cursor:pointer;" '
                   + 'title="'+hotcat_text_Watchthis+' : '+hotcat_text_RadioYes+'" />'
                   + '</span>'
                   + '</span>';
    }

    var Link = document.getElementById('hotcat_modify_multi_Link');
    var Span = Link.parentNode;
    var Form = document.createElement('form');
    Form.id = "hotcat_modify_multi_form";
    Form.style.display = "inline";
    Form.innerHTML = ''
                   + Legend
                   + BR
                   + '<input id="hotcat_modify_multi_InputOK" type="button" disabled="disabled" '
                   + 'value="'+hotcat_text_MultiInputOK+'" '
                   + 'onclick="hotcat_multiedit_FormOK()" onselect="hotcat_multiedit_FormOK()" />'
                   + '<input id="hotcat_modify_multi_InputCancel" type="button" '
                   + 'value="'+hotcat_text_MultiInputCancel+'" '
                   + 'onclick="hotcat_multiedit_CancelForm()" onselect="hotcat_multiedit_CancelForm()" />'
                   + RadioBoxes
                   + BR;
    Span.appendChild(Form);
    Link.style.display = "none";
    hotcat_Multi_Edit = true;
    if(!hotcat_AutoMulti) document.getElementById("hotcat_modify_multi_InputCancel").focus();
}

// ANNULATION DU FORMULAIRE "MULTI" + MODIFICATION DES LIENS, FONCTIONS ET IDS DE LA BARRE DE CATÉGORIES

function hotcat_multiedit_CancelForm(){
    var Link = document.getElementById('hotcat_modify_multi_Link');
    var Form = document.getElementById('hotcat_modify_multi_form');
    if(Link) Link.style.display = "inline";
    var CatForms = document.getElementById('mw-normal-catlinks').getElementsByTagName('form');
    while(CatForms[0]){
        CatForms[0].parentNode.removeChild(CatForms[0]);
    }
    var CatSpans = document.getElementById('mw-normal-catlinks').getElementsByTagName('span');
    var SpanToRemove = new Array();
    for(var a=1;a<CatSpans.length;a++){
        if(hasClass(CatSpans[a], "AddedCatSpan")) SpanToRemove.push(CatSpans[a]);
    }
    for(var a=0;a<SpanToRemove.length;a++){
        SpanToRemove[a].parentNode.removeChild(SpanToRemove[a]);
    }
    var CatLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    for(var a=0;a<CatLinks.length;a++){
        CatLinks[a].style.display = "inline";
        removeClass(CatLinks[a], "RemovedCategory");
        if(hasClass(CatLinks[a], "ModifiedCategory")){
            var Index = hotcat_getIndex( CatLinks[a] );
            var Parent = CatLinks[a].parentNode;
            var OldCatName = hotcat_CatNameMatrix[Index];
            var OldDefaultSort = hotcat_defaultSort_getOneOld(OldCatName);
            hotcat_SortMatrix[Index] = OldDefaultSort;
            CatLinks[a].innerHTML = OldCatName;
            CatLinks[a].title = hotcat_CatNamespace+OldCatName;
            CatLinks[a].href = wgServer+wgArticlePath.split('$1').join(hotcat_CatNamespace+OldCatName);
            removeClass(CatLinks[a], "ModifiedCategory");
        }
        if(hasClass(CatLinks[a], "ModifiedDefaultSort")){
            var DefaultSortSpan = document.getElementById("OldDefaultSortSpan");
            DefaultSortSpan.innerHTML = hotcat_OldDefaultSort;
            removeClass(CatLinks[a], "ModifiedDefaultSort");
        }
    }
    for(var a=0;a<hotcat_CatLinkMatrix.length;a++){
        if(!hotcat_CatLinkMatrix[a]) continue;
        if(hotcat_CatLinkIsRedMatrix[a]){
            if(!hasClass(hotcat_CatLinkMatrix[a], "new")) addClass(hotcat_CatLinkMatrix[a], "new");
        }else{
            removeClass(hotcat_CatLinkMatrix[a], "new");
        }
    }
    hotcat_Multi_Edit = false;
    Link.focus();
}

// VALIDATION DU FORMULAIRE "MULTI" + LISTING DES CATÉGORIES À ENLEVER/MODIFIER/AJOUTER

function hotcat_multiedit_FormOK(){
    var RemovedCategories = new Array();
    var ModifiedCategories_from = new Array();
    var ModifiedCategories_to = new Array();
    var AddedCategories = new Array();
    var DefaultSort = hotcat_OldDefaultSort;
    var CatLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    for(var a=0;a<CatLinks.length;a++){
        var Link = CatLinks[a];
        var Index = hotcat_getIndex( Link );
        if(hasClass(Link, "RemovedCategory")){
            RemovedCategories.push(Link.innerHTML.ucFirst());
        }
        if(hasClass(Link, "ModifiedCategory")){
            var NewCatName = Link.innerHTML.ucFirst();
            var OldCatName = hotcat_CatNameMatrix[Index];
            var OldDefaultSort = hotcat_defaultSort_getOneOld(OldCatName);
            var NewDefaultSort = hotcat_SortMatrix[Index];
            if((OldCatName+OldDefaultSort)!=(NewCatName+NewDefaultSort)){
                ModifiedCategories_from.push((OldCatName+OldDefaultSort));
                ModifiedCategories_to.push((NewCatName+NewDefaultSort));
            }
        }
        if(hasClass(Link, "AddedCategory")){
            var NewDefaultSort = hotcat_SortMatrix[Index];
            AddedCategories.push(Link.innerHTML.ucFirst()+NewDefaultSort);
        }
        if(hasClass(Link, "ModifiedDefaultSort")){
            var DefaultSortSpan = document.getElementById("OldDefaultSortSpan");
            DefaultSort = DefaultSortSpan.innerHTML;
        }
    }
    var RadioBoxesSpan = document.getElementById("hotcat_RadioBoxes");
    var RecapMinor = '';
    var RecapWatch = '';
    var Newhotcat_Minoredit = false;
    var Newhotcat_Watchthis = false;
    if(RadioBoxesSpan){
        var RadioBoxes = RadioBoxesSpan.getElementsByTagName('input');
        for(var a=0;a<RadioBoxes.length;a++){
            if(RadioBoxes[a].type!="radio") continue;
            if(!RadioBoxes[a].checked) continue;
            var BoxName = RadioBoxes[a].name;
            var Number = hotcat_getIndex(RadioBoxes[a]);
            if(BoxName=="Minor"){
                RecapMinor += hotcat_text_Minoredit+' : ';
                var Minor = -1;
                var TextMinor = hotcat_text_RadioDefault;
                if(Number==0){
                    Minor = Number;
                    TextMinor = hotcat_text_RadioNo;
                }else if(Number==1){
                    Minor = Number;
                    TextMinor = hotcat_text_RadioYes;
                }
                Newhotcat_Minoredit = Minor;
                RecapMinor += TextMinor+ '\n';
            }else if(BoxName=="Watch"){
                RecapWatch += hotcat_text_Watchthis+' : ';
                var Watch = -1;
                var TextWatch = hotcat_text_RadioDefault;
                if(Number==0){
                    Watch = Number;
                    TextWatch = hotcat_text_RadioNo;
                }else if(Number==1){
                    Watch = Number;
                    TextWatch = hotcat_text_RadioYes;
                }
                Newhotcat_Watchthis = Watch;
                RecapWatch += TextWatch+ '\n';
            }
        }
    }
    var TextrecapTitle = hotcat_text_RecapTitle+'\n\n'
    var TextRecap = TextrecapTitle;
    if(RemovedCategories[0]){
        TextRecap += hotcat_text_RecapRemove+' :\n'
        for(var a=0;a<RemovedCategories.length;a++){
            TextRecap += '* « '+RemovedCategories[a]+' »\n';
        }
    }
    if(ModifiedCategories_to[0]){
        TextRecap += hotcat_text_RecapModify+' :\n';
        for(var a=0;a<ModifiedCategories_to.length;a++){
            TextRecap += '* « '+ModifiedCategories_from[a]+' » -> « '+ModifiedCategories_to[a]+' »\n';
        }
    }
    if(AddedCategories[0]){
        TextRecap += hotcat_text_RecapAdd+' :\n';
        for(var a=0;a<AddedCategories.length;a++){
            TextRecap += '* « '+AddedCategories[a]+' »\n';
        }
    }
    if(DefaultSort!=hotcat_OldDefaultSort){
        TextRecap += hotcat_text_RecapSort+' :\n';
        TextRecap += '* « '+hotcat_OldDefaultSort+' » -> « '+DefaultSort+' »\n';
    }
    if(TextRecap == TextrecapTitle) return;
    TextRecap += RecapMinor;
    TextRecap += RecapWatch;
    if(hotcat_SkipRecap || confirm(TextRecap)){
        hotcat_Minoredit = Newhotcat_Minoredit;
        hotcat_Watchthis = Newhotcat_Watchthis;
        hotcat_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
    }
}

// VÉRIFICATION DES CHANGEMENTS EFFECTUÉS

function hotcat_Multi_CheckForChanges(){
    if(!hotcat_Multi_Edit) return;
    var CatLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    var AnythingChanged = false;
    for(var a=0;a<CatLinks.length;a++){
        var Link = CatLinks[a];
        if((hasClass(Link, "RemovedCategory"))||(hasClass(Link, "ModifiedCategory"))||(hasClass(Link, "AddedCategory"))||(hasClass(Link, "ModifiedDefaultSort"))){
            AnythingChanged = true;
        }
    }
    if(AnythingChanged){
        document.getElementById('hotcat_modify_multi_InputOK').disabled = "";
    }else{
        document.getElementById('hotcat_modify_multi_InputOK').disabled = "disabled";
    }
}

///////////////////////// CLEFS DE TRI ////////////////////////////////////////////////////////

// RÉCUPÉRATION CLEF DE TRI GLOBALE

function hotcat_defaultSort_getOld(ID){
    if(hotcat_OldPageContent == false) hotcat_OldPageContent = hotcat_getOldPageContent(false);
    if(!hotcat_DefaultsortAliases[0]) hotcat_getDefaultsortAliases(false);

    var OldDefaultSpan = document.getElementById(ID);
    if(!OldDefaultSpan) return;
    var Page = hotcat_OldPageContent;
    for(var a=0;a<hotcat_DefaultsortAliases.length;a++){
        if(Page.indexOf('{{'+hotcat_DefaultsortAliases[a]+':')!=-1){
            var AvantCle = Page.substring(0,Page.indexOf('{{'+hotcat_DefaultsortAliases[a]+':'));
            var Cle = Page.split(AvantCle).join('');
            Cle = Cle.substring(0,Cle.indexOf("}"));
            Cle = Cle.substring((Cle.indexOf(":")+1),Cle.length);
            hotcat_OldDefaultSort = Cle;
            OldDefaultSpan.innerHTML = hotcat_OldDefaultSort;
            return;
        }
    }
}

// RÉCUPÉRATION CLEF DE TRI PARTICULIÈRE

function hotcat_defaultSort_getOneOld(TargetCategory){
    if(hotcat_OldPageContent == false) hotcat_OldPageContent = hotcat_getOldPageContent(false);
    var Page = hotcat_OldPageContent;
    var Key = "";
    var CurrentKey = "";
    var REGEXP = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + TargetCategory.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
    var matches = Page.match(REGEXP);
    if (matches != null && matches.length == 1){
        CurrentKey = Page.replace(REGEXP, "DEFAULTKEYstart$2DEFAULTKEYend");
        if((CurrentKey.indexOf("DEFAULTKEYstart")!=-1)&&(CurrentKey.indexOf("DEFAULTKEYend")!=-1)){
            var Before = CurrentKey.split("DEFAULTKEYstart")[0]+"DEFAULTKEYstart";
            var After = "DEFAULTKEYend"+CurrentKey.split("DEFAULTKEYend")[1];
            CurrentKey = CurrentKey.split(Before).join("");
            CurrentKey = CurrentKey.split(After).join("");
            if(CurrentKey.indexOf('|')!=-1) Key = CurrentKey;
        }
    }
    return Key;
}

// CRÉATION FORMULAIRE CLEF DE TRI GLOBALE

function hotcat_defaultSort_createForm(){
    hotcat_defaultSort_getOld("OldDefaultSortSpan");
    var thespan = document.getElementById('hotcat_DefaultSort_span');
    var OldDefaultSort = thespan.getElementsByTagName('span')[0].innerHTML;
    thespan.getElementsByTagName('a')[0].style.display = "none";
    var form = document.createElement ( "form" ) ;
    form.id = "hotcat_form_Default";
    form.method = "post" ;
    form.onsubmit = function () {
        hotcat_Default_ok(this) ;
        return false;
    } ;
    form.style.display = "inline" ;
    var text = document.createElement ( "input" ) ;
    text.size = 40 ;
    text.id = "hotcat_text_Default" ;
    text.type = "text" ;
    text.value = OldDefaultSort ;
    var OK = document.createElement ( "input" ) ;
    OK.type = "button" ;
    OK.value = hotcat_text_InputOK ;
    OK.onclick = function(){
        hotcat_Default_ok(this.parentNode) ;
    };
    var cancel = document.createElement ( "input" ) ;
    cancel.type = "button" ;
    cancel.value = hotcat_text_InputCancel ;
    cancel.onclick = function(){
        var Form = this.parentNode;
        hotcat_Default_Cancel(Form) ;
    };
    form.appendChild ( text ) ;
    form.appendChild ( OK ) ;
    form.appendChild ( cancel ) ;
    thespan.appendChild ( form ) ;
    hotcat_upDate_FormPositions();
    text.focus () ;
}

// ANNULATION FORMULAIRE CLEF DE TRI GLOBALE

function hotcat_Default_Cancel(Form){
    var Span = Form.parentNode;
    Form.parentNode.getElementsByTagName('a')[0].style.display = "";
    Form.parentNode.removeChild(Form) ;
    if(hotcat_Multi_Edit){
        Span.getElementsByTagName('span')[0].innerHTML = hotcat_OldDefaultSort;
        removeClass(Span.getElementsByTagName('a')[0], "ModifiedDefaultSort");
        Span.getElementsByTagName('a')[0].style.display = "";
        hotcat_Multi_CheckForChanges();
    }
    document.getElementById("hotcat_DefaultSort_Link").focus();
}

// VALIDATION FORMULAIRE CLEF DE TRI GLOBALE

function hotcat_Default_ok(Form){
    var Text = document.getElementById("hotcat_text_Default");
    var OldDefaultSort = hotcat_OldDefaultSort;
    var NewDefaultSort = Text.value;
    if(!hotcat_Multi_Edit){
        if(OldDefaultSort==NewDefaultSort){
            hotcat_Default_Cancel(Form)
            return;
        }else{
            var RemovedCategories = new Array();
            var ModifiedCategories_from = new Array();
            var ModifiedCategories_to = new Array();
            var AddedCategories = new Array();
            var DefaultSort = NewDefaultSort ;
            hotcat_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
        }
    }else{
        if(OldDefaultSort==NewDefaultSort){
            hotcat_Default_Cancel(Form)
            return;
        }else{
            var Span = Form.parentNode;
            Span.getElementsByTagName('span')[0].innerHTML = Text.value;
            var Link = Span.getElementsByTagName('a')[0]
            Link.style.display = "";
            addClass(Link, "ModifiedDefaultSort");
            Form.parentNode.removeChild(Form) ;
            hotcat_Multi_CheckForChanges();
            hotcat_upDate_FormPositions();
            document.getElementById("hotcat_DefaultSort_Link").focus();
        }
    }
}


///////////////////////// ÉDITION ////////////////////////////////////////////////////////

function hotcat_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort){
    if(hotcat_Multi_IsEditPage){
        hotcat_autocommit = false;
        hotcat_DoEdit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
        hotcat_multiedit_CancelForm();
        return;
    }
    var URL = wgServer+wgScript+'?title='+encodeURIComponent(wgPageName)+'&action=edit';
    var NouvelleRequete = sajax_init_object();
    NouvelleRequete.open("GET", URL, true);
    NouvelleRequete.onreadystatechange = function() {
        if(NouvelleRequete.readyState != 4) return;
        while(document.body.firstChild){document.body.removeChild(document.body.firstChild);}
        document.body.innerHTML = NouvelleRequete.responseText;
        hotcat_DoEdit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
    };
    NouvelleRequete.send(null);
}

function hotcat_DoEdit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort){
    var prevent_autocommit = 0;
    if(typeof(hotcat_EditCustom)=="function") hotcat_EditCustom();
    if(hotcat_autocommit)document.editform.style.display = "none";
    for(var a=0,l=ModifiedCategories_to.length;a<l;a++){
        ModifiedCategories_to[a] = ModifiedCategories_to[a].replace(new RegExp("^"+hotcat_CatNamespace, "ig"), "");
    }
    for(var a=0,l=AddedCategories.length;a<l;a++){
        AddedCategories[a] = AddedCategories[a].replace(new RegExp("^"+hotcat_CatNamespace, "ig"), "");
    }
    var OldText = document.getElementById('wpTextbox1').value;
    var summary = new Array();
    for(var a=0;a<RemovedCategories.length;a++){
        var OldCatName = RemovedCategories[a];
        var OldCatNameUnsorted = OldCatName.replace(/\|.*/, "");
        var REGEXP = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + OldCatName.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
        var matchesCatName = OldText.match(REGEXP);
        if (matchesCatName != null && matchesCatName.length == 1) {
            OldText = OldText.replace(REGEXP, "");
            summary.push( " – [[" + hotcat_CatNamespace+OldCatNameUnsorted + "]]" ) ;
        }else{
            prevent_autocommit = 1
            if(matchesCatNameUnsorted == null){
                alert(hotcat_text_AlertProblem1.split('$1').join(OldCatNameUnsorted));
            }else if(matchesCatNameUnsorted.length > 1){
                alert(hotcat_text_AlertProblem3.split('$1').join(OldCatNameUnsorted));
            }
        }
    }
    if((RemovedCategories[0])&&((ModifiedCategories_from[0])||(AddedCategories[0]))) summary.push(" |");
    for(var a=0;a<ModifiedCategories_from.length;a++){
        var OldCatName = ModifiedCategories_from[a];
        var OldCatNameUnsorted = OldCatName.replace(/\|.*/, "");
        var NewCatName = ModifiedCategories_to[a];
        var NewCatNameUnsorted = NewCatName.replace(/\|.*/, "");
        var REGEXP_OLD = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + OldCatName.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
        var REGEXP_NEW = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + NewCatNameUnsorted.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
        var matchesOldCatName = OldText.match(REGEXP_OLD);
        var matchesNewCatName = OldText.match(REGEXP_NEW);
        if( ((matchesNewCatName == null)||(OldCatNameUnsorted==NewCatNameUnsorted)) && matchesOldCatName != null &&  matchesOldCatName.length == 1) {
            OldText = OldText.replace(REGEXP_OLD, "$1[[" + hotcat_CatNamespace+NewCatName + "]]");
            summary.push ( " ± [["+hotcat_CatNamespace+OldCatNameUnsorted+"]]->[["+hotcat_CatNamespace+ NewCatNameUnsorted+"]]");
        }else{
            prevent_autocommit = 1
            if(matchesOldCatName == null){
                alert(hotcat_text_AlertProblem1.split('$1').join(OldCatNameUnsorted));
            }else if(matchesOldCatName.length > 1){
                alert(hotcat_text_AlertProblem3.split('$1').join(OldCatNameUnsorted));
            }else if((matchesNewCatName != null)&&(OldCatNameUnsorted!=NewCatNameUnsorted)){
                alert(hotcat_text_AlertProblem2.split('$1').join(NewCatNameUnsorted));
            }
        }
    }
    if((AddedCategories[0])&&(ModifiedCategories_from[0])) summary.push(" |");
    for(var a=0;a<AddedCategories.length;a++){
        var NewCatName = AddedCategories[a];
        var NewCatNameUnsorted = NewCatName.replace(/\|.*/, "");
        var REGEXP = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + NewCatNameUnsorted.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
        var matchesCatNameUnsorted = OldText.match(REGEXP);
        if (matchesCatNameUnsorted != null){
            alert(hotcat_text_AlertProblem2.split('$1').join(NewCatNameUnsorted));
            prevent_autocommit = 1
            continue;
        }
        var re = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig")
        var index = -1;
        while (re.exec(OldText) != null) index = re.lastIndex;
        var txt = "[[" + hotcat_CatNamespace+NewCatName + "]]" ;
        if (index < 0) {  // no category
            var interWiki = new RegExp('^\\s*\\[\\[([a-z][a-z].?(x?-[^\\]]+)?|simple|tokipona):([^\\]]*)\\]\\]\\s*$');
            var blank = new RegExp('^\\s*$');
            var lines = OldText.split('\n');
            var DebutModele = '';
            var SuiteModele = '';
            for (var lineId = lines.length - 1; lineId >= 0; --lineId){
                if (!interWiki.test(lines[lineId]) && !blank.test(lines[lineId])) {
                    DebutModele = lines.slice(0, lineId + 1).join('\n') + '\n\n';
                    SuiteModele = lines.slice(lineId + 1).join('\n');
                    break;
                }
            }
            if (DebutModele === '') {
                // edge case: source has nothing else than interwikis
                SuiteModele = OldText;
            }
            while(SuiteModele.indexOf('\n\n')!=-1){
                SuiteModele = SuiteModele.split("\n\n").join("\n");
            }
            SuiteModele = SuiteModele.replace(/^\n/, "");
            OldText = DebutModele + txt + '\n\n' + SuiteModele;
        }else{
            OldText = OldText.substring(0, index) + '\n' + txt + OldText.substring(index);
        }
        summary.push ( " + [[" + hotcat_CatNamespace+NewCatNameUnsorted + "]]" ) ;
    }
    if((DefaultSort!=hotcat_OldDefaultSort)&&(DefaultSort!="undefined")){
        var NewDefaultSort = "{{DEFAULTSORT:"+DefaultSort+"}}\n";
        var HasDefaultSort = null;
        for(var d=0;d<hotcat_DefaultsortAliases.length;d++){
            if(OldText.indexOf(hotcat_DefaultsortAliases[d])!=-1) HasDefaultSort = hotcat_DefaultsortAliases[d]+":";
        }
        if(HasDefaultSort!=null){
            if(DefaultSort==""){
                NewDefaultSort = "";
                summary.push (";  – " + hotcat_OldDefaultSort ) ;
            }else{
                summary.push (";  ± {{DEFAULTSORT:}} : " + hotcat_OldDefaultSort + " -> " + DefaultSort ) ;
            }
            OldText = OldText.split("{{"+HasDefaultSort+hotcat_OldDefaultSort+"}}\n").join(NewDefaultSort);
            OldText = OldText.split("{{"+HasDefaultSort+hotcat_OldDefaultSort+"}}").join(NewDefaultSort);
        }else if(DefaultSort!=""){
            var re = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig")
            var index = re.exec(OldText);
            if(index ==null ) {
                var interWiki = new RegExp('^\\s*\\[\\[([a-z][a-z].?(x?-[^\\]]+)?|simple|tokipona):([^\\]]*)\\]\\]\\s*$');
                var blank = new RegExp('^\\s*$');
                var lines = OldText.split('\n');
                var DebutModele = '';
                var SuiteModele = '';
                for (var lineId = lines.length - 1; lineId >= 0; --lineId){
                    if (!interWiki.test(lines[lineId]) && !blank.test(lines[lineId])) {
                        DebutModele = lines.slice(0, lineId + 1).join('\n') + '\n\n';
                        SuiteModele = lines.slice(lineId + 1).join('\n');
                        break;
                    }
                }
                if (DebutModele === '') {
                    // edge case: source has nothing else than interwikis
                    SuiteModele = OldText;
                }
                SuiteModele = SuiteModele.replace(/^\n/, "");
                OldText = DebutModele + NewDefaultSort + '\n' + SuiteModele;
            }else{
                var lastindex = (re.lastIndex);
                var compile = re.compile(re);
                var FirstCat = re.exec(OldText).toString();
                FirstCat = FirstCat.replace(/\n/g, "");
                var Before = OldText.substring(0, lastindex).replace(FirstCat, "");
                var After = FirstCat+OldText.substring(lastindex)
                OldText = Before + NewDefaultSort + After;
            }
            summary.push (";  + " + NewDefaultSort ) ;
        }
    }
    var cat = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig");
    var nocat1 = "{{"+hotcat_text_NoCatTemplate.ucFirst()+"}}\n";
    var nocat1Bis = "{{"+hotcat_text_NoCatTemplate.lcFirst()+"}}\n";
    var nocat2 = "{{"+hotcat_text_NoCatTemplate.ucFirst()+"}}";
    var nocat2Bis = "{{"+hotcat_text_NoCatTemplate.lcFirst()+"}}";
    if(cat.exec(OldText) != null){
        OldText = OldText.split(nocat1).join("");
        OldText = OldText.split(nocat1Bis).join("");
        OldText = OldText.split(nocat2).join("");
        OldText = OldText.split(nocat2Bis).join("");
    }
    document.getElementById('wpTextbox1').value = OldText;
    document.getElementById('wpSummary').value = hotcat_text_ResumeScript + summary.join("");
    if(!hotcat_Multi_IsEditPage){
        if(hotcat_Minoredit==1) document.editform.wpMinoredit.checked = true;
        if(hotcat_Minoredit==0) document.editform.wpMinoredit.checked = false;
        if(hotcat_Watchthis==1) document.editform.wpWatchthis.checked = true;
        if(hotcat_Watchthis==0) document.editform.wpWatchthis.checked = false;
    }
    if((hotcat_autocommit)&&(prevent_autocommit != 1)) document.editform.submit();
    if(prevent_autocommit == 1) document.editform.style.display = "";
    if(hotcat_Multi_IsEditPage) hotcat_update_existing();
}
///////////////////////// SUGGESTIONS ////////////////////////////////////////////////////////

// REQUÊTE DE SUGGESTIONS

function hotcat_text_changed (FormIndex, Mode, titles, catContinue) {
    if ( hotcat_suggest_running ) return ;
    if(!Mode) Mode = false;
    if((!FormIndex)||(FormIndex=="")) FormIndex = "0";
    if(!titles) titles = new Array () ;
    if(!catContinue) catContinue = "";
    var text = hotcat_TextMatrix[FormIndex];
    if(!text){alert('PB hotcat_text_changed () : ' + FormIndex); return; }
    var v = text.value;
    v = v.replace(new RegExp("^"+hotcat_CatNamespace, "ig"), "");
    v = v.ucFirst() ;
    text.value = v;
    if(v.indexOf("|")!=-1) v = v.split("|")[0];
    var APILimit = ( ((wgUserGroups.indexOf("sysop")!=-1)||(wgUserGroups.indexOf("bot")!=-1)) ? 4999 : 499 );
    if(hotcat_list_items>APILimit) hotcat_list_items = APILimit; // API max
    if(Mode=="UP"){ // Suggestions catégories-mères
        var URL = "/api.php?format=xml&action=query&prop=categories&titles=" + hotcat_CatNamespace+encodeURIComponent(v) + "&cllimit=" + hotcat_list_items;
        var TagName = "cl";
        var Replace = false;
    }else if(Mode=="DOWN"){ // Suggestions catégories-filles
        var URL = "/api.php?format=xml&action=query&list=categorymembers&cmnamespace=14&cmtitle=" + hotcat_CatNamespace+encodeURIComponent(v) + "&cmlimit=" + APILimit + catContinue;
        var TagName = "cm";
        var Replace = false;
    }else{ // Suggestions normales
        var URL =  "/api.php?format=xml&action=query&list=allpages&apnamespace=14&apfrom=" + encodeURIComponent(v) + "&aplimit=" + hotcat_list_items;
        var TagName = "p";
        var Replace = true;
    }
    hotcat_suggest_running = 1 ;
    if ( v != "" ) {
        if ( typeof ( hotcat_xmlhttp ) != "undefined" ) hotcat_xmlhttp.abort() ;
        hotcat_xmlhttp = new sajax_init_object() ;
        hotcat_xmlhttp.open('GET', wgServer + wgScriptPath + URL, true);
        hotcat_xmlhttp.onreadystatechange = function () {
            if ( typeof hotcat_xmlhttp == "undefined" ) return ;
            if (hotcat_xmlhttp.readyState == 4) {
                var xml = hotcat_xmlhttp.responseXML ;
                if ( xml == null ) return ;
                var pages = xml.getElementsByTagName( TagName ) ;
                for ( var i = 0 ; i < pages.length ; i++ ) {
                    var s = pages[i].getAttribute("title");
                    if(s.indexOf(hotcat_CatNamespace)!=-1){
                        s = s.split(hotcat_CatNamespace).join('');
                        titles.push ( s ) ;
                    }
                }
                var CanContinue = xml.getElementsByTagName("query-continue")[0];
                if(Mode=="DOWN"&&CanContinue){
                    CanContinueId = "&cmcontinue="+encodeURIComponent(CanContinue.firstChild.getAttribute("cmcontinue"));
                    hotcat_suggest_running = 0 ;
                    hotcat_text_changed(FormIndex, Mode, titles ,CanContinueId) ;
                }else{
                    hotcat_show_suggestions(titles, FormIndex, Replace);
                }
            }
        };
        hotcat_xmlhttp.send(null);
    } else {
        hotcat_show_suggestions ( titles , FormIndex, Replace ) ;
    }
}

// AFFICHAGE DES SUGGESTIONS

function hotcat_show_suggestions ( titles, FormIndex, Replace, Mode ) {
    hotcat_suggest_running = 0 ;
    var text = hotcat_TextMatrix[FormIndex] ;
    var list = hotcat_ListMatrix[FormIndex] ;
    var icon = hotcat_ExistMatrix[FormIndex] ;
    if((!text)||(!list)||(!icon)) { alert('PB hotcat_show_suggestions() : ' + FormIndex); return; }
    if(titles.length==0){
        list.style.display = "none" ;
        if(Replace){
            icon.src = hotcat_exists_no ;
            icon.title = hotcat_text_Exists_NoTitle ;
        }
        return ;
    }
    var TailleListe = hotcat_list_size;
    if (titles.length < TailleListe ) TailleListe = titles.length;
    var listh = TailleListe * 20 ;
    list.size = 5 ;
    list.style.align = "left" ;
    list.style.zIndex = 5;
    list.style.position = "relative" ;
    list.style.width = text.offsetWidth + "px" ;
    list.style.height = listh + "px" ;
    while ( list.firstChild ) list.removeChild ( list.firstChild ) ;
    for ( var i = 0 ; i < titles.length ; i++ ) {
        var opt = document.createElement ( "option" ) ;
        var ot = document.createTextNode ( titles[i] ) ;
        opt.appendChild ( ot ) ;
        opt.value = titles[i];
        list.appendChild ( opt ) ;
    }
    if(hotcat_list_down){
        list.style.top = parseInt(text.offsetHeight) + "px";
        list.style.marginBottom = "-" + (listh + parseInt(text.offsetHeight)) + "px" ;
    }else{
        list.style.marginTop = "-" + listh + "px" ;
    }
    list.style.marginLeft = "-" + text.offsetWidth + "px" ;
    list.onkeyup = hotcat_KeypressedOnList;
    list.style.display = "inline" ;
    icon.title = hotcat_text_Exists_YesTitle ;
    icon.src = hotcat_exists_yes ;
    var first_title = titles.shift () ;
    hotcat_last_v = text.value.ucFirst();
    var hotcat_last_v_Split = hotcat_last_v;
    if(hotcat_last_v.indexOf('|')!=-1){
       hotcat_last_key = hotcat_last_v.substring(hotcat_last_v.indexOf("|"), hotcat_last_v.length);
       hotcat_last_v_Split = hotcat_last_v.split(hotcat_last_key).join('');
    }else{
       hotcat_last_key = "";
    }
    if ( first_title == hotcat_last_v_Split ) return ;
    if(Replace){
        var suggestion = first_title;
        if(suggestion.indexOf(hotcat_last_v_Split)==-1){
            icon.src = hotcat_exists_no ;
            icon.title = hotcat_text_Exists_NoTitle ;
            return;
        }
        text.value = suggestion + hotcat_last_key ;
        if (text.createTextRange) {
            var ra = text.createTextRange();
            ra.moveStart("character", hotcat_last_v.length);
            ra.moveEnd("character", suggestion.length);
            ra.select();
        } else if( text.setSelectionRange ) {
            text.setSelectionRange( hotcat_last_v.length, suggestion.length );
        } else {
            text.selectionStart = hotcat_last_v.length ;
            text.selectionEnd = suggestion.length ;
        }
    }else{
        list.focus();
    }
}

// MISE A JOUR DE LA POSITION DES LISTES DE SUGGESTIONS

function hotcat_upDate_FormPositions(){
    var AllForms = document.getElementById('mw-normal-catlinks').getElementsByTagName('form');
    for(var a=0;a<AllForms.length;a++){
        if(AllForms[a].id == "hotcat_modify_multi_form") continue;
        if(AllForms[a].id == "hotcat_form_Default") continue;
        var ThisForm = AllForms[a];
        var ThisSelect = ThisForm.getElementsByTagName('select')[0];
        var Options = ThisSelect.getElementsByTagName('option');
        var ThisInput = ThisForm.getElementsByTagName('input')[0];
        var ListHeight = hotcat_list_size * 20 ;
        if (Options.length < hotcat_list_size) {
            ListHeight = Options.length * 20 ;
        }
        if(hotcat_list_down){
            ThisSelect.style.top = parseInt(ThisInput.offsetHeight) + "px";
            ThisSelect.style.marginBottom = "-" + (ListHeight + parseInt(ThisInput.offsetHeight)) + "px" ;
        }else{
            ThisSelect.style.marginTop = "-" + ListHeight + "px" ;
        }
        ThisSelect.style.marginLeft = "-" + ThisInput.offsetWidth + "px" ;
    }
}

// SÉLECTION D'UNE SUGGESTION AU CLAVIER

function hotcat_KeypressedOnList(e){
    if (!e) var e = window.event;
    if (e.keyCode != 13) return;
    hotcat_text_replace(hotcat_getIndex(this));
}

// REMPLACEMENT DU CHAMP DE TEXTE PAR UNE SUGGESTION

function hotcat_text_replace(Index){
    var Text = hotcat_TextMatrix[Index];
    var TextValue = Text.value;
    var List = hotcat_ListMatrix[Index];
    var Options = List.getElementsByTagName('option');
    for(var a=0;a<Options.length;a++){
        if(Options[a].selected){
            var ListValue = Options[a].value;
            if(TextValue.indexOf('|')!=-1){
                hotcat_last_key = TextValue.substring(TextValue.indexOf("|"), TextValue.length);
            }
            Text.value = ListValue + hotcat_last_key;
            hotcat_text_changed(Index) ;
            Text.focus();
            return;
        }
    }
}

///////////////////////// MISE A JOUR BARRE DE CATÉGORIES ////////////////////////////////////////////////////////

function hotcat_update_existing(){
    var OldText = document.getElementById("wpTextbox1").value;
    OldText = hotcat_update_existing_Strip(OldText);
    var catRegExp = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig");
    var Matches = OldText.match(catRegExp);
    var Cats = new Array();
    if(Matches != null){
        for(var a=0,l=Matches.length;a<l;a++){
            var ThisMatch = Matches[a];
            ThisMatch = ThisMatch.replace(new RegExp("\\[\\[(" + wgFormattedNamespaces[14]+"|Category):", "ig"), "");
            ThisMatch = ThisMatch.replace(new RegExp("\\]\\]", "ig"), "");
            var ThisCat = ThisMatch.replace(/\|.*/g, "");
            Cats.push(ThisCat);
        }
    }
    hotcat_update_existing_Exists(Cats);
}

function hotcat_update_existing_Strip(Text){
   Text = hotcat_update_existing_StripTag(Text, "<nowiki[^>]*>", "</"+"nowiki>");
   Text = hotcat_update_existing_StripTag(Text, "<includeonly[^>]*>", "</"+"includeonly>");
   Text = hotcat_update_existing_StripTag(Text, "<pre[ ]+[^>]*>", "</"+"pre>");
   Text = hotcat_update_existing_StripTag(Text, "<source[ ]+[^>]*>", "</"+"source>");
   Text = hotcat_update_existing_StripTag(Text, "<syntaxhighlight[ ]*[^>]*>", "</"+"syntaxhighlight>");
   Text = hotcat_update_existing_StripTag(Text, "<!--[\\-]*", "-->");
   return Text;
}

function hotcat_update_existing_StripTag(Text, StartTag, EndTag){
   var TagRegExp = new RegExp(StartTag, "ig");
   var Matches = Text.match(TagRegExp);
   if(Matches!=null){
      for(var a=0,l=Matches.length;a<l;a++){
         var BeforeTag = Text.substring(0, Text.indexOf(Matches[a]));
         var AfterTag = Text.substring(BeforeTag.length, Text.length);
         if(AfterTag.indexOf(EndTag)==-1){
            AfterTag = "";
         }else{
            AfterTag = AfterTag.substring( (AfterTag.indexOf(EndTag) + (EndTag.length)) , AfterTag.length);
         }
         Text = BeforeTag + AfterTag;
         if(Text.match(TagRegExp)==null) break;
      }
   }
   return Text;
}

function hotcat_update_existing_Exists(Cats, NewCats){
    if(!Cats[0]){
        hotcat_update_existing_Update(Cats, NewCats);
        return;
    }
    if(!NewCats) NewCats = new Array();
    var CatTitles = wgFormattedNamespaces[14]+":" + Cats.join('|'+wgFormattedNamespaces[14]+":").replace(/&/g, "%26");

    var NouvelleRequete = sajax_init_object();
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=info&titles=' + CatTitles ;
    NouvelleRequete.open("GET", URL, true);
    NouvelleRequete.onreadystatechange = function() {
        if(NouvelleRequete.readyState != 4 ) return;
        var ObjetXML = NouvelleRequete.responseXML;
        if(!ObjetXML){
            hotcat_update_existing_Update(Cats, NewCats);
            return;
        }
        var Pages = ObjetXML.getElementsByTagName('page');
        for(var a=0,l=Pages.length;a<l;a++){
            var Page = Pages[a];
            var Title = Page.getAttribute("title").split(wgFormattedNamespaces[14] + ":").join("");
            var Index= Cats.indexOf(Title);
            if(Index==-1) continue;
            var Missing = Page.getAttribute("missing");
            if(Missing==""){
                NewCats[Index] = true;
            }else{
                NewCats[Index] = false;
            }
        }
        hotcat_update_existing_Update(Cats, NewCats);
    };
    NouvelleRequete.send(null);
}

function hotcat_update_existing_Update(Cats, NewCats){
    var CatLine = document.getElementById("mw-normal-catlinks");
    var catline = document.createElement("div");
    catline.id = "mw-normal-catlinks";
    CatLine.parentNode.insertBefore(catline, CatLine);
    var plural = (Cats.length != 1);
    hotcat_append_firstlink( catline, plural);
    for(var a=0,l=Cats.length;a<l;a++){
        var Cat = Cats[a];
        var  Link = document.createElement('a');
        Link.title = wgFormattedNamespaces[14] + ":" + Cat;
        Link.appendChild(document.createTextNode(Cat));
        Link.href = wgServer + wgArticlePath.split('$1').join(wgFormattedNamespaces[14] + ":" + encodeURI(Cat));
        if(NewCats[a]) Link.className = "new";
        var Span = document.createElement('span');
        Span.appendChild(Link);
        if(a!=0) catline.appendChild(document.createTextNode(' | '));
        catline.appendChild(Span);
    }
    var  HiddenCatsLink = document.getElementById(hotcat_HiddenCatsLinkID);
    if(HiddenCatsLink){
      HiddenCatsLink.parentNode.removeChild(HiddenCatsLink);
      catline.appendChild(document.createTextNode(' | '));
      catline.appendChild(HiddenCatsLink);
    }
    CatLine.parentNode.removeChild(CatLine);
    hotcat_modify_existing(catline);
    hotcat_append_add_span(catline);
    hotcat_append_multiedit_span(catline);
}


///////////////////////// DIVERS ////////////////////////////////////////////////////////

// RÉCUPÉRATION DU N° D'INDEX

function hotcat_getIndex( Element ){
    return parseInt(Element.id.replace(/[^0-9]/g, ""));
}

// GESTION {{PLURAL:}} (MESSAGES SYSTÈME)

function hotcat_PLURAL(Text, Plural){
    var PluralRegExp = new RegExp("\\{\\{PLURAL[^\\}]+\\}\\}", "ig")
    var Matches = Text.match(PluralRegExp);
    if(Matches!=null){
        for(var b=0,m=Matches.length;b<m;b++){
            var Match = Matches[b];
            var Params = Match.split('}}').join('').split('|');
            var Result = "";
            if(Plural){
                Result = Params[2];
            }else{
                Result = Params[1];
            }
            if(!Result) Result = "";
            Text = Text.replace(Match, Result);
        }
    }
    return Text;
}

// GESTION {{GENDER:}} (MESSAGES SYSTÈME)

function hotcat_GENDER(Text, Gender){
    var PluralRegExp = new RegExp("\\{\\{GENDER[^\\}]+\\}\\}", "ig")
    var Matches = Text.match(PluralRegExp);
    if(Matches!=null){
        for(var b=0,m=Matches.length;b<m;b++){
            var Match = Matches[b];
            var Params = Match.split('}}').join('').split('|');
            var Result = "";
            if(Gender=="male"){
                Result = Params[1];
            }else if(Gender=="female"){
                Result = Params[2];
            }else{
                Result = Params[3];
            }
            if(!Result) Result = "";
            Text = Text.replace(Match, Result);
        }
    }
    return Text;
}

// PREMIÈRE LETTRE EN MAJUSCULE

String.prototype.ucFirst = function () {
    return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
}

// PREMIÈRE LETTRE EN MINUSCULE

String.prototype.lcFirst = function () {
    return this.substr(0,1).toLowerCase() + this.substr(1,this.length);
}

// MANIPULATION DE CLASSES

if(typeof(removeClass)!="function"){
    removeClass = function(node, className) {
        if (!hasClass(node, className)) {
            return false;
        }
        node.className = node.className.replace(new RegExp('(^|\\s+)'+ className +'($|\\s+)','g'), ' ');
        return true;
    };
}

if(typeof(addClass)!="function"){
    addClass = function(node, className) {
        if (hasClass(node, className)) {
            return false;
        }
        node.className += ' '+ className;
        return true;
    };
}

if(typeof(hasClass)!="function"){
    hasClass = function(node, className) {
        if (node.className == className) {
            return true;
        }
        var reg = new RegExp('(^| )'+ className +'($| )')
        if (reg.test(node.className)) {
            return true;
        }
        return false;
    };
}

// INSERT AFTER

if(typeof(insertAfter)!="function"){
    insertAfter = function(parent, node, referenceNode) {
        parent.insertBefore(node, referenceNode.nextSibling);
    };
}

//</nowiki></pre></source>