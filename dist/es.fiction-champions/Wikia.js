/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:Disc',
    prepend: true,
    maxAge: 86400,
}, {
    // {{DiscussionsRailModule}}
    page: 'Template:Disc',
    maxAge: 86400,
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});