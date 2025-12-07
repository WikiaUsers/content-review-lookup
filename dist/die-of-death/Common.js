
// --- Start of UserTags Configuration ---

window.UserTagsJS = {
    modules: {},
    tags: {
       // empty
    }
};

// This automatically finds all official Fandom ranks (Admin, Bureaucrat, Content Moderator, etc.)
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback'];

UserTagsJS.modules.custom = {
    // empty
};

// --- End of UserTags Configuration ---

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:MastheadRightsBadge.js'
	]
});

/* IT IS COMING */
var mp3Files = [
    "https://static.wikia.nocookie.net/die-of-death/images/b/b0/Horror1.mp3/revision/latest?cb=20251206162934&format=original",
    "https://static.wikia.nocookie.net/die-of-death/images/f/f4/Horror2.mp3/revision/latest?cb=20251206162935&format=original",
    "https://static.wikia.nocookie.net/die-of-death/images/6/6b/Horror3.mp3/revision/latest?cb=20251206162935&format=original",
    "https://static.wikia.nocookie.net/die-of-death/images/d/d7/Horror4.mp3/revision/latest?cb=20251206162935&format=original",
    "https://static.wikia.nocookie.net/die-of-death/images/6/65/Horror5.mp3/revision/latest?cb=20251206162936&format=original"
];

function getRandomMP3() {
    return mp3Files[Math.floor(Math.random() * mp3Files.length)];
}

function playRandomMP3() {
    var audio = new Audio(getRandomMP3());
    audio.volume = 1.0;
    audio.play().catch(err => {
        console.warn("Autoplay blocked:", err);
    });
}

function startRandomLoop() {
    function loop() {
        playRandomMP3();
        var delay = 5000 + Math.random() * 17000;
        setTimeout(loop, delay);
    }
    loop();
}

function enableAudioOnce() {
    startRandomLoop();

    document.removeEventListener("click", enableAudioOnce);
    document.removeEventListener("keydown", enableAudioOnce);
    document.removeEventListener("scroll", enableAudioOnce);
    document.removeEventListener("mousemove", enableAudioOnce);
}

document.addEventListener("click", enableAudioOnce);
document.addEventListener("keydown", enableAudioOnce);
document.addEventListener("scroll", enableAudioOnce);
document.addEventListener("mousemove", enableAudioOnce);