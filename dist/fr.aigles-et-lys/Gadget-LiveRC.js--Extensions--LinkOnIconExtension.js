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
 
Permet de mettre un lien sur les icônes PàS, AdQ, etc.
 
* Licence : CC0
* Documentation :
* Auteur : [[Wikipedia:fr:User:Orlodrim]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF

function lrcXILGetTalkPage(article) {
    var PageNamespaceNumber = getNamespaceInfoFromPage(article);
    var PageName = getNamespaceInfoFromPage(article, "PageName");
    if(PageNamespaceNumber%2==0){
        var TalkPageNamespaceNumber = (PageNamespaceNumber+1);
    }else{
        var TalkPageNamespaceNumber = PageNamespaceNumber;
    }
    return wgFormattedNamespaces[TalkPageNamespaceNumber] + ":" + PageName;
}

function lrcXILHook(Args) {
  var tr1 = document.getElementById(Args.id);
  if (!tr1) return;
  var rc = Args.rc;
  var article = rc.title;
  var user = rc.user;
  var talkpage = lrcXILGetTalkPage(article);

  var images = tr1.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    var imgAlt = img.getAttribute('alt');
    var linkTarget = false;
    if (imgAlt == 'PaS') {
      linkTarget = lrcGetPageURL(lrcXILGetTalkPage(article) + '/Suppression');
    } else if (imgAlt == 'Copyright') {
      linkTarget = lrcGetPageURL(lrcXILGetTalkPage(article) + '/Droit d\'auteur');
    } else if (imgAlt == 'Article semi-protégé' || imgAlt == 'Article protégé') {
      linkTarget = wgServer + wgScriptPath + '/index.php?title='
              + encodeURIComponent('Spécial:Journal') + '&page='
              + encodeURIComponent(article);
    } else if (imgAlt == 'Article potentiellement de qualité' || imgAlt == 'Adq') {
      linkTarget = lrcGetPageURL(lrcXILGetTalkPage(article) + '/Article de qualité');
    } else if (imgAlt == 'Bon article') {
      linkTarget = lrcGetPageURL(lrcXILGetTalkPage(article) + '/Bon article');
    }
    if (!linkTarget) continue;
    var parent = img.parentNode;
    var link = document.createElement('a');
    link.href = linkTarget;
    link.target = '_new';
    parent.insertBefore(link, img);
    parent.removeChild(img);
    link.appendChild(img);
  }
}

LiveRC_AddHook("AfterRC", lrcXILHook);

} // FIN IF

//</source>