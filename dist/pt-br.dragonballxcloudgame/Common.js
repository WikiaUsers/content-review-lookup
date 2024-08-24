/* Qualquer JavaScript aqui ser� carregado para todos os usu�rios em cada carregamento de p�gina. */

/*********************************************/
/* sliders usando jquery por Usu�rio:Tierrie */
/*********************************************/

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // vincula evento de clique a link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // alterna para a pr�xima aba
            return false;
        });
        $('#portal_prev').click(function() { // vincula evento de clique a link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // alterna para a aba anterior
            return false;
        });
    });
});

// ============================================================
// COME�O das Barras de Navega��o Din�micas (experimental)
// Este script � da Wikip�dia. Para atribui��o ao autor, por favor, veja http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Testa se um elemento tem uma determinada classe *****************************
 *
 * Descri��o: Usa express�es regulares e cache para um melhor desempenho.
 * Mantenedores: Usu�rio:Mike Dillon, Usu�rio:R. Koot, Usu�rio:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Tabelas dobr�veis *********************************************************
 *
 *  Descri��o: Permite que tabelas sejam dobradas, mostrando apenas o cabe�alho. Veja
 *               [[Wikipedia:NavFrame]].
 *  Mantenedores: [[Usu�rio:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "exibir";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* s� adiciona bot�o e incrementa contagem se houver uma linha de cabe�alho para se trabalhar */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
addOnloadHook(createCollapseButtons);

/** Barras de Navega��o Din�micas (experimental) *************************************
 *
 *  Descri��o: Veja [[Wikipedia:NavFrame]].
 *  Mantenedores: SEM MANUTEN��O
 */

// configure as palavras no seu idioma
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// configure a contagem m�xima de Barras de Navega��o na p�gina,
// se existem mais, todas ser�o escondidas
// NavigationBarShowDefault = 0; // todas as barras ser�o escondidas
// NavigationBarShowDefault = 1; // em p�ginas com mais de 1 barra, todas as barras ser�o escondidas
var NavigationBarShowDefault = autoCollapse;


// mostra e esconde conte�do e foto (se dispon�vel) das barras de navega��o
// Par�metros:
//     indexNavigationBar: o index da barra de navega��o a ser alternada
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // se mostrado agora
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // se escondido agora
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
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

// adiciona bot�o de mostrar/esconder �s barras de navega��o
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // itera sobre todos < div >-elementos 
    var divs = document.getElementsByTagName("div");
    for (
        var i = 0; NavFrame = divs[i]; i++
    ) {
        // se encontrado uma barra de navega��o
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Encontra o NavHead e anexa o link de altern�ncia (Deve ser este complicado porque manipula��o firstChild de Moz � chato)
            for (
                var j = 0; j < NavFrame.childNodes.length; j++
            ) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // se mais Barras de Navega��o forem encontradas que Default: esconder tudo
    if (NavigationBarShowDefault < indexNavigationBar) {
        for (
            var i = 1; i <= indexNavigationBar; i++
        ) {
            toggleNavigationBar(i);
        }
    }

}
addOnloadHook(createNavigationBarToggleButton);

////////////////////////////////////////////////////////

//OS C�DIGOS ABAIXO LIDAM COM A PREDEFINI��O ERA
//cortesia de c�digos da silent hill wiki.

function showEras(className) {
    if (typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if (titleDiv === null || titleDiv === undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements !== null && elements.length > 0) ? elements[0] : null;
}

function moveRating() {
    var elements = getElementsByClass('ratings-top', document.getElementById('content'), 'div');
    if (elements[0] === null || elements[0] === undefined)
        return;
    var cloneNode = elements[0].cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

/*
    Fonte: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, que complementa getElementById and getElementsByTagName, retorna uma array de todos os sub-elementos de "node" que s�o marcados com uma classe CSS espec�fica (''searchClass'') e s�o do nome do tag ''tag''. Se o tag for null, ela procura por todos os elementos adequados, independentemente do nome do tag.
    Exemplo: getElementsByClass('infobox', document.getElementById('content'), 'div') seleciona os mesmos elementos que a declara��o CSS #content div.infobox
*/
function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();

    if (node === null)
        node = document;

    if (tag === null)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for (i = 0, j = 0; i < elsLen; i++) {
        if (tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
};

/*
    fim de getElementsByClass
*/

moveRating();
showEras('title-linktabs');

// FIM DOS C�DIGOS PARA ERA

//**Especial:Carregar arquivo**//

$(function Information() {
    if ((wgPageName == 'Especial:Carregar_arquivo' || wgPageName == 'Especial:Uploads_em_massa') && document.getElementById('wpDestFile').value === '') {
        document.getElementById('wpUploadDescription').value = '{{Informa��es\r|aten��o         = \n|descri��o       = \n|fonte           = \n|autor           = \n|especsdoarquivo = \n|licenciamento   = \n}}';
    }
});

/* ######################################################################## */
/* ### �CONES DE T�TULO (Predefini��o:Jogos)                            ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descri��o: Adiciona �cones ao t�tulo do artigo                   ### */
/* ###                                                                  ### */
/* ######################################################################## */

function addTitleIcons() {
    var iconBar = $('#va-titleicons');
    var previewBar = $('#va-titleicons-preview');

    if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
        return;
    }

    if (iconBar.length > 0 && $('a', previewBar).length > 0) {
        if (skin == 'oasis' || skin == 'wikia') {
            var articleDiv = $('#WikiaArticle');

            if (articleDiv.length > 0) {
                iconBar.css('display', 'block').prependTo(articleDiv);
            }
        } else if (skin == 'monobook') {
            var firstHeading = $('#firstHeading').css('position', 'relative');

            if (firstHeading.length > 0) {
                iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
            }
        }

        $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');

        iconBar.hover(
            function() {
                $(this).addClass('va-titleicons-hover');
            },
            function() {
                $(this).removeClass('va-titleicons-hover');
            });
    }
}

// Desativa o bot�o para adicionar imagens �s galerias existentes
$(function() {
    $('#bodyContent .wikia-gallery-add a').unbind('click').click(function() {
        return false;
    });
});