//Wiki Synthesis Exp Calculator. (WSEC) To see an example check out the js-fiddle
//(it might be missing a few changes, though.) jsfiddle.net/ShinyAfro/7vnztxqo/3/
//Selector page initialization (Can only use divs on the site)
$('#wsec_6kinput').replaceWith('<input id="wsec_6k" class="wsec_input6k" value="0" type="number"/>');
$('#wsec_8kinput').replaceWith('<input id="wsec_8k" class="wsec_input8k" value="0" type="number"/>');
$('#wsec_20kinput').replaceWith('<input id="wsec_20k" class="wsec_input20k" value="0" type="number"/>');
$('#wsec_40kinput').replaceWith('<input id="wsec_40k" class="wsec_input40k" value="0" type="number"/>');

//Control page initialization (Can only use divs on the site)
$('#wsec_unit-level').replaceWith('<input id="wsec_unit-level" class="wsec_inputB" value="0" type="number"/>');
$('#wsec_unit-remaining').replaceWith('<input id="wsec_unit-remaining" class="wsec_inputB" value="0" type="number"/>');
$('#wsec_Sariette').replaceWith('<input type="checkbox" class="wsec_Sariette" id="wsec_Sariette">');
$('#wsec_Sariette-label').replaceWith('<label for="wsec_Sariette" class="wsec_Sariette_label">1.1x</label>');
$('#wsec_Rarity').replaceWith('<select id="wsec_Rarity"><option value="18000">Gold</option><option value="19000">Platinum</option><option value="19000">Sapphire</option><option value="20000">Black</option></select>');
$('#wsec_State').replaceWith('<select id="wsec_State"><option value="50">Pre-CC</option><option value="60">Post-CC</option><option value="80">AW</option><option value="99">AW2</option></select>');

//Arrays for calculating XP values
var gold_full = [0,42,85,130,176,224,274,325,378,433,543,658,777,901,1028,1161,1297,1438,1583,1733,1954,2183,2421,2668,2924,3188,3461,3743,4034,4333,4701,5083,5480,5890,6317,6757,7212,7683,8167,8667,9402,10165,10958,11781,12633,13514,14425,15365,16335,17333,18435,19581,20770,22005,23283,24605,25970,27381,28835,30333,31802,33329,34917,36561,38266,40028,41850,43729,45669,47667,49503,51412,53395,55452,57582,59786,62062,64412,66836,69333,71904,74577,77354,80233,83214,86299,89487,92777,96170,99667,102237,104911,107687,110566,113549,116633,119820,123111,126504];
var gold_next = [0,42,43,45,46,48,50,51,53,55,110,115,119,124,127,133,136,141,145,150,221,229,238,247,256,264,273,282,291,299,368,382,397,410,427,440,455,471,484,500,735,763,793,823,852,881,911,940,970,998,1102,1146,1189,1235,1278,1322,1365,1411,1454,1498,1469,1527,1588,1644,1705,1762,1822,1879,1940,1998,1836,1909,1983,2057,2130,2204,2276,2350,2424,2497,2571,2673,2777,2879,2981,3085,3188,3290,3393,3497,2570,2674,2776,2879,2983,3084,3187,3291,3393];
var platinum_full = [0,45,91,140,189,241,295,350,407,466,585,708,837,970,1107,1250,1397,1548,1705,1866,2104,2351,2607,2873,3149,3433,3727,4031,4344,4666,5062,5474,5901,6343,6803,7277,7767,8274,8795,9334,10125,10947,11801,12687,13605,14553,15534,16547,17591,18666,19853,21087,22368,23698,25074,26498,27968,29487,31053,32666,34248,35893,37603,39374,41209,43107,45069,47093,49182,51334,53311,55367,57502,59717,62012,64385,66836,69367,71977,74666,77435,80314,83304,86405,89615,92938,96370,99914,103568,107334,110102,112981,115970,119071,122283,125605,129037,132581,136235];
var platinum_next = [0,45,46,49,49,52,54,55,57,59,119,123,129,133,137,143,147,151,157,161,238,247,256,266,276,284,294,304,313,322,396,412,427,442,460,474,490,507,521,539,791,822,854,886,918,948,981,1013,1044,1075,1187,1234,1281,1330,1376,1424,1470,1519,1566,1613,1582,1645,1710,1771,1835,1898,1962,2024,2089,2152,1977,2056,2135,2215,2295,2373,2451,2531,2610,2689,2769,2879,2990,3101,3210,3323,3432,3544,3654,3766,2768,2879,2989,3101,3212,3322,3432,3544,3654];
var black_full = [0,48,98,150,203,258,317,375,437,500,627,759,897,1040,1187,1340,1497,1659,1827,2000,2255,2519,2793,3078,3374,3678,3993,4319,4655,5000,5424,5865,6323,6797,7289,7797,8322,8865,9423,10001,10848,11729,12644,13593,14577,15593,16644,17729,18848,20000,21272,22593,23966,25391,26865,28391,29966,31593,33272,35000,36695,38457,40289,42186,44153,46187,48288,50457,52695,55001,57119,59322,61610,63983,66441,68984,71610,74322,77118,80000,82967,86051,89255,92577,96017,99576,103254,107051,110966,115001,117966,121052,124254,127577,131018,134577,138254,142052,145967];
var black_next = [0,48,50,52,53,55,59,58,62,63,127,132,138,143,147,153,157,162,168,173,255,264,274,285,296,304,315,326,336,345,424,441,458,474,492,508,525,543,558,578,847,881,915,949,984,1016,1051,1085,1119,1152,1272,1321,1373,1425,1474,1526,1575,1627,1679,1728,1695,1762,1832,1897,1967,2034,2101,2169,2238,2306,2118,2203,2288,2373,2458,2543,2626,2712,2796,2882,2967,3084,3204,3322,3440,3559,3678,3797,3915,4035,2965,3086,3202,3323,3441,3559,3677,3798,3915];

function testfunction(){
//Initialize initial valuez
var rarity = $('#wsec_Rarity').find(":selected").text();
var spirit = $('#wsec_Rarity').find(":selected").val();
var level_cap = parseFloat($('#wsec_State').find(":selected").val());
var basemultiplier = 1;
var output;
var next_table;
var full_table;
var xlevel;
var xremain_next;
var xremain_full;
var xleftovers;

//Setting the tables to use based on the input, calculate max level.
//Also, toggles some divs to make the images specific to rarity if needed.
if (rarity === 'Gold'){
  next_table = gold_next;
  full_table = gold_full;
  $('#wsec_farah').hide();
  $('#wsec_freude').hide();
  $('#wsec_liebe').hide();
  $('#wsec_alegria').show();
} else if (rarity === 'Platinum') {
  next_table = platinum_next;
  full_table = platinum_full;
  level_cap += 10;
  $('#wsec_farah').hide();
  $('#wsec_freude').show();
  $('#wsec_liebe').hide();
  $('#wsec_alegria').hide();
} else if (rarity === 'Sapphire') {
  next_table = platinum_next;
  full_table = platinum_full;
  $('#wsec_farah').hide();
  $('#wsec_freude').hide();
  $('#wsec_liebe').show();
  $('#wsec_alegria').hide();
  level_cap += 5;
} else if (rarity === 'Black') {
  next_table = black_next;
  full_table = black_full;
  $('#wsec_farah').show();
  $('#wsec_freude').hide();
  $('#wsec_liebe').hide();
  $('#wsec_alegria').hide();
  level_cap += 20;
}

//finalize levelcap calculations
if ($('#wsec_State').find(":selected").text() == 'Pre-CC'){level_cap = 50}
if (level_cap>99){level_cap = 99}
level_cap -= 1; //Can't get a next value if you're at max level..

//calculate the sum of the experience based on the input provided
if ($('#wsec_Sariette').is(":checked")){basemultiplier = 1.1}
var current_level = parseFloat($('#wsec_unit-level').val()) || 1;
var current_remaining = parseFloat($('#wsec_unit-remaining').val()) || next_table[current_level];
var current_value = full_table[current_level-1] + next_table[current_level] - current_remaining;
var x1 = $('#wsec_6k').val()*6000*basemultiplier;
var x2 = $('#wsec_8k').val()*8000*basemultiplier;
var x3 = $('#wsec_20k').val()*spirit*basemultiplier;
var x4 = $('#wsec_40k').val()*40000*basemultiplier;
var xsum = x1+x2+x3+x4+current_value;
    xsum = xsum + 1;

//iterate through the tables to find the current level and remaining to levelcap and next level
for(i = 0; i < level_cap+1; i++){
  if(full_table[i]<xsum){
    xleftovers = xsum-full_table[i];
    xlevel = i + 1;
    xremain_next = next_table[i+1]+1-xleftovers;
    xremain_full = full_table[level_cap]-xsum;
    output = 'Level ' + xlevel + ', Remaining: ' + Math.round(xremain_next) + ' (' + Math.round(xremain_full) + ')';
    if(i>level_cap-1){output = 'Level ' + (level_cap + 1) + ', ' + Math.round(xremain_full)*-1 + ' over maximum.'}
  }
}
//output to the output div
$('#wsec_output').text(output);
}
//run the script every time an input is changed.
$('#wsec_unit-level').on('input',function(e){testfunction();});
$('#wsec_unit-remaining').on('input',function(e){testfunction();});
$('#wsec_Rarity').on('input',function(e){testfunction();});
$('#wsec_State').on('input',function(e){testfunction();});
$('#wsec_Sariette').on('input',function(e){testfunction();});
$('#wsec_6k').on('input',function(e){testfunction();});
$('#wsec_8k').on('input',function(e){testfunction();});
$('#wsec_20k').on('input',function(e){testfunction();});
$('#wsec_40k').on('input',function(e){testfunction();});
$('#wsec').show(); //Shows a div with the wsec id incase you want to hide it before it loads.

//This should really be done via css but i'm lazy.
$('#wsec_farah').hide();
$('#wsec_freude').hide();
$('#wsec_liebe').hide();
$('#wsec_alegria').show();