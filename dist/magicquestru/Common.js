/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});
});

window.DisplayClockJS = {
    format: '%2H:%2M:%2S %d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (Игро-время)',
    hoverText: 'Нубо-часы с 9 по 11 и 19 по 21 по Москве',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
    offset: 180 /* Time offset from UTC in minutes - 180 changes the clock from UTC to MST (Moscow Standard Time) */
};