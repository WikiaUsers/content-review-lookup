/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
(function (window, $, mw) {
    variantDefault();
    function variantDefault() {
        var lV = document.getElementsByClassName('page__main')[0].getAttribute('lang');
        var tL = document.getElementsByClassName('tabberex');
        var gVD, gRVD;
        if (lV.indexOf('zh-Hans') !== -1) {
            gVD = 'data-hans-default';
        } else if (lV.indexOf('zh-Hant') !== -1) {
            gVD = 'data-hant-default';
        }
        if (lV === 'zh-Hans-CN') {
            gRVD = 'data-cn-default';
        }
        for (var i = 0; i < tL.length; i++) {
            if (tL[i].hasAttribute(gVD)) {
                var nVD = parseInt(tL[i].getAttribute(gVD), 10) - 1;
                tL[i].insertBefore(tL[i].childNodes[nVD], tL[i].childNodes[0]);
            }
            if (tL[i].hasAttribute(gRVD)) {
                var nRVD = parseInt(tL[i].getAttribute(gRVD), 10) - 1;
                tL[i].insertBefore(tL[i].childNodes[nRVD], tL[i].childNodes[0]);
            }
        }
    }
}(this, jQuery, mediaWiki));