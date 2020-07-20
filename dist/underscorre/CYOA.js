/*global $, mw*/

window.states = {
	1: "You awake in a dimly lit room; moss clings to the walls like a disease, and the entire scene feels drenched in the indistinguishable sense of purple prose.<br /><br />You see that there are two doors in front of you, and a knife to your left.<br /><br />Do you...<br /><a href='#' onclick='change_state(2)'>Go through the left door?</a><br /><a href='#' onclick='change_state(3)'>Go through the right door?</a><br /><a href='#' onclick='change_state(4)'>Pick up the knife?</a>",
	2: "You go through the door, and suddenly find yourself in Ponyville, in Equestria. A purple pony sits in front of you, reading a book.<br /><br />Do you...<br /><a href='#' onclick='change_state(5)'>Talk to it?</a><br /><a href='#' onclick='change_state(6)'>Try to fight with it?</a>",
	3: "You go through the door, and suddenly find yourself facing <b>CTHULU</b>.<br /><br />Do you...<br /><a href='#' onclick='change_state(7)'>Attempt to fight with it?</a><br /><a href='#' onclick='change_state(8)'>Accept your fate and die?</a>",
	4: "You accidentally stab yourself and die.<br /><br /><a href='#' onclick='change_state(1)'>Try again?</a>",
	5: "Twilight Sparkle is best pony. Thus, you win! Congratulations!<br /><br /><a href='#' onclick='change_state(1)'>Try again?</a>",
	6: "You are clearly a horrible person. Celestia Herself descends from the heavens and eats you. You lose.<br /><br /><a href='#' onclick='change_state(1)'>Try again?</a>",
	7: "You go insane and die while fighting <b>CTHULU</b>. You lose.<br /><br /><a href='#' onclick='change_state(1)'>Try again?</a>",
	8: "As you lay on the ground, <b>CTHULU</b>'s deranged cries getting closer by the second, you consider how at peace you are with yourself, and a small smile forms on your face. You consider how worthwhile your life has been up to this point, and even emit a small chuckle in happiness. Then <b>CTHULU</b> bites your face off. You lose.<br /><br /><a href='#' onclick='change_state(1)'>Try again?</a>"
};

window.change_state = function(state) {
    "use strict";
    $('#CYOAcontainer').fadeOut(300, function () {
		$(this).remove();
        $('<div id="CYOAcontainer">' + states[state] + '</div>').hide().appendTo('#mw-content-text').fadeIn(300);
	});
};

$(function () {
	"use strict";
    
    window.change_state(1);
});