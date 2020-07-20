/*********************************
 * Header links
 */
var headline_styles = 'display: inline-block; width: 300px; font-size: 12px; text-align: center; line-height: 14px; padding: 7px 0; font-weight: bold; color: #FFF; position: absolute; right: 160px;';  
var headline_bar = '<div style="' + headline_styles + '">Добро пожаловать в чат «Ведьмак Вики»!</br><a href="/wiki/Special:Forum" target="_blank">Форум</a> — <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики</a></div>';
$('.ChatHeader > .wordmark').append(headline_bar);
 
/*********************************
 * SpeedEmoticon (more - [[:w:c:korniux:SpeedEmoticon]])
 */
 
importScriptPage('SpeedEmoticon/latest.js','korniux');
 
/*********************************