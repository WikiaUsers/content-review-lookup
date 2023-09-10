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

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
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
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});

switch (mw.config.get('wgPageName')) {
    case 'Musicbox':
        // 获取播放按钮的元素
        const playButton = document.querySelector('.play-button');

        // 获取音乐播放框的元素
        const musicBox = document.querySelector('.music-box');

        // 获取播放按钮文字的元素
        const playText = document.querySelector('.play-text');

        // 初始化播放状态为未播放
        let isPlaying = false;

        // 添加点击事件监听器，切换播放状态
        playButton.addEventListener('click', () => {
        // 切换播放状态
        isPlaying = !isPlaying;

        // 根据播放状态添加或移除播放样式类
        if (isPlaying) {
            musicBox.classList.add('playing');
            playText.textContent = "正在播放歌曲 〓"; // 修改播放状态下的文字
            playMusic(); // 播放音乐
        } else {
            musicBox.classList.remove('playing');
            playText.textContent = "点击播放歌曲 ▲"; // 恢复原始文字
            pauseMusic(); // 暂停音乐
        }
    });

        // 创建音频元素并加载音乐
        const audio = new Audio('your-music-url.mp3'); // 替换为实际音乐文件的URL

        // 播放音乐
        function playMusic() {
            audio.play();
        }

        // 暂停音乐并重置播放进度
        function pauseMusic() {
            audio.pause();
            audio.currentTime = 0; // 重置播放进度
    }
        break;
    case '另一頁面':
        // 這裡的JS會應用到"另一頁面"上
        break;
}