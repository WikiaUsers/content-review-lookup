/*WITH HUGE THANKS TO TK-999'S HELP. 

https://gist.github.com/TK-999/6527972

*/


( function () {
	'use strict';
	/* @var admins {Array} Array of strings of admin names */

        /*declare the admins. if a new admin gets added, add inside the brackets (the []'s) the following ",'USERNAME'" (without the quotes).
*So say if GoWeegeeGo is added as a admin, the admins would read
*
*       var admins = ['Palkia the dragon', 'LostGod2000', 'DaxterWolfChipmunk', 'Eevee Lover123', 'GoWeegeeGo'],
*
*/
	var admins = ['Palkia the dragon', 'LostGod2000', 'DaxterWolfChipmunk', 'Eevee Lover123'],

i, //declare variable i (for maths)

mods = document.getElementsByClassName( 'chat-mod' ); //just a variable to shorten the link to the class 'chat-mod' in the innerHTML.
	
/*Boring stuff we need to change classes (DON'T EDIT THIS)*/

	for ( i = 0; i < mods.length; i++ ) {
		if ( admins.indexOf( mods[i].getAttribute( 'data-user' ) ) !== -1 ) {
			mods[i].className += ' admin';
		}
	}
}() );