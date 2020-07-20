/* Description: This code adds a class to the HTML <body> tag according to the user's computer time, in order to change the body's background image via CSS.
 * Details: the possible classes are:
   * "morning", if local PC time is ≥ 6:00 and < 13:00
   * "afternoon", if local PC time is ≥ 13:00 and < 20:00
   * "night", if local PC time is any other, i.e. ≥ 20:00 and < 6:00
 * Note: The changes will only be seen if the classes are defined at MediaWiki:Common.css
 * Testing: Users wishing to test it may change their own PC time settings, to see a new background image being displayed. Remember to fix the time after the test! Also check if the date hasn't been changed.
 * Author: SapadorCastelo
 */

(function() {
    'use strict';

var currentTime = new Date().getHours();
if (6 <= currentTime && currentTime < 13) {
    if (document.body) {
        document.body.classList.add("morning");
    }
}
else if (13 <= currentTime && currentTime < 20) {
    if (document.body) {
        document.body.classList.add("afternoon");
    }
}
else {
    if (document.body) {
        document.body.classList.add("night");
    }
}
})();