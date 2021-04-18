//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true */
/*global UserTagsJS */

//
// MODULE: User Account age
// Adds a usertag with the account's age
//
UserTagsJS.extensions.userage = (function($) {
    "use strict";
    return {
        start: function() {
            return {
                ajax: {
                    type: 'user',
                    prop: ['registration']
                }
            };
        },
        generate: function(json) {
            if (!json || json.error || !json.query) {
                return;
            }
            var user = json.query.users[0];
            if (!user || !user.registration) {
                return;
            }
            var tags = {},
            date = new Date(user.registration),
            months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)),
            time = $.timeago(date);
	        if (!time) {
	        	// Custom fix since mediawiki's timeago (specifically $.timeago.inWords) doesn't seem to like values greater than 30 days?
	        	// this is the same exact function, but without that time check
	        	var customInWords = function(t) {
					// if (t <= 2592e6) {
						var e = false;
						$.timeago.settings.allowFuture && (t < 0 && (e = !0), t = Math.abs(t));
						var r = t / 1e3, a = r / 60, i = a / 60, n = i / 24, o = n / 365;
						return r < 45 && u("second", Math.round(r)) || r < 90 && u("minute", 1) || a < 45 && u("minute", Math.round(a)) || a < 90 && u("hour", 1) || i < 24 && u("hour", Math.round(i)) || i < 48 && u("day", 1) || n < 30 && u("day", Math.floor(n)) || n < 60 && u("month", 1) || n < 365 && u("month", Math.floor(n / 30)) || o < 2 && u("year", 1) || u("year", Math.floor(o))
					// }
					function u(t, r) {
						return mw.message(e ? "timeago-" + t + "-from-now" : "timeago-" + t, r).text()
					}
				};
				
				var myDate = $.timeago.parse(user.registration);
				var timeDistance = new Date().getTime() - myDate.getTime();
				time = customInWords(timeDistance);
	        }
            if (months > 12 && months % 12) {
                time = time.slice(0, -3) + mw.message('timeago-month', months % 12).text();
            }
            tags[user.registration] = {
                u: time
            };
            return {
                groups: [user.registration],
                tags: tags
            };
        }
    };
})(jQuery);

//</syntaxhighlight>