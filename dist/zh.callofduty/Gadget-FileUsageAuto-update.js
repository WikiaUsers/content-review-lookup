// <nowiki>
// BEGIN MW GADGET
// *********
// System to rename multiple files and update their references in one fell swoop
// Made by Foodbandlt
// *********
 
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

//END MW GADGET
//</nowiki>