void (function(mw, $, readArticle){
    readArticle = $.extend(true, readArticle, {
        speechSynthesis: window.speechSynthesis,
        mainTarget: $('.WikiaArticle .mw-content-text')
    });
    
    readArticle.voice = readArticle.speechSynthesis.getVoices()[0];
    readArticle.createUtterance = function(){
        var text = arguments[0], config = arguments[1] || {};
        if (readArticle.speechSynthesis.speaking){
            readArticle.speechSynthesis.cancel();
        }
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = readArticle.voice;
        readArticle.speak(utterance);
    };
    readArticle.mainTarget.on('select', function(event){
        if (event.shiftKey){
            var text = '';
            if (window.getSelection){
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != 'Control'){
                text = document.selection.createRange().text;
            }
            readArticle.createUtterance(text);
        }
    });
})(this.mediaWiki, this.jQuery, this.readArticle = this.readArticle || {});