(function () {
  if (typeof mw === 'undefined' || !mw.config) return;

  const href0 = String(location.href || '');
  if (!/Special:WikiConfig/i.test(href0) || !/\/close\b/i.test(href0)) return;

  const wikiId = (function () {
    const href = String(location.href || '');
    let m = href.match(/Special:WikiConfig\/(\d+)\/close/i);
    if (m) return m[1];
    m = href.match(/Special:WikiConfig\/(\d+)/i);
    if (m) return m[1];
    m = href.match(/[?&]wiki_id=(\d+)/i);
    if (m) return m[1];
    return null;
  })();
  if (!wikiId) return;

  const COMMUNITY_API_BASE = 'https://community.fandom.com';
  const MPV_THRESHOLD = 50000;
  const ACTIVE_USERS_THRESHOLD = 5;
  const JSONP_TIMEOUT_MS = 9000;

  const mpvCache = new Map();
  const detailsCache = new Map();
  const siteinfoCache = new Map();

  let panelState = {
    wikiId: String(wikiId),
    mpv: undefined,
    articles: undefined,
    activeusers: undefined,
    admins: undefined,
    restricted: null,
    reasonsKey: '',
    loadedOnce: false
  };

  let panelEl = null;
  let closeRootEl = null;
  let stylesAdded = false;
  let raf = null;
  let booted = false;
  let lastHref = location.href;

  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"'`=\/]/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      '/': '&#x2F;', '=': '&#x3D;', '`': '&#x60;'
    })[c]);
  }

  function normalizeMpvNumber(v) {
    if (v === null || v === undefined) return NaN;
    if (typeof v === 'number') return v;
    const n = parseInt(String(v).replace(/[^\d]/g, ''), 10);
    return isNaN(n) ? NaN : n;
  }

  function fetchJson(url, opts) {
    return fetch(url, Object.assign({ credentials: 'include' }, opts || {}))
      .then(res => {
        if (!res.ok) return { error: `HTTP ${res.status}` };
        return res.json().then(data => ({ data })).catch(e => ({ error: (e && e.message) ? e.message : String(e) }));
      })
      .catch(e => ({ error: (e && e.message) ? e.message : String(e) }));
  }

  function jsonpFetch(url, cbName, timeoutMs) {
    return new Promise((resolve, reject) => {
      let timer = null;
      const script = document.createElement('script');

      window[cbName] = function (payload) {
        clearTimeout(timer);
        try { delete window[cbName]; } catch (e) {}
        try { script.parentNode && script.parentNode.removeChild(script); } catch (e) {}
        resolve({ data: payload });
      };

      script.src = url;
      script.async = true;

      script.onerror = function () {
        clearTimeout(timer);
        try { delete window[cbName]; } catch (e) {}
        try { script.parentNode && script.parentNode.removeChild(script); } catch (e) {}
        reject(new Error('script error (blocked/CSP/network)'));
      };

      timer = setTimeout(function () {
        try { delete window[cbName]; } catch (e) {}
        try { script.parentNode && script.parentNode.removeChild(script); } catch (e) {}
        reject(new Error('timeout'));
      }, timeoutMs);

      document.head.appendChild(script);
    });
  }

  function originFromCandidate(candidate) {
    if (!candidate) return null;
    try { return (new URL(candidate)).origin; }
    catch (e) {
      const m = (candidate || '').match(/^(https?:\/\/[^\/]+)/i);
      return m ? m[1] : null;
    }
  }

  function getLangPrefixFromWikiUrl(wikiUrl) {
    if (!wikiUrl) return '';
    try {
      const u = new URL(wikiUrl);
      const parts = (u.pathname || '/').split('/').filter(Boolean);
      const first = parts[0] || '';
      if (/^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i.test(first)) return '/' + first;
      return '';
    } catch (e) {
      return '';
    }
  }

  function joinPath(a, b) {
    const aa = (a || '').replace(/\/+$/, '');
    const bb = (b || '').replace(/^\/+/, '');
    return aa + '/' + bb;
  }

  function buildWikiUrl(wikiUrl, suffixPath) {
    const origin = originFromCandidate(wikiUrl);
    if (!origin) return null;
    const langPrefix = getLangPrefixFromWikiUrl(wikiUrl);
    return joinPath(origin + langPrefix, suffixPath);
  }

  function getAckKey(id) { return 'wcc_close_ack_' + String(id); }
  function hasAcked(id) {
    try { return sessionStorage.getItem(getAckKey(id)) === '1'; } catch (e) { return false; }
  }
  function setAcked(id, v) {
    try { sessionStorage.setItem(getAckKey(id), v ? '1' : '0'); } catch (e) {}
  }

  function setConfirmDisabled(disabled) {
    const btn = document.querySelector('button[data-testid="close-confirm-button"]');
    if (!btn) return;
    btn.disabled = !!disabled;
    if (disabled) btn.setAttribute('aria-disabled', 'true');
    else btn.removeAttribute('aria-disabled');
  }

  function ensureStyles() {
    if (stylesAdded) return;
    stylesAdded = true;

    const css = `
      .wcc-close-root {
        position: relative !important;
        padding-right: 384px !important;
        padding-bottom: 65px
      }

      .wcc-close-panel {
        position: absolute;
        top: 0;
        right: 0;
        width: 360px;
        box-sizing: border-box;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 12px 12px 10px;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        z-index: 2
      }

      .wcc-title {font-weight: 700; margin: 0 0 8px; font-size: 14px}
      .wcc-line  {font-size: 12px; line-height: 1.25; margin: 6px 0; display: flex; align-items: baseline; gap: 6px}
      .wcc-label {width: 110px; font-weight: 700; flex: 0 0 110px}
      .wcc-value {flex: 1 1 auto; min-width: 0}
      .wcc-muted {color: #666; font-size: 11px; margin-top: 8px}

      .wcc-badge {
        display: inline-block;
        border-radius: 999px;
        padding: 2px 8px;
        font-size: 11px;
        border: 1px solid #ddd;
        white-space: nowrap;
        margin-left: 6px
      }

      .wcc-ok   {border-left: 4px solid #0a7b2f; padding-left: 8px}
      .wcc-warn {border-left: 4px solid #b71c1c; padding-left: 8px}

      .wcc-alert{
        margin-top: 10px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #b71c1c;
        background: #fff5f5;
        color: #7a0f0f;
        font-size: 12px;
        font-weight: 700
      }
      .wcc-alert ul {margin: 6px 0 0 18px}

      .wcc-ack{
        margin-top: 10px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ddd;
        background: #fafafa
      }
      .wcc-ack label{
        font-size: 12px;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        line-height: 1.2;
        margin: 0;
        user-select: text
      }

      .wcc-ack .wcc-ackbtn{
        margin-top: 10px;
        width: 100%;
        box-sizing: border-box;
        white-space: normal;
        word-break: break-word;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.2;
        min-height: 34px
      }

      .wcc-disabled-note{
        margin-top: 8px;
        font-size: 11px;
        color: #8b1f1f;
        font-weight: 600
      }

      button[data-testid="close-confirm-button"][disabled]{
        opacity: 0.45 !important;
        cursor: not-allowed !important;
        filter: grayscale(1) !important;
        pointer-events: none !important
      }
    `;

    const style = document.createElement('style');
    style.id = 'wcc-close-style';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function findCloseRoot() {
    const btn = document.querySelector('button[data-testid="close-confirm-button"]');
    if (!btn) return null;
    return btn.closest('div');
  }

  function ensurePanel() {
    ensureStyles();

    closeRootEl = findCloseRoot();
    if (!closeRootEl) return null;

    closeRootEl.classList.add('wcc-close-root');

    let panel = closeRootEl.querySelector(':scope > .wcc-close-panel[data-wcc-panel="1"]');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'wcc-close-panel';
      panel.setAttribute('data-wcc-panel', '1');
      panel.innerHTML = `
        <div class="wcc-title">Wiki health check</div>

        <div class="wcc-line wcc-ok"><span class="wcc-label">MPVs:</span>
          <span class="wcc-value" data-wcc="mpv">Loading…</span>
        </div>

        <div class="wcc-line wcc-ok"><span class="wcc-label">Articles:</span>
          <span class="wcc-value" data-wcc="articles">Loading…</span>
        </div>

        <div class="wcc-line wcc-ok"><span class="wcc-label">Active users:</span>
          <span class="wcc-value" data-wcc="activeusers">Loading…</span>
        </div>

        <div class="wcc-line wcc-ok"><span class="wcc-label">Admins:</span>
          <span class="wcc-value" data-wcc="admins">Loading…</span>
        </div>

        <div class="wcc-muted">Wiki ID: ${escapeHtml(panelState.wikiId)}</div>
        <div data-wcc="policy"></div>
      `;
      closeRootEl.appendChild(panel);
    }

    panelEl = panel;
    return panel;
  }

  function setTextIfChanged(el, text) {
    if (!el) return;
    const t = String(text);
    if (el.textContent !== t) el.textContent = t;
  }

  function setPanelValue(panel, key, value, badgeText) {
    const el = panel.querySelector(`[data-wcc="${key}"]`);
    if (!el) return;

    const valueStr = String(value);
    if (el.textContent !== valueStr) el.textContent = valueStr;

    const line = el.closest('.wcc-line');
    if (!line) return;

    const existing = line.querySelector('.wcc-badge');
    if (existing && !badgeText) existing.remove();

    if (badgeText) {
      if (existing) {
        if (existing.textContent !== badgeText) existing.textContent = badgeText;
      } else {
        const b = document.createElement('span');
        b.className = 'wcc-badge';
        b.textContent = badgeText;
        line.appendChild(b);
      }
    }
  }

  function setLineWarn(panel, key, warn) {
    const el = panel.querySelector(`[data-wcc="${key}"]`);
    const line = el && el.closest('.wcc-line');
    if (!line) return;
    const needWarn = !!warn;
    const hasWarn = line.classList.contains('wcc-warn');
    const hasOk = line.classList.contains('wcc-ok');
    if (needWarn && !hasWarn) {
      line.classList.remove('wcc-ok');
      line.classList.add('wcc-warn');
    } else if (!needWarn && !hasOk) {
      line.classList.remove('wcc-warn');
      line.classList.add('wcc-ok');
    }
  }

  function fetchMPV(id) {
    const key = String(id);
    if (mpvCache.has(key)) return Promise.resolve({ mpv: mpvCache.get(key) });

    const url = COMMUNITY_API_BASE + '/rest.php/admin-requests/get-monthly-page-views/' + encodeURIComponent(key);
    return fetchJson(url).then(r => {
      if (!r || r.error) return { error: (r && r.error) ? r.error : 'request failed' };

      const d = r.data;

      if (Array.isArray(d)) {
        const n = normalizeMpvNumber(d[0]);
        if (!isNaN(n)) { mpvCache.set(key, n); return { mpv: n }; }
      }

      const n1 = normalizeMpvNumber(d);
      if (!isNaN(n1)) { mpvCache.set(key, n1); return { mpv: n1 }; }

      if (d && typeof d === 'object') {
        const candidates = [
          d.mpv, d.monthlyPageViews, d.monthly_page_views,
          d.pageViews, d.page_views, d.value, d.result, d.data, d[0]
        ];
        for (const c of candidates) {
          const n2 = normalizeMpvNumber(c);
          if (!isNaN(n2)) { mpvCache.set(key, n2); return { mpv: n2 }; }
        }
      }

      return { error: 'unexpected response' };
    });
  }

  function fetchWikiDetailsUrl(id) {
    const key = String(id);
    if (detailsCache.has(key)) return Promise.resolve({ url: detailsCache.get(key).url });

    const url = COMMUNITY_API_BASE + '/api/v1/Wikis/Details?ids=' + encodeURIComponent(key);
    return fetchJson(url).then(r => {
      if (r.error) return { error: r.error };
      const items = r.data && r.data.items;
      const det = items && (items[key] || items[String(parseInt(key, 10))]);
      if (det && det.url) {
        detailsCache.set(key, { url: det.url });
        return { url: det.url };
      }
      return { error: 'no url in details' };
    });
  }

  function fetchSiteinfoStatsFromWikiUrl(wikiUrl, id) {
    const key = String(id);
    if (siteinfoCache.has(key)) return Promise.resolve({ stats: siteinfoCache.get(key) });

    const apiBase = buildWikiUrl(wikiUrl, '/api.php');
    if (!apiBase) return Promise.resolve({ error: 'cannot derive api.php from wiki url' });

    const cbName = '__WCC_siteinfo_' + key + '_' + Math.random().toString(36).slice(2);
    const jsonpUrl = apiBase + '?action=query&format=json&meta=siteinfo&siprop=statistics&callback=' + encodeURIComponent(cbName);

    return jsonpFetch(jsonpUrl, cbName, JSONP_TIMEOUT_MS)
      .then(res => {
        const s = res && res.data && res.data.query && res.data.query.statistics;
        if (!s) return { error: 'unexpected siteinfo structure' };

        const stats = {
          articles: (s.articles !== undefined ? s.articles : (s.pages !== undefined ? s.pages : undefined)),
          activeusers: (s.activeusers !== undefined ? s.activeusers : undefined),
          admins: (s.admins !== undefined ? s.admins : undefined)
        };

        siteinfoCache.set(key, stats);
        return { stats };
      })
      .catch(e => ({ error: (e && e.message) ? e.message : String(e) }));
  }

  function computePolicy(mpv, activeusers) {
    const restrictedByMpv = (typeof mpv === 'number' && mpv > MPV_THRESHOLD);
    const restrictedByActive = (typeof activeusers === 'number' && activeusers > ACTIVE_USERS_THRESHOLD);
    const restricted = restrictedByMpv || restrictedByActive;

    const reasons = [];
    if (restrictedByMpv) reasons.push(`MPVs > ${MPV_THRESHOLD} (current: ${mpv})`);
    if (restrictedByActive) reasons.push(`Active users > ${ACTIVE_USERS_THRESHOLD} (current: ${activeusers})`);

    return { restricted, reasons };
  }

  function applyGate(restricted) {
    if (!restricted) {
      setConfirmDisabled(false);
      return;
    }
    const ok = hasAcked(panelState.wikiId);
    setConfirmDisabled(!ok);
  }

  function renderPolicy(panel, restricted, reasons) {
    const policy = panel.querySelector('[data-wcc="policy"]');
    if (!policy) return;

    const reasonsKey = restricted ? reasons.join('|') : '';
    if (panelState.restricted === restricted && panelState.reasonsKey === reasonsKey) {
      applyGate(restricted);
      const note = policy.querySelector('[data-wcc="disablednote"]');
      if (note) note.style.display = (!restricted || hasAcked(panelState.wikiId)) ? 'none' : 'block';
      return;
    }

    panelState.restricted = restricted;
    panelState.reasonsKey = reasonsKey;

    if (!restricted) {
      policy.innerHTML = '';
      setConfirmDisabled(false);
      return;
    }

    const alreadyAck = hasAcked(panelState.wikiId);
    const reasonsHtml = reasons.map(r => `<li>${escapeHtml(r)}</li>`).join('');

    policy.innerHTML = `
      <div class="wcc-alert">
        ⚠️ THIS WIKI SHOULD NOT BE CLOSED<br/>
        without explicit authorization from SEO + Community Leadership Team.
        <div style="margin-top:6px;font-weight:600;">
          Triggered by:
          <ul>${reasonsHtml}</ul>
        </div>
      </div>

      <div class="wcc-ack">
        <label>
          <input type="checkbox" data-wcc="ackcheck" ${alreadyAck ? 'checked' : ''}/>
          <span>I confirm I have the required authorization (SEO + CLT) to close this wiki.</span>
        </label>

        <button class="wds-button wcc-ackbtn" type="button" data-wcc="ackbtn">
          I understand and have authorization
        </button>

        <div class="wcc-disabled-note" data-wcc="disablednote" style="${alreadyAck ? 'display:none' : 'display:block'}">
          “Confirm close” is disabled until you acknowledge authorization.
        </div>
      </div>
    `;

    const ackCheck = policy.querySelector('[data-wcc="ackcheck"]');
    const ackBtn = policy.querySelector('[data-wcc="ackbtn"]');
    const note = policy.querySelector('[data-wcc="disablednote"]');

    function applyFromUI() {
      const ok = !!(ackCheck && ackCheck.checked);
      setAcked(panelState.wikiId, ok);
      if (note) note.style.display = ok ? 'none' : 'block';
      setConfirmDisabled(!ok);
    }

    if (ackBtn) {
      ackBtn.addEventListener('click', function () {
        if (ackCheck) ackCheck.checked = true;
        applyFromUI();
      });
    }
    if (ackCheck) {
      ackCheck.addEventListener('change', applyFromUI);
    }

    applyFromUI();
  }

  function hydrateFromCache(panel) {
    const mpv = mpvCache.get(panelState.wikiId);
    if (mpv !== undefined) {
      panelState.mpv = mpv;
      setPanelValue(panel, 'mpv', String(mpv), (mpv > MPV_THRESHOLD ? `>${MPV_THRESHOLD}` : null));
      setLineWarn(panel, 'mpv', mpv > MPV_THRESHOLD);
    }

    const s = siteinfoCache.get(panelState.wikiId);
    if (s) {
      if (s.articles !== undefined) {
        panelState.articles = s.articles;
        setPanelValue(panel, 'articles', String(s.articles));
      }
      if (s.activeusers !== undefined) {
        panelState.activeusers = s.activeusers;
        setPanelValue(panel, 'activeusers', String(s.activeusers), (s.activeusers > ACTIVE_USERS_THRESHOLD ? `>${ACTIVE_USERS_THRESHOLD}` : null));
        setLineWarn(panel, 'activeusers', s.activeusers > ACTIVE_USERS_THRESHOLD);
      }
      if (s.admins !== undefined) {
        panelState.admins = s.admins;
        setPanelValue(panel, 'admins', String(s.admins));
      }
    }

    const pol = computePolicy(panelState.mpv, panelState.activeusers);
    renderPolicy(panel, pol.restricted, pol.reasons);
  }

  function fetchAndRender(panel) {
    const mpvP = fetchMPV(panelState.wikiId).then(r => {
      if (r && typeof r.mpv === 'number') {
        panelState.mpv = r.mpv;
        setPanelValue(panel, 'mpv', String(r.mpv), (r.mpv > MPV_THRESHOLD ? `>${MPV_THRESHOLD}` : null));
        setLineWarn(panel, 'mpv', r.mpv > MPV_THRESHOLD);
      } else {
        setPanelValue(panel, 'mpv', 'Unavailable', 'error');
        setLineWarn(panel, 'mpv', false);
      }
    });

    const statsP = fetchWikiDetailsUrl(panelState.wikiId).then(det => {
      if (!det || !det.url) {
        setPanelValue(panel, 'articles', 'Unavailable', 'error');
        setPanelValue(panel, 'activeusers', 'Unavailable', 'error');
        setPanelValue(panel, 'admins', 'Unavailable', 'error');
        return;
      }
      return fetchSiteinfoStatsFromWikiUrl(det.url, panelState.wikiId).then(si => {
        if (si && si.stats) {
          const s = si.stats;
          panelState.articles = s.articles;
          panelState.activeusers = s.activeusers;
          panelState.admins = s.admins;

          setPanelValue(panel, 'articles', (s.articles !== undefined ? String(s.articles) : '—'));
          setPanelValue(panel, 'activeusers', (s.activeusers !== undefined ? String(s.activeusers) : '—'),
            (typeof s.activeusers === 'number' && s.activeusers > ACTIVE_USERS_THRESHOLD ? `>${ACTIVE_USERS_THRESHOLD}` : null)
          );
          setPanelValue(panel, 'admins', (s.admins !== undefined ? String(s.admins) : '—'));

          if (typeof s.activeusers === 'number') {
            setLineWarn(panel, 'activeusers', s.activeusers > ACTIVE_USERS_THRESHOLD);
          }
        } else {
          setPanelValue(panel, 'articles', 'Unavailable', 'error');
          setPanelValue(panel, 'activeusers', 'Unavailable', 'error');
          setPanelValue(panel, 'admins', 'Unavailable', 'error');
        }
      });
    });

    Promise.all([mpvP, statsP]).then(() => {
      const pol = computePolicy(panelState.mpv, panelState.activeusers);
      renderPolicy(panel, pol.restricted, pol.reasons);
      if (!pol.restricted) setConfirmDisabled(false);
      panelState.loadedOnce = true;
    });
  }

  function runOnce() {
    const panel = ensurePanel();
    if (!panel) return;
    hydrateFromCache(panel);
    if (!panelState.loadedOnce) fetchAndRender(panel);
    else {
      const pol = computePolicy(panelState.mpv, panelState.activeusers);
      renderPolicy(panel, pol.restricted, pol.reasons);
    }
  }

  function scheduleRun() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(runOnce);
  }

  function installLightListeners() {
    if (booted) return;
    booted = true;

    document.addEventListener('click', function (e) {
      const t = e && e.target;
      if (!t) return;

      const onClose = t.closest && t.closest('button[data-testid="close-confirm-button"], [data-testid^="close-"], .Close-module_flagList__vmqWx');
      if (!onClose) return;

      scheduleRun();
    }, true);

    document.addEventListener('input', function (e) {
      const t = e && e.target;
      if (!t) return;
      if (t.matches && t.matches('textarea[data-testid="close-wiki-input-reason"], input.wds-toggle__input')) {
        scheduleRun();
      }
    }, true);

    setInterval(function () {
      const href = location.href;
      if (href !== lastHref) {
        lastHref = href;

        if (/Special:WikiConfig/i.test(href) && /\/close\b/i.test(href)) {
          const newId = (function () {
            let m = href.match(/Special:WikiConfig\/(\d+)\/close/i);
            if (m) return m[1];
            m = href.match(/Special:WikiConfig\/(\d+)/i);
            if (m) return m[1];
            m = href.match(/[?&]wiki_id=(\d+)/i);
            if (m) return m[1];
            return null;
          })();

          if (newId && String(newId) !== panelState.wikiId) {
            panelState = {
              wikiId: String(newId),
              mpv: mpvCache.get(String(newId)),
              articles: (siteinfoCache.get(String(newId)) || {}).articles,
              activeusers: (siteinfoCache.get(String(newId)) || {}).activeusers,
              admins: (siteinfoCache.get(String(newId)) || {}).admins,
              restricted: null,
              reasonsKey: '',
              loadedOnce: false
            };
            panelEl = null;
            closeRootEl = null;
          }
          scheduleRun();
        }
      }

      const root = findCloseRoot();
      if (root) {
        const existing = root.querySelector(':scope > .wcc-close-panel[data-wcc-panel="1"]');
        if (!existing) scheduleRun();
      }
    }, 800);
  }

  function boot() {
    installLightListeners();

    let tries = 0;
    const t = setInterval(function () {
      tries++;
      const ok = !!findCloseRoot();
      if (ok || tries > 60) {
        clearInterval(t);
        scheduleRun();
      }
    }, 150);
  }

  boot();
})();