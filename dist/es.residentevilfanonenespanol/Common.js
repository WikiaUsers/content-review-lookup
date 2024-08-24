/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// Configuraci�n de AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;

// Configuraci�n de PageCreator
window.pageCreatorNamespaces = [0];

// Configuraci�n de SES
window.dev = window.dev || {};

window.dev.editSummaries = {
    css: '#stdSummaries { ... }',
    select: [
        'Res�menes',
        'Contenido', [
            'Creada',
            'Corrigiendo ortograf�a',
            'A�adiendo im�genes y/o v�deos',
            'Expandiendo',
            'Corrigiendo errores en el c�digo'
         ],
         'Deshacer', [
            'Vandalismo',
            'Edici�n de prueba',
            'Editar sin permiso'
        ]
    ]
};

// Configuraci�n de MessageBlock
var MessageBlock = {
    title : 'Has sido bloqueado',
    message : '{| border="0" cellpadding="0" cellspacing="0" width="100%"
|-
! style="background: red; border: 3px solid red;" colspan="2" | <big>Has sido bloqueado $2<br>Debido a $1</big>
|-
| style="background: black; color: white; text-align: center; width:50%;" | '''Si sientes que tu bloque fue injusto o una confusi�n, responde este hilo.'''



'''Recuerda que tu sexto bloqueo sera infinito.'''



'''En caso de que hayas sido bloqueado por ser menor de edad, estar�s bloqueado hasta que cumplas 13 a�os.'''
| style="background: black; color: white; text-align: center; width:50%;" | '''Recuerda leer las [[Reglas de la Wiki]]'''



'''Puedes responder a este hilo para discutir sobre el bloqueo.'''



'''En caso de que no se sepa tu fecha de cumplea�os, especificala abajo (si eres menor de edad)'''
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