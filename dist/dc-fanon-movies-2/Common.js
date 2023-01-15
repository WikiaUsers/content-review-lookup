/* Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];

/* Reveals IPs belonging to anons.
 * See w:c:dev:RevealAnonIP for info & attribution.
 */

window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

/* Username replace function/feature. ([[Template:USERNAME]])
 * Inserts viewing user's name into <span class="insertusername"></span>.
 * Put text inside the spans to be viewed by logged out users.
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]].
 * jQuery version by [[wikia:User:Joeyaa]], written to be backwards compatible.
 */
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}