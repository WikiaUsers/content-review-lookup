/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 

function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "recolher";
var expandCaption = "expandir";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').text(wgUserName); }
 addOnloadHook(UserNameReplace);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny

 * Modificada para atender à estrutura com o espaço nominal "Cânon", por Thales César
 */
function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');
 
		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}
 
		if (el)
			el.href += '&editintro=' + name;
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}
 
/*$( function () {
	//ver http://starwars.wikia.com/wiki/MediaWiki:Common.js para código original
	if ( wgNamespaceNumber === 112 ) {
		addEditIntro( 'Template:Canon_editintro' );
	}
} );*/

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 * Adaptado por [[User:Thales César|Thales César]]
 */

if(document.getElementById('old-forum-warning')) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
}
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Arquivado').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Arquivado';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

function addAlternatingRowColors() {
	var infoboxes = $(".infobox");//getElementsByClass('infobox', document.getElementById('content'));
 
	if( infoboxes.length == 0 )
		return;
 
	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];
 
		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;
 
		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;
 
			var ths = rows[i].getElementsByTagName('th');
 
			if( ths.length > 0 ) {
				continue;
			}
 
			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}
addOnloadHook( addAlternatingRowColors );

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('h1.page-header__title').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('h1.page-header__title').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite
/*importScriptPage( 'AjaxRC/i18n.code.js', 'dev' );
var ajaxRefresh = 30000;*/
/* A(c)tualização automática - [[w:c:dev:AjaxRC]] */
window.AjaxRCRefreshText = 'A(c)tualização automática';
window.AjaxRCRefreshHoverText = 'A(c)tualização automática';
window.ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* ######################################################################

JavaScript para adicionar botão customizável no modo Fonte
Por: [[User:Thales César|Thales César]], adaptado de http://community.wikia.com/wiki/Help:Custom_edit_buttons
** -----------
*/

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/pt.starwars/images/2/28/Button_wikilink.png/revision/latest?cb=20151229011915",
		"speedTip": "Legends link",
		"tagOpen": "{{"+"SUBST:L|",
		"tagClose": "}}",
		"sampleText": "Inserir link Legends"
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/pt.starwars/images/2/29/Translate_button.png/revision/latest?cb=20160114145016",
		"speedTip": "Tradução SWW",
		"tagOpen": "{{TraduçãoSWW|",
		"tagClose": "}}",
		"sampleText": "Inserir termo para tradução"
	};


/* ######################################################################

jQuery para esconder e mostrar elementos
Por: [[User:Thales César|Thales César]]
** -----------
*/

$(document).ready(function(){
    if (wgAction == "edit")
        $("#mw-content-text").hover(function() { $("img[title='Legends link']").attr('accesskey', 'l'); });
        
	$("#hider").click(function(){
		if ($("#hider").html()=="[Mostrar]")
		{
			$("#hider").html("[Esconder]")
			$("#hiden").fadeIn("slow");
		}
		else
		{
			$("#hider").html("[Mostrar]")
			$("#hiden").fadeOut("slow");
		}
	});
	/* Para o {{App}} */
	$("#hiderApp").click(function(){
		$("#hidenApp").toggle("slow");
		if ($("#hiderApp").html()=="[Mostrar]")
			$("#hiderApp").html("[Esconder]")
		else
			$("#hiderApp").html("[Mostrar]")
	});
	rewriteTitle();
	changeMainPageLink();
	checkForClassChange();
	
	checkForMedals();
    if (document.getElementById("MedalsLeaderboard"))
        buildLeaderboard();
	
	if ($('#LegCanNav').length) {
        $(".WikiaPageContentWrapper").prepend($("#LegCanNav"));
	}
});
/* ######################################################################

Inserir banners de parceiros na barra lateral, DEPOIS dos anúncios, quando existir as devidas predefinições. Verificar por parâmetro e, no caso do Star Wars Storyteller, inserir player do YouTube após clique do usuário.
Por: [[User:Thales César|Thales César]]
** -----------
*/
function checkForClassChange()
{
    if ($('#WikiaRail').hasClass('loaded'))
    {
        if (document.getElementById("temSWST"))
    	{
    		var URLSWST = $("#temSWST").text();
    		if (URLSWST=="{{{1}}}" || (URLSWST.search("www.youtube.com") < 0 && URLSWST.search("youtu.be") < 0))
    		{
    			$("#WikiaRail").append("<div id='SWStoryteller' class='error' style='font-weight:bold'>Erro de SWST: URL incorreta!</div>");
    		}
    		else
    		{
    			$("#WikiaRail").append("<div id='SWStoryteller'><img src='https://vignette.wikia.nocookie.net/pt.starwars/images/a/a4/Star_Wars_Storyteller_Logo_YT.png/revision/latest?cb=20160127133039' title='Veja vídeo do SW Storyteller sobre o assunto' alt='SWStoryteller' /></div>");
    			$("#SWStoryteller img").click(function() {
    				$("#SWStoryteller").append('<iframe style="width:90%" src="'+URLSWST+'" frameborder="0" allowfullscreen></iframe>');
    				$("#SWStoryteller img").remove();
    			});
    		}
    	}
    	if (document.getElementById("temCT"))
    	{
    	    var URLCT = $("#temCT").text();
    	    if (URLCT=="{{{1}}}")
    	    {
    	        $("#WikiaRail").append("<div id='CloneTroopersBanner' class='error' style='font-weight:bold'>Erro de CloneTroopers: Nenhuma URL passada</div>");
    	    }
    	    else if (URLCT.search("http://clonetroopers.com.br/") < 0)
    	        URLCT = "http://clonetroopers.com.br/" + URLCT;
    	    else if (URLCT.search("http://") < 0)
    	        URLCT = "http://" + URLCT;
    	    $("#WikiaRail").append("<div id='CloneTroopersBanner'><a href='"+URLCT+"' target='_blank'><img src='https://vignette.wikia.nocookie.net/pt.starwars/images/2/2c/CloneTroopers.jpeg/revision/latest?cb=20161101231601' title='Veja o artigo da Clone Troopers sobre o assunto' alt='CloneTroopersBanner' /></a></div>");
    	}
    }
    else
        setTimeout(checkForClassChange, 500);
}

/* UI especial para Apêndice de Tradução */
function AT_UI() {
	if (wgPageName != "Star_Wars_Wiki:Apêndice_de_Tradução")
		return;
	var ATclasses = [];
	var opcoesDatalist = '';
	$("#mw-content-text ul li").each(function() {
		for (var i=0; i<this.childNodes.length; i++)
		{
			var classe = '';
			if (this.childNodes[i].nodeName == 'SUP')
			{
				classe = $(this.childNodes[i]).attr("id");
				if (classe && isNaN(classe.replace("cite_ref-", "")))
				{
					classe = classe.replace("cite_ref-", "");
					console.log(classe);
					classeTmp = classe.split("_");
					classe = classeTmp[0];
					for (var j=1; j<classeTmp.length-1; j++)
					{
						classe += "_"+classeTmp[j];
					}
					if (ATclasses.indexOf(classe) == -1)
					{
						ATclasses[ATclasses.length] = classe;
						opcoesDatalist += '<option value="'+decodeURI(classe.replace(/_/g, '%20').replace(/\./g, "%"))+'">'+decodeURI(classe.replace(/_/g, '%20').replace(/\./g, "%"))+'</option>';
					}
					classe = classe.replace(/\./g, '');
					$(this).addClass(classe);
				}
			}
		}
	});
	$("h3").first().after("<select id='sourceSearcher'><option value=''>Resetar</option>"+opcoesDatalist+"</select><input type='submit' id='esconderObras' />");
	$("#esconderObras").click(function () {
		var classe = encodeURI($("#sourceSearcher").val()).replace(/%20/g, '_').replace(/%/g, "").replace(/\(/, "28").replace(/\)/, "29");
		console.log(classe);
		if (classe != '' && $("li."+classe).length > 0)
		{
			$("#mw-content-text ul li").hide();
			$("li."+classe).show();
		}
		else
			$("#mw-content-text ul li").show();
	});
}
addOnloadHook(AT_UI);

/* ######################################################################

Adaptações para transformação de "Cânon:Página principal" em uma página principal de verdade
Por [[User:Thales César]]
** -----------
*/
function changeMainPageLink() {
    if (wgNamespaceNumber==114 || wgNamespaceNumber==115)
    {
        $("a[accesskey=z]").attr("href", "/pt/wiki/Legends:Página_principal");
        $("div.page-header__main").append('<div class="page-header__page-subtitle">Artigo <span style="font-style:italic;">Legends</span></div>');
        $("title").text($("title").text().replace("Legends:", ""));
        if ($('#title-meta').length == 1)
            return;
        $("h1.page-header__title").text($("h1.page-header__title").text().replace("Legends:", ""));
    }
    else if(wgNamespaceNumber==0)
    {
        var mundoReal = $("a[title='O assunto deste artigo existe ou é relevante no mundo real.']");
        if (mundoReal.length==0)
            $("div.page-header__main").append('<div class="page-header__page-subtitle">Artigo canônico</div>');
    }

}

/* ######################################################################

Funções para Medalhas customizáveis da Star Wars Wiki
Por [[User:Thales César]]
** -----------
*/

/* Construir leaderboard das medalhas */
function buildLeaderboard() {
	$.get("https://starwars.fandom.com/pt/load.php?mode=articles&articles=Star_Wars_Wiki:Medals|Star_Wars_Wiki:Medals/Pontos&only=styles&cb="+Math.ceil(new Date().getTime() / 1000), function(data) {
			var tabelaDePontos = data.split("}{");
			var obj = JSON.parse(tabelaDePontos[0]+'}');
			tabelaDePontos = JSON.parse('{'+tabelaDePontos[1].split("\n")[0]);
			var users = obj.dataUser;
			var i = 0;
			var medalha;
			var pontuacao = {};
			var tableText = '';
			var desconto;
			for (var user in users)
			{
				pontuacao[user] = 0;
				desconto = 1;
				tableText = "<tr><td><a href='/pt/wiki/Utilizador:"+encodeURI(user)+"'>"+user+"</a></td><td>";
				for (i=0; i<obj.dataUser[user].length; i++)
				{
					medalha = obj.dataUser[user][i].split(":");
					pontuacao[user] += medalha[1] * tabelaDePontos[medalha[0]];
					tableText += "<img title='";
					tableText += (medalha[1]!=1) ? medalha[1] + " " : '';
					tableText += medalha[0]+"' width='30px' src='"+obj.dataMedal[medalha[0]].image_url+"' />";
				}
				if (tabelaDePontos.DescontoInativo.usuários.indexOf(user) > -1)
				    desconto = tabelaDePontos.DescontoInativo.desconto;
				if (tabelaDePontos.DescontoAdmin.usuários.indexOf(user) > -1)
				    desconto = tabelaDePontos.DescontoAdmin.desconto;
				pontuacao[user] = desconto*pontuacao[user];
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
			$("#MedalsLeaderboard").prepend('<tr style="text-align:center"><th style="width:30%">Usuário</th><th style="width:60%">Medalhas</th><th style="width:10%">Pontuação</th></tr>');
		}
	);
}

/* Verificar se usuário ganhou nova medalha */
function checkForMedals() {
	$.getJSON("https://starwars.fandom.com/pt/wiki/Star_Wars_Wiki:Medals?action=raw&cb="+Math.ceil(new Date().getTime() / 1000), function(obj) {
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
				'<div class="notification-details"><a href="/pt/wiki/User:'+wgUserName+'" title="User:'+wgUserName+'">Veja todas suas medalhas atuais!</a></div>'+
			'</div>'+
		'</li>'+
	'</ul>');
	$(".close-notification").click(function() {
		localStorage.medalhas = medalhasAgora;
		$("#WikiaNotifications").remove();
	});
}

function inserirSelecionarUniverso(e) {
	if (e.target.id != "blackout_CreatePageModalDialog") return;
	$("#CreatePageDialogChoose").before('<label><b>Qual universo?</b> <select name="universo" id="selecionarUniverso">'+
	'<option value="canon">Cânon</option><option value="Legends">Legends</option></select></label>');
	$("#selecionarUniverso").change(function () {
		if ($(this).val() == "Legends")
			document.CreatePageForm.wpCreatepageDialogTitle.value = "Legends:"+document.CreatePageForm.wpCreatepageDialogTitle.value;
		else
			document.CreatePageForm.wpCreatepageDialogTitle.value = document.CreatePageForm.wpCreatepageDialogTitle.value.replace("Legends:", '');
	});
}

/**
 * Show/hide for media timeline -- Grunny
 * Devidamente traduzido
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'esconder' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'esconder', 'mostrar' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'mostrar', 'esconder' ) );
		}
	} );
} );

/* Substitúi a Predefinição:Information no fomulário de upload */
/* Copiado da wiki de Firefly, adaptado para a nossa predef */
$(document).ready(function() {
    
    $("body").on('DOMNodeInserted', inserirSelecionarUniverso);
    if (wgAction == "edit")
        $("img[title='Legends link']").attr('accesskey', 'l');
 
	if (wgPageName != 'Especial:Carregar_imagem') {
		return;
	}
 
	$('#wpUploadDescription').text("==Sumário==\r\n{{Information\r\n|attention=\r\n|description=\r\n|artist=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}");
 
});

PFD_templates = "{{Information\r\n|attention=\r\n|description=\r\n|artist=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}";

/* Add ImageMapEdit functionality (thanks SpikeToronto) 
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');
/* END Add ImageMapEdit functionality */