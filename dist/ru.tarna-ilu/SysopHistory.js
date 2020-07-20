sysRevDelCSS = appendCSS('#pagehistory input[type="checkbox"], button.mw-history-revisiondelete-button {display:none}')
sysRevDelCSS = sysRevDelCSS.sheet || sysRevDelCSS
addContentSubLink('javascript:sysRevDelCSS.disabled=!sysRevDelCSS.disabled;void 0','Скрытие правок')
var bs = getElementsByClassName(document.getElementById('mw-history-compare'), 'button', 'mw-history-revisiondelete-button')
if (bs && bs.length==2) bs[0].parentNode.removeChild(bs[0])

switch (wgNamespaceNumber){ 
 case 0: case 6: case 10: case 14:
  addContentSubLink(wgArticlePath.replace('$1', 'Special:Stabilization/'
    +encodeURIComponent(wgPageName)), 'Настройки стабилизации')
}