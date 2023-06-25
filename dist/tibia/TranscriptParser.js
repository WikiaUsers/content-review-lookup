// this code is used in [[Transcripts/Parser]]
$(function(){
function CopyText(){
	document.getElementById("text_output").select();
	document.getElementById("text_output").setSelectionRange(0, -1);
	document.execCommand("copy");
}
function ClearText(){
	document.getElementById("text_input").value = "";
	document.getElementById("text_output").value = "";
}
function ProcessText() {
	conversation =  document.getElementById("text_input").value.trim();
	lines = conversation.split("\n"); //splitting the text into lines
	processed_lines = []; //an array for future processed lines
	player_messages = [];
	if (lines.length > 1 ){ //checks that there is text in the input window
		//finding if there is a timestamp preceeding the messages so it can be removed
		if (lines[0].split(":").length-1 > 1){
			timestamp = lines[0].indexOf(" ")+1; 
		} else {
			timestamp = 0;
		}
		
		first_line_message_start = lines[0].lastIndexOf(":"); //finding the last colon to figure out where the message starts
		player_string = lines[0].substring(timestamp, first_line_message_start); // getting the player name string including level from start to message start
		 //getting the player's name without the level to be replaced in the npc replies
		if (lines[0].match(/\[.*?\]/).length == 1 ){ //a check in case a player's log does not contain their level
			player_name = player_string.split(" [")[0];
		} else {
			player_name = player_string;
		}
		
		second_line_message_start = lines[1].lastIndexOf(":"); //finding the last colon to figure out where the npc's message start
		npc_name = lines[1].substring(timestamp, second_line_message_start); //getting the npc's name

		for (l=0;l< lines.length; l++) { //looping through the dialogue lines
			new_string = lines[l].substring(timestamp); //removing the timestamp
			if (new_string.indexOf(player_string) != -1){ //processing the players messages
				new_string = new_string.replace(player_string, "'''Player'''");
				player_message = new_string.substring(new_string.lastIndexOf(":")+2);
				player_messages.push(player_message);
			} else { //processing the npc messages
				new_string = new_string.replace(player_name, "''Player''");
			}
			processed_lines.push(new_string);
			}
		transcript = processed_lines.join(" <br />\n");
		//retroactively marks all the player's keywords in the conversations 
		for (m=1;m< player_messages.length; m++) {
			if (document.getElementById("highlight").checked == true) {
				transcript = transcript.replaceAll(player_messages[m],"'''"+player_messages[m]+"'''");
			} else {
				transcript = transcript.replaceAll(": "+player_messages[m],": '''"+player_messages[m]+"'''");
			}
		}
		transcript = "{{Infobox Transcript|\n" + transcript + " <br />\n}}\n\n[[Category:Transcripts]]";
		document.getElementById('text_output').value = transcript;
		link = document.getElementById("create_transcript_page");
		link.href = "https://tibia.fandom.com/wiki/"+npc_name+"/Transcripts?action=edit";
		link.innerHTML = "Create transcript page for "+npc_name;
	} else {
		document.getElementById("text_output").innerHTML = "Paste an NPC conversation log in the input window.";
	}
}
function insert_html(){
npc_transcript_parser = 
'<h3>NPC dialogue to transcript converter :</h3>'+
'<ul><li>make sure your conversation log\'s first line is the player greeting the npc and the second line is the npc\'s response : <pre>12:34:50 Player [100]: hi<br>12:34:50 Npc: Greetings.</pre></li>'+
'<li>if the player\'s name is a common word or phrase make sure it is not replaced erroneously in the conversation.</li>'+
'<li>highlighting players keywords will not work properly in cases where the players responses are common words, make sure to double check the results.</li></ul>'+
'<h3>Input - paste your npc dialogue here :</h3>'+
'<textarea id="text_input" class="textarea" col="30" rows="8" style="width:100%;"></textarea>'+
'<input type="checkbox" id="highlight">'+
'<label for="highlight">check to also highlight the keywords in the npc responses</label>'+
'<br><button id="process">Process text</button>'+
'<button id="clear">clear text</button>'+
'<h3>Output - <a href="https://tibia.fandom.com/wiki/Template:Infobox_Transcript">npc transcript</a> result :</h3>'+
'<textarea id="text_output" class="textarea" col="30" rows="8" style="width:100%;"></textarea>'+
'<br><button id="copy" >Copy processed text</button>'+
'<br><a id="create_transcript_page"></a>';
document.getElementById("npc_transcript_parser").insertAdjacentHTML( 'afterbegin', npc_transcript_parser);
}
insert_html();
document.getElementById("process").onclick = function() {ProcessText();};
document.getElementById("clear").onclick = function() {ClearText();};
document.getElementById("copy").onclick = function() {CopyText();};
});