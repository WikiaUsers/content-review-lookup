/* Qualquer código JavaScript presente aqui será carregado para todos os 

 /** Tooltips ********************************************************************************
  *  Descrição: JS para exibir os "tooltips" do Wikibooks.
  ********************************************************************************************/
 ta = new Object();
 
 ta['pt-userpage'] = new Array('.','Minha página de usuário');
 ta['pt-anonuserpage'] = new Array('.','O número IP da página de usuário que está sendo editada é');
 ta['pt-mytalk'] = new Array('n','Minha discussão');
 ta['pt-anontalk'] = new Array('n','Discussão sobre este número IP');
 ta['pt-preferences'] = new Array('','Minhas preferências');
 ta['pt-watchlist'] = new Array('l','Lista de páginas vigiadas');
 ta['pt-mycontris'] = new Array('y','Lista de minhas contribuições');
 ta['pt-login'] = new Array('o','Você é encorajado a registrar-se ou autenticar-se, mas isso não é mandatório.');
 ta['pt-anonlogin'] = new Array('o','Você é encorajado a registrar-se ou autenticar-se, mas isso não é mandatório.');
 ta['pt-logout'] = new Array('o','Sair');
 ta['ca-talk'] = new Array('t','Discussão sobre o conteúdo da página');
 ta['ca-edit'] = new Array('e','Você pode editar esta página. Por favor, use o botão Mostrar Previsão antes de salvar.');
 ta['ca-addsection'] = new Array('+','Adicionar comentário a essa discussão');
 ta['ca-viewsource'] = new Array('e','Esta página está protegida; você pode exibir seu código, no entanto.');
 ta['ca-history'] = new Array('h','Edições anteriores desta página.');
 ta['ca-protect'] = new Array('=','Proteger esta página');
 ta['ca-delete'] = new Array('d','Apagar esta página');
 ta['ca-undelete'] = new Array('d','Restaurar edições feitas a esta página antes de sua eliminação');
 ta['ca-move'] = new Array('m','Renomear esta página');
 ta['ca-nomove'] = new Array('','Você não tem permissões para mover esta página');
 ta['ca-watch'] = new Array('w','Adicionar esta página aos artigos vigiados');
 ta['ca-unwatch'] = new Array('w','Remover esta página dos artigos vigiados');
 ta['search'] = new Array('f','Procurar neste wiki');
 ta['p-logo'] = new Array('','Página principal');
 ta['n-mainpage'] = new Array('z','Visita a página principal');
 ta['n-portal'] = new Array('','Sobre o projeto e coisas que você poder fazer aqui');
 ta['n-currentevents'] = new Array('','Informação temática sobre eventos atuais');
 ta['n-recentchanges'] = new Array('r','A lista de mudanças recentes neste wiki');
 ta['n-randompage'] = new Array('x','Carregar página aleatória');
 ta['n-help'] = new Array('','Um local reservado para auxílio');
 ta['n-sitesupport'] = new Array('','Ajude-nos');
 ta['t-whatlinkshere'] = new Array('j','Lista de todas as páginas que ligam-se a esta'); 
 ta['t-recentchangeslinked'] = new Array('k','Mudanças recentes em páginas relacionadas a esta'); 
 ta['feed-rss'] = new Array('','Feed RSS desta página'); 
 ta['feed-atom'] = new Array('','Feed Atom desta página'); 
 ta['t-contributions'] = new Array('','Ver as contribuições deste usuário'); 
 ta['t-emailuser'] = new Array('','Enviar um e-mail para este usuário'); 
 ta['t-upload'] = new Array('u','Carregar imagens ou arquivos de mídia'); 
 ta['t-specialpages'] = new Array('q','Lista de páginas especiais'); 
 ta['ca-nstab-main'] = new Array('c','Ver o conteúdo da página'); 
 ta['ca-nstab-user'] = new Array('c','Ver a página de usuário'); 
 ta['ca-nstab-media'] = new Array('c','Ver a página de mídia'); 
 ta['ca-nstab-special'] = new Array('','Esta é uma página especial, não pode ser editada.'); 
 ta['ca-nstab-wp'] = new Array('a','Ver a página de projeto'); 
 ta['ca-nstab-image'] = new Array('c','Ver a página de imagem'); 
 ta['ca-nstab-mediawiki'] = new Array('c','Ver a mensagem do sistema'); 
 ta['ca-nstab-template'] = new Array('c','Ver a predefinição'); 
 ta['ca-nstab-help'] = new Array('c','Ver a página de ajuda'); 
 ta['ca-nstab-category'] = new Array('c','Ver a página da categoria');
 ta['ca-nstab-portal'] = new Array('p','Ver o Portal');


 
 /** Helpers ************************************************************************
  *  Descrição:
  *      Autor:
  ********************************************************************************************/
 if (window.showModalDialog && document.compatMode && document.compatMode == "CSS1Compat" && typeof(document.attachEvent) != "undefined")

 {
   var oldWidth;
   var docEl = document.documentElement;
 
   function fixIEScroll()
   {
     if (!oldWidth || docEl.clientWidth > oldWidth)
       doFixIEScroll();
     else
       setTimeout(doFixIEScroll, 1);
 
     oldWidth = docEl.clientWidth;
   }
 
   function doFixIEScroll() {
     docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
   } 
 
   document.attachEvent("onreadystatechange", fixIEScroll);
   attachEvent("onresize", fixIEScroll);
 }
 
 function addLoadEvent(func) 
 {
   if (window.addEventListener) 
     window.addEventListener("load", func, false);
   else if (window.attachEvent) 
     window.attachEvent("onload", func);
 }



 /** Link destaque ***************************************************************************
  *  Descrição: Adiciona estrela ao lado da ligação dos artigos destacados das outras Wikipédias
  ********************************************************************************************/
function LinkFA() 
 {
     if ( document.getElementById( "p-lang" ) ) {
         var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
         for ( var i = 0; i < InterwikiLinks.length; i++ ) {
             if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
                 InterwikiLinks[i].className += " FA"
                 InterwikiLinks[i].title = "Este artigo recebeu estatuto de destaque.";
             }
         }
     }
 }
 
 addOnloadHook( LinkFA );



 
 /** Barra de navegação **********************************************************************
  *  Descrição:
  ********************************************************************************************/
 // set up the words in your language
 var NavigationBarHide = '[ Esconder ]';
 var NavigationBarShow = '[ Expandir ]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 
 
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
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
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
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
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
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
              if (NavFrame.childNodes[j].className == "NavHead") {
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
 
 addLoadEvent(createNavigationBarToggleButton);


 
 /** Correlatos ******************************************************************************
  *  Descrição:Correlatos no menu lateral. Código copiado do de:wikt
  ********************************************************************************************/
 // InterProjekt-Links (vgl. [[MediaZilla:708]])
 document.write('<style type="text/css">#interProject {display: none; speak: none;} #p-tb .pBody {padding-right: 0;}<\/style>');
 function iProject() {
  if (document.getElementById("interProject")) {
   var iProject = document.getElementById("interProject").innerHTML;
   var interProject = document.createElement("div");
   interProject.style.marginTop = "0.7em";
   interProject.innerHTML = '<h5>Correlatos<\/h5><div class="pBody">'+iProject+'<\/div>';
   document.getElementById("p-tb").appendChild(interProject);
  }
 }
 hookEvent("load", iProject);
 
 /*



 /** Force IP Preview ***********************************************************************
  *  Descrição: Obriga utilizadores não registrados a previsualizarem suas edições antes de salvá-las.
  ********************************************************************************************/
 
 // Force IP to preview before saving changes.
 // Copyright Marc Mongenet, 2006
 function forcePreview()
 {
        if (wgUserName != null) return;
        var saveButton = document.getElementById("wpSave");
        if (!saveButton) return;
        if (location.search.search(/&action=edit/) == -1) return;
        saveButton.disabled = true;
        saveButton.style.fontWeight = "normal";
        document.getElementById("wpPreview").style.fontWeight = "bold";
 }
 
 addLoadEvent(forcePreview);



 /** Importar módulos JavaScript e CSS *******************************************************
  *    Origem: [[:w:en:MediaWiki:Common.js]]
  * Descrição: Simplifica o código para instalação de módulos pessoais JavaScript e CSS
  *     Autor: [[:w:en:User:AzaToth]]
  ********************************************************************************************/
 importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
 
 function importStylesheet( page ) {
     var sheet = '@import "'
               + wgScriptPath
               + '/index.php?title='
               + encodeURIComponent( page.replace( / /g, '_' ) )
               + '&action=raw&ctype=text/css";'
     var styleElem = document.createElement( 'style' );
     styleElem.setAttribute( 'type' , 'text/css' );
     styleElem.appendChild( document.createTextNode( sheet ) );
     document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
 }


 /** Importar módulos JavaScript de páginas da fr.wikipedia.org ******************************
  * Obs: Importar os demais scripts utilizados da página francesa e utilizar o
  * importScript() acima, que opossui a mesma função.
  ********************************************************************************************/
 function loadJs(page)
 {
  document.write('<script type="text/javascript" src="' +
                'http://fr.wikipedia.org/w/index.php?title=' + page +
                '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }



 /** Altera o título da página **************************************************************
  *    Origem: [[:w:en:MediaWiki:Common.js]]
  * Descrição: A função procura por um banner como:
  * <nowiki><div id="RealTitleBanner">Div that is hidden</nowiki>
  *   <nowiki><span id="RealTitle">title</span></nowiki>
  * <nowiki></div></nowiki>
  * An element with id=DisableRealTitle disables the function.
  ********************************************************************************************/

 rewritePageH1 = function() {
    try {
        var realTitleBanner = document.getElementById("RealTitleBanner");
        if (realTitleBanner) {
            if (!document.getElementById("DisableRealTitle")) {
                var realTitle = document.getElementById("RealTitle");
                var h1 = document.getElementsByTagName("h1")[0];
                if (realTitle && h1) {
                    h1.innerHTML = realTitle.innerHTML;
                    realTitleBanner.style.display = "none";
                }
            }
        }
    } 
 catch (e) {
    /* Algo deu errado. */
    }
 }
 addOnloadHook(rewritePageH1);



 /** Pesquisa em vários motores de busca *****************************************************
  *    Origem: [[:w:en:MediaWiki:Common.js]]
  * Descrição: acrescenta um menu drop-down na página [[Especial:Search]] para pesquisar em vários motores de busca
  *     Autor: [[:w:en:User:Gracenotes]]
  ********************************************************************************************/
 if (wgPageName == "Especial:Search") {
         var searchEngines = [];
         addOnloadHook(SpecialSearchEnhanced);
 }
 
 function SpecialSearchEnhanced() {
         var createOption = function(site, action, mainQ, addQ, addV) {
                 var opt = document.createElement('option');
                 opt.appendChild(document.createTextNode(site));
                 searchEngines[searchEngines.length] = [action, mainQ, addQ, addV];
                 return opt;
         }
         var searchForm = document.forms['search'];
         var selectBox = document.createElement('select');
         selectBox.id = 'searchEngine';
         searchForm.onsubmit = function() {
                 var optSelected = searchEngines[document.getElementById('searchEngine').selectedIndex];
                 searchForm.action = optSelected[0];
                 searchForm.lsearchbox.name = optSelected[1];
                 searchForm.title.value = optSelected[3];
                 searchForm.title.name = optSelected[2];
         }
         selectBox.appendChild(createOption('Wikipédia', wgScriptPath + '/index.php', 'search', 'title', 'Especial:Search'));
         selectBox.appendChild(createOption('WikiWix', 'http://pt.wikiwix.com/', 'action', '', ''));
         selectBox.appendChild(createOption('Google', 'http://www.google.pt/search', 'q', 'as_sitesearch', 'pt.wikipedia.org'));
         selectBox.appendChild(createOption('Yahoo', 'http://search.yahoo.com/search', 'p', 'vs', 'pt.wikipedia.org'));
         selectBox.appendChild(createOption('Windows Live', 'http://search.live.com/results.aspx', 'q', 'q1', 'site:http://pt.wikipedia.org'));
 
         searchForm.lsearchbox.style.marginLeft = '0px';
         var lStat = document.getElementById('loadStatus');
         lStat.parentNode.insertBefore(selectBox, lStat);
 }


 /** Wiki Mini Atlas ************************************************************************
  *  Descrição: Mini atlas para artigos com geocoodernadas.
  *      Autor: [[en:User:Dschwen]]
  ********************************************************************************************/
  document.write('<script type="text/javascript" src="' 
      + 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
      + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
  var wma_settings =
  {
      height : 300,
      width : 500
  }

if(document.getElementById && !document.location.href.match("action=edit") && !document.location.href.match("action=submit")) {
 function loadLoginForm() {
  var box = document.getElementById("irclogin");
  var html = null;
  if(box) {
    html  = '<form method="post" action="http://chatwikizine.memebot.com/cgi-bin/cgiirc/irc.cgi" target="_blank" id="loginform" name="loginform">';
    html += '  <input type="hidden" id="interface" "name="interface" value="nonjs"/>';
    html += '  <input type="text" size="25" id="Nickname" name="Nickname" value="' + nickify(wgUserName) + '" onfocus="clear_text(this)"/>';
    html += '  <select id="metodo" name="metodo" onChange="setServer();"> <option value="cgi">CGI</option><option value="Java">Java</option> </select>';
    html += '  <input type="hidden" name="Character_set" value="utf-8"/>';
    html += '  <input type="hidden" id="rede" name="Server" value="irc.freenode.net"/>';
    html += '  <input type="hidden" id="ch" name="Channel" value="#wikipedia-pt"/>';
    html += '  <input type="submit" value="entrar" onclick="document.getElementById(\'loginform\').submit();"/>';
    html += '</form>';
    box.innerHTML = html;
  }
 }
 function setServer() {
  var selMetodo=document.getElementById("metodo");
  var nmMetodo=selMetodo.options[selMetodo.selectedIndex].value;
  if(nmMetodo == 'Java') {
     document.getElementById("rede").name = 'h';
     document.getElementById("Nickname").name = 'n';
     document.getElementById("ch").name = 'ch';
     document.getElementById("loginform").action = 'http://czat.computerserv.pl/';
  }else if(nmMetodo == 'cgi') {
         document.getElementById("rede").name = 'Server';
         document.getElementById("Nickname").name = 'Nickname';
         document.getElementById("ch").name = 'Channel';
         document.getElementById("loginform").action = 'http://chatwikizine.memebot.com/cgi-bin/cgiirc/irc.cgi';
        }
  setjs();
  }

 
  function nickify(s) {
    if(s == null) {
      return "anon" + Math.floor(Math.random()*100);
    }
    s = s.toLowerCase();
    s = s.replace(" ", "_");
    s = s.replace(/á/g, 'a');
    s = s.replace(/é/g, 'e');
    s = s.replace(/í/g, 'i');
    s = s.replace(/[óő]/g, 'o');
    s = s.replace(/[úű]/g, 'u');
    s = s.replace(/[^a-z0-9_-]/g, '');
    return s;
  }
 
  var irclogin_cleared = 0;
  function clear_text(field) {
    if(irclogin_cleared == 0) {
      irclogin_cleared = 1;
      field.value = "";
    }
  }
  function setjs() {
    if(navigator.product == 'Gecko') {
      document.loginform["interface"].value = 'mozilla';
    } else if(window.opera && document.childNodes) {
      document.loginform["interface"].value = 'opera7';
    } else if(navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.userAgent.indexOf("Mac_PowerPC") > 0) {
      document.loginform["interface"].value = 'konqueror';
    } else if(navigator.appName == 'Microsoft Internet Explorer') {
      document.loginform["interface"].value = 'ie';
    } else if(navigator.appName == 'Konqueror') {
      document.loginform["interface"].value = 'konqueror';
    } else if(window.opera) {
      document.loginform["interface"].value = 'opera';
    }
  }
 
  addOnloadHook(loadLoginForm);
}


 /** Corretor de transparência de PNG em Win IE 5.5 & 6.*************************************
  *      Autor: http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.
  *  Descrição: Mini atlas para artigos com geocoodernadas.
                Adapted for Wikipedia by Remember_the_dot and Edokter
                http://homepage.ntlworld.com/bobosola/pnginfo.htm states "This page contains more information for
                the curious or those who wish to amend the script for special needs", which I take as permission to
                modify or adapt this script freely. I release my changes into the public domain.
  ********************************************************************************************/
 
function PngFix()
{
    if (document.body.filters)
    {
        var documentImages = document.images
        for (var i = 0; i < documentImages.length;)
        {
            var img = documentImages[i]
            var imgSrc = img.src
            if (imgSrc.substr(imgSrc.length - 3).toLowerCase() == "png")
            {
                if (img.currentStyle.borderStyle == "none")
                {
                    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
                    img.src = "http://upload.wikimedia.org/wikipedia/commons/d/db/Must_left-click_image_again_before_saving.gif"
                    i++
                }
                else
                {
                    var outerSpan = document.createElement("span")
                    var innerSpan = document.createElement("span")
                    var outerSpanStyle = outerSpan.style
                    var innerSpanStyle = innerSpan.style
                    var imgStyle = img.currentStyle
 
                    outerSpan.id = img.id
                    outerSpan.className = img.className
                    outerSpan.title = img.title
                    outerSpanStyle.borderWidth = imgStyle.borderWidth
                    outerSpanStyle.borderStyle = imgStyle.borderStyle
                    outerSpanStyle.borderColor = imgStyle.borderColor
                    outerSpanStyle.display = "inline-block"
                    outerSpanStyle.fontSize = "0"
                    outerSpanStyle.verticalAlign = "middle"
                    if (img.parentElement.href) outerSpanStyle.cursor = "hand"
 
                    innerSpanStyle.width = img.width + "px"
                    innerSpanStyle.height = img.height + "px"
                    innerSpanStyle.display = "inline-block"
                    innerSpanStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
 
                    outerSpan.appendChild(innerSpan)
                    img.parentNode.replaceChild(outerSpan, img)
                }
            }
            else
            {
                i++
            }
        }
    }
}
 
if (navigator.appName == "Microsoft Internet Explorer")
{
  var version = navigator.appVersion.substr(22, 3)
  if (version == "6.0" || version == "5.5")
  {
    window.attachEvent("onload", PngFix)
  }
}

 /** Including extra .js pages */ 
 // switches for scripts
 var load_edittools = true;
 
 // extra drop down menu on editing for adding special characters
 importScript('MediaWiki:Edittools.js')



 /** Importar módulos JavaScript e CSS *******************************************************
  *    Origem: [[:w:pt:MediaWiki:Common.js]]
  * Descrição: Simplifica o código para instalação de módulos pessoais JavaScript e CSS
  ********************************************************************************************/
 importedScripts = {}; // O objeto mantém registro dos scripts incluídos, então um script não será incluído duas vezes
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
 
 function importStylesheet( page ) {
     var sheet = '@import "'
               + wgScriptPath
               + '/index.php?title='
               + encodeURIComponent( page.replace( / /g, '_' ) )
               + '&action=raw&ctype=text/css";'
     var styleElem = document.createElement( 'style' );
     styleElem.setAttribute( 'type' , 'text/css' );
     styleElem.appendChild( document.pancreatectomias( sheet ) );
     document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
 }

/** Collapsible Tables ***********************************************************************
  *    Origem: [[w:en:MediaWiki:Common.js]]
  *     Ajuda: [[w:en:Wikipedia:Collapsible_tables]]
  *   Autores: [[w:en:User:R. Koot]]
  ********************************************************************************************/
  importScriptURI('http://pt.wikibooks.org/w/index.php?title=MediaWiki:CollapsibleTable.js&action=raw&ctype=text/javascript');