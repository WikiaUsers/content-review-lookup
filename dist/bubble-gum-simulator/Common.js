(function() {
    const originalValues = {};
    String.prototype.commafy = function() {
        return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
            return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
        });
    };
    Number.prototype.commafy = function() {
        return String(this).commafy();
    };
    function addStatsCalculator(element) {
        var level = document.createElement("input");
        var levelLabel = document.createElement("label");
        levelLabel.innerHTML = "Level ";
        var enchant = document.createElement("input");
        var enchantLabel = document.createElement("label");
        enchantLabel.innerHTML = "Enchant ";
        var submit = document.createElement("button");
        submit.innerHTML = "Calculate";
        var clickbutton = function() {
            var infobox = document.getElementsByClassName("portable-infobox")[0];
            var infoboxSpans = infobox.getElementsByTagName("span");
            for (var i = 0; i < infoboxSpans.length; i++) {
                if (!originalValues[i]) {
                    originalValues[i] = {};
                    var stat = infoboxSpans[i].innerHTML;
                    if (stat.includes('x')) {
                        originalValues[i].value = parseInt(parseFloat(stat.split('x')[1].replace(/,/g, '')));
                        originalValues[i].sep = 'x';
                    } else if (stat.includes('+')) {
                        originalValues[i].value = parseInt(parseFloat(stat.split('+')[1].replace(/,/g, '')));
                        originalValues[i].sep = '+';
                    }
                }
                if (!isNaN(originalValues[i].value) && !isNaN(enchant.value) && !isNaN(level.value)) {
                    if (calculate(level.value, enchant.value, originalValues[i].value) == originalValues[i].value) {
                        var headers = document.getElementsByClassName('pi-header');
                        for (var h = 0; h < headers.length; h++) {
                            if (headers[h].innerHTML == "Calculated Stats") {
                                headers[h].innerHTML = "Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Shiny Stats") {
                                headers[h].innerHTML = "Shiny Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Mythic Stats") {
                                headers[h].innerHTML = "Mythic Base Stats";
                            } else if (headers[h].innerHTML == "Calculated Shiny Mythic Stats") {
                                headers[h].innerHTML = "Shiny Mythic Base Stats";
                            }
                        }
                    } else {
                        var headers = document.getElementsByClassName('pi-header');
                        for (var h = 0; h < headers.length; h++) {
                            if (headers[h].innerHTML == "Base Stats") {
                                headers[h].innerHTML = "Calculated Stats";
                            } else if (headers[h].innerHTML == "Shiny Base Stats") {
                                headers[h].innerHTML = "Calculated Shiny Stats";
                            } else if (headers[h].innerHTML == "Mythic Base Stats") {
                                headers[h].innerHTML = "Calculated Mythic Stats";
                            } else if (headers[h].innerHTML == "Shiny Mythic Base Stats") {
                                headers[h].innerHTML = "Calculated Shiny Mythic Stats";
                            }
                        }
                    }
                    infoboxSpans[i].innerHTML = originalValues[i].sep + calculate(level.value, enchant.value, originalValues[i].value).commafy();
                }
            }
            function calculate(level, enchant, stat) {
                var l = level || 1;
                var e = enchant || 0;
                var res = parseInt(stat + ((stat * 2) - stat) * (l - 1) / (25 - 1));
                return parseInt(res + ((res * 1.625) - res) * e / 50);
            }
        };
        submit.onclick = clickbutton;
        var maxLevel = document.createElement("button");
        maxLevel.innerHTML = '🔮 Max Level';
        maxLevel.onclick = function() {
            level.value = 25;
            clickbutton();
        };
        var maxEnchant = document.createElement("button");
        maxEnchant.innerHTML = '🧪 Max Enchant';
        maxEnchant.onclick = function() {
            enchant.value = 50;
            clickbutton();
        };
        element.append(
            levelLabel, document.createElement("br"), level, document.createElement("br"), maxLevel, document.createElement("br"),
            enchantLabel, document.createElement("br"), enchant, document.createElement("br"), maxEnchant, document.createElement("br"), document.createElement("br"),
            submit
        );
    }
    if (document.getElementsByClassName("calculator")[0] !== undefined) {
        var calculators = document.getElementsByClassName('calculator');
        for (var i = 0; i < calculators.length; i++) {
            addStatsCalculator(calculators[i]);
        }
    }
})();