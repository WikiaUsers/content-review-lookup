/* This JS file is a transpiled file, source is located at https://github.com/Julli4n/BGSWiki/blob/main/src/pages/MediaWiki/Common.ts
Open to PRs and issues*/

"use strict";

function createElement(tagName, data) {
  var element = document.createElement(tagName);
  if (!data) return element;

  for (var key in data) {
    if (data[key]) {
      element[key] = data[key];
    }
  }

  return element;
}

function commafy(input) {
  return input.toString().replace(/(^|[^\w.])(\d{4,})/g, function (_, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
}

var __default = {
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

function calculateStat() {
  var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var enchant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var stat = arguments.length > 2 ? arguments[2] : undefined;
  var isAmplified = arguments.length > 3 ? arguments[3] : undefined;
  var calculation = calculate(__default.minLevel, __default.maxLevel, __default.maxLevelEffect, level, stat);
  calculation = calculate(__default.minEnchant, __default.maxShadowEnchant, __default.maxShadowEnchantEffect, enchant, calculation);
  return calculation * (isAmplified ? 1.15 : 1);
}

function StatsCalculator(element) {
  var level = createElement("input");
  var levelLabel = createElement("label", {
    innerHTML: "Level"
  });
  var enchant = createElement("input");
  var enchantLabel = createElement("label", {
    innerHTML: "Enchant"
  });
  var calculate1 = createElement("button", {
    innerHTML: "Calculate",
    onclick: function onclick() {
      var infobox = document.getElementsByClassName("portable-infobox")[0];
      var spans = infobox.getElementsByTagName("span");

      for (var i = 0; i < spans.length; i++) {
        var _spans$i$getAttribute;

        if (!spans[i].getAttribute("data-original")) {
          var stat = spans[i].innerHTML;
          spans[i].setAttribute("data-original", stat.substring(1, stat.length).replace(/,/g, ""));
          spans[i].setAttribute("data-sep", stat.charAt(0));
        }

        var original = parseInt((_spans$i$getAttribute = spans[i].getAttribute("data-original")) !== null && _spans$i$getAttribute !== void 0 ? _spans$i$getAttribute : "0");
        var sep = spans[i].getAttribute("data-sep");
        var enchantValue = parseInt(enchant.value !== "" ? enchant.value : "0");
        var levelValue = parseInt(level.value !== "" ? level.value : "1");

        if (!isNaN(original) && !isNaN(enchantValue) && !isNaN(levelValue)) {
          var headers = infobox.getElementsByClassName("pi-header");

          if (calculateStat(parseInt(level.value), parseInt(enchant.value), original) == original) {
            for (var a = 0; a < headers.length; a++) {
              if (headers[a].innerHTML.includes("Calculated")) {
                var inner = headers[a].innerHTML;
                headers[a].innerHTML = inner.replace("Calculated ", "").replace("Stats", "Base Stats");
              }
            }
          } else {
            for (var _a = 0; _a < headers.length; _a++) {
              if (headers[_a].innerHTML.includes("Base")) {
                var _inner = headers[_a].innerHTML;
                headers[_a].innerHTML = "Calculated " + _inner.replace("Base ", "");
              }
            }
          }

          spans[i].innerHTML = sep + commafy(calculateStat(levelValue, enchantValue, original));
        }
      }
    }
  });
  var maxLevel = createElement("button", {
    innerHTML: "🔮 Max Level",
    onclick: function onclick() {
      level.value = String(__default.maxLevel);
      calculate1.click();
    }
  });
  var maxEnchant = createElement("button", {
    innerHTML: "🧪 Max Enchant",
    onclick: function onclick() {
      enchant.value = String(__default.maxEnchant);
      calculate1.click();
    }
  });
  var maxShadowEnchant = createElement("button", {
    innerHTML: "👽 Max Shadow Enchant",
    onclick: function onclick() {
      enchant.value = String(__default.maxShadowEnchant);
      calculate1.click();
    }
  });
  element.append(levelLabel, createElement("br"), level, createElement("br"), maxLevel, createElement("br"), createElement("br"), enchantLabel, createElement("br"), enchant, createElement("br"), maxEnchant, createElement("br"), createElement("br"), maxShadowEnchant, createElement("br"), createElement("br"), calculate1);
}

if (document.getElementsByClassName("calculator")[0]) {
  var calculators = document.getElementsByClassName("calculator");

  for (var i = 0; i < calculators.length; i++) {
    StatsCalculator(calculators[i]);
  }
}