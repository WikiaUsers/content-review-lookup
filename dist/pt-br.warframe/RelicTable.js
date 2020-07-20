if (document.getElementById("72656C6963table")) {
	document.getElementById("relic-intact-button").onclick = function() {intact()};
	document.getElementById("relic-exceptional-button").onclick = function() {exceptional()};
	document.getElementById("relic-flawless-button").onclick = function() {flawless()};
	document.getElementById("relic-radiant-button").onclick = function() {radiant()};
}

function intact(){
	var common = document.getElementById("relic-common-percentage").innerHTML;
	var res1 = common.replace(/23.33|20|16.67/g, "25.33");
	document.getElementById("relic-common-percentage").innerHTML = res1;
	document.getElementById("relic-common-bar").style.width = '76%';
 
	var uncommon = document.getElementById("relic-uncommon-percentage").innerHTML;
	var res2 = uncommon.replace(/13|17|20/g, "11");
	document.getElementById("relic-uncommon-percentage").innerHTML = res2;
	document.getElementById("relic-uncommon-bar").style.width = '22%';
 
	var rare = document.getElementById("relic-rare-percentage").innerHTML; 
	var res3 = rare.replace(/4|6|10/g, "2");
	document.getElementById("relic-rare-percentage").innerHTML = res3;
	document.getElementById("relic-rare-bar").style.width = '2%';
}

function exceptional() {
	var common = document.getElementById("relic-common-percentage").innerHTML;
	var res1 = common.replace(/25.33|20|16.67/g, "23.33");
	document.getElementById("relic-common-percentage").innerHTML = res1;
	document.getElementById("relic-common-bar").style.width = '70%';
 
	var uncommon = document.getElementById("relic-uncommon-percentage").innerHTML;
	var res2 = uncommon.replace(/11|17|20/g, "13");
	document.getElementById("relic-uncommon-percentage").innerHTML = res2;
	document.getElementById("relic-uncommon-bar").style.width = '26%';
 
	var rare = document.getElementById("relic-rare-percentage").innerHTML; 
	var res3 = rare.replace(/2|6|10/g, "4");
	document.getElementById("relic-rare-percentage").innerHTML = res3;
	document.getElementById("relic-rare-bar").style.width = '4%';
}

function flawless() {
	var common = document.getElementById("relic-common-percentage").innerHTML;
	var res1 = common.replace(/23.33|25.33|16.67/g, "20");
	document.getElementById("relic-common-percentage").innerHTML = res1;
	document.getElementById("relic-common-bar").style.width = '60%';
 
	var uncommon = document.getElementById("relic-uncommon-percentage").innerHTML; 
	var res2 = uncommon.replace(/13|11|20/g, "17");
	document.getElementById("relic-uncommon-percentage").innerHTML = res2;
	document.getElementById("relic-uncommon-bar").style.width = '34%';
 
	var rare = document.getElementById("relic-rare-percentage").innerHTML; 
	var res3 = rare.replace(/4|2|10/g, "6");
	document.getElementById("relic-rare-percentage").innerHTML = res3;
	document.getElementById("relic-rare-bar").style.width = '6%';
}

function radiant() {
	var common = document.getElementById("relic-common-percentage").innerHTML;
	var res1 = common.replace(/23.33|20|25.33/g, "16.67");
	document.getElementById("relic-common-percentage").innerHTML = res1;
	document.getElementById("relic-common-bar").style.width = '50%';
 
	var uncommon = document.getElementById("relic-uncommon-percentage").innerHTML; 
	var res2 = uncommon.replace(/13|17|11/g, "20");
	document.getElementById("relic-uncommon-percentage").innerHTML = res2;
	document.getElementById("relic-uncommon-bar").style.width = '40%';
 
	var rare = document.getElementById("relic-rare-percentage").innerHTML; 
	var res3 = rare.replace(/4|6|2/g, "10");
	document.getElementById("relic-rare-percentage").innerHTML = res3;
	document.getElementById("relic-rare-bar").style.width = '10%';
}