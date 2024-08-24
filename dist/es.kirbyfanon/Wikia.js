// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');

// Para las páginas de usuario
importScriptPage('SexyUserPage/code.js', 'dev');

// Primera parte - 10 backgrounds durante 1 hora
$(function () { 
var dia = new Date();
if (dia.getMinutes() < 12) { 
document.body.className += ' BG1'; 
}  
else if (dia.getMinutes() < 24) {
document.body.className += ' BG2';
}  
else if (dia.getMinutes() < 36) { 
document.body.className += ' BG3'; 
}  
else if (dia.getMinutes() < 48) { 
document.body.className += ' BG4'; 
}  
else if (dia.getMinutes() < 60) { 
document.body.className += ' BG5'; 
}  
}); 
// Fin primera parte