/* EN title */
(function() {
    var $ent = document.querySelector('#enTitle'),
        $header = document.querySelector('.page-header__title-wrapper');
    if ($ent && $header && !mw.config.get('wgIsMainPage')) {
        $ent.style.display = 'block';
        $header.appendChild($ent);
    }
})();