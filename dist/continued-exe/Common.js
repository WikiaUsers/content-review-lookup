/* Any JavaScript here will be loaded for all users on every page load. */
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[Wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Checks if a div with the id "spoilers_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "spoilers".

document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(400, function () {
        this.style.display = "none";
    });
});