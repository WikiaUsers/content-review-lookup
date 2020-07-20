var i,html = 0;

mainRoom.model.chats.bind("afteradd", function(c) {
 
    var string = $("#Chat_" + roomId + " .message:last").html();
 
    var stling = string.split("");
	for (i = 0 ; i < stling.length ; i++) {
            if (html == 0) {
                switch(stling[i]) {
                case "<":
		html = 1;
		break;
                case "&":
                html = 2;
                break;
                case "l":
                stling[i]="r";
                break;
                case "r":
                stling[i]="l";
                break;
                case "L":
                stling[i]="R";
                break;
                case "R":
                stling[i]="L";
                break;
                default:
                continue
                } 
            }
			else if ((html == 1 && stling[i] == ">")||(html == 2 && stling [i] == ";")) {
			    html = 0;
			}
			else {	
			    continue;
		    }
        }
	string = stling.join("");
		
    $("#Chat_" + roomId + " .message:last").html(string);
    });