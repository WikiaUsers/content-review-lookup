$(function () {
    const ROOT_ID = 'theme-effects-controls';
    // Load saved preferences and fill in defaults for new or missing settings.
    function readSettings(key, effects) {
        const settings = { enabled: true, frequency: 3 };
        effects.forEach(({ id }) => { settings[id] = true; });
        try {
            const saved = JSON.parse(localStorage.getItem(key));
            if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
                if (typeof saved.enabled === 'boolean') settings.enabled = saved.enabled;
                if (Number.isInteger(saved.frequency) && saved.frequency >= 1 && saved.frequency <= 5) settings.frequency = saved.frequency;
                effects.forEach(({ id }) => { if (typeof saved[id] === 'boolean') settings[id] = saved[id]; });
            }
        } catch (error) {
            console.warn('Unable to read effect preferences.', error);
        }
        return settings;
    }
    function copySettings(settings) {
        const copy = {};
        Object.keys(settings).forEach((key) => { copy[key] = settings[key]; });
        return copy;
    }
    // Build the panel, persist user changes, and notify the effect script.
    function create(config) {
        if (!config || typeof config.key !== 'string' || !config.key ||
            !Array.isArray(config.effects) || config.effects.length < 1 || config.effects.length > 5) {
            throw new TypeError('The panel requires a key and 1 to 5 effects.');
        }
        const ids = new Set();
        const effects = config.effects.map(({ id, label }) => {
            if (!/^[a-z][a-z0-9-]*$/i.test(id) || ['enabled', 'frequency'].includes(id) ||
                typeof label !== 'string' || !label.trim() || ids.has(id)) {
                throw new TypeError('Each effect must have a valid, unique ID and label.');
            }
            ids.add(id);
            return { id, label };
        });
        const settings = readSettings(config.key, effects);
        const panelId = `${ROOT_ID}-${config.key.replace(/[^a-z0-9_-]/gi, '-')}`;
        const createPanel = () => {
            const existingPanel = document.getElementById(panelId);
            if (existingPanel) existingPanel.remove();
            const panel = document.createElement('section');
            panel.id = panelId;
            panel.className = 'theme-effects-controls';
            panel.setAttribute('aria-label', `${config.title || 'Effects'} settings`);
            panel.innerHTML = `<div class="tec-content" hidden><h2></h2>
            <label class="tec-master"><input type="checkbox" data-setting="enabled"><span>Enable animations</span></label>
            <label class="tec-frequency"><span>Effect frequency</span><input type="range" min="1" max="5" step="1">
                <span class="tec-scale"><span>Rare</span><span>Frequent</span></span></label>
            <fieldset><legend>Visible effects</legend><div class="tec-effects"></div></fieldset></div>
            <button class="tec-toggle" type="button" aria-expanded="false"></button>`;
            panel.querySelector('h2').textContent = config.title || 'Effects';
            panel.querySelector('.tec-toggle').textContent = `Settings ${config.title || ''}`.trim();
            const rows = panel.querySelector('.tec-effects');
            effects.forEach(({ id, label }) => {
                const row = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.dataset.setting = id;
                const text = document.createElement('span');
                text.textContent = label;
                row.append(input, text);
                rows.appendChild(row);
            });
            document.body.appendChild(panel);
            const persist = (change) => {
                try {
                    localStorage.setItem(config.key, JSON.stringify(settings));
                } catch (error) {
                    console.warn('Unable to save effect preferences.', error);
                }
                if (typeof config.onChange === 'function') config.onChange(copySettings(settings), change);
            };
            panel.querySelectorAll('[data-setting]').forEach((input) => {
                input.checked = settings[input.dataset.setting];
                input.addEventListener('change', () => {
                    const key = input.dataset.setting;
                    settings[key] = input.checked;
                    persist(key);
                });
            });
            const frequency = panel.querySelector('input[type="range"]');
            frequency.value = settings.frequency;
            frequency.addEventListener('input', () => {
                settings.frequency = Number(frequency.value);
                persist('frequency');
            });
            const content = panel.querySelector('.tec-content');
            const toggle = panel.querySelector('.tec-toggle');
            toggle.addEventListener('click', () => {
                const expanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', String(!expanded));
                content.hidden = expanded;
            });
        };
        const hasTheme = () => !config.themeClass || document.body.classList.contains(config.themeClass);
        if (hasTheme()) {
            createPanel();
        } else {
            document.getElementById(panelId)?.remove();
        }
        if (config.themeClass) {
            new MutationObserver(() => {
                if (hasTheme()) {
                    if (!document.getElementById(panelId)) createPanel();
                } else {
                    document.getElementById(panelId)?.remove();
                }
            }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
        if (typeof config.onChange === 'function') config.onChange(copySettings(settings), 'initial');
        return copySettings(settings);
    }
    window.ThemeEffectsControls = { create };
    // Let theme scripts that loaded first know the controls API is ready.
    window.dispatchEvent(new Event('theme-effects-controls-ready'));
});