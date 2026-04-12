/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

console.log("Поиск загружен");

function normalizeSearchText(str) {
    str = (str || "").toLowerCase();

    var map = {
        "а": "a", "á": "a", "à": "a", "â": "a", "ä": "a", "ã": "a", "å": "a",
        "æ": "ae",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e", "ё": "e", "ë": "e", "è": "e", "é": "e", "ê": "e", "ě": "e",
        "ж": "zh",
        "з": "z",
        "и": "i", "й": "i", "í": "i", "ì": "i", "ï": "i", "î": "i",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o", "ó": "o", "ò": "o", "ô": "o", "ö": "o", "õ": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u", "ú": "u", "ù": "u", "ü": "u", "û": "u",
        "ф": "f",
        "х": "h",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "sch",
        "ы": "y",
        "э": "e",
        "ю": "yu",
        "я": "ya",
        "œ": "oe",
        "ß": "ss"
    };

    return str.replace(/[\u00C0-\u024F\u0400-\u04FF]/g, function(ch) {
        return map[ch] || ch;
    });
}

function hasClass(el, cls) {
    return !!(el && el.classList && el.classList.contains(cls));
}

function getDirectChildrenByClass(el, cls) {
    var out = [];
    var i;

    if (!el || !el.children) return out;

    for (i = 0; i < el.children.length; i++) {
        if (hasClass(el.children[i], cls)) {
            out.push(el.children[i]);
        }
    }

    return out;
}

function getIndexOfChild(parent, child) {
    var i;

    if (!parent || !parent.children) return -1;

    for (i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === child) {
            return i;
        }
    }

    return -1;
}

function updateSelection(items, input) {
    var i;

    for (i = 0; i < items.length; i++) {
        items[i].style.background = "";
    }

    var selected = items[input._selectedIndex];
    if (selected) {
        selected.style.background = "#5f5a5a";
        selected.scrollIntoView({ block: "nearest" });
    }
}

function isInsidePortableInfobox(el) {
    var node = el;

    while (node) {
        if (hasClass(node, "portable-infobox")) {
            return true;
        }
        node = node.parentElement;
    }

    return false;
}

function findFirstNonInfoboxTabber(root) {
    var tabbers, i, tabber;

    if (!root || !root.querySelectorAll) return null;

    tabbers = root.querySelectorAll(".tabber.wds-tabber");
    for (i = 0; i < tabbers.length; i++) {
        tabber = tabbers[i];

        if (isInsidePortableInfobox(tabber)) {
            continue;
        }

        if (tabber.closest && tabber.closest(".pi-image-collection")) {
            continue;
        }

        return tabber;
    }

    return null;
}

function getValidTabbers(root) {
    var tabbers, out, i, tabber;

    out = [];
    if (!root || !root.querySelectorAll) return out;

    tabbers = root.querySelectorAll(".tabber.wds-tabber");
    for (i = 0; i < tabbers.length; i++) {
        tabber = tabbers[i];

        if (isInsidePortableInfobox(tabber)) {
            continue;
        }

        if (tabber.closest && tabber.closest(".pi-image-collection")) {
            continue;
        }

        out.push(tabber);
    }

    return out;
}

function getTabIndex(tabber, tab) {
    var tabsUl = tabber ? tabber.querySelector(".wds-tabs") : null;
    return getIndexOfChild(tabsUl, tab);
}

function getContentByTabIndex(tabber, index) {
    var contents, i;

    if (!tabber) return null;

    contents = getDirectChildrenByClass(tabber, "wds-tab__content");

    if (index < 0 || index >= contents.length) return null;

    return contents[index];
}

function getParentTabForTabber(tabber) {
    var node, parentTabber, contents, parentIndex, parentTabsUl;
    var i;

    node = tabber ? tabber.parentElement : null;
    while (node && !hasClass(node, "wds-tab__content")) {
        node = node.parentElement;
    }

    if (!node) return null;

    parentTabber = node.parentElement;
    if (!parentTabber || !hasClass(parentTabber, "tabber") || !hasClass(parentTabber, "wds-tabber")) {
        return null;
    }

    contents = getDirectChildrenByClass(parentTabber, "wds-tab__content");
    parentIndex = -1;

    for (i = 0; i < contents.length; i++) {
        if (contents[i] === node) {
            parentIndex = i;
            break;
        }
    }

    if (parentIndex === -1) return null;

    parentTabsUl = parentTabber.querySelector(".wds-tabs");
    if (!parentTabsUl || !parentTabsUl.children[parentIndex]) return null;

    return parentTabsUl.children[parentIndex];
}

function getTabPath(tab) {
    var path = [];
    var currentTab = tab;
    var safety = 0;
    var tabber, parentTab;

    while (currentTab && safety < 20) {
        safety++;

        path.unshift(currentTab);

        tabber = currentTab.closest(".tabber.wds-tabber");
        if (!tabber) break;

        parentTab = getParentTabForTabber(tabber);
        if (!parentTab) break;

        currentTab = parentTab;
    }

    return path;
}

function openTabPath(tab) {
    var path = getTabPath(tab);
    var i;

    for (i = 0; i < path.length; i++) {
        path[i].click();
    }

    if (tab && tab.scrollIntoView) {
        tab.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function handleSearchResultClick() {
    if (this && this._tabElement) {
        openTabPath(this._tabElement);
    }
}

function handleResultClick() {
    var input = this._input;
    var text = this.textContent;

    input.value = text;

    openTabPath(this._tabElement);

    // очистка списка
    var results = input._results;
    results.innerHTML = "";
}

function handleSearchInput(e) {
    var input = this;
    var box = input._box;
    var items = input._items;
    var results = input._results;
    var q = normalizeSearchText(input.value);
    var safeQuery, regex;
    var filtered = [];
    var x, y;

    results.innerHTML = "";
    input._resultsList = results.children;
    input._selectedIndex = -1;

    var empty = box.querySelector(".search-empty");
    if (empty) empty.style.display = "none";

    if (!q) return;

    for (x = 0; x < items.length; x++) {
        var item = items[x];
        var index = normalizeSearchText(item.title).indexOf(q);

        if (index !== -1) {
            filtered.push({
                item: item,
                index: index
            });
        }
    }

    filtered.sort(function(a, b) {
        return a.index - b.index;
    });

    safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    regex = new RegExp("(" + safeQuery + ")", "i");

    for (y = 0; y < filtered.length; y++) {
        var obj = filtered[y].item;
        var div = document.createElement("div");

        div.className = "search-item";
        div.innerHTML = obj.title.replace(regex, "<b>$1</b>");
        div._tabElement = obj.element;
        div._input = input;
        div.addEventListener("click", handleResultClick);

        results.appendChild(div);
    }

    if (filtered.length === 0 && empty) {
        empty.style.display = "block";
    }
}

function handleKeyDown(e) {
    var input = this;
    var items = input._resultsList;

    if (!items || items.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        input._selectedIndex++;
        if (input._selectedIndex >= items.length) input._selectedIndex = 0;
        updateSelection(items, input);
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        input._selectedIndex--;
        if (input._selectedIndex < 0) input._selectedIndex = items.length - 1;
        updateSelection(items, input);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        if (input._selectedIndex >= 0) {
            items[input._selectedIndex].click();
        }
    }
}

function initCustomSearch() {
    var boxes = document.querySelectorAll(".custom-search-box");
    var i, j, k;

    for (i = 0; i < boxes.length; i++) {
        var box = boxes[i];

        if (box.dataset.loaded) continue;
        box.dataset.loaded = "true";

        var ui = box.querySelector(".search-ui");
        var results = box.querySelector(".search-results");

        if (!ui || !results) continue;

        var input = document.createElement("input");
        input.placeholder = "Введите название...";
        ui.appendChild(input);

        var tabber = null;
        var validTabbers = [];

        if (box.parentElement) {
            tabber = findFirstNonInfoboxTabber(box.parentElement);
        }

        if (!tabber) {
            tabber = findFirstNonInfoboxTabber(document);
        }

        if (!tabber) continue;

        var tabs = tabber.querySelectorAll(".wds-tabs__tab");
        var items = [];

        for (k = 0; k < tabs.length; k++) {
            var tab = tabs[k];

            if (isInsidePortableInfobox(tab)) {
                continue;
            }

            var label = tab.querySelector(".wds-tabs__tab-label");

            items.push({
                title: label ? label.textContent.trim() : "Без названия",
                element: tab
            });
        }

        input._box = box;
        input._items = items;
        input._results = results;
        input._selectedIndex = -1;
        input.addEventListener("input", handleSearchInput);
        input.addEventListener("keydown", handleKeyDown);
    }
}

document.addEventListener("click", function(e) {
    var boxes = document.querySelectorAll(".custom-search-box");
    var i;

    for (i = 0; i < boxes.length; i++) {
        if (!boxes[i].contains(e.target)) {
            var results = boxes[i].querySelector(".search-results");
            if (results) results.innerHTML = "";
        }
    }
});

window.addEventListener("load", initCustomSearch);
mw.hook("wikipage.content").add(initCustomSearch);

;(function fix() {
    "use strict";
function fixTextField(field, fixer) {
    if (!field) return;

    var text = field.textContent;
    if (typeof text !== "string") return;

    text = normalizeSpaces(text);
    text = fixer(text);

    if (typeof text === "string") {
        field.textContent = text;
    }
}

function fixType(field) {
    fixTextField(field, function (text) {
        var key = text.toLowerCase();

        var map = {
            "живой танк": "Живой танк"
        };

        return map[key] || capitalizeFirst(key);
    });
}

function fixView(field) {
    fixTextField(field, function (text) {
        var key = text.toLowerCase();

        var map = {
            "тяжелый": "Тяжёлый",
            "тяжёлый": "Тяжёлый",
            "тяжелый танк": "Тяжёлый танк",
            "тяжёлый танк": "Тяжёлый танк",

            "средний": "Средний",
            "средний танк": "Средний танк",

            "легкий": "Лёгкий",
            "лёгкий": "Лёгкий",
            "легкий танк": "Лёгкий танк",
            "лёгкий танк": "Лёгкий танк",

            "сверхтяжелый": "Сверхтяжёлый",
            "сверхтяжёлый": "Сверхтяжёлый",
            "сверхтяжелый танк": "Сверхтяжёлый танк",
            "сверхтяжёлый танк": "Сверхтяжёлый танк"
        };

        return map[key] || capitalizeFirst(key);
    });
}

function fixSide(field) {
    if (!field) return;

    var span = field.querySelector("span");
    var text = field.textContent;

    if (typeof text !== "string") return;

    text = normalizeSpaces(text).toLowerCase();

    var map = {
        "третий рейх": "Третий рейх",
        "российская империя": "Российская империя",
        "британская империя": "Британская империя",
        "японская империя": "Японская империя",
        "империя левиафана": "Империя Левиафана",
        "нацистская германия": "Нацистская Германия"
    };

    var fixed = map[text] || text;

    if (span) {
        span.textContent = fixed;
    } else {
        field.textContent = fixed;
    }
}

function normalizeSpaces(text) {
    return text.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
}

function capitalizeFirst(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}
    var nationalityColors = {
        "немец": "#808080",
        "совет": "#008000",
        "русский": "#808000",
        "японец": "#F35959",
        "американец": "#88532f",
        "британец": "#ccc7a4",
        "француз": "#008080",
        "итальянец": "#ffd700"
    };

    var DEMONIZED_COLOR = "#cc0605";

var fixRules = {
    "тип": function (infobox) {
        var field = infobox.querySelector('[data-source="тип"] .pi-data-value');
        fixType(field);
    },

    "вид": function (infobox) {
        var field = infobox.querySelector('[data-source="вид"] .pi-data-value');
        fixView(field);
    },

    "национальность": function (infobox) {
        var field = infobox.querySelector('[data-source="национальность"] .pi-data-value');
        fixNationality(field);
    },

    "первое_появление": function (infobox) {
        fixDataSource(infobox, "первое_появление", function (text) {
            return fixEpisodeFormat(text);
        });
    },

   "сторона": function (infobox) {
    var field = infobox.querySelector('[data-source="сторона"] .pi-data-value');
    fixSide(field);
	}
};

    function fixNationality(field) {
        if (!field) return;

        var text = field.textContent;
        if (typeof text !== "string") return;

        text = normalizeSpaces(text).toLowerCase();

        var words = text.split(" ");
        var prefix = "";
        var nationality = "";

        if (words[0] === "демонизированный") {
            prefix = "Демонизированный";
            nationality = words[1] || "";
        } else {
            nationality = words[0] || "";
        }

        nationality = normalizeSpaces(nationality).toLowerCase();

        if (!nationality) {
            field.textContent = prefix || "";
            return;
        }

        var color = nationalityColors[nationality] || "#808080";
        var nationalityText = prefix ? nationality : capitalizeFirst(nationality);

        if (prefix) {
            field.innerHTML =
                '<span style="color:' + DEMONIZED_COLOR + '">Демонизированный</span> ' +
                '<span style="color:' + color + '">' + nationalityText + '</span>';
        } else {
            field.innerHTML =
                '<span style="color:' + color + '">' + nationalityText + '</span>';
        }
    }

    function applyFix(infobox) {
        if (!infobox) return;
        if (infobox.dataset.fixApplied === "1") return;

        infobox.dataset.fixApplied = "1";

        for (var key in fixRules) {
            if (fixRules.hasOwnProperty(key)) {
                fixRules[key](infobox);
            }
        }

        console.log("Исправлен инфобокс", infobox);
    }

    function findNextInfobox(marker) {
        var el = marker.parentElement;

        while (el && el.nextElementSibling) {
            el = el.nextElementSibling;

            if (el.classList && el.classList.contains("portable-infobox")) {
                return el;
            }
        }

        return null;
    }

    function runAutoFix() {
        var markers = document.querySelectorAll(".auto-fix");
        if (markers.length === 0) return;

        markers.forEach(function (marker) {
            var infobox =
                marker.closest(".portable-infobox") ||
                findNextInfobox(marker);

            if (!infobox) return;

            applyFix(infobox);
        });
    }

    function fixDataSource(infobox, sourceName, fixer) {
        var field = infobox.querySelector('[data-source="' + sourceName + '"] .pi-data-value');
        if (!field) return;

        walkTextNodes(field, function (nodeValue) {
            return fixer(nodeValue);
        });
    }

    function walkTextNodes(el, callback) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        var node;

        while ((node = walker.nextNode())) {
            var value = node.nodeValue;

            if (typeof value !== "string" || value.trim() === "") continue;

            var result = callback(value);
            if (typeof result === "string") {
                node.nodeValue = result;
            }
        }
    }

    function fixEpisodeFormat(text) {
        if (typeof text !== "string") return text;

        text = text.replace(
            /(\d+)\s*сезон[a-zа-яё]*[,\s]*(\d+)\s*серия[a-zа-яё]*/gi,
            function (_, s, e) {
                return s + " сезон, " + e + " серия";
            }
        );

        text = text.replace(/\s*[—–-]+\s*/g, " - ");

        if (!/сезон,\s*\d+\s*серия\s*-/.test(text)) {
            text = text.replace(
                /(\d+\s+сезон,\s*\d+\s+серия)/i,
                "$1 -"
            );
        }

        text = text.replace(
            /-\s*(.*)/,
            function (_, name) {
                if (typeof name !== "string") return _;

                name = normalizeSpaces(name);
                name = name.replace(/^"+|"+$/g, "");

                return '- "' + name + '"';
            }
        );

        text = text.replace(/-\s*-\s*/g, "- ");

        return text;
    }

    function boot() {
        runAutoFix();

        if (window.mw && mw.hook) {
            mw.hook("wikipage.content").add(function () {
                runAutoFix();
            });
        }

        var observer = new MutationObserver(function () {
            var marker = document.querySelector(".auto-fix");
            if (marker) {
                runAutoFix();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }

    window.runAutoFix = runAutoFix;
    window.applyFix = applyFix;
    window.fixEpisodeFormat = fixEpisodeFormat;
    window.fixNationality = fixNationality;
})();




/* другое */




(function () {
    "use strict";

    if (window.__drpCustomTocFixLoaded) return;
    window.__drpCustomTocFixLoaded = true;

    var scheduled = false;
    var building = false;
    var lastSignature = "";

    function hasMarker() {
        return !!document.querySelector(".drp-content-template-marker");
    }

    function getPageRoot() {
        return document.querySelector(".mw-parser-output") || document.body;
    }

    function cleanText(text) {
        return String(text || "")
            .replace(/\[\]/g, "")
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "");
    }

    function slugify(text) {
        return (text || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^\w\u0400-\u04FF\-]+/g, "")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");
    }

    function ensureId(el) {
        if (el.id) return el.id;

        var base = slugify(el.textContent) || "section";
        var id = base;
        var i = 2;

        while (document.getElementById(id)) {
            id = base + "_" + i;
            i++;
        }

        el.id = id;
        return id;
    }

    function getLevel(tag) {
        tag = String(tag || "").toLowerCase();
        if (tag === "h2") return 1;
        if (tag === "h3") return 2;
        if (tag === "h4") return 3;
        if (tag === "h5") return 4;
        if (tag === "h6") return 5;
        return 1;
    }

    function isValidHeading(h) {
        if (!h) return false;

        if (h.closest("#toc") || h.closest(".toc")) return false;
        if (h.closest(".portable-infobox")) return false;
        if (h.closest(".navbox")) return false;
        if (h.closest(".mw-collapsible")) return false;

        return true;
    }

    function getDirectTabContents(tabber) {
        var result = [];
        var i;

        if (!tabber || !tabber.children) return result;

        for (i = 0; i < tabber.children.length; i++) {
            var el = tabber.children[i];
            if (el && el.classList && el.classList.contains("wds-tab__content")) {
                result.push(el);
            }
        }

        return result;
    }

    function getHeadingsForTabber(tabber, tabContent) {
        var all = tabContent.querySelectorAll("h2, h3, h4, h5, h6");
        var headings = [];
        var i;

        for (i = 0; i < all.length; i++) {
            var h = all[i];
            if (!isValidHeading(h)) continue;

            if (h.closest(".wds-tabber") !== tabber) continue;

            headings.push(h);
        }

        return headings;
    }

    function buildTree(headings) {
        var root = [];
        var stack = [];
        var i;

        for (i = 0; i < headings.length; i++) {
            var h = headings[i];
            var level = getLevel(h.tagName);

            var node = {
                id: ensureId(h),
                text: cleanText(h.textContent),
                level: level,
                children: []
            };

            while (stack.length && stack[stack.length - 1].level >= level) {
                stack.pop();
            }

            if (!stack.length) {
                root.push(node);
            } else {
                stack[stack.length - 1].children.push(node);
            }

            stack.push(node);
        }

        return root;
    }

    function getStorageKey() {
        return "drpCustomTocState";
    }

    function loadTocCollapsed() {
        try {
            return localStorage.getItem(getStorageKey()) === "1";
        } catch (e) {
            return false;
        }
    }

    function saveTocCollapsed(collapsed) {
        try {
            localStorage.setItem(getStorageKey(), collapsed ? "1" : "0");
        } catch (e) {}
    }

    function lockTocWidthToCurrent(toc) {
        var rect;
        var width;

        if (!toc) return;

        toc.style.width = "auto";
        toc.style.minWidth = "";
        toc.style.maxWidth = "none";

        toc.offsetHeight;

        rect = toc.getBoundingClientRect();
        width = rect && rect.width ? Math.ceil(rect.width) : 0;

        if (width > 0) {
            toc.style.width = width + "px";
            toc.style.minWidth = width + "px";
        }

        toc.style.maxWidth = "100%";
    }

    function applyTocState(toc) {
        var checkbox;
        var collapsed;

        if (!toc) return;

        checkbox = toc.querySelector(".toctogglecheckbox");
        if (!checkbox) return;

        collapsed = loadTocCollapsed();
        checkbox.checked = collapsed;
        toc.setAttribute("data-drp-toc-collapsed", checkbox.checked ? "1" : "0");

        if (!collapsed) {
            requestAnimationFrame(function () {
                lockTocWidthToCurrent(toc);
                toc.style.visibility = "";
            });
        } else {
            toc.style.visibility = "";
        }

        checkbox.addEventListener("change", function () {
            saveTocCollapsed(checkbox.checked);
            toc.setAttribute("data-drp-toc-collapsed", checkbox.checked ? "1" : "0");

            if (!checkbox.checked) {
                requestAnimationFrame(function () {
                    lockTocWidthToCurrent(toc);
                });
            }
        });
    }

    function createToc(tocKey) {
        var toc = document.createElement("div");
        var checkboxId = "toctogglecheckbox-" + Math.random().toString(36).slice(2, 10);

        toc.id = "toc";
        toc.className = "toc";
        toc.setAttribute("role", "navigation");
        toc.setAttribute("data-drp-generated-toc", "1");
        toc.setAttribute("data-drp-toc-key", tocKey || "page");

        toc.style.display = "inline-block";
        toc.style.maxWidth = "100%";
        toc.style.boxSizing = "border-box";
        toc.style.float = "none";
        toc.style.visibility = "hidden";

        toc.innerHTML =
            '<input type="checkbox" role="button" id="' + checkboxId + '" class="toctogglecheckbox" style="display:none" aria-label="hide">' +
            '<div class="toctitle" lang="en" dir="ltr">' +
            '<h2 id="mw-toc-heading"><svg class="wds-icon wds-icon-tiny"><use href="#wds-icons-bullet-list-tiny"></use></svg>Contents</h2>' +
            '<span class="toctogglespan"><label class="toctogglelabel" for="' + checkboxId + '" aria-label="hide"></label></span>' +
            '</div>';

        return toc;
    }

    function render(nodes, parent, prefix) {
        var i;

        for (i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var li = document.createElement("li");
            var num = prefix.concat([i + 1]);
            var a = document.createElement("a");
            var spanNum = document.createElement("span");
            var spanText = document.createElement("span");

            a.href = "#" + node.id;
            a.setAttribute("data-id", node.id);
            a.setAttribute("data-drp-toc-link", "1");

            spanNum.className = "tocnumber";
            spanNum.textContent = num.join(".");

            spanText.className = "toctext";
            spanText.textContent = node.text;

            a.appendChild(spanNum);
            a.appendChild(document.createTextNode(" "));
            a.appendChild(spanText);

            li.appendChild(a);

            if (node.children.length) {
                var ul = document.createElement("ul");
                render(node.children, ul, num);
                li.appendChild(ul);
            }

            parent.appendChild(li);
        }
    }

    function findInsertionPoint(container, firstHeading) {
        if (!container || !firstHeading) return null;

        var prev = firstHeading.previousElementSibling;

        while (prev) {
            if (prev.tagName === "P" && cleanText(prev.textContent)) {
                return prev;
            }
            prev = prev.previousElementSibling;
        }

        return firstHeading;
    }

    function insertToc(container, toc, firstHeading) {
        var anchor = findInsertionPoint(container, firstHeading);

        if (!anchor) {
            container.insertBefore(toc, container.firstChild);
            return;
        }

        if (anchor.tagName === "P") {
            anchor.insertAdjacentElement("afterend", toc);
        } else if (anchor.parentNode) {
            anchor.parentNode.insertBefore(toc, anchor);
        } else {
            container.insertBefore(toc, container.firstChild);
        }
    }

    function removeOldTocs() {
        var old = document.querySelectorAll(".toc[data-drp-generated-toc='1']");
        var i;

        for (i = 0; i < old.length; i++) {
            old[i].remove();
        }
    }

    function buildTocForTabber(tabber, tabberIndex) {
        var contents = getDirectTabContents(tabber);
        var i;

        for (i = 0; i < contents.length; i++) {
            var tabContent = contents[i];
            var headings = getHeadingsForTabber(tabber, tabContent);
            var oldToc, tree, toc, ul, tocKey;

            if (!headings.length) continue;

            oldToc = tabContent.querySelector(".toc[data-drp-generated-toc='1']");
            if (oldToc) oldToc.remove();

            tree = buildTree(headings);
            if (!tree.length) continue;

            tocKey = "tabber-" + tabberIndex + "-content-" + i;

            toc = createToc(tocKey);
            ul = document.createElement("ul");
            render(tree, ul, []);
            toc.appendChild(ul);

            insertToc(tabContent, toc, headings[0]);
            applyTocState(toc);
        }
    }

    function buildStandaloneToc(page) {
        var all = page.querySelectorAll("h2, h3, h4, h5, h6");
        var headings = [];
        var i;

        for (i = 0; i < all.length; i++) {
            var h = all[i];
            if (!isValidHeading(h)) continue;
            if (h.closest(".wds-tabber")) continue;
            headings.push(h);
        }

        if (!headings.length) return;

        var oldToc = page.querySelector(".toc[data-drp-generated-toc='1']");
        if (oldToc) oldToc.remove();

        var tree = buildTree(headings);
        if (!tree.length) return;

        var toc = createToc("standalone");
        var ul = document.createElement("ul");
        render(tree, ul, []);
        toc.appendChild(ul);

        insertToc(page, toc, headings[0]);
        applyTocState(toc);
    }

    function getSignature(page) {
        var parts = [];
        var all = page.querySelectorAll("h2, h3, h4, h5, h6");
        var i;

        for (i = 0; i < all.length; i++) {
            var h = all[i];
            if (!isValidHeading(h)) continue;

            var tabber = h.closest(".wds-tabber");
            var tabIndex = -1;

            if (tabber) {
                var tabbers = page.querySelectorAll(".wds-tabber");
                var t;

                for (t = 0; t < tabbers.length; t++) {
                    if (tabbers[t] === tabber) {
                        tabIndex = t;
                        break;
                    }
                }
            }

            parts.push(
                (tabber ? "T" + tabIndex : "P") + "|" +
                h.tagName + "|" +
                cleanText(h.textContent) + "|" +
                (h.id || "")
            );
        }

        return parts.join("||");
    }

    function buildToc() {
        if (building) return;
        building = true;

        try {
            if (!hasMarker()) return;

            var page = getPageRoot();
            if (!page) return;

            var signature = getSignature(page);
            var tabbers, i;

            if (signature === lastSignature) return;
            lastSignature = signature;

            removeOldTocs();

            tabbers = page.querySelectorAll(".wds-tabber");

            if (tabbers.length) {
                for (i = 0; i < tabbers.length; i++) {
                    buildTocForTabber(tabbers[i], i);
                }
            } else {
                buildStandaloneToc(page);
            }
        } finally {
            building = false;
        }
    }

    function scheduleBuild() {
        if (scheduled) return;
        scheduled = true;

        requestAnimationFrame(function () {
            scheduled = false;
            buildToc();
        });
    }

    function onTocClick(e) {
        var a = e.target.closest("a[data-drp-toc-link='1']");
        var id, target, tabContent, tabber, tabs, contents, i;

        if (!a) return;

        id = a.getAttribute("data-id");
        target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (history.pushState) {
            history.pushState(null, null, "#" + id);
        } else {
            location.hash = id;
        }

        tabContent = target.closest(".wds-tab__content");
        if (tabContent && !tabContent.classList.contains("wds-is-current")) {
            tabber = tabContent.parentElement;
            tabs = tabber.querySelectorAll(".wds-tabs__tab");
            contents = tabber.querySelectorAll(".wds-tab__content");

            for (i = 0; i < contents.length; i++) {
                if (contents[i] === tabContent) {
                    if (tabs[i]) tabs[i].click();
                    break;
                }
            }
        }

        setTimeout(function () {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function init() {
        scheduleBuild();
    }

    document.addEventListener("click", onTocClick, true);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    if (window.mw && mw.hook) {
        mw.hook("wikipage.content").add(function () {
            scheduleBuild();
        });
    }
})();