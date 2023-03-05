function addLevelCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById('LevelCalculator') !== null && document.getElementById('LevelCalculatorContainer') === null) {
        console.log('[Level Calculator] [LOG]: ID located. Running script.');
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript'); // Import suffixes and suffixesLC arrays.

        // Create the calculator's user interface.
        document.getElementById('LevelCalculator').innerHTML = "<div id='LevelCalculatorContainer'><div class='templatedesktop' style='text-align:center;padding:0.5em;width:80%;margin:auto'><span style='text-align:center;font-size:30px;color:#FFF'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1a/XP.png/revision/latest?cb=20221013231716' width='150'/> Level Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1f/Cosmic.png/revision/latest?cb=20220704040837' width='150'/></span><div style='text-align:initial;padding:1em;background:initial;overflow:auto;float:left' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='LCSuffixToggleButton'>Disabled</button></div><p>Current Level (<abbr id='LCCurrentLevelNotes' title='(n1) Default value: 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of 1e9.'>notes</abbr>): <input id='LCCurrentLevelInput' style='width:10%'/></p><p>Desired Level (<abbr id='LCGoalLevelNotes' title='(n1) Default value: Current Level + 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of 1e9.'>notes</abbr>): <input id='LCGoalLevelInput' style='width:10%'/></p><p>Current Realm (<abbr title='Default value: Normal Realm.'>notes</abbr>): <input id='LCCurrentRealmSlider' class='slider' type='range' value='0' min='0' max='3'/><br><small>Currently: <span id='LCCurrentRealmOutput'>?</span></small></p><br><p class='templatedesktop' style='border-left:initial;border-right:initial;border-radius:initial;padding:0.25em'>Result</p><p><button id='LCCalculateButton'>Calculate</button></p>At <span id='LCCurrentLevelTypeOutput'></span> <span id='LCCurrentLevelOutput'>?</span>, the requirement to reach <span id='LCGoalLevelTypeOutput'></span> <span id='LCGoalLevelOutput'>?</span> is:<br><span id='LCRequirementTypeOutput'></span> <span id='LCRequirementOutput'>?</span></table></div></div>";

        // Variable declarations.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var currentLevel;
        var goalLevel;
        var realm;

        // Function for updating suffix status and its respective toggle button based on localStorage data.
        function updateSuffixStatus() {
            if (window.localStorage.LevelCalculatorSuffixStatus === 'true') {
                suffixStatus = true;
                document.getElementById('LCSuffixToggleButton').setAttribute('style', 'background:#00FF00');
                document.getElementById('LCSuffixToggleButton').innerHTML = 'Enabled';
            } else {
                suffixStatus = false;
                document.getElementById('LCSuffixToggleButton').setAttribute('style', 'background:#FF0000');
                document.getElementById('LCSuffixToggleButton').innerHTML = 'Disabled';
            }
            document.getElementById('LCCurrentLevelNotes').title = '(n1) Default value: 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of ' + notateInt(1e9) + '.';
            document.getElementById('LCGoalLevelNotes').title = '(n1) Default value: Current Level + 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of ' + notateInt(1e9) + '.';
        }
        updateSuffixStatus();

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
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan('1e1e3')) {
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
                        result = decimalMax(checkNoDecimal(e.mantissa * (10 ** extraZeroes)) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                        console.log('testing: ' + result);
                        break;
                    default:
                        result = decimalMax(checkNoDecimal(e.mantissa) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                }
            } else {
                result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }

        function decimalMin(x, y) { // Return the lowest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = y;
            } else {
                result = x;
            }
            return result;
        }

        function decimalMax(x, y) { // Return the largest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = x;
            } else {
                result = y;
            }
            return result;
        }

        function checkPlural(input, singular, plural) { // Return singular or plural string based on the value of the input.
            input = new Decimal(input);
            if (input.equals(1)) {
                result = singular;
            } else {
                result = plural;
            }
            return result;
        }

        function updateSelectedRealm() {
            switch (Number(document.getElementById('LCCurrentRealmSlider').value)) {
                case 0:
                    realm = 'normal';
                    document.getElementById('LCCurrentRealmOutput').innerHTML = "<span style='color:#87CEEB;font-weight:bold'>Normal Realm</span>";
                    document.getElementById('LCCurrentLevelTypeOutput').innerHTML = "<span style='color:#87CEEB;font-weight:bold'>Normal Level</span>";
                    document.getElementById('LCGoalLevelTypeOutput').innerHTML = "<span style='color:#87CEEB;font-weight:bold'>Normal Level</span>";
                    document.getElementById('LCRequirementTypeOutput').innerHTML = "<img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1a/XP.png/revision/latest?cb=20221013231716' width='50'/><b>XP:</b>";
                    break;
                case 1:
                    realm = 'anti';
                    document.getElementById('LCCurrentRealmOutput').innerHTML = "<span style='color:#0000FF;font-weight:bold'>Anti Realm</span>";
                    document.getElementById('LCCurrentLevelTypeOutput').innerHTML = "<span style='color:#0000FF;font-weight:bold'>Anti Level</span>";
                    document.getElementById('LCGoalLevelTypeOutput').innerHTML = "<span style='color:#0000FF;font-weight:bold'>Anti Level</span>";
                    document.getElementById('LCRequirementTypeOutput').innerHTML = "<img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1a/XP.png/revision/latest?cb=20221013231716' width='50'/><b>XP:</b>";
                    break;
                case 2:
                    realm = 'unnatural';
                    document.getElementById('LCCurrentRealmOutput').innerHTML = "<span style='color:#9EEB00;font-weight:bold'>Unnatural Realm</span>";
                    document.getElementById('LCCurrentLevelTypeOutput').innerHTML = "<span style='color:#9EEB00;font-weight:bold'>Unnatural Level</span>";
                    document.getElementById('LCGoalLevelTypeOutput').innerHTML = "<span style='color:#9EEB00;font-weight:bold'>Unnatural Level</span>";
                    document.getElementById('LCRequirementTypeOutput').innerHTML = "<img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1a/XP.png/revision/latest?cb=20221013231716' width='50'/><b>XP:</b>";
                    break;
                case 3:
                    realm = 'planetoid';
                    document.getElementById('LCCurrentRealmOutput').innerHTML = "<span style='color:#8000FF;font-weight:bold'>Planetoid</span>";
                    document.getElementById('LCCurrentLevelTypeOutput').innerHTML = "<span style='color:#8000FF;font-weight:bold'>Planetoid Level</span>";
                    document.getElementById('LCGoalLevelTypeOutput').innerHTML = "<span style='color:#8000FF;font-weight:bold'>Planetoid Level</span>";
                    document.getElementById('LCRequirementTypeOutput').innerHTML = "<img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1f/Cosmic.png/revision/latest?cb=20220704040837' width='50'/><b>Cosmic:</b>";
            }
            document.getElementById('LCCurrentLevelOutput').innerHTML = '?';
            document.getElementById('LCGoalLevelOutput').innerHTML = '?';
            document.getElementById('LCRequirementOutput').innerHTML = '?';
        }

        // Get data from inputs.
        function getInputData() {
            if (document.getElementById("LCCurrentLevelInput").value === '' || toScientific(document.getElementById("LCCurrentLevelInput").value).lessThan(1)) {
                currentLevel = new Decimal(1);
            } else {
                currentLevel = toScientific(document.getElementById("LCCurrentLevelInput").value).floor();
            }
            if (document.getElementById("LCGoalLevelInput").value === '') {
                goalLevel = currentLevel.add(1);
            } else if (toScientific(document.getElementById("LCGoalLevelInput").value).lessThan(1)) {
                goalLevel = new Decimal(1);
            } else {
                goalLevel = toScientific(document.getElementById("LCGoalLevelInput").value).floor();
            }
        }

        // Update results.
        function updateResult() {
            updateSelectedRealm();
            getInputData();
            document.getElementById('LCCurrentLevelOutput').innerHTML = notateInt(currentLevel);
            document.getElementById('LCGoalLevelOutput').innerHTML = notateInt(goalLevel);
            // Function for calculating the requirement of a single level.
            function calcSingle(x) {
                x = new Decimal(x);
                if (x % 10 === 0) {
                    var timed = true;
                } else {
                    var timed = false;
                }
                var req = new Decimal(50).times(x);
                switch (realm) {
                    case 'planetoid':
                        req = req.times(new Decimal(1.093).pow(x.sub(1)));
                        req = req.times(new Decimal(1.8).pow(x.dividedBy(10).floor()));
                        if (x.greaterThan(200)) {
                            req = req.times(new Decimal(3).pow((x.sub(191)).dividedBy(10).floor()));
                        }
                        break;
                    default:
                        req = req.times(new Decimal(1.1).pow(x.sub(1)));
                        if (timed === true) {
                            req = req.dividedBy(10);
                        }
                        req = req.times(new Decimal(1.8).pow(x.dividedBy(10).floor()));
                        if (x.greaterThan(200)) {
                            req = req.times(new Decimal(3).pow((x.sub(191)).dividedBy(10).floor()));
                        }
                        if (realm === 'unnatural') {
                            req = req.times(1e9);
                            req = req.times(new Decimal(9).pow(x.dividedBy(10).floor()));
                        }
                }
                return req;
            }
            var currentReq = new Decimal(0);
            var goalReq = new Decimal(0);
            for (var i = 0; currentLevel.greaterThan(i); i++) {
                currentReq = currentReq.add(calcSingle(i));
            }
            for (var i = 0; goalLevel.greaterThan(i); i++) {
                goalReq = goalReq.add(calcSingle(i));
            }
            result = goalReq.sub(currentReq);
            if (result.lessThan(0)) {
                document.getElementById('LCRequirementOutput').innerHTML = '-' + notateInt(result.toString().replace(/[-]/, ''));
            } else {
                document.getElementById('LCRequirementOutput').innerHTML = notateInt(result);
            }
        }
        updateResult();

        // Add event listeners.
        document.getElementById('LCCurrentRealmSlider').addEventListener('input', updateSelectedRealm);
        document.getElementById('LCSuffixToggleButton').addEventListener('click', function() {
            if (suffixStatus === false) {
                suffixStatus = true;
            } else {
                suffixStatus = false;
            }
            window.localStorage.LevelCalculatorSuffixStatus = suffixStatus;
            updateSuffixStatus();
            document.getElementById('LCRequirementOutput').innerHTML = '<i>Calculating...</i>';
            updateResult();
        });
        document.getElementById('LCCalculateButton').addEventListener('click', function() {
            document.getElementById('LCRequirementOutput').innerHTML = '<i>Calculating...</i>';
            setTimeout(updateResult, 1);
        });

    } else {
        console.log('[Level Calculator] [LOG]: Failed to locate ID or calculator already exists. Cancelling script.');
    }
}
addLevelCalculator();