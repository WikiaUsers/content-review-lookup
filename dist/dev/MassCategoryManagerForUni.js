
(function () {
    "use strict";

    if (window.MassCategoryManagerLoaded) return;
    window.MassCategoryManagerLoaded = true;

    mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(function () {
        const api = new mw.Api();
        const pageName = "Special:BlankPage/MassCategoryManager";
        const pageURL = mw.util.getUrl(pageName);
        const config = { maxPages: 200, delay: 2500 };
        const isEditor = mw.config.get("wgPageName") ===
            pageName.replace(/ /g, "_");

        const link = mw.util.addPortletLink(
            "p-tb", pageURL, "Mass Categories", "t-mass-categories"
        );

        if (!link) {
            const fallback = document.createElement("a");
            fallback.href = pageURL;
            fallback.textContent = "Mass Categories";
            fallback.style.cssText =
                "position:fixed;right:18px;bottom:18px;z-index:9999;" +
                "padding:12px;background:#3266cc;color:white;border-radius:8px";
            document.body.appendChild(fallback);
        }

        if (!isEditor) return;

        const style = document.createElement("style");
        style.textContent = `
            #mcm {
                max-width:1100px;margin:20px auto;padding:24px;
                color:var(--theme-page-text-color,#222);
            }
            #mcm h1 { margin-bottom:8px; }
            #mcm .mcm-muted { opacity:.7; }
            #mcm .mcm-grid {
                display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
                gap:18px;
            }
            #mcm .mcm-card {
                border:1px solid #8885;border-radius:12px;
                padding:20px;margin:14px 0;
                background:var(--theme-page-background-color,transparent);
            }
            #mcm label { display:block;font-weight:600;margin-bottom:7px; }
            #mcm input,#mcm select,#mcm textarea {
                box-sizing:border-box;width:100%;padding:10px;
                background:var(--theme-page-background-color,#fff);
                color:inherit;border:1px solid #8888;
                border-radius:6px;margin-bottom:12px;
            }
            #mcm textarea { min-height:110px;resize:vertical; }
            #mcm button {
                padding:10px 16px;border:0;border-radius:7px;
                cursor:pointer;margin:4px;
                background:#3266cc;color:white;
            }
            #mcm button:disabled { opacity:.45;cursor:not-allowed; }
            #mcm .mcm-secondary { background:#686868; }
            #mcm .mcm-warning { background:#ad453a; }
            #mcm-log {
                white-space:pre-wrap;max-height:340px;overflow:auto;
                padding:14px;border:1px solid #8885;border-radius:8px;
                font:12px monospace;
            }
            #mcm-results {
                max-height:350px;overflow:auto;
                border:1px solid #8885;border-radius:8px;
            }
            #mcm-results > div {
                padding:10px;border-bottom:1px solid #8883;
            }
            #mcm-results small {display:block;opacity:.7;margin-top:4px;}
            @media(max-width:700px) {
                #mcm .mcm-grid {grid-template-columns:1fr;}
                #mcm {padding:10px;}
            }
        `;
        document.head.appendChild(style);

        const root = document.getElementById("mw-content-text") ||
            document.querySelector(".mw-parser-output");

        if (!root) return;
        root.replaceChildren();

        const app = document.createElement("div");
        app.id = "mcm";
        app.innerHTML = `
            <h1>Mass Category Manager</h1>
            <p class="mcm-muted">
                Add categories to multiple wiki pages and image files.
            </p>

            <div class="mcm-card">
                <h2>1. Select targets</h2>
                <div class="mcm-grid">
                    <div>
                        <label for="mcm-type">Target type</label>
                        <select id="mcm-type">
                            <option value="pages">Articles</option>
                            <option value="files">Images / Files</option>
                        </select>
                    </div>
                    <div>
                        <label for="mcm-method">Selection method</label>
                        <select id="mcm-method">
                            <option value="manual">Manual titles</option>
                            <option value="category">Pages in a category</option>
                        </select>
                    </div>
                </div>

                <div id="mcm-manual">
                    <label for="mcm-titles">Titles (one per line)</label>
                    <textarea id="mcm-titles"
                        placeholder="Chapter 1&#10;Chapter 2"></textarea>
                </div>

                <div id="mcm-category-source" hidden>
                    <label for="mcm-source">Source category</label>
                    <input id="mcm-source" placeholder="Uncategorized Images">
                    <p class="mcm-muted">
                        Selects direct members of this category.
                    </p>
                </div>
            </div>

            <div class="mcm-card">
                <h2>2. Add categories</h2>
                <label for="mcm-categories">Categories (one per line)</label>
                <textarea id="mcm-categories"
                    placeholder="Manga Chapters&#10;2026 Releases"></textarea>

                <label for="mcm-summary">Edit summary</label>
                <input id="mcm-summary"
                    value="Adding categories using Mass Category Manager">
            </div>

            <div class="mcm-card">
                <h2>3. Preview changes</h2>
                <p id="mcm-status">No pages selected.</p>
                <button id="mcm-preview">Preview Changes</button>
                <div id="mcm-results"></div>
            </div>

            <div class="mcm-card">
                <h2>4. Apply changes</h2>
                <p>Only pages included in the preview will be edited.</p>
                <button id="mcm-save" disabled>Apply Categories</button>
                <button id="mcm-stop" class="mcm-warning">Stop</button>
                <h3>Activity Log</h3>
                <pre id="mcm-log"></pre>
            </div>
        `;
        root.appendChild(app);

        const $ = id => document.getElementById(id);
        let prepared = [];
        let busy = false;
        let stopped = false;

        function log(message) {
            $("mcm-log").textContent += message + "\n";
            $("mcm-log").scrollTop = $("mcm-log").scrollHeight;
        }

        function key(value) {
            return value.replace(/_/g, " ").trim()
                .replace(/\s+/g, " ").toLowerCase();
        }

        function canonical(value, namespace) {
            let title = value.trim();
            if (!title) return null;

            const prefixes = namespace === 6
                ? /^(?:File|Image):/i
                : /^Category:/i;

            if (!prefixes.test(title)) {
                title = (namespace === 6 ? "File:" : "Category:") + title;
            }

            const parsed = mw.Title.newFromText(title);
            return parsed && parsed.getNamespaceId() === namespace
                ? parsed.getPrefixedText() : null;
        }

        function selectedCategories() {
            const values = $("mcm-categories").value.split("\n");
            const seen = new Set();

            return values.map(value => canonical(value, 14))
                .filter(value => {
                    if (!value || seen.has(key(value))) return false;
                    seen.add(key(value));
                    return true;
                });
        }

        function invalidate() {
            prepared = [];
            $("mcm-save").disabled = true;
            $("mcm-status").textContent = "Preview required.";
            $("mcm-results").replaceChildren();
        }

        $("mcm-method").onchange = function () {
            $("mcm-manual").hidden = this.value !== "manual";
            $("mcm-category-source").hidden = this.value !== "category";
            invalidate();
        };

        ["mcm-type", "mcm-titles", "mcm-source", "mcm-categories"]
            .forEach(id => {
                $(id).addEventListener("input", invalidate);
                $(id).addEventListener("change", invalidate);
            });

        async function collectTitles() {
            const namespace = $("mcm-type").value === "files" ? 6 : 0;
            const seen = new Set();
            const titles = [];

            function add(title) {
                const parsed = mw.Title.newFromText(title);
                if (!parsed || parsed.getNamespaceId() !== namespace) return;

                const normalized = parsed.getPrefixedText();
                if (seen.has(key(normalized))) return;
                seen.add(key(normalized));
                titles.push(normalized);
            }

            if ($("mcm-method").value === "manual") {
                $("mcm-titles").value.split("\n").forEach(value => {
                    value = value.trim();
                    if (!value) return;
                    if (namespace === 6) value = canonical(value, 6);
                    if (value) add(value);
                });
            } else {
                const source = canonical($("mcm-source").value, 14);
                if (!source) throw new Error("Invalid source category.");

                let continuation = null;

                do {
                    if (stopped) throw new Error("Collection stopped.");

                    const params = {
                        action: "query",
                        list: "categorymembers",
                        cmtitle: source,
                        cmnamespace: namespace,
                        cmlimit: "max",
                        format: "json"
                    };
                    if (continuation) Object.assign(params, continuation);

                    const result = await api.get(params);

                    (result.query?.categorymembers || []).forEach(member => {
                        add(member.title);
                    });

                    if (titles.length > config.maxPages) {
                        throw new Error(
                            "More than " + config.maxPages +
                            " targets. Narrow the source category."
                        );
                    }

                    continuation = result.continue || null;
                } while (continuation);
            }

            if (titles.length > config.maxPages) {
                throw new Error("Maximum " + config.maxPages + " targets.");
            }
            return titles;
        }

        async function fetchPage(title) {
            const result = await api.get({
                action: "query",
                prop: "info|categories|revisions",
                titles: title,
                inprop: "protection",
                cllimit: "max",
                rvprop: "ids|timestamp",
                formatversion: 2,
                format: "json"
            });

            const page = result.query.pages[0];
            if (page.missing || !page.revisions?.length) return null;

            return {
                title: page.title,
                revid: page.revisions[0].revid,
                timestamp: page.revisions[0].timestamp,
                categories: (page.categories || []).map(cat => cat.title),
                protection: page.protection || [],
                hasMoreCategories: Boolean(result.continue)
            };
        }

        function addResult(title, changes) {
            const entry = document.createElement("div");
            const heading = document.createElement("strong");
            const detail = document.createElement("small");

            heading.textContent = title;
            detail.textContent = changes.join(", ");
            entry.append(heading, detail);
            $("mcm-results").appendChild(entry);
        }

        $("mcm-preview").onclick = async function () {
            if (busy) return;
            busy = true;
            stopped = false;
            invalidate();
            $("mcm-log").textContent = "";
            $("mcm-preview").disabled = true;

            try {
                const categories = selectedCategories();
                if (!categories.length) {
                    throw new Error("Enter at least one valid category.");
                }

                const titles = await collectTitles();
                if (!titles.length) {
                    throw new Error("No matching pages found.");
                }

                log("Checking " + titles.length + " pages...");

                for (const title of titles) {
                    if (stopped) break;

                    try {
                        const page = await fetchPage(title);
                        if (!page) {
                            log("SKIP missing: " + title);
                            continue;
                        }

                        if (page.hasMoreCategories) {
                            log("SKIP category list incomplete: " + title);
                            continue;
                        }

                        const existing = new Set(page.categories.map(key));
                        const missing = categories.filter(category =>
                            !existing.has(key(category))
                        );

                        if (!missing.length) {
                            log("UNCHANGED: " + title);
                            continue;
                        }

                        prepared.push({ ...page, missing });
                        addResult(page.title, missing);
                        log("READY: " + page.title);
                    } catch (error) {
                        log("ERROR " + title + ": " + error.message);
                    }
                }

                $("mcm-status").textContent =
                    prepared.length + " pages ready to edit.";
                $("mcm-save").disabled = stopped || !prepared.length;
            } catch (error) {
                log("ERROR: " + error.message);
                $("mcm-status").textContent = "Preview failed.";
            } finally {
                busy = false;
                $("mcm-preview").disabled = false;
            }
        };

        $("mcm-stop").onclick = () => {
            stopped = true;
            log("Stop requested.");
        };

        $("mcm-save").onclick = async function () {
            if (busy || !prepared.length) return;

            if (!window.confirm(
                "Add categories to " + prepared.length + " pages?"
            )) return;

            busy = true;
            stopped = false;
            $("mcm-save").disabled = true;
            $("mcm-preview").disabled = true;

            let saved = 0;
            let failed = 0;
            let skipped = 0;

            for (const page of prepared) {
                if (stopped) break;

                try {
                    const current = await fetchPage(page.title);

                    if (!current || current.hasMoreCategories) {
                        skipped++;
                        log("SKIPPED: " + page.title);
                        continue;
                    }

                    const existing = new Set(current.categories.map(key));
                    const missing = page.missing.filter(category =>
                        !existing.has(key(category))
                    );

                    if (!missing.length) {
                        skipped++;
                        log("UNCHANGED: " + page.title);
                        continue;
                    }

                    const appendtext = "\n" + missing.map(category =>
                        "[[" + category + "]]"
                    ).join("\n") + "\n";

                    const result = await api.postWithToken("csrf", {
                        action: "edit",
                        title: page.title,
                        appendtext: appendtext,
                        summary: $("mcm-summary").value,
                        baserevid: current.revid,
                        basetimestamp: current.timestamp,
                        nocreate: 1,
                        assert: "user",
                        format: "json"
                    });

                    if (result.edit?.result === "Success") {
                        saved++;
                        log("SAVED: " + page.title);
                    } else {
                        failed++;
                        log("FAILED: " + page.title);
                    }
                } catch (error) {
                    failed++;
                    log("ERROR " + page.title + ": " + error.message);
                }

                if (!stopped) {
                    await new Promise(resolve =>
                        setTimeout(resolve, config.delay)
                    );
                }
            }

            prepared = [];
            busy = false;
            $("mcm-preview").disabled = false;
            $("mcm-status").textContent =
                saved + " saved, " + failed + " failed, " +
                skipped + " skipped. Preview again for another batch.";
        };
    });
})();
[[User:UniFndom|UniFndom]] ([[User talk:UniFndom|talk]]) 00:52, 31 October 2026 (UTC) UniFndom