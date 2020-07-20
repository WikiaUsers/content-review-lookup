//<nowiki>
/**
*
*	Toggle bot flag from any page
*
*	@Author Foodbandlt
*
**/

function toggleBotFlag() {
	toggleBotCheck = document.getElementById("toggleBotCheck");
	toggleBotLoader = document.getElementById("toggleBotLoader");
	toggleBotText = document.getElementById("toggleBotText");
	toggleBotCheck.disabled = true;
	toggleBotLoader.style.display = "inline-block";
	toggleBotText.style.color = "grey";
	
	$.getJSON("/api.php?action=query&list=users&ustoken=userrights&ususers=" + mediaWiki.config.get('wgUserName') + "&format=json", function(token) {
		if (toggleBotCheck.checked == false){
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "userrights",
					user: mediaWiki.config.get('wgUserName'),
					remove: "bot",
					token: token.query.users[0].userrightstoken
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					document.getElementById("toggleBotContainer").innerHTML="ERROR";
				},
				success: function(){
					toggleBotLoader.style.display = "none";
					toggleBotText.innerHTML = "Bot flag not set ";
					toggleBotText.style.color="black";
					toggleBotCheck.disabled = false;
				}
			});
		}else{
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "userrights",
					user: mediaWiki.config.get('wgUserName'),
					add: "bot",
					token: token.query.users[0].userrightstoken
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					document.getElementById("toggleBotContainer").innerHTML="ERROR";
				},
				success: function(){
					toggleBotLoader.style.display = "none";
					toggleBotText.innerHTML = "Bot flag set ";
					toggleBotText.style.color="black";
					toggleBotCheck.disabled = false;
				}
			});
		}
	});
}

if (mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
toggleBotChecked = 'checked="checked"';
toggleBotText = "Bot flag set";
}else{
toggleBotChecked = "";
toggleBotText = "Bot flag not set";

}

toggleBotButton = '<span id="toggleBotContainer" style="font-size: x-small; margin-left: 10px;"><label><span id="toggleBotText">'+toggleBotText+' </span><input type="checkbox" '+toggleBotChecked+' id="toggleBotCheck" /></label><span style="display:none;" id="toggleBotLoader"><img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif" /></span></span>';
if ($("#WikiaPageHeader").length != 0){
$("#WikiaPageHeader").append("<br />" + toggleBotButton);
}else{
$("#AdminDashboardHeader h1").append(toggleBotButton);
}

$("#toggleBotCheck").change(function(){toggleBotFlag()});

//</nowiki>