/* Turns last panel tab into current
 * By: Duckey
 */
$(document).ready(function () {
    $('.pi-theme-lastpanel .pi-section-tab.pi-section-active, .pi-theme-lastpanel .pi-section-content.pi-section-active').removeClass('pi-section-active')
    $('.pi-theme-lastpanel .pi-section-tab:last-child, .pi-theme-lastpanel .pi-section-content:last-child').addClass('pi-section-active')
});
/* Replacement code for UCX */
$(document).ready(function () {
    $('.pi-theme-lastpanel .wds-tabs__tab.wds-is-current, .pi-theme-lastpanel .wds-tab__content.wds-is-current').removeClass('wds-is-current')
    $('.pi-theme-lastpanel .wds-tabs__tab:last-child, .pi-theme-lastpanel .wds-tab__content:last-child').addClass('wds-is-current')
});