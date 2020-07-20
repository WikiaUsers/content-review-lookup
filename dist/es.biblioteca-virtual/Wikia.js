/*SkinNotification: Muestra aviso permanente en la piel de Wikia. */
window.WikiNotification = {
    article: 'Prueba',
    key: 'WNotif',
    init: function() {
        if (!document.cookie || document.cookie.length === 0) return;
        var pref = $.cookies.get(WikiNotification.key);
        if (pref) return;
        WikiNotification.render();
    },
    render: function() {
        var tb = $('#WikiaFooter').children('div.toolbar');
        if (!tb.exists()) return;
        var nf = $('#WikiaNotifications');
        if (!nf.exists()) {
            tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
            nf = $('#WikiaNotifications');
            $(document.body).addClass('notifications');
        }
        var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Hola, Siéntase libre para editar o modificar los artículos, respetando las políticas de la {{SITENAME}}. ¡Edita! Si quieres realizar varias ediciones pero siempre con respeto y de buena fe. <a href="' + wgServer + wgArticlePath.replace('$1', WikiNotification.article.replace(/\s/g, '_')) + '" title="' + WikiNotification.article + '">Experimenta aquí</a>.</div></li>');
        nf.append(sn);
        sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
    },
    dismiss: function(e) {
        $(this).parents('li').eq(0).remove();
        $.cookies.set(WikiNotification.key, '1');
    }
};

$(WikiNotification.init);

importScriptPage('MediaWiki:Ratings.js');

/* Enlaces en la navegación de la cuenta */
$(function subeEnlacesUtiles() {
    $('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/' + encodeURIComponent(wgUserName) + '">Contribuciones</a></li>');
});

$(function() {
    if (document.location.href.indexOf('?action=edit&preload=Biblioteca_Virtual_de_Literatura_Wiki:Preload_') > -1) {
        alert("¡Después del ''='' escribe lo que corresponde en cada una de las línea de la plantilla!");
    }
});

// Mostrar div del creador del artículo
$(function() {
    if ($("body").hasClass("ns-0")) {
        $.ajax({
            'dataType': 'xml',
            'url': '/api.php?action=query&prop=revisions&titles=' + wgPageName + '&rvprop=user&rvlimit=1&rvdir=newer&format=xml',
            success: function(xml) {
                $(xml).find('page').each(function() {
                    var $entrada = $(this);
                    var usuario = $entrada.find('rev').attr('user');

                    if (usuario !== undefined) {
                        $(".WikiaPageHeader").addClass("cargado");
                        $(".WikiaPageHeader").append("<div class='divcreadorarticulo'><strong>Creador del artículo</strong>: <a id='creador-userlink' class='creadordelarticulo' href='/wiki/Usuario:" + usuario + "'>" + usuario + "</a> (<a id='creador-murolink' href='/wiki/Muro:" + usuario + "'>muro</a> | <a id='creador-contriblink' href='/wiki/Especial:Contribuciones/" + usuario + "'>contribuciones</a> <span class='admin'>| <a id='creador-bloquearlink' href='/wiki/Especial:Bloquear/" + usuario + "'>bloquear</a> | <a id='creador-registrolink' href='/wiki/Especial:Registro?user=" + usuario + "'>registro</a> | <a id='creador-delcontriblink' href='/wiki/Especial:ContribucionesBorradas/" + usuario + "'>contrib. borradas</a></span>)</div>");
                        $('<style type="text/css">.SpeechBubble[data-user="' + usuario + '"] blockquote { background:#FFFFAA !important; } .SpeechBubble[data-user="' + usuario + '"] .speech-bubble-message:after { border-color:transparent #FFFFAA #FFFFAA transparent; }</style>').appendTo('head');
                    }
                    if (usuario == wgUserName) {
                        $('.voteStar').removeAttr('onclick');
                        $('li.voteStar').removeAttr('onmouseover');
                        $('#ratingStars').removeAttr('onmouseout');
                        $('#ratingMsg').text('¡No puedes votar tus propios artículos!');
                    }
                });
            }
        });
    }
});

// Barra flotante
function barraFlotante() {
    $('.WikiaPage').after('<div class="navegador WikiaHeader"><div class="wikia-header-mask"><div class="page-width-container"><ul class="elementos"><li class="logo"></li><li class="titulo">Estás leyendo...<br /></li><li class="creador">Creador<br /><h1></h1></li><li class="facebook"><iframe src="//www.facebook.com/plugins/like.php?href=' + $(location).attr('href') + '&amp;width=100&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe></li><li class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-via="Bvliterat" data-lang="es" data-related="Bvliterat" data-hashtags="Bvliterat">Twittear</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></li><li class="ratingbar"></li></ul></div></div></div>');
    $('.WikiaPageHeader h1').clone().appendTo('li.titulo');
    $('h1.wordmark').clone().appendTo('li.logo');
    $('li.creador h1').text($('.creadordelarticulo').text());

    var offset = $('.divcreadorarticulo').offset();
    var altura = $('.divcreadorarticulo').height();
    var posicion = offset.top;
    var distancia = posicion + altura;
    $(window).scroll(function() {
        if ($(window).scrollTop() > distancia) {
            $('.navegador').fadeIn();
            $('#ratingBody').appendTo('.ratingbar');
        } else {
            $('.navegador').fadeOut('30');
            $('#ratingBody').appendTo('#votacion');
        }
    });

}

if (mw.config.get("wgNamespaceNumber") == "0") {
    addOnloadHook(barraFlotante);
}