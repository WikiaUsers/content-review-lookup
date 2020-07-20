// create inputs
Array.from(document.getElementsByClassName('pseudo-input')).forEach(function (input) {
    var result = document.createElement('input'),
        classes = Array.from(input.classList);
    result.type = classes.find(function (name) { return name.startsWith('input-'); }).slice(6);
    classes.forEach(function (name) {
        if (name.startsWith('attr-')) {
            var match = name.slice(5).match(/(.+?)-(.+)/);
            result.setAttribute(match[1], match[2].replace(/--?/g, function (m) { return m === '--' ? '-' : ' '; }));
        }
    });
    input.parentElement.insertBefore(result, input);
    input.parentElement.removeChild(input);
});

Array.from(document.getElementsByClassName('loot-table')).forEach(function (table) {
    var chanceCells = Array.from(table.children[1].children[0].children).slice(1).map(function (row) { return row.children[2]; }),
        loot = Array.from(table.children[1].children[0].children).slice(1).map(function (row) { return !!row.children[3]; }),
        title = table.getAttribute(title),
        buttons = table.children[0],
        noLootingRing = buttons.children[0],
        lootingRing = buttons.children[1],
        noBadMayor = buttons.children[2],
        badMayor = buttons.children[3],
        noNeutralMayor = buttons.children[4],
        neutralMayor = buttons.children[5],
        noGoodMayor = buttons.children[6],
        goodMayor = buttons.children[7],
        noGreatMayor = buttons.children[8],
        greatMayor = buttons.children[9];

    setTimeout(function () {
        lootingRing.style.display = badMayor.style.display = noNeutralMayor.style.display = goodMayor.style.display = greatMayor.style.display = 'none';
    }, 0);

    function refresh() {
        var multiplier = 1;
        if (badMayor.style.display === '') {
            multiplier += 0.2;
        } else if (goodMayor.style.display === '') {
            multiplier -= 0.15;
        } else if (greatMayor.style.display === '') {
            multiplier -= 0.25;
        }
        var lootingRingActive = lootingRing.style.display === '';
        for (var i = 0; i < chanceCells.length; i++) {
            var chanceCell = chanceCells[i];
            chanceCell.innerText = chanceCell.innerText.replace(/\d+(?=\s*(?:\*|$))/, Math.round(chanceCell.getAttribute('data-base') * multiplier / ((lootingRingActive && loot[i]) + 1)));
            var lootingRingCell = (chanceCell.parentElement.children[3] || {children: []}).children[0];
            if (lootingRingCell) {
                lootingRingCell.title = lootingRingCell.title.replace(/\d+(?=\s+with)/, Math.round(chanceCell.getAttribute('data-base') * multiplier / 2));
            }
        }
        // To show the lazy load icons
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
    }

    function clearMayor() {
        noBadMayor.style.display = '';
        badMayor.style.display = 'none';
        noNeutralMayor.style.display = '';
        neutralMayor.style.display = 'none';
        noGoodMayor.style.display = '';
        goodMayor.style.display = 'none';
        noGreatMayor.style.display = '';
        greatMayor.style.display = 'none';
    }

    noLootingRing.addEventListener('click', function () {
        noLootingRing.style.display = 'none';
        lootingRing.style.display = '';
        refresh();
    });

    lootingRing.addEventListener('click', function () {
        noLootingRing.style.display = '';
        lootingRing.style.display = 'none';
        refresh();
    });

    noBadMayor.addEventListener('click', function () {
        clearMayor();
        noBadMayor.style.display = 'none';
        badMayor.style.display = '';
        refresh();
    });

    noNeutralMayor.addEventListener('click', function () {
        clearMayor();
        noNeutralMayor.style.display = 'none';
        neutralMayor.style.display = '';
        refresh();
    });

    noGoodMayor.addEventListener('click', function () {
        clearMayor();
        noGoodMayor.style.display = 'none';
        goodMayor.style.display = '';
        refresh();
    });

    noGreatMayor.addEventListener('click', function () {
        clearMayor();
        noGreatMayor.style.display = 'none';
        greatMayor.style.display = '';
        refresh();
    });
});

function calculateHitChance(accuracy, defense, opts) {
    if (!opts) opts = {};
    if (defense % 2) {
        return (calculateHitChance(accuracy, defense + 1, opts) + calculateHitChance(accuracy, defense - 1, opts)) / 2;
    }
    if (opts.strengthPotion) accuracy = Math.floor(accuracy * 1.25);
    var result = 1 / Math.max(1, defense / 2 - accuracy + 1);
    return result;
}

function copyAttributes(source, dest) {
    for (var attribute in Object.getOwnPropertyDescriptors(source.attributes)) {
        if(!/^\d+$/.test(attribute)) {
            $0.setAttribute(k, source.getAttribute(attribute));
        }
    }
}

Array.from(document.getElementsByClassName('hit-chance-calculator')).forEach(function (calc) {
    var strengthPotion = calc.children[0],
        accuracy = calc.children[2],
        defense = calc.children[4],
        hitChance = calc.children[6];
    function recalculateHitChance() {
        hitChance.innerText = (calculateHitChance(+accuracy.value, +defense.value, {strengthPotion: strengthPotion.checked}) * 100).toFixed(2);
    }
    strengthPotion.checked = JSON.parse(localStorage.getItem('hit-chance strengthPotion'));
    if (accuracy.value === '') {
        accuracy.value = JSON.parse(localStorage.getItem('hit-chance accuracy')) || '0';
    }
    if (defense.value === '') {
        defense.value = JSON.parse(localStorage.getItem('hit-chance defense')) || '0';
    }
    strengthPotion.addEventListener('change', function () {
        localStorage.setItem('hit-chance strengthPotion', JSON.stringify(strengthPotion.checked));
        recalculateHitChance();
    });
    accuracy.addEventListener('input', function () {
        localStorage.setItem('hit-chance accuracy', JSON.stringify(accuracy.value));
        recalculateHitChance();
    });
    defense.addEventListener('input', function () {
        localStorage.setItem('hit-chance defense', JSON.stringify(defense.value));
        recalculateHitChance();
    });
    recalculateHitChance();
});