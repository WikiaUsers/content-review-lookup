/* BuildCalculator.js  —  build / loadout calculator client
 * ===========================================================================
 * Version:   1.16.0  (2026-07-19)
 * Host page: MediaWiki:BuildCalculator.js  ->  rename for final deploy
 * Pairs with: Module:BuildCalculator, Module:SlotData + the *Data modules,
 *             and the build-calculator block in MediaWiki:Common.css.
 *
 * Bump VERSION below whenever this file changes; it is also stamped onto each
 * rendered widget as data-bc-version, so you can read the live build straight
 * from the DOM (or the console:  document.querySelector('.build-app')
 * .getAttribute('data-bc-version') ) to confirm which revision is served.
 *
 * Changelog
 *   1.16.0 Tier filter. A "Select tier" dropdown at the front of the action bar
 *          (before Apply set) caps which equipment is selectable: picking Tier N
 *          limits every slot dropdown to items of tier N or lower; untiered
 *          records (runes, enchants, mounts, some accessories) are always
 *          selectable. Range 6..21, plus a "select tier" (= no cap) default.
 *          Any currently-equipped item above the cap is dropped when the filter
 *          changes. Client-only view constraint: NOT stored in the share hash.
 *          Apply set skips over-tier pieces.
 *   1.14.0 Primordial Codex element bonus. The two Codex variants (Offensive /
 *          Defensive) ship an `elementBonus` map (element -> bonus text). When a
 *          Codex is equipped, the Effects card shows only the line matching the
 *          equipped MAINHAND's `element` (read in the pre-pass); with no mainhand
 *          it shows a hint. Live-updates on mainhand change (recompute already
 *          fires). Requires `elementBonus` shipped + reserved by
 *          Module:BuildCalculator (deep-copied).
 *   1.13.0 Tier 12+ toggle for a fixed set of legacy ancients. A yes/no "Tier 12
 *          or above" select appears in the Ancient Selector while an item listed
 *          in TIER_BONUS_IDS is equipped; "yes" folds a flat +5 damage-give / +5
 *          damage-receive into the totals before any doubling. Detected by
 *          hardcoded prefixed id (the only id-based detection in this client) for
 *          stable legacy content that carries no data marker. Client-only: no
 *          generator/module/data change. Pick is per item id; not in the share
 *          hash.
 *   1.12.0 Evolvium reforge choices. A ring carrying a `reforge` table (the two
 *          Evolvium variants) reveals a "Reforge Evolvium" field in the Ancient
 *          Selector box: four selects (+1..+4), each picking one of that tier's
 *          two bonuses (or none). Chosen stats fold into the totals (before any
 *          doubling); prose choices (Extort, Purification...) list in Effects
 *          tagged to Evolvium. Picks are kept per item id so switching
 *          Off<->Def preserves each variant's choices. Requires `reforge`
 *          shipped + reserved by Module:BuildCalculator (deep-copied).
 *   1.11.0 Ancient Selector box (conditional per-ancient controls). A new
 *          bordered box appears after the Enchants box ONLY while a supporting
 *          ancient is equipped, and is removed otherwise. First supported
 *          ancient: W3-4TY (a reforge-copy offhand) -> one "Reforge" select
 *          with "Copy 2-piece effect" / "Copy 3-piece effect". Choosing one
 *          MARKS the matching set-bonus tier (count 2 or 3) in the Set Bonuses
 *          card -- forced active + an ancient-coloured "copied by <ancient>"
 *          badge -- on every active set that has such a tier. Detection is via
 *          the ancient's effect text ("copy ... set effect"); no data change
 *          needed. Set-bonus text stays verbatim (POC: no numeric resolution).
 *   1.10.0 Accessory upgrade levels (+0..+4). Any slot whose items carry a
 *          per-stat upgrade table (statUpgrade) gets a small upgrade picker
 *          beside the item select; the select shrinks a little and the +N box
 *          sits next to it, so the slot keeps the same overall width. Each
 *          level adds statUpgrade[stat] to that flat bonus BEFORE doubling, so
 *          +N gives base + N*delta (e.g. Divine Ward doubleturnchance at +4 =
 *          17 + 4*0.5 = 19); a Blaster/etc. doubling then applies on top. The
 *          chosen level rides along in the share hash as an optional third
 *          field (slotId:itemId:level; older 2-field links still load). Relies
 *          on statUpgrade being shipped + reserved by Module:BuildCalculator.
 *   1.9.0  doubleenchant + doublemount, completing the category-doubler family
 *          alongside doublerune. Each doubles its category's flat bonuses in the
 *          totals (enchants / the mount) and badges any description line the
 *          doubled record carries (e.g. a mount's prose bonus). Active from an
 *          equipped ancient (marker or effect-text) OR a set bonus that grants it
 *          (Apocalypse's 3-piece enchant / 4-piece mount / 5-piece rune). All
 *          four doublings unified: each doubled record resolves to one source
 *          that drives both the x2 and its badge. Non-stacking.
 *   1.8.0  Elementarium (ancient) / doublerune: doubles the bonuses of every
 *          equipped MAJOR rune in the totals. Active from an equipped
 *          Elementarium (a `doublerune` marker, effect-text fallback on "major
 *          rune ... double") OR from a set bonus that grants it (e.g.
 *          Apocalypse's 5-piece "Major rune bonuses doubled"). Non-stacking.
 *          The set piece tally moved into the pre-pass so set bonuses resolve
 *          before summing. (Enchant/Mount set doublings are not yet modelled.)
 *   1.7.0  Supercharged Polychromatic Blaster (ancient): doubles the bonuses of
 *          EVERY equipped Mythic across mainhand/offhand/head/body/ring/neck, at
 *          any count -- distinct from the standard Blaster's "only when exactly
 *          one Mythic is equipped". Detected via a `doublemythicall` marker
 *          (effect-text fallback keys off the word "all"). "All" supersedes the
 *          lone-doubler; doubling stays non-stacking (x2 max per Mythic). Each
 *          doubled line still shows the doubling item's name chip.
 *   1.6.1  The Blaster's "doubled" badge now reads the DOUBLING item's name
 *          (e.g. "Polychromatic Blaster"), coloured by its rarity, matching the
 *          source-name chips on every other line -- instead of the literal
 *          "Ancient". No behaviour change to the doubling maths.
 *   1.6.0  Polychromatic Blaster (ancient): when exactly ONE Mythic item is
 *          equipped across mainhand/offhand/head/body/ring/neck (pet, accessory
 *          and mount excluded), that item's bonuses are doubled in the totals
 *          (silently) and its effect lines get an "Ancient" badge next to the
 *          mythic name chip. Detected via a `doublemythic` marker, effect-text
 *          fallback otherwise. Non-stacking.
 *   1.5.1  Set-apply preview ("Fills N slots ...") moved out of the action bar
 *          to its own full-width row under the buttons, above the input boxes
 *          (collapses to nothing when no set is being previewed).
 *   1.5.0  Added an "Apply runes" picker (fills all major-rune slots), and
 *          generalized the apply-to-all logic so runes + enchants share one
 *          builder. Enchant button renamed "Apply to all" -> "Apply enchants".
 *   1.4.0  Enchant picker: choose one enchant and Apply to all fills every
 *          enchant slot at once (resets to "choose an enchant" after). No slot
 *          preview -- enchants are uniform. Clear all now sits at the far right.
 *   1.3.1  Apply set now resets the set picker back to "choose a set" (clearing
 *          the preview + slot highlights) once the pieces are placed.
 *   1.3.0  Starweave support: an equipped setcount item lowers each set-bonus
 *          tier's required pieces by 1, for any set with at least its minimum
 *          real pieces (2). Set Bonuses now activate on the effective count and
 *          show "(3 equipped -> counts as 4)". Detects the mechanic via a
 *          `setcount` field, falling back to the effect text.
 *   1.2.0  Set preview distinguishes OVERWRITE (dashed red) from fill (solid
 *          gold), counts overwrites, and flags pieces that won't fit; stays
 *          live as slots are edited.
 *   1.1.0  Set-apply preview: choosing a set in the picker now names the slots
 *          it will fill and highlights those slot boxes, before Apply set is
 *          clicked. Placement logic factored into planSet() (preview + apply
 *          share it, so they can't drift).
 *   1.0.0  Initial release candidate.
 *          - Mounts show their prose `bonus` line; mount `skill` is suppressed.
 *          - meta/relic/artifact rune `skill`s render in their own Runes card,
 *            separate from equipment Effects.
 *          - Every output card (Total Stats / Effects / Runes / Set Bonuses)
 *            is hidden when it has no content; a single hint card shows only
 *            when nothing is selected at all.
 *          - Apply-set picker, clear-all, and URL-hash permalinks (no network).
 * ===========================================================================
 *
 * Module:BuildCalculator emits, per .build-app:
 *   data-slots      : JSON array  [ { id, label, accepts }, ... ]
 *   data-equipment  : JSON object  id -> { id, name, type, rarity, tier?,
 *                     subtype?, effects?:[..], set?, statUpgrade?:{..},
 *                     <statKey>:<num>, ... }
 *   data-stats      : JSON object  statKey -> { label, percent, stack }  (may be {})
 *   .build-controls > .build-slots     : empty; we inject one <select> per slot
 *   .build-controls > .build-fallback  : no-JS line; we remove it on init
 *   .build-totals                      : empty; we inject totals + effects
 *
 * All math is client-side. There are NO network calls of any kind.
 *
 * Install: test via Special:MyPage/common.js or test mode; production via a
 * reviewed local JS page loaded through MediaWiki:ImportJS (desktop skin only).
 */
(function () {
  "use strict";

  // Version of this client. Keep in sync with the header changelog above; it
  // is stamped onto each .build-app as data-bc-version on init.
var VERSION = "1.16.0";

  // Reserved (non-stat) keys -- never summed. Mirrors Module:BuildCalculator.
  // `statUpgrade` is the accessory per-stat upgrade table ({stat: perLevelDelta});
  // it's an object, not a summable number -- consumed by the upgrade picker below.
  var RESERVED = {
    id: 1,
    name: 1,
    type: 1,
    rarity: 1,
    subtype: 1,
    tier: 1,
    effects: 1,
    set: 1,
    valueAvg: 1,
    percUpgrade: 1,
    statUpgrade: 1,
    setcount: 1,
    skill: 1,
    bonus: 1,
    doublemythic: 1,
    doublemythicall: 1,
    doublerune: 1,
    doubleenchant: 1,
    doublemount: 1,
    reforge: 1,
    elementBonus: 1,
  };

  // Flat base stats are omitted from the Total Stats panel; only bonuses are
  // shown. These keys are skipped when summing.
  var HIDE_FROM_TOTALS = { power: 1, agility: 1, stamina: 1 };

  // Bonus multipliers sort first in this order; everything else follows,
  // alphabetical by label. (StatData carries no order and JSON objects are
  // unordered, so display order lives here.)
  var BASE_ORDER = {
    powermult: 1,
    agilitymult: 2,
    staminamult: 3,
  };

  // Rarity ordering, used to sort same-named options (rune tiers) low -> high.
  var RARITY_RANK = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    set: 5,
    mythic: 6,
    ancient: 7,
    cosmetic: 8,
  };

  // Slots whose equipped item counts toward the Polychromatic Blaster's
  // "exactly one Mythic" condition. pet/accessory/mount are excluded.
  var MYTHIC_COUNT_SLOTS = {
    mainhand: 1,
    offhand: 1,
    head: 1,
    body: 1,
    ring: 1,
    neck: 1,
  };

// Accessory upgrade levels offered in the picker: +0 .. +MAX_UPGRADE.
  var MAX_UPGRADE = 4;

// Tier filter range offered by the "Select tier" dropdown (inclusive). Picking
// a tier caps selectable equipment to that tier or lower; untiered records
// (runes/enchants/mounts/some accessories) always pass the filter.
  var TIER_MIN = 6;
  var TIER_MAX = 21;

  var TIER_BONUS_IDS = {
    "eq-20740": 1,
	"eq-31400": 1,
	"eq-31420": 1,
	"eq-41880": 1,
	"eq-41900": 1,
	"eq-69480": 1,
	"eq-69500": 1,
  };
  var TIER_BONUS = { damagegivebonus: 5, damagereceivebonus: 5 };

  function capitalize(s) {
    s = String(s || "");
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // True when a record carries a usable per-stat upgrade table.
  function hasStatUpgrade(rec) {
    return !!(rec && rec.statUpgrade && typeof rec.statUpgrade === "object");
  }

  // Starweave "set requirement -1" mechanic (modifier type `setcount`): an
  // equipped item that LOWERS the pieces needed for each set-bonus tier by 1,
  // as long as you hold at least a minimum number of real pieces of that set.
  // Returns that minimum (so the caller knows when the reduction applies), or 0
  // if the record doesn't carry the mechanic.
  //   * Prefer a structured numeric `setcount` field (its value = the minimum).
  //   * Fall back to the effect text, whose wording is a fixed generator
  //     template ("... Set items required for a set bonus ... at least N items
  //     ..."), so this works with data modules generated before the field
  //     existed.
  function setcountMin(rec) {
    if (typeof rec.setcount === "number" && rec.setcount > 0) {
      return rec.setcount;
    }
    if (rec.effects) {
      for (var i = 0; i < rec.effects.length; i++) {
        if (/set items required for a set bonus/i.test(rec.effects[i])) {
          var m = /at least\s+(\d+)\s+item/i.exec(rec.effects[i]);
          return m ? parseInt(m[1], 10) : 2; // default minimum 2
        }
      }
    }
    return 0;
  }

  // Polychromatic Blaster family (ancient). TWO distinct doubling mechanics:
  //   * LONE  (Polychromatic Blaster): doubles the ONE Mythic's bonuses, but
  //     only while exactly one Mythic is equipped across the counted slots.
  //   * ALL   (Supercharged Polychromatic Blaster): doubles EVERY Mythic's
  //     bonuses in the counted slots, however many are equipped.
  // Each is detected via its own structured marker (`doublemythic` /
  // `doublemythicall`), with an effect-text fallback for data generated before
  // the fields existed. The two are kept mutually exclusive: the "all" text
  // carries the word "all" (".. of all Mythic equipment"), the lone text does
  // not (".. only 1 Mythic item .."), so the fallbacks key off that to avoid a
  // Supercharged blaster being mistaken for a lone-doubler on older data.

  // Supercharged: doubles EVERY counted Mythic, any count.
  function doublesAllMythic(rec) {
    if (rec.doublemythicall) {
      return true;
    }
    if (rec.effects) {
      for (var i = 0; i < rec.effects.length; i++) {
        var t = rec.effects[i];
        if (/mythic/i.test(t) && /doubl/i.test(t) && /\ball\b/i.test(t)) {
          return true;
        }
      }
    }
    return false;
  }

  // Lone: doubles the single Mythic, only when exactly one is equipped.
  function doublesMythic(rec) {
    if (rec.doublemythic) {
      return true;
    }
    if (rec.doublemythicall) {
      return false; // that's the "all" mechanic, not lone
    }
    if (rec.effects) {
      for (var i = 0; i < rec.effects.length; i++) {
        var t = rec.effects[i];
        if (/mythic/i.test(t) && /doubl/i.test(t) && !/\ball\b/i.test(t)) {
          return true;
        }
      }
    }
    return false;
  }

  // "Double a whole equipment category" ancients + set bonuses. Three parallel
  // mechanics, all shaped like Elementarium's doublerune:
  //   * doublerune    (Elementarium): doubles every equipped MAJOR rune.
  //   * doubleenchant (Apocalypse 3-set, or an ancient): doubles every ENCHANT.
  //   * doublemount   (Apocalypse 4-set, or an ancient): doubles the MOUNT.
  // Each is detected on an equipped item via its structured marker, falling back
  // to an effect line naming that category's doubling; the SAME doubling can
  // also come from a set bonus (see activeDoubleSet). Each is non-stacking
  // ("Only 1 bonus of this type may be active"), so callers treat it as a single
  // source. Flat bonuses are doubled in the totals; any description line the
  // doubled record carries (e.g. a mount's prose bonus) gets a source badge.
  function doublesCategory(rec, markerKey, categoryRe) {
    if (rec[markerKey]) {
      return true;
    }
    if (rec.effects) {
      for (var i = 0; i < rec.effects.length; i++) {
        var t = rec.effects[i];
        if (categoryRe.test(t) && /doubl/i.test(t)) {
          return true;
        }
      }
    }
    return false;
  }
  function doublesMajorRune(rec) {
    return doublesCategory(rec, "doublerune", /major rune/i);
  }
  function doublesEnchant(rec) {
    return doublesCategory(rec, "doubleenchant", /enchant/i);
  }
  function doublesMount(rec) {
    return doublesCategory(rec, "doublemount", /mount/i);
  }

  // Reforge-copy ancients (Ancient Selector -> "Reforge"). An ancient that
  // copies a Set effect (e.g. W3-4TY: "Copy any Set effect that requires 2
  // pieces"), reforgeable to copy the 2-piece OR 3-piece tier. Detected from the
  // effect text for now -- no data field needed. `reforgecopy` is left as a
  // forward-compatible structured marker (harmless when absent); wire it into
  // the three RESERVED lists if a generated field is ever added.
  function reforgeCopyAncient(rec) {
    if (rec.reforgecopy) {
      return true;
    }
    if (rec.rarity === "ancient" && rec.effects) {
      for (var i = 0; i < rec.effects.length; i++) {
        var t = rec.effects[i];
        if (/copy/i.test(t) && /set effect/i.test(t)) {
          return true;
        }
      }
    }
    return false;
  }

  // A category doubling can also be granted by a SET bonus (e.g. Apocalypse's
  // 3/4/5-piece enchant/mount/rune doublings). Given the computed set blocks,
  // return the first block with an ACTIVE tier (effective pieces meet the tier
  // count) whose desc names doubling of the given category, else null. The
  // category regex keeps the three set doublings distinct.
  function activeDoubleSet(setBlocks, categoryRe) {
    for (var i = 0; i < setBlocks.length; i++) {
      var b = setBlocks[i];
      for (var j = 0; j < b.tiers.length; j++) {
        var t = b.tiers[j];
        if (
          b.effective >= t.count &&
          categoryRe.test(t.desc) &&
          /doubl/i.test(t.desc)
        ) {
          return b;
        }
      }
    }
    return null;
  }

  function parseJSON(app, name) {
    try {
      return JSON.parse(app.getAttribute(name) || "null");
    } catch (e) {
      return undefined;
    }
  }

  function msg(container, text, cls) {
    container.innerHTML = "";
    var div = document.createElement("div");
    div.className = "build-msg" + (cls ? " " + cls : "");
    div.textContent = text;
    container.appendChild(div);
  }

  function init(content) {
    var root = (content && content[0]) || document;
    var apps = root.querySelectorAll(".build-app");
    // Hash sharing only when there's a single calculator on the page, so two
    // calculators can't fight over the same URL hash.
    var single = document.querySelectorAll(".build-app").length === 1;
    Array.prototype.forEach.call(apps, function (app) {
      if (app.getAttribute("data-bc-init")) {
        return; // guard double-init
      }
      app.setAttribute("data-bc-init", "1");
      app.setAttribute("data-bc-version", VERSION);
      setupApp(app, single);
    });
  }
  
	// Slot's `accepts` -> the book prefix its ids carry (see mergeRecords in
    // Module:BuildCalculator). Everything not listed is equipment ("eq-"). Used
    // to strip the prefix in the share hash and re-add it on read, so the hash
    // stays short but ids remain durable across data regen.
    var BOOK_PREFIX = {
      mount: "mt-",
      minor: "rn-",
      major: "rn-",
      meta: "rn-",
      relic: "rn-",
      artifact: "rn-",
      enchant: "en-",
    };
    function prefixFor(accepts) {
      return BOOK_PREFIX[accepts] || "eq-";
    }
    function stripPrefix(id) {
      var m = /^(?:eq|mt|rn|en)-(.*)$/.exec(id);
      return m ? m[1] : id;
    }

  function setupApp(app, hashEnabled) {
    var slotsBox = app.querySelector(".build-slots");
    var totals = app.querySelector(".build-totals");
    if (!slotsBox || !totals) {
      return;
    }

    var slots = parseJSON(app, "data-slots");
    var equipment = parseJSON(app, "data-equipment");
    var stats = parseJSON(app, "data-stats");
    var setsRaw = parseJSON(app, "data-sets");

    if (
      !Array.isArray(slots) ||
      !equipment ||
      typeof equipment !== "object" ||
      Array.isArray(equipment)
    ) {
      msg(totals, "Could not load the build data (malformed).", "build-error");
      return;
    }
    if (!stats || typeof stats !== "object" || Array.isArray(stats)) {
      stats = {}; // optional: derive labels
    }
    // data-sets may arrive as an id-keyed object OR a JSON array (Lua
    // serializes a 1..N-keyed table as an array). Normalize either shape
    // into a map keyed by each set's own id.
    var sets = {};
    if (setsRaw && typeof setsRaw === "object") {
      var setList = Array.isArray(setsRaw)
        ? setsRaw
        : Object.keys(setsRaw).map(function (k) {
            return setsRaw[k];
          });
      setList.forEach(function (s) {
        if (s && s.id != null) {
          sets[String(s.id)] = s;
        }
      });
    }

    // JS is running, so drop the no-JS fallback line.
    var fallback = app.querySelector(".build-fallback");
    if (fallback && fallback.parentNode) {
      fallback.parentNode.removeChild(fallback);
    }

    var byId = equipment; // id -> record (lookup)

    // Tier filter (0 = no cap). Driven by the "Select tier" dropdown; caps each
    // slot's option list to records of tier <= tierLimit. Untiered records pass.
    var tierLimit = 0;
    function passesTier(rec) {
      return !(tierLimit > 0 && rec.tier && rec.tier > tierLimit);
    }

    function optionsFor(accepts) {
      var out = [];
      for (var id in byId) {
        if (
          Object.prototype.hasOwnProperty.call(byId, id) &&
          byId[id].type === accepts
        ) {
          out.push(byId[id]);
        }
      }
      out.sort(function (a, b) {
        var n = String(a.name).localeCompare(String(b.name));
        if (n !== 0) {
          return n;
        }
        // same name (rune tiers): order by rarity, low -> high.
        return (RARITY_RANK[a.rarity] || 99) - (RARITY_RANK[b.rarity] || 99);
      });
      return out;
    }
    
    // (Re)populate a slot <select>: the "(none)" option + every record of the
    // slot's type that passes the current tier filter, appending the rarity to
    // same-named options (rune tiers). Keeps the current pick if it survives the
    // filter, else drops the slot to "(none)". Used for the initial build AND on
    // every tier-filter change.
    function fillSlotSelect(sel, accepts) {
      var prev = sel.value;
      while (sel.firstChild) {
        sel.removeChild(sel.firstChild);
      }
      var none = document.createElement("option");
      none.value = "";
      none.textContent = "\u2014 none \u2014";
      sel.appendChild(none);

      var opts = optionsFor(accepts).filter(passesTier);
      var nameCounts = {};
      opts.forEach(function (r) {
        nameCounts[r.name] = (nameCounts[r.name] || 0) + 1;
      });
      var found = false;
      opts.forEach(function (rec) {
        var o = document.createElement("option");
        o.value = rec.id;
        o.textContent =
          nameCounts[rec.name] > 1 && rec.rarity
            ? rec.name + " (" + capitalize(rec.rarity) + ")"
            : rec.name;
        sel.appendChild(o);
        if (rec.id === prev) {
          found = true;
        }
      });
      sel.value = found ? prev : ""; // drop a now-invalid pick
    }

    function statMeta(key) {
      var s = stats[key];
      if (s && s.label) {
        return { label: s.label, percent: !!s.percent };
      }
      var flat = key === "power" || key === "agility" || key === "stamina";
      return {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        percent: !flat,
      };
    }

    function fmt(v, percent) {
      var n = Math.round(v * 100) / 100; // trim float noise
      return percent ? n + "%" : String(n);
    }

    var selects = {}; // slotId -> <select>
    var upgrades = {}; // slotId -> accessory upgrade <select> (+0..+MAX), when present

    // Group the slots into bordered boxes by category, derived from each slot's
    // `accepts` (no SlotData change needed). Order: Equipment | Runes | Enchants.
    var GROUP_OF = {
      mainhand: "equipment",
      offhand: "equipment",
      head: "equipment",
      body: "equipment",
      neck: "equipment",
      ring: "equipment",
      accessory: "equipment",
      pet: "equipment",
      mount: "equipment",
      minor: "runes",
      major: "runes",
      meta: "runes",
      relic: "runes",
      artifact: "runes",
      enchant: "enchants",
    };
    var GROUP_ORDER = ["equipment", "runes", "enchants"];

    // One bordered box per group, created on demand and kept in GROUP_ORDER.
    var groupBoxes = {};
    function groupBox(accepts) {
      var g = GROUP_OF[accepts] || "equipment";
      if (!groupBoxes[g]) {
        var box = document.createElement("div");
        box.className = "build-group build-group-" + g;
        box.setAttribute("data-group", g);
        groupBoxes[g] = box;
      }
      return groupBoxes[g];
    }

    // ---- build one selector per slot ----
    slots.forEach(function (slot) {
      var wrap = document.createElement("div");
      wrap.className = "build-slot";
      wrap.setAttribute("data-slot", slot.id);

      var label = document.createElement("label");
      label.className = "build-slot-label";
      label.textContent = slot.label || slot.id;

      var sel = document.createElement("select");
      sel.className = "build-select";

      var none = document.createElement("option");
      none.value = "";
      none.textContent = "\u2014 none \u2014";
      sel.appendChild(none);

      var opts = optionsFor(slot.accepts);
      // Runes share one name across rarities; only when a slot has two
      // options with the same name do we append the rarity to tell them
      // apart (e.g. "Gold Rune (Mythic)"). Unique names stay clean.
      var nameCounts = {};
      opts.forEach(function (r) {
        nameCounts[r.name] = (nameCounts[r.name] || 0) + 1;
      });
      opts.forEach(function (rec) {
        var o = document.createElement("option");
        o.value = rec.id;
        o.textContent =
          nameCounts[rec.name] > 1 && rec.rarity
            ? rec.name + " (" + capitalize(rec.rarity) + ")"
            : rec.name;
        sel.appendChild(o);
      });

      var meta = document.createElement("div");
      meta.className = "build-slot-meta";

      // Accessory upgrade picker (+0..+MAX_UPGRADE). Shown for any slot whose
      // items can carry a per-stat upgrade table (statUpgrade) -- currently just
      // accessories. Each level adds statUpgrade[stat] to that flat bonus (see
      // recompute). Built here so the item select can shrink to make room for
      // the +N box beside it while the slot keeps its overall width.
      var hasUpgrade = opts.some(hasStatUpgrade);
      var upSel = null;
      if (hasUpgrade) {
        upSel = document.createElement("select");
        upSel.className = "build-upgrade";
        upSel.title = "Upgrade level";
        for (var u = 0; u <= MAX_UPGRADE; u++) {
          var uo = document.createElement("option");
          uo.value = String(u);
          uo.textContent = "+" + u;
          upSel.appendChild(uo);
        }
        upSel.disabled = true; // enabled by refreshMeta once an upgradeable item is picked
        upSel.addEventListener("change", function () {
          recompute();
          if (hashEnabled) {
            writeHash();
          }
        });
        upgrades[slot.id] = upSel;
      }

      // Update the rarity bar + meta line for the current selection (no math).
      // Also toggles the upgrade picker: enabled only when the picked item has
      // a statUpgrade table, and reset to +0 whenever it doesn't.
      function refreshMeta() {
        var rec = byId[sel.value];
        wrap.setAttribute("data-rarity", rec ? rec.rarity || "" : "");
        meta.textContent = rec
          ? rec.rarity + (rec.tier ? " \u00b7 T" + rec.tier : "")
          : "";
        if (upSel) {
          var up = hasStatUpgrade(rec);
          upSel.disabled = !up;
          if (!up) {
            upSel.value = "0";
          }
        }
      }
      sel.addEventListener("change", function () {
        refreshMeta();
        recompute();
        updateSetPreview(); // keep fill/overwrite rings accurate
      });

      wrap.appendChild(label);
      if (hasUpgrade) {
        // select + upgrade sit in a flex row so the item select shrinks a
        // little and the +N box sits beside it, keeping the slot's overall
        // width equal to every other slot.
        var selRow = document.createElement("div");
        selRow.className = "build-select-row";
        selRow.appendChild(sel);
        selRow.appendChild(upSel);
        wrap.appendChild(selRow);
      } else {
        wrap.appendChild(sel);
      }
      wrap.appendChild(meta);
      groupBox(slot.accepts).appendChild(wrap); // into its category box

      selects[slot.id] = sel;
      sel._refresh = refreshMeta; // used after hash hydrate
      sel._wrap = wrap; // used to highlight set-apply targets
    });

    // Drop the group boxes into the slots container in a fixed order.
    GROUP_ORDER.forEach(function (g) {
      if (groupBoxes[g]) {
        slotsBox.appendChild(groupBoxes[g]);
      }
    });

    // ---- Ancient Selector box (conditional per-ancient controls) ----
    // A bordered box appended AFTER the Enchants group. It is hidden by default
    // and revealed by recompute() only while an ancient that needs extra input
    // is equipped (first case: W3-4TY's Reforge). Its controls are built once
    // here; recompute reads their current values and toggles the box's display.
    var ancientBox = document.createElement("div");
    ancientBox.className = "build-group build-group-ancient";
    ancientBox.setAttribute("data-group", "ancient");
    ancientBox.style.display = "none"; // shown by recompute when applicable

    var ancientTitle = document.createElement("div");
    ancientTitle.className = "build-group-title";
    ancientTitle.textContent = "Ancient Selector";
    ancientBox.appendChild(ancientTitle);

    // Reforge (W3-4TY): copy a set's 2-piece or 3-piece effect. The chosen
    // number is read in recompute() to mark the matching set-bonus tier.
    var reforgeSlot = document.createElement("div");
    reforgeSlot.className = "build-slot";
    var reforgeLabel = document.createElement("label");
    reforgeLabel.className = "build-slot-label";
    reforgeLabel.textContent = "Reforge W3-4TY";
    var reforgeSelect = document.createElement("select");
    reforgeSelect.className = "build-select";
    [
      ["", "\u2014 none \u2014"],
      ["2", "Copy 2-piece effect"],
      ["3", "Copy 3-piece effect"],
    ].forEach(function (opt) {
      var o = document.createElement("option");
      o.value = opt[0];
      o.textContent = opt[1];
      reforgeSelect.appendChild(o);
    });
    reforgeSelect.addEventListener("change", function () {
      recompute(); // re-marks the set tier; recompute rewrites the hash too
    });
    reforgeSlot.appendChild(reforgeLabel);
    reforgeSlot.appendChild(reforgeSelect);
    ancientBox.appendChild(reforgeSlot);

// Reforge Evolvium: four tier selects, built dynamically when an Evolvium
    // variant is equipped (the choices differ per variant). Hidden until a
    // record carrying a `reforge` table is in a slot.
    var reforgeChoiceBlock = document.createElement("div");
    reforgeChoiceBlock.className = "build-slot";
    reforgeChoiceBlock.style.display = "none";
    var reforgeChoiceLabel = document.createElement("label");
    reforgeChoiceLabel.className = "build-slot-label";
    reforgeChoiceLabel.textContent = "Reforge Evolvium";
    var reforgeChoiceHost = document.createElement("div");
    reforgeChoiceHost.className = "build-reforge-row";
    reforgeChoiceBlock.appendChild(reforgeChoiceLabel);
    reforgeChoiceBlock.appendChild(reforgeChoiceHost);
    ancientBox.appendChild(reforgeChoiceBlock);

    // Picks kept per item id, so each variant (Off/Def) remembers its own
    // choices across re-equips. reforgeBuiltFor tracks which item's selects are
    // rendered so recompute only rebuilds when the equipped Evolvium changes
    // (rebuilding every recompute would wipe the user's picks).
var reforgeChoiceState = {};
    var reforgeBuiltFor = null;

    var tierSlot = document.createElement("div");
    tierSlot.className = "build-slot";
    tierSlot.style.display = "none";
    var tierLabel = document.createElement("label");
    tierLabel.className = "build-slot-label";
    tierLabel.textContent = "Tier 12 or above";
    var tierSelect = document.createElement("select");
    tierSelect.className = "build-select";
    [["no", "No"], ["yes", "Yes"]].forEach(function (opt) {
      var o = document.createElement("option");
      o.value = opt[0];
      o.textContent = opt[1];
      tierSelect.appendChild(o);
    });
tierSelect.addEventListener("change", function () {
      tierBonusOn = tierSelect.value === "yes";
      recompute();
    });
    tierSlot.appendChild(tierLabel);
    tierSlot.appendChild(tierSelect);
    ancientBox.appendChild(tierSlot);

	var tierBonusOn = false;

    function renderReforgeChoices(rec) {
      if (reforgeBuiltFor === rec.id) {
        return; // already built for this item; keep current picks
      }
      reforgeBuiltFor = rec.id;
      reforgeChoiceHost.innerHTML = "";
      var picks =
        reforgeChoiceState[rec.id] ||
        (reforgeChoiceState[rec.id] = rec.reforge.map(function () {
          return null;
        }));
      rec.reforge.forEach(function (tier, ti) {
        var cell = document.createElement("div");
        cell.className = "build-reforge-cell";
        var tlab = document.createElement("span");
        tlab.className = "build-reforge-tier";
        tlab.textContent = tier.label;
        var sel = document.createElement("select");
        sel.className = "build-select";
        var none = document.createElement("option");
        none.value = "";
        none.textContent = "\u2014 none \u2014";
        sel.appendChild(none);
        (tier.choices || []).forEach(function (c, ci) {
          var o = document.createElement("option");
          o.value = String(ci);
          o.textContent = c.label;
          sel.appendChild(o);
        });
        if (picks[ti] != null) {
          sel.value = String(picks[ti]);
        }
        sel.addEventListener("change", function () {
          var v = sel.value;
          reforgeChoiceState[rec.id][ti] = v === "" ? null : parseInt(v, 10);
          recompute();
        });
        cell.appendChild(tlab);
        cell.appendChild(sel);
        reforgeChoiceHost.appendChild(cell);
      });
    }

    slotsBox.appendChild(ancientBox); // sits after equipment/runes/enchants

    // ---- top action bar: apply-set picker + clear-all ----
    // All three controls are built here in JS (the wiki sanitizer strips
    // <button>/<select> from markup, but JS-created ones never pass through it
    // -- same reason the slot <select>s are built in JS).

    // setId -> [equipment pieces], from each record's `set` pointer, so
    // "Apply set" knows which pieces a set drops into which slots.
    var setMembers = {};
    for (var mid in byId) {
      if (
        Object.prototype.hasOwnProperty.call(byId, mid) &&
        byId[mid].set != null
      ) {
        var msid = String(byId[mid].set);
        (setMembers[msid] || (setMembers[msid] = [])).push(byId[mid]);
      }
    }

    // Reset every slot to "(none)".
    function clearAll() {
      slots.forEach(function (slot) {
        var sel = selects[slot.id];
        if (!sel || !sel.value) {
          return; // already empty
        }
        sel.value = "";
        if (sel._refresh) {
          sel._refresh(); // reset rarity bar + meta line (+ upgrade picker)
        }
      });
      // Ancient-selector state isn't held in a slot <select>, so the loop above
	  // never clears it. Reset it here too, or a stale toggle keeps re-writing
	  // itself into the hash after everything is cleared (e.g. #b=~t).
	  tierBonusOn = false;
	  reforgeSelect.value = "";
	  reforgeChoiceState = {};
	  reforgeBuiltFor = null;
      recompute(); // single repaint; clears hash if enabled
      updateSetPreview(); // targets are now empty -> all fills
    }

    // Compute the slot -> record assignment a set WOULD produce, without
    // changing anything. Same rule as applySet: a set's pieces fill slots of
    // their type in order, capped by how many such slots exist. Returns
    // { plan: [ { slot, rec }, ... ], overflow: <pieces that found no slot> }.
    // Shared by the preview and the actual apply so the two can't disagree.
	function planSet(sid) {
      var plan = [];
      var members = setMembers[sid] || [];
      if (!members.length) {
        return { plan: plan, overflow: 0 };
      }
      var byType = {}; // type -> [records]
      members.forEach(function (rec) {
        (byType[rec.type] || (byType[rec.type] = [])).push(rec);
      });
      var cursor = {}; // type -> next unplaced piece
      slots.forEach(function (slot) {
        var list = byType[slot.accepts];
        if (!list) {
          return; // nothing in this set for this slot
        }
        var i = cursor[slot.accepts] || 0;
        if (i >= list.length) {
          return; // more slots than pieces of this type
        }
        cursor[slot.accepts] = i + 1;
        if (!passesTier(list[i])) {
          return; // excluded by the tier filter -> falls into overflow
        }
        plan.push({ slot: slot, rec: list[i] });
      });
      return { plan: plan, overflow: members.length - plan.length };
    }

    // Drop the chosen set's pieces into their matching slots, OVERWRITING any
    // current pick. Slots the set has no piece for are left untouched.
    function applySet() {
      var plan = planSet(setSelect.value).plan;
      if (!plan.length) {
        return;
      }
      plan.forEach(function (p) {
        var sel = selects[p.slot.id];
        if (sel) {
          sel.value = p.rec.id; // overwrite any current pick
          if (sel._refresh) {
            sel._refresh();
          }
        }
      });
      setSelect.value = ""; // reset the picker back to "choose a set"
      recompute();
      updateSetPreview(); // no set selected now -> clears preview + highlights
    }

    // Bar layout:  [ set <select> ][ Apply set ]   [ Clear all ]
    var actions = document.createElement("div");
    actions.className = "build-actions";

    var setSelect = document.createElement("select");
    setSelect.className = "build-setpicker";
	var setNone = document.createElement("option");
    setNone.value = "";
    setNone.textContent = "\u2014 choose a set \u2014";
    setSelect.appendChild(setNone);

    // (Re)populate the set picker with only the sets that have at least one
    // piece placeable under the current tier cap. Rerun on tier-filter change.
    // Keeps the "(none)" option; preserves the current pick if it survives.
    function fillSetPicker() {
      var prev = setSelect.value;
      // Remove everything except the leading "(none)" option.
      while (setSelect.children.length > 1) {
        setSelect.removeChild(setSelect.lastChild);
      }
      var kept = { "": true };
      Object.keys(setMembers)
        .filter(function (sid) {
          // Show the set only if at least one of its pieces passes the tier
          // cap (planSet would place it); an all-over-tier set is hidden.
          return setMembers[sid].every(passesTier);
        })
        .map(function (sid) {
          var srec = sets[sid];
          return {
            id: sid,
            name: srec && srec.name ? srec.name : "Set " + sid,
            // Count only the pieces that actually pass the cap, so the label
            // matches what Apply set will place.
            count: setMembers[sid].filter(passesTier).length,
          };
        })
        .sort(function (a, b) {
          return a.name.localeCompare(b.name);
        })
        .forEach(function (s) {
          var o = document.createElement("option");
          o.value = s.id;
          o.textContent = s.name + " (" + s.count + ")";
          setSelect.appendChild(o);
          kept[s.id] = true;
        });
      // If the previously-picked set was filtered out, reset the picker (and
      // its preview) so a hidden set can't stay selected.
      setSelect.value = kept[prev] ? prev : "";
    }
    fillSetPicker();

    var applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "build-apply";
    applyBtn.textContent = "Apply set";
    applyBtn.addEventListener("click", applySet);

    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "build-clear";
    clearBtn.textContent = "Clear all";
    clearBtn.addEventListener("click", clearAll);

    // Preview line: names the slots the chosen set will fill and highlights
    // those slot boxes, BEFORE the user commits with "Apply set". Recomputed
    // whenever the set picker changes.
    var setPreview = document.createElement("div");
    setPreview.className = "build-setpreview";

    function clearSetHighlight() {
      slots.forEach(function (slot) {
        var sel = selects[slot.id];
        if (sel && sel._wrap) {
          sel._wrap.classList.remove("is-set-fill");
          sel._wrap.classList.remove("is-set-overwrite");
        }
      });
    }

    function updateSetPreview() {
      clearSetHighlight();
      var res = planSet(setSelect.value);
      var plan = res.plan;
      if (!plan.length) {
        setPreview.textContent = "";
        return;
      }
      var labels = [];
      var overwrites = 0;
      plan.forEach(function (p) {
        var sel = selects[p.slot.id];
        var cur = sel ? sel.value : "";
        // "overwrite" only when the slot holds a DIFFERENT pick; a slot
        // that's empty (or already holds this exact piece) is a plain fill.
        var willOverwrite = cur && cur !== p.rec.id;
        if (sel && sel._wrap) {
          sel._wrap.classList.add(
            willOverwrite ? "is-set-overwrite" : "is-set-fill"
          );
        }
        if (willOverwrite) {
          overwrites++;
        }
        labels.push(p.slot.label || p.slot.id);
      });

      var note = "";
      if (overwrites) {
        note +=
          ' <span class="warn">\u00b7 ' +
          overwrites +
          " will replace a current pick</span>";
      }
      if (res.overflow) {
        note +=
          ' <span class="warn">\u00b7 ' +
          res.overflow +
          (res.overflow === 1 ? " piece" : " pieces") +
          " won\u2019t fit</span>";
      }
      setPreview.innerHTML =
        '<span class="lbl">Fills ' +
        plan.length +
        (plan.length === 1 ? " slot:" : " slots:") +
        "</span> " +
        esc(labels.join(", ")) +
        note;
    }

    setSelect.addEventListener("change", updateSetPreview);

    // ---- "apply to all slots of a type" pickers (major runes, enchants) ----
    // A uniform slot type -- every major-rune slot, every enchant slot accepts
    // the same type -- can be filled in one go: pick one record and drop it
    // into every slot of that type, overwriting current picks; the picker then
    // resets to its placeholder. No preview: the slots are interchangeable, so
    // there's nothing to disambiguate the way the set-apply does.

    // Populate a picker <select>: a placeholder option + one per record,
    // appending the rarity when records share a name (rune tiers).
    function fillPicker(sel, records, placeholder) {
      var none = document.createElement("option");
      none.value = "";
      none.textContent = placeholder;
      sel.appendChild(none);
      var nameCounts = {};
      records.forEach(function (r) {
        nameCounts[r.name] = (nameCounts[r.name] || 0) + 1;
      });
      records.forEach(function (rec) {
        var o = document.createElement("option");
        o.value = rec.id;
        o.textContent =
          nameCounts[rec.name] > 1 && rec.rarity
            ? rec.name + " (" + capitalize(rec.rarity) + ")"
            : rec.name;
        sel.appendChild(o);
      });
    }

    // Fill every slot whose `accepts` matches, from the picker, then reset it.
    function applyAllOfType(pickerSel, accepts) {
      var id = pickerSel.value;
      if (!id || !byId[id]) {
        return;
      }
      slots.forEach(function (slot) {
        if (slot.accepts !== accepts) {
          return;
        }
        var sel = selects[slot.id];
        if (sel) {
          sel.value = id; // overwrite the slot
          if (sel._refresh) {
            sel._refresh();
          }
        }
      });
      pickerSel.value = ""; // reset the picker after applying
      recompute();
    }

    // Build one picker group (select + apply button), shown only when there
    // are both slots of the type AND records to choose from. Returns the
    // group element, or null when it shouldn't be shown.
    function buildApplyGroup(accepts, placeholder, buttonLabel) {
      var opts = optionsFor(accepts);
      var hasSlot = slots.some(function (s) {
        return s.accepts === accepts;
      });
      if (!opts.length || !hasSlot) {
        return null;
      }
      var sel = document.createElement("select");
      sel.className = "build-setpicker";
      fillPicker(sel, opts, placeholder);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "build-apply";
      btn.textContent = buttonLabel;
      btn.addEventListener("click", function () {
        applyAllOfType(sel, accepts);
      });
      var group = document.createElement("div");
      group.className = "build-actions-set";
      group.appendChild(sel);
      group.appendChild(btn);
      return group;
    }

    // "Apply runes" fills the major-rune slots; "Apply enchants" the enchants.
    var runeGroup = buildApplyGroup(
      "major",
      "\u2014 choose a major rune \u2014",
      "Apply runes"
    );
    var enchGroup = buildApplyGroup(
      "enchant",
      "\u2014 choose an enchant \u2014",
      "Apply enchants"
    );
    
    // Tier filter picker -- sits at the FRONT of the bar, before Apply set.
    // Caps selectable equipment to the chosen tier or lower, rebuilding every
    // slot's options and dropping any pick that's now over the cap.
    var tierGroup = document.createElement("div");
    tierGroup.className = "build-actions-set";
    var tierFilter = document.createElement("select");
    tierFilter.className = "build-setpicker";
    var tierAll = document.createElement("option");
    tierAll.value = "";
    tierAll.textContent = "\u2014 select tier \u2014";
    tierFilter.appendChild(tierAll);
    for (var tval = TIER_MIN; tval <= TIER_MAX; tval++) {
      var topt = document.createElement("option");
      topt.value = String(tval);
      topt.textContent = "Tier " + tval + " and below";
      tierFilter.appendChild(topt);
    }
	tierFilter.addEventListener("change", function () {
      tierLimit = parseInt(tierFilter.value, 10) || 0;
      slots.forEach(function (slot) {
        var sel = selects[slot.id];
        fillSlotSelect(sel, slot.accepts); // rebuild under the new cap
        if (sel._refresh) {
          sel._refresh(); // resync rarity bar/meta if a pick was dropped
        }
      });
      fillSetPicker(); // hide sets with no placeable piece at this cap
      recompute(); // reflect dropped picks (also rewrites the hash)
      updateSetPreview(); // preview reads setSelect.value, which may have reset
    });
    tierGroup.appendChild(tierFilter);
    actions.appendChild(tierGroup); // leftmost -> before the set group

    // Assemble the bar:  [set]  [runes]  [enchants]  ...  [Clear all]
    if (Object.keys(setMembers).length) {
      var setGroup = document.createElement("div");
      setGroup.className = "build-actions-set";
      setGroup.appendChild(setSelect);
      setGroup.appendChild(applyBtn);
      actions.appendChild(setGroup);
    }
    if (runeGroup) {
      actions.appendChild(runeGroup);
    }
    if (enchGroup) {
      actions.appendChild(enchGroup);
    }
    actions.appendChild(clearBtn);

    // Insert the bar at the TOP of .build-controls, above the slot selectors,
    // then the set preview as its own full-width row UNDER the bar and above
    // the input boxes (hidden via :empty when no set is being previewed).
    var controls = slotsBox.parentNode || slotsBox;
    controls.insertBefore(actions, slotsBox);
    if (Object.keys(setMembers).length) {
      controls.insertBefore(setPreview, slotsBox);
    }

    // ---- recompute: sum flat stats + collect effects + count set pieces ----
    function recompute() {
      var sums = {};
      var effects = [];
      var runes = []; // meta/relic/artifact skills -> own table
      var setCounts = {}; // setId -> real pieces equipped
      var setReduceMin = 0; // Starweave: smallest "min real pieces" among equipped setcount items; 0 = none equipped

      // ---- pre-pass: scan the whole loadout before summing --------------
      // Gathers everything the sum loop needs up front: the Blaster Mythic-
      // doubling state, the set piece counts + Starweave reduction (so set
      // bonuses -- and the category doublings that can come FROM a set bonus
      // -- resolve before we sum), and any equipped category-doubler ancients
      // (Elementarium etc. for rune/enchant/mount).
      //
      // Two ancient Mythic doublers (see doublesMythic / doublesAllMythic):
      //   * ALL  (Supercharged): doubles EVERY Mythic in the counted slots.
      //   * LONE (standard):     doubles the ONE Mythic, only when exactly
      //                          one is equipped across the counted slots.
      // "All" supersedes "lone" (it's a superset); doubling is non-stacking,
      // so each Mythic is doubled at most once (x2, never x4). We also keep
      // the active doubler's record so its NAME + rarity can label the extra
      // chip on each doubled line (mirroring the source-name chips).
      var allBlaster = null; // Supercharged, if equipped
      var loneBlaster = null; // standard, if equipped
      var mythicCount = 0;
      var loneMythicId = null;
      var countedMythicIds = {}; // id -> true, Mythics in counted slots
      var runeDoubleItem = null; // Elementarium, if equipped
      var enchantDoubleItem = null; // enchant-doubler item, if equipped
      var mountDoubleItem = null; // mount-doubler item, if equipped
      var reforgeItem = null; // reforge-copy ancient (W3-4TY), if equipped
      var reforgeChoiceItem = null; // Evolvium (carries a `reforge` table)
      var tierItem = null;
      var mainhandElement = null; // Primoridal codex logic
      slots.forEach(function (slot) {
        var rec = byId[selects[slot.id].value];
        if (!rec) {
          return;
        }
        if (doublesAllMythic(rec)) {
          allBlaster = rec; // non-stacking: last one wins
        } else if (doublesMythic(rec)) {
          loneBlaster = rec;
        }
        if (doublesMajorRune(rec)) {
          runeDoubleItem = rec; // Elementarium (non-stacking)
        }
        if (doublesEnchant(rec)) {
          enchantDoubleItem = rec; // enchant-doubler (non-stacking)
        }
        if (doublesMount(rec)) {
          mountDoubleItem = rec; // mount-doubler (non-stacking)
        }
        if (reforgeCopyAncient(rec)) {
          reforgeItem = rec; // W3-4TY etc. -> Ancient Selector (non-stacking)
        }
        if (rec.reforge) {
          reforgeChoiceItem = rec; // Evolvium (non-stacking; one ring)
        }
		if (TIER_BONUS_IDS[selects[slot.id].value]) {
          tierItem = rec;
        }
        if (slot.accepts === "mainhand" && rec.element) {
          mainhandElement = rec.element;
        }
        if (MYTHIC_COUNT_SLOTS[slot.accepts] && rec.rarity === "mythic") {
          mythicCount++;
          loneMythicId = rec.id;
          countedMythicIds[rec.id] = true;
        }
        if (rec.set) {
          setCounts[rec.set] = (setCounts[rec.set] || 0) + 1;
        }
        // Starweave-style set-requirement reduction (see setcountMin).
        var scm = setcountMin(rec);
        if (scm > 0) {
          setReduceMin = setReduceMin ? Math.min(setReduceMin, scm) : scm;
        }
      });

      // Resolve the Mythic doubled set + which blaster is responsible.
      var doubledIds = {}; // id -> true
      var doubledBy = null; // blaster record labelling the chip
      if (allBlaster) {
        doubledIds = countedMythicIds; // every counted Mythic
        doubledBy = allBlaster;
      } else if (loneBlaster && mythicCount === 1) {
        doubledIds[loneMythicId] = true; // just the lone Mythic
        doubledBy = loneBlaster;
      }

      // Ancient Selector: show the Reforge control only while a reforge-copy
      // ancient (e.g. W3-4TY) is equipped; hide + reset it otherwise so a stale
      // choice can't linger and mark a tier after the ancient is removed.
// W3-4TY reforge-copy control
      if (reforgeItem) {
        reforgeSlot.style.display = "";
      } else {
        reforgeSlot.style.display = "none";
        reforgeSelect.value = ""; // programmatic: does not fire change
      }
      // Evolvium reforge-choice controls
      if (reforgeChoiceItem) {
        reforgeChoiceBlock.style.display = "";
        renderReforgeChoices(reforgeChoiceItem);
      } else {
        reforgeChoiceBlock.style.display = "none";
        reforgeBuiltFor = null; // rebuild cleanly next time one is equipped
      }
      if (tierItem) {
    		tierSlot.style.display = "";
    		tierSelect.value = tierBonusOn ? "yes" : "no";
      } else {
        	tierSlot.style.display = "none";
      }
      // The box shows while ANY ancient control is active.
      ancientBox.style.display =
        reforgeItem || reforgeChoiceItem || tierItem ? "" : "none";
      var reforgeCount =
        reforgeItem && reforgeSelect.value
          ? parseInt(reforgeSelect.value, 10) || 0
          : 0;

      // Set bonuses, computed now so they can both render AND drive the
      // category doublings that come FROM a set bonus (Apocalypse's 3/4/5-
      // piece enchant/mount/rune doublings).
      var setBlocks = setBonuses(setCounts, setReduceMin);

      // Reforge copy: mark the matching set-bonus tier (the one whose required
      // count equals the chosen 2 or 3) on every active set that has one. The
      // tier is forced active and badged with the ancient's name. tiers are
      // fresh per-recompute objects (see setBonuses), so this never mutates the
      // shared set definitions.
      if (reforgeCount) {
        setBlocks.forEach(function (b) {
          b.tiers.forEach(function (t) {
            if (t.count === reforgeCount) {
              t.copied = true;
              t.copiedBy = reforgeItem.name;
            }
          });
        });
      }

      // Resolve each category's doubling SOURCE as a { name, rarity } chip
      // label: the equipped ancient if present, else the granting set bonus
      // (labelled with the set's name in "set" colours). null = not active.
      // Each is non-stacking, so a single source per category.
      function doublerLabel(item, setBlock) {
        if (item) {
          return { name: item.name, rarity: item.rarity };
        }
        if (setBlock) {
          return { name: setBlock.name, rarity: "set" };
        }
        return null;
      }
      var mythicDoubler = doubledBy
        ? { name: doubledBy.name, rarity: doubledBy.rarity }
        : null;
      var runeDoubler = doublerLabel(
        runeDoubleItem,
        activeDoubleSet(setBlocks, /major rune/i)
      );
      var enchantDoubler = doublerLabel(
        enchantDoubleItem,
        activeDoubleSet(setBlocks, /enchant/i)
      );
      var mountDoubler = doublerLabel(
        mountDoubleItem,
        activeDoubleSet(setBlocks, /mount/i)
      );

      // Which source (if any) doubles this record's bonuses? The four
      // categories are disjoint by slot/type -- Mythic gear, MAJOR runes,
      // ENCHANTS, the MOUNT -- so at most one applies, and nothing ever
      // doubles twice (x2, never x4).
      function doublerFor(rec) {
        if (doubledIds[rec.id] === true) {
          return mythicDoubler;
        }
        if (runeDoubler && rec.type === "major") {
          return runeDoubler;
        }
        if (enchantDoubler && rec.type === "enchant") {
          return enchantDoubler;
        }
        if (mountDoubler && rec.type === "mount") {
          return mountDoubler;
        }
        return null;
      }

      // Build one effect-row object. A non-null `dbl` (the doubling source)
      // both flags the line as doubled and supplies the badge's name+rarity.
      function fxObj(rec, text, dbl) {
        return {
          name: rec.name,
          rarity: rec.rarity,
          text: text,
          doubled: !!dbl,
          doubledBy: dbl ? dbl.name : null,
          doubledByRarity: dbl ? dbl.rarity : null,
        };
      }

      slots.forEach(function (slot) {
        var rec = byId[selects[slot.id].value];
        if (!rec) {
          return;
        }
        var dbl = doublerFor(rec); // doubling source, or null
        var factor = dbl ? 2 : 1;
        // Accessory upgrade level: each level adds statUpgrade[k] to stat k
        // BEFORE any doubling, so +N gives base + N*delta (then x2 if doubled).
        var upEl = upgrades[slot.id];
        var level =
          upEl && !upEl.disabled ? parseInt(upEl.value, 10) || 0 : 0;
        var su =
          level && hasStatUpgrade(rec) ? rec.statUpgrade : null;
        for (var k in rec) {
          if (!Object.prototype.hasOwnProperty.call(rec, k)) {
            continue;
          }
          if (RESERVED[k] || HIDE_FROM_TOTALS[k]) {
            continue;
          }
          if (typeof rec[k] === "number") {
            var val = rec[k];
            if (su && typeof su[k] === "number") {
              val += level * su[k]; // apply the per-stat upgrade increment
            }
            sums[k] = (sums[k] || 0) + val * factor; // doubling applied here
          }
        }
		if (tierBonusOn && TIER_BONUS_IDS[selects[slot.id].value]) {
          for (var tk in TIER_BONUS) {
            sums[tk] = (sums[tk] || 0) + TIER_BONUS[tk] * factor;
          }
        }
		if (rec.effects) {
          rec.effects.forEach(function (t) {
            effects.push(fxObj(rec, t, dbl));
          });
        }
        // Primordial Codex: show only the element bonus matching the equipped
        // mainhand's element (read in the pre-pass), or a hint if none is set.
        if (rec.elementBonus) {
          if (mainhandElement && rec.elementBonus[mainhandElement]) {
            effects.push(
              fxObj(
                rec,
                capitalize(mainhandElement) + ": " + rec.elementBonus[mainhandElement],
                dbl
              )
            );
          } else {
            effects.push(
              fxObj(rec, "Equip a mainhand to see its element bonus", dbl)
            );
          }
        }
        // Mounts: show only the prose `bonus` line and suppress the
        // `skill`. The meta/relic/artifact runes also carry a `skill`
        // string (they're the only non-mount records that do) -> route
        // those into their own Runes table, not the Effects panel.
        if (rec.skill && rec.type !== "mount") {
          runes.push({ name: rec.name, rarity: rec.rarity, text: rec.skill });
        }
        if (rec.bonus) {
          effects.push(fxObj(rec, rec.bonus, dbl));
        }
        // Evolvium reforge picks: each chosen tier option adds its stat(s) or
        // an effect line. Stats fold in BEFORE doubling (factor), like every
        // other flat bonus; prose choices tag to the item like its own lines.
        if (rec.reforge) {
          var rpicks = reforgeChoiceState[rec.id] || [];
          rec.reforge.forEach(function (tier, ti) {
            var ci = rpicks[ti];
            if (ci == null) {
              return;
            }
            var choice = tier.choices[ci];
            if (!choice) {
              return;
            }
            if (choice.stats) {
              for (var sk in choice.stats) {
                if (
                  Object.prototype.hasOwnProperty.call(choice.stats, sk) &&
                  typeof choice.stats[sk] === "number"
                ) {
                  sums[sk] = (sums[sk] || 0) + choice.stats[sk] * factor;
                }
              }
            }
            if (choice.effect) {
              effects.push(fxObj(rec, choice.effect, dbl));
            }
          });
        }
      });

      render(sums, effects, runes, setBlocks);
      if (hashEnabled) {
        writeHash();
      }
    }

    // Active set bonuses for the current build: any set with 2+ real pieces.
    // When a Starweave (setcount) item is equipped and the set has at least
    // its minimum real pieces, the requirement drops by 1 -- modelled here as
    // an EFFECTIVE count of realPieces + 1, so a tier lights up when
    // effective >= its count. Reduction is capped at 1 (non-stacking).
    function setBonuses(setCounts, setReduceMin) {
      var blocks = [];
      for (var sid in setCounts) {
        if (!Object.prototype.hasOwnProperty.call(setCounts, sid)) {
          continue;
        }
        var pieces = setCounts[sid];
        if (pieces < 2) {
          continue; // need 2+ real pieces for any bonus
        }
        var srec = sets[sid];
        if (!srec || !srec.bonuses || !srec.bonuses.length) {
          continue;
        }
        // Reduction applies only if a setcount item is equipped AND this
        // set has at least the required minimum real pieces.
        var reduction = setReduceMin > 0 && pieces >= setReduceMin ? 1 : 0;
        // Fresh tier objects (not the shared set-def refs) so per-recompute
        // annotations like `copied` can't leak across recomputes.
        var tiers = srec.bonuses
          .map(function (bn) {
            return { count: bn.count, desc: bn.desc };
          })
          .sort(function (a, b) {
            return a.count - b.count;
          });
        blocks.push({
          name: srec.name || "Set " + sid,
          pieces: pieces,
          effective: pieces + reduction,
          reduction: reduction,
          tiers: tiers,
        });
      }
      blocks.sort(function (a, b) {
        return String(a.name).localeCompare(String(b.name));
      });
      return blocks;
    }

    // One "<name> chip + text" list item, shared by the Effects and Runes
    // panels (both use the .build-effects styling). When `e.doubled` is set
    // (a Polychromatic Blaster is doubling this Mythic item), a SECOND chip is
    // appended naming the doubling item (e.g. "Polychromatic Blaster"),
    // coloured by that item's rarity -- just like every other source chip --
    // so the line reads "<mythic item> · <doubling item>".
    function sourceItem(e) {
      var chips =
        '<span class="src ' +
        esc(e.rarity || "") +
        '">' +
        esc(e.name) +
        "</span>";
      if (e.doubled && e.doubledBy) {
        chips +=
          '<span class="src ' +
          esc(e.doubledByRarity || "ancient") +
          '" title="Bonuses doubled by ' +
          esc(e.doubledBy) +
          '">' +
          esc(e.doubledBy) +
          "</span>";
      }
      return (
        "<li>" + chips + '<span class="txt">' + esc(e.text) + "</span></li>"
      );
    }

    function render(sums, effects, runes, setBlocks) {
      var keys = Object.keys(sums).sort(function (a, b) {
        var oa = BASE_ORDER[a] || 99,
          ob = BASE_ORDER[b] || 99;
        if (oa !== ob) {
          return oa - ob;
        }
        return statMeta(a).label.localeCompare(statMeta(b).label);
      });

      // Every output card is optional: it renders only when it has content,
      // otherwise it's omitted entirely (no empty-placeholder boxes).

      // Total Stats card
      var totalsSection = "";
      if (keys.length) {
        var rows = keys
          .map(function (k) {
            var m = statMeta(k),
              v = sums[k];
            var cls = v > 0 ? "pos" : v < 0 ? "neg" : "";
            return (
              '<tr><td class="k">' +
              esc(m.label) +
              "</td>" +
              '<td class="v ' +
              cls +
              '">' +
              esc(fmt(v, m.percent)) +
              "</td></tr>"
            );
          })
          .join("");
        totalsSection =
          '<section class="build-card">' +
          '<div class="build-panel-title">Total Stats</div>' +
          '<table class="build-totals-table"><tbody>' +
          rows +
          "</tbody></table>" +
          "</section>";
      }

      // Effects card
      var fxSection = "";
      if (effects.length) {
        fxSection =
          '<section class="build-card">' +
          '<div class="build-panel-title">Effects</div>' +
          '<ul class="build-effects">' +
          effects.map(sourceItem).join("") +
          "</ul>" +
          "</section>";
      }

      // Runes card (meta/relic/artifact skills)
      var runesSection = "";
      if (runes.length) {
        runesSection =
          '<section class="build-card">' +
          '<div class="build-panel-title">Runes</div>' +
          '<ul class="build-effects">' +
          runes.map(sourceItem).join("") +
          "</ul>" +
          "</section>";
      }

      // Set Bonuses card -- only when a set is active (2+ pieces).
      var setSection = "";
      if (setBlocks.length) {
        var setInner = '<div class="build-panel-title">Set Bonuses</div>';
        setInner += setBlocks
          .map(function (b) {
            var tiers = b.tiers
              .map(function (t) {
                // A tier lights up on the EFFECTIVE count (real pieces + any
                // Starweave reduction), OR when a reforge-copy ancient is
                // copying this exact tier (t.copied), which grants it directly.
                var on = b.effective >= t.count || t.copied;
                // Copied tier: append an ancient-coloured badge naming the
                // source, mirroring the source chips used elsewhere.
                var badge = t.copied
                  ? ' <span class="build-copy" title="Copied by ' +
                    esc(t.copiedBy) +
                    '">' +
                    esc(t.copiedBy) +
                    "</span>"
                  : "";
                return (
                  '<li class="build-tier ' +
                  (on ? "on" : "off") +
                  (t.copied ? " copied" : "") +
                  '">' +
                  '<span class="build-tiercount">' +
                  esc(String(t.count)) +
                  "</span>" +
                  '<span class="txt">' +
                  esc(t.desc) +
                  badge +
                  "</span></li>"
                );
              })
              .join("");
            // Piece label: "(3 equipped)" normally; when a Starweave is
            // lowering the requirement, "(3 equipped \u2192 counts as 4)".
            var pieceLabel =
              b.reduction > 0
                ? b.pieces + " equipped \u2192 counts as " + b.effective
                : b.pieces + " equipped";
            return (
              '<div class="build-setblock">' +
              '<div class="build-setname">' +
              esc(b.name) +
              ' <span class="build-setpieces">(' +
              esc(pieceLabel) +
              ")</span></div>" +
              '<ul class="build-tiers">' +
              tiers +
              "</ul></div>"
            );
          })
          .join("");
        setSection = '<section class="build-card">' + setInner + "</section>";
      }

      var html = totalsSection + fxSection + runesSection + setSection;
      if (!html) {
        // Nothing selected yet -> a single hint instead of a blank area.
        html =
          '<section class="build-card">' +
          '<div class="build-empty">Select items above to see totals, effects, and set bonuses.</div>' +
          "</section>";
      }
      totals.innerHTML = html;
    }

	// ---- URL-hash share (optional, no network) ----
    // Format: #b=<f0>|<f1>|...~<ancient>
    //   loadout: one field per slot, in data-slots order. Empty = nothing.
    //     field = <itemId-without-book-prefix>[.<accessoryLevel>]
    //   ancient (optional, after ~): comma-separated, each tagged:
    //     t          tier-12+ toggle on
    //     rN         W3-4TY reforge-copy tier (r2 / r3)
    //     eA.B.C.D   Evolvium picks per tier ('-' = none, else choice index)
    // Returns { picks, levels, tierOn, reforgeCopy, evolvium }.
    function readHash() {
      var out = {
        picks: {},
        levels: {},
        tierOn: false,
        reforgeCopy: "",
        evolvium: null,
      };
      var m = /(?:^|#|&)b=([^&]*)/.exec(location.hash || "");
      if (!m) {
        return out;
      }
      var raw;
      try {
        raw = decodeURIComponent(m[1]);
      } catch (e) {
        raw = m[1];
      }
      var tilde = raw.indexOf("~");
      var loadout = tilde >= 0 ? raw.slice(0, tilde) : raw;
      var ancient = tilde >= 0 ? raw.slice(tilde + 1) : "";

      // Loadout: positional over slots.
      var fields = loadout.split("|");
      slots.forEach(function (slot, i) {
        var f = fields[i];
        if (!f) {
          return; // empty slot
        }
        var dot = f.indexOf(".");
        var idPart = dot >= 0 ? f.slice(0, dot) : f;
        var lvPart = dot >= 0 ? f.slice(dot + 1) : "";
        if (!idPart) {
          return;
        }
        out.picks[slot.id] = prefixFor(slot.accepts) + idPart;
        if (lvPart) {
          var lv = parseInt(lvPart, 10);
          if (lv > 0) {
            out.levels[slot.id] = lv;
          }
        }
      });

      // Ancient block.
      if (ancient) {
        ancient.split(",").forEach(function (tok) {
          if (tok === "t") {
            out.tierOn = true;
          } else if (/^r[23]$/.test(tok)) {
            out.reforgeCopy = tok.slice(1);
          } else if (tok.charAt(0) === "e") {
            out.evolvium = tok.slice(1).split(".").map(function (c) {
              return c === "" || c === "-" ? null : parseInt(c, 10);
            });
          }
        });
      }
      return out;
    }

	function writeHash() {
      // Loadout, positional.
      var fields = slots.map(function (s) {
        var v = selects[s.id].value;
        if (!v) {
          return "";
        }
        var f = stripPrefix(v);
        var upEl = upgrades[s.id];
        var lv = upEl && !upEl.disabled ? parseInt(upEl.value, 10) || 0 : 0;
        return lv > 0 ? f + "." + lv : f;
      });
      // Trim trailing empties.
      while (fields.length && fields[fields.length - 1] === "") {
        fields.pop();
      }
      var loadout = fields.join("|");

      // Ancient block (only non-default parts).
      var anc = [];
      if (tierBonusOn) {
        anc.push("t");
      }
      if (reforgeSelect.value === "2" || reforgeSelect.value === "3") {
        anc.push("r" + reforgeSelect.value);
      }
      // Evolvium: emit only if an Evolvium is equipped AND has any pick set.
      if (reforgeBuiltFor && reforgeChoiceState[reforgeBuiltFor]) {
        var picks = reforgeChoiceState[reforgeBuiltFor];
        if (
          picks.some(function (p) {
            return p != null;
          })
        ) {
          anc.push(
            "e" +
              picks
                .map(function (p) {
                  return p == null ? "-" : String(p);
                })
                .join(".")
          );
        }
      }

      var val = anc.length ? loadout + "~" + anc.join(",") : loadout;
      try {
        if (val && val !== "") {
          history.replaceState(null, "", "#b=" + val);
        } else if (/(?:^|#|&)b=/.test(location.hash)) {
          history.replaceState(null, "", location.pathname + location.search);
        }
      } catch (e) {}
    }

	// ---- hydrate from hash, then first paint ----
    if (hashEnabled) {
      var saved = readHash();
      slots.forEach(function (slot) {
        var id = saved.picks[slot.id];
        if (id && byId[id] && byId[id].type === slot.accepts) {
          selects[slot.id].value = id;
          selects[slot.id]._refresh();
          var lv = saved.levels[slot.id];
          var upEl = upgrades[slot.id];
          if (lv && upEl && !upEl.disabled) {
            upEl.value = String(Math.min(MAX_UPGRADE, Math.max(0, lv)));
          }
        }
      });

      // Apply the tier toggle + W3-4TY copy before the first recompute so they
      // show correctly; the controls read these on render.
      tierBonusOn = !!saved.tierOn;
      if (saved.reforgeCopy) {
        reforgeSelect.value = saved.reforgeCopy;
      }

      // First paint: builds the ancient controls (incl. the Evolvium selects,
      // which only exist once an Evolvium is equipped).
      recompute();

      // Now the Evolvium selects exist (if one is equipped) -> restore picks and
      // repaint. reforgeBuiltFor was set by renderReforgeChoices during recompute.
      if (saved.evolvium && reforgeBuiltFor) {
        reforgeChoiceState[reforgeBuiltFor] = saved.evolvium.slice();
        // Reflect into the on-screen selects.
        var host = reforgeChoiceHost;
        var sels = host.querySelectorAll("select");
        saved.evolvium.forEach(function (v, i) {
          if (sels[i]) {
            sels[i].value = v == null ? "" : String(v);
          }
        });
        recompute();
      }
    } else {
      recompute();
    }
  }

  // Bind via the MediaWiki content hook, with a DOM-ready fallback.
  if (window.mw && mw.hook) {
    mw.hook("wikipage.content").add(function ($content) {
      init($content);
    });
  } else if (document.readyState !== "loading") {
    init([document]);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      init([document]);
    });
  }
})();