/* SpoilerAlert */
SpoilerAlert = {
  'class': "Spoiler",
}
SpoilerAlert = {
    question: 'Ta strona zawiera spoilery. Wchodzisz na własne ryzyko.',
    yes: 'Dawać je :)',
    no: 'No to spadam :(',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');