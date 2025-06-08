/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});

/* Configuration for [[w:c:dev:ReferencePopups]] */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

/* Configuration for [[w:c:dev:MassEditConfig]] */
window.MassEditConfig = {
  interval: 1500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};

document.addEventListener('DOMContentLoaded', function () {
    const icon = document.querySelector('.community-navigation .search-toggle');
    const searchBox = document.querySelector('.community-navigation .fandom-sticky-header__search');

    if (icon && searchBox) {
        icon.addEventListener('click', function () {
            searchBox.style.display = (searchBox.style.display === 'none' || searchBox.style.display === '') ? 'block' : 'none';
        });
    }
});