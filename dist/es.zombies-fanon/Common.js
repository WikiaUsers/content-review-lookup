/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

importScriptPage('ShowHide/code.js', 'dev');


// ************************************************** 
// A�ade nuevas etiquetas en los perfiles de los usuarios 
// ************************************************** 
window.UserTagsJS = { 
modules: {  
custom: { 
'Malapochka': ['jefe'], 
'Leoxen': ['lider'],
'KING_ZART': ['ally'],
'Nico_Glielmi': ['fundador'],
} 
}, 
tags: { 
jefe: {  
u:'Jefe de los Muertos', f:'Jefe de los Muertos', 
link:'User:Malapochka'  
}, 
lider: {  
u:'L�der de los Muertos', f:'L�der de los Muertos', 
link:'User:Leoxen'
},
ally: {
u:'L�der aliado', f:'L�der aliado', 
link:'User:KING_ZART'
},
fundador: {  
u:'Ex-Jefe de los Muertos', f:'Ex-Jefe de los Muertos', 
link:'User:Nico_Glielmi'
} 
}
};   
importArticles({ 
type: 'script', 
articles: [ 
'w:c:dev:UserTags/code.js' 
] 
});
window.railWAM = {
    logPage:"Project:WAM Log"
};
window.SpoilerAlertJS = {
    question: 'Esta lista contiene Spoilers, �De verdad quieres seguir?',
    yes: 'S�',
    no: 'No',
    fadeDelay: 1600
};