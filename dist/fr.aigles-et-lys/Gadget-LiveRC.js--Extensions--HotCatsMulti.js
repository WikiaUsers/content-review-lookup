/* 
 --------------------------------------------------------------------------------------
 ---------LLLL---------III--------------------------RRRRRRRRRR--------CCCCC------------
 ---------LLLL---------III--------------------------RRRRRRRRRRRR----CCCCCCCCC----------
 ---------LLLL--------------------------------------RRR------RRR---CCC-----CCC---------
 ---------LLLL---------III--VV-----VV--EEEEEEEEE----RRR------RRR--CCC------------------
 ---------LLLL---------III---VV---VV---EEE----------RRRRRRRRRRR---CCC------------------
 ---------LLLL---------III---VV---VV---EEEEEE-------RRRRRRRRRR----CCC------------------
 ---------LLLL---------III----VV-VV----EEEEEE-------RRR-----RRR----CCC-----CCC---------
 ---------LLLLLLLLLLL--III----VVVVV----EEE----------RRR------RRR----CCCCCCCCC----------
 ---------LLLLLLLLLLL--III-----VVV-----EEEEEEEEE----RRR-------RRR-----CCCCC------------
 --------------------------------------------------------------------------------------
 
'''Extension de LiveRC'''
 
// Permet d'améliorer la prévisualisation avec les fonctions de HotCatsMulti
 
* Licence : ...?
* Documentation : 
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 

///////////////////////// VARIABLES ////////////////////////////////////////////////////////

//// PARAMÈTRES PERSONNALISABLES ////

var lrcHotCatsVariables = {
     suggestion_delay : 200, // Délai avant les suggestions, en ms
     list_size        : 10,  // Taille de la liste déroulante (en items)
     list_items       : 50,  // Nombre de catégories suggérées lors de la recherche (maximum autorisé : 4999 pour les sysop et les bots, 499 pour les autres utilisateurs)
     Minoredit        : 1,   // Modification mineure ( -1 = défaut ; 0 = jamais ; 1 = toujours )
     Watchthis        : -1,  // Suivre la page modifiée ( -1 = défaut ; 0 = jamais ; 1 = toujours )
     exists_size      : 20,  // Icônes pour signifier l'existence ou non de la catégorie choisie
     exists_yes       : "//upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png", 
     exists_no        : "//upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png", 
     docURL           : "//fr.wikipedia.org/wiki/Projet:JavaScript/Notices/HotCatsMulti#Fonctionnement",  // Lien vers la documentation
     list_down        : false, // Permet d'afficher la liste de suggestion vers le bas
     autocommit       : true,  // Permet de publier automatiquement la modification
     AutoMulti        : false, // Activation automatique du mode "multi"
     ShowLegend       : false,  // Afficher de la légende
     ShowInline       : false, // Afficher sur une seule ligne
     SkipRecap        : false, // Ne pas afficher le récapitulatif
     DebugMode        : false  // Mode débuggage
}

var lrcHotCats_HiddenCatsLinkID = "mw-hidden-cats-link"; // ID du lien pour les catégories cachées

//// TEXTES ////

var lrcHotCatsText = {
     MultiLinkText    : "(±)",
     MultiLinkTitle   : "Modifier plusieurs catégories",
     MultiInputOK     : "Valider",
     MultiInputCancel : "Annuler",
     Minoredit        : "Édition mineure",
     Watchthis        : "Suivre cette page",
     RadioDefault     : "Défaut",
     RadioYes         : "Oui",
     RadioNo          : "Non",
     LabelText        : "Légende",
     LabelTitle       : "Voir la page d\'aide (nouvelle fenêtre)",
     DefaultSortText  : "(D)",
     DefaultSortTitle : "Ajouter/modifier/supprimer la clef de tri principale",
     RemoveLinkText   : "(–)",
     RemoveLinkTitle  : "Supprimer la catégorie",
     RemoveConfirm    : "Voulez-vous vraiment supprimer la catégorie",
     ModifyLinkText   : "(±)",
     ModifyLinkTitle  : "Modifier la catégorie",
     AddLinkText      : "(+)",
     AddLinkTitle     : "Ajouter une catégorie",
     Exists_YesTitle  : "Cette catégorie existe.",
     Exists_NoTitle   : "Cette catégorie n'existe pas.",
     ParentTitle      : "Suggérer les catégories-mères",
     ParentText       : "↑",
     DaughterTitle    : "Suggérer les catégories-filles",
     DaughterText     : "↓",
     InputOK          : "OK",
     InputCancel      : "Annuler",
     RecapTitle       : 'Récapitulatif :',
     RecapRemove      : 'Catégories à supprimer',
     RecapModify      : 'Catégories à modifier',
     RecapAdd         : 'Catégories à ajouter',
     RecapSort        : 'Clef de tri globale',
     ResumeScript     : "[[Projet:JavaScript/Notices/HotCatsMulti|HotCatsMulti]] : ",
     AlertProblem1    : "Impossible de trouver la catégorie « $1 » - elle est peut-être incluse via un modèle.",
     AlertProblem2    : "La catégorie « $1 » est déjà présente.",
     AlertProblem3    : "Plusieurs occurrences de la catégorie « $1 » trouvées.",
     NoCatTemplate    : "à catégoriser"
}

//// VARIABLES NON PERSONNALISABLES ////

var lrcHotCatsMatrix = {
     Span         : new Array(),
     CatLink      : new Array(),
     CatLinkIsRed : new Array(),
     RemoveLink   : new Array(),
     ModifyLink   : new Array(),
     Form         : new Array(),
     Text         : new Array(),
     List         : new Array(),
     Exist        : new Array(),
     CatName      : new Array(),
     Sort         : new Array()
}

var lrcHotCats_Multi_Edit = false ;
var lrcHotCats_suggest_running = 0 ;
var lrcHotCats_running = 0 ;
var lrcHotCats_last_v = "" ;
var lrcHotCats_last_key = "";
var lrcHotCats_OldDefaultSort = "";
var lrcHotCats_OldPageContent = "";
var lrcHotCats_Form_Index = 1000;
var lrcHotCats_NewCatsIndex = 2000;
var lrcHotCats_CatNamespace = wgFormattedNamespaces[14]+':';
var lrcHotCats_DefaultsortAliases = new Array();
var lrcHotCats_CurrentPage = false;
var lrcHotCats_IsEditMode = false;

// Messages système
lrcNeededMessages.push("pagecategorieslink");
lrcNeededMessages.push("categories");
lrcNeededMessages.push("pagecategories");

// Paramètres de personnalisation
lrcManageParams_Desc['DesclrcHotCatsVariables'] = new Array('Paramètres de HotCats', 'Paramètres HotCats');
lrcManageParams_Desc['DesclrcHotCatsText'] = new Array('Textes de HotCats', 'Textes HotCats');


///////////////////////// LANCEMENT ////////////////////////////////////////////////////////

importStylesheetURI('//fr.aigles-et-lys.wikia.com/wiki/MediaWiki:Gadget-LiveRC.js/Extensions/HotCatsMulti.css&action=raw&ctype=text/css');

function lrcPrepareHotCatsMulti(){
    // Récupération aliases du {{DEFAULTSORT:}}
    lrcHotCats_getDefaultsortAliases(true);    
}

function lrcRunHotCatsMulti(data){
    lrcHotCats_IsEditMode = false;
    lrcHotCats_Multi_Edit = false
    var Preview = document.getElementById("livePreview");
    if(!Preview || !data) return;
    lrcHotCats_CurrentPage = data.page
    for(var El in lrcHotCatsMatrix){
        while(lrcHotCatsMatrix[El].length!=0) lrcHotCatsMatrix[El].pop();
    }
    for(var El in lrcHotCats_ChangesToDo){
        lrcHotCats_ChangesToDo[El] = false;
    }
    var catlinks = getElementWithId("catlinks", "div", Preview);
    if (! catlinks) { 
        catlinks = document.createElement("div");
        catlinks.id = "catlinks"; 
        catlinks.className = "catlinks";
        catlinks = Preview.appendChild(catlinks);
    }else{
        removeClass(catlinks, "catlinks-allhidden");
    }
    if(wgAction=="edit") lrcHotCatsVariables.list_down = true;
    var catline = getElementWithId('mw-normal-catlinks', "div", catlinks);
    if ( !catline || catline == null || typeof catline == 'undefined' ){
        catline = catlinks.insertBefore(document.createElement("div"), catlinks.firstChild);
        catline.id = "mw-normal-catlinks";
    }
    lrcHotCats_append_firstlink(catline);
    lrcHotCats_modify_existing(catline);
    lrcHotCats_append_add_span(catline);
    lrcHotCats_append_multiedit_span(catline);
    lrcHotCats_getOldPageContent(lrcHotCats_CurrentPage, true);
    
}
 
function  lrcHotCats_AvoidEditMode(){
    lrcHotCats_IsEditMode = false;
}

////////////////////////////////////////// HOOKS
 
LiveRC_AddHook("AfterOptions", lrcPrepareHotCatsMulti); 
LiveRC_AddHook("AfterPreviewArticle", lrcRunHotCatsMulti); 


LiveRC_AddHook("AfterPreviewDiff", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewHistory", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewContribs", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewDeletedContribs", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewLog", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewFilter", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewMove", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewProtect", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewDelete", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewBlock", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewRevisiondelete", lrcHotCats_AvoidEditMode);
LiveRC_AddHook("AfterPreviewWhatlinkshere", lrcHotCats_AvoidEditMode);

LiveRC_AddHook("AfterFillParamPanel", function(){
    LiveRC_ManageParams_Fill(lrcHotCatsVariables, "lrcHotCatsVariables");
    LiveRC_ManageParams_Fill(lrcHotCatsText, "lrcHotCatsText");
});

//<source lang=javascript><pre><nowiki>


///////////////////////// REQUÊTES PRÉLIMINAIRES ////////////////////////////////////////////////////////

// RÉCUPÉRATION ALIAS DE LA CLEF DE TRI GLOBALE

function lrcHotCats_getDefaultsortAliases(Mode){
    var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&meta=siteinfo&siprop=magicwords';
    wpajax.http({ url: URL, 
                  async : Mode,
                  onSuccess: lrcHotCats_UpdateDefaultsortAliases
               });
}

function lrcHotCats_UpdateDefaultsortAliases(Req, data){
    var Response = Req.responseXML;
    if(!Response){ 
        lrcHotCats_DefaultsortAliases = new Array("DEFAULTSORT", "DEFAULTSORTKEY", "DEFAULTCATEGORYSORT");
        return;
    }
    var MagicWords = Response.getElementsByTagName('magicword');
    for(var a=0;a<MagicWords.length;a++){
        var MagicWordName = MagicWords[a].getAttribute('name'); 
        if(MagicWordName=="defaultsort"){
            var Aliases = MagicWords[a].getElementsByTagName('alias');
            for(var b=0;b<Aliases.length;b++){
                var ThisAlias = Aliases[b].firstChild.nodeValue;
                ThisAlias = ThisAlias.replace(/:/g, "");
                if(lrcHotCats_DefaultsortAliases.indexOf(ThisAlias)==-1) lrcHotCats_DefaultsortAliases.push(ThisAlias);
            }
        }
    }
}

// RÉCUPÉRATION CLEF DE TRI GLOBALE

function lrcHotCats_defaultSort_getOld(ID){
    var OldDefaultSpan = document.getElementById(ID);
    if(!OldDefaultSpan) return;
    var Page = lrcHotCats_OldPageContent;
    for(var a=0;a<lrcHotCats_DefaultsortAliases.length;a++){
        if(Page.indexOf('{{'+lrcHotCats_DefaultsortAliases[a]+':')!=-1){
            var AvantCle = Page.substring(0,Page.indexOf('{{'+lrcHotCats_DefaultsortAliases[a]+':'));
            var Cle = Page.split(AvantCle).join('');
            Cle = Cle.substring(0,Cle.indexOf("}"));
            Cle = Cle.substring((Cle.indexOf(":")+1),Cle.length);
            lrcHotCats_OldDefaultSort = Cle;
            OldDefaultSpan.innerHTML = lrcHotCats_OldDefaultSort;
            return;
        }
    }
}

// RÉCUPÉRATION CLEF DE TRI PARTICULIÈRE

function lrcHotCats_defaultSort_getOneOld(TargetCategory){
    var Page = lrcHotCats_OldPageContent;
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

// RÉCUPÉRATION DU CONTENU ACTUEL DE LA PAGE PREVISUALISEE (asynchrone ou synchrone)
 
function lrcHotCats_getOldPageContent(Page, Mode){
    if(lrcHotCats_OldPageContent === "") return "";
    var URL = wgServer + wgScript + '?title=' + encodeURIComponent(Page) + '&action=raw';
    wpajax.http({ url: URL, 
                  async : Mode,
                  onSuccess: lrcHotCats_UpdateOldPageContent
    });
}

function UpdateOldPageContent(Req, data){
    try{
        lrcHotCats_OldPageContent = Req.responseText;
        return lrcHotCats_OldPageContent;
    }catch(e){
        lrcHotCats_OldPageContent = "";
        return lrcHotCats_OldPageContent;
    }
}


///////////////////////// TRANSFORMATIONS ////////////////////////////////////////////////////////

// CRÉATION DU LIEN "CATÉGORIES"

function lrcHotCats_append_firstlink( catline, plural) {
    if (!catline.firstChild ){
        var a = document.createElement('a');
        a.href = wgServer+wgArticlePath.split('$1').join(lrcMediawikiMessages["pagecategorieslink"]);
        a.title = lrcMediawikiMessages["categories"];
        a.appendChild(document.createTextNode(lrcHotCats_PLURAL(lrcMediawikiMessages["pagecategories"], plural)));
        catline.appendChild(a);
        catline.appendChild(document.createTextNode(' : '));
    }else{
        catline.firstChild.title = lrcMediawikiMessages["categories"];
    }
}

// MODIFICATION DE LA BARRE DE CATÉGORIES

function lrcHotCats_modify_existing( catline) {
    var ul = catline.getElementsByTagName ( "ul" )[0];
    if(!ul){ // ( Mediawiki < 1.18 )
        var spans = catline.getElementsByTagName ( "span" );
        for ( var i = 0, l= spans.length; i < l ; i++ ) {
            lrcHotCats_modify_span ( spans[i], i ) ;
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
        lrcHotCats_modify_span ( span, i ) ;
    }
}

// AJOUT DES LIENS (–) ET (±)

function lrcHotCats_modify_span ( span, i ) {
    if(!lrcMediawikiMessages["red-link-title"]) lrcHotCats_GetMessages(false);
    var cat_link = span.getElementsByTagName('a')[0];
    if(!cat_link) return;
    cat_link.id = "CatLink_"+i;
    var cat_title = cat_link.title;
    if(!cat_title) return;
    cat_title = cat_title.split(lrcHotCats_CatNamespace).join('');
    cat_title = cat_title.replace(lrcMediawikiMessages["red-link-title"].split('$1').join(''), "");
    var sep1 = document.createTextNode ( " " ) ;
    span.id = "lrcHotCats_Span_" + i ;
    var a1 = document.createTextNode ( "(–)" ) ;
    var remove_link = document.createElement ( "a" ) ;
    var remove_id = "lrcHotCats_remove_" + i ;
    remove_link.id = remove_id;
    remove_link.href = "javascript:lrcHotCats_remove(\"" + cat_title + "\","+i+");" ;
    remove_link.title = lrcHotCatsText.RemoveLinkTitle+" « "+cat_title+" »";
    remove_link.appendChild ( a1 ) ;
    span.appendChild ( sep1 ) ;
    span.appendChild ( remove_link ) ;
    var mod_id = "lrcHotCats_modify_" + i ;
    var sep2 = document.createTextNode ( " " ) ;
    var a2 = document.createTextNode ( "(±)" ) ;
    var modify_link = document.createElement ( "a" ) ;
    modify_link.id = mod_id ;
    modify_link.href = "javascript:lrcHotCats_modify(\""+cat_title+"\"," + i + ");" ;
    modify_link.title = lrcHotCatsText.ModifyLinkTitle+" « "+cat_title+" »";
    modify_link.appendChild ( a2 ) ;
    span.appendChild ( sep2 ) ;
    span.appendChild ( modify_link ) ;
    lrcHotCatsMatrix.Span[i] = span;
    lrcHotCatsMatrix.CatLink[i] = cat_link;
    lrcHotCatsMatrix.CatLinkIsRed[i] = !!(hasClass(cat_link, "new"));
    lrcHotCatsMatrix.CatName[i] = cat_title;
    lrcHotCatsMatrix.RemoveLink[i] = remove_link;
    lrcHotCatsMatrix.ModifyLink[i] = modify_link;
}

// AJOUT DU LIEN (+)

function lrcHotCats_append_add_span(catline) {
    var Spans = catline.getElementsByTagName('span');
    var span_add = document.createElement('span');   
    var a_add = document.createElement ( "a" ) ;
    var a_text = document.createTextNode ( lrcHotCatsText.AddLinkText ) ;
    span_add.id = "lrcHotCats_add" ;
    a_add.id = "lrcHotCats_addlink" ;
    a_add.href = "javascript:lrcHotCats_add_new("+lrcHotCats_Form_Index+")" ;
    a_add.title = lrcHotCatsText.AddLinkTitle ;
    a_add.appendChild( a_text ) ;
    span_add.appendChild( a_add ) ;
    if(Spans[0]) catline.appendChild(document.createTextNode(' | '));
    catline.appendChild(span_add);
    lrcHotCatsMatrix.Span[lrcHotCats_Form_Index] = span_add;
    lrcHotCats_Form_Index++
}

///////////////////////// ÉDITION SIMPLE ////////////////////////////////////////////////////////

// FONCTION DE RETRAIT D'UNE CATÉGORIE

function lrcHotCats_remove( cat_title, Index ) {
    if(!lrcHotCats_Multi_Edit){
        var RemovedCategories = new Array();
        var ModifiedCategories_from = new Array();
        var ModifiedCategories_to = new Array();
        var AddedCategories = new Array();
        RemovedCategories.push(cat_title);
        if (window.confirm(lrcHotCatsText.RemoveConfirm+" « " + cat_title + " » ?")) {
            lrcHotCats_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, lrcHotCats_OldDefaultSort);
        }
    }else{
        var Span = lrcHotCatsMatrix.Span[Index];
        if(hasClass(Span, "AddedCatSpan")){
            Span.parentNode.removeChild(Span);
        }else{
            var FirstLink = lrcHotCatsMatrix.CatLink[Index];
            var OldCat = lrcHotCatsMatrix.CatName[Index];
            FirstLink.innerHTML = OldCat;
            FirstLink.title = lrcHotCats_CatNamespace+OldCat;
            FirstLink.href = wgServer+wgArticlePath.split('$1').join(lrcHotCats_CatNamespace+OldCat);
            addClass(FirstLink, 'RemovedCategory');
            removeClass(FirstLink, "ModifiedCategory")
            if(lrcHotCatsMatrix.CatLinkIsRed[Index]){
                if(!hasClass(FirstLink, "new")) addClass(FirstLink, "new");
            }else{
                removeClass(FirstLink, "new");
            }
        }
        lrcHotCats_Multi_CheckForChanges();
    }
}

// MODIFICATION D'UNE CATÉGORIE

function lrcHotCats_modify ( catname, Index  ) {
    var link = lrcHotCatsMatrix.CatLink[Index] ;
    var span = lrcHotCatsMatrix.Span[Index] ;
    var Links = span.getElementsByTagName('a');
    for(a=0;a<Links.length;a++){
         Links[a].style.display = "none";
    }
    span.firstChild.style.display = "none" ;
    lrcHotCats_create_new_span ( span , catname, Index ) ;
    lrcHotCatsText_changed(Index);
}

// AJOUT D'UNE CATÉGORIE

function lrcHotCats_add_new (Index) {
    var span_add = document.getElementById( "lrcHotCats_add" ) ;
    span_add.getElementsByTagName('a')[0].style.display = "none";
    lrcHotCats_create_new_span ( span_add , "", Index ) ;
}

// CRÉATION DU FORMULAIRE DE MODIFICATION OU D'AJOUT D'UNE CATÉGORIE

function lrcHotCats_create_new_span ( thespan , init_text, Index ) {
    var DefaultSort = lrcHotCats_defaultSort_getOneOld(init_text);
    if(hasClass(thespan, "AddedCatSpan" )) DefaultSort = lrcHotCatsMatrix.Sort[Index];
    lrcHotCatsMatrix.CatName[Index] = init_text;
    var form = document.createElement ( "form" ) ;
    form.id = "lrcHotCats_form" + Index;  
    form.method = "post" ;
    form.onsubmit = function () {
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCats_ok(FormIndex); 
        return false; 
    } ;
    form.style.display = "inline" ;
    var text = document.createElement ( "input" ) ;
    text.size = 40 ;
    text.id = "lrcHotCats_text" + Index ;
    text.type = "text" ;
    text.value = init_text + DefaultSort ;
    text.onkeyup = function () { 
        var FormIndex = lrcHotCats_getIndex(this);
        window.setTimeout("lrcHotCatsText_changed("+FormIndex+");", lrcHotCatsVariables.suggestion_delay );
    } ;
    var list = document.createElement ( "select" ) ;
    list.id = "lrcHotCats_list" + Index ;
    list.style.display = "none" ;
    list.onclick = function () { 
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCatsText_replace(FormIndex);
    } ;
    var exists = document.createElement ( "img" ) ;
    exists.id = "lrcHotCats_exists" + Index ;
    exists.height = lrcHotCatsVariables.exists_size ;
    exists.width = lrcHotCatsVariables.exists_size ;
    exists.title = lrcHotCatsText.Exists_NoTitle;
    exists.src = lrcHotCatsVariables.exists_no ;
    var ParentCats = document.createElement ( "input" ) ;
    ParentCats.id = "lrcHotCats_parents" + Index ;
    ParentCats.type = "button" ;
    ParentCats.value = lrcHotCatsText.ParentText ;
    ParentCats.title = lrcHotCatsText.ParentTitle ;
    ParentCats.onclick = function(){
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCatsText_changed(FormIndex, "UP");
    }
    var DaughterCats = document.createElement ( "input" ) ;
    DaughterCats.id = "lrcHotCats_daughters" + Index ;
    DaughterCats.type = "button" ;
    DaughterCats.value = lrcHotCatsText.DaughterText ;
    DaughterCats.title = lrcHotCatsText.DaughterTitle ;
    DaughterCats.onclick = function(){
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCatsText_changed(FormIndex, "DOWN");
    }
    var OK = document.createElement ( "input" ) ;
    OK.id = "lrcHotCats_OK" + Index ;
    OK.type = "button" ;
    OK.value = lrcHotCatsText.InputOK ;
    OK.onclick = function(){
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCats_ok(FormIndex) ;
    }
    var cancel = document.createElement ( "input" ) ;
    cancel.id = "lrcHotCats_cancel" + Index ;
    cancel.type = "button" ;
    cancel.value = lrcHotCatsText.InputCancel ;
    cancel.onclick = function(){
        var FormIndex = lrcHotCats_getIndex(this);
        lrcHotCats_cancel(FormIndex) ;
    }
    form.appendChild ( text ) ;
    form.appendChild ( list ) ;
    form.appendChild ( exists ) ;
    form.appendChild ( ParentCats ) ;
    form.appendChild ( DaughterCats ) ;
    form.appendChild ( OK ) ;
    form.appendChild ( cancel ) ;
    thespan.appendChild ( form ) ;
    text.focus () ;
    lrcHotCats_upDate_FormPositions();
    lrcHotCatsMatrix.Form[Index] = form;
    lrcHotCatsMatrix.Text[Index] = text;
    lrcHotCatsMatrix.List[Index] = list;
    lrcHotCatsMatrix.Exist[Index] = exists;
}

// VALIDATION DU FORMULAIRE
function lrcHotCats_ok(Index) {
    var Form = lrcHotCatsMatrix.Form[Index];
    var Input = lrcHotCatsMatrix.Text[Index];
    var TheSpan = lrcHotCatsMatrix.Span[Index] ;
    var CatLink = lrcHotCatsMatrix.CatLink[Index];
    var IfExist = lrcHotCatsMatrix.Exist[Index];
    var OldCatName = lrcHotCatsMatrix.CatName[Index];
    var OldDefaultSort = lrcHotCats_defaultSort_getOneOld(OldCatName);
    var NewCatName = Input.value.ucFirst().replace(/\|.*/, "") ;
    var NewDefaultSort = Input.value.ucFirst().split(NewCatName).join("");
    lrcHotCatsMatrix.Sort[Index] = NewDefaultSort;
    if ( NewCatName == "" ) {
        lrcHotCats_cancel(Index) ;
        return ;
    }
    if(lrcHotCats_Multi_Edit==false){
        if((OldCatName+OldDefaultSort)==(NewCatName+NewDefaultSort)) return;
        var RemovedCategories = new Array();
        var ModifiedCategories_from = new Array();
        var ModifiedCategories_to = new Array();
        var AddedCategories = new Array();
        if ( TheSpan.id != "lrcHotCats_add" ) {
            ModifiedCategories_from.push(OldCatName+OldDefaultSort);
            ModifiedCategories_to.push(NewCatName+NewDefaultSort);
        }else{
            AddedCategories.push(NewCatName+NewDefaultSort);
        }
        lrcHotCats_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, lrcHotCats_OldDefaultSort);
    }else{
        var Exist = (IfExist.src==lrcHotCatsVariables.exists_yes);
        if(TheSpan.id!="lrcHotCats_add"){
            CatLink.innerHTML = NewCatName;
            CatLink.title = lrcHotCats_CatNamespace+NewCatName;
            CatLink.href = wgServer + wgArticlePath.split('$1').join(lrcHotCats_CatNamespace+NewCatName);
            if((!hasClass(CatLink, "AddedCategory"))&&(!hasClass(CatLink, "ModifiedCategory"))) addClass(CatLink,"ModifiedCategory");
            if((OldCatName+OldDefaultSort)==(NewCatName+NewDefaultSort)){
                removeClass(CatLink,"ModifiedCategory");
            }
            removeClass(CatLink,"RemovedCategory");
        }else{
            lrcHotCats_NewCatsIndex++
            lrcHotCatsMatrix.CatName[lrcHotCats_NewCatsIndex] = NewCatName;
            lrcHotCatsMatrix.Sort[lrcHotCats_NewCatsIndex] = NewDefaultSort;
            var NewSpan = document.createElement('span');
            NewSpan.id = "lrcHotCats_Span_"+lrcHotCats_NewCatsIndex;
            NewSpan.className = "AddedCatSpan";
            CatLink = document.createElement('a');
            CatLink.id = "CatLink_"+lrcHotCats_NewCatsIndex;
            CatLink.innerHTML = NewCatName;
            CatLink.title = lrcHotCats_CatNamespace+NewCatName;
            CatLink.href = wgServer + wgArticlePath.split('$1').join(lrcHotCats_CatNamespace+NewCatName);
            addClass(CatLink,"AddedCategory");
            var RemoveLink = document.createElement('a');
            RemoveLink.innerHTML = lrcHotCatsText.RemoveLinkText;
            RemoveLink.id = "lrcHotCats_remove_"+lrcHotCats_NewCatsIndex;
            RemoveLink.title = lrcHotCatsText.RemoveLinkTitle+" « "+NewCatName+" »";
            RemoveLink.href = "javascript:lrcHotCats_remove(\"" + NewCatName+ "\","+lrcHotCats_NewCatsIndex+");";
            var ModifyLink = document.createElement('a');
            ModifyLink.innerHTML = lrcHotCatsText.ModifyLinkText;
            ModifyLink.id = "lrcHotCats_modify_"+lrcHotCats_NewCatsIndex;
            ModifyLink.title = lrcHotCatsText.ModifyLinkTitle+" « "+NewCatName+" »";
            ModifyLink.href = "javascript:lrcHotCats_modify(\""+NewCatName+"\","+lrcHotCats_NewCatsIndex+ ")";
            NewSpan.appendChild(CatLink);
            NewSpan.appendChild(document.createTextNode(" "));
            NewSpan.appendChild(RemoveLink);
            NewSpan.appendChild(document.createTextNode(" "));
            NewSpan.appendChild(ModifyLink);
            NewSpan.appendChild(document.createTextNode(" | "));
            TheSpan.parentNode.insertBefore(NewSpan, TheSpan);
            lrcHotCatsMatrix.Span[lrcHotCats_NewCatsIndex] = NewSpan;
            lrcHotCatsMatrix.CatLink[lrcHotCats_NewCatsIndex] = CatLink;
            lrcHotCatsMatrix.RemoveLink[lrcHotCats_NewCatsIndex] = RemoveLink;
            lrcHotCatsMatrix.ModifyLink.push[lrcHotCats_NewCatsIndex] = ModifyLink;
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
        lrcHotCats_Multi_CheckForChanges();
        lrcHotCats_upDate_FormPositions();
        if(TheSpan.id!="lrcHotCats_add"){
            document.getElementById("lrcHotCats_modify_"+Index).focus();
        }else{
            document.getElementById("lrcHotCats_addlink").focus();
        }
    }
}

// ANNULATION DU FORMULAIRE

function lrcHotCats_cancel (Index) {
    var Form = lrcHotCatsMatrix.Form[Index];
    var Input = lrcHotCatsMatrix.Text[Index];
    var TheSpan = lrcHotCatsMatrix.Span[Index] ;
    var CatLink = lrcHotCatsMatrix.CatLink[Index];
    var IfExist = lrcHotCatsMatrix.Exist[Index];
    var OldCatLink = lrcHotCatsMatrix.RemoveLink[Index];
    TheSpan.removeChild ( Form ) ;
    var Links = TheSpan.getElementsByTagName('a');
    for(a=0;a<Links.length;a++){
        Links[a].style.display = "";
    }
    TheSpan.firstChild.style.display = "" ;
    lrcHotCats_Multi_CheckForChanges();
    lrcHotCats_upDate_FormPositions();
    if(TheSpan.id!="lrcHotCats_add"){
        document.getElementById("lrcHotCats_modify_"+Index).focus();
    }else{
        document.getElementById("lrcHotCats_addlink").focus();
    }
}

///////////////////////// ÉDITION MULTIPLE ////////////////////////////////////////////////////////

// AJOUT DU LIEN (±)

function lrcHotCats_append_multiedit_span( CatLine ){
    var FirstLink = CatLine.getElementsByTagName('a')[0];
    var Span = document.createElement('span');
    Span.id ='lrcHotCats_modify_multi_span';
    var Link = document.createElement('a');
    Link.id = "lrcHotCats_modify_multi_Link";
    Link.innerHTML = lrcHotCatsText.MultiLinkText;
    Link.title = lrcHotCatsText.MultiLinkTitle;
    Link.href = "javascript:lrcHotCats_multiedit_createForm();";
    Span.appendChild(Link);
    FirstLink.parentNode.insertBefore(Span, FirstLink.nextSibling);
    FirstLink.parentNode.insertBefore(document.createTextNode(" "), FirstLink.nextSibling);
    var DefaultSortSpan = document.createElement('span');
    DefaultSortSpan.id ='lrcHotCats_DefaultSort_span';
    var DefaultSortLink = document.createElement('a');
    DefaultSortLink.id = "lrcHotCats_DefaultSort_Link";
    DefaultSortLink.innerHTML = lrcHotCatsText.DefaultSortText;
    DefaultSortLink.title = lrcHotCatsText.DefaultSortTitle;
    DefaultSortLink.href = "javascript:lrcHotCats_defaultSort_createForm();";
    DefaultSortSpan.appendChild(DefaultSortLink);
    var OldDefaultSortSpan = document.createElement('span');
    OldDefaultSortSpan.style.display = "none";
    OldDefaultSortSpan.id = "OldDefaultSortSpan";
    DefaultSortSpan.appendChild(OldDefaultSortSpan);
    insertAfter(Span.parentNode, DefaultSortSpan, Span);
    insertAfter(Span.parentNode, document.createTextNode(" "), Span);
    if(lrcHotCatsVariables.AutoMulti) lrcHotCats_multiedit_createForm();
}

// CREATION DU FORMULAIRE "MULTI"

function lrcHotCats_multiedit_createForm(){
    var OldForms = document.getElementById('mw-normal-catlinks').getElementsByTagName('form');
    while(OldForms[0]) OldForms[0].parentNode.removeChild(OldForms[0]);
    var OldLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    for(var a=0;a<OldLinks.length;a++){
        OldLinks[a].style.display="";
    }
    for(var a=0;a<lrcHotCatsMatrix.CatLink.length;a++){
        if(!lrcHotCatsMatrix.CatLink[a]) continue;
        if(lrcHotCatsMatrix.CatLinkIsRed[a]){
            if(!hasClass(lrcHotCatsMatrix.CatLink[a], "new")) addClass(lrcHotCatsMatrix.CatLink[a], "new");
        }else{
            removeClass(lrcHotCatsMatrix.CatLink[a], "new");
        }
    }
    var OldSpans = document.getElementById('mw-normal-catlinks').getElementsByTagName('span');
    for(var a=0;a<OldSpans.length;a++){
        if(OldSpans[a].id != 'OldDefaultSortSpan') OldSpans[a].style.display="";
    }
    if(!document.getElementById("lrcHotCats_addlink")) lrcHotCats_add_new ( document.getElementById("lrcHotCats_add") );
    var Legend = "";
    if(lrcHotCatsVariables.ShowLegend){
        Legend = '<small>'
               + '<a href="'+lrcHotCatsVariables.docURL+'" title="'+lrcHotCatsText.LabelTitle+'" target="_blank" '
               + 'style="color:#002BB8;padding:0.2em;margin-left:'+(lrcHotCatsVariables.ShowInline ? 5 :100 )+'px;">'
               + '&nbsp;<b>'+lrcHotCatsText.LabelText+'</b>&nbsp;:'
               + '&nbsp;<span class="RemovedCategory">'+lrcHotCatsText.RecapRemove+'</span>'
               + '&nbsp;<span class="ModifiedCategory">'+lrcHotCatsText.RecapModify+'</span>'
               + '&nbsp;<span class="AddedCategory">'+lrcHotCatsText.RecapAdd+'</span>'
               + '</a>'
               + '</small>'
    }
    var BR = "";
    if(!lrcHotCatsVariables.ShowInline) BR = "<br />";

    var RadioBoxes = "";
    
    var MinorOneChecked = ( (lrcHotCatsVariables.Minoredit==-1) ? 'checked="checked" ' : '' );
    var MinorTwoChecked = ( (lrcHotCatsVariables.Minoredit==0) ? 'checked="checked" ' : '' );
    var MinorThreeChecked = ( (lrcHotCatsVariables.Minoredit==1) ? 'checked="checked" ' : '' );
    var WatchOneChecked = ( (lrcHotCatsVariables.Watchthis==-1) ? 'checked="checked" ' : '' );
    var WatchTwoChecked = ( (lrcHotCatsVariables.Watchthis==0) ? 'checked="checked" ' : '' );
    var WatchThreeChecked = ( (lrcHotCatsVariables.Watchthis==1) ? 'checked="checked" ' : '' );
    RadioBoxes = '<span id="lrcHotCats_RadioBoxes">'
               + '&nbsp;&nbsp;<span style="border:1px dotted silver;padding:0.1em;">'
               + '<input id="Minor" type="radio" name="Minor" '+MinorOneChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Minoredit+' : '+lrcHotCatsText.RadioDefault+'" />'
               + '<input id="Minor_0" type="radio" name="Minor" '+MinorTwoChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Minoredit+' : '+lrcHotCatsText.RadioNo+'" />'
               + '<input id="Minor-1" type="radio" name="Minor" '+MinorThreeChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Minoredit+' : '+lrcHotCatsText.RadioYes+'" />'
               + '</span>&nbsp;&nbsp;<span style="border:1px dotted silver;padding:0.1em;">'
               + '<input id="Watch" type="radio" name="Watch" '+WatchOneChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Watchthis+' : '+lrcHotCatsText.RadioDefault+'" />'
               + '<input id="Watch0" type="radio" name="Watch" '+WatchTwoChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Watchthis+' : '+lrcHotCatsText.RadioNo+'" />'
               + '<input id="Watch1" type="radio" name="Watch" '+WatchThreeChecked+' style="cursor:pointer;" '
               + 'title="'+lrcHotCatsText.Watchthis+' : '+lrcHotCatsText.RadioYes+'" />'
               + '</span>'
               + '</span>';

    var Link = document.getElementById('lrcHotCats_modify_multi_Link');
    var Span = Link.parentNode;
    var Form = document.createElement('form');
    Form.id = "lrcHotCats_modify_multi_form";
    Form.style.display = "inline";
    Form.innerHTML = ''
                   + Legend
                   + BR
                   + '<input id="lrcHotCats_modify_multi_InputOK" type="button" disabled="disabled" '
                   + 'value="'+lrcHotCatsText.MultiInputOK+'" '
                   + 'onclick="lrcHotCats_multiedit_FormOK()" onselect="lrcHotCats_multiedit_FormOK()" />'
                   + '<input id="lrcHotCats_modify_multi_InputCancel" type="button" '
                   + 'value="'+lrcHotCatsText.MultiInputCancel+'" '
                   + 'onclick="lrcHotCats_multiedit_CancelForm()" onselect="lrcHotCats_multiedit_CancelForm()" />'
                   + RadioBoxes
                   + BR
    Span.appendChild(Form);
    Link.style.display = "none";
    lrcHotCats_Multi_Edit = true;
    var LP = document.getElementById( 'livePreview' );
    if(LP) LP.scrollTop = parseInt(LP.style.height.split("px").join(""));
    document.getElementById("lrcHotCats_modify_multi_InputCancel").focus();
}

// ANNULATION DU FORMULAIRE "MULTI" + MODIFICATION DES LIENS, FONCTIONS ET IDS DE LA BARRE DE CATÉGORIES

function lrcHotCats_multiedit_CancelForm(){
    var Link = document.getElementById('lrcHotCats_modify_multi_Link');
    var Form = document.getElementById('lrcHotCats_modify_multi_form');
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
            var Index = lrcHotCats_getIndex( CatLinks[a] )
            var Parent = CatLinks[a].parentNode;
            var OldCatName = lrcHotCatsMatrix.CatName[Index];
            var OldDefaultSort = lrcHotCats_defaultSort_getOneOld(OldCatName);
            lrcHotCatsMatrix.Sort[Index] = OldDefaultSort;
            CatLinks[a].innerHTML = OldCatName;
            CatLinks[a].title = lrcHotCats_CatNamespace+OldCatName;
            CatLinks[a].href = wgServer+wgArticlePath.split('$1').join(lrcHotCats_CatNamespace+OldCatName);
            removeClass(CatLinks[a], "ModifiedCategory");
        }
        if(hasClass(CatLinks[a], "ModifiedDefaultSort")){
            var DefaultSortSpan = document.getElementById("OldDefaultSortSpan");
            DefaultSortSpan.innerHTML = lrcHotCats_OldDefaultSort;
            removeClass(CatLinks[a], "ModifiedDefaultSort");
        }
    }
    for(var a=0;a<lrcHotCatsMatrix.CatLink.length;a++){
        if(!lrcHotCatsMatrix.CatLink[a]) continue;
        if(lrcHotCatsMatrix.CatLinkIsRed[a]){
            if(!hasClass(lrcHotCatsMatrix.CatLink[a], "new")) addClass(lrcHotCatsMatrix.CatLink[a], "new");
        }else{
            removeClass(lrcHotCatsMatrix.CatLink[a], "new");
        }
    }
    lrcHotCats_Multi_Edit = false;
    Link.focus();
}

// VALIDATION DU FORMULAIRE "MULTI" + LISTING DES CATÉGORIES À ENLEVER/MODIFIER/AJOUTER 

function lrcHotCats_multiedit_FormOK(){
    var RemovedCategories = new Array();
    var ModifiedCategories_from = new Array();
    var ModifiedCategories_to = new Array();
    var AddedCategories = new Array();
    var DefaultSort = lrcHotCats_OldDefaultSort;
    var CatLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    for(var a=0;a<CatLinks.length;a++){
        var Link = CatLinks[a];
        var Index = lrcHotCats_getIndex( Link );
        if(hasClass(Link, "RemovedCategory")){
            RemovedCategories.push(Link.innerHTML.ucFirst());
        }
        if(hasClass(Link, "ModifiedCategory")){
            var NewCatName = Link.innerHTML.ucFirst();
            var OldCatName = lrcHotCatsMatrix.CatName[Index];
            var OldDefaultSort = lrcHotCats_defaultSort_getOneOld(OldCatName);
            var NewDefaultSort = lrcHotCatsMatrix.Sort[Index];
            if((OldCatName+OldDefaultSort)!=(NewCatName+NewDefaultSort)){
                ModifiedCategories_from.push((OldCatName+OldDefaultSort));
                ModifiedCategories_to.push((NewCatName+NewDefaultSort));
            }
        }
        if(hasClass(Link, "AddedCategory")){
            var NewDefaultSort = lrcHotCatsMatrix.Sort[Index];
            AddedCategories.push(Link.innerHTML.ucFirst()+NewDefaultSort);
        }
        if(hasClass(Link, "ModifiedDefaultSort")){
            var DefaultSortSpan = document.getElementById("OldDefaultSortSpan");
            DefaultSort = DefaultSortSpan.innerHTML;
        }
    }
    var RadioBoxesSpan = document.getElementById("lrcHotCats_RadioBoxes");
    var RecapMinor = '';
    var RecapWatch = '';
    var NewlrcHotCatsVariables = new Array();
    NewlrcHotCatsVariables.Minoredit = false;
    NewlrcHotCatsVariables.Watchthis = false;
    if(RadioBoxesSpan){
        var RadioBoxes = RadioBoxesSpan.getElementsByTagName('input');
        for(var a=0;a<RadioBoxes.length;a++){
            if(RadioBoxes[a].type!="radio") continue;
            if(!RadioBoxes[a].checked) continue;
            var BoxName = RadioBoxes[a].name;
            var Number = lrcHotCats_getIndex(RadioBoxes[a]);
            if(BoxName=="Minor"){
                RecapMinor += lrcHotCatsText.Minoredit+' : '
                var Minor = -1;
                var TextMinor = lrcHotCatsText.RadioDefault;
                if(Number==0){
                    Minor = Number;
                    TextMinor = lrcHotCatsText.RadioNo;
                }else if(Number==1){
                    Minor = Number;
                    TextMinor = lrcHotCatsText.RadioYes;
                }
                NewlrcHotCatsVariables.Minoredit = Minor;
                RecapMinor += TextMinor+ '\n';
            }else if(BoxName=="Watch"){
                RecapWatch += lrcHotCatsText.Watchthis+' : ';
                var Watch = -1;
                var TextWatch = lrcHotCatsText.RadioDefault;
                if(Number==0){
                    Watch = Number;
                    TextWatch = lrcHotCatsText.RadioNo;
                }else if(Number==1){
                    Watch = Number;
                    TextWatch = lrcHotCatsText.RadioYes;
                }
                NewlrcHotCatsVariables.Watchthis = Watch;
                RecapWatch += TextWatch+ '\n';
            }
        }
    }
    var TextrecapTitle = lrcHotCatsText.RecapTitle+'\n\n'
    var TextRecap = TextrecapTitle;
    if(RemovedCategories[0]){
        TextRecap += lrcHotCatsText.RecapRemove+' :\n'
        for(var a=0;a<RemovedCategories.length;a++){
            TextRecap += '* « '+RemovedCategories[a]+' »\n';
        }
    }
    if(ModifiedCategories_to[0]){
        TextRecap += lrcHotCatsText.RecapModify+' :\n'
        for(var a=0;a<ModifiedCategories_to.length;a++){
            TextRecap += '* « '+ModifiedCategories_from[a]+' » -> « '+ModifiedCategories_to[a]+' »\n';
        }
    }
    if(AddedCategories[0]){
        TextRecap += lrcHotCatsText.RecapAdd+' :\n'
        for(var a=0;a<AddedCategories.length;a++){
            TextRecap += '* « '+AddedCategories[a]+' »\n';
        }
    }
    if(DefaultSort!=lrcHotCats_OldDefaultSort){
        TextRecap += lrcHotCatsText.RecapSort+' :\n'
            TextRecap += '* « '+lrcHotCats_OldDefaultSort+' » -> « '+DefaultSort+' »\n';
    }
    if(TextRecap == TextrecapTitle) return;
    TextRecap += RecapMinor; 
    TextRecap += RecapWatch;
    var SurEtCertain = false;
    if(!lrcHotCatsVariables.SkipRecap) SurEtCertain = confirm(TextRecap);
    if((SurEtCertain)||(lrcHotCatsVariables.SkipRecap)){
        lrcHotCatsVariables.Minoredit = NewlrcHotCatsVariables.Minoredit;
        lrcHotCatsVariables.Watchthis = NewlrcHotCatsVariables.Watchthis;
        lrcHotCats_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
    }
}

// VÉRIFICATION DES CHANGEMENTS EFFECTUÉS

function lrcHotCats_Multi_CheckForChanges(){
    if(!lrcHotCats_Multi_Edit) return;
    var CatLinks = document.getElementById('mw-normal-catlinks').getElementsByTagName('a');
    var AnythingChanged = false;
    for(var a=0;a<CatLinks.length;a++){
        var Link = CatLinks[a];
        if((hasClass(Link, "RemovedCategory"))||(hasClass(Link, "ModifiedCategory"))||(hasClass(Link, "AddedCategory"))||(hasClass(Link, "ModifiedDefaultSort"))){
            AnythingChanged = true;
        }
    }
    var Input = document.getElementById('lrcHotCats_modify_multi_InputOK');
    if(!Input) return;
    if(AnythingChanged){
        Input.disabled = "";
    }else{
        Input.disabled = "disabled";
    }
}

///////////////////////// CLEFS DE TRI //////////////////////////////////////////////////////// 

// CRÉATION FORMULAIRE CLEF DE TRI GLOBALE

function lrcHotCats_defaultSort_createForm(){
    lrcHotCats_defaultSort_getOld("OldDefaultSortSpan");    
    var thespan = document.getElementById('lrcHotCats_DefaultSort_span');
    var OldDefaultSort = thespan.getElementsByTagName('span')[0].innerHTML;
    thespan.getElementsByTagName('a')[0].style.display = "none";
    var form = document.createElement ( "form" ) ;
    form.id = "lrcHotCats_form_Default";  
    form.method = "post" ;
    form.onsubmit = function () {
        lrcHotCats_Default_ok(this) ;
        return false; 
    } ;
    form.style.display = "inline" ;
    var text = document.createElement ( "input" ) ;
    text.size = 40 ;
    text.id = "lrcHotCatsText.Default" ;
    text.type = "text" ;
    text.value = OldDefaultSort ;
    var OK = document.createElement ( "input" ) ;
    OK.type = "button" ;
    OK.value = lrcHotCatsText.InputOK ;
    OK.onclick = function(){
        lrcHotCats_Default_ok(this.parentNode) ;
    }
    var cancel = document.createElement ( "input" ) ;
    cancel.type = "button" ;
    cancel.value = lrcHotCatsText.InputCancel ;
    cancel.onclick = function(){
        var Form = this.parentNode;
        lrcHotCats_Default_Cancel(Form) ;
    }
    form.appendChild ( text ) ;
    form.appendChild ( OK ) ;
    form.appendChild ( cancel ) ;
    thespan.appendChild ( form ) ;
    lrcHotCats_upDate_FormPositions();
    text.focus () ;
}

// ANNULATION FORMULAIRE CLEF DE TRI GLOBALE

function lrcHotCats_Default_Cancel(Form){
    var Span = Form.parentNode;
    Form.parentNode.getElementsByTagName('a')[0].style.display = "";
    Form.parentNode.removeChild(Form) ;
    if(lrcHotCats_Multi_Edit){
        Span.getElementsByTagName('span')[0].innerHTML = lrcHotCats_OldDefaultSort;
        removeClass(Span.getElementsByTagName('a')[0], "ModifiedDefaultSort");
        Span.getElementsByTagName('a')[0].style.display = "";
        lrcHotCats_Multi_CheckForChanges();
    }
    document.getElementById("lrcHotCats_DefaultSort_Link").focus();
}

// VALIDATION FORMULAIRE CLEF DE TRI GLOBALE

function lrcHotCats_Default_ok(Form){
    var Text = document.getElementById("lrcHotCatsText.Default");
    var OldDefaultSort = lrcHotCats_OldDefaultSort;
    var NewDefaultSort = Text.value;
    if(!lrcHotCats_Multi_Edit){
        if(OldDefaultSort==NewDefaultSort){
            lrcHotCats_Default_Cancel(Form)
            return;
        }else{
            var RemovedCategories = new Array();
            var ModifiedCategories_from = new Array();
            var ModifiedCategories_to = new Array();
            var AddedCategories = new Array();
            var DefaultSort = NewDefaultSort ; 
            lrcHotCats_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort);
        }
    }else{
        if(OldDefaultSort==NewDefaultSort){
            lrcHotCats_Default_Cancel(Form)
            return;
        }else{
            var Span = Form.parentNode;
            Span.getElementsByTagName('span')[0].innerHTML = Text.value;
            var Link = Span.getElementsByTagName('a')[0]
            Link.style.display = "";
            addClass(Link, "ModifiedDefaultSort");
            Form.parentNode.removeChild(Form) ;
            lrcHotCats_Multi_CheckForChanges();
            lrcHotCats_upDate_FormPositions();
            document.getElementById("lrcHotCats_DefaultSort_Link").focus();
        }
    }
}

var lrcHotCats_ChangesToDo = {
    RemovedCategories : false, 
    ModifiedCategories_from : false, 
    ModifiedCategories_to : false, 
    AddedCategories : false, 
    DefaultSort : false
};
///////////////////////// ÉDITION //////////////////////////////////////////////////////// 

function lrcHotCats_Edit(RemovedCategories, ModifiedCategories_from, ModifiedCategories_to, AddedCategories, DefaultSort){
    lrcHotCats_ChangesToDo = {
        RemovedCategories : (RemovedCategories? RemovedCategories :false), 
        ModifiedCategories_from : (ModifiedCategories_from ? ModifiedCategories_from : false), 
        ModifiedCategories_to : (ModifiedCategories_to ? ModifiedCategories_to : false), 
        AddedCategories : (AddedCategories ? AddedCategories : false), 
        DefaultSort : (DefaultSort ? DefaultSort : false)
    };
    lrcHotCats_IsEditMode = true;
    liveEdit(lrcHotCats_CurrentPage);
}

function lrcHotCats_DoEdit(){
    var Preview = document.getElementById("livePreview");
    if(!Preview || !lrcHotCats_IsEditMode) return;
    var RemovedCategories = lrcHotCats_ChangesToDo.RemovedCategories;
    var ModifiedCategories_from = lrcHotCats_ChangesToDo.ModifiedCategories_from;
    var ModifiedCategories_to = lrcHotCats_ChangesToDo.ModifiedCategories_to;
    var AddedCategories = lrcHotCats_ChangesToDo.AddedCategories;
    var DefaultSort = lrcHotCats_ChangesToDo.DefaultSort;
    var prevent_autocommit = 0;
    if(lrcHotCatsVariables.autocommit) getElementWithId("editform", "form", Preview).style.display = "none";
    var OldText = getElementWithId("wpTextbox1", "textarea", Preview).value;
    var summary = new Array();
    for(var a=0;a<RemovedCategories.length;a++){
        var OldCatName = RemovedCategories[a];
        var OldCatNameUnsorted = OldCatName.replace(/\|.*/, "");
        var REGEXP = new RegExp("(\\s*)\\[\\[ *(?:"+wgFormattedNamespaces[14]+"|Category) *: *" + OldCatName.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
        var matchesCatName = OldText.match(REGEXP);
        if (matchesCatName != null && matchesCatName.length == 1) {
            OldText = OldText.replace(REGEXP, "");
            summary.push( " – [[" + lrcHotCats_CatNamespace+OldCatNameUnsorted + "]]" ) ;
        }else{
            prevent_autocommit = 1
            if(matchesCatNameUnsorted == null){
                alert(lrcHotCatsText.AlertProblem1.split('$1').join(OldCatNameUnsorted));
            }else if(matchesCatNameUnsorted.length > 1){
                alert(lrcHotCatsText.AlertProblem3.split('$1').join(OldCatNameUnsorted));
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
            OldText = OldText.replace(REGEXP_OLD, "$1[[" + lrcHotCats_CatNamespace+NewCatName + "]]");
            summary.push ( " ± [["+lrcHotCats_CatNamespace+OldCatNameUnsorted+"]]->[["+lrcHotCats_CatNamespace+ NewCatNameUnsorted+"]]");
        }else{
            prevent_autocommit = 1
            if(matchesOldCatName == null){
                alert(lrcHotCatsText.AlertProblem1.split('$1').join(OldCatNameUnsorted));
            }else if(matchesOldCatName.length > 1){
                alert(lrcHotCatsText.AlertProblem3.split('$1').join(OldCatNameUnsorted));
            }else if((matchesNewCatName != null)&&(OldCatNameUnsorted!=NewCatNameUnsorted)){
                alert(lrcHotCatsText.AlertProblem2.split('$1').join(NewCatNameUnsorted)); 
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
            alert(lrcHotCatsText.AlertProblem2.split('$1').join(NewCatNameUnsorted)); 
            prevent_autocommit = 1
            continue;
        }
        var re = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig")
        var index = -1;
        while (re.exec(OldText) != null) index = re.lastIndex;
        var txt = "[[" + lrcHotCats_CatNamespace+NewCatName + "]]" ;
        if (index < 0) {  // no category
            var interWiki = new RegExp('^\\s*\\[\\[([a-z][a-z].?(x?-[^\\]]+)?|simple|tokipona):([^\\]]*)\\]\\]\\s*$');
            var blank = new RegExp('^\\s*$');
            var lines = OldText.split('\n');
            var DebutModele = '';
            var SuiteModele = '';
            var FoundInterwiki = false;
            for (var lineId = lines.length - 1; lineId >= 0; --lineId){
                if (!interWiki.exec(lines[lineId]) && !blank.exec(lines[lineId])){
                    DebutModele = lines.slice(0, lineId + 1).join('\n');
                    SuiteModele = lines.slice(lineId + 1).join('\n');
                    break;
                }
            }
            DebutModele = DebutModele + '\n\n';
            while(SuiteModele.indexOf('\n\n')!=-1){
                SuiteModele = SuiteModele.split("\n\n").join("\n");
            }
            SuiteModele = SuiteModele.replace(/^\n/, "");
            OldText = DebutModele + txt + '\n\n' + SuiteModele;
        }else{
            OldText = OldText.substring(0, index) + '\n' + txt + OldText.substring(index);
        }
        summary.push ( " + [[" + lrcHotCats_CatNamespace+NewCatNameUnsorted + "]]" ) ;
    }
    if((DefaultSort!=lrcHotCats_OldDefaultSort)&&(DefaultSort!="undefined")){
        var NewDefaultSort = "{{DEFAULTSORT:"+DefaultSort+"}}\n";
        var HasDefaultSort = null;
        for(var d=0;d<lrcHotCats_DefaultsortAliases.length;d++){
            if(OldText.indexOf(lrcHotCats_DefaultsortAliases[d])!=-1) HasDefaultSort = lrcHotCats_DefaultsortAliases[d]+":";
        }
        if(HasDefaultSort!=null){
            if(DefaultSort==""){
                NewDefaultSort = "";
                summary.push (";  – " + lrcHotCats_OldDefaultSort ) ;
            }else{
                summary.push (";  ± {{DEFAULTSORT:}} : " + lrcHotCats_OldDefaultSort + " -> " + DefaultSort ) ;
            }
            OldText = OldText.split("{{"+HasDefaultSort+lrcHotCats_OldDefaultSort+"}}\n").join(NewDefaultSort);
            OldText = OldText.split("{{"+HasDefaultSort+lrcHotCats_OldDefaultSort+"}}").join(NewDefaultSort);
        }else if(DefaultSort!=""){
            var re = new RegExp("\\[\\[(?:"+wgFormattedNamespaces[14]+"|Category):[^\\]]+\\]\\]", "ig")
            var index = re.exec(OldText);
            if(index ==null ) {
                var interWiki = new RegExp('^\\s*\\[\\[([a-z][a-z].?(x?-[^\\]]+)?|simple|tokipona):([^\\]]*)\\]\\]\\s*$');
                var blank = new RegExp('^\\s*$');
                var lines = OldText.split('\n');
                var DebutModele = '';
                var SuiteModele = '';
                var FoundInterwiki = false;
                for (var lineId = lines.length - 1; lineId >= 0; --lineId){
                    if (!interWiki.exec(lines[lineId]) && !blank.exec(lines[lineId])){
                        DebutModele = lines.slice(0, lineId + 1).join('\n');
                        SuiteModele = lines.slice(lineId + 1).join('\n');
                        break;
                    }
                }
                SuiteModele = SuiteModele.replace(/^\n/, "");
                OldText = DebutModele+ '\n\n' + NewDefaultSort + '\n' + SuiteModele;
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
    var nocat1 = "{{"+lrcHotCatsText.NoCatTemplate.ucFirst()+"}}\n";
    var nocat1Bis = "{{"+lrcHotCatsText.NoCatTemplate.lcFirst()+"}}\n";
    var nocat2 = "{{"+lrcHotCatsText.NoCatTemplate.ucFirst()+"}}";
    var nocat2Bis = "{{"+lrcHotCatsText.NoCatTemplate.lcFirst()+"}}";
    if(cat.exec(OldText) != null){
        OldText = OldText.split(nocat1).join("");
        OldText = OldText.split(nocat1Bis).join("");
        OldText = OldText.split(nocat2).join("");
        OldText = OldText.split(nocat2Bis).join("");
    }
    getElementWithId("wpTextbox1", "textarea", Preview).value = OldText;
    getElementWithId("wpSummary", "input", Preview).value = lrcHotCatsText.ResumeScript + summary.join("");
    if(lrcHotCatsVariables.Minoredit==1) getElementWithId("wpMinoredit", "input", Preview).checked = true;
    if(lrcHotCatsVariables.Minoredit==0) getElementWithId("wpMinoredit", "input", Preview).checked = false;
    if(lrcHotCatsVariables.Watchthis==1) getElementWithId("wpWatchthis", "input", Preview).checked = true;
    if(lrcHotCatsVariables.Watchthis==0) getElementWithId("wpWatchthis", "input", Preview).checked = false;
    if((lrcHotCatsVariables.autocommit)&&(prevent_autocommit != 1)){
        var Input = getElementWithId("Live_wpSave", "input", Preview);
        if(Input){
            processEdit(Input);
        }else{
            prevent_autocommit = 1;
        }
    }
    if(prevent_autocommit == 1) getElementWithId("editform", "form", Preview).style.display = "";
    lrcHotCats_IsEditMode = false;
}

LiveRC_AddHook("AfterPreviewEdit", lrcHotCats_DoEdit);

///////////////////////// SUGGESTIONS ////////////////////////////////////////////////////////

// REQUÊTE DE SUGGESTIONS

function lrcHotCatsText_changed (FormIndex, Mode, titles, catContinue) {
    if ( lrcHotCats_suggest_running ) return ;
    if(!Mode) Mode = false;
    if((!FormIndex)||(FormIndex=="")) FormIndex = "0";
    if(!titles) titles = new Array () ;
    if(!catContinue) catContinue = "";
    var text = lrcHotCatsMatrix.Text[FormIndex];
    if(!text){alert('PB lrcHotCatsText_changed () : ' + FormIndex); return; }
    var v = text.value.ucFirst() ;
    if(v.indexOf("|")!=-1) v = v.split("|")[0];
    var APILimit = ( ((wgUserGroups.indexOf("sysop")!=-1)||(wgUserGroups.indexOf("bot")!=-1)) ? 4999 : 499 );
    if(lrcHotCatsVariables.list_items>APILimit) lrcHotCatsVariables.list_items = APILimit; // API max
    if(Mode=="UP"){ // Suggestions catégories-mères
        var URL = "/api.php?format=xml&action=query&prop=categories&titles=" + lrcHotCats_CatNamespace+v.replace(/&/g, "%26") + "&cllimit=" + lrcHotCatsVariables.list_items;
        var TagName = "cl";
        var Replace = false;
    }else if(Mode=="DOWN"){ // Suggestions catégories-filles
        var URL = "/api.php?format=xml&action=query&list=categorymembers&cmnamespace=14&cmtitle=" + lrcHotCats_CatNamespace+v.replace(/&/g, "%26") + "&cmlimit=" + APILimit + catContinue;
        var TagName = "cm";
        var Replace = false;        
    }else{ // Suggestions normales
        var URL =  "/api.php?format=xml&action=query&list=allpages&apnamespace=14&apfrom=" + v.replace(/&/g, "%26") + "&aplimit=" + lrcHotCatsVariables.list_items;
        var TagName = "p";
        var Replace = true;
    }
    lrcHotCats_suggest_running = 1 ;
    if ( v != "" ) {
        if ( typeof ( lrcHotCats_xmlhttp ) != "undefined" ) lrcHotCats_xmlhttp.abort() ;
        lrcHotCats_xmlhttp = new sajax_init_object() ;
        lrcHotCats_xmlhttp.open('GET', wgServer + wgScriptPath + URL, true);
        lrcHotCats_xmlhttp.onreadystatechange = function () {
            if ( typeof lrcHotCats_xmlhttp == "undefined" ) return ;
            if (lrcHotCats_xmlhttp.readyState == 4) {
                var xml = lrcHotCats_xmlhttp.responseXML ;
                if ( xml == null ) return ;
                var pages = xml.getElementsByTagName( TagName ) ;
                for ( var i = 0 ; i < pages.length ; i++ ) {
                    var s = pages[i].getAttribute("title");
                    if(s.indexOf(lrcHotCats_CatNamespace)!=-1){
                        s = s.split(lrcHotCats_CatNamespace).join('');
                        titles.push ( s ) ;
                    }
                }
                var CanContinue = xml.getElementsByTagName("query-continue")[0];
                if(Mode=="DOWN"&&CanContinue){
                    CanContinueId = "&cmcontinue="+CanContinue.firstChild.getAttribute("cmcontinue").replace(/&/g, "%26");
                    lrcHotCats_suggest_running = 0 ;
                    lrcHotCatsText_changed(FormIndex, Mode, titles ,CanContinueId) ;
                }else{
                    lrcHotCats_show_suggestions(titles, FormIndex, Replace);
                }
            }
        };
        lrcHotCats_xmlhttp.send(null);
    } else {
        lrcHotCats_show_suggestions ( titles , FormIndex, Replace ) ;
    }
    lrcHotCats_suggest_running = 0 ;
}

// AFFICHAGE DES SUGGESTIONS

function lrcHotCats_show_suggestions ( titles, FormIndex, Replace, Mode ) {
    var text = lrcHotCatsMatrix.Text[FormIndex] ;
    var list = lrcHotCatsMatrix.List[FormIndex] ;
    var icon = lrcHotCatsMatrix.Exist[FormIndex] ;
    if((!text)||(!list)||(!icon)) { alert('PB lrcHotCats_show_suggestions() : ' + FormIndex); return; }
    if(titles.length==0){
        list.style.display = "none" ;
        if(Replace){
            icon.src = lrcHotCatsVariables.exists_no ;
            icon.title = lrcHotCatsText.Exists_NoTitle ;
        }
        return ;
    }  
    var TailleListe = lrcHotCatsVariables.list_size;
    if (titles.length < TailleListe ) TailleListe = titles.length;
    var listh = TailleListe * 20 ;
    list.size = TailleListe ;
    list.style.align = "left" ;
    list.style.zIndex = 5 ;
    list.style.position = "relative" ;
    list.style.width = text.offsetWidth + "px" ;
    list.style.height = listh + "px" ;
    if (typeof lrcHotCatsVariables.list_down != "undefined" && lrcHotCatsVariables.list_down) {
        list.style.top = parseInt(text.offsetHeight) + "px";
        list.style.marginBottom = "-" + ((TailleListe * 20) + parseInt(text.offsetHeight)) + "px" ;
    }else{
        list.style.marginTop = "-" + (TailleListe * 20) + "px" ;
    }
    list.style.marginLeft = "-" + text.offsetWidth + "px" ;

    while ( list.firstChild ) list.removeChild ( list.firstChild ) ;
    for ( var i = 0 ; i < titles.length ; i++ ) {
        var opt = document.createElement ( "option" ) ;
        var ot = document.createTextNode ( titles[i] ) ;
        opt.appendChild ( ot ) ;
        opt.value = titles[i];
        list.appendChild ( opt ) ;
    }  
    list.onkeyup = lrcHotCats_KeypressedOnList;
    list.style.display = "inline" ;
    icon.title = lrcHotCatsText.Exists_YesTitle ;
    icon.src = lrcHotCatsVariables.exists_yes ;
    var first_title = titles.shift () ;
    lrcHotCats_last_v = text.value.ucFirst();
    var lrcHotCats_last_v_Split = lrcHotCats_last_v;
    if(lrcHotCats_last_v.indexOf('|')!=-1){
       lrcHotCats_last_key = lrcHotCats_last_v.substring(lrcHotCats_last_v.indexOf("|"), lrcHotCats_last_v.length);
       lrcHotCats_last_v_Split = lrcHotCats_last_v.split(lrcHotCats_last_key).join('');
    }else{
       lrcHotCats_last_key = "";
    }
    if ( first_title == lrcHotCats_last_v_Split ) return ;
    if(Replace){
        var suggestion = first_title;
        if(suggestion.indexOf(lrcHotCats_last_v_Split)==-1){
            icon.src = lrcHotCatsVariables.exists_no ;
            icon.title = lrcHotCatsText.Exists_NoTitle ;
            return;
        }
        text.value = suggestion + lrcHotCats_last_key ;
        if (text.createTextRange) {
            var ra = text.createTextRange();
            ra.moveStart("character", lrcHotCats_last_v.length);
            ra.moveEnd("character", suggestion.length);
            ra.select();
        } else if( text.setSelectionRange ) {
            text.setSelectionRange( lrcHotCats_last_v.length, suggestion.length );
        } else {
            text.selectionStart = lrcHotCats_last_v.length ;
            text.selectionEnd = suggestion.length ;
        }
    }else{
        list.focus()
    }
}

// MISE A JOUR DE LA POSITION DES LISTES DE SUGGESTIONS

function lrcHotCats_upDate_FormPositions(){
    var AllForms = document.getElementById('mw-normal-catlinks').getElementsByTagName('form');
    for(var a=0;a<AllForms.length;a++){
        if(AllForms[a].id == "lrcHotCats_modify_multi_form") continue;
        if(AllForms[a].id == "lrcHotCats_form_Default") continue;
        var ThisForm = AllForms[a];
        var ThisSelect = ThisForm.getElementsByTagName('select')[0];
        var Options = ThisSelect.getElementsByTagName('option');
        var ThisInput = ThisForm.getElementsByTagName('input')[0];  
        var TailleListe = lrcHotCatsVariables.list_size * 20 ;
        if (Options.length < lrcHotCatsVariables.list_size) {
            TailleListe = Options.length * 20 ;
        }
        ThisSelect.style.position = "relative" ;
        ThisSelect.style.width = ThisInput.offsetWidth + "px" ;
        if (typeof lrcHotCatsVariables.list_down != "undefined" && lrcHotCatsVariables.list_down) {
            ThisSelect.style.top = parseInt(ThisInput.offsetHeight) + "px";
            ThisSelect.style.marginBottom = "-" + ((TailleListe * 20) + parseInt(ThisInput.offsetHeight)) + "px" ;
        }else{
            ThisSelect.style.marginTop = "-" + (TailleListe * 20) + "px" ;
        }
        ThisSelect.style.marginLeft = "-" + ThisInput.offsetWidth + "px" ;
    }
}

// SÉLECTION D'UNE SUGGESTION AU CLAVIER

function lrcHotCats_KeypressedOnList(e){
    if (!e) var e = window.event;
    if (e.keyCode != 13) return;
    lrcHotCatsText_replace(lrcHotCats_getIndex(this))
}

// REMPLACEMENT DU CHAMP DE TEXTE PAR UNE SUGGESTION

function lrcHotCatsText_replace(Index){
    var Text = lrcHotCatsMatrix.Text[Index];
    var TextValue = Text.value;
    var List = lrcHotCatsMatrix.List[Index];
    var Options = List.getElementsByTagName('option');
    for(var a=0;a<Options.length;a++){
        if(Options[a].selected){
            var ListValue = Options[a].value;
            if(TextValue.indexOf('|')!=-1){
                lrcHotCats_last_key = TextValue.substring(TextValue.indexOf("|"), TextValue.length);
            }
            Text.value = ListValue + lrcHotCats_last_key;
            lrcHotCatsText_changed(Index) ;
            Text.focus();
            return;
        }
    }
}

///////////////////////// DIVERS ////////////////////////////////////////////////////////

// RÉCUPÉRATION DU N° D'INDEX

function lrcHotCats_getIndex( Element ){
    return parseInt(Element.id.replace(/[^0-9]/g, ""));
}

// GESTION {{PLURAL:}} (MESSAGES SYSTÈME)

function lrcHotCats_PLURAL(Text, Plural){
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

function lrcHotCats_GENDER(Text, Gender){
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


/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>