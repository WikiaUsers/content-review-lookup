/**
 * 阿尔林铎纪年历
 *
 * 历法规则：
 *   - 起点：2024-02-27 00:00:00 +08:00 = 第1大刻·第1小刻·第1日
 *   - 1阿尔林铎日 = 13地球小时 = 2工作时段(各6h) + 2交界(各0.5h)
 *   - 1大刻 = 80小刻 ≈ 3.54地球年
 *   - 小刻6/12/18/.../78 为闰月(29天)，其余为平月(30天)
 *   - 1大刻总天数 = 2387阿尔林铎日
 */

(function () {
    'use strict';

    // ===== 配置常量 =====
    var START_MS = Date.parse('2024-02-27T00:00:00+08:00');
    var ALR_DAY_MS = 13 * 3600 * 1000;   // 1阿尔林铎日 = 13地球小时
    var SMALL_NORMAL = 30;
    var SMALL_LEAP = 29;
    var SMALL_PER_GREAT = 80;
    var EARTH_DAY = 86400000;

    // 闰小刻判定：第6,12,18,...,78
    function isLeapSmall(i) { return i % 6 === 0; }

    // 计算1大刻总天数（2387）
    function daysOfGreat() {
        var d = 0;
        for (var i = 1; i <= SMALL_PER_GREAT; i++) {
            d += isLeapSmall(i) ? SMALL_LEAP : SMALL_NORMAL;
        }
        return d;
    }
    var GREAT_DAYS = daysOfGreat();

    // 每小刻天数预计算表
    var SMALL_LEN = [];
    for (var si = 1; si <= SMALL_PER_GREAT; si++) {
        SMALL_LEN.push(isLeapSmall(si) ? SMALL_LEAP : SMALL_NORMAL);
    }

    // ===== 节日配置 =====
    var FESTIVALS = {
        '1-1-1':   '发售日'
    };

    // ===== 工具函数 =====
    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function daysToAlrin(totalDays) {
        if (totalDays < 0) totalDays = 0;
        var great = Math.floor(totalDays / GREAT_DAYS) + 1;
        var rest = totalDays % GREAT_DAYS;
        var small = 1, acc = 0;
        for (var i = 0; i < SMALL_PER_GREAT; i++) {
            if (rest < acc + SMALL_LEN[i]) { small = i + 1; break; }
            acc += SMALL_LEN[i];
        }
        return { great: great, small: small, day: rest - acc + 1 };
    }

    function currentTotalDays(manualOffsetDays) {
        var diff = Date.now() - START_MS + manualOffsetDays * ALR_DAY_MS;
        if (diff < 0) diff = 0;
        return Math.floor(diff / ALR_DAY_MS);
    }

    function greatSmallToTotalDays(great, small) {
        var td = (great - 1) * GREAT_DAYS;
        for (var i = 1; i < small; i++) td += SMALL_LEN[i - 1];
        return td;
    }

    function alrinToEarth(great, small, day) {
        var days = (great - 1) * GREAT_DAYS;
        for (var i = 1; i < small; i++) days += SMALL_LEN[i - 1];
        days += (day - 1);
        return new Date(START_MS + days * ALR_DAY_MS);
    }

    function fmtEarth(date) {
        var wk = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) +
            ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) +
            '（周' + wk + '）';
    }

    // 发售至今（返回纯数字对象）
    function getElapsed() {
        var diff = Date.now() - START_MS;
        if (diff < 0) return null;
        var days = Math.floor(diff / EARTH_DAY);
        var rem = diff % EARTH_DAY;
        var h = Math.floor(rem / 3600000);
        rem %= 3600000;
        var m = Math.floor(rem / 60000);
        return { days: days, hours: h, mins: m };
    }

    // ===== 状态 =====
    var manualOffsetDays = 0;
    var selectedDay = null;

    // ===== 核心：获取当前视图的历法信息 =====
    function getNowAlrin() {
        var totalDays = currentTotalDays(manualOffsetDays);
        var pos = daysToAlrin(totalDays);

        var secInDay = getDayFraction() * 13 * 3600;
        var periodName, periodHour;
        if (secInDay < 6 * 3600) {
            periodName = '工作时段Ⅰ';
            periodHour = secInDay / 3600;
        } else if (secInDay < 6.5 * 3600) {
            periodName = '交界Ⅰ';
            periodHour = (secInDay - 6 * 3600) / 3600;
        } else if (secInDay < 12.5 * 3600) {
            periodName = '工作时段Ⅱ';
            periodHour = (secInDay - 6.5 * 3600) / 3600;
        } else {
            periodName = '交界Ⅱ';
            periodHour = (secInDay - 12.5 * 3600) / 3600;
        }

        return {
            great: pos.great, small: pos.small, day: pos.day,
            periodName: periodName, periodHour: periodHour,
            leap: isLeapSmall(pos.small)
        };
    }

    function getDayFraction() {
        var diff = Date.now() - START_MS + manualOffsetDays * ALR_DAY_MS;
        if (diff < 0) diff = 0;
        var exact = diff / ALR_DAY_MS;
        return exact - Math.floor(exact);
    }

    // ===== 独立计时挂载点：更新 #arl-elapsed =====
    function updateElapsedMount() {
        var el = document.getElementById('arl-elapsed');
        if (!el) return;

        var elapsed = getElapsed();
        if (!elapsed) {
            el.innerHTML = '--';
            window.__arlElapsedDays = 0;
            window.__arlElapsed = null;
            return;
        }

        // 读取自定义格式，默认 "{d}天{h}时{m}分"
        var format = el.getAttribute('data-format') || '{d}天{h}时{m}分';

        // 构建带 class 的 span 版本
        var daysSpan = '<span class="arl-days">' + elapsed.days + '</span>';
        var hoursSpan = '<span class="arl-hours">' + elapsed.hours + '</span>';
        var minsSpan = '<span class="arl-mins">' + elapsed.mins + '</span>';

        var displayHtml = mw.html.escape(format)
            .replace('{d}', daysSpan)
            .replace('{h}', hoursSpan)
            .replace('{m}', minsSpan);

        el.innerHTML = displayHtml;

        // 仍然保留 dataset 和全局变量
        el.dataset.days = elapsed.days;
        el.dataset.hours = elapsed.hours;
        el.dataset.minutes = elapsed.mins;
        window.__arlElapsedDays = elapsed.days;
        window.__arlElapsed = elapsed;
    }

    // ===== 渲染日历 DOM =====
    function render(mountEl) {
        var now = getNowAlrin();
        if (!now) return;

        mountEl.innerHTML = '';

        var cal = document.createElement('div');
        cal.style.cssText = 'float:right;width:260px;margin:0 0 15px 15px;padding:10px;' +
            'background:#CFCED3;border-radius:12px;box-shadow:0 0 12px rgba(0,0,0,0.28);' +
            'font-size:12px;color:#333;line-height:1.4;box-sizing:border-box;overflow:hidden;';

        // 标题
        var titleEl = document.createElement('div');
        titleEl.style.cssText = 'text-align:center;font-size:15px;font-weight:bold;color:#2735BA;';
        titleEl.textContent = '阿尔林铎纪年历';
        cal.appendChild(titleEl);

        // 分割线
        var sep1 = document.createElement('div');
        sep1.style.cssText = 'height:1px;background:linear-gradient(90deg,transparent,rgba(39,53,186,0.55),transparent);margin:6px 0 8px 0;';
        cal.appendChild(sep1);

        // 导航栏
        var nav = document.createElement('div');
        nav.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:4px;margin-bottom:6px;';

        var btnPrevY = makeBtn('‹‹', '减1大刻', function () {
            shiftOffset(-GREAT_DAYS);
        });
        var btnPrevM = makeBtn('‹', '减1小刻', function () {
            var cur = daysToAlrin(currentTotalDays(manualOffsetDays));
            var target;
            if (cur.small > 1) target = greatSmallToTotalDays(cur.great, cur.small - 1);
            else if (cur.great > 1) target = greatSmallToTotalDays(cur.great - 1, SMALL_PER_GREAT);
            else target = 0;
            setTotalDays(target);
        });

        var titleWrapper = document.createElement('div');
        titleWrapper.style.cssText = 'flex:1;text-align:center;cursor:pointer;';
        titleWrapper.title = '单击回到实时模式';
        var titleDiv = document.createElement('div');
        titleDiv.style.cssText = 'font-size:13px;font-weight:bold;color:#1a1a1a;';
        titleDiv.textContent = '第' + now.great + '大刻·第' + now.small + '小刻';
        titleWrapper.appendChild(titleDiv);

        titleWrapper.addEventListener('click', function () {
            manualOffsetDays = 0;
            selectedDay = null;
            window.__arlDetail = '';
            render(mountEl);
        });

        var btnNextM = makeBtn('›', '加1小刻', function () {
            var cur = daysToAlrin(currentTotalDays(manualOffsetDays));
            var target;
            if (cur.small < SMALL_PER_GREAT) target = greatSmallToTotalDays(cur.great, cur.small + 1);
            else target = greatSmallToTotalDays(cur.great + 1, 1);
            setTotalDays(target);
        });
        var btnNextY = makeBtn('››', '加1大刻', function () {
            var cur = currentTotalDays(manualOffsetDays);
            setTotalDays(cur + GREAT_DAYS);
        });

        nav.appendChild(btnPrevY);
        nav.appendChild(btnPrevM);
        nav.appendChild(titleWrapper);
        nav.appendChild(btnNextM);
        nav.appendChild(btnNextY);
        cal.appendChild(nav);

        // 网格
        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:3px;';
        cal.appendChild(grid);

        var weekdays = ['一', '二', '三', '四', '五', '六', '日'];
        for (var wi = 0; wi < 7; wi++) {
            var wh = document.createElement('div');
            wh.style.cssText = 'text-align:center;color:#555;font-weight:700;font-size:10.5px;padding:3px 0;';
            wh.textContent = weekdays[wi];
            grid.appendChild(wh);
        }

        var smallLen = now.leap ? SMALL_LEAP : SMALL_NORMAL;
        var offset = (now.small - 1) % 7;
        for (var e = 0; e < offset; e++) {
            var emp = document.createElement('div');
            emp.style.cssText = 'visibility:hidden;';
            grid.appendChild(emp);
        }

        for (var d = 1; d <= smallLen; d++) {
            var festKey = now.great + '-' + now.small + '-' + d;
            var festName = FESTIVALS[festKey];
            var isToday = (now.day === d);
            var isSelected = (selectedDay === d);

            var bg, fg, fw, title;
            if (isSelected) {
                bg = '#ff8c00'; fg = '#fff'; fw = 'bold';
                title = '★ 已选中';
            } else if (festName) {
                bg = '#ffd700'; fg = '#5a3a00'; fw = 'bold';
                title = '★ ' + festName + '（点击查看地球日期）';
            } else if (isToday) {
                bg = '#2735BA'; fg = '#fff'; fw = 'bold';
                title = '今日（点击查看地球日期）';
            } else {
                bg = 'rgba(255,255,255,0.65)'; fg = '#333'; fw = 'normal';
                title = '第' + d + '日（点击查看地球日期）';
            }

            var cell = document.createElement('div');
            cell.style.cssText = 'text-align:center;padding:5px 0;border-radius:6px;' +
                'background:' + bg + ';color:' + fg + ';font-weight:' + fw + ';' +
                'font-size:11px;cursor:pointer;';
            cell.textContent = d;
            cell.title = title;

            (function (dayNum) {
                cell.addEventListener('click', function () {
                    if (selectedDay === dayNum) { selectedDay = null; render(mountEl); return; }
                    selectedDay = dayNum;
                    var ed = alrinToEarth(now.great, now.small, dayNum);
                    var fk = now.great + '-' + now.small + '-' + dayNum;
                    var fn = FESTIVALS[fk];
                    var prefix = fn ? '★ ' + fn + ' · ' : '';
                    window.__arlDetail = '<b>第' + now.great + '大刻·第' + now.small + '小刻·第' + dayNum + '日</b><br>' + prefix + '地球时间：' + fmtEarth(ed);
                    render(mountEl);
                });
            })(d);

            grid.appendChild(cell);
        }

        var totalCells = offset + smallLen;
        var remainder = (7 - totalCells % 7) % 7;
        for (var x = 0; x < remainder; x++) {
            var hole = document.createElement('div');
            hole.style.cssText = 'visibility:hidden;';
            grid.appendChild(hole);
        }

        // 分割线
        var sep2 = document.createElement('div');
        sep2.style.cssText = 'height:1px;background:rgba(0,0,0,0.06);margin:7px 0 5px 0;';
        cal.appendChild(sep2);

        // remark
        var remark = document.createElement('div');
        remark.style.cssText = 'min-height:16px;text-align:center;font-size:11px;color:#2735BA;';
        remark.textContent = (now.leap ? '闰小刻(29日)' : '平小刻(30日)') +
            (manualOffsetDays === 0 ? '' : '（手动模式）');
        cal.appendChild(remark);

        // 详情区
        var detail = document.createElement('div');
        detail.style.cssText = 'min-height:28px;text-align:center;font-size:11px;color:#5a3a00;' +
            'background:rgba(255,215,0,0.25);border-radius:5px;padding:4px 6px;margin-top:4px;' +
            (window.__arlDetail ? '' : 'display:none;');
        if (window.__arlDetail) detail.innerHTML = window.__arlDetail;
        cal.appendChild(detail);

        // 分割线
        var sep3 = document.createElement('div');
        sep3.style.cssText = 'height:1px;background:linear-gradient(90deg,transparent,rgba(39,53,186,0.2),transparent);margin:6px 0 4px 0;';
        cal.appendChild(sep3);

        // 底部：只保留地球时间+工作时段，无发售计时
        var rt = document.createElement('div');
        rt.style.cssText = 'text-align:center;font-size:10.5px;color:#444;line-height:1.7;font-family:monospace;';
        var earthNow = new Date();
        var earthTxt = pad(earthNow.getHours()) + ':' + pad(earthNow.getMinutes()) + ':' + pad(earthNow.getSeconds());
        rt.textContent = '地球 ' + earthTxt + ' · ' + now.periodName + ' ' + now.periodHour.toFixed(1) + 'h';
        cal.appendChild(rt);

        mountEl.appendChild(cal);
    }

    function makeBtn(text, tip, handler) {
        var b = document.createElement('div');
        b.style.cssText = 'color:#2735BA;font-size:' + (text.length > 1 ? '16' : '14') + 'px;line-height:1;cursor:pointer;padding:0 6px;user-select:none;';
        b.textContent = text;
        b.title = tip;
        b.addEventListener('click', handler);
        return b;
    }

    function setTotalDays(td) {
        var baseTotal = currentTotalDays(0);
        manualOffsetDays = td - baseTotal;
        selectedDay = null;
        window.__arlDetail = '';
    }

    function shiftOffset(deltaDays) {
        var cur = currentTotalDays(manualOffsetDays);
        var target = cur + deltaDays;
        if (target < 0) target = 0;
        setTotalDays(target);
    }

    // ===== 初始化 =====
    function init() {
        var mount = document.getElementById('arl-mount');
        if (mount) {
            render(mount);
            setInterval(function () {
                render(mount);
            }, 1000);
        }

        // 独立计时挂载点
        updateElapsedMount();
        setInterval(updateElapsedMount, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($content) {
            var mount = document.getElementById('arl-mount');
            if (mount) render(mount);
            updateElapsedMount();
        });
    }

})();
importScript('MediaWiki:角色轮播.js');
importScript('MediaWiki:音乐.js');
importScript('MediaWiki:星铎棋.js');