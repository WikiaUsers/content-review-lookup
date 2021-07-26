/* CUIDADO: Qualquer JavaScript aqui será carregado para todos os usuários em cada carregamento de página. */

/* 
////////////////////////////////////////////////////////////////////
// Pop-ups flutuantes de referência
////////////////////////////////////////////////////////////////////
*/
importScriptPage('ReferencePopups/code.js', 'dev');
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;


/* 
////////////////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////////////////
*/
function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="550" frameborder="0" align="top" width="330" src="https://www.facebook.com/connect/connect.php?id=208174206745&amp;connections=30" marginwidth="0" marginheight="0"></iframe>');
}
$(fBox);


/* 

////////////////////////////////////////////////////////////////////
// Elementos do Google+ e YouTube
////////////////////////////////////////////////////////////////////
*/
importScriptPage('PlusOneButton/code.js', 'dev');

/* 
////////////////////////////////////////////////////////////////////
// AlertaDeSpoiler
// documentação em: https://dev.wikia.com/wiki/SpoilerAlert
// © Peter Coester, 2012
// 
// __NOWYSIWYG__
////////////////////////////////////////////////////////////////////
*/
(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoilers', cats) !== -1,
        adulto  = $.inArray('Conteúdo adulto',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || mature;
    };
    if (mature && spoiler) {
        window.SpoilerAlert.question = 'Esta página pode conter spoilers sobre histórias inéditas ou recém-lançadas. Ele também contém conteúdo adulto que pode não ser adequado para todos os usuários. Tem certeza de que deseja ler?';
    } else if (adulto) {
        window.SpoilerAlert.question = 'Esta página pode conter conteúdo adulto que pode não ser adequado para todos os usuários. Tem certeza de que deseja ler?';
    } else if (spoiler) {
        window.SpoilerAlert.question = 'Esta página pode conter spoilers sobre histórias inéditas ou recém-lançadas. Tem certeza de que deseja ler?';
    }
}());
importScriptPage('SpoilerAlert/code.js', 'dev');


/* 
////////////////////////////////////////////////////////////////
// O CÓDIGO ABAIXO AJUDA A TORNAR O MODELO DE NAVEGAÇÃO COLLAPSÍVEL
////////////////////////////////////////////////////////////////
*/
importScriptPage('ShowHide/code.js', 'dev');


/*
/////////////////////////////////////////////////////////////////////////////////
// Alterando o link de Especial:Criar uma nova página para Marvel Wiki:Criar uma nova página
/////////////////////////////////////////////////////////////////////////////////
*/
function createPage(){
	var createPageLink = document.getElementById('dynamic-links-write-article-icon');
	if (createPageLink !== null){
		createPageLink.href = "/wiki/Marvel_Wiki:Criar_uma_nova_página";
                createPageLink.onclick = "";
	}
	createPageLink = document.getElementById('dynamic-links-write-article-link');
	if (createPageLink !== null){
		createPageLink.href = "/wiki/Marvel_Wiki:Criar_uma_nova_página";
                createPageLink.onclick = "";
	}
}

addOnloadHook(createPage);


/* 
/////////////////////////////////////////////////////////////////
// O CÓDIGO ABAIXO AJUDA A FAZER O DROPDOWN PARA MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

//use os dois nomes para ele, para compatibilidade com a Wikipedia (apenas no caso)
function addOnloadHook(f) {
  addLoadEvent(f);
}

//Ajudantes de cookies
function setCookie(cookieName, cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 30;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/w"
                 + ";expires="+expire.toGMTString();
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/wiki"
                 + ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
  var start = document.cookie.indexOf( cookieName + "=" );
  if ( start == -1 ) return "";
  var len = start + cookieName.length + 1;
  if ( ( !start ) &&
    ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
      {
        return "";
      }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
  if ( getCookie(cookieName) ) {
    document.cookie = cookieName + "=" + ";path=/w" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = cookieName + "=" + ";path=/wiki" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}


/*
////////////////////////////////////////////////////////////////////
// JS PARA ENCONTRAR IMAGENS DUPLICADAS NO SITE
////////////////////////////////////////////////////////////////////
*/
dil = new Array();
function findDupImages(gf) {
output = "";
url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
if (gf) url += "&gaifrom=" + gf;
$.getJSON(url,function (data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
dils = ","+dil.join();
if (dils.indexOf(","+pages[pageID].title) == -1 && pages[pageID].title.indexOf("Arquivo::") == -1 && pages[pageID].duplicatefiles) {
output += "<h3><a href='/" + pages[pageID].title + "'>"+pages[pageID].title+"</a></h3>\n<ul>\n";
for (x=0;x<pages[pageID].duplicatefiles.length;x++) {
output += "<li><a href='/Arquivo:" + pages[pageID].duplicatefiles[x].name + "'>Arquivo:"+pages[pageID].duplicatefiles[x].name+"</a></li>\n";
dil.push("Arquivo:"+pages[pageID].duplicatefiles[x].name.replace(/_/g," "));
}
output += "</ul>\n\n";
}
}
$("#mw-dupimages").append(output);
if (data["query-continue"]) setTimeout("findDupImages('"+data["query-continue"].allimages.gaifrom+"');",5000);
}
});
}
$(function () { if ($("#mw-dupimages").length) findDupImages(); });


/*
////////////////////////////////////////////////////////////////////
// Script de exibição de chave de classificação de data de lançamento por usuário:Bobogoobo (de https://community.wikia.com/wiki/Thread:918005)
////////////////////////////////////////////////////////////////////
*/
$(function() {
    if (!(
        mw.config.get('wgCanonicalNamespace') === 'Categoria' &&
        ['Aparições', 'Menções'].indexOf(mw.config.get('wgPageName').split('/').slice(-1)[0]) !== -1
    )) {
        return;
    }
 
    // API requer 50 títulos de cada vez, serão 200 títulos por página de categoria
    var requests,
        $links = $('#mw-pages').find('table').find('a');
        pages = $links.toArray().map(function(value) {
            return encodeURIComponent($(value).attr('title'));
        });
    requests = [pages.slice(0, 50), pages.slice(50, 100), pages.slice(100, 150), pages.slice(150)];
    $.each(requests, function(index, value) {
        $.getJSON(
            '/api.php?action=query&prop=pageprops&ppprop=defaultsort&format=json&titles=' + value.join('|'),
            function(data) {
                data = data.query.pages;
                $.each(Object.keys(data), function(idx, val) {
                    if (!data[val].pageprops) {
                        return true;// continue
                    }
                    var sort = data[val].pageprops.defaultsort,
                        title = data[val].title;
                        date = sort.match(/\d{8}/);
                    if (date) {
                        $links.filter('[title="' + title + '"]').after(
                            ' (' + date[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ')'
                        );
                    }
                });
            }
        );
    });
});



/* 
////////////////////////////////////////////////////////////////////
// O CÓDIGO ABAIXO altera aleatoriamente o texto acima da navegação superior de "Marvel Wiki" para um da lista
////////////////////////////////////////////////////////////////////
*/
var wiki_name_number=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 1
var wiki_name_text=["Frente Rosto, Verdadeiros crentes!", "'Nuff Disse!", "Excelsior!", "Make Mine Marvel", "Avante, Vingadores!", "Pra mim, meus X-Men!", "Com Grandes Poderes...", "Hulk Esmaga!", "Snikt!", "É hora de Clobberin!", "Em Chamas!", "Wakanda Pra Sempre!", "Eu Sou o Homem de Ferro", "Eu Sou Groot", "Pelo Hospedeiro Hoary de Hoggoth!", "Bamf!", "Quem Punhar Este Martelo, Se For Digno...", "Pela Barba Eriçada de Odin!", "Imperius Rex!", "Oh, Minhas Estrelas e Ligas!", "O Melhor Que Existe...", "...Espero Que Você Sobreviva à Experiência!", "Doce Natal!", "Que Desenvolvimento Revoltante", "Tenha em Ti!", "E Aí Veio um Dia Diferente de Qualquer Outro...", "Thwip!", "Champions Charge!" ]
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;


/* 
////////////////////////////////////////////////////////////////////
// O CÓDIGO ABAIXO ADICIONA BOTÕES PERSONALIZADOS À BARRA DE FERRAMENTAS DE EDIÇÃO JAVASCRIPT
////////////////////////////////////////////////////////////////////
*/

var customizeToolbar2 = function () {
/* Strike-through text */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'format',
tools: {
"strike": {
label: 'Strike-through text',
type: 'button',
icon: 'https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png',
action: {
type: 'encapsulate',
options: {
pre: "<s>",
post: "</s>"
}
}
}
}
} );
/* Comente */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'format',
tools: {
"comente": {
label: 'Comente',
type: 'button',
icon: 'https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png',
action: {
type: 'encapsulate',
options: {
pre: "<!-- ",
post: " -->"
}
}
}
}
} );
/* subst:Cat */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'inserir',
tools: {
"cat": {
label: 'Categorização rápida',
type: 'button',
icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
action: {
type: 'encapsulate',
options: {
pre: "{{subst:Cat",
post: "}}"
}
}
}
}
} );
/*-------- INFOBOXES --------*/
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
groups: {
"infoboxes": {
'label': 'Infoboxes'
}
}
} );
/* Personagem */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"personagem": {
			label: 'Personagem',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Marvel Wiki:Predefinição de Personagem\r| Imagem                   = ",
					post: "\r| NomeReal                 = \r| NomeOriginal             = \r | IdentidadeAtual          = \r | OutrasIdentidades        = \r\r| Afiliação                = \r| Parentes                 = | EstadoCivil              = \r\r| CharRef                 = \r| Sexo                     = \r| Altura                   = \r| Peso                     = \r| Olhos                    = \r| Cabelo                   = \r| AtributosIncomuns        = \r\r| Origem                   = \r| Universo                 = \r| LocalDeNascimento        = \r\r| Identidade               = \r| Cidadania                = \r| Ocupação                 = \r| Educação                 = \r| BaseDeOperações          = \r\r| Criadores                = \r| Primeira                 = \r| PrimeiraBR               = \r\r| História                = \r\r| Personalizade                  = \r\r| Poderes                  = \r| Habilidades              = \r| Força                    = \r| Fraquezas                = \r\r| Equipamento              = \r| Transporte               = \r| Armas                    = \r\r| Notas                    = \r| Curiosidades             = \r| Marvel                   = \r| Wikipedia                = \r| Links                    = \r}}"
				}
			}
		}
	}
} );

/* Verifique se a visualização está no modo de edição e se os módulos necessários estão disponíveis. Em seguida, personalize a barra de ferramentas … */
if ( [ 'editar', 'enviar' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
mw.loader.using( 'user.options' ).then( function () {
// Pode ser a string "0" se o usuário desabilitou a preferência ([[phab:T54542#555387]])
if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
$.when(
mw.loader.using( 'ext.wikiEditor' ), $.ready
).then( customizeToolbar2 );
}
} );
}