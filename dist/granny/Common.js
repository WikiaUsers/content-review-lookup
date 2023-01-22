/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Preset Search
 * 
 * A tool to help users of the wiki know what item preset they
 * are playing on, by selecting the locations that they found items.
 * Used by Granny Wiki's Item Locations page.
 * @author Wolf20482 <https://granny.fandom.com/wiki/User:Wolf20482>
 * @version 1.0
 */
// Start Preset Search
(function () {
  "use strict";

  var numPresets = 5;

  // Prevents double loading
  if (window.PresetSearchLoaded) {
    console.warn("Preset Search script double loaded, exiting...");
    return;
  }
  window.PresetSearchLoaded = true;
  if (mw.config.get("wgPageName") === "Special:PresetSearch") {
    // Initialize GUI
    // Change header and title
    document.title = "Preset Search | Granny Wiki | Fandom";
    document.querySelector("h1#firstHeading.page-header__title").innerText = "Preset Search (Beta)";
    var contentElem = document.querySelector("#mw-content-text");

    // Get list of items
    try {
      parsePresets().then(function (itemList) {
        var itemNames = itemList.map(function (e) {
          return e.name;
        });
        contentElem.innerHTML = "<p>Welcome to the Preset Search tool! This is a tool to find the Preset (Item Location) you are playing on, by selecting an item you've found and its location in the game. Learn more <a href=\"/wiki/Item_Locations\">here</a></p>\n<h3>Things to note</h3>\n<ul>\n<li>This tool (currently) only supports selecting one item, so if you see an item with two locations that are the same (example: Hammer), you should select another item, since items like these have the same location on two presets, so the preset found by the tool won't be the right one.</li>\n<li>This tool is currently in beta, so if there are any issues please report it to <a href=\"/wiki/User:Wolf20482\">Wolf20482</a> or wiki staff!</li>\n<li>If you don't see an item, that means it's a General Spawning item, which has the same location regardless of preset. See <a href=\"/wiki/Item_Locations#General_Spawning\">here</a> for a list of General Spawning items.</li>\n</ul>\n\t\t\t\n<select name=\"item-list\" id=\"item-list\">\n<option value=\"\">-- Choose an item you found --</option>\n</select><br />\n\t\t\t\n<select name=\"location-list\" id=\"location-list\">\n<option value=\"\">----</option>\n</select><br />\n<span class=\"wds-button\" id=\"find-preset\">Find preset</span><br />\n<h3>Result</h3>\n<span id=\"result\"></span>";
        itemNames.forEach(function (e) {
          var optionElem = document.createElement("option");
          optionElem.value = e;
          optionElem.innerHTML = e;
          document.getElementById("item-list").appendChild(optionElem);
        });
        document.getElementById("item-list").addEventListener("input", function () {
          var itemName = document.getElementById("item-list").value;
          var itemEntry = itemList.find(function (e) {
            return e.name === itemName;
          });
          document.getElementById("location-list").innerHTML = "";
          itemEntry.locations.forEach(function (e) {
            var optionElem = document.createElement("option");
            optionElem.value = e.value;
            optionElem.innerHTML = e.value;
            document.getElementById("location-list").appendChild(optionElem);
          });
        });
        document.getElementById("find-preset").addEventListener("click", function () {
          var itemName = document.getElementById("item-list").value;
          var itemLocation = document.getElementById("location-list").value;
          var resultElem = document.getElementById("result");
          if (itemName === "" || itemLocation === "") {
            resultElem.innerText = "Please select an item and the location you found it.";
          } else {
            var presetNumber = itemList.find(function (e) {
              return e.name === itemName;
            }).locations.find(function (e) {
              return e.value === itemLocation;
            }).presetNumber;
            resultElem.innerHTML = "You are currently playing on <a href=\"/wiki/Item_Locations#Preset_#".concat(presetNumber, "\">Preset #").concat(presetNumber, "</a>");
          }
        });
      });
    } catch (e) {
      console.error(e);
      contentElem.innerHTML = "<p>An error has occurred while trying to fetch item locations. Please report this error to wiki staff.</p><span class=\"wds-button\"><a target=\"_blank\" rel=\"nofollow noreferrer noopener\" href=\"https://granny.fandom.com/wiki/Item_Locations\">Back to Item Locations</a></span>";
    }
  }

  // Rummage through the preset tables and convert it into a format that the tool understands
  function parsePresets() {
    return new Promise(function (resolve, reject) {
      fetch("/wiki/Item_Locations").then(function (res) {
        return res.text();
      }).then(function (html) {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(html, "text/html");
        var items = [];
        for (var i = 1; i <= numPresets; i++) {
          var tableChildNodes = htmlDoc.querySelector("#preset-".concat(i, "-table")).getElementsByTagName("tbody")[0].childNodes;
          var _loop = function _loop() {
            var tableEntry = tableChildNodes[j];
            if ((tableEntry === null || tableEntry === void 0 ? void 0 : tableEntry.tagName) === "TR" && tableEntry.getElementsByTagName("td").length > 0) {
              var itemName = tableEntry.getElementsByTagName("td")[0].innerText;
              var itemLocation = tableEntry.getElementsByTagName("td")[1].innerText;
              if (!items.some(function (e) {
                return e.name === itemName;
              })) {
                items.push({
                  name: itemName,
                  locations: [{
                    presetNumber: i,
                    value: itemLocation
                  }]
                });
              } else if (items.some(function (e) {
                return e.name === itemName;
              })) {
                var _itemName = tableEntry.getElementsByTagName("td")[0].innerText;
                var _itemLocation = tableEntry.getElementsByTagName("td")[1].innerText;
                items.find(function (e) {
                  return e.name === _itemName;
                }).locations.push({
                  presetNumber: i,
                  value: _itemLocation
                });
              }
            }
          };
          for (var j = 0; j < tableChildNodes.length; j++) {
            _loop();
          }
        }
        resolve(items);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
})();
// End Preset Search