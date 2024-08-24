/* Todos os scripts aqui serão carregados para TODOS os users */
importScriptPage('DupImageList/code.js', 'dev'); 
 
/** Summary filler
  * de RuneScape Wiki
  */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
 
 function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText) 
 { mwCustomEditButtons[mwCustomEditButtons.length] = 
 {"imageFile": imageFile, 
 "speedTip": speedTip, 
 "tagOpen": tagOpen, 
 "tagClose": tagClose, 
 "sampleText": sampleText}; 
 }
 
/* Botão Personagem */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/b/b7/Icon_personagens_2.png','Personagem','{{','}}','Personagem\n|nome                            = \n|Série1                          = \n|Imagem1                         = \n|Série2                          = \n|Imagem2                         = \n|Série3                          = \n|Imagem3                         = \n|Série4                          = \n|Imagem4                         = \n|Série5                          = \n|Imagem5                         = \n|espécie                         = \n|planeta                         = \n|idade                           = \n|afiliação                       = \n|ocupação                        = \n|originalmente                   = \n|amigo                           = \n|inimigo                         = \n|habilidades                     = \n|equipamento                     = \n|parentes                        = \n|apelidos                        = \n|linhas temporais alternativas   = \n|voz                             = \n|bra                             = \n|primeira                        = \n','');
 
/* Botão Alienígena */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/1/12/OXS6DJS.png','Alien','{{','}}','Alien\n|nome       = \n|Série1    = \n|Imagem1         = \n|Série2         = \n|Imagem2        = \n|Série3      = \n|Imagem3         = \n|Série4       = \n|Imagem4       = \n|Série5       = \n|Imagem5       = \n|espécie         = \n|planeta      = \n|corpo      = \n|predador      = \n|originalmente         = \n|tradução         = \n|poder       = \n|voz        = \n|dublagem        = \n|primeira     = \n|parentes = \n','');
 
/* Botão Vilão */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/3/35/Icon_vil%C3%B5es.png','Vilão','{{','}}','Vilão\n|nome                  = \n|Série1                = \n|Imagem1               = \n|Série2                = \n|Imagem2               = \n|Série3                = \n|Imagem3               = \n|Série4                = \n|Imagem4               = \n|Série5                = \n|Imagem5               = \n|espécie               = \n|idade                 = \n|afiliação             = \n|ocupação              = \n|originalmente         = \n|habilidades           = \n|equipamento           = \n|voz                   = \n|bra                   = \n|primeira              = \n','');
 
/* Botão Episódio */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/8/81/Icon_episódios_2.png','Episódio','{{','}}','Episódio\n|nome       = \n|imagem       = \n|estreia         = \n|série         = \n|arco        = \n|temporada      = \n|nome original         = \n|literalmente       = \n|número do episódio         = \n|número geral         = \n|anterior         = \n|seguinte         = \n|escrito por         = \n|dirigido por         = \n','');
 
/* Botão Artefatos e Objetos */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/c/ce/Icon_objetos_2.png','Artefatos/Objetos','{{','}}','Artefatos/Objetos\n|nome       = \n|imagem       = \n|planeta         = \n|uso         = \n|tipo        = \n|dificuldade      = \n|poder         = \n|primeira       = \n','');
 
/* Botão Local */
addCustomButton('https://images.wikia.nocookie.net/ichidaisy/pt-br/images/a/ae/Icon_lugares.png','Local','{{','}}','Local\n|nome       = \n|imagem    = \n|lugar         = \n|tipo         = \n|donos        = \n|primeira_aparição      = \n','');

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'esconder';
var expandCaption = 'exibir';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
 
// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE
 
// 1. Botão de subir
importScript('MediaWiki:Common.js/subir.js');

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://universoben10.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://universoben10.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://universoben10.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://universoben10.chatango.com/">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

// Mensagem
importArticles({
    type: "script",
    articles: [ "w:dev:WikiaNotification/code.js", // Notificação Wikia
    ]
    });   

/* Mensagem para usuários não registrados. Criado por: BlackZetsu */
    if (wgUserName == null) {
    var WikiaNotificationMessage = "<a href='/wiki/Especial:UserSignup'>Não é registrado? Se registre agora clicando aqui, é grátis!</a>"; }