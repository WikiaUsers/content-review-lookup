/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* ====================================================================== *\
	# custom edit buttons
\* ====================================================================== */
 
if (mwCustomEditButtons) {  
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAXNSR0IArs4c6QAAAk9QTFRFAAAAgAAAAIAAgIAAAACAgACAAICAwMDAwNzApsrwAAAAQ1l4SGB7a3uQdYijhpixkKO9k6bAl6rEmq3HnrHLo7bQqLvVrb/YsMPds8bgus3nvc/owdTuxNjzydz20uT91+f+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTECL3QDwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCQccCQrY7AcAAACHSURBVCjPfchZDsMgEATR+jfOhldsSLj/JdNJjIRHKE+IHhW5qSe/Whz52dKRU4Jk/ekxQrTU9x12S33bYLPUQ4Bgqa8rrJb6ssBiqc8zzJb6NMFUlEt9HGEsyqk+DMBwKKe6954TBa/+kFP/BPV7Tfm76rca/Fb9WuNY9UuLo3ddVz194vo3NB0oZdoKj8sAAAAASUVORK5CYII=",
		"speedTip": "Redirect",// will affect <span class="ChatLogsList"></span> in subpages of [[
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
		"speedTip": "Highlight",
		"tagOpen": "<span style='background:yellow'>",
		"tagClose": "</span>",
		"sampleText": "Highlighted text here."};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
		"speedTip": "Large Text",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Insert Text Here"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
		"speedTip": "Small Text",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Insert Text Here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_underline.png",
		"speedTip": "<u>Underline Selected Text</u>",
		"tagOpen": "<u> ",
		"tagClose": " </u>",
		"sampleText": "Insert text to underline!"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCBEoGHtVh6UAAAAMaVRYdENvbW1lbnQAAAAAALyuspkAAAIYSURBVDjLtVW7ihRBFD13uvYxa2hmICIo4scIJgqCoOAPmAhGfoEYGGxiIisL/oCIoIEiGGhiZKDsKLg7jbrs4AxOd92HQVXPw77twqKVnOCcunWq7rkUmZnhP6w797YQBvuAmYGIXARwJO7j7jeEKI3xLjwaFytFr65qTKsai3j71k3cuHYFg8GgxTW4/eghrl+9jGdPn7gaM0MwSoct4mDnE0YHBxiPfyYvjmZv9yvK4R7KctihIQRmbXcj31DFIKJuw5oYqPoaMkNgjm6jAECUIcJuw8w0FxdXQ0QIIgwygxHN0LJ1ZYbEeombaVTzDdTXGBBULZ+GGc6dG1iXuQY139AMrgYwhLqOnW9elkMUYcV988lkkgyIIEZ2FIQgIl21sXn/7qGTmBrarkGE9OZd1s+eO4+NjWNu0S+fd7D/43t6c7cGchRzNmeYrV+4eAknT51e5jJubz3Am9cvoWpg0ZZGU/Ho7QUAMDNijC2OAGhOi6j4GjOEyJxanto8RwDCAo6xzRHBNMdV1NeAEIS5wzcgqnn62ndrhk3/oslp+WPjLAmak9DeOM+5uRoiQmARENJUNti4FxGIyBLX4Hz81deYITSNWVxFEVJWewRRcWPW6xVZW3RoCLT5+EXrm2NmqAhW19Y6h8dMUU0rrPf7Lv/81TuE0WjcWeDXNB46oVXt719dLxDevv/wzz/nlX7AmRPH8RuTxxRrcgmtcAAAAABJRU5ErkJggg==",
		"speedTip": "History table",
		"tagOpen": "{|class=\"wikitable sortable\"\n! scope=\"col\"| Catalog\n! scope=\"col\"| Available from\n! scope=\"col\"| Available until\n|-\n|catalog goes here\n|starting date\n|ending date\n|}",
	};
}

importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
var MessageBlock = {
  title : 'Bloqueio',
  message : 'Você foi bloqueado.'
};

importScriptPage('MediaWiki:WallGreetingButton/code.js', 'dev');

// Config dos Meses em Português
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{de Jan;de Fev;de Mar;de Abr;de Maio;de Jun;de Jul;de Ago;de Set;de Out;de Nov;de Dez}m de %Y (GMT -3)';

// Relógio Horário de Brasília - BST (Brazil Standart Time)
window.DisplayClockJS = {
    offset: 480,
    format: '%2H:%2M:%2S %d %B %Y (BST)',
};

importScriptPage('MediaWiki:AdminDashboard JS-Button/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:BlogLink/code.js',
    ]
});

/* Revelar IP Anônimo */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

/* ######################################################################
 
Funções para Medalhas customizáveis da Star Wars Wiki
Por [[User:Thales César]]
** -----------
*/
 
/* Construir leaderboard das medalhas */
function buildLeaderboard() {
	$.get("http://pt-br.scandnavia.wikia.com/load.php?mode=articles&articles=Star_Wars_Wiki:Medals|Scandnávia_Wiki:Medals/Pontos&only=styles&cb="+Math.ceil(new Date().getTime() / 1000), function(data) {
			var tabelaDePontos = data.split("}{");
			var obj = JSON.parse(tabelaDePontos[0]+'}');
			tabelaDePontos = JSON.parse('{'+tabelaDePontos[1].split("\n")[0]);
			var users = obj.dataUser;
			var i = 0;
			var medalha;
			var pontuacao = {};
			var tableText = '';
			for (var user in users)
			{
				pontuacao[user] = 0;
				tableText = "<tr><td><a href='/wiki/Utilizador:"+encodeURI(user)+"'>"+user+"</a></td><td>";
				for (i=0; i<obj.dataUser[user].length; i++)
				{
					medalha = obj.dataUser[user][i].split(":");
					pontuacao[user] += medalha[1] * tabelaDePontos[medalha[0]];
					tableText += "<img title='";
					tableText += (medalha[1]!=1) ? medalha[1] + " " : '';
					tableText += medalha[0]+"' width='30px' src='"+obj.dataMedal[medalha[0]].image_url+"' />";
				}
				tableText += "</td><td><b>"+pontuacao[user]+"</b></td></tr>";
				for (i=0; i<$("#MedalsLeaderboard tr").length; i++)
				{
					if (pontuacao[user] > $("#MedalsLeaderboard tr")[i].childNodes[2].textContent)
					{
						$($("#MedalsLeaderboard tr")[i]).before(tableText);
						break;
					}
				}
				if (i==$("#MedalsLeaderboard tr").length)
					$("#MedalsLeaderboard").append(tableText);
			}
			$("#MedalsLeaderboard").prepend('<tr style="text-align:center"><th style="width:25%">Usuário</th><th style="width:50%">Medalhas</th><th style="width:25%">Pontuação</th></tr>');
		}
	);
}
 
/* Verificar se usuário ganhou nova medalha */
function checkForMedals() {
	$.getJSON("http://pt-br.scandnavia.wikia.com/wiki/Scandnávia_Wiki:Medals?action=raw&cb="+Math.ceil(new Date().getTime() / 1000), function(obj) {
		var medalhasAgora = JSON.stringify(obj.dataUser[wgUserName]);
		if (typeof (localStorage.medalhas) == "undefined")
			localStorage.medalhas = medalhasAgora;
		else if (localStorage.medalhas != medalhasAgora)
		{
			var medalhasSessao = JSON.parse(localStorage.medalhas);
			var msg = '';
			var medalhaNome = '';
			if (medalhasSessao.length > obj.dataUser[wgUserName].length)
				msg = "Você perdeu alguma medalha"
			else
			{
				for (var i=0; i<obj.dataUser[wgUserName].length; i++)
				{
					if (localStorage.medalhas.search(obj.dataUser[wgUserName][i]) == -1)
					{
						medalhaNome = obj.dataUser[wgUserName][i].split(":")[0];
						if (localStorage.medalhas.search(medalhaNome) > -1)
							msg = (msg=='') ? ("Você ganhou mais uma "+medalhaNome) : "Você ganhou múltiplas medalhas"
						else
							msg = (msg=='') ? ("Você ganhou "+medalhaNome) : "Você ganhou múltiplas medalhas"
					}
				}
			}
			alertarMedalhas(msg, medalhaNome, obj.dataMedal[medalhaNome].image_url, medalhasAgora);
		}
	});
}
 
/* Mostrar notificação de nova medalha */
function alertarMedalhas(txt, medalhaNome, img, medalhasAgora) {
	$("#WikiaBar").append('<ul id="WikiaNotifications" class="WikiaNotifications">'+
		'<li>'+
			'<div data-type="3" class="WikiaBadgeNotification">'+
				'<a class="sprite close-notification"></a>'+
				'<img class="badge"  width="90" height="90" alt="'+medalhaNome+'" src="'+img+'" />'+
				'<p>Você acabou de ganhar a medalha "'+medalhaNome+'"! '+txt+'</p>'+
				'<div class="notification-details"><a href="/wiki/User:'+wgUserName+'" title="User:'+wgUserName+'">Veja todas suas medalhas atuais!</a></div>'+
			'</div>'+
		'</li>'+
	'</ul>');
	$(".close-notification").click(function() {
		localStorage.medalhas = medalhasAgora;
		$("#WikiaNotifications").remove();
	});
}

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});