// ClassicModIcons script
// usergroup class addition
$(function() {
    function addClass(m) {
        $(m.view.el).addClass(m.attributes.groups.join(' '));
    }
    mainRoom.model.users.models.forEach(addClass);
    mainRoom.bind('afterJoin', addClass);
    $('#ChatHeader').children('.User').addClass($('#user-' + wgUserName.replace(' ', '_').replace(/["']/g, '')).attr('class'));
});
// classic icon CSS import
importArticle({
    type: 'style',
    article: 'u:dev:MediaWiki:ClassicModIcons.css'
});