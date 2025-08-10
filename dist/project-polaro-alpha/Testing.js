/*
 *  → Adds an evolution search interface to pages with #evolution-data-placeholder.
 *  → Parses embedded JSON evolution data to build a searchable Pokémon species list.
 *  → Provides autocomplete suggestions and keyboard navigation for species lookup.
 *  → Displays evolution chains with branching paths, methods, and special forms.
 *  → Allows comparing up to 5 Pokémon evolution chains side-by-side.
 *  → Syncs search and compare selections with URL parameters (?q= / ?c=).
 *  → Supports quick navigation between entries and entire evolution chains.
 *  → Handles special cases like Mega Evolutions, regional forms, and form anchors.
 *  → Skips initialization if required DOM elements or data are missing.
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

    let raw = placeholder.innerText.trim();
    let data;

    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse evolution data:", err);
      console.log("Raw content:", raw);
      return;
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
	
	function listFormsFor(name, evoData){
	  const base = baseNameOf(name);
	
	  if (/^Tauros\b/i.test(base) || /^Paldean\s+Tauros\b/i.test(name)) {
	    const taurosForms = [
	      'Tauros',
	      'Paldean Tauros Combat Breed',
	      'Paldean Tauros Blaze Breed',
	      'Paldean Tauros Aqua Breed'
	    ];
	    const present = taurosForms.filter(n => evoData[n]);
	
	    return present;
	  }
	
	  const keys = Object.keys(evoData);
	  const out = [];
	  if (evoData[base]) out.push(base);
	
	  const rx = new RegExp(`^(Alolan|Galarian|Hisuian|Paldean)\\s+${escRx(base)}\\b`, 'i');
	  keys.forEach(k => { if (rx.test(k)) out.push(k); });
	
	  const seen = new Set();
	  const uniq = out.filter(n => !seen.has(n) && seen.add(n));
	
	  const orderMap = new Map([['Alolan',0],['Galarian',1],['Hisuian',2],['Paldean',3]]);
	  return uniq.sort((a,b)=>{
	    if (a === base) return -1;
	    if (b === base) return 1;
	    const fa = (a.match(/^(Alolan|Galarian|Hisuian|Paldean)/i) || ['', ''])[1];
	    const fb = (b.match(/^(Alolan|Galarian|Hisuian|Paldean)/i) || ['', ''])[1];
	    const oa = orderMap.has(fa) ? orderMap.get(fa) : 99;
	    const ob = orderMap.has(fb) ? orderMap.get(fb) : 99;
	    if (oa !== ob) return oa - ob;
	    return a.localeCompare(b, undefined, {sensitivity:'base'});
	  });
	}

  function setupAutocomplete(entries, evoData) {
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
	
	function entriesOrdered(em) {
	  if (!em || typeof em !== "object") return [];
	  const list = Array.isArray(em) ? em : Object.entries(em);
	  return list.sort(function (a, b) {
	    const ia = idx(a[0]);
	    const ib = idx(b[0]);
	    if (ia !== ib) return ia - ib;
	    return String(a[0]).localeCompare(String(b[0]), undefined, { sensitivity: "base" });
	  });
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
		renderEvolutionsInto(target, compareNames[i]);
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
	  const main = document.getElementById("evo-line");
	  const oldId = main.id;
	  main.id = "evo-line__original";
	
	  const tmp = document.createElement("div");
	  tmp.id = "evo-line";
	  tmp.className = "evo-line";
	  main.parentNode.insertBefore(tmp, main.nextSibling);
	
	  renderEvolutions(name);
	  targetEl.innerHTML = tmp.innerHTML;
	
	  tmp.remove();
	  main.id = oldId;
	}
	
	function syncSplitHeights(arrowCol, evoCol) {
	  const arrows = Array.from(arrowCol.children);
	  const stacks = Array.from(evoCol.children);
	  arrows.forEach((arrowCell, i) => {
	    const stack = stacks[i];
	    if (!stack) return;
	    arrowCell.style.display = "flex";
	    arrowCell.style.alignItems = "flex-start";
	    arrowCell.style.minHeight = stack.offsetHeight + "px";
	  });
	}
	
	function openCompareSearch(anchorEl) {
	  const wrap = document.createElement("div");
	  wrap.className = "evo-search-wrapper";
	
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
	    if (!q.trim()) return;
	
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
	
	    if (matches.length) {
	      list2.classList.add("has-items");
	      input2.classList.add("suggestions-active");
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
	    input2.focus();
	  });
	
	  function hide2() {
	    list2.innerHTML = "";
	    list2.classList.remove("has-items");
	    input2.classList.remove("suggestions-active");
	    selIndex2 = -1;
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
	  const p = new URLSearchParams(location.search);
	  if (names.length > 1) {
	    p.delete("q");
	    p.set("c", names.map(toUrlName).join("+"));
	  } else {
	    p.delete("c");
	  }
	  const newUrl = `${location.pathname}${p.toString() ? `?${p}` : ""}${location.hash}`;
	  history.replaceState(null, "", newUrl);
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
	
	function setQuery(name) {
	  const p = new URLSearchParams(location.search);
	  if (name && name.trim()) p.set("q", toUrlName(name.trim()));
	  else p.delete("q");
	  const newUrl = `${location.pathname}${p.toString() ? `?${p}` : ""}${location.hash}`;
	  history.replaceState(null, "", newUrl);
	}
    
    function getBase(name) {
	  let n = name;
	  const seen = new Set();
	  while (
	    evoData[n] &&
	    typeof evoData[n].EvolvesFrom === "string" &&
	    !seen.has(evoData[n].EvolvesFrom)
	  ) {
	    seen.add(n);
	    n = evoData[n].EvolvesFrom;
	  }
	  return evoData[n] ? n : name;
	}
	
	const baseOf = new Map(entries.map(n => [n, getBase(n)]));
	
	const chainStarts = [];
	const seenBases = new Set();
	for (const n of entries) {
	  const b = baseOf.get(n);
	  if (!seenBases.has(b)) {
	    seenBases.add(b);
	    chainStarts.push(b);
	  }
	}
	
	function jumpToChain(dir) {
	  const currentName = entries[currentIndex];
	  const currentBase = baseOf.get(currentName);
	  const chainIdx = chainStarts.indexOf(currentBase);
	  if (chainIdx === -1) return;
	
	  const nextIdx = (chainIdx + (dir > 0 ? 1 : -1) + chainStarts.length) % chainStarts.length;
	  const targetBase = chainStarts[nextIdx];
	
	  const targetIndex = entries.indexOf(targetBase);
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
	  const index = entries.findIndex(entry => entry.toLowerCase() === name.toLowerCase());
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

    function showSuggestions(value) {
      const val = norm(value);
      suggestionsBox.innerHTML = "";
      suggestionsBox.classList.remove("has-items");
      input.classList.remove("suggestions-active");
      selectedIndex = -1;

	if (val.trim() === "") return;

      const matched = entries.filter(entry => norm(entry).includes(val));
      matched.forEach(entry => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.textContent = entry;
        item.onclick = () => {
          input.textContent = entry;
          triggerSearch(entry);
        };
        suggestionsBox.appendChild(item);
      });

      if (matched.length > 0) {
        suggestionsBox.classList.add("has-items");
        input.classList.add("suggestions-active");
      }
    }

    function renderEvolutions(startName) {
	  const evoLine = document.getElementById("evo-line");
	  evoLine.innerHTML = "";
	
		const forms = listFormsFor(startName, evoData);
		if (forms.length > 1) {
		  const tabs = document.createElement('div');
		  tabs.className = 'evo-forms-tabs';
		  forms.forEach(formName => {
		    const tab = document.createElement('button');
		    tab.type = 'button';
		    tab.className = 'form-tab' + (formName.toLowerCase() === startName.toLowerCase() ? ' active' : '');
		    tab.dataset.name = formName;
		    tab.textContent = formName;
		    tabs.appendChild(tab);
		  });
		  evoLine.appendChild(tabs);
		
		  const br = document.createElement('div');
		  br.className = 'row-break';
		  evoLine.appendChild(br);
		}
	
	  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
	  const visited = new Set();
	  const chain = [];
	  let hadPre = false;
	  let hadPost = false;

	  function appendLinearContinuation(stackEl, startName) {
	    let name = startName;
	    const seen = new Set();
	
	    while (name && evoData[name] && !seen.has(name)) {
	      seen.add(name);
	      const cur = evoData[name];
	      const nextStages = cur.EvoMethod ? entriesOrdered(cur.EvoMethod) : [];
	      if (nextStages.length !== 1) break;
	
	      const [nextTargetRaw, method] = nextStages[0];
	      const nextTarget = capitalize(nextTargetRaw);
	
	      const arrow = document.createElement("div");
	      arrow.className = "evo-arrow";
	      const methodDiv = document.createElement("div");
	      methodDiv.className = "evo-method";
	      const label = /^\d+$/.test(method) ? `Level ${method}` : method;
	      formatEvoMethodNodes(label).forEach(n => methodDiv.appendChild(n));
	      arrow.innerHTML = "→";
	      arrow.appendChild(methodDiv);
	      stackEl.appendChild(arrow);
	
	      stackEl.appendChild(createStageContainer(nextTarget, `${nextTarget}.png`));
	      name = nextTarget;
	    }
	  }
	
	  function formatEvoMethodNodes(raw) {
          if (!raw) return [];
          const nodes = [];
        
          const parts = Array.isArray(raw)
            ? raw
            : String(raw).split(/(?:<br\s*\/?>|&lt;br\s*\/?&gt;|\n)/i);
        
          parts.forEach((part, i) => {
            const clean = String(part).trim();
            if (!clean) return;
        
            if (i > 0) nodes.push(document.createElement("br"));
        
            const span = document.createElement("span");
            span.className = "evo-method-part";
        
            const NO_LINK_MARKER = "!";

			if (
			  i === 0 &&
			  !/^Level/i.test(clean) &&
			  !/^\d+$/.test(clean) &&
			  !clean.startsWith(NO_LINK_MARKER)
			) {
			  span.append("(");
			  const a = document.createElement("a");
			  a.href = `/wiki/Items/${encodeURIComponent(clean.replace(/ /g, "_"))}`;
			  a.textContent = clean;
			  span.appendChild(a);
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
	
	  while (
	    evoData[currentName] &&
	    evoData[currentName].EvolvesFrom &&
	    typeof evoData[currentName].EvolvesFrom === "string"
	  ) {
	    const parent = evoData[currentName].EvolvesFrom;
	    if (visited.has(parent)) break;
	    visited.add(parent);
	    currentName = parent;
	  }
	  
	  hadPre = currentName !== startName;
	
	  visited.clear();
	
	  while (currentName && evoData[currentName] && !visited.has(currentName)) {
		  visited.add(currentName);
		
		  const current = evoData[currentName];
		  const nextStages = current.EvoMethod ? entriesOrdered(current.EvoMethod) : [];
		
		  if (nextStages.length === 0) {
		    chain.push({ name: currentName, image: `${currentName}.png`, method: null });
		    break;
		  }
		
		  if (nextStages.length > 1) {
		    hadPost = true;
		    chain.push({
		      split: true,
		      from: currentName,
		      branches: nextStages
		    });
		    break;
		  } else {
		    const pendingBase = {
		      name: currentName,
		      image: `${currentName}.png`,
		      method: null
		    };
		    chain.push(pendingBase);
		
		    const [nextTargetRaw, method] = nextStages[0];
		    const nextTarget = nextTargetRaw;
			
			if (/^Mega\s/i.test(nextTarget)) {
			  hadPost = true;
			  chain.push({
			    split: true,
			    from: currentName,
			    branches: [[nextTarget, method]]
			  });
			  break;
			}
			
		    const nextData = evoData[nextTarget];
		    const nextHasSplit =
		      nextData &&
		      nextData.EvoMethod &&
		      Object.keys(nextData.EvoMethod).length > 1;
		
		    hadPost = true;
		
		    if (nextHasSplit) {
		      const branches = entriesOrdered(nextData.EvoMethod);
		      const isMegaSplit = branches.every(([n]) => /^Mega\s/i.test(n));
		
		      if (isMegaSplit) {
		        chain.push({
		          name: nextTarget,
		          image: `${nextTarget}.png`,
		          method
		        });
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
		      chain.push({
		        name: nextTarget,
		        image: `${nextTarget}.png`,
		        method
		      });
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
	const fragments = [];
	
	  chain.forEach((stage, index) => {
	    if (stage.split) {
	      const isMegaSplit = stage.branches.every(([name]) => /^Mega\s/i.test(name));
			if (isMegaSplit) {
			  if (!megaOnly) {
			    const brTop = document.createElement("div");
			    brTop.className = "row-break";
			    fragments.push(brTop);
			  }
			  const divider = document.createElement("div");
			  divider.className = "evo-divider";
			  divider.innerHTML = "<span>Mega Evolution</span>";
			  fragments.push(divider);
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
		      fragments.push(arrowFromPrev);
		    }

	      const splitWrapper = document.createElement("div");
          splitWrapper.className = "evo-split-container";
        
          const baseColumn = document.createElement("div");
          baseColumn.className = "evo-column base-column";
        
          const baseContainer = createStageContainer(stage.from, `${stage.from}.png`);
          baseColumn.appendChild(baseContainer);
          splitWrapper.appendChild(baseColumn);
        
          const arrowColumn = document.createElement("div");
          arrowColumn.className = "evo-column arrow-column";
        
          const evoColumn = document.createElement("div");
          evoColumn.className = "evo-column branch-column";
	
	      stage.branches.forEach(([targetRaw, method]) => {
		  const target = capitalize(targetRaw);
		
		  const arrow = document.createElement("div");
		  arrow.className = "evo-arrow";
		  const methodDiv = document.createElement("div");
		  methodDiv.className = "evo-method";
		  const label = /^\d+$/.test(method) ? `Level ${method}` : method;
		  formatEvoMethodNodes(label).forEach(node => methodDiv.appendChild(node));
		  arrow.innerHTML = "→";
		  arrow.appendChild(methodDiv);
		  arrowColumn.appendChild(arrow);
		
		  const stack = document.createElement("div");
		  stack.style.display = "flex";
		  stack.style.flexDirection = "column";
		  stack.style.rowGap = "8px";
		
		  stack.appendChild(createStageContainer(target, `${target}.png`));
		  appendLinearContinuation(stack, target);
		
		  evoColumn.appendChild(stack);
		});
		
		splitWrapper.appendChild(arrowColumn);
		splitWrapper.appendChild(evoColumn);
		fragments.push(splitWrapper);
	      
	      if (isMegaSplit) {
			  if (!megaOnly) {
			    const brBottom = document.createElement("div");
			    brBottom.className = "row-break";
			    fragments.push(brBottom);
			  }
			  const note = document.createElement("div");
			  note.className = "evo-note";
			  note.textContent = "Mega Evolutions are exclusive to PvE and PvP battles, lasting only for the battle duration.";
			  fragments.push(note);
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
		      fragments.push(arrow);
		    }
		
		    const container = createStageContainer(stage.name, stage.image);
		    fragments.push(container);
		    seen.add(stage.name);
		  }
		}
	  });
	
	  if (fragments.length === 0) {
	    evoLine.textContent = `${startName} does not evolve.`;
	  } else {
	    fragments.forEach(el => evoLine.appendChild(el));
		evoLine.querySelectorAll(".evo-split-container").forEach(sc => {
		  const arrowCol  = sc.querySelector(".arrow-column");
		  const branchCol = sc.querySelector(".branch-column");
		  if (arrowCol && branchCol) syncSplitHeights(arrowCol, branchCol);
		});
	    if (!hadPre && !hadPost) {
          const br = document.createElement("div");
          br.className = "row-break";
          evoLine.appendChild(br);
        
          const note = document.createElement("div");
          note.className = "evo-note";
          note.textContent = `${startName} has no pre-evolutions and does not evolve.`;
          evoLine.appendChild(note);
        }
	  }
	
	  function getWikiLink(name) {
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
		      if (cz) {
		        const anchor = `Mega Charizard ${cz[1].toUpperCase()}`;
		        return `/wiki/Charizard#${encodeURIComponent(anchor.replace(/ /g, "_"))}`;
		      }
		      const mt = rest.match(/^Mewtwo\s+(X|Y)$/i);
		      if (mt) {
		        const anchor = `Mega Mewtwo ${mt[1].toUpperCase()}`;
		        return `/wiki/Mewtwo#${encodeURIComponent(anchor.replace(/ /g, "_"))}`;
		      }
		    }
		
		    const base = rest;
		    const anchor = `${form} ${base}`;
		    return `/wiki/${encodeURIComponent(base.replace(/ /g, "_"))}#${encodeURIComponent(anchor.replace(/ /g, "_"))}`;
		  }
		
		  if (canonicalNames.has(name)) {
		    return `/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;
		  }
		  const parts = name.split(" ");
		  if (parts.length > 1) {
		    const base = parts[0];
		    const anchor = parts.slice(1).join("_");
		    return `/wiki/${encodeURIComponent(base)}#${encodeURIComponent(anchor)}`;
		  }
		  return `/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;
		}
	
	  function createStageContainer(name, image) {
		  const container = document.createElement("div");
		  container.className = "evo-stage";
		  container.setAttribute("role", "link");
		  container.tabIndex = 0;
		
		  const imgLink = document.createElement("a");
		  imgLink.href = getWikiLink(name);
		
		  const img = document.createElement("img");
		  img.src = `/wiki/Special:FilePath/${image}`;
		  img.width = 120;
		  img.alt = name;
		  imgLink.appendChild(img);
		
		  const nameDiv = document.createElement("div");
		  nameDiv.className = "evo-name";
		
		  const textLink = document.createElement("a");
		  textLink.href = getWikiLink(name);
		  textLink.textContent = name;
		
		  nameDiv.appendChild(textLink);
		  container.appendChild(imgLink);
		  container.appendChild(nameDiv);
		
		  const url = getWikiLink(name);
		  const go = () => (location.href = url);
		
		  container.addEventListener("click", (e) => {
		    if (!e.target.closest("a")) go();
		  });
		  container.addEventListener("keydown", (e) => {
		    if (e.key === "Enter" || e.key === " ") {
		      e.preventDefault();
		      go();
		    }
		  });
		
		  return container;
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
	
	  renderEvolutionsInto(holder, name);
	
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