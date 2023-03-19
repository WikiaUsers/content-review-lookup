$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");

        for (var i = 0; i < spans.length; i++) {
            spans[i].innerHTML = wgUserName;
        }
    }
});

// AutoRefreshing //
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
        "speedTip": "Insertar infobox de personaje",
        "tagOpen": "{{Infobox Personaje \n|Nombre = ",
        "tagClose": "\n|Imagen = \n|Japonés = \n|Rōmaji = \n|Debutmanga = \n|Debutanime =  \n|Aparición = \n|Seiyū = \n|Edad = \n|Genero = \n|Especie = \n|Estado = \n|Altura = \n|Peso = \n|Rango = \n|Ocupación = \n|Clasificación = \n|Afiliación = \n|Familia = \n|Armas = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
        "speedTip": "Insertar infobox de episodio",
        "tagOpen": "{{Infobox Episodio \n|Episodio   = ",
        "tagClose": "\n|Imagen     = \n|Japonés      = \n|Rōmaji     = \n|Ingles     = \n|Numero     = \n|Manga      = \n|Japon      = \n|España     = \n|EE.UU      = \n|Anterior   = \n|Siguiente  = \n|Personajes = \n|Objetos    = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
        "speedTip": "Insertar infobox de capítulo",
        "tagOpen": "{{Infobox Capítulo \n|Nombre          = ",
        "tagClose": "\n|Imagen          = \n|Japonés           = \n|Rōmaji          = \n|Ingles          = \n|Número          = \n|Episodio        = \n|Páginas Totales = \n|Japón           = \n|Anterior        = \n|Siguiente       = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
        "speedTip": "Proponer que el artículo sea borrado",
        "tagOpen": "{{Borrar",
        "tagClose": "|Motivo}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
        "speedTip": "Insertar aviso de Esbozo",
        "tagOpen": "{{Esbozo",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
        "speedTip": "Insertar aviso de construyendo",
        "tagOpen": "{{Enobras",
        "tagClose": "|Usuario}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
        "speedTip": "Insertar aviso de Spoiler",
        "tagOpen": "{{Spoiler",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20130908155221/shingeki-no-kyojin/es/images/thumb/2/25/Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png/14px-Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png",
        "speedTip": "Insertar plantilla miembros Legión de Reconocimiento",
        "tagOpen": "{{Miembros de la Legión de Reconocimiento",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20130908155727/shingeki-no-kyojin/es/images/thumb/5/54/Emblema_de_las_Tropas_Estacionarias.png/20px-Emblema_de_las_Tropas_Estacionarias.png",
        "speedTip": "Insertar plantilla miembros Tropas Estacionarias",
        "tagOpen": "{{Miembros de las Tropas Estacionarias",
        "tagClose": "}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20130908155737/shingeki-no-kyojin/es/images/thumb/e/ee/Emblema_de_la_Polic%C3%ADa_Militar.png/16px-Emblema_de_la_Polic%C3%ADa_Militar.png",
        "speedTip": "Insertar plantilla miembros Policía Militar",
        "tagOpen": "{{Miembros de la Policía Militar",
        "tagClose": "}}",
        "sampleText": ""
    };
}

// Etiqueta Inactivo
window.InactiveUsers = {
    text: 'En el mundo exterior'
};

/* Código para eliminar los comentarios en las desambiguaciones gracias a BranDaniMB por desarrolarlo */
$(window).load(function() {
    if (mediaWiki.config.get('wgNamespaceNumber') === 0) {
        var Categories = mediaWiki.config.get('wgCategories');

        if (Categories.includes("Desambiguación")) {
            $('#article-comm').attr('disabled', 'disabled');
            $('#article-comm').attr('placeholder', 'Se han desactivado los comentarios para esta página.');
        }
    }
});

// Para la plantilla ImageMapHighlight

window.imagemap.hightlightfill = 'rgba(255, 255, 255)';