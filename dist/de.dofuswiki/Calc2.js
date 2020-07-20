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

var wski = gE('w_sel').value ? gV('w_ski') : 0;
var cski = gV('c_ski');
var dpct = gV('dmg_pct', 0);
var dlin = gV('dmg_lin');
var dcri = gV('dmg_cri');

var stats = [];
stats[0] = Math.max( gV('stat_s') + gV('statx_s'), 0 );
stats[1] = stats[0];
stats[2] = Math.max( gV('stat_c') + gV('statx_c'), 0 );
stats[3] = Math.max( gV('stat_a') + gV('statx_a'), 0 );
stats[4] = Math.max( gV('stat_i') + gV('statx_i'), 0 );
stats[5] = stats[4];

var els = [ 'n', 'e', 'w', 'a', 'f', 'h' ];
var elnames = [ 'Neutral', 'Erde', 'Wasser', 'Luft', 'Feuer', 'Heilung' ];
var raws = {};

for (var el, i = els.length; i--;) {
el = els[i];
raws[i] = {
min : gV( 'min_' + el, 0 ),
max : gV( 'max_' + el, 0 ),
res : Math.min( 100, gV('res_' + el, -100) ),
ski : el == 'h' ? 0 : wski,
con : el == 'h' ? -1 : 1
};
}

var tres = '<tr><th>Element<\/th><th>Min<\/th><th>Durchschnitt<\/th><th>Max<\/th><\/tr>';
var sum = [ 0, 0, 0 ];

for (var i = 0; i < els.length; i++) {
var raw = raws[i];
if (raw.min) {
var res = subcalc( raw.min, raw.max, stats[i] + dpct + cski, dlin, raw.ski, raw.res );
tres += '<tr><td>' + elnames[i] + '<\/td><td>' + res[0] + '<\/td><td>' + res[1] + '<\/td><td>' + res[2] + '<\/td><\/tr>';
sum[0] += res[0] * raw.con;
sum[1] += res[1] * raw.con;
sum[2] += res[2] * raw.con;
}
}

tres += '<tr><td>Total<\/td><td>' + sum[0] + '<\/td><td>' + sum[1] + '<\/td><td>' + sum[2] + '<\/td><\/tr>';

if (dcri && gE('w_sel').value) {

sum = [ 0, 0, 0 ];
tres += '<tr><td colspan="4">Kritischer Treffer<\/td><\/tr>';

for (var i = 0; i < els.length; i++) {
var raw = raws[i];
if (raw.min) {
var res = subcalc( raw.min + dcri, raw.max + dcri, stats[i] + dpct + cski, dlin, raw.ski, raw.res );
tres += '<tr><td>' + elnames[i] + '<\/td><td>' + res[0] + '<\/td><td>' + res[1] + '<\/td><td>' + res[2] + '<\/td><\/tr>';
sum[0] += res[0] * raw.con;
sum[1] += res[1] * raw.con;
sum[2] += res[2] * raw.con;
}
}

tres += '<tr><td>Total<\/td><td>' + sum[0] + '<\/td><td>' + sum[1] + '<\/td><td>' + sum[2] + '<\/td><\/tr>';

}

gE('tout').innerHTML = '<table class="calctable">' + tres + '<\/table>';

}
function subcalc( min, max, dmod, dlin, wski, eres ) {

var avg = 0;

for (var i = min; i <= max; i++) {

avg += subsubcalc( i, dmod, dlin, wski, eres );

}

avg = (avg / (max - min + 1));

min = subsubcalc( min, dmod, dlin, wski, eres );
max = subsubcalc( max, dmod, dlin, wski, eres );

return [ min, avg, max ];

}
function subsubcalc( base, dmod, dlin, wski, eres ) {

d = base;

if (wski) {
d = Math.floor( d * (1.1 + 0.1 * wski) );
}

d = Math.floor( d * (1 + 0.01 * dmod) );

if (dlin) {
d += dlin;
}

if (eres) {
d = Math.floor( d * (1 - 0.01 * eres) );
}

return d;

}

//</nowiki></pre>