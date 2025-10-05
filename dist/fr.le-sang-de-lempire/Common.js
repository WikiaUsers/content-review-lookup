/* ==========================
   Convertisseur Calendrier Révolutionnaire <-> Grégorien
   Wiki: Le Sang de l'Empire (Fandom)
   Règle sextile "Romme": années ≡ 3 (mod 4) à partir de l'An I (III, VII, XI, XV, ...)
   Époque: 22 septembre 1792 (Grégorien) = 1 Vendémiaire An I
   ========================== */

(function () {
  "use strict";

  // --- Utilitaires de dates (UTC pour éviter les surprises timezone) ---
  const toUTCDate = (y, m, d) => new Date(Date.UTC(y, m, d));
  const daysBetweenUTC = (d1, d2) => Math.round((d2 - d1) / 86400000);

  // Époque (1 Vendémiaire An I)
  const EPOCH_GREG = toUTCDate(1792, 8, 22); // 22 sept. 1792 (mois JS: 0-11)

  // Mois & jours
  const MONTHS_FR = [
    "Vendémiaire", "Brumaire", "Frimaire",
    "Nivôse", "Pluviôse", "Ventôse",
    "Germinal", "Floréal", "Prairial",
    "Messidor", "Thermidor", "Fructidor",
    "Jours complémentaires"
  ];

  const DECADE_DAYS = [
    "Primidi", "Duodi", "Tridi", "Quartidi", "Quintidi",
    "Sextidi", "Septidi", "Octidi", "Nonidi", "Décadi"
  ];

  const COMPLEMENTARY_NAMES = [
    "La Vertu", "Le Génie", "Le Travail", "L’Opinion", "Les Récompenses", "La Révolution"
  ];

  // Normalisation accents / casse
  const normalize = s => s
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim();

  // Map nom de mois -> index
  const MONTHS_MAP = (() => {
    const map = {};
    MONTHS_FR.forEach((m, i) => {
      map[normalize(m)] = i;
      // alias sans espaces / abréviations courantes
      map[normalize(m.replace(/[^A-Za-z]/g, ""))] = i;
      map[normalize(m).slice(0, 4)] = i; // ex: "vend", "brum", ...
    });
    return map;
  })();

  // Règle sextile Romme: années ≡ 3 (mod 4) (An III, VII, XI, XV, ...)
  const isRommeLeap = (year) => ((year - 3) % 4 === 0);

  // Longueur d'une année révolutionnaire
  const yearLength = (year) => isRommeLeap(year) ? 366 : 365;

  // --- Conversion Grégorien -> Révolutionnaire ---
  function gregToRev(date) {
    // date = Date (UTC recommandé)
    const daysFromEpoch = daysBetweenUTC(EPOCH_GREG, toUTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    if (daysFromEpoch < 0) {
      return { error: "Date antérieure au 22 septembre 1792 non prise en charge." };
    }

    // Trouver l'année révolutionnaire
    let y = 1;
    let remaining = daysFromEpoch;
    while (true) {
      const len = yearLength(y);
      if (remaining < len) break;
      remaining -= len;
      y++;
    }

    // Mois / jour
    let month, day;
    if (remaining < 360) {
      month = Math.floor(remaining / 30);
      day = (remaining % 30) + 1;
    } else {
      month = 12; // complémentaires
      day = (remaining - 360) + 1; // 1..5/6
      if (day > (isRommeLeap(y) ? 6 : 5)) {
        return { error: "Jour complémentaire invalide (au-delà de l'année)." };
      }
    }

    // Jour de décade (0..9)
    const decadeDayIndex = remaining % 10;
    const decadeDay = DECADE_DAYS[decadeDayIndex];

    const monthName = MONTHS_FR[month];
    const complementaryName = (month === 12) ? COMPLEMENTARY_NAMES[day - 1] : null;

    return {
      year: y,
      monthIndex: month,
      monthName,
      day,
      decadeDay,
      complementaryName
    };
  }

  // --- Conversion Révolutionnaire -> Grégorien ---
  function revToGreg(revYear, revMonthIndex, revDay) {
    // validations
    if (revYear < 1 || !Number.isInteger(revYear)) return { error: "Année révolutionnaire invalide." };
    if (revMonthIndex < 0 || revMonthIndex > 12) return { error: "Mois révolutionnaire invalide." };

    const maxDay = (revMonthIndex === 12) ? (isRommeLeap(revYear) ? 6 : 5) : 30;
    if (revDay < 1 || revDay > maxDay) return { error: "Jour révolutionnaire invalide pour ce mois." };

    // jours anniversaires des années précédentes
    let days = 0;
    for (let y = 1; y < revYear; y++) {
      days += yearLength(y);
    }

    // mois
    if (revMonthIndex < 12) {
      days += revMonthIndex * 30 + (revDay - 1);
    } else {
      days += 360 + (revDay - 1);
    }

    const gregDate = new Date(EPOCH_GREG.getTime() + days * 86400000);
    return {
      date: gregDate,
      y: gregDate.getUTCFullYear(),
      m: gregDate.getUTCMonth(), // 0..11
      d: gregDate.getUTCDate()
    };
  }

  // --- Parsing helpers ---
  function parseMonthInput(s) {
    const key = normalize(s).replace(/[^a-z]/g, "");
    if (key in MONTHS_MAP) return MONTHS_MAP[key];
    return null;
  }

  // Formatage
  function formatRev({ year, monthName, day, decadeDay, complementaryName }) {
    if (!monthName) return "";
    if (monthName === "Jours complémentaires") {
      const label = complementaryName ? ` (${complementaryName})` : "";
      return `${decadeDay} ${day} ${monthName}${label}, An ${year}`;
    }
    return `${decadeDay} ${day} ${monthName}, An ${year}`;
  }

  function pad2(n) { return String(n).padStart(2, "0"); }

  function formatGregISO(y, m, d) {
    return `${y}-${pad2(m + 1)}-${pad2(d)}`;
  }

  // --- UI ---
  function buildWidget(container) {
    container.classList.add("revcal-mounted");
    container.innerHTML = `
      <div class="revcal-card">
        <div class="revcal-tabs" role="tablist">
          <button class="revcal-tab is-active" data-tab="greg2rev" role="tab" aria-selected="true">Grégorien → Révolutionnaire</button>
          <button class="revcal-tab" data-tab="rev2greg" role="tab" aria-selected="false">Révolutionnaire → Grégorien</button>
        </div>

        <div class="revcal-panel" data-panel="greg2rev">
          <div class="revcal-row">
            <label>
              Date grégorienne :
              <input type="date" class="revcal-input" data-greg-date />
            </label>
            <button class="revcal-btn" data-action="g2r">Convertir</button>
          </div>
          <div class="revcal-result" data-g2r-result aria-live="polite"></div>
          <div class="revcal-help">L’époque est fixée au 22/09/1792 et les années sextiles suivent la règle de Romme (III, VII, XI, …).</div>
        </div>

        <div class="revcal-panel is-hidden" data-panel="rev2greg">
          <div class="revcal-row revcal-grid">
            <label>
              Jour :
              <input type="number" min="1" max="30" class="revcal-input" data-rev-day placeholder="1..30 (ou 1..5/6 pour Compl.)"/>
            </label>
            <label>
              Mois :
              <input type="text" class="revcal-input" data-rev-month placeholder="Vendémiaire, Brumaire, ... ou 'complémentaires'"/>
            </label>
            <label>
              Année (An) :
              <input type="number" min="1" class="revcal-input" data-rev-year placeholder="ex: 12"/>
            </label>
            <button class="revcal-btn" data-action="r2g">Convertir</button>
          </div>
          <div class="revcal-result" data-r2g-result aria-live="polite"></div>
          <div class="revcal-help">Pour les Jours complémentaires, utilisez “Jours complémentaires” ou “complémentaires” comme mois.</div>
        </div>
      </div>
    `;

    // éléments
    const tabs = container.querySelectorAll(".revcal-tab");
    const panels = container.querySelectorAll(".revcal-panel");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        const target = tab.dataset.tab;
        panels.forEach(p => p.classList.toggle("is-hidden", p.dataset.panel !== target));
      });
    });

    // actions
    const g2rBtn = container.querySelector('[data-action="g2r"]');
    const g2rInput = container.querySelector('[data-greg-date]');
    const g2rOut = container.querySelector('[data-g2r-result]');

    g2rBtn.addEventListener("click", () => {
      if (!g2rInput.value) {
        g2rOut.textContent = "Veuillez choisir une date.";
        return;
      }
      const [yy, mm, dd] = g2rInput.value.split("-").map(n => parseInt(n, 10));
      const res = gregToRev(toUTCDate(yy, (mm - 1), dd));
      if (res.error) {
        g2rOut.textContent = res.error;
      } else {
        g2rOut.textContent = formatRev(res);
      }
    });

    const r2gBtn = container.querySelector('[data-action="r2g"]');
    const rDay = container.querySelector('[data-rev-day]');
    const rMonth = container.querySelector('[data-rev-month]');
    const rYear = container.querySelector('[data-rev-year]');
    const r2gOut = container.querySelector('[data-r2g-result]');

    r2gBtn.addEventListener("click", () => {
      const day = parseInt(rDay.value, 10);
      const year = parseInt(rYear.value, 10);
      let monthIndex = null;

      if (!rMonth.value) {
        r2gOut.textContent = "Veuillez indiquer le mois (ex: Vendémiaire).";
        return;
      }
      const mNorm = normalize(rMonth.value);
      if (mNorm.includes("compl")) {
        monthIndex = 12;
      } else {
        monthIndex = parseMonthInput(rMonth.value);
      }

      if (Number.isNaN(day) || Number.isNaN(year)) {
        r2gOut.textContent = "Jour et année doivent être des nombres.";
        return;
      }
      if (monthIndex === null) {
        r2gOut.textContent = "Mois non reconnu. Essayez (ex) Vendémiaire, Brumaire, ... ou 'complémentaires'.";
        return;
      }

      const res = revToGreg(year, monthIndex, day);
      if (res.error) {
        r2gOut.textContent = res.error;
      } else {
        r2gOut.textContent = formatGregISO(res.y, res.m, res.d);
      }
    });

    // Onglet par défaut (optionnel via data-default-tab)
    const def = container.getAttribute("data-default-tab");
    if (def === "rev2greg") {
      tabs[1].click();
    }
  }

  // Auto-mount
  function initAll() {
    document.querySelectorAll(".revcal-converter:not(.revcal-mounted)").forEach(buildWidget);
  }

  // MediaWiki: attendre le DOM prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();