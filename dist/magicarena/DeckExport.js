// ==========================================================================
// Deck Export
// Adds the export text box to deck articles with copy to clipboard button
// and a select to allow export cards to be replaced with reprint alternatives.
// Version 3.6.1
// Author: Aspallar
//
// ** Please dont edit this code directly in the wika.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    'use strict';
    /*global mw*/

    // don't run if wrong page or this version is disabled on page
    if (document.getElementById('mdw-arena-export-div') === null ||
            document.getElementById('mdw-rarity-table-full') === null ||
            document.getElementById('mdw-rarity-table-small') === null ||
            $('#mdw-disabled-js').attr('data-deckexport-3-6-1'))
        return;

    function RarityTotals(cards) {
        this.Common = 0;
        this.Uncommon = 0;
        this.Rare = 0;
        this['Mythic Rare'] = 0;

        if (Array.isArray(cards)) {
            var that = this;
            cards.forEach(function (card) {
                var rarity = card.rarity;
                if (rarity !== 'Basic Land')
                    that[rarity] += card.num;
            });
        }
    }

    RarityTotals.prototype = {
        constructor: RarityTotals,
        add: function(other) {
            var result = new RarityTotals();
            result.Common = this.Common + other.Common;
            result.Uncommon = this.Uncommon + other.Uncommon;
            result.Rare = this.Rare + other.Rare;
            result['Mythic Rare'] = this['Mythic Rare'] + other['Mythic Rare'];
            return result;
        }
    }; // End RarityTotals

    function ImportData() {
        var importCards = [],
            altImportCards = [],
            sideboardCards = [],
            commander = null,
            companion = null;

        function baseDisplayName(card) {
            var set = card.set === 'CON' ? 'CONF' : card.set;
            return card.name + ' (' + set + ') ' + card.cardNumber;
        }

        function importDisplayName(card) {
            return card.num + ' ' + baseDisplayName(card);
        }

        function rarityValue(rarity) {
            return { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Mythic Rare': 3 }[rarity];
        }

        function findCardByName(name) {
            for (var k = 0, l = importCards.length; k < l; k++) {
                if (importCards[k].name === name)
                    return importCards[k];
            }
            for (k = 0, l = sideboardCards.length; k < l; k++) {
                if (sideboardCards[k].name === name)
                    return sideboardCards[k];
            }
            return null;
        }

        function findAllCardsByName(cards, name) {
            return cards.reduce(function (result, card) {
                if (card.name === name) result.push(card);
                return result;
            }, []);
        }

        function parseCardData(dataString) {
            if (dataString !== null && dataString.length > 0) {
                importCards = JSON.parse(dataString);
                for (var k = 0, l = importCards.length; k < l; k++) {
                    var card = importCards[k];
                    if (card.isCmd)
                        commander = card;
                    else if (card.isCmp)
                        companion = card;
                }
            }
        }

        function parseSideboardData(dataString) {
            if (dataString !== null && dataString.length > 0)
                sideboardCards = JSON.parse(dataString);
        }

        function parseAltCardData(dataString) {
            altImportCards = [];
            if (dataString !== null && dataString.length > 0) {
                var cards = JSON.parse(dataString);
                // cards may contain duplicates, don't add duplicates
                cards.forEach(function(card) {
                    if (!altImportCards.some(function (altCard) {
                        return card.name === altCard.name &&
                            card.set === altCard.set;
                    })) altImportCards.push(card);
                });
                altImportCards.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            }
        }

        function setCard(dest, source) {
            dest.set = source.set;
            dest.cardNumber = source.cardNumber;
            dest.rarity = source.rarity;
        }

        function swapCards(altCardIndex) {
            var newCard = altImportCards[altCardIndex];
            var oldCard = findCardByName(newCard.name);
            var oldCardData = {
                set: oldCard.set,
                cardNumber: oldCard.cardNumber,
                rarity: oldCard.rarity
            };

            findAllCardsByName(importCards, newCard.name).forEach(function (card) {
                setCard(card, newCard);
            });
            findAllCardsByName(sideboardCards, newCard.name).forEach(function (card) {
                setCard(card, newCard);
            });
            setCard(newCard, oldCardData);
            return baseDisplayName(newCard);
        }

        function adjustToCheapest() {
            for (var k = 0, l = altImportCards.length; k < l; k++) {
                var card = findCardByName(altImportCards[k].name);
                if (rarityValue(altImportCards[k].rarity) < rarityValue(card.rarity))
                    swapCards(k);
            }
        }

        function deckText(includeSideboard) {
            var text = commander ? 'Commander\n' + importDisplayName(commander) + '\n\n' : '';
            text += companion ? 'Companion\n' + importDisplayName(companion) + '\n\nDeck\n' : 'Deck\n';
            importCards.forEach(function(card) {
                if (!(card.isCmp || card.isCmd))
                    text += importDisplayName(card) + '\n';
            });
            if (includeSideboard && sideboardCards.length > 0) {
                text += '\nSideboard\n';
                sideboardCards.forEach(function (card) {
                    text += importDisplayName(card) + '\n';
                });
            }
            return text;
        }

        return {
            swapCards: function (altCardIndex) {
                return swapCards(altCardIndex);
            },
            getDeckRarityTotals: function () {
                return new RarityTotals(importCards);
            },
            getSideboardRarityTotals: function () {
                return new RarityTotals(sideboardCards);
            },
            text: function (includeSideboard) {
                return mw.html.escape(deckText(includeSideboard));
            },
            getAltOptions: function () {
                var options = document.createDocumentFragment();
                altImportCards.forEach(function (card) {
                    $('<option>').html(mw.html.escape(baseDisplayName(card))).appendTo(options);
                });
                return options;
            },
            hasAlternatives: function () {
                return altImportCards.length > 0;
            },
            hasSideboard: function () {
                return sideboardCards.length > 0;
            },
            initialize: function(deckData, sideboardData, altData) {
                parseCardData(deckData);
                parseSideboardData(sideboardData);
                parseAltCardData(altData);
                adjustToCheapest();
            }
        };
    } // End ImportData


    function Ui() {
        var importData;
        var labelOption;
        var useSideboard;

        function sizeTextareaToContents(textarea) {
            textarea.style.overflow = 'hidden';
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px'; 
        }

        function setImportData() {
            importData.initialize(
                $('#mdw-chartdata-pre').text(),
                $('#mdw-sideboard-data').text(),
                $('#mdw-alt-carddata').text()
            );
        }

        function setRarityColumn(col, totals) {
            col.get(0).innerHTML = totals.Common;
            col.get(1).innerHTML = totals.Uncommon;
            col.get(2).innerHTML = totals.Rare;
            col.get(3).innerHTML = totals['Mythic Rare'];
        }

        function setRarityContents() {
            var deckTotals = importData.getDeckRarityTotals();
            var tableFull = $('#mdw-rarity-table-full');
            var tableSmall = $('#mdw-rarity-table-small');
            if (!useSideboard || !importData.hasSideboard()) {
                setRarityColumn(tableSmall.find('td:nth-child(2)'), deckTotals);
                tableFull.hide();
                tableSmall.show();
            } else {
                var sideboardTotals = importData.getSideboardRarityTotals();
                setRarityColumn(tableFull.find('td:nth-child(2)'), deckTotals);
                setRarityColumn(tableFull.find('td:nth-child(3)'), sideboardTotals);
                setRarityColumn(tableFull.find('td:nth-child(4)'), deckTotals.add(sideboardTotals));
                tableSmall.hide();
                tableFull.show();
            }
        }

        function onChangeUseSideboard() {
            /* jshint -W040 */ // allow old school jquery use of this
            useSideboard = this.checked;
            $('#mdw-arena-export-contents').html(importData.text(useSideboard));
            setRarityContents();
        }

        function onClickCopy() {
            var importText = document.getElementById('mdw-arena-export-contents');
            importText.select();
            document.execCommand('copy');
            $('#mdw-copied-message').html(' copied to clipboard.');
            setTimeout(function () {
                $('#mdw-copied-message').empty();
            }, 1200);
        }

        function onClickReset() {
            setImportData();
            $('#mdw-import-reset').prop('disabled', true);
            $('#mdw-import-select').html(labelOption).append(importData.getAltOptions());
            $('#mdw-arena-export-contents').html(importData.text(useSideboard));
            setRarityContents();
        }

        function onSelectAlternative() {
            /* jshint -W040 */ // allow old school jquery use of this
            var text = importData.swapCards(this.selectedIndex - 1);
            this.options[this.selectedIndex].text = text;
            $('#mdw-arena-export-contents').html(importData.text(useSideboard));
            $('#mdw-import-reset').prop('disabled', false);
            setRarityContents();
            this.selectedIndex = 0;
        }

        function setupImportStatsUi(container) {
            if (container === null)
                return;

            var sideboardCheckbox = importData.hasSideboard() ? 
                $('<input type="checkbox" id="mdw-use-sideboard" checked><label for="mdw-use-sideboard">Include sideboard</label>').change(onChangeUseSideboard) : 
                null;

            if (!importData.hasAlternatives()) {
                $(container).html(sideboardCheckbox).css('display', 'block');
                return;
            }

            labelOption =  $('<option disabled selected>Select alternative cards --</option>');

            var altSelect = $('<select id="mdw-import-select"></select>')
                .append(labelOption)
                .append(importData.getAltOptions())
                .change(onSelectAlternative);

            var resetButton = $('<input type="button" id="mdw-import-reset" value="Reset" disabled title="Reset import contents to original content." />')
                .click(onClickReset);

            $(container)
                .prepend(sideboardCheckbox)
                .append(altSelect)
                .append(resetButton)
                .css('display', 'block');
        }

        function setupImportUi(container) {
            var elements = $(
                '<input type="button" id="mdw-copy-export" value="Copy" />' +
                '<span id="mdw-copied-message" />' +
                '<br />' +
                '<textarea id="mdw-arena-export-contents" style="width:90%" readonly>' +
                importData.text(useSideboard) +
                '</textarea>'
            );
            $(container).append(elements);
            sizeTextareaToContents(document.getElementById('mdw-arena-export-contents'));
            setRarityContents();
            $('#mdw-copy-export').click(onClickCopy);
    }

        return {
            start: function() {
                var arenaImportContainer = document.getElementById('mdw-arena-export-div');
                try {
                    importData = new ImportData();
                    setImportData();
                } catch(error) {
                    console.log(error);
                    return;
                }
                useSideboard = importData.hasSideboard();
                setupImportUi(arenaImportContainer);
                setupImportStatsUi(document.getElementById('mdw-arena-export-alt-div'));
                return this;
            }
        };

    } // End Ui

    var ui;
    $(document).ready(function() {
        ui = new Ui().start();
    });

}(jQuery));