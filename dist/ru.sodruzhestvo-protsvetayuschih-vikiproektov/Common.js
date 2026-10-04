window.MultiClockConfig = {
    interval: 500,
    separator: " —",
    clocks: [
        { 
            label: "Время UTC",
            offset: 0,
            color: "#f3db4b",
            format: "%2H:%2M:%2S %d %b %Y"
        },
        { 
            label: "Московское время",
            offset: 3,
            color: "#47e4e6",
            format: "%2H:%2M:%2S %d %b %Y"
        },
        { 
            label: "Местное время",
            offset: -(new Date().getTimezoneOffset() / 60),
            color: "#226f92", 
            format: "%2H:%2M:%2S" 
        }
    ]
};

importArticles({
	type: 'script',
	articles:
	[        
		'u:dev:MediaWiki:MultiClock.js',
	]});