/* Any JavaScript here will be loaded for all users on every page load. */

if (document.getElementById('discordBannerPublic')) {
    importArticles({
        type: "script",
        articles: [
            "MediaWiki:Common.js/discordASTDBannerPublic.js"
        ]
    });
}
function TESTX() {
	var length2 = document.querySelectorAll(".messages").length;
	var unit = document.querySelectorAll(".messages")[length2 - 1].innerHTML;
			
	mw.loader.using('mediawiki.api').then(function () {
		
	    var api = new mw.Api();
	
		api.get( {
		    action: 'parse',
		    text: '\'\'\'<span class="tooltip" data-level="2">[['+ unit +']]</span>\'\'\'',
		    contentmodel: 'wikitext',
		    disablelimitreport: 1,
		    format: 'json',
		}).done ( function (text) {
			document.querySelector(".mw-parser-output").innerHTML = text;
		});
	
	
	});
}
setTimeout(TESTX, 10000);

const myElement2 = document.getElementById('PIXBuffBox');
	myElement2.innerHTML = '<div class="slider_box"><ul class="range-labels"><li style="margin-top:107px">80</li><li style="margin-top:43px">120</li><li style="margin-top:64px">175</li></ul><div class="slider2"></div><div class="slider_box2"><div class="slider"><div class="outputContainer"><input class="rangeSlider" type="range" min="2" max="175" value="175" step="1" oninput="mathMul(value,this)"></div><div class="outputLvl_box"><output class="outputLvl" for="fader2">x2.142</output><output class="outputLvl2 none" for="fader2">lvl 175</output></div></div></div></div><button class="sasageyoBuff">Sasageyo</button><button class="rangeBoosterBuff">RangeBooster</button><button class="bombaOrb">Bomba Orb</button><button class="firerageOrb">Firerage Orb</button><button class="blueeyeOrb">Blueeye Orb</button>';
	
	
	// <button class="sasageyoBuff">Sasageyo</button>
	// <button class="rangeBoosterBuff">RangeBooster</button>
	// <button class="bombaOrb">Bomba Orb</button>
	// <button class="firerageOrb">Firerage Orb</button>
	// <button class="blueeyeOrb">Blueeye Orb</button>

	
	
	
	
const mainStats = document.getElementsByClassName('mainStats');
const mainStatsLength = document.querySelectorAll('.mainStats').length;
const basStatsLength = [];
const basStatsView = [];
const basStatsViewLvl = [];
const orbStatsLength = [];
const orbStatsView = [];
const orbStatsViewLvl = [];
const stats = [];
const x2 = [];
const x = [];
const output = [];
const output2 = [];
const outputBox = [];
const vOutput = [];
const mul = [];
const dmgFirerageOrb = [];
const dmgBombaOrb = [];
const rangeBlueeyeOrb = [];

const orbList = [];
const buffList = [];
const otherOrb = [];
const bombaOrb = [];
const firerageOrb = [];
const blueeyeOrb = [];
const dmgC = [];
const rangeC = [];
if (myElement2) {
for (var index0 = 0; index0 < mainStatsLength ; index0++) {
  otherOrb[index0] = bombaOrb[index0] = firerageOrb[index0] = blueeyeOrb[index0] = false;
  dmgC[index0] = 0; rangeC[index0] = 0;
  basStatsLength[index0] = mainStats[index0].getElementsByClassName('stats').length;
  basStatsView[index0] = mainStats[index0].getElementsByClassName('stats-view');
  basStatsViewLvl[index0] = mainStats[index0].getElementsByClassName('stats-viewLvl');
  stats[index0] = [];
  stats[index0].dmg = [];
  stats[index0].range = [];
  stats[index0].spa = [];
  stats[index0].view = [];
  stats[index0].viewLvl = [];
  for (var index1 = 0; index1 < basStatsLength[index0]; index1++) {
    const dmg     = stats[index0].dmg[index1] = [];
    const range   = stats[index0].range[index1] = [];
    const view    = stats[index0].view[index1] = [];
    const viewLvl = stats[index0].viewLvl[index1] = [];
    dmg.Effect = [];
    view.Effect = [];
    viewLvl.Effect = [];
    
    
    dmg.baseStats             = +mainStats[index0].querySelectorAll('.stats .dmg')[index1].innerHTML;
    range.baseStats           = +mainStats[index0].querySelectorAll('.stats .range')[index1].innerHTML;
    stats[index0].spa[index1] = +mainStats[index0].querySelectorAll('.stats .spa')[index1].innerHTML;
    dmg.Effect.ticks = +mainStats[index0].querySelectorAll('.stats .effect-Ticks')[index1].innerHTML || 0;
    
  dmgBombaOrb[index0]     = stats[index0].dmg[0].baseStats * 0.3;
  dmgFirerageOrb[index0]  = stats[index0].dmg[0].baseStats;
  rangeBlueeyeOrb[index0] = stats[index0].range[0].baseStats * 0.3;
  
    view.dmg        = mainStats[index0].querySelectorAll('.stats-view .dmg-view')[index1];
    view.range      = mainStats[index0].querySelectorAll('.stats-view .range-view')[index1];
    view.spa        = mainStats[index0].querySelectorAll('.stats-view .spa-view')[index1];
    view.dps        = mainStats[index0].querySelectorAll('.stats-view .dps-view')[index1];
    view.Effect = mainStats[index0].querySelectorAll('.stats-view .dmgEffect-view')[index1];
    viewLvl.dmg        = mainStats[index0].querySelectorAll('.stats-viewLvl .dmg-viewLvl')[index1];
    viewLvl.range      = mainStats[index0].querySelectorAll('.stats-viewLvl .range-viewLvl')[index1];
    viewLvl.spa        = mainStats[index0].querySelectorAll('.stats-viewLvl .spa-viewLvl')[index1];
    viewLvl.dps        = mainStats[index0].querySelectorAll('.stats-viewLvl .dps-viewLvl')[index1];
    viewLvl.Effect = mainStats[index0].querySelectorAll('.stats-viewLvl .dmgEffect-viewLvl')[index1];
  }
  orbList.bombaOrb = [];
  orbList.firerageOrb = [];
  orbList.blueeyeOrb = [];
  orbList.bombaOrb[index0]      = mainStats[index0].querySelector('.bombaOrb');
  orbList.firerageOrb[index0]   = mainStats[index0].querySelector('.firerageOrb');
  orbList.blueeyeOrb[index0]    = mainStats[index0].querySelector('.blueeyeOrb');
  
  
  buffList.rangeBooster = [];
  buffList.sasageyo = [];
  buffList.rangeBooster[index0] = mainStats[index0].querySelector('.rangeBoosterBuff');
  buffList.sasageyo[index0]     = mainStats[index0].querySelector('.sasageyoBuff');
  
  console.log('1');
  newButton(orbList.bombaOrb[index0], mathBombaOrb());
  newButton(orbList.firerageOrb[index0], mathFirerageOrb());
  newButton(orbList.blueeyeOrb[index0], mathBlueeyeOrb());
  newButton(buffList.rangeBooster[index0], mathRangeBooster());
  newButton(buffList.sasageyo[index0], mathSasageyo());
  console.log('2');
  
  x2[index0] = 1;
  x[index0] = 1;
  vOutput[index0] = document.getElementsByClassName('rangeSlider')[index0];
  output[index0] = document.getElementsByClassName('outputLvl')[index0];
  output2[index0] = document.getElementsByClassName('outputLvl2')[index0];
  outputBox[index0] = document.getElementsByClassName('outputLvl_box')[index0];
  mul[index0] = 2.142;
	}
}


  function newButton() {
  	new Button (this, func, {
  	event: this.addEventListener('click', function() {func(this);}),
  });
  }

function mathMul(value, thisX) {
  var index = vOutput.indexOf(thisX);
  if (value == undefined) value = 175;
  if (value <= 81) {
    mul[index] = ((value - 1) / 100 + 1);
  } else if (value <= 121) {
    mul[index] = ((80 + (value - 81) * 0.2875) / 100 + 1);
  } else if (value <= 151) {
    mul[index] = (91.5 + (value - 121) * 0.436667) / 100 + 1; 
  } else if (value <= 175) {
    mul[index] = (104.6 + (value - 151) * 0.4) / 100 + 1; 
  }
	output[index].innerHTML = 'x'+ Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(mul[index]);
	output2[index].innerHTML = 'lvl '+value;
	outputBox[index].style.transform =  'translateX(calc( -50% + '+ value * 238 / 175 +'px + 5px)) rotate(270deg)';
	dmgLvlOutput(index);
}

function mulX() {
  for (var index = 0; index < mainStatsLength; index++) {
    output[index].classList.toggle('none');
    output2[index].classList.toggle('none');
  }
}

function mathRangeBooster(event) {
	var index = buffList.rangeBooster.indexOf(event);
	if (x2[index] !== 1.35) x2[index] = 1.35;
	else x2[index] = 1;
	rangeViewOutput(index);
}
function mathSasageyo(event) {
	var index = buffList.sasageyo.indexOf(event);
	if (x[index] !== 3) x[index] = 3;
	else x[index] = 1;
	dmgViewOutput(index);
	dmgLvlOutput(index);
}

function mathBombaOrb(event) {
	var index = orbList.bombaOrb.indexOf(event);
	    if (bombaOrb[index] == false) {
	      dmgC[index] = dmgBombaOrb[index];
	      resetOrbRange(index); dmgLvlOutput(index); dmgViewOutput(index);
	      bombaOrb[index] = true;
	      otherOrb[index] = true;
	      firerageOrb[index] = false;
	    } else {
	      bombaOrb[index] = otherOrb[index] = false;
	      resetOrbDmg(index);
	    }
}
function mathFirerageOrb(event) {
	var index = orbList.firerageOrb.indexOf(event);
		if (firerageOrb[index] == false) {
		dmgC[index] = dmgFirerageOrb[index];
		resetOrbRange(index); dmgLvlOutput(index); dmgViewOutput(index);
		firerageOrb[index] = otherOrb[index] = true;
		bombaOrb[index] = false;
		} else {
		firerageOrb[index] = otherOrb[index] = false;
		resetOrbDmg(index);
		}
}
function mathBlueeyeOrb(event) {
	var index = orbList.blueeyeOrb.indexOf(event);
		if (blueeyeOrb[index] == false) {
		rangeC[index] = rangeBlueeyeOrb[index];
		rangeViewOutput(index);
		blueeyeOrb[index] = otherOrb[index] = true;
		if (bombaOrb[index] == true) bombaOrb[index] = false, resetOrbDmg(index);
		if (firerageOrb[index] == true) firerageOrb[index] = false, resetOrbDmg(index);
		} else {
		resetOrbRange(index);
		}
}
function resetOrbRange(index) {
  if (blueeyeOrb[index] == true) {
    blueeyeOrb[index] = otherOrb[index] = false;
    rangeC[index] = 0;
    rangeViewOutput(index);
  }
}
function resetOrbDmg(index) {
  dmgC[index] = 0;
  dmgLvlOutput(index);
  dmgViewOutput(index);
}
function dmgViewOutput(index2) {
	for (var index = 0; index < basStatsLength[index2]; index++) {
    	f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) * x[index2]), index, stats[index2].view[index].dmg );
    	f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) / stats[index2].spa[index] * x[index2]), index, stats[index2].view[index].dps);
    if (stats[index2].dmg[index].Effect.ticks !== 0) {
    	  f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) * stats[index2].dmg[index].Effect.ticks * x[index2]), index, stats[index2].view[index].Effect);
    	}
	}
}
function dmgLvlOutput(index2) {
	for (var index = 0; index < basStatsLength[index2]; index++) {
		f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) * mul[index2] * x[index2]), index, stats[index2].viewLvl[index].dmg );
		f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) / stats[index2].spa[index] * mul[index2] * x[index2]), index, stats[index2].viewLvl[index].dps);
    if (stats[index2].dmg[index].Effect.ticks !== 0) {
		f1( ((stats[index2].dmg[index].baseStats + dmgC[index2]) * mul[index2] * stats[index2].dmg[index].Effect.ticks * x[index2]), index, stats[index2].viewLvl[index].Effect);
		}
	}
}
function rangeViewOutput(index2) {
	for (var index = 0; index < basStatsLength[index2]; index++) {
		f1( ((stats[index2].range[index].baseStats + rangeC[index2]) * x2[index2]), index, stats[index2].view[index].range );
		f1( ((stats[index2].range[index].baseStats + rangeC[index2]) * x2[index2]), index, stats[index2].viewLvl[index].range );
	}
}
function f1(stats, index, output) {
  var temp0 = Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(stats);
  var temp1 = temp0.split('.');
  if (temp1[1] !== undefined) output.innerHTML = (temp1[0] +'.<small>'+ temp1[1] +'</small>');
  else output.innerHTML = temp0;
};