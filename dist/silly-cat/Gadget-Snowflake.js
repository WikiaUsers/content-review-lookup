// Silly christmas themed gadget
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});

window.snowStorm = { 
	flakesMax: 180,
	flakesMaxActive: 100,
	animationInterval: 35,
	excludeMobile: true,
	flakeBottom: false,
	followMouse: true,
	snowColor: '#fff',
	snowCharacter: '&bull,',
	snowStick: false,
	useMeltEffect: false,
	useTwinkleEffect: false,
	usePositionFixed: true,
	freezeOnBlur: false,
	windOffset: 1,
	windMultiplier: 2,
	flakeTypes: 6,
	vMaxX: 4,
	vMaxY: 3,
};