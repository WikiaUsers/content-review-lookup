/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Configuración de AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;

// Configuración de PageCreator
window.pageCreatorNamespaces = [0];

// Configuración de SES
window.dev = window.dev || {};

window.dev.editSummaries = {
    css: '#stdSummaries { ... }',
    select: [
        'Resúmenes',
        'Contenido', [
            'Creada',
            'Corrigiendo ortografía',
            'Añadiendo imágenes y/o vídeos',
            'Expandiendo',
            'Corrigiendo errores en el código'
         ],
         'Deshacer', [
            'Vandalismo',
            'Edición de prueba',
            'Editar sin permiso'
        ]
    ]
};

// Configuración de MessageBlock
var MessageBlock = {
    title : 'Has sido bloqueado',
    message : '{| border="0" cellpadding="0" cellspacing="0" width="100%"
|-
! style="background: red; border: 3px solid red;" colspan="2" | <big>Has sido bloqueado $2<br>Debido a $1</big>
|-
| style="background: black; color: white; text-align: center; width:50%;" | '''Si sientes que tu bloque fue injusto o una confusión, responde este hilo.'''



'''Recuerda que tu sexto bloqueo sera infinito.'''



'''En caso de que hayas sido bloqueado por ser menor de edad, estarás bloqueado hasta que cumplas 13 años.'''
| style="background: black; color: white; text-align: center; width:50%;" | '''Recuerda leer las [[Reglas de la Wiki]]'''



'''Puedes responder a este hilo para discutir sobre el bloqueo.'''



'''En caso de que no se sepa tu fecha de cumpleaños, especificala abajo (si eres menor de edad)'''
|}',
    autocheck : true
};

// Importaciones
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:Message/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:PageCreator/code2.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:WallGreetingButton/code.js'
    ]
});

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};