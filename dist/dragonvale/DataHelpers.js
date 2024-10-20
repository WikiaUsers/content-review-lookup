var DataHelpers = DataHelpers || {};

function generateModuleInvocation(moduleName, functionName, unnamedArgs, namedArgs) {
    unnamedArgs = unnamedArgs || [];
    namedArgs = namedArgs || {};

    var unnamedArgsString = unnamedArgs.map(function (arg) {
        return arg || '';
    }).join('|');

    var namedArgsString = Object.keys(namedArgs).map(function (key) {
        return key + '=' + (namedArgs[key] || '');
    }).join('|');

    var luaInvocation = '{{#invoke:' + moduleName + '|' + functionName +
        (unnamedArgsString ? '|' + unnamedArgsString : '') +
        (namedArgsString ? '|' + namedArgsString : '') + '}}';

    return luaInvocation;
};

DataHelpers.invokeModule = function(invocation) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                format: 'json',
                text: invocation,
                prop: 'text'
            },
            dataType: 'json',
            success: function (data) {
                resolve(data);
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
};

DataHelpers.updateModuleInvocation = function (moduleName, functionName, unnamedArgs, namedArgs) {
    var invocation = generateModuleInvocation(moduleName, functionName, unnamedArgs, namedArgs);

    return DataHelpers.invokeModule(invocation)
        .then(function (data) {
            return data.parse.text['*'];
        })
        .catch(function (error) {
            console.error('Failed to update invocation.');
        });
};


DataHelpers.render_wikitext = function (html) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            method: 'POST',
            data: {
                action: 'parse',
                text: html,
                format: 'json',
                contentmodel: 'wikitext',
                formatversion: '2',
                prop: "text"
            },
            dataType: 'json',
            success: function (response) {
                if (response.parse && response.parse.text) {
                    var text = response.parse.text;
                    resolve(text);
                } else {
                    reject(new Error('Failed to parse content'));
                }
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
};

DataHelpers.loadJsonData = function(api, pageTitle) {
    return new Promise(function (resolve, reject) {
        api.get({
            action: "query",
            format: "json",
            prop: "revisions",
            titles: pageTitle,
            rvprop: "content",
            rvslots: "main"
        }).done(function (data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];

            if (pageId === "-1") {
                console.info('Page not found');
                return;
            }

            var content = pages[pageId].revisions[0].slots.main['*'];

            try {
                var jsonData = JSON.parse(content);
                resolve(jsonData);
            } catch (e) {
                reject('Error parsing JSON:', e);
            }
        }).fail(function (error) {
            reject('API request failed:', error);
        });
    });
};

DataHelpers.initializeWhenReady = function ($element, callback) {
    var observer = new MutationObserver(function (mutations, observerInstance) {
        if ($element.length > 0) {
            observerInstance.disconnect();
            callback($element, mutations);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

DataHelpers.initializeWhenSelectorReady = function (selector, callback) {
    var observer = new MutationObserver(function (mutations, observerInstance) {
        var $element = $(selector)
        if ($element.length > 0) {
            observerInstance.disconnect();
            callback($element, mutations);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};