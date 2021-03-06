/* Any JavaScript here will be loaded for all users on every page load. */

//Funkcje z ciachami
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

$(document).ready(function(){
	//Ciacho z danymi
	if (getCookie("CzyWiesz")=="") {
		var date = new Date();
		date.setMonth(date.getMonth()+1);
		setCookie("CzyWiesz", "50,0", date);
	}
	//Okno
	var position = getCookie("CzyWiesz").split(",");
	$("<div id='BoxCiekawostki'></div>").css({
		position:'fixed',
		top:position[0]+"px",
		left:position[1]+"px",
		width:160,
		backgroundColor:'rgb(32,32,32)',
		borderRadius:'4px 4px 4px 4px',
		boxShadow:'0 0 5px 0 #7F7F7F',
		padding:'5px',
		color:'white',
		zIndex:300
	}).appendTo("body");
	$("<a class='sprite close-notification' title='test2' href='javascript:UkryjCiekawostki()'></a>").css({border:'1px solid #FFFFFF', cursor:'pointer', position:'absolute', right:3, top:3}).appendTo("#BoxCiekawostki");
	WylosujCiekawostke();
	//Przenoszenie i zapisywanie do ciacha
	$("#BoxCiekawostki").draggable({handle:"#BoxCiekawostkiHandle", stop:function(){
		var position = $(this).position();
		var date = new Date();
		date.setMonth(date.getMonth()+1);
		setCookie("CzyWiesz", position.top+","+position.left, date);
	}});
});

function WylosujCiekawostke() {
	var Ciekawostki = [
		{tekst:"There is a saber which doesn't deal any damage!", zobacz:"Saber Commands", art:"Commands Guide#Saber"},
		{tekst:"Ysalamiri can protect you from all Force Powers!", zobacz:"Powerups", art:"Powerups"},
			];
	var los = Math.round(Math.random()*Ciekawostki.length);
	$("<big id='BoxCiekawostkiHandle' style='font-weight:bold; display:block; cursor:move;'>Did you know?</big>"+Ciekawostki[los].tekst+"<br>See: <a style='color:orange;' href='http://eff.wikia.com/wiki/"+Ciekawostki[los].art+"'>"+Ciekawostki[los].zobacz+"</a>").appendTo("#BoxCiekawostki");
}

function UkryjCiekawostki() {
	$("#BoxCiekawostki").remove();
}