// ===== Standalone Tooltips =====
(function() {    
    function processTooltips(container) {        
        if (typeof mw === 'undefined' || typeof mw.html === 'undefined') return;
        const triggers = (container || document).querySelectorAll('.advanced-tooltip, .tooltips-init-complete, [data-title]');
        triggers.forEach((trigger) => {            
            if (trigger.id === 'ot-sdk-btn-floating' || trigger.classList.contains('ot-floating-button')) return;            
            if (trigger.classList.contains('standalone-tooltip-active')) return;            
            trigger.classList.add('standalone-tooltip-active');            
            const title = trigger.getAttribute('data-title') || 'SCP-035';            
            const imageFile = trigger.getAttribute('data-image') || '035AnimatedRender.gif';            
            const description = trigger.getAttribute('data-description') || '';            
            const popup = document.createElement('div');            
            popup.className = 'tooltip-contents scp-card';            
            const imgId = 'tooltip-img-' + Math.random().toString(36).substring(2, 9);            
            popup.innerHTML = `            
            <div class="scp-card-container">                
                <div class="scp-card-image tooltip-img-fit">                    
                    <img id="${imgId}" src="" alt="${mw.html.escape(title)}" />                
                </div>                
                <div class="scp-card-content">                    
                    <div class="scp-card-title">${mw.html.escape(title)}</div>                    
                    <div class="scp-card-description">${mw.html.escape(description)}</div>                
                </div>            
            `;            
            trigger.appendChild(popup);            
            let cachedImageUrl = '';            
            const cleanFileName = imageFile.replace(/^(File:|Image:)/i, '');            
            
            fetch(`/api.php?action=query&titles=File:${encodeURIComponent(cleanFileName)}&prop=imageinfo&iiprop=url&format=json`)                
                .then(res => res.json())                
                .then(data => {                    
                    const pages = data.query?.pages || {};                    
                    const pageId = Object.keys(pages)[0];                    
                    if (pageId && pageId !== "-1" && pages[pageId].imageinfo) {                        
                        cachedImageUrl = pages[pageId].imageinfo[0].url;                        
                        const imgElem = document.getElementById(imgId);                        
                        if (imgElem) imgElem.src = cachedImageUrl;                    
                    }                })                
                .catch(err => console.error("Error fetching image URL:", err));            
            
            trigger.addEventListener('mouseenter', () => {                
                popup.classList.add('is-active');                
                const imgElem = document.getElementById(imgId);                
                if (imgElem && cachedImageUrl) {                    
                    const delimiter = cachedImageUrl.includes('?') ? '&' : '?';                    
                    imgElem.src = cachedImageUrl + delimiter + 't=' + new Date().getTime();                
                }            });            
            trigger.addEventListener('mouseleave', () => {                
                popup.classList.remove('is-active');            });        });    }

    if (typeof $!== 'undefined') {$(function() { processTooltips(); });
    }
})();

if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('ppreview.show').add(function(popup) {    
        var $popup = $(popup);$popup.css({            'background-color': '#000000',            'background': '#000000',            'border': '1px solid #333333',            'color': '#ffffff'        });        
        $popup.find('.npage-preview-title, h3, a').css({            'color': '#ffffff'        });    });
}

importArticles({    
    type: 'script',    
    articles: [        
        'u:dev:MediaWiki:ArticlePreview.js'    ]
});

// ===== Widget Test =====
window.scpCharacters = {
    "the-prisoner": { id: "the-prisoner", title: "Emily", subtitle: "The Prisoner", icon: "", desc: "Takes the appearance of a female Robloxian with blonde hair and pale skin. Wields a baseball bat and carries a pizza slice." },
    "scp-073": { id: "scp-073", title: "SCP-073", subtitle: "Cain", icon: "", desc: "A heavily modified humanoid with cybernetic limbs. Any damage inflicted upon him is immediately reflected back at the attacker." },
    "scp-079": { id: "scp-079", title: "SCP-079", subtitle: "Old AI", icon: "", desc: "An artificial intelligence continuously evolving on an Exidy Sorcerer microcomputer from 1978." },
    "scp-105": { id: "scp-105", title: "Iris Thompson", subtitle: "Iris Thompson", icon: "", desc: "A human female capable of reaching into and manipulating objects shown in photographs taken with her camera." },
    "scp-106": { id: "scp-106", title: "SCP-106", subtitle: "The Old Man", icon: "", desc: "An elderly humanoid capable of phasing through solid matter and dragging prey into its corrosive pocket dimension." },
    "scp-035": { id: "scp-035", title: "SCP-035", subtitle: "Possessive Mask", icon: "", desc: "A highly corrosive porcelain comedy mask that mentally forces nearby individuals to put it on." },
    "jacob": { id: "jacob", title: "Jacob", subtitle: "Survivor", icon: "", desc: "A key operative navigating the subterranean hazards of the containment breach." },
    "robert": { id: "robert", title: "Robert", subtitle: "Field Technician", icon: "", desc: "Personnel member skilled in maintaining mechanical and digital infrastructure within containment zones." },
    "pietro-wilson": { id: "pietro-wilson", title: "Pietro Wilson", subtitle: "SCP-5000 Protagonist", icon: "", desc: "An exclusion suit operative who traversed a hostile world to reset the timeline." },
    "scp-835-jp": { id: "scp-835-jp", title: "SCP-835-JP", subtitle: "Keter Class Entity", icon: "", desc: "An anomalous phenomenon whose cognitive hazardous nature requires strict containment." },
    "epsilon-11": { id: "epsilon-11", title: "Epsilon-11", subtitle: "Nine-Tailed Fox", icon: "", desc: "Mobile Task Force designated to re-contain escaped anomalies and secure facility sites." },
    "gru-p": { id: "gru-p", title: "GRU-P", subtitle: "Division P", icon: "", desc: "The Soviet Union's psychotronics division responsible for securing anomalous artifacts." },
    "scp-173": { id: "scp-173", title: "SCP-173", subtitle: "The Sculpture", icon: "", desc: "A rebar and concrete sculpture that moves at lethal speeds when direct eye contact is broken." },
    "scp-049": { id: "scp-049", title: "SCP-049", subtitle: "Plague Doctor", icon: "", desc: "Humanoid entity wearing traditional plague doctor attire, obsessed with curing 'The Pestilence'." },
    "scp-096": { id: "scp-096", title: "SCP-096", subtitle: "The 'Shy Guy'", icon: "", desc: "A tall, emaciated humanoid that enters a rage state if its face is viewed directly." },
    "scp-076": { id: "scp-076", title: "SCP-076", subtitle: "Able", icon: "", desc: "An immortal warrior resurrected from a stone sarcophagus with superhuman strength." },
    "scp-3008": { id: "scp-3008", title: "SCP-3008", subtitle: "Infinite IKEA", icon: "", desc: "Endless interior retail space containing aggressive faceless employees." },
    "scp-682": { id: "scp-682", title: "SCP-682", subtitle: "Hard-to-Destroy Reptile", icon: "", desc: "Immensely powerful reptile-like creature capable of rapid adaptation to any lethal threat." },
    "scp-457": { id: "scp-457", title: "SCP-457", subtitle: "Burning Man", icon: "", desc: "A sentient flame entity that grows larger and more dangerous as it consumes fuel." },
    "scp-058": { id: "scp-058", title: "SCP-058", subtitle: "Heart of Darkness", icon: "", desc: "Bovine heart-like organism with arthropod limbs speaking in obscure poetic prose." },
    "scp-1529": { id: "scp-1529", title: "SCP-1529", subtitle: "King of the Mountain", icon: "", desc: "Humanoid entity hunting mountaineers near the summit of Mount Everest." }
};

function initSCPWidget() {    
    const listContainer = document.getElementById('bwTourList');    
    if (!listContainer) return; 
    
    console.log("SCP Widget: Container found, rendering cards...");
    const charKeys = Object.keys(window.scpCharacters);    
    let currentIndex = 0;    
    
    function renderTourList() {        
        listContainer.innerHTML = '';                
        charKeys.forEach((key) => {            
            const char = window.scpCharacters[key];            
            const itemEl = document.createElement('div');            
            itemEl.className = 'bw-tourItem';            
            itemEl.style.cssText = 'padding: 8px 12px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff;';            
            itemEl.innerHTML = `<span style="font-weight: bold;">${char.title}</span> <span style="opacity: 0.7; font-size: 0.85em;">(${char.subtitle})</span>`;            
            itemEl.addEventListener('click', () => {                
                setFeaturedCharacter(char.id);            });            
            listContainer.appendChild(itemEl);        });    }    
    
    function setFeaturedCharacter(id) {        
        const char = window.scpCharacters[id];        
        if (!char) return;                
        const subEl = document.getElementById('bwFeatSub');        
        const titleEl = document.getElementById('bwFeatTitle');        
        const descEl = document.getElementById('bwFeatDesc');                
        if (subEl) subEl.textContent = char.subtitle;        
        if (titleEl) titleEl.textContent = char.title;        
        if (descEl) descEl.textContent = char.desc;                
        currentIndex = charKeys.indexOf(id);    }    
    
    const shuffleBtn = document.getElementById('bwShuffleBtn');    
    if (shuffleBtn) {        
        shuffleBtn.onclick = (e) => {            
            e.stopPropagation();            
            currentIndex = (currentIndex + 1) % charKeys.length;            
            setFeaturedCharacter(charKeys[currentIndex]);        };    }    
    
    const atlasBtn = document.getElementById('bwAtlasBtn');    
    if (atlasBtn) {        
        atlasBtn.onclick = () => {            
            alert("Redirecting to Wanderer's Library...");        };    }    
    
    renderTourList();
}

window.initSCPWidget = initSCPWidget;

if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(function($content) {
        initSCPWidget();
    });
}
function autoInitWidget() {
    let attempts = 0;
    const checkInterval = setInterval(function() {
        attempts++;
        const container = document.getElementById('bwTourList');
        if (container && window.scpCharacters) {
            clearInterval(checkInterval);
            initSCPWidget(); 
        } else if (attempts > 25) {
            clearInterval(checkInterval);
        }
    }, 200);
}

if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(autoInitWidget);
} else {
    autoInitWidget();
}