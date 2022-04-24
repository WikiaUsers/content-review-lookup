function output_ready(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "G", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}

function troops_lost_calc() {
	var fearless_value = document.getElementById('fearless_val').innerText;
	var ap_val = document.getElementById('ap_val').innerText;
	var troops_sent_multi = document.getElementById('troops_sent_multi').value;
	var troops_sent = document.getElementById('troops_sent').value*troops_sent_multi;
	var defending_might_multi = document.getElementById('defending_might_multi').value;
	var defending_might = document.getElementById('defending_might').value*defending_might_multi;

	var ap_val_final =  (ap_val/100) + 1;

	var might_send = (ap_val_final*(troops_sent));
	var might_defend = (defending_might);

	var power_ratio = (defending_might/might_send)*100;

	var troop_survival_percent = (-0.0069)*( Math.pow(power_ratio, 2))+(-0.3116*power_ratio)+100.1689;

	var output_troops_remaining = (troop_survival_percent/100) * troops_sent;

	var output_fearless_troops = (troops_sent - output_troops_remaining)*(fearless_value/100);

	var output_troops_survived = output_troops_remaining + output_fearless_troops;

	var output_troops_base = (output_troops_survived - output_troops_remaining);

	if (Math.sign(output_troops_remaining) == -1) {
		var dead_troops = output_troops_survived;
	} else {
		var dead_troops = troops_sent - output_troops_survived;
	}

	var output_percent = Math.round((output_troops_survived / troops_sent)*100000)/1000;

	if (Math.sign(output_troops_remaining) == -1) {
		var tmp_output = troops_sent * (fearless_value/100);
		document.getElementById('troops_remaining').innerHTML = "0)";
		document.getElementById('sent_to_base').innerHTML = output_ready(tmp_output, 2);
		document.getElementById('troops_survived').innerHTML = output_ready(tmp_output, 2);
		document.getElementById('win_percent').innerHTML = fearless_value + "%";
		$('#win_percent').css('width',fearless_value + "%");
	} else if (output_troops_remaining > troops_sent ) {
		var tmp_output = troops_sent * 0.999;
		document.getElementById('troops_remaining').innerHTML = output_ready(tmp_output, 2) + ")";
		document.getElementById('sent_to_base').innerHTML = output_ready(tmp_fearless, 2);
		document.getElementById('troops_survived').innerHTML = output_ready(0, 2);
		document.getElementById('win_percent').innerHTML = 99.9 + "%";
		$('#win_percent').css('width',99.9 + "%");
	} else {
		document.getElementById('troops_remaining').innerHTML = output_ready(output_troops_remaining, 2) + ")";
		document.getElementById('sent_to_base').innerHTML = output_ready(output_troops_base, 2);
		document.getElementById('troops_survived').innerHTML = output_ready(output_troops_survived, 2);
		document.getElementById('dead_troops').innerHTML = output_ready(dead_troops, 2);
		document.getElementById('win_percent').innerHTML = output_percent + "%";
		$('#win_percent').css('width',output_percent + "%");
	}


}
// need to handle large ratios with over 100% win
// condense this shit, lazy ass coding

function checkifready_attack() {

	if ($("#defending_might").val() && $("#troops_sent").val() ){
		troops_lost_calc();
	}
	else{

	}
}

$("#fearless").slider();
$("#ap").slider();


$("#fearless").on("slide", function(slideEvt) {
	$("#fearless_val").text(slideEvt.value);
	checkifready_attack();
});
$("#ap").on("slide", function(slideEvt) {
	$("#ap_val").text(slideEvt.value);
	checkifready_attack();
});


$("#defending_might").change(function(){
	checkifready_attack();
});

$("#defending_might_multi").change(function(){
	checkifready_attack();
});

$("#troops_sent").change(function(){
	checkifready_attack();
});

$("#troops_sent_multi").change(function(){
	checkifready_attack();
});


// turn all this bullshit into a simple foreach loop w/ all values




$("#city_start_slider").slider();
$("#city_end_slider").slider();

$("#city_start_slider").on("slide", function(slideEvt) {
	$("#city_start_val").text(slideEvt.value);
	city_upgrade_calc();
});
$("#city_end_slider").on("slide", function(slideEvt) {
	$("#city_end_val").text(slideEvt.value);
	city_upgrade_calc();
});

function city_upgrade_calc() {
	var city_start = document.getElementById('city_start_val').innerText;
	var city_end = document.getElementById('city_end_val').innerText;

	var cost_to_upgrade = output_ready(upgrade_cost[city_end-1] - upgrade_cost[city_start-1], 2);

	if (Math.sign(cost_to_upgrade) == -1) {
		document.getElementById('cost_to_uprade').innerHTML = "0";
	} else {
		document.getElementById('cost_to_uprade').innerHTML = output_ready(upgrade_cost[city_end-1] - upgrade_cost[city_start-1], 2);
	}
	document.getElementById('towersize_output').innerHTML = output_ready(city_wall[city_end-1], 2);

}


function level_up_rewards() {
	var current_lvl = document.getElementById('level_rewards_slider_val').innerText;
	var troop_estimate = (total_lvl_up_rewards[current_lvl-2] * 0.75) / 2;
	document.getElementById('lvl_rewards_output').innerHTML = output_ready(total_lvl_up_rewards[current_lvl-2] - total_lvl_up_rewards[current_lvl-3], 2);
	document.getElementById('total_lvl_rewards_output').innerHTML = output_ready(total_lvl_up_rewards[current_lvl-2], 2);

	document.getElementById('est_lvl_rewards_output').innerHTML = output_ready(troop_estimate, 2);
}


$("#lvl_rewards_slider").slider();

$("#lvl_rewards_slider").on("slide", function(slideEvt) {
	$("#level_rewards_slider_val").text(slideEvt.value);
	level_up_rewards();
});

var upgrade_cost= new Array (
0,
10,
22,
36,
53,
73,
97,
126,
161,
203,
254,
315,
389,
478,
584,
712,
866,
1050,
1271,
1536,
1855,
2238,
2698,
3249,
3910,
4705,
5658,
6808,
8178,
9828,
11798,
14168,
17008,
20418,
24518,
29438,
35338,
42418,
50918,
61118,
73118,
87718,
105318,
126418,
151718,
182118,
218618,
262418,
315018,
378118,
453918,
544918,
653918,
784918,
941918,
1129918,
1355918,
1625918,
1951918,
2342918,
2811918,
3374918,
4050918,
4861918,
5834918,
7004918,
8414918,
10094918,
12114918,
14534918,
17434918,
20914918,
25094918,
30104918,
36124918,
43354918,
52034918,
62434918,
74934918,
89934918,
107934918,
129534918,
155434918,
186534918,
223834918,
268534918,
322234918,
386634918,
463934918,
556734918,
667734918,
800734918,
960734918,
1152734918,
1383734918,
1660734918,
1992734918,
2390734918,
2869734918,
3444734918,
4132734918,
4958734918,
5951734918,
7141734918,
8571734918,
10291734918,
12351734918,
14821734918,
17781734918,
21341734918,
25611734918,
30741734918,
36891734918,
44275734918,
53135734918,
63735734918,
76535734918,
91835734918,
110235734918,
132335734918,
158752118639,
190502542377,
228603050862,
274323661045,
329188393264,
395026071926,
474031286322,
568837543596,
682605052325,
819126062800,
982951275370,
1179541530454,
1415449836555,
1698539803876,
2038247764661,
2445897317603,
2935076781134,
3522092137370,
4226510564854,
5071812677835,
6086175213412,
7303410256105,
8764092307336,
10516910768813,
12620292922585,
15144351507112,
18173221808545,
21807866170264,
26169439404327,
31403327285202,
37683992742252,
45220791290713,
54264949548865,
65117939458648,
78141527350388,
93769832820475,
112523799384580,
135028559261507,
162034271113818,
194441125336591,
233329350403920,
);
var city_wall = new Array (
	20,
	75,
	100,
	125,
	150,
	175,
	200,
	225,
	250,
	300,
	450,
	600,
	750,
	900,
	1050,
	1200,
	1350,
	1500,
	1650,
	2000,
	3500,
	5000,
	6500,
	8000,
	9500,
	11000,
	12500,
	14000,
	15500,
	20000,
	26000,
	32000,
	38000,
	44000,
	50000,
	56000,
	62000,
	68000,
	74000,
	100000,
	135000,
	170000,
	205000,
	240000,
	275000,
	310000,
	345000,
	380000,
	415000,
	500000,
	725000,
	950000,
	1170000,
	1400000,
	1620000,
	1850000,
	2140000,
	2290000,
	2520000,
	3000000,
	4500000,
	6000000,
	7500000,
	9000000,
	10500000,
	12000000,
	13500000,
	15000000,
	16500000,
	20000000,
	25100000,
	30000000,
	35000000,
	40000000,
	45000000,
	50000000,
	55000000,
	60000000,
	65000000,
	100000000,
	130000000,
	160000000,
	190000000,
	220000000,
	250000000,
	280000000,
	310000000,
	340000000,
	370000000,
	500000000,
	600000000,
	700000000,
	800000000,
	900000000,
	1000000000,
	1100000000,
	1200000000,
	1300000000,
	1400000000,
	2000000000,
	2380000000,
	2832200000,
	3370318000,
	4010678420,
	4772707319.8,
	5679521710.562,
	6758630835.56878,
	8042770694.32685,
	9570897126.24895,
	11389367580.2362,
	13553347420.4811,
	16128483430.3726,
	19192895282.1433,
	22839545385.7506,
	27179059009.0432,
	32343080220.7614,
	38488265462.706,
	45801035900.6202,
	54503232721.738,
	64858846938.8682,
	77182027857.2532,
	91846613150.1313,
	109297469648.656,
	130063988881.901,
	154776146769.462,
	184183614655.66,
	219178501440.235,
	260822416713.88,
	310378675889.517,
	369350624308.525,
	439527242927.145,
	523037419083.303,
	622414528709.13,
	740673289163.865,
	881401214104.999,
	1048867444784.95,
	1248152259294.09,
	1485301188559.97,
	1767508414386.36,
	2103335013119.77,
	2502968665612.52,
	2978532712078.9,
	3544453927373.89,
	4217900173574.93,
	5019301206554.17,
	5972968435799.46,
	7107832438601.36,
	8458320601935.62,
	10065401516303.4,
	11977827804401.,
	14253615087237.2,
	16961801953812.3,
	20184544325036.6,
	24019607746793.6,
	28583333218684.4,
	34014166530234.4,
	40476858170978.9,
	48167461223464.9,
	57319278855923.3,
	68209941838548.7,
);

var total_lvl_up_rewards = new Array (
	50,
	113,
	191,
	288,
	410,
	563,
	754,
	992,
	1290,
	1663,
	2128,
	2710,
	3438,
	4347,
	5484,
	6905,
	8682,
	10902,
	13678,
	17147,
	21484,
	26905,
	33681,
	42152,
	52740,
	65974,
	82518,
	103198,
	129047,
	161359,
	201748,
	252235,
	315344,
	394230,
	492838,
	616098,
	770172,
	962765,
	1203506,
	1504433,
	1880591,
	2350789,
	2938536,
	3673220,
	4591575,
	5739519,
	7174448,
	8968110,
	11210188,
	14012785,
	17516031,
	21895089,
	27368911,
	34211188,
	42764035,
	53455094,
	66818918,
	83523697,
	104404671,
	130505889,
	163132412,
	203915565,
	254894506,
	318618182,
	398272778,
	497841022,
	622301328,
	777876710,
	972345937,
	1215432471,
	1519290639,
	1899113349,
	2373891736,
	2967364721,
	3709205951,
	4636507488,
	5795634410,
	7244543063,
	9055678879,
	11319598649,
	14149498361,
	17686873001,
	22108591301,
	27635739176,
	34544674020,
	43180842575,
	53976053269,
	67470066637,
	84337583346,
	105421979232,
	131777474090,
	164721842663,
	205902303379,
	257377879273,
	321722349142,
	402152936477,
	502691170646,
	628363963358,
	785454954248
);