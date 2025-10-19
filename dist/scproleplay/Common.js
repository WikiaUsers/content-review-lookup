/* Configuration for the Lock Old Comments JS. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = false;

/* Configuration for the SnowStorm gadget.
/* Hopefully fairly performant and almost issue-free.*/
window.snowStorm = { 
	excludeMobile: true,
	flakesMax: 36,
	flakesMaxActive: 36,
	animationInterval: 50,
	followMouse: false,
	snowColor: '#fff',
	snowStick: false,
	useMeltEffect: false,
	usePositionFixed: false,
	vMaxX: 4,
	vMaxY: 3,
	zIndex: -2, /* Behind all non-background elements, hopefully including ads. */
};