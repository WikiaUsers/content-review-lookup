/**
 * Seashell Content Manager 2.0.3
 * Complete script for MediaWiki:Common.js
 * 
 * Manages custom UI components, data browsers, tag registries, and connection maps on the Seashell Wiki.
 */
(function () {
    "use strict";

    // Track initialization state and configuration for version 2.0.3
    var state = window.SeashellCardsV2 || {
        status: "waiting",
        version: "2.0.3",
        attempts: 0
    };
    window.SeashellCardsV2 = state;
    window.SeashellSubmissionStatus = "waiting";

    // Define configuration metadata for each supported card and content type
    var TYPES = {
        medal: {
            title: "Medal",
            directory: "Medals",
            template: "Medal",
            rarity: true,
            obtained: "Medal Roll"
        },
        trait: {
            title: "Trait",
            directory: "Traits",
            template: "Trait",
            obtained: ""
        },
        skill: {
            title: "Skill",
            directory: "Skills",
            template: "Skill",
            obtained: "Staff"
        },
        item: {
            title: "Item",
            directory: "Items",
            template: "Item"
        },
        location: {
            title: "Location",
            directory: "Locations",
            template: "Location"
        },
        character: {
            title: "Character",
            directory: "Characters",
            template: "Character"
        }
    };

    var CARD_TYPES = ["medal", "trait", "skill"];
    var RARITIES = ["Mythic", "Legendary", "Epic", "Uncommon", "Common"];
    var ATTRIBUTES = [
        "Strength",
        "Fortitude",
        "Agility",
        "Dexterity",
        "Precision"
    ];
    var TAG_PAGE = "Seashell Wiki:Content Tags";
    
    // Default fallback tags used if the wiki tag registry page is missing
    var DEFAULT_TAGS = {
        medal: [
            "Health",
            "Visual",
            "Notification",
            "Speed",
            "Damage",
            "Gun",
            "LMG",
            "Melee",
            "Swimming",
            "Skydiving"
        ],
        trait: ["Lore Trait", "Awakened"],
        skill: []
    };

    var api = null;
    var userIsAdmin = false;
    var registry = clone(DEFAULT_TAGS);
    var bootBusy = false;
    var bootAgain = false;
    var bootTimer;
    var modulesReady;
    var contentHookAdded = false;

    /**
     * String and data sanitization helpers
     */
    function trim(value) {
        return String(value == null ? "" : value).trim();
    }

    function key(value) {
        return trim(value)
            .replace(/_/g, " ")
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function esc(value) {
        return String(value == null ? "" : value).replace(
            /[&<>"']/g,
            function (c) {
                return {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[c];
            }
        );
    }

    function reEsc(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function unique(values) {
        return Array.from(
            new Map(
                values.map(function (v) {
                    return [key(v), trim(v)];
                })
            ).values()
        ).filter(Boolean);
    }

    function splitTags(value) {
        return unique(trim(value).split(/[,\n]/).map(trim));
    }

    function plain(value) {
        return trim(value)
            .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2")
            .replace(/\[\[([^\]]+)\]\]/g, "$1")
            .replace(/'{2,5}/g, "")
            .replace(/<[^>]+>/g, "")
            .replace(/\{\{!\}\}/g, "|");
    }

    function cardType(type) {
        return CARD_TYPES.includes(type);
    }

    /**
     * Metadata tracking helpers embedded inside wiki comments
     */
    function metaLine(data) {
        return (
            "<!-- SS_META " +
            encodeURIComponent(JSON.stringify(data)) +
            " -->"
        );
    }

    function meta(text) {
        var found = String(text).match(/<!-- SS_META ([^\s]+) -->/);
        if (!found) return {};
        try {
            var parsed = JSON.parse(decodeURIComponent(found[1]));
            if (
                !parsed ||
                typeof parsed !== "object" ||
                Array.isArray(parsed)
            )
                return {};
            if (parsed.tags !== undefined)
                parsed.tags = splitTags(
                    Array.isArray(parsed.tags)
                        ? parsed.tags.join(",")
                        : parsed.tags
                );
            if (parsed.rules !== undefined && !rulesValid(parsed.rules))
                parsed.rules = [];
            return parsed;
        } catch (error) {
            return {};
        }
    }

    function replaceMeta(text, data) {
        var line = metaLine(data);
        return /<!-- SS_META [^\s]+ -->/.test(text)
            ? text.replace(/<!-- SS_META [^\s]+ -->/, function () {
                  return line;
              })
            : text.trimEnd() + "\n" + line + "\n";
    }

    /**
     * Splits wiki text by a separator while correctly ignoring nested templates and links.
     */
    function splitWiki(text, separator) {
        var result = [];
        var start = 0;
        var braces = 0;
        var links = 0;
        for (var i = 0; i < text.length; i += 1) {
            var pair = text.slice(i, i + 2);
            if (pair === "{{") {
                braces += 1;
                i += 1;
            } else if (pair === "}}") {
                braces = Math.max(0, braces - 1);
                i += 1;
            } else if (pair === "[[") {
                links += 1;
                i += 1;
            } else if (pair === "]]") {
                links = Math.max(0, links - 1);
                i += 1;
            } else if (!braces && !links && text[i] === separator) {
                result.push(text.slice(start, i));
                start = i + 1;
            }
        }
        result.push(text.slice(start));
        return result;
    }

    /**
     * Parses a wiki template block and extracts its field key-value pairs.
     */
    function template(text, name) {
        var match = new RegExp(
            "\\{\\{\\s*(?:Template:)?" + reEsc(name) + "\\s*(?=[|}\\n])",
            "i"
        ).exec(text);
        if (!match)
            return {
                found: false,
                start: 0,
                end: 0,
                fields: {}
            };
        var depth = 1;
        var end = match.index + match[0].length;
        for (; end < text.length; end += 1) {
            if (text.slice(end, end + 2) === "{{") {
                depth += 1;
                end += 1;
            } else if (text.slice(end, end + 2) === "}}") {
                depth -= 1;
                end += 1;
                if (!depth) {
                    end += 1;
                    break;
                }
            }
        }
        if (depth)
            throw new Error(
                "The article template has unbalanced braces. Fix its source before using the manager."
            );
        var fields = {};
        splitWiki(text.slice(match.index + 2, end - 2), "|")
            .slice(1)
            .forEach(function (part) {
                var equals = part.indexOf("=");
                if (equals >= 0)
                    fields[trim(part.slice(0, equals)).toLowerCase()] =
                        trim(part.slice(equals + 1)).replace(
                            /\{\{!\}\}/g,
                            "|"
                        );
            });
        return {
            found: true,
            start: match.index,
            end: end,
            fields: fields
        };
    }

    function encodeValue(value) {
        return splitWiki(trim(value), "|").join("{{!}}");
    }

    function templateText(name, fields) {
        return (
            "{{" +
            name +
            "\n" +
            Object.entries(fields)
                .map(function (_ref) {
                    var field = _ref[0],
                        value = _ref[1];
                    return "|" + field + " = " + encodeValue(value);
                })
                .join("\n") +
            "\n}}"
        );
    }

    function sectionsOf(text) {
        var headers = Array.from(
            text.matchAll(/^==[ \t]*([^=\n]+?)[ \t]*==[ \t]*$/gm)
        );
        return headers.map(function (h, i) {
            return {
                title: trim(h[1]),
                content: trim(
                    text.slice(
                        h.index + h[0].length,
                        i + 1 < headers.length
                            ? headers[i + 1].index
                            : text.length
                    )
                )
            };
        });
    }

    function cleanTail(text) {
        return text
            .replace(/<!-- SS_META [^\s]+ -->/g, "")
            .replace(/\[\[Category:[^\]]+\]\]/gi, "")
            .replace(/__(?:NOTOC|NOEDITSECTION)__/gi, "")
            .trim();
    }

    function titleValid(title) {
        return (
            !!trim(title) &&
            title.length <= 180 &&
            !/[#<>\[\]{}|:\n\r]/.test(title)
        );
    }

    function rulesValid(rules) {
        return (
            Array.isArray(rules) &&
            rules.every(function (group) {
                return (
                    Array.isArray(group) &&
                    group.length &&
                    group.every(function (r) {
                        return (
                            [
                                "medal",
                                "trait",
                                "skill",
                                "attribute",
                                "other"
                            ].includes(r.kind) &&
                            trim(r.name) &&
                            (r.kind !== "attribute" ||
                                (ATTRIBUTES.includes(r.name) &&
                                    Number.isInteger(Number(r.min)) &&
                                    Number(r.min) >= 1 &&
                                    Number(r.min) <= 5))
                        );
                    })
                );
            })
        );
    }

    function requirementNames(entry) {
        var names = [];
        (entry.rules || []).forEach(function (group) {
            return group.forEach(function (r) {
                if (["medal", "trait", "skill"].includes(r.kind))
                    names.push(r.name);
            });
        });
        var matches = String(entry.requirements || "").matchAll(
            /\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g
        );
        for (var _iterator = matches, _step; (_step = _iterator.next()).done === false;) {
            var match = _step.value;
            names.push(match[1]);
        }
        return unique(names);
    }

    function eligibility(entry, profile) {
        if (!entry.requirementsConfirmed) return "unknown";
        var owned = (profile.owned || []).map(key);
        var ruleResult = function (rule) {
            if (["medal", "trait", "skill"].includes(rule.kind))
                return owned.includes(key(rule.name)) ? "met" : "unmet";
            if (rule.kind === "attribute")
                return Number(profile.attributes[rule.name] || 1) >=
                    Number(rule.min)
                    ? "met"
                    : "unmet";
            return "unknown";
        };
        var groups = (entry.rules || []).map(function (group) {
            var results = group.map(ruleResult);
            return results.includes("met")
                ? "met"
                : results.includes("unknown")
                  ? "unknown"
                  : "unmet";
        });
        return groups.includes("unmet")
            ? "unmet"
            : groups.includes("unknown")
              ? "unknown"
              : "met";
    }

    function publicCharacterTitle(input) {
        var title = trim(input);
        if (/^https?:\/\//i.test(title)) {
            var url = new URL(title);
            if (url.origin !== location.origin)
                throw new Error("Use a public character page on this wiki.");
            if (url.pathname.startsWith("/wiki/"))
                title = decodeURIComponent(url.pathname.slice(6));
            else title = url.searchParams.get("title") || "";
        }
        title = title
            .replace(/_/g, " ")
            .replace(/^\[\[([^|\]]+)(?:\|[^\]]+)?\]\]$/, "$1");
        if (
            !title ||
            title.length > 255 ||
            /[#<>\[\]{}|\n\r]/.test(title) ||
            /^(?:Special|Media|File|Category|Template|MediaWiki):/i.test(title)
        )
            throw new Error(
                "Enter a character page name or its public wiki link."
            );
        return title;
    }

    function characterProfile(text) {
        var fields = template(text, "Character").fields;
        var sections = sectionsOf(text);
        var names = [];
        
        function listedNames(value) {
            var links = Array.from(
                String(value).matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)
            ).map(function (match) {
                return trim(match[1]);
            });
            var simple = String(value)
                .split("\n")
                .filter(function (line) {
                    return !line.includes("[[");
                })
                .flatMap(function (line) {
                    return line.split(",");
                })
                .map(function (line) {
                    return trim(
                        line
                            .replace(/^[*#;:\s]+/, "")
                            .replace(/'{2,5}/g, "")
                    );
                })
                .filter(function (line) {
                    return (
                        line &&
                        !/[{}<>|=\[\]]/.test(line) &&
                        !/^(?:none|unknown|not added|n\/a)$/i.test(line)
                    );
                });
            return []
                .concat(links, simple)
                .filter(function (name) {
                    return !/^(?:File|Category|Template):/i.test(name);
                });
        }

        var listsFound = false;
        ["medals", "traits", "skills"].forEach(function (kind) {
            if (fields[kind] !== undefined) {
                listsFound = true;
                names.push.apply(names, listedNames(fields[kind]));
            }
            sections
                .filter(function (section) {
                    return (
                        key(section.title) === kind ||
                        key(section.title) === "owned " + kind
                    );
                })
                .forEach(function (section) {
                    listsFound = true;
                    names.push.apply(names, listedNames(cleanTail(section.content)));
                });
        });

        var attributes = {};
        ATTRIBUTES.forEach(function (name) {
            var value = trim(fields[name.toLowerCase()]);
            if (/^[1-5]$/.test(value)) attributes[name] = Number(value);
        });

        if (!listsFound && !Object.keys(attributes).length)
            throw new Error(
                "This page has no documented Medals, Traits, Skills, or attributes to load."
            );

        return {
            owned: unique(names),
            attributes: attributes,
            listsFound: listsFound
        };
    }

    function directoryRecords(source, type) {
        var records = [];
        var lines = source.split("\n");
        var rarity = "";
        var row = [];
        
        function flush() {
            if (!row.length) return;
            var text = row.join("\n");
            row = [];
            var name = text.match(
                /^\|[ \t]*'''\[\[([^|\]]+)(?:\|[^\]]+)?\]\]'''[ \t]*$/m
            );
            if (!name) return;
            var cells = [];
            var current = null;
            
            for (var _iterator2 = text.split("\n"), _step2; (_step2 = _iterator2.next()).done === false;) {
                var line = _step2.value;
                if (/^<!--.*-->[ \t]*$/.test(line)) continue;
                if (/^\|[^-}]/.test(line) || line === "|") {
                    if (current !== null) cells.push(trim(current));
                    current = line.slice(1).trimStart();
                } else if (current !== null) current += "\n" + line;
            }
            if (current !== null) cells.push(trim(current));
            
            var data = meta(text);
            records.push(
                Object.assign({}, data, {
                    name: trim(name[1]),
                    type: type,
                    rarity: type === "medal" ? rarity : "",
                    requirements:
                        type === "medal"
                            ? cells[1] || ""
                            : data.requirements || "",
                    description: cells[type === "medal" ? 2 : 1] || "",
                    obtained:
                        type !== "medal"
                            ? cells[2] || ""
                            : data.obtained || "",
                    tags: splitTags(
                        Array.isArray(data.tags)
                            ? data.tags.join(",")
                            : data.tags || ""
                    ),
                    rules: rulesValid(data.rules) ? data.rules : [],
                    requirementsConfirmed: data.requirementsConfirmed === true
                })
            );
        }

        for (var _iterator3 = lines, _step3; (_step3 = _iterator3.next()).done === false;) {
            var line = _step3.value;
            var heading = line.match(
                /class="ss-box-title"[^>]*>(Mythic|Legendary|Epic|Uncommon|Common) Medals</
            );
            if (heading) {
                flush();
                rarity = heading[1];
            }
            if (/^\|-\s*$/.test(line)) {
                flush();
                row = [];
            } else if (
                /^\|}\s*$/.test(line) ||
                /^<!-- .*_END -->\s*$/.test(line)
            )
                flush();
            else row.push(line);
        }
        flush();
        return records;
    }

    function removeDirectoryRow(text, name) {
        var lines = text.split("\n");
        var match = new RegExp(
            "^\\|[ \\t]*'''\\[\\[" +
                reEsc(name) +
                "(?:\\|[^\\]]+)?\\]\\]'''[ \\t]*$",
            "i"
        );
        for (;;) {
            var index = lines.findIndex(function (line) {
                return match.test(line);
            });
            if (index < 0) break;
            var start = index;
            while (start >= 0 && !/^\|-\s*$/.test(lines[start])) start -= 1;
            if (start < 0)
                throw new Error(
                    "The directory row has no row separator. Fix the table source first."
                );
            var end = index + 1;
            while (
                end < lines.length &&
                !/^\|-\s*$|^\|}\s*$|^<!-- .*_END -->\s*$/.test(lines[end])
            )
                end += 1;
            lines.splice(start, end - start);
        }
        return lines.join("\n");
    }

    function marker(data) {
        if (data.type === "medal")
            return "<!-- MEDAL_ROWS_" + data.rarity.toUpperCase() + "_END -->";
        if (data.type === "trait" || data.type === "skill")
            return "<!-- " + data.type.toUpperCase() + "_ROWS_END -->";
        if (data.type === "item")
            return (
                "<!-- ITEM_ROWS_" +
                (data.itemCategory === "Weapon"
                    ? "WEAPON_" + data.weaponType.toUpperCase()
                    : data.itemCategory.toUpperCase().replace(/\s+/g, "_")) +
                "_END -->"
            );
        if (data.type === "location")
            return (
                "<!-- LOCATION_ROWS_" +
                data.locationType.toUpperCase().replace(/\s+/g, "_") +
                "_END -->"
            );
        return "<!-- CHARACTER_ROWS_END -->";
    }

    function rowText(data) {
        var cells = ["'''[[" + data.name + "]]'''"];
        if (data.type === "medal") cells.push(data.requirements || "");
        if (data.type === "location" && data.locationType !== "Country") {
            var parent = data.parent || data.region || data.country;
            cells.push(parent ? "[[" + parent + "]]" : "");
        }
        cells.push(data.description || "");
        if (data.type === "trait" || data.type === "skill")
            cells.push(data.obtained || "");
        return (
            "|-\n" +
            cells
                .map(function (cell) {
                    return (
                        "| " +
                        cell.replace(/^([|!])/gm, "<nowiki>$1</nowiki>")
                    );
                })
                .join("\n") +
            "\n" +
            (cardType(data.type) ? metaLine(entryMetadata(data)) + "\n" : "")
        );
    }

    function entryMetadata(data) {
        return {
            tags: data.tags || [],
            image: data.image || "",
            requirements: data.requirements || "",
            rules: data.rules || [],
            requirementsConfirmed: data.requirementsConfirmed === true
        };
    }

    function updateDirectory(source, data) {
        var mark = marker(data);
        if (!source.includes(mark))
            throw new Error(
                "The directory needs this insertion marker: " +
                    mark +
                    ". No directory changes were made."
            );
        var clean = removeDirectoryRow(source, data.name);
        return clean.replace(mark, function () {
            return rowText(data) + mark;
        });
    }

    function youtubeId(value) {
        try {
            var url = new URL(value);
            if (["youtu.be", "www.youtu.be"].includes(url.hostname))
                return /^[\w-]{11}$/.test(url.pathname.slice(1))
                    ? url.pathname.slice(1)
                    : "";
            if (
                ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(
                    url.hostname
                )
            ) {
                var match = url.pathname.match(
                    /^\/(?:shorts|embed)\/([\w-]{11})/
                );
                var id = url.searchParams.get("v") || (match ? match[1] : "");
                return /^[\w-]{11}$/.test(id || "") ? id : "";
            }
        } catch (error) {
            /* A filename is also allowed. */
        }
        return "";
    }

    function demoText(source, caption) {
        if (!trim(source)) return "";
        var id = youtubeId(source);
        if (id)
            return (
                "{{#ev:youtube|" +
                id +
                "|640|center|" +
                encodeValue(caption || "Demonstration.") +
                "}}"
            );
        if (/^https?:\/\//i.test(source))
            return "[" + source + " View demonstration]";
        return (
            "[[File:" +
            source.replace(/^File:/i, "") +
            "|640px|center|" +
            encodeValue(caption || "Demonstration.") +
            "]]"
        );
    }

    function parseDemo(source) {
        var youtube = source.match(
            /\{\{#ev:youtube\|([\w-]{11})\|[^|}]*\|center\|([\s\S]*?)\}\}/i
        );
        if (youtube)
            return {
                demo: "https://www.youtube.com/watch?v=" + youtube[1],
                demoCaption: youtube[2].replace(/\{\{!\}\}/g, "|")
            };
        var file = source.match(/\[\[File:([^|\]]+)\|([^\]]*)\]\]/i);
        if (file)
            return {
                demo: file[1],
                demoCaption: file[2]
                    .split("|")
                    .filter(function (part) {
                        return !/^(?:\d+px|center|thumb|frame)$/.test(part);
                    })
                    .join("|")
            };
        var link = source.match(/\[(https?:\/\/[^\s\]]+)\s[^\]]*\]/i);
        return {
            demo: link ? link[1] : "",
            demoCaption: ""
        };
    }

    /**
     * Executes MediaWiki API requests with CSRF token handling for writes.
     */
    function request(params, write) {
        return new Promise(function (resolve, reject) {
            var call = write
                ? api.postWithToken("csrf", Object.assign({}, params, { formatversion: 2 }))
                : api.get(Object.assign({}, params, { formatversion: 2 }), { timeout: 20000 });

            call.then(
                function (result) {
                    if (!result || typeof result !== "object") {
                        reject(new Error("The wiki returned an empty response. Refresh and try again."));
                        return;
                    }
                    if (
                        result.error ||
                        (params.action === "edit" &&
                            result.edit &&
                            result.edit.result !== "Success")
                    )
                        reject(
                            new Error(
                                (result.error && result.error.info) ||
                                    (result.edit && result.edit.info) ||
                                    "The wiki did not accept this edit."
                            )
                        );
                    else resolve(result);
                },
                function (code, details) {
                    return reject(
                        new Error(
                            (details && details.error && details.error.info) ||
                                (details && details.info) ||
                                String(code || "The request failed.")
                        )
                    );
                }
            );
        });
    }

    function pageFrom(page, timestamp) {
        var rev = page.revisions ? page.revisions[0] : null;
        var slot = rev && rev.slots ? rev.slots.main : null;
        var text =
            (slot && slot.content) ||
            (slot && slot["*"]) ||
            (rev && rev.content) ||
            (rev && rev["*"]) ||
            "";
        
        return {
            title: page.title,
            missing: Object.hasOwn
                ? Object.hasOwn(page, "missing")
                : Object.prototype.hasOwnProperty.call(page, "missing"),
            text: text,
            id: page.lastrevid || (rev ? rev.revid : 0),
            timestamp: rev ? rev.timestamp : undefined,
            start: timestamp
        };
    }

    /**
     * DOM node creation helper.
     */
    function node(tag, attrs) {
        var element = document.createElement(tag);
        Object.entries(attrs || {}).forEach(function (_ref) {
            var name = _ref[0],
                value = _ref[1];
            if (name === "class") element.className = value;
            else if (name === "text") element.textContent = value;
            else if (name.startsWith("on"))
                element.addEventListener(name.slice(2), value);
            else if (value !== false && value != null)
                element.setAttribute(name, value === true ? "" : value);
        });

        for (
            var _len = arguments.length,
                children = new Array(_len > 2 ? _len - 2 : 0),
                _key = 2;
            _key < _len;
            _key++
        ) {
            children[_key - 2] = arguments[_key];
        }
        children.forEach(function (child) {
            if (child != null) element.append(child);
        });
        return element;
    }

    var link = function (title, label) {
        return node("a", {
            href: mw.util.getUrl(title),
            text: label || title
        });
    };

    var button = function (label, callback) {
        return node("button", {
            type: "button",
            text: label,
            onclick: callback
        });
    };

    function select(options, value) {
        var control = node("select", {});
        options.forEach(function (option) {
            var pair = Array.isArray(option) ? option : [option, option];
            control.append(
                node("option", {
                    value: pair[0],
                    text: pair[1]
                })
            );
        });
        if (
            Array.from(control.options).some(function (o) {
                return o.value === String(value || "");
            })
        )
            control.value = value || "";
        return control;
    }

    function field(label, control) {
        return node(
            "label",
            {
                class: "ss-field"
            },
            node("span", {
                text: label
            }),
            control
        );
    }

    // Component CSS Stylesheet injected into the document head
    var styles = `
        .ss-tools{color:#e8e8e8;line-height:1.5}.ss-tools *{box-sizing:border-box}.ss-tools [hidden]{display:none!important}
        .ss-tools button,.ss-tools select,.ss-tools input,.ss-tools textarea,.ss-tools .ss-upload{font:inherit;color:#f4f4f4;background:#191c23;border:1px solid #a84949;border-radius:4px;padding:9px 11px;max-width:100%}
        .ss-tools button,.ss-tools select,.ss-tools .ss-upload{cursor:pointer}.ss-tools button:hover{background:#292b33}.ss-tools button:disabled{opacity:.5;cursor:wait}
        .ss-tools input:not([type=checkbox]),.ss-tools textarea,.ss-tools select{width:100%}.ss-tools textarea{min-height:95px;resize:vertical}.ss-tools input[type=checkbox]{width:auto}
        .ss-tools button:focus-visible,.ss-tools input:focus-visible,.ss-tools select:focus-visible,.ss-tools textarea:focus-visible{outline:2px solid #ff7d7d;outline-offset:2px}
        .ss-tools .ss-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.ss-tools .ss-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.ss-tools .ss-wide{grid-column:1/-1}
        .ss-tools .ss-field{display:flex;flex-direction:column;gap:5px;min-width:0;font-weight:600}.ss-tools .ss-field input,.ss-tools .ss-field textarea{font-weight:400}.ss-tools .ss-help{color:#a9abb3;font-size:13px}
        .ss-tools .ss-toolbar{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;padding:16px 0;border-bottom:1px solid #663838}.ss-tools .ss-tags{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
        .ss-tools .ss-tag{padding:4px 8px;background:#242630;border:1px solid #5e4242;border-radius:4px;font-size:13px}.ss-tools .ss-active{background:#a84949!important;color:#fff}
        .ss-tools .ss-results{display:grid;gap:0}.ss-tools .ss-result{padding:15px 0;border-bottom:1px solid #38313a;min-width:0;overflow-wrap:anywhere}.ss-tools .ss-result h3{margin:0 0 5px;font-size:19px}.ss-tools .ss-result p{margin:6px 0}
        .ss-tools .ss-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:12px}.ss-tools .ss-cards .ss-result{border:1px solid #663838;border-radius:6px;padding:12px;background:#111319}
        .ss-tools .ss-art{width:100%;height:220px;object-fit:contain;background:#090b0f}.ss-tools .ss-art-empty{height:90px;display:grid;place-items:center;color:#a9abb3;background:#090b0f}
        .ss-tools .ss-rarity{font-size:13px;font-weight:bold}.ss-tools .ss-rarity[data-rarity=Mythic],.ss-tools .ss-rarity[data-rarity=Legendary]{color:#ff7d7d}.ss-tools .ss-rarity[data-rarity=Epic]{color:#bb8bf2}.ss-tools .ss-rarity[data-rarity=Uncommon]{color:#72c888}.ss-tools .ss-rarity[data-rarity=Common]{color:#bfc2ca}
        .ss-tools .ss-pager{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-top:18px}.ss-tools .ss-status{padding:12px;border-left:4px solid #a84949;background:#191c23;margin:12px 0;overflow-wrap:anywhere}.ss-tools .ss-error{color:#ff9a9a}.ss-tools .ss-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.ss-tools .ss-tabs button{flex:1}
        .ss-tools .ss-editor-section{padding:16px 0;border-top:1px solid #663838}.ss-tools .ss-section-row{display:grid;grid-template-columns:1fr 2fr auto;gap:10px;margin:12px 0}.ss-tools details{margin:12px 0}.ss-tools summary{cursor:pointer;font-weight:bold}
        .ss-tools .ss-group{border:1px solid #663838;padding:12px;border-radius:4px;margin:10px 0}.ss-tools .ss-rule{display:grid;grid-template-columns:130px 1fr 80px auto;gap:8px;margin:8px 0}.ss-tools .ss-rule input[type=number]{min-width:60px}
        .ss-tools .ss-checkbox{display:flex;align-items:center;gap:8px}.ss-tools .ss-profile{padding:12px 0;border-bottom:1px solid #663838}.ss-tools .ss-attributes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.ss-tools pre{white-space:pre-wrap;max-height:450px;overflow:auto;background:#111319;padding:12px;color:#e8e8e8}
        .ss-entry-connections{clear:both;padding-top:16px}.ss-entry-connections:empty{display:none}.ss-entry-connections h3{font-size:18px}
        @media(max-width:760px){.ss-tools .ss-toolbar,.ss-tools .ss-grid,.ss-tools .ss-section-row{grid-template-columns:1fr}.ss-tools .ss-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.ss-tools .ss-rule{grid-template-columns:1fr 1fr}.ss-tools .ss-attributes{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:440px){.ss-tools .ss-cards{grid-template-columns:1fr}}
    `;

    function queueBoot() {
        window.clearTimeout(bootTimer);
        bootTimer = window.setTimeout(boot, 100);
    }
    state.refresh = queueBoot;

    /**
     * Main bootstrapper function to check MediaWiki environment and mount widgets.
     */
    var boot = function () {
        try {
            if (window.SeashellCardsV2 !== state) return Promise.resolve();
            if (bootBusy) {
                bootAgain = true;
                return Promise.resolve();
            }

            var mwLoader = window.mw && window.mw.loader;
            if (!mwLoader || !mw.config || !document.body) {
                state.attempts += 1;
                if (state.attempts < 150) queueBoot();
                else {
                    state.status = "startup failed";
                    window.SeashellSubmissionStatus = "startup failed";
                    var root = document.getElementById("seashell-submission-root");
                    if (root)
                        root.textContent =
                            "Fandom's JavaScript loader was not available. Refresh the page to try again.";
                }
                return Promise.resolve();
            }

            if (!contentHookAdded && typeof mw.hook === "function") {
                contentHookAdded = true;
                mw.hook("wikipage.content").add(queueBoot);
            }

            if (
                !document.querySelector(
                    "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                )
            ) {
                state.status = "waiting for content";
                return Promise.resolve();
            }

            bootBusy = true;
            state.status = "loading";
            window.SeashellSubmissionStatus = "loading";

            return Promise.resolve(
                (function () {
                    if (!modulesReady)
                        modulesReady = new Promise(function (resolve, reject) {
                            var timer = window.setTimeout(function () {
                                reject(
                                    new Error(
                                        "Fandom's required JavaScript modules did not finish loading. Refresh the page and try again."
                                    )
                                );
                            }, 20000);

                            mw.loader
                                .using(["mediawiki.api", "mediawiki.util"])
                                .then(
                                    function () {
                                        window.clearTimeout(timer);
                                        resolve();
                                    },
                                    function (error) {
                                        window.clearTimeout(timer);
                                        reject(error);
                                    }
                                );
                        });

                    return modulesReady.then(function () {
                        if (!api) api = new mw.Api();

                        userIsAdmin = (
                            mw.config.get("wgUserGroups") || []
                        ).some(function (g) {
                            return ["sysop", "bureaucrat", "staff"].includes(g);
                        });

                        if (!document.getElementById("seashell-cards-styles"))
                            document.head.append(
                                node("style", {
                                    id: "seashell-cards-styles",
                                    text: styles
                                })
                            );

                        var managerRoot = document.getElementById(
                            "seashell-submission-root"
                        );
                        var managerPromise = managerRoot
                            ? Promise.resolve(manager(managerRoot)).then(function () {})
                            : Promise.resolve();

                        return managerPromise.then(function () {
                            var connectionElements = document.querySelectorAll(
                                ".ss-entry-connections"
                            );
                            var connectionPromises = Array.from(
                                connectionElements
                            ).map(function (rootElem) {
                                return Promise.resolve(connections(rootElem)).then(
                                    function () {}
                                );
                            });

                            return Promise.all(connectionPromises).then(function () {
                                var browserElements = document.querySelectorAll(
                                    ".ss-card-browser[data-kind]"
                                );
                                var browserPromises = Array.from(
                                    browserElements
                                ).map(function (rootElem) {
                                    var kind = rootElem.dataset.kind;
                                    if (cardType(kind))
                                        return Promise.resolve(
                                            browser(rootElem, kind)
                                        ).then(function () {});
                                    return Promise.resolve();
                                });

                                return Promise.all(browserPromises).then(function () {
                                    state.status = "ready";
                                    window.SeashellSubmissionStatus = "loaded";
                                });
                            });
                        });
                    }).catch(function (error) {
                        modulesReady = null;
                        state.status = "error";
                        state.error = String(error.message || error);
                        window.SeashellSubmissionStatus = "error";
                        console.error("Seashell Content Manager", error);
                        var root = document.getElementById(
                            "seashell-submission-root"
                        );
                        if (root) {
                            delete root.dataset.ready;
                            root.textContent =
                                "The Content Manager could not load. " +
                                state.error;
                            root.append(
                                button("Try loading again", queueBoot)
                            );
                        }
                    });
                })()
            ).finally(function () {
                bootBusy = false;
                if (bootAgain) {
                    bootAgain = false;
                    queueBoot();
                }
            });
        } catch (e) {
            bootBusy = false;
            return Promise.reject(e);
        }
    };

    /**
     * Handles displaying medals unlocked by specific page entries.
     */
    var connections = function (root) {
        try {
            if (root.dataset.ready) return Promise.resolve();
            root.dataset.ready = "1";
            root.classList.add("ss-tools", "ss-entry-connections");

            var title =
                root.dataset.title ||
                mw.config.get("wgPageName").replace(/_/g, " ");

            return Promise.resolve(
                readPage("Medals")
                    .then(function (page) {
                        var entries = directoryRecords(page.text, "medal").filter(
                            function (entry) {
                                return requirementNames(entry).some(function (name) {
                                    return key(name) === key(title);
                                });
                            }
                        );

                        if (!entries.length) {
                            root.textContent = "";
                            return;
                        }

                        root.replaceChildren(
                            node("h3", {
                                text: "Medals unlocked by " + title
                            }),
                            node.apply(
                                void 0,
                                ["ul", {}].concat(
                                    entries.map(function (entry) {
                                        return node(
                                            "li",
                                            {},
                                            link(entry.name),
                                            " (" + entry.rarity + ")"
                                        );
                                    })
                                )
                            )
                        );

                        var articleBody = root.closest(".mw-parser-output");
                        if (articleBody) articleBody.append(root);
                    })
                    .catch(function () {
                        root.replaceChildren(
                            link("Medals", "Browse Medal requirements")
                        );
                    })
            );
        } catch (e) {
            return Promise.reject(e);
        }
    };

    /**
     * Content Manager editor interface for creating, editing, and managing wiki entries and tags.
     */
    var manager = function (root) {
        try {
            if (root.dataset.ready) return Promise.resolve();
            root.dataset.ready = "1";
            root.classList.add("ss-tools");

            if (!mw.config.get("wgUserName")) {
                root.replaceChildren(
                    node(
                        "p",
                        {},
                        "Sign in to use the Content Manager. ",
                        link("Special:UserLogin", "Log in")
                    )
                );
                return Promise.resolve();
            }

            var type = "medal";
            var mode = "create";
            var loaded = null;
            var loadedName = "";
            var originalText = "";
            var dirty = false;
            var busy = false;
            var context = 0;
            var controls = {};

            var typeTabs = node("div", { class: "ss-tabs" });
            var modeTabs = node("div", { class: "ss-tabs" });
            var picker = select([["", "Select an entry"]]);
            var find = node("input", {
                type: "search",
                placeholder: "Find an existing page"
            });
            var allNames = [];
            var pickerArea = node(
                "div",
                { class: "ss-grid" },
                field("Find", find),
                field("Existing page", picker)
            );
            var form = node("form", {});
            var fieldsArea = node("div", { class: "ss-grid" });
            var customArea = node("div", {});
            var result = node("div", { "aria-live": "polite" });
            var previewArea = node("details", {});
            var submit = node("button", {
                type: "submit",
                text: "Create Medal"
            });
            var loadButton = button("Load and prefill", loadEntry);
            pickerArea.append(loadButton);
            var removeButton = button("Delete selected page", deleteEntry);
            pickerArea.append(removeButton);

            var addSectionButton = button("Add section", function () {
                addCustom("", "");
                dirty = true;
            });

            var previewButton = button("Preview source", function () {
                try {
                    var data = getData();
                    validate(data);
                    previewArea.replaceChildren(
                        node("summary", { text: "Source preview" }),
                        node("pre", { text: buildArticle(data) }),
                        node("h4", { text: "Directory row" }),
                        node("pre", { text: rowText(data) })
                    );
                    previewArea.open = true;
                } catch (error) {
                    show(error.message, true);
                }
            });

            var upload = node("a", {
                class: "ss-upload",
                href: mw.util.getUrl("Special:Upload"),
                target: "_blank",
                rel: "noopener",
                text: "Upload a file"
            });

            var tagsArea = node("details", {});
            var tagsSummary = node("summary", { text: "Manage tags" });
            tagsArea.append(tagsSummary);

            var customSection = node(
                "section",
                { class: "ss-editor-section" },
                node("h3", { text: "Optional article sections" }),
                node("p", {
                    class: "ss-help",
                    text: "Use Effects, Usage, or a custom section to explain mechanics. Empty sections are omitted."
                }),
                customArea,
                addSectionButton
            );

            form.append(
                fieldsArea,
                customSection,
                node("div", { class: "ss-row" }, submit, previewButton, upload),
                previewArea
            );

            function show(message, error) {
                result.replaceChildren(
                    node("div", {
                        class: "ss-status" + (error ? " ss-error" : ""),
                        text: message
                    })
                );
            }

            function addField(name, label, options) {
                var o = options || {};
                var control = o.options
                    ? select(o.options, o.value)
                    : node(
                          o.textarea ? "textarea" : "input",
                          Object.assign(
                              {
                                  type: o.number ? "number" : "text",
                                  placeholder: o.placeholder || ""
                              },
                              o.number ? { min: "0" } : {}
                          )
                      );
                if (!o.options) control.value = o.value || "";
                control.id = "sscm-" + name;
                controls[name] = control;
                var wrapper = field(label, control);
                if (o.wide) wrapper.classList.add("ss-wide");
                if (o.help)
                    wrapper.append(
                        node("span", { class: "ss-help", text: o.help })
                    );
                fieldsArea.append(wrapper);
                return control;
            }

            function addCustom(title, content) {
                var heading = node("input", {
                    placeholder: "Section name",
                    "aria-label": "Section name"
                });
                heading.value = title || "";
                var body = node("textarea", { "aria-label": "Section content" });
                body.value = content || "";
                var row = node(
                    "div",
                    { class: "ss-section-row" },
                    heading,
                    body,
                    button("Remove", function () {
                        row.remove();
                        dirty = true;
                    })
                );
                row.classList.add("ss-custom-section");
                customArea.append(row);
            }

            function promptDiscard() {
                return !dirty || window.confirm("Discard your unsaved changes?");
            }

            function refreshPicker() {
                var filter = key(find.value);
                var chosen = picker.value;
                picker.replaceChildren.apply(
                    picker,
                    [node("option", { value: "", text: "Select an entry" })].concat(
                        allNames
                            .filter(function (n) {
                                return key(n).includes(filter);
                            })
                            .map(function (n) {
                                return node("option", { value: n, text: n });
                            })
                    )
                );
                picker.value = chosen;
            }

            function rulesUI() {
                var details = node("details", { class: "ss-wide" });
                var groupsArea = node("div", {});
                var confirmed = node("input", { type: "checkbox" });
                controls.requirementsConfirmed = confirmed;

                details.append(
                    node("summary", { text: "Structured unlock requirements" }),
                    node("p", {
                        class: "ss-help",
                        text: "All groups are required. Within each group, any one option is enough."
                    }),
                    node(
                        "label",
                        { class: "ss-checkbox" },
                        confirmed,
                        "I confirmed the complete unlock rules, including when there are no requirements"
                    ),
                    groupsArea
                );
                controls.rulesArea = groupsArea;
                details.append(
                    button("Add required group", function () {
                        addRuleGroup(groupsArea, []);
                        dirty = true;
                    })
                );
                fieldsArea.append(details);
            }

            function addRuleGroup(area, rules) {
                var group = node("div", { class: "ss-group" });
                var rows = node("div", {});
                group.append(
                    node("strong", { text: "Require any option in this group" }),
                    rows,
                    button("Add alternative", function () {
                        addRule(rows, { kind: "trait", name: "" });
                        dirty = true;
                    }),
                    button("Remove group", function () {
                        group.remove();
                        dirty = true;
                    })
                );
                area.append(group);
                (rules.length ? rules : [{ kind: "trait", name: "" }]).forEach(
                    function (rule) {
                        return addRule(rows, rule);
                    }
                );
            }

            function addRule(area, rule) {
                var kindControl = select(
                    [
                        ["medal", "Medal"],
                        ["trait", "Trait"],
                        ["skill", "Skill"],
                        ["attribute", "Attribute"],
                        ["other", "Other condition"]
                    ],
                    rule.kind
                );
                var nameControl = node("input", {
                    placeholder: "Exact page name or condition",
                    "aria-label": "Requirement name"
                });
                nameControl.value = rule.name || "";
                var amount = node("input", {
                    type: "number",
                    min: "1",
                    max: "5",
                    value: rule.min || 1,
                    "aria-label": "Minimum attribute"
                });
                var row = node(
                    "div",
                    { class: "ss-rule" },
                    kindControl,
                    nameControl,
                    amount,
                    button("Remove", function () {
                        row.remove();
                        dirty = true;
                    })
                );
                kindControl.addEventListener("change", function () {
                    amount.hidden = kindControl.value !== "attribute";
                    nameControl.placeholder =
                        kindControl.value === "attribute"
                            ? "Strength, Fortitude, Agility, Dexterity, Precision"
                            : "Exact page name or condition";
                });
                amount.hidden = rule.kind !== "attribute";
                area.append(row);
            }

            function renderFields() {
                fieldsArea.replaceChildren();
                customArea.replaceChildren();
                Object.keys(controls).forEach(function (k) {
                    return delete controls[k];
                });

                var c = TYPES[type];
                addField("name", "Exact page name", {
                    help: "Use the exact name shown in game."
                }).required = true;

                if (c.rarity)
                    addField("rarity", "Rarity", {
                        options: [["", "Select rarity"]].concat(RARITIES)
                    });

                if (cardType(type)) {
                    addField("requirements", "Requirements on this article", {
                        wide: true,
                        textarea: true,
                        help: "Optional."
                    });
                    addField("obtained", "How it is obtained", {
                        value: c.obtained || ""
                    });
                    addField("tags", "Tags", {
                        wide: true,
                        placeholder: "Separate tags with commas"
                    });

                    var chosen = node("div", { class: "ss-tags ss-wide" });
                    unique(registry[type] || [])
                        .sort()
                        .forEach(function (tag) {
                            return chosen.append(
                                button(tag, function () {
                                    controls.tags.value = unique(
                                        splitTags(controls.tags.value).concat([tag])
                                    ).join(", ");
                                    dirty = true;
                                })
                            );
                        });
                    fieldsArea.append(chosen);
                    rulesUI();
                }

                if (type === "item") {
                    addField("itemCategory", "Item category", {
                        options: [
                            "Weapon",
                            "Medical",
                            "Utility",
                            "Accessory",
                            "Ammunition",
                            "Grenade",
                            "Explosive",
                            "Currency",
                            "Miscellaneous"
                        ]
                    });
                    addField("weaponType", "Weapon type", {
                        options: ["Melee", "Gun"]
                    });
                    var updateType = function () {
                        controls.weaponType.parentElement.hidden =
                            controls.itemCategory.value !== "Weapon";
                    };
                    controls.itemCategory.addEventListener("change", updateType);
                    updateType();
                    addField("statistics", "Statistics", {
                        textarea: true,
                        wide: true
                    });
                    addField("usage", "Usage", { textarea: true, wide: true });
                }

                if (type === "location") {
                    addField("locationType", "Location type", {
                        options: [
                            "Country",
                            "Region",
                            "City",
                            "Fort",
                            "Airfield Base",
                            "Landmark",
                            "Other"
                        ]
                    });
                    [
                        ["country", "Country"],
                        ["region", "Region"],
                        ["parent", "Parent location"],
                        ["placeLink", "Roblox Place link"]
                    ].forEach(function (_ref2) {
                        var name = _ref2[0],
                            label = _ref2[1];
                        return addField(name, label, { help: "Optional." });
                    });
                }

                if (type === "character") {
                    addField("characterType", "Character type", {
                        options: ["Player", "NPC"]
                    });
                    addField("robloxUser", "Roblox username", {
                        help: "Optional for Players."
                    });
                    var updateCharType = function () {
                        controls.robloxUser.parentElement.hidden =
                            controls.characterType.value !== "Player";
                    };
                    controls.characterType.addEventListener("change", updateCharType);
                    updateCharType();

                    [
                        ["fullName", "Full name"],
                        ["aliases", "Aliases"],
                        ["age", "Age"],
                        ["birthplace", "Born in"],
                        ["languages", "Languages"],
                        ["height", "Height"],
                        ["country", "Country"],
                        ["regiment", "Regiment"],
                        ["division", "Division"],
                        ["rank", "Rank"],
                        ["role", "Role"],
                        ["squad", "Squad"],
                        ["serviceStatus", "Service status"]
                    ].forEach(function (_ref3) {
                        var name = _ref3[0],
                            label = _ref3[1];
                        return addField(name, label);
                    });

                    ATTRIBUTES.forEach(function (a) {
                        return addField(a.toLowerCase(), a, {
                            value: "1",
                            number: true
                        });
                    });

                    [
                        ["personality", "Personality"],
                        ["background", "Background"],
                        ["traits", "Traits"],
                        ["medals", "Medals"],
                        ["skills", "Skills"]
                    ].forEach(function (_ref4) {
                        var name = _ref4[0],
                            label = _ref4[1];
                        return addField(name, label, {
                            textarea: true,
                            wide: true
                        });
                    });

                    [
                        ["titanKills", "Titan kills"],
                        ["abnormalKills", "Abnormal kills"],
                        ["humanKills", "Human kills"],
                        ["humanAssists", "Human assists"],
                        ["bandages", "Bandages used"],
                        ["bandageRemovals", "Bandage removals"],
                        ["revivals", "Revivals"]
                    ].forEach(function (_ref5) {
                        var name = _ref5[0],
                            label = _ref5[1];
                        return addField(name, label, {
                            number: true,
                            value: "0"
                        });
                    });
                }

                addField(
                    "description",
                    cardType(type) ? "In game card description" : "Description",
                    {
                        wide: true,
                        textarea: true,
                        placeholder: cardType(type)
                            ? "Copy the exact description from the card"
                            : "Enter confirmed information"
                    }
                );

                addField(
                    "image",
                    type === "location"
                        ? "Location image or map filename"
                        : type === "character"
                          ? "Character image filename"
                          : type === "item"
                            ? "Item image filename"
                            : "Card art filename",
                    {
                        value:
                            type === "character"
                                ? "Character Image.png"
                                : type === "location"
                                  ? ""
                                  : "Blank Card Art.png"
                    }
                );

                addField("imageCaption", "Image caption", {
                    value:
                        type === "character"
                            ? "Image of the character."
                            : type === "location"
                              ? "Image or map of the location."
                              : type === "item"
                                ? "In game image of this item."
                                : c.title + " card artwork."
                });

                if (type !== "character") {
                    addField("status", "Status", {
                        value: type === "location" ? "Accessible" : "Obtainable"
                    });
                    addField("demo", "YouTube link or uploaded video or GIF", {
                        placeholder: "YouTube link or Example.gif"
                    });
                    addField("demoCaption", "Demonstration caption");
                }

                if (cardType(type)) {
                    addCustom("Effects", "");
                    addCustom("Usage", "");
                }
                if (type === "character") {
                    addCustom("History", "");
                    addCustom("Previous Information", "");
                    addCustom("Relationships", "");
                }

                loaded = null;
                loadedName = "";
                originalText = "";
                dirty = false;
                previewArea.replaceChildren();
                previewArea.open = false;
            }

            function getData() {
                var data = { type: type, sections: [] };
                Object.entries(controls).forEach(function (_ref6) {
                    var name = _ref6[0],
                        control = _ref6[1];
                    if (["rulesArea", "requirementsConfirmed"].includes(name))
                        return;
                    data[name] = trim(control.value);
                });
                data.image = (data.image || "").replace(/^File:/i, "");
                data.tags = splitTags(data.tags);
                data.requirementsConfirmed = !!(
                    controls.requirementsConfirmed &&
                    controls.requirementsConfirmed.checked
                );
                data.rules = controls.rulesArea
                    ? Array.from(controls.rulesArea.children).map(function (group) {
                          return Array.from(
                              group.querySelectorAll(".ss-rule")
                          ).map(function (row) {
                              var nodes = row.querySelectorAll("select,input");
                              return Object.assign(
                                  {
                                      kind: nodes[0].value,
                                      name: trim(nodes[1].value)
                                  },
                                  nodes[0].value === "attribute"
                                      ? { min: Number(nodes[2].value) }
                                      : {}
                              );
                          });
                      })
                    : [];

                if (cardType(type) && !data.requirements && data.rules.length) {
                    var label = function (rule) {
                        return ["medal", "trait", "skill"].includes(rule.kind)
                            ? "[[" + rule.name + "]] " + TYPES[rule.kind].title
                            : rule.kind === "attribute"
                              ? rule.min + " " + rule.name
                              : rule.name;
                    };
                    data.requirements = data.rules
                        .map(function (group) {
                            return group.map(label).join(" or ");
                        })
                        .join(", ");
                }

                customArea.querySelectorAll(".ss-custom-section").forEach(function (row) {
                    var inputs = row.querySelectorAll("input,textarea");
                    if (trim(inputs[0].value) && trim(inputs[1].value))
                        data.sections.push({
                            title: trim(inputs[0].value),
                            content: trim(inputs[1].value)
                        });
                });

                if (type === "character" && data.characterType !== "Player")
                    data.robloxUser = "";
                return data;
            }

            function validate(data) {
                if (!titleValid(data.name))
                    throw new Error("Enter a valid page name.");
                if (type === "medal" && !RARITIES.includes(data.rarity))
                    throw new Error("Select a rarity.");
                if (cardType(type) && !rulesValid(data.rules))
                    throw new Error("Each requirement group needs a named option.");
                if (mode === "edit" && !loaded)
                    throw new Error("Load an existing page before editing.");
            }

            function articleFields(data) {
                var previous = loaded
                    ? template(originalText, TYPES[type].template).fields
                    : {};
                var fields = Object.assign({}, previous);
                fields.name = "{{PAGENAME}}";
                fields.image = data.image;
                fields.imagecaption = data.imageCaption;
                fields.description = data.description;
                if (cardType(type)) {
                    fields.requirements =
                        key(data.requirements) === "none"
                            ? ""
                            : data.requirements;
                    fields.obtained = data.obtained;
                    fields.tags = data.tags.join(", ");
                }
                if (type === "medal") fields.rarity = data.rarity;
                if (type !== "character") fields.status = data.status;
                if (type === "item") {
                    fields.category = data.itemCategory;
                    fields.weapontype =
                        data.itemCategory === "Weapon" ? data.weaponType : "";
                }
                if (type === "location") {
                    fields.type = data.locationType;
                    fields.country = data.country;
                    fields.region = data.region;
                    fields.parent = data.parent;
                    fields.placelink = data.placeLink;
                }
                if (type === "character") {
                    [
                        "fullName",
                        "aliases",
                        "robloxUser",
                        "age",
                        "birthplace",
                        "languages",
                        "height",
                        "country",
                        "regiment",
                        "division",
                        "personality",
                        "background",
                        "strength",
                        "fortitude",
                        "agility",
                        "dexterity",
                        "precision",
                        "rank",
                        "role",
                        "squad",
                        "serviceStatus",
                        "titanKills",
                        "abnormalKills",
                        "humanKills",
                        "humanAssists",
                        "bandages",
                        "bandageRemovals",
                        "revivals"
                    ].forEach(function (name) {
                        fields[name.toLowerCase()] = data[name] || "";
                    });
                    fields.type = data.characterType;
                    fields.traits = linkedLines(data.traits);
                    fields.medals = linkedLines(data.medals);
                    fields.skills = linkedLines(data.skills);
                    delete fields.status;
                }
                return fields;
            }

            function linkedLines(value) {
                return trim(value)
                    .split("\n")
                    .map(trim)
                    .filter(Boolean)
                    .map(function (v) {
                        return /^\*/.test(v)
                            ? v
                            : v.startsWith("[[")
                              ? "* " + v
                              : "* [[" + v + "]]";
                    })
                    .join("\n");
            }

            function buildArticle(data) {
                var fields = articleFields(data);
                var tpl = templateText(TYPES[type].template, fields);
                var out = [tpl];
                var lead =
                    "'''{{PAGENAME}}''' is " +
                    (type === "item" ? "an Item" : "a " + TYPES[type].title) +
                    " in Seashell.";
                var prefix = "";
                var categories = [
                    "[[Category:" + TYPES[type].directory + "]]",
                    "[[Category:Community submissions]]"
                ];

                if (loaded) {
                    var previous = template(originalText, TYPES[type].template);
                    prefix = originalText.slice(0, previous.start);
                    var tail = originalText.slice(previous.end);
                    var firstHeading = /^==[^=\n]+==[ \t]*$/m.exec(tail);
                    var existingLead = cleanTail(
                        firstHeading ? tail.slice(0, firstHeading.index) : tail
                    );
                    if (existingLead) lead = existingLead;
                    categories = unique(
                        categories.concat(
                            originalText.match(/\[\[Category:[^\]]+\]\]/gi) || []
                        )
                    );
                }

                out.push("", lead);
                var add = function (title, content) {
                    if (trim(content))
                        out.push("", "==" + title + "==", trim(content));
                };
                add("Description", data.description);
                if (cardType(type) && key(data.requirements) !== "none")
                    add("Requirements", data.requirements);
                if (type === "item") {
                    add("Statistics", data.statistics);
                    add("Usage", data.usage);
                }
                if (type === "character")
                    add("Skills", linkedLines(data.skills));
                data.sections.forEach(function (s) {
                    return add(s.title, s.content);
                });
                if (type !== "character")
                    add("Demonstration", demoText(data.demo, data.demoCaption));

                if (cardType(type)) out.push("", metaLine(entryMetadata(data)));
                out.push.apply(out, [""].concat(unique(categories)));
                return prefix + out.join("\n").trimEnd() + "\n";
            }

            function tabs() {
                typeTabs.replaceChildren.apply(
                    typeTabs,
                    Object.entries(TYPES).map(function (_ref7) {
                        var id = _ref7[0],
                            c = _ref7[1];
                        var b = button(c.directory, function () {
                            return switchContext(id, mode);
                        });
                        b.classList.toggle("ss-active", type === id);
                        return b;
                    })
                );

                modeTabs.replaceChildren.apply(
                    modeTabs,
                    ["create", "edit"]
                        .concat(userIsAdmin ? ["delete"] : [])
                        .map(function (id) {
                            var b = button(
                                id[0].toUpperCase() + id.slice(1),
                                function () {
                                    return switchContext(type, id);
                                }
                            );
                            b.classList.toggle("ss-active", mode === id);
                            return b;
                        })
                );

                pickerArea.hidden = mode === "create";
                form.hidden = mode === "delete";
                loadButton.hidden = mode !== "edit";
                removeButton.hidden = mode !== "delete";
                submit.textContent =
                    (mode === "edit" ? "Save " : "Create ") + TYPES[type].title;
                tagsArea.hidden = !cardType(type) || !userIsAdmin;
            }

            function switchContext(nextType, nextMode) {
                if (busy || !promptDiscard()) return;
                type = nextType;
                mode = nextMode;
                renderFields();
                tabs();
                renderTagManager();
                refreshNames();
            }

            function renderTagManager() {
                tagsArea.replaceChildren(tagsSummary);
                if (!cardType(type) || !userIsAdmin) return;
                var available = select(
                    [["", "Select a tag"]].concat(registry[type] || [])
                );
                var name = node("input", {
                    placeholder: "Tag name",
                    "aria-label": "Tag name"
                });
                tagsArea.append(
                    node(
                        "div",
                        { class: "ss-grid" },
                        field("Existing tag", available),
                        field("New or replacement name", name)
                    ),
                    node(
                        "div",
                        { class: "ss-row" },
                        button("Create tag", function () {
                            return tagChange("create", "", name.value);
                        }),
                        button("Rename tag", function () {
                            return tagChange("rename", available.value, name.value);
                        }),
                        button("Remove tag", function () {
                            return tagChange("remove", available.value, "");
                        })
                    )
                );
            }

            function tagChange(operation, oldTag, newTag) {
                try {
                    if (busy || !userIsAdmin) return Promise.resolve();
                    newTag = trim(newTag);
                    if (!promptDiscard()) return Promise.resolve();
                    if (
                        !window.confirm(
                            operation === "create"
                                ? 'Create tag "' + newTag + '"?'
                                : "Update tag?"
                        )
                    )
                        return Promise.resolve();

                    busy = true;
                    var completed = [];
                    var failures = [];
                    
                    return Promise.resolve(
                        loadRegistry().then(function () {
                            var next = clone(registry);
                            if (operation === "create")
                                next[type] = unique(next[type].concat([newTag]));
                            else
                                next[type] = unique(
                                    next[type]
                                        .filter(function (t) {
                                            return key(t) !== key(oldTag);
                                        })
                                        .concat(operation === "rename" ? [newTag] : [])
                                );
                            return saveRegistry(next).then(function () {
                                renderFields();
                                renderTagManager();
                                show("Tag updated successfully. " + completed.length + " entries updated.");
                            });
                        })
                    ).finally(function () {
                        busy = false;
                    });
                } catch (e) {
                    busy = false;
                    return Promise.reject(e);
                }
            }

            function deleteEntry() {
                try {
                    if (busy || !userIsAdmin) return Promise.resolve();
                    var name = picker.value;
                    if (!name) return Promise.resolve(show("Select a page first.", true));
                    if (!window.confirm('Delete "' + name + '"?')) return Promise.resolve();

                    busy = true;
                    removeButton.disabled = true;
                    return Promise.resolve(
                        request({
                            action: "delete",
                            title: name,
                            reason: "Deleted through Content Manager"
                        }, true).then(function () {
                            return readPage(TYPES[type].directory).then(function (directory) {
                                var updated = removeDirectoryRow(directory.text, name);
                                return writePage(
                                    directory.title,
                                    updated,
                                    "Removed " + name + " from directory",
                                    directory,
                                    false
                                ).then(function () {
                                    renderFields();
                                    return refreshNames().then(function () {
                                        show("Deleted " + name + " successfully.");
                                    });
                                });
                            });
                        })
                    ).finally(function () {
                        busy = false;
                        removeButton.disabled = false;
                    });
                } catch (e) {
                    busy = false;
                    removeButton.disabled = false;
                    return Promise.reject(e);
                }
            }

            function loadEntry() {
                try {
                    if (busy) return Promise.resolve();
                    var name = picker.value;
                    if (!name) return Promise.resolve(show("Select a page first.", true));
                    if (!promptDiscard()) return Promise.resolve();

                    busy = true;
                    loadButton.disabled = true;
                    var requestedType = type;

                    return Promise.resolve(
                        readPage(name).then(function (page) {
                            if (page.missing) throw new Error("This page no longer exists.");
                            var tpl = template(page.text, TYPES[requestedType].template);
                            if (!tpl.found) throw new Error("Article does not use correct template.");

                            renderFields();
                            loaded = page;
                            loadedName = name;
                            originalText = page.text;
                            controls.name.value = name;
                            controls.name.disabled = true;

                            var mapping = {
                                imageCaption: "imagecaption",
                                itemCategory: "category",
                                weaponType: "weapontype",
                                locationType: "type",
                                placeLink: "placelink",
                                characterType: "type"
                            };

                            Object.entries(controls).forEach(function (_ref8) {
                                var fieldName = _ref8[0],
                                    control = _ref8[1];
                                if (["name", "rulesArea", "requirementsConfirmed"].includes(fieldName))
                                    return;
                                var wikiName = mapping[fieldName] || fieldName.toLowerCase();
                                if (tpl.fields[wikiName] !== undefined)
                                    control.value = tpl.fields[wikiName];
                            });

                            dirty = false;
                            show("Loaded " + name + " successfully.");
                        })
                    ).finally(function () {
                        busy = false;
                        loadButton.disabled = false;
                    });
                } catch (e) {
                    busy = false;
                    loadButton.disabled = false;
                    return Promise.reject(e);
                }
            }

            function refreshNames() {
                var ticket = ++context;
                var requestedType = type;
                return Promise.resolve(
                    readPage(TYPES[requestedType].directory)
                        .then(function (directory) {
                            var rows =
                                cardType(requestedType) && !directory.missing
                                    ? directoryRecords(directory.text, requestedType).map(function (e) {
                                          return e.name;
                                      })
                                    : [];
                            return categoryNames(requestedType).then(function (category) {
                                if (ticket !== context) return;
                                allNames = unique(rows.concat(category)).sort(function (a, b) {
                                    return a.localeCompare(b);
                                });
                                refreshPicker();
                            });
                        })
                        .catch(function (error) {
                            if (ticket === context)
                                show("Could not load existing pages: " + error.message, true);
                        })
                );
            }

            root.replaceChildren(typeTabs, modeTabs, pickerArea, form, tagsArea, result);
            form.addEventListener("input", function () { dirty = true; });
            form.addEventListener("change", function () { dirty = true; });
            find.addEventListener("input", refreshPicker);

            form.addEventListener("submit", function (event) {
                try {
                    event.preventDefault();
                    if (busy) return Promise.resolve();
                    var saved = false;

                    return Promise.resolve(
                        (function () {
                            var data = getData();
                            validate(data);
                            busy = true;
                            submit.disabled = true;
                            var target = mode === "edit" ? loadedName : data.name;

                            return readPage(TYPES[type].directory).then(function (directory) {
                                var handleSave = function (page) {
                                    if (mode === "create" && !page.missing)
                                        throw new Error("That page already exists.");

                                    show("Saving " + target + "...");
                                    return writePage(
                                        target,
                                        buildArticle(data),
                                        (mode === "create" ? "Created " : "Updated ") + TYPES[type].title,
                                        page,
                                        mode === "create"
                                    ).then(function (written) {
                                        saved = true;
                                        loaded = Object.assign({}, page, {
                                            missing: false,
                                            text: buildArticle(data),
                                            id: written.edit.newrevid || page.id
                                        });
                                        originalText = loaded.text;
                                        loadedName = target;

                                        var updatedDirectory = updateDirectory(directory.text, data);
                                        return writePage(
                                            directory.title,
                                            updatedDirectory,
                                            "Updated directory entry for " + target,
                                            directory,
                                            false
                                        ).then(function () {
                                            show("Saved " + target + " and directory successfully.");
                                            dirty = false;
                                            if (mode === "create") renderFields();
                                            return refreshNames();
                                        });
                                    });
                                };

                                if (directory.missing) throw new Error("Create the directory page first.");
                                return mode === "edit"
                                    ? handleSave(loaded)
                                    : readPage(target).then(handleSave);
                            });
                        })()
                    ).catch(function (error) {
                        show(error.message, true);
                    }).finally(function () {
                        busy = false;
                        submit.disabled = false;
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            });

            renderFields();
            tabs();
            renderTagManager();
            refreshNames();
            loadRegistry().catch(function () {});
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    /**
     * Card and item browser interface for listing and filtering wiki records.
     */
    var browser = function (root, type) {
        try {
            if (root.dataset.ready) return Promise.resolve();
            root.dataset.ready = "1";
            root.classList.add("ss-tools");

            return Promise.resolve(
                readPage(TYPES[type].directory)
                    .then(function (directory) {
                        if (directory.missing)
                            throw new Error("The directory page could not be found.");

                        var entries = directoryRecords(directory.text, type);
                        root.replaceChildren(
                            node("p", { text: "Browser loaded with " + entries.length + " entries." })
                        );
                    })
                    .catch(function (error) {
                        delete root.dataset.ready;
                        root.replaceChildren(
                            node("p", { class: "ss-error", text: error.message })
                        );
                    })
            );
        } catch (e) {
            return Promise.reject(e);
        }
    };

    var hydrate = function (entries) {
        return Promise.resolve(entries);
    };

    var categoryNames = function (type) {
        var names = [];
        return Promise.resolve(
            request({
                action: "query",
                list: "categorymembers",
                cmtitle: "Category:" + TYPES[type].directory,
                cmnamespace: 0,
                cmlimit: "max"
            }).then(function (result) {
                names.push.apply(
                    names,
                    result.query.categorymembers.map(function (page) {
                        return page.title;
                    })
                );
                return unique(names).sort();
            })
        );
    };

    var saveRegistry = function (next) {
        return readPage(TAG_PAGE).then(function (page) {
            return writePage(
                TAG_PAGE,
                "<pre>\n" + JSON.stringify(next, null, 2) + "\n</pre>\n",
                "Updated content tags through Content Manager",
                page,
                page.missing
            ).then(function () {
                registry = next;
            });
        });
    };

    var loadRegistry = function () {
        return readPage(TAG_PAGE).then(function (page) {
            if (page.missing) {
                registry = clone(DEFAULT_TAGS);
                return;
            }
            var text = page.text
                .replace(/^\s*<pre>\s*/, "")
                .replace(/\s*<\/pre>\s*$/, "");
            var parsed = JSON.parse(text);
            registry = Object.fromEntries(
                CARD_TYPES.map(function (t) {
                    return [t, splitTags((parsed[t] || []).join(","))];
                })
            );
        });
    };

    var writePage = function (title, text, summary, page, create) {
        var params = {
            action: "edit",
            title: title,
            text: text,
            summary: summary,
            watchlist: "nochange"
        };
        if (create || (page && page.missing)) params.createonly = 1;
        else {
            params.nocreate = 1;
            if (page && page.id) params.baserevid = page.id;
            if (page && page.timestamp) params.basetimestamp = page.timestamp;
            if (page && page.start) params.starttimestamp = page.start;
        }
        return request(params, true);
    };

    var readPage = function (title, followRedirects) {
        return request(
            Object.assign(
                {
                    action: "query",
                    prop: "info|revisions",
                    titles: title,
                    rvprop: "ids|content|timestamp",
                    rvslots: "main",
                    curtimestamp: 1
                },
                followRedirects ? { redirects: 1 } : {}
            )
        ).then(function (response) {
            if (
                !response.query ||
                !Array.isArray(response.query.pages) ||
                !response.query.pages.length
            )
                throw new Error("Wiki did not return page information for " + title + ".");
            return pageFrom(response.query.pages[0], response.curtimestamp);
        });
    };

    // Initialize document observers and automatic boot sequence
    var contentObserver =
        typeof MutationObserver === "function"
            ? new MutationObserver(function (records) {
                  if (
                      records.some(function (record) {
                          return Array.from(record.addedNodes).some(function (item) {
                              var _item$matches, _item$querySelector;
                              return (
                                  item.nodeType === 1 &&
                                  ((_item$matches = item.matches) === null ||
                                  _item$matches === void 0
                                      ? void 0
                                      : _item$matches.call(
                                            item,
                                            "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                                        )) ||
                                  ((_item$querySelector = item.querySelector) ===
                                      null || _item$querySelector === void 0
                                      ? void 0
                                      : _item$querySelector.call(
                                            item,
                                            "#seashell-submission-root, .ss-card-browser[data-kind], .ss-entry-connections"
                                        ))
                              );
                          });
                      })
                  )
                      queueBoot();
              })
            : null;

    if (contentObserver)
        contentObserver.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

    if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();