/* Any JavaScript here will be loaded for all users on every page load. */

/* Configuring AddRailModule */
window.AddRailModule = [
	{page: 'Template:RailModule', prepend: true},
	'Template:NewPagesModule'
];

/* Link Preview */
/* Config object */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/grimpapuff/images/1/11/Doesn%27t_exist.webp';
window.pPreview.RegExp.noinclude = [ "img", ".thumb", ".no-link-preview", ".reference", ".error" ];