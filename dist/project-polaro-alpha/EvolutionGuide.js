/*
 *  → Initializes an evolution search UI when #evolution-data-placeholder is present.
 *  → Reads JSON from the placeholder and builds a canonical, case-insensitive species index (incl. aliases, regional/forms).
 *  → Creates a contenteditable search box with clear button and an autocomplete list (capped by suggestSize).
 *  → Supports keyboard navigation in autocomplete (↑/↓ to select, Enter to search) and click-to-choose.
 *  → Renders evolution chains with linear and branching paths, methods, and form tabs when multiple forms exist.
 *  → Special-cases anchors for Mega forms (e.g., Charizard X/Y, Mewtwo X/Y) and Paldean Tauros breeds.
 *  → Lets you compare up to 5 evolution chains side-by-side, with add/remove controls.
 *  → Syncs the current selection(s) with the URL (?q= single, ?c= multi) via history.replaceState, and restores on load.
 *  → Provides previous/next entry buttons and previous/next chain navigation.
 *  → Manages placeholders, focus/blur, and hides suggestions on outside clicks.
 *  → Skips initialization if required DOM nodes are missing.
 */
function initEvolutionSearch() {
  mw.hook('wikipage.content').add(function () {
    const placeholder = document.getElementById('evolution-data-placeholder');
    if (!placeholder) {
      console.warn('Evolution data placeholder not found.');
      return;
    }
    const container = document.getElementById('evo-search-container');
    container.innerHTML = `
      <div class="evo-search-input empty" id="evo-search" contenteditable="true" data-placeholder="Type a Pokémon name..."></div>
      <div class="clear-button" id="clear-button">×</div>
      <div class="autocomplete-list" id="autocomplete-list"></div>
    `;
    let raw = placeholder.textContent.trim();
    let data;
    try {
	  data = JSON.parse(raw);
	} catch (err) {
	  console.error("Failed to parse evolution data:", err);
	  console.log("Raw content:", raw);
	  return;
	} finally {
	  placeholder.textContent = '';
	}
    const evoData = data;
	const speciesList = Array.isArray(data.__order) && data.__order.length
	  ? data.__order
	  : Object.keys(data)
	      .filter(k => !k.startsWith("__"))
	      .sort((a,b) => (data[a].PokedexNumber||9e9) - (data[b].PokedexNumber||9e9));
	setupAutocomplete(speciesList, evoData);
  });
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function escRx(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
	function baseNameOf(name){
	  return String(name).replace(/^(Alolan|Galarian|Hisuian|Paldean)\s+/i, '');
	}
	
	var formPrefixDisplay = (typeof formPrefixDisplay !== "undefined" && formPrefixDisplay instanceof Set)
	  ? formPrefixDisplay
	  : new Set([
	      "Primal",
	    ]);

	function displayNameFor(fullName) {
	  if (!fullName) return fullName;
	  const s = String(fullName).trim();
	
	  const list = (typeof formPrefixDisplay !== "undefined" && formPrefixDisplay) ? formPrefixDisplay : new Set();
	
	  for (const form of list) {
	    const suff = " " + form;
	    if (s.toLowerCase().endsWith(suff.toLowerCase())) {
	      const baseTrim = s.slice(0, s.length - suff.length).trim();
	      if (baseTrim) return `${form} ${baseTrim}`;
	    }
	  }
	  return s;
	}
	
	function parentNameOf(entry) {
	  if (!entry || !entry.EvolvesFrom) return null;
	  const ef = entry.EvolvesFrom;
	  if (typeof ef === "string") {
	    return ef.normalize('NFKC').replace(/\s+/g, ' ').trim();
	  }
	  if (typeof ef === "object") {
	    const base = String(ef.Base || ef.base || ef.Name || ef.name || "")
	      .normalize('NFKC').replace(/\s+/g, ' ').trim();
	    const form = ef.Form != null
	      ? String(ef.Form || ef.form).normalize('NFKC').replace(/\s+/g, ' ').trim()
	      : "";
	    if (!base) return null;
	    const out = form ? `${form} ${base}` : base;
	    return out.normalize('NFKC').replace(/\s+/g, ' ').trim();
	  }
	  return null;
	}
  function setupAutocomplete(entries, evoData) {
	
	const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
	function normApos(s){ return String(s).replace(/\u2019/g, "'"); }
	const lowerNameToKey = new Map();
	for (const k in evoData) if (!k.startsWith('__')) lowerNameToKey.set(k.toLowerCase(), k);
	
	const aliasExact = evoData.__aliases || {};
	const aliasLowerToKey = new Map();
	for (const pretty in aliasExact) aliasLowerToKey.set(pretty.toLowerCase(), aliasExact[pretty]);
	
	const aliasTargetToPretty = new Map();
	for (const pretty in aliasExact) aliasTargetToPretty.set(aliasExact[pretty], pretty);
	
	function keyLookup() { return lowerNameToKey; }
	function reverseAliasesMap() { return aliasTargetToPretty; }
	
	function actualKeyFor(name){
	  if (!name) return null;
	  if (evoData[name]) return name;
	  const ln = normApos(name).toLowerCase();
	  return lowerNameToKey.get(ln) || aliasLowerToKey.get(ln) || null;
	}
	
	function listFormsFor(name) {
	  const lowerMap   = keyLookup();
	  const revAliases = reverseAliasesMap();
	  const resolved   = actualKeyFor(name) || name;
	
	  let base = null;
	  if (evoData.__forms) {
	    const wanted = String(resolved).toLowerCase();
	
	    for (const b in evoData.__forms) {
	      const bLower = b.toLowerCase();
	      if (bLower === wanted) { base = b; break; }
	
	      const forms = Array.isArray(evoData.__forms[b]) ? evoData.__forms[b] : [];
	      for (const form of forms) {
	        const pretty = /^(Alolan|Galarian|Hisuian|Paldean)\b/i.test(form) || form.startsWith(`${b} `)
	          ? form
	          : `${b} ${form}`;
	        const prettyLower = pretty.toLowerCase();
	        const key = actualKeyFor(pretty);
	        if (prettyLower === wanted || (key && key.toLowerCase() === wanted)) {
	          base = b;
	          break;
	        }
	      }
	      if (base) break;
	    }
	  }
	  if (!base) {
		  const fromAlias = revAliases.get(resolved);
		  base = baseNameOf(fromAlias || name);
		
		  if (
		    typeof formPrefixDisplay !== "undefined" &&
		    formPrefixDisplay &&
		    formPrefixDisplay.size &&
		    base.toLowerCase() === String(resolved).toLowerCase()
		  ) {
		    const rx = new RegExp(
		      `^(?:${[...formPrefixDisplay].map(escRx).join("|")})\\s+(.+)$`,
		      "i"
		    );
		    const m = String(resolved).match(rx);
		    if (m && m[1]) base = m[1].trim();
		  }
		}
	
	  if (/^Tauros\b/i.test(base) || /^Paldean\s+Tauros\b/i.test(name)) {
	    const taurosForms = [
	      'Tauros',
	      'Paldean Tauros Combat Breed',
	      'Paldean Tauros Blaze Breed',
	      'Paldean Tauros Aqua Breed'
	    ];
	    return taurosForms.map(n => actualKeyFor(n)).filter(Boolean);
	  }
	  if (/^Darmanitan\b/i.test(base) || /^Galarian\s+Darmanitan\b/i.test(name)) {
	    const prefer = [
	      'Darmanitan',
	      'Darmanitan Zen',
	      'Galarian Darmanitan',
	      'Galarian Darmanitan Zen'
	    ];
	
	    const picks = prefer
	      .map(label => actualKeyFor(label))
	      .filter(Boolean);
	
	    if (picks.length) return picks;
	  }
	
	  const out  = [];
	  const seen = new Set();
	
	  if (evoData.__forms && Array.isArray(evoData.__forms[base])) {
	  const baseKey = actualKeyFor(base);
	  if (baseKey && !seen.has(baseKey)) { out.push(baseKey); seen.add(baseKey); }
	
	  for (const form of evoData.__forms[base]) {
	    const pretty = /^(Alolan|Galarian|Hisuian|Paldean)\b/i.test(form) || form.startsWith(`${base} `)
	      ? form
	      : `${base} ${form}`;
	    const key = actualKeyFor(pretty);
	    if (key && !seen.has(key)) { out.push(key); seen.add(key); }
	  }
	
	  if (typeof formPrefixDisplay !== "undefined" && formPrefixDisplay && formPrefixDisplay.size) {
	    for (const form of formPrefixDisplay) {
	      const prefixed = actualKeyFor(`${form} ${base}`);
	      if (prefixed && !seen.has(prefixed)) { out.push(prefixed); seen.add(prefixed); }
	    }
	  }
	
	  return out;
	}
	
	  const keys = Object.keys(evoData).filter(k => !k.startsWith("__"));
	
	  const plainKey   = keys.find(k => k.toLowerCase() === base.toLowerCase());
	  const aliasTarget = evoData.__aliases && evoData.__aliases[base];
	  if (plainKey) { out.push(plainKey); seen.add(plainKey); }
	  else if (aliasTarget && keys.includes(aliasTarget)) { out.push(aliasTarget); seen.add(aliasTarget); }
	
	  const regionalRx = new RegExp(`^(Alolan|Galarian|Hisuian|Paldean)\\s+${escRx(base)}\\b`, 'i');
		for (const k of keys) if (regionalRx.test(k) && !seen.has(k)) { out.push(k); seen.add(k); }
		
		const formPrefix = new RegExp(`^${escRx(base)}\\s+`, 'i');
		for (const k of keys) if (formPrefix.test(k) && !seen.has(k)) { out.push(k); seen.add(k); }
		
		if (typeof formPrefixDisplay !== "undefined" && formPrefixDisplay && formPrefixDisplay.size) {
		  const alt = new RegExp(`^(?:${[...formPrefixDisplay].map(escRx).join('|')})\\s+${escRx(base)}$`, 'i');
		  for (const k of keys) if (alt.test(k) && !seen.has(k)) { out.push(k); seen.add(k); }
		}
		
		return out;
	}
	
  	const canonicalNames = new Set(entries);
    const input = document.getElementById('evo-search');
    const button = document.getElementById('evo-button');
    const clearButton = document.getElementById('clear-button');
    const suggestionsBox = document.getElementById('autocomplete-list');
    const label = document.getElementById("entry-label");
    const evoLine = document.getElementById("evo-line");
	const prevChainBtn = document.getElementById("prev-chain");
	const nextChainBtn = document.getElementById("next-chain");
	const total = entries.length;
	let compareNames = [];
	
	let compareRoot = document.getElementById("compare-root");
	if (!compareRoot) {
	  compareRoot = document.createElement("div");
	  compareRoot.id = "compare-root";
	  evoLine.parentNode.insertBefore(compareRoot, evoLine.nextSibling);
	}
	
	const orderIndex = new Map(entries.map((n, i) => [n.toLowerCase(), i]));
	function idx(name) {
	  const key = String(name || "").toLowerCase();
	  return orderIndex.has(key) ? orderIndex.get(key) : Number.POSITIVE_INFINITY;
	}
	
	const _resolveCache = new Map();
	function resolveName(name) {
	  if (!name) return name;
	  if (_resolveCache.has(name)) return _resolveCache.get(name);
	  const cleaned = String(name).normalize('NFKC').replace(/\s+/g, ' ').trim();
	  const hit = actualKeyFor(cleaned);
	  const out = hit || cleaned;
	  _resolveCache.set(name, out);
	  return out;
	}
	
	function E(name) { return evoData[resolveName(name)]; }
	
	const _orderedCache = new WeakMap();
	function entriesOrdered(em) {
	  if (!em || typeof em !== "object") return [];
	  if (_orderedCache.has(em)) return _orderedCache.get(em);
	  const list = Array.isArray(em) ? em : Object.entries(em);
	  const ordered = list.slice().sort((a, b) => {
	    const ia = idx(a[0]); const ib = idx(b[0]);
	    if (ia !== ib) return ia - ib;
	    return collator.compare(String(a[0]), String(b[0]));
	  });
	  _orderedCache.set(em, ordered);
	  return ordered;
	}
	function renderCompareUI() {
	  compareRoot.innerHTML = "";
	  if (compareNames.length === 0) return;
	
	  renderEvolutions(compareNames[0]);
	
	  for (let i = 1; i < compareNames.length; i++) {
	    const hr = document.createElement("div");
	    hr.className = "compare-hr-2 muted";
	    compareRoot.appendChild(hr);
	
	    const block = document.createElement("div");
	    block.className = "compare-block";
	    compareRoot.appendChild(block);
	
	    const close = document.createElement("div");
	    close.className = "compare-close";
	    close.textContent = "×";
	    close.title = "Remove";
	    close.onclick = () => {
		  compareNames.splice(i, 1);
		
		  if (compareNames.length === 0) {
		    writeCompareParam([]);
		    setQuery(null);
		    document.getElementById("evo-line").textContent =
		      "Start typing a Pokémon name above to view its evolution chain.";
		  } else if (compareNames.length === 1) {
		    writeCompareParam([]);
		    setQuery(compareNames[0]);
		  } else {
		    setQuery(null);
		    writeCompareParam(compareNames);
		  }
		  renderCompareUI();
		};
	    block.appendChild(close);
	
	    const target = document.createElement("div");
		target.className = "evo-line";
		block.appendChild(target);
		renderEvolutions(compareNames[i], target);
	  }
	
	  if (compareNames.length < 5) {
	    const add = document.createElement("div");
	    add.className = "compare-hr";
	    const labelEl = document.createElement("div");
	    labelEl.className = "add-btn";
	    labelEl.textContent = "Add +";
	    add.appendChild(labelEl);
	    compareRoot.appendChild(add);
	    add.onclick = () => openCompareSearch(add);
	  }
	}
	
	function renderEvolutionsInto(targetEl, name) {
	  renderEvolutions(name, targetEl);
	}
	
	function openCompareSearch(anchorEl) {
	  const wrap = document.createElement("div");
	  wrap.className = "evo-search-wrapper";
	  const compareLookupBox = anchorEl.closest('.evo-lookup-box');
	
	  const cont = document.createElement("div");
	  cont.className = "evo-search-container";
	
	  const input2 = document.createElement("div");
	  input2.className = "evo-search-input empty";
	  input2.contentEditable = "true";
	  input2.setAttribute("data-placeholder", "Type a Pokémon name...");
	  cont.appendChild(input2);
	
	  const clear2 = document.createElement("div");
	  clear2.className = "clear-button";
	  clear2.textContent = "×";
	  cont.appendChild(clear2);
	
	  const list2 = document.createElement("div");
	  list2.className = "autocomplete-list";
	  cont.appendChild(list2);
	
	  const btn2 = document.createElement("div");
	  btn2.className = "evo-search-button";
	  btn2.textContent = "Search";
	
	  wrap.appendChild(cont);
	  wrap.appendChild(btn2);
	
	  anchorEl.replaceWith(wrap);
	  input2.focus();
	
	  const exclude = new Set(compareNames.map(n => n.toLowerCase()));
	  let selIndex2 = -1;
	  let original2 = "";
	
	  function togglePlaceholder2() {
	    input2.classList.toggle("empty", input2.textContent.trim() === "");
	    clear2.classList.toggle("visible", input2.textContent.trim() !== "");
	  }
	
	  function showSuggestions2(val) {
		  const q = norm(val);
		  list2.innerHTML = "";
		  list2.classList.remove("has-items");
		  input2.classList.remove("suggestions-active");
		
		  if (!q.trim()) {
		    if (compareLookupBox) compareLookupBox.classList.remove('compare-suggesting');
		    return;
		  }
		
		  const matches = entries
		    .filter(e => !exclude.has(e.toLowerCase()))
		    .filter(e => norm(e).includes(q));
		
		  matches.forEach(entry => {
		    const item = document.createElement("div");
		    item.className = "autocomplete-item";
		    item.textContent = entry;
		    item.onclick = () => commit2(entry);
		    list2.appendChild(item);
		  });
		
		  const hasItems = matches.length > 0;
		  list2.classList.toggle("has-items", hasItems);
		  input2.classList.toggle("suggestions-active", hasItems);
		
		  if (compareLookupBox) {
		    compareLookupBox.classList.toggle('compare-suggesting', hasItems);
		  }
		}
	
	  function commit2(name) {
	    const hit = entries.find(e => e.toLowerCase() === String(name).toLowerCase());
	    if (!hit || exclude.has(hit.toLowerCase())) return;
	
	    compareNames.push(hit);
	    compareNames = normalizeList(compareNames);
	
	    if (compareNames.length > 1) {
	      setQuery(null);
	      writeCompareParam(compareNames);
	    } else {
	      writeCompareParam([]);
	      setQuery(compareNames[0]);
	    }
	
	    const hr = document.createElement("div");
	    hr.className = "compare-hr-2 muted";
	    wrap.replaceWith(hr);
		if (compareLookupBox) compareLookupBox.classList.remove('compare-suggesting');
		renderCompareUI();
	  }
	
	  input2.addEventListener("input", () => {
	    togglePlaceholder2();
	    showSuggestions2(input2.textContent);
	  });
	
	  input2.addEventListener("focus", () => {
	    showSuggestions2(input2.textContent);
	    if (list2.children.length > 0) input2.classList.add("suggestions-active");
	  });
	
	  input2.addEventListener("keydown", (e) => {
	    const items = list2.querySelectorAll(".autocomplete-item");
	    if (e.key === "ArrowDown" && items.length) {
	      e.preventDefault();
	      if (selIndex2 === -1) original2 = input2.textContent;
	      selIndex2 = (selIndex2 + 1) % items.length;
	      input2.textContent = items[selIndex2].textContent;
	      input2.classList.add("suggestions-active");
	      placeCursorAtEnd(input2);
	    } else if (e.key === "ArrowUp" && items.length) {
	      e.preventDefault();
	      if (selIndex2 === -1) original2 = input2.textContent;
	      selIndex2 = (selIndex2 - 1 + items.length) % items.length;
	      input2.textContent = items[selIndex2].textContent;
	      input2.classList.add("suggestions-active");
	      placeCursorAtEnd(input2);
	    } else if (e.key === "Enter") {
	      e.preventDefault();
	      const chosen = selIndex2 >= 0 && items[selIndex2]
	        ? items[selIndex2].textContent
	        : input2.textContent.trim();
	      commit2(chosen);
	    }
	
	    items.forEach((item, i) => item.classList.toggle("active", i === selIndex2));
	    if (selIndex2 >= 0 && items[selIndex2]) {
	      items[selIndex2].scrollIntoView({ block: "nearest" });
	    }
	  });
	
	  btn2.addEventListener("click", () => {
	    const items = list2.querySelectorAll(".autocomplete-item");
	    const chosen = selIndex2 >= 0 && items[selIndex2]
	      ? items[selIndex2].textContent
	      : input2.textContent.trim();
	    commit2(chosen);
	  });
	
	  clear2.addEventListener("click", () => {
	    input2.textContent = "";
	    togglePlaceholder2();
	    list2.innerHTML = "";
		list2.classList.remove("has-items");
		if (compareLookupBox) compareLookupBox.classList.remove('compare-suggesting');
		input2.focus();
	  });
	
	  function hide2() {
		  list2.innerHTML = "";
		  list2.classList.remove("has-items");
		  input2.classList.remove("suggestions-active");
		  selIndex2 = -1;
		  if (compareLookupBox) compareLookupBox.classList.remove('compare-suggesting');
		}
	
	  document.addEventListener("click", (e) => {
	    if (!input2.contains(e.target) && !list2.contains(e.target)) hide2();
	  });
	
	  input2.addEventListener("blur", () => {
	    setTimeout(() => {
	      if (!document.activeElement.closest(".autocomplete-item") &&
	          !document.activeElement.classList.contains("evo-search-button")) {
	        hide2();
	        if (selIndex2 >= 0 && original2) {
	          input2.textContent = original2;
	          togglePlaceholder2();
	        }
	      }
	    }, 150);
	  });
	
	  togglePlaceholder2();
	}
	function fromUrlName(q){ return q ? q.replace(/_/g, " ") : null; }
	function toUrlName(name){ return name ? name.replace(/ /g, "_") : ""; }
	
	function readCompareParam() {
	  const p = new URLSearchParams(location.search);
	  const raw = p.get("c");
	  if (!raw) return [];
	  return raw.split("+").map(s => fromUrlName(s)).filter(Boolean);
	}
	
	function writeCompareParam(names) {
	  replaceQuery(p => {
	    if (names.length > 1) {
	      p.delete("q");
	      p.set("c", names.map(toUrlName).join("+"));
	    } else {
	      p.delete("c");
	    }
	  });
	}
	
	function normalizeList(list) {
	  const out = [];
	  const seen = new Set();
	  for (const n of list) {
	    const hit = entries.find(e => e.toLowerCase() === String(n).toLowerCase());
	    if (hit && !seen.has(hit)) { out.push(hit); seen.add(hit); }
	    if (out.length >= 5) break;
	  }
	  return out;
	}
	function norm(s) {
	  return String(s).replace(/\s+/g, " ").toLowerCase();
	}
	
	function showNilLabel() {
	  label.textContent = `nil of ${total}`;
	}
	showNilLabel();
    if (!input || !button || !clearButton || !suggestionsBox || !label || !evoLine) {
      console.warn("Missing essential DOM elements.");
      return;
    }
    let currentIndex = 0;
    let selectedIndex = -1;
	
	function readQuery() {
	  const p = new URLSearchParams(location.search);
	  return fromUrlName(p.get("q"));
	}
	
	function replaceQuery(updater) {
	  const p = new URLSearchParams(location.search);
	  updater(p);
	  history.replaceState(null, "", `${location.pathname}${p.toString() ? `?${p}` : ""}${location.hash}`);
	}
	
	function setQuery(name) {
	  replaceQuery(p => {
	    if (name && name.trim()) p.set("q", toUrlName(name.trim()));
	    else p.delete("q");
	  });
	}
    
    const _baseCache = new Map();
	function getBase(name) {
	  if (_baseCache.has(name)) return _baseCache.get(name);
	  let n = resolveName(name);
	  const seen = new Set();
	  while (E(n)) {
	    const p = parentNameOf(E(n));
	    if (!p) break;
	    const pResolved = resolveName(p);
	    if (seen.has(pResolved)) break;
	    seen.add(n);
	    n = pResolved;
	  }
	  const out = E(n) ? n : name;
	  _baseCache.set(name, out);
	  return out;
	}
	
	const baseOf = new Map(entries.map(n => [n, getBase(n)]));
	function isMega(name) {
	  return /^Mega\s+/i.test(name);
	}
	function isRegional(name) {
	  return /^(Alolan|Galarian|Hisuian|Paldean)\s+/i.test(name);
	}
	function baseFromRegional(name) {
	  return String(name).replace(/^(Alolan|Galarian|Hisuian|Paldean)\s+/i, '').trim();
	}
	function isListedForm(base, pretty) {
	  const forms = (evoData.__forms && evoData.__forms[base]) || [];
	  return forms.some(f => `${base} ${f}`.toLowerCase() === String(pretty).toLowerCase());
	}
	
	function chainKey(name) {
	  if (isMega(name)) return name;
	  
	  return getBase(name) || name;
	}
	const baseRepIndex = new Map();
	const chainStarts = [];
	for (let i = 0; i < entries.length; i++) {
	  const n = entries[i];
	  const b = chainKey(n);
	  if (!baseRepIndex.has(b)) {
	    baseRepIndex.set(b, i);
	    chainStarts.push(b);
	  }
	}
	
	function jumpToChain(dir) {
	  const currentName = entries[currentIndex];
	  const currentKey  = chainKey(currentName);
	  const chainIdx    = chainStarts.indexOf(currentKey);
	  if (chainIdx === -1) return;
	
	  const nextIdx     = (chainIdx + (dir > 0 ? 1 : -1) + chainStarts.length) % chainStarts.length;
	  const targetKey   = chainStarts[nextIdx];
	
	  const targetIndex = baseRepIndex.has(targetKey) ? baseRepIndex.get(targetKey) : -1;
	  if (targetIndex >= 0) {
	    currentIndex = targetIndex;
	    updateEntry(true);
	  }
	}
    function togglePlaceholder() {
      input.classList.toggle("empty", input.textContent.trim() === "");
      clearButton.classList.toggle("visible", input.textContent.trim() !== "");
    }
    
    const fromC = normalizeList(readCompareParam());
	const initial = readQuery();
	
	function setIndexFromName(name) {
	  const i = entries.findIndex(e => e.toLowerCase() === String(name).toLowerCase());
	  if (i >= 0) {
	    currentIndex = i;
	    input.textContent = entries[i];
	    togglePlaceholder();
	    label.textContent = `Entry ${i + 1} of ${total}`;
	    return true;
	  }
	  return false;
	}
	
	const wikiLinkOverrides = {
    "Primal Dialga": "/wiki/Dialga#Primal_Forme",
    "Rotom Fan": "/wiki/Rotom#Rotom_Fan",
    "Rotom Frost": "/wiki/Rotom#Rotom_Frost",
    "Rotom Heat": "/wiki/Rotom#Rotom_Heat",
    "Rotom Mow": "/wiki/Rotom#Rotom_Mow",
    "Rotom Wash": "/wiki/Rotom#Rotom_Wash",
    "Hoopa Unbound": "/wiki/Hoopa#Hoopa_Unbound",
    "Cramorant Gulping": "/wiki/Cramorant#Gulping Form",
    "Cramorant Gorging": "/wiki/Cramorant#Gorging Form",
  };

  function getWikiLink(name) {
    const resolved = resolveName(name);

    const ov = (wikiLinkOverrides[resolved] !== undefined)
      ? wikiLinkOverrides[resolved]
      : wikiLinkOverrides[name];
    if (ov) return (typeof ov === "function") ? ov(name, resolved) : ov;

    if (/^Darmanitan\b/i.test(resolved) || /^Galarian\s+Darmanitan\b/i.test(resolved)) {
      const isGalarian = /^Galarian\s+Darmanitan/i.test(resolved);
      const hasZen     = /\bZen(\s+Mode)?\b/i.test(resolved);
      if (!isGalarian && !hasZen)  return "/wiki/Darmanitan#Darmanitan_Standard";
      if (!isGalarian && hasZen)   return "/wiki/Darmanitan#Darmanitan_Zen";
      if (isGalarian && !hasZen)   return "/wiki/Darmanitan#Galarian_Standard";
      if (isGalarian && hasZen)    return "/wiki/Darmanitan#Galarian_Zen";
    }

    const m = name.match(/^(Alolan|Galarian|Hisuian|Paldean|Mega)\s+(.+)$/i);
    if (m) {
      const form = m[1];
      const rest = m[2];
      if (/^Paldean$/i.test(form)) {
        const tauros = rest.match(/^Tauros\s+(Combat|Blaze|Aqua)\s+Breed$/i);
        if (tauros) {
          const breed = `${tauros[1][0].toUpperCase()}${tauros[1].slice(1).toLowerCase()} Breed`;
          return `/wiki/Tauros#${encodeURIComponent(breed.replace(/ /g, "_"))}`;
        }
      }
      if (/^Mega$/i.test(form)) {
        const cz = rest.match(/^Charizard\s+(X|Y)$/i);
        if (cz) return `/wiki/Charizard#${encodeURIComponent(`Mega Charizard ${cz[1].toUpperCase()}`.replace(/ /g, "_"))}`;
        const mt = rest.match(/^Mewtwo\s+(X|Y)$/i);
        if (mt) return `/wiki/Mewtwo#${encodeURIComponent(`Mega Mewtwo ${mt[1].toUpperCase()}`.replace(/ /g, "_"))}`;
      }
      const base = rest;
      const anchor = `${form} ${base}`;
      return `/wiki/${encodeURIComponent(base.replace(/ /g, "_"))}#${encodeURIComponent(anchor.replace(/ /g, "_"))}`;
    }

    if (canonicalNames.has(name)) return `/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;
    const parts = name.split(" ");
    if (parts.length > 1) {
      const base = parts[0];
      const anchor = parts.slice(1).join("_");
      return `/wiki/${encodeURIComponent(base)}#${encodeURIComponent(anchor)}`;
    }
    return `/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;
  }

  function createStageContainer(name, image, displayName) {
    const label = displayName || name;
    const container = document.createElement("div");
    container.className = "evo-stage";
    container.setAttribute("role", "link");
    container.tabIndex = 0;
    const imgLink = document.createElement("a");
    imgLink.href = getWikiLink(name);
    const img = document.createElement("img");
    img.src = `/wiki/Special:FilePath/${image}`;
    img.width = 120;
    img.alt = label;
    imgLink.appendChild(img);
    const nameDiv = document.createElement("div");
    nameDiv.className = "evo-name";
    const textLink = document.createElement("a");
    textLink.href = getWikiLink(name);
    textLink.textContent = label;
    nameDiv.appendChild(textLink);
    container.appendChild(imgLink);
    container.appendChild(nameDiv);
    const url = getWikiLink(name);
    const go = () => (location.href = url);
    container.addEventListener("click", (e) => { if (!e.target.closest("a")) go(); });
    container.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
    return container;
  }
	
	if (fromC.length > 1) {
	  compareNames = fromC;
	  setQuery(null);
	  writeCompareParam(compareNames);
	  setIndexFromName(compareNames[0]) || showNilLabel();
	  renderCompareUI();
	} else if (initial) {
	  const list = normalizeList([initial]);
	  if (list.length && setIndexFromName(list[0])) {
	    compareNames = list;
	    setQuery(compareNames[0]);
	    renderCompareUI();
	  } else {
	    compareNames = [];
	    setQuery(null);
	    showNilLabel();
	    evoLine.textContent = "Start typing a Pokémon name above to view its evolution chain.";
	  }
	} else {
	  evoLine.textContent = "Start typing a Pokémon name above to view its evolution chain.";
	  togglePlaceholder();
	}
	
    function updateEntry(replaceAll = false) {
	  const name = entries[currentIndex];
	
	  if (replaceAll) {
	    compareNames = normalizeList([name]);
	    setQuery(name);
	    writeCompareParam([]);
	  } else {
	    const others = compareNames.filter(n => n.toLowerCase() !== name.toLowerCase());
	    compareNames = normalizeList([name, ...others]);
	
	    if (compareNames.length <= 1) {
	      setQuery(name);
	      writeCompareParam([]);
	    } else {
	      setQuery(null);
	      writeCompareParam(compareNames);
	    }
	  }
	
	  input.textContent = name;
	  togglePlaceholder();
	  label.textContent = `Entry ${currentIndex + 1} of ${entries.length}`;
	  suggestionsBox.innerHTML = "";
	
	  renderCompareUI();
	}
	
	function triggerSearch(name) {
	  let index = entries.findIndex(entry => entry.toLowerCase() === String(name).toLowerCase());
	
	  if (index < 0) {
	    const resolved = resolveName(name);
	
	    index = entries.findIndex(entry => entry.toLowerCase() === String(resolved).toLowerCase());
	
	    if (index < 0 && evoData.__aliases) {
	      for (const base in evoData.__aliases) {
	        if (evoData.__aliases[base] === resolved) {
	          const i2 = entries.findIndex(e => e.toLowerCase() === base.toLowerCase());
	          if (i2 >= 0) { index = i2; break; }
	        }
	      }
	    }
	  }
	
	  if (index >= 0) {
	    currentIndex = index;
	    updateEntry(true);
	  }
	
	  suggestionsBox.innerHTML = "";
	  suggestionsBox.classList.remove("has-items");
	  selectedIndex = -1;
	  input.classList.remove("suggestions-active");
	  input.blur();
	}
    const suggestSize = 50;
	const itemPool = Array.from({ length: suggestSize }, () => {
	  const d = document.createElement('div');
	  d.className = 'autocomplete-item';
	  return d;
	});
	
	function showSuggestions(value) {
	  const val = norm(value);
	  suggestionsBox.classList.remove("has-items");
	  input.classList.remove("suggestions-active");
	  selectedIndex = -1;
	
	  if (val.trim() === "") {
	    suggestionsBox.replaceChildren();
	    return;
	  }
	
	  const matched = entries.filter(entry => norm(entry).includes(val));
	  const n = Math.min(matched.length, suggestSize);
	
	  for (let i = 0; i < n; i++) {
	    const entry = matched[i];
	    const el = itemPool[i];
	    el.textContent = entry;
	    el.onclick = () => {
	      input.textContent = entry;
	      triggerSearch(entry);
	    };
	  }
	
	  suggestionsBox.replaceChildren(...itemPool.slice(0, n));
	
	  if (n > 0) {
	    suggestionsBox.classList.add("has-items");
	    input.classList.add("suggestions-active");
	  }
	}
	
    function renderEvolutions(startName, target = document.getElementById("evo-line")) {
	  startName = resolveName(startName);
	  const holder = target;
	  const frag = document.createDocumentFragment();
	
	  const forms = listFormsFor(startName);
	  if (forms.length > 1) {
	    const tabs = document.createElement('div');
	    tabs.className = 'evo-forms-tabs';
	    forms.forEach(formName => {
	        const tab = document.createElement('button');
	        tab.type = 'button';
	        tab.className = 'form-tab' + (formName.toLowerCase() === startName.toLowerCase() ? ' active' : '');
	        tab.dataset.name = formName;
	
	        const label = document.createElement('span');
	        label.className = 'form-tab-label';
	        label.textContent = displayNameFor(formName);
	
	        tab.appendChild(label);
	        tabs.appendChild(tab);
	      });
	    frag.appendChild(tabs);
	
	    const br = document.createElement('div');
	    br.className = 'row-break';
	    frag.appendChild(br);
	  }
	
	  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
	  const visited = new Set();
	  const chain = [];
	  let hadPre = false;
	  let hadPost = false;
	
	  function formatEvoMethodNodes(raw) {
		  if (!raw) return [];
		  const nodes = [];
		  const parts = Array.isArray(raw) ? raw : String(raw).split(/(?:<br\s*\/?>|&lt;br\s*\/?&gt;|\n)/i);
		
		  parts.forEach((part, i) => {
		    const clean = String(part).trim();
		    if (!clean) return;
		    if (i > 0) nodes.push(document.createElement("br"));
		
		    const span = document.createElement("span");
		    span.className = "evo-method-part";
		
		    const NO_LINK_MARKER = "!";
		    const exIndex = clean.indexOf(NO_LINK_MARKER);
		
		    if (
		      i === 0 &&
		      !/^Level/i.test(clean) &&
		      !/^\d+$/.test(clean) &&
		      exIndex !== 0
		    ) {
		      let linkText = clean;
		      let afterText = "";
		
		      if (exIndex > 0) {
		        linkText = clean.slice(0, exIndex).trim();
		        afterText = clean.slice(exIndex + 1).trim();
		      }
		
		      span.append("(");
		      const a = document.createElement("a");
		      a.href = `/wiki/Items/${encodeURIComponent(linkText.replace(/ /g, "_"))}`;
		      a.textContent = linkText;
		      span.appendChild(a);
		
		      if (afterText) {
		        span.append(" " + afterText);
		      }
		      span.append(")");
		    } else {
		      const displayText = clean.startsWith(NO_LINK_MARKER) ? clean.slice(1) : clean;
		      span.textContent = `(${displayText})`;
		    }
		    nodes.push(span);
		  });
		  return nodes;
		}
	
	  let currentName = startName;
	  while (evoData[currentName]) {
	    const p = parentNameOf(evoData[currentName]);
	    if (!p) break;
	    const parent = resolveName(p);
	    if (visited.has(parent)) break;
	    visited.add(parent);
	    currentName = parent;
	  }
	  hadPre = currentName !== startName;
	  visited.clear();
	  
	  function fileSafeName(name) {
		return String(name).replace(/:/g, "");
	  }
	
	  while (currentName && evoData[currentName] && !visited.has(currentName)) {
	    visited.add(currentName);
	
	    const current = evoData[currentName];
	    const nextStages = current.EvoMethod ? entriesOrdered(current.EvoMethod) : [];
	
	    if (nextStages.length === 0) {
		    chain.push({ name: currentName, image: `${fileSafeName(currentName)}.png`, method: null });
		    break;
		}
	
	    if (nextStages.length > 1) {
	      hadPost = true;
	      chain.push({ split: true, from: currentName, branches: nextStages });
	      break;
	    } else {
	      const pendingBase = { name: currentName, image: `${fileSafeName(currentName)}.png`, method: null };
		  chain.push(pendingBase);
	
	      const [nextTargetRaw, method] = nextStages[0];
	      const nextTarget = nextTargetRaw;
	
	      if (/^Mega\s/i.test(nextTarget)) {
	        hadPost = true;
	        chain.push({ split: true, from: currentName, branches: [[nextTarget, method]] });
	        break;
	      }
	
	      const nextData = evoData[nextTarget];
	      const nextHasSplit =
	        nextData && nextData.EvoMethod && Object.keys(nextData.EvoMethod).length > 1;
	
	      hadPost = true;
	
	      if (nextHasSplit) {
	        const branches = entriesOrdered(nextData.EvoMethod);
	        const isMegaSplit = branches.every(([n]) => /^Mega\s/i.test(n));
	
	        if (isMegaSplit) {
	          chain.push({ name: nextTarget, image: `${fileSafeName(nextTarget)}.png`, method });
	        }
	
	        chain.push({
	          split: true,
	          from: nextTarget,
	          incomingFrom: currentName,
	          incomingMethod: isMegaSplit ? null : method,
	          branches
	        });
	        break;
	      } else {
	        chain.push({ name: nextTarget, image: `${fileSafeName(nextTarget)}.png`, method });
	        currentName = nextTarget;
	      }
	    }
	  }
	
	  const megaOnly =
	    chain.length === 1 &&
	    chain[0].split === true &&
	    chain[0].branches &&
	    chain[0].branches.every(([name]) => /^Mega\s/i.test(name));
	
	  const seen = new Set();
	
	  chain.forEach((stage, index) => {
	    if (stage.split) {
		  const isMegaSplit = stage.branches.every(([name]) => /^Mega\s/i.test(name));
		
		  if (isMegaSplit && index === 0) {
		    const baseOnce = createStageContainer(stage.from, `${fileSafeName(stage.from)}.png`, displayNameFor(stage.from));
		    frag.appendChild(baseOnce);
		  }
		
		  if (isMegaSplit) {
		    if (!megaOnly) {
		      const brTop = document.createElement("div");
		      brTop.className = "row-break";
		      frag.appendChild(brTop);
		    }
		    const divider = document.createElement("div");
		    divider.className = "evo-divider";
		    divider.innerHTML = "<span>Mega Evolution</span>";
		    frag.appendChild(divider);
		  }
	
	      if (stage.incomingMethod && !isMegaSplit) {
	        const arrowFromPrev = document.createElement("div");
	        arrowFromPrev.className = "evo-arrow";
	        const methodDiv = document.createElement("div");
	        methodDiv.className = "evo-method";
	        const label = /^\d+$/.test(stage.incomingMethod)
	          ? `Level ${stage.incomingMethod}`
	          : stage.incomingMethod;
	        formatEvoMethodNodes(label).forEach(node => methodDiv.appendChild(node));
	        arrowFromPrev.innerHTML = "→";
	        arrowFromPrev.appendChild(methodDiv);
	        frag.appendChild(arrowFromPrev);
	      }
	
	      const splitWrapper = document.createElement("div");
			splitWrapper.className = "evo-split-container";
			
			const baseColumn = document.createElement("div");
			baseColumn.className = "evo-column base-column";
			baseColumn.appendChild(createStageContainer(stage.from, `${fileSafeName(stage.from)}.png`, displayNameFor(stage.from)));
			splitWrapper.appendChild(baseColumn);
			
			const arrowColumn = document.createElement("div");
			arrowColumn.className = "evo-column arrow-column";
			
			const evoColumn = document.createElement("div");
			evoColumn.className = "evo-column branch-column";
			
			const arrowColumn2 = document.createElement("div");
			arrowColumn2.className = "evo-column arrow-column";
			
			const evoColumn2 = document.createElement("div");
			evoColumn2.className = "evo-column branch-column";
			
			function coreSpecies(name) {
			  let n = String(name);
			  n = n.replace(/^(Alolan|Galarian|Hisuian|Paldean|Mega)\s+/i, '');
			  const parts = n.split(' ');
			  const candidateBase = parts[0];
			  if (evoData[candidateBase]) return candidateBase;
			
			  for (let i = 1; i <= parts.length; i++) {
			    const base = parts.slice(0, parts.length - i).join(' ');
			    if (base && evoData[base]) return base;
			  }
			  return n;
			}
			
			function collapseLinearTargets(pairs) {
			  if (!Array.isArray(pairs) || pairs.length === 0) return null;
			  const nonMega = pairs.filter(([t]) => !/^Mega\s/i.test(t));
			  if (nonMega.length === 0) return null;
			
			  const bases = new Map();
			  for (const [t] of nonMega) {
			    const base = coreSpecies(resolveName(t));
			    bases.set(base.toLowerCase(), resolveName(t));
			  }
			
			  if (bases.size === 1) {
			    const [, rep] = [...bases.entries()][0];
			    const [, method] = nonMega[0];
			    return { targetKey: rep, method };
			  }
			  return null;
			}
			
			stage.branches.forEach(([rawNext, method]) => {
			  const targetKey = resolveName(rawNext);
			
			  const a = document.createElement("div");
			  a.className = "evo-arrow";
			  const m = document.createElement("div");
			  m.className = "evo-method";
			  const lbl = /^\d+$/.test(method) ? `Level ${method}` : method;
			  formatEvoMethodNodes(lbl).forEach(n => m.appendChild(n));
			  a.innerHTML = "→";
			  a.appendChild(m);
			  arrowColumn.appendChild(a);
			
			  evoColumn.appendChild(createStageContainer(targetKey, `${fileSafeName(targetKey)}.png`, displayNameFor(targetKey)));
			
			  const pairs = (E(targetKey) && E(targetKey).EvoMethod)
				  ? entriesOrdered(E(targetKey).EvoMethod)
				  : [];
				
				const collapsed = collapseLinearTargets(pairs);
				
				if (collapsed) {
				  const { targetKey: nextKey, method: method2 } = collapsed;
				
				  const a2 = document.createElement("div");
				  a2.className = "evo-arrow";
				  const m2 = document.createElement("div");
				  m2.className = "evo-method";
				  const lbl2 = /^\d+$/.test(method2) ? `Level ${method2}` : method2;
				  formatEvoMethodNodes(lbl2).forEach(n => m2.appendChild(n));
				  a2.innerHTML = "→";
				  a2.appendChild(m2);
				  arrowColumn2.appendChild(a2);
				
				  evoColumn2.appendChild(createStageContainer(nextKey, `${fileSafeName(nextKey)}.png`, displayNameFor(nextKey)));
				} else {
				  const sA = document.createElement("div"); sA.className = "evo-spacer"; arrowColumn2.appendChild(sA);
				  const sB = document.createElement("div"); sB.className = "stage-spacer"; evoColumn2.appendChild(sB);
				}
			});
			
			splitWrapper.appendChild(arrowColumn);
			splitWrapper.appendChild(evoColumn);
			splitWrapper.appendChild(arrowColumn2);
			splitWrapper.appendChild(evoColumn2);
			frag.appendChild(splitWrapper);
	
	      if (isMegaSplit) {
	        if (!megaOnly) {
	          const brBottom = document.createElement("div");
	          brBottom.className = "row-break";
	          frag.appendChild(brBottom);
	        }
	        const note = document.createElement("div");
	        note.className = "evo-note";
	        note.textContent = "Mega Evolutions are exclusive to PvE and PvP battles, lasting only for the battle duration.";
	        frag.appendChild(note);
	      }
	    } else {
	      if (!seen.has(stage.name)) {
	        if (index > 0 && stage.method) {
	          const arrow = document.createElement("div");
	          arrow.className = "evo-arrow";
	          const label = /^\d+$/.test(stage.method) ? `Level ${stage.method}` : stage.method;
	          const methodDiv = document.createElement("div");
	          methodDiv.className = "evo-method";
	          formatEvoMethodNodes(label).forEach(node => methodDiv.appendChild(node));
	          arrow.innerHTML = "→";
	          arrow.appendChild(methodDiv);
	          frag.appendChild(arrow);
	        }
	
	        const container = createStageContainer(stage.name, stage.image || `${fileSafeName(stage.name)}.png`, displayNameFor(stage.name));
	        frag.appendChild(container);
	        seen.add(stage.name);
	      }
	    }
	  });
	
	  if (frag.childNodes.length === 0) {
		  holder.replaceChildren(document.createTextNode(`${startName} does not evolve.`));
		} else {
		  if (!hadPre && !hadPost) {
	      const br = document.createElement("div");
	      br.className = "row-break";
	      frag.appendChild(br);
	
	      const note = document.createElement("div");
	      note.className = "evo-note";
	      note.textContent = `${startName} has no pre-evolutions and does not evolve.`;
	      frag.appendChild(note);
	    }
	  holder.replaceChildren(frag);
	  }
	}
    input.addEventListener("input", () => {
      togglePlaceholder();
      showSuggestions(input.textContent);
    });
    let originalInput = "";
    input.addEventListener("keydown", (e) => {
      const items = suggestionsBox.querySelectorAll(".autocomplete-item");
      if (e.key === "ArrowDown" && items.length) {
        e.preventDefault();
        if (selectedIndex === -1) originalInput = input.textContent;
        selectedIndex = (selectedIndex + 1) % items.length;
        input.textContent = items[selectedIndex].textContent;
        input.classList.add("suggestions-active");
        placeCursorAtEnd(input);
      } else if (e.key === "ArrowUp" && items.length) {
        e.preventDefault();
        if (selectedIndex === -1) originalInput = input.textContent;
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        input.textContent = items[selectedIndex].textContent;
        input.classList.add("suggestions-active");
        placeCursorAtEnd(input);
      } else if (e.key === "Enter") {
        e.preventDefault();
        let chosen = selectedIndex >= 0 && items[selectedIndex]
          ? items[selectedIndex].textContent
          : input.textContent.trim();
        triggerSearch(chosen);
      }
      items.forEach((item, i) => {
        item.classList.toggle("active", i === selectedIndex);
      });
      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      }
    });
    button.addEventListener("click", () => {
      const items = suggestionsBox.querySelectorAll(".autocomplete-item");
      const chosen = selectedIndex >= 0 && items[selectedIndex]
        ? items[selectedIndex].textContent
        : input.textContent.trim();
      triggerSearch(chosen);
    });
    document.getElementById("prev-entry").addEventListener("click", () => {
	  currentIndex = (currentIndex - 1 + entries.length) % entries.length;
	  updateEntry(true);
	});
	
	document.getElementById("next-entry").addEventListener("click", () => {
	  currentIndex = (currentIndex + 1) % entries.length;
	  updateEntry(true);
	});
    
	if (prevChainBtn) {
	  prevChainBtn.addEventListener("click", () => jumpToChain(-1));
	}
	if (nextChainBtn) {
	  nextChainBtn.addEventListener("click", () => jumpToChain(1));
	}
    function hideSuggestions() {
	  suggestionsBox.innerHTML = "";
	  suggestionsBox.classList.remove("has-items");
	  input.classList.remove("suggestions-active");
	  selectedIndex = -1;
	}
	
	document.addEventListener("click", (e) => {
	  if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
	    hideSuggestions();
	  }
	});
	
	input.addEventListener("blur", () => {
	  setTimeout(() => {
	    if (!document.activeElement.closest(".autocomplete-item") &&
	        !document.activeElement.classList.contains("evo-search-button")) {
	      hideSuggestions();
	      if (selectedIndex >= 0 && originalInput) {
	        input.textContent = originalInput;
	        togglePlaceholder();
	      }
	    }
	  }, 150);
	});
    input.addEventListener("focus", () => {
      showSuggestions(input.textContent);
      if (suggestionsBox.children.length > 0) {
        input.classList.add("suggestions-active");
      }
    });
    clearButton.addEventListener("click", () => {
	  input.textContent = "";
	  togglePlaceholder();
	  suggestionsBox.innerHTML = "";
	  suggestionsBox.classList.remove("has-items");
	  showNilLabel();
	  compareNames = [];
	  writeCompareParam([]);
	  setQuery(null);
	  evoLine.textContent = "Start typing a Pokémon name above to view its evolution chain.";
	  compareRoot.innerHTML = "";
	  input.focus();
	});
    
    document.addEventListener('click', (e) => {
	  const tab = e.target.closest('.form-tab');
	  if (!tab) return;
	
	  const name = tab.dataset.name;
	  const holder = tab.closest('.evo-line');
	  if (!name || !holder) return;
	
	  renderEvolutions(name, holder);
	
	  const isPrimary = holder.id === 'evo-line';
	  if (isPrimary) {
	    input.textContent = name;
	    togglePlaceholder();
	
	    const i = entries.findIndex(e => e.toLowerCase() === name.toLowerCase());
	    if (i >= 0) {
	      currentIndex = i;
	      label.textContent = `Entry ${i + 1} of ${total}`;
	    }
	
	    if (compareNames.length <= 1) {
	      compareNames = normalizeList([name]);
	      setQuery(name);
	      writeCompareParam([]);
	    } else {
	      compareNames = normalizeList([name, ...compareNames.slice(1)]);
	      setQuery(null);
	      writeCompareParam(compareNames);
	    }
	  }
	});
  }
  function placeCursorAtEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

initEvolutionSearch();