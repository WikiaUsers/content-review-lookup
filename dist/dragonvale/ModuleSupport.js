function createTraitedDragonPage(parentElement) {
    var $container = $('<div>', { id: 'traited-dragon-table-container' });
    var $controlsDiv = $('<div>', { id: 'pagination-controls' });

    var $prevButton = $('<button>', {
        id: 'prev-page',
        text: 'Previous',
        disabled: true
    });

    var $pageInput = $('<input>', {
        id: 'page-input',
        type: 'number',
        min: 1,
        style: 'width: 50px; margin: 0 10px;'
    });

    var $nextButton = $('<button>', {
        id: 'next-page',
        text: 'Next'
    });

    var $statusSpan = $('<p>', { id: 'pagination-status', text: '' });

    $controlsDiv.append($prevButton, $pageInput, $nextButton, $statusSpan);

    var $tableDiv = $('<div>', { id: 'traited-dragon-table', text: 'Loading table...' });
    $container.append($controlsDiv, $tableDiv);
    
    $(parentElement).html($container);

    const arguments1 = ModuleInject.collectNamedArgs(parentElement);

    let skip = Math.max(parseInt($(parentElement).data('skip'), 10) || 0, 0);
    let take = Math.max(parseInt($(parentElement).data('take'), 10) || 100, 1);
    const totalElements = Math.max(parseInt($(parentElement).data('total'), 10) || 1000, 1);

    function reloadTable() {
        $tableDiv.html('<p>Loading...Please wait...</p>');
        $prevButton.prop('disabled', true);
        $nextButton.prop('disabled', true);
        $pageInput.prop('disabled', true);

        arguments1.skip = skip;
        arguments1.take = take;

        ModuleInject.invokeModule(
            'Automation/Dragon',
            'TraitedDragonImageTable',
            [],
            arguments1
        ).then(function (html) {
            $tableDiv.html(html);

            var currentPage = Math.floor(skip / take) + 1;
            $pageInput.val(currentPage);

            var totalPages = Math.ceil(totalElements / take);
            $statusSpan.text(`Page ${currentPage} of ${totalPages} (${skip + 1}-${Math.min(skip + take, totalElements)} of ${totalElements})`);

            $prevButton.prop('disabled', currentPage === 1);
            $nextButton.prop('disabled', currentPage === totalPages);
            $pageInput.prop('disabled', false);

            if (typeof window.initializeToggler === 'function') {
                window.initializeToggler();
            }
        }).catch(function (error) {
            console.error('Error reloading table:', error);
            $tableDiv.html('<p>Error loading table. Please try again later.</p>');

            $prevButton.prop('disabled', false);
            $nextButton.prop('disabled', false);
            $pageInput.prop('disabled', false);
        });
    }
    
    reloadTable(); // Initial load of the table

    $nextButton.on('click', function () {
        skip += take;
        reloadTable();
    });

    $prevButton.on('click', function () {
        if (skip > 0) {
            skip -= take;
            reloadTable();
        }
    });
    
    $pageInput.on('change', function () {
        const requestedPage = parseInt($pageInput.val(), 10);
        const totalPages = Math.ceil(totalElements / take);

        if (isNaN(requestedPage) || requestedPage < 1 || requestedPage > totalPages) {
            alert(`Please enter a valid page number between 1 and ${totalPages}.`);
            var currentPage = Math.floor(skip / take) + 1;
            $pageInput.val(currentPage);
            return;
        }

        skip = (requestedPage - 1) * take;

        reloadTable();
    });
}

$(document).ready(function () {
    mw.loader.using('mediawiki.api', function () {
        var api = new mw.Api();

        mw.hook('wikipage.content').add(function ($content) {
            const promises = [];

            promises.push(ModuleInject.waitForElement('#traited-dragon-page').then(el => {
                createTraitedDragonPage(el);
            }));

            Promise.all(promises)
                .then(() => {
                    if (typeof window.initializeToggler === 'function') {
                        window.initializeToggler();
                    }

                    if (typeof window.initializeCountdown === 'function') {
                        window.initializeCountdown($content);
                    }
                });
        });
    });
});