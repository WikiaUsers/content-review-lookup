/* ==========================================================================
   Roll Anime Wiki — MediaWiki:Common.js
   ========================================================================== */

/* ---- Unit Browser: Active tab highlighting + prevent scroll jump ----
   Highlights the current rarity tab based on the URL hash.
   Manually shows/hides panels instead of relying on CSS :target.
   Also prevents the page from scrolling when a tab is clicked. */
    function setupUnitBrowserTabs() {
        var tabBars = document.querySelectorAll('.ur-tab-bar');
        if (!tabBars.length) return;

        tabBars.forEach(function (tabBar) {
            if (tabBar.dataset.tabSetup) return;
            tabBar.dataset.tabSetup = 'true';

            var tabLinks = tabBar.querySelectorAll('a');
            var panels = [];

            // Build a list of associated tab panels
            tabLinks.forEach(function (link) {
                var href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    var panel = document.getElementById(href.substring(1));
                    if (panel) panels.push({ link: link, panel: panel });
                }
            });

            // Add Common as default if no panels were found
            if (panels.length === 0) return;

            function showPanel(panelToShow) {
                // Hide all panels
                panels.forEach(function (item) {
                    item.panel.style.display = 'none';
                    item.link.classList.remove('ur-tab-active');
                });

                // Show the selected panel and highlight its tab
                panelToShow.panel.style.display = 'block';
                panelToShow.link.classList.add('ur-tab-active');
            }

            function updateActiveTab() {
                // Get the current hash
                var hash = window.location.hash;

                if (hash) {
                    var found = panels.find(function (item) {
                        return item.panel.id === hash.substring(1);
                    });
                    if (found) {
                        showPanel(found);
                    } else {
                        // Hash doesn't match a tab — show Common
                        var defaultPanel = panels.find(function (item) {
                            return item.panel.id === 'rarity-common';
                        });
                        if (defaultPanel) showPanel(defaultPanel);
                    }
                } else {
                    // No hash — show Common (default panel)
                    var defaultPanel = panels.find(function (item) {
                        return item.panel.id === 'rarity-common';
                    });
                    if (defaultPanel) showPanel(defaultPanel);
                }
            }

            // ---- Prevent scroll jump when clicking tabs ----
            tabLinks.forEach(function (link) {
                link.addEventListener('click', function (e) {
                    // Prevent the browser's default scroll-to-element behavior
                    e.preventDefault();
                    e.stopPropagation();

                    // Get the target hash from the link's href
                    var href = link.getAttribute('href');

                    // Update the URL hash without triggering scroll
                    // using the History API
                    if (history.pushState) {
                        history.pushState(null, '', href);
                    } else {
                        // Fallback for very old browsers
                        window.location.hash = href;
                    }

                    // Manually show the panel and update active tab
                    var targetId = href.substring(1);
                    var target = panels.find(function (item) {
                        return item.panel.id === targetId;
                    });
                    if (target) showPanel(target);
                });
            });

            // Update on page load
            updateActiveTab();

            // Update when hash changes (back/forward)
            window.addEventListener('hashchange', updateActiveTab);
            window.addEventListener('popstate', updateActiveTab);
        });
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setupUnitBrowserTabs();
        });
    } else {
        setupUnitBrowserTabs();
    }

    // Re-run when content changes (AJAX tab switching, etc.)
    var observer = new MutationObserver(function () {
        setupUnitBrowserTabs();
    });
    observer.observe(document.body, { childList: true, subtree: true });

/* ---- Mutation Tabs: Show/hide mutation panels ----
   Handles the tabbed mutation interface on unit pages. */
    function setupMutationTabs() {
        var mutationContainers = document.querySelectorAll('.ln-mutation-tabs');
        if (!mutationContainers.length) return;

        mutationContainers.forEach(function (container) {
            if (container.dataset.mutationSetup) return;
            container.dataset.mutationSetup = 'true';

            var tabLinks = container.querySelectorAll('.ln-mutation-tab-link');
            var panels = container.querySelectorAll('.ln-mutation-panel');

            if (tabLinks.length === 0 || panels.length === 0) return;

            function showMutationPanel(index) {
                // Hide all panels
                panels.forEach(function (panel) {
                    panel.style.display = 'none';
                });

                // Remove active state from all tabs
                tabLinks.forEach(function (tab) {
                    tab.classList.remove('ln-mutation-tab-active');
                });

                // Show selected panel
                panels[index].style.display = 'block';
                tabLinks[index].classList.add('ln-mutation-tab-active');
            }

            // Add click handlers to tabs
            tabLinks.forEach(function (tab, index) {
                tab.addEventListener('click', function () {
                    showMutationPanel(index);
                });
            });

            // Show first panel by default
            showMutationPanel(0);
        });
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setupMutationTabs();
        });
    } else {
        setupMutationTabs();
    }

/* ---- Unit Calculator: Calculate income and damage based on level, mutation, and traits ---- */
    function setupUnitCalculator() {
        var calculator = document.querySelector('.ln-calculator');
        if (!calculator) return;

        // Base income — read from data attribute so it works for any unit
        var BASE_INCOME = parseFloat(calculator.getAttribute('data-base-income')) || 2;

        // Mutation multipliers
        var MUTATION_MULTS = {
            'none': 1,
            'gold': 1.5,
            'diamond': 2,
            'lava': 3,
            'stellar': 4,
            'admin': 6
        };

        // Trait bonuses: [income_bonus%, damage_bonus%]
        var TRAIT_BONUSES = {
            'agile': [5, 0],
            'brawler': [0, 10],
            'focused': [7.5, 5],
            'lucky': [12.5, 0],
            'berserker': [5, 20],
            'phantom': [18, 10],
            'infernal': [10, 25],
            'arcane': [25, 20],
            'divine': [50, 0],
            'cosmic': [50, 35],
            'voidborne': [75, 50],
            'transcendent': [300, 100]
        };

        // Aura bonuses: [income_bonus%, damage_bonus%]
        var AURA_BONUSES = {
            'none': [0, 0],
            'gilded': [10, 5],
            'kaioken': [20, 10],
            'war_master': [30, 15],
            'shining': [40, 20],
            'spiral': [50, 25],
            'aqua': [60, 30],
            'flame_lord': [70, 35],
            'rage': [80, 40],
            'crow': [90, 45],
            'darkness': [100, 50],
            'mysterious': [130, 65],
            'ascendend': [140, 70],
            'galaxy': [150, 75],
            'atomic': [180, 90],
            'celestial': [190, 95],
            'destroyer': [200, 100],
            'monochromatic': [210, 105],
            'sun_god': [260, 130]
        };

        // Title bonuses: income_bonus%
        var TITLE_BONUSES = {
            'none': 0,
            'rookie_roller': 10,
            'dedicated_roller': 12,
            'skilled_roller': 15,
            'reborn': 18,
            'index_hunter': 20,
            'vip': 25,
            'elite_roller': 30,
            'billion_breaker': 35,
            'veteran_roller': 40,
            'awakened': 45,
            'index_master': 50,
            'master_roller': 55,
            'endless_grinder': 60,
            'ascended': 65,
            'trillion_breaker': 70,
            'completionist': 75,
            'eternal_roller': 80,
            'timeless': 90,
            'transcended': 100,
            'reality_breaker': 110,
            'moderator': 150
        };

        var levelDisplay = document.getElementById('ln-level-display');
        var upgradeDisplay = document.getElementById('ln-upgrade-display');
        var incomeResult = document.getElementById('ln-income-result');
        var damageResult = document.getElementById('ln-damage-result');
        var groupBoostBtn = document.getElementById('ln-group-boost');
        var premiumBoostBtn = document.getElementById('ln-premium-boost');

        if (!levelDisplay || !incomeResult || !damageResult) return;

        var currentLevel = 0;
        var currentUpgrade = 1.0; // Upgrade multiplier: 1.0x to 9.0x, increments of 0.1
        var groupBoostActive = false; // Group boost: +10% income, does not stack
        var premiumBoostActive = false; // Roblox Premium: +10% income
        var vipBoostActive = false; // VIP Boost: +50% income
        var x2IncomeBoostActive = false; // x2 Income Boost: +100% income

        function updateLevel(value) {
            currentLevel = Math.max(0, Math.min(50, value));
            levelDisplay.textContent = currentLevel;
            calculateUnit();
        }

        function getSelectedMutation() {
            var selected = calculator.querySelector('.ln-mutation-selected');
            return selected ? selected.getAttribute('data-mutation') : 'none';
        }

        function getActiveTraits() {
            var traits = [];
            var traitOptions = calculator.querySelectorAll('.ln-trait-option.ln-trait-active');
            traitOptions.forEach(function (opt) {
                traits.push(opt.getAttribute('data-trait'));
            });
            return traits;
        }

        function calculateUnit() {
            var level = currentLevel;

            // Get selected mutation
            var mutation = getSelectedMutation();
            var mutationMult = MUTATION_MULTS[mutation] || 1;

            // Calculate trait bonuses
            var totalIncomeBonus = 0;
            var totalDamageBonus = 0;
            var activeTraits = getActiveTraits();
            
            activeTraits.forEach(function (trait) {
                if (TRAIT_BONUSES[trait]) {
                    totalIncomeBonus += TRAIT_BONUSES[trait][0];
                    totalDamageBonus += TRAIT_BONUSES[trait][1];
                }
            });

            // Calculate aura bonuses
            var selectedAura = getSelectedAura();
            var auraIncomeBonus = 0;
            var auraDamageBonus = 0;
            if (AURA_BONUSES[selectedAura]) {
                auraIncomeBonus = AURA_BONUSES[selectedAura][0];
                auraDamageBonus = AURA_BONUSES[selectedAura][1];
            }

            // Calculate title bonuses
            var selectedTitle = getSelectedTitle();
            var titleIncomeBonus = 0;
            if (TITLE_BONUSES[selectedTitle]) {
                titleIncomeBonus = TITLE_BONUSES[selectedTitle];
            }

            // Calculate income
            // Each level increases income by 25%, so level scaling = 1.25^level
            // At level 50, multiplier is x70,064.9232
            // Upgrades add a flat multiplier (1.0x to 9.0x, each +0.1 = +10%)
            // Group boost adds +10% income (1.1x), does not stack
            // Auras add percentage bonuses
            var levelScaling = Math.pow(1.25, level);
            var traitMultiplier = 1 + (totalIncomeBonus / 100);
            var groupBoostMult = groupBoostActive ? 1.1 : 1.0;
            var premiumBoostMult = premiumBoostActive ? 1.1 : 1.0;
            var vipBoostMult = vipBoostActive ? 1.5 : 1.0;
            var x2IncomeBoostMult = x2IncomeBoostActive ? 2.0 : 1.0;
            var auraIncomeMult = 1 + (auraIncomeBonus / 100);
            var titleIncomeMult = 1 + (titleIncomeBonus / 100);
            var totalIncome = BASE_INCOME * mutationMult * levelScaling * traitMultiplier * currentUpgrade * groupBoostMult * premiumBoostMult * vipBoostMult * x2IncomeBoostMult * auraIncomeMult * titleIncomeMult;

            // Calculate damage — always base income at level 0, only affected by mutation, traits, and auras
            // A normal Leaf Ninja does 2 damage, an ADMIN Leaf Ninja does 12 damage
            var damageMultiplier = 1 + (totalDamageBonus / 100);
            var auraDamageMult = 1 + (auraDamageBonus / 100);
            var totalDamage = BASE_INCOME * mutationMult * damageMultiplier * auraDamageMult;

            // Update display
            incomeResult.textContent = formatNumber(totalIncome);
            damageResult.textContent = formatNumber(totalDamage);
        }

        function formatNumber(num) {
            // Abbreviation scale: K, M, B, T, Qa, Qi, Sx, Sp, Oc, No
            var suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
            var tier = Math.floor(Math.log10(Math.abs(num)) / 3);
            if (tier >= suffixes.length) tier = suffixes.length - 1;
            if (tier === 0) {
                return Math.floor(num * 100) / 100;
            }
            var scaled = num / Math.pow(10, tier * 3);
            return Math.floor(scaled * 100) / 100 + suffixes[tier];
        }

        // Level controls (+/- buttons) - support both click and touch events
        var levelBtns = calculator.querySelectorAll('.ln-level-btn');
        levelBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var dir = btn.getAttribute('data-dir');
                if (dir === 'up') {
                    updateLevel(currentLevel + 1);
                } else if (dir === 'down') {
                    updateLevel(currentLevel - 1);
                }
            });
            btn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var dir = btn.getAttribute('data-dir');
                if (dir === 'up') {
                    updateLevel(currentLevel + 1);
                } else if (dir === 'down') {
                    updateLevel(currentLevel - 1);
                }
            });
        });

        // Manual level typing (click to type with prompt)
        levelDisplay.addEventListener('click', function () {
            var input = prompt('Enter level (0-50):', currentLevel);
            if (input === null) return; // User cancelled
            var val = parseInt(input);
            if (isNaN(val)) {
                val = 0;
            }
            if (val > 50) {
                val = 50;
            }
            updateLevel(val);
        });

        // Upgrade controls (+/- buttons) - support both click and touch events
        var upgradeBtns = calculator.querySelectorAll('[data-upgrade-dir]');
        upgradeBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var dir = btn.getAttribute('data-upgrade-dir');
                if (dir === 'up') {
                    currentUpgrade = Math.min(9.0, Math.round((currentUpgrade + 0.1) * 10) / 10);
                } else if (dir === 'down') {
                    currentUpgrade = Math.max(1.0, Math.round((currentUpgrade - 0.1) * 10) / 10);
                }
                if (upgradeDisplay) {
                    upgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x';
                }
                calculateUnit();
            });
            btn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var dir = btn.getAttribute('data-upgrade-dir');
                if (dir === 'up') {
                    currentUpgrade = Math.min(9.0, Math.round((currentUpgrade + 0.1) * 10) / 10);
                } else if (dir === 'down') {
                    currentUpgrade = Math.max(1.0, Math.round((currentUpgrade - 0.1) * 10) / 10);
                }
                if (upgradeDisplay) {
                    upgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x';
                }
                calculateUnit();
            });
        });

        // Manual upgrade typing (click to type with prompt)
        if (upgradeDisplay) {
            upgradeDisplay.addEventListener('click', function () {
                var input = prompt('Enter upgrade multiplier (1.0-9.0):', currentUpgrade.toFixed(1));
                if (input === null) return;
                var val = parseFloat(input);
                if (isNaN(val)) {
                    val = 1.0;
                }
                if (val < 1.0) val = 1.0;
                if (val > 9.0) val = 9.0;
                currentUpgrade = Math.round(val * 10) / 10;
                upgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x';
                calculateUnit();
            });
        }

        // Group boost toggle - support both click and touch events
        if (groupBoostBtn) {
            groupBoostBtn.addEventListener('click', function (e) {
                e.preventDefault();
                groupBoostActive = !groupBoostActive;
                if (groupBoostActive) {
                    groupBoostBtn.classList.add('ln-group-boost-active');
                    groupBoostBtn.setAttribute('data-active', 'true');
                } else {
                    groupBoostBtn.classList.remove('ln-group-boost-active');
                    groupBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
            groupBoostBtn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                groupBoostActive = !groupBoostActive;
                if (groupBoostActive) {
                    groupBoostBtn.classList.add('ln-group-boost-active');
                    groupBoostBtn.setAttribute('data-active', 'true');
                } else {
                    groupBoostBtn.classList.remove('ln-group-boost-active');
                    groupBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
        }

        // Premium boost toggle - support both click and touch events
        if (premiumBoostBtn) {
            premiumBoostBtn.addEventListener('click', function (e) {
                e.preventDefault();
                premiumBoostActive = !premiumBoostActive;
                if (premiumBoostActive) {
                    premiumBoostBtn.classList.add('ln-premium-boost-active');
                    premiumBoostBtn.setAttribute('data-active', 'true');
                } else {
                    premiumBoostBtn.classList.remove('ln-premium-boost-active');
                    premiumBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
            premiumBoostBtn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                premiumBoostActive = !premiumBoostActive;
                if (premiumBoostActive) {
                    premiumBoostBtn.classList.add('ln-premium-boost-active');
                    premiumBoostBtn.setAttribute('data-active', 'true');
                } else {
                    premiumBoostBtn.classList.remove('ln-premium-boost-active');
                    premiumBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
        }
        // VIP Boost toggle - support both click and touch events
        var vipBoostBtn = document.getElementById('ln-vip-boost');
        if (vipBoostBtn) {
            vipBoostBtn.addEventListener('click', function (e) {
                e.preventDefault();
                vipBoostActive = !vipBoostActive;
                if (vipBoostActive) {
                    vipBoostBtn.classList.add('ln-vip-boost-active');
                    vipBoostBtn.setAttribute('data-active', 'true');
                } else {
                    vipBoostBtn.classList.remove('ln-vip-boost-active');
                    vipBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
            vipBoostBtn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                vipBoostActive = !vipBoostActive;
                if (vipBoostActive) {
                    vipBoostBtn.classList.add('ln-vip-boost-active');
                    vipBoostBtn.setAttribute('data-active', 'true');
                } else {
                    vipBoostBtn.classList.remove('ln-vip-boost-active');
                    vipBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
        }

        // x2 Income Boost toggle - support both click and touch events
        var x2IncomeBoostBtn = document.getElementById('ln-x2-income-boost');
        if (x2IncomeBoostBtn) {
            x2IncomeBoostBtn.addEventListener('click', function (e) {
                e.preventDefault();
                x2IncomeBoostActive = !x2IncomeBoostActive;
                if (x2IncomeBoostActive) {
                    x2IncomeBoostBtn.classList.add('ln-x2-income-boost-active');
                    x2IncomeBoostBtn.setAttribute('data-active', 'true');
                } else {
                    x2IncomeBoostBtn.classList.remove('ln-x2-income-boost-active');
                    x2IncomeBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
            x2IncomeBoostBtn.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                x2IncomeBoostActive = !x2IncomeBoostActive;
                if (x2IncomeBoostActive) {
                    x2IncomeBoostBtn.classList.add('ln-x2-income-boost-active');
                    x2IncomeBoostBtn.setAttribute('data-active', 'true');
                } else {
                    x2IncomeBoostBtn.classList.remove('ln-x2-income-boost-active');
                    x2IncomeBoostBtn.setAttribute('data-active', 'false');
                }
                calculateUnit();
            });
        }

        // Title selection
        var titleOptions = calculator.querySelectorAll('.ln-title-option');
        titleOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                titleOptions.forEach(function (o) {
                    o.classList.remove('ln-title-selected');
                });
                opt.classList.add('ln-title-selected');
                calculateUnit();
            });
        });

        function getSelectedTitle() {
            var selected = calculator.querySelector('.ln-title-selected');
            return selected ? selected.getAttribute('data-title') : 'none';
        }

        // Aura selection
        var auraOptions = calculator.querySelectorAll('.ln-aura-option');
        auraOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                auraOptions.forEach(function (o) {
                    o.classList.remove('ln-aura-selected');
                });
                opt.classList.add('ln-aura-selected');
                calculateUnit();
            });
        });

        function getSelectedAura() {
            var selected = calculator.querySelector('.ln-aura-selected');
            return selected ? selected.getAttribute('data-aura') : 'none';
        }

        // Mutation selection
        var mutationOptions = calculator.querySelectorAll('.ln-mutation-option');
        mutationOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                mutationOptions.forEach(function (o) {
                    o.classList.remove('ln-mutation-selected');
                });
                opt.classList.add('ln-mutation-selected');
                calculateUnit();
            });
        });

        // Trait selection (single-select, like mutations)
        var traitOptions = calculator.querySelectorAll('.ln-trait-option');
        traitOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                traitOptions.forEach(function (o) {
                    o.classList.remove('ln-trait-active');
                });
                opt.classList.add('ln-trait-active');
                calculateUnit();
            });
        });

        // Initial calculation
        calculateUnit();
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setupUnitCalculator();
        });
    } else {
        setupUnitCalculator();
    }

/* ---- Calculator Tabs: Switch between Mutations and Traits panels ---- */
    function setupCalculatorTabs() {
        var calcTabs = document.querySelectorAll('.ln-calc-tabs');
        if (!calcTabs.length) return;

        calcTabs.forEach(function (calcTab) {
            if (calcTab.dataset.calcTabSetup) return;
            calcTab.dataset.calcTabSetup = 'true';

            var tabLinks = calcTab.querySelectorAll('.ln-calc-tab-link');
            var panels = calcTab.querySelectorAll('.ln-calc-tab-panel');

            if (tabLinks.length === 0 || panels.length === 0) return;

            function showPanel(index) {
                // Hide all panels
                panels.forEach(function (panel) {
                    panel.style.display = 'none';
                });

                // Remove active state from all tabs
                tabLinks.forEach(function (tab) {
                    tab.classList.remove('ln-calc-tab-active');
                });

                // Show selected panel
                panels[index].style.display = 'block';
                tabLinks[index].classList.add('ln-calc-tab-active');
            }

            // Add click handlers to tabs
            tabLinks.forEach(function (tab, index) {
                tab.addEventListener('click', function () {
                    showPanel(index);
                });
            });

            // Show first panel by default
            showPanel(0);
        });
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setupCalculatorTabs();
        });
    } else {
        setupCalculatorTabs();
    }

    // Re-run when content changes (AJAX tab switching, etc.)
    var calcObserver = new MutationObserver(function () {
        setupCalculatorTabs();
    });
    calcObserver.observe(document.body, { childList: true, subtree: true });

/* ==========================================================================
   EXCLUSIVE UNIT CALCULATOR (% Unit Calculator)
   Exclusives scale off your best unit. Has separate settings.
   ========================================================================== */
(function () {
    function setupExclusiveCalculator() {
        var calculator = document.getElementById('exclusive-calculator');
        if (!calculator) return;
        if (calculator.dataset.exclSetup) return;
        calculator.dataset.exclSetup = 'true';

        var EXCLUSIVE_RATIO = parseFloat(calculator.getAttribute('data-ratio')) || 0.60;

        var UNIT_DATA = {
            'ATOMIC': 299333333,
            'Adaptation': 2400000000000,
            'Anbu Traitor': 8055556,
            'Angel Guidant': 4100000000000,
            'Ant King': 85333333,
            'Anti-Magic': 13,
            'Attack Titan': 200000000000000000000,
            'Aura Farmer': 17500000000000000,
            'Bald Boy': 23750000000000000,
            'Beast Slayer': 700,
            'Berserk Shinigami': 9000000,
            'Berserker (Enraged)': 10000000000000000000,
            'Black Leg': 30,
            'Black Swordsman': 177500000000000,
            'Boar Slayer': 16,
            'Boxer': 338444444444,
            'Bubbles': 400000000000000000,
            'Buddha': 2944444444,
            'Chainsaw Teen': 18,
            'Chess Master': 225000000000000,
            'Compass Demon': 87333,
            'Control Devil': 52667,
            'Cursed Child': 295333,
            'Cursed Vessel': 11,
            'Dark Magician': 315000000000000000,
            'Darkness Emperor': 192333333,
            'Demon God': 155333333333,
            'Demon King': 335000000,
            'Demon Leg': 7900,
            'Destruction Cat': 109555555556,
            'Dracula': 11500000000,
            'Dragon Emperor': 9055555556,
            'Dungeon Master': 12600000000000,
            "Earth's Warrior": 14000000,
            'Eight Gates': 260667,
            'Einz': 10900000000000,
            'Feather Traitor': 272500000000000,
            'Finger': 20000000000000000000,
            'Fire Mage': 74,
            'Fish Pirate': 3000000000000000,
            'Fishman Karate': 30000000000000000,
            'Flame Hashira': 3100,
            'Flame Queen': 14300000000000,
            'Flash Hokage': 5222222,
            'Foresight Quincy': 18000000000,
            'Fullmetal Alchemist': 119,
            'Ghoul': 6700,
            'Golden King': 156666667,
            'Golden Wind': 246888888889,
            'Gray': 10277777778,
            'Graybeard': 2388889,
            'Hero Symbol': 156667,
            'Hot and Ice': 297,
            'Joe Kujo': 226000,
            'Kid Boo': 60000000000000000,
            'King of Curses': 191333,
            'Lava Admiral': 122000,
            'Leaf Ninja': 2,
            'Legendary Warrior': 228000000,
            'Limitless': 500000,
            'Lord Alien': 384222222222,
            'Mech': 230000000000000000,
            'Monkey God': 400000000000000,
            'Monkey King': 292666666667,
            'Moon Baddie': 7500000000000,
            'Moon Demon': 35000000000000,
            'Muroda': 1444444,
            'Navigator': 2233300000000000,
            'Notebook Killer': 7833333333,
            'Number 4': 4000000000000000000,
            'Omni Ruler': 700000000000,
            'One Punch Man': 430000000000,
            'One Punch Man (SERIOUS)': 225000000000000000000,
            'Pink Goddess': 130000000000000,
            'Psychic': 330000,
            'Psychic Baddie': 16000000000000,
            'ROOM': 10300,
            'Red-Hair Emperor': 6166667,
            'Rookie Hunter': 7,
            'Rubber Pirate': 4,
            'Saiyan Prince': 18000,
            'Sand Ninja': 430,
            'Scout Commander': 56000000000000000000,
            'Shadow Monarch': 49666667,
            'Shadow Sorcerer': 252,
            'Shadow Succubus': 700000000000000,
            'Sin of Wrath': 263666667,
            'Slime God': 500000000,
            'Snow Empress': 341,
            'Sorcerer Killer': 9100,
            'Spirit Boxer': 163,
            'Spider Boss': 4166666667,
            'Star Digger': 9200000000000,
            'Sun God': 201111111111,
            'Sun Slayer': 6611111111,
            'Soul Reaper (Vasto)': 6000000000000000000,
            'Sound Hashira': 1900,
            'Spade': 11500,
            'Soul Reaper': 4,
            'Spirit Boxer': 163,
            'Ten Tailed Baddie': 63777777778,
            'The Armored': 68000000000000000000,
            'The Colossal': 32000000000000000000,
            'The One': 4277778,
            'The World': 3333333,
            'Thunder': 145000000000000000,
            'Thunder Kid': 386,
            'Thunder Swordsman': 14,
            'Time King': 2000000000000000000,
            'Titan Scout': 208,
            'Titan Slayer': 44000000000000000000,
            'Titan Warrior': 80000000000000000000,
            'Toad Sensei': 11250000000000000,
            'Toby': 7111111,
            'Traitor (Prime)': 12000000000000000000,
            'Traitor (TYBW)': 121000000,
            'Triple Swordsman': 5500,
            'Turtle Sensei': 1466700000000000,
            'Ultimate Being': 5388888889,
            'Ultimate Priest': 5800000000000,
            'Unc Admiral': 1722222222,
            'Visionary': 8000000000000000000,
            'Void Spiral': 82500000000000,
            'Water Breather': 9,
            'Water Hashira': 4300,
            'Wind Magician': 5000000000000000
        };

        var RARITY_ORDER = ['Leaf Ninja','Rubber Pirate','Soul Reaper','Rookie Hunter','Water Breather','Cursed Vessel','Anti-Magic','Thunder Swordsman','Boar Slayer','Chainsaw Teen','Black Leg','Fire Mage','Fullmetal Alchemist','Spirit Boxer','Titan Scout','Shadow Sorcerer','Hot and Ice','Snow Empress','Thunder Kid','Sand Ninja','Beast Slayer','Sound Hashira','Flame Hashira','Water Hashira','Triple Swordsman','Ghoul','Demon Leg','Sorcerer Killer','ROOM','Spade','Saiyan Prince','Control Devil','Compass Demon','Lava Admiral','Hero Symbol','King of Curses','Joe Kujo','Eight Gates','Cursed Child','Psychic','Limitless','Muroda','Graybeard','The World','The One','Flash Hokage','Red-Hair Emperor','Toby','Anbu Traitor','Berserk Shinigami',"Earth's Warrior",'Shadow Monarch','Ant King','Traitor (TYBW)','Golden King','Darkness Emperor','Legendary Warrior','Sin of Wrath','ATOMIC','Demon King','Slime God','Unc Admiral','Buddha','Spider Boss','Ultimate Being','Sun Slayer','Notebook Killer','Dragon Emperor','Gray','Dracula','Foresight Quincy','Ten Tailed Baddie','Destruction Cat','Demon God','Sun God','Golden Wind','Monkey King','Boxer','Lord Alien','One Punch Man','Omni Ruler','Adaptation','Angel Guidant','Ultimate Priest','Moon Baddie','Star Digger','Einz','Dungeon Manager','Flame Queen','Psychic Baddie','Moon Demon','Void Spiral','Pink Goddess','Black Swordsman','Chess Master','Feather Traitor','Monkey God','Shadow Succubus','Turtle Sensei','Navigator','Fish Pirate','Wind Magician','Toad Sensei','Aura Farmer','Bald Boy','Fishman Karate','Kid Boo','Thunder','Mech','Dark Magician','Bubbles','Time King','Number 4','Soul Reaper (Vasto)','Visionary','Berserker (Enraged)','Traitor (Prime)','Finger','The Colossal','Titan Slayer','Scout Commander','The Armored','Titan Warrior','Attack Titan','One Punch Man (SERIOUS)'];

        var MUTATION_MULTS = { none: 1, gold: 1.5, diamond: 2, lava: 3, stellar: 4, admin: 6 };
        var TRAIT_BONUSES = { none: [0,0], agile: [5,0], brawler: [0,10], focused: [7.5,5], lucky: [12.5,0], berserker: [5,20], phantom: [18,10], infernal: [10,25], arcane: [25,20], divine: [50,0], cosmic: [50,35], voidborne: [75,50], transcendent: [300,100] };
        var AURA_BONUSES = { none: [0,0], gilded: [10,5], kaioken: [20,10], war_master: [30,15], shining: [40,20], spiral: [50,25], aqua: [60,30], flame_lord: [70,35], rage: [80,40], crow: [90,45], darkness: [100,50], mysterious: [130,65], ascendend: [140,70], galaxy: [150,75], atomic: [180,90], celestial: [190,95], destroyer: [200,100], monochromatic: [210,105], sun_god: [260,130] };
        var TITLE_BONUSES = { none: 0, rookie_roller: 10, dedicated_roller: 12, skilled_roller: 15, reborn: 18, index_hunter: 20, vip: 25, elite_roller: 30, billion_breaker: 35, veteran_roller: 40, awakened: 45, index_master: 50, master_roller: 55, endless_grinder: 60, ascended: 65, trillion_breaker: 70, completionist: 75, eternal_roller: 80, timeless: 90, transcended: 100, reality_breaker: 110, moderator: 150 };

        var bestUnitList = document.getElementById('best-unit-select');
        var bestUnitToggle = document.getElementById('best-unit-toggle');
        var bestUnitConfig = document.getElementById('best-unit-config');
        var exclLevelDisplay = document.getElementById('excl-level-display');
        var bestIncomeResult = document.getElementById('best-income-result');
        var manipIncomeResult = document.getElementById('manip-unit-income-result');
        var bestDamageResult = document.getElementById('best-damage-result');
        var manipDamageResult = document.getElementById('manip-damage-result');
        var bestGroupBoost = document.getElementById('best-group-boost');
        var bestPremiumBoost = document.getElementById('best-premium-boost');

        var currentLevel = 0;
        var currentExclLevel = 0;
        var currentUpgrade = 1.0;
        var groupBoostActive = false;
        var premiumBoostActive = false;
        var vipBoostActive = false;
        var x2IncomeBoostActive = false;
        var selectedUnit = '';

        function formatNumber(num) {
            if (!isFinite(num) || num === 0) return '0';
            var suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td'];
            var tier = Math.floor(Math.log10(Math.abs(num)) / 3);
            if (tier >= suffixes.length) tier = suffixes.length - 1;
            if (tier === 0) return Math.floor(num * 100) / 100;
            var scaled = num / Math.pow(10, tier * 3);
            return Math.floor(scaled * 100) / 100 + suffixes[tier];
        }

        function getBestMutation() {
            var sel = calculator.querySelector('.eu-mut.ln-mutation-selected');
            return sel ? sel.getAttribute('data-mutation') : 'none';
        }

        function getBestTrait() {
            var sel = calculator.querySelector('.eu-trait.ln-trait-active');
            return sel ? sel.getAttribute('data-trait') : 'none';
        }

        function getExclMutation() {
            var sel = calculator.querySelector('.eu-mut-excl.ln-mutation-selected');
            return sel ? sel.getAttribute('data-mutation') : 'none';
        }

        function getExclTrait() {
            var sel = calculator.querySelector('.eu-trait-excl.ln-trait-active');
            return sel ? sel.getAttribute('data-trait') : 'none';
        }

        function getAura() {
            var sel = calculator.querySelector('.eu-aura.ln-aura-selected');
            return sel ? sel.getAttribute('data-aura') : 'none';
        }

        function getTitle() {
            var sel = calculator.querySelector('.eu-title.ln-title-selected');
            return sel ? sel.getAttribute('data-title') : 'none';
        }

        function calculate() {
            if (!selectedUnit || !UNIT_DATA[selectedUnit]) {
                bestIncomeResult.textContent = '0';
                manipIncomeResult.textContent = '0';
                bestDamageResult.textContent = '0';
                manipDamageResult.textContent = '0';
                return;
            }

            var BASE = UNIT_DATA[selectedUnit];
            var bestMutMult = MUTATION_MULTS[getBestMutation()] || 1;
            var bestTrait = TRAIT_BONUSES[getBestTrait()] || [0, 0];
            var exclMutMult = MUTATION_MULTS[getExclMutation()] || 1;
            var exclTrait = TRAIT_BONUSES[getExclTrait()] || [0, 0];
            var aura = AURA_BONUSES[getAura()] || [0, 0];
            var titleBonus = TITLE_BONUSES[getTitle()] || 0;

            // Shared plot multipliers (apply to both best unit and exclusive)
            var sharedIncomeMult = currentUpgrade * (1 + aura[0] / 100) * (1 + titleBonus / 100);
            if (groupBoostActive) sharedIncomeMult *= 1.1;
            if (premiumBoostActive) sharedIncomeMult *= 1.1;
            if (vipBoostActive) sharedIncomeMult *= 1.5;
            if (x2IncomeBoostActive) sharedIncomeMult *= 2.0;
            var sharedDamageMult = currentUpgrade * (1 + aura[1] / 100);

            // Best unit income = base x best mutation x best trait x level x shared boosts
            var bestLevelScaling = Math.pow(1.25, currentLevel);
            var bestUnitIncome = BASE * bestMutMult * (1 + bestTrait[0] / 100) * bestLevelScaling * sharedIncomeMult;

            // Exclusive income = ratio x base x excl mutation x excl trait x excl level x shared boosts
            var exclLevelScaling = Math.pow(1.25, currentExclLevel);
            var manipIncome = BASE * EXCLUSIVE_RATIO * exclMutMult * (1 + exclTrait[0] / 100) * exclLevelScaling * sharedIncomeMult;

            // Damage
            var bestDamage = BASE * bestMutMult * (1 + bestTrait[1] / 100) * bestLevelScaling * sharedDamageMult;
            var manipDamage = BASE * EXCLUSIVE_RATIO * exclMutMult * (1 + exclTrait[1] / 100) * exclLevelScaling * sharedDamageMult;

            bestIncomeResult.textContent = formatNumber(bestUnitIncome) + '/s';
            manipIncomeResult.textContent = formatNumber(manipIncome) + '/s';
            bestDamageResult.textContent = formatNumber(bestDamage);
            manipDamageResult.textContent = formatNumber(manipDamage);
        }

        // Build the unit list dynamically
        function buildUnitList() {
            var keys = Object.keys(UNIT_DATA);
            keys.sort(function (a, b) {
                var ia = RARITY_ORDER.indexOf(a);
                var ib = RARITY_ORDER.indexOf(b);
                if (ia === -1) ia = 9999;
                if (ib === -1) ib = 9999;
                return ia - ib;
            });
            bestUnitList.innerHTML = '';
            keys.forEach(function (key) {
                var d = document.createElement('div');
                d.className = 'ln-bestunit-option ' + (key === '' ? 'ln-bestunit-selected' : '');
                d.setAttribute('data-unit', key);
                d.textContent = key;
                bestUnitList.appendChild(d);
            });
            bestUnitList.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.target && e.target.classList && e.target.classList.contains('ln-bestunit-option')) {
                    var opts = bestUnitList.querySelectorAll('.ln-bestunit-option');
                    opts.forEach(function (o) { o.classList.remove('ln-bestunit-selected'); });
                    e.target.classList.add('ln-bestunit-selected');
                    selectedUnit = e.target.getAttribute('data-unit');
                    bestUnitToggle.textContent = 'Best Unit: ' + (selectedUnit || '-- Select --') + ' (click to change)';
                    if (selectedUnit && UNIT_DATA[selectedUnit]) {
                        bestUnitConfig.style.display = 'block';
                    } else {
                        bestUnitConfig.style.display = 'none';
                    }
                    calculate();

                    // Auto-close the dropdown after selection and scroll back to calculator
                    bestUnitList.style.display = 'none';
                    bestUnitToggle.setAttribute('data-expanded', 'false');
                    calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        // Best unit level controls
        var bLevelUp = document.getElementById('best-level-up');
        var bLevelDown = document.getElementById('best-level-down');
        var bLevelDisplay = document.getElementById('best-level-display');
        if (bLevelUp) bLevelUp.addEventListener('click', function () { currentLevel = Math.min(50, currentLevel + 1); bLevelDisplay.textContent = currentLevel; calculate(); });
        if (bLevelDown) bLevelDown.addEventListener('click', function () { currentLevel = Math.max(0, currentLevel - 1); bLevelDisplay.textContent = currentLevel; calculate(); });
        // Click-to-type for best unit level
        if (bLevelDisplay) {
            bLevelDisplay.style.cursor = 'pointer';
            bLevelDisplay.addEventListener('click', function () {
                var input = prompt('Enter best unit level (0-50):', currentLevel);
                if (input === null) return;
                var val = parseInt(input);
                if (isNaN(val)) val = 0;
                currentLevel = Math.max(0, Math.min(50, val));
                bLevelDisplay.textContent = currentLevel;
                calculate();
            });
        }

        // Best unit upgrade controls
        var bUpgradeUp = document.getElementById('best-upgrade-up');
        var bUpgradeDown = document.getElementById('best-upgrade-down');
        var bUpgradeDisplay = document.getElementById('best-upgrade-display');
        if (bUpgradeUp) bUpgradeUp.addEventListener('click', function () { currentUpgrade = Math.min(9.0, Math.round((currentUpgrade + 0.1) * 10) / 10); bUpgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x'; calculate(); });
        if (bUpgradeDown) bUpgradeDown.addEventListener('click', function () { currentUpgrade = Math.max(1.0, Math.round((currentUpgrade - 0.1) * 10) / 10); bUpgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x'; calculate(); });
        // Click-to-type for upgrade
        if (bUpgradeDisplay) {
            bUpgradeDisplay.style.cursor = 'pointer';
            bUpgradeDisplay.addEventListener('click', function () {
                var input = prompt('Enter upgrade multiplier (1.0-9.0):', currentUpgrade.toFixed(1));
                if (input === null) return;
                var val = parseFloat(input);
                if (isNaN(val)) val = 1.0;
                currentUpgrade = Math.max(1.0, Math.min(9.0, val));
                currentUpgrade = Math.round(currentUpgrade * 10) / 10;
                bUpgradeDisplay.textContent = currentUpgrade.toFixed(1) + 'x';
                calculate();
            });
        }

        // Exclusive level controls
        var eLevelUp = document.getElementById('excl-level-up');
        var eLevelDown = document.getElementById('excl-level-down');
        if (eLevelUp) eLevelUp.addEventListener('click', function () { currentExclLevel = Math.min(50, currentExclLevel + 1); exclLevelDisplay.textContent = currentExclLevel; calculate(); });
        if (eLevelDown) eLevelDown.addEventListener('click', function () { currentExclLevel = Math.max(0, currentExclLevel - 1); exclLevelDisplay.textContent = currentExclLevel; calculate(); });
        if (exclLevelDisplay) {
            exclLevelDisplay.style.cursor = 'pointer';
            exclLevelDisplay.addEventListener('click', function () {
                var input = prompt('Enter exclusive unit level (0-50):', currentExclLevel);
                if (input === null) return;
                var val = parseInt(input);
                if (isNaN(val)) val = 0;
                currentExclLevel = Math.max(0, Math.min(50, val));
                exclLevelDisplay.textContent = currentExclLevel;
                calculate();
            });
        }

        // Group/Premium boost
        if (bestGroupBoost) bestGroupBoost.addEventListener('click', function () {
            groupBoostActive = !groupBoostActive;
            bestGroupBoost.classList.toggle('ln-group-boost-active', groupBoostActive);
            bestGroupBoost.setAttribute('data-active', String(groupBoostActive));
            calculate();
        });
        if (bestPremiumBoost) bestPremiumBoost.addEventListener('click', function () {
            premiumBoostActive = !premiumBoostActive;
            bestPremiumBoost.classList.toggle('ln-premium-boost-active', premiumBoostActive);
            bestPremiumBoost.setAttribute('data-active', String(premiumBoostActive));
            calculate();
        });
        // VIP Boost toggle
        var bestVipBoost = document.getElementById('best-vip-boost');
        if (bestVipBoost) {
            bestVipBoost.addEventListener('click', function () {
                vipBoostActive = !vipBoostActive;
                bestVipBoost.classList.toggle('ln-vip-boost-active', vipBoostActive);
                bestVipBoost.setAttribute('data-active', String(vipBoostActive));
                calculate();
            });
        }

        // x2 Income Boost toggle
        var bestX2IncomeBoost = document.getElementById('best-x2-income-boost');
        if (bestX2IncomeBoost) {
            bestX2IncomeBoost.addEventListener('click', function () {
                x2IncomeBoostActive = !x2IncomeBoostActive;
                bestX2IncomeBoost.classList.toggle('ln-x2-income-boost-active', x2IncomeBoostActive);
                bestX2IncomeBoost.setAttribute('data-active', String(x2IncomeBoostActive));
                calculate();
            });
        }

        // Mutation click handlers (best unit)
        calculator.querySelectorAll('.eu-mut').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-mut').forEach(function (o) { o.classList.remove('ln-mutation-selected'); });
                opt.classList.add('ln-mutation-selected');
                calculate();
            });
        });
        // Mutation click handlers (exclusive)
        calculator.querySelectorAll('.eu-mut-excl').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-mut-excl').forEach(function (o) { o.classList.remove('ln-mutation-selected'); });
                opt.classList.add('ln-mutation-selected');
                calculate();
            });
        });
        // Trait click handlers (best unit)
        calculator.querySelectorAll('.eu-trait').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-trait').forEach(function (o) { o.classList.remove('ln-trait-active'); });
                opt.classList.add('ln-trait-active');
                calculate();
            });
        });
        // Trait click handlers (exclusive)
        calculator.querySelectorAll('.eu-trait-excl').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-trait-excl').forEach(function (o) { o.classList.remove('ln-trait-active'); });
                opt.classList.add('ln-trait-active');
                calculate();
            });
        });
        // Aura click handlers
        calculator.querySelectorAll('.eu-aura').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-aura').forEach(function (o) { o.classList.remove('ln-aura-selected'); });
                opt.classList.add('ln-aura-selected');
                calculate();
            });
        });
        // Title click handlers
        calculator.querySelectorAll('.eu-title').forEach(function (opt) {
            opt.addEventListener('click', function () {
                calculator.querySelectorAll('.eu-title').forEach(function (o) { o.classList.remove('ln-title-selected'); });
                opt.classList.add('ln-title-selected');
                calculate();
            });
        });

        // Default selections
        var setSelect = function (container, cls, attr, val, selClass) {
            var opts = container.querySelectorAll(cls);
            opts.forEach(function (o) { o.classList.remove(selClass); });
            var sel = container.querySelector(cls + '[' + attr + '="' + val + '"]');
            if (sel) sel.classList.add(selClass);
        };
        setSelect(calculator, '.eu-mut', 'data-mutation', 'none', 'ln-mutation-selected');
        setSelect(calculator, '.eu-mut-excl', 'data-mutation', 'none', 'ln-mutation-selected');
        setSelect(calculator, '.eu-trait', 'data-trait', 'none', 'ln-trait-active');
        setSelect(calculator, '.eu-trait-excl', 'data-trait', 'none', 'ln-trait-active');
        setSelect(calculator, '.eu-aura', 'data-aura', 'none', 'ln-aura-selected');
        setSelect(calculator, '.eu-title', 'data-title', 'none', 'ln-title-selected');

        buildUnitList();
        bestUnitList.style.display = 'none';
        bestUnitToggle.setAttribute('data-expanded', 'false');

        // Toggle show/hide the unit list
        bestUnitToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (bestUnitList.style.display === 'none') {
                bestUnitList.style.display = 'block';
                bestUnitToggle.setAttribute('data-expanded', 'true');
            } else {
                bestUnitList.style.display = 'none';
                bestUnitToggle.setAttribute('data-expanded', 'false');
            }
        });

        calculate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setupExclusiveCalculator(); });
    } else {
        setupExclusiveCalculator();
    }
})();