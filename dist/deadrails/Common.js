/* Auto-Updating DST clocks */
function initializeDynamicTimezoneClocks() {
    const allElements = document.querySelectorAll('.dynamic-timezone-time');
    
    if (allElements.length === 0) return;
    
    const uniqueTimezones = new Set();
    allElements.forEach(element => {
        const timezone = element.getAttribute('data-timezone');
        if (timezone) {
            uniqueTimezones.add(timezone);
        }
    });
    
    uniqueTimezones.forEach(timezone => {
        const elementsForThisTimezone = document.querySelectorAll('.dynamic-timezone-time[data-timezone="' + timezone + '"]');
        
        function updateTimeForTimezoneGroup() {
            try {
                const timeString = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).format(new Date());
                
                elementsForThisTimezone.forEach(element => {
                    element.textContent = timeString;
                });
            } catch (e) {
                // Invalid timezone, fallback
                elementsForThisTimezone.forEach(element => {
                    element.textContent = 'Invalid timezone, please use IANA official timezones.';
                });
            }
        }
        
        updateTimeForTimezoneGroup();
        
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        
        setTimeout(() => {
            updateTimeForTimezoneGroup();
            setInterval(updateTimeForTimezoneGroup, 60000);
        }, msUntilNextMinute);
    });
}

jQuery(function($) {
    initializeDynamicTimezoneClocks();
});

/* Autolock Comments */
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 14;

/* Daily Facts */
(function () {
    'use strict';
    if (window.DailyFactsLoaded) {
        return;
    }
    window.DailyFactsLoaded = true;

    var DailyFacts = {
        facts: [
            "Did you know, the <a href=\"/wiki/Bundles\" title=\"Bundles\">starter pack</a> isn't actually 70% off? It's actually around 56.5% off!",
            "Did you know, the total worth of the <a href=\"/wiki/Castle\" title=\"Castle\">castle</a> is around $1340-1375? With <a href=\"/wiki/High_Roller\" title=\"High Roller\">High Roller</a>, that's around $2010-2062!",
            "Did you know, people who beat <a href=\"/wiki/Horsing_Around\" title=\"Horsing Around\">Horsing Around</a> people on April 1st, 2025 got a special skin for the <a href=\"/wiki/Horse_(Class)\" title=\"Horse (Class)\">Horse Class</a>? It was a <a href=\"/wiki/Unicorn\" title=\"Unicorn\">Unicorn</a>!",
            "Did you know that a <a href=\"/wiki/Day_Cycle\" title=\"Day Cycle\">day</a> in game is equal to eight minutes in real life? An hour is 20 seconds itself!",
            "Did you know that the highest speed <a href=\"/wiki/Train\" title=\"Train\">train</a> ever possible in game is 149.5km/h? For example, normally the fastest is 104km/h!",
            "Did you know that <a href=\"/wiki/Lore\" title=\"Lore\">despite taking place</a> in the late 1800's/early 1900's the game uses metric units? Historically America's imperial system was implemented by 1832!",
            "Did you know <a href=\"/wiki/Alien_Mode\" title=\"Alien Mode\">Alien Mode</a> is the first <a href=\"/wiki/Gamemodes\" title=\"Gamemodes\">gamemode</a> to not be selectable on the <a href=\"/wiki/Party\" title=\"Party\">party</a> screen? This also means it can collide with other modes, having no set distance, instead being based on what gamemode you started with!",
            "Did you know that <a href=\"/wiki/Sterling\" title=\"Sterling\">Sterling</a> has the most unique items? Infact, it has 9! (<a href=\"/wiki/Strange_Map\" title=\"Strange Map\">Strange Map</a>, <a href=\"/wiki/Strange_Mask\" title=\"Strange Mask\">Strange Mask</a>, <a href=\"/wiki/Jade_Sword\" title=\"Jade Sword\">Jade Sword</a>, and all 5 <a href=\"/wiki/Artifacts\" title=\"Artifacts\">Artifacts</a>.) The second place goes to <a href=\"/wiki/Tesla_Lab\" title=\"Tesla Lab\">Tesla Lab</a> with 3 (<a href=\"/wiki/Strange_Machine\" title=\"Strange Machine\">Strange Machine</a>, <a href=\"/wiki/Brain_in_a_Jar\" title=\"Brain in a Jar\">Brain in a Jar</a>, and <a href=\"/wiki/Electrocutioner\" title=\"Electrocutioner\">Electrocutioner</a>)!",
            "Did you know that the <a href=\"/wiki/Survivalist\" title=\"Survivalist\">Survivalist</a> and <a href=\"/wiki/Werewolf_(Class)\" title=\"Werewolf\">Werewolf</a> classes used to be bugged? They had around 2x more ranged damage even without their abilities conditions being met, this made them do 3x more when their conditions were met, this made some players see them better than pre nerf <a href=\"/wiki/Vampire_(Class)\" title=\"Vampire class\">Vampire class</a>!"
        ],

        epoch: Date.UTC(2024, 0, 1),

        mulberry32: function (seed) {
            return function () {
                seed |= 0;
                seed = (seed + 0x6D2B79F5) | 0;
                var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
                t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        },

        shuffle: function (arr, rng) {
            var a = arr.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(rng() * (i + 1));
                var tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a;
        },

        getTodayFact: function () {
		    var n = this.facts.length;
		    var now = new Date();
		    var todayUTC = Date.UTC(
		        now.getUTCFullYear(),
		        now.getUTCMonth(),
		        now.getUTCDate()
		    );
		    var daysSinceEpoch = Math.floor((todayUTC - this.epoch) / 86400000);
		
		    var todayRng = this.mulberry32(daysSinceEpoch);
		    var yesterdayRng = this.mulberry32(daysSinceEpoch - 1);
		
		    var yesterday = Math.floor(yesterdayRng() * n);
		    var today = Math.floor(todayRng() * (n - 1));
		
		    if (today >= yesterday) {
		        today++;
		    }
		
		    return this.facts[today];
		},

        insertToSiderail: function () {
            if ($('#WikiaRail').length === 0) {
                return;
            }
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            var el = $('<div>', { class: 'DailyFactsModule rail-module' });
            el.append($('<h2>', { class: 'activity-heading', text: 'Did You Know?' }));
            el.append($('<p>', { id: 'DailyFactsText', html: this.getTodayFact() }));
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
        },

        init: function () {
            if ($('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas) {
                    var classSplit = clas.split(/\s+/);
                    if (classSplit.indexOf('loaded') === -1 && classSplit.indexOf('is-ready') === -1) {
                        $('#WikiaRail').on('afterLoad.rail', this.insertToSiderail.bind(this));
                    } else {
                        this.insertToSiderail();
                    }
                } else {
                    this.insertToSiderail();
                }
            }
        }
    };

    mw.loader.using(['mediawiki.util']).then(DailyFacts.init.bind(DailyFacts));

    window.DailyFacts = DailyFacts;
})();