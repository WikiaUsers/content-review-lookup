// <nowiki>
// ==========================================================================
// Sample Hand
// Implements sample hand generation for deck articles
// Version 1.5.0
// Author: Aspallar
//
// ** Please dont edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
// ** this file is the sampleHand.js file in the src\Web\wikiscripts folder.
(function ($) {
    /*global mw */
    'use strict';

    // do nothing on articles with no random hand or this version is disabled on page
    if (document.getElementById('mdw-random-hand') === null ||
            $('#mdw-disabled-js').attr('data-samplehand-1-5-0')) {
        return;
    }

    function adjustName(name) {
        var pos = name.indexOf('//');
        return pos === -1 ? name : name.substring(0, pos - 1);
    }

    function DeckEntry(name) {
        this.name = name;
        this.available = true;
    }

    function Deck() {
        this.cards = []; // array of DeckEntry
        this.cardsLeft = 0;
    }

    Deck.prototype = {
        constructor: Deck,
        shuffle: function () {
            this.cards.forEach(function (card) {
                card.available = true;
            });
            this.cardsLeft = this.cards.length;
            return this;
        },
        drawCard: function () {
            var randomAvailable = Math.floor(Math.random() * this.cardsLeft),
                availableCount = 0;
            for (var k = 0, l = this.cards.length; k < l; k++) {
                var card = this.cards[k];
                if (card.available) {
                    if (availableCount === randomAvailable) {
                        --this.cardsLeft;
                        card.available = false;
                        return card;
                    }
                    ++availableCount;
                }
            }
        },
        drawCards: function (numCards) {
            var cards = [];
            for (var k = 0; k < numCards; k++)
                cards.push(this.drawCard());
            cards.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return cards;
        },
        initialize: function (dataString) {
            var deck = [];
            try {
                var data = JSON.parse(dataString);
                data.forEach(function (entry) {
                    if (!entry.isCmd && !entry.isCmp) {
                        var adjustedName = adjustName(entry.name);
                        for (var k = 0; k < entry.num; k++)
                            deck.push(new DeckEntry(adjustedName));
                    }
                });
            } catch (error) {
                console.log('sampleHand.js Deck:init() error parsing deck data\n' + error);
            }
            this.cards = deck;
            this.cardsLeft = deck.length;
            return this;
        }
    }; // End Deck

    function ImageSource() {
        var sourceCache = Object.create(null),
            pending = Object.create(null),
            api = new mw.Api();

        return {
            setCardImageSource: function (img, cardName) {
                var imageSource = sourceCache[cardName];
                if (imageSource !== undefined) {
                    img.attr('src', imageSource);
                    return;
                }
                img.attr('src', 'https://vignette.wikia.nocookie.net/magicarena/images/1/19/Cardback.png/revision/latest?cb=20171013170540');
                if (pending[cardName] === undefined) {
                    pending[cardName] = [img];
                    api.get({
                        action: 'parse',
                        disablepp: 1,
                        prop: 'text',
                        text: '[[File:' + cardName + '.png|223px|link=]]',
                    }).done(function (data) {
                        var text = data.parse.text['*'],
                            imageUrl = /src\s*=\s*"([^"]+)"/.exec(text)[1];
                        sourceCache[cardName] = imageUrl;
                        pending[cardName].forEach(function (cardImage) {
                            cardImage.attr('src', imageUrl);
                        });
                        delete pending[cardName];
                    });
                } else {
                    pending[cardName].push(img);
                }
            }
        };
    } // End ImageSource

    function CardPanel(container, tooltip, imageSource) {
        var smallImages = true,
            cardWidth = tooltip.width();

        function setTooltip() {
            /*jshint -W040 */ // allow old school jquery use of this
            var img = $(this);
            if (smallImages) {
                img.mousemove(function (event) {
                    var spaceOnRight = window.innerWidth - event.pageX;
                    var xdelta = spaceOnRight > cardWidth + 5 ? 20 : -cardWidth - 20;
                    var left = event.pageX + xdelta;
                    var top = event.pageY - 240;
                    tooltip.css({ top: top, left: left }).show();
                }).mouseout(function () {
                    tooltip.hide();
                }).mouseenter(function () {
                    tooltip.attr('src', $(this).attr('src'));
                });
            } else {
                img.off('mousemove mouseout mouseenter');
            }
        }

        function createCard(cardName) {
            var img = $('<img>').addClass('mdw-cardimg');
            if (smallImages) img.addClass('mdw-cardimg-small').each(setTooltip);
            var link = $('<a>', {href: mw.util.getUrl(cardName), target: '_blank'}).html(img);
            imageSource.setCardImageSource(img, cardName);
            return link;
        }

        return {
            add: function (card) {
                container.prepend(createCard(card.name));
            },
            addAll: function (cards) {
                var cardElements = $(document.createDocumentFragment());
                cards.forEach(function (card) {
                    cardElements.append(createCard(card.name));
                });
                container.html(cardElements);
            },
            clear: function () {
                container.empty();
                container.addClass('mdw-hidden');
            },
            toggleSize: function () {
                smallImages = !smallImages;
                container.find('img').toggleClass('mdw-cardimg-small').each(setTooltip);
            },
            show : function () {
                container.removeClass('mdw-hidden');
            }
        };
    } // End CardPanel

    function Controller(cardPanel, deck) {
        var randomHandButton = $('#mdw-random-hand-button'),
            imageSizeButton = $('#mdw-random-hand-image-size'),
            drawCardButton = $('#mdw-random-hand-draw-card'),
            clearButton = $('#mdw-random-hand-clear'),
            mulliganButton = $('#mdw-random-hand-mulligan'),
            handOnlyButtons = $(imageSizeButton).add(drawCardButton).add(clearButton).add(mulliganButton),
            handSize;

        function showMessage(msg) {
            $('#mdw-random-hand-message').text(msg);
        }

        function setRandomHandButtonText(haveHand) {
            var text = haveHand ? 'New Hand' : 'Draw Sample Hand';
            randomHandButton.attr('value', text);
        }

        function toggleImageSizeButtonText() {
            imageSizeButton.val(imageSizeButton.val() === 'Large Images' ? 'Small Images' : 'Large Images');
        }

        function updateUi() {
            if (deck.cards.length < 7) {
                showMessage('There must be at least 7 cards in a deck for a sample hand.');
                randomHandButton.prop('disabled', true);
                return;
            }
            if (deck.cardsLeft === 0) {
                showMessage('The library is empty.');
                drawCardButton.prop('disabled', true);
                return;
            }
            showMessage('');
            drawCardButton.prop('disabled', false);
        }

        function showHandOnlyButtons(show) {
            if (show)
                handOnlyButtons.removeClass('mdw-hidden');
            else
                handOnlyButtons.addClass('mdw-hidden');
        }

        function newHand() {
            var hand = deck.shuffle().drawCards(handSize);
            cardPanel.addAll(hand);
            cardPanel.show();
            setRandomHandButtonText(true);
            showHandOnlyButtons(true);
            updateUi();
        }

        function imageSizeButtonClick() {
            cardPanel.toggleSize();
            toggleImageSizeButtonText();
        }

        function drawCardClick() {
            cardPanel.add(deck.drawCard());
            mulliganButton.prop('disabled', true);
            updateUi();
        }

        function clearClick() {
            cardPanel.clear();
            deck.shuffle();
            showHandOnlyButtons(false);
            setRandomHandButtonText(false);
            updateUi();
        }

        function randomHandClick() {
            handSize = 7;
            mulliganButton.prop('disabled', false);
            newHand();
        }

        function mulliganClick() {
            if (--handSize < 2)
                mulliganButton.prop('disabled', true);
            newHand();
        }

        function wireButtonEvents() {
            randomHandButton.click(randomHandClick);
            imageSizeButton.click(imageSizeButtonClick);
            drawCardButton.click(drawCardClick);
            clearButton.click(clearClick);
            mulliganButton.click(mulliganClick);
        }

        return {
            start: function () {
                setRandomHandButtonText(false);
                wireButtonEvents();
                updateUi();
                return this;
            }
        };
    } // End: Controller
    
    function tooltipElement() {
        return $('<img id="mdw-card-hover" class="mdw-cardimg mdw-card-hover" />').prependTo('body');
    }

    function cardSection() {
        var sampleHandDiv = $('<div id="mdw-random-hand" class="mdw-hidden"></div>'),
            sampleHandContents = $(document.createDocumentFragment())
            .append('<input type="button" id="mdw-random-hand-button" value="Sample Hand" />&nbsp;')
            .append('<input type="button" id="mdw-random-hand-mulligan" class="mdw-hidden" value="Mulligan" />&nbsp;')
            .append('<input type="button" id="mdw-random-hand-image-size" class="mdw-hidden" value="Large Images" />&nbsp;')
            .append('<input type="button" id="mdw-random-hand-draw-card" class="mdw-hidden" value="Draw Card" />&nbsp;')
            .append('<input type="button" id="mdw-random-hand-clear" class="mdw-hidden" value="Clear" />&nbsp;')
            .append('<span id="mdw-random-hand-message"></span>')
            .append(sampleHandDiv);
        $('#mdw-random-hand-section').html(sampleHandContents); 
        return sampleHandDiv;
    }

    var controller;
    $(function () {
        mw.loader.using('mediawiki.api').then(function() {
            var deck = new Deck().initialize($('#mdw-chartdata-pre').text());
            var cardPanel = new CardPanel(cardSection(), tooltipElement(), new ImageSource());
            controller = new Controller(cardPanel, deck).start();
        });
    });
})(jQuery);