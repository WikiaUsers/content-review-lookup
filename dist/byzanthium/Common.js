/* Any JavaScript here will be loaded for all users on every page load. */
function tsub(){
  if(document.getElementById('subsub').style.display=='none'){
    document.getElementById('subsub').style.display='block';
    document.getElementById('subsub').style.position='absolute';
    document.getElementById('subsub').style.left='100%';
    document.getElementById('subsub').style.top='90%';
    document.getElementById('subsub').style.cssFloat='left';
    document.getElementById('subsub').style.margin ='0';
    document.getElementById('subsub').style.width ='180px';
    document.getElementById('subsub').style.zIndex ='999999';
  }else{
    document.getElementById('subsub').style.display='none';
  }
}
alert("test");
document.getElementById("WikiHeader").getElementsByTagName("ul")[0].innerHTML = document.getElementById("WikiHeader").getElementsByTagName("ul")[0].innerHTML + '<li class="nav-item"><a href="/wiki/Byzanthium_Wiki:Community_Portal">1</a><ul style="display: none;" class="subnav-2 accent"><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Category:Members">Members</a></li><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Snieuwenhuizen19">Leaders<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul style="display: none;" class="subnav-3 subnav"><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Snieuwenhuizen19">Faction leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:Skylord_ZIM">Military leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Lachrymology">Gatherer leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Gwendyn">Religion leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:BigBellyBuddah">Navy leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Spy_leader" onmouseover="tsub();">Spy leader LLL</a><ul style="display:none;" id="subsub" class="subnav-3 subnav"><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Snieuwenhuizen19">Faction leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:Skylord_ZIM">Military leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Lachrymology">Gatherer leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Gwendyn">Religion leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:BigBellyBuddah">Navy leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Spy_leader">Spy leader</a></li></ul></li></ul></li></ul></li>' + '<li class="nav-item"><a href="/wiki/Byzanthium_Wiki:Community_Portal">2</a><ul style="display: none;" class="subnav-2 accent"><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Category:Members">Members</a></li><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Snieuwenhuizen19">Leaders<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul style="display: none;" class="subnav-3 subnav"><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Snieuwenhuizen19">Faction leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:Skylord_ZIM">Military leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Lachrymology">Gatherer leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Gwendyn">Religion leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:BigBellyBuddah">Navy leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Spy_leader">Spy leader</a></li></ul></li></ul></li>' + '<li class="nav-item"><a href="/wiki/Byzanthium_Wiki:Community_Portal">3</a><ul style="display: none;" class="subnav-2 accent"><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Category:Members">Members</a></li><li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Snieuwenhuizen19">Leaders<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul style="display: none;" class="subnav-3 subnav"><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Snieuwenhuizen19">Faction leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:Skylord_ZIM">Military leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Lachrymology">Gatherer leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Gwendyn">Religion leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/User:BigBellyBuddah">Navy leader</a></li><li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Spy_leader">Spy leader</a></li></ul></li></ul></li>';


importArticles({
  type: "script",
  articles: [
    "MediaWiki:CatBgChange.js",
    "MediaWiki:WikiaSvgLogo.js",
    "MediaWiki:CharacterBoxNavi.js",
    "MediaWiki:WikiNavi.js",
    "MediaWiki:CustomMap2.js"
  ]
});