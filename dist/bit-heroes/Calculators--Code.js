const styleSheet = document.createElement('style');
styleSheet.innerHTML = '#calculator-container {width: 100%;}' +
    '#exp-calculator {width: 350px;text-align: center;border: 1px solid #bfcfcf;background-color: #f9fcff;padding: 8px 10px;margin: 0 auto;}' +
    '#exp-calculator input + input {margin-left: .5em;}' +
    '#exp-values {margin-top: 1em;}' +
    '#exp-values p {margin: 0;}' +
    '#exp-values span {font-weight: 700;}';
document.head.appendChild(styleSheet);
const expCalculator = document.getElementById('exp-calculator');
expCalculator.innerHTML = '<label for="level">Level: </label>' +
    '<input id="level" type="text" value="1" size="8" maxlength="4">' +
    '<input id="minus" type="button" value="-">' +
    '<input id="plus" type="button" value="+">' +
    '<div id="exp-values">' +
    '<p>Experience for next level: <span id="expValue"></span></p>' +
    '<p>Experience total: <span id="expTotalValue"></span></p>' +
    '<p>Guild experience for next level: <span id="gExpValue"></span></p>' +
    '<p>Guild experience total: <span id="gexpTotalValue"></span></p>' +
    '</div>';
(function () {
    const minLevel = 1;
    const maxLevel = 9999;
    const inputLevel = document.getElementById('level');
    const buttonMinus = document.getElementById('minus');
    const buttonPlus = document.getElementById('plus');
    const expValue = document.getElementById('expValue');
    const expTotalValue = document.getElementById('expTotalValue');
    const gExpValue = document.getElementById('gExpValue');
    const gexpTotalValue = document.getElementById('gexpTotalValue');
    inputLevel.addEventListener('input', calculateExperience);
    buttonMinus.addEventListener('mouseup', minus);
    buttonPlus.addEventListener('mouseup', plus);
    inputLevel.dispatchEvent(new Event('input'));
    function minus() {
        const lvl = parseInt(inputLevel.value);
        inputLevel.value = (lvl > minLevel) ? lvl - 1 : minLevel;
        inputLevel.dispatchEvent(new Event('input'));
    }
    function plus() {
        const lvl = parseInt(inputLevel.value);
        inputLevel.value = (lvl < maxLevel) ? lvl + 1 : maxLevel;
        inputLevel.dispatchEvent(new Event('input'));
    }
    function calculateExperience(e) {
        validateLevel(e);
        const lvl = parseInt(e.target.value);
        const exp = getExp(lvl);
        const expPrev = getExp(lvl - 1);
        const diff = exp - expPrev;
        const gExp = exp;
        const gDiff = diff;
        expValue.textContent = formatNumber(roundExp(diff));
        expTotalValue.textContent = formatNumber(roundExp(exp));
        gExpValue.textContent = formatNumber(roundExp(gDiff) * 50);
        gexpTotalValue.textContent = formatNumber(roundExp(gExp) * 50);
    }
    function validateLevel(e) {
        const lvl = parseInt(e.target.value);
        if (Number.isNaN(lvl) || lvl < minLevel) {
            e.target.value = minLevel;
        }
        if (lvl > maxLevel) {
            e.target.value = maxLevel;
        }
    }
    function getExp(lvl) {
        return Math.pow(lvl / 50, 2) * 800000 * (lvl / 100 + 0.15);
    }
    function roundExp(exp) {
        return Math.round(exp / 10) * 10;
    }
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}());