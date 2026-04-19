dev:InputUsername/code.js
dev:User Avatar Finder/code.js

// Display 12 hour time followed by day, month (English, full name) and year with "(UTC)" at the end //
window.DisplayClockJS = {
    format: '%2I:%29M:%0S %p %19d %B %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (BST)',
    hoverText: 'This is what the user sees when they hover their mouse over the link',
    interval: 1000, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'toolbar',
    monofonts: 'Zeronero', /* The font the clock uses by default */
    offset: 1 /* Time offset from UTC in minutes - 1 change the clock from UTC to BST (British Summer Time) */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});