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