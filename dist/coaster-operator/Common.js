mw.hook('wikipage.content').add(function() {
    if (window.coasterWikiInitialized) return;
    window.coasterWikiInitialized = true;

    const rootId = "coaster-wiki-root";
    const fileNameToFind = "File:RealisticDarKoaster.png"; 
    const gameLink = "https://www.roblox.com/games/17152219682/Coaster-Operator";

    const targetRoot = document.getElementById(rootId);
    if (!targetRoot) return; 
    targetRoot.removeAttribute("style");

    const icons = {
        play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
        gameplay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="12" r="1"/><path d="M18 12h.01"/></svg>',
        codes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16"/></svg>',
        rides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
        ranks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        awards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4v3a7 7 0 1014 0V4H5z"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
        discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>'
    };

    if (!document.getElementById('ns-global-fx')) {
        const globalFx = document.createElement('div');
        globalFx.id = "ns-global-fx";
        globalFx.className = "global-fx-container";
        globalFx.setAttribute('data-theme', 'sunset');
        globalFx.innerHTML = `
            <div class="theme-bg-engine"></div>
            <div class="ambient-layer">
                <div class="ambient-orb orb-1"></div>
                <div class="ambient-orb orb-2"></div>
                <div class="ambient-orb orb-3"></div>
            </div>
            <div id="particle-layer" class="particle-container"></div>
        `;
        document.body.prepend(globalFx);
    }

    targetRoot.innerHTML = `
        <div class="ns-master-container" id="ns-master" data-theme="sunset">
            
            <div class="ns-theme-switcher interactive-hover">
                <span class="ts-label">Vibe:</span>
                <button class="ts-btn active" data-theme="sunset" title="Sunset">🌅</button>
                <button class="ts-btn" data-theme="ocean" title="Ocean">🌊</button>
                <button class="ts-btn" data-theme="jungle" title="Jungle">🌴</button>
            </div>

            <header class="ns-hero ns-reveal">
                <div class="event-pill">
                    <span class="pulse-dot"></span>
                    <span class="ep-text">SUMMER HAS ARRIVED</span>
                </div>
                <div class="ns-logo-box interactive-hover">
                    <img src="/Special:FilePath/Image.png" class="ns-logo" alt="Coaster Operator" onerror="this.src='https://placehold.co/150x150/111/FFF?text=CO'" />
                </div>
                <h1 class="ns-title">COASTER OPERATOR</h1>
                <div class="ns-hero-actions">
                    <a href="${gameLink}" target="_blank" class="btn-modern-play interactive-hover">
                        <span class="play-icon">${icons.play}</span>
                        <span class="play-text">PLAY NOW</span>
                    </a>
                </div>
                <div class="ns-search-container">
                    <div class="search-input-wrapper">
                        <span class="search-icon">${icons.search}</span>
                        <input type="text" id="ns-live-search" class="ns-search-input" placeholder="Search the Wiki (Articles & Context)..." autocomplete="off">
                    </div>
                    <div id="ns-search-results" class="ns-search-dropdown custom-scroll"></div>
                </div>
            </header>

            <nav class="ns-dock-wrapper ns-reveal" style="transition-delay: 0.1s;">
                <div class="ns-sleek-dock">
                    <a href="/wiki/Gameplay" class="sleek-dock-item interactive-hover"><span class="sdi-icon">${icons.gameplay}</span> Gameplay</a>
                    <a href="/wiki/Codes" class="sleek-dock-item interactive-hover"><span class="sdi-icon">${icons.codes}</span> Codes</a>
                    <a href="/wiki/Rides" class="sleek-dock-item interactive-hover"><span class="sdi-icon">${icons.rides}</span> Rides</a>
                    <a href="/wiki/Ranks" class="sleek-dock-item interactive-hover"><span class="sdi-icon">${icons.ranks}</span> Ranks</a>
                    <a href="/wiki/Achievements" class="sleek-dock-item interactive-hover"><span class="sdi-icon">${icons.awards}</span> Awards</a>
                </div>
            </nav>

            <div class="ns-layout-main">
                
                <div class="ns-card dynamic-glow ns-reveal" style="transition-delay: 0.2s;">
                    <div class="ns-card-header"><h2>QUICK LINKS</h2></div>
                    <div class="ns-card-body">
                        <div class="ns-grid-4">
                            <a href="${gameLink}" target="_blank" class="ns-link-card interactive-hover">
                                <div class="lc-icon dynamic-icon">${icons.gameplay}</div>
                                <div class="lc-data"><strong>Our Game</strong><span>Roblox Client</span></div>
                            </a>
                            <a href="https://discord.gg/Gq4mhYdKWC" target="_blank" class="ns-link-card interactive-hover">
                                <div class="lc-icon dynamic-icon">${icons.discord}</div>
                                <div class="lc-data"><strong>Community</strong><span>Discord Server</span></div>
                            </a>
                            <a href="https://www.roblox.com/communities/34173405/Coaster-Studio" target="_blank" class="ns-link-card interactive-hover">
                                <div class="lc-icon dynamic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></div>
                                <div class="lc-data"><strong>The Studio</strong><span>Roblox Group</span></div>
                            </a>
                            <a href="https://coasterstudiorblx.com/" target="_blank" class="ns-link-card interactive-hover">
                                <div class="lc-icon dynamic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
                                <div class="lc-data"><strong>Website</strong><span>Official Hub</span></div>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="ns-card dynamic-glow ns-reveal" style="transition-delay: 0.3s;">
                    <div class="ns-card-header flex-header">
                        <h2>CHANGELOG</h2>
                        <span class="version-tag">Live Build: Patch 4.2</span>
                    </div>
                    <div class="ns-card-body p-0" style="background: rgba(0,0,0,0.2);">
                        <div class="pro-timeline custom-scroll">
                            <div class="pt-track"></div>
                            
                            <!-- Timeline Node 1: Major Update -->
                            <div class="pt-node">
                                <div class="pt-marker" style="border-color: var(--neon-primary); box-shadow: 0 0 10px var(--glow-color); background: var(--neon-primary);"></div>
                                <div class="pt-card">
                                    <button class="pt-header">
                                        <div class="pt-meta">
                                            <span class="acc-badge bg-primary">NEW RIDE</span>
                                            <h3>Treetop Drop Arrives</h3>
                                        </div>
                                        <div class="pt-actions">
                                            <span class="pt-date">v1.4.8</span>
                                            <span class="pt-icon">${icons.chevron}</span>
                                        </div>
                                    </button>
                                    <div class="pt-body">
                                        <div class="pt-inner">
                                            <img src="/Special:FilePath/treetop.png" onerror="this.src='https://placehold.co/800x300/111/444?text=Treetop+Drop'" class="acc-hero-img" alt="Treetop Drop" />
                                            <p>The latest drop tower attraction has arrived. Experience realistic operations, manage queues, check restraints, and safely dispatch!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Timeline Node 2: Patch 4.2 -->
                            <div class="pt-node">
                                <div class="pt-marker" style="border-color: #ff3366;"></div>
                                <div class="pt-card">
                                    <button class="pt-header">
                                        <div class="pt-meta">
                                            <span class="acc-badge bg-danger">PATCH 4.2</span>
                                            <h3>Giant Drop & System Overhauls</h3>
                                        </div>
                                        <div class="pt-actions">
                                            <span class="pt-date">General</span>
                                            <span class="pt-icon">${icons.chevron}</span>
                                        </div>
                                    </button>
                                    <div class="pt-body">
                                        <div class="pt-inner">
                                            <ul class="dev-list">
                                                <li><strong>Giant Drop:</strong> Implemented new NPC and movement systems, more realistic sounds, and fixed catch car operation/sync locking. Start-up & shutdown procedures now require opening/closing queues.</li>
                                                <li><strong>DarKoaster:</strong> Made ROC 2 side panel functional (toggle via power key), fixed duplicate "Wait for train(s)" errors, and improved NPC exiting & motor sound roll-off.</li>
                                                <li><strong>Cobra's Curse:</strong> Fixed NPCs grouping up at the end of the platform. The queue gate now closes automatically once the waiting area is fully drained.</li>
                                                <li><strong>Red Arrows & Phoenix Rising:</strong> Upgraded Red Arrows seats and smoothed motor pitch. Fixed Phoenix Rising maintenance panel bugs and tutorial storage cabinet highlight sticking.</li>
                                                <li><strong>Systems:</strong> NPCs now tween & walk off when exiting (instead of falling over), reduced trash harshness on operator ratings, and startup procedures are no longer forced after simple power cycles.</li>
                                                <li><strong>Pathing Optimisations:</strong> Improved NPC boarding/exiting paths across Giant Drop, Phoenix Rising, Red Arrows Skyforce, and Treetop Drop.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Timeline Node 3: Adjustments -->
                            <div class="pt-node">
                                <div class="pt-marker" style="border-color: #00f0ff;"></div>
                                <div class="pt-card">
                                    <button class="pt-header">
                                        <div class="pt-meta">
                                            <span class="acc-badge bg-info">ADJUSTMENT</span>
                                            <h3>Economy & UI Tweaks</h3>
                                        </div>
                                        <div class="pt-actions">
                                            <span class="pt-date">Economy</span>
                                            <span class="pt-icon">${icons.chevron}</span>
                                        </div>
                                    </button>
                                    <div class="pt-body">
                                        <div class="pt-inner">
                                            <ul class="dev-list">
                                                <li><strong>Leaderboard returns:</strong> Brand new UI and highly optimized background script.</li>
                                                <li><strong>Cobra's Curse:</strong> Economy adjustment applied. This ride now costs coins to operate.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Timeline Node 4: Maintenance -->
                            <div class="pt-node">
                                <div class="pt-marker" style="border-color: #00ff88;"></div>
                                <div class="pt-card">
                                    <button class="pt-header">
                                        <div class="pt-meta">
                                            <span class="acc-badge bg-success">MAINTENANCE</span>
                                            <h3>Bug Fixes & Collisions</h3>
                                        </div>
                                        <div class="pt-actions">
                                            <span class="pt-date">General</span>
                                            <span class="pt-icon">${icons.chevron}</span>
                                        </div>
                                    </button>
                                    <div class="pt-body">
                                        <div class="pt-inner">
                                            <ul class="dev-list">
                                                <li>Collision improvements to Giant Drop & updated restraints.</li>
                                                <li>Restraint highlights now automatically fade after 10s.</li>
                                                <li>Trialling Motor6D restraints tweening on Treetop Drop.</li>
                                                <li>Major NPC system bug fixes and added variable boarding.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="ns-bottom-grid">
                    
                    <div class="ns-card dynamic-glow ns-reveal" style="transition-delay: 0.4s;">
                        <div class="ns-card-header flex-header">
                            <h2>GAME INFORMATION</h2>
                            <div class="time-widget"><span class="tab-badge-emoji theme-main-emoji"></span> <span id="ns-clock">00:00:00</span></div>
                        </div>
                        <div class="ns-card-body" style="padding:0; height: 100%;">
                            <div id="game-manifest-target" style="height: 100%;"><div class="ns-loader"></div></div>
                        </div>
                    </div>

                    <div class="ns-card dynamic-glow quiz-card ns-reveal" style="transition-delay: 0.5s; display: flex; flex-direction: column;">
                        <div class="ns-card-header flex-header">
                            <h2>OPERATOR EXAM</h2>
                            <div class="quiz-badge" style="border-color: var(--neon-primary);">DISCORD ROLE REWARD</div>
                        </div>

                        <div id="quiz-header-ui" class="quiz-timeline-top" style="display: none;">
                            <div class="qt-bar"><div id="q-bar-fill" class="qt-bar-fill"></div></div>
                            <div class="qt-info">
                                <span class="qt-step">Question <span id="q-current">1</span> of <span id="q-total">5</span></span>
                                <span class="qt-timer" id="quiz-timer"><span class="qt-icon">${icons.clock}</span> <span id="quiz-timer-text">60.0s</span></span>
                            </div>
                        </div>

                        <div class="ns-card-body quiz-body" id="quiz-container" style="flex-grow: 1;">
                            
                            <div id="quiz-start" class="quiz-section active">
                                <div class="quiz-icon-large">${icons.discord}</div>
                                <h3>Get Certified!</h3>
                                <p>Pass this timed 5-question exam to earn your official <strong>Wiki Coaster Operator</strong> certificate. Show it on Discord to claim your exclusive role!</p>
                                <button id="btn-begin" class="quiz-btn-primary interactive-hover">ENTER EXAM</button>
                            </div>

                            <div id="quiz-input" class="quiz-section">
                                <h3>Identify Yourself</h3>
                                <p>Enter your Discord username so it appears on your official certificate.</p>
                                <input type="text" id="discord-username" class="quiz-input-field" placeholder="e.g. @coasterfan" autocomplete="off">
                                <button id="btn-next-diff" class="quiz-btn-primary interactive-hover" style="margin-top:16px;">NEXT STEP</button>
                            </div>

                            <!-- Difficulty Selection Screen -->
                            <div id="quiz-difficulty" class="quiz-section">
                                <h3>Select Difficulty</h3>
                                <p>Choose your exam level. Harder levels give less time per quiz!</p>
                                <div class="diff-grid">
                                    <button class="diff-btn interactive-hover" data-diff="easy">
                                        <strong>EASY</strong>
                                        <span>60 Seconds</span>
                                    </button>
                                    <button class="diff-btn interactive-hover" data-diff="medium">
                                        <strong>MEDIUM</strong>
                                        <span>45 Seconds</span>
                                    </button>
                                    <button class="diff-btn interactive-hover" data-diff="hard">
                                        <strong>HARD</strong>
                                        <span>30 Seconds</span>
                                    </button>
                                </div>
                            </div>

                            <div id="quiz-question" class="quiz-section">
                                <h3 id="q-text" class="question-text">Question goes here?</h3>
                                <div id="q-options" class="options-grid"></div>
                            </div>

                            <div id="quiz-fail" class="quiz-section">
                                <div class="quiz-icon-large" style="color:#ff3366; background:rgba(255,51,102,0.1);">${icons.search}</div>
                                <h3 id="fail-title" style="color:#ff3366;">Training Required.</h3>
                                <p id="fail-desc">You didn't pass this time! Brush up on your Coaster Operator knowledge and try again.</p>
                                <button id="btn-restart-quiz" class="quiz-btn-secondary interactive-hover">RETAKE EXAM</button>
                            </div>

                            <div id="quiz-result" class="quiz-section" style="overflow: hidden;">
                                <div id="confetti-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 0;"></div>
                                <div class="certificate-box" style="z-index: 1;">
                                    <div class="cert-header">OFFICIAL CERTIFICATION</div>
                                    <div class="cert-body">
                                        <div class="cert-icon">${icons.awards}</div>
                                        <h4>WIKI COASTER OPERATOR</h4>
                                        <div id="cert-name" class="cert-name">@User</div>
                                        <div class="cert-status" id="cert-diff-status">PASSED WITH FLYING COLORS</div>
                                    </div>
                                    <div class="cert-seal">PASS</div>
                                    <div class="cert-footer">COASTER STUDIO</div>
                                </div>
                                <p style="margin-top:16px; font-size:13px; font-weight:bold; color:var(--neon-primary); z-index: 1; max-width: 90%; line-height: 1.5;">📸 Screenshot this and send your role request in the dedicated channel available on our Discord server!</p>
                                <button id="btn-replay-quiz" style="margin-top:12px; z-index: 1;" class="quiz-btn-secondary interactive-hover">REPLAY FUN QUIZ</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <footer class="ns-footer ns-reveal" style="transition-delay: 0.6s;">
                <p>All Coaster Studio trademarks, logos, and original game media are protected by copyright.</p>
                <p class="copyright">© 2026 COASTER STUDIO. ALL RIGHTS RESERVED. <span class="tab-badge-emoji theme-main-emoji"></span></p>
            </footer>
        </div>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
        body.skin-fandomdesktop { background-color: #000 !important; }
        .main-container, .fandom-community-header__background, .page__main, .fandom-sticky-header, .page { background-color: transparent !important; background-image: none !important; }
        
        :root {
            --bg-base: #09090b;
            --bg-card: rgba(15, 15, 18, 0.4);
            --border-color: rgba(255, 255, 255, 0.08);
            --border-highlight: rgba(255, 255, 255, 0.15);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --radius-lg: 24px;
            --radius-md: 16px;
            --trans-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme="sunset"] {
            --neon-primary: #ff5e00;
            --neon-secondary: #ff007f;
            --glow-color: rgba(255, 94, 0, 0.2);
            --bg-pattern: linear-gradient(to bottom, #1a0b0b 0%, #09090b 100%);
        }
        [data-theme="sunset"] .theme-main-emoji::before { content: "🌅"; }

        [data-theme="ocean"] {
            --neon-primary: #00f0ff;
            --neon-secondary: #0044ff;
            --glow-color: rgba(0, 240, 255, 0.2);
            --bg-pattern: linear-gradient(to bottom, #05101a 0%, #09090b 100%);
        }
        [data-theme="ocean"] .theme-main-emoji::before { content: "🌊"; }

        [data-theme="jungle"] {
            --neon-primary: #00ff88;
            --neon-secondary: #00aa00;
            --glow-color: rgba(0, 255, 136, 0.2);
            --bg-pattern: linear-gradient(to bottom, #05140b 0%, #09090b 100%);
        }
        [data-theme="jungle"] .theme-main-emoji::before { content: "🌴"; }

        .theme-color-text { color: var(--neon-primary) !important; }

        .global-fx-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; }
        .theme-bg-engine { position: absolute; inset: 0; background: var(--bg-pattern); transition: background 0.8s ease; }
        
        .ambient-layer { position: absolute; inset: 0; overflow: hidden; mix-blend-mode: screen; }
        .ambient-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.35; animation: drift 20s infinite alternate ease-in-out; transition: background 1s ease;}
        .orb-1 { width: 600px; height: 600px; top: -10%; left: -10%; background: var(--neon-primary); }
        .orb-2 { width: 700px; height: 700px; bottom: 10%; right: -20%; background: var(--neon-secondary); animation-delay: -5s; opacity: 0.25; }
        .orb-3 { width: 500px; height: 500px; top: 40%; left: 40%; background: var(--glow-color); animation-delay: -10s; opacity: 0.5; }
        @keyframes drift { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 50px) scale(1.1); } }

        .particle-container { position: absolute; inset: 0; overflow: hidden; z-index: 10;}
        .vibe-particle { position: absolute; opacity: 0; }
        .p-sunset { width: 4px; height: 4px; background: #ff5e00; box-shadow: 0 0 10px #ff5e00; border-radius: 50%; animation: floatUp linear infinite; bottom: -20px; }
        .p-ocean { width: 8px; height: 8px; border: 1px solid rgba(0, 240, 255, 0.8); background: rgba(0, 240, 255, 0.2); border-radius: 50%; animation: bubbleRise ease-in-out infinite; bottom: -20px; }
        .p-jungle { width: 6px; height: 6px; background: #00ff88; box-shadow: 0 0 12px #00ff88; border-radius: 50%; animation: firefly infinite ease-in-out alternate; bottom: -20px; }

        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translateY(-100vh) scale(0.5); opacity: 0; } }
        @keyframes bubbleRise { 0% { transform: translateY(0) translateX(0); opacity: 0; } 50% { transform: translateY(-50vh) translateX(30px); opacity: 0.7; } 100% { transform: translateY(-100vh) translateX(-30px); opacity: 0; } }
        @keyframes firefly { 0% { transform: translate(0, 0) scale(1); opacity: 0; } 20% { opacity: 1; } 50% { transform: translate(50px, -40vh) scale(1.3); opacity: 0.6; } 80% { opacity: 1; } 100% { transform: translate(-30px, -100vh) scale(0.8); opacity: 0; } }

        .ns-master-container * { box-sizing: border-box; margin: 0; padding: 0; }
        .ns-master-container { position: relative; color: var(--text-main); font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 1040px; margin: 0 auto; padding: 50px 20px; z-index: 1; line-height: 1.6; }
        .interactive-hover { transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease; cursor: pointer; }
        .interactive-hover:hover { transform: translateY(-3px) scale(1.02); }
        .interactive-hover:active { transform: translateY(1px) scale(0.98); }
        .ns-master-container a { text-decoration: none !important; color: inherit; }
        .ns-master-container h1, .ns-master-container h2, .ns-master-container h3, .ns-master-container h4 { font-weight: 800; letter-spacing: -0.5px; }

        .ns-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .ns-reveal.active { opacity: 1; transform: translateY(0); }

        .dynamic-glow { position: relative; }
        .dynamic-glow::before { content: ""; position: absolute; top: var(--mouse-y, 0); left: var(--mouse-x, 0); width: 400px; height: 400px; transform: translate(-50%, -50%); background: radial-gradient(circle, var(--glow-color) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: -1; border-radius: 50%; }
        .dynamic-glow:hover::before { opacity: 1; }

        .ns-theme-switcher { position: absolute; top: 20px; right: 20px; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.6); padding: 6px 12px; border-radius: 100px; border: 1px solid var(--border-color); z-index: 10; backdrop-filter: blur(10px); }
        .ts-label { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-right: 4px; }
        .ts-btn { background: transparent; border: none; font-size: 16px; cursor: pointer; padding: 4px; border-radius: 50%; transition: var(--trans-smooth); opacity: 0.4; filter: grayscale(100%); }
        .ts-btn:hover { opacity: 0.8; transform: scale(1.1);}
        .ts-btn.active { opacity: 1; filter: grayscale(0%); transform: scale(1.1); background: rgba(255,255,255,0.15); }

        .ns-hero { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px; position: relative; z-index: 200; }
        .event-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-highlight); padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); backdrop-filter: blur(10px); }
        .ep-text { font-size: 12px; font-weight: 800; color: #fff; letter-spacing: 1px; text-transform: uppercase;}
        .pulse-dot { width: 8px; height: 8px; background: var(--neon-primary); border-radius: 50%; animation: pulseNeon 1.5s infinite; transition: var(--trans-smooth); }
        @keyframes pulseNeon { 0% { box-shadow: 0 0 0 0 var(--glow-color); } 70% { box-shadow: 0 0 0 6px rgba(0,0,0,0); } 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); } }

        .ns-logo-box { width: 110px; height: 110px; margin-bottom: 20px; position: relative; border-radius: 28px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); padding: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);}
        .ns-logo { width: 100%; height: 100%; border-radius: 24px; object-fit: contain; }
        .ns-title { font-size: 52px; font-weight: 900; color: #fff; margin-bottom: 24px; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }

        .ns-hero-actions { margin-bottom: 30px; }
        .btn-modern-play { display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, var(--neon-primary), var(--neon-secondary)); color: #fff; font-size: 16px; font-weight: 800; letter-spacing: 1px; padding: 12px 32px 12px 20px; border-radius: 100px; box-shadow: 0 10px 30px var(--glow-color); border: 1px solid rgba(255,255,255,0.2); transition: var(--trans-smooth); }
        .btn-modern-play .play-icon { display: flex; align-items: center; justify-content: center; background: #fff; color: var(--neon-primary); width: 34px; height: 34px; border-radius: 50%; transition: var(--trans-smooth);}
        .btn-modern-play .play-icon svg { width: 18px; height: 18px; margin-left: 2px;}
        .btn-modern-play:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 15px 40px var(--glow-color); filter: brightness(1.1);}

        .ns-search-container { position: relative; width: 100%; max-width: 500px; margin: 0 auto; z-index: 500; }
        .search-input-wrapper { display: flex; align-items: center; background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); border-radius: 100px; padding: 6px 20px; transition: var(--trans-smooth); box-shadow: 0 10px 20px rgba(0,0,0,0.3); backdrop-filter: blur(10px);}
        .search-input-wrapper:focus-within { border-color: var(--neon-primary); background: rgba(0,0,0,0.8); box-shadow: 0 0 20px var(--glow-color); }
        .search-icon { display: flex; align-items: center; justify-content: center; color: var(--text-muted); width: 20px; height: 20px; margin-right: 12px;}
        .ns-search-input { flex-grow: 1; background: transparent; border: none; color: #fff; font-size: 15px; font-weight: 500; padding: 10px 0; outline: none; }
        .ns-search-input::placeholder { color: var(--text-muted); }
        
        .ns-search-dropdown { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: #111114; border: 1px solid var(--border-color); border-radius: var(--radius-md); box-shadow: 0 20px 50px rgba(0,0,0,0.8); max-height: 400px; overflow-y: auto; display: none; z-index: 9999; }
        .sr-item { display: block; padding: 14px 20px; color: #fff; border-bottom: 1px solid var(--border-color); transition: background 0.2s; text-align: left; }
        .sr-item:last-child { border-bottom: none; }
        .sr-item:hover { background: rgba(255,255,255,0.05); padding-left: 25px;}
        .sr-title { font-weight: 700; font-size: 15px; color: var(--text-main); margin-bottom: 4px; display: block; transition: color 0.2s; }
        .sr-item:hover .sr-title { color: var(--neon-primary); }
        .sr-snippet { font-size: 12px; color: var(--text-muted); display: block; line-height: 1.4; }
        .searchmatch { color: var(--neon-primary); font-weight: 800; background: rgba(255,255,255,0.1); padding: 0 2px; border-radius: 2px; }
        .sr-empty { padding: 14px 20px; color: var(--text-muted); text-align: center; font-size: 14px; }

        .ns-dock-wrapper { display: flex; justify-content: center; margin-bottom: 40px; position: sticky; top: 20px; z-index: 100; }
        .ns-sleek-dock { display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 100px; background: rgba(13, 13, 17, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .sleek-dock-item { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 100px; color: #ffffff; font-size: 15px; font-weight: 700; background: transparent; transition: background 0.2s ease, color 0.2s ease; }
        .sleek-dock-item:hover { background: rgba(255,255,255,0.1); color: var(--neon-primary); }
        .sdi-icon { display: flex; align-items: center; }
        .sdi-icon svg { width: 18px; height: 18px; opacity: 0.9; }

        .ns-layout-main { display: flex; flex-direction: column; gap: 24px; position: relative; z-index: 50; }
        .ns-card { background: var(--bg-card); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: 0 15px 30px rgba(0,0,0,0.3); overflow: hidden; transition: var(--trans-smooth); }
        .ns-card:hover { border-color: var(--border-highlight); }
        
        .ns-card-header { padding: 24px 30px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.4); }
        .ns-card-header h2 { font-size: 20px !important; color: var(--text-main) !important; margin: 0 !important; padding: 0 !important; border: none !important; font-family: 'Inter', system-ui, sans-serif !important; }
        
        .ns-card-body { padding: 30px; }
        .flex-header { display: flex; justify-content: space-between; align-items: center; }
        .p-0 { padding: 0 !important; }

        .ns-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .ns-link-card { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: rgba(255,255,255,0.02); }
        .ns-link-card:hover { background: rgba(255,255,255,0.05); border-color: var(--neon-primary); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .lc-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        .lc-icon svg { width: 22px; height: 22px; }
        .dynamic-icon { background: var(--glow-color); color: var(--neon-primary); transition: var(--trans-smooth); }
        .lc-data { display: flex; flex-direction: column; }
        .lc-data strong { font-size: 15px; color: var(--text-main); }
        .lc-data span { font-size: 13px; color: var(--text-muted); font-weight: 500; }

        /* --- FULL WIDTH INTERACTIVE TIMELINE --- */
        .pro-timeline { position: relative; padding: 40px 30px; max-height: 500px; overflow-y: auto; }
        .pt-track { position: absolute; left: 45px; top: 50px; bottom: 50px; width: 2px; background: rgba(255,255,255,0.1); z-index: 0; }
        
        .pt-node { position: relative; display: flex; gap: 30px; margin-bottom: 24px; z-index: 1; }
        .pt-node:last-child { margin-bottom: 0; }
        
        .pt-marker { width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--border-color); background: var(--bg-card); position: relative; z-index: 2; margin-top: 26px; transition: var(--trans-smooth); flex-shrink: 0; }
        .pt-node:hover .pt-marker { transform: scale(1.3); }
        
        .pt-card { flex-grow: 1; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; transition: var(--trans-smooth); }
        .pt-node:hover .pt-card { background: rgba(255,255,255,0.04); border-color: var(--border-highlight); }
        .pt-node.expanded .pt-card { border-color: var(--neon-primary); background: rgba(0,0,0,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        
        .pt-header { width: 100%; background: transparent; border: none; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--text-main); text-align: left; }
        .pt-meta { display: flex; flex-direction: column; gap: 8px; }
        .pt-meta h3 { font-size: 18px; margin: 0; font-weight: 800; transition: color 0.3s; }
        .pt-node.expanded .pt-meta h3 { color: var(--neon-primary); }
        
        .pt-actions { display: flex; align-items: center; gap: 16px; }
        .pt-date { font-size: 13px; font-weight: 700; color: var(--text-muted); }
        .pt-icon { width: 20px; height: 20px; color: var(--text-muted); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .pt-node.expanded .pt-icon { transform: rotate(180deg); color: var(--neon-primary); }
        
        .pt-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .pt-inner { overflow: hidden; padding: 0 24px; color: var(--text-muted); font-size: 15px; line-height: 1.6; }
        .pt-node.expanded .pt-body { grid-template-rows: 1fr; }
        .pt-node.expanded .pt-inner { padding: 0 24px 24px 24px; }
        
        .acc-hero-img { width: 100%; max-height: 250px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border-color); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        
        .acc-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 100px; letter-spacing: 1px; display: inline-block; align-self: flex-start;}
        .bg-primary { background: var(--neon-primary); color: #000; }
        .bg-danger { background: rgba(255, 51, 102, 0.2); color: #ff3366; border: 1px solid rgba(255, 51, 102, 0.3); }
        .bg-info { background: rgba(0, 240, 255, 0.2); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
        .bg-success { background: rgba(0, 255, 136, 0.2); color: #00ff88; border: 1px solid rgba(0, 255, 136, 0.3); }
        
        .dev-list { list-style: none; padding: 0; margin-top: 10px; }
        .dev-list li { position: relative; padding-left: 20px; margin-bottom: 12px; color: var(--text-main);}
        .dev-list li:last-child { margin-bottom: 0; }
        .dev-list li::before { content: "❯"; position: absolute; left: 0; top: 0; color: var(--neon-primary); font-size: 12px; font-weight: 900; }

        /* --- BOTTOM GRID & MANIFEST --- */
        .ns-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;}
        .time-widget { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--neon-primary); background: var(--glow-color); padding: 6px 14px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); transition: var(--trans-smooth); }
        .ns-loader { width: 36px; height: 36px; border: 3px solid var(--border-color); border-top-color: var(--neon-primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 40px auto; transition: border-color 0.3s; }
        
        .manifest-pro { display: flex; flex-direction: column; background: transparent; }
        .m-hero { width: 100%; height: 180px; overflow: hidden; position: relative; border-bottom: 1px solid var(--border-color); flex-shrink: 0;}
        .m-hero img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s ease; }
        .m-hero:hover img { transform: scale(1.05); }
        .m-details { padding: 30px; display: flex; flex-direction: column; gap: 16px; }
        .m-title { font-size: 22px; font-weight: 900; display: flex; align-items: center; justify-content: space-between; margin: 0; }
        .m-badge { font-size: 11px; font-weight:800; background: var(--neon-primary); color: #000; padding: 4px 10px; border-radius: 100px; }
        .m-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0;}
        .m-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;}
        .m-stat { background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 800; transition: var(--trans-smooth);}
        .m-stat:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); transform: translateY(-2px);}
        .m-stat span { display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; font-weight:700;}

        /* --- OPERATOR QUIZ WIDGET --- */
        .quiz-card { border-color: var(--neon-primary); box-shadow: 0 10px 30px var(--glow-color); position: relative;}
        .quiz-timeline-top { background: rgba(0,0,0,0.5); border-bottom: 1px solid var(--border-color); }
        .qt-bar { width: 100%; height: 4px; background: rgba(255,255,255,0.1); }
        .qt-bar-fill { height: 100%; width: 0%; background: var(--neon-primary); transition: width 0.4s ease; box-shadow: 0 0 10px var(--neon-primary); }
        .qt-info { display: flex; justify-content: space-between; padding: 12px 30px; font-size: 13px; font-weight: 800; color: var(--text-main); }
        .qt-timer { display: flex; align-items: center; color: var(--neon-primary); background: var(--glow-color); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); font-variant-numeric: tabular-nums; }
        .qt-icon { display:inline-block; width:14px; height:14px; margin-right:6px; }

        .quiz-body { position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center; text-align: center; min-height: 520px; }
        .quiz-section { position: absolute; inset: 0; padding: 40px 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transform: scale(0.95); transition: all 0.4s ease; }
        .quiz-section.active { opacity: 1; pointer-events: auto; transform: scale(1); }
        
        .quiz-icon-large { width: 60px; height: 60px; color: var(--neon-primary); margin-bottom: 16px; background: var(--glow-color); padding: 12px; border-radius: 50%; transition: var(--trans-smooth); flex-shrink: 0;}
        .quiz-section h3 { font-size: 24px; color: #fff; margin-bottom: 12px; }
        .quiz-section p { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5; max-width: 90%; }
        
        .quiz-input-field { width: 80%; padding: 14px 20px; border-radius: 100px; background: rgba(255,255,255,0.05); border: 2px solid var(--border-color); color: #fff; font-size: 15px; font-weight: 600; text-align: center; outline: none; transition: var(--trans-smooth); margin-bottom: 10px;}
        .quiz-input-field:focus { border-color: var(--neon-primary); box-shadow: 0 0 15px var(--glow-color); background: rgba(255,255,255,0.1);}
        
        .quiz-btn-primary { background: var(--neon-primary); color: #000; font-weight: 800; border: none; padding: 14px 30px; border-radius: 100px; cursor: pointer; transition: var(--trans-smooth); box-shadow: 0 4px 15px var(--glow-color); }
        .quiz-btn-primary:hover { filter: brightness(1.2); transform: translateY(-2px); }
        .quiz-btn-secondary { background: transparent; color: var(--text-main); font-weight: 700; border: 1px solid var(--border-color); padding: 10px 20px; border-radius: 100px; cursor: pointer; transition: var(--trans-smooth); flex-shrink: 0;}
        .quiz-btn-secondary:hover { background: rgba(255,255,255,0.1); }
        
        .diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; margin-top: 10px;}
        .diff-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 16px; border-radius: 16px; color: var(--text-main); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: var(--trans-smooth); }
        .diff-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--neon-primary); box-shadow: 0 10px 20px var(--glow-color); }
        .diff-btn strong { font-size: 16px; font-weight: 800; }
        .diff-btn span { font-size: 12px; color: var(--text-muted); }

        .question-text { font-size: 18px !important; margin-bottom: 24px !important; line-height: 1.4; }
        
        .options-grid { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .quiz-option { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 14px 20px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: var(--trans-smooth); text-align: left; display: flex; justify-content: space-between; align-items: center;}
        .quiz-option:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); transform: translateX(5px); }
        .quiz-option.correct { background: rgba(0, 255, 136, 0.1); border-color: #00ff88; color: #00ff88; }
        .quiz-option.incorrect { background: rgba(255, 51, 102, 0.1); border-color: #ff3366; color: #ff3366; }

        .certificate-box { width: 100%; max-width: 400px; background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(251, 191, 36, 0.15), inset 0 0 0 1px rgba(255,255,255,0.05); position: relative; margin: 0 auto; flex-shrink: 0;}
        .certificate-box::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 60%); pointer-events: none; }
        .cert-header { background: linear-gradient(90deg, #d97706, #fbbf24, #d97706); color: #000; font-weight: 900; font-size: 12px; letter-spacing: 3px; padding: 8px; text-transform: uppercase; box-shadow: 0 2px 10px rgba(0,0,0,0.5);}
        .cert-body { padding: 30px 20px; position: relative; z-index: 2; }
        .cert-icon { width: 56px; height: 56px; color: #fbbf24; margin: 0 auto 16px auto; filter: drop-shadow(0 0 10px rgba(251,191,36,0.4));}
        .cert-body h4 { font-size: 20px; color: #f8fafc; margin-bottom: 6px; letter-spacing: 1px; font-weight: 800;}
        .cert-name { display: inline-block; font-size: 24px; color: #fde68a; font-weight: 900; margin: 0 auto 16px auto; background: rgba(0,0,0,0.4); padding: 8px 24px; border-radius: 12px; border: 1px solid rgba(251,191,36,0.2); word-break: break-all; text-shadow: 0 2px 4px rgba(0,0,0,0.5); box-shadow: inset 0 2px 10px rgba(0,0,0,0.3); min-height: 32px; line-height: 1.2;}
        .cert-status { font-size: 13px; color: #fbbf24; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; background: rgba(251, 191, 36, 0.1); padding: 6px 12px; border-radius: 100px; display: inline-block;}
        .cert-footer { font-size: 11px; color: #94a3b8; padding: 12px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.2); font-weight: 600; letter-spacing: 1px;}
        .cert-seal { position: absolute; bottom: 20px; right: 20px; width: 40px; height: 40px; border-radius: 50%; border: 2px dashed #fbbf24; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #fbbf24; font-weight: bold; transform: rotate(-15deg); opacity: 0.6; }

        .ns-footer { text-align: center; margin-top: 10px; color: var(--text-muted); font-size: 13px; }
        .copyright { font-weight: 700; color: var(--text-main); }
        
        @keyframes shakeUI { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-5px);} 75% {transform: translateX(5px);} }
        .shake-err { animation: shakeUI 0.3s ease-in-out; }

        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; margin: 10px 0; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #64748b; border-radius: 10px; border: 2px solid transparent; background-clip: padding-box; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        @media (max-width: 800px) { 
            .ns-bottom-grid { grid-template-columns: 1fr; } 
            .m-grid { grid-template-columns: 1fr; } 
            .pt-track { left: 22px; }
            .pt-marker { width: 10px; height: 10px; margin-top: 28px; }
            .pt-node { gap: 15px; }
            .pt-header { flex-direction: column; align-items: flex-start; gap: 12px; }
            .pt-actions { width: 100%; justify-content: space-between; }
            .diff-grid { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.dynamic-glow').forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    const container = document.getElementById('ns-master');
    const globalBg = document.getElementById('ns-global-fx');
    const themeBtns = document.querySelectorAll('.ts-btn');
    
    function createParticles(theme) {
        const pContainer = document.getElementById('particle-layer');
        if(!pContainer) return;
        pContainer.innerHTML = '';
        let count = theme === 'ocean' ? 50 : 35;
        for(let i = 0; i < count; i++) {
            let p = document.createElement('div');
            p.className = `vibe-particle p-${theme}`;
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 8 + 4) + 's';
            p.style.animationDelay = '-' + (Math.random() * 5) + 's';
            p.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
            pContainer.appendChild(p);
        }
    }

    function setTheme(themeName) {
        container.setAttribute('data-theme', themeName);
        if(globalBg) globalBg.setAttribute('data-theme', themeName);
        localStorage.setItem('co_wiki_theme', themeName);
        themeBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName));
        createParticles(themeName);
    }
    setTheme(localStorage.getItem('co_wiki_theme') || 'sunset');
    themeBtns.forEach(btn => btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme'))));

    // ACCORDION LOGIC
    document.querySelectorAll('.pt-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const node = btn.closest('.pt-node');
            const isExpanded = node.classList.contains('expanded');
            
            document.querySelectorAll('.pt-node').forEach(n => n.classList.remove('expanded'));

            if (!isExpanded) {
                node.classList.add('expanded');
            }
        });
    });

    // OPEN FIRST TIMELINE ITEM DYNAMICALLY ON LOAD
    setTimeout(() => {
        const firstNode = document.querySelector('.pt-node');
        if (firstNode) firstNode.classList.add('expanded');
    }, 150);

    const searchInput = document.getElementById('ns-live-search');
    const searchResults = document.getElementById('ns-search-results');
    let searchTimeout;
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            if(query.length < 2) { searchResults.style.display = 'none'; return; }
            searchTimeout = setTimeout(() => {
                if (typeof mw !== 'undefined' && mw.Api) {
                    new mw.Api().get({ action: 'query', list: 'search', srsearch: query, srprop: 'snippet', format: 'json', srlimit: 5 }).done(data => {
                        const hits = data.query.search;
                        searchResults.innerHTML = hits.length === 0 ? '<div class="sr-empty">No results found.</div>' : hits.map(hit => `
                            <a href="/wiki/${encodeURIComponent(hit.title)}" class="sr-item">
                                <span class="sr-title">${mw.html.escape(hit.title)}</span>
                                <span class="sr-snippet">${mw.html.escape(hit.snippet)}...</span>
                            </a>`).join('');
                        searchResults.style.display = 'block';
                    });
                }
            }, 300);
        });
        document.addEventListener('click', e => { if(!e.target.closest('.ns-search-container')) searchResults.style.display = 'none'; });
    }

    // --- NEW UNIFIED QUIZ SYSTEM WITH BUILT-IN RANDOMIZATION --- //
    
    // 1 unified bank containing all questions
    const quizBank = [
        { q: "What is the most important rule as a Coaster Operator?", options: ["Have fun and stay safe", "Derail the trains", "Eat all the churros", "Ignore the guests"], answer: 0 },
        { q: "What platform is Coaster Operator built on?", options: ["Roblox", "Minecraft", "Unreal Engine", "Unity"], answer: 0 },
        { q: "Where is the best place to chat with the Coaster Studio community?", options: ["The Official Discord", "In the Roblox comments", "Via carrier pigeon", "Telepathy"], answer: 0 },
        { q: "What is the latest ride that was added in game?", options: ["Treetop Drop", "Space Mountain", "The Screaming Eagle", "Batman The Ride"], answer: 0 },
        { q: "How long do the restraint highlights last before fading?", options: ["10 Seconds", "Forever", "1 Minute", "They don't fade"], answer: 0 },
        { q: "Which ride now costs coins to operate?", options: ["Cobra's Curse", "The Restrooms", "Giant Drop", "Admin Commands"], answer: 0 },
        { q: "Which ride had collision improvements recently?", options: ["Giant Drop", "DarKoaster", "Cobra's Curse", "Treetop Drop"], answer: 0 },
        { q: "Which rides were excluded from the NPC count fix?", options: ["Cobra's Curse, Giant Drop & DarKoaster", "None", "All of them", "Treetop Drop"], answer: 0 },
        { q: "What restraint system is being trialed on Treetop Drop?", options: ["Motor6D tweening", "HingeConstraints", "WeldConstraints", "Anchored blocks"], answer: 0 }
    ];
    
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    let activeQuiz = [], currentQ = 0, score = 0, discordUsername = "", quizTimeLeft = 600, quizInterval, selectedDifficulty = 'easy'; 

    const btnBegin = document.getElementById('btn-begin'), btnNextDiff = document.getElementById('btn-next-diff'), btnRestartFail = document.getElementById('btn-restart-quiz'), btnReplayPass = document.getElementById('btn-replay-quiz'), inputDiscord = document.getElementById('discord-username'), quizHeaderUI = document.getElementById('quiz-header-ui'), barFill = document.getElementById('q-bar-fill');
    const secStart = document.getElementById('quiz-start'), secInput = document.getElementById('quiz-input'), secDiff = document.getElementById('quiz-difficulty'), secQuestion = document.getElementById('quiz-question'), secFail = document.getElementById('quiz-fail'), secResult = document.getElementById('quiz-result'), optContainer = document.getElementById('q-options');

    function resetQuizUI() {
        secStart.classList.remove('active'); secInput.classList.remove('active'); secDiff.classList.remove('active'); secFail.classList.remove('active'); secResult.classList.remove('active');
        quizHeaderUI.style.display = 'none'; clearInterval(quizInterval);
    }

    if(btnBegin) btnBegin.addEventListener('click', () => { resetQuizUI(); secInput.classList.add('active'); inputDiscord.value = ""; inputDiscord.focus(); });
    
    if(btnNextDiff) btnNextDiff.addEventListener('click', () => {
        discordUsername = inputDiscord.value.trim() || "@Operator";
        document.getElementById('cert-name').innerText = discordUsername;
        resetQuizUI(); secDiff.classList.add('active');
    });

    if(inputDiscord) inputDiscord.addEventListener('keypress', e => { if (e.key === 'Enter') btnNextDiff.click(); });

    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedDifficulty = this.getAttribute('data-diff');
            startNewQuiz();
        });
    });

    function startTimer(durationSeconds) {
        quizTimeLeft = durationSeconds * 10;
        document.getElementById('quiz-timer-text').innerText = (quizTimeLeft/10).toFixed(1) + 's';
        document.getElementById('quiz-timer').style.color = "var(--neon-primary)";
        
        quizInterval = setInterval(() => {
            quizTimeLeft--;
            document.getElementById('quiz-timer-text').innerText = (quizTimeLeft/10).toFixed(1) + 's';
            if (quizTimeLeft <= 100) document.getElementById('quiz-timer').style.color = "#ff3366";
            if (quizTimeLeft <= 0) { clearInterval(quizInterval); showResults(true); }
        }, 100);
    }

    function startNewQuiz() {
        let diffTime = 60;
        if(selectedDifficulty === 'medium') diffTime = 45;
        if(selectedDifficulty === 'hard') diffTime = 30;

        let shuffled = shuffle([...quizBank]); 
        activeQuiz = shuffled.slice(0, 5); // Consistently pulls 5 random questions regardless of difficulty
        
        activeQuiz.forEach(q => { let correctOpt = q.options[q.answer]; q.options = shuffle([...q.options]); q.answer = q.options.indexOf(correctOpt); });

        resetQuizUI();
        quizHeaderUI.style.display = 'block';
        secQuestion.classList.add('active');
        currentQ = 0; score = 0;
        loadQuestion(); startTimer(diffTime);
    }

    function loadQuestion() {
        document.getElementById('q-current').innerText = currentQ + 1;
        document.getElementById('q-total').innerText = activeQuiz.length;
        barFill.style.width = ((currentQ) / activeQuiz.length * 100) + "%";
        document.getElementById('q-text').innerText = activeQuiz[currentQ].q;
        optContainer.innerHTML = '';
        activeQuiz[currentQ].options.forEach((opt, index) => {
            let btn = document.createElement('div'); btn.className = 'quiz-option interactive-hover'; btn.innerText = opt;
            btn.onclick = () => handleAnswer(btn, index); optContainer.appendChild(btn);
        });
    }

    function handleAnswer(btn, index) {
        const allOpts = optContainer.querySelectorAll('.quiz-option');
        allOpts.forEach(o => o.style.pointerEvents = 'none');
        if(index === activeQuiz[currentQ].answer) { btn.classList.add('correct'); btn.innerHTML += `<span>${icons.check}</span>`; score++; } 
        else { btn.classList.add('incorrect'); secQuestion.classList.add('shake-err'); setTimeout(() => secQuestion.classList.remove('shake-err'), 300); allOpts[activeQuiz[currentQ].answer].classList.add('correct'); }
        setTimeout(() => { currentQ++; if(currentQ < activeQuiz.length) { loadQuestion(); } else { barFill.style.width = "100%"; setTimeout(() => showResults(false), 300); } }, 1000);
    }

    function createConfetti() {
        const cContainer = document.getElementById('confetti-container'); cContainer.innerHTML = ''; const colors = ['#fbbf24', '#ff5e00', '#00f0ff', '#00ff88'];
        for(let i=0; i<30; i++) {
            let conf = document.createElement('div');
            conf.style.position = 'absolute'; conf.style.width = '8px'; conf.style.height = '8px';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.left = (Math.random() * 100) + '%'; conf.style.top = '-10px';
            conf.style.opacity = Math.random() + 0.5; conf.style.transform = `rotate(${Math.random() * 360}deg)`;
            conf.style.animation = `floatUp ${2 + Math.random() * 2}s linear forwards`;
            cContainer.appendChild(conf);
        }
    }

    function showResults(isTimeout) {
        clearInterval(quizInterval); secQuestion.classList.remove('active'); quizHeaderUI.style.display = 'none';
        if(score === activeQuiz.length && !isTimeout) { 
            secResult.classList.add('active'); 
            document.getElementById('cert-diff-status').innerText = `PASSED ${selectedDifficulty.toUpperCase()} WITH FLYING COLORS`;
            createConfetti(); 
        } 
        else { secFail.classList.add('active');
            if(isTimeout) { document.getElementById('fail-title').innerText = "Out of Time!"; document.getElementById('fail-desc').innerText = "Safety demands fast reactions. Keep practicing!"; } 
            else { document.getElementById('fail-title').innerText = "Training Required."; document.getElementById('fail-desc').innerText = "You missed a safety procedure! Brush up on your knowledge."; }
        }
    }

    if(btnRestartFail) btnRestartFail.addEventListener('click', () => { resetQuizUI(); secInput.classList.add('active'); });
    if(btnReplayPass) btnReplayPass.addEventListener('click', () => { resetQuizUI(); secInput.classList.add('active'); });

    setTimeout(() => {
        const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); }); }, { threshold: 0.1 });
        document.querySelectorAll('.ns-reveal').forEach(el => observer.observe(el)); document.querySelectorAll('.ns-hero, .ns-dock-wrapper').forEach(el => el.classList.add('active'));
    }, 100);

    setInterval(() => { const timerEl = document.getElementById('ns-clock'); if(timerEl) timerEl.innerText = new Date().toLocaleTimeString('en-US', { hour12: false }); }, 1000);

    if (typeof mw !== 'undefined' && mw.Api) {
        new mw.Api().get({ action: 'query', titles: fileNameToFind, prop: 'imageinfo', iiprop: 'url', format: 'json' }).done(function(data) {
            let imgUrl = "https://placehold.co/800x450/14141a/94a3b8?text=Image+Loading";
            const pages = data.query.pages;
            for (const key in pages) { if (pages[key].imageinfo && pages[key].imageinfo[0]) imgUrl = pages[key].imageinfo[0].url; }
            const target = document.getElementById("game-manifest-target");
            if(target) {
                target.innerHTML = `
                    <div class="manifest-pro">
                        <div class="m-hero interactive-hover"><img src="${imgUrl}" alt="Game Cover"></div>
                        <div class="m-details">
                            <div class="m-title">COASTER OPERATOR <span class="m-badge">PUBLIC</span></div>
                            <p class="m-desc">Your ultimate theme park simulation experience. Perform start-up procedures, manage crowds, and ensure safety.</p>
                            <div class="m-grid">
                                <div class="m-stat interactive-hover"><span>DEV</span>Coaster Studio</div>
                                <div class="m-stat interactive-hover"><span>PLATFORM</span>Roblox</div>
                                <div class="m-stat interactive-hover"><span>EST. DATE</span>04/14/2024</div>
                                <div class="m-stat interactive-hover"><span>STATUS</span><span style="color:var(--neon-primary); font-size:15px; transition:var(--trans-smooth);">ONLINE</span></div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).fail(function(error) {
            // Keep the failblock so your loader doesn't spin forever if API gets blocked
            const target = document.getElementById("game-manifest-target");
            if(target) {
                target.innerHTML = `
                    <div class="manifest-pro" style="padding:20px; text-align:center;">
                        <div class="m-title">COASTER OPERATOR <span class="m-badge">PUBLIC</span></div>
                        <p class="m-desc" style="margin-top:10px;">Your ultimate theme park simulation experience.</p>
                    </div>
                `;
            }
        });
    }
});