var a;
var $d = $("<div>");
var links = [];
var gutUser;
var i = 0;
var gutNum = 100;
var gutOutput = [];
var gutRefresh = 60;
var curGutRefresh;
var gutVer = "Global User Tracker v1.0";
gutDTF = new Intl.DateTimeFormat('pt',{
	year: 'numeric', month: 'numeric', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric',
	timeZoneName:'short'
});

function checkUser() {
	clearTimeout(curGutRefresh);
	links = [];
	$("#gutThrobber").show();
	a.get({action:"parse",text:"{{#points:"+gutUser+"|"+gutNum+"|all}}",contentmodel:"wikitext"}).done(function(data){
		$d.html(data.parse.text["*"]);
		if ($d.text().trim()=="Um usuário com esse nome não foi encontrado.") {
			$("#gutOutput").html("<br>Um usuário com esse nome não foi encontrado. Se você sabe que existe, tente mudar o wiki inicial para um que eles visitaram.");
			$("#gutform input").prop("disabled",false);
			$("#gutThrobber").hide();
			return;
		}
		$d.find("tr > td").parent().each(function(){
			if (Math.abs(parseInt($(this).children(":nth-child(4)").text()))<=2) return;
			link = $(this).find("td > a:first-child").attr("href").match(/.*\//)[0];
			link = link.replace("https://","");
			site = $(this).children(":nth-child(3)").text();
			points = parseInt($(this).children(":nth-child(4)").text());
			links.push({url:link,sitename:site,points:points});
		});
		i=0;
		gutOutput = [];
		checkLinks();
	});
}

function checkLinks() {
	if (i==links.length) {
		gutOutput.sort(function(a,b){
			if (a.lastedit === undefined || b.lastedit === undefined) return 0;
			if (a.lastedit.getTime() > b.lastedit.getTime()) return -1;
			if (b.lastedit.getTime() > a.lastedit.getTime()) return 1;
			if (a.site>b.site) return -1;
			if (b.site>a.site) return 1;
			return 0;
		});
		$("#gutThrobber").hide();
		$("#gutOutput").html("<table class='wikitable sortable'><tr><th style='min-width:300px;'>Wiki</th><th style='min-width:200px;'>Última edição</th><th style='min-width:100px;'>Pontos</th><th style='min-width:100px;'># edições</th><th style='min-width:200px;'>Grupos</th></tr></table>");
		for (g in gutOutput) $("#gutOutput table").append(gutOutput[g].html);
		mw.loader.using('jquery.tablesorter', function() {
			$("#gutOutput table").tablesorter();
		});
		curGutRefresh = setTimeout(checkUser,gutRefresh*1000);
		$("#gutform input").prop("disabled",false);
		return;
	}
	if (links[i].sitename=="master") {
		i++;
		checkLinks();
		return;
	}
	fa = new mw.ForeignApi("//"+links[i].url+"api.php");
	if (links[i].url.indexOf("help.gamepedia")!=-1) fa = new mw.Api();
	fa.get({action:"query",list:"usercontribs|users",ucuser:gutUser,ususers:gutUser,usprop:"editcount|groupmemberships"}).done(function(data){
		groups = "";
		for (gr in data.query.users[0].groupmemberships) {
			if (gr > 0) groups += " &bull; ";
			groups += data.query.users[0].groupmemberships[gr].group;
		}
		if (data.query.usercontribs !== null && links[i] !== undefined) {
			if (data.query.usercontribs[0] !== undefined) {
				lastedit = new Date(data.query.usercontribs[0].timestamp);
				h = "<tr><td><a href='"+((links[i].url.indexOf("https")==-1)?"//":"")+links[i].url+"Special:Contributions/"+gutUser+"' target='_blank'>"+links[i].sitename+"</a></td><td style='text-align:center;' data-sort-value='"+lastedit.getTime()+"'>"+gutDTF.format(lastedit)+"</td><td style='text-align:center;'>"+links[i].points+"</td><td style='text-align:center;'>"+data.query.users[0].editcount+"</td><td>"+groups+"</td></tr>";
				gutOutput.push({site:links[i].sitename,html:h,lastedit:lastedit});
			}
		}
		i++;
		checkLinks();
	}).fail(function(data) {
		i++;
		checkLinks();
	});
}

mw.loader.using(['mediawiki.api','mediawiki.ForeignApi']).then(function() {
	if (mw.config.get("wgPageName")!="Gamepedia_Help_Wiki:Global_user_tracker") return;
	console.log(gutVer);
	$("#no-gut").hide();
	gh = '<form id="gutform" action="#" method="GET">' +
						'<input id="gutUser" type="text" placeholder="Insira nome de usuário">' +
						'<input type="submit" id="gutSubmit" value="Verificar usuário">' +
						'&nbsp;&nbsp; <img src="/media/0/05/Ajax.gif" id="gutThrobber" style="display:none;">' +
						'<div style="float:right; text-align:right;"><label>Verifique as principais # wikis: <input id="gutNum" type="number" value="100" min="1" max="100"></label><br>' +
						'<label>Atualizar em # segundos: <input id="gutRefresh" type="number" value="60" min="30" max="600"></label><br>'+
						'<label>Iniciando a wiki para consultar: <input id="gutStartingWiki" style="text-align:right;" type="text" value="help">.gamepedia.com</label><br>'+
					'</div></form>' +
					'<div id="gutOutput"></div>';
	$("#gut").html(gh);
	$("#gutform").on("submit",function() {
		if ($("#gutUser").val() === "") {
			alert("Por favor, insira um nome de usuário primeiro.");
			return false;
		}
		$("#gutform input").prop("disabled",true);
		gutNum = $("#gutNum").val();
		gutRefresh = parseInt($("#gutRefresh").val());
		gutUser = $("#gutUser").val();
		if ($("#gutStartingWiki").val()!="help") a = new mw.ForeignApi("//"+$("#gutStartingWiki").val()+".gamepedia.com/api.php");
		else a = new mw.Api();
		location.hash = $("#gutStartingWiki").val() + "/" + $("#gutUser").val().replace(/ /g,"_");
		checkUser();
		return false;
	});
	if (location.hash!="") {
		instr = location.hash.substring(1);
		$("#gutStartingWiki").val(instr.split("/")[0]);
		$("#gutUser").val(instr.split("/")[1]);
		$("#gutform").submit();
	}
});