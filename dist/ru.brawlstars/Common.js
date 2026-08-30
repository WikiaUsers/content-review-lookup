/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importArticles({
    type: 'script',
    articles: [
        'w:c:ru.sword-art-online:MediaWiki:RepeatableTimer.js',/* Таймер с Sword Art Online Wiki */
        'u:dev:ReferencePopups/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:TopEditors/code.js',
        "w:c:dev:MediaWiki:Countdown/code.js",
        "w:c:dev:MediaWiki:ProfileTags.js",
        "MediaWiki:OggPlayer.js"
    ]
});

/**Для шаблона Профиль2**/
(function () {
    'use strict';
    var API_URL =
        'https://brawl-profile.kirillkalin.workers.dev/players/';

    var RANK_TIERS = [
        { max: 749, rank: 'bronze' },
        { max: 1499, rank: 'silver' },
        { max: 2999, rank: 'gold' },
        { max: 4499, rank: 'diamond' },
        { max: 5999, rank: 'mythic' },
        { max: 8249, rank: 'legendary' },
        { max: 11249, rank: 'masters' },
        { max: Infinity, rank: 'pro' }
    ];

    function initBrawlProfiles() {
        var profiles =
            document.querySelectorAll('.bs-profile');
        console.log(
            '[Brawl Profile] найдено профилей:',
            profiles.length
        );
        profiles.forEach(function (profile) {
            loadProfile(profile);
        });
    }

    function loadProfile(profile) {
        var originalTag =
            profile.getAttribute('data-player-tag');

        if (!originalTag) {
            return;
        }
        var tag =
            originalTag
                .replace('#', '')
                .trim()
                .toUpperCase();
        console.log(
            '[Brawl Profile] загрузка #' + tag
        );
        fetch(
            API_URL + encodeURIComponent(tag)
        )
        .then(function (response) {
            if (!response.ok) {
                throw new Error(
                    'HTTP ' + response.status
                );
            }
            return response.json();
        })
        .then(function (data) {
            console.log(
                '[Brawl Profile] данные:',
                data
            );
            fillProfile(
                profile,
                data
            );
        })
        .catch(function (error) {
            console.error(
                '[Brawl Profile] ошибка:',
                error
            );
            setValue(
                profile,
                'name',
                'Не удалось загрузить профиль'
            );
        });
    }

    function fillProfile(profile, data) {
        setValue(
            profile,
            'name',
            data.name
        );
        setValue(
            profile,
            'tag',
            data.tag
        );
        setValue(
            profile,
            'trophies',
            formatNumber(data.trophies)
        );
        setValue(
            profile,
            'highestTrophies',
            formatNumber(data.highestTrophies)
        );
        setValue(
            profile,
            'brawlers',
            data.brawlers
                ? data.brawlers.length
                : 0
        );

        var currentElo =
            data.ranked && data.ranked.current
                ? data.ranked.current.elo
                : null;
        var peakElo =
            data.ranked && data.ranked.peak
                ? data.ranked.peak.elo
                : null;

        setValue(
            profile,
            'ranked',
            formatNumber(currentElo)
        );
        setValue(
            profile,
            'peakRanked',
            formatNumber(peakElo)
        );
        setRankIcon(profile, 'ranked', currentElo);
        setRankIcon(profile, 'peakRanked', peakElo);

        setValue(
            profile,
            'club',
            data.club
                ? data.club.name
                : 'Нет клуба'
        );
        setValue(
            profile,
            'clubTag',
            data.club && data.club.tag
                ? '(' + data.club.tag + ')'
                : ''
        );
    }

    function getRankName(elo) {
        for (var i = 0; i < RANK_TIERS.length; i++) {
            if (elo <= RANK_TIERS[i].max) {
                return RANK_TIERS[i].rank;
            }
        }
        return 'pro';
    }

    function setRankIcon(profile, field, elo) {
        var container = profile.querySelector(
            '[data-brawl-rank="' + field + '"]'
        );
        if (!container) {
            return;
        }
        var icons =
            container.querySelectorAll('.bs-rank-icon');
        var activeRank =
            elo === undefined || elo === null
                ? null
                : getRankName(Number(elo));
        icons.forEach(function (icon) {
            icon.style.display =
                icon.getAttribute('data-rank') === activeRank
                    ? 'inline-flex'
                    : 'none';
        });
    }

    function setValue(
        profile,
        field,
        value
    ) {
        var element =
            profile.querySelector(
                '[data-brawl="' +
                field +
                '"]'
            );
        if (!element) {
            return;
        }
        element.textContent =
            value === undefined ||
            value === null
                ? '—'
                : value;
    }

    function formatNumber(number) {
        if (
            number === undefined ||
            number === null
        ) {
            return '—';
        }
        return Number(number)
            .toLocaleString('ru-RU');
    }

    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            initBrawlProfiles
        );
    } else {
        initBrawlProfiles();
    }
})();