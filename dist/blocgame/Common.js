/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:FloatingToc/code.js",
	"u:dev:DisplayClock/code.js",
    ]
});

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
//window.DisplayClockJS = '%2I:%2M:%2S %p %2d //%{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
window.DisplayClockJS = "UTC %Y %b %d %{Sun;Mon;Tue;Wed;Thu;Fri;Sat}w %2H:%2M:%2S; −8h";