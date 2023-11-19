<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>
<script>
var counter = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var count5 = 0;
$("#gachabt").click(function(){
$("#animation").show();
$("#gachabt").hide();
$("#result0").hide();
myFunction();
setTimeout(function(){
$("#animation").hide();
$("#yres").show();
$("#result0").show();
$("#gresult").show();
$("#gachabt").show();
}, 100);
});
function myFunction(){
counter += 10;
document.getElementById('total').innerHTML= counter;
document.getElementById('spend').innerHTML= counter*500;
setTimeout(function(){
const card_list = [
{
"name": "",
"rarity": "R",
"image": "https://static.wikia.nocookie.net/toilet-tower-defense-game/images/a/a0/ScarySpeakermanicon.png"
 },
{
"name": "",
"rarity": "SR",
"image": "https://static.wikia.nocookie.net/toilet-tower-defense-game/images/a/a1/MonsterSpeakermanicon.png"
},
{
"name": "",
"rarity": "SSR",
"image": "https://static.wikia.nocookie.net/toilet-tower-defense-game/images/7/74/PumpkinFarmericon.png"
},
{
"name": "",
"rarity": "SSSR",
"image": "https://static.wikia.nocookie.net/toilet-tower-defense-game/images/c/cb/SinisterCameramanicon.png"
},
{
"name": "",
"rarity": "SSSSR",
"image": "https://static.wikia.nocookie.net/toilet-tower-defense-game/images/f/f8/CorruptedCameramanicon.png"
},
];
const r_rate = 4990;
const sr_rate = 3899;
const ssr_rate = 1000;
const sssr_rate = 100;
const ssssr_rate = 11;
function searchBasedWeight(card_data, r_rate, sr_rate, ssr_rate, sssr_rate, ssssr_rate, one_or_ten) {
this.r_rate *= 100;
this.sr_rate *= 100;
this.ssr_rate *= 100;
this.sssr_rate *= 100;
this.ssssr_rate *= 100;
let weight = r_rate + sr_rate + ssr_rate + sssr_rate + ssssr_rate;
let R = r_rate;
let SR = R + sr_rate;
let SSR = SR + ssr_rate;
let SSSR = SSR + sssr_rate;
let SSSSR = SSSR + ssssr_rate;
const reloadNumber = (length) => Math.floor(Math.random() * length);
const whenRarity = (symbol_rarity) => card_data.filter(o => o.rarity === symbol_rarity);
let getItem = [];
const rollItUp = (batas) => {
for (let index = 1; index <= batas; index++) {
let res, randNumber = Math.floor(Math.random() * parseFloat(weight));
if (SSSR < randNumber && randNumber <= SSSSR) {
res = whenRarity("SSSSR");
getItem.push(res[reloadNumber(res.length)]);
}
else if (SSR < randNumber && randNumber <= SSSR) {
res = whenRarity("SSSR");
getItem.push(res[reloadNumber(res.length)]);
}
else if (SR < randNumber && randNumber <= SSR) {
res = whenRarity("SSR");
getItem.push(res[reloadNumber(res.length)]);
}
else if (R < randNumber && randNumber <= SR) {
res = whenRarity("SR");
getItem.push(res[reloadNumber(res.length)]);
}
else if (randNumber <= R) {
res = whenRarity("R");
getItem.push(res[reloadNumber(res.length)]);
}
}
}
if (one_or_ten === false) {
rollItUp(1);
}
else if (one_or_ten === true) {
let res = whenRarity("SR");
getItem.push(res[reloadNumber(res.length)]);
rollItUp(9);
}
let shuffledArray = [];
let stop = false;
while (stop === false) {
if (getItem.length < 1) stop = true;
else {
var index = Math.floor(Math.random() * getItem.length);
var item = getItem[index];
getItem.splice(index, 1);
shuffledArray.push(item);
stop = false;
}
}
return shuffledArray;
}
let res = searchBasedWeight(card_list, r_rate, sr_rate, ssr_rate, sssr_rate, ssssr_rate, true);
for (let i = 0; i < res.length; i++) {
let resID = res[i].id;
let resName = res[i].name;
let resRarity = res[i].rarity;
let resImage = res[i].image;
let indexing = (i + 1).toString().length === 1 ? `0${i + 1}` : (i + 1).toString();
console.log(`${indexing}. You\'ve got ${resName} (${resRarity})`);
document.getElementById('hasil' + i).innerHTML = resName;
document.getElementById('gambar' + i).src= resImage;
if(resRarity == "R"){
var star = "";
count1++;
document.getElementById('star' + i).innerHTML = star;
}else if(resRarity == "SR"){
var star = "";
count2++;
document.getElementById('star' + i).innerHTML = star;
}else if(resRarity == "SSR"){
var star = "";
count3++;
document.getElementById('star' + i).innerHTML = star;
}else if(resRarity == "SSSR"){
var star = "";
count4++;
document.getElementById('star' + i).innerHTML = star;
}else{
var star = "";
count5++;
document.getElementById('star' + i).innerHTML = star;
}
}
document.getElementById('count1').innerHTML = count1;
document.getElementById('count2').innerHTML = count2;
document.getElementById('count3').innerHTML = count3;
document.getElementById('count4').innerHTML = count4;
document.getElementById('count5').innerHTML = count5;
}, 100);
}
</script>

// ############### CALLERS ############
// function equivalent to jquery ready. Runs once the page loads on all pages
$(function() {
	switch (mw.config.get('wgPageName')) {
	    case 'User:Thefrozenfish/Sandbox/Gacha': 
	    case 'Template:Gacha_Simulator':
	    case 'Testcodeth_Wiki':
			setupGachaSimulator();
	        break;
	}
});