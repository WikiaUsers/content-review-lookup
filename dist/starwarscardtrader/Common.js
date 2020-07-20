/* <pre><nowiki> */
/* Any JavaScript here will be loaded for all users on every page load. */

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
    if( wgUserName ) {
        $('.insertusername').text(wgUserName);
    }
}

/*
    When a page's title has text in optional parenthesis, reduce the font size of the text within parenthesis by adding <small> tags.
    If a page's title does not have any parenthesis, leave as is.
    Example 1: My Title (first edition) -> My Title (<small>first edition</small>)
    Example 2: My Title - second edition -> My Title - second edition
    Result: Only Example 1 is affected.
*/
function smallPageHeaderTitle() {
    var pgTitle = $('h1.page-header__title');
    var pgTitleNew = pgTitle.html().replace(/\([^\)]*?\)/g, '<small>$&</small>'); //add <small>...</small> tags
    pgTitle.html(pgTitleNew);
}

/*
    START OF UPLOAD FORM CUSTOMISATIONS
*/

/*
    Customise upload form description summary
*/
function setupUploadForm(){
    // Check to ensure its the correct upload form
    if ( $('#wpLicense').length && window.location.search.indexOf('wpForReUpload=1') == -1){
        
        // Update upload form - add {{Information}} template to summary box
        $('#wpUploadDescription').val('==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|filespecs=\r\n|licensing=\r\n|other_versions=\r\n|category=\r\n}}');

        // Check upload form on submit
        $('#mw-upload-form').bind('submit', verifyUploadForm);
    }
}

/*
    Validation check on upload form to check filename and mandatory fields are valid
*/
function verifyUploadForm(){
    var wpLicense = document.getElementById( 'wpLicense' );
    var wpUploadDescription = document.getElementById( 'wpUploadDescription' );
    var wpDestFileClass = document.getElementsByClassName("mw-htmlform-field-HTMLTextField");
    
    // Check summary includes a description
    if ( wpUploadDescription.value.match(/\|description=\n/g)) {
        alert('Please add a description.');
        return false;
    }

    // Check summary includes a source
    if ( wpUploadDescription.value.match(/\|source=\n/g)) {
        alert('Please add a source.');
        return false;
    }

    // Check summary includes a category
    if ( wpUploadDescription.value.match(/\|category=\n/g)) {
        alert('Please add a category.');
        return false;
    }

    // Check summary includes licensing or has been selected from the drop-down box
    if (( wpUploadDescription.value.match(/\|licensing=\n/g)) && ( wpLicense.selectedIndex === 0 )) {
        alert('Please enter licensing in the summary or select a valid licensing option from the drop-down.');
        return false;
    }
    
    // If licensing drop-down box has been selected, use that value in the summary licensing field
    if ( wpLicense.value !== '' ) {
        $( '#wpUploadDescription' ).val(
            $( '#wpUploadDescription' ).val().replace(/\|licensing=(.*?)\n/g, '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\n' )
        );
        
        // Reset licensing drop-down box as we don't need it now
        wpLicense.selectedIndex = 0;
    }
    
    // Iterate through each filename
    for(var i=0; i<wpDestFileClass.length; i++) {
        // Check if its a single file upload form as there is no index on id="wpDestFile"
        if (wpDestFileClass.length === 1) {
            i = "";
        }
        var wpDestFile = document.getElementById('wpDestFile'+i);
        
        // Check for duplicated or capitalized file extensions
        if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg.jpg|png.png|gif.gif|svg.svg)$/)) {
            alert('Please do not use capitalized or duplicated file extensions in the filename.');
            return false;
        }
        
        // Check for annoying characters
        if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
            alert('Please do not use parantheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
            return false;
        }
    }
    
    return true;
}

/*
    END OF UPLOAD FORM CUSTOMISATIONS
*/
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
    if( firstRun ) {
        firstRun = false;
    } else {
        return;
    }
    substUsername();
    smallPageHeaderTitle();
    setupUploadForm();
}

/* run loadFunc */
$( loadFunc );

// </nowiki></pre>