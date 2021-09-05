// exceptionnal func
$(document).ready(function exceptionnal() {
	// sur hover de ".upg-btns .upg1", déclenche les fonctions d'ajout de classe "exceptionnal" / "flawless" / "radiant",
	// Classes qui possèdent de la CSS embarquée,
	// Les valeurs des pseudo-elements sont déjà enregistrées (ligne "Relic reward" dans la stylesheet)
	$(".upg-btns .upg1").hover(
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).addClass("exceptionnal");
		},
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).removeClass("exceptionnal");
		}
	);
});

// flawless func
$(document).ready(function flawless() {
	$(".upg2").hover(
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).addClass("flawless");
		},
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).removeClass("flawless");
		}
	);
});

// radiant func
$(document).ready(function radiant() {
	$(".upg3").hover(
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).addClass("radiant");
		},
		function () {
			$(
				".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
			).removeClass("radiant");
		}
	);
});


/*old to keep*/
if (document.getElementById("72656C6963table")) {
    document.getElementById("relic-intact-button").onclick = function () { oldIntact() };
    document.getElementById("relic-exceptional-button").onclick = function () { oldExceptional() };
    document.getElementById("relic-flawless-button").onclick = function () { oldFlawless() };
    document.getElementById("relic-radiant-button").onclick = function () { oldRadiant() };
}

function oldIntact() {
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

function oldExceptional() {
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

function oldFlawless() {
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

function oldRadiant() {
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