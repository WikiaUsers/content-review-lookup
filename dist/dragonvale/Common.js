mw.config.set('UMFBypassLicenseCheck', true);

mw.loader.load( 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js' );

/* Changes the Lock Old Blogs After 30 Days To A Chosen Amount */
window.LockOldBlogs = {
    expiryDays: 500,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Greetings, Wizard!',
    yes: '<img src="https://images.wikia.nocookie.net/dragonvale/images/a/a5/Enter.png">',
    no: '<img src="https://images.wikia.nocookie.net/dragonvale/images/7/78/BigXIcon.png">',
    isSpoiler: function() {
        return Boolean($('.spoiler').length);
    }
};
/* End Spoiler Alert */

function mergeObjects(obj1, obj2) {
    var merged = {};
    for (var key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            merged[key] = obj1[key];
        }
    }
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            merged[key] = obj2[key];
        }
    }
    return merged;
}

$(document).ready(function () {
    mw.loader.using('mediawiki.api', function () {
        mw.hook('wikipage.content').add(function ($content) {
            var api = new mw.Api();

            ModuleInject.loadJsonData(api, 'Data:ModuleInvocations.json')
                .then(function (configurations) {
                    const promises = configurations.map(config => {
                        if (!config.selector || typeof config.selector !== 'string' || config.selector.trim() === '') {
                            return Promise.resolve(); // Skip this configuration
                        }

                        return ModuleInject.waitForElement(config.selector).then(el => {
                            var mergedArgs = mergeObjects(
                                ModuleInject.collectNamedArgs(el),
                                config.namedArgs || {}
                            );
                            return ModuleInject.invokeModule(
                                config.module,
                                config.function,
                                config.unnamedArgs,
                                mergedArgs
                            ).then(html => {
                                $(el).html(html);
                            });
                        });
                    });

                    return Promise.all(promises);
                })
                .then(() => {
                    if (typeof window.initializeToggler === 'function') {
                        window.initializeToggler();
                    }

                    if (typeof window.initializeCountdown === 'function') {
                        window.initializeCountdown($content);
                    }
                })
                .catch(error => {
                    console.error('Error during invocation:', error);
                });
        });
    });
});