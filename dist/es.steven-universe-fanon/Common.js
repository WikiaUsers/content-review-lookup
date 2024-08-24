/* Any JavaScript here will be loaded for all users on every page load. */

// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
            link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
            u: 'imagecontrol',
            link: 'Special:ListUsers/imagecontrol'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};

window.LockForums = {
    expiryDays: 15,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum"
};

window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];

// BOTONES DE EDICIÓN PERSONALIZADOS
// Esto esta basado en el código original: Wikipedia:Tools/Editing tools

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
        "speedTip": "Redirijir Articulo",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insertar texto"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/f/f0/BotonDegradado.png",
        "speedTip": "Insertar Degradado en Tablas",
        "tagOpen": " background:-moz-linear-gradient(top, COLOR ARRIBA 0%, COLOR ABAJO 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,COLOR ARRIBA), color-stop(100%,COLOR ABAJO)); ",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/0/0d/Box-shadow.png",
        "speedTip": "Insertar Sombra en Tablas",
        "tagOpen": "-moz-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA; -webkit-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA;",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/d/d3/En_construccion.png",
        "speedTip": "Advertir de que este articulo esta en contrucción",
        "tagOpen": "{{En construcción|",
        "tagClose": "}}",
        "sampleText": "Nick del usuario"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Texto Tachado",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Texto a tachar"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
        "speedTip": "Subrayar",
        "tagOpen": "<u>",
        "tagClose": "</u>",
        "sampleText": "Texto a Subrayar"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
        "speedTip": "texto Grande",
        "tagOpen": "<big>",
        "tagClose": "</big>",
        "sampleText": "Texto Grande"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
        "speedTip": "Texto Pequeño",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Texto Pequeño"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
        "speedTip": "Centrar",
        "tagOpen": "<center>",
        "tagClose": "</center>",
        "sampleText": "Centrar Texto"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
        "speedTip": "Plantilla",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Nombre de la Plantilla"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20081020123837/central/images/c/ce/Button_no_include.png",
        "speedTip": "No Incluir",
        "tagOpen": "<noinclude>",
        "tagClose": "</noinclude>",
        "sampleText": "No Incluir"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Espacio en Fuente",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/3/31/Mensaje_oculto.png",
        "speedTip": "Insertar Comentario Oculto",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comentario"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insertar tabla",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    };

}

$content.find('.video').each(function() {
    var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.data('width')),
        height = esc($this.data('height')),
        options = esc($this.data('options')),
        src = esc($this.data('src')),
        type = esc($this.data('type'));
    $this.html('<video width="' + width + '" height="' + height + '" ' + options + '><source src="' + src + '" type="' + type + '"></video>');
});