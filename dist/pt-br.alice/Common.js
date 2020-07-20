/* CUSTOM EDIT BUTTONS */
if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png?1",
     "speedTip": "REDIRECIONAMENTO",
     "tagOpen": "#REDIRECIONAMENTO [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/americanmcgeesalice/images/8/8c/Button_RedX.png",
     "speedTip": "Excluir",
     "tagOpen": "\{\{excluir",
     "tagClose": "\}\}",
     "sampleText": ""};
}
// END

// ============================================================
// BEGIN Template:Games from BioShock Wiki
// ============================================================
 
// Description: Add icons to article title
// Credit:      User:Porter21 (modifications by User:Rappy and User:Gardimuer)

$(function addTitleIcons () {
   if (skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
		case 'monobook':
			insertTarget = $('#firstHeading');
			break;

		case 'oasis':
			if (wgAction != 'submit' && $('#va-titleicons').length > 0) {
				insertTarget = $('.WikiaArticle').prepend($('#va-titleicons'));
			}
			break;
      }
 
      if (insertTarget) {
		$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		$('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="' + wgBlankImgUrl + '">');
 
		$('#va-titleicons').hover(
			function () {
				$(this).addClass('va-titleicons-hover');
			}, function () {
				$(this).removeClass('va-titleicons-hover');
			});
      }
   }
});
 
// ============================================================
// END Template:Games
// ============================================================

/* Sprite icons */
$(function() { $('.edit-pencil').attr('src','https://images.wikia.nocookie.net/__cb20140809102221/americanmcgeesalice/images/4/4f/Pen.png'); });

$(function() { $('.search').attr('src','https://images.wikia.nocookie.net/__cb20130630142411/americanmcgeesalice/images/8/88/Drink_Me_potion_icon.png'); });