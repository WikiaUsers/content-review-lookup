/**
 * UserActivityTab/code.js
 * @file Adds custom profile tab linking to <code>w:Special:UserActivity</code>
 */
(function () {

    function getTheme() {
        return document.body.classList.contains("theme-fandomdesktop-dark");
    }

    function applyThemeIcon(img) {
        const light = img.dataset.light;
        const dark = img.dataset.dark;
        img.src = getTheme() ? dark : light;
    }

    function isOwnProfile() {
        const loggedInUser = mw.config.get("wgUserName");
        const profileUser = mw.config.get("profileUserName");
        return loggedInUser && profileUser && loggedInUser === profileUser;
    }

    function addTabs() {
        const nav = document.querySelector(".user-profile-navigation");
        if (!nav) return false;

        if (!isOwnProfile()) return true;

        if (nav.querySelector('[data-id="user-activity"]')) {
            return true;
        }

        const li = document.createElement("li");
        li.className = "user-profile-navigation__link";
        li.setAttribute("data-id", "user-activity");

        const a = document.createElement("a");
        a.href = "/wiki/w:Special:UserActivity";
        a.title = "Global User Activity";

        a.innerHTML = `
            <img class="user-activity-icon"
                 data-light="https://static.wikia.nocookie.net/battle-through-the-heavens/images/5/53/LIGHT_activity_icon.png/revision/latest?cb=20260415111712"
                 data-dark="https://static.wikia.nocookie.net/battle-through-the-heavens/images/1/1e/DARK_activity_icon.png/revision/latest?cb=20260415111749"
                 alt="">
            <span>User Activity</span>
        `;

        li.appendChild(a);
        nav.appendChild(li);

        applyThemeIcon(li.querySelector(".user-activity-icon"));

        return true;
    }

    function init() {
        if (addTabs()) return;

        const interval = setInterval(() => {
            if (addTabs()) clearInterval(interval);
        }, 300);
    }

    setInterval(() => {
        document.querySelectorAll(".user-activity-icon")
            .forEach(applyThemeIcon);
    }, 1000);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();