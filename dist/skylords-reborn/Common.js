/* Any JavaScript here will be loaded for all users on every page load. */

/* flip thingy */
mw.hook('wikipage.content').add(function () {
	document.querySelectorAll('.flip-container').forEach(function (container) {
		var c = container.querySelectorAll('.flip-content-1,.flip-content-2');
		container.querySelectorAll('.flip-switch').forEach(function (sw) {
			sw.addEventListener('click', function () {
				c.forEach(function (el) {
					el.style.display = el.style.display === 'none' ? '' : 'none';
				});
			});
		});
	});
});

/* Image Loading Fix */
(function () {
    document.querySelectorAll('.lazyimg-wrapper img.lazyload').forEach(function (el) {
        el.classList.remove('lazyload');
        el.src = el.dataset.src;
    });
})();
(function () {
    document.querySelectorAll(':not(lazyimg-wrapper) .cv-card-container img.lazyload').forEach(function (el) {
        el.classList.remove('lazyload');
        el.src = el.dataset.src;
        el.loading = 'lazy';
    });
})();

/* Card Tooltip */
window.tooltips_list = [
    {
        classname: 'custom-tooltip',
        parse: '{' + '{#invoke:Tooltip|<#tt-type#>|1=<#1#>|2=<#2#>|3=<#3#>|4=<#4#>|5=<#5#>|6=<#6#>|7=<#7#>|8=<#8#>|9=<#9#>}}',
    },
];

window.tooltips_config = {
	offsetX: 15,
    offsetY: 15,
    noCSS: true,
};