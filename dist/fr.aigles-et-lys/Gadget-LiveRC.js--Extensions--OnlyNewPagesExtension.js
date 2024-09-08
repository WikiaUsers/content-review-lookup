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
 
Permet de n'afficher que les nouvelles pages
 
* Licence : ...?
* Documentation :
* Auteur : [[wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 
if(typeof(lang_menu.ONLYNEWPAGES)=="undefined") 
 lang_menu.ONLYNEWPAGES = "Nouvelles pages";

if(typeof(lrcOptionMenuValues.OnlyNewPages)=="undefined") 
 lrcOptionMenuValues.OnlyNewPages = true;

if(typeof(lrcManageParams_Desc.DescONLYNEWPAGES)=="undefined")
 lrcManageParams_Desc.DescONLYNEWPAGES =  new Array("Nouvelles pages", "Nouvelles pages");
if(typeof(lrcManageParams_Desc.DescOnlyNewPages)=="undefined")
 lrcManageParams_Desc.DescOnlyNewPages =  new Array('Case "Nouvelles pages"', 'Case "Nouvelles pages"');

function LiveRC_OnlyNewPagesExtension_AddButton(){
    var showRC = document.getElementById( 'showRC' );
    if(!showRC) return;
    var NewInput = document.createElement('input');
    NewInput.id = "ONLYNEW";
    NewInput.type = "checkbox";
    if(lrcOptionMenuValues.OnlyNewPages) NewInput.checked = "checked";
    showRC.parentNode.insertBefore(NewInput, showRC);
    var NewLabel = document.createElement('label');
    NewLabel.setAttribute('for', "ONLYNEW");
    NewLabel.innerHTML = lang_menu.ONLYNEWPAGES;
    showRC.parentNode.insertBefore(NewLabel, showRC);
    
}
LiveRC_AddHook("AfterOptions", LiveRC_OnlyNewPagesExtension_AddButton);

function LiveRC_OnlyNewPagesExtension_CheckNew(Args){
    if(!document.getElementById("ONLYNEW").checked) return;
    var tr1 = document.getElementById(Args.id);
    if (!tr1) return;
    var rc = Args.rc;
    if(!(lrcHasState(rc.state, "NEW"))){
        tr1.parentNode.removeChild(tr1);
    }
}
LiveRC_AddHook("AfterRC", LiveRC_OnlyNewPagesExtension_CheckNew);

/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>