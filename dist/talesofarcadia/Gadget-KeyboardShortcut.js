var keys = "";
function short(event) {
    var x = event.key;
    keys += x;
    if (keys.includes("#go")) {
        keys = "";
        var page = prompt("Which page", "Special:MyPage");
        if (page !== null) {window.location.href = "/" + page}
        else {alert("You didn't leave the page")}
    } else if (keys.includes("#san")) {window.location.href = "/Special:MyPage/Sandbox";
    } else if (keys.includes("#thr")) {window.location.href = document.location.origin + "/f";
    } else if (keys.includes("#api.")) {window.location.href = document.location.origin + "/api.php";
    } else if (keys.includes("#staff")) {window.location.href = "/Arcadia_Oaks-pedia:Troll_Tribunal";
    } else if (keys.includes("#main")) {window.location.href = "/Arcadia_Oaks-pedia";
    } else if (keys.includes("#foru")) {window.location.href = "/Forum:Index";
    } else if (keys.includes("#contact")) {window.location.href = "/User_talk:Merlin_the_Immortal";
    } else if (keys.includes("#talk")) {
    	var path = window.location.pathname;
    	var list = path.split("/");
    	var lis2 = list[(list.length)-1].split(":");
    	var pagename = lis2[(lis2.length)-1];
    	if (lis2.length == 2) {
    		var namespace = lis2[0] + "_";
    	} else {var namespace = "";}
    	window.location.href = "/" + namespace + "talk:" + pagename;
    } else if (keys.includes("#wiki")) {
      	var wiki = prompt("Which wiki", "community");
        if (wiki !== null) {window.location.href = "https://" + wiki + ".fandom.com"}
    }
}
document.getElementsByTagName("html")[0].addEventListener("keypress", function(){short(event);});