function initializeCalculator() {
    // Base encounter chances for Legendary, UltraBeast, and Tapu types
    var baseLegendaryChance = 200;
    var baseUltraBeastChance = 9999;
    var baseTapuChance = 500;

    // Elements for clear selection button and timeout for double-click confirmation
    var clearSelectionButton = document.getElementById("clear-selection-button");
    var clearSelectionTimeout;
    
    function flashSelectedBoosters(boosterNames) {
    boosterNames.forEach(function(name) {
        var option = document.querySelector(".multiplier-option[data-name='" + name + "']");
        if (option && option.classList.contains("selected")) {
            option.classList.add("flashRed");
        }
    });
}

    // Select all Pokémon options in the calculator
    var pokemonOptions = document.querySelectorAll(".pokemon-option");

    pokemonOptions.forEach(function(pokemonOption) {
        // Add icon if Pokémon is 'Roulette Exclusive'
        if (pokemonOption.getAttribute("data-formula") === "Roulette Exclusive") {
            var rouletteIcon = document.createElement("span");
            rouletteIcon.classList.add("roulette-icon");
            rouletteIcon.title = "Roulette Exclusive Pokémon";
            pokemonOption.appendChild(rouletteIcon);
        }

        // Add a right-side image for redirection
        var pokemonName = pokemonOption.textContent.trim();
        var redirectIcon = document.createElement("div");
        redirectIcon.classList.add("pokemon-redirect");
        redirectIcon.setAttribute("data-url", "/wiki/" + pokemonName);
        pokemonOption.appendChild(redirectIcon);

        // Add click event to redirect icon only for page redirection
        redirectIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            var url = redirectIcon.getAttribute("data-url");
            if (url) {
                window.open(url, "_blank");
            }
        });

        // Click event to activate selected Pokémon and update styles
        pokemonOption.addEventListener("click", function() {
            pokemonOptions.forEach(function(option) {
                option.classList.remove("selected");
                option.classList.remove("active");
            });
            pokemonOption.classList.add("selected");
            pokemonOption.classList.add("active");
            updateBoosterStyles(); // Function to apply styles based on selection
        });
    });

    // Manage multiplier option selections with toggle effect and flash reset
    var multiplierOptions = document.querySelectorAll(".multiplier-option");
    multiplierOptions.forEach(function(multiplierOption) {
        multiplierOption.addEventListener("click", function() {
            multiplierOption.classList.toggle("selected");
            multiplierOption.classList.remove("flashRed"); // Clear flash red effect if present
        });
    });

    // Add functionality for the Calculate button
    var calculateButton = document.getElementById("calculate-button");
    if (calculateButton) {
        calculateButton.addEventListener("click", function() {
            // Reset result and booster message display
            document.getElementById("result").textContent = "";
            document.getElementById("booster-message").textContent = "";

            // Verify a Pokémon is selected
            var selectedPokemon = document.querySelector(".pokemon-option.selected");
            if (!selectedPokemon) {
                document.getElementById("result").textContent = "Please select a Pokémon.";
                return;
            }

            // Retrieve the encounter formula from the selected Pokémon
            var formulaTemplate = selectedPokemon.getAttribute("data-formula");

            // Check for Pokémon link with a fallback to text content
            var pokemonLink = selectedPokemon.getAttribute("data-link") || selectedPokemon.textContent.trim();

            // Reset flashRed effects on all multiplier options
            multiplierOptions.forEach(function(option) {
                option.classList.remove("flashRed");
                void option.offsetWidth;
            });

            // Special case for 'Roulette Exclusive' Pokémon
            if (formulaTemplate === "Roulette Exclusive") {
                document.getElementById("result").innerHTML = pokemonLink + ' is exclusive to the <a href="/wiki/Roulette" target="_blank">Pokémon Roulette</a> and cannot be encountered in the wild.';
                multiplierOptions.forEach(function(option) {
                    if (option.classList.contains("selected")) {
                        option.classList.add("flashRed"); // Flash for incompatible multipliers
                    }
                });
                return;
            }

            // Determine Pokémon type for appropriate calculation and booster exclusions
            var isUltraBeast = formulaTemplate.includes("UltraBeastChance");
            var isLegendary = formulaTemplate.includes("LegendaryChance");
            var isTapu = formulaTemplate.includes("TapuChance");
            var isSwarms = formulaTemplate.includes("Swarms");
            var isnil = formulaTemplate.includes("-") || formulaTemplate.includes("—") || formulaTemplate.includes("nil");
            var isQuestExclusive = formulaTemplate.includes("Quest Exclusive");

            // Set up base and adjusted chances
            var adjustedLegendaryChance = baseLegendaryChance;
            var adjustedTapuChance = baseTapuChance;

            // Determine which boosters are selected
            var isLegendaryPokeboosterSelected = document.querySelector(".multiplier-option[data-name='Legendary Pokébooster']").classList.contains("selected");
            var isTapuPokeboosterSelected = document.querySelector(".multiplier-option[data-name='Tapu Pokébooster']").classList.contains("selected");
            var isGamepassSelected = document.querySelector(".multiplier-option[data-name='Gamepass']").classList.contains("selected");
            var isUltraBeastGamepassSelected = document.querySelector(".multiplier-option[data-name='UltraBeastGamepass']").classList.contains("selected");

            var message = ""; // Message for incompatible boosters or information

            // Apply flashRed effect for incompatible boosters based on Pokémon type
            if (isLegendary) {
                flashSelectedBoosters(["Tapu Pokébooster", "UltraBeastGamepass"]);
            } else if (isUltraBeast) {
                    flashSelectedBoosters(["Legendary Pokébooster", "Tapu Pokébooster", "Gamepass"]);
            } else if (isTapu) {
                    flashSelectedBoosters(["Legendary Pokébooster", "Gamepass", "UltraBeastGamepass"]);
            } else if (isSwarms) {
                flashSelectedBoosters(["Legendary Pokébooster", "Tapu Pokébooster", "Gamepass", "UltraBeastGamepass"]);
            } else if (isQuestExclusive) {
                flashSelectedBoosters(["Legendary Pokébooster", "Tapu Pokébooster", "Gamepass", "UltraBeastGamepass"]);
            } else if (formulaTemplate.includes("/")) {
                flashSelectedBoosters(["Tapu Pokébooster", "UltraBeastGamepass"]);
                multiplierOptions.forEach(function(option) {
                    if (option.classList.contains("selected")) {
                        option.classList.add("flashRed");
                    }
                });
            }

            // Static encounter: special message and fixed chance
            if (formulaTemplate === "Static Encounter") {
                multiplierOptions.forEach(function(option) {
                    if (option.classList.contains("selected")) {
                        option.classList.add("flashRed");
                    }
                });
                message = "*" + pokemonLink + " is a static encounter and is not affected by any boosts.<br>Please refer to its <a href=\"/wiki/" + pokemonLink + "\" target=\"_blank\">respective page</a> to learn more about its obtainment method.";
                document.getElementById("result").textContent = "Encounter chance: 1/1 (100%)*";
            } else if (formulaTemplate.includes("-") || formulaTemplate.includes("—") || formulaTemplate.includes("nil")) {
                multiplierOptions.forEach(function(option) {
                    if (option.classList.contains("selected")) {
                        option.classList.add("flashRed");
                    }
                });
                message = "*" + pokemonLink + " is non-encounterable or only available through evolution.<br>Please refer to its <a href=\"/wiki/" + pokemonLink + "\" target=\"_blank\">respective page</a> to learn more about its obtainment method.";
                document.getElementById("result").textContent = "Encounter chance: nil (nil%)*";
            } else if (isLegendary) {
                // Adjust legendary chance based on boosters
                if (isLegendaryPokeboosterSelected && isGamepassSelected) {
                    adjustedLegendaryChance = 25;
                } else if (isLegendaryPokeboosterSelected) {
                    adjustedLegendaryChance = 100;
                } else if (isGamepassSelected) {
                    adjustedLegendaryChance = 50;
                }
                    var multiplierValue = 1;
                    var addValue = 0;

                    if (formulaTemplate.includes("*")) {
                        multiplierValue = parseFloat(formulaTemplate.split("*")[1].split("+")[0].trim());
                    }

                    if (formulaTemplate.includes("+")) {
                        addValue = parseFloat(formulaTemplate.split("+")[1].trim());
                    }

                    try {
                        // Apply formula based on detected multiplier and addition values
                        var multipliedChance = Math.round(adjustedLegendaryChance * multiplierValue);
                        var finalChance = multipliedChance + addValue;

                        var encounterFraction = finalChance;
                        var encounterPercentage = Math.round((1 / finalChance) * 10000) / 100;

                        document.getElementById("result").textContent =
                            "Encounter chance: 1/" + encounterFraction + " (" + encounterPercentage + "%)";
                    } catch (error) { document.getElementById("result").textContent = "Calculation error."; }

                // Set message for incompatible booster combinations
                flashSelectedBoosters(["Tapu Pokébooster", "UltraBeastGamepass"]);
                message = getIncompatibleBoosterMessage(true, false, false);
            } else if (isUltraBeast) {
                // Handle Ultra Beast encounter chance adjustments and incompatible messages
                var adjustedUltraBeastChance = baseUltraBeastChance;

                if (isUltraBeastGamepassSelected) {
                    adjustedUltraBeastChance = 2000;
                }

                try {
                    var ultraBeastEncounterFraction = adjustedUltraBeastChance;
                    var ultraBeastEncounterPercentage = Math.round((1 / adjustedUltraBeastChance) * 10000) / 100;
                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + ultraBeastEncounterFraction + " (" + ultraBeastEncounterPercentage + "%)";

                // Generate a message listing any selected boosters that don't affect this Pokémon,
                // and format it to use "boost" or "boosts" as appropriate based on the number of boosters.
                flashSelectedBoosters(["Legendary Pokébooster", "Tapu Pokébooster", "Gamepass"]);
                message = getIncompatibleBoosterMessage(false, false, true);
                } catch (error) { document.getElementById("result").textContent = "Calculation error."; }
            } else if (isTapu) {
                // Handle Tapu encounter chance adjustments and incompatible messages
                if (isTapuPokeboosterSelected) {
                    adjustedTapuChance = 250;
                }

                try {
                    var tapuEncounterFraction = adjustedTapuChance;
                    var tapuEncounterPercentage = Math.round((1 / adjustedTapuChance) * 10000) / 100;

                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + tapuEncounterFraction + " (" + tapuEncounterPercentage + "%)";

                    
                    flashSelectedBoosters(["Legendary Pokébooster", "Gamepass", "UltraBeastGamepass"]);
                    message = getIncompatibleBoosterMessage(false, true, false);
                } catch (error) { document.getElementById("result").textContent = "Calculation error."; }
            } else if (isnil) {
            	
                try {
                document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';

                if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                    message = "" + pokemonLink + " isn't affected by any boosters.";
                }
                } catch (error) { document.getElementById("result").textContent = "Calculation error."; }
            } else if (isSwarms) {
            	
                try {
                document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';

                if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                    message = "" + pokemonLink + " isn't affected by any boosters.";
                }
                } catch (error) { document.getElementById("result").textContent = "Calculation error."; }
            } else if (isQuestExclusive) {
            	
                try {
                document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';

                if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                    message = "" + pokemonLink + " isn't affected by any boosters.<br>Please refer to its <a href=\"/wiki/" + pokemonLink + "\" target=\"_blank\">respective page</a> to learn more about its obtainment method.";
                }
                } catch (error) { document.getElementById("result").textContent = "Calculation error."; }
            } else if (formulaTemplate.includes("/")) {
                // Handle direct encounter chance formulas with divisions
                var parts = formulaTemplate.split('/');
                var numerator = parseFloat(parts[0]);
                var denominator = parseFloat(parts[1]);

                if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                    var directEncounterFraction = denominator;
                    var directEncounterPercentage = Math.round((numerator / denominator) * 10000) / 100;
                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + directEncounterFraction + " (" + directEncounterPercentage + "%)";

                if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                    message = "" + pokemonLink + " isn't affected by any boosters.";
                }
                } else {
                    document.getElementById("result").textContent = "Invalid formula format.";
                }
            }

            // Display booster messages, availability info, and custom messages for selection
            var boosterMessageContainer = document.getElementById("booster-message");
            var availability = selectedPokemon.getAttribute("data-time");
            var timeMessage = "";
            if (availability === "night") {
                timeMessage = "" + pokemonLink + " is only available during the night.";
            } else if (availability === "day") {
                timeMessage = "" + pokemonLink + " is only available during the day.";
            } else if (availability === "both") {
                timeMessage = "" + pokemonLink + " is available anytime.";
            }

            var customMessage = selectedPokemon.getAttribute("data-message");

            if (message || timeMessage || customMessage) {
                boosterMessageContainer.innerHTML = '<div style="width: 75%; height: 1px; background: rgba(200, 200, 200, 0.5); margin: 10px auto;"></div>';
            }
            if (message) {
                typeText(message, boosterMessageContainer);
            }
            if (timeMessage) {
                typeText('<div style="text-align: center; color: #ccc; font-size: 0.9em; font-style: italic; margin-top: 5px;">' + timeMessage + '</div>', boosterMessageContainer);
            }
            if (customMessage) {
                typeText('<div style="text-align: center; color: #ccc; font-size: 0.9em; font-style: italic; margin-top: 5px;">' + customMessage + '</div>', boosterMessageContainer);
            }

// Function to generate the message based on unaffected boosters
function getIncompatibleBoosterMessage(isLegendary, isTapu, isUltraBeast) {
    var unaffectedBoosters = []; // Store names of unaffected boosters

    // Add incompatible boosters based on Pokémon type
    if (isLegendary) {
        if (isTapuPokeboosterSelected) unaffectedBoosters.push("Tapu Pokébooster (x2)");
        if (isUltraBeastGamepassSelected) unaffectedBoosters.push("Ultra Beast Gamepass (x5)");
    }
    if (isTapu) {
        if (isLegendaryPokeboosterSelected) unaffectedBoosters.push("Legendary Pokébooster (x2)");
        if (isGamepassSelected) unaffectedBoosters.push("Gamepass (x4)");
        if (isUltraBeastGamepassSelected) unaffectedBoosters.push("Ultra Beast Gamepass (x5)");
    }
    if (isUltraBeast) {
        if (isLegendaryPokeboosterSelected) unaffectedBoosters.push("Legendary Pokébooster (x2)");
        if (isTapuPokeboosterSelected) unaffectedBoosters.push("Tapu Pokébooster (x2)");
        if (isGamepassSelected) unaffectedBoosters.push("Gamepass (x4)");
    }

    // Construct the message based on the number of unaffected boosters
    if (unaffectedBoosters.length === 0) {
        return ""; // No unaffected boosters, no message needed
    } else if (unaffectedBoosters.length === 1) {
        return "" + pokemonLink + " isn't affected by the " + unaffectedBoosters[0] + " boost.";
    } else if (unaffectedBoosters.length === 2) {
        return "" + pokemonLink + " isn't affected by the " + unaffectedBoosters.join(" or ") + " boosts.";
    } else {
        // For exactly 3 unaffected boosters, add commas and "or" before the last item
        return "" + pokemonLink + " isn't affected by the " + unaffectedBoosters.slice(0, -1).join(", ") + ", or " + unaffectedBoosters[unaffectedBoosters.length - 1] + " boosts.";
    }
}
        });
    }

    // Clear Selection button event handling, including double-click confirmation
    clearSelectionButton.addEventListener("click", function () {
        if (clearSelectionButton.textContent === "Are you sure?") {
            // Clear all selected Pokémon, multipliers, and reset messages
            document.querySelectorAll(".pokemon-option").forEach(function (option) {
                option.classList.remove("selected", "active");
            });
            document.querySelectorAll(".multiplier-option").forEach(function (option) {
                option.classList.remove("selected", "flashRed");
            });
            document.getElementById("result").textContent = "";
            document.getElementById("booster-message").textContent = "";
            clearSelectionButton.textContent = "Clear Selection";
            clearSelectionButton.classList.remove("active");
            clearSelectionButton.offsetWidth; // Force reflow to reset animations
            clearTimeout(clearSelectionTimeout);
        } else {
            // Prompt user for double-click confirmation to clear
            clearSelectionButton.textContent = "Are you sure?";
            clearSelectionButton.classList.add("active");
            clearSelectionTimeout = setTimeout(function () {
                clearSelectionButton.textContent = "Clear Selection";
                clearSelectionButton.classList.remove("active");
                clearSelectionButton.offsetWidth; // Force reflow to reset animations
            }, 3000); // Timeout resets prompt after 3 seconds
        }
    });

    // Function to "type" text into an element with click-to-skip functionality
    function typeText(text, element) {
    var container = document.createElement("div");
    container.innerHTML = ""; // Clear previous text
    element.appendChild(container);

    var i = 0;
    var typingInProgress = true;
    var textLength = text.length;
    
    function typeNextChar() {
        if (i < textLength && typingInProgress) {
            var nextChar = text.charAt(i);
            container.insertAdjacentHTML("beforeend", nextChar); // Add next character directly
            
            i++;
            setTimeout(typeNextChar, 20); // Control speed here
        } else {
            typingInProgress = false;
            container.innerHTML = text; // Ensure the entire text is displayed at the end
        }
    }

    typeNextChar();

    // Click event to skip typing and display full text immediately
    container.addEventListener("click", function() {
        if (typingInProgress) {
            typingInProgress = false;
            container.innerHTML = text; // Display full text immediately
        }
    });

    // Add "Click to skip" indicator
    var skipIndicator = document.createElement("div");
    skipIndicator.classList.add("skip-text");
    skipIndicator.innerText = "Click text to skip";
    element.appendChild(skipIndicator);
}

    // Create the search input element and set attributes
    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "pokemon-search";
    searchInput.setAttribute("placeholder", "Search Pokémon...");
    searchInput.setAttribute("autocomplete", "off");

    // Create the clear button element and set attributes
    var clearButton = document.createElement("span");
    clearButton.id = "clear-search";
    clearButton.innerHTML = "&#x2716;"; // Unicode for "X"
    clearButton.style.display = "none"; // Hidden by default

    // Insert the search input and clear button into the container
    var calculatorContainer = document.querySelector(".legendary-calculator");
    var heading = calculatorContainer.querySelector("h3");
    var searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    calculatorContainer.insertBefore(searchContainer, heading.nextSibling);

    // Add event listener to show/hide clear button based on input value
    searchInput.addEventListener("input", function() {
    var searchTerm = searchInput.value.toLowerCase();
    clearButton.style.display = searchTerm ? "inline" : "none"; // Show "X" if input is not empty

    var pokemonOptions = document.querySelectorAll(".pokemon-option");

    // Loop through all Pokémon options and show/hide based on search term
    pokemonOptions.forEach(function(option) {
        var pokemonName = option.textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            option.style.display = ""; // Show matching items
        } else {
            option.style.display = "none"; // Hide non-matching items
        }
    });
});

// Add click event to clear button to reset input and hide button
clearButton.addEventListener("click", function() {
    searchInput.value = "";
    clearButton.style.display = "none";
    
    // Reset Pokémon options display
    var pokemonOptions = document.querySelectorAll(".pokemon-option");
    pokemonOptions.forEach(function(option) {
        option.style.display = "";
    });
  });
  
    // Array to hold selected filter terms, excluding A-Z and Z-A
    var selectedFilters = [];
    var selectedSortingFilter = null; // Variable to track the selected sorting filter (either "A-Z" or "Z-A")

    // CSS class name to style the filter menu and button
    var filterButtonContainer = document.createElement("div");
    filterButtonContainer.className = "filter-button-container";

    // Filter button to open the filter menu
    var filterButton = document.createElement("div");
    filterButton.className = "filter-button";
    filterButton.innerHTML = "Filter &#x25BC;";
    filterButton.onclick = toggleFilterMenu;
    filterButtonContainer.appendChild(filterButton);

    // Filter menu container (dropdown)
    var filterMenu = document.createElement("div");
    filterMenu.className = "filter-menu";
    filterMenu.style.display = "none";

    // Create the filter options container
    var filterOptionsContainer = document.createElement("div");
    filterOptionsContainer.className = "filter-options";
    document.querySelectorAll(".filter-option").forEach(function(option) {
    filterOptionsContainer.appendChild(option);
    option.style.display = "block";
});
    filterMenu.appendChild(filterOptionsContainer);

    // Apply and Reset buttons
    var applyButton = document.createElement("div");
    applyButton.className = "apply-filters disabled";
    applyButton.textContent = "Apply";
    applyButton.onclick = applyFilters;
    filterMenu.appendChild(applyButton);

    var resetButton = document.createElement("div");
    resetButton.className = "reset-filters disabled";
    resetButton.textContent = "Reset";
    resetButton.onclick = resetFilters;
    filterMenu.appendChild(resetButton);

    filterButtonContainer.appendChild(filterMenu);
    document.querySelector(".search-container").appendChild(filterButtonContainer);

// Toggle filter menu visibility and apply fade-in effect when opening
function toggleFilterMenu() {
    if (filterMenu.style.display === "none") {
        filterMenu.style.display = "block";

        // Sequentially fade in each filter option when menu is opened
        var filterOptions = filterOptionsContainer.querySelectorAll(".filter-option");
        filterOptions.forEach(function(option, index) {
            option.classList.remove("fade-in");
            setTimeout(function() {
                option.classList.add("fade-in"); // Adds the fade-in class with delay
            }, index * 100);
        });
    } else {
        filterMenu.style.display = "none";
    }
  }

// Toggle filter option selection with exclusivity for A-Z and Z-A
function toggleFilterOption(element) {
    var filterName = element.getAttribute("data-filter");
    if (filterName === "A-Z" || filterName === "Z-A") {
        handleSortingFilter(element, filterName);
    } else {
        handleRegularFilter(element, filterName);
    }
    applyButton.classList.toggle("disabled", selectedFilters.length === 0 && !selectedSortingFilter);
}

// Handle A-Z and Z-A sorting filters with exclusivity
function handleSortingFilter(element, filterName) {
    if (selectedSortingFilter === filterName) {
        element.classList.remove("selected");
        selectedSortingFilter = null;
    } else {
        // Deselect previously selected sorting filter, if any
        if (selectedSortingFilter) {
            var previousSortingElement = document.querySelector('.filter-option[data-filter="' + selectedSortingFilter + '"]');
            if (previousSortingElement) {
                previousSortingElement.classList.remove("selected");
            }
        }
        element.classList.add("selected");
        selectedSortingFilter = filterName;
    }
}

// Handle regular filters (non-sorting)
function handleRegularFilter(element, filterName) {
    var filterIndex = selectedFilters.indexOf(filterName);
    if (filterIndex !== -1) {
        selectedFilters.splice(filterIndex, 1);
        element.classList.remove("selected");
    } else {
        selectedFilters.push(filterName);
        element.classList.add("selected");
    }
}

// Apply filters and sorting to the Pokémon options
function applyFilters() {
    var pokemonContainer = document.querySelector(".pokemon-checkboxes");
    var pokemonOptions = Array.from(document.querySelectorAll(".pokemon-option"));
    var filteredOptions = [];

    // Filter options based on selected filters
    if (selectedFilters.length > 0) {
        pokemonOptions.forEach(function(option) {
            var isMatch = false;
            var filterTerm = option.querySelector(".pokemon-image") ? option.querySelector(".pokemon-image").getAttribute("data-filterterm") : null;

            if (selectedFilters.includes(filterTerm)) isMatch = true;
            if (selectedFilters.includes("Static Encounters") && option.getAttribute("data-formula") === "Static Encounter") isMatch = true;
            if (selectedFilters.includes("Static Chances")) {
                var formula = option.getAttribute("data-formula");
                if (formula && /^1\/\d+$/.test(formula)) isMatch = true;
            }
            if (selectedFilters.includes("Roulette Exclusives") && option.getAttribute("data-formula") === "Roulette Exclusive") isMatch = true;
            if (selectedFilters.includes("Ultra Beast") && option.getAttribute("data-formula") === "1/UltraBeastChance") {
                isMatch = true;
            }

            if (isMatch) filteredOptions.push(option);
        });
    } else {
        filteredOptions = pokemonOptions;
    }

    // Apply sorting: A-Z by default if no sorting selected, or as selected
    if (selectedSortingFilter === "A-Z" || (!selectedSortingFilter && selectedFilters.length > 0)) {
        filteredOptions.sort(function(a, b) {
            return a.textContent.trim().localeCompare(b.textContent.trim());
        });
    } else if (selectedSortingFilter === "Z-A") {
        filteredOptions.sort(function(a, b) {
            return b.textContent.trim().localeCompare(a.textContent.trim());
        });
    }

    // Show filtered options
    pokemonOptions.forEach(function(option) {
        option.style.display = filteredOptions.includes(option) ? "" : "none";
    });

    // Append sorted options back to the container
    filteredOptions.forEach(function(option) {
        pokemonContainer.appendChild(option);
    });

    resetButton.classList.remove("disabled");
    applyButton.classList.add("disabled");
}

// Reset only filters
function resetOnlyFilters() {
    selectedFilters = [];
    
    // Clear selected styling on filter options
    filterOptionsContainer.querySelectorAll(".filter-option").forEach(function(option) {
        option.classList.remove("selected");
    });

    // Ensure only the Reset Filters button state is updated
    applyButton.classList.add("disabled");
    filterResetButton.classList.add("disabled");
}

// Reset filters and show all Pokémon options
function resetFilters() {
    // Clear selected filters and sorting filter
    selectedFilters = [];
    selectedSortingFilter = null;

    // Get all Pokémon options and sort them alphabetically by default
    var pokemonOptions = Array.from(document.querySelectorAll(".pokemon-option"));
    pokemonOptions.sort(function(a, b) {
        return a.textContent.trim().localeCompare(b.textContent.trim());
    });

    // Display all Pokémon options sorted from A-Z
    pokemonOptions.forEach(function(option) {
        option.style.display = ""; // Show all items
        document.querySelector(".pokemon-checkboxes").appendChild(option); // Append to keep sorted order
    });

    // Clear selected styling on filter options
    var filterOptions = filterMenu.querySelectorAll(".filter-option");
    filterOptions.forEach(function(option) {
        option.classList.remove("selected"); // Clear selected styling
    });

    // Disable Reset and Apply buttons
    resetButton.classList.add("disabled");
    applyButton.classList.add("disabled");
}

// Event listener for each filter option
filterOptionsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("filter-option")) {
        toggleFilterOption(event.target);
    }
});
}
// Check if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to show a message if on mobile
function checkDeviceForSearchFeature() {
    if (isMobileDevice()) {
        alert("The search feature is only available on desktop.");
        // Optionally, hide or disable the search input if desired
        searchInput.style.display = "none";
    }
}

// Run the device check first
checkDeviceForSearchFeature();
// Initialize calculator function on page load
mw.hook('wikipage.content').add(initializeCalculator);