/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UTCClock/code.js',
    ]
});

(function() {
    const date = new Date();
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();
    let emoji = "";

    if (month === 2 && day === 14) { 
        emoji = "❤️"; // Valentine's Day
    } else if (month === 3 && day >= 20 && day <= 31) { 
        emoji = "🥚"; // Easter Season (adjust dates as needed)
    } else if (month === 10 && day === 31) { 
        emoji = "🎃"; // Halloween
    } else if (month === 12 && (day >= 20 && day <= 25)) { 
        emoji = "❄️"; // Christmas/Winter
    } else if (month === 1 && day === 1) {
        emoji = "✨"; // New Year's Day
    }

    if (emoji !== "") {
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'holiday-particle';
            particle.innerHTML = emoji;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.fontSize = (Math.random() * 10 + 20) + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => { particle.remove(); }, 6000);
        }
        setInterval(createParticle, 400);
    }
})();