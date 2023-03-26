(function() {
    'use strict';

    if (document.getElementById('costs-table')) calculateDiff();

    function calculateDiff() {
        const costsTable = document.getElementById('costs-table')
            , coinsCells = costsTable.querySelectorAll('td:nth-child(2)')
            , head = document.head
            , coinsValues = []
            , coinsDifferences = []
            , priceDifferences = []
            , differencesCSS = '<style type="text/css" class="differences-styles">.theme-fandomdesktop-light {\
    --pos-color: #33691e;\
    --neg-color: #b71c1c;\
    --null-color: #424242;\
    }\
    \
    .theme-fandomdesktop-dark {\
    --pos-color: #ccff90;\
    --neg-color: #ef9a9a;\
    --null-color: #bdbdbd;\
    }\
    \
    .mw-plusminus-pos {\
        color: var(--pos-color);\
    }\
    \
    .mw-plusminus-neg {\
        color: var(--neg-color);\
    }\
    \
    .mw-plusminus-null {\
        color: var(--null-color);\
    }</styles>';

        // Get amount of coins of each row. Because the amount of minerals is always equal
        // to the amount of coins, we don't bother working with those too.
        coinsCells.forEach(function getCoinsNumber(coinsCell) {
            const coins = Number(coinsCell.innerText.replace(',', ''));
    
            coinsValues.push(coins);
        });

        // Now get the difference of price for each row.
        for (var i = 0; i < coinsValues.length; i++) {
            const hasPreviousCost = coinsValues[i - 1]
                , previousCost = hasPreviousCost ? coinsValues[i - 1] : 0
                , currentCost = coinsValues[i]
                , costDifference = currentCost - previousCost;
    
            coinsDifferences.push(costDifference);
        }

        // Then get the difference of the difference of each price.
        for (var i = 0; i < coinsDifferences.length; i++) {
            const hasPreviousCost = coinsDifferences[i - 1]
                , previousCost = hasPreviousCost ? coinsDifferences[i - 1] : 0
                , currentCost = coinsDifferences[i]
                , costDifference = currentCost - previousCost;
    
            priceDifferences.push(costDifference);
        }

        // And, once both differences of each price is obtained, add it to the costs table.
        for (var i = 0; i < priceDifferences.length; i++) {
            const diffCell = document.querySelectorAll('#costs-table tr')[i + 1].querySelector('td:last-child')
                , costDifference = coinsDifferences[i]
                , differenceOfDifference = priceDifferences[i]
                , differenceType = differenceOfDifference > 0 ? 'neg' : differenceOfDifference < 0 ? 'pos' : 'null'
                , differenceSymbol = differenceOfDifference > 0 ? '+' : ''
                , differenceHTML = '\
                <a href="/wiki/Resources" title="Resources">\
                    <img alt="Cost" src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png?width=16" decoding="async" loading="lazy" width="16" height="16" data-image-name="Icon_costs.png" data-image-key="Icon_costs.png" data-src="https://galaxylife.fandom.com/Special:Filepath/Icon_costs.png?width=16" class="ls-is-cached lazyloaded">\
                </a>\
                ' + formattedNumber(costDifference) + ' <span class="mw-plusminus-' + differenceType + '">(' + differenceSymbol + formattedNumber(differenceOfDifference) +')</span>\
                ';

            diffCell.insertAdjacentHTML('beforeend', differenceHTML);
        }

        // Add commas to numbers with more than 4 digits where it corresponds.
        // Code from https://stackoverflow.com/a/2901298/20503138
        function formattedNumber(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        head.insertAdjacentHTML('beforeend', differencesCSS);
    }
}());