//
//<source lang=javascript>

// Documentation : [[Projet:JavaScript/Notices/BandeauxPortails]]

// Licence : Domaine public

// <source lang=javascript>
// ==================================================================================================================== DEBUT DU CODE
// ====================================================================================================================
//<pre><nowiki>

/////////////////////////////////////////////////////////////////////////////////// Variables personnalisables

// Publication automatique
if(typeof(BandeauxPortails_AutoEdit)=='undefined') var BandeauxPortails_AutoEdit = true;

// Modification mineure
if(typeof(BandeauxPortails_MinorEdit)=='undefined') var BandeauxPortails_MinorEdit = true;

// Ajout à la liste de suivi ( -1 = défaut préférences, 0 = jamais, 1 = toujours)
if(typeof(BandeauxPortails_Watchthis)=='undefined') var BandeauxPortails_Watchthis = -1;

// Nombre de suggestions
if(typeof(BandeauxPortails_TailleListe)=='undefined') var BandeauxPortails_TailleListe = 10;

// Affichage des suggestions vers le bas
if(typeof(BandeauxPortails_ListeBas)=='undefined') var BandeauxPortails_ListeBas = false;

// Affichage des redirections de bandeaux
if(typeof(BandeauxPortails_ShowRedirect)=='undefined') var BandeauxPortails_ShowRedirect = false;

// Non-confirmation de la suppression des bandeaux
if(typeof(BandeauxPortails_SkipConfirm)=='undefined') var BandeauxPortails_SkipConfirm = false;

var BandeauxPortails_EditParams = new Array();

/////////////////////////////////////////////////////////////////////////////////// Fonctions actives au chargement de la page

if( ((wgAction=="view")||(wgAction=="purge"))&&(wgNamespaceNumber==0)){
      addOnloadHook(BandeauxPortails);
}

function BandeauxPortails(){
      var Homonymie = document.getElementById("homonymie");
      var UlBandeaux = document.getElementById('bandeau-portail');
      if( Homonymie && !UlBandeaux) return;

      if(!UlBandeaux) BandeauxPortails_CreateUl();
      BandeauxPortails_ModifyUl();
}

function BandeauxPortails_CreateUl(){
      var CatLinks = document.getElementById('catlinks');
      if(!CatLinks) return;
      var Bandeau = document.createElement('ul');
      Bandeau.id = 'bandeau-portail';
      Bandeau.className = 'bandeau-portail';
      CatLinks.parentNode.insertBefore(Bandeau,CatLinks);
}

function BandeauxPortails_ModifyUl(){
      var BandeauUl = document.getElementById('bandeau-portail');
      if(!BandeauUl) return;
      var BandeauLi = BandeauUl.getElementsByTagName('li');
      for(var a=0;a<BandeauLi.length;a++){
            Li = BandeauLi[a];
            var Lien = Li.getElementsByTagName('a')[1];
            if(Lien){
                  var TitreDecode = Lien.title.split('Portail:').join('');
                  TitreDecode = TitreDecode.replace(/ \(page inexistante\)/g, "");
                  var Titre = encodeURIComponent(TitreDecode);
                  var SpanLien = Lien.parentNode;
                  SpanLien.id = 'lienPortail_' + a;
                  SpanLien.innerHTML += ' • '
                                       +'<a href="javascript:BandeauxPortails_SupprOne(\''+Titre+'\')" title="Supprimer le bandeau de portail '+TitreDecode+'">(-)</a>'
                                       +' • '
                                       +'<a href="javascript:BandeauxPortails_ModifyOne(\''+a+'\',\''+Titre+'\')" title="Modifier le bandeau de portail '+TitreDecode+'">(±)</a>';
            }
      }
      var BandeauInexistant = BandeauUl.getElementsByTagName('a');
      for(var a=100;a<(BandeauInexistant.length+100);a++){
            if(hasClass(BandeauInexistant[(a-100)], "new")){
                  var Lien = BandeauInexistant[(a-100)];
                  if(Lien.title.indexOf("Portail:")==-1){
                        var TitreDecode = Lien.innerHTML.split('Modèle:Portail').join('');
                        TitreDecode = TitreDecode.replace(/^ /,'');
                        Titre = encodeURIComponent(TitreDecode).replace(/'/g,"ZAPPOSTROPHE");
                        var NewLi = document.createElement('li');
                        NewLi.innerHTML = '<span id="lienPortail_' + a + '" >'
                                         +'<a class="new" href="' + Lien.href + '" title="'+Lien.title+'" >'+TitreDecode+'</a>'
                                         +' • '
                                         +'<a href="javascript:BandeauxPortails_SupprOne(\''+Titre+'\')" title="Supprimer le bandeau de portail '+TitreDecode+'">(-)</a>'
                                         +' • '
                                         +'<a href="javascript:BandeauxPortails_ModifyOne(\''+a+'\',\''+Titre+'\')" title="Modifier le bandeau de portail '+TitreDecode+'">(±)</a>';
                        Lien.parentNode.insertBefore(NewLi, Lien);
                        Lien.parentNode.removeChild(Lien);
                  }
            }
      }
      var AddLi = document.createElement('li');
      AddLi.id = 'lienPortail_add';
      AddLi.innerHTML += '<span class="bandeau-portail-element">'
                        +'<span class="bandeau-portail-texte" id="BandeauxPortails_Add" >'
                        +'<a href="javascript:BandeauxPortails_AddOne()" title="Ajouter un bandeau de portail" >(+)</a>'
                        +'</span>'
                        +'</span>';
      BandeauUl.appendChild(AddLi);
      BandeauxPortails_Update();
}

/////////////////////////////////////////////////////////////////////////////////// Mise à jour des bandeaux effectivement présents

function BandeauxPortails_Update(){
     var url = wgServer + wgScript + '?title=' + wgPageName.replace(/&/g, "%26") + '&oldid='+wgCurRevisionId+'&action=raw';
     var BandeauxPortails_Request = sajax_init_object();
     BandeauxPortails_Request.open("GET", url, true);
     BandeauxPortails_Request.onreadystatechange = function() {
          if(BandeauxPortails_Request.readyState != 4 || BandeauxPortails_Request.status != 200) return;
          var Contenu = BandeauxPortails_Request.responseText;
          if(Contenu=='') return;
          Contenu = Contenu.replace(/\{\{portail/ig, "\{\{Portail");
          Contenu = Contenu.replace(/\{\{Portail /ig, "\{\{Portail\|");
          if(Contenu.indexOf('{{Portail|')==-1) return;
          var ParamsModele = Contenu.split('{{Portail|')[1].split('}}')[0] + '|';
          ParamsModele = BandeauxPortails_CleanModele(ParamsModele);
          var AllParamsModele = new Array();
          while(ParamsModele.indexOf('|')!=-1){
               var NewParam = ParamsModele.split('|')[0];
               if(NewParam!='') AllParamsModele.push(NewParam);
               ParamsModele = ParamsModele.split(NewParam+'|')[1];
          }
          for(var m=0;m<AllParamsModele.length;m++){
               var Span = document.getElementById('lienPortail_'+m);
               if(!Span) continue;
               var LienRemove = Span.getElementsByTagName('a')[1];
               LienRemove.href= "javascript:BandeauxPortails_SupprOne(\'"+encodeURIComponent(AllParamsModele[m]).replace(/'/g,"ZAPPOSTROPHE")+"\')";
               LienRemove.title= "Supprimer le bandeau de portail "+AllParamsModele[m];
               var LienModify = Span.getElementsByTagName('a')[2];
               LienModify.href= "javascript:BandeauxPortails_ModifyOne(\'"+m+"\',\'"+encodeURIComponent(AllParamsModele[m]).replace(/'/g,"ZAPPOSTROPHE")+"\')";
               LienModify.title= "Modifier le bandeau de portail "+AllParamsModele[m];
          }
     };
     BandeauxPortails_Request.send(null);
}

/////////////////////////////////////////////////////////////////////////////////// Formulaires

function BandeauxPortails_Cancel(id){
          var Span = document.getElementById(id);
          Span.style.display = 'inline';
          var Parent = Span.parentNode;
          var Form = Parent.getElementsByTagName('form')[0];
          Parent.removeChild(Form);
}

function BandeauxPortails_SupprOne(Portail){
          Portail = Portail.replace(/ZAPPOSTROPHE/g,"'");
          if (BandeauxPortails_SkipConfirm || confirm('Voulez-vous vraiment supprimer le bandeau « '+Portail+' » ?')) {
              BandeauxPortails_EditParams["PortalToRemove"] = Portail;
              BandeauxPortails_Edit();
	  }
// ********************************************************************************************************
}

function BandeauxPortails_ModifyOne( id, portail ) {
     portail = portail.replace(/ZAPPOSTROPHE/g,"'");
     var Span = document.getElementById('lienPortail_' + id);
     Span.style.display = "none";
     var Form = document.createElement('form');
     Form.id = "BP_Form_"+id;
     Form.portail = portail.replace(/'/g,"ZAPPOSTROPHE");
     Form.method = "post" ;
     Form.onsubmit = function () {
        var FormIndex = this.id.split("BP_Form_").join("");
        var OldPortail = this.portail;
        BandeauxPortails_ModifyThatOne(FormIndex,OldPortail);
        return false;
    } ;

     Form.style.display ="inline";
     Form.innerHTML = '<select id="SelectModify_'+id+'" style="display:none;" title="Suggestions de bandeaux" />'
                     +'<input id="InputModify_'+id+'" type="text" value="'+portail+'" '
                     +'onkeyup="BandeauxPortails_TextChanged(\'SelectModify_'+id+'\')" />'
                     +'<input type="button" '
                     +'onclick="BandeauxPortails_ModifyThatOne(\''+id+'\',\''+portail.replace(/'/g,"ZAPPOSTROPHE")+'\');" '
                     +'onselect="BandeauxPortails_ModifyThatOne(\''+id+'\',\''+portail.replace(/'/g,"ZAPPOSTROPHE")+'\');" '
                     +'value="OK"/>'
                     +'<input type="button" '
                     +'onclick="BandeauxPortails_Cancel(\'lienPortail_'+id+'\')" '
                     +'onselect="BandeauxPortails_Cancel(\'lienPortail_'+id+'\')" '
                     +'value="Annuler"/>';
     Span.parentNode.insertBefore(Form,Span);
     document.getElementById('InputModify_'+id).focus() ;
}

function BandeauxPortails_ModifyThatOne(id, oldportail){
     oldportail = oldportail.replace(/ZAPPOSTROPHE/g,"'");
     var Input = document.getElementById('InputModify_'+id);
     var Portail = Input.value;
     if((Portail!='')&&(Portail!=oldportail)){
// ********************************************************************************************************
          BandeauxPortails_EditParams["PortalToModifyFrom"] = oldportail;
          BandeauxPortails_EditParams["PortalToModifyTo"] = Portail;
          BandeauxPortails_Edit();
// ********************************************************************************************************
     }else{
          BandeauxPortails_Cancel('lienPortail_'+id);
     }
}

function BandeauxPortails_AddOne(){
     var Span = document.getElementById('BandeauxPortails_Add');
     Span.style.display = "none";
     var Form = document.createElement('form');
     Form.style.display ="inline";
     Form.id = "BP_Form_Add";
     Form.method = "post" ;
     Form.onsubmit = function () {
        BandeauxPortails_AddThatOne();
        return false;
    } ;
     Form.innerHTML = '<select id="SelectAdd" style="display:none;" title="Suggestions de bandeaux" />'
                     +'<input id="InputAdd" type="text" value="" onkeyup="BandeauxPortails_TextChanged(\'SelectAdd\')" />'
                     +'<input type="button" '
                     +'onclick="BandeauxPortails_AddThatOne();" '
                     +'onselect="BandeauxPortails_AddThatOne();" '
                     +'value="OK"/>'
                     +'<input type="button" '
                     +'onclick="BandeauxPortails_Cancel(\'BandeauxPortails_Add\')" '
                     +'onselect="BandeauxPortails_Cancel(\'BandeauxPortails_Add\')" '
                     +'value="Annuler"/>';
     Span.parentNode.insertBefore(Form,Span);
     document.getElementById('InputAdd').focus() ;

}

function BandeauxPortails_AddThatOne(){
     var Input = document.getElementById('InputAdd');
     var Portail = Input.value;
     if(Portail!=''){
// ********************************************************************************************************
          BandeauxPortails_EditParams["PortalToAdd"] = Portail;
          BandeauxPortails_Edit();
// ********************************************************************************************************
     }else{
          BandeauxPortails_Cancel('BandeauxPortails_Add');
     }
}


/////////////////////////////////////////////////////////////////////////////////// Suggestions

var BandeauxPortails_TextChanged_running_Up = 0 ;
var BandeauxPortails_TextChanged_running_Low = 0 ;
var BandeauxPortails_Up_Results = new Array();
var BandeauxPortails_Low_Results = new Array();

function BandeauxPortails_TextChanged(id){
     if(BandeauxPortails_TailleListe==0) return;

     var Select = document.getElementById( id ) ;
     var idInput = id.split('Select').join('Input');
     var Input = document.getElementById(idInput) ;
     if((!Input)||(!Select)) return;
     var Value = Input.value;
     Value = Value.replace(/.*\|/g, "");
     if(Value=='') return;
     BandeauxPortails_TextChanged_RequestLow(Value, id);
     BandeauxPortails_TextChanged_RequestUp(Value, id);
}

function BandeauxPortails_TextChanged_RequestUp(Value, id){
     if(BandeauxPortails_TextChanged_running_Up) return;
     BandeauxPortails_TextChanged_running_Up = 1;
     Value = Value.substr(0,1).toUpperCase() + Value.substr(1,Value.length);
     var Redirect = (BandeauxPortails_ShowRedirect ? "" : "&apfilterredir=nonredirects");
     var url = wgServer + wgScriptPath + '/api.php?format=xml&action=query&list=allpages&apnamespace=10&aplimit='+BandeauxPortails_TailleListe+ Redirect +'&apfrom=Portail%20'+Value;
     var BandeauxPortails_Request = sajax_init_object();
     BandeauxPortails_Request.open("GET", url, true);
     BandeauxPortails_Request.onreadystatechange = function() {
          if(BandeauxPortails_Request.readyState != 4) return;
          BandeauxPortails_Up_Results = [];
          var ObjetXML = BandeauxPortails_Request.responseXML;
          var AllPages = ObjetXML.getElementsByTagName('p');
          for(var b=0;b<AllPages.length;b++){
               var Titre = AllPages[b].getAttribute('title').replace(/Modèle:Portail /, "");
               var TitreUp = Titre.substr(0,1).toUpperCase() + Titre.substr(1,Titre.length);
               if(Titre==TitreUp && Titre.indexOf("Modèle:")==-1){
                    BandeauxPortails_Up_Results.push(Titre);
               }
          }
          BandeauxPortails_TextChanged_running_Up = 0;
          if(BandeauxPortails_TextChanged_running_Low==0) BandeauxPortails_TextChanged_Merge(id);
     };
     BandeauxPortails_Request.send(null);
}

function BandeauxPortails_TextChanged_RequestLow(Value, id){
     if(BandeauxPortails_TextChanged_running_Low) return;
     BandeauxPortails_TextChanged_running_Low = 1;
     Value = Value.substr(0,1).toLowerCase() + Value.substr(1,Value.length);
     var Redirect = (BandeauxPortails_ShowRedirect ? "" : "&apfilterredir=nonredirects");
     var url = wgServer + wgScriptPath + '/api.php?format=xml&action=query&list=allpages&apnamespace=10&aplimit='+BandeauxPortails_TailleListe+Redirect+'&apfrom=Portail%20'+Value;
     var BandeauxPortails_Request = sajax_init_object();
     BandeauxPortails_Request.open("GET", url, true);
     BandeauxPortails_Request.onreadystatechange = function() {
          if(BandeauxPortails_Request.readyState != 4) return;
          BandeauxPortails_Low_Results = [];
          var ObjetXML = BandeauxPortails_Request.responseXML;
          var AllPages = ObjetXML.getElementsByTagName('p');
          for(var b=0;b<AllPages.length;b++){
               var Titre = AllPages[b].getAttribute('title').replace(/Modèle:Portail /, "");
               var TitreLow = Titre.substr(0,1).toLowerCase() + Titre.substr(1,Titre.length);
               if(Titre==TitreLow &&  Titre.indexOf("Modèle:")==-1){
                    BandeauxPortails_Low_Results.push(Titre);
               }
          }
          BandeauxPortails_TextChanged_running_Low = 0;
          if(BandeauxPortails_TextChanged_running_Up==0) BandeauxPortails_TextChanged_Merge(id);
     };
     BandeauxPortails_Request.send(null);
}

function BandeauxPortails_TextChanged_Merge(id){
     var UpResults = BandeauxPortails_Up_Results;
     var LowResults = BandeauxPortails_Low_Results;
     var ResultArray = new Array();
     for(var a=0;a<LowResults.length;a++){
          LowResults[a] = LowResults[a].substr(0,1).toUpperCase() + LowResults[a].substr(1,LowResults[a].length)+ ";";
          UpResults.push(LowResults[a]);
     }
     UpResults.sort();
     for(var b=0;b<UpResults.length;b++){
          if(UpResults[b].indexOf(";")!=-1){
               UpResults[b] = UpResults[b].replace(/;/g, "");
               UpResults[b] = UpResults[b].substr(0,1).toLowerCase() + UpResults[b].substr(1,UpResults[b].length);
          }
          if(b<BandeauxPortails_TailleListe){
               ResultArray.push(UpResults[b]);
          }
     }
     BandeauxPortails_TextChanged_Display(ResultArray, id);
}


function BandeauxPortails_TextChanged_Display(ResultArray, id){
     var Select = document.getElementById( id ) ;
     var idInput = id.split('Select').join('Input');
     var Input = document.getElementById(idInput) ;
     if((!Input)||(!Select)) return;
     Select.innerHTML = '';
     var NbOptions = 0;
     for(var a=0;a<ResultArray.length;a++){
          var TitrePage = ResultArray[a];
          var TitrePageEncode = TitrePage.replace(/'/g,"ZAPOSTROPHE");
          var Option = document.createElement('option');
          Option.value = TitrePage;
          Option.innerHTML = TitrePage;
          Option.onclick = function(){
               var PageEncode = this.value;
               BandeauxPortails_TextChanged_Set(this.parentNode.id.split('Select').join('Input'),PageEncode);
               BandeauxPortails_TextChanged(this.parentNode.id);
          };
          if(a==0) Option.selected = "selected";
          Select.appendChild(Option);
          NbOptions++
     }
     if(NbOptions>0){
          Select.onkeyup = function(e){
               if (!e) var e = window.event;
               var IsEnter = BandeauxPortails_KeypressedOnList(e);
               if(!IsEnter) return;

               var Selected = this.getElementsByTagName('option');
               for(var a=0;a<Selected.length;a++){
                    if(Selected[a].selected){
                         var TextSelected = Selected[a].value;
                    }
               }
               BandeauxPortails_TextChanged_Set(idInput, TextSelected);
               BandeauxPortails_TextChanged(id);
          };
          Select.size = NbOptions;
          Select.style.display = 'inline';
          Select.style.zIndex = 5 ;
          Select.style.position = "absolute" ;
          Input.style.width = Select.offsetWidth + "px" ;

          if(BandeauxPortails_ListeBas){
               Select.style.top = (parseInt(Input.offsetTop) + parseInt(Input.offsetHeight)) + 'px';
          }else{
               Select.style.top = (parseInt(Input.offsetTop) - Select.offsetHeight) + 'px';
          }
          Select.style.left = (parseInt(Input.parentNode.offsetLeft ) - 1) + 'px';
     }else{
          Select.style.display = 'none';
          Select.innerHTML = '';
     }
}

function BandeauxPortails_TextChanged_Set(id, text){
     text = text.replace(/ZAPOSTROPHE/g,"'");
     var OldValue = document.getElementById(id).value;
     if(OldValue.indexOf('|')!=-1){
          var AllParams = OldValue.split("|");
          AllParams[(AllParams.length-1)] = text;
          var NewValue = AllParams.join("|");
     }else{
          var NewValue = text;
     }
     document.getElementById(id).value = NewValue;
     document.getElementById(id).focus() ;
}

function BandeauxPortails_KeypressedOnList(e){
    if (!e) var e = window.event;
    if (e.keyCode != 13){
        var IsEnter = false;
    }else{
        var IsEnter = true;
    }
    return IsEnter;
}

/////////////////////////////////////////////////////////////////////////////////// Édition

var BandeauxPortails_ajax = {
  http: function(bundle) {
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch(e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          xmlhttp = false;
        }
      }
    }
    if (xmlhttp) {
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4)
          BandeauxPortails_ajax.httpComplete(xmlhttp,bundle);
      };
      xmlhttp.open(bundle.method ? bundle.method : "GET",bundle.url,bundle.async == false ? false : true);
      if (bundle.headers) {
        for (var field in bundle.headers)
          try {
            xmlhttp.setRequestHeader(field,bundle.headers[field]);
          } catch(err) {  }
      }
      xmlhttp.send(bundle.data ? bundle.data : null);
    }
    return xmlhttp;
  },
  httpComplete: function(xmlhttp,bundle) {
    if (xmlhttp.status == 200 || xmlhttp.status == 302) {
      if (bundle.onSuccess) bundle.onSuccess(xmlhttp,bundle);
    } else if (bundle.onFailure) {
      bundle.onFailure(xmlhttp,bundle);
    }
  }
};

function BandeauxPortails_Edit(){
     var ToRemove = (BandeauxPortails_EditParams["PortalToRemove"] ? BandeauxPortails_EditParams["PortalToRemove"] : ( BandeauxPortails_EditParams["PortalToModifyFrom"] ? BandeauxPortails_EditParams["PortalToModifyFrom"] : false ) );
     var ToAdd = (BandeauxPortails_EditParams["PortalToAdd"] ? BandeauxPortails_EditParams["PortalToAdd"] : (BandeauxPortails_EditParams["PortalToModifyTo"] ? BandeauxPortails_EditParams["PortalToModifyTo"] : false ) );
     var URL = wgServer + wgScript + "?title=" +encodeURIComponent(wgPageName) + "&action=edit";
     BandeauxPortails_ajax.http({url       : URL,
                                 onSuccess : BandeauxPortails_DoEdit,
                                 remove    : ToRemove,
                                 add       : ToAdd
     });
}

function BandeauxPortails_DoEdit(Req, data){
     while(document.body.firstChild){ document.body.removeChild(document.body.firstChild); }
     document.body.innerHTML = Req.responseText;
     var TextArea = document.getElementById('wpTextbox1');
     if(!TextArea) return;
     if(BandeauxPortails_AutoEdit) document.editform.style.display = "none";

     var  RemovePortalText = data.remove;
     var  AddPortalText = data.add;
     if(AddPortalText) AddPortalText = AddPortalText.replace(/\|$/g,'');

     var OldText = TextArea.value;
     OldText = OldText.replace(/\{\{Portail /ig, "\{\{Portail\|"); // Cas d'un bandeau unique : {{Portail Truc}} -> {{Portail|Truc}}

     if((OldText.indexOf('{{Portail|')!=-1)||(OldText.indexOf('{{portail|')!=-1)){
// ==================================================================================== Il y a déjà un modèle {{Portail}}
          var AvantModeleUp = OldText.substring(0, OldText.indexOf('{{Portail'));
          var AvantModeleLow = OldText.substring(0, OldText.indexOf('{{portail'));
          var ApresModele = OldText.split(AvantModeleUp).join('').split(AvantModeleLow).join('');
          var DebutModele = OldText.split(ApresModele).join('');
          var OldModele = ApresModele.substring(0, ApresModele.indexOf('}}')) + '}}';
          var SuiteModele = ApresModele.split(OldModele).join('');

          OldModele = BandeauxPortails_CleanModele(OldModele);

          if(AddPortalText){
               if(((OldModele.indexOf('|'+AddPortalText+'|')!=-1)||(OldModele.indexOf('|'+AddPortalText+'}')!=-1))){
                    alert('Le portail ' + AddPortalText + ' est déjà présent.');
                    document.editform.style.display = "";
                    return;
               }
          }
          if(RemovePortalText && AddPortalText){
               var NouveauModele = OldModele;
               NouveauModele = NouveauModele.split('|' +RemovePortalText+ '|').join('|');
               NouveauModele = NouveauModele.split('|' +RemovePortalText+ '}}').join('}}');
               NouveauModele = NouveauModele.split('}}').join('|' + AddPortalText + '}}');
               var Sommaire = 'Changement rapide de {{portail}} : - '+RemovePortalText+' , + '+AddPortalText.replace(/\|/g," , + ");
          }else if(RemovePortalText){
               var NouveauModele = OldModele;
               NouveauModele = NouveauModele.split('|' +RemovePortalText+ '|').join('|');
               NouveauModele = NouveauModele.split('|' +RemovePortalText+ '}}').join('}}');
               var Sommaire = 'Retrait rapide de {{portail}} : - '+RemovePortalText;
          }else if(AddPortalText){
               var NouveauModele = OldModele.split('}}').join('|' + AddPortalText + '}}');
               var Sommaire = 'Ajout rapide de {{portail}} : + '+AddPortalText.replace(/\|/g," , + ");
          }
          NouveauModele = BandeauxPortails_CleanModele(NouveauModele);
          if(NouveauModele.indexOf('|')==-1){
               if(BandeauxPortails_SkipConfirm || confirm('Erreur :\nLe modèle {{Portail}} doit avoir au moins un paramètre.\n\nSupprimer le modèle {{Portail}} ?')){
                    NouveauModele = "";
               }else{
                    document.editform.style.display = "block";
                    return;
               }
          }
     }else{
// ==================================================================================== Il n'y a pas de modèle {{Portail}}
          if(!AddPortalText){
               alert('Pas de portail à ajouter.');
               document.editform.style.display = "";
               return;
          }
          var NouveauModele = '{{Portail|' + AddPortalText + '}}\n\n';
          var Sommaire = 'Ajout rapide de {{portail}} : + '+AddPortalText.replace(/\|/g," , + ");
          if((OldText.indexOf('{{DEFAULTSORT:')!=-1)||(OldText.indexOf('[[Catégorie:')!=-1)||(OldText.indexOf('[[catégorie:')!=-1)||(OldText.indexOf('[[Categorie:')!=-1)||(OldText.indexOf('[[categorie:')!=-1)){
// ------------------------------------------------------------------------------------ Il y a des catégories
               var DebutModele1 = OldText.substring(0, OldText.indexOf('{{DEFAULTSORT:'));
               var DebutModele2 = OldText.substring(0, OldText.indexOf('[[Catégorie:'));
               var DebutModele3 = OldText.substring(0, OldText.indexOf('[[catégorie:'));
               var DebutModele4 = OldText.substring(0, OldText.indexOf('[[Categorie:'));
               var DebutModele5 = OldText.substring(0, OldText.indexOf('[[categorie:'));
               var SuiteModele = OldText.split(DebutModele1).join('').split(DebutModele2).join('').split(DebutModele3).join('').split(DebutModele4).join('').split(DebutModele5).join('');
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
     }
     var TexteFinal = DebutModele + NouveauModele + SuiteModele;
     var SommaireFinal = Sommaire + ' ; avec [[Projet:JavaScript/Notices/BandeauxPortails|BandeauxPortails]]';
     document.getElementById('wpMinoredit').checked = BandeauxPortails_MinorEdit;
     if(BandeauxPortails_Watchthis==1) document.getElementById('wpWatchthis').checked = "checked";
     if(BandeauxPortails_Watchthis==0) document.getElementById('wpWatchthis').checked = false;
     document.getElementById('wpTextbox1').value = TexteFinal;
     document.getElementById('wpSummary').value = SommaireFinal;
     if(BandeauxPortails_AutoEdit)document.editform.submit();
}

// Nettoyage modèle (espaces, retour à la ligne, pipes)
function  BandeauxPortails_CleanModele(Modele){
          Modele = Modele.replace(/\n/ig, "");
          Modele = Modele.replace(/ \|/ig, "\|");
          Modele = Modele.replace(/\| /ig, "\|");
          Modele = Modele.replace(/\|\|/ig, "\|");
          Modele = Modele.replace(/\|\}/ig, "\}");
          return Modele;
}

//</nowiki></pre>
// ====================================================================================================================
// ==================================================================================================================== FIN DU CODE
//</source>