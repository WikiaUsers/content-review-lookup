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
		{tekst:"Kapitanowie mogą zostać promowani i dołączyć do Straży Królewskiej?", zobacz:"Straż Królewska", art:"Straż Królewska"},
		{tekst:"Tōshirō Hitsugaya waży jedynie 28 kg?", zobacz:"Tōshirō Hitsugaya", art:"Tōshirō Hitsugaya"},
		{tekst:"Po japońsku ''ichi'' to jeden a ''go'' to pięć? Dziwnym trafem Ichigo często nosi koszulkę z numerem 15...", zobacz:"Kurosaki Ichigo", art:"Ichigo Kurosaki"},
		{tekst:"Gotei 13 jest tylko jedną z trzech formacji wojskowych w Soul Society i podlega władzy Centrali 46?", zobacz:"Centrala 46", art:"Centrala 46"},
		{tekst:"Każdy członek Espady symbolizował jakiś aspekt śmierci?", zobacz:"Espada", art:"Espada"},
		{tekst:"Przy pogrzebie duszy pojawia się Piekielny Motyl, by przeprowadzić ją do Soul Society?", zobacz:"Piekielny Motyl", art:"Jigokucho"},
		{tekst:"Manipulacja czasem i przestrzenią za pomocą Kido jest zakazana? (ale za pomocą specjalnych przedmiotów [np. spinki Orihime] - już nie?)", zobacz:"Kido", art:"Kido"},
		{tekst:"Płaszcz w Bankai Ichigo regeneruje się razem z jego Reiatsu?", zobacz:"Bankai", art:"Zanpakutō#Bankai"},
		{tekst:"Ichigo Kurosaki miał aż 3 formy Bankai?", zobacz:"Zanpakutō", art:"Zanpakutō"},
		{tekst:"''Kenpachi'' to przydomek nadawany najsilniejszemu wojownikowi w danym pokoleniu?", zobacz:"Kenpachi Zaraki", art:"Kenpachi Zaraki"},
		{tekst:"Mayuri jest ulubioną postacią do rysowania przez Tite Kubo?", zobacz:"Mayuri Kurotsuchi", art:"Mayuri Kurotsuchi"},
		{tekst:"Shinigami po śmierci stają się cząsteczkami budującymi Soul Society?", zobacz:"Shinigami", art:"Shinigami"},
		{tekst:"Shunsui Kyōraku i Jūshirō Ukitake są pierwszymi absolwentami Akademii Shinō?", zobacz:"Akademia Shinō", art:"Akademia Shinō"},
		{tekst:"Shinigami otrzymują pieniądze za pokonane Hollowy?", zobacz:"Shinigami", art:"Shinigami"},
		{tekst:"Gin Ichimaru był przyjacielem z dzieciństwa Rangiku Matsumoto?", zobacz:"Gin Ichimaru", art:"Gin Ichimaru"},
		{tekst:"Istniały trzy oddzielne Hōgyoku?", zobacz:"Hōgyoku", art:"Hōgyoku"},
		{tekst:"Suì-Fēng może używać swojego Bankai raz na trzy dni?", zobacz:"Suì-Fēng", art:"Suì-Fēng"},
		{tekst:"Bankai Shinigamich mogą zostać skradzione?", zobacz:"Medalion Vandenreich", art:"Medalion Vandenreich"},
		{tekst:"Quincy mogą używać innych broni poza łukami, np. mieczy czy nawet pistoletów?", zobacz:"Bronie Quincy", art:"Broń duchowa"},
		{tekst:"Najczęściej występującą postacią na okładkach tomów Bleacha jest Ichigo? Wystąpił na okładce aż trzy razy (razem z jego Hollowem - cztery razy).", zobacz:"Lista tomów", art:"Rozdziały"},
		{tekst:"Na drugim miejscu w ilości występów na okładkach tomów są: Rukia, Orihime, Aizen, Ulquiorra, Grimmjow, Ichimaru oraz Hirako. Wszyscy wystąpili dokładnie 2 razy.", zobacz:"Lista tomów", art:"Rozdziały"},
		{tekst:"Jedyną metodą dającą 100% pewności zabicia Shinigami jest odcięcie mu głowy?", zobacz:"Shinigami", art:"Shinigami"},
		{tekst:"Chōjirō Sasakibe opanował Bankai jeszcze zanim zrobili to Kyōraku i Ukitake?", zobacz:"Chōjirō Sasakibe", art:"Chōjirō Tadaoki Sasakibe"},
		{tekst:"Hueco Mundo miało aż czterech władców?", zobacz:"Hueco Mundo", art:"Hueco Mundo"},
		{tekst:"Zaraki Kenpachi jest jedynym kapitanem, który awansował na swoje stanowisko nie znając nawet imienia swojego Zanpakutō?", zobacz:"Zaraki Kenpachi", art:"Zaraki Kenpachi"},
		{tekst:"Tite Kubo naprawdę nazywa się Noriaki Kubo?", zobacz:"Noriaki Kubo", art:"Tite Kubo"},
		{tekst:"Oznaczenia literowe członków Stern Ritter to skróty od pełnych nazw ich specjalnych umiejętności?", zobacz:"Stern Ritter", art:"Stern Ritter"},
		{tekst:"Sajin Komamura nie je marchewek, ponieważ jego ojciec powiedział, że ''marchewki nie są dla ich gatunku''?", zobacz:"Sajin Komamura", art:"Sajin Komamura"}
	];
	var los = Math.round(Math.random()*Ciekawostki.length);
	$("<big id='BoxCiekawostkiHandle' style='font-weight:bold; display:block; cursor:move;'>Czy wiesz, że...</big>"+Ciekawostki[los].tekst+"<br>Zobacz: <a style='color:yellow;' href='http://pl.bleach.wikia.com/wiki/"+Ciekawostki[los].art+"'>"+Ciekawostki[los].zobacz+"</a>").appendTo("#BoxCiekawostki");
}

$("#BoxCiekawostki a.close-notification").click(function() {
	setCookie("SchowaneCiekawostki", "tak", 1);
	$("#BoxCiekawostki").remove();
});

} );