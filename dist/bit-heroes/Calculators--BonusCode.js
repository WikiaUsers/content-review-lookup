var vDaily = 6;
var vRunes = 5;
const styleSheet = document.createElement('style');
styleSheet.innerHTML = '#calculator-container {width: 100%;}' +
    '#if-calculator {width: 350px;text-align: center;border: 1px solid #bfcfcf;background-color: #f9fcff;padding: 8px 10px;margin: 0 auto;}' +
    '#if-calculator input + input {margin-left: .5em;}' +
    '#if-values {margin-top: 1em;}' +
    '#if-values p {margin: 0;}' +
    '#if-values span {font-weight: 700;}';
document.head.appendChild(styleSheet);
const ifCalculator = document.getElementById('if-calculator');
ifCalculator.innerHTML = 
    '<label for="dailyBonus">Daily Bonus: </label>' +
    '<input id="dailyBonus" type="text" value="0" size="4" maxlength="3">' +
    '<p><label for="runesBonus">Runes: </label>' +
    '<input id="runesBonus" type="text" value="0" size="4" maxlength="2">' +
    '<div id="if-values">' +
    '<p>Total Item Find: <span id="ifValue"></span></p>' +
    '</div>';
(function () {

    const inputDailyBonus = document.getElementById('dailyBonus');
    const inputRunesBonus = document.getElementById('runesBonus');
    const ifValue = document.getElementById('ifValue');
    inputDailyBonus.addEventListener('input', validateDaily);
    inputRunesBonus.addEventListener('input', validateRunes);
        
    function validateDaily(e) {
        const minDaily = 0;
        const maxDaily = 200;
        const daily = parseInt(e.target.value);
        if (Number.isNaN(daily) || daily < minDaily) {
            e.target.value = minDaily;
            }
        if (daily > maxDaily) {
            e.target.value = maxDaily;
            }
        var vDaily = daily;
        if (typeof vDaily !== 'undefined' ||
            typeof vRunes !== 'undefined') {
            const totalBonus = getTotalBonuses(input1 = vDaily, input2 = vRunes);
            ifValue.textContent = formatNumber(totalBonus);
        }
    }
    
    function validateRunes(e) {
        const minRunes = 0;
        const maxRunes = 200;
        const runes = parseInt(e.target.value);
        if (Number.isNaN(runes) || runes < minRunes) {
            e.target.value = minRunes;
            }
        if (runes > maxRunes) {
            e.target.value = maxRunes;
            }
        var vRunes = runes;
        if (typeof vDaily !== 'undefined' ||
            typeof vRunes !== 'undefined') {
            const totalBonus = getTotalBonuses(input1 = vDaily, input2 = vRunes);
            ifValue.textContent = formatNumber(totalBonus);
        }
    }

    function getTotalBonuses(input1, input2) {
        return (100 + input1 + input2);
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}());