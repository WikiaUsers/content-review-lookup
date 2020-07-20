/* Any JavaScript here will be loaded for all users on every page load. */

// Expand
var state =0;
(function() {
    $('#collapse-global').html($('<a>', {
        'class': 'wikia-button',
        text: 'Expand/Collapse All'
    })).click(function() {
        if(state ===0){
        $('.mw-collapsible-toggle-expanded').click();
        state = 1;
        this.text('Collapse');
        }
        else {
            $('.mw-collapsible-toggle-collapsed').click();
            state = 0;
            this.text('Expand');
            
        }
       }
)})();