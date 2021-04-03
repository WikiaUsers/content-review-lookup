mw.loader.using( ['jquery.ui.draggable'], function() {
 
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
	if (getCookie("SchowaneCiekawostki")=="")
	{
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
			backgroundImage:'-moz-linear-gradient(center top , #008BE3 35%, #006CB0 65%)',
			backgroundColor:'#006CB0',
			borderRadius:'4px 4px 4px 4px',
			boxShadow:'0 0 5px 0 #7F7F7F',
			padding:'5px',
			color:'white',
			zIndex:300
		}).appendTo("body");
		$("<a class='sprite close-notification' title='Ukryj okienko'></a>").css({border:'1px solid #FFFFFF', cursor:'pointer', position:'absolute', right:3, top:3}).appendTo("#BoxCiekawostki");
		WylosujCiekawostke();
		//Przenoszenie i zapisywanie do ciacha
		$("#BoxCiekawostki").draggable({handle:"#BoxCiekawostkiHandle", stop:function(){
			var position = $(this).position();
			var date = new Date();
			date.setMonth(date.getMonth()+1);
			setCookie("CzyWiesz", position.top+","+position.left, date);
		}});
	}
});
 
function WylosujCiekawostke() {
	var Ciekawostki = [
		{tekst:"Only <span class="countdowndate">January 01 2014 00:00:00 PST</span> until New years.</span>
"}
	];
	var los = Math.round(Math.random()*Ciekawostki.length);
	$("<big id='BoxCiekawostkiHandle' style='font-weight:bold; display:block; cursor:move;'>Czy wiesz, że...</big>"+Ciekawostki[los].tekst+"<br>Zobacz: <a style='color:yellow;' href='http://pl.bleach.wikia.com/wiki/"+Ciekawostki[los].art+"'>"+Ciekawostki[los].zobacz+"</a>").appendTo("#BoxCiekawostki");
}
 
$("#BoxCiekawostki a.close-notification").click(function() {
	setCookie("SchowaneCiekawostki", "tak", 1);
	$("#BoxCiekawostki").remove();
});
 
} );