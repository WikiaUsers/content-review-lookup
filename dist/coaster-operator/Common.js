/* * Coaster Operator Wiki - v1.7.1 "Awards Fix"
 * Features: Fixed Button Layouts, Gold Award Style, Classic Manifest, Auto-Image Loader.
 */

$(function() {
    // --- CONFIGURATION ---
    const fileNameToFind = "File:RealisticDarKoaster.png"; 
    const awardFileName = "File:CS win.png"; 
    const gameLink = "https://www.roblox.com/games/17152219682/Coaster-Operator";

    // 1. INJECT STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- ANIMATIONS --- */
        @keyframes pulseGlow { 0%, 100% { opacity: 1; filter: brightness(1); } 50% { opacity: 0.7; filter: brightness(1.4); } }
        @keyframes dataRise { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translateY(-45px); opacity: 0; } }
        @keyframes slideInHUD { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes statusPulse { 0% { box-shadow: 0 0 0 0px rgba(16, 185, 129, 0.7); } 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }
        @keyframes hintBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes recFlash { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -100% 0; } 100% { background-position: 100% 0; } }

        /* --- UTILS --- */
        .terminal-cursor { font-weight: bold; color: #38bdf8; animation: pulseGlow 0.8s infinite; }
        .dynamic-bit { position: absolute; border-radius: 50%; pointer-events: none; z-index: 1; filter: blur(1px); animation: dataRise linear infinite; }
        .button-underglow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: inherit; opacity: 0; transition: opacity 0.3s ease; z-index: -1; pointer-events: none; }

        /* --- HUD MODULES --- */
        .hud-module { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.2); border-left: 3px solid #38bdf8; border-radius: 8px; padding: 12px; margin-bottom: 8px; backdrop-filter: blur(4px); animation: slideInHUD 0.5s ease-out forwards; transition: all 0.3s ease; cursor: pointer; position: relative; }
        .hud-module:hover { background: rgba(30, 41, 59, 0.8); border-color: #38bdf8; }
        .hud-module:hover .hud-title { color: #fff; }
        .hud-title { color: #38bdf8; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; transition: color 0.2s ease; }
        .expand-icon { font-size: 10px; margin-left: auto; opacity: 0.5; transition: transform 0.3s ease; }
        .hud-module.active .expand-icon { transform: rotate(180deg); opacity: 1; color: #fcd34d; }
        .expand-content { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s; opacity: 0; }
        .hud-module.active .expand-content { max-height: 800px; opacity: 1; margin-top: 10px; }
        .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: statusPulse 2s infinite; }
        .interactive-btn { position: relative; z-index: 5; overflow: hidden !important; cursor: pointer !important; user-select: none; transition: transform 0.2s ease; }
        .interactive-btn a { pointer-events: none; text-decoration: none !important; }
        .changelog-list { margin: 0; padding-left: 18px; color: #e2e8f0; font-size: 11px; line-height: 1.5; list-style-type: square; }
        .changelog-list li { margin-bottom: 4px; }
        .ride-sub-title { color: #fcd34d; font-weight: bold; margin-top: 10px; display: block; font-size: 10px; text-transform: uppercase; border-bottom: 1px solid rgba(252, 211, 77, 0.2); padding-bottom: 2px; margin-bottom: 5px; }

        /* --- GAME MANIFEST (ABOUT) STYLES --- */
        .manifest-container {
            display: flex; gap: 20px;
            background: linear-gradient(180deg, #141a36, #11162d);
            border: 1px solid #323d6a;
            border-radius: 14px; padding: 20px;
            color: #d0d7f0; box-shadow: 0 8px 20px rgba(0,0,0,.3);
            margin-bottom: 24px; align-items: center; flex-wrap: wrap;
        }
        .manifest-visual {
            flex: 1 1 300px; position: relative;
            border-radius: 12px; overflow: hidden;
            border: 2px solid #323d6a; box-shadow: 0 0 20px rgba(0,0,0,0.3);
            line-height: 0;
        }
        .manifest-img { width: 100%; height: auto; display: block; filter: contrast(1.1) brightness(0.9); transition: transform 0.5s ease; }
        .manifest-visual:hover .manifest-img { transform: scale(1.02); }
        .scanline-overlay {
            position: absolute; top:0; left:0; width:100%; height:100%;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
            background-size: 100% 4px; pointer-events: none; z-index: 2; opacity: 0.6;
        }
        .scan-beam {
            position: absolute; top:0; left:0; width:100%; height: 30%;
            background: linear-gradient(to bottom, transparent, rgba(205, 208, 255, 0.1), transparent);
            animation: scanline 4s linear infinite; z-index: 3; pointer-events: none;
        }
        .rec-tag {
            position: absolute; top: 12px; right: 12px;
            background: rgba(220, 38, 38, 0.9); color: white; font-weight: bold; font-size: 10px;
            padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; gap: 6px;
            z-index: 4; font-family: 'Segoe UI', sans-serif; letter-spacing: 0.5px; line-height: normal;
        }
        .rec-dot { width: 6px; height: 6px; background: white; border-radius: 50%; animation: recFlash 1s infinite; }
        .manifest-data { flex: 1 1 300px; display: flex; flex-direction: column; justify-content: space-between; }
        .manifest-header {
            font-size: 18px; font-weight: 900; color: #cdd0ff; text-transform: uppercase; letter-spacing: 1px;
            border-bottom: 1px solid rgba(50, 61, 106, 0.8); padding-bottom: 10px; margin-bottom: 15px;
            display: flex; justify-content: space-between; text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .manifest-desc { font-size: 14px; color: #d0d7f0; line-height: 1.6; margin-bottom: 20px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
        .stat-box {
            background: #0f1329; border: 1px solid #2c355a; padding: 10px; border-radius: 10px; transition: all 0.2s;
        }
        .stat-box:hover { border-color: #60a5fa; background: #1b2246; }
        .stat-label { font-size: 11px; color: #94a3b8; margin-bottom: 4px; display: block; }
        .stat-value { font-size: 13px; color: #fff; font-weight: bold; }
        .launch-btn {
            background: linear-gradient(to right, #7c3aed, #6d28d9); border: 1px solid #8b5cf6; color: #fff;
            text-align: center; padding: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
            border-radius: 10px; text-decoration: none !important; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.2); display: block;
        }
        .launch-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(124, 58, 237, 0.3); filter: brightness(1.1); color: #fff; }

        /* --- RAAPA AWARDS (FIXED BUTTONS) --- */
        .raapa-container {
            background: linear-gradient(135deg, #111, #222); /* Dark Premium Background */
            border: 2px solid #DAA520; /* Gold Border */
            border-radius: 16px; padding: 30px;
            display: flex; gap: 40px; align-items: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            flex-wrap: wrap; margin-bottom: 24px;
            position: relative; overflow: hidden;
        }
        .raapa-container::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(45deg, transparent 40%, rgba(218, 165, 32, 0.1) 45%, transparent 50%);
            background-size: 200% 100%; animation: shimmer 5s infinite linear; pointer-events: none;
        }
        .raapa-left { flex: 1 1 350px; display: flex; flex-direction: column; justify-content: center; z-index: 2; }
        .raapa-right { flex: 1 1 300px; position: relative; z-index: 2; }
        .raapa-title { 
            font-size: 28px; font-weight: 900; color: #DAA520; /* Gold Title */
            text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; line-height: 1.2; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
        .raapa-text { color: #ccc; font-size: 14px; line-height: 1.6; margin-bottom: 25px; }
        
        .raapa-btn-row { 
            display: flex; gap: 15px; flex-wrap: wrap; 
        }
        /* FIXED BUTTON CSS */
        .raapa-btn {
            background: linear-gradient(to bottom, #333, #111);
            border: 1px solid #DAA520; /* Gold Border */
            border-radius: 10px; 
            padding: 15px; /* More padding */
            display: flex; align-items: center; gap: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            flex: 1 1 160px; /* FIXED: Increased base width so Hospitality fits */
            min-width: 160px; /* FIXED: Prevents squishing */
            cursor: default;
            position: relative;
        }
        .raapa-btn:hover { 
            transform: translateY(-3px); 
            box-shadow: 0 8px 15px rgba(218, 165, 32, 0.25);
            border-color: #FFD700; background: linear-gradient(to bottom, #444, #222);
        }
        .raapa-icon { 
            font-size: 28px; /* Larger icon */
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6)); 
            flex-shrink: 0; /* Prevents icon from shrinking */
        }
        .raapa-label { 
            display: flex; flex-direction: column; 
            white-space: nowrap; /* FIXED: Prevents text wrapping awkwardly */
        }
        .raapa-lbl-top { 
            font-size: 10px; color: #DAA520; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .raapa-lbl-main { 
            font-size: 13px; color: #fff; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; 
            margin-top: 2px;
        }
        
        .raapa-img-wrapper {
            width: 100%; border-radius: 12px; overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.7);
            border: 2px solid #DAA520; line-height: 0;
        }
        .raapa-img { width: 100%; height: auto; display: block; }
    `;
    document.head.appendChild(style);

    // 2. CHANGELOG HUD DATA
    const changelogHUD = `
        <div style="display:flex; flex-direction:column; gap:5px; text-align: left;">
            <div style="font-size: 9px; color: #38bdf8; opacity: 0.6; margin-bottom: 5px; font-family: monospace; animation: hintBounce 2s infinite;">
                ▼ CLICK SECTIONS TO VIEW DETAILS
            </div>
            <div class="hud-module active">
                <div class="hud-title"><span>📡</span> FEATURES & CONTENT <div class="expand-icon">▽</div></div>
                <div class="expand-content">
                    <ul class="changelog-list">
                        <li>New mesh panels, buttons and / or screens on all rides</li>
                        <li>New maintenance cabinet system & model</li>
                        <li>Interactive checklist & choice between procedures</li>
                        <li>Visual check step added to all start up procedures</li>
                        <li>Ride shutdown ability added to all rides</li>
                        <li>Camera system POV feature</li>
                        <li>New interactive tutorial system</li>
                    </ul>
                </div>
            </div>
            <div class="hud-module">
                <div class="hud-title"><span>🎢</span> RIDE SPECIFIC UPDATES <div class="expand-icon">▽</div></div>
                <div class="expand-content">
                    <span class="ride-sub-title">Giant Drop</span>
                    <ul class="changelog-list">
                        <li>More advanced operations</li>
                        <li>Added sync & operation mode feature</li>
                    </ul>
                    <span class="ride-sub-title">Cobra's Curse</span>
                    <ul class="changelog-list">
                        <li>More unique & realistic operations</li>
                        <li>Replaced dispatch button with RFID scanning</li>
                    </ul>
                    <span class="ride-sub-title">Phoenix Rising</span>
                    <ul class="changelog-list">
                        <li>Extended start-up procedure</li>
                        <li>Dispatch from the side / host panel</li>
                    </ul>
                    <span class="ride-sub-title">Red Arrows</span>
                    <ul class="changelog-list">
                        <li>More advanced operations & operation mode</li>
                    </ul>
                </div>
            </div>
            <div class="hud-module" style="border-left-color: #10b981;">
                <div class="hud-title" style="color:#10b981;"><span>🛠️</span> FIXES & CHANGES <div class="expand-icon">▽</div></div>
                <div class="expand-content">
                    <ul class="changelog-list" style="font-size: 10px;">
                        <li>Various minor bug fixes</li>
                        <li>Server system V2 (Fixing server sys bugs)</li>
                        <li>New NPC sys implemented into most rides</li>
                        <li>New in-game changelog</li>
                        <li>Improved back-end systems & general scripts</li>
                        <li>Optimisation & performance improvements</li>
                        <li>New trash / rubbish models</li>
                        <li>More posters added to store</li>
                        <li>New intercom & pinboard model on several rides</li>
                        <li>Bonus coins & XP for start up & shutdown</li>
                        <li>Smoother hinge & button animations</li>
                    </ul>
                </div>
            </div>
            <div style="margin: 4px 2px 2px 2px; padding: 8px; background: rgba(252, 211, 77, 0.05); border: 1px dashed rgba(252, 211, 77, 0.3); border-radius: 4px; display:flex; align-items:start; gap:8px;">
                <span style="font-size:12px; margin-top: -2px;">⚠️</span>
                <span style="font-size: 9px; color: #fcd34d; font-family: monospace; letter-spacing: 0.5px; line-height: 1.3;">
                    <strong>LIVE PATCHING ACTIVE:</strong><br>
                    We are continuously releasing patches to fix emerging bugs in this update.
                </span>
            </div>
            <div style="padding: 10px 10px 5px; font-family:monospace; font-size:9px; color:#38bdf8; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:6px;">
                    <div class="status-dot"></div>
                    <span>V1.4.7_ENCRYPTED</span>
                </div>
                <span id="live-timer">00:00:00</span>
            </div>
        </div>
    `;

    // 3. LOGIC: TERMINAL HUD
    function initTerminalHUD() {
        const target = document.getElementById("update-status-text");
        if (!target) return;
        let bootLines = [`> INITIALIZING DIAGNOSTICS...`, `> LOADING V1.4.7 MANIFEST...`, `> ANALYZING RIDE DATA...`, `> INTERFACE DEPLOYED.`];
        let i = 0;
        function playBoot() {
            if (i < bootLines.length) {
                target.innerHTML = `<div style="font-family:monospace; color:#38bdf8; font-size:12px;">${bootLines[i]}<span class="terminal-cursor">_</span></div>`;
                i++;
                setTimeout(playBoot, 300);
            } else {
                target.style.opacity = 0;
                setTimeout(() => {
                    target.innerHTML = changelogHUD;
                    target.style.opacity = 1;
                    setupExpandableLogic();
                    startLiveTimer();
                }, 300);
            }
        }
        playBoot();
    }

    function setupExpandableLogic() {
        document.querySelectorAll('.hud-module').forEach(mod => {
            mod.addEventListener('click', function() { this.classList.toggle('active'); });
        });
    }
    function startLiveTimer() {
        setInterval(() => {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
            const timerEl = document.getElementById('live-timer');
            if(timerEl) timerEl.innerText = timeStr;
        }, 1000);
    }

    // 4. LOGIC: GAME MANIFEST & AWARDS (API LOADER)
    function loadAndRender(fileName, targetId, renderFn) {
        const target = document.getElementById(targetId);
        if (!target) return;

        new mw.Api().get({
            action: 'query', titles: fileName, prop: 'imageinfo', iiprop: 'url', format: 'json'
        }).done(function(data) {
            let imgUrl = "https://placehold.co/600x400/141a36/FFF?text=Image+Not+Found";
            const pages = data.query.pages;
            for (const key in pages) {
                if (pages[key].imageinfo && pages[key].imageinfo[0]) {
                    imgUrl = pages[key].imageinfo[0].url;
                }
            }
            renderFn(target, imgUrl);
        }).fail(function() {
            renderFn(target, "https://placehold.co/600x400/141a36/FFF?text=API+Error");
        });
    }

    // ORIGINAL MANIFEST RENDERER
    function renderManifest(target, imgUrl) {
        target.innerHTML = `
            <div class="manifest-container">
                <div class="manifest-visual">
                    <div class="rec-tag"><div class="rec-dot"></div> LIVE FEED</div>
                    <div class="scanline-overlay"></div>
                    <div class="scan-beam"></div>
                    <img src="${imgUrl}" class="manifest-img" alt="Coaster Operator Gameplay">
                </div>
                <div class="manifest-data">
                    <div>
                        <div class="manifest-header">
                            <span>OUR GAME</span>
                            <span style="font-size:11px; opacity:0.6; align-self:center; font-family:monospace;">COASTER STUDIO 2026</span>
                        </div>
                        <p class="manifest-desc">
                            Coaster Operator is a fun, interactive simulation where you manage your own rides. 
                            Join thousands of players in 2026 to reach new heights. 
                            <span style="color:#10b981; font-weight:bold;">[PUBLIC]</span>
                        </p>
                        <div class="stats-grid">
                            <div class="stat-box"><span class="stat-label">Developer</span><span class="stat-value">Coaster Studio</span></div>
                            <div class="stat-box"><span class="stat-label">Platform</span><span class="stat-value">Roblox</span></div>
                            <div class="stat-box"><span class="stat-label">Established</span><span class="stat-value">04/14/2024</span></div>
                            <div class="stat-box"><span class="stat-label">Servers Status</span><span class="stat-value" style="color:#10b981;">ONLINE</span></div>
                        </div>
                    </div>
                    <a href="${gameLink}" class="launch-btn" target="_blank">▶ LAUNCH GAME</a>
                </div>
            </div>
        `;
    }

    // NEW RAAPA RENDERER (FIXED BUTTONS)
    function renderAwards(target, imgUrl) {
        target.innerHTML = `
            <div class="raapa-container">
                <div class="raapa-left">
                    <div class="raapa-title">A LEGACY OF EXCELLENCE</div>
                    <div class="raapa-text">As we enter 2026, Coaster Studio continues to build on our success from the <b>RAAPA Winter Edition 2025!</b></div>
                    <div class="raapa-btn-row">
                        <div class="raapa-btn">
                            <span class="raapa-icon">🏆</span>
                            <div class="raapa-label"><span class="raapa-lbl-top">Winner</span><span class="raapa-lbl-main">Best Group</span></div>
                        </div>
                        <div class="raapa-btn">
                            <span class="raapa-icon">⭐</span>
                            <div class="raapa-label"><span class="raapa-lbl-top">Winner</span><span class="raapa-lbl-main">Best Hospitality</span></div>
                        </div>
                        <div class="raapa-btn">
                            <span class="raapa-icon">🎪</span>
                            <div class="raapa-label"><span class="raapa-lbl-top">Winner</span><span class="raapa-lbl-main">Best Booth</span></div>
                        </div>
                    </div>
                </div>
                <div class="raapa-right">
                    <div class="raapa-img-wrapper">
                        <img src="${imgUrl}" class="raapa-img" alt="RAAPA Awards Graphic">
                    </div>
                </div>
            </div>
        `;
    }

    // 5. INTERACTIVE BUTTONS
    function createStreamBit(el, color) {
        const bit = document.createElement('div');
        bit.className = 'dynamic-bit';
        bit.style.width = "2px"; bit.style.height = "2px";
        bit.style.background = color; bit.style.boxShadow = `0 0 5px ${color}`;
        bit.style.left = Math.random() * 90 + 5 + "%";
        bit.style.bottom = "-5px";
        bit.style.animationDuration = "0.6s";
        el.appendChild(bit);
        setTimeout(() => bit.remove(), 800);
    }
    function initInteractions() {
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            const btnStyle = window.getComputedStyle(btn);
            let accentColor = btnStyle.borderLeftColor || btnStyle.backgroundColor || "#38bdf8";
            const glow = document.createElement('div');
            glow.className = 'button-underglow';
            glow.style.background = `radial-gradient(circle at center, ${accentColor} 0%, transparent 80%)`;
            btn.appendChild(glow);
            let streamInterval;
            btn.addEventListener('click', function() { const link = this.querySelector('a'); if (link) window.location.href = link.href; });
            btn.addEventListener('mouseenter', function() {
                glow.style.opacity = "0.5"; this.style.transform = "translateY(-2px)";
                streamInterval = setInterval(() => createStreamBit(this, accentColor), 120);
            });
            btn.addEventListener('mouseleave', function() {
                glow.style.opacity = "0"; this.style.transform = "translateY(0)"; clearInterval(streamInterval);
            });
        });
    }

    // 6. INIT
    if (document.getElementById("update-status-text")) initTerminalHUD();
    loadAndRender(fileNameToFind, "game-manifest-target", renderManifest);
    loadAndRender(awardFileName, "raapa-awards-target", renderAwards);
    initInteractions();
});