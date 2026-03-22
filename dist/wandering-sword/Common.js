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

        // Load Leaflet
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
                    #custom-map { height: 600px; width: 100%; }
                `);

                // Fetch map data directly via API
                new mw.Api().get({
                    action: 'query',
                    titles: 'Map:World_Map',
                    prop: 'revisions',
                    rvprop: 'content',
                    format: 'json'
                }).done(function (res) {
                    const page = Object.values(res.query.pages)[0];
                    if (!page.revisions) {
                        console.error('No revision found for Map:World_Map');
                        return;
                    }
                    const raw = page.revisions[0]['*'];
                    const mapData = JSON.parse(raw);
                    createLeafletMap(mapData);
                }).fail(function (err) {
                    console.error('API fetch failed:', err);
                });
            });
        });
    });
});

function createLeafletMap(mapData) {
    const map = L.map('custom-map', {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 3,
        maxBoundsViscosity: 1.0
    });

    const bounds = mapData.mapBounds;
    L.imageOverlay(mapData.mapImage, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMinZoom(map.getZoom());
    map.setMaxBounds(bounds);
    map.on('dragend', () => map.panInsideBounds(bounds));

    const imageHeight = bounds[1][1];

    function getIcon(url) {
        return L.icon({
            iconUrl: url,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
    }

    const markersCluster = L.markerClusterGroup();
    map.addLayer(markersCluster);

    const sidebar = document.getElementById("sidebar");

    function createChecklist(id, items) {
        let saved = JSON.parse(localStorage.getItem(id) || "[]");
        return `
            <ul class="checklist" data-id="${id}">
                ${items.map((item, i) => `
                    <li data-index="${i}" class="${saved.includes(i) ? 'checked' : ''}">
                        ☐ ${item}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    function renderMarkers(filterIds = null) {
        markersCluster.clearLayers();
        if (sidebar) sidebar.innerHTML = "";

        mapData.markers.forEach(m => {
            if (filterIds && !filterIds.includes(m.categoryId)) return;
            const cat = mapData.categories.find(c => c.id === m.categoryId);
            if (!cat) return;

            const icon = getIcon(cat.icon);
            const flippedY = imageHeight - m.position[1];
            const marker = L.marker([flippedY, m.position[0]], { icon });

            marker.bindPopup(`
                <b>${m.title}</b><br>
                ${createChecklist(m.id, m.checklist)}
            `);

            markersCluster.addLayer(marker);

            if (sidebar) {
                const item = document.createElement("div");
                item.innerText = m.title;
                item.onclick = () => {
                    map.setView([flippedY, m.position[0]], map.getMaxZoom());
                    marker.openPopup();
                };
                sidebar.appendChild(item);
            }
        });
    }

    renderMarkers();

    const filterPanel = document.getElementById("filters");
    if (filterPanel && mapData.categories) {
        mapData.categories.forEach(cat => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" checked value="${cat.id}"> ${cat.name}`;
            filterPanel.appendChild(label);
        });

        document.querySelector(".filter-btn").onclick = () => {
            filterPanel.style.display = filterPanel.style.display === "block" ? "none" : "block";
        };

        filterPanel.addEventListener("change", () => {
            const active = [...filterPanel.querySelectorAll("input:checked")].map(i => i.value);
            renderMarkers(active);
        });
    }

    document.addEventListener("click", e => {
        const li = e.target.closest(".checklist li");
        if (!li) return;
        const ul = li.parentElement;
        const id = ul.dataset.id;
        const index = parseInt(li.dataset.index);
        let saved = JSON.parse(localStorage.getItem(id) || "[]");

        if (saved.includes(index)) {
            saved = saved.filter(i => i !== index);
            li.classList.remove("checked");
        } else {
            saved.push(index);
            li.classList.add("checked");
        }
        localStorage.setItem(id, JSON.stringify(saved));
    });
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