const styleSheet = document.createElement('style');
styleSheet.innerHTML = '#calculator-container {width: 100%;}' +
    '#if-calculator {width: 250px;text-align: center;border: 1px solid #bfcfcf;background-color: #f9fcff;padding: 8px 10px;margin: 0 auto;}' +
    '#if-calculator input + input {margin-left: .5em;}' +
    '#if-values {margin-top: 1em;}' +
    '#if-values p {margin: 0;}' +
    '#if-values span {font-weight: 700;}';
document.head.appendChild(styleSheet);
const ifCalculator = document.getElementById('if-calculator');
ifCalculator.innerHTML = 
    '<p><label for="runesBonus">Runes: </label>' +
    '<input id="runesBonus1" type="int" value="" size="3" maxlength="4">' +
    '<input id="runesBonus2" type="int" value="" size="3" maxlength="4">' +
    '<p><label for="guildBonus">Guild Bonus: </label>' +
    '<input id="guildBonus" type="int" value="" size="3" maxlength="2">' +
    '<p><label for="consumableBonus">Consumable: </label>' +
    '<input id="consumableBonus" type="int" value="" size="3" maxlength="4">' +
    '<p><label for="dailyBonus">Daily Bonus: </label>' +
    '<input id="dailyBonus" type="int" value="" size="3" maxlength="3">' +
    '<p><label for="adgorBonus">Adgor: </label>' +
    '<input id="adgorBonus" type="int" value="" size="3" maxlength="2">' +
    '<p><label for="encounterBonus">Encounter Bonus: </label>' +
    '<input id="encounterBonus" type="int" value="" size="3" maxlength="4">' +
    '<div id="if-values">' +
    '<p><b>Total Item Find: <span id="ifValue"></span> :3500% </b></p>' +
    '</div>';
(function () {
    const inputRunesBonus1 = document.getElementById('runesBonus1');
    const inputRunesBonus2 = document.getElementById('runesBonus2');
    const inputGuildBonus = document.getElementById('guildBonus');
    const inputConsumableBonus = document.getElementById('consumableBonus');
    const inputDailyBonus = document.getElementById('dailyBonus');
    const inputAdgorBonus = document.getElementById('adgorBonus');
    const inputEncounterBonus = document.getElementById('encounterBonus');
    const ifValue = document.getElementById('ifValue');
    inputRunesBonus1.addEventListener('input', calculateIF);
    inputRunesBonus2.addEventListener('input', calculateIF);
    inputGuildBonus.addEventListener('input', calculateIF);
    inputConsumableBonus.addEventListener('input', calculateIF);
    inputDailyBonus.addEventListener('input', calculateIF);
    inputAdgorBonus.addEventListener('input', calculateIF);
    inputEncounterBonus.addEventListener('input', calculateIF);
    inputLevel.dispatchEvent(new Event('input'));

    function calculateIF() {
        const runesBonus1 = parseFloat(document.getElementById('runesBonus1').value.replace(/,/g, "."));
        const runesBonus2 = parseFloat(document.getElementById('runesBonus2').value.replace(/,/g, "."));
        const guildBonus = parseInt(document.getElementById('guildBonus').value);
        const consumableBonus = parseInt(document.getElementById('consumableBonus').value);
        const dailyBonus = parseInt(document.getElementById('dailyBonus').value);
        const adgorBonus = parseInt(document.getElementById('adgorBonus').value);
        const encounterBonus = parseFloat(document.getElementById('encounterBonus').value.replace(/,/g, ".")).toFixed(2);
        const totalBonuses = 100 + runesBonus1 + runesBonus2 + guildBonus + consumableBonus + dailyBonus + adgorBonus;
        const totalIF = totalBonuses + (totalBonuses * encounterBonus);
        ifValue.textContent = parseFloat(totalIF).toFixed(2);
    }  
}());