// ==========================================================================
// Start: Sample Hand
// Implements sample hand generation for deck articles
// Version 1.0.0
// Author: Aspallar
//
// ** Please dont edit this code directly in the wikia.
// ** Instead clone the git repository https://github.com/Aspallar/WikiaCharts
// ** and modify that, then copy your changes to the wikia.
// ** this file is the randomHand.js file in the Web\scripts folder.
// ** don't forget to push your changes to github.
//
// To develop this code locally you will need an addin for your browser that
// disables cross origin checking, and change apiParseCommandUrl() so that the correct
// absolute url for the target wikia is used.
//
// NOTE TO FANDOM CODE REVIEWERS
// This script inserts image tags into the page, but all of the images are internal to 
// the wikia, no external images are used.
// The only function that sets the src attribute of the img tags is ImageSource.setCardImageSource()
// which sets the image source from a cache if its already known and if not makes an
// ajax call to the MediaWiki API to parse a [[File:cardname.png|size=160px|link=]], and
// extracts the src from the returned json.
(function ($) {
    'use strict';
    /*global alert*/
    /*jshint curly: false, maxlen: 200 */

    // do nothing on articles with no random hand
    if (document.getElementById('mdw-random-hand') === null) {
        return;
    }

    function cardArticle(cardName) {
        var article = encodeURIComponent(cardName.replace(' ', '_'));
        return '/wiki/' + article;
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
            var card, index;
            do {
                index = Math.floor(Math.random() * this.cards.length);
                card = this.cards[index];
            } while (!card.available);
            card.available = false;
            this.cardsLeft--;
            return card;
        },
        drawCards: function (numCards) {
            var cards = [];
            for (var k = 0; k < numCards; k++)
                cards.push(this.drawCard());
            return cards;
        },
        scrapeFromPage: function () {
            var deck = [];
            var cardElements = $('div.div-col.columns.column-count.column-count-2 span.card-image-tooltip');
            cardElements.each(function () {
                var name = $(this).text();
                var amount = parseInt($.trim(this.previousSibling.textContent), 10);
                if (!isNaN(amount)) {
                    for (var k = 0; k < amount; k++)
                        deck.push(new DeckEntry(name));
                }
            });
            this.cards = deck;
            this.cardsLeft = deck.length;
            return this;
        }
    }; // End Deck

    function ImageSource() {
        var sourceCache = {};

        function apiParseCommandUrl(cardName) {
            var url = '/api.php?format=json&action=parse&disablepp=true&prop=text&text=%5B%5BFile%3A[[cardname]].png%7Csize%3D160px%7Clink%3D%5D%5D';
            url = url.replace('[[cardname]]', encodeURIComponent(cardName));
            if (location.protocol.lastIndexOf('http', 0) === -1) {
                // working locally in development, use absolute url
                url = 'http://magicduels.wikia.com' + url;
            }
            return url;
        }

        return {
            setCardImageSource: function (img, cardName) {
                var imageSource = sourceCache[cardName];
                if (imageSource !== undefined) {
                    img.attr('src', imageSource);
                    return;
                }
                var parseUrl = apiParseCommandUrl(cardName);
                $.getJSON(parseUrl, function (data) {
                    var text = data.parse.text['*'];
                    var sourceMatch = /src\s*=\s*"([^"]+)"/.exec(text);
                    sourceCache[cardName] = sourceMatch[1];
                    img.attr('src', sourceMatch[1]);
                });
            }
        };
    } // End ImageSource

    function CardPanel(xContainer, xTtooltip, xImageSource) {
        var container = xContainer;
        var tooltip = xTtooltip;
        var imageSource = xImageSource;

        var cardSize = {
            small: true,
            fullWidth: 223,
            fullHeight: 311,
            width: Math.floor(223 * 0.5),
            height: Math.floor(311 * 0.5),
            scale: function (percent) {
                var factor = percent / 100;
                this.width = Math.floor(this.fullWidth * factor);
                this.height = Math.floor(this.fullHeight * factor);
            }
        };

        function setTooltip(img) {
            if (cardSize.small) {
                img.mousemove(function (event) {
                    var spaceOnRight = window.innerWidth - event.pageX;
                    var xdelta = spaceOnRight > cardSize.fullWidth + 5 ? 20 : -cardSize.fullWidth - 20;
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
            var link = $('<a href="' + cardArticle(cardName) + '" target="_blank"><img /></a>');
            var img = link.find('img').attr('width', cardSize.width).attr('height', cardSize.height);
            setTooltip(img);
            imageSource.setCardImageSource(img, cardName);
            return link;
        }

        function update() {
            var images = container.find('img');
            images.each(function () {
                var $this = $(this);
                $this.attr('width', cardSize.width).attr('height', cardSize.height);
                setTooltip($this);
            });
        }

        return {
            add: function (card) {
                container.prepend(createCard(card.name));
            },
            addAll: function (cards) {
                var cardElements = document.createDocumentFragment();
                cards.forEach(function (card) {
                    var img = createCard(card.name);
                    cardElements.appendChild(img.get(0));
                });
                container.html(cardElements);
            },
            clear: function () {
                container.html('');
            },
            small: function () {
                return cardSize.small;
            },
            toggleSize: function () {
                cardSize.small = !cardSize.small;
                cardSize.scale(cardSize.small ? 50 : 100);
                update();
            }
        };
    } // End CardPanel

    function Controller(xCardPanel, xDeck) {
        var cardPanel = xCardPanel;
        var deck = xDeck;

        var randomHandButton = $('#mdw-random-hand-button');
        var imageSizeButton = $('#mdw-random-hand-image-size');
        var drawCardButton = $('#mdw-random-hand-draw-card');
        var clearButton = $('#mdw-random-hand-clear');
        var handOnlyButtons = [imageSizeButton, drawCardButton, clearButton];

        function setRandomHandButtonText(haveHand) {
            var text = haveHand ? 'New Hand' : 'Draw Sample Hand';
            randomHandButton.html(text);
        }

        function setImageSizeButtonText() {
            var text = cardPanel.small() ? 'Large Images' : 'Small Images';
            imageSizeButton.html(text);
        }

        function showHandOnlyButtons(show) {
            if (show) {
                handOnlyButtons.forEach(function (button) {
                    button.removeClass('mdw-hidden');
                });
            } else {
                handOnlyButtons.forEach(function (button) {
                    button.addClass('mdw-hidden');
                });
            }
        }

        function imageSizeButtonClick() {
            cardPanel.toggleSize();
            setImageSizeButtonText();
        }

        function drawCardClick() {
            if (deck.cardsLeft === 0) {
                alert('The deck is empty. There are no cards left to draw.');
                return;
            }
            cardPanel.add(deck.drawCard());
        }

        function clearClick() {
            cardPanel.clear();
            showHandOnlyButtons(false);
            setRandomHandButtonText(false);
        }

        function randomHandClick() {
            if (deck.cards.length < 7) {
                alert('There must be at least seven cards in a deck for a random hand.');
                return;
            }
            var hand = deck.shuffle().drawCards(7);
            cardPanel.addAll(hand);
            setRandomHandButtonText(true);
            setImageSizeButtonText();
            showHandOnlyButtons(true);
        }

        function wireButtonEvents() {
            randomHandButton.click(randomHandClick);
            imageSizeButton.click(imageSizeButtonClick);
            drawCardButton.click(drawCardClick);
            clearButton.click(clearClick);
        }

        return {
            start: function () {
                setRandomHandButtonText(false);
                wireButtonEvents();
                return this;
            }
        };
    } // End: Controller
    
    function tooltipElement() {
        return $('<img id="mdw-card-hover" class="mdw-card-hover" />').prependTo('body');
    }

    var controller;
    $(document).ready(function () {
        var deck = new Deck().scrapeFromPage();
        var cardPanel = new CardPanel($('#mdw-random-hand'), tooltipElement(), new ImageSource());
        controller = new Controller(cardPanel, deck).start();
    });
})(jQuery);
// End: Sample Hand
// ==========================================================================