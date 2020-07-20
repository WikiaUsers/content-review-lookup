/**
 * LW editor tools - templates
 *
 * See also: [[MediaWiki:EditorTools-templates-lw.js]]
 * <nowiki>
 */

/*jslint browser, long */
/*global jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    // make global
    window.lw = window.lw || {};

    // 'hasKey' regexp from https://github.com/spencermountain/wtf_wikipedia/blob/858251b/src/templates/_parsers/02-keyMaker.js#L3
    var hasKey = /^[a-z0-9\u00C0-\u00FF\._\- ]+=/i;
    var openLink = /\[\[[^\]]+$/;
    var openTemplate = /\{\{[^}]+$/;

    function alphabeticalSort(a, b) {
        return a.localeCompare(b, "en");
    }

    function padEndWithSpace(string, length) {
        while (string.length < length) {
            string += " ";
        }
        return string;
    }

    // template item splitter
    // source: https://github.com/spencermountain/wtf_wikipedia/blob/8d77dcd/src/templates/_parsers/01-pipe-splitter.js
    // license: MIT - https://opensource.org/licenses/MIT
    function pipeSplitter(tmpl) {
        //start with a naiive '|' split
        var arr = tmpl.split("|");
        //we've split by '|', which is pretty lame
        //look for broken-up links and fix them :/
        arr.forEach(function (a, i) {
            if (a === null) {
                return;
            }
            //has '[[' but no ']]'
            if (openLink.test(a) || openTemplate.test(a)) {
                arr[i + 1] = arr[i] + "|" + arr[i + 1];
                arr[i] = null;
            }
        });
        //cleanup any mistakes we've made
        arr = arr.filter(function (a) {
            return a !== null;
        });
        arr = arr.map(function (a) {
            return a.trim();
        });
        //remove empty fields, only at the end:
        var i;
        for (i = arr.length - 1; i >= 0; i -= 1) {
            if (arr[i] !== "") {
                break;
            }
            arr.pop();
        }
        return arr;
    }

    // note this will only match templates with parameters
    lw.templateMatch = function (name) {
        return new RegExp("\\{{2}(" + $.escapeRE(name) + ")\\s*\\|(?:\\{{2,}[^}]*\\}{2,}|[^}])*\\}{2}", "g");
    };

    lw.sortParameters = function (defaults, params, templateName, processor) {
        var sortInfo = lw.sortableParameters && lw.sortableParameters[templateName];

        if (!sortInfo) {
            return;
        }

        var counter = 1;
        var items = [];
        var itemData = {};
        var names = [];
        var sorter = alphabeticalSort;

        // collect values of all params with prefix
        Object.keys(params).forEach(function (name) {
            if (name.indexOf(sortInfo.prefix) !== 0) {
                return;
            }

            var value = params[name];
            itemData[value] = {};

            if (items.indexOf(value) === -1) {
                items.push(value);
            }
            delete params[name];

            sortInfo.dataPrefixes.forEach(function (dataPrefix) {
                var dataName = dataPrefix + name.slice(sortInfo.prefix.length);

                itemData[value][dataPrefix] = params[dataName];
                delete params[dataName];
            });
        });

        // try to preserve values of any parameter duplicates
        params.__duplicates.forEach(function (paramPair) {
            var name = paramPair[0];
            var value = paramPair[1];

            if (
                name.indexOf(sortInfo.prefix) === 0
                && items.indexOf(value) === -1
            ) {
                items.push(value);
            }
        });

        // run provided processor for changing items
        if (typeof processor === "function") {
            items = processor(items, itemData);
        }

        // use custom sorter if defined
        if (typeof sortInfo.sorter === "function") {
            sorter = sortInfo.sorter.bind(null, itemData);
        }

        // sort collected items with custom sorter or alphabetically
        items.sort(sorter);

        // add sorted items back to params
        items.forEach(function (value) {
            var name = sortInfo.prefix + String(counter);

            params[name] = value;
            names.push(name);

            sortInfo.dataPrefixes.forEach(function (dataPrefix) {
                var dataName = dataPrefix + String(counter);
                var dataValue = itemData[value] && itemData[value][dataPrefix];

                if (dataValue) {
                    params[dataName] = dataValue;
                    names.push(dataName);
                }
            });

            counter += 1;
        });

        // if no defaults are set, add ordered prefixed items as defaults
        if (defaults.length === 0) {
            defaults.push.apply(defaults, names);
        }
    };

    lw.parseTemplate = function (text) {
        // remove template name and opening/closing braces
        text = text.trim()
            .replace(/^\{\{[^|]+\|/, "")
            .replace(/\}\}$/, "");

        var anonymousCounter = 1;
        var params = Object.create(null);
        var splitItems = pipeSplitter(text);

        // special value to store duplicate-named template parameters
        params.__duplicates = [];

        splitItems.forEach(function (item) {
            var parts = item.split("=");
            var param;

            if (hasKey.test(item)) {
                param = parts.shift().trim();
            } else {
                // handle anonymous parameters (add pipe for identification in lw.tidyTemplate)
                param = "|" + String(anonymousCounter);
                anonymousCounter += 1;
            }

            var value = parts.join("=").trim();

            // if a parameter has been seen already, save its old value as duplicate
            if (params[param] !== undefined) {
                params.__duplicates.push([
                    param,
                    params[param]
                ]);
            }

            params[param] = value;
        });

        return params;
    };

    lw.tidyTemplate = function (text, name, processor) {
        var params = lw.parseTemplate(text);
        var defaults = (lw.defaultParameters && lw.defaultParameters[name])
            ? lw.defaultParameters[name].slice()
            : [];

        // run provided processor for changing parameters and defaults
        if (typeof processor === "function") {
            processor(defaults, params, name);
        }

        // fire hook for changing parameters (useful in user scripts)
        mw.hook("lw.tidyTemplate").fire(name, params);

        // delete the special duplicates value
        // it's only needed for use in processors above
        delete params.__duplicates;

        // return early if there are no parameters to tidy
        if (!Object.keys(params).length && !defaults.length) {
            return text;
        }

        // function to check if a particular parameter exists
        var hasParam = Object.prototype.hasOwnProperty.bind(params);

        // find the longest parameter name, for alignment
        var maxLength = 0;
        var findMax = function (item) {
            // skip optional parameters (starting with ?)
            if (item.indexOf("?") === 0) {
                return;
            }
            maxLength = Math.max(maxLength, item.length);
        };
        defaults.forEach(findMax);
        Object.keys(params).forEach(findMax);

        // construct the new template
        var newTemplate = "{{" + name + "\n";
        var addToTemplate = function (item) {
            // skip optional parameters (starting with ?) that are unused
            if (item.indexOf("?") === 0) {
                item = item.slice(1);
                if (!hasParam(item)) {
                    return;
                }
            }

            var param = padEndWithSpace(item, maxLength) + " =";
            var value = hasParam(item)
                ? params[item]
                : "";

            // drop param name from anonymous parameters (starting with |)
            if (param.indexOf("|") === 0) {
                param = "";
            }

            if (lw.spaceBeforeParam) {
                param = " " + param;
            }

            // multi-line values/lists begin on a new line; single-line values have a space before
            if (value.indexOf("\n") !== -1 || value.indexOf("*") === 0 || value.indexOf("#") === 0) {
                param += "\n";
            } else if (param) {
                param += " ";
            }

            newTemplate += "|" + param + value + "\n";
            delete params[item];
        };
        defaults.forEach(addToTemplate);
        Object.keys(params).forEach(addToTemplate);
        newTemplate += "}}";

        return newTemplate;
    };
}(jQuery, mediaWiki));