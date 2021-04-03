/* Any JavaScript here will be loaded for all users on every page load. */

<script>
$(function () {
  $('#sskey').html('"use strict";
<output id="Output"</output>

function myFunction() {
  document.getElementById("Output")

function ab2str(e) {
	return String.fromCharCode.apply(null, new Uint8Array(e))
}

function str2ab(e) {
	for (var n = new ArrayBuffer(e.length), r = new Uint8Array(n), l = 0, o = e.length; o > l; l++) r[l] = e.charCodeAt(l);
	return r
}
var Base32_shiren = function () {
	var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "!"];
	Base32_shiren.prototype.encode = function (n) {
		var r = "",
			l = 0,
			o = n.length;
		do {
			var a, t, i = new Uint8Array(5),
				u = new Array(8);
			switch (o - l) {
				case 4:
					t = 7;
					break;
				case 3:
					t = 5;
					break;
				case 2:
					t = 3;
					break;
				case 1:
					t = 2;
					break;
				default:
					t = 8
			}
			for (a = 0; 5 > a; a++) o > l ? (i[a] = n[l], l++) : i[a] = 0;
			for (u[0] = 31 & i[0], u[1] = (224 & i[0]) >> 5 | (3 & i[1]) << 3, u[2] = (124 & i[1]) >> 2, u[3] = (128 & i[1]) >> 7 | (15 & i[2]) << 1, u[4] = (240 & i[2]) >> 4 | (1 & i[3]) << 4, u[5] = (62 & i[3]) >> 1, u[6] = (192 & i[3]) >> 6 | (7 & i[4]) << 2, u[7] = (248 & i[4]) >> 3, a = 0; t > a; a++) r += e[u[a]]
		} while (o > l);
		return r
	};
	var n = [];
	Base32_shiren.prototype.decode = function (r) {
		var l, o, a = new ArrayBuffer(35),
			t = new Uint8Array(a),
			i = str2ab(r),
			u = 0,
			f = 0,
			s = i.length,
			v = t.length;
		if (void 0 === n[0])
			for (l = 0; 255 > l; l++) {
				var d;
				d = e.indexOf(String.fromCharCode(l).toUpperCase()), n[l] = void 0 !== d ? d : -1
			}
		var m = new ArrayBuffer(8),
			y = new Uint8Array(m);
		for (o = 0, l = 0; s > l;) {
			var g;
			if (g = i[l], l++, 61 === g) f++, g = 0;
			else {
				var h = n[g];
				if (-1 === h) continue;
				g = h
			}
			if (y[o] = g, o++, y.length === o || f > 0 || l === s) {
				for (var c = new ArrayBuffer(5), _ = new Uint8Array(c), w = o; o < y.length; w++) y[o] = 0;
				o = 0, _[0] = 31 & y[0] | (7 & y[1]) << 5, _[1] = (24 & y[1]) >> 3 | (31 & y[2]) << 2 | (1 & y[3]) << 7, _[2] = (30 & y[3]) >> 1 | (15 & y[4]) << 4, _[3] = (16 & y[4]) >> 4 | (31 & y[5]) << 1 | (3 & y[6]) << 6, _[4] = (28 & y[6]) >> 2 | (31 & y[7]) << 3;
				for (var b = 0; b < _.length && u !== v; b++) t[u] = _[b], u++
			}
			if (v === u) break
		}
		return t
	}
};
"undefined" != typeof module && module.exports && (module.exports = Base32_shiren);
var MersenneTwister = function () {
	function e(n) {
		var r, l = new Array(0, 0, 0, 0),
			o = n;
		if (0 != o)
			for (r = 0; 4 > r; ++r) l[r] = 255 & o, o >>= 8;
		this.getValue = function () {
			return (l[0] | l[1] << 8 | l[2] << 16) + 256 * (l[3] << 16)
		}, this.getBits = function (e) {
			return l[3 & e]
		}, this.setBits = function (e, n) {
			return l[3 & e] = 255 & n
		}, this.add = function (n) {
			var r, o, a = new e(0),
				t = 0;
			for (r = 0; 4 > r; ++r) o = l[r] + n.getBits(r) + t, a.setBits(r, o), t = o >> 8;
			return a
		}, this.sub = function (n) {
			var r, o = new e(0),
				a = new Array(0, 0, 0, 0);
			for (r = 0; 4 > r; ++r) a[r] = l[r] - n.getBits(r), r > 0 && a[r - 1] < 0 && --a[r];
			for (r = 0; 4 > r; ++r) o.setBits(r, a[r]);
			return o
		}, this.mul = function (n) {
			var r, o, a = new e(0),
				t = new Array(0, 0, 0, 0, 0);
			for (r = 0; 4 > r; ++r) {
				for (o = 0; 4 > r + o; ++o) t[r + o] += l[r] * n.getBits(o);
				a.setBits(r, t[r]), t[r + 1] += t[r] >> 8
			}
			return a
		}, this.and = function (n) {
			var r, o = new e(0);
			for (r = 0; 4 > r; ++r) o.setBits(r, l[r] & n.getBits(r));
			return o
		}, this.or = function (n) {
			var r, o = new e(0);
			for (r = 0; 4 > r; ++r) o.setBits(r, l[r] | n.getBits(r));
			return o
		}, this.xor = function (n) {
			var r, o = new e(0);
			for (r = 0; 4 > r; ++r) o.setBits(r, l[r] ^ n.getBits(r));
			return o
		}, this.rshifta = function (n) {
			var r, o = new e(0),
				a = new Array(0, 0, 0, 0, 0),
				t = n >> 3,
				i = 0;
			for ((128 & l[3]) > 0 && (a[4] = i = 255), r = 0; 4 > r + t; ++r) a[r] = l[r + t];
			for (; 4 > r; ++r) a[r] = i;
			for (t = 7 & n, r = 0; 4 > r; ++r) o.setBits(r, (a[r] | a[r + 1] << 8) >> t & 255);
			return o
		}, this.rshiftl = function (n) {
			var r, o = new e(0),
				a = new Array(0, 0, 0, 0, 0),
				t = n >> 3;
			for (r = 0; 4 > r + t; ++r) a[r] = l[r + t];
			for (t = 7 & n, r = 0; 4 > r; ++r) o.setBits(r, (a[r] | a[r + 1] << 8) >> t & 255);
			return o
		}, this.lshift = function (n) {
			var r, o = new e(0),
				a = new Array(0, 0, 0, 0, 0),
				t = n >> 3;
			for (r = 0; 4 > r + t; ++r) a[r + t + 1] = l[r];
			for (t = 7 & n, r = 0; 4 > r; ++r) o.setBits(r, (a[r] | a[r + 1] << 8) << t >> 8 & 255);
			return o
		}, this.equals = function (e) {
			var n;
			for (n = 0; 4 > n; ++n)
				if (l[n] != e.getBits(n)) return !1;
			return !0
		}, this.compare = function (e) {
			var n;
			for (n = 3; n >= 0; --n) {
				if (l[n] > e.getBits(n)) return 1;
				if (l[n] < e.getBits(n)) return -1
			}
			return 0
		}
	}
	var n, r = 624,
		l = 397,
		o = new e(2567483615),
		a = new e(2147483648),
		t = new e(2147483647),
		i = new e(0),
		u = new e(1),
		f = function (e, n) {
			return e.and(a).or(n.and(t))
		},
		s = function (e, n) {
			return f(e, n).rshiftl(1).xor(n.and(u).equals(i) ? i : o)
		},
		v = new Array,
		d = 1,
		m = 0,
		y = 0;
	for (n = 0; r > n; ++n) v[n] = i;
	var g = function (n) {
		var l, o = new e(1812433253);
		for (v[0] = new e(n), l = 1; r > l; ++l) v[l] = o.mul(v[l - 1].xor(v[l - 1].rshiftl(30))).add(new e(l));
		d = 1, m = 1
	};
	this.init_genrand = g, this.init_by_array = function (n, l) {
		var o, a, t, i = new e(1664525),
			u = new e(1566083941);
		for (g(19650218), o = 1, a = 0, t = r > l ? r : l; t; --t) v[o] = v[o].xor(v[o - 1].xor(v[o - 1].rshiftl(30)).mul(i)).add(new e(n[a])).add(new e(a)), o++, a++, o >= r && (v[0] = v[r - 1], o = 1), a >= l && (a = 0);
		for (t = r - 1; t; --t) v[o] = v[o].xor(v[o - 1].xor(v[o - 1].rshiftl(30)).mul(u)).sub(new e(o)), o++, o >= r && (v[0] = v[r - 1], o = 1);
		v[0] = new e(2147483648), d = 1, m = 1
	};
	var h = function () {
			var e, n = 0;
			for (0 == m && g(5489), d = r, y = 0, e = r - l + 1; --e; ++n) v[n] = v[n + l].xor(s(v[n], v[n + 1]));
			for (e = l; --e; ++n) v[n] = v[n + l - r].xor(s(v[n], v[n + 1]));
			v[n] = v[n + l - r].xor(s(v[n], v[0]))
		},
		c = new e(2636928640),
		_ = new e(4022730752),
		w = function () {
			var e;
			return 0 == --d && h(), e = v[y], ++y, e = e.xor(e.rshiftl(11)), e = e.xor(e.lshift(7).and(c)), e = e.xor(e.lshift(15).and(_)), e = e.xor(e.rshiftl(18)), e.getValue()
		};
	this.genrand_int32 = w, this.genrand_int31 = function () {
		var e;
		return 0 == --d && h(), e = v[y], ++y, e = e.xor(e.rshiftl(11)), e = e.xor(e.lshift(7).and(c)), e = e.xor(e.lshift(15).and(_)), e = e.xor(e.rshiftl(18)), e.rshiftl(1).getValue()
	}, this.genrand_real1 = function () {
		var e;
		return 0 == --d && h(), e = v[y], ++y, e = e.xor(e.rshiftl(11)), e = e.xor(e.lshift(7).and(c)), e = e.xor(e.lshift(15).and(_)), e = e.xor(e.rshiftl(18)), e.getValue() * (1 / 4294967295)
	}, this.genrand_real2 = function () {
		var e;
		return 0 == --d && h(), e = v[y], ++y, e = e.xor(e.rshiftl(11)), e = e.xor(e.lshift(7).and(c)), e = e.xor(e.lshift(15).and(_)), e = e.xor(e.rshiftl(18)), e.getValue() * (1 / 4294967296)
	}, this.genrand_real3 = function () {
		var e;
		return 0 == --d && h(), e = v[y], ++y, e = e.xor(e.rshiftl(11)), e = e.xor(e.lshift(7).and(c)), e = e.xor(e.lshift(15).and(_)), e = e.xor(e.rshiftl(18)), (e.getValue() + .5) * (1 / 4294967296)
	}, this.genrand_res53 = function () {
		var n = new e(w()).rshiftl(5).getValue(),
			r = new e(w()).rshiftl(6).getValue();
		return (67108864 * n + r) * (1 / 9007199254740992)
	}
};
if ("undefined" != typeof module && module.exports && (module.exports = MersenneTwister), "undefined" != typeof module && module.exports) var Base32_shiren = require("./base32-shiren"),
	MersenneTwister = require("./mt19937ar");
var SSKey = function () {
	var e = 56,
		n = 35,
		r = new Base32_shiren,
		l = new MersenneTwister,
		o = [6, 32, 21, 3, 14, 28, 0, 17, 7, 25, 11, 19, 9, 31, 1, 12, 29, 5, 15, 20, 2, 33, 27, 4, 24, 16, 22, 8, 18, 23, 10, 30, 26, 13, 0],
		a = [{
			level: 0,
			dungeon: "Kobami Valley",
			lvl_name: "unused",
			floor: "none"
		}, {
			level: 1,
			dungeon: "Kobami Valley",
			lvl_name: "Canyon Hamlet",
			floor: ""
		}, {
			level: 2,
			dungeon: "Kobami Valley",
			lvl_name: "Old Cedar Road",
			floor: "1F"
		}, {
			level: 3,
			dungeon: "Kobami Valley",
			lvl_name: "Old Cedar Road",
			floor: "2F"
		}, {
			level: 4,
			dungeon: "Kobami Valley",
			lvl_name: "Mountain Stream",
			floor: "3F"
		}, {
			level: 5,
			dungeon: "Kobami Valley",
			lvl_name: "Mountain Stream",
			floor: "4F"
		}, {
			level: 6,
			dungeon: "Kobami Valley",
			lvl_name: "Bamboo Village",
			floor: ""
		}, {
			level: 7,
			dungeon: "Kobami Valley",
			lvl_name: "Pegasus Ridge",
			floor: "5F"
		}, {
			level: 8,
			dungeon: "Kobami Valley",
			lvl_name: "Pegasus Ridge",
			floor: "6F"
		}, {
			level: 9,
			dungeon: "Kobami Valley",
			lvl_name: "Mountaintop Forest",
			floor: "7F"
		}, {
			level: 10,
			dungeon: "Kobami Valley",
			lvl_name: "Mountaintop Town",
			floor: ""
		}, {
			level: 11,
			dungeon: "Kobami Valley",
			lvl_name: "Old Mine at Mt. Nebri",
			floor: "8F"
		}, {
			level: 12,
			dungeon: "Kobami Valley",
			lvl_name: "Old Mine at Mt. Nebri",
			floor: "9F"
		}, {
			level: 13,
			dungeon: "Kobami Valley",
			lvl_name: "Janus Valley",
			floor: ""
		}, {
			level: 14,
			dungeon: "Kobami Valley",
			lvl_name: "Cavern in the Cliff",
			floor: "10F"
		}, {
			level: 15,
			dungeon: "Kobami Valley",
			lvl_name: "Cavern in the Cliff",
			floor: "11F"
		}, {
			level: 16,
			dungeon: "Kobami Valley",
			lvl_name: "Cave Mtn. Spirits",
			floor: "12F"
		}, {
			level: 17,
			dungeon: "Kobami Valley",
			lvl_name: "Cave Mtn. Spirits",
			floor: "13F"
		}, {
			level: 18,
			dungeon: "Kobami Valley",
			lvl_name: "Cave Mtn. Spirits",
			floor: "14F"
		}, {
			level: 19,
			dungeon: "Kobami Valley",
			lvl_name: "Cryptic Rock Valley",
			floor: ""
		}, {
			level: 20,
			dungeon: "Kobami Valley",
			lvl_name: "Waterfall Marsh",
			floor: "15F"
		}, {
			level: 21,
			dungeon: "Kobami Valley",
			lvl_name: "Waterfall Marsh",
			floor: "16F"
		}, {
			level: 22,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (1)",
			floor: "17F"
		}, {
			level: 23,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (1)",
			floor: "18F"
		}, {
			level: 24,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (1)",
			floor: "19F"
		}, {
			level: 25,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (1)",
			floor: "20F"
		}, {
			level: 26,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (1)",
			floor: "21F"
		}, {
			level: 27,
			dungeon: "Kobami Valley",
			lvl_name: "Stream Village",
			floor: ""
		}, {
			level: 28,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (2)",
			floor: "22F"
		}, {
			level: 29,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (2)",
			floor: "23F"
		}, {
			level: 30,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (2)",
			floor: "24F"
		}, {
			level: 31,
			dungeon: "Kobami Valley",
			lvl_name: "Table Mountain (2)",
			floor: "25F"
		}, {
			level: 32,
			dungeon: "Kobami Valley",
			lvl_name: "Ravine of Illusions",
			floor: "26F"
		}, {
			level: 33,
			dungeon: "Kobami Valley",
			lvl_name: "Phantom Trials",
			floor: "27F"
		}, {
			level: 34,
			dungeon: "Kobami Valley",
			lvl_name: "Dragoncry Trials",
			floor: "28F"
		}, {
			level: 35,
			dungeon: "Kobami Valley",
			lvl_name: "Final Trials",
			floor: "29F"
		}, {
			level: 36,
			dungeon: "Kobami Valley",
			lvl_name: "Plains of the Sun",
			floor: ""
		}, {
			level: 37,
			dungeon: "Kobami Valley",
			lvl_name: "Golden City",
			floor: ""
		}, {
			level: 38,
			dungeon: "Kobami Valley",
			lvl_name: "Rainbow's End",
			floor: ""
		}, {
			level: 39,
			dungeon: "Kobami Valley",
			lvl_name: "Waterfall Cavern",
			floor: "30F"
		}, {
			level: 40,
			dungeon: "Kobami Valley",
			lvl_name: "unused",
			floor: "none"
		}];
	SSKey.prototype.format = function (e, n) {
		var r = [5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5],
			l = 0,
			o = new String;
		e = e.replace(/\s+/g, "");
		for (var a = 0; 15 > a; a++) {
			var t = e.slice(l, l + r[a]);
			l += r[a], o = o + t + " ", n && (a + 1) % 3 === 0 && (o += "\n")
		}
		return o.trim()
	}, SSKey.prototype.isValid = function (e) {
		var n = /^[BCDFGHJKLMNPQRSTVWXYZ0-9!\s]+$/i.test(e);
		return n
	}, SSKey.prototype.checksum = function (e) {
		for (var r = 0, l = new Uint8Array(1), o = 0; n - 1 > o; o++) r += e[o];
		return r -= e[2], l[0] = r % 256, l[0]
	}, SSKey.prototype.seed_rng = function (e) {
		var n = 0;
		n = (e[2] << 8) + e[1], l.init_genrand(n)
	}, SSKey.prototype.swap = function (e, n, r) {
		var l;
		if (0 === r)
			for (l = 0; 34 > l; l++) e[l] = n[o[l]];
		else
			for (l = 0; 34 > l; l++) e[o[l]] = n[l]
	}, SSKey.prototype.encrypt_rescue = function (e) {
		var r = 0,
			o = new Array(n);
		o = e;
		var a = new Array(n);
		this.seed_rng(o);
		for (var t = 3; 34 > t; t++) r = 255 & l.genrand_int32(), r += o[t], o[t] = r;
		return this.swap(a, o, 0), a
	}, SSKey.prototype.decrypt = function (e, n) {
		var r = 0;
		this.swap(e, n, 1), this.seed_rng(e);
		for (var o = 3; 34 > o; o++) r = 255 & l.genrand_int32(), r = e[o] - r, e[o] = r;
		var a = this.checksum(e);
		return a === e[2] ? 0 : 1
	}, SSKey.prototype.strip_ascii = function (n) {
		for (var r = 0, l = 0, o = new String; r < n.length && o.length < e;)
			if (l = n[r], r++, "\r" !== l && "\n" !== l && " " !== l && '"' !== l) {
				if (!/^[BCDFGHJKLMNPQRSTVWXYZ0-9!\s]+$/.test(l)) break;
				o += l
			}
		return o
	}, SSKey.prototype.revive = function (e) {
		var r, l = new Uint8Array(n);
		for (l[0] = 66, r = 3; 9 > r; r++) l[r] = e[r];
		for (r = 10; 14 > r; r++) l[r - 1] = e[r];
		return l[13] = 0, l[14] = 9, l[15] = 191, l[16] = 165, l[24] = 91, l[25] = 78, l[26] = 5, l[27] = 5, l[28] = 11, l[29] = 92, l[2] = this.checksum(l), l
	}, SSKey.prototype.revive_from_rescue = function (l) {
		var o = new Uint8Array(n),
			a = new Uint8Array(n),
			t = new String,
			i = new Array(e),
			u = new String;
		if (!this.isValid(l)) return "Password contains invalid characters!";
		if (t = this.strip_ascii(l), t.length === e) {
			if (a = r.decode(t), 0 !== this.decrypt(o, a)) return "Verification error!";
			33 == o[0] ? (o = this.revive(o), a = this.encrypt_rescue(o), i = r.encode(a), u = this.format(i, !0)) : u = "Checksum error!"
		} else u = "Password length mismatch!";
		return u
	}, SSKey.prototype.map_char = function (e) {
		var n, r;
		return e >= 63 && 90 >= e ? n = e : e >= 1 && 26 >= e ? n = e + 96 : e >= 32 && 57 >= e && (n = e), n > 0 ? r = String.fromCharCode(n) : ""
	}, SSKey.prototype.get_info = function (l) {
		var o = new Uint8Array(n),
			t = new Uint8Array(n),
			i = new String;
		if (this.isValid(l) && (i = this.strip_ascii(l), i.length === e)) {
			if (t = r.decode(i), 0 !== this.decrypt(o, t)) return;
			for (var u = "", f = 18, s = f; f + 10 > s; s++) u += this.map_char(o[s]);
			var v;
			return f = 28, v = o[f], f++, v += 256 * o[f], 38 > v ? {
				name: u,
				level: a[v].floor,
				dungeon: a[v].dungeon,
				lvl_name: a[v].lvl_name
			} : v >= 41 && 139 >= v ? {
				name: u,
				level: v - 40 + "F",
				dungeon: "Kitchen God"
			} : v >= 141 && 239 >= v ? {
				name: u,
				level: v - 140 + "F",
				dungeon: "Scroll Cave"
			} : v >= 241 && 339 >= v ? {
				name: u,
				level: v - 240 + "F",
				dungeon: "Final Puzzle"
			} : v >= 341 && 390 >= v ? {
				name: u,
				level: v - 340 + "F",
				dungeon: "Ravine of the Dead"
			} : v >= 391 && 459 >= v ? {
				name: u,
				level: 30 + (v - 390) + "F",
				dungeon: "Tainted Path"
			} : v >= 461 && 490 >= v ? {
				name: u,
				level: v - 460 + "F",
				dungeon: "Ceremonial Cave"
			} : v >= 491 && 540 >= v ? {
				name: u,
				level: v - 490 + "F",
				dungeon: "Fay's Puzzles"
			} : {
				name: u,
				level: v
			}
		}
	}
};
"undefined" != typeof module && module.exports && (module.exports = SSKey);
var ShirenReviver = function () {
		this.revive = function () {
			var e, n, r = new SSKey;
			e = document.getElementById("rescue").value.toUpperCase(), n = r.revive_from_rescue(e), document.getElementById("revival").value = n, 70 === n.length && (document.getElementById("rescue").value = r.format(e, !0));
			var l = r.get_info(e);
			return "object" == typeof l && (document.getElementById("name").value = l.name, document.getElementById("level").value = l.level, document.getElementById("dungeon").value = l.dungeon), !1
		}
	},
	shiren = new ShirenReviver;');
}());
</script>