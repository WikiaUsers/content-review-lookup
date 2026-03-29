/**
 * RecipeTable — Client-side controller for the crafting recipe browser.
 *
 * This script powers an interactive recipe viewer on the wiki. It builds a
 * filter panel (search, profession, level range, source), fetches recipe lists
 * from the server via the MediaWiki API (invoking Module:RecipeTable (render)),
 * and loads item detail cards on click (invoking Module:RecipeTable (renderCard)).
 * All secondary filtering (level range, source) is applied client-side against
 * the cached DOM elements to avoid redundant server requests. On mobile the
 * detail panel slides in as a fullscreen overlay with a back button.
 *
 * Dependencies: jQuery, mw.Api, Module:RecipeTable (Lua)
 *
 * ---
 *
 * RecipeTable — Клиентский контроллер браузера рецептов крафта.
 *
 * Скрипт управляет интерактивным просмотрщиком рецептов на вики. Он строит
 * панель фильтров (поиск, профессия, диапазон уровней, источник), загружает
 * список рецептов с сервера через MediaWiki API (вызывая Module:RecipeTable (render))
 * и подгружает карточку предмета по клику (вызывая Module:RecipeTable (renderCard)).
 * Вторичная фильтрация (уровень, источник) выполняется на клиенте по
 * закешированным DOM-элементам, чтобы не делать лишних запросов к серверу.
 * На мобильных устройствах панель деталей открывается как полноэкранный оверлей
 * с кнопкой «Назад».
 *
 * Зависимости: jQuery, mw.Api, Module:RecipeTable (Lua)
 */
 
 $(function () {
    const $recipesApp = $("#recipes-app");
    if (!$recipesApp.length) return;

    // ─── Элементы интерфейса и API ───────────────────────────────────────────
    const $detailsContainer    = $recipesApp.find("#recipe-details");
    const $itemsContainer      = $recipesApp.find("#items");
    const $controlsContainer   = $recipesApp.find("#controls");
    const $filterRow           = $('<div id="filter-row">').appendTo($controlsContainer);
    const mediaWikiApi         = new mw.Api();

    let activeCardRequest      = null;
    let cachedRecipeElements   = [];
    let isDataLoading          = false;
    let reloadDebounceTimer;
    let cardCache              = {};

    // ─── Вспомогательные функции ─────────────────────────────────────────────

    const capitalizeString = function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getArrayFromDataAttribute = function(attributeName) {
        var rawData = $recipesApp.data(attributeName) || "";
        return rawData.split(",").map(function(item) {
            return item.trim();
        }).filter(Boolean);
    };

    function createDebouncedFunction(callback, delay) {
        let timer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, delay);
        };
    }

    // ─── Подготовка данных для фильтров ──────────────────────────────────────

    const availableProfessions = getArrayFromDataAttribute("professions");
    const professionFromData   = $recipesApp.data("profession") || "";
    const defaultProfession    = professionFromData || availableProfessions[0] || "";

    const sourcesConfig = getArrayFromDataAttribute("sources").map(function(entry) {
        const parts = entry.split("|");
        return {
            label: parts[0] ? parts[0].trim() : "",
            value: parts[1] ? parts[1].trim() : ""
        };
    }).filter(function(item) {
        return item.label && item.value;
    });

    const sourceSortingOrder = sourcesConfig.map(function(item) {
        return item.value.toLowerCase();
    });

    // ─── Создание элементов фильтрации ───────────────────────────────────────

    const $searchInput = $('<input type="text" placeholder="Поиск рецепта...">')
        .on("input", createDebouncedFunction(function () {
            const searchQuery = $(this).val().trim();
            if (!searchQuery) {
                fetchRecipesFromServer($professionSelect.val(), "");
            } else if (searchQuery.length < 2) {
                const charsLeft = 2 - searchQuery.length;
                $itemsContainer.html("<div class='recipe-loading'>Введите ещё " + charsLeft + " символ(а)…</div>");
            } else {
                fetchRecipesFromServer("", searchQuery);
            }
        }, 400)).appendTo($filterRow);

    const $professionSelect = $('<select id="profession-select">').appendTo($filterRow);
    availableProfessions.forEach(function(professionName) {
        const isSelected = (professionName === defaultProfession);
        $professionSelect.append(new Option(professionName, professionName, false, isSelected));
    });

    const $levelFilterSelect = $('<select id="level-select">')
        .html('<option value="">Все уровни</option><option value="1-4">1–4</option><option value="5-8">5–8</option><option value="9-12">9–12</option><option value="13-16">13–16</option><option value="17-18">17–18</option><option value="19-20">19–20</option>')
        .appendTo($filterRow);

    const $sourceFilterSelect = $('<select id="source-select">')
        .html('<option value="">Все рецепты</option>')
        .appendTo($filterRow);
    sourcesConfig.forEach(function(sourceItem) {
        $sourceFilterSelect.append(new Option(sourceItem.label, sourceItem.value));
    });

    $levelFilterSelect.add($sourceFilterSelect).on("change", function() {
        if (!isDataLoading) applyFiltersAndRender();
    });

    $professionSelect.on("change", function () {
        const searchQuery = $searchInput.val().trim();
        const selectedProfession = $(this).val();
        fetchRecipesFromServer(searchQuery ? "" : selectedProfession, searchQuery);
    });

    // ─── Загрузка списка рецептов (серверная часть) ──────────────────────────

    function fetchRecipesFromServer(profession, searchKeyword, callback) {
        clearTimeout(reloadDebounceTimer);
        cardCache = {};
        reloadDebounceTimer = setTimeout(function() {
            isDataLoading = true;
            $itemsContainer.html("<div class='recipe-loading'>Загрузка...</div>");
            $detailsContainer.html("Выберите предмет");

            mediaWikiApi.get({
                action: "parse",
                text: "{{#invoke:RecipeTable|render|" + profession + "|" + (searchKeyword || "") + "}}",
                contentmodel: "wikitext",
                prop: "text"
            }).done(function(data) {
                const parsedHtml = $(data.parse.text["*"]);
                $itemsContainer.html(parsedHtml.find("#items").html());

                attachItemClickHandlers();
                isDataLoading = false;

                if (typeof callback === "function") {
                    callback();
                } else {
                    applyFiltersAndRender();
                }
            }).fail(function() {
                isDataLoading = false;
                $itemsContainer.html("<div class='recipe-loading'>Ошибка загрузки</div>");
            });
        }, 300);
    }

    // ─── Рендер карточки предмета ─────────────────────────────────────────────

    function renderCard($clickedItem, html) {
        const backButtonHtml = $(window).width() <= 768 ? '<button id="back-btn">← Назад</button>' : '';
        $detailsContainer.html(backButtonHtml + html);

        if ($(window).width() <= 768) {
            $detailsContainer.addClass("mobile-open");
        }

        $detailsContainer.find("#back-btn").on("click", function() {
            $detailsContainer.removeClass("mobile-open");
            $itemsContainer.find(".dt-item").removeClass("active");
        });
    }

    // ─── Обработка клика по предмету ─────────────────────────────────────────

    function attachItemClickHandlers() {
        cachedRecipeElements = $itemsContainer.find(".dt-item").toArray();

        $itemsContainer.off("click", ".dt-item").on("click", ".dt-item", function () {
            const $clickedItem = $(this);
            const itemName = $clickedItem.data("name");

            $itemsContainer.find(".dt-item").removeClass("active");
            $clickedItem.addClass("active");

            if (cardCache[itemName]) {
                renderCard($clickedItem, cardCache[itemName]);
                return;
            }

            if (activeCardRequest) activeCardRequest.abort();
            $detailsContainer.html("<div class='recipe-loading'>Загрузка...</div>");

            if ($(window).width() <= 768) {
                $detailsContainer.addClass("mobile-open");
            }

            activeCardRequest = mediaWikiApi.get({
                action: "parse",
                text: "{{#invoke:RecipeTable|renderCard|" + itemName + "}}",
                contentmodel: "wikitext",
                prop: "text"
            });

            activeCardRequest.done(function(data) {
                if (!$clickedItem.hasClass("active")) return;
                activeCardRequest = null;

                const html = data.parse.text["*"];
                cardCache[itemName] = html;
                renderCard($clickedItem, html);
            }).fail(function(xhr, reason) {
                if (reason === "abort") return;
                activeCardRequest = null;
                $detailsContainer.html("<div class='recipe-empty'>Ошибка загрузки</div>");
            });
        });
    }

    // ─── Клиентская фильтрация и отрисовка ───────────────────────────────────

    function applyFiltersAndRender() {
        if (isDataLoading) return;

        const rawSearchValue = $searchInput.val().trim();
        const searchKeyword  = rawSearchValue.toLowerCase();
        const sourceFilter   = $sourceFilterSelect.val().toLowerCase();
        const levelRange     = $levelFilterSelect.val();

        let minLevel = 0, maxLevel = 0;
        if (levelRange) {
            const rangeParts = levelRange.split("-");
            minLevel = Number(rangeParts[0]);
            maxLevel = Number(rangeParts[1]);
        }

        const checkIfLevelMatches = function(itemLevel) {
            if (!levelRange) return true;
            return itemLevel >= minLevel && itemLevel <= maxLevel;
        };

        const elementsToDisplay = [];
        const groupedBySourceOrProfession = {};

        if (searchKeyword) {
            // --- РЕЖИМ ПОИСКА (Группировка по профессиям) ---
            cachedRecipeElements.forEach(function(domElement) {
                const $item = $(domElement);
                const itemLevel = Number($item.data("level")) || 0;
                const itemSource = String($item.data("source") || "").toLowerCase();

                if (!checkIfLevelMatches(itemLevel)) return;
                if (sourceFilter && itemSource.indexOf(sourceFilter) === -1) return;

                const itemProfessions = String($item.data("professions") || "Без профессии").split(",");

                itemProfessions.forEach(function(rawProfName) {
                    const profName = rawProfName.trim();
                    if (!profName) return;

                    groupedBySourceOrProfession[profName] = groupedBySourceOrProfession[profName] || [];
                    groupedBySourceOrProfession[profName].push($item.clone(false).show()[0]);
                });
            });

            const sortedProfessionKeys = Object.keys(groupedBySourceOrProfession).sort();

            if (sortedProfessionKeys.length === 0) {
                $itemsContainer.html("<div class='recipe-empty-search'>Поручения, содержащие <b>" + rawSearchValue + "</b>, не найдены.</div>");
                return;
            }

            sortedProfessionKeys.forEach(function(profession) {
                elementsToDisplay.push($('<div class="profession-group-header">').text(capitalizeString(profession))[0]);
                Array.prototype.push.apply(elementsToDisplay, groupedBySourceOrProfession[profession]);
            });

        } else {
            // --- ОБЫЧНЫЙ РЕЖИМ (Группировка по источникам) ---
            const selectedProfession = $professionSelect.val().toLowerCase();
            const professionKeywords = selectedProfession.split(/\s+/).filter(function(word) {
                return word.length > 3;
            }).map(function(word) {
                return word.slice(0, -3);
            });

            const matchesSelectedProfession = function(sourceText) {
                if (!selectedProfession) return true;
                const lowerSource = sourceText.toLowerCase();
                return professionKeywords.every(function(word) {
                    return lowerSource.indexOf(word) !== -1;
                });
            };

            const simpleCraftItems = [];

            cachedRecipeElements.forEach(function(domElement) {
                const $item = $(domElement);
                const itemLevel = Number($item.data("level")) || 0;
                if (!checkIfLevelMatches(itemLevel)) return;

                const rawSourceField = String($item.data("source") || "").trim();

				if (!rawSourceField) {
				    if (!sourceFilter) {
				        simpleCraftItems.push($item.show()[0]);
				    }
				    return;
				}

                if (rawSourceField) {
                    const sourcesInItem = rawSourceField.split(",");
                    sourcesInItem.forEach(function(rawSourceName) {
                        const sourceName = rawSourceName.trim();
                        const isSourceMatch = !sourceFilter || sourceName.toLowerCase().indexOf(sourceFilter) !== -1;

                        if (sourceName && matchesSelectedProfession(sourceName) && isSourceMatch) {
                            groupedBySourceOrProfession[sourceName] = groupedBySourceOrProfession[sourceName] || [];
                            groupedBySourceOrProfession[sourceName].push($item.show()[0]);
                        }
                    });
                }
            });

            if (simpleCraftItems.length > 0) {
			    elementsToDisplay.push($('<div class="profession-group-header">').text("Стандартные рецепты")[0]);
			    Array.prototype.push.apply(elementsToDisplay, simpleCraftItems);
			}

			const sortedSourceKeys = Object.keys(groupedBySourceOrProfession).sort(function(nameA, nameB) {
			    const indexA = sourceSortingOrder.findIndex(function(val) { return nameA.toLowerCase().indexOf(val) !== -1; });
			    const indexB = sourceSortingOrder.findIndex(function(val) { return nameB.toLowerCase().indexOf(val) !== -1; });
			
			    return (indexA - indexB) || nameA.localeCompare(nameB);
			});

            sortedSourceKeys.forEach(function(sourceName) {
                elementsToDisplay.push($('<div class="profession-group-header">').text(sourceName)[0]);
                Array.prototype.push.apply(elementsToDisplay, groupedBySourceOrProfession[sourceName]);
            });

            if (elementsToDisplay.length === 0) {
                $itemsContainer.html("<div class='recipe-empty-search'>Поручения не найдены</div>");
                return;
            }
        }

        $itemsContainer.empty().append(elementsToDisplay);
    }

    // ─── Инициализация приложения ────────────────────────────────────────────
    fetchRecipesFromServer(defaultProfession, "");
});