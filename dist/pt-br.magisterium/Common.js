/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

// Alerta de Spoilers e N�o Finalizados
SpoilerAlert = {
    question: 'ATEN��O! Essa p�gina pode conter grandes spoilers ou informa��es provis�rias que voc� pode<br />n�o querer ver. Tem certeza que deseja prosseguir para a p�gina?.',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');
 
//Pontua��o WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};