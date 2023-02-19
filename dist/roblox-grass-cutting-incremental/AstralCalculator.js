// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:AstralCalculator.js



function addAstralCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("AstralCalculator") !== null && document.getElementById("AstralCalculatorContainer") === null) {
        console.log("[Astral Calculator] [LOG]: ID located. Running script.");
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript'); // Import suffixes and suffixesLC arrays.

        // Create the calculator's user interface.
        const calculatorHTMLPrimaryStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Main Statistics</span></div><br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Current Astral (<abbr title='Default value: 1.'>notes</abbr>): <input id='ACCurrentAstralInput' style='width:10%'/><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Desired Astral (<abbr title='Default value: 2.'>notes</abbr>): <input id='ACGoalAstralInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/a/ac/Current_Astral_Prestige.png/revision/latest?cb=20221217090120' width='50'/>Current Astral Prestige (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='ACCurrentAstralPrestigeInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7b/Space_Points.png/revision/latest?cb=20220606225831' width='50'/>SP gain per grass cut (<abbr title='This value is according to the Stats Menu, and in-game there is currently a bug where it does not correctly visually output the bonus when at Tier 58+.'>notes</abbr>): <input id='ACSPGainInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Percentage until next Astral (<abbr title='(n1) Optional. (n2) Input any value ranging from 0 to 100, without the percentage symbol. (n3) Default value: 0%.'>notes</abbr>): <input id='ACNextAstralCompletionInput' style='width:10%'/>%</p>";
        const calculatorHTMLManualCuttingStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Manual Cutting Statistics</span></div><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9a/Manual_Grass_Cutting_Rate.png/revision/latest?cb=20221124065404' width='50'/>Manual grass cut per second (<abbr title='Leave blank if not manually cutting grass.'>notes</abbr>): <input id='ACManualCuttingRateInput' width='10%'/></p>";
        const calculatorHTMLAutocutStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Autocut Statistics</span></div><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/0/01/Autocut_Rate.png/revision/latest?cb=20221124065411' width='50'/>Autocut rate (<abbr title='(n1) Default value: 0. (n2) Input interval in seconds, such as 0.5 for 2 per second. (n3) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutRateInput' width='10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/2/20/Autocut_Amount.png/revision/latest?cb=20221124065408' width='50'/>Autocut amount (<abbr title='(n1) Default value: 1. (n2) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutAmountInput' width='10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c7/Autocut_Value.png/revision/latest?cb=20221124065409' width='50'/>Autocut value (<abbr title='(n1) Default value: 1. (n2) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutValueInput' width='10%'/></p>";
        const calculatorHTMLResultsAstralBonusesContainer = "<br><br><br><div>Your Astral Bonuses will also become (<u><span id='ACAstralBonusesSectionToggle'>click to toggle</span></u> section visibility):<br><div id='ACAstralBonusesSection' style='display:none'><p>[Standard] PP increase: x<span id='ACAstralBonusPPBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusPPBonusNextOutput'>?</span></p><p>[Standard] Crystal bonus: x<span id='ACAstralBonusCrystalBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusCrystalBonusNextOutput'>?</span></p><p>[Standard] Platinum worth: +<span id='ACAstralBonusPlatinumWorthCurrentOutput'>?</span> > +<span id='ACAstralBonusPlatinumWorthNextOutput'>?</span></p><p>[Standard] Steel multiplier: x<span id='ACAstralBonusSteelMultiplierCurrentOutput'>?</span> > x<span id='ACAstralBonusSteelMultiplierNextOutput'>?</span></p><p>[AGH 28GH] Grass bonus: x<span id='ACAstralBonusGrassBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusGrassBonusNextOutput'>?</span></p><p>[AGH 25GH] XP bonus: x<span id='ACAstralBonusXPBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusXPBonusNextOutput'>?</span></p><p>[AGH 22GH] TP bonus: x<span id='ACAstralBonusTPBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusTPBonusNextOutput'>?</span></p><p>[AGH 19GH] Stars bonus: x<span id='ACAstralBonusStarsBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusStarsBonusNextOutput'>?</span></p><p>[AGH 16GH] Moonstone bonus: +<span id='ACAstralBonusMoonstoneBonusCurrentOutput'>?</span> > +<span id='ACAstralBonusMoonstoneBonusNextOutput'>?</span></p><p>[AGH 13GH] Charge bonus: x<span id='ACAstralBonusChargeBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusChargeBonusNextOutput'>?</span></p><p>[AGH 10GH] SFRGT bonus: x<span id='ACAstralBonusSFRGTBonusCurrentOutput'>?</span> > x<span id='ACAstralBonusSFRGTBonusNextOutput'>?</span></p><p id='ACAstralBonusDarkMatterBonusContainer' style='display:none'>[ASP 1] Dark Matter bonus: x<span id='ACAstralBonusDarkMatterBonusOutput'>?</span></p><p id='ACAstralBonusNPBonusContainer' style='display:none'>[ASP 2] NP bonus: x<span id='ACAstralBonusNPBonusOutput'>?</span></p><p id='ACAstralBonusRingsBonusContainer' style='display:none'>[ASP 3] Rings bonus: x<span id='ACAstralBonusRingsBonusOutput'>?</span></p><p id='ACAstralBonusDarkFruitsAmountBonusContainer' style='display:none'>[ASP 4] Dark Fruits Amount bonus: x<span id='ACAstralBonusDarkFruitsAmountBonusOutput'>?</span></p><p id='ACAstralBonusLunarPowerBonusContainer' style='display:none'>[ASP 5] Lunar Power bonus: x<span id='ACAstralBonusLunarPowerBonusOutput'>?</span></p><p id='ACAstralBonusArcsBonusContainer' style='display:none'>[ASP 6] Arcs bonus: x<span id='ACAstralBonusArcsBonusOutput'>?</span></p><p id='ACAstralBonusStardustBonusContainer' style='display:none'>[ASP 7] Stardust bonus: x<span id='ACAstralBonusStardustBonusOutput'>?</span></p><p id='ACAstralBonusSolarFlareBonusContainer' style='display:none'>[ASP 8] Solar Flare bonus: x<span id='ACAstralBonusSolarFlareBonusOutput'>?</span></p><p id='ACAstralBonusPrestigePointsBonusContainer' style='display:none'>[ASP 9] Prestige Points bonus: +<span id='ACAstralBonusPrestigePointsBonusOutput'>?</span>% (equal to a multiplier of <span id='ACAstralBonusPrestigePointsBonusSecondaryOutput'>?</span>x)</p></div>";
        const calculatorHTMLResultsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Result</span></div><div style='text-align:center'><br><button id='ACCalculateButton'>Calculate</button><br><br>At Astral <span id='ACCurrentAstralOutput'>?</span> and Astral Prestige <span id='ACCurrentAstralPrestigeOutput'>?</span>, when currently <span id='ACNextAstralCompletionOutput'>?</span>% to next Astral, the requirements to reach Astral <span id='ACGoalAstralOutput'>?</span> are:<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7b/Space_Points.png/revision/latest?cb=20220606225831' width='50'/><b>Space Power:</b> <span id='ACSPReqOutput'>?</span><br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/94/Speed.png/revision/latest?cb=20221012064310' width='50'/><b>Time:</b> <span id='ACTimeReqOutput'>?</span> (<u><span id='ACTimeNamesSectionToggle'>click to toggle</span></u> time name meanings)<br><div id='ACTimeNamesSection' style='display:none'><p>1 second = 1 second</p><p>1 minute = 60 seconds</p><p>1 hour = 60 minutes</p><p>1 day = 24 hours</p><p>1 week = 7 days</p><p>1 month = ~4.348 weeks</p><p>1 year = 12 months</p><p>1 decade = 10 years</p><p>1 century = 10 decades</p><p>1 millennium = 10 centuries</p><p>1 age of the universe = <span id='ACTimeNameMeaningAOTU'>1.3787e7</span> millennia</p><p>1 stelliferous era = ~7,253 ages of the universe</p><p>1 degenerate era = <span id='ACTimeNameMeaningDegenerateEra'>1e12</span> stelliferous eras</p><p>1 black hole era = <span id='ACTimeNameMeaningBlackHoleEra'>1e17</span> degenerate eras</p><p>1 dark era = <span id='ACTimeNameMeaningDarkEra'>1e57</span> black hole eras</p><p>1 valve time = ~<span id='ACTimeNameMeaningValveTime'>3.168e192</span> dark eras</p><p>1 GCI update development period = <span id='ACTimeNameMeaningGCIUpdateDevelopmentPeriod'>1e700</span> valve times</p><p>1 eternity = <span id='ACTimeNameMeaningEternity'>1e999,000</span> GCI update development periods</p></div><br><br><b>Highest time name:</b> <span id='ACYearsOnlyButtonOutput'>Years</span> (<u><span id='ACYearsOnlyButton'>click to toggle</span></u>)" + calculatorHTMLResultsAstralBonusesContainer + "</div>";
        document.getElementById("AstralCalculator").innerHTML = "<div id='AstralCalculatorContainer' class='templatedesktop' style='padding:1em;background:#A629FF;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='ACSuffixButton'>Disabled</button></div><div style='text-align:center;font-size:30px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='150'/> Astral Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='150'/></div><br>" + calculatorHTMLPrimaryStatisticsContainer + calculatorHTMLManualCuttingStatisticsContainer + calculatorHTMLAutocutStatisticsContainer + calculatorHTMLResultsContainer + "</div></div>";

        // Variable and constant declarations.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var onlyYearsStatus = true; // Determines whether to display time names above years or only years.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentAstral;
        var goalAstral;
        var currentAstralPrestige;
        var spacePower;
        var nextAstralCompletion;
        var manualCuttingRate;
        var totalCuttingRate;
        var totalSPGain;
        var autocutRate;
        var autocutAmount;
        var autocutValue;
        var totalSPReq;
        var timeReq;

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
                    if (Math.floor(x.mantissa) == new Decimal(x.mantissa).toStringWithDecimalPlaces(5)) {
                        if (x.greaterThanOrEqualTo(1e3)) {
                            result = Math.floor(new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals)) + "e" + x.exponent;
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

        var maxTimeNames = 3; // Determines the maximum number of time names to be outputted. Lower numbers may cause inaccuracies.
        const timeUnits = ["1", "60", "3.6e3", "8.64e4", "6.048e5", "2.6298e6", "3.15576e7", "3.15576e8", "3.15576e9", "3.15576e10", "4.350846312e17", "3.15576e21", "3.15576e33", "3.15576e50", "3.15576e107", "1e300", "1e1e3", "1e1e6"];
        const timeNames = ["Second", "Minute", "Hour", "Day", "Week", "Month", "Year", "Decade", "Century", "Millennium", "Age of the Universe", "Stelliferous Era", "Degenerate Era", "Black Hole Era", "Dark Era", "Valve Time", "GCI Update Development Period", "Eternity"];
        const timeNamesPlural = ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years", "Decades", "Centuries", "Millennia", "Ages of the Universe", "Stelliferous Eras", "Degenerate Eras", "Black Hole Eras", "Dark Eras", "Valve Times", "GCI Update Development Periods", "Eternities"];

        function secondsToTime(input) { // Convert seconds to time names.
            input = new Decimal(input);

            function modOp(x, y) { // Custom modulo operation function to support >1.797e308 numbers.
                x = new Decimal(x);
                y = new Decimal(y);
                if (x.lessThan(1.797693134862315e308) && y.lessThan(1.797693134862315e308)) {
                    result = x % y;
                } else {
                    result = x.sub(x.dividedBy(y).floor().times(y));
                }
                return new Decimal(result);
            }
            // The following require the OYT (Only Years Toggle) disabled.
            if (onlyYearsStatus === false) {
                var eternities = new Decimal(input.dividedBy(new Decimal(timeUnits[17]))).floor();

                var gciudpsDiv = new Decimal(modOp(input, timeUnits[17]));
                var gciudps = new Decimal(gciudpsDiv.dividedBy(new Decimal(timeUnits[16]))).floor();

                var valvetimesDiv = new Decimal(modOp(input, timeUnits[16]));
                var valvetimes = new Decimal(valvetimesDiv.dividedBy(new Decimal(timeUnits[15]))).floor();

                var darkerasDiv = new Decimal(modOp(input, timeUnits[15]));
                var darkeras = new Decimal(darkerasDiv.dividedBy(new Decimal(timeUnits[14]))).floor();

                var blackholeerasDiv = new Decimal(modOp(input, timeUnits[14]));
                var blackholeeras = new Decimal(blackholeerasDiv.dividedBy(new Decimal(timeUnits[13]))).floor();

                var degenerateerasDiv = new Decimal(modOp(input, timeUnits[13]));
                var degenerateeras = new Decimal(degenerateerasDiv.dividedBy(new Decimal(timeUnits[12]))).floor();

                var stelliferouserasDiv = new Decimal(modOp(input, timeUnits[12]));
                var stelliferouseras = new Decimal(stelliferouserasDiv.dividedBy(new Decimal(timeUnits[11]))).floor();

                var aotu = new Decimal(modOp(input, timeUnits[11]));
                var aotu = new Decimal(aotu.dividedBy(new Decimal(timeUnits[10]))).floor();

                var millenniaDiv = new Decimal(modOp(input, timeUnits[10]));
                var millennia = new Decimal(millenniaDiv.dividedBy(new Decimal(timeUnits[9]))).floor();

                var centuriesDiv = new Decimal(modOp(input, timeUnits[9]));
                var centuries = new Decimal(centuriesDiv.dividedBy(new Decimal(timeUnits[8]))).floor();

                var decadesDiv = new Decimal(modOp(input, timeUnits[8]));
                var decades = new Decimal(decadesDiv.dividedBy(new Decimal(timeUnits[7]))).floor();
            }

            if (onlyYearsStatus === true) {
                var years = new Decimal(input.dividedBy(new Decimal(timeUnits[6]))).floor();
            } else {
                var yearsDiv = new Decimal(modOp(input, timeUnits[7]));
                var years = new Decimal(yearsDiv.dividedBy(new Decimal(timeUnits[6]))).floor();
            }

            var monthDiv = new Decimal(modOp(input, timeUnits[6]));
            var months = new Decimal(monthDiv.dividedBy(new Decimal(timeUnits[5]))).floor();

            var weekDiv = new Decimal(modOp(input, timeUnits[5]));
            var weeks = new Decimal(weekDiv.dividedBy(new Decimal(timeUnits[4]))).floor();

            var dayDiv = new Decimal(modOp(input, timeUnits[4]));
            var days = new Decimal(dayDiv.dividedBy(new Decimal(timeUnits[3]))).floor();

            var hourDiv = new Decimal(modOp(input, timeUnits[3]));
            var hours = new Decimal(hourDiv.dividedBy(new Decimal(timeUnits[2]))).floor();

            var minuteDiv = new Decimal(modOp(input, timeUnits[2]));
            var minutes = new Decimal(minuteDiv.dividedBy(new Decimal(timeUnits[1]))).floor();

            var secondDiv = new Decimal(modOp(minuteDiv, timeUnits[1]));
            var seconds = new Decimal(secondDiv.toStringWithDecimalPlaces(decimals));

            var obj = {
                "e": eternities,
                "gciupd": gciudps,
                "vt": valvetimes,
                "daera": darkeras,
                "bhera": blackholeeras,
                "dera": degenerateeras,
                "sera": stelliferouseras,
                "aotu": aotu,
                "mi": millennia,
                "c": centuries,
                "de": decades,
                "y": years,
                "mo": months,
                "w": weeks,
                "d": days,
                "h": hours,
                "m": minutes,
                "s": seconds
            };
            return obj;
        }

        function checkPlural(timeAmount, timeUnit) { // Return either a singular or plural string.
            if (Number(timeAmount) == 1) {
                result = timeNames[timeUnit];
            } else {
                result = timeNamesPlural[timeUnit];
            }
            return result;
        }

        function outputTime(e) { // Return the time output as a string, separated by commas.
            const $a = [];

            function addNewTime(x) {
                $a.push(x);
            }
            e = new Decimal(e);
            // The following require the OYT (Only Years Toggle) disabled.
            if (onlyYearsStatus === false) {
                if (secondsToTime(e).e.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).e) + " " + checkPlural(secondsToTime(e).e, 17));
                }

                if (secondsToTime(e).gciupd.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).gciupd) + " " + checkPlural(secondsToTime(e).gciupd, 16));
                }

                if (secondsToTime(e).vt.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).vt) + " " + checkPlural(secondsToTime(e).vt, 15));
                }

                if (secondsToTime(e).daera.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).daera) + " " + checkPlural(secondsToTime(e).daera, 14));
                }

                if (secondsToTime(e).bhera.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).bhera) + " " + checkPlural(secondsToTime(e).bhera, 13));
                }

                if (secondsToTime(e).dera.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).dera) + " " + checkPlural(secondsToTime(e).dera, 12));
                }

                if (secondsToTime(e).sera.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).sera) + " " + checkPlural(secondsToTime(e).sera, 11));
                }

                if (secondsToTime(e).aotu.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).aotu) + " " + checkPlural(secondsToTime(e).aotu, 10));
                }

                if (secondsToTime(e).mi.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).mi) + " " + checkPlural(secondsToTime(e).mi, 9));
                }

                if (secondsToTime(e).c.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).c) + " " + checkPlural(secondsToTime(e).c, 8));
                }

                if (secondsToTime(e).de.greaterThan(0)) {
                    addNewTime(notateInt(secondsToTime(e).de) + " " + checkPlural(secondsToTime(e).de, 7));
                }
            }

            if (secondsToTime(e).y > 0) {
                addNewTime(notateInt(secondsToTime(e).y) + " " + checkPlural(secondsToTime(e).y, 6));
            }

            if (secondsToTime(e).mo > 0) {
                addNewTime(secondsToTime(e).mo + " " + checkPlural(secondsToTime(e).mo, 5));
            }
            if (secondsToTime(e).w > 0) {
                addNewTime(secondsToTime(e).w + " " + checkPlural(secondsToTime(e).w, 4));
            }
            if (secondsToTime(e).d > 0) {
                addNewTime(secondsToTime(e).d + " " + checkPlural(secondsToTime(e).d, 3));
            }
            if (secondsToTime(e).h > 0) {
                addNewTime(secondsToTime(e).h + " " + checkPlural(secondsToTime(e).h, 2));
            }
            if (secondsToTime(e).m > 0) {
                addNewTime(secondsToTime(e).m + " " + checkPlural(secondsToTime(e).m, 1));
            }
            if (secondsToTime(e).s > 0) {
                addNewTime(secondsToTime(e).s + " " + checkPlural(secondsToTime(e).s, 0));
            }

            $a.splice(maxTimeNames, $a.length - maxTimeNames);
            return $a.join(', ');
        }

        function getInputData() { // Get user values from inputs and interpret them as a Decimal scientific notation number.
            if (document.getElementById("ACCurrentAstralInput").value === '' || toScientific(document.getElementById("ACCurrentAstralInput").value).lessThan(1)) {
                currentAstral = new Decimal(1);
            } else {
                currentAstral = toScientific(document.getElementById("ACCurrentAstralInput").value).floor();
            }
            if (document.getElementById("ACGoalAstralInput").value === '' || toScientific(document.getElementById("ACGoalAstralInput").value).lessThan(2)) {
                goalAstral = new Decimal(2);
            } else {
                goalAstral = toScientific(document.getElementById("ACGoalAstralInput").value).floor();
            }
            if (document.getElementById("ACCurrentAstralPrestigeInput").value === '' || toScientific(document.getElementById("ACCurrentAstralPrestigeInput").value).lessThan(0)) {
                currentAstralPrestige = new Decimal(0);
            } else {
                currentAstralPrestige = toScientific(document.getElementById("ACCurrentAstralPrestigeInput").value).floor();
            }
            if (document.getElementById("ACSPGainInput").value === '' || toScientific(document.getElementById("ACSPGainInput").value).lessThan(1)) {
                spacePower = new Decimal(1);
            } else {
                spacePower = toScientific(document.getElementById("ACSPGainInput").value).floor();
            }
            if (document.getElementById("ACNextAstralCompletionInput").value === '' || toScientific(document.getElementById("ACNextAstralCompletionInput").value).lessThan(0)) {
                nextAstralCompletion = new Decimal(0);
            } else if (toScientific(document.getElementById("ACNextAstralCompletionInput").value).greaterThanOrEqualTo(100)) {
                nextAstralCompletion = new Decimal(100);
            } else {
                nextAstralCompletion = toScientific(document.getElementById("ACNextAstralCompletionInput").value);
            }
            if (document.getElementById("ACManualCuttingRateInput").value === '' || toScientific(document.getElementById("ACManualCuttingRateInput").value).lessThan(0)) {
                manualCuttingRate = new Decimal(0);
            } else {
                manualCuttingRate = toScientific(document.getElementById("ACManualCuttingRateInput").value);
            }
            if (document.getElementById("ACAutocutRateInput").value === '' || toScientific(document.getElementById("ACAutocutRateInput").value).lessThan(0)) {
                autocutRate = new Decimal(0);
            } else {
                autocutRate = toScientific(document.getElementById("ACAutocutRateInput").value);
            }
            if (document.getElementById("ACAutocutAmountInput").value === '' || toScientific(document.getElementById("ACAutocutAmountInput").value).lessThan(1)) {
                autocutAmount = new Decimal(1);
            } else {
                autocutAmount = toScientific(document.getElementById("ACAutocutAmountInput").value).floor();
            }
            if (document.getElementById("ACAutocutValueInput").value === '' || toScientific(document.getElementById("ACAutocutValueInput").value).lessThan(1)) {
                autocutValue = new Decimal(1);
            } else {
                autocutValue = toScientific(document.getElementById("ACAutocutValueInput").value).floor();
            }
        }

        // Update the results, including but not limited to the SP and time requirements.
        function updateResults() {
            getInputData();
            var baseReq = new Decimal(10).pow((new Decimal(10).times(currentAstralPrestige)).plus(2));
            var multi = new Decimal(2).plus(new Decimal(0.1).times(currentAstralPrestige));

            function setErrorTexts() { // Set the HTML texts for SP and time requirements to their respective final requirements. Set infinity texts if the value is Infinity, -Infinity or NaN.
                const errorText = "<span class='rainbow'>To infinity and beyond!</span><sup style='font-size:10px'><abbr title='This is an error message.'>(?)</abbr></sup>";
                if (totalSPReq.lessThan(0) || totalSPReq.greaterThanOrEqualTo("(e^1e308)308") || currentAstral.greaterThan(goalAstral)) {
                    document.getElementById("ACSPReqOutput").innerHTML = errorText;
                    document.getElementById("ACTimeReqOutput").innerHTML = errorText;
                } else {
                    document.getElementById("ACSPReqOutput").innerHTML = notateInt(totalSPReq);
                    document.getElementById("ACTimeReqOutput").innerHTML = outputTime(timeReq);
                }
                if (isNaN(timeReq)) {
                    document.getElementById("ACTimeReqOutput").innerHTML = "A long time from now in a calculator far, far away...";
                }
            }

            // Update HTML texts for inputted values.
            document.getElementById("ACCurrentAstralOutput").innerHTML = notateInt(currentAstral);
            document.getElementById("ACGoalAstralOutput").innerHTML = notateInt(goalAstral);
            document.getElementById("ACCurrentAstralPrestigeOutput").innerHTML = notateInt(currentAstralPrestige);
            document.getElementById("ACNextAstralCompletionOutput").innerHTML = notateInt(nextAstralCompletion);
            if (new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1))).greaterThanOrEqualTo("1e1e16")) {
                totalSPReq = new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1)));
            } else {
                totalSPReq = new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1)).sub((baseReq.times(multi.pow((currentAstral.sub(1))))).dividedBy(multi.sub(1)))).sub(baseReq.times(multi.pow(currentAstral.sub(1))).times(nextAstralCompletion.times(0.01)));
            }
            if (manualCuttingRate.equals(0) && autocutRate.greaterThan(0)) {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).dividedBy(autocutRate).times(autocutAmount).times(autocutValue)));
            } else if (manualCuttingRate.greaterThan(0) && autocutRate.equals(0)) {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).times(manualCuttingRate)));
            } else {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).times(manualCuttingRate).add(new Decimal(1).dividedBy(autocutRate).times(autocutAmount).times(autocutValue))));
            }
            if (isNaN(totalSPGain)) {
                totalSPGain = new Decimal(1);
            }
            timeReq = totalSPReq.dividedBy(totalSPGain);
            setErrorTexts();
            if (timeReq.lessThan(1e-3)) {
                document.getElementById("ACTimeReqOutput").innerHTML = "Less than 1 Millisecond";
            }

            // Update Astral Bonuses.
            document.getElementById("ACAstralBonusPPBonusCurrentOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(1.4).pow((new Decimal(100).times(currentAstralPrestige)).add(currentAstral.sub(1)))));
            document.getElementById("ACAstralBonusPPBonusNextOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(1.4).pow((new Decimal(100).times(currentAstralPrestige)).add(goalAstral.sub(1)))));
            document.getElementById("ACAstralBonusCrystalBonusCurrentOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(1.1).pow((new Decimal(100).times(currentAstralPrestige)).add(currentAstral.sub(1)))));
            document.getElementById("ACAstralBonusCrystalBonusNextOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(1.1).pow((new Decimal(100).times(currentAstralPrestige)).add(goalAstral.sub(1)))));
            document.getElementById("ACAstralBonusPlatinumWorthCurrentOutput").innerHTML = notateInt(currentAstral.dividedBy(2).times(new Decimal(5).pow(currentAstralPrestige)).sub(1));
            document.getElementById("ACAstralBonusPlatinumWorthNextOutput").innerHTML = notateInt(goalAstral.dividedBy(2).times(new Decimal(5).pow(currentAstralPrestige)).sub(1));
            document.getElementById("ACAstralBonusSteelMultiplierCurrentOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral));
            document.getElementById("ACAstralBonusSteelMultiplierNextOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral));
            document.getElementById("ACAstralBonusGrassBonusCurrentOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral).add(1));
            document.getElementById("ACAstralBonusGrassBonusNextOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral).add(1));
            document.getElementById("ACAstralBonusXPBonusCurrentOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral).add(1));
            document.getElementById("ACAstralBonusXPBonusNextOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral).add(1));
            document.getElementById("ACAstralBonusTPBonusCurrentOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral).add(1));
            document.getElementById("ACAstralBonusTPBonusNextOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral).add(1));
            document.getElementById("ACAstralBonusStarsBonusCurrentOutput").innerHTML = notateInt(new Decimal(0.1).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral).add(1));
            document.getElementById("ACAstralBonusStarsBonusNextOutput").innerHTML = notateInt(new Decimal(0.1).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral).add(1));
            document.getElementById("ACAstralBonusMoonstoneBonusCurrentOutput").innerHTML = notateInt(new Decimal(5).pow(currentAstralPrestige).times(currentAstral));
            document.getElementById("ACAstralBonusMoonstoneBonusNextOutput").innerHTML = notateInt(new Decimal(5).pow(currentAstralPrestige).times(goalAstral));
            document.getElementById("ACAstralBonusChargeBonusCurrentOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(currentAstral).add(1));
            document.getElementById("ACAstralBonusChargeBonusNextOutput").innerHTML = notateInt(new Decimal(0.25).times(new Decimal(5).pow(currentAstralPrestige)).times(goalAstral).add(1));
            document.getElementById("ACAstralBonusSFRGTBonusCurrentOutput").innerHTML = notateInt(new Decimal(2).pow(new Decimal(100).times(currentAstralPrestige).add(decimalMin(82, decimalMax(0, currentAstral.sub(18))))));
            document.getElementById("ACAstralBonusSFRGTBonusNextOutput").innerHTML = notateInt(new Decimal(2).pow(new Decimal(100).times(currentAstralPrestige).add(decimalMin(82, decimalMax(0, goalAstral.sub(18))))));
            if (currentAstralPrestige.greaterThan(0)) {
                document.getElementById("ACAstralBonusDarkMatterBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusDarkMatterBonusOutput").innerHTML = notateInt(new Decimal(25).pow(currentAstralPrestige));
            } else {
                document.getElementById("ACAstralBonusDarkMatterBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(1)) {
                document.getElementById("ACAstralBonusNPBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusNPBonusOutput").innerHTML = notateInt(new Decimal(10).pow(currentAstralPrestige.sub(1)));
            } else {
                document.getElementById("ACAstralBonusNPBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(2)) {
                document.getElementById("ACAstralBonusRingsBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusRingsBonusOutput").innerHTML = notateInt(new Decimal(5).pow(currentAstralPrestige.sub(2)));
            } else {
                document.getElementById("ACAstralBonusRingsBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(3)) {
                document.getElementById("ACAstralBonusDarkFruitsAmountBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusDarkFruitsAmountBonusOutput").innerHTML = notateInt(new Decimal(3).pow(currentAstralPrestige.sub(3)));
            } else {
                document.getElementById("ACAstralBonusDarkFruitsAmountBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(4)) {
                document.getElementById("ACAstralBonusLunarPowerBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusLunarPowerBonusOutput").innerHTML = notateInt(new Decimal(3).pow(currentAstralPrestige.sub(4)));
            } else {
                document.getElementById("ACAstralBonusLunarPowerBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(5)) {
                document.getElementById("ACAstralBonusArcsBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusArcsBonusOutput").innerHTML = notateInt(new Decimal(5).pow(currentAstralPrestige.sub(5)));
            } else {
                document.getElementById("ACAstralBonusArcsBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(6)) {
                document.getElementById("ACAstralBonusStardustBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusStardustBonusOutput").innerHTML = notateInt(new Decimal(5).pow(currentAstralPrestige.sub(6)));
            } else {
                document.getElementById("ACAstralBonusStardustBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(7)) {
                document.getElementById("ACAstralBonusSolarFlareBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusSolarFlareBonusOutput").innerHTML = notateInt(new Decimal(3).pow(currentAstralPrestige.sub(7)));
            } else {
                document.getElementById("ACAstralBonusSolarFlareBonusContainer").setAttribute("style", "display:none");
            }
            if (currentAstralPrestige.greaterThan(8)) {
                document.getElementById("ACAstralBonusPrestigePointsBonusContainer").setAttribute("style", "display:block");
                document.getElementById("ACAstralBonusPrestigePointsBonusOutput").innerHTML = notateInt(new Decimal(10).pow(currentAstralPrestige.sub(7)));
                document.getElementById("ACAstralBonusPrestigePointsBonusSecondaryOutput").innerHTML = notateInt(new Decimal(10).pow(currentAstralPrestige.sub(7)).dividedBy(100).add(1));
            } else {
                document.getElementById("ACAstralBonusPrestigePointsBonusContainer").setAttribute("style", "display:none");
            }

            // Update time name meanings.
            document.getElementById("ACTimeNameMeaningAOTU").innerHTML = notateInt(1.3787e7);
            document.getElementById("ACTimeNameMeaningDegenerateEra").innerHTML = notateInt(1e12);
            document.getElementById("ACTimeNameMeaningBlackHoleEra").innerHTML = notateInt(1e17);
            document.getElementById("ACTimeNameMeaningDarkEra").innerHTML = notateInt(1e57);
            document.getElementById("ACTimeNameMeaningValveTime").innerHTML = notateInt(3.168e192);
            document.getElementById("ACTimeNameMeaningGCIUpdateDevelopmentPeriod").innerHTML = notateInt("1e700");
            document.getElementById("ACTimeNameMeaningEternity").innerHTML = notateInt("1e999,000");
        }

        // Set calculating text for a particular HTML requirement or both, depending on the value of the parameter.
        function setCalculatingText(e) {
            const calculatingText = "<i>Calculating...</i>";
            if (e === "SP") {
                document.getElementById("ACSPReqOutput").innerHTML = calculatingText;
            } else if (e === "Time") {
                document.getElementById("ACTimeReqOutput").innerHTML = calculatingText;
            } else {
                document.getElementById("ACSPReqOutput").innerHTML = calculatingText;
                document.getElementById("ACTimeReqOutput").innerHTML = calculatingText;
            }
        }

        // Add click event listeners to the calculate, suffix toggle, years-only toggle and Astral Bonuses and time name meanings sections toggle buttons.
        document.getElementById("ACCalculateButton").addEventListener("click", updateResults);
        document.getElementById("ACSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("ACSuffixButton").innerHTML = "Enabled";
                document.getElementById("ACSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("ACSuffixButton").innerHTML = "Disabled";
                document.getElementById("ACSuffixButton").setAttribute("style", "background:#FF0000");
            }
            updateResults();
        });
        document.getElementById("ACTimeNamesSectionToggle").addEventListener("click", function() {
            if (document.getElementById("ACTimeNamesSection").getAttribute("style") === "display:none") {
                document.getElementById("ACTimeNamesSection").setAttribute("style", 'display:initial');
            } else {
                document.getElementById("ACTimeNamesSection").setAttribute("style", 'display:none');
            }
        });
        document.getElementById("ACYearsOnlyButton").addEventListener("click", function() {
            if (onlyYearsStatus === true) {
                onlyYearsStatus = false;
                document.getElementById("ACYearsOnlyButtonOutput").innerHTML = "Eternities";
            } else {
                onlyYearsStatus = true;
                document.getElementById("ACYearsOnlyButtonOutput").innerHTML = "Years";
            }
            updateResults();
        });
        document.getElementById("ACAstralBonusesSectionToggle").addEventListener("click", function() {
            if (document.getElementById("ACAstralBonusesSection").getAttribute("style") === "display:none") {
                document.getElementById("ACAstralBonusesSection").setAttribute("style", 'display:initial');
            } else {
                document.getElementById("ACAstralBonusesSection").setAttribute("style", 'display:none');
            }
        });
        updateResults();
    } else {
        console.log("[Astral Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addAstralCalculator();