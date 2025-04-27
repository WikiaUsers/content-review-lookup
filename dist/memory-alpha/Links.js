'use strict';
$(() => {
	const server = mw.config.get('wgServer');
	const links = $(`.internal-external-link [href^="${server}/"]`);
	links.removeAttr('target rel class');
});