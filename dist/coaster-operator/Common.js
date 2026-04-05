/* * Coaster Operator Wiki - v19 "The Perfect Layout" (Easter Edition)
 * Features: Horizontal Network Hub (Top), Fixed Spacing, Removed Status Badge, 100% Content, Easter Vibe.
 * New Features: Falling Particles, Multi-Colored Glow, Themed Cursor, 5-Egg Secret Hunt.
 */

$(function() {
    // --- CONFIGURATION ---
    const rootId = "coaster-wiki-root";
    const fileNameToFind = "File:RealisticDarKoaster.png"; 
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
            
            <div id="spring-particles-container"></div>

            <header class="os-hero os-reveal">
                <div class="hero-logo-box">
                    <img src="/Special:FilePath/Image.png" class="hero-logo" alt="Logo" />
                </div>
                
                <div class="hero-title-wrapper">
                    <div class="ht-accent-line left"></div>
                    <h1 class="hero-title">COASTER OPERATOR</h1>
                    <div class="ht-accent-line right"></div>
                </div>
                <p class="hero-sub">WIKI PORTAL • SPRING EDITION <span class="hidden-egg easter-egg" title="Is this... an egg?">🥚</span></p>
                
                <div class="hero-action">
                    <a href="${gameLink}" target="_blank" class="os-btn-launch hover-glow">
                        <span class="btn-glow"></span>
                        <span class="btn-text">PLAY NOW<span class="arr">→</span></span>
                    </a>
                </div>
            </header>

            <nav class="os-dock-wrapper os-reveal" style="transition-delay: 0.1s;">
                <div class="os-dock hover-glow">
                    <a href="/wiki/Gameplay" class="dock-item">
                        <span class="di-icon" style="color: var(--os-cyan);">🎮</span>
                        <span class="di-label">GAMEPLAY</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Codes" class="dock-item">
                        <span class="di-icon" style="color: var(--os-green);">🎟️</span>
                        <span class="di-label">CODES</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Rides" class="dock-item">
                        <span class="di-icon" style="color: var(--os-orange);">🎢</span>
                        <span class="di-label">RIDES</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Ranks" class="dock-item">
                        <span class="di-icon" style="color: var(--os-magenta);">⭐</span>
                        <span class="di-label">RANKS</span>
                    </a>
                    <div class="dock-divider"></div>
                    <a href="/wiki/Achievements" class="dock-item">
                        <span class="di-icon" style="color: var(--os-purple);">🏆</span>
                        <span class="di-label">ACHIEVEMENTS</span>
                    </a>
                </div>
            </nav>

            <div class="os-layout-single">
                
                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.15s; border-color: rgba(255, 156, 229, 0.4); box-shadow: 0 10px 30px rgba(255, 156, 229, 0.1);">
                    <div class="module-content-wrapper">
                        <div class="module-header" style="background: rgba(255, 156, 229, 0.08);">
                            <div class="mh-title"><span class="mh-icon">🐰</span> HOLIDAY GREETINGS</div>
                            <div class="mh-tag" style="color: var(--os-magenta); border-color: var(--os-magenta); background: rgba(255, 156, 229, 0.1);">SPRING EVENT</div>
                        </div>
                        <div class="module-body-wide" style="text-align: center; padding: 32px 24px;">
                            <h2 style="font-size: 26px; color: var(--os-text); margin-bottom: 12px; font-weight: 800; letter-spacing: 0.5px;">Happy Easter from Coaster Studio! 🥚✨</h2>
                            <p style="color: var(--os-muted); font-size: 14px; max-width: 650px; margin: 0 auto; line-height: 1.8;">
                                We hope you enjoy this wonderful time with your families, friends, and loved ones. Relax, eat lots of chocolate, and have an amazing holiday! Keep your eyes peeled on our announcements though... <strong style="color: var(--os-cyan);">something totally egg-citing is coming out very soon!</strong> 👀
                            </p>
                        </div>
                    </div>
                </div>

                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.2s;">
                    <div class="module-content-wrapper">
                        <div class="module-header">
                            <div class="mh-title"><span class="mh-icon" style="opacity: 0.8; font-size: 14px; margin-right: 6px; color: var(--os-cyan);">🔗</span> QUICK LINKS <span class="hidden-egg easter-egg" title="A quick egg!">🥚</span></div>
                        </div>
                        <div class="module-body-wide">
                            <div class="os-links-grid-4">
                                <a href="${gameLink}" target="_blank" class="osl-card hover-glow">
                                    <div class="osl-icon" style="color: var(--os-purple);">🎮</div>
                                    <div class="osl-data"><strong>OUR GAME</strong><span>Roblox Client</span></div>
                                </a>
                                <a href="https://discord.gg/Gq4mhYdKWC" target="_blank" class="osl-card hover-glow">
                                    <div class="osl-icon" style="color: #ffffff;">💬</div>
                                    <div class="osl-data"><strong>COMMUNICATIONS</strong><span>Discord Server</span></div>
                                </a>
                                <a href="https://www.roblox.com/communities/34173405/Coaster-Studio" target="_blank" class="osl-card hover-glow">
                                    <div class="osl-icon" style="color: var(--os-muted);">💼</div>
                                    <div class="osl-data"><strong>OUR COMMUNITY</strong><span>Roblox Group</span></div>
                                </a>
                                <a href="https://coasterstudiorblx.com/" target="_blank" class="osl-card hover-glow">
                                    <div class="osl-icon" style="color: var(--os-cyan);">🌐</div>
                                    <div class="osl-data"><strong>OUR WEBSITE</strong><span>Official Website</span></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.3s;">
                    <div class="module-content-wrapper">
                        <div class="module-header">
                            <div class="mh-title">
                                <span class="mh-icon" style="color: var(--os-gold);">⚡</span> UPDATE CHANGELOG
                            </div>
                            <div class="mh-tag">VERSION 1.4.8</div>
                        </div>

                        <div class="os-update-graphic">
                            <img src="/Special:FilePath/MiniUpdate.png" alt="Update Cover" style="object-position: center 95%;" />
                            <div class="ug-overlay">
                                <h2>MINI UPDATE</h2>
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
                                        <span class="da-icon" style="color:var(--os-cyan);">📡</span>
                                        <span class="da-title">Features & UI</span>
                                        <span class="da-badge" style="color:var(--os-cyan); background:rgba(126, 232, 250, 0.1);">INTEGRATED</span>
                                    </div>
                                    <div class="da-toggle">▼</div>
                                </div>
                                <div class="da-content">
                                    <ul class="dc-list">
                                        <li>Revamped all settings, settings UI & added some new settings</li>
                                        <li>Added Move Icon to tutorial UI (moveable beforehand as well)</li>
                                        <li>Small improvements to procedures UI</li>
                                        <li>Added new promo code: "thanksfor7mil"</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="data-accordion hover-glow">
                                <div class="da-header">
                                    <div class="da-title-group">
                                        <span class="da-icon" style="color:var(--os-orange);">🎢</span>
                                        <span class="da-title">Ride Calibrations</span>
                                        <span class="da-badge" style="color:var(--os-orange); background:rgba(255, 192, 153, 0.1);">MODIFIED</span>
                                    </div>
                                    <div class="da-toggle">▼</div>
                                </div>
                                <div class="da-content">
                                    <div class="dc-grid">
                                        <div class="dc-grid-item">
                                            <span class="dgi-title">Phoenix & DarKoaster</span>
                                            <span class="dgi-desc">Added test dummies stage.</span>
                                        </div>
                                        <div class="dc-grid-item">
                                            <span class="dgi-title">Giant Drop</span>
                                            <span class="dgi-desc">Added option to disable side panel (disabled by default).</span>
                                        </div>
                                        <div class="dc-grid-item">
                                            <span class="dgi-title">Cobra's Curse & Phoenix</span>
                                            <span class="dgi-desc">Fixed minor soft lock that forced a full shutdown.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="data-accordion hover-glow">
                                <div class="da-header">
                                    <div class="da-title-group">
                                        <span class="da-icon" style="color:var(--os-green);">🛠️</span>
                                        <span class="da-title">Maintenance Logs</span>
                                        <span class="da-badge" style="color:var(--os-green); background:rgba(133, 232, 157, 0.1);">RESOLVED</span>
                                    </div>
                                    <div class="da-toggle">▼</div>
                                </div>
                                <div class="da-content">
                                    <ul class="dc-list">
                                        <li>Fixed some scrolling UI scaling & elasticity</li>
                                        <li>Fixed decorations system bugs & 'points eaters'</li>
                                        <li>Scenery optimisation improvements <span class="hidden-egg easter-egg" title="An optimized egg!">🥚</span></li>
                                        <li>Various other minor bug fixes</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        
                        <div class="module-footer">
                            <div class="mf-status">ENCRYPTED_V1.4.8</div>
                            <div class="mf-time">
                                <span>LIVE: MAR 2026</span>
                                <span id="os-clock" class="digital-clock">00:00:00</span> <span class="hidden-egg easter-egg" title="A timely egg!">🥚</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="os-stacked-modules">
                
                <div class="os-module hover-glow os-reveal" style="transition-delay: 0.4s;">
                    <div class="module-content-wrapper">
                        <div class="module-header">
                            <div class="mh-title"><span class="mh-icon" style="color:var(--os-purple);">ℹ️</span> COASTER STUDIO MANIFEST</div>
                        </div>
                        <div id="game-manifest-target" class="module-body-wide"></div>
                    </div>
                </div>

            </div>
            
            <footer class="os-footer os-reveal" style="transition-delay: 0.5s;">
                <div class="osf-text">All <b>Coaster Studio</b> trademarks, logos, and original game media are protected by copyright.</div>
                <div class="osf-copy">© 2026 COASTER STUDIO. ALL RIGHTS RESERVED. <span class="hidden-egg easter-egg" title="The final egg!">🥚</span></div>
            </footer>

        </div>
    `;

    // 2. INJECT CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- CORE DESIGN TOKENS (EASTER PASTEL PALETTE) --- */
        :root {
            --os-bg: #130f1c; /* Soft dark twilight blue/purple */
            --os-surface: rgba(25, 20, 35, 0.65);
            --os-card: rgba(30, 25, 40, 0.4);
            
            --os-border: rgba(255, 255, 255, 0.1);
            --os-border-light: rgba(255, 255, 255, 0.2);
            --os-border-glow: rgba(255, 156, 229, 0.4);
            
            --os-text: #ffffff;
            --os-muted: #cbd5e1;
            --os-dark: #64748b;
            
            --os-magenta: #ff9ce5; /* Pastel Pink */
            --os-purple: #b582ff; /* Pastel Purple */
            --os-cyan: #7ee8fa; /* Pastel Blue */
            --os-gold: #fcf6bd; /* Pastel Yellow */
            --os-orange: #ffc099; /* Peach/Pastel Orange */
            --os-green: #85e89d; /* Pastel Green */
            
            --os-trans: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Custom Pastel Egg Cursor */
        .os-master-container, .os-master-container * {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="%23ff9ce5" stroke="%23fff" stroke-width="2" d="M12 2C8 2 4 8 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-4-12-8-12z"/></svg>') 14 2, auto !important;
        }
        .os-master-container a, .os-master-container a *, .os-master-container .dock-item, .os-master-container .da-header, .hidden-egg {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="%237ee8fa" stroke="%23fff" stroke-width="2" d="M12 2C8 2 4 8 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-4-12-8-12z"/></svg>') 14 2, pointer !important;
        }

        /* --- WRAPPER & BACKGROUNDS --- */
        .os-master-container {
            position: relative; background-color: var(--os-bg); color: var(--os-text);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            max-width: 1150px; margin: 0 auto; padding: 40px 20px;
            text-align: left; line-height: 1.6; border-radius: 24px; overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6); z-index: 1;
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
            width: 800px; height: 600px; background: radial-gradient(circle, rgba(181, 130, 255, 0.15) 0%, rgba(255, 156, 229, 0.1) 40%, transparent 70%);
            z-index: -1; pointer-events: none; filter: blur(60px);
        }
        .os-ambient-secondary {
            position: absolute; bottom: -200px; right: -100px;
            width: 600px; height: 600px; background: radial-gradient(circle, rgba(126, 232, 250, 0.1) 0%, rgba(181, 130, 255, 0.05) 50%, transparent 70%);
            z-index: -1; pointer-events: none; filter: blur(60px);
        }
        .pulse-ambient { animation: breathe 8s ease-in-out infinite alternate; }
        @keyframes breathe { 0% { opacity: 0.7; transform: translateX(-50%) scale(0.95); } 100% { opacity: 1; transform: translateX(-50%) scale(1.05); } }

        /* Falling Spring Particles */
        #spring-particles-container {
            position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; border-radius: 24px;
        }
        .spring-particle {
            position: absolute; top: -20px; opacity: 0; pointer-events: none;
            animation: fall linear infinite;
        }
        @keyframes fall {
            0% { transform: translate(0, -20px) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translate(var(--sway, 50px), 1500px) rotate(360deg); opacity: 0; }
        }

        a { text-decoration: none !important; color: inherit; }
        h1, h2, h3, h4 { margin: 0; color: var(--os-text); font-weight: 700; border: none; }

        /* Cinematic Blur Reveal */
        .os-reveal { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(10px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease-out; }
        .os-reveal.active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        /* --- MOUSE TRACKING GLOW (Animated Multi-Color) --- */
        .hover-glow {
            position: relative; overflow: hidden;
        }
        .hover-glow::before {
            content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255, 156, 229, 0.15), transparent 40%);
            z-index: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s;
            animation: pastelHueCycle 6s linear infinite;
        }
        .hover-glow:hover::before { opacity: 1; }
        @keyframes pastelHueCycle {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .module-content-wrapper { position: relative; z-index: 1; height: 100%; }

        /* --- HERO SECTION --- */
        .os-hero { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px; padding-top: 20px; }

        .hero-logo-box { position: relative; width: 88px; height: 88px; margin-bottom: 24px; }
        .hero-logo-box::before { content: ''; position: absolute; inset: -4px; border-radius: 24px; background: linear-gradient(135deg, var(--os-cyan), var(--os-magenta)); filter: blur(12px); opacity: 0.6; z-index: 0; animation: spinGlow 4s linear infinite; }
        @keyframes spinGlow { 100% { filter: hue-rotate(360deg) blur(12px); } }
        .hero-logo { position: relative; width: 100%; height: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); z-index: 1; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
        
        /* Animated Gradient Title - SPRING COLORS SWEEP */
        .hero-title-wrapper { display: flex; align-items: center; gap: 20px; margin-bottom: 8px; width: 100%; justify-content: center; }
        .ht-accent-line { height: 1px; flex-grow: 1; max-width: 80px; background: linear-gradient(90deg, transparent, rgba(255, 156, 229, 0.5)); }
        .ht-accent-line.left { background: linear-gradient(270deg, transparent, rgba(255, 156, 229, 0.5)); }
        .hero-title { 
            font-size: 54px; font-weight: 900; letter-spacing: 4px; 
            background: linear-gradient(to right, #ff9ce5 0%, #b582ff 35%, #7ee8fa 50%, #b582ff 65%, #ff9ce5 100%); 
            background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
            line-height: 1.1; text-shadow: 0 0 40px rgba(255, 156, 229, 0.3); text-transform: uppercase; 
            animation: shineText 5s linear infinite; 
        }
        @keyframes shineText { to { background-position: 200% center; } }
        
        .hero-sub { font-size: 13px; font-weight: 600; color: var(--os-magenta); letter-spacing: 4px; }

        .hero-action { margin-top: 32px; }
        .os-btn-launch { position: relative; background: rgba(255,255,255,0.03); border: 1px solid var(--os-border-light); color: var(--os-text); padding: 14px 32px; border-radius: 100px; font-size: 13px; font-weight: 800; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 10px; overflow: hidden; transition: var(--os-trans); backdrop-filter: blur(10px); }
        .btn-glow { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255, 156, 229, 0.3), transparent); transform: translateX(-100%); transition: transform 0.6s ease; z-index: 0; }
        .os-btn-launch:hover .btn-glow { transform: translateX(100%); }
        .btn-text { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }
        .arr { transition: transform 0.3s; }
        .os-btn-launch:hover { border-color: var(--os-magenta); box-shadow: 0 0 20px rgba(255, 156, 229, 0.3); background: rgba(255, 156, 229, 0.1); }
        .os-btn-launch:hover .arr { transform: translateX(4px); }

        /* --- FLOATING DOCK (NAVIGATION) --- */
        .os-dock-wrapper { display: flex; justify-content: center; margin-bottom: 40px; position: sticky; top: 20px; z-index: 100; }
        .os-dock { display: flex; align-items: center; gap: 8px; background: rgba(25, 20, 35, 0.75); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--os-border); padding: 8px 12px; border-radius: 100px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: border-color 0.3s; }
        .os-dock:hover { border-color: var(--os-border-light); }
        
        .dock-item { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 100px; transition: var(--os-trans); position: relative; cursor: pointer; z-index: 1;}
        .dock-item:hover { background: rgba(255,255,255,0.08); }
        .di-icon { font-size: 16px; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .dock-item:hover .di-icon { transform: scale(1.2); }
        .di-label { font-size: 13px; font-weight: 600; color: var(--os-text); }
        .dock-divider { width: 1px; height: 20px; background: var(--os-border); }

        /* --- LAYOUT GRIDS --- */
        .os-layout-single { display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px; align-items: stretch; }
        .os-stacked-modules { display: flex; flex-direction: column; gap: 24px; }
        
        @media (max-width: 900px) { 
            .hero-title { font-size: 32px; }
        }
        
        /* --- MODULES (PANELS) --- */
        .os-module { background: var(--os-surface); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--os-border); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: border-color 0.3s, box-shadow 0.3s; }
        .os-module:hover { border-color: var(--os-border-light); box-shadow: 0 15px 40px rgba(0,0,0,0.4); }
        
        .module-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--os-border); background: rgba(0,0,0,0.2); }
        .mh-title { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 800; letter-spacing: 1px; color: var(--os-text); }
        .mh-icon { font-size: 14px; }
        .mh-tag { font-size: 10px; font-weight: 700; color: var(--os-muted); border: 1px solid var(--os-border); padding: 4px 10px; border-radius: 12px; letter-spacing: 1px; }
        
        /* --- HORIZONTAL NETWORK HUB --- */
        .os-links-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .osl-card { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--os-bg); border: 1px solid var(--os-border); border-radius: 12px; transition: var(--os-trans); }
        .osl-card:hover { background: rgba(40, 35, 50, 0.6); border-color: var(--os-border-light); transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .osl-icon { font-size: 22px; width: 32px; text-align: center; }
        .osl-data { flex-grow: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
        .osl-data strong { font-size: 13px; color: var(--os-text); }
        .osl-data span { font-size: 11px; color: var(--os-muted); }

        /* --- UPDATE CONTENT --- */
        .os-update-graphic { position: relative; width: 100%; height: 180px; border-bottom: 1px solid var(--os-border); }
        .os-update-graphic img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
        .ug-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 24px; background: linear-gradient(transparent, rgba(0,0,0,0.9)); }
        .ug-overlay h2 { font-size: 32px; font-weight: 900; letter-spacing: -0.5px; text-shadow: 0 4px 10px rgba(0,0,0,0.8); }

        .os-warning-strip { margin: 24px; padding: 16px; background: rgba(255, 156, 229, 0.05); border: 1px dashed rgba(255, 156, 229, 0.3); border-radius: 12px; display: flex; align-items: center; gap: 16px; transition: var(--os-trans); }
        .os-warning-strip:hover { border-color: rgba(255, 156, 229, 0.6); background: rgba(255, 156, 229, 0.08); }
        .ws-icon { font-size: 20px; position: relative; z-index: 1; }
        .ws-content { display: flex; flex-direction: column; font-size: 13px; color: var(--os-muted); position: relative; z-index: 1; }
        .ws-content strong { color: var(--os-magenta); font-size: 12px; margin-bottom: 2px; letter-spacing: 0.5px; }

        /* --- INTERACTIVE ACCORDIONS (CHANGELOG) --- */
        .os-data-accordions { display: flex; flex-direction: column; gap: 12px; padding: 0 24px 32px 24px; }
        
        .data-accordion { background: var(--os-card); border: 1px solid var(--os-border); border-radius: 16px; transition: var(--os-trans); }
        .data-accordion:hover { border-color: var(--os-border-light); }
        .data-accordion.active { border-color: var(--os-border-glow); background: rgba(35, 30, 45, 0.8); box-shadow: 0 10px 20px rgba(255, 156, 229, 0.05); }
        
        .da-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; cursor: pointer; user-select: none; transition: var(--os-trans); position: relative; z-index: 1; }
        .da-title-group { display: flex; align-items: center; gap: 12px; }
        .da-title { font-size: 15px; font-weight: 700; color: var(--os-text); }
        .da-badge { font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 6px; letter-spacing: 1px; border: 1px solid var(--os-border); }
        
        .da-toggle { font-size: 12px; color: var(--os-muted); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .data-accordion.active .da-toggle { transform: rotate(180deg); color: var(--os-text); }
        .data-accordion.active .da-header { border-bottom: 1px solid rgba(255,255,255,0.05); }

        .da-content { max-height: 0; opacity: 0; padding: 0 20px; transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, padding 0.4s ease; position: relative; z-index: 1; }
        .data-accordion.active .da-content { max-height: 800px; opacity: 1; padding: 20px; }

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

        /* --- WIDE STACKED MODULES (AWARDS & MANIFEST) --- */
        .module-body-wide { padding: 24px; position: relative; z-index: 1; }
        .api-flex { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
        
        .api-img-wrapper { flex: 1 1 300px; border-radius: 16px; overflow: hidden; border: 1px solid var(--os-border); line-height: 0; box-shadow: 0 10px 25px rgba(0,0,0,0.3); position: relative; }
        .api-img-wrapper::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); pointer-events: none; }
        .api-img-wrapper img { width: 100%; height: auto; display: block; transition: transform 0.5s ease; }
        .api-img-wrapper:hover img { transform: scale(1.03); }
        
        .api-content-wrapper { flex: 2 1 400px; display: flex; flex-direction: column; justify-content: center; }
        .api-desc { font-size: 14px; color: var(--os-muted); margin: 0 0 20px 0; line-height: 1.6; }
        
        .api-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .api-stat-box { background: rgba(0,0,0,0.3); border: 1px solid var(--os-border); padding: 14px; border-radius: 10px; transition: border-color 0.2s; }
        .api-stat-box:hover { border-color: rgba(255,255,255,0.2); }
        .api-stat-lbl { display: block; font-size: 11px; color: var(--os-dark); font-weight: 800; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .api-stat-val { font-size: 14px; color: var(--os-text); font-weight: 700; }

        /* --- FOOTER --- */
        .os-footer { text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--os-border); font-size: 12px; color: var(--os-muted); position: relative; z-index: 1; }
        .os-footer p { margin: 0 0 8px 0; }
        .osf-copy { font-size: 12px; font-weight: 800; color: var(--os-dark); letter-spacing: 1px; }

        /* --- NEW: EASTER EGG HUNT CSS --- */
        .hidden-egg {
            display: inline-block; opacity: 0.15; transition: var(--os-trans);
            filter: grayscale(100%); margin: 0 6px; user-select: none;
            font-size: 20px; /* Made the eggs larger here */
        }
        .hidden-egg:hover { opacity: 1; filter: grayscale(0%); transform: scale(1.3) rotate(15deg); }
        .hidden-egg.found-egg {
            opacity: 1; filter: grayscale(0%) drop-shadow(0 0 8px var(--os-gold));
            transform: scale(1.2); pointer-events: none;
        }

        /* Modal Popup */
        .egg-modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(19, 15, 28, 0.85);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999; opacity: 0; pointer-events: none; transition: opacity 0.5s;
        }
        .egg-modal-overlay.show { opacity: 1; pointer-events: all; }
        .egg-modal {
            background: rgba(30, 25, 40, 0.85); border: 1px solid var(--os-border-glow);
            padding: 40px; border-radius: 24px; text-align: center; font-family: 'Inter', sans-serif;
            box-shadow: 0 20px 60px rgba(255, 156, 229, 0.2);
            transform: translateY(30px) scale(0.9); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .egg-modal-overlay.show .egg-modal { transform: translateY(0) scale(1); }
        .em-title { font-size: 32px; font-weight: 900; margin-bottom: 12px; background: linear-gradient(to right, #ff9ce5, #7ee8fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .em-desc { color: var(--os-muted); font-size: 15px; margin-bottom: 28px; max-width: 400px; line-height: 1.6; }
        .em-btn { background: rgba(255, 156, 229, 0.15); border: 1px solid var(--os-magenta); color: #fff; padding: 12px 32px; border-radius: 100px; font-weight: 800; letter-spacing: 1px; transition: var(--os-trans); cursor: pointer; }
        .em-btn:hover { background: rgba(255, 156, 229, 0.3); box-shadow: 0 0 20px rgba(255, 156, 229, 0.4); transform: translateY(-2px); }

        /* Rainbow Frenzy Ambient Mode */
        .rainbow-frenzy .pulse-ambient {
            animation: breathe 1.5s ease-in-out infinite alternate, colorRave 1s linear infinite !important;
            opacity: 1 !important; filter: blur(50px) brightness(1.5) saturate(2);
        }
        @keyframes colorRave {
            0% { filter: hue-rotate(0deg) blur(50px) brightness(1.5) saturate(2); }
            100% { filter: hue-rotate(360deg) blur(50px) brightness(1.5) saturate(2); }
        }
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

    // 7. LOGIC: SPRING PARTICLES INJECTOR
    setTimeout(() => {
        const pContainer = document.getElementById('spring-particles-container');
        if (!pContainer) return;
        
        const colors = ['var(--os-magenta)', 'var(--os-cyan)', 'var(--os-gold)', 'var(--os-green)', 'var(--os-orange)'];
        const shapes = ['50%', '30% 70% 70% 30% / 30% 30% 70% 70%', '40% 60% 70% 30% / 40% 50% 60% 50%']; 
        
        for (let i = 0; i < 25; i++) {
            let p = document.createElement('div');
            p.className = 'spring-particle';
            
            let size = Math.random() * 10 + 6; 
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            
            let duration = Math.random() * 8 + 8; 
            let delay = Math.random() * 10;
            p.style.animationDuration = duration + 's';
            p.style.animationDelay = delay + 's';
            
            p.style.setProperty('--sway', (Math.random() * 100 - 50) + 'px');
            
            pContainer.appendChild(p);
        }
    }, 200);

    // 8. LOGIC: API LOADER FOR IMAGES
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

    // RENDER: MANIFEST WIDGET
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

    // INIT API FETCHES
    loadAndRender(fileNameToFind, "game-manifest-target", renderManifest);

    // 9. LOGIC: EASTER EGG HUNT
    setTimeout(() => {
        let eggsFound = 0;
        const totalEggs = 5;
        const eggElements = document.querySelectorAll('.easter-egg');

        eggElements.forEach(egg => {
            egg.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if(this.classList.contains('found-egg')) return;
                
                this.classList.add('found-egg');
                eggsFound++;
                
                if(eggsFound === totalEggs) {
                    setTimeout(triggerEasterSecret, 400);
                }
            });
        });

        function triggerEasterSecret() {
            // Activate Rainbow Mode
            document.querySelector('.os-master-container').classList.add('rainbow-frenzy');
            
            // Generate and open modal
            const overlay = document.createElement('div');
            overlay.className = 'egg-modal-overlay';
            overlay.innerHTML = `
                <div class="egg-modal">
                    <div style="font-size: 48px; margin-bottom: 12px; animation: spinGlow 4s linear infinite;">🐰</div>
                    <div class="em-title">ALL EGGS FOUND!</div>
                    <div class="em-desc">Incredible job! You tracked down all 5 hidden eggs across the portal. Enjoy the rainbow overdrive mode!</div>
                    <button class="em-btn" id="close-egg-modal">AWESOME!</button>
                </div>
            `;
            targetRoot.appendChild(overlay);
            
            // Allow CSS to catch up before fading in
            setTimeout(() => overlay.classList.add('show'), 50);
            
            document.getElementById('close-egg-modal').addEventListener('click', () => {
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 500);
            });
        }
    }, 500);
});