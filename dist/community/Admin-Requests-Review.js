// AdminRequests — Unified "More info" column for AdminRequestsReview

(function () {
  if (typeof mw === 'undefined' || !mw.config) return;

  const isAdminRequestsReview = (function () {
    try {
      const sp = mw.config.get && mw.config.get('wgCanonicalSpecialPageName');
      if (sp && sp.toLowerCase() === 'adminrequestsreview') return true;
    } catch (e) {}
    return window.location.pathname && window.location.pathname.indexOf('/wiki/Special:AdminRequestsReview') !== -1;
  })();
  if (!isAdminRequestsReview) return;

  const COMMUNITY_API_BASE = 'https://community.fandom.com';
  const WIKIS_DETAILS_PATH = '/api/v1/Wikis/Details?ids=';
  const THROTTLE_ROW_MS = 60;
  const JSONP_TIMEOUT_MS = 9000;

  let __AR_isRunning = false;
  let __AR_pendingRun = false;

  const __AR_siteinfoCache = new Map();
  const __AR_mpvCache = new Map();

  let __AR_rowObserver = null;
  let __AR_lastHref = location.href;


  (function () {
    const css = `
      /* More info/status column */
      th.ar-moreinfo { width: 360px !important; min-width: 180px; max-width: 520px; text-align:left; }
      td.ar-moreinfo-cell, td.ar-status-cell {
        max-width: 520px;
        white-space: normal !important;
        word-break: break-word;
        font-size: 12px;
        line-height: 1.18;
        padding: 6px 8px;
        vertical-align: top
      }

      /* Force each status/info line to be a block, and give consistent spacing above and below */
      td.ar-moreinfo-cell .mi-line,
      td.ar-status-cell .ar-status-line {
        display: block !important;
        margin: 6px 0 !important;
        font-size: 12px !important;
        line-height: 1.2 !important;
        white-space: normal !important
      }

      /* Label (bold) and value (normal) styling, with same label width for alignment */
      td.ar-status-cell .ar-status-line strong,
      .mi-label {
        display: inline-block !important;
        width: 96px !important;
        font-weight: 700 !important;
        vertical-align: top !important
      }
      td.ar-status-cell .ar-status-line .ar-status-value,
      .mi-value {
        display: inline !important;
        font-weight: 400 !important
      }

      /* Title for reopen: colored but not entire cell; bigger margin below */
      .ar-status-title {
        font-weight: 600 !important;
        margin-bottom: 8px !important;
        color: #b71c1c !important;
        display: block !important;
      }

      /* Small meta */
      .mi-small, .ar-status-small {display:block; font-size:11px; color:#666; margin-top:6px}

      /* Stack Approve/Reject vertically */
      td[data-testid^="admin-requests-review-table-column-action-cell-"] > div {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px;
        align-items: stretch;
      }
      td[data-testid^="admin-requests-review-table-column-action-cell-"] button {
        width: 100% !important;
        box-sizing: border-box;
        padding-top: 6px !important;
        padding-bottom: 6px !important;
        font-size: 13px !important;
      }

      /* Status markers (do not change main text color) */
      .ar-good {border-left: 3px solid #0a7b2f; padding-left:6px}
      .ar-bad {border-left: 3px solid #8b1f1f; padding-left:6px}
      .ar-loading {font-style:italic}

      .mi-link {display:inline-block; margin-left:6px; font-size:11px; text-decoration:underline}

      button[data-testid^="admin-requests-status-cell-approve-button-"][disabled] {
        opacity: 0.45 !important;
        cursor: not-allowed !important;
        filter: grayscale(1) !important;
        pointer-events: none !important;
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  })();

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function ARlog() { try { console.log.apply(console, ['AR:'].concat(Array.from(arguments))); } catch (e) {} }
  function escapeHtml(s){ if (s===null||s===undefined) return ''; return String(s).replace(/[&<>"'`=\/]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','=':'&#x3D;','`':'&#x60;'})[c]); }
  function originFromCandidate(candidate) {
    if (!candidate) return null;
    try { return (new URL(candidate)).origin; }
    catch (e) { const m = (candidate || '').match(/^(https?:\/\/[^\/]+)/i); return m ? m[1] : null; }
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

  function fetchJson(url, opts) {
    return fetch(url, Object.assign({ credentials: 'include' }, opts || {}))
      .then(res => {
        if (!res.ok) return { error: `HTTP ${res.status}` };
        return res.json().then(data => ({ data })).catch(e => ({ error: e && e.message ? e.message : String(e) }));
      })
      .catch(e => ({ error: e && e.message ? e.message : String(e) }));
  }

  function jsonpFetch(url, cbName, timeoutMs = JSONP_TIMEOUT_MS) {
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

  function normalizeMpvNumber(v) {
    if (v === null || v === undefined) return NaN;
    if (typeof v === 'number') return v;
    const n = parseInt(String(v).replace(/[^\d]/g, ''), 10);
    return isNaN(n) ? NaN : n;
  }

  function setApproveDisabledForRow(tr, disabled) {
    if (!tr) return;
    const btn = tr.querySelector('button[data-testid^="admin-requests-status-cell-approve-button-"]');
    if (!btn) return;
    if (disabled) {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
    } else {
      btn.disabled = false;
      btn.removeAttribute('aria-disabled');
    }
  }

  function isRestrictedActionRow(tr) {
    let reqCell = tr && tr.querySelector ? tr.querySelector('td[data-testid^="admin-requests-review-table-column-request-details-"]') : null;
    if (!reqCell && tr && tr.querySelectorAll) {
      const tds = tr.querySelectorAll('td');
      if (tds && tds.length > 1) reqCell = tds[1];
    }
    if (!reqCell) return false;
    const txt = (reqCell.textContent || '').trim().toLowerCase();
    if (!txt) return false;
    return (txt.indexOf('close wiki') !== -1) || (txt.indexOf('change sitename') !== -1) || (txt.indexOf('change url') !== -1);
  }

  function applyMpvPolicy(tr, mpvValue) {
    const mpvNum = normalizeMpvNumber(mpvValue);
    if (isNaN(mpvNum)) return;
    if (isRestrictedActionRow(tr)) setApproveDisabledForRow(tr, mpvNum > 50000);
  }

  function fetchMonthlyPageViews(wikiId) {
    const cached = __AR_mpvCache.get(String(wikiId));
    if (cached !== undefined) return Promise.resolve({ mpv: cached });

    const url = COMMUNITY_API_BASE + '/rest.php/admin-requests/get-monthly-page-views/' + encodeURIComponent(wikiId);
    return fetchJson(url).then(r => {
      if (!r || r.error) return { error: r && r.error ? r.error : 'request failed' };

      const d = r.data;
      ARlog('MPV API raw data for', wikiId, d);

      if (Array.isArray(d)) {
        const nArr = normalizeMpvNumber(d[0]);
        if (!isNaN(nArr)) {
          __AR_mpvCache.set(String(wikiId), nArr);
          return { mpv: nArr };
        }
      }

      if (typeof d === 'number') {
        __AR_mpvCache.set(String(wikiId), d);
        return { mpv: d };
      }
      if (typeof d === 'string') {
        const n = normalizeMpvNumber(d);
        if (!isNaN(n)) {
          __AR_mpvCache.set(String(wikiId), n);
          return { mpv: n };
        }
      }
      if (d && typeof d === 'object') {
        const candidates = [
          d.mpv, d.monthlyPageViews, d.monthly_page_views, d.pageViews, d.page_views, d.value, d.result,
          d.data, d.payload, d.response, d[0]
        ];

        for (let i = 0; i < candidates.length; i++) {
          const c = candidates[i];

          const n1 = normalizeMpvNumber(c);
          if (!isNaN(n1)) {
            __AR_mpvCache.set(String(wikiId), n1);
            return { mpv: n1 };
          }

          if (c && typeof c === 'object') {
            const nested = [c.mpv, c.value, c.result, c.monthlyPageViews, c.pageViews, c.page_views, c.monthly_page_views, c[0]];
            for (let j = 0; j < nested.length; j++) {
              const n2 = normalizeMpvNumber(nested[j]);
              if (!isNaN(n2)) {
                __AR_mpvCache.set(String(wikiId), n2);
                return { mpv: n2 };
              }
            }
          }
        }
      }

      return { error: 'unexpected response' };
    }).catch(e => ({ error: e && e.message ? e.message : String(e) }));
  }

  function readMPVFromRowDOM(tr) {
    const mpvSpan = tr.querySelector('span[data-wds-tooltip], span[class*="MPVButton"], span[data-tooltip-attached]');
    if (mpvSpan) {
      const val = mpvSpan.getAttribute('data-wds-tooltip') || mpvSpan.textContent || null;
      if (val != null) {
        const n = parseInt(String(val).replace(/[^\d]/g,''), 10);
        if (!isNaN(n)) return { mpv: n, source: 'DOM' };
        return { mpv: val, source: 'DOM' };
      }
    }
    return null;
  }

  function parseClosedInfo(text) {
    if (!text) return { found: false };
    const result = { found: false, closedOn: null, closedBy: null, founder: null, reason: null, raw: text };
    let m = text.match(/\b(\d{4}-\d{2}-\d{2})\b/);
    if (m) result.closedOn = m[1];
    if (!result.closedOn) { m = text.match(/([A-Za-z]{3,9}\s+\d{1,2},\s*\d{4})/); if (m) result.closedOn = m[1]; }
    if (!result.closedOn) { m = text.match(/(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4})/); if (m) result.closedOn = m[1]; }
    m = text.match(/founded\s+by\s+([A-Za-z0-9_\-@\. \(\)']+?)(?=\s+was\s+closed\b|,|\n|$)/i);
    if (m) result.founder = m[1].trim();
    m = text.match(/was\s+closed\s+by\s+([A-Za-z0-9_\-@\. \(\)']+?)(?=,|\s+reason:|\s+Sitename:|\s+Flags:|\s+DB name:|\s+Redirect:|$)/i);
    if (!m) m = text.match(/closed\s+by[:\s]*([A-Za-z0-9_\-@\. \(\)']+?)(?=,|\s+reason:|\s+Sitename:|\s+Flags:|\s+DB name:|\s+Redirect:|$)/i);
    if (m) result.closedBy = m[1].trim();
    m = text.match(/reason\s*:\s*([\s\S]*?)(?=\s*(?:Sitename:|Flags:|DB name:|Redirect:|$))/i);
    if (m && m[1]) {
      let reason = m[1].trim();
      if ((reason.startsWith('"') && reason.endsWith('"')) || (reason.startsWith("'") && reason.endsWith("'"))) reason = reason.slice(1, -1).trim();
      reason = reason.replace(/^[\s"']+|[\s"']+$/g, '').trim();
      result.reason = reason;
    }
    if (result.closedBy || result.reason || /\bwas\s+closed\b|\bclosed\b|\bclosure\b/i.test(text)) result.found = true;
    return result;
  }

  function fetchClosedWikisEntry(wikiId) {
    if (!wikiId) return Promise.resolve({ error: 'no wikiId' });
    const url = `/wiki/Special:ClosedWikis?event=&daterange%5Bfrom%5D=&daterange%5Bto%5D=&sitename=&dbname=&url=&founder=&performer=&reason=&redirecturl=&closuretype=0&wikiid=${encodeURIComponent(wikiId)}`;
    return fetch(url, { credentials: 'include' })
      .then(resp => {
        if (!resp.ok) return { error: `ClosedWikis fetch HTTP ${resp.status}` };
        return resp.text().then(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const candidates = Array.from(doc.querySelectorAll('li, div, p, tr, td'));
          let blockText = null;
          for (const el of candidates) {
            const t = (el.textContent || '').trim();
            if (!t) continue;
            if (t.includes(`Wiki ID: ${wikiId}`) || (/\bWiki ID:\s*\d+\b/i.test(t) && t.indexOf(wikiId) !== -1)) { blockText = t; break; }
          }
          if (!blockText) blockText = (doc.body && doc.body.textContent) ? doc.body.textContent.trim() : html;
          if (/No results|No wikis found|No matching wikis|No entries found|There are no closed wikis/i.test(blockText)) {
            return { notFound: true, raw: blockText };
          }
          const parsed = parseClosedInfo(blockText);
          return { raw: blockText, parsed };
        });
      })
      .catch(e => ({ error: `fetch error: ${e && e.message ? e.message : String(e)}` }));
  }

  function trimAndEscape(s) { if (!s) return ''; return escapeHtml(String(s).replace(/\s+/g, ' ').trim()); }

  function ensureCell(tr) {
    let c = tr.querySelector('td.ar-moreinfo-cell');
    if (!c) {
      c = document.createElement('td');
      c.className = 'ar-cell ar-moreinfo-cell ar-loading';
      c.textContent = '…';
      tr.appendChild(c);
    } else {
      c.classList.remove('ar-good','ar-bad'); c.classList.add('ar-loading'); c.textContent = '…';
    }
    return c;
  }

  function renderReopenCell(cell, info, wikiId) {
    if (!cell) return;
    cell.classList.remove('ar-loading');
    if (!info) { cell.classList.add('ar-bad'); cell.innerHTML = `<div><strong>Error:</strong> no info</div>`; return; }
    if (info.error) { cell.classList.add('ar-bad'); cell.innerHTML = `<div><strong>Error:</strong> ${escapeHtml(info.error)}</div><div class="ar-status-small">ID: ${escapeHtml(wikiId)}</div>`; return; }
    if (info.notFound) { cell.classList.add('ar-good'); cell.innerHTML = `<div><strong>Open</strong></div><div class="ar-status-small">ClosedWikis: no entry (ID ${escapeHtml(wikiId)})</div>`; return; }

    const p = (info.parsed || {});
    if (p && p.found) {
      cell.classList.add('ar-bad');
      const lines = [];
      if (p.closedOn) lines.push(`<div class="ar-status-line"><strong>Date:</strong> <span class="ar-status-value">${trimAndEscape(p.closedOn)}</span></div>`);
      if (p.closedBy) lines.push(`<div class="ar-status-line"><strong>By:</strong> <span class="ar-status-value">${trimAndEscape(p.closedBy)}</span></div>`);
      if (p.founder) lines.push(`<div class="ar-status-line"><strong>Founder:</strong> <span class="ar-status-value">${trimAndEscape(p.founder)}</span></div>`);
      if (p.reason) lines.push(`<div class="ar-status-line"><strong>Reason:</strong> <span class="ar-status-value">${trimAndEscape(p.reason)}</span></div>`);
      const fallback = (!lines.length && p.raw) ? `<div class="ar-status-line"><span class="ar-status-value">${trimAndEscape(p.raw).slice(0,140)}</span></div>` : '';
      cell.innerHTML = `<div class="ar-status-title">Closed</div>${lines.join('')}${fallback}<div class="ar-status-small">ID: ${escapeHtml(wikiId)}</div>`;
      return;
    }

    if (info.raw) {
      const parsedFallback = parseClosedInfo(info.raw);
      if (parsedFallback && parsedFallback.found) {
        cell.classList.add('ar-bad');
        const lines = [];
        if (parsedFallback.closedOn) lines.push(`<div class="ar-status-line"><strong>Date:</strong> <span class="ar-status-value">${trimAndEscape(parsedFallback.closedOn)}</span></div>`);
        if (parsedFallback.closedBy) lines.push(`<div class="ar-status-line"><strong>By:</strong> <span class="ar-status-value">${trimAndEscape(parsedFallback.closedBy)}</span></div>`);
        if (parsedFallback.founder) lines.push(`<div class="ar-status-line"><strong>Founder:</strong> <span class="ar-status-value">${trimAndEscape(parsedFallback.founder)}</span></div>`);
        if (parsedFallback.reason) lines.push(`<div class="ar-status-line"><strong>Reason:</strong> <span class="ar-status-value">${trimAndEscape(parsedFallback.reason)}</span></div>`);
        cell.innerHTML = `<div class="ar-status-title">Closed</div>${lines.join('')}<div class="ar-status-small">ID: ${escapeHtml(wikiId)}</div>`;
        return;
      } else {
        cell.classList.add('ar-good');
        cell.innerHTML = `<div><strong>Open</strong></div><div class="ar-status-small">ID: ${escapeHtml(wikiId)}</div>`;
        return;
      }
    }

    cell.classList.add('ar-good');
    cell.innerHTML = `<div><strong>Open</strong></div><div class="ar-status-small">ID: ${escapeHtml(wikiId)}</div>`;
  }

  function renderInfoCell(cell, state) {
    cell.classList.remove('ar-loading');
    if (state.errors && Object.keys(state.errors).length) cell.classList.add('ar-bad'); else cell.classList.add('ar-good');

    const lines = [];

    if (state.mpv !== undefined) {
      lines.push(`<div class="ar-status-line"><strong>MPV:</strong> <span class="ar-status-value">${escapeHtml(String(state.mpv))}</span> <span style="color:#666;font-weight:normal">(${escapeHtml(state.mpvSource||'')})</span></div>`);
    } else {
      if (state.errors && state.errors.mpv) {
        lines.push(`<div class="ar-status-line"><strong>MPV:</strong> <span class="ar-status-value">Unavailable (${escapeHtml(state.errors.mpv)})</span></div>`);
      } else {
        lines.push(`<div class="ar-status-line"><strong>MPV:</strong> <span class="ar-status-value">Loading…</span></div>`);
      }
    }

    if (state.wikiUrl) lines.push(`<div class="ar-status-line"><strong>Wiki URL:</strong> <span class="ar-status-value"><a href="${escapeHtml(state.wikiUrl)}" target="_blank" rel="noopener">${escapeHtml(state.wikiUrl)}</a></span></div>`);
    else if (state.errors && state.errors.wikiUrl) lines.push(`<div class="ar-status-line"><strong>Wiki URL:</strong> <span class="ar-status-value">Unavailable (${escapeHtml(state.errors.wikiUrl)})</span></div>`);
    else lines.push(`<div class="ar-status-line"><strong>Wiki URL:</strong> <span class="ar-status-value">Loading…</span></div>`);

    if (state.articles !== undefined) lines.push(`<div class="ar-status-line"><strong>Articles:</strong> <span class="ar-status-value">${escapeHtml(String(state.articles))}</span></div>`);
    else lines.push(`<div class="ar-status-line"><strong>Articles:</strong> <span class="ar-status-value">Loading…</span></div>`);

    if (state.activeusers !== undefined) lines.push(`<div class="ar-status-line"><strong>Active users:</strong> <span class="ar-status-value">${escapeHtml(String(state.activeusers))}</span></div>`);
    else lines.push(`<div class="ar-status-line"><strong>Active users:</strong> <span class="ar-status-value">Loading…</span></div>`);

    if (state.admins !== undefined) lines.push(`<div class="ar-status-line"><strong>Admins:</strong> <span class="ar-status-value">${escapeHtml(String(state.admins))}</span></div>`);
    else lines.push(`<div class="ar-status-line"><strong>Admins:</strong> <span class="ar-status-value">Loading…</span></div>`);

    lines.push(`<div class="mi-small">ID: ${escapeHtml(String(state.wikiId))}</div>`);

    if (state.errors && Object.keys(state.errors).length) {
      const es = Object.keys(state.errors).map(k => `${k}: ${state.errors[k]}`).join('; ');
      lines.push(`<div class="mi-small" style="color:#a33"><strong>Notes:</strong> ${escapeHtml(es)}</div>`);
    }

    cell.innerHTML = lines.join('');
  }

  function classifyRow(tr) {
    let reqCell = tr.querySelector('td[data-testid^="admin-requests-review-table-column-request-details-"]');
    if (!reqCell) {
      const tds = tr.querySelectorAll('td');
      if (tds && tds.length > 1) reqCell = tds[1];
    }
    if (!reqCell) return null;
    const txt = (reqCell.textContent || '').trim().toLowerCase();
    if (!txt) return null;
    if (txt.indexOf('reopen wiki') !== -1) return 'reopen';
    const keywords = ['close wiki', 'change sitename', 'enable', 'disable', 'change url'];
    for (const k of keywords) if (txt.indexOf(k) !== -1) return 'info';
    return null;
  }

  function getRowWikiId(tr) {
    const cfgLink = tr.querySelector('a[href*="Special:WikiConfig/"]');
    if (!cfgLink) return null;
    const m = cfgLink.href.match(/Special:WikiConfig\/(\d+)/i);
    return m ? m[1] : null;
  }

  function runUpdateMoreInfo() {
    if (__AR_isRunning) {
      __AR_pendingRun = true;
      return;
    }
    __AR_isRunning = true;
    Promise.resolve()
      .then(() => updateMoreInfo())
      .finally(() => {
        __AR_isRunning = false;
        if (__AR_pendingRun) {
          __AR_pendingRun = false;
          setTimeout(runUpdateMoreInfo, 50);
        }
      });
  }

  function updateMoreInfo() {
    const table = document.querySelector('table[data-testid="admin-requests-review-sortable-table"]');
    if (!table) { ARlog('table not found'); return Promise.resolve(); }

    const headerRow = table.querySelector('thead tr');
    if (headerRow && !headerRow.querySelector('th.ar-moreinfo')) {
      const th = document.createElement('th'); th.className = 'ar-moreinfo'; th.textContent = 'More info'; headerRow.appendChild(th);
    }

    const allRows = Array.from(table.querySelectorAll('tbody tr'));
    const toProcess = [];
    for (const tr of allRows) {
      const cls = classifyRow(tr);
      if (cls) toProcess.push({ tr, type: cls });
    }
    ARlog('Rows to process (count):', toProcess.length);

    const idRowMapInfo = {};
    const idRowMapReopen = {};
    const wikiIdsInfo = [];
    const wikiIdsReopen = [];

    for (const item of toProcess) {
      const tr = item.tr;
      const type = item.type;
      const wikiId = getRowWikiId(tr);
      if (!wikiId) continue;

      if (type === 'info') {
        if (!idRowMapInfo[wikiId]) idRowMapInfo[wikiId] = [];
        idRowMapInfo[wikiId].push(tr);
        if (!wikiIdsInfo.includes(wikiId)) wikiIdsInfo.push(wikiId);
      } else if (type === 'reopen') {
        if (!idRowMapReopen[wikiId]) idRowMapReopen[wikiId] = [];
        idRowMapReopen[wikiId].push(tr);
        if (!wikiIdsReopen.includes(wikiId)) wikiIdsReopen.push(wikiId);
      }
    }

    toProcess.forEach(item => {
      const tr = item.tr;
      const wikiId = getRowWikiId(tr);
      if (!wikiId) return;

      const cell = tr.querySelector('td.ar-moreinfo-cell');
      const doneFor = tr.getAttribute('data-ar-moreinfo-done');

      if (cell && doneFor === String(wikiId)) return;
      ensureCell(tr);
    });

    const reopenChain = wikiIdsReopen.reduce((p, wikiId) => {
      return p.then(() => {
        const trs = idRowMapReopen[wikiId] || [];
        const allDone = trs.length && trs.every(tr => tr.getAttribute('data-ar-moreinfo-done') === String(wikiId));
        if (allDone) return Promise.resolve();

        return fetchClosedWikisEntry(wikiId).then(info => {
          for (const tr of trs) {
            if (tr.getAttribute('data-ar-moreinfo-done') === String(wikiId)) continue;
            const cell = tr.querySelector('td.ar-moreinfo-cell');
            if (!cell) continue;
            renderReopenCell(cell, info, wikiId);
            tr.setAttribute('data-ar-moreinfo-done', String(wikiId));
          }
          return sleep(THROTTLE_ROW_MS);
        });
      });
    }, Promise.resolve());

    return reopenChain.then(() => {
      if (!wikiIdsInfo.length) return;

      const wikiIdsInfoToFetch = wikiIdsInfo.filter(wikiId => {
        const trs = idRowMapInfo[wikiId] || [];
        return trs.some(tr => tr.getAttribute('data-ar-moreinfo-done') !== String(wikiId));
      });

      const detailsMap = {};
      const detailsPromise = wikiIdsInfoToFetch.length
        ? (function () {
            const idsParam = wikiIdsInfoToFetch.join(',');
            ARlog('fetching community details for', idsParam);
            return fetchJson(COMMUNITY_API_BASE + WIKIS_DETAILS_PATH + encodeURIComponent(idsParam)).then(detailsResp => {
              if (!detailsResp.error && detailsResp.data && detailsResp.data.items) {
                Object.keys(detailsResp.data.items).forEach(k => detailsMap[k] = detailsResp.data.items[k]);
              } else {
                ARlog('detailsResp missing data or error', detailsResp && detailsResp.error ? detailsResp.error : detailsResp && detailsResp.data ? detailsResp.data : 'no data');
              }
            });
          })()
        : Promise.resolve();

      return detailsPromise.then(() => {
        const rowJobs = [];
        for (const wikiId of wikiIdsInfo) {
          const trs = idRowMapInfo[wikiId] || [];
          for (const tr of trs) rowJobs.push({ wikiId, tr });
        }

        return rowJobs.reduce((p, job) => {
          return p.then(() => {
            const wikiId = job.wikiId;
            const tr = job.tr;

            if (tr.getAttribute('data-ar-moreinfo-done') === String(wikiId)) return;

            const cell = tr.querySelector('td.ar-moreinfo-cell');
            if (!cell) return;

            const state = { wikiId, mpv: undefined, mpvSource: undefined, wikiUrl: undefined, articles: undefined, activeusers: undefined, admins: undefined, errors: {} };
            renderInfoCell(cell, state);

            let mpvDomOk = false;
            try {
              const mpvDom = readMPVFromRowDOM(tr);
              if (mpvDom) { state.mpv = mpvDom.mpv; state.mpvSource = mpvDom.source; mpvDomOk = !isNaN(normalizeMpvNumber(state.mpv)); ARlog('Row', wikiId, 'MPV from DOM', state.mpv); }
            } catch (e) { state.errors.mpv = e && e.message ? e.message : String(e); ARlog('MPV exception', wikiId, state.errors.mpv); }
            renderInfoCell(cell, state);
            if (mpvDomOk) applyMpvPolicy(tr, state.mpv);

            const needMpvApi = !mpvDomOk && __AR_mpvCache.get(String(wikiId)) === undefined;
            const mpvPromise = needMpvApi
              ? fetchMonthlyPageViews(wikiId).then(mpvRes => {
                  if (mpvRes && mpvRes.mpv !== undefined && !isNaN(normalizeMpvNumber(mpvRes.mpv))) {
                    state.mpv = normalizeMpvNumber(mpvRes.mpv);
                    state.mpvSource = 'API';
                    renderInfoCell(cell, state);
                    applyMpvPolicy(tr, state.mpv);
                  } else {
                    state.errors.mpv = (mpvRes && mpvRes.error) ? mpvRes.error : 'MPV API failed';
                    renderInfoCell(cell, state);
                  }
                })
              : Promise.resolve().then(() => {
                  const cachedMpv = __AR_mpvCache.get(String(wikiId));
                  if (cachedMpv !== undefined && (state.mpv === undefined || isNaN(normalizeMpvNumber(state.mpv)))) {
                    state.mpv = cachedMpv;
                    state.mpvSource = 'API';
                    renderInfoCell(cell, state);
                    applyMpvPolicy(tr, state.mpv);
                  }
                });

            return mpvPromise.then(() => {
              try {
                const det = detailsMap[wikiId];
                if (det && det.url) { state.wikiUrl = det.url; ARlog('Wiki URL from community details', wikiId, state.wikiUrl); }
                else { state.errors.wikiDetails = 'no url in community details'; ARlog('community details missing url for', wikiId); }
              } catch (e) { state.errors.wikiDetails = e && e.message ? e.message : String(e); ARlog('community details exception', wikiId, state.errors.wikiDetails); }
              renderInfoCell(cell, state);

              const cached = __AR_siteinfoCache.get(String(wikiId));
              if (cached) {
                state.articles = cached.articles;
                state.activeusers = cached.activeusers;
                state.admins = cached.admins;
                renderInfoCell(cell, state);
                tr.setAttribute('data-ar-moreinfo-done', String(wikiId));
                return sleep(THROTTLE_ROW_MS);
              }

              if (state.wikiUrl) {
                const cbName = '__AR_siteinfo_cb_' + wikiId + '_' + Math.random().toString(36).slice(2);
                const apiBase = buildWikiUrl(state.wikiUrl, '/api.php');
                if (!apiBase) {
                  state.errors.wikiUrl = 'cannot derive origin';
                  ARlog('cannot derive origin for', wikiId, state.wikiUrl);
                  renderInfoCell(cell, state);
                  tr.setAttribute('data-ar-moreinfo-done', String(wikiId));
                  return sleep(THROTTLE_ROW_MS);
                }

                const jsonpUrl =
                  apiBase +
                  '?action=query&format=json&meta=siteinfo&siprop=statistics&callback=' +
                  encodeURIComponent(cbName);

                ARlog('JSONP siteinfo for', wikiId, jsonpUrl, 'callback', cbName);

                return jsonpFetch(jsonpUrl, cbName, JSONP_TIMEOUT_MS)
                  .then(res => {
                    if (res && res.data && res.data.query && res.data.query.statistics) {
                      const s = res.data.query.statistics;
                      state.articles = s.articles !== undefined ? s.articles : (s.pages !== undefined ? s.pages : undefined);
                      state.activeusers = s.activeusers !== undefined ? s.activeusers : undefined;
                      state.admins = s.admins !== undefined ? s.admins : undefined;

                      __AR_siteinfoCache.set(String(wikiId), {
                        articles: state.articles,
                        activeusers: state.activeusers,
                        admins: state.admins
                      });

                      ARlog('JSONP siteinfo ok', wikiId, { articles: state.articles, activeusers: state.activeusers, admins: state.admins });
                    } else {
                      state.errors.siteinfo = 'siteinfo returned unexpected structure';
                      ARlog('siteinfo unexpected', wikiId, res);
                    }
                  })
                  .catch(jsonpErr => {
                    state.errors.siteinfo = jsonpErr && jsonpErr.message ? jsonpErr.message : 'JSONP failed';
                    ARlog('JSONP siteinfo error for', wikiId, state.errors.siteinfo);
                  })
                  .then(() => {
                    renderInfoCell(cell, state);
                    tr.setAttribute('data-ar-moreinfo-done', String(wikiId));
                    return sleep(THROTTLE_ROW_MS);
                  });
              } else {
                state.errors.siteinfo = 'wikiUrl unavailable';
                renderInfoCell(cell, state);
                tr.setAttribute('data-ar-moreinfo-done', String(wikiId));
                return sleep(THROTTLE_ROW_MS);
              }
            });
          });
        }, Promise.resolve());
      });
    }).then(() => {
      ARlog('updateMoreInfo finished');
    });
  }

  function isTableOrPaginationClick(e) {
    const t = e && e.target;
    if (!t || !t.closest) return false;

    const pagination =
      t.closest('[data-testid*="pagination"]') ||
      t.closest('nav[aria-label*="Pagination"]') ||
      t.closest('button[aria-label*="Next"]') ||
      t.closest('button[aria-label*="Previous"]') ||
      t.closest('button[aria-label*="page"]') ||
      t.closest('a[aria-label*="page"]');

    return !!pagination;
  }


  function installRowObserver() {
    const table = document.querySelector('table[data-testid="admin-requests-review-sortable-table"]');
    if (!table) return null;
    const tbody = table.querySelector('tbody');
    if (!tbody) return null;

    let obsTimer = null;
    const obs = new MutationObserver(() => {
      clearTimeout(obsTimer);
      obsTimer = setTimeout(() => runUpdateMoreInfo(), 200);
    });
    obs.observe(tbody, { childList: true, subtree: false });
    return obs;
  }

  (function init() {
    let tries = 0;
    const t = setInterval(() => {
      const table = document.querySelector('table[data-testid="admin-requests-review-sortable-table"]');
      tries++;
      if (table || tries > 80) {
        clearInterval(t);
        if (table) runUpdateMoreInfo(); else ARlog('table not found after polling');

        try {
          if (__AR_rowObserver) { try { __AR_rowObserver.disconnect(); } catch (e) {} }
          __AR_rowObserver = installRowObserver();
        } catch (e) {}
      }
    }, 150);

    let timer = null;
    const schedule = () => { clearTimeout(timer); timer = setTimeout(runUpdateMoreInfo, 350); };

    document.body.addEventListener('click', (e) => {
      if (isTableOrPaginationClick(e)) schedule();
    }, true);

    setInterval(() => {
      const href = location.href;
      if (href === __AR_lastHref) return;
      __AR_lastHref = href;

      if (__AR_rowObserver) { try { __AR_rowObserver.disconnect(); } catch (e) {} }
      __AR_rowObserver = null;

      let tries2 = 0;
      const t2 = setInterval(() => {
        tries2++;
        const table2 = document.querySelector('table[data-testid="admin-requests-review-sortable-table"]');
        if (table2 || tries2 > 80) {
          clearInterval(t2);
          if (table2) {
            try { __AR_rowObserver = installRowObserver(); } catch (e) {}
            runUpdateMoreInfo();
          }
        }
      }, 150);
    }, 300);
  })();

})();