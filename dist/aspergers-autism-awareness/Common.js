// *** Custom user rights icons on userpages ***
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
importScript('MediaWiki:Common.js/userRightsIcons.js');
}