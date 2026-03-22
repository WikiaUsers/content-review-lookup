mw.loader.using([
    'mediawiki.util'
]).then(function () {

    // Load scripts FIRST
    $.getScript('https://unpkg.com/leaflet/dist/leaflet.js', function () {
        $.getScript('https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js', initMap);
    });

    // Load CSS
    mw.util.addCSS('@import url("https://unpkg.com/leaflet/dist/leaflet.css");');
    mw.util.addCSS('@import url("https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css");');

    function initMap() {

        if (!document.getElementById("custom-map")) return;

        // ===== DATA =====
        const mapData = {
            mapImage: "https://static.wikia.nocookie.net/wandering-sword/images/2/2d/World_Map_2.png",
            mapBounds: [[0,0],[1187,2113]],

            categories: [
                { id: "2", name: "Chest", icon: "https://static.wikia.nocookie.net/wandering-sword/images/b/b3/Chest.png/revision/latest?cb=20260316205911" },
                { id: "3", name: "Manual", icon: "https://static.wikia.nocookie.net/wandering-sword/images/1/1e/Map_Manual.png/revision/latest?cb=20260317083435" }
            ],

            markers: [
                {
                    id: "1",
                    categoryId: "2",
                    position: [755,1627],
                    title: "Fire Dragon Sword",
                    checklist: ["Find entrance","Defeat guardian","Loot chest"]
                }
            ]
        };

        // ===== MAP =====
        const map = L.map('custom-map', {
            crs: L.CRS.Simple,
            minZoom: 0,
            maxZoom: 3
        });

        const bounds = mapData.mapBounds;

        L.imageOverlay(mapData.mapImage, bounds).addTo(map);
        map.fitBounds(bounds);
        map.setMinZoom(map.getZoom());
        map.setMaxBounds(bounds);
        map.options.maxBoundsViscosity = 1.0;

        map.on('dragend', () => map.panInsideBounds(bounds));

        // ===== ICON =====
        function getIcon(url) {
            return L.icon({
                iconUrl: url,
                iconSize: [32,32],
                iconAnchor: [16,32]
            });
        }

        // ===== CLUSTER =====
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
            sidebar.innerHTML = "";

            mapData.markers.forEach(m => {

                if (filterIds && !filterIds.includes(m.categoryId)) return;

                const cat = mapData.categories.find(c => c.id === m.categoryId);
                const icon = getIcon(cat.icon);

                const marker = L.marker(m.position, { icon });

                marker.bindPopup(`
                    <b>${m.title}</b><br>
                    ${createChecklist(m.id, m.checklist)}
                `);

                markersCluster.addLayer(marker);

                const item = document.createElement("div");
                item.innerText = m.title;

                item.onclick = () => {
                    map.setView(m.position, map.getMaxZoom());
                    marker.openPopup();
                };

                sidebar.appendChild(item);
            });
        }

        renderMarkers();

        // ===== FILTER =====
        const filterPanel = document.getElementById("filters");

        mapData.categories.forEach(cat => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" checked value="${cat.id}"> ${cat.name}`;
            filterPanel.appendChild(label);
        });

        document.querySelector(".filter-btn").onclick = () => {
            filterPanel.style.display =
                filterPanel.style.display === "block" ? "none" : "block";
        };

        filterPanel.addEventListener("change", () => {
            const active = [...filterPanel.querySelectorAll("input:checked")].map(i => i.value);
            renderMarkers(active);
        });

        // ===== CHECKLIST =====
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

});

// --------------------------------------------------------------------------------------------
//
$(function () {

    const emulatorURL = 'https://vik22.altervista.org/WS_Builds/index.php';

    function loadFrame(el) {

        if (el.classList.contains('loaded')) return;

        const iframe = document.createElement('iframe');
        iframe.src = emulatorURL;
        iframe.width = "100%";
        iframe.height = "600";
        iframe.loading = "lazy";
        iframe.sandbox = "allow-scripts allow-same-origin";

        el.classList.add('loaded');
        el.innerHTML = "";
        el.appendChild(iframe);
    }

    mw.hook('wikipage.content').add(function ($content) {

        const frames = $content.find('.EmulatorFrame:not(.observer-set)');

        frames.each(function () {

            const el = this;
            el.classList.add('observer-set');

            const observer = new IntersectionObserver((entries, obs) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        loadFrame(el);
                        obs.disconnect();

                    }

                });

            }, {
                rootMargin: "200px"
            });

            observer.observe(el);

        });

    });

});


// --------------------------------------------------------------------------------------------
//
const statsData={
yin:{STR:2,CON:3,AGI:1,HP:20,MP:10,ATK:2,DEF:4,CRIT:1},
yang:{STR:5,CON:2,AGI:2,HP:15,MP:5,ATK:5,DEF:1,CRIT:2},
conception:{STR:1,CON:4,AGI:1,HP:25,MP:20,ATK:1,DEF:3,CRIT:0},
girdle:{STR:3,CON:2,AGI:4,HP:10,MP:8,ATK:3,DEF:2,CRIT:3},
governing:{STR:4,CON:4,AGI:2,HP:18,MP:12,ATK:4,DEF:4,CRIT:1},
penetrating:{STR:2,CON:1,AGI:5,HP:8,MP:10,ATK:3,DEF:1,CRIT:5}
};

document.querySelectorAll(".node").forEach(node=>{

node.onclick=()=>{

let meridian=node.dataset.meridian;

openMeridian(meridian);

};

});

function openMeridian(name){

document.getElementById("wheel").style.display="none";

let screen=document.getElementById("mapScreen");

screen.style.display="block";

document.querySelector(".map-title").innerText=name.toUpperCase()+" MERIDIAN";

loadMap(name);

updateStats(name);

}

function loadMap(name){

let container=document.querySelector(".map-container");

container.innerHTML="Loading "+name+" map...";

fetch(name+".json")
.then(r=>r.json())
.then(data=>{

container.innerHTML="<pre>"+JSON.stringify(data,null,2)+"</pre>";

});

}

function updateStats(name){

let stats=statsData[name];

for(let s in stats){

document.getElementById(s).innerText=stats[s];

}

}

document.querySelector(".reset").onclick=()=>{

document.getElementById("mapScreen").style.display="none";

document.getElementById("wheel").style.display="block";

};