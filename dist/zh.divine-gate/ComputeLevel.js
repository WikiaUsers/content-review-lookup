var curUnit;

function evaluateCurve(curveName, level) {
    var mini = curUnit[curveName][0];
    var maxi = curUnit[curveName][1];
    var expi = curUnit[curveName][2];
    if (level <= 1) {
        return mini;
    } else if (level >= curUnit.lv) {
        return maxi;
    } else {
        var factor = Math.pow((level - 1) / (curUnit.lv - 1), expi);
        return mini + (maxi - mini) * factor;
    }
}

function getCurExp() {
    var curLevel = +$('#blend-cur-level').val();
    return Math.round(evaluateCurve('exp', curLevel)) - $('#blend-next').val();
}

function computeBestLevel(blendMult) {
    // Copied from [[Module:Info]]...
    var lvMax1 = curUnit.lv - 1;
    if (lvMax1 === 0) {
        return 1;
    }
    
    var blendDiff = (curUnit.blend[1] - curUnit.blend[0]) * blendMult;
    var blendCurve = curUnit.blend[2];
    if (blendDiff === 0 || blendCurve === 0) {
        return 1;
    }
    
    var expCurve = curUnit.exp[2];
    var expMax = curUnit.exp[1];
    if (blendCurve === expCurve) {
        return (blendDiff > expMax) ? curUnit.lv : 1;
    }
    
    var rawFactor = (expCurve * expMax) / (blendCurve * blendDiff);
    var factor = Math.pow(rawFactor, 1 / (blendCurve - expCurve));
    if (factor > 1) { factor = 1; }
    return Math.round(factor * lvMax1) + 1;
}

function updateExp() {
    var curExp = getCurExp();
    var targetLevel = +$('#blend-target').val();
    var targetExp = Math.round(evaluateCurve('exp', targetLevel));
    $('#blend-exp').val(targetExp - curExp);
}

function updateFromExp() {
    var newExp = +$('#blend-exp').val() + getCurExp();
    var targetRatio = Math.pow(newExp / curUnit.exp[1], 1/curUnit.exp[2]);
    var targetLevel = ((targetRatio * (curUnit.lv - 1))|0) + 1;
    $('#blend-target').val(targetLevel);
}
function updateLevel() {
    $('#blend-cur-level,#blend-target').val(function(index, oldval) {
        return Math.min(curUnit.lv, oldval);
    });
    updateExp();
}

function runComputeLevel() {
    $('#blend-cur-level,#blend-next,#blend-target').change(updateLevel);
    $('#blend-exp').change(updateFromExp);

    loadData([['Unit']], function () {
        curUnit = $.Unit['001'];
        
        makeUnitPicker($('#blend-unit-ids'), function (unitID) {
            curUnit = $.Unit[unitID];
            updateLevel();
            
            var noLv = computeBestLevel(1.5);
            var halfLv = computeBestLevel(1.5 * 1.25);
            var fullLv = computeBestLevel(1.5 * 1.5);
            var noBlend = Math.round(evaluateCurve('blend', noLv) * 1.5);
            var halfBlend = Math.round(evaluateCurve('blend', halfLv) * 1.5 * 1.25);
            var fullBlend = Math.round(evaluateCurve('blend', fullLv) * 1.5 * 1.5);
            
            $('#best-level-no-friend').text(noLv);
            $('#output-exp-no-friend').text(noBlend);
            $('#best-level-half-friend').text(halfLv);
            $('#output-exp-half-friend').text(halfBlend);
            $('#best-level-full-friend').text(fullLv);
            $('#output-exp-full-friend').text(fullBlend);
        });
    });
}