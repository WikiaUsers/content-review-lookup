;(function($, mw, window, discussion, Hangman){
    var mwVars = mw.config.get(['wgPageName', 'wgUserName', 'wgUserGroups', 'skin', 'wgServer']),
        $hangman_html = $('<section class="hangman-wrapper"><header class="hangman-header"><h2>Hangman</h2><a href="javascript:void(0);" class="close-button"></a><div class="user-data" /></header><div class="hangman" /></section>').wrap('<div class="hangman-blackout"></div>'),
        $hangman_trigger = $('<div class="hangman-trigger">Hangman</div>'),
        Game = {
            init: function init(words){
                this.words = words;
                this.$html = $('.hangman');
                this.$msg = $('.hangman-message');
                this.$title = $('.hangman-title');
                this.$text = $('.hangman-txt');
                this.$restart = $('.hangman-restart');
                this._word = this.randomWord();
                this.correct = 0;
                this.$guess = $('.hangman-guess');
                this.$wrong = $('.hangman-wrong');
                this.winQuote = ['Awesome!', 'You Win', 'You won the game!', 'Fantastic, you won!', 'Good game', 'You\'re winner', 'Winner'];
                this.loseQuote = ['Awww, you lost', 'You Lose', 'Loser!!!!!', 'You suck', 'Better luck next time'];
                this.wrongGuesses = [];
                this.rightGuesses = [];
                this.tries = Hangman.MAX_TRIES || 5;
                this.$guessForm = $('.hangman-guess-form');
                this.$guessInput = $('.hangman-guess-letter');
                this.setup();
            },
            setup: function setup(){
                this.binding();
                this.showGuess(this.wrongGuesses);
                this.showWrong();
                $hangman_html.parent().show();
            },
            binding: function binding(){
                this.$guessForm.on('submit', $.proxy(this.guess, this));
                this.$restart.on('click', $.proxy(this.restart, this));
            },
            restart: function restart(event){
                event.preventDefault();
                this.reset();
            },
            guess: function guess(event){
                event.preventDefault();
                var _guess = this.$guessInput.val();
                if (_guess.match(/[a-zA-Z]|\s/) && _guess.length == 1){
                    if ($.inArray(_guess, this.wrongGuesses) > -1 || $.inArray(_guess, this.rightGuesses) > -1){
                        this.$guessInput.val('').focus();
                    }
                    else if (_guess){
                        var foundLetters = this.checkGuess(_guess);
                        if (foundLetters.length > 0){
                            this.setLetters(foundLetters);
                            this.$guessInput.val('').focus();
                        } else {
                            this.wrongGuesses.push(_guess);
                            if (this.wrongGuesses.length == this.tries){
                                this.lose();
                            } else {
                                this.showWrong(this.wrongGuesses);
                            }
                            this.$guessInput.val('').focus();
                        }
                    }
                    else {
                        this.$guessInput.val('').focus();
                    }
                }
            },
            randomWord: function randomWord(){
                var _randomWord = this.words[Math.floor(Math.random() * this.words.length)];
                return this.wordData(_randomWord);
            },
            showGuess: function showGuess(){
                var frag = '<ul class="hangman-word">';
                $.each(this._word.letters, function(index, val){
                    frag += '<li data-pos="' + index + '" class="hangman-letter letter">*</li>';
                });
                frag += '</ul>';
                this.$guess.html(frag);
            },
            showWrong: function showWrong(wrongGuesses){
                var frag;
                if (wrongGuesses){
                    frag = '<ul class="hangman-wrong-letters">';
                    $.each(wrongGuesses, function(index, val){
                        frag += '<li class="wrong-letter">' + val + '</li>';
                    });
                    frag += '</ul>';
                } else {
                    frag = '';
                }
                this.$wrong.html(frag);
            },
            checkGuesses: function checkGuesses(guessedLetter){
                var _ = this,
                    found = [];
                $.each(this._word.letters, function(index, val){
                    if (guessedLetter == val.letter.toLowerCase()){
                        found.push(val);
                        _.rightGuesses.push(val.letter);
                    }
                });
                return found;
            },
            setLetters: function setLetters(letters){
                var _ = this;
                _.correct = _.correct += letters.length;
                $.each(letters, function(index, val){
                    var letter = $('.letter[data-pos="' + index + '"]');
                    letter.html(val.letter);
                    letter.addClass('correct');
                    if (_.correct == _._word.letters.length)
                        _.win();
                });
            },
            wordData: function wordData(word){
                return {
                    letters: this._letters(word),
                    word: word.toLowerCase(),
                    totalLetters: word.length
                };
            },
            hideMsg: function hideMsg(){
                this.$msg.hide();
            },
            showMsg: function showMsg(){
                this.$msg.show();
            },
            _letters: function _letters(word){
                var letters = [];
                for(var i = 0; i<word.length; i++){
                    letters.push({
                        letter: word[i],
                        pos: i
                    });
                }
                return letters;
            },
            _rating: function _rating(){
                var right = this.rightGuesses.length,
                    wrong = this.wrongGuesses.length || 0,
                    rating = {
                        rating: Math.floor(( right / ( wrong + right )) * 100),
                        guesses: (right + wrong)
                    };
                return rating;
            },
            win: function win(){
                var rating = this._rating();
                this.$msgTitle.html(this.winQuote[Math.floor(Math.random() * this.winQuote.length)]);
                this.$msgText.html("You solved the word in <span class='highlight'>" + rating.guesses + "</span> guesses!<br>Score: <span class='highlight'>" + rating.rating + "%</span>");
                this.showMsg();
            },
            lose: function lose(){
                this.$msgTitle.html(this.loseQuote[Math.floor(Math.random() * this.winQuote.length)] + " The word was <span class='highlight'>"+ this._word.word +"</span>");
                this.$msgText.html("Don't worry, you'll get the next one!");
                this.showMsg();
            }
        },
        wordList = [];
    $.ajax({
        method: 'GET',
        dataType: 'text',
        url: mw.util.wikiScript('index'),
        data: {
            title: 'MediaWiki:Custom-hangman-words',
            action: 'raw'
        }
    }).success(function(data){
        var words = data.split(/\n/),
            i = 0;
        for (; i < words.length; i++){
            wordList[i] = words[i].toLowerCase();
        }
        Game.init(wordList);
    }).fail(function(){
        discussion.viewDiscussion.chatUL.append('<li class="inline-alert">Cannot start Hangman. Please try again later</li>');
    });
})(this.jQuery, this.mediaWiki, this.window, this.mainRoom, this.Hangman);