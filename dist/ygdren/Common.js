/* Any JavaScript here will be loaded for all users on every page load. */
/*function convert() {
    var numFrom, numTo;

    numFrom = document.getElementById("currFrom").value;
    convfactorFrom = document.getElementById("currFromSelect").value;
    convfactorTo = document.getElementById("currToSelect").value;
  
    var exchange = convfactorFrom/convfactorTo;
  
    numTo = exchange*numFrom;
    
    bankFee = numFrom*0.05;
    bankRemain = exchange*(numFrom-bankFee);
    
    document.getElementById("currTo").value = numTo;
    document.getElementById("bankF").value = bankFee;
    document.getElementById("bankR").value = bankRemain;
}*/

function update1() {
	var currVal2, result, convfactor1, convfactor2;
    
    console.log("Update 1 Called");
    
    currVal2 = document.getElementById("curr2").value;
    
    convfactor1 = document.getElementById("curr1Select").value;
    convfactor2 = document.getElementById("curr2Select").value;
  
    var exchange = convfactor2/convfactor1;
    
    result = exchange*currVal2;
    
    document.getElementById("curr1").value = result;
    
    var currSelect = document.getElementById("curr1Select");
    var selectedText = currSelect.options[currSelect.selectedIndex].text;
    
    calcBankFee(result, exchange, selectedText);
}

function update2() {
    var currVal1, result, convfactor1, convfactor2;
    
    console.log("Update 2 Called");
    
    currVal1 = document.getElementById("curr1").value;
    
    convfactor1 = document.getElementById("curr1Select").value;
    convfactor2 = document.getElementById("curr2Select").value;
  
    var exchange = convfactor1/convfactor2;
    
    result = exchange*currVal1;
    
    document.getElementById("curr2").value = result;
    
    var currSelect = document.getElementById("curr2Select");
    var selectedText = currSelect.options[currSelect.selectedIndex].text;
    
    calcBankFee(result, exchange, selectedText);
}

function calcBankFee(result, exchange, conv) {
    var bankFee, bankRemain;
    
    bankFee = Math.ceil(result * 0.05);
    bankRemain = result - bankFee;
    
    document.getElementById("bankF").value = bankFee + ' ' + conv;
    document.getElementById("bankR").value = bankRemain + ' ' + conv;
}

var list = 
    '<option class="calc_option" value="5">Aldwyran Fyr</option>' +
    '<option class="calc_option" value="100">Aldwyran Mark</option>' +
    '<option class="calc_option" value="10">Angolian Renn</option>' +
    '<option class="calc_option" value="1">Athelian Penny</option>' +
    '<option class="calc_option" value="20">Athelian Shilling</option>' +
    '<option class="calc_option" value="100">Athelian Crown</option>' +
    '<option class="calc_option" value="0.5">Corelean Peso</option>' +
    '<option class="calc_option" value="50">Corelean Real</option>' +
    '<option class="calc_option" value="1">Dwarven Rill</option>' +
    '<option class="calc_option" value="50">Dwarven Draig</option>' +
    '<option class="calc_option" value="1">Edraxian Circum</option>' +
    '<option class="calc_option" value="50">Edraxian Denarii</option>' +
    '<option class="calc_option" value="5">Kharosian Eka</option>' +
    '<option class="calc_option" value="50">Kharosian Drachma</option>' +
    '<option class="calc_option" value="0.5">Kyoshite Yao</option>' +
    '<option class="calc_option" value="50">Mordael Karash</option>' +
    '<option class="calc_option" value="10">Radenian Bloth</option>' +
    '<option class="calc_option" value="20">Salassi Lisk</option>' +
    '<option class="calc_option" value="0.1">Sovereign Riyal</option>' +
    '<option class="calc_option" value="10">Ursine Ruble</option>' +
    '<option class="calc_option" value="1">Varesian Soux</option>' +
    '<option class="calc_option" value="25">Varesian Denier</option>' +
    '<option class="calc_option" value="100">Varesian Florin</option>' +
    '<option class="calc_option" value="10">Zandarian Rook</option>' +
    '<option class="calc_option" value="2">Zorathki Dinar</option>' +
    '<option class="calc_option" value="500">Antique Gold Coin</option>' +
    '<option class="calc_option" value="50">Antique Silver Coin</option>' +
    '<option class="calc_option" value="5">Antique Copper Coin</option>' +
    '<option class="calc_option" value="250">Antique Electrum Coin</option>' +
    '<option class="calc_option" value="5000">Antique Platinum Coin</option>';

$(function () {
    if ($('#conv_wrapper').length > 0) {
        document.getElementById('conv_wrapper').innerHTML =
            '<input id="curr1" type="number" class="calc" oninput="update2()" value="1">' +
            '<select id="curr1Select" class="calc" style="height:38px;" onchange="update2()">' + list + '</select>' +
            '<br>' +
            '<input id="curr2" type="number" class="calc" oninput="update1()" value="1">' +
            '<select id="curr2Select" class="calc" style="height:38px;" onchange="update2()">' + list + '</select>' +
            '<br>' +
            '<div align="right"><small><span><i>Bank Fee:</i></span>' +
            '<input id="bankF" type="text" class="calc" style="height:26px;font-size:11px" readonly>' +
            '</div></small>' +
            '<div align="right"><small><span><i>Remaining:</i></span>' +
            '<input id="bankR" type="text" class="calc" style="height:26px;font-size:11px" readonly>' +
            '</div></small>';
            
        var script = document.createElement("script");
		script.type="text/javascript";
		script.innerHTML= update1.toString() + update2.toString() + calcBankFee.toString();
		document.head.appendChild(script);
    }
});