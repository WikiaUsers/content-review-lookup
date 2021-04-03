function createSidebarModule(heading, body, myClass) {
    var module = $('<section />')
                     .addClass('module')
                     .append(body);
    if(!!myClass.length) {
        module.addClass(myClass);
    }
    if(arguments.length == 4 && arguments[3]) {
        console.log('special sidebar item', arguments,module);
        module.addClass('sidebar-special-item');
        module.prepend(
            $('<div />').addClass('logo logo-fandom')
        );
    }
    else {
        var headerClass = myClass.length !== 0 ? myClass + '-heading' : 'heading';
        var header = !!heading.length ? $('<h2 />').addClass(!!myClass.length ? myClass + '-heading' : 'heading').html(heading) : '';
        module.prepend(header);
    }
    $(document).ready(function() {
        module.appendTo(
            $('.WikiaRail #WikiaRail')
        );
        console.log('created sidebar module', module);
    });
}
mw.hook('dev.sidebar').fire();

console.warn('Sidebar module loaded');
if($('.sidebar').length !== 0) {
    var myClass = $('.sidebar').attr('id').length !== 0 ? $('.sidebar').attr('id') : ' ';
    var heading = $('.sidebar .heading').length !== 0 ? $('.sidebar .heading').text() : ' ';
    var body = $('.sidebar .content');
    $('.sidebar').detach();
    createSidebarModule(heading, body, myClass);
}
else {
    console.warn('UI Element not found: Sidebar');
}