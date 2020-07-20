/* Qualquer JavaScript aqui será carregado para todos os usuários em cada carga de página. */

importScriptPage('ReferencePopups/code.js', 'dev');
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
 

/*
//////////////////////////////////////////////////////////
// Preencha automaticamente o título do Blog com o nome da subpágina no URL
//////////////////////////////////////////////////////////
*/

function blogTitle(){
  if (wgCanonicalSpecialPageName == "CreateBlogPage"){
    var sel = document.getElementById('blogPostTitle');
    if (sel != null & sel.value == ''){
      sel.value = "Replace this text with the title of the comic (from the URL)";
    }

    var template = "\{\{Review\}\}\n\n\Replace this text with your review";
    var textBlock1 = document.getElementById('wpTextbox1');
    if (textBlock1 != null){
      textBlock1.value = template;
    }

  }
}

addOnloadHook(blogTitle)

/* 
////////////////////////////////////////////////////////////////////
// Twitter Siga Botão
////////////////////////////////////////////////////////////////////
*/

function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/dcdatabase" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @DCDatabase</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);


/* 
////////////////////////////////////////////////////////////////////
// Caixa do Facebook
////////////////////////////////////////////////////////////////////
*/
 
function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="550" frameborder="0" align="top" width="330" src="http://www.facebook.com/connect/connect.php?id=245359441616&amp;connections=30" marginwidth="0" marginheight="0"></iframe>');
}
 
$(fBox);

/*
/////////////////////////////////////////////////////////////////////////////////
// Alterando o Link de Especial: CreatePage para o Wiki DC: Crie uma Nova Página
/////////////////////////////////////////////////////////////////////////////////
*/
function createPage(){
	var createPageLink = document.getElementById('dynamic-links-write-article-icon');
	if (createPageLink != null){
		createPageLink.href = "/wiki/Banco_de_Dados_DC:Criar_uma_Nova_Página";
                createPageLink.onclick = "";
	}
	createPageLink = document.getElementById('dynamic-links-write-article-link');
	if (createPageLink != null){
		createPageLink.href = "/wiki/Banco_de_Dados_DC:Criar_uma_Nova_Página";
                createPageLink.onclick = "";
	}
}

addOnloadHook(createPage)

/*
////////////////////////////////////////////////////////////////////////////////////
// Reescreve o título de uma determinada página.
////////////////////////////////////////////////////////////////////////////////////
*/
function rewriteTitle(){
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if(titleDiv == null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];

    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";

    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

/*
    Armazena o título da página (não modificado).
*/
function storePageName(){
    window.pageName = getFirstHeading().childNodes[0].nodeValue.trim();
}
/*
    Retorna h1.firstHeading (o elemento do título da página).
*/
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}


addOnloadHook(rewriteTitle)


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/*
////////////////////////////////////////////////////////////////////////////////////
// Editar melhorias de página
////////////////////////////////////////////////////////////////////////////////////
*/
function editTitle(){
  headingElements = getElementsByClass("firstHeading");
  mwElements = getElementsByClass("mw-newarticletext");
  previewElements = getElementsByClass("previewnote");
  usermessageElements = getElementsByClass("usermessage");

  if (wgAction != "view"){
    if (headingElements[0] != null) headingElements[0].className = "firstEditHeading";

    var siteNotice = document.getElementById("siteNotice");
    if (siteNotice != null) siteNotice.style.display = 'none';
    var siteSub = document.getElementById("siteSub");
    if (siteSub != null) siteSub.style.display = 'none';
    var contentSub = document.getElementById("contentSub");
    if (contentSub != null) contentSub.style.display = 'none';
    var anonWarning = document.getElementById("mw-anon-edit-warning");
    if (anonWarning != null) anonWarning.style.display = 'none';
    var userMasthead = document.getElementById("user_masthead");
    if (userMasthead != null) userMasthead.style.display = 'none';

    if (mwElements[0] != null) mwElements[0].style.display = 'none';
    if (previewElements[0] != null) previewElements[0].style.display = 'none';
    if (usermessageElements[0] != null) usermessageElements[0].style.display = 'none';

  }

}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

addOnloadHook(editTitle)

/* 
////////////////////////////////////////////////////////////////
// O CÓDIGO ABAIXO AJUDA FAZ O MODELO DE NAVEGAÇÃO COLAPSÍVEL
////////////////////////////////////////////////////////////////
*/

 // ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  } 
  addOnloadHook( createNavigationBarToggleButton );



/* 
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/

/* </pre>
==addLoadEvent==
<pre> */
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

/* </pre>
===addOnloadHook===
<pre> */
//use both names for it, for Wikipedia compatability (just in case)
function addOnloadHook(f) {
  addLoadEvent(f);
}

/* </pre>

==Cookies==
<pre> */

//Cookie helpers
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

/* </pre>
==addCharSubsetMenu==
<pre> */
/* add menu for selecting subsets of special characters */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
  var edittools = document.getElementById('editpage-specialchars');

  if (edittools) {
    var menu = "<select id=\"charSubsetControl\" style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>Edit Tools</option>";
    menu += "<option>Latin/Roman</option>";
    menu += "<option>Miscellaneous</option>";
    menu += "<option>Wiki Markup</option>";
    menu += "<option>Special Characters</option>";
    menu += "<option>Admin Templates</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolscharsubset') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('charSubsetControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseCharSubset( s );
  }
}

/* </pre>
===chooseCharSubsetMenu===
<pre> */
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolscharsubset', s);
}



/* </pre>
==addHelpToolsMenu==
<pre> */
/* add menu for selecting help info */
/***** must match MediaWiki:Edittools *****/
function addHelpToolsMenu() {
  var edittools = document.getElementById('editpage-helpmenu');

  if (edittools) {
    var menu = "<select id=\"helpControl\" style=\"display:inline\" onChange=\"chooseHelpTools(selectedIndex)\">";
    menu += "<option>Tópicos de Ajuda</option>";
    menu += "<option>Convenções de Nomenclatura</option>";
    menu += "<option>Ajuda da Predefinição</option>";
    menu += "<option>Ajuda da Imagem</option>";
    menu += "<option>Diversos</option>";
    menu += "<option>Fazendo Perguntas</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolshelpmenu') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('helpControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseHelpTools( s );
  }
}

/* </pre>
===chooseHelpToolsMenu===
<pre> */
/* select subsection of special characters */
function chooseHelpTools(s) {
  var l = document.getElementById('editpage-helpmenu').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolshelpmenu', s);
}


/* 
////////////////////////////////////////////////
// THE BELOW CODE ALLOWS THE JAVASCRIPT FOR DIGG
////////////////////////////////////////////////
*/
/* </pre>
===addDigg===
<pre> */
/* call to digg script */
function addDigg() {
  var digg = document.getElementById('digg');
  if (digg) {
  
    var ds=typeof digg_skin=='string'?digg_skin:'';var h=80;var w=52;if(ds=='compact'){h=18;w=120;}
    else if(ds=='icon'){h=16;w=16;}
    var u=typeof digg_url=='string'?digg_url:(typeof DIGG_URL=='string'?DIGG_URL:window.location.href);

    var output = "<iframe src='http://digg.com/tools/diggthis.php?u="+
    escape(u).replace(/\+/g,'%2b')+
    (typeof digg_title=='string'?('&t='+escape(digg_title)):'')+
    (typeof digg_bodytext=='string'?('&b='+escape(digg_bodytext)):'')+
    (typeof digg_topic=='string'?('&c='+escape(digg_topic)):'')+
    (typeof digg_bgcolor=='string'?('&k='+escape(digg_bgcolor)):'')+
    (ds?('&s='+ds):'')+"' height='"+h+"' width='"+w+"' frameborder='0' scrolling='no'></iframe>";  
    
    digg.innerHTML = output + digg.innerHTML; 
  }
}


/* 
//////////////////////////////////////////////////////////////////
// THE BELOW CODE EXECUTES EVERYTHING ON PAGELOAD EVENT (REQUIRED)
//////////////////////////////////////////////////////////////////
*/
/* </pre>
==customizeWiki==
<pre> */
/* do any Wiki customizations */
function customizeWiki() {
  addCharSubsetMenu();
  addHelpToolsMenu();
  addDigg();
}

addLoadEvent(customizeWiki);


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirecionar",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserte texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Letras Pequenas",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Inserte texto"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Riscado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto Riscado"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Quebra de linha",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comentário visível apenas para editores",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Inserte comentário aqui"}
}

   {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Inserte Predefinição Personagem",
     "tagOpen": "{{Wiki DC Comics:Predefinição Personagem\r| Imagem                  = ",
     "tagClose": "\r| NomeReal                = \r| NomeOriginal            = \r| IdentidadeAtual         = \r| OutrosNomes             = \r| Identidade              = \r| RaçaAlienígena          = \r| Moralidade              = \r| Afiliação               = \r| Parentes                = \r| Universo                = \r| BaseDeOperações         = \r\r| Sexo                    = \r| Altura                  = \r| Peso                    = \r| Olhos                   = \r| Cabelo                  = \r| AtributosIncomuns       = \r\r| Cidadania               = \r| EstadoCivil             = \r| Ocupação                = \r\r| LocalDeNascimento       = \r| Criadores               = \r| Primeira                = \r| PrimeiraBR              = \r\r| Citação                 = \r| PersonagemCitado        = \r| FonteCitação            = \r\r| VisãoGeral              = \r\r| TextoHistória           = \r\r| Poderes                 = \r| Habilidades             = \r| Força                   = \r| Fraquezas               = \r\r| Equipamento             = \r| Transporte              = \r| Armas                   =  \r\r| Notas                   = \r| Curiosidades            = \r| Recomendado             = \r| Links                   = \r}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Inserte Predefinição Quadrinhos",
     "tagOpen": "{{Wiki DC Comics:Predefinição Quadrinhos \r| Titulo              = \r| Imagem              = ",
     "tagClose": "\r| Volume              = \r| Edicao              = \r| Dia                 = \r| Mes                 = \r| MesDePublicacao     = \r| Ano                 = \r| AnoDePublicacao     =\r| Classificacao       =\r| HistoriaDoArco      = \r| Evento              = \r \r\r| Editor Executivo    = \r| ArtistaCapa1        = \r| ArtistaCapa2        = \r| ArtistaCapa3        = \r\r| Escritor1_1         = \r| Desenhista1_1       = \r| Arte-Finalista1_1   = \r| Colorista1_1        = \r| Letrista1_1         = \r| Editor1_1           = \r| Editor1_2           = \r\r| PublicadoNoBrasil   = \r\r| Citacao             = \r| PersonagemCitado    = \r\r| TituloDaHistoria1   =\r| TituloOriginal1     = \r| Sinopse1            = \r\r| Aparicao1           = \r'''Personagens Principais:'''\r* <br/>\r'''Personagens Secundários:'''\r* <br/>\r'''Vilões:'''\r* <br/>\r'''Outros Personagens:'''\r* <br/>\r'''Locais:'''\r* <br/>\r'''Itens:'''\r* <br/>\r'''Veículos:'''\r* <br/>\r\r| Notas               = \r| Curiosidades        = \r| Recomendado         = \r| Links               = \r\}\}",
     "sampleText": ""}
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
     "speedTip": "Inserte Predefinição Equipe",
     "tagOpen": "{{Wiki DC Comics:Predefinição Equipe\r| Imagem               = ",
     "tagClose": "\r| NomeOficial          = \r| NomeOriginal         = \r| OutrosNomes          = \r\r| Status               = \r| Identidade           = \r| Moralidade           = \r| Universo             = \r| BaseDeOperacoes      = \r\r| LideresDeEquipe      = \r| MembrosAtuais        = \r| MembrosAntigos       = \r| Aliados              = \r| Inimigos             = \r\r| Origem               = \r| LugarDeFormacao      = \r| LugarDeExtincao      = \r| Criadores            = \r| Primeira             = \r| PrimeiraBR           = \r| Ultima               = \r| UltimaBR             = \r\r| VisaoGeral              = \r\r| TextoDaHistoria      = \r\r| Equipamento          = \r| Transporte           = \r| Armas                = \r| Notas                = \r| Curiosidades         = \r| Links                = \r\}\}",
 
      "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
     "speedTip": "Inserte Predefinição de Local",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Local\r| Imagem                      = ",
     "tagClose": "\r| NomeOficial                 = \r| OutrosNomes                 = \r\r| Universo                    = \r| Galaxia                     = \r| SistemaEstelar              = \r| Planeta                     = \r| Continente                  = \r| Pais                        = \r| Cidade                      = \r| Estado                      = \r| Provincia                   = \r| Localidade                  = \r\r| Dimensoes                   = \r| Populacao                   = \r| Primeira                    = \r\r| TextoDaHistoria             = \r\r| PontosDeInteresse           = \r| Residentes                  = \r\r| Notas                       = \r| Curiosidades                = \r| Links                       = \r\}\}",
     "sampleText": ""}
     

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
     "speedTip": "Inserte Predefinição de Veículo",
     "tagOpen": "\{\{DC Database: Vehicle Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r\r| VehicleType             = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": " https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
     "speedTip": "Inserte Predefinição de Item",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Item\r| Imagem                 = \r| NomeOficial            = \r| NomeOriginal           = \r| OutrosNomes            = \r| Modelo                 = \r| Versão                 = \r\r| Universo               = \r| DesignerChefe          = \r| DesignersAdicionais    = \r| LocalDeCriação         = \r| LocalDeDestruição      = \r| Origem                 = \r\r| Dimensões              = \r| Peso                   = \r| Criadores              = \r| Primeira               = \r\r| Citação                = \r| Citado                 = \r\r| ProprietárioAtual      = \r| ProprietárioAntigo     = \r\r| TextoDaHistoria        =  \r\r| Notas                  = \r| Curiosidades           = \r| Links                  =  \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5a/Images_Button.png",
     "speedTip": "Inserte Predefinição de Galeria",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Galeria\r| TipoDeGaleria           = \r| DadosDaGaleria          = \r<gallery widths=120>\r",
     "tagClose": "\r</gallery>\r| VejaTambém              = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Inserte Predefinição de Imagem",
     "tagOpen": "{{Wiki DC Comics:Predefinição Imagem\r| Licença              = ",
     "tagClose": "\r| TipoDeImagem         = \r| TipoDeImagem2        = \r| Descrição            = \r\r| CapaAnterior         = \r| PróximaCapa          = \r\r| Fonte                = \r| Edição               = \r\r| Universo             = \r| Sujeito1             = \r| Sujeito2             = \r| Sujeito3             = \r| Sujeito4             = \r| Sujeito5             =  \r\r| ArtistaCapa1         = \r| Desenhista1          = \r| Finalista1           = \r| Colorista1           = \r| Letrista1            = \r\r| Notas                = \r| Curiosidades         = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
     "speedTip": "Inserte Predefinição Volume",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Volume\r| LogoImagem              = ",
     "tagClose": "\r| EdiçãoImagem            = \r| Editora                 = \r| Tipo                    = \r| TotalEdições            = \r| MêsInicio               = \r| AnoInicio               = \r| MêsFim                  = \r| AnoFim                  = \r\r| Criadores               = \r| Destaques               = \r| Arcos                   = \r| Crossovers              = \r\r| História                = \r\r| ListaDeEdições          = \r\r| NomeAnual1              = \r| AnoAnual1               = \r\r| NomeEspecial1           = \r| AnoEspecial1            = \r\r| TradePaperbackName1     = \r| TradePaperbackYear1     = \r| TradePaperbackISBN1     = \r\r| VejaTambém              = \r\}\}",
     "sampleText": ""};
     
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
     "speedTip": "Inserte Predefinição de Raça",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Raça\r| Imagem                  =  ",
     "tagClose": "\r| Nome                    = \r| NomeOriginal            = \r| OutrosNomes             = \r| Identidade              = \r| Afiliacao               = \r| Universo                = \r| BaseDeOperacoes         = \r\r| TipoDeCorpo             = \r| AlturaMed               = \r| PesoMed                 = \r| Olhos                   = \r| Cabelo                  = \r| Pele                    = \r| NumeroDeMembros         = \r| NumeroDeDedos           = \r| NumeroDeDedosNosPes     = \r| AdaptaçoesEspeciais     = \r| AtributosIncomuns       = \r\r| Origem                  = \r| GalaxiaDeOrigem         = \r| SistemaEstelarDeOrigem  = \r| PlanetaNatal            = \r| LocalDeNascimento       = \r| Criadores               = \r| Primeira                = \r\r| TextoDaHistoria         = \r\r| Habitat                 = \r| Gravidade               = \r| Atmosfera               = \r| Populacao               = \r\r| Poderes                 = \r| Habilidades             = \r| ForçaMed                = \r| Fraquezas               = \r\r| TipoDeGoverno           = \r| NivelTecnologico        = \r| TradicoesCulturais      = \r| Representantes          = \r\r| Notas                   = \r| Curiosidades            = \r| Links                   =  \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
     "speedTip": "Inserte Predefinição de Realidade",
     "tagOpen": "{\{Wiki DC Comics:Predefinição Realidade\r| Imagem                = ",
     "tagClose": "\r| NumeroDaTerra         = \r| Titulo                = \r| OutrosNomes           =\r| Distinguir1           =\r| Distinguir2           = \r| Status                = \r\r| Criadores             = \r| Primeira              = \r| Ultima                = \r\r| Historia              = \r\r| PontosDeInteresse      = \r| Residentes            = \r| Notas                 = \r| Curiosidades          = \r| Links                 = \r\}\}",
     "sampleText": ""};
     
        mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/4/49/Glossary_Button.png",
     "speedTip": "Inserte Predefinição de Conceito",
     "tagOpen": "{\{Wiki DC Comics:Predefinição Conceito\r| Imagem                 = ",
     "tagClose": "\r| NomeOficial            = \r| NomeOriginal           = \r| OutrosNomes            =\r\r| Primeira               =\r| PrimeiraBR             = \r\r| TextoDaHistoria        = \r| TextoRelacionado       = \r\r| Notas                  = \r| Curiosidade            = \r| Links                  = \r\}\}",
     "sampleText": ""};
     
     mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png",
     "speedTip": "Inserte Funcionário da DC Comics",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição de Pessoal\r| Imagem                    = ",
     "tagClose": "\r| NomeVerdadeiro            = \r| Pseudônimos               = \r| Empregadores              = \r| Títulos                   = \r\r| Sexo                      = \r| AnoDeNascimento           = \r| MêsDeNascimento           = \r| DiaDeNascimento           = \r| CidadeDeNascimento        = \r| EstadoDeNascimento        = \r| PaísDeNascimento          = \r| AnoDaMorte                = \r| MêsDaMorte                = \r| DiaDaMorte                = \r| Criações                  = \r| Primeira                  = \r\r| Assinatura                = \r\r| HistóriaPessoal           = \r| HistóricoProfissional     = \r\r| Notas                     = \r| Curiosidades              = \r| WebsiteOficial            = \r| Links                     = \r\}\}",
     "sampleText": ""};
     
     mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/8/85/Story_Arc_Button.png",
     "speedTip": "Inserte Predefinição Arcos de História",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Arcos \r| Título                  = \r| Imagem                  = \r| NomeOficial             = \r| Pseudômimo              = \r\r| Universo                =  \r| Locais                  = \r\r| Heróis                  = \r| Vilões                  = \r| Outros                  = \r\r| Títulos                 = \r| Coleção                 = \r| Criadores               = \r| Primeira                = \r| Última                  = \r\r| Citação                 = \r| Citado                  = \r| FonteCitação            = \r\r| HistóriaTexto           = \r\r| Edições                 = \r\r| Itens                   = \r| Veículos                = \r| Armas                   = \r\r| Notas                   = \r| Curiosidades            = \r| Leitura Recomendada     = \r| Leitura Recomendada     = \r| Links                   = \r\}\}",
     "sampleText": ""};
     
     mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/dccomics/images/f/f0/Organization_Button.png/revision/latest?cb=20170507055203&format=original&path-prefix=pt",
     "speedTip": "Inserte Predefinição Organização",
     "tagOpen": "\{\{Wiki DC Comics:Predefinição Organização \r| Titulo               = \r| Imagem               = \r| NomeOficial          = \r| NomeOriginal         = \r| OutrosNomes          = \r\r| Status               = \r| Identidade           = \r| Moralidade           = \r| Universo             = \r| BaseDeOperações      = \r\r| LíderesDaOrganização = \r| MembrosAtuais        = \r| MembrosAntigos       = \r| Aliados              = \r| Inimigos             = \r\r| Origem               = \r| LocalDeFormação      = \r| LocalDeExtinção      = \r| Criadores            = \r| Primeira             = \r| PrimeiraBR           = \r| Última               = \r| ÚltimaBR             = \r\r| TextoHistoria        = \r\r| Equipamento          = \r| Transporte           = \r| Armas                = \r\r| Notas                = \r| Curiosidades         = \r| Recomendado          = \r| Links                =  \r\}\}",
     "sampleText": ""};
     
     mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/dccomics/images/0/02/Computer.png/revision/latest?cb=20181222172906&path-prefix=pt",
     "speedTip": "Inserte Predefinição Desambiguação",
     "tagOpen": "\{\{Predefinição:Disambig \r| Imagem             = \r| ImagemTexto        = \r| MainPage           = \r| Era1               = \r\r| Imagem2            = \r| Imagem2Texto       = \r| MainPage2          = \r| Era2               = \r\r| AltID              = \r| Descrição          = \r\r| Galeria            = \r<gallery widths=120> \r\r</gallery> \r\r| Veja Também        = }\}",
     "sampleText": ""};
     
    }

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;