// 时间差计算
$(document).ready(function() {
    function formatTimeDiff(diff) {
        var parts = [];
        if (diff.years > 0) parts.push(diff.years + "年");
        if (diff.months > 0) parts.push(diff.months + "个月");
        if (diff.days > 0) parts.push(diff.days + "天");
        parts.push(diff.hours + "小时");
        parts.push(diff.minutes + "分");
        parts.push(diff.seconds + "秒");
        return parts.join("");
    }

    function calculateDiff(targetDate) {
        var now = new Date();
        var diff = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

        // 计算时间差异的绝对值
        var timeDiff = now.getTime() - targetDate.getTime();
        if (timeDiff < 0) return diff; // 处理未来时间

        // 计算年、月、日（基于UTC日期）
        var startUTC = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        var endUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

        // 临时变量用于逐步计算
        var tempDate = new Date(targetDate);

        diff.years = now.getUTCFullYear() - tempDate.getUTCFullYear();
        tempDate.setUTCFullYear(tempDate.getUTCFullYear() + diff.years);

        if (tempDate > now) {
            diff.years--;
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() - 1);
        }

        diff.months = now.getUTCMonth() - tempDate.getUTCMonth();
        if (diff.months < 0) {
            diff.months += 12;
        }
        tempDate.setUTCMonth(tempDate.getUTCMonth() + diff.months);

        if (tempDate > now) {
            diff.months--;
            tempDate.setUTCMonth(tempDate.getUTCMonth() - 1);
        }

        diff.days = Math.floor((now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

        // 计算小时、分钟、秒
        var remainder = now.getTime() - tempDate.getTime() - diff.days * 1000 * 60 * 60 * 24;
        diff.hours = Math.floor(remainder / (1000 * 60 * 60));
        remainder %= (1000 * 60 * 60);
        diff.minutes = Math.floor(remainder / (1000 * 60));
        remainder %= (1000 * 60);
        diff.seconds = Math.floor(remainder / 1000);

        return diff;
    }

    function updateAllTimeDifferences() {
        $('.time-difference').each(function() {
            var $this = $(this);
            var targetDateStr = $this.data('target-date');
            var targetDate = new Date(targetDateStr);
            if (isNaN(targetDate.getTime())) {
                $this.text("日期格式无效");
                return;
            }
            var diff = calculateDiff(targetDate);
            $this.text(formatTimeDiff(diff));
        });
    }

    // 初始更新并设置定时器
    updateAllTimeDifferences();
    setInterval(updateAllTimeDifferences, 1000);
});

// 折叠功能实现
$(document).ready(function() {
  $('.custom-collapsible .collapsible-header').click(function() {
    const $header = $(this);
    const isOpen = $header.attr('data-state') === 'open';
    
    $header
      .attr('data-state', isOpen ? 'closed' : 'open')
      .closest('.custom-collapsible')
      .find('.collapsible-content')
      .toggleClass('force-show');
  });
});

// 随机页面按钮
$(document).ready(function() {
    $('.random-button').click(function() {
        var container = $(this).closest('.random-container');
        var urls = container.data('urls').split('|');
        var randomIndex = Math.floor(Math.random() * urls.length);
        window.location.href = urls[randomIndex];
    });
});