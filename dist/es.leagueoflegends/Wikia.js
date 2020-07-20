/* Add a tag for "bureaucrat" to user profile header when bureaucrats category present
 * Add a tag for "moderator" to user profile header when moderator category present
 * Add a tag for "rollback" to user profile header when rollback editors category present
 * by: [[User:Technology Wizard]]
 */ 
$(document).ready(function() {
	if (-1 < $.inArray("Burócratas", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Burócrata</span>');
	}
	if (-1 < $.inArray("Moderadores", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Moderador</span>');
	}
	if (-1 < $.inArray("Reversores", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Reversor</span>');
	}
});

/* Adds inactive to user profile */
importScriptPage('InactiveUsers/code.js', 'dev');

/* Add a talk button to pages. http://community.wikia.com/wiki/Admin_Forum:Looking_for_JS_to_add_a_Talk_button?oldid=751269 */
$('<a class="wikia-button comments secondary" data-id="comment" href="/wiki/' + wgCanonicalNamespace + '_talk:' + wgTitle + '" accesskey="t">Talk</a>').insertAfter('#WikiaPageHeader a[href="#WikiaArticleComments"]');

/* test *//*

=======================
Background randomiser
=======================

function randomBack () {
    var opts = [
	
'https://images.wikia.nocookie.net/leagueoflegends/es/images/e/e2/Polar.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/d/d7/Skin15.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/0/09/Skin14.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/f/f1/Skin12.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/a/a5/Skin9.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/4/45/Skin10.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/7/7d/Skin5.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/3/3c/Skin6.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/5/5b/Skin7.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/4/4d/Skin2.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/5/52/Skin3.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/9/9f/Skin4.jpg',

'https://images.wikia.nocookie.net/leagueoflegends/es/images/d/d7/Skin1.jpg',
];

if (wgPageName=='Wiki_League_of_Legends') {
		$('body').css('background-image','url(' + opts[0] + ')');
		$('body').css('background-size','120%'); //for the DS3 background to look better
	}
	else
		$('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
}
 
randomBack();
*/