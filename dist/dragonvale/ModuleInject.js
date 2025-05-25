(function () {
    'use strict';

    var ModuleInject = (function () {
        function generateModuleInvocation(moduleName, functionName, unnamedArgs = [], namedArgs = {}) {
            unnamedArgs = unnamedArgs || [];
            namedArgs = namedArgs || {};

            const unnamedArgsString = unnamedArgs.map(function (arg) {
                return arg || '';
            }).join('|');

            const namedArgsString = Object.keys(namedArgs).map(function (key) {
                return key + '=' + (namedArgs[key] || '');
            }).join('|');

            const luaInvocation = `{{#invoke:${moduleName}|${functionName}${unnamedArgsString ? `|${unnamedArgsString}` : ''}${namedArgsString ? `|${namedArgsString}` : ''}}}`;
            return luaInvocation;
        }

        function triggerModuleInvocation(invocation) {
            return $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    format: 'json',
                    text: invocation,
                    prop: 'text'
                },
                dataType: 'json'
            });
        }

        return {
            loadJsonData: function (api, pageTitle) {
                return new Promise(function (resolve, reject) {
                    api.get({
                        action: "query",
                        format: "json",
                        prop: "revisions",
                        titles: pageTitle,
                        rvprop: "content",
                        rvslots: "main"
                    }).done(function (data) {
                        const pages = data.query.pages;
                        const pageId = Object.keys(pages)[0];

                        if (pageId === "-1") {
                            console.info('Page not found');
                            return reject('Page not found');
                        }

                        const content = pages[pageId].revisions[0].slots.main['*'];

                        try {
                            const jsonData = JSON.parse(content);
                            resolve(jsonData);
                        } catch (e) {
                            reject('Error parsing JSON:', e);
                        }
                    }).fail(function (error) {
                        reject('API request failed:', error);
                    });
                });
            },

            collectNamedArgs: function (element) {
                //return element?.dataset ? { ...element.dataset } : {};
                var dataMap = {};
                if (!element) return dataMap;

                var dataset = element.dataset;
                for (var key in dataset) {
                    if (dataset.hasOwnProperty(key)) {
                        dataMap[key] = dataset[key];
                    }
                }

                return dataMap || {};
            },

            invokeModule: function (module, functionName, unnamedArgs = [], namedArgs = {}) {
                const invocation = generateModuleInvocation(module, functionName, unnamedArgs, namedArgs);
                return triggerModuleInvocation(invocation).then(data => data.parse.text['*']);
            },

            renderWikitext: function (html) {
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
            },
        
            waitForElement: function (selector) {
                return new Promise(resolve => {
                    const existing = document.querySelector(selector);
                    if (existing) return resolve(existing);

                    const observer = new MutationObserver((_, observerInstance) => {
                        const element = document.querySelector(selector);
                        if (element) {
                            observerInstance.disconnect();
                            resolve(element);
                        }
                    });

                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                });
            }
        };
    })();
    window.ModuleInject = ModuleInject;
})();