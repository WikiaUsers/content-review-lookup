$(function () {
    $('.js-tzclock').each(function () {
        const observer = new MutationObserver(function () {
            $(this).find('*').each(function () {
                if (this.childNodes.length === 1 &&
                    this.childNodes[0].nodeType === Node.TEXT_NODE) {

                    this.textContent = this.textContent
                        .replace(/\bSun\b/g, 'Chủ Nhật')
                        .replace(/\bMon\b/g, 'Thứ Hai')
                        .replace(/\bTue\b/g, 'Thứ Ba')
                        .replace(/\bWed\b/g, 'Thứ Tư')
                        .replace(/\bThu\b/g, 'Thứ Năm')
                        .replace(/\bFri\b/g, 'Thứ Sáu')
                        .replace(/\bSat\b/g, 'Thứ Bảy')
                        .replace(/\bJan\b/g, 'tháng 1')
                        .replace(/\bFeb\b/g, 'tháng 2')
                        .replace(/\bMar\b/g, 'tháng 3')
                        .replace(/\bApr\b/g, 'tháng 4')
                        .replace(/\bMay\b/g, 'tháng 5')
                        .replace(/\bJun\b/g, 'tháng 6')
                        .replace(/\bJul\b/g, 'tháng 7')
                        .replace(/\bAug\b/g, 'tháng 8')
                        .replace(/\bSep\b/g, 'tháng 9')
                        .replace(/\bOct\b/g, 'tháng 10')
                        .replace(/\bNov\b/g, 'tháng 11')
                        .replace(/\bDec\b/g, 'tháng 12');
                }
            });
        }.bind(this));

        observer.observe(this, {
            childList: true,
            subtree: true
        });
    });
});