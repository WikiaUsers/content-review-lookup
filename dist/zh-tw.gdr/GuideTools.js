/* REBORN guide tools. Read-only same-wiki API; no external scripts or tracking.
 * Data and descriptions stay in Lua data modules, separate from this reviewed UI.
 */
(function () {
    "use strict";

    function list(value) {
        return Array.isArray(value) ? value : [];
    }

    function norm(value) {
        return String(value || "").normalize("NFKC").toLowerCase().replace(/[\s．·・：:\-_]+/g, "");
    }

    function relicCost(artifacts, stars, target, owned) {
        if (!Number.isInteger(target) || target < 0 || target > 5 ||
                !Number.isInteger(owned) || owned < 0 || stars.length !== artifacts.length ||
                stars.some(function (n) { return !Number.isInteger(n) || n < 0 || n > 5; })) {
            throw new Error("請輸入 0–5 星及非負整數素材數量。");
        }
        var materials = {}, copper = 0, upgrades = 0;
        artifacts.forEach(function (artifact, i) {
            for (var star = stars[i]; star < target; star += 1) {
                var cost = artifact.cost[star];
                materials[artifact.material] = (materials[artifact.material] || 0) + cost.qty;
                copper += cost.copper;
                upgrades += 1;
            }
        });
        var names = Object.keys(materials);
        return {materials: materials, copper: copper, upgrades: upgrades,
            missing: names.length === 1 ? Math.max(0, materials[names[0]] - owned) : null};
    }

    function dungeonFilter(rows, options) {
        return rows.filter(function (row) {
            if (options.group && row.group !== options.group) { return false; }
            if (options.mode && row.mode.indexOf(options.mode) === -1) { return false; }
            if (options.level && (!row.level || row.level > options.level)) { return false; }
            if (options.peak !== "" && row.peak > Number(options.peak)) { return false; }
            var haystack = row.name + " " + row.purpose + " " + list(row.bosses).join(" ") + " " +
                list(row.loot).map(function (item) { return item.n; }).join(" ");
            return !options.q || norm(haystack).indexOf(norm(options.q)) !== -1;
        });
    }

    // Pure functions can be checked offline without a browser or a Fandom session.
    if (typeof document === "undefined" && typeof module === "object" && module.exports) {
        module.exports = {norm: norm, relicCost: relicCost, dungeonFilter: dungeonFilter};
        return;
    }

    function boot() {
    var roots = document.querySelectorAll(".gdr-guide-tools");
    if (!roots.length || typeof mw === "undefined") { return; }

    mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(function () {
        var api = new mw.Api();
        var configPromise;
        var detailCache = {};

        function query(params) {
            var args = Object.keys(params).map(function (key) {
                return key + "=" + (key === "q" ? encodeURIComponent(params[key]) : params[key]);
            }).join("|");
            return Promise.resolve(api.post({action: "parse", text: "{{#invoke:GuideTools|query|" + args + "}}",
                contentmodel: "wikitext", prop: "text", formatversion: 2})).then(function (response) {
                var html = response.parse && response.parse.text;
                if (html && typeof html === "object") { html = html["*"]; }
                var doc = new DOMParser().parseFromString(html || "", "text/html");
                var pre = doc.querySelector(".gdr-tools-json");
                if (!pre) { throw new Error("資料暫時無法讀取，請稍後重試。"); }
                var data = JSON.parse(pre.textContent);
                if (data.error) { throw new Error(data.error); }
                return data;
            });
        }

        function config() {
            if (!configPromise) {
                configPromise = query({op: "config"}).catch(function (error) {
                    configPromise = null;
                    throw error;
                });
            }
            return configPromise;
        }

        function detail(ref) {
            if (!detailCache[ref]) {
                detailCache[ref] = query({op: "detail", ref: ref}).catch(function (error) {
                    delete detailCache[ref];
                    throw error;
                });
            }
            return detailCache[ref];
        }

        function el(tag, text, className) {
            var node = document.createElement(tag);
            if (text !== undefined) { node.textContent = text; }
            if (className) { node.className = className; }
            return node;
        }

        function button(text, action) {
            var node = el("button", text);
            node.type = "button";
            node.addEventListener("click", action);
            return node;
        }

        function link(page, text, q) {
            var node = el("a", text);
            node.href = mw.util.getUrl(page, q === undefined ? {} : {q: q});
            return node;
        }

        function field(parent, text, node) {
            var label = el("label", undefined, "gdr-tool-field");
            label.appendChild(el("span", text));
            label.appendChild(node);
            parent.appendChild(label);
            return node;
        }

        function select(choices) {
            var node = el("select");
            choices.forEach(function (choice) {
                var pair = Array.isArray(choice) ? choice : [choice, choice];
                var option = el("option", pair[1]);
                option.value = pair[0];
                node.appendChild(option);
            });
            return node;
        }

        function numeric(min, max, value) {
            var node = el("input");
            node.type = "number";
            node.min = min;
            if (max !== null) { node.max = max; }
            node.step = "1";
            node.value = value;
            return node;
        }

        function error(status, value) {
            status.textContent = value instanceof Error ? value.message : "連線失敗，請再試一次。";
        }

        function sourceCards(parent, data) {
            var rows = list(data.sources);
            parent.appendChild(el("h3", data.name + "：取得方式"));
            if (!rows.length) {
                parent.appendChild(el("p", "目前索引沒有可確認的來源。請查看原資料頁或遊戲內說明；沒有紀錄不代表無法取得。"));
            }
            rows.forEach(function (row) {
                var card = el("article", undefined, "gdr-tool-card");
                card.appendChild(el("strong", row.type + " · " + row.where));
                card.appendChild(el("p", row.detail));
                card.appendChild(el("small", row.version));
                parent.appendChild(card);
            });
        }

        function showDetail(parent, data) {
            parent.replaceChildren();
            parent.appendChild(el("h3", data.name));
            parent.appendChild(el("p", data.kind + " · " + data.group, "gdr-tool-meta"));
            var table = el("dl", undefined, "gdr-tool-detail");
            list(data.fields).forEach(function (row) {
                if (!row.value) { return; }
                table.appendChild(el("dt", row.name));
                table.appendChild(el("dd", row.value));
            });
            parent.appendChild(table);
            parent.appendChild(link(data.page, "查看原資料頁"));
            if (data.kind === "物品") {
                parent.appendChild(link("物品取得查詢", "查取得方式", data.name));
                sourceCards(parent, data);
            }
            if (data.kind === "寵物") {
                parent.appendChild(el("p", "技能欄列出資料庫的候選技能；實際可用招式數及進化結果依品質與遊戲內提示。"));
            }
        }

        Array.prototype.forEach.call(roots, function (root) {
            if (root.dataset.ready) { return; }
            root.dataset.ready = "1";
            var mode = root.dataset.tool || "search";
            var fallback = root.querySelector(".gdr-tool-fallback");
            var body = el("div", undefined, "gdr-tool-body");
            var status = el("p", "", "gdr-tool-status");
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            root.appendChild(body);
            root.appendChild(status);
            if (fallback) { fallback.hidden = true; }

            function searchUI() {
                var form = el("form", undefined, "gdr-tool-controls");
                var input = field(form, "搜尋名稱", el("input"));
                input.type = "search";
                input.placeholder = "輸入部分名稱，例如：樹境、好想兔";
                input.autocomplete = "off";
                input.value = new URLSearchParams(location.search).get("q") || "";
                var choices = mode === "sources" ? ["物品"] : mode === "compare" ? ["物品", "寵物"] : ["全部", "物品", "寵物", "怪物", "技能"];
                var kind = field(form, "資料類型", select(choices));
                var size = field(form, "每頁筆數", select([[25, "25 筆"], [50, "50 筆"]]));
                var submit = el("button", "搜尋");
                submit.type = "submit";
                form.appendChild(submit);
                var results = el("div", undefined, "gdr-tool-results");
                var pager = el("div", undefined, "gdr-tool-pager");
                var details = el("section", undefined, "gdr-tool-selected");
                details.setAttribute("aria-label", "選定資料");
                var tray = el("div", undefined, "gdr-tool-tray");
                var comparison = el("div", undefined, "gdr-tool-comparison");
                body.append(form, tray, results, pager, details, comparison);
                var page = 1, serial = 0, timer, selected = [], compareSerial = 0;

                function renderComparison() {
                    var active = ++compareSerial;
                    tray.replaceChildren();
                    comparison.replaceChildren();
                    selected.forEach(function (row) {
                        tray.appendChild(button(row.n + " ×", function () {
                            selected = selected.filter(function (entry) { return entry.id !== row.id; });
                            renderComparison();
                        }));
                    });
                    if (selected.length < 2) {
                        if (mode === "compare" || selected.length) { tray.appendChild(el("p", "選擇 2–3 件裝備或 2–3 隻寵物；兩種類型分開比較。")); }
                        return;
                    }
                    Promise.all(selected.map(function (row) { return detail(row.id); })).then(function (records) {
                        if (active !== compareSerial) { return; }
                        var check = el("input");
                        check.type = "checkbox";
                        field(comparison, "只看差異", check);
                        var wrap = el("div", undefined, "gdr-tool-table-wrap");
                        var table = el("table", undefined, "wikitable gdr-tool-table");
                        var head = el("tr");
                        head.appendChild(el("th", "能力／效果"));
                        records.forEach(function (record) { head.appendChild(el("th", record.name)); });
                        table.appendChild(head);
                        var fields = [];
                        records.forEach(function (record) {
                            list(record.fields).forEach(function (row) { if (fields.indexOf(row.name) < 0) { fields.push(row.name); } });
                        });
                        fields.forEach(function (name) {
                            var values = records.map(function (record) {
                                var row = list(record.fields).find(function (item) { return item.name === name; });
                                return row && row.value ? row.value : "—";
                            });
                            if (values.every(function (value) { return value === "—"; })) { return; }
                            var different = values.some(function (value) { return value !== values[0]; });
                            var row = el("tr", undefined, different ? "gdr-tool-different" : "");
                            row.dataset.same = different ? "0" : "1";
                            row.appendChild(el("th", name));
                            values.forEach(function (value) { row.appendChild(el("td", value)); });
                            table.appendChild(row);
                        });
                        check.addEventListener("change", function () {
                            table.querySelectorAll('[data-same="1"]').forEach(function (row) { row.hidden = check.checked; });
                        });
                        wrap.appendChild(table);
                        comparison.appendChild(wrap);
                        comparison.appendChild(el("p", "比較表只呈現紀錄差異，沒有自動評定強弱；特殊效果、品質與觸發條件仍需一起判斷。"));
                    }).catch(function (value) { if (active === compareSerial) { error(status, value); } });
                }

                function choose(row) {
                    var active = ++serial;
                    status.textContent = "讀取「" + row.n + "」…";
                    var promise = mode === "sources" ? query({op: "sources", q: row.n}) : detail(row.id);
                    promise.then(function (data) {
                        if (active !== serial) { return; }
                        details.replaceChildren();
                        if (mode === "sources") { sourceCards(details, data); }
                        else { showDetail(details, data); }
                        status.textContent = "已顯示「" + row.n + "」。";
                    }).catch(function (value) { if (active === serial) { error(status, value); } });
                }

                function run() {
                    clearTimeout(timer);
                    var active = ++serial;
                    var q = input.value.trim();
                    if (!q) {
                        results.replaceChildren(el("p", "輸入名稱後，會列出相近結果。"));
                        pager.replaceChildren();
                        status.textContent = "";
                        return;
                    }
                    status.textContent = "搜尋中…";
                    query({op: "search", q: q, kind: kind.value, page: page, size: size.value}).then(function (data) {
                        if (active !== serial) { return; }
                        results.replaceChildren();
                        pager.replaceChildren();
                        page = data.page;
                        list(data.rows).forEach(function (row) {
                            var card = el("article", undefined, "gdr-tool-card");
                            card.appendChild(button(row.n, function () { choose(row); }));
                            card.appendChild(el("p", row.t + " · " + row.g + (row.l !== "" && row.l !== undefined ? " · 等級 " + row.l : ""), "gdr-tool-meta"));
                            if (row.t === "物品") { card.appendChild(link("物品取得查詢", "查取得方式", row.n)); }
                            if (mode === "compare" || mode === "search") {
                                if (row.t === "物品" || row.t === "寵物") {
                                    card.appendChild(button("加入比較", function () {
                                        if (selected.some(function (entry) { return entry.id === row.id; })) { status.textContent = "已在比較清單。"; return; }
                                        if (selected.length && selected[0].t !== row.t) { status.textContent = "請先移除另一種類型，再加入比較。"; return; }
                                        if (selected.length >= 3) { status.textContent = "一次最多比較 3 筆，請先移除一筆。"; return; }
                                        selected.push(row);
                                        renderComparison();
                                    }));
                                }
                            }
                            results.appendChild(card);
                        });
                        var pages = Math.max(1, Math.ceil(data.total / data.size));
                        var previous = button("上一頁", function () { page -= 1; run(); });
                        previous.disabled = page <= 1;
                        var next = button("下一頁", function () { page += 1; run(); });
                        next.disabled = page >= pages;
                        pager.append(previous, el("span", page + " / " + pages + " 頁"), next);
                        status.textContent = data.total ? "找到 " + data.total + " 筆；點名稱查看完整資料。" : "找不到相符名稱，請縮短關鍵字。";
                        if (mode === "sources") { choose({n:q}); }
                    }).catch(function (value) { if (active === serial) { error(status, value); } });
                }
                form.addEventListener("submit", function (event) { event.preventDefault(); page = 1; run(); });
                input.addEventListener("input", function () { page = 1; ++serial; clearTimeout(timer); timer = setTimeout(run, 350); });
                kind.addEventListener("change", function () { page = 1; run(); });
                size.addEventListener("change", function () { page = 1; run(); });
                renderComparison();
                run();
            }

            function calculatorUI(data) {
                var artifacts = list(data.artifacts);
                var groups = Array.from(new Set(artifacts.map(function (row) { return row.group; })));
                var form = el("form", undefined, "gdr-tool-controls");
                var group = field(form, "聖物套組", select(groups));
                var target = field(form, "目標星數", select([[1, "1 星"], [2, "2 星"], [3, "3 星"], [4, "4 星"], [5, "5 星"]]));
                var owned = field(form, "已持有同種素材", numeric(0, null, 0));
                var stars = el("div", undefined, "gdr-tool-star-grid");
                var output = el("section", undefined, "gdr-tool-selected");
                var inputs = [], current = [];
                body.append(form, stars, output);
                function calculate() {
                    output.replaceChildren();
                    try {
                        var cost = relicCost(current, inputs.map(function (input) { return Number(input.value); }), Number(target.value), Number(owned.value));
                        var material = current[0].material;
                        output.appendChild(el("h3", "還需要 " + (cost.missing || 0) + " 個「" + material + "」"));
                        output.appendChild(el("p", "本次升星共消耗 " + (cost.materials[material] || 0) + " 個素材；" + cost.upgrades + " 次升星。"));
                        var gold = Math.floor(cost.copper / 10000), silver = Math.floor(cost.copper % 10000 / 100), copper = cost.copper % 100;
                        output.appendChild(el("p", "金錢合計：" + gold + " 金 " + silver + " 銀 " + copper + " 銅"));
                        output.appendChild(link("物品取得查詢", "查「" + material + "」取得方式", material));
                        current.forEach(function (row, i) {
                            var text = inputs[i].value >= target.value ? "已達目標，不計費" : row.effects[Number(target.value) - 1];
                            output.appendChild(el("p", row.name + "：" + text));
                        });
                        status.textContent = "依 2026-10-10 客戶端聖物強化表計算；套組加成另見聖物收藏頁。";
                    } catch (value) { error(status, value); }
                }
                function changeGroup() {
                    current = artifacts.filter(function (row) { return row.group === group.value; });
                    stars.replaceChildren();
                    inputs = current.map(function (row) { return field(stars, row.name + " · 目前星數", select([[0,"未升星"],[1,"1 星"],[2,"2 星"],[3,"3 星"],[4,"4 星"],[5,"5 星"]])); });
                    inputs.forEach(function (input) { input.addEventListener("change", calculate); });
                    calculate();
                }
                form.addEventListener("submit", function (event) { event.preventDefault(); calculate(); });
                group.addEventListener("change", changeGroup);
                target.addEventListener("change", calculate);
                owned.addEventListener("input", calculate);
                changeGroup();
            }

            function dungeonsUI(data) {
                var rows = list(data.dungeons), page = 1;
                var form = el("form", undefined, "gdr-tool-controls");
                var group = field(form, "副本類型", select([["", "全部類型"]].concat(Array.from(new Set(rows.map(function (row) { return row.group; }))))));
                var modeFilter = field(form, "挑戰模式", select([["", "全部模式"],["單人", "單人"],["多人", "多人"]]));
                var level = field(form, "角色一般等級（選填）", numeric(1, 150, ""));
                var peak = field(form, "角色巔峰等級（選填）", numeric(0, 200, ""));
                var q = field(form, "副本、王怪或獎勵名稱", el("input"));
                q.type = "search";
                q.placeholder = "例如：拼圖、武核、樹靈";
                var results = el("div", undefined, "gdr-tool-results");
                var pager = el("div", undefined, "gdr-tool-pager");
                body.append(form, results, pager);
                function render() {
                    var selected = dungeonFilter(rows, {group:group.value,mode:modeFilter.value,level:Number(level.value),peak:peak.value,q:q.value});
                    var pages = Math.max(1, Math.ceil(selected.length / 12));
                    page = Math.min(page, pages);
                    results.replaceChildren();
                    selected.slice((page - 1) * 12, page * 12).forEach(function (row) {
                        var card = el("article", undefined, "gdr-tool-card");
                        card.appendChild(el("h3", row.name));
                        card.appendChild(el("p", row.group + " · " + row.mode + " · 入場 Lv." + row.level + (row.peak ? " · 場景標示巔峰 " + row.peak : ""), "gdr-tool-meta"));
                        card.appendChild(el("p", row.purpose || "用途未列明"));
                        card.appendChild(el("p", "王怪／物件：" + (list(row.bosses).join("、") || "入口表未列出")));
                        var disclosure = el("details");
                        disclosure.appendChild(el("summary", "查看 " + list(row.loot).length + " 筆掉落與場景說明"));
                        if (row.intro) { disclosure.appendChild(el("p", row.intro)); }
                        list(row.loot).forEach(function (item) {
                            var line = el("p");
                            line.append(link("物品取得查詢", item.n, item.n), el("small", " · " + item.type + " · " + item.boss));
                            disclosure.appendChild(line);
                        });
                        if (!list(row.loot).length) { disclosure.appendChild(el("p", "客戶端入口未提供對應王怪掉落；不代表沒有獎勵。")); }
                        card.appendChild(disclosure);
                        results.appendChild(card);
                    });
                    pager.replaceChildren();
                    var previous = button("上一頁", function () { page -= 1; render(); });
                    previous.disabled = page <= 1;
                    var next = button("下一頁", function () { page += 1; render(); });
                    next.disabled = page >= pages;
                    pager.append(previous, el("span", page + " / " + pages + " 頁"), next);
                    status.textContent = "符合 " + selected.length + " 個入口。等級篩選僅比對入口門檻及場景巔峰標示，其他資格以遊戲為準。";
                }
                form.addEventListener("submit", function (event) { event.preventDefault(); page = 1; render(); });
                [group, modeFilter, level, peak, q].forEach(function (input) {
                    input.addEventListener(input.tagName === "SELECT" ? "change" : "input", function () { page = 1; render(); });
                });
                render();
            }

            if (mode === "calculator" || mode === "dungeons") {
                status.textContent = "讀取資料中…";
                function load() {
                    body.replaceChildren();
                    config().then(function (data) {
                        if (mode === "calculator") { calculatorUI(data); }
                        else { dungeonsUI(data); }
                    }).catch(function (value) {
                        error(status, value);
                        body.appendChild(button("重新讀取", load));
                        if (fallback) { fallback.hidden = false; }
                    });
                }
                load();
            } else { searchUI(); }
        });
    });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, {once: true});
    } else {
        boot();
    }
}());
