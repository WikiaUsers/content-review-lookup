$(function () {
    var main = document.getElementById('WikiaMainContent');
    if (!main) return;
    var to_move = main.getElementsByClassName('page-status')[0];
    var container = main.getElementsByClassName('WikiaMainContentContainer')[0];
    if (!to_move || !container) return;
    main.appendChild(to_move);
    main.insertBefore(to_move, container);
});