/*********************************
 * Replace "Block PM" before PM was started (TODO)
 * observer or mouseevents or mutations
 */
 
/*********************************
 * Header links
 */
var headline_styles = 'display: inline-block; width: 300px; font-size: 12px; text-align: center; line-height: 14px; padding: 7px 0; font-weight: bold; color: #FFF; position: absolute; right: 160px;';  
var headline_bar = '<div style="' + headline_styles + '">Добро пожаловать на «The Elder Scrolls Wiki» чат!</br><a href="/wiki/The_Elder_Scrolls_Wiki:Правила_чата" target="_blank">Правила</a> — <a href="/wiki/Special:Forum" target="_blank">Форум</a> — <a href="https://discord.gg/vFUBU7w" target="_blank">Discord β</a></div>';
$('.ChatHeader > .wordmark').append(headline_bar);

/*********************************
 * SpeedEmoticon (more - [[:w:c:korniux:SpeedEmoticon]])
 */
 
importScriptPage('SpeedEmoticon/latest.js','korniux');

/*********************************
 * ModeratorTools - Multikick
 * Hosted on "KORNiUX's HUGE SANDBOX WIKI"'s CDN
 * Original authors you can see in *.js files
 */
 
var Moderators = ['TarrakoT', 'Лисохвост', 'Ииши', 'Plizirim', 'Idel sea Qatarhael', 'KORNiUX', 'Кистрел Дикин', 'Рептилия']; // Array of Moderators (by default) and Supports

for (var i = 0; i <= Moderators.length; i++) {
    if (Moderators[i] == wgUserName) {
        importScriptPage('CDN/callofduty4.multikick.js', 'korniux');
    }
}