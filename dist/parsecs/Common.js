
mw.hook('wikipage.content').add(function ($content) {
    var container = $content[0].querySelector('#parsecs-starmap');

    if (!container || container.dataset.loaded) return;
    container.dataset.loaded = 'true';

    var iframe = document.createElement('iframe');
    iframe.src = 'https://parsecs-starmap.derekhan.link/';
    iframe.title = 'Interactive Parsecs Starmap';
    iframe.style.width = '100%';
    iframe.style.height = '800px';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.setAttribute('loading', 'lazy');

    container.appendChild(iframe);
});