/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    const dataUrl = '/wiki/Data:ItemData.json?action=raw&cb=' + new Date().getTime();

    fetch(dataUrl)
        .then(res => res.json())
        .then(itemData => {
            function processTable($content) {
                $content.find('.id-lookup tr').each(function() {
                    const $cells = $(this).find('td');
                    if ($cells.length < 2) return;

                    const $idCell = $cells.eq(0);
                    const $nameCell = $cells.eq(1);

                    if ($idCell.text().trim() === "") {
                        let key = $nameCell.text().trim().replace(/\s+/g, '').toLowerCase();
                        if (itemData[key]) {
                            $idCell.text(itemData[key]);
                        }
                    }
                });
            }

            // Standard Fandom content hook
            mw.hook('wikipage.content').add(processTable);
        })
        .catch(e => {});
})();