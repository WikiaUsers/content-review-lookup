// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixSwitcher.js
function addSuffixSwitcher() {
    const suffixes = ["", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No", "De", "UDe", "DDe", "TDe", "QdDe", "QnDe", "SxDe", "SpDe", "OcDe", "NoDe", "Vt", "UVt", "DVt", "TVt", "QdVt", "QnVt", "SxVt", "SpVt", "OcVt", "NoVt", "Tg", "UTg", "DTg", "TTg", "QdTg", "QnTg", "SxTg", "SpTg", "OcTg", "NoTg", "qg", "Uqg", "Dqg", "Tqg", "Qdqg", "Qnqg", "Sxqg", "Spqg", "Ocqg", "Noqg", "Qg", "UQg", "DQg", "TQg", "QdQg", "QnQg", "SxQg", "SpQg", "OcQg", "NoQg", "sg", "Usg", "Dsg", "Tsg", "Qdsg", "Qnsg", "Sxsg", "Spsg", "Ocsg", "Nosg", "Sg", "USg", "DSg", "TSg", "QdSg", "QnSg", "SxSg", "SpSg", "OcSg", "NoSg", "Og", "UOg", "DOg", "TOg", "QdOg", "QnOg", "SxOg", "SpOg", "OcOg", "NoOg", "Ng", "UNg", "DNg", "TNg", "QdNg", "QnNg", "SxNg", "SpNg", "OcNg", "NoNg", "Ce",
    "UCe", "DCe","TCe", "QdCe", "QnCe", "SxCe", "SpCe", "OcCe", "NoCe", "DeCe", "UDeCe", "DDeCe", "TDeCe", "QdDeCe", "QnDeCe", "SxDeCe", "SpDeCe", "OcDeCe", "NoDeCe", "VtCe", "UVtCe", "DVtCe", "TVtCe", "QdVtCe", "QnVtCe", "SxVtCe", "SpVtCe", "OcVtCe", "NoVtCe", "TgCe", "UTgCe", "DTgCe", "TTgCe", "QdTgCe", "QnTgCe", "SxTgCe", "SpTgCe", "OcTgCe", "NoTgCe", "qgCe", "UqgCe", "DqgCe", "TqgCe", "QdqgCe", "QnqgCe", "SxqgCe", "SpqgCe", "OcqgCe", "NoqgCe", "QgCe", "UQgCe", "DQgCe", "TQgCe", "QdQgCe", "QnQgCe", "SxQgCe", "SpQgCe", "OcQgCe", "NoQgCe", "sgCe", "UsgCe", "DsgCe", "TsgCe", "QdsgCe", "QnsgCe", "SxsgCe", "SpsgCe", "OcsgCe", "NosgCe", "SgCe", "USgCe", "DSgCe", "TSgCe", "QdSgCe", "QnSgCe", "SxSgCe", "SpSgCe", "OcSgCe", "NoSgCe", "OgCe", "UOgCe", "DOgCe", "TOgCe", "QdOgCe", "QnOgCe", "SxOgCe", "SpOgCe", "OcOgCe", "NoOgCe", "NgCe", "UNgCe", "DNgCe", "TNgCe", "QdNgCe", "QnNgCe", "SxNgCe", "SpNgCe", "OcNgCe", "NoNgCe", "Du",
    "UDu", "DDu","TDu", "QdDu", "QnDu", "SxDu", "SpDu", "OcDu", "NoDu", "DeDu", "UDeDu", "DDeDu", "TDeDu", "QdDeDu", "QnDeDu", "SxDeDu", "SpDeDu", "OcDeDu", "NoDeDu", "VtDu", "UVtDu", "DVtDu", "TVtDu", "QdVtDu", "QnVtDu", "SxVtDu", "SpVtDu", "OcVtDu", "NoVtDu", "TgDu", "UTgDu", "DTgDu", "TTgDu", "QdTgDu", "QnTgDu", "SxTgDu", "SpTgDu", "OcTgDu", "NoTgDu", "qgDu", "UqgDu", "DqgDu", "TqgDu", "QdqgDu", "QnqgDu", "SxqgDu", "SpqgDu", "OcqgDu", "NoqgDu", "QgDu", "UQgDu", "DQgDu", "TQgDu", "QdQgDu", "QnQgDu", "SxQgDu", "SpQgDu", "OcQgDu", "NoQgDu", "sgDu", "UsgDu", "DsgDu", "TsgDu", "QdsgDu", "QnsgDu", "SxsgDu", "SpsgDu", "OcsgDu", "NosgDu", "SgDu", "USgDu", "DSgDu", "TSgDu", "QdSgDu", "QnSgDu", "SxSgDu", "SpSgDu", "OcSgDu", "NoSgDu", "OgDu", "UOgDu", "DOgDu", "TOgDu", "QdOgDu", "QnOgDu", "SxOgDu", "SpOgDu", "OcOgDu", "NoOgDu", "NgDu", "UNgDu", "DNgDu", "TNgDu", "QdNgDu", "QnNgDu", "SxNgDu", "SpNgDu", "OcNgDu", "NoNgDu", "Tr",
    "UTr", "DTr","TTr", "QdTr", "QnTr", "SxTr", "SpTr", "OcTr", "NoTr", "DeTr", "UDeTr", "DDeTr", "TDeTr", "QdDeTr", "QnDeTr", "SxDeTr", "SpDeTr", "OcDeTr", "NoDeTr", "VtTr", "UVtTr", "DVtTr", "TVtTr", "QdVtTr", "QnVtTr", "SxVtTr", "SpVtTr", "OcVtTr", "NoVtTr", "TgTr", "UTgTr", "DTgTr", "TTgTr", "QdTgTr", "QnTgTr", "SxTgTr", "SpTgTr", "OcTgTr", "NoTgTr", "qgTr", "UqgTr", "DqgTr", "TqgTr", "QdqgTr", "QnqgTr", "SxqgTr", "SpqgTr", "OcqgTr", "NoqgTr", "QgTr", "UQgTr", "DQgTr", "TQgTr", "QdQgTr", "QnQgTr", "SxQgTr", "SpQgTr", "OcQgTr", "NoQgTr", "sgTr", "UsgTr", "DsgTr", "TsgTr", "QdsgTr", "QnsgTr", "SxsgTr", "SpsgTr", "OsgTr", "NsgTr", "SgTr", "USgTr", "DSgTr", "TSgTr", "QdSgTr", "QnSgTr", "SxSgTr", "SpSgTr", "OcSgTr", "NoSgTr", "OgTr", "UOgTr", "DOgTr", "TOgTr", "QdOgTr", "QnOgTr", "SxOgTr", "SpOgTr", "OcOgTr", "NoOgTr", "NgTr", "UNgTr", "DNgTr", "TNgTr", "QdNgTr", "QnNgTr", "SxNgTr", "SpNgTr", "OcNgTr", "NoNgTr", "Qa",
    "UQa", "DQa","TQa", "QdQa", "QnQa", "SxQa", "SpQa", "OcQa", "NoQa", "DeQa", "UDeQa", "DDeQa", "TDeQa", "QdDeQa", "QnDeQa", "SxDeQa", "SpDeQa", "OcDeQa", "NoDeQa", "VtQa", "UVtQa", "DVtQa", "TVtQa", "QdVtQa", "QnVtQa", "SxVtQa", "SpVtQa", "OcVtQa", "NoVtQa", "TgQa", "UTgQa", "DTgQa", "TTgQa", "QdTgQa", "QnTgQa", "SxTgQa", "SpTgQa", "OcTgQa", "NoTgQa", "qgQa", "UqgQa", "DqgQa", "TqgQa", "QdqgQa", "QnqgQa", "SxqgQa", "SpqgQa", "OcqgQa", "NoqgQa", "QgQa", "UQgQa", "DQgQa", "TQgQa", "QdQgQa", "QnQgQa", "SxQgQa", "SpQgQa", "OcQgQa", "NoQgQa", "sgQa", "UsgQa", "DsgQa", "TsgQa", "QdsgQa", "QnsgQa", "SxsgQa", "SpsgQa", "OsgQa", "NsgQa", "SgQa", "USgQa", "DSgQa", "TSgQa", "QdSgQa", "QnSgQa", "SxSgQa", "SpSgQa", "OcSgQa", "NoSgQa", "OgQa", "UOgQa", "DOgQa", "TOgQa", "QdOgQa", "QnOgQa", "SxOgQa", "SpOgQa", "OcOgQa", "NoOgQa", "NgQa", "UNgQa", "DNgQa", "TNgQa", "QdNgQa", "QnNgQa", "SxNgQa", "SpNgQa", "OcNgQa", "NoNgQa", "Qi",
    "UQi", "DQi","TQi", "QdQi", "QnQi", "SxQi", "SpQi", "OcQi", "NoQi", "DeQi", "UDeQi", "DDeQi", "TDeQi", "QdDeQi", "QnDeQi", "SxDeQi", "SpDeQi", "OcDeQi", "NoDeQi", "VtQi", "UVtQi", "DVtQi", "TVtQi", "QdVtQi", "QnVtQi", "SxVtQi", "SpVtQi", "OcVtQi", "NoVtQi", "TgQi", "UTgQi", "DTgQi", "TTgQi", "QdTgQi", "QnTgQi", "SxTgQi", "SpTgQi", "OcTgQi", "NoTgQi", "qgQi", "UqgQi", "DqgQi", "TqgQi", "QdqgQi", "QnqgQi", "SxqgQi", "SpqgQi", "OcqgQi", "NoqgQi", "QgQi", "UQgQi", "DQgQi", "TQgQi", "QdQgQi", "QnQgQi", "SxQgQi", "SpQgQi", "OcQgQi", "NoQgQi", "sgQi", "UsgQi", "DsgQi", "TsgQi", "QdsgQi", "QnsgQi", "SxsgQi", "SpsgQi", "OsgQi", "NsgQi", "SgQi", "USgQi", "DSgQi", "TSgQi", "QdSgQi", "QnSgQi", "SxSgQi", "SpSgQi", "OcSgQi", "NoSgQi", "OgQi", "UOgQi", "DOgQi", "TOgQi", "QdOgQi", "QnOgQi", "SxOgQi", "SpOgQi", "OcOgQi", "NoOgQi", "NgQi", "UNgQi", "DNgQi", "TNgQi", "QdNgQi", "QnNgQi", "SxNgQi", "SpNgQi", "OcNgQi", "NoNgQi", "Se",
    "USe", "DSe","TSe", "QdSe", "QnSe", "SxSe", "SpSe", "OcSe", "NoSe", "DeSe", "UDeSe", "DDeSe", "TDeSe", "QdDeSe", "QnDeSe", "SxDeSe", "SpDeSe", "OcDeSe", "NoDeSe", "VtSe", "UVtSe", "DVtSe", "TVtSe", "QdVtSe", "QnVtSe", "SxVtSe", "SpVtSe", "OcVtSe", "NoVtSe", "TgSe", "UTgSe", "DTgSe", "TTgSe", "QdTgSe", "QnTgSe", "SxTgSe", "SpTgSe", "OcTgSe", "NoTgSe", "qgSe", "UqgSe", "DqgSe", "TqgSe", "QdqgSe", "QnqgSe", "SxqgSe", "SpqgSe", "OcqgSe", "NoqgSe", "QgSe", "UQgSe", "DQgSe", "TQgSe", "QdQgSe", "QnQgSe", "SxQgSe", "SpQgSe", "OcQgSe", "NoQgSe", "sgSe", "UsgSe", "DsgSe", "TsgSe", "QdsgSe", "QnsgSe", "SxsgSe", "SpsgSe", "OsgSe", "NsgSe", "SgSe", "USgSe", "DSgSe", "TSgSe", "QdSgSe", "QnSgSe", "SxSgSe", "SpSgSe", "OcSgSe", "NoSgSe", "OgSe", "UOgSe", "DOgSe", "TOgSe", "QdOgSe", "QnOgSe", "SxOgSe", "SpOgSe", "OcOgSe", "NoOgSe", "NgSe", "UNgSe", "DNgSe", "TNgSe", "QdNgSe", "QnNgSe", "SxNgSe", "SpNgSe", "OcNgSe", "NoNgSe", "Si",
    "USi", "DSi","TSi", "QdSi", "QnSi", "SxSi", "SpSi", "OcSi", "NoSi", "DeSi", "UDeSi", "DDeSi", "TDeSi", "QdDeSi", "QnDeSi", "SxDeSi", "SpDeSi", "OcDeSi", "NoDeSi", "VtSi", "UVtSi", "DVtSi", "TVtSi", "QdVtSi", "QnVtSi", "SxVtSi", "SpVtSi", "OcVtSi", "NoVtSi", "TgSi", "UTgSi", "DTgSi", "TTgSi", "QdTgSi", "QnTgSi", "SxTgSi", "SpTgSi", "OcTgSi", "NoTgSi", "qgSi", "UqgSi", "DqgSi", "TqgSi", "QdqgSi", "QnqgSi", "SxqgSi", "SpqgSi", "OcqgSi", "NoqgSi", "QgSi", "UQgSi", "DQgSi", "TQgSi", "QdQgSi", "QnQgSi", "SxQgSi", "SpQgSi", "OcQgSi", "NoQgSi", "sgSi", "UsgSi", "DsgSi", "TsgSi", "QdsgSi", "QnsgSi", "SxsgSi", "SpsgSi", "OsgSi", "NsgSi", "SgSi", "USgSi", "DSgSi", "TSgSi", "QdSgSi", "QnSgSi", "SxSgSi", "SpSgSi", "OcSgSi", "NoSgSi", "OgSi", "UOgSi", "DOgSi", "TOgSi", "QdOgSi", "QnOgSi", "SxOgSi", "SpOgSi", "OcOgSi", "NoOgSi", "NgSi", "UNgSi", "DNgSi", "TNgSi", "QdNgSi", "QnNgSi", "SxNgSi", "SpNgSi", "OcNgSi", "NoNgSi", "Ot",
    "UOt", "DOt","TOt", "QdOt", "QnOt", "SxOt", "SpOt", "OcOt", "NoOt", "DeOt", "UDeOt", "DDeOt", "TDeOt", "QdDeOt", "QnDeOt", "SxDeOt", "SpDeOt", "OcDeOt", "NoDeOt", "VtOt", "UVtOt", "DVtOt", "TVtOt", "QdVtOt", "QnVtOt", "SxVtOt", "SpVtOt", "OcVtOt", "NoVtOt", "TgOt", "UTgOt", "DTgOt", "TTgOt", "QdTgOt", "QnTgOt", "SxTgOt", "SpTgOt", "OcTgOt", "NoTgOt", "qgOt", "UqgOt", "DqgOt", "TqgOt", "QdqgOt", "QnqgOt", "SxqgOt", "SpqgOt", "OcqgOt", "NoqgOt", "QgOt", "UQgOt", "DQgOt", "TQgOt", "QdQgOt", "QnQgOt", "SxQgOt", "SpQgOt", "OcQgOt", "NoQgOt", "sgOt", "UsgOt", "DsgOt", "TsgOt", "QdsgOt", "QnsgOt", "SxsgOt", "SpsgOt", "OsgOt", "NsgOt", "SgOt", "USgOt", "DSgOt", "TSgOt", "QdSgOt", "QnSgOt", "SxSgOt", "SpSgOt", "OcSgOt", "NoSgOt", "OgOt", "UOgOt", "DOgOt", "TOgOt", "QdOgOt", "QnOgOt", "SxOgOt", "SpOgOt", "OcOgOt", "NoOgOt", "NgOt", "UNgOt", "DNgOt", "TNgOt", "QdNgOt", "QnNgOt", "SxNgOt", "SpNgOt", "OcNgOt", "NoNgOt", "Ni",
    "UNi", "DNi","TNi", "QdNi", "QnNi", "SxNi", "SpNi", "OcNi", "NoNi", "DeNi", "UDeNi", "DDeNi", "TDeNi", "QdDeNi", "QnDeNi", "SxDeNi", "SpDeNi", "OcDeNi", "NoDeNi", "VtNi", "UVtNi", "DVtNi", "TVtNi", "QdVtNi", "QnVtNi", "SxVtNi", "SpVtNi", "OcVtNi", "NoVtNi", "TgNi", "UTgNi", "DTgNi", "TTgNi", "QdTgNi", "QnTgNi", "SxTgNi", "SpTgNi", "OcTgNi", "NoTgNi", "qgNi", "UqgNi", "DqgNi", "TqgNi", "QdqgNi", "QnqgNi", "SxqgNi", "SpqgNi", "OcqgNi", "NoqgNi", "QgNi", "UQgNi", "DQgNi", "TQgNi", "QdQgNi", "QnQgNi", "SxQgNi", "SpQgNi", "OcQgNi", "NoQgNi", "sgNi", "UsgNi", "DsgNi", "TsgNi", "QdsgNi", "QnsgNi", "SxsgNi", "SpsgNi", "OsgNi", "NsgNi", "SgNi", "USgNi", "DSgNi", "TSgNi", "QdSgNi", "QnSgNi", "SxSgNi", "SpSgNi", "OcSgNi", "NoSgNi", "OgNi", "UOgNi", "DOgNi", "TOgNi", "QdOgNi", "QnOgNi", "SxOgNi", "SpOgNi", "OcOgNi", "NoOgNi", "NgNi", "UNgNi", "DNgNi", "TNgNi", "QdNgNi", "QnNgNi", "SxNgNi", "SpNgNi", "OcNgNi", "NoNgNi", "Mi"];
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