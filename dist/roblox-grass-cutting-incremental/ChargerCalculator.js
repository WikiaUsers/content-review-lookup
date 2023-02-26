// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:ChargerCalculator.js
function addChargerCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("ChargerCalculator") !== null && document.getElementById("ChargerCalculatorContainer") === null) {
        console.log("[Charger Calculator] [LOG]: ID located. Running script.");
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript'); // Import suffixes and suffixesLC arrays.

        // Create the calculator's user interface.
        const calculatorHTMLInputsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Inputs</span></div><br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9a/ChargeIcon.png/revision/latest?cb=20220520140339' width='50'/>Current Charge (<abbr title='Default value: 0.'>notes</abbr>): <input id='CCCurrentChargeInput' style='width:10%'/><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9a/ChargeIcon.png/revision/latest?cb=20220520140339' width='50'/>Desired Charge (<abbr title='Default value: 1.'>notes</abbr>): <input id='CCGoalChargeInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c6/Grasshop2.png/revision/latest?cb=20221017151752' width='50'/>Current Grasshop (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='CCCurrentGrasshopInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c6/Grasshop2.png/revision/latest?cb=20221017151752' width='50'/>Desired Grasshop (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='CCGoalGrasshopInput' style='width:10%'/></p>";
        const calculatorHTMLBonusesContainer = "<div id='CCChargerBonusesSection'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7e/Better_Steel_Icon.png/revision/latest?cb=20220704040519' width='50'/><b>Steel:</b> <span id='CCSteelCurrentOutput'>?</span>x > <span id='CCSteelNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1a/XP.png/revision/latest?cb=20221013231716' width='50'/><b>XP:</b> <span id='CCXPCurrentOutput'>?</span>x > <span id='CCXPNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1c/TP.png/revision/latest?cb=20221013231714' width='50'/><b>TP:</b> <span id='CCTPCurrentOutput'>?</span>x > <span id='CCTPNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/55/GrassIcon.png/revision/latest?cb=20220520140445' width='50'/><b>Grass:</b> <span id='CCGrassCurrentOutput'>?</span>x > <span id='CCGrassNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/b/b1/PrestigePointsIcon.png/revision/latest?cb=20220520143125' width='50'/><b>PP:</b> <span id='CCPPCurrentOutput'>?</span>x > <span id='CCPPNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7a/CrystalIcon.png/revision/latest?cb=20220520140356' width='50'/><b>Crystals:</b> <span id='CCCrystalsCurrentOutput'>?</span>x > <span id='CCCrystalsNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9b/AnonymityIcon.png/revision/latest?cb=20220520140320' width='50'/><b>AP:</b> <span id='CCAPCurrentOutput'>?</span>x > <span id='CCAPNextOutput'>?</span>x<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/b/b0/OilIcon.png/revision/latest?cb=20220520140507' width='50'/><b>Oil:</b> <span id='CCOilCurrentOutput'>?</span>x > <span id='CCOilNextOutput'>?</span>x</div>";
        const calculatorHTMLResultsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Result</span></div><div style='text-align:center'><br><button id='CCCalculateButton'>Calculate</button><br><br>With currently <span style='color:#FFFF00;font-weight:bold'><span id='CCCurrentChargeOutput'>?</span> Charge</span> and <span style='color:#999999;font-weight:bold'><span id='CCCurrentGrasshopOutput'>?</span> <span id='CCCurrentGrasshopPluralCheck'>Grasshops</span></span>, reaching <span style='color:#FFFF00;font-weight:bold'><span id='CCGoalChargeOutput'>?</span> Charge</span> and <span style='color:#999999;font-weight:bold'><span id='CCGoalGrasshopOutput'>?</span> <span id='CCGoalGrasshopPluralCheck'>Grasshops</span></span> will result in the following bonuses:<br>" + calculatorHTMLBonusesContainer + "</div>";
        document.getElementById("ChargerCalculator").innerHTML = "<div id='ChargerCalculatorContainer' class='templatedesktop' style='padding:1em;background:#B2B200;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='CCSuffixButton'>Disabled</button></div><div style='text-align:center;font-size:30px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/0/02/ChargerIcon.png/revision/latest?cb=20230103104634' width='150'/> Charger Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/0/02/ChargerIcon.png/revision/latest?cb=20230103104634' width='150'/></div><br>" + calculatorHTMLInputsContainer + calculatorHTMLResultsContainer + "</div></div>";

        // Variable and constant declarations.
        const errorText = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>"; // Text string used for HTML outputs in the event of an error.
        const milestones = [0, 1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e36] // Charge requirements to unlock each Charger milestone.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentCharge;
        var goalCharge;
        var currentGrasshop;
        var goalGrasshop;

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
                            result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "")).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "");
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
                result = checkNoDecimal(e.mantissa) + "e" + e.exponent; // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
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

        function updateResults() {
            if (document.getElementById("CCCurrentChargeInput").value === '' || toScientific(document.getElementById("CCCurrentChargeInput").value).lessThan(0)) {
                currentCharge = new Decimal(0);
            } else {
                currentCharge = decimalMin("1e325", toScientific(document.getElementById("CCCurrentChargeInput").value));
            }
            if (document.getElementById("CCGoalChargeInput").value === '' || toScientific(document.getElementById("CCGoalChargeInput").value).lessThan(1)) {
                goalCharge = new Decimal(1);
            } else {
                goalCharge = decimalMin("1e325", toScientific(document.getElementById("CCGoalChargeInput").value));
            }
            if (document.getElementById("CCCurrentGrasshopInput").value === '' || toScientific(document.getElementById("CCCurrentGrasshopInput").value).lessThan(0)) {
                currentGrasshop = new Decimal(0);
            } else {
                currentGrasshop = toScientific(document.getElementById("CCCurrentGrasshopInput").value).floor();
            }
            if (document.getElementById("CCGoalGrasshopInput").value === '' || toScientific(document.getElementById("CCGoalGrasshopInput").value).lessThan(0)) {
                goalGrasshop = new Decimal(0);
            } else {
                goalGrasshop = toScientific(document.getElementById("CCGoalGrasshopInput").value).floor();
            }
            const gh30CurrentEffect = 1.1 ** decimalMin(31, decimalMax(currentGrasshop.sub(29), 0));
            const gh30NextEffect = 1.1 ** decimalMin(31, decimalMax(goalGrasshop.sub(29), 0));
            const lessZeroesCurrent = decimalMin(1e308, decimalMin(1, decimalMax(currentGrasshop.sub(12), 0)).add(decimalMin(1, decimalMax(currentGrasshop.sub(13), 0))).add(decimalMin(1, decimalMax(currentGrasshop.sub(15), 0))).add(decimalMax(currentGrasshop.sub(17), 0)));
            const lessZeroesNext = decimalMin(1e308, decimalMin(1, decimalMax(goalGrasshop.sub(12), 0)).add(decimalMin(1, decimalMax(goalGrasshop.sub(13), 0))).add(decimalMin(1, decimalMax(goalGrasshop.sub(15), 0))).add(decimalMax(goalGrasshop.sub(17), 0)));

            // Update the HTML outputs.
            document.getElementById("CCChargerBonusesSection").innerHTML = calculatorHTMLBonusesContainer;
            if (currentCharge.equals("1e325")) {
                document.getElementById("CCCurrentChargeOutput").innerHTML = notateInt("1e325") + "<sup>(softcapped)</sup>";
            } else {
                document.getElementById("CCCurrentChargeOutput").innerHTML = notateInt(currentCharge);
            }
            if (goalCharge.equals("1e325")) {
                document.getElementById("CCGoalChargeOutput").innerHTML = notateInt("1e325") + "<sup>(softcapped)</sup>";
            } else {
                document.getElementById("CCGoalChargeOutput").innerHTML = notateInt(goalCharge);
            }
            document.getElementById("CCCurrentGrasshopOutput").innerHTML = notateInt(currentGrasshop);
            document.getElementById("CCGoalGrasshopOutput").innerHTML = notateInt(goalGrasshop);
            document.getElementById("CCCurrentGrasshopPluralCheck").innerHTML = checkPlural(currentGrasshop, "Grasshop", "Grasshops");
            document.getElementById("CCGoalGrasshopPluralCheck").innerHTML = checkPlural(goalGrasshop, "Grasshop", "Grasshops");
            if (goalCharge.lessThan(currentCharge) || goalGrasshop.lessThan(currentGrasshop)) {
                document.getElementById("CCChargerBonusesSection").innerHTML = errorText;
            } else {
                function setBonusesOutput(curr, pos) {
                    if (goalCharge.greaterThanOrEqualTo(milestones[pos])) {
                        document.getElementById("CC" + curr + "NextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[pos]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                    } else {
                        document.getElementById("CC" + curr + "NextOutput").innerHTML = "1";
                    }
                    if (currentCharge.greaterThanOrEqualTo(milestones[pos])) {
                        document.getElementById("CC" + curr + "CurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[pos]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                    } else {
                        document.getElementById("CC" + curr + "CurrentOutput").innerHTML = "1";
                    }
                }
                setBonusesOutput("Steel", 0);
                setBonusesOutput("XP", 1);
                setBonusesOutput("TP", 2);
                setBonusesOutput("Grass", 3);
                setBonusesOutput("PP", 4);
                setBonusesOutput("Crystals", 5);
                setBonusesOutput("AP", 6);
                setBonusesOutput("Oil", 7);
            }
        }

        // Add event listeners to the calculate and suffix toggle buttons.
        document.getElementById("CCCalculateButton").addEventListener("click", updateResults);
        document.getElementById("CCSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("CCSuffixButton").innerHTML = "Enabled";
                document.getElementById("CCSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("CCSuffixButton").innerHTML = "Disabled";
                document.getElementById("CCSuffixButton").setAttribute("style", "background:#FF0000");
            }
            updateResults();
        });
        updateResults();

    } else {
        console.log("[Charger Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addChargerCalculator();
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:ChargerCalculator.js