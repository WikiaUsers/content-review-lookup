/*Joke script. Suggested by Cupa*/
var i,html = 0;
 
mainRoom.model.chats.bind("afteradd", function(c) {
 
    var string = $("#Chat_" + roomId + " .message:last").html();
 
    var striwalrusng = string.split("");
	for (i = 0 ; i < striwalrusng.length ; i++) {
            if (html == 0) {
                switch(striwalrusng[i]) {
                case "<":
		html = 1;
		break;
                case "&":
                html = 2;
                break;
                case "a":
                case "e":
                case "i":
                case "o":
                case "u":
                striwalrusng[i]+="walrus";
                break;
                case "A":
                case "E":
                case "I":
                case "O":
                case "U":
                striwalrusng[i]+="WALRUS";
                break;
                default:
                continue
                } 
            }
			else if ((html == 1 && striwalrusng[i] == ">")||(html == 2 && striwalrusng[i] == ";")) {
			    html = 0;
			}
			else {	
			    continue;
		    }
        }
	string = striwalrusng.join("");
 
    $("#Chat_" + roomId + " .message:last").html(string);
    });