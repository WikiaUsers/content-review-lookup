// For DPS Calculator at https://hot.fandom.com/wiki/Tools/DPS_Calculator
function createDpsCalculator(mw) {
	var s = {
		dmg: {
			base: 100,
			mult: 0,
		},
		ats: {
			base: 1,
			mult: 0,
		},
		mth: {
			base: 1,
			mult: 0,
		},
		crc: {
			base: 0.1,
			mult: 0,
		},
		crb: {
			base: 0.5,
			mult: 0,
		},
	};
	var dmg, ats, mth, crc, crb, dmgf, dps;
	
	function calcStat(stat) {
		return s[stat].base * (1 + s[stat].mult/100);
	}
	
	function updateStat(stat) {
		var res = parseFloat(calcStat(stat).toPrecision(12));
		res = s[stat].base + " + " + s[stat].mult + "% = <span style='font-weight:bold;'>" + res + "</span>";
		$("#dpscal-" + stat + "-calc").html(res);
	}
	function updateDps() {
		dmg = calcStat('dmg');
		ats = calcStat('ats');
		mth = calcStat('mth');
		crc = calcStat('crc');
		crb = calcStat('crb');
		dmgf = dmg * (1 + crc * crb); // Final damage
		dps = dmgf * ats * mth;
		dps = parseFloat(dps.toPrecision(12));
		$("#dpscal-dps").text(dps);
	}
	
	function onStatChange(stat, type, val) {
		// console.log(stat, type, val+1);
		s[stat][type] = parseFloat(val);
		updateStat(stat);
		updateDps();
		return 0;
	}
	
	function createField(stat, type) {
		var fieldName = "dpscal-" + stat + "-" + type;
		var fieldValue = s[stat][type];
		// console.log(fieldName);
		$("#" + fieldName).append("<input type='text' id='" + fieldName + "-field' value='" + fieldValue + "' />");
		$("#" + fieldName + "-field").on('input', function(e) { onStatChange(stat, type, e.target.value); });
		return 0;
	}
	
	
	for (var stat in s) {
		for (var type in s[stat]) {
			createField(stat, type);
		}
		updateStat(stat);
	}
	updateDps();
}

// For Effect Chance Calculator at https://hot.fandom.com/wiki/Tools/Effect_Chance_Calculator
function createEfcCalculator(mw) {
	var s = {
		efc: {
			base: 0.3,
			mult: 0,
		},
		ohc: {
			base: 1,
			mult: 0,
		},
		occ: {
			base: 0,
			mult: 0,
		},
		crc: {
			base: 0.1,
			mult: 0,
		},
	};
	var efc, ohc, occ, crc, crcc, hec, cec, aec;
	
	function calcStat(stat) {
		return s[stat].base * (1 + s[stat].mult/100);
	}
	
	function updateStat(stat) {
		var res;
		res = parseFloat(calcStat(stat).toPrecision(12));
		res = s[stat].base + " + " + s[stat].mult + "% = <span style='font-weight:bold;'>" + res + "</span>";
		$("#efccal-" + stat + "-calc").html(res);
	}
	function updateDps() {
		efc = calcStat('efc');
		ohc = calcStat('ohc');
		occ = calcStat('occ');
		crc = calcStat('crc');
		crcc = Math.min(1, Math.max(0, crc));
		hec = efc * ohc;
		cec = efc * occ;
		aec = (1 - crcc) * hec + crcc * cec;
		hec = parseFloat((hec*100).toPrecision(12));
		cec = parseFloat((cec*100).toPrecision(12));
		aec = parseFloat((aec*100).toPrecision(12));
		$("#efccal-hec").text(hec+"%");
		$("#efccal-cec").text(cec+"%");
		$("#efccal-aec").text(aec+"%");
	}
	
	function onStatChange(stat, type, val) {
		// console.log(stat, type, val+1);
		s[stat][type] = parseFloat(val);
		updateStat(stat);
		updateDps();
		return 0;
	}
	
	function createField(stat, type) {
		var fieldName = "efccal-" + stat + "-" + type;
		var fieldValue = s[stat][type];
		// console.log(fieldName);
		$("#" + fieldName).append("<input type='text' id='" + fieldName + "-field' value='" + fieldValue + "' />");
		$("#" + fieldName + "-field").on('input', function(e) { onStatChange(stat, type, e.target.value); });
		return 0;
	}
	
	
	for (var stat in s) {
		for (var type in s[stat]) {
			createField(stat, type);
		}
		updateStat(stat);
	}
	updateDps();
}

createDpsCalculator(mediaWiki);
createEfcCalculator(mediaWiki);