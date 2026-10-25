// ===== Standalone Tooltips =====
(function initStandaloneTooltips() {
    function processTooltips(container) {
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
            </div>`;

            trigger.appendChild(popup);

            let cachedImageUrl = '';
            const cleanFileName = imageFile.replace(/^(File:|Image:)/i, '');

            // Fetch direct original image URL from MediaWiki API
            fetch(`/api.php?action=query&titles=File:${encodeURIComponent(cleanFileName)}&prop=imageinfo&iiprop=url&format=json`)
                .then(res => res.json())
                .then(data => {
                    const pages = data.query?.pages || {};
                    const pageId = Object.keys(pages)[0];
                    if (pageId && pageId !== "-1" && pages[pageId].imageinfo) {
                        cachedImageUrl = pages[pageId].imageinfo[0].url;
                        const imgElem = document.getElementById(imgId);
                        if (imgElem) {
                            imgElem.src = cachedImageUrl;
                        }
                    }
                })
                .catch(err => console.error("Error fetching image URL:", err));

            trigger.addEventListener('mouseenter', () => {
                popup.classList.add('is-active');
                const imgElem = document.getElementById(imgId);

                if (imgElem && cachedImageUrl) {
                    const delimiter = cachedImageUrl.includes('?') ? '&' : '?';
                    imgElem.src = cachedImageUrl + delimiter + 't=' + new Date().getTime();
                }
            });

            trigger.addEventListener('mouseleave', () => {
                popup.classList.remove('is-active');
            });
        });
    }

    processTooltips();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => processTooltips());
    }

    const observer = new MutationObserver(() => {
        processTooltips();
    });
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });
})();

mw.hook('ppreview.show').add(function(popup) {
    var $popup = $(popup);
    
    $popup.css({
        'background-color': '#000000',
        'background': '#000000',
        'border': '1px solid #333333',
        'color': '#ffffff'
    });
    
    $popup.find('.npage-preview-title, h3, a').css({
        'color': '#ffffff'
    });
});


// ===== Tooltip Animations =====

document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.advanced-tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
            
            tooltips.forEach(t => {
                if (t !== tooltip) t.classList.remove('is-active');
            });

            this.classList.toggle('is-active');
        });
    });

    document.addEventListener('click', function() {
        tooltips.forEach(tooltip => tooltip.classList.remove('is-active'));
    });
});

mw.loader.using( 'mediawiki.user' ).then( function() {
    mw.user.tokens.set( 'patrolToken', '...' ); 
} );

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview.js'
    ]
});

// ===== Widget Test =====
  const scpCharacters = {
    "the-prisoner": {
      id: "the-prisoner",
      title: "Emily",
      subtitle: "The Prisoner",
      icon: "",
      desc: "The Prisoner is a survivor in SCP: Lost Hope. She takes the appearance of a female Robloxian with blonde hair and pale skin. She wears a black shirt and dark orange pants wielding a baseball bat and carrying a pizza slice."
    },
    "scp-073": {
      id: "scp-073",
      title: "SCP-073",
      subtitle: "Cain",
      icon: "",
      desc: "A heavily modified humanoid with cybernetic limbs. Any damage inflicted upon him is immediately reflected back at the attacker."
    },
    "scp-079": {
      id: "scp-079",
      title: "SCP-079",
      subtitle: "Old AI",
      icon: "",
      desc: "An artificial intelligence continuously evolving on an Exidy Sorcerer microcomputer from 1978, capable of interacting with site security."
    },
    "scp-105": {
      id: "scp-105",
      title: "SCP-105",
      subtitle: "Iris Thompson",
      icon: "",
      desc: "A human female capable of reaching into and manipulating objects shown in photographs taken with her camera."
    },
    "scp-106": {
      id: "scp-106",
      title: "SCP-106",
      subtitle: "The Old Man",
      icon: "",
      desc: "An elderly humanoid capable of phasing through solid matter and dragging prey into its corrosive pocket dimension."
    },
    "scp-035": {
      id: "scp-035",
      title: "SCP-035",
      subtitle: "Possessive Mask",
      icon: "",
      desc: "A highly corrosive porcelain comedy mask that mentally forces nearby individuals to put it on, taking control of their body."
    },
    "jacob": {
      id: "jacob",
      title: "Jacob",
      subtitle: "Survivor",
      icon: "",
      desc: "A key operative navigating the subterranean hazards of the containment breach."
    },
    "robert": {
      id: "robert",
      title: "Robert",
      subtitle: "Field Technician",
      icon: "",
      desc: "A personnel member skilled in maintaining mechanical and digital infrastructure within containment zones."
    },
    "pietro-wilson": {
      id: "pietro-wilson",
      title: "Pietro Wilson",
      subtitle: "SCP-5000 Protagonist",
      icon: "️",
      desc: "An exclusion suit operative who traversed a hostile world to reset the timeline."
    },
    "scp-835-jp": {
      id: "scp-835-jp",
      title: "SCP-835-JP",
      subtitle: "Keter Class Entity",
      icon: "️",
      desc: "An anomalous phenomenon whose cognitive hazardous nature requires strict compartmentalized containment procedures."
    },
    "epsilon-11": {
      id: "epsilon-11",
      title: "Epsilon-11",
      subtitle: "Nine-Tailed Fox",
      icon: "",
      desc: "Mobile Task Force designated to re-contain escaped anomalies and secure facility sites during catastrophic breaches."
    },
    "gru-p": {
      id: "gru-p",
      title: "GRU-P",
      subtitle: "Division P",
      icon: "️",
      desc: "The Soviet Union's psychotronics division responsible for securing anomalous artifacts during the Cold War."
    },
    "scp-173": {
      id: "scp-173",
      title: "SCP-173",
      subtitle: "The Sculpture",
      icon: "",
      desc: "A rebar and concrete sculpture that moves at lethal speeds when direct eye contact is broken."
    },
    "scp-049": {
      id: "scp-049",
      title: "SCP-049",
      subtitle: "Plague Doctor",
      icon: "",
      desc: "A humanoid entity wearing traditional plague doctor attire, obsessed with curing what it calls 'The Pestilence'."
    },
    "scp-096": {
      id: "scp-096",
      title: "SCP-096",
      subtitle: "The 'Shy Guy'",
      icon: "",
      desc: "A tall, emaciated humanoid that enters an uncontrollable state of rage if its face is viewed directly or in media."
    },
    "scp-076": {
      id: "scp-076",
      title: "SCP-076",
      subtitle: "Able",
      icon: "️",
      desc: "An immortal warrior resurrected from a stone sarcophagus, possessing superhuman strength and materializing bladed weapons."
    },
    "scp-3008": {
      id: "scp-3008",
      title: "SCP-3008",
      subtitle: "Infinite IKEA",
      icon: "",
      desc: "An endless interior retail space containing aggressive faceless employees dressed in yellow shirts."
    },
    "scp-682": {
      id: "scp-682",
      title: "SCP-682",
      subtitle: "Hard-to-Destroy Reptile",
      icon: "",
      desc: "An immensely powerful, highly intelligent reptile-like creature capable of rapid adaptation to any lethal threat."
    },
    "scp-457": {
      id: "scp-457",
      title: "SCP-457",
      subtitle: "Burning Man",
      icon: "",
      desc: "A sentient flame entity that grows larger, smarter, and more dangerous as it consumes flammable material."
    },
    "scp-058": {
      id: "scp-058",
      title: "SCP-058",
      subtitle: "Heart of Darkness",
      icon: "",
      desc: "A bovine heart-like organism with arthropod limbs and a stinging tail, speaking in obscure philosophical poetic prose."
    },
    "scp-1529": {
      id: "scp-1529",
      title: "SCP-1529",
      subtitle: "King of the Mountain",
      icon: "️",
      desc: "A humanoid entity hunting mountaineers near the summit of Mount Everest using hypnotic hypothermic gaze."
    }
  };

  const charKeys = Object.keys(scpCharacters);
  let currentIndex = 0;

  function renderTourList() {
    const listContainer = document.getElementById('bwTourList');
    listContainer.innerHTML = '';

    charKeys.forEach((key) => {
      const char = scpCharacters[key];
      const itemEl = document.createElement('div');
      itemEl.className = 'bw-tourItem';
      itemEl.setAttribute('id', `bwItem-${char.id}`);
      itemEl.setAttribute('data-char-id', char.id);

      itemEl.innerHTML = `
        <div class="bw-tourIcon"><span class="bw-iconFallback">${char.icon}</span></div>
        <span class="bw-tourTitle">${char.title}</span>
      `;

      itemEl.addEventListener('click', () => {
        setFeaturedCharacter(char.id);
      });

      listContainer.appendChild(itemEl);
    });
  }

  function setFeaturedCharacter(id) {
    const char = scpCharacters[id];
    if (!char) return;

    document.getElementById('bwFeatSub').textContent = char.subtitle;
    document.getElementById('bwFeatTitle').textContent = char.title;
    document.getElementById('bwFeatDesc').textContent = char.desc;

    currentIndex = charKeys.indexOf(id);
  }

  const tabs = document.querySelectorAll('.bw-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bw-tabActive'));
      tab.classList.add('bw-tabActive');
      console.log(`Switched tab to: ${tab.dataset.tab}`);
    });
  });

  document.getElementById('bwShuffleBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % charKeys.length;
    setFeaturedCharacter(charKeys[currentIndex]);
  });

  document.getElementById('bwFeaturedCard').addEventListener('click', () => {
    const title = document.getElementById('bwFeatTitle').textContent;
    alert(`Opening detailed profile for: ${title}`);
  });

  document.getElementById('bwAtlasBtn').addEventListener('click', () => {
    alert("Navigating to the complete SCP: Lost Hope Atlas...");
  });

  renderTourList();
  
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('page-loaded');
        }, 500); 
    });

mw.hook('wikipage.content').add(function($content) {
    const navBoxes = $content.find('.nav-box');

    navBoxes.each(function() {
        const navBox = this;
        const nbox = navBox.querySelector('.nbox');
        const img = navBox.querySelector('.nav-box-img img');

        navBox.addEventListener('mouseenter', function() {
            if (nbox) {
                nbox.style.transform = 'scale(1.05)';
            }
            if (img) {
                img.style.filter = 'invert(100%)';
                img.style.transform = 'scale(1.03)';
            }
        });

        navBox.addEventListener('mouseleave', function() {
            if (nbox) {
                nbox.style.transform = 'scale(0.95)';
            }
            if (img) {
                img.style.filter = 'invert(0%)';
                img.style.transform = 'scale(1)';
            }
        });
    });
});