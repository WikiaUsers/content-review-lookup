function createElement(tagName, data) {
    const element = document.createElement(tagName);
    if (!data) return element;
    for(const key in data){
        if (data[key]) {
            element[key] = data[key];
        }
    }
    return element;
}
function commafy(input) {
    return input.toString().replace(/(^|[^\w.])(\d{4,})/g, function(_, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
}
const __default = {
    minLevel: 1,
    maxLevel: 25,
    minEnchant: 0,
    maxEnchant: 40,
    maxShadowEnchant: 50,
    maxLevelEffect: 1.5,
    maxEnchantEffect: 1.625,
    maxShadowEnchantEffect: 2
};
function calculate(min, max, maxEffect, level, stat) {
    return stat + (stat * maxEffect - stat) * (level - min) / (max - min);
}
function calculateStat(level = 1, enchant = 0, stat, isAmplified) {
    let calculation = calculate(__default.minLevel, __default.maxLevel, __default.maxLevelEffect, level, stat);
    calculation = calculate(__default.minEnchant, __default.maxShadowEnchant, __default.maxShadowEnchantEffect, enchant, calculation);
    return calculation * (isAmplified ? 1.15 : 1);
}
function StatsCalculator(element) {
    const level = createElement("input");
    const levelLabel = createElement("label", {
        innerHTML: "Level"
    });
    const enchant = createElement("input");
    const enchantLabel = createElement("label", {
        innerHTML: "Enchant"
    });
    const calculate1 = createElement("button", {
        innerHTML: "Calculate",
        onclick: function() {
            const infobox = document.getElementsByClassName("portable-infobox")[0];
            const spans = infobox.getElementsByTagName("span");
            for(let i = 0; i < spans.length; i++){
                if (!spans[i].getAttribute("data-original")) {
                    const stat = spans[i].innerHTML;
                    spans[i].setAttribute("data-original", stat.substring(1, stat.length).replace(/,/g, ""));
                    spans[i].setAttribute("data-sep", stat.charAt(0));
                }
                const original = parseInt(spans[i].getAttribute("data-original") ?? "0");
                const sep = spans[i].getAttribute("data-sep");
                const enchantValue = parseInt(enchant.value !== "" ? enchant.value : "0");
                const levelValue = parseInt(level.value !== "" ? level.value : "1");
                if (!isNaN(original) && !isNaN(enchantValue) && !isNaN(levelValue)) {
                    const headers = infobox.getElementsByClassName("pi-header");
                    if (calculateStat(parseInt(level.value), parseInt(enchant.value), original) == original) {
                        for(let a = 0; a < headers.length; a++){
                            if (headers[a].innerHTML.includes("Calculated")) {
                                const inner = headers[a].innerHTML;
                                headers[a].innerHTML = inner.replace("Calculated ", "").replace("Stats", "Base Stats");
                            }
                        }
                    } else {
                        for(let a = 0; a < headers.length; a++){
                            if (headers[a].innerHTML.includes("Base")) {
                                const inner = headers[a].innerHTML;
                                headers[a].innerHTML = "Calculated " + inner.replace("Base ", "");
                            }
                        }
                    }
                    spans[i].innerHTML = sep + commafy(calculateStat(levelValue, enchantValue, original));
                }
            }
        }
    });
    const maxLevel = createElement("button", {
        innerHTML: "🔮 Max Level",
        onclick: function() {
            level.value = String(__default.maxLevel);
            calculate1.click();
        }
    });
    const maxEnchant = createElement("button", {
        innerHTML: "🧪 Max Enchant",
        onclick: function() {
            enchant.value = String(__default.maxEnchant);
            calculate1.click();
        }
    });
    const maxShadowEnchant = createElement("button", {
        innerHTML: "👽 Max Shadow Enchant",
        onclick: function() {
            enchant.value = String(__default.maxShadowEnchant);
            calculate1.click();
        }
    });
    element.append(levelLabel, createElement("br"), level, createElement("br"), maxLevel, createElement("br"), createElement("br"), enchantLabel, createElement("br"), enchant, createElement("br"), maxEnchant, createElement("br"), createElement("br"), maxShadowEnchant, createElement("br"), createElement("br"), calculate1);
}
if (document.getElementsByClassName("calculator")[0]) {
    const calculators = document.getElementsByClassName("calculator");
    for(let i = 0; i < calculators.length; i++){
        StatsCalculator(calculators[i]);
    }
}