// For [[Create#Exchange Rate]]
// Current Rate: 0.05 USD per Funk Coin
// USD to FunkCoin: n / 0.05
// FunkCoin to USD: n * 0.05
// ------------
// Current Purchase Rate: 1 USD per Funk Coin
// USD to FunkCoin: n / 1
// FunkCoin to USD: n * 1
 
var recentConversion;
var rate = 0.0035;
function changeRate(i) {
    rate = i;
    if(recentConversion) recentConversion();
}
 
function validate() {
    var funkcoinBox = document.getElementById("funkcoinBox");
    var USDBox = document.getElementById('USDBox');
    if (funkcoinBox.value < 0) {
        document.getElementById('errorMessage').innerHTML = 'Error: FunkCoin value cannot be less than 0.';
        return false;
    }
    if (Math.round(funkcoinBox.value) != funkcoinBox.value) {
        document.getElementById('errorMessage').innerHTML = 'Error: FunkCoin value must be a whole number.';
        return false;
    }
    if (USDBox.value < 0) {
        document.getElementById('errorMessage').innerHTML = 'Error: USD value cannot be less than 0.';
        return false;
    }
    document.getElementById('errorMessage').innerHTML = '';
    return true;
}
 
function convertFunkCoin() {
    var funkcoinBox = document.getElementById("funkcoinBox");
    var USDBox = document.getElementById('USDBox');
    if (validate()) {
        try {
            USDBox.value = Math.round(parseFloat(funkcoinBox.value) * rate*100)/100;
            recentConversion = convertFunkCoin;
        }
        catch (e) {
            USDBox.value = "ERROR";
        }
    }
}
 
function convertUSD() {
    var funkcoinBox = document.getElementById("funkcoinBox");
    var USDBox = document.getElementById('USDBox');
    if (validate()) {
        try {
            funkcoinBox.value = Math.round(USDBox.value / rate);
            recentConversion = convertUSD;
        }
        catch (e) {
            funkcoinBox.value = "ERROR";
        }
    }
}
 
var elem = document.getElementById("FunkCoinUSDConverter");
if(elem !== null) {
    elem.innerHTML = '<input type="number" min="0" step="1" style="margin-bottom:10px" id="funkcoinBox" placeholder="FunkCoin" onchange="convertFunkCoin()"> FunkCoin = $<input type="number" min="0" style="margin-bottom:10px" id="USDBox" placeholder="USD" onchange="convertUSD()"><br><input type="radio" name="exchangeRate" onclick="changeRate(0.0035)" id="devExRate" checked=true><label for="devExRate">DevEx Rate</label><br><input type="radio" name="exchangeRate" onclick="changeRate(0.0125)" id="purchaseRate" value=0.0125><label for="purchaseRate">Purchase Rate</label><br><span id="errorMessage"></span>';
}