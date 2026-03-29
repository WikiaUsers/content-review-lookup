/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Translator/Translator.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YouTubeModal/code.js'
    ]
});

// --------------------------------------------------------------------------------------------
// Other import
mw.loader.load('/index.php?title=MediaWiki:WSBuildEditor.js&action=raw&ctype=text/javascript');

// --------------------------------------------------------------------------------------------
// Site-wide floating buttons (Discord, YouTube, Steam)
(function () {
    const header = document.querySelector('.fandom-community-header__top-container');
    if (!header) return;

    const buttons = [
        {
            id: 'steam-btn',
            url: 'https://store.steampowered.com/app/1876890/Wandering_Sword/'
        },
        {
            id: 'youtube-btn',
            url: 'https://www.youtube.com/@wanderingsword2893/videos'
        },
        {
            id: 'discord-header-btn',
            url: 'https://discord.com/channels/974263216186212422/974263216651763738'
        },
        {
            id: 'x-btn',
            url: 'https://x.com/WanderingSwordG'
        }
    ];

    buttons.forEach(btn => {
        if (document.getElementById(btn.id)) return;

        const link = document.createElement('a');
        link.id = btn.id;
        link.href = btn.url;
        link.target = '_blank';

        header.appendChild(link);
    });
})();

// --------------------------------------------------------------------------------------------
//
mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function () {
    $(document).ready(function () {
        if (!$('#custom-map').length) return;

        $.getScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', function () {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
            });

            $.getScript('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js', function () {
                mw.util.addCSS(`
                    @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
                    @import url('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css');
                    @import url('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css');
                `);

                new mw.Api().get({
                    action: 'query',
                    titles: 'Map:World_Map',
                    prop: 'revisions',
                    rvprop: 'content',
                    format: 'json'
                }).done(function (res) {
                    const page = Object.values(res.query.pages)[0];
                    if (!page.revisions || !page.revisions[0]) return;
                    const mapData = JSON.parse(page.revisions[0]['*']);
                    initCustomMap(mapData);
                });
            });
        });
    });
});

function initCustomMap(mapData) {
    const map = L.map('custom-map', {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 4,
        maxBoundsViscosity: 1.0
    });

    const imageUrl = 'https://static.wikia.nocookie.net/wandering-sword/images/2/2d/World_Map_2.png/revision/latest';
    const bounds = [[0, 0], [1187, 2113]];

    L.imageOverlay(imageUrl, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

    const markersCluster = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 50
    });
    map.addLayer(markersCluster);

    const api = new mw.Api();
    const imageCache = {};
    const allMarkers = [];
    let completedMarkers = JSON.parse(localStorage.getItem('wanderingSword_completed') || '[]');

    function updateFilterCounts() {
        const total = mapData.markers.length;
        const completed = completedMarkers.length;
        const incomplete = total - completed;

        const completeEl = document.querySelector('.interactive-maps__filter-progress--disabled .interactive-maps__filter-value');
        const incompleteEl = document.querySelector('.interactive-maps__filter-progress[data-testid="marker-progress-filter-incomplete"] .interactive-maps__filter-value');

        if (completeEl) completeEl.textContent = completed;
        if (incompleteEl) incompleteEl.textContent = incomplete;
    }

    function applyFilters() {
        const checkedInputs = document.querySelectorAll('.interactive-maps__filter input[type="checkbox"]:checked');
        const checkedCategories = Array.from(checkedInputs)
            .map(el => el.value)
            .filter(val => !isNaN(val));

        const incompleteCheckbox = document.querySelector('#wds-checkbox-2');
        const showIncomplete = incompleteCheckbox ? incompleteCheckbox.checked : false;

        markersCluster.clearLayers();
        let visibleCompleted = 0;
        let visibleIncomplete = 0;

        allMarkers.forEach(obj => {
            const isCompleted = completedMarkers.includes(obj.markerId);
            const categoryMatch = checkedCategories.length === 0 ||
                checkedCategories.includes(String(obj.categoryId));
            const progressMatch = isCompleted ? true : showIncomplete;

            if (categoryMatch && progressMatch) {
                markersCluster.addLayer(obj.marker);
                if (isCompleted) visibleCompleted++;
                else visibleIncomplete++;
            }
        });

        const completeEl = document.querySelector('.interactive-maps__filter-progress--disabled .interactive-maps__filter-value');
        const incompleteEl = document.querySelector('[data-testid="marker-progress-filter-incomplete"] .interactive-maps__filter-value');
        if (completeEl) completeEl.textContent = visibleCompleted;
        if (incompleteEl) incompleteEl.textContent = visibleIncomplete;
    }

    function resolveImage(fileName) {
        return new Promise(resolve => {
            if (!fileName) return resolve('');
            const clean = fileName.replace(/^File:/i, '').trim();
            if (imageCache[clean]) return resolve(imageCache[clean]);
            api.get({
                action: 'query',
                titles: 'File:' + clean,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            }).done(res => {
                const page = Object.values(res.query.pages)[0];
                if (page.imageinfo && page.imageinfo[0]) {
                    const url = page.imageinfo[0].url;
                    imageCache[clean] = url;
                    resolve(url);
                } else {
                    resolve('');
                }
            }).fail(() => resolve(''));
        });
    }

    function resolveIcon(fileName) {
        return new Promise(resolve => {
            if (!fileName) return resolve(null);
            const clean = fileName.replace(/^File:/i, '').trim();
            if (imageCache[clean]) {
                return resolve(L.icon({
                    iconUrl: imageCache[clean],
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                }));
            }
            api.get({
                action: 'query',
                titles: 'File:' + clean,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            }).done(res => {
                const page = Object.values(res.query.pages)[0];
                if (page.imageinfo && page.imageinfo[0]) {
                    const url = page.imageinfo[0].url;
                    imageCache[clean] = url;
                    resolve(L.icon({
                        iconUrl: url,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32]
                    }));
                } else {
                    resolve(null);
                }
            }).fail(() => resolve(null));
        });
    }

    mapData.markers.forEach(m => {
        const cat = mapData.categories.find(c => c.id === m.categoryId);
        if (!cat) return;

        const p = m.popup || {};
        const title = p.title || cat.name || 'Location';
        const markerId = m.id || `marker-${Math.floor(m.position[0])}-${Math.floor(m.position[1])}`;

        Promise.all([resolveIcon(cat.icon), resolveImage(p.image)]).then(([icon, imgSrc]) => {
            if (!icon) return;

            const marker = L.marker([m.position[1], m.position[0]], { icon });
            allMarkers.push({ marker, categoryId: m.categoryId, markerId });

            const linkHref = p.link && p.link.url
                ? `https://wandering-sword.fandom.com/wiki/${encodeURIComponent(p.link.url)}`
                : '#';
            const linkText = (p.link && p.link.label) ? p.link.label : title;

            const popupHTML = `
<div style="width:300px;">
  <div class="MarkerPopup-module_popup__eNi--">
    <div class="MarkerPopup-module_content__9zoQq">
      <div class="MarkerPopup-module_contentTopContainer__qgen9">
        <div class="MarkerPopup-module_title__7ziRt">${title}</div>
      </div>
      <div class="MarkerPopup-module_scrollableContent__0N5PS">
        ${imgSrc ? `<div class="MarkerPopup-module_descriptionImageContent__j88zb"><img class="MarkerPopup-module_image__7I5s4" src="${imgSrc}" style="width:100%;margin-top:8px;"></div>` : ''}
        ${linkHref !== '#' ? `
          <div class="MarkerPopup-module_link__f59Lh">
            <svg class="wds-icon wds-icon-tiny MarkerPopup-module_linkIcon__q3Rbd"><use xlink:href="#wds-icons-link-tiny"></use></svg>
            <a href="${linkHref}" target="_blank" rel="noopener noreferrer">${linkText}</a>
          </div>` : ''}
        <div>
          <button class="wds-button wds-button MarkerProgressButtons-module_progressMarkerButton__hX8bo wds-is-full-width"
                  data-testid="marker-progress-tracking-button-complete"
                  type="button">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="18" height="18" style="margin-right:8px;">
              <defs>
                <path id="IconCheckboxEmpty__a" d="M3 21h18V3H3v18zM22 1H2a1 1 0 00-1 1v20a1 1 0 001 1h20a1 1 0 001-1V2a1 1 0 00-1-1z"></path>
                <path id="IconCheckbox__a" d="M3 21h18V3H3v18zM22 1H2a1 1 0 00-1 1v20a1 1 0 001 1h20a1 1 0 001-1V2a1 1 0 00-1-1zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </defs>
              <use xlink:href="#IconCheckboxEmpty__a" fill-rule="evenodd"></use>
            </svg>
            Mark as complete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;

            marker.bindPopup(popupHTML, { maxWidth: 320, className: 'wandering-sword-popup' });
            markersCluster.addLayer(marker);

            // ─────────────────────────────────────────────────────────────
            // FIXED POPUP HANDLER — no more random button, no popup close
            // ─────────────────────────────────────────────────────────────
            marker.on('popupopen', function () {
                let btn = document.querySelector('button[data-testid="marker-progress-tracking-button-complete"]');
                if (!btn) return;

                // Clone + remove Fandom's data-testid so it stops hijacking
                const newBtn = btn.cloneNode(true);
                newBtn.removeAttribute('data-testid');   // ← prevents Fandom from touching it again
                btn.parentNode.replaceChild(newBtn, btn);

                // Force correct initial state (native map = everything incomplete)
                const isCompleted = completedMarkers.includes(markerId);
                const useEl = newBtn.querySelector('use');
                if (isCompleted) {
                    useEl.setAttribute('xlink:href', '#IconCheckbox__a');
                    newBtn.lastChild.nodeValue = ' Completed';
                } else {
                    useEl.setAttribute('xlink:href', '#IconCheckboxEmpty__a');
                    newBtn.lastChild.nodeValue = ' Mark as complete';
                }

                newBtn.addEventListener('click', function (e) {
                    e.stopImmediatePropagation();   // stop Fandom from interfering

                    let completed = JSON.parse(localStorage.getItem('wanderingSword_completed') || '[]');
                    const wasCompleted = completed.includes(markerId);

                    if (wasCompleted) {
                        completed = completed.filter(id => id !== markerId);
                        useEl.setAttribute('xlink:href', '#IconCheckboxEmpty__a');
                        newBtn.lastChild.nodeValue = ' Mark as complete';
                    } else {
                        completed.push(markerId);
                        useEl.setAttribute('xlink:href', '#IconCheckbox__a');
                        newBtn.lastChild.nodeValue = ' Completed';
                    }

                    localStorage.setItem('wanderingSword_completed', JSON.stringify(completed));
                    completedMarkers = completed;

                    updateFilterCounts();
                    applyFilters();
                });
            });
        });
    });

    document.addEventListener('change', function (e) {
        if (e.target.matches('.interactive-maps__filters-dropdown input[type="checkbox"]')) {
            applyFilters();
        }
    });

    setTimeout(updateFilterCounts, 800);
    setTimeout(applyFilters, 900);
    console.log('✅ Clean progress button — fixed click + filter sync');
}

// --------------------------------------------------------------------------------------------
//
document.getElementById('Edit').innerHTML = `
<div class="leaflet-top leaflet-right">
  <div class="leaflet-control">
    <div class="wds-dropdown interactive-maps__options-dropdown interactive-maps__edit-control">
      <div class="wds-dropdown__toggle" role="button">
        <button type="button" class="wds-button" style="">
          <svg class="wds-icon wds-icon-small">
            <use xlink:href="#wds-icons-more-small"></use>
          </svg>
        </button>
      </div>
      <div class="wds-dropdown__content wds-is-right-aligned wds-is-not-scrollable">
        <ul class="wds-list wds-is-linked">
          <li>
            <a class="interactive-maps__edit-control-link" href="https://wandering-sword.fandom.com/wiki/Map:World_Map?action=mapedit" data-option="edit-map" title="Edit map" target="_blank" rel="noreferrer noopener" style="outline-style: none;">
              <svg class="wds-icon wds-icon-small wds-icons-pencil-small">
                <use xlink:href="#wds-icons-pencil-small"></use>
              </svg>
              <span>Edit map</span>
            </a>
          </li>
          <li>
            <a class="interactive-maps__edit-control-link" href="https://wandering-sword.fandom.com/wiki/Map:World_Map" data-option="go-to-map-page" title="Go To Map Page" target="_blank" rel="noreferrer noopener">
              <svg class="wds-icon wds-icon-small wds-icons-map-small">
                <use xlink:href="#wds-icons-map-small"></use>
              </svg>
              <span>Go To Map Page</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

document.querySelector('.filter-btn').innerHTML = `
<div class="interactive-maps__filters-list">
  <div class="interactive-maps__filters-dropdown">
    <div class="wds-dropdown" tabindex="0" role="button">
      <div class="wds-dropdown__toggle">
        <button type="button" data-testid="map-filter-dropdown-button" class="wds-pill-button interactive-maps__filters-dropdown-button wds-pill-button--with-icon" data-label="">
          <span class="wds-pill-button__icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="1em" height="1em" class="wds-icon wds-icon-tiny">
              <use xlink:href="#IconControlsTiny__a" fill-rule="evenodd"></use>
            </svg>
          </span>
          Filters
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="1em" height="1em" class="wds-icon wds-icon-tiny wds-pill-button__toggle-icon">
            <use xlink:href="#IconDropdownTiny__a" fill-rule="evenodd"></use>
          </svg>
        </button>
      </div>
      <div class="wds-dropdown__content wds-is-left-aligned wds-is-not-scrollable">
        <div class="interactive-maps__filters-dropdown-list" style="max-width: 320px;">
          <div class="interactive-maps__section">
            <div class="interactive-maps__section-label">Your Progress
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" class="interactive-maps__section-label-icon interactive-maps__section-label-icon--open">
                <path fill-rule="evenodd" d="M17.707 4.293a.999.999 0 00-1.414 0L9 11.586 1.707 4.293A.999.999 0 10.293 5.707l8 8a.997.997 0 001.414 0l8-8a.999.999 0 000-1.414"></path>
              </svg>
            </div>
            <div class="interactive-maps__section-content">
              <div class="interactive-maps__filter-progress interactive-maps__filter-progress--disabled" data-testid="marker-progress-filter-complete">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-1" disabled="" tabindex="0" value="complete" checked="">
                  <label for="wds-checkbox-1">Complete</label>
                </div>
                <span class="interactive-maps__filter-value">0</span>
              </div>
              <div class="interactive-maps__filter interactive-maps__filter-progress" data-testid="marker-progress-filter-incomplete">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-2" tabindex="0" value="incomplete" checked="">
                  <label for="wds-checkbox-2">Incomplete</label>
                </div>
                <span class="interactive-maps__filter-value">14</span>
              </div>
            </div>
          </div>
          <div class="interactive-maps__section">
            <div class="interactive-maps__section-label">Categories
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" class="interactive-maps__section-label-icon interactive-maps__section-label-icon--open">
                <path fill-rule="evenodd" d="M17.707 4.293a.999.999 0 00-1.414 0L9 11.586 1.707 4.293A.999.999 0 10.293 5.707l8 8a.997.997 0 001.414 0l8-8a.999.999 0 000-1.414"></path>
              </svg>
            </div>
            <div class="interactive-maps__section-content">
              <div class="interactive-maps__filter-all">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-3" tabindex="0" value="all" checked="">
                  <label for="wds-checkbox-3">Select All</label>
                </div>
              </div>
              <div class="interactive-maps__filter">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-4" tabindex="0" value="1" checked="">
                  <label for="wds-checkbox-4">
                    <span class="interactive-maps__filters-marker-icon MarkerIcon-module_icon__dNELM" style="width: 16px; height: 16px;">
                      <svg data-testid="marker-icon" viewBox="0 0 24 31" width="12.387096774193548" height="16" style="--marker-icon-color: #fa226a; min-width: 12.3871px; min-height: 16px;">
                        <path data-testid="marker-icon__main-path" fill-rule="evenodd" clip-rule="evenodd" d="M17.91 20.1A9.99 9.99 0 0012 2.03 10 10 0 006.09 20.1c1.88 1.42 4.53 3.65 5.14 7.25a.8.8 0 00.77.68c.39 0 .7-.3.77-.68.61-3.6 3.26-5.83 5.14-7.25z"></path>
                        <circle class="marker-circle" cx="12" cy="12" r="4" fill="#0E191A" fill-opacity=".5"></circle>
                      </svg>
                    </span>
                    <span class="interactive-maps__filter-category-name">General</span>
                  </label>
                </div>
              </div>
              <div class="interactive-maps__filter">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-5" tabindex="0" value="2" checked="">
                  <label for="wds-checkbox-5">
                    <span class="interactive-maps__filters-marker-icon MarkerIcon-module_icon__dNELM" style="width: 16px; height: 16px;">
                      <img alt="File:Chest.png" src="https://static.wikia.nocookie.net/wandering-sword/images/b/b3/Chest.png/revision/latest?cb=20260316205911" data-testid="interactive-maps-marker-icon-custom-marker" style="max-width: 16px; max-height: 16px;">
                    </span>
                    <span class="interactive-maps__filter-category-name">Chest</span>
                  </label>
                </div>
              </div>
              <div class="interactive-maps__filter">
                <div class="wds-checkbox">
                  <input type="checkbox" id="wds-checkbox-6" tabindex="0" value="3" checked="">
                  <label for="wds-checkbox-6">
                    <span class="interactive-maps__filters-marker-icon MarkerIcon-module_icon__dNELM" style="width: 16px; height: 16px;">
                      <img alt="File:Map Manual.png" src="https://static.wikia.nocookie.net/wandering-sword/images/1/1e/Map_Manual.png/revision/latest?cb=20260317083435" data-testid="interactive-maps-marker-icon-custom-marker" style="max-width: 16px; max-height: 16px;">
                    </span>
                    <span class="interactive-maps__filter-category-name">Manual</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;