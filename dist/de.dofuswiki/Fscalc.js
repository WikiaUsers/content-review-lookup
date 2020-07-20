// <pre><nowiki>

/* ************ normaler Treffer auf sich selbst ************ */

var cskillsnts1 = {
	'flammende' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 7, 6: 7 },
	'erd' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 7, 6: 7 },
	'fluten' : { 1: 3, 2: 4, 3: 5, 4: 6, 5: 8, 6: 8 },
	'wirbelwind' : { 1: 3, 2: 4, 3: 5, 4: 6, 5: 8, 6: 8 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

var cskillsnts2 = {
	'flammende' : { 1: 3, 2: 4, 3: 5, 4: 6, 5:10, 6:10 },
	'erd' : { 1: 3, 2: 4, 3: 5, 4: 6, 5: 10, 6: 10 },
	'fluten' : { 1: 4, 2: 5, 3: 6, 4: 8, 5:11, 6:11 },
	'wirbelwind' : { 1: 4, 2: 5, 3: 6, 4: 8, 5:11, 6:11 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

/* ************ kritischer Treffer auf sich selbst ************ */

var cskillskts1 = {
	'flammende' : { 1: 4, 2: 5, 3: 6, 4: 7, 5: 9, 6: 9 },
	'erd' : { 1: 4, 2: 5, 3: 6, 4: 7, 5: 9, 6: 9 },
	'fluten' : { 1: 5, 2: 6, 3: 7, 4: 8, 5:10, 6:10 },
	'wirbelwind' : { 1: 5, 2: 6, 3: 7, 4: 8, 5:10, 6:10 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

var cskillskts2 = {
	'flammende' : { 1: 5, 2: 6, 3: 7, 4: 9, 5:12, 6:12 },
	'erd' : { 1: 5, 2: 6, 3: 7, 4: 9, 5:12, 6:12 },
	'fluten' : { 1: 6, 2: 7, 3: 8, 4:10, 5:13, 6:13 },
	'wirbelwind' : { 1: 6, 2: 7, 3: 8, 4:10, 5:13, 6:13 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

/* ************ normaler Treffer auf andere ************ */

var cskillsnta1 = {
	'flammende' : { 1: 1, 2: 2, 3: 3, 4: 3, 5: 3, 6: 3 },
	'erd' : { 1: 1, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3 },
	'fluten' : { 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 5 },
	'wirbelwind' : { 1: 1, 2: 2, 3: 2, 4: 2, 5: 2, 6: 4 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

var cskillsnta2 = {
	'flammende' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8 },
	'erd' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8 },
	'fluten' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: -  },
	'wirbelwind' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

/* ************ kritisher Treffer auf andere ************ */

var cskillskta1 = {
	'flammende' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8 },
	'erd' : { 1: 2, 2: 3, 3: 5, 4: 6, 5: 7, 6: 8 },
	'fluten' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 4 },
	'wirbelwind' : { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

var cskillskta2 = {
	'flammende' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	'erd' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	'fluten' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	'wirbelwind' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	'' : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

function initcalc() {
	var ul = document.getElementsByTagName('table')[0];
	var il = ul.getElementsByTagName('input');
	for (var i = il.length; i--;) {
		il[i].onchange = precalc;
	}
	gE('sl_sel').onchange = boncalc;
	gE('s_sel').onchange = boncalc;


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
	var sval = gE('s_sel').value;
	var slval = gE('sl_sel').value;

	var basr1 = (slval && sval) ? cskillsnts1[sval][slval] : '';
        var basr2 = (slval && sval) ? cskillsnts2[sval][slval] : '';
        var basr3 = (slval && sval) ? cskillskts2[sval][slval] : '';
        var basr4 = (slval && sval) ? cskillskts2[sval][slval] : '';
        var basr5 = (slval && sval) ? cskillsnta2[sval][slval] : '';
        var basr6 = (slval && sval) ? cskillsnta2[sval][slval] : '';
        var basr7 = (slval && sval) ? cskillskta2[sval][slval] : '';
        var basr8 = (slval && sval) ? cskillskta2[sval][slval] : '';

	gE('b_minsnt').value = basr1;
        gE('b_maxsnt').value = basr2;
	gE('b_minskt').value = basr3;
        gE('b_maxskt').value = basr4;
	gE('b_minant').value = basr5;
        gE('b_maxant').value = basr6;
	gE('b_minakt').value = basr7;
        gE('b_maxakt').value = basr8;

	if (slval) {
		gE('b_minsnt').disabled = false;
		gE('b_maxsnt').disabled = false;
		gE('b_minskt').disabled = false;
		gE('b_maxskt').disabled = false;
		gE('b_minant').disabled = false;
		gE('b_maxant').disabled = false;
		gE('b_minakt').disabled = false;
		gE('b_maxakt').disabled = false;
	} else {
		gE('b_minsnt').disabled = true;
		gE('b_maxsnt').disabled = true;
		gE('b_minskt').disabled = true;
		gE('b_maxskt').disabled = true;
		gE('b_minant').disabled = true;
		gE('b_maxant').disabled = true;
		gE('b_minakt').disabled = true;
		gE('b_maxakt').disabled = true;
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
	il = [ 'sl_sel', 's_sel' ];
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
	il = [ 'sl_sel', 's_sel' ];
	for (var el, i = il.length; i--;) {
		el = gE( il[i] );
		el.value = (el.id in state) ? state[el.id] : '';
	}

	calc();
}
function calc() {

var bminsnt = gV('b_minsnt');
var bmaxsnt = gV('b_maxsnt');
var bminskt = gV('b_minskt');
var bmaxskt = gV('b_maxskt');
var bminant = gV('b_minant');
var bmaxant = gV('b_maxant');
var bminakt = gV('b_minakt');
var bmaxakt = gV('b_maxakt');
var bks = gV('b_ks');
var bms = gV('b_ms');
var rneutral = gV('r_neutral');
var rerde = gV('r_erde');
var rwasser = gV('r_wasser');
var rluft = gV('r_luft');
var rfeuer = gV('r_feuer');
var basest = gV('base_st');
var basegl = gV('base_gl');
var basefl = gV('base_fl');
var baseint = gV('base_int');
var boostst = gV('boost_st');
var boostgl = gV('boost_gl');
var boostfl = gV('boost_fl');
var boostint = gV('boost_int');

var int = gV('base_int') + gV('boost_int');
var st = gV('base_st') + gV('boost_st');
var fl = gV('base_fl') + gV('boost_fl');
var gl = gV('base_gl') + gV('boost_gl');

var minintsnt = gV('bminsnt') * (200 + int * 2 + int) / 200 + rfeuer);
var maxintsnt = gV('bmaxsnt') * (200 + int * 2 + int) / 200 + rfeuer);
var minintskt = gV('bminskt') * (200 + int * 2 + int) / 200 + rfeuer);
var maxintskt = gV('bmaxskt') * (200 + int * 2 + int) / 200 + rfeuer);
var minintant = gV('bminant') * (200 + int * 2 + int) / 200 + rfeuer);
var maxintant = gV('bmaxant') * (200 + int * 2 + int) / 200 + rfeuer);
var minintakt = gV('bminakt') * (200 + int * 2 + int) / 200 + rfeuer);
var maxintakt = gV('bmaxakt') * (200 + int * 2 + int) / 200 + rfeuer);

var minstsnt = gV('bminsnt') * (200 + int * 2 + st) / 200 + rerde);
var maxstsnt = gV('bmaxsnt') * (200 + int * 2 + st) / 200 + rerde);
var minstskt = gV('bminskt') * (200 + int * 2 + st) / 200 + rerde);
var maxstskt = gV('bmaxskt') * (200 + int * 2 + st) / 200 + rerde);
var minstant = gV('bminant') * (200 + int * 2 + st) / 200 + rerde);
var maxstant = gV('bmaxant') * (200 + int * 2 + st) / 200 + rerde);
var minstakt = gV('bminakt') * (200 + int * 2 + st) / 200 + rerde);
var maxstakt = gV('bmaxakt') * (200 + int * 2 + st) / 200 + rerde);

var minglsnt = gV('bminsnt') * (200 + int * 2 + gl) / 200 + rwasser);
var maxglsnt = gV('bmaxsnt') * (200 + int * 2 + gl) / 200 + rwasser);
var minglskt = gV('bminskt') * (200 + int * 2 + gl) / 200 + rwasser);
var maxglskt = gV('bmaxskt') * (200 + int * 2 + gl) / 200 + rwasser);
var minglant = gV('bminant') * (200 + int * 2 + gl) / 200 + rwasser);
var maxglant = gV('bmaxant') * (200 + int * 2 + gl) / 200 + rwasser);
var minglakt = gV('bminakt') * (200 + int * 2 + gl) / 200 + rwasser);
var maxglakt = gV('bmaxakt') * (200 + int * 2 + gl) / 200 + rwasser);

var minflsnt = gV('bminsnt') * (200 + int * 2 + fl) / 200 + rluft);
var maxflsnt = gV('bmaxsnt') * (200 + int * 2 + fl) / 200 + rluft);
var minflskt = gV('bminskt') * (200 + int * 2 + fl) / 200 + rluft);
var maxflskt = gV('bmaxskt') * (200 + int * 2 + fl) / 200 + rluft);
var minflant = gV('bminant') * (200 + int * 2 + fl) / 200 + rluft);
var maxflant = gV('bmaxant') * (200 + int * 2 + fl) / 200 + rluft);
var minflakt = gV('bminakt') * (200 + int * 2 + fl) / 200 + rluft);
var maxflakt = gV('bmaxakt') * (200 + int * 2 + fl) / 200 + rluft);

var minntsnt = gV('bminsnt') * (200 + int * 2 + st) / 200 + rneutral)
var maxntsnt = gV('bmaxsnt') * (200 + int * 2 + st) / 200 + rneutral)
var minntskt = gV('bminskt') * (200 + int * 2 + st) / 200 + rneutral)
var maxntskt = gV('bmaxskt') * (200 + int * 2 + st) / 200 + rneutral)
var minntant = gV('bminant') * (200 + int * 2 + st) / 200 + rneutral)
var maxntant = gV('bmaxant') * (200 + int * 2 + st) / 200 + rneutral)
var minntakt = gV('bminakt') * (200 + int * 2 + st) / 200 + rneutral)
var maxntakt = gV('bmaxakt') * (200 + int * 2 + st) / 200 + rneutral)

}
//</nowiki></pre>