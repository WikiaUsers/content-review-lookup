/** 
 * Any JavaScript here will be loaded for all users on every page load.
 * Various JS imports can be found on MediaWiki:ImportJS
 */
/* BEGIN customized upload form */
function setupUploadForm() {
    // If the user is NOT reuploading a file
    if (window.location.search.indexOf('wpForReUpload=1') == -1) {
        // Bind upload button to checkOverall function
        $('#mw-upload-form').bind('submit', checkOverall);

        // Hide existing Summary box
        $('tr.mw-htmlform-field-HTMLTextAreaField').hide();

        // Add new required row
        var $tbody = $('#mw-htmlform-description').children('tbody').eq(0);
        $tbody.append('<tr><td class="mw-label" style="width: 125px;">Categories:<br /><small>(separate with commas)</small></td><td class="mw-input"><input id="catsBox" size="60" placeholder="e.g. Guts, Griffith, Dragon Slayer, etc."></td></tr>');
    } else {
        $('#mw-upload-form').bind('submit', checkFilename);
    }
}

function checkOverall() {
    var $wpLicense = $('#wpLicense');
    var $wpDestFile = $('#wpDestFile');

    // Check for duplicated or capitalized file extensions
    if ($wpDestFile.val().match(/(JPG|JPEG|PNG|GIF|SVG|jpg.jpg|jpeg.jpeg|png.png|gif.gif|svg.svg)$/)) {
        alert('Please do not use capitalized or duplicated file extensions in the filename.');
        return false;
    }

    // Check for unnecessary characters
    if ($wpDestFile.val().match(/(\(|\)|!|\?|,|\+|\'|\’|\*)/)) {
        alert('Please do not use parentheses, slashes, punctuation marks, or any non-alphanumeric characters other than hyphens in your filename.');
        return false;
    }

    var $catsBox = $('#catsBox');
    var $categories = ($catsBox.val() !== '') ? $catsBox.val().replace(/,\s/g, '|').replace(/,/g, '|') + '|' : '';

    var fileinfo = '{{Fileinfo\r\n';
    fileinfo += '| license    = ' + $wpLicense.val() + '\r\n';
    fileinfo += '| categories = ' + $categories + '\r\n';
    fileinfo += '}}';

    $('#wpUploadDescription').val(fileinfo);

    $wpLicense.prop("selectedIndex", 0);

    return true;
}

function checkFilename() {
    var $wpDestFile = $('#wpDestFile');
    var $wpLicense = $('#wpLicense');

    // Check for duplicated or capitalized file extensions
    if ($wpDestFile.val().match(/(JPG|JPEG|PNG|GIF|SVG|jpg.jpg|jpeg.jpeg|png.png|gif.gif|svg.svg)$/)) {
        alert('Please do not use capitalized or duplicated file extensions in the filename.');
        return false;
    }

    // Check for unnecessary characters
    if ($wpDestFile.val().match(/(\(|\)|!|\?|,|\+|\'|\’|\*)/)) {
        alert('Please do not use parentheses, slashes, punctuation marks, or any non-alphanumeric characters other than hyphens in your filename.');
        return false;
    }

    return true;
}

if (wgCanonicalSpecialPageName === 'Upload') {
    setupUploadForm();
}

// Auto-refresh certain special pages
ajaxPages = ['Special:WikiActivity', 'Special:RecentChanges', 'Special:Watchlist', 'Special:Log', 'Special:Contributions'];
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

// Mark inactive users with an "inactive" tag
InactiveUsers = {
    months: 1
};

// Add custom class for styling long list of refs
if ($('.references li').length > 9) {
    $('.references').addClass('scrollbox');
}