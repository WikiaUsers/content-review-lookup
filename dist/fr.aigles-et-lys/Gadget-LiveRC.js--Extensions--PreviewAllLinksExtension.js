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
 
Tous les liens internes de la prévisualisation lancent une prévisualisation
 
* Licence : ...?
* Documentation :
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF

var DebugLimit = 5;
var DebugIndex = 0;

function LinkHasClass(node, classNames) {
    var HasClass = false;
    for(var a=0,l=classNames.length;a<l;a++){
        var haystack = node.className;
        if(!haystack) continue;
        if (classNames[a] === haystack) {
            HasClass = true;
        }else{
            HasClass =  (" " + haystack + " ").indexOf(" " + classNames[a] + " ") > -1;
        }
        if(HasClass) return true;
    }
    return false;
}



function liveAllLinks(){
    var Element = document.getElementById("livePreview");
    if(!Element) return;
    var Toc = getElementWithId("toc", "table", Element);
    if(Toc){
        var TocLinks = Toc.getElementsByTagName("a");
        for(var a=0,l=TocLinks.length;a<l;a++){
            if(TocLinks[a].href.indexOf('javascript:') != 0)
            TocLinks[a].href = "javascript:;";
        }
    }

    var Links = Element.getElementsByTagName("a");
    for(var a=0,l=Links.length;a<l;a++){
        var Url = Links[a].href;
        if(!Url) continue;
        try{ Url = decodeURIComponent(Url); }catch(e){ }
        if(Url.indexOf("#")!=-1){
           Links[a].href = Url.substring(0, Url.indexOf("#"));
        }
        if(Links[a].href == "") Links[a].href = "javascript;";
        if(
           LinkHasClass(Links[a].parentNode, new Array("reference", "renvois_vers_le_texte")) ||
           LinkHasClass(Links[a].parentNode.parentNode, new Array("renvois_vers_le_texte"))
           ){
              var NewLink = document.createElement('a');
              NewLink.href = "javascript;";
              NewLink.innerHTML = Links[a].innerHTML;
              Links[a].parentNode.insertBefore(NewLink,Links[a]);
              Links[a].style.display = "none";
           }
        if(!(
              LinkHasClass(Links[a].parentNode, new Array('cachelinks')) || 
              LinkHasClass(Links[a], new Array('noprint', 'external')) || 
              Links[a].href.indexOf('javascript:') == 0 ||
              Links[a].href == "#" 
          )){
            Links[a].onclick = function(){
                return liveModifyLinks(this);
            }
        }
    }
}

function liveModifyLinks(Link, test){
    var Href = Link.href;
    try{ Href = decodeURIComponent(Href); }catch(e){ }
    var ArticlePath = wgArticlePath.split("$1").join("");
    Href = Href.split(wgServer).join("");
    if(ArticlePath) Href = Href.split(ArticlePath).join("");
    Href = Href.split(wgScript+"?").join(""); 
    if(Href.match(/^http/)!=null){ 
        alert(Href);
        return false;
    }
    if(Href.indexOf("title=")==-1)  Href = "title=" + Href;
    var Onclick = "";
    var Params = new Array();
    var URL = Href.split("&");
    for(var a=0,l=URL.length;a<l;a++){
        if(URL[a].indexOf("=")==-1) continue;
        var ParamName = URL[a].split("=")[0];
        var ParamValue = URL[a].split("=")[1];
        Params[ParamName] = ParamValue;
    }
    if(Params["title"]) Params["title"] = Params["title"].replace(/_/g, " ");
    if(Params["action"]){
        if(Params["action"]=="edit"){
              var EditParams = "";
              if(Params["oldid"]) EditParams += "&oldid="+Params["oldid"];
              if(Params["section"]) EditParams += "&section="+Params["section"];
              if(Params["redlink"]) EditParams += "&redlink="+Params["redlink"];
              Onclick = 'liveEdit('+lrcEscapeStr(Params["title"])+(EditParams ? ',\''+EditParams+'\'' : '')+')';
        }
        if(Params["action"]=="delete"){
              Onclick = 'liveDelete('+lrcEscapeStr(Params["title"])+')';
        }
        if(Params["action"]=="protect"){
              Onclick = 'liveProtect('+lrcEscapeStr(Params["title"])+')';
        }
        if(Params["action"]=="historysubmit"){
              Onclick = 'liveDiff('+lrcEscapeStr(Params["title"])+','+lrcEscapeStr(Params["diff"])+','+lrcEscapeStr(Params["oldid"])+')';
        }
    }else{
        var PageNamespaceNumber = getNamespaceInfoFromPage(Params["title"]);
        var PageName = getNamespaceInfoFromPage(Params["title"], "PageName");
        if(PageNamespaceNumber==-1){
            if(PageName.indexOf("Movepage")!=-1 || PageName.indexOf("Renommer une page")!=-1){
                var Page = PageName.replace(/[^\/]*\//, "");
                Onclick = 'liveMove('+lrcEscapeStr(Page)+');';
            }
            if(PageName.indexOf("Contributions")!=-1){
                var Page = Params["target"];
                if(Page) Page = PageName.replace(/[^\/]*\//, "");
                if(PageName.indexOf("DeletedContributions")!=-1 || PageName.indexOf("Contributions supprimées")!=-1){
                    Onclick = 'liveDeletedContrib('+lrcEscapeStr(Page)+');';
                }else{
                    Onclick = 'liveContrib('+lrcEscapeStr(Page)+');';
                }
            }
            if(PageName.indexOf("Blockip")!=-1 || PageName.indexOf("Bloquer")!=-1){
                var Page = PageName.replace(/[^\/]*\//, "");
                Onclick = 'liveBlock('+lrcEscapeStr(Page)+');';
            }
            if(PageName.indexOf("Log")!=-1 || PageName.indexOf("Journal")!=-1){
                var Type = Params["type"];
                var Page = Params["page"];
                var User = Params["user"];
                if(Page) Onclick = 'liveLog(\''+Type+'\',{page:'+lrcEscapeStr(Page)+',user:'+lrcEscapeStr(User)+'});';
            }
        }else{
            if(Params["diff"]&&Params["oldid"]){
                Onclick = 'liveDiff('+lrcEscapeStr(Params["title"])+','+lrcEscapeStr(Params["diff"])+','+lrcEscapeStr(Params["oldid"])+');';
            }
            if(Params["title"] && Params.length==1){
                Onclick = 'liveArticle('+lrcEscapeStr(Params["title"])+');';

            }
        }
    }
    if(Onclick == ""){
        var TitleCustom = (Params["title"] ? ','+lrcEscapeStr(Params["title"]) : "");
        Onclick = 'liveCustom('+lrcEscapeStr(Link.href) + TitleCustom +');';
    }
    eval(Onclick);
    return false;
}

function liveCustom(URL, Title){
  var el = document.getElementById('livePreviewTitle');
  if(!Title) Title=URL.replace(/.*\/wiki\//g, "");
  if(!Title) return;
  el.innerHTML="<b style='text-decoration: blink;'>Custom : <span style='color:red'>"+Title+"</span>...</b>";
  wpajax.http({url: URL,
               onSuccess: getCustom, title:Title});

}

function getCustom(xmlreq, data){
    var c = data.title;
    if(c) buildBlanckPreviewBar('<b><a href="'+lrcGetPageURL(c)+'" target="_new">'+c+'</a></b>');
    var Temp = gml_XMLParse(xmlreq.responseText);
    var bC  = getElementWithId('bodyContent', 'div', Temp);
    if (bC ==  null) bC  = getElementWithId('article', 'div', Temp);
    var PreviewWindow = document.getElementById("livePreview");
    PreviewWindow.innerHTML = "";
    PreviewWindow.innerHTML = bC.innerHTML;
    var PreviewDiv = document.getElementById( 'divLivePreview' );
    if (PreviewDiv.style.display == "none") {
        var elcb = document.getElementById( 'shidPrev' );
        elcb.checked="true";
        PreviewDiv.style.display = "inline";
    }
    liveAllLinks();
}

////////////////////////////////////////// HOOKS

LiveRC_AddHook("AfterPreviewDiff", liveAllLinks);
LiveRC_AddHook("AfterPreviewArticle", liveAllLinks);
LiveRC_AddHook("AfterPreviewHistory", liveAllLinks);
LiveRC_AddHook("AfterPreviewContribs", liveAllLinks);
LiveRC_AddHook("AfterPreviewDeletedContribs", liveAllLinks);
LiveRC_AddHook("AfterPreviewLog", liveAllLinks);
LiveRC_AddHook("AfterPreviewFilter", liveAllLinks);

/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>