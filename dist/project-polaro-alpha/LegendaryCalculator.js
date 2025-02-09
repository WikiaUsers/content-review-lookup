function initializeCalculator() {
    // Base encounter chances for Legendary, UltraBeast, and Tapu types
    var baseLegendaryChance = 200;
    var baseUltraBeastChance = 9999;
    var baseTapuChance = 500;

    // Elements for clear selection button and timeout for double-click confirmation
    var clearSelectionButton = document.getElementById("clear-selection-button");
    var clearSelectionTimeout;

    var calculatorContainer = document.querySelector(".legendary-calculator");
    var historyContainer = document.createElement("div");
    historyContainer.id = "calculation-history";
    historyContainer.style.marginTop = "20px";
    historyContainer.style.borderTop = "1px solid #ccc";
    historyContainer.style.paddingTop = "10px";
    calculatorContainer.appendChild(historyContainer);

    var calculationHistory = [];

    function addHistoryEntry() {
        var timeStamp = new Date().toLocaleTimeString();
        var selectedPokemon = document.querySelector(".pokemon-option.selected");
        var pokemonName = selectedPokemon ? selectedPokemon.textContent.trim() : "None";
        var resultText = document.getElementById("result").textContent || "";
        var appliedBoosters = [];
        document.querySelectorAll(".multiplier-option").forEach(function(option) {
            if (option.classList.contains("selected")) {
                appliedBoosters.push(option.getAttribute("data-name"));
            }
        });
        var boostersText = appliedBoosters.length ? appliedBoosters.join(", ") : "None";
        var entryHTML = "<div class='history-entry'>" +
	    "<div>[" + timeStamp + "] " + 
	    "<a href=\"https://project-polaro-alpha.fandom.com/wiki/" + pokemonName + "\">" + 
	    pokemonName + "</a></div>" +
	    "<div style='margin-left:7.9%;'>Encounter Chance: " + resultText + "</div>" +
	    "<div style='margin-left:7.9%;'>Applied Boosters: " + boostersText + "</div>" +
	    "</div>";
        calculationHistory.unshift(entryHTML);
        // Limit history to the 5 most recent entries
        if (calculationHistory.length > 5) {
            calculationHistory.pop();
        }
        // Update the history container’s content, adding a title after the first calculation
        if (calculationHistory.length > 0) {
            historyContainer.innerHTML = "<h4>Calculation History</h4>" + calculationHistory.join("");
        } else {
            historyContainer.innerHTML = "";
        }
    }
    // Function that reads the current configuration and returns a sharable URL
    function generateShareUrl() {
        var params = new URLSearchParams();
        var selectedPokemon = document.querySelector(".pokemon-option.selected");
        if (selectedPokemon) {
            var pokemonName = selectedPokemon.textContent.trim();
            params.set("pokemon", pokemonName);
        }
        var selectedBoosters = [];
        document.querySelectorAll(".multiplier-option").forEach(function(option) {
            if (option.classList.contains("selected")) {
                var boosterName = option.getAttribute("data-name");
                selectedBoosters.push(boosterName);
            }
        });
        if (selectedBoosters.length > 0) {
            params.set("boosters", selectedBoosters.join(","));
        }
        var baseUrl = window.location.origin + window.location.pathname;
        return baseUrl + "?" + params.toString();
    }

    // Function to update the browser’s URL (without reloading) with the current configuration
    function updateShareUrl() {
        var shareUrl = generateShareUrl();
        window.history.replaceState(null, "", shareUrl);
    }

    // Create and insert the "Copy URL" share button next to the Calculate button
    var calculateButton = document.getElementById("calculate-button");
    var shareButton = document.createElement("button");
    shareButton.id = "share-button";
    shareButton.textContent = "Copy URL";
    shareButton.style.marginLeft = "10px";
    calculateButton.parentNode.insertBefore(shareButton, calculateButton.nextSibling);

    // When the share button is clicked, copy the generated URL to the clipboard
    shareButton.addEventListener("click", function () {
        var shareUrl = generateShareUrl();
        navigator.clipboard.writeText(shareUrl).then(function () {
            shareButton.textContent = "Copied!";
            setTimeout(function () {
                shareButton.textContent = "Copy URL";
            }, 2000);
        });
    });

    // Function to flash selected boosters (used later)
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
                option.classList.remove("selected", "active");
            });
            pokemonOption.classList.add("selected", "active");
        });
    });

    // Manage multiplier option selections with toggle effect and flash reset
    var multiplierOptions = document.querySelectorAll(".multiplier-option");
    multiplierOptions.forEach(function(multiplierOption) {
        multiplierOption.addEventListener("click", function() {
            multiplierOption.classList.toggle("selected");
            multiplierOption.classList.remove("flashRed");
        });
    });

    // Modify the Calculate button’s event handler so that after each calculation the
    // current configuration is saved to the URL and logged in the history.
    calculateButton.addEventListener("click", function() {
        // Verify a Pokémon is selected
        var selectedPokemon = document.querySelector(".pokemon-option.selected");
        if (!selectedPokemon) {
            document.getElementById("result").textContent = "Please select a Pokémon.";
            return;
        }
        // Use try...finally so that even if an early return occurs in a branch,
        // the history and URL are updated.
        try {
            // Reset result and booster message display
            document.getElementById("result").textContent = "";
            document.getElementById("booster-message").textContent = "";

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
                        option.classList.add("flashRed");
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

            var message = "";

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
                    var multipliedChance = Math.round(adjustedLegendaryChance * multiplierValue);
                    var finalChance = multipliedChance + addValue;
                    var encounterFraction = finalChance;
                    var encounterPercentage = Math.round((1 / finalChance) * 10000) / 100;

                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + encounterFraction + " (" + encounterPercentage + "%)";
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }

                flashSelectedBoosters(["Tapu Pokébooster", "UltraBeastGamepass"]);
                message = getIncompatibleBoosterMessage(true, false, false);
            } else if (isUltraBeast) {
                var adjustedUltraBeastChance = baseUltraBeastChance;
                if (isUltraBeastGamepassSelected) {
                    adjustedUltraBeastChance = 2000;
                }

                try {
                    var ultraBeastEncounterFraction = adjustedUltraBeastChance;
                    var ultraBeastEncounterPercentage = Math.round((1 / adjustedUltraBeastChance) * 10000) / 100;
                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + ultraBeastEncounterFraction + " (" + ultraBeastEncounterPercentage + "%)";

                    flashSelectedBoosters(["Legendary Pokébooster", "Tapu Pokébooster", "Gamepass"]);
                    message = getIncompatibleBoosterMessage(false, false, true);
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }
            } else if (isTapu) {
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
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }
            } else if (isnil) {
                try {
                    document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';
                    if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                        message = pokemonLink + " isn't affected by any boosters.";
                    }
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }
            } else if (isSwarms) {
                try {
                    document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';
                    if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                        message = pokemonLink + " isn't affected by any boosters.";
                    }
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }
            } else if (isQuestExclusive) {
                try {
                    document.getElementById("result").innerHTML = 'Encounter chance: nil (nil%)';
                    if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                        message = pokemonLink + " isn't affected by any boosters.<br>Please refer to its <a href=\"/wiki/" + pokemonLink + "\" target=\"_blank\">respective page</a> to learn more about its obtainment method.";
                    }
                } catch (error) { 
                    document.getElementById("result").textContent = "Calculation error."; 
                }
            } else if (formulaTemplate.includes("/")) {
                var parts = formulaTemplate.split('/');
                var numerator = parseFloat(parts[0]);
                var denominator = parseFloat(parts[1]);

                if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                    var directEncounterFraction = denominator;
                    var directEncounterPercentage = Math.round((numerator / denominator) * 10000) / 100;
                    document.getElementById("result").textContent =
                        "Encounter chance: 1/" + directEncounterFraction + " (" + directEncounterPercentage + "%)";

                    if (isLegendaryPokeboosterSelected || isTapuPokeboosterSelected || isGamepassSelected || isUltraBeastGamepassSelected) {
                        message = pokemonLink + " isn't affected by any boosters.";
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
                timeMessage = pokemonLink + " is only available during the night.";
            } else if (availability === "day") {
                timeMessage = pokemonLink + " is only available during the day.";
            } else if (availability === "both") {
                timeMessage = pokemonLink + " is available anytime.";
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
                var unaffectedBoosters = [];
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

                if (unaffectedBoosters.length === 0) {
                    return "";
                } else if (unaffectedBoosters.length === 1) {
                    return pokemonLink + " isn't affected by the " + unaffectedBoosters[0] + " boost.";
                } else if (unaffectedBoosters.length === 2) {
                    return pokemonLink + " isn't affected by the " + unaffectedBoosters.join(" or ") + " boosts.";
                } else {
                    return pokemonLink + " isn't affected by the " + unaffectedBoosters.slice(0, -1).join(", ") + ", or " + unaffectedBoosters[unaffectedBoosters.length - 1] + " boosts.";
                }
            }
        } finally {
            addHistoryEntry();
            updateShareUrl();
        }
    });

    // Clear Selection button event handling
    clearSelectionButton.addEventListener("click", function () {
        if (clearSelectionButton.textContent === "Are you sure?") {
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
            clearSelectionButton.offsetWidth;
            clearTimeout(clearSelectionTimeout);
        } else {
            clearSelectionButton.textContent = "Are you sure?";
            clearSelectionButton.classList.add("active");
            clearSelectionTimeout = setTimeout(function () {
                clearSelectionButton.textContent = "Clear Selection";
                clearSelectionButton.classList.remove("active");
                clearSelectionButton.offsetWidth;
            }, 3000);
        }
    });

    // Function to "type" text into an element with click-to-skip functionality
    function typeText(text, element) {
        var container = document.createElement("div");
        container.innerHTML = "";
        element.appendChild(container);

        var i = 0;
        var typingInProgress = true;
        var textLength = text.length;
    
        function typeNextChar() {
            if (i < textLength && typingInProgress) {
                var nextChar = text.charAt(i);
                container.insertAdjacentHTML("beforeend", nextChar);
                i++;
                setTimeout(typeNextChar, 20);
            } else {
                typingInProgress = false;
                container.innerHTML = text;
            }
        }

        typeNextChar();

        container.addEventListener("click", function() {
            if (typingInProgress) {
                typingInProgress = false;
                container.innerHTML = text;
            }
        });

        var skipIndicator = document.createElement("div");
        skipIndicator.classList.add("skip-text");
        skipIndicator.innerText = "Click text to skip";
        element.appendChild(skipIndicator);
    }

    // Create the search input element
    var searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "pokemon-search";
    searchInput.setAttribute("placeholder", "Search Pokémon...");
    searchInput.setAttribute("autocomplete", "off");

    // Create the clear button element
    var clearButton = document.createElement("span");
    clearButton.id = "clear-search";
    clearButton.innerHTML = "&#x2716;";
    clearButton.style.display = "none";

    // Insert the search input and clear button into a custom container
    var heading = calculatorContainer.querySelector("h3");
    var pokemonSearch = document.createElement("div");
    pokemonSearch.className = "pokemon-search";
    pokemonSearch.appendChild(searchInput);
    pokemonSearch.appendChild(clearButton);
    calculatorContainer.insertBefore(pokemonSearch, heading.nextSibling);

    // Event listener for search input
    searchInput.addEventListener("input", function() {
        var searchTerm = searchInput.value.toLowerCase();
        clearButton.style.display = searchTerm ? "inline" : "none";
        var pokemonOptions = document.querySelectorAll(".pokemon-option");
        pokemonOptions.forEach(function(option) {
            var pokemonName = option.textContent.toLowerCase();
            option.style.display = pokemonName.includes(searchTerm) ? "" : "none";
        });
    });

    // Event listener for clear button
    clearButton.addEventListener("click", function() {
        searchInput.value = "";
        clearButton.style.display = "none";
        var pokemonOptions = document.querySelectorAll(".pokemon-option");
        pokemonOptions.forEach(function(option) {
            option.style.display = "";
        });
    });
  
    // Filtering
    var selectedFilters = [];
    var selectedSortingFilter = null;

    var filterButtonContainer = document.createElement("div");
    filterButtonContainer.className = "filter-button-container";

    var filterButton = document.createElement("div");
    filterButton.className = "filter-button";
    filterButton.innerHTML = "Filter &#x25BC;";
    filterButton.onclick = toggleFilterMenu;
    filterButtonContainer.appendChild(filterButton);

    var filterMenu = document.createElement("div");
    filterMenu.className = "filter-menu";
    filterMenu.style.display = "none";

    var filterOptionsContainer = document.createElement("div");
    filterOptionsContainer.className = "filter-options";
    document.querySelectorAll(".filter-option").forEach(function(option) {
        filterOptionsContainer.appendChild(option);
        option.style.display = "block";
    });
    filterMenu.appendChild(filterOptionsContainer);

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
    document.querySelector(".pokemon-search").appendChild(filterButtonContainer);

    function toggleFilterMenu() {
        if (filterMenu.style.display === "none") {
            filterMenu.style.display = "block";
            var filterOptions = filterOptionsContainer.querySelectorAll(".filter-option");
            filterOptions.forEach(function(option, index) {
                option.classList.remove("fade-in");
                setTimeout(function() {
                    option.classList.add("fade-in");
                }, index * 100);
            });
        } else {
            filterMenu.style.display = "none";
        }
    }

    function toggleFilterOption(element) {
        var filterName = element.getAttribute("data-filter");
        if (filterName === "A-Z" || filterName === "Z-A") {
            handleSortingFilter(element, filterName);
        } else {
            handleRegularFilter(element, filterName);
        }
        applyButton.classList.toggle("disabled", selectedFilters.length === 0 && !selectedSortingFilter);
    }

    function handleSortingFilter(element, filterName) {
        if (selectedSortingFilter === filterName) {
            element.classList.remove("selected");
            selectedSortingFilter = null;
        } else {
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

    function applyFilters() {
        var pokemonContainer = document.querySelector(".pokemon-checkboxes");
        var pokemonOptions = Array.from(document.querySelectorAll(".pokemon-option"));
        var filteredOptions = [];

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
                if (selectedFilters.includes("Ultra Beast") && option.getAttribute("data-formula") === "1/UltraBeastChance") isMatch = true;
                if (isMatch) filteredOptions.push(option);
            });
        } else {
            filteredOptions = pokemonOptions;
        }

        if (selectedSortingFilter === "A-Z" || (!selectedSortingFilter && selectedFilters.length > 0)) {
            filteredOptions.sort(function(a, b) {
                return a.textContent.trim().localeCompare(b.textContent.trim());
            });
        } else if (selectedSortingFilter === "Z-A") {
            filteredOptions.sort(function(a, b) {
                return b.textContent.trim().localeCompare(a.textContent.trim());
            });
        }

        pokemonOptions.forEach(function(option) {
            option.style.display = filteredOptions.includes(option) ? "" : "none";
        });

        filteredOptions.forEach(function(option) {
            pokemonContainer.appendChild(option);
        });

        resetButton.classList.remove("disabled");
        applyButton.classList.add("disabled");
    }

    function resetOnlyFilters() {
        selectedFilters = [];
        filterOptionsContainer.querySelectorAll(".filter-option").forEach(function(option) {
            option.classList.remove("selected");
        });
        applyButton.classList.add("disabled");
        resetButton.classList.add("disabled");
    }

    function resetFilters() {
        selectedFilters = [];
        selectedSortingFilter = null;

        var pokemonOptions = Array.from(document.querySelectorAll(".pokemon-option"));
        pokemonOptions.sort(function(a, b) {
            return a.textContent.trim().localeCompare(b.textContent.trim());
        });

        pokemonOptions.forEach(function(option) {
            option.style.display = "";
            document.querySelector(".pokemon-checkboxes").appendChild(option);
        });

        var filterOptions = filterMenu.querySelectorAll(".filter-option");
        filterOptions.forEach(function(option) {
            option.classList.remove("selected");
        });

        resetButton.classList.add("disabled");
        applyButton.classList.add("disabled");
    }

    filterOptionsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("filter-option")) {
            toggleFilterOption(event.target);
        }
    });

    // ----------------- LOAD CONFIGURATION FROM URL PARAMETERS -----------------
    // On page load, if URL parameters for "pokemon" and/or "boosters" exist, set the selections accordingly.
    function loadConfigurationFromURL() {
        var urlParams = new URLSearchParams(window.location.search);
        var pokemonParam = urlParams.get("pokemon");
        if (pokemonParam) {
            pokemonOptions.forEach(function(option) {
                if (option.textContent.trim().toLowerCase() === pokemonParam.toLowerCase()) {
                    option.classList.add("selected", "active");
                }
            });
        }
        var boostersParam = urlParams.get("boosters");
        if (boostersParam) {
            var boosterList = boostersParam.split(",");
            multiplierOptions.forEach(function(option) {
                var boosterName = option.getAttribute("data-name");
                if (boosterList.some(function(name) {
                    return name.toLowerCase() === boosterName.toLowerCase();
                })) {
                    option.classList.add("selected");
                }
            });
        }
    }
    loadConfigurationFromURL();
}

// Check if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to show a message if on mobile
function checkDeviceForSearchFeature() {
    if (isMobileDevice()) {
        alert("The search feature is only available on desktop.");
        searchInput.style.display = "none";
    }
}

// Run the device check first
checkDeviceForSearchFeature();
// Initialize calculator function on page load
mw.hook('wikipage.content').add(initializeCalculator);