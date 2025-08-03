/* Any JavaScript here will be loaded for all users on every page load. */

// MediaWiki:Common.js

// Ensure the script runs after the DOM is fully loaded
$(function() {
    const skillFiltersContainer = document.getElementById('skillFiltersContainer');
    const skillsTable = document.getElementById('skillsTable');
    const noSkillsMessage = document.getElementById('noSkillsMessage');

    if (!skillFiltersContainer || !skillsTable) {
        // If essential elements are missing, exit gracefully
        return;
    }

    const skillsTableBody = skillsTable.querySelector('tbody');

    // Helper function to format option text for display (e.g., "criticalchance" -> "Critical Chance")
    function formatOptionText(text) {
        if (!text || text === 'all') return 'All'; // Handle 'all' option
        // Convert camelCase to space-separated words, then capitalize first letter of each word
        // and handle specific cases like "icyveins" -> "Icy Veins"
        let formatted = text.replace(/([A-Z])/g, ' $1').trim(); // Add space before capital letters
        formatted = formatted.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        // Specific overrides if needed (e.g., for "icyveins" that becomes "Icy Veins" not "Icyveins")
        if (formatted.toLowerCase() === 'icyveins') {
            formatted = 'Icy Veins';
        }
        if (formatted.toLowerCase() === 'multicastchance') {
            formatted = 'Multi Cast Chance';
        }
        if (formatted.toLowerCase() === 'maximumhealth') {
            formatted = 'Maximum Health';
        }
        if (formatted.toLowerCase() === 'armorpower') {
            formatted = 'Armor Power';
        }
        if (formatted.toLowerCase() === 'blockpower') {
            formatted = 'Block Power';
        }
        if (formatted.toLowerCase() === 'movementspeed') {
            formatted = 'Movement Speed';
        }
        if (formatted.toLowerCase() === 'areamodifier') {
            formatted = 'Area Modifier';
        }
        if (formatted.toLowerCase() === 'criticalchance') {
            formatted = 'Critical Chance';
        }
        if (formatted.toLowerCase() === 'criticaldamage') {
            formatted = 'Critical Damage';
        }
        if (formatted.toLowerCase() === 'summonedunits') {
            formatted = 'Summoned Units';
        }
        if (formatted.toLowerCase() === 'enemies') {
            formatted = 'Enemies';
        }
        if (formatted.toLowerCase() === 'dotremoval') {
            formatted = 'DoT Removal';
        }
        if (formatted.toLowerCase() === 'damagepertraffic') {
            formatted = 'Damage Per Traffic';
        }

        return formatted;
    }

    // Define the filter options structure, categorized. Options will be dynamically populated.
    const filterCategories = {
        'skillTypes': {
            label: 'Skill Types',
            filters: {
                'primaryType': {
                    label: 'Primary:',
                    id: 'primaryTypeFilter',
                    dataAttr: 'data-primary-type',
                    options: new Set()
                },
                'extraType': {
                    label: 'Extra:',
                    id: 'extraTypeFilter',
                    dataAttr: 'data-extra-types',
                    options: new Set()
                },
                'damageType': {
                    label: 'Damage:',
                    id: 'damageTypeFilter',
                    dataAttr: 'data-damage-types',
                    options: new Set()
                }
            }
        },
        'application': {
            label: 'Application',
            filters: {
                'applyTag': {
                    label: 'Apply:',
                    id: 'applyTagFilter',
                    dataAttr: 'data-apply-tags',
                    options: new Set()
                },
                'gainTag': {
                    label: 'Gain:',
                    id: 'gainTagFilter',
                    dataAttr: 'data-gain-tags',
                    options: new Set()
                },
                'traitTag': {
                    label: 'Trait:',
                    id: 'traitTagFilter',
                    dataAttr: 'data-trait-tags',
                    options: new Set()
                }
            }
        },
        'scaling': {
            label: 'Scaling',
            filters: {
                'scalingAttributeTag': {
                    label: 'Attribute:',
                    id: 'scalingAttributeTagFilter',
                    dataAttr: 'data-scaling-attribute-tags',
                    options: new Set()
                },
                'scalingEffectStacksTag': {
                    label: 'Effect Stacks:',
                    id: 'scalingEffectStacksTagFilter',
                    dataAttr: 'data-scaling-effectstacks-tags',
                    options: new Set()
                },
                'scalingCountTag': {
                    label: 'Count:',
                    id: 'scalingCountTagFilter',
                    dataAttr: 'data-scaling-count-tags',
                    options: new Set()
                },
                'scalingMechanicTag': {
                    label: 'Mechanic:',
                    id: 'scalingMechanicTagFilter',
                    dataAttr: 'data-scaling-mechanic-tags',
                    options: new Set()
                }
            }
        }
    };

    const allFilterSelects = {}; // Stores references to all <select> elements

    /**
     * Collects all unique filter options from the table's data attributes.
     * This ensures filters are only shown for values present in the data.
     */
    function collectFilterOptions() {
        skillsTableBody.querySelectorAll('tr').forEach(row => {
            for (const categoryKey in filterCategories) {
                const category = filterCategories[categoryKey];
                for (const filterKey in category.filters) {
                    const filterDef = category.filters[filterKey];
                    const dataAttrValue = row.getAttribute(filterDef.dataAttr);
                    if (dataAttrValue) {
                        dataAttrValue.split(',').forEach(item => {
                            const trimmedItem = item.trim();
                            if (trimmedItem) {
                                filterDef.options.add(trimmedItem);
                            }
                        });
                    }
                }
            }
        });

        // Convert Sets to sorted Arrays for consistent display
        for (const categoryKey in filterCategories) {
            const category = filterCategories[categoryKey];
            for (const filterKey in category.filters) {
                const filterDef = category.filters[filterKey];
                filterDef.options = Array.from(filterDef.options).sort();
            }
        }
    }

    /**
     * Creates and appends the filter UI elements (labels and select dropdowns)
     * to the skillFiltersContainer, categorized into sections.
     */
    function createFilterUIs() {
        skillFiltersContainer.className = 'skill-filter-controls'; 
        skillFiltersContainer.innerHTML = ''; // Clear any existing filters

        for (const categoryKey in filterCategories) {
            const category = filterCategories[categoryKey];

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-filter-category'; 
            
            const categoryHeading = document.createElement('div');
            categoryHeading.className = 'group-label';
            categoryHeading.textContent = category.label;
            categoryDiv.appendChild(categoryHeading);

            const filtersGrid = document.createElement('div');
            filtersGrid.className = 'skill-filter-grid'; 
            categoryDiv.appendChild(filtersGrid);

            let filtersInThisCategory = 0;

            for (const filterKey in category.filters) {
                const filterDef = category.filters[filterKey];

                // Only create a filter if there are actual options to choose from (beyond 'all')
                // Primary, Extra, Damage types are always expected, even if empty in data
                const isAlwaysPresent = ['primaryType', 'extraType', 'damageType'].includes(filterKey);
                if (filterDef.options.length === 0 && !isAlwaysPresent) {
                    continue; 
                }

                const filterGroupDiv = document.createElement('div');
                filterGroupDiv.className = 'skill-filter-group'; 

                const label = document.createElement('label');
                label.setAttribute('for', filterDef.id);
                label.className = 'skill-filter-label';
                label.textContent = filterDef.label;

                const select = document.createElement('select');
                select.id = filterDef.id;
                select.className = 'skill-filter-select';

                const allOption = document.createElement('option');
                allOption.value = 'all';
                allOption.textContent = 'All';
                select.appendChild(allOption);

                // Add dynamically collected options, formatted for readability
                filterDef.options.forEach(optionText => {
                    const option = document.createElement('option');
                    option.value = optionText.toLowerCase(); // Store value as lowercase for matching
                    option.textContent = formatOptionText(optionText); // Display formatted text
                    select.appendChild(option);
                });

                filterGroupDiv.appendChild(label);
                filterGroupDiv.appendChild(select);
                filtersGrid.appendChild(filterGroupDiv);

                allFilterSelects[filterKey] = select; // Store reference to the select element
                select.addEventListener('change', applyFilters); // Attach event listener
                filtersInThisCategory++;
            }

            // Only append category div if it contains at least one filter
            if (filtersInThisCategory > 0) {
                skillFiltersContainer.appendChild(categoryDiv);
            }
        }
    }

    /**
     * Applies the selected filters to the skill table rows, showing/hiding them.
     */
    function applyFilters() {
        let visibleRowsCount = 0;

        skillsTableBody.querySelectorAll('tr').forEach(row => {
            let isVisible = true;

            for (const categoryKey in filterCategories) {
                const category = filterCategories[categoryKey];
                for (const filterKey in category.filters) {
                    const filterDef = category.filters[filterKey];
                    const selectElement = allFilterSelects[filterKey]; 
                    
                    if (!selectElement) { // Skip if filter dropdown wasn't created (no options)
                        continue; 
                    }

                    const selectedValue = selectElement.value;

                    if (selectedValue !== 'all') {
                        const rowDataAttrValue = row.getAttribute(filterDef.dataAttr);

                        if (!rowDataAttrValue || !rowDataAttrValue.includes(selectedValue)) {
                            isVisible = false;
                            break; 
                        }
                    }
                }
                if (!isVisible) { // If already hidden by a filter in this category, no need to check others
                    break;
                }
            }

            if (isVisible) {
                row.classList.remove('hidden-row');
                visibleRowsCount++;
            } else {
                row.classList.add('hidden-row');
            }
        });

        // Update the "No skills found" message based on visible rows
        if (noSkillsMessage) {
            if (visibleRowsCount === 0) {
                noSkillsMessage.classList.remove('hidden');
            } else {
                noSkillsMessage.classList.add('hidden');
            }
        }
    }

    // --- Initial Setup ---
    // 1. Collect all possible filter options from the table rows
    collectFilterOptions();
    // 2. Create the filter UI elements based on collected options
    createFilterUIs();
    // 3. Apply filters initially (to show all rows if no filters selected)
    applyFilters();
});

document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.wikitable');
    if (!table) return;

    const cells = table.querySelectorAll('th, td');
    const rows = table.querySelectorAll('tr');

    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            const rowIndex = cell.closest('tr').rowIndex;
            const colIndex = cell.cellIndex;

            // Highlight row
            rows[rowIndex].classList.add('highlight-row');

            // Highlight column
            rows.forEach(row => {
                if (row.cells[colIndex]) {
                    row.cells[colIndex].classList.add('highlight-col');
                }
            });
        });

        cell.addEventListener('mouseout', () => {
            // Remove all highlights
            rows.forEach(row => {
                row.classList.remove('highlight-row');
                Array.from(row.cells).forEach(c => c.classList.remove('highlight-col'));
            });
        });
    });
});