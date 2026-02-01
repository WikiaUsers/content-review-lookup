/* * Coaster Operator Wiki - Master Interactive Engine v19.0
 * Features: Typewriter Wiki Header, Victory Easter Egg (10s CD), 
 * Global Goal, Terminal, Digital Bits, and Code Tab.
 */

$(function() {
    // 1. CONFIGURATION (Target: Feb 1, 2026, 11:00 PM CET)
    const releaseDate = new Date("2026-02-01T23:00:00+01:00").getTime();
    const username = mw.config.get('wgUserName') || "Guest Operator";
    const sessionStart = Date.now();
    
    // LIKE GOAL SETTINGS
    const targetLikes = 9000;
    const currentLikes = 8912; 
    const likePercent = Math.min((currentLikes / targetLikes) * 100, 100).toFixed(1);
    const isGoalMet = currentLikes >= targetLikes;

    let canTriggerVictory = true;

    // 2. INJECT DYNAMIC STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes digitalRise { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.3; } 100% { transform: translateY(-100px); opacity: 0; } }
        @keyframes headerShine { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes headerFlicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; transform: scale(1); }
            51% { opacity: 0.8; transform: scale(1.002); }
            52% { opacity: 1; transform: scale(1); }
        }
        
        .terminal-cursor { font-weight: bold; color: #38bdf8; animation: blink 1s infinite; }
        .progress-fill { height: 100%; border-radius: 10px; transition: width 2s cubic-bezier(0.4, 0, 0.2, 1); background: ${isGoalMet ? 'linear-gradient(90deg, #fcd34d, #fbbf24)' : 'linear-gradient(90deg, #38bdf8, #818cf8)'}; box-shadow: 0 0 15px ${isGoalMet ? '#fcd34d' : '#38bdf8'}; }
        
        /* Wiki Header Animation Classes */
        .wiki-header-animated { position: relative; display: inline-block; overflow: hidden; animation: headerFlicker 8s infinite; }
        .header-shine {
            position: absolute; top: 0; left: -100%; width: 40%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: skewX(-25deg); animation: headerShine 5s infinite;
        }
        
        .confetti { position: fixed; width: 8px; height: 8px; z-index: 10001; pointer-events: none; animation: trophyConfetti 4s ease-out forwards; }
        .victory-msg { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #fcd34d; font-size: clamp(24px, 5vw, 48px); font-weight: 900; z-index: 10002; text-shadow: 0 0 30px rgba(252, 211, 77, 0.9); pointer-events: none; animation: victoryText 3s ease-in-out forwards; text-transform: uppercase; width: 100%; text-align: center; }
        #code-tab-shortcut:hover { right: 0px !important; background: #fcd34d !important; color: #000 !important; }
    `;
    document.head.appendChild(style);

    // 3. WIKI TITLE TYPEWRITER ENGINE
    function initTitleTypewriter() {
        const titleEl = document.querySelector('div[style*="font-size:48px"]');
        if (!titleEl) return;

        const fullText = "COASTER OPERATOR WIKI";
        titleEl.innerHTML = ""; // Clear for typing
        titleEl.classList.add('wiki-header-animated');
        
        // Add shine
        const shine = document.createElement('div');
        shine.className = 'header-shine';
        titleEl.appendChild(shine);

        // Add text container
        const textSpan = document.createElement('span');
        titleEl.appendChild(textSpan);

        let i = 0;
        function type() {
            if (i < fullText.length) {
                textSpan.innerHTML += fullText.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    // 4. TERMINAL ENGINE
    const messages = [`Welcome, ${username}.`, "Systems check: NOMINAL.", () => `Session: ${Math.floor((Date.now() - sessionStart)/1000)}s`, "Release: Feb 1, 11PM CET."];
    let msgIndex = 0, charIndex = 0, isDeleting = false;
    function typeTerminal() {
        const statusText = document.getElementById("update-status-text");
        if (!statusText || !canTriggerVictory) return setTimeout(typeTerminal, 100); 
        const dist = releaseDate - Date.now();
        if (dist < 0) { statusText.innerHTML = `> [ RELEASE INITIATED ]`; return; }
        let currentMsg = messages[msgIndex];
        if (typeof currentMsg === 'function') currentMsg = currentMsg();
        statusText.innerHTML = `<span style="font-family:monospace; color:#7dd3fc;">> ${currentMsg.substring(0, charIndex)}<span class="terminal-cursor">|</span></span>`;
        if (isDeleting) charIndex--; else charIndex++;
        if (!isDeleting && charIndex === currentMsg.length + 1) { isDeleting = true; setTimeout(typeTerminal, 2500); } 
        else if (isDeleting && charIndex === 0) { isDeleting = false; msgIndex = (msgIndex + 1) % messages.length; setTimeout(typeTerminal, 500); }
        else setTimeout(typeTerminal, isDeleting ? 40 : 80);
    }

    // 5. INITIALIZE SYSTEMS
    if (document.getElementById("update-status-text")) {
        typeTerminal();
        initTitleTypewriter();
        
        // Countdown
        setInterval(() => {
            const d = document.getElementById("c-days"), h = document.getElementById("c-hrs"), m = document.getElementById("c-min"), s = document.getElementById("c-sec");
            const dist = releaseDate - Date.now();
            if (d && dist > 0) {
                d.innerHTML = Math.floor(dist/86400000).toString().padStart(2,'0');
                h.innerHTML = Math.floor((dist%86400000)/3600000).toString().padStart(2,'0');
                m.innerHTML = Math.floor((dist%3600000)/60000).toString().padStart(2,'0');
                s.innerHTML = Math.floor((dist%60000)/1000).toString().padStart(2,'0');
            }
        }, 1000);

        // Community Goal
        const header = document.querySelector('div[style*="text-align:center;margin-bottom:24px;"]');
        if (header) {
            const goalBox = document.createElement('div');
            goalBox.style = `margin: 20px 0; background: rgba(22, 28, 52, 0.8); border: 1px solid ${isGoalMet ? '#fcd34d' : '#2c355a'}; border-radius: 14px; padding: 18px;`;
            goalBox.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;"><span style="font-weight:900; font-size:14px; color:#fff;">ROAD TO 9,000 LIKES</span><span style="font-family:monospace; color:#7dd3fc;">${currentLikes.toLocaleString()} / 9,000</span></div><div style="height:10px; width:100%; background:#000; border-radius:10px; overflow:hidden;"><div class="progress-fill" style="width:${likePercent}%;"></div></div>`;
            header.parentNode.insertBefore(goalBox, header.nextSibling);
        }

        // Buttons
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            btn.onmouseenter = () => { const acc = window.getComputedStyle(btn).borderLeftColor; btn.style.transform = "translateY(-6px) scale(1.02)"; btn.style.boxShadow = `0 12px 25px ${acc.replace('rgb', 'rgba').replace(')', ', 0.3)')}`; };
            btn.onmouseleave = () => { btn.style.transform = "translateY(0) scale(1)"; btn.style.boxShadow = "none"; };
            btn.onclick = () => { if (btn.innerText.includes("🥇")) triggerVictory(); const link = btn.querySelector('a'); if (link) setTimeout(() => link.click(), 500); };
        });

        // Code Tab
        const tab = document.createElement('div');
        tab.id = "code-tab-shortcut";
        tab.innerHTML = "<span style='writing-mode: vertical-rl; text-orientation: mixed; padding: 10px 0;'>🎁 CODES</span>";
        tab.style = "position: fixed; right: -5px; top: 50%; transform: translateY(-50%); background: rgba(15, 23, 42, 0.9); color: #fcd34d; border: 1px solid #fcd34d; border-right: none; border-radius: 8px 0 0 8px; font-weight: 900; cursor: pointer; z-index: 10000; transition: 0.3s ease; display: flex; align-items: center; justify-content: center; box-shadow: -5px 0 15px rgba(0,0,0,0.5);";
        tab.onclick = () => { window.location.href = "/wiki/Codes"; };
        document.body.appendChild(tab);
    }
});