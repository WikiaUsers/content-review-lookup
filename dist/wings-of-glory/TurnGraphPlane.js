
/*
 * TurnGraphPlane - Fandom / MediaWiki
 *
 * Features:
 * - Full aircraft name lookup using JSON "name" values.
 * - One combined ITR / STR graph.
 * - PCHIP mathematical interpolation.
 * - Dynamic 5-degree Y-axis colour bands.
 * - Live Mach, km/h and knot readout.
 * - Instantaneous and sustained G calculations.
 * - Dynamic red/green value gradients.
 * - Responsive greyscale interface.
 * - Exact X-axis endpoint selection.
 *
 * JSON structure:
 *
 * {
 *   "_info": {
 *     "speedOfSoundKmh": 1238.4
 *   },
 *   "planes": {
 *     "A10A": {
 *       "name": "A-10A Thunderbolt II",
 *       "nation": "USA",
 *       "speed": [],
 *       "ITR": [],
 *       "STR": []
 *     }
 *   }
 * }
 */

(function () {
    "use strict";

    if (window.__turnGraphPlaneBootstrapped) return;
    window.__turnGraphPlaneBootstrapped = true;

    const DATA_PROMISES = new Map();

    const ITR_COLOR = "#00DDFF";
    const STR_COLOR = "#80FFA5";

    const DEFAULT_SPEED_OF_SOUND_KMH = 1238.4;
    const KMH_PER_KNOT = 1.852;
    const GRAVITY = 9.80665;

    const SAMPLES_PER_INTERVAL = 14;

    // ==========================================
    // GRAPH COLOUR BANDS
    // ==========================================

    const TURN_BANDS = [
        "rgba(239, 68, 68, 0.20)",
        "rgba(249, 115, 22, 0.20)",
        "rgba(251, 146, 60, 0.20)",
        "rgba(250, 204, 21, 0.20)",
        "rgba(163, 230, 53, 0.20)",
        "rgba(74, 222, 128, 0.20)",
        "rgba(45, 212, 191, 0.20)",
        "rgba(34, 211, 238, 0.20)",
        "rgba(6, 182, 212, 0.20)"
    ];

    // ==========================================
    // GREYSCALE CSS
    // ==========================================

    const CSS = `
        .tgp {
            --tgp-bg: #252525;
            --tgp-panel: #303030;
            --tgp-card: #3a3a3a;
            --tgp-line: #595959;
            --tgp-text: #f2f2f2;
            --tgp-muted: #c0c0c0;

            color: var(--tgp-text);
            background: var(--tgp-bg);
            border: 1px solid var(--tgp-line);
            border-radius: 12px;
            padding: 16px;
            margin: 16px 0;
            max-width: 100%;
            font: 14px/1.45 system-ui, -apple-system,
                BlinkMacSystemFont, "Segoe UI", sans-serif;
            box-sizing: border-box;
        }

        .tgp * {
            box-sizing: border-box;
        }

        .tgp h2,
        .tgp h3,
        .tgp p {
            margin: 0;
        }

        .tgp h2 {
            font-size: 19px;
            line-height: 1.25;
            margin-bottom: 4px;
        }

        .tgp h3 {
            font-size: 14px;
            line-height: 1.3;
        }

        .tgp .tgp-muted {
            color: var(--tgp-muted);
            font-size: 12px;
        }

        .tgp .tgp-header {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .tgp .tgp-status {
            color: var(--tgp-muted);
            font-size: 12px;
            overflow-wrap: anywhere;
            text-align: right;
        }

        .tgp .tgp-chart-panel {
            min-width: 0;
            background: var(--tgp-panel);
            border: 1px solid var(--tgp-line);
            border-radius: 9px;
            padding: 12px;
        }

        .tgp .tgp-chart-head {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .tgp canvas {
            display: block;
            width: 100%;
            height: 390px;
            touch-action: pan-y;
        }

        .tgp .tgp-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 16px;
            color: #e5e5e5;
            font-size: 12px;
            margin-top: 5px;
        }

        .tgp .tgp-legend span {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .tgp .tgp-swatch {
            display: inline-block;
            width: 18px;
            height: 3px;
            border-radius: 2px;
        }

        .tgp .tgp-section {
            margin-top: 13px;
        }

        .tgp .tgp-section-title {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            justify-content: space-between;
            gap: 8px;
        }

        .tgp .tgp-live-badge {
            display: inline-block;
            color: #e5e5e5;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 20px;
            padding: 4px 8px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .45px;
        }

        .tgp .tgp-current-mach {
            margin: 12px 0 13px;
        }

        .tgp .tgp-mach-value {
            font-size: 32px;
            font-weight: 750;
            line-height: 1.2;
            font-variant-numeric: tabular-nums;
        }

        .tgp .tgp-mach-caption {
            margin-top: 3px;
            color: #bdbdbd;
            font-size: 10px;
            letter-spacing: 1px;
        }

        .tgp .tgp-metrics {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
            margin-top: 8px;
        }

        .tgp .tgp-metric {
            min-width: 0;
            min-height: 88px;
            padding: 11px;
            background: var(--tgp-card);
            border: 1px solid var(--tgp-line);
            border-radius: 8px;
            overflow-wrap: anywhere;
        }

        .tgp .tgp-metric-wide {
            grid-column: 1 / -1;
            min-height: 70px;
        }

        .tgp .tgp-metric-label {
            display: block;
            color: var(--tgp-muted);
            font-size: 12px;
            margin-bottom: 7px;
        }

        .tgp .tgp-primary-value {
            display: block;
            font-size: 22px;
            font-weight: 750;
            line-height: 1.2;
            font-variant-numeric: tabular-nums;
        }

        .tgp .tgp-secondary-value {
            display: block;
            margin-top: 7px;
            color: #e5e5e5;
            font-size: 13px;
            font-weight: 650;
            font-variant-numeric: tabular-nums;
        }

        .tgp .tgp-speed-values {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 16px;
            align-items: baseline;
        }

        .tgp .tgp-speed-values strong {
            font-size: 20px;
            font-weight: 750;
            font-variant-numeric: tabular-nums;
        }

        .tgp .tgp-speed-values span {
            color: var(--tgp-muted);
            font-size: 12px;
        }

        .tgp .tgp-peak-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
            margin-top: 8px;
        }

        .tgp .tgp-peak-card {
            min-width: 0;
            background: var(--tgp-card);
            border: 1px solid var(--tgp-line);
            border-radius: 8px;
            padding: 11px;
            overflow-wrap: anywhere;
        }

        .tgp .tgp-peak-card strong {
            display: block;
            margin-bottom: 5px;
        }

        .tgp .tgp-note {
            color: var(--tgp-muted);
            font-size: 11px;
            margin-top: 10px;
            line-height: 1.5;
        }

        .tgp .tgp-error {
            border: 1px solid #a64b4b;
            background: #3b3030;
            border-radius: 8px;
            color: #ffe2e2;
            padding: 12px;
            overflow-wrap: anywhere;
        }

        .tgp .tgp-error p {
            color: #ffd0d0;
            margin-top: 5px;
        }

        @media (max-width: 600px) {
            .tgp {
                padding: 10px;
            }

            .tgp canvas {
                height: 330px;
            }

            .tgp .tgp-mach-value {
                font-size: 29px;
            }

            .tgp .tgp-primary-value {
                font-size: 19px;
            }

            .tgp .tgp-peak-grid {
                grid-template-columns: 1fr;
            }

            .tgp .tgp-status {
                text-align: left;
            }
        }
    `;

    function addStyles() {
        if (document.getElementById("turngraph-plane-style")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "turngraph-plane-style";
        style.textContent = CSS;

        document.head.appendChild(style);
    }

    // ==========================================
    // FULL NAME NORMALIZATION
    // ==========================================

    function normalizeName(name) {
        return String(name || "")
            .replace(/_/g, " ")
            .replace(/\u00a0/g, " ")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    // IMPORTANT:
    // Searches the JSON "name" VALUE.
    // The JSON object key is deliberately ignored.

    function findPlaneByName(planes, requestedName) {
        const normalizedRequested = normalizeName(requestedName);

        const matchingEntry = Object.entries(planes).find(
            function (entry) {
                const aircraft = entry[1];

                return aircraft &&
                    normalizeName(aircraft.name) === normalizedRequested;
            }
        );

        return matchingEntry ? matchingEntry[1] : null;
    }

    // ==========================================
    // JSON DATABASE
    // ==========================================

    function rawDataUrl(pageTitle) {
        if (!window.mw || !mw.config) {
            throw new Error(
                "MediaWiki configuration is unavailable."
            );
        }

        const scriptPath = mw.config.get("wgScript") || "/index.php";
        const url = new URL(scriptPath, window.location.origin);

        url.searchParams.set("title", pageTitle);
        url.searchParams.set("action", "raw");
        url.searchParams.set("ctype", "application/json");
        url.searchParams.set("turngraph_plane_cache", String(Date.now()));

        return url.href;
    }

    function fetchData(pageTitle) {
        if (!DATA_PROMISES.has(pageTitle)) {
            const promise = fetch(rawDataUrl(pageTitle), {
                credentials: "same-origin",
                cache: "no-store"
            })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Data page returned HTTP " + response.status + "."
                    );
                }

                return response.text();
            })
            .then(function (text) {
                let parsed;

                try {
                    parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
                } catch (error) {
                    throw new Error(
                        "The data page is not valid raw JSON. It must contain only the JSON object."
                    );
                }

                return normalizeData(parsed);
            });

            DATA_PROMISES.set(pageTitle, promise);
        }

        return DATA_PROMISES.get(pageTitle);
    }

    function normalizeData(raw) {
        if (
            !raw ||
            typeof raw !== "object" ||
            !raw.planes ||
            typeof raw.planes !== "object"
        ) {
            throw new Error(
                'Expected a JSON object with a top-level "planes" property.'
            );
        }

        Object.entries(raw.planes).forEach(function (entry) {
            const aircraft = entry[1];

            if (
                !aircraft ||
                typeof aircraft.name !== "string" ||
                !aircraft.name.trim()
            ) {
                throw new Error(
                    'An aircraft entry is missing its "name" value.'
                );
            }

            if (
                !Array.isArray(aircraft.speed) ||
                !Array.isArray(aircraft.ITR) ||
                !Array.isArray(aircraft.STR)
            ) {
                throw new Error(
                    'Aircraft "' + aircraft.name +
                    '" must contain speed, ITR and STR arrays.'
                );
            }

            const speed = aircraft.speed;
            const itr = aircraft.ITR;
            const str = aircraft.STR;

            const validLengths =
                speed.length >= 2 &&
                speed.length === itr.length &&
                speed.length === str.length;

            const validValues = [speed, itr, str].every(
                function (array) {
                    return array.every(function (value) {
                        return (
                            typeof value === "number" &&
                            Number.isFinite(value) &&
                            value >= 0
                        );
                    });
                }
            );

            const ascending = speed.every(
                function (value, index) {
                    return index === 0 || value > speed[index - 1];
                }
            );

            if (!validLengths) {
                throw new Error(
                    'Aircraft "' + aircraft.name +
                    '": speed, ITR and STR must have equal lengths (at least two points).'
                );
            }

            if (!validValues) {
                throw new Error(
                    'Aircraft "' + aircraft.name +
                    '": all measurements must be non-negative JSON numbers.'
                );
            }

            if (!ascending) {
                throw new Error(
                    'Aircraft "' + aircraft.name +
                    '": Mach values must be strictly increasing.'
                );
            }
        });

        const info = raw._info || {};
        const configuredSpeed = Number(info.speedOfSoundKmh);

        return {
            planes: raw.planes,
            info: info,

            speedOfSoundKmh:
                Number.isFinite(configuredSpeed) && configuredSpeed > 0
                    ? configuredSpeed
                    : DEFAULT_SPEED_OF_SOUND_KMH
        };
    }

    // ==========================================
    // PCHIP INTERPOLATION
    // Shape-preserving cubic interpolation
    // ==========================================

    function makePchip(xs, ys) {
        const n = xs.length;

        const h = [];
        const slopes = [];
        const derivatives = [];

        for (let i = 0; i < n - 1; i++) {
            h[i] = xs[i + 1] - xs[i];
            slopes[i] = (ys[i + 1] - ys[i]) / h[i];
        }

        function endpointDerivative(h1, h2, m1, m2) {
            let value =
                ((2 * h1 + h2) * m1 - h1 * m2) /
                (h1 + h2);

            if (Math.sign(value) !== Math.sign(m1)) {
                return 0;
            }

            if (
                Math.sign(m1) !== Math.sign(m2) &&
                Math.abs(value) > Math.abs(3 * m1)
            ) {
                value = 3 * m1;
            }

            return value;
        }

        if (n === 2) {
            derivatives[0] = slopes[0];
            derivatives[1] = slopes[0];
        } else {
            derivatives[0] = endpointDerivative(
                h[0], h[1], slopes[0], slopes[1]
            );

            derivatives[n - 1] = endpointDerivative(
                h[n - 2],
                h[n - 3],
                slopes[n - 2],
                slopes[n - 3]
            );
        }

        for (let i = 1; i < n - 1; i++) {
            if (
                slopes[i - 1] === 0 ||
                slopes[i] === 0 ||
                Math.sign(slopes[i - 1]) !== Math.sign(slopes[i])
            ) {
                derivatives[i] = 0;
            } else {
                const w1 = 2 * h[i] + h[i - 1];
                const w2 = h[i] + 2 * h[i - 1];

                derivatives[i] =
                    (w1 + w2) /
                    (w1 / slopes[i - 1] + w2 / slopes[i]);
            }
        }

        function valueAt(x) {
            if (x <= xs[0]) return ys[0];
            if (x >= xs[n - 1]) return ys[n - 1];

            let low = 0;
            let high = n - 1;

            while (high - low > 1) {
                const middle = Math.floor((low + high) / 2);

                if (xs[middle] <= x) {
                    low = middle;
                } else {
                    high = middle;
                }
            }

            const i = low;
            const t = (x - xs[i]) / h[i];

            const t2 = t * t;
            const t3 = t2 * t;

            const h00 = 2 * t3 - 3 * t2 + 1;
            const h10 = t3 - 2 * t2 + t;
            const h01 = -2 * t3 + 3 * t2;
            const h11 = t3 - t2;

            const value =
                h00 * ys[i] +
                h10 * h[i] * derivatives[i] +
                h01 * ys[i + 1] +
                h11 * h[i] * derivatives[i + 1];

            // Prevent overshooting between measured points.
            return Math.max(
                Math.min(ys[i], ys[i + 1]),
                Math.min(Math.max(ys[i], ys[i + 1]), value)
            );
        }

        function samplePoints(subdivisions) {
            const points = [];

            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < subdivisions; j++) {
                    const x =
                        xs[i] + h[i] * j / subdivisions;

                    points.push({
                        x: x,
                        y: valueAt(x)
                    });
                }
            }

            points.push({
                x: xs[n - 1],
                y: ys[n - 1]
            });

            return points;
        }

        return {
            valueAt: valueAt,
            samplePoints: samplePoints
        };
    }

    // ==========================================
    // G-FORCE CALCULATIONS
    // ==========================================

    function calculateG(mach, turnRate, speedOfSoundKmh) {
        const velocityMs =
            mach * speedOfSoundKmh / 3.6;

        const angularVelocity =
            turnRate * Math.PI / 180;

        return Math.sqrt(
            1 + Math.pow(
                velocityMs * angularVelocity / GRAVITY,
                2
            )
        );
    }

    // ==========================================
    // DYNAMIC VALUE COLOURS
    // ==========================================

    function hexToRgb(hex) {
        const value = hex.replace("#", "");

        return {
            r: parseInt(value.slice(0, 2), 16),
            g: parseInt(value.slice(2, 4), 16),
            b: parseInt(value.slice(4, 6), 16)
        };
    }

    function blendColor(from, to, amount) {
        const a = hexToRgb(from);
        const b = hexToRgb(to);

        const t = Math.max(0, Math.min(1, amount));

        function channel(x, y) {
            return Math.round(x + (y - x) * t);
        }

        return "rgb(" +
            channel(a.r, b.r) + ", " +
            channel(a.g, b.g) + ", " +
            channel(a.b, b.b) + ")";
    }

    function normalized(value, min, max) {
        if (!Number.isFinite(value) || max <= min) {
            return 0.5;
        }

        return Math.max(
            0,
            Math.min(1, (value - min) / (max - min))
        );
    }

    // ==========================================
    // DYNAMIC Y-AXIS
    // Based ONLY on maximum ITR.
    // ==========================================

    function calculateYAxisMaximum(itr) {
        const peak = Math.max.apply(null, itr);

        // 34°/s -> 35 maximum
        // 35°/s -> 35 maximum
        // 36°/s -> 40 maximum
        // 42°/s -> 45 maximum

        return Math.max(
            5,
            Math.ceil(peak / 5) * 5
        );
    }

    // ==========================================
    // PEAK CALCULATIONS
    // ==========================================

    function peakFor(plane, fieldName) {
        const maximum = Math.max.apply(
            null,
            plane[fieldName]
        );

        const indexes = [];

        plane[fieldName].forEach(function (value, index) {
            if (value === maximum) {
                indexes.push(index);
            }
        });

        return {
            value: maximum,
            minMach: plane.speed[indexes[0]],
            maxMach: plane.speed[indexes[indexes.length - 1]]
        };
    }

    function peakMachText(peak) {
        return peak.minMach === peak.maxMach
            ? peak.minMach.toFixed(2)
            : peak.minMach.toFixed(2) +
              "–" +
              peak.maxMach.toFixed(2);
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;

        if (text !== undefined && text !== null) {
            node.textContent = String(text);
        }

        return node;
    }

    // ==========================================
    // BUILD THE GRAPH
    // ==========================================

    function buildApp(root, data, planeName) {

        // IMPORTANT:
        // Match the page title to the JSON "name" VALUE.
        // The JSON object key is not used.

        const plane = findPlaneByName(
            data.planes,
            planeName
        );

        if (!plane) {
            throw new Error(
                'No aircraft with name "' +
                planeName +
                '" was found in the JSON database.'
            );
        }

        const speed = plane.speed;
        const itr = plane.ITR;
        const str = plane.STR;

        const soundSpeed = data.speedOfSoundKmh;

        const itrCurve = makePchip(speed, itr);
        const strCurve = makePchip(speed, str);

        // Y-axis maximum depends only on ITR.
        const yMax = calculateYAxisMaximum(itr);

        const maxSTR = Math.max.apply(null, str);

        // Turn-rate gradient: lower red, higher green.
        const rateValues = itr.concat(str);

        const rateMin = Math.min.apply(null, rateValues);
        const rateMax = Math.max.apply(null, rateValues);

        // G gradient: lower green, higher red.
        const gValues = [];

        speed.forEach(function (mach, index) {
            gValues.push(
                calculateG(mach, itr[index], soundSpeed)
            );

            gValues.push(
                calculateG(mach, str[index], soundSpeed)
            );
        });

        const gMin = Math.min.apply(null, gValues);
        const gMax = Math.max.apply(null, gValues);

        // ======================================
        // INTERFACE
        // ======================================

        root.replaceChildren();
        root.classList.add("tgp");

        root.innerHTML = `
            <div class="tgp-header">
                <div>
                    <h2 data-role="title"></h2>
                    <p class="tgp-muted">
                        Instantaneous and sustained turn performance · Mach vs turn rate
                    </p>
                </div>

                <div class="tgp-status"
                     data-role="status"
                     role="status"></div>
            </div>

            <section class="tgp-chart-panel">

                <div class="tgp-chart-head">
                    <h3>Turn rate performance</h3>
                    <span class="tgp-muted">°/s vs Mach</span>
                </div>

                <canvas
                    data-role="chart"
                    role="img"
                    aria-label="Aircraft instantaneous and sustained turn rate versus Mach"
                ></canvas>

                <div class="tgp-legend">
                    <span>
                        <i class="tgp-swatch"
                           style="background:${ITR_COLOR}"></i>
                        Instantaneous turn rate (ITR)
                    </span>

                    <span>
                        <i class="tgp-swatch"
                           style="background:${STR_COLOR}"></i>
                        Sustained turn rate (STR)
                    </span>
                </div>

            </section>

            <section class="tgp-section">

                <div class="tgp-section-title">
                    <h3>Aircraft performance</h3>
                </div>

                <div class="tgp-current-mach">

                    <div class="tgp-mach-value"
                         data-field="mach">--</div>

                    <div class="tgp-mach-caption">
                        SELECTED MACH NUMBER
                    </div>

                </div>

                <div class="tgp-metrics">

                    <div class="tgp-metric tgp-metric-wide">
                        <span class="tgp-metric-label">Speed</span>

                        <div class="tgp-speed-values">
                            <strong data-field="speed-kmh">--</strong>
                            <span data-field="speed-knots">--</span>
                        </div>
                    </div>

                    <div class="tgp-metric">
                        <span class="tgp-metric-label">
                            Instantaneous turn (ITR)
                        </span>

                        <strong class="tgp-primary-value"
                                data-field="itr">--</strong>

                        <span class="tgp-secondary-value"
                              data-field="instant-g">
                            Instantaneous G: --
                        </span>
                    </div>

                    <div class="tgp-metric">
                        <span class="tgp-metric-label">
                            Sustained turn (STR)
                        </span>

                        <strong class="tgp-primary-value"
                                data-field="str">--</strong>

                        <span class="tgp-secondary-value"
                              data-field="sustained-g">
                            Sustained G: --
                        </span>
                    </div>

                </div>

            </section>

            <section class="tgp-section">

                <h3>Recorded turning peaks</h3>

                <div class="tgp-peak-grid"
                     data-role="peaks"></div>

            </section>

            <p class="tgp-note" data-role="note"></p>
        `;

        const query = function (selector) {
            return root.querySelector(selector);
        };

        const canvas = query('[data-role="chart"]');
        const ctx = canvas.getContext("2d");

        const field = function (name) {
            return query('[data-field="' + name + '"]');
        };

        const chartState = {
            plot: null,
            selectedMach: speed[0],
            pointerInside: false
        };

        query('[data-role="title"]').textContent =
            "Turn Rate of " + plane.name + " (Clean)";

        query('[data-role="status"]').textContent =
            speed.length +
            " sampled points · Y-axis: 0–" +
            yMax +
            "°/s";

        // ======================================
        // LIVE PERFORMANCE PANEL
        // ======================================

        function updateReadout(mach) {
            const minMach = speed[0];
            const maxMach = speed[speed.length - 1];

            // Snap to exact endpoints.
            const endpointTolerance = 1e-7;

            if (Math.abs(mach - minMach) <= endpointTolerance) {
                mach = minMach;
            }

            if (Math.abs(mach - maxMach) <= endpointTolerance) {
                mach = maxMach;
            }

            mach = Math.max(
                minMach,
                Math.min(maxMach, mach)
            );

            chartState.selectedMach = mach;

            const currentITR = itrCurve.valueAt(mach);
            const currentSTR = strCurve.valueAt(mach);

            const instantG = calculateG(
                mach,
                currentITR,
                soundSpeed
            );

            const sustainedG = calculateG(
                mach,
                currentSTR,
                soundSpeed
            );

            const kmh = mach * soundSpeed;
            const knots = kmh / KMH_PER_KNOT;

            field("mach").textContent =
                mach.toFixed(3) + " M";

            field("speed-kmh").textContent =
                kmh.toFixed(1) + " km/h";

            field("speed-knots").textContent =
                knots.toFixed(1) + " knots";

            // Turn rate: red at low values, green at high values.

            field("itr").textContent =
                currentITR.toFixed(2) + " °/s";

            field("itr").style.color = blendColor(
                "#EF4444",
                "#22C55E",
                normalized(currentITR, rateMin, rateMax)
            );

            field("str").textContent =
                currentSTR.toFixed(2) + " °/s";

            field("str").style.color = blendColor(
                "#EF4444",
                "#22C55E",
                normalized(currentSTR, rateMin, rateMax)
            );

            // G: green at low values, red at high values.

            field("instant-g").textContent =
                "Instantaneous G: " +
                instantG.toFixed(2) + " G";

            field("instant-g").style.color = blendColor(
                "#22C55E",
                "#EF4444",
                normalized(instantG, gMin, gMax)
            );

            field("sustained-g").textContent =
                "Sustained G: " +
                sustainedG.toFixed(2) + " G";

            field("sustained-g").style.color = blendColor(
                "#22C55E",
                "#EF4444",
                normalized(sustainedG, gMin, gMax)
            );
        }

        // ======================================
        // GRAPH LINE DRAWING
        // ======================================

        function drawSmoothLine(points) {
            if (!points.length) return;

            ctx.moveTo(
                points[0].x,
                points[0].y
            );

            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(
                    points[i].x,
                    points[i].y
                );
            }
        }

        function drawCurve(
            points,
            color,
            alphaTop,
            plotBottom
        ) {
            if (!points.length) return;

            // Gradient fill beneath curve.

            ctx.beginPath();

            drawSmoothLine(points);

            ctx.lineTo(
                points[points.length - 1].x,
                plotBottom
            );

            ctx.lineTo(
                points[0].x,
                plotBottom
            );

            ctx.closePath();

            const gradient = ctx.createLinearGradient(
                0, 0, 0, plotBottom
            );

            if (color === ITR_COLOR) {
                gradient.addColorStop(
                    0,
                    "rgba(0, 221, 255, " + alphaTop + ")"
                );

                gradient.addColorStop(
                    1,
                    "rgba(0, 221, 255, 0.005)"
                );
            } else {
                gradient.addColorStop(
                    0,
                    "rgba(128, 255, 165, " + alphaTop + ")"
                );

                gradient.addColorStop(
                    1,
                    "rgba(128, 255, 165, 0.005)"
                );
            }

            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw curve.

            ctx.beginPath();

            drawSmoothLine(points);

            ctx.strokeStyle = color;
            ctx.lineWidth = 2.8;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";

            ctx.shadowColor =
                color === ITR_COLOR
                    ? "rgba(0, 221, 255, 0.40)"
                    : "rgba(128, 255, 165, 0.35)";

            ctx.shadowBlur = 7;

            ctx.stroke();

            ctx.shadowBlur = 0;
        }

        // ======================================
        // GRAPH RENDERER
        // ======================================

        function drawChart() {
            const width = canvas.clientWidth || 600;
            const height = canvas.clientHeight || 390;

            const dpr = Math.max(
                1,
                window.devicePixelRatio || 1
            );

            const pixelWidth = Math.round(width * dpr);
            const pixelHeight = Math.round(height * dpr);

            if (
                canvas.width !== pixelWidth ||
                canvas.height !== pixelHeight
            ) {
                canvas.width = pixelWidth;
                canvas.height = pixelHeight;
            }

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const left = 52;
            const right = width - 14;
            const top = 14;
            const bottom = height - 43;

            const xMin = speed[0];
            const xMax = speed[speed.length - 1];
            const xSpan = xMax - xMin;

            const xPos = function (x) {
                return left +
                    (x - xMin) / xSpan * (right - left);
            };

            const yPos = function (y) {
                return bottom -
                    (y / yMax) * (bottom - top);
            };

            // ==================================
            // DYNAMIC COLOUR BANDS
            // ==================================

            for (let band = 0; band < yMax / 5; band++) {
                const lower = band * 5;
                const upper = lower + 5;

                ctx.fillStyle = TURN_BANDS[
                    Math.min(band, TURN_BANDS.length - 1)
                ];

                ctx.fillRect(
                    left,
                    yPos(upper),
                    right - left,
                    yPos(lower) - yPos(upper)
                );
            }

            // ==================================
            // Y AXIS AND GRID
            // ==================================

            ctx.font = "11px system-ui, sans-serif";
            ctx.lineWidth = 1;

            ctx.strokeStyle = "rgba(225, 225, 225, 0.24)";
            ctx.fillStyle = "#e0e0e0";

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";

            for (let value = 0; value <= yMax; value += 5) {
                const y = yPos(value);

                ctx.beginPath();
                ctx.moveTo(left, y);
                ctx.lineTo(right, y);
                ctx.stroke();

                ctx.fillText(
                    String(value),
                    left - 8,
                    y
                );
            }

            // ==================================
            // X AXIS
            // ==================================

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            for (let i = 0; i <= 5; i++) {
                const mach =
                    xMin + xSpan * i / 5;

                const x = xPos(mach);

                ctx.beginPath();
                ctx.moveTo(x, top);
                ctx.lineTo(x, bottom);
                ctx.stroke();

                ctx.fillText(
                    mach.toFixed(2),
                    x,
                    bottom + 7
                );
            }

            // ==================================
            // AXIS TITLES
            // ==================================

            ctx.save();

            ctx.translate(13, (top + bottom) / 2);
            ctx.rotate(-Math.PI / 2);

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#f0f0f0";
            ctx.font = "12px system-ui, sans-serif";

            ctx.fillText("Turn Rate (°/s)", 0, 0);

            ctx.restore();

            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = "#f0f0f0";
            ctx.font = "12px system-ui, sans-serif";

            ctx.fillText(
                "Speed (Mach)",
                (left + right) / 2,
                height - 2
            );

            // ==================================
            // INTERPOLATED DATA
            // ==================================

            const itrPoints = itrCurve
                .samplePoints(SAMPLES_PER_INTERVAL)
                .map(function (point) {
                    return {
                        x: xPos(point.x),
                        y: yPos(point.y)
                    };
                });

            const strPoints = strCurve
                .samplePoints(SAMPLES_PER_INTERVAL)
                .map(function (point) {
                    return {
                        x: xPos(point.x),
                        y: yPos(point.y)
                    };
                });

            // ITR: cyan.
            drawCurve(
                itrPoints,
                ITR_COLOR,
                0.25,
                bottom
            );

            // STR: green.
            drawCurve(
                strPoints,
                STR_COLOR,
                0.16,
                bottom
            );

            // ==================================
            // LIVE CURSOR
            // ==================================

            if (
                chartState.pointerInside &&
                Number.isFinite(chartState.selectedMach)
            ) {
                const x = xPos(
                    chartState.selectedMach
                );

                // Vertical cursor guide.

                ctx.save();

                ctx.strokeStyle = "rgba(255, 255, 255, 0.88)";
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);

                ctx.beginPath();
                ctx.moveTo(x, top);
                ctx.lineTo(x, bottom);
                ctx.stroke();

                ctx.restore();

                // ITR and STR markers.

                [
                    {
                        value: itrCurve.valueAt(
                            chartState.selectedMach
                        ),
                        color: ITR_COLOR
                    },
                    {
                        value: strCurve.valueAt(
                            chartState.selectedMach
                        ),
                        color: STR_COLOR
                    }
                ].forEach(function (item) {
                    // STR higher than the ITR-based axis maximum
                    // is intentionally outside the visible graph.

                    if (item.value < 0 || item.value > yMax) {
                        return;
                    }

                    ctx.beginPath();

                    ctx.arc(
                        x,
                        yPos(item.value),
                        4.2,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle = item.color;
                    ctx.fill();

                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = "#ffffff";
                    ctx.stroke();
                });
            }

            chartState.plot = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
                xMin: xMin,
                xMax: xMax
            };
        }

        // ======================================
        // POINTER AND ENDPOINT HANDLING
        // ======================================

        function selectFromPointer(event) {
            const plot = chartState.plot;

            if (!plot) return;

            const rect = canvas.getBoundingClientRect();

            const pointerX =
                event.clientX - rect.left;

            const pointerY =
                event.clientY - rect.top;

            // Only require the cursor to be vertically
            // within the plotting area.

            if (
                pointerY < plot.top ||
                pointerY > plot.bottom + 30
            ) {
                return;
            }

            // Clamp X to the actual plot boundaries.
            // This prevents 1.199 being displayed at 1.200.

            const clampedX = Math.max(
                plot.left,
                Math.min(plot.right, pointerX)
            );

            const fraction =
                (clampedX - plot.left) /
                (plot.right - plot.left);

            let mach =
                plot.xMin +
                fraction * (plot.xMax - plot.xMin);

            // Exact endpoint selection.

            if (pointerX <= plot.left) {
                mach = plot.xMin;
            }

            if (pointerX >= plot.right) {
                mach = plot.xMax;
            }

            // Explicitly preserve the original endpoint value.
            // Do not round the value before interpolation.

            mach = Math.max(
                plot.xMin,
                Math.min(plot.xMax, mach)
            );

            if (clampedX === plot.right) {
                mach = speed[speed.length - 1];
            }

            if (clampedX === plot.left) {
                mach = speed[0];
            }

            chartState.pointerInside = true;

            updateReadout(mach);
            drawChart();
        }

        canvas.addEventListener(
            "pointermove",
            selectFromPointer
        );

        canvas.addEventListener(
            "pointerdown",
            selectFromPointer
        );

        canvas.addEventListener(
            "pointerleave",
            function () {
                chartState.pointerInside = false;
                drawChart();

                // Keep the last selected performance values.
            }
        );

        // ======================================
        // RECORDED PEAKS
        // ======================================

        const peaks = query('[data-role="peaks"]');

        const peakITR = peakFor(plane, "ITR");
        const peakSTR = peakFor(plane, "STR");

        const itrCard = element(
            "div",
            "tgp-peak-card"
        );

        itrCard.appendChild(
            element(
                "strong",
                "",
                "Peak instantaneous turn rate"
            )
        );

        itrCard.appendChild(
            element(
                "div",
                "",
                peakITR.value.toFixed(2) + " °/s"
            )
        );

        itrCard.appendChild(
            element(
                "div",
                "tgp-muted",
                "Mach " + peakMachText(peakITR)
            )
        );

        const strCard = element(
            "div",
            "tgp-peak-card"
        );

        strCard.appendChild(
            element(
                "strong",
                "",
                "Peak sustained turn rate"
            )
        );

        strCard.appendChild(
            element(
                "div",
                "",
                peakSTR.value.toFixed(2) + " °/s"
            )
        );

        strCard.appendChild(
            element(
                "div",
                "tgp-muted",
                "Mach " + peakMachText(peakSTR)
            )
        );

        peaks.append(itrCard, strCard);

        // ======================================
        // INFORMATION FOOTNOTE
        // ======================================

        let note =
            speed.length +
            " original data points · " +
            (data.info.altitude || "altitude unspecified") +
            " · " +
            (data.info.loadout || "loadout unspecified") +
            ". The displayed curve uses shape-preserving PCHIP interpolation; original measurements are unchanged.";

        if (maxSTR > yMax) {
            note +=
                " Warning: STR exceeds the ITR-based Y-axis maximum and will be clipped.";
        }

        note +=
            " Speed uses " +
            soundSpeed.toFixed(1) +
            " km/h per Mach. Knots use 1 knot = 1.852 km/h. " +
            "G values are calculated coordinated-turn load factors, not structural G limits.";

        query('[data-role="note"]').textContent = note;

        // Initial readout and graph.

        updateReadout(speed[0]);
        drawChart();

        // Responsive resizing.

        if (window.ResizeObserver) {
            const observer = new ResizeObserver(function () {
                drawChart();
            });

            observer.observe(canvas);

            root.__turnGraphPlaneObserver = observer;
        } else {
            const resizeHandler = function () {
                drawChart();
            };

            window.addEventListener(
                "resize",
                resizeHandler
            );

            root.__turnGraphPlaneResizeHandler = resizeHandler;
        }
    }

    // ==========================================
    // ERROR HANDLING
    // ==========================================

    function showError(root, error) {
        root.replaceChildren();
        root.classList.add("tgp");

        const box = element(
            "div",
            "tgp-error"
        );

        box.appendChild(
            element(
                "strong",
                "",
                "TurnGraphPlane could not load."
            )
        );

        box.appendChild(
            element(
                "p",
                "",
                error && error.message
                    ? error.message
                    : String(error)
            )
        );

        box.appendChild(
            element(
                "p",
                "",
                'Check that the page title matches an aircraft "name" value in the JSON database and that the JSON page is accessible.'
            )
        );

        root.appendChild(box);
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function initialize(root) {
        if (root.dataset.turnGraphPlaneInitialized === "yes") {
            return;
        }

        root.dataset.turnGraphPlaneInitialized = "yes";

        const planeName =
            root.getAttribute("data-plane");

        const pageTitle =
            root.getAttribute("data-data-page") ||
            "TurnGraphData.json";

        if (!planeName) {
            showError(
                root,
                new Error("No aircraft page name was supplied.")
            );

            return;
        }

        fetchData(pageTitle)
            .then(function (data) {
                buildApp(root, data, planeName);
            })
            .catch(function (error) {
                showError(root, error);
            });
    }

    // ==========================================
    // PAGE SCANNER
    // ==========================================

    function boot(contentRoot) {
        addStyles();

        const scope = contentRoot || document;
        const roots = [];

        if (
            scope.nodeType === 1 &&
            scope.matches &&
            scope.matches(".turn-graph-plane")
        ) {
            roots.push(scope);
        }

        if (scope.querySelectorAll) {
            Array.prototype.forEach.call(
                scope.querySelectorAll(".turn-graph-plane"),
                function (root) {
                    roots.push(root);
                }
            );
        }

        roots.forEach(initialize);
    }

    // Initial page load.

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            function () {
                boot(document);
            }
        );
    } else {
        boot(document);
    }

    // Dynamically loaded MediaWiki content.

    if (window.mw && mw.hook) {
        mw.hook("wikipage.content").add(function ($content) {
            boot(
                $content && $content[0]
                    ? $content[0]
                    : $content
            );
        });
    }

})();