/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
    function convertAbbreviatedNumbers() {
        const rows = document.querySelectorAll('table.sortable tbody tr');

        const multipliers = {
            k: 1e3,
            m: 1e6,
            b: 1e9,
            t: 1e12,
            qd: 1e15,
            qn: 1e18,
            sx: 1e21,
            sp: 1e24,
            o: 1e27,
            n: 1e30,
            de: 1e33,
            ud: 1e36,
            dd: 1e39,
            tdd: 1e42,
            qdd: 1e45,
            qnd: 1e48
        };

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                const original = cell.textContent.trim().replace(/,/g, '');
                let numericValue = null;

                const abbrevMatch = original.match(/^(\d+(?:\.\d+)?)[\s\u00A0]*([a-zA-Z]{1,3})$/i);
                const plainMatch = original.match(/^(\d+(?:\.\d+)?)$/);

                if (abbrevMatch) {
                    let [, number, suffix] = abbrevMatch;
                    number = parseFloat(number);
                    const multiplier = multipliers[suffix.toLowerCase()];
                    if (multiplier && !isNaN(number)) {
                        numericValue = number * multiplier;
                    }
                } else if (plainMatch) {
                    numericValue = parseFloat(plainMatch[1]);
                }

                if (numericValue !== null && !isNaN(numericValue)) {
                    // Add data-sort-value AND force the cell to re-render so MediaWiki reads it
                    cell.setAttribute('data-sort-value', numericValue);
                    const displayedText = cell.textContent.trim();
                    cell.innerHTML = `<span data-sort-value="${numericValue}">${displayedText}</span>`;
                }
            });
        });
    }

    $(document).ready(() => {
        convertAbbreviatedNumbers();

        // After sorting, re-apply sort values (only needed if values change dynamically)
        $('table.sortable').on('click', 'th', function () {
            setTimeout(convertAbbreviatedNumbers, 0);
        });
    });
})();