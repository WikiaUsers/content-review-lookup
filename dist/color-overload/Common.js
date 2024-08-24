/* Any JavaScript here will be loaded for all users on every page load. */

// commented out as not currently working - seems an interesting idea though, perhaps it could be revived?
/*
function WarnBarShow() {
  Body=document.getElementById("body");
  Body.insertBefore(WarnBar,Body.firstChild);
  for(a=60;a<=105;++a){
   window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(a-105)+"px; margin-bottom: "+(a-105)+"px;');",a*10);
  };
};
 
function WarnBarHide() {
  for(a=1;a<=46;++a){
    window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(-a)+"px; margin-bottom: "+(-a)+"px;');",a*10);
  };
};
 
if(wgNamespaceNumber+wgArticleId==0){
  var FLUC="", ColAt=wgTitle.indexOf(":"), NewWord=true;
  for(CN=0;CN<wgTitle.length;++CN){
    Letter=wgTitle.substring(CN,CN+1);
    FLUC+=(NewWord)?Letter.toUpperCase():Letter;
    NewWord=(Letter==" "||CN==ColAt);
  };
  if(wgTitle!=FLUC){
    WarnBar=document.createElement("div");
    WarnBar.setAttribute("style","top: -46px; margin-bottom: -46px;");
    WarnBar.setAttribute("id","WarnBar");
    WarnBar.innerHTML='<span id="WarnBarHead">&nbsp;</span><div id="WarnBarMsg">The page you are creating does <b>not</b> match our <b><a href="http://lyrics.wikia.com/LW:PN" target="_blank">page naming conventions</a></b>.<br>The correct title is <b>"<a href="http://lyrics.wikia.com/'+FLUC.replace(/ /g,"_")+'" target="_blank">'+FLUC+'</a>"</b>. Please use that page instead.</div><span id="WarnBarX" onClick="WarnBarHide();" title="Hide">x</span>';
    window.setTimeout("WarnBarShow();", 1500); // Wait for the "body" Element
  };
};