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
 
Permet de n'afficher que les modifications faites dans une ou plusieurs catégories

* Licence : ...?
* Documentation :
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :

 
{{Catégorisation JS|LiveRC}}

<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 
 
if(typeof(Suggest_AddPageSuggestion)!="function"){
    importScriptURI('//fr.aigles-et-lys.wikia.com/wiki/MediaWiki:Gadget-Suggest.js&action=raw&ctype=text/javascript');
}

lrcOptionMenuValues.showCatRC = true;
lang_menu.showCatRCText = "Catégories";
lang_messages.RCCategoryNoCat = "Vous devez sélectionner l'option « $1 » pour pouvoir filtrer par catégorie";


function LiveRC_CategoryRC_AddButton(){    
    var Form = document.createElement('form');
    Form.id = "SelectCategoryForm";
    var NewInput = document.createElement('input');
    NewInput.id = "showCatRC";
    NewInput.type = "checkbox";
    NewInput.onclick = function(){ LiveRC_CategoryRC_ToggleShowCatRC(this); };
    Form.appendChild(NewInput);
    var NewLabel = document.createElement('label');
    NewLabel.setAttribute('for', "showCatRC");
    NewLabel.appendChild(document.createTextNode(lang_menu.showCatRCText));
    Form.appendChild(NewLabel);
    AddButtonToControlBar(Form);
    if(lrcOptionMenuValues.showCatRC){ 
        NewInput.checked = "checked";
        LiveRC_CategoryRC_ToggleShowCatRC(NewInput);
    }
}
LiveRC_AddHook("AfterOptions", LiveRC_CategoryRC_AddButton);

var LiveRC_defaultCats = [
    {cat:"Portail:Amérique/Articles liés", checked:true}, 
    {cat:"Portail:Cinéma/Articles liés", checked:true}, 
    {cat:"Portail:Europe/Articles liés", checked:true}, 
    {cat:"Portail:Musique/Articles liés", checked:true}
];

function LiveRC_CategoryRC_ToggleShowCatRC(showCatRC){
    var showCatList = document.getElementById("showCatList");
    if(showCatList){ 
        showCatList.parentNode.removeChild(showCatList);
        showCatRC.checked = false;
        return;
    }
    if(!showCatRC.checked) return;
    var OptionsPanel = document.getElementById("livePreviewFoot");
    showCatList = document.createElement('div');
    showCatList.id = "showCatList";
    OptionsPanel.appendChild(showCatList);
    showCatList.appendChild(document.createElement('hr'));
    if(!lrcParams["LoadCatAndTemplates"]){
        var p = document.createElement('p');
        p.setAttribute('style', 'text-align:center;');
        var span = document.createElement('span');
        span.className = "error";
        var NoCatMessage = lang_messages.RCCategoryNoCat.split("$1").join(lrcManageParams_Desc["DescLoadCatAndTemplates"][0]);
        span.appendChild(document.createTextNode(NoCatMessage));
        p.appendChild(span);
        showCatList.appendChild(p);
    }
    var Ul = showCatList.appendChild(document.createElement('ul'));
    Ul.id = "showCatListUl";
    Ul.setAttribute('style', "-moz-column-count:2;-webkit-column-count:2;column-count:2;list-style:none;list-image:none;margin:0;");
    for(var a=0,l=LiveRC_defaultCats.length;a<l;a++){
        var Li = document.createElement('li');
        var InputCheck = document.createElement("input");
        InputCheck.type = "checkBox";
        if(LiveRC_defaultCats[a].checked) InputCheck.checked = "checked";
        var Input = document.createElement("input");
        Input.type = "text";
        Input.size = 50;
        Input.value = LiveRC_defaultCats[a].cat;
        var DeleteInput = document.createElement('input');
        DeleteInput.type = "button";
        DeleteInput.value = "[-]"
        DeleteInput.onclick = function(){ LiveRC_CategoryRC_DeleteThisCat(this); };
        DeleteInput.onselect = function(){ LiveRC_CategoryRC_DeleteThisCat(this); };
        Li.appendChild(InputCheck);
        Li.appendChild(Input);
        Li.appendChild(DeleteInput);
        Ul.appendChild(Li);
        Suggest_AddPageSuggestion({
            "InputNode"       : Input,
            "NSFilter"        : 14,
            "StripNS"         : true,
            "AddExist"        : true
        });
        Suggest_GetSuggestions(Suggest_GetSuggestionIndex(Input));
    }
    var Li = document.createElement('li');  
    Li.setAttribute('style', 'text-align:center;');
    var AddCatInput = document.createElement('input');
    AddCatInput.type = "button";
    AddCatInput.value = "[+]";
    AddCatInput.onclick = function(){ LiveRC_CategoryRC_AddACat(this); };
    AddCatInput.onselect = function(){ LiveRC_CategoryRC_AddACat(this); };
    Li.appendChild(AddCatInput);
    Ul.appendChild(Li);
}

function LiveRC_CategoryRC_DeleteThisCat(DeleteInput){
    var Li = DeleteInput.parentNode;
    if(Li) Li.parentNode.removeChild(Li);
}

function LiveRC_CategoryRC_AddACat(AddCatInput){
    var LastLi = AddCatInput.parentNode;
    var Li = document.createElement('li');
    var InputCheck = document.createElement("input");
    InputCheck.type = "checkBox";
    var Input = document.createElement("input");
    Input.type = "text";
    Input.size = 50;
    Input.value = "";
    var DeleteInput = document.createElement('input');
    DeleteInput.type = "button";
    DeleteInput.value = "[-]"
    DeleteInput.onclick = function(){ LiveRC_CategoryRC_DeleteThisCat(this); };
    DeleteInput.onselect = function(){ LiveRC_CategoryRC_DeleteThisCat(this); };
    Li.appendChild(InputCheck);
    Li.appendChild(Input);
    Li.appendChild(DeleteInput);
    LastLi.parentNode.insertBefore(Li, LastLi);
    Suggest_AddPageSuggestion({
        "InputNode"       : Input,
        "NSFilter"        : 14,
        "StripNS"         : true,
        "AddExist"        : true
    });
}

function LiveRC_CategoryRC_getCategories(){
    var showCatRC = document.getElementById("showCatRC");
    if(!showCatRC) return false;
    if(!showCatRC.checked) return false;
    var showCatList = document.getElementById("showCatList");
    if(!showCatList) return false;
    var Categories = new Array();
    var Lis = showCatList.getElementsByTagName('li');
    for(var a=0,l=Lis.length;a<l;a++){
        var Li = Lis[a];
        var CheckBox = Li.getElementsByTagName('input')[0];
        var Input = Li.getElementsByTagName('input')[1];
        if(!CheckBox || !Input) continue;
        if(CheckBox.type != "checkbox") continue;
        if(!CheckBox.checked) continue;
        var Cat = Input.value;
        if(!Cat) continue;
        if(Categories.indexOf(Cat)==-1) Categories.push(wgFormattedNamespaces[14]+":"+Cat);
    }
    if(Categories.length===0) return false;
    return Categories;
}

function LiveRC_CategoryRC_filterRC(Args){
    if(!lrcParams["LoadCatAndTemplates"]) return;
    var showCatRC = document.getElementById("showCatRC");
    if(!showCatRC) return;
    if(!showCatRC.checked) return;
    var ID = Args.id;
    var TR = document.getElementById(ID);
    if(!TR) return;
    var Categories = LiveRC_CategoryRC_getCategories();
    if(!Categories) return;
    var rc = Args.rc;
    var Cats = rc.categories;
    if(!Cats){
        TR.parentNode.removeChild(TR);
        return;
    }
    var HasCat = false;
    for(var a=0,l=Cats.length;a<l;a++){
        if(Categories.indexOf(Cats[a])!=-1){
            HasCat = true;
        }
    }
    if(!HasCat) TR.parentNode.removeChild(TR);
}
LiveRC_AddHook("AfterRC", LiveRC_CategoryRC_filterRC);

LiveRC_AddHook("AfterFillParamPanel", function(){
    LiveRC_ManageParams_Fill(LiveRC_defaultCats, "LiveRC_defaultCats", true);
});

lrcManageParams_Desc["DescLiveRC_defaultCats"] = new Array("Catégories par défaut", "Catégories par défaut");
lrcManageParams_Desc["DescshowCatRC"] = new Array('Case \"Catégories\"', 'Case \"Catégories\"');
/* ************************************************************************************************************************************************ */
} // FIN IF

//</source>