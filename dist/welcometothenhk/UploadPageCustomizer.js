(function () {
    var page = mw.config.get('wgCanonicalSpecialPageName');
    if (window.FileCategoryLoaded || !/Upload|MultipleUpload/g.test(page)) return;
    window.FileCategoryLoaded = true;

    var urlParams = new URLSearchParams(window.location.search);

    $(function () {
        initFileCategory();
    });

    function initFileCategory() {
        var fileInput = $('#wpDestFile');

        fileInput.on('input', function () {
            setTimeout(setFileCategory, 100);
        });

        $('#wpUploadFile').on('change', function () {
            setTimeout(setFileCategory, 300);
        });

        if (fileInput.val()) {
            setTimeout(setFileCategory, 500);
        }
    }

    function setFileCategory() {
        var fileTitle = $('#wpDestFile').val() || '';
        var actualFile = $('#wpUploadFile')[0].files[0];

        if (actualFile && !fileTitle) {
            fileTitle = actualFile.name;
        }

        var ext = fileTitle.split('.').pop().toLowerCase();
        if (!ext || ext === fileTitle) return;

        var categories = {
            images: ['png', 'gif', 'jpg', 'jpeg', 'webp', 'ico', 'svg'],
            videos: ['mp4', 'webm', 'mkv', 'mov'],
            audio: ['mp3', 'ogg', 'oga', 'flac', 'wav'],
            documents: ['pdf', 'odm']
        };

        var category = Object.keys(categories).find(function (key) {
            return categories[key].includes(ext);
        });

        if (category && urlParams.get('wpForReUpload') != 1) {
            $('#wpUploadDescription').val('[[' + 'Category:' + category.charAt(0).toUpperCase() + category.slice(1) + ']]');
        }
    }
})();