
/** The code marked below was taken from
 * http://mel-green.com/2009/02/javascript-1337-speak-translator/
 * with a few minor translation improvements and tweaks to fit
 * the wiki framework.
 */

var PhrasesEnglish =
    new Array('the', 'dude', 'hacker',
        'hacks', 'you', 'cool', 'oh my gosh',
        'fear', 'power', 'own',
        'what the heck', 'elite', 'for the win',
        'loser', 'good game', 'sucks',
        'sucker', 'is', 'rocks', 'winner');
var PhrasesLeet =
    new Array('teh', 'dood', 'haxxor', 'hax', 'u',
        '1337', 'zomg', 'ph43', 'powwah', 'pwn',
        'wth', 'leet', 'ftw', 'n00b', 'gg',
        'sux', 'suxxor', 'iz', 'rox', 'pwnster');

var LettersEnglish =
    new Array('n', 'b', 'k', 'd', 'e', 'f', 'g', 'h',
        'p', 'm', 'r', 'l', 'o', 'q', 's', 't',
        'u', 'x', 'w', 'y', 'z', 'c', 'a', 'j',
        'i', 'v', ' ');
var LettersLeet =
    new Array('/\\/', '|3', '|<', '[)', '3', '|=', '6', '|-|',
        '|*', '|\\/|', '|2', '|_', '0', '0.', '5', '+',
        '|_|', '><', '\\/\\/', '\'/', '2', '(', '/\\', '_|',
        '1', '\\/', '  ');

function translateText(inputString) {
    for (i = 0; i < PhrasesEnglish.length; ++i)
        inputString = inputString.replace(
            new RegExp(PhrasesEnglish[i], "gi"),
            PhrasesLeet[i]
        );

    for (i = 0; i < LettersEnglish.length; ++i)
        inputString = inputString.replace(
            new RegExp(LettersEnglish[i], "gi"),
            LettersLeet[i]
        );

    return inputString;
}

/* End of copied code, http://mel-green.com/2009/02/javascript-1337-speak-translator */

function LeetTrigger() {
    $('.leet').each(function() {
        var originalText = $(this).html();
        $(this).html(translateText(originalText));
    });
}
addOnloadHook(LeetTrigger);