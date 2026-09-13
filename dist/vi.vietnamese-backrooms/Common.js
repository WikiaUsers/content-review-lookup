// [[Category:Internal]]

// ===== Page Rating System (v2) =====
(function () {
    'use strict';

    const VERSION = 'pagerating-v2';
    console.log(`[${VERSION}] Script loaded. ns=${mw.config.get('wgNamespaceNumber')}, groups=`, mw.config.get('wgUserGroups'));

    if (mw.config.get('wgNamespaceNumber') !== 0) {
        console.log(`[${VERSION}] Bỏ qua: không phải mainspace.`);
        return;
    }
    if (!mw.config.get('wgUserGroups', []).includes('autoconfirmed')) {
        console.log(`[${VERSION}] Bỏ qua: user chưa autoconfirmed.`);
        return;
    }

    const GLOBAL_PAGE = 'Wiki_Vietnamese_Backrooms:Ratings.json';
    const rawUrl = title => mw.util.getUrl(title, { action: 'raw' });

    mw.hook('wikipage.content').add(function () {
        console.log(`[${VERSION}] wikipage.content fired.`);

        const $meta = $('.page-header__meta');
        console.log(`[${VERSION}] .page-header__meta tìm thấy:`, $meta.length);
        if (!$meta.length) return;

        const api = new mw.Api();
        const page = mw.config.get('wgPageName');
        const localPage = `User:${mw.config.get('wgUserName')}/ratings.json`;

        const sort = obj => Object.keys(obj)
            .sort((a, b) => obj[b] - obj[a])
            .reduce((acc, k) => (acc[k] = obj[k], acc), {});

        let up = [], down = [], globalUp = {}, globalDown = {};

        function loadJson(title, fallback) {
            return fetch(rawUrl(title))
                .then(r => {
                    console.log(`[${VERSION}] GET ${title} → HTTP ${r.status}`);
                    return r.ok ? r.json() : fallback;
                })
                .catch(e => {
                    console.error(`[${VERSION}] Lỗi đọc ${title}:`, e);
                    return fallback;
                });
        }

        Promise.all([
            loadJson(localPage, { up: [], down: [] }),
            loadJson(GLOBAL_PAGE, { globalUp: {}, globalDown: {} })
        ]).then(([local, global]) => {
            up = local.up || [];
            down = local.down || [];
            globalUp = global.globalUp || {};
            globalDown = global.globalDown || {};
            render();
        });

        function render() {
		    $meta.find('.page-rating').remove();
		    $meta.append(`<div class="page-rating">Rating:
		        <span class="rating-up${up.includes(page) ? ' voted' : ''}">${+globalUp[page] || 0}</span>
		        <span class="rating-down${down.includes(page) ? ' voted' : ''}">${+globalDown[page] || 0}</span>
		        <span class="rating-cancel" title="Hủy vote">⛌</span>
		    </div>`);
		    console.log(`[${VERSION}] Đã render widget rating.`);
		
		    $meta.find('.rating-up, .rating-down').on('click', onVote);
		    $meta.find('.rating-cancel').on('click', onCancel);
		}
		function onCancel() {
		    const $box = $meta.find('.page-rating');
		    if ($box.hasClass('busy')) return;
		
		    const isUp = up.includes(page);
		    const isDown = down.includes(page);
		    if (!isUp && !isDown) return; // chưa vote thì không có gì để hủy
		
		    $box.addClass('busy');
		    setTimeout(() => $box.removeClass('busy'), 1500);
		
		    const dec = obj => (obj[page] && obj[page] > 1) ? obj[page]-- : delete obj[page];
		    let vote = '';
		
		    if (isUp) {
		        up.splice(up.indexOf(page), 1);
		        $meta.find('.rating-up').removeClass('voted')[0].textContent--;
		        dec(globalUp);
		        vote = 'revoked upvote from';
		    } else {
		        down.splice(down.indexOf(page), 1);
		        $meta.find('.rating-down').removeClass('voted')[0].textContent--;
		        dec(globalDown);
		        vote = 'revoked downvote from';
		    }
		
		    console.log(`[${VERSION}] Vote: ${vote} "${page}"`);
		
		    Promise.all([
		        api.postWithEditToken({
		            action: 'edit', format: 'json',
		            title: localPage,
		            text: JSON.stringify({ up, down }, null, '\t'),
		            summary: `PageRating: ${vote} "[[${page.replace(/_/g, ' ')}]]" locally`,
		            tags: 'page-rating'
		        }),
		        api.postWithEditToken({
		            action: 'edit', format: 'json',
		            title: GLOBAL_PAGE,
		            text: JSON.stringify({ globalUp: sort(globalUp), globalDown: sort(globalDown) }, null, '\t'),
		            summary: `PageRating: ${vote} "[[${page.replace(/_/g, ' ')}]]" globally`,
		            tags: 'page-rating'
		        })
		    ])
		    .then(() => console.log(`[${VERSION}] Lưu thành công.`))
		    .catch(e => console.error(`[${VERSION}] Lỗi khi lưu:`, e));
		}
        function onVote() {
            const el = this;
            const $el = $(el);
            const votedUp = el.className.includes('up');
            const $box = $meta.find('.page-rating');

            if ($box.hasClass('busy')) return;
            $box.addClass('busy');
            setTimeout(() => $box.removeClass('busy'), 1500);

            const lastVoted = dir => $meta.find('.rating-' + dir).hasClass('voted');
            const inc = obj => obj[page] ? obj[page]++ : obj[page] = 1;
            const dec = obj => (obj[page] && obj[page] > 1) ? obj[page]-- : delete obj[page];
            let vote = '';

            switch (true) {
                case votedUp && lastVoted('down'):
                    $meta.find('.rating-down').removeClass('voted')[0].textContent--;
                    el.textContent++;
                    down.splice(down.indexOf(page), 1);
                    up.push(page);
                    vote = 'upvoted';
                    dec(globalDown); inc(globalUp);
                    break;
                case !votedUp && lastVoted('up'):
                    $meta.find('.rating-up').removeClass('voted')[0].textContent--;
                    el.textContent++;
                    up.splice(up.indexOf(page), 1);
                    down.push(page);
                    vote = 'downvoted';
                    dec(globalUp); inc(globalDown);
                    break;
                case votedUp && lastVoted('up'):
                    el.textContent--;
                    up.splice(up.indexOf(page), 1);
                    vote = 'revoked upvote from';
                    dec(globalUp);
                    break;
                case !votedUp && lastVoted('down'):
                    el.textContent--;
                    down.splice(down.indexOf(page), 1);
                    vote = 'revoked downvote from';
                    dec(globalDown);
                    break;
                default:
                    el.textContent++;
                    if (votedUp) { up.push(page); vote = 'upvoted'; inc(globalUp); }
                    else { down.push(page); vote = 'downvoted'; inc(globalDown); }
            }

            $el.toggleClass('voted');
            console.log(`[${VERSION}] Vote: ${vote} "${page}"`);

            Promise.all([
                api.postWithEditToken({
                    action: 'edit', format: 'json',
                    title: localPage,
                    text: JSON.stringify({ up, down }, null, '\t'),
                    summary: `PageRating: ${vote} "[[${page.replace(/_/g, ' ')}]]" locally`,
                    tags: 'page-rating'
                }),
                api.postWithEditToken({
                    action: 'edit', format: 'json',
                    title: GLOBAL_PAGE,
                    text: JSON.stringify({ globalUp: sort(globalUp), globalDown: sort(globalDown) }, null, '\t'),
                    summary: `PageRating: ${vote} "[[${page.replace(/_/g, ' ')}]]" globally`,
                    tags: 'page-rating'
                })
            ])
            .then(() => console.log(`[${VERSION}] Lưu thành công.`))
            .catch(e => console.error(`[${VERSION}] Lỗi khi lưu:`, e));
        }
    });
})();

// Template dependencies
mw.hook("wikipage.content").add(function() {
	$('span.import-css').each(function () {
	    mw.util.addCSS($(this).attr('data-css'));
	});
	
		// [[T:CSS]]
	$('div.t-css').each(function() {
		const css = mw.util.addCSS(this.dataset.css);
		$(css.ownerNode).addClass('t-css');
		Object.assign(css.ownerNode.dataset, this.dataset);
		delete css.ownerNode.dataset.css;
		
		const wait = this.dataset.wait;
		const portal = this.dataset.portal;
		
		if (wait != 'none') {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != 'none') {
			css.disabled = true;
			$('.t-css-portal-' + portal).click(() => css.disabled = !css.disabled);
		}
	});
	
	// Automatically preview CSS pages; uses T:CSS class to also be affected by ThemeToggler
	if (mw.config.get('wgPageName').includes('.css')) { 
		fetch(`/wiki/${mw.config.get('wgPageName')}?action=raw`)
			.then(data => data.text())
			.then(css => $(mw.util.addCSS(css).ownerNode).addClass('t-css'));
	}

	// [[Template:Audio]] toggle
	$(".t-audio").each(function() {
		const toggle = $(this).attr("data-toggle");
		const toggleFunction = $(this).attr("data-toggle-function");
		const fadeSteps = Math.round(250 * toggleFunction.replace(/fade-(in|out)-/, ""));
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				const audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				switch (true) {
					case toggleFunction.includes("time"):
						audio.currentTime = toggleFunction.replace("time-", "");
						audio.play();
						break;
					case toggleFunction.includes("fade-in"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((-i + fadeSteps) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					case toggleFunction.includes("fade-out"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((i) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					default:
						audio.paused ? audio.play() : audio.pause();
						break;
				}
			});
		}
	});
});



// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js
$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230720221916').attr('title', 'This wiki is part of Fandom Compass')
));

// Biến để theo dõi template hiện tại
let currentTemplate = 'meg-theme';

// Hàm chuyển đổi template
function toggleTemplate() {
    // Ẩn template hiện tại
    document.getElementById(currentTemplate).classList.remove('active');
    
    // Chuyển đổi template
    if (currentTemplate === 'meg-theme') {
        currentTemplate = 'hallprint-theme';
    } else {
        currentTemplate = 'meg-theme';
    }
    
    // Hiển thị template mới
    document.getElementById(currentTemplate).classList.add('active');
    
    // Cập nhật nội dung nút (tuỳ chọn)
    updateButtonText();
}

// Hàm cập nhật văn bản nút (tuỳ chọn)
function updateButtonText() {
    const button = document.querySelector('.template-toggle-btn');
    if (currentTemplate === 'meg-theme') {
        button.textContent = 'Chuyển sang Hallprint Theme';
    } else {
        button.textContent = 'Chuyển sang MEG Theme';
    }
}

// Khởi tạo nút khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    updateButtonText();
});




function getOrCreateAudio(player) {
	var audio = player.querySelector('audio');
	if (audio) return audio;

	var fileName = player.dataset.file;
	if (!fileName) return null;

	audio = document.createElement('audio');
	audio.src = '/wiki/Special:FilePath/' + encodeURIComponent(fileName);
	audio.preload = 'metadata';
	player.appendChild(audio);

	var progress = player.querySelector('.progress');
	var playBtn = player.querySelector('.play-btn');
	var pauseBtn = player.querySelector('.pause-btn');

	audio.addEventListener('timeupdate', function () {
		if (audio.duration && progress) {
			progress.style.width = (audio.currentTime / audio.duration) * 100 + '%';
		}
	});

	audio.addEventListener('ended', function () {
		if (pauseBtn) pauseBtn.style.display = 'none';
		if (playBtn) playBtn.style.display = 'inline-flex';
		if (progress) progress.style.width = '0%';
	});

	return audio;
}

document.addEventListener('click', function (e) {
	var playBtn = e.target.closest('.play-btn');
	var pauseBtn = e.target.closest('.pause-btn');
	var progressBar = e.target.closest('.progress-bar');

	if (playBtn) {
		var player1 = playBtn.closest('.audio-player');
		if (!player1) return;
		var audio1 = getOrCreateAudio(player1);
		if (!audio1) return;
		audio1.play();
		playBtn.style.display = 'none';
		var pb1 = player1.querySelector('.pause-btn');
		if (pb1) pb1.style.display = 'inline-flex';
		return;
	}

	if (pauseBtn) {
		var player2 = pauseBtn.closest('.audio-player');
		if (!player2) return;
		var audio2 = player2.querySelector('audio');
		if (!audio2) return;
		audio2.pause();
		pauseBtn.style.display = 'none';
		var pl2 = player2.querySelector('.play-btn');
		if (pl2) pl2.style.display = 'inline-flex';
		return;
	}

	if (progressBar) {
		var player3 = progressBar.closest('.audio-player');
		if (!player3) return;
		var audio3 = player3.querySelector('audio');
		if (!audio3 || !audio3.duration) return;
		var rect = progressBar.getBoundingClientRect();
		var ratio = (e.clientX - rect.left) / rect.width;
		audio3.currentTime = ratio * audio3.duration;
	}
});


document.addEventListener("click", function (e) {
  // Music card play/pause
  var playBtn = e.target.closest(".play-pause-button");
  if (playBtn) {
    var card = playBtn.closest(".main-music-card");
    if (card) card.classList.toggle("is-paused");
  }

  // Collapse box
  var header = e.target.closest(".dfc-header");
  if (header) {
    var box = header.closest(".dfc-collapse");
    if (box) box.classList.toggle("open");
  }
});