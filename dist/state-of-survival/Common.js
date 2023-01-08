/* Any JavaScript here will be loaded for all users on every page load. */
const minutes = onem * 1 + fivem * 5 + oneh * 60 + threeh * 3 * 60 + eighth * 8 * 60;
const hours = Math.floor(minutes / 60);
const modhours = minutes % 60;
const days = Math.floor(hours / 24);
const moddays = hours % 24;
let TiM = `Time in Minute: ${minutes} Minutes`;
let TiH = `Time in Hour: ${hours} Hours ${modhours} Minutes`;
let TiD = `Time in Day: ${days} Days ${moddays} Hours ${modhours} Minutes`;

if (minutes == 1) {
	TiM = `Time in Minute: ${minutes} Minute`;
}
if (hours == 1) {
	TiH = `Time in Hour: ${hours} Hour ${modhours} Minutes`;
	if (modhours == 1) {
		TiH = `Time in Hour: ${hours} Hour ${modhours} Minute`;
	}
}
if (days == 1) {
	TiD = `Time in Day: ${days} Day ${moddays} Hours ${modhours} Minutes`;
	if (moddays == 1) {
		TiD = `Time in Day: ${days} Day ${moddays} Hour ${modhours} Minutes`;
		if (modhours == 1) {
			TiD = `Time in Day: ${days} Day ${moddays} Hour ${modhours} Minute`;
		}
	}
}
if (modhours == 1) {
	if (hours != 1) {
		TiH = `Time in Hour: ${hours} Hours ${modhours} Minute`;
	}
	if (moddays != 1) {
		if (days == 1) {
			TiD = `Time in Day: ${days} Day ${moddays} Hours ${modhours} Minute`;
		}
		if (days != 1) {
			TiD = `Time in Day: ${days} Days ${moddays} Hours ${modhours} Minute`;
		}
	}
}
if (moddays == 1) {
	if (days != 1) {
		TiD = `Time in Day: ${days} Days ${moddays} Hour ${modhours} Minutes`;
		if (modhours == 1) {
			TiD = `Time in Day: ${days} Days ${moddays} Hour ${modhours} Minute`;
		}
	}
}
if (modhours == 0) {
	TiH = `Time in Hour: ${hours} Hours`;
	if (hours == 1) {
		TiH = `Time in Hour: ${hours} Hour`;
	}
	if (moddays != 0) {
		TiD = `Time in Day: ${days} Days ${moddays} Hours`;
		if (days == 1) {
			TiD = `Time in Day: ${days} Day ${moddays} Hours`;
			if (moddays == 1) {
				TiD = `Time in Day: ${days} Day ${moddays} Hour`;
			}
		}
		if (moddays == 1 && days != 1) {
			TiD = `Time in Day: ${days} Days ${moddays} Hour`;
		}
	}
}
if (moddays == 0) {
	if (modhours == 0) {
		TiD = `Time in Day: ${days} Days`;
		if (days == 1) {
			TiD = `Time in Day: ${days} Day`;
		}
	}
	if (modhours != 0) {
		TiD = `Time in Day: ${days} Days ${modhours} Minutes`;
		if (days == 1) {
			TiD = `Time in Day: ${days} Day ${modhours} Minutes`;
			if (modhours == 1) {
				TiD = `Time in Day: ${days} Day ${modhours} Minute`;
			}
		}
		if (modhours == 1 && days != 1) {
			TiD = `Time in Day: ${days} Days ${modhours} Minute`;
		}
	}
}
const ones = `1 Minute Speedup: ${onem}`;
const twos = `5 Minutes Speedup: ${fivem}`;
const threes = `1 Hour Speedup: ${oneh}`;
const fours = `3 Hours Speedup: ${threeh}`;
const fives = `8 Hours Speedup: ${eighth}`;

const sotfsvscalc = minutes * 30;
const skincalc = minutes * 60;
const pscalc = minutes * 1;

const sotfsvs = `SOTF/State Warfare: ${sotfsvscalc} Points`;
const skin = `Skin Event: ${skincalc} Points`;
let ps;

if (minutes == 1) {
	ps = `Power Sprint: ${pscalc} Point`;
}
else {
	ps = `Power Sprint: ${pscalc} Points`;
}

// Output
document.getElementById('oneminp').value = onem;
document.getElementById('fiveminp').value = fivem;
document.getElementById('onehinp').value = oneh;
document.getElementById('threehinp').value = threeh;
document.getElementById('eighthinp').value = eighth;
document.getElementById('onems').innerHTML = ones.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('fivems').innerHTML = twos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('onehs').innerHTML = threes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('threehs').innerHTML = fours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('eighths').innerHTML = fives.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('tim').innerHTML = TiM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('tih').innerHTML = TiH.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('tid').innerHTML = TiD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

document.getElementById('sotfsvs').innerHTML = sotfsvs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('skin').innerHTML = skin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
document.getElementById('ps').innerHTML = ps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');