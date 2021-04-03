function addForceSummary(){
    if(!/&action=edit/.test(window.location.href)) return;
    if(/&section=new/|>.test(window.location.href)) return;
    if(!document.forms.editform) return;
    document.forms.editform.wpSave.onclick = forceSummary;
}
 
function forceSummary(){
    if(!document.forms.editform.wpSummary.value.replace(/(^ +)|( +$)/g|>,'').replace(/^\/\*.*\*\/ */|>,'')){
      var r = prompt('Please add an edit summary below.',document.forms.editform.wpSummary.value);
      if(r == null) return;
      document.forms.editform.wpSummary.value = r;
    }
    return true;
}
 
if (window.addEventListener) window.addEventListener("load",addForceSummary,false);
else if (window.attachEvent) window.attachEvent("onload",addForceSummary);