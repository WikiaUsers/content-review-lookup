/* Spoiler */ 
SpoilerAlert = {
    question: 'Esta p�gina cont�m spoilers que revelaram o enredo da s�rie, deseja visualizar?',
    yes: 'Sim',
    no: 'N�o',
   'class': "spoiler",
    isSpoiler: function () {
        return Boolean($('#spoiler'));
    }
};

importScriptPage('SpoilerAlert/code.js', 'dev');