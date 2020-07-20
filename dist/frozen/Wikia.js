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

// START Randomize wiki logo
$(function() {
    var images = [
      'https://vignette.wikia.nocookie.net/frozen/images/0/02/Wiki_Logo_-_Anna.png/revision/latest?cb=20200512230902',
      'https://vignette.wikia.nocookie.net/frozen/images/7/78/Wiki_Logo_-_Elsa.png/revision/latest?cb=20200512230953',
      'https://vignette.wikia.nocookie.net/frozen/images/d/da/Wiki_Logo_-_Hans.png/revision/latest?cb=20200512231012',
      'https://vignette.wikia.nocookie.net/frozen/images/f/f6/Wiki_Logo_-_Kristoff.png/revision/latest?cb=20200512231024',
      'https://vignette.wikia.nocookie.net/frozen/images/2/24/Wiki_Logo_-_Marshmallow.png/revision/latest?cb=20200512231042',
      'https://vignette.wikia.nocookie.net/frozen/images/f/fb/Wiki_Logo_-_Olaf.png/revision/latest?cb=20200512231053',
      'https://vignette.wikia.nocookie.net/frozen/images/0/0a/Wiki_Logo_-_Sven.png/revision/latest?cb=20200512231057',
    ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
// END Randomize wiki logo