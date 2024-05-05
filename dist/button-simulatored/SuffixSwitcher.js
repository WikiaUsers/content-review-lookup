// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixSwitcher.js
function addSuffixSwitcher() {
    mw.loader.getScript('https://button-simulatored.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript');
    if (window.localStorage.notationpreference === 'suffix') {
        var suffixStatus = true;
        var toggleOutputString = 'enabled';
    } else {
        var suffixStatus = false;
        var toggleOutputString = 'disabled';
    }
    var input;
    var decimals = 4; // Determines the maximum and fixed number of decimal digits for number output strings.
    var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
    var result;

    mw.loader.getScript('https://button-simulatored.fandom.com/index.php?title=MediaWiki:Break_Eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.

    function toScientific(e) { // Ensure a user-inputted value is a scientific notation Decimal number.
        if (e.match(/[a-z]+/gi) !== null && suffixes.indexOf(e.match(/[a-z]+/gi)[0]) !== -1) {
            var mantissa = e.match(/\d+[.]?\d*/g);
            extraZeroes = Math.floor(Math.log10(Number(mantissa)));
            mantissa = mantissa / (10 ** extraZeroes);
            var exponent = suffixes.indexOf(e.match(/[a-z]+/gi)[0]) * 3 + extraZeroes;
            result = mantissa + "e" + exponent;
        } else {
            result = e;
        }
        return new Decimal(result);
    }

    function notateInt(e) { // Convert a Decimal number to a string and notate it using either locale string (comma-separated numbers), scientific notation with a fixed number of decimals or suffix notation.
        function checkNoDecimal(x) {
            x = new Decimal(x);
            if (x.lessThan(1.797693134862315907729305190789e308)) {
                if (Math.round(x.mantissa) == new Decimal(x.mantissa).toStringWithDecimalPlaces(5)) {
                    if (x.greaterThanOrEqualTo(1e3)) {
                        result = Math.round(new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals)) + "e" + x.exponent;
                    } else {
                        result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "")).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "");
                    }
                } else {
                    if (x.greaterThanOrEqualTo(1e3)) {
                        result = new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals) + "e" + x.exponent;
                    } else {
                        result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals));
                    }
                }
            } else {
                result = x.toStringWithDecimalPlaces(decimals);
            }
            return result;
        }
        e = new Decimal(e);
        if (e.greaterThanOrEqualTo(1e0) && e.lessThan(1e3)) {
            result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e6, return the input with comma-separated numbers.
        } else if (e.greaterThanOrEqualTo(1e3) && e.lessThan(new Decimal("1e" + suffixes.length * 3)) && suffixStatus === true) {
            extraZeroes = e.exponent % 3;
            result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + "" + suffixes[Math.floor(e.exponent / 3)]; // If the input is at least 1e6 and is less than the length of the suffixes array's zero count times 3 and suffix notation is enabled, return the input converted to suffix notation.
        } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(1e21)) {
            e = new Decimal(e.mantissa.toFixed(3) + "e" + e.exponent);
            if ((e.mantissa).toString() === "9.999999999999") {
                result = "1e" + e.exponent;
            } else {
                result = checkNoDecimal(e.mantissa) + "e" + e.exponent; // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
            }
        } else if (e.greaterThanOrEqualTo("1e1e3") && e.lessThan("1e1e16")) {
            switch (suffixStatus) {
                case true:
                    if (e.greaterThan(new Decimal("1e" + (suffixes.length * 3)))) {
                        extraZeroes = 0;
                    } else {
                        extraZeroes = e.exponent % 3;
                    }
                    result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + "e" + notateInt(checkNoDecimal(e.exponent)); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                    break;
                default:
                    result = checkNoDecimal(e.mantissa) + "e" + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
            }
        } else {
            result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
        }
        return result;
    }

    function suffixSwitcherAddListeners() {
        function makeItHappen(elem) {
            input = document.getElementById(elem).innerHTML;
            console.log(input);
            console.log("testing: " + elem);
            adjustSuffixes(elem);
        }

        var elem = document.getElementsByClassName('SuffixSwitcherInput');

        for (var i = 0; i < elem.length; i += 1) {
            (function() {
                const suffixSwitcherID = 'SuffixSwitcherInput' + i;
                document.getElementsByClassName('SuffixSwitcherInput')[i].setAttribute('id', suffixSwitcherID);
                var elemWithID = elem[i].id;
                elem[i].addEventListener("click", function() {
                    makeItHappen(elemWithID);
                }, false);
            }());
        }
    }
    suffixSwitcherAddListeners();

    function adjustSuffixes() {
        function returnNotatedString() {
            const inputModified = toScientific(input);
            if (input === '') {
                result = '';
            } else if (inputModified.lessThan(1e3003)) {
                if (inputModified.lessThan(0)) {
                    result = "-" + notateInt(inputModified.toString().replace(/[-]/, ""));
                } else {
                    result = notateInt(inputModified);
                }
            } else {
                var suffixesTemp;
                switch (suffixStatus) {
                    case true:
                        suffixesTemp = true;
                        break;
                    default:
                        suffixesTemp = false;
                }
                suffixStatus = false;
                result = notateInt(inputModified);
                suffixStatus = suffixesTemp;
            }
            return result;
        }
        var j = 0;
        while (j < document.getElementsByClassName('SuffixSwitcherInput').length) {
            input = document.getElementsByClassName('SuffixSwitcherInput')[j].innerHTML;
            document.getElementsByClassName('SuffixSwitcherInput')[j].innerHTML = returnNotatedString();
            j++;
        }
    }

    const buttonElem = document.createElement('li');
    buttonElem.innerHTML = "<a id='SuffixSwitcherToggle'><span>Toggle Suffixes (currently <span id='SuffixSwitcherStatusOutput'>" + toggleOutputString + "</span>)</span></a>";
    document.getElementById('p-cactions').getElementsByClassName('wds-list wds-is-linked')[0].appendChild(buttonElem);
    document.getElementById('SuffixSwitcherToggle').addEventListener('click', function() {
        if (suffixStatus === true) {
            suffixStatus = false;
            toggleOutputString = 'disabled';
            window.localStorage.notationpreference = 'scientific';
        } else {
            suffixStatus = true;
            toggleOutputString = 'enabled';
            window.localStorage.notationpreference = 'suffix';
        }
        adjustSuffixes();
        document.getElementById('SuffixSwitcherStatusOutput').innerHTML = toggleOutputString;
    });
    setTimeout(adjustSuffixes, 1e3);
}
addSuffixSwitcher();
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixSwitcher.js