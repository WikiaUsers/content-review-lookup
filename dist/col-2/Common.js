/* Any JavaScript here will be loaded for all users on every page load. */
var aidSkillLevel = 1;
var aidMaxSkillLevel = 1;
var aidSkillVariable = [];
var aidSkillData = {};
var activeSkillLevel = 1;
var activeMaxSkillLevel = 1;
var activeSkillVariable = [];
var activeSkillData = {};

$(function () {
    initSkillData();

    $('span.btn-show-full-stat').click(function (e) {
        var nonHighlightedRows = $('.hero-stat-table tr:not(.highlight-row)');
        var highlightedRows = $('.hero-stat-table tr.highlight-row');
        var infoButton = $('span.btn-show-full-stat');

        if (nonHighlightedRows.css('display') == 'none') {
            nonHighlightedRows.show();
            highlightedRows.addClass('highlight');
            infoButton.text('Hide Full Stat');
        } else {
            nonHighlightedRows.hide();
            highlightedRows.removeClass('highlight');
            infoButton.text('Show Full Stat');
        }
    });

    $('#btnAidLevelUp').click(function () {
        if (aidSkillLevel < aidMaxSkillLevel) {
            aidSkillLevel += 1;
            $('#spnAidLevel').text(aidSkillLevel);
            SetAidSkillValue();
        }
    });

    $('#btnAidLevelDown').click(function () {
        if (aidSkillLevel > 1) {
            aidSkillLevel -= 1;
            $('#spnAidLevel').text(aidSkillLevel);
            SetAidSkillValue();
        }
    });

    
    $('#btnSkillLevelUp').click(function () {
        if (activeSkillLevel < activeMaxSkillLevel) {
            activeSkillLevel += 1;
            $('#spnSkillLevel').text(activeSkillLevel);
            SetActiveSkillValue();
        }
    });

    $('#btnSkillLevelDown').click(function () {
        if (activeSkillLevel > 1) {
            activeSkillLevel -= 1;
            $('#spnSkillLevel').text(activeSkillLevel);
            SetActiveSkillValue();
        }
    });

    $('div.imgThumbWrapper img').hover(function () {
        $('div.imgBuildingWrapper img').prop('src', $(this).parent().prop('href'));
    });
});

var initSkillData = function () {
    var i, j, key;
    var skillData;

    skillData = $('#divSkillData');

    if (skillData.length > 0) {
        activeMaxSkillLevel = parseInt(skillData.data('max-skill-level'));
        activeSkillVariable = skillData.data('variables').toString().split(",");

        for (i = 1; i <= activeMaxSkillLevel; i++) {
            key = 'lvl-' + i + '-rage';
            activeSkillData[key] = skillData.data(key);

            for (j = 0; j < activeSkillVariable.length; j++) {
                key = 'lvl-' + i + '-' + activeSkillVariable[j];
                activeSkillData[key] = skillData.data(key);
            }
        }

        SetActiveSkillValue();
        $('#btnSkillLevelUp').removeClass('hidden');
        $('#btnSkillLevelDown').removeClass('hidden');
    }

    skillData = $('#divAidData');

    if (skillData.length > 0) {
        aidMaxSkillLevel = parseInt(skillData.data('max-aid-level'));
        aidSkillVariable = skillData.data('variables').toString().split(",");

        for (i = 1; i <= aidMaxSkillLevel; i++) {
            for (j = 0; j < aidSkillVariable.length; j++) {
                key = 'lvl-' + i + '-' + aidSkillVariable[j];
                aidSkillData[key] = skillData.data(key);
            }
        }

        SetAidSkillValue();
        $('#btnAidLevelUp').removeClass('hidden');
        $('#btnAidLevelDown').removeClass('hidden');
    }


};

var SetAidSkillValue = function () {
    var i, key, varName;

    for (i = 0; i < aidSkillVariable.length; i++) {
        varName = aidSkillVariable[i]
        key = 'lvl-' + aidSkillLevel + '-' + varName;
        $('#spn_aid_' + varName).text(aidSkillData[key]);
    }
};

var SetActiveSkillValue = function () {
    var i, key, varName;

    key = 'lvl-' + activeSkillLevel + '-rage';
    $('#spnSkillRage').text(activeSkillData[key]);

    for (i = 0; i < activeSkillVariable.length; i++) {
        varName = activeSkillVariable[i]
        key = 'lvl-' + activeSkillLevel + '-' + varName;
        $('#spn_skill_' + varName).text(activeSkillData[key]);
    }
};