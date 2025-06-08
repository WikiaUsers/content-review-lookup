/* Any JavaScript here will be loaded for all users on every page load. */

/* */

$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('newsbox')) {
        return;
    }

    if ($('#sn-container').length) { return; }
    if (sessionStorage.getItem('seenScreamerNewsSession') === 'true') { return; }

    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'query',
            prop: 'info',
            titles: 'Template:ScreamerNews',
            format: 'json'
        },
        dataType: 'json'
    }).done(function(response) {
        if (!response.query || !response.query.pages) { return; }
        var pageId = Object.keys(response.query.pages)[0];
        if (pageId === "-1") { return; }

        var latestTimestamp = response.query.pages[pageId].touched;
        var lastSeenTimestamp = localStorage.getItem('screamerNewsLastSeenTimestamp');

        if (lastSeenTimestamp && lastSeenTimestamp === latestTimestamp) {
            return;
        }

        $.get('/wiki/Template:ScreamerNews?action=render').done(function(data) {
            if (!data) { return; }

            var $content = $('<div>').html(data);
            var snippetHTML = $content.find('.sn-snippet-content').html();
            var expandedHTML = $content.find('.sn-expanded-content').html();
            var smallBoxTitleHTML = $content.find('.sn-expanded-content h2').first().html();
            var modalTitleOverrideHTML = $content.find('.sn-modal-title-override').first().html();
            var modalTitleHTML = modalTitleOverrideHTML ? modalTitleOverrideHTML : smallBoxTitleHTML;

            if (!snippetHTML || !expandedHTML) { return; }
            
            var newsTitleMain = "Screamer Wiki News";
            var newsTitleVersion = "v1.0";
            var closeIconURL = 'https://static.wikia.nocookie.net/screamergame/images/3/39/Exitout.webp/revision/latest';
            var footerLogoURL = 'https://static.wikia.nocookie.net/screamergame/images/1/12/Logo_Screamer_%282026%29.png/revision/latest?cb=20250605035142';
            
            var hidePreference = localStorage.getItem('screamerNewsHidePref') === 'true';
            var isCheckedAttribute = hidePreference ? 'checked' : '';

            var newsBoxHTML =
                '<div id="sn-container" style="display:none">' +
                    '<div class="sn-header">' +
                        '<div class="sn-title-wrapper">' +
                            '<span class="sn-version">' + newsTitleVersion + '</span>' +
                            '<p class="sn-title">' + newsTitleMain + '</p>' +
                        '</div>' +
                        '<div id="sn-close-button" class="sn-close" style="background-image: url(' + closeIconURL + ');"></div>' +
                    '</div>' +
                    '<div class="sn-sub-header">' + '<h3>' + smallBoxTitleHTML + '</h3>' + '</div>' +
                    '<div class="sn-content">' + snippetHTML + '</div>' +
                    '<div class="sn-footer">' +
                        '<div class="sn-options">' +
                            '<input type="checkbox" id="sn-hide-permanently" ' + isCheckedAttribute + '>' +
                            '<label for="sn-hide-permanently">Hide until next news update</label>' +
                        '</div>' +
                        '<div id="sn-read-more" class="sn-read-more"><p>READ MORE</p></div>' +
                    '</div>' +
                '</div>' +
                '<div id="sn-modal-overlay" style="display:none">' +
                    '<div class="sn-modal-wrapper">' +
                        '<div id="sn-modal-close-button" class="sn-close sn-close--modal" style="background-image: url(' + closeIconURL + ');"></div>' +
                        '<div class="sn-header sn-header--modal">' + '<h2>' + modalTitleHTML + '</h2>' + '</div>' +
                        '<div class="sn-content sn-content--modal">' + expandedHTML + '</div>' +
                        '<div class="sn-footer sn-footer--modal">' +
                            '<img src="' + footerLogoURL + '" class="sn-footer-logo-large" alt="Screamer Logo" />' +
                        '</div>' +
                    '</div>' +
                '</div>';

            $('body').append(newsBoxHTML);

            $('#sn-container a, #sn-modal-overlay a').each(function() {
                var $link = $(this);
                var originalHref = $link.attr('href');
                if (!originalHref || originalHref.startsWith('#')) { return; }
                $link.attr('target', '_blank').attr('rel', 'noopener noreferrer');
                var newHref = originalHref + (originalHref.indexOf('?') > -1 ? '&' : '?') + 'newsbox=closed';
                $link.attr('href', newHref);
            });

            if (sessionStorage.getItem('screamerNewsView') === 'modal') {
                $('#sn-modal-overlay').fadeIn(250).css('display', 'flex');
            } else {
                $('#sn-container').fadeIn(250).css('display', 'flex');
            }
        });

        var doc = $(document);

        function handleCloseActions() {
            var isChecked = $('#sn-hide-permanently').is(':checked');
            localStorage.setItem('screamerNewsHidePref', isChecked ? 'true' : 'false');

            if (isChecked) {
                localStorage.setItem('screamerNewsLastSeenTimestamp', latestTimestamp);
            } else {
                sessionStorage.setItem('seenScreamerNewsSession', 'true');
            }
            sessionStorage.removeItem('screamerNewsView');
        }

        function closeInitialBox() {
            $('#sn-container').fadeOut(250);
            handleCloseActions();
        }

        function openModal() {
            sessionStorage.setItem('screamerNewsView', 'modal');
            $('#sn-container').fadeOut(250, function() {
                $('#sn-modal-overlay').fadeIn(250).css('display', 'flex');
            });
        }

        function closeModal() {
            sessionStorage.setItem('screamerNewsView', 'small');
            $('#sn-modal-overlay').fadeOut(250, function() {
                $('#sn-container').fadeIn(250).css('display', 'flex');
            });
        }

        doc.on('click', '#sn-close-button', closeInitialBox);
        doc.on('click', '#sn-read-more', openModal);
        doc.on('click', '#sn-modal-close-button', closeModal);
    });
});