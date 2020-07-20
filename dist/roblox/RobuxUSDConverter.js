// Current DevEx Rate: 0.0035 USD per Robuck
// USD to Robux: n / 0.0035
// Robux to USD: n * 0.0035
// ------------
// Current Purchase Rate: 0.0125 USD per Robuck
// USD to Robux: n / 0.0125
// Robux to USD: n * 0.0125
 
var recentConversion;
var rate = 0.0035;
function changeRate(i) {
    rate = i;
    if(recentConversion) recentConversion();
}
 
function validate() {
    var robuxBox = document.getElementById("robuxBox");
    var USDBox = document.getElementById('USDBox');
    if (robuxBox.value < 0) {
        document.getElementById('errorMessage').innerHTML = 'Error: Robux value cannot be less than 0.';
        return false;
    }
    if (Math.round(robuxBox.value) != robuxBox.value) {
        document.getElementById('errorMessage').innerHTML = 'Error: Robux value must be a whole number.';
        return false;
    }
    if (USDBox.value < 0) {
        document.getElementById('errorMessage').innerHTML = 'Error: USD value cannot be less than 0.';
        return false;
    }
    document.getElementById('errorMessage').innerHTML = '';
    return true;
}
 
function convertRobux() {
    var robuxBox = document.getElementById("robuxBox");
    var USDBox = document.getElementById('USDBox');
    if (validate()) {
        try {
            USDBox.value = Math.round(parseFloat(robuxBox.value) * rate*100)/100;
            recentConversion = convertRobux;
        }
        catch (e) {
            USDBox.value = "ERROR";
        }
    }
}
 
function convertUSD() {
    var robuxBox = document.getElementById("robuxBox");
    var USDBox = document.getElementById('USDBox');
    if (validate()) {
        try {
            robuxBox.value = Math.round(USDBox.value / rate);
            recentConversion = convertUSD;
        }
        catch (e) {
            robuxBox.value = "ERROR";
        }
    }
}
 
var elem = document.getElementById("RobuxUSDConverter");
if(elem !== null) {
    elem.innerHTML = '<input type="number" min="0" step="1" style="margin-bottom:10px" id="robuxBox" placeholder="Robux" onchange="convertRobux()"> Robux = $<input type="number" min="0" style="margin-bottom:10px" id="USDBox" placeholder="USD" onchange="convertUSD()"><br><input type="radio" name="exchangeRate" onclick="changeRate(0.0035)" id="devExRate" checked=true><label for="devExRate">DevEx Rate</label><br><input type="radio" name="exchangeRate" onclick="changeRate(0.0125)" id="purchaseRate" value=0.0125><label for="purchaseRate">Purchase Rate</label><br><span id="errorMessage"></span>';
}