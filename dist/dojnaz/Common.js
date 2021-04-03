//https://dojnaz.fandom.com/wiki/Status
var sb = function () {
	fetch("https://api.dojnaz.net/starbound").then(function (data) {
		data.json().then(function (data) {
			console.log(data);
			document.getElementById("dojnazSB").innerText = "The starbound server is currently " + data.status +". ";
			if (data.status == "online")
			{
				document.getElementById("dojnazSB").style.color = "limegreen";
				document.getElementById("dojnazSB").innerText = "There are currently " + data.online + " players online out of the maximum " + data.maxPlayers + ".";
			}
			else
			{
				document.getElementById("dojnazSB").style.color = "red";
			}
		});
	});
};
var mcoauth = function () {
	fetch("https://api.dojnaz.net/mcoauth/status").then(function (data) {
		data.json().then(function (data) {
			console.log(data);
			document.getElementById("dojnazMCOauth").innerText = "The MCOauth Minecraft Server is currently " + data.status +", and there are " + data.activeTokens + " valid tokens. ";
			if (data.status == "online")
			{
				document.getElementById("dojnazMCOauth").style.color = "limegreen";
			}
			else
			{
				document.getElementById("dojnazMCOauth").style.color = "red";
			}
		});
	});
};
if (window.location.pathname == "/wiki/Status")
{
	sb();
	mcoauth();
}