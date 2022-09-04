/* Any JavaScript here will be loaded for all users on every page load. */
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'https://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Muckraker',
		'mini-sysop': { u: 'Half Administrator', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Spamdal Janitor', link:'Project:Janitors' }