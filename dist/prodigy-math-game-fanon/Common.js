//ArticleRating Adjustments
window.ArticleRating = {
    title: 'Rating',
    values: ['Horrible', 'Bad', 'Fine', 'Good', 'Great'],
    starSize: [24, 24],
    starColor: ['#ccc', '#2d9bd6'],
    starStroke: '#000',
    exclude: ['Advertisement Page', 'Wizarding Guidelines', 'Warden Recreation Article', 'A Bigger World', 'Fanfictions', 'Category:OCs'],
    excludeCats: ['Category:Items', 'Category:OCs', 'Category:Categories'],
    location: 'top-rail'
};

//EditConflictAlert Adjustments
window.EditConflictAlertInterval = 7500;

//FloatingTableOfContents Adjustments
window.FloatingToc = {
    speed: 500,
    auto: false,
    enableKey: true
};

//BackToTopButton Adjustments
window.BackToTopModern = true;
window.BackToTopStart = 1500;
window.BackToTopSpeed = 400;

/* Remove "Chat Moderator" tags that FANDOM won't let us demote people from. */
Array.from($(".user-identity-header__tag")).forEach(element => {
    if(element.innerText == "Chat Moderator") {
        element.style.display = "none";
    }
});

dev:DiscordIntegrator/code.js
dev:WallGreeting.js
dev:Status/code.js
dev:AddRailModule/code.js
dev:MastheadGender/code.js
dev:User_Avatar_Finder/code.js
dev:ArticleCommentsHeader.js
dev:CodeQuickLinks/code.js
dev:ProfileTags.js
dev:DisplayTimer/code.js
dev:MastheadRightsBadge.js
dev:MarkBlocked.js
dev:NoLicenseWarning.js
dev:SeeMoreActivityButton/code.js
dev:InactiveUsers/code.js
dev:InputUsername/code.js