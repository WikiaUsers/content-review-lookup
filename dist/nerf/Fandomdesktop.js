// LinkPreview //
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
    window.pPreview.defimage = 'https://static.wikia.nocookie.net/nerf/images/e/e6/Site-logo.png';
    window.pPreview.noimage = 'https://static.wikia.nocookie.net/nerf/images/e/e6/Site-logo.png';
    window.pPreview.RegExp.noinclude = ['.nolinkprev'];
    window.pPreview.RegExp.ilinks = [new RegExp('^User.*'), new RegExp('^File:.*'), new RegExp('^Template:.*')];
    window.pPreview.RegExp.iimages = [new RegExp('^Badge-.*'), /Split_transp\.png/, /DiscBlaster\.png/, /NerfLogo_template\.png/, /Under_construction2\.png/, /DiscSeries-2\.png/, /1000px-Warning_sign\.png/, /Stub\.png/, /Update\.png/, /Padlock\.svg/, /Cscr-featured\.svg/];