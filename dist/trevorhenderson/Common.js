/* Any JavaScript here will be loaded for all users on every page load. */
window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for not following our local rules or continueing to break our rules, to appeal, please contact us on Community Central or reply to this message.'
};

// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};


/* collapsible rows in a table without making the whole table collapse */

$(function() {
    $('table.fandom-table.mw-collapsible').each(function(){
        var t = $(this);
        var t_id = t.attr('id');
        t.find($('a.mw-collapsible-text')).click(function() {
            if ($(this).parent().hasClass('mw-collapsible-toggle-expanded')) {
            var top = t[0].getBoundingClientRect().top; // position of table.
            var fandomHeaderHeight = 46; // floating Fandom header height.
            var y = top + window.pageYOffset - fandomHeaderHeight;
            if (top < 46) { // Don't scroll into view if already in view.
                window.scrollTo({top: y})
            }
        });
    });
});