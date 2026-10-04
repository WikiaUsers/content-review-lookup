(function () {
    "use strict";
    if (window.SeashellCardsV2) return;
    window.SeashellCardsV2 = { status: "waiting", version: "2.0.0" };
    const TYPES = {
        medal: { title: "Medal", directory: "Medals", template: "Medal", rarity: true, obtained: "Medal Roll" },
        trait: { title: "Trait", directory: "Traits", template: "Trait", obtained: "" },
        skill: { title: "Skill", directory: "Skills", template: "Skill", obtained: "Staff" },
        item: { title: "Item", directory: "Items", template: "Item" },
        location: { title: "Location", directory: "Locations", template: "Location" },
        character: { title: "Character", directory: "Characters", template: "Character" }
    };
    const CARD_TYPES = ["medal", "trait", "skill"];
    const RARITIES = ["Mythic", "Legendary", "Epic", "Uncommon", "Common"];
    const ATTRIBUTES = ["Strength", "Fortitude", "Agility", "Dexterity", "Precision"];
    const TAG_PAGE = "Seashell Wiki:Content Tags";
    const DEFAULT_TAGS = {
        medal: ["Health", "Visual", "Notification", "Speed", "Damage", "Gun", "LMG", "Melee", "Swimming", "Skydiving"],
        trait: ["Lore Trait", "Awakened"], skill: []
    };
    const trim = value => String(value == null ? "" : value).trim();
    const key = value => trim(value).replace(/_/g, " ").replace(/\s+/g, " ").toLowerCase();
    const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const reEsc = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const clone = value => JSON.parse(JSON.stringify(value));
    const unique = values => [...new Map(values.map(v => [key(v), trim(v)])).values()].filter(Boolean);
    const splitTags = value => unique(trim(value).split(/[,\n]/).map(trim));
    const plain = value => trim(value).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2").replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/'{2,5}/g, "").replace(/<[^>]+>/g, "").replace(/\{\{!\}\}/g, "|");
    const cardType = type => CARD_TYPES.includes(type);
    const metaLine = data => "<!-- SS_META " + encodeURIComponent(JSON.stringify(data)) + " -->";
    function meta(text) {
        const found = String(text).match(/<!-- SS_META ([^\s]+) -->/);
        if (!found) return {};
        try { return JSON.parse(decodeURIComponent(found[1])); } catch (error) { return {}; }
    }
    function replaceMeta(text, data) {
        const line = metaLine(data);
        return /<!-- SS_META [^\s]+ -->/.test(text) ? text.replace(/<!-- SS_META [^\s]+ -->/, () => line) : text.trimEnd() + "\n" + line + "\n";
    }
    // Split only outside nested templates and links so wiki formatting remains intact.
    function splitWiki(text, separator) {
        const result = []; let start = 0; let braces = 0; let links = 0;
        for (let i = 0; i < text.length; i += 1) {
            const pair = text.slice(i, i + 2);
            if (pair === "{{") { braces += 1; i += 1; }
            else if (pair === "}}") { braces = Math.max(0, braces - 1); i += 1; }
            else if (pair === "[[") { links += 1; i += 1; }
            else if (pair === "]]") { links = Math.max(0, links - 1); i += 1; }
            else if (!braces && !links && text[i] === separator) { result.push(text.slice(start, i)); start = i + 1; }
        }
        result.push(text.slice(start)); return result;
    }
    function template(text, name) {
        const match = new RegExp("\\{\\{\\s*(?:Template:)?" + reEsc(name) + "\\s*(?=[|}\\n])", "i").exec(text);
        if (!match) return { found: false, start: 0, end: 0, fields: {} };
        let depth = 1; let end = match.index + match[0].length;
        for (; end < text.length; end += 1) {
            if (text.slice(end, end + 2) === "{{") { depth += 1; end += 1; }
            else if (text.slice(end, end + 2) === "}}") { depth -= 1; end += 1; if (!depth) { end += 1; break; } }
        }
        if (depth) throw new Error("The article template has unbalanced braces. Fix its source before using the manager.");
        const fields = {};
        splitWiki(text.slice(match.index + 2, end - 2), "|").slice(1).forEach(part => {
            const equals = part.indexOf("=");
            if (equals >= 0) fields[trim(part.slice(0, equals)).toLowerCase()] = trim(part.slice(equals + 1)).replace(/\{\{!\}\}/g, "|");
        });
        return { found: true, start: match.index, end, fields };
    }
    function encodeValue(value) {
        // Preserve pipes inside wiki links and templates, escape only unprotected pipes.
        return splitWiki(trim(value), "|").join("{{!}}");
    }
    function templateText(name, fields) {
        return "{{" + name + "\n" + Object.entries(fields).map(([field, value]) => "|" + field + " = " + encodeValue(value)).join("\n") + "\n}}";
    }
    function sectionsOf(text) {
        const headers = [...text.matchAll(/^==[ \t]*([^=\n]+?)[ \t]*==[ \t]*$/gm)];
        return headers.map((h, i) => ({ title: trim(h[1]), content: trim(text.slice(h.index + h[0].length, i + 1 < headers.length ? headers[i + 1].index : text.length)) }));
    }
    function cleanTail(text) {
        return text.replace(/<!-- SS_META [^\s]+ -->/g, "").replace(/\[\[Category:[^\]]+\]\]/gi, "").replace(/__(?:NOTOC|NOEDITSECTION)__/gi, "").trim();
    }
    function titleValid(title) { return !!trim(title) && title.length <= 180 && !/[#<>\[\]{}|:\n\r]/.test(title); }
    function rulesValid(rules) {
        return Array.isArray(rules) && rules.every(group => Array.isArray(group) && group.length && group.every(r => ["medal", "trait", "skill", "attribute", "other"].includes(r.kind) && trim(r.name) && (r.kind !== "attribute" || (ATTRIBUTES.includes(r.name) && Number.isInteger(Number(r.min)) && Number(r.min) >= 1 && Number(r.min) <= 5))));
    }
    function requirementNames(entry) {
        const names = [];
        (entry.rules || []).forEach(group => group.forEach(r => { if (["medal", "trait", "skill"].includes(r.kind)) names.push(r.name); }));
        for (const match of String(entry.requirements || "").matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)) names.push(match[1]);
        return unique(names);
    }
    function eligibility(entry, profile) {
        if (!entry.requirementsConfirmed) return "unknown";
        const owned = (profile.owned || []).map(key);
        const ruleResult = rule => {
            if (["medal", "trait", "skill"].includes(rule.kind)) return owned.includes(key(rule.name)) ? "met" : "unmet";
            if (rule.kind === "attribute") return Number(profile.attributes[rule.name] || 1) >= Number(rule.min) ? "met" : "unmet";
            return "unknown";
        };
        const groups = (entry.rules || []).map(group => {
            const results = group.map(ruleResult);
            return results.includes("met") ? "met" : results.includes("unknown") ? "unknown" : "unmet";
        });
        return groups.includes("unmet") ? "unmet" : groups.includes("unknown") ? "unknown" : "met";
    }
    function directoryRecords(source, type) {
        const records = []; const lines = source.split("\n"); let rarity = ""; let row = [];
        function flush() {
            if (!row.length) return;
            const text = row.join("\n"); row = [];
            const name = text.match(/^\|[ \t]*'''\[\[([^|\]]+)(?:\|[^\]]+)?\]\]'''[ \t]*$/m);
            if (!name) return;
            const cells = []; let current = null;
            for (const line of text.split("\n")) {
                if (/^<!--.*-->[ \t]*$/.test(line)) continue;
                if (/^\|[^-}]/.test(line) || line === "|") { if (current !== null) cells.push(trim(current)); current = line.slice(1).trimStart(); }
                else if (current !== null) current += "\n" + line;
            }
            if (current !== null) cells.push(trim(current));
            const data = meta(text);
            records.push({ ...data, name: trim(name[1]), type, rarity: type === "medal" ? rarity : "", requirements: type === "medal" ? cells[1] || "" : data.requirements || "", description: cells[type === "medal" ? 2 : 1] || "", obtained: type !== "medal" ? cells[2] || "" : data.obtained || "", tags: splitTags(Array.isArray(data.tags) ? data.tags.join(",") : data.tags || ""), rules: rulesValid(data.rules) ? data.rules : [], requirementsConfirmed: data.requirementsConfirmed === true });
        }
        for (const line of lines) {
            const heading = line.match(/class="ss-box-title"[^>]*>(Mythic|Legendary|Epic|Uncommon|Common) Medals</);
            if (heading) { flush(); rarity = heading[1]; }
            if (/^\|-\s*$/.test(line)) { flush(); row = []; }
            else if (/^\|}\s*$/.test(line) || /^<!-- .*_END -->\s*$/.test(line)) flush();
            else row.push(line);
        }
        flush(); return records;
    }
    function removeDirectoryRow(text, name) {
        const lines = text.split("\n");
        const match = new RegExp("^\\|[ \\t]*'''\\[\\[" + reEsc(name) + "(?:\\|[^\\]]+)?\\]\\]'''[ \\t]*$", "i");
        for (;;) {
            const index = lines.findIndex(line => match.test(line)); if (index < 0) break;
            let start = index; while (start >= 0 && !/^\|-\s*$/.test(lines[start])) start -= 1;
            if (start < 0) throw new Error("The directory row has no row separator. Fix the table source first.");
            let end = index + 1;
            while (end < lines.length && !/^\|-\s*$|^\|}\s*$|^<!-- .*_END -->\s*$/.test(lines[end])) end += 1;
            lines.splice(start, end - start);
        }
        return lines.join("\n");
    }
    function marker(data) {
        if (data.type === "medal") return "<!-- MEDAL_ROWS_" + data.rarity.toUpperCase() + "_END -->";
        if (data.type === "trait" || data.type === "skill") return "<!-- " + data.type.toUpperCase() + "_ROWS_END -->";
        if (data.type === "item") return "<!-- ITEM_ROWS_" + (data.itemCategory === "Weapon" ? "WEAPON_" + data.weaponType.toUpperCase() : data.itemCategory.toUpperCase().replace(/\s+/g, "_")) + "_END -->";
        if (data.type === "location") return "<!-- LOCATION_ROWS_" + data.locationType.toUpperCase().replace(/\s+/g, "_") + "_END -->";
        return "<!-- CHARACTER_ROWS_END -->";
    }
    function rowText(data) {
        const cells = ["'''[[" + data.name + "]]'''"];
        if (data.type === "medal") cells.push(data.requirements || "");
        if (data.type === "location" && data.locationType !== "Country") { const parent = data.parent || data.region || data.country; cells.push(parent ? "[[" + parent + "]]" : ""); }
        cells.push(data.description || "");
        if (data.type === "trait" || data.type === "skill") cells.push(data.obtained || "");
        return "|-\n" + cells.map(cell => "| " + cell.replace(/^([|!])/gm, "<nowiki>$1</nowiki>")).join("\n") + "\n" + (cardType(data.type) ? metaLine(entryMetadata(data)) + "\n" : "");
    }
    function entryMetadata(data) {
        return { tags: data.tags || [], image: data.image || "", requirements: data.requirements || "", rules: data.rules || [], requirementsConfirmed: data.requirementsConfirmed === true };
    }
    function updateDirectory(source, data) {
        const mark = marker(data);
        if (!source.includes(mark)) throw new Error("The directory needs this insertion marker: " + mark + ". No directory changes were made.");
        const clean = removeDirectoryRow(source, data.name);
        return clean.replace(mark, () => rowText(data) + mark);
    }
    function youtubeId(value) {
        try { const url = new URL(value); if (["youtu.be", "www.youtu.be"].includes(url.hostname)) return /^[\w-]{11}$/.test(url.pathname.slice(1)) ? url.pathname.slice(1) : ""; if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) { const id = url.searchParams.get("v") || url.pathname.match(/^\/(?:shorts|embed)\/([\w-]{11})/)?.[1]; return /^[\w-]{11}$/.test(id || "") ? id : ""; } } catch (error) { /* A filename is also allowed. */ }
        return "";
    }
    function demoText(source, caption) {
        if (!trim(source)) return "";
        const id = youtubeId(source);
        if (id) return "{{#ev:youtube|" + id + "|640|center|" + encodeValue(caption || "Demonstration.") + "}}";
        if (/^https?:\/\//i.test(source)) return "[" + source + " View demonstration]";
        return "[[File:" + source.replace(/^File:/i, "") + "|640px|center|" + encodeValue(caption || "Demonstration.") + "]]";
    }
    function parseDemo(source) {
        const youtube = source.match(/\{\{#ev:youtube\|([\w-]{11})\|[^|}]*\|center\|([\s\S]*?)\}\}/i);
        if (youtube) return { demo: "https://www.youtube.com/watch?v=" + youtube[1], demoCaption: youtube[2].replace(/\{\{!\}\}/g, "|") };
        const file = source.match(/\[\[File:([^|\]]+)\|([^\]]*)\]\]/i);
        if (file) return { demo: file[1], demoCaption: file[2].split("|").filter(part => !/^(?:\d+px|center|thumb|frame)$/.test(part)).join("|") };
        const link = source.match(/\[(https?:\/\/[^\s\]]+)\s[^\]]*\]/i);
        return { demo: link ? link[1] : "", demoCaption: "" };
    }
    let api; let userIsAdmin = false; let registry = clone(DEFAULT_TAGS);
    function request(params, write) {
        return new Promise((resolve, reject) => {
            const call = write ? api.postWithToken("csrf", { ...params, formatversion: 2 }) : api.get({ ...params, formatversion: 2 });
            call.then(result => {
                if (result.error || (params.action === "edit" && result.edit?.result !== "Success")) reject(new Error(result.error?.info || result.edit?.info || "The wiki did not accept this edit. Open Edit source to resolve a CAPTCHA or permission restriction."));
                else resolve(result);
            }, (code, details) => reject(new Error(details?.error?.info || details?.info || String(code || "The request failed."))));
        });
    }
    function pageFrom(page, timestamp) {
        const rev = page.revisions?.[0]; const slot = rev?.slots?.main;
        return { title: page.title, missing: Object.hasOwn ? Object.hasOwn(page, "missing") : Object.prototype.hasOwnProperty.call(page, "missing"), text: slot?.content ?? slot?.["*"] ?? rev?.content ?? rev?.["*"] ?? "", id: page.lastrevid || rev?.revid || 0, timestamp: rev?.timestamp, start: timestamp };
    }
    async function readPage(title) {
        const response = await request({ action: "query", prop: "info|revisions", titles: title, rvprop: "ids|content|timestamp", rvslots: "main", curtimestamp: 1 });
        return pageFrom(response.query.pages[0], response.curtimestamp);
    }
    async function writePage(title, text, summary, page, create) {
        const params = { action: "edit", title, text, summary, watchlist: "nochange" };
        if (create || page?.missing) params.createonly = 1;
        else { params.nocreate = 1; if (page?.id) params.baserevid = page.id; if (page?.timestamp) params.basetimestamp = page.timestamp; if (page?.start) params.starttimestamp = page.start; }
        return request(params, true);
    }
    async function loadRegistry() {
        const page = await readPage(TAG_PAGE);
        if (page.missing) { registry = clone(DEFAULT_TAGS); return; }
        const text = page.text.replace(/^\s*<pre>\s*/, "").replace(/\s*<\/pre>\s*$/, "");
        const parsed = JSON.parse(text);
        CARD_TYPES.forEach(type => { if (!Array.isArray(parsed[type])) throw new Error("Content Tags is not a valid tag registry."); });
        registry = parsed;
    }
    async function saveRegistry(next) {
        const page = await readPage(TAG_PAGE);
        await writePage(TAG_PAGE, "<pre>\n" + JSON.stringify(next, null, 2) + "\n</pre>\n", "Updated content tags through Content Manager", page, page.missing);
        registry = next;
    }
    async function categoryNames(type) {
        const names = []; let continuation;
        do {
            const result = await request({ action: "query", list: "categorymembers", cmtitle: "Category:" + TYPES[type].directory, cmnamespace: 0, cmlimit: "max", ...(continuation || {}) });
            names.push(...result.query.categorymembers.map(page => page.title)); continuation = result.continue;
        } while (continuation);
        return unique(names).sort((a, b) => a.localeCompare(b));
    }
    async function hydrate(entries) {
        const results = []; for (let start = 0; start < entries.length; start += 40) {
            const batch = entries.slice(start, start + 40);
            const response = await request({ action: "query", prop: "info|revisions", titles: batch.map(e => e.name).join("|"), rvprop: "content|ids|timestamp", rvslots: "main" });
            const pages = new Map(response.query.pages.map(p => [key(p.title), p]));
            batch.forEach(entry => {
                const page = pages.get(key(entry.name)); const copy = { ...entry };
                if (page && !Object.prototype.hasOwnProperty.call(page, "missing")) {
                    const content = pageFrom(page).text; const fields = template(content, TYPES[entry.type].template).fields; const metadata = meta(content);
                    copy.image = fields.image || copy.image || "";
                    if (fields.tags !== undefined) copy.tags = splitTags(fields.tags); else if (metadata.tags) copy.tags = metadata.tags;
                    if (metadata.rules) copy.rules = metadata.rules;
                    if (metadata.requirementsConfirmed !== undefined) copy.requirementsConfirmed = metadata.requirementsConfirmed;
                    // Directory descriptions remain authoritative until an editor saves the entry.
                    copy.requirements = fields.requirements ?? copy.requirements;
                    copy.articleDescriptionMissing = !trim(fields.description);
                    copy.articleMissing = false;
                } else copy.articleMissing = true;
                results.push(copy);
            });
        }
        return results;
    }
    function node(tag, attrs, ...children) {
        const element = document.createElement(tag);
        Object.entries(attrs || {}).forEach(([name, value]) => { if (name === "class") element.className = value; else if (name === "text") element.textContent = value; else if (name.startsWith("on")) element.addEventListener(name.slice(2), value); else if (value !== false && value != null) element.setAttribute(name, value === true ? "" : value); });
        children.forEach(child => { if (child != null) element.append(child); }); return element;
    }
    const link = (title, label) => node("a", { href: mw.util.getUrl(title), text: label || title });
    const button = (label, callback) => node("button", { type: "button", text: label, onclick: callback });
    function select(options, value) {
        const control = node("select", {}); options.forEach(option => { const pair = Array.isArray(option) ? option : [option, option]; control.append(node("option", { value: pair[0], text: pair[1] })); }); if ([...control.options].some(o => o.value === String(value || ""))) control.value = value || ""; return control;
    }
    function field(label, control) { return node("label", { class: "ss-field" }, node("span", { text: label }), control); }
    const styles = `
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
    async function browser(root, type) {
        if (root.dataset.ready) return; root.dataset.ready = "1"; root.classList.add("ss-tools");
        try {
            const directory = await readPage(TYPES[type].directory);
            if (directory.missing) throw new Error("The directory page could not be found.");
            let entries = directoryRecords(directory.text, type);
            if (!entries.length) { root.textContent = "No documented entries were found. The table below remains available."; return; }
            const query = new URLSearchParams(location.search);
            let currentPage = Math.max(1, Number(query.get("sspage")) || 1); let chosenTags = splitTags(query.get("sstags") || "");
            const search = node("input", { type: "search", placeholder: "Search names, descriptions, tags, or requirements", "aria-label": "Search " + TYPES[type].directory }); search.value = query.get("ssq") || "";
            const rarity = select([["", "All rarities"], ...RARITIES], query.get("ssrarity"));
            const sort = select([["name", "Name A to Z"], ["reverse", "Name Z to A"], ...(type === "medal" ? [["rarity", "Rarity highest first"]] : [])], query.get("sssort") || "name");
            const unlock = select([["", "All unlock requirements"], ...unique(entries.flatMap(requirementNames)).sort()], query.get("ssunlock"));
            const missing = select([["", "All information"], ["any", "Any missing information"], ["description", "Missing description"], ["art", "Missing artwork"], ["tags", "Missing tags"], ["requirements", "Requirements not confirmed"], ["article", "Missing article"]], query.get("ssmissing"));
            const view = select([["list", "List view"], ["cards", "Card view"]], query.get("ssview") || "list");
            const limit = select(["12", "24", "48"], query.get("sslimit") || "24");
            const eligible = select([["all", "All entries"], ["met", "Requirements met"], ["unmet", "Requirements not met"], ["unknown", "Requirements unknown"]], query.get("sseligible") || "all");
            const hideOwned = node("input", { type: "checkbox" }); hideOwned.checked = query.get("sshideowned") === "1";
            const results = node("div", { class: "ss-results" }); const count = node("p", { "aria-live": "polite" }); const tags = node("div", { class: "ss-tags" }); const pager = node("div", { class: "ss-pager" }); const message = node("div", { "aria-live": "polite" });
            let profile = { owned: [], attributes: Object.fromEntries(ATTRIBUTES.map(a => [a, 1])) };
            try { profile = { ...profile, ...JSON.parse(localStorage.getItem("seashell.profile.v2") || "{}") }; } catch (error) { /* Storage is optional. */ }
            profile.attributes = profile.attributes || Object.fromEntries(ATTRIBUTES.map(a => [a, 1]));
            const own = node("textarea", { placeholder: "One exact Medal, Trait, or Skill page name per line" }); own.value = (profile.owned || []).join("\n");
            const remember = node("input", { type: "checkbox" }); try { remember.checked = !!localStorage.getItem("seashell.profile.v2"); } catch (error) { /* Storage is optional. */ }
            const attrs = node("div", { class: "ss-attributes" }); const attributeInputs = {};
            ATTRIBUTES.forEach(a => { const control = node("input", { type: "number", min: "1", max: "5", value: profile.attributes[a] || 1 }); attributeInputs[a] = control; attrs.append(field(a, control)); });
            const profileBox = node("details", { class: "ss-profile" }, node("summary", { text: "My character requirements" }), node("p", { class: "ss-help", text: "This profile is private to this browser. Requirement matching uses documented rules and does not guarantee a roll or staff award." }), field("Owned Medals, Traits, and Skills", own), attrs, node("label", { class: "ss-checkbox" }, remember, "Remember this profile in this browser"));
            const share = button("Copy filter link", async () => { try { await navigator.clipboard.writeText(filterURL()); message.textContent = "Filter link copied. Your private profile is not included."; } catch (error) { const copy = node("input", { readonly: true, value: filterURL() }); message.replaceChildren(copy); copy.select(); } });
            root.replaceChildren(node("div", { class: "ss-toolbar" }, field("Search", search), ...(type === "medal" ? [field("Rarity", rarity)] : []), field("Sort", sort), field("Unlock requirement", unlock), field("Information", missing), field("View", view), field("Entries per page", limit), field("Eligibility", eligible)), tags, node("div", { class: "ss-row" }, button("Clear filters", () => { search.value = ""; rarity.value = ""; sort.value = "name"; unlock.value = ""; missing.value = ""; view.value = "list"; limit.value = "24"; eligible.value = "all"; hideOwned.checked = false; chosenTags = []; currentPage = 1; renderTags(); render(); }), share, ...(type === "medal" ? [node("label", { class: "ss-checkbox" }, hideOwned, "Hide owned Medals")] : [])), profileBox, message, count, results, pager);
            const fallback = document.querySelector('.ss-directory-fallback[data-kind="' + type + '"]');
            function filterURL() {
                const url = new URL(location.href); [...url.searchParams.keys()].filter(k => k.startsWith("ss")).forEach(k => url.searchParams.delete(k));
                const state = { ssq: search.value, ssrarity: type === "medal" ? rarity.value : "", sssort: sort.value, ssunlock: unlock.value, ssmissing: missing.value, ssview: view.value, sslimit: limit.value, sstags: chosenTags.join(","), sseligible: eligible.value, sshideowned: hideOwned.checked ? "1" : "", sspage: String(currentPage) };
                Object.entries(state).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); }); return url.href;
            }
            function renderTags() {
                const allTags = unique(entries.flatMap(e => e.tags)).sort();
                tags.replaceChildren(...allTags.map(tag => { const b = button(tag, () => { chosenTags = chosenTags.some(t => key(t) === key(tag)) ? chosenTags.filter(t => key(t) !== key(tag)) : [...chosenTags, tag]; currentPage = 1; renderTags(); render(); }); const active = chosenTags.some(t => key(t) === key(tag)); b.classList.toggle("ss-active", active); b.setAttribute("aria-pressed", String(active)); return b; }));
                chosenTags.filter(tag => !allTags.some(t => key(t) === key(tag))).forEach(tag => tags.append(button(tag + " (remove filter)", () => { chosenTags = chosenTags.filter(t => key(t) !== key(tag)); renderTags(); render(); })));
            }
            function hasMissing(entry, kind) {
                const artworkMissing = !trim(entry.image) || /^Blank (?:Card|Medal Card)(?: Art)?\.png$/i.test(entry.image);
                const flags = { description: !trim(entry.description) || entry.articleDescriptionMissing, art: artworkMissing, tags: !entry.tags.length, requirements: !entry.requirementsConfirmed, article: entry.articleMissing };
                return kind === "any" ? Object.values(flags).some(Boolean) : !!flags[kind];
            }
            function render() {
                profile.owned = unique(own.value.split("\n")); ATTRIBUTES.forEach(a => { profile.attributes[a] = Math.min(5, Math.max(1, Number(attributeInputs[a].value) || 1)); });
                const terms = key(search.value).split(/\s+/).filter(Boolean);
                const filtered = entries.filter(e => terms.every(term => key(e.name + " " + plain(e.description) + " " + e.tags.join(" ") + " " + plain(e.requirements) + " " + e.obtained).includes(term)) && (!rarity.value || e.rarity === rarity.value) && (!chosenTags.length || chosenTags.some(tag => e.tags.some(t => key(t) === key(tag)))) && (!unlock.value || requirementNames(e).some(n => key(n) === key(unlock.value))) && (!missing.value || hasMissing(e, missing.value)) && (eligible.value === "all" || eligibility(e, profile) === eligible.value) && (!hideOwned.checked || !profile.owned.some(n => key(n) === key(e.name))));
                filtered.sort((a, b) => (sort.value === "rarity" ? RARITIES.indexOf(a.rarity) - RARITIES.indexOf(b.rarity) : 0) || (sort.value === "reverse" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
                const perPage = Number(limit.value) || 24; const pages = Math.max(1, Math.ceil(filtered.length / perPage)); currentPage = Math.min(currentPage, pages);
                const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
                count.textContent = filtered.length + " of " + entries.length + " " + TYPES[type].directory + " match";
                results.className = "ss-results" + (view.value === "cards" ? " ss-cards" : "");
                results.replaceChildren(...visible.map(entry => {
                    const article = node("article", { class: "ss-result" }, node("h3", {}, link(entry.name)));
                    if (view.value === "cards") {
                        if (entry.image) { const image = node("img", { class: "ss-art", loading: "lazy", src: mw.util.getUrl("Special:FilePath/" + entry.image, { width: 240 }), alt: "Card art for " + entry.name }); image.addEventListener("error", () => image.replaceWith(node("div", { class: "ss-art-empty", text: "Artwork unavailable" }))); article.append(image); }
                        else article.append(node("div", { class: "ss-art-empty", text: "Artwork not added" }));
                    }
                    if (type === "medal") article.append(node("span", { class: "ss-rarity", "data-rarity": entry.rarity, text: entry.rarity }));
                    article.append(node("p", { text: plain(entry.description) || "Description not added." }));
                    if (type === "medal" && trim(entry.requirements) && key(entry.requirements) !== "none") article.append(node("p", { class: "ss-help", text: "Requirements: " + plain(entry.requirements) }));
                    if (type !== "medal" && entry.obtained) article.append(node("p", { class: "ss-help", text: "Obtained from: " + plain(entry.obtained) }));
                    if (type === "trait" || type === "skill") article.append(node("a", { href: mw.util.getUrl("Medals", { ssunlock: entry.name }), text: "View Medals linked to this " + TYPES[type].title }));
                    article.append(node("div", { class: "ss-tags" }, ...entry.tags.map(tag => node("span", { class: "ss-tag", text: tag }))));
                    if (eligible.value !== "all") article.append(node("p", { class: "ss-help", text: "Requirements " + eligibility(entry, profile) }));
                    return article;
                }));
                if (!visible.length) results.append(node("p", { text: "No entries match these filters." }));
                const previous = button("Previous", () => { currentPage -= 1; render(); }); previous.disabled = currentPage <= 1;
                const next = button("Next", () => { currentPage += 1; render(); }); next.disabled = currentPage >= pages;
                pager.replaceChildren(previous, node("span", { text: "Page " + currentPage + " of " + pages }), next);
                try { history.replaceState(null, "", filterURL()); } catch (error) { /* Filters still work without History access. */ }
            }
            function profileChanged() { try { if (remember.checked) { profile.owned = unique(own.value.split("\n")); ATTRIBUTES.forEach(a => profile.attributes[a] = Math.min(5, Math.max(1, Number(attributeInputs[a].value) || 1))); localStorage.setItem("seashell.profile.v2", JSON.stringify(profile)); } else localStorage.removeItem("seashell.profile.v2"); } catch (error) { message.textContent = "Browser storage is unavailable. This profile works until you leave the page."; } currentPage = 1; render(); }
            [own, remember, ...Object.values(attributeInputs)].forEach(control => control.addEventListener("input", profileChanged));
            search.addEventListener("input", () => { currentPage = 1; render(); });
            [rarity, sort, unlock, missing, view, limit, eligible, hideOwned].forEach(control => control.addEventListener("change", () => { currentPage = 1; render(); }));
            renderTags(); render(); if (fallback) fallback.hidden = true;
            message.textContent = "Loading artwork and article information...";
            try { entries = await hydrate(entries); renderTags(); render(); message.textContent = ""; }
            catch (error) { message.textContent = "Article information could not be loaded. Artwork and missing information results may be incomplete. " + error.message; }
        } catch (error) { root.replaceChildren(node("p", { class: "ss-error", text: error.message + " The table below remains available." })); }
    }

    async function manager(root) {
        if (root.dataset.ready) return; root.dataset.ready = "1"; root.classList.add("ss-tools");
        if (!mw.config.get("wgUserName")) { root.replaceChildren(node("p", {}, "Sign in to use the Content Manager. ", link("Special:UserLogin", "Log in"))); return; }
        let type = "medal"; let mode = "create"; let loaded = null; let loadedName = ""; let originalText = ""; let dirty = false; let busy = false; let context = 0;
        const controls = {}; const typeTabs = node("div", { class: "ss-tabs" }); const modeTabs = node("div", { class: "ss-tabs" });
        const picker = select([["", "Select an entry"]]); const find = node("input", { type: "search", placeholder: "Find an existing page" }); let allNames = [];
        const pickerArea = node("div", { class: "ss-grid" }, field("Find", find), field("Existing page", picker));
        const form = node("form", {}); const fieldsArea = node("div", { class: "ss-grid" }); const customArea = node("div", {}); const result = node("div", { "aria-live": "polite" }); const previewArea = node("details", {}); const submit = node("button", { type: "submit", text: "Create Medal" });
        const loadButton = button("Load and prefill", loadEntry); pickerArea.append(loadButton);
        const removeButton = button("Delete selected page", deleteEntry); pickerArea.append(removeButton);
        const addSectionButton = button("Add section", () => { addCustom("", ""); dirty = true; });
        const previewButton = button("Preview source", () => { try { const data = getData(); validate(data); previewArea.replaceChildren(node("summary", { text: "Source preview" }), node("pre", { text: buildArticle(data) }), node("h4", { text: "Directory row" }), node("pre", { text: rowText(data) })); previewArea.open = true; } catch (error) { show(error.message, true); } });
        const upload = node("a", { class: "ss-upload", href: mw.util.getUrl("Special:Upload"), target: "_blank", rel: "noopener", text: "Upload a file" });
        const tagsArea = node("details", {}); const tagsSummary = node("summary", { text: "Manage tags" }); tagsArea.append(tagsSummary);
        const customSection = node("section", { class: "ss-editor-section" }, node("h3", { text: "Optional article sections" }), node("p", { class: "ss-help", text: "Use Effects, Usage, or a custom section to explain mechanics. Empty sections are omitted." }), customArea, addSectionButton);
        form.append(fieldsArea, customSection, node("div", { class: "ss-row" }, submit, previewButton, upload), previewArea);
        root.replaceChildren(typeTabs, modeTabs, pickerArea, form, tagsArea, result);
        function show(message, error) { result.replaceChildren(node("div", { class: "ss-status" + (error ? " ss-error" : ""), text: message })); }
        function addField(name, label, options) {
            const o = options || {}; const control = o.options ? select(o.options, o.value) : node(o.textarea ? "textarea" : "input", { type: o.number ? "number" : "text", placeholder: o.placeholder || "", ...(o.number ? { min: "0" } : {}) });
            if (!o.options) control.value = o.value || ""; control.id = "sscm-" + name; controls[name] = control;
            const wrapper = field(label, control); if (o.wide) wrapper.classList.add("ss-wide"); if (o.help) wrapper.append(node("span", { class: "ss-help", text: o.help })); fieldsArea.append(wrapper); return control;
        }
        function addCustom(title, content) {
            const heading = node("input", { placeholder: "Section name", "aria-label": "Section name" }); heading.value = title || "";
            const body = node("textarea", { "aria-label": "Section content" }); body.value = content || "";
            const row = node("div", { class: "ss-section-row" }, heading, body, button("Remove", () => { row.remove(); dirty = true; })); row.classList.add("ss-custom-section"); customArea.append(row);
        }
        function promptDiscard() { return !dirty || window.confirm("Discard your unsaved changes?"); }
        function refreshPicker() {
            const filter = key(find.value); const chosen = picker.value;
            picker.replaceChildren(node("option", { value: "", text: "Select an entry" }), ...allNames.filter(n => key(n).includes(filter)).map(n => node("option", { value: n, text: n }))); picker.value = chosen;
        }
        async function refreshNames() {
            const ticket = ++context; const requestedType = type;
            try {
                const directory = await readPage(TYPES[requestedType].directory);
                const rows = cardType(requestedType) && !directory.missing ? directoryRecords(directory.text, requestedType).map(e => e.name) : [];
                const category = await categoryNames(requestedType); if (ticket !== context) return;
                allNames = unique([...rows, ...category]).sort((a, b) => a.localeCompare(b)); refreshPicker();
            } catch (error) { if (ticket === context) show("Could not load existing pages: " + error.message, true); }
        }
        function rulesUI() {
            const details = node("details", { class: "ss-wide" }); const groupsArea = node("div", {});
            const confirmed = node("input", { type: "checkbox" }); controls.requirementsConfirmed = confirmed;
            details.append(node("summary", { text: "Structured unlock requirements" }), node("p", { class: "ss-help", text: "All groups are required. Within each group, any one option is enough. Free text above is preserved for readers. Confirm these rules only after checking them." }), node("label", { class: "ss-checkbox" }, confirmed, "I confirmed the complete unlock rules, including when there are no requirements"), groupsArea);
            controls.rulesArea = groupsArea;
            details.append(button("Add required group", () => { addRuleGroup(groupsArea, []); dirty = true; })); fieldsArea.append(details);
        }
        function addRuleGroup(area, rules) {
            const group = node("div", { class: "ss-group" }); const rows = node("div", {});
            group.append(node("strong", { text: "Require any option in this group" }), rows, button("Add alternative", () => { addRule(rows, { kind: "trait", name: "" }); dirty = true; }), button("Remove group", () => { group.remove(); dirty = true; })); area.append(group);
            (rules.length ? rules : [{ kind: "trait", name: "" }]).forEach(rule => addRule(rows, rule));
        }
        function addRule(area, rule) {
            const kindControl = select([["medal", "Medal"], ["trait", "Trait"], ["skill", "Skill"], ["attribute", "Attribute"], ["other", "Other condition"]], rule.kind);
            const nameControl = node("input", { placeholder: "Exact page name or condition", "aria-label": "Requirement name" }); nameControl.value = rule.name || "";
            const amount = node("input", { type: "number", min: "1", max: "5", value: rule.min || 1, "aria-label": "Minimum attribute" });
            const row = node("div", { class: "ss-rule" }, kindControl, nameControl, amount, button("Remove", () => { row.remove(); dirty = true; }));
            kindControl.addEventListener("change", () => { amount.hidden = kindControl.value !== "attribute"; nameControl.placeholder = kindControl.value === "attribute" ? "Strength, Fortitude, Agility, Dexterity, Precision" : "Exact page name or condition"; }); amount.hidden = rule.kind !== "attribute"; area.append(row);
        }
        function renderFields() {
            fieldsArea.replaceChildren(); customArea.replaceChildren(); Object.keys(controls).forEach(k => delete controls[k]);
            const c = TYPES[type]; addField("name", "Exact page name", { help: "Use the exact name shown in game." }).required = true;
            if (c.rarity) addField("rarity", "Rarity", { options: [["", "Select rarity"], ...RARITIES] });
            if (cardType(type)) {
                addField("requirements", "Requirements on this article", { wide: true, textarea: true, help: "Optional. Traits and Skills do not show a requirements column in their directory." });
                addField("obtained", "How it is obtained", { value: c.obtained || "" });
                addField("tags", "Tags", { wide: true, placeholder: "Separate tags with commas", help: "Select existing tags below. Create, rename, or remove available tags in Manage tags." });
                const chosen = node("div", { class: "ss-tags ss-wide" });
                unique(registry[type] || []).sort().forEach(tag => chosen.append(button(tag, () => { controls.tags.value = unique([...splitTags(controls.tags.value), tag]).join(", "); dirty = true; }))); fieldsArea.append(chosen); rulesUI();
            }
            if (type === "item") {
                addField("itemCategory", "Item category", { options: ["Weapon", "Medical", "Utility", "Accessory", "Ammunition", "Grenade", "Explosive", "Currency", "Miscellaneous"] });
                addField("weaponType", "Weapon type", { options: ["Melee", "Gun"] });
                const update = () => { controls.weaponType.parentElement.hidden = controls.itemCategory.value !== "Weapon"; }; controls.itemCategory.addEventListener("change", update); update();
                addField("statistics", "Statistics", { textarea: true, wide: true }); addField("usage", "Usage", { textarea: true, wide: true });
            }
            if (type === "location") {
                addField("locationType", "Location type", { options: ["Country", "Region", "City", "Fort", "Airfield Base", "Landmark", "Other"] });
                [["country", "Country"], ["region", "Region"], ["parent", "Parent location"], ["placeLink", "Roblox Place link"]].forEach(([name, label]) => addField(name, label, { help: "Optional." }));
            }
            if (type === "character") {
                addField("characterType", "Character type", { options: ["Player", "NPC"] });
                addField("robloxUser", "Roblox username", { help: "Optional for Players." });
                const update = () => { controls.robloxUser.parentElement.hidden = controls.characterType.value !== "Player"; }; controls.characterType.addEventListener("change", update); update();
                [["fullName", "Full name"], ["aliases", "Aliases"], ["age", "Age"], ["birthplace", "Born in"], ["languages", "Languages"], ["height", "Height"], ["country", "Country"], ["regiment", "Regiment"], ["division", "Division"], ["rank", "Rank"], ["role", "Role"], ["squad", "Squad"], ["serviceStatus", "Service status"]].forEach(([name, label]) => addField(name, label));
                ATTRIBUTES.forEach(a => addField(a.toLowerCase(), a, { value: "1", number: true }));
                [["personality", "Personality"], ["background", "Background"], ["traits", "Traits"], ["medals", "Medals"]].forEach(([name, label]) => addField(name, label, { textarea: true, wide: true }));
                [["titanKills", "Titan kills"], ["abnormalKills", "Abnormal kills"], ["humanKills", "Human kills"], ["humanAssists", "Human assists"], ["bandages", "Bandages used"], ["bandageRemovals", "Bandage removals"], ["revivals", "Revivals"]].forEach(([name, label]) => addField(name, label, { number: true, value: "0" }));
            }
            addField("description", cardType(type) ? "In game card description" : "Description", { wide: true, textarea: true, placeholder: cardType(type) ? "Copy the exact description from the card" : "Enter confirmed information", help: cardType(type) ? "Keep the exact card wording here. Explain mechanics in the optional sections below." : "Optional. Used on the article and in its directory." });
            addField("image", type === "location" ? "Location image or map filename" : type === "character" ? "Character image filename" : type === "item" ? "Item image filename" : "Card art filename", { value: type === "character" ? "Character Image.png" : type === "location" ? "" : "Blank Card Art.png" });
            addField("imageCaption", "Image caption", { value: type === "character" ? "Image of the character." : type === "location" ? "Image or map of the location." : type === "item" ? "In game image of this item." : c.title + " card artwork." });
            if (type !== "character") { addField("status", "Status", { value: type === "location" ? "Accessible" : "Obtainable" }); addField("demo", "YouTube link or uploaded video or GIF", { placeholder: "YouTube link or Example.gif" }); addField("demoCaption", "Demonstration caption"); }
            if (cardType(type)) { addCustom("Effects", ""); addCustom("Usage", ""); }
            if (type === "character") { addCustom("History", ""); addCustom("Previous Information", ""); addCustom("Relationships", ""); }
            loaded = null; loadedName = ""; originalText = ""; dirty = false; previewArea.replaceChildren(); previewArea.open = false;
        }
        function getData() {
            const data = { type, sections: [] };
            Object.entries(controls).forEach(([name, control]) => { if (["rulesArea", "requirementsConfirmed"].includes(name)) return; data[name] = trim(control.value); });
            data.image = (data.image || "").replace(/^File:/i, "");
            data.tags = splitTags(data.tags); data.requirementsConfirmed = !!controls.requirementsConfirmed?.checked;
            data.rules = controls.rulesArea ? [...controls.rulesArea.children].map(group => [...group.querySelectorAll(".ss-rule")].map(row => { const nodes = row.querySelectorAll("select,input"); return { kind: nodes[0].value, name: trim(nodes[1].value), ...(nodes[0].value === "attribute" ? { min: Number(nodes[2].value) } : {}) }; })) : [];
            if (cardType(type) && !data.requirements && data.rules.length) {
                const label = rule => ["medal", "trait", "skill"].includes(rule.kind) ? "[[" + rule.name + "]] " + TYPES[rule.kind].title : rule.kind === "attribute" ? rule.min + " " + rule.name : rule.name;
                data.requirements = data.rules.map(group => group.map(label).join(" or ")).join(", ");
            }
            customArea.querySelectorAll(".ss-custom-section").forEach(row => { const inputs = row.querySelectorAll("input,textarea"); if (trim(inputs[0].value) && trim(inputs[1].value)) data.sections.push({ title: trim(inputs[0].value), content: trim(inputs[1].value) }); });
            if (type === "character" && data.characterType !== "Player") data.robloxUser = "";
            return data;
        }
        function validate(data) {
            if (!titleValid(data.name)) throw new Error("Enter a valid page name without a namespace or wiki formatting.");
            if (type === "medal" && !RARITIES.includes(data.rarity)) throw new Error("Select a rarity.");
            if (cardType(type) && !rulesValid(data.rules)) throw new Error("Each requirement group needs a named option. Attribute minimums must be from 1 through 5.");
            if (cardType(type) && data.requirementsConfirmed && data.requirements && key(data.requirements) !== "none" && !data.rules.length) throw new Error("Add structured rules for the written requirements before confirming them. Leave the confirmation unchecked if the complete rules are not known yet.");
            if (data.tags.some(tag => tag.length > 60 || /[<>|\[\]{}]/.test(tag))) throw new Error("Tags must be short plain text labels.");
            if (data.sections.some(s => /[=\n\r<>]/.test(s.title))) throw new Error("Section names cannot contain wiki heading markup.");
            if (data.sections.some(s => ["description", "requirements", "demonstration"].includes(key(s.title)))) throw new Error("Use the dedicated Description, Requirements, or Demonstration fields for those sections.");
            if (data.demo && (/^https?:\/\//i.test(data.demo) ? /[\s\[\]<>]/.test(data.demo) : /[|\[\]{}<>\n\r]/.test(data.demo))) throw new Error("Enter a valid demonstration link or file name.");
            if (data.placeLink && !/^https:\/\/(?:www\.)?roblox\.com\/games\/\d+(?:\/[^\s\[\]<>]*)?$/i.test(data.placeLink)) throw new Error("Use a Roblox games link or leave the Place link blank.");
            if (mode === "edit" && !loaded) throw new Error("Load an existing page before editing.");
        }
        function articleFields(data) {
            const previous = loaded ? template(originalText, TYPES[type].template).fields : {}; const fields = { ...previous };
            fields.name = "{{PAGENAME}}"; fields.image = data.image; fields.imagecaption = data.imageCaption; fields.description = data.description;
            if (cardType(type)) { fields.requirements = key(data.requirements) === "none" ? "" : data.requirements; fields.obtained = data.obtained; fields.tags = data.tags.join(", "); }
            if (type === "medal") fields.rarity = data.rarity;
            if (type !== "character") fields.status = data.status;
            if (type === "item") { fields.category = data.itemCategory; fields.weapontype = data.itemCategory === "Weapon" ? data.weaponType : ""; }
            if (type === "location") { fields.type = data.locationType; fields.country = data.country; fields.region = data.region; fields.parent = data.parent; fields.placelink = data.placeLink; }
            if (type === "character") {
                ["fullName", "aliases", "robloxUser", "age", "birthplace", "languages", "height", "country", "regiment", "division", "personality", "background", "strength", "fortitude", "agility", "dexterity", "precision", "rank", "role", "squad", "serviceStatus", "titanKills", "abnormalKills", "humanKills", "humanAssists", "bandages", "bandageRemovals", "revivals"].forEach(name => { fields[name.toLowerCase()] = data[name] || ""; });
                fields.type = data.characterType; fields.traits = linkedLines(data.traits); fields.medals = linkedLines(data.medals); delete fields.status;
            }
            return fields;
        }
        function linkedLines(value) { return trim(value).split("\n").map(trim).filter(Boolean).map(v => /^\*/.test(v) ? v : v.startsWith("[[") ? "* " + v : "* [[" + v + "]]").join("\n"); }
        function buildArticle(data) {
            const fields = articleFields(data); const tpl = templateText(TYPES[type].template, fields); const out = [tpl];
            let lead = "'''{{PAGENAME}}''' is " + (type === "item" ? "an Item" : "a " + TYPES[type].title) + " in Seashell.";
            let prefix = ""; let categories = ["[[Category:" + TYPES[type].directory + "]]", "[[Category:Community submissions]]"];
            if (loaded) {
                const previous = template(originalText, TYPES[type].template); prefix = originalText.slice(0, previous.start);
                const tail = originalText.slice(previous.end); const firstHeading = /^==[^=\n]+==[ \t]*$/m.exec(tail);
                const existingLead = cleanTail(firstHeading ? tail.slice(0, firstHeading.index) : tail); if (existingLead) lead = existingLead;
                categories = unique([...categories, ...originalText.match(/\[\[Category:[^\]]+\]\]/gi) || []]);
            }
            out.push("", lead);
            const add = (title, content) => { if (trim(content)) out.push("", "==" + title + "==", trim(content)); };
            add("Description", data.description); if (cardType(type) && key(data.requirements) !== "none") add("Requirements", data.requirements);
            if (type === "item") { add("Statistics", data.statistics); add("Usage", data.usage); }
            data.sections.forEach(s => add(s.title, s.content)); if (type !== "character") add("Demonstration", demoText(data.demo, data.demoCaption));
            if (type === "item") { categories = categories.filter(c => !/^\[\[Category:(?:Weapons|Guns|Melee Weapons|(?:Medical|Utility|Accessory|Ammunition|Grenade|Explosive|Currency|Miscellaneous) Items)\]\]$/i.test(c)); categories.push(...(data.itemCategory === "Weapon" ? ["[[Category:Weapons]]", "[[Category:" + (data.weaponType === "Gun" ? "Guns" : "Melee Weapons") + "]]"] : ["[[Category:" + data.itemCategory + " Items]]"])); }
            if (type === "location") { const map = { Country: "Countries", Region: "Regions", City: "Cities", Fort: "Forts", "Airfield Base": "Airfield Bases", Landmark: "Landmarks", Other: "Other Locations" }; categories = categories.filter(c => !Object.values(map).some(v => key(c) === key("[[Category:" + v + "]]"))); categories.push("[[Category:" + map[data.locationType] + "]]"); }
            if (cardType(type)) out.push("", metaLine(entryMetadata(data)));
            out.push("", ...unique(categories)); return prefix + out.join("\n").trimEnd() + "\n";
        }
        async function loadEntry() {
            if (busy) return; const name = picker.value; if (!name) return show("Select a page first.", true); if (!promptDiscard()) return;
            busy = true; loadButton.disabled = true; const requestedType = type;
            try {
                const page = await readPage(name); if (page.missing) throw new Error("This page no longer exists.");
                const tpl = template(page.text, TYPES[requestedType].template); if (!tpl.found) throw new Error("The selected article does not use Template:" + TYPES[requestedType].template + ". Edit source instead so its content is preserved.");
                renderFields(); loaded = page; loadedName = name; originalText = page.text; controls.name.value = name; controls.name.disabled = true;
                const mapping = { imageCaption: "imagecaption", itemCategory: "category", weaponType: "weapontype", locationType: "type", placeLink: "placelink", characterType: "type" };
                Object.entries(controls).forEach(([fieldName, control]) => { if (["name", "rulesArea", "requirementsConfirmed"].includes(fieldName)) return; const wikiName = mapping[fieldName] || fieldName.toLowerCase(); if (tpl.fields[wikiName] !== undefined) control.value = tpl.fields[wikiName]; });
                const data = meta(page.text); if (controls.tags && tpl.fields.tags === undefined) controls.tags.value = (data.tags || []).join(", ");
                if (controls.requirementsConfirmed) controls.requirementsConfirmed.checked = data.requirementsConfirmed === true;
                if (controls.rulesArea && rulesValid(data.rules)) data.rules.forEach(group => addRuleGroup(controls.rulesArea, group));
                const sections = sectionsOf(page.text).map(s => ({ ...s, content: cleanTail(s.content) })); customArea.replaceChildren();
                sections.forEach(s => {
                    const title = key(s.title);
                    if (title === "description") { if (!controls.description.value) controls.description.value = s.content; return; }
                    if (title === "requirements") { if (controls.requirements && !controls.requirements.value) controls.requirements.value = s.content; return; }
                    if (title === "demonstration" && controls.demo) { const demo = parseDemo(s.content); controls.demo.value = demo.demo; controls.demoCaption.value = demo.demoCaption; return; }
                    if (type === "item" && ["statistics", "usage"].includes(title)) { controls[title].value = s.content; return; }
                    if (s.content) addCustom(s.title, s.content);
                });
                if (controls.characterType) controls.characterType.dispatchEvent(new Event("change")); if (controls.itemCategory) controls.itemCategory.dispatchEvent(new Event("change"));
                dirty = false; show("Loaded " + name + ". Existing descriptions and custom sections are preserved.");
            } catch (error) { show(error.message, true); } finally { busy = false; loadButton.disabled = false; }
        }
        async function deleteEntry() {
            if (busy || !userIsAdmin) return; const name = picker.value; if (!name) return show("Select a page first.", true);
            if (!window.confirm('Delete "' + name + '" and remove its directory row?')) return;
            busy = true; removeButton.disabled = true; let deleted = false;
            try {
                await request({ action: "delete", title: name, reason: "Deleted through Content Manager" }, true); deleted = true;
                const directory = await readPage(TYPES[type].directory); const updated = removeDirectoryRow(directory.text, name);
                if (!directory.missing && updated !== directory.text) await writePage(directory.title, updated, "Removed " + name + " from directory", directory, false);
                renderFields(); await refreshNames(); show("Deleted " + name + " and removed its directory row.");
            } catch (error) { show((deleted ? "The article was deleted, but directory cleanup needs attention. " : "") + error.message, true); }
            finally { busy = false; removeButton.disabled = false; }
        }
        function tabs() {
            typeTabs.replaceChildren(...Object.entries(TYPES).map(([id, c]) => { const b = button(c.directory, () => switchContext(id, mode)); b.classList.toggle("ss-active", type === id); return b; }));
            modeTabs.replaceChildren(...["create", "edit", ...(userIsAdmin ? ["delete"] : [])].map(id => { const b = button(id[0].toUpperCase() + id.slice(1), () => switchContext(type, id)); b.classList.toggle("ss-active", mode === id); return b; }));
            pickerArea.hidden = mode === "create"; form.hidden = mode === "delete"; loadButton.hidden = mode !== "edit"; removeButton.hidden = mode !== "delete";
            submit.textContent = (mode === "edit" ? "Save " : "Create ") + TYPES[type].title; tagsArea.hidden = !cardType(type) || !userIsAdmin;
        }
        function switchContext(nextType, nextMode) { if (busy || !promptDiscard()) return; type = nextType; mode = nextMode; renderFields(); tabs(); renderTagManager(); refreshNames(); }
        function renderTagManager() {
            tagsArea.replaceChildren(tagsSummary); if (!cardType(type) || !userIsAdmin) return;
            const available = select([["", "Select a tag"], ...(registry[type] || []).sort()]); const name = node("input", { placeholder: "Tag name", "aria-label": "Tag name" });
            tagsArea.append(node("div", { class: "ss-grid" }, field("Existing tag", available), field("New or replacement name", name)), node("div", { class: "ss-row" }, button("Create tag", () => tagChange("create", "", name.value)), button("Rename tag", () => tagChange("rename", available.value, name.value)), button("Remove tag", () => tagChange("remove", available.value, ""))), node("p", { class: "ss-help", text: "Tag changes affect this content type. Renaming or removing a tag updates its directory entries and article tags without changing descriptions." }));
        }
        async function tagChange(operation, oldTag, newTag) {
            if (busy || !userIsAdmin) return; newTag = trim(newTag);
            if (operation !== "remove" && (!newTag || newTag.length > 60 || /[,\n<>|\[\]{}]/.test(newTag))) return show("Use a short plain text tag name without commas.", true);
            if (operation !== "create" && !oldTag) return show("Select an existing tag.", true);
            if (operation !== "remove" && (registry[type] || []).some(t => key(t) === key(newTag) && key(t) !== key(oldTag))) return show("That tag already exists.", true);
            if (!promptDiscard()) return;
            if (!window.confirm(operation === "create" ? 'Create tag "' + newTag + '"?' : 'Update every ' + TYPES[type].title + ' using tag "' + oldTag + '"? This changes tags only.')) return;
            busy = true; const completed = []; const failures = [];
            try {
                await loadRegistry(); const next = clone(registry);
                if (operation === "create") next[type] = unique([...next[type], newTag]);
                else next[type] = unique(next[type].filter(t => key(t) !== key(oldTag)).concat(operation === "rename" ? [newTag] : []));
                if (operation !== "create") {
                    const directory = await readPage(TYPES[type].directory); const entries = directoryRecords(directory.text, type);
                    const affected = entries.filter(entry => entry.tags.some(tag => key(tag) === key(oldTag)));
                    const names = unique([...affected.map(e => e.name), ...await categoryNames(type)]);
                    for (let index = 0; index < names.length; index += 1) {
                        const name = names[index]; show("Checking tag updates " + (index + 1) + " of " + names.length + ". Completed: " + completed.length);
                        try {
                            const page = await readPage(name); if (page.missing) continue;
                            const tpl = template(page.text, TYPES[type].template); if (!tpl.found) continue; const data = meta(page.text);
                            const entry = entries.find(e => key(e.name) === key(name)); const current = splitTags(tpl.fields.tags ?? (data.tags || entry?.tags || []).join(","));
                            const articleNeedsUpdate = current.some(tag => key(tag) === key(oldTag));
                            const directoryNeedsUpdate = entry?.tags.some(tag => key(tag) === key(oldTag));
                            if (!articleNeedsUpdate && !directoryNeedsUpdate) continue;
                            const changed = unique(current.filter(t => key(t) !== key(oldTag)).concat(operation === "rename" ? [newTag] : []));
                            const fields = { ...tpl.fields, tags: changed.join(", ") };
                            let text = page.text.slice(0, tpl.start) + templateText(TYPES[type].template, fields) + page.text.slice(tpl.end);
                            text = replaceMeta(text, { ...data, tags: changed }); if (articleNeedsUpdate) await writePage(name, text, "Updated content tag " + oldTag, page, false);
                            if (entry) { const freshDirectory = await readPage(TYPES[type].directory); const updated = updateDirectory(freshDirectory.text, { ...entry, tags: changed, image: fields.image || entry.image }); await writePage(freshDirectory.title, updated, "Updated tags for " + name, freshDirectory, false); }
                            completed.push(name);
                        } catch (error) { failures.push(name + ": " + error.message); }
                    }
                    if (failures.length) { show("Tag changes completed for " + completed.length + " entries. These need attention: " + failures.join("; ") + ". The old tag remains available so you can retry.", true); return; }
                }
                await saveRegistry(next); renderFields(); renderTagManager(); show("Tag " + (operation === "create" ? "created" : operation === "rename" ? "renamed" : "removed") + ". " + completed.length + " entries updated.");
            } catch (error) { show("Tag update failed. " + completed.length + " entries already changed. " + error.message, true); }
            finally { busy = false; }
        }
        form.addEventListener("input", () => { dirty = true; }); form.addEventListener("change", () => { dirty = true; }); find.addEventListener("input", refreshPicker);
        form.addEventListener("submit", async event => {
            event.preventDefault(); if (busy) return; let saved = false;
            try {
                const data = getData(); validate(data); busy = true; submit.disabled = true;
                const target = mode === "edit" ? loadedName : data.name;
                const directory = await readPage(TYPES[type].directory); if (directory.missing) throw new Error("Create the directory page first.");
                const updatedDirectory = updateDirectory(directory.text, data); // Verify insertion before creating the article.
                const page = mode === "edit" ? loaded : await readPage(target);
                if (mode === "create" && !page.missing) throw new Error("That page already exists. Use Edit instead.");
                show("Saving " + target + "...");
                const written = await writePage(target, buildArticle(data), (mode === "create" ? "Created " : "Updated ") + TYPES[type].title + " through Content Manager", page, mode === "create"); saved = true;
                // Keep the saved base revision even if the separate directory edit fails.
                loaded = { ...page, missing: false, text: buildArticle(data), id: written.edit.newrevid || page.id, timestamp: undefined, start: undefined }; originalText = loaded.text; loadedName = target;
                await writePage(directory.title, updatedDirectory, "Updated directory entry for " + target, directory, false);
                if (cardType(type)) {
                    const unknown = data.tags.filter(tag => !(registry[type] || []).some(t => key(t) === key(tag)));
                    if (unknown.length) show("Saved successfully. These tags are assigned but not registered in Manage tags: " + unknown.join(", ") + ". An administrator can register them.");
                    else show("Saved " + target + " and its directory entry.");
                } else show("Saved " + target + " and its directory entry.");
                dirty = false; if (mode === "create") renderFields(); await refreshNames();
            } catch (error) { if (saved && mode === "create") { mode = "edit"; controls.name.disabled = true; tabs(); } show((saved ? "The article was saved, but its directory update failed. Stay in Edit and save again after resolving the problem. " : "") + error.message, true); }
            finally { busy = false; submit.disabled = false; }
        });
        window.addEventListener("beforeunload", event => { if (dirty || busy) { event.preventDefault(); event.returnValue = ""; } });
        try { await loadRegistry(); } catch (error) { show("Could not load the tag registry. Existing article tags still work. " + error.message, true); }
        renderFields(); tabs(); renderTagManager(); await refreshNames();
    }
    async function connections(root) {
        if (root.dataset.ready) return; root.dataset.ready = "1"; root.classList.add("ss-tools", "ss-entry-connections");
        const title = root.dataset.title || mw.config.get("wgPageName").replace(/_/g, " ");
        try {
            const page = await readPage("Medals"); const entries = directoryRecords(page.text, "medal").filter(entry => requirementNames(entry).some(name => key(name) === key(title)));
            if (!entries.length) { root.textContent = ""; return; }
            root.replaceChildren(node("h3", { text: "Medals unlocked by " + title }), node("ul", {}, ...entries.map(entry => node("li", {}, link(entry.name), " (" + entry.rarity + ")"))));
            const articleBody = root.closest(".mw-parser-output"); if (articleBody) articleBody.append(root);
        } catch (error) { root.replaceChildren(link("Medals", "Browse Medal requirements")); }
    }
    async function boot() {
        if (!window.mw?.loader || !document.body) {
            window.SeashellCardsV2.attempts = (window.SeashellCardsV2.attempts || 0) + 1;
            if (window.SeashellCardsV2.attempts < 150) window.setTimeout(boot, 100);
            else { window.SeashellCardsV2.status = "startup failed"; const root = document.getElementById("seashell-submission-root"); if (root) root.textContent = "Fandom's JavaScript loader was not available. Refresh the page to try again."; }
            return;
        }
        const pageName = mw.config.get("wgPageName") || "";
        if (!["Seashell_Wiki:Content_Manager", "Medals", "Traits", "Skills"].includes(pageName) && !document.querySelector(".ss-entry-connections")) { window.SeashellCardsV2.status = "inactive"; return; }
        try {
            await new Promise((resolve, reject) => mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(resolve, reject));
            api = new mw.Api(); userIsAdmin = (mw.config.get("wgUserGroups") || []).some(g => ["sysop", "bureaucrat", "staff"].includes(g));
            document.head.append(node("style", { text: styles }));
            for (const root of document.querySelectorAll(".ss-card-browser[data-kind]")) if (cardType(root.dataset.kind)) await browser(root, root.dataset.kind);
            const managerRoot = document.getElementById("seashell-submission-root"); if (pageName === "Seashell_Wiki:Content_Manager" && managerRoot) await manager(managerRoot);
            for (const root of document.querySelectorAll(".ss-entry-connections")) await connections(root);
            window.SeashellCardsV2.status = "ready"; window.SeashellSubmissionStatus = "loaded";
        } catch (error) { window.SeashellCardsV2.status = "error"; console.error("Seashell Content Manager", error); const root = document.getElementById("seashell-submission-root"); if (root) root.textContent = "The Content Manager could not load. " + error.message; }
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
}());