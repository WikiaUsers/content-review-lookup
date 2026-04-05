mw.loader.using(['jquery']).then(function () {

    if (mw.config.get('wgAction') !== 'view') return;

    const logoUrl = 'https://static.wikia.nocookie.net/anime-paradox/images/f/f1/AO_Logo.png/revision/latest?cb=20260402124227'; 
    const sfxUrl = 'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/SFX.mp3/revision/latest?cb=20260402124908'; 

    const iconUrls = [
        'https://static.wikitide.net/animeoverloadwiki/thumb/f/f5/LIGHT.png/25px-LIGHT.png', 

        'https://static.wikitide.net/animeoverloadwiki/thumb/6/6d/FIRE.png/25px-FIRE.png', 

        'https://static.wikitide.net/animeoverloadwiki/thumb/3/35/NATURE.png/25px-NATURE.png', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006', 

        'https://static.wikia.nocookie.net/anime-paradox/images/d/dd/Discord.png/revision/latest?cb=20260206111006'  

    ];

    let waveIconsHTML = '';
    iconUrls.forEach(url => {
        waveIconsHTML += `<img src="${url}" class="wave-icon" alt="Attribute Icon" onerror="this.style.display='none'">`;
    });

    const loadingHTML = `
        <div id="custom-loading-screen">
            <img src="${logoUrl}" alt="Anime Overload" class="loading-logo" onerror="this.style.display='none'">
            <div class="loading-text">SUMMON. UPGRADE. <span class="overload-highlight">OVERLOAD.</span></div>
            <div class="icon-container">
                ${waveIconsHTML}
            </div>
        </div>
    `;

    $('body').append(loadingHTML);

    const popSound = new Audio(sfxUrl);
    popSound.volume = 0.5;

    $('a').on('click', function(e) {
        const targetUrl = $(this).attr('href');
        const isNewTab = $(this).attr('target') === '_blank';

        if (targetUrl && targetUrl.startsWith('/') && !targetUrl.startsWith('#') && !isNewTab && !targetUrl.includes('action=')) {
            e.preventDefault(); 

            popSound.currentTime = 0; 
            popSound.play().catch(err => console.log("Audio blocked by browser restrictions"));

            $('#custom-loading-screen').addClass('show-loading'); 

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 2000); 
        }
    });
});