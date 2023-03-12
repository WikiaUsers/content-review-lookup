// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixConverter.js
// Function for ensuring all the calculator's inner workings stay within.
function addSuffixConverter() {
    if (document.getElementById('SuffixConverter') !== null) {
        console.log('[Suffix Converter] [LOG]: ID located. Running script.');
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript'); // Import suffixes and suffixesLC arrays.

        // Create the calculator's user interface.
        document.getElementById('SuffixConverter').innerHTML = "<div id='SuffixConverterContainer'><div class='templatedesktop' style='padding:0.5em;width:80%;margin:auto'><p style='font-size:24px;font-weight:bold;text-align:center'>Suffix Converter</p><p><input id='SuffixConverterInputField' style='width:25%' placeholder='Input any notation...'></input></p><button id='SuffixConverterCalculateButton'>Calculate</button><p><b>-- Results --</b><br>Scientific: <span id='SuffixConverterScientificOutput'></span><br>Suffix: <span id='SuffixConverterSuffixOutput'></span><br>English name of highest suffix: <span id='SuffixConverterEnglishNameOutput'></span></p></div></div>";

        // Variable declarations.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var resultScientific = '?';
        var resultSuffix = '?';
        var resultEnglishName = '?';
        const calculatingText = '<i>Calculating...</i>';
        const tooHighText = "<span class='rainbow'>Error: Input is greater than or equal to 1e303 or -1e303.</span>";
        const suffixNames = ['', '', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion', 'Sexdecillion', 'Septendecillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Unvigintillion', 'Duovigintillion', 'Tresvigintillion', 'Quattuorvigintillion', 'Quinvigintillion', 'Sesvigintillion', 'Septenvigintillion', 'Octovigintillion', 'Novemvigintillion', 'Trigintillion', 'Untrigintillion', 'Duotrigintillion', 'Trestrigintillion', 'Quattuortrigintillion', 'Quintrigintillion', 'Sextrigintillion', 'Septentrigintillion', 'Octotrigintillion', 'Novemtrigintillion', 'Quadragintillion', 'Unquadragintillion', 'Duoquadragintillion', 'Trequadragintillion', 'Quattuorquadragintillion', 'Quinquadragintillion', 'Sexquadragintillion', 'Septenquadragintillion', 'Octoquadragintillion', 'Novemquadragintillion', 'Quinquagintillion', 'Unquinquagintillion', 'Duoquinquagintillion', 'Trequinquagintillion', 'Quattuorquinquagintillion', 'Quinquinquagintillion', 'Sexquinquagintillion', 'Septenquinquagintillion', 'Octoquinquagintillion', 'Novemquinquagintillion', 'Hexagintillion', 'Unhexagintillion', 'Duohexagintillion', 'Trehexagintillion', 'Quattuorhexagintillion', 'Quinhexagintillion', 'Sexhexagintillion', 'Septenhexagintillion', 'Octohexagintillion', 'Novemhexagintillion', 'Septuagintillion', 'Unseptuagintillion', 'Duoseptuagintillion', 'Treseptuagintillion', 'Quattuorseptuagintillion', 'Quinseptuagintillion', 'Sexseptuagintillion', 'Septenseptuagintillion', 'Octoseptuagintillion', 'Novemseptuagintillion', 'Octogintillion', 'Unoctogintillion', 'Duooctogintillion', 'Treoctogintillion', 'Quattuoroctogintillion', 'Quinoctogintillion', 'Sexoctogintillion', 'Septenoctogintillion', 'Octooctogintillion', 'Novemoctogintillion', 'Nonagintillion', 'Unnonagintillion', 'Duononagintillion', 'Trenonagintillion', 'Quattuornonagintillion', 'Quinnonagintillion', 'Sexnonagintillion', 'Septennonagintillion', 'Octononagintillion', 'Nonnonagintillion'];

        function toScientific(e) { // Ensure a user-inputted value is a scientific notation Decimal number.
            if (e.match(/[a-z]+/gi) !== null && suffixes[suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase())] !== undefined) {
                var mantissa = e.match(/\d+[.]?\d*/g);
                extraZeroes = Math.floor(Math.log10(Number(mantissa)));
                mantissa = mantissa / (10 ** extraZeroes);
                var exponent = suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase()) * 3 + extraZeroes;
                result = mantissa + 'e' + exponent;
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
                            result = Math.round(new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals)) + 'e' + x.exponent;
                        } else {
                            result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, '')).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, '');
                        }
                    } else {
                        if (x.greaterThanOrEqualTo(1e3)) {
                            result = new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals) + 'e' + x.exponent;
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
            if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
                result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e6, return the input with comma-separated numbers.
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(new Decimal('1e' + suffixes.length * 3)) && suffixStatus === true) {
                extraZeroes = e.exponent % 3;
                result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + '' + suffixes[Math.floor(e.exponent / 3)]; // If the input is at least 1e6 and is less than the length of the suffixes array's zero count times 3 and suffix notation is enabled, return the input converted to suffix notation.
                if ((e.mantissa * (10 ** extraZeroes)).toFixed(decimals) === (1e3).toFixed(decimals)) {
                    const regEx = new RegExp('9{' + decimals + '}');
                    result = result.replace(/[1000]/, ('999.' + Number((9999999999999).toString().match(regEx)[0]).toFixed(decimals))).replace(/[.]0+/, '');
                }
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan('1e1e3')) {
                e = new Decimal(e.mantissa.toFixed(3) + 'e' + e.exponent);
                if ((e.mantissa).toString() === '9.999999999999') {
                    result = '1e' + e.exponent;
                } else {
                    result = checkNoDecimal(e.mantissa) + 'e' + e.exponent; // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
                }
            } else if (e.greaterThanOrEqualTo('1e1e3') && e.lessThan('1e1e16')) {
                switch (suffixStatus) {
                    case true:
                        if (e.greaterThan(new Decimal('1e' + (suffixes.length * 3)))) {
                            extraZeroes = 0;
                        } else {
                            extraZeroes = e.exponent % 3;
                        }
                        result = decimalMax(checkNoDecimal(e.mantissa * (10 ** extraZeroes)) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                        break;
                    default:
                        result = decimalMax(checkNoDecimal(e.mantissa) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                }
            } else {
                result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }

        // Return the lowest of two Decimal inputs.
        function decimalMin(x, y) {
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = y;
            } else {
                result = x;
            }
            return result;
        }

        // Return the largest of two Decimal inputs.
        function decimalMax(x, y) {
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = x;
            } else {
                result = y;
            }
            return result;
        }

        // Return singular or plural string based on the value of the input.
        function checkPlural(input, singular, plural) {
            input = new Decimal(input);
            if (input.equals(1)) {
                result = singular;
            } else {
                result = plural;
            }
            return result;
        }

        // Calculate the results and update the HTML.
        function updateResults() {
            var tooHigh = false;
            var negative = false;
            if (document.getElementById('SuffixConverterInputField').value === '') {
                var input = new Decimal(0);
            } else if (toScientific(document.getElementById('SuffixConverterInputField').value).greaterThanOrEqualTo(1e303) || toScientific(document.getElementById('SuffixConverterInputField').value).lessThan(-1e303) || toScientific(document.getElementById('SuffixConverterInputField').value).equals(-1e303)) {
                tooHigh = true;
            } else if (toScientific(document.getElementById('SuffixConverterInputField').value).lessThan(0)) {
                var input = new Decimal(toScientific(document.getElementById('SuffixConverterInputField').value).toString().replace(/[-]/, ''));
                negative = true;
            } else {
                var input = toScientific(document.getElementById('SuffixConverterInputField').value);
            }

            switch (tooHigh) {
                case true:
                    document.getElementById('SuffixConverterScientificOutput').innerHTML = tooHighText;
                    document.getElementById('SuffixConverterSuffixOutput').innerHTML = tooHighText;
                    document.getElementById('SuffixConverterEnglishNameOutput').innerHTML = tooHighText;
                    break;
                default:
                    suffixStatus = false;
                    resultScientific = notateInt(input);
                    if (negative === true) {
                        document.getElementById('SuffixConverterScientificOutput').innerHTML = '-' + resultScientific;
                    } else {
                        document.getElementById('SuffixConverterScientificOutput').innerHTML = resultScientific;
                    }
                    suffixStatus = true;
                    resultSuffix = notateInt(input);
                    if (negative === true) {
                        document.getElementById('SuffixConverterSuffixOutput').innerHTML = '-' + resultSuffix;
                    } else {
                        document.getElementById('SuffixConverterSuffixOutput').innerHTML = resultSuffix;
                    }

                    if (input.exponent >= 6) {
                        resultEnglishName = suffixNames[Math.floor(input.exponent / 3)];
                    } else {
                        const ordinalsList = ['One', 'Ten', 'Hundred', 'Thousand', 'Ten thousand', 'Hundred thousand'];
                        resultEnglishName = ordinalsList[Math.floor(input).toString().match(/\d+/)[0].length - 1];
                    }
                    if (input.equals(0)) {
                        resultEnglishName = 'Zero';
                    }
                    document.getElementById('SuffixConverterEnglishNameOutput').innerHTML = resultEnglishName;
            }
        }
        updateResults();

        // Add event listeners.
        document.getElementById('SuffixConverterCalculateButton').addEventListener('click', function() {
            document.getElementById('SuffixConverterScientificOutput').innerHTML = calculatingText;
            document.getElementById('SuffixConverterSuffixOutput').innerHTML = calculatingText;
            document.getElementById('SuffixConverterEnglishNameOutput').innerHTML = calculatingText;
            updateResults();
        });
    } else {
        console.log('[Level Calculator] [LOG]: Calculator already exists or the Break Eternity library was not imported. Cancelling script.');
    }
}
if (document.getElementById('SuffixConverter') !== null) {
    const addSuffixConverterInterval = setInterval(function() {
        try {
            addSuffixConverter();
            new Decimal();
            clearInterval(addSuffixConverterInterval);
        } catch (err) {}
    }, 100);
} else {
    console.log('[Suffix Converter] [LOG]: Failed to locate ID. Cancelling script.');
}
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixConverter.js