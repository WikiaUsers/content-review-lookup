(function () {
    'use strict';

    var snapshot = {"date":"2026年10月1日","teams":{"芙莉莲队":{"rank":1,"values":[1000,100,100,100,100,100]},"小圆队":{"rank":2,"values":[967,96,98,99,97,93]},"尼古喵喵队":{"rank":3,"values":[948,100,93,82,95,92]},"斩服少女队":{"rank":4,"values":[942,90,100,94,98,90]},"东方队":{"rank":5,"values":[933,92,97,86,96,92]},"小魔女队":{"rank":6,"values":[917,88,94,94,96,93]},"赛博朋克队":{"rank":7,"values":[910,90,96,81,96,85]},"堕天使队":{"rank":8,"values":[907,88,95,88,95,87]},"日漫队":{"rank":9,"values":[904,92,90,88,93,85]},"梦幻岛队":{"rank":10,"values":[900,100,85,70,85,90]},"宇宙巡警队":{"rank":11,"values":[899,92,90,82,89,90]},"NERV队":{"rank":12,"values":[879,86,92,84,88,87]},"II队":{"rank":13,"values":[879,98,82,71,84,86]},"ONE队":{"rank":14,"values":[866,88,88,78,88,84]},"孤独摇滚队":{"rank":15,"values":[855,84,90,70,92,87]},"胜利女神队":{"rank":16,"values":[779,70,83,78,88,84]},"明日方舟队":{"rank":17,"values":[763,68,82,86,80,79]},"小马队":{"rank":18,"values":[745,80,70,90,40,85]},"元玩队":{"rank":19,"values":[731,83,82,74,20,59]},"ITFT队":{"rank":20,"values":[707,70,75,70,70,62]},"美漫队":{"rank":21,"values":[700,74,68,80,60,60]},"地狱客栈队":{"rank":22,"values":[698,70,74,72,64,60]},"极恶老大队":{"rank":23,"values":[696,70,74,72,62,60]},"流浪地球队":{"rank":24,"values":[680,63,64,72,74,90]},"政要队":{"rank":25,"values":[668,62,78,72,60,54]},"柯南队":{"rank":26,"values":[666,60,70,70,66,80]},"小宠物队":{"rank":27,"values":[650,60,66,78,64,70]},"国家球队":{"rank":28,"values":[625,58,70,60,60,63]},"游戏队":{"rank":29,"values":[614,60,60,60,66,68]},"宝可梦队":{"rank":30,"values":[588,58,64,50,54,60]},"影视队":{"rank":31,"values":[584,60,57,56,58,59]},"天体球队":{"rank":32,"values":[574,52,64,50,60,64]},"五学队":{"rank":33,"values":[572,70,60,72,20,20]},"小女警队":{"rank":34,"values":[569,53,62,54,55,62]},"小马女孩队":{"rank":35,"values":[564,40,72,66,60,62]},"索尼克队":{"rank":36,"values":[564,50,64,60,52,60]},"鬼畜队":{"rank":37,"values":[552,56,56,54,50,56]},"TTS队":{"rank":38,"values":[544,54,56,56,53,51]},"星战队":{"rank":39,"values":[532,48,56,60,58,54]},"企业队":{"rank":40,"values":[502,46,54,56,50,50]},"主播队":{"rank":41,"values":[468,46,50,52,42,40]},"演艺队":{"rank":42,"values":[457,52,43,40,38,42]},"歌手队":{"rank":43,"values":[452,45,42,48,40,58]},"原神队":{"rank":44,"values":[424,44,40,47,38,43]},"崩坏队":{"rank":45,"values":[422,44,40,45,38,43]},"国漫队":{"rank":46,"values":[416,46,34,46,40,44]},"声优队":{"rank":47,"values":[340,40,30,30,30,30]}}};

    if (window.twilightTeamRadar) {
        window.twilightTeamRadar.refresh(document);
        return;
    }

    var labels = ['总分', '活跃度', '游戏实力', '政治影响力', '创新性', '合作性'];
    var offsets = [100, 10, 10, 10, 10, 10];
    var records = Object.keys(snapshot.teams).map(function (name) { return snapshot.teams[name]; });
    var domains = labels.map(function (_, i) {
        var values = records.map(function (record) { return record.values[i]; });
        return [Math.min.apply(null, values) - offsets[i], Math.max.apply(null, values)];
    });
    var nextId = 0;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var states = [];
    var ns = 'http://www.w3.org/2000/svg';

    function element(tag, className, text) {
        var node = document.createElement(tag);
        node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function svgElement(tag, attributes, text) {
        var node = document.createElementNS(ns, tag);
        Object.keys(attributes || {}).forEach(function (key) { node.setAttribute(key, attributes[key]); });
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function renderChart(state, animate) {
        cancelAnimationFrame(state.frame);
        var width = state.chart.clientWidth;
        if (!width) return;
        state.width = width;
        var height = 380;
        var cx = width / 2, cy = height / 2;
        var radius = Math.min(110, Math.max(30, (width - 136) / 2));
        var labelRadius = radius + 48;
        var svg = svgElement('svg', {
            viewBox: '0 0 ' + width + ' ' + height,
            width: width, height: height,
            role: 'img', 'aria-labelledby': state.id + '-title ' + state.id + '-description'
        });
        svg.appendChild(svgElement('title', { id: state.id + '-title' }, state.name + '的五维评分与总分'));
        svg.appendChild(svgElement('desc', { id: state.id + '-description' }, labels.map(function (label, i) {
            return label + ' ' + state.record.values[i] + '，轴范围 ' + domains[i][0] + ' 至 ' + domains[i][1];
        }).join('；')));

        function point(i, ratio, r) {
            var angle = -Math.PI / 2 + i * Math.PI / 3;
            return [cx + Math.cos(angle) * r * ratio, cy + Math.sin(angle) * r * ratio];
        }

        function polygonPoints(ratios) {
            return ratios.map(function (ratio, i) { return point(i, ratio, radius).join(','); }).join(' ');
        }

        [0.25, 0.5, 0.75, 1].forEach(function (ratio) {
            svg.appendChild(svgElement('polygon', {
                points: polygonPoints(labels.map(function () { return ratio; })),
                'class': 'hltv-radar-grid'
            }));
        });
        labels.forEach(function (_, i) {
            var endpoint = point(i, 1, radius);
            svg.appendChild(svgElement('line', {
                x1: cx, y1: cy, x2: endpoint[0], y2: endpoint[1], 'class': 'hltv-radar-spoke'
            }));
        });
        var area = svgElement('polygon', { 'class': 'hltv-radar-area' });
        svg.appendChild(area);
        var dots = labels.map(function () {
            var dot = svgElement('circle', { r: 3.5, 'class': 'hltv-radar-dot' });
            svg.appendChild(dot);
            return dot;
        });
        labels.forEach(function (label, i) {
            var p = point(i, 1, labelRadius);
            svg.appendChild(svgElement('text', { x: p[0], y: p[1] - 15, 'class': 'hltv-radar-label' }, label));
            svg.appendChild(svgElement('text', { x: p[0], y: p[1] + 8, 'class': 'hltv-radar-value' }, state.record.values[i]));
            svg.appendChild(svgElement('text', { x: p[0], y: p[1] + 26, 'class': 'hltv-radar-range' }, domains[i][0] + '—' + domains[i][1]));
        });
        state.chart.replaceChildren(svg);
        var ratios = state.record.values.map(function (value, i) {
            return (value - domains[i][0]) / (domains[i][1] - domains[i][0]);
        });
        var duration = animate && !reducedMotion.matches ? 600 : 0;
        var started = performance.now();
        function draw(now) {
            var progress = duration ? Math.min(1, (now - started) / duration) : 1;
            var eased = 1 - Math.pow(1 - progress, 3);
            var positions = ratios.map(function (ratio) { return ratio * eased; });
            area.setAttribute('points', polygonPoints(positions));
            dots.forEach(function (dot, i) {
                var p = point(i, positions[i], radius);
                dot.setAttribute('cx', p[0]);
                dot.setAttribute('cy', p[1]);
            });
            if (progress < 1 && state.open) state.frame = requestAnimationFrame(draw);
        }
        draw(started);
    }

    function toggle(state) {
        var panel = state.panel;
        var startHeight = panel.hidden ? 0 : panel.getBoundingClientRect().height;
        if (state.animation) state.animation.cancel();
        state.animation = null;
        state.open = !state.open;
        state.button.setAttribute('aria-expanded', String(state.open));
        state.buttonLabel.textContent = state.open ? '收起数据六边形' : '展示数据六边形';
        panel.setAttribute('aria-hidden', String(!state.open));
        panel.hidden = false;
        panel.style.height = 'auto';
        if (state.open) renderChart(state, true);
        else cancelAnimationFrame(state.frame);
        var endHeight = state.open ? panel.scrollHeight : 0;
        var duration = reducedMotion.matches ? 0 : 360;

        function finish() {
            panel.style.height = state.open ? 'auto' : '0px';
            panel.hidden = !state.open;
            state.animation = null;
        }

        panel.style.height = endHeight + 'px';
        if (!duration || !panel.animate) {
            finish();
            return;
        }
        var animation = panel.animate([
            { height: startHeight + 'px' },
            { height: endHeight + 'px' }
        ], { duration: duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        state.animation = animation;
        animation.onfinish = function () {
            if (state.animation === animation) finish();
        };
    }

    function bind(card) {
        if (card.hasAttribute('data-team-radar-ready')) return;
        var nameNode = card.querySelector('.hltv-team-name');
        if (!nameNode) return;
        var name = nameNode.textContent.trim();
        var record = snapshot.teams[name];
        if (!record) return;

        var id = 'hltv-team-radar-' + (++nextId);
        var toolbar = element('div', 'hltv-radar-toolbar');
        var button = element('button', 'hltv-radar-toggle');
        button.type = 'button';
        button.id = id + '-toggle';
        button.setAttribute('aria-controls', id);
        button.setAttribute('aria-expanded', 'false');
        var buttonLabel = element('span', '', '展示数据六边形');
        var chevron = element('span', 'hltv-radar-chevron');
        chevron.setAttribute('aria-hidden', 'true');
        button.append(buttonLabel, chevron);
        toolbar.appendChild(button);

        var panel = element('div', 'hltv-radar-panel');
        panel.id = id;
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', name + '数据六边形');
        var content = element('div', 'hltv-radar-content');
        var chart = element('div', 'hltv-radar-chart');
        content.appendChild(chart);
        panel.appendChild(content);

        var body = card.querySelector('.hltv-rankcard-body');
        card.insertBefore(toolbar, body);
        card.insertBefore(panel, body);
        card.setAttribute('data-team-radar-ready', 'true');
        var state = { id: id, card: card, name: name, record: record, button: button, buttonLabel: buttonLabel,
            panel: panel, chart: chart, open: false, animation: null, frame: 0, width: 0 };
        states.push(state);
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            toggle(state);
        });
        if (window.ResizeObserver) {
            var observer = new ResizeObserver(function () {
                if (state.open && chart.clientWidth && chart.clientWidth !== state.width) renderChart(state, false);
            });
            observer.observe(chart);
            state.observer = observer;
        }
    }

    function refresh(scope) {
        scope = scope && scope.jquery ? scope[0] : scope;
        scope = scope && scope.querySelectorAll ? scope : document;
        states = states.filter(function (state) {
            if (document.documentElement.contains(state.card)) return true;
            cancelAnimationFrame(state.frame);
            if (state.animation) state.animation.cancel();
            if (state.observer) state.observer.disconnect();
            return false;
        });
        if (scope.matches && scope.matches('.hltv-ranklist .hltv-rankcard')) bind(scope);
        Array.prototype.forEach.call(scope.querySelectorAll('.hltv-ranklist .hltv-rankcard'), bind);
    }

    window.twilightTeamRadar = { refresh: refresh };
    if (!window.ResizeObserver) window.addEventListener('resize', function () {
        states.forEach(function (state) { if (state.open) renderChart(state, false); });
    });
    if (window.mw && mw.hook) mw.hook('wikipage.content').add(refresh);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { refresh(document); });
    else refresh(document);
}());