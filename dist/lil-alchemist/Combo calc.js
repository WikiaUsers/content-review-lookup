var submit = document.getElementById("submit");

submit.onclick = function () {
    var c1lvl = Number(document.getElementById("c1lvl").value);
    var c2lvl = Number(document.getElementById("c2lvl").value);
    var c1rare = Number(document.getElementById("c1rare").value);
    var c2rare = Number(document.getElementById("c2rare").value);
    var baseAtt = Number(document.getElementById("baseAtt").value);
    var baseDef = Number(document.getElementById("baseDef").value);
    var baseRare = Number(document.getElementById("baseRare").value);

    var valid = checkAllValid(c1lvl, c2lvl, c1rare, c2rare, baseAtt, baseDef, baseRare);

    if (valid) {
        startCalc(c1lvl, c2lvl, c1rare, c2rare, baseAtt, baseDef, baseRare);
    } else {
        window.alert("Try again, with valid values.");
    }
};

function checkAllValid(lv1, lv2, r1, r2, bA, bD, bR) {
    var result = false;
    if (lv1 < 1 || lv1 > 5) {
        window.alert("Card 1 Level invalid");
        document.getElementById("c1lvl").value = 1;
    } else if (lv2 < 1 || lv2 > 5) {
        window.alert("Card 2 Level invalid");
        document.getElementById("c2lvl").value = 1;

    } else if (r1 < 0 || r1 > 5) {
        window.alert("Card 1 Rarity invalid");
        document.getElementById("c1rare").value = 1;

    } else if (r2 < 0 || r2 > 5) {
        window.alert("Card 1 Rarity invalid");
        document.getElementById("c2rare").value = 1;

    } else if (bA < 0 || bA > 25) {
        window.alert("Base Card attack invalid");
        document.getElementById("baseAtt").value = 0;

    } else if (bD < 0 || bD > 25) {
        window.alert("Base Card attack invalid");
        document.getElementById("baseDef").value = 0;

    } else if (bR < 0 || bR > 5) {
        window.alert("Base Card Rarity invalid");
        document.getElementById("baseRare").value = 1;

    } else {
        result = true;
    }
    return result;
}

function startCalc(lv1, lv2, r1, r2, bA, bD, bR) {
    var outLvl = cardLevel(lv1, lv2, r1, r2, bR);
    var outAtt = cardStat(r1, r2, bA, bR, outLvl);
    var outDef = cardStat(r1, r2, bD, bR, outLvl);
    document.getElementById("outAttack").innerHTML = outAtt;
    document.getElementById("outDefense").innerHTML = outDef;
}

function cardLevel(lv1, lv2, r1, r2, bR) {
    var level = Math.ceil((lv1 + lv2) / 2);
    if (bR >= 3 || r1 === 5 || r2 === 5) {
        level++;
        document.getElementById("outLevel").innerHTML = level;
    } else {
        document.getElementById("outLevel").innerHTML = level;
    }
    return level;
}

function cardStat(r1, r2, bS, bR, lvO) {
    var buff, result;
    switch (bR) {
        case 1:
            buff = 7;
            break;
        case 2:
            buff = 5;
            break;
        case 3:
            buff = 3;
            break;
        case 4:
            buff = 0;
            break;
        case 5:
            buff = 9;
            break;
        default:
            window.alert("Buff set to -1!");
            buff = -1;
    }
    if (bR === 4 && r1 === 5 && r2 === 5) {
        buff += 3;
        result = buff + bS + ((lvO - 1) * 4);
    } else if (r1 === 5 && r2 === 5) {
        buff += 2;
        result = buff + bS + ((lvO - 1) * 4);
    } else if (r1 === 5 || r2 === 5) {
        buff = buff;
        result = buff + bS + ((lvO - 1) * 4);
    } else {
        buff = 0;
        result = buff + bS + ((lvO - 1) * (bR));
        if (r1 === r2 && bR >= 3) {
            result = buff + bS + ((lvO - 1) * (bR - 1));
        } else if (r1 > r2) {
            result = buff + bS + ((lvO - 1) * (r1));
        } else {
            result = buff + bS + ((lvO - 1) * (r2));
        }
    }

    //window.alert("Last if: " + result + ", " + buff + ", " + bS + ", " + lvO + ", " + bR);
    return result;
}