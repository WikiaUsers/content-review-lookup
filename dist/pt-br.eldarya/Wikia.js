$(document).ready(function(){
	var d = new Date();
	var n = d.getHours();
	if (n > 17 || n < 6)
	  // If time is after 7PM or before 6AM, apply night theme to ‘body’
	  document.body.style.backgroundImage = "url('https://i.imgur.com/w28SHSM.jpg')";
	else
	  // Else use ‘day’ theme
	  document.body.style.backgroundImage = "url('https://i.imgur.com/M7ZsPeH.jpg')";
});