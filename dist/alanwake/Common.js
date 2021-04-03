
// ============================================================
// BEGIN Template:Games
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
			if (wgAction != 'submit' && wgNamespaceNumber != 112 && $('#va-titleicons').length > 0) {
				insertTarget = $('#WikiaPageHeader .tally');
				$('#WikiaPageHeader .tally').html(' ').css('width', '200px');
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

importScriptPage('ShowHide/code.js', 'dev');