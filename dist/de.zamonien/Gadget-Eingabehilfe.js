/*-----------------------------------------------------------------*\
| Because people asked me to reuse this script I'd like to set up a |
|       free licence on it. I just decided to use a modified        |
|                 "Hugware-Licence" so here we go:                  |
|                                                                   |
|===================================================================|
|                       HUGWARE (Revision df.01)                    |
|===================================================================|
| http://www.jedipedia.net/wiki/Benutzer_Diskussion:Deus_Figendi    |
| schrieb diese Datei. Solange Sie diesen Vermerk nicht entfernen,  |
| und dieses Programm registrieren können Sie mit der Datei machen, |
| was Sie möchten. Um das Programm zu registrieren müssen Sie       |
| irgendjemanden umarmen. Auch der Autor wird gerne umarmt. Sie     |
| sind eingeladen das Programm sooft zu registrieren wie Sie        |
| möchten.                                                          |
|                                                                   |
| http://www.jedipedia.net/wiki/Benutzer_Diskussion:Deus_Figendi    |
| wrote this file. As long as you don't remove this licence-        |
| agreement and as long you register your copy of this program you  |
| may do whatever you want with this file. To register thist        |
| software just find somone and give him or her a hug. The author   |
| also likes to be huged. You are invited to register the program   |
| as many times you like to.                                        |
|                                                                   |
|                                                                   |
\*-----------------------------------------------------------------*/

console.log('Eingabehilfe gestartet');

function handle_keyinput(event_object) {
	if (event_object.target.selectionStart == event_object.target.selectionEnd) {
		var old_cPosition = event_object.target.selectionStart;
		if (event_object.target.selectionStart == 0) {
			var prev_char = false;
		} else {
			var prev_char = event_object.target.value.charCodeAt(event_object.target.selectionStart-1);
		}
		if (event_object.target.selectionStart < 1) {
			var prev_char2 = false;
		} else {
			var prev_char2 = event_object.target.value.charCodeAt(event_object.target.selectionStart-2);
		}
		if (prev_char == 39) { //'
			console.log('Fall: Apostroph voran');
			if (prev_char2 != 39 && event_object.which != 39) {
				console.log('Fall: alleinstehendes Apostroph');
				event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart-1)+String.fromCharCode(8217)+event_object.target.value.slice(event_object.target.selectionStart);
					event_object.target.selectionStart =old_cPosition;
					event_object.target.selectionEnd = old_cPosition;
			}
		}
		if (event_object.which == 32) { // 
			if (prev_char == 45) { //- 
				console.log('Fall: minus');
				if (prev_char == 45) { // -
					console.log('Fall: 2minus');
					event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart-1)+String.fromCharCode(8211)+event_object.target.value.slice(event_object.target.selectionStart);
					event_object.target.selectionStart =old_cPosition;
					event_object.target.selectionEnd = old_cPosition;
				}
			}
		} else if (event_object.which == 34) { //"
			console.log('Fall: Anfuehrungszeichen');
			if (prev_char == 32 || prev_char == false) { // "
				event_object.preventDefault();
				event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart)+String.fromCharCode(8222)+event_object.target.value.slice(event_object.target.selectionStart);
				event_object.target.selectionStart =old_cPosition+1;
				event_object.target.selectionEnd = old_cPosition+1;
			}
			if (prev_char != 32 && prev_char != false) { //h"
				event_object.preventDefault();
				event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart)+String.fromCharCode(8220)+event_object.target.value.slice(event_object.target.selectionStart);
				event_object.target.selectionStart =old_cPosition+1;
				event_object.target.selectionEnd = old_cPosition+1;
			}
		} else if (event_object.which == 62) { //>
			console.log('Fall: Groeszer');
			if (prev_char == 62) { //>>
				console.log('Fall: 2Groeszer');
				event_object.preventDefault();
				event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart-1)+String.fromCharCode(187)+event_object.target.value.slice(event_object.target.selectionStart);
				event_object.target.selectionStart =old_cPosition;
				event_object.target.selectionEnd = old_cPosition;
			}				
		} else if (event_object.which == 60) { // <
			console.log('Fall: Kleiner');
			if (prev_char == 60) { //<<
				console.log('Fall: 2Kleiner');
				event_object.preventDefault();
				event_object.target.value = event_object.target.value.slice(0,event_object.target.selectionStart-1)+String.fromCharCode(171)+event_object.target.value.slice(event_object.target.selectionStart);
				event_object.target.selectionStart =old_cPosition;
				event_object.target.selectionEnd = old_cPosition;
			}	
		}
	}
}



function dfif_onload() {
	console.log('Suche Textbox...');
	if (document.getElementById("wpTextbox1")) {
		console.log('wpTextbox1 gefunden');
		document.getElementById("wpTextbox1").addEventListener("keypress",function f(e) { handle_keyinput(e); }, false);
		console.log('keypress registriert');
	} else {
		console.log('wpTextbox1 nicht gefunden');
	}
}



console.log('registriere onload-Haken');
//addOnloadHook(dfif_onload);
$(document).ready(dfif_onload);
//dfif_onload();

console.log('Eingabehilfe beendet');