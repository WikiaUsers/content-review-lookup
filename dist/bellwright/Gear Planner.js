/**
 * Bellwright Gear Planner Logic (MediaWiki:Gear_Planner.js)
 * Uses LocalStorage for persistence.
 */

(function(window, document) {
    'use strict';

    // --- Global State and Data ---
    let selectedGear;
    let currentAttributes;
    let gearData = {}; // Stores all parsed data from the JSON template
    
    const LOCAL_STORAGE_KEY = 'bellwright_gear_plan';


    // --- Utility Functions ---

    /**
     * Custom Modal implementation for confirmations/alerts.
     * Needs to find the modal elements inside the main planner container.
     */
    function customModal(title, message, isConfirm = false) {
        return new Promise(resolve => {
            const container = document.getElementById('bellwright-planner-container');
            if (!container) return resolve(false);

            const modal = container.querySelector('#custom-modal');
            const modalTitle = container.querySelector('#modal-title');
            const modalMessage = container.querySelector('#modal-message');
            const modalConfirm = container.querySelector('#modal-confirm');
            const modalCancel = container.querySelector('#modal-cancel');

            if (!modal || !modalTitle || !modalMessage || !modalConfirm || !modalCancel) {
                 console.error("Modal elements not found.");
                 return resolve(window.confirm(message)); // Fallback
            }

            modalTitle.textContent = title;
            modalMessage.textContent = message;

            modalCancel.style.display = isConfirm ? 'inline-block' : 'none';

            modalConfirm.onclick = () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                resolve(true);
            };

            modalCancel.onclick = () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                resolve(false);
            };

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    }
    window.bellwrightCustomModal = customModal; // Expose globally for HTML elements

    function updateStatus(message, isError = false) {
        const statusEl = document.getElementById('status-message');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'text-xs font-semibold ' + (isError ? 'text-red-400' : 'text-green-400');
        }
    }
    
    // Helper to format slot names for display
    function getDisplaySlotName(slotKey) {
        switch (slotKey) {
            case 'HeadSlot': return 'Head Slot';
            case 'TorsoSlot': return 'Torso Slot';
            case 'GlovesSlot': return 'Gloves Slot';
            case 'PantsSlot': return 'Pants Slot';
            case 'BootsSlot': return 'Boots Slot';
            case 'FoodBagSlot': return 'Food Bag Slot';
            case 'QuiverSlot': return 'Quiver Slot';
            case 'BagSlot': return 'Bag Slot';
            case 'QuickSlot1': return 'Quick Slot 1';
            case 'QuickSlot2': return 'Quick Slot 2';
            case 'QuickSlot3': return 'Quick Slot 3';
            case 'FoodBuff1': return 'Food Buff 1';
            case 'FoodBuff2': return 'Food Buff 2';
            case 'FoodBuff3': return 'Food Buff 3';
            default: return slotKey.replace('BeltSlot', 'Belt Slot ');
        }
    }
    
    /**
     * Resolves gear options by referencing global arrays (if needed by JSON structure).
     */
    function getGearOptions(slotKey) {
        const slotData = gearData.GEAR_SLOTS[slotKey];
        if (typeof slotData === 'string') {
            // It's a reference to a generic array (e.g., "GENERIC_ARMOR_OPTIONS" or "FOOD_OPTIONS")
            return gearData[slotData] || [];
        }
        // It's a specific array for the slot
        return slotData || [];
    }


    // --- Persistence Functions (Local Storage) ---

    function saveToLocalStorage() {
        try {
            const dataToSave = {
                gear: selectedGear,
                attributes: currentAttributes
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
            updateStatus(`Saved to browser: ${new Date().toLocaleTimeString()}`);
        } catch (error) {
            console.error("Error saving to local storage:", error);
            updateStatus("Error saving plan locally.", true);
        }
    }

    function loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Merge and update gear state
                selectedGear = { ...gearData.DEFAULT_GEAR, ...data.gear };

                // Merge and update attribute state and UI inputs
                currentAttributes = { ...gearData.DEFAULT_ATTRIBUTES, ...data.attributes };
                for (const key in currentAttributes) {
                     const inputEl = document.getElementById(`attr-${key}`);
                     if (inputEl) {
                        inputEl.value = currentAttributes[key];
                     }
                }
                
                updateStatus(`Plan loaded from browser: ${new Date().toLocaleTimeString()}`);
            }
        } catch (error) {
            console.warn("No valid saved data found in local storage. Using defaults.");
            // If loading fails, just use the defaults already set
        }
    }

    // --- Calculation and Handler Functions ---

    function calculateStats() {
        let gearTotals = { armor: 0, health: 0, stamina: 0, damage: 0 };
        let detailsHtml = '';

        // 1. Calculate Gear and Food Buff Totals
        for (const slot in selectedGear) {
            const itemId = selectedGear[slot];
            const options = getGearOptions(slot);
            const gearItem = options.find(item => item.id === itemId) || { armor: 0, health: 0, stamina: 0, damage: 0, name: 'Unknown Item' };

            gearTotals.armor += gearItem.armor;
            gearTotals.health += gearItem.health;
            gearTotals.stamina += gearItem.stamina;
            gearTotals.damage += gearItem.damage;

            // Format stats for display in the individual gear buff section
            const statsText = [
                gearItem.armor !== 0 ? `${gearItem.armor > 0 ? '+' : ''}${gearItem.armor} A` : '',
                gearItem.health !== 0 ? `${gearItem.health > 0 ? '+' : ''}${gearItem.health} H` : '',
                gearItem.stamina !== 0 ? `${gearItem.stamina > 0 ? '+' : ''}${gearItem.stamina} S` : '',
                gearItem.damage !== 0 ? `${gearItem.damage > 0 ? '+' : ''}${gearItem.damage} D` : ''
            ].filter(s => s).join(', ');

            detailsHtml += `
                <div class="bp-bg-base-dark p-2 rounded text-sm flex justify-between items-center">
                    <span class="font-medium bp-text-primary-blue w-1/4">${getDisplaySlotName(slot)}:</span>
                    <span class="font-semibold w-1/3">${gearItem.name}</span>
                    <span class="text-xs text-gray-400 w-1/3 text-right">(${statsText || 'No Stats Change'})</span>
                </div>
            `;
        }

        // 2. Calculate Combined Stats (Base + Gear Buffs + Attributes)
        const BASE_HEALTH = 100;
        const BASE_STAMINA = 100;
        const BASE_DAMAGE = 1;

        const attrStr = currentAttributes.strength;
        const attrAgi = currentAttributes.agility;
        const attrOneH = currentAttributes.one_handed;
        const attrTwoH = currentAttributes.two_handed;
        const attrArch = currentAttributes.archery;

        const combinedHealth = BASE_HEALTH + gearTotals.health + (attrStr * 2);
        const combinedStamina = BASE_STAMINA + gearTotals.stamina + (attrAgi * 5);
        const combinedMeleeDamage = BASE_DAMAGE + gearTotals.damage + (attrStr * 1.5) + (attrOneH * 0.8) + (attrTwoH * 1.5);
        const combinedRangedDamage = BASE_DAMAGE + gearTotals.damage + (attrAgi * 0.5) + (attrArch * 1.5);
        
        const workEfficiency = {};
        for (const attr in currentAttributes) {
            if (!['strength', 'agility', 'one_handed', 'two_handed', 'shields', 'archery'].includes(attr)) {
                workEfficiency[attr] = (currentAttributes[attr] / 10) * 100;
            }
        }


        // 3. Update UI Summary Badges
        document.getElementById('total-armor').textContent = gearTotals.armor;
        document.getElementById('total-health').textContent = Math.round(combinedHealth);
        document.getElementById('total-stamina').textContent = Math.round(combinedStamina);
        document.getElementById('total-melee-damage').textContent = combinedMeleeDamage.toFixed(1);
        document.getElementById('total-ranged-damage').textContent = combinedRangedDamage.toFixed(1);
        document.getElementById('current-gear-details').innerHTML = detailsHtml || '<p class="text-gray-500">No gear selected yet. Buffs will show here.</p>';

        // 4. Update Combined Stats Report
        let reportHtml = `
            <div class="p-3 rounded bp-bg-base-dark space-y-2">
                <h4 class="font-bold bp-text-highlight-gold">Gear & Food Buff Totals:</h4>
                <p>
                    <span class="text-white">${gearTotals.armor}</span> Armor, 
                    <span class="text-white">${gearTotals.health}</span> Health, 
                    <span class="text-white">${gearTotals.stamina}</span> Stamina, 
                    <span class="text-white">${gearTotals.damage}</span> Base Damage
                </p>
            </div>
            <h4 class="font-bold bp-text-primary-blue mt-3">Combat Effectiveness:</h4>
            <div class="grid grid-cols-2 gap-2 text-gray-300">
                <p><span class="font-semibold">Max HP:</span> <span class="text-white">${Math.round(combinedHealth)}</span> (Base + Buffs + ${attrStr * 2} from STR)</p>
                <p><span class="font-semibold">Max Stamina:</span> <span class="text-white">${Math.round(combinedStamina)}</span> (Base + Buffs + ${attrAgi * 5} from AGI)</p>
                <p><span class="font-semibold">Total Melee Damage:</span> <span class="text-white">${combinedMeleeDamage.toFixed(1)}</span></p>
                <p><span class="font-semibold">Total Ranged Damage:</span> <span class="text-white">${combinedRangedDamage.toFixed(1)}</span></p>
            </div>
            <h4 class="font-bold bp-text-primary-blue mt-3">Work Efficiency (%):</h4>
            <div class="grid grid-cols-2 gap-2 text-gray-300 text-sm">
                ${Object.entries(workEfficiency).map(([key, value]) => `
                    <p class="capitalize"><span class="font-semibold">${key.replace('_', ' ')}:</span> <span class="text-white">${Math.round(value)}%</span> (Lvl ${currentAttributes[key]})</p>
                `).join('')}
            </div>
        `;
        document.getElementById('combined-stats-report').innerHTML = reportHtml;

        // Ensure the selection UI reflects current state
        for (const slot in selectedGear) {
            const selectEl = document.getElementById(`select-${slot}`);
            if (selectEl) {
                selectEl.value = selectedGear[slot];
            }
        }
    }

    /**
     * Handles gear selection change and triggers save/recalculation.
     */
    window.handleGearChange = function(slot, itemId) {
        selectedGear[slot] = itemId;
        calculateStats();
        saveToLocalStorage();
    }

    /**
     * Handles attribute input change.
     */
    window.handleAttributeChange = function() {
        for (const key in currentAttributes) {
             const inputEl = document.getElementById(`attr-${key}`);
             if (inputEl) {
                let value = parseInt(inputEl.value) || 0;
                value = Math.max(0, Math.min(10, value));
                currentAttributes[key] = value;
                inputEl.value = value;
             }
        }
        calculateStats();
        saveToLocalStorage(); 
    };
    
    /**
     * Clears all selected gear and resets attributes.
     */
    window.clearPlan = async function() {
        const confirmed = await customModal(
            "Confirm Clear",
            "Are you sure you want to clear your current gear plan and reset attributes to defaults? This data will be lost.",
            true
        );

        if (confirmed) {
            selectedGear = { ...gearData.DEFAULT_GEAR };
            currentAttributes = { ...gearData.DEFAULT_ATTRIBUTES };

            for (const key in gearData.DEFAULT_ATTRIBUTES) {
                 const inputEl = document.getElementById(`attr-${key}`);
                 if (inputEl) {
                    inputEl.value = gearData.DEFAULT_ATTRIBUTES[key];
                 }
            }

            localStorage.removeItem(LOCAL_STORAGE_KEY);
            calculateStats();
            updateStatus("Plan and attributes cleared. Saved defaults.", false);
        }
    }


    // --- Initialization and UI Functions ---

    /**
     * Generates the HTML for a group of horizontal slots.
     */
    function renderSlotGroup(title, iconClass, slots) {
        let html = `
            <div class="p-4 rounded-xl bp-card space-y-4 bp-bg-dark-card">
                <h3 class="text-xl font-semibold bp-text-primary-blue"><i class="${iconClass} mr-2"></i> ${title}</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        `;

        slots.forEach(slot => {
            const options = getGearOptions(slot).map(item =>
                `<option value="${item.id}">${item.name} (A:${item.armor} H:${item.health} S:${item.stamina} D:${item.damage})</option>`
            ).join('');

            const displaySlotName = getDisplaySlotName(slot);

            html += `
                <div>
                    <label for="select-${slot}" class="block text-sm font-medium mb-1 text-gray-400">${displaySlotName}:</label>
                    <select id="select-${slot}"
                        onchange="handleGearChange('${slot}', this.value)"
                        class="w-full p-2 rounded-md bp-bg-base-dark bp-border-primary-blue bp-custom-select text-sm"
                    >
                        ${options}
                    </select>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
        return html;
    }
    
    /**
     * Generates the HTML for a group of vertical slots (Armor).
     */
    function renderVerticalSlotGroup(title, iconClass, slotsDefinition) {
        let html = `
            <div class="p-4 rounded-xl bp-card space-y-4 h-full bp-bg-dark-card">
                <h3 class="text-xl font-semibold bp-text-highlight-gold"><i class="${iconClass} mr-2"></i> ${title}</h3>
                <div class="space-y-3">
        `;

        slotsDefinition.forEach(slot => {
            const options = getGearOptions(slot.key).map(item =>
                `<option value="${item.id}">${item.name} (A:${item.armor} H:${item.health} S:${item.stamina} D:${item.damage})</option>`
            ).join('');

            html += `
                <div>
                    <label for="select-${slot.key}" class="block text-sm font-medium mb-1 text-gray-400">
                        <i class="${slot.icon} mr-1"></i> ${slot.name}:
                    </label>
                    <select id="select-${slot.key}"
                        onchange="handleGearChange('${slot.key}', this.value)"
                        class="w-full p-2.5 rounded-md bp-bg-base-dark bp-border-primary-blue bp-custom-select"
                    >
                        ${options}
                    </select>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
        return html;
    }

    /**
     * Populates the gear selection UI elements.
     */
    function renderGearSelectors() {
        const container = document.getElementById('gear-slots');
        if (!container) return;
        
        const beltSlots = ['BeltSlot1', 'BeltSlot2', 'BeltSlot3'];
        const storageSlots = ['FoodBagSlot', 'QuiverSlot', 'BagSlot'];
        const quickSlots = ['QuickSlot1', 'QuickSlot2', 'QuickSlot3'];
        const foodBuffSlots = ['FoodBuff1', 'FoodBuff2', 'FoodBuff3'];
        
        const armorSlotsDefinition = [
            { key: 'HeadSlot', name: 'Head', icon: 'fas fa-hat-cowboy' },
            { key: 'TorsoSlot', name: 'Torso', icon: 'fas fa-shield-halved' },
            { key: 'GlovesSlot', name: 'Gloves', icon: 'fas fa-hand-rock' },
            { key: 'PantsSlot', name: 'Pants', icon: 'fas fa-shoe-prints' },
            { key: 'BootsSlot', name: 'Boots', icon: 'fas fa-boot' },
        ];

        const utilitySlotsHtml = `
            <div class="space-y-4">
                ${renderSlotGroup("Weapons / Tools (Belt Slots)", "fas fa-hammer", beltSlots)}
                ${renderSlotGroup("Storage", "fas fa-box-open", storageSlots)}
                ${renderSlotGroup("Quick Slots", "fas fa-hand-pointer", quickSlots)}
                ${renderSlotGroup("Consumed Food", "fas fa-burger", foodBuffSlots)}
            </div>
        `;

        const armorSlotsHtml = renderVerticalSlotGroup(
            "Armor",
            "fas fa-vest-patches",
            armorSlotsDefinition
        );
        
        container.innerHTML = utilitySlotsHtml + armorSlotsHtml;
    }

    /**
     * Main application setup.
     */
    function initApp() {
        // 0. Load Data
        const dataEl = document.getElementById('gear-planner-json-data');
        if (!dataEl || !dataEl.textContent.trim()) {
            updateStatus("Error: Could not load data from Template:Data_Gear_Planner.", true);
            console.error("Critical Error: Gear Planner JSON data not found in element #gear-planner-json-data.");
            return;
        }

        try {
            // Parse the JSON data from the <pre> tag
            gearData = JSON.parse(dataEl.textContent.trim());

            // Initialize state with default values from loaded data
            selectedGear = { ...gearData.DEFAULT_GEAR };
            currentAttributes = { ...gearData.DEFAULT_ATTRIBUTES };

            // 1. Render all selector elements
            renderGearSelectors();
            
            // 2. Load any saved data from the browser (overrides initial defaults)
            loadFromLocalStorage();

            // 3. Perform the initial calculation and UI update
            calculateStats();

        } catch (e) {
            updateStatus("Error: Failed to parse JSON data. Check Template syntax.", true);
            console.error("JSON Parsing Error:", e);
        }
    }

    // Use a DOMContentLoaded listener to ensure the HTML structure is available
    // before running the app logic.
    document.addEventListener('DOMContentLoaded', function() {
        // Check if the main container is on the page before initializing
        if (document.getElementById('bellwright-planner-container')) {
            // Load external scripts (like Font Awesome and Tailwind) if they aren't loaded by Common.js
            const loadFontAwesome = () => {
                if (!document.querySelector('link[href*="font-awesome"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
                    document.head.appendChild(link);
                }
            };
            loadFontAwesome();

            // Inter font (assuming Fandom allows Google Fonts)
            const loadInterFont = () => {
                if (!document.querySelector('link[href*="Inter"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
                    document.head.appendChild(link);
                }
            };
            loadInterFont();
            
            // Wait a moment for resources to ensure the DOM is stable
            setTimeout(initApp, 100);
        }
    });

})(window, document);