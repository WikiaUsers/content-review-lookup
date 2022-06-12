/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

window.SpoilerAlertJS = {
    question: '不好意思！這個部分含有劇透內容。您確定要繼續瀏覽？',
    yes: '好呀',
    no: '不想',
    fadeDelay: 500
};