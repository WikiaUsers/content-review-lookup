/* * Coaster Operator Wiki - v16 "The WOW Experience (Refined UI)"
 * Features: Fixed Sidebar Spacing, Image-Accurate Headers, 100% Content.
 */

$(function() {
    // --- CONFIGURATION ---
    const rootId = "coaster-wiki-root";
    const fileNameToFind = "File:RealisticDarKoaster.png"; 
    const awardFileName = "File:CS win.png"; 
    const gameLink = "https://www.roblox.com/games/17152219682/Coaster-Operator";

    const targetRoot = document.getElementById(rootId);
    if (!targetRoot) return; 

    // Clear initial loading styles
    targetRoot.removeAttribute("style");

    // 1. INJECT THE GLASS-OS HTML
    targetRoot.innerHTML = `
        <div class="os-master-container">
            
            <div class="os-blueprint-grid"></div>
            <div class="os-ambient-core pulse-ambient"></div>
            <div class="os-ambient-secondary pulse-ambient"></div>

            <header class="os-hero os-reveal">
                <div class="hero-status">
                    <div class="status-dot"></div>
                    <span>COASTER STUDIO // ONLINE</span>
                </div>

                <div class="hero-logo-box">
                    <img src="/Special:FilePath/Image.png" class="hero-logo" alt="Logo" />
                </div>
                
                <div class="hero-title-wrapper">
                    <div class="ht-accent-line left"></div>
                    <h1 class="hero-title">COASTER OPERATOR</h1>
                    <div class="ht-accent-line right"></div>
                </div>
                <p class="hero-sub">WIKI PORTAL</p>
                
                <div class="hero-action">
                    <a href="${gameLink}" target="_blank" class="os-btn-launch hover-glow">
                        <span class="btn-glow"></span>
                        <span class="btn-text">INITIALIZE GAME <span class="arr">→</span></span>
                    </a>
                </div>
            </header>

            <nav class="os-dock-wrapper os-reveal" style="transition-delay: 0.1s;">
                <div class="os-dock hover-glow">
                    <a href="/wiki/Gameplay" class="dock-item">
                        <span class="di-icon" style="color: #38bdf8;">🎮</span>
                        <span class="di-label">Gameplay</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Codes" class="dock-item">
                        <span class="di-icon" style="color: #10b981;">🎟️</span>
                        <span class="di-label">Codes</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Rides" class="dock-item">
                        <span class="di-icon" style="color: #f59e0b;">🎢</span>
                        <span class="di-label">Rides</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Ranks" class="dock-item">
                        <span class="di-icon" style="color: #ec4899;">⭐</span>
                        <span class="di-label">Ranks</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Achievements" class="dock-item">
                        <span class="di-icon" style="color: #a855f7;">🏆</span>
                        <span class="di-label">Badges</span>
                    </a>
                </div>
            </nav>

            <div class="os-layout">
                
                <div class="os-col-main os-reveal" style="transition-delay: 0.2s;">
                    <div class="os-module hover-glow">
                        <div class="module-content-wrapper">
                            <div class="module-header">
                                <div class="mh-title">
                                    <span class="mh-icon">⚡</span> UPDATE MANIFEST
                                </div>
                                <div class="mh-tag">VERSION 1.4.7</div>
                            </div>

                            <div class="os-update-graphic">
                                <img src="/Special:FilePath/Screenshot_2026-01-11_224226.png" alt="Update Cover" />
                                <div class="ug-overlay">
                                    <h2>INTERACTIVITY UPDATE</h2>
                                </div>
                            </div>

                            <div class="os-warning-strip hover-glow">
                                <div class="ws-icon">⚠️</div>
                                <div class="ws-content">
                                    <strong>LIVE PATCHING ACTIVE</strong>
                                    <span>Deploying continuous hotfixes to resolve emerging anomalies.</span>
                                </div>
                            </div>

                            <div class="os-data-accordions">
                                
                                <div class="data-accordion hover-glow active">
                                    <div class="da-header">
                                        <div class="da-title-group">
                                            <span class="da-icon" style="color:#38bdf8;">📡</span>
                                            <span class="da-title">Features & Content</span>
                                            <span class="da-badge" style="color:#38bdf8; background:rgba(56,189,248,0.1);">INTEGRATED</span>
                                        </div>
                                        <div class="da-toggle">▼</div>
                                    </div>
                                    <div class="da-content">
                                        <ul class="dc-list">
                                            <li>New mesh panels, buttons and / or screens on all rides</li>
                                            <li>New maintenance cabinet system & model</li>
                                            <li>Interactive checklist & choice between procedures</li>
                                            <li>Visual check step added to all start up procedures</li>
                                            <li>Ride shutdown ability added to all rides</li>
                                            <li>Camera system POV feature & interactive tutorial system</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="data-accordion hover-glow">
                                    <div class="da-header">
                                        <div class="da-title-group">
                                            <span class="da-icon" style="color:#f59e0b;">🎢</span>
                                            <span class="da-title">Ride Calibration</span>
                                            <span class="da-badge" style="color:#f59e0b; background:rgba(245,158,11,0.1);">MODIFIED</span>
                                        </div>
                                        <div class="da-toggle">▼</div>
                                    </div>
                                    <div class="da-content">
                                        <div class="dc-grid">
                                            <div class="dc-grid-item">
                                                <span class="dgi-title">Giant Drop</span>
                                                <span class="dgi-desc">Advanced ops, sync & op mode.</span>
                                            </div>
                                            <div class="dc-grid-item">
                                                <span class="dgi-title">Cobra's Curse</span>
                                                <span class="dgi-desc">Unique ops, RFID dispatch.</span>
                                            </div>
                                            <div class="dc-grid-item">
                                                <span class="dgi-title">Phoenix Rising</span>
                                                <span class="dgi-desc">Extended start-up, host panel.</span>
                                            </div>
                                            <div class="dc-grid-item">
                                                <span class="dgi-title">Red Arrows</span>
                                                <span class="dgi-desc">Advanced ops & op mode.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="data-accordion hover-glow">
                                    <div class="da-header">
                                        <div class="da-title-group">
                                            <span class="da-icon" style="color:#10b981;">🛠️</span>
                                            <span class="da-title">Maintenance Logs</span>
                                            <span class="da-badge" style="color:#10b981; background:rgba(16,185,129,0.1);">RESOLVED</span>
                                        </div>
                                        <div class="da-toggle">▼</div>
                                    </div>
                                    <div class="da-content">
                                        <ul class="dc-list">
                                            <li>Various minor bug fixes & Optimisation</li>
                                            <li>Server system V2 & improved back-end scripts</li>
                                            <li>New NPC sys implemented into most rides</li>
                                            <li>New in-game changelog, trash/rubbish models & store posters</li>
                                            <li>New intercom & pinboard model on several rides</li>
                                            <li>Bonus coins & XP for start up & shutdown</li>
                                            <li>Smoother hinge & button animations</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="module-footer">
                                <div class="mf-status">ENCRYPTED_V1.4.7</div>
                                <div class="mf-time">
                                    <span>LIVE: FEB 2026</span>
                                    <span id="os-clock" class="digital-clock">00:00:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="os-col-side os-reveal" style="transition-delay: 0.3s;">
                    
                    <div class="os-module hover-glow">
                        <div class="module-content-wrapper">
                            <div class="module-header">
                                <div class="mh-title"><span class="mh-icon" style="opacity: 0.6; font-size: 12px; margin-right: 4px;">🔗</span> NETWORK HUB</div>
                            </div>
                            <div class="module-body">
                                <div class="os-links">
                                    <a href="${gameLink}" target="_blank" class="osl-item hover-glow">
                                        <div class="osl-icon">🎮</div>
                                        <div class="osl-data"><strong>Play Instance</strong><span>Roblox Client</span></div>
                                        <div class="osl-arr">↗</div>
                                    </a>
                                    <a href="https://www.roblox.com/communities/34173405/Coaster-Studio" target="_blank" class="osl-item hover-glow">
                                        <div class="osl-icon">💼</div>
                                        <div class="osl-data"><strong>Staff Group</strong><span>Join Roster</span></div>
                                        <div class="osl-arr">↗</div>
                                    </a>
                                    <a href="https://discord.gg/Gq4mhYdKWC" target="_blank" class="osl-item hover-glow">
                                        <div class="osl-icon">💬</div>
                                        <div class="osl-data"><strong>Comms</strong><span>Discord Server</span></div>
                                        <div class="osl-arr">↗</div>
                                    </a>
                                    <a href="https://coasterstudiorblx.com/" target="_blank" class="osl-item hover-glow">
                                        <div class="osl-icon">🌐</div>
                                        <div class="osl-data"><strong>Mainframe</strong><span>Official Website</span></div>
                                        <div class="osl-arr">↗</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="os-stacked-modules">
                
                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.4s;">
                    <div class="module-content-wrapper">
                        <div class="module-header">
                            <div class="mh-title"><span class="mh-icon" style="color:#fbbf24;">🏆</span> ACCOLADES & RECOGNITION</div>
                        </div>
                        <div id="raapa-awards-target" class="module-body-wide"></div>
                    </div>
                </div>

                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.5s;">
                    <div class="module-content-wrapper">
                        <div class="module-header">
                            <div class="mh-title"><span class="mh-icon" style="color:#a855f7;">ℹ️</span> SYSTEM MANIFEST</div>
                        </div>
                        <div id="game-manifest-target" class="module-body-wide"></div>
                    </div>
                </div>

            </div>

            <footer class="os-footer os-reveal" style="transition-delay: 0.6s;">
                <div class="osf-text">All <b>Coaster Studio</b> trademarks, logos, and original game media are protected by copyright.</div>
                <div class="osf-copy">© 2026 COASTER STUDIO. ALL RIGHTS RESERVED.</div>
            </footer>

        </div>
    `;

    // 2. INJECT CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- CORE DESIGN TOKENS --- */
        :root {
            --os-bg: #030305;
            --os-surface: rgba(15, 15, 18, 0.65);
            --os-card: rgba(20, 20, 25, 0.4);
            
            --os-border: rgba(255, 255, 255, 0.08);
            --os-border-light: rgba(255, 255, 255, 0.15);
            --os-border-glow: rgba(236, 72, 153, 0.4);
            
            --os-text: #ffffff;
            --os-muted: #94a3b8;
            --os-dark: #475569;
            
            --os-magenta: #ec4899;
            --os-purple: #a855f7;
            --os-cyan: #38bdf8;
            --os-gold: #fbbf24;
            --os-orange: #f59e0b;
            --os-green: #10b981;
            
            --os-trans: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* --- WRAPPER & BACKGROUNDS --- */
        .os-master-container {
            position: relative; background-color: var(--os-bg); color: var(--os-text);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            max-width: 1150px; margin: 0 auto; padding: 40px 20px;
            text-align: left; line-height: 1.6; border-radius: 24px; overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.8); z-index: 1;
        }

        /* Animated Blueprint Grid */
        .os-blueprint-grid {
            position: absolute; inset: 0; z-index: -2; pointer-events: none; opacity: 0.15;
            background-image: linear-gradient(var(--os-border) 1px, transparent 1px), linear-gradient(90deg, var(--os-border) 1px, transparent 1px);
            background-size: 30px 30px;
            mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        }

        /* Breathing Ambient Core */
        .os-ambient-core {
            position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
            width: 800px; height: 600px; background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 40%, transparent 70%);
            z-index: -1; pointer-events: none; filter: blur(60px);
        }
        .os-ambient-secondary {
            position: absolute; bottom: -200px; right: -100px;
            width: 600px; height: 600px; background: radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(168,85,247,0.05) 50%, transparent 70%);
            z-index: -1; pointer-events: none; filter: blur(60px);
        }
        .pulse-ambient { animation: breathe 8s ease-in-out infinite alternate; }
        @keyframes breathe { 0% { opacity: 0.7; transform: translateX(-50%) scale(0.95); } 100% { opacity: 1; transform: translateX(-50%) scale(1.05); } }

        a { text-decoration: none !important; color: inherit; }
        h1, h2, h3, h4 { margin: 0; color: var(--os-text); font-weight: 700; border: none; }

        /* Cinematic Blur Reveal */
        .os-reveal { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(10px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease-out; }
        .os-reveal.active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        /* --- MOUSE TRACKING GLOW --- */
        .hover-glow {
            position: relative; overflow: hidden;
        }
        .hover-glow::before {
            content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,255,255,0.05), transparent 40%);
            z-index: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s;
        }
        .hover-glow:hover::before { opacity: 1; }
        .module-content-wrapper { position: relative; z-index: 1; }

        /* --- HERO SECTION --- */
        .os-hero { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px; padding-top: 20px; }

        /* Image-Accurate Status Badge */
        .hero-status { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #a1a1aa; letter-spacing: 1.5px; border: 1px solid var(--os-border); padding: 8px 18px; border-radius: 20px; margin-bottom: 32px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); }
        .status-dot { width: 8px; height: 8px; background: var(--os-green); border-radius: 50%; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }

        .hero-logo-box { position: relative; width: 88px; height: 88px; margin-bottom: 24px; }
        .hero-logo-box::before { content: ''; position: absolute; inset: -4px; border-radius: 24px; background: linear-gradient(135deg, var(--os-purple), var(--os-magenta)); filter: blur(12px); opacity: 0.6; z-index: 0; animation: spinGlow 4s linear infinite; }
        @keyframes spinGlow { 100% { filter: hue-rotate(360deg) blur(12px); } }
        .hero-logo { position: relative; width: 100%; height: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); z-index: 1; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
        
        /* Animated Gradient Title */
        .hero-title-wrapper { display: flex; align-items: center; gap: 20px; margin-bottom: 8px; width: 100%; justify-content: center; }
        .ht-accent-line { height: 1px; flex-grow: 1; max-width: 80px; background: linear-gradient(90deg, transparent, rgba(232,71,151,0.5)); }
        .ht-accent-line.left { background: linear-gradient(270deg, transparent, rgba(232,71,151,0.5)); }
        
        /* Magenta to Orange gradient */
        .hero-title { 
            font-size: 54px; 
            font-weight: 900; 
            letter-spacing: 4px; 
            background: linear-gradient(to right, #e84797 0%, #e84797 35%, #ff8800 50%, #e84797 65%, #e84797 100%); 
            background-size: 200% auto; 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            line-height: 1.1; 
            text-shadow: 0 0 40px rgba(232,71,151,0.3); 
            text-transform: uppercase; 
            animation: shineText 5s linear infinite; 
        }
        @keyframes shineText { to { background-position: 200% center; } }
        
        .hero-sub { font-size: 13px; font-weight: 600; color: var(--os-magenta); letter-spacing: 4px; }

        .hero-action { margin-top: 32px; }
        .os-btn-launch { position: relative; background: rgba(255,255,255,0.03); border: 1px solid var(--os-border-light); color: var(--os-text); padding: 14px 32px; border-radius: 100px; font-size: 13px; font-weight: 800; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 10px; overflow: hidden; transition: var(--os-trans); backdrop-filter: blur(10px); }
        .btn-glow { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent); transform: translateX(-100%); transition: transform 0.6s ease; z-index: 0; }
        .os-btn-launch:hover .btn-glow { transform: translateX(100%); }
        .btn-text { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }
        .arr { transition: transform 0.3s; }
        .os-btn-launch:hover { border-color: var(--os-magenta); box-shadow: 0 0 20px rgba(236,72,153,0.3); background: rgba(236,72,153,0.1); }
        .os-btn-launch:hover .arr { transform: translateX(4px); }

        /* --- FLOATING DOCK (NAVIGATION) --- */
        .os-dock-wrapper { display: flex; justify-content: center; margin-bottom: 40px; position: sticky; top: 20px; z-index: 100; }
        .os-dock { display: flex; align-items: center; gap: 8px; background: rgba(15, 15, 18, 0.75); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--os-border); padding: 8px 12px; border-radius: 100px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: border-color 0.3s; }
        .os-dock:hover { border-color: var(--os-border-light); }
        
        .dock-item { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 100px; transition: var(--os-trans); position: relative; cursor: pointer; z-index: 1;}
        .dock-item:hover { background: rgba(255,255,255,0.08); }
        .di-icon { font-size: 16px; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .dock-item:hover .di-icon { transform: scale(1.2); }
        .di-label { font-size: 13px; font-weight: 600; color: var(--os-text); }
        .dock-divider { width: 1px; height: 20px; background: var(--os-border); }

        /* --- LAYOUT GRIDS --- */
        .os-layout { display: grid; grid-template-columns: 1.8fr 1fr; gap: 24px; margin-bottom: 24px; align-items: start; }
        .os-stacked-modules { display: flex; flex-direction: column; gap: 24px; }
        
        @media (max-width: 900px) { 
            .os-layout { grid-template-columns: 1fr; } 
            .hero-title { font-size: 32px; }
        }
        
        /* --- MODULES (PANELS) --- */
        .os-module { background: var(--os-surface); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--os-border); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: border-color 0.3s, box-shadow 0.3s; }
        .os-module:hover { border-color: var(--os-border-light); box-shadow: 0 15px 40px rgba(0,0,0,0.4); }
        
        .module-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--os-border); background: rgba(0,0,0,0.2); }
        .mh-title { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 800; letter-spacing: 1px; color: var(--os-text); }
        .mh-icon { font-size: 14px; }
        .mh-tag { font-size: 10px; font-weight: 700; color: var(--os-muted); border: 1px solid var(--os-border); padding: 4px 10px; border-radius: 12px; letter-spacing: 1px; }
        
        /* --- UPDATE CONTENT --- */
        .os-update-graphic { position: relative; width: 100%; height: 180px; border-bottom: 1px solid var(--os-border); }
        .os-update-graphic img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
        .ug-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 24px; background: linear-gradient(transparent, rgba(0,0,0,0.9)); }
        .ug-overlay h2 { font-size: 32px; font-weight: 900; letter-spacing: -0.5px; text-shadow: 0 4px 10px rgba(0,0,0,0.8); }

        .os-warning-strip { margin: 24px; padding: 16px; background: rgba(236,72,153,0.05); border: 1px dashed rgba(236,72,153,0.3); border-radius: 12px; display: flex; align-items: center; gap: 16px; transition: var(--os-trans); }
        .os-warning-strip:hover { border-color: rgba(236,72,153,0.6); background: rgba(236,72,153,0.08); }
        .ws-icon { font-size: 20px; position: relative; z-index: 1; }
        .ws-content { display: flex; flex-direction: column; font-size: 13px; color: var(--os-muted); position: relative; z-index: 1; }
        .ws-content strong { color: var(--os-magenta); font-size: 12px; margin-bottom: 2px; letter-spacing: 0.5px; }

        /* --- INTERACTIVE ACCORDIONS (CHANGELOG) --- */
        .os-data-accordions { display: flex; flex-direction: column; gap: 12px; padding: 0 24px 32px 24px; }
        
        .data-accordion { background: var(--os-card); border: 1px solid var(--os-border); border-radius: 16px; transition: var(--os-trans); }
        .data-accordion:hover { border-color: var(--os-border-light); }
        .data-accordion.active { border-color: var(--os-border-glow); background: rgba(25, 25, 30, 0.8); box-shadow: 0 10px 20px rgba(236,72,153,0.05); }
        
        .da-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; cursor: pointer; user-select: none; transition: var(--os-trans); position: relative; z-index: 1; }
        .da-title-group { display: flex; align-items: center; gap: 12px; }
        .da-title { font-size: 15px; font-weight: 700; color: var(--os-text); }
        .da-badge { font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 6px; letter-spacing: 1px; border: 1px solid var(--os-border); }
        
        .da-toggle { font-size: 12px; color: var(--os-muted); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .data-accordion.active .da-toggle { transform: rotate(180deg); color: var(--os-text); }
        .data-accordion.active .da-header { border-bottom: 1px solid rgba(255,255,255,0.05); }

        .da-content { max-height: 0; opacity: 0; padding: 0 20px; transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, padding 0.4s ease; position: relative; z-index: 1; }
        .data-accordion.active .da-content { max-height: 800px; opacity: 1; padding: 20px; }

        /* Accordion Inner Content */
        .dc-list { margin: 0; padding-left: 20px; color: var(--os-muted); font-size: 13px; line-height: 1.7; }
        .dc-list li { margin-bottom: 6px; }
        
        .dc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .dc-grid-item { background: rgba(0,0,0,0.2); border: 1px solid var(--os-border); padding: 12px 16px; border-radius: 12px; display: flex; flex-direction: column; transition: border-color 0.2s; }
        .dc-grid-item:hover { border-color: rgba(255,255,255,0.2); }
        .dgi-title { font-size: 13px; font-weight: 700; color: var(--os-text); margin-bottom: 2px; }
        .dgi-desc { font-size: 12px; color: var(--os-muted); line-height: 1.4; }

        .module-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-top: 1px solid var(--os-border); background: rgba(0,0,0,0.3); position: relative; z-index: 1; }
        .mf-status { font-size: 10px; font-weight: 700; color: var(--os-dark); letter-spacing: 1px; }
        .mf-time { display: flex; align-items: center; gap: 16px; font-size: 10px; font-weight: 700; color: var(--os-dark); letter-spacing: 1px; }
        .digital-clock { font-family: monospace; font-size: 14px; color: var(--os-text); background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--os-border); }

        /* --- SIDEBAR LINKS --- */
        .module-body { padding: 20px; position: relative; z-index: 1; }
        
        .os-links { display: flex; flex-direction: column; gap: 8px; }
        .osl-item { display: flex; align-items: center; gap: 16px; padding: 14px 16px; background: var(--os-card); border: 1px solid var(--os-border); border-radius: 12px; transition: var(--os-trans); }
        .osl-item:hover { background: rgba(30, 30, 35, 0.6); border-color: var(--os-border-light); transform: translateX(4px); }
        .osl-icon { font-size: 18px; width: 24px; text-align: center; }
        .osl-data { flex-grow: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
        .osl-data strong { font-size: 13px; color: var(--os-text); }
        .osl-data span { font-size: 11px; color: var(--os-muted); }
        .osl-arr { color: var(--os-dark); font-size: 14px; transition: var(--os-trans); opacity: 0; position: relative; z-index: 1; }
        .osl-item:hover .osl-arr { opacity: 1; color: var(--os-text); transform: translateX(2px); }

        /* --- WIDE STACKED MODULES (AWARDS & MANIFEST) --- */
        .module-body-wide { padding: 24px; position: relative; z-index: 1; }
        .api-flex { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
        
        .api-img-wrapper { flex: 1 1 300px; border-radius: 16px; overflow: hidden; border: 1px solid var(--os-border); line-height: 0; box-shadow: 0 10px 25px rgba(0,0,0,0.3); position: relative; }
        .api-img-wrapper::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); pointer-events: none; }
        .api-img-wrapper img { width: 100%; height: auto; display: block; transition: transform 0.5s ease; }
        .api-img-wrapper:hover img { transform: scale(1.03); }
        
        .api-content-wrapper { flex: 2 1 400px; display: flex; flex-direction: column; justify-content: center; }
        .api-desc { font-size: 14px; color: var(--os-muted); margin: 0 0 20px 0; line-height: 1.6; }
        
        /* Stats Specific */
        .api-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .api-stat-box { background: rgba(0,0,0,0.3); border: 1px solid var(--os-border); padding: 14px; border-radius: 10px; transition: border-color 0.2s; }
        .api-stat-box:hover { border-color: rgba(255,255,255,0.2); }
        .api-stat-lbl { display: block; font-size: 11px; color: var(--os-dark); font-weight: 800; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .api-stat-val { font-size: 14px; color: var(--os-text); font-weight: 700; }

        /* Awards Specific */
        .api-aw-grid { display: flex; gap: 16px; flex-wrap: wrap; }
        .aw-card { flex: 1 1 180px; display: flex; align-items: center; gap: 16px; background: var(--os-card); border: 1px solid var(--os-border); padding: 16px; border-radius: 12px; transition: var(--os-trans); }
        .aw-card:hover { transform: translateY(-3px); background: rgba(30, 30, 35, 0.8); border-color: var(--os-gold); box-shadow: 0 10px 20px rgba(251, 191, 36, 0.1); }
        .aw-icon { font-size: 28px; position: relative; z-index: 1; }
        .aw-data { display: flex; flex-direction: column; position: relative; z-index: 1; }
        .aw-top { font-size: 10px; font-weight: 900; color: var(--os-gold); text-transform: uppercase; margin-bottom: 2px; letter-spacing: 1px;}
        .aw-main { font-size: 14px; font-weight: 700; color: var(--os-text); line-height: 1.2; }

        /* --- FOOTER --- */
        .os-footer { text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--os-border); font-size: 12px; color: var(--os-muted); }
        .os-footer p { margin: 0 0 8px 0; }
        .osf-copy { font-size: 12px; font-weight: 800; color: var(--os-dark); letter-spacing: 1px; }
    `;
    document.head.appendChild(style);

    // 3. LOGIC: INTERACTIVE MOUSE GLOW ("WOW" Effect)
    setTimeout(() => {
        document.querySelectorAll('.hover-glow').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }, 100);

    // 4. LOGIC: ACCORDION TOGGLES
    setTimeout(() => {
        document.querySelectorAll('.da-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                parent.classList.toggle('active');
            });
        });
    }, 50);

    // 5. LOGIC: SCROLL ANIMATIONS (Blur Reveal)
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

        document.querySelectorAll('.os-reveal').forEach((el) => observer.observe(el));
        
        // Trigger top elements immediately
        document.querySelectorAll('.os-hero, .os-dock-wrapper').forEach(el => el.classList.add('active'));
    }, 100);

    // 6. LOGIC: LIVE TIMER
    function startLiveTimer() {
        setInterval(() => {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                            now.getMinutes().toString().padStart(2, '0') + ":" + 
                            now.getSeconds().toString().padStart(2, '0');
            const timerEl = document.getElementById('os-clock');
            if(timerEl) timerEl.innerText = timeStr;
        }, 1000);
    }
    startLiveTimer();

    // 7. LOGIC: API LOADER FOR IMAGES
    function loadAndRender(fileName, targetId, renderFn) {
        const target = document.getElementById(targetId);
        if (!target) return;

        new mw.Api().get({
            action: 'query', titles: fileName, prop: 'imageinfo', iiprop: 'url', format: 'json'
        }).done(function(data) {
            let imgUrl = "https://placehold.co/600x400/101014/FFF?text=Loading...";
            const pages = data.query.pages;
            for (const key in pages) {
                if (pages[key].imageinfo && pages[key].imageinfo[0]) {
                    imgUrl = pages[key].imageinfo[0].url;
                }
            }
            renderFn(target, imgUrl);
            
            // Re-bind mouse glow to dynamically injected cards
            setTimeout(() => {
                document.querySelectorAll('.hover-glow').forEach(card => {
                    card.addEventListener('mousemove', e => {
                        const rect = card.getBoundingClientRect();
                        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                    });
                });
            }, 100);

        }).fail(function() {
            renderFn(target, "https://placehold.co/600x400/101014/FFF?text=Error");
        });
    }

    // RENDER: MANIFEST WIDGET (Wide Format)
    function renderManifest(target, imgUrl) {
        target.innerHTML = `
            <div class="api-flex">
                <div class="api-img-wrapper">
                    <img src="${imgUrl}" alt="Manifest Media">
                </div>
                <div class="api-content-wrapper">
                    <p class="api-desc">
                        Coaster Operator is an interactive simulation where you manage rides. Experience realistic operations, perform start-up procedures, and handle park guests. <span style="color:var(--os-green); font-weight:bold;">[PUBLIC ACCESS]</span>
                    </p>
                    <div class="api-stats">
                        <div class="api-stat-box hover-glow"><span class="api-stat-lbl">Developer</span><span class="api-stat-val">Coaster Studio</span></div>
                        <div class="api-stat-box hover-glow"><span class="api-stat-lbl">Platform</span><span class="api-stat-val">Roblox</span></div>
                        <div class="api-stat-box hover-glow"><span class="api-stat-lbl">Est. Date</span><span class="api-stat-val">04/14/2024</span></div>
                        <div class="api-stat-box hover-glow"><span class="api-stat-lbl">Status</span><span class="api-stat-val" style="color:var(--os-green);">ONLINE</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    // RENDER: AWARDS WIDGET (Wide Format)
    function renderAwards(target, imgUrl) {
        target.innerHTML = `
            <div class="api-flex">
                <div class="api-content-wrapper">
                    <p class="api-desc">Building on our immense success from the <b>RAAPA Winter Edition 2025</b>, Coaster Studio continues to set the benchmark for simulation experiences in the genre.</p>
                    <div class="api-aw-grid">
                        <div class="aw-card hover-glow">
                            <span class="aw-icon">🏆</span>
                            <div class="aw-data"><span class="aw-top">Winner</span><span class="aw-main">Best Group</span></div>
                        </div>
                        <div class="aw-card hover-glow">
                            <span class="aw-icon">⭐</span>
                            <div class="aw-data"><span class="aw-top">Winner</span><span class="aw-main">Best Hospitality</span></div>
                        </div>
                        <div class="aw-card hover-glow">
                            <span class="aw-icon">🎪</span>
                            <div class="aw-data"><span class="aw-top">Winner</span><span class="aw-main">Best Booth</span></div>
                        </div>
                    </div>
                </div>
                <div class="api-img-wrapper">
                    <img src="${imgUrl}" alt="Awards Graphic" style="max-height:220px; object-fit:cover;">
                </div>
            </div>
        `;
    }

    // 8. INIT API FETCHES
    loadAndRender(fileNameToFind, "game-manifest-target", renderManifest);
    loadAndRender(awardFileName, "raapa-awards-target", renderAwards);
});