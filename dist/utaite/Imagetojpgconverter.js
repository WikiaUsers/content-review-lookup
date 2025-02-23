(function() {
    'use strict';

    // Only run on the specified special page
    if (mw.config.get('wgPageName') !== 'Special:BlankPage' || 
        mw.util.getParamValue('blankspecial') !== 'imagetopngconverter') {
        return;
    }

    function createConverter() {
        var container = document.createElement('div');
        container.className = 'tw-max-w-4xl tw-mx-auto tw-p-4';

        // Add title
        var title = document.createElement('h2');
        title.className = 'tw-text-2xl tw-font-bold tw-mb-4';
        title.textContent = 'Image to PNG Converter';
        container.appendChild(title);

        // Create upload section
        var uploadSection = document.createElement('div');
        uploadSection.className = 'tw-mb-6';

        // Local file input
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.className = 'tw-mb-4 tw-block';
        uploadSection.appendChild(fileInput);

        // OR separator
        var separator = document.createElement('div');
        separator.className = 'tw-text-center tw-my-4 tw-font-bold';
        separator.textContent = 'OR';
        uploadSection.appendChild(separator);

        // Wiki file search
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search wiki images (e.g., File:Example.jpg)';
        searchInput.className = 'tw-w-full tw-p-2 tw-border tw-rounded tw-mb-4';
        uploadSection.appendChild(searchInput);

        var searchResults = document.createElement('div');
        searchResults.className = 'tw-mb-4';
        uploadSection.appendChild(searchResults);

        container.appendChild(uploadSection);

        // Preview and convert section
        var previewSection = document.createElement('div');
        previewSection.className = 'tw-mb-6';
        
        var previewTitle = document.createElement('h3');
        previewTitle.className = 'tw-text-xl tw-font-bold tw-mb-2';
        previewTitle.textContent = 'Preview';
        previewSection.appendChild(previewTitle);

        var previewImage = document.createElement('img');
        previewImage.className = 'tw-max-w-full tw-h-auto tw-mb-4 tw-hidden';
        previewImage.crossOrigin = 'anonymous'; // Add crossOrigin attribute
        previewSection.appendChild(previewImage);

        var convertButton = document.createElement('button');
        convertButton.className = 'tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-hidden';
        convertButton.textContent = 'Convert to PNG';
        previewSection.appendChild(convertButton);

        var errorMessage = document.createElement('div');
        errorMessage.className = 'tw-text-red-500 tw-mt-2 tw-hidden';
        previewSection.appendChild(errorMessage);

        container.appendChild(previewSection);

        // Download section
        var downloadSection = document.createElement('div');
        downloadSection.className = 'tw-hidden';
        
        var downloadLink = document.createElement('a');
        downloadLink.className = 'tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-inline-block';
        downloadLink.textContent = 'Download PNG';
        downloadSection.appendChild(downloadLink);

        container.appendChild(downloadSection);

        function handleImageError() {
            errorMessage.textContent = 'Unable to load image. This might be due to cross-origin restrictions.';
            errorMessage.className = errorMessage.className.replace('tw-hidden', '');
        }

        // Add event listeners
        fileInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.className = previewImage.className.replace('tw-hidden', '');
                    convertButton.className = convertButton.className.replace('tw-hidden', '');
                    errorMessage.className += ' tw-hidden';
                };
                reader.readAsDataURL(file);
            }
        });

        searchInput.addEventListener('input', function() {
            var query = this.value;
            if (query.length < 3) {
                searchResults.innerHTML = '';
                return;
            }

            // Search wiki images using the MediaWiki API
            new mw.Api().get({
                action: 'query',
                list: 'search',
                srsearch: 'File:' + query,
                srnamespace: '6', // File namespace
                srlimit: 5
            }).then(function(data) {
                searchResults.innerHTML = '';
                if (data.query && data.query.search) {
                    data.query.search.forEach(function(result) {
                        var resultDiv = document.createElement('div');
                        resultDiv.className = 'tw-p-2 tw-cursor-pointer tw-hover:bg-gray-100';
                        resultDiv.textContent = result.title;
                        resultDiv.addEventListener('click', function() {
                            // Get image URL using the MediaWiki API
                            new mw.Api().get({
                                action: 'query',
                                titles: result.title,
                                prop: 'imageinfo',
                                iiprop: 'url'
                            }).then(function(data) {
                                var pages = data.query.pages;
                                var pageId = Object.keys(pages)[0];
                                var imageUrl = pages[pageId].imageinfo[0].url;
                                
                                // Try to load image with proxy if available
                                var proxyUrl = 'https://cors-anywhere.herokuapp.com/' + imageUrl;
                                previewImage.onerror = function() {
                                    // If proxy fails, try direct URL
                                    previewImage.onerror = handleImageError;
                                    previewImage.src = imageUrl;
                                };
                                previewImage.src = proxyUrl;
                                previewImage.className = previewImage.className.replace('tw-hidden', '');
                                convertButton.className = convertButton.className.replace('tw-hidden', '');
                                errorMessage.className += ' tw-hidden';
                            });
                        });
                        searchResults.appendChild(resultDiv);
                    });
                }
            });
        });

        convertButton.addEventListener('click', function() {
            try {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = previewImage.naturalWidth;
                canvas.height = previewImage.naturalHeight;
                ctx.drawImage(previewImage, 0, 0);
                
                try {
                    var dataUrl = canvas.toDataURL('image/png');
                    downloadLink.href = dataUrl;
                    downloadLink.download = 'converted_image.png';
                    downloadSection.className = downloadSection.className.replace('tw-hidden', '');
                    errorMessage.className += ' tw-hidden';
                } catch (e) {
                    throw new Error('Unable to convert image due to security restrictions. Try downloading the image first and then uploading it locally.');
                }
            } catch (e) {
                errorMessage.textContent = e.message;
                errorMessage.className = errorMessage.className.replace('tw-hidden', '');
                downloadSection.className += ' tw-hidden';
            }
        });

        // Replace content of Special:BlankPage
        var content = document.getElementById('mw-content-text');
        content.innerHTML = '';
        content.appendChild(container);
    }

    // Wait for MediaWiki to be ready
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(createConverter);
})();