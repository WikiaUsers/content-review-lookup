;(function( mw ) {
	"use strict";
	var ele = document.getElementById("whip-status");
	if (mw.config.get("wgPageName") !== "WHIP" || !ele) return;
	function getHashCode(str) { // From MoatShrimp
		var h1 = 5381;
		var h2 = h1;

		for (var i = 0; i < str.length; i += 2) {
			h1 = (((h1 << 5) + h1)|0) ^ str.charCodeAt(i);
			if (i+1 == str.length) {break;}
			h2 = (((h2 << 5) + h2)|0) ^ str.charCodeAt(i+1);
		}

		return (h1 + Math.imul(h2, 1566083941))|0;
	}
	var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Random = /** @class */ (function () { //From MoatShrimp
    function Random(initSeed) {
        if (initSeed === void 0) { initSeed = 51113926; }
        var nextSeed = function (seed) { return (Math.imul(1812433253, seed) + 1) >>> 0; };
        var s1 = (initSeed) >>> 0;
        var s2 = nextSeed(s1);
        var s3 = nextSeed(s2);
        var s4 = nextSeed(s3);
        this.seed = [s1, s2, s3, s4];
    }
    Object.defineProperty(Random.prototype, "state", {
        get: function () { return __spreadArray([], this.seed, true); },
        set: function (newState) { this.seed = __spreadArray([], newState, true); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "nextInt", {
        get: function () { return this.nextUInt % 0x7FFFFFFF; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "next", {
        get: function () { return this.nextInt; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "value", {
        get: function () { return 1 - this.rangeFloat(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "nextUInt", {
        get: function () {
            var x = this.seed.shift();
            var y = this.seed[2];
            x ^= x << 11;
            x ^= x >>> 8;
            y ^= y >>> 19;
            y = (y ^ x) >>> 0;
            this.seed.push(y);
            return y;
        },
        enumerable: false,
        configurable: true
    });
    Random.prototype.range = function (min, max) {
        var _a;
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 99999999; }
        if (max < min) {
            _a = [max, min], min = _a[0], max = _a[1];
        }
        return this.nextUInt % (max - min) + min;
    };
    Random.prototype.rangeFloat = function (min, max) {
        var _a;
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        if (max < min) {
            _a = [max, min], min = _a[0], max = _a[1];
        }
        return (max - min) * (1 - Math.fround(((this.nextUInt & 0x7FFFFF) >>> 0) / 0x7FFFFF)) + min;
    };
    Random.prototype.rangeInclusive = function (min, max) {
        return this.range(min, max + 1);
    };
    return Random;
}());
function ItemP(packNum){
//var ItemPacks = new Object();
switch(packNum)
{
case 1: return "<wiki>{{Item|Key|Keys}}x 5</wiki>";
case 2: return "<wiki>{{Item|Key|Keys}} x 10</wiki>";
case 3: return "<wiki>{{Item|Bomb|Bombs}} x 5</wiki>";
case 4: return "<wiki>{{Item|Bomb|Bombs}} x 10</wiki>";
case 5: return "<wiki>{{Item|Conductor}}, {{Item|Bottled Pilfer}} x 3</wiki>";
case 6: return "<wiki>{{Item|Conductor}}, {{Item|Auglycerin}} x 2</wiki>";
case 7: return "<wiki>{{Item|Tsar Bomba}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|U-235}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 8: return "<wiki>{{Item|Spare Ordnance}}, {{Item|Leftovers}}</wiki>";
case 9: return "<wiki>{{Item|Obsidian Knife}}</wiki>";
case 10: return "<wiki>{{Item|Chakram}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Gust}} x 3</wiki>";
case 11: return "<wiki>{{Item|Throwing Star}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Mighty Hurl}} x 4</wiki>";
case 12: return "<wiki>{{Item|Bottled Lightning}}, {{Item|Salamander Tail}}, {{Item|Crippling Poison}}</wiki>";
case 13: return "<wiki>{{Item|Tent}}</wiki>";
case 14: return "<wiki>{{Item|Karmic Scale}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Breastplate}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Pauldron}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Gauntlets}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Greaves}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 15: return "<wiki>{{Item|Karmic Scale}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 16: return "<wiki>{{Item|Rabbit Gloves}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Lucky Lockpick}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 17: return "<wiki>{{Item|Petrified Rock}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 18: return "<wiki>{{Item|Cosmic Egg}}, {{Item|Biscuits}} x 4</wiki>";
case 19: return "<wiki>{{Item|Poison Mushroom}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 20: return "<wiki>{{Item|Sequence Breaker}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Sonic Boom}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Mighty Hurl}} x 3</wiki>";
case 21: return "<wiki>{{Item|Map}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 22: return "<wiki>{{Item|Miner's Flask}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Slow Metabolism}} x 3, {{Item|Troll Sweat}}</wiki>";
case 23: return "<wiki>{{Item|Blood Offering}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Ursa Major}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Butcher's Cleaver}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 24: return "<wiki>{{Item|Suneater}}</wiki>";
case 25: return "<wiki>{{Item|Sonic Boom}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Throwing Star}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Mighty Hurl}} x 15</wiki>";
case 26: return "<wiki>{{Item|Devotion}}, {{Item|Holy Guacamole}}</wiki>";
case 27: return "<wiki>{{Item|Resurrection}}</wiki>";
case 28: return "<wiki>{{Item|Dirk's Hammer}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Transmutagen Blast}}, {{Item|Transmutagen}}, {{Item|TRANSMUT3 in a Bottle}}</wiki>";
case 29: return "<wiki>{{Item|Glass Cannon}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 30: return "<wiki>{{Item|Pilfer Ring}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Explosive Decompression}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 31: return "<wiki>{{Item|Pilfer's Nightmare}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Explosive Decompression}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 32: return "<wiki>{{Item|Key Blade}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Key Doubler}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Security Theater}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 33: return "<wiki>{{Item|Bomb|Bombs}} x 99, {{Item|Sweaty Palms}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Blood Pact}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 34: return "<wiki>{{Item|Key|Keys}} x 20, {{Item|Key Blade}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Sweaty Fingers}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Haunted Locks}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 35: return "<wiki>{{Item|Witch's Brew}} x 2</wiki>";
case 36: return "<wiki>{{Item|All-Potion}}</wiki>";
case 37: return "<wiki>{{Item|U-235}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Doubling Saison}} x 2</wiki>";
case 38: return "<wiki>{{Item|Kurtz' Stache}}</wiki>";
case 39: return "<wiki>{{Item|Coffee}}</wiki>";
case 40: return "<wiki>{{Item|Shop in a Bottle}} x 3</wiki>";
case 41: return "<wiki>{{Item|Tsar Bomba}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Queen's Bomb}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Resurrection}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Demolition}} x 3</wiki>";
case 42: return "<wiki>{{Item|Tsar Bomba}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|U-235}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Bomb Doubler}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Blast Suit}}</wiki>";
case 43: return "<wiki>{{Item|Salamander Tail}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Salamander's Wrath}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Wet Blanket}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 44: return "<wiki>{{Item|The Crumbles}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Pocket Grill}}</wiki>";
case 45: return "<wiki>{{Item|Miner's Flask}}, {{Item|Slow Metabolism}} x 5</wiki>";
case 46: return "<wiki>{{Item|Petrified Rock}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Double Doubler}}, {{Item|Seasoned Popcorn}}</wiki>";
case 47: return "<wiki>{{Item|Birthing Pod}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Apprentice's Tincture}} x 3</wiki>";
case 48: return "<wiki>{{Item|Lucky Lockpick}}, {{Item|Rabbit Gloves}}, {{Item|Lucky Nugget}}</wiki>";
case 49: return "<wiki>{{Item|Unstable Concoction}}, {{Item|Golden Popcorn}}, {{Item|Explosiveness}} x 5</wiki>";
case 50: return "<wiki>{{Item|Chakram}}, {{Item|Phantasmal Axe}}</wiki>";
case 51: return "<wiki>{{Item|Mushroom}}, {{Item|Frailty}} x 14</wiki>";
case 52: return "<wiki>{{Item|Doom Blade}}</wiki>";
case 53: return "<wiki>{{Item|Key|Keys}} x 15, {{Item|Bomb|Bombs}} x 15, {{Item|Item Eater}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 54: return "<wiki>{{Item|Item Eater}}, {{Item|Blessing Eater}}, {{Item|Relic Eater}}</wiki>";
case 55: return "<wiki>{{Item|Seasoned Kernels}}, {{Item|Popcorn Kernels}}, {{Item|Golden Kernels}}, {{Item|Rainbow Kernels}}</wiki>";
case 56: return "<wiki>{{Item|Poverty}} <span style='color: return#F02121'>(Indestructible)</span> x 5, {{Item|Inflation}} <span style='color: return#F02121'>(Indestructible)</span> x 5</wiki>";
case 57: return "<wiki>{{Item|Vorpal Blade}}, {{Item|Cleave}} x 5</wiki>";
case 58: return "<wiki>{{Item|Bomb|Bombs}} x 99, {{Item|Weakness}} <span style='color: return#F02121'>(Indestructible)</span> x 15, {{Item|Imbalance}} <span style='color: return#F02121'>(Indestructible)</span> x 15, {{Item|Capture Sphere}}</wiki>";
case 59: return "<wiki>{{Item|Explosiveness}} x 20</wiki>";
case 60: return "<wiki>{{Item|Karmic Scale}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Regeneration}}</wiki>";
case 61: return "<wiki>{{Item|Berserker's Pendant}}, {{Item|Axe Thrower's Pendant}}</wiki>";
case 62: return "<wiki>{{Item|Knight's Pendant}}, {{Item|Archer's Pendant}}</wiki>";
case 63: return "<wiki>{{Item|Secrecy}}, {{Item|Adventurer's Hat}}, {{Item|Circinus}}, {{Item|Potion of True Sight}}</wiki>";
case 64: return "<wiki>{{Item|Stoneforge Broth}}</wiki>";
case 65: return "<wiki>{{Item|Shield of Quills}}, {{Item|Breastplate}}, {{Item|Pangolin Potion}}</wiki>";
case 66: return "<wiki>{{Item|Twin Axe}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Chakram}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Gust}} x 5</wiki>";
case 67: return "<wiki>{{Item|Explosive Decompression}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Pilfer's Nightmare}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Golden Popcorn}}</wiki>";
case 68: return "<wiki>{{Item|Mune}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Guantes}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Balance}} x 5, {{Item|Weakness}} x 5</wiki>";
case 69: return "<wiki>{{Item|Masa}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Demon Ring}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Strength}} x 5, {{Item|Imbalance}} x 5</wiki>";
case 70: return "<wiki>{{Item|Birthing Pod}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Butcher's Cleaver}}, {{Item|Seasoned Kernels}} x 2</wiki>";
case 71: return "<wiki>{{Item|Key|Keys}} x 3, {{Item|Lockpick}}, {{Item|Key Blade}}</wiki>";
case 72: return "<wiki>{{Item|Box of Holding}}, {{Item|Golden Axe}}, {{Item|Market Crash}}</wiki>";
case 73: return "<wiki>{{Item|Recycler}}, {{Item|Empty Coffers}}</wiki>";
case 74: return "<wiki>{{Item|Key|Keys}} x 99, {{Item|Bomb|Bombs}} x 99, {{Item|Frailty}} x 99, {{Item|Purification Potion}}</wiki>";
case 75: return "<wiki>{{Item|Elixir}}</wiki>";
case 76: return "<wiki>{{Item|Frailty}} x 12 <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Regeneration}} x 20</wiki>";
case 77: return "<wiki>{{Item|Blast Suit}}, {{Item|Bombushka}}, {{Item|Demolition}} x 10, {{Item|Explosiveness}} x 10</wiki>";
case 78: return "<wiki>{{Item|Miniaturizer}}, {{Item|Spare Ordnance}}, {{Item|Recycler}}</wiki>";
case 79: return "<wiki>{{Item|Bounty Contract}}, {{Item|Golden Popcorn}}, {{Item|Conductor}}, {{Item|Battle Standard}}</wiki>";
case 80: return "<wiki>{{Item|Ursa Major}}, {{Item|Blade Mail}}, {{Item|Weakness}} x 5, {{Item|Imbalance}} x 5</wiki>";
case 81: return "<wiki>{{Item|Guidance}}, {{Item|Bottled Lightning}}, {{Item|Mjölnir}}</wiki>";
case 82: return "<wiki>{{Item|Blessed Blend}}, {{Item|Ambrosia}} x 3</wiki>";
case 83: return "<wiki>{{Item|Ursa Major}}, {{Item|Orion's Sword}}, {{Item|Canis Major}}</wiki>";
case 84: return "<wiki>{{Item|Brittleness}} x 20 <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Blood Bomb}}, {{Item|Box of Holding}}</wiki>";
case 85: return "<wiki>{{Item|Witch's Brew}}, {{Item|Aether}} x 2</wiki>";
case 86: return "<wiki>{{Item|Plague}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Rain of Fire}} <span style='color: return#F02121'>(Indestructible)</span></wiki>";
case 87: return "<wiki>{{Item|Suneater}}, {{Item|Devotion}}</wiki>";
case 88: return "<wiki>{{Item|Waking Light}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Tortoise Shield}}, {{Item|Grimhilde's Mirror}}</wiki>";
case 89: return "<wiki>{{Item|Four Leaf Clover}}, {{Item|Gold Tooth}}, {{Item|Catalyst}}</wiki>";
case 90: return "<wiki>{{Item|Freeloader Draught}} x 2</wiki>";
case 91: return "<wiki>{{Item|Bomb|Bombs}} x 50, {{Item|Iron Glaze}}, {{Item|Impish Key Bomb}}</wiki>";
case 92: return "<wiki>{{Item|Karmic Scale}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Doom Blade}}, {{Item|Resurrection}}, {{Item|Witch's Brew}} x 2</wiki>";
case 93: return "<wiki>{{Item|Paladin Shield}}, {{Item|Emperor's Crown}}, {{Item|Elixir}}</wiki>";
case 94: return "<wiki>{{Item|Waking Light}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Obsidian Knife}}, {{Item|Nullstone}}</wiki>";
case 95: return "<wiki>{{Item|Hay Fever}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Obsidian Knife}}, {{Item|Nullstone}}</wiki>";
case 96: return "<wiki>{{Item|Soul Cannon}}, {{Item|Hyperstone}}</wiki>";
case 97: return "<wiki>{{Item|Bloodied Locks}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Blood Offering}} <span style='color: return#F02121'>(Indestructible)</span>, {{Item|Meal Ticket}}, {{Item|Leftovers}}</wiki>";
case 98: return "<wiki>{{Item|Shadow's Fang}}, {{Item|Dillon's Claw}}, {{Item|Mediocrity}}, {{Item|Metamfiezomaiophobia}}</wiki>";
case 99: return "<wiki>{{Item|Inverter}}, {{Item|Ambrosia}}, {{Item|Holy Glaze}}</wiki>";
case 100: return "<wiki>{{Item|Vorpal Blade}}, {{Item|Masamune}}</wiki>";
default: return packNum;
}
}
	function main() {
		var daystart = new Date("1/1/2020");
		var daynow = new Date();
		daynow = new Date(daynow.getUTCFullYear(), daynow.getUTCMonth(), daynow.getUTCDate(), daynow.getUTCHours(), daynow.getUTCMinutes(), daynow.getUTCSeconds(), daynow.getUTCMilliseconds());
		var nextday = new Date(daynow.getUTCFullYear(), daynow.getUTCMonth(), daynow.getUTCDate() + 1, 0, 0, 0);
		var timeleft = new Date(nextday - daynow);
		var tl_h = timeleft.getUTCHours();
		var tl_m = timeleft.getUTCMinutes();
		var tl_s = timeleft.getUTCSeconds();
		tl_h = (tl_h < 10) ? "0" + tl_h : tl_h;
		tl_m = (tl_m < 10) ? "0" + tl_m : tl_m;
		tl_s = (tl_s < 10) ? "0" + tl_s : tl_s;
		var cycle = Math.floor((daynow - daystart) / (1000 * 3600 * 24));
		var seed=(String(Math.abs(getHashCode("whip_" + cycle + "_seed")))).substr(0,8);
		var trial = new Random(seed);
		var itemPack = trial.rangeInclusive(1,100);
		if (ele) {
			ele.innerHTML = ("<b>Cycle:</b> " + cycle + "<br /><b>Seed:</b> " + seed + "<br /><b>Time left:</b> " + tl_h + ":" + tl_m + ":" + tl_s + "<br /><b>Item Pack:</b> " + ItemP(itemPack) );
		}
	}
	setInterval(main, 500);
})( window.mediaWiki );