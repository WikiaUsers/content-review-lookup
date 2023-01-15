/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

/*
 * A faster alternative to importing stylesheets where API requests are not needed
 * HTML class "transcluded-css" comes from [[Template:CSS]]
 * After this CSS importing method is approved, the previous one will be removed soon
 */
mw.hook("wikipage.content").add(function() {
	mw.loader.using("mediawiki.util", function() {
		$("span.transcluded-css").each(function() {
			mw.util.addCSS($(this).text());
			$(this).remove();
		});
	});
});