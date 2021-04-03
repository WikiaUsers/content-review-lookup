$(function () {
    var elements = document.getElementsByClassName("mw-parser-output")[0].querySelectorAll('div[data-type]');

    if (elements.length !== 0) {
        for (var i in elements) {
            var iframe = document.createElement('iframe');

            switch (elements[i].dataset.type) {
                // Amazon Music
                case 'amazonmusic':
                    iframe.src = 'https://music.amazon.in/embed/' + elements[i].dataset.id;

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '300px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '410px';
                    }

                    break;

                    // Apple Music: Album
                case 'applemusic:album':
                    iframe.src = 'https://embed.music.apple.com/ru/album/' + elements[i].dataset.id;

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '300px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '300px';
                    }

                    break;

                    // Apple Music: Track
                case 'applemusic:track':
                    var data = elements[i].dataset.id.split(':');

                    iframe.src = 'https://embed.music.apple.com/ru/album/' + data[0] + '/?i=' + data[1];

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '300px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '120px';
                    }

                    break;

                    // Apple Podcasts
                case 'applepodcasts':
                    iframe.src = 'https://embed.podcasts.apple.com/us/podcast/' + elements[i].dataset.id;

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '300px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '450px';
                    }

                    break;

                    // Google Forms
                case 'googleforms':
                    iframe.src = 'https://docs.google.com/forms/d/e/' + elements[i].dataset.id + '/viewform';

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '500px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '500px';
                    }

                    break;

                    // Google Spreadsheets
                case 'googlespreadsheets':
                    iframe.src = 'https://docs.google.com/spreadsheets/d/e/' + elements[i].dataset.id + '/pubhtml?widget=true';

                    if (elements[i].dataset.width) {
                        iframe.width = elements[i].dataset.width + 'px';
                    } else {
                        iframe.width = '680px';
                    }

                    if (elements[i].dataset.height) {
                        iframe.height = elements[i].dataset.height + 'px';
                    } else {
                        iframe.height = '380px';
                    }

                    break;

                    // itch.io
                case 'itchio':
                    var data = elements[i].dataset.id.split(':');
                    var id = data.shift();
                    var theme = data.join(':');

                    iframe.src = 'https://itch.io/embed/' + id;

                    // Skip dark theme if light theme is specified
                    if (theme === 'light') {}

                    // Apply dark theme if specified or the wiki uses dark theme
                    else if (theme === 'dark' || $('body').hasClass('page-dark')) {
                        iframe.src = iframe.src + '?dark=true';
                    }

                    iframe.width = '552px';
                    iframe.height = '167px';
                    iframe.frameborder = 0;

                    break;

                    // Sketchfab
                case 'sketchfab':
                    iframe.src = 'https://sketchfab.com/models/' + elements[i].dataset.id + '/embed?ui_inspector=1';

                    iframe.width = '640px';
                    iframe.height = '480px';
                    break;

                    // Steam
                case 'steam':
                    var data = elements[i].dataset.id.split(':');
                    var id = data.shift();
                    var text = data.join(':');

                    if (text) {
                        iframe.src = 'https://store.steampowered.com/widget/' + id + '/?t=' + text;
                    } else {
                        iframe.src = 'https://store.steampowered.com/widget/' + id;
                    }

                    iframe.width = '646px';
                    iframe.height = '190px';
                    break;
            }

            elements[i].after(iframe);
            elements[i].remove();
        }
    }
})