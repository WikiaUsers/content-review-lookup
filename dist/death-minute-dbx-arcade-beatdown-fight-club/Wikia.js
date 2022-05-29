window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}, {
    // {{CurrentBattle}}
    page: 'Template:CurrentBattle',
    maxAge: 86400,
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});