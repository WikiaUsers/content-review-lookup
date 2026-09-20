(function () {
	"use strict";

	// Only run on the Content Manager page
	if (window.mw && mw.config && mw.config.get("wgPageName") !== "Seashell_Wiki:Content_Manager") {
		return;
	}

	let started = false;
	let bootAttempts = 0;
	window.SeashellSubmissionStatus = "waiting";

	const CONFIG = {
		medal: { label: "Medal", plural: "Medals", directory: "Medals", template: "Medal", category: "Medals", rarity: true, requirements: true, obtained: true, defaultObtained: "Medal Roll" },
		trait: { label: "Trait", plural: "Traits", directory: "Traits", template: "Trait", category: "Traits", requirements: true, obtained: true },
		skill: { label: "Skill", plural: "Skills", directory: "Skills", template: "Skill", category: "Skills", requirements: true, obtained: true, defaultObtained: "Staff" },
		item: { label: "Item", plural: "Items", directory: "Items", template: "Item", category: "Items", item: true },
		location: { label: "Location", plural: "Locations", directory: "Locations", template: "Location", category: "Locations", location: true },
		character: { label: "Character", plural: "Characters", directory: "Characters", template: "Character", category: "Characters", character: true }
	};

	function start() {
		const root = document.getElementById("seashell-submission-root");
		if (!root || !window.mw || !mw.loader) {
			bootAttempts += 1;
			if (bootAttempts <= 150) return window.setTimeout(start, 100);
			window.SeashellSubmissionStatus = "startup-failed";
			if (root) root.textContent = "The Content Manager could not detect Fandom's JavaScript loader. Refresh with Ctrl + Shift + R.";
			return;
		}
		if (mw.config.get("wgPageName") !== "Seashell_Wiki:Content_Manager") return;
		if (started) return;
		started = true;
		window.SeashellSubmissionStatus = "loading-modules";

		mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(function () {
			window.SeashellSubmissionStatus = "loaded";
			if (!mw.config.get("wgUserName")) {
				root.innerHTML = '<div class="cm-status cm-error">You must <a href="/wiki/Special:UserLogin?returnto=' + encodeURIComponent(mw.config.get("wgPageName")) + '">log in</a> first.</div>';
				return;
			}

			const api = new mw.Api();
			const groups = mw.config.get("wgUserGroups") || [];
			const isAdmin = groups.includes("sysop") || groups.includes("bureaucrat") || groups.includes("staff");
			let type = "medal";
			let mode = "create";
			let loadedName = "";
			let loadedPage = null;

			const style = document.createElement("style");
			style.textContent = `
				#seashell-submission-root{color:#f2f2f2;padding:4px}
				#seashell-submission-root .cm-manager,#seashell-submission-root .cm-form{display:grid;gap:18px}
				#seashell-submission-root .cm-tabs{display:grid;gap:8px}
				#seashell-submission-root .cm-type-tabs{grid-template-columns:repeat(6,minmax(0,1fr))}
				#seashell-submission-root .cm-mode-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
				#seashell-submission-root .cm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
				#seashell-submission-root .cm-field{display:flex;flex-direction:column;gap:6px}
				#seashell-submission-root .cm-full{grid-column:1/-1}
				#seashell-submission-root label{color:#fff;font-weight:700}
				#seashell-submission-root .cm-help{color:#aeb4bf;font-size:13px;line-height:1.45}
				#seashell-submission-root input,#seashell-submission-root select,#seashell-submission-root textarea{box-sizing:border-box;width:100%;padding:11px 12px;border:1px solid #a84949;border-radius:4px;background:#171c24;color:#fff;font:inherit}
				#seashell-submission-root textarea{min-height:105px;resize:vertical}
				#seashell-submission-root button,#seashell-submission-root .cm-button{box-sizing:border-box;padding:11px 16px;border:1px solid #a84949;border-radius:4px;background:#171c24;color:#fff;font-weight:800;cursor:pointer;text-align:center;text-decoration:none}
				#seashell-submission-root button:hover,#seashell-submission-root .cm-button:hover{filter:brightness(1.13)}
				#seashell-submission-root button:disabled{opacity:.55;cursor:wait}
				#seashell-submission-root .is-active,#seashell-submission-root .cm-submit{background:#a84949}
				#seashell-submission-root .cm-delete{background:#8f2929;border-color:#df5555}
				#seashell-submission-root .cm-panel{padding:16px;border:1px solid #a84949;border-radius:5px;background:#10151d}
				#seashell-submission-root .cm-picker{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}
				#seashell-submission-root .cm-actions{display:flex;flex-wrap:wrap;gap:10px}
				#seashell-submission-root .cm-section-list{display:grid;gap:12px}
				#seashell-submission-root .cm-section{display:grid;grid-template-columns:minmax(150px,.35fr) minmax(220px,1fr) auto;gap:10px;align-items:start;padding:13px;border:1px solid #39414d;border-radius:4px}
				#seashell-submission-root .cm-status{padding:13px;border:1px solid #a84949;border-radius:4px;background:#111720}
				#seashell-submission-root .cm-success{border-color:#398750;color:#b8f0c8}
				#seashell-submission-root .cm-error{border-color:#c65050;color:#ffb5b5}
				#seashell-submission-root .cm-working{border-color:#3979c9;color:#b8d7ff}
				#seashell-submission-root .cm-warning{border-color:#ca9144;color:#ffd7a1}
				#seashell-submission-root [hidden]{display:none!important}
				@media(max-width:760px){#seashell-submission-root .cm-type-tabs{grid-template-columns:repeat(2,1fr)}#seashell-submission-root .cm-grid,#seashell-submission-root .cm-picker,#seashell-submission-root .cm-section{grid-template-columns:1fr}#seashell-submission-root .cm-full{grid-column:auto}}
			`;
			document.head.appendChild(style);

			root.innerHTML = `
				<div class="cm-manager">
					<div class="cm-tabs cm-type-tabs">
						<button class="cm-type is-active" type="button" data-type="medal">Medals</button>
						<button class="cm-type" type="button" data-type="trait">Traits</button>
						<button class="cm-type" type="button" data-type="skill">Skills</button>
						<button class="cm-type" type="button" data-type="item">Items</button>
						<button class="cm-type" type="button" data-type="location">Locations</button>
						<button class="cm-type" type="button" data-type="character">Characters</button>
					</div>
					<div class="cm-tabs cm-mode-tabs">
						<button class="cm-mode is-active" type="button" data-mode="create">Create</button>
						<button class="cm-mode" type="button" data-mode="edit">Edit</button>
						<button class="cm-mode cm-admin-delete" type="button" data-mode="delete" ${isAdmin ? "" : "hidden"}>Delete</button>
					</div>
					<div id="cm-edit-panel" class="cm-panel" hidden>
						<div class="cm-picker"><div class="cm-field"><label for="cm-edit-select">Find an Existing Page</label><select id="cm-edit-select"><option value="">Loading...</option></select></div><button id="cm-load" type="button">Load and Prefill</button></div>
					</div>
					<div id="cm-delete-panel" class="cm-panel" hidden>
						<div class="cm-picker"><div class="cm-field"><label for="cm-delete-select">Choose a Page to Delete</label><select id="cm-delete-select"><option value="">Loading...</option></select><div class="cm-help">Administrators only. This deletes the article and removes its directory row when found.</div></div><button id="cm-delete" class="cm-delete" type="button">Delete</button></div>
					</div>
					<form id="cm-form" class="cm-form">
						<div class="cm-panel"><div class="cm-grid">
							<div class="cm-field"><label for="cm-name">Exact Page Name</label><input id="cm-name" required maxlength="100"><div id="cm-name-help" class="cm-help">Use the exact in-game name.</div></div>
							<div id="cm-rarity-wrap" class="cm-field"><label for="cm-rarity">Rarity</label><select id="cm-rarity"><option value="">Select rarity</option><option>Mythic</option><option>Legendary</option><option>Epic</option><option>Uncommon</option><option>Common</option></select></div>
							<div id="cm-dynamic-fields" class="cm-full cm-grid"></div>
							<div class="cm-field cm-full"><label for="cm-description">Description</label><textarea id="cm-description" placeholder="Enter confirmed information."></textarea><div class="cm-help">Used on the article and in its directory row.</div></div>
							<div class="cm-field"><label id="cm-image-label" for="cm-image">Card Art Filename</label><input id="cm-image" value="Blank Card Art.png"><div id="cm-image-help" class="cm-help">Upload first, then enter the exact filename.</div></div>
							<div class="cm-field"><label for="cm-image-caption">Image Caption</label><input id="cm-image-caption"></div>
							<div id="cm-status-wrap" class="cm-field"><label for="cm-status">Status</label><input id="cm-status" value="Obtainable"></div>
						</div></div>
						<div class="cm-panel"><div class="cm-field"><label>Optional Article Sections</label><div class="cm-help">Blank sections are not saved. Rename, add, or remove any section.</div><div id="cm-section-list" class="cm-section-list"></div><button id="cm-add-section" type="button">+ Add Section</button></div></div>
						<div id="cm-demo-panel" class="cm-panel"><div class="cm-grid"><div class="cm-field"><label for="cm-demo">YouTube Link or Uploaded Video/GIF</label><input id="cm-demo" placeholder="YouTube link or Example.gif"></div><div class="cm-field"><label for="cm-demo-caption">Demonstration Caption</label><input id="cm-demo-caption"></div></div></div>
						<div class="cm-actions"><button id="cm-submit" class="cm-submit" type="submit">Create Medal</button><a class="cm-button" href="/wiki/Special:Upload" target="_blank" rel="noopener">UPLOAD A FILE</a></div>
					</form>
					<div id="cm-result" aria-live="polite"></div>
				</div>`;

			const el = function (id) { return document.getElementById(id); };
			const form = el("cm-form");
			const dynamic = el("cm-dynamic-fields");
			const sections = el("cm-section-list");
			const result = el("cm-result");
			const submit = el("cm-submit");
			const editPanel = el("cm-edit-panel");
			const deletePanel = el("cm-delete-panel");
			const editSelect = el("cm-edit-select");
			const deleteSelect = el("cm-delete-select");

			const escapeHtml = function (value) { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); };
			const regexEscape = function (value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
			const clean = function (value) { return String(value || "").trim(); };
			const oneLine = function (value) { return clean(value).replace(/\s+/g, " "); };
			const safe = function (value) { return clean(value).replace(/\|/g, "{{!}}"); };
			const restore = function (value) { return clean(value).replace(/\{\{!\}\}/g, "|"); };

			function show(message, kind) { result.innerHTML = '<div class="cm-status cm-' + kind + '">' + message + "</div>"; }

			function input(name, label, options) {
				const o = options || {};
				const cls = "cm-field" + (o.full ? " cm-full" : "");
				const help = o.help ? '<div class="cm-help">' + o.help + "</div>" : "";
				if (o.select) return '<div class="' + cls + '"><label for="cm-' + name + '">' + label + '</label><select id="cm-' + name + '" name="' + name + '">' + o.select.map(function (v) { return '<option value="' + escapeHtml(v) + '">' + escapeHtml(v) + "</option>"; }).join("") + "</select>" + help + "</div>";
				if (o.textarea) return '<div class="' + cls + '"><label for="cm-' + name + '">' + label + '</label><textarea id="cm-' + name + '" name="' + name + '"></textarea>' + help + "</div>";
				return '<div class="' + cls + '"><label for="cm-' + name + '">' + label + '</label><input id="cm-' + name + '" name="' + name + '" value="' + escapeHtml(o.value || "") + '" placeholder="' + escapeHtml(o.placeholder || "") + '">' + help + "</div>";
			}

			function renderDynamic() {
				const c = CONFIG[type];
				el("cm-rarity-wrap").hidden = !c.rarity;
				let html = "";
				if (c.requirements) html += input("requirements", "Requirements", { full: true, placeholder: "Leave blank when none", help: "Links such as [[Six Sense]] are allowed." });
				if (c.obtained) html += input("obtained", "How It Is Obtained", { value: c.defaultObtained || "" });
				if (c.item) {
					html += input("itemCategory", "Item Category", { select: ["Weapon", "Medical", "Utility", "Accessory", "Ammunition", "Grenade", "Explosive", "Currency", "Miscellaneous"] });
					html += '<div id="cm-weapon-wrap">' + input("weaponType", "Weapon Type", { select: ["Melee", "Gun"] }) + "</div>";
					html += input("statistics", "Statistics", { textarea: true, full: true });
					html += input("usage", "Usage", { textarea: true, full: true });
				}
				if (c.location) {
					html += input("locationType", "Location Type", { select: ["Country", "Region", "City", "Fort", "Airfield Base", "Landmark", "Other"] });
					html += input("country", "Country", { help: "Optional." });
					html += input("region", "Region", { help: "Optional." });
					html += input("parent", "Parent Location", { help: "Optional. Use this for a place located inside another place." });
					html += input("placeLink", "Roblox Place Link", { full: true, placeholder: "https://www.roblox.com/games/...", help: "Optional." });
				}
				if (c.character) {
					html += input("characterType", "Character Type", { select: ["Player", "NPC"] });
					html += '<div id="cm-roblox-user-wrap">' + input("robloxUser", "Roblox Username", { help: "Optional and only shown for Player characters." }) + "</div>";
					[ ["fullName","Full Name"],["aliases","Aliases"],["age","Age"],["birthplace","Born In"],["languages","Languages"],["height","Height"],["country","Country"],["regiment","Regiment"],["division","Division"] ].forEach(function (x) { html += input(x[0], x[1]); });
					html += input("personality", "Personality", { textarea: true, full: true }); html += input("background", "Background", { textarea: true, full: true });
					[ ["strength","Strength","1"],["fortitude","Fortitude","1"],["agility","Agility","1"],["dexterity","Dexterity","1"],["precision","Precision","1"],["rank","Rank",""],["role","Role",""],["squad","Squad",""],["serviceStatus","Service Status",""] ].forEach(function (x) { html += input(x[0], x[1], { value: x[2] }); });
					html += input("traits", "Traits", { textarea: true, full: true, help: "One per line." }); html += input("medals", "Medals", { textarea: true, full: true, help: "One per line." });
					[ ["titanKills","Titan Kills"],["abnormalKills","Abnormal Kills"],["humanKills","Human Kills"],["humanAssists","Human Assists"],["bandages","Bandages Used"],["bandageRemovals","Bandage Removals"],["revivals","Revivals"] ].forEach(function (x) { html += input(x[0], x[1], { value: "0" }); });
				}
				dynamic.innerHTML = html;
				const category = el("cm-itemCategory");
				if (category) category.addEventListener("change", updateWeapon);
				const characterType = el("cm-characterType");
				if (characterType) characterType.addEventListener("change", updateCharacterType);
				updateWeapon();
				updateCharacterType();
			}

			function updateWeapon() {
				const category = el("cm-itemCategory");
				const wrap = el("cm-weapon-wrap");
				if (category && wrap) wrap.hidden = category.value !== "Weapon";
			}

			function updateCharacterType() {
				const characterType = el("cm-characterType");
				const robloxWrap = el("cm-roblox-user-wrap");
				if (!characterType || !robloxWrap) return;
				robloxWrap.hidden = characterType.value !== "Player";
				if (characterType.value !== "Player") {
					const robloxInput = el("cm-robloxUser");
					if (robloxInput) robloxInput.value = "";
				}
			}

			function addSection(title, content) {
				const row = document.createElement("div");
				row.className = "cm-section";
				row.innerHTML = '<div class="cm-field"><label>Section Heading</label><input class="cm-section-title"></div><div class="cm-field"><label>Section Content</label><textarea class="cm-section-content"></textarea></div><button class="cm-remove" type="button">Remove</button>';
				row.querySelector(".cm-section-title").value = title || "";
				row.querySelector(".cm-section-content").value = content || "";
				row.querySelector(".cm-remove").addEventListener("click", function () { row.remove(); });
				sections.appendChild(row);
			}

			function defaultSections() {
				sections.innerHTML = "";
				if (type === "medal" || type === "trait" || type === "skill") { addSection("Effects"); addSection("Usage"); }
				if (type === "character") { addSection("History"); addSection("Previous Information"); addSection("Relationships"); }
			}

			function resetForm() {
				form.reset(); loadedName = ""; loadedPage = null; el("cm-name").disabled = false; el("cm-name-help").textContent = "Use the exact in-game name.";
				renderDynamic(); defaultSections();
				el("cm-image").value = type === "character" ? "Character Image.png" : type === "location" ? "" : "Blank Card Art.png";
				el("cm-image-caption").value = type === "character" ? "Image of the character." : type === "location" ? "Image or map of the location." : type === "item" ? "In game image of this item." : CONFIG[type].label + " card artwork.";
				el("cm-image-label").textContent = type === "character" ? "Character Image Filename" : type === "location" ? "Location Image or Map Filename" : type === "item" ? "Item Image Filename" : "Card Art Filename";
				el("cm-image-help").textContent = "Upload the image first, then enter its exact filename.";
				el("cm-status-wrap").hidden = type === "character";
				el("cm-demo-panel").hidden = type === "character";
				el("cm-status").value = type === "location" ? "Accessible" : type === "character" ? "" : "Obtainable";
				el("cm-rarity").value = "";
			}

			function getData() {
				const defaultImage = type === "character" ? "Character Image.png" : type === "location" ? "" : "Blank Card Art.png";
				const data = { type: type, name: oneLine(el("cm-name").value), rarity: clean(el("cm-rarity").value), description: clean(el("cm-description").value), image: oneLine(el("cm-image").value || defaultImage).replace(/^File:/i, ""), imageCaption: clean(el("cm-image-caption").value), status: type === "character" ? "" : clean(el("cm-status").value), demo: type === "character" ? "" : clean(el("cm-demo").value), demoCaption: type === "character" ? "" : clean(el("cm-demo-caption").value), sections: [] };
				dynamic.querySelectorAll("[name]").forEach(function (node) { data[node.name] = clean(node.value); });
				sections.querySelectorAll(".cm-section").forEach(function (row) { const title = clean(row.querySelector(".cm-section-title").value).replace(/=/g, ""); const content = clean(row.querySelector(".cm-section-content").value); if (title && content) data.sections.push({ title: title, content: content }); });
				return data;
			}

			function validate(data) {
				if (!data.name || /[#<>\[\]{}|:]/.test(data.name)) return "Enter a valid page name without a namespace or wiki formatting characters.";
				if (CONFIG[type].rarity && !data.rarity) return "Select a rarity.";
				if (data.demo && !youtubeId(data.demo) && !/\.(gif|mp4|webm|ogv|ogg)$/i.test(data.demo.replace(/^File:/i, "")) && !/^https?:\/\//i.test(data.demo)) return "Use a YouTube link, uploaded GIF/video filename, or valid link for the demonstration.";
				return "";
			}

			function youtubeId(value) { const match = String(value || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/); return match ? match[1] : ""; }
			function linkedList(value) { return clean(value).split(/\n|,/).map(function (v) { return clean(v); }).filter(Boolean).map(function (v) { return v.startsWith("[[") ? "* " + v : "* [[" + v + "]]"; }).join("\n"); }
			function bullets(value) { return clean(value).split("\n").map(function (v) { return clean(v); }).filter(Boolean).map(function (v) { return v.startsWith("*") ? v : "* " + v; }).join("\n"); }
			function param(lines, key, value, includeBlank) { const v = safe(value); if (v || includeBlank) lines.push("|" + key + " = " + v); }
			function section(lines, title, value) { const v = clean(value); if (v) lines.push("", "==" + title + "==", v); }

			function demoLines(data) {
				if (!data.demo) return [];
				const id = youtubeId(data.demo); const caption = safe(data.demoCaption || "Demonstration.");
				if (id) return ["", "==Demonstration==", "{{#ev:youtube|" + id + "|640|center|" + caption + "}}"];
				if (/^https?:\/\//i.test(data.demo)) return ["", "==Demonstration==", "[" + data.demo + " View demonstration]"];
				return ["", "==Demonstration==", "[[File:" + data.demo.replace(/^File:/i, "") + "|640px|center|" + caption + "]]" ];
			}

			function articleText(data) {
				const c = CONFIG[type]; const lines = ["{{" + c.template];
				param(lines, "name", "{{PAGENAME}}", true); param(lines, "image", data.image, true); param(lines, "imagecaption", data.imageCaption, true);
				if (c.rarity) param(lines, "rarity", data.rarity, true);
				if (c.requirements) param(lines, "requirements", data.requirements, true);
				if (c.obtained) param(lines, "obtained", data.obtained || c.defaultObtained, true);
				if (c.item) { param(lines, "category", data.itemCategory, true); param(lines, "weapontype", data.itemCategory === "Weapon" ? data.weaponType : "", true); }
				if (c.location) { param(lines, "type", data.locationType, true); param(lines, "country", data.country, true); param(lines, "region", data.region, true); param(lines, "parent", data.parent, true); param(lines, "placelink", data.placeLink, true); }
				if (c.character) {
					["fullName","aliases","robloxUser","age","birthplace","languages","height","country","regiment","division","personality","background","strength","fortitude","agility","dexterity","precision","rank","role","squad","serviceStatus","titanKills","abnormalKills","humanKills","humanAssists","bandages","bandageRemovals","revivals"].forEach(function (key) { const wikiKey = key.toLowerCase(); param(lines, wikiKey, data[key], true); });
					param(lines, "type", data.characterType, true);
					param(lines, "traits", linkedList(data.traits), true); param(lines, "medals", linkedList(data.medals), true);
				}
				param(lines, "description", data.description, true); if (!c.character) param(lines, "status", data.status, true); lines.push("}}", "", "'''{{PAGENAME}}''' is " + (type === "item" ? "an Item" : "a " + c.label) + " in Seashell.");
				section(lines, "Description", data.description);
				if (c.requirements && data.requirements && data.requirements.toLowerCase() !== "none") section(lines, "Requirements", bullets(data.requirements.replace(/,\s*/g, "\n")));
				if (c.item) { section(lines, "Statistics", data.statistics); section(lines, "Usage", data.usage); }
				data.sections.forEach(function (s) { section(lines, s.title, s.content); });
				lines.push.apply(lines, demoLines(data));
				lines.push("", "[[Category:" + c.category + "]]", "[[Category:Community submissions]]");
				if (c.item) { if (data.itemCategory === "Weapon") lines.push("[[Category:Weapons]]", "[[Category:" + (data.weaponType === "Gun" ? "Guns" : "Melee Weapons") + "]]"); else lines.push("[[Category:" + data.itemCategory + " Items]]"); }
				if (c.location) { const map = { Country:"Countries",Region:"Regions",City:"Cities",Fort:"Forts","Airfield Base":"Airfield Bases",Landmark:"Landmarks",Other:"Other Locations" }; lines.push("[[Category:" + map[data.locationType] + "]]"); }
				return lines.join("\n").trim() + "\n";
			}

			function templateField(text, key) { const match = text.match(new RegExp("^\\|" + regexEscape(key) + "[ \\t]*=[ \\t]*(.*)$", "mi")); return match ? restore(match[1]) : ""; }
			function articleSections(text) { const out = []; const matches = []; const re = /^==([^=\n]+)==\s*$/gm; let m; while ((m = re.exec(text))) matches.push({ title: clean(m[1]), start: m.index, contentStart: re.lastIndex }); matches.forEach(function (h, i) { const end = i + 1 < matches.length ? matches[i + 1].start : text.length; out.push({ title: h.title, content: clean(text.slice(h.contentStart, end).replace(/\[\[Category:[^\]]+\]\]/gi, "")) }); }); return out; }
			function parseDemo(text) { const y = text.match(/\{\{#ev:youtube\|([A-Za-z0-9_-]{11})\|[^|}]*\|([^}]*)\}\}/i); if (y) return { source:"https://www.youtube.com/watch?v=" + y[1], caption:restore(y[2]) }; const f = text.match(/\[\[File:([^\vert{}\]]+)(?:\Vert{}[^\]]*)?\]\]/i); return f ? { source:clean(f[1]), caption:"" } : { source:"", caption:"" }; }

			function fillForm(name, text, page) {
				resetForm(); loadedName = name; loadedPage = page; el("cm-name").value = name; el("cm-name").disabled = true; el("cm-name-help").textContent = "The page name cannot be changed while editing.";
				el("cm-rarity").value = templateField(text, "rarity"); el("cm-description").value = templateField(text, "description"); el("cm-image").value = templateField(text, "image"); el("cm-image-caption").value = templateField(text, "imagecaption"); el("cm-status").value = templateField(text, "status");
				const map = { requirements:"requirements",obtained:"obtained",itemCategory:"category",weaponType:"weapontype",locationType:"type",country:"country",region:"region",parent:"parent",placeLink:"placelink",characterType:"type",fullName:"fullname",aliases:"aliases",robloxUser:"robloxuser",age:"age",birthplace:"birthplace",languages:"languages",height:"height",regiment:"regiment",division:"division",personality:"personality",background:"background",strength:"strength",fortitude:"fortitude",agility:"agility",dexterity:"dexterity",precision:"precision",rank:"rank",role:"role",squad:"squad",serviceStatus:"servicestatus",titanKills:"titankills",abnormalKills:"abnormalkills",humanKills:"humankills",humanAssists:"humanassists",bandages:"bandages",bandageRemovals:"bandageremovals",revivals:"revivals" };
				Object.keys(map).forEach(function (nameKey) { const node = form.querySelector('[name="' + nameKey + '"]'); if (node) node.value = templateField(text, map[nameKey]); });
				const traits = form.querySelector('[name="traits"]'); const medals = form.querySelector('[name="medals"]'); if (traits) traits.value = templateField(text,"traits").replace(/^\*\s*\[\[\vert{}\]\]$/gm,""); if (medals) medals.value = templateField(text,"medals").replace(/^\*\s*\[\[\vert{}\]\]$/gm,"");
				const secs = articleSections(text); const demo = parseDemo((secs.find(function (s) { return s.title.toLowerCase() === "demonstration"; }) || {}).content || ""); el("cm-demo").value = demo.source; el("cm-demo-caption").value = demo.caption; sections.innerHTML = "";
				const reserved = ["description","requirements","demonstration","statistics","usage"];
				secs.filter(function (s) { return !reserved.includes(s.title.toLowerCase()); }).forEach(function (s) { if (s.content) addSection(s.title,s.content); });
				function fromSection(nameKey,title) { const node=form.querySelector('[name="'+nameKey+'"]'); const sec=secs.find(function(s){return s.title.toLowerCase()===title.toLowerCase();}); if(node&&sec) node.value=sec.content.replace(/^\*\s*/gm,""); }
				fromSection("statistics","Statistics"); fromSection("usage","Usage"); updateWeapon(); updateCharacterType();
			}

			function pageRequest(title) { return api.get({ action:"query",prop:"info|revisions",titles:title,rvprop:"content|timestamp",rvslots:"main",curtimestamp:1,formatversion:2 }).then(function (r) { const p=r.query.pages[0]; const missing=Object.prototype.hasOwnProperty.call(p,"missing"); const rev=!missing&&p.revisions?p.revisions[0]:null; return { missing:missing, content:rev&&rev.slots&&rev.slots.main?(rev.slots.main.content||""):"", revisionId:p.lastrevid||0, revisionTimestamp:rev?rev.timestamp:null, currentTimestamp:r.curtimestamp||null }; }); }
			function editParams(title,text,summary,page) { const p={action:"edit",title:title,text:text,summary:summary,watchlist:"nochange",formatversion:2}; if(page&&page.revisionId)p.baserevid=page.revisionId;if(page&&page.revisionTimestamp)p.basetimestamp=page.revisionTimestamp;if(page&&page.currentTimestamp)p.starttimestamp=page.currentTimestamp;return p; }
			function categoryNames() { const names=[]; function next(cont) { const q={action:"query",list:"categorymembers",cmtitle:"Category:"+CONFIG[type].category,cmnamespace:0,cmlimit:"max",formatversion:2}; if(cont)q.cmcontinue=cont; return api.get(q).then(function(r){r.query.categorymembers.forEach(function(x){names.push(x.title);});return r.continue?next(r.continue.cmcontinue):names.sort(function(a,b){return a.localeCompare(b);});}); } return next(); }
			function options(names) { return '<option value="">Select an entry</option>' + names.map(function (n) { return '<option value="' + escapeHtml(n) + '">' + escapeHtml(n) + "</option>"; }).join(""); }
			function refreshLists() { return categoryNames().then(function(names){const html=options(names);editSelect.innerHTML=html;deleteSelect.innerHTML=html;}); }

			function marker(data) { if(type==="medal")return "<!-- MEDAL_ROWS_"+data.rarity.toUpperCase()+"_END -->";if(type==="trait")return "<!-- TRAIT_ROWS_END -->";if(type==="skill")return "<!-- SKILL_ROWS_END -->";if(type==="item")return (data.itemCategory||"").toUpperCase()==="WEAPON"?"<!-- ITEM_ROWS_WEAPON_"+(data.weaponType||"MELEE").toUpperCase()+"_END -->":"<!-- ITEM_ROWS_"+(data.itemCategory||"MISCELLANEOUS").toUpperCase().replace(/\s+/g,"_")+"_END -->";if(type==="location")return "<!-- LOCATION_ROWS_"+(data.locationType||"OTHER").toUpperCase().replace(/\s+/g,"_")+"_END -->";return "<!-- CHARACTER_ROWS_END -->"; }
			function directoryRow(data) { const row=["|-","| '''[["+data.name+"]]'''"]; if(type==="medal")row.push("| "+safe(data.requirements));if(type==="location"&&data.locationType!=="Country"){const located=data.parent||data.region||data.country;row.push("| "+(located?"[["+safe(located)+"]]":"Unknown"));}row.push("| "+safe(data.description));if((type==="trait"||type==="skill"))row.push("| "+safe(data.obtained));row.push("");return row.join("\n"); }

			function removeAllRows(text, name) {
				const lines = text.split("\n");
				const re = new RegExp("^\\|\\s*'''\\[\\[" + regexEscape(name) + "(?:\\|[^\\]]+)?\\]\\]'''\\s*$", "i");
				let modified = false;

				while (true) {
					const link = lines.findIndex(function (line) { return re.test(line); });
					if (link < 0) break;
					
					let start = link;
					while (start >= 0 && lines[start].trim() !== "|-") start -= 1;
					if (start < 0) break;

					let end = link + 1;
					while (end < lines.length && !/^\|-\s*$/.test(lines[end].trim()) && !/^\|}\s*$/.test(lines[end].trim()) && !/^<!-- .*_END -->\s*$/.test(lines[end].trim())) end += 1;

					lines.splice(start, end - start);
					modified = true;
				}

				return modified ? lines.join("\n") : text;
			}

			function updateDirectory(text, data, oldName) {
				let updated = removeAllRows(text, data.name);
				if (oldName && oldName.toLowerCase() !== data.name.toLowerCase()) {
					updated = removeAllRows(updated, oldName);
				}

				const mark = marker(data);
				const target = directoryRow(data);

				if (updated.includes(mark)) {
					return updated.replace(mark, target + "\n" + mark);
				}

				return updated.replace("|}", target + "\n|}");
			}

			function setType(nextType) {
				type = nextType;
				document.querySelectorAll(".cm-type").forEach(function (btn) {
					btn.classList.toggle("is-active", btn.getAttribute("data-type") === type);
				});
				submit.textContent = (mode === "edit" ? "Update " : "Create ") + CONFIG[type].label;
				resetForm();
				refreshLists();
			}

			function setMode(nextMode) {
				mode = nextMode;
				document.querySelectorAll(".cm-mode").forEach(function (btn) {
					btn.classList.toggle("is-active", btn.getAttribute("data-mode") === mode);
				});
				editPanel.hidden = mode !== "edit";
				deletePanel.hidden = mode !== "delete";
				submit.hidden = mode === "delete";
				submit.textContent = (mode === "edit" ? "Update " : "Create ") + CONFIG[type].label;
				resetForm();
				refreshLists();
			}

			document.querySelectorAll(".cm-type").forEach(function (btn) {
				btn.addEventListener("click", function () { setType(btn.getAttribute("data-type")); });
			});

			document.querySelectorAll(".cm-mode").forEach(function (btn) {
				btn.addEventListener("click", function () { setMode(btn.getAttribute("data-mode")); });
			});

			el("cm-add-section").addEventListener("click", function () { addSection("", ""); });

			el("cm-load").addEventListener("click", function () {
				const name = editSelect.value;
				if (!name) return show("Please select an entry to load.", "error");
				show("Loading page data...", "working");
				pageRequest(name).then(function (p) {
					if (p.missing) return show("That page could not be found.", "error");
					fillForm(name, p.content, p);
					show("Page loaded successfully. You can now edit and save changes.", "success");
				}).catch(function (err) {
					show("Error loading page: " + (err.message || err), "error");
				});
			});

			el("cm-delete").addEventListener("click", function () {
				const name = deleteSelect.value;
				if (!name) return show("Please select a page to delete.", "error");
				if (!confirm('Are you sure you want to delete "' + name + '" and remove it from the directory?')) return;

				show("Deleting page and updating directory...", "working");
				const dirTitle = CONFIG[type].directory;

				api.postWithToken("csrf", { action: "delete", title: name, reason: "Deleted via Content Manager" }).then(function () {
					return pageRequest(dirTitle);
				}).then(function (dirPage) {
					if (dirPage.missing) return show("Article deleted, but directory page was not found.", "warning");
					const updatedDir = removeAllRows(dirPage.content, name);
					if (updatedDir === dirPage.content) {
						return show("Article deleted successfully.", "success");
					}
					return api.postWithToken("csrf", editParams(dirTitle, updatedDir, "Removed deleted entry [[" + name + "]] from directory", dirPage)).then(function () {
						show("Article deleted and directory updated successfully.", "success");
					});
				}).then(function () {
					resetForm();
					refreshLists();
				}).catch(function (err) {
					show("Delete error: " + (err.message || err), "error");
				});
			});

			form.addEventListener("submit", function (e) {
				e.preventDefault();
				const data = getData();
				const error = validate(data);
				if (error) return show(error, "error");

				submit.disabled = true;
				show("Processing request...", "working");

				const articleTitle = data.name;
				const dirTitle = CONFIG[type].directory;

				pageRequest(articleTitle).then(function (artPage) {
					if (mode === "create" && !artPage.missing) {
						submit.disabled = false;
						return show('A page named "' + escapeHtml(articleTitle) + '" already exists! Switch to Edit mode to update it.', "error");
					}

					const artContent = articleText(data);
					const artSummary = (mode === "create" ? "Created " : "Updated ") + CONFIG[type].label + " via Content Manager";

					return api.postWithToken("csrf", editParams(articleTitle, artContent, artSummary, mode === "edit" ? loadedPage : artPage)).then(function () {
						return pageRequest(dirTitle);
					}).then(function (dirPage) {
						if (dirPage.missing) {
							show("Article saved, but directory page [[" + dirTitle + "]] could not be found.", "warning");
							return;
						}

						const updatedDir = updateDirectory(dirPage.content, data, loadedName);
						return api.postWithToken("csrf", editParams(dirTitle, updatedDir, (mode === "create" ? "Added " : "Updated ") + "[[" + articleTitle + "]] in directory", dirPage)).then(function () {
							show("Successfully " + (mode === "create" ? "created" : "updated") + ' "[[' + escapeHtml(articleTitle) + ']]" and updated the directory!', "success");
						});
					});
				}).then(function () {
					submit.disabled = false;
					if (mode === "create") resetForm();
					refreshLists();
				}).catch(function (err) {
					submit.disabled = false;
					show("Error saving content: " + (err.message || err), "error");
				});
			});

			resetForm();
			refreshLists();
		});
	}

	start();
})();