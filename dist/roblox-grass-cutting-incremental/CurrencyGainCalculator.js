// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:CurrencyGainCalculator.js
function addCurrencyGainCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("CurrencyGainCalculator") !== null && document.getElementById("CurrencyGainCalculatorContainer") === null) {
        console.log("[Currency Gain Calculator] [LOG]: ID located. Running script.");
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
        mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixesLong.js&action=raw&ctype=text/javascript'); // Import suffixes and suffixesLC arrays.

        // Create the calculator's user interface.
        const calculatorHTMLCurrencySelectionContainer = "<tr><td><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Currency Selection</div><p style='text-align:center'>Selected: <b><span id='CGCSelectedCurrency'>?</span></b></p><p style='text-align:center'><img id='CGCPPSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/b/b1/PrestigePointsIcon.png/revision/latest?cb=20220520143125' width='50'/><img id='CGCCrystalSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7a/CrystalIcon.png/revision/latest?cb=20220520140356' width='50'/><img id='CGCAPSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9b/AnonymityIcon.png/revision/latest?cb=20220520140320' width='50'/><img id='CGCOilSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/b/b0/OilIcon.png/revision/latest?cb=20220520140507' width='50'/><img id='CGCMomentumSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/f/fb/MomentumIcon.png/revision/latest?cb=20220521171842' width='50'/><img id='CGCDMSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/f/f6/DarkMatter.png/revision/latest?cb=20220606224909' width='50'/><img id='CGCNPSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7d/Normality_Points.png/revision/latest?cb=20220704040749' width='50'/><img id='CGCRingSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/1/1f/Rings.png/revision/latest?cb=20220704040952' width='50'/><img id='CGCAstroSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/5e/Astro_new.png/revision/latest?cb=20220903082844' width='50'/><img id='CGCMeasureSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/4/47/Measure_Icon.png/revision/latest?cb=20220712020331' width='50'/><img id='CGCLunarPowerSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/e/ea/Lunar.png/revision/latest?cb=20220903123204' width='50'/><img id='CGCPlanetSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/59/Planet.png/revision/latest?cb=20220903123203' width='50'/><img id='CGCStardustSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/6/65/Stardust.png/revision/latest?cb=20221123095941' width='50'/><img id='CGCSolarShardSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/5b/Solar_Shard.png/revision/latest?cb=20221219132135' width='50'/><img id='CGCSolarRaySelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/52/XP3.png/revision/latest?cb=20221219213530' width='50'/><img id='CGCSunstoneSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/57/Sunstone.png/revision/latest?cb=20221202050619' width='50'/><img id='CGCSoulSelection' src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/d/d5/Soul.png/revision/latest?cb=20221225230349' width='50'/></p></td></tr>";
        const calculatorHTMLInputsContainer = "<tr><td id='CGCInputsOuterContainer' style='display:none'><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Inputs</div><p id='CGCInputsInnerContainer'></p></td></tr>";
        const calculatorHTMLResultsContainer = "<tr><td id='CGCResultsOuterContainer' style='display:none'><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Result</div><center><br><button id='CGCCalculateButton'>Calculate</button><br>Formula: <span id='CGCFormulaUsed'>?</span><br><br><div id='CGCResultsInnerContainer'></div></center></td></tr>";
        document.getElementById("CurrencyGainCalculator").innerHTML = "<div id='CurrencyGainCalculatorContainer' class='templatedesktop' style='padding:1em;background:#4D4D4D;text-align:center;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='CGCSuffixButton'>Disabled</button></div><div style='text-align:center;font-weight:bold;font-size:20px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/b/b1/PrestigePointsIcon.png/revision/latest?cb=20220520143125' width='75'/> Currency Gain Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/f/f6/DarkMatter.png/revision/latest?cb=20220606224909' width='75'/></div><table class='templatedesktop' style='margin:auto;width:100%;border:0;border-radius:initial;background:#3D3D3D;padding:0.5em'>" + calculatorHTMLCurrencySelectionContainer + calculatorHTMLInputsContainer + calculatorHTMLResultsContainer + "</table></div>";

        // Variable and constant declarations.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var selectedCurr; // Determines the selected currency from the 'updateInputs' function, used for the 'updateResult' function.
        const errorText = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>"; // Text string used for HTML outputs in the event of an error.

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

        // Update the inputs according to the selected currency.
        function updateInputs(e) {
            function unknownFormula(status) {
                if (status === true) {
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<div class='rainbow' style='text-align:center;font-weight:bold'>Error: Selected currency's formula is unknown. Inputs and results unavailable.</div>";
                    document.getElementById("CGCResultsOuterContainer").setAttribute("style", "display:none");
                } else {
                    document.getElementById("CGCResultsOuterContainer").setAttribute("style", "display:initial");
                }
            }
            unknownFormula();
            if (document.getElementsByClassName("SelectedCurr")[0] !== undefined) {
                document.getElementById(document.getElementsByClassName("SelectedCurr")[0].getAttribute("id")).setAttribute("class", "");
            } else {
                document.getElementById("CGCInputsOuterContainer").setAttribute("style", "display:initial");
                document.getElementById("CGCResultsOuterContainer").setAttribute("style", "display:initial");
            }
            document.getElementById("CGCInputsInnerContainer").innerHTML = "";
            document.getElementById("CGCResultsInnerContainer").innerHTML = "";
            switch (e) {
                case "pp":
                    selectedCurr = "pp";
                    console.log("Selected currency: Prestige Point");
                    document.getElementById("CGCPPSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#00FFFF'>Prestige Point</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Normal Level: <input id='CGCNormalLevelInput' style='width:10%'/></p><p>Grass gained this Prestige: <input id='CGCGrassGainedInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(9 × (1.4 ^ max(0, (Normal Level - 30) ÷ 10)) × 1.15 ^ floor(log10(Grass gained since last Prestige or higher reset)))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Normal Level <span id='CGCNormalLevelOutput'>?</span>, having gained <span id='CGCGrassGainedOutput'>?</span> Grass since the last Prestige or above reset, the base <span style='color:#00FFFF;font-weight:bold'>Prestige Point</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "crystal":
                    selectedCurr = "crystal";
                    console.log("Selected currency: Crystal");
                    document.getElementById("CGCCrystalSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FF00FF'>Crystal</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Tier: <input id='CGCTierInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(4 × Tier × (1.1 ^ Tier))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Tier <span id='CGCTierOutput'>?</span>, the base <span style='color:#FF00FF;font-weight:bold'>Crystal</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "ap":
                    selectedCurr = "ap";
                    console.log("Selected currency: Anonymity Point");
                    document.getElementById("CGCAPSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#DC143C'>Anonymity Point</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Normal Level: <input id='CGCNormalLevelInput' style='width:10%'/></p><p>Grass gained this Prestige: <input id='CGCGrassGainedInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(3 × (1.4 ^ max(0, (Normal Level - 30) ÷ 10)) × 1.15 ^ floor(log10(Grass gained since last Prestige or higher reset)))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Normal Level <span id='CGCNormalLevelOutput'>?</span>, having gained <span id='CGCGrassGainedOutput'>?</span> Grass since the last Prestige or above reset, the base <span style='color:#DC143C;font-weight:bold'>Anonymity Point</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "oil":
                    selectedCurr = "";
                    console.log("Selected currency: Oil");
                    document.getElementById("CGCOilSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#6F6F6F'>Oil</span>";
                    unknownFormula(true);
                    break;
                case "momentum":
                    selectedCurr = "momentum";
                    console.log("Selected currency: Momentum");
                    document.getElementById("CGCMomentumSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FFA500'>Momentum</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Rocket Parts created: <input id='CGCRocketPartInput' style='width:10%'/></p><p>Supernova performed? <b><span id='CGCSupernovaDoneButton' class='templatedesktop' style='color:#FF0000;padding:0.5em'>No</span></b> (click to toggle)</p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>10 ^ min(100, Rocket Parts created)</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "With <span id='CGCRocketPartOutput'>?</span> <span id='CGCRocketPartPluralCheckOutput'>Rocket Parts</span> created, assuming AGH Milestone 0GH + 24GS has been reached<span id='CGCSupernovaDoneTextOutput' style='display:none'> and having done at least one Supernova</span>, the base <span style='color:#FFA500;font-weight:bold'>Momentum</span> gain is: <span id='CGCResultOutput'>?</span>";
                    document.getElementById("CGCSupernovaDoneButton").addEventListener("click", function() {
                        if (document.getElementById("CGCSupernovaDoneButton").innerHTML === "No") {
                            document.getElementById("CGCSupernovaDoneButton").setAttribute("style", "color:#00FF00;padding:0.5em");
                            document.getElementById("CGCSupernovaDoneButton").innerHTML = "Yes";
                        } else {
                            document.getElementById("CGCSupernovaDoneButton").setAttribute("style", "color:#FF0000;padding:0.5em");
                            document.getElementById("CGCSupernovaDoneButton").innerHTML = "No";
                        }
                    });
                    break;
                case "dm":
                    selectedCurr = "dm";
                    console.log("Selected currency: Dark Matter");
                    document.getElementById("CGCDMSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#DD00FF'>Dark Matter</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Current Stars: <input id='CGCCurrentStarsInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor((log1.05(Stars) - 420) × 1.5 ^ log10(Stars ÷ 1e9))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "With currently <span id='CGCCurrentStarsOutput'>?</span> Stars, the base <span style='color:#DD00FF;font-weight:bold'>Dark Matter</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "np":
                    selectedCurr = "np";
                    console.log("Selected currency: Normality Point");
                    document.getElementById("CGCNPSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FFFF00'>Normality Point</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Unnatural Level: <input id='CGCUnnaturalLevelInput' style='width:10%'/></p><p>Astral: <input id='CGCAstralInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(1 × (5 ^ floor(max(0, (Unnatural Level - 50)) ÷ 10)) × (1.25 ^ floor(Astral ÷ 10)))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Unnatural Level <span id='CGCUnnaturalLevelOutput'>?</span> and Astral <span id='CGCAstralOutput'>?</span>, the base <span style='color:#FFFF00;font-weight:bold'>Normality Point</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "ring":
                    selectedCurr = "ring";
                    console.log("Selected currency: Ring");
                    document.getElementById("CGCRingSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#00FFFF'>Ring</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Planetoid Level: <input id='CGCPlanetoidLevelInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(1 × (1.03 ^ max(0, (Planetoid Level - 5))))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Planetoid Level <span id='CGCPlanetoidLevelOutput'>?</span>, the base Ring gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "astro":
                    selectedCurr = "astro";
                    console.log("Selected currency: Astro");
                    document.getElementById("CGCAstroSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#00FFFF'>Astro</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Planetoid Level: <input id='CGCPlanetoidLevelInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(3 × 1.05 ^ (Planetoid Level + 1))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Planetoid Level <span id='CGCPlanetoidLevelOutput'>?</span>, the base Astro gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "measure":
                    selectedCurr = "measure";
                    console.log("Selected currency: Measure");
                    document.getElementById("CGCMeasureSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#F5F2F7'>Measure</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Planetoid Level: <input id='CGCPlanetoidLevelInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(3 × (1.03 ^ max(0, (Planetoid Level - 101))))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Planetoid Level <span id='CGCPlanetoidLevelOutput'>?</span>, the base <span style='color:#F5F2F7;font-weight:bold'>Measure</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "planet":
                    selectedCurr = "planet";
                    console.log("Selected currency: Planet");
                    document.getElementById("CGCPlanetSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#008000'>Planet</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Planetoid Level: <input id='CGCPlanetoidLevelInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(3 × (1.03 ^ max(0, (Planetoid Level - 191))))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Planetoid Level <span id='CGCPlanetoidLevelOutput'>?</span>, the base <span style='color:#008000;font-weight:bold'>Planet</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "lunarpower":
                    selectedCurr = "lunarpower";
                    console.log("Selected currency: Lunar Power");
                    document.getElementById("CGCLunarPowerSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#8BBFFF'>Lunar Power</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Current Moonstone: <input id='CGCCurrentMoonstoneInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>1.5 ^ log10(Moonstone) ÷ 100</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "With currently <span id='CGCCurrentMoonstoneOutput'>?</span> Moonstone, the base <span style='color:#8BBFFF;font-weight:bold'>Lunar Power</span> rate is: <span id='CGCResultOutput'>?</span>/sec";
                    break;
                case "stardust":
                    selectedCurr = "stardust";
                    console.log("Selected currency: Stardust");
                    document.getElementById("CGCStardustSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#DD00FF'>Stardust</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Planetoid Level: <input id='CGCPlanetoidLevelInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>1.01 ^ max(0, (Planetoid Level - 449))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Planetoid Level <span id='CGCPlanetoidLevelOutput'>?</span>, the Planetoid Level-based bonus to <span style='color:#DD00FF;font-weight:bold'>Stardust</span> gain is: <span id='CGCResultOutput'>?</span>x";
                    break;
                case "solarshard":
                    selectedCurr = "solarshard";
                    console.log("Selected currency: Solar Shard");
                    document.getElementById("CGCSolarShardSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FFFF00'>Solar Shard</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Star Tier: <input id='CGCStarTierInput' style='width:10%'/></p><p>Star Growth: <input id='CGCStarGrowthInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(5 ^ (Current Star Tier - 1)) × max(1, (10 + (floor(log10(Current Star Growth) - floor(log10(Next Star Tier Growth Requirement)))))) × 2</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Star Tier <span id='CGCStarTierOutput'>?</span> with a Star Growth of <span id='CGCStarGrowthOutput'>?</span>, the base <span style='color:#FFFF00;font-weight:bold'>Solar Shard</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "solarray":
                    selectedCurr = "solarray";
                    console.log("Selected currency: Solar Ray");
                    document.getElementById("CGCSolarRaySelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FFFF00'>Solar Ray</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Star Growth: <input id='CGCStarGrowthInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(10 × 1.15 ^ floor(log10(Star Growth)))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "With a Star Growth of <span id='CGCStarGrowthOutput'>?</span>, the base <span style='color:#FFFF00;font-weight:bold'>Solar Ray</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "sunstone":
                    selectedCurr = "sunstone";
                    console.log("Selected currency: Sunstone");
                    document.getElementById("CGCSunstoneSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#FFFF00'>Sunstone</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Eclipse: <input id='CGCEclipseInput' style='width:10%'/></p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>floor(8 × 1.02 ^ (min(300, Eclipse) - 1))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Eclipse <span id='CGCEclipseOutput'>?</span>, the base <span style='color:#FFFF00;font-weight:bold'>Sunstone</span> gain is: <span id='CGCResultOutput'>?</span>";
                    break;
                case "soul":
                    selectedCurr = "soul";
                    console.log("Selected currency: Soul");
                    document.getElementById("CGCSoulSelection").setAttribute("class", "SelectedCurr");
                    document.getElementById("CGCSelectedCurrency").innerHTML = "<span style='color:#00FFFF'>Soul</span>";
                    document.getElementById("CGCInputsInnerContainer").innerHTML = "<p>Current Stage: <input id='CGCStageInput' style='width:10%'/></p><p>Total Souls (includes spent): <input id='CGCTotalSoulsInput' style='width:10%'/></p><p><span style='color:#FF00FF'>Soul Stealer</span> bought? <b><span id='CGCSoulStealerStatusButton' class='templatedesktop' style='color:#FF0000;padding:0.5em'>No</span></b> (click to toggle)</p>";
                    document.getElementById("CGCFormulaUsed").innerHTML = "<code>(Stage + (min(Soul Stealer level, max(0, Stage - 2)) × 2) - (floor(sqrt(max(1, log1.05(Total Souls ÷ 100)))) - 2))</code>";
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "At Stage <span id='CGCStageOutput'>?</span><span id='CGCSoulStealerTextOutput' style='display:none'> with the <span style='color:#FF00FF'>Soul Stealer</span> Singularity Upgrade</span>, having amassed a total of <span id='CGCTotalSoulsOutput'>?</span> <span id='CGCSoulPluralCheckOutput'>Souls</span>, the base <span style='color:#00FFFF;font-weight:bold'>Soul</span> gain is: <span id='CGCResultOutput'>?</span>";
                    document.getElementById("CGCSoulStealerStatusButton").addEventListener("click", function() {
                        if (document.getElementById("CGCSoulStealerStatusButton").innerHTML === "No") {
                            document.getElementById("CGCSoulStealerStatusButton").setAttribute("style", "color:#00FF00;padding:0.5em");
                            document.getElementById("CGCSoulStealerStatusButton").innerHTML = "Yes";
                        } else {
                            document.getElementById("CGCSoulStealerStatusButton").setAttribute("style", "color:#FF0000;padding:0.5em");
                            document.getElementById("CGCSoulStealerStatusButton").innerHTML = "No";
                        }
                    });
            }
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

        // Update the HTML outputs.
        function updateResults() {
            switch (selectedCurr) {
                case "pp":
                    var normalLevel;
                    var grassGained;
                    if (document.getElementById("CGCNormalLevelInput").value === '' || new Decimal(document.getElementById("CGCNormalLevelInput").value).lessThan(1)) {
                        normalLevel = new Decimal(1);
                    } else {
                        normalLevel = toScientific(document.getElementById("CGCNormalLevelInput").value);
                    }
                    if (document.getElementById("CGCGrassGainedInput").value === '' || new Decimal(document.getElementById("CGCGrassGainedInput").value).lessThan(0)) {
                        grassGained = new Decimal(0);
                    } else {
                        grassGained = toScientific(document.getElementById("CGCGrassGainedInput").value);
                    }
                    document.getElementById("CGCNormalLevelOutput").innerHTML = notateInt(normalLevel);
                    document.getElementById("CGCGrassGainedOutput").innerHTML = notateInt(grassGained);
                    if (normalLevel.lessThan(31)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(9).times(new Decimal(1.4).pow((normalLevel.sub(30)).dividedBy(10))).times(new Decimal(1.15).pow(decimalMax(grassGained, new Decimal(1)).log10().floor())).floor());
                    }
                    break;
                case "crystal":
                    var tier;
                    if (document.getElementById("CGCTierInput").value === '' || new Decimal(document.getElementById("CGCTierInput").value).lessThan(1)) {
                        tier = new Decimal(1);
                    } else {
                        tier = toScientific(document.getElementById("CGCTierInput").value);
                    }
                    document.getElementById("CGCTierOutput").innerHTML = notateInt(tier);
                    document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(4).times(tier).times(new Decimal(1.1).pow(tier)).floor());
                    break;
                case "ap":
                    var normalLevel;
                    var grassGained;
                    if (document.getElementById("CGCNormalLevelInput").value === '' || new Decimal(document.getElementById("CGCNormalLevelInput").value).lessThan(1)) {
                        normalLevel = new Decimal(1);
                    } else {
                        normalLevel = toScientific(document.getElementById("CGCNormalLevelInput").value);
                    }
                    if (document.getElementById("CGCGrassGainedInput").value === '' || new Decimal(document.getElementById("CGCGrassGainedInput").value).lessThan(0)) {
                        grassGained = new Decimal(0);
                    } else {
                        grassGained = toScientific(document.getElementById("CGCGrassGainedInput").value);
                    }
                    document.getElementById("CGCNormalLevelOutput").innerHTML = notateInt(normalLevel);
                    document.getElementById("CGCGrassGainedOutput").innerHTML = notateInt(grassGained);
                    if (normalLevel.lessThan(31)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(3).times(new Decimal(1.4).pow((normalLevel.sub(30)).dividedBy(10))).times(new Decimal(1.15).pow(decimalMax(grassGained, new Decimal(1)).log10().floor())).floor());
                    }
                    break;
                case "momentum":
                    var rocketPart;
                    var supernovaDone;
                    if (document.getElementById("CGCRocketPartInput").value === '' || new Decimal(document.getElementById("CGCRocketPartInput").value).lessThan(0)) {
                        rocketPart = new Decimal(0);
                    } else if (new Decimal(document.getElementById("CGCRocketPartInput").value).greaterThanOrEqualTo(100)) {
                        rocketPart = new Decimal(100);
                    } else {
                        rocketPart = toScientific(document.getElementById("CGCRocketPartInput").value).floor();
                    }
                    document.getElementById("CGCRocketPartOutput").innerHTML = notateInt(rocketPart);
                    if (document.getElementById("CGCSupernovaDoneButton").innerHTML === "Yes") {
                        document.getElementById("CGCSupernovaDoneTextOutput").setAttribute("style", "display:inline");
                        supernovaDone = true;
                    } else {
                        document.getElementById("CGCSupernovaDoneTextOutput").setAttribute("style", "display:none");
                        supernovaDone = false;
                    }
                    if (rocketPart.equals(0) && supernovaDone === true) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(10);
                    } else if (rocketPart.lessThan(1)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(1);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(10 ** rocketPart);
                    }
                    if (rocketPart.equals(1)) {
                        document.getElementById("CGCRocketPartPluralCheckOutput").innerHTML = "Rocket Part";
                    } else {
                        document.getElementById("CGCRocketPartPluralCheckOutput").innerHTML = "Rocket Parts";
                    }
                    break;
                case "dm":
                    var stars;
                    if (document.getElementById("CGCCurrentStarsInput").value === '' || new Decimal(document.getElementById("CGCCurrentStarsInput").value).lessThan(0)) {
                        stars = new Decimal(0);
                    } else {
                        stars = toScientific(document.getElementById("CGCCurrentStarsInput").value);
                    }
                    document.getElementById("CGCCurrentStarsOutput").innerHTML = notateInt(stars);
                    if (stars.lessThan(1e9)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt((stars.log10().dividedBy(Math.log10(1.05)).sub(420)).times(new Decimal(1.5).pow(stars.dividedBy(1e9).log10())).floor());
                    }
                    break;
                case "np":
                    var unnaturalLevel;
                    var astral;
                    if (document.getElementById("CGCUnnaturalLevelInput").value === '' || new Decimal(document.getElementById("CGCUnnaturalLevelInput").value).lessThan(1)) {
                        unnaturalLevel = new Decimal(1);
                    } else {
                        unnaturalLevel = toScientific(document.getElementById("CGCUnnaturalLevelInput").value);
                    }
                    if (document.getElementById("CGCAstralInput").value === '' || new Decimal(document.getElementById("CGCAstralInput").value).lessThan(1)) {
                        astral = new Decimal(1);
                    } else {
                        astral = toScientific(document.getElementById("CGCAstralInput").value);
                    }
                    document.getElementById("CGCUnnaturalLevelOutput").innerHTML = notateInt(unnaturalLevel);
                    document.getElementById("CGCAstralOutput").innerHTML = notateInt(astral);
                    if (unnaturalLevel.lessThan(51)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(5).pow((unnaturalLevel.sub(50)).dividedBy(10).floor())).times(new Decimal(1.25).pow(astral.dividedBy(10).floor())).floor());
                    }
                    break;
                case "ring":
                    var planetoidLevel;
                    if (document.getElementById("CGCPlanetoidLevelInput").value === '' || new Decimal(document.getElementById("CGCPlanetoidLevelInput").value).lessThan(1)) {
                        planetoidLevel = new Decimal(1);
                    } else {
                        planetoidLevel = toScientific(document.getElementById("CGCPlanetoidLevelInput").value);
                    }
                    document.getElementById("CGCPlanetoidLevelOutput").innerHTML = notateInt(planetoidLevel);
                    if (planetoidLevel.lessThan(5)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(1).times(new Decimal(1.03).pow(planetoidLevel.sub(5))).floor());
                    }
                    break;
                case "astro":
                    var planetoidLevel;
                    if (document.getElementById("CGCPlanetoidLevelInput").value === '' || new Decimal(document.getElementById("CGCPlanetoidLevelInput").value).lessThan(1)) {
                        planetoidLevel = new Decimal(1);
                    } else {
                        planetoidLevel = toScientific(document.getElementById("CGCPlanetoidLevelInput").value);
                    }
                    document.getElementById("CGCPlanetoidLevelOutput").innerHTML = notateInt(planetoidLevel);
                    document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(3).times(new Decimal(1.05).pow(planetoidLevel.add(1))).floor());
                    break;
                case "measure":
                    var planetoidLevel;
                    if (document.getElementById("CGCPlanetoidLevelInput").value === '' || new Decimal(document.getElementById("CGCPlanetoidLevelInput").value).lessThan(1)) {
                        planetoidLevel = new Decimal(1);
                    } else {
                        planetoidLevel = toScientific(document.getElementById("CGCPlanetoidLevelInput").value);
                    }
                    document.getElementById("CGCPlanetoidLevelOutput").innerHTML = notateInt(planetoidLevel);
                    if (planetoidLevel.lessThan(101)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(3).times(new Decimal(1.03).pow(planetoidLevel.sub(101))).floor());
                    }
                    break;
                case "planet":
                    var planetoidLevel;
                    if (document.getElementById("CGCPlanetoidLevelInput").value === '' || new Decimal(document.getElementById("CGCPlanetoidLevelInput").value).lessThan(1)) {
                        planetoidLevel = new Decimal(1);
                    } else {
                        planetoidLevel = toScientific(document.getElementById("CGCPlanetoidLevelInput").value);
                    }
                    document.getElementById("CGCPlanetoidLevelOutput").innerHTML = notateInt(planetoidLevel);
                    if (planetoidLevel.lessThan(201)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(3).times(new Decimal(1.03).pow(planetoidLevel.sub(201))).floor());
                    }
                    break;
                case "lunarpower":
                    var moonstone;
                    if (document.getElementById("CGCCurrentMoonstoneInput").value === '' || new Decimal(document.getElementById("CGCCurrentMoonstoneInput").value).lessThan(0)) {
                        moonstone = new Decimal(0);
                    } else {
                        moonstone = toScientific(document.getElementById("CGCCurrentMoonstoneInput").value);
                    }
                    document.getElementById("CGCCurrentMoonstoneOutput").innerHTML = notateInt(moonstone);
                    if (moonstone.greaterThan(0)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(1.5).pow(moonstone.log10()).dividedBy(100));
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    }
                    break;
                case "stardust":
                    var planetoidLevel;
                    if (document.getElementById("CGCPlanetoidLevelInput").value === '' || new Decimal(document.getElementById("CGCPlanetoidLevelInput").value).lessThan(1)) {
                        planetoidLevel = new Decimal(1);
                    } else {
                        planetoidLevel = toScientific(document.getElementById("CGCPlanetoidLevelInput").value);
                    }
                    document.getElementById("CGCPlanetoidLevelOutput").innerHTML = notateInt(planetoidLevel);
                    if (planetoidLevel.lessThan(450)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(1);
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(1.01).pow(planetoidLevel.sub(449)));
                    }
                    break;
                case "solarshard":
                    var starTier;
                    var starGrowth;
                    var nextSTReq;
                    if (document.getElementById("CGCStarTierInput").value === '' || new Decimal(document.getElementById("CGCStarTierInput").value).lessThan(0)) {
                        starTier = new Decimal(0);
                    } else if (new Decimal(document.getElementById("CGCStarTierInput").value).greaterThan(6)) {
                        starTier = new Decimal(6);
                    } else {
                        starTier = toScientific(document.getElementById("CGCStarTierInput").value);
                    }
                    switch (Number(starTier)) {
                        case 0:
                            nextSTReq = new Decimal(1e7);
                            break;
                        case 1:
                            nextSTReq = new Decimal(1e9);
                            break;
                        case 2:
                            nextSTReq = new Decimal(1e11);
                            break;
                        case 3:
                            nextSTReq = new Decimal(1e14);
                            break;
                        case 4:
                            nextSTReq = new Decimal(1e17);
                            break;
                        case 5:
                            nextSTReq = new Decimal(1e36);
                            break;
                        case 6:
                            nextSTReq = new Decimal(1e39);
                    }
                    if (document.getElementById("CGCStarGrowthInput").value === '' || new Decimal(document.getElementById("CGCStarGrowthInput").value).lessThan(0)) {
                        starGrowth = new Decimal(0);
                    } else {
                        starGrowth = toScientific(document.getElementById("CGCStarGrowthInput").value);
                    }
                    document.getElementById("CGCStarTierOutput").innerHTML = notateInt(starTier);
                    document.getElementById("CGCStarGrowthOutput").innerHTML = notateInt(starGrowth);
                    if (starTier.equals(0)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(0);
                    } else {
                        if (starGrowth.lessThan(10)) {
                            document.getElementById("CGCResultOutput").innerHTML = new Decimal(5).pow(starTier.sub(1)).times(2).floor(); // Star Growth OoM multiplier is 1x if Star Growth is less than 10.
                        } else {
                            document.getElementById("CGCResultOutput").innerHTML = new Decimal(5).pow(starTier.sub(1)).times(decimalMax(1, (new Decimal(10).add(starGrowth.log10().floor().sub(nextSTReq.log10().floor()))))).times(2).floor(); // Normal Solar Shard gain for when Star Growth is at least 10.
                        }
                    }
                    break;
                case "solarray":
                    var starGrowth;
                    if (document.getElementById("CGCStarGrowthInput").value === '' || new Decimal(document.getElementById("CGCStarGrowthInput").value).lessThan(0)) {
                        starGrowth = new Decimal(0);
                    } else {
                        starGrowth = toScientific(document.getElementById("CGCStarGrowthInput").value);
                    }
                    document.getElementById("CGCStarGrowthOutput").innerHTML = notateInt(starGrowth);
                    if (starGrowth.lessThan(10)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(10)); // Star Growth OoM multiplier is 1x if Star Growth is less than 10.
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(10).times(new Decimal(1.15).pow(starGrowth.log10().floor())).floor()); // Normal Solar Ray gain for when Star Growth is at least 10.
                    }
                    break;
                case "sunstone":
                    var eclipse;
                    if (document.getElementById("CGCEclipseInput").value === '' || new Decimal(document.getElementById("CGCEclipseInput").value).lessThan(1)) {
                        eclipse = new Decimal(1);
                    } else if (new Decimal(document.getElementById("CGCEclipseInput").value).greaterThanOrEqualTo(300)) {
                        eclipse = new Decimal(300);
                    } else {
                        eclipse = toScientific(document.getElementById("CGCEclipseInput").value);
                    }
                    document.getElementById("CGCEclipseOutput").innerHTML = notateInt(eclipse);
                    if (eclipse.greaterThanOrEqualTo(300)) {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(8).times(new Decimal(1.02).pow(299)).floor()) + " <sup>(softcapped)</sup>";
                    } else {
                        document.getElementById("CGCResultOutput").innerHTML = notateInt(new Decimal(8).times(new Decimal(1.02).pow(eclipse.sub(1))).floor());
                    }
                    break;
                case "soul":
                    var currentStage;
                    var totalSouls;
                    var soulStealerBought;
                    if (document.getElementById("CGCStageInput").value === '' || new Decimal(document.getElementById("CGCStageInput").value).lessThan(1)) {
                        currentStage = new Decimal(1);
                    } else {
                        currentStage = toScientific(document.getElementById("CGCStageInput").value);
                    }
                    if (document.getElementById("CGCTotalSoulsInput").value === '' || new Decimal(document.getElementById("CGCTotalSoulsInput").value).lessThan(0)) {
                        totalSouls = new Decimal(0);
                    } else {
                        totalSouls = toScientific(document.getElementById("CGCTotalSoulsInput").value);
                    }
                    if (document.getElementById("CGCSoulStealerStatusButton").innerHTML === "Yes") {
                        document.getElementById("CGCSoulStealerTextOutput").setAttribute("style", "display:inline");
                        soulStealerBought = 1;
                    } else {
                        document.getElementById("CGCSoulStealerTextOutput").setAttribute("style", "display:none");
                        soulStealerBought = 0;
                    }
                    var soulPenalty = (((decimalMax(1, totalSouls.dividedBy(100))).log10().dividedBy(Math.log10(1.05))).pow(0.5).floor()).sub(2);
                    document.getElementById("CGCStageOutput").innerHTML = notateInt(currentStage);
                    document.getElementById("CGCTotalSoulsOutput").innerHTML = notateInt(totalSouls);
                    document.getElementById("CGCResultOutput").innerHTML = notateInt(decimalMax(0, currentStage.add(decimalMin(soulStealerBought, decimalMin(1, decimalMax(0, currentStage.sub(2)))).times(2)).sub(soulPenalty)));
                    if (totalSouls.equals(1)) {
                        document.getElementById("CGCSoulPluralCheckOutput").innerHTML = "Soul";
                    } else {
                        document.getElementById("CGCSoulPluralCheckOutput").innerHTML = "Souls";
                    }
                    break;
                default:
                    document.getElementById("CGCResultsInnerContainer").innerHTML = "?";
            }
        }
        // Currencies that still need their formulae implemented: Oil.

        // Add click event listeners to the currency selection options.
        document.getElementById("CGCPPSelection").addEventListener("click", function() {
            updateInputs("pp");
            updateResults();
        });
        document.getElementById("CGCCrystalSelection").addEventListener("click", function() {
            updateInputs("crystal");
            updateResults();
        });
        document.getElementById("CGCAPSelection").addEventListener("click", function() {
            updateInputs("ap");
            updateResults();
        });
        document.getElementById("CGCOilSelection").addEventListener("click", function() {
            updateInputs("oil");
            updateResults();
        });
        document.getElementById("CGCMomentumSelection").addEventListener("click", function() {
            updateInputs("momentum");
            updateResults();
        });
        document.getElementById("CGCDMSelection").addEventListener("click", function() {
            updateInputs("dm");
            updateResults();
        });
        document.getElementById("CGCNPSelection").addEventListener("click", function() {
            updateInputs("np");
            updateResults();
        });
        document.getElementById("CGCRingSelection").addEventListener("click", function() {
            updateInputs("ring");
            updateResults();
        });
        document.getElementById("CGCAstroSelection").addEventListener("click", function() {
            updateInputs("astro");
            updateResults();
        });
        document.getElementById("CGCMeasureSelection").addEventListener("click", function() {
            updateInputs("measure");
            updateResults();
        });
        document.getElementById("CGCLunarPowerSelection").addEventListener("click", function() {
            updateInputs("lunarpower");
            updateResults();
        });
        document.getElementById("CGCPlanetSelection").addEventListener("click", function() {
            updateInputs("planet");
            updateResults();
        });
        document.getElementById("CGCStardustSelection").addEventListener("click", function() {
            updateInputs("stardust");
            updateResults();
        });
        document.getElementById("CGCSolarShardSelection").addEventListener("click", function() {
            updateInputs("solarshard");
            updateResults();
        });
        document.getElementById("CGCSolarRaySelection").addEventListener("click", function() {
            updateInputs("solarray");
            updateResults();
        });
        document.getElementById("CGCSunstoneSelection").addEventListener("click", function() {
            updateInputs("sunstone");
            updateResults();
        });
        document.getElementById("CGCSoulSelection").addEventListener("click", function() {
            updateInputs("soul");
            updateResults();
        });

        // Add click event listeners to the calculate and suffix toggle buttons.
        document.getElementById("CGCCalculateButton").addEventListener("click", function() {
            updateResults();
        });
        document.getElementById("CGCSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("CGCSuffixButton").innerHTML = "Enabled";
                document.getElementById("CGCSuffixButton").setAttribute("style", "background:#00FF00");
                updateResults();
            } else {
                suffixStatus = false;
                document.getElementById("CGCSuffixButton").innerHTML = "Disabled";
                document.getElementById("CGCSuffixButton").setAttribute("style", "background:#FF0000");
                updateResults();
            }
        });
    } else {
        console.log("[Currency Gain Calculator] [LOG]: Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addCurrencyGainCalculator();
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:CurrencyGainCalculator.js