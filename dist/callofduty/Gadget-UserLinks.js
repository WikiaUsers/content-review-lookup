// <nowiki>
// BEGIN MW GADGET
// UserLinks - adds a WikiaRail box with links to various user log pages
// Written by Madnessfan34537

function UserPageLinks() {

    var userArray = wgPageName.split(":");
     
    $('.WikiaRail').append('<section class="module"><div><a href="/index.php?title=Special%3ALog&type=&user=&page=User%3A' + userArray[1] + '&year=&month=-1&tagfilter=">Logs done to user</a><br/><a href="/index.php?title=Special%3ALog&type=block&user=&page=User%3A' + userArray[1] + '&year=&month=-1&tagfilter=">Block Logs</a><br/><a href="/wiki/Special:Log/' + userArray[1] + '">Logs done by user</a><br/><a href="/wiki/Special:Editcount/' + userArray[1] + '">Editcount</a></div>');

}

if(wgCanonicalNamespace == "User") {
	addOnloadHook(UserPageLinks);
}

// END MW GADGET
// </nowiki>