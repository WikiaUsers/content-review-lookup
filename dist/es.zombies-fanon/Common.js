/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScriptPage('ShowHide/code.js', 'dev');


// ************************************************** 
// Añade nuevas etiquetas en los perfiles de los usuarios 
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
u:'Líder de los Muertos', f:'Líder de los Muertos', 
link:'User:Leoxen'
},
ally: {
u:'Líder aliado', f:'Líder aliado', 
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
    question: 'Esta lista contiene Spoilers, ¿De verdad quieres seguir?',
    yes: 'Sí',
    no: 'No',
    fadeDelay: 1600
};