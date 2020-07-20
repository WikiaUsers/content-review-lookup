/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Nombreusuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// Botones extra en modo fuente
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100405181713/dragonball/es/images/3/3c/BOTN_DB.png",
        "speedTip": "DB",
        "tagOpen": "Dragon Ball",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insertar una tabla",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
        "speedTip": "Plantillas",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "plantilla"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100617234549/dragonball/es/images/e/ee/Button_esbozo.png",
        "speedTip": "Esbozo",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Esbozo"
    };
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirigir",
		"tagOpen": "#REDIRECCIÓN [[",
		"tagClose": "]]",
		"sampleText": "Nombre del artículo"
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
        "speedTip": "Enlace a usuario",
        "tagOpen": "[[user:",
        "tagClose": "|]]",
        "sampleText": "usuario"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100617234550/dragonball/es/images/1/13/Button_personaje.png",
        "speedTip": "Insertar Plantilla de Personaje",
        "tagOpen": "\{\{Personaje\r|Nombre = ",
        "tagClose": "\r|nombre-ja = \r|nombre-ja_latino = \r|imagen = \r| comentario_imagen = \r|sexo = \r|edad = \r| transformaciones = \r|raza   = \r|ocupación = \r|procedencia = \r|familia = \r|saga = \r|Primera aparición = \r\}\}",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
        "speedTip": "Categoría",
        "tagOpen": "[[Category:",
        "tagClose": "|{" + "{PAGENAME}}]]",
        "sampleText": "Nombre categoría"
    };
    
}
 
// Ajax RC
window.AjaxRCRefreshText = 'Actividad automatizada';
window.AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:PáginasNuevas",
    "Especial:Seguimiento"
];

// Mostrar IP de anónimos para usuarios con ciertos permisos
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'content-moderator']
};

/* Desactivación del botón de edición de los temas del foro antiguos /*
Adaptado de Uncyclopedia, autor original: Spang */
$(function ArchivarTemaForo() {
    if (typeof(ActivarForoArchivado) != 'undefined' && ActivarForoArchivado) return;
    if (!document.getElementById('ca-edit') || !document.getElementById('ForoArchivado') ) return;
    editLink = document.getElementById('ca-edit').firstChild;
    editLink.removeAttribute('href', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'no edites';
});
 
// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
    'summary': '...',
    'accesskey': '1',
    'label': 'Otra razón'
};
fdButtons[fdButtons.length] = {
    'summary': 'El contenido de este artículo no se relacionaba al tema de la comunidad',
    'accesskey': '1',
    'label': 'Sin relación'
};
fdButtons[fdButtons.length] = {
    'summary': 'El artículo era considerado spam',
    'accesskey': '2',
    'label': 'Spam'
};
fdButtons[fdButtons.length] = {
    'summary': 'Su creación fue un acto vandálico',
    'accesskey': '3',
    'label': 'Vandalismo'
};
fdButtons[fdButtons.length] = {
    'summary': 'El contenido no era preciso, y podía tratarse de simples especulaciones',
    'accesskey': '4',
    'label': 'Mentiras'
};
fdButtons[fdButtons.length] = {
    'summary': 'El contenido era fanon. Para publicar fan-fics véase [[w:c:es.stargatefanart|la comunidad fanon]]',
    'accesskey': '5',
    'label': 'Fanon'
};
fdButtons[fdButtons.length] = {
    'summary': 'El artículo era excesivamente corto. Puedes crear este artículo siempre y cuando tenga la información suficiente.',
    'accesskey': '6',
    'label': 'Infra-esbozo'
};
fdButtons[fdButtons.length] = {
    'summary': 'El contenido de este artículo es repetido.',
    'accesskey': '1',
    'label': 'Artículo repetido'
};
fdButtons[fdButtons.length] = {
    'summary': 'El contenido es irrelevante para el wiki.',
    'accesskey': '1',
    'label': 'Irrelevante'
};

importArticle({type: 'script', article: 'w:c:pintorsmeargle:MediaWiki:Common.js/borradoRápido.js'});

// Usuarios inactivos
window.InactiveUsers = { text: 'En el otro mundo' };


// Plantilla:MPC
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            playertype = esc('' + $this.data('playertype')),
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay')),
            args = esc('' + $this.data('args'));
 
        if ( id === '' ) {
            return;
        }
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>');
    });
});
$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});


// Versión moderna de BackToTopButton
window.BackToTopModern = true;