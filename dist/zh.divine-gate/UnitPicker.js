/**

使用方法：

    <script src="/load.php?mode=articles&only=scripts&articles=MediaWiki:UnitData.js|MediaWiki:UnitPicker.js"></script>

    ...

    makeUnitPicker($('#unit-picker'), function (unitID) {
        alert('Unit ' + unitID + ' is selected!');
    });

    ...

    <button id=unit-picker>Loading…</button>

*/

var unitPickerNameMappings = null;
var unitPickerEquivalentSets = [
    /[火炎]/i,
    /[暗闇]/i,
    /[風木]/i,
    /[aàáâãäåāǎ]/i,
    /[cçćĉċč]/i,
    /[dðďđ]/i,
    /[eèéêëēĕėęě]/i,
    /[gĝğġģ]/i,
    /[hĥħ]/i,
    /[iìíîïĩīĭįıǐ]/i,
    /[jĵ]/i,
    /[kķĸ]/i,
    /[lĺļľŀł]/i,
    /[nñńņňŉŋ]/i,
    /[oòóôõöøōŏőǒ]/i,
    /[rŕŗř]/i,
    /[sśŝşšſ]/i,
    /[tţťŧ]/i,
    /[uùúûüũūŭůűųǔǖǘǚǜ]/i,
    /[wŵ]/i,
    /[yýÿŷ]/i,
    /[zźżž]/i,
];
var unitPickerPrevText = null;

function unitPickerInitialize(callback) {
    loadData([['Unit']], function () {
        if (!unitPickerNameMappings) {
            var mappings = [];
            var unitData = $.Unit;

            for (var unitID in unitData) {
                if (!unitData.hasOwnProperty(unitID)) {
                    continue;
                }
                var unit = unitData[unitID];
                if (!unit) {
                    continue;
                }

                mappings.push([unit.name, unitID]);
                if (unit.altnames) {
                    for (var i = 0; i < unit.altnames.length; ++ i) {
                        var alt_name = unit.altnames[i];
                        if (alt_name.charAt(0) == '?') {
                            alt_name = alt_name.substr(1);
                            mappings.push([unit.elem + alt_name, unitID]);
                        } else {
                            mappings.push([alt_name, unitID]);
                        }
                    }
                }

                if (unit.series) {
                  for (var i = 0; i < unit.series.length; ++ i) {
                    mappings.push([unit.elem + unit.series[i], unitID]);
                  }
                }
            }

            unitPickerNameMappings = mappings;
        }
        callback();
    });
}

function unitPickerUpdateName() {
    var text = this.value;
    if (text == unitPickerPrevText) {
        return;
    }
    unitPickerPrevText = text;
    var allUnitIDs = [];

    if (!text) {
    } else if (/^\d+$/.test(text)) {
        var number = +text;
        var unitID = number < 10 ? '00' + number : number < 100 ? '0' + number : number;
        allUnitIDs.push(unitID);
    } else {
        var wordRegex = /[0-9A-Za-zÀ-ÖØ-öø-ɏ]+|[^#'(),-./:=?\s]/g;
        var finalRegex = [];
        var m;
        while (m = wordRegex.exec(text)) {
            var component = m[0];
            var intermediateRegex = [];
            for (var i = 0; i < component.length; ++ i) {
                var c = component.charAt(i);
                var found = false;
                for (var j = 0; j < unitPickerEquivalentSets.length; ++ j) {
                    if (unitPickerEquivalentSets[j].test(c)) {
                        intermediateRegex.push(unitPickerEquivalentSets[j].source);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    intermediateRegex.push(c);
                }
            }
            finalRegex.push(intermediateRegex.join(''));
        }
        finalRegex = finalRegex.join('[^0-9A-Za-zÀ-ÖØ-öø-ɏ]*');
        finalRegex = new RegExp(finalRegex, 'i');

        var foundUnitIDs = {};
        var foundCount = 0;
        for (var i = 0; i < unitPickerNameMappings.length; ++ i) {
            var entry = unitPickerNameMappings[i];
            if (finalRegex.test(entry[0])) {
                var unitID = entry[1];
                if (!foundUnitIDs[unitID]) {
                    foundUnitIDs[entry[1]] = true;
                    ++ foundCount;
                    if (foundCount >= 24) {
                        break;
                    }
                }
            }
        }

        for (var unitID in foundUnitIDs) {
            if (foundUnitIDs.hasOwnProperty(unitID)) {
                allUnitIDs.push(unitID);
            }
        }
    }

    allUnitIDs.sort();

    var htmls = [];
    for (var i = 0; i < allUnitIDs.length; ++ i) {
        var unitID = allUnitIDs[i];
        var unit = $.Unit[unitID];
        if (unit) {
            htmls.push('<div class=unit-picker-item>', unitID,
                       '<br><img width=64 height=64 src="', unit.image,
                       '"></div>');
        }
    }
    if (!htmls.length) {
        htmls.push('找不到結果 — Cannot find units')
    }
    $('.unit-picker-list').html(htmls.join(''));
}

var unitPickerModalHTML = '<table style="width:680px">' +
    '<tr><td style="text-align:right;width:270px">' +
    '<label for=unit-name>請輸入Unit ID、名稱、暱稱或系列名:</label>' +
    '<td style="width:410px" rowspan=2>' +
    '<input type=text id=unit-name style="font-size:2em;width:100%">' +
    '<tr><td style="font-size:smaller;text-align:right;width:270px">' +
    '<label for=unit-name>Please enter the unit ID or name:</label>' +
    '<tr><td colspan=2 class=unit-picker-list></table>';

function makeUnitPicker(buttons, callback) {
    unitPickerInitialize(function() {
        buttons.addClass('unit-picker').html('<img src="' + $.Unit['001'].smallimage + '"> 001');
        buttons.click(function() {
            var button = this;
            var currentUnitId = $(this).text().match(/\d+/)[0];
            var currentUnitName = $.Unit[currentUnitId].name;
            var modal = $.showModal('選擇Unit', unitPickerModalHTML, {width:720, height:480, rawHTML:true});
            modal.on('click', '.unit-picker-list div', function() {
                var unitID = $(this).text();
                $(button).html('<img src="' + $.Unit[unitID].smallimage + '"> ' + unitID);
                callback.call(button, unitID);
                modal.closeModal();
            });
            unitPickerPrevText = null;
            $('input', modal).keyup(unitPickerUpdateName).val(currentUnitName).focus().keyup();
        });
    });
}