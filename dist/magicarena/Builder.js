// ==========================================================================
// Implements a deck builder/editor to allow users to edit deck definitions
// without having to edit wikitext
//
// Version 1.7.0
// Author: Aspallar
//
// Beta early prototype release.
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    'use strict';
    /*global mw, magicArena, tooltips, _ */ 

    if (document.getElementById('mdw-deck-builder') === null || $('#mdw-disabled-js').attr('data-builder-1-7-0'))
        return;

    var globalNavHeight;
    var deckPage;
    var allCards;
    var throbber;
    var deck;
    var cardHover;
    var imageSource;

    function hideCardHover() {
        cardHover.hide();
    }

    function closeCardNameAutocomplete() {
        $('#mdw-db-cardname').autocomplete('close');
    }

    function Card(descriptor) {
        var pos = descriptor.indexOf('|');
        this.name = descriptor.substring(0, pos);
        this.colorAndLand = descriptor.substring(pos + 1);
    }

    function Throbber() {
        var ajaxLoaderImgSrc = mw.config.get('stylepath') + '/common/images/ajax-loader.gif';
        this.throbber = $('<div>', {
            css: {
                background: 'rgba(255, 255, 255, 0.5)',
                position: 'fixed',
                height: '100%',
                width: '100%',
                left: '0',
                top: '0',
                'z-index': '1000000000'
            },
            html: $('<img>', {src: ajaxLoaderImgSrc, class: 'mdw-centered'})
        });
    }

    Throbber.prototype = {
        constructor: Throbber,
        show: function () { this.throbber.appendTo(document.body); },
        hide: function () { this.throbber.remove(); }
    }; // end Throbber

    function CardData(data) {

        function makeCardData(dataString) {
            var data = [];
            dataString.split('\n').forEach(function (cardDescriptor) {
                if (cardDescriptor.length > 0)
                    data.push(new Card(cardDescriptor));
            });
            data.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            return data;
        }

        function makeCardNames(cards) {
            var cardNames = {};
            cards.forEach(function (card) {
                cardNames[card.name.toLowerCase()] = card.name;
            });
            return cardNames;
        }

        this.cards = makeCardData(data);
        this.names = makeCardNames(this.cards);
    }

    CardData.prototype = {
        constructor: CardData,
        getCasedName: function(name) {
            return this.names[name.toLowerCase()];
        },
        isLand: function(name) {
            var card = this.cards.find(function (card) {return card.name === name; });
            return card ? card.colorAndLand === 'L' : true;
        },
        getNames: function(filter) {
            var names = [];
            if (filter === null) {
                this.cards.forEach(function (card) {
                    names.push(card.name);
                });
            } else if (filter.length !== 0) {
                var filterMatcher = new RegExp('[' + filter + ']');
                this.cards.forEach(function (card) {
                    if (filterMatcher.test(card.colorAndLand))
                        names.push(card.name);
                });
            }
            return names;
        }
    }; // end CardData


    function ImageSource() {
        var sourceCache = {};
        var latestCardName;

        function parseUrl(cardName) {
            return '/api.php?format=json&action=parse&disablepp=true&prop=text&text=%5B%5BFile%3A[[cardname]].png%7C223px%7Clink%3D%5D%5D'
                .replace('[[cardname]]', encodeURIComponent(cardName));
        }

        return {
            setCardImageSource: function (img, cardName) {
                var imageSource = sourceCache[cardName];
                if (imageSource !== undefined) {
                    img.attr('src', imageSource);
                    return;
                }
                latestCardName = cardName;
                img.attr('src', 'https://vignette.wikia.nocookie.net/magicarena/images/1/19/Cardback.png/revision/latest?cb=20171013170540');
                $.getJSON(parseUrl(cardName), function (data) {
                    var text = data.parse.text['*'];
                    var sourceMatch = /src\s*=\s*"([^"]+)"/.exec(text);
                    sourceCache[cardName] = sourceMatch[1];
                    if (cardName === latestCardName)
                        img.attr('src', sourceMatch[1]);
                });
            }
        };
    } // End ImageSource


    function CardPanel(container, countElement, badCheck) {
        /*jshint -W003*/ // used before defined
        var cards = {};
        var listElement = container.find('ul');
        var hovering = false;

        function removeCard(name) {
            if (cards[name] !== undefined)
                delete cards[name];
        }

        function getCardName(element) {
            return $(element).parent().attr('data-card');
        }

        function updateCount() {
            var count = Object.values(cards).reduce(function (a, v) { return a + v; }, 0);
            countElement.html(count);
            if (badCheck(count))
                countElement.addClass('mdw-db-bad');
            else
                countElement.removeClass('mdw-db-bad');
            countElement.change();
        }

        function onClickRemoveDeckEntry() {
            /*jshint -W040 */ // allow old school jquery this
            hideCardHover();
            removeCard(getCardName(this));
            drawAll();
        }

        function onClickAddOne() {
            /*jshint -W040 */ // allow old school jquery this
            var name = getCardName(this);
            ++cards[name];
            drawOne(this, name);
        }

        function onClickRemoveOne() {
            /*jshint -W040 */ // allow old school jquery this
            var name = getCardName(this);
            if (--cards[name] <= 0) {
                removeCard(name);
                drawAll();
                hideCardHover();
            } else {
                drawOne(this, name);
            }
        }

        var showCardImage = _.debounce(function(cardElement) {
            if (hovering) {
                var cardName = cardElement.attr('data-card');
                var offset = cardElement.offset();
                cardHover.css({top: offset.top, left: offset.left - 223, display: 'block'});
                imageSource.setCardImageSource(cardHover, cardName);
            }
        }, 200);

        function onHoverCardEntry() {
            /*jshint -W040 */ // allow old school jquery this
            closeCardNameAutocomplete();
            hovering = true;
            showCardImage($(this));
        }

        function onEndHoverCardEntry() {
            hovering = false;
            hideCardHover();
        }

        function renderCardEntry(amount, card) {
            var close = $('<span class="mdw-db-removeall" title="Remove all">&times;</span>')
                .click(onClickRemoveDeckEntry);
            var minus = $('<span class="mdw-db-minus" title="Remove one">&minus;</span>')
                .attr('data-card', card)
                .click(onClickRemoveOne);
            var plus = $('<span class="mdw-db-plus" title="Add one">&#43;</span>')
                .attr('data-card', card)
                .click(onClickAddOne);
            var cardLink = $('<a>')
                .attr('href', mw.util.getUrl(card))
                .attr('target', '_blank')
                .text(card);
            var entry = $('<li>')
                .html(amount + ' ')
                .attr('data-card', card)
                .append(cardLink)
                .append(plus)
                .append(minus)
                .append(close)
                .hover(onHoverCardEntry, onEndHoverCardEntry);
            return entry;
        }

        function renderCardList() {
            var rendered = $(document.createDocumentFragment());
            Object.keys(cards).forEach(function (card) {
                rendered.append(renderCardEntry(cards[card], card));
            });
            return rendered;
        }

        function drawOne(element, card) {
            $(element).parent().replaceWith(renderCardEntry(cards[card], card));
            updateCount();
        }

        function drawAll() {
            var renderedList = renderCardList();
            listElement.html(renderedList);
            updateCount();
        }
       
        function addCards(name, amount) {
            if (cards[name] !== undefined)
                cards[name] += amount;
            else
                cards[name] = amount;
            drawAll();
            updateCount();
        }

        function isEmpty() {
            return $.isEmptyObject(cards);
        }

        function setCards(newCards){
            cards = newCards;
        }

        function text() {
            var listText = '';
            Object.keys(cards).forEach(function (card) {
                listText += cards[card] + ' ' + card + '\n';
            });
            return listText;
        }

        function hasNonLands() {
            return Object.keys(cards).some(function (name) {
                return !allCards.isLand(name);
            });
        }

        return {
            addCards: addCards,
            isEmpty: isEmpty,
            draw: drawAll,
            setCards: setCards,
            text: text,
            hasNonLands: hasNonLands
        };

    } // end CardList

    function Deck() {
        /*jshint -W003*/ // used before defined
        var deckCards = new CardPanel($('#mdw-db-decktab'), $('#mdw-db-deckcount').change(updateUi), function(count) {
            return count < 60;
        });
        var sideboardCards = new CardPanel($('#mdw-db-sidetab'), $('#mdw-db-sidecount').change(updateUi), function(count) {
            return count > 15;
        });
        var active = deckCards;
        var isNewDeck = true;

        function updateUi() {
            $('#mdw-db-savedeck').prop('disabled', deckCards.isEmpty() && sideboardCards.isEmpty());
        }

        return {
            activate: function(what) {
                switch (what) {
                    case 'deck': active = deckCards; break;
                    case 'sideboard': active = sideboardCards; break;
                    default: throw('Invalid parameter value');
                }
            },
            addCards: function (name, amount) {
                active.addCards(name, amount);
            },
            setDeck: function (cards) {
                deckCards.setCards(cards);
            },
            setSideboard: function (cards) {
                sideboardCards.setCards(cards);
            },
            drawAll: function () {
                deckCards.draw();
                sideboardCards.draw();
            },
            getText: function () {
                var text = '\n';
                if (this.commander)
                    text += 'Commander\n' + this.commander + '\n' + 'Deck\n';
                text += deckCards.text();
                if (!sideboardCards.isEmpty())
                    text += '---- sideboard ----\n' + sideboardCards.text();
                return text;
            },
            isNew: function () {
                return isNewDeck;
            },
            setNew: function (isNew) {
                isNewDeck = isNew;
            },
            deckHasNonLands: function() {
                // TODO: replace this hack once data restructure done.
                return deckCards.hasNonLands();
            }
        };
    } // end deck

    function fatalError(message) {
        $('#mdw-deck-builder').hide();
        $('#mdw-db-errormessage').text(message);
        $('#mdw-db-fatal-error').show();
    }

    function removeIncludes(contents) {
        return contents.replace(/<[\/]?noinclude>|<[\/]?includeonly>/g, '');
    }

    function adjustName(name) {
        var pos = name.indexOf('//');
        return pos === -1 ? name : name.substring(0, pos - 1);
    }

    function parseCardEntry(entry) {
        var match = /^\s*(\d+)\s+(.+?)(?= \/\/\/| \(|\s*$)/.exec(entry);
        if (match) {
            var amount = parseInt(match[1], 10);
            var casedName = allCards.getCasedName(adjustName(match[2]));
            var name = casedName !== undefined ? casedName : mw.html.escape(match[2]);
            return { amount: amount, name: name };
        } else {
            return null;
        }
    }

    function extractDeckText(content) {
        var startPos = content.indexOf('|Deck=');
        if (startPos === -1)
            return null;
        var endPos = content.indexOf('}}', startPos);
        if (endPos === -1)
            return null;
        startPos += 6;
        if (startPos >= endPos)
            return null;
        var deckText = content.substring(startPos, endPos);
        return deckText.trim();
    }

    function showError(message, targetId) {
        $('#' + targetId).text('* ' + message);
    }

    function resetErrors() {
        $('.mdw-error').html('');
    }

    function wikiApiCall(data, method) {
        data.format = 'json';
        return $.ajax({
            data: data,
            dataType: 'json',
            url: mw.config.get('wgScriptPath') + '/api.php',
            type: method
        });
    }

    function fetchCardData() {
        var deferred = $.Deferred();
        $.get(mw.util.getUrl('MediaWiki:Custom-CardData', {action: 'raw'})).done(function (data) {
            deferred.resolve(data);
        }).fail(function () {
            fatalError('Unable to obtain card data.');
        });
        return deferred.promise();
    }

    function onClickAdd() {
        resetErrors();
        var card = $('#mdw-db-cardname').val();
        var amount = $('#mdw-db-amount').val();
        if (card.length !== 0) {
            var name = allCards.getCasedName(card);
            if (name !== undefined) {
                amount = amount === '' ? 1 : parseInt(amount, 10);
                deck.addCards(name, amount);
            } else {
                showError('Not a valid card name.', 'mdw-db-error');
            }
        }
    }

    function onAmountInput() {
        /*jshint -W040 */ // allow old school jquery this
        resetErrors();
        var amount = $(this);
        var val = amount.val();
        if (val !== '') {
            var max = parseInt(amount.attr('max'), 10);
            var min = parseInt(amount.attr('min'), 10);
            if (val > max)
                amount.val(max);
            else if (val < min)
                amount.val(min);
        }
    }

    function onFocusCardName() {
        /*jshint -W040 */ // allow old school jquery this
        $(this).select().autocomplete('search');
    }

    function unexpectedError(message) {
        throbber.hide();
        var html = '<p>There has been an unexpected error while processing the request</p><p>' +
            message +
            '</p>';
        $('#mdw-db-error').html(html);
        window.scrollTo(0, 0);
    }

    function getContentsFromPage(page) {
        var content = page.revisions[0]['*'];
        return content;
    }

    function getPageFromResponse(response) {
        var pages = response.query.pages;
        return Object.values(pages)[0];        
    }

    function handleCreateError(error) {
        throbber.hide();
        if (error.code === 'articleexists') {
            showError('Deck name already in use.', 'mdw-deckname-error');
            $('#mdw-import-deckname').focus();
        } else if (error.code === 'invalidtitle') {
            showError('Invalid deck name.', 'mdw-deckname-error');
            $('#mdw-import-deckname').focus();
        } else {
            unexpectedError(error.info);
        }
    }

    function handleUpdateError(error) {
        throbber.hide();
        unexpectedError(error.info);
    }

    function redirectToTitle(title) {
        window.location = mw.util.getUrl(title);
    }

    function createDeckPage(name, deckText) {
        mw.loader.using('mediawiki.api').then(function () {
            $.get(mw.util.getUrl('Template:NewDeck', {action: 'raw'})).then(function (newDeckTemplate) {
                deckText = deckText.substring(1, deckText.length - 1); // strip leading and trailing newlines
                var content = removeIncludes(newDeckTemplate).replace('$1', deckText);
                var title = 'Decks/' + name;
                new mw.Api().post({
                    action: 'edit',
                    title: title,
                    summary: 'New deck posted via deck builder',
                    createonly: 'yes',
                    text: content,
                    token: mw.user.tokens.get('editToken')
                }).done(function(result) {
                    if (result.error === undefined) {
                        redirectToTitle(title);
                    } else {
                        handleCreateError(result.error);
                    }
                }).fail(function(code, result) {
                    unexpectedError(code + (code === 'http' ? ' ' + result.textStatus : ''));
                });
            }).fail(function () {
                fatalError('The new deck template could not be loaded.');
            });
        });
    }

    function updateDeckPage(name, deckText) {
        var content = getContentsFromPage(deckPage);
        var startPos = content.indexOf('|Deck=');
        var endPos = content.indexOf('}}', startPos);
        var newContent = content.substring(0, startPos + 6) + deckText + content.substring(endPos);
        var title = 'Decks/' + name;
        wikiApiCall({
            action: 'edit',
            summary: 'Deck update via deck builder',
            title: title,
            basetimestamp: deckPage.revisions[0].timestamp,
            startimestamp: deckPage.starttimestamp,
            text: newContent,
            token: deckPage.edittoken
        },'POST').done(function (result) {
            if (result.error === undefined) {
                redirectToTitle(title);
            } else {
                handleUpdateError(result.error);
            }
        }).fail(function () {
            unexpectedError('Network error while updating deck.');
        });
    }

    function fetchDeckPage(title) {
        var deferred = $.Deferred();
        wikiApiCall({
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',
            titles: 'Decks/' + title,
            rvprop: 'content|timestamp',
            rvlimit: '1'
        }, 'GET').done(function (response) {
            var page = getPageFromResponse(response);
            if (page.missing !== undefined) {
                fatalError('Unable to load requested deck, deck page not found.');
                return;
            }
            deferred.resolve(page);
        }).fail(function () {
            fatalError('Network error while loading deck.');
        });
        return deferred.promise();
    }

    function wikiParse(text) {
        var deferred = $.Deferred();
        wikiApiCall({
            action: 'parse',
            disablepp: 1,
            prop: 'text',
            text: text
        }, 'POST').done(function (response) {
            if (response && response.parse && response.parse.text) {
                var text = response.parse.text['*'];
                deferred.resolve(text);
            } else {
                deferred.reject('Unknown response from parse template');
            }
        }).fail(function () {
            deferred.reject('Network error while parsing template');
        });
        return deferred.promise();
    }

    function initDeckFromDeckText(text) {
        var deckCards = {};
        var sideboardCards = {};
        var current = deckCards;
        var entries = text.split('\n')
            .map(function (entry) { return entry.trim(); })
            .filter(function (entry) { return entry.length > 0; });

        if (entries.length > 1 && entries[0].toLowerCase() === 'commander') {
            deck.commander = entries[1];
            entries = entries.filter(function (entry, index) {
                return index > 1 && entry.toLowerCase() !== 'deck';
            });
        }

        entries.forEach(function (line) {
            if (line.substring(0, 2) !== '--') {
                var card = parseCardEntry(line);
                if (card !== null) {
                    if (!(card.name in current))
                        current[card.name] = 0;
                    current[card.name] += card.amount;
                }
            } else {
                current = sideboardCards;
            }
        });

        deck.setDeck(deckCards);
        deck.setSideboard(sideboardCards);
        deck.drawAll();
    }

    function onClickSave() {
        resetErrors();
        var name = $('#mdw-db-deckname').val();
        if (name.length > 0) {
            throbber.show();
            var text = deck.getText();
            if (deck.isNew())
                createDeckPage(name, text);
            else
                updateDeckPage(name, text);
        } else {
            showError('You must enter a deck name.', 'mdw-deckname-error');
        }
    }

    function activateDeck() {
        hideCardHover();
        deck.activate('deck');
        $('#mdw-sidetab-button').removeClass('mdw-db-activetab');
        $('#mdw-decktab-button').addClass('mdw-db-activetab');
        $('#mdw-db-sidetab').hide();
        $('#mdw-db-decktab').fadeIn(100);
    }

    function activateSideboard() {
        hideCardHover();
        deck.activate('sideboard');
        $('#mdw-decktab-button').removeClass('mdw-db-activetab');
        $('#mdw-sidetab-button').addClass('mdw-db-activetab');
        $('#mdw-db-decktab').hide();
        $('#mdw-db-sidetab').fadeIn(100);
    }

    function onWindowResize() {
        hideCardHover();
        closeCardNameAutocomplete();
    }

    function onChangeFilter() {
        var filter = '';
        var filters = $('#mdw-db-filters');
        var filterCount = filters.find(':checkbox').length;
        var checked = filters.find('input:checked');
        var names;
        if (checked.length === filterCount) {
            names = allCards.getNames(null);
        } else {
            checked.each(function () {
                filter += $(this).val();
            });
            names = allCards.getNames(filter);
        }
        $('#mdw-db-cardname').autocomplete('option', 'source', names);
    }

    function onClickSelectFilters(event) {
        event.preventDefault();
        var filters = $('#mdw-db-filters');
        filters.find('input:checkbox').prop('checked', $(event.target).hasClass('mdw-on'));
        filters.change();
    }

    function showPreviewMessage(message, isError) {
        var span = $('<span>').text(message);
        if (isError) span.addClass('mdw-error');
        $('#mdw-db-preview-message').html(span);
        setTimeout(function () {
            $('#mdw-db-preview-message').empty();
        }, 3000);
    }

    function onClickPreview() {
        /*jshint -W040 */ // allow old school jquery this
        if (deck.deckHasNonLands()) {
            $(this).val('Update Preview');
            var deckTemplate = '{{Deck|Name=Deck Preview\n|Deck=' + deck.getText() + '}}';
            wikiParse(deckTemplate).done(function (deckHtml) {
                var deckPreview = $('#mdw-db-deck-preview');
                deckPreview.html(deckHtml).find('a').attr('target', '_blank');
                if (tooltips && tooltips.applyTooltips)
                    tooltips.applyTooltips(deckPreview.get(0));
                if (magicArena && magicArena.highlightHistoric)
                    magicArena.highlightHistoric(deckPreview);
                $('#mdw-db-preview').show('fast', function() {
                    magicArena.charts.refresh();
                });
            }).fail(function (error) {
                $('#mdw-db-preview-button').val('Preview Deck');
                showPreviewMessage(error, true);
                $('#mdw-db-preview').hide();
            });
        } else {
            $(this).val('Preview Deck');
            showPreviewMessage('The deck must contain at least one current non-land card for deck preview.');
            $('#mdw-db-preview').hide();
        }
    }

    function createForm() {
        /*jshint -W043*/ // allow multiline strimgs
        var add = $('<input type="button" id="mdw-db-add" value="Add" />')
            .click(onClickAdd);
        var save = $('<input type="button" id="mdw-db-savedeck" disabled value="Save Deck">')
            .click(onClickSave);
        var amount = $(document.createDocumentFragment())
            .append('<label for="mdw-db-amount">Amount</label><br />')
            .append($('<input type="number" id="mdw-db-amount" min="1" max="99" value="1">').on('input', onAmountInput));
        var cardname = $(document.createDocumentFragment())
            .append('<label for="mdw-db-cardname">Card Name</label><br />')
            .append($('<input type="text" id="mdw-db-cardname">').focus(onFocusCardName).on('input', resetErrors));
        $('#mdw-db-cardname-span').replaceWith(cardname);
        $('#mdw-db-amount-span').replaceWith(amount);
        $('#mdw-db-add-span').replaceWith(add);
        $('#mdw-db-savedeck-span').replaceWith(save);
        $('#mdw-db-deckname-span').replaceWith('<label for="mdw-db-deckname">Deck Name</span> <input type="text" id="mdw-db-deckname" placeholder="Enter a name for your deck here." size="40">');
        $('#mdw-decktab-button').click(activateDeck);
        $('#mdw-sidetab-button').click(activateSideboard);
        $('#mdw-db-selectall').html('<a href="#" class="mdw-select-link mdw-on">Select all</a>').click(onClickSelectFilters);
        $('#mdw-db-selectnone').html('<a href="#" class="mdw-select-link">Select none</a>').click(onClickSelectFilters);
        $('#mdw-db-filters').change(onChangeFilter);
        $('#mdw-db-filters-1')
            .html('<input type="checkbox" id="mdw-db-land" checked value="L">\
                   <label for="mdw-db-land">Land</label><br>\
                   <input type="checkbox" id="mdw-db-white" checked value="W">\
                   <label for="mdw-db-white">White</label><br>\
                   <input type="checkbox" id="mdw-db-blue" checked value="U">\
                   <label for="mdw-db-blue">Blue</label><br>\
                   <input type="checkbox" id="mdw-db-black" checked value="B">\
                   <label for="mdw-db-black">Black</label><br>\
                   <input type="checkbox" id="mdw-db-red" checked value="R">\
                   <label for="mdw-db-red">Red</label><br>');
        $('#mdw-db-filters-2')
            .prepend('<input type="checkbox" id="mdw-db-green" checked value="G">\
                      <label for="mdw-db-green">Green</label><br>\
                      <input type="checkbox" id="mdw-db-colorless" checked value="C">\
                      <label for="mdw-db-colorless">Colorless</label><br>');
        $('#mdw-db-preview-button').replaceWith(
            $('<input type="button" id="mdw-db-preview-button" value="Preview Deck" disabled>')
                .click(onClickPreview)
        );
        mw.hook('magicarena.chartsready').add(function () {
            $('#mdw-db-preview-button').prop('disabled', false);
        });
    }

    function onCardnameAutoCompleteFocus(event, ui) {
        var focused = $(event.originalEvent.target).find('#ui-active-menuitem');
        var offset = focused.offset();
        if (offset) {
            cardHover.css({top: offset.top, left: offset.left + focused.outerWidth(), display: 'block'});
            imageSource.setCardImageSource(cardHover, ui.item.value);
        }
    }

    function onCardnameAutoCompleteSelect() {
        var nameOffset = $('#mdw-db-cardname').offset();
        if ($(window).scrollTop() + globalNavHeight > nameOffset.top)
            window.scrollTo(0, nameOffset.top - (20 + globalNavHeight));
    }

    function getGlobaNavHeight() {
        var nav = $('#globalNavigation');
        return nav.length === 0 ? 0 : nav.outerHeight();
    }

    function initialize() {
        globalNavHeight = getGlobaNavHeight();
        $('#mdw-db-usefullinks').find('a').attr('target', '_blank');
        cardHover = $('<img id="mdw-card-hover" class="mdw-cardimg mdw-card-hover" />').prependTo('body');
        throbber = new Throbber();
        deck = new Deck();
        imageSource = new ImageSource();
        fetchCardData().done(function (carddata) {
            mw.loader.using('jquery.ui.autocomplete', function () {
                createForm();
                allCards = new CardData(carddata);
                $('#mdw-db-cardname').autocomplete({
                    source: allCards.getNames(null),
                    focus: _.debounce(onCardnameAutoCompleteFocus, 200),
                    select: onCardnameAutoCompleteSelect,
                    open: hideCardHover,
                    close: hideCardHover,
                    minLength: 0
                });
                $(window).resize(onWindowResize);
                var deckName = mw.util.getParamValue('deck');
                if (deckName) {
                    deck.setNew(false);
                    $('#md-db-existswarning').show();
                    $('#mdw-db-deckname').val(deckName).prop('disabled', true);
                    fetchDeckPage(deckName).done(function (page) {
                        deckPage = page;
                        var deckText = extractDeckText(getContentsFromPage(page));
                        if (deckText !== null) {
                            initDeckFromDeckText(deckText);
                            $('#mdw-deck-builder').fadeIn(300);
                        } else {
                            fatalError('The deck definition cannot be read. Does the deck page contain a valid deck definition?');
                        }
                    });
                } else {
                    $('#mdw-deck-builder').fadeIn(300);
                }
            });
        });
    }

    $(document).ready(initialize);

}(jQuery));