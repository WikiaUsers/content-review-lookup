window.addEventListener('DOMContentLoaded', function () {
    if (window.skin && window.skin === 'wikiamobile' && !/redirect=no/i.test(location.search)) {
        location.replace('/wiki/' + wgMainpage);
    }
}, false);