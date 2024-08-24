/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

// Alerta de Spoilers e Não Finalizados
SpoilerAlert = {
    question: 'ATENÇÃO! Essa página pode conter grandes spoilers ou informações provisórias que você pode<br />não querer ver. Tem certeza que deseja prosseguir para a página?.',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');
 
//Pontuação WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};