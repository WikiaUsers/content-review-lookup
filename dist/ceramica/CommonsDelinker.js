//<source lang="javascript">
var functionName = getParamValue("function");
function universal_replace () {
      var old_image = getParamValue("oldimage");
      var new_image = getParamValue("newimage");
      var reason = getParamValue("replace_reason");
      if (wgPageName == 'User:CommonsDelinker/commands' || wgPageName == 'User_talk:CommonsDelinker/commands') {
            document.editform.wpTextbox1.value += '\{\{universal replace|' + decodeURI(old_image).split('_').join(' ') + '|' + decodeURI(new_image).split('_').join(' ') + '|reason=' + decodeURI(reason).split('_').join(' ') + '\}\}'
            if (wgPageName == 'User_talk:CommonsDelinker/commands'){
               document.editform.wpTextbox1.value += '--[[Usuario:Kidoma|kidoma]] 08:30 26 sep 2010 (UTC)';
            }
            document.editform.wpSummary.value = 'universal replace: [[:File:' + decodeURI(old_image).split('_').join(' ') + ']] → [[:File:' + decodeURI(new_image).split('_').join(' ') +']] ('+decodeURI(reason).split('_').join(' ')+')'; 
            if (typeof DelinkerSave =="undefined") {
document.editform.wpDiff.click();
}else{
document.editform.wpSave.click();
}
      }
}

function move_cat () {
      var oldcat = getParamValue("oldcat");
      var newcat = getParamValue("newcat");
      if (wgPageName == 'User:CommonsDelinker/commands') {
            document.editform.wpTextbox1.value += '\{\{move cat|' + decodeURI(oldcat).split('_').join(' ') + '|' + decodeURI(newcat).split('_').join(' ') +'\}\}'
            document.editform.wpSummary.value = 'Adding move cat: [[:Category:' + decodeURI(oldcat).split('_').join(' ') + ']] → [[:Category:' + decodeURI(newcat).split('_').join(' ') + ']]';
            document.editform.wpDiff.click();
      }
}
      
for ( var key in wgUserGroups ) { 
   if (wgUserGroups[key] == "sysop" && functionName == "replace") {
      addOnloadHook(universal_replace);
   } else if (wgUserGroups[key] == "sysop" && functionName == "movecat") {
      addOnloadHook(move_cat);
   }
}
//</source>