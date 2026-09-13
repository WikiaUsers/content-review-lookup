/**
 * 移植英文维基 —— 黄金令牌加成 (Gold Pass)
 * 仅支持四种加成：建筑工人加成 (Builder Boost) / 研究加成 (Research Boost)
 *                自动铸币 (Auto-Forge) / 升级经验 (EXP)
 *
 * 用法：在本页统计表格的单元格上添加 class="GoldPass <后缀>"
 *   后缀说明：
 *     bCost  建筑升级费用（受“建筑工人加成”；铸币页面另受“自动铸币”半价）
 *     bTime  建筑升级时间（受“建筑工人加成”，并据此推导升级经验）
 *     rCost  研究费用（受“研究加成”）
 *     rTime  研究时间（受“研究加成”）
 *     EXP    升级获得经验（需按顺序放在 bTime 之后的列）
 */
$(function () {
    "use strict";

    /* ================= 渲染输入控件 ================= */
    $("span#builderBoostHarness").html(
        '<div id="builderBoostInput">建筑工人加成：' +
        '<select name="builderBoost" id="builderBoost">' +
        '<option value="0">0</option>' +
        '<option value="10">10%</option>' +
        '<option value="15">15%</option>' +
        '<option value="20">20%</option>' +
        '</select></div>'
    );
    $("span#researchBoostHarness").html(
        '<div id="researchBoostInput">研究加成：' +
        '<select name="researchBoost" id="researchBoost">' +
        '<option value="0">0</option>' +
        '<option value="10">10%</option>' +
        '<option value="15">15%</option>' +
        '<option value="20">20%</option>' +
        '</select></div>'
    );
    $("span#autoForgeHarness").html(
        '<div id="autoForgeInput">自动铸币（半价）？' +
        '<input type="checkbox" name="autoForgeBoost" id="autoForgeBoost">' +
        '</div>'
    );

    /* ================= 记录原始值作为基准 ================= */
    $(".GoldPass").each(function () {
        var initialStr = $(this).text();
        $(this).attr("title", initialStr);
    });

    /* ================= 工具函数 ================= */

    // 读取费用：去掉逗号与所有空白（含千分位空格），返回数值
    function readCost(str) {
        if (str === undefined || str === null) return 0;
        var s = String(str).replace(/,/g, "").replace(/\s/g, "");
        var n = parseFloat(s);
        return isNaN(n) ? 0 : n;
    }

    // 费用折扣：向上取整
    function discountCost(cost, percent) {
        return Math.ceil(cost * (1 - percent / 100));
    }

    // 费用输出：空格千分位形式，如 "7 000 000"
    function formatCost(num) {
        var s = String(Math.round(num));
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // 读取中文时间："x天x小时x分钟x秒"，返回总秒数
    function readTime(str) {
        if (str === undefined || str === null) return 0;
        str = String(str).trim();
        var days = 0, hours = 0, minutes = 0, seconds = 0, m;
        m = str.match(/(\d+)\s*天/);     if (m) days = parseInt(m[1], 10);
        m = str.match(/(\d+)\s*小时/);   if (m) hours = parseInt(m[1], 10);
        m = str.match(/(\d+)\s*分钟/);   if (m) minutes = parseInt(m[1], 10);
        m = str.match(/(\d+)\s*秒/);     if (m) seconds = parseInt(m[1], 10);
        return days * 86400 + hours * 3600 + minutes * 60 + seconds;
    }

    // 时间折扣：按比例后，再按 10 分钟 / 1 小时档位向下取整
    function discountTime(time, percent) {
        var t = Math.ceil(time * (1 - percent / 100));
        if (percent === 0 || t < 1800) return t;           // 0% 或不足 30 分钟：不取整
        if (t <= 86400) return Math.floor(t / 600) * 600;  // 一天内：向下取整到 10 分钟
        return Math.floor(t / 3600) * 3600;                // 超过一天：向下取整到 1 小时
    }

    // 时间输出：x天x小时x分钟x秒，省略为 0 的项
    function outputTime(time) {
        var days = Math.floor(time / 86400);
        var hours = Math.floor((time - days * 86400) / 3600);
        var minutes = Math.floor((time - days * 86400 - hours * 3600) / 60);
        var seconds = time - days * 86400 - hours * 3600 - minutes * 60;
        var out = "";
        if (days > 0) out += days + "天";
        if (hours > 0) out += hours + "小时";
        if (minutes > 0) out += minutes + "分钟";
        if (seconds > 0) out += seconds + "秒";
        return out;
    }

    // 判断文本是否相同（忽略所有空白，避免"1天 12小时"被误判为有变化）
    function sameText(orig, output) {
        return String(orig).replace(/\s+/g, "") === String(output).replace(/\s+/g, "");
    }

    // 变化则加高亮类，否则移除
    function markModified($el, changed) {
        if (changed) $el.addClass("StatModifiedGP");
        else $el.removeClass("StatModifiedGP");
    }

    function getPercent(sel) {
        var v = $(sel).val() * 1;
        return isNaN(v) ? 0 : v;
    }

    /* ================= 点击“应用” ================= */
    $(".changeBonusButton").click(function () {
        $(".changeBonusButton").text("更新");

        var builderPercent = getPercent("#builderBoost");
        var researchPercent = getPercent("#researchBoost");
        var autoForge = $("#autoForgeBoost").is(":checked");
        var xpArray = []; // 存放与 bTime 一一对应的新经验值

        // 建筑费用：建筑工人加成（铸币页面若勾选自动铸币，先打 50%）
        $(".bCost").each(function () {
            var base = readCost($(this).attr("title"));
            var calc = base;
            if (autoForge) calc = discountCost(calc, 50);
            calc = discountCost(calc, builderPercent);
            $(this).text(formatCost(calc));
            markModified($(this), calc !== base);
        });

        // 研究费用
        $(".rCost").each(function () {
            var base = readCost($(this).attr("title"));
            var calc = discountCost(base, researchPercent);
            $(this).text(formatCost(calc));
            markModified($(this), calc !== base);
        });

        // 建筑时间：建筑工人加成（同时按游戏公式计算升级经验）
        $(".bTime").each(function () {
            var str = $(this).attr("title");
            var timeSeconds = readTime(str);
            var newTime = discountTime(timeSeconds, builderPercent);
            xpArray.push(Math.floor(Math.sqrt(newTime))); // 升级经验 = √新时间(秒) 向下取整
            var output = outputTime(newTime);
            $(this).text(output);
            markModified($(this), !sameText(str, output));
        });

        // 研究时间
        $(".rTime").each(function () {
            var str = $(this).attr("title");
            var timeSeconds = readTime(str);
            var newTime = discountTime(timeSeconds, researchPercent);
            var output = outputTime(newTime);
            $(this).text(output);
            markModified($(this), !sameText(str, output));
        });

        // 升级经验：按顺序取用 bTime 计算出的经验值
        $(".EXP").each(function () {
            if (xpArray.length === 0) return;
            var base = readCost($(this).attr("title"));
            var xpNew = xpArray.shift();
            $(this).text(formatCost(xpNew));
            markModified($(this), xpNew !== base);
        });
    });

    /* ================= 点击“重置” ================= */
    $(".resetBonusButton").click(function () {
        $(".bCost, .rCost").each(function () { $(this).text($(this).attr("title")); });
        $(".bTime, .rTime").each(function () { $(this).text($(this).attr("title")); });
        $(".EXP").each(function () { $(this).text($(this).attr("title")); });
        $(".GoldPass").removeClass("StatModifiedGP");
    });
});