// ********************************************
// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network
// ********************************************

window.chatRestr = {
// Disable message (1 = enabled, 0 = disabled)
enableMessage: 1,

// Message that appears. Links cannot be used in this message.
undereditMessage: "Hi "+ wgUserName+"! Thanks for trying to use the Sonic News Network chat room. However, the chat room is only for active editors of the Sonic wiki, and you haven't yet made the minimum number of edits required to use it. Our chat policy (which can be found at http://sonic.wikia.com/wiki/Sonic_News_Network:Chat_policy) requires that you make at least 100 edits, with at least half of these being in our mainspace (that is, on the wiki articles that make up the main content of the encyclopedia). We apologize for this inconvenience and hope to see you in the chat soon.",

// Enable redirect (1 = enabled, 0 = disabled)
enableRedirect: 1,

// Page to redirect to 
redirectPage: "Project:Chat"
}

function assignRights(response){
	userObject.groups = response.query.users[0].groups;
}

$(function(){

// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];

var exceptionList = ["Foodbandlt" , "Gamedezyner"]; 

var userObject = {};
$.getJSON("/api.php?action=query&meta=userinfo&format=json", function(result){
	userObject.name = result.query.userinfo.name;

	function assignRights(jsonResponse){
		var jsonParse = JSON.parse(jsonResponse);
		userObject.groups = jsonParse.query.users[0].groups;
	}
	
	//Thanks Monch!
	var script = document.createElement('script');
	script.src = 'http://community.wikia.com/api.php?action=query&list=users&usprop=groups&ususers='+userObject.name+'&format=json&callback=assignRights';
	script.onload = function() {
		document.head.removeChild(this);
		
		
		if (exceptionList.indexOf(userObject.name) == -1 && userObject.groups.indexOf("vstf") == -1 && userObject.groups.indexOf("staff") == -1){
		  if (typeof alertPopped === "undefined"){
			$.get("/wiki/Special:Editcount/"+userObject.name, function(result){

			  // To change the number of edits required to enter the chat, change the numbers below.  
			  // Be sure to leave the semi-colon intact.
			  // To disable the restriction, change both of these to 0. 

			  var mainCountRestriction = 50;
			  var totalCountRestriction = 100;

			  regExpNumberIsolation = /\d/g ;
			  regExpSearch = /\(Main\)/ ;
			  mainPos = result.search(regExpSearch);
			  if (mainPos != -1){
				slicedMainText = result.slice(mainPos+36, mainPos+41);
		 
				var numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
				if (numberedMainText.search(",") != -1){
				  while (numberedMainText.indexOf(",") > -1){
					var numberedMainText = numberedMainText.replace(",","");
				  }
				}
			  }else{
				numberedMainText = 0;
			  }
		 
			  totalPos = result.search("All wikis");
			  if (totalPos != -1){
				slicedTotalText = result.slice(totalPos+52, totalPos+57);
		 
				var numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
				if (numberedTotalText.search(",") != -1){
				  while (numberedTotalText.indexOf(",") != -1){
					var numberedTotalText = numberedTotalText.replace(",","");
				  }
				}
			  }else{
				numberedTotalText = 0;
			  }
		 
			  if (typeof alertPopped === "undefined" && (numberedTotalText < totalCountRestriction || numberedMainText < mainCountRestriction)){
				alertPopped = 1;

				if (wgPageName == "Special:Chat" && wgUserName != null){
				  if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
				  window.close();
				  if (window.closed == false){
					if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}else{window.location.replace(wgServer);}
				  }
				}else if (wgUserName != null){
				  $(document).ready(function() {
					$('[data-canonical="chat"]').click(function (){
					  if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);}
					  if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}
					}).removeAttr("data-canonical").css("cursor", "pointer");
					$('[href="/wiki/Special:Chat"]').removeAttr("href");
					setTimeout('$(".chat-join a").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}}); $(".chat-join button").removeAttr("onclick").click(function() {if (window.chatRestr.enableMessage == 1){alert(window.chatRestr.undereditMessage);} if (window.chatRestr.enableRedirect == 1){window.location.replace("/wiki/"+window.chatRestr.redirectPage);}});', 500);
				  });
				}
			  }
			});
		  }
		}
	}
	document.head.appendChild(script);
});
});