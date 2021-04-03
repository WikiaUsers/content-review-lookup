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
function calculateHitChance(accuracy, defense, opts) {
    if (!opts) opts = {};
    if (defense % 2) {
        return (calculateHitChance(accuracy, defense + 1, opts) + calculateHitChance(accuracy, defense - 1, opts)) / 2;
    }
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
    var accuracy = calc.children[2],
        defense = calc.children[4],
        hitChance = calc.children[6];
    function recalculateHitChance() {
        hitChance.innerText = (calculateHitChance(+accuracy.value, +defense.value) * 100).toFixed(2);
    }
    if (accuracy.value === '') {
        accuracy.value = JSON.parse(localStorage.getItem('hit-chance accuracy')) || '0';
    }
    if (defense.value === '') {
        defense.value = JSON.parse(localStorage.getItem('hit-chance defense')) || '0';
    }
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