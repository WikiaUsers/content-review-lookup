// Function to check if a page exists using the MediaWiki API
function checkLink(apiUrl, element) {
    $.get(apiUrl, function(data) {
        var pages = data.query.pages;
        for (var pageId in pages) {
            if (pages[pageId].missing !== undefined) {
                // Page does not exist, add a class to the link element
                element.classList.add('new');
            }
        }
    }).fail(function() {
        // Request failed, assume the page does not exist, add a class to the link element
        element.classList.add('new');
    });
}

// Function to extract the title from the URL and generate the API URL
function getApiUrl(url) {
    var title = url.split('/').pop();
    if (url.includes('ossus.pl')) {
        return 'https://ossus.pl/api.php?action=query&prop=info&titles=' + title + '&format=json&origin=*';
    } else if (url.includes('en.wikipedia.org/wiki/pl:')) {
        var polishTitle = title.split(':')[1];
        return 'https://pl.wikipedia.org/w/api.php?action=query&prop=info&titles=' + polishTitle + '&format=json&origin=*';
    } else if (url.includes('en.wikipedia.org')) {
        return 'https://en.wikipedia.org/w/api.php?action=query&prop=info&titles=' + title + '&format=json&origin=*';
    } else if (url.includes('starwars.fandom.com')) {
        return 'https://starwars.fandom.com/api.php?action=query&prop=info&titles=' + title + '&format=json&origin=*';
    }
    return null;
}

// Function to process all links on the page
function processLinks() {
    var links = document.querySelectorAll('a[href*="ossus.pl"], a[href*="en.wikipedia.org"], a[href*="starwars.fandom.com"]');
    links.forEach(function(link) {
        var url = link.href;
        var apiUrl = getApiUrl(url);
        if (apiUrl) {
            checkLink(apiUrl, link);
        }
    });
}

// Run the function on page load
$(document).ready(function() {
    processLinks();
});