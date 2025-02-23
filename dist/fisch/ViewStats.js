$(function() {
    if (mw.config.get('wgTitle') !== 'ViewStats') return;

    var $content = $('#mw-content-text');
    var api = new mw.Api();

    function formatDate(date) {
        return new Date(date).toLocaleString();
    }

    function updateStats() {
        $content.html(
            '<div class="stats-intro" style="margin-bottom: 20px;">' +
            'Welcome to the Wiki Statistics Panel! View counts for all pages are shown below.' +
            '</div>' +
            '<table class="wikitable sortable" style="width: 100%;">' +
            '<tr>' +
            '<th>Page</th>' +
            '<th>Views</th>' +
            '<th>Last Update</th>' +
            '<th>Actions</th>' +
            '</tr>' +
            '</table>'
        );

        var $table = $content.find('table');

        api.get({
            action: 'query',
            list: 'allpages',
            apnamespace: 0,
            aplimit: 100
        }).done(function(data) {
            if (!data.query || !data.query.allpages) {
                $table.append('<tr><td colspan="4">No pages found</td></tr>');
                return;
            }

            data.query.allpages.forEach(function(page) {
                var $row = $('<tr>');
                $row.append('<td><a href="' + mw.util.getUrl(page.title) + '">' + page.title + '</a></td>');
                
                var viewKey = 'viewcount-' + page.pageid;
                var views = localStorage.getItem(viewKey) || 0;
                var lastUpdate = localStorage.getItem(viewKey + '-date') || new Date().toISOString();
                
                $row.append('<td>' + views + '</td>');
                $row.append('<td>' + formatDate(lastUpdate) + '</td>');
                $row.append(
                    '<td>' +
                    '<button class="reset-button" data-page="' + page.pageid + '" ' +
                    'style="background: #092140; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">' +
                    'Reset Counter</button>' +
                    '</td>'
                );
                
                $table.append($row);
            });

            $('.reset-button').click(function() {
                var pageId = $(this).data('page');
                if (confirm('Reset counter for this page?')) {
                    localStorage.setItem('viewcount-' + pageId, '0');
                    localStorage.setItem('viewcount-' + pageId + '-date', new Date().toISOString());
                    updateStats();
                }
            });
        });
    }

    updateStats();
    setInterval(updateStats, 60000);

    $(document).on('click', 'a', function() {
        var href = $(this).attr('href');
        if (href && href.startsWith('/wiki/')) {
            var pageId = $(this).closest('tr').find('.reset-button').data('page');
            if (pageId) {
                var viewKey = 'viewcount-' + pageId;
                var currentViews = parseInt(localStorage.getItem(viewKey) || 0);
                localStorage.setItem(viewKey, currentViews + 1);
                localStorage.setItem(viewKey + '-date', new Date().toISOString());
            }
        }
    });
});