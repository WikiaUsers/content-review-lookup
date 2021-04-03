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
 
Permet d'améliorer la prévisualisation avec les fonctions de [[MediaWiki:Gadget-BandeauxPortails.js|BandeauxPortails]]

* Licence : ...?
* Documentation : [[:fr:Projet:JavaScript/Notices/BandeauxPortails]]
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :

 
{{Catégorisation JS|LiveRC}}

<source lang=javascript> */

if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 

///////////////////////// VARIABLES ////////////////////////////////////////////////////////

//// PARAMÈTRES PERSONNALISABLES ////

var lrcBandeauPortailVariables = {
     suggestion_delay : 200, // Délai avant les suggestions, en ms
     list_size        : 5,   // Taille de la liste déroulante (en items)
     list_items       : 10,  // Nombre de bandeaux suggérés lors de la recherche (maximum autorisé : 4999 pour les sysop et les bots, 499 pour les autres utilisateurs)
     Minoredit        : 1,   // Modification mineure ( -1 = défaut ; 0 = jamais ; 1 = toujours )
     Watchthis        : -1,  // Suivre la page modifiée ( -1 = défaut ; 0 = jamais ; 1 = toujours )
     list_down        : false, // Permet d'afficher la liste de suggestion vers le bas
     autocommit       : true,  // Permet de publier automatiquement la modification

}

//// TEXTES ////

var lrcBandeauPortailText = {
     RemoveLinkText   : "(–)",
     RemoveLinkTitle  : "Supprimer le bandeau",
     RemoveConfirm    : "Voulez-vous vraiment supprimer le bandeau",
     AddLinkText      : "(+)",
     AddLinkTitle     : "Ajouter un bandeau",
     InputOK          : "OK",
     InputCancel      : "Annuler",
     ModifyLinkText   : "(±)",
     ModifyLinkTitle  : "Modifier les bandeaux",
}

//// VARIABLES NON PERSONNALISABLES ////

var lrcBandeauPortailMatrix = {
     Li          : new Array(),
     Form        : new Array(),
     Input       : new Array(),
     Select      : new Array(),
     BandeauName : new Array()
}

var lrcBandeauPortail_NewBandeauIndex = 2000;


var lrcBandeauPortail_Multi_Edit = false ;
var lrcBandeauPortail_suggest_running = 0 ;
var lrcBandeauPortail_running = 0 ;
var lrcBandeauPortail_last_v = "" ;
var lrcBandeauPortail_last_key = "";
var lrcBandeauPortail_OldDefaultSort = "";
var lrcBandeauPortail_OldPageContent = "";
var lrcBandeauPortail_Form_Index = 1000;
var lrcBandeauPortail_CatNamespace = wgFormattedNamespaces[14]+':';
var lrcBandeauPortail_CurrentPage = false;
var lrcBandeauPortail_IsEditMode = false;


// Paramètres de personnalisation
lrcManageParams_Desc['DesclrcBandeauPortailVariables'] = new Array('Paramètres de BandeauPortail', 'Paramètres BandeauPortail');
lrcManageParams_Desc['DesclrcBandeauPortailText'] = new Array('Textes de BandeauPortail', 'Textes BandeauPortail');


///////////////////////// LANCEMENT ////////////////////////////////////////////////////////

importStylesheetURI('//fr.wikipedia.org/w/index.php?title='
                  + 'MediaWiki:Gadget-LiveRC.js/Extensions/BandeauPortail.css'
                  + '&action=raw&ctype=text/css'
);

function lrcRunBandeauPortail(data){
    lrcBandeauPortail_IsEditMode = false;
    var Preview = document.getElementById("livePreview");
    if(!Preview || !data) return;
    lrcBandeauPortail_CurrentPage = data.page
    if(getNamespaceInfoFromPage(lrcBandeauPortail_CurrentPage)!=0) return;
    for(var El in lrcBandeauPortailMatrix){
        while(lrcBandeauPortailMatrix[El].length!=0) lrcBandeauPortailMatrix[El].pop();
    }
    while(lrcBandeauPortail_NewBandeaux.length!=0) lrcBandeauPortail_NewBandeaux.pop();
    var Homonymie = getElementWithId("homonymie", "*", Preview);
    var UlBandeaux = getElementWithId('bandeau-portail', "ul", Preview);
    if( Homonymie && !UlBandeaux) return; 
    if(!UlBandeaux) UlBandeaux = lrcBandeauxPortails_CreateUl(Preview);
    lrcBandeauxPortails_AddLink(UlBandeaux);
    lrcBandeauPortail_getOldPageContent(lrcBandeauPortail_CurrentPage, true);
}
 
function  lrcBandeauPortail_AvoidEditMode(){
    lrcBandeauPortail_IsEditMode = false;
}

////////////////////////////////////////// HOOKS
 
LiveRC_AddHook("AfterPreviewArticle", lrcRunBandeauPortail); 


LiveRC_AddHook("AfterPreviewDiff", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewHistory", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewContribs", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewDeletedContribs", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewLog", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewFilter", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewMove", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPrevieA&Lrotect", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewDelete", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewBlock", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewRevisiondelete", lrcBandeauPortail_AvoidEditMode);
LiveRC_AddHook("AfterPreviewWhatlinkshere", lrcBandeauPortail_AvoidEditMode);

LiveRC_AddHook("AfterFillParamPanel", function(){
    LiveRC_ManageParams_Fill(lrcBandeauPortailVariables, "lrcBandeauPortailVariables");
    LiveRC_ManageParams_Fill(lrcBandeauPortailText, "lrcBandeauPortailText");
});

//<source lang=javascript><pre><nowiki>

function lrcBandeauxPortails_CreateUl(Preview){
      var Bandeau = document.createElement('ul');
      Bandeau.id = 'bandeau-portail';
      Bandeau.className = 'bandeau-portail';
      var CatLinks = getElementWithId('catlinks', 'div', Preview);
      if(CatLinks){
            CatLinks.parentNode.insertBefore(Bandeau,CatLinks);
      }else{
            Preview.appendChild(Bandeau);
      }
      return Bandeau;
}

function lrcBandeauxPortails_AddLink(UlBandeaux){
      var Li = document.createElement('li');
      var Link = document.createElement('a');
      Link.appendChild(document.createTextNode(lrcBandeauPortailText.ModifyLinkText));
      Link.title = lrcBandeauPortailText.ModifyLinkTitle;
      Link.href = "javascript:;";
      Link.onclick = function (){
            lrcBandeauxPortails_ModifyUl(lrcBandeauxPortails_CheckBandeaux(lrcBandeauPortail_OldPageContent));
            return false;
      };
      Li.appendChild(Link);
      UlBandeaux.appendChild(Li);
}

// RÉCUPÉRATION DU CONTENU ACTUEL DE LA PAGE PREVISUALISEE (asynchrone ou synchrone)
 
function lrcBandeauPortail_getOldPageContent(Page, Mode){
    var URL = wgServer + wgScript + '?title=' + encodeURIComponent(Page) + '&action=raw';
    A&Lajax.http({ url: URL, 
                  async : Mode,
                  onSuccess: lrcBandeauPortail_UpdateOldPageContent
    });
}

function lrcBandeauPortail_UpdateOldPageContent(Req, data){
    try{
        lrcBandeauPortail_OldPageContent = Req.responseText;
    }catch(e){
        lrcBandeauPortail_OldPageContent = "";
    }
}

function lrcBandeauxPortails_CheckBandeaux(Contenu){
    var Bandeaux = new Array();
    Contenu = Contenu.replace(/\{\{portail/ig, "\{\{Portail");
    Contenu = Contenu.replace(/\{\{Portail /ig, "\{\{Portail\|");
    var Reg = new RegExp("\\{\\{Portail\\|[^\\}]*\\}\\}", "ig")
    var matches = Contenu.match(Reg);
    if(matches!=null){
        for(var a=0,l=matches.length;a<l;a++){
            var ParamsModele = matches[a].split('{{Portail|')[1].split('}}')[0] + '|';
            ParamsModele = lrcBandeauxPortails_CleanModele(ParamsModele);
            while(ParamsModele.indexOf('|')!=-1){
                var NeA&Laram = ParamsModele.split('|')[0];
                if(NeA&Laram!='') Bandeaux.push(NeA&Laram);
                ParamsModele = ParamsModele.split(NeA&Laram+'|')[1];               
            }
        }
    }
    return Bandeaux;
}

// Nettoyage modèle (espaces, retour à la ligne, pipes)
function  lrcBandeauxPortails_CleanModele(Modele){
          Modele = Modele.replace(/\n/ig, ""); 
          Modele = Modele.replace(/ \|/ig, "\|");
          Modele = Modele.replace(/\| /ig, "\|");
          Modele = Modele.replace(/\|\|/ig, "\|");
          Modele = Modele.replace(/\|\}/ig, "\}");
          return Modele;
}

///////////////////////// TRANSFORMATIONS ////////////////////////////////////////////////////////

function lrcBandeauxPortails_ModifyUl(Bandeaux){
      var Preview = document.getElementById("livePreview");
      if(!Preview) return;
      var BandeauUl = getElementWithId('bandeau-portail', 'ul', Preview);
      if(!BandeauUl) return;
      var OldBandeauUlForm = getElementWithId('bandeau-portail-form', 'ul', Preview);
      if(OldBandeauUlForm) OldBandeauUlForm.parentNode.removeChild(OldBandeauUlForm);
      for(var El in lrcBandeauPortailMatrix){
            while(lrcBandeauPortailMatrix[El].length!=0) lrcBandeauPortailMatrix[El].pop();
      }
      var BandeauForm = document.createElement('ul');
      BandeauForm.id = 'bandeau-portail-form';
      for(var a=0,l=Bandeaux.length;a<l;a++){
            if(a>2000 || !Bandeaux[a]) continue;
            var NewLI = document.createElement('li');
            BandeauForm.appendChild(NewLI);
            NewLI.appendChild(lrcBandeauxPortails_CreateForm(Bandeaux[a], a));
            lrcBandeauPortailMatrix.Li[a] = NewLI;
      }
      var Inputs = lrcBandeauxPortails_CreateInputs();
      BandeauForm.appendChild(Inputs);
      BandeauUl.style.display = "none";
      BandeauUl.parentNode.insertBefore(BandeauForm, BandeauUl);
      if(Bandeaux.length==0) lrcBandeauxPortails_AddNewForm(Inputs.getElementsByTagName('input')[0]);
      BandeauForm.getElementsByTagName("input")[0].focus();
}

function lrcBandeauxPortails_CreateForm(Bandeau, Index){
      var Li = document.createElement('li')
      var Form = document.createElement("form");
      var Input = document.createElement("input");
      Input.className = "Bandeau_Input";
      Input.type = "text";
      Input.value = Bandeau;
      Input.onkeyup = function () { 
            var FormIndex = lrcBandeauPortail_getIndex(this, lrcBandeauPortailMatrix.Input);
            window.setTimeout("lrcBandeauPortail_TextChanged("+FormIndex+");", lrcBandeauPortailVariables.suggestion_delay );
      } ;
      var Select = document.createElement('select');
      Select.style.display = "none";
      Select.onclick = function () { 
            var FormIndex = lrcBandeauPortail_getIndex(this, lrcBandeauPortailMatrix.Select);
            lrcBandeauPortailText_replace(FormIndex);
      } ;
      var SupLink = document.createElement('input');
      SupLink.value = lrcBandeauPortailText.RemoveLinkText;
      SupLink.title = lrcBandeauPortailText.RemoveLinkTitle + " « "+Bandeau+" »";
      SupLink.type = "button";
      SupLink.onclick = function(){
            lrcBandeauxPortails_DeleteForm(this)
            return false;
      }
      SupLink.onselect = function(){
            lrcBandeauxPortails_DeleteForm(this)
            return false;
      }
      Form.appendChild(Input);
      Form.appendChild(Select);
      Form.appendChild(SupLink);
      lrcBandeauPortailMatrix.Form[Index] = Form;
      lrcBandeauPortailMatrix.Input[Index] = Input;
      lrcBandeauPortailMatrix.Select[Index] = Select;
      lrcBandeauPortailMatrix.BandeauName[Index] = Bandeau;
      Li.appendChild(Form);
      return Li;
}

function lrcBandeauxPortails_CreateInputs(){
      var Li = document.createElement("li");
      var Form = document.createElement("form");
      var AddInput = document.createElement('input');
      AddInput.value = lrcBandeauPortailText.AddLinkText;
      AddInput.title = lrcBandeauPortailText.AddLinkTitle;
      AddInput.type = "button";
      AddInput.onclick = function (){
            lrcBandeauxPortails_AddNewForm(this);
            return false;
      };
      AddInput.onselect = function (){
            lrcBandeauxPortails_AddNewForm(this);
            return false;
      };
      var OKInput = document.createElement("input");
      OKInput.type = "button";
      OKInput.value = lrcBandeauPortailText.InputOK;
      OKInput.onclick = function(){
            lrcBandeauPortail_CheckForms();
      };
      OKInput.onselect = function(){
            lrcBandeauPortail_CheckForms();
      };
      var CancelInput = document.createElement("input");
      CancelInput.type = "button";
      CancelInput.value = lrcBandeauPortailText.InputCancel;
      CancelInput.onclick = function(){
            lrcBandeauPortail_CloseForms();
      };
      CancelInput.onselect = function(){
            lrcBandeauPortail_CloseForms();
      };
      Form.appendChild(AddInput);
      Form.appendChild(OKInput);
      Form.appendChild(CancelInput);
      Li.appendChild(Form);
      return Li;
}

function lrcBandeauxPortails_DeleteForm(Input){
      var ThisForm = Input.parentNode;
      var FormIndex = lrcBandeauPortail_getIndex(ThisForm, lrcBandeauPortailMatrix.Form);
      var Text = lrcBandeauPortailText.RemoveConfirm + " « "+lrcBandeauPortailMatrix.BandeauName[FormIndex]+" »"
      if(confirm(lrcBandeauPortailText.RemoveConfirm)){
            var ThisLi = ThisForm.parentNode;
            ThisLi.parentNode.removeChild(ThisLi);
      }
}

function lrcBandeauxPortails_AddNewForm(Input){
      lrcBandeauPortail_NewBandeauIndex++;
      var Li = Input.parentNode.parentNode;
      var NewLi = document.createElement('li');
      Li.parentNode.insertBefore(NewLi, Li);
      NewLi.appendChild(lrcBandeauxPortails_CreateForm("", lrcBandeauPortail_NewBandeauIndex));
      lrcBandeauPortailMatrix.Li[lrcBandeauPortail_NewBandeauIndex] = NewLi;
}

function lrcBandeauPortail_CloseForms(){
      var Preview = document.getElementById("livePreview");
      if(!Preview) return;
      var BandeauUl = getElementWithId('bandeau-portail', 'ul', Preview);
      if(!BandeauUl) return;
      var OldBandeauUlForm = getElementWithId('bandeau-portail-form', 'ul', Preview);
      if(OldBandeauUlForm) OldBandeauUlForm.parentNode.removeChild(OldBandeauUlForm);
      BandeauUl.style.display = "";
}

////////////////////////////////////////////////////// SUGGESTIONS


var lrcBandeauPortail_suggest_running = 0;
function lrcBandeauPortail_TextChanged(FormIndex){
    if ( lrcBandeauPortail_suggest_running ) return ;
    var text = lrcBandeauPortailMatrix.Input[FormIndex];
    var v = text.value ;
    if(v==="") return;
    lrcBandeauPortail_suggest_running = 1 ;
    var APILimit = ( ((wgUserGroups.indexOf("sysop")!=-1)||(wgUserGroups.indexOf("bot")!=-1)) ? 4999 : 499 );
    if(lrcBandeauPortailVariables.list_items>APILimit) lrcBandeauPortailVariables.list_items = APILimit; // API max
    var URL =  wgServer + wgScriptPath + '/api.php?format=xml&action=query&generator=allpages&gapnamespace=10&gaplimit='+lrcBandeauPortailVariables.list_items+'&gapfrom=Portail%20'+encodeURIComponent(v)+'&prop=info';
    A&Lajax.http({ url: URL, 
                  onSuccess: lrcBandeauPortailText_changed_getSuggests,
                  index:FormIndex
    });
}

function lrcBandeauPortailText_changed_getSuggests(Req, data){
    var xml = Req.responseXML ;
    if ( xml == null ) return ;
    var titles = new Array();
    var isredirect = new Array();
    var pages = xml.getElementsByTagName("page") ;
    for( var i=0,l=pages.length;i<l;i++) {
        var s = pages[i].getAttribute("title").replace(/Modèle:Portail /, "");
        titles.push ( s ) ;
        var R = pages[i].getAttribute("redirect");
        var Redirect = (R==null ? false : true);
        isredirect.push(Redirect);
    }
    lrcBandeauPortail_show_suggestions(titles, isredirect, data.index) ;
    lrcBandeauPortail_suggest_running = 0 ;
}

// AFFICHAGE DES SUGGESTIONS

function lrcBandeauPortail_show_suggestions (titles, isredirect, FormIndex) {
    var text = lrcBandeauPortailMatrix.Input[FormIndex] ;
    var list = lrcBandeauPortailMatrix.Select[FormIndex] ;
    if(titles.length==0){
        list.style.display = "none" ;
        return ;
    }  
    var TailleListe = lrcBandeauPortailVariables.list_size;
    if (titles.length < TailleListe ) TailleListe = titles.length;
    var listh = TailleListe * 20 ;
    list.size = TailleListe ;
    list.style.align = "left" ;
    list.style.zIndex = 5 ;
    list.style.position = "relative" ;
    list.style.width = text.offsetWidth + "px" ;
    list.style.height = listh + "px" ;
    if (typeof lrcBandeauPortailVariables.list_down != "undefined" && lrcBandeauPortailVariables.list_down) {
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
        if(isredirect[i]) opt.setAttribute('style', 'font-style:italic !important;');
    }  
    list.onkeyup = lrcBandeauPortail_KeypressedOnList;
    list.style.display = "inline" ;
    var first_title = titles.shift () ;
    var lrcBandeauPortail_last_v = text.value;
    if ( first_title == lrcBandeauPortail_last_v ) return ;
    var suggestion = first_title;
    if (text.createTextRange) {
        var ra = text.createTextRange();
        ra.moveStart("character", lrcBandeauPortail_last_v.length);
        ra.moveEnd("character", suggestion.length);
        ra.select();
    } else if( text.setSelectionRange ) {
        text.setSelectionRange( lrcBandeauPortail_last_v.length, suggestion.length );
    } else {
        text.selectionStart = lrcBandeauPortail_last_v.length ;
        text.selectionEnd = suggestion.length ;
    }
}

// SÉLECTION D'UNE SUGGESTION AU CLAVIER

function lrcBandeauPortail_KeypressedOnList(e){
    if (!e) var e = window.event;
    if (e.keyCode != 13) return;
    lrcBandeauPortailText_replace(lrcBandeauPortail_getIndex(this, lrcBandeauPortailMatrix.Select))
}

// REMPLACEMENT DU CHAMP DE TEXTE PAR UNE SUGGESTION

function lrcBandeauPortailText_replace(Index){
    var Text = lrcBandeauPortailMatrix.Input[Index];
    var TextValue = Text.value;
    var List = lrcBandeauPortailMatrix.Select[Index];
    var Options = List.getElementsByTagName('option');
    for(var a=0;a<Options.length;a++){
        if(Options[a].selected){
            var ListValue = Options[a].value;
            Text.value = ListValue;
            lrcBandeauPortail_TextChanged(Index) ;
            Text.focus();
            return;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// VALIDATION DU FORMULAIRE + LISTING DES BANDEAUX À ENLEVER/MODIFIER/AJOUTER 

var lrcBandeauPortail_NewBandeaux = new Array();
function lrcBandeauPortail_CheckForms(){
      var Preview = document.getElementById("livePreview");
      if(!Preview) return;
      var OldBandeauUlForm = getElementWithId('bandeau-portail-form', 'ul', Preview);
      if(!OldBandeauUlForm) return;
      while(lrcBandeauPortail_NewBandeaux.length!=0) lrcBandeauPortail_NewBandeaux.pop();
      var Inputs = getElementsByClass("Bandeau_Input", OldBandeauUlForm, "input");
      if(Inputs.length==0) return;
      for(var a=0,l=Inputs.length;a<l;a++){
            if(Inputs.value!="") lrcBandeauPortail_NewBandeaux.push(Inputs[a].value);
      }
      if(!confirm("{{Portail|"+lrcBandeauPortail_NewBandeaux.join("|")+"}}")) return;
      lrcBandeauPortail_IsEditMode = true;
      liveEdit(lrcBandeauPortail_CurrentPage);
}

function lrcBandeauPortail_DoEdit(){
    var Preview = document.getElementById("livePreview");
    if(!Preview || !lrcBandeauPortail_IsEditMode) return;
    var TextArea = getElementWithId('A&LTextbox1', 'textarea', Preview);
    if(!TextArea) return;
    if(lrcBandeauPortailVariables.autocommit) getElementWithId('editform', 'form', Preview).style.display = "none";
    var prevent_autocommit = 0;
    var NewTemplate = "{{Portail|"+lrcBandeauPortail_NewBandeaux.join("|")+"}}";
    var OldText = TextArea.value;
    OldText = OldText.replace(/\{\{portail/ig, "\{\{Portail");
    OldText = OldText.replace(/\{\{Portail /ig, "\{\{Portail\|");
    var Reg = new RegExp("\\{\\{Portail\\|[^\\}]*\\}\\}", "ig")
    var matches = OldText.match(Reg);
    if(matches!=null){
        var Replaced = false;
        for(var a=0,l=matches.length;a<l;a++){
            if(Replaced){
                OldText = OldText.replace(matches[a], "");
            }else{
                OldText = OldText.replace(matches[a], NewTemplate);
                Replaced = true;
            }
        }
    }else{          
        if((OldText.indexOf('{{DEFAULTSORT:')!=-1)||(OldText.indexOf('[[Catégorie:')!=-1)||(OldText.indexOf('[[catégorie:')!=-1)||(OldText.indexOf('[[Categorie:')!=-1)||(OldText.indexOf('[[categorie:')!=-1)){
// ------------------------------------------------------------------------------------ Il y a des catégories
            var DebutModele1 = OldText.substring(0, OldText.indexOf('{{DEFAULTSORT:'));
            var DebutModele2 = OldText.substring(0, OldText.indexOf('[[Catégorie:'));
            var DebutModele3 = OldText.substring(0, OldText.indexOf('[[catégorie:'));
            var DebutModele4 = OldText.substring(0, OldText.indexOf('[[Categorie:'));
            var DebutModele5 = OldText.substring(0, OldText.indexOf('[[categorie:'));    
            var SuiteModele = OldText.split(DebutModele1).join('').split(DebutModele2).join('').split(DebutModele3).join('').split(DebutModele4).join('').split(DebutModele5).join('')      
               var DebutModele = OldText.split(SuiteModele).join('');
        }else{
// ------------------------------------------------------------------------------------ Il n'y a pas de catégories 
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
        }
        OldText = DebutModele + NewTemplate + SuiteModele;
    } 
    getElementWithId("A&LTextbox1", "textarea", Preview).value = OldText;
    getElementWithId("A&LSummary", "input", Preview).value = '[[Modèle:Portail|Portail]] : '+NewTemplate;
    if(lrcBandeauPortailVariables.Minoredit==1) getElementWithId("A&LMinoredit", "input", Preview).checked = true;
    if(lrcBandeauPortailVariables.Minoredit==0) getElementWithId("A&LMinoredit", "input", Preview).checked = false;
    if(lrcBandeauPortailVariables.Watchthis==1) getElementWithId("A&LWatchthis", "input", Preview).checked = true;
    if(lrcBandeauPortailVariables.Watchthis==0) getElementWithId("A&LWatchthis", "input", Preview).checked = false;
    if((lrcBandeauPortailVariables.autocommit)&&(prevent_autocommit != 1)){
        var Input = getElementWithId("Live_A&LSave", "input", Preview);
        if(Input){
            processEdit(Input);
        }else{
            prevent_autocommit = 1;
        }
    }
    if(prevent_autocommit == 1) getElementWithId("editform", "form", Preview).style.display = "";
    lrcBandeauPortail_IsEditMode = false;
}

LiveRC_AddHook("AfterPreviewEdit", lrcBandeauPortail_DoEdit);


///////////////////////// DIVERS ////////////////////////////////////////////////////////

// RÉCUPÉRATION DU N° D'INDEX

function lrcBandeauPortail_getIndex( Element, TheArray ){
    for(var a in TheArray){
        if(Element === TheArray[a]) return a;
    }
    return null;
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