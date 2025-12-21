// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js

$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/speedstorm/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230404145009').attr('title', 'This wiki is part of Fandom Compass')
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


importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:HTML5Audio/code.js'
    ]
});