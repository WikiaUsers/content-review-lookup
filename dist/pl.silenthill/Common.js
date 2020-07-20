/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/silenthillpedia/pl/images/b/b5/Redirectltr.png');
  }
addOnloadHook(ChangeRedirectImage);
 
/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');