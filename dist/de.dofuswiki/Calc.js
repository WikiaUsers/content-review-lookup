// <pre><nowiki>

var cskills = {
	'sad' : { axe:  0, bow:-30, dagger:-30, hammer:-10, shovel:-10, staff: 50, sword:-30, wand:  0 },
	'osa' : { axe:-10, bow:-30, dagger:  0, hammer: 40, shovel:-10, staff:-20, sword:-30, wand: 20 },
	'enu' : { axe:  0, bow:-30, dagger:-20, hammer:  0, shovel: 40, staff:-25, sword:-10, wand:-10 },
	'sra' : { axe:-20, bow:  0, dagger: 40, hammer:-20, shovel:-20, staff:-30, sword:  0, wand:-10 },
	'xel' : { axe:-20, bow:-30, dagger:  0, hammer: 40, shovel:-20, staff:-20, sword:-30, wand: 30 },
	'eca' : { axe:-10, bow:-20, dagger:-10, hammer:-10, shovel:-10, staff:-10, sword:  0, wand:-20 },
	'eni' : { axe:-30, bow:-30, dagger:  0, hammer:-30, shovel:-30, staff:-20, sword:-30, wand: 40 },
	'iop' : { axe: 10, bow:-20, dagger: 10, hammer: 10, shovel: 10, staff:  0, sword: 20, wand:-40 },
	'cra' : { axe:-30, bow: 40, dagger:  0, hammer:-30, shovel:-30, staff:-20, sword:-20, wand:-20 },
	'fec' : { axe:-10, bow:-25, dagger: 10, hammer:-20, shovel:-20, staff: 40, sword:-10, wand:  0 },
	'sac' : { axe:-30, bow:-30, dagger:-30, hammer:-30, shovel:-30, staff:-30, sword:-30, wand:-30 },
	''    : { axe:  0, bow:  0, dagger:  0, hammer:  0, shovel:  0, staff:  0, sword:  0, wand:  0 }
};

function initcalc() {
	var ul = document.getElementsByTagName('table')[0];
	var il = ul.getElementsByTagName('input');
	for (var i = il.length; i--;) {
		il[i].onchange = precalc;
	}
	gE('w_ski').onchange = precalc;
	gE('w_sel').onchange = boncalc;
	gE('c_sel').onchange = boncalc;

	if (location.search) {
		var keyvals = location.search.slice(1).split('&');
		for (var i = 0; i < keyvals.length; i++) {
			if (keyvals[i].indexOf('state=') == 0) {
				dosave( keyvals[i].slice(6) );
				load();
				return;
			}
		}
	}

	boncalc();
}
function gE(id) { return document.getElementById(id); }
function gV(id, max) {
	var f = gE(id).value;
	f = isNaN(f) ? 0 : Math.floor(f);
	if (max !== undefined) {
		f = Math.max( max, f );
	}
	return f;
}
function boncalc() {
	var cval = gE('c_sel').value;
	var wval = gE('w_sel').value;

	var wbon = (wval && cval) ? cskills[cval][wval] : '';

	gE('c_ski').value = wbon;

	if (wval) {
		gE('c_ski').disabled = false;
		gE('w_ski').disabled = false;
	} else {
		gE('c_ski').disabled = true;
		gE('w_ski').disabled = true;
	}

	calc();
}
function precalc() {
	if (isNaN(this.value)) {
		this.value = 'Error';
		this.focus();
	} else {
		calc();
	}
}
function save() {
	var state = [];

	var ul = document.getElementsByTagName('table')[0];
	var il = ul.getElementsByTagName('input');
	for (var el, i = il.length; i--;) {
		el = il[i];
		if (el.value) state.push( el.id + "-" + el.value );
	}
	il = [ 'w_ski', 'w_sel', 'c_sel' ];
	for (var el, i = il.length; i--;) {
		el = gE( il[i] );
		if (el.value) state.push( el.id + "-" + el.value );
	}

	dosave( state.join('+') );
}
function dosave(str) {
	gE('state').value = str;
	gE('stateurl').value = location.href.split('?')[0] + '?state=' + str;
}
function load() {
	var state = {};

	var sparse = gE('state').value;
	sparse = sparse.split('+');
	for (var el, key, i = sparse.length; i--;) {
		key = sparse[i].split('-');
		state[key[0]] = key[1];
	}

	var ul = document.getElementsByTagName('table')[0];
	var il = ul.getElementsByTagName('input');
	for (var el, i = il.length; i--;) {
		el = il[i];
		el.value = (el.id in state) ? state[el.id] : '';
	}
	il = [ 'w_ski', 'w_sel', 'c_sel' ];
	for (var el, i = il.length; i--;) {
		el = gE( il[i] );
		el.value = (el.id in state) ? state[el.id] : '';
	}

	calc();
}


function calc() {

	var tres = subcalc( 0 );

	var dcri = gV('dmg_cri');
	if (dcri && gE('w_sel').value) {
		 tres += subcalc( dcri );
	}

	gE('tout').innerHTML = '<table class="calctable">' + tres + '<\/table>';

}
function subcalc( cri ) {

	var min = gV('b_min', 0);
	var max = gV('b_max', min);

	min += cri; max += cri;

	var wski = Math.min( 5, gV('w_ski', 0) );
	var stat = gV('stat', 0);
	var stab = gV('stat_ex', -stat);
	var dpct = gV('dmg_pct', 0);
	var cski = gV('c_ski');
	var dlin = gV('dmg_lin');
	var dmod = stat + stab + dpct + cski;
	var eres = Math.min( 100, gV('e_res', -100) );
	var eran = gV('e_ran');

	var bows = [];
	var rows = [];
	var avg = 0;
	var skip = true;

	for (var d, i = min; i <= max; i++) {

		d = i;

		if (i < min + 15 || i > max - 10) {

			if (wski && gE('w_sel').value) {
				d = Math.floor( d * (1.1 + 0.1 * wski) );
			}

			d = Math.floor( d * (1 + 0.01 * dmod) );

			if (dlin) {
				d += dlin;
			}

			if (eran) {
				d = Math.floor( d * (1 + 0.01 * eran) );
			}

			if (eres) {
				d = Math.floor( d * (1 - 0.01 * eres) );
			}

			bows.push( '<td>' + i + '<\/td>' );
			rows.push( '<td>' + d + '<\/td>' );

		} else {
			if (skip) {
				bows.push( '<td>...<\/td>' );
				rows.push( '<td>...<\/td>' );
				skip = false;
			}
		}

		avg += d;

	}

	avg = '<td colspan="' + (max - min + 1) + '">' + (avg / (max - min + 1)) + '<\/td>';

	return '<tr>' + '<th>Basis ' + (cri ? 'kritischer Schaden' : 'Schaden') + '<\/th>' + bows.join('') + '<\/tr>' +
		'<tr>' + '<th>Zugefügter ' + (cri ? 'kritischer Schaden' : 'Schaden') + '<\/th>' + rows.join('') + '<\/tr>' +
		'<tr>' + '<th>Durchschnitt<\/th>' + avg + '<\/tr>';
}

//</nowiki></pre>