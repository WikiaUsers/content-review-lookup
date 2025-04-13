/**
 * 
 * This file serves as a centralized collection of JavaScript code related to artifact functionality.
 * 
 * Dependencies: jQuery library
 * 
 */

// Main purpose: This code initializes an interactive artifact list with search, filtering, and sorting capabilities,
// managing UI updates and user interactions for displaying artifact details dynamically.
$(document).ready(() => {
    // Element caching
    let $listItems = $('#artifact-list-items li');
    const $contentDivs = $('#artifact-content > div');
    const $placeholder = $('#artifact-placeholder');
    const $searchContainer = $('#artifact-search-container');
    const $filterContainer = $('#artifact-filter-container');
    const MAX_FILTERS = 3;

    // Creating search elements
    const $searchWrapper = $('<div>', { class: 'search-wrapper' });
    const $searchInput = $('<input>', {
        type: 'text',
        id: 'artifact-search',
        placeholder: 'Поиск артефактов...'
    });
    const $searchClearBtn = $('<button>', { 
        text: 'Очистить', 
        class: 'clear-search-btn',
        type: 'button'
    }).hide();

    $searchWrapper.append($searchInput, $searchClearBtn);
    $searchContainer.append($searchWrapper);

    // Creating sorting elements
    const $sortContainer = $('<div>', { class: 'sort-container' });
    const $sortSelect = $('<select>', { id: 'artifact-sort' })
        .append(
            $('<option>', { value: 'alphabet', text: 'По алфавиту' }),
            $('<option>', { value: 'level', text: 'По уровню предмета (убывание)' })
        );
    $sortContainer.append($sortSelect);
    $filterContainer.before($sortContainer);

    // Creating filter dropdown
    const $dropdownContainer = $('<div>', { class: 'dropdown-container' });
    const $dropdownButton = $('<button>', { type: 'button' });
    const $buttonText = $('<span>', { text: 'Фильтр параметров (до 3)' });
    const $filterClear = $('<span>', { text: '✕', class: 'clear-btn' });
    const $dropdownMenu = $('<div>', { class: 'dropdown-menu' });

    $dropdownButton.append($buttonText, $filterClear);
    $dropdownContainer.append($dropdownButton, $dropdownMenu);
    $filterContainer.append($dropdownContainer);

    // Collecting unique stats
    const statsFilters = new Set();
    $listItems.each((_, item) => {
        item.getAttribute('data-stats').split(', ').forEach(stat => {
            if (stat) statsFilters.add(stat);
        });
    });

    // Custom filter sorting order
    const customOrder = [
        'Максимум хитов', 'Могущество', 'Точность', 'Боевое преимущество',
        'Вероятность критического удара', 'Критический урон', 'Оборона',
        'Осведомленность', 'Критическое уклонение', 'Парирование',
        'Сила парирования', 'Сильная сторона', 'Бонус к контролю',
        'Сопротивляемость контролю', 'Принимаемое лечение',
        'Исходящее лечение', 'Жажда золота'
    ];

    // Creates filter checkboxes based on available stats with custom sorting
    const createFilters = () => {
        const stats = [...statsFilters].sort((a, b) => {
            const indexA = customOrder.indexOf(a);
            const indexB = customOrder.indexOf(b);
            return (indexA === -1 && indexB === -1) 
                ? a.localeCompare(b)
                : (indexA === -1 ? 1 : indexB === -1 ? -1 : indexA - indexB);
        });

        const fragment = document.createDocumentFragment();
        stats.forEach(stat => {
            const id = `filter-${stat.replace(/\s+/g, '-')}`;
            const $filterItem = $('<div>', { class: 'filter-item' })
                .append(
                    $('<input>', { 
                        type: 'checkbox', 
                        id, 
                        'data-stat': stat 
                    }),
                    $('<label>', { for: id, text: stat })
                );
            fragment.appendChild($filterItem[0]);
        });
        $dropdownMenu[0].appendChild(fragment);
    };

    // Updates the filter button text based on selected filters
    const updateButtonText = () => {
        const selected = $dropdownMenu.find('input:checked')
            .map((_, el) => el.dataset.stat).get();
        $buttonText.text(selected.length 
            ? `Выбрано: ${selected.join(', ')}`
            : 'Фильтр параметров (до 3)');
        $filterClear.toggle(selected.length > 0);
    };

    // Toggles visibility of the search clear button based on input
    const updateSearchClear = () => {
        $searchClearBtn.toggle(!!$searchInput.val());
    };

    // Adjusts margins for visible list items
    const updateListMargins = () => {
        const $visible = $listItems.filter(':visible');
        $visible.addClass('margin-bottom').last().removeClass('margin-bottom');
    };

    // Sorts list items based on selected sorting option
    const sortItems = () => {
        const sortBy = $sortSelect.val();
        const $ul = $('#artifact-list-items');
        const itemsArray = $listItems.toArray();
        itemsArray.sort((a, b) => {
            if (sortBy === 'alphabet') {
                return a.textContent.localeCompare(b.textContent);
            } else if (sortBy === 'level') {
                return Number(b.dataset.level) - Number(a.dataset.level);
            }
            return 0;
        });
        $listItems.detach();
        itemsArray.forEach(item => $ul.append(item));
        $listItems = $('#artifact-list-items li');
    };

    // Filters and updates the artifact list based on search and filter criteria
    const filterItems = () => {
        sortItems();
        const searchText = $searchInput.val().toLowerCase();
        const filters = $dropdownMenu.find('input:checked')
            .map((_, el) => el.dataset.stat).get();

        let hasVisible = false;
        $listItems.each((_, item) => {
            const $item = $(item);
            const text = item.textContent.toLowerCase();
            const stats = item.getAttribute('data-stats').split(', ');
            const isVisible = text.includes(searchText) && 
                (!filters.length || filters.every(f => stats.includes(f)));
            $item.toggle(isVisible);
            hasVisible = hasVisible || isVisible;
        });

        updateListMargins();
        
        if (!hasVisible) {
            $contentDivs.hide();
            $placeholder.text('Не найдено').show();
            return;
        }

        const $firstVisible = $listItems.filter(':visible').first();
        $listItems.removeClass('bg-selected').addClass('bg-default');
        $firstVisible.removeClass('bg-default').addClass('bg-selected');
        $contentDivs.hide().filter(`#${$firstVisible.attr('data-id')}`).show();
        $placeholder.hide();
    };

    // Event handlers for dropdown
    const isTouchDevice = 'ontouchstart' in window;

    $dropdownButton.on('click', (e) => {
        e.preventDefault();
        const isCurrentlyOpen = $dropdownMenu.is(':visible');
        $dropdownMenu.toggle(!isCurrentlyOpen);
    });

    if (!isTouchDevice) {
        let timeoutId;

        $dropdownContainer.on('mouseleave', () => {
            timeoutId = setTimeout(() => {
                $dropdownMenu.hide();
            }, 200);
        });

        $dropdownMenu.on('mouseenter', () => {
            clearTimeout(timeoutId);
        }).on('mouseleave', () => {
            timeoutId = setTimeout(() => {
                $dropdownMenu.hide();
            }, 200);
        });
    }

    $(document).on('click', (e) => {
        if ($dropdownMenu.is(':visible') && 
            !$dropdownContainer.is(e.target) && 
            !$dropdownContainer.has(e.target).length) {
            $dropdownMenu.hide();
        }
    });

    $filterClear.on('click', (e) => {
        e.stopPropagation();
        $dropdownMenu.find('input[type="checkbox"]').prop('checked', false);
        updateButtonText();
        filterItems();
    });

    $dropdownMenu.on('change', 'input[type="checkbox"]', (e) => {
        const $checkbox = $(e.target);
        const checkedCount = $dropdownMenu.find('input:checked').length;
        if (checkedCount > MAX_FILTERS) {
            $checkbox.prop('checked', false);
            alert('You can select no more than 3 parameters');
        }
        updateButtonText();
        filterItems();
    });

    $searchInput.on('input', () => {
        updateSearchClear();
        filterItems();
    });

    $searchClearBtn.on('click', () => {
        $searchInput.val('').trigger('input');
    });

    $listItems.on({
        click: function() {
            $listItems.removeClass('bg-selected').addClass('bg-default');
            $(this).removeClass('bg-default').addClass('bg-selected');
            $contentDivs.hide().filter(`#${this.dataset.id}`).show();
            $placeholder.hide();
        },
        mouseenter: function() {
            if (!$(this).hasClass('bg-selected')) {
                $(this).removeClass('bg-default');
            }
        },
        mouseleave: function() {
            if (!$(this).hasClass('bg-selected')) {
                $(this).addClass('bg-default');
            }
        }
    });

    // Sorting handler
    $sortSelect.on('change', filterItems);

    // Initialization
    createFilters();
    $contentDivs.hide();
    $placeholder.hide();
    filterItems();
    if ($listItems.length) $listItems.first().click();
});