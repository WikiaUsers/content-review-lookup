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

window.SpoilerAlertJS = {
    question: '不好意思！這個部分含有劇透內容。您確定要繼續瀏覽？',
    yes: '好呀',
    no: '不想',
    fadeDelay: 500
};

$(".sitenotice-tabs-container").each(function() {
	var container = $(this);
	function switchTab(offset) {
		return function() {
			var tabs = container.children(".sitenotice-tab").toArray();
			var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
			var count = tabs.length;
			if (no < 1) no = count;
			else if (no > count) no = 1;
			for (var i = 0; i < count; i++)
				tabs[i].style.display = (i + 1 == no ? null : "none");
			container.find(".sitenotice-tab-no")[0].innerText = no;
		};
	}
	container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
	container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
});