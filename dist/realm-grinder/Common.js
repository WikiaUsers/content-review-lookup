// For http://realm-grinder.wikia.com/wiki/Sun_Force
if (mw.config.get('wgPageName') === 'Sun_Force') {
    var style = document.createElement('style');
    document.body.append(style);
    setInterval(function update() {
        var now = new Date();
        var utc = now.getUTCHours();
        utc -= utc % 6;
        var local = now.getHours();
        var localKey = '';
        if (local >= 5 && local < 8)
            localKey = 5;
        else if (local >= 18 && local < 21)
            localKey = 18;
        var styleStr = '.u-utc' + utc + (localKey && ', .u-local' + localKey) + ' {\n' +
        '  border-right: 10px solid black;\n' +
        '}';
        
        if (style.innerHTML !== styleStr)
            style.innerHTML = styleStr;
    }, 1000);
}