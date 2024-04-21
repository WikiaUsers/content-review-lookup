// Ensure the code runs after the document is fully loaded
$(document).ready(function() {
    var pageTitle = mw.config.get('wgPageName'); // Get the current page name
    var verifiedPagesTitle = 'VerifiedPages'; // Set the page where verified pages are stored

    function fetchVerifiedPages() {
        return new mw.Api().get({
            action: 'query',
            titles: verifiedPagesTitle,
            prop: 'revisions',
            rvprop: 'content',
            rvslots: '*',
            formatversion: '2'
        });
    }

    function checkIfVerified(data) {
        var content = data.query.pages[0].revisions[0].slots.main.content;
        return content.includes(pageTitle);
    }

    function displayBanner() {
        var bannerHTML = '<div id="verificationBanner" style="position: fixed; top: 10px; right: 10px; background-color: red; color: white; padding: 10px; width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; z-index: 1000;">' +
            'Page Content Not Verified As Classic<br>' +
            '<input type="text" id="verificationInput" placeholder="Type Verified and hit enter to Verify" style="width: 90%; margin-top: 5px;" /></div>';

        $('body').prepend(bannerHTML);

        $('#verificationInput').keypress(function(e) {
            if (e.which == 13 && $(this).val() === 'Verified') {  // 13 is the enter key
                $('#verificationBanner').remove();
                addToVerifiedPages();
            }
        });
    }

    function addToVerifiedPages() {
        fetchVerifiedPages().then(function(data) {
            var content = data.query.pages[0].revisions[0].slots.main.content;
            var newContent = content + '\n' + pageTitle;
            new mw.Api().postWithEditToken({
                action: 'edit',
                title: verifiedPagesTitle,
                text: newContent,
                summary: 'Adding page to verified list'
            }).done(function() {
                alert('Page has been verified and added to list.');
            });
        });
    }

    fetchVerifiedPages().then(function(data) {
        if (!checkIfVerified(data)) {
            displayBanner();
        }
    }).fail(function() {
        console.error('Failed to fetch the verified pages.');
    });
});

$(document).on('click', 'a.new, a.mw-newpages-none', function(e) {
    // Prevent the default link behavior
    e.preventDefault();

    // Get the href attribute from the link and decode it
    var href = $(this).attr('href');

    // Extract the page title, remove the leading '/wiki/' and any URL query parameters
    var pageTitle = decodeURIComponent(href.split('/wiki/')[1].split('?')[0]);

    // Redirect to the edit page with the preload parameter
    window.location.href = mw.util.getUrl(pageTitle, {
        action: 'edit',
        preload: 'Template:NewPageInstructions/preload'
    });
});