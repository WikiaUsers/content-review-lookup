// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixSwitcher.js
function addSuffixSwitcher() {
    const suffixes = ["", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No", "De", "UDe", "DDe", "TDe", "QdDe", "QnDe", "SxDe", "SpDe", "OcDe", "NoDe", "Vt", "UVt", "DVt", "TVt", "QdVt", "QnVt", "SxVt", "SpVt", "OcVt", "NoVt", "Tg", "UTg", "DTg", "TTg", "QdTg", "QnTg", "SxTg", "SpTg", "OcTg", "NoTg", "qg", "Uqg", "Dqg", "Tqg", "Qdqg", "Qnqg", "Sxqg", "Spqg", "Ocqg", "Noqg", "Qg", "UQg", "DQg", "TQg", "QdQg", "QnQg", "SxQg", "SpQg", "OcQg", "NoQg", "sg", "Usg", "Dsg", "Tsg", "Qdsg", "Qnsg", "Sxsg", "Spsg", "Ocsg", "Nosg", "Sg", "USg", "DSg", "TSg", "QdSg", "QnSg", "SxSg", "SpSg", "OcSg", "NoSg", "Og", "UOg", "DOg", "TOg", "QdOg", "QnOg", "SxOg", "SpOg", "OcOg", "NoOg", "Ng", "UNg", "DNg", "TNg", "QdNg", "QnNg", "SxNg", "SpNg", "OcNg", "NoNg", "Ce", "UCe", "DCe","TCe", "QdCe", "QnCe", "SxCe", "SpCe", "OcCe", "NoCe", "DeCe", "UDeCe", "DDeCe", "TDeCe", "QdDeCe", "QnDeCe", "SxDeCe", "SpDeCe", "OcDeCe", "NoDeCe", "VtCe", "UVtCe", "DVtCe", "TVtCe", "QdVtCe", "QnVtCe", "SxVtCe", "SpVtCe", "OcVtCe", "NoVtCe", "TgCe", "UTgCe", "DTgCe", "TTgCe", "QdTgCe", "QnTgCe", "SxTgCe", "SpTgCe", "OcTgCe", "NoTgCe", "qgCe", "UqgCe", "DqgCe", "TqgCe", "QdqgCe", "QnqgCe", "SxqgCe", "SpqgCe", "OcqgCe", "NoqgCe", "QgCe", "UQgCe", "DQgCe", "TQgCe", "QdQgCe", "QnQgCe", "SxQgCe", "SpQgCe", "OcQgCe", "NoQgCe", "sgCe", "UsgCe", "DsgCe", "TsgCe", "QdsgCe", "QnsgCe", "SxsgCe", "SpsgCe", "OcsgCe", "NosgCe", "SgCe", "USgCe", "DSgCe", "TSgCe", "QdSgCe", "QnSgCe", "SxSgCe", "SpSgCe", "OcSgCe", "NoSgCe", "OgCe", "UOgCe", "DOgCe", "TOgCe", "QdOgCe", "QnOgCe", "SxOgCe", "SpOgCe", "OcOgCe", "NoOgCe", "NgCe", "UNgCe", "DNgCe", "TNgCe", "QdNgCe", "QnNgCe", "SxNgCe", "SpNgCe", "OcNgCe", "NoNgCe", "Du", "UDu", "DDu","TDu", "QdDu", "QnDu", "SxDu", "SpDu", "OcDu", "NoDu", "DeDu", "UDeDu", "DDeDu", "TDeDu", "QdDeDu", "QnDeDu", "SxDeDu", "SpDeDu", "OcDeDu", "NoDeDu", "VtDu", "UVtDu", "DVtDu", "TVtDu", "QdVtDu", "QnVtDu", "SxVtDu", "SpVtDu", "OcVtDu", "NoVtDu", "TgDu", "UTgDu", "DTgDu", "TTgDu", "QdTgDu", "QnTgDu", "SxTgDu", "SpTgDu", "OcTgDu", "NoTgDu", "qgDu", "UqgDu", "DqgDu", "TqgDu", "QdqgDu", "QnqgDu", "SxqgDu", "SpqgDu", "OcqgDu", "NoqgDu", "QgDu", "UQgDu", "DQgDu", "TQgDu", "QdQgDu", "QnQgDu", "SxQgDu", "SpQgDu", "OcQgDu", "NoQgDu", "sgDu", "UsgDu", "DsgDu", "TsgDu", "QdsgDu", "QnsgDu", "SxsgDu", "SpsgDu", "OcsgDu", "NosgDu", "SgDu", "USgDu", "DSgDu", "TSgDu", "QdSgDu", "QnSgDu", "SxSgDu", "SpSgDu", "OcSgDu", "NoSgDu", "OgDu", "UOgDu", "DOgDu", "TOgDu", "QdOgDu", "QnOgDu", "SxOgDu", "SpOgDu", "OcOgDu", "NoOgDu", "NgDu", "UNgDu", "DNgDu", "TNgDu", "QdNgDu", "QnNgDu", "SxNgDu", "SpNgDu", "OcNgDu", "NoNgDu", "Tr", "UTr", "DTr","TTr", "QdTr", "QnTr", "SxTr", "SpTr", "OcTr", "NoTr", "DeTr", "UDeTr", "DDeTr", "TDeTr", "QdDeTr", "QnDeTr", "SxDeTr", "SpDeTr", "OcDeTr", "NoDeTr", "VtTr", "UVtTr", "DVtTr", "TVtTr", "QdVtTr", "QnVtTr", "SxVtTr", "SpVtTr", "OcVtTr", "NoVtTr", "TgTr", "UTgTr", "DTgTr"];
    const suffixesLC = ["", "k", "m", "b", "t", "qd", "qn", "sx", "sp", "oc", "no", "de", "ude", "dde", "tde", "qdde", "qnde", "sxde", "spde", "ocde", "node", "vt", "uvt", "dvt", "tvt", "qdvt", "qnvt", "sxvt", "spvt", "ocvt", "novt", "tg", "utg", "dtg", "ttg", "qdtg", "qntg", "sxtg", "sptg", "octg", "notg", "qg", "uqg", "dqg", "tqg", "qdqg", "qnqg", "sxqg", "spqg", "ocqg", "noqg", "qg", "uqg", "dqg", "tqg", "qdqg", "qnqg", "sxqg", "spqg", "ocqg", "noqg", "sg", "usg", "dsg", "tsg", "qdsg", "qnsg", "sxsg", "spsg", "ocsg", "nosg", "sg", "usg", "dsg", "tsg", "qdsg", "qnsg", "sxsg", "spsg", "ocsg", "nosg", "og", "uog", "dog", "tog", "qdog", "qnog", "sxog", "spog", "ocog", "noog", "ng", "ung", "dng", "tng", "qdng", "qnng", "sxng", "spng", "ocng", "nong", "ce", "uce", "dce","tce", "qdce", "qnce", "sxce", "spce", "occe", "noce", "dece", "udece", "ddece", "tdece", "qddece", "qndece", "sxdece", "spdece", "ocdece", "nodece", "vtce", "uvtce", "dvtce", "tvtce", "qdvtce", "qnvtce", "sxvtce", "spvtce", "ocvtce", "novtce", "tgce", "utgce", "dtgce", "ttgce", "qdtgce", "qntgce", "sxtgce", "sptgce", "octgce", "notgce", "qgce", "uqgce", "dqgce", "tqgce", "qdqgce", "qnqgce", "sxqgce", "spqgce", "ocqgce", "noqgce", "qgce", "uqgce", "dqgce", "tqgce", "qdqgce", "qnqgce", "sxqgce", "spqgce", "ocqgce", "noqgce", "sgce", "usgce", "dsgce", "tsgce", "qdsgce", "qnsgce", "sxsgce", "spsgce", "ocsgce", "nosgce", "sgce", "usgce", "dsgce", "tsgce", "qdsgce", "qnsgce", "sxsgce", "spsgce", "ocsgce", "nosgce", "ogce", "uogce", "dogce", "togce", "qdogce", "qnogce", "sxogce", "spogce", "ocogce", "noogce", "ngce", "ungce", "dngce", "tngce", "qdngce", "qnngce", "sxngce", "spngce", "ocngce", "nongce", "du", "udu", "ddu","tdu", "qddu", "qndu", "sxdu", "spdu", "ocdu", "nodu", "dedu", "udedu", "ddedu", "tdedu", "qddedu", "qndedu", "sxdedu", "spdedu", "ocdedu", "nodedu", "vtdu", "uvtdu", "dvtdu", "tvtdu", "qdvtdu", "qnvtdu", "sxvtdu", "spvtdu", "ocvtdu", "novtdu", "tgdu", "utgdu", "dtgdu", "ttgdu", "qdtgdu", "qntgdu", "sxtgdu", "sptgdu", "octgdu", "notgdu", "qgdu", "uqgdu", "dqgdu", "tqgdu", "qdqgdu", "qnqgdu", "sxqgdu", "spqgdu", "ocqgdu", "noqgdu", "qgdu", "uqgdu", "dqgdu", "tqgdu", "qdqgdu", "qnqgdu", "sxqgdu", "spqgdu", "ocqgdu", "noqgdu", "sgdu", "usgdu", "dsgdu", "tsgdu", "qdsgdu", "qnsgdu", "sxsgdu", "spsgdu", "ocsgdu", "nosgdu", "sgdu", "usgdu", "dsgdu", "tsgdu", "qdsgdu", "qnsgdu", "sxsgdu", "spsgdu", "ocsgdu", "nosgdu", "ogdu", "uogdu", "dogdu", "togdu", "qdogdu", "qnogdu", "sxogdu", "spogdu", "ocogdu", "noogdu", "ngdu", "ungdu", "dngdu", "tngdu", "qdngdu", "qnngdu", "sxngdu", "spngdu", "ocngdu", "nongdu", "tr", "utr", "dtr","ttr", "qdtr", "qntr", "sxtr", "sptr", "octr", "notr", "detr", "udetr", "ddetr", "tdetr", "qddetr", "qndetr", "sxdetr", "spdetr", "ocdetr", "nodetr", "vttr", "uvttr", "dvttr", "tvttr", "qdvttr", "qnvttr", "sxvttr", "spvttr", "ocvttr", "novttr", "tgtr", "utgtr", "dtgtr"];
    if (window.localStorage.notationpreference === 'suffix') {
        var suffixStatus = true;
        var toggleOutputString = 'enabled';
    } else {
        var suffixStatus = false;
        var toggleOutputString = 'disabled';
    }
    var input;
    var decimals = 2; // Determines the maximum and fixed number of decimal digits for number output strings.
    var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
    var result;

    mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.

    function toScientific(e) { // Ensure a user-inputted value is a scientific notation Decimal number.
        if (e.match(/[a-z]+/gi) !== null && suffixes[suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase())] !== undefined) {
            var mantissa = e.match(/\d+[.]?\d*/g);
            extraZeroes = Math.floor(Math.log10(Number(mantissa)));
            mantissa = mantissa / (10 ** extraZeroes);
            var exponent = suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase()) * 3 + extraZeroes;
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
        if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
            result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e6, return the input with comma-separated numbers.
        } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(new Decimal("1e" + suffixes.length * 3)) && suffixStatus === true) {
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
            } else if (inputModified.lessThan(1e1000)) {
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