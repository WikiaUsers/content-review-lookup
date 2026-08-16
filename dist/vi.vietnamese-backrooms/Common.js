// [[Category:Internal]]

(function () {
	'use strict';

	var TARGET_WIDTH = 600;

	function fixImage(img) {
		if (img.dataset.resized === '1') return;
		var src = img.getAttribute('src');
		if (!src) return;
		var newSrc = src.replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/' + TARGET_WIDTH);
		if (newSrc !== src) {
			img.setAttribute('src', newSrc);
			img.removeAttribute('srcset');
		}
		img.dataset.resized = '1';
	}

	function run() {
		var imgs = document.querySelectorAll('main.page__main .page-content .thumbimage:not([data-resized])');
		imgs.forEach(fixImage);
	}

	mw.hook('wikipage.content').add(function () {
		run();
	});
}());

// Template dependencies
mw.hook("wikipage.content").add(function() {
	
	// [[Module:CSS]]; [[T:CSS]]
	$("span.import-css").each(function() {
		const css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		const wait = $(this).attr("data-wait");
		const portal = $(this).attr("data-portal");
		var portalOpened = false;
		
		if (wait != "none") {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != "none") {
			css.disabled = true;
			$(".t-css-portal-" + portal).click(function() {
				css.disabled = !css.disabled;
				portalOpened = true;
			});
		}
		
		$(".theme-toggler").click(function() {
			switch (true) {
				case wait != "none":
					if (timer || css.disabled == false) {
						clearTimeout(timer);
						timer = false;
						css.disabled = true;
					} else css.disabled = false;
					break;
				case portal != "none":
					if (portalOpened) css.disabled = !css.disabled;
					break;
				default:
					css.disabled = !css.disabled;
					break;
			}
		});
	});
	
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