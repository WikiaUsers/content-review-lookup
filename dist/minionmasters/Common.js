$(document).ready(function () {
    // Text search
    $('.cargo-search').on('keyup', function () {
        let value = $(this).val().toLowerCase();
        $(this).closest('.cargo-wrapper').find('table tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Initialize Cargo tables (sticky + filters)
    $('.cargo-wrapper').each(function () {
        let $wrapper = $(this);
        let $table = $wrapper.find('table').first();
        if (!$table.length) return;

        let $rows = $table.find('tbody tr');
        if (!$rows.length) return;

        // Determine column indices for Faction and Rarity
        let factionIndex = -1;
        let rarityIndex = -1;

        $table.find('thead th').each(function (i) {
            let txt = $(this).text().trim().toLowerCase();
            if (txt === 'faction') factionIndex = i;
            if (txt === 'rarity') rarityIndex = i;
        });

        // If the header labels differ, adjust the checks above.
        // If not found, just skip dropdown initialization.
        let factions = new Set();
        let rarities = new Set();

        if (factionIndex !== -1 || rarityIndex !== -1) {
            $rows.each(function () {
                let $tds = $(this).find('td');

                if (factionIndex !== -1) {
                    let faction = ($tds.eq(factionIndex).text() || '').trim();
                    $(this).attr('data-faction', faction);
                    if (faction) factions.add(faction);
                }

                if (rarityIndex !== -1) {
                    let rarity = ($tds.eq(rarityIndex).text() || '').trim();
                    $(this).attr('data-rarity', rarity);
                    if (rarity) rarities.add(rarity);
                }
            });

            // Populate selects inside this wrapper
            let $factionFilter = $wrapper.find('select.cargo-filter[data-column="faction"]');
            let $rarityFilter  = $wrapper.find('select.cargo-filter[data-column="rarity"]');
            let $countSpan     = $wrapper.find('.cargo-count');

            if ($factionFilter.length) {
                Array.from(factions).sort().forEach(function (f) {
                    $('<option>').val(f).text(f).appendTo($factionFilter);
                });
            }

            if ($rarityFilter.length) {
                Array.from(rarities).sort().forEach(function (r) {
                    $('<option>').val(r).text(r).appendTo($rarityFilter);
                });
            }

            function applyFilters() {
                let fVal = ($factionFilter.val() || '').toLowerCase();
                let rVal = ($rarityFilter.val() || '').toLowerCase();
                let visible = 0;

                $rows.each(function () {
                    let $row = $(this);
                    let f = ($row.attr('data-faction') || '').toLowerCase();
                    let r = ($row.attr('data-rarity') || '').toLowerCase();

                    let okF = !fVal || f === fVal;
                    let okR = !rVal || r === rVal;

                    if (okF && okR) {
                        $row.show();
                        visible++;
                    } else {
                        $row.hide();
                    }
                });

                if ($countSpan.length) {
                    $countSpan.text(visible + ' minions');
                }
            }

            $factionFilter.on('change', applyFilters);
            $rarityFilter.on('change', applyFilters);

            applyFilters();
        }
    });
});