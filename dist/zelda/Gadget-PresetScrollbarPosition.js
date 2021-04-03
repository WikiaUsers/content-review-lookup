/* 
	Sets the default position of a horizontal scrollbar "thumb" to the center or the right, instead of on the left.
	Intended for use in [[Template:GameNav]].
	Credits to UDB from Stack Overflow for the code: http://stackoverflow.com/users/1642219/udb
*/

var outerDiv, innerDiv;
if (   (outerDiv = document.getElementById('outer')) !== null 
    && (innerDiv = document.getElementById('inner')) !== null) {

	var offsetDiff = innerDiv.offsetWidth - outerDiv.offsetWidth;
	$(document).ready(function() {
		$('.centerScroll').scrollLeft(offsetDiff/2);
		$('.rightScroll' ).scrollLeft(offsetDiff  );
	});

}

/* The basic code for vertical scrollbars, if ever it is needed.

var outerY = document.getElementById('outerY').offsetHeight,
    innerY = document.getElementById('innerY').offsetHeight;
$('.middleScroll').scrollTop((innerY-outerY)/2);
$('.bottomScroll').scrollTop(innerY-outerY);

*/