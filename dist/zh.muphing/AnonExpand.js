(function () {
    mw.hook("wikipage.content").add(zkAnonExpand);
    function zkAnonExpand() {
        if (mw.user.isAnon() && !localStorage.getItem('contentwidth')) {
            document.documentElement.classList.remove('is-content-expanded');
            document.querySelector('.content-size-toggle').click();
            document.documentElement.classList.add('is-content-expanded');
            localStorage.setItem('contentwidth', 'expanded');
        }
    }
})();