(function () {
    var page = mw.config.get('wgCanonicalSpecialPageName');
    if (window.FileCategoryLoaded || !/Upload|MultipleUpload/g.test(page)) return;
    window.FileCategoryLoaded = true;
    var urlParams = new URLSearchParams(window.location.search);
    function setFileCategoryWithDelay(delay) {
        setTimeout(setFileCategory, delay);
    }
    function getCategoryForExtension(ext) {
        var categories = {
            'png': 'Images', 'gif': 'Images', 'jpg': 'Images', 'jpeg': 'Images',
            'webp': 'Images', 'ico': 'Images', 'svg': 'Images',
            'mp4': 'Videos', 'webm': 'Videos', 'mkv': 'Videos', 'mov': 'Videos',
            'mp3': 'Audio', 'ogg': 'Audio', 'oga': 'Audio', 'flac': 'Audio', 'wav': 'Audio',
            'pdf': 'Documents', 'odm': 'Documents'
        };
        return categories[ext];
    }
    function initFileCategory() {
        var fileInput = $('#wpDestFile');
        fileInput.on('input', function () {
            setFileCategoryWithDelay(100);
        });
        $('#wpUploadFile').on('change', function () {
            setFileCategoryWithDelay(300);
        });
        if (fileInput.val()) {
            setFileCategoryWithDelay(500);
        }
    }
    function setFileCategory() {
        var fileTitle = $('#wpDestFile').val();
        var actualFile = $('#wpUploadFile')[0].files[0];
        if (actualFile && !fileTitle) {
            fileTitle = actualFile.name;
        }
        if (!fileTitle) return;

        var ext = fileTitle.split('.').pop().toLowerCase();

        if (!ext || ext === fileTitle) return;
        var category = getCategoryForExtension(ext);
        if (category && urlParams.get('wpForReUpload') != 1) {
            $('#wpUploadDescription').val('[[' + 'Category:' + category + ']]');
        }
    }
    $(initFileCategory);
})();