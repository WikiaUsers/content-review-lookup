// [[Category:Internal]]

// ===== Page Rating System (from fandom backrooms) =====
mw.hook('wikipage.content').add(function() {
	const api = new mw.Api();
	const page = mw.config.get('wgTitle');
	const localRatingsPage = `User:${mw.config.get('wgUserName')}/ratings.json`;
	const lastVoted = x => $('.rating-'+ x).hasClass('voted');
	const inc = x => x[' ' + page] ? x[' ' + page]++ : x[' ' + page] = 1;
	const dec = x => x[' ' + page] && x[' ' + page] > 1 ? x[' ' + page]-- : delete x[' ' + page];
	const sort = x => Object.fromEntries(Object.entries(x).sort((a, b) => b[1] - a[1]));
	var up = [];
	var down = [];
	var deleted = '';
	var globalUp, globalDown, deletedInLocal, deletedInGlobal, vote;
	
	Promise.all([
		fetch(`vi/wiki/${localRatingsPage}?action=raw`).then(response => response.ok && response.json()),
		fetch('vi/wiki/Wiki_Vietnamese_Backrooms:Ratings.json?action=raw').then(response => response.json())
	]).then(ratings => {
		if (ratings) {
			up = ratings[0].up;
			down = ratings[0].down;
			globalUp = ratings[1].globalUp;
			globalDown = ratings[1].globalDown;
		}
	})
	.then(() => {
		// Công cụ chuyển đổi tạm thời sang định dạng mục mới cho các tệp ratings.json cũ.
		up = up.map(entry => entry.replace(/_/g, ' '));
		down = down.map(entry => entry.replace(/_/g, ' '));
		globalUp = Object.fromEntries(Object.entries(globalUp).map(([key, value]) => [' ' + key.replace(/_/g, ' ').trim(), value]));
		globalDown = Object.fromEntries(Object.entries(globalDown).map(([key, value]) => [' ' + key.replace(/_/g, ' ').trim(), value]));
		// ----
		$('.page-header__meta').append(`<div class="page-rating">Rating:
			<span class="rating-up${up.includes(page) ? ' voted' : ''}">${+globalUp[' ' + page] || 0}</span>
			<span class="rating-down${down.includes(page) ? ' voted' : ''}">${+globalDown[' ' + page] || 0}</span>
		</div>`);
		
		$('[class*="rating-"]').click(function() {
			const votedUp = this.className.includes('up');
			if ($('.page-rating').hasClass('busy')) return;
			$('.page-rating').addClass('busy');
			setTimeout(() => $('.page-rating').removeClass('busy'), 1500);
			
			fetch('vi/wiki/Wiki_Vietnamese_Backrooms:Ratings.json?action=raw')
				.then(response => response.json())
				.then(ratings => {
					if (ratings) {
						globalUp = ratings.globalUp;
						globalDown = ratings.globalDown;
					}
					
					// Công cụ chuyển đổi tạm thời sang định dạng mục mới cho các tệp ratings.json cũ.
					globalUp = Object.fromEntries(Object.entries(globalUp).map(([key, value]) => [' ' + key.replace(/_/g, ' ').trim(), value]));
					globalDown = Object.fromEntries(Object.entries(globalDown).map(([key, value]) => [' ' + key.replace(/_/g, ' ').trim(), value]));
					// ----
					return Promise.all([...Object.keys(globalUp), ...Object.keys(globalDown)].join('|').match(/([^|]*\|){1,50}/g)
						.map(chunk => fetch(`/api.php?action=query&titles=${chunk.slice(0, -1)}&format=json`)
						.then(response => response.json())
						.then(json => Object.entries(json.query.pages).flat().filter(entry => entry.missing == '').map(entry => entry.title))));
				})
				.then(titles => {
					if (titles.flat().length) {
						deleted = 'and removed ratings for deleted pages ';
						titles.flat().forEach(title => {
							if (up.includes(title) || down.includes(title)) deletedInLocal = true;
							if (globalUp[' ' + title] || globalDown[' ' + title]) deletedInGlobal = true;
							up = up.filter(entry => entry != title);
							down = down.filter(entry => entry != title);
							delete globalUp[' ' + title];
							delete globalDown[' ' + title];
							deleted += `“[[${title}]]”, `;
						});
						deleted = deleted.slice(0, -2);
					}
					
					switch (true) {
						case votedUp && lastVoted('down'):
							$('.rating-down').removeClass('voted');
							$('.rating-down')[0].textContent--;
							this.textContent++;
							down.splice(down.indexOf(page), 1);
							up.push(page);
							vote = 'upvoted';
							dec(globalDown);
							inc(globalUp);
							break;
						case !votedUp && lastVoted('up'):
							$('.rating-up').removeClass('voted');
							$('.rating-up')[0].textContent--;
							this.textContent++;
							up.splice(up.indexOf(page), 1);
							down.push(page);
							vote = 'downvoted';
							dec(globalUp);
							inc(globalDown);
							break;
						case votedUp && lastVoted('up'):
							this.textContent--;
							up.splice(up.indexOf(page), 1);
							vote = 'revoked upvote from';
							dec(globalUp);
							break;
						case !votedUp && lastVoted('down'):
							this.textContent--;
							down.splice(down.indexOf(page), 1);
							vote = 'revoked downvote from';
							dec(globalDown);
							break;
						default:
							this.textContent++;
							if (votedUp) {
								up.push(page);
								vote = 'upvoted';
								inc(globalUp);
							} else {
								down.push(page);
								vote = 'downvoted';
								inc(globalDown);
							} break;
					}
					
					$(this).toggleClass('voted');
					api.postWithEditToken({
						action: 'edit',
						format: 'json',
						title: localRatingsPage,
						text: JSON.stringify({up, down}, null, '\t'),
						summary: `PageRating: ${vote} “[[${page}]]” ${deletedInLocal ? deleted : ''} locally`,
						tags: 'page-rating'
					});
					api.postWithEditToken({
						action: 'edit',
						format: 'json',
						title: 'Wiki_Vietnamese_Backrooms:Ratings.json',
						text: JSON.stringify({globalUp: sort(globalUp), globalDown: sort(globalDown)}, null, '\t'),
						summary: `PageRating: ${vote} “[[${page}]]” ${deletedInGlobal ? deleted : ''} globally\u200b`,
						tags: 'page-rating',
						watchlist: 'unwatch'
					});
				});
			});
		});
});

mw.hook('wikipage.content').add(function() {
	
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