// tl;dr.
// this module loads an chibi on the bottom left of food soul pages, which will passively
// display voice lines. it's heavily based on the design of the cn/joyme wiki, but the
// code was written from scratch following their rough implementation.
 
// i've tried to comment this code as well as i can, but i'm also pretty rusty at js.
 
// this module should only be loaded on Food Soul pages.
if (mw.config.get('wgCategories').includes('Food Souls')) {
 
    var chibiDisplay = {
        // timer for switching between quotes - make sure to call window.clearTimeout()
        // on this to keep from memory leaking a bunch of timers!
        timer : null,
        // title of the page, which is also the food soul's name.
        title : mw.config.get('wgTitle'),
        // we store our lines as a map of { 'tag' : 'voice line' }.
        // these are populated in loadQuotes() and used most everywhere else.
        contentMap : {},
        // these are the pre-defined tags for the lines when someone clicks on the chibi.
        interactionReactionTags: [
            'Interaction 1',
            'Interaction 2',
            'Interaction 3'
        ],
        // these are the pre-defined tags for the lines we slowly rotate through.
        rotationReactionTags : [
            'Contract',
            'Log In',
            'Ice Arena',
            'Fatigue',
            'Recovering',
            'Team Formation',
            'Notice',
            'Idle 1',
            'Idle 2',
            'Idle 3',
            'Victory',
            'Defeat',
            'Feeding'
        ],
 
        // loadQuotes scrapes the DOM for food soul quotes and stores them into contentMap.
        loadQuotes : function() {
            // each tr in the voice lines table has the class 'voicelineslabel', so we simply
            // search for those.
            $('.voicelineslabel').each(function() {
                // careful: this is pretty fragile, so if you change up the voicelines
                // implementation, it might not be too happy.
                chibiDisplay.contentMap[$(this).children()[0].innerText] =
                    $(this).children()[1].innerText;
            });
            // now we add in the skins and their quotes.
            $('.skintable >tbody').each(function() {
                // we're looking for the .charaquotetext class in each one.
                // careful: this DOM parsing is really fragile.
                var skinName = $(this).children()[0].innerText;
                var skinQuote = $($(this).children()[1]).find('.charaquotetext').text();
                chibiDisplay.contentMap[skinName] = skinQuote; 
            });
        },
 
        // given a set of tags, shows a quote corresponding to a random one of those tags.
        tryShowQuote : function(tags) {
            var lines = tags.flatMap(function(tag) {
                if (tag in chibiDisplay.contentMap) {
                    return chibiDisplay.contentMap[tag];
                }
            });
            // if there are no corresponding quotes, then show one of the default rotation.
            if (lines.length === 0) {
                lines = chibiDisplay.rotationReactionTags;
            }
            $('#chibiviewertext').text(lines[Math.floor(Math.random() * lines.length)]);
            $('#chibiviewerbubble').fadeIn(750);
 
            window.clearTimeout(chibiDisplay.timer);
            chibiDisplay.timer = window.setTimeout(chibiDisplay.quietTime, 10000);
        },
 
        // create the DOM elements for the chibi + quote.
        initializeChibiViewer : function() {
            var chibiHolder = document.createElement('div');
            chibiHolder.setAttribute('class', 'chibiholder');
 
            var chibiImage = document.createElement('img');
            chibiImage.id = 'chibiviewerimage';
            chibiHolder.appendChild(chibiImage);
 
            var speechBubble = document.createElement('div');
            speechBubble.id = 'chibiviewerbubble';
            speechBubble.setAttribute('style', 'display:none;');
            chibiHolder.appendChild(speechBubble);
 
            var text = document.createElement('div');
            text.id = 'chibiviewertext';
            speechBubble.appendChild(text);
 
            document.body.appendChild(chibiHolder);
            chibiDisplay.updateChibi();
            chibiDisplay.tryShowQuote(['Log In']);
        },
 
        // we go back and forth (10s each) between 'rotateQuotes' (shows quotes)
        // and 'quietTime' (removes quotes).
        rotateQuotes : function() {
            chibiDisplay.tryShowQuote(chibiDisplay.rotationReactionTags);
        },
        quietTime : function() {
            $('#chibiviewerbubble').fadeOut(750);
            window.clearTimeout(chibiDisplay.timer);
            chibiDisplay.timer = window.setTimeout(chibiDisplay.rotateQuotes, 10000);
        },
 
        updateChibi : function(skinName) {
            var strrr = chibiDisplay.title;
            if (skinName) strrr += '-' + skinName;
            document.getElementById('chibiviewerimage').setAttribute('src',
                'https://food-fantasy.fandom.com/wiki/Special:FilePath/Sprite-'
                + strrr + '.png');
        },
    };
 
    chibiDisplay.loadQuotes();
    // only if we actually have quotes do we load the data.
    if (!$.isEmptyObject(chibiDisplay.contentMap)) {
        console.log(chibiDisplay.contentMap);
        chibiDisplay.initializeChibiViewer();
 
        // triggers
        // on-click, show the interaction quotes.
        $('#chibiviewerimage').click(function() {
            $('#chibiviewerbubble').fadeOut(750, function() {
                window.clearTimeout(chibiDisplay.timer);
                chibiDisplay.tryShowQuote(chibiDisplay.interactionReactionTags);
            });
 
        });
 
        // when the infobox selects a skin, switch to the skin quote + chibi.
        $('.portable-infobox').first().find('.pi-section-label').each(function() {
            var skinName = $(this).text().trim();
            switch (skinName) {
                case 'Basic':
                    $(this).click(function() {
                        chibiDisplay.updateChibi();
                        $('#chibiviewerbubble').fadeOut(750, function() {
                            chibiDisplay.tryShowQuote(['Log In']);
                        });
 
                    });
                    break;
                case 'Ascended':
                    $(this).click(function() {
                        chibiDisplay.updateChibi();
                        $('#chibiviewerbubble').fadeOut(750, function() {
                            chibiDisplay.tryShowQuote(['Ascend']);
                        });
 
                    });
                    break;
                default:
                    $(this).click(function() {
                        chibiDisplay.updateChibi(skinName);
                        $('#chibiviewerbubble').fadeOut(750, function() {
                            chibiDisplay.tryShowQuote([skinName]);
                        });
                    });
            }
        });
    }
}