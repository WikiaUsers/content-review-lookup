(function() {
    const container = document.getElementById('guanai-scroll-container');
    if (!container) return;

    // =========================================================================
    // ZONE 1: THE IMPERIAL DATABASE (Content completely untouched)
    // =========================================================================

    const wikiContent = {
        "Home": {
            "Overview": "<span class='drop-cap'>W</span>elcome to <strong>Guān'ài</strong>. Beneath the shadow of the Great Wall, dynasties rise and fall. Unroll the archives to learn our ways and immerse yourself in the Middle Kingdom.",
            "Imperial Courier": {
                type: "courier",
                intro: "Annals of the Emperor's Will. Read the latest weekly decrees that shape our great Empire.",
                items: [
                    { week: "Week 1", date: "UNKOWN", title: "THE FIRST POST", text: "To be Written." }
                ]
            },
            "Credits": {
                type: "credits",
                intro: "The grand archives and the empire itself were forged by the dedicated hands of the few.",
                items: [
                    { role: "NICOZZ06", name: "Guān'ài Wiki Manager." }
                ],
                outro: "Glory to Guān'ài"
            }
        },
        "Lore": {
            "Summary": "<span class='drop-cap'>F</span>or centuries, the Empire has stood resolute against the ravages of time. While the Mandate of Heaven occasionally shifts, the foundation of the world remains rooted in our traditions.",
            "Battles": {
                type: "battles",
                intro: "The blood of our enemies waters the roots of the Empire. These are the official records of our greatest conflicts.",
                items: [
                    { name: "WE WON", date: "Today", location: "China", outcome: "Decisive Victory", status: "victory", desc: "To be Written." },
                    { name: "WE LOST", date: "Today", location: "China", outcome: "Tragic Civil War", status: "defeat", desc: "To be Written." },
                    { name: "STALEMATE", date: "Today", location: "China", outcome: "Stalemate", status: "stalemate", desc: "To be Written." }
                ]
            },
            "Events": {
                type: "events",
                intro: "The Empire never sleeps. We honor the spirits, the heavens, and our warriors alike in grand tradition.",
                items: [
                    { name: "FIRST EVENT", date: "Today", tag: "Celebration", desc: "To be Written." }
                ]
            },
            "Permadeath": "<span style='color:#b31b1b; font-weight:bold; font-size:24px;'>☠ THE CYCLE OF REBIRTH</span><br><br><blockquote class='imperial-quote'>Death in the Emperor's service can be final. If your character is executed by royal decree, they will be wiped from the registry.</blockquote>"
        },
        "Characters": {
            "Character Registration": {
                type: "registration",
                intro: "To enter the realm, you must formally register your existence. Fill out the Imperial form below, generate your writ, and hand the code to a Magistrate to be added to the official archives."
            },
            "Main Characters": {
                type: "roster",
                intro: "The pillars of the state. These figures command the absolute loyalty of Guān'ài. Click a portrait to open their dossier.",
                items: [
                    { name: "The Emperor", rank: "Supreme Ruler", player: "Roblox_Username", weapon: "Mandate of Heaven", province: "The Forbidden City", stats: "Str: ??? | Agi: ??? | Int: MAX", bio: "The Son of Heaven. His word is absolute law across the Middle Kingdom. Very little is known about his past before he ascended the throne, but his presence alone commands the utmost respect and terror from his subjects.", image: "linear-gradient(#4a110a, #1a0a05)" },
                    { name: "Grand General", rank: "Vanguard Commander", player: "WarLord99", weapon: "Heavy Guan Dao", province: "Northern Wastes", stats: "Str: MAX | Agi: High | Int: Mid", bio: "A battle-hardened veteran who survived the Siege of Blood River. He commands the Imperial armies with an iron fist and leads the Vanguard personally into the thickest fighting.", image: "linear-gradient(#6b4c1a, #1a1205)" },
                    { name: "Shadow Chancellor", rank: "Keeper of Secrets", player: "SilentLotus", weapon: "Hidden Needles", province: "Unknown", stats: "Str: Low | Agi: MAX | Int: MAX", bio: "Operates in the dark to ensure the Empire thrives in the light. The Chancellor controls a vast network of spies across all provinces.", image: "linear-gradient(#2a3b2c, #0d140e)" }
                ]
            },
            "Lore Characters": {
                type: "roster",
                intro: "Legends of the past whose names are carved into the ancestral shrines.",
                items: [
                    { name: "Sun Wukong", rank: "The Monkey King", player: "Mythological", weapon: "Ruyi Jingu Bang", province: "Mount Huaguo", stats: "Str: Divine | Agi: Divine | Int: High", bio: "A mythological figure who once challenged the heavens. Though considered a myth by many, artifacts belonging to his legacy have been found scattered across the Empire.", image: "linear-gradient(#b8860b, #5c4300)" }
                ]
            },
            "Custom Characters": {
                type: "roster",
                intro: "The legendary citizens of the realm. Fortunes are forged by the hands of the brave.",
                items: [
                    { name: "Lin Yao", rank: "Master Merchant", player: "SilkRoadTrader", weapon: "Hidden Daggers", province: "Sichuan", stats: "Str: Low | Agi: Mid | Int: High", bio: "The wealthiest trader on the Silk Road. She has a spy in every tavern and an assassin in every shadow.", image: "linear-gradient(#2a3b2c, #0d140e)" }
                ]
            }
        },
        "Known World": {
            "Chinese Empire": "<span class='drop-cap'>T</span>he undisputed center of the known world. A sprawling landscape of bamboo forests, terraced mountains, and heavily fortified cities.",
            "↳ Dynasty & Military Units": "<span class='drop-cap'>O</span>ur forces are legion.<br><br><strong>Imperial Vanguard:</strong> The first into battle, heavily armored.<br><strong>Dragon Guard:</strong> Elite protectors of the Emperor.<br><strong>Silent Bows:</strong> Unmatched archers of the eastern watchtowers.",
            "Other Factions": "<span class='drop-cap'>T</span>he barbarians at the gates:<br><br><strong>The Northern Nomads:</strong> Fierce horse-lords who test the strength of the Great Wall.<br><strong>Western Traders:</strong> Foreigners bringing strange metals and spices.",
            "Armory": "<span class='drop-cap'>T</span>he tools of war:<br><br><strong>Jian:</strong> The gentleman's straight sword.<br><strong>Dao:</strong> The brutal, single-edged broadsword.<br><strong>Guan Dao:</strong> The heavy polearm favored by generals.",
            "Locations": "<span class='drop-cap'>T</span>he lands you will tread:<br><br>• <strong>The Forbidden Palace:</strong> The heart of the empire.<br>• <strong>The Great Wall:</strong> The endless stone shield of the north.<br>• <strong>Silk Road Markets:</strong> Where fortunes are made and lost.",
            "Mutations": "<span class='drop-cap'>R</span>are individuals possess 'Qi anomalies', granting them enhanced agility, unnatural strength, or foresight. Monitored heavily by the Inquisition."
        },
        "Quick Links": {
            "Rules & Laws": "<span class='drop-cap'>R</span>ead the Emperor's laws. Ignorance is no excuse for treason.",
            "Communications Hub": "<span class='drop-cap'>J</span>oin the official communications network to register your character.",
            "Alliance Board": "<span class='drop-cap'>D</span>iplomatic ties and current treaties with other recognized groups."
        }
    };

    // =========================================================================
    // ZONE 2: THE HTML BUILDER
    // =========================================================================

    function buildHTML(data) {
        if (typeof data === 'string') return data;
        
        let html = '';
        if (data.intro) {
            html += `<div class="modular-intro"><span class="drop-cap">${data.intro.charAt(0)}</span>${data.intro.slice(1)}</div>`;
        }

        if (['courier', 'battles', 'events'].includes(data.type)) {
            html += `<div class="unified-list">`;
            data.items.forEach(item => {
                let accentClass = "accent-default", tagHtml = "", metaHtml = "";
                let titleText = item.title || item.name;
                let bodyText = item.text || item.desc;

                if (data.type === 'courier') { 
                    accentClass = "accent-gold"; metaHtml = `📜 ${item.week} &nbsp;•&nbsp; ⌛ ${item.date}`; 
                } else if (data.type === 'battles') { 
                    accentClass = `accent-${item.status}`; tagHtml = `<span class="record-tag tag-${item.status}">${item.outcome}</span>`; metaHtml = `⚔ ${item.location} &nbsp;•&nbsp; ⌛ ${item.date}`; 
                } else if (data.type === 'events') { 
                    accentClass = "accent-crimson"; tagHtml = `<span class="record-tag tag-event">${item.tag}</span>`; metaHtml = `📅 ${item.date}`; 
                }
                
                html += `
                <div class="record-card ${accentClass}">
                    <div class="record-header">
                        <div class="record-title">${titleText} ${tagHtml}</div>
                        <div class="record-meta">${metaHtml}</div>
                    </div>
                    <div class="record-body">${bodyText}</div>
                </div>`;
            });
            html += `</div>`;
        }

        if (data.type === 'roster') {
            html += `<div class='roster-container'>`;
            data.items.forEach(char => {
                let statsHtml = '';
                if (char.player || char.weapon || char.province || char.stats) {
                    statsHtml += `<div class="roster-stats">`;
                    if (char.player) statsHtml += `<div class="r-stat"><span>Player</span> ${char.player}</div>`;
                    if (char.province) statsHtml += `<div class="r-stat"><span>Origin</span> ${char.province}</div>`;
                    if (char.weapon) statsHtml += `<div class="r-stat stat-full"><span>Weapon</span> ${char.weapon}</div>`;
                    if (char.stats) statsHtml += `<div class="r-stat stat-full stat-highlight"><span>Combat Ratings</span> ${char.stats}</div>`;
                    statsHtml += `</div>`;
                }

                html += `
                <div class='roster-card'>
                    <div class='roster-card-front'>
                        <div class='roster-portrait' style='background: ${char.image}; background-size: cover; background-position: center;'></div>
                        <div class='roster-overlay'>
                            <div class='roster-name'>${char.name}</div>
                            <div class='roster-rank'>${char.rank}</div>
                            <div class='roster-click-hint'>❖ Unseal Dossier ❖</div>
                        </div>
                    </div>
                    <div class='roster-expanded-content'>
                        <div class='roster-close-btn' title='Seal Dossier'>✕</div>
                        <div class='roster-expanded-header'>
                            <div class='re-title'>${char.name}</div>
                            <div class='re-rank'>${char.rank}</div>
                        </div>
                        <div class='re-body-wrapper'>
                            <div class='re-left-column'>
                                ${statsHtml}
                            </div>
                            <div class='re-right-column'>
                                <div class='bio-label'>Imperial Record</div>
                                <div class='roster-bio'>${char.bio || char.desc}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            html += `</div>`;
        }

        if (data.type === 'registration') {
            html += `
            <div class="registry-form">
                <div class="form-grid">
                    <div class="input-group"><input type="text" class="reg-input input-name" placeholder=" " /><label>Character Name</label></div>
                    <div class="input-group"><input type="text" class="reg-input input-player" placeholder=" " /><label>Roblox Username</label></div>
                    <div class="input-group">
                        <select class="reg-input input-prov">
                            <option value="" disabled selected>Select Origin Province...</option>
                            <option value="The Northern Steppes">The Northern Steppes</option>
                            <option value="Sichuan Province">Sichuan Province</option>
                            <option value="Eastern Watchtowers">Eastern Watchtowers</option>
                            <option value="Silk Road Outskirts">Silk Road Outskirts</option>
                        </select>
                    </div>
                    <div class="input-group"><input type="text" class="reg-input input-weapon" placeholder=" " /><label>Weapon of Choice</label></div>
                </div>
                <div class="input-group input-full"><textarea class="reg-input reg-textarea input-bio" placeholder=" "></textarea><label>Character Backstory & Allegiance...</label></div>
                <div class="form-action"><div class="reg-btn generate-writ-btn">Seal the Writ</div></div>
                <div class="form-output-zone">
                    <div class="reg-output-label">✧ Your Imperial Writ ✧</div>
                    <textarea class="reg-input reg-output-box output-writ" readonly placeholder="Your generated code will appear here..."></textarea>
                </div>
            </div>`;
        }

        if (data.type === 'credits') {
            html += `<div class="credits-grid">`;
            data.items.forEach(item => { 
                html += `
                <div class="credit-plaque">
                    <div class="credit-deco"></div>
                    <div class="credit-role">${item.role}</div>
                    <div class="credit-name">${item.name}</div>
                </div>`; 
            });
            html += `</div>`;
            if (data.outro) html += `<div class="credits-outro">${data.outro}</div>`;
        }
        
        return html || "Data error.";
    }

    // =========================================================================
    // ZONE 3: MASTER STYLESHEET (Fixed Roster Image Proportions)
    // =========================================================================

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;700;900&family=Noto+Serif+SC:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        /* Strict Box Sizing */
        #guanai-scroll-container { display: flex; justify-content: center; padding: 50px 0; width: 100%; box-sizing: border-box; font-family: 'Cormorant Garamond', serif; position: relative; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
        #guanai-scroll-container * { box-sizing: border-box; }
        #guanai-scroll-container::before { content: ''; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: radial-gradient(ellipse at center, rgba(15, 5, 2, 0.4) 0%, transparent 80%); pointer-events: none; z-index: 0; }

        /* WIDE WRAPPER */
        .inline-scroll-wrapper { width: 100%; max-width: 1400px; position: relative; z-index: 2; filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8)); transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); }
        .inline-scroll-wrapper:not(.is-open) { cursor: pointer; max-width: 900px; margin: 0 auto; transform: scale(0.98); }
        .inline-scroll-wrapper:not(.is-open):hover { filter: drop-shadow(0 40px 60px rgba(0,0,0,0.9)); transform: scale(1); }

        /* Rollers */
        .scroll-roller { height: 75px; width: 100%; background: linear-gradient(to bottom, #110502 0%, #2a0f05 15%, #4a1c09 40%, #240c04 65%, #0a0301 100%), repeating-linear-gradient(90deg, transparent 0, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 18px); border-top: 2px solid #733116; border-bottom: 6px solid #000; border-radius: 14px; position: relative; z-index: 10; box-shadow: inset 0 10px 15px rgba(255,255,255,0.05), inset 0 -10px 15px rgba(0,0,0,0.8); transition: filter 0.3s; }
        .scroll-roller::before, .scroll-roller::after { content: ''; position: absolute; top: -12px; width: 50px; height: 95px; background: linear-gradient(135deg, #ffe066 0%, #d4af37 30%, #8a6300 70%, #4a3400 100%); border-radius: 50%; border: 4px solid #2e2000; box-shadow: inset -6px -6px 15px rgba(0,0,0,0.7), inset 6px 6px 15px rgba(255,255,255,0.6), 0 10px 20px rgba(0,0,0,0.9); }
        .scroll-roller::before { left: -25px; } .scroll-roller::after { right: -25px; }
        .inline-scroll-wrapper.is-open .scroll-roller:hover { filter: brightness(1.15); }

        /* Wax Seal */
        .wax-seal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #ff4719, #b31b00, #5c0f00); border: 5px solid #3d0a00; box-shadow: 0 15px 30px rgba(0,0,0,0.9), inset 3px 3px 10px rgba(255,150,150,0.6); display: flex; justify-content: center; align-items: center; color: #ffdeb3; font-family: 'Noto Serif SC', serif; font-size: 52px; z-index: 15; transition: all 0.7s ease; pointer-events: none; }
        .wax-seal::after { content: ''; position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.15); }
        .inline-scroll-wrapper.is-open .wax-seal { transform: translate(-50%, -50%) scale(2.5); opacity: 0; filter: blur(15px); }

        .close-hint { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffe066; font-family: 'Cinzel', serif; font-size: 16px; font-weight: bold; letter-spacing: 6px; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; width: 100%; text-align: center; }
        .inline-scroll-wrapper.is-open .scroll-roller:hover .close-hint { opacity: 1; text-shadow: 0 0 15px rgba(255, 224, 102, 0.8); }

        /* Dynamic Height Container */
        .scroll-parchment { background-color: #f2e8cd; background-image: radial-gradient(circle at center, transparent 30%, rgba(60, 25, 10, 0.08) 100%); box-shadow: inset 0 0 80px rgba(42, 16, 5, 0.95); border-left: 4px solid #1f0802; border-right: 4px solid #1f0802; width: 95%; margin: 0 auto; height: 0px; overflow: hidden; transition: height 1s cubic-bezier(0.25, 1, 0.4, 1); position: relative; z-index: 5; }

        .parchment-content-wrapper { position: relative; width: 100%; }
        .parchment-content-padding { display: flex; flex-direction: row; padding: 50px 40px; gap: 40px; width: 100%; opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.5s; position: relative; }
        .inline-scroll-wrapper.is-open .parchment-content-padding { opacity: 1; transform: translateY(0); }

        #dust-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0; transition: opacity 1.5s ease 1s; mix-blend-mode: color-dodge; }
        .inline-scroll-wrapper.is-open #dust-canvas { opacity: 0.8; }

        .parchment-inner-border { position: absolute; top: 30px; bottom: 30px; left: 30px; right: 30px; border: 1px solid rgba(139, 26, 26, 0.3); outline: 1px solid rgba(139, 26, 26, 0.15); outline-offset: 5px; pointer-events: none; z-index: 0; opacity: 0; transition: opacity 1s ease 0.6s; }
        .inline-scroll-wrapper.is-open .parchment-inner-border { opacity: 1; }
        .parchment-inner-border::after { content: '关爱'; position: absolute; bottom: 20px; right: 25px; color: rgba(139, 26, 26, 0.05); font-family: 'Noto Serif SC', serif; font-size: 80px; font-weight: bold; border: 4px double rgba(139, 26, 26, 0.05); border-radius: 6px; padding: 5px 20px; transform: rotate(-8deg); }

        /* SIDEBAR */
        .scroll-sidebar { width: 300px; flex: 0 0 300px; border-right: 1px solid rgba(139, 26, 26, 0.2); padding-right: 25px; position: sticky; top: 50px; max-height: calc(100vh - 100px); overflow-y: auto; z-index: 5; }
        .scroll-sidebar::-webkit-scrollbar { width: 6px; } .scroll-sidebar::-webkit-scrollbar-thumb { background: rgba(139, 26, 26, 0.5); border-radius: 3px; }

        .wiki-title { font-family: 'Cinzel Decorative', serif; font-size: 38px; font-weight: 900; color: #1f0802; text-align: center; margin-bottom: 35px; border-bottom: 2px solid #7a1111; padding-bottom: 20px; line-height: 1.1; }
        .wiki-title span { color: #7a1111; font-family: 'Noto Serif SC', serif; font-size: 56px; display: block; margin-top: 8px; }
        
        .nav-category { font-family: 'Noto Serif SC', serif; font-size: 16px; color: #7a1111; margin: 35px 0 15px 0; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; border-bottom: 1px dashed rgba(139, 26, 26, 0.3); padding-bottom: 8px; }
        .nav-item { padding: 12px 18px; margin: 5px 0; font-family: 'Cinzel', serif; font-size: 18px; font-weight: bold; color: #3d1c0b; transition: all 0.3s; border-left: 3px solid transparent; cursor: pointer; border-radius: 0 6px 6px 0; }
        .nav-item[data-subitem="true"] { font-size: 16px; padding-left: 30px; }
        .nav-item:hover, .nav-item.active { color: #7a1111; border-left: 4px solid #7a1111; background: rgba(139, 26, 26, 0.08); transform: translateX(6px); }

        /* READER */
        .scroll-reader { flex: 1 1 0%; min-width: 0; padding-left: 20px; position: relative; z-index: 5; }
        .reader-title { font-family: 'Cinzel Decorative', serif; font-size: 52px; font-weight: 900; background: linear-gradient(to right, #240c04, #7a1111, #240c04); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 15px; letter-spacing: 1px; line-height: 1.2;}
        .gold-divider { height: 4px; background: linear-gradient(90deg, transparent, #b8860b, #ffe066, #b8860b, transparent); margin-bottom: 35px; width: 100%; border-radius: 50%; }

        .modular-intro { font-size: 22px; color: #1f0802; margin-bottom: 40px; line-height: 1.8; font-style: italic; }
        .reader-text { font-size: 20px; line-height: 1.9; color: #24140b; }
        .drop-cap { float: left; font-size: 72px; line-height: 55px; padding-top: 5px; padding-right: 15px; color: #7a1111; font-family: 'Cinzel Decorative', serif; }
        .imperial-quote { border-left: 5px solid #d4af37; background: linear-gradient(90deg, rgba(212, 175, 55, 0.1), transparent); padding: 25px 35px; margin: 35px 0; font-style: italic; color: #2a0f05; font-size: 20px; border-radius: 0 12px 12px 0; }

        /* UNIFIED LISTS */
        .unified-list { display: flex; flex-direction: column; gap: 25px; margin-top: 30px; }
        .record-card { background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(139, 26, 26, 0.15); border-radius: 10px; padding: 30px; transition: all 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.03); }
        .record-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(139, 26, 26, 0.1); }
        .accent-gold { border-left: 6px solid #d4af37; } .accent-crimson { border-left: 6px solid #7a1111; } 
        .accent-victory { border-left: 6px solid #8a6300; } .accent-defeat { border-left: 6px solid #5c0f00; } .accent-stalemate { border-left: 6px solid #666; }
        
        .record-title { font-family: 'Cinzel Decorative', serif; font-size: 28px; font-weight: 900; color: #240c04; margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
        .record-meta { font-size: 16px; color: #8a482b; font-style: italic; border-bottom: 1px solid rgba(139, 26, 26, 0.1); padding-bottom: 12px; margin-bottom: 18px; }
        .record-tag { font-family: 'Noto Serif SC', serif; font-size: 13px; text-transform: uppercase; font-weight: bold; padding: 5px 12px; border-radius: 5px; letter-spacing: 1px; color: #fff; background: #7a1111; }
        .record-body { font-size: 18px; line-height: 1.8; }

        /* -------------------------------------------------------------------------
            ROSTER CARDS (Adjusted image proportions)
        ------------------------------------------------------------------------- */
        .roster-container { display: flex; flex-wrap: wrap; gap: 30px; margin-top: 35px; align-items: flex-start; justify-content: flex-start; }
        
        .roster-card { width: 260px; flex: 0 0 260px; height: 380px; position: relative; border-radius: 10px; background: #0a0301; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.5); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; border: 1px solid #3d1c0b; }
        .roster-card:not(.expanded):hover { transform: translateY(-6px); box-shadow: 0 18px 35px rgba(122, 17, 17, 0.4); border-color: #d4af37; }
        
        /* Front State */
        .roster-card-front { width: 100%; height: 100%; display: flex; flex-direction: column; position: relative; z-index: 1; }
        .roster-portrait { width: 100%; height: 100%; transition: transform 0.8s ease; }
        .roster-card:hover .roster-portrait { transform: scale(1.08); }
        
        .roster-overlay { position: absolute; bottom: 0; width: 100%; padding: 60px 20px 25px; background: linear-gradient(to top, rgba(5,1,0,1) 20%, rgba(10,3,1,0.8) 60%, transparent 100%); display: flex; flex-direction: column; align-items: center; transition: padding 0.3s; }
        .roster-name { font-family: 'Cinzel Decorative', serif; color: #ffe066; font-size: 24px; font-weight: 900; text-align: center; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
        .roster-rank { color: #d4af37; font-family: 'Noto Serif SC', serif; font-size: 13px; text-transform: uppercase; font-weight: bold; margin-top: 6px; letter-spacing: 2px; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
        .roster-click-hint { color: #fff; font-family: 'Cinzel', serif; font-size: 12px; margin-top: 15px; opacity: 0; transition: opacity 0.3s; letter-spacing: 2px; text-transform: uppercase; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; width: 80%; text-align: center; }
        .roster-card:not(.expanded):hover .roster-click-hint { opacity: 1; }

        /* Expanded Dossier State */
        .roster-expanded-content { display: none; }
        
        .roster-card.expanded { width: 100%; flex: 0 0 100%; height: auto; flex-direction: row; background: linear-gradient(135deg, #160703, #080201); border-color: #d4af37; border-width: 2px; cursor: default; transform: none; box-shadow: 0 15px 40px rgba(0,0,0,0.7); }
        
        /* Fix for desktop image expanding too tall */
        .roster-card.expanded .roster-card-front { width: 280px; flex: 0 0 280px; border-right: 3px solid #3d1c0b; }
        .roster-card.expanded .roster-portrait { height: 100%; min-height: auto; transform: scale(1); filter: contrast(1.1); }
        .roster-card.expanded .roster-overlay { display: none; }
        
        .roster-card.expanded .roster-expanded-content { display: flex; flex-direction: column; padding: 40px; flex-grow: 1; position: relative; animation: fadeInDossier 0.5s forwards; }
        
        /* Close Button */
        .roster-close-btn { position: absolute; top: 25px; right: 25px; width: 40px; height: 40px; border-radius: 50%; background: rgba(122, 17, 17, 0.1); border: 2px solid #7a1111; color: #d4af37; display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; z-index: 10; }
        .roster-close-btn:hover { background: #7a1111; color: #ffe066; transform: rotate(90deg); box-shadow: 0 0 15px rgba(122, 17, 17, 0.6); }
        
        /* Expanded Header */
        .roster-expanded-header { border-bottom: 2px solid rgba(212, 175, 55, 0.3); padding-bottom: 20px; margin-bottom: 30px; padding-right: 50px; }
        .re-title { font-family: 'Cinzel Decorative', serif; font-size: 42px; color: #ffe066; font-weight: 900; line-height: 1.1; margin-bottom: 5px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .re-rank { font-family: 'Noto Serif SC', serif; font-size: 18px; color: #d64545; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; }
        
        /* Two Column Body layout */
        .re-body-wrapper { display: flex; gap: 40px; flex-wrap: nowrap; align-items: flex-start; }
        
        /* Left: Stats (CSS Grid) */
        .re-left-column { flex: 0 0 320px; }
        .roster-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .r-stat { background: rgba(255,255,255,0.03); padding: 15px; border-radius: 6px; border-top: 2px solid #7a1111; font-size: 16px; color: #eaddb6; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
        .stat-full { grid-column: 1 / -1; }
        .stat-highlight { border-top-color: #d4af37; background: rgba(212, 175, 55, 0.05); }
        .r-stat span { font-family: 'Cinzel', serif; color: #d4af37; text-transform: uppercase; font-size: 12px; font-weight: bold; display: block; margin-bottom: 6px; letter-spacing: 1px; opacity: 0.8; }
        
        /* Right: Bio Area */
        .re-right-column { flex: 1; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 25px; position: relative; }
        .bio-label { position: absolute; top: -12px; left: 25px; background: #080201; padding: 0 15px; font-family: 'Cinzel', serif; color: #8a482b; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; border-left: 1px solid #3d1c0b; border-right: 1px solid #3d1c0b; }
        .roster-bio { font-size: 18px; line-height: 1.9; color: #d0c0a5; margin-top: 10px; }

        @keyframes fadeInDossier { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* FORMS */
        .registry-form { background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(139, 26, 26, 0.2); padding: 40px; border-radius: 10px; margin-top: 35px; }
        .form-grid { display: flex; flex-wrap: wrap; gap: 30px; margin-bottom: 30px; }
        .input-group { flex: 1 1 45%; min-width: 240px; position: relative; }
        .input-full { flex: 1 1 100%; }
        .reg-input { width: 100%; background: transparent; border: none; border-bottom: 2px solid rgba(139, 26, 26, 0.3); color: #1f0802; font-family: 'Cormorant Garamond', serif; font-size: 20px; padding: 10px 0; outline: none; transition: border-color 0.3s; }
        .reg-input:focus { border-bottom-color: #d4af37; }
        .input-group label { position: absolute; top: 12px; left: 0; color: #8a482b; font-family: 'Cinzel', serif; font-size: 16px; transition: 0.3s; pointer-events: none; font-weight: bold; }
        .reg-input:focus ~ label, .reg-input:not(:placeholder-shown) ~ label, select.reg-input ~ label { top: -20px; font-size: 14px; color: #7a1111; }
        .reg-textarea { height: 100px; resize: none; }
        
        .form-action { display: flex; justify-content: center; margin: 35px 0; }
        .reg-btn { background: linear-gradient(135deg, #7a1111, #4a0a00); color: #ffe066; font-family: 'Cinzel Decorative', serif; font-size: 20px; padding: 15px 40px; border-radius: 35px; cursor: pointer; border: 1px solid #d4af37; transition: 0.3s; text-transform: uppercase; letter-spacing: 2px; }
        .reg-btn:hover { transform: translateY(-3px); border-color: #fff; }
        
        .form-output-zone { background: #0a0301; padding: 25px; border: 1px solid #3d1c0b; border-radius: 8px; }
        .reg-output-label { color: #d4af37; font-family: 'Cinzel Decorative', serif; text-align: center; margin-bottom: 12px; font-size: 18px; }
        .reg-output-box { color: #a4c9a3; font-family: monospace; font-size: 16px; height: 160px; width: 100%; border: 1px dashed rgba(212,175,55,0.3); padding: 15px; background: transparent; resize: vertical; line-height: 1.5; }

        /* CREDITS */
        .credits-grid { display: flex; flex-wrap: wrap; gap: 35px; margin-top: 45px; justify-content: center; }
        .credit-plaque { width: 300px; flex: 0 0 300px; background: linear-gradient(to bottom, #110502, #240c04); border-radius: 10px; padding: 40px 25px 25px; text-align: center; border: 1px solid #3d1c0b; position: relative; box-shadow: 0 12px 25px rgba(0,0,0,0.5); }
        .credit-plaque:hover { transform: translateY(-6px); border-color: #d4af37; }
        .credit-deco { position: absolute; top: -25px; left: 50%; transform: translateX(-50%); width: 50px; height: 50px; background: #7a1111; border-radius: 50%; border: 3px solid #d4af37; display: flex; justify-content: center; align-items: center; color: #ffe066; font-size: 24px; }
        .credit-deco::after { content: '❧'; }
        .credit-role { font-family: 'Cinzel Decorative', serif; color: #ffe066; font-size: 22px; font-weight: bold; margin-bottom: 10px; }
        .credit-name { font-size: 18px; color: #eaddb6; }
        .credits-outro { font-family: 'Cinzel Decorative', serif; font-size: 28px; color: #8a482b; text-align: center; margin-top: 60px; font-weight: bold; letter-spacing: 3px; }

        /* MOBILE ADJUSTMENTS */
        @media (max-width: 1050px) {
            .parchment-content-padding { flex-direction: column; padding: 30px 20px; }
            .scroll-sidebar { width: 100%; flex: auto; border-right: none; border-bottom: 2px solid #7a1111; position: relative; top: 0; max-height: none; padding-bottom: 25px; padding-right: 0; }
            .scroll-reader { width: 100%; flex: auto; padding-left: 0; padding-top: 25px; }
            
            .roster-card { width: 100%; max-width: 360px; flex: auto; height: 460px; margin: 0 auto; }
            
            /* Fix for the giant mobile image block */
            .roster-card.expanded { flex-direction: column; }
            .roster-card.expanded .roster-card-front { width: 100%; flex: 0 0 160px; height: 160px; border-right: none; border-bottom: 3px solid #3d1c0b; }
            .roster-card.expanded .roster-portrait { height: 100%; min-height: unset; }
            
            .roster-card.expanded .roster-expanded-content { padding: 30px 20px; }
            .re-body-wrapper { flex-direction: column; gap: 30px; }
            .re-left-column { flex: auto; width: 100%; }
            .re-right-column { padding: 25px 15px; margin-top: 10px; }
            .parchment-inner-border { display: none; }
        }
    `;
    document.head.appendChild(style);

    // =========================================================================
    // ZONE 4: DOM CONSTRUCTION & JAVASCRIPT ENGINE
    // =========================================================================

    const wrapper = document.createElement('div'); wrapper.className = 'inline-scroll-wrapper';
    
    const topRoller = document.createElement('div'); topRoller.className = 'scroll-roller';
    const waxSeal = document.createElement('div'); waxSeal.className = 'wax-seal'; waxSeal.innerText = "帝";
    const closeHintTop = document.createElement('div'); closeHintTop.className = 'close-hint'; closeHintTop.innerText = "CLICK TO UNROLL";
    topRoller.append(waxSeal, closeHintTop);

    const parchment = document.createElement('div'); parchment.className = 'scroll-parchment';
    const parchmentInner = document.createElement('div'); parchmentInner.className = 'parchment-content-wrapper';
    const parchmentPadding = document.createElement('div'); parchmentPadding.className = 'parchment-content-padding';
    const canvas = document.createElement('canvas'); canvas.id = 'dust-canvas'; 
    const innerBorder = document.createElement('div'); innerBorder.className = 'parchment-inner-border';

    const sidebar = document.createElement('div'); sidebar.className = 'scroll-sidebar';
    const logo = document.createElement('div'); logo.className = 'wiki-title';
    logo.innerHTML = "Guān'ài <br><span>关爱</span>";
    sidebar.appendChild(logo);

    const reader = document.createElement('div'); reader.className = 'scroll-reader';
    const rTitle = document.createElement('div'); rTitle.className = 'reader-title ink-fade-in';
    const rDiv = document.createElement('div'); rDiv.className = 'gold-divider ink-fade-in';
    const rText = document.createElement('div'); rText.className = 'reader-text ink-fade-in';
    
    reader.append(rTitle, rDiv, rText);

    const btmRoller = document.createElement('div'); btmRoller.className = 'scroll-roller';
    const closeHintBtm = document.createElement('div'); closeHintBtm.className = 'close-hint'; closeHintBtm.innerText = "CLICK TO SECURE";
    btmRoller.appendChild(closeHintBtm);

    let firstLink = null;
    let isOpen = false; 
    let resizeObserver;
    
    function updateParchmentHeight() {
        if (!isOpen) return;
        const targetHeight = parchmentInner.scrollHeight;
        parchment.style.height = targetHeight + 'px';
        
        canvas.width = parchment.offsetWidth; 
        canvas.height = targetHeight;
        const targetParticles = Math.floor((canvas.width * canvas.height) / 30000);
        const numParticles = Math.min(Math.max(targetParticles, 40), 120);
        if (particles.length !== numParticles) particles = Array.from({ length: numParticles }, () => new Dust());
    }

    resizeObserver = new ResizeObserver(() => { if (isOpen) updateParchmentHeight(); });
    resizeObserver.observe(parchmentInner);

    for (const [category, topics] of Object.entries(wikiContent)) {
        const catHeader = document.createElement('div');
        catHeader.className = 'nav-category'; 
        catHeader.innerText = category;
        sidebar.appendChild(catHeader);

        for (const [topicName, rawData] of Object.entries(topics)) {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item'; 
            
            if (topicName.startsWith("↳")) { 
                navItem.setAttribute('data-subitem', 'true'); 
                navItem.innerText = topicName.replace("↳ ", ""); 
            } else { 
                navItem.innerText = topicName; 
            }
            
            navItem.addEventListener('click', function(e) {
                e.stopPropagation(); 
                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                rTitle.classList.remove('ink-fade-in'); rTitle.classList.add('ink-fade-out');
                rDiv.classList.remove('ink-fade-in'); rDiv.classList.add('ink-fade-out');
                rText.classList.remove('ink-fade-in'); rText.classList.add('ink-fade-out');

                setTimeout(() => {
                    rTitle.innerHTML = this.innerText; 
                    rText.innerHTML = buildHTML(rawData); 
                    
                    rTitle.classList.remove('ink-fade-out'); rTitle.classList.add('ink-fade-in');
                    rDiv.classList.remove('ink-fade-out'); rDiv.classList.add('ink-fade-in');
                    rText.classList.remove('ink-fade-out'); rText.classList.add('ink-fade-in');
                    
                    const rect = parchment.getBoundingClientRect();
                    if(rect.top < 0) window.scrollBy({ top: rect.top - 20, behavior: 'smooth' });

                }, 300);
            });

            sidebar.appendChild(navItem);
            if (!firstLink) firstLink = navItem;
        }
    }

    parchmentPadding.append(innerBorder, sidebar, reader);
    parchmentInner.appendChild(parchmentPadding);
    parchment.append(canvas, parchmentInner);
    wrapper.append(topRoller, parchment, btmRoller);
    container.appendChild(wrapper);

    // =========================================================================
    // EVENT DELEGATION
    // =========================================================================
    reader.addEventListener('click', function(e) {
        // Handle Roster Expansion
        const rosterCard = e.target.closest('.roster-card');
        if (rosterCard && !e.target.closest('.roster-close-btn')) {
            const isExpanded = rosterCard.classList.contains('expanded');
            document.querySelectorAll('.roster-card').forEach(c => c.classList.remove('expanded'));
            if (!isExpanded) {
                rosterCard.classList.add('expanded');
                // Auto-scroll so the expanded card stays fully in view
                setTimeout(() => {
                    const rect = rosterCard.getBoundingClientRect();
                    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                    if (rect.bottom > viewHeight || rect.top < 0) {
                        rosterCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 350);
            }
        }

        // Handle Roster Closing
        if (e.target.closest('.roster-close-btn')) {
            e.stopPropagation();
            const card = e.target.closest('.roster-card');
            card.classList.remove('expanded');
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);
        }

        // Handle Form Submission
        if (e.target.closest('.generate-writ-btn')) {
            const formContainer = e.target.closest('.registry-form');
            const name = formContainer.querySelector('.input-name').value || "[No Name]";
            const player = formContainer.querySelector('.input-player').value || "[No User]";
            const prov = formContainer.querySelector('.input-prov').value || "[No Province]";
            const weap = formContainer.querySelector('.input-weapon').value || "[No Weapon]";
            const bio = formContainer.querySelector('.input-bio').value || "[No Background]";

            const codeStr = 
`☙=======================================❧
    IMPERIAL REGISTRY WRIT 
☙=======================================❧
CHARACTER: ${name}
PLAYER: ${player}
ORIGIN: ${prov}
WEAPON: ${weap}
BACKGROUND: ${bio}
STATUS: PENDING MAGISTRATE REVIEW
=========================================`;

            formContainer.querySelector('.output-writ').value = codeStr;
            e.target.innerText = "Writ Generated!";
            setTimeout(() => { e.target.innerText = "Seal the Writ"; }, 2000);
        }
    });

    // =========================================================================
    // DUST ENGINE
    // =========================================================================
    const ctx = canvas.getContext('2d');
    let particles = []; let isRunning = false; let animFrame;
    
    class Dust {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; this.vx = Math.random() * 0.3 - 0.15; this.vy = Math.random() * -0.6 - 0.2;
            this.alpha = Math.random() * 0.6 + 0.1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.y < 0) this.y = canvas.height; if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0;
        }
        draw() { ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }

    function renderParticles() {
        if (!isRunning) return; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); }); 
        animFrame = requestAnimationFrame(renderParticles);
    }

    // =========================================================================
    // SCROLL MECHANICS
    // =========================================================================
    let overflowTimeout;

    wrapper.addEventListener('click', function() {
        if (!isOpen) {
            isOpen = true; this.classList.add('is-open');
            closeHintTop.innerText = "CLICK TO SECURE";
            
            setTimeout(() => { updateParchmentHeight(); isRunning = true; renderParticles(); }, 50); 
            setTimeout(() => { if (firstLink) firstLink.click(); }, 300);
            
            overflowTimeout = setTimeout(() => { parchment.style.height = 'auto'; parchment.style.overflow = 'visible'; }, 1000);
        }
    });

    function closeScroll(e) {
        if (isOpen) {
            e.stopPropagation(); isOpen = false; 
            closeHintTop.innerText = "CLICK TO UNROLL";
            clearTimeout(overflowTimeout); 
            
            parchment.style.height = parchment.offsetHeight + 'px';
            parchment.style.overflow = 'hidden';
            void parchment.offsetHeight;
            
            wrapper.classList.remove('is-open'); 
            parchment.style.height = '0px';
            
            isRunning = false; 
            if (animFrame) cancelAnimationFrame(animFrame); ctx.clearRect(0, 0, canvas.width, canvas.height); particles = [];
            setTimeout(() => { rTitle.innerHTML = ""; rText.innerHTML = ""; document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active')); }, 1000);
        }
    }

    topRoller.addEventListener('click', closeScroll); btmRoller.addEventListener('click', closeScroll);

})();