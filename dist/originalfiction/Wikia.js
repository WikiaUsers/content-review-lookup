/*---------------------- Framekiller ----------------------------------*/
 // Additional UserRights Icons in profile mastheads
 importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 // END Additional UserRights Icons in profile mastheads
if (parent.frames.length > 0) { 
  var file = document.referrer.match(/imgurl=(.*?)&/);
  if ( file.length > 0 ){
    top.location.href =  document.location.href + '?file=' + file[1].split('/').pop();
  } else {
    top.location.href =  document.location.href
  }
}
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
/*--------------------------------------------------------------------*/