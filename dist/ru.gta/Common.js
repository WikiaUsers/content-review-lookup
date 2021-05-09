/*Иконки*/
function addTitleIcons() {
	if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
		var insertTarget;
 
		switch (skin) {
			case 'monobook':
				insertTarget = $('#firstHeading');
				break;
			case 'oasis':
				if (wgAction != 'submit' && wgNamespaceNumber != 112) {
					insertTarget = $('#WikiaArticle');
				}
				break;
		}
		if (insertTarget) {
			$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		}
	}
}
jQuery(function($) {
	addTitleIcons();
});
 
//UserNameReplace
function UserNameReplace() {
	if( typeof( disableUsernameReplace ) != 'undefined' && disableUsernameReplace || wgUserName == null ) { return; }
	$("SPAN.insertusername").html(wgUserName);
}
addOnloadHook( UserNameReplace );
 
//TimedSlider
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});

function addTitleIcons() {
   if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaArticle');
            }
            break;
      }
 
      if (insertTarget) {
         $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
      }
   }
}
 
jQuery(function($) {
   addTitleIcons();
});