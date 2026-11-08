
/* ===== SURVIVE YOUR IDEAS - WORD CHECKLIST ===== */

(function () {
    "use strict";

    var PREFIX = "syi-word-checklist-";
    var initialized = new WeakSet();

    function initializeWordLists() {
        var lists = document.querySelectorAll("[data-word-list]");

        lists.forEach(function (list) {
            if (initialized.has(list)) {
                return;
            }

            initialized.add(list);

            var category = list.getAttribute("data-word-list");

            if (!category) {
                console.warn("Checklist missing category ID:", list);
                return;
            }

            var storageKey = PREFIX + category;
            var checkboxes = Array.from(
                list.querySelectorAll("[data-word-check]")
            );

            var progress = list.querySelector("[data-progress]");
            var searchContainer = list.querySelector("[data-word-search]");
            var searchInput = null;

            var saved = {};
            var validStorage = true;
            var usedIds = new Set();

            /* Load saved progress without modifying it */
            try {
                var raw = localStorage.getItem(storageKey);

                if (raw !== null) {
                    var parsed = JSON.parse(raw);

                    if (
                        parsed &&
                        typeof parsed === "object" &&
                        !Array.isArray(parsed)
                    ) {
                        saved = parsed;
                    } else {
                        validStorage = false;
                        console.warn("Invalid checklist data:", category);
                    }
                }
            } catch (error) {
                validStorage = false;
                console.warn("Could not read checklist:", error);
            }

            /* Check duplicate IDs */
            checkboxes.forEach(function (checkbox) {
                var id = checkbox.getAttribute("data-word-check");

                if (!id || usedIds.has(id)) {
                    validStorage = false;
                    console.error(
                        "Missing or duplicate word ID:",
                        category,
                        id
                    );
                    return;
                }

                usedIds.add(id);
            });

            /* Create search input */
            if (searchContainer) {
                searchInput = searchContainer.querySelector("input");

                if (!searchInput) {
                    searchInput = document.createElement("input");
                    searchInput.type = "search";
                    searchInput.placeholder = "Search words...";
                    searchInput.autocomplete = "off";
                    searchContainer.appendChild(searchInput);
                }
            }

            /* Update progress */
            function updateProgress() {
                var checked = checkboxes.filter(function (checkbox) {
                    return checkbox.getAttribute("aria-checked") === "true";
                }).length;

                var percentage = checkboxes.length
                    ? Math.round((checked / checkboxes.length) * 100)
                    : 0;

                if (progress) {
                    progress.textContent = percentage + "%";
                }
            }

            /* Save only the clicked word */
            function saveWord(id, value) {
                if (!validStorage || !id) {
                    return;
                }

                try {
                    var current = localStorage.getItem(storageKey);
                    var state = {};

                    if (current !== null) {
                        var parsed = JSON.parse(current);

                        if (
                            !parsed ||
                            typeof parsed !== "object" ||
                            Array.isArray(parsed)
                        ) {
                            console.error("Invalid saved checklist data.");
                            return;
                        }

                        state = parsed;
                    }

                    state[id] = value;

                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(state)
                    );

                    saved = state;

                } catch (error) {
                    console.error("Could not save checklist:", error);
                }
            }

            /* Toggle checkbox */
            function toggleCheckbox(checkbox) {
                var id = checkbox.getAttribute("data-word-check");

                if (!id || !validStorage) {
                    return;
                }

                var isChecked =
                    checkbox.getAttribute("aria-checked") === "true";

                var newValue = !isChecked;

                checkbox.setAttribute(
                    "aria-checked",
                    String(newValue)
                );

                saveWord(id, newValue);
                updateProgress();
            }

            /* Search filter */
            function filterWords() {
                if (!searchInput) {
                    return;
                }

                var searchText = searchInput.value
                    .trim()
                    .toLowerCase();

                checkboxes.forEach(function (checkbox) {
                    var row = checkbox.parentElement;

                    if (!row) {
                        return;
                    }

                    var wordText = row.textContent.toLowerCase();

                    row.style.display =
                        wordText.includes(searchText) ? "" : "none";
                });
            }

            /* Initialize checkboxes */
            checkboxes.forEach(function (checkbox) {
                var id = checkbox.getAttribute("data-word-check");

                var isChecked =
                    validStorage &&
                    id &&
                    saved[id] === true;

                checkbox.setAttribute("role", "checkbox");
                checkbox.setAttribute("tabindex", "0");
                checkbox.setAttribute(
                    "aria-checked",
                    String(Boolean(isChecked))
                );

                checkbox.textContent = "";

                checkbox.addEventListener("click", function () {
                    toggleCheckbox(checkbox);
                });

                checkbox.addEventListener("keydown", function (event) {
                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        event.preventDefault();
                        toggleCheckbox(checkbox);
                    }
                });
            });

            /* Initialize search */
            if (searchInput) {
                searchInput.addEventListener("input", filterWords);
            }

            filterWords();
            updateProgress();
        });
    }

    /* Initialize once the page is ready */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeWordLists,
            { once: true }
        );
    } else {
        initializeWordLists();
    }

})();