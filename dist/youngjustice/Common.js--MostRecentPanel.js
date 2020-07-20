/* Turns last panel tab into current
 * By: Duckey
 */
$(document).ready(function () {
    $('.pi-theme-lastpanel .pi-section-tab.pi-section-active, .pi-theme-lastpanel .pi-section-content.pi-section-active').removeClass('pi-section-active')
    $('.pi-theme-lastpanel .pi-section-tab:last-child, .pi-theme-lastpanel .pi-section-content:last-child').addClass('pi-section-active')
});