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

        if (!levelDisplay || !incomeResult || !damageResult) return;

        var currentLevel = 0;
        var currentUpgrade = 1.0; // Upgrade multiplier: 1.0x to 9.0x, increments of 0.1
        var groupBoostActive = false; // Group boost: +10% income, does not stack

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
            var auraIncomeMult = 1 + (auraIncomeBonus / 100);
            var titleIncomeMult = 1 + (titleIncomeBonus / 100);
            var totalIncome = BASE_INCOME * mutationMult * levelScaling * traitMultiplier * currentUpgrade * groupBoostMult * auraIncomeMult * titleIncomeMult;

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

        // Level controls (+/- buttons)
        var levelBtns = calculator.querySelectorAll('.ln-level-btn');
        levelBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
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

        // Upgrade controls (+/- buttons)
        var upgradeBtns = calculator.querySelectorAll('[data-upgrade-dir]');
        upgradeBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
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

        // Group boost toggle
        if (groupBoostBtn) {
            groupBoostBtn.addEventListener('click', function () {
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