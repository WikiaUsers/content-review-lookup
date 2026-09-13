mw.hook('wikipage.content').add(function ($content) {
    $content.find('.wikitable.autonumber').each(function () {
        const table = this;
        let currentRank = 0;
        let groupSize = 1;
        let rows = Array.from(table.querySelectorAll('tr')).filter(tr => tr.querySelector('td'));
        
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            
            // Skip rows are bypassed completely
            if (row.classList.contains('skip')) continue;
            
            // Find the cell designated for the rank (handles rowspan offset)
            let firstCell = row.querySelector('td:first-child');
            if (!firstCell) continue;
            
            // If the row doesn't have a dedicated rank cell due to rowspan from above, skip numbering it here
            if (firstCell.hasAttribute('rowspan') || (i > 0 && rows[i-1].querySelector('td[rowspan]'))) {
                // If it's a tie row sharing a rowspan, apply the current rank
                if (row.classList.contains('tie')) {
                    // For rows under a rowspan, we locate the actual rank display cell if needed, 
                    // but cleaner wikitext avoids rowspan complexity by letting the script handle ties automatically.
                }
                continue;
            }
            
            if (row.classList.contains('tie')) {
                groupSize++;
                firstCell.textContent = currentRank; // Ties share the exact same rank
                firstCell.style.textAlign = 'center';
                firstCell.style.fontWeight = 'bold';
                firstCell.style.backgroundColor = '#F9F9F9';
            } else {
                currentRank += groupSize;
                groupSize = 1; // Reset for the next group
                
                firstCell.textContent = currentRank;
                firstCell.style.textAlign = 'center';
                firstCell.style.fontWeight = 'bold';
                firstCell.style.backgroundColor = '#F9F9F9';
            }
        }
    });
});