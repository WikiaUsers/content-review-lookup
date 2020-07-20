// ==========================================================================
// ImportDeck
//
// Version 1.14.0
// Author: Aspallar
//
// Provides a user friendly way to import a deck from Magic Arena
// without the user having to edit any wikitext.
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
//<nowiki>
(function ($) {
    /* global mw, tooltips, BannerNotification, magicArena*/
    'use strict';

    if (document.getElementById('mdw-import-deck') === null || $('#mdw-disabled-js').attr('data-importdeck-1-14-0'))
        return;

    var keywords,
        titleCaser,
        maxEntryLength,
        disallowedEntryCharacters,
        newDeckTemplate = '',
        awaitingCharts = true,
        translation = null,
        cardRegex = /^(\d+)\s+.*\S.*$/;

    function TitleCaser(minorWords, acronyms) {

        function isColorString(str) {
            return str.length <= 5 && 
                ['rug', 'rub', 'bug', 'grub'].indexOf(str) === -1 &&
                /^(?:([ubwrg])(?!.*\1))*$/.test(str);
        }

        return {
            caseText: function(text) {
                text = text.trim().toLowerCase();
                return text.replace(/\w+/g, function(word, offset) {
                    if (offset > 1 && /['\u2019]/.test(text[offset - 1]))
                        return word;
                    else if ((acronyms && acronyms.indexOf(word) !== -1) || isColorString(word))
                        return word.toUpperCase();
                    else if (minorWords && offset !== 0 && minorWords.indexOf(word) !== -1)
                        return word.toLowerCase();
                    else
                        return word.substring(0, 1).toUpperCase() + word.substring(1);
                });                
            }
        };
    }

    function removeIncludes(contents) {
        return contents.replace(/<[\/]?noinclude>|<[\/]?includeonly>/g, '');
    }

    function signatureToAnonTemplate(contents) {
        return contents.replace(
            '~~~~',
            '{{AnonDeckTagline|{{subst:CURRENTTIME}}, {{subst:CURRENTMONTHNAME}} {{subst:CURRENTDAY}}, {{subst:CURRENTYEAR}} (UTC)}}'
        );            
    }

    function adjustTemplate(contents) {
        contents = removeIncludes(contents);
        if (!mw.config.get('wgUserId'))
            contents = signatureToAnonTemplate(contents);
        return contents;
    }

    function invalidTitle(title) {
        return /\/|#|\?/.test(title);
    }

    function showWorking() {
        $('#mdw-working').show();
    }

    function hideWorking() {
        $('#mdw-working').hide();
    }

    function showForm() {
        $('#mdw-import-deck').fadeIn(400);
    }

    function showBadEntries(badEntries) {
        var safeContent = badEntries.map(function (x) { return mw.html.escape(x); }).join('<br />');
        $('#mdw-import-badentries-content').html(safeContent);
        $('#mdw-import-badentries').fadeIn(400);
    }

    function hideBadEntries() {
        $('#mdw-import-badentries').hide();
    }

    function controlsDisabled(disabled) {
        $('#mdw-import-button').prop('disabled', disabled);
        $('input[name="mdw-import-lang"').prop('disabled', disabled);
        $('#mdw-preview-button').prop('disabled', awaitingCharts || disabled);
    }

    function disableControls() {
        controlsDisabled(true);
    }

    function enableControls() {
        controlsDisabled(false);
    }

    function fetchNewDeckTemplate() {
        // var deferred = $.Deferred();
        // deferred.resolve('start/n$1/nend<includeonly>');
        // return deferred.promise();
        return $.get(mw.util.getUrl('Template:NewDeck', {action: 'raw'}));
    }

    function fetchTranslation(langCode) {
        return $.get(mw.util.getUrl('MediaWiki:Custom-Cards-' + langCode, {action: 'raw'}));
    }

    function displayError(name, message) {
        if (Array.isArray(message)) {
            message = message.reduce(function (a, v) { return a + '* ' + v + '<br />'; }, '');
            message = message.substring(0, message.length - 6);
        }
        else {
            message = '* ' + message;
        }
        $('#mdw-import-' + name + '-error').html(message);
        return false;
    }

    function unexpectedError(message) {
        displayError('unexpected', 'An unexpected error occurred: ' + message);
    }

    function validateDeckName() {
        var name = $('#mdw-import-deckname').val().trim();
        if (name.length === 0)
            return displayError('deckname', 'A deck name is required.');
        else if (/^\d+$/.test(name))
            return displayError('deckname', 'Deck name cannot just be a number.');
        else if (name.length < 3)
            return displayError('deckname', 'Deck name is too short.');
        else if (invalidTitle(name))
            return displayError('deckname', 'Deck name must not contain /, #, or ? ');
        else if (/(.)\1{2,}/i.test(name))
            return displayError('deckname', 'Too many repeating characters.');
        else if (/^[qwerty ]+$|^[asdf ]+$|^[zxcvb ]+$|^[ghjkl; ]+$/i.test(name))
            return displayError('deckname', 'Looks like gibberish, try another name.');
        else
            return true;
    }
    
    function handleCreateError(error) {
        enableControls();
        if (error.code === 'articleexists') {
            displayError('deckname', 'Deck name already in use.');
            $('#mdw-import-deckname').focus();
        } else if (error.code === 'invalidtitle') {
            displayError('deckname', 'Invalid deck name.');
            $('#mdw-import-deckname').focus();
        } else {
            unexpectedError(error.info);
        }
    }

    function replaceCurlyQuotesWithApostrophe(s) {
        return s.replace(/[\u2018\u2019]/g, '\'');
    }

    function correctCardName(name) {
        return replaceCurlyQuotesWithApostrophe(name)
            .replace(/\/+/g, ' // ')
            .replace(/\s\s+/g, ' ');
    }

    function translateCard(entry) {
        if (translation === null)
            return entry;
        var match = /(\d+)\s+(.*?)(?=\s+\/\/|\s+\(|$)/.exec(entry);
        if (!match)
            return entry;
        var translatedName = translation[match[2].toLowerCase().trim()];
        if (translatedName === undefined)
            return entry;
        return match[1] + ' ' + translatedName;
    }

    function getDeckText(deckEntries) {
        return deckEntries.map(function (entry) {
            return translateCard(entry);
        }).join('\n');
    }

    function createDeckPage(name, deckEntries, originalText) {
        disableControls();
        showWorking();
        mw.loader.using('mediawiki.api').then(function () {
            var content = newDeckTemplate.replace('$1', getDeckText(deckEntries)) +
                    '\n<!-- Original Deck Text\n' + originalText.replace(/>/g, '&gt;') + '-->\n',
                title = 'Decks/' + name;
            new mw.Api().post({
                action: 'edit',
                title: title,
                summary: 'Imported deck',
                createonly: '1',
                text: content,
                token: mw.user.tokens.get('editToken')
            }).done(function(result) {
                hideWorking();
                if (result.error === undefined)
                    window.location = mw.util.getUrl(title);
                else
                    handleCreateError(result.error);
            }).fail(function(code, result) {
                unexpectedError(code + (code === 'http' ? ' ' + result.textStatus : ''));
            });
        });
    }

    function wikiParse(text) {
        var deferred = $.Deferred();
        mw.loader.using('mediawiki.api', function () {
            new mw.Api().post({
                action: 'parse',
                disablepp: 1,
                prop: 'text',
                text: text
            }).done(function (response) {
                if (response && response.parse && response.parse.text)
                    deferred.resolve(response.parse.text['*']);
                else
                    deferred.reject('Unknown server response while previewing deck.');
            }).fail(function () {
                deferred.reject('Network error while previewing deck.');
            });
        });
        return deferred.promise();
    }

    function disallowedRegex() {
        var disallowed = $('#mdw-import-deck').attr('data-disallow');
        return disallowed ? new RegExp('[' + disallowed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ']') : null;
    }

    function stripSetCode(cardEntry) {
        return cardEntry.replace(/\([A-Z][0-9A-Z][0-9A-Z]\)|\(CONF\)/, '');
    }

    function Keywords(deckImport) {
        var commanderKeywords = ['commander'],
            deckKeywords = ['deck'],
            sideboardKeywords = ['sideboard'],
            companionKeywords = ['companion'];

        function extendKeywords(values, keywords) {
            if (values) {
                values.split('|').forEach(function (val) {
                    keywords.push(val);
                });
            }
        }

        extendKeywords(deckImport.attr('data-deck'), deckKeywords);
        extendKeywords(deckImport.attr('data-commander'), commanderKeywords);
        extendKeywords(deckImport.attr('data-sideboard'), sideboardKeywords);
        extendKeywords(deckImport.attr('data-companion'), companionKeywords);

        return {
            isCommander: function(entry) {
                return commanderKeywords.indexOf(entry.toLowerCase()) !== -1;
            },
            isDeck: function(entry) {
                return deckKeywords.indexOf(entry.toLowerCase()) !== -1;
            },
            isSideboard: function(entry) {
                return sideboardKeywords.indexOf(entry.toLowerCase()) !== -1;
            },
            isCompanion: function(entry) {
                return companionKeywords.indexOf(entry.toLowerCase()) !== -1;
            },
            isKeyword: function(entry) {
                return this.isCommander(entry) ||
                    this.isCompanion(entry) ||
                    this.isDeck(entry) ||
                    this.isSideboard(entry);
            }
        
        };
    } // Keywords

    function parseCardResult(entry, result) {
        var match, amount = -1;
        if (entry.length > maxEntryLength) {
            result.badEntries.push(entry.substring(0, maxEntryLength) + '... (too long)');
        } else if (disallowedEntryCharacters && disallowedEntryCharacters.test(stripSetCode(entry))) {
            result.badEntries.push(entry);
        } else {
            if ( (match = cardRegex.exec(entry)) ) {
                amount = parseInt(match[1], 10);
                result.validEntries.push(correctCardName(entry));
            } else {
                result.badEntries.push(entry);
            }
        }
        return amount;
    }

    function addKeywordResult(entry, englishKeyword, alreadyDone, outOfSequence, result) {
        if (alreadyDone)
            result.badEntries.push('More than 1 ' + entry);
        else if (outOfSequence)
            result.badEntries.push(entry + ' is in the wrong place.');
        else
            result.validEntries.push(englishKeyword);
    }

    function addAmount(amount, addToSideboard, result) {
        if (amount > 0) {
            if (addToSideboard)
                result.sideCardCount += amount;
             else
                result.cardCount += amount;
        }
    }

    function parseLegacyFormat(entries, result) {
        var amount, sideboardDone = false, sideboardError = false;
        entries = entries.map(function (entry) {
            return keywords.isSideboard(entry) ? '' : entry;
        }).filter(function (entry, index) {
            return entry.length > 0 || (index > 0 && entries[index - 1].length !== 0);
        });
        entries.forEach(function (entry) {
            if (entry.length === 0) {
                if (sideboardDone) {
                    if (!sideboardError) {
                        result.badEntries.push('More than 1 sideboard specified');
                        sideboardError = true;
                    }
                } else {
                    result.validEntries.push('-- sideboard --');
                }
                sideboardDone = true;
            } else {
                amount = parseCardResult(entry, result);
                addAmount(amount, sideboardDone, result);
            }
        });
    }

    function parseCurrentFormat(entries, result) {
        var amount,
            inCompanion = false,
            commanderDone = false, companionDone = false, deckDone = false, sideboardDone = false, amountOne = false;
        entries = entries.filter(function (entry) { return entry.length !== 0; });
        entries.forEach(function (entry) {
            if (keywords.isCommander(entry)) {
                addKeywordResult(entry, 'Commander', commanderDone, companionDone || deckDone || sideboardDone, result);
                commanderDone = amountOne = true;
            } else if (keywords.isCompanion(entry)) {
                addKeywordResult(entry, 'Companion', companionDone, deckDone || sideboardDone, result);
                inCompanion = companionDone = amountOne = true;
            } else if (keywords.isDeck(entry)) {
                addKeywordResult(entry, 'Deck', deckDone, sideboardDone, result);
                deckDone = true;
            } else if (keywords.isSideboard(entry)) {
                addKeywordResult(entry, '-- sideboard --', sideboardDone, false, result);
                sideboardDone = true;
            } else {
                amount = parseCardResult(entry, result);
                if (amountOne) {
                    amountOne = false;
                    if (amount !== 1) {
                        result.badEntries.push('The amount of commanders/companions must be 1');
                    }
                }
                if (inCompanion)
                    inCompanion = false;
                else
                    addAmount(amount, sideboardDone, result);
            }
        });
    }

    function parseDeckDef(deckdef) {
        var result = { validEntries: [], badEntries: [], cardCount: 0, sideCardCount: 0 },
            entries = deckdef.split('\n').map(function (entry) {return entry.trim(); });
        if (keywords.isKeyword(entries[0]))
            parseCurrentFormat(entries, result);
        else
            parseLegacyFormat(entries, result);
        return result;
    }

    function showPreviewMessage(message, isError) {
        var span = $('<span>').text(message);
        if (isError) span.addClass('mdw-error');
        $('#mdw-import-preview-message').html(span);
        setTimeout(function () {
            $('#mdw-import-preview-message').empty();
        }, 3000);
    }

    function previewDeck(deckEntries) {
        var deckTemplate = '{{Deck|Name=Deck Preview\n|BackTo=none\n|Deck=' + getDeckText(deckEntries) + '}}';
        showWorking();
        wikiParse(deckTemplate).done(function (deckHtml) {
            var deckPreview = $('#mdw-import-deck-preview');
            hideWorking();
            deckPreview.html(deckHtml).find('a').attr('target', '_blank');
            if (tooltips && tooltips.applyTooltips)
                tooltips.applyTooltips(deckPreview.get(0));
            if (magicArena && magicArena.highlightHistoric)
                magicArena.highlightHistoric(deckPreview);
            $('#mdw-import-preview').show('fast', function() {
                magicArena.charts.refresh();
            });
        }).fail(function (error) {
            hideWorking();
            $('#mdw-db-preview-button').val('Preview Deck');
            showPreviewMessage(error, true);
            $('#mdw-db-preview').hide();
        });
    }

    function clearErrors() {
        hideBadEntries();
        $('.mdw-error').empty();
    }

    function clickImport() {
        clearErrors();
        var result,
            nameValid = validateDeckName(),
            deckErrors = [],
            text = $('#mdw-import-deckdef').val().trim();
        if (text.length === 0)
            deckErrors.push('You must enter a deck definition');
        else {
            result = parseDeckDef(text);
            if (result.badEntries.length > 0) {
                showBadEntries(result.badEntries);
                deckErrors.push('Import contains invalid entries (see below).');
            }
            if (result.sideboardCount > 1) 
                deckErrors.push('Import contains more than one sideboard.');
            if (result.cardCount < 60)
                deckErrors.push('Only ' + result.cardCount + ' cards. Deck must contain minimum of 60.');
            if (result.sideCardCount > 15)
                deckErrors.push('Sideboard has ' + result.sideCardCount + ' cards. Maximum of 15 cards.');
        }
        if (deckErrors.length > 0)
            displayError('deckdef', deckErrors);
        else if (nameValid)
            createDeckPage($('#mdw-import-deckname').val(), result.validEntries, text);
    }

    function clickPreview() {
        clearErrors();
        var result,
            deckErrors = [],
            text = $('#mdw-import-deckdef').val().trim();
        if (text.length === 0)
            deckErrors.push('You must enter a deck definition');
        else {
            result = parseDeckDef(text);
            if (result.badEntries.length > 0) {
                showBadEntries(result.badEntries);
                deckErrors.push('Import contains invalid entries (see below).');
            }
            if (result.sideboardCount > 1) 
                deckErrors.push('Import contains more than one sideboard.');
        }
        if (deckErrors.length === 0)
            previewDeck(result.validEntries);
        else 
            displayError('deckdef', deckErrors);
    }

    function showTranslationLoadFail(langCode) {
        new BannerNotification('Failed to load translation data (' + mw.html.escape(langCode) + '). Defaulting back to English.',
            'error').show();
    }

    function parseTranslation(data) {
        var trans = {};
        data.split('\n').forEach(function (entry) {
            var match = /^(.*)?\|(.*)$/.exec(entry);
            if (match)
                trans[match[1].toLowerCase()] = match[2];
        });
        return trans;
    }

    function changeLanguage() {
        /*jshint -W040 */ // allow old school jquery use of this 
        var langCode = $(this).val();
        if (langCode === 'en') {
            translation = null;
        } else {
            disableControls();
            fetchTranslation(langCode).done(function (data) {
                translation = parseTranslation(data);
                enableControls();
            }).fail(function () {
                showTranslationLoadFail(langCode);
                $('#mdw-import-english').prop('checked', true);
                translation = null;
                enableControls();
            });
        }
    }

    function makeTitleCase() {
        /*jshint -W040 */ // allow old school jquery use of this 
        var that = $(this);
        that.val(titleCaser.caseText(that.val()));
    }

    function createForm() {
        /*jshint multistr:true*/
        var importBtn = $('<input type="button" id="mdw-import-button" value="Import Deck" />')
                .click(clickImport),
            previewBtn = $('<input type="button" id="mdw-preview-button" value="Preview Deck" disabled />')
                .click(clickPreview),
            languages = $('<label><input type="radio" name="mdw-import-lang" id="mdw-import-english" checked value="en"><span>English</span></label>\
                <label><input type="radio" name="mdw-import-lang" value="de"><span>Deutsch</span></label>\
                <label><input type="radio" name="mdw-import-lang" value="es"><span>Español</span></label>\
                <label><input type="radio" name="mdw-import-lang" value="fr"><span>Français</span></label>\
                <label><input type="radio" name="mdw-import-lang" value="it"><span>Italiano</span></label>\
                <label><input type="radio" name="mdw-import-lang" value="pt-br"><span>Português</span></label>');

        $('#mdw-import-deckname-span').append(
            $('<input type="text" id="mdw-import-deckname" size="40" maxlength="100" placeholder="Deck name" />')
                .blur(makeTitleCase)
        );
        $('#mdw-import-deckdef-span')
            .append('<textarea id="mdw-import-deckdef" cols="60" rows="25"></textarea>');
        $('#mdw-import-button-span').append(importBtn).append('&nbsp;').append(previewBtn);
        languages.find('input[name="mdw-import-lang"]').change(changeLanguage);
        $('#mdw-lang-span').replaceWith(languages);
        mw.hook('magicarena.chartsready').add(function () {
            awaitingCharts = false;
            $('#mdw-preview-button').prop('disabled', false);
        });
    }

    function initializeImportForm(deckImport) {
        $('#mdw-working').html($('<img>', {
            src: mw.config.get('stylepath') + '/common/images/ajax.gif'
        }));
        showWorking();
        fetchNewDeckTemplate().done(function (template) {
            titleCaser = new TitleCaser((deckImport.attr('data-minorwords') || '').split('|'), (deckImport.attr('data-acronyms') || '').split('|'));
            newDeckTemplate = adjustTemplate(template);
            createForm();
            hideWorking();
            showForm();
            $('#mdw-import-deckname').focus();
        }).fail(function () {
            hideWorking();
            $('#mdw-import-deck').html('<p>Failed to load new deck template.</p>');
            showForm();
        });
    }

    function mustBeSignedIn() {
        var signIn,
            annon = $('#mdw-import-noannon'),
            signInLink = $('a[data-tracking-label="account.sign-in"]').attr('href');
        $('#mdw-import-content').remove();
        if (signInLink) {
            signIn = annon.find('#mdw-sign-in');
            signIn.html($('<a>').attr('href', signInLink).html(signIn.html()));
        }
        annon.fadeIn(400);
    }

    function initialize() {
        var deckImport = $('#mdw-import-deck');
        if (deckImport.attr('data-allowanon') || mw.config.get('wgUserId')) {
            keywords = new Keywords(deckImport);
            disallowedEntryCharacters = disallowedRegex();
            maxEntryLength = deckImport.attr('data-maxcardlength') || 40;
            initializeImportForm(deckImport);
        } else {
            mustBeSignedIn();
        }
    }

    $(initialize);

}(jQuery));