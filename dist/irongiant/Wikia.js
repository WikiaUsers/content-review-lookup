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



///////////////////////////
 

$(function() {
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
});


$(function() {
    var headerBackgroundImages = [
      'https://images.wikia.nocookie.net/__cb20140621045947/irongiant/images/c/c4/Menu.jpg',
      'https://images.wikia.nocookie.net/__cb20140621045443/irongiant/images/d/d2/Menu2.png',
      'https://images.wikia.nocookie.net/__cb20140621045910/irongiant/images/9/93/Menu5.jpg',
      'https://images.wikia.nocookie.net/__cb20140627221245/irongiant/images/0/06/Menu3.jpg',
      'https://images.wikia.nocookie.net/__cb20140621045829/irongiant/images/f/f5/Menu6.jpg'
    ];
$('.WikiHeader').css('background-image', 'url("' + headerBackgroundImages[Math.floor(Math.random() * headerBackgroundImages.length)] + '")');
});