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
 
Ajoute un champ de texte dans le menu d'options pour visualiser n'importe quelle page
 
* Licence : ...?
* Documentation :
* Auteur : [[wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF


var lrc_PreviewThisPageButton = [
                                  {id : "PreviewThisPage_StartButton", text : "P",  title : "Prévisualiser une page"   },
                                  {id : "PreviewThisPage_TextInput",   text : "",   title : ""                         },
                                  {id : "PreviewThisPage_OKButton",    text : "OK", title : "Prévisualiser cette page" }
                                ];
lrcManageParams_Desc['Desclrc_PreviewThisPageButton'] = new Array('Paramètres de PreviewThisPageExtension', 'PreviewThisPageExtension');
 
if(typeof(Suggest_AddPageSuggestion)!="function"){ 
    importScriptURI("//fr.wikipedia.org/wiki/MediaWiki:Gadget-Suggest.js&action=raw&ctype=text/javascript");
}

function LiveRC_PreviewThisPageExtension_AddButton(){
    var Form = document.createElement('form');
    Form.id = "PreviewThisPageButtons"
    for(var a=0,l=lrc_PreviewThisPageButton.length;a<l;a++){
        var Input = document.createElement('input');
        Input.type = (a==1 ? "text" : "button");
        Input.id = lrc_PreviewThisPageButton[a]["id"];
        Input.value = lrc_PreviewThisPageButton[a]["text"];
        Input.title = lrc_PreviewThisPageButton[a]["title"];
        Input.setAttribute('style', 'padding:0;');
        Form.appendChild(Input);
        if(a==0){
            Input.onclick = function(){
                LiveRC_PreviewThisPageExtension_ShowHide();
            }
            Input.onselect = function(){
                LiveRC_PreviewThisPageExtension_ShowHide();
            }
        }
        if(a==1){
            Suggest_AddPageSuggestion({"InputNode": Input });
        }
        if(a==2){
            Input.onclick = function(){
                LiveRC_PreviewThisPageExtension_Preview();
            }
            Input.onselect = function(){
                LiveRC_PreviewThisPageExtension_Preview();
            }
        }
    }
    AddButtonToControlBar(Form);
    LiveRC_PreviewThisPageExtension_ShowHide();
}

function LiveRC_PreviewThisPageExtension_ShowHide(){
    var Inputs = document.getElementById("PreviewThisPageButtons").getElementsByTagName("input");
    for(var a=1,l=Inputs.length;a<l;a++){
        var Input = Inputs[a];
        var Type = Input.type;
        if(Type=="text" || Type=="button"){
            if(Input.style.display == "none"){
                Input.style.display = "";
            }else{
                Input.style.display = "none";
                if(Type=="text") Input.value = "";
            }
        }
    }
}

function LiveRC_PreviewThisPageExtension_Preview(){ 
    var Input = false;
    var Inputs = document.getElementById("PreviewThisPageButtons").getElementsByTagName("input");
    for(var a=0,l=Inputs.length;a<l;a++){
        var ThisInput = Inputs[a];
        var Type = ThisInput.type;
        if(Type=="text") Input = ThisInput;
    }
    if(!Input) return;
    var Value = Input.value;
    if(!Value) return;
    var NS = Suggest_GetNamespaceInfoFormPage(Value);
    if(NS==-1) return;
    liveArticle(Value);
    LiveRC_PreviewThisPageExtension_ShowHide();
}

LiveRC_AddHook("AfterOptions", LiveRC_PreviewThisPageExtension_AddButton);
LiveRC_AddHook("AfterFillParamPanel", function(){
    LiveRC_ManageParams_Fill(lrc_PreviewThisPageButton, "lrc_PreviewThisPageButton");
});

/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>