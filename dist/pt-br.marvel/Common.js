/* Any JavaScript here will be loaded for all users on every page load. */

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

/*//////////////////////////////////////////////////////////////////
// Botões Personalizados do Editor                                //
//////////////////////////////////////////////////////////////////*/

if ( window.mwCustomEditButtons ) {
    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.com/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirecionar",
        "tagOpen": "#REDIRECIONAMENTO [[",
        "tagClose": "]]",
        "sampleText": "Insira o texto"} );

    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.com/marvel_dc/images/3/3e/Small_Button.png",
        "speedTip": "Pequeno",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Insira o texto"} );

    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.com/central/images/c/c9/Button_strike.png",
        "speedTip": "Traçado",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Insira o texto"} );

    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.com/central/images/1/13/Button_enter.png",
        "speedTip": "Quebra de linha",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": "" } );

    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        "speedTip": "Comentário visível apenas para editores",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insira o comentário aqui" } );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
        "speedTip": "Inserir predefinição de personagem",
        "tagOpen": "{{Marvel Wiki:Predefinição de Personagem\r| Imagem                   = ",
        "tagClose": "\r| NomeReal                 = \r| NomeOriginal             = \r| IdentidadeAtual          = \r| OutrasIdentidades        = \r| Identidade               = \r| Moralidade               = \r| Afiliações               = \r| Parentes                 = \r| Universo                 = \r| BaseDeOperações          = \r\r| Sexo                     = \r| Altura                   = \r| Peso                     = \r| Olhos                    = \r| Cabelo                   = \r| AtributosIncomuns        = \r\r| Cidadania                = \r| EstadoCivil              = \r| Ocupação                 = \r| Educação                 = \r\r| Origem                   = \r| LugarDeNascimento        = \r| Criadores                = \r| Primeira                 = \r| PrimeiraBR               = \r\r| TextoHistória            = \r\r| Poderes                  = \r| Habilidades              = \r| Força                    = \r| Fraquezas                = \r\r| Equipamento              = \r| Transporte               = \r| Armas                    = \r\r| Notas                    = \r| Curiosidades             = \r| Marvel                   = \r| Wikipedia                = \r| Links                    = \r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
        "speedTip": "Inserir predefinição de quadrinho",
        "tagOpen": "{{Marvel Wiki:Predefinição de Quadrinho\r| Imagem              = ",
        "tagClose": "\r| Mês                 = \r| Ano                 = \r\r| Editor-Chefe        = \r| ArtistaDaCapa1      = \r| Publicador1_1       = \r| CCO                 = \r| Presidente1_1       = \r\r| Citação             = \r| PersonagemCitado    = \r\r| TítuloDaHistória1   = \r| Escritor1_1         = \r| Desenhista1_1       = \r| Arte-Finalista1_1   = \r| Colorista1_1        = \r| Letrista1_1         = \r| Editor1_1           = \r\r| Aparições1          = \r'''Personagens Principais:'''\r* <br/>\r'''Personagens Secundários:'''\r* <br/>\r'''Antagonistas:'''\r* <br/>\r'''Outros Personagens:'''\r* <br/>\r'''Raças e Espécies:'''\r* <br/>\r'''Locais:'''\r* <br/>\r'''Itens:'''\r* <br/>\r'''Veículos:'''\r* <br/>\r\r| Sinopse1            = \r\r| Notas               = \r| Curiosidades        = \r| Recomendado         = \r| Links               = \r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
        "speedTip": "Inserir predefinição de volume de quadrinho",
        "tagOpen": "{{Marvel Wiki:Volume\r| ListaEdições               = \r<gallery position=\"center\" captionalign=\"center\">\r",
        "tagClose": "\r\r</gallery>\r\r| VejaTambém                 =  \r\r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
        "speedTip": "Inserir predefinição de equipe",
        "tagOpen": "{{Marvel Wiki:Predefinição de Equipe \r| Imagem                   = ",
        "tagClose": "\r| NomeOficial             = \r| NomeOriginal            = \r| OutrosNomes             = \r\r| Estado                  = \r| Identidade              = \r| Moralidade              = \r| Universo                = \r| BaseDeOperações         = \r\r| LíderesDaEquipe         = \r| MembrosAtuais           = \r| AntigosMembros          = \r| Aliados                 = \r| Inimigos                = \r\r| Origem                  = \r| LugarDeFormação         = \r| LugarDeExtinção         = \r| Criadores               = \r| Primeira                = \r| Última                  = \r\r| TextoDaHistória         = \r\r| Equipamento             = \r| Transporte              = \r| Armas                   = \r| Notas                   = \r| Curiosidades            = \r| Links                   = }}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
        "speedTip": "Inserir predefinição de local",
        "tagOpen": "{{Marvel Wiki:Predefinição de Local\r| Imagem                  = ",
     "tagClose": "\r| NomeOficial             = \r| OutrosNomes             = \r\r| Universo                = \r| Galáxia                 = \r| SistemaEstelar          = \r| Planeta                 = \r| Continente              = \r| País                    = \r| Região                  = \r| Estado                  = \r| Cidade                  = \r| Localidade              = \r\r| População               = \r| Criadores               = \r| Primeira                = \r\r| TextoDaHistória         = \r\r| PontosDeInteresse       = \r| Residentes              = \r\r| Notas                   = \r| Curiosidades            = \r| Links                   = \r}}",
     "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
        "speedTip": "Inserir predefinição de veículos",
        "tagOpen": "{{Marvel Wiki:Veículos\r| Imagem                   = ",
        "tagClose": "\r| NomeOficial            = \r| Título                   = \r| Apelidos               = \r| Universo                = \r| Estado                  = \r| ModeloAtual            = \r| DonoAtual            = \r| MétodoTransporte         = \r| Dimensões              = \r| Criadores                = \r| Origem                  = \r| Primeira                   = \r\r| TextoHistória             = \r\r| Notas                   = \r| Curiosidades                  = \r| Links                   = \r}}",
        "sampleText": ""} );
    
mwCustomEditButtons.push( {
     "imageFile": 
     "https://images.wikia.nocookie.net/marveldatabase/images/f/f0/Organization_Button.png",
     "speedTip": "Inserir predefinição de organização",
     "tagOpen": "{{Marvel Wiki:Predefinição de Organização \r| Título               = \r| Imagem               = \r| NomeOficial          = \r| NomeOriginal         = \r| OutrosNomes          = \r\r| Estado               = \r| Identidade           = \r| Universo             = \r| BaseDeOperações      = \r\r| LíderesDaOrganização = \r| MembrosAtuais        = \r| AntigosMembros       = \r| Aliados              = \r| Inimigos             = \r\r| Origem               = \r| LugarDeFormação      = \r| LugarDeExtinção      = \r| Criadores            = \r| Primeira             =              = \r\r| TextoDaHistória      = \r\r| Equipamento          = \r| Transporte           = \r| Armas                = \r\r| Notas                = \r| Curiosidades         = \r| Links                =  \r}}",
     "sampleText": ""} );
     
    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
        "speedTip": "Inserir predefinição de item",
        "tagOpen": "{{Marvel Wiki:Predefinição de Item\r| Imagem                  = ",
"tagClose": "\r| NomeOficial             = \r| NomeOriginal            = \r| OutrosNomes             = \r| Modelo                  = \r| Versão                  = \r\r| Universo                = \r| DesignerChefe           = \r| DesignersAdicionais     = \r| LugarDeCriação          = \r| LugarDeDestruição       = \r| Origem                  = \r\r| Dimensões               = \r| Peso                    = \r| Primeira                = \r\r| TextoDaHistória         = \r| DonoAtual               = \r| DonosAnteriores         = \r\r| Notas                   = \r| Curiosidades            = \r| Links                   = \r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": "https://vignette.wikia.nocookie.net/marvel/images/5/5a/Images_Button.png/revision/latest?cb=20180131200510&format=original&path-prefix=pt-br",
        "speedTip": "Inserir predefinição de galeria",
        "tagOpen": "{{Marvel Wiki:Galeria\r| TipoGaleria             = \r| DadosGaleria             = \r<gallery position=\"center\" captionalign=\"center\"> \r",
        "tagClose": "\r</gallery>\r| VejaTambém                 = \r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": 
        "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
        "speedTip": "Inserir predefinição de imagem",
        "tagOpen": "{{Marvel Wiki:Imagens\r| Licença                 = ",
        "tagClose": "\r| TipoDeImagem            = \r| Descrição               = \r| DescriçãoGaleria        = \r\r| Fonte                   = \r| Permissão               = \r| Edição                  = \r\r| Universo                = \r| Sujeito1                = \r| Sujeito2                = \r| Sujeito3                = \r| Sujeito4                = \r| Sujeito5                = \r\r| ArtistaCapa1            = \r| Desenhista1             = \r| Finalista1              = \r| Colorista1              = \r| Letrista1               = \r\r| Notas                   = \r| Curiosidades            = \r}}",
        "sampleText": ""} );

    mwCustomEditButtons.push( {
        "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
        "speedTip": "Inserir predefinição de raça",
        "tagOpen": "{{Marvel Wiki:Predefinição de Raça\r| Imagem                  = ",
        "tagClose": "\r| NomeCientífico          = \r| Nome                    = \r| OutrosNomes             = \r| NomesEditoriais         = \r| Identidade              = \r| Afiliação               = \r| Universo                = \r| BaseDeOperações         = \r\r| TipoDeCorpo             = \r| AlturaMédia             = \r| PesoMédio               = \r| Olhos                   = \r| Cabelo                  = \r| Pele                    = \r| NúmeroDeMembros         = \r| NúmeroDeDedos           = \r| NúmeroDeDedosDoPé       = \r| AdaptaçõesEspeciais     = \r| AtributosIncomuns       = \r\r| Origem                  = \r| GaláxiaDeOrigem         = \r| SistemaEstelarDeOrigem  = \r| PlanetaNatal            = \r| LocalDeNascimento       = \r| Criadores               = \r| Primeira                = \r\r| TextoDaHistória         = \r\r| Habitat                 = \r| Gravidade               = \r| Atmosfera               = \r| População               = \r\r| Poderes                 = \r| Habilidade              = \r| ForçaMédia              = \r| Fraquezas               = \r\r| TipoDeGoverno           = \r| NívelTecnológico        = \r| TraçosCulturais         = \r| Representantes          = \r\r| Notas                   = \r| Curiosidades            = \r| Links                   = }}",
        "sampleText": ""} );

    mwCustomEditButtons.push({
        "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
        "speedTip": "Inserir predefinição de realidade",
        "tagOpen": "{{Marvel Wiki:Realidades\r| Imagem                   = ",
        "tagClose": "\r| NúmeroTerra             = \r| Título                   = \r| OutrosNomes                 = \r| Estado                  = \r\r| Criadores                = \r| Primeira                   = \r\r| História                 = \r\r| Residentes               = \r| Notas                   = \r| Curiosidades                  = \r| Links                   = \r}}",
        "sampleText": ""
    });

    mwCustomEditButtons.push({
        "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/e/ee/Episode_Button.png",
        "speedTip": "Inserir predefinição de episódios",
        "tagOpen": "{{Marvel Wiki:Episódios\r| Imagem               = ",
        "tagClose": "\r| Mês               = \r| Ano                = \r\r| Diretor            = \r| Produtor1_1         = \r| Escritor1_1           = \r\r| Citação           = \r| PersonagemCitado             = \r\r| TítuloEpisódio        = \r| Sinopse            = \r\r| Aparições           = \r'''Personagens Principais:'''\r* <br/>\r'''Personagens Secundários:'''\r* <br/>\r'''Antagonistas:'''\r* <br/>\r'''Outros Personagens:'''\r* <br/>\r'''Locais:'''\r* <br/>\r'''Itens:'''\r* <br/>\r'''Veículos:'''\r* <br/>\r\r| Notas               = \r| Curiosidades              = \r| Recomendado         = \r| Links               = \r}}",
        "sampleText": ""
    });

    mwCustomEditButtons.push({
        "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png",
        "speedTip": "Inserir predefinição de funcionários",
        "tagOpen": "{{Marvel Wiki:Predefinição de Funcionários\r| Imagem                   = ",
        "tagClose": "\r| NomeReal                 = \r| Pseudônimos              = \r| Empregadores             = \r| Títulos                  = \r\r| Sexo                     = \r| AnoDeNascimento          = \r| MêsDeNascimento          = \r| DiaDeNascimento          = \r| CidadeDeNascimento       = \r| EstadoDeNascimento       = \r| PaísDeNascimento         = \r| Criações Notáveis        = \r| Primeira                 = \r\r| HistóriaPessoal          = \r| HistóriaProfissional     = \r\r| Notas                    = \r| Curiosidades             = \r| WebsiteOficial           = \r| Links                    = \r}}",
        "sampleText": ""
    });
}

/*//////////////////////////////////////////////////////////////////
// SpoilerAlert                                                   //
// documentation at: https://dev.wikia.com/wiki/SpoilerAlert      //
// © Peter Coester, 2012                                          //
//////////////////////////////////////////////////////////////////*/

(function() {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoilers', cats) !== -1,
        mature = $.inArray('Conteúdo Adulto', cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function() {
        return spoiler || mature;
    };
    if (mature && spoiler) {
        window.SpoilerAlert.question = 'Esta página pode conter spoilers sobre histórias ainda não lançadas ou recém-lançadas. Ela também possui conteúdo adulto, o qual pode não ser adequado para todos os usuários. Você está certo de que deseja a ler?';
    } else if (mature) {
        window.SpoilerAlert.question = 'Essa página pode conter conteúdo adulto que pode não ser adequado para todos usuários. Você tem certeza que deseja lê-la';
    } else if (spoiler) {
        window.SpoilerAlert.question = ' Esta página pode conter spoilers sobre histórias ainda não lançadas ou recém-lançadas. Você está certo de que deseja a ler?';
    }
}());

/**
 * SpoilerAlert
 * documentation at: https://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 *
 * __NOWYSIWYG__
 */
/*jshint curly:false jquery:true browser:true */

$(function() {
    "use strict";

    window.SpoilerAlert = (function(my, console, Math) {

        my = $.extend({
            question: 'Esta página contém spoilers. Você está certo de que deseja a ler?',
            yes: 'Sim, por favor',
            no: 'Não, ainda não',
            isSpoiler: function() {
                return (/^Spoiler\:/.test(document.title));
            },
            back: false
        }, my); // If my is undefined/null/not-object then jQuery will ignore it

        var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;

        var dialog =
            '<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
            '<tr>' +
            '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' +
            my.question +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
            '<button id="no">' + my.no + '</button>' +
            '</td>' +
            '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
            '<button id="yes">' + my.yes + '</button>' +
            '</td>' +
            '</tr>' +
            '</table>';

        function getBackgroundColor() {
            var color = $('#WikiaPageBackground').css('background-color');
            if ('transparent' !== color) return color;
            color = $('#WikiaPage').css('background-color');
            if ('transparent' !== color) return color;
            color = $('section.module', '#WikiaRail').css('background-color');
            if ('transparent' !== color) return color;
            console.log('SpoilerAlert: Cannot determine color');
            return color;
        }

        // Use LocalStorage, it doesn't get sent to the server every HTTP request
        var ids = $.storage.get('SpoilerAlertJS');
        // Backwards compatibility. This block can be removed after a week or so
        if (!ids) {
            ids = $.cookies.get('spoilers');
            if (ids) { // Old cookie found, convert to local storage
                ids = ids.split(',');
                $.cookies.del('spoilers', {
                    hoursToLive: 0,
                    path: '/',
                    domain: location.host
                });
                $.storage.set('SpoilerAlertJS', ids);
            } else {
                ids = [];
            }
        }
        if (my.isSpoiler() && -1 === $.inArray(wgArticleId, ids)) {
            var article = $('#WikiaArticle');
            var articleHeight = article.height();
            var dialogHeight;
            $('<div id="blackout">' + dialog + '</div>').prependTo(article).css({
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2000000001,
                backgroundColor: getBackgroundColor(),
                minHeight: (dialogHeight = $('#dialog').height())
            });
            var dialogPadding = 100;
            var topRelativeToWindow = Math.round(
                ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
            );
            var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
            console.log(
                'window.height: ', $(window).height(),
                ', WikiaArticle.offset.top: ', $('#WikiaArticle').offset().top,
                ', articleHeight:', articleHeight,
                ', dialogHeight:', dialogHeight,
                ', topRelativeToWindow:', topRelativeToWindow,
                ', topRelativeToArticle: ', topRelativeToArticle
            );
            $('#dialog').css({
                position: 'absolute',
                left: Math.round(($('#WikiaArticle').width() - $('#dialog').width()) / 2) + 'px',
                top: Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });
            $('#no').click(function() {
                $('#dialog').remove();
                if (my.back) {
                    if (history.length) {
                        history.back();
                    } else {
                        location.href = location.protocol + '//' + location.host;
                    }
                }
            });
            $('#yes').click(function() {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function() {
                    $(this).remove();
                });
                ids.push(wgArticleId);
                $.storage.set('SpoilerAlertJS', ids);
            });
        }

        return my;

    })(window.SpoilerAlert, window.console || {
        log: $.noop
    }, Math);
});

/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSIBLE
////////////////////////////////////////////////////////////////
*/

/* 
////////////////////////////////////////////////////////////////////
// SORTS THE FIRST SORTABLE TABLE BY THE SECOND COLUMN
////////////////////////////////////////////////////////////////////


sortables_init();
// sort the first sortable table; change [0] to sort other tables.
tab = document.getElementsByTagName("table")[0];
// sort by the first column; change [0] to sort by other columns.
hdr = tab.getElementsByTagName("th")[2];
// get the sort button link
lnk = hdr.getElementsByTagName("a")[0];
ts_resortTable(lnk);
*/

/* 
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/

/* addLoadEvent */
function addLoadEvent(func) {
    if (window.addEventListener)
        window.addEventListener("load", func, false);
    else if (window.attachEvent)
        window.attachEvent("onload", func);
}

/* addOnloadHook */
//use both names for it, for Wikipedia compatability (just in case)
function addOnloadHook(f) {
    addLoadEvent(f);
}

/* Cookies */

//Cookie helpers
function setCookie(cookieName, cookieValue) {
    var today = new Date();
    var expire = new Date();
    var nDays = 30;
    expire.setTime(today.getTime() + (3600000 * 24 * nDays));
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ";path=/w" +
        ";expires=" + expire.toGMTString();
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ";path=/wiki" +
        ";expires=" + expire.toGMTString();
}

function getCookie(cookieName) {
    var start = document.cookie.indexOf(cookieName + "=");
    if (start == -1) return "";
    var len = start + cookieName.length + 1;
    if ((!start) &&
        (cookieName != document.cookie.substring(0, cookieName.length))) {
        return "";
    }
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function deleteCookie(cookieName) {
    if (getCookie(cookieName)) {
        document.cookie = cookieName + "=" + ";path=/w" +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        document.cookie = cookieName + "=" + ";path=/wiki" +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}

/* //////////////////////////////////////////////////////////////
//                         SLIDERS                             //
///////////////////////////////////////////////////////////////*/
/* Sliders using jquery
 * By: [[User:Tierrie]], with modifications by [[User:Thailog]] and [[User:KettleMeetPot]]
 */
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: [{
                opacity: 'toggle',
                duration: 200
            }, {
                height: 'toggle',
                duration: 'normal'
            }, ]
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            var currentCl = $(this).prop('class');
            var workaround = $(this).children("a").prop('href');
            $(this).children("a").children("img").addClass("selectedImg");
            $(".selectedImg").animate({
                height: "90%",
                width: "90%"
            }, {
                duration: 50,
                queue: true
            });
            $(".selectedImg").animate({
                height: "100%",
                width: "100%"
            }, {
                duration: 150,
                queue: true,
                complete: function() {
                    $(".selectedImg").removeClass("selectedImg");
                    if (currentCl != "portal_sliderlink_28") {
                        $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
                    } else {
                        window.location.replace(workaround);
                    }
                }
            });
            return false;
        });
    });
});