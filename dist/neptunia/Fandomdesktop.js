/* UTCClock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({type:'script', articles: ['u:dev:MediaWiki:UTCClock/code.js',]});