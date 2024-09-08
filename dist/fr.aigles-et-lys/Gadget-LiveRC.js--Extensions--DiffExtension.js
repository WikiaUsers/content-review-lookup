/* ************************************************************************************************************************************************
// Extension de LiveRC

// Ajout de fonctions automatiques dans les pages de diff
 

{{:Projet:JavaScript/Script|LiveRC}} 

************************************************************************************************************************************************ */
if (typeof(lrcGetArgFromURL)=="function" &&
    typeof(buildLiveTag)=="function" && 
    typeof(buildLiveBlank)=="function" && 
    typeof(buildLiveUndo)=="function" && 
    typeof(buildLiveAverto)=="function" && 
    typeof(AddButtonToControlBar)=="function" && 
    typeof(LiveRC_RevertMessagesExtension_Init)=="function" ) { // DÉBUT IF

/* ************************************************************************************************************************************************ */
 

function LiveRC_DiffExtension_Init(){
    if(wgAction!="view" && wgAction != "purge") return;
    var URL = document.URL;
    try{ URL = decodeURIComponent(URL); }catch(e){ }
    if(URL.indexOf("&diff=")==-1) return;
    var TableDiff = getElementsByClassName(document, "table", "diff")[0];
    if(!TableDiff) return;
    if(typeof(LiveRC_getSiteCustom)==="function") try{ LiveRC_getSiteCustom(); }catch(e){ } 
    if(typeof(LiveRC_getUserCustom)==="function") try{ LiveRC_getUserCustom(); }catch(e){ }

    var Control = document.createElement('table');
    Control.id = "livePreviewFoot";
    Control.style.width = "100%";
    Control.style.display = "block";
    Control.appendChild(document.createElement('tr'));
    TableDiff.parentNode.insertBefore(Control, TableDiff);
    LiveRC_DiffExtension_Build();
}

function LiveRC_DiffExtension_Build(TD){
    var Page = wgPageName.replace(/_/g, " ");
    var User1 = document.getElementById('mw-diff-otitle2');
    if (User1 != null) {
      User1 = User1.getElementsByTagName('a')[0].innerHTML;
    }
    var User2 = document.getElementById('mw-diff-ntitle2');
    if (User2 != null) {
      User2 = User2.getElementsByTagName('a')[0].innerHTML;
    }
    var Oldid = document.getElementById('mw-diff-otitle1');
    if (Oldid != null) {
      Oldid = Oldid.getElementsByTagName('a')[0].href;
      try{Oldid = decodeURIComponent(Oldid); }catch(e){ };
      Oldid = lrcGetArgFromURL(Oldid, "oldid");
    }
    var User = User2;
    var NextModifLink = document.getElementById("differences-nextlink");
    var AllForms = new Array();
    AllForms.push( buildLiveTag(Page) );
    AllForms.push( buildLiveBlank(Page) );
    if(!NextModifLink) AllForms.push( buildLiveUndo(Page, Oldid, User1, User2) );
    AllForms.push( buildLiveAverto(Page, User, true) );
    for(var a=0,l=AllForms.length;a<l;a++){
        var Sep = (a==0 ? false : true);
        AddButtonToControlBar(AllForms[a], Sep);
    }
    LiveRC_RevertMessagesExtension_Init();
}

if(wgUserGroups && wgUserGroups.indexOf("autopatrolled")!=-1){
     addOnloadHook(LiveRC_DiffExtension_Init);
}
/* ************************************************************************************************************************************************ */
} // FIN IF