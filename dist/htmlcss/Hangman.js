(function($, mw){
    function Hangman(){
        this.topic = '';
        this.word = '';
        this.themes = ['White', 'Black'];
        this.currentWord = '';
    }
    
    Hangman.prototype.getWords = function(){
        var words = [];
        $.get('/index.php?title=MediaWiki:Custom-hangman-phrases&action=raw')
         .done(function(data){
             var d = data.split(/\n/g);
             for (var i = 0; i < d.length; i++){
                 var topic = d[i].split(/\|/g)[0],
                     word = d[i].split(/\|/g)[1];
                 words[words.length] = {
                     topic: topic,
                     word: word
                 };
             }
         })
         .fail(function(error){
             console.log(error);
         });
        if (words.length) return words;
    };
    
    Hangman.prototype.beginGame = function(){
        var words = this.getWords(),
            $hangman = $('<section />'),
            $letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        $hangman.addClass('HangmanGame hangman game').html([
            $('<div />').addClass('Hangman-interface interface'),
            $('<div />').addClass('Hangman-letters letters')
        ]);
        
        for (var i = 0; i < $letters.length; i++){
            var $letter = $letters[i],
                $letter_html = $('<a href="#" />').text($letters[i]).addClass('Hangman-letter letter');
            $hangman.find('.Hangman-letters').append($letter_html);
        }
    };
})(this.jQuery, this.mediaWiki);