function sysopStart(){
 switch (wgAction){

  case 'view':
    if (/Contributions|Log|Undelete/.test(wgCanonicalSpecialPageName) && wgTitle!='AbuseLog')
      hideRevDelInterface('span.mw-revdelundel-link {display:none}')
    break

 case 'protect': case 'unprotect': //avoid [move=autoconfirmed] in logs
   $j('#mwProtect-level-edit').change( function(e){
     if ( ! $j('#mwProtectUnchained').attr('checked') && $j('#mwProtect-level-move').val() == 'autoconfirmed')
       $j('#mwProtect-level-move').val('')
   })
   break
   
  case 'history':
    hideRevDelInterface('#pagehistory input[type="checkbox"], button.mw-history-revisiondelete-button {display:none}')
    // [[mediazilla:23747]]: remove top button
    var bs = $j('#mw-history-compare button.mw-history-revisiondelete-button')
    if (bs.length==2) bs.eq(0).remove()
    //stabilization link
    switch (wgNamespaceNumber){ 
      case 0: case 6: case 10: case 14:
        addContentSubLink(wgArticlePath.replace('$1', 'Special:Stabilization/'
         +encodeURI(wgPageName)), 'Настройки стабилизации')
    }
  
 }//switch
}



function addContentSubLink(url, name){
 var cSub = $j('#contentSub')
 if (cSub.find(':last-child').attr('nodeName') == 'A')
    cSub.append(' · ')
 cSub.append(' <a href="'+url+'">'
 +'<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Edit-clear.svg/10px-Edit-clear.svg.png">'
 +' '+name+'</a>')
}


function hideRevDelInterface(css){
  window.hideRevDelCSS = appendCSS(css)
  hideRevDelCSS = hideRevDelCSS.sheet || hideRevDelCSS
  addContentSubLink('javascript:hideRevDelCSS.disabled=!hideRevDelCSS.disabled;void 0','Скрытие правок')
}


addOnloadHook(sysopStart)