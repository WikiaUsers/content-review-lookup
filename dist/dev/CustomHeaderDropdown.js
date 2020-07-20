/* CustomHeaderDropdown
 *
 * Lets you customize the dropdown on the community header next to the wiki activity
 * 
 * @author Dorumin
 */

(function() {
    if (
        window.CustomHeaderDropdown && CustomHeaderDropdown.init
    ) return;

    window.CustomHeaderDropdown = $.extend({
        links: window.CustomHeaderLinks,
        $buttons: $('.wds-community-header__wiki-buttons'),
        buildDropdown: function(links) {
            var $dropdown = $('<ul>', {
                'class': 'wds-list wds-is-linked'
            });
            links.forEach(function(link) {
                $('<li>', {
                    append: $('<a>', link)
                }).appendTo($dropdown);
            });
            return $dropdown;
        },
        replaceDropdown: function($new) {
            this.$buttons.find('ul').replaceWith($new);
        },
        init: function() {
            if (!this.links) return;

            this.replaceDropdown(this.buildDropdown(this.links));
        }
    }, window.CustomHeaderDropdown);

    CustomHeaderDropdown.init();
})();