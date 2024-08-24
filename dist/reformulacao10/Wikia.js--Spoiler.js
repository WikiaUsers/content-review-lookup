/* Spoiler */ 
SpoilerAlert = {
    question: 'Esta página contêm spoilers que revelaram o enredo da série, deseja visualizar?',
    yes: 'Sim',
    no: 'Não',
   'class': "spoiler",
    isSpoiler: function () {
        return Boolean($('#spoiler'));
    }
};

importScriptPage('SpoilerAlert/code.js', 'dev');