// Saves the page when Ctrl+S or Command+S is pressed
// Author: KurwaAntics

if ( $("body").hasClass("editor") ) {
    $(document).keydown(function(event) {
        if((event.ctrlKey || event.metaKey) && event.which == 83) {
            $('#wpSave').click();
            event.preventDefault();
            return false;
        }
    });
}